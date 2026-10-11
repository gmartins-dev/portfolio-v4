import { CaseStudyTeaser, ShortWorkItem } from "../components/work";
import { copy, t } from "../content/copy";
import { caseStudies, otherWork } from "../content/work";
import type { Locale } from "../i18n";

export function WorkPage({ locale }: { locale: Locale }) {
	return (
		<>
			<header className="pt-16 md:pt-24">
				<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
					{t(copy.work.heading, locale)}
				</h1>
				<p className="mt-6 max-w-prose text-lg text-muted-foreground">
					{t(copy.work.intro, locale)}
				</p>
			</header>
			<div className="mt-16 grid gap-20">
				{caseStudies.map((study, index) => (
					<CaseStudyTeaser
						key={study.slug}
						study={study}
						locale={locale}
						headingLevel="h2"
						reverse={index % 2 === 1}
					/>
				))}
			</div>
			<section aria-labelledby="other-work" className="mt-24">
				<h2 id="other-work" className="text-2xl font-semibold tracking-tight">
					{t(copy.work.otherHeading, locale)}
				</h2>
				<div className="mt-8 grid gap-10">
					{otherWork.map((item) => (
						<ShortWorkItem key={item.href} item={item} locale={locale} />
					))}
				</div>
			</section>
		</>
	);
}
