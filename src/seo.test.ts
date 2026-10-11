import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { caseStudies } from "./content/work";
import { formatMonth, localeFromPath, localizedPath } from "./i18n";
import { ogCards } from "./og-cards";
import {
	aboutStructuredData,
	buildHead,
	buildSitemap,
	caseStudyStructuredData,
	defaultOgImage,
	homeStructuredData,
} from "./seo";

describe("localizedPath", () => {
	it("keeps English at the root and prefixes PT-BR", () => {
		expect(localizedPath("en", "/")).toBe("/");
		expect(localizedPath("en", "/about")).toBe("/about");
		expect(localizedPath("pt-BR", "/")).toBe("/pt-br");
		expect(localizedPath("pt-BR", "/about")).toBe("/pt-br/about");
	});

	it("round-trips through localeFromPath", () => {
		expect(localeFromPath(localizedPath("pt-BR", "/about"))).toBe("pt-BR");
		expect(localeFromPath(localizedPath("en", "/about"))).toBe("en");
		expect(localeFromPath("/pt-broken")).toBe("en");
	});
});

describe("buildHead", () => {
	const head = buildHead({
		locale: "pt-BR",
		path: "/about",
		title: "Sobre",
		description: "d",
	});

	it("points canonical at the page itself", () => {
		expect(head.links).toContainEqual({
			rel: "canonical",
			href: "https://gmartins.dev/pt-br/about",
		});
	});

	it("lists every locale plus x-default as alternates", () => {
		const alternates = head.links.filter((l) => l.rel === "alternate");
		expect(alternates).toEqual([
			{ rel: "alternate", hrefLang: "en", href: "https://gmartins.dev/about" },
			{
				rel: "alternate",
				hrefLang: "pt-BR",
				href: "https://gmartins.dev/pt-br/about",
			},
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: "https://gmartins.dev/about",
			},
		]);
	});
});

describe("formatMonth", () => {
	it("formats a month per locale and shows a lone year as is", () => {
		expect(formatMonth("2024-01", "en")).toBe("Jan 2024");
		expect(formatMonth("2026", "pt-BR")).toBe("2026");
	});
});

describe("buildSitemap", () => {
	const xml = buildSitemap([
		{ path: "/" },
		{ path: "/about", lastmod: "2026-10-11" },
	]);

	it("lists every page once per locale", () => {
		const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
		expect(locs).toEqual([
			"https://gmartins.dev/",
			"https://gmartins.dev/pt-br",
			"https://gmartins.dev/about",
			"https://gmartins.dev/pt-br/about",
		]);
	});

	it("adds lastmod only where a real date exists", () => {
		expect(xml.match(/<lastmod>2026-10-11<\/lastmod>/g)).toHaveLength(2);
		expect(xml.match(/<lastmod>/g)).toHaveLength(2);
	});

	it("gives each entry both alternates and x-default", () => {
		expect(xml.match(/hreflang="x-default"/g)).toHaveLength(4);
		expect(xml.match(/hreflang="pt-BR"/g)).toHaveLength(4);
	});
});

describe("head extras", () => {
	it("escapes < in JSON-LD so it cannot close the script", () => {
		const head = buildHead({
			locale: "en",
			path: "/",
			title: "t",
			description: "d",
			structuredData: [{ name: "</script><b>" }],
		});
		expect(head.scripts[0].children).not.toContain("</script>");
		expect(JSON.parse(head.scripts[0].children)).toEqual({
			name: "</script><b>",
		});
	});

	it("describes the person on the home page", () => {
		const [document] = homeStructuredData("pt-BR");
		expect(document).toMatchObject({ "@context": "https://schema.org" });
		const [person, site] = (document as { "@graph": object[] })["@graph"];
		expect(person).toMatchObject({
			"@type": "Person",
			name: "Guilherme Martins",
		});
		expect(site).toMatchObject({ "@type": "WebSite", inLanguage: "pt-BR" });
	});

	it("links case studies to the person, the repository and a breadcrumb", () => {
		const [study] = caseStudies;
		const [document] = caseStudyStructuredData("en", study);
		const nodes = (document as { "@graph": Record<string, unknown>[] })[
			"@graph"
		];
		const article = nodes.find((node) => node["@type"] === "TechArticle");
		expect(article).toMatchObject({
			headline: study.title,
			dateModified: study.reviewed,
			author: { "@id": "https://gmartins.dev/#person" },
			about: {
				codeRepository: "https://github.com/gmartins-dev/sdd-agentic-flow",
			},
		});
		const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList");
		expect(breadcrumb).toMatchObject({
			itemListElement: [
				{ position: 1, item: "https://gmartins.dev/" },
				{ position: 2, item: "https://gmartins.dev/work" },
				{ position: 3, item: "https://gmartins.dev/work/sdd-agentic-flow" },
			],
		});
		expect(nodes.some((node) => node["@type"] === "Person")).toBe(true);
	});

	it("describes a private-code product by its live application", () => {
		const study = caseStudies.find((item) => item.slug === "priorize-me");
		if (!study) throw new Error("priorize-me case study missing");
		const [document] = caseStudyStructuredData("en", study);
		const nodes = (document as { "@graph": Record<string, unknown>[] })[
			"@graph"
		];
		expect(nodes[0]).toMatchObject({
			"@type": "TechArticle",
			about: {
				"@type": "WebApplication",
				url: "https://priorizeme.vercel.app/",
			},
		});
	});

	it("gives anonymized work without links no `about`", () => {
		const [study] = caseStudies;
		const anonymized = {
			...study,
			links: [],
			disclosure: "anonymized" as const,
		};
		const [document] = caseStudyStructuredData("en", anonymized);
		const nodes = (document as { "@graph": Record<string, unknown>[] })[
			"@graph"
		];
		expect(nodes[0]).not.toHaveProperty("about");
	});

	it("marks the About page as a ProfilePage about the person", () => {
		const [document] = aboutStructuredData("pt-BR");
		const [profilePage] = (document as { "@graph": object[] })["@graph"];
		expect(profilePage).toMatchObject({
			"@type": "ProfilePage",
			url: "https://gmartins.dev/pt-br/about",
			mainEntity: { "@id": "https://gmartins.dev/#person" },
		});
	});

	it("has a rendered social card for every card the site references", () => {
		for (const card of ogCards) {
			expect(existsSync(`public/images/og/${card.file}`), card.file).toBe(true);
		}
		for (const locale of ["en", "pt-BR"] as const) {
			expect(existsSync(`public${defaultOgImage(locale).src}`)).toBe(true);
		}
	});
});
