import { useLocation } from "@tanstack/react-router";
import {
	type Locale,
	localeFromPath,
	localizedPath,
	neutralPath,
} from "./i18n";

/** Locale of the current page and a helper to build links in it. */
export function useLocale() {
	const { pathname } = useLocation();
	const locale = localeFromPath(pathname);
	return {
		locale,
		/** Locale-neutral path of the current page, e.g. "/about". */
		page: neutralPath(pathname),
		href: (path: string, target: Locale = locale) =>
			localizedPath(target, path),
	};
}
