# 코드 리뷰

- 작성일: 2026-08-05
- 대상 버전: `v0.10.0` (커밋 `bd50391`)
- 리뷰 범위: 미사용 코드 정리(A), CSS 구조(B)
- 리뷰 방식: GitHub 코드 검색 + 실행 중인 개발 서버의 DOM·CSSOM 실측

## 요약

프로젝트 상세 페이지를 Figma 프레임 이미지 방식으로 전환하면서 이전 구현이 코드베이스에 그대로 남았습니다. 동작에는 문제가 없으나 컴포넌트 786줄과 CSS 규칙 204개(전체의 33%)가 화면에 렌더링되지 않는 상태입니다.

기능 결함은 발견되지 않았습니다. 이번 리뷰의 지적은 전부 유지보수성에 관한 것입니다.

## A. 미사용 코드

### A-1. 완전히 고아가 된 컴포넌트

`AxionCaseStudy`는 어디에서도 import되지 않습니다. 자기 파일 안에서만 등장합니다.

| 파일 | 규모 | 상태 |
| --- | --- | --- |
| `components/axion-case-study.tsx` | 122줄 / 14.7KB | 참조 0건 |
| `components/axion-workflow.tsx` | 40줄 / 2.29KB | `axion-case-study.tsx`에서만 참조 |

`axion-workflow.tsx`는 `axion-case-study.tsx`가 유일한 사용처이므로 함께 제거 대상입니다.

`page.tsx`에서 `AxionCaseStudy` import를 제거한 시점부터 연결이 끊어졌습니다.

### A-2. 참조는 남아 있으나 실행되지 않는 코드

`ProjectCaseStudy`는 `page.tsx`에서 import되고 JSX에도 등장하지만 도달할 수 없는 분기에 있습니다.

```ts
const figmaFrameSlugs = ["axion", "vazoom", "investhive", "jcompany",
  "investwith", "korea-search-fund", "humblemong", "prior", "moneyguard"];
const useFigmaFrame = figmaFrameSlugs.includes(project.slug);

{useFigmaFrame ? (
  <section className="detail-figma-frame">…</section>
) : (
  <ProjectCaseStudy slug={project.slug} title={project.title} />   // 실행되지 않음
)}
```

`data/projects.ts`의 프로젝트가 정확히 이 9개이므로 `useFigmaFrame`은 항상 참입니다.

| 파일 | 규모 |
| --- | --- |
| `components/project-case-study.tsx` | 344줄 / 14.4KB |
| `data/project-case-studies.ts` | 280줄 / 30.1KB |

타입 검사와 lint는 통과합니다. 참조가 존재하므로 미사용으로 잡히지 않습니다. 도구가 알려주지 않으니 사람이 판단해야 하는 항목입니다.

### A-3. 사용되지 않는 타입 필드

`data/project-case-studies.ts`의 `screens.items`는 정의만 되고 어디에서도 읽히지 않습니다. 화면 그룹은 `project-case-study.tsx`의 `screenGroups` 상수로 처리됩니다.

### A-4. 판단이 필요한 지점

**선택지 1 — 전부 삭제**

- 대상: `axion-case-study.tsx`, `axion-workflow.tsx`, `project-case-study.tsx`, `data/project-case-studies.ts`, `page.tsx`의 else 분기와 import
- 효과: 786줄 + 61.5KB 제거, CSS 정리(B-1)의 전제 조건 충족
- 위험: 코드 기반 구현으로 되돌릴 때 Git 이력에서 복원 필요

**선택지 2 — 보존**

- 근거: 이미지 방식이 실험적이며 되돌릴 가능성이 있는 경우
- 이 경우 왜 남겨두는지 주석이나 문서에 명시해야 합니다. 이유 없이 남아 있으면 다음 작업자가 사용 중인 코드로 오해합니다.

권장은 선택지 1입니다. 되돌릴 필요가 생기면 Git 이력에서 복원하면 되고, 안 쓰는 코드를 남기는 비용이 복원 비용보다 큽니다.

## B. CSS 구조

### B-1. 죽은 CSS 규칙 204개 (전체의 33%)

실행 중인 페이지에서 CSSOM을 직접 세었습니다.

```
전체 규칙: 613개
렌더링되지 않는 클래스를 대상으로 하는 규칙: 204개 (33%)
```

| 클래스 계열 | 규칙 수 |
| --- | --- |
| `axion-case-study-root` | 113 |
| `case-screen` | 14 |
| `harness` | 12 |
| `agent-grid` | 8 |
| `detail-cards` | 8 |
| `axion-screen` | 8 |
| `case-card` | 7 |
| `type-scale` | 6 |
| `case-color` | 5 |
| `type-row` | 5 |
| `color-swatch` | 5 |
| 기타 | 13 |

검증: 홈과 소개 페이지의 DOM에서 위 클래스를 전부 조회했으나 하나도 존재하지 않았습니다. 상세 페이지에도 없습니다.

`axion-case-study-root` 관련이 113개로 많은 이유는 `body:has(.axion-case-study-root)` 형태의 페이지 스코프 오버라이드가 대량으로 쌓여 있기 때문입니다.

A-1과 A-2를 정리한 뒤에 함께 제거하는 것이 순서상 맞습니다. 컴포넌트가 남은 상태에서 CSS만 지우면 되돌릴 때 스타일이 깨진 컴포넌트가 부활합니다.

