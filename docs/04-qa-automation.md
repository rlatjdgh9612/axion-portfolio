# AXION QA·오류 수정 자동화

## 목적

개발 결과가 로컬에서는 정상이고 GitHub에서는 실패하는 상황, 또는 개발 서버 실행 중 빌드가 `.next`를 손상시키는 상황을 방지합니다. 모든 변경 작업은 구현 후 자동 검사와 제한된 오류 수정 루프를 거쳐 완료됩니다.

## 표준 흐름

```text
구현
→ 정적 검사
→ 격리된 QA 빌드
→ Desktop·Folded·Mobile 런타임 QA
→ Light·Dark Theme 및 리소스·오버플로 검사
→ 실패 시 원인 수정(최대 2회)
→ 버전 일치 검사
→ 커밋·푸시
→ 원격 SHA 및 GitHub Actions 확인
→ 결과 보고
```

## 명령어

| 명령어 | 용도 |
|---|---|
| `npm run qa:static` | ESLint와 TypeScript 검사 |
| `npm run build:qa` | `.next-qa`를 사용하는 격리 프로덕션 빌드 |
| `npm run qa:runtime` | 빌드 결과를 실행해 Playwright 브라우저 QA |
| `npm run qa` | 정적 검사, 격리 빌드, 런타임 QA 전체 실행 |
| `npm run version:check` | package·README·CHANGELOG 버전 일치 확인 |
| `npm run qa:publish` | GitHub 게시 전 전체 QA와 버전 확인 |
| `npm run qa:published` | 게시 후 작업 트리와 upstream SHA 동기화 확인 |

## 런타임 QA 기준

- Desktop: 1440×1000
- Folded Desktop: 768×1000
- Mobile: 390×844
- 홈, 소개, 프로젝트 카테고리 5개, 프로젝트 상세 9개
- HTTP 200, 스타일시트 적용, 보이는 이미지의 정상 로딩
- 브라우저 콘솔 오류와 `pageerror` 없음
- 이미지·CSS·JS·폰트 요청 실패 없음
- 문서 가로 넘침 1px 이하
- 전역 메뉴의 열기·Escape 닫기
- 홈·소개·프로젝트의 Dark Theme 유지
- 프로젝트 카테고리별 카드 수 일치
- 초기 이미지 최적화 요청이 병렬로 몰려 오탐이 발생하지 않도록 Chromium 워커 1개로 순차 실행

픽셀 스냅샷은 운영체제·폰트 렌더링 차이로 인한 불필요한 실패를 줄이기 위해 현재 제외합니다. Figma 정합성이 필요한 UI 변경은 실제 브라우저 검사로 보완합니다.

## 실패 처리

1. Playwright 실패 시 `playwright-report/`와 `test-results/`에서 스크린샷·trace·video를 확인합니다.
2. `.next-qa`의 ENOENT·export 오류처럼 전용 빌드 캐시가 원인이면 해당 폴더만 임시 위치로 이동해 보존한 뒤 깨끗한 빌드를 1회 재실행합니다.
3. 원인을 수정하고 `npm run qa` 전체를 다시 실행합니다.
4. 자동 수정은 최대 2회까지만 반복합니다.
5. 해결되지 않으면 실패한 경로·뷰포트·영향과 다음 조치를 사용자에게 보고합니다.

## GitHub Quality Gate

`main` push와 Pull Request마다 GitHub Actions가 Node.js 22 환경에서 의존성을 새로 설치하고 동일한 `npm run qa`를 실행합니다. 실패 시 QA 산출물을 7일간 업로드해 로컬과 CI의 차이를 추적할 수 있습니다.

개발·수정 작업은 사용자가 별도로 제외를 요청하지 않는 한 QA 통과 후 현재 브랜치에 자동 커밋·푸시합니다. push 후 로컬과 upstream SHA를 확인하고, GitHub Actions가 실패하면 로그를 기준으로 최대 2회까지 수정·재검증합니다. 리뷰·설명·진단만 수행한 작업은 파일이나 Git 상태를 변경하지 않습니다.
