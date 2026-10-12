import type { ProfessionalWork } from "./schema";

// Public products the owner worked on as an employee or contractor, newest
// first. Product summaries paraphrase each company's public site (checked
// 2026-10-11; ChatWith.io from its February 2023 Internet Archive copy,
// because the live site now shows a different product); contributions come from the resume, the LinkedIn experience
// page and the owner's notes. Internal details stay private. Role, period and
// location are read from `experience` in profile.ts. Validated at build time
// (src/content/validate.ts).
export const professionalWork: ProfessionalWork[] = [
	{
		slug: "nisien-ai",
		company: "Nisien.ai",
		product: "Hero Platform",
		url: "https://nisien.ai/our-solution/hero/",
		summary: {
			en: "An AI platform that detects online threats and harmful content and helps teams resolve issues before they escalate, backed by research in cyber-risk detection, criminology and machine learning.",
			"pt-BR":
				"Uma plataforma de IA que detecta ameaças e conteúdo nocivo online e ajuda equipes a resolver problemas antes que se agravem, apoiada em pesquisa sobre detecção de riscos cibernéticos, criminologia e machine learning.",
		},
		contributions: {
			en: [
				"Built the main customer-facing application from its first version, focused on maintainability, usability and performance.",
				"Designed the reusable UI foundations of the product's design system and component architecture.",
				"Worked with the tech lead on frontend architecture and on decisions about application design, infrastructure and security.",
			],
			"pt-BR": [
				"Construí desde a primeira versão a aplicação principal usada pelos clientes, com foco em manutenção, usabilidade e performance.",
				"Projetei as bases reutilizáveis de interface do design system e da arquitetura de componentes do produto.",
				"Trabalhei com o tech lead na arquitetura de frontend e em decisões de design da aplicação, infraestrutura e segurança.",
			],
		},
		image: {
			src: "/images/work/nisien-ai",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: 'The Hero Platform page on nisien.ai: "Detect online threats and resolve issues before they escalate".',
				"pt-BR":
					'A página da Hero Platform em nisien.ai: "Detect online threats and resolve issues before they escalate".',
			},
		},
	},
	{
		slug: "backbase",
		company: "Backbase",
		product: "Backbase",
		url: "https://www.backbase.com/digital-banking",
		summary: {
			en: "A digital banking platform that retail and business banks use to build onboarding, servicing and lending journeys for their customers.",
			"pt-BR":
				"Uma plataforma de banco digital que bancos de varejo e de empresas usam para construir jornadas de onboarding, serviços e crédito para seus clientes.",
		},
		contributions: {
			en: [
				"Built customer-facing features and composable frontend solutions for onboarding, servicing and lending with cross-functional teams.",
				"Built a proof of concept of an AI conversational banking assistant for an internal hackathon. It won the competition.",
			],
			"pt-BR": [
				"Desenvolvi funcionalidades para clientes finais e soluções de frontend componíveis para onboarding, serviços e crédito, com times multidisciplinares.",
				"Criei uma prova de conceito de assistente bancário conversacional com IA para um hackathon interno. Ela venceu a competição.",
			],
		},
		// Backbase's own frontend job posts name Angular and TypeScript as the
		// stack of its web SDK.
		stack: ["Angular", "TypeScript"],
		image: {
			src: "/images/work/backbase",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The Backbase digital banking suite page, with mobile banking screens next to the headline.",
				"pt-BR":
					"A página da suíte de banco digital da Backbase, com telas de banco no celular ao lado do título.",
			},
		},
	},
	{
		slug: "vochlea",
		company: "Vochlea",
		product: "Vochlea",
		url: "https://vochlea.com",
		summary: {
			en: "A creative tech company whose AI software, such as Dubler 2, lets music makers write, produce and perform with their voice.",
			"pt-BR":
				"Uma empresa de tecnologia criativa cujo software com IA, como o Dubler 2, permite que músicos componham, produzam e se apresentem usando a voz.",
		},
		contributions: {
			en: [
				"Worked on the web team, not on the audio products: the website, the backoffice app, the API and the marketplace.",
				"Built React, Next.js and TypeScript interfaces backed by a headless CMS and REST APIs.",
				"Worked on Node.js and Express backend features, including authentication and OAuth2 integrations.",
				"Worked with engineering, product, design and marketing to ship and evolve customer-facing software.",
			],
			"pt-BR": [
				"Trabalhei no time web, não nos produtos de áudio: o site, o app de backoffice, a API e o marketplace.",
				"Construí interfaces em React, Next.js e TypeScript integradas a um CMS headless e APIs REST.",
				"Trabalhei em funcionalidades de backend em Node.js e Express, incluindo autenticação e integrações OAuth2.",
				"Trabalhei com engenharia, produto, design e marketing para entregar e evoluir software usado pelos clientes.",
			],
		},
		stack: [
			"React",
			"Next.js",
			"TypeScript",
			"Node.js",
			"Express",
			"OAuth2",
			"Headless CMS",
			"SCSS",
			"Jest",
		],
		image: {
			src: "/images/work/vochlea",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: 'The Vochlea home page: "Make the music in your head", above cards for Dubler 2 and DubBox.',
				"pt-BR":
					'A página inicial da Vochlea: "Make the music in your head", acima dos cards do Dubler 2 e do DubBox.',
			},
		},
	},
	{
		slug: "loop",
		company: "Loop",
		product: "Loop",
		url: "https://www.loop.software/features",
		summary: {
			en: "All-in-one software for UK estate agencies: sales pipelines, lettings and client accounting, used by agencies from small startups to national networks.",
			"pt-BR":
				"Um software completo para imobiliárias do Reino Unido: funil de vendas, locações e contabilidade de clientes, usado de pequenas imobiliárias a redes nacionais.",
		},
		contributions: {
			en: [
				"Built and maintained features of the property management CRM in Angular and TypeScript.",
				"Turned requirements from product and sales into workflow improvements for estate agents.",
				"Helped keep an existing production SaaS reliable while it evolved.",
			],
			"pt-BR": [
				"Desenvolvi e mantive funcionalidades do CRM de gestão imobiliária em Angular e TypeScript.",
				"Transformei requisitos de produto e vendas em melhorias nos fluxos de trabalho dos corretores.",
				"Ajudei a manter confiável um SaaS em produção enquanto ele evoluía.",
			],
		},
		stack: ["Angular", "TypeScript", "JavaScript", "Angular Material"],
		image: {
			src: "/images/work/loop",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The Loop features page, with a preview of the estate agency dashboard below the headline.",
				"pt-BR":
					"A página de funcionalidades da Loop, com uma prévia do painel da imobiliária abaixo do título.",
			},
		},
	},
	{
		slug: "chatwith-io",
		company: "ChatWith.io",
		product: "ChatWith.io",
		// The live site shows a different product now; link the archived copy.
		url: "https://web.archive.org/web/20230202155443/https://chatwith.io/",
		summary: {
			en: "A SaaS platform for customer service and sales over WhatsApp: chat links and widgets, campaigns, polls, bookings, payments and a shared inbox.",
			"pt-BR":
				"Uma plataforma SaaS de atendimento e vendas pelo WhatsApp: links e widgets de conversa, campanhas, enquetes, agendamentos, pagamentos e uma caixa de entrada compartilhada.",
		},
		contributions: {
			en: [
				"Built and maintained customer-facing features of the web application in Vue.js.",
				"Investigated and fixed frontend issues that affected users day to day.",
				"Implemented responsive interfaces from product and design requirements.",
			],
			"pt-BR": [
				"Desenvolvi e mantive funcionalidades da aplicação web usadas pelos clientes, em Vue.js.",
				"Investiguei e corrigi problemas de frontend que afetavam o dia a dia dos usuários.",
				"Implementei interfaces responsivas a partir de requisitos de produto e design.",
			],
		},
		stack: ["Vue.js", "JavaScript", "Sass", "Bootstrap"],
		image: {
			src: "/images/work/chatwith-io",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The ChatWith.io home page in February 2023, from the Internet Archive: a form to create a WhatsApp chat link, under a menu of widgets, campaigns, polls, payments, bookings and inbox.",
				"pt-BR":
					"A página inicial do ChatWith.io em fevereiro de 2023, pelo Internet Archive: um formulário para criar um link de conversa no WhatsApp, abaixo de um menu com widgets, campanhas, enquetes, pagamentos, agendamentos e caixa de entrada.",
			},
		},
	},
];
