import { describe, expect, it } from "vitest";
import { prerenderPaths, render } from "./entry-server";

const context = { entryScript: "/assets/entry-client-test.js" };

describe("server render", () => {
	it("prerenders every page in both locales", () => {
		expect(prerenderPaths).toEqual([
			"/",
			"/cases",
			"/cases/ai-first-online-banking",
			"/cases/priorize-me",
			"/cases/sdd-agentic-flow",
			"/projects",
			"/how-i-work",
			"/about",
			"/pt-br",
			"/pt-br/cases",
			"/pt-br/cases/ai-first-online-banking",
			"/pt-br/cases/priorize-me",
			"/pt-br/cases/sdd-agentic-flow",
			"/pt-br/projects",
			"/pt-br/how-i-work",
			"/pt-br/about",
		]);
	});

	it("emits a complete localized document for a PT-BR page", async () => {
		const response = await render("/pt-br/about", context);
		const html = await response.text();

		expect(response.status).toBe(200);
		expect(html).toMatch(/^<!DOCTYPE html><html lang="pt-BR">/);
		expect(html).toContain(
			"<title>Sobre Guilherme Martins | Software Engineer</title>",
		);
		expect(html).toContain(
			'<link rel="canonical" href="https://gmartins.dev/pt-br/about"/>',
		);
		expect(html).toContain(
			'<link rel="alternate" hrefLang="en" href="https://gmartins.dev/about"/>',
		);
		expect(html).toMatch(
			/<script type="module" src="\/assets\/entry-client-test.js"[^>]*><\/script>/,
		);
		// Dehydrated router state the client hydrates from.
		expect(html).toContain("$_TSR");
	});

	it("returns 404 for unknown paths", async () => {
		const response = await render("/does-not-exist", context);
		expect(response.status).toBe(404);
		const html = await response.text();
		expect(html).toContain('<meta name="robots" content="noindex"/>');
		expect(html).toContain("<title>Page not found | Guilherme Martins</title>");
	});
});
