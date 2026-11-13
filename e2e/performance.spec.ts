import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";

async function authenticate(context: BrowserContext) {
  const user = createTestUser();
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  return user;
}

async function seedHangulProgress(context: BrowserContext, userId: string) {
  const completed = [
    ...Array.from({ length: 20 }, (_, index) => `h${String(index + 1).padStart(2, "0")}`),
    "c1",
    "c2",
    "c3",
  ];
  await seedLessons(context, userId, completed);
}

async function seedLessons(
  context: BrowserContext,
  userId: string,
  completed: readonly string[],
) {
  await context.addInitScript(
    ({ key, lessons }) => {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            v: 1,
            lessons,
            cards: {},
            history: [],
            streak: 0,
            dailyGoal: 10,
            lastActive: "2026-11-10T12:00:00.000Z",
          }),
        );
      } catch {
        /* documento sem origem utilizável */
      }
    },
    {
      key: `kbr:user:${userId}:v1`,
      lessons: Object.fromEntries(
        completed.map((id) => [id, { done: true, score: 100 }]),
      ),
    },
  );
}

async function noOverflow(page: Page, label: string) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    label,
  ).toBe(true);
}

/** Avança a h04 até o primeiro item de resposta textual (cloze). */
async function advanceToTextAnswer(page: Page) {
  const choice = async (name: string) => {
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name, exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  };
  const build = async (initial: string, medial: string) => {
    await page.getByRole("button", { name: initial, exact: true }).first().click();
    await page.getByRole("button", { name: medial, exact: true }).first().click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  };

  await choice("나");
  await choice("고");
  await choice("ㄱ + ㅗ e ㄱ + ㅣ");
  await choice("가 e 구");
  await build("ㄴ", "ㅏ");
  await build("ㄱ", "ㅗ");
}

