import type { Experience, Profile } from "./schema";

// Sources: resume EN/PT-BR (Drive files behind /cv and /cv-br), the LinkedIn
// experience page and the GitHub profile README, checked 2026-10-11. Job
// titles follow LinkedIn, the owner's most recent source: Software Engineer
// for the UK roles, Frontend Developer for the ChatWith.io contract. The
// PT-BR resume still lists older titles; align it when it is next updated.
// Validated against the schemas at build time (src/content/validate.ts).
export const profile: Profile = {
	name: "Guilherme Martins",
	role: "Software Engineer",
	location: { en: "Belo Horizonte, Brazil", "pt-BR": "Belo Horizonte, Brasil" },
	email: "contact@gmartins.dev",
	links: {
		github: "https://github.com/gmartins-dev",
		linkedin: "https://www.linkedin.com/in/gmartins-dev/",
	},
	resume: { en: "/cv", "pt-BR": "/cv-br" },
};

export const experience: Experience[] = [
	{
		company: "gmartins.dev",
		role: "Software Engineer",
		location: {
			en: "Belo Horizonte, Brazil",
			"pt-BR": "Belo Horizonte, Brasil",
		},
		start: "2025-06",
		context: {
			en: "Independent software engineering for clients in several industries.",
			"pt-BR":
				"Engenharia de software independente para clientes de vários setores.",
		},
		highlights: {
			en: [
				"Maintain and evolve a medical workforce management system: shift scheduling, operational workflows and healthcare payments.",
				"Designed and delivered the menu management feature of a data platform for food-service businesses, including statistical analysis.",
				"Build marketing and acquisition websites with semantic HTML, performance work and PostHog analytics.",
			],
			"pt-BR": [
				"Mantenho e evoluo um sistema de gestão de equipes médicas: escalas de plantão, fluxos operacionais e pagamentos na área da saúde.",
				"Projetei e entreguei a funcionalidade de gestão de cardápios de uma plataforma de dados para o setor de alimentação, com análises estatísticas.",
				"Construo sites de marca e aquisição com HTML semântico, foco em performance e analytics com PostHog.",
			],
		},
	},
	{
		company: "Nisien.ai",
		url: "https://nisien.ai",
		role: "Software Engineer",
		location: { en: "Cardiff, UK", "pt-BR": "Cardiff, Reino Unido" },
		start: "2025-03",
		end: "2025-06",
		context: {
			en: "AI-driven cybersecurity startup focused on online threat analysis.",
			"pt-BR":
				"Startup de cibersegurança baseada em IA, focada em análise de ameaças online.",
		},
		highlights: {
			en: [
				"Built the main customer-facing application of the AI product from its first version.",
				"Designed and implemented the company design system: reusable components and frontend architecture.",
				"Worked with the tech lead on architecture, infrastructure alignment and frontend security.",
			],
			"pt-BR": [
				"Construí desde a primeira versão a aplicação principal usada pelos clientes do produto de IA.",
				"Projetei e implementei o design system da empresa: componentes reutilizáveis e arquitetura de frontend.",
				"Trabalhei com o tech lead em decisões de arquitetura, alinhamento de infraestrutura e segurança no frontend.",
			],
		},
	},
	{
		company: "Backbase",
		url: "https://www.backbase.com",
		role: "Software Engineer",
		location: { en: "Cardiff, UK", "pt-BR": "Cardiff, Reino Unido" },
		start: "2024-10",
		end: "2025-02",
		context: {
			en: "Fintech that builds an engagement banking platform for financial institutions.",
			"pt-BR":
				"Fintech que desenvolve uma plataforma de engagement banking para instituições financeiras.",
		},
		highlights: {
			en: [
				"Implemented customer-journey features for onboarding, servicing and lending with cross-functional teams.",
				"Built a proof-of-concept AI chat assistant for staff handling customer requests. It won the internal hackathon.",
			],
			"pt-BR": [
				"Implementei funcionalidades das jornadas de onboarding, serviços e empréstimos com times multidisciplinares.",
				"Criei uma prova de conceito de assistente de chat com IA para apoiar funcionários no atendimento. Ela venceu o hackathon interno.",
			],
		},
	},
	{
		company: "Vochlea",
		url: "https://vochlea.com",
		role: "Software Engineer",
		location: { en: "London, UK", "pt-BR": "Londres, Reino Unido" },
		start: "2024-01",
		end: "2024-08",
		context: {
			en: "AI-powered software for music production.",
			"pt-BR": "Software de produção musical baseado em IA.",
		},
		highlights: {
			en: [
				"Built responsive React, Next.js and TypeScript interfaces backed by a headless CMS and REST APIs.",
				"Maintained Node.js and Express APIs with OAuth2 authentication and authorization.",
				"Worked with marketing, design and product to turn requirements into product experiences.",
			],
			"pt-BR": [
				"Construí interfaces responsivas em React, Next.js e TypeScript integradas a um CMS headless e APIs REST.",
				"Mantive APIs em Node.js e Express com autenticação e autorização OAuth2.",
				"Trabalhei com marketing, design e produto para transformar requisitos em experiências de produto.",
			],
		},
	},
	{
		company: "Loop",
		url: "https://www.loop.software",
		role: "Software Engineer",
		location: {
			en: "Moreton-in-Marsh, UK",
			"pt-BR": "Moreton-in-Marsh, Reino Unido",
		},
		start: "2023-04",
		end: "2023-10",
		context: {
			en: "Property management CRM used by UK estate agencies.",
			"pt-BR":
				"CRM de gestão imobiliária usado por imobiliárias do Reino Unido.",
		},
		highlights: {
			en: [
				"Maintained and extended CRM features as client workflows changed.",
				"Designed user-centred workflows with the product and sales teams.",
			],
			"pt-BR": [
				"Mantive e ampliei funcionalidades do CRM conforme os fluxos dos clientes mudavam.",
				"Desenhei fluxos centrados no usuário com os times de produto e vendas.",
			],
		},
	},
	{
		company: "ChatWith.io",
		url: "https://chatwith.io",
		role: "Frontend Developer",
		location: { en: "Madrid, Spain", "pt-BR": "Madri, Espanha" },
		start: "2022-10",
		end: "2023-03",
		context: {
			en: "Contract work on a SaaS platform that helps businesses run marketing, sales and customer relationships through WhatsApp.",
			"pt-BR":
				"Contrato em uma plataforma SaaS que ajuda empresas a fazer marketing, vendas e relacionamento com clientes pelo WhatsApp.",
		},
		highlights: {
			en: [
				"Built and maintained customer-facing features of the web application in Vue.js and JavaScript.",
				"Investigated and fixed frontend issues that affected the platform's users day to day.",
				"Implemented responsive interfaces from product and design requirements with Sass, Bootstrap and Figma.",
			],
			"pt-BR": [
				"Desenvolvi e mantive funcionalidades da aplicação web usadas pelos clientes, em Vue.js e JavaScript.",
				"Investiguei e corrigi problemas de frontend que afetavam o dia a dia dos usuários da plataforma.",
				"Implementei interfaces responsivas a partir de requisitos de produto e design, com Sass, Bootstrap e Figma.",
			],
		},
	},
	{
		company: "Freelance",
		role: "Full-Stack Developer",
		location: {
			en: "Belo Horizonte, Brazil",
			"pt-BR": "Belo Horizonte, Brasil",
		},
		start: "2021-09",
		end: "2022-10",
		context: {
			en: "Freelance and independent web projects.",
			"pt-BR": "Projetos web freelance e independentes.",
		},
		highlights: {
			en: [
				"Delivered web applications end to end: planning, design, implementation, deployment and client communication.",
			],
			"pt-BR": [
				"Entreguei aplicações web de ponta a ponta: planejamento, design, implementação, deploy e comunicação com clientes.",
			],
		},
	},
];
