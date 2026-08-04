import Image from "next/image";
import { AxionWorkflow } from "@/components/axion-workflow";
import { Reveal } from "@/components/ui";

const agents = [
  ["서비스 기획", "Claude", ["서비스 분석 및 핵심 문제 정의", "기획안 · PRD · IA · 유저 플로우 구조화", "요구사항 검토 및 UX 문구 고도화"]],
  ["기획 문서 관리", "Notion / Markdown", ["Claude 기반 기획 문서(Notion & Markdown) 통합 관리", "기획안 · PRD · 개발 가이드 버전 관리", "AI Agent가 참조하는 단일 문서 저장소"]],
  ["UXUI 디자인", "Figma", ["반응형 UI 및 주요 화면 설계", "디자인 시스템·컴포넌트 문서화", "AI Agent 기반 디자인 분석 · QA 정합성 점검"]],
  ["프로덕트 개발", "Codex & Figma MCP", ["Figma 기반 React · Next.js 화면 구현", "디자인 토큰·컴포넌트 코드 연동", "테스트·반응형·접근성 · UI 정합성 QA 수행"]],
] as const;

const iaGroups = [
  ["홈", [["상단 소개", "핵심 포지셔닝, 대표 프로젝트 CTA, About 이동"], ["프로젝트", "대표 프로젝트 카드, 카테고리 태그, 프로젝트 상세 링크"], ["소개 미리보기", "Product Designer 소개, 핵심 역량, About 이동"], ["협업 파트너", "협업 경험, 파트너 및 클라이언트 정보"], ["연락하기", "이메일 CTA, 포트폴리오 및 외부 채널 연결"]]],
  ["소개", [["상단 소개", "프로필 요약, 핵심 포지셔닝, 경력 소개"], ["상세 소개", "경력, 역할, 전문 분야, 업무 방식 및 사용 도구"]]],
  ["프로젝트", [["전체 프로젝트", "전체 프로젝트 목록, 필터, 프로젝트 카드 그리드"], ["카테고리 필터", "사내·개인·외주·회사 프로젝트 분류 및 탐색"]]],
  ["프로젝트 상세", [["개요 및 프로세스", "기획 배경, 핵심 목표, AX Workflow, AI Agent 협업 구조, IA"], ["디자인 및 결과", "주요 화면, 디자인 시스템, 구축 결과, 학습, 이전·다음 프로젝트"]]],
  ["공통 요소", [["글로벌 내비게이션", "AXION 로고, Home·About·Projects, 테마 전환"], ["푸터", "연락처, 외부 채널, 저작권 및 사이트 정보"]]],
] as const;

const previewSets = {
  homeLight: ["home-light-navbar", "home-light-hero", "home-light-projects", "home-light-about", "home-light-partner", "home-light-contact", "footer-light"],
  homeDark: ["navbar-dark", "home-dark-hero", "home-dark-projects", "home-dark-about", "home-dark-partner", "contact-dark", "footer-dark"],
  projectsLight: ["navbar-light", "projects-light-hero", "projects-light-list", "contact-light", "footer-light"],
  projectsDark: ["navbar-dark", "projects-dark-hero", "projects-dark-list", "contact-dark", "footer-dark"],
} as const;

const previewDimensions: Record<string, readonly [number, number]> = {
  "contact-dark": [1032, 470], "contact-light": [1032, 470], "footer-dark": [1032, 395], "footer-light": [1032, 395],
  "home-dark-about": [1032, 364], "home-dark-hero": [1032, 494], "home-dark-partner": [1032, 287], "home-dark-projects": [1032, 1331],
  "home-light-about": [1032, 371], "home-light-contact": [1032, 470], "home-light-hero": [1032, 494], "home-light-navbar": [1032, 82], "home-light-partner": [1032, 287], "home-light-projects": [1032, 1331],
  "navbar-dark": [1032, 82], "navbar-light": [1032, 82], "projects-dark-hero": [1032, 454], "projects-dark-list": [1032, 1403], "projects-light-hero": [1032, 454], "projects-light-list": [1032, 1403],
};

