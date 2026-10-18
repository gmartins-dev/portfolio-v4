// Static server for dist/ that behaves like Vercel with cleanUrls: /about
// serves about.html, unknown paths get 404.html with a 404 status,
// vercel.json redirects answer with their status, its header rules apply,
// and text responses are compressed as a CDN would. Used by the end-to-end
// tests: `node scripts/serve-dist.mjs [port]`.
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("../dist/", import.meta.url).pathname;
const port = Number(process.argv[2] ?? 4173);
const { redirects, headers: headerRules } = JSON.parse(
	await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

const types = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript",
	".css": "text/css",
	".woff2": "font/woff2",
	".jpg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp",
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

const compressible = new Set([".html", ".js", ".css", ".xml", ".txt", ".svg"]);

// vercel.json header rules, e.g. "/assets/(.*)", as anchored regexes. Every
// matching rule applies, later rules winning, as on Vercel. Vercel sources are
// path-to-regexp patterns; this only covers the regex-group form used today,
// so extend it before adding a named parameter such as "/:slug".
const headerMatchers = headerRules.map((rule) => ({
	pattern: new RegExp(`^${rule.source}$`),
	headers: rule.headers,
}));

function configuredHeaders(pathname) {
	const result = {};
	for (const { pattern, headers } of headerMatchers) {
		if (!pattern.test(pathname)) continue;
		for (const { key, value } of headers) result[key.toLowerCase()] = value;
	}
	return result;
}

async function send(req, res, status, file) {
	const type = extname(file);
	let body = await readFile(file);
	const headers = {
		...configuredHeaders(new URL(req.url, "http://x").pathname),
		"content-type": types[type] ?? "application/octet-stream",
	};
	if (
		compressible.has(type) &&
		/\bgzip\b/.test(req.headers["accept-encoding"] ?? "")
	) {
		body = gzipSync(body);
		headers["content-encoding"] = "gzip";
	}
	res.writeHead(status, headers);
	res.end(body);
}

createServer(async (req, res) => {
	let pathname;
	try {
		pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
	} catch {
		res.writeHead(400);
		return res.end();
	}
	// Vercel serves the Speed Insights script itself once it is enabled for
	// the project; an empty stand-in keeps the page's request from failing.
	if (pathname === "/_vercel/speed-insights/script.js") {
		res.writeHead(200, {
			...configuredHeaders(pathname),
			"content-type": types[".js"],
		});
		return res.end();
	}
	const redirect = redirects.find((r) => r.source === pathname);
	if (redirect) {
		res.writeHead(redirect.permanent ? 308 : 307, {
			location: redirect.destination,
		});
		return res.end();
	}
	// normalize() plus the prefix check keeps requests inside dist/.
	const base = normalize(join(root, pathname));
	// Compare with the trailing slash so siblings like dist-ssr/ are rejected.
	if (!`${base}/`.startsWith(root)) {
		res.writeHead(400);
		return res.end();
	}
	const page = pathname === "/" ? "index" : pathname.replace(/\/$/, "");
	const file =
		(extname(pathname) && (await existing(base))) ||
		(await existing(join(root, `${page}.html`)));
	if (file) return send(req, res, 200, file);
	return send(req, res, 404, join(root, "404.html"));
}).listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));
