import { Fragment } from "react";
import { copy, t } from "../content/copy";
import { whenHeroEntranceSettled } from "../hero-entrance";
import type { Locale } from "../i18n";
import { useIdentityMapSequence } from "./use-identity-map-sequence";

/**
 * Desktop geometry of the map, in px inside its 32rem (512px) column. Cards
 * stack from the top; their left edges follow a circle of `arcRadius` that
 * bulges toward the middle, and the decorative SVG is drawn from the same
 * numbers, so dots stay on the card centers. Tailwind needs literal class
 * names, so `offsetClasses` repeats `offsets` (identity-map.test.tsx checks
 * they match).
 */
export const geometry = {
	width: 528,
	cardHeight: 100,
	cardGap: 18,
	offsets: [258, 274, 284, 284, 274, 258],
	/** Dots sit this far left of their card. */
	dotInset: 12,
	/** The portrait, flush with the column's left edge. */
	photo: { x: 120, radius: 120 },
	/** Connectors start on this circle around the photo center. */
	connectorRadius: 130,
	/**
	 * The steepest connector leaves the photo at this angle in degrees; the
	 * others scale down with it, so every connector starts on the portrait's
	 * right side instead of its top or bottom.
	 */
	connectorMaxAngle: 35,
	arcRadius: 650,
};

/**
 * Timing of the activation sequence (DESIGN.md, "Motion"): a card turns
 * active every `stepMs`, and each phase below runs in ms from that moment.
 * The keyframes in src/index.css repeat these delays and durations as
 * literals; change both together.
 */
export const motion = {
	stepMs: 450,
	/** The beam, with its halo, travels one way: photo to dot. */
	pulse: { start: 0, ms: 360 },
	/** The card turns active (background, border, shift left). */
	focus: { start: 300, ms: 450 },
	/** The dot pings and stays bright. */
	ping: { start: 330, ms: 500 },
	/** Light runs around the card border. */
	trace: { start: 340, ms: 700 },
	/** A ring spreads from the card. */
	radiate: { start: 700, ms: 800 },
};

/** Card corner radius in px, matching `rounded-lg` (--radius). */
const cardRadius = 8;

/**
 * The card border split into two halves that start where the connector meets
 * the card (left middle) and end at the right middle, one over the top edge
 * and one under the bottom. Coordinates sit on the 1px border's center.
 */
export function cardOutline(offset: number) {
	const w = geometry.width - offset;
	const h = geometry.cardHeight;
	const r = cardRadius;
	const mid = h / 2;
	const top = `M0.5 ${mid} V${r + 0.5} A${r} ${r} 0 0 1 ${r + 0.5} 0.5 H${w - r - 0.5} A${r} ${r} 0 0 1 ${w - 0.5} ${r + 0.5} V${mid}`;
	const bottom = `M0.5 ${mid} V${h - r - 0.5} A${r} ${r} 0 0 0 ${r + 0.5} ${h - 0.5} H${w - r - 0.5} A${r} ${r} 0 0 0 ${w - 0.5} ${h - r - 0.5} V${mid}`;
	return { width: w, height: h, top, bottom };
}

export const offsetClasses = [
	"lg:ml-[258px]",
	"lg:ml-[274px]",
	"lg:ml-[284px]",
	"lg:ml-[284px]",
	"lg:ml-[274px]",
	"lg:ml-[258px]",
];

/**
 * Top of the portrait at lg, centering it on the card stack. A literal for
 * Tailwind; identity-map.test.tsx checks it against `geometry`.
 */
export const photoTopClass = "lg:top-[225px]";

const height =
	geometry.offsets.length * geometry.cardHeight +
	(geometry.offsets.length - 1) * geometry.cardGap;
const photoY = height / 2;

const dots = geometry.offsets.map((offset, index) => ({
	x: offset - geometry.dotInset,
	y: index * (geometry.cardHeight + geometry.cardGap) + geometry.cardHeight / 2,
}));

