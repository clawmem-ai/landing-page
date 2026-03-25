# ClawMem workspace templates

Use these templates when onboarding a new OpenClaw workspace or repairing one that has drifted.

## `SOUL.md`

Keep this file short and identity-only.

```markdown
## Memory System - ClawMem

I use ClawMem as my primary memory system.
I retrieve from ClawMem when prior context may improve an answer.
I save durable knowledge back into ClawMem after the turn when needed.
```

## `AGENTS.md`

Use this file as the behavioral source of truth.

```markdown
## ClawMem Behavior

Before answering, ask whether ClawMem may contain relevant memory.
If yes or unsure, retrieve from ClawMem first.

Default to retrieval when the turn touches:
- user preferences
- project history
- prior decisions or conventions
- workflows and lessons
- recurring problems
- active tasks or status changes

If the user cites a specific memory id or issue number, use `memory_get` first.
If `memory_recall` is weak or empty and absence matters, cross-check with `memory_list`.

After answering, ask whether the turn created durable knowledge.
If yes or unsure, save or update it in ClawMem before ending the turn.

Use `memory_update` when one canonical memory should keep evolving.
Use `memory_store` when the turn produced genuinely new durable knowledge.
Use `memory_forget` when a memory is stale, wrong, or harmful if reused.
Check `memory_labels` before inventing new `kind:*` or `topic:*` labels.

Prefer plugin memory tools over raw shell commands.
Use shell fallback only when tools are unavailable, backend inspection is required, or the user explicitly asks for raw issue operations.
```

## `TOOLS.md`

Use this file for runtime details, connection notes, and shell fallback guidance.

```markdown
## ClawMem Runtime Notes

- Resolve repo and token from `openclaw.json -> plugins.entries.clawmem.config.agents.<agentId>`
- Treat the current agent's `defaultRepo` as the fallback memory space, not the only memory space
- Inspect `memory_repos` when repo choice is unclear
- Prefer plugin memory tools first:
  - `memory_repos`
  - `memory_repo_create`
  - `memory_list`
  - `memory_get`
  - `memory_labels`
  - `memory_recall`
  - `memory_store`
  - `memory_update`
  - `memory_forget`
- Use shell fallback only when tools are unavailable, backend inspection is required, or the user asks for raw issue operations
- For shell fallback, use the helper and commands in `references/manual-ops.md`

## ClawMem Security

- Never store raw ClawMem tokens in files, commits, memory nodes, or long-lived logs
- You may show a full console auto-login URL directly to the authenticated owner in an owner-only direct session
- Do not post token-bearing URLs to shared or untrusted channels
```

## Notes

- Keep `SOUL.md` short. Do not move behavioral rules there.
- Keep `AGENTS.md` authoritative for turn behavior.
- Keep `TOOLS.md` focused on runtime details and fallback mechanics.
- If a restart is required and outbound messaging is configured, send the restart notice before restarting. Otherwise explain the restart in the normal assistant reply before restarting.
