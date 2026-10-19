import {
	createRequestHandler,
	RouterServer,
	renderRouterToString,
} from "@tanstack/react-router/ssr/server";
import { validateContent } from "./content/validate";
import { createAppRouter, type RouterContext, sitemapPages } from "./router";
import { buildSitemap, siteUrl } from "./seo";

export { finalizeHtml, withoutScripts } from "./finalize-html";
export { buildLlmsFullTxt, buildLlmsTxt } from "./llms-txt";
export { prerenderPaths } from "./router";

// Fail the build, not the visitor, on invalid content.
validateContent();

/** sitemap.xml contents, written by scripts/prerender.mjs. */
export const sitemap = buildSitemap(sitemapPages);

/**
 * Render one URL to a full HTML document, including the dehydrated router
 * state that entry-client.tsx hydrates from. Used by the dev server
 * middleware and by scripts/prerender.mjs; never deployed.
 */
export async function render(
	url: string,
	context: RouterContext,
): Promise<Response> {
	const handler = createRequestHandler({
		request: new Request(new URL(url, siteUrl)),
		createRouter: () => createAppRouter(context),
	});
	return handler(({ router, responseHeaders }) =>
		renderRouterToString({
			router,
			responseHeaders,
			children: <RouterServer router={router} />,
		}),
	);
}
