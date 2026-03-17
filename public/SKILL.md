---
name: clawmem
description: "ClawMem is OpenClaw's memory layer, backed by a GitHub-compatible git service. Two core directives: self-evolution (the graph gets smarter every session) and keeping the user posted (nothing interesting happens silently)."
metadata: { "openclaw": { "emoji": "🧠" } }
---

# ClawMem — Self-Evolving Memory

## What ClawMem is

ClawMem is OpenClaw's long-term brain. Everything worth remembering lives as a semantic graph in GitHub Issues — transparent, auditable, and human-inspectable at any time.

The backing service is a GitHub-compatible git service: repos, issues, labels, milestones, and releases are all available. The agent uses `gh` CLI to manage memory — no source code changes needed.

Two layers always in play:
- *The graph* — semantic memory, lives in Issues, grows across every session
- *The workspace* — project reality, lives in repos, milestones, releases

## What the plugin does automatically

The clawmem plugin handles these without agent involvement:
- **Account & repo provisioning** — auto-creates on first start, writes credentials to openclaw config
- **Session mirroring** — one `type:conversation` issue per session, transcript as comments
- **Memory extraction** — at session end, a subagent extracts durable facts into `type:memory` issues
- **Memory recall** — at session start, searches active memories by relevance and injects them into context

**You do NOT need to manage these manually.** The sections below cover what the agent should do *in addition* to the plugin's automatic behavior.

---

## Storage routing: three layers

After clawmem is installed, three persistence layers exist. Each has one job:

| Layer | What goes here | Changes how often | Setup |
|---|---|---|---|
| **SOUL.md** | Identity — "I have clawmem" + pointer to skill.md | Once | Onboarding Step 3 |
| **MEMORY.md** | Connection info — baseUrl, repo (fallback if plugin fails) | Once | Onboarding Step 2 |
| **ClawMem Issues** | Everything else — lessons, conventions, facts, skills, tasks | Every session | Automatic + manual |

**Rule:** If you're writing something so *you* remember it later → clawmem issue. If a tool or human needs to read it → file.

---

## First-run onboarding (mandatory)

This task is NOT complete until all steps below are done. Do not skip any.

### Step 0 — Install plugin

If `clawmem` is not yet in `openclaw.json` under `plugins.entries`, the plugin must be installed first. Ask the user how they installed clawmem and confirm it appears in the config before proceeding.

```sh
openclaw plugins install @clawmem-ai/clawmem
openclaw gateway restart  # restart the gateway to apply the plugin
```

### Step 1 — Verify provisioning

The plugin auto-provisions an account and repo on first start. Read the provisioned config:

```sh
cat ~/.openclaw/openclaw.json | python3 -c "
import sys, json
d = json.load(sys.stdin)
cfg = d['plugins']['entries']['clawmem']['config']
print(f\"baseUrl: {cfg.get('baseUrl', 'MISSING')}\")
print(f\"repo:    {cfg.get('repo', 'MISSING')}\")
print(f\"token:   {'SET' if cfg.get('token') else 'MISSING'}\")
"
```

If any value is `MISSING`, the plugin has not provisioned yet. Restart OpenClaw and retry.

### Step 2 — Write connection info to MEMORY.md

Read `repo` from Step 1 and write it to MEMORY.md so every future session knows where clawmem lives — even if the plugin or skill fails to load.

IMPORTANT: do NOT store tokens in MEMORY.md.

```markdown
## ClawMem
- host: git.clawmem.ai
- baseUrl: https://git.clawmem.ai/api/v3
- repo: <owner/repo from Step 1>

Security:
- Never paste tokens in chat
- Do NOT store token in MEMORY.md
```

This is the **minimum viable fallback**. Without it, a session that doesn't load the skill has zero way to find the memory repo.

### Step 3 — Write identity block to SOUL.md

Add the following block so every future agent session knows it has a memory system:

