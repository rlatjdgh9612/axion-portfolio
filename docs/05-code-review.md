# 코드 리뷰

| | |
| --- | --- |
| 대상 | `v0.10.0` · 커밋 `bd50391` |
| 리뷰 범위 | 미사용 코드, CSS 구조 |
| 리뷰 방식 | 코드 검색 + 실행 중인 브라우저의 DOM·CSSOM 실측 |
| 작성일 | 2026-08-05 |

## 심각도 기준

| 라벨 | 의미 | 처리 |
| --- | --- | --- |
| `P1` | 방치 시 추가 장애를 유발함 | 다음 작업 전 처리 |
| `P2` | 유지보수 비용을 지속적으로 발생시킴 | 계획에 포함 |
| `Nit` | 개선하면 좋지만 급하지 않음 | 여유가 생기면 |

## 리뷰 결과 요약

| # | 라벨 | 항목 | 규모 |
| --- | --- | --- | --- |
| 1 | `P1` | `:has()` 스코프가 컴포넌트 존재 여부에 결합됨 | 52개 규칙 |
| 2 | `P2` | 참조는 있으나 실행되지 않는 코드 | 624줄 |
| 3 | `P2` | 어디에서도 참조되지 않는 컴포넌트 | 162줄 |
| 4 | `P2` | 대상이 사라진 CSS 규칙 | 204개 (전체의 33%) |
| 5 | `Nit` | 정의만 되고 읽히지 않는 타입 필드 | 1줄 |
| 6 | `Nit` | `globals.css` 단일 파일 집중 | 2,027줄 |

기능 결함은 발견되지 않았습니다. 90개 E2E 테스트가 전부 통과하며, 16개 경로에서 런타임 오류와 가로 넘침이 없습니다.

---

## 1. `P1` · `:has()` 스코프가 컴포넌트 존재 여부에 결합됨

**대상** `app/globals.css` · 52개 규칙

### 문제

페이지별 스타일 오버라이드가 특정 컴포넌트의 클래스 존재 여부를 조건으로 삼고 있습니다.

```css
body:has(.axion-case-study-root) .back-link { … }
body:has(.axion-case-study-root) .detail-hero h1 { font-weight: 800; }
body:has(.detail-hero-shell) .site-footer .button-primary { background: #fff; }
```

| 스코프 | 규칙 수 |
| --- | --- |
| `body:has(.home-hero)` | 15 |
| `body:has(.detail-hero-shell)` | 12 |
| `body:has(.projects-index)` | 12 |
| `body:has(.about-profile)` | 8 |
| `body:has(.axion-case-study-root)` | 5 |

### 영향 — 이번 작업 중 실제로 두 번 발생

**사례 1. 컴포넌트를 지웠더니 다른 페이지의 스타일이 사라짐**

`<AxionCaseStudy />`를 이미지로 교체하자 `.axion-case-study-root` 요소가 DOM에서 사라졌고, 조건이 깨지면서 Back 버튼과 제목 스타일이 통째로 무효화되었습니다.

```
변경 대상: page.tsx (컴포넌트 1개 제거)
실제 영향: 상세 페이지 9개의 Back 버튼 알약 형태 + 제목 font-weight 소실
```

컴포넌트를 제거한 개발자는 CSS를 건드리지 않았으므로 이 영향을 예측할 수 없습니다.

**사례 2. 기본 규칙을 고쳤는데 화면이 바뀌지 않음**

푸터 버튼 색상을 `.site-footer .button-primary`에서 수정했으나 반영되지 않았습니다. 명시도가 더 높은 `body:has(.detail-hero-shell) .site-footer .button-primary`가 덮고 있었기 때문입니다. 같은 속성이 두 곳에서 정의되어 있다는 사실은 코드를 읽어서는 알기 어렵고, 브라우저에서 계산된 스타일을 확인해야 드러납니다.

### 제안

페이지 유형을 조건이 아니라 명시적 값으로 전달합니다.

```tsx
// app/projects/detail/[slug]/layout.tsx
<body data-page="detail">
```

