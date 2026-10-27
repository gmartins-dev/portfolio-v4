import { expect, test } from "@playwright/test";

test("skip link moves focus to the main content", async ({
	page,
	isMobile,
}) => {
	test.skip(isMobile, "keyboard journey");
	await page.goto("/");
	await page.keyboard.press("Tab");
	const skip = page.getByRole("link", { name: "Skip to content" });
	await expect(skip).toBeFocused();
	await page.keyboard.press("Enter");
	await expect(page).toHaveURL(/#main$/);
	await expect(page.locator("main#main")).toBeFocused();
});

test("work journey: home to case study and back", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "See the cases" }).click();
	await expect(page).toHaveURL(/\/cases$/);
	await page.getByRole("link", { name: "Priorize.me" }).first().click();
	await expect(page).toHaveURL(/\/cases\/priorize-me$/);
	await expect(page).toHaveTitle("Priorize.me case study | Guilherme Martins");
	await page.getByRole("link", { name: "All cases" }).click();
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cases");
});

test("client-side navigation moves focus to the new page heading", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Full background" }).click();
	await expect(page).toHaveURL(/\/about$/);
	await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
	expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("language switch keeps the page and updates head tags", async ({
	page,
}) => {
	await page.goto("/cases/sdd-agentic-flow");
	await page.getByRole("link", { name: /ler em português$/ }).click();
	await expect(page).toHaveURL(/\/pt-br\/cases\/sdd-agentic-flow$/);
	await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		"https://gmartins.dev/pt-br/cases/sdd-agentic-flow",
	);
	await expect(page.locator("title")).toHaveCount(1);
	await page.getByRole("link", { name: /read in English$/ }).click();
	await expect(page).toHaveURL(/\/cases\/sdd-agentic-flow$/);
});

test("legacy short links redirect", async ({ request }) => {
	const cases = [
		["/resume", 308, "/about"],
		["/construction", 308, "/"],
		["/gh", 307, "https://github.com/gmartins-dev"],
		// Vercel cannot redirect to mailto: (it becomes a relative path, as v3
		// shows), so the short link lands on the contact section instead.
		["/email", 307, "/#contact"],
		// v3 project pages land on the matching entry of /projects.
		["/projects/web/sharespot", 308, "/projects#sharespot"],
		["/projects/web/pokedex", 308, "/projects"],
	] as const;
	for (const [path, status, location] of cases) {
		const response = await request.get(path, { maxRedirects: 0 });
		expect(response.status()).toBe(status);
		expect(response.headers().location).toBe(location);
	}
});

test("an About company link opens its product on the Cases page", async ({
	page,
}) => {
	await page.goto("/about");
	await page
		.getByRole("link", { name: /See the product ?\(Nisien\.ai\)/ })
		.click();
	await expect(page).toHaveURL(/\/cases#nisien-ai$/);
	const target = page.locator("#nisien-ai");
	await expect(target).toBeFocused();
	await expect(target).toBeInViewport();
});

test.describe("phone header", () => {
	for (const width of [320, 360, 390]) {
		for (const path of ["/", "/pt-br"]) {
			test(`${path} at ${width}px puts name and language above the nav`, async ({
				page,
			}) => {
				await page.setViewportSize({ width, height: 800 });
				await page.goto(path);
				const banner = page.getByRole("banner");
				const box = async (selector: string) =>
					(await banner
						.locator(selector)
						.filter({ visible: true })
						.boundingBox()) ?? {
						x: 0,
						y: 0,
						width: 0,
						height: 0,
					};
				// One visible toggle, on the name's row; the nav takes the next row.
				await expect(
					banner.locator("a[hreflang]").filter({ visible: true }),
				).toHaveCount(1);
				const name = await box("a[translate=no]");
				const nav = await box("nav");
				const lang = await box("a[hreflang]");
				expect(
					Math.abs(lang.y + lang.height / 2 - (name.y + name.height / 2)),
				).toBeLessThan(4);
				expect(nav.y).toBeGreaterThanOrEqual(name.y + name.height);
				const header = await banner.boundingBox();
				// Two rows; three at 320px in pt-BR, where the nav wraps between items.
				expect(header?.height).toBeLessThan(120);
			});
		}
	}
});

test("a case study offers the other case studies at its end", async ({
	page,
}) => {
	await page.goto("/cases/sdd-agentic-flow");
	const others = page.getByRole("navigation", { name: "Other case studies" });
	await expect(others.getByRole("link")).toHaveCount(2);
	await expect(
		others.getByRole("link", { name: "sdd-agentic-flow" }),
	).toHaveCount(0);
	await others.getByRole("link", { name: "Priorize.me" }).click();
	await expect(page).toHaveURL(/\/cases\/priorize-me$/);
	await expect(page.getByRole("heading", { level: 1 })).toBeFocused();

	await page.goto("/pt-br/cases/priorize-me");
	await expect(
		page
			.getByRole("navigation", { name: "Outros estudos de caso" })
			.getByRole("link"),
	).toHaveCount(2);
});
