export type ProjectCategory = "intern" | "client" | "company" | "personal";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  categoryLabel: string;
  tags: string[];
  period: string;
  role: string;
  accent: string;
  device: "mobile" | "desktop" | "responsive";
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "axion",
    title: "AXION",
    subtitle: "AI-Native Product Design",
    summary: "AXION은 AX Product Design & Development를 구축한 개인 프로젝트입니다.",
    category: "personal",
    categoryLabel: "개인 프로젝트",
    tags: ["AI/AX", "UX/UI 디자인", "WEB"],
    period: "2026.07 ~ 진행 중",
    role: "서비스 기획 · Product Design · AX Workflow",
    accent: "#02002c",
    device: "responsive",
    image: "/assets/projects/axion-card.png",
  },
  {
    slug: "vazoom",
    title: "지티엑스(주)",
    subtitle: "Service Enhancement & UX Renewal Planning",
    summary: "위치 기반 안전 모니터링 서비스 ‘봐줌’의 서비스 고도화와 UX 리뉴얼을 기획했습니다.",
    category: "company",
    categoryLabel: "회사 프로젝트",
    tags: ["B2C", "서비스 기획", "Mobile"],
    period: "2025.11 ~ 2026.06",
    role: "서비스 기획 · UX Renewal",
    accent: "#ff6a00",
    device: "mobile",
    image: "/assets/projects/vazoom-card.png",
  },
  {
    slug: "investhive",
    title: "인베스트하이브",
    subtitle: "WEB Dashboard Redesign",
    summary: "복잡한 투자 데이터를 빠르게 탐색하고 분석할 수 있도록 트레이딩 대시보드를 재설계했습니다.",
    category: "company",
    categoryLabel: "회사 프로젝트",
    tags: ["B2C", "UXUI 디자인", "Dashboard"],
    period: "2025",
    role: "UX/UI Design",
    accent: "#121826",
    device: "desktop",
    image: "/assets/projects/investhive-card.png",
  },
  {
    slug: "jcompany",
    title: "제이컴퍼니",
    subtitle: "Trading Platform Design",
    summary: "투자 수익 정보와 자동매매 흐름을 명확하게 이해할 수 있는 금융 서비스 경험을 설계했습니다.",
    category: "company",
    categoryLabel: "회사 프로젝트",
    tags: ["B2B", "서비스 기획 & 디자인", "Dashboard"],
    period: "2025",
    role: "UX/UI Design",
    accent: "#d82222",
    device: "desktop",
    image: "/assets/projects/jcompany-card.png",
  },
  {
    slug: "investwith",
    title: "인베스트위드",
    subtitle: "Investment Platform Renewal",
    summary: "대체투자 정보를 신뢰감 있게 전달하고 탐색 효율을 높인 투자 플랫폼 리뉴얼 프로젝트입니다.",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B", "금융", "WEB"],
    period: "2025",
    role: "UX/UI Design",
    accent: "#111111",
    device: "responsive",
    image: "/assets/projects/investwith-card.png",
  },
  {
    slug: "korea-search-fund",
    title: "한국서치펀드",
    subtitle: "Corporate Website Renewal",
    summary: "기업 승계와 성장의 가치를 신뢰감 있게 전달하도록 B2B 웹사이트 정보 구조와 화면을 개선했습니다.",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B", "M&A", "WEB"],
    period: "2025",
    role: "Service Planning · UX/UI Design",
    accent: "#0b3a73",
    device: "responsive",
    image: "/assets/projects/korea-search-fund-card.png",
  },
  {
    slug: "humblemong",
    title: "험블몽",
    subtitle: "Creative Agency Website",
    summary: "브랜드와 사용자 경험을 연결하는 크리에이티브 에이전시 웹사이트를 설계했습니다.",
    category: "company",
    categoryLabel: "회사 프로젝트",
    tags: ["Branding", "UX/UI 디자인", "WEB"],
    period: "2025.02 ~ 2025.11",
    role: "UX/UI Design",
    accent: "#d94f55",
    device: "responsive",
    image: "/assets/projects/humblemong-card.png",
  },
  {
    slug: "prior",
    title: "세무법인 프라이어",
    subtitle: "TaxTech Admin Dashboard",
    summary: "세무 업무 흐름과 고객 데이터를 효율적으로 관리하는 TaxTech 관리자 서비스를 설계했습니다.",
    category: "intern",
    categoryLabel: "인턴 프로젝트",
    tags: ["TaxTech", "Admin", "WEB"],
    period: "2024",
    role: "UX/UI Design",
    accent: "#3c3cfa",
    device: "desktop",
    image: "/assets/projects/prior-card.png",
  },
  {
    slug: "moneyguard",
    title: "머니가드서비스",
    subtitle: "Financial Safety Service",
    summary: "금융 거래와 자산 보호의 가치를 직관적으로 전달하는 서비스 경험을 설계했습니다.",
    category: "intern",
    categoryLabel: "인턴 프로젝트",
    tags: ["Fintech", "Safety", "Responsive"],
    period: "2024.10 ~ 2024.12",
    role: "UX/UI Design",
    accent: "#e3cc00",
    device: "responsive",
    image: "/assets/projects/moneyguard-card.png",
  },
];

export const categories = [
  { slug: "all", label: "전체" },
  { slug: "intern", label: "인턴 프로젝트" },
  { slug: "client", label: "외주 프로젝트" },
  { slug: "company", label: "회사 프로젝트" },
  { slug: "personal", label: "개인 프로젝트" },
] as const;

export const categoryTitle: Record<string, string> = {
  all: "전체 프로젝트",
  intern: "인턴 프로젝트",
  client: "외주 프로젝트",
  company: "회사 프로젝트",
  personal: "개인 프로젝트",
};
