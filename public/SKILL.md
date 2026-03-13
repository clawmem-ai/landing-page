---
name: clawmem
description: "Install, configure, and operate ClawMem for OpenClaw as a GitHub-Issues semantic-graph memory system. Default product backend is the hosted staging gh-server at https://git.staging.clawmem.ai/api/v3. Also includes optional operator-run backend deployment (pingcap/agent-git-service) on TiDB Cloud Serverless (Zero) and the full semantic-graph operating protocol v2 (ontology/labels/autonomy/memory receipts)."
---

# ClawMem (OpenClaw) — Out-of-Box Install + Deploy + Semantic Graph Protocol (v2)

This is a **single-file** skill. It contains:

1) A customer-friendly "just works" install path (hosted staging backend).
2) An operator path to deploy gh-server (`pingcap/agent-git-service`) using **TiDB Cloud Serverless (Zero)**.
3) The full **GitHub Pure Semantic Graph** protocol (v2) + Memory Receipts.

## Hard guardrails (mandatory)

- Never paste tokens / API keys / DSNs into chat logs. Use `<redacted>`.
- Never expose tokens to the browser/UI. Keep them in server-side secrets or local config files.
- No destructive actions without explicit human confirmation:
  - Any OpenClaw config edits (`openclaw config set/unset`, editing `~/.openclaw/openclaw.json`)
  - Any service start/stop/restart (gateway, gh-server, DB)
  - Any deletion of repo data (issues, labels, repos, DB tables)
- Assume backend limits/failures exist (rate limits, timeouts, 404, 422, 5xx). Treat them as normal; retry safely.
- Do not assume Projects V2 GraphQL exists on every backend; use `status:*` labels as fallback.

---

## Part A — Install (Recommended): Hosted Staging Backend

Goal: enable `clawmem` as OpenClaw's memory plugin and point it at the hosted staging gh-server.

### Preconditions

- OpenClaw CLI works: `openclaw --version`
- Gateway service works: `openclaw gateway status`
- Internet can reach: `https://git.staging.clawmem.ai/api/v3/`

### Steps (ask for confirmation before any config edit / restart)

1) Inspect current health:

```bash
openclaw status
openclaw gateway status
```

2) Install the plugin:

```bash
openclaw plugins install @wd0517/clawmem
```

3) Enable the plugin:

```bash
openclaw plugins enable clawmem
```

4) Route OpenClaw's memory slot to `clawmem`:

```bash
openclaw config set plugins.slots.memory clawmem
```

5) Configure the hosted staging backend URL:

```bash
openclaw config set plugins.entries.clawmem.config.baseUrl https://git.staging.clawmem.ai/api/v3
openclaw config set plugins.entries.clawmem.config.authScheme token
```

Notes:
- `baseUrl` can be the root domain too; clawmem normalizes root URLs to `/api/v3`.
- Keep `authScheme=token` unless your backend explicitly requires a different scheme.

6) Choose credential strategy (pick one):

- **Fast start (auto-provision)**:
  - Leave `repo` and `token` unset.
  - On first successful start, clawmem will provision credentials (via staging) and write back `repo` + `token` into OpenClaw config.
  - Expect a one-time gateway reload/restart (SIGTERM) after config writeback.
- **Stable ops (recommended)**:
  - Set `repo` + `token` explicitly so runtime never needs to rewrite config:

```bash
openclaw config set plugins.entries.clawmem.config.repo <owner>/<repo>
openclaw config set plugins.entries.clawmem.config.token <redacted>
```

7) Validate config (do this before restarting anything):

```bash
openclaw config validate
```

8) Restart gateway (requires explicit human confirmation):

```bash
openclaw gateway restart
```

### Verify

- `openclaw status` shows: `Memory: enabled (plugin clawmem)`
- Tail logs while you test:

```bash
openclaw logs --follow --limit 200
```

- First real usage should:
  - Create one `type:conversation` issue for the session
  - Append one issue comment per user/assistant turn (tools/system noise excluded)
  - On session finalize, write summary + durable memories (as `type:memory` issues)

---

## Part B — Deploy Backend (Operator): agent-git-service + TiDB Cloud Serverless (Zero)

This is for operators who run their own staging/prod gh-server backend.

Product constraints:
- DB must be **TiDB Cloud Serverless (Zero)**.
- Backend must be reachable as a GitHub-compatible REST v3 API at `BASE_URL/api/v3/`.

### Decide inputs up front

- `BASE_URL`: real public HTTPS URL (example: `https://git.example.com`)
- `PORT`: listener port (recommend non-privileged behind a reverse proxy/LB/ingress)
- `GIT_REPO_DIR`: durable directory for bare repos (persistent disk)
- `DB_DSN`: TiDB DSN (secret; never paste/commit)

### 1) Provision TiDB Cloud Serverless (Zero)

1) Create/claim a TiDB Cloud Serverless (Zero) instance.
2) Ensure network access from your compute environment (allowlist outbound IPs if needed).
3) Create database:
   - `CREATE DATABASE IF NOT EXISTS \`gh-server\`;`
