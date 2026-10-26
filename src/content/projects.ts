import type { Project } from "./schema";

// Smaller and earlier projects for /projects. Facts from each repository's
// README, package.json and GitHub metadata, and from the v3 project pages,
// checked 2026-10-11. "Technical challenge" marks work done for a hiring
// process; companies are not named. Validated at build time
// (src/content/validate.ts).
export const projects: Project[] = [
	{
		// Was a case study until 2026-10-25; moved here by the owner because it
		// was done for a hiring process. /work/payments-api-node redirects here.
		slug: "payments-api-node",
		title: "Idempotent payments API",
		year: 2026,
		group: "recent",
		kind: { en: "Technical challenge", "pt-BR": "Desafio técnico" },
		summary: {
			en: "A payment API where retries and concurrent requests with the same Idempotency-Key always return the same stored result, without duplicate processing. PostgreSQL is the only source of truth, and integration tests run against a real database.",
			"pt-BR":
				"Uma API de pagamentos em que retentativas e requisições concorrentes com a mesma Idempotency-Key sempre devolvem o mesmo resultado salvo, sem processamento duplicado. O PostgreSQL é a única fonte de verdade, e os testes de integração rodam contra um banco real.",
		},
		stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "React", "Vite"],
		source: "https://github.com/gmartins-dev/payments-api-node",
		demo: "https://payments-api-node-frontend.vercel.app",
	},
	{
		slug: "fintech-dashboard",
		title: "Fintech dashboard",
		year: 2025,
		group: "recent",
		kind: { en: "Personal project", "pt-BR": "Projeto pessoal" },
		summary: {
			en: "A financial portfolio dashboard with allocation and performance charts, a positions table, and light and dark themes.",
			"pt-BR":
				"Um dashboard de carteira de investimentos com gráficos de alocação e desempenho, tabela de posições e temas claro e escuro.",
		},
		stack: ["Next.js 14", "TypeScript", "Recharts"],
		source: "https://github.com/gmartins-dev/fintech-dashboard",
		demo: "https://fintech-dashboard-umber.vercel.app",
	},
	{
		slug: "task-manager",
		title: "Task manager",
		year: 2025,
		group: "recent",
		kind: { en: "Full-stack exercise", "pt-BR": "Exercício full-stack" },
		summary: {
			en: "Projects and tasks with JWT authentication and a drag-and-drop kanban board, built as a frontend and backend monorepo from a written requirements spec.",
			"pt-BR":
				"Projetos e tarefas com autenticação JWT e um kanban com arrastar e soltar, construído como monorepo de frontend e backend a partir de uma especificação de requisitos.",
		},
		stack: [
			"React",
			"TypeScript",
			"TanStack Query",
			"Express",
			"Prisma",
			"MySQL",
		],
		source: "https://github.com/gmartins-dev/task-manager",
		demo: "https://task-manager-frontend-three-woad.vercel.app",
	},
	{
		slug: "seller-console",
		title: "Seller console",
		year: 2025,
		group: "recent",
		kind: { en: "Technical challenge", "pt-BR": "Desafio técnico" },
		summary: {
			en: "A lead and opportunity console for sales teams: filtering, search, and converting leads with optimistic updates that roll back on errors.",
			"pt-BR":
				"Um console de leads e oportunidades para times de vendas: filtros, busca e conversão de leads com atualizações otimistas que revertem em caso de erro.",
		},
		stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS"],
		source: "https://github.com/gmartins-dev/seller-console",
		demo: "https://seller-console-fawn.vercel.app",
	},
	{
		slug: "cars-insurance",
		title: "Cars insurance",
		year: 2025,
		group: "recent",
		kind: { en: "Technical challenge", "pt-BR": "Desafio técnico" },
		summary: {
			en: "An Angular app to manage insured vehicles, with validated forms, local persistence and an interface that follows the insurer's visual identity.",
			"pt-BR":
				"Um app em Angular para gerenciar veículos segurados, com formulários validados, persistência local e interface alinhada à identidade visual da seguradora.",
		},
		stack: ["Angular 18", "Signals", "TypeScript"],
		source: "https://github.com/gmartins-dev/cars-insurance",
		demo: "https://cars-insurance-two.vercel.app",
	},
	{
		slug: "drink-runner-roulette",
		title: "Drink Runner Roulette",
		year: 2025,
		group: "recent",
		kind: { en: "Personal project", "pt-BR": "Projeto pessoal" },
		summary: {
			en: "A web app that randomly picks who makes the next round of drinks, with participant management backed by a C# .NET API.",
			"pt-BR":
				"Um app web que sorteia quem prepara a próxima rodada de bebidas, com gestão de participantes integrada a uma API em C# .NET.",
		},
		stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui"],
		source: "https://github.com/gmartins-dev/tea-roulette",
	},
	{
		slug: "sharespot",
		title: "ShareSpot",
		year: 2022,
		group: "earlier",
		kind: { en: "Full-stack project", "pt-BR": "Projeto full-stack" },
		summary: {
			en: "A social network for sharing favorite songs, playlists and podcasts.",
			"pt-BR":
				"Uma rede social para compartilhar músicas, playlists e podcasts favoritos.",
		},
		stack: ["Next.js", "React", "Node.js", "MongoDB", "styled-components"],
		source: "https://github.com/gmartins-dev/next-socialdev",
		demo: "https://next-socialdev.vercel.app/",
	},
	{
		slug: "bemyguess",
		title: "BeMyGuess",
		year: 2022,
		group: "earlier",
		kind: { en: "Full-stack project", "pt-BR": "Projeto full-stack" },
		summary: {
			en: "A cross-platform app for the 2022 World Cup where friends create pools and predict match results together.",
			"pt-BR":
				"Um app multiplataforma da Copa do Mundo de 2022 em que amigos criam bolões e tentam prever os resultados juntos.",
		},
		stack: ["React Native", "Next.js", "Node.js", "TypeScript", "NativeBase"],
		source: "https://github.com/gmartins-dev/world-cup-project",
	},
	{
		slug: "online-bank",
		title: "Online Bank",
		year: 2022,
		group: "earlier",
		kind: { en: "Mobile study", "pt-BR": "Estudo mobile" },
		summary: {
			en: "A banking app interface for iOS and Android, animated with Moti and React Native Reanimated.",
			"pt-BR":
				"Uma interface de app bancário para iOS e Android, animada com Moti e React Native Reanimated.",
		},
		stack: ["React Native", "Reanimated", "Moti"],
		source: "https://github.com/gmartins-dev/mobile-finances-app",
	},
	{
		slug: "flappybird",
		title: "FlappyBird",
		year: 2022,
		group: "earlier",
		kind: { en: "Mobile game", "pt-BR": "Jogo mobile" },
		summary: {
			en: "A Flappy Bird game for iOS and Android with a React Native game engine and Matter.js physics.",
			"pt-BR":
				"Um jogo Flappy Bird para iOS e Android com uma game engine em React Native e física do Matter.js.",
		},
		stack: ["React Native", "Matter.js", "TypeScript"],
		source: "https://github.com/gmartins-dev/mobile-flappybird",
	},
	{
		slug: "netflix-clone",
		title: "Netflix clone",
		year: 2022,
		group: "earlier",
		kind: { en: "Technical challenge", "pt-BR": "Desafio técnico" },
		summary: {
			en: "A Netflix-style catalog on The Movie Database API, built to study Next.js server-side rendering in practice.",
			"pt-BR":
				"Um catálogo no estilo Netflix com a API do The Movie Database, feito para estudar na prática a renderização no servidor do Next.js.",
		},
		stack: ["Next.js", "React", "styled-components", "Material UI"],
		source: "https://github.com/gmartins-dev/accurate-frontend",
		demo: "https://accurate-frontend.vercel.app/",
	},
];
