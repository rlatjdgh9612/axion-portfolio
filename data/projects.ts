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
    summary: "AX Product Design & Development를 구축한 개인 프로젝트입니다",
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
    summary: "위치 기반 안전 모니터링 '봐줌' 플랫폼을 운영하는 기업입니다",
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
    summary: "가상자산 자동매매 'ORBIS' 플랫폼을 운영하는 블록체인 기업입니다",
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
    subtitle: "WEB Dashboard Design & UX Planning",
    summary: "가상자산 트레이딩 '수익온' 플랫폼을 운영하는 블록체인 기업입니다",
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
    title: "인베스트위드(주)",
    subtitle: "WEB & Mobile Design",
    summary: "대체 투자 기회를 전문가와 함께 연결하는 투자 플랫폼 기업입니다",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B/B2C", "UX/UI 기획 & 디자인", "WEB"],
    period: "2025",
    role: "UX/UI Design",
    accent: "#111111",
    device: "responsive",
    image: "/assets/projects/investwith-card.png",
  },
  {
    slug: "korea-search-fund",
    title: "한국서치펀드",
    subtitle: "WEB & Mobile Design",
    summary: "기업 승계와 지속 가능한 성장을 연결하는 M&A 서치펀드 기업입니다",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B", "UX/UI 기획 & 디자인", "WEB"],
    period: "2025",
    role: "Service Planning · UX/UI Design",
    accent: "#0b3a73",
    device: "responsive",
    image: "/assets/projects/korea-search-fund-card.png",
  },
  {
    slug: "humblemong",
    title: "험블몽",
    subtitle: "WEB & Mobile Design",
    summary: "브랜드와 사용자 경험을 연결하는 디지털 서비스 에이전시 기업입니다",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B", "UX/UI 디자인", "WEB"],
    period: "2025.02 ~ 2025.11",
    role: "UX/UI Design",
    accent: "#d94f55",
    device: "responsive",
    image: "/assets/projects/humblemong-card.png",
  },
  {
    slug: "prior",
    title: "세무법인 프라이어",
    subtitle: "WEB Dashboard Design",
    summary: "세무 전문성과 IT 기술을 결합한 TaxTech 세무 법인 기업입니다",
    category: "client",
    categoryLabel: "외주 프로젝트",
    tags: ["B2B", "UXUI 디자인", "WEB Dashboard"],
    period: "2024",
    role: "UX/UI Design",
    accent: "#3c3cfa",
    device: "desktop",
    image: "/assets/projects/prior-card.png",
  },
  {
    slug: "moneyguard",
    title: "머니가드서비스(주)",
    subtitle: "WEB Design",
    summary: "채권 거래와 모바일 차용증을 결합한 핀테크 솔루션 기업입니다",
    category: "intern",
    categoryLabel: "인턴 프로젝트",
    tags: ["B2B", "UX/UI 디자인", "WEB"],
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
