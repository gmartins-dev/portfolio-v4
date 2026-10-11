import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const entry = (file: string) =>
	fileURLToPath(new URL(`./src/${file}`, import.meta.url));

/**
 * Dev server renders every HTML request through entry-server.tsx, the same
 * code path the build-time prerender uses, so dev and production markup match.
 */
function devServerRender(): Plugin {
	return {
		name: "dev-server-render",
		// appType "custom" disables Vite's HTML handling in `vite preview` too;
		// map /about to the prerendered dist/about/index.html, as hosts do.
		configurePreviewServer(server) {
			const outDir = resolve(server.config.root, server.config.build.outDir);
			server.middlewares.use((req, _res, next) => {
				const [pathname, query = ""] = (req.url ?? "/").split("?");
				const file = join(outDir, pathname, "index.html");
				if (!extname(pathname) && existsSync(file)) {
					req.url = `${pathname.replace(/\/?$/, "/")}index.html${query ? `?${query}` : ""}`;
				}
				next();
			});
		},
		configureServer(server) {
			return () => {
				server.middlewares.use(async (req, res, next) => {
					const url = req.originalUrl ?? "/";
					if (
						req.method !== "GET" ||
						!req.headers.accept?.includes("text/html")
					)
						return next();
					try {
						const { render } = await server.ssrLoadModule(
							entry("entry-server.tsx"),
						);
						const response: Response = await render(url, {
							entryScript: "/src/entry-client.tsx",
						});
						// transformIndexHtml injects the Vite client and React Refresh
						// preamble with indentation; whitespace text nodes in <head>
						// would break hydration, so collapse whitespace between tags.
						// Only <head>: in <body> that whitespace is rendered content.
						const html = (
							await server.transformIndexHtml(url, await response.text())
						).replace(/<head>[\s\S]*?<\/head>/, (head) =>
							head.replace(/>\s+</g, "><"),
						);
						res.statusCode = response.status;
						res.setHeader("Content-Type", "text/html; charset=utf-8");
						res.end(html);
					} catch (error) {
						server.ssrFixStacktrace(error as Error);
						next(error);
					}
				});
			};
		},
	};
}

export default defineConfig(({ isSsrBuild }) => ({
	appType: "custom",
	plugins: [react(), tailwindcss(), devServerRender()],
	resolve: {
		alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
	},
	build: isSsrBuild
		? { outDir: "dist-ssr", copyPublicDir: false }
		: {
				outDir: "dist",
				// scripts/prerender.mjs reads the hashed entry name from the manifest.
				manifest: true,
				rollupOptions: { input: entry("entry-client.tsx") },
			},
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
	},
}));
