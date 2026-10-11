import { experience, profile } from "./profile";
import { projects } from "./projects";
import {
	caseStudyEntrySchema,
	experienceSchema,
	profileSchema,
	projectSchema,
	shortWorkSchema,
} from "./schema";
import { caseStudies, otherWork } from "./work";

/**
 * Parse all content against its schema. Runs on the server only (imported by
 * entry-server.tsx, so a bad entry fails the prerender, and by the tests), which
 * keeps zod out of the client bundle.
 */
export function validateContent() {
	profileSchema.parse(profile);
	experienceSchema.array().parse(experience);
	caseStudyEntrySchema.array().parse(caseStudies);
	shortWorkSchema.array().parse(otherWork);
	projectSchema.array().parse(projects);
}
