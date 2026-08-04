const implementationFiles = [
  "app/projects/detail/[slug]/page.tsx",
  "components/project-case-study.tsx",
  "data/project-case-studies.ts",
  "app/globals.css",
];

export const projectDetailVisualCases = [
  ["vazoom", "지티엑스(주)", "09.Project_Vazoom_Desktop", "822:18480", 16611, ["overview", "direction", "ia", "screens"]],
  ["investhive", "인베스트하이브", "10.Project_InvestHive_Desktop", "822:21276", 13733, ["overview", "direction", "ia", "screens", "improvements", "design-system"]],
  ["jcompany", "제이컴퍼니", "11.Project_JCompany_Desktop", "822:16240", 13483, ["overview", "direction", "ia", "screens", "improvements", "design-system"]],
  ["investwith", "인베스트위드(주)", "12.Project_Investwith_Desktop", "822:34842", 16126, ["overview", "direction", "ia", "screens", "comparison", "design-system"]],
  ["korea-search-fund", "한국서치펀드", "13.Project_KoreaSearchFund_Desktop", "822:32618", 16583, ["overview", "direction", "ia", "screens", "comparison", "design-system"]],
  ["humblemong", "험블몽", "14.Project_Humblemong_Desktop", "822:30679", 20706, ["overview", "direction", "ia", "screens", "comparison", "design-system"]],
  ["prior", "세무법인 프라이어", "15.Project_PRIOR_Desktop", "822:13532", 13111, ["overview", "direction", "ia", "screens", "comparison", "design-system"]],
  ["moneyguard", "머니가드서비스(주)", "16.Project_MoneyGuard_Desktop", "822:11919", 13078, ["overview", "direction", "ia", "screens", "comparison", "design-system"]],
].map(([slug, projectName, figmaFrameName, figmaNodeId, height, expectedSections]) => ({
  slug, projectName, figmaFrameName, figmaNodeId,
  figmaFileKey: "cF038LTfcgHGdUTvFp67li",
  url: `/projects/detail/${slug}`,
  viewport: { width: 1200, height: 900 },
  figmaFrame: { width: 1200, height },
  implementationFiles,
  baselinePath: `tests/visual/figma-baselines/${slug}.png`,
  expectedSections,
  status: "baseline-captured",
}));

export function selectVisualCases(slug) {
  if (!slug) return projectDetailVisualCases;
  const selected = projectDetailVisualCases.filter((item) => item.slug === slug);
  if (!selected.length) throw new Error(`등록되지 않은 프로젝트입니다: ${slug}`);
  return selected;
}
