import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const PAST = "2020-01-01T00:00:00.000Z";

type Cards = Record<string, { box: number; due: string; reviewedAt?: string }>;

function progress(cards: Cards = {}, lessons: Record<string, { done: boolean; score: number }> = {}) {
  return { v: 1, lessons, cards, history: [], streak: 0, dailyGoal: 10, lastActive: PAST };
}

async function setup(
  browser: Browser,
  options: { cards?: Cards; lessons?: Record<string, { done: boolean; score: number }>; user?: ReturnType<typeof createTestUser>; width?: number } = {},
) {
  const user = options.user ?? createTestUser();
  const context = await browser.newContext({ viewport: { width: options.width ?? 390, height: 844 } });
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  const key = `kbr:user:${user.id}:v1`;
  if (options.cards || options.lessons) {
    await context.addInitScript(
      ({ k, v }) => {
        try {
          if (window.sessionStorage.getItem("kbr:e2e:vocab-seeded") === "1") return;
          window.localStorage.setItem(k, JSON.stringify(v));
          window.sessionStorage.setItem("kbr:e2e:vocab-seeded", "1");
        } catch { /* about:blank */ }
      },
      { k: key, v: progress(options.cards, options.lessons) },
    );
  }
  // Voz coreana simulada: a síntese real não é testável em CI.
  await context.addInitScript(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      value: class { constructor(public text: string) {} },
    });
    const voice = { lang: "ko-KR", name: "Voz de teste", default: true, localService: true, voiceURI: "t" };
    Object.defineProperty(synth, "getVoices", { configurable: true, value: () => [voice] });
    Object.defineProperty(synth, "cancel", { configurable: true, value: () => {} });
    Object.defineProperty(synth, "speak", {
      configurable: true,
      value: (u: { onstart?: () => void; onend?: () => void }) => {
        setTimeout(() => u.onstart?.(), 0);
        setTimeout(() => u.onend?.(), 30);
      },
    });
  });
  const page = await context.newPage();
  return { context, page, key, user };
}

const read = (page: Page, key: string) =>
  page.evaluate((k) => JSON.parse(window.localStorage.getItem(k) ?? "null"), key);

