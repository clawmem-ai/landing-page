---
title: "ClawMem's Memory Wiki Now Speaks OKF"
description: "ClawMem wiki pages now support OKF-compatible writing, import, and export, giving team memory an open format for sharing across agents and tools."
date: 2026-07-09T12:00:00
---

Google Cloud introduced the [Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) (OKF) as a small, open way to represent knowledge as files that both people and agents can read.

The idea is intentionally plain: put knowledge in Markdown, add a little YAML frontmatter so tools know what each page is, and organize the pages in a directory tree. In OKF terms, that tree is a Knowledge Bundle. Each normal Markdown file is a Concept, and its path becomes its Concept ID.

The bundle structure carries some meaning of its own. Directories group related concepts. An `index.md` can sit at the root or inside a directory to show what is available there before a reader opens every file. A `log.md` can sit at the same levels to record date-grouped updates for that part of the bundle. Concepts can also link to each other with ordinary Markdown links, so the bundle can be browsed as a tree and traversed as a lightweight graph.

![OKF keeps the portable unit deliberately simple: a folder tree, Markdown concept pages, frontmatter, optional index and log files, and ordinary links between concepts.](/blog/clawmem-memory-wiki-now-speaks-okf/01-okf-bundle.jpeg)

<p class="image-caption">OKF keeps the portable unit deliberately simple: a folder tree, Markdown concept pages, frontmatter, optional index and log files, and ordinary links between concepts.</p>

The [spec](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) uses a minimal bundle like this:

```text
my_bundle/
  index.md
  datasets/
    index.md
    sales.md
  tables/
    index.md
    orders.md
    customers.md
```

A concept page then starts with frontmatter. For example, the spec's `tables/orders.md` page begins like this:

```yaml
---
type: BigQuery Table
title: Orders
description: One row per completed customer order.
resource: https://console.cloud.google.com/bigquery?p=acme&d=sales&t=orders
tags: [sales, orders]
timestamp: 2026-05-28T00:00:00Z
---
```

After that, the body is just Markdown: schema notes, links to related concepts, citations, or whatever context the page needs. That is enough structure for a tool to route, preview, search, and preserve knowledge, without turning the knowledge into a proprietary database dump.

When we read the spec, it felt less like a new direction than a name for something ClawMem had already been building toward.

## ClawMem Had Been Building Toward the Same Model

ClawMem is a memory system for agents and teams. It helps them keep long-running project knowledge outside a single chat, task, or agent session, then turn that knowledge into context future agents can reuse.

To make that work, ClawMem separates memory into two layers.

Issues are where atomic memory lives. They are the source records: decisions, preferences, observations, lessons learned, tasks, and the small facts that accumulate while agents and teammates work. If you need to know where a claim came from, the issue is where you trace it back.

The wiki is where context lives. A wiki page is not just another saved message. It is where related memories get compiled into something reusable: a project summary, a workflow, a release process, a decision record, a customer context page, a set of onboarding notes. The page is the thing a future agent should read first, before it starts reconstructing the same answer from scattered fragments.

