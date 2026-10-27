import { ArrowUpRight } from "lucide-react";
import { MetaLine } from "../components/work";
import { copy, t } from "../content/copy";
import { projects } from "../content/projects";
import type { Project } from "../content/schema";
import type { Locale } from "../i18n";

const linkClass =
	"inline-flex min-h-6 items-center gap-1 font-medium underline-offset-4 hover:text-brand hover:underline";

/** One compact entry. The id is the anchor legacy v3 URLs redirect to. */
function ProjectItem({
	project,
	locale,
}: {
	project: Project;
	locale: Locale;
}) {
	return (
		<article id={project.slug} className="scroll-mt-8 border-t pt-6">
			<MetaLine parts={[t(project.kind, locale), String(project.year)]} />
			<h3 className="mt-1 text-lg font-semibold" translate="no">
				{project.title}
			</h3>
			<p className="mt-2 text-muted-foreground">{t(project.summary, locale)}</p>
			<p
				className="mt-3 font-mono text-sm text-muted-foreground"
				translate="no"
			>
				{project.stack.join(", ")}
			</p>
			<ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
				{project.demo && (
					<li>
						<a href={project.demo} className={linkClass}>
							{t(copy.projects.demo, locale)}
							<span className="sr-only"> ({project.title})</span>
							<ArrowUpRight aria-hidden="true" className="size-3.5" />
						</a>
					</li>
				)}
				<li>
					<a href={project.source} className={linkClass}>
						{t(copy.projects.source, locale)}
						<span className="sr-only"> ({project.title})</span>
						<ArrowUpRight aria-hidden="true" className="size-3.5" />
					</a>
				</li>
			</ul>
		</article>
	);
}

export function ProjectsPage({ locale }: { locale: Locale }) {
	const groups = [
		{ id: "recent", heading: copy.projects.recent },
		{ id: "earlier", heading: copy.projects.earlier },
	] as const;

	return (
		<>
			<header className="pt-12 md:pt-24">
				<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
					{t(copy.projects.heading, locale)}
				</h1>
				<p className="mt-6 max-w-measure text-lg text-muted-foreground">
					{t(copy.projects.intro, locale)}
				</p>
			</header>
			{groups.map((group) => (
				<section
					key={group.id}
					aria-labelledby={`projects-${group.id}`}
					className="mt-12 md:mt-16"
				>
					<h2
						id={`projects-${group.id}`}
						className="text-2xl font-semibold tracking-tight"
					>
						{t(group.heading, locale)}
					</h2>
					<div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
						{projects
							.filter((project) => project.group === group.id)
							.map((project) => (
								<ProjectItem
									key={project.slug}
									project={project}
									locale={locale}
								/>
							))}
					</div>
				</section>
			))}
		</>
	);
}
