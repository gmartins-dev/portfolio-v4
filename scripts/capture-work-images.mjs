// Captures screenshots of public, live project pages used as case study
// images, and writes responsive WebP variants (public/images/work/<name>-<width>.webp)
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
	{ name: "priorize-me", url: "https://priorizeme.vercel.app/" },
	{ name: "debora-blaso", url: "https://www.deborablaso.com.br/" },
	{
		name: "psicologia-da-moda-clube",
		url: "https://www.psicologiadamoda.club/grupo-estudos",
	},
];

/** Output widths, capped at the capture's own width (838 instead of 1280). */
const widths = [480, 720, 1280];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const encoder = await browser.newPage();

for (const { name, url, selector } of shots) {
	await page.goto(url, { waitUntil: "networkidle" });
	if (selector) {
		// Sticky bars (GitHub's README tabs) would otherwise cover the element.
		await page.evaluate(() => {
			for (const element of document.querySelectorAll("body *")) {
				const { position } = getComputedStyle(element);
				if (position === "sticky" || position === "fixed") {
					element.style.position = "static";
				}
			}
		});
	}
	let clip;
	if (selector) {
		// Page coordinates (viewport box plus scroll): #readme scrolls on load,
		// and a full-page clip is measured from the top of the document.
		clip = await page.evaluate((selector) => {
			const element = document.querySelector(selector);
			if (!element) return null;
			const box = element.getBoundingClientRect();
			return {
				x: box.x + window.scrollX,
				y: box.y + window.scrollY,
				width: box.width,
				height: box.height,
			};
		}, selector);
		if (!clip) throw new Error(`${selector} not found on ${url}`);
	}
	const png = await page.screenshot({
		type: "png",
		fullPage: Boolean(clip),
		clip,
	});

	const variants = await encoder.evaluate(
		async ({ data, widths, crop }) => {
			const image = new Image();
			image.src = `data:image/png;base64,${data}`;
			await image.decode();
			// Element captures are cropped from the top to 4:3, the ratio the
			// teasers display; anything taller would be cropped there anyway.
			const sourceHeight = crop
				? Math.min(
						image.naturalHeight,
						Math.round((image.naturalWidth * 3) / 4),
					)
				: image.naturalHeight;
			const out = [];
			const targets = [
				...new Set(widths.map((w) => Math.min(w, image.naturalWidth))),
			];
			for (const width of targets) {
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = Math.round((sourceHeight * width) / image.naturalWidth);
				const context = canvas.getContext("2d");
				context.imageSmoothingQuality = "high";
				context.drawImage(
					image,
					0,
					0,
					image.naturalWidth,
					sourceHeight,
					0,
					0,
					canvas.width,
					canvas.height,
				);
				out.push({
					width,
					height: canvas.height,
					data: canvas.toDataURL("image/webp", 0.82).split(",")[1],
				});
			}
			return { out, width: image.naturalWidth, height: sourceHeight };
		},
		{ data: png.toString("base64"), widths, crop: Boolean(selector) },
	);

	for (const variant of variants.out) {
		const file = `public/images/work/${name}-${variant.width}.webp`;
		await writeFile(file, Buffer.from(variant.data, "base64"));
		console.log(`${url} -> ${file} (${variant.width}x${variant.height})`);
	}
	console.log(`  intrinsic size ${variants.width}x${variants.height}`);
}

await browser.close();
