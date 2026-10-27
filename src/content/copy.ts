import type { Locale } from "../i18n";
import type { Localized } from "./schema";

/** Pick the string for a locale. */
export const t = (value: Localized, locale: Locale) => value[locale];

// Page and interface copy. Factual statements trace back to the resumes and
// the GitHub profile README (see profile.ts). Positioning follows the owner's
// positioning document (2026-10-25, revision 2), summarized in
// docs/positioning.md.
export const copy = {
	meta: {
		siteName: { en: "Guilherme Martins", "pt-BR": "Guilherme Martins" },
		// The profession as shown in titles and social cards. PT-BR uses the
		// term Brazilian job searches use (owner's decision, 2026-10-25).
		role: { en: "Software Engineer", "pt-BR": "Software Engineer" },
		home: {
			title: {
				en: "Guilherme Martins | Software Engineer",
				"pt-BR": "Guilherme Martins | Software Engineer",
			},
			description: {
				en: "Software Engineer in Belo Horizonte focused on product engineering and software architecture, building full-stack products with AI across the development cycle, for teams in Brazil and the UK.",
				"pt-BR":
					"Software Engineer em Belo Horizonte com foco em engenharia de produto e arquitetura de software, construindo produtos full-stack com IA em todo o ciclo de desenvolvimento, para times no Brasil e no Reino Unido.",
			},
		},
		work: {
			title: {
				en: "Cases | Guilherme Martins",
				"pt-BR": "Cases | Guilherme Martins",
			},
			description: {
				en: "Case studies and projects by Guilherme Martins: a collaborative SaaS, developer tooling, backend consistency, products built at Backbase, Nisien.ai and Vochlea, and client work.",
				"pt-BR":
					"Estudos de caso e projetos de Guilherme Martins: um SaaS colaborativo, ferramentas para devs, consistência no backend, produtos construídos na Backbase, Nisien.ai e Vochlea, e trabalhos para clientes.",
			},
		},
		projects: {
			title: {
				en: "More projects | Guilherme Martins",
				"pt-BR": "Mais projetos | Guilherme Martins",
			},
			description: {
				en: "Smaller projects, technical challenges and earlier work by Guilherme Martins, with live demos and source code.",
				"pt-BR":
					"Projetos menores, desafios técnicos e trabalhos anteriores de Guilherme Martins, com demos e código-fonte.",
			},
		},
		about: {
			title: {
				en: "About Guilherme Martins | Software Engineer",
				"pt-BR": "Sobre Guilherme Martins | Software Engineer",
			},
			description: {
				en: "Guilherme Martins, software engineer: product engineering, software architecture and agentic engineering, in fintech, AI cybersecurity, SaaS and healthcare.",
				"pt-BR":
					"Guilherme Martins, engenheiro de software: engenharia de produto, arquitetura de software e agentic engineering, em fintech, cibersegurança com IA, SaaS e saúde.",
			},
		},
		howIWork: {
			title: {
				en: "How I work | Guilherme Martins",
				"pt-BR": "Como trabalho | Guilherme Martins",
			},
			description: {
				en: "How Guilherme Martins builds software with coding agents: specs first, bounded tasks, the same quality gates for every change, human review and decisions recorded as ADRs.",
				"pt-BR":
					"Como Guilherme Martins constrói software com agentes de código: specs primeiro, tarefas delimitadas, os mesmos gates de qualidade em toda mudança, revisão humana e decisões registradas em ADRs.",
			},
		},
		contact: {
			title: {
				en: "Contact | Guilherme Martins",
				"pt-BR": "Contato | Guilherme Martins",
			},
			description: {
				en: "Send a message to Guilherme Martins about product engineering, architecture or open-source collaboration.",
				"pt-BR":
					"Envie uma mensagem para Guilherme Martins sobre engenharia de produto, arquitetura ou colaboração em open source.",
			},
		},
		notFound: {
			title: {
				en: "Page not found | Guilherme Martins",
				"pt-BR": "Página não encontrada | Guilherme Martins",
			},
			description: {
				en: "This page does not exist.",
				"pt-BR": "Esta página não existe.",
			},
		},
	},
	nav: {
		label: { en: "Main", "pt-BR": "Principal" },
		home: { en: "Home", "pt-BR": "Início" },
		work: { en: "Cases", "pt-BR": "Cases" },
		about: { en: "About", "pt-BR": "Sobre" },
		resume: { en: "Resume", "pt-BR": "Currículo" },
		contact: { en: "Contact", "pt-BR": "Contato" },
		skip: { en: "Skip to content", "pt-BR": "Pular para o conteúdo" },
		language: { en: "Português", "pt-BR": "English" },
		// The toggle is an icon. Its accessible name is the target language plus
		// languageHint, which screen readers read; the icon is aria-hidden.
		// The current language, shown on the toggle badge.
		languageCode: { en: "EN", "pt-BR": "PT" },
		languageHint: { en: ", ler em português", "pt-BR": ", read in English" },
	},
	contact: {
		heading: { en: "Let's talk", "pt-BR": "Vamos conversar" },
		body: {
			en: "For product engineering, architecture or open-source collaboration, email is the fastest way to reach me.",
			"pt-BR":
				"Para engenharia de produto, arquitetura ou colaboração em open source, email é o jeito mais rápido de falar comigo.",
		},
		email: { en: "Email me", "pt-BR": "Enviar email" },
	},
	contactPage: {
		heading: { en: "Contact", "pt-BR": "Contato" },
		intro: {
			en: [
				"For product engineering, architecture or open-source collaboration,",
				"send me a message and I will reply by email.",
			],
			"pt-BR": [
				"Para engenharia de produto, arquitetura ou colaboração em open source,",
				"envie uma mensagem e eu respondo por email.",
			],
		},
		name: { en: "Name", "pt-BR": "Nome" },
		email: { en: "Email", "pt-BR": "Email" },
		subject: { en: "Subject (optional)", "pt-BR": "Assunto (opcional)" },
		message: { en: "Message", "pt-BR": "Mensagem" },
		submit: { en: "Send message", "pt-BR": "Enviar mensagem" },
		sending: { en: "Sending...", "pt-BR": "Enviando..." },
		required: {
			en: "Fill in your name, a valid email and a message.",
			"pt-BR": "Preencha seu nome, um email válido e a mensagem.",
		},
		success: {
			en: "Message sent. I will reply by email.",
			"pt-BR": "Mensagem enviada. Respondo por email.",
		},
		error: {
			en: "The message could not be sent. Try again or email me directly.",
			"pt-BR":
				"Não foi possível enviar a mensagem. Tente de novo ou me escreva diretamente.",
		},
		fallback: {
			en: "Prefer email? Write to",
			"pt-BR": "Prefere email? Escreva para",
		},
	},
	footer: {
		resumeEn: {
			en: "Resume in English (PDF)",
			"pt-BR": "Currículo em inglês (PDF)",
		},
		resumePt: {
			en: "Resume in Portuguese (PDF)",
			"pt-BR": "Currículo em português (PDF)",
		},
	},
	home: {
		headline: {
			en: "From problem definition to production.",
			"pt-BR": "Da definição do problema ao software em produção.",
		},
		intro: {
			en: [
				"I'm Guilherme Martins, a Software Engineer focused on product engineering and software architecture.",
				"I build and evolve full-stack products, using coding agents throughout the development lifecycle in a spec-driven workflow with scoped tasks, tests, and human review.",
				"I've worked with teams in Brazil and the UK across fintech, AI-driven cybersecurity, and healthcare, among others.",
			],
			"pt-BR": [
				"Sou Guilherme Martins, Software Engineer com foco em engenharia de produto e arquitetura de software.",
				"Construo e evoluo produtos full-stack, usando coding agents ao longo do ciclo de desenvolvimento em um processo orientado por especificações, com tarefas delimitadas, testes e revisão humana.",
				"Já trabalhei com equipes no Brasil e no Reino Unido em fintech, cibersegurança com IA e saúde, entre outros.",
			],
		},
		workCta: { en: "See the cases", "pt-BR": "Ver cases" },
		workHeading: { en: "Selected cases", "pt-BR": "Cases selecionados" },
		readCaseStudy: {
			en: "Read the case study",
			"pt-BR": "Ler o estudo de caso",
		},
		capabilitiesHeading: {
			en: "What I work on",
			"pt-BR": "No que eu trabalho",
		},
		experienceHeading: { en: "Where I have worked", "pt-BR": "Onde trabalhei" },
		fullHistory: { en: "Full background", "pt-BR": "Trajetória completa" },
		howIWorkLink: { en: "How I work", "pt-BR": "Como trabalho" },
		openSourceHeading: {
			en: "Client and community work",
			"pt-BR": "Clientes e comunidade",
		},
		// The hero's identity map (docs/positioning.md, "Identity map"). Name,
		// role and location come from profile and meta.
		identityMap: {
			photoAlt: {
				en: "Portrait of Guilherme Martins",
				"pt-BR": "Retrato de Guilherme Martins",
			},
			listLabel: {
				en: "Professional identity map",
				"pt-BR": "Mapa de identidade profissional",
			},
			dimensions: [
				{
					title: {
						en: "Product Engineering",
						"pt-BR": "Engenharia de produto",
					},
					line: {
						en: "Problem framing · end-to-end ownership · product iteration",
						"pt-BR":
							"Definição do problema · ownership de ponta a ponta · evolução do produto",
					},
				},
				{
					title: {
						en: "Software Architecture",
						"pt-BR": "Arquitetura de software",
					},
					line: {
						en: "System design · technical trade-offs · reliability",
						"pt-BR":
							"Design de sistemas · trade-offs técnicos · confiabilidade",
					},
				},
				{
					title: {
						en: "Agentic Engineering",
						"pt-BR": "Agentic engineering",
					},
					line: {
						en: "Coding agents · spec-driven workflows · verification",
						"pt-BR":
							"Coding agents · workflows orientados por especificação · verificação",
					},
				},
				{
					title: {
						en: "AI-powered Features",
						"pt-BR": "Funcionalidades com IA",
					},
					line: {
						en: "LLM integration · tool use · guardrails",
						"pt-BR": "Integração com LLMs · tool use · guardrails",
					},
				},
				{
					title: {
						en: "Full-stack Engineering",
						"pt-BR": "Engenharia full-stack",
					},
					line: {
						en: "Frontend · backend · APIs · system integration",
						"pt-BR": "Frontend · backend · APIs · integração de sistemas",
					},
				},
				{
					title: {
						en: "Communication & Collaboration",
						"pt-BR": "Comunicação e colaboração",
					},
					line: {
						en: "International teams · fluent English · clear communication",
						"pt-BR":
							"Times internacionais · inglês fluente · comunicação clara",
					},
				},
			],
			principles: {
				en: "Product thinking · engineering rigor · human judgment",
				"pt-BR": "Visão de produto · rigor de engenharia · julgamento humano",
			},
			grounding: {
				en: "Every concept is grounded in engineering practice.",
				"pt-BR": "Cada conceito se apoia na prática de engenharia.",
			},
		},
	},
	capabilities: [
		{
			title: {
				en: "Product engineering across the stack",
				"pt-BR": "Engenharia de produto em toda a stack",
			},
			body: {
				en: "From requirements and architecture to delivery and production support, in my own SaaS and in client systems for healthcare and food service.",
				"pt-BR":
					"Dos requisitos e da arquitetura à entrega e sustentação em produção, no meu próprio SaaS e em sistemas de clientes nas áreas de saúde e alimentação.",
			},
			evidence: {
				label: { en: "Priorize.me", "pt-BR": "Priorize.me" },
				to: "/cases/priorize-me",
			},
		},
		{
			title: {
				en: "Software architecture",
				"pt-BR": "Arquitetura de software",
			},
			body: {
				en: "Systems that replay ingested events, and payment APIs that are idempotent, so a retry never charges twice (modular hexagonal cores, replayable event ingestion, idempotent payment APIs). Decisions are recorded as ADRs. On the frontend, application architecture and a design system built from the first version.",
				"pt-BR":
					"Sistemas que reprocessam eventos ingeridos e APIs de pagamento idempotentes, em que uma nova tentativa nunca cobra duas vezes (cores modulares e hexagonais, ingestão de eventos reprocessável, idempotência de pagamentos). Decisões registradas em ADRs. No frontend, arquitetura de aplicação e um design system construído desde a primeira versão.",
			},
			evidence: {
				label: {
					en: "Payments API project",
					"pt-BR": "Projeto da API de pagamentos",
				},
				to: "/projects",
				hash: "payments-api-node",
			},
		},
		{
			title: { en: "Agentic engineering", "pt-BR": "Agentic engineering" },
			body: {
				en: "Spec-driven development with coding agents: specs, bounded tasks, tests and human review in every change.",
				"pt-BR":
					"Desenvolvimento spec-driven com agentes de código: specs, tarefas delimitadas, testes e revisão humana em cada mudança.",
			},
			evidence: {
				label: { en: "sdd-agentic-flow", "pt-BR": "sdd-agentic-flow" },
				to: "/cases/sdd-agentic-flow",
			},
		},
		{
			title: {
				en: "AI-powered product features",
				"pt-BR": "Funcionalidades de IA em produtos",
			},
			body: {
				en: "LLM integrations with guardrails in an AI-first credit platform, where AI speeds up the flow and people and rules make the decisions. In Priorize.me, an MCP server lets AI clients list, create and move tasks with the account's own permissions.",
				"pt-BR":
					"Integrações de LLM com guardrails numa plataforma de crédito AI-first, em que a IA acelera o fluxo e pessoas e regras tomam as decisões. No Priorize.me, um servidor MCP permite que clientes de IA listem, criem e movam tarefas com as permissões da própria conta.",
			},
			evidence: {
				label: {
					en: "AI-first platform case study",
					"pt-BR": "Estudo de caso da plataforma AI-first",
				},
				to: "/cases/ai-first-online-banking",
			},
		},
	],
	work: {
		heading: { en: "Cases", "pt-BR": "Cases" },
		intro: {
			en: "Case studies, the public products I helped build, and client and community work. Employer work is under confidentiality terms, so the professional case study is anonymized.",
			"pt-BR":
				"Estudos de caso, os produtos públicos que ajudei a construir e trabalhos para clientes e comunidade. O trabalho para empregadores é confidencial, por isso o estudo de caso profissional é anonimizado.",
		},
		professionalHeading: {
			en: "Products I worked on",
			"pt-BR": "Produtos em que trabalhei",
		},
		professionalIntro: {
			en: "Public products I helped build as an employee or contractor. The descriptions and screenshots come from each company's public site; the internal details of the work stay private.",
			"pt-BR":
				"Produtos públicos que ajudei a construir como funcionário ou prestador de serviço. As descrições e imagens vêm do site público de cada empresa; os detalhes internos do trabalho continuam privados.",
		},
		contributions: { en: "What I did", "pt-BR": "O que eu fiz" },
		visitProduct: { en: "Visit the product", "pt-BR": "Ver o produto" },
		otherHeading: {
			en: "Client and community work",
			"pt-BR": "Clientes e comunidade",
		},
		role: { en: "Role", "pt-BR": "Papel" },
		period: { en: "Period", "pt-BR": "Período" },
		stack: { en: "Stack", "pt-BR": "Stack" },
		links: { en: "Links", "pt-BR": "Links" },
		reviewed: { en: "Facts checked on", "pt-BR": "Fatos verificados em" },
		back: { en: "All cases", "pt-BR": "Todos os cases" },
		otherStudies: {
			en: "Other case studies",
			"pt-BR": "Outros estudos de caso",
		},
		present: { en: "present", "pt-BR": "atual" },
		fullImage: {
			en: "Open the full-size diagram",
			"pt-BR": "Abrir o diagrama em tamanho real",
		},
	},
	projects: {
		heading: { en: "More projects", "pt-BR": "Mais projetos" },
		intro: {
			en: "Smaller projects, technical challenges and earlier work, kept here for reference. The Cases page has my current work in depth.",
			"pt-BR":
				"Projetos menores, desafios técnicos e trabalhos anteriores, reunidos aqui como referência. A página Cases mostra meu trabalho atual em profundidade.",
		},
		recent: {
			en: "Recent projects and technical challenges",
			"pt-BR": "Projetos recentes e desafios técnicos",
		},
		earlier: { en: "Earlier projects", "pt-BR": "Projetos anteriores" },
		demo: { en: "Live demo", "pt-BR": "Demo" },
		source: { en: "Source code", "pt-BR": "Código-fonte" },
		link: { en: "More projects", "pt-BR": "Mais projetos" },
	},
	about: {
		heading: { en: "About", "pt-BR": "Sobre" },
		intro: {
			en: [
				"I'm a software engineer focused on product engineering and software architecture. I build full-stack products that hold up in production, and I use coding agents across the development cycle in a spec-driven process with tests, quality gates and human review.",
				"Architecture is where I am going deepest. On an AI-first credit platform I work on a modular, hexagonal core with replayable event ingestion, and I record decisions as ADRs. I am also studying for a postgraduate specialization in distributed software architecture.",
				"I work agentically: coding agents take part in every step, from spec to review, inside a spec-driven process I open-sourced as sdd-agentic-flow. AI multiplies the work and judgment stays with people, so nothing ships that I have not reviewed and can explain.",
				"I have worked with teams in Brazil and the UK in fintech, SaaS, AI-driven products, cybersecurity, healthcare and creative software. Frontend architecture and design systems remain among my strongest areas, and architecture and technical direction are where I am focusing next.",
			],
			"pt-BR": [
				"Sou engenheiro de software com foco em engenharia de produto e arquitetura de software. Construo produtos full-stack que se sustentam em produção e uso coding agents ao longo do ciclo de desenvolvimento, num processo spec-driven com testes, quality gates e revisão humana.",
				"Arquitetura é onde estou me aprofundando. Numa plataforma de crédito AI-first, trabalho num core modular e hexagonal com ingestão de eventos reprocessável e registro as decisões em ADRs. Também estou cursando uma especialização em arquitetura de software distribuído.",
				"Trabalho de forma agêntica: agentes de código participam de cada etapa, da spec ao review, dentro de um processo spec-driven que publiquei como open source, o sdd-agentic-flow. A IA multiplica o trabalho e o julgamento continua com as pessoas, então nada vai para produção sem que eu tenha revisado e saiba explicar.",
				"Trabalhei com times no Brasil e no Reino Unido em fintech, SaaS, produtos com IA, cibersegurança, saúde e software criativo. Arquitetura de frontend e design systems continuam entre minhas áreas mais fortes, e arquitetura e direção técnica são o meu próximo foco.",
			],
		},
		confidential: {
			en: "Much of this work is under confidentiality terms. The Cases page shows what is public.",
			"pt-BR":
				"Boa parte desse trabalho é confidencial. A página Cases mostra o que é público.",
		},
		experienceHeading: { en: "Experience", "pt-BR": "Experiência" },
		productLink: { en: "See the product", "pt-BR": "Ver o produto" },
		caseStudyLink: {
			en: "Read the case study",
			"pt-BR": "Ler o estudo de caso",
		},
		educationHeading: { en: "Education", "pt-BR": "Formação" },
		inProgress: { en: "in progress", "pt-BR": "em andamento" },
		toolsHeading: { en: "Tools I use", "pt-BR": "Ferramentas que uso" },
		resumeHeading: { en: "Resume", "pt-BR": "Currículo" },
		resumeBody: {
			en: "The resume has the same history in a printable format.",
			"pt-BR": "O currículo traz a mesma trajetória em formato para impressão.",
		},
	},
	tools: [
		{
			group: {
				en: "AI-assisted engineering",
				"pt-BR": "Engenharia assistida por IA",
			},
			items: ["Claude Code", "Codex", "Cursor", "GitHub Copilot", "MCP"],
		},
		{
			group: { en: "Languages", "pt-BR": "Linguagens" },
			items: ["TypeScript", "JavaScript", "Go", "HTML", "CSS", "SQL"],
		},
		{
			group: { en: "Frontend", "pt-BR": "Frontend" },
			items: [
				"React",
				"Next.js",
				"Angular",
				"Vue.js",
				"React Native",
				"Tailwind CSS",
				"Storybook",
			],
		},
		{
			group: { en: "Backend and data", "pt-BR": "Backend e dados" },
			items: [
				"Node.js",
				"NestJS",
				"Express",
				"REST",
				"GraphQL",
				"PostgreSQL",
				"MongoDB",
			],
		},
		{
			group: { en: "Delivery and quality", "pt-BR": "Entrega e qualidade" },
			items: [
				"AWS",
				"Azure",
				"Google Cloud",
				"Vercel",
				"Docker",
				"GitHub Actions",
				"Playwright",
				"Jest",
			],
		},
	],
	howIWork: {
		heading: { en: "How I work", "pt-BR": "Como trabalho" },
		intro: {
			en: "I use coding agents in every step of the development cycle, inside a process that keeps the work specified, bounded, tested and reviewed. Judgment and accountability for what ships stay with me.",
			"pt-BR":
				"Uso agentes de código em todas as etapas do ciclo de desenvolvimento, dentro de um processo que mantém o trabalho especificado, delimitado, testado e revisado. O julgamento e a responsabilidade pelo que vai para produção continuam comigo.",
		},
		stepsHeading: { en: "The process", "pt-BR": "O processo" },
		steps: [
			{
				title: { en: "Spec first", "pt-BR": "Spec primeiro" },
				body: {
					en: "Every change starts as a written spec: the problem, the scope, what stays out and how to verify the result. Agents work from the spec instead of a chat history.",
					"pt-BR":
						"Toda mudança começa como uma spec escrita: o problema, o escopo, o que fica de fora e como verificar o resultado. Os agentes trabalham a partir da spec, e não de um histórico de chat.",
				},
			},
			{
				title: {
					en: "Plan and bounded tasks",
					"pt-BR": "Plano e tarefas delimitadas",
				},
				body: {
					en: "The spec becomes a plan and small tasks, and each task is checked when it is done, so an agent only holds the context one task needs.",
					"pt-BR":
						"A spec vira um plano e tarefas pequenas, e cada tarefa é verificada ao terminar, para que um agente só carregue o contexto de que uma tarefa precisa.",
				},
			},
			{
				title: {
					en: "Implementation by agents",
					"pt-BR": "Implementação por agentes",
				},
				body: {
					en: "Coding agents implement one task at a time, inside the repository's instructions (AGENTS.md): conventions, commands and the rules they must keep.",
					"pt-BR":
						"Agentes de código implementam uma tarefa por vez, dentro das instruções do repositório (AGENTS.md): convenções, comandos e as regras que precisam respeitar.",
				},
			},
			{
				title: {
					en: "The same gates for everyone",
					"pt-BR": "Os mesmos gates para todos",
				},
				body: {
					en: "Every change passes the same gates, whoever wrote it: typecheck, lint, unit and end-to-end tests, accessibility checks and checks on the built output.",
					"pt-BR":
						"Toda mudança passa pelos mesmos gates, não importa quem escreveu: typecheck, lint, testes unitários e end-to-end, verificações de acessibilidade e checagens do build gerado.",
				},
			},
			{
				title: { en: "Human review", "pt-BR": "Revisão humana" },
				body: {
					en: "I review every change and merge only what I can explain. Accepted findings go back to the agent to fix, and the change is reviewed again.",
					"pt-BR":
						"Reviso toda mudança e só faço merge do que consigo explicar. Os achados aceitos voltam para o agente corrigir, e a mudança é revisada de novo.",
				},
			},
			{
				title: { en: "Decisions in ADRs", "pt-BR": "Decisões em ADRs" },
				body: {
					en: "Decisions that shape the system are written down as architecture decision records, so the reasoning outlives the session that produced it.",
					"pt-BR":
						"Decisões que moldam o sistema são registradas como architecture decision records, para que o raciocínio sobreviva à sessão que o produziu.",
				},
			},
		],
		evidenceHeading: { en: "Where to see it", "pt-BR": "Onde ver isso" },
		evidence: [
			{
				title: { en: "This site", "pt-BR": "Este site" },
				body: {
					en: "Its public repository shows the agent instructions, the architecture decision records, the tests and the CI gates every change passes.",
					"pt-BR":
						"O repositório público mostra as instruções para agentes, os architecture decision records, os testes e os gates de CI pelos quais toda mudança passa.",
				},
				href: "https://github.com/gmartins-dev/portfolio-v4",
				label: { en: "Repository on GitHub", "pt-BR": "Repositório no GitHub" },
			},
			{
				title: { en: "sdd-agentic-flow", "pt-BR": "sdd-agentic-flow" },
				body: {
					en: "The process as an open-source harness of skills for Codex, Cursor, Claude Code and GitHub Copilot.",
					"pt-BR":
						"O processo como um harness open source de skills para Codex, Cursor, Claude Code e GitHub Copilot.",
				},
				to: "/cases/sdd-agentic-flow",
				label: { en: "Read the case study", "pt-BR": "Ler o estudo de caso" },
			},
			{
				title: { en: "AI in products", "pt-BR": "IA em produtos" },
				body: {
					en: "The same rule for AI features: AI speeds up the flow, guardrails and people make the decisions.",
					"pt-BR":
						"A mesma regra para funcionalidades com IA: a IA acelera o fluxo, guardrails e pessoas tomam as decisões.",
				},
				to: "/cases/ai-first-online-banking",
				label: { en: "Read the case study", "pt-BR": "Ler o estudo de caso" },
			},
		],
	},
	notFound: {
		heading: { en: "Page not found", "pt-BR": "Página não encontrada" },
		body: {
			en: "The page you are looking for does not exist or has moved.",
			"pt-BR": "A página que você procura não existe ou mudou de endereço.",
		},
		home: { en: "Go to the home page", "pt-BR": "Ir para a página inicial" },
	},
} as const;
