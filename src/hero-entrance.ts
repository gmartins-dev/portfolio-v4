/**
 * The home hero entrance (DESIGN.md, "Hero entrance"). The motion itself is
 * CSS (src/index.css), keyed off `data-entrance` on <html>:
 *
 * - "pending": the hero is held invisible until the page has painted once and
 *   its fonts are ready, so nothing animates in a fallback font and then
 *   swaps, and no animation starts before the first frame.
 * - "play": the entrance runs once.
 * - absent: the hero is static. That is the case without JavaScript, under
 *   reduced motion, when fonts take longer than `fontBudgetMs`, and after the
 *   first client navigation (src/entry-client.tsx), so a home page reached by
 *   a link does not replay it.
 *
 * `heroEntranceScript` runs inline in <head>, before the body renders, so the
 * hero is never painted visible and then hidden. Its hash enters the page CSP
 * like any other inline script (src/csp.ts).
 */
const fontBudgetMs = 1200;

export const heroEntranceScript = `(()=>{const root=document.documentElement;if(!matchMedia("(prefers-reduced-motion: no-preference)").matches)return;root.dataset.entrance="pending";const end=(state)=>{if(root.dataset.entrance!=="pending")return;if(state)root.dataset.entrance=state;else delete root.dataset.entrance};const timer=setTimeout(end,${fontBudgetMs});requestAnimationFrame(()=>requestAnimationFrame(()=>document.fonts.ready.then(()=>{clearTimeout(timer);requestAnimationFrame(()=>end("play"))})))})();`;

/** Resolves once the entrance has played out, or at once if it never runs. */
export function whenHeroEntranceSettled(): Promise<void> {
	const root = document.documentElement;
	return new Promise((resolve) => {
		const observer = new MutationObserver(check);
		function check() {
			if (root.dataset.entrance === "pending") return;
			observer.disconnect();
			const running =
				root.dataset.entrance === "play" &&
				typeof document.getAnimations === "function"
					? document
							.getAnimations()
							.filter(
								(animation) =>
									animation instanceof CSSAnimation &&
									animation.animationName.startsWith("hero-"),
							)
					: [];
			Promise.all(
				running.map((animation) => animation.finished.catch(() => undefined)),
			).then(() => resolve());
		}
		observer.observe(root, { attributeFilter: ["data-entrance"] });
		check();
	});
}
