import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";

function accountKey(userId: string) {
  return `kbr:user:${userId}:v1`;
}

async function authenticate(context: BrowserContext, user = createTestUser()) {
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  return user;
}

async function seedProgress(context: BrowserContext, userId: string) {
  await context.addInitScript(
    ({ key, value }) => {
      try {
        if (window.sessionStorage.getItem("kbr:e2e:reliability-seeded") === "1") return;
        window.localStorage.setItem(key, JSON.stringify(value));
        window.sessionStorage.setItem("kbr:e2e:reliability-seeded", "1");
      } catch {
        /* documento sem origem utilizável */
      }
    },
    {
      key: accountKey(userId),
      value: {
        v: 1,
        lessons: {},
        cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } },
        history: [],
        streak: 0,
        dailyGoal: 10,
        lastActive: "2026-11-10T12:00:00.000Z",
      },
    },
  );
}

async function setOnline(page: Page, online: boolean) {
  await page.evaluate((next) => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      get: () => next,
    });
    window.dispatchEvent(new Event(next ? "online" : "offline"));
  }, online);
}

test.describe("Confiabilidade de rede", () => {
  test("aviso de conexão aparece, some e a reconexão escoa a gravação pendente", async ({
    browser,
    page,
  }) => {
    const user = await authenticate(page.context());
    await seedProgress(page.context(), user.id);

    await page.route("**/rest/v1/**", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "offline" }),
      }),
    );
    await page.goto("/revisao");
    // O evento precisa ser disparado no documento já carregado: um `goto`
    // seguinte recriaria `window.navigator` e perderia a simulação.
    await setOnline(page, false);
    await expect(page.getByText("Sem conexão.", { exact: false })).toBeVisible();
    await expect(
      page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
    ).toBeVisible();

    await page.getByRole("button", { name: /Começar revisão/ }).click();
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "carne", exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page.getByRole("button", { name: /Concluir revisão/ }).click();
    await expect(
      page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
    ).toBeVisible();

    // Reconecta sem recarregar: o AuthProvider relê e mescla; o remoto deve
    // receber o cartão avançado mesmo que a pessoa não saia da tela.
    await page.unroute("**/rest/v1/**");
    await setOnline(page, true);
    await expect(page.getByText("Sem conexão.", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Progresso sincronizado com sua conta.")).toBeVisible({
      timeout: 15_000,
    });

    const other = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
      await other.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
      const otherPage = await other.newPage();
      await otherPage.goto("/revisao");
      await expect(otherPage.getByText("Nada para revisar agora")).toBeVisible();
      await expect
        .poll(async () => {
          const raw = await otherPage.evaluate(
            (key) => window.localStorage.getItem(key),
            accountKey(user.id),
          );
          const stored = raw ? JSON.parse(raw) : null;
          return {
            box: stored?.cards?.["h:word:고기"]?.box,
            history: stored?.history?.length,
          };
        })
        .toEqual({ box: 2, history: 1 });
    } finally {
      await other.close();
    }
  });

  test("duplo toque em Conferir na lição registra uma única tentativa", async ({ page }) => {
    await authenticate(page.context());
    await page.goto("/hangul/h01");
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "2 blocos", exact: true })
      .click();
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (candidate) => candidate.textContent?.trim() === "Conferir",
      );
      button?.click();
      button?.click();
    });

    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => {
          const key = Object.keys(window.localStorage).find((name) =>
            /^kbr:user:.*:v1$/.test(name),
          );
          return key ? window.localStorage.getItem(key) : null;
        });
        return raw ? JSON.parse(raw).history?.length : 0;
      })
      .toBe(1);
  });
});
