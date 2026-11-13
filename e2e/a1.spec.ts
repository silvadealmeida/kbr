import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<
  BrowserContext,
  { user: ReturnType<typeof createTestUser>; storageKey: string }
>();

const LESSON_IDS = Array.from({ length: 40 }, (_, index) =>
  `a1-l${String(index + 1).padStart(2, "0")}`,
);
const CHECKPOINT_IDS = Array.from({ length: 8 }, (_, index) =>
  `a1-c${String(index + 1).padStart(2, "0")}`,
);
const ALL_STEP_IDS = [...LESSON_IDS, ...CHECKPOINT_IDS];

type Answer =
  | { kind: "choice"; label: string }
  | { kind: "text"; value: string };

/** Gabarito da a1-l01; a ordem segue a lição e cada item é respondido uma vez. */
const ANSWERS: readonly Answer[] = [
  { kind: "choice", label: "안녕하세요" },
  { kind: "choice", label: "이에요" },
  { kind: "text", value: "예요" },
  { kind: "choice", label: "Eu sou Minsu." },
  { kind: "text", value: "안녕하세요" },
  { kind: "text", value: "이름" },
  { kind: "choice", label: "이름이 뭐예요?" },
  { kind: "text", value: "저는 브라질 사람이에요." },
  { kind: "text", value: "Eu sou professor." },
  { kind: "text", value: "이름이 뭐예요?" },
];

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
        /* documento sem origem utilizável (about:blank) */
      }
    },
    {
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
    },
  );
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

async function playA1(page: Page) {
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
    await expect(
      page.getByRole("status").filter({ hasText: "Correto." }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: index === ANSWERS.length - 1 ? "Concluir lição" : "Continuar",
      })
      .click();
  }
}

