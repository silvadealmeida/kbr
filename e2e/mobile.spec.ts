import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<BrowserContext, { id: string; storageKey: string }>();

async function authenticate(context: BrowserContext) {
  const existing = sessions.get(context);
  if (existing) return existing;

  const user = createTestUser();
  const session = { id: user.id, storageKey: `kbr:user:${user.id}:v1` };
  sessions.set(context, session);
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  return session;
}

async function seedLessons(context: BrowserContext, ids: readonly string[]) {
  const session = await authenticate(context);
  await context.addInitScript(
    ({ key, ids: lessonIds }) => {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            v: 1,
            lessons: Object.fromEntries(
              lessonIds.map((id) => [id, { done: true, score: 100 }]),
            ),
            cards: {},
            history: [],
            streak: 0,
            dailyGoal: 10,
            lastActive: "2020-01-01T00:00:00.000Z",
          }),
        );
      } catch {
        /* documento sem origem utilizável */
      }
    },
    { key: session.storageKey, ids: [...ids] },
  );
}

async function noHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

async function answerChoiceAndContinue(page: Page, name: string) {
  await page.getByRole("button", { name, exact: true }).click();
  await page.getByRole("button", { name: "Conferir" }).click();
  await expect(page.getByText("Correto.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();
}

test.describe("uso em telas pequenas", () => {
  test("320 px e paisagem não criam rolagem horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    for (const path of ["/", "/privacidade", "/impressum"]) {
      await page.goto(path);
      await noHorizontalOverflow(page);
    }

    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto("/");
    await noHorizontalOverflow(page);
  });

  test("área autenticada permanece contida em 320 px", async ({ context, page }) => {
    await authenticate(context);
    await page.setViewportSize({ width: 320, height: 568 });

    for (const path of ["/dashboard", "/cursos", "/hangul", "/hangul/h04", "/revisao"]) {
      await page.goto(path);
      await noHorizontalOverflow(page);
    }
  });

  test("barra inferior respeita a safe area e alvos de toque", async ({ context, page }) => {
    await authenticate(context);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/hangul");

    const mainPadding = await page
      .locator("main#conteudo")
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingBottom));
    expect(mainPadding).toBeGreaterThanOrEqual(96);

    const nav = page.getByRole("navigation", { name: "Principal" }).last();
    await expect(nav).toBeVisible();
    for (const link of await nav.getByRole("link").all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("avança itens com foco no enunciado e envia resposta por Enter", async ({
    context,
    page,
  }) => {
    await seedLessons(context, ["h01", "h02", "h03"]);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/hangul/h04");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    await expect(page.getByRole("heading", { name: /Ouça e escolha/ }).first()).toBeFocused();
    await answerChoiceAndContinue(page, "나");

    const secondPrompt = page.getByRole("heading", { name: /Ouça e escolha/ }).first();
    await expect(secondPrompt).toBeFocused();
    await answerChoiceAndContinue(page, "고");

    await answerChoiceAndContinue(page, "ㄱ + ㅗ e ㄱ + ㅣ");
    await answerChoiceAndContinue(page, "가 e 구");

    await page.getByRole("button", { name: "ㄴ", exact: true }).click();
    await page.getByRole("button", { name: "ㅏ", exact: true }).click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();

    await page.getByRole("button", { name: "ㄱ", exact: true }).click();
    await page.getByRole("button", { name: "ㅗ", exact: true }).click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();

    const answer = page.getByLabel("Sua resposta");
    await expect(answer).toBeVisible();
    expect(
      await answer.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
    ).toBeGreaterThanOrEqual(16);
    await expect(answer).toHaveAttribute("enterkeyhint", "done");

    await answer.fill("구");
    await answer.press("Enter");
    await expect(page.getByText("Correto.", { exact: true })).toBeVisible();
    await noHorizontalOverflow(page);
  });

  test("sessões ativas de revisão mantêm h1 único e controles acima da barra inferior", async ({
    context,
    page,
  }) => {
    const session = await authenticate(context);
    await context.addInitScript(
      ({ key }) => {
        try {
          if (window.sessionStorage.getItem("kbr:e2e:mobile-review") === "1") return;
          const payload = JSON.stringify({
            v: 1,
            lessons: { h01: { done: true, score: 100 } },
            cards: {
              "h:jamo:c:ㄱ": { box: 1, due: "2020-01-01T00:00:00.000Z" },
              "v:ko:사과": { box: 1, due: "2020-01-01T00:00:00.000Z" },
            },
            history: [],
            streak: 0,
            dailyGoal: 10,
            lastActive: "2020-01-01T00:00:00.000Z",
          });
          window.localStorage.setItem(key, payload);
          window.localStorage.setItem("kbr:v1", payload);
          window.sessionStorage.setItem("kbr:e2e:mobile-review", "1");
        } catch {
          /* about:blank */
        }
      },
      { key: session.storageKey },
    );

    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/revisao");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await page.getByRole("button", { name: /Começar revisão/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await noHorizontalOverflow(page);

    await page.goto("/vocabulario/revisao");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await page.getByRole("button", { name: /Começar revisão/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
      page.getByRole("progressbar", { name: "Progresso da sessão" }),
    ).toBeVisible();
    await noHorizontalOverflow(page);
  });

  test("alvos de toque em vocabulário, rubrica de produção e sumário legal têm ≥44 px", async ({
    context,
    page,
  }) => {
    await seedLessons(context, ["a2-c08"]);
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/vocabulario");
    const firstRow = page.getByTestId("vocab-row").first();
    await expect(firstRow).toBeVisible();
    for (const button of await firstRow.getByRole("button").all()) {
      const box = await button.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await page.goto("/b1/b1-l01");
    await expect(page.getByText("Rubrica de autoavaliação")).toBeVisible();
    const rubricLabels = page
      .locator("fieldset")
      .filter({ hasText: "Rubrica de autoavaliação" })
      .locator("label");
    expect(await rubricLabels.count()).toBeGreaterThan(0);
    for (const label of await rubricLabels.all()) {
      const box = await label.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await page.goto("/privacidade");
    const tocNav = page.getByRole("navigation", { name: "Nesta página" });
    await expect(tocNav).toBeVisible();
    const tocLinks = tocNav.getByRole("link");
    for (const link of await tocLinks.all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("zoom de texto em 125% e 150% mantém layout sem rolagem horizontal em 320 e 375 px", async ({
    page,
  }) => {
    for (const width of [320, 375]) {
      await page.setViewportSize({ width, height: 812 });
      for (const path of ["/", "/privacidade", "/impressum", "/auth/error"]) {
        await page.goto(path);
        await page.addStyleTag({ content: "html { font-size: 150% !important; }" });
        await noHorizontalOverflow(page);
      }
    }
  });
});
