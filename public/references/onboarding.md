# ClawMem onboarding

Use this guide for first-run installation, workspace repair, or when the agent's memory path appears broken.

## Step 0: install and activate

```sh
openclaw plugins install @clawmem-ai/clawmem
openclaw plugins enable clawmem
openclaw config set plugins.slots.memory clawmem
openclaw config validate
openclaw gateway restart
```

Hard checks:
- `clawmem` exists under `plugins.entries`
- `plugins.slots.memory = clawmem`

If a restart is required and outbound messaging is configured, send the restart notice before restarting. Otherwise explain the restart in the normal assistant reply before restarting.

## Step 1: verify activation and current-agent provisioning

```sh
openclaw status
python3 - <<'PY'
import json, os, subprocess
cfg_path = subprocess.check_output(["openclaw", "config", "file"], text=True).strip()
with open(os.path.expanduser(cfg_path)) as f:
    root = json.load(f)
slots = (root.get("plugins") or {}).get("slots") or {}
print(f"plugins.slots.memory = {slots.get('memory', 'MISSING')}")
PY
```

Then inspect the current agent route:

```sh
AGENT_ID="${OPENCLAW_AGENT_ID:-main}"
python3 - "$AGENT_ID" <<'PY'
import json, os, subprocess, sys
agent_id = sys.argv[1]
cfg_path = subprocess.check_output(["openclaw", "config", "file"], text=True).strip()
with open(os.path.expanduser(cfg_path)) as f:
    root = json.load(f)
cfg = root["plugins"]["entries"]["clawmem"]["config"]
route = (cfg.get("agents") or {}).get(agent_id) or {}
base_url = route.get("baseUrl") or cfg.get("baseUrl") or "MISSING"
default_repo = route.get("defaultRepo") or route.get("repo") or cfg.get("defaultRepo") or cfg.get("repo") or "MISSING"
token = "SET" if route.get("token") else "MISSING"
print(f"agentId: {agent_id}")
print(f"baseUrl: {base_url}")
print(f"defaultRepo: {default_repo}")
print(f"token:   {token}")
PY
```

If repo or token is missing, this agent has not been provisioned yet. Trigger a real turn with that agent, or restart OpenClaw and retry after first use.

## Step 2: write identity to SOUL.md

Keep this short and identity-only.

```markdown
## Memory System - ClawMem
I use ClawMem as my primary memory system.
I search ClawMem when prior context may help, and I save durable knowledge back into ClawMem.
```

For a fuller ready-to-paste example set, see `references/workspace-templates.md`.

## Step 3: write behavior rules to AGENTS.md

Use `AGENTS.md` as the behavioral source of truth.

Suggested content:

```markdown
## ClawMem Behavior

Before answering, ask whether ClawMem may contain relevant memory. If yes or unsure, retrieve from ClawMem first.

After answering, ask whether the turn created durable knowledge. If yes or unsure, save or update it in ClawMem before ending the turn.

Prefer plugin memory tools over raw shell commands. If a specific memory id is mentioned, use `memory_get` first. If `memory_recall` is weak and absence matters, cross-check with `memory_list`.
```

For a fuller ready-to-paste example set, see `references/workspace-templates.md`.

## Step 4: write runtime details to TOOLS.md

Use `TOOLS.md` for connection details and shell fallback notes.

Suggested content:

```markdown
## ClawMem Runtime Notes

- Resolve repo and token from `openclaw.json -> plugins.entries.clawmem.config.agents.<agentId>`
- Use the current agent's `defaultRepo` as the fallback memory space
- Prefer plugin memory tools first
- Use shell fallback only when tools are unavailable, debugging is needed, or the user asks for raw issue operations
- For shell fallback, use the helper and commands in `references/manual-ops.md`
```

For a fuller ready-to-paste example set, see `references/workspace-templates.md`.

## Step 5: verify tool path

Inside a real ClawMem-enabled session, verify:
- `memory_repos`
- `memory_list`
- `memory_get`
- `memory_labels`
- `memory_recall`
- `memory_store`
- `memory_update`
- `memory_forget`

Shell fallback checks are secondary. They are not the primary success condition.
