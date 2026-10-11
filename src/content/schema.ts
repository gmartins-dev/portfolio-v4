import { z } from "zod";
import { locales } from "../i18n";

/** A string per locale. Every visible string on the site is one of these. */
export const localized = z.object({
	en: z.string().min(1),
	"pt-BR": z.string().min(1),
});
export type Localized = z.infer<typeof localized>;

const localizedList = z.object({
	en: z.array(z.string().min(1)).min(1),
	"pt-BR": z.array(z.string().min(1)).min(1),
});

// "YYYY-MM"; ranges render through the locale's date formatter.
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

const externalUrl = z.url({ protocol: /^https$/ });

export const profileSchema = z.object({
	name: z.string(),
	role: z.string(),
	location: localized,
	email: z.email(),
	links: z.object({ github: externalUrl, linkedin: externalUrl }),
	/** Site-relative paths, redirected to the current PDFs (see vercel.json). */
	resume: z.object({
		en: z.string().startsWith("/"),
		"pt-BR": z.string().startsWith("/"),
	}),
});

export const experienceSchema = z.object({
	company: z.string(),
	url: externalUrl.optional(),
	/** Title held at the time; kept identical in both languages on purpose. */
	role: z.string(),
	location: localized,
	start: yearMonth,
	end: yearMonth.optional(),
	context: localized,
	highlights: localizedList,
});

/**
 * Disclosure states from the plan: only "public" and "anonymized" work may be
 * published, and "anonymized" must not name the client.
 */
export const disclosure = z.enum(["public", "anonymized"]);

const section = z.object({
	heading: localized,
	body: localizedList,
	/** Optional real code excerpt, copied from the project repository. */
	code: z
		.object({ language: z.string(), source: z.string(), caption: localized })
		.optional(),
});

export const caseStudySchema = z.object({
	slug: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string(),
	kind: localized,
	summary: localized,
	role: localized,
	period: z.object({ start: yearMonth, end: yearMonth.optional() }),
	stack: z.array(z.string()).min(1),
	facts: localizedList,
	image: z.object({
		src: z.string().startsWith("/"),
		width: z.number().int().positive(),
		height: z.number().int().positive(),
		alt: localized,
	}),
	links: z.array(z.object({ label: localized, href: externalUrl })).min(1),
	sections: z.array(section).min(3),
	disclosure,
	/** Date the facts on the page were last checked against the source. */
	reviewed: z.iso.date(),
});

export const shortWorkSchema = z.object({
	title: z.string(),
	summary: localized,
	href: externalUrl,
	image: caseStudySchema.shape.image.optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type ShortWork = z.infer<typeof shortWorkSchema>;

// Keep the schema's locale keys in lockstep with the app's locale list.
const schemaLocales = Object.keys(localized.shape);
if (schemaLocales.join() !== locales.join()) {
	throw new Error(
		`content locales ${schemaLocales} differ from app locales ${locales}`,
	);
}
