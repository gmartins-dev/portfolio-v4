# Design guide

How the gmartins.dev interface is put together, for anyone (person or agent)
changing UI. Token values live only in [`src/index.css`](src/index.css); this
file explains how to use them.

## Direction

A developer portfolio read by engineering managers, tech leads, and
recruiters. Editorial and technical: typography, spacing, and real project
images carry the page. No gradients, glows, badges walls, or decorative
motion, with one documented exception: the home hero's opening, its
entrance and then the identity map's activation sequence (see Motion).

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
  capped at about 65 characters per line (`max-w-measure`, 36rem in
  `src/index.css`; not `max-w-prose`, whose 65ch runs to 90 with Geist's
  wide "0").
- The lead paragraph under a page's `h1` is `text-lg text-muted-foreground`
  on every page (the home hero steps up at `lg` with `text-hero-title` and
  `text-hero-intro`, see Hero identity map, Balance); body prose (About, case study sections) uses the
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
- One content column for header, main and footer: `pageShell`
  (`src/components/page-shell.ts`), `max-w-6xl` (72rem: 1104px of content
  from 1152px up) with a `px-4` gutter on phones and `px-6` from `sm`.
  Within it, reading text stays at `max-w-measure`; images, grids and the
  hero use the full column. Change the width there, never per page, and
  update the image `sizes` in `src/components/work.tsx` and
  `src/pages/case-study.tsx`, which are computed from it.
- Grids gain columns only when each column has room for its text: three
  short text items go three across from `lg`, not `md`.
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
identity map from `docs/positioning.md`: the circular portrait at 232px (the
one place for `rounded-full`; the ring, in `--brand`, is baked into the image), with no
caption (the intro names him), then six cards on an arc in a 552px column,
with a quiet principles line below. A 16px gap separates it from the text
column, close enough that the hero reads as one composition.

- **Why cards here.** It is the one exception to "group with spacing, not
  cards": the six dimensions are separate, parallel items that the
  connectors point at, so each needs a visible edge. Cards are
  `rounded-lg border bg-card`, static, with no links.
- **One card style.** Below `lg`, under reduced motion and without
  JavaScript, all six cards use `border-brand` on `bg-card`, and all
  connectors use `text-brand/40`: the order carries the hierarchy, not the
  styling. Where the activation sequence runs (see Motion), cards start at
  rest (`border-border`, connectors at 20%, through `lg:motion-safe:`, so
  the prerendered page never flashes six highlighted cards) and each turns
  active (`border-brand` on `bg-muted`, 6px left, connector at 90%, dot in
  the foreground color) and stays active. The cards, dots and connectors
  are this component's only uses of the accent outside links; keep it that
  way.
- **Geometry.** Card offsets, card height (90px), gaps (10px), photo
  position and the SVG are derived from one `geometry` constant. Change the
  numbers there, keep `offsetClasses`, `photoTopClass` and the card
  `lg:h-[90px]`, the column width in `home.tsx` and the portrait size in
  sync (unit tests check the first two; no inline styles,
  the page CSP drops them), and let `e2e/home.spec.ts` confirm the dots
  stay on the card centers and no text is clipped. Connector angles are
  scaled so the steepest leaves the photo at `connectorMaxAngle` (35
  degrees), so every connector starts on the portrait's right side. The
  card offsets follow one circle (the dashed arc, radius 750; a unit test
  keeps every dot within 1px of it), 41px deeper
  in the middle than at the ends, with about 64px between the portrait and
  the middle cards: the cards wrap around the portrait. Keep that curve and
  that clearance when resizing the portrait or the column; flattening the
  arc to make room for a bigger portrait reads as a straight list. Card
  lines keep hyphenated words whole and bind each middle dot to the word
  before it; the principles keep each item on one line. The decorative SVG
  is `aria-hidden` and `print:hidden`. At `lg` card titles are 15/22px and
  lines 13/17px with `py-1.5`, sized so the longest title holds one line
  and the longest pt-BR line (up to three lines) fits the
  card height.
- **Balance.** The two hero columns (headline to buttons, cards to
  principles) share one height, within 24px at 1024, 1280 and 1440 in both
  languages (`e2e/home.spec.ts`). The map column is a fixed 552px; the
  text column takes the rest, 408px at 1024 growing to 536px from 1152px.
  The hero type grows with it through fluid tokens in `src/index.css`
  (`text-hero-title` 60 to 64px, `text-hero-intro` 18/28 to 20/34px,
  between 1024 and 1152px windows), so the columns stay level across that
  range. The tokens use `cqw` of the hero (an `@container`), not `vw`, so a
  classic scrollbar does not shift them.
  The headline's last two words never split ("to production").
