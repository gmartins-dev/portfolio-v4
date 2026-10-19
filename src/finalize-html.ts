import { withContentSecurityPolicy } from "./csp";

/**
 * Last step before a prerendered page is written to disk.
 *
 * 1. TanStack Router writes raw NUL characters into the dehydrated match ids
 *    of its inline state script. NUL is an HTML parse error
 *    (unexpected-null-character) and makes text tools treat the file as
 *    binary. NUL only occurs inside that script's JavaScript string literals,
 *    so it is replaced with the escape sequence \u0000: the parsed string is
 *    identical, the HTML becomes valid.
 * 2. A per-page Content-Security-Policy is added for the final inline
 *    scripts (src/csp.ts), so it must run after any change to their text.
 *
 * Server-only: used by scripts/prerender.mjs through entry-server.tsx.
 */
export async function finalizeHtml(html: string) {
	const escaped = html.replaceAll("\u0000", "\\u0000");
	return withContentSecurityPolicy(escaped);
}

/**
 * Remove every <script> except those whose text is listed in `keep`. Used for
 * the JavaScript-free 404 page: keeping an allowlist (empty for the 404)
 * instead of matching the router's script markup survives router upgrades,
 * whose dehydration markup has changed between versions.
 */
export function withoutScripts(html: string, keep: readonly string[]) {
	return html.replace(
		/<script\b[^>]*>([\s\S]*?)<\/script>/g,
		(tag, body: string) => (keep.includes(body) ? tag : ""),
	);
}
