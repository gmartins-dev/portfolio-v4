import { describe, expect, it } from "vitest";
import { profile } from "./content/profile";
import { render } from "./entry-server";

const context = { entryScript: "/assets/entry-client-test.js" };

async function html(path: string) {
	return (await render(path, context)).text();
}

/** href of the first anchor in `markup` whose opening tag matches `pattern`. */
function hrefOf(markup: string, pattern: RegExp) {
	const tag = [...markup.matchAll(/<a\s[^>]*>/g)]
		.map(([anchor]) => anchor)
		.find((anchor) => pattern.test(anchor));
	return tag && /\shref="([^"]*)"/.exec(tag)?.[1];
}

describe("contact call to action", () => {
	it.each(["/", "/pt-br", "/about", "/does-not-exist"])(
		"footer mailto points at the profile email on %s",
		async (path) => {
			const markup = await html(path);
			expect(hrefOf(markup, /href="mailto:/)).toBe(`mailto:${profile.email}`);
		},
	);
});

describe("resume links", () => {
	it.each([
		["/", "en"],
		["/pt-br", "pt-BR"],
	] as const)(
		"header links the resume of its own locale on %s",
		async (path, locale) => {
			const markup = await html(path);
			const header = markup.slice(0, markup.indexOf("</header>"));
			expect(hrefOf(header, /href="\/cv/)).toBe(profile.resume[locale]);
		},
	);

	it("keeps the two resumes distinct", () => {
		expect(profile.resume.en).not.toBe(profile.resume["pt-BR"]);
	});

	it("footer offers both resumes on every locale", async () => {
		for (const path of ["/", "/pt-br"]) {
			const markup = await html(path);
			const footer = markup.slice(markup.indexOf("<footer"));
			expect(hrefOf(footer, /hrefLang="en"/)).toBe(profile.resume.en);
			expect(hrefOf(footer, /hrefLang="pt-BR"/)).toBe(profile.resume["pt-BR"]);
		}
	});
});

describe("language switch", () => {
	it.each([
		["/", "/pt-br", "pt-BR"],
		["/about", "/pt-br/about", "pt-BR"],
		["/projects", "/pt-br/projects", "pt-BR"],
		["/cases/priorize-me", "/pt-br/cases/priorize-me", "pt-BR"],
		["/pt-br", "/", "en"],
		["/pt-br/projects", "/projects", "en"],
	])("%s switches to %s", async (path, target, lang) => {
		const markup = await html(path);
		const header = markup.slice(0, markup.indexOf("</header>"));
		expect(hrefOf(header, new RegExp(`hrefLang="${lang}"`))).toBe(target);
	});

	it("goes to the other locale's home from the 404 page", async () => {
		// prerender.mjs renders the static 404.html from "/404".
		const markup = await html("/404");
		const header = markup.slice(0, markup.indexOf("</header>"));
		expect(hrefOf(header, /hrefLang="pt-BR"/)).toBe("/pt-br");
	});
});

describe("about page", () => {
	it.each([
		["/about", "Education", "/cases/ai-first-online-banking"],
		["/pt-br/about", "Formação", "/pt-br/cases/ai-first-online-banking"],
	])(
		"%s lists education and links the current role's case study",
		async (path, heading, caseStudy) => {
			const markup = await html(path);
			expect(markup).toContain(`>${heading}</h2>`);
			expect(hrefOf(markup, new RegExp(`href="${caseStudy}"`))).toBe(caseStudy);
		},
	);
});

describe("home case study teasers", () => {
	it("use the teaser diagram when a case study has one", async () => {
		const markup = await html("/");
		expect(markup).toContain("/images/work/ai-first-online-banking-teaser-");
	});
});
