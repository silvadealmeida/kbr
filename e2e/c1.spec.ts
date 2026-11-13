import AxeBuilder from "@axe-core/playwright";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();
const C1_ALL_STEPS = [
  ...Array.from({ length: 40 }, (_, index) => `c1-l${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 8 }, (_, index) => `c1-c${String(index + 1).padStart(2, "0")}`),
];
const ANSWERS = [
  { kind: "choice", label: "A organizações de porte semelhante ao das empresas analisadas." },
  { kind: "text", value: "한정한다" },
  { kind: "text", value: "이 결과를 조직 전체의 생산성 향상으로 일반화하는 판단은 아직 이르다." },
  { kind: "choice", label: "O setor, o porte e a função analisados." },
  { kind: "text", value: "이 글은 단기 효과만 살펴보고자 한다." },
  { kind: "choice", label: "가격은 저렴한 데 반해 품질은 뛰어나다." },
  { kind: "text", value: "반해" },
  { kind: "text", value: "이 글은 재택근무의 장기 효과를 검토하고자 한다." },
  { kind: "text", value: "A objeção mais forte será provavelmente a crítica de que a medição da produtividade depende de autorrelato." },
  { kind: "choice", label: "Porque a amostra foi formada por pessoas que se ofereceram para participar." },
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

async function playC1L01(page: Page) {
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

test.describe("C1 — curso completo autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("sem B2 concluído, curso e URL direta ficam bloqueados", async ({ page }) => {
    await page.goto("/c1");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
    await expect(page.getByText(/Requisitos pendentes: b2-c08/)).toBeVisible();
    expect(await page.locator("main a[href^='/c1/']").count()).toBe(0);
    await page.goto("/c1/c1-l01");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
  });

  test("com B2 concluído, mostra 40 lições, 8 checkpoints e só o primeiro link", async ({ page }) => {
    await seedProgress(page.context(), { "b2-c08": { done: true, score: 100 } });
    await page.goto("/c1");
    await expect(page.getByRole("heading", { level: 1, name: "Coreano C1" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coreano C1 · 40 lições e 8 checkpoints" })).toBeVisible();
    await expect(page.getByText("0 de 40")).toBeVisible();
    await expect(page.getByText("0 de 8")).toBeVisible();
    await expect(page.getByText("0 de 48")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 1 · Argumentação e persuasão/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 8 · Síntese C1 e autonomia/ })).toBeVisible();
    const links = await page
      .locator("main a[href^='/c1/']")
      .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    expect(new Set(links)).toEqual(new Set(["/c1/c1-l01"]));
    await expectNoHorizontalOverflow(page);
  });

  test("a primeira lição ensina, conclui e libera a próxima; produção fica local", async ({ page }) => {
    await seedProgress(page.context(), { "b2-c08": { done: true, score: 100 } });
    await page.goto("/c1/c1-l01");
    await expect(page.getByRole("heading", { level: 1, name: "A tese e seu limite" })).toBeVisible();
    await expect(page.getByText("Lição 1 de 40")).toBeVisible();
    await expect(page.getByText("Uma tese que sabe onde termina")).toBeVisible();
    await expect(page.getByRole("heading", { name: "-ㄴ/는 데 반해 — em contraste com; enquanto que" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Produção independente · uma tese com escopo" })).toBeVisible();
    await expect(page.getByText("Síntese e fechamento").first()).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await playC1L01(page);
    await expect(page.getByText("Lição concluída")).toBeVisible();
    await expect(page.getByText("Você acertou 10 de 10")).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo: c1-l02/ })).toBeVisible();
    await expect(page.getByText(/não é enviada e não é salva/)).toBeVisible();
    await expect(page.getByText(/A conclusão do C1 exige todos os passos/)).toBeVisible();
  });

  test("com os 48 passos, mostra a conclusão interna do C1", async ({ page }) => {
    await seedProgress(page.context(), {
      "b2-c08": { done: true, score: 100 },
      ...Object.fromEntries(C1_ALL_STEPS.map((id) => [id, { done: true, score: 100 }])),
    });
    await page.goto("/c1/c1-c08");
    await expect(page.getByRole("heading", { level: 1, name: "Curso C1 concluído" })).toBeVisible();
    await expect(page.getByText("Você concluiu o percurso C1 do KBR")).toBeVisible();
    await expect(page.getByText(/certificado CEFR/i)).toBeVisible();
    await expect(page.getByText(/equivale ao TOPIK/i)).toBeVisible();
  });

  test("c1-l01 mantém layout de 320 a 1280 e axe claro/escuro", async ({ page }) => {
    await seedProgress(page.context(), { "b2-c08": { done: true, score: 100 } });
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/c1/c1-l01");
      await expect(page.getByRole("heading", { level: 1, name: "A tese e seu limite" })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      if (width <= 375) {
        const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
        expect(results.violations.map((v) => v.id), `c1-l01 ${width}px`).toEqual([]);
      }
    }
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/c1");
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme))
      .toBe("dark");
    const dark = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    expect(dark.violations.map((v) => v.id), "c1 escuro").toEqual([]);
  });
});
