# Architecture decision records

Why the site is built the way it is. ADRs are immutable: to change a
decision, add a new ADR that supersedes the old one and link both ways.

| ADR | Decision | Status |
| --- | --- | --- |
| [001](001-vite-react-with-build-time-prerender.md) | Vite + React + TanStack Router, prerendered at build time | Accepted |
| [002](002-per-page-csp-with-script-hashes.md) | Per-page Content-Security-Policy with script hashes | Accepted |
| [003](003-static-bilingual-404.md) | Static bilingual 404 page without client JavaScript | Accepted |
| [004](004-typed-content-modules-validated-at-build.md) | Typed content modules validated at build time, no CMS | Accepted |
| [005](005-layered-quality-gates.md) | Layered quality gates in CI | Accepted |
| [006](006-real-user-web-vitals-with-vercel-speed-insights.md) | Real-user Core Web Vitals with Vercel Speed Insights | Accepted |
| [007](007-polar-navy-palette.md) | Polar Navy palette with a derived light theme | Superseded by 008 |
| [008](008-dark-only.md) | Dark theme only, no theme switcher | Accepted |
| [009](009-contact-form-with-web3forms.md) | Contact form with Web3Forms | Accepted |

New ADR: copy the shape of an existing one (MADR: context, drivers, options,
outcome, consequences, links), number it sequentially, add it here.
