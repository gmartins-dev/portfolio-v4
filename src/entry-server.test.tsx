import { describe, expect, it } from "vitest";
import { prerenderPaths, render } from "./entry-server";

describe("server render", () => {
	it("prerenders every page in both locales", () => {
		expect(prerenderPaths).toEqual([
			"/",
			"/work",
			"/work/sdd-agentic-flow",
			"/work/payments-api-node",
			"/about",
			"/pt-br",
			"/pt-br/work",
			"/pt-br/work/sdd-agentic-flow",
			"/pt-br/work/payments-api-node",
			"/pt-br/about",
		]);
	});

	it("emits a complete localized document for a PT-BR page", async () => {
		const response = await render("/pt-br/about");
		const html = await response.text();

		expect(response.status).toBe(200);
		expect(html).toMatch(/^<!DOCTYPE html><html lang="pt-BR">/);
		expect(html).toContain("<title>Sobre | Guilherme Martins</title>");
		expect(html).toContain(
			'<link rel="canonical" href="https://gmartins.dev/pt-br/about"/>',
		);
		expect(html).toContain(
			'<link rel="alternate" hrefLang="en" href="https://gmartins.dev/about"/>',
		);
		// Dehydrated router state the client hydrates from.
		expect(html).toContain("$_TSR");
	});

	it("returns 404 for unknown paths", async () => {
		const response = await render("/does-not-exist");
		expect(response.status).toBe(404);
	});
});