const desktopType = [
  ["Display / Desktop", "Pretendard / Bold", "72px", "Auto", "AXION", "display"],
  ["Heading / Large", "Pretendard / Bold", "40px", "48px", "프로젝트의 문제와 해결", "h-large"],
  ["Heading / Small", "Pretendard / Bold", "24px", "31px", "디자인 시스템", "h-small"],
  ["Body / Large", "Pretendard / Regular", "18px", "29px", "기획부터 개발까지의 과정을 설명합니다", "b-large"],
  ["Body / Medium", "Pretendard / Regular", "16px", "24px", "핵심 내용을 명확하게 전달합니다", "b-medium"],
  ["Label / Medium", "Pretendard / SemiBold", "14px", "20px", "AI-NATIVE PRODUCT DESIGN", "label"],
] as const;

const mobileType = [
  ["Display / Mobile", "Pretendard / Bold", "32px", "42px", "더 나은 경험을 디자인합니다", "m-display"],
  ["Heading / Mobile", "Pretendard / Bold", "24px", "31px", "안녕하세요 김성호입니다", "m-heading"],
  ["Action / Medium", "Pretendard / SemiBold", "18px", "22px", "프로젝트 보기", "m-action"],
  ["Body / Medium", "Pretendard / Regular", "16px", "24px", "서비스 기획부터 AI & AX Strategy까지", "b-medium"],
  ["Body / Small", "Pretendard / Regular", "14px", "22px", "AI & AX STRATEGY", "m-small"],
  ["Caption", "Pretendard / Regular", "12px", "17px", "©2026 AXION. All Rights Reserved", "caption"],
] as const;

function ScreenPreview({ title, description, parts, dark = false }: { title: string; description: string; parts: readonly string[]; dark?: boolean }) {
  return <article className="axion-screen-card">
    <h3>{title}</h3><p>{description}</p>
    <div className={`axion-screen-composite${dark ? " is-dark" : ""}`}>{parts.map((part) => {
      const [width, height] = previewDimensions[part];
      return <Image key={part} src={`/assets/detail/axion/${part}.png`} alt="" width={width} height={height} sizes="(max-width: 640px) calc(100vw - 48px), 516px" />;
    })}</div>
  </article>;
}

function TypeScale({ title, rows }: { title: string; rows: readonly (readonly string[])[] }) {
  return <div className="type-scale"><h4>{title}</h4>{rows.map(([name, face, size, lineHeight, sample, kind]) => <div className="type-row" key={name}><b>{name}</b><span>{face}</span><span>{size}</span><span>{lineHeight}</span><strong className={`sample-${kind}`}>{sample}</strong></div>)}</div>;
}

function ColorSwatch({ name, hex, color }: { name: string; hex: string; color: string }) {
  return <article className="color-swatch"><i style={{ background: color }} /><strong>{name}</strong><span>{hex}</span></article>;
}

