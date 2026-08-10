import { expect, test } from "@playwright/test";

test("GA ID 설정 여부에 따라 분석 스크립트를 안전하게 처리한다", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const analyticsScripts = page.locator('script[src*="googletagmanager.com"]');
  const scriptCount = await analyticsScripts.count();
  expect(scriptCount).toBeLessThanOrEqual(1);

  if (scriptCount === 1) {
    await expect(analyticsScripts).toHaveAttribute("src", /googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]+/);
  }
});

test("핵심 전환 요소에 분석 이벤트가 연결되어 있다", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator('[data-analytics-event="project_card_click"]')).toHaveCount(4);
  await expect(page.locator('[data-analytics-event="resume_download"]')).toHaveCount(2);
  await expect(page.locator('[data-analytics-event="contact_click"]')).toHaveCount(2);
  await expect(page.locator('[data-analytics-event="theme_change"]').first()).toBeVisible();

  const firstProject = page.locator('[data-analytics-event="project_card_click"]').first();
  await expect(firstProject).toHaveAttribute("data-analytics-project-slug", /.+/);
  await expect(firstProject).toHaveAttribute("data-analytics-project-category", /.+/);
  await expect(firstProject).toHaveAttribute("data-analytics-location", "home_projects");
});

test("프로젝트 분류 탭과 목록 카드에 분석 이벤트가 연결되어 있다", async ({ page }) => {
  await page.goto("/projects/all", { waitUntil: "domcontentloaded" });

  await expect(page.locator('[data-analytics-event="project_filter_select"]')).toHaveCount(5);
  await expect(page.locator('[data-analytics-event="project_card_click"]')).toHaveCount(9);
  await expect(page.locator('[data-analytics-event="project_filter_select"]').first()).toHaveAttribute("data-analytics-category", "all");
});
