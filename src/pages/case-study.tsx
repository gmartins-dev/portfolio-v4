import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { formatPeriod, WorkImage } from "../components/work";
import { copy, t } from "../content/copy";
import type { CaseStudy } from "../content/schema";
import { type Locale, localizedPath } from "../i18n";

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
		<article className="pt-12 md:pt-16">
			<Link
				to={localizedPath(locale, "/work")}
				className="inline-flex min-h-6 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
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
				<p className="mt-6 max-w-prose text-lg text-muted-foreground">
					{t(study.summary, locale)}
				</p>

				<dl className="mt-10 grid gap-6 border-t pt-6 text-sm sm:grid-cols-3">
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
						<dd className="mt-1 font-medium">
							{formatPeriod(study.period, locale)}
						</dd>
					</div>
					<div>
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
					sizes="(min-width: 1024px) 976px, calc(100vw - 2rem)"
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
			<div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16">
				<div className="grid grid-cols-1 gap-12">
					{study.sections.map((section) => (
						<section key={section.heading.en}>
							<h2 className="text-2xl font-semibold tracking-tight">
								{t(section.heading, locale)}
							</h2>
							<div className="mt-4 max-w-prose space-y-4 leading-relaxed">
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
										className="overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm leading-relaxed"
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

				<aside className="md:sticky md:top-8 md:self-start">
					<ul className="grid list-disc gap-2 pl-5 text-sm marker:text-brand">
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
			</div>

			<p className="mt-16 text-sm text-muted-foreground">
				{t(copy.work.reviewed, locale)} {reviewed}.
			</p>
		</article>
	);
}
