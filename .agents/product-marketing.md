# Product Marketing Context

**Document version:** v3
**Last updated:** 2026-10-25

This is the positioning reference for writing copy on gmartins.dev. It condenses the
owner's positioning document (2026-10-25, revision 2), whose public summary
is [docs/positioning.md](../docs/positioning.md). Every fact here already appears in `src/content/`, which
traces to the resumes, LinkedIn and the public repositories, or comes from the
owner. Lines marked **Owner to fill** have no source yet: ask, never invent.

## Product Overview
**One-liner:** Guilherme Martins, a Software Engineer focused on product
engineering and software architecture. He builds full-stack products that
hold up in production and uses coding agents across the development cycle in
a spec-driven process with tests, quality gates and human review. He also
integrates AI capabilities into products.
**What it does:** A bilingual (EN, PT-BR) site where a reader can
identify his profile in one scan, examine evidence (case studies, How I work,
public products, projects) and reach him by email or resume.
**Product category:** Personal engineering portfolio. Searches: his name,
"software engineer", product engineering, software architecture, agentic
engineering, Brazil, remote.
**Product type:** Professional services: employment and consulting.
**Business model:** Not applicable to the site. Rates: **Owner to fill**
(not published).

## Target Audience
**Priority:** international remote roles and consulting clients, staying open
to the Brazilian market.
**Target companies:** Product companies and startups, especially teams
adopting agentic engineering or building AI features. His history covers
fintech, SaaS, AI-driven products, cybersecurity, healthcare and creative
software, with teams in Brazil, the UK and Spain.
**Decision-makers:**
- **Primary:** Engineering Managers, Tech Leads, CTOs, technical founders.
- **Secondary:** technical recruiters.
- **Tertiary:** consulting clients, collaborators, open-source contributors.
**Primary use case:** Decide whether to contact him for a role or project.
**Jobs to be done:**
- Confirm in seconds what he does and how he works
- Check real evidence (architecture decisions, process, products) before an
  interview or proposal
- Find the contact and the resume without friction

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Engineering Manager / Tech Lead | How he decides, scopes, uses AI and verifies | Most of his work is under confidentiality | Case studies with decisions and trade-offs; How I work |
| Recruiter | Fit: stack, level, location, languages | Little time per profile | Clear identity, availability line, experience list, resume |
| Consulting client / founder | Delivery from problem to production | Hard to judge reliability | Own SaaS (Priorize.me), client work, the process behind it |

## Identity and seniority rules
- **Identity:** the profession is "Software Engineer". "Senior" appears only on
  the current role (the anonymized AI-first fintech entry) and in recruiter
  filters, never in the site title, headline, intro, meta or social cards.
- **Staff:** a long-term direction. It never appears on the site as a role he
  is looking for.
- **Architecture:** the main technical depth. The postgraduate specialization
  in Distributed Software Architecture (PUC Minas, 2026 to 2028) is always
  marked in progress. Describe what he applied, never the syllabus.
- **AI:** a multiplier of the engineer, never a replacement for judgment. He
  is not an "AI Engineer" or an "ML Engineer".

## Differentiation
**Key differentiators:**
- **Software architecture with evidence.** A modular, hexagonal core with
  replayable event ingestion, idempotent payment APIs, and decisions recorded
  as ADRs.
- **Agentic engineering.** Spec-driven development with coding agents and
  human review, open-sourced as sdd-agentic-flow and shown on How I work.
- **AI-powered product features.** LLM integrations with guardrails on an
  AI-first credit platform. He integrates the core with the AI layers;
  colleagues build those layers. Say "agentic system" only where
  agent-like behavior is evidenced, and only for his part.
- **Product engineering end to end,** with frontend architecture and design
  systems as a strength.
- **Honest about confidentiality.** The anonymized professional case study
  and the public products are described from each company's site.

## Objections
| Objection | Response |
|-----------|----------|
| "Most of the work shown is personal" | The current role has an authorized anonymized case study; past products are listed with role and contributions |
| "AI-generated code, so lower quality?" | How I work: specs, bounded tasks, the same gates for every change, human review; this repository is public |
| "Frontend specialist only?" | Architecture capability, payments API, AI-first core, Priorize.me end to end |
| "Can he work in English with remote teams?" | UK companies (Nisien.ai, Backbase, Vochlea, Loop) and one in Madrid (ChatWith.io) |

**Anti-persona:** roles that want a technology checklist or inflated metrics,
anyone needing confidential details of past employers, and people-management
roles.

## Customer Language
**Words to use:**
- product engineering, software architecture, modular monolith, hexagonal
  architecture, ADRs;
- agentic engineering, spec-driven development, coding agents, quality gates,
  human review, guardrails;
- specified, tested, reviewable AI-assisted delivery (no speed or quality
  gains without measured evidence);
- real dates and stacks.

**Words to avoid:**
- "AI Engineer", "ML Engineer" or "Software Architect" as a title;
- "vibe coding", "10x", "100% written by AI";
- "Senior" outside the current role; "open to Staff roles";
- passionate, rockstar, ninja, cutting-edge, seamless, leverage, robust,
  world-class;
- impact numbers without a source;
- em and en dashes in site copy, which the tests enforce.

**Glossary:**
| Term | Meaning |
|------|---------|
| Case study | A long page on one piece of work: problem, approach, trade-offs, validation |
| How I work | The development process page: spec, tasks, agents, gates, review, ADRs |
| Anonymized | Professional work shown without employer or client names (`scripts/denylist.json`) |
| contractor (PT-BR) | Use "prestador de serviço" in Portuguese copy |

## Brand Voice
**Tone:** Plain, factual, calm. First person on the site; third person in
`llms.txt` and structured data.
**Style:** Short declarative sentences, concrete nouns and claims a reader
can verify. Both languages are written natively, not translated word for
word. Technical terms stay in English in PT-BR copy (agentic engineering,
spec-driven, coding agents).

## Proof Points
**Metrics:** None published. Do not add numbers without a source. The How I
work page does not cite commit counts, by the owner's decision.
**Value themes:**
| Theme | Proof |
|-------|-------|
| End-to-end product engineering | Priorize.me case study |
| Software architecture | AI-first case study, payments API case study, ADRs |
| Agentic engineering | sdd-agentic-flow, How I work, this repository |
| AI-powered product features | AI-first case study |
| Frontend architecture and design systems | Nisien.ai product entry |
**Testimonials:** **Owner to fill**. Ask former managers for LinkedIn
recommendations and quote them only with permission.

## Goals
**Business goal:** Be contacted for relevant engineering roles, consulting and
collaborations.
**Conversion action:** "Email me" (hero and footer). Secondary actions: the
resumes, GitHub and LinkedIn.
**Current metrics:** None yet. Real-user performance comes from Speed Insights
after launch (ADR-006).

## Changelog
*Newest first. One line per revision: what changed and why.*
- v3 (2026-10-25): Follows the owner's review of docs/positioning.md. Drops the unmeasured speed promise, separates agentic engineering from AI-powered product features, and adds the Brazilian market version (docs/positioning.pt-br.md).
- v2 (2026-10-25): Rewritten from the owner's positioning document (rev. 2). Software Engineer identity, architecture and agentic engineering as pillars, seniority and Staff rules, education in progress, How I work, contact priorities.
- v1 (2026-10-18): Initial context, drafted from `src/content/`, the project plan and the 2026-10-12 discovery during the 2026-10-17 audit.
