export type CaseStudyCard = { label: string; title: string; bullets: string[] };
export type CaseStudyRow = { depth: string; section: string; content: string };
export type CaseStudySystem = {
  description: string;
  logoConcept: string;
  fonts: string[];
  typeScale: string[];
  grid: { viewport: string; columns: number; gutter: string; margin: string; content: string };
  colors: { name: string; hex: string }[];
};
export type ProjectCaseStudyData = {
  accent: string;
  overview: { eyebrow: string; title: string; description: string; cards: CaseStudyCard[] };
  direction: { eyebrow: string; title: string; description: string; cards: CaseStudyCard[] };
  ia: { description: string; rows: CaseStudyRow[] };
  screens: { title: string; description: string; count: number };
  improvements?: { title: string; description: string; cards: CaseStudyCard[] };
  comparison?: { before: string[]; after: string[] };
  system?: CaseStudySystem;
};

const commonCards = (items: [string, string, string[]][]): CaseStudyCard[] =>
  items.map(([label, title, bullets]) => ({ label, title, bullets }));

export const projectCaseStudies: Record<string, ProjectCaseStudyData> = {
  vazoom: {
    accent: "#ff6a00",
    overview: {
      eyebrow: "Background Overview",
      title: "서비스 기획배경 & 핵심과제",
      description: "봐줌 앱의 사용성 문제를 기반으로 서비스 고도화와 UX 리뉴얼의 기획 범위를 정의했습니다.",
      cards: commonCards([
        ["서비스 기획 배경", "기능 누적으로 복잡해진 서비스", ["기존 앱 UI 복잡도로 인한 사용성 저하", "사용자 피드백 기반 UX 개선 필요", "기능 추가로 누적된 구조적 복잡도", "고도화와 리뉴얼의 병행 필요"]],
        ["핵심 과제", "근본적인 사용성 개선", ["핵심 기능 중심으로 UI 구조 개선", "신규 사용자 온보딩 설계", "튜토리얼로 서비스 학습 비용 최소화", "서비스 구조와 탐색 체계 재정의"]],
      ]),
    },
    direction: {
      eyebrow: "Pain Point",
      title: "UX 핵심 문제점 분석",
      description: "사용자 피드백과 고객사 인터뷰를 통해 핵심 사용성 문제와 개선 방향을 구체화했습니다.",
      cards: commonCards([
        ["Pain Point 01", "메인 화면 기능 계층 미흡", ["핵심 버튼의 역할과 우선순위 혼재", "아이콘만으로 기능 동작을 예측하기 어려움"]],
        ["Pain Point 02", "신규 사용자 온보딩 부재", ["첫 진입 시 핵심 기능 안내 없음", "기능을 스스로 탐색해야 해 초기 이탈 발생"]],
        ["Pain Point 03", "긴급 도움요청 플로우 복잡", ["팝업·타이머·히스토리 전환 과다", "긴급 상황에서 다단계 확인이 즉각 대응 저해"]],
        ["Pain Point 04", "설정·고객센터 구조 복잡", ["설정과 콘텐츠가 한 화면에 혼재", "그룹핑과 정보 위계가 불명확"]],
      ]),
    },
    ia: {
      description: "봐줌 서비스 고도화 및 리뉴얼에 따른 전체 메뉴 구조와 콘텐츠 계층을 정의했습니다.",
      rows: [
        { depth: "온보딩", section: "튜토리얼", content: "사용자 유형 선택, 골든타임·이동시간·안전확인·연락처 설정, 기능 체험" },
        { depth: "홈", section: "지도 화면", content: "현재 위치, 반경 설정, 주변 공공시설과 동네상점 정보" },
        { depth: "홈", section: "보호모드", content: "타이머·심박수 보호모드 설정과 실행, 상황 해제" },
        { depth: "홈", section: "도움요청", content: "주변 사용자 탐색, 긴급 채팅 참여, 상황 종료" },
        { depth: "더보기", section: "설정·관리", content: "프로필, 알림, 골든타임 내역, 고객센터, 결제, 찜 목록" },
        { depth: "긴급상황", section: "보호자·주변인", content: "응급 발생, 안전확인, 위급 알림, 긴급 채팅" },
      ],
    },
    screens: { title: "핵심기획 결과", description: "고객사 요구와 사용자 불편을 바탕으로 온보딩, 메인, 공공시설, 골든타임, 설정 구조를 실제 화면으로 구체화했습니다.", count: 12 },
    improvements: {
      title: "서비스 고도화 및 UX 리뉴얼",
      description: "기능별 개선안을 하나의 탐색 체계로 연결했습니다.",
      cards: commonCards([
        ["Key Plan 01", "메인 화면 UX 리뉴얼", ["핵심 기능 중심 화면 재편", "사용 빈도 기반 우선순위 재배치"]],
        ["Key Plan 02", "하단 내비게이션 도입", ["메인 복귀 없이 기능 간 직접 전환", "핵심 기능 즉시 접근"]],
        ["Key Plan 03", "공공시설 데이터 연동", ["소방서·병원·경찰서 위치 제공", "지도 내 정보와 경로 안내"]],
        ["Key Plan 04", "골든타임 접근성 강화", ["실행 단계 최소화", "도움요청과 유사 기능의 혼동 해소"]],
        ["Key Plan 05", "신규 사용자 온보딩", ["단계별 기능 안내", "시뮬레이션 체험으로 학습 비용 최소화"]],
        ["Key Plan 06", "탐색·설정 구조 개선", ["콘텐츠 분류와 그룹핑 최적화", "정보 도달 경로 단축"]],
      ]),
    },
  },
  investhive: {
    accent: "#00c080",
    overview: {
      eyebrow: "Background Overview",
      title: "리디자인 배경 & 문제정의",
      description: "ORBIS 암호화폐 거래 대시보드의 UX 문제를 분석하고 리디자인의 방향성과 핵심 과제를 정의했습니다.",
      cards: commonCards([
        ["문제 정의", "정보 과밀과 낮은 가독성", ["거래 화면의 정보 과밀로 인지 과부하", "다크 모드 미지원으로 장시간 사용 시 피로", "차트·호가·주문 영역의 시각적 계층 부재"]],
        ["핵심 과제", "트레이딩 전용 UI 체계", ["다크 테마 기반 UI 구축", "실시간 데이터 타이포·컬러 최적화", "자동매매 봇 모니터링 UX 개선"]],
        ["프로젝트 목표", "데이터 중심 대시보드", ["매수·매도 상태 컬러 코딩", "수익률·호가 데이터 실시간 시각화", "정보 밀도는 유지하며 인지 부하 감소"]],
        ["클라이언트 요구", "원스톱 거래 경험", ["차트와 호가창을 한 화면에 구성", "봇 생성·관리·수익률 확인 플로우", "API Key 등록 과정 간소화"]],
      ]),
    },
    direction: {
      eyebrow: "Direction",
      title: "리디자인 방향 정의",
      description: "주요 화면별 전략 키워드를 도출하고 개선 원칙을 설정했습니다.",
      cards: commonCards([
        ["자동매매 대시보드", "실시간 데이터 가시성", ["다크 테마 고대비 데이터 계층", "핵심 지표 우선순위 재배치"]],
        ["거래 화면·포트폴리오", "인지 부하 최소화", ["그리드 기반 정보 밀도 최적화", "단계적 정보 공개 패턴"]],
        ["API Key·설정", "신뢰 기반 트레이딩 UX", ["단계별 가이드 플로우", "명확한 상태·결과 피드백"]],
        ["전체 화면", "모듈형 컴포넌트", ["카드·위젯 단위 재사용", "유연한 반응형 그리드 체계"]],
      ]),
    },
    ia: { description: "ORBIS 거래 플랫폼의 전체 메뉴와 기능 계층을 정의했습니다.", rows: [
      { depth: "접근", section: "비로그인·로그인", content: "서비스 이용 제한, 거래소 연동 안내" },
      { depth: "거래소", section: "API Key", content: "거래소 선택, API·Secret·UID 등록, 연결 상태" },
      { depth: "거래", section: "메인 거래화면", content: "차트, 가격, 호가, 시장가·지정가 주문" },
      { depth: "자동매매", section: "봇 생성·관리", content: "전략·레버리지 설정, 상태와 로그 모니터링" },
      { depth: "성과", section: "수익률·자산", content: "누적·월간 수익률, USDT 잔고와 자산 변동" },
      { depth: "서비스", section: "소개·공지", content: "플랫폼 소개, 리워드, 공지, 종목 목록" },
    ] },
    screens: { title: "주요화면", description: "실시간 차트, 호가창, 주문 패널과 자동매매 봇 상태를 한 화면에 통합한 트레이딩 UI입니다.", count: 8 },
    improvements: { title: "UX 개선 포인트", description: "전문 트레이더의 사용 패턴을 기준으로 데이터 인지와 조작 정확도를 높였습니다.", cards: commonCards([
      ["01", "다크 테마 기반 설계", ["장시간 모니터링 피로 감소", "실시간 데이터 시인성 향상"]], ["02", "정보 계층 구조 개선", ["영역별 모듈 분리", "시선 이동과 인지 부하 감소"]], ["03", "실시간 데이터 가독성", ["매수·매도 컬러 코딩", "숫자 데이터 자간·웨이트 최적화"]], ["04", "봇 상태 시각화", ["상태 컬러 인디케이터", "실시간 로그 모니터링"]], ["05", "모듈형 패널", ["독립 위젯 구성", "다양한 거래 스타일 대응"]], ["06", "수익률 시각화", ["기간별 성과 비교", "개별 봇 분석 대시보드"]],
    ]) },
    system: { description: "ORBIS의 브랜드 일관성과 트레이딩 데이터 가독성을 위한 다크 테마 디자인 가이드입니다.", logoConcept: "ORBIS는 궤도와 순환을 의미하며 연속적인 자동매매 사이클을 상징합니다.", fonts: ["Pretendard"], typeScale: ["Display 32", "Heading 24", "Heading 18", "Body 14", "Caption 12"], grid: { viewport: "1920px", columns: 12, gutter: "10px", margin: "20px", content: "1880px" }, colors: [{name:"Red / Sell",hex:"#FF2E58"},{name:"Green / Buy",hex:"#00C080"},{name:"Cyan / Info",hex:"#00E0FF"},{name:"Purple / Accent",hex:"#8085FF"},{name:"Gray 900",hex:"#1A1D21"},{name:"Black / BG",hex:"#000000"}] },
  },
};

