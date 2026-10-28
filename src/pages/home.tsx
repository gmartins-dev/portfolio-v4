import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IdentityMap } from "../components/identity-map";
import { buttonVariants } from "../components/ui/button";
import {
	CaseStudyTeaser,
	formatPeriod,
	MetaLine,
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
			{/* From lg the hero fills the window under the header, up to 56rem
			    (so tall tablets get no blank bands), and centers in it: the same
			    space above (to the header) and below (to the fold), at least
			    1.5rem each when the window is short. It is also the query
			    container its fluid type measures (src/index.css). */}
			<section className="hero-stage @container grid pt-8 pb-16 md:pt-12 md:pb-20 lg:min-h-[min(calc(100svh-var(--header-height)),56rem)] lg:grid-cols-[minmax(0,1fr)_552px] lg:content-center lg:items-center lg:gap-4 lg:py-6">
				<div>
					<h1 className="hero-headline max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05] lg:text-hero-title">
						{/* The last two words stay together ("to production"), whatever
						    the width the balanced lines get. */}
						{t(copy.home.headline, locale).replace(/ (?=\S+$)/, "\u00a0")}
					</h1>
					<div className="hero-intro mt-6 max-w-measure space-y-4 text-lg text-muted-foreground lg:text-hero-intro">
						{copy.home.intro[locale].map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
					<div className="hero-actions mt-8 flex flex-wrap gap-3">
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
								// Right edge below sm, even when it wraps to its own line.
								className: "ml-auto sm:ml-0",
							})}
						>
							{t(copy.home.workCta, locale)}
						</Link>
					</div>
				</div>
				<IdentityMap locale={locale} />
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
							<MetaLine
								className="mt-1"
								parts={[formatPeriod(entry, locale)]}
							/>
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
