/**
 * Reconhecimento de fala nativo do navegador (Web Speech API), experimental.
 *
 * Lógica pura com dependências injetadas, no mesmo padrão de `lib/audio`.
 * Não grava, não persiste e não registra áudio: o texto reconhecido vive só no
 * estado do controlador. Se o reconhecimento é local ou remoto depende do
 * navegador; só afirmamos "local" quando `processLocally` + `available()`
 * confirmam o pacote coreano.
 */

export const SPEECH_LANG = "ko-KR";

/** Tempo máximo ouvindo sem resultado antes de desistir (não é erro do aluno). */
export const LISTEN_TIMEOUT_MS = 10_000;
/** Tempo máximo esperando o resultado final após Parar. */
export const FINAL_TIMEOUT_MS = 4_000;

export type RecognitionAlternativeLike = { transcript: string; confidence?: number };
export type RecognitionResultLike = {
  readonly length: number;
  readonly isFinal: boolean;
  readonly [index: number]: RecognitionAlternativeLike;
};
export type RecognitionEventLike = {
  readonly resultIndex?: number;
  readonly results: {
    readonly length: number;
    readonly [index: number]: RecognitionResultLike;
  };
};

export interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  processLocally?: boolean;
  onstart: (() => void) | null;
  onaudiostart?: (() => void) | null;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export type LocalAvailability =
  | "available"
  | "downloadable"
  | "downloading"
  | "unavailable"
  /** O navegador não expõe `processLocally`/`available()`: origem do processamento desconhecida. */
  | "not-exposed"
  | "unknown";

export interface RecognitionConstructorLike {
  new (): RecognitionLike;
  available?: (options: {
    langs: string[];
    processLocally: boolean;
  }) => Promise<string>;
  install?: (options: {
    langs: string[];
    processLocally: boolean;
  }) => Promise<boolean>;
}

export type SpeechSupport =
  | { supported: false; reason: "no-window" | "insecure-context" | "no-api" }
  | {
      supported: true;
      ctor: RecognitionConstructorLike;
      /** `available()` existe, então dá para consultar o reconhecimento local. */
      canQueryLocal: boolean;
      canInstallLocal: boolean;
    };

type SpeechWindow = {
  isSecureContext?: boolean;
  SpeechRecognition?: RecognitionConstructorLike;
  webkitSpeechRecognition?: RecognitionConstructorLike;
};

/** Detecção por recurso, nunca por nome de navegador. */
export function detectSpeechSupport(win: SpeechWindow | undefined): SpeechSupport {
  if (!win) return { supported: false, reason: "no-window" };
  if (win.isSecureContext === false) {
    return { supported: false, reason: "insecure-context" };
  }
  const ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
  if (typeof ctor !== "function") return { supported: false, reason: "no-api" };
  return {
    supported: true,
    ctor,
    canQueryLocal: typeof ctor.available === "function",
    canInstallLocal: typeof ctor.install === "function",
  };
}

const LOCAL_VALUES = new Set(["available", "downloadable", "downloading", "unavailable"]);

/** Consulta o pacote coreano local. Não pede microfone nem baixa nada. */
export async function probeLocalKorean(
  support: SpeechSupport,
): Promise<LocalAvailability> {
  if (!support.supported || !support.canQueryLocal) return "not-exposed";
  try {
    const value = await support.ctor.available!({
      langs: [SPEECH_LANG],
      processLocally: true,
    });
    return LOCAL_VALUES.has(value) ? (value as LocalAvailability) : "unknown";
  } catch {
    return "unknown";
  }
}

/** Só deve ser chamado a partir de um gesto do usuário (clique). */
export async function installLocalKorean(
  support: SpeechSupport,
): Promise<boolean> {
  if (!support.supported || !support.canInstallLocal) return false;
  try {
    return await support.ctor.install!({ langs: [SPEECH_LANG], processLocally: true });
  } catch {
    return false;
  }
}

export type RecognitionMode = "local" | "remote";

export type SpeechErrorReason =
  | "not-allowed"
  | "no-speech"
  | "audio-capture"
  | "network"
  | "language-not-supported"
  | "timeout"
  | "consent-required"
  | "failed";

export type SpeechState =
  | { status: "idle" }
  | { status: "starting"; mode: RecognitionMode }
  | { status: "listening"; mode: RecognitionMode }
  | { status: "processing"; mode: RecognitionMode }
  | { status: "result"; hypotheses: string[]; mode: RecognitionMode }
  | { status: "error"; reason: SpeechErrorReason };

export type SpeechControllerDependencies = {
  ctor: RecognitionConstructorLike;
  onStateChange: (state: SpeechState) => void;
  listenTimeoutMs?: number;
  finalTimeoutMs?: number;
  setTimeout?: (callback: () => void, ms: number) => ReturnType<typeof setTimeout>;
  clearTimeout?: (handle: ReturnType<typeof setTimeout>) => void;
};

