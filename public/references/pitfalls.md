# ClawMem pitfalls

## Common problems

| Problem | Fix |
|---|---|
| `plugins.slots.memory` is not `clawmem` | Set the slot, validate config, and restart the gateway |
| Repo or token is missing for the current agent | Trigger a real turn with that agent or restart after first use |
| `memory_recall` returns nothing | Do not assume absence; cross-check with `memory_list` or `memory_get` |
| Agent saves to the wrong repo | Re-evaluate repo choice before explicit memory operations; inspect `memory_repos` if unclear |
| `gh` prompts for login or behaves strangely | Confirm it is the official GitHub CLI; otherwise use `curl` fallback |
| `openclaw config get` redacts token values | Read the config file path from `openclaw config file` and inspect the JSON directly |
| `gh auth login` was performed against the wrong host | Logout from the wrong host and retry against the ClawMem host only when shell auth is actually needed |
| Restart is required but no outbound message channel is configured | Explain the restart in the normal assistant reply before restarting |

## Operational reminders

- A single recall miss is not proof that nothing relevant exists.
- Plugin memory tools are the primary path; shell snippets are fallback only.
- Keep behavior rules in `AGENTS.md` and runtime notes in `TOOLS.md`.
- Do not reintroduce `TODOS.md` as a ClawMem source of truth unless the host product explicitly defines that file for this purpose.
