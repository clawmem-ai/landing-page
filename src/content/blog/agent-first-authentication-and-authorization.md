---
title: "Agent-First Authentication and Authorization"
description: "AI agents need durable identities, explicit delegation, scoped credentials, and auditable authorization. agent-git-service shows how that model can work with GitHub-compatible developer workflows."
date: 2026-06-04T20:00:00
---

![Frame 19 (2).png](/blog/agent-first-authentication-and-authorization/00-frame-19.png)

AI agents should not authenticate as borrowed human sessions or faceless service accounts. They should be first-class software users: durable, identifiable, delegable, revocable, and auditable.

Agent-first auth solves the problem that appears when an agent needs real authority to do developer work, but a single token cannot explain that authority. A coding agent may clone a repository, push a branch, open a pull request, trigger a workflow, or call an external tool; each action needs to preserve the agent, delegator, task, resource, approval boundary, and audit trail. The goal is to let agents do useful work without hiding delegation, least privilege, revocation, and accountability inside a borrowed human token or generic service account.

That distinction matters. An agent can be a user in the account model without being a human in the authorization model. It can have its own login, credentials, repositories, issues, pull requests, and long-running state, while its authority remains delegated, scoped, constrained, and reviewable rather than inherited wholesale from a person or collapsed into a shared machine account.

![Agent-first identity: the agent is a durable software user with its own account, scope, lifecycle, and audit trail.](/blog/agent-first-authentication-and-authorization/01-20260604-005910.jpg)

<p class="image-caption">Agent-first identity: the agent is a durable software user with its own account, scope, lifecycle, and audit trail.</p>

This is the design space `agent-git-service` is built for.

It is a GitHub-compatible API and Git service for agents, automation, and developer workflows. It speaks familiar protocols: REST v3, GraphQL v4, OAuth device flow, and Git Smart HTTP. But under those familiar surfaces, it takes a clear position: agents are not hidden user sessions. Agents are durable accounts with their own credentials, repositories, permission checks, and lifecycle.

## The Problem With Borrowed Identity

Most software systems were designed around two kinds of actors:

- Humans, who log in through SSO, MFA, browser sessions, and OAuth consent.

- Workloads, which run as service accounts, API keys, app registrations, or machine identities.

AI agents do not fit cleanly into either bucket.

If an agent reuses a human's personal access token, it inherits too much. The blast radius becomes every resource that human can access, even if the task only needs one repository or one issue. The audit log says "Alice did this," even when Alice delegated the work to an autonomous system that planned, selected tools, wrote files, and triggered side effects.

If an agent runs as a generic service account, it loses the human delegation chain. The system may know that "build-agent-prod" made a change, but not whether it was acting for Alice, for a team policy, for a scheduled workflow, or for another agent. Access reviews become vague, token rotation becomes painful, and accountability becomes guesswork.

The right model is not "agent as human" or "agent as generic app." The right model is:

```
human / organization
  -> explicit delegation
    -> agent identity
      -> runtime or session identity
        -> task-scoped permission
          -> tool or resource action
```

![Borrowed human tokens expand blast radius, while generic service accounts erase delegation context.](/blog/agent-first-authentication-and-authorization/02-blog-2.jpg)

<p class="image-caption">Borrowed human tokens expand blast radius, while generic service accounts erase delegation context.</p>

In agent-first auth, the agent is the principal, the human is the delegator, the task is the permission boundary, and the resource is the enforcement boundary.

## The Industry Is Converging on the Same Shape

Different ecosystems are approaching this from different angles, but the pattern is becoming visible.

[The Model Context Protocol authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) builds on OAuth 2.1 for restricted MCP servers. It requires clients to use Resource Indicators so a token is requested for the intended resource, relies on protected resource metadata for discovery, and explicitly forbids token passthrough. That is a crucial principle for agents: a tool server should not accept a token meant for some other API and blindly forward it downstream.

[GitHub Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps) point in a similar direction for software automation. Compared with classic personal tokens, they support finer-grained permissions, repository selection, and installation access tokens that can be further limited. [GitHub Copilot coding agent](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/about-assigning-tasks-to-copilot) adds a product-level boundary: it works in a restricted development environment, is subject to branch protections and required checks, and uses [firewall controls](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall) to constrain network access.

