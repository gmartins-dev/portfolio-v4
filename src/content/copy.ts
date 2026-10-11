import type { Locale } from "../i18n";
import type { Localized } from "./schema";

/** Pick the string for a locale. */
export const t = (value: Localized, locale: Locale) => value[locale];

// Page and interface copy. Factual statements trace back to the resumes and
// the GitHub profile README (see profile.ts); everything here is draft copy
// pending the Phase 1 positioning review.
export const copy = {
	meta: {
		siteName: { en: "Guilherme Martins", "pt-BR": "Guilherme Martins" },
		home: {
			title: {
				en: "Guilherme Martins | Software Engineer",
				"pt-BR": "Guilherme Martins | Software Engineer",
			},
			description: {
				en: "Software Engineer with strong frontend expertise and full-stack experience, building products with teams in Brazil and the UK.",
				"pt-BR":
					"Software Engineer com forte experiência em frontend e atuação full-stack, construindo produtos com times no Brasil e no Reino Unido.",
			},
		},
		work: {
			title: {
				en: "Work and case studies | Guilherme Martins",
				"pt-BR": "Trabalhos e estudos de caso | Guilherme Martins",
			},
			description: {
				en: "Case studies and projects by Guilherme Martins: a collaborative SaaS, developer tooling, backend consistency, client websites and community work.",
				"pt-BR":
					"Estudos de caso e projetos de Guilherme Martins: um SaaS colaborativo, ferramentas para desenvolvedores, consistência no backend, sites para clientes e projetos da comunidade.",
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
				en: "Professional background of Guilherme Martins: experience in fintech, cybersecurity, SaaS, healthcare and creative software.",
				"pt-BR":
					"Trajetória de Guilherme Martins: experiência em fintech, cibersegurança, SaaS, saúde e software criativo.",
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
		work: { en: "Work", "pt-BR": "Trabalhos" },
		about: { en: "About", "pt-BR": "Sobre" },
		resume: { en: "Resume", "pt-BR": "Currículo" },
		skip: { en: "Skip to content", "pt-BR": "Pular para o conteúdo" },
		language: { en: "Português", "pt-BR": "English" },
		languageLabel: { en: "Ler em português", "pt-BR": "Read in English" },
	},
	theme: {
		label: { en: "Color theme", "pt-BR": "Tema de cores" },
		light: { en: "Light", "pt-BR": "Claro" },
		dark: { en: "Dark", "pt-BR": "Escuro" },
		system: { en: "System", "pt-BR": "Sistema" },
	},
	contact: {
		heading: { en: "Let's talk", "pt-BR": "Vamos conversar" },
		body: {
			en: "For roles, consulting or open-source collaboration, email is the fastest way to reach me.",
			"pt-BR":
				"Para vagas, consultoria ou colaboração em open source, email é o jeito mais rápido de falar comigo.",
		},
		email: { en: "Email me", "pt-BR": "Enviar email" },
	},
	footer: {
		resumeEn: { en: "Resume (English)", "pt-BR": "Currículo (inglês)" },
		resumePt: { en: "Resume (Portuguese)", "pt-BR": "Currículo (português)" },
	},
	home: {
		eyebrow: {
			en: "Guilherme Martins, Software Engineer",
			"pt-BR": "Guilherme Martins, Software Engineer",
		},
		headline: {
			en: "From problem definition to production.",
			"pt-BR": "Da definição do problema ao software em produção.",
		},
		intro: {
			en: "Full-stack engineer with deep frontend experience, building and evolving products with teams in Brazil and the UK.",
			"pt-BR":
				"Engenheiro full-stack com forte experiência em frontend, construindo e evoluindo produtos com times no Brasil e no Reino Unido.",
		},
		primaryCta: { en: "Selected work", "pt-BR": "Trabalhos selecionados" },
		workHeading: { en: "Selected work", "pt-BR": "Trabalhos selecionados" },
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
		openSourceHeading: {
			en: "Client and community work",
			"pt-BR": "Clientes e comunidade",
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
				to: "/work/priorize-me",
			},
		},
		{
			title: {
				en: "Frontend architecture and design systems",
				"pt-BR": "Arquitetura de frontend e design systems",
			},
			body: {
				en: "Built the main application and the design system of an AI cybersecurity product from its first version.",
				"pt-BR":
					"Construí a aplicação principal e o design system de um produto de cibersegurança com IA desde a primeira versão.",
			},
			evidence: {
				label: { en: "Nisien.ai", "pt-BR": "Nisien.ai" },
				to: "/about",
			},
		},
		{
			title: {
				en: "Backend services and data consistency",
				"pt-BR": "Serviços de backend e consistência de dados",
			},
			body: {
				en: "APIs in Node.js with PostgreSQL, including idempotent payment processing under concurrent requests.",
				"pt-BR":
					"APIs em Node.js com PostgreSQL, incluindo processamento idempotente de pagamentos com requisições concorrentes.",
			},
			evidence: {
				label: {
					en: "Payments case study",
					"pt-BR": "Estudo de caso de pagamentos",
				},
				to: "/work/payments-api-node",
			},
		},
		{
			title: {
				en: "Developer tooling and AI-assisted engineering",
				"pt-BR": "Ferramentas para devs e engenharia assistida por IA",
			},
			body: {
				en: "Creator of an open-source harness that keeps coding-agent work specified, bounded and verifiable.",
				"pt-BR":
					"Criador de um harness open source que mantém o trabalho de agentes de código especificado, delimitado e verificável.",
			},
			evidence: {
				label: { en: "sdd-agentic-flow", "pt-BR": "sdd-agentic-flow" },
				to: "/work/sdd-agentic-flow",
			},
		},
	],
	work: {
		heading: { en: "Work", "pt-BR": "Trabalhos" },
		intro: {
			en: "Most of my work as an employee, contractor or consultant is private under confidentiality terms, so this page focuses on personal and public projects, plus one anonymized professional case study.",
			"pt-BR":
				"A maior parte do meu trabalho como empregado, contractor ou consultor é privada por termos de confidencialidade, então esta página se concentra em projetos pessoais e públicos, mais um estudo de caso profissional anonimizado.",
		},
		otherHeading: {
			en: "Client and community work",
			"pt-BR": "Clientes e comunidade",
		},
		role: { en: "Role", "pt-BR": "Papel" },
		period: { en: "Period", "pt-BR": "Período" },
		stack: { en: "Stack", "pt-BR": "Stack" },
		links: { en: "Links", "pt-BR": "Links" },
		reviewed: { en: "Facts checked on", "pt-BR": "Fatos verificados em" },
		back: { en: "All work", "pt-BR": "Todos os trabalhos" },
		present: { en: "present", "pt-BR": "atual" },
		fullImage: {
			en: "Open the full-size diagram",
			"pt-BR": "Abrir o diagrama em tamanho real",
		},
	},
	projects: {
		heading: { en: "More projects", "pt-BR": "Mais projetos" },
		intro: {
			en: "Smaller projects, technical challenges and earlier work, kept here for reference. The Work page has my current work in depth.",
			"pt-BR":
				"Projetos menores, desafios técnicos e trabalhos anteriores, reunidos aqui como referência. A página Trabalhos mostra meu trabalho atual em profundidade.",
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
				"I'm a Software Engineer with strong frontend expertise and full-stack experience, building and evolving production software across different products, domains and teams.",
				"I work across the whole lifecycle: understanding product and business requirements, designing the technical solution, then implementation, testing, deployment, production support and continued evolution.",
				"I have worked with teams in Brazil and the UK in fintech, SaaS, AI-driven products, cybersecurity, healthcare and creative software. Frontend remains one of my strongest areas: complex product interfaces, frontend architecture and design systems.",
			],
			"pt-BR": [
				"Sou Software Engineer com forte experiência em frontend e atuação full-stack, construindo e evoluindo software em produção em diferentes produtos, domínios e times.",
				"Atuo em todo o ciclo: entender requisitos de produto e de negócio, desenhar a solução técnica e depois implementar, testar, colocar em produção, sustentar e evoluir.",
				"Trabalhei com times no Brasil e no Reino Unido em fintech, SaaS, produtos com IA, cibersegurança, saúde e software criativo. Frontend continua sendo uma das minhas áreas mais fortes: interfaces de produto complexas, arquitetura de frontend e design systems.",
			],
		},
		confidential: {
			en: "Much of the work below was done for employers and clients under confidentiality terms, so I can't share its details. That's why the Work page focuses on personal and public projects.",
			"pt-BR":
				"Boa parte do trabalho abaixo foi feita para empregadores e clientes sob termos de confidencialidade, por isso não posso compartilhar detalhes. É por isso que a página Trabalhos se concentra em projetos pessoais e públicos.",
		},
		experienceHeading: { en: "Experience", "pt-BR": "Experiência" },
		toolsHeading: { en: "Tools I use", "pt-BR": "Ferramentas que uso" },
		resumeHeading: { en: "Resume", "pt-BR": "Currículo" },
		resumeBody: {
			en: "The resume has the same history in a printable format.",
			"pt-BR": "O currículo traz a mesma trajetória em formato para impressão.",
		},
	},
	tools: [
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
	notFound: {
		heading: { en: "Page not found", "pt-BR": "Página não encontrada" },
		body: {
			en: "The page you are looking for does not exist or has moved.",
			"pt-BR": "A página que você procura não existe ou mudou de endereço.",
		},
		home: { en: "Go to the home page", "pt-BR": "Ir para a página inicial" },
	},
} as const;
