import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import type { Locale } from "../i18n";

/**
 * Desktop geometry of the map, in px inside its 30rem (480px) column. Cards
 * stack from the top; their left edges follow a circle of `arcRadius` that
 * bulges toward the middle, and the decorative SVG is drawn from the same
 * numbers, so dots stay on the card centers. Tailwind needs literal class
 * names, so `offsetClasses` repeats `offsets` (identity-map.test.tsx checks
 * they match).
 */
export const geometry = {
	width: 480,
	cardHeight: 72,
	cardGap: 10,
	offsets: [198, 222, 234, 234, 222, 198],
	/** Dots sit this far left of their card. */
	dotInset: 12,
	photo: { x: 84, radius: 80 },
	/** Connectors start on this circle around the photo center. */
	connectorRadius: 90,
	arcRadius: 580,
};

export const offsetClasses = [
	"lg:ml-[198px]",
	"lg:ml-[222px]",
	"lg:ml-[234px]",
	"lg:ml-[234px]",
	"lg:ml-[222px]",
	"lg:ml-[198px]",
];

const height =
	geometry.offsets.length * geometry.cardHeight +
	(geometry.offsets.length - 1) * geometry.cardGap;
const photoY = height / 2;

const dots = geometry.offsets.map((offset, index) => ({
	x: offset - geometry.dotInset,
	y: index * (geometry.cardHeight + geometry.cardGap) + geometry.cardHeight / 2,
}));

const connectors = dots.map((dot) => {
	const angle = Math.atan2(dot.y - photoY, dot.x - geometry.photo.x);
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

/** Border hierarchy (DESIGN.md, "Hero identity map"): core, distinctive, breadth. */
const cardTone = [
	"border-brand",
	"border-brand",
	"",
	"",
	"bg-background",
	"bg-background",
];

/** Bind each middle dot to the word before it, so no line starts with one. */
const dotsAtLineEnd = (text: string) => text.replaceAll(" · ", "\u00a0· ");

export function IdentityMap({ locale }: { locale: Locale }) {
	const map = copy.home.identityMap;
	return (
		<section
			aria-labelledby="identity-map"
			className="mt-12 lg:mt-0 lg:w-[30rem]"
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
					className="pointer-events-none absolute inset-0 hidden text-border lg:block print:hidden"
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
							className={index < 2 ? "text-brand/40" : undefined}
						/>
					))}
					{dots.map((dot) => (
						<circle
							key={`${dot.x}-${dot.y}`}
							cx={dot.x}
							cy={dot.y}
							r="4"
							fill="currentColor"
							className="text-brand"
						/>
					))}
				</svg>
				<div className="flex items-center gap-4 lg:absolute lg:top-[161px] lg:left-0 lg:w-[168px] lg:flex-col lg:gap-3 lg:text-center">
					<img
						src="/images/profile/portrait-160.webp"
						srcSet="/images/profile/portrait-160.webp 1x, /images/profile/portrait-320.webp 2x"
						width={160}
						height={160}
						alt={t(map.photoAlt, locale)}
						decoding="async"
						className="size-24 shrink-0 rounded-full lg:size-40"
					/>
					<div>
						<p translate="no" className="text-[15px] font-semibold">
							{profile.name}
						</p>
						<p className="mt-1 font-mono text-xs text-brand">
							{t(copy.meta.role, locale)}
						</p>
						<p className="mt-0.5 font-mono text-xs text-muted-foreground">
							{t(profile.location, locale)}
						</p>
					</div>
				</div>
				<ol
					aria-labelledby="identity-map"
					className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-1 lg:gap-[10px]"
				>
					{map.dimensions.map((dimension, index) => (
						<li
							key={dimension.title.en}
							className={`rounded-lg border bg-card px-3.5 py-2.5 lg:h-[72px] ${offsetClasses[index]} ${cardTone[index]}`}
						>
							<p className="text-sm font-semibold">
								{t(dimension.title, locale)}
							</p>
							<p className="mt-0.5 text-xs text-muted-foreground">
								{dotsAtLineEnd(t(dimension.line, locale))}
							</p>
						</li>
					))}
				</ol>
			</div>
			<div className="mt-6 space-y-1 text-xs text-muted-foreground lg:mt-8 lg:text-center">
				<p className="font-mono">{dotsAtLineEnd(t(map.principles, locale))}</p>
				<p>{t(map.grounding, locale)}</p>
			</div>
		</section>
	);
}