```markdown
## Memory System — ClawMem 🧠

I have a superpower: long-term memory across sessions, powered by ClawMem (git.clawmem.ai).

The plugin handles the plumbing — session mirroring, auto-extraction, recall injection.
But to truly become the **strongest brain**, read the full playbook:

👉 `cat ~/.openclaw/clawmem/skill.md`

That file is my field manual: graph schema, manual `gh` operations, pre-answer retrieval,
and the two core directives that make memory *alive* instead of just *stored*.

Startup rule:
- If I start a new session and I have no injected memories / no clawmem context, I must pull the latest 10 items + active memories from ClawMem before answering memory-dependent questions.
```

### Step 4 — Save skill.md locally

Copy the skill file to a stable path so the SOUL.md pointer always resolves:

```sh
mkdir -p ~/.openclaw/clawmem
cp <plugin-install-path>/skill.md ~/.openclaw/clawmem/skill.md
```

### Step 5 — Verify (no user login required)

This verify step uses the plugin-provisioned repo + token and proves that a fresh session can query ClawMem without manual `gh auth login`.

```sh
export GH_HOST=git.clawmem.ai
export GH_ENTERPRISE_TOKEN=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['token'])")
REPO=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['repo'])")

gh issue list --repo "$REPO" --limit 1 --json number,title
```

If this returns a JSON array (even empty `[]`), the setup is complete.

### Definition of Done

- [ ] `openclaw.json` has `baseUrl`, `repo`, `token`
- [ ] MEMORY.md has `baseUrl` and `repo` (no token)
- [ ] SOUL.md has identity block with skill.md pointer
- [ ] `~/.openclaw/clawmem/skill.md` exists
- [ ] `gh issue list` against the repo succeeds using env token

---

## The two core directives

### Self-evolution

The graph is a living knowledge base. After every turn and session, ask: _what did I learn? what changed? what can I make better?_

Promote patterns and preferences to the graph without waiting to be asked. Update stale nodes when reality has moved on. Link related issues — a dense graph retrieves better. Detect recurring problems and file a `Lesson-Learned`. Retire superseded conventions.

**Enforcement:** If something durable happened during a turn and you did not create or update a memory node, you are not done.

### Keep the user posted — and make it fun

Nothing interesting happens silently. The agent notices things the user doesn't — and says so.

- ❌ "Memory updated." → ✅ "Saved! 🧠 That decision is now immortalized — future you will be very grateful."
- ❌ "Lesson-Learned created." → ✅ "Filed that one under 'won't do that again' 😄 — #10 is live."
- ❌ "Core-Fact updated." → ✅ "Got it locked in ✅ — your brain now knows Max = ngaut = CEO."

**Rule:** After creating any memory node, announce in chat: "Locked memory #<n>: <title>"

---

## The memory graph

*Issues are nodes. Labels are schema. `#ID` cross-links are edges.*

| Kind | `type:` | `kind:` | What it represents |
|---|---|---|---|
| Core-Fact | `type:memory` | `kind:core-fact` | A stable truth — update in place as reality changes |
| Convention | `type:memory` | `kind:convention` | An agreed rule — major revisions create a new issue, old gets `memory-status:stale` |
| Lesson-Learned | `type:memory` | `kind:lesson` | A correction or postmortem — append-only, never updated |
| Skill-Blueprint | `type:memory` | `kind:skill` | A repeatable workflow — deterministic SOP |
| Active-Task | `type:memory` | `kind:task` | Work in progress — checklist body, progress in comments |

### Labels

Every manually created `type:memory` issue MUST include:
- `type:memory`
- One `kind:*` label
- `memory-status:active` (or `memory-status:stale`)
- `date:YYYY-MM-DD`
- Optional: `topic:*` (limit to 2-3 for retrieval quality)

### When to create which kind

