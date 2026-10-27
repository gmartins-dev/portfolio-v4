import { ContactForm } from "../components/contact-form";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import type { Locale } from "../i18n";

export function ContactPage({ locale }: { locale: Locale }) {
	const page = copy.contactPage;
	return (
		<article className="pt-12 md:pt-24">
			<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
				{t(page.heading, locale)}
			</h1>
			<div className="mt-8 max-w-prose space-y-1 text-lg text-muted-foreground">
				{page.intro[locale].map((line) => (
					<p key={line}>{line}</p>
				))}
			</div>
			<ContactForm locale={locale} />
			<p className="mt-8 text-sm text-muted-foreground">
				{t(page.fallback, locale)}{" "}
				<a
					href={`mailto:${profile.email}`}
					className="inline-flex min-h-6 items-center font-mono underline underline-offset-4"
				>
					{profile.email}
				</a>
			</p>
		</article>
	);
}
