import { describe, expect, it } from "vitest";
import { copy } from "./copy";
import { experience, profile } from "./profile";
import { validateContent } from "./validate";
import { caseStudies, otherWork } from "./work";

/** Every string reachable from a value, with its path for error messages. */
function strings(value: unknown, path = "$"): [string, string][] {
	if (typeof value === "string") return [[path, value]];
	if (Array.isArray(value))
		return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
	if (value && typeof value === "object") {
		return Object.entries(value).flatMap(([k, v]) =>
			strings(v, `${path}.${k}`),
		);
	}
	return [];
}

const content = { copy, profile, experience, caseStudies, otherWork };

describe("content", () => {
	it("matches the schemas", () => {
		expect(validateContent).not.toThrow();
	});

	it("uses no em or en dashes in visible text (DESIGN.md)", () => {
		const offenders = strings(content).filter(([, s]) => /[–—]/.test(s));
		expect(offenders).toEqual([]);
	});

	it("has the same number of paragraphs and bullets in both languages", () => {
		const mismatched = strings(content)
			.map(([path]) => path.replace(/\[\d+\]$/, ""))
			.filter((path) => path.endsWith(".en"))
			.filter((path, i, all) => all.indexOf(path) === i)
			.filter((path) => {
				const count = (suffix: string) =>
					strings(content).filter(([p]) => p.replace(/\[\d+\]$/, "") === suffix)
						.length;
				return count(path) !== count(path.replace(/\.en$/, ".pt-BR"));
			});
		expect(mismatched).toEqual([]);
	});

	it("lists experience newest first", () => {
		const starts = experience.map((entry) => entry.start);
		expect(starts).toEqual([...starts].sort().reverse());
	});

	it("only publishes case studies cleared for disclosure", () => {
		for (const study of caseStudies) {
			expect(["public", "anonymized"]).toContain(study.disclosure);
		}
	});

	it("gives every case study a unique slug", () => {
		const slugs = caseStudies.map((study) => study.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
