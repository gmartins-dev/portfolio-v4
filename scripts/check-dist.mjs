// Checks the built site in dist/ without a browser: every internal link and
// asset resolves (to a page, a file or a vercel.json redirect), canonicals
// point at the page itself, hreflang alternates are reciprocal, social
// images exist, the sitemap lists exactly the pages, llms.txt links resolve,
// and client JavaScript stays within its size budget. Run after
// `pnpm build`: `pnpm check:dist`. An optional argument checks another
// directory (scripts/check-dist.test.ts uses fixtures).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { findDenied } from "./denylist.mjs";

const siteUrl = "https://gmartins.dev";
const dist = process.argv[2]
	? `${resolve(process.argv[2])}/`
	: fileURLToPath(new URL("../dist/", import.meta.url));
const { redirects } = JSON.parse(
	readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);
const redirectSources = new Set(redirects.map((r) => r.source));

const htmlFiles = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return htmlFiles(path);
		return entry.name.endsWith(".html") ? [path] : [];
	});

/** dist/about.html -> /about, dist/index.html -> / (Vercel cleanUrls). */
const urlPath = (file) =>
	`/${relative(dist, file).replace(/\.html$/, "")}`.replace(/^\/index$/, "/");

const pages = new Map(
	htmlFiles(dist)
		.filter((file) => !file.endsWith("404.html"))
		.map((file) => [urlPath(file), readFileSync(file, "utf8")]),
);
const notFound = readFileSync(join(dist, "404.html"), "utf8");

const attr = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];
const tags = (html, name) =>
	html.match(new RegExp(`<${name}\\s[^>]*>`, "g")) ?? [];

const errors = [];
const fail = (page, message) => errors.push(`${page}: ${message}`);

function resolves(href) {
	const path = href.split(/[?#]/)[0] || "/";
	return (
		pages.has(path) || redirectSources.has(path) || existsSync(join(dist, path))
	);
}

for (const [path, html] of [...pages, ["/404", notFound]]) {
	for (const tag of [
		...tags(html, "a"),
		...tags(html, "link"),
		...tags(html, "script"),
		...tags(html, "img"),
	]) {
		const ref = attr(tag, "href") ?? attr(tag, "src");
		if (!ref?.startsWith("/") || ref.startsWith("//")) continue;
		if (!resolves(ref)) fail(path, `broken internal reference ${ref}`);
	}

	for (const tag of tags(html, "meta").filter(
		(t) => attr(t, "property") === "og:image",
	)) {
		const image = attr(tag, "content").replace(siteUrl, "");
		if (!existsSync(join(dist, image))) fail(path, `missing og:image ${image}`);
	}
	if (path === "/404") continue;

	const links = tags(html, "link");
	const canonical = links.find((t) => attr(t, "rel") === "canonical");
	if (attr(canonical ?? "", "href") !== `${siteUrl}${path}`) {
		fail(path, `canonical is ${attr(canonical ?? "", "href")}`);
	}

	const alternates = links.filter((t) => attr(t, "rel") === "alternate");
	if (alternates.length < 3) fail(path, "missing hreflang alternates");
	for (const alternate of alternates) {
		const href = attr(alternate, "href");
		if (!href) {
			fail(path, `hreflang ${attr(alternate, "hrefLang")} has no href`);
			continue;
		}
		const target = href.replace(siteUrl, "") || "/";
		const targetHtml = pages.get(target);
		if (!targetHtml) {
			fail(
				path,
				`hreflang ${attr(alternate, "hrefLang")} points to missing ${target}`,
			);
			continue;
		}
		const back = tags(targetHtml, "link").some(
			(t) =>
				attr(t, "rel") === "alternate" &&
				attr(t, "href") === `${siteUrl}${path}`,
		);
		if (!back) fail(path, `${target} does not link back with hreflang`);
	}
}

const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(m) => m[1].replace(siteUrl, "") || "/",
);
const expected = [...pages.keys()];
for (const page of expected) {
	if (!listed.includes(page)) fail("sitemap.xml", `missing ${page}`);
}
for (const page of listed) {
	if (!pages.has(page)) fail("sitemap.xml", `lists missing page ${page}`);
}

// Performance budget: compressed JavaScript per page. React DOM and the
// router are ~95 kB of it; raise the limit only with a reason in the PR.
const jsBudgetKb = 150;
for (const file of readdirSync(join(dist, "assets"))) {
	if (!file.endsWith(".js")) continue;
	const kb = gzipSync(readFileSync(join(dist, "assets", file))).length / 1024;
	if (kb > jsBudgetKb) {
		fail(
			`assets/${file}`,
			`${kb.toFixed(1)} kB gzipped, budget ${jsBudgetKb} kB`,
		);
	}
}

// Redirects to site pages must land on a page, and on an element when they
// carry an anchor (legacy v3 project URLs point at /projects#<slug>).
for (const { source, destination } of redirects) {
	if (!destination.startsWith("/")) continue;
	const [path, anchor] = destination.split("#");
	const html = pages.get(path || "/");
	if (!html) {
		fail("vercel.json", `${source} redirects to missing page ${path}`);
	} else if (anchor && !html.includes(` id="${anchor}"`)) {
		fail("vercel.json", `${source} redirects to missing anchor #${anchor}`);
	}
}

// llms.txt links to site pages must exist too, and so must the site URLs
// in llms-full.txt (plain URLs, not Markdown links).
const llms = readFileSync(join(dist, "llms.txt"), "utf8");
for (const [, link] of llms.matchAll(/\]\((https:\/\/gmartins\.dev[^)]*)\)/g)) {
	const path = link.replace(siteUrl, "") || "/";
	if (!resolves(path)) fail("llms.txt", `broken link ${link}`);
}
const llmsFull = readFileSync(join(dist, "llms-full.txt"), "utf8");
for (const [link] of llmsFull.matchAll(/https:\/\/gmartins\.dev[^\s;)]*/g)) {
	const path = link.replace(siteUrl, "") || "/";
	if (!resolves(path)) fail("llms-full.txt", `broken link ${link}`);
}

// Confidential names must never ship (scripts/denylist.json). Report only
// the file, never the matched term, so CI logs don't leak it either.
for (const [path, html] of [
	...pages,
	["/404", notFound],
	["llms.txt", llms],
	["llms-full.txt", llmsFull],
]) {
	if (findDenied(html).length > 0)
		fail(path, "contains a denied term (scripts/denylist.json)");
}

if (errors.length > 0) {
	console.error(errors.join("\n"));
	process.exit(1);
}
console.log(
	`dist OK: ${pages.size} pages, links, canonicals, hreflang, sitemap and JS budget (${jsBudgetKb} kB) consistent`,
);
