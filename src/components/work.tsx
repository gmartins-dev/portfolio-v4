import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { copy, t } from "../content/copy";
import type { CaseStudy, ShortWork } from "../content/schema";
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
	return (
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
			className={cn(
				"h-auto w-full rounded-lg border bg-card object-cover object-top",
				className,
			)}
		/>
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
	const href = localizedPath(locale, `/work/${study.slug}`);
	return (
		<article className="group relative grid items-center gap-6 md:grid-cols-2 md:gap-12">
			<div className={cn(reverse && "md:order-last")}>
				<WorkImage
					image={{ ...study.image, alt: { en: "", "pt-BR": "" } }}
					locale={locale}
					sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
					priority={priority}
					className="aspect-[4/3]"
				/>
			</div>
			<div>
				<p className="font-mono text-sm text-muted-foreground">
					{t(study.kind, locale)}, {formatPeriod(study.period, locale)}
				</p>
				<Heading className="mt-2 text-2xl font-semibold tracking-tight">
					<Link
						to={href}
						className="after:absolute after:inset-0 hover:text-brand"
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
				<h3 className="text-xl font-semibold tracking-tight">
					<a href={item.href} className="hover:text-brand">
						{item.title}
					</a>
				</h3>
				<p className="mt-3 text-muted-foreground">{t(item.summary, locale)}</p>
			</div>
			{item.image && (
				<WorkImage
					image={item.image}
					locale={locale}
					sizes="(min-width: 1024px) 590px, (min-width: 768px) 58vw, calc(100vw - 2rem)"
					className="aspect-[16/9]"
				/>
			)}
		</article>
	);
}
