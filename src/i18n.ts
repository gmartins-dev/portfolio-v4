export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** URL prefix per locale. English lives at the root; PT-BR under /pt-br. */
const prefixes: Record<Locale, string> = {
	en: "",
	"pt-BR": "/pt-br",
};

/** Prefix a locale-neutral path ("/", "/about") with the locale segment. */
export function localizedPath(locale: Locale, path: string): string {
	const prefixed = `${prefixes[locale]}${path}`;
	return prefixed.length > 1 && prefixed.endsWith("/")
		? prefixed.slice(0, -1)
		: prefixed;
}

/** Inverse of localizedPath: which locale a URL path belongs to. */
export function localeFromPath(pathname: string): Locale {
	const ptPrefix = prefixes["pt-BR"];
	return pathname === ptPrefix || pathname.startsWith(`${ptPrefix}/`)
		? "pt-BR"
		: "en";
}
