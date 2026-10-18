# ADR-006: Real-user Core Web Vitals with Vercel Speed Insights

- **Date**: 2026-10-17
- **Status**: Accepted
- **Tags**: performance, privacy, security

## Context and Problem Statement

The launch plan sets a target on real-user data (p75 LCP at or below
2.5 s), but the site had no way to collect it. Lab LCP on simulated slow 4G
sits at 2.0 to 2.5 s, with `/` and `/work` at the limit, and lab numbers do
not show what visitors on real devices get. Analytics in general stays
deferred; this decision covers performance measurement only.

## Decision Drivers

- Measure the Core Web Vitals target on real visits, per page
- Keep the strict CSP: no new script origin, no `unsafe-inline`
- No cookies, no cross-site tracking, no consent banner
- Never compete with the page's own loading (LCP)
- Little code and nothing to operate

## Considered Options

1. **Vercel Speed Insights** through `@vercel/speed-insights`
2. **`web-vitals` library with a custom endpoint**: needs a backend or a
   third-party collector, which the site does not have
3. **Chrome UX Report (CrUX) only**: no code, but a low-traffic site may
   never reach CrUX's threshold, and it reports by origin, not by page

## Decision Outcome

Chosen option: **Vercel Speed Insights**. The host already serves the site,
the script and its endpoint live on the site's own origin
(`/_vercel/speed-insights/`), so `script-src 'self'` and
`connect-src 'self'` already allow them, and it sets no cookies.

`src/entry-client.tsx` injects it in production builds only, after the
`load` event, with an explicit `scriptSrc` so the package never loads its
debug build from another host. `scripts/serve-dist.mjs` answers the script
path with an empty file, as Vercel does once the feature is enabled, and
e2e checks that the script is requested from this origin.

### Positive Consequences

- Per-page p75 LCP, INP and CLS from real visits, in the Vercel dashboard
- No CSP change and no new origin in the browser

### Negative Consequences

- About 0.8 kB gzip more client JavaScript
- Vercel receives the page URL and performance timings of each sampled
  visit; SECURITY.md says so
- Speed Insights must be enabled on the Vercel project, and it is a paid
  feature beyond the free tier's data points
- Tied to Vercel: moving hosts means replacing it (option 2 or 3)

## Links

- [ADR-002](002-per-page-csp-with-script-hashes.md), [ADR-005](005-layered-quality-gates.md)
- `src/entry-client.tsx`, `e2e/security.spec.ts`, ROADMAP.md (M5)
