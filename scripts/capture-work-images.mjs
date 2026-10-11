// Captures screenshots of public, live project pages used as case study
// images, and writes responsive WebP variants (public/work/<name>-<width>.webp)
// using the browser's own encoder. Run manually when a project changes
// visibly: `pnpm capture:work-images`. Keep `widths` in sync with the image
// entries in src/content/work.ts (the content tests check the files exist).
import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const shots = [
	{
		name: "payments-api-node",
		url: "https://payments-api-node-frontend.vercel.app",
	},
	{
		name: "sdd-agentic-flow",
		url: "https://github.com/gmartins-dev/sdd-agentic-flow#readme",
		// The rendered README; the repository file list loads lazily.
		selector: "article.markdown-body",
	},
	{ name: "links", url: "https://gmartins-dev.github.io/links/" },
];

/** Output widths, capped at the capture's own width (838 instead of 1280). */
const widths = [640, 1280];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const encoder = await browser.newPage();

for (const { name, url, selector } of shots) {
	await page.goto(url, { waitUntil: "networkidle" });
	let clip;
	if (selector) {
		const box = await page.locator(selector).first().boundingBox();
		if (!box) throw new Error(`${selector} not found on ${url}`);
		// 4:3, the ratio the teasers display; anything taller is cropped anyway.
		clip = {
			...box,
			height: Math.min(box.height, Math.round((box.width * 3) / 4)),
		};
	}
	const png = await page.screenshot({ type: "png", fullPage: !!clip, clip });

	const variants = await encoder.evaluate(
		async ({ data, widths }) => {
			const image = new Image();
			image.src = `data:image/png;base64,${data}`;
			await image.decode();
			const out = [];
			const targets = [
				...new Set(widths.map((w) => Math.min(w, image.naturalWidth))),
			];
			for (const width of targets) {
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = Math.round(
					(image.naturalHeight * width) / image.naturalWidth,
				);
				const context = canvas.getContext("2d");
				context.imageSmoothingQuality = "high";
				context.drawImage(image, 0, 0, canvas.width, canvas.height);
				out.push({
					width,
					height: canvas.height,
					data: canvas.toDataURL("image/webp", 0.82).split(",")[1],
				});
			}
			return { out, width: image.naturalWidth, height: image.naturalHeight };
		},
		{ data: png.toString("base64"), widths },
	);

	for (const variant of variants.out) {
		const file = `public/work/${name}-${variant.width}.webp`;
		await writeFile(file, Buffer.from(variant.data, "base64"));
		console.log(`${url} -> ${file} (${variant.width}x${variant.height})`);
	}
	console.log(`  intrinsic size ${variants.width}x${variants.height}`);
}

await browser.close();
