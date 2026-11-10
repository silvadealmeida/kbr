import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();
const ALL_LESSON_IDS = Array.from({ length: 25 }, (_, index) =>
  `h${String(index + 1).padStart(2, "0")}`,
);
const ALL_CHECKPOINT_IDS = ["c1", "c2", "c3", "c4"];

type Seed = {
  lessons?: Record<string, { done: boolean; score: number }>;
  cards?: Record<string, { box: number; due: string }>;
  history?: { exerciseId: string; correct: boolean; at: string }[];
};

function progress(seed: Seed) {
  return {
    v: 1,
    lessons: seed.lessons ?? {},
    cards: seed.cards ?? {},
    history: seed.history ?? [],
    streak: 0,
    dailyGoal: 10,
    lastActive: "2020-01-01T00:00:00.000Z",
  };
}

function lessonProgress(ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, { done: true, score: 100 }]));
}

function daysAgo(days: number, hour = 10): string {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - days,
    hour,
  ).toISOString();
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
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* documento sem origem utilizável (about:blank) */
      }
    },
    { key: storageKeyFor(context), value: progress(seed) },
  );
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

test.describe("Painel autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("mostra o estado inicial sem inventar progresso", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
    await expect(page.getByText("Hangul · Pré-A1")).toBeVisible();
    await expect(page.getByText("0% do curso")).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Progresso geral do curso Hangul" }),
    ).toHaveAttribute("aria-valuenow", "0");
    await expect(page.getByText("0 de 25")).toBeVisible();
    await expect(page.getByText("0 de 4")).toBeVisible();

    await expect(page.getByText("Comece por aqui")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Próxima lição: h01" }),
    ).toBeVisible();
    const start = page.getByRole("link", { name: "Começar pelo h01" });
    await expect(start).toHaveAttribute("href", "/hangul/h01");

    await expect(
      page.getByText(
        "Nada vencido agora. Você ainda não tem cartões de revisão: erros nas lições e checkpoints criam cartões automaticamente.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Ainda não há cartões de revisão. Um erro em lição ou checkpoint cria cartões na caixa 1."),
    ).toBeVisible();
    await expect(
      page.getByText("Nenhuma resposta registrada ainda. Comece pelo h01 para ver seu histórico aqui."),
    ).toBeVisible();

    const stats = page.getByRole("region", { name: "Estatísticas de aprendizagem" });
    await expect(stats).toContainText("0 tentativas no histórico");
    await expect(stats).toContainText("Exercícios únicos");
    await expect(stats).toContainText("Ainda sem respostas avaliadas");

    await expectNoHorizontalOverflow(page);
  });

  test("resume progresso parcial, estatísticas e a fila de revisão", async ({ page }) => {
    await seedProgress(page.context(), {
      lessons: lessonProgress(ALL_LESSON_IDS.slice(0, 10)),
      cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } },
      history: [
        { exerciseId: "h01-e01", correct: true, at: daysAgo(2) },
        { exerciseId: "h01-e01", correct: false, at: daysAgo(1) },
        { exerciseId: "h01-e02", correct: true, at: daysAgo(0) },
        { exerciseId: "review:h:word:고기", correct: true, at: daysAgo(1) },
      ],
    });

    await page.goto("/dashboard");

    await expect(page.getByText("34% do curso")).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Progresso geral do curso Hangul" }),
    ).toHaveAttribute("aria-valuenow", "34");
    await expect(page.getByText("10 de 25")).toBeVisible();
    await expect(page.getByText("0 de 4")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Próximo checkpoint: c1" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar c1" })).toHaveAttribute(
      "href",
      "/hangul/c1",
    );

    await expect(page.getByText("1 vencido", { exact: true })).toBeVisible();
    await expect(
      page.getByText(
        "1 cartão entra nesta sessão. Todos os cartões vencidos cabem na sessão.",
      ),
    ).toBeVisible();
    await expect(page.getByText("1 antes de hoje · 0 vencem hoje.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Revisar 1 cartão" })).toHaveAttribute(
      "href",
      "/revisao",
    );

    const stats = page.getByRole("region", { name: "Estatísticas de aprendizagem" });
    await expect(stats).toContainText("4 tentativas no histórico");
    await expect(stats).toContainText("2 acertos de 3");
    await expect(stats).toContainText("67%");
    await expect(stats).toContainText("1 acertos · 1 cartão(ões)");
    await expect(stats).toContainText("3 dias");
    await expect(stats).toContainText("Maior sequência: 3 dias");
    await expect(stats).toContainText("Hoje: 1 resposta");
    await expect(stats).toContainText("Lições praticadas");

    const activity = page.getByRole("region", { name: "Atividade recente" });
    await expect(activity).toContainText("h01 · Um alfabeto desenhado a partir da boca");
    await expect(activity).toContainText("Palavra · 고기");
    await expect(activity).toContainText("Acertou");
    await expect(activity).toContainText("Errou");
    await expect(activity.getByRole("time")).toHaveCount(4);

    const srs = page.getByRole("region", { name: "Cartões por caixa Leitner" });
    await expect(srs).toContainText("Caixa 1");
    await expect(srs).toContainText("Caixa 5");
    await expect(srs).toContainText("1 vencido(s) · 1 antes de hoje · 0 hoje.");

    await expectNoHorizontalOverflow(page);

    await page.reload();
    await expect(page.getByText("34% do curso")).toBeVisible();
    await expect(page.getByText("4 tentativas no histórico")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar c1" })).toBeVisible();
  });

  test("mostra o curso concluído sem prometer CEFR A1", async ({ page }) => {
    await seedProgress(page.context(), {
      lessons: lessonProgress([...ALL_LESSON_IDS, ...ALL_CHECKPOINT_IDS]),
    });

    await page.goto("/dashboard");

    await expect(page.getByText("100% do curso")).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Progresso geral do curso Hangul" }),
    ).toHaveAttribute("aria-valuenow", "100");
    await expect(page.getByText("25 de 25")).toBeVisible();
    await expect(page.getByText("4 de 4")).toBeVisible();
    await expect(page.getByText("Curso concluído")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByText(/CEFR A1\) ainda não está disponível/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Revisar cartões" })).toHaveAttribute(
      "href",
      "/revisao",
    );
    await expect(page.getByText(/Próxima lição|Próximo checkpoint/)).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });

  test("aceita navegação por teclado e alvos de toque grandes", async ({ page }) => {
    await page.goto("/dashboard");

    const start = page.getByRole("link", { name: "Começar pelo h01" });
    const startBox = await start.boundingBox();
    expect(startBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    expect(startBox?.width ?? 0).toBeGreaterThanOrEqual(44);

    const review = page.getByRole("link", { name: "Abrir revisão" });
    const reviewBox = await review.boundingBox();
    expect(reviewBox?.height ?? 0).toBeGreaterThanOrEqual(44);

    await start.focus();
    await expect(start).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/hangul\/h01$/);
  });

  test("mantém o progresso local e avisa quando a sincronização falha", async ({
    page,
  }) => {
    await seedProgress(page.context(), {
      lessons: lessonProgress(["h01"]),
      cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } },
    });
    await page.route("**/rest/v1/**", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "offline" }),
      }),
    );

    await page.goto("/dashboard");

    await expect(
      page.getByText(
        /Salvo neste dispositivo\. A sincronização com sua conta está pendente/,
      ),
    ).toBeVisible();
    await expect(page.getByText("Progresso sincronizado com sua conta.")).toHaveCount(0);
    await expect(page.getByText("3% do curso")).toBeVisible();
    await expect(page.getByText("1 de 25")).toBeVisible();
    await expect(page.getByRole("link", { name: "Revisar 1 cartão" })).toBeVisible();

    await page.reload();
    await expect(page.getByText("1 de 25")).toBeVisible();
    await expect(
      page.getByText(
        /Salvo neste dispositivo\. A sincronização com sua conta está pendente/,
      ),
    ).toBeVisible();
  });
});

test("visitante é enviado ao login antes de ver o painel", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page).toHaveURL(/\/\?next=%2Fdashboard/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coreano de verdade");
  await expect(page.getByText("Seu painel")).toHaveCount(0);
});
