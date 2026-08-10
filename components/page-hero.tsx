import { ProjectButton, ResumeLink, Reveal } from "./ui";

export function PageHero({ variant }: { variant: "about" | "projects" }) {
  const about = variant === "about";
  return (
    <section className="page-hero container">
      <Reveal className="page-hero-copy">
        <h1>{about ? <><span>사용자의 문제를 <em>이해</em>하고,</span><span><em>더 나은</em> 서비스 경험으로 <em>연결</em>합니다</span></> : <><span>사용자 문제를 <em>정의</em>하고,</span><span><em>제품 경험</em>으로 <em>해결</em>했습니다</span></>}</h1>
        <strong>2026 PORTFOLIO</strong>
        <div className="page-hero-bottom">
          <div className="page-hero-actions">{about ? <ProjectButton analyticsLocation="about_hero" /> : null}<ResumeLink analyticsLocation={about ? "about_hero" : "projects_hero"} /></div>
          <p>서비스 기획부터 프로덕트 디자인, AI &amp; AX Strategy까지<br />더 빠르고 효율적인 제품 개발 프로세스를 만들어갑니다</p>
        </div>
      </Reveal>
    </section>
  );
}
