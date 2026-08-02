"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "./project-card";
import { PageHero } from "./page-hero";
import { categories, projects } from "@/data/projects";

export function ProjectsView({ category }: { category: string }) {
  const reduced = useReducedMotion();
  const visible = category === "all" ? projects : projects.filter((project) => project.category === category);
  return (
    <><PageHero variant="projects" /><section className="projects-index container">
      <div className="projects-heading"><h2>프로젝트</h2><p>사용자와 비즈니스의 문제를 해결하기 위해 기획하고 설계한 프로젝트를 소개합니다</p></div>
      <nav className="filter-nav" aria-label="프로젝트 분류">{categories.map((item) => <Link key={item.slug} href={`/projects/${item.slug}`} aria-current={category === item.slug ? "page" : undefined}>{item.label}</Link>)}</nav>
      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => <motion.div layout key={project.slug} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .24, delay: reduced ? 0 : Math.min(index * .045, .2) }}><ProjectCard project={project} priority={index < 2}/></motion.div>)}
        </AnimatePresence>
      </motion.div>
    </section></>
  );
}
