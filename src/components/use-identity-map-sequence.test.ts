// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIdentityMapSequence } from "./use-identity-map-sequence";

const stepMs = 450;

/** Stub matchMedia for a window that is (or isn't) wide and reduces motion. */
function mockMedia({ wide = true, reduce = false } = {}) {
	vi.stubGlobal("matchMedia", (query: string) => ({
		matches: query.includes("min-width") ? wide : reduce,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	}));
}

/** Render the hook and let its start promise settle. */
async function render(startAfter?: () => Promise<void>) {
	const view = renderHook(() =>
		useIdentityMapSequence({ count: 6, stepMs, startAfter }),
	);
	await act(async () => {});
	return view;
}

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	cleanup();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe("useIdentityMapSequence", () => {
	it("stays off under reduced motion and sets no timer", async () => {
		mockMedia({ reduce: true });
		const { result } = await render();
		expect(result.current.reached).toBeNull();
		expect(vi.getTimerCount()).toBe(0);
	});

	it("stays off below lg", async () => {
		mockMedia({ wide: false });
		const { result } = await render();
		expect(result.current.reached).toBeNull();
		expect(vi.getTimerCount()).toBe(0);
	});

	it("activates the cards one by one and stops after the last", async () => {
		mockMedia();
		const { result } = await render();
		const seen = [result.current.reached];
		for (let i = 0; i < 7; i++) {
			advance(stepMs);
			seen.push(result.current.reached);
		}
		expect(seen).toEqual([1, 2, 3, 4, 5, 6, 6, 6]);
		expect(vi.getTimerCount()).toBe(0);
	});

	it("waits for startAfter", async () => {
		mockMedia();
		let start = () => {};
		const { result } = await render(
			() =>
				new Promise<void>((resolve) => {
					start = resolve;
				}),
		);
		advance(stepMs * 3);
		expect(result.current.reached).toBeNull();

		await act(async () => start());
		expect(result.current.reached).toBe(1);
	});

	it("shows every card at once, without replaying, back at lg", async () => {
		const media = { wide: true };
		const listeners = new Set<() => void>();
		vi.stubGlobal("matchMedia", (query: string) => ({
			get matches() {
				return query.includes("min-width") ? media.wide : false;
			},
			media: query,
			addEventListener: (_: string, listener: () => void) =>
				listeners.add(listener),
			removeEventListener: (_: string, listener: () => void) =>
				listeners.delete(listener),
		}));
		const resize = (wide: boolean) =>
			act(() => {
				media.wide = wide;
				for (const listener of listeners) listener();
			});
		const { result } = await render();
		advance(stepMs);
		expect(result.current).toEqual({ reached: 2, instant: false });

		resize(false);
		expect(result.current.reached).toBeNull();
		resize(true);
		expect(result.current).toEqual({ reached: 6, instant: true });
		expect(vi.getTimerCount()).toBe(0);
	});

	it("clears its timer on unmount", async () => {
		mockMedia();
		const { unmount } = await render();
		expect(vi.getTimerCount()).toBe(1);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});