### B-2. `:has()` 기반 페이지 스코프 오버라이드

`app/globals.css`는 2,027줄이며 `:has()` 선택자를 쓰는 규칙이 52개입니다.

| 스코프 | 규칙 수 |
| --- | --- |
| `body:has(.home-hero)` | 15 |
| `body:has(.detail-hero-shell)` | 12 |
| `body:has(.projects-index)` | 12 |
| `body:has(.about-profile)` | 8 |
| `body:has(.axion-case-study-root)` | 5 |

**이 패턴이 만든 실제 문제**

1. 푸터 버튼 색상 — 기본 규칙 `.site-footer .button-primary`를 고쳤으나 화면이 바뀌지 않았습니다. `body:has(.detail-hero-shell) .site-footer .button-primary`가 더 높은 명시도로 덮고 있었기 때문입니다.
2. Back 버튼과 제목 스타일 소실 — `AxionCaseStudy` 컴포넌트를 제거하자 `body:has(.axion-case-study-root)` 조건이 깨지면서 관련 스타일이 통째로 사라졌습니다. 컴포넌트를 지웠을 뿐인데 다른 페이지의 스타일이 사라지는 결합이 발생했습니다.

`:has()`는 부모를 조건으로 자식을 선택하므로 DOM 구조 변경이 곧 스타일 소실로 이어집니다.

**개선 방향**

페이지 유형을 조건이 아니라 명시적 값으로 넘기는 방식이 안전합니다.

```tsx
<body data-page="detail">
```

```css
/* 변경 전 */
body:has(.detail-hero-shell) .site-footer { … }
/* 변경 후 */
body[data-page="detail"] .site-footer { … }
```

- 특정 컴포넌트의 존재 여부에 의존하지 않습니다.
- 명시도가 낮고 예측 가능합니다.
- 어떤 페이지에 어떤 스타일이 적용되는지 코드에서 바로 읽힙니다.

다만 52개 규칙을 모두 손봐야 하므로 적은 작업이 아닙니다. B-1을 먼저 하면 대상이 5개 줄고, 나머지 47개도 페이지별로 나눠 진행할 수 있습니다.

### B-3. 파일 분리 검토

`globals.css` 2,027줄에 전역 토큰, 레이아웃, 컴포넌트 스타일, 페이지별 오버라이드, 다크 모드, 반응형이 모두 들어 있습니다.

B-1을 적용하면 약 1,600줄 규모가 되어 당장 급하지 않습니다. 계속 성장한다면 다음 분리를 검토할 만합니다.

```
app/globals.css        토큰, 리셋, 타이포그래피
styles/layout.css      헤더, 푸터, 컨테이너
styles/pages.css       페이지별 스코프
styles/dark.css        다크 모드
```

우선순위는 낮습니다.

## C. 정상 확인 항목

지적 사항과 균형을 맞추기 위해 함께 기록합니다.

- 상세 페이지 분기(`figmaFrameSlugs`, `darkFrameOverrides`)가 slug 한 줄 추가로 확장 가능하도록 일반화되어 있습니다.
- 라이트·다크 이미지 전환이 프로젝트 카드와 상세 페이지에서 동일한 패턴으로 통일되어 있습니다.
- 다크 이미지에 `alt=""` + `aria-hidden="true"`가 적용되어 스크린리더 중복 읽기를 방지합니다.
- E2E가 90개 테스트로 16개 경로 × 3개 뷰포트 × 라이트·다크를 커버합니다.
- 버전 동기화 검사(`scripts/check-version.mjs`)가 4개 파일의 불일치를 CI 초기 단계에서 차단합니다.

## D. 권장 진행 순서

| 순서 | 작업 | 규모 | 위험도 |
| --- | --- | --- | --- |
| 1 | A-1 고아 컴포넌트 2개 삭제 | 162줄 | 낮음 |
| 2 | A-2 도달 불가 코드 삭제 + `page.tsx` 분기 정리 | 624줄 | 낮음 |
| 3 | A-3 미사용 타입 필드 제거 | 1줄 | 낮음 |
| 4 | B-1 죽은 CSS 204개 규칙 제거 | 약 400줄 | 중간 |
| 5 | B-2 `:has()` → `data-page` 전환 | 47개 규칙 | 중간 |
| 6 | B-3 CSS 파일 분리 | — | 낮음 (선택) |

1~3은 한 번에 처리해도 무방합니다. 4는 각 규칙이 정말 미사용인지 확인이 필요하므로 별도 커밋을 권합니다. 5는 페이지 단위로 나눠 진행하는 편이 안전합니다.

각 단계 후 `npm run qa`로 90개 테스트를 확인하면 회귀를 잡을 수 있습니다.

## E. 리뷰 방식의 한계

이 리뷰는 GitHub 웹 인터페이스를 통한 파일 단위 조회와 실행 중인 브라우저의 실측에 기반합니다. 다음은 확인하지 못했습니다.

- 파일 전체를 정독한 코드 품질 검토 (예: `globals.css` 2,027줄 전문)
- 컴포넌트 내부 로직의 세부 구현
- 번들 크기와 실제 성능 프로파일링
- 접근성 자동 검사 도구(axe 등) 실행 결과

전체 코드베이스를 정독하는 리뷰가 필요하다면 로컬 저장소에 직접 접근 가능한 환경에서 수행하는 편이 정확합니다.
