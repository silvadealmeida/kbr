import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  AudioPlayer,
  pickKoreanVoice,
  type AudioPlaybackState,
  type PlaybackOutcome,
  type SpeechSynthesisLike,
  type SpeechUtteranceLike,
  type VoiceLike,
} from "@/lib/audio/playback";

const KO_KR: VoiceLike = {
  name: "Korean local",
  lang: "ko-KR",
  localService: true,
};

function createFakeAudio(options: { reject?: boolean } = {}) {
  const listeners = new Map<"ended" | "error", Set<() => void>>();
  const audio = {
    src: "",
    playbackRate: 1,
    preservesPitch: false,
    mozPreservesPitch: false,
    webkitPreservesPitch: false,
    currentTime: 0,
    play: vi.fn(async () => {
      if (options.reject) throw new Error("asset failed");
    }),
    pause: vi.fn(),
    addEventListener: (type: "ended" | "error", listener: () => void) => {
      const set = listeners.get(type) ?? new Set();
      set.add(listener);
      listeners.set(type, set);
    },
    removeEventListener: (type: "ended" | "error", listener: () => void) => {
      listeners.get(type)?.delete(listener);
    },
    emit: (type: "ended" | "error") => {
      for (const listener of [...(listeners.get(type) ?? [])]) listener();
    },
  };
  return audio;
}

class FakeSpeech implements SpeechSynthesisLike {
  voices: VoiceLike[] = [];
  utterances: SpeechUtteranceLike[] = [];
  listeners = new Set<() => void>();
  speak = vi.fn((utterance: SpeechUtteranceLike) => {
    this.utterances.push(utterance);
  });
  cancel = vi.fn();
  getVoices = () => this.voices;

  addEventListener = (_type: "voiceschanged", listener: () => void) => {
    this.listeners.add(listener);
  };

  removeEventListener = (_type: "voiceschanged", listener: () => void) => {
    this.listeners.delete(listener);
  };

  setVoices(voices: VoiceLike[]) {
    this.voices = voices;
    for (const listener of [...this.listeners]) listener();
  }
}

function createUtterance(text: string): SpeechUtteranceLike {
  return {
    text,
    lang: "",
    rate: 1,
    pitch: 1,
    voice: null,
    onstart: null,
    onend: null,
    onerror: null,
  };
}

async function flush() {
  for (let index = 0; index < 12; index += 1) await Promise.resolve();
}