async function noHorizontalScroll(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test.describe("Vocabulário", () => {
  test("lista, busca, salva e persiste após recarregar", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser);
    try {
      await page.goto("/vocabulario");
      await expect(page.getByRole("heading", { level: 1, name: "Vocabulário" })).toBeVisible();
      await expect(page.getByText("Você ainda não salvou palavras.")).toBeVisible();
      await expect(page.getByRole("link", { name: /Revisão diária/ })).toHaveCount(0);

      await page.getByLabel("Buscar em coreano ou português").fill("maçã");
      await expect(page.getByTestId("vocab-row")).toHaveCount(1);
      await expect(page.getByText("사과", { exact: true })).toBeVisible();
      const save = page.getByRole("button", { name: "Salvar 사과", exact: true });
      expect((await save.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(40);
      await save.click();
      await expect(page.getByRole("button", { name: "Remover 사과", exact: true })).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByRole("link", { name: "Revisão diária (1)" })).toBeVisible();

      expect((await read(page, key)).cards["v:ko:사과"]).toMatchObject({ box: 1 });
      await page.reload();
      await page.getByLabel("Buscar em coreano ou português").fill("사과");
      await expect(page.getByRole("button", { name: "Remover 사과", exact: true })).toBeVisible();

      // detalhes: exemplo com tradução e áudio da frase
      await page.getByRole("button", { name: "Ver detalhes de 사과", exact: true }).click();
      await expect(page.getByText("저는 사과를 먹어요.")).toBeVisible();
      await expect(page.getByText("“Eu como maçã.”")).toBeVisible();
      if (browserName !== "webkit") {
        await page.getByRole("button", { name: "Ouvir a frase" }).click();
        await expect(page.getByText(/sintetizado|voz coreana do navegador/).first()).toBeVisible({ timeout: 10_000 });
      }

      // remover
      await page.getByRole("button", { name: "Remover 사과", exact: true }).click();
      const stored = await read(page, key);
      expect(stored.cards["v:ko:사과"].due).toBe("9999-12-31T00:00:00.000Z");
      await expect(page.getByText("Você ainda não salvou palavras.")).toBeVisible();
      await noHorizontalScroll(page);
    } finally {
      await context.close();
    }
  });

  test("filtra por lição, mostra estado 'encontrada' e salva a lição inteira", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser, { lessons: { h03: { done: true, score: 100 } } });
    try {
      await page.goto("/vocabulario");
      await page.getByLabel("Lição", { exact: true }).selectOption("hangul/h03");
      const rows = page.getByTestId("vocab-row");
      await expect(rows.first()).toContainText("Encontrada");
      const n = await rows.count();
      expect(n).toBeGreaterThan(0);
      await page.getByRole("button", { name: `Salvar ${n === 1 ? "a palavra" : `as ${n} palavras`} desta lição` }).click();
      await expect(rows.first()).toContainText("Em aprendizagem");
      expect(Object.keys((await read(page, key)).cards).filter((k) => k.startsWith("v:"))).toHaveLength(n);
    } finally {
      await context.close();
    }
  });

  test("revisão contextual: tradução opcional, acerto, erro, tentar de novo e Leitner", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser, {
      cards: {
        // 사과 em caixa 2 → acerto SEM ajuda deve ir para a caixa 3
        "v:ko:사과": { box: 2, due: PAST, reviewedAt: PAST },
        "v:ko:커피": { box: 3, due: "2020-01-02T00:00:00.000Z", reviewedAt: PAST },
      },
    });
    try {
      await page.goto("/vocabulario/revisao");
      await page.getByRole("button", { name: "Começar revisão (2)" }).click();

      // 1º cartão: 사과 (mais atrasado)
      await expect(page.getByText("Complete a frase")).toBeVisible();
      await expect(page.getByText("Palavra esperada: maçã")).toBeVisible();
      await expect(page.getByText("lacuna")).toBeAttached();
      await expect(page.getByText("Correto!")).toHaveCount(0); // estado pendente é neutro

      // abre e fecha a tradução ANTES de responder; a resposta não vaza
      const toggle = page.getByRole("button", { name: "Mostrar tradução da frase" });
      await toggle.click();
      await expect(page.getByRole("button", { name: "Ocultar tradução da frase" })).toHaveAttribute("aria-expanded", "true");
      await expect(page.getByText("“Eu como maçã.”")).toBeVisible();
      await page.getByRole("button", { name: "Ocultar tradução da frase" }).click();
      await expect(page.getByText("“Eu como maçã.”")).toBeHidden();
      await expect(page.locator("main").getByText("사과")).toHaveCount(0);

      // resposta vazia não corrige
      await page.getByRole("button", { name: "Verificar" }).click();
      await expect(page.getByText("Digite a palavra antes de verificar.")).toBeVisible();

      // tradução foi aberta = ajuda → acerto assistido NÃO avança (fica na caixa 2)
      await page.getByLabel(/Digite a palavra que falta/).fill("사과");
      await page.keyboard.press("Enter");
      const result = page.getByRole("heading", { name: "Correto!" });
      await expect(result).toBeFocused();
      await expect(page.getByText("sem avançar de caixa")).toBeVisible();
      // tradução e frase completa aparecem mesmo tendo sido fechada antes
      await expect(page.getByText("저는 사과를 먹어요.")).toBeVisible();
      await expect(page.getByText("“Eu como maçã.”")).toBeVisible();
      // No WebKit o stub de voz não funciona (ver e2e/audio.spec.ts); o botão deve existir.
      if (browserName !== "webkit") {
        await page.getByRole("button", { name: "Ouvir a frase" }).click();
        await expect(page.getByText(/sintetizado|voz coreana do navegador/).first()).toBeVisible({ timeout: 10_000 });
      } else {
        await expect(page.getByRole("button", { name: "Ouvir a frase" })).toBeVisible();
      }
      expect((await read(page, key)).cards["v:ko:사과"].box).toBe(2);
      await page.getByRole("button", { name: "Próximo cartão" }).click();

      // 2º cartão: 커피, resposta errada SEM abrir a tradução
      await expect(page.getByText("Palavra esperada: café")).toBeVisible();
      await page.getByLabel(/Digite a palavra que falta/).fill("차");
      await page.getByRole("button", { name: "Verificar" }).click();
      await expect(page.getByRole("heading", { name: "Ainda não — veja a resposta" })).toBeFocused();
      await expect(page.getByText("커피 — café")).toBeVisible();
      await expect(page.getByText("저는 커피를 좋아해요.")).toBeVisible();
      await expect(page.getByText("“Eu gosto de café.”")).toBeVisible();
      expect((await read(page, key)).cards["v:ko:커피"].box).toBe(1);

      // tentar de novo: acerta, mas não reagenda
      await page.getByRole("button", { name: "Tentar de novo" }).click();
      await page.getByLabel(/Tente de novo/).fill("커피");
      await page.getByRole("button", { name: "Verificar" }).click();
      await expect(page.getByRole("heading", { name: "Correto!" })).toBeVisible();
      await expect(page.getByText("Esta tentativa extra não altera a agenda")).toBeVisible();
      expect((await read(page, key)).cards["v:ko:커피"].box).toBe(1);

      await page.getByRole("button", { name: "Concluir" }).click();
      await expect(page.getByRole("heading", { level: 1, name: "Revisão concluída" })).toBeVisible();
      await expect(page.getByText(/1 com ajuda e 1 erro/)).toBeVisible();

      // o Hangul não foi tocado
      await page.goto("/revisao");
      await expect(page.getByText("Nada para revisar agora")).toBeVisible();
      await expect(page.getByText(/cartão\(ões\) antigo\(s\)/)).toHaveCount(0);
    } finally {
      await context.close();
    }
  });

  test("acerto sem ajuda avança a caixa e o aluno responde só com o teclado", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser, {
      cards: { "v:ko:물": { box: 2, due: PAST, reviewedAt: PAST } },
    });
    try {
      await page.goto("/vocabulario/revisao");
      await page.getByRole("button", { name: "Começar revisão (1)" }).focus();
      await page.keyboard.press("Enter");
      await page.getByLabel(/Digite a palavra que falta/).fill("물");
      await page.keyboard.press("Enter");
      await expect(page.getByRole("heading", { name: "Correto!" })).toBeFocused();
      expect((await read(page, key)).cards["v:ko:물"]).toMatchObject({ box: 3 });
      await page.getByRole("button", { name: "Concluir" }).click();
      await expect(page.getByText(/1 sem ajuda/)).toBeVisible();
    } finally {
      await context.close();
    }
  });

  test("pista não revela a palavra e conta como ajuda", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser, {
      cards: { "v:ko:책": { box: 2, due: PAST, reviewedAt: PAST } },
    });
    try {
      await page.goto("/vocabulario/revisao");
      await page.getByRole("button", { name: /Começar revisão/ }).click();
      await page.getByRole("button", { name: "Pista" }).click();
      const hint = page.locator("p", { hasText: "Pista:" });
      await expect(hint).toContainText("1 sílaba");
      await expect(hint).not.toContainText("책");
      await page.getByLabel(/Digite a palavra que falta/).fill("책");
      await page.getByRole("button", { name: "Verificar" }).click();
      await expect(page.getByRole("heading", { name: "Correto!" })).toBeVisible();
      expect((await read(page, key)).cards["v:ko:책"].box).toBe(2);
    } finally {
      await context.close();
    }
  });

  test("cartões simples: revelar, ver exemplo e autoavaliar", async ({ browser, browserName }) => {
    const { context, page, key } = await setup(browser, {
      cards: {
        "v:ko:커피": { box: 1, due: PAST, reviewedAt: PAST },
        "v:ko:다리": { box: 3, due: "2020-01-02T00:00:00.000Z", reviewedAt: PAST },
      },
    });
    try {
      await page.goto("/vocabulario/revisao");
      await page.getByRole("button", { name: "Só cartões, sem digitar" }).click();
      await expect(page.getByText("Qual é o significado?")).toBeVisible();
      await expect(page.getByText("perna; ponte")).toHaveCount(0);
      await page.getByRole("button", { name: "Mostrar resposta" }).click();
      await expect(page.getByText("“Eu gosto de café.”")).toBeVisible();
      await page.getByRole("button", { name: "Lembrei", exact: true }).click();
      await page.getByRole("button", { name: "Mostrar resposta" }).click();
      await expect(page.getByRole("heading", { name: "perna; ponte" })).toBeVisible();
      await page.getByRole("button", { name: "Não lembrei" }).click();
      await expect(page.getByRole("heading", { level: 1, name: "Revisão concluída" })).toBeVisible();
      const cards = (await read(page, key)).cards;
      expect(cards["v:ko:커피"].box).toBe(2);
      expect(cards["v:ko:다리"].box).toBe(1);
    } finally {
      await context.close();
    }
  });

  test("mobile 320 e 375: sem rolagem horizontal e alvos de toque adequados", async ({ browser, browserName }) => {
    for (const width of [320, 375]) {
      const { context, page } = await setup(browser, {
        width,
        cards: { "v:ko:사과": { box: 1, due: PAST, reviewedAt: PAST } },
      });
      try {
        await page.goto("/vocabulario");
        await noHorizontalScroll(page);
        await page.goto("/vocabulario/revisao");
        await page.getByRole("button", { name: /Começar revisão/ }).click();
        await page.getByLabel(/Digite a palavra que falta/).fill("커피");
        await page.getByRole("button", { name: "Verificar" }).click();
        await noHorizontalScroll(page);
        for (const name of ["Tentar de novo", "Próximo cartão", "Concluir"]) {
          const btn = page.getByRole("button", { name });
          if (await btn.count()) expect((await btn.first().boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
        }
      } finally {
        await context.close();
      }
    }
  });

  test("sincronização (Supabase SIMULADO): outro dispositivo da conta recebe as palavras salvas", async ({ browser, browserName }) => {
    const user = createTestUser();
    const a = await setup(browser, { user });
    const b = await setup(browser, { user });
    try {
      await a.page.goto("/vocabulario");
      await a.page.getByLabel("Buscar em coreano ou português").fill("café");
      await a.page.getByRole("button", { name: "Salvar 커피" }).click();
      await expect(a.page.getByText("Progresso sincronizado com sua conta.")).toBeVisible();

      await b.page.goto("/vocabulario");
      await expect(b.page.getByRole("link", { name: "Revisão diária (1)" })).toBeVisible({ timeout: 15_000 });

      // B remove; A recarrega e vê a remoção (a marca vence, nada ressuscita)
      await b.page.getByLabel("Buscar em coreano ou português").fill("café");
      await b.page.getByRole("button", { name: "Remover 커피" }).click();
      await expect(b.page.getByText("Progresso sincronizado com sua conta.")).toBeVisible();
      // A escrita remota é assíncrona: recarrega A até o merge trazer a marca de remoção.
      await expect
        .poll(async () => {
          await a.page.reload();
          return a.page
            .getByText("Você ainda não salvou palavras.")
            .waitFor({ timeout: 4_000 })
            .then(() => true, () => false);
        }, { timeout: 20_000 })
        .toBe(true);
    } finally {
      await a.context.close();
      await b.context.close();
    }
  });

  for (const scheme of ["light", "dark"] as const) {
    test(`axe sem violações nas telas de vocabulário (${scheme})`, async ({ browser }) => {
      test.setTimeout(90_000);
      const { context, page } = await setup(browser, {
        cards: {
          "v:ko:사과": { box: 1, due: PAST, reviewedAt: PAST },
          "v:ko:커피": { box: 1, due: "2020-01-02T00:00:00.000Z", reviewedAt: PAST },
          "v:ko:다리": { box: 1, due: "2020-01-03T00:00:00.000Z", reviewedAt: PAST },
        },
      });
      const axe = async (label: string) => {
        await page.waitForTimeout(400);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target.join(" ")) }));
        expect(summary, `${label} (${scheme}): ${JSON.stringify(summary)}`).toEqual([]);
      };
      try {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto("/vocabulario");
        await page.getByLabel("Buscar em coreano ou português").fill("사과");
        await page.getByRole("button", { name: "Ver detalhes de 사과", exact: true }).click();
        await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(scheme);
        await axe("lista");

        await page.goto("/vocabulario/revisao");
        await axe("visão geral");
        await page.getByRole("button", { name: /Começar revisão/ }).click();
        await page.getByRole("button", { name: "Mostrar tradução da frase" }).click();
        await page.getByRole("button", { name: "Pista" }).click();
        await axe("pendente com tradução e pista");

        await page.getByLabel(/Digite a palavra que falta/).fill("사과");
        await page.getByRole("button", { name: "Verificar" }).click();
        await expect(page.getByRole("heading", { name: "Correto!" })).toBeVisible();
        await axe("acerto");
        await page.getByRole("button", { name: "Próximo cartão" }).click();

        await page.getByLabel(/Digite a palavra que falta/).fill("차");
        await page.getByRole("button", { name: "Verificar" }).click();
        await expect(page.getByRole("heading", { name: "Ainda não — veja a resposta" })).toBeVisible();
        await axe("erro");
        await page.getByRole("button", { name: "Próximo cartão" }).click();

        // 다리 não tem frase: cartão simples
        await page.getByRole("button", { name: "Mostrar resposta" }).click();
        await axe("cartão simples (verso)");
      } finally {
        await context.close();
      }
    });
  }
});
