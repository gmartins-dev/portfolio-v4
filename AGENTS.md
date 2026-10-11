# gmartins.dev agent instructions

Personal site of Guilherme Martins. Static, bilingual (EN at `/`, PT-BR under
`/pt-br`), prerendered with Vite, React and TanStack Router
([ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md)).

## Working rules

- Use pnpm and Node 24 (`.node-version`). Install with
  `pnpm install --frozen-lockfile`.
- Keep changes scoped; no new runtime dependency without a reason the user
  can see in the PR.
- Every visible string lives in `src/content/` with both `en` and `pt-BR`.
  Never invent facts: profile and experience come from the resumes, case
  studies from the public repositories. Update the `reviewed` date when you
  re-check a case study.
- No em or en dashes in visible text (a content test enforces it).
- Read [DESIGN.md](DESIGN.md) before UI work; token values live only in
  `src/index.css`.
- A new page goes in the `pages` table in `src/router.tsx` (it is then routed,
  prerendered and listed in the sitemap) and in `e2e/pages.ts`.

## Checks

| Change | Command |
| --- | --- |
| Any code | `pnpm check` (typecheck, Biome, unit tests) |
| Routes, head tags, content, build | `pnpm build && pnpm check:dist` |
| UI, navigation, accessibility | `pnpm build && pnpm test:e2e` (needs `pnpm exec playwright install chromium` once) |
| Case study screenshots | `pnpm capture:work-images` (hits the live project URLs) |
| Social cards after copy changes | `pnpm build:og-images` |

## Map

| Path | Purpose |
| --- | --- |
| `src/router.tsx` | Document shell, page table, routes per locale |
| `src/pages/`, `src/components/` | Page and shared components |
| `src/content/` | Typed bilingual content; `validate.ts` parses it at build time |
| `src/seo.ts`, `src/csp.ts` | Head tags, JSON-LD, sitemap; per-page CSP hashes |
| `src/entry-server.tsx`, `src/entry-client.tsx` | Server render and hydration |
| `scripts/prerender.mjs` | Writes `dist/<path>.html`, `404.html`, `sitemap.xml` |
| `vercel.json` | Hosting, legacy redirects, security headers |
| `e2e/` | Playwright smoke, journeys and axe checks |
