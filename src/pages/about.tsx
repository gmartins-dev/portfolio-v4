import { ArrowUpRight } from "lucide-react";
import { formatPeriod } from "../components/work";
import { copy, t } from "../content/copy";
import { experience, profile } from "../content/profile";
import type { Locale } from "../i18n";

const sectionHeading = "text-2xl font-semibold tracking-tight md:text-3xl";

export function AboutPage({ locale }: { locale: Locale }) {
	return (
		<article className="pt-16 md:pt-24">
			<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
				{t(copy.about.heading, locale)}
			</h1>
			<div className="mt-8 max-w-prose space-y-4 text-lg">
				{copy.about.intro[locale].map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<section aria-labelledby="experience" className="mt-24">
				<h2 id="experience" className={sectionHeading}>
					{t(copy.about.experienceHeading, locale)}
				</h2>
				<ol className="mt-10 grid gap-12">
					{experience.map((entry) => (
						<li
							key={`${entry.company}-${entry.start}`}
							className="grid gap-4 border-t pt-6 md:grid-cols-[14rem_1fr] md:gap-10"
						>
							<div className="text-sm text-muted-foreground">
								<p className="font-mono">{formatPeriod(entry, locale)}</p>
								<p className="mt-1">{t(entry.location, locale)}</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold">
									{entry.url ? (
										<a
											href={entry.url}
											className="inline-flex items-center gap-1 underline-offset-4 hover:text-brand hover:underline"
										>
											{entry.company}
											<ArrowUpRight aria-hidden="true" className="size-4" />
										</a>
									) : (
										entry.company
									)}
								</h3>
								<p className="text-muted-foreground">{entry.role}</p>
								<p className="mt-3 max-w-prose">{t(entry.context, locale)}</p>
								<ul className="mt-3 max-w-prose list-disc space-y-1.5 pl-5 marker:text-brand">
									{entry.highlights[locale].map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ol>
			</section>

			<section aria-labelledby="tools" className="mt-24">
				<h2 id="tools" className={sectionHeading}>
					{t(copy.about.toolsHeading, locale)}
				</h2>
				<dl className="mt-8 grid gap-8 sm:grid-cols-2">
					{copy.tools.map((group) => (
						<div key={group.group.en}>
							<dt className="text-sm text-muted-foreground">
								{t(group.group, locale)}
							</dt>
							<dd className="mt-2 font-mono text-sm leading-relaxed">
								{group.items.join(", ")}
							</dd>
						</div>
					))}
				</dl>
			</section>

			<section
				aria-labelledby="resume"
				className="mt-24 rounded-lg bg-muted px-6 py-8 md:px-10"
			>
				<h2 id="resume" className="text-xl font-semibold tracking-tight">
					{t(copy.about.resumeHeading, locale)}
				</h2>
				<p className="mt-2 text-muted-foreground">
					{t(copy.about.resumeBody, locale)}
				</p>
				<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
					<li>
						<a
							href={profile.resume.en}
							hrefLang="en"
							className="inline-flex min-h-6 items-center text-brand underline-offset-4 hover:underline"
						>
							{t(copy.footer.resumeEn, locale)}
						</a>
					</li>
					<li>
						<a
							href={profile.resume["pt-BR"]}
							hrefLang="pt-BR"
							className="inline-flex min-h-6 items-center text-brand underline-offset-4 hover:underline"
						>
							{t(copy.footer.resumePt, locale)}
						</a>
					</li>
				</ul>
			</section>
		</article>
	);
}
