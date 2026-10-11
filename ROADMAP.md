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
- **Job titles.** The site uses the titles from the PT-BR resume (Frontend
  Developer at Nisien.ai, Backbase and Loop; Full-Stack Developer at Vochlea).
  The EN resume says Software Engineer for all of them. Confirm which is
  accurate and align the resumes and LinkedIn.
- **ChatWith.io.** The planning notes mention a ChatWith.io role (Frontend
  Developer) that is not on either resume, so it is not on the site. Add it
  with dates if it should be.
- **LinkedIn check (Phase 0).** LinkedIn could not be read without signing
  in, so experience was not cross-checked against it.
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
  2.5 s). Lab LCP on simulated slow 4G is 2.0-2.5 s after the audit, with
  home and work right at 2.48 s, so watch them. If field data misses the
  target, the next levers are dropping tailwind-merge from the client
  (8.5 kB) and splitting page code by route.
- Follow the periodic review in `docs/maintenance.md`.

## Deferred

These need a demonstrated need before they are planned: blog or engineering
notes, RSS, site search, project filters, contact form with a backend, CMS,
analytics, dynamic GitHub stats.
