import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();
const HANGUL_LESSON_IDS = Array.from({ length: 25 }, (_, index) =>
  `h${String(index + 1).padStart(2, "0")}`,
);
const HANGUL_ALL_STEPS = [...HANGUL_LESSON_IDS, "c1", "c2", "c3", "c4"];
const A1_ALL_STEPS = [
  ...Array.from({ length: 40 }, (_, index) =>
    `a1-l${String(index + 1).padStart(2, "0")}`,
  ),
  ...Array.from({ length: 8 }, (_, index) =>
    `a1-c${String(index + 1).padStart(2, "0")}`,
  ),
];

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

  test("mostra Hangul, A1, A2 e B1 disponíveis e C1–C2 planejados, sem links falsos", async ({
    page,
  }) => {
    await page.goto("/cursos");

    await expect(page.getByRole("heading", { level: 1, name: "Cursos" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Disponíveis agora" })).toBeVisible();
    await expect(page.getByText("Pré-A1 · Curso disponível")).toBeVisible();
    await expect(page.getByText("A1 · Curso disponível", { exact: true })).toBeVisible();
    await expect(page.getByText("A2 · Curso disponível", { exact: true })).toBeVisible();
    await expect(page.getByText("B1 · Curso disponível", { exact: true })).toBeVisible();
    await expect(page.getByText("0 de 29 passos concluídos.")).toBeVisible();
    const a1Plate = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { name: "Coreano A1" }) });
    const a2Plate = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { name: "Coreano A2" }) });
    const b1Plate = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { name: "Coreano B1" }) });
    await expect(a1Plate.getByText("0 de 48 passos concluídos.")).toBeVisible();
    await expect(a2Plate.getByText("0 de 48 passos concluídos.")).toBeVisible();
    await expect(b1Plate.getByText("0 de 48 passos concluídos.")).toBeVisible();
    await expect(a2Plate.getByText("Requer o nível anterior")).toBeVisible();
    await expect(b1Plate.getByText("Requer o nível anterior")).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: "Progresso no curso Hangul" }),
    ).toHaveAttribute("aria-valuenow", "0");
    await expect(
      page.getByRole("progressbar", { name: "Progresso no curso Coreano A1" }),
    ).toHaveAttribute("aria-valuenow", "0");
    await expect(
      page.getByRole("progressbar", { name: "Progresso no curso Coreano A2" }),
    ).toHaveAttribute("aria-valuenow", "0");
    await expect(
      page.getByRole("progressbar", { name: "Progresso no curso Coreano B1" }),
    ).toHaveAttribute("aria-valuenow", "0");
    await expect(page.getByText("Em desenvolvimento")).toHaveCount(0);
    await expect(page.getByText("1 de 40")).toHaveCount(0);
    await expect(page.getByText("Parcial")).toHaveCount(0);

    await expect(
      page.locator("main a[href='/hangul/h01']"),
    ).toHaveCount(1);
    await expect(
      page.locator("main a[href='/a1/a1-l01']"),
    ).toHaveCount(1);
    await expect(page.locator("main a[href='/a2/a2-l01']")).toHaveCount(0);
    await expect(page.locator("main a[href='/b1/b1-l01']")).toHaveCount(0);

    await expect(page.getByRole("heading", { name: "Em planejamento" })).toBeVisible();
    await expect(page.getByText("CEFR B2", { exact: true })).toBeVisible();
    await expect(page.getByText("CEFR C1", { exact: true })).toBeVisible();
    await expect(page.getByText("CEFR C2", { exact: true })).toBeVisible();
    await expect(page.getByText("Planejado · indisponível")).toHaveCount(3);
    await expect(
      page.getByText(/Concluir um curso no KBR não emite certificado CEFR/),
    ).toBeVisible();

    const plannedSection = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Em planejamento" }),
    });
    await expect(plannedSection.getByRole("link")).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });

  test("A1 parcial aponta para o próximo passo real", async ({ context, page }) => {
    await seedProgress(context, { "a1-l01": { done: true, score: 90 } });
    await page.goto("/cursos");

    await expect(page.getByText("2% concluído")).toBeVisible();
    await expect(page.getByText("1 de 40")).toBeVisible();
    await expect(page.getByText("1 de 48 passos concluídos.")).toBeVisible();
    await expect(page.getByText("a1-l02 · De onde você é?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar a1-l02" })).toHaveAttribute(
      "href",
      "/a1/a1-l02",
    );
    await expect(page.getByText("Curso concluído")).toHaveCount(0);
  });

  test("A1 completo mostra curso concluído sem certificação CEFR", async ({
    context,
    page,
  }) => {
    await seedProgress(context, lessonProgress(A1_ALL_STEPS));
    await page.goto("/cursos");

    const a1Plate = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { name: "Coreano A1" }) });
    await expect(a1Plate.getByText("Curso concluído")).toBeVisible();
    await expect(a1Plate.getByText("40 de 40")).toBeVisible();
    await expect(a1Plate.getByText("8 de 8")).toBeVisible();
    await expect(a1Plate.getByText("48 de 48 passos concluídos.")).toBeVisible();
    await expect(a1Plate.getByText(/não é certificação CEFR/)).toBeVisible();
    await expect(a1Plate.getByText(/libera a entrada do A2 neste app/)).toBeVisible();
    await expect(a1Plate.getByRole("link", { name: /Continuar/ })).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });

  test("Hangul completo não vira certificação CEFR nem desbloqueia o A1", async ({
    context,
    page,
  }) => {
    await seedProgress(context, lessonProgress(HANGUL_ALL_STEPS));
    await page.goto("/cursos");

    await expect(page.getByText("29 de 29 passos concluídos.")).toBeVisible();
    await expect(page.getByText(/não desbloqueia o A1 automaticamente/)).toBeVisible();
    const a1Plate = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { name: "Coreano A1" }) });
    await expect(a1Plate.getByText("0 de 48 passos concluídos.")).toBeVisible();
    await expect(page.getByText("Planejado · indisponível")).toHaveCount(3);
    await expect(page.getByRole("link", { name: "Continuar h01" })).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
  });

  test("progresso parcial do Hangul continua apontando para h11", async ({
    context,
    page,
  }) => {
    await seedProgress(context, lessonProgress([...HANGUL_LESSON_IDS.slice(0, 10), "c1"]));
    await page.goto("/cursos");

    await expect(page.getByText("38% concluído")).toBeVisible();
    await expect(page.getByText("h11 · ㅑ ㅕ ㅛ ㅠ")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuar h11" })).toHaveAttribute(
      "href",
      "/hangul/h11",
    );

    const box = await page.getByRole("link", { name: "Abrir curso" }).first().boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
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
