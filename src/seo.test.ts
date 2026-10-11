import { describe, expect, it } from "vitest";
import { localeFromPath, localizedPath } from "./i18n";
import { buildHead } from "./seo";

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
