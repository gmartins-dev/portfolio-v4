import { expect, test } from "@playwright/test";

test("sends the contact form without CSP violations", async ({ page }) => {
	const violations: string[] = [];
	page.on("console", (message) => {
		if (/content security policy/i.test(message.text())) {
			violations.push(message.text());
		}
	});
	await page.route("https://api.web3forms.com/submit", (route) =>
		route.fulfill({ json: { success: true } }),
	);
	await page.goto("/contact");
	const name = page.getByLabel("Name");
	// The form only exists in builds that have VITE_WEB3FORMS_ACCESS_KEY.
	test.skip(!(await name.count()), "no Web3Forms access key in this build");
	await name.fill("Ada");
	await page.getByLabel("Email").fill("ada@example.com");
	await page.getByLabel("Message").fill("Hello");
	await page.getByRole("button", { name: "Send message" }).click();
	await expect(page.getByRole("status")).toContainText("Message sent");
	expect(violations).toEqual([]);
});
