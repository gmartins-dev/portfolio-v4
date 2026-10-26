# Professional positioning

This document guides how the site presents Guilherme Martins. It is the
public positioning brief for the copy in `src/content/`, structured data,
`llms.txt`, social cards and the README. The longer owner positioning
document (2026-10-25, revision 2) stays private. Copywriting context for
agents is in [`.agents/product-marketing.md`](../.agents/product-marketing.md).
A Brazilian market version is in [positioning.pt-br.md](positioning.pt-br.md).

## Thesis

> A full-stack Software Engineer focused on product engineering and software
> architecture. He builds and evolves products from problem definition to
> production, uses coding agents across the development lifecycle through
> spec-driven workflows, tests, quality gates and human review, and
> integrates AI capabilities into products where they fit. Human judgment and
> accountability stay central.

| Layer | What it means | Where it shows |
| --- | --- | --- |
| Profession | Software Engineer. Same identity on both locales, including the Brazilian Portuguese title and meta (see [positioning.pt-br.md](positioning.pt-br.md)) | Site title, intro, bios, social cards |
| Seniority | Senior is the current level, not the identity | The current role in the experience list, and hiring contexts where level matters. Not in site titles or descriptions. Historical titles stay as held |
| Product engineering | Full-stack work from problem definition through production and ongoing improvement | Hero, intro, case studies |
| Software architecture | Practical decisions about boundaries, consistency, integrations, operations and trade-offs | Capabilities, case studies, education |
| Agentic engineering | Developing software with coding agents in a spec-driven, tested, reviewable workflow | Capabilities, How I work, sdd-agentic-flow |
| AI in products | Integrating AI-powered capabilities into products, with guardrails and human oversight | The AI-first case study and verified professional contributions |

Frontend architecture and design systems remain strong technical areas. They
show depth alongside backend and systems work; frontend is not the primary
label.

The reading order for a visitor is **product, then architecture, then AI**.
Product engineering shows what he delivers. Architecture shows how he reasons
about boundaries, reliability and trade-offs. Agentic engineering explains how
he works with coding agents, and AI product work shows where he has
integrated AI into real software. These are complementary dimensions of one
profile, not competing identities.

Guiding principle: **AI extends an engineer's leverage; judgment,
verification and accountability stay human.**

### Positioning boundaries (guidance for writers, not site copy)

| Boundary | Guidance |
| --- | --- |
| AI/ML specialization | Not an AI Engineer or ML Engineer whose main work is model training, data pipelines or ML infrastructure. The focus is software engineering, agentic development workflows and AI integration in products |
| Coding without oversight | Differentiate through explicit specs, bounded scope, tests, quality gates, human review and ownership. Explain the method positively; do not build the message around attacking "vibe coding" or other people's workflows |
| People management | The growth path is hands-on individual-contributor engineering with technical leadership. State the IC preference only when career direction comes up; do not define the identity by rejecting management |
| Architect as a job title | Architecture is a technical focus, not the current title. Keep the identity hands-on and show architecture through decisions and shipped systems |
| "Agentic" in products | Use "agentic system" only for work that shows agent-like behavior, such as multi-step orchestration or tool use, and only for his part of it. An LLM integration, a conversational interface or guardrails alone are "AI-powered features" or "AI integration" |

## Evidence

Every public claim maps to a concrete example. Demonstrated work stays
separate from current study.

