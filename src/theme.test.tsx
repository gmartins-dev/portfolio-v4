// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle, themeBootstrapScript } from "./theme";

/** jsdom has no matchMedia; this stub reports a fixed system preference. */
function mockSystemTheme(dark: boolean) {
	vi.stubGlobal(
		"matchMedia",
		vi.fn().mockImplementation((query: string) => ({
			matches: dark && query.includes("dark"),
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		})),
	);
}

const labels = { light: "Light", dark: "Dark", system: "System" };
const isDark = () => document.documentElement.classList.contains("dark");

beforeEach(() => {
	localStorage.clear();
	document.documentElement.className = "";
	mockSystemTheme(false);
});

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe("ThemeToggle", () => {
	it("starts on System, with a named group of three buttons", () => {
		render(<ThemeToggle label="Color theme" optionLabels={labels} />);
		expect(screen.getByRole("group", { name: "Color theme" })).toBeTruthy();
		expect(
			screen
				.getByRole("button", { name: "System" })
				.getAttribute("aria-pressed"),
		).toBe("true");
		expect(
			screen.getByRole("button", { name: "Dark" }).getAttribute("aria-pressed"),
		).toBe("false");
	});

	it("applies and remembers an explicit choice", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle label="Color theme" optionLabels={labels} />);

		await user.click(screen.getByRole("button", { name: "Dark" }));

		expect(isDark()).toBe(true);
		expect(localStorage.getItem("theme")).toBe("dark");
		expect(
			screen.getByRole("button", { name: "Dark" }).getAttribute("aria-pressed"),
		).toBe("true");
	});

	it("System forgets the choice and follows the OS", async () => {
		mockSystemTheme(true);
		localStorage.setItem("theme", "light");
		const user = userEvent.setup();
		render(<ThemeToggle label="Color theme" optionLabels={labels} />);

		await user.click(screen.getByRole("button", { name: "System" }));

		expect(localStorage.getItem("theme")).toBeNull();
		expect(isDark()).toBe(true);
	});

	it("follows a choice made in another tab", () => {
		render(<ThemeToggle label="Color theme" optionLabels={labels} />);

		act(() => {
			localStorage.setItem("theme", "dark");
			window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
		});

		expect(isDark()).toBe(true);
		expect(
			screen.getByRole("button", { name: "Dark" }).getAttribute("aria-pressed"),
		).toBe("true");
	});
});

describe("themeBootstrapScript", () => {
	// Runs the exact inline script the pages ship in <head>.
	const runBootstrap = () => new Function(themeBootstrapScript)();

	it("applies a stored dark choice before React loads", () => {
		localStorage.setItem("theme", "dark");
		runBootstrap();
		expect(isDark()).toBe(true);
	});

	it("follows the OS when nothing is stored", () => {
		mockSystemTheme(true);
		runBootstrap();
		expect(isDark()).toBe(true);
	});

	it("does not throw when storage is unavailable", () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("blocked");
		});
		expect(runBootstrap).not.toThrow();
		vi.restoreAllMocks();
	});
});
