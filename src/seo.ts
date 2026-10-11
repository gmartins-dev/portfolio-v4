import { copy } from "./content/copy";
import { profile } from "./content/profile";
import type { CaseStudy } from "./content/schema";
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
	/** Articles (case studies) get og:type=article and their modified date. */
	article?: { modified: string };
};

const absolute = (path: string) => `${siteUrl}${path}`;

/** Default social card per locale (scripts/build-og-images.mjs). */
export const defaultOgImage = (locale: Locale) => ({
	src: `/images/og/home-${locale}.png`,
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
	article,
}: PageMeta) {
	const url = (l: Locale) => absolute(localizedPath(l, path));

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: article ? "article" : "website" },
			...(article
				? [{ property: "article:modified_time", content: article.modified }]
				: []),
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

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const pageUrl = (locale: Locale, path: string) =>
	absolute(localizedPath(locale, path));

/** One JSON-LD document: nodes linked by @id in a single @graph. */
const graph = (nodes: object[]) => ({
	"@context": "https://schema.org",
	"@graph": nodes,
});

/** The site owner, from the content model. Included in every page's graph. */
function personNode() {
	return {
		"@type": "Person",
		"@id": personId,
		name: profile.name,
		jobTitle: profile.role,
		url: siteUrl,
		email: `mailto:${profile.email}`,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Belo Horizonte",
			addressCountry: "BR",
		},
		knowsAbout: copy.capabilities.map((capability) => capability.title.en),
		sameAs: [profile.links.github, profile.links.linkedin],
	};
}

function websiteNode(locale: Locale) {
	return {
		"@type": "WebSite",
		"@id": websiteId,
		url: siteUrl,
		name: profile.name,
		inLanguage: locale,
		author: { "@id": personId },
	};
}

function breadcrumbNode(
	locale: Locale,
	trail: { name: string; path: string }[],
) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: trail.map((crumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: crumb.name,
			item: pageUrl(locale, crumb.path),
		})),
	};
}

/** Home: the person and the site. */
export function homeStructuredData(locale: Locale) {
	return [graph([personNode(), websiteNode(locale)])];
}

/** About: a ProfilePage whose main entity is the person. */
export function aboutStructuredData(locale: Locale) {
	return [
		graph([
			{
				"@type": "ProfilePage",
				"@id": `${pageUrl(locale, "/about")}#page`,
				url: pageUrl(locale, "/about"),
				name: copy.meta.about.title[locale],
				inLanguage: locale,
				isPartOf: { "@id": websiteId },
				mainEntity: { "@id": personId },
			},
			personNode(),
			websiteNode(locale),
		]),
	];
}

/** Work listing: a collection of the case studies, with a breadcrumb. */
export function workStructuredData(locale: Locale, studies: CaseStudy[]) {
	return [
		graph([
			{
				"@type": "CollectionPage",
				url: pageUrl(locale, "/work"),
				name: copy.meta.work.title[locale],
				inLanguage: locale,
				isPartOf: { "@id": websiteId },
				hasPart: studies.map((study) => ({
					"@id": `${pageUrl(locale, `/work/${study.slug}`)}#article`,
				})),
			},
			breadcrumbNode(locale, [
				{ name: copy.nav.home[locale], path: "/" },
				{ name: copy.nav.work[locale], path: "/work" },
			]),
			personNode(),
			websiteNode(locale),
		]),
	];
}

/**
 * Case study: a TechArticle by the person about the project's source code,
 * with dateModified from the last fact check and a breadcrumb.
 */
export function caseStudyStructuredData(locale: Locale, study: CaseStudy) {
	const path = `/work/${study.slug}`;
	const repository = study.links.find((link) =>
		link.href.startsWith("https://github.com/"),
	);
	return [
		graph([
			{
				"@type": "TechArticle",
				"@id": `${pageUrl(locale, path)}#article`,
				url: pageUrl(locale, path),
				headline: study.title,
				description: study.summary[locale],
				inLanguage: locale,
				dateModified: study.reviewed,
				image: absolute(caseStudyOgImage(locale, study).src),
				author: { "@id": personId },
				isPartOf: { "@id": websiteId },
				...(repository && {
					about: {
						"@type": "SoftwareSourceCode",
						name: study.title,
						codeRepository: repository.href,
					},
				}),
			},
			breadcrumbNode(locale, [
				{ name: copy.nav.home[locale], path: "/" },
				{ name: copy.nav.work[locale], path: "/work" },
				{ name: study.title, path },
			]),
			personNode(),
			websiteNode(locale),
		]),
	];
}

/** Social card for a case study (scripts/build-og-images.mjs). */
export const caseStudyOgImage = (locale: Locale, study: CaseStudy) => ({
	src: `/images/og/work-${study.slug}-${locale}.png`,
	alt: study.summary[locale],
});

/**
 * sitemap.xml listing every page once per locale, with hreflang alternates.
 * lastmod is set only where a real date exists (case study fact checks);
 * search engines ignore lastmod once it proves unreliable.
 */
export function buildSitemap(pages: { path: string; lastmod?: string }[]) {
	const entries = pages.flatMap(({ path, lastmod }) =>
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
				...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
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
