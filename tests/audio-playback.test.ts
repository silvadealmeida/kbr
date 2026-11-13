import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  AudioPlayer,
  type AudioPlaybackState,
} from "@/lib/audio/playback";

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

async function flush() {
  for (let index = 0; index < 12; index += 1) await Promise.resolve();
}

function createPlayer(options: {
  audio?: ReturnType<typeof createFakeAudio>;
  resolveAsset?: (text: string) => string | null;
  createAudio?: () => ReturnType<typeof createFakeAudio>;
} = {}) {
  const states: AudioPlaybackState[] = [];
  const audio = options.audio ?? createFakeAudio();
  const player = new AudioPlayer({
    resolveAsset:
      options.resolveAsset ?? ((text) => (text === "한" ? "/audio/한.mp3" : null)),
    createAudio: options.createAudio ?? (() => audio),
    onStateChange: (state) => states.push(state),
    assetStartTimeoutMs: 100,
  });
  return { player, states, audio };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("reprodução do MP3 estático", () => {
  test("toca o MP3, emite reproduzindo e termina no evento ended", async () => {
    const { player, states, audio } = createPlayer();

    const promise = player.play("한");
    await flush();
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(states).toContainEqual({ status: "playing", source: "asset" });

    audio.emit("ended");
    await expect(promise).resolves.toEqual({ status: "ended", source: "asset" });
    expect(states.at(-1)).toEqual({ status: "ended", source: "asset" });
  });

  test("usa audioSrc explícito mesmo sem entrada no mapa", async () => {
    const { player, audio } = createPlayer({
      resolveAsset: () => null,
    });

    const promise = player.play("texto fora do mapa", { src: "/audio/explicito.mp3" });
    await flush();
    expect(audio.src).toBe("/audio/explicito.mp3");
    expect(audio.play).toHaveBeenCalledTimes(1);
    audio.emit("ended");
    await expect(promise).resolves.toEqual({ status: "ended", source: "asset" });
  });

  test("aplica a velocidade pedida e preserva o pitch", async () => {
    const { player, audio } = createPlayer({ audio: createFakeAudio() });

    const promise = player.play("한", { rate: 0.75 });
    await flush();
    expect(audio.playbackRate).toBe(0.75);
    expect(audio.preservesPitch).toBe(true);
    expect(audio.mozPreservesPitch).toBe(true);
    expect(audio.webkitPreservesPitch).toBe(true);
    audio.emit("ended");
    await promise;
  });

  test("permite repetir a reprodução", async () => {
    const { player, audio } = createPlayer();

    const first = player.play("한");
    await flush();
    audio.emit("ended");
    await first;

    const second = player.play("한");
    await flush();
    expect(audio.play).toHaveBeenCalledTimes(2);
    audio.emit("ended");
    await expect(second).resolves.toEqual({ status: "ended", source: "asset" });
  });
});

describe("indisponibilidade sem TTS", () => {
  test("sem asset, não toca nada e informa missing-asset", async () => {
    const { player, states, audio } = createPlayer({
      resolveAsset: () => null,
    });

    await expect(player.play("texto sem MP3")).resolves.toEqual({
      status: "unavailable",
      reason: "missing-asset",
    });
    expect(audio.play).not.toHaveBeenCalled();
    expect(states.at(-1)).toEqual({
      status: "unavailable",
      reason: "missing-asset",
    });
  });

  test("MP3 que falha vira playback-error, sem voz do navegador", async () => {
    const { player, states } = createPlayer({
      audio: createFakeAudio({ reject: true }),
    });

    await expect(player.play("한")).resolves.toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
    expect(states.at(-1)).toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
  });

  test("MP3 que não responde em 4 s vira playback-error e pausa", async () => {
    const audio = createFakeAudio();
    // play() que nunca resolve
    audio.play = vi.fn(() => new Promise<void>(() => {}));
    const { player, states } = createPlayer({ audio });

    const promise = player.play("한");
    await flush();
    vi.advanceTimersByTime(150);

    await expect(promise).resolves.toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
    expect(audio.pause).toHaveBeenCalled();
    expect(states.at(-1)).toEqual({
      status: "unavailable",
      reason: "playback-error",
    });
  });

  test("navegador sem áudio informa unsupported", async () => {
    const { player, states } = createPlayer({
      createAudio: () => {
        throw new Error("sem Audio");
      },
    });

    await expect(player.play("한")).resolves.toEqual({
      status: "unavailable",
      reason: "unsupported",
    });
    expect(states.at(-1)).toEqual({
      status: "unavailable",
      reason: "unsupported",
    });
  });
});

describe("cancelamento e limpeza", () => {
  test("stop pausa o áudio e resolve como cancelado", async () => {
    const { player, audio } = createPlayer();

    const promise = player.play("한");
    await flush();
    player.stop();
    await expect(promise).resolves.toEqual({ status: "cancelled" });
    expect(audio.pause).toHaveBeenCalled();
    expect(player.state).toEqual({ status: "idle" });
  });

  test("destroy interrompe e ignora plays posteriores", async () => {
    const { player, audio } = createPlayer();

    const promise = player.play("한");
    await flush();
    player.destroy();
    await expect(promise).resolves.toEqual({ status: "cancelled" });
    expect(audio.pause).toHaveBeenCalled();
    await expect(player.play("한")).resolves.toEqual({ status: "cancelled" });
    expect(audio.play).toHaveBeenCalledTimes(1);
  });
});
