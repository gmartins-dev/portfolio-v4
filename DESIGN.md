# Design guide

How the gmartins.dev interface is put together, for anyone (person or agent)
changing UI. Token values live only in [`src/index.css`](src/index.css); this
file explains how to use them.

## Direction

A developer portfolio read by engineering managers, tech leads, and
recruiters. Editorial and technical: typography, spacing, and real project
images carry the page. No gradients, glows, badges walls, or decorative
motion, with one documented exception: the hero identity map's loop (see
Motion).

This direction is the working choice for v4. It has not yet been compared
against an alternative (Phase 5 of the plan), so expect adjustments.

## Principles

- **Content first.** Hierarchy comes from size, weight, and spacing before
  color.
- **One accent.** `--brand` (glacial cyan) marks links to the next step
  inside the site, focus, list markers, and the primary call to action.
  Nothing else gets a color, except the hero identity map (see Hero
  identity map).
- **Links say where they go.** Links within the site use `text-brand` with a
  right arrow (`ArrowRight`). Links that leave the site (products, source,
  resume PDFs, client sites) use the foreground color, turn brand on hover,
  and end with `ArrowUpRight`. Name the file type when a link opens a file
  ("Resume in English (PDF)").
- **Dark only.** The site has one theme, Polar Navy, and no theme control. Print
  is the one exception (see Print).
- **Readable without effects.** No information depends on hover, animation, or
  color alone.
- **Plain copy.** No em dashes in visible text; one label per intent (for
  example, "Email me" is the only contact call to action; it opens /contact).

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
`text-brand`). Do not write raw color values in components. These places
mirror token values by hand and change with them: the `theme-color` meta tag
in `src/router.tsx` (the `--background` value as hex), the logo and icon files
in `public/` (copies of the masters in `brand/`, see `brand/README.md`), and
the social card colors in `scripts/build-og-images.mjs`. The Mermaid theme
variables in `scripts/diagrams/` (and the copy in `docs/architecture.md`) use
the light brand cyan.

## Typography

- **Geist Variable** for everything, **Geist Mono Variable** for technical
  metadata only (dates, stacks, file names). Both are self-hosted through
  Fontsource.
