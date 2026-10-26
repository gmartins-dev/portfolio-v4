import { describe, expect, it } from "vitest";
import { professionalWork } from "./content/professional-work";
import { caseStudies } from "./content/work";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms-txt";

describe("buildLlmsTxt", () => {
	const text = buildLlmsTxt();

	it("follows the llms.txt shape: H1, summary blockquote, H2 link lists", () => {
		expect(text).toMatch(/^# Guilherme Martins\n\n> .+\n/);
		expect(text).toContain("## Case studies");
		expect(text).toContain("## Optional");
	});

	it("points to the full-text version", () => {
		expect(text).toContain("(https://gmartins.dev/llms-full.txt)");
	});

	it("links every case study", () => {
		for (const study of caseStudies) {
			expect(text).toContain(`https://gmartins.dev/cases/${study.slug}`);
		}
	});

	it("lists every public product he worked on", () => {
		for (const work of professionalWork) {
			expect(text).toContain(`(${work.url})`);
			expect(text).toContain(`https://gmartins.dev/cases#${work.slug}`);
		}
	});

	it("has no empty-line runs or em dashes", () => {
		expect(text).not.toMatch(/\n\n\n/);
		expect(text).not.toMatch(/[–—]/);
	});
});

describe("buildLlmsFullTxt", () => {
	const text = buildLlmsFullTxt();

	it("carries every case study in full: facts, sections and code", () => {
		for (const study of caseStudies) {
			expect(text).toContain(`## ${study.title}`);
			expect(text).toContain(`https://gmartins.dev/cases/${study.slug}`);
			for (const fact of study.facts.en) expect(text).toContain(fact);
			for (const section of study.sections) {
				expect(text).toContain(`### ${section.heading.en}`);
				for (const paragraph of section.body.en) {
					expect(text).toContain(paragraph);
				}
				if (section.code) expect(text).toContain(section.code.source);
			}
		}
	});

	it("carries the public products and what he did on each", () => {
		for (const work of professionalWork) {
			for (const item of work.contributions.en) expect(text).toContain(item);
		}
	});

	it("has no empty-line runs or em dashes outside code", () => {
		expect(text).not.toMatch(/\n\n\n/);
		const prose = text.replace(/```[\s\S]*?```/g, "");
		expect(prose).not.toMatch(/[–—]/);
	});
});
