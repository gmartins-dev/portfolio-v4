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
