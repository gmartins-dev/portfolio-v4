# gmartins.dev v4

Source for [gmartins.dev](https://gmartins.dev), the personal site of
Guilherme Martins, Software Engineer. Work in progress: the current pages are
placeholders proving the build pipeline; real content comes later.

## Stack

Vite, React 19, TypeScript, TanStack Router, Tailwind CSS 4, shadcn/ui.
Every route is prerendered to static HTML in English (`/`) and Brazilian
Portuguese (`/pt-br`). See
[ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md) for how and why.

## Develop

Requires Node 24 (`.node-version`) and pnpm (version in `package.json`).

```sh
pnpm install
pnpm dev        # dev server, server-rendered like production
pnpm check      # typecheck, Biome, unit tests
pnpm build      # typecheck, client + SSR builds, prerender into dist/
```

`pnpm fix` applies Biome formatting and safe lint fixes.

## Layout

| Path | Purpose |
| --- | --- |
| `src/router.tsx` | Routes, document shell, list of prerendered paths |
| `src/content/` | Page copy per locale |
| `src/seo.ts` | Head tags: title, description, canonical, hreflang, Open Graph |
| `src/i18n.ts` | Locales and localized paths |
| `src/entry-server.tsx` / `src/entry-client.tsx` | Server render and client hydration |
| `scripts/prerender.mjs` | Writes `dist/<path>/index.html` for every route |
| `docs/adr/` | Architecture decisions |
