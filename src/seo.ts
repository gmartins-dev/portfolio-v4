import { copy } from "./content/copy";
import { profile } from "./content/profile";
import { type Locale, locales, localizedPath } from "./i18n";

export const siteUrl = "https://gmartins.dev";

type PageMeta = {
	locale: Locale;
	/** Locale-neutral path, e.g. "/" or "/about". */
	path: string;
	title: string;
	description: string;
	/** Social preview image under public/, 1200x630. Defaults to the site card. */
	image?: { src: string; alt: string };
	/** JSON-LD objects describing the page. */
	structuredData?: object[];
};

const absolute = (path: string) => `${siteUrl}${path}`;

/** Default social card per locale (scripts/build-og-images.mjs). */
export const defaultOgImage = (locale: Locale) => ({
	src: `/og/home-${locale}.png`,
	alt: copy.meta.home.description[locale],
});

/**
 * Head tags for one page in TanStack Router's `head()` shape: title,
 * description, Open Graph and Twitter cards, a self-referencing canonical,
 * reciprocal hreflang alternates for every locale plus x-default, and
 * optional JSON-LD.
 */
export function buildHead({
	locale,
	path,
	title,
	description,
	image = defaultOgImage(locale),
	structuredData = [],
}: PageMeta) {
	const url = (l: Locale) => absolute(localizedPath(l, path));

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: profile.name },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url(locale) },
			{ property: "og:locale", content: locale.replace("-", "_") },
			{ property: "og:image", content: absolute(image.src) },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: image.alt },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "canonical", href: url(locale) },
			...locales.map((l) => ({ rel: "alternate", hrefLang: l, href: url(l) })),
			{ rel: "alternate", hrefLang: "x-default", href: url("en") },
		],
		scripts: structuredData.map((data) => ({
			type: "application/ld+json",
			// Escape "<" so data can never close the script element early.
			children: JSON.stringify(data).replaceAll("<", "\\u003c"),
		})),
	};
}

/** schema.org Person and WebSite for the home page, from the content model. */
export function homeStructuredData(locale: Locale) {
	return [
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"@id": `${siteUrl}/#person`,
			name: profile.name,
			jobTitle: profile.role,
			url: siteUrl,
			email: `mailto:${profile.email}`,
			address: {
				"@type": "PostalAddress",
				addressLocality: "Belo Horizonte",
				addressCountry: "BR",
			},
			sameAs: [profile.links.github, profile.links.linkedin],
		},
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			url: siteUrl,
			name: profile.name,
			inLanguage: locale,
			author: { "@id": `${siteUrl}/#person` },
		},
	];
}

/** sitemap.xml listing every page once per locale, with hreflang alternates. */
export function buildSitemap(neutralPaths: string[]) {
	const entries = neutralPaths.flatMap((path) =>
		locales.map((locale) => {
			const alternates = [
				...locales.map(
					(l) =>
						`    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(localizedPath(l, path))}"/>`,
				),
				`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(localizedPath("en", path))}"/>`,
			];
			return [
				"  <url>",
				`    <loc>${absolute(localizedPath(locale, path))}</loc>`,
				...alternates,
				"  </url>",
			].join("\n");
		}),
	);
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...entries,
		"</urlset>",
		"",
	].join("\n");
}
