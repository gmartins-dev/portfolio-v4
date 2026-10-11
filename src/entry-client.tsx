import { RouterClient } from "@tanstack/react-router/ssr/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createAppRouter } from "./router";

// This module's own URL is the entry the server rendered into <head>
// (hashed in production, the source path in dev), so head tags match.
const router = createAppRouter({
	entryScript: new URL(import.meta.url).pathname,
});

hydrateRoot(
	document,
	<StrictMode>
		<RouterClient router={router} />
	</StrictMode>,
);
