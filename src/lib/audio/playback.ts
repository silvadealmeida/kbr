/**
 * Controlador de áudio independente de React.
 *
 * A ordem é sempre: arquivo estático do corpus → voz do sistema. A voz só é
 * usada quando existe uma voz coreana explícita; nunca aceitamos a voz padrão
 * do navegador para pronunciar coreano. O controlador também trata espera
 * assíncrona por `voiceschanged`, erros, cancelamento e limpeza.
 */

export type AudioSource = "asset" | "speech";

export type PlaybackUnavailableReason =
  | "unsupported"
  | "no-korean-voice"
  | "playback-error";

export type AudioPlaybackState =
  | { status: "idle" }
  | { status: "loading"; source: AudioSource; fallback?: boolean }
  | { status: "playing"; source: AudioSource; fallback?: boolean }
  | { status: "ended"; source: AudioSource; fallback?: boolean }
  | { status: "unavailable"; reason: PlaybackUnavailableReason };

export type PlaybackOutcome =
  | { status: "ended"; source: AudioSource; fallback?: boolean }
  | { status: "unavailable"; reason: PlaybackUnavailableReason }
  | { status: "cancelled" };

export type VoiceLike = {
  name: string;
  lang: string;
  localService?: boolean;
  default?: boolean;
};

export type SpeechUtteranceLike = {
  text: string;
  lang: string;
  rate: number;
  pitch: number;
  voice: VoiceLike | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
};

export type SpeechSynthesisLike = {
  getVoices(): readonly VoiceLike[];
  speak(utterance: SpeechUtteranceLike): void;
  cancel(): void;
  addEventListener?(
    type: "voiceschanged",
    listener: () => void,
  ): void;
  removeEventListener?(
    type: "voiceschanged",
    listener: () => void,
  ): void;
};

export type AudioElementLike = {
  src: string;
  playbackRate: number;
  preservesPitch?: boolean;
  mozPreservesPitch?: boolean;
  webkitPreservesPitch?: boolean;
  currentTime: number;
  play(): Promise<void>;
  pause(): void;
  addEventListener(type: "ended" | "error", listener: () => void): void;
  removeEventListener(type: "ended" | "error", listener: () => void): void;
};

export type AudioPlayerDependencies = {
  resolveAsset: (text: string) => string | null;
  createAudio: (src: string) => AudioElementLike;
  speech: SpeechSynthesisLike | null;
  createUtterance: ((text: string) => SpeechUtteranceLike) | null;
  onStateChange: (state: AudioPlaybackState) => void;
  setTimeout?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout>;
  clearTimeout?: (handle: ReturnType<typeof setTimeout>) => void;
  voiceWaitMs?: number;
  startTimeoutMs?: number;
  assetStartTimeoutMs?: number;
};

type VoiceWaiter = {
  check: () => void;
  cancel: () => void;
};

/**
 * Escolhe uma voz coreana explícita. Preferimos ko-KR local, depois qualquer
 * ko-KR e só então outra variante coreana. Sem voz coreana, retorna null.
 */
export function pickKoreanVoice(
  voices: readonly VoiceLike[],
): VoiceLike | null {
  const korean = voices.filter((voice) => /^ko(?:[-_]|$)/i.test(voice.lang));
  if (korean.length === 0) return null;

  const exact = korean.filter((voice) => /^ko[-_]KR$/i.test(voice.lang));
  return (
    exact.find((voice) => voice.localService) ??
    exact[0] ??
    korean.find((voice) => voice.localService) ??
    korean[0] ??
    null
  );
}

function isKoreanVoice(voice: VoiceLike | null): voice is VoiceLike {
  return Boolean(voice && /^ko(?:[-_]|$)/i.test(voice.lang));
}

export class AudioPlayer {
  private readonly deps: AudioPlayerDependencies;

  private readonly voiceWaitMs: number;
  private readonly startTimeoutMs: number;
  private readonly assetStartTimeoutMs: number;
  private readonly schedule: (
    callback: () => void,
    ms: number,
  ) => ReturnType<typeof setTimeout>;
  private readonly unschedule: (handle: ReturnType<typeof setTimeout>) => void;

  private token = 0;
  private destroyed = false;
  private audio: AudioElementLike | null = null;
  private utterance: SpeechUtteranceLike | null = null;
  private startTimer: ReturnType<typeof setTimeout> | null = null;
  private cancelPending: (() => void) | null = null;
  private voiceWaiters = new Set<VoiceWaiter>();
  private readonly onVoicesChanged = () => {
    for (const waiter of [...this.voiceWaiters]) waiter.check();
  };

  private currentState: AudioPlaybackState = { status: "idle" };

