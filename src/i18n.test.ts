import { describe, expect, it } from "vitest";
import {
	localeFromPath,
	localizedPath,
	neutralPath,
	otherLocale,
} from "./i18n";

describe("localeFromPath", () => {
	it("detects the PT-BR prefix", () => {
		expect(localeFromPath("/pt-br")).toBe("pt-BR");
		expect(localeFromPath("/pt-br/about")).toBe("pt-BR");
		expect(localeFromPath("/pt-br/")).toBe("pt-BR");
	});

	it("treats everything else as English", () => {
		expect(localeFromPath("/")).toBe("en");
		expect(localeFromPath("/about")).toBe("en");
		expect(localeFromPath("/pt-brx")).toBe("en");
	});

	it("matches the prefix case-insensitively, like the router", () => {
		expect(localeFromPath("/PT-BR/about")).toBe("pt-BR");
		expect(localeFromPath("/Pt-Br")).toBe("pt-BR");
	});
});

describe("neutralPath", () => {
	it("strips the locale prefix", () => {
		expect(neutralPath("/pt-br/about")).toBe("/about");
		expect(neutralPath("/pt-br")).toBe("/");
		expect(neutralPath("/PT-BR/about")).toBe("/about");
	});

	it("leaves English paths alone", () => {
		expect(neutralPath("/")).toBe("/");
		expect(neutralPath("/cases/priorize-me")).toBe("/cases/priorize-me");
	});
});

describe("otherLocale", () => {
	it("swaps between the two locales", () => {
		expect(otherLocale("en")).toBe("pt-BR");
		expect(otherLocale("pt-BR")).toBe("en");
	});
});

describe("localizedPath", () => {
	it("prefixes only PT-BR and drops trailing slashes", () => {
		expect(localizedPath("en", "/")).toBe("/");
		expect(localizedPath("en", "/about")).toBe("/about");
		expect(localizedPath("pt-BR", "/")).toBe("/pt-br");
		expect(localizedPath("pt-BR", "/about")).toBe("/pt-br/about");
	});
});
