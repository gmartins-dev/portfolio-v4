# ADR-003: Static bilingual 404 page without client JavaScript

- **Date**: 2026-10-11
- **Status**: Accepted
- **Tags**: routing, i18n

## Context and Problem Statement

Vercel serves one `404.html` for every unknown URL, in either language
(`/nope` and `/pt-br/nao-existe`). A prerendered page hydrates against the
URL it was rendered for; serving the English 404 at a Portuguese URL caused a
React hydration mismatch. `vercel.json` cannot route 404s by prefix while also
using redirects, headers and clean URLs.

## Decision Drivers

- No hydration errors on any URL
- Visitors in either language understand the page
- Keep the static, configuration-only hosting

## Considered Options

- One bilingual 404 with client scripts removed at prerender
- One 404 per language, routed with Vercel `routes`
- Client-side 404 rendering after a redirect

## Decision Outcome

Chosen option: **one bilingual, JavaScript-free 404**. The page shows both
languages; `withoutScripts()` keeps only the theme bootstrap (an allowlist,
so router markup changes cannot leak scripts back in). The root route detects
"not found" when only the root route matched (`src/not-found.ts`), which uses
public router data.

### Positive Consequences

- Correct 404 status, no hydration on any path, `noindex`
- Works with the existing `vercel.json`

### Negative Consequences

- The theme toggle is hidden on the 404 (the stored theme still applies)
- Client-side navigation from the 404 is a full page load

## Pros and Cons of the Options

### Bilingual static 404 ✅ Chosen

- ✅ Simple, robust to router upgrades
- ❌ No interactivity on that page

### Vercel `routes` per language

- ✅ Localized 404s
- ❌ `routes` cannot be combined with `redirects`, `headers` and `cleanUrls`

### Redirect to a client-rendered 404

- ✅ Full interactivity
- ❌ Wrong status codes and an extra request for crawlers

## Links

- [ADR-001](001-vite-react-with-build-time-prerender.md)
- `src/pages/not-found.tsx`, `src/not-found.ts`, `scripts/prerender.mjs`
