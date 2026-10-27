import { expect, test } from "@playwright/test";

// The desktop identity map draws its dots and connectors from fixed geometry
// (src/components/identity-map.tsx), so check the rendered cards still match it.
test.describe("home identity map", () => {
	test.use({ viewport: { width: 1440, height: 900 } });

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
