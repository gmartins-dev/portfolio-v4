import { describe, expect, it } from "vitest";
import { finalizeHtml } from "./finalize-html";

describe("finalizeHtml", () => {
	const page =
		'<!DOCTYPE html><html><head></head><body><script class="$tsr">self.$_TSR={i:"__root__\u0000"}</script></body></html>';

	it("removes raw NUL characters but keeps the same JavaScript string", async () => {
		const html = await finalizeHtml(page);
		expect(html).not.toContain("\u0000");
		const script = /<script class="\$tsr">([\s\S]*?)<\/script>/.exec(html)?.[1];
		const value = new Function(
			`const self = {}; ${script}; return self.$_TSR.i;`,
		)();
		expect(value).toBe("__root__\u0000");
	});

	it("adds the CSP after escaping, so hashes match the final script text", async () => {
		const html = await finalizeHtml(page);
		expect(html).toContain('<head><meta http-equiv="Content-Security-Policy"');
	});
});
