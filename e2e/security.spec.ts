import { expect, test } from "@playwright/test";

// scripts/serve-dist.mjs applies the vercel.json header rules, so these
// check the production configuration.
test("pages send the security headers", async ({ request }) => {
	const headers = (await request.get("/cases")).headers();
	expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
	expect(headers["x-frame-options"]).toBe("DENY");
	for (const feature of ["camera", "microphone", "payment", "usb"]) {
		expect(headers["permissions-policy"]).toContain(`${feature}=()`);
	}
});

test("social cards stay loadable from other sites", async ({ request }) => {
	const headers = (await request.get("/images/og/home-en.png")).headers();
	expect(headers["cross-origin-resource-policy"]).toBe("cross-origin");
});

test("Speed Insights loads from this origin after the page loads", async ({
	page,
}) => {
	await page.goto("/about");
	await page.waitForLoadState("load");
	await expect(
		page.locator('script[src="/_vercel/speed-insights/script.js"]'),
	).toHaveCount(1);
});
