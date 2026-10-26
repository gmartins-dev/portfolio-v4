import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { copy, t } from "../content/copy";
import { type Locale, localizedPath } from "../i18n";

const sectionHeading = "text-2xl font-semibold tracking-tight md:text-3xl";
const linkClass =
	"inline-flex min-h-6 items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline";

export function HowIWorkPage({ locale }: { locale: Locale }) {
	const page = copy.howIWork;
	return (
		<article className="pt-12 md:pt-24">
			<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
				{t(page.heading, locale)}
			</h1>
			<p className="mt-8 max-w-prose text-lg">{t(page.intro, locale)}</p>

			<section aria-labelledby="process" className="mt-16 md:mt-20">
				<h2 id="process" className={sectionHeading}>
					{t(page.stepsHeading, locale)}
				</h2>
				<ol className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
					{page.steps.map((step, index) => (
						<li key={step.title.en} className="border-t pt-6">
							<p className="font-mono text-sm text-muted-foreground">
								{String(index + 1).padStart(2, "0")}
							</p>
							<h3 className="mt-1 font-semibold">{t(step.title, locale)}</h3>
							<p className="mt-2 text-muted-foreground">
								{t(step.body, locale)}
							</p>
						</li>
					))}
				</ol>
			</section>

			<section aria-labelledby="evidence" className="mt-16 md:mt-20">
				<h2 id="evidence" className={sectionHeading}>
					{t(page.evidenceHeading, locale)}
				</h2>
				<ul className="mt-8 grid gap-8 md:grid-cols-3">
					{page.evidence.map((item) => (
						<li key={item.title.en} className="border-t pt-6">
							<h3 className="font-semibold">{t(item.title, locale)}</h3>
							<p className="mt-2 text-muted-foreground">
								{t(item.body, locale)}
							</p>
							<p className="mt-3">
								{"href" in item ? (
									<a href={item.href} className={linkClass}>
										{t(item.label, locale)}
										<ArrowUpRight aria-hidden="true" className="size-3.5" />
									</a>
								) : (
									<Link
										to={localizedPath(locale, item.to)}
										className={linkClass}
									>
										{t(item.label, locale)}
										<span className="sr-only"> ({t(item.title, locale)})</span>
										<ArrowRight aria-hidden="true" className="size-4" />
									</Link>
								)}
							</p>
						</li>
					))}
				</ul>
			</section>
		</article>
	);
}
