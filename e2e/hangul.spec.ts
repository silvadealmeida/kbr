import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();

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

function accountKey(context: BrowserContext) {
  const session = sessions.get(context);
  if (!session) throw new Error("Autentique o contexto antes de semear o progresso.");
  return session.storageKey;
}

test.describe("Hangul autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("lista lições disponíveis e bloqueadas sem overflow em 375 px", async ({
    page,
  }) => {
    await page.goto("/hangul");

    await expect(
      page.getByRole("heading", { level: 1, name: "Aprender Hangul" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /h01.*Um alfabeto desenhado/ }),
    ).toBeVisible();
    await expect(page.getByText("Após h01", { exact: true })).toBeVisible();
    await expect(page.getByText("Em breve")).toHaveCount(0);
    await expect(
      page.getByText("Após h01–h25", { exact: true }),
    ).toBeVisible();

    const lessonLink = page.getByRole("link", {
      name: /h01.*Um alfabeto desenhado/,
    });
    const box = await lessonLink.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("faz a lição h01 com teclado e persiste após recarregar", async ({
    page,
  }) => {
    await page.goto("/hangul/h01");

    await expect(
      page.getByRole("heading", { level: 1, name: /Um alfabeto/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Objetivos" }),
    ).toBeVisible();
    await expect(page.getByText("Conteúdo em revisão")).toBeVisible();

    const start = page.getByRole("button", { name: "Começar a prática" });
    const startBox = await start.boundingBox();
    expect(startBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    await start.click();

    const answers = [
      "2 blocos",
      "Verdadeiro",
      "Falso",
      "Na posição medial, à direita ou embaixo da consoante inicial",
      "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
      "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
    ];

    for (const [index, answer] of answers.entries()) {
      const option = page.getByRole("button", {
        name: new RegExp(answer.slice(0, 24)),
      });
      await option.focus();
      await page.keyboard.press("Enter");
      await expect(option).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("button", { name: "Conferir" }).focus();
      await page.keyboard.press("Enter");

      await expect(
        page.getByRole("status").filter({ hasText: "Correto." }),
      ).toBeVisible();

      const action =
        index === answers.length - 1 ? "Concluir lição" : "Continuar";
      await page.getByRole("button", { name: action }).click();
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Lição concluída" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 6 de 6 (100%).")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.h01?.score : null;
        }, accountKey(page.context())),
      )
      .toBe(100);

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: /Um alfabeto/ }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Refazer lição" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo: h02/ })).toBeVisible();
    await expect(page.getByText("Seu melhor resultado registrado é 100%.")).toBeVisible();

    await page.goto("/hangul");
    await expect(page.getByText("Concluída · 100%")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /h02.*ㅏ ㅓ ㅗ ㅜ/ }),
    ).toBeVisible();
  });

  test("mostra feedback de resposta incorreta em h02", async ({ page }) => {
    await page.goto("/hangul/h01");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    const answers = [
      "2 blocos",
      "Verdadeiro",
      "Falso",
      "Na posição medial, à direita ou embaixo da consoante inicial",
      "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
      "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
    ];
    for (const [index, answer] of answers.entries()) {
      await page
        .getByRole("button", { name: new RegExp(answer.slice(0, 24)) })
        .click();
      await page.getByRole("button", { name: "Conferir" }).click();
      await page
        .getByRole("button", {
          name: index === answers.length - 1 ? "Concluir lição" : "Continuar",
        })
        .click();
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Lição concluída" }),
    ).toBeVisible();

    await page.goto("/hangul/h02");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    await page.getByRole("button", { name: "어" }).click();
    await page.getByRole("button", { name: "Conferir" }).click();

    const feedback = page.getByRole("status").filter({ hasText: "Ainda não." });
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText("아");
    await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();
  });
});

const COMPLETED_LESSONS = Array.from(
  { length: 10 },
  (_, index) => `h${String(index + 1).padStart(2, "0")}`,
);
const COMPLETED_THROUGH_C1 = [...COMPLETED_LESSONS, "c1"];
const COMPLETED_THROUGH_H15 = [
  ...Array.from(
    { length: 15 },
    (_, index) => `h${String(index + 1).padStart(2, "0")}`,
  ),
  "c1",
];

