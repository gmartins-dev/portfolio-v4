import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

test.describe("every page @smoke", () => {
	for (const { path, lang, h1 } of pages) {
		test(`${path} renders, hydrates and loads its assets`, async ({ page }) => {
			const problems: string[] = [];
			page.on("console", (message) => {
				if (message.type() === "error" || message.type() === "warning") {
					problems.push(message.text());
				}
			});
			page.on("pageerror", (error) => problems.push(String(error)));

			const response = await page.goto(path);
			expect(response?.status()).toBe(200);
			await expect(page.locator("html")).toHaveAttribute("lang", lang);
			await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
			await expect(page.locator("h1")).toHaveCount(1);
			await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
				"href",
				`https://gmartins.dev${path}`,
			);

			// Scroll everything into view so lazy images load, then check them.
			for (const image of await page.locator("img").all()) {
				await image.scrollIntoViewIfNeeded();
				await expect
					.poll(() =>
						image.evaluate((img: HTMLImageElement) => img.naturalWidth),
					)
					.toBeGreaterThan(0);
			}

			await page.waitForLoadState("networkidle");
			expect(problems).toEqual([]);
		});
	}

	test("the list covers every prerendered page", () => {
		const htmlFiles = (dir: string, prefix = ""): string[] =>
			readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
				entry.isDirectory()
					? htmlFiles(`${dir}/${entry.name}`, `${prefix}/${entry.name}`)
					: entry.name.endsWith(".html") && entry.name !== "404.html"
						? [
								`${prefix}/${entry.name.replace(/\.html$/, "")}`.replace(
									/^\/index$/,
									"/",
								),
							]
						: [],
			);
		expect(htmlFiles("dist").sort()).toEqual(pages.map((p) => p.path).sort());
	});
});

test("unknown paths get the 404 page in both languages @smoke", async ({
	page,
}) => {
	for (const path of ["/does-not-exist", "/pt-br/nao-existe"]) {
		const response = await page.goto(path);
		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Page not found",
		);
		await expect(page.getByText("Página não encontrada")).toBeVisible();
	}
});
