"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "./project-card";
import { PageHero } from "./page-hero";
import { categories, getProjectsByCategory, type Project } from "@/data/projects";

function withCategoryOverrides(project: Project, category: string): Project {
  if (category === "company" && project.slug === "investhive") {
    return { ...project, tags: ["B2C", "UXUI 디자인", "WEB Dashboard"] };
  }

  return project;
}

export function ProjectsView({ category }: { category: string }) {
  const reduced = useReducedMotion();
  const visibleProjects = getProjectsByCategory(category).map((project) =>
    withCategoryOverrides(project, category),
  );

  return (
    <>
      <PageHero variant="projects" />
      <section className="projects-index container">
        <div className="projects-heading">
          <h2>프로젝트</h2>
          <p>사용자와 비즈니스의 문제를 해결하기 위해 기획하고 설계한 프로젝트를 소개합니다</p>
        </div>
        <nav className="filter-nav" aria-label="프로젝트 분류">
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              scroll={false}
              aria-current={category === item.slug ? "page" : undefined}
              data-analytics-event="project_filter_select"
              data-analytics-category={item.slug}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.24, delay: reduced ? 0 : Math.min(index * 0.045, 0.2) }}
              >
                <ProjectCard project={project} priority={index < 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
