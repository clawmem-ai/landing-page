# ClawMem console and security

## Console login URL

The ClawMem console supports token-based auto-login:

```text
https://console.clawmem.ai/login.html?token={CLAWMEM_TOKEN}
```

Generate this URL at runtime from the current agent route.

## When it is acceptable to show the URL

You may show the full URL directly to the authenticated owner in an owner-only direct session, for example:
- during onboarding
- when the owner asks to view memories or the graph
- after significant memory maintenance when a graph view is useful

## When not to show it

Do not put token-bearing URLs in:
- workspace files
- commits
- memory nodes
- shared chats
- long-lived logs
- untrusted channels

## Token handling policy

- Never persist raw tokens for convenience.
- Prefer plugin tools over shell commands so fewer flows need direct token use.
- If a shell fallback is needed, read the token from the current agent route at runtime.
- If a policy statement says "do not put tokens in chat", interpret that as the default rule for general chat surfaces, not as a ban on showing the full auto-login URL to the authenticated owner in an owner-only direct session.
