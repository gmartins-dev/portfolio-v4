// Composes the hero portrait master (brand/social/source/portrait-1024.png)
// from the raw photo (brand/social/source/portrait-photo-2026.png): swaps the
// photo's royal blue backdrop for the site palette, adds a faint brand glow
// behind the head, and bakes in the brand ring. The backdrop is keyed by
// color, so skin, beard and hair never match it, and the face region is
// copied from the photo without recoloring (the final crop then scales the
// whole image into the ring, face included). Colors come from src/index.css.
// Run manually after replacing the
// photo: `pnpm compose:portrait`, then `pnpm export:portrait`.
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const photo = "brand/social/source/portrait-photo-2026.png";
const master = "brand/social/source/portrait-1024.png";

const css = await readFile("src/index.css", "utf8");
const root = css.slice(
	css.indexOf(":root {"),
	css.indexOf("}", css.indexOf(":root {")),
);
const token = (name) => {
	const match = root.match(new RegExp(`--${name}: (oklch\\([^)]*\\));`));
	if (!match) throw new Error(`--${name} not found in src/index.css`);
	return match[1];
};
const colors = {
	background: token("background"),
	secondary: token("secondary"),
	brand: token("brand"),
};

const browser = await chromium.launch();
const page = await browser.newPage();
const png = await page.evaluate(
	async ({ data, colors }) => {
		const image = new Image();
		image.src = `data:image/png;base64,${data}`;
		await image.decode();
		const size = image.naturalWidth;
		const canvas = (draw) => {
			const c = document.createElement("canvas");
			c.width = size;
			c.height = size;
			const context = c.getContext("2d", { willReadFrequently: true });
			draw?.(context);
			return { c, context };
		};
		const pixels = ({ context }) => context.getImageData(0, 0, size, size).data;
		const smoothstep = (a, b, x) => {
			const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
			return t * t * (3 - 2 * t);
		};

		const original = pixels(
			canvas((context) => context.drawImage(image, 0, 0)),
		);

		// Face and beard, kept exactly as photographed. The ellipse also
		// covers a little backdrop beside the jaw; only pixels that are
		// clearly backdrop (key of 0.5 or more) change there.
		const face = { x: 505, y: 440, rx: 145, ry: 210 };
		const inFace = (x, y) =>
			((x - face.x) / face.rx) ** 2 + ((y - face.y) / face.ry) ** 2 <= 1;
		const protectedPixels = new Uint8Array(size * size);

		// Backdrop mask: how far blue leads red and green, absolutely (so
		// near-black hair stays out) and relative to blue (so the bluish
		// white of the shirt stays out).
		const mask = new Float32Array(size * size);
		const keyed = canvas();
		const keyedData = keyed.context.createImageData(size, size);
		for (let i = 0; i < mask.length; i++) {
			const r = original[i * 4];
			const g = original[i * 4 + 1];
			const b = original[i * 4 + 2];
			const lead = b - Math.max(r, g);
			let m =
				smoothstep(4, 18, lead) * smoothstep(0.2, 0.45, lead / Math.max(b, 1));
			if (inFace(i % size, Math.floor(i / size)) && m < 0.5) {
				protectedPixels[i] = 1;
				m = 0;
			}
			mask[i] = m;
			keyedData.data[i * 4] = b * m;
			keyedData.data[i * 4 + 1] = 255 * m;
			keyedData.data[i * 4 + 3] = 255;
		}
		keyed.context.putImageData(keyedData, 0, 0);

		// The backdrop's local brightness, from the masked pixels only, so
		// its fine texture survives the swap without darkening near the
		// subject.
		const blurred = pixels(
			canvas((context) => {
				context.filter = "blur(20px)";
				context.drawImage(keyed.c, 0, 0);
			}),
		);

		const target = pixels(
			canvas((context) => {
				context.fillStyle = colors.background;
				context.fillRect(0, 0, size, size);
				const base = context.createRadialGradient(
					size * 0.5,
					size * 0.4,
					0,
					size * 0.5,
					size * 0.4,
					size * 0.62,
				);
				base.addColorStop(0, colors.secondary);
				base.addColorStop(1, colors.background);
				context.fillStyle = base;
				context.fillRect(0, 0, size, size);
				const glow = context.createRadialGradient(
					size * 0.5,
					size * 0.42,
					size * 0.08,
					size * 0.5,
					size * 0.42,
					size * 0.46,
				);
				glow.addColorStop(0, colors.brand);
				glow.addColorStop(1, "transparent");
				context.globalAlpha = 0.16;
				context.fillStyle = glow;
				context.fillRect(0, 0, size, size);
			}),
		);

		const out = canvas();
		const outData = out.context.createImageData(size, size);
		for (let i = 0; i < mask.length; i++) {
			const o = i * 4;
			const r = original[o];
			const g = original[o + 1];
			const b = original[o + 2];
			outData.data[o + 3] = 255;
			if (protectedPixels[i]) {
				outData.data[o] = r;
				outData.data[o + 1] = g;
				outData.data[o + 2] = b;
				continue;
			}
			// Despill: no channel of blue light left on hair and shirt edges.
			const despilled = Math.min(b, Math.max(r, g) + 2);
			const m = mask[i];
			const weight = blurred[o + 1] / 255;
			const local = weight > 0.01 ? blurred[o] / weight : b;
			const texture = Math.min(1.25, Math.max(0.75, b / Math.max(local, 1)));
			for (const [channel, value] of [
				[0, r],
				[1, g],
				[2, despilled],
			]) {
				const swapped = target[o + channel] * (m > 0 ? texture : 1);
				outData.data[o + channel] = value * (1 - m) + swapped * m;
			}
		}
		out.context.putImageData(outData, 0, 0);

		// Circular crop with the brand ring, as the previous master.
		const final = canvas((context) => {
			context.fillStyle = colors.background;
			context.fillRect(0, 0, size, size);
			context.save();
			context.beginPath();
			context.arc(size / 2, size / 2, 488, 0, Math.PI * 2);
			context.clip();
			context.imageSmoothingQuality = "high";
			context.drawImage(out.c, 24, 24, 976, 976);
			context.restore();
			context.beginPath();
			context.arc(size / 2, size / 2, 493, 0, Math.PI * 2);
			context.lineWidth = 14;
			context.strokeStyle = colors.brand;
			context.stroke();
		});
		return final.c.toDataURL("image/png").split(",")[1];
	},
	{ data: (await readFile(photo)).toString("base64"), colors },
);
await browser.close();

await writeFile(master, Buffer.from(png, "base64"));
console.log(`${photo} -> ${master}`);
