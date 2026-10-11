# ADR-002: Per-page Content-Security-Policy with script hashes

- **Date**: 2026-10-11
- **Status**: Accepted
- **Tags**: security, build

## Context and Problem Statement

Every prerendered page carries inline scripts: the theme bootstrap (constant)
and TanStack Router's dehydrated state (different on every page). The site is
static on Vercel, so there is no server to issue a nonce per response, and
`vercel.json` headers are the same for every URL. We need a policy that blocks
injected scripts without blocking our own.

## Decision Drivers

- No `'unsafe-inline'` for scripts
- No runtime server or edge function just for security headers
- Must survive content and router changes without manual hash updates

## Considered Options

- Per-page `<meta http-equiv="Content-Security-Policy">` with SHA-256 hashes, computed at prerender
- `script-src 'unsafe-inline'` in a `vercel.json` header
- Nonces from an edge middleware

## Decision Outcome

Chosen option: **per-page meta CSP with hashes**. `src/finalize-html.ts`
computes the hash of each executable inline script after the last change to
its text and inserts the policy as the first element in `<head>`. Directives a
meta tag cannot carry (`frame-ancestors`) stay in the `vercel.json` header;
browsers enforce both.

### Positive Consequences

- Injected inline scripts are blocked (verified in Chromium)
- Fully static; hashes update on every build
- e2e tests run with both CSP layers and fail on any violation

### Negative Consequences

- Any new inline script must be generated before `finalizeHtml`, or it is blocked
- Inline `style` attributes are blocked too (`style-src 'self'`)
- A meta CSP is ignored for content before it, so it must stay first in `<head>`

## Pros and Cons of the Options

### Meta CSP with hashes ✅ Chosen

- ✅ Strict, static, automatic
- ❌ Coupled to the prerender step

### `'unsafe-inline'`

- ✅ Trivial
- ❌ Removes most of the protection CSP offers against XSS

### Edge nonces

- ✅ Standard nonce flow
- ❌ Adds a runtime component to a static site; every request pays for it

## Links

- [ADR-001](001-vite-react-with-build-time-prerender.md)
- `src/csp.ts`, `src/finalize-html.ts`, `SECURITY.md`
