import Image from "next/image";
import { ContactSection } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui";

const skills = ["Figma", "Figma MCP", "Slack", "Notion", "Codex", "Claude", "Claude Code", "Claude Design", "Genspark", "Google Workspace", "Confluence", "Manyfast", "Manus"];
const process = [
  {
    step: "STEP 01",
    title: "서비스 기획",
    label: "Service Planning",
    heading: "사용자 문제를 발견하고 서비스 구조를 설계합니다",
    bullets: ["인터뷰/경쟁사 분석 기반 핵심 문제 정의 도출", "AI 기획 도구를 활용한 서비스 구조 도출", "PRD, User Flow, IA 등 기획 산출물 설계"],
  },
  {
    step: "STEP 02",
    title: "AI 기반 UX/UI 설계",
    label: "AI/AX Strategy & UX/UI Design",
    heading: "AI 도구를 활용하여 UX/UI를 설계합니다",
    bullets: ["AI & AX 워크플로우 설계 및 적용", "Figma MCP 활용 프로토타입·디자인시스템 구축", "AI 기반 반복 검증으로 디자인 품질 개선"],
  },
  {
    step: "STEP 03",
    title: "제품 개선 & 운영",
    label: "Product Operation & Improvement",
    heading: "지속적인 개선으로 제품 완성도를 높입니다",
    bullets: ["실제 서비스 적용까지 긴밀한 협업", "사용자 피드백 기반 지속적 제품 개선", "완성도 높은 사용자 경험 구현"],
  },
];

export const metadata = { title: "소개" };

export default function AboutPage() {
  return <>
    <PageHero variant="about" />
    <section className="about-profile container">
      <Reveal className="about-figma-heading"><h1>안녕하세요!<br/>AX 기획자 &amp; UX 디자이너 김성호 입니다</h1></Reveal>
      <div className="about-figma-grid">
        <Reveal className="about-figma-copy">
          <div><h2>자기 소개</h2><p>서비스 기획과 프로덕트 디자인을 중심으로 다양한 산업의 기업들과 프로젝트를 수행해왔으며, 최근에는 AX Strategy를 활용한 AI 프로세스를 연구하고 실무에 적용하고 있습니다.</p></div>
          <div><h2>핵심 역량</h2><ul><li>사용자 문제 정의 기반 서비스 기획 &amp; Product Design 수행</li><li>AI(Claude, Figma MCP) 활용 UX 기획 효율화 및 웹사이트 개발 구축</li><li>금융·핀테크, 세무, 블록체인, 이커머스 등 다양한 도메인 UX 설계 경험</li><li>Figma, Confluence, Slack 기반 PM·개발자 협업 커뮤니케이션</li></ul></div>
          <div><h2>핵심 스킬</h2><div className="about-skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        </Reveal>
        <Reveal className="about-profile-image" delay={.08}><Image src="/assets/about/profile-main.png" alt="김성호 프로필" width={428} height={656} priority /></Reveal>
      </div>
    </section>
    <section className="about-process container">
      <Reveal><h2>업무 프로세스</h2><p>문제 정의부터 제품 고도화까지, AI &amp; AX 기반의 업무 프로세스를 소개합니다</p></Reveal>
      <div className="process-list">{process.map((item, index) => <Reveal className="process-row" key={item.step} delay={index * .06}>
        <div className="process-index"><strong>{item.step}</strong><h3>{item.title}</h3><span>{item.label}</span></div>
        <div className="process-description"><h4>{item.heading}</h4><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
      </Reveal>)}</div>
    </section>
    <ContactSection />
  </>;
}
