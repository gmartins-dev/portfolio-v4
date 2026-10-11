import type { Locale } from "../i18n";

// Placeholder copy for the M1 prerender proof. Real content comes from
// Phase 4 (content production) and replaces this module.
export const pages = {
	home: {
		en: {
			title: "Guilherme Martins — Software Engineer",
			description:
				"Guilherme Martins is a Software Engineer working across the full stack.",
			heading: "Guilherme Martins",
			body: "This site is being rebuilt.",
		},
		"pt-BR": {
			title: "Guilherme Martins — Software Engineer",
			description:
				"Guilherme Martins é Software Engineer com atuação Full-Stack.",
			heading: "Guilherme Martins",
			body: "Este site está sendo reconstruído.",
		},
	},
	about: {
		en: {
			title: "About — Guilherme Martins",
			description: "Professional background of Guilherme Martins.",
			heading: "About",
			body: "Content coming soon.",
		},
		"pt-BR": {
			title: "Sobre — Guilherme Martins",
			description: "Trajetória profissional de Guilherme Martins.",
			heading: "Sobre",
			body: "Conteúdo em breve.",
		},
	},
} satisfies Record<string, Record<Locale, PageCopy>>;

export type PageCopy = {
	title: string;
	description: string;
	heading: string;
	body: string;
};
