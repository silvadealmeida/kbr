import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const HANGUL = /[\uAC00-\uD7A3\u3131-\u318E]/;

async function authenticate(context: BrowserContext) {
  const user = createTestUser();
  await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
  return user;
}

function accountKey(userId: string) {
  return `kbr:user:${userId}:v1`;
}

async function seedProgress(
  context: BrowserContext,
  userId: string,
  seed: {
    lessons?: Record<string, { done: boolean; score: number }>;
    cards?: Record<string, { box: number; due: string }>;
    history?: { id?: string; exerciseId: string; correct: boolean; at: string }[];
  },
) {
  await context.addInitScript(
    ({ key, value }) => {
      try {
        if (window.sessionStorage.getItem("kbr:e2e:webkit-seeded") === "1") return;
        window.localStorage.setItem(key, JSON.stringify(value));
        window.sessionStorage.setItem("kbr:e2e:webkit-seeded", "1");
      } catch {
        /* documento sem origem utilizável */
      }
    },
    {
      key: accountKey(userId),
      value: {
        v: 1,
        lessons: seed.lessons ?? {},
        cards: seed.cards ?? {},
        history: seed.history ?? [],
        streak: 0,
        dailyGoal: 10,
        lastActive: "2026-11-10T12:00:00.000Z",
      },
    },
  );
}

function lessonProgress(ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, { done: true, score: 100 }]));
}

async function noHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

/**
 * Todo texto coreano visível deve estar dentro de um elemento com lang="ko".
 * Scripts e trechos ignorados por leitores de tela ficam de fora.
 */
async function expectKoreanLanguage(page: Page) {
  const offenders = await page.evaluate((hangulSource) => {
    const hangul = new RegExp(hangulSource);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const found: string[] = [];
    let node = walker.nextNode();
    while (node) {
      const text = node.textContent?.trim() ?? "";
      const parent = node.parentElement;
      if (hangul.test(text) && parent) {
        if (
          !parent.closest('[lang="ko"]') &&
          !parent.closest('script, style, [aria-hidden="true"]')
        ) {
          found.push(text.slice(0, 40));
        }
      }
      node = walker.nextNode();
    }
    return found;
  }, HANGUL.source);

  expect(offenders).toEqual([]);
}