function GridSpec({ type, columns, gutter, margin, columnWidth, contentArea }: { type: "desktop" | "mobile"; columns: number; gutter: string; margin: string; columnWidth: string; contentArea: string }) {
  const viewport = type === "desktop" ? "1200px" : "390px";
  return <article className={`grid-spec-card ${type}`}>
    <h4>{type === "desktop" ? "Desktop - 1200px" : "Mobile - 390px"}</h4>
    <div className={`grid-bars ${type}`} aria-label={`${columns}컬럼 그리드`}>{Array.from({ length: columns }).map((_, index) => <i key={index} />)}</div>
    <div className="grid-specs">{[["Viewport", viewport], ["Columns", String(columns)], ["Gutter", gutter], ["Margin", margin], ["Column Width", columnWidth], ["Content Area", contentArea]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
  </article>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p className="section-description">{description}</p></>;
}

export function AxionCaseStudy() {
  return <div className="axion-case-study-root">
    <section className="detail-section container"><Reveal>
      <SectionHeading eyebrow="Background Overview" title="프로젝트 기획배경 & 핵심목표" description="서비스 기획부터 개발까지 연결되는 AX 프로세스를 설계하기 위해 프로젝트를 기획했습니다" />
      <div className="detail-cards detail-cards-plain"><article><h3>AX 프로젝트 기획배경</h3><ul><li>PDF만으로 기획력과 디자인 실행력을 증명하기 어려움</li><li>다수의 고객사 프로젝트를 빠르게 탐색할 수 있는 사이트 구조 필요</li><li>AI 기술의 발전에 따른 Product Design 업무 환경의 변화</li><li>실무 프로덕트에 적용 가능한 AI 협업 프로세스 구축 목표</li></ul></article><article><h3>프로젝트 핵심 목표</h3><ul><li>AX 기반 Product Design Workflow 구축</li><li>서비스 기획 → 디자인 → 개발 End-to-End 프로세스 설계</li><li>Claude, Figma MCP, Codex 기반 AI 협업 검증</li><li>AI 협업을 통한 Product Design 생산성 향상</li></ul></article></div>
    </Reveal></section>

    <section className="detail-section container"><Reveal>
      <SectionHeading eyebrow="AI Agent Flow" title="AI Agent 구조" description="각 AI 도구의 역할을 분리하고 산출물을 연결해 기획, 디자인, 개발의 일관성을 유지했습니다" />
      <h3 className="detail-subtitle">AI Agent 구조별 역할</h3>
      <div className="agent-grid">{agents.map(([type, title, bullets]) => <article key={title}><span>{type}</span><h3>{title}</h3><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div>
      <h3 className="detail-subtitle development-title">개발 환경 및 버전 관리</h3>
      <div className="development-grid"><article><span>개발 스택</span><h3>AI Development Stack</h3><ul><li>TypeScript</li><li>React</li><li>Next.js</li><li>Tailwind CSS</li></ul></article><article><span>버전 관리</span><h3>Git / GitHub</h3><ul><li>브랜치 · 커밋 · 소스 코드 버전 관리</li><li>Pull Request 기반 코드 리뷰 및 변경 이력 관리</li><li>GitHub Actions 기반 빌드 · 테스트 자동화</li><li>버전 태그 · 릴리스 단위 배포 이력 관리</li></ul></article></div>
    </Reveal></section>

    <section className="detail-section container"><Reveal>
      <SectionHeading eyebrow="AX Product Harness" title="AI Harness 구축" description="프로젝트 데이터, 디자인 규칙, 구현과 검증 기준을 하나의 실행 체계로 연결해 반복 가능한 제작 환경을 구축했습니다" />
      <AxionWorkflow /><p className="feedback-loop">검증 결과를 프로젝트 데이터와 디자인 규칙에 재반영</p>
    </Reveal></section>

    <section className="detail-section container"><Reveal>
      <SectionHeading eyebrow="Structure" title="정보구조도(I.A)" description="AXION 포트폴리오 웹사이트의 페이지 구조와 프로젝트 탐색 체계를 정의한 정보구조도(I.A)입니다" />
      <div className="axion-ia-wrap"><table className="axion-ia"><thead><tr><th>1 Depth</th><th>2 Depth</th><th>3 Depth (콘텐츠)</th></tr></thead><tbody>{iaGroups.map(([depth, rows]) => rows.map(([second, content], index) => <tr key={`${depth}-${second}`}>{index === 0 && <th rowSpan={rows.length} scope="rowgroup">{depth}</th>}<td>{second}</td><td>{content}</td></tr>))}</tbody></table></div>
    </Reveal></section>

    <section className="detail-section container axion-screens"><Reveal>
      <SectionHeading eyebrow="Design" title="주요화면" description="반응형 구조를 기반으로 채용담당자의 빠른 탐색과 실무진의 깊은 검토를 함께 지원하는 UX 경험을 설계했습니다" />
      <h3 className="detail-subtitle">WEB Design</h3>
      <div className="axion-screen-grid"><ScreenPreview title="Portfolio Home (Light Mode)" description="핵심 포지셔닝과 대표 프로젝트, 전환 동선을 한 흐름으로 연결한 메인 화면" parts={previewSets.homeLight}/><ScreenPreview title="Portfolio Home (Dark Mode)" description="핵심 포지셔닝과 대표 프로젝트, 전환 동선을 한 흐름으로 연결한 메인 화면" parts={previewSets.homeDark} dark/><ScreenPreview title="Project Discovery (Light Mode)" description="필터와 카드 구조를 통해 프로젝트 유형과 역할을 빠르게 탐색하는 화면" parts={previewSets.projectsLight}/><ScreenPreview title="Project Discovery (Dark Mode)" description="필터와 카드 구조를 통해 프로젝트 유형과 역할을 빠르게 탐색하는 화면" parts={previewSets.projectsDark} dark/></div>
    </Reveal></section>

    <section className="detail-section container axion-system"><div>
      <SectionHeading eyebrow="Design System" title="디자인시스템" description="AXION 플랫폼의 브랜드 일관성과 사용자 경험 향상을 위한 디자인 가이드라인입니다" />
      <div className="system-block"><h3>로고</h3><p>AXION의 브랜드 일관성을 위해 워드마크의 형태, 컬러, 최소 여백과 사용 기준을 정의한 로고 시스템입니다</p><div className="logo-system"><div><Image src="/assets/ui/logo-light.png" alt="AXION 공식 컬러 로고" width={210} height={49} style={{ width: 210, height: 49 }}/></div><div><Image src="/assets/detail/axion/logo-light.png" alt="AXION 흰색 로고" width={210} height={49} style={{ width: 210, height: 49 }}/></div><div><Image src="/assets/detail/axion/logo-light.png" alt="AXION 흰색 로고 검정 배경" width={210} height={49} style={{ width: 210, height: 49 }}/></div></div><article className="system-note"><h4>Logo Concept</h4><p>교차하는 사선은 실행과 확장을 상징하며, 네이비(02002C) / 그레이(AEB2BA)는 AXION의 기술적 신뢰를 표현합니다</p></article></div>
      <div className="system-block"><h3>타이포그래피</h3><p>한국어 가독성을 우선해 Pretendard를 사용하며, 콘텐츠 역할에 따라 명확한 위계를 구성했습니다</p><div className="type-hero"><strong>Aa</strong><div><b>Pretendard</b><span>Bold / SemiBold / Medium / Regular</span><span>가나다라마바사아자차카타파하</span><span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><span>0123456789 (!@#$%^&amp;*)</span></div></div><TypeScale title="Typography Scale · Desktop" rows={desktopType}/><TypeScale title="Typography Scale · Mobile" rows={mobileType}/></div>
      <div className="system-block"><h3>그리드</h3><p>데스크톱과 모바일 환경에서 콘텐츠 영역과 반응형 그리드 규칙을 일관되게 적용합니다</p><div className="grid-samples"><GridSpec type="desktop" columns={12} gutter="24px" margin="72px" columnWidth="66px" contentArea="1056px"/><GridSpec type="mobile" columns={4} gutter="16px" margin="24px" columnWidth="73.5px" contentArea="342px"/></div></div>
      <div className="system-block"><h3>컬러</h3><p>AXION의 브랜드 일관성과 정보 위계를 위한 의미 기반 컬러 시스템입니다</p><h4>Brand &amp; Accent</h4><div className="color-grid brand"><ColorSwatch name="brand/navy" hex="#02002C" color="#02002c"/><ColorSwatch name="brand/slate" hex="#1E293B" color="#1e293b"/><ColorSwatch name="brand/gray" hex="#AEB2BA" color="#aeb2ba"/><ColorSwatch name="accent/focus" hex="#3C3CFA" color="#3c3cfa"/></div><h4>Neutrals</h4><div className="color-grid neutrals"><ColorSwatch name="neutral/white" hex="#FFFFFF" color="#ffffff"/><ColorSwatch name="neutral/50" hex="#F8F8F8" color="#f8f8f8"/><ColorSwatch name="neutral/100" hex="#F9FAFB" color="#f9fafb"/><ColorSwatch name="neutral/200" hex="#E5E7EB" color="#e5e7eb"/><ColorSwatch name="neutral/600" hex="#666666" color="#666666"/><ColorSwatch name="neutral/ink" hex="#030712" color="#030712"/></div></div>
    </div></section>
  </div>;
}
