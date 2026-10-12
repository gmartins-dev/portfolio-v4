import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
	CaseStudyTeaser,
	ProfessionalWorkItem,
	ShortWorkItem,
} from "../components/work";
import { copy, t } from "../content/copy";
import { professionalWork } from "../content/professional-work";
import { caseStudies, otherWork } from "../content/work";
import { type Locale, localizedPath } from "../i18n";

export function WorkPage({ locale }: { locale: Locale }) {
	return (
		<>
			<header className="pt-12 md:pt-24">
				<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
					{t(copy.work.heading, locale)}
				</h1>
				<p className="mt-6 max-w-prose text-lg text-muted-foreground">
					{t(copy.work.intro, locale)}
				</p>
			</header>
			<div className="mt-12 grid gap-14 md:mt-16 md:gap-20">
				{caseStudies.map((study, index) => (
					<CaseStudyTeaser
						key={study.slug}
						study={study}
						locale={locale}
						headingLevel="h2"
						reverse={index % 2 === 1}
						priority={index === 0}
					/>
				))}
			</div>
			<section aria-labelledby="professional-work" className="mt-20 md:mt-24">
				<h2
					id="professional-work"
					className="text-2xl font-semibold tracking-tight"
				>
					{t(copy.work.professionalHeading, locale)}
				</h2>
				<p className="mt-4 max-w-prose text-muted-foreground">
					{t(copy.work.professionalIntro, locale)}
				</p>
				<div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
					{professionalWork.map((work) => (
						<ProfessionalWorkItem key={work.slug} work={work} locale={locale} />
					))}
				</div>
			</section>
			<section aria-labelledby="other-work" className="mt-20 md:mt-24">
				<h2 id="other-work" className="text-2xl font-semibold tracking-tight">
					{t(copy.work.otherHeading, locale)}
				</h2>
				<div className="mt-8 grid gap-10">
					{otherWork.map((item) => (
						<ShortWorkItem key={item.href} item={item} locale={locale} />
					))}
				</div>
			</section>
			<p className="mt-16">
				<Link
					to={localizedPath(locale, "/projects")}
					className="inline-flex min-h-6 items-center gap-1.5 font-medium text-brand underline-offset-4 hover:underline"
				>
					{t(copy.projects.link, locale)}
					<ArrowRight aria-hidden="true" className="size-4" />
				</Link>
			</p>
		</>
	);
}
