import { createSign } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const START_MARKER = "<!-- GA4_METRICS_START -->";
const END_MARKER = "<!-- GA4_METRICS_END -->";
const README_URL = new URL("../README.md", import.meta.url);
const PROPERTY_ID = process.env.GA4_PROPERTY_ID?.trim();
const SERVICE_ACCOUNT_JSON = process.env.GA4_SERVICE_ACCOUNT_JSON?.trim();
const API_ROOT = "https://analyticsdata.googleapis.com/v1beta";

function requireEnvironment() {
  const missing = [];
  if (!PROPERTY_ID) missing.push("GA4_PROPERTY_ID");
  if (!SERVICE_ACCOUNT_JSON) missing.push("GA4_SERVICE_ACCOUNT_JSON");
  if (missing.length) {
    throw new Error(`필수 GitHub Secret이 없습니다: ${missing.join(", ")}`);
  }
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function createAssertion(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  return `${unsignedToken}.${signer.sign(serviceAccount.private_key, "base64url")}`;
}

async function getAccessToken(serviceAccount) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createAssertion(serviceAccount),
    }),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) {
    throw new Error(`Google OAuth 인증 실패 (${response.status}): ${JSON.stringify(body)}`);
  }
  return body.access_token;
}

async function runReport(accessToken, request) {
  const response = await fetch(`${API_ROOT}/properties/${PROPERTY_ID}:runReport`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
      keepEmptyRows: true,
      ...request,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`GA Data API 요청 실패 (${response.status}): ${JSON.stringify(body)}`);
  }
  return body;
}

function metricValue(report, metricName) {
  const index = report.metricHeaders?.findIndex((header) => header.name === metricName) ?? -1;
  if (index < 0) return 0;
  return Number(report.rows?.[0]?.metricValues?.[index]?.value ?? 0);
}

function eventValues(report) {
  const values = new Map();
  for (const row of report.rows ?? []) {
    values.set(row.dimensionValues?.[0]?.value, Number(row.metricValues?.[0]?.value ?? 0));
  }
  return values;
}

function formatNumber(value) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function formatRate(numerator, denominator) {
  if (!denominator) return "0.0%";
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function formatKoreanTimestamp() {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(/\. /g, "-")
    .replace(".", "")
    .replace(" 24:", " 00:");
}

function renderMetrics({ overview, github, events }) {
  const activeUsers = metricValue(overview, "activeUsers");
  const sessions = metricValue(overview, "sessions");
  const views = metricValue(overview, "screenPageViews");
  const githubSessions = metricValue(github, "sessions");
  const projectClicks = events.get("project_card_click") ?? 0;
  const resumeDownloads = events.get("resume_download") ?? 0;
  const contacts = events.get("contact_click") ?? 0;

  return `${START_MARKER}
> 최근 30일 집계 · 마지막 자동 업데이트: ${formatKoreanTimestamp()} KST

| 활성 사용자 | 세션 | 페이지 조회 | GitHub 유입 세션 |
| ---: | ---: | ---: | ---: |
| ${formatNumber(activeUsers)} | ${formatNumber(sessions)} | ${formatNumber(views)} | ${formatNumber(githubSessions)} |

| 프로젝트 카드 클릭 | 이력서 다운로드 | 연락 클릭 | 세션 대비 연락 전환율 |
| ---: | ---: | ---: | ---: |
| ${formatNumber(projectClicks)} | ${formatNumber(resumeDownloads)} | ${formatNumber(contacts)} | ${formatRate(contacts, sessions)} |

<sub>GA4의 익명 집계값이며 개인 식별 정보는 수집하거나 저장소에 기록하지 않습니다. 프로젝트 카드 클릭률은 ${formatRate(projectClicks, sessions)}, 이력서 다운로드율은 ${formatRate(resumeDownloads, sessions)}입니다.</sub>
${END_MARKER}`;
}

async function main() {
  requireEnvironment();
  const serviceAccount = JSON.parse(SERVICE_ACCOUNT_JSON);
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error("GA4_SERVICE_ACCOUNT_JSON에 client_email 또는 private_key가 없습니다.");
  }

  const accessToken = await getAccessToken(serviceAccount);
  const [overview, github, eventReport] = await Promise.all([
    runReport(accessToken, {
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
      ],
    }),
    runReport(accessToken, {
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "sessions" }],
      dimensionFilter: {
        filter: {
          fieldName: "sessionSource",
          stringFilter: { matchType: "EXACT", value: "github", caseSensitive: false },
        },
      },
    }),
    runReport(accessToken, {
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: ["project_card_click", "resume_download", "contact_click"],
            caseSensitive: true,
          },
        },
      },
    }),
  ]);

  const readme = await readFile(README_URL, "utf8");
  const start = readme.indexOf(START_MARKER);
  const end = readme.indexOf(END_MARKER);
  if (start < 0 || end < 0 || end < start) {
    throw new Error("README에서 GA4 자동 갱신 마커를 찾을 수 없습니다.");
  }

  const updated = `${readme.slice(0, start)}${renderMetrics({
    overview,
    github,
    events: eventValues(eventReport),
  })}${readme.slice(end + END_MARKER.length)}`;
  await writeFile(README_URL, updated);
  console.log("README GA4 성과 지표를 갱신했습니다.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