const angles = dots.map((dot) =>
	Math.atan2(dot.y - photoY, dot.x - geometry.photo.x),
);
const angleScale =
	(geometry.connectorMaxAngle * Math.PI) /
	180 /
	Math.max(...angles.map(Math.abs));

const connectors = dots.map((dot, index) => {
	const angle = angles[index] * angleScale;
	return {
		x1: geometry.photo.x + geometry.connectorRadius * Math.cos(angle),
		y1: photoY + geometry.connectorRadius * Math.sin(angle),
		x2: dot.x,
		y2: dot.y,
	};
});

const first = dots[0];
const last = dots[dots.length - 1];
const arc = `M${first.x} ${first.y} A${geometry.arcRadius} ${geometry.arcRadius} 0 0 1 ${last.x} ${last.y}`;

/**
 * "a · b · c" with each middle dot bound to the word before it, so no line
 * starts with one, and hyphenated words kept whole ("trade-offs" never
 * splits after its hyphen). `wholeItems` keeps every item on one line, for
 * short items such as the principles ("AI leverage" never splits).
 */
function dottedItems(text: string, { wholeItems = false } = {}) {
	if (wholeItems) {
		const items = text.split(" · ");
		// Screen readers hear a comma instead of the dot, as in MetaLine.
		return items.map((item, index) =>
			index < items.length - 1 ? (
				<Fragment key={item}>
					<span className="whitespace-nowrap">
						{item}
						{"\u00a0"}
						<span aria-hidden="true">·</span>
						<span className="sr-only">,</span>
					</span>{" "}
				</Fragment>
			) : (
				<span key={item} className="whitespace-nowrap">
					{item}
				</span>
			),
		);
	}
	return text
		.replaceAll(" · ", "\u00a0· ")
		.split(/(\S*-\S*)/)
		.map((piece, index) =>
			piece.includes("-") ? (
				// biome-ignore lint/suspicious/noArrayIndexKey: static text, never reordered.
				<span key={index} className="whitespace-nowrap">
					{piece}
				</span>
			) : (
				piece
			),
		);
}

const cardMotion =
	"transition-[background-color,border-color,translate] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]";

/** Card classes: static (all alike), or the sequence's active and resting states. */
function cardClass(index: number, reached: number | null) {
	const base = `relative rounded-lg border px-3.5 py-2.5 lg:flex lg:h-[100px] lg:flex-col lg:justify-center ${offsetClasses[index]}`;
	// Where the sequence will run (desktop, motion allowed), cards start at
	// rest so each activation reads as one; elsewhere all six share the brand
	// border.
	if (reached === null)
		return `${base} border-brand bg-card lg:motion-safe:border-border`;
	return index < reached
		? `${base} ${cardMotion} border-brand bg-muted delay-[300ms] lg:-translate-x-1.5`
		: `${base} ${cardMotion} border-border bg-card`;
}

