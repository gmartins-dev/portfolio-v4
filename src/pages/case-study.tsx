import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { formatPeriod, MetaLine, WorkImage } from "../components/work";
import { copy, t } from "../content/copy";
import type { CaseStudy } from "../content/schema";
import { caseStudies } from "../content/work";
import { type Locale, localizedPath } from "../i18n";

/**
 * Rendered width of the case study image: the page column (1104px from
 * 1152px up, src/components/page-shell.ts). A diagram ("contain") sits inside
 * p-4 and is capped by max-h-[36rem], so a tall one renders far narrower than
 * the column; telling the browser avoids fetching the 1280w file.
 */
function heroSizes(image: CaseStudy["image"]) {
	if (image.fit !== "contain")
		return "(min-width: 1152px) 1104px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)";
	const capped = Math.min(
		1072,
		Math.round((576 - 32) * (image.width / image.height)),
	);
	return `(min-width: 1152px) ${capped}px, (min-width: 640px) min(calc(100vw - 5rem), ${capped}px), min(calc(100vw - 4rem), ${capped}px)`;
}

export function CaseStudyPage({
	study,
	locale,
}: {
	study: CaseStudy;
	locale: Locale;
}) {
	const reviewed = new Intl.DateTimeFormat(locale, {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(new Date(`${study.reviewed}T00:00:00Z`));

	return (
		<article className="pt-8 md:pt-16">
			<Link
				to={localizedPath(locale, "/cases")}
				className="inline-flex min-h-6 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground print:hidden"
			>
				<ArrowLeft aria-hidden="true" className="size-4" />
				{t(copy.work.back, locale)}
			</Link>

			<header className="mt-10">
				<p className="font-mono text-sm text-muted-foreground">
					{t(study.kind, locale)}
				</p>
				<h1
					className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl"
					translate="no"
				>
					{study.title}
				</h1>
				<p className="mt-6 max-w-measure text-lg text-muted-foreground">
					{t(study.summary, locale)}
				</p>

				<dl className="mt-10 grid grid-cols-2 gap-6 border-t pt-6 text-sm sm:grid-cols-3">
					<div>
						<dt className="text-muted-foreground">
							{t(copy.work.role, locale)}
						</dt>
						<dd className="mt-1 font-medium">{t(study.role, locale)}</dd>
					</div>
					<div>
						<dt className="text-muted-foreground">
							{t(copy.work.period, locale)}
						</dt>
						<dd className="mt-1 font-mono">
							{formatPeriod(study.period, locale)}
						</dd>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<dt className="text-muted-foreground">
							{t(copy.work.stack, locale)}
						</dt>
						<dd className="mt-1 font-mono" translate="no">
							{study.stack.join(", ")}
						</dd>
					</div>
				</dl>
			</header>

			<figure className="mt-12">
				<WorkImage
					image={study.image}
					locale={locale}
					sizes={heroSizes(study.image)}
					priority
					className="max-h-[36rem]"
				/>
				{study.image.fit === "contain" && (
					// Diagrams shrink to fit the page; offer the full-size file.
					<figcaption className="mt-2 text-sm">
						<a
							href={`${study.image.src}-${Math.max(...study.image.widths)}.webp`}
							className="inline-flex min-h-6 items-center gap-1 font-medium underline-offset-4 hover:text-brand hover:underline"
						>
							{t(copy.work.fullImage, locale)}
							<ArrowUpRight aria-hidden="true" className="size-3.5" />
						</a>
					</figcaption>
				)}
			</figure>

			{/* grid-cols-1 is minmax(0, 1fr): with the default auto minimum the
			    code block would widen the page instead of scrolling (WCAG 1.4.10). */}
			<div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16">
				{/* First in the DOM so phones get the facts and links before the
				    prose; from md up it sits in the right column. */}
				<aside className="border-b pb-10 md:sticky md:top-8 md:order-last md:self-start md:border-0 md:pb-0">
					<h2 className="text-sm font-medium text-muted-foreground">
						{t(copy.work.highlights, locale)}
					</h2>
					<ul className="mt-2 grid list-disc gap-2 pl-5 text-sm marker:text-brand">
						{study.facts[locale].map((fact) => (
							<li key={fact}>{fact}</li>
						))}
					</ul>
					{study.links.length > 0 && (
						<>
							<h2 className="mt-8 text-sm font-medium text-muted-foreground">
								{t(copy.work.links, locale)}
							</h2>
							<ul className="mt-2 grid gap-2 text-sm">
								{study.links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="inline-flex min-h-6 items-center gap-1 font-medium underline-offset-4 hover:text-brand hover:underline"
										>
											{t(link.label, locale)}
											<ArrowUpRight aria-hidden="true" className="size-3.5" />
										</a>
									</li>
								))}
							</ul>
						</>
					)}
				</aside>

				<div className="grid grid-cols-1 gap-12">
					{study.sections.map((section) => (
						<section key={section.heading.en}>
							<h2 className="text-2xl font-semibold tracking-tight">
								{t(section.heading, locale)}
							</h2>
							<div className="mt-4 max-w-measure space-y-4 leading-relaxed">
								{section.body[locale].map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							{section.code && (
								<figure className="mt-6">
									<pre
										// biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be focusable (WCAG 2.1.1).
										tabIndex={0}
										translate="no"
										className="overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm leading-relaxed print:overflow-visible print:whitespace-pre-wrap"
									>
										<code>{section.code.source}</code>
									</pre>
									<figcaption className="mt-2 text-sm text-muted-foreground">
										{t(section.code.caption, locale)}
									</figcaption>
								</figure>
							)}
						</section>
					))}
				</div>
			</div>

			<p className="mt-16 text-sm text-muted-foreground">
				{t(copy.work.reviewed, locale)} {reviewed}.
			</p>

			{/* A reader who finished one case study can pick the next without
			    going back to the list. All the others, in the site's order. */}
			<nav
				aria-labelledby="other-studies"
				className="mt-16 border-t pt-10 print:hidden"
			>
				<h2
					id="other-studies"
					className="text-2xl font-semibold tracking-tight"
				>
					{t(copy.work.otherStudies, locale)}
				</h2>
				<ul className="mt-8 grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
					{caseStudies
						.filter((other) => other.slug !== study.slug)
						.map((other) => (
							<li key={other.slug}>
								<MetaLine
									parts={[
										t(other.kind, locale),
										formatPeriod(other.period, locale),
									]}
								/>
								<Link
									to={localizedPath(locale, `/cases/${other.slug}`)}
									className="mt-2 inline-flex min-h-6 items-center text-lg font-semibold tracking-tight hover:text-brand"
									translate="no"
								>
									{other.title}
								</Link>
								<p className="mt-2 text-sm text-muted-foreground">
									{t(other.summary, locale)}
								</p>
							</li>
						))}
				</ul>
			</nav>
		</article>
	);
}
