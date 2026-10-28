import { describe, expect, it } from "vitest";
import { localeStorageKey } from "./i18n";
import { localeRedirectScript } from "./locale-redirect";

type Env = {
	pathname?: string;
	languages?: string[] | undefined;
	language?: string;
	saved?: string | null;
	storageThrows?: boolean;
	/** Value in sessionStorage, the fallback when localStorage is blocked. */
	session?: string | null;
};

/** Runs the script against stubbed browser globals; returns the redirect target. */
function run({
	pathname = "/",
	languages,
	language = "en-US",
	saved = null,
	storageThrows = false,
	session = null,
}: Env) {
	let target: string | undefined;
	const location = {
		pathname,
		search: "?utm=x",
		hash: "#contact",
		replace: (url: string) => {
			target = url;
		},
	};
	const localStorage = {
		getItem: (key: string) => {
			if (storageThrows) throw new Error("blocked");
			return key === localeStorageKey ? saved : null;
		},
	};
	const sessionStorage = {
		getItem: (key: string) => (key === localeStorageKey ? session : null),
	};
	const navigator = { languages, language };
	new Function(
		"location",
		"navigator",
		"localStorage",
		"sessionStorage",
		localeRedirectScript,
	)(location, navigator, localStorage, sessionStorage);
	return target;
}

describe("localeRedirectScript", () => {
	it.each([[["pt-BR"]], [["pt-PT"]], [["pt"]], [["PT-br"]], [["fr", "pt"]]])(
		"sends %j to /pt-br and keeps the query and hash",
		(languages) => {
			expect(run({ languages })).toBe("/pt-br?utm=x#contact");
		},
	);

	it.each([[["en-US"]], [["de-DE"]], [["en", "pt"]], [[]]])(
		"keeps %j in English",
		(languages) => {
			expect(run({ languages })).toBeUndefined();
		},
	);

	it("falls back to navigator.language", () => {
		expect(run({ languages: undefined, language: "pt-BR" })).toBe(
			"/pt-br?utm=x#contact",
		);
	});

	it("lets a saved choice win over the browser language", () => {
		expect(run({ languages: ["pt-BR"], saved: "en" })).toBeUndefined();
		expect(run({ languages: ["en-US"], saved: "pt-BR" })).toBe(
			"/pt-br?utm=x#contact",
		);
	});

	it("ignores an invalid saved value and detects from the browser", () => {
		expect(run({ languages: ["pt-BR"], saved: "xx" })).toBe(
			"/pt-br?utm=x#contact",
		);
		expect(run({ languages: ["en-US"], saved: "xx" })).toBeUndefined();
	});

	it("acts only on the home page", () => {
		for (const pathname of ["/about", "/pt-br", "/cases/priorize-me"]) {
			expect(run({ pathname, languages: ["pt-BR"] })).toBeUndefined();
		}
	});

	it("still detects when storage is blocked", () => {
		expect(run({ languages: ["pt-BR"], storageThrows: true })).toBe(
			"/pt-br?utm=x#contact",
		);
	});

	it("falls back to sessionStorage when localStorage is blocked", () => {
		expect(
			run({ languages: ["pt-BR"], storageThrows: true, session: "en" }),
		).toBeUndefined();
	});
});
