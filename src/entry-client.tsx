import { RouterClient } from "@tanstack/react-router/ssr/client";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createAppRouter } from "./router";

// This module's own URL is the entry the server rendered into <head>
// (hashed in production, the source path in dev), so head tags match.
const router = createAppRouter({
	entryScript: new URL(import.meta.url).pathname,
});

// The hero entrance plays once per document load (src/hero-entrance.ts).
// Ending it as the first client navigation starts means a home page reached
// by a link renders at rest.
const stopWatching = router.subscribe("onBeforeNavigate", (event) => {
	if (!event.fromLocation || !event.pathChanged) return;
	delete document.documentElement.dataset.entrance;
	stopWatching();
});

hydrateRoot(
	document,
	<StrictMode>
		<RouterClient router={router} />
	</StrictMode>,
);

// Real-user Core Web Vitals (docs/adr/006). Production only, after the page
// has loaded so it never competes with the LCP. The script comes from this
// origin, which the page CSP already allows (script-src and connect-src
// 'self'); the explicit src keeps the package from loading its debug build
// from another host.
if (import.meta.env.PROD) {
	const start = () =>
		injectSpeedInsights({ scriptSrc: "/_vercel/speed-insights/script.js" });
	if (document.readyState === "complete") start();
	else addEventListener("load", start, { once: true });
}
