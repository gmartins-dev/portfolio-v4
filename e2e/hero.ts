import type { Page } from "@playwright/test";

/**
 * Wait for the home hero entrance (src/hero-entrance.ts) to finish, so checks
 * never measure text mid-fade. Resolves at once on pages without it.
 */
export async function settleHeroEntrance(page: Page) {
	await page.waitForFunction(
		() => document.documentElement.dataset.entrance !== "pending",
	);
	await page.evaluate(() =>
		Promise.all(
			document
				.getAnimations()
				.filter(
					(a) =>
						a instanceof CSSAnimation && a.animationName.startsWith("hero-"),
				)
				.map((a) => a.finished),
		),
	);
}

/** Hero entrance animations currently attached to the page. */
export function heroAnimations(page: Page) {
	return page.evaluate(
		() =>
			document
				.getAnimations()
				.filter(
					(a) =>
						a instanceof CSSAnimation && a.animationName.startsWith("hero-"),
				).length,
	);
}
