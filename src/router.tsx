import geistLatin from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import {
	createRootRouteWithContext,
	createRoute,
	createRouter,
	HeadContent,
	Outlet,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { copy, t } from "./content/copy";
import type { Localized } from "./content/schema";
import { caseStudies } from "./content/work";
import { type Locale, localeFromPath, locales, localizedPath } from "./i18n";
import stylesheet from "./index.css?url";
import { AboutPage } from "./pages/about";
import { CaseStudyPage } from "./pages/case-study";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { WorkPage } from "./pages/work";
import {
	aboutStructuredData,
	buildHead,
	caseStudyOgImage,
	caseStudyStructuredData,
	homeStructuredData,
	workStructuredData,
} from "./seo";
import { themeBootstrapScript } from "./theme";

// The root route renders the whole HTML document, so the server render
// (dev middleware and build-time prerender) and client hydration share one tree.
/** Per-build values the server and the client both pass in. */
export type RouterContext = {
	/** URL of the client entry module: hashed in production, source in dev. */
	entryScript: string;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
	head: ({ match }) => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			// No page route matched: the 404 page sets its own title and stays out of search.
			...(match.globalNotFound
				? [
						{
							title: t(
								copy.meta.notFound.title,
								localeFromPath(match.pathname),
							),
						},
						{ name: "robots", content: "noindex" },
					]
				: []),
		],
		links: [
			{ rel: "stylesheet", href: stylesheet },
			// The body font is otherwise discovered only after the stylesheet
			// downloads (Lighthouse network dependency tree). Latin subset only;
			// Geist Mono is small metadata text and is left to load normally.
			{
				rel: "preload",
				href: geistLatin,
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		],
		scripts: [
			{ children: themeBootstrapScript },
			// The page is fully prerendered; hydration can wait behind the LCP image.
			{
				type: "module",
				src: match.context.entryScript,
				fetchPriority: "low",
			},
		],
	}),
	component: Document,
	notFoundComponent: NotFoundPage,
});

function Document() {
	const { pathname } = useLocation();
	return (
		<html lang={localeFromPath(pathname)}>
			<head>
				<HeadContent />
			</head>
			<body className="flex min-h-dvh flex-col">
				<SiteHeader />
				<main
					id="main"
					className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6"
				>
					<Outlet />
				</main>
				<SiteFooter />
				<Scripts />
			</body>
		</html>
	);
}

/** One page of the site: a locale-neutral path, its metadata and its component. */
type Page = {
	path: string;
	title: Localized;
	description: Localized;
	/** Social card under public/images/og/, per locale; defaults to the home card. */
	ogImage?: (locale: Locale) => { src: string; alt: string };
	structuredData?: (locale: Locale) => object[];
	/** Date the content was last checked: og:type=article and sitemap lastmod. */
	modified?: string;
	render: (locale: Locale) => ReactNode;
};

const pages: Page[] = [
	{
		path: "/",
		...copy.meta.home,
		structuredData: homeStructuredData,
		render: (locale) => <HomePage locale={locale} />,
	},
	{
		path: "/work",
		...copy.meta.work,
		structuredData: (locale) => workStructuredData(locale, caseStudies),
		render: (locale) => <WorkPage locale={locale} />,
	},
	...caseStudies.map(
		(study): Page => ({
			path: `/work/${study.slug}`,
			title: {
				en: `${study.title} case study | ${copy.meta.siteName.en}`,
				"pt-BR": `Estudo de caso: ${study.title} | ${copy.meta.siteName["pt-BR"]}`,
			},
			description: study.summary,
			ogImage: (locale) => caseStudyOgImage(locale, study),
			structuredData: (locale) => caseStudyStructuredData(locale, study),
			modified: study.reviewed,
			render: (locale) => <CaseStudyPage study={study} locale={locale} />,
		}),
	),
	{
		path: "/about",
		...copy.meta.about,
		structuredData: aboutStructuredData,
		render: (locale) => <AboutPage locale={locale} />,
	},
];

/** One route per page per locale; PT-BR routes live under /pt-br. */
const pageRoutes = locales.flatMap((locale) =>
	pages.map((page) =>
		createRoute({
			getParentRoute: () => rootRoute,
			path: localizedPath(locale, page.path),
			head: () =>
				buildHead({
					locale,
					path: page.path,
					title: t(page.title, locale),
					description: t(page.description, locale),
					image: page.ogImage?.(locale),
					structuredData: page.structuredData?.(locale),
					article: page.modified ? { modified: page.modified } : undefined,
				}),
			component: () => page.render(locale),
		}),
	),
);

const routeTree = rootRoute.addChildren(pageRoutes);

/** Locale-neutral path and last-checked date of every page, for the sitemap. */
export const sitemapPages = pages.map((page) => ({
	path: page.path,
	lastmod: page.modified,
}));

/** Every URL the prerender step writes to disk. */
export const prerenderPaths = locales.flatMap((locale) =>
	pages.map((page) => localizedPath(locale, page.path)),
);

export function createAppRouter(context: RouterContext) {
	return createRouter({ routeTree, context });
}
