import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// The gate guards every deploy, so prove it fails when it should: build a
// small valid dist/ (with the pages vercel.json redirects to), break one
// thing per test, and run the real script against it.
const site = "https://gmartins.dev";
const legacyAnchors = [
	"sharespot",
	"bemyguess",
	"online-bank",
	"flappybird",
	"netflix-clone",
	"payments-api-node",
];
const neutralPaths = ["/", "/about", "/projects"];
const localized = (locale: "en" | "pt-BR", path: string) =>
	locale === "en" ? path : `/pt-br${path === "/" ? "" : path}`;

function page(locale: "en" | "pt-BR", path: string) {
	const self = localized(locale, path);
	const anchors =
		path === "/projects"
			? legacyAnchors.map((id) => `<p id="${id}"></p>`).join("")
			: "";
	return `<!doctype html><html><head>
<link rel="canonical" href="${site}${self}"/>
<link rel="alternate" hrefLang="en" href="${site}${localized("en", path)}"/>
<link rel="alternate" hrefLang="pt-BR" href="${site}${localized("pt-BR", path)}"/>
<link rel="alternate" hrefLang="x-default" href="${site}${localized("en", path)}"/>
<script type="module" src="/assets/entry.js"></script>
</head><body><a href="/about">About</a>${anchors}<p id="contact"></p></body></html>`;
}

let dist: string;
const write = (path: string, body: string) => {
	mkdirSync(dirname(join(dist, path)), { recursive: true });
	writeFileSync(join(dist, path), body);
};
const fileFor = (url: string) => (url === "/" ? "index.html" : `${url}.html`);
const run = () =>
	spawnSync(process.execPath, ["scripts/check-dist.mjs", dist], {
		encoding: "utf8",
	});

beforeEach(() => {
	dist = mkdtempSync(join(tmpdir(), "check-dist-"));
	const urls: string[] = [];
	for (const locale of ["en", "pt-BR"] as const) {
		for (const path of neutralPaths) {
			const url = localized(locale, path);
			urls.push(url);
			write(fileFor(url), page(locale, path));
		}
	}
	write("404.html", "<!doctype html><html><head></head><body></body></html>");
	write(
		"sitemap.xml",
		urls.map((url) => `<url><loc>${site}${url}</loc></url>`).join("\n"),
	);
	write("llms.txt", `- [About](${site}/about)\n`);
	write("llms-full.txt", `- URL: ${site}/about\n`);
	write("assets/entry.js", "console.log(1)");
});

afterEach(() => rmSync(dist, { recursive: true, force: true }));

describe("scripts/check-dist.mjs", () => {
	it("passes a consistent dist/", () => {
		const result = run();
		expect(result.stderr).toBe("");
		expect(result.status).toBe(0);
	});

	it("fails on a broken internal link", () => {
		write("about.html", page("en", "/about").replace('"/about"', '"/missing"'));
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain("broken internal reference /missing");
	});

	it("fails when an hreflang alternate does not link back", () => {
		write(
			"pt-br/about.html",
			page("pt-BR", "/about").replace(
				`hrefLang="en" href="${site}/about"`,
				`hrefLang="en" href="${site}/"`,
			),
		);
		const result = run();
		expect(result.status).toBe(1);
		// /pt-br/about now names / as its English version, which does not
		// name /pt-br/about back.
		expect(result.stderr).toContain(
			"/pt-br/about: / does not link back with hreflang",
		);
	});

	it("reports an alternate without href instead of crashing", () => {
		write(
			"about.html",
			page("en", "/about").replace(
				`hrefLang="x-default" href="${site}/about"`,
				'hrefLang="x-default"',
			),
		);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain("/about: hreflang x-default has no href");
	});

	it("fails when the sitemap misses a page", () => {
		write("sitemap.xml", `<url><loc>${site}/</loc></url>`);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain("sitemap.xml: missing /about");
	});

	it("fails when a script exceeds the JavaScript budget", () => {
		// Random printable text compresses to about 80%: 200 kB stays over 150 kB.
		const noise = Array.from({ length: 200 * 1024 }, () =>
			String.fromCharCode(33 + Math.floor(Math.random() * 90)),
		).join("");
		write("assets/entry.js", `//${noise}`);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toMatch(/assets\/entry\.js: .* budget 150 kB/);
	});
});
