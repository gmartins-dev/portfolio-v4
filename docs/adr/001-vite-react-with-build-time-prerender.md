# ADR-001: Vite + React + TanStack Router, prerendered at build time

- **Date**: 2026-10-11
- **Status**: Accepted
- **Tags**: architecture, rendering, SEO

## Context

gmartins.dev v4 is a small bilingual content site (Home, Work, case studies,
About) whose main audiences arrive from search, LinkedIn, and shared links.
Every page must ship complete HTML with its own title, description, canonical,
`hreflang` alternates, and Open Graph tags, and must be readable without
JavaScript.

The repository was already scaffolded with Vite, React 19, Tailwind 4, shadcn,
and TanStack Router, the same stack as priorize.me. Astro was the other
serious candidate: it is built for content sites and ships no JavaScript by
default.

## Decision

Keep Vite + React + TanStack Router and prerender every route × locale to
static HTML at build time, using TanStack Router's own SSR primitives:

- The root route renders the whole document (`<html>`, `<head>` with
  `HeadContent`, `<body>` with `Scripts`). Pages declare head tags through
  each route's `head()`, built by `src/seo.ts`.
- `src/entry-server.tsx` renders a URL with `createRequestHandler` +
  `renderRouterToString`, which also dehydrates router state into the page.
- `src/entry-client.tsx` hydrates `document` with `RouterClient`.
- `scripts/prerender.mjs` runs the SSR bundle for every path in
  `prerenderPaths` and writes `dist/<path>/index.html`. The SSR bundle is
  deleted afterwards; only static files deploy.
- The dev server renders HTML through the same entry (a small middleware in
  `vite.config.ts`), so dev and production markup match.

Locales: English at `/`, Brazilian Portuguese under `/pt-br`.

## Alternatives considered

- **Astro.** A good fit for a content site starting from nothing. Rejected
  because the scaffold exists, the stack is shared with priorize.me (tooling,
  scripts, test setup, design-system conventions, Vercel deployment), and
  prerendering covers the reason Astro was attractive: full HTML for SEO,
  social previews, and no-JS reading.
- **Client-only SPA.** Rejected: crawlers and link unfurlers would see an
  empty shell and one shared `<head>`.
- **Prerender the app into a static `index.html` template.** Tried first.
  React 19 hoists title/meta/link to the front of a partial render, and
  without TanStack's dehydrated state the client wraps matches in `Suspense`
  while the server does not, which breaks hydration. Rendering the full
  document through the official SSR path avoids both.
- **TanStack Start static prerendering** or **vite-react-ssg.** Viable, but
  each adds a framework layer for something about 50 lines of code already
  cover. Revisit if the site grows server needs.

## Consequences

- Every page is static HTML with correct head tags; hosting needs no server.
- React hydrates whole pages, so client JavaScript size needs active
  attention (track it per route; avoid heavy client-only libraries).
- The pages include a small inline script with the dehydrated router state.
  The Content-Security-Policy must allow it (hash or nonce) when headers are
  configured in M4.
- New pages must be added to `pagePaths` in `src/router.tsx` so they are both
  routed and prerendered.