async function seedCompletedLessons(
  page: import("@playwright/test").Page,
  lessonIds: readonly string[] = COMPLETED_LESSONS,
) {
  // O init script roda antes do app carregar: o progresso semeado já está no
  // localStorage quando a sincronização inicial começa. O marcador de sessão
  // evita sobrescrever o progresso em navegações e reloads seguintes.
  await page.addInitScript(
    ({ key, ids }) => {
      try {
        if (window.sessionStorage.getItem("kbr:e2e:hangul-seeded") === "1") return;
        const lessons = Object.fromEntries(
          ids.map((id) => [id, { done: true, score: 100 }]),
        );
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
        window.sessionStorage.setItem("kbr:e2e:hangul-seeded", "1");
      } catch {
        /* documento sem origem utilizável (about:blank) */
      }
    },
    { key: accountKey(page.context()), ids: lessonIds },
  );
  await page.goto("/hangul");
}

type CheckpointStep =
  | { kind: "choice"; name: string | RegExp }
  | { kind: "build"; initial: string; medial: string };

const CHECKPOINT_STEPS: CheckpointStep[] = [
  { kind: "choice", name: "고" },
  { kind: "choice", name: "어" },
  { kind: "choice", name: "까" },
  { kind: "choice", name: "씨" },
  { kind: "choice", name: /ㄲ \(tensa\)/ },
  { kind: "choice", name: /ㅌ \(aspirada\)/ },
  { kind: "choice", name: /ㅃ \(tensa\)/ },
  { kind: "choice", name: /ㅉ \(tensa\)/ },
  { kind: "choice", name: "carne" },
  { kind: "choice", name: "país" },
  { kind: "choice", name: "hipopótamo" },
  { kind: "choice", name: "café (bebida)" },
  { kind: "choice", name: "papai" },
  { kind: "choice", name: "ser barato" },
  { kind: "build", initial: "ㄱ", medial: "ㅏ" },
  { kind: "build", initial: "ㅋ", medial: "ㅗ" },
  { kind: "build", initial: "ㅃ", medial: "ㅜ" },
  { kind: "choice", name: "ㅈ + ㅣ e ㄷ + ㅗ" },
  { kind: "choice", name: "3 blocos" },
  { kind: "choice", name: "ㅆ" },
];

test.describe("Checkpoint c1 autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("c1 fica bloqueado até h01–h10 serem concluídas", async ({ page }) => {
    await page.goto("/hangul");
    await expect(page.getByText("Após h01–h10")).toBeVisible();

    await page.goto("/hangul/c1");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 1/ }),
    ).toBeVisible();
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText(/Lições do escopo: h01/)).toBeVisible();
    await expect(page.getByText(/Checkpoints anteriores:/)).toHaveCount(0);
  });

  test("c1 abre no ponto certo e registra 100% ao refazer", async ({
    page,
  }) => {
    await seedCompletedLessons(page);

    await page.goto("/hangul");
    await expect(
      page.getByRole("link", { name: /c1.*Checkpoint 1/ }),
    ).toBeVisible();

    await page.goto("/hangul/c1");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 1/ }),
    ).toBeVisible();
    await expect(page.getByText("Como funciona")).toBeVisible();

    await page.getByRole("button", { name: "Começar checkpoint" }).click();

    for (const [index, step] of CHECKPOINT_STEPS.entries()) {
      if (step.kind === "choice") {
        await page
          .getByRole("button", {
            name: step.name,
            exact: typeof step.name === "string",
          })
          .first()
          .click();
      } else {
        await page
          .getByRole("button", { name: step.initial, exact: true })
          .first()
          .click();
        await page
          .getByRole("button", { name: step.medial, exact: true })
          .first()
          .click();
      }
      await page.getByRole("button", { name: "Conferir" }).click();
      await expect(
        page.getByRole("status").filter({ hasText: "Correto." }),
      ).toBeVisible();
      await page
        .getByRole("button", {
          name:
            index === CHECKPOINT_STEPS.length - 1
              ? "Concluir checkpoint"
              : "Continuar",
        })
        .click();
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Checkpoint concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 20 de 20 (100%).")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.c1 : null;
        }, accountKey(page.context())),
      )
      .toEqual({ done: true, score: 100 });

    await page.goto("/hangul");
    await expect(page.getByText("Concluído · 100%")).toBeVisible();
  });
});

