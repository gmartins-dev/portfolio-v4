import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

// WCAG 2.2 AA, checked in both themes (DESIGN.md).
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const colorScheme of ["light", "dark"] as const) {
	test.describe(`accessibility in ${colorScheme} mode @a11y`, () => {
		test.use({ colorScheme });

		for (const { path } of [...pages, { path: "/does-not-exist" }]) {
			test(path, async ({ page }) => {
				await page.goto(path);
				const results = await new AxeBuilder({ page }).withTags(tags).analyze();
				expect(
					results.violations.map((v) => ({
						id: v.id,
						nodes: v.nodes.map((n) => n.target.join(" ")),
					})),
				).toEqual([]);
			});
		}
	});
}

// Checks axe cannot make: layout at 400% zoom and keyboard focus visibility.
test.describe("manual WCAG checks, automated @a11y", () => {
	test.use({ viewport: { width: 320, height: 800 } });

	for (const { path } of pages) {
		test(`${path} reflows at 320px without horizontal scrolling (1.4.10)`, async ({
			page,
		}) => {
			await page.goto(path);
			const overflow = await page.evaluate(
				() =>
					document.documentElement.scrollWidth -
					document.documentElement.clientWidth,
			);
			expect(overflow).toBe(0);
		});
	}

	test("every keyboard focus stop shows an outline (2.4.7)", async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, "keyboard journey");
		for (const path of ["/", "/work/payments-api-node", "/does-not-exist"]) {
			await page.goto(path);
			const missing: string[] = [];
			for (let stop = 0; stop < 40; stop++) {
				await page.keyboard.press("Tab");
				const focused = await page.evaluate(() => {
					const element = document.activeElement;
					if (!element || element === document.body) return null;
					const style = getComputedStyle(element);
					return {
						name: (element.textContent ?? "").trim().slice(0, 30),
						visible:
							style.outlineStyle !== "none" &&
							Number.parseFloat(style.outlineWidth) > 0,
					};
				});
				if (!focused) break;
				if (!focused.visible) missing.push(`${path}: ${focused.name}`);
			}
			expect(missing).toEqual([]);
		}
	});
});
