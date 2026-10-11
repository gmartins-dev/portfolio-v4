import { copy } from "./content/copy";
import { experience, profile } from "./content/profile";
import { caseStudies, otherWork } from "./content/work";
import { formatMonth, localizedPath } from "./i18n";
import { siteUrl } from "./seo";

const url = (path: string, locale: "en" | "pt-BR" = "en") =>
	`${siteUrl}${localizedPath(locale, path)}`;

/**
 * /llms.txt (https://llmstxt.org): a plain-text map of the site for AI
 * assistants and agents, generated from the same content model as the pages
 * so the two cannot drift. Optional for search engines; written by
 * scripts/prerender.mjs.
 */
export function buildLlmsTxt() {
	const current = experience.find((entry) => !entry.end);
	return [
		`# ${profile.name}`,
		"",
		`> ${copy.meta.home.description.en}`,
		"",
		`${profile.name} is a ${profile.role} based in ${profile.location.en}.`,
		current
			? `Currently: ${current.role} at ${current.company} (since ${formatMonth(current.start, "en")}).`
			: "",
		`The site is in English and Brazilian Portuguese (${url("/", "pt-BR")}).`,
		"Most of his work as an employee, contractor or consultant is private under confidentiality terms; the site focuses on personal and public projects.",
		"",
		"## Pages",
		"",
		`- [Home](${url("/")}): positioning, selected work, capabilities and experience summary`,
		`- [Work](${url("/work")}): case studies, client websites and community work`,
		`- [More projects](${url("/projects")}): smaller projects, technical challenges and earlier work, with demos and source`,
		`- [About](${url("/about")}): full professional history, tools and resumes`,
		"",
		"## Case studies",
		"",
		...caseStudies.map(
			(study) =>
				`- [${study.title}](${url(`/work/${study.slug}`)}): ${study.summary.en} (${study.kind.en}; facts checked ${study.reviewed})`,
		),
		"",
		"## Experience",
		"",
		...experience.map(
			(entry) =>
				`- ${entry.role}, ${entry.company} (${formatMonth(entry.start, "en")} to ${entry.end ? formatMonth(entry.end, "en") : "present"}): ${entry.context.en}`,
		),
		"",
		"## Optional",
		"",
		...otherWork.map(
			(item) => `- [${item.title}](${item.href}): ${item.summary.en}`,
		),
		`- [GitHub](${profile.links.github})`,
		`- [LinkedIn](${profile.links.linkedin})`,
		`- [Resume (English)](${siteUrl}${profile.resume.en})`,
		`- [Resume (Portuguese)](${siteUrl}${profile.resume["pt-BR"]})`,
		`- Contact: ${profile.email}`,
		"",
	]
		.filter((line, index, lines) => !(line === "" && lines[index - 1] === ""))
		.join("\n");
}
