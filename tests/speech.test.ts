import { describe, expect, it, vi } from "vitest";
import { matchTranscript, normalizeForComparison } from "@/lib/speech/match";
import {
  SpeechController,
  detectSpeechSupport,
  installLocalKorean,
  probeLocalKorean,
  type RecognitionConstructorLike,
  type RecognitionLike,
  type SpeechState,
} from "@/lib/speech/recognition";

class FakeRecognition implements RecognitionLike {
  static instances: FakeRecognition[] = [];
  lang = "";
  continuous = true;
  interimResults = true;
  maxAlternatives = 1;
  processLocally?: boolean;
  onstart: RecognitionLike["onstart"] = null;
  onresult: RecognitionLike["onresult"] = null;
  onerror: RecognitionLike["onerror"] = null;
  onend: RecognitionLike["onend"] = null;
  start = vi.fn(() => this.onstart?.());
  stop = vi.fn();
  abort = vi.fn();
  constructor() {
    FakeRecognition.instances.push(this);
  }
  say(...alternatives: string[]) {
    this.onresult?.({
      resultIndex: 0,
      results: {
        length: 1,
        0: {
          length: alternatives.length,
          isFinal: true,
          ...Object.fromEntries(alternatives.map((t, i) => [i, { transcript: t }])),
        },
      },
    });
  }
}

function setup(options: { listenTimeoutMs?: number } = {}) {
  FakeRecognition.instances = [];
  const states: SpeechState[] = [];
  const controller = new SpeechController({
    ctor: FakeRecognition as unknown as RecognitionConstructorLike,
    onStateChange: (s) => states.push(s),
    ...options,
  });
  const rec = () => FakeRecognition.instances.at(-1)!;
  return { controller, states, rec };
}

describe("matchTranscript", () => {
  it("reconhece correspondência exata e normalizada, sem corrigir erros", () => {
    expect(matchTranscript("안녕하세요", ["안녕하세요"]).kind).toBe("exact");
    expect(matchTranscript("한국어를 공부해요", ["한국어를공부해요."]).kind).toBe("normalized");
    expect(matchTranscript("고양이", ["강아지"])).toEqual({
      kind: "different",
      heard: "강아지",
      index: -1,
    });
  });

  it("não equipara jamo ou sílabas parecidas", () => {
    expect(matchTranscript("바다", ["파다"]).kind).toBe("different");
    expect(matchTranscript("ㄱ", ["가"]).kind).toBe("different");
  });

  it("usa hipóteses alternativas e prefere a correspondência exata", () => {
    expect(matchTranscript("엄마", ["엄아", "엄마"])).toMatchObject({ kind: "exact", index: 1 });
    expect(matchTranscript("엄마", [])).toMatchObject({ kind: "different", heard: "" });
  });

  it("normaliza só NFC, espaços e pontuação", () => {
    expect(normalizeForComparison("한 국 어!")).toBe("한국어");
    expect("가".normalize("NFD")).not.toBe("가");
    expect(matchTranscript("가", ["가".normalize("NFD")]).kind).toBe("exact");
  });
});

describe("detectSpeechSupport / local probe", () => {
  it("detecta por recurso, com prefixo webkit e sem window", () => {
    expect(detectSpeechSupport(undefined)).toEqual({ supported: false, reason: "no-window" });
    expect(detectSpeechSupport({})).toEqual({ supported: false, reason: "no-api" });
    expect(detectSpeechSupport({ isSecureContext: false, SpeechRecognition: FakeRecognition as never }))
      .toEqual({ supported: false, reason: "insecure-context" });
    const s = detectSpeechSupport({ webkitSpeechRecognition: FakeRecognition as never });
    expect(s).toMatchObject({ supported: true, canQueryLocal: false, canInstallLocal: false });
  });

  it("consulta o pacote local só quando available() existe", async () => {
    const plain = detectSpeechSupport({ webkitSpeechRecognition: FakeRecognition as never });
    expect(await probeLocalKorean(plain)).toBe("not-exposed");

    for (const value of ["available", "downloadable", "downloading", "unavailable"]) {
      const ctor = Object.assign(class extends FakeRecognition {}, {
        available: vi.fn().mockResolvedValue(value),
      });
      const support = detectSpeechSupport({ SpeechRecognition: ctor as never });
      expect(await probeLocalKorean(support)).toBe(value);
      expect(ctor.available).toHaveBeenCalledWith({ langs: ["ko-KR"], processLocally: true });
    }

    const odd = Object.assign(class extends FakeRecognition {}, {
      available: vi.fn().mockResolvedValue("???"),
    });
    expect(await probeLocalKorean(detectSpeechSupport({ SpeechRecognition: odd as never }))).toBe("unknown");
    const throws = Object.assign(class extends FakeRecognition {}, {
      available: vi.fn().mockRejectedValue(new Error("x")),
    });
    expect(await probeLocalKorean(detectSpeechSupport({ SpeechRecognition: throws as never }))).toBe("unknown");
  });

  it("install() só roda quando chamado e trata falha", async () => {
    const install = vi.fn().mockResolvedValue(true);
    const ctor = Object.assign(class extends FakeRecognition {}, {
      available: vi.fn().mockResolvedValue("downloadable"),
      install,
    });
    const support = detectSpeechSupport({ SpeechRecognition: ctor as never });
    await probeLocalKorean(support);
    expect(install).not.toHaveBeenCalled();
    expect(await installLocalKorean(support)).toBe(true);
    install.mockRejectedValueOnce(new Error("blocked"));
    expect(await installLocalKorean(support)).toBe(false);
    expect(await installLocalKorean({ supported: false, reason: "no-api" })).toBe(false);
  });
});

