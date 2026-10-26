import { createHash } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { inlineScripts, withContentSecurityPolicy } from "./csp";

const sha = (s: string) =>
	`'sha256-${createHash("sha256").update(s).digest("base64")}'`;

const page = [
	"<!DOCTYPE html><html><head>",
	"<script>init()</script>",
	'<script type="module" src="/assets/entry.js"></script>',
	'<script type="application/ld+json">{"a":1}</script>',
	"</head><body>",
	'<script class="$tsr">state("a")</script>',
	"</body></html>",
].join("");

describe("inlineScripts", () => {
	it("returns executable inline scripts only", () => {
		expect(inlineScripts(page)).toEqual(["init()", 'state("a")']);
	});
});

describe("withContentSecurityPolicy", () => {
	let html: string;
	beforeAll(async () => {
		html = await withContentSecurityPolicy(page);
	});

	it("puts the policy first in <head>", () => {
		expect(html).toMatch(
			/^<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy"/,
		);
	});

	it("allows each inline script by its browser-side hash", () => {
		expect(html).toContain(
			`script-src 'self' ${sha("init()")} ${sha('state("a")')}`,
		);
		expect(html).not.toContain("unsafe-inline");
	});

	it("lets pages post to Web3Forms and nowhere else", () => {
		expect(html).toContain("connect-src 'self' https://api.web3forms.com;");
		expect(html).toContain("form-action 'self'");
	});

	it("only inserts the meta tag, leaving the document untouched", async () => {
		const source =
			'<head><script>x("$&$`$\'$$")</script></head><body>$&</body>';
		const result = await withContentSecurityPolicy(source);
		const meta = /<meta http-equiv="Content-Security-Policy"[^>]*\/>/.exec(
			result,
		)?.[0];
		expect(meta).toBeDefined();
		expect(result.replace(meta as string, "")).toBe(source);
	});

	it("rejects a document without <head>", async () => {
		await expect(withContentSecurityPolicy("<p>hi</p>")).rejects.toThrow(
			"CSP: document has no <head>",
		);
	});
});