async function measure(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const bytes = (navigation?.transferSize ?? 0) + resources.reduce((sum, item) => sum + item.transferSize, 0);
    const isFont = (item: PerformanceResourceTiming) =>
      /\.(woff2?|ttf|otf)(\?|$)/.test(item.name);
    const scripts = resources
      .filter((item) => !isFont(item) && (item.initiatorType === "script" || /\.js(\?|$)/.test(item.name)))
      .reduce((sum, item) => sum + item.transferSize, 0);
    // Fontes iniciadas por CSS também têm initiatorType "css" em alguns motores;
    // excluí-las evita contabilizar o woff2 como se fosse folha de estilo.
    const styles = resources
      .filter((item) => !isFont(item) && (item.initiatorType === "css" || /\.css(\?|$)/.test(item.name)))
      .reduce((sum, item) => sum + item.transferSize, 0);
    const fonts = resources.filter(isFont);
    return {
      bytes,
      scripts,
      styles,
      fontCount: fonts.length,
      fontBytes: fonts.reduce((sum, item) => sum + item.transferSize, 0),
      loadedFontFamilies: Array.from(document.fonts)
        .filter((font) => font.status === "loaded")
        .map((font) => font.family),
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
    // Orçamento revisado na 7B: Archivo é a única fonte pública baixada na
    // landing; IBM Plex Mono só entra quando um componente mono é renderizado.
    // A fonte coreana continua proibida no caminho público.
    expect(result.fontCount, "landing deve baixar no máximo 2 arquivos de fonte").toBeLessThanOrEqual(2);
    expect(result.fontBytes, "fontes públicas da landing").toBeLessThanOrEqual(60_000);
    expect(
      result.loadedFontFamilies.join(" "),
      "landing não deve carregar Noto Sans KR",
    ).not.toMatch(/Noto\s*Sans\s*KR/i);
    expect(result.cls, "CLS da landing").toBeLessThan(0.1);
    expect(result.bytes, "transferência total da landing").toBeLessThan(450_000);
    expect(result.scripts, "JavaScript da landing").toBeLessThan(260_000);
    expect(result.styles, "CSS da landing").toBeLessThan(20_000);
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

  test("player de lição mantém orçamento autenticado e feedback sem CLS grosseiro", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 1280 px.");
    const user = await authenticate(context);
    await seedHangulProgress(context, user.id);
    await page.addInitScript({ content: clsObserver });
    await page.goto("/hangul/h16", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Refazer lição" }).click();
    await expect(page.getByText("Bancada de composição")).toBeVisible();
    await page.waitForTimeout(300);

    const result = await measure(page);
    await testInfo.attach("player-metrics.json", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    expect(result.cls, "CLS do player").toBeLessThan(0.1);
    expect(result.bytes, "transferência total do player").toBeLessThan(1_200_000);
  });

  test("atlas do Hangul mantém orçamento autenticado", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 1280 px.");
    const user = await authenticate(context);
    await seedLessons(context, user.id, [
      ...Array.from({ length: 25 }, (_, index) => `h${String(index + 1).padStart(2, "0")}`),
      "c1",
      "c2",
      "c3",
      "c4",
    ]);
    await page.addInitScript({ content: clsObserver });

    await page.goto("/hangul", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Módulo Hangul concluído" })).toBeVisible();
    await page.waitForTimeout(300);
    const hangul = await measure(page);
    await testInfo.attach("hangul-metrics.json", {
      body: JSON.stringify(hangul, null, 2),
      contentType: "application/json",
    });
    expect(hangul.cls, "CLS do atlas").toBeLessThan(0.1);
    // O atlas carrega muitos subconjuntos woff2 de Noto Sans KR sob demanda; a
    // transferência varia ~1 KB entre execuções, então o teto tem folga pequena.
    expect(hangul.bytes, "transferência total do atlas").toBeLessThan(1_250_000);
  });

  test("conclusão do c4 mantém orçamento autenticado", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 1280 px.");
    const user = await authenticate(context);
    await seedLessons(context, user.id, [
      ...Array.from({ length: 25 }, (_, index) => `h${String(index + 1).padStart(2, "0")}`),
      "c1",
      "c2",
      "c3",
      "c4",
    ]);
    await page.addInitScript({ content: clsObserver });

    await page.goto("/hangul/c4", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { level: 1, name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await page.waitForTimeout(300);
    const completion = await measure(page);
    await testInfo.attach("c4-completion-metrics.json", {
      body: JSON.stringify(completion, null, 2),
      contentType: "application/json",
    });
    expect(completion.cls, "CLS da conclusão").toBeLessThan(0.1);
    expect(completion.bytes, "transferência total da conclusão").toBeLessThan(1_200_000);
  });

  test("320/375/390/640/768/1280 não criam rolagem horizontal", async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Matriz única em 1280 px.");
    const user = await authenticate(context);
    await seedHangulProgress(context, user.id);
    // 640 px de largura CSS equivale a 200% de zoom numa janela de 1280 px.
    for (const width of [320, 375, 390, 640, 768, 1280]) {
      await page.setViewportSize({ width, height: width < 768 ? 667 : 900 });
      for (const path of ["/", "/cursos", "/hangul", "/hangul/h04", "/revisao"]) {
        await page.goto(path);
        await noOverflow(page, `${path} em ${width}px`);
      }

      await page.goto("/hangul/h21");
      await expect(page.getByRole("heading", { level: 1, name: /Ligação/ })).toBeVisible();
      await noOverflow(page, `/hangul/h21 em ${width}px`);

      await page.goto("/hangul/h16");
      await page.getByRole("button", { name: "Refazer lição" }).click();
      await expect(page.getByText("Bancada de composição")).toBeVisible();
      await noOverflow(page, `/hangul/h16 (prática) em ${width}px`);

      const undersized = await page.evaluate(() => {
        const targets = Array.from(
          document.querySelectorAll(
            "article button[aria-pressed], article button:not([disabled])",
          ),
        ).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        return targets
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: (element.getAttribute("aria-label") ?? element.textContent ?? "")
                .trim()
                .slice(0, 40),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((target) => target.width < 44 || target.height < 44);
      });
      expect(undersized, `alvos de toque em ${width}px`).toEqual([]);

      if (width === 320) {
        await page.goto("/hangul/h04");
        await page.getByRole("button", { name: "Refazer lição" }).click();
        await advanceToTextAnswer(page);
        const input = page.locator("#resposta");
        await expect(input).toBeVisible();
        const field = await input.evaluate((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return {
            fontSize: Number.parseFloat(style.fontSize),
            height: rect.height,
          };
        });
        expect(field.fontSize, "fonte do campo em 320 px").toBeGreaterThanOrEqual(16);
        expect(field.height, "altura do campo em 320 px").toBeGreaterThanOrEqual(44);
      }
    }
  });
});