projectCaseStudies.jcompany = {
  accent: "#3866AA",
  overview: { eyebrow: "Background Overview", title: "기획배경 & 문제정의", description: "가상자산 트레이딩 플랫폼 수익온의 운영·사용자 관리 업무를 분석해 대시보드 기획 범위를 정의했습니다.", cards: commonCards([
    ["문제 정의", "운영 정보의 분산", ["운영 데이터가 화면별로 분산", "회원·거래·정산 현황 파악의 비효율"]], ["핵심 과제", "업무 중심 정보 구조", ["운영 지표와 상세 데이터 계층화", "반복 업무를 줄이는 관리 플로우"]], ["프로젝트 목표", "통합 운영 대시보드", ["핵심 지표의 즉시 확인", "회원·거래·수익 정보를 일관된 패턴으로 관리"]], ["클라이언트 요구", "확장 가능한 관리자 UI", ["권한별 메뉴와 기능 구분", "표·필터·차트 컴포넌트 표준화"]],
  ]) },
  direction: { eyebrow: "Strategy", title: "기획방향 정의", description: "관리자 업무 흐름을 기준으로 핵심 화면의 정보 구조와 상호작용 원칙을 수립했습니다.", cards: commonCards([
    ["사용자 관리", "핵심 상태 중심", ["회원 상태와 인증 정보 우선 노출", "필터·검색·일괄 처리 지원"]], ["수익 분석", "데이터 시각화", ["기간별 성과와 추세 비교", "핵심 지표 카드와 차트 구성"]], ["거래 관리", "작업 효율 강화", ["상태 기반 테이블 구조", "상세 정보의 맥락 유지"]], ["공통 UI", "컴포넌트 표준화", ["재사용 가능한 테이블·필터", "화면 간 일관된 피드백"]],
  ]) },
  ia: { description: "수익온 관리자 대시보드의 메뉴와 운영 기능 계층을 정의했습니다.", rows: [
    {depth:"대시보드",section:"운영 현황",content:"가입·활성 사용자, 거래·수익 핵심 지표"},{depth:"회원",section:"사용자 관리",content:"검색, 상태, 인증, 상세 정보"},{depth:"거래",section:"거래 관리",content:"거래 내역, 상태, 필터, 정산"},{depth:"성과",section:"수익 분석",content:"기간별 수익률, 전략별 성과, 차트"},{depth:"운영",section:"알림·설정",content:"공지, 권한, 관리자 설정"},
  ] },
  screens: { title: "주요화면", description: "관리자 계정과 회원, 거래, 수익 분석 업무를 일관된 대시보드 패턴으로 설계했습니다.", count: 8 },
  improvements: {
    title: "UX 개선 포인트",
    description: "운영자가 더 적은 이동으로 상태를 파악하고 작업을 완료하도록 개선했습니다.",
    cards: commonCards([
      ["01", "통합 필터", ["검색·기간·상태 조건 통합", "반복 조회 동선 단축"]],
      ["02", "상태 피드백", ["컬러 배지와 명확한 레이블", "처리 결과 즉시 확인"]],
      ["03", "정보 계층", ["요약과 상세 정보 분리", "핵심 지표 우선 노출"]],
      ["04", "재사용 패턴", ["테이블·모달·차트 표준화", "화면별 학습 비용 감소"]],
    ]),
  },
  system: { description:"수익온 관리자 서비스의 일관성과 확장성을 위한 디자인 가이드입니다.", logoConcept:"상승 흐름과 신뢰를 상징하는 수익온 워드마크와 관리 UI의 명확한 정보 위계를 결합했습니다.", fonts:["Pretendard"], typeScale:["Heading 1 / 32","Heading 2 / 24","Heading 3 / 20","Body / 14","Caption / 12"], grid:{viewport:"1920px",columns:12,gutter:"24px",margin:"80px",content:"1760px"}, colors:[{name:"Primary",hex:"#3866AA"},{name:"Blue",hex:"#5E8EF7"},{name:"Navy",hex:"#092451"},{name:"Gray 100",hex:"#F5F7FA"},{name:"Gray 600",hex:"#73777E"},{name:"Error",hex:"#F04444"}] },
};

