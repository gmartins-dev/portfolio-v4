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
			test(`${path} at ${width}px stacks name, nav and language`, async ({
				page,
			}) => {
				await page.setViewportSize({ width, height: 800 });
				await page.goto(path);
				const top = async (selector: string) =>
					(await page.getByRole("banner").locator(selector).boundingBox())?.y;
				// The language toggle is the last item: below the nav on phones.
				const nameTop = (await top("a[translate=no]")) ?? 0;
				const navTop = (await top("nav")) ?? 0;
				const langTop = (await top("a[hreflang]")) ?? 0;
				expect(navTop).toBeGreaterThan(nameTop);
				expect(langTop).toBeGreaterThan(navTop);
				const header = await page.getByRole("banner").boundingBox();
				expect(header?.height).toBeLessThan(160);
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
