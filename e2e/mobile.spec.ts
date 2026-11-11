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
});
