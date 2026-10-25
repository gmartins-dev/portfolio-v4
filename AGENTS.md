# Agent Instructions

## Package Manager
- Use **pnpm** with Node 24 (`.node-version`): `pnpm install --frozen-lockfile`

## Commands
| Task | Command |
|------|---------|
| Test one file | `pnpm exec vitest run src/path/to/file.test.ts` |
| Lint and format one file | `pnpm exec biome check --write src/path/to/file.tsx` |
| Typecheck | `pnpm typecheck` |
| All static checks | `pnpm check` |
| Build and check output | `pnpm build && pnpm check:dist` |
| Accessibility e2e only | `pnpm build && pnpm test:e2e:a11y` |
| One e2e spec | `pnpm build && pnpm exec playwright test e2e/navigation.spec.ts` |
| Full e2e (first run: `pnpm exec playwright install chromium`) | `pnpm test:e2e` |
| Recapture screenshots (hits live URLs; optional shot names) | `pnpm capture:work-images [name ...]` |
| Re-render social cards | `pnpm build:og-images` |
| Re-render diagrams (optional names) | `pnpm render:diagrams [name ...]` |

## External References
| Need | File |
|------|------|
| How the build and rendering work | `docs/architecture.md` |
| How to change content, add pages, update deps | `docs/maintenance.md` |
| Why things are built this way | `docs/adr/README.md` |
| Professional positioning for any copy | `docs/positioning.md` |
| UI tokens and rules | `DESIGN.md` |
| Security controls | `SECURITY.md` |
| Open work and launch blockers | `ROADMAP.md` |

## Key Conventions
- Every visible string lives in `src/content/` as `{ en, "pt-BR" }`; change both languages together.
- Never invent facts: profile and experience come from the resumes and LinkedIn, case studies from public repositories, product summaries from company sites.
- Never name confidential employers, clients or internal projects; anonymized work follows `docs/maintenance.md` and must pass the `scripts/denylist.json` check.
- Update a case study's `reviewed` date when you re-check its facts.
- No em or en dashes in visible text (enforced by `src/content/content.test.ts`).
- Token values live only in `src/index.css`; use Tailwind token utilities, never raw colors.
- New page: add it to the `pages` table in `src/router.tsx` and to `e2e/pages.ts`.
- Inline scripts must exist before `finalizeHtml()` runs, or the page CSP blocks them.
- Read router state through public match data, as in `src/not-found.ts`; do not use router-internal fields.
- Do not edit generated output in `dist/`, `public/images/og/`, or `public/images/work/` by hand; rerun the scripts above.
- Record new architectural decisions as an ADR in `docs/adr/`.

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: (the agent's name and attribution byline)
```
