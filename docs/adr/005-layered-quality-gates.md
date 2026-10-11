# ADR-005: Layered quality gates in CI

- **Date**: 2026-10-11
- **Status**: Accepted
- **Tags**: testing, ci, accessibility, performance

## Context and Problem Statement

The site's value depends on qualities that regress silently: accessibility,
search metadata, hydration, performance and security headers. Manual
review missed real defects during development (a 282px reflow overflow, a
hydration mismatch on the 404, stale head tags). Each kind of defect is
caught most cheaply at a different layer.

## Decision Drivers

- Catch a regression at the cheapest layer that can see it
- Every gate runs in CI on every pull request
- Gates must be able to fail (each one was checked against a deliberate break)

## Decision Outcome

Chosen option: **four layers, all required in CI**:

| Layer | Tool | Catches |
| --- | --- | --- |
| Static | `pnpm check`: TypeScript, Biome, Vitest (logic, content rules, React Testing Library) | Type errors, lint, content and component behavior |
| Built output | `pnpm check:dist` | Broken links, canonicals, hreflang, sitemap, `llms.txt`, JS budget (150 kB gzipped) |
| Browser | `pnpm test:e2e` (Playwright, desktop and mobile, served like Vercel) | Hydration and CSP errors, journeys, focus, reflow at 320px, axe WCAG 2.2 AA in both themes |
| Supply chain | `pnpm audit --prod --audit-level high`, Dependabot | Vulnerable runtime dependencies |

Lighthouse stays a manual diagnostic, not a gate: lab scores vary between
runs, and the Core Web Vitals target is set on real-user data after launch.

### Positive Consequences

- Each past defect now has a test that fails if it returns
- Contributors (people or agents) get a precise failing check

### Negative Consequences

- CI takes several minutes, mostly the Playwright suite
- Copy changes in titles or headings require updating e2e expectations

## Links

- [ADR-002](002-per-page-csp-with-script-hashes.md), `docs/maintenance.md`
- `.github/workflows/ci.yml`, `scripts/check-dist.mjs`, `e2e/`
