import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/projects/all",
  "/projects/intern",
  "/projects/client",
  "/projects/company",
  "/projects/personal",
  "/projects/detail/axion",
  "/projects/detail/vazoom",
  "/projects/detail/investhive",
  "/projects/detail/jcompany",
  "/projects/detail/investwith",
  "/projects/detail/korea-search-fund",
  "/projects/detail/humblemong",
  "/projects/detail/prior",
  "/projects/detail/moneyguard",
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "folded", width: 768, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
] as const;

const detailPaths = routes.filter((path) => path.startsWith("/projects/detail/"));
const projectCaseStudySections: Record<string, number> = {
  "/projects/detail/vazoom": 5,
  "/projects/detail/investhive": 6,
  "/projects/detail/jcompany": 6,
  "/projects/detail/investwith": 6,
  "/projects/detail/korea-search-fund": 6,
  "/projects/detail/humblemong": 6,
  "/projects/detail/prior": 6,
  "/projects/detail/moneyguard": 6,
};

const criticalResourceTypes = new Set(["document", "stylesheet", "script", "image", "font"]);

async function preparePage(page: Page, theme: "light" | "dark" = "light") {
  const runtimeErrors: string[] = [];
  const failedRequests: string[] = [];

  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("axion-theme", selectedTheme);
  }, theme);

  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (criticalResourceTypes.has(request.resourceType())) {
      failedRequests.push(`${request.resourceType()}: ${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
    }
  });

  return { runtimeErrors, failedRequests };
}

async function assertHealthyPage(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "networkidle" });
  expect(response?.status(), `${path} HTTP status`).toBe(200);
  await expect(page.locator(".site-header")).toBeVisible();

  const diagnostics = await page.evaluate(() => {
    const visibleImages = Array.from(document.images).filter((image) => {
      const style = getComputedStyle(image);
      const rect = image.getBoundingClientRect();
      return style.display !== "none"
        && style.visibility !== "hidden"
        && rect.width > 0
        && rect.height > 0
        && rect.bottom >= 0
        && rect.top <= innerHeight;
    });
    const imageSources = Array.from(new Set(
      Array.from(document.images)
        .map((image) => image.currentSrc || image.src)
        .filter(Boolean),
    ));
    return {
      brokenImages: visibleImages.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      imageSources,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      styleSheetCount: document.styleSheets.length,
      bodyText: document.body.innerText.slice(0, 500),
    };
  });

  const assetFailures = await page.evaluate(async (sources) => {
    const results = await Promise.all(sources.map(async (source) => {
      try {
        const response = await fetch(source, { cache: "no-store" });
        return response.ok ? null : `${response.status} ${source}`;
      } catch (error) {
        return `${String(error)} ${source}`;
      }
    }));
    return results.filter(Boolean);
  }, diagnostics.imageSources);

  expect(diagnostics.styleSheetCount, `${path} stylesheet count`).toBeGreaterThan(0);
  expect(diagnostics.brokenImages, `${path} broken visible images`).toEqual([]);
  expect(assetFailures, `${path} unavailable image assets`).toEqual([]);
  expect(diagnostics.horizontalOverflow, `${path} horizontal overflow`).toBeLessThanOrEqual(1);
  expect(diagnostics.bodyText).not.toMatch(/Internal Server Error|Application error|Cannot find module/i);
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} ${viewport.width}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of routes) {
      test(`${path} renders without runtime failures`, async ({ page }) => {
        const { runtimeErrors, failedRequests } = await preparePage(page);
        await assertHealthyPage(page, path);
        expect(runtimeErrors, `${path} page or console errors`).toEqual([]);
        expect(failedRequests, `${path} failed critical requests`).toEqual([]);
      });
    }

    for (const path of ["/", "/about", "/projects/all", ...detailPaths]) {
      test(`${path} supports dark theme`, async ({ page }) => {
        const { runtimeErrors, failedRequests } = await preparePage(page, "dark");
        await assertHealthyPage(page, path);
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        expect(runtimeErrors, `${path} dark-theme errors`).toEqual([]);
        expect(failedRequests, `${path} dark-theme failed requests`).toEqual([]);
      });
    }

    test("global menu opens and closes with Escape", async ({ page }) => {
      await preparePage(page);
      await assertHealthyPage(page, "/");
      await page.getByRole("button", { name: "전체 메뉴 열기" }).click();
      await expect(page.getByRole("dialog", { name: "전체 메뉴" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog", { name: "전체 메뉴" })).toHaveCount(0);
    });
  });
}

test("project categories expose the expected card counts", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await preparePage(page);
  const expectedCounts: Record<string, number> = {
    "/projects/all": 9,
    "/projects/intern": 1,
    "/projects/client": 4,
    "/projects/company": 3,
    "/projects/personal": 1,
  };

  for (const [path, count] of Object.entries(expectedCounts)) {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(page.locator(".contact-section")).toBeVisible();
  }
});

test("AXION detail exposes the complete Figma case study", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const { runtimeErrors, failedRequests } = await preparePage(page);
  await page.goto("/projects/detail/axion", { waitUntil: "networkidle" });

  await expect(page.locator(".axion-figma-intro img")).toHaveCount(3);
  await expect(page.locator(".axion-figma-back-link")).toHaveAttribute("href", "/projects/all");
  await expect(page.locator(".figma-case-section")).toHaveCount(6);
  for (const heading of ["프로젝트 기획배경과 핵심목표", "AI Agent 구조", "AI Harness 구축", "정보구조도", "주요 화면", "디자인 시스템"]) {
    await expect(page.getByRole("heading", { name: heading, exact: true })).toHaveCount(1);
  }

  expect(runtimeErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test("remaining project details expose every Figma case-study section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const [path, count] of Object.entries(projectCaseStudySections)) {
    const { runtimeErrors, failedRequests } = await preparePage(page);
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator(".figma-case-section")).toHaveCount(count);
    await expect(page.locator(".project-meta-section")).toBeVisible();
    await expect(page.locator(".contact-section")).toBeVisible();
    expect(runtimeErrors, `${path} case-study errors`).toEqual([]);
    expect(failedRequests, `${path} case-study failed requests`).toEqual([]);
  }
});

test("project CTA matches the shared light and dark visual treatment", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  await preparePage(page, "light");
  await page.goto("/projects/all", { waitUntil: "networkidle" });
  const lightStyles = await page.locator(".contact-section").evaluate((section) => {
    const heading = section.querySelector("h2");
    const eyebrow = section.querySelector(":scope > .contact-inner > span");
    return {
      background: getComputedStyle(section).backgroundColor,
      headingWeight: heading ? getComputedStyle(heading).fontWeight : null,
      eyebrowWeight: eyebrow ? getComputedStyle(eyebrow).fontWeight : null,
    };
  });
  expect(lightStyles).toEqual({
    background: "rgb(255, 255, 255)",
    headingWeight: "700",
    eyebrowWeight: "700",
  });

  await page.getByRole("button", { name: "다크 모드로 전환" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkStyles = await page.locator(".contact-section").evaluate((section) => ({
    background: getComputedStyle(section).backgroundColor,
  }));
  expect(darkStyles.background).toBe("rgb(17, 17, 17)");
});
