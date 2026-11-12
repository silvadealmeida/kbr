import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();
const LESSON_IDS = Array.from({ length: 25 }, (_, index) =>
  `h${String(index + 1).padStart(2, "0")}`,
);
const CHECKPOINT_IDS = ["c1", "c2", "c3", "c4"];
const ALL_STEP_IDS = [...LESSON_IDS, ...CHECKPOINT_IDS];

function lessonProgress(ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, { done: true, score: 100 }]));
}

function progress(lessons: Record<string, { done: boolean; score: number }>) {
  return {
    v: 1,
    lessons,
    cards: {},
    history: [],
    streak: 0,
    dailyGoal: 10,
    lastActive: "2020-01-01T00:00:00.000Z",
  };
}

async function authenticate(context: BrowserContext) {
  const account = createTestUser();
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

async function seedProgress(
  context: BrowserContext,
  lessons: Record<string, { done: boolean; score: number }>,
) {
  await context.addInitScript(
    ({ key, value }) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* documento sem origem utilizável */
      }
    },
    { key: storageKeyFor(context), value: progress(lessons) },
  );
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

test.describe("Catálogo de cursos autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("mostra Hangul disponível e A1–C2 como planejados, sem links falsos", async ({
    page,
  }) => {
    await page.goto("/cursos");

    await expect(page.getByRole("heading", { level: 1, name: "Cursos" })).toBeVisible();
    await expect(page.getByText("Pré-A1 · Curso disponível")).toBeVisible();
    await expect(page.getByText("Índice de curso")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hangul", exact: false }).first()).toBeVisible();
    await expect(page.getByText("0 de 29 passos concluídos.")).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Progresso no curso Hangul" }),
    ).toHaveAttribute("aria-valuenow", "0");

    await expect(page.getByRole("heading", { name: "Em planejamento" })).toBeVisible();
    await expect(page.getByText("CEFR A1", { exact: true })).toBeVisible();
    await expect(page.getByText("CEFR C2", { exact: true })).toBeVisible();
    await expect(page.getByText("Planejado · indisponível")).toHaveCount(6);

    await expect(
      page.getByText(/Concluir um curso no KBR não emite certificado CEFR/),
    ).toBeVisible();

    const plannedSection = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Em planejamento" }),
    });
    await expect(plannedSection.getByRole("link")).toHaveCount(0);

    const stepLinks = await page
      .locator("main a[href^='/hangul/']")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(stepLinks).toContain("/hangul/h01");
    for (const href of stepLinks) {
      expect(ALL_STEP_IDS).toContain(href!.split("/").at(-1));
    }

    await expectNoHorizontalOverflow(page);
  });

  test("progresso parcial aponta para o próximo passo real", async ({ context, page }) => {
    await seedProgress(context, lessonProgress([...LESSON_IDS.slice(0, 10), "c1"]));
    await page.goto("/cursos");

    await expect(page.getByText("38% concluído")).toBeVisible();
    await expect(page.getByText("11 de 29 passos concluídos.")).toBeVisible();
    await expect(page.getByText("Próximo passo:")).toBeVisible();
    await expect(page.getByText("h11 · ㅑ ㅕ ㅛ ㅠ")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar h11" })).toHaveAttribute(
      "href",
      "/hangul/h11",
    );

    const box = await page.getByRole("link", { name: "Abrir curso" }).boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test("curso concluído não vira certificação CEFR nem libera A1", async ({
    context,
    page,
  }) => {
    await seedProgress(context, lessonProgress(ALL_STEP_IDS));
    await page.goto("/cursos");

    await expect(page.getByText("Curso concluído")).toBeVisible();
    await expect(page.getByText("29 de 29 passos concluídos.")).toBeVisible();
    await expect(page.getByText(/não é certificação CEFR/)).toBeVisible();
    await expect(page.getByText(/não desbloqueia o A1/)).toBeVisible();
    await expect(page.getByText("Planejado · indisponível")).toHaveCount(6);
    await expect(page.getByRole("link", { name: /Continuar/ })).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });
});

test("visitante não acessa o catálogo", async ({ page }) => {
  await page.goto("/cursos");
  await expect(page).toHaveURL(/\/?next=%2Fcursos/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Coreano de verdade",
  );
});

test("rota legada de lições redireciona para o catálogo autenticado", async ({
  context,
  page,
}) => {
  await authenticate(context);
  await page.goto("/licoes");
  await expect(page).toHaveURL(/\/cursos$/);
  await expect(page.getByRole("heading", { level: 1, name: "Cursos" })).toBeVisible();
});
