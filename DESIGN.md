# Design guide

How the gmartins.dev interface is put together, for anyone (person or agent)
changing UI. Token values live only in [`src/index.css`](src/index.css); this
file explains how to use them.

## Direction

A developer portfolio read by engineering managers, tech leads, and
recruiters. Editorial and technical: typography, spacing, and real project
images carry the page. No gradients, glows, badges walls, or decorative
motion.

This direction is the working choice for v4. It has not yet been compared
against an alternative (Phase 5 of the plan), so expect adjustments.

## Principles

- **Content first.** Hierarchy comes from size, weight, and spacing before
  color.
- **One accent.** `--brand` (burnt orange) marks links to the next step
  inside the site, focus, list markers, and the primary call to action.
  Nothing else gets a color.
- **Links say where they go.** Links within the site use `text-brand` with a
  right arrow (`ArrowRight`). Links that leave the site (products, source,
  resume PDFs, client sites) use the foreground color, turn brand on hover,
  and end with `ArrowUpRight`. Name the file type when a link opens a file
  ("Resume in English (PDF)").
- **Both themes are designed.** Light and dark use the same token names; check
  every change in both.
- **Readable without effects.** No information depends on hover, animation, or
  color alone.
- **Plain copy.** No em dashes in visible text; one label per intent (for
  example, "Email me" is the only contact call to action).

## Tokens

| Token | Use |
| --- | --- |
| `background`, `foreground` | Page surface and body text |
| `muted`, `muted-foreground` | Quiet surfaces and secondary text (dates, captions) |
| `card` | Raised surfaces such as case study images |
| `border` | Hairlines between groups, never around every row |
| `brand`, `brand-foreground` | The single accent: links, focus ring, primary button |
| `primary`, `primary-foreground` | Neutral high-contrast buttons |

Use them through Tailwind utilities (`bg-background`, `text-muted-foreground`,
`text-brand`). Do not write raw color values in components. Two places must
mirror token values by hand and change with them: the `theme-color` meta tags
in `src/router.tsx` (the `--background` values as hex) and the social card
colors in `scripts/build-og-images.mjs`.

## Typography

- **Geist Variable** for everything, **Geist Mono Variable** for technical
  metadata only (dates, stacks, file names). Both are self-hosted through
  Fontsource.
- Headlines use weight and tight tracking, not huge sizes. Body text is
  capped at about 65 characters per line (`max-w-prose`).
- No eyebrow labels above headings; the heading carries its own weight. Put
  context in the sentence that follows it.
- Metadata lines (kind, period, location) use `MetaLine` from
  `src/components/work.tsx`: parts separated by a middle dot, each part kept
  on one line so a date range never wraps.
- Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`
  (global in `src/index.css`), so lines don't end on a single word.
- Mark proper names and code with `translate="no"` (site name, project
  titles, stacks, code blocks) so automatic translation leaves them intact.

## Shape and layout

- One radius scale: `rounded-lg` for images and buttons. No pills.
- Buttons and button-styled links use `buttonVariants()` from
  `src/components/ui/button.tsx` (variants `brand`, `outline`, `default`). It
  merges classes with tailwind-merge, so a `className` override wins.
- Content width `max-w-5xl`, page gutter `px-4` (mobile) to `px-6`.
- Group related items with spacing and a single top border, not cards.
- No colored side borders on callouts or list items. A note that needs to
  stand apart uses `bg-muted` with `rounded-lg`; lists use brand markers
  (`list-disc marker:text-brand`).
- Screenshots are captured at 1440x900 and shown in 16:10 frames
  (`aspect-[16/10]`, `object-top`), so teasers crop only the bottom.
- Diagrams (`fit: "contain"`) are drawn on white from Mermaid sources in
  `scripts/diagrams/`: the anonymized case study, and sdd-agentic-flow's
  README workflow, which reads better than a README screenshot. `WorkImage`
  inverts them in dark mode and blends the background into the card, so
  check a new diagram in both themes. Shape it close to 16:10 (rows of
  `direction LR` subgraphs) so it stays legible in a teaser.
- Multi-column layouts collapse to one column below `md`. When a sidebar
  holds the quick facts (case study facts and links), put it first in the
  DOM and move it right with `md:order-last`, so phones see it before the
  prose.

## Phones

- The header is two rows below `sm`: the name, then nav with the language
  and theme controls. DOM order matches visual order at every width. The
  language link shows "PT"/"EN" (its accessible name stays the full
  sentence), and below the `xs` breakpoint (25rem, `src/index.css`) the
  theme control is one button that steps through Light, Dark and System.
  e2e checks the two rows at 320, 360 and 390px in both languages.
- Vertical rhythm steps down below `md`: page tops `pt-12` (`pt-8` on case
  studies), sections `mt-20` instead of `mt-24`/`mt-28`, and teaser lists
  `gap-14` instead of `gap-20`.

## Motion

Minimal: color and underline transitions on interactive elements, nothing
that moves on its own. `prefers-reduced-motion` disables transitions globally
(`src/index.css`).

## Accessibility

- WCAG 2.2 AA in both themes; axe runs in the end-to-end suite.
- One focus style everywhere: the global 2px offset outline in `--ring`.
  Don't replace it with translucent rings; the e2e suite checks every focus
  stop for an outline.
- Interactive targets are at least 24px tall (`min-h-6` on standalone links).
- Layouts reflow at 320px without horizontal scrolling. Grid columns that
  hold wide content use `minmax(0, 1fr)` (`grid-cols-1`), not the default
  auto minimum.
- Skip link to `#main`, one `h1` per page, landmarks for header, nav, main,
  and footer. After client-side navigation, focus moves to the new `h1`.
- Images have descriptive `alt`, explicit `width` and `height`.
- When a control shows short text (the "PT"/"EN" language link on phones),
  its accessible name must contain that text, so voice control works
  (WCAG 2.5.3). e2e runs axe's `label-content-name-mismatch` rule for this.
- State that relies on a background (the selected theme button) also needs
  a `forced-colors:` border, because forced colors mode removes backgrounds.

## Print

Recruiters save case studies as PDF, so pages print readably. Print always
uses the light tokens (the `.dark` block and the `dark:` variant sit inside
`@media not print` in `src/index.css`). Controls that do nothing on paper
take `print:hidden` (navigation, theme, the back link, the email button;
the address stays), code blocks wrap, and external links in `main` print
their URL. e2e checks a case study printed from both themes.
