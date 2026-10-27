// Exports the hero portrait from its brand master
// (brand/social/source/portrait-1024.png) to responsive WebP variants
// (public/images/profile/portrait-<width>.webp), using the browser's own
// encoder as scripts/capture-work-images.mjs does. Run manually after
// replacing the master: `pnpm export:portrait`. Keep `widths` in sync with
// src/components/identity-map.tsx.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const master = "brand/social/source/portrait-1024.png";
const widths = [160, 320];

const png = await readFile(master);
await mkdir("public/images/profile", { recursive: true });

const browser = await chromium.launch();
const encoder = await browser.newPage();
const variants = await encoder.evaluate(
	async ({ data, widths }) => {
		const image = new Image();
		image.src = `data:image/png;base64,${data}`;
		await image.decode();
		return widths.map((width) => {
			// Halve in steps so the downscale stays sharp at small sizes.
			let source = image;
			let size = image.naturalWidth;
			while (size / 2 >= width) {
				size /= 2;
				const step = document.createElement("canvas");
				step.width = size;
				step.height = size;
				const context = step.getContext("2d");
				context.imageSmoothingQuality = "high";
				context.drawImage(source, 0, 0, size, size);
				source = step;
			}
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = width;
			const context = canvas.getContext("2d");
			context.imageSmoothingQuality = "high";
			context.drawImage(source, 0, 0, width, width);
			return {
				width,
				data: canvas.toDataURL("image/webp", 0.85).split(",")[1],
			};
		});
	},
	{ data: png.toString("base64"), widths },
);

for (const variant of variants) {
	const file = `public/images/profile/portrait-${variant.width}.webp`;
	await writeFile(file, Buffer.from(variant.data, "base64"));
	console.log(`${master} -> ${file} (${variant.width}x${variant.width})`);
}

await browser.close();
