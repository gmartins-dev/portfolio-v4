import { Link, useRouterState } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import { otherLocale } from "../i18n";
import { isNotFound } from "../not-found";
import { useLocale } from "../use-locale";

const navLinkClass =
	"inline-flex min-h-6 items-center whitespace-nowrap underline-offset-[6px] decoration-2 decoration-brand text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline data-[section=current]:text-foreground data-[section=current]:underline";

export function SiteHeader() {
	const { locale, href } = useLocale();
	// A case study belongs to Cases: mark the section without claiming
	// aria-current="page", which stays on the exact match only.
	const inCases = useRouterState({
		select: (state) => state.location.pathname.startsWith(`${href("/cases")}/`),
	});

	return (
		<header className="border-b">
			<a
				href="#main"
				className="sr-only rounded-lg bg-brand px-3 py-2 text-brand-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
			>
				{t(copy.nav.skip, locale)}
			</a>
			{/* Phones: two rows, the name with the language toggle, then the nav.
			    From sm: one row, the name on the left, nav and toggle on the right. */}
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-3 sm:gap-y-3 sm:px-6 sm:py-4">
				{/* The logo is a file from brand/. Print swaps in the light version, so
				    the dark one is never fetched on paper and the light one never on screen. */}
				<Link to={href("/")} className="inline-flex" translate="no">
					<picture>
						<source media="print" srcSet="/brand/logo-primary.svg" />
						<img
							src="/brand/logo-primary-dark.svg"
							alt={profile.name}
							width={147}
							height={28}
							className="h-7 w-auto"
						/>
					</picture>
				</Link>
				<LanguageToggle className="inline-flex sm:hidden" />
				<div className="contents sm:flex sm:items-center sm:gap-x-6 print:hidden">
					<nav
						aria-label={t(copy.nav.label, locale)}
						className="w-full sm:w-auto"
					>
						<ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:gap-x-5">
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
									to={href("/cases")}
									activeOptions={{ exact: true }}
									data-section={inCases ? "current" : undefined}
									className={navLinkClass}
								>
									{t(copy.nav.work, locale)}
								</Link>
							</li>
							<li>
								<a href={profile.resume[locale]} className={navLinkClass}>
									{t(copy.nav.resume, locale)}
								</a>
							</li>
							<li>
								<Link
									to={href("/contact")}
									activeOptions={{ exact: true }}
									className={navLinkClass}
								>
									{t(copy.nav.contact, locale)}
								</Link>
							</li>
						</ul>
					</nav>
					<LanguageToggle className="hidden sm:inline-flex" />
				</div>
			</div>
		</header>
	);
}

/**
 * The language switch: an icon and the target language code ("PT" on the
 * English site). The header renders it twice, one copy per breakpoint, so the
 * DOM order matches the visual order at every width; display:none drops the
 * other copy from the accessibility tree, so there is only ever one toggle.
 */
function LanguageToggle({ className }: { className: string }) {
	const { locale, page, href } = useLocale();
	const other = otherLocale(locale);
	// On the 404 page there is no equivalent page to switch to; go home instead.
	const notFound = useRouterState({
		select: (state) => isNotFound(state.matches),
	});
	return (
		<Link
			to={href(notFound ? "/" : page, other)}
			hrefLang={other}
			lang={other}
			className={`${className} min-h-6 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground print:hidden`}
		>
			<Languages className="size-4" aria-hidden="true" />
			{/* The visible code starts the accessible name (WCAG 2.5.3). */}
			{t(copy.nav.languageCode, locale)}
			<span className="sr-only">
				{" "}
				{t(copy.nav.language, locale)}
				{t(copy.nav.languageHint, locale)}
			</span>
		</Link>
	);
}
