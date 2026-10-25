# Professional positioning

This document describes how this site presents Guilherme Martins. It is the
public summary of the owner's positioning document (2026-10-25, revision 2),
which stays private. Copy in `src/content/`, structured data, `llms.txt`,
social cards and the README follow it. The copywriting context for agents
is in [`.agents/product-marketing.md`](../.agents/product-marketing.md).

## Thesis

> A full-stack Software Engineer who does product engineering, designs
> architectures that hold up in production, and works agentically: AI across
> the whole development cycle, with specs, verification and human judgment,
> to ship faster without lowering the bar. Individual contributor track.

| Layer | What it is | Where it shows |
| --- | --- | --- |
| Profession (identity) | Software Engineer | Site title, intro, bios, social cards |
| Seniority (level) | Senior, as a level and not an identity | The current role in the experience list only |
| Way of working on product | Product engineering, full-stack, from problem to production | Hero, case studies |
| Technical depth | Software architecture: distributed systems, event-driven design, APIs, observability, decisions recorded as ADRs | Capabilities, case studies, education |
| Way of working with AI | Agentic engineering: spec-driven development with coding agents and verification | Capabilities, How I work, sdd-agentic-flow |
| What he builds with AI | Agentic systems in products: LLM integration, guardrails, people in the loop | The AI-first case study |

Frontend architecture and design systems remain a strength. They serve as
proof, not as the label.

The reading order for a visitor is **product** (what he delivers), then
**architecture** (why it holds up), then **AI** (how he works). Each layer
supports the others: architecture makes the AI speed credible, and AI used
with a process shows engineering maturity.

The guiding line: **AI multiplies the engineer; judgment stays with people.**

### What he is not

| Not | Why |
| --- | --- |
| AI Engineer or ML Engineer | He does not train models, build data pipelines or specialize in LLMOps |
| A "vibe coder" | The difference is the opposite: specs, bounded scope, tests and human review |
| A people manager | Individual contributor track: technical leadership, no direct reports |
| A "Software Architect" by title | He designs systems and also builds and runs them; architecture is the depth, not the job title |

## Evidence

Every public claim points to one of these.

| Pillar | Evidence | What can be said |
| --- | --- | --- |
| Product engineering end to end | Priorize.me (creator, SaaS in public beta, real time); independent client work in healthcare and food service; freelance work from 2021 to 2022 | "I take products from the problem to production and keep improving them after launch" |
| Software architecture | AI-first credit platform (anonymized): a modular monolith with hexagonal architecture, replayable event-driven ingestion, observability and feature flags from the start; payments-api-node (idempotency under concurrency); the Nisien.ai design system and frontend architecture; the ADRs in this repository; a postgraduate specialization in Distributed Software Architecture (PUC Minas, 2026 to 2028, in progress) | "I design systems around boundaries, consistency and operations, and I record the decisions" |
| Agentic engineering | sdd-agentic-flow (creator, open source): a harness that keeps coding-agent work spec-first, bounded and verifiable, with a human making the final call; works with Codex, Cursor, Claude Code and GitHub Copilot. This repository, built the same way | "I use agents across the whole cycle, from spec to review, with a process I open-sourced" |
| Agentic systems in products | AI-first credit platform: the core integrated with conversational AI layers, guardrails that redact sensitive data and can block a step, AI that speeds up the flow but does not decide; the main application of the Nisien.ai AI product from its first version; an AI assistant proof of concept that won the Backbase internal hackathon | "I integrate AI flows into products, with guardrails and people in the loop" |
| International context | Teams in the UK (Nisien.ai, Backbase, Vochlea, Loop) and Spain (ChatWith.io) | "I have worked with teams in Brazil, the UK and Spain" |

### Honest limits

- **AI-first platform:** colleagues build the AI layers. His part is the core
  and the integration, so the copy says "integrate", never "built the AI".
- **Education:** the specialization is in progress and is always shown that
  way. The copy names what he already applies, never the syllabus.
