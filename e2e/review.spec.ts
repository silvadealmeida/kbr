import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();

type Seed = {
  cards: Record<string, { box: number; due: string }>;
  lessons?: Record<string, { done: boolean; score: number }>;
  history?: { exerciseId: string; correct: boolean; at: string }[];
};

function progress(seed: Seed) {
  return {
    v: 1,
    lessons: seed.lessons ?? {},
    cards: seed.cards,
    history: seed.history ?? [],
    streak: 0,
    dailyGoal: 10,
    lastActive: "2020-01-01T00:00:00.000Z",
  };
}

async function authenticate(
  context: BrowserContext,
  user?: ReturnType<typeof createTestUser>,
) {
  const existing = sessions.get(context);
  if (existing && !user) return existing.user;

  const account = user ?? createTestUser();
  sessions.set(context, {
    user: account,
    storageKey: `kbr:user:${account.id}:v1`,
  });
  await context.addCookies([{ ...testAuthCookie(Date.now(), account), url: BASE_URL }]);
  return account;
}

function storageKeyFor(context: BrowserContext) {
  const session = sessions.get(context);
  if (!session) throw new Error("Autentique o contexto antes de semear o progresso.");
  return session.storageKey;
}

async function seedProgress(context: BrowserContext, seed: Seed) {
  await context.addInitScript(
    ({ key, value }) => {
      try {
        if (window.sessionStorage.getItem("kbr:e2e:review-seeded") === "1") return;
        window.localStorage.setItem(key, JSON.stringify(value));
        window.sessionStorage.setItem("kbr:e2e:review-seeded", "1");
      } catch {
        /* documento sem origem utilizável (about:blank) */
      }
    },
    { key: storageKeyFor(context), value: progress(seed) },
  );
}

async function readProgress(page: Page) {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, storageKeyFor(page.context()));
}

async function chooseCorrectWord(page: Page) {
  const option = page.getByRole("group", { name: "Alternativas" }).getByRole("button", {
    name: "carne",
  });
  const box = await option.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  await option.click();
}