type C2Step =
  | { kind: "choice"; name: string }
  | { kind: "build"; initial: string; medial: string };

const C2_STEPS: C2Step[] = [
  { kind: "choice", name: "야" },
  { kind: "choice", name: "여" },
  { kind: "choice", name: "과" },
  { kind: "choice", name: "귀" },
  { kind: "choice", name: "왜" },
  { kind: "choice", name: "의" },
  { kind: "choice", name: "거 (ㅓ)" },
  { kind: "choice", name: "그 (ㅡ)" },
  { kind: "choice", name: "새 (ㅐ)" },
  { kind: "choice", name: "웨 (ㅞ)" },
  { kind: "choice", name: "의 (ㅢ)" },
  { kind: "choice", name: "야 (ㅑ)" },
  { kind: "choice", name: "maçã; desculpa" },
  { kind: "choice", name: "raposa" },
  { kind: "choice", name: "relógio" },
  { kind: "choice", name: "empresa" },
  { kind: "choice", name: "médico; médica" },
  { kind: "choice", name: "leite" },
  { kind: "build", initial: "ㄱ", medial: "ㅘ" },
  { kind: "build", initial: "ㅇ", medial: "ㅝ" },
  { kind: "build", initial: "ㅇ", medial: "ㅚ" },
  { kind: "build", initial: "ㅇ", medial: "ㅢ" },
  { kind: "choice", name: "베개" },
  { kind: "choice", name: "돼지" },
];

test.describe("Unidade 5 e checkpoint c2 autenticados", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("h11 fica bloqueada até c1 e responde pelo teclado", async ({
    page,
  }) => {
    await page.goto("/hangul");
    await expect(page.getByText("Após c1", { exact: true })).toBeVisible();

    await seedCompletedLessons(page, COMPLETED_THROUGH_C1);
    await page.goto("/hangul");
    const h11 = page.getByRole("link", { name: /h11.*ㅑ ㅕ ㅛ ㅠ/ });
    await expect(h11).toBeVisible({ timeout: 15_000 });
    const box = await h11.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    await h11.click();

    await expect(
      page.getByRole("heading", { level: 1, name: /ㅑ ㅕ ㅛ ㅠ/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();

    const option = page.getByRole("button", { name: "야", exact: true });
    await option.focus();
    await page.keyboard.press("Enter");
    await expect(option).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Conferir" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("status").filter({ hasText: "Correto." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("c2 fica bloqueado até h01–h15 serem concluídas", async ({ page }) => {
    await page.goto("/hangul");
    await expect(page.getByText("Após h01–h15")).toBeVisible();

    await page.goto("/hangul/c2");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 2/ }),
    ).toBeVisible();
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText(/Lições do escopo: h01/)).toBeVisible();
    await expect(page.getByText(/Checkpoints anteriores: c1/)).toBeVisible();
  });

  test("c2 abre depois de h01–h15 e registra 100%", async ({ page }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_H15);

    await page.goto("/hangul");
    await expect(
      page.getByRole("link", { name: /c2.*Checkpoint 2/ }),
    ).toBeVisible({
      timeout: 15_000,
    });

    await page.goto("/hangul/c2");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 2/ }),
    ).toBeVisible();
    await expect(page.getByText(/19 de 24/)).toBeVisible();
    await page.getByRole("button", { name: "Começar checkpoint" }).click();

    for (const [index, step] of C2_STEPS.entries()) {
      if (step.kind === "choice") {
        await page
          .getByRole("button", { name: step.name, exact: true })
          .first()
          .click();
      } else {
        await page
          .getByRole("button", { name: step.initial, exact: true })
          .first()
          .click();
        await page
          .getByRole("button", { name: step.medial, exact: true })
          .first()
          .click();
      }
      await page.getByRole("button", { name: "Conferir" }).click();
      await expect(
        page.getByRole("status").filter({ hasText: "Correto." }),
      ).toBeVisible();
      await page
        .getByRole("button", {
          name:
            index === C2_STEPS.length - 1 ? "Concluir checkpoint" : "Continuar",
        })
        .click();
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Checkpoint concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 24 de 24 (100%).")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.c2 : null;
        }, accountKey(page.context())),
      )
      .toEqual({ done: true, score: 100 });

    await page.goto("/hangul");
    await expect(page.getByText("Concluído · 100%").last()).toBeVisible();
  });
});

