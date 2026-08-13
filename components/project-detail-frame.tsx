"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
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
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const frame = getProjectDetailFrame(project.slug, theme);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="detail-figma-frame container" aria-label={`${project.title} 프로젝트 상세 사례 연구`}>
      <div
        className="detail-figma-images"
        data-detail-theme={isMounted ? theme : undefined}
        style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
      >
        {isMounted
          ? frame.sections.map((section, index) => (
              <Image
                key={section.src}
                className={`detail-figma-image detail-figma-image-${theme}`}
                src={section.src}
                alt={index === 0 ? `${project.title} 프로젝트 상세 화면` : ""}
                aria-hidden={index === 0 ? undefined : true}
                width={section.width}
                height={section.height}
                sizes="(max-width: 640px) calc(100vw - 48px), 1056px"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                unoptimized
              />
            ))
          : null}
      </div>
      <ProjectDetailsText project={project} />
    </section>
  );
}
