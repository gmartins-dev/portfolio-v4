import {
	createRootRoute,
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
import { WorkPage } from "./pages/work";
import { buildHead } from "./seo";
import { themeBootstrapScript } from "./theme";

// The root route renders the whole HTML document, so the server render
// (dev middleware and build-time prerender) and client hydration share one tree.
const rootRoute = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [{ rel: "stylesheet", href: stylesheet }],
		scripts: [
			{ children: themeBootstrapScript },
			{
				type: "module",
				// Fixed name set in vite.config.ts; the dev server serves the source.
				src: import.meta.env.DEV ? "/src/entry-client.tsx" : "/entry-client.js",
			},
		],
	}),
	component: Document,
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
	render: (locale: Locale) => ReactNode;
};

const pages: Page[] = [
	{
		path: "/",
		...copy.meta.home,
		render: (locale) => <HomePage locale={locale} />,
	},
	{
		path: "/work",
		...copy.meta.work,
		render: (locale) => <WorkPage locale={locale} />,
	},
	...caseStudies.map(
		(study): Page => ({
			path: `/work/${study.slug}`,
			title: {
				en: `${study.title} | ${copy.meta.siteName.en}`,
				"pt-BR": `${study.title} | ${copy.meta.siteName["pt-BR"]}`,
			},
			description: study.summary,
			render: (locale) => <CaseStudyPage study={study} locale={locale} />,
		}),
	),
	{
		path: "/about",
		...copy.meta.about,
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
				}),
			component: () => page.render(locale),
		}),
	),
);

const routeTree = rootRoute.addChildren(pageRoutes);

/** Every URL the prerender step writes to disk. */
export const prerenderPaths = locales.flatMap((locale) =>
	pages.map((page) => localizedPath(locale, page.path)),
);

export function createAppRouter() {
	return createRouter({ routeTree });
}
