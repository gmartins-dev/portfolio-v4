import { useEffect, useState } from "react";

/** Tailwind's `lg`, where the map shows its arc and connectors. */
const wideQuery = "(min-width: 64rem)";
const reduceQuery = "(prefers-reduced-motion: reduce)";

/**
 * Drives the identity map's activation sequence (DESIGN.md, "Motion"). Once
 * `startAfter` resolves, the cards turn active one by one, first to last,
 * every `stepMs`, and stay active; after the last one it stops. `reached`
 * counts the active cards. It stays null on the server, on the first client
 * render, below `lg` and under reduced motion, so the static markup is what
 * everyone else gets. If the map becomes eligible again after it started (a
 * resize back to `lg`), every card shows active at once rather than replaying:
 * `instant` turns true, and the map skips its overlays to their end state.
 */
export function useIdentityMapSequence({
	count,
	stepMs,
	startAfter,
}: {
	count: number;
	stepMs: number;
	startAfter?: () => Promise<void>;
}) {
	const [reached, setReached] = useState<number | null>(null);
	const [instant, setInstant] = useState(false);

	useEffect(() => {
		if (typeof window.matchMedia !== "function") return;
		const wide = window.matchMedia(wideQuery);
		const reduce = window.matchMedia(reduceQuery);
		let started = false;
		let disposed = false;
		let active = 0;
		let timer: ReturnType<typeof setTimeout> | undefined;

		const enabled = () => wide.matches && !reduce.matches;
		const advance = () => {
			active += 1;
			setReached(active);
			if (active < count) timer = setTimeout(advance, stepMs);
		};
		const sync = () => {
			clearTimeout(timer);
			if (!enabled()) {
				setReached(null);
				return;
			}
			if (!started) return;
			if (active === 0) return advance();
			active = count;
			setInstant(true);
			setReached(count);
		};

		(startAfter ? startAfter() : Promise.resolve()).then(() => {
			if (disposed) return;
			started = true;
			sync();
		});
		wide.addEventListener("change", sync);
		reduce.addEventListener("change", sync);

		return () => {
			disposed = true;
			clearTimeout(timer);
			wide.removeEventListener("change", sync);
			reduce.removeEventListener("change", sync);
		};
	}, [count, stepMs, startAfter]);

	return { reached, instant };
}