| Pillar | Evidence | What can be said |
| --- | --- | --- |
| Product engineering end to end | Priorize.me (creator; public beta; collaborative, real-time boards); independent client work in healthcare and food service (2025 to 2026, finished; show years only); freelance projects from 2021 to 2022 | "I take product problems through implementation and production, then keep improving the software." |
| Software architecture and reliability | The anonymized AI-first credit platform, where his work is the core (a modular monolith with hexagonal architecture and replayable event ingestion) and its integration with the AI layers; payments-api-node (idempotency under concurrent requests; a hiring challenge, listed under More projects); the Nisien.ai frontend architecture and design system; the ADRs and quality gates of this repository | "I make and document architectural trade-offs around boundaries, consistency, integrations and production concerns." Say which decisions were his and where the evidence is public |
| Agentic engineering | sdd-agentic-flow (creator, open source): a harness for spec-first, bounded, verifiable coding-agent work with human review, documented for Codex, Cursor, Claude Code and GitHub Copilot | "I use coding agents across the development lifecycle, inside a spec-driven process I published as open source." |
| AI-powered features in products | Anonymized credit platform: the core integrated with conversational AI layers, with guardrails for sensitive data and workflow steps; Nisien.ai: the main customer-facing application of an AI cybersecurity product, from its first version; Backbase: an AI assistant proof of concept that won the internal hackathon; Priorize.me: an MCP server he built, which lets AI clients list, create and move tasks with the account's own permissions (tool use exposed to agents, and the clearest agent-facing work that is entirely his) | "I have integrated AI capabilities into products, with controls and human oversight." Never imply he built the models or the AI layers that colleagues owned |
| Formal study in architecture | PUC Minas, Postgraduate Specialization in Distributed Software Architecture, September 2026 to March 2028, in progress | "I am deepening my formal study of distributed software architecture." It signals current learning, not mastery of every subject in the syllabus |
| International context | Teams in the UK (Nisien.ai, Backbase, Vochlea, Loop) and Spain (ChatWith.io); fluent English, native Portuguese | "I have worked with teams in Brazil, the UK and Spain." |

### Honest limits

- **AI-first platform:** colleagues built the AI layers; his contribution is
  the core and its integration. Use "integrated" or another accurate verb,
  never "built the AI".
- **Education:** the specialization is in progress. Show the official course
  name and status. Subject areas may appear as study areas, never as
  professional expertise based on the syllabus alone.
- **Speed and quality:** do not claim that AI makes delivery faster or
  improves quality until there are defensible measurements. Describe the
  process that keeps AI-assisted work specified, tested, reviewable and
  verifiable.
- **This repository as proof:** the public repository shows agent
  instructions (`AGENTS.md`), ADRs, tests, CI gates and commits co-authored
  with coding agents. Describe what it shows; do not claim that every stage of
  every change followed the full process.
- **Confidential work:** keep employers, clients and projects anonymous where
  required, and publish only details within the approved scope of the
  anonymized case study. Check content against [maintenance.md](maintenance.md)
  and `scripts/denylist.json`. Anonymization covers distinctive technical
  details that could identify the client, not only names.
- **Architecture claims:** describe concrete decisions and trade-offs. A
  course, a single project or exposure to a technology does not support
  claims such as "microservices expert" or "cloud architect".

## Base sentences

Use the same core message everywhere and vary only length and emphasis.

- **Long, EN:** Software Engineer focused on full-stack product engineering
  and software architecture. I build and evolve products from problem
  definition to production, and use coding agents across the development
  lifecycle in spec-driven workflows with tests, quality gates and human
  review. I also integrate AI capabilities into products.
- **Short, EN** (bios, meta descriptions): Software Engineer focused on
  product engineering and software architecture, working with coding agents
  in a spec-driven, reviewed process.

The Brazilian Portuguese sentences, adapted to that market, are in
[positioning.pt-br.md](positioning.pt-br.md).

## Vocabulary

