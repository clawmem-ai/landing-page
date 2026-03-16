/* ── Internationalization ── */

const translations = {
  en: {
    // Nav
    "nav.features": "Features",
    "nav.install": "Install",
    "nav.console": "Console",
    // Hero
    "hero.sub": "The memory that actually persists.",
    "hero.desc": "Records your conversations, extracts key facts, searches by relevance, and injects the right context before every session. All inspectable, all editable, all yours.",
    "hero.hint": '<span class="hint-action" data-i18n="hero.hint.action">Copy this</span> into your OpenClaw chat to get started',
    "hero.hint.action": "Copy this",
    "hero.paste": "paste in OpenClaw",
    // How it works
    "how.heading": 'From raw sessions to <span class="claw-accent">durable context</span>',
    // Shared step headings
    "how.step1.title": "Capture the session",
    "how.step1.desc": "Every conversation is recorded automatically. Nothing falls through the cracks.",
    "how.step2.title": "Store what matters",
    "how.step2.desc": "Key facts, preferences, and decisions are distilled into structured, durable memory records.",
    "how.step2.type": "type",
    "how.step2.type.val": "memory",
    "how.step2.source": "source",
    "how.step2.status": "status",
    "how.step2.status.val": "active",
    "how.step2.detail": "detail",
    "how.step3.title": "Recall it when needed",
    "how.step3.desc": "Before the next run, relevant memories are found and injected into context automatically.",
    // Scenario tabs
    "scenario.tab.daily": "Daily Life",
    "scenario.tab.family": "Family Sync",
    "scenario.tab.work": "Pro Work",
    "scenario.tab.team": "Team Sync",
    // Memory issue tags (shared)
    "mtag.open": "Persisted",
    "mtag.memory": "Memory",
    "mtag.type.memory": "type:memory",
    "mtag.status.active": "status:active",
    "mtag.kind.preference": "kind:preference",
    "mtag.kind.event": "kind:event",
    "mtag.kind.decision": "kind:decision",
    "mtag.kind.update": "kind:update",
    "mtag.topic.food": "topic:food",
    "mtag.topic.personal": "topic:personal",
    "mtag.topic.family": "topic:family",
    "mtag.topic.api": "topic:api",
    "mtag.topic.client": "topic:client",
    "mtag.source.mom": "source:mom",
    "mtag.source.sarah": "source:sarah",
    // Daily Life scenario
    "daily.s1.session": "session #12",
    "daily.s1.user": "You",
    "daily.s1.user.msg": "I'm lactose intolerant, keep that in mind for any food suggestions.",
    "daily.s1.agent": "Agent",
    "daily.s1.agent.msg": "Noted! I'll always suggest dairy-free options for you.",
    "daily.s2.source.val": "Session #12, Turn 1",
    "daily.s2.session.tag": "session:#12, turn:1",
    "daily.s2.detail.val": "User is lactose intolerant. Always suggest dairy-free alternatives.",
    "daily.s3.session": "session #35",
    "daily.s3.user": "You",
    "daily.s3.user.msg": "Find me a quick pasta recipe for tonight.",
    "daily.s3.agent": "Agent",
    "daily.s3.agent.msg": "Here's a creamy cashew alfredo — no dairy, just how you need it.",
    "daily.s3.source": "Source: Session #12, Turn 1",
    // Family Sync scenario
    "family.s1.desc": "Someone in your family tells their agent something important — it gets recorded in shared memory.",
    "family.s1.session": "Mom's session #8",
    "family.s1.user": "Mom",
    "family.s1.user.msg": "Grandma's birthday is March 20. She mentioned wanting a silk scarf.",
    "family.s1.agent": "Agent",
    "family.s1.agent.msg": "Got it — I'll remember the date and the gift idea.",
    "family.s2.source.val": "Mom's Session #8, Turn 1",
    "family.s2.session.tag": "session:#8, turn:1",
    "family.s2.detail.val": "Grandma's birthday Mar 20. Gift idea: silk scarf.",
    "family.s3.desc": "Your agent pulls in memories from family members, so you never miss what matters.",
    "family.s3.session": "your session #20",
    "family.s3.user": "You",
    "family.s3.user.msg": "Any family events coming up this month?",
    "family.s3.agent": "Agent",
    "family.s3.agent.msg": "Grandma's birthday is March 20. Mom mentioned she'd like a silk scarf.",
    "family.s3.source": "Source: Mom's Session #8, Turn 1",
    // Pro Work scenario
    "work.s1.session": "session #42",
    "work.s1.user": "You",
    "work.s1.user.msg": "Our API rate limit moved to a sliding window policy.",
    "work.s1.agent": "Agent",
    "work.s1.agent.msg": "Got it. I\u2019ll remember that for future API work.",
    "work.s2.source.val": "Session #42, Turn 3",
    "work.s2.session.tag": "session:#42, turn:3",
    "work.s2.detail.val": "API rate limiting uses sliding window policy.",
    "work.s3.session": "session #58",
    "work.s3.user": "You",
    "work.s3.user.msg": "What rate limit policy are we using?",
    "work.s3.agent": "Agent",
    "work.s3.agent.msg": "You switched to a sliding window policy on Mar 9.",
    "work.s3.source": "Source: Session #42, Turn 3",
    // Team Sync scenario
    "team.s1.desc": "A teammate tells their agent about an update — it's stored in shared team memory.",
    "team.s1.session": "Sarah's session #15",
    "team.s1.user": "Sarah",
    "team.s1.user.msg": "Client meeting moved to Thursday 2pm. They want the proposal to focus on sustainability.",
    "team.s1.agent": "Agent",
    "team.s1.agent.msg": "Got it — meeting rescheduled, proposal angle updated.",
    "team.s2.source.val": "Sarah's Session #15, Turn 2",
    "team.s2.session.tag": "session:#15, turn:2",
    "team.s2.detail.val": "Client meeting Thu 2pm. Proposal focus: sustainability.",
    "team.s3.desc": "Your agent surfaces teammates' updates before you start — no Slack archaeology needed.",
    "team.s3.session": "your session #31",
    "team.s3.user": "You",
    "team.s3.user.msg": "I need to prep for the client meeting. Any updates?",
    "team.s3.agent": "Agent",
    "team.s3.agent.msg": "Sarah moved it to Thursday 2pm. They want the proposal to focus on sustainability.",
    "team.s3.source": "Source: Sarah's Session #15, Turn 2",
    // Inspectable
    "inspect.heading": 'Memory should feel <span class="claw-accent">inspectable</span>, not mystical',
    "inspect.desc": "Every memory is a structured record you can see, search, edit, and trace back to its source. No hidden embeddings, no black boxes.",
    "inspect.visible": "Visible",
    "inspect.visible.desc": "Browse all memories in a structured list. Nothing is hidden.",
    "inspect.searchable": "Searchable",
    "inspect.searchable.desc": "Semantic search by meaning, not just keywords.",
    "inspect.editable": "Editable",
    "inspect.editable.desc": "Fix, merge, or delete any memory before it shapes the next answer.",
    "inspect.traceable": "Traceable",
    "inspect.traceable.desc": "Every memory links back to the exact session and turn that created it.",
    // Under the hood
    "hood.heading": 'Under the <span class="claw-accent">hood</span>',
    "hood.desc": "Memory is stored in a structured, inspectable backend inspired by GitHub workflows.",
    "hood.node1": "OpenClaw Session",
    "hood.node2": "ClawMem Plugin",
    "hood.node3": "Memory Backend",
    "hood.node4": "Next-Run Recall",
    "hood.api.title": "GitHub-compatible API",
    "hood.api.desc": "Operate memory with tools you already know. REST, GraphQL, Git HTTP.",
    "hood.records.title": "Searchable durable records",
    "hood.records.desc": "Vector-embedded memories stored in a persistent, queryable backend.",
    "hood.recall.title": "Automatic memory recall",
    "hood.recall.desc": "Relevant context is retrieved and injected before every agent run.",
    // Compare
    "compare.heading": 'With vs without <span class="claw-accent">ClawMem</span>',
    "compare.without": "Without",
    "compare.with": "With ClawMem",
    "compare.row1.label": "Cross-session continuity",
    "compare.row1.without": "Starts from zero every time",
    "compare.row1.with": "Picks up where you left off",
    "compare.row2.label": "Memory transparency",
    "compare.row2.without": "Hidden or nonexistent",
    "compare.row2.with": "Every record browsable",
    "compare.row3.label": "Editability",
    "compare.row3.without": "No way to correct the model",
    "compare.row3.with": "Edit, merge, or delete any memory",
    "compare.row4.label": "Source tracing",
    "compare.row4.without": "No idea where info came from",
    "compare.row4.with": "Linked to session and turn",
    "compare.row5.label": "Repeated explanations",
    "compare.row5.without": "Re-explain every session",
    "compare.row5.with": "Explain once, remembered forever",
    // CTA
    "cta.title": 'Stop restarting from <span class="claw-accent">zero</span>.',
    "cta.desc": "Install in one step: paste this into your OpenClaw agent.",
    "cta.paste": "paste in OpenClaw",
    "cta.note": "ClawMem is installed through OpenClaw. The agent reads the setup skill and completes the configuration for you.",
    "cta.console": 'Already installed? <a href="https://console.clawmem.ai/" target="_blank" rel="noreferrer">Go to Console</a> to manage your memories.',
    // Footer
    "footer.install": "Install",
    "footer.features": "Features",
    "footer.docs": "Docs",
    "footer.tagline": "Structured memory for OpenClaw agents.",
    "footer.license": "Apache-2.0 License",
    // Copy feedback
    "copy.success": "Install command copied.",
    "copy.fail": "Copy failed. Please copy manually.",
    // Mobile compare prefixes
    "compare.without.prefix": "Without: ",
    "compare.with.prefix": "With ClawMem: ",
  },

  "zh-CN": {
    "nav.features": "\u529f\u80fd",
    "nav.install": "\u5b89\u88c5",
    "nav.console": "\u63a7\u5236\u53f0",
    "hero.sub": "\u771f\u6b63\u6301\u4e45\u7684\u8bb0\u5fc6\u3002",
    "hero.desc": "\u81ea\u52a8\u8bb0\u5f55\u5bf9\u8bdd\u5185\u5bb9\uff0c\u63d0\u53d6\u5173\u952e\u4fe1\u606f\uff0c\u6309\u8bed\u4e49\u68c0\u7d22\uff0c\u5e76\u5728\u6bcf\u6b21\u4f1a\u8bdd\u524d\u6ce8\u5165\u76f8\u5173\u4e0a\u4e0b\u6587\u3002\u5168\u7a0b\u53ef\u67e5\u3001\u53ef\u7f16\u8f91\u3001\u5b8c\u5168\u7531\u4f60\u638c\u63a7\u3002",
    "hero.hint": '<span class="hint-action" data-i18n="hero.hint.action">\u590d\u5236\u4ee5\u4e0b\u5185\u5bb9</span>\u7c98\u8d34\u5230 OpenClaw \u5bf9\u8bdd\u4e2d\u5373\u53ef\u5f00\u59cb',
    "hero.hint.action": "\u590d\u5236\u4ee5\u4e0b\u5185\u5bb9",
    "hero.paste": "\u7c98\u8d34\u5230 OpenClaw",
    "how.heading": '\u4ece\u539f\u59cb\u4f1a\u8bdd\u5230<span class="claw-accent">\u6301\u4e45\u4e0a\u4e0b\u6587</span>',
    // Shared step headings
    "how.step1.title": "\u6355\u83b7\u4f1a\u8bdd",
    "how.step1.desc": "\u6bcf\u6bb5\u5bf9\u8bdd\u90fd\u4f1a\u88ab\u81ea\u52a8\u8bb0\u5f55\uff0c\u4e0d\u9057\u6f0f\u4efb\u4f55\u7ec6\u8282\u3002",
    "how.step2.title": "\u5b58\u50a8\u5173\u952e\u4fe1\u606f",
    "how.step2.desc": "\u6838\u5fc3\u4e8b\u5b9e\u3001\u504f\u597d\u548c\u51b3\u7b56\u88ab\u63d0\u70bc\u4e3a\u7ed3\u6784\u5316\u7684\u6301\u4e45\u8bb0\u5fc6\u8bb0\u5f55\u3002",
    "how.step2.type": "\u7c7b\u578b",
    "how.step2.type.val": "\u8bb0\u5fc6",
    "how.step2.source": "\u6765\u6e90",
    "how.step2.status": "\u72b6\u6001",
    "how.step2.status.val": "\u6d3b\u8dc3",
    "how.step2.detail": "\u8be6\u60c5",
    "how.step3.title": "\u6309\u9700\u53ec\u56de",
    "how.step3.desc": "\u5728\u4e0b\u4e00\u6b21\u8fd0\u884c\u524d\uff0c\u76f8\u5173\u8bb0\u5fc6\u4f1a\u88ab\u81ea\u52a8\u68c0\u7d22\u5e76\u6ce8\u5165\u4e0a\u4e0b\u6587\u3002",
    // Scenario tabs
    "scenario.tab.daily": "\u65e5\u5e38\u751f\u6d3b",
    "scenario.tab.family": "\u5bb6\u5ead\u534f\u4f5c",
    "scenario.tab.work": "\u4e13\u4e1a\u5de5\u4f5c",
    "scenario.tab.team": "\u56e2\u961f\u534f\u4f5c",
    // Memory issue tags
    "mtag.open": "\u5df2\u6301\u4e45\u5316",
    "mtag.memory": "\u8bb0\u5fc6",
    "mtag.type.memory": "\u7c7b\u578b:\u8bb0\u5fc6",
    "mtag.status.active": "\u72b6\u6001:\u6d3b\u8dc3",
    "mtag.kind.preference": "\u5206\u7c7b:\u504f\u597d",
    "mtag.kind.event": "\u5206\u7c7b:\u4e8b\u4ef6",
    "mtag.kind.decision": "\u5206\u7c7b:\u51b3\u7b56",
    "mtag.kind.update": "\u5206\u7c7b:\u52a8\u6001",
    "mtag.topic.food": "\u8bdd\u9898:\u996e\u98df",
    "mtag.topic.personal": "\u8bdd\u9898:\u4e2a\u4eba",
    "mtag.topic.family": "\u8bdd\u9898:\u5bb6\u5ead",
    "mtag.topic.api": "\u8bdd\u9898:API",
    "mtag.topic.client": "\u8bdd\u9898:\u5ba2\u6237",
    "mtag.source.mom": "\u6765\u6e90:\u5988\u5988",
    "mtag.source.sarah": "\u6765\u6e90:Sarah",
    // Daily Life
    "daily.s1.session": "\u4f1a\u8bdd #12",
    "daily.s1.user": "\u4f60",
    "daily.s1.user.msg": "\u6211\u6709\u4e73\u7cd6\u4e0d\u8010\u53d7\uff0c\u63a8\u8350\u98df\u7269\u7684\u65f6\u5019\u8bf7\u6ce8\u610f\u3002",
    "daily.s1.agent": "\u667a\u80fd\u4f53",
    "daily.s1.agent.msg": "\u8bb0\u4f4f\u4e86\uff01\u4ee5\u540e\u90fd\u4f1a\u63a8\u8350\u65e0\u4e73\u7cd6\u7684\u9009\u62e9\u3002",
    "daily.s2.source.val": "\u4f1a\u8bdd #12\uff0c\u7b2c 1 \u8f6e",
    "daily.s2.session.tag": "\u4f1a\u8bdd:#12, \u8f6e\u6b21:1",
    "daily.s2.detail.val": "\u7528\u6237\u6709\u4e73\u7cd6\u4e0d\u8010\u53d7\u3002\u59cb\u7ec8\u63a8\u8350\u65e0\u4e73\u7cd6\u66ff\u4ee3\u54c1\u3002",
    "daily.s3.session": "\u4f1a\u8bdd #35",
    "daily.s3.user": "\u4f60",
    "daily.s3.user.msg": "\u5e2e\u6211\u627e\u4e00\u4e2a\u4eca\u665a\u80fd\u505a\u7684\u610f\u9762\u98df\u8c31\u3002",
    "daily.s3.agent": "\u667a\u80fd\u4f53",
    "daily.s3.agent.msg": "\u8fd9\u9053\u8170\u679c\u5976\u6cb9\u610f\u9762\u4e0d\u542b\u4e73\u5236\u54c1\uff0c\u5b8c\u5168\u9002\u5408\u4f60\u3002",
    "daily.s3.source": "\u6765\u6e90\uff1a\u4f1a\u8bdd #12\uff0c\u7b2c 1 \u8f6e",
    // Family Sync
    "family.s1.desc": "\u5bb6\u4eba\u544a\u8bc9\u4ed6\u4eec\u7684\u667a\u80fd\u4f53\u4e00\u4ef6\u91cd\u8981\u7684\u4e8b\u2014\u2014\u5b83\u4f1a\u88ab\u8bb0\u5f55\u5230\u5171\u4eab\u8bb0\u5fc6\u4e2d\u3002",
    "family.s1.session": "\u5988\u5988\u7684\u4f1a\u8bdd #8",
    "family.s1.user": "\u5988\u5988",
    "family.s1.user.msg": "\u5976\u5976\u751f\u65e5\u662f 3 \u6708 20 \u65e5\uff0c\u5979\u8bf4\u60f3\u8981\u4e00\u6761\u4e1d\u5dfe\u3002",
    "family.s1.agent": "\u667a\u80fd\u4f53",
    "family.s1.agent.msg": "\u8bb0\u4f4f\u4e86\u2014\u2014\u65e5\u671f\u548c\u793c\u7269\u60f3\u6cd5\u90fd\u5df2\u8bb0\u5f55\u3002",
    "family.s2.source.val": "\u5988\u5988\u7684\u4f1a\u8bdd #8\uff0c\u7b2c 1 \u8f6e",
    "family.s2.session.tag": "\u4f1a\u8bdd:#8, \u8f6e\u6b21:1",
    "family.s2.detail.val": "\u5976\u5976\u751f\u65e5 3 \u6708 20 \u65e5\u3002\u793c\u7269\u60f3\u6cd5\uff1a\u4e1d\u5dfe\u3002",
    "family.s3.desc": "\u4f60\u7684\u667a\u80fd\u4f53\u4f1a\u8bfb\u53d6\u5bb6\u4eba\u7684\u8bb0\u5fc6\uff0c\u8ba9\u4f60\u4e0d\u4f1a\u9519\u8fc7\u91cd\u8981\u7684\u4e8b\u3002",
    "family.s3.session": "\u4f60\u7684\u4f1a\u8bdd #20",
    "family.s3.user": "\u4f60",
    "family.s3.user.msg": "\u8fd9\u4e2a\u6708\u5bb6\u91cc\u6709\u4ec0\u4e48\u6d3b\u52a8\u5417\uff1f",
    "family.s3.agent": "\u667a\u80fd\u4f53",
    "family.s3.agent.msg": "\u5976\u5976\u751f\u65e5\u662f 3 \u6708 20 \u65e5\uff0c\u5988\u5988\u8bf4\u5979\u60f3\u8981\u4e00\u6761\u4e1d\u5dfe\u3002",
    "family.s3.source": "\u6765\u6e90\uff1a\u5988\u5988\u7684\u4f1a\u8bdd #8\uff0c\u7b2c 1 \u8f6e",
    // Pro Work
    "work.s1.session": "\u4f1a\u8bdd #42",
    "work.s1.user": "\u4f60",
    "work.s1.user.msg": "\u6211\u4eec\u7684 API \u9650\u6d41\u6539\u6210\u4e86\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "work.s1.agent": "\u667a\u80fd\u4f53",
    "work.s1.agent.msg": "\u660e\u767d\u4e86\uff0c\u540e\u7eed API \u76f8\u5173\u5de5\u4f5c\u6211\u4f1a\u8bb0\u4f4f\u8fd9\u4e00\u70b9\u3002",
    "work.s2.source.val": "\u4f1a\u8bdd #42\uff0c\u7b2c 3 \u8f6e",
    "work.s2.session.tag": "\u4f1a\u8bdd:#42, \u8f6e\u6b21:3",
    "work.s2.detail.val": "API \u9650\u6d41\u91c7\u7528\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "work.s3.session": "\u4f1a\u8bdd #58",
    "work.s3.user": "\u4f60",
    "work.s3.user.msg": "\u6211\u4eec\u73b0\u5728\u7528\u7684\u662f\u4ec0\u4e48\u9650\u6d41\u7b56\u7565\uff1f",
    "work.s3.agent": "\u667a\u80fd\u4f53",
    "work.s3.agent.msg": "\u4f60\u4eec\u5728 3 \u6708 9 \u65e5\u6539\u6210\u4e86\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "work.s3.source": "\u6765\u6e90\uff1a\u4f1a\u8bdd #42\uff0c\u7b2c 3 \u8f6e",
    // Team Sync
    "team.s1.desc": "\u56e2\u961f\u6210\u5458\u544a\u8bc9\u4ed6\u4eec\u7684\u667a\u80fd\u4f53\u4e00\u4e2a\u66f4\u65b0\u2014\u2014\u5b83\u4f1a\u88ab\u5b58\u50a8\u5728\u56e2\u961f\u5171\u4eab\u8bb0\u5fc6\u4e2d\u3002",
    "team.s1.session": "Sarah \u7684\u4f1a\u8bdd #15",
    "team.s1.user": "Sarah",
    "team.s1.user.msg": "\u5ba2\u6237\u4f1a\u8bae\u6539\u5230\u5468\u56db\u4e0b\u5348\u4e24\u70b9\uff0c\u4ed6\u4eec\u5e0c\u671b\u65b9\u6848\u91cd\u70b9\u653e\u5728\u53ef\u6301\u7eed\u53d1\u5c55\u4e0a\u3002",
    "team.s1.agent": "\u667a\u80fd\u4f53",
    "team.s1.agent.msg": "\u6536\u5230\u2014\u2014\u4f1a\u8bae\u65f6\u95f4\u5df2\u66f4\u65b0\uff0c\u65b9\u6848\u65b9\u5411\u5df2\u8bb0\u5f55\u3002",
    "team.s2.source.val": "Sarah \u7684\u4f1a\u8bdd #15\uff0c\u7b2c 2 \u8f6e",
    "team.s2.session.tag": "\u4f1a\u8bdd:#15, \u8f6e\u6b21:2",
    "team.s2.detail.val": "\u5ba2\u6237\u4f1a\u8bae\u5468\u56db\u4e0b\u5348 2 \u70b9\u3002\u65b9\u6848\u91cd\u70b9\uff1a\u53ef\u6301\u7eed\u53d1\u5c55\u3002",
    "team.s3.desc": "\u4f60\u7684\u667a\u80fd\u4f53\u4f1a\u5728\u4f60\u5f00\u59cb\u5de5\u4f5c\u524d\u4e3b\u52a8\u544a\u77e5\u961f\u53cb\u7684\u66f4\u65b0\u2014\u2014\u4e0d\u7528\u518d\u7ffb Slack \u804a\u5929\u8bb0\u5f55\u3002",
    "team.s3.session": "\u4f60\u7684\u4f1a\u8bdd #31",
    "team.s3.user": "\u4f60",
    "team.s3.user.msg": "\u6211\u8981\u51c6\u5907\u5ba2\u6237\u4f1a\u8bae\u7684\u6750\u6599\uff0c\u6709\u4ec0\u4e48\u66f4\u65b0\u5417\uff1f",
    "team.s3.agent": "\u667a\u80fd\u4f53",
    "team.s3.agent.msg": "Sarah \u8bf4\u4f1a\u8bae\u6539\u5230\u4e86\u5468\u56db\u4e0b\u5348\u4e24\u70b9\uff0c\u5ba2\u6237\u5e0c\u671b\u65b9\u6848\u805a\u7126\u53ef\u6301\u7eed\u53d1\u5c55\u3002",
    "team.s3.source": "\u6765\u6e90\uff1aSarah \u7684\u4f1a\u8bdd #15\uff0c\u7b2c 2 \u8f6e",
    "inspect.heading": '\u8bb0\u5fc6\u5e94\u8be5\u662f<span class="claw-accent">\u53ef\u68c0\u89c6\u7684</span>\uff0c\u800c\u975e\u795e\u79d8\u83ab\u6d4b',
    "inspect.desc": "\u6bcf\u6761\u8bb0\u5fc6\u90fd\u662f\u7ed3\u6784\u5316\u8bb0\u5f55\u2014\u2014\u53ef\u67e5\u770b\u3001\u53ef\u641c\u7d22\u3001\u53ef\u7f16\u8f91\u3001\u53ef\u6eaf\u6e90\u3002\u6ca1\u6709\u9690\u85cf\u7684\u5d4c\u5165\u5411\u91cf\uff0c\u6ca1\u6709\u9ed1\u7bb1\u3002",
    "inspect.visible": "\u53ef\u89c1",
    "inspect.visible.desc": "\u4ee5\u7ed3\u6784\u5316\u5217\u8868\u6d4f\u89c8\u6240\u6709\u8bb0\u5fc6\uff0c\u6ca1\u6709\u4efb\u4f55\u9690\u85cf\u3002",
    "inspect.searchable": "\u53ef\u641c\u7d22",
    "inspect.searchable.desc": "\u6309\u8bed\u4e49\u641c\u7d22\uff0c\u4e0d\u53ea\u662f\u5173\u952e\u8bcd\u5339\u914d\u3002",
    "inspect.editable": "\u53ef\u7f16\u8f91",
    "inspect.editable.desc": "\u5728\u8bb0\u5fc6\u5f71\u54cd\u4e0b\u4e00\u6b21\u56de\u7b54\u4e4b\u524d\uff0c\u53ef\u4ee5\u4fee\u6b63\u3001\u5408\u5e76\u6216\u5220\u9664\u4efb\u610f\u6761\u76ee\u3002",
    "inspect.traceable": "\u53ef\u6eaf\u6e90",
    "inspect.traceable.desc": "\u6bcf\u6761\u8bb0\u5fc6\u90fd\u53ef\u8ffd\u6eaf\u5230\u521b\u5efa\u5b83\u7684\u5177\u4f53\u4f1a\u8bdd\u548c\u8f6e\u6b21\u3002",
    "hood.heading": '\u5e95\u5c42<span class="claw-accent">\u67b6\u6784</span>',
    "hood.desc": "\u8bb0\u5fc6\u5b58\u50a8\u5728\u7ed3\u6784\u5316\u3001\u53ef\u68c0\u89c6\u7684\u540e\u7aef\u4e2d\uff0c\u8bbe\u8ba1\u7075\u611f\u6765\u81ea GitHub \u5de5\u4f5c\u6d41\u3002",
    "hood.node1": "OpenClaw \u4f1a\u8bdd",
    "hood.node2": "ClawMem \u63d2\u4ef6",
    "hood.node3": "\u8bb0\u5fc6\u540e\u7aef",
    "hood.node4": "\u4e0b\u6b21\u8fd0\u884c\u53ec\u56de",
    "hood.api.title": "\u517c\u5bb9 GitHub \u7684 API",
    "hood.api.desc": "\u4f7f\u7528\u4f60\u719f\u6089\u7684\u5de5\u5177\u64cd\u4f5c\u8bb0\u5fc6\u3002\u652f\u6301 REST\u3001GraphQL\u3001Git HTTP\u3002",
    "hood.records.title": "\u53ef\u641c\u7d22\u7684\u6301\u4e45\u8bb0\u5f55",
    "hood.records.desc": "\u7ecf\u8fc7\u5411\u91cf\u5d4c\u5165\u7684\u8bb0\u5fc6\uff0c\u5b58\u50a8\u5728\u6301\u4e45\u53ef\u67e5\u8be2\u7684\u540e\u7aef\u4e2d\u3002",
    "hood.recall.title": "\u81ea\u52a8\u8bb0\u5fc6\u53ec\u56de",
    "hood.recall.desc": "\u6bcf\u6b21\u667a\u80fd\u4f53\u8fd0\u884c\u524d\uff0c\u81ea\u52a8\u68c0\u7d22\u5e76\u6ce8\u5165\u76f8\u5173\u4e0a\u4e0b\u6587\u3002",
    "compare.heading": '\u6709\u6ca1\u6709 <span class="claw-accent">ClawMem</span>\uff0c\u5927\u4e0d\u76f8\u540c',
    "compare.without": "\u6ca1\u6709",
    "compare.with": "\u4f7f\u7528 ClawMem",
    "compare.row1.label": "\u8de8\u4f1a\u8bdd\u8fde\u7eed\u6027",
    "compare.row1.without": "\u6bcf\u6b21\u90fd\u4ece\u96f6\u5f00\u59cb",
    "compare.row1.with": "\u4ece\u4e0a\u6b21\u4e2d\u65ad\u7684\u5730\u65b9\u7ee7\u7eed",
    "compare.row2.label": "\u8bb0\u5fc6\u900f\u660e\u5ea6",
    "compare.row2.without": "\u9690\u85cf\u6216\u4e0d\u5b58\u5728",
    "compare.row2.with": "\u6bcf\u6761\u8bb0\u5f55\u90fd\u53ef\u6d4f\u89c8",
    "compare.row3.label": "\u53ef\u7f16\u8f91\u6027",
    "compare.row3.without": "\u65e0\u6cd5\u7ea0\u6b63\u6a21\u578b",
    "compare.row3.with": "\u53ef\u7f16\u8f91\u3001\u5408\u5e76\u6216\u5220\u9664\u4efb\u610f\u8bb0\u5fc6",
    "compare.row4.label": "\u6765\u6e90\u8ffd\u8e2a",
    "compare.row4.without": "\u5b8c\u5168\u4e0d\u77e5\u9053\u4fe1\u606f\u4ece\u4f55\u800c\u6765",
    "compare.row4.with": "\u5173\u8054\u5230\u5177\u4f53\u4f1a\u8bdd\u548c\u8f6e\u6b21",
    "compare.row5.label": "\u91cd\u590d\u89e3\u91ca",
    "compare.row5.without": "\u6bcf\u6b21\u4f1a\u8bdd\u90fd\u8981\u91cd\u65b0\u89e3\u91ca",
    "compare.row5.with": "\u89e3\u91ca\u4e00\u6b21\uff0c\u6c38\u4e45\u8bb0\u4f4f",
    "cta.title": '\u544a\u522b<span class="claw-accent">\u4ece\u96f6\u5f00\u59cb</span>\u3002',
    "cta.desc": "\u4e00\u6b65\u5b89\u88c5\uff1a\u5c06\u4ee5\u4e0b\u5185\u5bb9\u7c98\u8d34\u5230\u4f60\u7684 OpenClaw \u667a\u80fd\u4f53\u4e2d\u3002",
    "cta.paste": "\u7c98\u8d34\u5230 OpenClaw",
    "cta.note": "ClawMem \u901a\u8fc7 OpenClaw \u5b89\u88c5\u3002\u667a\u80fd\u4f53\u4f1a\u8bfb\u53d6\u5b89\u88c5\u6307\u5f15\u5e76\u81ea\u52a8\u5b8c\u6210\u914d\u7f6e\u3002",
    "cta.console": '\u5df2\u7ecf\u5b89\u88c5\u4e86\uff1f<a href="https://console.clawmem.ai/" target="_blank" rel="noreferrer">\u524d\u5f80\u63a7\u5236\u53f0</a>\u7ba1\u7406\u4f60\u7684\u8bb0\u5fc6\u3002',
    "footer.install": "\u5b89\u88c5",
    "footer.features": "\u529f\u80fd",
    "footer.docs": "\u6587\u6863",
    "footer.tagline": "\u4e3a OpenClaw \u667a\u80fd\u4f53\u6253\u9020\u7684\u7ed3\u6784\u5316\u8bb0\u5fc6\u7cfb\u7edf\u3002",
    "footer.license": "Apache-2.0 \u5f00\u6e90\u8bb8\u53ef",
    "copy.success": "\u5b89\u88c5\u547d\u4ee4\u5df2\u590d\u5236\u3002",
    "copy.fail": "\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u624b\u52a8\u590d\u5236\u3002",
    "compare.without.prefix": "\u6ca1\u6709\uff1a",
    "compare.with.prefix": "\u4f7f\u7528 ClawMem\uff1a",
  },

  ja: {
    "nav.features": "\u6a5f\u80fd",
    "nav.install": "\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb",
    "nav.console": "\u30b3\u30f3\u30bd\u30fc\u30eb",
    "hero.sub": "\u672c\u5f53\u306b\u6b8b\u308b\u8a18\u61b6\u3002",
    "hero.desc": "\u4f1a\u8a71\u3092\u81ea\u52d5\u3067\u8a18\u9332\u3057\u3001\u91cd\u8981\u306a\u60c5\u5831\u3092\u62bd\u51fa\u3001\u610f\u5473\u3067\u691c\u7d22\u3057\u3066\u3001\u6bce\u56de\u306e\u30bb\u30c3\u30b7\u30e7\u30f3\u524d\u306b\u9069\u5207\u306a\u30b3\u30f3\u30c6\u30ad\u30b9\u30c8\u3092\u6ce8\u5165\u3057\u307e\u3059\u3002\u3059\u3079\u3066\u95b2\u89a7\u30fb\u7de8\u96c6\u53ef\u80fd\u3067\u3001\u5b8c\u5168\u306b\u3042\u306a\u305f\u306e\u3082\u306e\u3067\u3059\u3002",
    "hero.hint": '<span class="hint-action" data-i18n="hero.hint.action">\u3053\u308c\u3092\u30b3\u30d4\u30fc</span>\u3057\u3066 OpenClaw \u306e\u30c1\u30e3\u30c3\u30c8\u306b\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044',
    "hero.hint.action": "\u3053\u308c\u3092\u30b3\u30d4\u30fc",
    "hero.paste": "OpenClaw \u306b\u8cbc\u308a\u4ed8\u3051",
    "how.heading": '\u751f\u306e\u30bb\u30c3\u30b7\u30e7\u30f3\u304b\u3089<span class="claw-accent">\u6c38\u7d9a\u7684\u30b3\u30f3\u30c6\u30ad\u30b9\u30c8</span>\u3078',
    // Shared step headings
    "how.step1.title": "\u30bb\u30c3\u30b7\u30e7\u30f3\u3092\u8a18\u9332",
    "how.step1.desc": "\u3059\u3079\u3066\u306e\u4f1a\u8a71\u304c\u81ea\u52d5\u3067\u8a18\u9332\u3055\u308c\u307e\u3059\u3002\u53d6\u308a\u3053\u307c\u3057\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    "how.step2.title": "\u5927\u5207\u306a\u3053\u3068\u3092\u4fdd\u5b58",
    "how.step2.desc": "\u91cd\u8981\u306a\u4e8b\u5b9f\u3001\u597d\u307f\u3001\u610f\u601d\u6c7a\u5b9a\u304c\u69cb\u9020\u5316\u3055\u308c\u305f\u6c38\u7d9a\u7684\u306a\u8a18\u61b6\u30ec\u30b3\u30fc\u30c9\u306b\u96c6\u7d04\u3055\u308c\u307e\u3059\u3002",
    "how.step2.type": "\u30bf\u30a4\u30d7",
    "how.step2.type.val": "\u8a18\u61b6",
    "how.step2.source": "\u30bd\u30fc\u30b9",
    "how.step2.status": "\u30b9\u30c6\u30fc\u30bf\u30b9",
    "how.step2.status.val": "\u30a2\u30af\u30c6\u30a3\u30d6",
    "how.step2.detail": "\u8a73\u7d30",
    "how.step3.title": "\u5fc5\u8981\u306a\u6642\u306b\u547c\u3073\u51fa\u3059",
    "how.step3.desc": "\u6b21\u306e\u5b9f\u884c\u524d\u306b\u3001\u95a2\u9023\u3059\u308b\u8a18\u61b6\u304c\u81ea\u52d5\u3067\u691c\u7d22\u3055\u308c\u3001\u30b3\u30f3\u30c6\u30ad\u30b9\u30c8\u306b\u6ce8\u5165\u3055\u308c\u307e\u3059\u3002",
    // Scenario tabs
    "scenario.tab.daily": "\u65e5\u5e38\u751f\u6d3b",
    "scenario.tab.family": "\u5bb6\u65cf\u9023\u643a",
    "scenario.tab.work": "\u4ed5\u4e8b",
    "scenario.tab.team": "\u30c1\u30fc\u30e0\u9023\u643a",
    // Memory issue tags
    "mtag.open": "\u6c38\u7d9a\u5316\u6e08\u307f",
    "mtag.memory": "\u8a18\u61b6",
    "mtag.type.memory": "\u30bf\u30a4\u30d7:\u8a18\u61b6",
    "mtag.status.active": "\u30b9\u30c6\u30fc\u30bf\u30b9:\u30a2\u30af\u30c6\u30a3\u30d6",
    "mtag.kind.preference": "\u7a2e\u985e:\u597d\u307f",
    "mtag.kind.event": "\u7a2e\u985e:\u30a4\u30d9\u30f3\u30c8",
    "mtag.kind.decision": "\u7a2e\u985e:\u6c7a\u5b9a",
    "mtag.kind.update": "\u7a2e\u985e:\u66f4\u65b0",
    "mtag.topic.food": "\u30c8\u30d4\u30c3\u30af:\u98df\u4e8b",
    "mtag.topic.personal": "\u30c8\u30d4\u30c3\u30af:\u500b\u4eba",
    "mtag.topic.family": "\u30c8\u30d4\u30c3\u30af:\u5bb6\u65cf",
    "mtag.topic.api": "\u30c8\u30d4\u30c3\u30af:API",
    "mtag.topic.client": "\u30c8\u30d4\u30c3\u30af:\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",
    "mtag.source.mom": "\u30bd\u30fc\u30b9:\u304a\u6bcd\u3055\u3093",
    "mtag.source.sarah": "\u30bd\u30fc\u30b9:Sarah",
    // Daily Life
    "daily.s1.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #12",
    "daily.s1.user": "\u3042\u306a\u305f",
    "daily.s1.user.msg": "\u4e73\u7cd6\u4e0d\u8010\u75c7\u306a\u306e\u3067\u3001\u98df\u3079\u7269\u306e\u63d0\u6848\u306e\u969b\u306f\u6ce8\u610f\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    "daily.s1.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "daily.s1.agent.msg": "\u627f\u77e5\u3057\u307e\u3057\u305f\uff01\u4eca\u5f8c\u306f\u4e73\u88fd\u54c1\u4e0d\u4f7f\u7528\u306e\u9078\u629e\u80a2\u3092\u63d0\u6848\u3057\u307e\u3059\u3002",
    "daily.s2.source.val": "\u30bb\u30c3\u30b7\u30e7\u30f3 #12\u3001\u30bf\u30fc\u30f3 1",
    "daily.s2.session.tag": "\u30bb\u30c3\u30b7\u30e7\u30f3:#12, \u30bf\u30fc\u30f3:1",
    "daily.s2.detail.val": "\u30e6\u30fc\u30b6\u30fc\u306f\u4e73\u7cd6\u4e0d\u8010\u75c7\u3002\u5e38\u306b\u4e73\u88fd\u54c1\u4e0d\u4f7f\u7528\u306e\u4ee3\u66ff\u54c1\u3092\u63d0\u6848\u3059\u308b\u3053\u3068\u3002",
    "daily.s3.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #35",
    "daily.s3.user": "\u3042\u306a\u305f",
    "daily.s3.user.msg": "\u4eca\u591c\u4f5c\u308c\u308b\u30d1\u30b9\u30bf\u306e\u30ec\u30b7\u30d4\u3092\u63a2\u3057\u3066\u3002",
    "daily.s3.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "daily.s3.agent.msg": "\u30ab\u30b7\u30e5\u30fc\u30ca\u30c3\u30c4\u306e\u30af\u30ea\u30fc\u30e0\u30a2\u30eb\u30d5\u30ec\u30c3\u30c9\u306f\u3044\u304b\u304c\u3067\u3059\u304b\uff1f\u4e73\u88fd\u54c1\u4e0d\u4f7f\u7528\u3067\u3059\u3002",
    "daily.s3.source": "\u30bd\u30fc\u30b9\uff1a\u30bb\u30c3\u30b7\u30e7\u30f3 #12\u3001\u30bf\u30fc\u30f3 1",
    // Family Sync
    "family.s1.desc": "\u5bb6\u65cf\u304c\u81ea\u5206\u306e\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u306b\u5927\u5207\u306a\u3053\u3068\u3092\u4f1d\u3048\u308b\u3068\u3001\u5171\u6709\u8a18\u61b6\u306b\u8a18\u9332\u3055\u308c\u307e\u3059\u3002",
    "family.s1.session": "\u304a\u6bcd\u3055\u3093\u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #8",
    "family.s1.user": "\u304a\u6bcd\u3055\u3093",
    "family.s1.user.msg": "\u304a\u3070\u3042\u3061\u3083\u3093\u306e\u8a95\u751f\u65e5\u306f 3 \u6708 20 \u65e5\u3002\u30b7\u30eb\u30af\u306e\u30b9\u30ab\u30fc\u30d5\u304c\u6b32\u3057\u3044\u3063\u3066\u8a00\u3063\u3066\u305f\u308f\u3002",
    "family.s1.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "family.s1.agent.msg": "\u627f\u77e5\u3057\u307e\u3057\u305f\u2014\u2014\u65e5\u4ed8\u3068\u30d7\u30ec\u30bc\u30f3\u30c8\u306e\u30a2\u30a4\u30c7\u30a2\u3092\u8a18\u9332\u3057\u307e\u3059\u3002",
    "family.s2.source.val": "\u304a\u6bcd\u3055\u3093\u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #8\u3001\u30bf\u30fc\u30f3 1",
    "family.s2.session.tag": "\u30bb\u30c3\u30b7\u30e7\u30f3:#8, \u30bf\u30fc\u30f3:1",
    "family.s2.detail.val": "\u304a\u3070\u3042\u3061\u3083\u3093\u306e\u8a95\u751f\u65e5 3\u670820\u65e5\u3002\u30d7\u30ec\u30bc\u30f3\u30c8\u5019\u88dc\uff1a\u30b7\u30eb\u30af\u306e\u30b9\u30ab\u30fc\u30d5\u3002",
    "family.s3.desc": "\u3042\u306a\u305f\u306e\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u304c\u5bb6\u65cf\u306e\u8a18\u61b6\u3092\u53d6\u5f97\u3057\u3001\u5927\u5207\u306a\u3053\u3068\u3092\u898b\u843d\u3068\u3057\u307e\u305b\u3093\u3002",
    "family.s3.session": "\u3042\u306a\u305f\u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #20",
    "family.s3.user": "\u3042\u306a\u305f",
    "family.s3.user.msg": "\u4eca\u6708\u3001\u5bb6\u65cf\u306e\u4e88\u5b9a\u306f\u4f55\u304b\u3042\u308b\uff1f",
    "family.s3.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "family.s3.agent.msg": "\u304a\u3070\u3042\u3061\u3083\u3093\u306e\u8a95\u751f\u65e5\u304c 3 \u6708 20 \u65e5\u3067\u3059\u3002\u304a\u6bcd\u3055\u3093\u306b\u3088\u308b\u3068\u30b7\u30eb\u30af\u306e\u30b9\u30ab\u30fc\u30d5\u304c\u6b32\u3057\u3044\u305d\u3046\u3067\u3059\u3002",
    "family.s3.source": "\u30bd\u30fc\u30b9\uff1a\u304a\u6bcd\u3055\u3093\u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #8\u3001\u30bf\u30fc\u30f3 1",
    // Pro Work
    "work.s1.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #42",
    "work.s1.user": "\u3042\u306a\u305f",
    "work.s1.user.msg": "API \u306e\u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u3092\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u306b\u5909\u66f4\u3057\u307e\u3057\u305f\u3002",
    "work.s1.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "work.s1.agent.msg": "\u4e86\u89e3\u3057\u307e\u3057\u305f\u3002\u4eca\u5f8c\u306e API \u95a2\u9023\u4f5c\u696d\u3067\u899a\u3048\u3066\u304a\u304d\u307e\u3059\u3002",
    "work.s2.source.val": "\u30bb\u30c3\u30b7\u30e7\u30f3 #42\u3001\u30bf\u30fc\u30f3 3",
    "work.s2.session.tag": "\u30bb\u30c3\u30b7\u30e7\u30f3:#42, \u30bf\u30fc\u30f3:3",
    "work.s2.detail.val": "API \u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u306f\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u3092\u63a1\u7528\u3002",
    "work.s3.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #58",
    "work.s3.user": "\u3042\u306a\u305f",
    "work.s3.user.msg": "\u4eca\u4f7f\u3063\u3066\u3044\u308b\u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u306e\u65b9\u5f0f\u306f\uff1f",
    "work.s3.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "work.s3.agent.msg": "3\u67089\u65e5\u306b\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u306b\u5207\u308a\u66ff\u3048\u307e\u3057\u305f\u3002",
    "work.s3.source": "\u30bd\u30fc\u30b9\uff1a\u30bb\u30c3\u30b7\u30e7\u30f3 #42\u3001\u30bf\u30fc\u30f3 3",
    // Team Sync
    "team.s1.desc": "\u30c1\u30fc\u30e0\u30e1\u30f3\u30d0\u30fc\u304c\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u306b\u66f4\u65b0\u3092\u4f1d\u3048\u308b\u3068\u3001\u30c1\u30fc\u30e0\u5171\u6709\u8a18\u61b6\u306b\u4fdd\u5b58\u3055\u308c\u307e\u3059\u3002",
    "team.s1.session": "Sarah \u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #15",
    "team.s1.user": "Sarah",
    "team.s1.user.msg": "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u3068\u306e\u4f1a\u8b70\u304c\u6728\u66dc\u5348\u5f8c 2 \u6642\u306b\u5909\u66f4\u3002\u63d0\u6848\u306f\u30b5\u30b9\u30c6\u30ca\u30d3\u30ea\u30c6\u30a3\u306b\u7126\u70b9\u3092\u5f53\u3066\u3066\u307b\u3057\u3044\u305d\u3046\u3067\u3059\u3002",
    "team.s1.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "team.s1.agent.msg": "\u627f\u77e5\u2014\u2014\u4f1a\u8b70\u65e5\u6642\u3092\u66f4\u65b0\u3001\u63d0\u6848\u306e\u65b9\u5411\u6027\u3082\u8a18\u9332\u3057\u307e\u3057\u305f\u3002",
    "team.s2.source.val": "Sarah \u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #15\u3001\u30bf\u30fc\u30f3 2",
    "team.s2.session.tag": "\u30bb\u30c3\u30b7\u30e7\u30f3:#15, \u30bf\u30fc\u30f3:2",
    "team.s2.detail.val": "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u4f1a\u8b70\u306f\u6728\u66dc\u5348\u5f8c2\u6642\u3002\u63d0\u6848\u306e\u91cd\u70b9\uff1a\u30b5\u30b9\u30c6\u30ca\u30d3\u30ea\u30c6\u30a3\u3002",
    "team.s3.desc": "\u4f5c\u696d\u958b\u59cb\u524d\u306b\u30c1\u30fc\u30e0\u30e1\u30f3\u30d0\u30fc\u306e\u66f4\u65b0\u3092\u81ea\u52d5\u3067\u8868\u793a\u2014\u2014Slack \u3092\u63a2\u3057\u56de\u308b\u5fc5\u8981\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    "team.s3.session": "\u3042\u306a\u305f\u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #31",
    "team.s3.user": "\u3042\u306a\u305f",
    "team.s3.user.msg": "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u4f1a\u8b70\u306e\u6e96\u5099\u3092\u3057\u305f\u3044\u306e\u3067\u3059\u304c\u3001\u4f55\u304b\u66f4\u65b0\u306f\u3042\u308a\u307e\u3059\u304b\uff1f",
    "team.s3.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "team.s3.agent.msg": "Sarah \u306b\u3088\u308b\u3068\u3001\u4f1a\u8b70\u306f\u6728\u66dc\u5348\u5f8c 2 \u6642\u306b\u5909\u66f4\u3002\u63d0\u6848\u306f\u30b5\u30b9\u30c6\u30ca\u30d3\u30ea\u30c6\u30a3\u306b\u7126\u70b9\u3092\u5f53\u3066\u3066\u307b\u3057\u3044\u305d\u3046\u3067\u3059\u3002",
    "team.s3.source": "\u30bd\u30fc\u30b9\uff1aSarah \u306e\u30bb\u30c3\u30b7\u30e7\u30f3 #15\u3001\u30bf\u30fc\u30f3 2",
    "inspect.heading": '\u8a18\u61b6\u306f<span class="claw-accent">\u691c\u67fb\u53ef\u80fd</span>\u3067\u3042\u308b\u3079\u304d\u3002\u795e\u79d8\u7684\u3067\u3042\u3063\u3066\u306f\u306a\u3089\u306a\u3044',
    "inspect.desc": "\u3059\u3079\u3066\u306e\u8a18\u61b6\u306f\u69cb\u9020\u5316\u3055\u308c\u305f\u30ec\u30b3\u30fc\u30c9\u3067\u3059\u3002\u95b2\u89a7\u3001\u691c\u7d22\u3001\u7de8\u96c6\u3001\u30bd\u30fc\u30b9\u3078\u306e\u9061\u308a\u304c\u53ef\u80fd\u3002\u96a0\u3055\u308c\u305f\u57cb\u3081\u8fbc\u307f\u3082\u30d6\u30e9\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3082\u3042\u308a\u307e\u305b\u3093\u3002",
    "inspect.visible": "\u53ef\u8996",
    "inspect.visible.desc": "\u69cb\u9020\u5316\u30ea\u30b9\u30c8\u3067\u3059\u3079\u3066\u306e\u8a18\u61b6\u3092\u95b2\u89a7\u3002\u96a0\u3055\u308c\u305f\u3082\u306e\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    "inspect.searchable": "\u691c\u7d22\u53ef\u80fd",
    "inspect.searchable.desc": "\u30ad\u30fc\u30ef\u30fc\u30c9\u3060\u3051\u3067\u306a\u304f\u3001\u610f\u5473\u3067\u691c\u7d22\u3002",
    "inspect.editable": "\u7de8\u96c6\u53ef\u80fd",
    "inspect.editable.desc": "\u6b21\u306e\u56de\u7b54\u306b\u5f71\u97ff\u3059\u308b\u524d\u306b\u3001\u8a18\u61b6\u3092\u4fee\u6b63\u30fb\u7d71\u5408\u30fb\u524a\u9664\u3067\u304d\u307e\u3059\u3002",
    "inspect.traceable": "\u8ffd\u8de1\u53ef\u80fd",
    "inspect.traceable.desc": "\u3059\u3079\u3066\u306e\u8a18\u61b6\u306f\u3001\u305d\u308c\u3092\u751f\u6210\u3057\u305f\u6b63\u78ba\u306a\u30bb\u30c3\u30b7\u30e7\u30f3\u3068\u30bf\u30fc\u30f3\u306b\u30ea\u30f3\u30af\u3057\u3066\u3044\u307e\u3059\u3002",
    "hood.heading": '<span class="claw-accent">\u4ed5\u7d44\u307f</span>\u306e\u5185\u5074',
    "hood.desc": "\u8a18\u61b6\u306f GitHub \u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u306b\u30a4\u30f3\u30b9\u30d1\u30a4\u30a2\u3055\u308c\u305f\u3001\u69cb\u9020\u5316\u3055\u308c\u691c\u67fb\u53ef\u80fd\u306a\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u306b\u4fdd\u5b58\u3055\u308c\u307e\u3059\u3002",
    "hood.node1": "OpenClaw \u30bb\u30c3\u30b7\u30e7\u30f3",
    "hood.node2": "ClawMem \u30d7\u30e9\u30b0\u30a4\u30f3",
    "hood.node3": "\u8a18\u61b6\u30d0\u30c3\u30af\u30a8\u30f3\u30c9",
    "hood.node4": "\u6b21\u56de\u5b9f\u884c\u6642\u306e\u547c\u3073\u51fa\u3057",
    "hood.api.title": "GitHub \u4e92\u63db API",
    "hood.api.desc": "\u4f7f\u3044\u6163\u308c\u305f\u30c4\u30fc\u30eb\u3067\u8a18\u61b6\u3092\u64cd\u4f5c\u3002REST\u3001GraphQL\u3001Git HTTP \u5bfe\u5fdc\u3002",
    "hood.records.title": "\u691c\u7d22\u53ef\u80fd\u306a\u6c38\u7d9a\u30ec\u30b3\u30fc\u30c9",
    "hood.records.desc": "\u30d9\u30af\u30c8\u30eb\u57cb\u3081\u8fbc\u307f\u3055\u308c\u305f\u8a18\u61b6\u3092\u3001\u6c38\u7d9a\u7684\u3067\u691c\u7d22\u53ef\u80fd\u306a\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u306b\u4fdd\u5b58\u3002",
    "hood.recall.title": "\u81ea\u52d5\u8a18\u61b6\u547c\u3073\u51fa\u3057",
    "hood.recall.desc": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u5b9f\u884c\u524d\u306b\u3001\u95a2\u9023\u3059\u308b\u30b3\u30f3\u30c6\u30ad\u30b9\u30c8\u304c\u81ea\u52d5\u3067\u53d6\u5f97\u30fb\u6ce8\u5165\u3055\u308c\u307e\u3059\u3002",
    "compare.heading": '<span class="claw-accent">ClawMem</span> \u306e\u6709\u7121\u3067\u6bd4\u8f03',
    "compare.without": "\u306a\u3057",
    "compare.with": "ClawMem \u3042\u308a",
    "compare.row1.label": "\u30af\u30ed\u30b9\u30bb\u30c3\u30b7\u30e7\u30f3\u306e\u7d99\u7d9a\u6027",
    "compare.row1.without": "\u6bce\u56de\u30bc\u30ed\u304b\u3089\u30b9\u30bf\u30fc\u30c8",
    "compare.row1.with": "\u524d\u56de\u306e\u7d9a\u304d\u304b\u3089\u518d\u958b",
    "compare.row2.label": "\u8a18\u61b6\u306e\u900f\u660e\u6027",
    "compare.row2.without": "\u975e\u516c\u958b\u307e\u305f\u306f\u5b58\u5728\u3057\u306a\u3044",
    "compare.row2.with": "\u3059\u3079\u3066\u306e\u30ec\u30b3\u30fc\u30c9\u304c\u95b2\u89a7\u53ef\u80fd",
    "compare.row3.label": "\u7de8\u96c6\u6027",
    "compare.row3.without": "\u30e2\u30c7\u30eb\u3092\u4fee\u6b63\u3059\u308b\u624b\u6bb5\u304c\u306a\u3044",
    "compare.row3.with": "\u4efb\u610f\u306e\u8a18\u61b6\u3092\u7de8\u96c6\u30fb\u7d71\u5408\u30fb\u524a\u9664",
    "compare.row4.label": "\u30bd\u30fc\u30b9\u8ffd\u8de1",
    "compare.row4.without": "\u60c5\u5831\u306e\u51fa\u5178\u304c\u4e0d\u660e",
    "compare.row4.with": "\u30bb\u30c3\u30b7\u30e7\u30f3\u3068\u30bf\u30fc\u30f3\u306b\u7d10\u3065\u3051",
    "compare.row5.label": "\u7e70\u308a\u8fd4\u3057\u306e\u8aac\u660e",
    "compare.row5.without": "\u6bce\u30bb\u30c3\u30b7\u30e7\u30f3\u3067\u518d\u8aac\u660e",
    "compare.row5.with": "\u4e00\u5ea6\u8aac\u660e\u3059\u308c\u3070\u3001\u305a\u3063\u3068\u8a18\u61b6",
    "cta.title": '<span class="claw-accent">\u30bc\u30ed\u304b\u3089\u306e\u3084\u308a\u76f4\u3057</span>\u306f\u3082\u3046\u7d42\u308f\u308a\u3002',
    "cta.desc": "\u30ef\u30f3\u30b9\u30c6\u30c3\u30d7\u3067\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\uff1a\u4ee5\u4e0b\u3092 OpenClaw \u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u306b\u8cbc\u308a\u4ed8\u3051\u3066\u304f\u3060\u3055\u3044\u3002",
    "cta.paste": "OpenClaw \u306b\u8cbc\u308a\u4ed8\u3051",
    "cta.note": "ClawMem \u306f OpenClaw \u3092\u901a\u3058\u3066\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u307e\u3059\u3002\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u304c\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u30b9\u30ad\u30eb\u3092\u8aad\u307f\u8fbc\u307f\u3001\u8a2d\u5b9a\u3092\u81ea\u52d5\u3067\u5b8c\u4e86\u3057\u307e\u3059\u3002",
    "cta.console": '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u6e08\u307f\u3067\u3059\u304b\uff1f<a href="https://console.clawmem.ai/" target="_blank" rel="noreferrer">\u30b3\u30f3\u30bd\u30fc\u30eb\u3078</a>\u2014\u8a18\u61b6\u3092\u7ba1\u7406\u3057\u307e\u3057\u3087\u3046\u3002',
    "footer.install": "\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb",
    "footer.features": "\u6a5f\u80fd",
    "footer.docs": "\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8",
    "footer.tagline": "OpenClaw \u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u306e\u305f\u3081\u306e\u69cb\u9020\u5316\u8a18\u61b6\u30b7\u30b9\u30c6\u30e0\u3002",
    "footer.license": "Apache-2.0 \u30e9\u30a4\u30bb\u30f3\u30b9",
    "copy.success": "\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u30b3\u30de\u30f3\u30c9\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\u3002",
    "copy.fail": "\u30b3\u30d4\u30fc\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u624b\u52d5\u3067\u30b3\u30d4\u30fc\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    "compare.without.prefix": "\u306a\u3057\uff1a",
    "compare.with.prefix": "ClawMem \u3042\u308a\uff1a",
  },
};