const externalCases: Record<string, {
  accent: string;
  title: string;
  description: string;
  screens: number;
  system: CaseStudySystem;
}> = {
  investwith: { accent:"#00666d", title:"기획배경 & 문제정의", description:"대체투자 정보를 전문성과 신뢰를 유지하면서 쉽게 탐색하도록 웹·모바일 경험을 재구성했습니다.", screens:12, system:{description:"인베스트위드 브랜드와 반응형 서비스의 일관성을 위한 디자인 가이드입니다.",logoConcept:"투자 가치의 연결과 성장을 상징하는 IW 워드마크를 중심으로 전문성을 표현합니다.",fonts:["Pretendard"],typeScale:["Heading 1 / 48","Heading 2 / 40","Heading 3 / 32","Body / 16","Caption / 12"],grid:{viewport:"1920px",columns:12,gutter:"24px",margin:"160px",content:"1600px"},colors:[{name:"Deep Teal",hex:"#003F45"},{name:"Teal",hex:"#006B72"},{name:"Orange",hex:"#F05A28"},{name:"White",hex:"#FFFFFF"},{name:"Gray",hex:"#9CA3AF"},{name:"Black",hex:"#111111"}]} },
  "korea-search-fund": { accent:"#0b3a73", title:"기획배경 & 문제정의", description:"기업 승계와 M&A 서치펀드의 전문 정보를 신뢰감 있게 전달하는 웹·모바일 경험을 설계했습니다.", screens:12, system:{description:"한국서치펀드의 신뢰성과 전문성을 일관되게 전달하는 디자인 가이드입니다.",logoConcept:"기업 성장의 방향과 연결을 상징하는 워드마크와 블루 계열의 신뢰 이미지를 사용했습니다.",fonts:["Pretendard"],typeScale:["Heading 1 / 48","Heading 2 / 40","Heading 3 / 32","Body / 16","Caption / 12"],grid:{viewport:"1920px",columns:12,gutter:"24px",margin:"160px",content:"1600px"},colors:[{name:"Navy",hex:"#0B3A73"},{name:"Blue",hex:"#3B73D1"},{name:"Beige",hex:"#C7A47E"},{name:"White",hex:"#FFFFFF"},{name:"Gray",hex:"#9CA3AF"},{name:"Black",hex:"#111111"}]} },
  humblemong: { accent:"#111111", title:"기획배경 & 문제정의", description:"브랜드의 정제된 감각과 프로젝트 성과를 명확히 전달하도록 디지털 에이전시 사이트를 재구성했습니다.", screens:12, system:{description:"험블몽의 브랜드 일관성과 효율적인 서비스 구축을 위한 디자인 가이드입니다.",logoConcept:"대칭된 H 심볼은 브랜드와 사용자 경험의 연결을, 소문자 워드마크는 겸손하고 전문적인 태도를 표현합니다.",fonts:["Pretendard","Poppins"],typeScale:["Heading 1 / 62","Heading 2 / 40","Heading 3 / 30","Heading 4 / 24","Body / 16"],grid:{viewport:"1280px",columns:12,gutter:"24px",margin:"120px",content:"1040px"},colors:[{name:"Black Main",hex:"#000000"},{name:"Dark Slate",hex:"#1E293B"},{name:"Gray 300",hex:"#969696"},{name:"White",hex:"#FFFFFF"},{name:"Success",hex:"#34C759"},{name:"Warning",hex:"#FBBC05"}]} },
  prior: { accent:"#3c3cfa", title:"디자인 배경 & 문제정의", description:"종합소득세 업무를 빠르고 정확하게 처리하도록 FinMate 대시보드의 정보 구조와 업무 흐름을 개선했습니다.", screens:8, system:{description:"FinMate의 브랜드 일관성과 세무 업무 효율을 위한 디자인 가이드입니다.",logoConcept:"도트 패턴 F는 세무 데이터의 구조화를, 블루 포인트는 신뢰와 정확성을 전달합니다.",fonts:["Inter","Pretendard","SF Pro"],typeScale:["Heading 1 / 32","Heading 2 / 24","Heading 3 / 20","Heading 4 / 15","Body / 14"],grid:{viewport:"1920px",columns:12,gutter:"28px",margin:"28px",content:"1864px"},colors:[{name:"Indigo Main",hex:"#3C3CFA"},{name:"Indigo 700",hex:"#7832FA"},{name:"Indigo 900",hex:"#1E1E96"},{name:"Gray 100",hex:"#F0F0F5"},{name:"Success",hex:"#34C759"},{name:"Warning",hex:"#FDAC41"}]} },
  moneyguard: { accent:"#e5cc00", title:"기획 배경 & 문제정의", description:"B2B 파트너가 채권 거래와 차용증 서비스를 빠르게 이해하고 제휴 문의까지 이동하도록 경험을 설계했습니다.", screens:8, system:{description:"머니가드서비스의 브랜드 일관성과 효율적인 서비스 구축을 위한 디자인 가이드입니다.",logoConcept:"방패는 안전한 금융 거래와 자산 보호를, 원화 기호는 핵심 서비스 가치를 표현합니다.",fonts:["Pretendard"],typeScale:["Heading 1 / 48","Heading 2 / 40","Heading 3 / 32","Heading 4 / 24","Body / 16"],grid:{viewport:"1920px",columns:12,gutter:"24px",margin:"160px",content:"1600px"},colors:[{name:"Yellow Main",hex:"#FEE300"},{name:"Yellow Dark",hex:"#988800"},{name:"Gray 100",hex:"#F9F9F9"},{name:"Gray 700",hex:"#626262"},{name:"Success",hex:"#59C292"},{name:"Info",hex:"#447FFF"}]} },
};

