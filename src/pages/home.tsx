import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "../components/ui/button";
import {
	CaseStudyTeaser,
	formatPeriod,
	ShortWorkItem,
} from "../components/work";
import { copy, t } from "../content/copy";
import { experience, profile } from "../content/profile";
import { caseStudies, otherWork } from "../content/work";
import { type Locale, localizedPath } from "../i18n";

// The home shows the first case studies; /cases lists them all.
const featuredCaseStudies = 3;

const sectionHeading = "text-2xl font-semibold tracking-tight md:text-3xl";

export function HomePage({ locale }: { locale: Locale }) {
	return (
		<>
			<section className="pt-12 pb-16 md:pt-24 md:pb-20">
				<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05]">
					{t(copy.home.headline, locale)}
				</h1>
				<div className="mt-6 max-w-xl space-y-4 text-lg text-muted-foreground">
					{copy.home.intro[locale].map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
				<div className="mt-8 flex flex-wrap gap-3">
					<a
						href={`mailto:${profile.email}`}
						className={buttonVariants({
							variant: "brand",
						})}
					>
						{t(copy.contact.email, locale)}
					</a>
					<Link
						to={localizedPath(locale, "/cases")}
						className={buttonVariants({
							variant: "outline",
						})}
					>
						{t(copy.home.workCta, locale)}
					</Link>
				</div>
			</section>

			<section
				aria-labelledby="selected-work"
				className="border-t pt-12 md:pt-16"
			>
				<h2 id="selected-work" className={sectionHeading}>
					{t(copy.home.workHeading, locale)}
				</h2>
				<div className="mt-10 grid gap-14 md:mt-12 md:gap-20">
					{caseStudies.slice(0, featuredCaseStudies).map((study, index) => (
						<CaseStudyTeaser
							key={study.slug}
							study={study}
							locale={locale}
							reverse={index % 2 === 1}
							priority={index === 0}
						/>
					))}
				</div>
			</section>

			<section aria-labelledby="capabilities" className="mt-20 md:mt-28">
				<h2 id="capabilities" className={sectionHeading}>
					{t(copy.home.capabilitiesHeading, locale)}
				</h2>
				<Link
					to={localizedPath(locale, "/how-i-work")}
					className="mt-4 inline-flex min-h-6 items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
				>
					{t(copy.home.howIWorkLink, locale)}
					<ArrowRight aria-hidden="true" className="size-3.5" />
				</Link>
				<ul className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
					{copy.capabilities.map((item) => (
						<li key={item.title.en} className="border-t pt-6">
							<h3 className="font-semibold">{t(item.title, locale)}</h3>
							<p className="mt-2 text-muted-foreground">
								{t(item.body, locale)}
							</p>
							<Link
								to={localizedPath(locale, item.evidence.to)}
								hash={"hash" in item.evidence ? item.evidence.hash : undefined}
								className="mt-3 inline-flex min-h-6 items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
							>
								{t(item.evidence.label, locale)}
								<ArrowRight aria-hidden="true" className="size-3.5" />
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section
				aria-labelledby="experience"
				className="mt-20 grid gap-8 rounded-lg bg-muted px-5 py-8 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-10 md:px-10 md:py-10"
			>
				<div>
					<h2 id="experience" className={sectionHeading}>
						{t(copy.home.experienceHeading, locale)}
					</h2>
					<Link
						to={localizedPath(locale, "/about")}
						className="mt-4 inline-flex min-h-6 items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
					>
						{t(copy.home.fullHistory, locale)}
						<ArrowRight aria-hidden="true" className="size-3.5" />
					</Link>
				</div>
				<ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
					{experience.map((entry) => (
						<li key={`${entry.company}-${entry.start}`}>
							<p className="font-medium">{entry.company}</p>
							<p className="text-sm text-muted-foreground">{entry.role}</p>
							<p className="mt-1 font-mono text-xs text-muted-foreground">
								{formatPeriod(entry, locale)}
							</p>
						</li>
					))}
				</ol>
			</section>

			<section aria-labelledby="community" className="mt-20 md:mt-28">
				<h2 id="community" className={sectionHeading}>
					{t(copy.home.openSourceHeading, locale)}
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
