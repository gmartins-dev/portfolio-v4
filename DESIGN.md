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
- **One accent.** `--brand` (burnt orange) marks links, focus, and the
  primary call to action. Nothing else gets a color.
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
`text-brand`). Do not write raw color values in components.

## Typography

- **Geist Variable** for everything, **Geist Mono Variable** for technical
  metadata only (dates, stacks, file names). Both are self-hosted through
  Fontsource.
- Headlines use weight and tight tracking, not huge sizes. Body text is
  capped at about 65 characters per line (`max-w-prose`).

## Shape and layout

- One radius scale: `rounded-lg` for images and buttons. No pills.
- Content width `max-w-5xl`, page gutter `px-4` (mobile) to `px-6`.
- Group related items with spacing and a single top border, not cards.
- Multi-column layouts collapse to one column below `md`.

## Motion

Minimal: color and underline transitions on interactive elements, nothing
that moves on its own. `prefers-reduced-motion` disables transitions globally
(`src/index.css`).

## Accessibility

- WCAG 2.2 AA in both themes; axe runs in the end-to-end suite.
- Visible focus ring on every interactive element (`outline-ring`).
- Skip link to `#main`, one `h1` per page, landmarks for header, nav, main,
  and footer.
- Images have descriptive `alt`, explicit `width` and `height`.
