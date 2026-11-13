/**
 * Controlador de áudio independente de React.
 *
 * O KBR usa **somente os MP3 do corpus** (`public/audio/v1/`). Não há fallback
 * para a voz sintética do navegador: quando não existe asset ou o MP3 falha, o
 * estado vira indisponibilidade e a UI mantém a dica textual. O controlador
 * também trata timeout de início, erros, cancelamento, replay e limpeza.
 */

export type AudioSource = "asset";

export type PlaybackUnavailableReason =
  | "unsupported"
  | "missing-asset"
  | "playback-error";

export type AudioPlaybackState =
  | { status: "idle" }
  | { status: "loading"; source: AudioSource }
  | { status: "playing"; source: AudioSource }
  | { status: "ended"; source: AudioSource }
  | { status: "unavailable"; reason: PlaybackUnavailableReason };

export type PlaybackOutcome =
  | { status: "ended"; source: AudioSource }
  | { status: "unavailable"; reason: PlaybackUnavailableReason }
  | { status: "cancelled" };

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
  onStateChange: (state: AudioPlaybackState) => void;
  setTimeout?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout>;
  clearTimeout?: (handle: ReturnType<typeof setTimeout>) => void;
  assetStartTimeoutMs?: number;
};

export class AudioPlayer {
  private readonly deps: AudioPlayerDependencies;
  private readonly assetStartTimeoutMs: number;
  private readonly schedule: (
    callback: () => void,
    ms: number,
  ) => ReturnType<typeof setTimeout>;
  private readonly unschedule: (handle: ReturnType<typeof setTimeout>) => void;

  private token = 0;
  private destroyed = false;
  private audio: AudioElementLike | null = null;
  private cancelPending: (() => void) | null = null;
  private currentState: AudioPlaybackState = { status: "idle" };

  constructor(deps: AudioPlayerDependencies) {
    this.deps = deps;
    this.assetStartTimeoutMs = deps.assetStartTimeoutMs ?? 4_000;
    // Envolva os timers nativos: chamá-los como `this.schedule(...)` passaria
    // a instância do player como `this` e o navegador lançaria
    // "Illegal invocation".
    this.schedule =
      deps.setTimeout ?? ((callback, ms) => setTimeout(callback, ms));
    this.unschedule =
      deps.clearTimeout ?? ((handle) => clearTimeout(handle));
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

    if (!assetSrc) {
      this.emit({ status: "unavailable", reason: "missing-asset" });
      return Promise.resolve({ status: "unavailable", reason: "missing-asset" });
    }

    return this.playAsset(assetSrc, rate, token);
  }

  /** Interrompe qualquer áudio e volta ao estado ocioso. */
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
  }

  private cancelCurrent() {
    this.cancelPending?.();
    this.cancelPending = null;

    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  private async playAsset(
    src: string,
    rate: number,
    token: number,
  ): Promise<PlaybackOutcome> {
    this.emit({ status: "loading", source: "asset" });

    let audio: AudioElementLike;
    try {
      audio = this.deps.createAudio(src);
    } catch {
      this.emit({ status: "unavailable", reason: "unsupported" });
      return { status: "unavailable", reason: "unsupported" };
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
        if (this.audio === audio) this.audio = null;
        resolve(outcome);
      };

      const fail = () => {
        audio.pause();
        this.emit({ status: "unavailable", reason: "playback-error" });
        finish({ status: "unavailable", reason: "playback-error" });
      };

      const cancel = () => {
        audio.pause();
        finish({ status: "cancelled" });
      };

      const onEnded = () => {
        if (token !== this.token) return;
        this.emit({ status: "ended", source: "asset" });
        finish({ status: "ended", source: "asset" });
      };

      const onError = () => {
        if (token !== this.token) return;
        fail();
      };

      this.cancelPending = cancel;
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);

      let playPromise: Promise<void>;
      try {
        playPromise = audio.play();
      } catch {
        fail();
        return;
      }

      timer = this.schedule(() => {
        if (token !== this.token || settled || started) return;
        fail();
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
          fail();
        },
      );
    });
  }
}
