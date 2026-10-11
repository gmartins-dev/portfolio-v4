import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * After a client-side navigation, move focus to the new page's <h1> so
 * screen readers announce the page and keyboard users continue from its
 * content instead of from <body>. The first render is skipped: a full page
 * load already starts at the top of the document, and the skip link and
 * in-page anchors (hash changes) keep their native behaviour.
 */
export function RouteFocus() {
	// resolvedLocation changes only after the new route has loaded; location
	// changes when navigation starts, while the old page is still mounted.
	const pathname = useRouterState({
		select: (state) => state.resolvedLocation?.pathname,
	});
	const previous = useRef(pathname);

	useEffect(() => {
		if (previous.current === pathname) return;
		previous.current = pathname;
		const heading = document.querySelector<HTMLElement>("#main h1");
		if (!heading) return;
		heading.tabIndex = -1;
		heading.focus({ preventScroll: true });
	}, [pathname]);

	return null;
}
