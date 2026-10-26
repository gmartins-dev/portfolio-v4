import { Link, useRouterState } from "@tanstack/react-router";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import { otherLocale } from "../i18n";
import { isNotFound } from "../not-found";
import { useLocale } from "../use-locale";

const navLinkClass =
	"inline-flex min-h-6 items-center underline-offset-[6px] decoration-2 decoration-brand text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline";

export function SiteHeader() {
	const { locale, page, href } = useLocale();
	const other = otherLocale(locale);
	// On the 404 page there is no equivalent page to switch to; go home instead.
	const notFound = useRouterState({
		select: (state) => isNotFound(state.matches),
	});

	return (
		<header className="border-b">
			<a
				href="#main"
				className="sr-only rounded-lg bg-brand px-3 py-2 text-brand-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
			>
				{t(copy.nav.skip, locale)}
			</a>
			{/* Phones: the name, then nav and controls on one row. DOM order
			    matches visual order at every width. */}
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-3 sm:gap-y-3 sm:px-6 sm:py-4">
				<Link
					to={href("/")}
					className="font-semibold tracking-tight"
					translate="no"
				>
					{profile.name}
				</Link>
				<div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-3 sm:w-auto sm:gap-x-6 print:hidden">
					<nav aria-label={t(copy.nav.label, locale)}>
						<ul className="flex items-center gap-3 text-sm sm:gap-5">
							<li>
								<Link
									to={href("/work")}
									activeOptions={{ exact: true }}
									className={navLinkClass}
								>
									{t(copy.nav.work, locale)}
								</Link>
							</li>
							<li>
								<Link
									to={href("/how-i-work")}
									activeOptions={{ exact: true }}
									className={navLinkClass}
								>
									{t(copy.howIWork.heading, locale)}
								</Link>
							</li>
							<li>
								<Link
									to={href("/about")}
									activeOptions={{ exact: true }}
									className={navLinkClass}
								>
									{t(copy.nav.about, locale)}
								</Link>
							</li>
							<li>
								<a href={profile.resume[locale]} className={navLinkClass}>
									{t(copy.nav.resume, locale)}
								</a>
							</li>
							<li>
								{/* The contact section is in the footer of every page. */}
								<a href="#contact" className={navLinkClass}>
									{t(copy.nav.contact, locale)}
								</a>
							</li>
						</ul>
					</nav>
					<div className="flex items-center gap-3">
						<Link
							to={href(notFound ? "/" : page, other)}
							hrefLang={other}
							lang={other}
							className="inline-flex min-h-6 min-w-6 items-center justify-center text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							<span className="sm:hidden">
								{t(copy.nav.languageShort, locale)}
							</span>
							<span className="hidden sm:inline">
								{t(copy.nav.language, locale)}
							</span>
							<span className="sr-only">
								{t(copy.nav.languageHint, locale)}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
