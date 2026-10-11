/** Every prerendered page, with the h1 it must show. Kept in sync by e2e/pages.spec.ts. */
export const pages = [
	{ path: "/", lang: "en", h1: "From problem definition to production." },
	{ path: "/work", lang: "en", h1: "Work" },
	{ path: "/work/sdd-agentic-flow", lang: "en", h1: "sdd-agentic-flow" },
	{ path: "/work/priorize-me", lang: "en", h1: "Priorize.me" },
	{
		path: "/work/payments-api-node",
		lang: "en",
		h1: "Idempotent payments API",
	},
	{ path: "/projects", lang: "en", h1: "More projects" },
	{ path: "/about", lang: "en", h1: "About" },
	{
		path: "/pt-br",
		lang: "pt-BR",
		h1: "Da definição do problema ao software em produção.",
	},
	{ path: "/pt-br/work", lang: "pt-BR", h1: "Trabalhos" },
	{
		path: "/pt-br/work/sdd-agentic-flow",
		lang: "pt-BR",
		h1: "sdd-agentic-flow",
	},
	{ path: "/pt-br/work/priorize-me", lang: "pt-BR", h1: "Priorize.me" },
	{
		path: "/pt-br/work/payments-api-node",
		lang: "pt-BR",
		h1: "Idempotent payments API",
	},
	{ path: "/pt-br/projects", lang: "pt-BR", h1: "Mais projetos" },
	{ path: "/pt-br/about", lang: "pt-BR", h1: "Sobre" },
] as const;