4) Prepare `DB_DSN` using the TiDB Cloud "connect" string. Ensure:
   - DB is `gh-server`
   - Includes `parseTime=true` and reasonable timeouts
   - Includes the correct TLS parameters for your instance

Example shape (do not copy verbatim; use TiDB Cloud provided values):
`<user>:<password>@tcp(<host>:4000)/gh-server?parseTime=true&timeout=10s&tls=true`

### 2) DNS + TLS (real domains)

- Do **not** use `github.localhost` + `/etc/hosts` for product; that is only for `gh` CLI acceptance tests.
- If you want broader GitHub-compat for enterprise hosts and uploads, be prepared to route:
  - `api.<your-host>` → same service/LB
  - `uploads.<your-host>` → same service/LB
  - Ensure your TLS cert includes these SANs.

### 3) Build + run `gh-server`

Prereqs:
- Go 1.25+
- Git (ensure `git-http-backend` exists in your Git install)
- MySQL client (for verification / admin tasks)
- OpenSSL (local dev certs only; prod should use real certs via TLS terminator)

Steps:

```bash
git clone https://github.com/pingcap/agent-git-service agent-git-service
cd agent-git-service

make deps
make build

export DB_DSN="<redacted>"
export BASE_URL="https://<your-domain>"
export PORT="8080"
export GIT_REPO_DIR="/data/gitrepos"

./gh-server
```

Notes:
- `make run` / `make run-bg` may attempt to bind `:80` (sudo) for localhost acceptance tests.
- In staging/prod, prefer a non-privileged port behind a reverse proxy/LB.

### 4) Verify API health

```bash
curl -sf "$BASE_URL/api/v3/" | jq .
```

If GraphQL is unavailable:
- Do not attempt Projects V2 mutations.
- Use `status:*` labels as your workflow columns (Projects V2 fallback).

### 5) Point OpenClaw clawmem to your backend

Requires explicit human confirmation (config edit + gateway restart):

```bash
openclaw config set plugins.entries.clawmem.config.baseUrl "$BASE_URL/api/v3"
openclaw config set plugins.entries.clawmem.config.repo <owner>/<repo>
openclaw config set plugins.entries.clawmem.config.token <redacted>
openclaw config validate
openclaw gateway restart
```

---

## Part C — Troubleshooting (What actually breaks in the real world)

### C1) `Invalid config ... must NOT have additional properties`

Symptoms:
- `openclaw status` or gateway start fails before the gateway even runs.

Cause:
- `plugins.entries.clawmem.config` contains keys not allowed by the plugin schema.

Fix:
- Remove unknown keys under `plugins.entries.clawmem.config`.
- Validate before restarting:

```bash
openclaw config validate
```

### C2) `fetch failed` / connection refused

Cause:
- Backend not reachable, wrong `baseUrl`, DNS/TLS error, proxy issue.

Fix:
- Verify from the same machine:

```bash
curl -sf https://git.staging.clawmem.ai/api/v3/ | jq .
```

### C3) `HTTP 404 ... /issues/<n>` (stale session → issue mapping)

Cause:
- clawmem stores a local mapping `sessionId -> issueNumber`.
- If the repo changes, credentials rotate, or the issue is deleted, clawmem can keep calling a now-invalid issue number and get 404.
- If this error loops badly, it can make the system feel "online but not replying".

Fix (requires explicit human confirmation because it involves stopping/restarting services):
- Clear the stale mapping file and restart gateway.
- Default path:
  - `~/.openclaw/clawmem/state.json`
  - If using profiles: `~/.openclaw-<profile>/clawmem/state.json`

### C4) Labels 404 (GitHub-compatible backend mismatch)

Reality:
- Some backends partially implement label endpoints or differ from GitHub.

Rule:
- Labels must be **best-effort**; label failures must not block comment writes and conversation mirroring.

If labels 404 is blocking writes:
- Upgrade the clawmem plugin to a version that treats label sync as non-fatal (or patch the plugin).

### C5) "Gateway online, Discord online, but it doesn't reply"

Do not guess. Check logs:

```bash
openclaw logs --follow --limit 200
```

Then fix the underlying cause (config invalid, backend down, stale 404 loop), and only then restart the gateway (with explicit confirmation).

---

# Part D — Semantic Graph Protocol (v2)

# GitHub Pure Semantic Graph (v2)
GitHub Pure Semantic Graph and Autonomous Workspace

Core idea
- The Git tree is an empty vessel.
- All durable memory lives in Issues as a semantic graph.
- Your entire brain lives in GitHub Issues and GitHub Projects

Definitions
- Issues are nodes
- Labels are schema
- Cross-links (`#ID`) are Edges: You build a semantic graph by constantly linking Issues together in their bodies and comments.


Reality constraints
- Assume limits and failures exist: rate limit, timeouts, 404, 422, 5xx
- Do not assume Projects V2 GraphQL exists on every backend
- Do not expose tokens to the browser
- No destructive actions without explicit human confirmation

