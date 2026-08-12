import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectTags } from "./project-tags";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  analyticsLocation?: string;
};

export function ProjectCard({
  project,
  priority = false,
  analyticsLocation = "projects_index",
}: ProjectCardProps) {
  const darkImage = project.image?.replace("/assets/projects/", "/assets/projects/dark/");

  return (
    <article className="project-card">
      <div className="project-card-head">
        <div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
      </div>
      <Link
        href={`/projects/detail/${project.slug}`}
        className="project-visual"
        aria-label={`${project.title} 프로젝트 상세 보기`}
        style={{ "--project-accent": project.accent } as React.CSSProperties}
        data-analytics-event="project_card_click"
        data-analytics-project-slug={project.slug}
        data-analytics-project-category={project.category}
        data-analytics-location={analyticsLocation}
      >
        {project.image ? (
          <>
            <Image className="project-card-image project-card-image-light" src={project.image} alt={`${project.title} 대표 화면`} width={516} height={400} sizes="(max-width: 640px) 342px, 516px" priority={priority} unoptimized />
            <Image className="project-card-image project-card-image-dark" src={darkImage!} alt="" aria-hidden="true" width={516} height={400} sizes="(max-width: 640px) 342px, 516px" priority={priority} unoptimized />
          </>
        ) : null}
      </Link>
      <p className="project-summary">{project.summary}</p>
      <ProjectTags categoryLabel={project.categoryLabel} tags={project.tags} />
    </article>
  );
}
