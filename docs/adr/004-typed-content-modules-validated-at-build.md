# ADR-004: Typed content modules validated at build time, no CMS

- **Date**: 2026-10-11
- **Status**: Accepted
- **Tags**: content, i18n, performance

## Context and Problem Statement

The site has about ten pages in two languages, edited by one person. Every
fact must trace to a source (resumes, repositories) and every string must
exist in English and Portuguese. We need content that is easy to change,
hard to get wrong, and cheap for visitors.

## Decision Drivers

- Each visible string exists in both languages
- Broken content fails the build, not the visitor
- No extra service or editorial tool for a single author
- Keep validation code out of the client bundle

## Considered Options

- TypeScript modules in `src/content/`, typed by zod schemas, validated server-side at build
- Markdown/MDX files with frontmatter
- A headless CMS

## Decision Outcome

Chosen option: **typed TS modules validated at build**. Every string is a
`{ en, "pt-BR" }` pair. `validateContent()` parses all content against the
schemas from `entry-server.tsx` (prerender) and from the tests; the client
imports the plain typed objects, so zod never ships to browsers. The same
modules generate the pages, JSON-LD, `sitemap.xml`, `llms.txt` and the social
cards.

### Positive Consequences

- Missing translations and invalid fields fail `pnpm check` or `pnpm build`
- Tests enforce copy rules (no em dashes, EN/PT paragraph parity)
- Pages, metadata and machine-readable files cannot drift apart

### Negative Consequences

- Editing copy means editing TypeScript and opening a PR
- Long prose in TS strings is less pleasant than Markdown
- Both languages ship to every visitor (about 9 kB gzipped today)

## Pros and Cons of the Options

### Typed modules ✅ Chosen

- ✅ Compiler and schema checks, single source for every output
- ❌ Developer-oriented editing

### Markdown/MDX

- ✅ Nicer long-form writing
- ❌ Needs a loader pipeline; per-locale parity is harder to enforce

### Headless CMS

- ✅ Non-developer editing
- ❌ A service, credentials and a build hook for one author

## Links

- `src/content/`, `src/content/validate.ts`, `AGENTS.md`
- Revisit if a blog or long-form writing is added (ROADMAP "Deferred")
