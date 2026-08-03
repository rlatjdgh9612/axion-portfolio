import Image from "next/image";
import { Reveal } from "@/components/ui";

type CaseSection = {
  title: string;
  width: number;
  height: number;
};

const caseStudies: Record<string, CaseSection[]> = {
  axion: [
    { title: "프로젝트 기획배경과 핵심목표", width: 1200, height: 588 },
    { title: "AI Agent 구조", width: 1200, height: 1252 },
    { title: "AI Harness 구축", width: 1200, height: 1116 },
    { title: "정보구조도", width: 1200, height: 1082 },
    { title: "주요 화면", width: 1200, height: 3751 },
    { title: "디자인 시스템", width: 1200, height: 4586 },
  ],
  vazoom: [
    { title: "서비스 기획배경과 핵심과제", width: 1200, height: 857 },
    { title: "사용자 인터뷰", width: 1200, height: 2153 },
    { title: "요구사항과 개선 방향", width: 1200, height: 1092 },
    { title: "정보구조도", width: 1200, height: 2610 },
    { title: "서비스 고도화 및 UX 리뉴얼 기획", width: 1200, height: 7246 },
  ],
  investhive: [
    { title: "리디자인 배경과 문제 정의", width: 1200, height: 853 },
    { title: "리디자인 방향 정의", width: 1200, height: 846 },
    { title: "정보구조도", width: 1200, height: 1315 },
    { title: "주요 화면", width: 1200, height: 2387 },
    { title: "UX 개선 포인트", width: 1200, height: 2030 },
    { title: "디자인 시스템", width: 1200, height: 3649 },
  ],
  jcompany: [
    { title: "기획배경과 문제정의", width: 1200, height: 853 },
    { title: "기획방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 1315 },
    { title: "주요 화면", width: 1200, height: 2089 },
    { title: "UX 개선 포인트", width: 1200, height: 2120 },
    { title: "디자인 시스템", width: 1200, height: 3610 },
  ],
  investwith: [
    { title: "기획배경과 문제정의", width: 1200, height: 853 },
    { title: "기획방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 1244 },
    { title: "주요 화면", width: 1200, height: 4922 },
    { title: "개선 전후 비교", width: 1200, height: 1055 },
    { title: "디자인 시스템", width: 1200, height: 4556 },
  ],
  "korea-search-fund": [
    { title: "기획배경과 문제정의", width: 1200, height: 853 },
    { title: "기획방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 1190 },
    { title: "주요 화면", width: 1200, height: 5432 },
    { title: "개선 전후 비교", width: 1200, height: 1055 },
    { title: "디자인 시스템", width: 1200, height: 4557 },
  ],
  humblemong: [
    { title: "기획배경과 문제정의", width: 1200, height: 853 },
    { title: "기획방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 1082 },
    { title: "주요 화면", width: 1200, height: 8964 },
    { title: "개선 전후 비교", width: 1200, height: 1055 },
    { title: "디자인 시스템", width: 1200, height: 5256 },
  ],
  prior: [
    { title: "디자인 배경과 문제 정의", width: 1200, height: 853 },
    { title: "디자인 방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 2141 },
    { title: "주요 화면", width: 1200, height: 1967 },
    { title: "개선 전후 비교", width: 1200, height: 1055 },
    { title: "디자인 시스템", width: 1200, height: 3599 },
  ],
  moneyguard: [
    { title: "기획배경과 문제정의", width: 1200, height: 855 },
    { title: "기획방향 정의", width: 1200, height: 843 },
    { title: "정보구조도", width: 1200, height: 1370 },
    { title: "주요 화면", width: 1200, height: 2697 },
    { title: "개선 전후 비교", width: 1200, height: 1055 },
    { title: "디자인 시스템", width: 1200, height: 3605 },
  ],
};

export function ProjectCaseStudy({ slug, title }: { slug: string; title: string }) {
  const sections = caseStudies[slug];
  if (!sections) return null;

  return (
    <div className="figma-case-study" aria-label={`${title} 프로젝트 사례 연구`}>
      {sections.map((section, index) => (
        <section
          className="figma-case-section"
          key={section.title}
          aria-labelledby={`${slug}-section-${index + 1}`}
        >
          <h2 className="sr-only" id={`${slug}-section-${index + 1}`}>{section.title}</h2>
          <Reveal>
            <Image
              src={`/assets/detail/case-studies/${slug}/section-${index + 1}.png`}
              alt={`${title} ${section.title}`}
              width={section.width}
              height={section.height}
              sizes="(max-width: 1199px) 100vw, 1200px"
            />
          </Reveal>
        </section>
      ))}
    </div>
  );
}
