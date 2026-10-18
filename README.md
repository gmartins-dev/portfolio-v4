# gmartins.dev v4

[![CI](https://github.com/gmartins-dev/portfolio-v4/actions/workflows/ci.yml/badge.svg)](https://github.com/gmartins-dev/portfolio-v4/actions/workflows/ci.yml)

Source for [gmartins.dev](https://gmartins.dev), the site of Guilherme
Martins, Software Engineer: case studies, the public products he worked on,
more projects, career history, and contact, in English (`/`) and Brazilian
Portuguese (`/pt-br`).

## What's notable

- **Static, prerendered React.** Vite, React 19 and TanStack Router render
  every page to HTML at build time; the browser hydrates it. No runtime
  server ([ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md)).
- **Strict CSP on a static host.** Each page allows its inline scripts by
  SHA-256, with no `unsafe-inline`
  ([ADR-002](docs/adr/002-per-page-csp-with-script-hashes.md)).
- **One content source.** Typed bilingual content generates the pages,
  JSON-LD, sitemap, `llms.txt`, `llms-full.txt` and social cards, and fails the build when
  something is missing ([ADR-004](docs/adr/004-typed-content-modules-validated-at-build.md)).
- **Quality gates in CI.** Unit and component tests, a built-output checker
  with a JavaScript budget, Playwright journeys with axe (WCAG 2.2 AA, both
  themes, desktop and mobile), and a production dependency audit
  ([ADR-005](docs/adr/005-layered-quality-gates.md)).

## Develop

Requires Node 24 (`.node-version`) and pnpm (version in `package.json`).

```sh
pnpm install
pnpm dev          # dev server, server-rendered like production
pnpm check        # typecheck, Biome, unit and component tests
pnpm build        # prerender into dist/
pnpm check:dist   # links, canonicals, hreflang, sitemap, JS budget
pnpm test:e2e     # Playwright + axe against dist/ (run pnpm build first)
pnpm preview      # serve dist/ locally
```

## Documentation

| Read this | To |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Understand the build pipeline and what runs in the browser |
| [docs/maintenance.md](docs/maintenance.md) | Change copy, add a case study or page, update dependencies, release |
| [docs/adr/](docs/adr/README.md) | See why each architectural choice was made |
| [DESIGN.md](DESIGN.md) | Work on the UI: tokens, typography, rules |
| [SECURITY.md](SECURITY.md) | Review the security controls or report an issue |
| [ROADMAP.md](ROADMAP.md) | See open work and what blocks the launch |
| [CHANGELOG.md](CHANGELOG.md) | See what changed |
| [AGENTS.md](AGENTS.md) | Brief a coding agent working in this repository |

## Status

Built and tested, not yet live: gmartins.dev still serves the previous
version. The owner review and launch steps are tracked in
[ROADMAP.md](ROADMAP.md).