- **First screen.** The whole hero, headline to buttons and cards to
  principles, fits a 1440x790 window (Chrome on a 900px-tall screen) in
  both languages (`e2e/home.spec.ts`). From `lg` the hero fills the window
  under the header (`--header-height`, the one-row header's 61px), up to
  56rem so tall tablets get no blank bands, and centers in it, so the space above it, to the header, equals the space
  below it, to the fold, where the next section's border sits; at least
  24px each on short windows. It
  is the first impression, so this outranks bigger type or cards: when the
  hero copy changes, rebalance with the type tokens, the card height and
  the gap without growing the hero past it.
- **Below `lg`.** The map moves under the buttons (`mt-12`) without the SVG
  or the arc offsets: the portrait centered, 192px (224px from `sm`) so it reads as the
  hero's face where there is no map around it, then the cards in one column,
  two from `sm`, then the principles centered.
- **Hero buttons on phones.** Below `sm` the two hero buttons sit at the
  column's left and right edges (`justify-between`); from `sm` they group on
  the left.

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
- Vertical rhythm steps down below `md`: page tops `pt-12` (`pt-8` on the
  home hero and case studies), sections `mt-20` instead of `mt-24`/`mt-28`,
  and teaser lists `gap-14` instead of `gap-20`. The home hero sits closer
  to the header than other pages (`md:pt-12`, not `md:pt-24`): it is the
  page's opening and its two columns are already tall.

## Motion

Interactive elements keep short color and underline transitions.
`prefers-reduced-motion` disables transitions globally (`src/index.css`).

The home hero is the one thing that moves on its own, once per page load
and in two parts: the entrance assembles it, then the identity map's
activation sequence lights the six cards. Then everything holds still;
nothing loops.

### Hero entrance

1. **Light** (0 to about 350ms). A soft front of brand light crosses the
   headline left to right and leaves the text behind it: from problem
   definition to production. The intro rises in from 450ms, the buttons
   from 600ms.
2. **Connection** (150ms to about 2.35s). The portrait settles, the
   connectors, arc and dots fade in, then a pulse leaves the portrait along
   each connector, 90ms apart, and each card arrives from the portrait's
   side, with a brief brand edge, as its pulse lands. The cards arrive at
   rest.
3. **Ready** (from 1800ms). The principles fade in.

Rules:

- Compositor-only where it matters: the headline light is two overlays
  that slide (`transform`) over text that never repaints; cards and
  flashes use `opacity` and `transform`. The pulses are short stroke
  animations on six lines. Curves: `--ease-sweep` (the drawer curve) for
  the light, `--ease-beam` (a strong ease-in-out) for anything travelling
  a connector, `--ease-entrance` for everything that arrives.
- The headline light never shows an edge: the cover is page color with a
  feathered left side, and the light has its own envelope, on only while
  it is over the text. The hero section clips sideways, so the travel never
  becomes page overflow on phones. The overlays assume the headline sits
  on `--background`.
- `src/hero-entrance.ts` gates it with `data-entrance` on `<html>`, from an
  inline script in `<head>` (hashed into the page CSP). The hero waits,
  hidden and covered, until the first frame has painted and the fonts are
  ready, so it never animates in a fallback font that then swaps; if fonts
  take over 1.2s, the hero simply appears static.
- Static without JavaScript, under `prefers-reduced-motion`, and after the
  first client navigation (`src/entry-client.tsx` removes the attribute),
  so it plays once per document load.
- e2e waits for the entrance (`e2e/hero.ts`) before axe runs, so mid-fade
  text is never measured for contrast.

### Identity map activation

Once every `hero-*` animation has finished (`whenHeroEntranceSettled`), the
cards turn active one by one, first to last, every 450ms, and stay active.
For each card: a beam (a bright core over a soft brand halo) travels from
the portrait to its dot (0 to 360ms); the card turns active (from 300ms);
the dot pings and stays bright (from 330ms); light runs around the card
border from where the connector meets it (340 to 1040ms); a ring spreads
from the card (from 700ms). The beam only travels out, and the portrait
itself does not pulse while the cards light.

The sequence closes once, as the last card activates, with the portrait
absorbing the energy of all six (`absorb` in
`src/components/identity-map.tsx`, timed from that moment): six beams run
back at once, dot to portrait, the pulse in reverse (800 to 1220ms); as
they land, one short arc of light, a bright core over a brand halo, runs a
single lap of the portrait's ring, leaving and returning at its right side,
where the connectors meet it (1180 to 2380ms); and the whole ring glows
once as the lap closes (2340 to 3040ms). It is light along the ring and
the connectors, never a ring spreading outward. About 5.3s after the
sequence starts, the map holds still, all six cards active.

- The timings live in `motion` (`src/components/identity-map.tsx`), and the
  keyframes in `src/index.css` repeat them; change both together.
- Desktop only (`lg`), off under `prefers-reduced-motion`
  (`src/components/use-identity-map-sequence.ts`). If the map becomes
  eligible again later (a resize back to `lg`), every card shows active at
  once instead of replaying.
- The server render and the first client render are the static map at
  rest. Each card's overlays are `aria-hidden` and mount when it activates,
  so each animation plays once. Nothing in the sequence carries
  information, and it adds no live regions.

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
