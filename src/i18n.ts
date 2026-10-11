export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

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

/** Strip the locale prefix: "/pt-br/about" -> "/about", "/pt-br" -> "/". */
export function neutralPath(pathname: string): string {
	const prefix = prefixes[localeFromPath(pathname)];
	const rest = pathname.slice(prefix.length);
	return rest === "" ? "/" : rest;
}

/** The other locale, for the language switcher (two locales today). */
export function otherLocale(locale: Locale): Locale {
	return locale === "en" ? "pt-BR" : "en";
}

/** "2024-01" -> "Jan 2024" / "jan. de 2024", in UTC so server and client agree. */
export function formatMonth(yearMonth: string, locale: Locale): string {
	const [year, month] = yearMonth.split("-").map(Number);
	return new Intl.DateTimeFormat(locale, {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(year, month - 1)));
}
