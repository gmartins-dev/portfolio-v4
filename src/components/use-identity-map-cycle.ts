import { useCallback, useEffect, useRef, useState } from "react";

/** Tailwind's `lg`, where the map shows its arc and connectors. */
const wideQuery = "(min-width: 64rem)";
const reduceQuery = "(prefers-reduced-motion: reduce)";

type Cycle = { active: number | null; step: number };

/**
 * Drives the identity map's decorative loop (DESIGN.md, "Motion"). `active`
 * stays null on the server, on the first client render, below `lg` and under
 * reduced motion, so the static markup is what everyone else gets. `step`
 * changes on every activation; keying animated elements by it restarts their
 * CSS animations. The loop pauses in a hidden tab, off screen and while a card
 * is hovered (which pins that card). With `startAfter`, the loop stays off
 * until that promise resolves.
 */
export function useIdentityMapCycle({
	count,
	stepMs,
	startAfter,
}: {
	count: number;
	stepMs: number;
	startAfter?: () => Promise<void>;
}) {
	const sectionRef = useRef<HTMLElement>(null);
	const [cycle, setCycle] = useState<Cycle>({ active: null, step: 0 });
	const handlers = useRef({
		enter: (_index: number) => {},
		leave: () => {},
	});

	useEffect(() => {
		if (typeof window.matchMedia !== "function") return;
		const wide = window.matchMedia(wideQuery);
		const reduce = window.matchMedia(reduceQuery);
		let visible = document.visibilityState === "visible";
		let inView = true;
		let pinned = false;
		let timer: ReturnType<typeof setTimeout> | undefined;
		let started = !startAfter;
		let disposed = false;

		const enabled = () => started && wide.matches && !reduce.matches;
		const runnable = () => enabled() && visible && inView && !pinned;
		const stop = () => {
			clearTimeout(timer);
			timer = undefined;
		};
		const schedule = () => {
			stop();
			if (!runnable()) return;
			timer = setTimeout(() => {
				setCycle((c) => ({
					active: ((c.active ?? -1) + 1) % count,
					step: c.step + 1,
				}));
				schedule();
			}, stepMs);
		};
		/** Turn the loop on or off after a media query change. */
		const sync = () => {
			if (!enabled()) {
				stop();
				pinned = false;
				setCycle((c) => (c.active === null ? c : { ...c, active: null }));
				return;
			}
			setCycle((c) =>
				c.active === null ? { active: 0, step: c.step + 1 } : c,
			);
			schedule();
		};
		/** Pause or resume; a resumed card replays its sequence. */
		const resume = (wasRunnable: boolean) => {
			if (!runnable()) return stop();
			if (wasRunnable) return;
			setCycle((c) => ({ ...c, step: c.step + 1 }));
			schedule();
		};

		const onVisibility = () => {
			const was = runnable();
			visible = document.visibilityState === "visible";
			resume(was);
		};
		const observer =
			typeof IntersectionObserver === "function" && sectionRef.current
				? new IntersectionObserver(([entry]) => {
						const was = runnable();
						inView = entry.isIntersecting;
						resume(was);
					})
				: undefined;
		if (observer && sectionRef.current) observer.observe(sectionRef.current);

		handlers.current = {
			enter: (index) => {
				if (!enabled()) return;
				pinned = true;
				stop();
				setCycle((c) => ({ active: index, step: c.step + 1 }));
			},
			leave: () => {
				if (!pinned) return;
				pinned = false;
				schedule();
			},
		};

		wide.addEventListener("change", sync);
		reduce.addEventListener("change", sync);
		document.addEventListener("visibilitychange", onVisibility);
		if (startAfter)
			startAfter().then(() => {
				if (disposed) return;
				started = true;
				sync();
			});
		else sync();

		return () => {
			disposed = true;
			stop();
			observer?.disconnect();
			wide.removeEventListener("change", sync);
			reduce.removeEventListener("change", sync);
			document.removeEventListener("visibilitychange", onVisibility);
			handlers.current = { enter: () => {}, leave: () => {} };
		};
	}, [count, stepMs, startAfter]);

	const onCardEnter = useCallback(
		(index: number) => handlers.current.enter(index),
		[],
	);
	const onCardLeave = useCallback(() => handlers.current.leave(), []);

	return { ...cycle, sectionRef, onCardEnter, onCardLeave };
}
