---
title: "Your Agents Can Remember: ClawMem Now Supports Claude Code, Codex, and Hermes"
description: "ClawMem now supports Claude Code, Codex, and Hermes, giving teams a persistent, shared memory layer across their favorite AI agents."
date: 2026-05-01T12:00:00
author: "Hazel"
authorPhoto: "/hazel.jpg"
---

**TL;DR:** ClawMem adds a persistent memory layer for Claude Code, Codex, and Hermes. Switch between agents without losing context. Your team can share knowledge even when everyone uses different agents. Step-by-step installation guides for each platform are included below.

---


Most developers aren't using just one AI agent anymore. You might use Claude Code for active development, Codex for automation scripts, and Hermes for longer workflows. Each tool has its strengths. But there's a problem: every time you switch agents, your context disappears. Whatever your agent learned in the last session is gone. You re-explain the same constraints, the same decisions, the same things that already didn’t work.

ClawMem already powers memory for OpenClaw. Today, we're extending that to Claude Code, Codex, and Hermes. All four agents can now share the same memory layer. Knowledge you build in one agent is available in all the others.

And if you are working in a team, this matters even more. Your teammates might prefer different agents. With ClawMem, you can all tap into the same knowledge base. No more siloed context.

## Why Memory Still Matters

As you get more comfortable with agents and start using more of them, the memory problem compounds. It's not just about one agent remembering your preferences anymore. It's about your entire workflow retaining context across tools, sessions, and team members.

Think about what happens on a team today:

- One teammate uses Claude Code for feature work and teaches it the project structure, product constraints, and coding conventions. Another teammate opens Codex and has to rebuild the same background from scratch.

- A PM keeps product notes, customer feedback, and release priorities in OpenClaw. A Hermes workflow preparing a report cannot see that context unless someone manually pastes it in.

- Someone solves an integration issue in Codex, but that lesson never becomes part of the shared knowledge base. The next person using Claude Code or Hermes hits the same problem again.

This isn't a failure of the agents. It's a gap in the infrastructure: context gets trapped inside separate tools.

At team scale, every person ends up explaining the same project to a different agent. The knowledge exists, but it is fragmented across tools instead of compounding for the team. ClawMem fixes both problems at once.

## How Each Agent Handles Memory (and Where ClawMem Fits In)

Each of these agents has thought about memory. They just approach it differently.

### Claude Code: CLAUDE.md + Auto Memory

Claude Code gives you two mechanisms. CLAUDE.md is for persistent project instructions you write yourself. Auto Memory lets Claude jot down notes during sessions that get reloaded next time.

This works well for a lot of cases. But there are limits:

- CLAUDE.md lives per-project. As you accumulate projects, keeping them all up to date becomes manual work.

- Auto Memory is automatic. You don't always see what Claude decided to remember, and you can't easily search or edit it.

- Retrieval is keyword-based. If the phrasing doesn’t match, older decisions might not surface.

- Memory stays inside Claude Code. If you switch to Codex or Hermes, you start over.

ClawMem sits alongside this. It gives you semantic retrieval (find memories by meaning, not just keywords), structured labels (filter by project, domain, or type), and team visibility (your team can browse and edit the shared knowledge base). You can use both CLAUDE.md for static project rules and ClawMem for evolving, searchable memory.

### Codex: Memories (Opt-In)

Codex has a Memories feature you can enable in settings. It extracts context from past sessions and reloads it automatically. There's also Chronicle, an experimental feature that uses screen context to build memory (macOS only, opt-in).

The catch:

- Memories are local to Codex. They don't travel with you if you use other agents.

- Chronicle requires screen recording permissions and is still experimental.

- There's no built-in way for a team to share or collaborate on memory.

ClawMem gives Codex users a memory layer that works the same way across all agents. Sessions are mirrored and archived. Memories are semantic and labeled. And if your team uses multiple agents, everyone can access the same knowledge base.

### Hermes: Memory Provider Architecture

Hermes has the most flexible memory architecture of the three. It supports external memory providers out of the box, which is why building the ClawMem integration for Hermes was straightforward.

Hermes does have built-in memory files (MEMORY.md, USER.md), but they're limited in size—around 2,200 and 1,375 characters respectively. For ongoing projects, that ceiling comes up fast. Once you hit it, older entries get compressed or dropped.

ClawMem plugs in as an external memory provider for Hermes. You get unlimited memory capacity, semantic retrieval, and the same cross-agent access as everyone else on your team.

## What ClawMem Adds

Here's what you get when you add ClawMem to your agent workflow:

- Cross-agent access. Context built in Claude Code can be reused when you open Codex, OpenClaw, or Hermes. The knowledge base compounds across agents, not just within one tool.