| Prefer | Avoid or qualify | Why |
| --- | --- | --- |
| Software Engineer | "AI Engineer" or "ML Engineer" as the identity | They signal a different specialization |
| Senior Software Engineer where level matters | "Senior" in every title, page title or bio | Seniority is the current level; the profession stays the identity |
| Software architecture, trade-offs, distributed systems, event-driven workflows, APIs, observability, ADRs | "Microservices expert", "cloud architect", broad expertise without matching evidence | Describe decisions and systems actually worked on |
| Agentic engineering, spec-driven development (SDD), coding agents, bounded tasks, tests, quality gates, human review | "Vibe coding" as a foil; "the AI writes my code" | Explain the method positively, with accountability and verification |
| AI-powered product features, LLM integration, guardrails, human in the loop | "Agentic system" for every LLM integration; "built the company's AI" | Use "agentic" only where agent-like behavior is evidenced, and describe personal contributions accurately |
| Product engineering, ownership, outcomes, end-to-end delivery | "Fullstack Developer" as the main identity | Keep one professional label; "Developer" is fine as a search keyword |
| Hands-on growth, architecture, technical decisions, technical leadership | Negative statements about people management in public copy | Describe the direction of growth, not what he avoids |
| Specified, tested, reviewable AI-assisted delivery | "10x", "100% written by AI", unmeasured speed or quality claims | Unsupported metrics, or claims that suggest no human judgment |

## Rules for public text

- Every factual claim points to the evidence above or to another verified
  source.
- No confidential employers, clients or projects by name. The AI-first case
  study is anonymized and was authorized for public use on 2026-10-25; each
  detail stays within that approval.
- "Software Engineer" is the identity. "Senior" appears where it expresses
  the current level, never forced into titles or bios. Historical titles
  reflect the roles held.
- Staff Engineer is a possible future direction, never a role he is seeking
  now.
- The PUC Minas specialization is marked in progress wherever it appears.
- No speed or quality gains without measured evidence; show the process
  instead.
- Agentic engineering (how coding agents build software) stays distinct from
  AI-powered product features (AI inside the software being built).
- Every visible site string exists in English and Brazilian Portuguese,
  without em or en dashes, as enforced by `src/content/content.test.ts`.

## How it maps to the site

| Element | Where | Guidance |
| --- | --- | --- |
| Title, metadata, intro, social cards | `copy.meta` and `copy.home` in `src/content/copy.ts` | Software Engineer as the identity; product engineering, architecture and agentic engineering in plain language |
| Capabilities | `copy.capabilities` | Order: product engineering, software architecture, agentic engineering, AI-powered product features |
| Case studies | `caseStudies` in `src/content/work.ts` | Order (owner's decision, 2026-10-25): the anonymized AI-first platform (current professional work: architecture and AI integration), Priorize.me (product ownership), sdd-agentic-flow (agentic engineering). The payments API, a hiring challenge, is under More projects; the architecture capability links to it |
| Experience and education | `experience` and `education` in `src/content/profile.ts` | Actual role titles; the specialization in progress; client work anonymous where needed |
| Process | The How I work page, `copy.howIWork` | The actual spec-to-review workflow; no claim that every project uses every step |
| Contact | `copy.contact` | A neutral line: product engineering, architecture or open-source collaboration. No job-seeking or availability language on the site |

## Sources

These sources inform terminology and framing. They are not evidence of his
experience; personal claims rest on the evidence above.

### Agentic engineering and spec-driven development

- Simon Willison, [What is agentic engineering?](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering)
- Addy Osmani, [AI Coding Agent](https://addyosmani.com/agentic-engineering/ai-coding-agent/)
- GitHub, [Spec-driven development with AI: Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)

### Product engineering and career development

- Gergely Orosz, [The Product-Minded Software Engineer](https://blog.pragmaticengineer.com/the-product-minded-engineer/)
- Will Larson, [Staff archetypes](https://staffeng.com/guides/staff-archetypes/)
- PostHog, [Product engineer vs software engineer](https://posthog.com/blog/product-engineer-vs-software-engineer)
- swyx, [The Rise of the AI Engineer](https://latent.space/p/ai-engineer)

### Education

- PUC Minas, [Distributed Software Architecture: course syllabus (PDF)](https://www.pucminas.br/Pos-Graduacao/IEC/Cursos/Documents/Ementas%20EAD/Arquitetura%20de%20Software%20Distribu%C3%ADdo.pdf)
