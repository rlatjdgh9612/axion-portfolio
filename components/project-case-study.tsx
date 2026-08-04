import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui";
import {
  projectCaseStudies,
  type CaseStudyCard,
  type CaseStudySystem,
} from "@/data/project-case-studies";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="case-heading">
      <span className="case-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

function CardGrid({ cards }: { cards: CaseStudyCard[] }) {
  return (
    <div className="case-card-grid">
      {cards.map((card) => (
        <article className="case-card" key={`${card.label}-${card.title}`}>
          <span>{card.label}</span>
          <h3>{card.title}</h3>
          <ul>
            {card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function InformationArchitecture({
  description,
  rows,
}: {
  description: string;
  rows: { depth: string; section: string; content: string }[];
}) {
  return (
    <section className="case-section case-ia" data-case-section="ia">
      <Reveal>
        <SectionHeading eyebrow="Structure" title="정보구조도(I.A)" description={description} />
        <div className="case-ia-wrap">
          <table>
            <thead>
              <tr><th>1 Depth</th><th>2 Depth</th><th>3 Depth (콘텐츠)</th></tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.depth}-${row.section}-${index}`}>
                  <th scope="row">{row.depth}</th>
                  <td>{row.section}</td>
                  <td>{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

type ScreenGroup = { title: string; description: string; indices: number[]; feature?: number[] };

const screenGroups: Record<string, ScreenGroup[]> = {
  vazoom: [
    { title: "UX 핵심 화면 설계", description: "온보딩과 핵심 안전 기능의 흐름을 화면 단위로 구체화했습니다.", indices: [1, 3, 5, 8, 9, 11] },
    { title: "핵심기획 결과", description: "지도, 긴급 도움요청, 설정과 관리 화면까지 전체 사용 흐름을 연결했습니다.", indices: [2, 4, 6, 7, 10, 12] },
  ],
  investhive: [
    { title: "Cryptocurrency Trading Platform UI Design", description: "거래와 자동매매 업무를 중심으로 핵심 화면을 구성했습니다.", indices: [1, 2, 3, 4, 5, 6] },
    { title: "UX 개선 포인트", description: "핵심 거래 화면과 데이터 구조를 상세 검토했습니다.", indices: [7, 8], feature: [8] },
  ],
  jcompany: [
    { title: "Admin Dashboard & Management Design", description: "관리자 업무별 대시보드와 데이터 화면을 설계했습니다.", indices: [1, 2, 3, 4, 5, 6] },
    { title: "UX 개선 포인트", description: "관리자 관리 화면을 중심으로 정보 탐색과 작업 흐름을 개선했습니다.", indices: [7, 8], feature: [7] },
  ],
  investwith: [
    { title: "WEB Design", description: "대체투자 정보와 서비스 가치를 데스크톱 화면으로 설계했습니다.", indices: [1, 2, 3, 4, 5, 6, 7] },
    { title: "Mobile Web Design", description: "동일한 정보 구조를 모바일 탐색 흐름에 맞게 재구성했습니다.", indices: [8, 9, 10, 11, 12] },
  ],
  "korea-search-fund": [
    { title: "WEB Design", description: "기업 승계와 M&A 정보를 신뢰감 있는 웹 경험으로 구성했습니다.", indices: [1, 2, 3, 4, 5, 6, 7, 8] },
    { title: "Mobile Web Design", description: "핵심 콘텐츠와 문의 흐름을 모바일 환경에 최적화했습니다.", indices: [9, 10, 11, 12] },
  ],
  humblemong: [
    { title: "WEB Design", description: "에이전시의 브랜드와 프로젝트 성과를 중심으로 웹 화면을 구성했습니다.", indices: [1, 2, 3, 4, 5] },
    { title: "Tablet Web Design", description: "중간 화면에서도 프로젝트 탐색 맥락이 유지되도록 설계했습니다.", indices: [6, 7] },
    { title: "Mobile Web Design", description: "콘텐츠 위계와 전환 흐름을 모바일 화면에 맞게 재구성했습니다.", indices: [8, 9, 10, 11, 12] },
  ],
  prior: [
    { title: "WEB Dashboard View Design", description: "세무 업무의 목록, 상태, 상세 확인 화면을 설계했습니다.", indices: [1, 2, 3, 4, 5, 6] },
    { title: "서비스 개선 전후 비교", description: "핵심 업무 화면의 정보 구조와 사용 흐름을 비교했습니다.", indices: [7, 8] },
  ],
  moneyguard: [
    { title: "WEB View Design", description: "서비스 소개부터 제휴 문의까지 이어지는 반응형 웹 화면입니다.", indices: [1, 2, 3, 4, 5, 6] },
    { title: "서비스 개선 전후 비교", description: "핵심 가치 전달과 전환 흐름을 개선 전후로 비교했습니다.", indices: [7, 8] },
  ],
};

function ScreenGallery({
  slug,
  title,
  description,
  count,
}: {
  slug: string;
  title: string;
  description: string;
  count: number;
}) {
  const groups = screenGroups[slug] ?? [{ title, description, indices: Array.from({ length: count }, (_, index) => index + 1) }];

  return (
    <section className="case-section case-screens" data-case-section="screens">
      <Reveal>
        <SectionHeading eyebrow="Design" title={title} description={description} />
        <div className="case-screen-groups">
          {groups.map((group) => (
            <section className="case-screen-group" key={group.title}>
              <header><h3>{group.title}</h3><p>{group.description}</p></header>
              <div className="case-screen-grid">
                {group.indices.map((index) => {
                  const number = String(index).padStart(2, "0");
                  const isFeature = group.feature?.includes(index) ?? false;
                  return (
                    <figure className={`case-screen-card${isFeature ? " case-screen-card-feature" : ""}`} key={number}>
                      <Image
                        src={`/assets/detail/case-studies/ui/${slug}/screen-${number}.png`}
                        alt={`${group.title} ${index}`}
                        width={1600}
                        height={1200}
                        sizes={isFeature ? "(max-width: 767px) calc(100vw - 80px), 1056px" : "(max-width: 767px) calc(100vw - 80px), (max-width: 1199px) 44vw, 504px"}
                      />
                    </figure>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Comparison({ before, after }: { before: string[]; after: string[] }) {
  return (
    <section className="case-section case-comparison" data-case-section="comparison">
      <Reveal>
        <SectionHeading
          eyebrow="Comparison"
          title="서비스 개선 전후 비교"
          description="기존 서비스의 문제를 핵심 사용 흐름 중심으로 재구성해 정보 이해도와 전환 효율을 높였습니다."
        />
        <div className="case-comparison-grid">
          <article>
            <span className="case-state case-state-before">Before</span>
            <h3>개선 전</h3>
            <ul>{before.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <span className="case-state case-state-after">After</span>
            <h3>개선 후</h3>
            <ul>{after.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

const designSystemLogos: Record<string, string> = {
  investwith: "/assets/figma-home/partners/investwith.png",
  "korea-search-fund": "/assets/figma-home/partners/korea-search-fund.png",
  humblemong: "/assets/figma-home/partners/humblemong.png",
  prior: "/assets/figma-home/partners/finmate.png",
  moneyguard: "/assets/figma-home/partners/moneyguard.png",
};

function DesignSystem({ system, title, slug }: { system: CaseStudySystem; title: string; slug: string }) {
  const logo = designSystemLogos[slug];

  return (
    <section className="case-section case-design-system" data-case-section="design-system">
      <Reveal>
        <SectionHeading eyebrow="Design System" title="디자인시스템" description={system.description} />

        <div className="case-system-block case-logo-concept">
          <div className="case-system-label">
            <span>Logo</span>
            <h3>로고 컨셉</h3>
          </div>
          <div className="case-logo-wordmark" aria-label={`${title} 로고 컨셉`} data-dark-logo={slug === "moneyguard"}>
            {logo ? (
              <Image src={logo} alt={`${title} 로고`} width={420} height={160} sizes="420px" />
            ) : title}
          </div>
          <p>{system.logoConcept}</p>
        </div>

        <div className="case-system-block">
          <div className="case-system-label">
            <span>Typography</span>
            <h3>타이포그래피</h3>
          </div>
          <div className="case-type-layout">
            <strong>Aa</strong>
            <div>
              <h4>{system.fonts.join(" · ")}</h4>
              <p>가나다라마바사아자차카타파하</p>
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>0123456789 (!@#$%^&amp;*)</p>
            </div>
          </div>
          <div className="case-type-scale">
              {system.typeScale.map((scale, index) => {
                const parts = scale.split(" | ");
                const sample = parts.length > 1 ? parts[parts.length - 1] : "일관된 정보 위계를 위한 텍스트 스타일";
                const label = parts.length > 1 ? parts.slice(0, -1).join(" · ") : scale;
                return (
                  <div key={scale}><b>{label}</b><span style={{ fontSize: `${Math.max(14, 28 - index * 3)}px` }}>{sample}</span></div>
                );
              })}
          </div>
        </div>

        <div className="case-system-block">
          <div className="case-system-label">
            <span>Grid</span>
            <h3>그리드</h3>
          </div>
          <div className="case-grid-visual" aria-hidden="true">
            {Array.from({ length: system.grid.columns }, (_, index) => <i key={index} />)}
          </div>
          <dl className="case-grid-spec">
            <div><dt>Viewport</dt><dd>{system.grid.viewport}</dd></div>
            <div><dt>Columns</dt><dd>{system.grid.columns}</dd></div>
            <div><dt>Gutter</dt><dd>{system.grid.gutter}</dd></div>
            <div><dt>Margin</dt><dd>{system.grid.margin}</dd></div>
            <div><dt>Content Area</dt><dd>{system.grid.content}</dd></div>
          </dl>
        </div>

        <div className="case-system-block">
          <div className="case-system-label">
            <span>Color</span>
            <h3>컬러</h3>
          </div>
          <div className="case-color-grid">
            {system.colors.map((color) => (
              <article key={`${color.name}-${color.hex}`}>
                <i style={{ backgroundColor: color.hex }} />
                <b>{color.name}</b>
                <span>{color.hex}</span>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ProjectCaseStudy({ slug, title }: { slug: string; title: string }) {
  const study = projectCaseStudies[slug];
  if (!study) return null;

  const onAccent = ["#e5cc00", "#ff6a00"].includes(study.accent.toLowerCase()) ? "#030712" : "#ffffff";

  return (
    <div
      className="project-case-study-root"
      aria-label={`${title} 프로젝트 사례 연구`}
      style={{ "--case-accent": study.accent, "--case-on-accent": onAccent } as CSSProperties}
    >
      <section className="case-section" data-case-section="overview">
        <Reveal>
          <SectionHeading {...study.overview} />
          <CardGrid cards={study.overview.cards} />
        </Reveal>
      </section>

      <section className="case-section case-alt" data-case-section="direction">
        <Reveal>
          <SectionHeading {...study.direction} />
          <CardGrid cards={study.direction.cards} />
        </Reveal>
      </section>

      <InformationArchitecture {...study.ia} />
      <ScreenGallery slug={slug} {...study.screens} />

      {study.improvements && (
        <section className="case-section case-alt" data-case-section="improvements">
          <Reveal>
            <SectionHeading eyebrow="UX Improvement Point" title={study.improvements.title} description={study.improvements.description} />
            <CardGrid cards={study.improvements.cards} />
          </Reveal>
        </section>
      )}

      {study.comparison && <Comparison {...study.comparison} />}
      {study.system && <DesignSystem system={study.system} title={title} slug={slug} />}
    </div>
  );
}