async function answerAndContinue(page: Page, option: string, last = false) {
  await page
    .getByRole("group", { name: "Alternativas" })
    .getByRole("button", { name: option, exact: true })
    .click();
  await page.getByRole("button", { name: "Conferir" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
  await page.getByRole("button", { name: last ? "Concluir lição" : "Continuar" }).click();
}

const H01_ANSWERS = [
  "2 blocos",
  "Verdadeiro",
  "Falso",
  "Na posição medial, à direita ou embaixo da consoante inicial",
  "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
  "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
];

test.describe("WebKit/iOS automatizado (sem dispositivo físico)", () => {
  test("fluxo de UI do Google inicia OAuth com PKCE e destino interno", async ({ page }) => {
    let authorizeUrl = "";
    await page.route("**/auth/v1/authorize*", async (route) => {
      authorizeUrl = route.request().url();
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<!doctype html><title>OAuth mockado</title><p>oauth</p>",
      });
    });

    await page.goto("/?next=%2Frevisao");
    await page
      .getByRole("main")
      .getByRole("button", { name: "Entrar com Google" })
      .first()
      .click();
    await expect.poll(() => authorizeUrl).not.toBe("");

    const url = new URL(authorizeUrl);
    expect(url.pathname).toBe("/auth/v1/authorize");
    expect(url.searchParams.get("provider")).toBe("google");
    expect(url.searchParams.get("redirect_to")).toBe(`${BASE_URL}/auth/callback`);
    expect(url.searchParams.get("code_challenge_method")).toBe("s256");
    expect(url.searchParams.get("code_challenge")).toBeTruthy();

    const nextCookie = (await page.context().cookies()).find(
      (cookie) => cookie.name === "kbr_auth_next",
    );
    expect(nextCookie?.value).toBe("%2Frevisao");
  });

  test("voltar e avançar preservam páginas públicas", async ({ page }) => {
    await page.goto("/");
    await page.goto("/privacidade");
    await expect(
      page.getByRole("heading", { level: 1, name: "Privacidade e proteção de dados" }),
    ).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);

    // Em páginas estáticas o forward é estável; o mesmo não vale para o player
    // sob carga no WebKit, coberto pelo teste de retorno ao curso.
    await page.goForward();
    await expect(page).toHaveURL(/\/privacidade$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Privacidade e proteção de dados" }),
    ).toBeVisible();
  });

  test("bancada e camadas de pronúncia com teclado e foco", async ({ context, page }) => {
    const user = await authenticate(context);
    const completed = [
      ...Array.from({ length: 20 }, (_, index) => `h${String(index + 1).padStart(2, "0")}`),
      "c1", "c2", "c3",
    ];
    await seedProgress(context, user.id, { lessons: lessonProgress(completed) });
    await page.goto("/hangul/h16");
    await page.getByRole("button", { name: "Refazer lição" }).click();
    await expect(page.getByText("Bancada de composição")).toBeVisible();
    const initial = page.getByRole("group", { name: "Consoante inicial" }).getByRole("button", { name: "ㄱ" });
    await initial.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("group", { name: "Vogal" }).getByRole("button", { name: "ㅏ" }).click();
    await expect(page.getByText("Sua sílaba:")).toContainText("가");
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeFocused();
    await noHorizontalOverflow(page);

    await page.goto("/hangul/h21");
    const layer = page.getByRole("region", { name: /Camadas de pronúncia: 한국어/ });
    const rails = layer.locator("ol > li");
    await expect(rails.nth(0).locator('[lang="ko"]')).toHaveText(["한", "국", "어"]);
    await expect(rails.nth(1).locator('[lang="ko"]')).toHaveText(["한", "구", "거"]);
    await expect(layer.getByText(/ㄱ de 국 passa/)).toBeVisible();
    await expect(layer.getByText(/som final passa/)).toBeVisible();
    await layer.getByRole("button", { name: "Ver comparação por bloco" }).click();
    await expect(layer.getByText("Bloco 2:")).toBeVisible();
    await layer.getByRole("button", { name: "Ocultar comparação por bloco" }).click();
    await expect(layer.getByText("Bloco 2:")).toHaveCount(0);
    await layer.getByRole("combobox", { name: "Exemplo" }).selectOption({ label: "음악" });
    const musicLayer = page.getByRole("region", { name: /Camadas de pronúncia: 음악/ });
    await expect(musicLayer.locator("ol > li").nth(1).locator('[lang="ko"]')).toHaveText([
      "으",
      "막",
    ]);
    await noHorizontalOverflow(page);
  });

  test("lição, foco do feedback, Enter, histórico único e retorno ao curso", async ({
    context,
    page,
  }) => {
    const user = await authenticate(context);
    await page.goto("/hangul");
    await page.goto("/hangul/h01");
    await expect(page.getByRole("heading", { level: 1, name: /Um alfabeto/ })).toBeVisible();
    await page.getByRole("button", { name: "Começar a prática" }).click();

    await expect(page.getByRole("heading", { name: /Quantos blocos/ }).first()).toBeFocused();

    // Duas ativações no mesmo tick: a guarda por ref registra uma tentativa só.
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "2 blocos", exact: true })
      .click();
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (candidate) => candidate.textContent?.trim() === "Conferir",
      );
      button?.click();
      button?.click();
    });

    const feedback = page.getByRole("status").filter({ hasText: "Correto." });
    await expect(feedback).toBeVisible();
    await expect(feedback).toBeFocused();

    await expect
      .poll(async () => {
        const raw = await page.evaluate(
          (key) => window.localStorage.getItem(key),
          accountKey(user.id),
        );
        return raw ? JSON.parse(raw).history?.length : 0;
      })
      .toBe(1);

    await page.getByRole("button", { name: "Continuar" }).click();
    await answerAndContinue(page, "Verdadeiro");
    await answerAndContinue(page, "Falso");
    await answerAndContinue(
      page,
      "Na posição medial, à direita ou embaixo da consoante inicial",
    );
    await answerAndContinue(
      page,
      "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
    );
    await answerAndContinue(
      page,
      "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
      true,
    );

    await expect(page.getByRole("heading", { level: 1, name: "Lição concluída" })).toBeVisible();
    await noHorizontalOverflow(page);

    await page.goBack();
    await expect(page).toHaveURL(/\/hangul$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Aprender Hangul" }),
    ).toBeVisible();
    await expect(page.getByText("Concluída · 100%")).toBeVisible();

    // Reabrir a lição concluída não reinicia a prática. (O `forward` do WebKit
    // pode ser descartado sob carga; por isso ele é coberto em página estática.)
    await page.goto("/hangul/h01");
    await expect(page.getByRole("button", { name: "Refazer lição" })).toBeVisible();
  });

  test("painel, catálogo, checkpoint, revisão e idioma dos trechos coreanos", async ({
    context,
    page,
  }) => {
    const user = await authenticate(context);
    await seedProgress(context, user.id, {
      lessons: lessonProgress([
        "h01",
        "h02",
        "h03",
        "h04",
        "h05",
        "h06",
        "h07",
        "h08",
        "h09",
        "h10",
      ]),
      cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } },
    });

    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
    await expectKoreanLanguage(page);

    await page.goto("/cursos");
    await expect(page.getByRole("heading", { level: 1, name: "Cursos" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Abrir curso/ })).toBeVisible();

    await page.goto("/hangul/c1");
    await expect(page.getByRole("heading", { level: 1, name: /Checkpoint 1/ })).toBeVisible();
    await page.getByRole("button", { name: "Começar checkpoint" }).click();
    await expect(page.getByRole("heading", { name: /Ouça e escolha a sílaba/ }).first()).toBeFocused();
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "고", exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await noHorizontalOverflow(page);

    await page.goto("/revisao");
    await expect(page.getByText("Há 1 cartão para revisar.")).toBeVisible();
    await expectKoreanLanguage(page);
    await page.getByRole("button", { name: /Começar revisão/ }).click();
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "carne", exact: true })
      .click();
    await page.getByRole("button", { name: "Mostrar resposta" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page.getByRole("button", { name: /Concluir revisão/ }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Revisão concluída" }),
    ).toBeVisible();
  });

  test("offline, pendência e reconexão mantêm o progresso local", async ({ context, page }) => {
    const user = await authenticate(context);
    await seedProgress(context, user.id, {
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

    await page.getByRole("button", { name: /Começar revisão/ }).click();
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "carne", exact: true })
      .click();
    await page.getByRole("button", { name: "Mostrar resposta" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
    await page.getByRole("button", { name: /Concluir revisão/ }).click();
    await expect(
      page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
    ).toBeVisible();
    await expect(page.getByText("Progresso sincronizado com sua conta.")).toHaveCount(0);

    await expect
      .poll(async () => {
        const raw = await page.evaluate(
          (key) => window.localStorage.getItem(key),
          accountKey(user.id),
        );
        const stored = raw ? JSON.parse(raw) : null;
        return { box: stored?.cards?.["h:word:고기"]?.box, history: stored?.history?.length };
      })
      .toEqual({ box: 2, history: 1 });

    await page.unroute("**/rest/v1/**");
    await page.reload();
    await expect(page.getByText("Progresso sincronizado com sua conta.")).toBeVisible();
  });

  test("sair da conta não anuncia sessão expirada e o login seguinte restaura a conta", async ({
    context,
    page,
  }) => {
    const user = await authenticate(context);
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();

    // O menu lateral (≥768 px) repete o botão; o cartão da conta está em main.
    await page.getByRole("main").getByRole("button", { name: "Sair da conta" }).click();
    await expect(page).toHaveURL(/motivo=logout/);
    await expect(page.getByText("Você saiu da conta.", { exact: false })).toBeVisible();
    await expect(page.getByText("Sua sessão expirou", { exact: false })).toHaveCount(0);

    await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
    // O e-mail aparece no cartão da conta (main) e no menu lateral (oculto em
    // 390 px); validar o cartão visível evita falso negativo no WebKit móvel.
    await expect(page.getByRole("main").getByText(user.email)).toBeVisible();
  });

  test("reduced motion desativa a transição da barra de prática", async ({ context, page }) => {
    await authenticate(context);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/hangul/h01");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    const bar = page.getByRole("progressbar", { name: /Progresso da prática/ }).locator("div").first();
    const transition = await bar.evaluate((element) => {
      const style = getComputedStyle(element);
      return { property: style.transitionProperty, duration: style.transitionDuration };
    });
    expect(transition.property).toBe("none");

    // O selo de feedback não anima quando reduced motion está ativo; o texto
    // continua sendo o mesmo, então nenhuma informação depende do movimento.
    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "2 blocos", exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    const feedback = page.getByRole("status").filter({ hasText: "Correto." });
    await expect(feedback).toBeVisible();
    expect(
      await feedback.evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("none");

    await page.goto("/hangul");
    const anatomy = page.getByRole("region", { name: "Uma sílaba, três posições" });
    await expect(anatomy).toBeVisible();
    await anatomy.getByRole("button", { name: "Ver peças separadas" }).click();
    await expect(
      anatomy.getByRole("button", { name: "Ver bloco montado" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("viewport estreito e resposta textual não criam rolagem horizontal", async ({
    context,
    page,
  }) => {
    const user = await authenticate(context);
    await seedProgress(context, user.id, {
      lessons: lessonProgress(["h01", "h02", "h03"]),
    });
    await page.setViewportSize({ width: 390, height: 667 });
    await page.goto("/hangul/h04");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    for (const option of ["나", "고", "ㄱ + ㅗ e ㄱ + ㅣ", "가 e 구"]) {
      await answerAndContinue(page, option);
    }
    await page.getByRole("button", { name: "ㄴ", exact: true }).click();
    await page.getByRole("button", { name: "ㅏ", exact: true }).click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("button", { name: "ㄱ", exact: true }).click();
    await page.getByRole("button", { name: "ㅗ", exact: true }).click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();

    const input = page.getByLabel("Sua resposta");
    await expect(input).toBeVisible();
    expect(
      await input.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
    ).toBeGreaterThanOrEqual(16);
    await expect(input).toHaveAttribute("enterkeyhint", "done");
    await noHorizontalOverflow(page);

    // A altura menor simula o espaço restante com o teclado virtual aberto.
    await page.setViewportSize({ width: 390, height: 420 });
    await expect(input).toBeVisible();
    await noHorizontalOverflow(page);
  });
});