function mapError(code: string): SpeechErrorReason {
  switch (code) {
    case "not-allowed":
    case "service-not-allowed":
      return "not-allowed";
    case "no-speech":
      return "no-speech";
    case "audio-capture":
      return "audio-capture";
    case "network":
      return "network";
    case "language-not-supported":
      return "language-not-supported";
    default:
      return "failed";
  }
}

export class SpeechController {
  private readonly deps: SpeechControllerDependencies;
  private readonly schedule: NonNullable<SpeechControllerDependencies["setTimeout"]>;
  private readonly unschedule: NonNullable<SpeechControllerDependencies["clearTimeout"]>;
  private recognition: RecognitionLike | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private token = 0;
  private destroyed = false;
  private currentState: SpeechState = { status: "idle" };

  constructor(deps: SpeechControllerDependencies) {
    this.deps = deps;
    this.schedule = deps.setTimeout ?? ((cb, ms) => setTimeout(cb, ms));
    this.unschedule = deps.clearTimeout ?? ((h) => clearTimeout(h));
  }

  get state(): SpeechState {
    return this.currentState;
  }

  private emit(state: SpeechState) {
    if (this.destroyed) return;
    this.currentState = state;
    this.deps.onStateChange(state);
  }

  private clearTimer() {
    if (this.timer !== null) this.unschedule(this.timer);
    this.timer = null;
  }

  /** Solta o reconhecedor e o microfone sem emitir estado. */
  private release() {
    this.clearTimer();
    const recognition = this.recognition;
    this.recognition = null;
    this.token += 1;
    if (!recognition) return;
    recognition.onstart = null;
    recognition.onaudiostart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    try {
      recognition.abort();
    } catch {
      // Já encerrado: nada a liberar.
    }
  }

  /**
   * Inicia uma captura. Deve ser chamado de um gesto do usuário. O modo
   * remoto exige `consent: true`; sem ele nada é iniciado.
   */
  start({ mode, consent = false }: { mode: RecognitionMode; consent?: boolean }) {
    if (this.destroyed) return;
    this.release();
    if (mode === "remote" && !consent) {
      this.emit({ status: "error", reason: "consent-required" });
      return;
    }

    const token = this.token;
    let recognition: RecognitionLike;
    try {
      recognition = new this.deps.ctor();
      recognition.lang = SPEECH_LANG;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      if (mode === "local") recognition.processLocally = true;
    } catch {
      this.emit({ status: "error", reason: "failed" });
      return;
    }

    const hypotheses: string[] = [];
    const alive = () => token === this.token && !this.destroyed;

    recognition.onstart = () => {
      if (!alive()) return;
      this.emit({ status: "listening", mode });
      this.clearTimer();
      this.timer = this.schedule(() => this.fail("timeout"), this.deps.listenTimeoutMs ?? LISTEN_TIMEOUT_MS);
    };
    recognition.onresult = (event) => {
      if (!alive()) return;
      for (let i = event.resultIndex ?? 0; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (!result?.isFinal) continue;
        for (let j = 0; j < result.length; j += 1) {
          const text = result[j]?.transcript?.trim();
          if (text) hypotheses.push(text);
        }
      }
    };
    recognition.onerror = (event) => {
      if (!alive()) return;
      if (event.error === "aborted") return;
      this.fail(mapError(event.error));
    };
    recognition.onend = () => {
      if (!alive()) return;
      this.release();
      if (hypotheses.length > 0) {
        this.emit({ status: "result", hypotheses: [...new Set(hypotheses)], mode });
      } else {
        this.emit({ status: "error", reason: "no-speech" });
      }
    };

    this.recognition = recognition;
    this.emit({ status: "starting", mode });
    try {
      recognition.start();
    } catch {
      this.release();
      this.emit({ status: "error", reason: "failed" });
    }
  }

  private fail(reason: SpeechErrorReason) {
    this.release();
    this.emit({ status: "error", reason });
  }

  /** Para de ouvir e aguarda o resultado já capturado. */
  stop() {
    const recognition = this.recognition;
    if (!recognition) return;
    const state = this.currentState;
    if (state.status !== "listening" && state.status !== "starting") return;
    this.emit({ status: "processing", mode: state.mode });
    this.clearTimer();
    this.timer = this.schedule(() => this.fail("timeout"), this.deps.finalTimeoutMs ?? FINAL_TIMEOUT_MS);
    try {
      recognition.stop();
    } catch {
      this.fail("failed");
    }
  }

  /** Descarta a captura sem resultado e libera o microfone. */
  cancel() {
    this.release();
    this.emit({ status: "idle" });
  }

  reset() {
    this.cancel();
  }

  destroy() {
    this.release();
    this.destroyed = true;
  }
}
