// Renders the social preview cards (1200x630 PNG) listed in src/og-cards.ts
// into public/images/og/. The look follows brand/guidelines/brand-guidelines.md:
// navy background, the wordmark from brand/logos/svg and Inter Display from
// brand/fonts. Run manually after changing a headline or adding a case study:
// `pnpm build:og-images`. The PNGs are committed, so builds and CI do not need
// a browser. The apple-touch-icon ships from brand/icons/.
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { createServer } from "vite";

const vite = await createServer({
	server: { middlewareMode: true },
	appType: "custom",
	logLevel: "error",
});
const { ogCards } = await vite.ssrLoadModule("/src/og-cards.ts");
await vite.close();

const brand = (file) => new URL(`../brand/${file}`, import.meta.url);

const fontFace = async (family, weight, file) => {
	const data = await readFile(brand(`fonts/${file}`));
	return `@font-face { font-family: "${family}"; font-weight: ${weight}; src: url(data:font/otf;base64,${data.toString("base64")}) format("opentype"); }`;
};

// Colors from brand/guidelines (navy-950, mist, slate-400, blue-400).
const style = `
${await fontFace("Inter Display", 600, "InterDisplay-SemiBold.otf")}
${await fontFace("Inter Display", 700, "InterDisplay-Bold.otf")}
${await fontFace("Inter", 400, "Inter-Regular.otf")}
${await fontFace("Inter", 600, "Inter-SemiBold.otf")}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #08121C; color: #E8EEF5; font-family: Inter, system-ui, sans-serif; }
.card { height: 100%; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
.logo svg { display: block; width: 300px; height: auto; }
.text { display: flex; flex-direction: column; gap: 22px; }
.kicker { font-size: 26px; color: #8A9BB0; }
h1 { font-family: "Inter Display", Inter, sans-serif; font-size: 72px; font-weight: 600; line-height: 1.05; letter-spacing: -0.025em; max-width: 1000px; }
.url { font-size: 26px; font-weight: 600; color: #5B9BFF; }
`;

const logo = await readFile(brand("logos/svg/logo-primary-dark.svg"), "utf8");

const escapeHtml = (text) =>
	text.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

await mkdir("public/images/og", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const card of ogCards) {
	await page.setContent(
		`<html lang="${card.lang}"><style>${style}</style><body><div class="card">
			<div class="logo">${logo}</div>
			<div class="text">
				<p class="kicker">${escapeHtml(card.kicker)}</p>
				<h1>${escapeHtml(card.title)}</h1>
			</div>
			<p class="url">gmartins.dev</p>
		</div></body></html>`,
	);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: `public/images/og/${card.file}` });
	console.log(`rendered public/images/og/${card.file}`);
}

await browser.close();
