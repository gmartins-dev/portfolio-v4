# gmartins.dev v4

Source for [gmartins.dev](https://gmartins.dev), the personal site of
Guilherme Martins, Software Engineer: home, selected work with two case
studies, and about, in English (`/`) and Brazilian Portuguese (`/pt-br`).

## Stack

Vite, React 19, TypeScript, TanStack Router, Tailwind CSS 4 and shadcn/ui
primitives. Every page is prerendered to static HTML at build time and
hydrated in the browser; there is no server at runtime. See
[ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md) for how and
why, and [DESIGN.md](DESIGN.md) for the visual system.

## Develop

Requires Node 24 (`.node-version`) and pnpm (version in `package.json`).

```sh
pnpm install
pnpm dev          # dev server, server-rendered like production
pnpm check        # typecheck, Biome, unit tests
pnpm build        # typecheck, client + SSR builds, prerender into dist/
pnpm check:dist   # links, canonicals, hreflang and sitemap in dist/
pnpm test:e2e     # Playwright + axe against dist/ (run pnpm build first)
pnpm preview      # serve dist/ locally
```

`pnpm fix` applies Biome formatting and safe lint fixes. Agent and contributor
rules are in [AGENTS.md](AGENTS.md).

## Content

Everything visible is in `src/content/`, typed and validated with zod at
build time:

- `profile.ts`: contact details and experience (source: the resumes)
- `work.ts`: case studies and short entries (source: the public repositories)
- `copy.ts`: page and interface copy

Images of projects are real screenshots (`pnpm capture:work-images`); social
cards are rendered from the content (`pnpm build:og-images`). Both are
committed so builds need no browser.

## Deploy

Vercel, configured in [`vercel.json`](vercel.json): static output in `dist/`,
clean URLs, the v3 short links (`/cv`, `/cv-br`, `/gh`, `/linkedin`, `/email`,
`/links`) and security headers. Each page also carries a
Content-Security-Policy that allows its inline scripts by hash. Roll back by
promoting the previous deployment in Vercel.
