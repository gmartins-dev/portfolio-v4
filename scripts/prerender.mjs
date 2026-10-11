// Writes one static HTML document per route and locale into dist/, using the
// SSR bundle built from src/entry-server.tsx. Runs after both Vite builds
// (see the `build` script). The SSR bundle is build-time only and is removed.
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, prerenderPaths } = await import(
	pathToFileURL(join(ssrDir, "entry-server.js")).href
);

for (const url of prerenderPaths) {
	const response = await render(url);
	if (response.status !== 200) {
		throw new Error(`prerender ${url}: status ${response.status}`);
	}
	const file = join(dist, url, "index.html");
	await mkdir(dirname(file), { recursive: true });
	await writeFile(file, await response.text());
	console.log(`prerendered ${url} -> ${file.slice(root.length + 1)}`);
}

await rm(ssrDir, { recursive: true });