```css
/* before */
body:has(.detail-hero-shell) .site-footer .button-primary { … }

/* after */
body[data-page="detail"] .site-footer .button-primary { … }
```

| | `:has()` | `data-page` |
| --- | --- | --- |
| 조건 | 특정 컴포넌트의 렌더링 여부 | 페이지가 선언한 값 |
| DOM 변경 시 | 스타일이 조용히 사라짐 | 영향 없음 |
| 명시도 | `:has()` 인자만큼 상승 | 속성 선택자 수준 |
| 가독성 | 어느 페이지인지 추론 필요 | 값에서 바로 확인 |

### 작업 범위

52개 중 5개는 항목 4(죽은 CSS) 제거로 함께 사라지므로 실질 대상은 47개입니다. 페이지 단위로 나누어 진행하고 각 단계 후 `npm run qa`로 회귀를 확인하는 방식을 권합니다.

---

## 2. `P2` · 참조는 있으나 실행되지 않는 코드

**대상** `components/project-case-study.tsx` (344줄) · `data/project-case-studies.ts` (280줄)

### 문제

`ProjectCaseStudy`는 import되고 JSX에도 등장하지만 도달할 수 없는 분기에 있습니다.

```ts
const figmaFrameSlugs = ["axion", "vazoom", "investhive", "jcompany",
  "investwith", "korea-search-fund", "humblemong", "prior", "moneyguard"];
const useFigmaFrame = figmaFrameSlugs.includes(project.slug);

{useFigmaFrame ? (
  <section className="detail-figma-frame">…</section>
) : (
  <ProjectCaseStudy slug={project.slug} title={project.title} />
)}
```

`data/projects.ts`가 정의한 프로젝트가 정확히 이 9개이므로 `useFigmaFrame`은 항상 참입니다. else 분기는 영원히 실행되지 않습니다.

### 영향

**정적 분석 도구가 잡아내지 못합니다.** 참조가 존재하므로 ESLint의 미사용 검사와 TypeScript 모두 통과합니다. 즉 이 코드는 사람이 판단하지 않는 한 계속 남습니다.

그 결과 다음이 발생합니다.

- 624줄이 유지보수 대상으로 오인됩니다. 실제로 이번 작업 중 `data/project-case-studies.ts`에 Figma 원문을 채우고 타입을 확장하는 작업이 이루어졌으나, 화면에 반영되지 않는 코드였습니다.
- 항목 4(죽은 CSS 204개)를 제거할 수 없습니다. 컴포넌트가 살아 있는 한 관련 CSS도 함께 남겨야 합니다.

### 제안

**선택지 A — 삭제**

```diff
- import { ProjectCaseStudy } from "@/components/project-case-study";

- {useFigmaFrame ? (
-   <section className="detail-figma-frame">…</section>
- ) : (
-   <ProjectCaseStudy slug={project.slug} title={project.title} />
- )}
+ <section className="detail-figma-frame">…</section>
```

`figmaFrameSlugs`와 `useFigmaFrame`도 함께 제거할 수 있습니다. 프로젝트가 추가되면 이미지를 넣는 것으로 충분합니다.

**선택지 B — 보존**

되돌릴 가능성이 있다면 남길 수 있습니다. 다만 이 경우 **왜 남기는지 명시**해야 합니다.

```ts
// 상세 페이지는 v0.10.0부터 Figma 프레임 이미지 방식으로 전환되었습니다.
// 아래 분기는 코드 기반 구현으로 되돌릴 경우를 위해 유지합니다.
// 현재 figmaFrameSlugs가 전체 프로젝트를 포함하므로 실행되지 않습니다.
```

주석이 없으면 다음 작업자는 이 코드를 사용 중인 것으로 판단합니다.

**권장은 선택지 A입니다.** 되돌릴 필요가 생기면 Git 이력에서 복원하면 됩니다. 그것이 버전 관리의 목적이고, 안 쓰는 코드를 남기는 비용이 복원 비용보다 큽니다.