const COMPLETED_THROUGH_C2 = [...COMPLETED_THROUGH_H15, "c2"];
const COMPLETED_THROUGH_H20 = [
  ...Array.from(
    { length: 20 },
    (_, index) => `h${String(index + 1).padStart(2, "0")}`,
  ),
  "c1",
  "c2",
];

type C3Step =
  | { kind: "choice"; name: string }
  | { kind: "build"; initial: string; medial: string; final: string };

const C3_STEPS: C3Step[] = [
  { kind: "choice", name: "강" },
  { kind: "choice", name: "눈" },
  { kind: "choice", name: "엄" },
  { kind: "choice", name: "국 (com batchim)" },
  { kind: "choice", name: "[t̚] — língua no alvéolo, sem soltar ar" },
  { kind: "choice", name: "[p̚] — lábios fechados, sem soltar ar" },
  { kind: "choice", name: "[l] — língua no alvéolo, sem soltar" },
  { kind: "choice", name: "[k̚] — boca fecha, sem soltar ar" },
  { kind: "choice", name: "[m] — lábios fechados" },
  { kind: "choice", name: "[p̚] — lábios fechados, sem soltar ar" },
  { kind: "choice", name: "[n] — nasal alveolar" },
  { kind: "choice", name: "[n] — nasal alveolar" },
  { kind: "choice", name: "[l] — língua no alvéolo, sem soltar" },
  { kind: "choice", name: "[p̚] — lábios fechados, sem soltar ar" },
  { kind: "choice", name: "cachorrinho" },
  { kind: "choice", name: "gato" },
  { kind: "choice", name: "Coreia" },
  { kind: "choice", name: "2 blocos" },
  { kind: "choice", name: "ㄴ e ㄹ" },
  { kind: "choice", name: "cozinha" },
  { kind: "build", initial: "ㄱ", medial: "ㅏ", final: "ㅇ" },
  { kind: "build", initial: "ㄱ", medial: "ㅜ", final: "ㄱ" },
  { kind: "build", initial: "ㄷ", medial: "ㅏ", final: "ㄺ" },
  { kind: "choice", name: "ㅇ + ㅘ" },
];

