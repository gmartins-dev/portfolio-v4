import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

// WCAG 2.2 AA, checked on the dark theme (DESIGN.md).
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe("accessibility @a11y", () => {
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
		for (const path of [
			"/",
			"/cases",
			"/about",
			"/cases/sdd-agentic-flow",
			"/pt-br",
			"/pt-br/cases/priorize-me",
			"/does-not-exist",
		]) {
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

test("heading levels never skip on any page (1.3.1)", async ({ page }) => {
	for (const { path } of [...pages, { path: "/does-not-exist" }]) {
		await page.goto(path);
		const levels = await page
			.locator("h1, h2, h3, h4, h5, h6")
			.evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
		expect(levels[0], path).toBe(1);
		expect(levels.filter((l) => l === 1).length, path).toBe(1);
		for (let i = 1; i < levels.length; i++) {
			expect(
				levels[i] - levels[i - 1],
				`${path} heading ${i}`,
			).toBeLessThanOrEqual(1);
		}
	}
});

// axe keeps this rule out of the WCAG tags (it is experimental), so run it on
// its own: visible text must be part of the accessible name (2.5.3), which
// matters for voice control. Mobile runs it on the short "PT"/"EN" link text.
test("visible link and button text is part of the accessible name (2.5.3) @a11y", async ({
	page,
}) => {
	for (const path of ["/", "/pt-br/cases/priorize-me"]) {
		await page.goto(path);
		const results = await new AxeBuilder({ page })
			.withRules(["label-content-name-mismatch"])
			.analyze();
		expect(
			results.violations.flatMap((v) => v.nodes.map((n) => n.html)),
		).toEqual([]);
	}
});

test.describe("print @a11y", () => {
	test.use({ viewport: { width: 1024, height: 800 } });

	test("a case study prints readable", async ({ page }) => {
		await page.goto("/cases/sdd-agentic-flow");
		await page.emulateMedia({ media: "print" });

		// Print drops backgrounds, so text must be dark on the white page.
		// Computed colors can serialize as oklch(), so convert to sRGB through a
		// canvas before comparing channels.
		const [r, g, b] = await page.evaluate(() => {
			const context = document.createElement("canvas").getContext("2d");
			if (!context) throw new Error("no 2d canvas context");
			context.fillStyle = getComputedStyle(document.body).color;
			context.fillRect(0, 0, 1, 1);
			return [...context.getImageData(0, 0, 1, 1).data];
		});
		expect(r + g + b).toBeLessThan(3 * 128);

		// Controls that do nothing on paper are left out.
		await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
		await expect(page.getByRole("link", { name: "All cases" })).toBeHidden();
		await expect(page.getByRole("link", { name: "Email me" })).toBeHidden();
		await expect(page.getByText("contact@gmartins.dev")).toBeVisible();

		// Code wraps instead of being cut at the page edge (when the case
		// study has a code excerpt).
		for (const element of await page.locator("pre").all()) {
			const clipped = await element.evaluate(
				(pre) => pre.scrollWidth - pre.clientWidth,
			);
			expect(clipped).toBe(0);
		}
	});
});
