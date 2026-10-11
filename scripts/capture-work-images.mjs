// Captures screenshots of public, live project pages used as case study
// images. Run manually (`node scripts/capture-work-images.mjs`) when a project
// changes visibly; the JPEGs are committed under public/work/.
import { chromium } from "@playwright/test";

const shots = [
	{
		file: "payments-api-node.jpg",
		url: "https://payments-api-node-frontend.vercel.app",
	},
	{
		file: "sdd-agentic-flow.jpg",
		url: "https://github.com/gmartins-dev/sdd-agentic-flow#readme",
		// The rendered README; the repository file list loads lazily.
		selector: "article.markdown-body",
	},
	{ file: "links.jpg", url: "https://gmartins-dev.github.io/links/" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const { file, url, selector } of shots) {
	await page.goto(url, { waitUntil: "networkidle" });
	const options = { path: `public/work/${file}`, type: "jpeg", quality: 80 };
	if (selector) {
		const box = await page.locator(selector).first().boundingBox();
		if (!box) throw new Error(`${selector} not found on ${url}`);
		await page.screenshot({
			...options,
			fullPage: true,
			clip: {
				x: box.x,
				y: box.y,
				width: box.width,
				height: Math.min(box.height, 900),
			},
		});
	} else {
		await page.screenshot(options);
	}
	console.log(`captured ${url} -> public/work/${file}`);
}
await browser.close();
