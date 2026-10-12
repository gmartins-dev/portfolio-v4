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
});

test("work journey: home to case study and back", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "See all work" }).click();
	await expect(page).toHaveURL(/\/work$/);
	await page.getByRole("link", { name: "Idempotent payments API" }).click();
	await expect(page).toHaveURL(/\/work\/payments-api-node$/);
	await expect(page).toHaveTitle(
		"Idempotent payments API case study | Guilherme Martins",
	);
	await page.getByRole("link", { name: "All work" }).click();
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");
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
	await page.goto("/work/sdd-agentic-flow");
	await page.getByRole("link", { name: "Ler em português" }).click();
	await expect(page).toHaveURL(/\/pt-br\/work\/sdd-agentic-flow$/);
	await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		"https://gmartins.dev/pt-br/work/sdd-agentic-flow",
	);
	await expect(page.locator("title")).toHaveCount(1);
	await page.getByRole("link", { name: "Read in English" }).click();
	await expect(page).toHaveURL(/\/work\/sdd-agentic-flow$/);
});

test("theme choice applies before paint and persists", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/about");
	const html = page.locator("html");
	await expect(html).not.toHaveClass(/dark/);

	await page.getByRole("button", { name: "Dark" }).click();
	await expect(html).toHaveClass(/dark/);
	await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);

	await page.reload();
	await expect(html).toHaveClass(/dark/);

	await page.getByRole("button", { name: "System" }).click();
	await expect(html).not.toHaveClass(/dark/);
});

test("system theme follows the OS preference", async ({ page }) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	await expect(page.locator("html")).toHaveClass(/dark/);
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

test("an About company link opens its product on the Work page", async ({
	page,
}) => {
	await page.goto("/about");
	await page
		.getByRole("link", { name: /See the product ?\(Nisien\.ai\)/ })
		.click();
	await expect(page).toHaveURL(/\/work#nisien-ai$/);
	const target = page.locator("#nisien-ai");
	await expect(target).toBeFocused();
	await expect(target).toBeInViewport();
});
