# AXION 포트폴리오 웹사이트 개발 인수인계서

- 작성일: 2026-08-04
- 대상 저장소: `rlatjdgh9612/axion-portfolio`
- 로컬 경로: `/Users/mac/Documents/Codex/2026-07-22/new-chat/axion-portfolio`
- 현재 브랜치: `main`
- 문서 작성 시점 버전: `v0.9.3`
- Figma 파일: [AXION 프로젝트](https://www.figma.com/design/cF038LTfcgHGdUTvFp67li/AXION_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=822-11410)

## 1. 인수인계 핵심 요약

현재 작업은 AXION 포트폴리오의 8개 외부 프로젝트 상세 페이지를 Figma 프레임과 동일한 콘텐츠 구조로 구현하고, 자동 시각 검증 환경을 추가하는 단계입니다.

다음 항목은 구현되어 있습니다.

- 8개 프로젝트 상세 페이지용 공통 사례 연구 컴포넌트
- 프로젝트별 개요·방향·IA·주요 화면·비교·디자인 시스템 데이터
- 프로젝트별 실제 UI 화면 에셋
- Figma 기준 전체 페이지 이미지와 로컬 화면을 비교하는 시각 검증 스크립트
- 프로젝트 상세 페이지의 반응형·다크 모드·에셋 오류 E2E 검사 보강

다만 시각 정합성은 아직 완료 상태가 아닙니다. 최신 자동 비교 결과는 8개 중 `review 1 / failed 7`이며, 주된 원인은 섹션 높이·간격·이미지 배치가 Figma 기준과 다른 것입니다. 페이지 누락, HTTP 오류, 깨진 이미지, 폰트 로드 실패, 브라우저 콘솔 오류는 최신 비교에서 발견되지 않았습니다.

## 2. 반드시 지켜야 할 작업 원칙

- 저장소 루트의 `AGENTS.md`를 먼저 읽습니다.
- 기존 변경사항은 사용자 작업으로 간주해 보존합니다.
- 전체 페이지 캡처 이미지를 상세 페이지 본문 대신 넣지 않습니다.
- Figma 프레임은 구현 기준이며, 화면은 HTML·CSS·React 컴포넌트와 정확한 개별 에셋으로 구성합니다.
- 공통 문제는 `ProjectCaseStudy`와 공통 CSS에서 수정하고, 페이지별 차이는 데이터 또는 variant로 처리합니다.
- 관련 없는 리팩터링, 의존성 업그레이드, Figma 원본 수정은 하지 않습니다.
- 코드 변경 후 `npm run qa`와 관련 페이지의 실제 브라우저 검증을 수행합니다.
- GitHub 게시 전 `npm run qa:publish`, 게시 후 `npm run qa:published`를 수행합니다.

## 3. 개발 환경과 주요 명령

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build:qa
npm run qa
npm run visual:project-details
```

- 개발 서버 기본 주소: `http://127.0.0.1:3002`
- `npm run dev`는 `scripts/dev-safe.mjs` 감독 프로세스를 사용합니다.
- 개발 서버와 QA 빌드는 각각 `.next-dev`, `.next-qa`를 사용합니다.
- 시각 비교 결과: `tests/visual/results/latest/summary.md`
- 시각 비교 상세 PNG: `tests/visual/results/latest/*-actual.png`, `*-diff.png`
- 시각 비교 실행 결과 폴더는 `.gitignore` 대상입니다.

## 4. 페이지와 Figma 프레임 매핑

| 프로젝트 | Figma 프레임 | node ID | 로컬 경로 |
|---|---|---:|---|
| 지티엑스(주) | `09.Project_Vazoom_Desktop` | `822:18480` | `/projects/detail/vazoom` |
| 인베스트하이브 | `10.Project_InvestHive_Desktop` | `822:21276` | `/projects/detail/investhive` |
| 제이컴퍼니 | `11.Project_JCompany_Desktop` | `822:16240` | `/projects/detail/jcompany` |
| 인베스트위드(주) | `12.Project_Investwith_Desktop` | `822:34842` | `/projects/detail/investwith` |
| 한국서치펀드 | `13.Project_KoreaSearchFund_Desktop` | `822:32618` | `/projects/detail/korea-search-fund` |
| 험블몽 | `14.Project_Humblemong_Desktop` | `822:30679` | `/projects/detail/humblemong` |
| 세무법인 프라이어 | `15.Project_PRIOR_Desktop` | `822:13532` | `/projects/detail/prior` |
| 머니가드서비스(주) | `16.Project_MoneyGuard_Desktop` | `822:11919` | `/projects/detail/moneyguard` |

## 5. 주요 구현 파일

| 파일 | 역할 |
|---|---|
| `app/projects/detail/[slug]/page.tsx` | 상세 경로, 프로젝트 기본 정보와 사례 연구 컴포넌트 연결 |
| `components/project-case-study.tsx` | 8개 상세 페이지 공통 섹션과 variant 렌더링 |
| `data/project-case-studies.ts` | 프로젝트별 개요, 전략, IA, 화면 수, 디자인 시스템 데이터 |
| `app/globals.css` | 상세 페이지 레이아웃, 타이포그래피, 반응형, 다크 모드 스타일 |
| `public/assets/detail/case-studies/ui/<slug>/` | 프로젝트별 화면 에셋 |
| `tests/visual/project-details.config.mjs` | Figma node와 로컬 URL, 예상 섹션 매핑 |
| `scripts/visual-project-details.mjs` | 서버 재사용·실행, 화면 캡처, 의미 검사, 이미지 diff 생성 |
| `tests/visual/figma-baselines/` | Figma 프레임별 기준 이미지 |
| `docs/VISUAL_QA.md` | 시각 검증 환경 사용법과 판정 기준 |
| `tests/e2e/smoke.spec.ts` | 전체 경로·반응형·테마·에셋·콘솔 오류 검사 |

## 6. 현재 구현 구조

8개 프로젝트는 공통적으로 다음 섹션을 사용합니다.

1. 기획/디자인 배경과 문제 정의
2. 기획/디자인 방향 정의
3. 정보구조도(I.A)
4. 주요 화면
5. 개선 전후 비교 또는 UX 개선 포인트
6. 디자인 시스템
7. 공통 문의 CTA와 푸터

프로젝트별 화면 그룹과 디자인 시스템 값은 `data/project-case-studies.ts`에서 관리합니다. 실제 화면 이미지는 `screen-01.png` 형식으로 프로젝트별 폴더에 저장되어 있으며, `components/project-case-study.tsx`에서 그룹별로 조합합니다.

## 7. 최신 시각 검증 상태

최신 결과 기준:

| 프로젝트 | 상태 | 심각도 | Figma/실제 높이 | 주요 남은 차이 |
|---|---|---|---:|---|
| vazoom | failed | high | 16611 / 13222 | 전체 세로 길이와 화면 섹션 구성 부족 |
| investhive | review | medium | 13733 / 14424 | 높이는 근접하나 간격·배치 diff 검토 필요 |
| jcompany | failed | high | 13483 / 11903 | 섹션 높이·화면 구성 부족 |
| investwith | failed | high | 16126 / 13402 | 긴 주요 화면 영역 배치 차이 |
| korea-search-fund | failed | high | 16583 / 12224 | 주요 화면·모바일 화면 구성과 세로 길이 차이 |
| humblemong | failed | high | 20706 / 13703 | 데스크톱·태블릿·모바일 화면 섹션 길이 부족 |
| prior | failed | high | 13111 / 10886 | IA·주요 화면·비교 영역 높이 차이 |
| moneyguard | failed | high | 13078 / 11342 | 주요 화면과 디자인 시스템 간격 차이 |

공통적으로 통과한 항목:

- 8개 URL HTTP 200
- 가로 넘침 없음
- 필수 섹션 DOM 존재
- 깨진 이미지 없음
- Pretendard 폰트 로드 완료
- 콘솔 오류, `pageerror`, 실패 요청 없음

## 8. 다음 작업 우선순위

### 1순위: 공통 레이아웃 정합화

- 1200px Figma 프레임 기준 콘텐츠 폭, 섹션 상하 여백, 제목·본문 간격을 측정합니다.
- `case-section`, `case-heading`, `case-card-grid`, `case-screen-groups`, `case-design-system`의 공통 높이와 간격을 먼저 맞춥니다.
- 8개 페이지에 동일한 문제가 있을 때만 공통 CSS를 변경합니다.

### 2순위: 프로젝트별 주요 화면 배열

- 각 Figma 프레임의 화면 개수, 열 구성, 큰 대표 화면과 작은 보조 화면의 비율을 확인합니다.
- 현재 `screenGroups`의 `indices`와 `feature`가 Figma와 일치하는지 프로젝트별로 검증합니다.
- 이미지 비율은 유지하고, `object-fit`으로 잘라 맞추지 않습니다.

### 3순위: 디자인 시스템 정합화

- 각 프로젝트의 로고, 타이포그래피, 그리드, 컬러 순서와 표시 내용을 Figma와 비교합니다.
- 디자인 시스템 섹션 자체가 누락되지 않았는지 DOM과 화면에서 확인합니다.
- 라이트·다크 모드에서 배경과 텍스트 대비를 함께 확인합니다.

### 4순위: 반응형 회귀 확인

- Desktop 1200px, Folded Desktop 768px, Mobile 390px에서 확인합니다.
- 768px에서 2열이 필요한 영역과 1열 전환 영역을 Figma/메인 페이지 규칙과 비교합니다.
- CTA, 푸터, 메뉴, 카드가 잘리거나 가로로 넘치지 않아야 합니다.

## 9. 권장 작업 루프

페이지별로 다음 순서를 반복합니다.

1. `tests/visual/figma-baselines/<slug>.png`와 실제 페이지를 같은 섹션 경계로 비교
2. `tests/visual/results/latest/<slug>-diff.png`에서 큰 차이 영역 확인
3. DOM·CSS·데이터·에셋 원인 확인
4. 최소 범위 수정
5. `npm run lint && npm run typecheck`
6. `npm run visual:project-details -- --slug=<slug>`
7. 실제 브라우저에서 Light/Dark, 1200/768/390 확인
8. 완료 후 전체 `npm run qa`

한 페이지에서 수치만 반복 조정하지 말고, 먼저 Figma 구조와 구현 구조가 일치하는지 확인합니다.

## 10. Git 및 게시 상태

이 문서 작성 시점에는 상세 페이지 및 시각 검증 관련 변경이 작업 트리에 존재합니다. GitHub에 게시하기 전 반드시 다음을 확인합니다.

```bash
git status -sb
git diff --stat
npm run qa:publish
git add <관련 파일>
git commit -m "feat: add project detail visual QA"
git push origin main
npm run qa:published
```

GitHub CLI 인증이 만료된 경우 `gh auth login -h github.com`으로 다시 인증해야 합니다. 강제 푸시는 사용하지 않습니다.

## 11. 완료 기준

- 8개 URL이 오류 없이 렌더링됨
- 모든 Figma 섹션과 콘텐츠가 구현됨
- 주요 화면 이미지 개수, 순서, 비율이 일치함
- 핵심 타이포그래피, 색상, 간격, 그리드가 일치함
- 라이트·다크·1200·768·390px 검증 완료
- 콘솔·에셋·폰트 오류 없음
- `npm run qa` 통과
- 시각 비교의 high 차이 0, 해결 가능한 medium 차이 0
