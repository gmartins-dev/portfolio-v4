import { formatPeriod } from "./components/work";
import { copy } from "./content/copy";
import { professionalWork } from "./content/professional-work";
import { education, experience, profile } from "./content/profile";
import { caseStudies, otherWork } from "./content/work";
import { formatMonth, localizedPath } from "./i18n";
import { siteUrl } from "./seo";

const url = (path: string, locale: "en" | "pt-BR" = "en") =>
	`${siteUrl}${localizedPath(locale, path)}`;

const confidentiality =
	"Most of his work as an employee, contractor or consultant is private under confidentiality terms; the site shows personal and public projects, one anonymized professional case study, and the public products he worked on, described from each company's public site.";

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
			? `Currently: ${current.role}, ${current.company} (since ${formatMonth(current.start, "en")}).`
			: "",
		`The site is in English and Brazilian Portuguese (${url("/", "pt-BR")}).`,
		confidentiality,
		"",
		"## Pages",
		"",
		`- [Home](${url("/")}): positioning, cases, capabilities and experience summary`,
		`- [Cases](${url("/cases")}): case studies, public products he worked on, client websites and community work`,
		`- [More projects](${url("/projects")}): smaller projects, technical challenges and earlier work, with demos and source`,
		`- [How I work](${url("/how-i-work")}): his development process with coding agents: specs, bounded tasks, quality gates, human review and ADRs`,
		`- [About](${url("/about")}): full professional history, education, tools and resumes`,
		`- [Contact](${url("/contact")}): contact form and email address`,
		"",
		"## Case studies",
		"",
		...caseStudies.map(
			(study) =>
				`- [${study.title}](${url(`/cases/${study.slug}`)}): ${study.summary.en} (${study.kind.en}; facts checked ${study.reviewed})`,
		),
		"",
		"## Products he worked on",
		"",
		...professionalWork.map((work) => {
			const job = experience.find((entry) => entry.company === work.company);
			const role = job ? `${job.role}, ` : "";
			return `- [${work.product}](${work.url}) by ${work.company} (${role}${url("/cases")}#${work.slug}): ${work.summary.en}`;
		}),
		"",
		"## Experience",
		"",
		...experience.map(
			(entry) =>
				`- ${entry.role}, ${entry.company} (${formatMonth(entry.start, "en")} to ${entry.end ? formatMonth(entry.end, "en") : "present"}): ${entry.context.en}`,
		),
		"",
		"## Education",
		"",
		...education.map(
			(entry) =>
				`- ${entry.program.en}, ${entry.institution} (${formatMonth(entry.start, "en")} to ${formatMonth(entry.end, "en")}${entry.status === "in-progress" ? ", in progress" : ""})`,
		),
		"",
		"## Optional",
		"",
		...otherWork.map(
			(item) => `- [${item.title}](${item.href}): ${item.summary.en}`,
		),
		`- [Full text](${siteUrl}/llms-full.txt): every case study and product entry in full, as Markdown`,
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

/** Drop blank-line runs left by optional parts. */
const tidy = (lines: string[]) =>
	lines
		.filter((line, index, all) => !(line === "" && all[index - 1] === ""))
		.join("\n");

/**
 * /llms-full.txt: the English text of every case study and public product
 * entry, so an assistant can read and cite the work without rendering the
 * pages. Same content model as the pages; linked from /llms.txt.
 */
export function buildLlmsFullTxt() {
	return tidy([
		`# ${profile.name}: work in full`,
		"",
		`> ${copy.meta.home.description.en} This file holds the full English text of the case studies and product entries on ${siteUrl}; ${siteUrl}/llms.txt is the short map. Case study text is in his own words (first person).`,
		"",
		confidentiality,
		"",
		"# Case studies",
		"",
		...caseStudies.flatMap((study) => [
			`## ${study.title}`,
			"",
			`- URL: ${url(`/cases/${study.slug}`)}`,
			`- Kind: ${study.kind.en}`,
			`- Role: ${study.role.en}`,
			`- Period: ${formatPeriod(study.period, "en")}`,
			`- Stack: ${study.stack.join(", ")}`,
			`- Facts checked: ${study.reviewed}`,
			...study.links.map((link) => `- ${link.label.en}: ${link.href}`),
			"",
			study.summary.en,
			"",
			...study.facts.en.map((fact) => `- ${fact}`),
			"",
			...study.sections.flatMap((section) => [
				`### ${section.heading.en}`,
				"",
				...section.body.en.flatMap((paragraph) => [paragraph, ""]),
				...(section.code
					? [
							`\`\`\`${section.code.language}`,
							section.code.source,
							"```",
							"",
							section.code.caption.en,
							"",
						]
					: []),
			]),
		]),
		"# Products he worked on",
		"",
		"Public products he helped build as an employee or contractor. Each summary paraphrases the company's public site; internal details stay private.",
		"",
		...professionalWork.flatMap((work) => {
			const job = experience.find((entry) => entry.company === work.company);
			return [
				`## ${work.product} (${work.company})`,
				"",
				`- Product: ${work.url}`,
				...(job
					? [
							`- Role: ${job.role}, ${formatPeriod(job, "en")}`,
							`- On the site: ${url("/cases")}#${work.slug}`,
						]
					: []),
				...(work.stack ? [`- Stack: ${work.stack.join(", ")}`] : []),
				"",
				work.summary.en,
				"",
				"What he did:",
				"",
				...work.contributions.en.map((item) => `- ${item}`),
				"",
			];
		}),
	]);
}