const langMeta = {
  en: { label: "EN", htmlLang: "en" },
  "zh-CN": { label: "\u4e2d\u6587", htmlLang: "zh-CN" },
  ja: { label: "\u65e5\u672c\u8a9e", htmlLang: "ja" },
};

const LANG_KEY = "cm-lang";

function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && translations[saved]) return saved;
  const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (nav.startsWith("zh")) return "zh-CN";
  if (nav.startsWith("ja")) return "ja";
  return "en";
}

let currentLang = detectLang();

function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
}

function applyTranslations() {
  // Set html lang
  document.documentElement.lang = langMeta[currentLang]?.htmlLang || "en";
  document.documentElement.dataset.lang = currentLang;

  // Apply data-i18n (textContent)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // Apply data-i18n-html (innerHTML for elements with mixed content)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Update language switcher current label
  const currentLabel = document.querySelector(".lang-current");
  if (currentLabel) {
    currentLabel.textContent = langMeta[currentLang]?.label || "EN";
  }

  // Mark active language option
  document.querySelectorAll("[data-lang-option]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langOption === currentLang);
  });
}

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* noop */
  }
  applyTranslations();
}

// Export for use by main.js copy feedback
window.__i18n = { t, currentLang: () => currentLang };

// Initialize language switcher
function initLangSwitch() {
  const container = document.getElementById("lang-switch");
  if (!container) return;

  const btn = container.querySelector(".lang-btn");
  const menu = container.querySelector(".lang-menu");

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = container.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open);
  });

  menu?.addEventListener("click", (e) => {
    const option = e.target.closest("[data-lang-option]");
    if (!option) return;
    setLang(option.dataset.langOption);
    container.classList.remove("is-open");
    btn?.setAttribute("aria-expanded", "false");
  });

  // Close on click outside
  document.addEventListener("click", () => {
    container.classList.remove("is-open");
    btn?.setAttribute("aria-expanded", "false");
  });
}

// Boot
applyTranslations();
initLangSwitch();
