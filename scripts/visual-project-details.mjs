import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { selectVisualCases } from "../tests/visual/project-details.config.mjs";

const root = resolve(process.cwd());
const args = process.argv.slice(2);
const option = (name) => { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; };
const baseUrl = option("--base-url") || process.env.VISUAL_BASE_URL || "http://127.0.0.1:3002";
const cases = selectVisualCases(option("--project"));
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const runDir = resolve(root, "tests/visual/results", runId);
const latestDir = resolve(root, "tests/visual/results/latest");
let ownedServer;

async function healthy() {
  try { return (await fetch(`${baseUrl}/projects/detail/vazoom`, { signal: AbortSignal.timeout(2_000) })).ok; }
  catch { return false; }
}

async function ensureServer() {
  if (await healthy()) return "reused";
  const port = new URL(baseUrl).port || "3002";
  ownedServer = spawn("npm", ["run", "dev"], { cwd: root, env: { ...process.env, AXION_DEV_PORT: port }, stdio: "ignore" });
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (await healthy()) return "started";
    if (ownedServer.exitCode !== null) throw new Error(`개발 서버 종료 (${ownedServer.exitCode})`);
    await new Promise((done) => setTimeout(done, 500));
  }
  throw new Error("개발 서버 준비 시간 초과");
}

async function padded(path, width, height) {
  const meta = await sharp(path).metadata();
  return sharp(path).flatten({ background: "#fff" }).extend({
    top: 0, left: 0, right: width - meta.width, bottom: height - meta.height, background: "#fff",
  }).removeAlpha().raw().toBuffer();
}

async function compare(baselinePath, actualPath, diffPath) {
  const [baselineMeta, actualMeta] = await Promise.all([sharp(baselinePath).metadata(), sharp(actualPath).metadata()]);
  const width = Math.max(baselineMeta.width, actualMeta.width);
  const height = Math.max(baselineMeta.height, actualMeta.height);
  const [baseline, actual] = await Promise.all([padded(baselinePath, width, height), padded(actualPath, width, height)]);
  const diff = Buffer.alloc(baseline.length);
  let changed = 0;
  let sum = 0;
  for (let i = 0; i < baseline.length; i += 3) {
    const delta = Math.max(Math.abs(baseline[i] - actual[i]), Math.abs(baseline[i + 1] - actual[i + 1]), Math.abs(baseline[i + 2] - actual[i + 2]));
    sum += delta;
    if (delta > 24) changed += 1;
    diff[i] = delta > 24 ? 255 : Math.round(actual[i] * .18);
    diff[i + 1] = delta > 24 ? 40 : Math.round(actual[i + 1] * .18);
    diff[i + 2] = delta > 24 ? 40 : Math.round(actual[i + 2] * .18);
  }
  await sharp(diff, { raw: { width, height, channels: 3 } }).png().toFile(diffPath);
  const pixels = width * height;
  return {
    baseline: { width: baselineMeta.width, height: baselineMeta.height }, actual: { width: actualMeta.width, height: actualMeta.height },
    changedPixelRatio: +(changed / pixels).toFixed(5), meanDelta: +(sum / pixels).toFixed(2),
    heightDeltaRatio: +(Math.abs(baselineMeta.height - actualMeta.height) / baselineMeta.height).toFixed(5),
  };
}

function severity(item) {
  if (item.httpStatus >= 500 || item.pageErrors.length || item.consoleErrors.length || item.brokenAssets.length || item.missingSections.length) return "critical";
  if (item.horizontalOverflow || item.image.heightDeltaRatio > .08 || item.image.changedPixelRatio > .35) return "high";
  if (item.image.heightDeltaRatio > .025 || item.image.changedPixelRatio > .18) return "medium";
  return "low";
}

