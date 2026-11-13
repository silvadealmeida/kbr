import AxeBuilder from "@axe-core/playwright";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();
const C2_ALL_STEPS = [
  ...Array.from({ length: 40 }, (_, index) => `c2-l${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 8 }, (_, index) => `c2-c${String(index + 1).padStart(2, "0")}`),
];
const ANSWERS = [
  { kind: "choice", label: "A frase '솜씨가 분명하다' prepara a crítica do parágrafo seguinte." },
  { kind: "text", value: "다니요" },
  { kind: "text", value: "칭찬이기는요. 준비할 시간이 없어서 급하게 만든 거예요." },
  { kind: "text", value: "칭찬이기는요. 그저 시간에 맞춰 끝냈을 뿐이에요." },
  { kind: "choice", label: "Que ele transforma a vida do lugar em objeto estético, deixando as pessoas em segundo plano." },
  { kind: "choice", label: "A autora elogia a técnica, mas critica o modo como as pessoas são deslocadas para a margem." },
  { kind: "text", value: "반어" },
  { kind: "text", value: "물론 이것은 나의 해석이다." },
  { kind: "text", value: "A ironia transfere ao leitor a tarefa da interpretação, mas, se ele não assume essa tarefa, tudo termina em mal-entendido." },
  { kind: "choice", label: "Porque registrar pode preservar uma perda, enquanto embelezar pode transformá-la em decoração." },
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

async function playC2L01(page: Page) {
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

test.describe("C2 — curso completo autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("sem C1 concluído, curso e URL direta ficam bloqueados", async ({ page }) => {
    await page.goto("/c2");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
    await expect(page.getByText(/Requisitos pendentes: c1-c08/)).toBeVisible();
    expect(await page.locator("main a[href^='/c2/']").count()).toBe(0);
    await page.goto("/c2/c2-l01");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
  });

  test("com C1 concluído, mostra 40 lições, 8 checkpoints e só o primeiro link", async ({ page }) => {
    await seedProgress(page.context(), { "c1-c08": { done: true, score: 100 } });
    await page.goto("/c2");
    await expect(page.getByRole("heading", { level: 1, name: "Coreano C2" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coreano C2 · 40 lições e 8 checkpoints" })).toBeVisible();
    await expect(page.getByText("0 de 40")).toBeVisible();
    await expect(page.getByText("0 de 8")).toBeVisible();
    await expect(page.getByText("0 de 48")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 1 · Pragmática fina e implicatura/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 8 · Projeto C2 e autonomia/ })).toBeVisible();
    const links = await page
      .locator("main a[href^='/c2/']")
      .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    expect(new Set(links)).toEqual(new Set(["/c2/c2-l01"]));
    await expectNoHorizontalOverflow(page);
  });

  test("a primeira lição ensina, conclui e libera a próxima; produção fica local", async ({ page }) => {
    await seedProgress(page.context(), { "c1-c08": { done: true, score: 100 } });
    await page.goto("/c2/c2-l01");
    await expect(page.getByRole("heading", { level: 1, name: "Ironia e sarcasmo" })).toBeVisible();
    await expect(page.getByText("Lição 1 de 40")).toBeVisible();
    await expect(page.getByRole("heading", { name: "O estúdio fotográfico do beco" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Produção independente · duas versões de um comentário" })).toBeVisible();
    await expect(page.getByText("Mediação e responsabilidade").first()).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await playC2L01(page);
    await expect(page.getByText("Lição concluída")).toBeVisible();
    await expect(page.getByText("Você acertou 10 de 10")).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo: c2-l02/ })).toBeVisible();
    await expect(page.getByText(/não é enviada e não é salva/)).toBeVisible();
  });

  test("com os 48 passos, mostra a conclusão interna do C2", async ({ page }) => {
    await seedProgress(page.context(), {
      "c1-c08": { done: true, score: 100 },
      ...Object.fromEntries(C2_ALL_STEPS.map((id) => [id, { done: true, score: 100 }])),
    });
    await page.goto("/c2/c2-c08");
    await expect(page.getByRole("heading", { level: 1, name: "Curso C2 concluído" })).toBeVisible();
    await expect(page.getByText("Você concluiu o percurso C2 do KBR")).toBeVisible();
    await expect(page.getByText(/certificado CEFR/i)).toBeVisible();
    await expect(page.getByText(/equivale ao TOPIK/i)).toBeVisible();
  });

  test("c2-l01 mantém layout de 320 a 1280 e axe claro/escuro", async ({ page }) => {
    await seedProgress(page.context(), { "c1-c08": { done: true, score: 100 } });
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/c2/c2-l01");
      await expect(page.getByRole("heading", { level: 1, name: "Ironia e sarcasmo" })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      if (width <= 375) {
        const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
        expect(results.violations.map((v) => v.id), `c2-l01 ${width}px`).toEqual([]);
      }
    }
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/c2");
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme))
      .toBe("dark");
    const dark = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    expect(dark.violations.map((v) => v.id), "c2 escuro").toEqual([]);
  });
});
