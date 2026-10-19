// Renders the social preview cards (1200x630 PNG) listed in src/og-cards.ts
// into public/images/og/, plus the apple-touch-icon. Run manually after changing a
// headline or adding a case study: `pnpm build:og-images`. The PNGs are
// committed, so builds and CI do not need a browser.
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

const font = (file) =>
	readFile(new URL(`../node_modules/${file}`, import.meta.url)).then((data) =>
		data.toString("base64"),
	);
const sans = await font(
	"@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
);
const mono = await font(
	"@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
);

// Dark theme values from src/index.css (approximated in sRGB for the PNG).
const style = `
@font-face { font-family: Geist; src: url(data:font/woff2;base64,${sans}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: GeistMono; src: url(data:font/woff2;base64,${mono}) format("woff2"); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #08121c; color: #eaf4fc; font-family: Geist; }
.card { height: 100%; padding: 80px 88px; display: flex; flex-direction: column; justify-content: space-between; border-left: 16px solid #79d7f5; }
.kicker { font-family: GeistMono; font-size: 28px; color: #9db2c5; }
h1 { font-size: 76px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 600; max-width: 960px; }
.url { font-family: GeistMono; font-size: 28px; color: #79d7f5; }
.icon { width: 180px; height: 180px; background: #08121c; color: #79d7f5; display: grid; place-items: center; font-size: 104px; font-weight: 700; letter-spacing: -0.04em; }
`;

const escapeHtml = (text) =>
	text.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

await mkdir("public/images/og", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const card of ogCards) {
	await page.setContent(
		`<html lang="${card.lang}"><style>${style}</style><body><div class="card">
			<p class="kicker">${escapeHtml(card.kicker)}</p>
			<h1>${escapeHtml(card.title)}</h1>
			<p class="url">gmartins.dev</p>
		</div></body></html>`,
	);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: `public/images/og/${card.file}` });
	console.log(`rendered public/images/og/${card.file}`);
}

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(
	`<html><style>${style} body { width: 180px; height: 180px; }</style><body><div class="icon">G</div></body></html>`,
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/apple-touch-icon.png" });
console.log("rendered public/apple-touch-icon.png");

await browser.close();
