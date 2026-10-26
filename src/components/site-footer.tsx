import { Link } from "@tanstack/react-router";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import { localizedPath } from "../i18n";
import { useLocale } from "../use-locale";
import { buttonVariants } from "./ui/button";

const footerLinkClass =
	"inline-flex min-h-6 items-center text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";

/** Site-wide contact section: the one "contact" call to action on every page. */
export function SiteFooter() {
	const { locale } = useLocale();

	return (
		<footer className="mt-20 border-t md:mt-24">
			<div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[3fr_2fr] md:py-16">
				<section id="contact" aria-labelledby="contact-heading">
					<h2
						id="contact-heading"
						className="text-2xl font-semibold tracking-tight"
					>
						{t(copy.contact.heading, locale)}
					</h2>
					<p className="mt-3 max-w-prose text-muted-foreground">
						{t(copy.contact.body, locale)}
					</p>
					<a
						href={`mailto:${profile.email}`}
						className={buttonVariants({
							variant: "brand",
							// The address below is what paper needs.
							className: "mt-6 print:hidden",
						})}
					>
						{t(copy.contact.email, locale)}
					</a>
					<p className="mt-3 font-mono text-sm text-muted-foreground">
						{profile.email}
					</p>
				</section>
				<ul className="grid content-start gap-2 text-sm md:justify-self-end">
					<li>
						<Link
							to={localizedPath(locale, "/work")}
							className={footerLinkClass}
						>
							{t(copy.nav.work, locale)}
						</Link>
					</li>
					<li>
						<Link
							to={localizedPath(locale, "/how-i-work")}
							className={footerLinkClass}
						>
							{t(copy.howIWork.heading, locale)}
						</Link>
					</li>
					<li>
						<a href={profile.links.github} className={footerLinkClass}>
							GitHub
						</a>
					</li>
					<li>
						<a href={profile.links.linkedin} className={footerLinkClass}>
							LinkedIn
						</a>
					</li>
					<li>
						<a
							href={profile.resume.en}
							hrefLang="en"
							className={footerLinkClass}
						>
							{t(copy.footer.resumeEn, locale)}
						</a>
					</li>
					<li>
						<a
							href={profile.resume["pt-BR"]}
							hrefLang="pt-BR"
							className={footerLinkClass}
						>
							{t(copy.footer.resumePt, locale)}
						</a>
					</li>
				</ul>
			</div>
			<div className="mx-auto max-w-5xl px-4 pb-10 text-sm text-muted-foreground sm:px-6">
				<p>
					{profile.name}, {t(profile.location, locale)}
				</p>
			</div>
		</footer>
	);
}
