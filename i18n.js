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
    "how.step1.title": "Capture the session",
    "how.step1.desc": "Every conversation is recorded automatically. Nothing falls through the cracks.",
    "how.step1.session": "session #42",
    "how.step1.user": "You",
    "how.step1.user.msg": "Our API rate limit moved to a sliding window policy.",
    "how.step1.agent": "Agent",
    "how.step1.agent.msg": "Got it. I\u2019ll remember that for future API work.",
    "how.step2.title": "Store what matters",
    "how.step2.desc": "Key facts, preferences, and decisions are distilled into structured, durable memory records.",
    "how.step2.type": "type",
    "how.step2.type.val": "memory",
    "how.step2.source": "source",
    "how.step2.source.val": "Session #42, Turn 3",
    "how.step2.status": "status",
    "how.step2.status.val": "active",
    "how.step2.detail": "detail",
    "how.step2.detail.val": "API rate limiting uses sliding window policy.",
    "how.step3.title": "Recall it when needed",
    "how.step3.desc": "Before the next run, relevant memories are found and injected into context automatically.",
    "how.step3.session": "session #58",
    "how.step3.user": "You",
    "how.step3.user.msg": "What rate limit policy are we using?",
    "how.step3.agent": "Agent",
    "how.step3.agent.msg": "You switched to a sliding window policy on Mar 9.",
    "how.step3.source": "Source: Session #42, Turn 3",
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
    "how.step1.title": "\u6355\u83b7\u4f1a\u8bdd",
    "how.step1.desc": "\u6bcf\u6bb5\u5bf9\u8bdd\u90fd\u4f1a\u88ab\u81ea\u52a8\u8bb0\u5f55\uff0c\u4e0d\u9057\u6f0f\u4efb\u4f55\u7ec6\u8282\u3002",
    "how.step1.session": "\u4f1a\u8bdd #42",
    "how.step1.user": "\u4f60",
    "how.step1.user.msg": "\u6211\u4eec\u7684 API \u9650\u6d41\u6539\u6210\u4e86\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "how.step1.agent": "\u667a\u80fd\u4f53",
    "how.step1.agent.msg": "\u660e\u767d\u4e86\uff0c\u540e\u7eed API \u76f8\u5173\u5de5\u4f5c\u6211\u4f1a\u8bb0\u4f4f\u8fd9\u4e00\u70b9\u3002",
    "how.step2.title": "\u5b58\u50a8\u5173\u952e\u4fe1\u606f",
    "how.step2.desc": "\u6838\u5fc3\u4e8b\u5b9e\u3001\u504f\u597d\u548c\u51b3\u7b56\u88ab\u63d0\u70bc\u4e3a\u7ed3\u6784\u5316\u7684\u6301\u4e45\u8bb0\u5fc6\u8bb0\u5f55\u3002",
    "how.step2.type": "\u7c7b\u578b",
    "how.step2.type.val": "\u8bb0\u5fc6",
    "how.step2.source": "\u6765\u6e90",
    "how.step2.source.val": "\u4f1a\u8bdd #42\uff0c\u7b2c 3 \u8f6e",
    "how.step2.status": "\u72b6\u6001",
    "how.step2.status.val": "\u6d3b\u8dc3",
    "how.step2.detail": "\u8be6\u60c5",
    "how.step2.detail.val": "API \u9650\u6d41\u91c7\u7528\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "how.step3.title": "\u6309\u9700\u53ec\u56de",
    "how.step3.desc": "\u5728\u4e0b\u4e00\u6b21\u8fd0\u884c\u524d\uff0c\u76f8\u5173\u8bb0\u5fc6\u4f1a\u88ab\u81ea\u52a8\u68c0\u7d22\u5e76\u6ce8\u5165\u4e0a\u4e0b\u6587\u3002",
    "how.step3.session": "\u4f1a\u8bdd #58",
    "how.step3.user": "\u4f60",
    "how.step3.user.msg": "\u6211\u4eec\u73b0\u5728\u7528\u7684\u662f\u4ec0\u4e48\u9650\u6d41\u7b56\u7565\uff1f",
    "how.step3.agent": "\u667a\u80fd\u4f53",
    "how.step3.agent.msg": "\u4f60\u4eec\u5728 3 \u6708 9 \u65e5\u6539\u6210\u4e86\u6ed1\u52a8\u7a97\u53e3\u7b56\u7565\u3002",
    "how.step3.source": "\u6765\u6e90\uff1a\u4f1a\u8bdd #42\uff0c\u7b2c 3 \u8f6e",
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
    "how.step1.title": "\u30bb\u30c3\u30b7\u30e7\u30f3\u3092\u8a18\u9332",
    "how.step1.desc": "\u3059\u3079\u3066\u306e\u4f1a\u8a71\u304c\u81ea\u52d5\u3067\u8a18\u9332\u3055\u308c\u307e\u3059\u3002\u53d6\u308a\u3053\u307c\u3057\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    "how.step1.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #42",
    "how.step1.user": "\u3042\u306a\u305f",
    "how.step1.user.msg": "API \u306e\u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u3092\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u306b\u5909\u66f4\u3057\u307e\u3057\u305f\u3002",
    "how.step1.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "how.step1.agent.msg": "\u4e86\u89e3\u3057\u307e\u3057\u305f\u3002\u4eca\u5f8c\u306e API \u95a2\u9023\u4f5c\u696d\u3067\u899a\u3048\u3066\u304a\u304d\u307e\u3059\u3002",
    "how.step2.title": "\u5927\u5207\u306a\u3053\u3068\u3092\u4fdd\u5b58",
    "how.step2.desc": "\u91cd\u8981\u306a\u4e8b\u5b9f\u3001\u597d\u307f\u3001\u610f\u601d\u6c7a\u5b9a\u304c\u69cb\u9020\u5316\u3055\u308c\u305f\u6c38\u7d9a\u7684\u306a\u8a18\u61b6\u30ec\u30b3\u30fc\u30c9\u306b\u96c6\u7d04\u3055\u308c\u307e\u3059\u3002",
    "how.step2.type": "\u30bf\u30a4\u30d7",
    "how.step2.type.val": "\u8a18\u61b6",
    "how.step2.source": "\u30bd\u30fc\u30b9",
    "how.step2.source.val": "\u30bb\u30c3\u30b7\u30e7\u30f3 #42\u3001\u30bf\u30fc\u30f3 3",
    "how.step2.status": "\u30b9\u30c6\u30fc\u30bf\u30b9",
    "how.step2.status.val": "\u30a2\u30af\u30c6\u30a3\u30d6",
    "how.step2.detail": "\u8a73\u7d30",
    "how.step2.detail.val": "API \u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u306f\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u3092\u63a1\u7528\u3002",
    "how.step3.title": "\u5fc5\u8981\u306a\u6642\u306b\u547c\u3073\u51fa\u3059",
    "how.step3.desc": "\u6b21\u306e\u5b9f\u884c\u524d\u306b\u3001\u95a2\u9023\u3059\u308b\u8a18\u61b6\u304c\u81ea\u52d5\u3067\u691c\u7d22\u3055\u308c\u3001\u30b3\u30f3\u30c6\u30ad\u30b9\u30c8\u306b\u6ce8\u5165\u3055\u308c\u307e\u3059\u3002",
    "how.step3.session": "\u30bb\u30c3\u30b7\u30e7\u30f3 #58",
    "how.step3.user": "\u3042\u306a\u305f",
    "how.step3.user.msg": "\u4eca\u4f7f\u3063\u3066\u3044\u308b\u30ec\u30fc\u30c8\u30ea\u30df\u30c3\u30c8\u306e\u65b9\u5f0f\u306f\uff1f",
    "how.step3.agent": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8",
    "how.step3.agent.msg": "3\u67089\u65e5\u306b\u30b9\u30e9\u30a4\u30c7\u30a3\u30f3\u30b0\u30a6\u30a3\u30f3\u30c9\u30a6\u65b9\u5f0f\u306b\u5207\u308a\u66ff\u3048\u307e\u3057\u305f\u3002",
    "how.step3.source": "\u30bd\u30fc\u30b9\uff1a\u30bb\u30c3\u30b7\u30e7\u30f3 #42\u3001\u30bf\u30fc\u30f3 3",
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