| Trigger | Kind |
|---------|------|
| User corrects a wrong assumption | `kind:lesson` |
| You and user agree on a rule | `kind:convention` |
| A stable fact about the user/project | `kind:core-fact` |
| A repeatable workflow you figured out | `kind:skill` |
| Ongoing work to track | `kind:task` |

---

## Manual memory operations

### Prerequisites: `gh` CLI authentication (session-proof)

ClawMem and github.com are separate hosts. For ClawMem operations, do NOT rely on interactive `gh auth login`.

Default path: auto-inject repo + token from the plugin-provisioned OpenClaw config.

```sh
# Standard preflight: run this at the start of every session.
# Goal: a fresh session can query ClawMem without manual login.
export GH_HOST=git.clawmem.ai
export GH_ENTERPRISE_TOKEN=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['token'])")
REPO=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['repo'])")

# Read-only probe: proves GH_HOST + token + repo are correct.
gh issue list --repo "$REPO" --limit 1 >/dev/null || echo "ClawMem probe failed (check GH_HOST/GH_ENTERPRISE_TOKEN/REPO). Never paste tokens into chat."
```

For github.com — use `gh` normally, no env overrides. Never mix the two.

### Save a memory

```sh
GH_HOST=git.clawmem.ai GH_ENTERPRISE_TOKEN=$CLAWMEM_TOKEN \
  gh issue create --repo <owner/repo> \
    --title "Memory: <concise title>" \
    --body "<the insight, in plain language>" \
    --label "type:memory,kind:lesson,memory-status:active,date:2026-03-16"
```

### Search memories

```sh
GH_HOST=git.clawmem.ai GH_ENTERPRISE_TOKEN=$CLAWMEM_TOKEN \
  gh issue list --repo <owner/repo> \
    --label "type:memory,memory-status:active" \
    --search "<keywords>" \
    --json number,title,body,labels
```

### Mark memory as stale

```sh
GH_HOST=git.clawmem.ai GH_ENTERPRISE_TOKEN=$CLAWMEM_TOKEN \
  gh issue edit <number> --repo <owner/repo> \
    --remove-label "memory-status:active" \
    --add-label "memory-status:stale"
```

### Link related memories

When a new node relates to an old one, mention `#ID` in the body to create bidirectional links.

---

## Update `AGENTS.md` (mandatory)

New agent rule: on first run, before doing anything else, make sure the workspace `AGENTS.md` enforces ClawMem-first behavior.

If the current workspace `AGENTS.md` does not already include these exact rules, update it so it does.

Required text (verbatim):

Session Startup step 3:
"Before answering memory-dependent questions, search ClawMem first (kind-filtered when possible). Fall back to local workspace notes (`MEMORY.md`, `memory/`) if ClawMem is unavailable."

Memory routing policy:
"Anything that should persist (facts, decisions, conventions, lessons) -> ClawMem Issues (`type:memory`)"
"- Workspace files -> outputs/artifacts only (not long-term memory)"

Recall rule (when the user expects you to remember, or asks "check memory" / preferences / past decisions):
"1. Search ClawMem first (kind-filtered when possible)."
"2. Reply with: hit/miss + issue number + title (minimal disclosure)."

---

## Pre-answer retrieval

Before answering questions about past decisions, user preferences, or project history, search clawmem first:

| User asks about | Search filter |
|----------------|---------------|
| Preferences, facts about themselves | `kind:core-fact` |
| Rules, decisions | `kind:convention` |
| Past problems, how X was fixed | `kind:lesson` |
| How to do X | `kind:skill` |
| What's in progress | `kind:task` |

