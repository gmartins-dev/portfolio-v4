# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-18

Positioning reference for writing copy on gmartins.dev. Every fact here
already appears in `src/content/` (which traces to the resumes, LinkedIn and
public repositories) or in the project plan. Lines marked **Owner to fill**
have no source yet: ask, never invent.

## Product Overview
**One-liner:** Guilherme Martins, a Software Engineer with deep frontend
experience who takes products from problem definition to production.
**What it does:** A bilingual (EN, PT-BR) site that lets a reader identify
his profile in one scan, examine evidence (case studies, public products,
projects), and reach him by email or resume.
**Product category:** Personal engineering portfolio (searches: his name,
"software engineer", "frontend engineer", Brazil and UK).
**Product type:** Professional services: employment, contracts, consulting.
**Business model:** Not applicable to the site. Rates and availability:
**Owner to fill** (open question O03 in `docs/discovery/`).

## Target Audience
**Target companies:** Product companies and startups; his history covers
fintech, SaaS, AI-driven products, cybersecurity, healthcare and creative
software, with teams in Brazil and the UK.
**Decision-makers:** Primary: Engineering Managers, Tech Leads, CTOs,
technical founders, hiring decision-makers. Secondary: technical recruiters.
Tertiary: consulting clients, collaborators, open-source contributors.
**Primary use case:** Decide whether to contact him for a role or project.
**Jobs to be done:**
- Confirm in seconds what he does and at what level
- Check real evidence of how he works before an interview or proposal
- Find the contact and the resume without friction
**Use cases:**
- A recruiter screening for a full-stack or frontend-heavy role
- A tech lead reading one case study before a technical interview
- A founder looking for someone to build or evolve a product end to end

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Engineering Manager / Tech Lead | How he decides, scopes and verifies | Most of his work is under confidentiality | Case studies with problem, approach, trade-offs and validation |
| Recruiter | Fit: stack, seniority, location, languages | Little time per profile | Clear headline, experience list, resume links |
| Consulting client / founder | Delivery from requirements to production | Hard to judge a freelancer's reliability | Own SaaS (Priorize.me) and client work shown with live links |

## Problems & Pain Points
**Core problem:** Evaluators need trustworthy evidence of engineering
judgment, but most professional work is private.
**Why alternatives fall short:**
- Resumes and LinkedIn list titles and stacks without showing decisions
- Generic portfolios show screenshots, not trade-offs and validation
**What it costs them:** Extra interview rounds to learn what a case study
could show. **Owner to fill** with real feedback if any.
**Emotional tension:** Doubt about claims that cannot be checked.

## Competitive Landscape
**Direct:** Other engineers' portfolios: often technology lists and
animation, with unverifiable claims.
**Secondary:** LinkedIn and resumes: same facts, no depth.
**Indirect:** Referrals and take-home tests: slower and costlier for both sides.

## Differentiation
**Key differentiators:**
- Evidence over technology lists: every case study has problem, approach,
  trade-offs, validation, links and a "facts checked" date
- Software engineering identity, not frontend only, with frontend
  architecture and design systems as a strength
- AI-assisted engineering with human control (sdd-agentic-flow)
- Honest about confidentiality: one anonymized professional case study and
  public products described from each company's site
**How we do it differently:** Shows decisions and their verification
instead of claiming impact.
**Why that's better:** A reader can check the work, not take it on trust.
**Why customers choose us:** **Owner to fill** (no recorded feedback).

## Objections
| Objection | Response |
|-----------|----------|
| "Most of the work shown is personal" | The products he worked on are listed with role, period and what he did; one professional case is anonymized |
| "Frontend specialist only?" | Payments API (idempotency, PostgreSQL), Priorize.me end to end, backend capability on the home page |
| "Can he work in English with remote teams?" | Four UK companies (Nisien.ai, Backbase, Vochlea, Loop) and one in Madrid (ChatWith.io) in his experience |

**Anti-persona:** Roles that want a technology checklist or inflated metrics;
anyone needing confidential details of past employers.

## Switching Dynamics
**Push / Pull / Habit / Anxiety:** Not applicable to a portfolio; see
Objections. **Owner to fill** if hiring feedback shows a pattern.

## Customer Language
**How they describe the problem:** **Owner to fill** (no recorded reader
quotes; the discovery notes no visitor research).
**How they describe us:** **Owner to fill.**
**Words to use:** specific nouns from the work (idempotency, design system,
partner landing page, specification, guardrails), "built", "maintain",
"designed and delivered", real dates and stacks.
**Words to avoid:** passionate, rockstar, ninja, cutting-edge, seamless,
leverage, robust, world-class; percentages or impact numbers without a
source; "expert in" lists; em and en dashes in site copy (enforced by tests).
**Glossary:**
| Term | Meaning |
|------|---------|
| Case study | A long page on one piece of work: problem, approach, trade-offs, validation |
| Products I worked on | Public products of past employers, described from their public sites |
| Anonymized | Professional work shown without employer or client names (`scripts/denylist.json`) |
| contractor (PT-BR) | Use "prestador de serviço" in Portuguese copy |

## Brand Voice
**Tone:** Plain, factual, calm. First person on the site; third person in
`llms.txt` and structured data.
**Style:** Short declarative sentences, concrete nouns, claims a reader can
verify. Both languages written natively, not translated word for word.
**Personality:** Precise, honest, pragmatic, unpretentious.

## Proof Points
**Metrics:** None published; do not add numbers without a source.
**Customers:** Public products he worked on at Nisien.ai, Backbase, Vochlea,
Loop and ChatWith.io; client websites (Débora Blaso); partner distribution
via Uber in the anonymized banking case.
**Testimonials:** **Owner to fill** (none collected).
**Value themes:**
| Theme | Proof |
|-------|-------|
| End-to-end product engineering | Priorize.me case study |
| Frontend architecture and design systems | Nisien.ai product entry |
| Backend consistency | Payments API case study |
| AI-assisted engineering with control | sdd-agentic-flow case study |

## Goals
**Business goal:** Be contacted for relevant roles, contracts and
collaborations.
**Conversion action:** "Email me" (contact@gmartins.dev); secondary: resume
PDFs, GitHub, LinkedIn.
**Current metrics:** None yet; real-user performance via Speed Insights
after launch (ADR-006). No analytics on visits or contacts.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-10-18) — Initial context, drafted from `src/content/`, the project plan and the 2026-10-12 discovery during the 2026-10-17 audit.
