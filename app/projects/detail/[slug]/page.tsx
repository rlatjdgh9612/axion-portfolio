import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import { AxionWorkflow } from "@/components/axion-workflow";
import { AxionCaseStudy } from "@/components/axion-case-study";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { ContactSection } from "@/components/footer";
import { Reveal } from "@/components/ui";
import { projects } from "@/data/projects";
import Image from "next/image";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: projects.find((item) => item.slug === slug)?.title ?? "프로젝트" };
}

// Legacy compact renderer retained temporarily for comparison with the completed Figma case study.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AxionDetail() {
  const agents = [
    ["기획 문서 관리", "Notion / Markdown", ["Claude 기반 기획 문서(Notion & Markdown) 통합 관리", "기획안 · PRD · 개발 가이드 버전 관리", "AI Agent가 참조하는 단일 문서 저장소"]],
    ["서비스 기획", "Claude", ["서비스 분석 및 핵심 문제 정의", "기획안 · PRD · IA · User Flow 구조화", "요구사항 검토 및 UX 문구 고도화"]],
    ["UX/UI 디자인", "Figma", ["반응형 UI 및 주요 화면 설계", "디자인 시스템·컴포넌트 문서화", "AI Agent 기반 디자인 분석 · QA 정합성 점검"]],
    ["프로덕트 개발", "Codex & Figma MCP", ["Figma 기반 React · Next.js 화면 구현", "디자인 토큰·컴포넌트 코드 연동", "테스트·반응형·접근성 · UI 정합성 QA 수행"]],
  ] as const;
  return <><section className="detail-section container"><Reveal><span className="eyebrow">Background Overview</span><h2>프로젝트 기획배경 &amp; 핵심목표</h2><p className="section-description">서비스 기획부터 개발까지 연결되는 AX 프로세스를 설계하기 위해 프로젝트를 기획했습니다.</p><div className="detail-cards"><article><span>Background</span><h3>AX 프로젝트 기획배경</h3><ul><li>PDF만으로 기획력과 디자인 실행력을 함께 증명하기 어려움</li><li>다수의 고객사 프로젝트를 빠르게 탐색할 웹 구조 필요</li><li>AI 발전에 따른 Product Design 업무 환경 변화</li><li>실무에 적용 가능한 AI 협업 프로세스 구축 필요</li></ul></article><article><span>Project Goal</span><h3>프로젝트 핵심 목표</h3><ul><li>AX 기반 Product Design Workflow 구축</li><li>서비스 기획 → 디자인 → 개발의 End-to-End 설계</li><li>Claude·Figma MCP·Codex 기반 AI 협업 검증</li><li>AI 협업을 통한 Product Design 생산성 향상</li></ul></article></div></Reveal></section><section className="detail-section container desktop-rich"><Reveal><span className="eyebrow">AI Agent Flow</span><h2>AI Agent 구조</h2><p className="section-description">각 AI 도구의 역할을 분리하고 산출물을 연결해 기획, 디자인, 개발의 일관성을 유지했습니다.</p><div className="agent-grid">{agents.map(([type, title, bullets]) => <article key={title}><span>{type}</span><h3>{title}</h3><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div><div className="development-grid"><article><span>개발 스택</span><h3>AI Development Stack</h3><p>TypeScript · React · Next.js · Tailwind CSS</p></article><article><span>버전 관리</span><h3>Git / GitHub</h3><ul><li>브랜치 · 커밋 · 소스 코드 버전 관리</li><li>기능 단위 작업 이력 추적</li><li>Pull Request 기반 변경 검토</li><li>배포 버전과 개발 이력 연결</li></ul></article></div></Reveal></section><section className="detail-section container desktop-rich"><Reveal><span className="eyebrow">AX Product Harness</span><h2>AI Harness 구축</h2><p className="section-description">프로젝트 데이터, 디자인 규칙, 구현과 검증 기준을 하나의 실행 체계로 연결해 반복 가능한 제작 환경을 구축했습니다.</p><AxionWorkflow/><p className="feedback-loop">검증 결과를 프로젝트 데이터와 디자인 규칙에 재반영</p></Reveal></section><section className="detail-section container desktop-rich"><Reveal><span className="eyebrow">Structure</span><h2>정보구조도 (I.A)</h2><div className="ia-table"><div><b>1 Depth</b><b>2 Depth</b><b>3 Depth · 콘텐츠</b></div>{[["메인", "Hero / 프로젝트", "핵심 메시지·CTA·프로젝트 목록"], ["소개", "프로필 / 역량 / 프로세스", "소개·핵심 역량·Skill·업무 프로세스"], ["프로젝트", "전체 / 인턴 / 외주 / 회사 / 개인", "카테고리 필터·프로젝트 카드·상세 진입"], ["프로젝트 상세", "기획배경 / 주요화면 / 디자인시스템", "문제정의·기획 과정·화면 설계·디자인 규칙"], ["공통", "GNB / Contact / Footer", "테마·전체 메뉴·이력서·연락처·페이지 이동"]].map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div></Reveal></section><section className="detail-section container"><Reveal><span className="eyebrow">Design</span><h2>주요화면</h2><div className="detail-showcase detail-showcase-image"><div className="detail-project-image"><Image src="/assets/detail/axion-hero.png" alt="AXION 주요 화면" width={1056} height={640} sizes="(max-width: 640px) calc(100vw - 48px), 1056px" priority /></div><div><h3>콘텐츠 중심의 반응형 경험</h3><p>데스크톱에서는 문제 해결 과정 전체를, 모바일에서는 기획 배경과 주요 결과물을 중심으로 전달합니다.</p></div></div></Reveal></section><section className="detail-section container desktop-rich"><Reveal><span className="eyebrow">Design System</span><h2>디자인시스템</h2><div className="system-grid"><article><h3>Typography</h3><strong>Pretendard</strong><p>Desktop 72 / 40 / 24 / 18 / 16 / 14<br/>Mobile 32 / 24 / 18 / 16 / 14 / 12</p></article><article><h3>Grid</h3><strong>12 / 4 Columns</strong><p>Desktop 1200 · Content 1056<br/>Mobile 390 · Content 342</p></article><article><h3>Theme</h3><div className="swatches"><i/><i/><i/><i/></div><p>Light / Dark 의미 기반 컬러 체계</p></article></div></Reveal></section></>;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <><section className="detail-hero-shell"><div className="detail-hero container"><Link className="back-link" href="/projects/all"><ArrowIcon direction="left"/> Back</Link><Reveal><h2>{project.subtitle}</h2><h1>{project.title}</h1><div className="tag-list"><span>{project.categoryLabel}</span>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p>{project.slug === "axion" ? "AXION은 AX Product Design & Development를 구축한 개인 프로젝트입니다" : project.summary}</p></Reveal></div></section><section className="detail-main-image container"><Image src={`/assets/detail/${project.slug}-hero.png`} alt={`${project.title} 프로젝트 대표 화면`} width={1056} height={640} sizes="(max-width: 640px) calc(100vw - 48px), 1056px" priority />{project.slug === "axion" && <span className="detail-image-label">AI 포트폴리오</span>}</section><section className="project-meta-section"><div className="project-meta container"><div><span>프로젝트 기간</span><strong>{project.period}</strong></div><div><span>담당 업무</span><strong>{project.role}</strong></div><div><span>사용 툴</span><strong>{project.slug === "axion" ? "Figma, Figma MCP, Codex, Claude, Notion" : project.tools}</strong></div><div><span>팀</span><strong>{project.slug === "axion" ? <>서비스 기획 & UX 디자인 & 개발자 (1명)<br/>(1인 프로젝트)</> : project.team}</strong></div></div></section>{project.slug === "axion" ? <AxionCaseStudy/> : <ProjectCaseStudy slug={project.slug} title={project.title}/>}<ContactSection/></>;
}
