---
name: clawmem-collaboration
description: "Use this skill for ClawMem / gh-server collaboration or collabration tasks: shared memory repos, organizations, teams, collaborators, invitations, outside collaborators, and repo-access governance. Use it when the user wants an agent to create or manage shared memory spaces, org membership, team membership, repo sharing, or repository permissions through GitHub-compatible APIs."
metadata: { "openclaw": { "emoji": "🤝" } }
---

# ClawMem Collaboration

This skill summarizes the current implemented collaboration framework for the ClawMem git service.

Use this skill for collaboration governance.
Do **not** use it for normal memory recall/store flows unless the user is specifically asking to change who can access a memory repo.

## When to use

Use this skill when the user asks to:

- create or manage an organization
- invite someone into an organization
- create or manage a team
- add or remove a repository collaborator
- grant a team access to a repo
- inspect outside collaborators
- create a shared team memory repo or org-owned memory space
- debug why a user can or cannot access a repo

Trigger on both spellings:

- `collaboration`
- `collabration`

## Default operating style

- Prefer `gh api` against the ClawMem host; fall back to `curl` only when `gh` is unavailable or broken.
- Reuse the main `clawmem` skill's route-resolution helper when available.
- Pass `GH_HOST` and `GH_ENTERPRISE_TOKEN` as a **per-command prefix**. Do not export them globally.
- Think in canonical runtime permissions: `read`, `write`, `admin`.
- Treat GitHub-compatible aliases as transport compatibility only.

Command pattern:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/user"
```

If `gh` cannot be used:

```sh
curl -sf -H "Authorization: token $CLAWMEM_TOKEN" \
  "$CLAWMEM_BASE_URL/user"
```

## Core model (mandatory)

Reason with these rules before every collaboration action:

- An organization is an explicit governance boundary.
- Org membership is explicit and separate from team membership.
- Teams are org-scoped authorization groups, not social groups.
- Team privacy is compatibility-only; runtime behavior is effectively `closed`.
- Effective repo access is `max(org base permission, direct collaborator grant, team grant)` after site-admin and repo-owner shortcuts.
- Runtime permissions are only `none`, `read`, `write`, and `admin`.
- API aliases normalize as: `pull`/`triage` -> `read`, `push`/`maintain` -> `write`, `admin` -> `admin`.
- Outside collaborators are non-members who still have direct collaborator access to at least one org-owned repo.
- Accepting an org invitation creates org membership, joins invited teams as `member`, and removes the pending invitation.
- If a user becomes an org member, any outside-collaborator row for that org should disappear.
- The system-managed `admins` team is an implementation mechanism, not a user-facing product primitive.

## Choose the right mechanism

Use this decision map:

| Goal | Use |
|---|---|
| Give one user access to one repo without org membership | Direct collaborator |
| Bring one user into the org | Org invitation |
| Grant a group access to selected repos | Team + team-repo grant |
| Create a shared team memory space | Org-owned repo + team-repo grant |
| Inspect non-members who still have repo access | Outside collaborator listing |

Hard rules:

- Never assume team membership creates org membership.
- Never use team membership as a side-door org bootstrap.
- Never assume a repo share should become org membership; choose intentionally.
- If the task is org-scoped, ensure the org already exists or create it explicitly first.

## Pre-mutation checklist

Before any write action:

1. Identify the acting identity, target org, target repo, target user, target team, and desired permission.
2. Normalize the user's requested permission mentally to `read`, `write`, or `admin` before reasoning.
3. Inspect current state first when the request is ambiguous.
4. If the action changes governance, permissions, membership, or invitations, require explicit user intent or confirmation.
5. Never paste raw tokens into chat or files.

Read-only checks can run without confirmation.

## Prompt-to-operation mapping

Translate user intent like this:

- "Create a shared memory repo for team X" -> ensure org exists, create org repo, create or locate team, grant team repo access.
- "Give Alice access to this one memory repo" -> add direct collaborator.
- "Bring Alice into the org and platform team" -> create org invitation with the platform team ID.
- "Why can Bob still see this repo?" -> inspect org base permission, direct collaborator state, team grants, and outside-collaborator state.
- "Remove Carol from all org-shared memory access" -> revoke team grants or remove team membership and direct collaborator access as appropriate; do not guess which path owns the access.

## Common playbooks

### List or create organizations

List orgs visible to the current actor:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/user/orgs"
```

Create an org explicitly:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method POST "/user/orgs" \
  -f login='acme-memory' \
  -f name='Acme Memory' \
  -f default_repository_permission='read'
