import { copy, t } from "../content/copy";
import type { Locale } from "../i18n";

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
		</article>
	);
}
