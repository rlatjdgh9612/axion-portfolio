import Link from "next/link";
import Image from "next/image";
import { ContactSection } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { ProjectButton, ResumeLink, Reveal } from "@/components/ui";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <section className="home-hero container">
        <Reveal className="hero-copy">
          <p className="hero-greeting">안녕하세요 김성호 입니다!</p>
          <h1><span>더 나은 서비스를 <em>기획</em>하고,</span><span>더 나은 사용자 경험을 <em>디자인</em> 합니다</span></h1>
          <strong>2026 PORTFOLIO</strong>
          <div className="hero-bottom"><div className="hero-actions"><ProjectButton/><ResumeLink/></div><p>서비스 기획부터 프로덕트 디자인, AI &amp; AX Strategy까지<br/>더 빠르고 효율적인 제품 개발 프로세스를 만들어갑니다.</p></div>
        </Reveal>
      </section>
      <section className="projects-section container">
        <Reveal className="section-heading"><div><h2>프로젝트</h2><p>사용자와 비즈니스의 문제를 해결하기 위해 기획하고 설계한 프로젝트를 소개합니다.</p></div><Link className="text-link" href="/projects/all">더 보기 →</Link></Reveal>
        <div className="project-grid">{projects.slice(0, 4).map((project, index) => <Reveal key={project.slug} delay={(index % 2) * 0.08}><ProjectCard project={project} priority={index < 2}/></Reveal>)}</div>
      </section>
      <section className="home-about">
        <div className="container home-about-grid">
          <Reveal className="home-about-copy"><h2><span>사용자의 문제를 <em>이해</em>하고,</span><span><em>더 나은</em> 서비스 경험으로 <em>연결</em>합니다</span></h2><p>서비스 기획과 프로덕트 디자인 중심으로 AX 역량을 실무에 적용하고 있습니다.</p><Link className="button button-primary about-link" href="/about">더 알아보기 →</Link></Reveal>
          <Reveal className="keyword-list" delay={.08}>{["SERVICE PLANNING", "UX/UI DESIGN", "PRODUCT DESIGN", "AI & AX STRATEGY"].map((keyword) => <strong key={keyword}>{keyword}</strong>)}</Reveal>
        </div>
      </section>
      <section className="partners-section">
        <Reveal className="partner-grid-image"><Image src="/assets/figma-home/partner-grid.png" alt="프로젝트를 함께한 고객사 로고" width={1200} height={334} sizes="100vw" loading="eager" /></Reveal>
      </section>
      <ContactSection />
    </>
  );
}
