import { defineConfig, devices } from "@playwright/test";

const port = 4173;

/**
 * End-to-end tests run against the production build (prerendered dist/)
 * served the way Vercel serves it. Run `pnpm build` first.
 */
export default defineConfig({
	testDir: "e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [["github"], ["list"]] : "list",
	use: {
		baseURL: `http://localhost:${port}`,
		// First-visit detection redirects "/" by browser language; pin it for the suite.
		locale: "en-US",
		trace: "retain-on-failure",
	},
	projects: [
		{ name: "desktop", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile", use: { ...devices["Pixel 7"] } },
	],
	webServer: {
		command: `node scripts/serve-dist.mjs ${port}`,
		url: `http://localhost:${port}`,
		reuseExistingServer: !process.env.CI,
	},
});
