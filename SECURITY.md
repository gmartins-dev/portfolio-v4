# Security

gmartins.dev is a static site: prerendered HTML, CSS, a client bundle and
images, served by Vercel. There is no backend, no login, no form, no cookie
and no third-party script, so the attack surface is the delivered markup,
its headers, and the build chain.

## Reporting

Email contact@gmartins.dev with the details. Please do not open a public
issue for a vulnerability.

## Controls

| Area | Control | Where |
| --- | --- | --- |
| Script injection | Per-page Content-Security-Policy `<meta>`: `script-src 'self'` plus the SHA-256 of each inline script, no `unsafe-inline` | `src/csp.ts`, `src/finalize-html.ts` |
| Framing, plugins, form targets | `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` header, plus `X-Frame-Options: DENY` | `vercel.json` |
| Transport | HSTS (2 years, subdomains) | `vercel.json` |
| Other headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation off), `Cross-Origin-Opener-Policy: same-origin` | `vercel.json` |
| Structured data | `<` escaped in JSON-LD so data cannot close its script element | `src/seo.ts` |
| Content | All content is local and typed; nothing user-supplied is rendered | `src/content/` |
| Dependencies | `pnpm audit --prod --audit-level high` fails CI; Dependabot opens weekly grouped updates | `.github/` |
| CI | Actions pinned to commit SHAs; workflow token is read-only | `.github/workflows/ci.yml` |
| Source maps | Not emitted in production builds | Vite default |

The CSP and every header are exercised by the end-to-end suite:
`scripts/serve-dist.mjs` applies the `vercel.json` header rules, so tests run
with both CSP layers, and they fail on any CSP violation in the console.

## Known findings

None. `pnpm audit` (production and development dependencies) reports no
known vulnerabilities (checked 2026-10-17). The earlier `braces` advisory
came from the `shadcn` CLI, which is no longer a dependency; run
`pnpm dlx shadcn` when adding a component.