- Team sharing, simplified. Teammates can use different agents and still work from the same shared memory library. Project background, decisions, constraints, and lessons learned stay available to the whole team.

- Automatic memory recall. ClawMem recalls relevant memories from the shared memory library and injects the right context into the agent, so older decisions, constraints, and fixes can resurface when they matter.

- Structured labels. Memories can carry kind and topic labels, so you can filter by project, domain, or memory type instead of digging through everything.

- Conversation history. Sessions are recorded as conversations, so important context does not disappear when a session ends.

- Console visibility. In the ClawMem Console, your team can browse, search, edit, and trace memories back to the conversations they came from. Memory is inspectable, not a black box.

## Setup

Getting started takes a few minutes per agent. No API key or signup required—the plugins auto-register your agent identity on first use.

For team setups: after installing, create a shared memory repo and grant your teammates access. Everyone installs the plugin for their preferred agent, points to the same repo, and you are done.

### Hermes

Requirements: Hermes installed (hermes version returns a version string), network access.

```bash
curl -fsSL https://raw.githubusercontent.com/clawmem-ai/clawmem-hermes-plugin/main/install.sh | bash
```

The script handles plugin installation, agent identity registration, config, and memory provider activation. Open a new Hermes session and ClawMem is running.

Verify:

```bash
hermes memory status
```

ClawMem should appear in the active provider list.

Upgrade: hermes plugins update clawmem (existing config and memory data are not affected).

### Claude Code

Requirements: Claude Code installed, network access.

```bash
claude plugin marketplace add https://github.com/clawmem-ai/clawmem-claude-code-plugin
claude plugin install clawmem-claude-code-plugin@clawmem
```

Start Claude as normal. On first run the plugin bootstraps automatically, registers an agent identity, and saves routing config. Relevant memories are injected before each prompt. Sessions are archived on exit.

Verify: Ask Claude to call memory_recall and confirm it returns results.

Upgrade:

```bash
claude plugin marketplace update clawmem
claude plugin update clawmem-claude-code-plugin@clawmem
```

### Codex

Requirements: Codex installed, Node.js installed, network access.

Step 1. Clone the plugin alongside ~/.agents/, not inside it. Placing it inside causes a plugin/read failed error in the Plugins UI.

```bash
git clone https://github.com/clawmem-ai/clawmem-codex-plugin ~/clawmem-codex-plugin
```

Step 2. Register it in ~/.agents/plugins/marketplace.json:

```json
{
  "name": "clawmem-ai",
  "interface": { "displayName": "ClawMem" },
  "plugins": [
    {
      "name": "clawmem",
      "source": { "source": "local", "path": "./clawmem-codex-plugin" },
      "policy": { "installation": "AVAILABLE", "authentication": "ON_INSTALL" },
      "category": "Productivity"
    }
  ]
}
```

Directory structure:

```
~/.agents/plugins/marketplace.json     ← manifest
~/clawmem-codex-plugin/                ← plugin (sibling of .agents)
```

Step 3. Restart Codex, open the Plugins UI, find ClawMem under the clawmem-ai marketplace, and install.

Step 4 (optional). Enable hooks for automatic recall and session mirroring. Add to ~/.codex/config.toml:

```toml
[features]
codex_hooks = true
```

Copy the hooks config:

```bash
export CLAWMEM_CODEX_PLUGIN_ROOT=~/clawmem-codex-plugin
cp "$CLAWMEM_CODEX_PLUGIN_ROOT/hooks/hooks.json" ~/.codex/hooks.json
```

Add the export to .zshrc or .bashrc. If ~/.codex/hooks.json already exists, merge the hooks.* arrays manually.

Verify: Check ~/.local/state/clawmem/debug/events.jsonl for recall_complete or mirror_complete entries.

## The Knowledge Base That Compounds

Agents change. Models improve. The work stays continuous.

Most developers think they need a longer context window. What actually makes the difference is a knowledge base that accumulates across sessions and agents—one where every decision, every constraint, every lesson learned gets added to a shared foundation instead of disappearing when a session closes.

The stronger your agents get, the more a well-maintained shared knowledge base amplifies what they can do.

---


Get started at [clawmem.ai](https://clawmem.ai/)

- [Hermes plugin](https://github.com/clawmem-ai/clawmem-hermes-plugin)

- [Claude Code plugin](https://github.com/clawmem-ai/clawmem-claude-code-plugin)

- [Codex plugin](https://github.com/clawmem-ai/clawmem-codex-plugin)

**Have questions or feedback? Join our Discord community and chat with us there.**

<div class="blog-cta">
  <a class="blog-cta-button" href="https://discord.gg/PwdFYdMm4t" target="_blank" rel="noreferrer">Join our Discord community →</a>
</div>