test.describe("A1 — curso completo autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("visão geral mostra 40 lições, 8 checkpoints e só o primeiro passo clicável", async ({
    page,
  }) => {
    await page.goto("/a1");

    await expect(page.getByRole("heading", { level: 1, name: "Coreano A1" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Coreano A1 · 40 lições e 8 checkpoints" }),
    ).toBeVisible();
    await expect(page.getByText("0 de 40")).toBeVisible();
    await expect(page.getByText("0 de 8")).toBeVisible();
    await expect(page.getByText("0 de 48")).toBeVisible();
    await expect(page.getByText(/Conteúdo coreano original em revisão/)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Módulo 1 · Primeiro contato/ })).toBeVisible();
    await expect(page.getByText(/não certifica CEFR ou TOPIK/)).toBeVisible();
    await expect(page.getByText("Em desenvolvimento")).toHaveCount(0);

    const a1Links = await page
      .locator("main a[href^='/a1/']")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(new Set(a1Links)).toEqual(new Set(["/a1/a1-l01"]));
    await expect(page.getByText("Bloqueado").first()).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test("a primeira lição ensina antes de testar, conclui e libera a próxima", async ({
    page,
  }) => {
    await page.goto("/a1/a1-l01");

    await expect(page.getByRole("heading", { level: 1, name: "Olá, eu sou…" })).toBeVisible();
    await expect(page.getByText("Lição 1 de 40")).toBeVisible();
    await expect(page.getByText("Diálogo", { exact: true })).toBeVisible();
    await expect(page.getByText("Minsu e Ana se conhecem")).toBeVisible();
    await expect(page.getByText("Prazer em conhecer você.").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Ouvir a fala/ }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Como a frase se organiza" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /이에요 \/ 예요/ })).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Salvar 안녕하세요 no meu vocabulário" }),
    ).toBeVisible();
    expect(
      await page.evaluate((key) => {
        const raw = window.localStorage.getItem(key);
        return raw ? Object.keys(JSON.parse(raw).cards ?? {}).length : 0;
      }, storageKeyFor(page.context())),
    ).toBe(0);

    await page.getByRole("button", { name: "Começar a prática" }).click();
    await expect(page.getByText("Prática guiada")).toBeVisible();
    await expect(page.getByText("Item 1 de 10 · mínimo 8 de 10")).toBeVisible();
    await playA1(page);

    await expect(page.getByRole("heading", { name: "Lição concluída" })).toBeVisible();
    await expect(page.getByText("Você acertou 10 de 10 (100%).")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Próximo: a1-l02/ }),
    ).toHaveAttribute("href", "/a1/a1-l02");

    await expect
      .poll(async () =>
        page.evaluate(
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}").lessons ?? {},
          storageKeyFor(page.context()),
        ),
      )
      .toEqual({ "a1-l01": { done: true, score: 100 } });

    await page
      .getByRole("button", { name: "Salvar 안녕하세요 no meu vocabulário" })
      .click();
    await expect(
      page.getByRole("button", { name: "Remover 안녕하세요 do meu vocabulário" }),
    ).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test("teclado coreano compõe a sílaba digitada", async ({ page }) => {
    await page.goto("/a1/a1-l01");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "안녕하세요", exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();

    await page
      .getByRole("group", { name: "Alternativas" })
      .getByRole("button", { name: "이에요", exact: true })
      .click();
    await page.getByRole("button", { name: "Conferir" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();

    await page.getByRole("button", { name: "Teclado coreano" }).click();
    const input = page.getByLabel("Sua resposta");
    await page.getByRole("button", { name: "Inserir ㅇ" }).click();
    await page.getByRole("button", { name: "Inserir ㅖ" }).click();
    await expect(input).toHaveValue("예");

    await page.getByRole("button", { name: "Inserir ㅇ" }).click();
    await page.getByRole("button", { name: "Inserir ㅛ" }).click();
    await expect(input).toHaveValue("예요");

    await page.getByRole("button", { name: "Apagar o último jamo" }).click();
    await expect(input).toHaveValue("예ㅇ");

    await page.getByRole("button", { name: "Inserir ㅛ" }).click();
    await expect(input).toHaveValue("예요");
    await page.getByRole("button", { name: "Conferir" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
  });

  test("lição bloqueada não abre por URL direta e abre depois do pré-requisito", async ({
    context,
    page,
  }) => {
    await page.goto("/a1/a1-l02");
    await expect(page.getByRole("heading", { level: 1, name: "De onde você é?" })).toBeVisible();
    await expect(page.getByText("Lição bloqueada")).toBeVisible();
    await expect(page.getByText("Pendentes: a1-l01.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Começar a prática" })).toHaveCount(0);

    await page.context().clearCookies();
    await authenticate(page.context());
    await seedProgress(page.context(), { "a1-l01": { done: true, score: 100 } });
    await page.goto("/a1/a1-l02");
    await expect(page.getByRole("heading", { level: 1, name: "De onde você é?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Começar a prática" })).toBeVisible();
    await expect(page.getByText("Lição bloqueada")).toHaveCount(0);
  });

  test("checkpoint do módulo bloqueia por URL direta e abre com as cinco lições", async ({
    context,
    page,
  }) => {
    await page.goto("/a1/a1-c01");
    await expect(
      page.getByRole("heading", { level: 1, name: "Checkpoint · Primeiro contato" }),
    ).toBeVisible();
    await expect(page.getByText("Checkpoint bloqueado")).toBeVisible();
    await expect(page.getByText(/Pendentes: a1-l01, a1-l02/)).toBeVisible();
    await expect(page.getByText("20/25")).toHaveCount(0);

    await page.context().clearCookies();
    await authenticate(page.context());
    await seedProgress(
      page.context(),
      Object.fromEntries(
        LESSON_IDS.slice(0, 5).map((id) => [id, { done: true, score: 100 }]),
      ),
    );
    await page.goto("/a1/a1-c01");
    await expect(page.getByRole("heading", { name: "Como funciona" })).toBeVisible();
    await expect(page.getByText("20/25")).toBeVisible();
    await expect(page.getByRole("button", { name: "Começar checkpoint" })).toBeVisible();
  });

  test("checkpoint final só abre com os 47 passos anteriores e exige 32 de 40", async ({
    context,
    page,
  }) => {
    await seedProgress(
      context,
      Object.fromEntries(
        [...LESSON_IDS, ...CHECKPOINT_IDS.slice(0, 7)].map((id) => [
          id,
          { done: true, score: 100 },
        ]),
      ),
    );
    await page.goto("/a1/a1-c08");
    await expect(
      page.getByRole("heading", { level: 1, name: "Desempenho A1 interno" }),
    ).toBeVisible();
    await expect(page.getByText("32/40")).toBeVisible();
    await expect(page.getByRole("button", { name: "Começar checkpoint" })).toBeVisible();
    await expect(page.getByText("Curso A1 concluído")).toHaveCount(0);
  });

  test("curso completo mostra a conclusão interna, estatísticas e revisão", async ({
    context,
    page,
  }) => {
    await seedProgress(
      context,
      Object.fromEntries(ALL_STEP_IDS.map((id) => [id, { done: true, score: 100 }])),
    );
    await page.goto("/a1");

    await expect(
      page.getByRole("heading", { name: "Você concluiu o percurso A1 do KBR" }),
    ).toBeVisible();
    await expect(page.getByText("40 de 40").first()).toBeVisible();
    await expect(page.getByText("8 de 8").first()).toBeVisible();
    await expect(page.getByText("48 de 48").first()).toBeVisible();
    await expect(page.getByText(/Não é certificado CEFR/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Revisar vocabulário" }),
    ).toHaveAttribute("href", "/vocabulario/revisao");

    await page.goto("/a1/a1-c08");
    await expect(page.getByRole("heading", { name: "Curso A1 concluído" })).toBeVisible();
    await expect(page.getByText(/Esta é a conclusão interna/)).toBeVisible();
  });

  test("o áudio coreano só toca após o clique e informa a fonte", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "webkit", "stub de voz indisponível no WebKit");

    await page.addInitScript(() => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      Object.defineProperty(window, "SpeechSynthesisUtterance", {
        configurable: true,
        value: class {
          constructor(public text: string) {}
        },
      });
      const voice = {
        lang: "ko-KR",
        name: "Voz de teste",
        default: true,
        localService: true,
        voiceURI: "t",
      };
      Object.defineProperty(synth, "getVoices", {
        configurable: true,
        value: () => [voice],
      });
      Object.defineProperty(synth, "cancel", {
        configurable: true,
        value: () => {},
      });
      Object.defineProperty(synth, "speak", {
        configurable: true,
        value: (utterance: { onstart?: () => void; onend?: () => void }) => {
          setTimeout(() => utterance.onstart?.(), 0);
          setTimeout(() => utterance.onend?.(), 50);
        },
      });
    });

    const audioRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/audio/")) audioRequests.push(request.url());
    });

    await page.goto("/a1/a1-l01");
    expect(audioRequests).toEqual([]);

    await page.getByRole("button", { name: "Ouvir a fala" }).first().click();
    await expect(
      page.getByRole("button", { name: "Ouvir novamente" }).first(),
    ).toBeVisible({ timeout: 10_000 });
    expect(audioRequests.some((url) => url.includes("/audio/v1/"))).toBe(true);
    await expect(page.getByText(/sintetizado/).first()).toBeVisible();
  });

  test("responsivo e tema escuro sem rolagem horizontal", async ({ page }) => {
    for (const width of [320, 375, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/a1/a1-l01");
      await expect(page.getByRole("heading", { level: 1, name: "Olá, eu sou…" })).toBeVisible();
      await expectNoHorizontalOverflow(page);

      const undersized = await page.evaluate(() => {
        const targets = Array.from(
          document.querySelectorAll("article button:not([disabled]), article a[href]"),
        ).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        return targets
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: (element.getAttribute("aria-label") ?? element.textContent ?? "")
                .trim()
                .slice(0, 40),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((target) => target.width < 44 || target.height < 44);
      });
      expect(undersized, `alvos de toque em ${width}px`).toEqual([]);
    }

    await page.setViewportSize({ width: 375, height: 800 });
    await page.getByRole("button", { name: /tema/ }).and(page.locator(":visible")).click();
    expect(
      await page.evaluate(() => document.documentElement.classList.contains("dark")),
    ).toBe(true);
    await expectNoHorizontalOverflow(page);
  });

  test("rota exige sessão", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/a1");
    await expect(page).toHaveURL(/\/?next=%2Fa1/);
    await page.goto("/a1/a1-l01");
    await expect(page).toHaveURL(/next=%2Fa1%2Fa1-l01/);
  });
});
