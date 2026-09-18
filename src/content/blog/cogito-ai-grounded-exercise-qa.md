---
title: "How COGITO AI Uses Agent Git Service to Test Grounded Exercise Q&A"
description: "A guest case study from The Alpha Nova: using Agent Git Service to preserve reviewable evidence from a grounded exercise Q&A experiment in COGITO AI."
date: 2026-09-18T12:00:00
category: community
tag: Use case
author: "Athif Shaffy"
authorOrganization: "The Alpha Nova"
authorOrganizationUrl: "https://thealphanova.com/"
coverImage: "/blog/cogito-ai-grounded-exercise-qa/evidence-registry-banner.png"
coverBackground: "#B6423F"
---

We tried Agent Git Service (AGS) as an evidence registry for an AI feature experiment in a mental health app. Here is what we recorded, why we kept it outside the request path, and what the record gave us.

> This describes a development experiment, not a production launch or a clinical study. No real user data entered TiDB or AGS, and no live language model was called.

We wanted a reviewable record of an agent-assisted development experiment: what we tested, what failed, and which report supported the results. We tried [Agent Git Service](https://github.com/ngaut/agent-git-service) for this purpose in COGITO AI, an app built around an imported exercise library, where we are exploring an optional AI question-and-answer feature. The product question is practical: can someone ask about the exercise in front of them and receive an explanation that stays faithful to its instructions?

That question is hard to answer from an agent's memory of what it ran. Experiments get repeated, results drift, and a chat transcript is a poor audit trail. Our setup gave the two tools different jobs: TiDB stored the exercise documents used in a retrieval-consistency experiment; AGS preserved the development records for that experiment and a separate answer-validation evaluation.

The short version: TiDB preserved all eight retrieval comparisons in our sample, the answer evaluation exposed five failures in the existing lexical validator, and AGS gave us a private repository, an issue, a comment, and a committed report that the next session can read back instead of trusting a recollection.

## The product constraint comes first

The project imports its exercise content from the COGITO source rather than asking a language model to invent exercises. The public [COGITO overview](https://clinical-neuropsychology.de/cogito-en/) provides background on the original app. This COGITO AI experiment does not establish a public release or transfer the original app's research results to the new Q&A feature.

[![Current product context: imported exercise content, the Flutter app, and the optional consented Q&A path.](/blog/cogito-ai-grounded-exercise-qa/01-current-context.png)](/blog/cogito-ai-grounded-exercise-qa/01-current-context.png)

<p class="image-caption"><strong>Figure 1. Current product context.</strong> Imported content stays authoritative. Optional exercise Q&A is a separate, consented path, and the model endpoint was not configured or called in this experiment.</p>

In the inspected build, exercise Q&A is optional and consented. The question and conversation remain in memory on the phone. When a Q&A server is configured, pressing Send transmits the in-memory conversation only while consent is enabled. The feature does not persist that free text in the app's event store or preferences. Other app features do retain information such as a chosen name and habit notes, so saying “the app stores no typed information” would be inaccurate.

The Q&A server retrieves passages from one selected exercise and uses an answer validator before returning a model response. Our experiment kept the mobile app and that production server behavior unchanged. Every test question and candidate answer was synthetic; no real user conversation, diary, check-in, or personal history entered TiDB or AGS.

[![Exercise Q&A request sequence showing consent, retrieval, candidate-answer validation, and refusal paths.](/blog/cogito-ai-grounded-exercise-qa/02-current-request-sequence.png)](/blog/cogito-ai-grounded-exercise-qa/02-current-request-sequence.png)

<p class="image-caption"><strong>Figure 2. Current request sequence.</strong> What is sent, what the server checks, and where refusal happens. The lexical validator is a check, not proof of semantic equivalence.</p>

## Where TiDB fits in this experiment

The starting point is a local corpus and local BM25 passage ranking. We tested whether a database-backed source could preserve that retrieval behavior while making the expected source revision explicit.

Only two unchanged documents from the canonical corpus entered a private TiDB experiment table. Each row contains an exercise ID, a SHA-256 hash of its canonical JSON representation, and the document JSON. The loader requests both the ID and expected hash using parameterized SQL. It then checks the returned document's ID and recomputes its hash before allowing retrieval.

```text
Synthetic question stays in the experiment process
  |
Exercise ID and expected source hash → TiDB → checked document
  |
Existing local BM25 → exercise-scoped passage IDs
```

The question text is never part of the SQL request. Unknown exercises, stale revisions, swapped documents, or corrupted content must produce no usable document. This is a narrow developer experiment, not a complete authentication or deployment design.

We connected to a disposable TiDB Zero instance with certificate-verified TLS using PyMySQL 1.1.2. The observed engine was TiDB v8.5.3-serverless. This experiment uses ordinary SQL persistence and local BM25; it does not use vector search, hybrid search, automatic embeddings, or TiDB to generate answers.

## What the retrieval experiment showed

Across eight synthetic questions, the locally loaded document and the TiDB-fetched document produced identical ordered passage IDs, grounding flags, and retrieval reasons. All passages stayed within the requested exercise. Negative checks rejected unknown IDs, an injection-shaped ID, the wrong revision, and a hash belonging to another exercise. Temporary revision probes restored the original stored metadata afterwards.

That is evidence of storage and retrieval consistency for two documents. It is not evidence that database retrieval improves relevance or that TiDB is faster. The recorded database timings are single samples that exclude connection setup; they are not a performance benchmark.

## Why answer checking needed a separate experiment

Retrieving the right document does not establish that an answer preserves its meaning. We exercised the real Q&A pipeline with deterministic candidate responses and a separate, clearly labelled set of synthetic object-instruction fixtures. These fixtures are not product exercises and were never imported into the app.

The current answer validator uses lexical overlap and phrase checks. In our deliberately challenging 16-case matrix, it matched the manually labelled expectation in 11 cases and failed in five. The failures involved reversed negation, numeric-only output, changed quantity, reversed spatial order, and a substring that omitted negation. This is a characterization of validator behavior, not a measured failure rate for a live language model.

We also tried an additive experimental gate that accepts only exact whole source sentences or passages after the existing pipeline allows an answer. It matched 15 of the 16 expectations. Its remaining failure was a faithful paraphrase that it refused. Exact extraction can reduce some meaning changes, but it can also reject helpful wording; an exact excerpt may still be irrelevant or misleading in context. We have not adopted this comparator as the product validator.

[![Two independent evaluations feed sanitized evidence into a local AGS registry, with TiDB metadata and local Git objects.](/blog/cogito-ai-grounded-exercise-qa/03-tested-experiment.png)](/blog/cogito-ai-grounded-exercise-qa/03-tested-experiment.png)

<p class="image-caption"><strong>Figure 3. The experiment we ran.</strong> Two independent experiments produce sanitized evidence for a local AGS registry. Two actual corpus documents, synthetic questions and candidate responses, no live LLM.</p>

<div class="comparison-table" role="region" aria-label="Experiment results and their limits" tabindex="0">
<table>
  <thead><tr><th scope="col">Experiment</th><th scope="col">Observed result</th><th scope="col">What it supports</th></tr></thead>
  <tbody>
    <tr><td>TiDB-backed document retrieval</td><td>8 of 8 comparisons identical</td><td>Narrow storage and revision consistency</td></tr>
    <tr><td>Current answer validator</td><td>11 of 16 expected outcomes</td><td>Five reproducible weaknesses in a synthetic matrix</td></tr>
    <tr><td>Additional exact-source comparator</td><td>15 of 16 expected outcomes</td><td>Stricter extraction with a demonstrated false refusal</td></tr>
    <tr><td>AGS evidence registry</td><td>Issue, comment, and Git report read back</td><td>Inspectable records of this development run</td></tr>
  </tbody>
</table>
</div>

## How we used AGS

Agent Git Service (AGS) is a self-hosted Git collaboration service designed for agents. It supports standard Git operations and common GitHub-compatible API workflows, and gives agents persistent accounts, their own credentials, and repositories they can own. These capabilities provide a foundation for preserving work across sessions and sharing it with authorized people or other agents. In this experiment, we explored a small part of that model: recording evaluation results in a private repository and reading them back for review.

We ran AGS locally as an evidence registry. For this local setup, we placed its metadata tables on the same TiDB instance as the experiment documents, with the Git objects on the local filesystem. An evaluation agent created a private repository and recorded a sanitized summary in three forms:

- **An issue** describing the run.
- **A comment** with the outcome.
- **A committed JSON report** containing the results.

Each entry references the underlying result files by SHA-256 hash, so a reviewer can confirm that the report matches the artifacts it claims to summarize.

Three decisions shaped how it fit into the project.

### It stays outside the request path

AGS is not in the loop when the app sends a question to the Q&A server. It never sees the exercise corpus, a user's typed question, or any app state. It holds development metadata only. For a mental health app, that boundary matters more than any convenience, and keeping the registry on the developer side made it easy to hold.

### An agent writes it, a person reads it

The point of a Git-shaped service for agents is that the record looks like something engineers already know how to review: a repo, issues, comments, commits. When we read the issue and the committed report back, we got the same numbers the experiment produced, linked to the same hashes. That is a small thing, but it is the thing that lets us cite “11 of 16” in this post with a straight face.

### It is a development registry, not a runtime dependency

We stopped the service after verifying the records. Nothing in it needs to run for the product to work. If the experiment is repeated, the next agent can read the repository through a running AGS instance or a retained Git copy, review what passed and what did not, and start from there.

The honest limitation is scope. We used one repository, one issue, and one report for one experiment. We have not tested AGS under many concurrent agents, across teams, or as a long-lived record over months. What we can say is that it did the job we asked of it without getting in the way, and that the job it did is one we had been doing badly before.

## What comes next

The next useful experiment is a paired live-model evaluation using a chosen endpoint and model, a frozen question set, and human-reviewed expected answers. The inspected source defaults to `deepseek-ai/deepseek-v4-flash`, but no endpoint or API key was configured for this run. The adapter uses an OpenAI-compatible chat-completions interface; our results do not evaluate that model or establish its hosting location, retention policy, or processor terms.

[![Proposed product integration with consented Q&A, document and answer verification, and AGS kept outside the runtime path.](/blog/cogito-ai-grounded-exercise-qa/04-proposed-integration.png)](/blog/cogito-ai-grounded-exercise-qa/04-proposed-integration.png)

<p class="image-caption"><strong>Figure 4. Proposed product integration.</strong> A design direction for the next phase, derived from the experiment. Dashed elements are proposed, not deployed; no production integration, provider selection, hosting region, or retention agreement is established.</p>

Before any product integration, we also need a defined corpus-version handshake, better evidence for meaning-preserving answers, and deployment facts that support the consent wording. We can then compare answer fidelity, useful refusals, latency, and cost without changing several variables at once.

The useful outcome for COGITO AI is a reproducible basis for those decisions: TiDB can preserve the tested exercise boundary, the current answer gate needs further work, and AGS holds the evidence for both claims where the next person can check it. That is the story we can support today.

> COGITO background is available in the [original app overview](https://clinical-neuropsychology.de/cogito-en/).