test.describe("Revisão autenticada", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("mostra estado vazio sem inventar cartões", async ({ page }) => {
    await page.goto("/revisao");

    await expect(page.getByRole("heading", { level: 1, name: "Revisão" })).toBeVisible();
    await expect(page.getByText("Nada para revisar agora")).toBeVisible();
    await expect(page.getByText("Você ainda não tem cartões de revisão.")).toBeVisible();
    await expect(page.getByRole("button", { name: /Começar revisão/ })).toHaveCount(0);
    const back = page.getByRole("link", { name: "Voltar ao painel" });
    await expect(back).toBeVisible();
    const backBox = await back.boundingBox();
    expect(backBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });

  test("revisa com teclado, avança o Leitner e mantém o progresso após recarregar", async ({
    page,
  }) => {
    await seedProgress(page.context(), {
      cards: {
        "h:word:고기": { box: 3, due: "2020-01-01T00:00:00.000Z" },
        "h:jamo:v:ㅏ": { box: 1, due: "2020-01-02T00:00:00.000Z" },
      },
      lessons: { h01: { done: true, score: 100 } },
    });

    await page.goto("/revisao");

    await expect(page.getByText("Há 2 cartões para revisar.")).toBeVisible();
    const start = page.getByRole("button", { name: "Começar revisão (2)" });
    const startBox = await start.boundingBox();
    expect(startBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    await start.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText("Palavra · 1 de 2")).toBeVisible();
    await expect(page.getByText("Qual é o nome deste jamo?")).toHaveCount(0);

    const wordOption = page.getByRole("group", { name: "Alternativas" }).getByRole("button", {
      name: "carne",
    });
    await wordOption.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: "Mostrar resposta" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText("Jamo · 2 de 2")).toBeVisible();
    const jamoOption = page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "아" });
    await jamoOption.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: "Mostrar resposta" }).focus();
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: "Concluir revisão" }).focus();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("heading", { level: 1, name: "Revisão concluída" }),
    ).toBeVisible();
    await expect(page.getByText("Você revisou 2 cartões: 2 acertos e 0 erros.")).toBeVisible();

    await expect
      .poll(async () => {
        const stored = await readProgress(page);
        return {
          wordBox: stored?.cards?.["h:word:고기"]?.box,
          jamoBox: stored?.cards?.["h:jamo:v:ㅏ"]?.box,
          history: stored?.history?.length,
          lesson: stored?.lessons?.h01,
        };
      })
      .toEqual({
        wordBox: 4,
        jamoBox: 2,
        history: 2,
        lesson: { done: true, score: 100 },
      });

    await page.reload();
    await expect(page.getByText("Nada para revisar agora")).toBeVisible();
    await expect(page.getByText("Seu próximo cartão vence em")).toBeVisible();
    await expect
      .poll(async () => {
        const stored = await readProgress(page);
        return [stored?.history?.length, stored?.lessons?.h01?.done];
      })
      .toEqual([2, true]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });

  test("erra, revela a resposta e rebaixa o cartão sem apagar a lição", async ({ page }) => {
    await seedProgress(page.context(), {
      cards: { "h:word:고기": { box: 4, due: "2020-01-01T00:00:00.000Z" } },
      lessons: { h05: { done: true, score: 80 } },
    });

    await page.goto("/revisao");
    await page.getByRole("button", { name: "Começar revisão (1)" }).click();

    const options = page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button");
    const count = await options.count();
    let selected = false;
    for (let index = 0; index < count; index += 1) {
      const text = await options.nth(index).innerText();
      if (!text.includes("carne")) {
        await options.nth(index).click();
        selected = true;
        break;
      }
    }
    expect(selected).toBe(true);

    await expect(page.getByRole("button", { name: "Mostrar resposta" })).toBeVisible();
    await expect(page.getByText(/Resposta correta:/)).toHaveCount(0);
    await page.getByRole("button", { name: "Mostrar resposta" }).click();

    const feedback = page.getByRole("status").filter({ hasText: "Não foi dessa vez." });
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText("Resposta correta:");
    await expect(feedback).toContainText("carne");

    await page.getByRole("button", { name: "Concluir revisão" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Revisão concluída" }),
    ).toBeVisible();
    await expect(page.getByText("Você revisou 1 cartão: 0 acertos e 1 erro.")).toBeVisible();

    await expect
      .poll(async () => {
        const stored = await readProgress(page);
        const state = stored?.cards?.["h:word:고기"];
        return {
          box: state?.box,
          dueInFuture: Date.parse(state?.due ?? "") > Date.now(),
          history: stored?.history?.length,
          lesson: stored?.lessons?.h05,
        };
      })
      .toEqual({
        box: 1,
        dueInFuture: true,
        history: 1,
        lesson: { done: true, score: 80 },
      });
  });

  test("clique duplo em Conferir registra uma revisão só", async ({ page }) => {
    await seedProgress(page.context(), {
      cards: { "h:word:고기": { box: 2, due: "2020-01-01T00:00:00.000Z" } },
    });

    await page.goto("/revisao");
    await page.getByRole("button", { name: "Começar revisão (1)" }).click();
    await chooseCorrectWord(page);

    const submit = page.getByRole("button", { name: "Mostrar resposta" });
    await submit.evaluate((element) => {
      (element as HTMLElement).click();
      (element as HTMLElement).click();
    });

    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await expect
      .poll(async () => {
        const stored = await readProgress(page);
        const reviewAttempts = stored?.history?.filter((attempt: { exerciseId: string }) =>
          attempt.exerciseId.startsWith("review:"),
        );
        return {
          attempts: reviewAttempts?.length,
          box: stored?.cards?.["h:word:고기"]?.box,
        };
      })
      .toEqual({ attempts: 1, box: 3 });
  });

  test("falha de sincronização mantém a revisão local e não anuncia sucesso", async ({
    page,
  }) => {
    await seedProgress(page.context(), {
      cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } },
    });
    await page.route("**/rest/v1/**", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "offline" }),
      }),
    );

    await page.goto("/revisao");
    await expect(
      page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
    ).toBeVisible();
    await expect(page.getByText("Progresso sincronizado com sua conta.")).toHaveCount(0);

    await page.getByRole("button", { name: "Começar revisão (1)" }).click();
    await chooseCorrectWord(page);
    await page.getByRole("button", { name: "Mostrar resposta" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await expect(
      page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
    ).toBeVisible();

    await expect
      .poll(async () => {
        const stored = await readProgress(page);
        return stored?.cards?.["h:word:고기"]?.box;
      })
      .toBe(2);
  });
});
