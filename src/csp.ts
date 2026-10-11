/**
 * Per-page Content-Security-Policy, added as a <meta> tag at prerender time.
 *
 * Each page has inline scripts whose content differs per page (the theme
 * bootstrap is constant, the dehydrated router state is not), so they are
 * allowed by hash rather than with 'unsafe-inline'. Directives a meta tag
 * cannot carry (frame-ancestors) are sent as headers by vercel.json.
 *
 * Server-only: used by scripts/prerender.mjs through entry-server.tsx.
 */
export async function withContentSecurityPolicy(html: string) {
	const hashes = await Promise.all(inlineScripts(html).map(sha256Source));
	const policy = [
		"default-src 'self'",
		`script-src 'self' ${hashes.join(" ")}`.trim(),
		"style-src 'self'",
		"img-src 'self' data:",
		"font-src 'self'",
		"connect-src 'self'",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
	].join("; ");
	const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
	if (!html.includes("<head>")) throw new Error("CSP: document has no <head>");
	// First thing in <head>, so it applies before any script is parsed.
	return html.replace("<head>", `<head>${meta}`);
}

/**
 * Text of every executable inline script, as the browser will hash it. Pages
 * reach this step without NUL characters (src/finalize-html.ts); the HTML
 * parser would otherwise hash U+FFFD in their place.
 */
export function inlineScripts(html: string): string[] {
	const scripts = html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g);
	return [...scripts]
		.filter(([, attrs = "", body]) => {
			if (body.length === 0 || /\ssrc=/.test(attrs)) return false;
			const type = /\stype="([^"]*)"/.exec(attrs)?.[1];
			// JSON-LD and other data blocks are never executed.
			return (
				type === undefined || type === "module" || type === "text/javascript"
			);
		})
		.map(([, , body]) => body);
}

/** CSP source expression for a script: 'sha256-<base64 digest>'. */
async function sha256Source(source: string) {
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(source),
	);
	const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
	return `'sha256-${base64}'`;
}