test.describe("Unidade 6 e checkpoint c3 autenticados", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("h16 fica disponível após c2 e responde pelo teclado em 375 px", async ({
    page,
  }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_C2);

    await page.goto("/hangul");
    const h16 = page.getByRole("link", { name: /h16.*Montar e ler sílabas/ });
    await expect(h16).toBeVisible({ timeout: 15_000 });
    const box = await h16.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    await h16.click();

    await expect(
      page.getByRole("heading", { level: 1, name: /Montar e ler sílabas/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();

    // A bancada mostra sempre as três zonas, mas só pede o final quando o
    // exercício tem batchim. A sílaba C+V é pré-visualizada antes de conferir.
    await expect(page.getByText("final opcional")).toBeVisible();
    await expect(
      page.getByRole("group", { name: "Consoante final" }),
    ).toHaveCount(0);

    const initial = page
      .getByRole("button", { name: "ㄱ", exact: true })
      .first();
    await initial.focus();
    await page.keyboard.press("Enter");
    await expect(initial).toHaveAttribute("aria-pressed", "true");

    const medial = page
      .getByRole("button", { name: "ㅏ", exact: true })
      .first();
    await medial.focus();
    await page.keyboard.press("Enter");
    await expect(medial).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Sua sílaba:")).toContainText("가");

    await page.getByRole("button", { name: "Conferir" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("status").filter({ hasText: "Correto." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("bancada C+V permanece utilizável em 320 px", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "Medição única em 320 px.");
    await seedCompletedLessons(page, COMPLETED_THROUGH_H20);
    await page.setViewportSize({ width: 320, height: 667 });
    await page.goto("/hangul/h16");
    await page.getByRole("button", { name: "Refazer lição" }).click();

    await expect(page.getByText("Bancada de composição")).toBeVisible();
    await expect(page.getByText("final opcional")).toBeVisible();
    const initial = page
      .getByRole("group", { name: "Consoante inicial" })
      .getByRole("button", { name: "ㄱ", exact: true });
    const box = await initial.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    await initial.click();
    await page
      .getByRole("group", { name: "Vogal" })
      .getByRole("button", { name: "ㅏ", exact: true })
      .click();
    await expect(page.getByText("Sua sílaba:")).toContainText("가");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("c3 fica bloqueado até h16–h20 serem concluídas", async ({ page }) => {
    await page.goto("/hangul");
    await expect(page.getByText("Após h16–h20")).toBeVisible();

    await page.goto("/hangul/c3");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 3/ }),
    ).toBeVisible();
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText(/Lições do escopo: h16/)).toBeVisible();
    await expect(page.getByText(/Checkpoints anteriores: c1, c2/)).toBeVisible();
  });

  test("c3 abre depois de h16–h20, registra 100% e persiste ao recarregar", async ({
    page,
  }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_H20);

    await page.goto("/hangul");
    await expect(
      page.getByRole("link", { name: /c3.*Checkpoint 3/ }),
    ).toBeVisible({
      timeout: 15_000,
    });

    await page.goto("/hangul/c3");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 3/ }),
    ).toBeVisible();
    await expect(page.getByText(/19 de 24/)).toBeVisible();
    await page.getByRole("button", { name: "Começar checkpoint" }).click();

    for (const [index, step] of C3_STEPS.entries()) {
      if (step.kind === "choice") {
        await page
          .getByRole("button", { name: step.name, exact: true })
          .first()
          .click();
      } else {
        await page
          .getByRole("group", { name: "Consoante inicial" })
          .getByRole("button", { name: step.initial, exact: true })
          .click();
        await page
          .getByRole("group", { name: "Vogal" })
          .getByRole("button", { name: step.medial, exact: true })
          .click();
        await page
          .getByRole("group", { name: "Consoante final" })
          .getByRole("button", { name: step.final, exact: true })
          .click();
      }
      await page.getByRole("button", { name: "Conferir" }).click();
      await expect(
        page.getByRole("status").filter({ hasText: "Correto." }),
      ).toBeVisible();
      await page
        .getByRole("button", {
          name:
            index === C3_STEPS.length - 1 ? "Concluir checkpoint" : "Continuar",
        })
        .click();
    }

    await expect(
      page.getByRole("heading", { level: 1, name: "Checkpoint concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 24 de 24 (100%).")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.c3 : null;
        }, accountKey(page.context())),
      )
      .toEqual({ done: true, score: 100 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 3/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Refazer checkpoint" }),
    ).toBeVisible();

    await page.goto("/hangul");
    await expect(page.getByText("Concluído · 100%").last()).toBeVisible();
  });
});

const COMPLETED_THROUGH_C3 = [
  ...Array.from(
    { length: 20 },
    (_, index) => `h${String(index + 1).padStart(2, "0")}`,
  ),
  "c1",
  "c2",
  "c3",
];

const COMPLETED_ALL_LESSONS_AND_PREVIOUS_CHECKPOINTS = [
  ...Array.from(
    { length: 25 },
    (_, index) => `h${String(index + 1).padStart(2, "0")}`,
  ),
  "c1",
  "c2",
  "c3",
];

type C4Step =
  | { kind: "choice"; name: string }
  | { kind: "build"; initial: string; medial: string; final?: string };

