import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { localeFromPath, localizedPath } from "./i18n";
import { ogCards } from "./og-cards";
import {
	buildHead,
	buildSitemap,
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

describe("buildSitemap", () => {
	const xml = buildSitemap(["/", "/about"]);

	it("lists every page once per locale", () => {
		const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
		expect(locs).toEqual([
			"https://gmartins.dev/",
			"https://gmartins.dev/pt-br",
			"https://gmartins.dev/about",
			"https://gmartins.dev/pt-br/about",
		]);
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
		const [person, site] = homeStructuredData("pt-BR");
		expect(person).toMatchObject({
			"@type": "Person",
			name: "Guilherme Martins",
		});
		expect(site).toMatchObject({ "@type": "WebSite", inLanguage: "pt-BR" });
	});

	it("has a rendered social card for every card the site references", () => {
		for (const card of ogCards) {
			expect(existsSync(`public/og/${card.file}`), card.file).toBe(true);
		}
		for (const locale of ["en", "pt-BR"] as const) {
			expect(existsSync(`public${defaultOgImage(locale).src}`)).toBe(true);
		}
	});
});