export function IdentityMap({ locale }: { locale: Locale }) {
	const map = copy.home.identityMap;
	// The sequence starts once the hero entrance has played out.
	const { reached, instant } = useIdentityMapSequence({
		count: dots.length,
		stepMs: motion.stepMs,
		startAfter: whenHeroEntranceSettled,
	});
	const isActive = (index: number) => reached !== null && index < reached;
	return (
		<section
			aria-labelledby="identity-map"
			className={`mt-12 lg:mt-0 lg:w-[528px]${instant ? " identity-instant" : ""}`}
		>
			<h2 id="identity-map" className="sr-only">
				{t(map.listLabel, locale)}
			</h2>
			<div className="lg:relative">
				<svg
					aria-hidden="true"
					focusable="false"
					width={geometry.width}
					height={height}
					viewBox={`0 0 ${geometry.width} ${height}`}
					fill="none"
					className="hero-lines pointer-events-none absolute inset-0 hidden text-border lg:block print:hidden"
				>
					<path
						d={arc}
						stroke="currentColor"
						strokeWidth="1"
						strokeDasharray="3 6"
					/>
					{connectors.map((line, index) => (
						<line
							key={`${line.x2}-${line.y2}`}
							{...line}
							stroke="currentColor"
							strokeWidth="1"
							className={
								reached === null
									? "text-brand/40 lg:motion-safe:text-brand/20"
									: `text-brand transition-opacity duration-[400ms] ${isActive(index) ? "opacity-90" : "opacity-20"}`
							}
						/>
					))}
					{/* The entrance's pulses, one per connector (src/index.css). */}
					<g>
						{connectors.map((line) => (
							<line
								key={`boot-${line.x2}-${line.y2}`}
								{...line}
								pathLength={1}
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								className="hero-boot text-brand"
							/>
						))}
					</g>
					{/* Each card's beam mounts when it activates and plays once. */}
					{connectors.map(
						(line, index) =>
							isActive(index) && (
								<Fragment key={`beam-${line.x2}-${line.y2}`}>
									<line
										{...line}
										pathLength={1}
										stroke="currentColor"
										strokeWidth="6"
										strokeLinecap="round"
										className="identity-pulse identity-halo text-brand"
									/>
									<line
										{...line}
										pathLength={1}
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										className="identity-pulse text-foreground"
									/>
								</Fragment>
							),
					)}
					{dots.map((dot, index) => (
						<circle
							key={`${dot.x}-${dot.y}`}
							cx={dot.x}
							cy={dot.y}
							r="4"
							fill="currentColor"
							className={
								isActive(index) ? "identity-ping text-brand" : "text-brand"
							}
						/>
					))}
				</svg>
				{/* Centered on the card stack. No inline style: the page CSP
				    (style-src 'self') would drop it. */}
				<div
					className={`hero-portrait relative w-fit lg:absolute lg:left-0 ${photoTopClass}`}
				>
					<img
						src="/images/profile/portrait-240.webp"
						srcSet="/images/profile/portrait-240.webp 1x, /images/profile/portrait-480.webp 2x"
						width={240}
						height={240}
						alt={t(map.photoAlt, locale)}
						decoding="async"
						className="size-32 rounded-full lg:size-[240px]"
					/>
				</div>
				<ol
					aria-labelledby="identity-map"
					className="hero-cards relative mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-1 lg:gap-[18px]"
				>
					{map.dimensions.map((dimension, index) => {
						const outline = isActive(index)
							? cardOutline(geometry.offsets[index])
							: null;
						return (
							<li
								key={dimension.title.en}
								className={cardClass(index, reached)}
							>
								{outline && (
									<>
										<svg
											aria-hidden="true"
											focusable="false"
											width={outline.width}
											height={outline.height}
											viewBox={`0 0 ${outline.width} ${outline.height}`}
											fill="none"
											className="pointer-events-none absolute -top-px -left-px overflow-visible text-foreground print:hidden"
										>
											{[outline.top, outline.bottom].map((d) => (
												<path
													key={d}
													d={d}
													pathLength={1}
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													className="identity-trace"
												/>
											))}
										</svg>
										<span
											aria-hidden="true"
											className="identity-radiate pointer-events-none absolute -inset-px rounded-lg print:hidden"
										/>
									</>
								)}
								<p className="text-sm font-semibold lg:text-[15px] lg:leading-[22px]">
									{t(dimension.title, locale)}
								</p>
								<p className="mt-0.5 text-xs text-muted-foreground lg:text-[13px] lg:leading-[18px]">
									{dottedItems(t(dimension.line, locale))}
								</p>
							</li>
						);
					})}
				</ol>
			</div>
			<div className="hero-principles mt-6 space-y-1 text-xs text-muted-foreground lg:mt-8 lg:text-center">
				<p className="font-mono">
					{dottedItems(t(map.principles, locale), { wholeItems: true })}
				</p>
				<p className="lg:text-[13px]">{t(map.grounding, locale)}</p>
			</div>
		</section>
	);
}
