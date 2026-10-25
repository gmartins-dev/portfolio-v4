import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { copy } from "./copy";
import { professionalWork } from "./professional-work";
import { experience, profile } from "./profile";
import { projects } from "./projects";
import { caseStudyEntrySchema } from "./schema";
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

const content = {
	copy,
	profile,
	experience,
	caseStudies,
	otherWork,
	projects,
	professionalWork,
};

describe("content", () => {
	it("matches the schemas", () => {
		expect(validateContent).not.toThrow();
	});

	it("never names confidential employers, clients or internal projects", async () => {
		// @ts-expect-error: plain ESM helper shared with scripts/check-dist.mjs
		const { findDenied } = await import("../../scripts/denylist.mjs");
		// Report paths only, never the matched term.
		const leaks = strings(content)
			.filter(([, text]) => findDenied(text).length > 0)
			.map(([path]) => path);
		expect(leaks).toEqual([]);
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

	it("has every image variant on disk", () => {
		const images = [...caseStudies, ...otherWork, ...professionalWork].flatMap(
			(item) => [
				...(item.image ? [item.image] : []),
				...("teaserImage" in item && item.teaserImage
					? [item.teaserImage]
					: []),
			],
		);
		for (const image of images) {
			for (const width of image.widths) {
				const file = `public${image.src}-${width}.webp`;
				expect(existsSync(file), file).toBe(true);
			}
			expect(Math.max(...image.widths)).toBe(image.width);
		}
	});

	it("gives every project a unique anchor, distinct from case study slugs", () => {
		const anchors = projects.map((project) => project.slug);
		expect(new Set(anchors).size).toBe(anchors.length);
		for (const study of caseStudies) expect(anchors).not.toContain(study.slug);
	});

	it("lists projects newest first within each group", () => {
		for (const group of ["recent", "earlier"] as const) {
			const years = projects
				.filter((p) => p.group === group)
				.map((p) => p.year);
			expect(years).toEqual([...years].sort((a, b) => b - a));
		}
	});

	it("requires links on public case studies but not on anonymized ones", () => {
		const [study] = caseStudies;
		expect(() =>
			caseStudyEntrySchema.parse({ ...study, links: [], disclosure: "public" }),
		).toThrow(/at least one link/);
		expect(() =>
			caseStudyEntrySchema.parse({
				...study,
				links: [],
				disclosure: "anonymized",
			}),
		).not.toThrow();
	});

	it("ties every professional work entry to an experience entry", () => {
		const companies = experience.map((entry) => entry.company);
		for (const work of professionalWork) {
			expect(companies).toContain(work.company);
		}
	});

	it("lists professional work in experience order", () => {
		const order = (company: string) =>
			experience.findIndex((entry) => entry.company === company);
		const positions = professionalWork.map((work) => order(work.company));
		expect(positions).toEqual([...positions].sort((a, b) => a - b));
	});

	it("gives /work anchors unique ids", () => {
		const ids = [
			...professionalWork.map((work) => work.slug),
			"professional-work",
			"other-work",
		];
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("gives every case study a unique slug", () => {
		const slugs = caseStudies.map((study) => study.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
