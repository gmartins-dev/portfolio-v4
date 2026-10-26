import { copy } from "./content/copy";
import { profile } from "./content/profile";
import { caseStudies } from "./content/work";
import { locales } from "./i18n";

const listingCards = [
	{ key: "work", heading: copy.work.heading },
	{ key: "projects", heading: copy.projects.heading },
	{ key: "about", heading: copy.about.heading },
	{ key: "how-i-work", heading: copy.howIWork.heading },
] as const;

/**
 * Social preview cards rendered to public/images/og/*.png by
 * scripts/build-og-images.mjs. File names must match what src/router.tsx and
 * src/seo.ts reference.
 */
export const ogCards = locales.flatMap((locale) => [
	{
		file: `home-${locale}.png`,
		lang: locale,
		kicker: `${profile.name}, ${copy.meta.role[locale]}`,
		title: copy.home.headline[locale],
	},
	...listingCards.map(({ key, heading }) => ({
		file: `page-${key}-${locale}.png`,
		lang: locale,
		kicker: `${profile.name}, ${copy.meta.role[locale]}`,
		title: heading[locale],
	})),
	...caseStudies.map((study) => ({
		file: `work-${study.slug}-${locale}.png`,
		lang: locale,
		kicker: `${study.kind[locale]} | ${profile.name}`,
		title: study.title,
	})),
]);
