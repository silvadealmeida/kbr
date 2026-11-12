import AxeBuilder from "@axe-core/playwright";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";

type Api = "none" | "remote-only" | "available" | "downloadable" | "unavailable";

async function authenticate(context: BrowserContext) {
  await context.addCookies([
    { ...testAuthCookie(Date.now(), createTestUser()), url: BASE_URL },
  ]);
}

/** Reconhecedor falso: prova a lógica do app, NÃO o reconhecimento real. */
async function installFakeSpeech(page: Page, api: Api) {
  await page.addInitScript((mode) => {
    const w = window as unknown as Record<string, unknown>;
    const log = { starts: 0, stops: 0, aborts: 0, installs: 0, last: null as unknown };
    w.__speech = log;
    class Fake {
      lang = "";
      processLocally: boolean | undefined;
      onstart: (() => void) | null = null;
      onresult: ((e: unknown) => void) | null = null;
      onerror: ((e: { error: string }) => void) | null = null;
      onend: (() => void) | null = null;
      constructor() {
        log.last = this;
      }
      start() {
        log.starts += 1;
        setTimeout(() => this.onstart?.(), 0);
      }
      stop() {
        log.stops += 1;
        setTimeout(() => this.onend?.(), 0);
      }
      abort() {
        log.aborts += 1;
      }
    }
    // O Chromium headless do Playwright derruba o renderer em
    // `SpeechRecognition.available()`; por isso os dois construtores reais são
    // sempre substituídos (por um falso, ou por undefined no caso "sem API").
    w.SpeechRecognition = undefined;
    w.webkitSpeechRecognition = undefined;
    if (mode !== "none") {
      if (mode !== "remote-only") {
        Object.assign(Fake, {
          available: async () => mode,
          install: async () => {
            log.installs += 1;
            return true;
          },
        });
      }
      w.webkitSpeechRecognition = Fake;
    }
    w.__say = (...alts: string[]) => {
      const rec = log.last as Fake;
      rec.onresult?.({
        resultIndex: 0,
        results: {
          length: 1,
          0: { length: alts.length, isFinal: true, ...Object.fromEntries(alts.map((t, i) => [i, { transcript: t }])) },
        },
      });
    };
    w.__fail = (error: string) => (log.last as Fake).onerror?.({ error });
    w.__end = () => (log.last as Fake).onend?.();
  }, api);
}

const counters = (page: Page) =>
  page.evaluate(() => {
    const s = (window as unknown as { __speech: Record<string, number> }).__speech;
    return { starts: s.starts, stops: s.stops, aborts: s.aborts, installs: s.installs };
  });