for (const [slug, entry] of Object.entries(externalCases)) {
  const isPrior = slug === "prior";
  projectCaseStudies[slug] = {
    accent: entry.accent,
    overview: { eyebrow:"Background Overview", title:entry.title, description:entry.description, cards: commonCards([
      ["문제 정의","정보 탐색과 업무 효율 저하",["핵심 정보가 분산되어 이해와 판단이 어려움","기존 화면의 정보 위계와 탐색 동선이 불명확"]],
      ["프로젝트 목표","신뢰 기반의 명확한 경험",["핵심 가치를 빠르게 파악하는 구조","정보 탐색부터 전환까지 자연스러운 흐름"]],
      ["핵심 과제","일관된 정보 구조",["콘텐츠와 기능의 우선순위 재정의","데스크톱·모바일의 일관된 사용 경험"]],
      ["클라이언트 요구사항","확장 가능한 UI",["서비스 특성과 실적을 명확히 전달","재사용 가능한 컴포넌트 기반 설계"]],
    ]) },
    direction: { eyebrow:"Strategy", title:isPrior?"디자인 방향 정의":"기획방향 정의", description:"문제 정의를 기반으로 화면별 전략과 공통 설계 원칙을 수립했습니다.", cards: commonCards([
      ["메인·대시보드","핵심 가치 즉시 전달",["핵심 정보 우선 노출","명확한 시각적 계층"]],
      ["콘텐츠·상세","단계적 정보 공개",["요약과 상세 정보 분리","탐색 맥락 유지"]],
      ["전환·업무","자연스러운 행동 유도",["사용 흐름에 맞춘 CTA와 작업 순서","상태와 결과의 명확한 피드백"]],
      ["전체 화면","일관된 디자인 시스템",["재사용 가능한 컴포넌트","반응형 그리드와 접근성 고려"]],
    ]) },
    ia: { description:"서비스의 전체 페이지 구조와 콘텐츠 계층을 정의한 정보구조도입니다.", rows:[
      {depth:"홈",section:"상단 소개",content:"브랜드 메시지, 핵심 가치, 주요 CTA"},{depth:"홈",section:"서비스·프로젝트",content:"주요 기능과 사례, 성과 정보"},{depth:"상세",section:"콘텐츠",content:"서비스 특장점, 프로세스, 상세 정보"},{depth:"관리",section:"목록·상태",content:"검색, 필터, 정렬, 상태 관리"},{depth:"공통",section:"내비게이션",content:"GNB, 페이지 이동, 반응형 메뉴"},{depth:"공통",section:"연락·푸터",content:"문의 CTA, 회사 정보, 법적 고지"},
    ] },
    screens:{title:"주요화면",description:"피그마 프레임의 실제 화면 에셋을 사용해 핵심 사용자 흐름과 반응형 결과를 구성했습니다.",count:entry.screens},
    comparison:{before:["핵심 정보와 가치 제안이 분산","화면별 레이아웃과 패턴 불일치","상세 정보 확인 과정에서 맥락 단절","문의·업무 완료 동선이 불명확"],after:["핵심 가치와 주요 행동을 우선 배치","공통 컴포넌트와 디자인 패턴 통일","단계적 정보 공개로 탐색 맥락 유지","정보 이해부터 전환까지 흐름 명확화"]},
    system:entry.system,
  };
}