function createPlayer(options: {
  audio?: ReturnType<typeof createFakeAudio>;
  speech?: FakeSpeech;
  resolveAsset?: (text: string) => string | null;
}) {
  const states: AudioPlaybackState[] = [];
  const speech = options.speech ?? new FakeSpeech();
  const audio = options.audio ?? createFakeAudio();
  const player = new AudioPlayer({
    resolveAsset:
      options.resolveAsset ?? ((text) => (text === "한" ? "/audio/한.mp3" : null)),
    createAudio: () => audio,
    speech,
    createUtterance,
    onStateChange: (state) => states.push(state),
    voiceWaitMs: 100,
    startTimeoutMs: 100,
    assetStartTimeoutMs: 100,
  });
  return { player, states, speech, audio };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("seleção de voz coreana", () => {
  test("prefere ko-KR local e ignora vozes não coreanas", () => {
    const voice = pickKoreanVoice([
      { name: "English", lang: "en-US", localService: true },
      { name: "Korean remote", lang: "ko-KR", localService: false },
      { name: "Korean local", lang: "ko-KR", localService: true },
    ]);

    expect(voice?.name).toBe("Korean local");
  });

  test("aceita outra variante coreana e retorna null sem voz coreana", () => {
    expect(pickKoreanVoice([{ name: "Korean", lang: "ko-KP" }])?.name).toBe(
      "Korean",
    );
    expect(pickKoreanVoice([{ name: "English", lang: "en-US" }])).toBeNull();
  });
});

describe("reprodução de arquivo estático", () => {
  test("toca o MP3 e termina no evento ended", async () => {
    const { player, states, audio } = createPlayer({});
    const outcome = player.play("한");

    await flush();
    expect(audio.src).toBe("/audio/한.mp3");
    expect(audio.play).toHaveBeenCalledOnce();
    expect(states).toContainEqual({ status: "playing", source: "asset" });

    audio.emit("ended");
    await expect(outcome).resolves.toEqual({ status: "ended", source: "asset" });
    expect(states.at(-1)).toEqual({ status: "ended", source: "asset" });
  });

  test("usa audioSrc explícito mesmo sem entrada no mapa", async () => {
    const { player, audio } = createPlayer({ resolveAsset: () => null });
    void player.play("한", { src: "/custom/ko.mp3" });
    await flush();

    expect(audio.src).toBe("/custom/ko.mp3");
  });

  test("aplica 0,75× e preservação de pitch no áudio gravado", async () => {
    const { player, audio } = createPlayer({});
    void player.play("한", { rate: 0.75 });
    await flush();

    expect(audio.playbackRate).toBe(0.75);
    expect(audio.preservesPitch).toBe(true);
  });
});

describe("fallback para voz do sistema", () => {
  test("cai para a voz coreana quando o MP3 falha", async () => {
    const speech = new FakeSpeech();
    speech.voices = [KO_KR];
    const audio = createFakeAudio({ reject: true });
    const { player, states } = createPlayer({ speech, audio });

    const outcome = player.play("한");
    await flush();

    expect(speech.speak).toHaveBeenCalledOnce();
    const utterance = speech.utterances[0]!;
    expect(utterance.lang).toBe("ko-KR");
    expect(utterance.voice).toBe(KO_KR);
    expect(utterance.rate).toBe(1);

    utterance.onstart?.();
    expect(states).toContainEqual({
      status: "playing",
      source: "speech",
      fallback: true,
    });

    utterance.onend?.();
    await expect(outcome).resolves.toEqual({
      status: "ended",
      source: "speech",
      fallback: true,
    });
  });

  test("cai para a voz quando o MP3 não responde", async () => {
    const speech = new FakeSpeech();
    speech.voices = [KO_KR];
    const audio = createFakeAudio();
    audio.play.mockImplementation(() => new Promise<void>(() => {}));
    const { player, states } = createPlayer({ speech, audio });

    const outcome = player.play("한");
    await flush();
    await vi.advanceTimersByTimeAsync(100);
    await flush();

    expect(audio.pause).toHaveBeenCalled();
    expect(speech.speak).toHaveBeenCalledOnce();
    speech.utterances[0]!.onstart?.();
    expect(states).toContainEqual({
      status: "playing",
      source: "speech",
      fallback: true,
    });

    speech.utterances[0]!.onend?.();
    await expect(outcome).resolves.toEqual({
      status: "ended",
      source: "speech",
      fallback: true,
    });
  });

  test("espera voiceschanged antes de desistir da voz coreana", async () => {
    const speech = new FakeSpeech();
    const { player, states } = createPlayer({ speech, resolveAsset: () => null });

    const outcome = player.play("한");
    await flush();
    expect(speech.speak).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(50);
    speech.setVoices([KO_KR]);
    await flush();

    expect(speech.speak).toHaveBeenCalledOnce();
    speech.utterances[0]!.onstart?.();
    expect(states).toContainEqual({ status: "playing", source: "speech" });

    speech.utterances[0]!.onend?.();
    await expect(outcome).resolves.toEqual({
      status: "ended",
      source: "speech",
    });
  });

  test("não fala com voz padrão quando não há voz coreana", async () => {
    const speech = new FakeSpeech();
    speech.voices = [{ name: "English", lang: "en-US" }];
    const { player, states } = createPlayer({
      speech,
      resolveAsset: () => null,
    });

    const outcome = player.play("한");
    await vi.advanceTimersByTimeAsync(100);
    await flush();

    expect(speech.speak).not.toHaveBeenCalled();
    expect(states).toContainEqual({
      status: "unavailable",
      reason: "no-korean-voice",
    });
    expect(states.some((state) => state.status === "playing")).toBe(false);
    await expect(outcome).resolves.toEqual({
      status: "unavailable",
      reason: "no-korean-voice",
    });
  });

  test("reporta erro quando a síntese começa mas não inicia", async () => {
    const speech = new FakeSpeech();
    speech.voices = [KO_KR];
    const { player, states } = createPlayer({
      speech,
      resolveAsset: () => null,
    });

    const outcome = player.play("한");
    await flush();
    await vi.advanceTimersByTimeAsync(100);
    await flush();

    expect(speech.cancel).toHaveBeenCalled();
    expect(states).toContainEqual({
      status: "unavailable",
      reason: "playback-error",
    });
    expect(states.some((state) => state.status === "playing")).toBe(false);
    await expect(outcome).resolves.toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
  });

  test("reporta erro de síntese sem fingir sucesso", async () => {
    const speech = new FakeSpeech();
    speech.voices = [KO_KR];
    const { player, states } = createPlayer({
      speech,
      resolveAsset: () => null,
    });

    const outcome = player.play("한");
    await flush();
    speech.utterances[0]!.onerror?.({ error: "synthesis-failed" });
    await flush();

    expect(states).toContainEqual({
      status: "unavailable",
      reason: "playback-error",
    });
    await expect(outcome).resolves.toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
  });
});

describe("cancelamento, replay e limpeza", () => {
  test("stop cancela o áudio em andamento e resolve como cancelado", async () => {
    const { player, states, audio } = createPlayer({});
    const outcome = player.play("한");
    await flush();

    player.stop();
    await expect(outcome).resolves.toEqual({ status: "cancelled" });
    expect(audio.pause).toHaveBeenCalled();
    expect(states.at(-1)).toEqual({ status: "idle" });
  });

  test("stop cancela a espera por voz e não fala depois", async () => {
    const speech = new FakeSpeech();
    const { player, states } = createPlayer({
      speech,
      resolveAsset: () => null,
    });

    const outcome = player.play("한");
    await flush();
    player.stop();
    speech.setVoices([KO_KR]);
    await flush();

    expect(speech.speak).not.toHaveBeenCalled();
    await expect(outcome).resolves.toEqual({ status: "cancelled" });
    expect(states.at(-1)).toEqual({ status: "idle" });
  });

  test("permite repetir a reprodução", async () => {
    const { player, audio } = createPlayer({});
    const first = player.play("한");
    await flush();
    audio.emit("ended");
    await expect(first).resolves.toEqual({ status: "ended", source: "asset" });

    const second = player.play("한");
    await flush();
    expect(audio.play).toHaveBeenCalledTimes(2);
    audio.emit("ended");
    await expect(second).resolves.toEqual({ status: "ended", source: "asset" });
  });

  test("destroy remove o listener de voiceschanged e cancela a fala", async () => {
    const speech = new FakeSpeech();
    speech.voices = [KO_KR];
    const { player } = createPlayer({ speech, resolveAsset: () => null });
    void player.play("한");
    await flush();

    player.destroy();
    expect(speech.listeners.size).toBe(0);
    expect(speech.cancel).toHaveBeenCalled();
  });
});

describe("resultado de indisponibilidade", () => {
  test("sem speechSynthesis nem asset, retorna unsupported", async () => {
    const states: AudioPlaybackState[] = [];
    const player = new AudioPlayer({
      resolveAsset: () => null,
      createAudio: () => {
        throw new Error("sem áudio");
      },
      speech: null,
      createUtterance: null,
      onStateChange: (state) => states.push(state),
    });

    const outcome: PlaybackOutcome = await player.play("한");
    expect(outcome).toEqual({ status: "unavailable", reason: "unsupported" });
    expect(states.at(-1)).toEqual({
      status: "unavailable",
      reason: "unsupported",
    });
  });
});
