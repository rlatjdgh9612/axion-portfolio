# GA4 측정 가이드

## 목적

AXION 포트폴리오의 방문 경로와 채용 관련 핵심 행동을 측정합니다. 개인 식별 정보는 GA 이벤트에 전송하지 않습니다.

## 연결 방법

1. Google Analytics에서 GA4 속성과 웹 데이터 스트림을 생성합니다.
2. 웹 스트림 URL은 `https://axion-portfolio-one.vercel.app`으로 설정합니다.
3. `G-`로 시작하는 측정 ID를 확인합니다.
4. Vercel 프로젝트의 **Settings → Environment Variables**에 아래 값을 추가합니다.

   ```text
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

5. 적용 환경은 우선 `Production`만 선택하고 새로 배포합니다.
6. 배포 후 GA4의 실시간 보고서와 DebugView에서 이벤트 수신을 확인합니다.

측정 ID가 없으면 GA 스크립트와 이벤트 추적은 모두 비활성화되므로 로컬 개발과 CI에는 영향을 주지 않습니다.

## 이벤트 정의

| 이벤트 | 발생 조건 | 주요 매개변수 | 활용 목적 |
|---|---|---|---|
| `project_card_click` | 프로젝트 카드 선택 | `project_slug`, `project_category`, `location` | 관심 프로젝트 파악 |
| `project_filter_select` | 프로젝트 분류 탭 선택 | `category` | 탐색 방식 파악 |
| `project_cta_click` | 프로젝트 보기 CTA 선택 | `location` | 주요 CTA 전환 분석 |
| `resume_download` | 이력서 다운로드 선택 | `location` | 채용 관심 신호 측정 |
| `contact_click` | 이메일·전화 연락 선택 | `contact_method`, `location` | 문의 전환 측정 |
| `theme_change` | 라이트·다크 모드 변경 | `theme` | 테마 사용성 참고 |

GA4 관리 화면에서 `resume_download`와 `contact_click`을 주요 이벤트로 지정합니다.

## GitHub 유입 구분

README의 배포 링크에는 다음 UTM이 적용되어 있습니다.

```text
utm_source=github&utm_medium=referral&utm_campaign=axion_portfolio
```

GA4의 획득 보고서에서 GitHub 유입과 해당 세션의 이력서 다운로드·연락 행동을 함께 확인할 수 있습니다.

## GitHub README 성과 자동 갱신

`.github/workflows/ga4-readme-report.yml`은 매월 1일 오전 9시(KST)에 GA Data API를 호출해 최근 30일 익명 집계값을 README에 반영합니다. 필요할 때 GitHub의 **Actions → GA4 성과 리포트 → Run workflow**에서 수동 실행할 수도 있습니다.

### 최초 1회 설정

1. Google Cloud 프로젝트에서 **Google Analytics Data API**를 활성화합니다.
2. 읽기 전용 서비스 계정을 생성하고 JSON 키를 발급합니다.
3. GA4 **관리 → 속성 액세스 관리**에서 서비스 계정 이메일을 `뷰어` 권한으로 추가합니다.
4. GA4 관리 화면의 **속성 설정**에서 숫자로 된 속성 ID를 확인합니다. `G-`로 시작하는 측정 ID와는 다른 값입니다.
5. GitHub 저장소 **Settings → Secrets and variables → Actions**에 아래 Repository secret을 등록합니다.

   | Secret | 값 |
   | --- | --- |
   | `GA4_PROPERTY_ID` | 숫자로 된 GA4 속성 ID |
   | `GA4_SERVICE_ACCOUNT_JSON` | 발급받은 서비스 계정 JSON 전체 내용 |

6. 워크플로를 수동 실행해 README의 성과 표가 갱신되는지 확인합니다.

서비스 계정은 GA4 `뷰어` 권한만 부여하고, JSON 키는 저장소 파일·커밋·로그에 포함하지 않습니다. 워크플로는 활성 사용자, 세션, 페이지 조회, GitHub 유입 세션과 세 가지 행동 이벤트의 합계만 README에 기록합니다.

## 초기 성과 지표

- GitHub 및 LinkedIn 유입 세션 수
- 프로젝트 카드 클릭률
- 프로젝트별 상세 페이지 관심도
- 이력서 다운로드 수와 전환율
- 이메일·전화 연락 클릭 수와 전환율

트래픽이 적은 초기에는 주간보다 월간 단위로 확인하고, 방문자 수보다 프로젝트 탐색·이력서 다운로드·연락 행동의 흐름을 우선 봅니다.
