import { copy } from "./content/copy";
import { profile } from "./content/profile";
import { caseStudies } from "./content/work";
import { locales } from "./i18n";

/**
 * Social preview cards rendered to public/og/*.png by
 * scripts/build-og-images.mjs. File names must match what src/router.tsx and
 * src/seo.ts reference.
 */
export const ogCards = locales.flatMap((locale) => [
	{
		file: `home-${locale}.png`,
		lang: locale,
		kicker: `${profile.name}, ${profile.role}`,
		title: copy.home.headline[locale],
	},
	...caseStudies.map((study) => ({
		file: `work-${study.slug}-${locale}.png`,
		lang: locale,
		kicker: `${study.kind[locale]} | ${profile.name}`,
		title: study.title,
	})),
]);
