import AxeBuilder from "@axe-core/playwright";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();
const B1_ALL_STEPS = [
  ...Array.from({ length: 40 }, (_, index) => `b1-l${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 8 }, (_, index) => `b1-c${String(index + 1).padStart(2, "0")}`),
];
const ANSWERS = [
  { kind: "choice", label: "Foi mais solitária do que ela esperava." },
  { kind: "text", value: "더라고요" },
  { kind: "text", value: "생각보다 외롭더라고요." },
  { kind: "choice", label: "A gentileza de uma pessoa local." },
  { kind: "text", value: "그 여행이 제가 세상을 보는 방식을 바꿨어요." },
  { kind: "choice", label: "바다가 넓더라고요." },
  { kind: "text", value: "그런데" },
  { kind: "text", value: "결국 좋은 기억으로 남았어요." },
  { kind: "text", value: "Naquele momento foi assustador, mas hoje é uma boa lembrança." },
  { kind: "choice", label: "Dificuldades podem mudar nossa perspectiva." },
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
async function seedProgress(context: BrowserContext, lessons: Record<string, { done: boolean; score: number }>) {
  await context.addInitScript(({ key, value }) => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* about:blank */ }
  }, { key: storageKeyFor(context), value: { v: 1, lessons, cards: {}, history: [], streak: 0, dailyGoal: 10, lastActive: "2020-01-01T00:00:00.000Z" } });
}
async function expectNoHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}
async function playB1L01(page: Page) {
  for (const [index, answer] of ANSWERS.entries()) {
    if (answer.kind === "choice") {
      await page.getByRole("group", { name: "Alternativas" }).getByRole("button", { name: answer.label, exact: true }).click();
    } else {
      await page.getByLabel("Sua resposta").fill(answer.value);
    }
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page.getByRole("button", { name: index === ANSWERS.length - 1 ? "Concluir lição" : "Continuar" }).click();
  }
}

test.describe("B1 — curso completo autenticado", () => {
  test.beforeEach(async ({ context }) => { await authenticate(context); });

  test("sem A2 concluído, curso e URL direta ficam bloqueados", async ({ page }) => {
    await page.goto("/b1");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
    await expect(page.getByText(/Requisitos pendentes: a2-c08/)).toBeVisible();
    expect(await page.locator("main a[href^='/b1/']").count()).toBe(0);
    await page.goto("/b1/b1-l01");
    await expect(page.getByText("Curso bloqueado").first()).toBeVisible();
  });

  test("com A2 concluído, mostra 40 lições, 8 checkpoints e só o primeiro link", async ({ page }) => {
    await seedProgress(page.context(), { "a2-c08": { done: true, score: 100 } });
    await page.goto("/b1");
    await expect(page.getByRole("heading", { level: 1, name: "Coreano B1" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coreano B1 · 40 lições e 8 checkpoints" })).toBeVisible();
    await expect(page.getByText("0 de 40")).toBeVisible();
    await expect(page.getByText("0 de 8")).toBeVisible();
    await expect(page.getByText("0 de 48")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 1 · Histórias e conexões/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 8 · Integração B1/ })).toBeVisible();
    const links = await page.locator("main a[href^='/b1/']").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    expect(new Set(links)).toEqual(new Set(["/b1/b1-l01"]));
    await expectNoHorizontalOverflow(page);
  });

  test("a primeira lição ensina, conclui e libera a próxima; produção fica local", async ({ page }) => {
    await seedProgress(page.context(), { "a2-c08": { done: true, score: 100 } });
    await page.goto("/b1/b1-l01");
    await expect(page.getByRole("heading", { level: 1, name: "A história que ficou" })).toBeVisible();
    await expect(page.getByText("Lição 1 de 40")).toBeVisible();
    await expect(page.getByText("A primeira viagem sozinha")).toBeVisible();
    await expect(page.getByRole("heading", { name: "-더라고요 — descoberta no relato" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Produção independente · uma lembrança" })).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await playB1L01(page);
    await expect(page.getByText("Lição concluída")).toBeVisible();
    await expect(page.getByText("Você acertou 10 de 10")).toBeVisible();
    await expect(page.getByRole("link", { name: /Próximo: b1-l02/ })).toBeVisible();
    await expect(page.getByText(/não é enviada e não é salva/)).toBeVisible();
  });

  test("com os 48 passos, mostra a conclusão interna do B1", async ({ page }) => {
    await seedProgress(page.context(), {
      "a2-c08": { done: true, score: 100 },
      ...Object.fromEntries(B1_ALL_STEPS.map((id) => [id, { done: true, score: 100 }])),
    });
    await page.goto("/b1/b1-c08");
    await expect(page.getByRole("heading", { level: 1, name: "Curso B1 concluído" })).toBeVisible();
    await expect(page.getByText("Você concluiu o percurso B1 do KBR")).toBeVisible();
    await expect(page.getByText(/certificado CEFR/i)).toBeVisible();
    await expect(page.getByText(/equivale ao TOPIK/i)).toBeVisible();
  });

  test("b1-l01 mantém layout de 320 a 1280 e axe claro/escuro", async ({ page }) => {
    await seedProgress(page.context(), { "a2-c08": { done: true, score: 100 } });
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/b1/b1-l01");
      await expect(page.getByRole("heading", { level: 1, name: "A história que ficou" })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      if (width <= 375) {
        const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
        expect(results.violations.map((v) => v.id), `b1-l01 ${width}px`).toEqual([]);
      }
    }
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/b1");
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark");
    const dark = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    expect(dark.violations.map((v) => v.id), "b1 escuro").toEqual([]);
  });
});
