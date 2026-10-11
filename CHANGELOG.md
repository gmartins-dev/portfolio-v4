# Changelog

Notable changes to gmartins.dev v4 that are done and verified. Planned work
is in the [roadmap](ROADMAP.md).

## Unreleased

### More work: Priorize.me and client websites

- Priorize.me case study (product engineering): problem, approach,
  decisions and trade-offs, validation, beta status. Live app linked; the
  repository is private and the page says so.
- Client work for Débora Blaso: deborablaso.com.br and the Psicologia da
  Moda Clube landing pages, linked to the live sites.
- Short work entries carry a kind label; the section is now "Client and
  community work".
- The resume links `/cv` and `/cv-br` are confirmed as final.

### Audit and hardening

A full audit, one area at a time, each with its specialist checklist:
quality baseline, performance, accessibility, technical SEO, AI search,
security, React practices, routing, interface guidelines, copy, tests and
documentation. Every fix that could regress now has a test.

#### Fixed

- `/email` sent visitors to `gmartins.dev/mailto:...` (Vercel cannot redirect
  to `mailto:`); it now opens the contact section.
- The payments case study scrolled 282px sideways at 320px (WCAG 1.4.10).
- Buttons replaced the focus outline with a nearly invisible translucent
  ring; outline buttons had no visible border.
- Prerendered HTML contained raw NUL characters (an HTML parse error).
- The sdd-agentic-flow screenshot captured GitHub's header instead of the
  README.
- After client-side navigation, focus fell back to `<body>`; it now moves to
  the new page's heading.
- The light `theme-color` was dropped by head deduplication.

#### Added

- Page-specific JSON-LD: ProfilePage, CollectionPage, TechArticle with
  BreadcrumbList; `og:type=article` and sitemap `lastmod` for case studies.
- `/llms.txt`, generated from the content model.
- Font preload, responsive WebP variants (480/720/1280), image caching.
- 24px minimum link targets, `translate="no"` on names and code,
  balanced headings.
- Tests: React Testing Library for the theme, 320px reflow and focus
  outlines on every page, SEO graph, CSP, NUL escaping, `llms.txt`;
  a 150 kB gzipped JavaScript budget in `check:dist`.
- Dependabot, a production dependency audit in CI, COOP header.
- Docs: ADR-002 to ADR-005, `docs/architecture.md`,
  `docs/maintenance.md`, `SECURITY.md`; updated README, AGENTS.md,
  DESIGN.md.

#### Changed

- Dependencies updated (React 19.3, TanStack Router 1.170, Vite 7.3.7,
  Biome 2.5); the shadcn CLI moved to dev dependencies.
  `pnpm audit --prod` is clean.
- Descriptive titles for Work, About and the case studies.
- Copy reviewed for passive voice and filler in both languages.

#### Verified

- 38 unit and component tests, `check:dist`, 102 e2e tests (desktop and
  mobile, axe in both themes) pass.
- Lighthouse 13.5, mobile lab, median of 3 runs: performance 97-99;
  accessibility, best practices, SEO and agentic browsing 100; LCP 2.0-2.5 s
  (home and work 2.48 s, was 2.6-2.8 s). The asset changes alone reached
  2.2-2.3 s; the dependency security update added about 10 kB of client
  JavaScript, which took back part of that gain.

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
