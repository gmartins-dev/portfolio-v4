import { describe, expect, it } from "vitest";
import { professionalWork } from "./content/professional-work";
import { caseStudies } from "./content/work";
import { buildLlmsTxt } from "./llms-txt";

describe("buildLlmsTxt", () => {
	const text = buildLlmsTxt();

	it("follows the llms.txt shape: H1, summary blockquote, H2 link lists", () => {
		expect(text).toMatch(/^# Guilherme Martins\n\n> .+\n/);
		expect(text).toContain("## Case studies");
		expect(text).toContain("## Optional");
	});

	it("links every case study", () => {
		for (const study of caseStudies) {
			expect(text).toContain(`https://gmartins.dev/work/${study.slug}`);
		}
	});

	it("lists every public product he worked on", () => {
		for (const work of professionalWork) {
			expect(text).toContain(`(${work.url})`);
			expect(text).toContain(`https://gmartins.dev/work#${work.slug}`);
		}
	});

	it("has no empty-line runs or em dashes", () => {
		expect(text).not.toMatch(/\n\n\n/);
		expect(text).not.toMatch(/[–—]/);
	});
});
