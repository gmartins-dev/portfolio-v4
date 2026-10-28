# ADR-011: Hero entrance gated by an inline head script

- **Date**: 2026-10-27
- **Status**: Accepted
- **Amends**: [ADR-008](008-dark-only.md) (its note that the router's state is the only inline script)
- **Tags**: design, motion, performance, security

## Context and Problem Statement

The home hero got a one-time entrance (DESIGN.md, "Hero entrance"): light
reveals the headline, then the identity map assembles and lights its cards.
The first version was plain CSS keyed off the prerendered markup, and it
flickered: the headline started animating in the fallback font and swapped
to Geist mid-motion, and the animation clock started before the first paint,
so elements appeared already halfway through. The page is static and
prerendered (ADR-001), the client bundle hydrates late on purpose
(`fetchPriority: low`), and the CSP forbids inline styles (ADR-002).

## Decision Drivers

- No animation in a fallback font, no motion before the first frame
- The hero stays readable without JavaScript and under reduced motion
- No new runtime dependency, nothing waiting on hydration
- Scripts stay allowed by hash, never by `'unsafe-inline'`

## Considered Options

1. Plain CSS animations on the prerendered markup
2. Start the entrance from the client bundle after hydration
3. A small inline script in `<head>` that holds the hero until the first
   paint and the fonts, then lets CSS play it
4. Change the font to `font-display: block` or `optional`

## Decision Outcome

Chosen option: **3**. `src/hero-entrance.ts` exports the script, rendered
inline in `<head>` by `src/router.tsx`. It sets `data-entrance="pending"` on
`<html>` when motion is allowed, waits two frames and `document.fonts.ready`,
then sets `"play"`; if fonts take over 1.2s it removes the attribute and the
hero shows static. All motion is CSS in `src/index.css`, keyed off that
attribute. `src/entry-client.tsx` removes it on the first client navigation,
so the entrance plays once per document load. Its hash enters each page's
CSP like the router's state script (ADR-002). Option 1 was the flickering
version; option 2 waits for the bundle, which loads late by design; option 4
changes text rendering for every page to fix one animation.

### Consequences

- Pages carry two inline scripts, the router's state and this one, so the
  per-page CSP lists one more hash; ADR-008's note that the router's script
  is the only one no longer holds.
- Without JavaScript, under `prefers-reduced-motion`, or on a slow font load
  the hero is static, never hidden.
- While pending, the hero below the headline is held at opacity 0, up to
  the 1.2s font budget on a cold load. The headline (the measured LCP
  element) is painted under its cover, so local LCP did not move; real-user
  LCP is tracked by Speed Insights (ADR-006).
- React 19 places the script after the hoisted stylesheet link, so it runs
  once the CSS has loaded. Rendering already waits for that CSS, so first
  paint does not move.
- The identity map's activation sequence starts only after the entrance
  settles (`whenHeroEntranceSettled`).

## Links

- [DESIGN.md, "Hero entrance"](../../DESIGN.md)
- [ADR-002](002-per-page-csp-with-script-hashes.md), [ADR-006](006-real-user-web-vitals-with-vercel-speed-insights.md), [ADR-008](008-dark-only.md)
