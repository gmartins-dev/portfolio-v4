import { Link, useRouterState } from "@tanstack/react-router";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import { otherLocale } from "../i18n";
import { ThemeToggle } from "../theme";
import { useLocale } from "../use-locale";

const navLinkClass =
	"underline-offset-[6px] decoration-2 decoration-brand text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline";

export function SiteHeader() {
	const { locale, page, href } = useLocale();
	const other = otherLocale(locale);
	// On the 404 page there is no equivalent page to switch to; go home instead.
	const notFound = useRouterState({
		select: (state) => state.matches.some((match) => match.globalNotFound),
	});

	return (
		<header className="border-b">
			<a
				href="#main"
				className="sr-only rounded-lg bg-brand px-3 py-2 text-brand-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
			>
				{t(copy.nav.skip, locale)}
			</a>
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
				<Link to={href("/")} className="font-semibold tracking-tight">
					{profile.name}
				</Link>
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
					<nav aria-label={t(copy.nav.label, locale)}>
						<ul className="flex items-center gap-5 text-sm">
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
						</ul>
					</nav>
					<div className="flex items-center gap-3">
						<Link
							to={href(notFound ? "/" : page, other)}
							hrefLang={other}
							lang={other}
							aria-label={t(copy.nav.languageLabel, locale)}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{t(copy.nav.language, locale)}
						</Link>
						<ThemeToggle
							label={t(copy.theme.label, locale)}
							optionLabels={{
								light: t(copy.theme.light, locale),
								dark: t(copy.theme.dark, locale),
								system: t(copy.theme.system, locale),
							}}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
