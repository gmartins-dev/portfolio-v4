import { type Locale, locales, localizedPath } from "./i18n";

export const siteUrl = "https://gmartins.dev";

type PageMeta = {
	locale: Locale;
	/** Locale-neutral path, e.g. "/" or "/about". */
	path: string;
	title: string;
	description: string;
};

/**
 * Head tags for one page in TanStack Router's `head()` shape: title,
 * description, Open Graph basics, a self-referencing canonical and
 * reciprocal hreflang alternates for every locale plus x-default.
 */
export function buildHead({ locale, path, title, description }: PageMeta) {
	const url = (l: Locale) => `${siteUrl}${localizedPath(l, path)}`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url(locale) },
			{ property: "og:locale", content: locale.replace("-", "_") },
		],
		links: [
			{ rel: "canonical", href: url(locale) },
			...locales.map((l) => ({ rel: "alternate", hrefLang: l, href: url(l) })),
			{ rel: "alternate", hrefLang: "x-default", href: url("en") },
		],
	};
}