test.describe("prática de fala (reconhecedor simulado)", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("não ativa o microfone ao abrir nem ao ouvir o modelo", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    await expect(page.getByText("Reconhecimento no aparelho")).toBeVisible();
    await page.getByRole("button", { name: "Ouvir o modelo" }).first().click();
    expect((await counters(page)).starts).toBe(0);
  });

  test("modo local: fala, mostra o texto reconhecido e a correspondência", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await expect(page.getByText("Microfone ligado")).toBeVisible();
    const rec = await page.evaluate(() => {
      const r = (window as unknown as { __speech: { last: { lang: string; processLocally: boolean } } }).__speech.last;
      return { lang: r.lang, local: r.processLocally };
    });
    expect(rec).toEqual({ lang: "ko-KR", local: true });

    await page.evaluate(() => (window as never as { __say: (...a: string[]) => void }).__say("엄마"));
    await page.evaluate(() => (window as never as { __end: () => void }).__end());
    await expect(page.getByText("Reconhecemos:")).toBeVisible();
    await expect(page.getByText("Corresponde ao texto esperado.", { exact: true })).toBeVisible();
    await expect(page.getByText(/não avalia a qualidade da sua\s+pronúncia/)).toBeVisible();
  });

  test("texto diferente não é corrigido nem elogiado", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.evaluate(() => (window as never as { __say: (...a: string[]) => void }).__say("아빠"));
    await page.evaluate(() => (window as never as { __end: () => void }).__end());
    await expect(page.getByText(/não corresponde ao texto esperado/)).toBeVisible();
    await expect(page.getByText("Corresponde ao texto esperado.", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Tentar de novo" }).first()).toBeVisible();
  });

  test("modo remoto exige consentimento antes de ativar o microfone", async ({ page }) => {
    await installFakeSpeech(page, "unavailable");
    await page.goto("/fala");
    await expect(page.getByText("O navegador pode enviar sua voz a um serviço externo")).toBeVisible();
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText(/Autorize o reconhecimento pelo navegador/)).toBeVisible();
    expect((await counters(page)).starts).toBe(0);

    await page.getByRole("button", { name: "Permitir reconhecimento pelo navegador" }).click();
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    expect((await counters(page)).starts).toBe(1);
    const local = await page.evaluate(
      () => (window as never as { __speech: { last: { processLocally?: boolean } } }).__speech.last.processLocally,
    );
    expect(local).toBeUndefined();
  });

  test("navegador sem available() é tratado como remoto/desconhecido", async ({ page }) => {
    await installFakeSpeech(page, "remote-only");
    await page.goto("/fala");
    await expect(page.getByText("Não conseguimos confirmar reconhecimento local")).toBeVisible();
    await expect(page.getByText("Reconhecimento no aparelho")).toHaveCount(0);
  });

  test("pacote local só é instalado após o clique", async ({ page }) => {
    await installFakeSpeech(page, "downloadable");
    await page.goto("/fala");
    const install = page.getByRole("button", { name: "Instalar reconhecimento local (coreano)" });
    await expect(install).toBeVisible();
    expect((await counters(page)).installs).toBe(0);
    await install.click();
    await expect.poll(async () => (await counters(page)).installs).toBe(1);
  });

  test("permissão negada e erros mostram mensagem não punitiva", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    const speak = page.getByRole("button", { name: "Falar" }).first();
    await speak.click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.evaluate(() => (window as never as { __fail: (e: string) => void }).__fail("not-allowed"));
    await expect(page.getByText(/acesso ao microfone está bloqueado/)).toBeVisible();

    await page.getByRole("button", { name: "Tentar de novo" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.evaluate(() => (window as never as { __end: () => void }).__end());
    await expect(page.getByText(/Não ouvimos nada/)).toBeVisible();
  });

  test("Parar e Cancelar liberam o microfone", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    await page.getByRole("button", { name: "Falar" }).first().click();
    await page.getByRole("button", { name: "Cancelar" }).click();
    await expect(page.getByText("Microfone ligado")).toHaveCount(0);
    expect((await counters(page)).aborts).toBeGreaterThanOrEqual(1);

    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.getByRole("button", { name: "Parar" }).click();
    expect((await counters(page)).stops).toBe(1);
  });

  test("desmontar por navegação interna aborta a captura", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/hangul");
    await page.getByRole("link", { name: "Abrir a prática de fala" }).click();
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.getByRole("link", { name: "Hangul" }).first().click();
    await expect(page).toHaveURL(/\/hangul$/);
    expect((await counters(page)).aborts).toBeGreaterThanOrEqual(1);
  });

  test("sem API: avisa e o campo de texto continua funcionando", async ({ page }) => {
    await installFakeSpeech(page, "none");
    await page.goto("/fala");
    await expect(page.getByText("Reconhecimento de fala indisponível")).toBeVisible();
    await expect(page.getByRole("button", { name: "Falar" }).first()).toBeDisabled();
    await page.getByText("Prefere digitar ou usar o ditado do teclado?").first().click();
    await page.getByLabel("Texto em coreano").first().fill("엄마");
    await page.getByRole("button", { name: "Comparar" }).first().click();
    await expect(page.getByText("Você escreveu:")).toBeVisible();
    await expect(page.getByText("Corresponde ao texto esperado.", { exact: true })).toBeVisible();
  });

  test("nada do que foi falado é guardado no navegador", async ({ page }) => {
    await installFakeSpeech(page, "available");
    await page.goto("/fala");
    await page.getByRole("button", { name: "Falar" }).first().click();
    await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
    await page.evaluate(() => (window as never as { __say: (...a: string[]) => void }).__say("엄마"));
    await page.evaluate(() => (window as never as { __end: () => void }).__end());
    await expect(page.getByText("Reconhecemos:")).toBeVisible();
    const stored = await page.evaluate(() =>
      JSON.stringify([{ ...localStorage }, { ...sessionStorage }, document.cookie]),
    );
    expect(stored).not.toContain("Reconhecemos");
    expect(stored).not.toContain("transcript");
    // "엄마" pode existir no progresso do curso; o que não pode existir é chave de fala.
    expect(stored.toLowerCase()).not.toMatch(/speech|fala|consent/);
  });
});

test.describe("acessibilidade da prática de fala (axe)", () => {
  async function expectNoViolations(page: Page, label: string) {
    // Igual ao helper de a11y.spec: não medir contraste no meio de uma
    // transição de cor/opacidade (ex.: botão que acabou de ser habilitado).
    await page.evaluate(async () => {
      const deadline = performance.now() + 1500;
      let quiet = 0;
      while (performance.now() < deadline) {
        await new Promise(requestAnimationFrame);
        const running = document.getAnimations().some((a) => {
          const t = a.effect?.getTiming();
          return a.playState === "running" && t?.iterations !== Infinity;
        });
        quiet = running ? 0 : quiet + 1;
        if (quiet >= 4) return;
      }
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const summary = results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target.join(" ")),
    }));
    expect(summary, `${label}: ${JSON.stringify(summary, null, 2)}`).toEqual([]);
  }

  for (const scheme of ["light", "dark"] as const) {
    test(`estados principais sem violações em ${scheme}`, async ({ page, context }) => {
      await authenticate(context);
      await page.emulateMedia({ colorScheme: scheme });
      await installFakeSpeech(page, "unavailable");
      await page.goto("/fala");
      await expect(page.getByRole("heading", { level: 1, name: "Prática de fala" })).toBeVisible();
      await expect(page.getByText("O navegador pode enviar sua voz a um serviço externo")).toBeVisible();
      await expectNoViolations(page, `${scheme} consentimento`);

      await page.getByRole("button", { name: "Permitir reconhecimento pelo navegador" }).click();
      await page.getByRole("button", { name: "Falar" }).first().click();
      await expect(page.getByText("Ouvindo… fale agora.")).toBeVisible();
      await expectNoViolations(page, `${scheme} ouvindo`);

      await page.evaluate(() => (window as never as { __say: (...a: string[]) => void }).__say("아빠"));
      await page.evaluate(() => (window as never as { __end: () => void }).__end());
      await expect(page.getByText("Reconhecemos:")).toBeVisible();
      await page.getByText("Prefere digitar ou usar o ditado do teclado?").first().click();
      await expectNoViolations(page, `${scheme} resultado`);
    });
  }

  test("estado sem suporte sem violações", async ({ page, context }) => {
    await authenticate(context);
    await installFakeSpeech(page, "none");
    await page.goto("/fala");
    await expect(page.getByText("Reconhecimento de fala indisponível")).toBeVisible();
    await expectNoViolations(page, "sem suporte");
  });
});
