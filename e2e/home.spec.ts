import { expect, test } from "@playwright/test";

// The desktop identity map draws its dots and connectors from fixed geometry
// (src/components/identity-map.tsx), so check the rendered cards still match it.
test.describe("home identity map", () => {
	// Reduced motion keeps the map static, so the geometry check sees no
	// active card or border trace.
	test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

	for (const path of ["/", "/pt-br"]) {
		test(`${path} aligns dots with cards and clips no text`, async ({
			page,
			isMobile,
		}) => {
			test.skip(isMobile, "desktop layout");
			await page.goto(path);
			await page.evaluate(() => document.fonts.ready);
			const section = page.locator('section[aria-labelledby="identity-map"]');
			const cards = await section.locator("ol > li").all();
			const dots = await section.locator("svg circle").all();
			const photo = await section.locator("img").boundingBox();
			expect(cards).toHaveLength(6);
			expect(dots).toHaveLength(6);
			if (!photo) throw new Error("portrait not rendered");

			for (const [index, card] of cards.entries()) {
				const box = await card.boundingBox();
				const dot = await dots[index].boundingBox();
				if (!box || !dot) throw new Error(`card ${index} not rendered`);
				expect(
					Math.abs(dot.y + dot.height / 2 - (box.y + box.height / 2)),
					`dot ${index}`,
				).toBeLessThan(2);
				expect(dot.x + dot.width, `dot ${index} left of card`).toBeLessThan(
					box.x,
				);
				expect(box.x, `card ${index} right of photo`).toBeGreaterThan(
					photo.x + photo.width,
				);
				const clipped = await card.evaluate(
					(li) => li.scrollHeight - li.clientHeight,
				);
				expect(clipped, `card ${index} text`).toBe(0);
			}
		});
	}
});

// The decorative loop (DESIGN.md, "Motion"): desktop only, off under reduced
// motion, one card active at a time.
test.describe("home identity map motion", () => {
	const cards = (page: import("@playwright/test").Page) =>
		page.locator('section[aria-labelledby="identity-map"] ol > li');
	const activeIndex = (page: import("@playwright/test").Page) =>
		cards(page).evaluateAll((items) =>
			items.findIndex((li) => li.className.includes("bg-muted")),
		);

	test("cycles through the cards on desktop", async ({ page, isMobile }) => {
		test.skip(isMobile, "desktop layout");
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto("/");
		await expect.poll(() => activeIndex(page)).toBe(0);
		await expect.poll(() => activeIndex(page), { timeout: 5000 }).toBe(1);
		await expect(cards(page).nth(0)).toHaveClass(/border-border/);

		// Hover pins a card.
		await cards(page).nth(4).hover();
		await expect.poll(() => activeIndex(page)).toBe(4);
		await page.waitForTimeout(3500);
		expect(await activeIndex(page)).toBe(4);
	});

	test("stays static under reduced motion", async ({ browser, isMobile }) => {
		test.skip(isMobile, "desktop layout");
		const context = await browser.newContext({
			viewport: { width: 1440, height: 900 },
			reducedMotion: "reduce",
		});
		const page = await context.newPage();
		await page.goto(`${test.info().project.use.baseURL}/`);
		await page.waitForTimeout(3500);
		expect(await activeIndex(page)).toBe(-1);
		for (const card of await cards(page).all()) {
			await expect(card).toHaveClass(/border-brand/);
		}
		await context.close();
	});

	test("does not animate below lg", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/");
		await page.waitForTimeout(3500);
		expect(await activeIndex(page)).toBe(-1);
		await expect(page.locator("[class*=identity-]")).toHaveCount(0);
	});
});
