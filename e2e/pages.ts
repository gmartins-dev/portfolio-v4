/** Every prerendered page, with the h1 it must show. Kept in sync by e2e/pages.spec.ts. */
export const pages = [
	{ path: "/", lang: "en", h1: "From problem definition to production." },
	{ path: "/work", lang: "en", h1: "Cases" },
	{
		path: "/work/ai-first-online-banking",
		lang: "en",
		h1: "AI-first online banking platform",
	},
	{ path: "/work/sdd-agentic-flow", lang: "en", h1: "sdd-agentic-flow" },
	{ path: "/work/priorize-me", lang: "en", h1: "Priorize.me" },
	{ path: "/projects", lang: "en", h1: "More projects" },
	{ path: "/how-i-work", lang: "en", h1: "How I work" },
	{ path: "/about", lang: "en", h1: "About" },
	{
		path: "/pt-br",
		lang: "pt-BR",
		h1: "Da definição do problema ao software em produção.",
	},
	{ path: "/pt-br/work", lang: "pt-BR", h1: "Cases" },
	{
		path: "/pt-br/work/ai-first-online-banking",
		lang: "pt-BR",
		h1: "AI-first online banking platform",
	},
	{
		path: "/pt-br/work/sdd-agentic-flow",
		lang: "pt-BR",
		h1: "sdd-agentic-flow",
	},
	{ path: "/pt-br/work/priorize-me", lang: "pt-BR", h1: "Priorize.me" },
	{ path: "/pt-br/projects", lang: "pt-BR", h1: "Mais projetos" },
	{ path: "/pt-br/how-i-work", lang: "pt-BR", h1: "Como trabalho" },
	{ path: "/pt-br/about", lang: "pt-BR", h1: "Sobre" },
] as const;
