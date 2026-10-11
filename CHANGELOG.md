# Changelog

Notable changes to gmartins.dev v4 that are done and verified. Planned work
is in the [roadmap](ROADMAP.md).

## Unreleased

### M1 Foundation, part 1: tooling and prerender ([#1](https://github.com/gmartins-dev/portfolio-v4/pull/1))

#### Added

- Build-time prerender: each route × locale is written to
  `dist/<path>/index.html` as a complete document, and the browser hydrates
  it. The dev server renders the same way. See
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
  `/about` to `dist/about/index.html`, as static hosts do.
- The dev server collapsed whitespace across the whole document, which could
  join inline words and cause dev-only hydration mismatches. It now only
  touches `<head>`, where Vite injects its scripts.

#### Verified

- `pnpm check` and `pnpm build` pass locally.
- Headless Chromium, on the production build and the dev server: no hydration
  errors, one title and one canonical per page, `lang` and head update when
  switching language, and content is readable with JavaScript disabled.

## 0.0.0 — 2026-10-11

- Project created with Vite, React 19, TypeScript, Tailwind CSS 4, shadcn/ui,
  TanStack Router, and Biome.
