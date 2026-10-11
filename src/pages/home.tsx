import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../components/ui/button";
import { copy, t } from "../content/copy";
import { profile } from "../content/profile";
import type { Locale } from "../i18n";
import { localizedPath } from "../i18n";

export function HomePage({ locale }: { locale: Locale }) {
	return (
		<>
			<section className="pt-16 pb-20 md:pt-24">
				<p className="text-sm font-medium text-muted-foreground">
					{t(copy.home.eyebrow, locale)}
				</p>
				<h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05]">
					{t(copy.home.headline, locale)}
				</h1>
				<p className="mt-6 max-w-xl text-lg text-muted-foreground">
					{t(copy.home.intro, locale)}
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						to={localizedPath(locale, "/work")}
						className={buttonVariants({
							variant: "brand",
							size: "lg",
							className: "px-4",
						})}
					>
						{t(copy.home.primaryCta, locale)}
					</Link>
					<a
						href={profile.resume[locale]}
						className={buttonVariants({
							size: "lg",
							variant: "outline",
							className: "px-4",
						})}
					>
						{t(copy.nav.resume, locale)}
					</a>
				</div>
			</section>
		</>
	);
}
