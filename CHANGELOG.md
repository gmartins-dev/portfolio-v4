# Changelog

Notable changes to gmartins.dev v4 that are done and verified. Planned work
is in the [roadmap](ROADMAP.md).

## Unreleased

### M1 to M4: the v4 site, built on #1

All copy is a draft pending the owner
review listed in the [roadmap](ROADMAP.md).

#### Added

- **Design system:** cool neutral tokens with one burnt-orange accent, light
  and dark values, Geist and Geist Mono self-hosted, visible focus ring,
  reduced-motion override ([DESIGN.md](DESIGN.md)).
- **Theme:** Light, Dark and System, applied by an inline script before first
  paint, persisted and synced across tabs.
- **Content model:** typed EN/PT-BR content for the profile, six experience
  entries, two case studies and a community project, validated with zod at
  build time. Facts come from the resumes, the GitHub profile README, the
  project repositories and the GitHub API (checked 2026-10-11).
- **Pages:** home (hero, selected work, capabilities linked to evidence,
  experience summary, community), `/work`, case studies for sdd-agentic-flow
  and payments-api-node, `/about` (history, tools, resumes) and a static
  bilingual 404. Site shell with skip link, navigation, language switch to
  the same page, and a site-wide contact section.
- **Images:** real screenshots of the public projects as responsive WebP;
  social cards (1200x630) per page and locale; favicon and touch icon.
- **SEO:** sitemap with hreflang alternates, robots.txt, Person and WebSite
  JSON-LD, Open Graph and Twitter cards.
- **Deploy:** `vercel.json` with clean URLs, the v3 short links, `/resume` to
  `/about` and `/construction` to `/`, security headers, immutable asset
  caching, and a per-page CSP that allows inline scripts by hash.
- **Quality:** Playwright smoke, journey and axe (WCAG 2.2 AA, both themes)
  tests on desktop and mobile; `pnpm check:dist` for links, canonicals,
  hreflang and the sitemap; CI runs all of them.
- AGENTS.md and an updated README and ADR-001.

#### Changed

- Prerendered pages are written as `dist/<path>.html` for Vercel clean URLs.
- The client entry is content-hashed and fetched at low priority.
- Content validation runs on the server only, keeping zod out of the client.

#### Verified

- `pnpm check`: typecheck, Biome and 22 unit tests pass.
- `pnpm check:dist`: 10 pages consistent.
- `pnpm test:e2e`: 79 passed, 1 skipped (keyboard test on mobile).
- Lighthouse 12, mobile lab run against a local gzip server: performance
  95-97, accessibility, best practices and SEO 100; FCP 1.2 s, LCP 2.6-2.8 s,
  CLS at most 0.013. Lab only; field data comes after launch.

### M1 Foundation, part 1: tooling and prerender ([#1](https://github.com/gmartins-dev/portfolio-v4/pull/1))

#### Added

- Build-time prerender: each route × locale is written to
  `dist/<path>/index.html` (now `dist/<path>.html`) as a complete document,
  and the browser hydrates it. The dev server renders the same way. See
  [ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md).
- Localized routing: English at `/`, Brazilian Portuguese under `/pt-br`.
- Per-page head tags: title, description, canonical, reciprocal hreflang with
  `x-default`, and Open Graph basics (`src/seo.ts`).
- Placeholder Home and About pages in both languages to prove the pipeline.
- Unit tests for localized paths, head tags, and the server render.
- CI workflow running `pnpm check` and `pnpm build`.
- `.node-version` (Node 24), `packageManager`, and `engines`.
- Scripts: `typecheck`, `lint`, `format:check`, `fix`, `check:biome`, `test`,
  `check`.
- Project README.

#### Changed

- Moved `components/` and `lib/` under `src/`; the `@` alias points to `src/`.
- Biome is the only linter and formatter, with Tailwind CSS directives
  enabled.
- System font stack until the typeface is chosen.

#### Removed

- ESLint and its plugins.
- Unused dependencies: framer-motion, react-hook-form, @hookform/resolvers,
  posthog-js, @fontsource-variable/roboto.
- Vite template files (`App.tsx`, `App.css`, `index.html`, sample assets).

#### Fixed (from code review of #1)

- `pnpm preview` returned 404 for every page because `appType: "custom"`
  also disables Vite's HTML handling in preview. The preview server now maps
  `/about` to the prerendered file, as static hosts do.
- The dev server collapsed whitespace across the whole document, which could
  join inline words and cause dev-only hydration mismatches. It now only
  touches `<head>`, where Vite injects its scripts.

#### Verified

- `pnpm check` and `pnpm build` pass locally.
- Headless Chromium, on the production build and the dev server: no hydration
  errors, one title and one canonical per page, `lang` and head update when
  switching language, and content is readable with JavaScript disabled.

## 0.0.0 - 2026-10-11

- Project created with Vite, React 19, TypeScript, Tailwind CSS 4, shadcn/ui,
  TanStack Router, and Biome.
