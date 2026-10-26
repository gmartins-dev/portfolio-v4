// Captures screenshots of public, live project pages used as case study
// images, and writes responsive WebP variants (public/images/work/<name>-<width>.webp)
// using the browser's own encoder. Run manually when a project changes
// visibly: `pnpm capture:work-images`. Keep `widths` in sync with the image
// entries in src/content/work.ts and src/content/professional-work.ts (the
// content tests check the files exist). Pass shot names to capture only those:
// `pnpm capture:work-images loop vochlea`.
import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const shots = [
	// sdd-agentic-flow shows its README workflow diagram instead
	// (scripts/diagrams/sdd-agentic-flow.mmd, `pnpm render:diagrams`).
	{ name: "links", url: "https://gmartins-dev.github.io/links/" },
	{ name: "priorize-me", url: "https://priorizeme.vercel.app/" },
	{ name: "debora-blaso", url: "https://www.deborablaso.com.br/" },
	{
		name: "psicologia-da-moda-clube",
		url: "https://www.psicologiadamoda.club/grupo-estudos",
	},
	// Company sites for /work's professional work section.
	{
		name: "nisien-ai",
		url: "https://nisien.ai/our-solution/hero/",
		hideCookieBanner: true,
	},
	{
		name: "backbase",
		url: "https://www.backbase.com/digital-banking",
		hideCookieBanner: true,
	},
	{ name: "vochlea", url: "https://vochlea.com" },
	{
		name: "loop",
		url: "https://www.loop.software/features",
		hideCookieBanner: true,
		// Analytics keep the network busy; wait for load plus a moment.
		waitUntil: "load",
	},
	{
		// The live site now shows a different product; capture the Internet
		// Archive copy from the contract period ("if_" drops the archive bar).
		name: "chatwith-io",
		url: "https://web.archive.org/web/20230202155443if_/https://chatwith.io/",
		waitUntil: "load",
	},
];

const only = process.argv.slice(2);
const selected = only.length
	? shots.filter((shot) => only.includes(shot.name))
	: shots;
const unknown = only.filter(
	(name) => !shots.some((shot) => shot.name === name),
);
if (unknown.length) throw new Error(`unknown shots: ${unknown.join(", ")}`);

/** Output widths, capped at the capture's own width. */
const widths = [480, 720, 1280];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const encoder = await browser.newPage();

for (const {
	name,
	url,
	hideCookieBanner,
	waitUntil = "networkidle",
} of selected) {
	await page.goto(url, { waitUntil });
	await page.waitForTimeout(1500);
	if (hideCookieBanner) {
		// Consent dialogs and their dimming overlays are fixed-position layers;
		// remove the ones about cookies and any empty full-screen overlay.
		await page.evaluate(() => {
			for (const element of document.querySelectorAll("body *")) {
				if (getComputedStyle(element).position !== "fixed") continue;
				const box = element.getBoundingClientRect();
				const overlay =
					box.width >= window.innerWidth &&
					box.height >= window.innerHeight &&
					!element.textContent.trim();
				if (overlay || /cookie/i.test(element.textContent)) element.remove();
			}
		});
	}
	const png = await page.screenshot({ type: "png" });

	const variants = await encoder.evaluate(
		async ({ data, widths }) => {
			const image = new Image();
			image.src = `data:image/png;base64,${data}`;
			await image.decode();
			const sourceHeight = image.naturalHeight;
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
		{ data: png.toString("base64"), widths },
	);

	for (const variant of variants.out) {
		const file = `public/images/work/${name}-${variant.width}.webp`;
		await writeFile(file, Buffer.from(variant.data, "base64"));
		console.log(`${url} -> ${file} (${variant.width}x${variant.height})`);
	}
	console.log(`  intrinsic size ${variants.width}x${variants.height}`);
}

await browser.close();