const C4_STEPS: C4Step[] = [
  { kind: "choice", name: "ㅋ" },
  { kind: "choice", name: "ㄲ" },
  { kind: "choice", name: "ㅎ" },
  { kind: "choice", name: "ㅈ" },
  { kind: "choice", name: "ㅙ" },
  { kind: "build", initial: "ㅋ", medial: "ㅘ" },
  { kind: "build", initial: "ㄱ", medial: "ㅟ" },
  { kind: "build", initial: "ㄷ", medial: "ㅏ", final: "ㄺ" },
  { kind: "build", initial: "ㄱ", medial: "ㅏ", final: "ㅄ" },
  { kind: "choice", name: "ㅇ + ㅙ" },
  { kind: "choice", name: "[t̚] — língua no alvéolo, sem soltar ar" },
  { kind: "choice", name: "[p̚] — lábios fechados, sem soltar ar" },
  { kind: "choice", name: "[k̚] — boca fecha, sem soltar ar" },
  { kind: "choice", name: "[l] — língua no alvéolo, sem soltar" },
  { kind: "choice", name: "[ŋ] — nasal velar" },
  { kind: "choice", name: "[p̚] — lábios fechados, sem soltar ar" },
  { kind: "choice", name: "한구거" },
  { kind: "choice", name: "조아요" },
  { kind: "choice", name: "일거요" },
  { kind: "choice", name: "임니다" },
  { kind: "choice", name: "한궁말" },
  { kind: "choice", name: "조타" },
  { kind: "choice", name: "pessoa" },
  { kind: "choice", name: "amor" },
  { kind: "choice", name: "coração; mente; disposição" },
  { kind: "choice", name: "paz; bem-estar" },
  { kind: "choice", name: "olá; como vai?" },
  { kind: "choice", name: "감사함니다" },
  { kind: "choice", name: "Eu estudo coreano." },
  { kind: "choice", name: "Eu sou estudante." },
];

async function playC4(page: Page, options: { wrongFirst?: boolean } = {}) {
  for (const [index, step] of C4_STEPS.entries()) {
    const wrong = options.wrongFirst === true && index === 0;
    if (step.kind === "choice") {
      await page
        .getByRole("button", { name: wrong ? "ㄱ" : step.name, exact: true })
        .first()
        .click();
    } else {
      await page
        .getByRole("group", { name: "Consoante inicial" })
        .getByRole("button", { name: step.initial, exact: true })
        .click();
      await page
        .getByRole("group", { name: "Vogal" })
        .getByRole("button", { name: step.medial, exact: true })
        .click();
      if (step.final) {
        await page
          .getByRole("group", { name: "Consoante final" })
          .getByRole("button", { name: step.final, exact: true })
          .click();
      }
    }
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(
      page
        .getByRole("status")
        .filter({ hasText: wrong ? "Ainda não." : "Correto." }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: index === C4_STEPS.length - 1 ? "Concluir checkpoint" : "Continuar",
      })
      .click();
  }
}

