import Image from "next/image";
import type { Project } from "@/data/projects";
import { getProjectDetailFrame } from "@/data/project-detail-frames";

type ProjectDetailFrameProps = {
  project: Project;
};

function ProjectDetailsText({ project }: ProjectDetailFrameProps) {
  return (
    <div className="sr-only">
      <h2>{project.title} 프로젝트 개요</h2>
      <p>{project.summary}</p>
      <dl>
        <dt>프로젝트 기간</dt>
        <dd>{project.period}</dd>
        <dt>담당 업무</dt>
        <dd>{project.role}</dd>
        {project.tools ? (
          <>
            <dt>사용 도구</dt>
            <dd>{project.tools}</dd>
          </>
        ) : null}
        {project.team ? (
          <>
            <dt>팀 구성</dt>
            <dd>{project.team}</dd>
          </>
        ) : null}
      </dl>
    </div>
  );
}

export function ProjectDetailFrame({ project }: ProjectDetailFrameProps) {
  const frame = getProjectDetailFrame(project.slug);
  const sharedImageProps = {
    sizes: "(max-width: 640px) calc(100vw - 48px), 1056px",
    style: { width: "100%", height: "auto" },
  } as const;

  return (
    <section className="detail-figma-frame container" aria-label={`${project.title} 프로젝트 상세 사례 연구`}>
      <Image
        {...sharedImageProps}
        className="detail-figma-image detail-figma-image-light"
        src={frame.lightImage}
        alt={`${project.title} 프로젝트 상세 화면`}
        width={frame.light.width}
        height={frame.light.height}
        priority
      />
      <Image
        {...sharedImageProps}
        className="detail-figma-image detail-figma-image-dark"
        src={frame.darkImage}
        alt=""
        aria-hidden="true"
        width={frame.dark.width}
        height={frame.dark.height}
      />
      <ProjectDetailsText project={project} />
    </section>
  );
}
