# Security

gmartins.dev is a static site: prerendered HTML, CSS, a client bundle and
images, served by Vercel. There is no backend, no login, no form, no cookie
and no script from another origin, so the attack surface is the delivered
markup, its headers, and the build chain.

The one script that sends data is Vercel Speed Insights
([ADR-006](docs/adr/006-real-user-web-vitals-with-vercel-speed-insights.md)):
served from this origin, it sends the page URL and Core Web Vitals timings of
sampled visits to Vercel, without cookies.

## Reporting

Email contact@gmartins.dev with the details. Please do not open a public
issue for a vulnerability.

## Controls

| Area | Control | Where |
| --- | --- | --- |
| Script injection | Per-page Content-Security-Policy `<meta>`: `script-src 'self'` plus the SHA-256 of each inline script, no `unsafe-inline` | `src/csp.ts`, `src/finalize-html.ts` |
| Framing, plugins, form targets | `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` header, plus `X-Frame-Options: DENY` | `vercel.json` |
| Transport | HSTS (2 years, subdomains) | `vercel.json` |
| Other headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment, USB, serial, HID, MIDI and Topics off), `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin` (`cross-origin` for social cards under `/images/og/`) | `vercel.json` |
| Structured data | `<` escaped in JSON-LD so data cannot close its script element | `src/seo.ts` |
| Content | All content is local and typed; nothing user-supplied is rendered | `src/content/` |
| Dependencies | `pnpm audit --prod --audit-level high` fails CI; Dependabot opens weekly grouped updates | `.github/` |
| CI | Actions pinned to commit SHAs; workflow token is read-only | `.github/workflows/ci.yml` |
| Source maps | Not emitted in production builds | Vite default |

The CSP and every header are exercised by the end-to-end suite:
`scripts/serve-dist.mjs` applies the `vercel.json` header rules, so tests run
with both CSP layers and fail on any CSP violation in the console, and
`e2e/security.spec.ts` checks the header values.

## Known findings

None. `pnpm audit` (production and development dependencies) reports no
known vulnerabilities (checked 2026-10-17). The earlier `braces` advisory
came from the `shadcn` CLI, which is no longer a dependency; run
`pnpm dlx shadcn` when adding a component.
