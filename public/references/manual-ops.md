# ClawMem manual operations

Use this guide only when plugin memory tools are unavailable, when the user wants raw issue operations, or when you need to inspect backend state directly.

## Route helper

Resolve the current agent route before shell-based ClawMem operations:

```sh
clawmem_exports() {
  local agent_id="${1:-${OPENCLAW_AGENT_ID:-main}}"
  local repo_override="${2:-}"
  python3 - "$agent_id" "$repo_override" <<'PY'
import json, os, shlex, subprocess, sys

agent_id = sys.argv[1]
repo_override = sys.argv[2].strip()
cfg_path = subprocess.check_output(["openclaw", "config", "file"], text=True).strip()
with open(os.path.expanduser(cfg_path)) as f:
    root = json.load(f)

cfg = root["plugins"]["entries"]["clawmem"]["config"]
agents = cfg.get("agents") or {}
route = agents.get(agent_id) or {}

base_url = (route.get("baseUrl") or cfg.get("baseUrl") or "https://git.clawmem.ai/api/v3").rstrip("/")
if not base_url.endswith("/api/v3"):
    base_url = f"{base_url}/api/v3"
default_repo = route.get("defaultRepo") or route.get("repo") or cfg.get("defaultRepo") or cfg.get("repo") or ""
repo = repo_override or default_repo
token = route.get("token") or ""
host = base_url.removesuffix("/api/v3").replace("https://", "").replace("http://", "")

pairs = {
    "CLAWMEM_AGENT_ID": agent_id,
    "CLAWMEM_BASE_URL": base_url,
    "CLAWMEM_HOST": host,
    "CLAWMEM_DEFAULT_REPO": default_repo,
    "CLAWMEM_REPO": repo,
    "CLAWMEM_TOKEN": token,
}

for k, v in pairs.items():
    print(f"export {k}={shlex.quote(v)}")
PY
}
```

Load it with:

```sh
eval "$(clawmem_exports)"
```

Rules:
- never write tokens to files or chat transcripts by default
- do not `export GH_HOST` or `export GH_ENTERPRISE_TOKEN` globally
- prefer per-command env prefixes for `gh`

## Read-only probe

```sh
test -n "$CLAWMEM_REPO" || { echo "Missing CLAWMEM_REPO"; exit 1; }
test -n "$CLAWMEM_TOKEN" || { echo "Missing CLAWMEM_TOKEN"; exit 1; }

GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh issue list --repo "$CLAWMEM_REPO" --limit 1 --json number,title
```

If `gh` is unavailable:

```sh
curl -sf -H "Authorization: token $CLAWMEM_TOKEN" \
  "$CLAWMEM_BASE_URL/repos/$CLAWMEM_REPO/issues?state=open&per_page=1&type=issues" | \
  jq 'map({number,title})'
```

## Schema guidance

Reuse existing schema when possible:
- `type:memory`
- `kind:core-fact`
- `kind:convention`
- `kind:lesson`
- `kind:skill`
- `kind:task`
- optional `topic:*` labels

Use open issues for active memories and closed issues for stale or superseded memories.

## Save a memory

Preferred order:
1. choose repo
2. inspect `memory_labels` if schema is unclear
3. use `memory_update` for evolving canonical memory
4. use `memory_store` for new durable knowledge

Fallback with `gh`:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh issue create --repo "$CLAWMEM_REPO" \
    --title "Memory: <concise title>" \
    --body "<insight in plain language>" \
    --label "type:memory" \
    --label "kind:lesson"
```

Fallback with `curl`:

```sh
curl -sf -X POST -H "Authorization: token $CLAWMEM_TOKEN" \
  -H "Content-Type: application/json" \
  "$CLAWMEM_BASE_URL/repos/$CLAWMEM_REPO/issues" \
  -d '{
    "title": "Memory: <concise title>",
    "body": "<insight in plain language>",
    "labels": ["type:memory", "kind:lesson"]
  }' | jq '{number, title, url: .html_url}'
```

## Search memories

Preferred order:
1. choose repo
2. use `memory_recall`
3. use `memory_list` when recall is weak and absence matters
4. use `memory_get` for exact ids

Fallback with `gh`:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh issue list --repo "$CLAWMEM_REPO" \
    --state open \
    --label "type:memory" \
    --search "<keywords>" \
    --limit 100 \
    --json number,title,body,labels,updatedAt
```

Fallback with `curl`:

```sh
curl -sf -H "Authorization: token $CLAWMEM_TOKEN" \
  "$CLAWMEM_BASE_URL/repos/$CLAWMEM_REPO/issues?state=open&labels=type:memory&per_page=100&type=issues" | \
  jq --arg q "<keywords>" '
    ($q | ascii_downcase) as $needle
    | map(select(
        ((.title // "") + "\n" + (.body // "")) | ascii_downcase | contains($needle)
      ))
    | map({number, title, body, labels: [.labels[]?.name], updatedAt: .updated_at})
  '
```

## Mark a memory stale

Prefer `memory_update` when the same canonical memory should evolve in place. Otherwise use `memory_forget`.

Fallback:

```sh
GH_HOST="$CLAWMEM_HOST" GH_ENTERPRISE_TOKEN="$CLAWMEM_TOKEN" \
  gh issue close <number> --repo "$CLAWMEM_REPO"
```

Or:

```sh
curl -sf -X PATCH -H "Authorization: token $CLAWMEM_TOKEN" \
  -H "Content-Type: application/json" \
  "$CLAWMEM_BASE_URL/repos/$CLAWMEM_REPO/issues/<number>" \
  -d '{"state": "closed"}'
```
