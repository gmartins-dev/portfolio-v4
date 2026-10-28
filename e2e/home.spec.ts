import { expect, test } from "@playwright/test";
import { heroAnimations, settleHeroEntrance } from "./hero";

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

// The hero is the first impression: all of it, buttons and principles
// included, fits a 1440x790 window (DESIGN.md, "First screen").
test.describe("home hero first screen", () => {
	for (const path of ["/", "/pt-br"]) {
		test(`${path} fits a 1440x790 window`, async ({ page, isMobile }) => {
			test.skip(isMobile, "desktop layout");
			await page.setViewportSize({ width: 1440, height: 790 });
			await page.goto(path);
			await page.evaluate(() => document.fonts.ready);
			const bottom = await page
				.locator("main section")
				.first()
				.evaluate((hero) =>
					Math.max(
						...[...hero.children].map(
							(el) => el.getBoundingClientRect().bottom,
						),
					),
				);
			expect(bottom).toBeLessThanOrEqual(790);
		});

		test(`${path} centers between the header and the fold`, async ({
			page,
			isMobile,
		}) => {
			test.skip(isMobile, "desktop layout");
			await page.setViewportSize({ width: 1536, height: 864 });
			await page.goto(path);
			await page.evaluate(() => document.fonts.ready);
			const { above, below } = await page.evaluate(() => {
				const header = document.querySelector("header");
				const hero = document.querySelector("main section");
				if (!header || !hero) throw new Error("hero not rendered");
				const boxes = [...hero.children].map((el) =>
					el.getBoundingClientRect(),
				);
				return {
					above:
						Math.min(...boxes.map((box) => box.top)) -
						header.getBoundingClientRect().bottom,
					below: innerHeight - Math.max(...boxes.map((box) => box.bottom)),
				};
			});
			expect(Math.abs(above - below)).toBeLessThanOrEqual(2);
		});
	}
});

// The two hero columns (headline to buttons, cards to principles) keep the
// same height, so neither block hangs below the other (DESIGN.md, "Hero").
test.describe("home hero balance", () => {
	for (const width of [1024, 1280, 1440]) {
		for (const path of ["/", "/pt-br"]) {
			test(`${path} at ${width}px balances the two columns`, async ({
				page,
				isMobile,
			}) => {
				test.skip(isMobile, "desktop layout");
				await page.setViewportSize({ width, height: 900 });
				await page.goto(path);
				await page.evaluate(() => document.fonts.ready);
				const heights = await page
					.locator("main section")
					.first()
					.evaluate((hero) =>
						[...hero.children].map((el) => el.getBoundingClientRect().height),
					);
				expect(heights).toHaveLength(2);
				expect(Math.abs(heights[0] - heights[1])).toBeLessThanOrEqual(24);
			});
		}
	}
});

// The activation sequence (DESIGN.md, "Motion"): after the entrance, the
// cards turn active one by one, stay active, and the map then holds still.
// Desktop only, off under reduced motion.
test.describe("home identity map motion", () => {
	const cards = (page: import("@playwright/test").Page) =>
		page.locator('section[aria-labelledby="identity-map"] ol > li');
	const activeCards = (page: import("@playwright/test").Page) =>
		cards(page).evaluateAll((items) =>
			items.map((li) => li.className.includes("bg-muted")),
		);

	test("activates the cards in order and stops with all active", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "desktop layout");
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto("/");
		// Active cards always form a prefix: first to last, none turned off.
		const seen = new Set<number>();
		await expect
			.poll(
				async () => {
					const active = await activeCards(page);
					const count = active.filter(Boolean).length;
					expect(active).toEqual(active.map((_, index) => index < count));
					seen.add(count);
					return count;
				},
				{ timeout: 10_000, intervals: [100] },
			)
			.toBe(6);
		expect(seen.size).toBeGreaterThan(2);
		await page.waitForTimeout(2000);
		expect(await activeCards(page)).toEqual(Array(6).fill(true));
	});

	test("starts with no card highlighted before the sequence runs", async ({
		browser,
		isMobile,
	}) => {
		test.skip(isMobile, "desktop layout");
		// Without JavaScript the page shows exactly the prerendered markup.
		const context = await browser.newContext({
			viewport: { width: 1440, height: 900 },
			javaScriptEnabled: false,
		});
		const page = await context.newPage();
		await page.goto(`${test.info().project.use.baseURL}/`);
		const borders = await cards(page).evaluateAll((items) =>
			items.map((li) => getComputedStyle(li).borderTopColor),
		);
		const brand = await page
			.locator('section[aria-labelledby="identity-map"] svg circle')
			.first()
			.evaluate((dot) => getComputedStyle(dot).color);
		expect(new Set(borders).size).toBe(1);
		expect(borders[0]).not.toBe(brand);
		await context.close();
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
		expect(await activeCards(page)).toEqual(Array(6).fill(false));
		for (const card of await cards(page).all()) {
			await expect(card).toHaveClass(/border-brand/);
		}
		await context.close();
	});

	test("does not animate below lg", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/");
		await page.waitForTimeout(3500);
		expect(await activeCards(page)).toEqual(Array(6).fill(false));
		await expect(page.locator("[class*=identity-]")).toHaveCount(0);
	});
});

// The hero entrance (DESIGN.md, "Hero entrance") plays on a document load and
// not when a link brings the visitor back to the home page.
test.describe("home hero entrance", () => {
	test("plays on load, not after a client navigation", async ({ page }) => {
		await page.goto("/");
		await page.waitForFunction(
			() => document.documentElement.dataset.entrance === "play",
		);
		expect(await heroAnimations(page)).toBeGreaterThan(0);
		await settleHeroEntrance(page);
		await page.getByRole("link", { name: "See the cases" }).click();
		await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cases");
		await page.goBack();
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"From problem definition to production.",
		);
		expect(await heroAnimations(page)).toBe(0);
	});

	test("does not play under reduced motion", async ({ browser }) => {
		const context = await browser.newContext({ reducedMotion: "reduce" });
		const page = await context.newPage();
		await page.goto(`${test.info().project.use.baseURL}/`);
		expect(
			await page.evaluate(() => document.documentElement.dataset.entrance),
		).toBeUndefined();
		expect(await heroAnimations(page)).toBe(0);
		await context.close();
	});

	test("keeps the hero visible without JavaScript", async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto(`${test.info().project.use.baseURL}/`);
		// No cover over the headline, and the rest of the hero at rest.
		const cover = await page
			.locator(".hero-headline")
			.evaluate((h1) => getComputedStyle(h1, "::after").content);
		expect(cover).toBe("none");
		await expect(page.locator(".hero-intro")).toHaveCSS("opacity", "1");
		await context.close();
	});
});
