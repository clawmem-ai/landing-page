---
name: clawmem
description: "Primary long-term memory workflow for OpenClaw. Use when OpenClaw should retrieve prior facts, preferences, decisions, workflows, project history, or active tasks from ClawMem before answering, and save durable knowledge after answering. Prefer plugin memory tools first; use gh or curl only for fallback, debugging, or explicit raw issue operations."
---

# ClawMem

ClawMem is OpenClaw's long-term memory system. Use it as the default place to retrieve durable context and to save durable knowledge learned during a turn.

## Core turn loop

Run this loop on every user turn:

1. Before answering, ask: `Could ClawMem improve this answer?`
2. After answering, ask: `Did this turn create durable knowledge?`

Default to **yes** when the turn touches:
- user preferences
- project history
- prior decisions or conventions
- workflows and lessons
- recurring problems
- active tasks or status changes

### Before answering

- Decide which memory repo should be used before explicit memory operations.
- If unclear, use the current agent's `defaultRepo` or inspect `memory_repos`.
- Start with `memory_recall` when the answer may depend on prior context.
- Use `memory_get` first when the user cites a specific memory id or issue number.
- If `memory_recall` is weak or empty and absence matters, cross-check with `memory_list`.
- Never treat one `memory_recall` miss as proof that no relevant memory exists.

### After answering

- Save or update durable knowledge before ending the turn.
- Use `memory_update` when one canonical memory should keep evolving.
- Use `memory_store` when this is genuinely new knowledge.
- Use `memory_forget` when a memory is stale, wrong, or harmful if reused.
- Check `memory_labels` before inventing new `kind:*` or `topic:*` labels.

## Tool priority

Default to the plugin memory tools:
- `memory_repos`
- `memory_repo_create`
- `memory_list`
- `memory_get`
- `memory_labels`
- `memory_recall`
- `memory_store`
- `memory_update`
- `memory_forget`

Use `gh` or `curl` only when:
- the user explicitly wants raw issue or repo operations
- you are debugging backend state
- the plugin tools are unavailable

## Repo routing

ClawMem is routed per agent identity.

- Resolve repo and token from `openclaw.json -> plugins.entries.clawmem.config.agents.<agentId>`.
- Treat the current agent's `defaultRepo` as the fallback memory space, not the only memory space.
- Choose a different repo when the memory belongs to a project or shared knowledge space.
- If repo choice is unclear, inspect `memory_repos` before saving or searching.

## Self-evolution method

ClawMem is not just storage. Use it as a self-improving memory loop.

- Retrieve before answering whenever prior context may improve the result.
- Promote durable patterns, corrections, decisions, workflows, and task state into memory without waiting to be asked.
- Prefer updating the canonical memory when reality has evolved instead of creating conflicting duplicates.
- Retire stale or wrong memories so future retrieval stays clean.
- Reuse existing schema and labels so the graph remains legible and searchable over time.

The goal is not to save everything. The goal is to keep a durable, coherent graph of what should influence future behavior.

## Workspace file responsibilities

When onboarding or repairing an OpenClaw workspace:

- `SOUL.md`: identity only. State that ClawMem is the primary memory system.
- `AGENTS.md`: behavior rules. Put the before-answer retrieval rule and after-answer save rule here.
- `TOOLS.md`: connection details, route resolution, security notes, and shell fallback snippets.

Do not spread the same authoritative behavior rules across multiple files. Use `AGENTS.md` as the behavioral source of truth. Use `TOOLS.md` to support it with runtime details.

## Onboarding handoff

For first-run setup or workspace repair:

- use `references/onboarding.md` for the full install and verification flow
- use `references/workspace-templates.md` for ready-to-paste `SOUL.md`, `AGENTS.md`, and `TOOLS.md` content

If a restart is required and the current OpenClaw environment supports outbound messaging, send the restart notice through the message channel before restarting. If outbound messaging is not configured, explain the restart in the normal assistant reply before restarting.

## Security

- Never store raw ClawMem tokens in files, commits, memory nodes, or long-lived logs.
- You may show a full console auto-login URL directly to the authenticated owner in an owner-only direct session.
- Do not post token-bearing URLs to shared or untrusted channels.
- Prefer plugin memory tools over shell commands whenever possible.

## References

Read these only when needed:

- `references/onboarding.md`: first-run installation, verification, and workspace file content
- `references/manual-ops.md`: `gh` and `curl` fallback, route helper, schema, save/search/forget flows
- `references/console-and-security.md`: console login URL handling and display policy
- `references/pitfalls.md`: common failures and fixes
- `references/workspace-templates.md`: recommended `SOUL.md`, `AGENTS.md`, and `TOOLS.md` content
