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
| `pnpm check` | TypeScript, Biome, and unit and component tests (content rules, SEO helpers, CSP, theme) |
| `pnpm build` | Typecheck, client and SSR builds, prerender; fails on invalid content |
| `pnpm check:dist` | Internal links, canonicals, hreflang, sitemap, `llms.txt` links, and the 150 kB gzipped JavaScript budget |
| `pnpm test:e2e` | Playwright on desktop and mobile: hydration and CSP errors, journeys, focus, 320px reflow, axe WCAG 2.2 AA in both themes |
| `pnpm audit --prod --audit-level high` | Known vulnerabilities in runtime dependencies |

Run `pnpm exec playwright install chromium` once before your first
`pnpm test:e2e`. [ADR-005](adr/005-layered-quality-gates.md) explains why
each gate exists.

## Change copy or facts

All visible text lives in `src/content/`. Each string is an object with an
`en` and a `pt-BR` value, and you must update both in the same change.

1. Find the string in `copy.ts` (interface and page copy), `profile.ts`
   (contact details and experience), or `work.ts` (case studies).
2. Edit both languages. Write each one naturally rather than translating word
   by word.
3. Run `pnpm check`. The content tests reject em and en dashes and a
   different number of paragraphs or bullets between languages.
4. If you changed a page title or `<h1>`, update `e2e/pages.ts` and any e2e
   test that names it.

Every fact must come from a source you can point to: the resumes, the
GitHub profile, or a public repository. When you re-check a case study,
update its `reviewed` date; it feeds the visible "Facts checked on" line,
`dateModified` in JSON-LD, and the sitemap `lastmod`.

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
5. Run every quality gate. The page, its routes, sitemap entry, JSON-LD, and
   `llms.txt` line come from the content entry automatically.

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
such as `bg-background` and `text-brand`. Check every change in light and
dark themes, at 320px wide, and with the keyboard. The e2e suite checks
contrast, focus outlines, and reflow, but it doesn't judge whether a layout
looks right.

## Update dependencies

Dependabot opens grouped pull requests every week. For each one:

1. Read the release notes of anything with a new minor version, especially
   React, TanStack Router, and Vite.
2. Let CI run every gate. Router upgrades have changed internal markup before;
   the 404 script allowlist and the not-found check were built to survive
   that, and the e2e suite catches hydration regressions.
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
2. Open the Vercel preview on a phone and a desktop, in both languages and
   both themes.
3. Check that `/cv`, `/cv-br`, and `/email` still go where you expect.
4. After the deploy, check Search Console for crawl errors, and compare
   real-user Core Web Vitals with the previous month.
5. Add an entry to `CHANGELOG.md`.

## Periodic review

| When | Do |
| --- | --- |
| Monthly | Run Lighthouse on `/`, `/work`, and one case study; check Search Console and Core Web Vitals |
| Quarterly | Re-check case study facts against their repositories and update `reviewed`; refresh screenshots if the projects changed |
| When a role changes | Update `profile.ts`, both resumes, and LinkedIn together |
| By 2027-01-11 | Re-evaluate the accepted dev-only advisory in `SECURITY.md` |
