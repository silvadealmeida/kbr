import AxeBuilder from "@axe-core/playwright";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();
const B2_ALL_STEPS = [
  ...Array.from({ length: 40 }, (_, index) => `b2-l${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 8 }, (_, index) => `b2-c${String(index + 1).padStart(2, "0")}`),
];
const ANSWERS = [
  { kind: "choice", label: "Porque ela perdeu o emprego e encontrou uma nova direção." },
  { kind: "text", value: "던" },
  { kind: "text", value: "어느 날 갑자기 해고 통보를 받았어요." },
  { kind: "choice", label: "O aviso de demissão e o encontro com um ex-colega." },
  { kind: "text", value: "제가 다니던 회사가 문을 닫았어요." },
  { kind: "choice", label: "커피를 마시던 중이었어요." },
  { kind: "text", value: "던" },
  { kind: "text", value: "그날은 제 인생의 전환점이었어요." },
  { kind: "text", value: "Aquele fracasso se tornou o motivo para eu voltar a estudar." },
  { kind: "choice", label: "Como uma memória necessária que a ajudou a mudar." },
] as const;

async function authenticate(context: BrowserContext) {
  const account = createTestUser();
  sessions.set(context, { storageKey: `kbr:user:${account.id}:v1` });
  await context.addCookies([{ ...testAuthCookie(Date.now(), account), url: BASE_URL }]);
}

function storageKeyFor(context: BrowserContext) {
  const session = sessions.get(context);
  if (!session) throw new Error("Autentique antes de semear.");
  return session.storageKey;
}

async function seedProgress(
  context: BrowserContext,
  lessons: Record<string, { done: boolean; score: number }>,
) {
  await context.addInitScript(({ key, value }) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* about:blank */
    }
  }, {
    key: storageKeyFor(context),
    value: {
      v: 1,
      lessons,
      cards: {},
      history: [],
      streak: 0,
      dailyGoal: 10,
      lastActive: "2020-01-01T00:00:00.000Z",
    },
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

async function playB2L01(page: Page) {
  for (const [index, answer] of ANSWERS.entries()) {
    if (answer.kind === "choice") {
      await page
        .getByRole("group", { name: "Alternativas" })
        .getByRole("button", { name: answer.label, exact: true })
        .click();
    } else {
      await page.getByLabel("Sua resposta").fill(answer.value);
    }
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page
      .getByRole("button", {
        name: index === ANSWERS.length - 1 ? "Concluir lição" : "Continuar",
      })
      .click();
  }
}

test.describe("B2 — curso completo autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("sem B1 concluído, curso e URL direta ficam bloqueados", async ({ page }) => {
    await page.goto("/b2");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
    await expect(page.getByText(/Requisitos pendentes: b1-c08/)).toBeVisible();
    expect(await page.locator("main a[href^='/b2/']").count()).toBe(0);
    await page.goto("/b2/b2-l01");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
  });

  test("com B1 concluído, mostra 40 lições, 8 checkpoints e só o primeiro link", async ({ page }) => {
    await seedProgress(page.context(), { "b1-c08": { done: true, score: 100 } });
    await page.goto("/b2");
    await expect(page.getByRole("heading", { level: 1, name: "Coreano B2" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coreano B2 · 40 lições e 8 checkpoints" })).toBeVisible();
    await expect(page.getByText("0 de 40")).toBeVisible();
    await expect(page.getByText("0 de 8")).toBeVisible();
    await expect(page.getByText("0 de 48")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 1 · Narrativas complexas e perspectivas/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 8 · Integração e autonomia B2/ })).toBeVisible();
    const links = await page
      .locator("main a[href^='/b2/']")
      .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    expect(new Set(links)).toEqual(new Set(["/b2/b2-l01"]));
    await expectNoHorizontalOverflow(page);
  });

  test("a primeira lição ensina, conclui e libera a próxima; produção fica local", async ({ page }) => {
    await seedProgress(page.context(), { "b1-c08": { done: true, score: 100 } });
    await page.goto("/b2/b2-l01");
    await expect(page.getByRole("heading", { level: 1, name: "O dia que mudou tudo" })).toBeVisible();
    await expect(page.getByText("Lição 1 de 40")).toBeVisible();
    await expect(page.getByText("O que aquele dia deixou")).toBeVisible();
    await expect(page.getByRole("heading", { name: "-던 — ação em andamento ou hábito no passado" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Produção independente · um ponto de virada" })).toBeVisible();
    await expect(page.getByText("Cumprimento da tarefa")).toBeVisible();
    await page.getByText("Exemplo ilustrativo (não é gabarito)").click();
    await expect(page.getByText(/Exemplo original de 5 frases/)).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await playB2L01(page);
    await expect(page.getByText("Lição concluída")).toBeVisible();
    await expect(page.getByText("Você acertou 10 de 10")).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo: b2-l02/ })).toBeVisible();
    await expect(page.getByText(/não é enviada e não é salva/)).toBeVisible();
  });

  test("com os 48 passos, mostra a conclusão interna do B2", async ({ page }) => {
    await seedProgress(page.context(), {
      "b1-c08": { done: true, score: 100 },
      ...Object.fromEntries(B2_ALL_STEPS.map((id) => [id, { done: true, score: 100 }])),
    });
    await page.goto("/b2/b2-c08");
    await expect(page.getByRole("heading", { level: 1, name: "Curso B2 concluído" })).toBeVisible();
    await expect(page.getByText("Você concluiu o percurso B2 do KBR")).toBeVisible();
    await expect(page.getByText(/certificado CEFR/i)).toBeVisible();
    await expect(page.getByText(/equivale ao TOPIK/i)).toBeVisible();
  });

  test("b2-l01 mantém layout de 320 a 1280 e axe claro/escuro", async ({ page }) => {
    await seedProgress(page.context(), { "b1-c08": { done: true, score: 100 } });
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/b2/b2-l01");
      await expect(page.getByRole("heading", { level: 1, name: "O dia que mudou tudo" })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      if (width <= 375) {
        const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
        expect(results.violations.map((v) => v.id), `b2-l01 ${width}px`).toEqual([]);
      }
    }
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/b2");
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme))
      .toBe("dark");
    const dark = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    expect(dark.violations.map((v) => v.id), "b2 escuro").toEqual([]);
  });
});
