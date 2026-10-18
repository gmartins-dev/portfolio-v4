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
| M4 Production readiness | SEO, structured data, accessibility, performance, redirects, security | Done, then audited and hardened (see CHANGELOG) |
| M5 Launch | Preview, cross-browser tests, DNS switch, rollback | Not started |

## Before launch: owner review

The code is ready for content to be approved. These items are decisions or
checks only the site owner can make; each one is a launch blocker until done.

- **Copy approval (Phase 1 and 4).** All copy in `src/content/` is a draft
  written from the resumes, the GitHub profile README and the project
  repositories. Review both languages, especially the hero, the About intro
  and the contact line.
- ~~**Job titles.**~~ Decided (2026-10-11): the site follows LinkedIn,
  Software Engineer at Nisien.ai, Backbase, Vochlea and Loop, and Frontend
  Developer at ChatWith.io. Update the PT-BR resume, which still has the
  older titles.
- ~~**ChatWith.io.**~~ Added (2026-10-11) from the LinkedIn experience page
  the owner shared: Frontend Developer, October 2022 to March 2023. The
  freelance entry now ends in October 2022, as on LinkedIn.
- ~~**LinkedIn check (Phase 0).**~~ Done (2026-10-11) with the transcript
  the owner shared. Titles still differ; see "Job titles".
- **Products I worked on.** The `/work` section names Nisien.ai, Backbase,
  Vochlea, Loop and ChatWith.io, with screenshots of their public sites
  (ChatWith.io from its February 2023 Internet Archive copy). The Backbase
  stack (Angular, TypeScript) comes from Backbase's frontend job posts;
  confirm it, and add the Nisien.ai stack, which no public source names.
  Recapture with `pnpm capture:work-images <name>` when the sites change.
- ~~**Resume PDFs.**~~ Confirmed by the owner (2026-10-11): the site links
  `/cv` (English) and `/cv-br` (Portuguese), which redirect to the current
  PDFs. Update the Drive files in place, or the targets in `vercel.json`.
- **Contact address.** The site uses `contact@gmartins.dev` (from the
  resumes); v3 used `guilhermemm.dev@gmail.com`. Confirm the address is
  monitored. The `/email` short link now opens the contact section: Vercel
  cannot redirect to `mailto:`, and the v3 link is broken for that reason.
- **Case studies (Phase 2).** Decided by the owner (2026-10-11): Priorize.me
  joins sdd-agentic-flow and payments-api-node as a case study (live app
  linked, code private), and the Débora Blaso websites appear as client work.
  Still to confirm: the facts on each page.
- **Anonymized case study.** Confirm the company allows the anonymized
  description of the AI-first online banking platform (and naming Uber)
  before launch. Keep `scripts/denylist.json` up to date.
- **guitar-ai.** Requested for `/projects`, but
  `github.com/gmartins-dev/guitar-ai` is private or doesn't exist, so it
  isn't listed. Make it public (or share its URL) to add it.
- **Visual direction (Phase 5).** One direction was implemented (DESIGN.md);
  the plan asked for two to compare. Decide whether to keep it, and whether to
  add a headshot.

## M5 — Launch

Checked 2026-10-11: gmartins.dev serves v3 from Vercel (not Firebase), and
v3's `/resume` publicly shows a third-party career history (Dallas,
paramedic, firefighter). v4 redirects `/resume` to `/about`, so launching v4
fixes it; until then it stays public.

- Create the Vercel project from this repository and deploy a preview.
- Run the e2e suite against the preview and test on real iOS and Android
  devices and in Safari and Firefox.
- Move the gmartins.dev domain from the v3 Vercel project to the v4 one.
- Verify redirects, the sitemap and indexing in Google Search Console; submit
  the sitemap.
- Rollback: promote the previous v4 deployment in Vercel, or move the domain
  back to the v3 project while it still exists.
- Archive or label the v3 repository.
- After launch, measure real-user Core Web Vitals (target p75 LCP at or below
  2.5 s). Lab LCP on simulated slow 4G is 2.0-2.5 s (2026-10-17), with
  home and work right at 2.48 s, so watch them. If field data misses the
  target, the next levers are AVIF images and splitting page code by route.
- Follow the periodic review in `docs/maintenance.md`.

## Deferred

These need a demonstrated need before they are planned: blog or engineering
notes, RSS, site search, project filters, contact form with a backend, CMS,
analytics, dynamic GitHub stats.