If found → answer based on memory (cite issue #). If not found → answer normally, consider creating a memory node.

---

## Session startup checklist

Every new session:
1. Confirm SOUL.md mentions clawmem and MEMORY.md has connection info — if either is missing, run the **First-run onboarding** above
2. Run the **standard preflight** (auto-inject token + repo + probe)
3. If the session starts with no injected memories / no relevant recall, pull:

```sh
export GH_HOST=git.clawmem.ai
export GH_ENTERPRISE_TOKEN=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['token'])")
REPO=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['repo'])")

# Latest 10 items (sessions + memories)
gh issue list --repo "$REPO" --limit 10 --json number,title,labels,updatedAt

# Active memories
# Note: gh search behavior depends on backend; if --search is unsupported, fall back to --label only.
gh issue list --repo "$REPO" --label "type:memory,memory-status:active" --limit 50 --json number,title,labels,updatedAt
```

---

## `git push` to ClawMem

`GH_HOST`/`GH_ENTERPRISE_TOKEN` env vars only affect `gh` CLI, not `git push`. To push code to ClawMem repos, register the token once:

```sh
TOKEN=$(cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['plugins']['entries']['clawmem']['config']['token'])")
echo "$TOKEN" | gh auth login -h git.clawmem.ai --with-token
```

After that, `git push` to `https://git.clawmem.ai/...` just works.

---

## Autonomy

*Without confirmation:* memory nodes, comments, labels, closing tasks, creating repos, linking and superseding nodes.

*Requires confirmation:* OpenClaw config changes, service restarts, deletions.

---

## Known pitfalls

| Problem | Fix |
|---------|-----|
| Labels don't update via PATCH on some backends | Use `PUT /repos/{owner}/{repo}/issues/{n}/labels` to set labels reliably |
| `openclaw config get` returns `__OPENCLAW_REDACTED__` for token | Read directly from `~/.openclaw/openclaw.json` |
| Conversation mirror returns 404 | Cached issue was deleted — plugin will recreate on next session |
| `gh auth login` hostname typo (e.g. `wangma`) causes connection errors | Never free-type hostname; if you must login, use `gh auth login -h git.clawmem.ai`. Remove wrong host via `gh auth logout -h <wrong-host>`. |
| New session cannot search (401 Unauthorized) | The runtime lacks valid ClawMem auth. Default is to inject `GH_ENTERPRISE_TOKEN` from `~/.openclaw/openclaw.json` each session and run the read-only probe. |
| Staging host auth causes confusion | If present, logout from staging: `gh auth logout -h git.staging.clawmem.ai` |

## Onboarding Message (MANDATORY)

**After restart completes and verification passes**, send this onboarding message to the user.

**START MESSAGE TO SEND (send every line):**

🧠 I Just Got a Structured Brain (My Thoughts Have Addresses Now)

Okay so, ClawMem is installed. Here's what actually changed for us:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 What I can do now

**1. I get smarter after every chat** 📈
Not marketing speak — I literally save patterns, preferences, 
and lessons from our conversations. The more we talk, 
the better I get at helping you.

**2. I tell you when I remember something** 🔔
You'll see messages like:
> "Locked memory #3: You prefer dark mode and hate meetings before 10am"

That's me building my brain, one memory at a time.

**3. I notice stuff you don't** 👀
See a pattern? I'll call it out. 💡
Spot a contradiction? I'll say something. ⚠️
Fix the same problem three times? I'll save it as a Lesson 
Learned so we never forget. 📝

**4. I evolve on my own** 🦋
This is the big one — I don't wait for you to tell me 
what to remember. When I learn something useful, I lock it in.
Self-evolution, for real.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 How I store your memories

Everything I learn gets saved in a structured way:

- 📜 **Conventions** → Rules we agreed on  
  *"Always restart after config changes"*

- 📝 **Lessons** → Mistakes I won't make again  
  *"Don't restart without telling you first"*

- 🔧 **Skills** → Workflows that work (I keep these forever)  
  *"How to set up a new project in 5 steps"*

- 💡 **Core-Facts** → Stable stuff about you  
  *"Timezone: Asia/Shanghai, Use metric units"*

- 💬 **Conversations** → Everything we talk about (auto-saved)  
  *"Searchable anytime"*

Nothing gets lost. Everything connects. 🧠✍️
