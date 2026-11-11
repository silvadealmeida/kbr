import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";

async function authenticate(context: BrowserContext) {
  const user = createTestUser();
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  return user;
}

async function measure(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const bytes = (navigation?.transferSize ?? 0) + resources.reduce((sum, item) => sum + item.transferSize, 0);
    const scripts = resources
      .filter((item) => item.initiatorType === "script" || /\.js(\?|$)/.test(item.name))
      .reduce((sum, item) => sum + item.transferSize, 0);
    const styles = resources
      .filter((item) => item.initiatorType === "css" || /\.css(\?|$)/.test(item.name))
      .reduce((sum, item) => sum + item.transferSize, 0);
    const fonts = resources.filter((item) => /\.(woff2?|ttf|otf)(\?|$)/.test(item.name));
    return {
      bytes,
      scripts,
      styles,
      fontCount: fonts.length,
      fontBytes: fonts.reduce((sum, item) => sum + item.transferSize, 0),
      cls: (window as unknown as { __kbrCls?: number }).__kbrCls ?? 0,
    };
  });
}

const clsObserver = `
  window.__kbrCls = 0;
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__kbrCls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch (error) {}
`;

test.describe("Orçamento de desempenho local", () => {
  test("landing pública mantém orçamento, sem fonte coreana e com CLS baixo", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 1280 px.");

    await page.addInitScript({ content: clsObserver });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Dá tempo para o observer registrar shifts tardios de hidratação.
    await page.waitForTimeout(300);

    const result = await measure(page);
    await testInfo.attach("landing-metrics.json", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    expect(result.fontCount, "landing não deve baixar fonte coreana").toBe(0);
    expect(result.cls, "CLS da landing").toBeLessThan(0.1);
    expect(result.bytes, "transferência total da landing").toBeLessThan(450_000);
    expect(result.scripts, "JavaScript da landing").toBeLessThan(260_000);
    expect(result.styles, "CSS da landing").toBeLessThan(60_000);
  });

  test("painel autenticado mantém orçamento e não acumula layout shift grosseiro", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 1280 px.");
    await authenticate(context);
    await page.addInitScript({ content: clsObserver });
    await page.goto("/dashboard", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
    await page.waitForTimeout(300);

    const result = await measure(page);
    await testInfo.attach("dashboard-metrics.json", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    expect(result.cls, "CLS do painel").toBeLessThan(0.1);
    expect(result.bytes, "transferência total do painel").toBeLessThan(1_200_000);
  });

  test("320/375/390/768/1280 não criam rolagem horizontal", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Matriz única em 1280 px.");
    await authenticate(context);
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: width < 768 ? 667 : 900 });
      for (const path of ["/", "/cursos", "/hangul", "/hangul/h04", "/revisao"]) {
        await page.goto(path);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${path} em ${width}px`,
        ).toBe(true);
      }
    }
  });
});
