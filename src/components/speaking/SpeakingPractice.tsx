"use client";

import { useId, useState } from "react";
import { AudioControl } from "@/components/hangul/exercise-media";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { matchTranscript } from "@/lib/speech/match";
import type {
  RecognitionMode,
  SpeechErrorReason,
  SpeechState,
  SpeechSupport,
} from "@/lib/speech/recognition";
import { useSpeechPractice } from "./use-speech-practice";

export const SPEECH_ERROR_MESSAGES: Record<SpeechErrorReason, string> = {
  "not-allowed":
    "O acesso ao microfone está bloqueado. Libere-o nas configurações do navegador e tente de novo, ou use o campo de texto abaixo.",
  "no-speech": "Não ouvimos nada. Tente de novo, falando perto do microfone.",
  "audio-capture": "Nenhum microfone disponível neste aparelho.",
  network:
    "Sem conexão com o serviço de reconhecimento do navegador. Verifique a internet ou use o campo de texto abaixo.",
  "language-not-supported": "Este navegador não reconhece coreano neste modo.",
  timeout: "Não conseguimos reconhecer claramente. Tente novamente.",
  "consent-required":
    "Autorize o reconhecimento pelo navegador (acima) antes de falar.",
  failed: "Não foi possível usar o reconhecimento de fala agora. Tente novamente.",
};

function MicIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** Mostra o que o reconhecedor entendeu sem afirmar nada sobre a pronúncia. */
export function TranscriptFeedback({
  expected,
  hypotheses,
  heardLabel = "Reconhecemos",
}: {
  expected: string;
  hypotheses: readonly string[];
  heardLabel?: string;
}) {
  const match = matchTranscript(expected, hypotheses);
  return (
    <div className="mt-3 rounded-[var(--radius-field)] border border-line bg-surface-2 p-3 text-sm">
      <p>
        {heardLabel}:{" "}
        <strong lang="ko" className="font-ko text-base text-fg">
          {match.heard}
        </strong>
      </p>
      {match.index > 0 ? (
        <p className="mt-1 text-muted">
          Foi uma interpretação alternativa do reconhecedor, não a principal.
        </p>
      ) : null}
      {match.kind === "exact" ? (
        <p className="mt-1 text-fg">Corresponde ao texto esperado.</p>
      ) : match.kind === "normalized" ? (
        <p className="mt-1 text-fg">
          Corresponde ao texto esperado, ignorando espaços e pontuação.
        </p>
      ) : (
        <p className="mt-1 text-muted">
          Isto não corresponde ao texto esperado. Pode ser a pronúncia ou uma
          limitação do reconhecedor. Ouça o modelo e tente de novo.
        </p>
      )}
      <p className="mt-2 text-muted">
        O reconhecimento compara texto; ele não avalia a qualidade da sua
        pronúncia.
      </p>
    </div>
  );
}

function statusText(state: SpeechState): string | null {
  if (state.status === "starting") return "Aguardando o microfone…";
  if (state.status === "listening") return "Ouvindo… fale agora.";
  if (state.status === "processing") return "Processando…";
  if (state.status === "error") return SPEECH_ERROR_MESSAGES[state.reason];
  return null;
}

export function SpeakingPractice({
  id,
  ko,
  pt,
  audioText,
  support,
  mode,
  consent,
  active,
  onActivate,
}: {
  id: string;
  ko: string;
  pt: string;
  audioText: string;
  support: SpeechSupport | null;
  /** Modo que será usado ao falar; `null` quando ainda não há como reconhecer. */
  mode: RecognitionMode | null;
  consent: boolean;
  active: boolean;
  onActivate: () => void;
}) {
  const { state, start, stop, cancel } = useSpeechPractice(support, active);
  const [typed, setTyped] = useState("");
  const [typedResult, setTypedResult] = useState<string | null>(null);
  const inputId = useId();

  const busy =
    state.status === "starting" ||
    state.status === "listening" ||
    state.status === "processing";
  const canSpeak = Boolean(support?.supported && mode);
  const message = statusText(state);

  return (
    <Plate label="Prática de fala" className="border-line">
      <h3 className="text-3xl font-bold" lang="ko">
        <span className="font-ko">{ko}</span>
      </h3>
      <p className="mt-1 text-sm text-muted">{pt}</p>
      <p className="mt-1 text-xs text-muted">Conteúdo em revisão.</p>

      <div className="mt-3">
        <AudioControl text={audioText} compact label="Ouvir o modelo" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {state.status === "listening" || state.status === "starting" ? (
          <Button variant="primary" onClick={stop}>
            Parar
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!canSpeak || state.status === "processing"}
            onClick={() => {
              if (!mode) return;
              onActivate();
              start(mode, consent);
            }}
          >
            <MicIcon />
            {state.status === "result" || state.status === "error"
              ? "Tentar de novo"
              : "Falar"}
          </Button>
        )}
        {busy ? (
          <Button variant="secondary" onClick={cancel}>
            Cancelar
          </Button>
        ) : null}
        {state.status === "listening" ? (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-danger">
            <span aria-hidden className="size-2.5 rounded-full bg-danger motion-safe:animate-pulse" />
            Microfone ligado
          </span>
        ) : null}
      </div>

      <div role="status" aria-live="polite" className="mt-2 text-sm text-muted">
        {message}
      </div>

      {state.status === "result" ? (
        <TranscriptFeedback expected={ko} hypotheses={state.hypotheses} />
      ) : null}

      <details className="mt-4 text-sm">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-fg">
          Prefere digitar ou usar o ditado do teclado?
        </summary>
        <p className="mt-1 text-muted">
          Funciona em qualquer navegador. No celular, use o botão de microfone do
          teclado; o ditado é do sistema, não do KBR.
        </p>
        <form
          className="mt-2 flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            setTypedResult(typed.trim() ? typed.trim() : null);
          }}
        >
          <div className="min-w-0 flex-1">
            <label htmlFor={inputId} className="block text-sm font-semibold">
              Texto em coreano
            </label>
            <input
              id={inputId}
              lang="ko"
              autoComplete="off"
              spellCheck={false}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              className="mt-1 min-h-12 w-full rounded-[var(--radius-field)] border border-line-strong bg-surface px-3 font-ko text-base text-fg"
            />
          </div>
          <Button variant="secondary" type="submit" disabled={!typed.trim()}>
            Comparar
          </Button>
        </form>
        {typedResult ? (
          <TranscriptFeedback key={id} expected={ko} hypotheses={[typedResult]} heardLabel="Você escreveu" />
        ) : null}
      </details>
    </Plate>
  );
}