- Headlines use weight and tight tracking, not huge sizes. Body text is
  capped at about 65 characters per line (`max-w-prose`, set to 36rem in
  `src/index.css`: Geist's wide "0" made the default 65ch run to 90).
- The lead paragraph under a page's `h1` is `text-lg text-muted-foreground`
  on every page; body prose (About, case study sections) uses the
  foreground color.
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
  `src/components/ui/button.tsx` (variants `brand` and `outline`, one size).
  Classes are joined, not merged, so `className` is for layout only (margins,
  `print:hidden`); change padding or colors in the variant itself.
- Content width `max-w-5xl`, page gutter `px-4` (mobile) to `px-6`.
- Group related items with spacing and a single top border, not cards.
  Two exceptions: the hero identity map, and the home "Where I have worked"
  band (`bg-muted rounded-lg`), which breaks up the long home page.
- No colored side borders on callouts or list items. A note that needs to
  stand apart uses `bg-muted` with `rounded-lg`; lists use brand markers
  (`list-disc marker:text-brand`).
- Screenshots are captured at 1440x900 and shown in 16:10 frames
  (`aspect-[16/10]`, `object-top`), so teasers crop only the bottom.
- Diagrams (`fit: "contain"`) are drawn on white from Mermaid sources in
  `scripts/diagrams/`: the anonymized case study, and sdd-agentic-flow's
  README workflow, which reads better than a README screenshot. `WorkImage`
  inverts them and blends the background into the card, so check a new
  diagram on the dark page. Shape it close to 16:10 (rows of
  `direction LR` subgraphs) so it stays legible in a teaser. Teaser sources
  (`*-teaser.mmd`) use 24px text, slate node borders and unfilled groups,
  since they show at about 480 css px; avoid group titles there, which
  overlap the nodes at that size (name the group on the edge instead).
- Multi-column layouts collapse to one column below `md`. When a sidebar
  holds the quick facts (case study facts and links), put it first in the
  DOM and move it right with `md:order-last`, so phones see it before the
  prose.

### Hero identity map

The home hero's right column (`src/components/identity-map.tsx`) shows the
identity map from `docs/positioning.md`: the circular portrait (the one place
for `rounded-full`; the ring is baked into the image), name, role and
location, then six cards on an arc with a quiet principles line below.

- **Why cards here.** It is the one exception to "group with spacing, not
  cards": the six dimensions are separate, parallel items that the
  connectors point at, so each needs a visible edge. Cards are
  `rounded-lg border bg-card`, static, with no links.
- **One card style.** Below `lg` and under reduced motion all six cards
  use `border-brand` on `bg-card`, and all connectors use `text-brand/40`:
  the order carries the hierarchy, not the styling. Where the loop runs
  (see Motion), cards start at rest (`border-border`, connectors at 20%,
  through `lg:motion-safe:`, so the prerendered page never flashes six
  highlighted cards) and only the active one gets `border-brand` on
  `bg-muted`. The
  cards, dots, connectors and role line are this component's only uses of
  the accent outside links; keep it that way.
- **Geometry.** Card offsets, card height, photo position and the SVG are
  derived from one `geometry` constant. Change the numbers there, keep
  `offsetClasses` in sync (a unit test checks it), and let
  `e2e/home.spec.ts` confirm the dots stay on the card centers, no text
  is clipped and no connector crosses the name and location under the
  photo. Connector angles are scaled so the steepest leaves the photo at
  `connectorMaxAngle` (35 degrees); pointing straight at the outer dots,
  the bottom ones would cross that caption. Card lines keep hyphenated
  words whole and bind each middle dot to the word before it. The decorative SVG is `aria-hidden` and `print:hidden`.
- **Below `lg`.** The map moves under the buttons (`mt-12`) without the SVG
  or the arc offsets: a portrait row at 96px, then the cards in one column,
  two from `sm`, then the principles left aligned.

## Phones

- The header is two rows below `sm`: the name with the language link on
  its right, then the nav. The header renders the language link twice,
  one copy per breakpoint (`sm:hidden` / `hidden sm:inline-flex`), so DOM
  order matches visual order at every width. Nav items never break inside
  a label; at 320px in pt-BR the list wraps between items. e2e checks the
  rows at 320, 360 and 390px in both languages.
- The language link shows an icon and the language it switches to ("PT"
  on the English site). Its accessible name starts with that code, then
  the full sentence ("PT Português, ler em português").
- The nav marks the current page with `aria-current="page"` and an
  underline. A case study also underlines Cases (`data-section`), without
  `aria-current`.
- Vertical rhythm steps down below `md`: page tops `pt-12` (`pt-8` on case
  studies), sections `mt-20` instead of `mt-24`/`mt-28`, and teaser lists
  `gap-14` instead of `gap-20`.

## Motion

Interactive elements keep short color and underline transitions.
`prefers-reduced-motion` disables transitions globally (`src/index.css`).

The hero identity map is the one thing that moves on its own: a decorative
loop that walks the six dimensions in order, one step every 3.2s. In each
step the active card gets, in sequence: a short pulse from the portrait to
its dot (0 to 500ms); focus, with `bg-muted`, a 6px shift left and its
connector at 90% while the others drop to 20% (from 420ms); a ping on the
dot; light tracing the card border from where the connector meets it
(500 to 1400ms); a ring spreading from the card (from 1150ms); a pulse back
to the portrait (1450 to 1950ms); and a ring spreading from the portrait
(from 1900ms). Hovering a card replays it and holds the loop until the
pointer leaves.

- The timings live in `motion` (`src/components/identity-map.tsx`), and the
  keyframes in `src/index.css` repeat them; change both together.
- Desktop only (`lg`), off under `prefers-reduced-motion`, and paused in a
  hidden tab or while the map is off screen
  (`src/components/use-identity-map-cycle.ts`).
- The server render and the first client render are the static map; the
  loop starts after hydration. Animated elements are `aria-hidden` and
  remount each step (keyed by it) so their animations replay. Nothing in
  the loop carries information, and it adds no live regions.

## Accessibility

- WCAG 2.2 AA on the dark theme; axe runs in the end-to-end suite.
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
- State that relies on a background also needs a `forced-colors:` border,
  because forced colors mode removes backgrounds.

## Print

Recruiters save case studies as PDF, so pages print readably. Print uses
light tokens (the `@media print` block in `src/index.css`) because printers
drop backgrounds, and `WorkImage` drops its dark filters. Controls that do
nothing on paper take `print:hidden` (navigation, the back link, the email
button; the address stays), code blocks wrap, and external links in `main`
print their URL. e2e checks a printed case study.