test.describe("Unidade 7 e checkpoint c4 autenticados", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("h21 abre após c3 e responde pelo teclado em 375 px", async ({ page }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_C3);

    await page.goto("/hangul");
    const h21 = page.getByRole("link", { name: /h21.*Ligação/ });
    await expect(h21).toBeVisible({ timeout: 15_000 });
    const box = await h21.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    await h21.click();

    await expect(
      page.getByRole("heading", { level: 1, name: /Ligação/ }),
    ).toBeVisible();

    // As camadas são estáticas: escrita, fala aproximada e explicação já estão
    // visíveis, com o status de revisão. A comparação por bloco é opcional.
    const layer = page.getByRole("region", {
      name: /Camadas de pronúncia: 한국어/,
    });
    await expect(layer.getByText("Forma escrita")).toBeVisible();
    await expect(layer.locator("ol > li").nth(0).locator('[lang="ko"]')).toHaveText([
      "한",
      "국",
      "어",
    ]);
    await expect(layer.locator("ol > li").nth(1).locator('[lang="ko"]')).toHaveText([
      "한",
      "구",
      "거",
    ]);
    await expect(layer.getByText(/ㄱ de 국 passa/)).toBeVisible();
    await expect(layer.getByText("em revisão", { exact: true })).toBeVisible();
    await layer.getByRole("combobox", { name: "Exemplo" }).selectOption({
      label: "밥을",
    });
    const selected = page.getByRole("region", {
      name: /Camadas de pronúncia: 밥을/,
    });
    await expect(selected.locator("ol > li").nth(1).locator('[lang="ko"]')).toHaveText([
      "바",
      "블",
    ]);
    await selected.getByRole("button", { name: "Ver comparação por bloco" }).click();
    await expect(selected.getByText("Bloco 2:")).toBeVisible();
    await selected.getByRole("button", { name: "Ocultar comparação por bloco" }).click();
    await expect(selected.getByText("Bloco 2:")).toHaveCount(0);

    await page.getByRole("button", { name: "Começar a prática" }).click();

    const option = page.getByRole("button", { name: /한구거/ }).first();
    await option.focus();
    await page.keyboard.press("Enter");
    await expect(option).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Conferir" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("status").filter({ hasText: "Correto." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("c4 fica bloqueado até h21–h25 serem concluídas", async ({ page }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_C3);

    await page.goto("/hangul");
    await expect(page.getByText("Após h01–h25", { exact: true })).toBeVisible();

    await page.goto("/hangul/c4");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 4/ }),
    ).toBeVisible();
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText(/Lições do escopo: h21, h22, h23, h24, h25/)).toBeVisible();
    await expect(page.getByText(/Checkpoints anteriores:/)).toHaveCount(0);
  });

  test("c4 também exige os checkpoints anteriores", async ({ page }) => {
    await seedCompletedLessons(page, COMPLETED_THROUGH_H20);

    await page.goto("/hangul/c4");
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText("Checkpoints anteriores: c3.")).toBeVisible();
    await expect(page.getByText(/Lições do escopo: h21/)).toBeVisible();
  });

  test("c4 abre com 25 lições, registra 100% e conclui o módulo", async ({
    page,
  }) => {
    await seedCompletedLessons(page, COMPLETED_ALL_LESSONS_AND_PREVIOUS_CHECKPOINTS);

    await page.goto("/hangul");
    await expect(
      page.getByRole("link", { name: /c4.*Checkpoint 4/ }),
    ).toBeVisible({ timeout: 15_000 });

    await page.goto("/hangul/c4");
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkpoint 4/ }),
    ).toBeVisible();
    await expect(page.getByText(/24 de 30/)).toBeVisible();
    await page.getByRole("button", { name: "Começar checkpoint" }).click();

    await playC4(page);

    await expect(
      page.getByRole("heading", { level: 1, name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 30 de 30 (100%).")).toBeVisible();
    await expect(page.getByText(/não uma certificação oficial de proficiência/)).toBeVisible();
    await expect(
      page.getByText(/O próximo módulo \(CEFR A1\) ainda não está disponível/),
    ).toBeVisible();
    await expect(page.getByText("30 corretos · 0 incorretos.")).toBeVisible();
    await expect(page.getByText("Nenhum item errado nesta tentativa.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo:/ })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Revisar cartões" })).toHaveAttribute(
      "href",
      "/revisao",
    );
    await expect(page.getByRole("link", { name: "Ir para o painel" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    await expect(page.getByRole("link", { name: /h01/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /c4.*Checkpoint 4/ })).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.c4 : null;
        }, accountKey(page.context())),
      )
      .toEqual({ done: true, score: 100 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Refazer checkpoint" })).toBeVisible();
    await expect(page.getByText(/Seu melhor score registrado no checkpoint final é 100%/)).toBeVisible();

    await page.goto("/hangul");
    await expect(
      page.getByRole("heading", { name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Em breve")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("c4 com um erro mostra contagem, áreas de estudo e link de revisão", async ({
    page,
  }) => {
    await seedCompletedLessons(page, COMPLETED_ALL_LESSONS_AND_PREVIOUS_CHECKPOINTS);

    await page.goto("/hangul/c4");
    await page.getByRole("button", { name: "Começar checkpoint" }).click();
    await playC4(page, { wrongFirst: true });

    await expect(
      page.getByRole("heading", { level: 1, name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByText("Você acertou 29 de 30 (97%).")).toBeVisible();
    await expect(page.getByText("29 corretos · 1 incorretos.")).toBeVisible();

    const areas = page.getByRole("region", {
      name: "Áreas para estudar antes de seguir",
    });
    await expect(areas).toBeVisible();
    await expect(areas.getByRole("link", { name: "h04" })).toHaveAttribute(
      "href",
      "/hangul/h04",
    );
    await expect(areas.getByText(/consoantes básicas/i)).toBeVisible();

    const feedbackLink = page.getByRole("link", {
      name: "Rever pontos do checkpoint",
    });
    const feedbackBox = await feedbackLink.boundingBox();
    expect(feedbackBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    await feedbackLink.focus();
    await expect(feedbackLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#checkpoint-feedback$/);

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.c4 : null;
        }, accountKey(page.context())),
      )
      .toEqual({ done: true, score: 97 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Módulo Hangul concluído" }),
    ).toBeVisible();
    await expect(page.getByText(/Seu melhor score registrado no checkpoint final é 97%/)).toBeVisible();

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
});