async function run() {
  const server = await ensureServer();
  await Promise.all([mkdir(runDir, { recursive: true }), mkdir(latestDir, { recursive: true })]);
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const item of cases) {
      const context = await browser.newContext({ viewport: item.viewport, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "reduce" });
      const page = await context.newPage();
      const consoleErrors = [], pageErrors = [], failedRequests = [];
      page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText || "failed"}`));
      const response = await page.goto(`${baseUrl}${item.url}`, { waitUntil: "networkidle", timeout: 30_000 });
      await page.locator(".project-case-study-root").waitFor({ state: "visible", timeout: 10_000 });
      await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}[data-case-section]>div{opacity:1!important;transform:none!important}" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
        }
        window.scrollTo(0, 0);
        await Promise.race([
          Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((done) => { image.onload = done; image.onerror = done; }))),
          new Promise((done) => setTimeout(done, 5_000)),
        ]);
        document.querySelectorAll("[data-case-section] > div").forEach((element) => {
          element.style.setProperty("opacity", "1", "important");
          element.style.setProperty("transform", "none", "important");
        });
        await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
      });
      const diagnostics = await page.evaluate((expected) => ({
        bodyHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        missingSections: expected.filter((name) => !document.querySelector(`[data-case-section="${name}"]`)),
        brokenAssets: [...document.images].filter((image) => !image.complete || !image.naturalWidth).map((image) => image.currentSrc || image.src),
        fontStatus: document.fonts.status,
      }), item.expectedSections);
      const actualPath = resolve(runDir, `${item.slug}-actual.png`);
      const diffPath = resolve(runDir, `${item.slug}-diff.png`);
      await page.screenshot({ path: actualPath, fullPage: true, animations: "disabled" });
      const image = await compare(resolve(root, item.baselinePath), actualPath, diffPath);
      await Promise.all([
        writeFile(resolve(latestDir, `${item.slug}-actual.png`), await readFile(actualPath)),
        writeFile(resolve(latestDir, `${item.slug}-diff.png`), await readFile(diffPath)),
      ]);
      const result = { ...item, httpStatus: response?.status() || 0, ...diagnostics, consoleErrors, pageErrors, failedRequests, brokenAssets: [...new Set([...diagnostics.brokenAssets, ...failedRequests])], image, actualPath, diffPath };
      result.severity = severity(result);
      result.status = result.severity === "low" ? "passed" : result.severity === "medium" ? "review" : "failed";
      results.push(result);
      console.log(`${item.slug}: ${result.severity} · 높이 ${image.actual.height}/${image.baseline.height} · diff ${(image.changedPixelRatio * 100).toFixed(1)}%`);
      await context.close();
    }
  } finally {
    await browser.close();
    if (ownedServer?.exitCode === null) ownedServer.kill("SIGTERM");
  }
  const counts = Object.fromEntries(["passed", "review", "failed"].map((status) => [status, results.filter((item) => item.status === status).length]));
  const summary = { generatedAt: new Date().toISOString(), baseUrl, server, runId, counts, results };
  const markdown = ["# AXION 프로젝트 상세 시각 검증", "", `- 실행: ${summary.generatedAt}`, `- 대상: ${results.length}개`, `- 판정: 통과 ${counts.passed} / 검토 ${counts.review} / 실패 ${counts.failed}`, "", "| 프로젝트 | node | 경로 | 상태 | 심각도 | 기준/실제 높이 | diff | 누락 | 오류 |", "|---|---|---|---|---|---:|---:|---|---:|", ...results.map((r) => `| ${r.projectName} | ${r.figmaNodeId} | ${r.url} | ${r.status} | ${r.severity} | ${r.image.baseline.height}/${r.image.actual.height} | ${(r.image.changedPixelRatio * 100).toFixed(1)}% | ${r.missingSections.join(", ") || "없음"} | ${r.consoleErrors.length + r.pageErrors.length + r.brokenAssets.length} |`), "", "> 픽셀 차이는 보조 지표이며 의미 기반 검사와 함께 판정합니다. `review`는 치명적 오류가 없지만 사람이 섹션별 diff를 확인해야 하는 상태입니다."].join("\n");
  for (const directory of [runDir, latestDir]) {
    await writeFile(resolve(directory, "summary.json"), JSON.stringify(summary, null, 2));
    await writeFile(resolve(directory, "summary.md"), markdown);
  }
  console.log(`리포트: ${resolve(latestDir, "summary.md")}`);
  if (results.some((item) => item.status === "failed")) process.exitCode = 1;
}

run().catch((error) => { console.error(error); if (ownedServer?.exitCode === null) ownedServer.kill("SIGTERM"); process.exitCode = 1; });