  constructor(deps: AudioPlayerDependencies) {
    this.deps = deps;
    this.voiceWaitMs = deps.voiceWaitMs ?? 1_500;
    this.startTimeoutMs = deps.startTimeoutMs ?? 2_000;
    this.assetStartTimeoutMs = deps.assetStartTimeoutMs ?? 4_000;
    // Envolva os timers nativos: chamá-los como `this.schedule(...)` passaria
    // a instância do player como `this` e o navegador lançaria
    // "Illegal invocation".
    this.schedule =
      deps.setTimeout ?? ((callback, ms) => setTimeout(callback, ms));
    this.unschedule =
      deps.clearTimeout ?? ((handle) => clearTimeout(handle));
    this.deps.speech?.addEventListener?.("voiceschanged", this.onVoicesChanged);
  }

  get state(): AudioPlaybackState {
    return this.currentState;
  }

  private emit(state: AudioPlaybackState) {
    this.currentState = state;
    this.deps.onStateChange(state);
  }

  /**
   * Inicia uma reprodução. Se `src` for informado, ele tem prioridade sobre o
   * mapa estático (útil para `audioSrc` explícito no conteúdo).
   */
  play(
    text: string,
    options: { rate?: number; src?: string | null } = {},
  ): Promise<PlaybackOutcome> {
    if (this.destroyed) {
      return Promise.resolve({ status: "cancelled" });
    }

    this.cancelCurrent();
    const token = ++this.token;
    const rate = options.rate ?? 1;
    const assetSrc = options.src ?? this.deps.resolveAsset(text);

    if (assetSrc) {
      return this.playAsset(assetSrc, text, rate, token);
    }

    return this.playSpeech(text, rate, token, false);
  }

  /** Interrompe qualquer áudio/voz e volta ao estado ocioso. */
  stop(): void {
    this.token += 1;
    this.cancelCurrent();
    this.emit({ status: "idle" });
  }

