import { Link } from "@tanstack/react-router";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import { localizedPath } from "../i18n";
import { useLocale } from "../use-locale";
import { pageShell } from "./page-shell";
import { buttonVariants } from "./ui/button";

const footerLinkClass =
	"inline-flex min-h-6 items-center text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";

/** Site-wide contact section: the contact calls to action on every page. */
export function SiteFooter() {
	const { locale } = useLocale();

	return (
		<footer className="mt-20 border-t md:mt-24">
			<div
				className={`${pageShell} grid gap-10 py-12 md:grid-cols-[3fr_2fr] md:py-16`}
			>
				<section id="contact" aria-labelledby="contact-heading">
					<h2
						id="contact-heading"
						className="text-2xl font-semibold tracking-tight"
					>
						{t(copy.contact.heading, locale)}
					</h2>
					<p className="mt-3 max-w-measure text-muted-foreground">
						{t(copy.contact.body, locale)}
					</p>
					<Link
						to={localizedPath(locale, "/contact")}
						className={buttonVariants({
							variant: "brand",
							// The address below is what paper needs.
							className: "mt-6 print:hidden",
						})}
					>
						{t(copy.contact.email, locale)}
					</Link>
					<p className="mt-3 font-mono text-sm text-muted-foreground">
						{profile.email}
					</p>
				</section>
				<ul className="grid content-start gap-2 text-sm md:justify-self-end">
					<li>
						<Link
							to={localizedPath(locale, "/about")}
							className={footerLinkClass}
						>
							{t(copy.nav.about, locale)}
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
						<Link
							to={localizedPath(locale, "/cases")}
							className={footerLinkClass}
						>
							{t(copy.nav.work, locale)}
						</Link>
					</li>
					<li>
						<Link
							to={localizedPath(locale, "/projects")}
							className={footerLinkClass}
						>
							{t(copy.projects.heading, locale)}
						</Link>
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
				</ul>
			</div>
			<div className={`${pageShell} pb-10 text-sm text-muted-foreground`}>
				<p>
					{profile.name}, {t(profile.location, locale)}
				</p>
			</div>
		</footer>
	);
}
