import {
	createRootRoute,
	createRoute,
	createRouter,
	HeadContent,
	Link,
	Outlet,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { type PageCopy, pages } from "./content/pages";
import { type Locale, localeFromPath, locales, localizedPath } from "./i18n";
import stylesheet from "./index.css?url";
import { buildHead } from "./seo";
import { ThemeToggle, themeBootstrapScript } from "./theme";

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
			<body>
				<Outlet />
				<Scripts />
			</body>
		</html>
	);
}

type PageKey = keyof typeof pages;

/** Locale-neutral path for each page. */
const pagePaths: Record<PageKey, string> = {
	home: "/",
	about: "/about",
};

function Page({
	locale,
	page,
	copy,
}: {
	locale: Locale;
	page: PageKey;
	copy: PageCopy;
}) {
	const other = locales.find((l) => l !== locale) ?? locale;
	return (
		<main className="mx-auto max-w-2xl px-4 py-16">
			<nav aria-label={locale === "en" ? "Main" : "Principal"}>
				<ul className="flex gap-4 text-sm">
					{(Object.keys(pagePaths) as PageKey[]).map((key) => (
						<li key={key}>
							<Link
								to={localizedPath(locale, pagePaths[key])}
								activeOptions={{ exact: true }}
							>
								{pages[key][locale].heading}
							</Link>
						</li>
					))}
					<li>
						<Link to={localizedPath(other, pagePaths[page])} hrefLang={other}>
							{other === "en" ? "English" : "Português"}
						</Link>
					</li>
				</ul>
				<ThemeToggle
					label="Theme"
					optionLabels={{ light: "Light", dark: "Dark", system: "System" }}
				/>
			</nav>
			<h1 className="mt-8 text-3xl font-semibold">{copy.heading}</h1>
			<p className="mt-4">{copy.body}</p>
		</main>
	);
}

/** One route per page per locale; PT-BR routes nest under /pt-br. */
function pageRoutes(locale: Locale, parent: typeof rootRoute) {
	return (Object.keys(pagePaths) as PageKey[]).map((page) => {
		const copy = pages[page][locale];
		return createRoute({
			getParentRoute: () => parent,
			path: localizedPath(locale, pagePaths[page]),
			head: () =>
				buildHead({
					locale,
					path: pagePaths[page],
					title: copy.title,
					description: copy.description,
				}),
			component: () => <Page locale={locale} page={page} copy={copy} />,
		});
	});
}

const routeTree = rootRoute.addChildren(
	locales.flatMap((locale) => pageRoutes(locale, rootRoute)),
);

/** Every URL the prerender step writes to disk. */
export const prerenderPaths = locales.flatMap((locale) =>
	Object.values(pagePaths).map((path) => localizedPath(locale, path)),
);

export function createAppRouter() {
	return createRouter({ routeTree });
}