  /** Limpa listeners, timers e qualquer reprodução pendente. */
  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.token += 1;
    this.cancelCurrent();
    this.deps.speech?.removeEventListener?.(
      "voiceschanged",
      this.onVoicesChanged,
    );
  }

  private cancelCurrent() {
    this.cancelPending?.();
    this.cancelPending = null;

    if (this.startTimer !== null) {
      this.unschedule(this.startTimer);
      this.startTimer = null;
    }

    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    if (this.utterance) {
      const utterance = this.utterance;
      this.utterance = null;
      utterance.onstart = null;
      utterance.onend = null;
      utterance.onerror = null;
      this.deps.speech?.cancel();
    }

    for (const waiter of [...this.voiceWaiters]) waiter.cancel();
    this.voiceWaiters.clear();
  }

  private async playAsset(
    src: string,
    text: string,
    rate: number,
    token: number,
  ): Promise<PlaybackOutcome> {
    this.emit({ status: "loading", source: "asset" });

    let audio: AudioElementLike;
    try {
      audio = this.deps.createAudio(src);
    } catch {
      return this.playSpeech(text, rate, token, true);
    }

    this.audio = audio;
    audio.src = src;
    audio.playbackRate = rate;
    audio.preservesPitch = true;
    audio.mozPreservesPitch = true;
    audio.webkitPreservesPitch = true;
    audio.currentTime = 0;

    return new Promise<PlaybackOutcome>((resolve) => {
      let settled = false;
      let started = false;
      let timer: ReturnType<typeof setTimeout> | null = null;

      const clearTimer = () => {
        if (timer !== null) {
          this.unschedule(timer);
          timer = null;
        }
      };

      const finish = (outcome: PlaybackOutcome) => {
        if (settled) return;
        settled = true;
        clearTimer();
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("error", onError);
        if (this.cancelPending === cancel) this.cancelPending = null;
        resolve(outcome);
      };

      const fallback = () => {
        if (settled) return;
        settled = true;
        clearTimer();
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("error", onError);
        if (this.cancelPending === cancel) this.cancelPending = null;
        this.audio = null;
        void this.playSpeech(text, rate, token, true).then(resolve);
      };

      const cancel = () => {
        audio.pause();
        finish({ status: "cancelled" });
      };

      const onEnded = () => {
        if (token !== this.token) return;
        this.audio = null;
        this.emit({ status: "ended", source: "asset" });
        finish({ status: "ended", source: "asset" });
      };

      const onError = () => {
        if (token !== this.token) return;
        fallback();
      };

      this.cancelPending = cancel;
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);

      let playPromise: Promise<void>;
      try {
        playPromise = audio.play();
      } catch {
        fallback();
        return;
      }

      timer = this.schedule(() => {
        if (token !== this.token || settled || started) return;
        audio.pause();
        fallback();
      }, this.assetStartTimeoutMs);

      playPromise.then(
        () => {
          if (token !== this.token || settled) return;
          started = true;
          clearTimer();
          this.emit({ status: "playing", source: "asset" });
        },
        () => {
          if (token !== this.token || settled) return;
          fallback();
        },
      );
    });
  }

  private async playSpeech(
    text: string,
    rate: number,
    token: number,
    fallbackFromAsset: boolean,
  ): Promise<PlaybackOutcome> {
    const { speech, createUtterance } = this.deps;
    if (!speech || !createUtterance) {
      this.emit({ status: "unavailable", reason: "unsupported" });
      return { status: "unavailable", reason: "unsupported" };
    }

    this.emit({
      status: "loading",
      source: "speech",
      ...(fallbackFromAsset ? { fallback: true } : {}),
    });

    const voice = await this.waitForKoreanVoice(token);
    if (token !== this.token) {
      return { status: "cancelled" };
    }
    if (!isKoreanVoice(voice)) {
      this.emit({ status: "unavailable", reason: "no-korean-voice" });
      return { status: "unavailable", reason: "no-korean-voice" };
    }

    let utterance: SpeechUtteranceLike;
    try {
      utterance = createUtterance(text);
    } catch {
      this.emit({ status: "unavailable", reason: "playback-error" });
      return { status: "unavailable", reason: "playback-error" };
    }

    this.utterance = utterance;
    utterance.lang = voice.lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.voice = voice;

    return new Promise<PlaybackOutcome>((resolve) => {
      let settled = false;
      let started = false;

      const finish = (outcome: PlaybackOutcome) => {
        if (settled) return;
        settled = true;
        if (this.startTimer !== null) {
          this.unschedule(this.startTimer);
          this.startTimer = null;
        }
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
        if (this.utterance === utterance) this.utterance = null;
        if (this.cancelPending === cancel) this.cancelPending = null;
        resolve(outcome);
      };

      const cancel = () => {
        speech.cancel();
        finish({ status: "cancelled" });
      };

      const onStart = () => {
        if (token !== this.token) return;
        started = true;
        if (this.startTimer !== null) {
          this.unschedule(this.startTimer);
          this.startTimer = null;
        }
        this.emit({
          status: "playing",
          source: "speech",
          ...(fallbackFromAsset ? { fallback: true } : {}),
        });
      };

      const onEnd = () => {
        if (token !== this.token) return;
        this.emit({
          status: "ended",
          source: "speech",
          ...(fallbackFromAsset ? { fallback: true } : {}),
        });
        finish({
          status: "ended",
          source: "speech",
          ...(fallbackFromAsset ? { fallback: true } : {}),
        });
      };

      const onError = () => {
        if (token !== this.token) return;
        this.emit({ status: "unavailable", reason: "playback-error" });
        finish({ status: "unavailable", reason: "playback-error" });
      };

      this.cancelPending = cancel;
      utterance.onstart = onStart;
      utterance.onend = onEnd;
      utterance.onerror = onError;

      this.startTimer = this.schedule(() => {
        if (token !== this.token || started) return;
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
        speech.cancel();
        this.emit({ status: "unavailable", reason: "playback-error" });
        finish({ status: "unavailable", reason: "playback-error" });
      }, this.startTimeoutMs);

      try {
        speech.cancel();
        speech.speak(utterance);
      } catch {
        this.emit({ status: "unavailable", reason: "playback-error" });
        finish({ status: "unavailable", reason: "playback-error" });
      }
    });
  }

  private waitForKoreanVoice(token: number): Promise<VoiceLike | null> {
    const speech = this.deps.speech;
    if (!speech) return Promise.resolve(null);

    const immediate = pickKoreanVoice(speech.getVoices());
    if (immediate) return Promise.resolve(immediate);

    return new Promise<VoiceLike | null>((resolve) => {
      let settled = false;
      let timer: ReturnType<typeof setTimeout> | null = null;

      const done = (voice: VoiceLike | null) => {
        if (settled) return;
        settled = true;
        if (timer !== null) {
          this.unschedule(timer);
          timer = null;
        }
        this.voiceWaiters.delete(waiter);
        resolve(voice);
      };

      const waiter: VoiceWaiter = {
        check: () => {
          if (token !== this.token) {
            done(null);
            return;
          }
          const voice = pickKoreanVoice(speech.getVoices());
          if (voice) done(voice);
        },
        cancel: () => done(null),
      };

      this.voiceWaiters.add(waiter);
      timer = this.schedule(() => {
        if (token !== this.token) {
          done(null);
          return;
        }
        done(pickKoreanVoice(speech.getVoices()));
      }, this.voiceWaitMs);
    });
  }
}
