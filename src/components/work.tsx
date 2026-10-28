import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import { copy, t } from "../content/copy";
import { experience } from "../content/profile";
import type { CaseStudy, ProfessionalWork, ShortWork } from "../content/schema";
import { formatMonth, type Locale, localizedPath } from "../i18n";
import { cn } from "../lib/utils";

/** "Aug 2026 - present", or one month when start and end match. */
export function formatPeriod(
	period: { start: string; end?: string },
	locale: Locale,
) {
	const start = formatMonth(period.start, locale);
	if (period.end === period.start) return start;
	const end = period.end
		? formatMonth(period.end, locale)
		: t(copy.work.present, locale);
	return `${start} - ${end}`;
}

/**
 * A mono metadata line ("Open source · Aug 2026 - present"). Each part stays
 * on one line, so a date range never wraps and leaves "- present" looking
 * like a list item; screen readers hear a comma instead of the dot.
 */
export function MetaLine({
	parts,
	className,
	nowrap = true,
}: {
	parts: string[];
	className?: string;
	/** Keep each part on one line; turn off for long parts (phrases). */
	nowrap?: boolean;
}) {
	return (
		<p className={cn("font-mono text-sm text-muted-foreground", className)}>
			{parts.map((part, index) => (
				<Fragment key={part}>
					{index > 0 && (
						<>
							<span aria-hidden="true"> · </span>
							<span className="sr-only">, </span>
						</>
					)}
					<span className={cn(nowrap && "whitespace-nowrap")}>{part}</span>
				</Fragment>
			))}
		</p>
	);
}

export function WorkImage({
	image,
	locale,
	sizes,
	priority = false,
	className,
}: {
	image: CaseStudy["image"];
	locale: Locale;
	/** Rendered width per breakpoint, so the browser picks the right variant. */
	sizes: string;
	/** Likely the largest element in the first viewport: load it eagerly. */
	priority?: boolean;
	className?: string;
}) {
	const variant = (width: number) => `${image.src}-${width}.webp`;
	const img = (imageClassName: string) => (
		<img
			src={variant(Math.max(...image.widths))}
			srcSet={image.widths.map((w) => `${variant(w)} ${w}w`).join(", ")}
			sizes={sizes}
			width={image.width}
			height={image.height}
			alt={t(image.alt, locale)}
			loading={priority ? "eager" : "lazy"}
			fetchPriority={priority ? "high" : "auto"}
			decoding="async"
			className={imageClassName}
		/>
	);
	if (image.fit !== "contain") {
		return img(
			cn(
				"h-auto w-full rounded-lg border bg-card object-cover object-top",
				className,
			),
		);
	}
	// Diagrams are drawn black on white. Invert them and let "lighten" drop the
	// (now black) background into the card, so the diagram reads as part of the
	// page instead of a white slab. Print uses light tokens, so it keeps the
	// original drawing.
	return (
		<div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
			{/* h-full fills an aspect-ratio frame; max-h-[inherit] honors a max-h cap. */}
			{img(
				"h-full max-h-[inherit] w-full object-contain p-4 mix-blend-lighten hue-rotate-180 invert-[.94] print:mix-blend-normal print:hue-rotate-0 print:invert-0",
			)}
		</div>
	);
}

/**
 * A case study teaser. The title is the link; the image is decorative here
 * because the same image carries a full description on the case study page.
 */
export function CaseStudyTeaser({
	study,
	locale,
	headingLevel: Heading = "h3",
	reverse = false,
	priority = false,
}: {
	study: CaseStudy;
	locale: Locale;
	headingLevel?: "h2" | "h3";
	reverse?: boolean;
	/** First teaser on the page: often the mobile LCP element. */
	priority?: boolean;
}) {
	const href = localizedPath(locale, `/cases/${study.slug}`);
	return (
		<article className="group relative grid items-center gap-6 md:grid-cols-2 md:gap-12">
			<div className={cn(reverse && "md:order-last")}>
				<WorkImage
					image={{
						...study.image,
						...study.teaserImage,
						alt: { en: "", "pt-BR": "" },
					}}
					locale={locale}
					sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 3rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
					priority={priority}
					className="aspect-[16/10]"
				/>
			</div>
			<div>
				<MetaLine
					parts={[t(study.kind, locale), formatPeriod(study.period, locale)]}
				/>
				<Heading className="mt-2 text-2xl font-semibold tracking-tight">
					<Link
						to={href}
						className="after:absolute after:inset-0 hover:text-brand"
						translate="no"
					>
						{study.title}
					</Link>
				</Heading>
				<p className="mt-3 text-muted-foreground">{t(study.summary, locale)}</p>
				<p
					aria-hidden="true"
					className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
				>
					{t(copy.home.readCaseStudy, locale)}
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
				</p>
			</div>
		</article>
	);
}

export function ShortWorkItem({
	item,
	locale,
}: {
	item: ShortWork;
	locale: Locale;
}) {
	return (
		<article className="grid gap-6 border-t pt-8 md:grid-cols-[2fr_3fr] md:gap-12">
			<div>
				<p className="font-mono text-sm text-muted-foreground">
					{t(item.kind, locale)}
				</p>
				<h3 className="mt-2 text-xl font-semibold tracking-tight">
					<a
						href={item.href}
						className="inline-flex items-center gap-1.5 hover:text-brand"
						translate="no"
					>
						{item.title}
						<ArrowUpRight aria-hidden="true" className="size-4" />
					</a>
				</h3>
				<p className="mt-3 text-muted-foreground">{t(item.summary, locale)}</p>
			</div>
			{item.image && (
				<WorkImage
					image={item.image}
					locale={locale}
					sizes="(min-width: 1152px) 634px, (min-width: 768px) calc(60vw - 3.6rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
					className="aspect-[16/9]"
				/>
			)}
		</article>
	);
}

/**
 * A public product built as an employee or contractor. Role, period and
 * location come from the matching experience entry. The id is the anchor the
 * About page links to.
 */
export function ProfessionalWorkItem({
	work,
	locale,
}: {
	work: ProfessionalWork;
	locale: Locale;
}) {
	const job = experience.find((entry) => entry.company === work.company);
	if (!job) throw new Error(`no experience entry for ${work.company}`);
	return (
		<article id={work.slug} className="scroll-mt-8 border-t pt-8">
			{work.image && (
				<WorkImage
					image={work.image}
					locale={locale}
					sizes="(min-width: 1152px) 528px, (min-width: 768px) calc(50vw - 3rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
					className="mb-6 aspect-[16/10]"
				/>
			)}
			<MetaLine parts={[formatPeriod(job, locale), t(job.location, locale)]} />
			<h3 className="mt-2 text-xl font-semibold tracking-tight" translate="no">
				{work.company}
			</h3>
			<p className="text-muted-foreground">{job.role}</p>
			<p className="mt-3">{t(work.summary, locale)}</p>
			<h4 className="mt-4 text-sm font-semibold">
				{t(copy.work.contributions, locale)}
			</h4>
			<ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-brand">
				{work.contributions[locale].map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
			{work.stack && (
				<p
					className="mt-4 font-mono text-sm text-muted-foreground"
					translate="no"
				>
					{work.stack.join(", ")}
				</p>
			)}
			<p className="mt-4 text-sm">
				<a
					href={work.url}
					className="inline-flex min-h-6 items-center gap-1 font-medium underline-offset-4 hover:text-brand hover:underline"
				>
					{t(copy.work.visitProduct, locale)}
					<span className="sr-only"> ({work.product})</span>
					<ArrowUpRight aria-hidden="true" className="size-3.5" />
				</a>
			</p>
		</article>
	);
}
