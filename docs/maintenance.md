# Maintenance guide

This guide covers the changes you'll make most often and the checks that
keep the site correct, accessible, and fast. It assumes you have Node 24 and
pnpm installed and have run `pnpm install`. For how the pieces fit together,
read the [architecture overview](architecture.md) first.

## Quality gates

CI runs these on every pull request, and a change merges only when all of
them pass. Run the same commands locally before you push:

| Command | What it checks |
| --- | --- |
| `pnpm check` | TypeScript, Biome, and unit and component tests (content rules, SEO helpers, CSP) |
| `pnpm build` | Typecheck, client and SSR builds, prerender; fails on invalid content |
| `pnpm check:dist` | Internal links, canonicals, hreflang, sitemap, `llms.txt` and `llms-full.txt` links, and the 150 kB gzipped JavaScript budget |
| `pnpm test:e2e` | Playwright on desktop and mobile: hydration and CSP errors, journeys, focus, 320px reflow, axe WCAG 2.2 AA |
| `pnpm audit --prod --audit-level high` | Known vulnerabilities in runtime dependencies |

Run `pnpm exec playwright install chromium` once before your first
`pnpm test:e2e`. [ADR-005](adr/005-layered-quality-gates.md) explains why
each gate exists.

## Change copy or facts

All visible text lives in `src/content/`. Each string is an object with an
`en` and a `pt-BR` value, and you must update both in the same change.

1. Find the string in `copy.ts` (interface and page copy), `profile.ts`
   (contact details and experience), `work.ts` (case studies), or
   `professional-work.ts` (products from past jobs).
2. Edit both languages. Write each one naturally rather than translating word
   by word.
3. Run `pnpm check`. The content tests reject em and en dashes and a
   different number of paragraphs or bullets between languages.
4. If you changed a page title or `<h1>`, update `e2e/pages.ts` and any e2e
   test that names it.

Every fact must come from a source you can point to: the resumes, LinkedIn,
the GitHub profile, a public repository, or a company's public site. When you re-check a case study,
update its `reviewed` date; it feeds the visible "Facts checked on" line,
`dateModified` in JSON-LD, and the sitemap `lastmod`.

## Update the brand

The brand masters live in `brand/` (see [`brand/README.md`](../brand/README.md)).
Change the master first, then copy it to its path under `public/` in the same
change: the favicon and icons at the root, the header logos in `public/brand/`.
When the logo or the fonts change, run `pnpm build:og-images`. Do not edit
`public/images/og/` by hand. The hero portrait's master is
`brand/social/source/portrait-1024.png`, composed from the photo
`brand/social/source/portrait-photo-2026.png` by `pnpm compose:portrait`
(backdrop and ring in the site tokens, face pixels untouched); after
replacing the photo or the master, run `pnpm export:portrait` to regenerate
`public/images/profile/`.

## Add a case study

1. Add an entry to `caseStudies` in `src/content/work.ts`. The `CaseStudy`
   schema in `src/content/schema.ts` lists the required fields. Use
   `disclosure: "public"` only for work you're allowed to publish, and
   `"anonymized"` for client work without names.
2. Add the project's screenshot to the `shots` list in
   `scripts/capture-work-images.mjs`, run `pnpm capture:work-images`, and set
   `image.widths`, `width`, and `height` from the script's output.
3. Run `pnpm build:og-images` to render its social cards.
4. Add both locale paths to `e2e/pages.ts`.
5. Update the count in the "other case studies" test in
   `e2e/navigation.spec.ts`, then run every quality gate. The page, its
   routes, sitemap entry, JSON-LD, `llms.txt` line, `llms-full.txt` text and
   "Other case studies" links come from the content entry automatically.

## Add an anonymized case study

Most professional work is confidential, so only describe it with the
owner's approval and at the level of detail he sets.

1. Add the entry to `caseStudies` in `src/content/work.ts` with
   `disclosure: "anonymized"`. Leave `links` empty, and use a year
   (`"2026"`) instead of a month if the dates are sensitive.
2. Leave out the company, clients, people, internal names, endpoints,
   metrics, code, and screenshots. Describe the architecture and your role
   in general terms.
3. Instead of a screenshot, draw an abstract diagram in
   `scripts/diagrams/<slug>.mmd`, run `pnpm render:diagrams <slug>` (no name
   re-renders every diagram), and set
   `fit: "contain"` on the image so it isn't cropped.
