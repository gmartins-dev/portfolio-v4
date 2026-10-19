# ADR-007: Polar Navy palette with a derived light theme

- **Date**: 2026-10-18
- **Status**: Accepted
- **Tags**: design, accessibility

## Context and Problem Statement

The site used neutral grays with a burnt-orange accent. The owner chose the
Polar Navy palette (deep navy with a glacial cyan accent) as the new
identity. It defines only a dark theme, while the site ships a
Light, Dark and System switcher.

## Decision Drivers

- One source of token values (`src/index.css`)
- WCAG 2.2 AA in both themes, enforced by the axe e2e suite
- Keep the theme switcher and the print rules unchanged

## Considered Options

1. Dark only, remove the switcher
2. Keep the switcher and derive a light theme from the same hues

## Decision Outcome

Chosen option: **2**. Dark uses the palette as given: background `#08121C`,
surface `#101F2D`, text `#EAF4FC`, muted `#9DB2C5`, accent `#79D7F5`. Light
is derived (not supplied by the owner): cool near-white surfaces, navy text
and a darker cyan accent (about `#0B6E8F`, 5.4:1 on the page background). Border,
muted surface and destructive colors in both themes are also derived.

### Consequences

- Hand-mirrored places change with the tokens: `theme-color` metas,
  `public/favicon.svg`, `scripts/build-og-images.mjs` (also renders the
  apple-touch-icon) and the Mermaid theme variables in `scripts/diagrams/`.
- Diagrams stay drawn light and are inverted in dark mode by `WorkImage`.
