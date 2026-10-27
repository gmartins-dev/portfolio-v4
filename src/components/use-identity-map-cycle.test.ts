// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIdentityMapCycle } from "./use-identity-map-cycle";

const stepMs = 3200;

/** Stub matchMedia for a window that is (or isn't) wide and reduces motion. */
function mockMedia({ wide = true, reduce = false } = {}) {
	vi.stubGlobal("matchMedia", (query: string) => ({
		matches: query.includes("min-width") ? wide : reduce,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	}));
}

function setVisibility(state: "visible" | "hidden") {
	Object.defineProperty(document, "visibilityState", {
		configurable: true,
		get: () => state,
	});
	document.dispatchEvent(new Event("visibilitychange"));
}

const render = () =>
	renderHook(() => useIdentityMapCycle({ count: 6, stepMs }));

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => {
	vi.useFakeTimers();
	setVisibility("visible");
});

afterEach(() => {
	cleanup();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe("useIdentityMapCycle", () => {
	it("stays off under reduced motion and sets no timer", () => {
		mockMedia({ reduce: true });
		const { result } = render();
		expect(result.current.active).toBeNull();
		expect(vi.getTimerCount()).toBe(0);
	});

	it("stays off below lg", () => {
		mockMedia({ wide: false });
		const { result } = render();
		expect(result.current.active).toBeNull();
		expect(vi.getTimerCount()).toBe(0);
	});

	it("advances through the six cards and wraps to the first", () => {
		mockMedia();
		const { result } = render();
		const seen = [result.current.active];
		for (let i = 0; i < 6; i++) {
			advance(stepMs);
			seen.push(result.current.active);
		}
		expect(seen).toEqual([0, 1, 2, 3, 4, 5, 0]);
	});

	it("pins a hovered card, replays it, and resumes on leave", () => {
		mockMedia();
		const { result } = render();
		const before = result.current.step;
		act(() => result.current.onCardEnter(3));
		expect(result.current.active).toBe(3);
		expect(result.current.step).toBeGreaterThan(before);

		advance(stepMs * 3);
		expect(result.current.active).toBe(3);

		act(() => result.current.onCardLeave());
		advance(stepMs);
		expect(result.current.active).toBe(4);
	});

	it("pauses in a hidden tab and resumes when visible", () => {
		mockMedia();
		const { result } = render();
		act(() => setVisibility("hidden"));
		advance(stepMs * 2);
		expect(result.current.active).toBe(0);
		expect(vi.getTimerCount()).toBe(0);

		act(() => setVisibility("visible"));
		advance(stepMs);
		expect(result.current.active).toBe(1);
	});

	it("clears its timer on unmount", () => {
		mockMedia();
		const { unmount } = render();
		expect(vi.getTimerCount()).toBe(1);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});
