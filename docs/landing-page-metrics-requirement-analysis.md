# Landing Page Metrics Requirement Analysis

Date: 2026-05-14

## Decision

Use the existing gh-server Prometheus path:

```text
clawmem.ai / blog / docs
  -> POST https://git.clawmem.ai/api/ext/v1/analytics/events
  -> gh-server Prometheus counter
  -> /metrics
  -> Prometheus scrape
  -> Grafana
```

Do not expose `/metrics` from Vercel. Do not push directly from the browser to Prometheus or Pushgateway.

## What This Covers

This implementation is a good fit for low-cardinality counters:

- landing/blog/docs page views as PV
- traffic source bucket: direct, internal, organic, twitter, discord, github, newsletter, blog, referral, other
- blog page views and blog link clicks by normalized blog slug
- console clicks by location
- install copy clicks by platform and location
- section views, scroll-depth events, language changes, scenario tab clicks

These are exposed through:

```text
gh_server_frontend_events_total{
  event,
  source,
  page,
  platform,
  location,
  success,
  traffic_source
}
```

Example Grafana queries:

```promql
sum(increase(gh_server_frontend_events_total{event="page_view"}[1d]))
sum by (traffic_source) (increase(gh_server_frontend_events_total{event="page_view"}[1d]))
sum by (platform) (increase(gh_server_frontend_events_total{event="install_copy"}[1d]))
sum by (location) (increase(gh_server_frontend_events_total{event="console_click"}[1d]))
sum by (page) (increase(gh_server_frontend_events_total{event="page_view", source="blog"}[1d]))
```

## What This Does Not Cover Well

Prometheus is not an event database, so these requirements are not correctly solved by `/metrics` alone:

- true UV
- unique sessions
- D7 / D30 retention
- WAU / MAU distinct agents
- per-user journey debugging
- raw UTM campaign tables
- raw event history
- long-term attribution from install copy to agent registration

Those need durable storage such as TiDB `analytics_events` plus daily aggregation. Prometheus can show operational/product counters, but it cannot reliably answer distinct-count and retention questions without pre-aggregated gauges generated elsewhere.

## Requirement Mapping

| Requirement | Status with gh-server metrics | Notes |
| --- | --- | --- |
| Landing PV | Supported | `event="page_view"` |
| Landing UV | Not exact | Needs anonymous/session storage or analytics DB |
| Traffic source distribution | Supported as buckets | Uses UTM/referrer buckets, not raw values |
| Blog article clicks/views | Supported | Normalized blog slug in `page` label |
| Console click count | Supported | `event="console_click"` |
| Install copy count | Supported | `event="install_copy"` |
| Install copy by platform | Supported | `platform` label |
| Agent registration count | Backend metric needed | Should be recorded where `POST /api/v3/agents` creates a new agent |
| Console first login | Console/backend metric needed | Cannot be inferred from landing page |
| memory_recall / memory_store | MCP/backend metric needed | Not a landing-page signal |
| memory total per agent | Backend snapshot needed | Should not be frontend instrumentation |
| D7 / D30 retention | Analytics DB needed | Requires durable event history and distinct agent IDs |
| WAU / MAU active agents | Analytics DB or backend gauges needed | Prometheus counter alone is insufficient |

## Implementation Notes

- The browser sends only behavior metadata, not tokens, prompts, memory content, or user identifiers.
- gh-server normalizes labels before exposing metrics, so arbitrary paths, referrers, and UTM strings do not become unbounded Prometheus labels.
- CORS must allow `https://clawmem.ai`, `https://www.clawmem.ai`, `https://staging.clawmem.ai`, and local Astro dev origins.
- The endpoint is public, rate-limited, and accepts small JSON payloads only.

## Next Discussion

The current Prometheus implementation is enough for a Grafana MVP. If operations needs UV, retention, or source-to-activation attribution, the next step should be TiDB-backed event storage and a daily aggregation job, not more Prometheus labels.
