import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * After a client-side navigation, move focus to the new page's <h1> so
 * screen readers announce the page and keyboard users continue from its
 * content instead of from <body>. A link to an anchor on another page
 * (/cases#vochlea) focuses that anchor instead; the router scrolls to it. The
 * first render is skipped: a full page load already starts at the top of the
 * document, and the skip link and in-page anchors (hash changes) keep their
 * native behaviour.
 */
export function RouteFocus() {
	// resolvedLocation changes only after the new route has loaded; location
	// changes when navigation starts, while the old page is still mounted.
	const pathname = useRouterState({
		select: (state) => state.resolvedLocation?.pathname,
	});
	const hash = useRouterState({
		select: (state) => state.resolvedLocation?.hash,
	});
	const previous = useRef(pathname);

	useEffect(() => {
		if (previous.current === pathname) return;
		previous.current = pathname;
		const target =
			(hash && document.getElementById(hash)) ||
			document.querySelector<HTMLElement>("#main h1");
		if (!target) return;
		target.tabIndex = -1;
		target.focus({ preventScroll: true });
	}, [pathname, hash]);

	return null;
}