4. Add every sensitive name (company, group, internal project, email
   domain) to `scripts/denylist.json` as a SHA-256 hash. The command is in
   the file's `$comment`. Never commit the names themselves.
5. Run every quality gate. The content test and `check:dist` fail if a
   denied term reaches the content or the built site.

## Add a smaller project

Projects that don't need a case study go on `/projects`.

1. Add an entry to `src/content/projects.ts` in its group (`recent` or
   `earlier`), newest first. Link a `demo` only if it responds.
2. Use `kind` to say what the work was. Label hiring-process work
   "Technical challenge" and don't name the company.
3. If an old URL pointed to the project, add a redirect in `vercel.json`
   to `/projects#<slug>`. `pnpm check:dist` fails if the anchor doesn't
   exist.

## Add a product from a past job

The "Products I worked on" section of `/cases` lists public products built
as an employee or contractor. Use it only when the product and the
company's involvement are public.

1. Add the job to `experience` in `src/content/profile.ts` first. The card
   reads its role, period, and location from there, matched by `company`.
2. Add an entry to `src/content/professional-work.ts` in experience order.
   Paraphrase the product summary from the company's public site, take
   contributions from the resume, LinkedIn, or the owner, and list a stack
   only when a source confirms it. Leave out internal names, metrics,
   customers, and anything else under confidentiality terms.
3. Add the company page to `shots` in `scripts/capture-work-images.mjs`
   (set `hideCookieBanner` if a consent dialog appears) and run
   `pnpm capture:work-images <name>`. Skip the image when the site no
   longer shows the product you worked on.
4. Run every quality gate. About links the experience entry to the card,
   and the JSON-LD and `llms.txt` pick the entry up automatically.

## Contact form

Set `VITE_WEB3FORMS_ACCESS_KEY` in the Vercel project (Production and
Preview); see `.env.example`. A build without it hides the form and shows only
the email address. To rotate the key, create a new one at web3forms.com, update
the variable and redeploy. Locally, put it in `.env.local`.

## Add a page

1. Create the component in `src/pages/`. It receives `locale` as a prop.
2. Add a row to the `pages` table in `src/router.tsx` with its locale-neutral
   path, title, description, and optional structured data.
3. Add its copy to `src/content/copy.ts`, its link to the header or footer if
   needed, and both locale paths to `e2e/pages.ts`.
4. Run every quality gate.

## Change the design

Read the [design guide](../DESIGN.md) before you change the UI. Token values
live only in `src/index.css`; components use them through Tailwind utilities
such as `bg-background` and `text-brand`. Check every change at
320px wide, and with the keyboard. The e2e suite checks
contrast, focus outlines, and reflow, but it doesn't judge whether a layout
looks right.

## Update dependencies

Dependabot opens grouped pull requests every week. For each one:

1. Read the release notes of anything with a new minor version, especially
   React, TanStack Router, and Vite.
2. Let CI run every gate. Router upgrades have changed internal markup before.
   The 404 page drops every script (`withoutScripts`), and the not-found check
   uses public match data, so neither depends on that markup. The e2e suite
   catches hydration regressions.
3. If `pnpm audit` reports an advisory without a fix, record it in
   `SECURITY.md` with a reason and a review date.

## Record a decision

When you make a choice a future maintainer would otherwise question (a new
dependency, a change to rendering, hosting, or content storage), add an ADR
to `docs/adr/` and list it in `docs/adr/README.md`. ADRs aren't edited after
acceptance: supersede one with a new record instead.

## Release checklist

Before you point the domain at a new version or merge a large change:

1. Confirm all quality gates pass in CI.
2. Open the Vercel preview on a phone and a desktop, in both languages.
3. Check that `/cv`, `/cv-br`, and `/email` still go where you expect.
4. After the deploy, check Search Console for crawl errors, and compare
   real-user Core Web Vitals with the previous month.
5. Add an entry to `CHANGELOG.md`.

## Periodic review

| When | Do |
| --- | --- |
| Monthly | Run Lighthouse on `/`, `/cases`, and one case study; check Search Console and Core Web Vitals |
| Quarterly | Re-check case study facts against their repositories and update `reviewed`; refresh screenshots if the projects changed |
| When a role changes | Update `profile.ts`, both resumes, and LinkedIn together |
| Whenever `SECURITY.md` lists a finding | Re-check it on its review date |
