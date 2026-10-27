import { buttonVariants } from "../components/ui/button";
import { copy } from "../content/copy";
import { locales, localizedPath } from "../i18n";

/**
 * One static, bilingual page: hosts serve the same 404.html for every unknown
 * URL in either language, and the prerender step ships it without client
 * JavaScript (scripts/prerender.mjs), so nothing depends on the request path.
 */
export function NotFoundPage() {
	return (
		<section className="grid gap-12 pt-16 md:grid-cols-2 md:pt-24">
			{locales.map((locale) => (
				<div key={locale} lang={locale}>
					{locale === "en" ? (
						<h1 className="text-4xl font-semibold tracking-tight">
							{copy.notFound.heading[locale]}
						</h1>
					) : (
						<h2 className="text-4xl font-semibold tracking-tight">
							{copy.notFound.heading[locale]}
						</h2>
					)}
					<p className="mt-6 max-w-measure text-lg text-muted-foreground">
						{copy.notFound.body[locale]}
					</p>
					<a
						href={localizedPath(locale, "/")}
						className={buttonVariants({
							variant: locale === "en" ? "brand" : "outline",
							className: "mt-8",
						})}
					>
						{copy.notFound.home[locale]}
					</a>
				</div>
			))}
		</section>
	);
}