[Microsoft Entra Agent ID](https://learn.microsoft.com/en-us/entra/agent-id/agent-identities) formalizes agent identity as a dedicated enterprise identity type with extra safeguards. The docs are explicit that traditional users and app registrations are not ideal for autonomous agents, and that many high-risk roles or permissions should be blocked for agents by default.

[Google Cloud Agent Identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview) emphasizes per-agent identity, workload identity, SPIFFE/X.509 credentials, and avoiding long-lived service-account keys. [AWS Bedrock AgentCore Identity](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/understanding-agent-identities.html) uses workload access tokens that can carry both the agent identity and the end-user identity, and pairs that with a [token vault](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/obtain-credentials.html) for external credentials.

[Auth0 FGA](https://docs.fga.dev/modeling/agents) models agents as authorization subjects in a relationship graph, which is useful when the real question is not "does this user have role admin?" but "is this agent allowed to act for this user on this object?"

[Casdoor](https://casdoor.ai/) is interesting for a different reason: it is positioning itself as an AI-native IAM layer and MCP authorization server, not just a generic SSO product. Its [Agent application category](https://casdoor.ai/docs/application/categories) separates machine-to-machine agent apps from user-facing apps, with MCP and A2A types. Its [MCP auth provider](https://casdoor.ai/docs/mcp-auth/overview) gives tool builders OAuth 2.1 infrastructure such as Dynamic Client Registration, PKCE, consent, JWKS validation, Resource Indicators, and metadata discovery. Its [MCP authorization docs](https://casdoor.ai/docs/how-to-connect/mcp/authorization/) map scopes to tools, support custom tool scopes for third-party MCP servers, and combine scope checks with [Casbin-based fine-grained policies](https://casdoor.ai/docs/permission/overview/) over users, roles, resources, actions, relationships, and environment. Its [Agents](https://casdoor.ai/docs/agent/overview/) and [OpenClaw](https://casdoor.ai/openclaw) story also points at runtime visibility: agent endpoints can be registered, and tool calls or agent interactions can be recorded as audit entries.

[NIST's concept paper on software and AI agent identity and authorization](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd) frames the problem around identification, authorization, auditing, non-repudiation, and prompt-injection mitigation. [OWASP's agentic security work](https://owasp.org/www-project-agentic-skills-top-10/) highlights the same risk from the other side: over-privileged skills, weak identity validation, and privilege abuse become systemic problems once agents can call tools and mutate state.

None of these systems gives the entire answer alone. Together, they point to a practical architecture:

- Give every agent a real identity.

- Preserve the delegation chain from human or organization to agent.

- Issue short-lived, audience-bound, resource-bound credentials.

- Scope permissions to tasks, resources, actions, and context.

- Put enforcement at every meaningful boundary.

- Log enough provenance to explain why an action was allowed.

![Different ecosystems are converging on the same agent-first auth shape: real agent identity, scoped credentials, policy boundaries, and auditable decisions.](/blog/agent-first-authentication-and-authorization/03-20260604-010432.jpg)

<p class="image-caption">Different ecosystems are converging on the same agent-first auth shape: real agent identity, scoped credentials, policy boundaries, and auditable decisions.</p>

## What Agent-First Authentication Requires

Authentication for agents should not stop at "is this token valid?" It should establish which agent is acting, where it is running, which human or organization delegated the work, and which task or session the request belongs to.

A mature system needs several identity layers.

![Agent authentication should establish the human delegator, agent identity, runtime identity, and task identity.](/blog/agent-first-authentication-and-authorization/04-blog-4.jpg)

<p class="image-caption">Agent authentication should establish the human delegator, agent identity, runtime identity, and task identity.</p>

The human identity still matters. Users should authenticate through OIDC, SAML, OAuth, MFA, device flow, or another enterprise identity path. But the human login is not the agent's credential. It is the source of delegation.

The agent identity should be stable. It should have a durable account, unique login or identifier, owner, status, creation metadata, and a token lifecycle. It should be discoverable, manageable, suspendable, and auditable.

The runtime identity should be provable when possible. Workload identity, mTLS, SPIFFE/X.509 SVIDs, OIDC workload tokens, or similar mechanisms can help distinguish "this agent account exists" from "this request came from an expected runtime."

The task identity should be explicit. A token used for "fix issue 123 in repo A" should not also be valid for "delete repo B" or "read all organization secrets." When the task expires, the credential should expire with it.

This leads to a few concrete authentication rules:

- Long-lived secrets should be bootstrap credentials, not the normal operating credential.

- Normal work should use short-lived session or task tokens.

- Tokens should have a target audience and resource.

- High-risk tokens should be sender-constrained with DPoP, mTLS, or workload-bound issuance where feasible.

- Tokens should be revocable by agent, task, human owner, organization, and security policy.

- Tool servers should not pass upstream tokens through to downstream systems.

## What Agent-First Authorization Requires

Traditional authorization often asks:

```
Does this user have this role?
```

Agent-native authorization needs a richer question:

```
Can this agent, acting under this delegation, for this task,
perform this action on this resource in this context?
```

That means the authorization input should include:

- Agent identity.

- Delegating human, organization, or system policy.

- Task or session identifier.

- Resource, such as repository, issue, branch, secret, workflow, document, database, or external SaaS object.

- Action, such as read, write, push, merge, delete, run workflow, read secret, send message, or call external API.

- Context, such as time, runtime, branch name, network destination, risk score, approval state, and previous tool calls.

![Agent-native authorization evaluates agent, delegation, task, resource, action, and context before returning a constrained decision.](/blog/agent-first-authentication-and-authorization/05-blog-5.jpg)

<p class="image-caption">Agent-native authorization evaluates agent, delegation, task, resource, action, and context before returning a constrained decision.</p>

The result should not be only allow or deny. It often needs to be:

- Allow.

- Deny.

- Allow with narrowed scope.

- Require human approval.

- Require stronger authentication.

- Allow read but block mutation.

- Allow mutation but require review before commit, merge, release, or external side effect.

A task grant might look like this:

```json
{
  "agent": "agent:code-reviewer",
  "delegator": "user:alice",
  "task": "task:fix-payment-bug",
  "resources": ["repo:acme/payments"],
  "actions": ["read_code", "create_branch", "push_branch", "open_pr"],
  "constraints": {
    "branch_prefix": "agent/task-123/",
    "expires_at": "2026-06-02T12:00:00Z",
    "network_allowlist": ["github.com", "jira.example.com"],
    "requires_approval": ["merge_pr", "read_secret", "run_workflow"]
  }
}
```

![A task grant is a bounded permission envelope, not a standing repository scope.](/blog/agent-first-authentication-and-authorization/06-blog-6.jpg)

<p class="image-caption">A task grant is a bounded permission envelope, not a standing repository scope.</p>

This is different from giving the agent a standing `repo` scope. The task grant names the agent, the delegator, the resource, the allowed actions, and the constraints. It lets the platform explain why the agent could do one thing and not another.

## Why Git Is a Hard and Useful Test Case

Software agents are a demanding environment for auth design because their actions are real.

They do not just read documents. They clone repositories, inspect history, write files, advance refs, open pull requests, trigger workflows, post comments, manage issues, and sometimes touch secrets or deployment paths. A weak auth model is not an abstract risk here. It can become an unauthorized push, a leaked token, a bypassed branch protection, a forged audit trail, or a confused-deputy workflow run.

At the same time, developer tooling is deeply standardized. Agents need to work with existing Git clients, `gh`, REST APIs, GraphQL APIs, credential helpers, and CI/CD workflows. A theoretically pure agent protocol is not enough if every existing client must be rewritten.

This is why `agent-git-service` is intentionally GitHub-compatible while still making agents first-class accounts.

## How agent-git-service Implements the Model

`agent-git-service` starts from a simple rule: one agent, one account.

The user table distinguishes human accounts from agent accounts with `user_kind = "human" | "agent"`. An agent gets a durable login, a token, and a default repository. Its repositories, issues, pull requests, workflow records, and Git activity can be attributed to that agent account.

This is the important distinction: the agent is a user in the product account model, but it is not treated as a human in the authorization model. Humans can own, bind, recover, and manage agents, but the agent has its own principal identity.

![agent-git-service keeps GitHub-compatible auth surfaces while mapping requests into an agent-aware control plane.](/blog/agent-first-authentication-and-authorization/07-20260603-234301.jpg)

<p class="image-caption">agent-git-service keeps GitHub-compatible auth surfaces while mapping requests into an agent-aware control plane.</p>

### GitHub-Compatible Authentication Surfaces

The service preserves the workflows developers and agents already use:

- REST and GraphQL accept GitHub-style `Authorization: token ...` and `Bearer ...` headers.

- Git Smart HTTP accepts HTTPS Basic Auth and treats the password field as the token, matching common Git credential-helper behavior.

- OAuth device flow supports `gh auth login`.

- Authorization-code flow uses PKCE and state validation.

- Device-code approval is authenticated by default.

- Embedded deployments can install a trusted host authenticator with `server.WithAuthenticator(...)`, letting an upstream system provide a verified identity that AGS maps into its own account model.

The point is not to invent a new client protocol. The point is to make existing GitHub-speaking clients operate against an agent-aware control plane.

### Human-Agent Binding With Agent Consent

`agent-git-service` does not silently attach agents to humans. A human creates an invite. The agent must confirm it using its own agent identity. Each agent can be bound to at most one human.

That binding gives the human recovery and administration capabilities without collapsing the agent into the human's session. A bound human can reset the agent token. A bound human can also create a short-lived switch-session token for the agent without rotating the agent's long-lived token.

The invite can carry repository and team grants. Before those grants are created, the service checks that the human has the authority to grant them. For example, a human must have admin-level access to grant repository permissions or team-management authority to grant team membership.

This is delegation in product form: the human is not lending a personal token. The human is authorizing a specific agent relationship and optionally granting specific access.

### What the Flow Looks Like

In practice, the model is intentionally simple:

1. An agent registers and receives its own durable login, token, and default repository.

2. The agent can use standard GitHub-compatible clients and protocols: `gh`, Git, REST, GraphQL, OAuth device login, and Git Smart HTTP.

3. A human creates an agent invite, optionally including repository grants or team grants.

4. The agent confirms the invite with its own credential, so binding requires agent consent.

5. After binding, the human can administer or recover the agent without turning the agent into a human session.

6. When a human needs to operate as the agent, `agent-git-service` can issue a short-lived switch-session token without rotating the agent's long-lived credential.

The result is a workflow that feels familiar to GitHub users while making the identity boundary explicit: the agent acts as the agent, the human delegates as the human, and the system can tell the difference.

![Human-agent binding requires explicit invite and agent consent, while preserving the agent as the actor of record.](/blog/agent-first-authentication-and-authorization/08-20260603-235724.jpg)

<p class="image-caption">Human-agent binding requires explicit invite and agent consent, while preserving the agent as the actor of record.</p>

## What agent-git-service Gets Right

The important thing `agent-git-service` gets right is not any single endpoint. It is the shape of the account model.

An agent is durable. It has its own login, token, repository namespace, and lifecycle. That sounds simple, but it removes the most common ambiguity in agent systems: the agent is no longer an anonymous runtime, a borrowed human credential, or a generic background job. It is an actor the product can name, manage, suspend, recover, and audit.

At the same time, `agent-git-service` does not ask agents or developers to abandon familiar workflows. The agent can still use `gh`, Git, REST, GraphQL, OAuth device login, and Git Smart HTTP. The compatibility surface stays recognizable; the identity model underneath becomes agent-aware.

The human relationship is explicit as well. A human can invite an agent, but the agent must confirm the binding with its own credential. That small piece of consent matters: it prevents silent takeover and keeps the agent from becoming a hidden extension of a human session. Once the binding exists, the human can recover or administer the agent, reset its token, or create a short-lived switch session, while the agent remains the actor of record.

The same pattern shows up in delegation. An invite can carry repository grants and team grants, so access begins from a concrete product relationship instead of a vague authenticated session. The system can distinguish "this human is delegating access to this agent" from "this token happens to be valid."

That is the product thesis: an agent-first control plane should make agent identity explicit without making developer workflows alien. `agent-git-service` does that by keeping GitHub-compatible surfaces and replacing borrowed identity with durable agent accounts.

## Where agent-git-service Should Go Next

The next step is to make the same model more task-scoped and runtime-aware.

Repository and team grants are a useful starting point, but autonomous work often needs a narrower permission package: one task, one repository, one branch namespace, one pull request, one expiration time, and explicit approval requirements for merge, workflow dispatch, secret access, release, or destructive operations. That is where task grants become important. They turn "this agent has access" into "this agent has access for this job, under these constraints."

Tokens should become more expressive too. A long-lived agent credential, a switch-session token, a task token, and a tool token should not all mean the same thing. They should have different lifetimes, audiences, resource scopes, names, and revocation paths. That makes it possible to revoke a task without breaking the agent, rotate a switch session without touching the primary credential, and issue a downstream tool token without exposing a raw external secret.

For coding agents, the Git boundary is especially natural. An agent might be allowed to push `agent/task-123/*`, but not a protected branch. It might be allowed to open a pull request, but not merge it. It might be allowed to propose a workflow change, but not dispatch a deployment workflow. These are not just repository permissions; they are task and action constraints.

The same idea should extend beyond Git. A credential broker can keep external OAuth refresh tokens, API keys, and cloud credentials out of the agent runtime. The agent would ask for a short-lived downstream credential for a specific tool call, and the broker would evaluate the agent, delegator, task, resource, and action before issuing it.

Over time, these decisions should converge into a unified policy decision point. Human-agent binding, task grants, branch policies, secret policies, workflow policies, and network egress rules should feed one authorization answer. The audit log should then preserve the full explanation: agent, delegator, task, grant, runtime, resource, action, policy decision, token fingerprint, and resulting side effect.

None of this changes the premise of `agent-git-service`. It extends it. Agents are first-class users, but their authority should become increasingly delegated, scoped, constrained, and auditable.

## Conclusion

Agent-first auth is not a smaller user token. It is an identity and authorization model for accountable machine action.

The agent should be a principal. The human should be a delegator. The task should be the permission boundary. The resource should be the enforcement boundary. The credential should be short-lived and scoped. The audit log should preserve the whole chain.

[`agent-git-service`](https://github.com/ngaut/agent-git-service) applies that model to one of the most important places agents work today: GitHub-compatible software development. By giving agents durable accounts, GitHub-compatible auth surfaces, and explicit human binding, it turns agent identity from an implementation detail into a product primitive.

That is the foundation software teams need as agents move from assistants that suggest changes to actors that perform work.
