import { expect, test } from "@playwright/test";

test.describe("browser prefers Portuguese", () => {
	test.use({ locale: "pt-BR" });

	test("the home page opens in Portuguese, keeping query and hash", async ({
		page,
	}) => {
		await page.goto("/?ref=cv#contact");
		await expect(page).toHaveURL(/\/pt-br\?ref=cv#contact$/);
		await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
	});

	test("other pages are not redirected", async ({ page }) => {
		await page.goto("/about");
		await expect(page).toHaveURL(/\/about$/);
		await expect(page.locator("html")).toHaveAttribute("lang", "en");
	});

	test("choosing English sticks on the next visit to the home page", async ({
		page,
	}) => {
		await page.goto("/pt-br");
		const toggle = page.getByRole("banner").locator("a[hreflang='en']:visible");
		await expect(toggle).toHaveCount(1);
		await toggle.click();
		await expect(page).toHaveURL(/\/$/);
		await page.goto("/");
		await expect(page).toHaveURL(/\/$/);
		await expect(page.locator("html")).toHaveAttribute("lang", "en");
	});
});

test.describe("Portuguese from Portugal", () => {
	test.use({ locale: "pt-PT" });

	test("also opens the Portuguese site", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveURL(/\/pt-br$/);
	});
});

test.describe("any other language", () => {
	for (const locale of ["en-US", "de-DE", "ja-JP"]) {
		test.describe(locale, () => {
			test.use({ locale });

			test("stays on the English home page", async ({ page }) => {
				await page.goto("/");
				await expect(page).toHaveURL(/\/$/);
				await expect(page.locator("html")).toHaveAttribute("lang", "en");
			});
		});
	}
});

test("choosing Portuguese is remembered over an English browser", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("banner").locator("a[hreflang='pt-BR']:visible").click();
	await expect(page).toHaveURL(/\/pt-br$/);
	await page.goto("/");
	await expect(page).toHaveURL(/\/pt-br$/);
});
