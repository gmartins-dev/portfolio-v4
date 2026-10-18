// Renders every Mermaid source in scripts/diagrams/ to WebP variants at
// public/images/work/<name>-<width>.webp, for case studies that cannot show
// screenshots (anonymized work). Uses the official Mermaid build in
// Chromium, so parsing errors fail loudly. Run manually after editing a
// diagram: `pnpm render:diagrams` (loads Mermaid from jsDelivr). Pass names
// to render only those: `pnpm render:diagrams sdd-agentic-flow`.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const widths = [480, 720, 1280];
const dir = new URL("./diagrams/", import.meta.url);
const all = (await readdir(dir)).filter((file) => file.endsWith(".mmd"));
const only = process.argv.slice(2);
const unknown = only.filter((name) => !all.includes(`${name}.mmd`));
if (unknown.length) throw new Error(`unknown diagrams: ${unknown.join(", ")}`);
const files = only.length
	? all.filter((file) => only.includes(file.replace(/\.mmd$/, "")))
	: all;

const browser = await chromium.launch();
// 2x device pixels: the capture is downscaled to each width, never upscaled.
const page = await browser.newPage({
	viewport: { width: 1600, height: 1400 },
	deviceScaleFactor: 2,
});
await page.setContent(
	'<html><body style="margin:0;background:#fff"><div id="out" style="display:inline-block;padding:32px;background:#fff"></div></body></html>',
);
await page.addScriptTag({
	url: "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js",
});

for (const file of files) {
	const name = file.replace(/\.mmd$/, "");
	const source = await readFile(new URL(file, dir), "utf8");
	const error = await page.evaluate(async (code) => {
		try {
			mermaid.initialize({ startOnLoad: false });
			const { svg } = await mermaid.render("diagram", code);
			const out = document.getElementById("out");
			out.innerHTML = svg;
			// Mermaid sizes the SVG to its container; pin a readable width.
			const element = out.querySelector("svg");
			element.style.maxWidth = "none";
			element.style.width = "1100px";
			element.style.height = "auto";
			return null;
		} catch (problem) {
			return String(problem);
		}
	}, source);
	if (error) throw new Error(`${file}: ${error}`);

	const png = await page.locator("#out").screenshot({ type: "png" });
	const variants = await page.evaluate(
		async ({ data, widths }) => {
			const image = new Image();
			image.src = `data:image/png;base64,${data}`;
			await image.decode();
			return Promise.all(
				widths.map(async (width) => {
					const canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = Math.round(
						(image.naturalHeight * width) / image.naturalWidth,
					);
					const context = canvas.getContext("2d");
					context.imageSmoothingQuality = "high";
					context.drawImage(image, 0, 0, canvas.width, canvas.height);
					return {
						width,
						height: canvas.height,
						data: canvas.toDataURL("image/webp", 0.9).split(",")[1],
					};
				}),
			);
		},
		{ data: png.toString("base64"), widths },
	);
	for (const variant of variants) {
		const out = `public/images/work/${name}-${variant.width}.webp`;
		await writeFile(out, Buffer.from(variant.data, "base64"));
		console.log(`${file} -> ${out} (${variant.width}x${variant.height})`);
	}
}

await browser.close();
