# ADR-008: Dark theme only, no theme switcher

- **Date**: 2026-10-18
- **Status**: Accepted
- **Supersedes**: [ADR-007](007-polar-navy-palette.md)
- **Tags**: design, simplicity

## Context and Problem Statement

ADR-007 kept a Light, Dark and System switcher and added a light theme
derived from the Polar Navy palette. The owner did not like the light
theme. Keeping it meant a second set of tokens, a pre-paint inline script
with a CSP hash, a toggle (with a compact variant on narrow phones), `dark:`
variants and duplicated e2e coverage.

## Considered Options

1. Keep the switcher and redesign the light theme
2. Dark only, no switcher

## Decision Outcome

Chosen option: **2**. The Polar Navy dark tokens are the `:root` values in
`src/index.css`, with `color-scheme: dark`. `src/theme.tsx`, the `dark:`
variants, the `xs` breakpoint and the theme copy are removed.

Print keeps light tokens in an `@media print` block, because printers drop
backgrounds and dark-on-white is the readable result; `WorkImage` resets its
dark filters there.

### Consequences

- The only inline script left on a page is the router's dehydrated state, so
  the per-page CSP hash list (ADR-002) has one entry fewer, and the 404
  (ADR-003) now drops every script instead of keeping the theme bootstrap.
  The theme toggle that ADR-003 hid on the 404 no longer exists.
- A single `<meta name="theme-color">` and `<meta name="color-scheme">`.
- No light mode for visitors whose system prefers light.
- Diagrams stay drawn light and are inverted by `WorkImage`.