describe("SpeechController", () => {
  it("nunca cria o reconhecedor antes de start()", () => {
    setup();
    expect(FakeRecognition.instances).toHaveLength(0);
  });

  it("modo local: ko-KR, processLocally e resultado com alternativas", () => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    expect(rec()).toMatchObject({ lang: "ko-KR", processLocally: true, continuous: false, interimResults: false });
    expect(states.map((s) => s.status)).toEqual(["starting", "listening"]);
    rec().say("안녕하세요", "안녕 하세요");
    rec().onend?.();
    expect(states.at(-1)).toEqual({
      status: "result",
      hypotheses: ["안녕하세요", "안녕 하세요"],
      mode: "local",
    });
    expect(rec().abort).toHaveBeenCalled();
  });

  it("modo remoto exige consentimento e não ativa o microfone sem ele", () => {
    const { controller, states } = setup();
    controller.start({ mode: "remote" });
    expect(FakeRecognition.instances).toHaveLength(0);
    expect(states.at(-1)).toEqual({ status: "error", reason: "consent-required" });
    controller.start({ mode: "remote", consent: true });
    expect(FakeRecognition.instances).toHaveLength(1);
    expect(FakeRecognition.instances[0]!.processLocally).toBeUndefined();
  });

  it.each([
    ["not-allowed", "not-allowed"],
    ["service-not-allowed", "not-allowed"],
    ["no-speech", "no-speech"],
    ["audio-capture", "audio-capture"],
    ["network", "network"],
    ["language-not-supported", "language-not-supported"],
    ["bad-grammar", "failed"],
  ])("erro %s vira %s e libera o microfone", (code, reason) => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "remote", consent: true });
    const r = rec();
    r.onerror?.({ error: code });
    expect(states.at(-1)).toEqual({ status: "error", reason });
    expect(r.abort).toHaveBeenCalled();
  });

  it("silêncio: onend sem resultado vira no-speech", () => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    rec().onend?.();
    expect(states.at(-1)).toEqual({ status: "error", reason: "no-speech" });
  });

  it("tempo esgotado ouvindo vira timeout e aborta", () => {
    vi.useFakeTimers();
    const { controller, states, rec } = setup({ listenTimeoutMs: 500 });
    controller.start({ mode: "local" });
    vi.advanceTimersByTime(499);
    expect(states.at(-1)?.status).toBe("listening");
    vi.advanceTimersByTime(2);
    expect(states.at(-1)).toEqual({ status: "error", reason: "timeout" });
    expect(rec().abort).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("Parar entrega o que já foi capturado; sem resposta final vira timeout", () => {
    vi.useFakeTimers();
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    rec().say("고양이");
    controller.stop();
    expect(states.at(-1)?.status).toBe("processing");
    expect(rec().stop).toHaveBeenCalled();
    rec().onend?.();
    expect(states.at(-1)).toMatchObject({ status: "result", hypotheses: ["고양이"] });

    controller.start({ mode: "local" });
    controller.stop();
    vi.advanceTimersByTime(5_000);
    expect(states.at(-1)).toEqual({ status: "error", reason: "timeout" });
    vi.useRealTimers();
  });

  it("Cancelar descarta resultados tardios e libera o microfone", () => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    const r = rec();
    controller.cancel();
    expect(r.abort).toHaveBeenCalled();
    expect(states.at(-1)).toEqual({ status: "idle" });
    r.onresult?.({ results: { length: 0 } }); // handlers foram removidos
    expect(r.onend).toBeNull();
    expect(states.at(-1)).toEqual({ status: "idle" });
  });

  it("ignora o erro 'aborted' e permite tentar de novo", () => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    rec().onerror?.({ error: "aborted" });
    expect(states.at(-1)?.status).toBe("listening");
    controller.start({ mode: "local" });
    expect(FakeRecognition.instances).toHaveLength(2);
    expect(FakeRecognition.instances[0]!.abort).toHaveBeenCalled();
  });

  it("destroy libera o microfone e silencia estados futuros", () => {
    const { controller, states, rec } = setup();
    controller.start({ mode: "local" });
    const count = states.length;
    controller.destroy();
    expect(rec().abort).toHaveBeenCalled();
    controller.start({ mode: "local" });
    expect(FakeRecognition.instances).toHaveLength(1);
    expect(states).toHaveLength(count);
  });

  it("start() que lança vira erro, sem vazar microfone", () => {
    class Throwing extends FakeRecognition {
      start = vi.fn(() => {
        throw new Error("InvalidStateError");
      });
    }
    FakeRecognition.instances = [];
    const states: SpeechState[] = [];
    const controller = new SpeechController({
      ctor: Throwing as unknown as RecognitionConstructorLike,
      onStateChange: (s) => states.push(s),
    });
    controller.start({ mode: "local" });
    expect(states.at(-1)).toEqual({ status: "error", reason: "failed" });
    expect(FakeRecognition.instances[0]!.abort).toHaveBeenCalled();
  });
});