---

## 3. `P2` · 어디에서도 참조되지 않는 컴포넌트

**대상** `components/axion-case-study.tsx` (122줄) · `components/axion-workflow.tsx` (40줄)

### 문제

`AxionCaseStudy`는 자기 파일 안에서만 등장합니다.

```
검색: AxionCaseStudy  →  components/axion-case-study.tsx (선언부 1건)
검색: AxionWorkflow   →  components/axion-workflow.tsx, components/axion-case-study.tsx
```

`page.tsx`에서 import를 제거한 시점부터 연결이 끊어졌습니다. `axion-workflow.tsx`는 `axion-case-study.tsx`가 유일한 사용처이므로 함께 고아가 되었습니다.

### 영향

항목 2와 달리 **참조가 0건이므로 판단의 여지가 없습니다.** 빌드 결과물에도 포함되지 않습니다.

다만 파일이 존재하는 한 다음이 발생합니다.

- `components/` 디렉터리를 열었을 때 어떤 것이 실제로 쓰이는지 구분되지 않습니다.
- 전체 검색 시 결과에 섞여 노이즈가 됩니다.

### 제안

```bash
git rm components/axion-case-study.tsx components/axion-workflow.tsx
```

가장 먼저 처리할 수 있는 항목입니다. 참조가 없으므로 회귀 위험이 사실상 없습니다.

---

## 4. `P2` · 대상이 사라진 CSS 규칙

**대상** `app/globals.css` · 204개 규칙 (전체 613개의 33%)

### 문제

실행 중인 페이지에서 CSSOM을 직접 순회해 집계했습니다.

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
| `case-color`, `type-row`, `color-swatch` | 각 5 |
| 기타 | 13 |

**검증** 홈, 소개, 상세 페이지의 DOM에서 위 클래스를 전부 조회했으며 하나도 존재하지 않았습니다.

### 영향

CSS는 대상이 없어도 오류를 내지 않으므로 조용히 누적됩니다. 그 결과

- `globals.css`를 읽을 때 어떤 규칙이 살아 있는지 판별할 수 없습니다.
- 새 스타일을 추가할 때 기존 규칙과 충돌하는지 확인하는 비용이 커집니다.
- 항목 1의 `:has()` 정리 대상에 죽은 규칙이 섞여 작업량이 부풀려집니다.

### 제안

**항목 2와 3을 먼저 처리한 뒤 진행합니다.** 컴포넌트가 남은 상태에서 CSS만 제거하면, 되돌릴 때 스타일이 깨진 컴포넌트가 부활합니다.

제거 대상 판별은 클래스명 기준으로 가능합니다.

```bash
# 각 클래스가 실제로 사용되는지 확인
grep -rn "axion-case-study-root" --include="*.tsx" --include="*.ts" .
grep -rn "case-screen" --include="*.tsx" --include="*.ts" .
```

결과가 없으면 해당 CSS 규칙을 제거합니다. 단독 커밋으로 분리하면 문제 발생 시 되돌리기 쉽습니다.

---

## 5. `Nit` · 정의만 되고 읽히지 않는 타입 필드

**대상** `data/project-case-studies.ts`

```ts
screens: {
  title: string;
  description: string;
  count: number;
  items?: { title: string; description: string }[];   // 읽히지 않음
};
```

화면 그룹은 `project-case-study.tsx`의 `screenGroups` 상수로 처리되고 있어 `items`는 어디에서도 사용되지 않습니다. 상세 페이지 전환 과정에서 남은 잔재입니다.

항목 2에서 파일 전체를 제거한다면 함께 사라집니다. 파일을 남긴다면 이 필드만 제거합니다.

---

## 6. `Nit` · `globals.css` 단일 파일 집중

**대상** `app/globals.css` · 2,027줄

전역 토큰, 리셋, 레이아웃, 컴포넌트 스타일, 페이지별 오버라이드, 다크 모드, 반응형이 한 파일에 있습니다.

