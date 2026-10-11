import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { inlineScripts, withContentSecurityPolicy } from "./csp";

const sha = (s: string) =>
	`'sha256-${createHash("sha256").update(s).digest("base64")}'`;

const page = [
	"<!DOCTYPE html><html><head>",
	"<script>theme()</script>",
	'<script type="module" src="/assets/entry.js"></script>',
	'<script type="application/ld+json">{"a":1}</script>',
	"</head><body>",
	'<script class="$tsr">state("a\u0000b")</script>',
	"</body></html>",
].join("");

describe("inlineScripts", () => {
	it("returns executable inline scripts only", () => {
		expect(inlineScripts(page)).toEqual(["theme()", 'state("a�b")']);
	});
});

describe("withContentSecurityPolicy", async () => {
	const html = await withContentSecurityPolicy(page);

	it("puts the policy first in <head>", () => {
		expect(html).toMatch(
			/^<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy"/,
		);
	});

	it("allows each inline script by its browser-side hash", () => {
		expect(html).toContain(
			`script-src 'self' ${sha("theme()")} ${sha('state("a�b")')}`,
		);
		expect(html).not.toContain("unsafe-inline");
	});
});