projectCaseStudies.moneyguard = {
  ...projectCaseStudies.moneyguard,
  overview: {
    eyebrow: "Background Overview",
    title: "기획 배경 & 문제정의",
    description: "머니가드서비스는 채권 거래 및 차용증 솔루션을 제공하는 기업으로 프로젝트를 기획하게된 배경을 정리했습니다",
    cards: [
    { label: "", title: "문제 정의", bullets: ["서비스 정보가 페이지별로 분산되어 핵심 가치 전달 미흡", "제휴 검토 담당자의 정보 탐색 효율성 저하", "제휴 문의 전환율이 낮은 상태 반복", "경쟁사 대비 서비스 차별점이 명확히 드러나지 않는 구조"] },
    { label: "", title: "핵심 과제", bullets: ["B2B 담당자에게 채권 거래·차용증 서비스를 직관적으로 전달", "기업의 신뢰성과 기술력을 효과적으로 어필하는 구조 개선", "전문 서비스 이해도 향상과 제휴 전환율 제고", "B2B 제휴 프로세스에 최적화된 사용자 여정 설계"] },
    { label: "", title: "프로젝트 목표", bullets: ["B2B 파트너사 담당자가 서비스를 빠르게 파악할 수 있는 구조 설계", "신뢰 기반의 제휴 문의 전환 경험 구축", "서비스 탐색에서 제휴 문의까지 자연스러운 흐름 설계", "제휴 파트너 확보를 위한 신뢰 기반 브랜드 이미지 구축"] },
    { label: "", title: "클라이언트 요구사항", bullets: ["서비스 소개·기술력·실적 정보의 명확한 구조 정리", "제휴 문의 전환을 자연스럽게 유도하는 CTA 설계", "한눈에 파악 가능한 서비스 체계 구성 요청", "모바일 환경에서도 일관된 서비스 경험 제공 요청"] },
    ],
  },
  direction: {
    eyebrow: "Strategy",
    title: "기획방향 정의",
    description: "배경과 문제정의를 바탕으로 도출한 핵심 설계 원칙과 디자인 방향성입니다.",
    cards: [
    { label: "메인 히어로 영역", title: "즉각적 가치 전달", bullets: ["서비스 핵심 가치를 Hero 섹션에서 즉시 전달", "B2B 의사결정권자 대상 경험·전문성 기반 신뢰 구축", "상담 문의 CTA를 자연스러운 흐름 속에 배치하여 전환 유도"] },
    { label: "서비스 상세 영역", title: "단계적 신뢰 구축", bullets: ["Problem-Solution 구조로 공감 유도 후 핵심 기능 소개", "ISO 인증·누적 1,000억 실적 데이터로 신뢰 시각화", "기능별 아이콘과 설명으로 서비스 가치 직관적 전달"] },
    { label: "문의 전환 영역", title: "자연스러운 CTA 유도", bullets: ["정보 탐색 후 자연스러운 제휴 문의 동선", "3단계 여정(이해 → 신뢰 → 전환) 설계", "간결한 문의 폼으로 진입 장벽 최소화"] },
    { label: "전체 공통", title: "절제된 비주얼 시스템", bullets: ["절제된 컬러와 넓은 여백으로 전문성 표현", "데이터 시각화 요소로 실적 직관 전달", "반응형 레이아웃 기반 유연한 구조"] },
    ],
  },
  ia: {
    description: "머니가드서비스 웹사이트의 전체 페이지 개선 구조와 콘텐츠 계층을 정의한 정보구조도(I.A) 입니다",
    rows: [
    { depth: "홈 (랜딩)", section: "Hero 배너", content: "브랜드 슬로건, 핵심 가치 메시지, CTA 버튼" },
    { depth: "", section: "가치 제안", content: "시간·신뢰·관계 3가지 핵심 가치 소구 영역" },
    { depth: "", section: "서비스 개요", content: "금전거래 문제 해결 서비스 소개, 주요 기능 요약" },
    { depth: "", section: "CTA 섹션", content: "상세 정보 유도, 서비스 페이지 전환 버튼" },
    { depth: "", section: "회사 소개", content: "머니가드서비스 비전, 미션, 연혁" },
    { depth: "", section: "뉴스룸", content: "최신 소식, 보도자료, 공지사항" },
    { depth: "서비스 소개", section: "서비스 배너", content: "서비스 핵심 메시지, 비주얼 이미지" },
    { depth: "", section: "Problem 섹션", content: "사용자 Pain Point 3가지, 공감 유도 카피" },
    { depth: "", section: "서비스 소개", content: "머니가드 차용증 서비스 특장점, App 사용 방법" },
    { depth: "", section: "기능 소개", content: "주요 기능별 상세 설명, 스크린샷" },
    { depth: "", section: "보안 인증", content: "ISO 인증, 법적효력 안내, 보안 정책" },
    { depth: "", section: "데이터 섹션", content: "누적 차용금액, 사용자 수, 거래 실적" },
    { depth: "", section: "리뷰 섹션", content: "실제 사용자 후기, 평점, 추천 코멘트" },
    { depth: "", section: "가치 전달", content: "서비스 철학, 비전, 마무리 CTA" },
    { depth: "제휴/문의", section: "제휴 배너", content: "B2B 제휴 안내 메시지, 비주얼" },
    { depth: "", section: "문의 입력폼", content: "기업 검색, 담당자 정보, 제휴 제안, 첨부파일, 개인정보 동의" },
    { depth: "공통 요소", section: "GNB (헤더)", content: "로고, 메인 메뉴 네비게이션, CTA 버튼" },
    { depth: "", section: "푸터", content: "회사 정보, 법적 고지, SNS 링크, 연락처" },
    ],
  },
  comparison: {
    before: [
      "✕ 상단 메뉴바 텍스트와 로고가 작고 배경 이미지에 묻혀 가독성 저하",
      "✕ 서비스 핵심 가치 없이 기능 정보만 단순 나열하는 구조",
      "✕ 인증·실적·후기 등 사용자 신뢰를 높이는 요소 부재",
      "✕ 페이지 간 레이아웃과 톤앤매너의 일관성 부족",
      "✕ 문의/제휴 페이지의 폼 구조가 불명확하고 접근성 미흡",
    ],
    after: [
      "✓ 서비스 핵심 가치와 CTA를 상단에 집중 배치한 랜딩 페이지 구성",
      "✓ Problem-Solution 구조로 사용자 공감 후 4대 핵심 기능 소개",
      "✓ ISO 인증·누적 1,000억 실적·사용자 리뷰로 신뢰 요소 시각화",
      "✓ 기업 제휴·IR 문의를 논리적 그룹으로 분류한 폼 UX 설계",
      "✓ 기능 소개→신뢰 구축→전환 유도의 일관된 정보 흐름 구현",
    ],
  },
};
