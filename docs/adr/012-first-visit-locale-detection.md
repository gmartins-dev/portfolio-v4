# ADR-012: First-visit language detection with an inline head script

- **Date**: 2026-10-28
- **Status**: Accepted
- **Tags**: i18n, seo, security

## Context and Problem Statement

English lives at `/` and Portuguese under `/pt-br` (ADR-001). A Brazilian
visitor who opens `/` lands in English and has to find the header toggle. The
site should open in the visitor's language: Portuguese for `pt`, `pt-BR`,
`pt-PT` and similar, English for everyone else.

## Decision Drivers

- No cookies (SECURITY.md) and no server logic: the site is static
- Scripts stay allowed by hash, never by `'unsafe-inline'` (ADR-002)
- An explicit choice must never be overridden
- `hreflang`, `x-default` and the sitemap keep working for crawlers

## Considered Options

1. Do nothing and rely on the header toggle
2. Redirect `/` in `vercel.json` by `Accept-Language`
3. An inline script in `<head>` that redirects `/` on the client

## Decision Outcome

Chosen option: **3**. `src/locale-redirect.ts` exports the script, rendered
inline in `<head>` by `src/router.tsx` next to the hero entrance script
(ADR-011); its hash enters the page CSP automatically. It runs only on `/`.
A saved choice (`localStorage["locale"]`, written by the header toggle) wins;
otherwise the first Portuguese or English tag in `navigator.languages`
decides, and no match means English. It uses `location.replace` and keeps the
query string and hash. Option 2 adds `has` rules, `Vary: Accept-Language`
cache entries, a cookie to remember the choice and a `serve-dist.mjs`
extension, for a flash it only partly removes. Option 1 was the status quo.

### Consequences

- Google advises against redirecting automatically by presumed language. The
  risk is limited: only `/` redirects, every localized URL stays reachable,
  `x-default` still points at `/`, and crawlers do not run the preference.
- A visitor with JavaScript disabled, or with storage blocked, still reaches
  both languages through the toggle; blocked storage only loses the memory of
  the choice.
- A short flash of the English home is possible before the redirect; the
  script runs before the body paints, so it is usually not visible.
- The 404 page has no scripts and does not redirect.
- Sharing `/` with a Portuguese-speaking visitor opens `/pt-br`; share the
  localized URL to pin a language.

## Links

- [ADR-002](002-per-page-csp-with-script-hashes.md), [ADR-011](011-hero-entrance-gated-by-inline-head-script.md)
