# Roadmap

Planned work for gmartins.dev v4. This is a sequence, not a schedule. Finished
work moves to the [changelog](CHANGELOG.md).

## Status

| Milestone | Scope | Status |
| --- | --- | --- |
| Discovery (Phases 0-5) | Audit, positioning, work selection, information architecture, content, visual direction | Drafted from sources; needs owner review (see below) |
| M1 Foundation | Tooling, prerender, design tokens, shell, theme, localization | Done |
| M2 Core content | Home, About, experience, resume and contact links | Built with draft copy |
| M3 Engineering evidence | Work listing, case study template, two case studies | Built with draft case studies |
| M4 Production readiness | SEO, structured data, accessibility, performance, redirects, security | Done (lab-verified) |
| M5 Launch | Preview, cross-browser tests, DNS switch, rollback | Not started |

## Before launch: owner review

The code is ready for content to be approved. These items are decisions or
checks only the site owner can make; each one is a launch blocker until done.

- **Copy approval (Phase 1 and 4).** All copy in `src/content/` is a draft
  written from the resumes, the GitHub profile README and the project
  repositories. Review both languages, especially the hero, the About intro
  and the contact line.
- **Job titles.** The site uses the titles from the PT-BR resume (Frontend
  Developer at Nisien.ai, Backbase and Loop; Full-Stack Developer at Vochlea).
  The EN resume says Software Engineer for all of them. Confirm which is
  accurate and align the resumes and LinkedIn.
- **ChatWith.io.** The planning notes mention a ChatWith.io role (Frontend
  Developer) that is not on either resume, so it is not on the site. Add it
  with dates if it should be.
- **LinkedIn check (Phase 0).** LinkedIn could not be read without signing
  in, so experience was not cross-checked against it.
- **Resume PDFs.** `/cv` and `/cv-br` still redirect to the Google Drive files
  from v3. Confirm they are the final versions.
- **Contact address.** The site and the `/email` short link use
  `contact@gmartins.dev` (from the resumes); v3 used
  `guilhermemm.dev@gmail.com`. Confirm the address is monitored.
- **Case studies (Phase 2).** sdd-agentic-flow and payments-api-node are
  published as case studies; payments-api-node is labelled a technical
  challenge. Priorize.me is private and not included. Confirm the selection
  and the facts on each page.
- **Visual direction (Phase 5).** One direction was implemented (DESIGN.md);
  the plan asked for two to compare. Decide whether to keep it, and whether to
  add a headshot.

## M5 — Launch

- Create the Vercel project from this repository and deploy a preview.
- Run the e2e suite against the preview and test on real iOS and Android
  devices and in Safari and Firefox.
- Confirm what serves gmartins.dev today (Firebase or Vercel for v3), then
  switch DNS.
- Verify redirects, the sitemap and indexing in Google Search Console; submit
  the sitemap.
- Rollback: promote the previous deployment in Vercel, or point DNS back to
  v3 while it still exists.
- Archive or label the v3 repository.
- After launch, measure real-user Core Web Vitals (target p75 LCP at or below
  2.5 s). Lab LCP on simulated slow 4G is 2.6-2.8 s on the home and work
  pages, so watch it.

## Deferred

These need a demonstrated need before they are planned: blog or engineering
notes, RSS, site search, project filters, contact form with a backend, CMS,
analytics, dynamic GitHub stats.
