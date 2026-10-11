# Roadmap

Planned work for gmartins.dev v4. This is a sequence, not a schedule: each
milestone starts after the previous one is reviewed. Finished work moves to
the [changelog](CHANGELOG.md).

## Status

| Milestone | Scope | Status |
| --- | --- | --- |
| Discovery (Phases 0–5) | Audit, positioning, work selection, information architecture, content, visual direction | Not started |
| M1 Foundation | Tooling, prerender pipeline, design tokens, page shell, theme, localization | Partly done: tooling and prerender ([#1](https://github.com/gmartins-dev/portfolio-v4/pull/1)) |
| M2 Core content | Home, About, experience, resume and contact links | Blocked on Discovery |
| M3 Engineering evidence | Work listing, case study template, two case studies | Blocked on Discovery |
| M4 Production readiness | SEO, structured data, accessibility, performance, redirects, security headers | Not started |
| M5 Launch | Preview, cross-browser tests, DNS switch, rollback plan | Not started |

## Discovery (before M2)

Content and design decisions that the remaining milestones depend on. None of
this is code.

- **Phase 0 — Audit.** Check the published LinkedIn (EN/PT-BR), resumes, and
  GitHub profile. Inventory every v3 route, redirect, and asset. Confirm
  whether Firebase or the Next.js redirects serve production today. Record a
  baseline for Lighthouse, axe, and broken links.
- **Phase 1 — Positioning.** Approve the Software Engineer positioning, hero
  copy, calls to action, and editorial rules in both languages.
- **Phase 2 — Work selection.** Pick the two launch case studies (candidates:
  sdd-agentic-flow, payments-api-node, Priorize.me) and settle what can be
  disclosed about professional work.
- **Phase 3 — Information architecture.** Sitemap, user journeys, wireframes.
- **Phase 4 — Content.** Write and review all EN/PT-BR copy, case studies,
  and metadata.
- **Phase 5 — Visual direction.** Compare at least two directions, then
  choose typography, color tokens, and component states. Document them in
  `DESIGN.md`.

## M1 — Foundation

Done:

- Scaffold cleanup: `src/` layout, Biome only, unused dependencies removed,
  Node and pnpm versions pinned.
- Build-time prerender of every route × locale with per-page head tags
  ([ADR-001](docs/adr/001-vite-react-with-build-time-prerender.md)).
- EN at `/`, PT-BR under `/pt-br`, with canonical and hreflang.
- Unit tests and CI running check and build.

Remaining (needs the Phase 5 visual direction):

- Design tokens and typography in `src/index.css`, replacing the shadcn
  defaults.
- Page shell: header, navigation, footer, skip link.
- Light, Dark, and System theme with a script that applies the theme before
  first paint.
- Language switcher in the shell, linking to the same page in the other
  language.
- `AGENTS.md` and `DESIGN.md`.

Done when: every page shares the shell, the theme and language controls work
by keyboard, and the build still prerenders without hydration errors.

## M2 — Core content

- Home: hero, selected work, capabilities, experience summary, contact.
- About: career history, engineering approach.
- Resume downloads (EN/PT-BR) and contact links.
- Content stored in typed modules validated with zod.

Done when: all copy is approved in both languages, contains no placeholders,
and each factual claim has a source.

## M3 — Engineering evidence

- Work listing and a reusable case study template (context, problem, role,
  constraints, decisions, trade-offs, outcomes, links, disclosure status).
- Two approved case studies, with diagrams where useful.

Done when: each case study has its own URL in both languages and exposes no
unauthorized information.

## M4 — Production readiness

- Generated `sitemap.xml` and `robots.txt`.
- JSON-LD (`Person`, `WebSite`) with factual data only.
- Open Graph images per page.
- `vercel.json` with legacy redirects (`/cv`, `/cv-br`, `/gh`, `/linkedin`,
  `/email`, `/links`, `/resume`, `/construction`) and security headers. The
  CSP must allow the inline router-state script (hash or nonce).
- Playwright smoke tests, axe checks, and a link/hreflang checker over
  `dist/`.
- Performance pass: image loading, per-route client JS size.
- Content-hash the client entry (today it is a fixed `/entry-client.js`) and
  have the root route read the hashed name from the build manifest, so cached
  bundles can never hydrate a newer deploy's HTML. Until then the host must
  serve `/entry-client.js` with revalidation, as Vercel does by default.

Done when: WCAG 2.2 AA checks pass, there are no broken links or indexing
errors, and the release blockers in the plan are clear.

## M5 — Launch

- Deploy a Vercel preview and run cross-browser and device smoke tests.
- Switch DNS, then verify redirects and indexing in Search Console.
- Document how to roll back to the previous deployment.
- Archive or label the v3 repository.

## Deferred

These need a demonstrated need before they are planned: blog or engineering
notes, RSS, site search, project filters, contact form with a backend, CMS,
analytics, dynamic GitHub stats.