- **Speed claims:** "faster with quality" needs proof. Until there are
  numbers, the site shows the process (specs, gates, tests, review) instead
  of promising speed.
- **Confidential work:** it stays anonymized, following
  [maintenance.md](maintenance.md) and `scripts/denylist.json`.

## Base sentences

The same base sentence goes everywhere; only the length changes.

- **EN:** Software Engineer focused on product engineering and software
  architecture. I build full-stack products that hold up in production, and I
  use AI across the whole development cycle, with specs, tests and human
  review, to ship faster without lowering the bar.
- **PT-BR:** Software Engineer com foco em engenharia de produto e
  arquitetura de software. Construo produtos full-stack que se sustentam em
  produção e uso IA em todo o ciclo de desenvolvimento, com specs, testes e
  revisão humana, para entregar mais rápido sem baixar a qualidade.

## Vocabulary

| Use | Avoid | Why |
| --- | --- | --- |
| Software Engineer | "AI Engineer", "ML Engineer", "Software Architect" as a title | The first two point to data and ML work. "Architect" as a title suggests someone who no longer builds |
| software architecture, distributed systems, event-driven, modular monolith, hexagonal architecture, ADRs, observability | "microservices expert", "cloud architect" | Say what was applied, not a syllabus |
| agentic engineering, spec-driven development, coding agents, quality gates, human review | "vibe coding", "the AI writes my code" | Agentic engineering implies review and responsibility |
| agentic systems in products, LLM integration, guardrails, tool calling, MCP | "built the company's AI" | Precision about what was his |
| product engineering, ownership, outcomes | "Fullstack Developer" as a title | "Developer" reads as a junior or mid-level title |
| technical decisions, trade-offs, technical leadership | "people manager", "team management" | Individual contributor track |
| "ship faster without lowering the bar" | "10x", "100% written by AI", speed alone | Unproven numbers; speed without quality is what hiring teams fear |

In Portuguese copy, the technical terms stay in English (agentic
engineering, spec-driven, coding agents), as the market uses them.

## Rules for public text

- Every claim points to the evidence above.
- No confidential employers, clients or projects by name. The AI-first case
  study is anonymized, and the owner authorized it on 2026-10-25.
- "Software Engineer" is the identity. "Senior" appears only on the current
  role. Past roles show the title held at the time.
- The site never presents Staff as a role he is looking for.
- Education in progress is always marked as in progress.
- Speed always comes with quality, and no gain is promised without a number.
- Every visible string exists in English and Brazilian Portuguese, without
  em or en dashes (enforced by `src/content/content.test.ts`).

## How it maps to the site

| Element | Where |
| --- | --- |
| Title, meta description, intro, availability line | `copy.meta`, `copy.home` in `src/content/copy.ts` |
| Capabilities: product, architecture, agentic engineering, agentic systems | `copy.capabilities` |
| Case study order: AI-first platform, sdd-agentic-flow, Priorize.me, payments API | `caseStudies` in `src/content/work.ts` |
| Current role (anonymized) and education | `experience` and `education` in `src/content/profile.ts` |
| The process | The How I work page, `copy.howIWork` |
| Contact line | `copy.contact`: "For engineering roles in product teams, consulting or open-source collaboration..." |

## Sources

- Simon Willison, [What is agentic engineering?](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering)
- Addy Osmani, [AI Coding Agent](https://addyosmani.com/agentic-engineering/ai-coding-agent/)
- GitHub, [Spec-driven development with AI: Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- Gergely Orosz, [The Product-Minded Software Engineer](https://blog.pragmaticengineer.com/the-product-minded-engineer/)
- Will Larson, [Staff archetypes](https://staffeng.com/guides/staff-archetypes/)
- PostHog, [Product engineer vs software engineer](https://posthog.com/blog/product-engineer-vs-software-engineer)
- swyx, [The Rise of the AI Engineer](https://latent.space/p/ai-engineer)
