# ADR-009: Contact form with Web3Forms

- **Date**: 2026-10-26
- **Status**: Accepted
- **Tags**: contact, security, privacy

## Context and Problem Statement

The only way to reach the owner was a `mailto:` link. A form at `/contact`
lowers the friction for visitors without a configured mail client. The site
has no backend, expects very few messages and must stay at zero cost and
near-zero maintenance.

## Decision Drivers

- No server, database or SMTP to run
- Keep the visual design and accessibility under our control
- Free for a few messages a month
- Keep the CSP as narrow as possible

## Considered Options

1. **Web3Forms** with a React form: free, 250 submissions per month
2. **Formspree / FormSubmit**: 50 per month on the free plan
3. **Vercel Function + Resend**: access key stays secret and the CSP does not
   change, but it adds a backend, a secret, DNS verification and an `api/`
   directory the repo does not have

## Decision Outcome

Chosen option: **Web3Forms**, called with `fetch` from `src/components/contact-form.tsx`
and no new dependency. The access key is public by design (it can only deliver
to the owner's inbox) and is read from `VITE_WEB3FORMS_ACCESS_KEY` at build
time. Without it the page shows only the email address. Spam: a hidden
`botcheck` honeypot, no visible CAPTCHA.

CSP: `connect-src` in `src/csp.ts` gains `https://api.web3forms.com`. The
`vercel.json` header sets no `connect-src`, and `form-action 'self'` stays
because the form never navigates.

The footer keeps the `mailto` "Email me" button and adds a second button for
the form, an exception to "one label per intent" in DESIGN.md.

### Positive Consequences

- Nothing to host; the form follows the design system and WCAG checks
- Only one origin added to the policy

### Negative Consequences

- Messages pass through a third party
- The key is visible in the bundle; domain restriction is a paid feature, so
  abuse is limited only by Web3Forms rate limits (rotate the key if needed)
- Spam protection is basic

## Links

- Extends [ADR-002](002-per-page-csp-with-script-hashes.md)
