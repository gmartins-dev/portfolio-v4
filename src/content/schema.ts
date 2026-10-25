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
// "YYYY" or "YYYY-MM": anonymized work may show only the year.
const yearOrMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/);

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
	/** A year alone for confidential work, as in anonymized case studies. */
	start: yearOrMonth,
	end: yearMonth.optional(),
	context: localized,
	highlights: localizedList,
	/** Slug of the case study that covers this role, linked from About. */
	caseStudy: z
		.string()
		.regex(/^[a-z0-9-]+$/)
		.optional(),
});

/** Formal education. In-progress courses are always shown as such. */
export const educationSchema = z.object({
	institution: z.string(),
	program: localized,
	start: yearMonth,
	end: yearMonth,
	status: z.enum(["in-progress", "completed"]),
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

/**
 * Responsive WebP variants at public<src>-<width>.webp
 * (scripts/capture-work-images.mjs); width and height are the largest.
 */
const imageSchema = z.object({
	src: z.string().regex(/^\/[\w/-]+$/),
	widths: z.array(z.number().int().positive()).min(1),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	alt: localized,
	/** "contain" shows the whole image (diagrams); default crops to fill. */
	fit: z.enum(["cover", "contain"]).optional(),
});

export const caseStudySchema = z.object({
	slug: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string(),
	kind: localized,
	summary: localized,
	role: localized,
	period: z.object({ start: yearOrMonth, end: yearOrMonth.optional() }),
	stack: z.array(z.string()).min(1),
	facts: localizedList,
	image: imageSchema,
	/**
	 * A simpler image for teasers (home and /work), when the main one is a
	 * diagram too detailed to read at teaser size. Teasers hide it from
	 * assistive tech, so it has no alt text.
	 */
	teaserImage: imageSchema.omit({ alt: true }).optional(),
	/** Public links; anonymized work may have none (see the refinement below). */
	links: z.array(z.object({ label: localized, href: externalUrl })),
	sections: z.array(section).min(3),
	disclosure,
	/** Date the facts on the page were last checked against the source. */
	reviewed: z.iso.date(),
});

/** Public case studies must link to something a reader can verify. */
export const caseStudyEntrySchema = caseStudySchema.superRefine(
	(study, ctx) => {
		if (study.disclosure === "public" && study.links.length === 0) {
			ctx.addIssue({
				code: "custom",
				path: ["links"],
				message: "public case studies need at least one link",
			});
		}
	},
);

export const shortWorkSchema = z.object({
	title: z.string(),
	/** What the work is, e.g. "Client website" or "Community project". */
	kind: localized,
	summary: localized,
	href: externalUrl,
	image: caseStudySchema.shape.image.optional(),
});

/**
 * Smaller and earlier projects, listed compactly on /projects. `slug` is the
 * in-page anchor that legacy v3 URLs redirect to (vercel.json).
 */
export const projectSchema = z.object({
	slug: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string(),
	year: z.number().int().min(2020),
	group: z.enum(["recent", "earlier"]),
	kind: localized,
	summary: localized,
	stack: z.array(z.string()).min(1),
	source: externalUrl,
	demo: externalUrl.optional(),
});

/**
 * Public products built while employed or contracted. Role, period and
 * location come from the matching `experience` entry (same `company`).
 */
export const professionalWorkSchema = z.object({
	/** In-page anchor on /work, linked from the About page. */
	slug: z.string().regex(/^[a-z0-9-]+$/),
	company: z.string(),
	product: z.string(),
	/** The public product page. */
	url: externalUrl,
	/** What the product is, paraphrased from the company's public site. */
	summary: localized,
	contributions: localizedList,
	/** Only technologies a source confirms; omitted when none does. */
	stack: z.array(z.string()).min(1).optional(),
	image: caseStudySchema.shape.image.optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type ShortWork = z.infer<typeof shortWorkSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProfessionalWork = z.infer<typeof professionalWorkSchema>;

// Keep the schema's locale keys in lockstep with the app's locale list.
const schemaLocales = Object.keys(localized.shape);
if (schemaLocales.join() !== locales.join()) {
	throw new Error(
		`content locales ${schemaLocales} differ from app locales ${locales}`,
	);
}