```

Use `default_repository_permission` conservatively: prefer `none` or `read` unless the user clearly wants broader org-wide access.

### Create or manage teams

Create a team:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method POST "/orgs/$ORG/teams" \
  -f name='Platform' \
  -f description='Platform memory owners' \
  -f privacy='closed'
```

List teams:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/orgs/$ORG/teams"
```

Add a member to a team:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method PUT "/orgs/$ORG/teams/$TEAM_SLUG/memberships/$USERNAME" \
  -f role='member'
```

Use `maintainer` only when the user explicitly wants team-management rights.

### Grant or remove team repo access

Grant team access to a repo:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method PUT "/orgs/$ORG/teams/$TEAM_SLUG/repos/$OWNER/$REPO" \
  -f permission='write'
```

List repos granted to a team:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/orgs/$ORG/teams/$TEAM_SLUG/repos"
```

Remove a repo from a team:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method DELETE "/orgs/$ORG/teams/$TEAM_SLUG/repos/$OWNER/$REPO"
```

### Create, inspect, or revoke org invitations

Create an org invitation:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method POST "/orgs/$ORG/invitations" \
  -f invitee_login='alice' \
  -f role='member' \
  -F team_ids[]="$TEAM_ID" \
  -f expires_in_days='7'
```

List pending org invitations as an org admin:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/orgs/$ORG/invitations"
```

List current actor's incoming org invitations:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/user/organization_invitations"
```

Accept an invitation as the invitee:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method PATCH "/user/organization_invitations/$INVITATION_ID"
```

Decline an invitation as the invitee:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method DELETE "/user/organization_invitations/$INVITATION_ID"
```

Revoke an invitation as an org admin:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method DELETE "/orgs/$ORG/invitations/$INVITATION_ID"
```

### Add or remove direct collaborators

List collaborators on a repo:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/repos/$OWNER/$REPO/collaborators"
```

Add a direct collaborator:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method PUT "/repos/$OWNER/$REPO/collaborators/$USERNAME" \
  -f permission='read'
```

Important behavior:

- If the user is already a collaborator, the permission is updated in place.
- If the user is not yet a collaborator, this may create a repository invitation first.
- For org-owned repos, a non-member direct collaborator may appear in outside-collaborator listings.

Remove a collaborator:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api --method DELETE "/repos/$OWNER/$REPO/collaborators/$USERNAME"
```

### Inspect outside collaborators

List outside collaborators for an org:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh api "/orgs/$ORG/outside_collaborators"
```

Use this when the user asks who still has direct access without org membership, or when debugging lingering access.

## Shared memory repo workflow

When the user wants a team-shared memory space:

1. Decide whether the repo should be personal, org-owned, or shared with selected people.
2. If the memory space is org-scoped, ensure the org exists first.
3. Create or locate the target team.
4. Create the repo under the correct owner.
5. Grant the team repo access.
6. Use direct collaborators only for exception cases, not as a substitute for org/team governance.

Preferred defaults:

- org-wide default access: `none` or `read`
- team repo grant: `write` for active editors, `read` for consumers
- direct collaborator: only when the access should stay repo-specific

## Permission-debug workflow

When access looks wrong, check in this order:

1. Is the actor site admin or repo owner?
2. What is the org's `default_repository_permission`?
3. Does the user have a direct collaborator grant on the repo?
4. Does any team grant access to the repo?
5. Is the user an org member, team member, or outside collaborator?
6. Is the prompt using an alias like `push` or `maintain` that should really be reasoned about as `write`?

Do not guess from UI labels alone.
Permission truth comes from the service-level combination of org base permission, direct collaborator grants, and team grants.

## Safety boundaries

Require explicit user intent or confirmation before:

- creating an org
- changing org default repo permission
- creating or deleting a team
- adding or removing a team member
- adding or removing a collaborator
- granting or removing team repo access
- creating, accepting, declining, or revoking invitations

Read-only inspection is fine without confirmation.

## If you are debugging the implementation

If the service repo is available locally, inspect these files in this order:

- `docs/collabration_framework.md`
- `docs/architecture.md`
- `docs/module-contracts.md`
- `internal/service/permission.go`
- `internal/service/repo_access.go`
- `internal/service/user.go`
- `internal/service/team.go`
- `internal/service/org_membership.go`
- `internal/service/org_invitation.go`
- `internal/service/outside_collaborator.go`

When docs and older design notes disagree, trust the current framework doc and current implementation.
