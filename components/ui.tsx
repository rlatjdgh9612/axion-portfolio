"use client";

import Link from "next/link";
import { ArrowIcon } from "./icons";

export const RESUME_PATH = "/downloads/kim-seongho-resume-2026.pdf";

export function ResumeLink({ className = "button button-secondary" }: { className?: string }) {
  return <a className={className} href={RESUME_PATH} download="2026_서비스기획_UXUI디자이너_이력서_김성호.pdf">이력서 다운받기<ArrowIcon /></a>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  void delay;
  return <div className={className}>{children}</div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro container"><Reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="intro-actions"><ResumeLink /></div></Reveal></section>;
}

export function ProjectButton() {
  return <Link className="button button-primary" href="/projects/all">프로젝트 보기<ArrowIcon /></Link>;
}