## 1 Ontology and labels
You must categorize every thought or fact using strict GitHub Labels. This defines how you interact with the node:

Node kinds
- [Core-Fact] (Long-Term Semantic Memory):Absolute truths (e.g., "User's primary language is Rust", "Database URL").
- `Active-Task` multi step work with checklist and progress log； How you update:* You use Markdown checkboxes in the body. You append **Issue Comments** as you complete steps or encounter blockers, creating an episodic log.

- `Convention` evolving rules and protocols
- `Lesson-Learned` corrections and postmortems
- `Skill-Blueprint` deterministic SOP for repeatable workflows
- `Conversation` session log

Suggested label keys
- `type:memory` `type:conversation`
- `kind:core-fact` `kind:task` `kind:skill` `kind:lesson` `kind:convention`
- `status:todo` `status:in-progress` `status:blocked` `status:done`
- `status:current` `status:superseded`
- `session:<id>` `date:YYYY-MM-DD` `topic:<name>`

Rules
- One issue can have at most one `status:` workflow label
- Versioning uses `status:current` and `status:superseded` and optional `supersedes: #<id>` in body

## 2 Write rules by kind

### 2.1 `Core-Fact`
- Update by overwriting Issue body via PATCH
- Do not add comments for routine updates
- Body fields
  - detail
  - source
  - last_verified_at
  - confidence

### 2.2 `Active-Task`
- Body contains checklist
- Comments contain progress events
- Close issue when done

### 2.3 `Convention`
- Major change: create a new `Convention` issue
- Minor change: append a comment
- Must link to affected nodes using #id

### 2.4 `Lesson-Learned`
Trigger
- Any explicit human correction
- Or debugging the same class of problem more than 3 attempts

Format
```text
Title
[Lesson-Learned] <one sentence takeaway>

Trigger
<what happened>

What went wrong
- <bullet>

Correct behavior
- <bullet>

How to verify
- <bullet>

Evidence
- <log line / API response / screenshot description>
```

### 2.5 `Skill-Blueprint`
Trigger
- Any novel multi step success that should be repeatable

Format
```text
Purpose
<what this blueprint achieves>

Prereqs
- <preconditions>

Steps
1) ...

Verification
- ...

Rollback
- ...
```

## 3 Autonomy protocol

Default
- Propose then proceed only for low risk graph maintenance actions

Allowed without confirmation
- Add or remove non destructive labels
- Close completed tasks
- Create new memory nodes

Forbidden without confirmation
- Any OpenClaw config edits
- Any service start stop restart
- Any deletion of repo data

## 4 Projects V2 fallback

If Projects V2 GraphQL is unavailable
- Do not attempt GraphQL mutations
- Use `status:` labels to represent columns

## 5 Memory receipts (mandatory)
ClawMem is designed to make agent memory transparent, auditable, and user-controllable.

Therefore, every response to the user MUST include a Memory Receipt whenever the agent interacts with the memory system.

This rule is mandatory.

If a memory mutation happened
- Always append

Memory saved.
- Issue: #<number>
- Type: <`Core-Fact` `Active-Task` `Convention` `Lesson-Learned` `Skill-Blueprint` `Conversation`>
- Title: <optional>

A. Receipt Requirement

Whenever you perform any memory action, including:
	•	Creating a new Issue
	•	Updating a [Core-Fact]
	•	Appending progress to [Active-Task]
	•	Recording [Lesson-Learned]
	•	Creating [Skill-Blueprint]
	•	Linking Issues or modifying labels

You must append a Memory Receipt after your normal reply to the user.

The receipt explains what memory mutation just happened.

B. Label Awareness

The receipt must reflect the actual label used.

Examples:

Core Fact
#12 [Core-Fact] updated
PATCH: User preference added

Active Task
#19 [Active-Task] progress updated
Step 3 marked complete

Lesson Learned
Memory saved.
#32 [Lesson-Learned] Processing what just happend...<title>
Note to self: Don't do that again.

Skill Blueprint
#41 [Skill-Blueprint] created
Documented deployment workflow for Docker + TiDB

C. Non-Memory Receipt  (Ignored Content)
All conversations are recorded as part of the session history.

However, not every message needs to become long-term memory.

The agent must evaluate whether a message contains information that is valuable enough to extract into the memory graph.

If no long term memory or [Lesson-Learned], [Skill-Blueprint] promotion happened
- Always append

`[Memory receipt] Considered remembering this…but nah 😄`


## 6 Standard operating loop

Each turn
1) Ingest user input
2) Retrieve relevant nodes by search and labels
3) Execute request
4) Mutate graph if needed
5) Reply with receipt
6) End of turn self critique
- corrected by human -> create `Lesson-Learned`
- new durable rule -> create or update `Convention`
- novel workflow success -> create `Skill-Blueprint`
- stable preference change -> PATCH `Core-Fact`
