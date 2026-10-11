// Static server for dist/ that behaves like Vercel with cleanUrls: /about
// serves about.html, unknown paths get 404.html with a 404 status, and
// vercel.json redirects answer with their status. Used by the end-to-end
// tests: `node scripts/serve-dist.mjs [port]`.
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const port = Number(process.argv[2] ?? 4173);
const { redirects } = JSON.parse(
	await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

const types = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".css": "text/css",
	".woff2": "font/woff2",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".xml": "application/xml",
	".txt": "text/plain",
};

async function existing(path) {
	try {
		return (await stat(path)).isFile() ? path : null;
	} catch {
		return null;
	}
}

createServer(async (req, res) => {
	const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
	const redirect = redirects.find((r) => r.source === pathname);
	if (redirect) {
		res.writeHead(redirect.permanent ? 308 : 307, {
			location: redirect.destination,
		});
		return res.end();
	}
	// normalize() plus the prefix check keeps requests inside dist/.
	const base = normalize(join(root, pathname));
	if (!base.startsWith(root.replace(/\/$/, ""))) {
		res.writeHead(400);
		return res.end();
	}
	const page = pathname === "/" ? "index" : pathname.replace(/\/$/, "");
	const file =
		(extname(pathname) && (await existing(base))) ||
		(await existing(join(root, `${page}.html`)));
	if (file) {
		res.writeHead(200, {
			"content-type": types[extname(file)] ?? "application/octet-stream",
		});
		return res.end(await readFile(file));
	}
	res.writeHead(404, { "content-type": types[".html"] });
	res.end(await readFile(join(root, "404.html")));
}).listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));
