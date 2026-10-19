// Writes one static HTML document per route and locale into dist/ (about.html
// for /about), plus 404.html, sitemap.xml, llms.txt and llms-full.txt, using the SSR bundle built from
// src/entry-server.tsx. Runs after both Vite builds (see the `build` script).
// The SSR bundle is build-time only and is removed.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const {
	render,
	prerenderPaths,
	sitemap,
	finalizeHtml,
	buildLlmsTxt,
	buildLlmsFullTxt,
	withoutScripts,
} = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

// The client entry is content-hashed; find its name in Vite's manifest.
const manifestFile = join(dist, ".vite", "manifest.json");
const manifest = JSON.parse(await readFile(manifestFile, "utf8"));
const entryChunk = manifest["src/entry-client.tsx"];
if (!entryChunk?.isEntry) {
	throw new Error(
		"prerender: src/entry-client.tsx missing from the Vite manifest",
	);
}
const context = { entryScript: `/${entryChunk.file}` };

for (const url of prerenderPaths) {
	const response = await render(url, context);
	if (response.status !== 200) {
		throw new Error(`prerender ${url}: status ${response.status}`);
	}
	// /about -> about.html, served at /about by Vercel cleanUrls (vercel.json).
	const file = join(dist, url === "/" ? "index.html" : `${url}.html`);
	await mkdir(dirname(file), { recursive: true });
	await writeFile(file, await finalizeHtml(await response.text()));
	console.log(`prerendered ${url} -> ${file.slice(root.length + 1)}`);
}

await writeFile(join(dist, "sitemap.xml"), sitemap);
console.log("wrote dist/sitemap.xml");
await writeFile(join(dist, "llms.txt"), buildLlmsTxt());
console.log("wrote dist/llms.txt");
await writeFile(join(dist, "llms-full.txt"), buildLlmsFullTxt());
console.log("wrote dist/llms-full.txt");

// Static hosts (Vercel included) serve 404.html, with a 404 status, for any
// path that has no file.
const notFound = await render("/404", context);
if (notFound.status !== 404) {
	throw new Error(`prerender 404 page: status ${notFound.status}`);
}
// The same file answers unknown URLs in every language, so it must not
// hydrate against a path it was not rendered for: drop every script (the
// client entry and the dehydrated router state).
const notFoundHtml = withoutScripts(await notFound.text(), []);
if (/type="module"|\$_TSR|\$R\b/.test(notFoundHtml)) {
	throw new Error("prerender 404 page: client scripts were not removed");
}
await writeFile(join(dist, "404.html"), await finalizeHtml(notFoundHtml));
console.log("prerendered 404 -> dist/404.html");

await rm(ssrDir, { recursive: true });
// Build metadata only; nothing should serve it.
await rm(join(dist, ".vite"), { recursive: true });