항목 4를 적용하면 약 1,600줄이 되어 당장 급하지 않습니다. 계속 성장한다면 다음 분리를 검토할 수 있습니다.

```
app/globals.css      토큰, 리셋, 타이포그래피
styles/layout.css    헤더, 푸터, 컨테이너
styles/pages.css     페이지별 스코프
styles/dark.css      다크 모드
```

---

## 잘 되어 있는 부분

지적 사항만 나열하면 코드베이스 전반이 문제인 것처럼 읽히므로 함께 기록합니다.

**확장을 고려한 분기 설계** 상세 페이지 추가 시 `figmaFrameSlugs`에 slug 한 줄만 넣으면 됩니다. 이미지 경로도 slug 기반으로 자동 생성되어 하드코딩이 없습니다.

**일관된 테마 전환 패턴** 프로젝트 카드와 상세 페이지가 동일한 방식(`-light` / `-dark` 클래스 + `html[data-theme]`)을 씁니다. 한 곳을 이해하면 다른 곳도 예측할 수 있습니다.

**접근성 고려** 다크 이미지에 `alt=""` + `aria-hidden="true"`를 적용해 스크린리더가 같은 내용을 두 번 읽지 않습니다.

**실효성 있는 E2E** 90개 테스트가 16개 경로 × 3개 뷰포트 × 라이트·다크를 커버합니다. 실제로 이번 작업 중 로컬에서는 통과하고 CI에서만 실패하는 케이스를 잡아냈습니다.

**버전 동기화 자동 검사** `scripts/check-version.mjs`가 `package.json`, `package-lock.json`, `README`, `CHANGELOG` 4곳의 불일치를 CI 초기 단계에서 차단합니다. 실제로 이번에 누락을 걸러냈습니다.

---

## 처리 순서 제안

의존 관계상 아래 순서를 권합니다. 항목 4는 2·3이 끝나야 진행할 수 있고, 항목 1은 4가 끝나면 대상이 줄어듭니다.

| 순서 | 항목 | 라벨 | 규모 | 회귀 위험 |
| --- | --- | --- | --- | --- |
| 1 | 고아 컴포넌트 2개 삭제 | `P2` | 162줄 | 없음 (참조 0건) |
| 2 | 도달 불가 코드 삭제 + 분기 정리 | `P2` | 624줄 | 낮음 |
| 3 | 미사용 타입 필드 제거 | `Nit` | 1줄 | 없음 |
| 4 | 죽은 CSS 규칙 제거 | `P2` | 약 400줄 | 중간 |
| 5 | `:has()` → `data-page` 전환 | `P1` | 47개 규칙 | 중간 |
| 6 | CSS 파일 분리 | `Nit` | — | 낮음 |

1~3은 하나의 커밋으로 묶어도 무방합니다. 4는 각 규칙의 미사용 여부 확인이 필요하므로 단독 커밋을 권합니다. 5는 페이지 단위로 나누어 진행합니다.

각 단계 후 `npm run qa`를 실행해 90개 테스트로 회귀를 확인합니다.

### `P1`을 마지막에 두는 이유

항목 1이 가장 높은 심각도이지만 순서상 뒤에 배치했습니다. 항목 4를 먼저 처리하면 `:has()` 대상이 52개에서 47개로 줄고, 죽은 규칙을 잘못 건드릴 위험도 사라집니다. 심각도와 처리 순서는 별개입니다.

---

## 이 리뷰의 한계

GitHub 웹 인터페이스를 통한 파일 단위 조회와 실행 중인 브라우저의 실측에 기반합니다. 다음은 확인하지 못했습니다.

- `globals.css` 2,027줄 전문 정독
- 컴포넌트 내부 로직의 세부 구현 검토
- 번들 크기와 성능 프로파일링
- 접근성 자동 검사 도구(axe 등) 실행

수치는 모두 실측값이므로 재현 가능합니다. 판단이 필요한 항목(특히 2번의 삭제 여부)은 향후 계획에 달려 있으므로 저장소 주인이 결정할 사안입니다.