Under the hood, ClawMem runs on [AGS](https://github.com/ngaut/agent-git-service), a GitHub-compatible backend. That gives us a familiar foundation for Markdown, history, and repository-shaped knowledge. But a GitHub-compatible knowledge base is only the starting point. Agent memory needs more than a place to put files; it needs a way for agents to find the right context, understand how pages relate, group knowledge by topic, search by meaning, and trace a summary back to the atomic memories that support it.

So ClawMem extends that AGS foundation with the pieces agent memory needs in practice: a structured wiki tree, wiki labels, TiDB-powered search across wiki pages, page history, links between pages, and references back to the issue memories underneath. The result still feels like a wiki, but it is a wiki built for agents to maintain and teams to inspect.

That is why OKF felt familiar rather than foreign. It describes knowledge as a navigable Markdown corpus, and that is already how ClawMem's wiki behaves.

In OKF, the directory tree is not just storage layout; it is one of the ways knowledge gets organized. ClawMem's structured wiki tree plays the same role. A project page, workflow page, or decision page has a path, sits inside a section, and can be discovered without loading the entire repository. OKF's `index.md` gives a directory an entry point for progressive disclosure; ClawMem provides the same orientation through the wiki tree itself, where agents and teammates can browse a section and see the pages it contains before opening them. Because those wiki pages are also indexed in the database, ClawMem can go beyond browsing and support full-text search and vector search across the wiki.

The same pattern shows up in metadata and change history. OKF uses `tags` for cross-cutting categorization; ClawMem uses wiki labels. OKF can include a scoped `log.md` so updates remain readable over time; ClawMem already keeps page history that can be summarized into that kind of update trail. OKF links concepts with Markdown links; ClawMem links wiki pages to each other and keeps references back to the issue memories that support the compiled page.

So the alignment is not just that both sides use Markdown. OKF's bundle structure gives a portable form to the same kind of organized, linkable, traceable context that ClawMem had already been building in its wiki.

![The strongest match is at the wiki layer: OKF files, folders, tags, logs, and links map cleanly to ClawMem wiki pages, tree paths, labels, page history, links, backlinks, and source references.](/blog/clawmem-memory-wiki-now-speaks-okf/02-okf-clawmem-mapping.jpeg)

<p class="image-caption">The strongest match is at the wiki layer: OKF files, folders, tags, logs, and links map cleanly to ClawMem wiki pages, tree paths, labels, page history, links, backlinks, and source references.</p>

## What Changes With OKF Support

Once OKF appeared, supporting it was the obvious next step. Not because ClawMem needed to become something new, but because the format matched the wiki model ClawMem had already built.

Before OKF support, ClawMem wiki knowledge was already reusable inside ClawMem. A page written by one ClawMem-aware agent could be read by another, whether the team was working with Claude Code, Codex, Hermes, or another agent connected through the same memory layer. Teams could maintain project pages, workflow pages, decisions, and source-backed summaries in one shared memory wiki.

After OKF support, the boundary changes. The same wiki layer now has a standard exchange shape. Knowledge from other OKF-producing tools can come into ClawMem as wiki context, and ClawMem knowledge can leave as an OKF bundle for another catalog, wiki, Git workflow, agent, or retrieval system to consume. The point is not just export; it is that ClawMem now participates in an emerging protocol for portable knowledge instead of asking every outside tool to understand a ClawMem-specific format.

![Before OKF, ClawMem wiki knowledge was reusable across ClawMem-aware agents. With OKF, that same wiki layer gets a standard path for import and export beyond ClawMem.](/blog/clawmem-memory-wiki-now-speaks-okf/03-before-after-okf.jpeg)

<p class="image-caption">Before OKF, ClawMem wiki knowledge was reusable across ClawMem-aware agents. With OKF, that same wiki layer gets a standard path for import and export beyond ClawMem.</p>

That shows up in the product in three places.

**Writing.** OKF becomes part of the write path. For agents that understand ClawMem and write to the wiki through ClawMem's normal wiki path, including writes through the ClawMem plugin, new or updated pages now use an OKF-compatible shape by default: Markdown body, YAML frontmatter with a `type`, title and description where useful, tags, timestamps, related links, resource fields, citations, and ClawMem-specific source metadata. Console recognizes that shape, renders the page as a normal wiki page, and keeps the OKF metadata visible when you want to inspect it.

**Importing.** OKF can come in. Bring in an OKF-style Markdown file or bundle, and ClawMem can turn it into wiki knowledge without flattening it into a generic note. Files become pages. Folders become the wiki tree. Tags become labels. Frontmatter stays with the page, while the Markdown body renders as the page itself. Console can mark the page as OKF, show the metadata in a frontmatter panel, and still let the page read like any other wiki page.

![After import, an OKF-style Markdown page appears as a normal ClawMem wiki page while Console keeps the OKF badge, labels, frontmatter, resource, and tags visible for review.](/blog/clawmem-memory-wiki-now-speaks-okf/04-console-okf-wiki.png)

<p class="image-caption">After import, an OKF-style Markdown page appears as a normal ClawMem wiki page while Console keeps the OKF badge, labels, frontmatter, resource, and tags visible for review.</p>

**Exporting.** ClawMem knowledge can go out. Any wiki repository in Console can leave as an OKF bundle, whether the pages originally started as OKF or not. Pages that already have OKF frontmatter pass through naturally. Existing ClawMem wiki pages are converted during export: the tree becomes folders, labels become tags, internal wiki links become bundle-relative Markdown links, history becomes optional `log.md` context, and source metadata is preserved in producer-defined fields so the exported page still knows where it came from.

![Export turns the wiki tree into a folder tree of plain Markdown files: index.md, log.md, concept pages, links, tags, and source metadata that can travel outside ClawMem.](/blog/clawmem-memory-wiki-now-speaks-okf/05-okf-export-folder-tree.jpeg)

<p class="image-caption">Export turns the wiki tree into a folder tree of plain Markdown files: index.md, log.md, concept pages, links, tags, and source metadata that can travel outside ClawMem.</p>

Open a wiki repository in Console, export it, and you get a ZIP of Markdown files that stands on its own:

```text
clawmem-wiki-okf.zip
  index.md
  log.md
  projects/
    clawmem.md
  workflows/
    release-process.md
  topics/
    agent-memory.md
```

Inside are links, tags, a generated index, optional log context, and source metadata that traces where each page came from. Open it without ClawMem and it still reads like knowledge. Put it in a Git repo, hand it to another agent, feed it into another OKF consumer, or keep it as an archive your team can inspect later.

Raw conversation logs still matter for audit and provenance, but they are rarely the best handoff format. The wiki layer is the part teams actually reuse: workflows, project state, decisions, explanations, and the pages a future agent should read first. OKF gives that layer a shape that travels, and the bigger benefit is ecosystem leverage: as more tools learn to produce or consume OKF, ClawMem knowledge can meet them through the same standard interface.

## Try It

If you already use ClawMem, OKF export is available from wiki repositories in Console, and new wiki pages can be written in OKF-compatible form by default. You can also import OKF-style knowledge and keep improving it inside the same wiki workflow.

As agents maintain project pages, workflow pages, and decision pages, that knowledge can now be read inside ClawMem and carried outside it as a standard OKF bundle.
