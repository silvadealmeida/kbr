"use client";

import { useEffect, useRef, useState } from "react";
import { createBrowserAudioPlayer } from "@/lib/audio/browser";
import type {
  AudioPlaybackState,
  AudioPlayer,
} from "@/lib/audio/playback";

const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;
const PLAYBACK_RATES = [0.5, 0.75, 1] as const;
type PlaybackRate = (typeof PLAYBACK_RATES)[number];

function nextPlaybackRate(current: PlaybackRate): PlaybackRate {
  const index = PLAYBACK_RATES.indexOf(current);
  return PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length]!;
}

function rateLabel(rate: PlaybackRate): string {
  if (rate === 1) return "1×";
  return `${String(rate).replace(".", ",")}×`;
}

/** Marca apenas os trechos coreanos com `lang="ko"` sem quebrar o texto latino. */
export function BilingualText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        HANGUL.test(part) ? (
          <span key={index} lang="ko" className="font-ko">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function SpeakerIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
      <path
        d="M4 9.5v5h3.2L12 18V6L7.2 9.5H4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function statusMessage(state: AudioPlaybackState): string | null {
  if (state.status === "idle") return null;
  if (state.status === "loading") return "Carregando áudio…";

  if (state.status === "playing") {
    return "Reproduzindo áudio sintetizado (referência provisória).";
  }

  if (state.status === "ended") {
    return "Áudio concluído.";
  }

  if (state.reason === "unsupported") {
    return "Este navegador não consegue reproduzir áudio.";
  }
  if (state.reason === "missing-asset") {
    return "Este trecho ainda não tem áudio gravado. Use a dica de som abaixo.";
  }
  return "Não foi possível reproduzir o áudio agora. Use a dica de som abaixo.";
}

/**
 * Áudio sob demanda, sempre com alternativa textual. O player nunca inicia
 * reprodução sozinho e o status é anunciado sem ocupar o foco.
 *
 * O KBR usa apenas os MP3 do corpus: não há voz sintética do navegador como
 * fallback. Se o trecho não tiver asset, o controle informa e mantém a dica.
 */
export function AudioControl({
  text,
  src,
  fallback,
  compact = false,
  label = "Ouvir o áudio",
}: {
  text: string;
  /** `audioSrc` explícito do conteúdo; tem prioridade sobre o mapa estático. */
  src?: string;
  fallback?: string;
  compact?: boolean;
  label?: string;
}) {
  const [state, setState] = useState<AudioPlaybackState>({ status: "idle" });
  const [rate, setRate] = useState<PlaybackRate>(1);
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    const player = createBrowserAudioPlayer(setState);
    playerRef.current = player;
    return () => {
      player?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    playerRef.current?.stop();
    setState({ status: "idle" });
  }, [text, src]);

  const play = () => {
    const player = playerRef.current;
    if (!player) {
      setState({ status: "unavailable", reason: "unsupported" });
      return;
    }
    void player.play(text, { rate, src });
  };

  const cycleRate = () => {
    const next = nextPlaybackRate(rate);
    setRate(next);
    if (state.status === "playing" || state.status === "loading") {
      // MP3 tocando: ajusta a taxa sem reiniciar. Voz do sistema não aceita
      // mudança no meio da fala, então só nesse caso a reprodução recomeça.
      if (playerRef.current?.setRate(next)) return;
      void playerRef.current?.play(text, { rate: next, src });
    }
  };

  const message = statusMessage(state);
  const playing = state.status === "playing";
  const buttonLabel = playing
    ? "Reproduzindo…"
    : state.status === "ended"
      ? "Ouvir novamente"
      : label;

  return (
    <div
      className={
        compact
          ? "mt-3"
          : "rounded-[var(--radius-panel)] border border-line bg-surface-2 p-3 sm:p-4"
      }
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <button
          type="button"
          onClick={play}
          aria-busy={state.status === "loading"}
          className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-[var(--radius-field)] border border-line-strong bg-surface px-3 py-2 text-left text-sm font-semibold leading-tight text-fg transition-colors duration-[var(--motion-fast)] hover:bg-surface-2 sm:px-4"
        >
          <SpeakerIcon />
          <span className="min-w-0 break-words">{buttonLabel}</span>
        </button>
        <button
          type="button"
          onClick={cycleRate}
          aria-label={`Velocidade ${rateLabel(rate)}; alterar para ${rateLabel(nextPlaybackRate(rate))}`}
          className={`inline-flex min-h-12 w-[4.75rem] shrink-0 items-center justify-center rounded-[var(--radius-field)] border px-2 font-mono text-sm font-semibold tabular-nums transition-colors duration-[var(--motion-fast)] ${
            rate === 1
              ? "border-line bg-surface text-muted hover:text-fg"
              : "border-accent bg-success-soft text-fg"
          }`}
        >
          {rateLabel(rate)}
        </button>
      </div>
      {message ? (
        <p role="status" className="mt-2 text-sm text-muted">
          {message}
        </p>
      ) : null}
      {fallback ? (
        <p className="mt-2 text-sm text-muted">
          <span className="font-semibold text-fg">Dica de som:</span>{" "}
          <BilingualText text={fallback} />
        </p>
      ) : null}
    </div>
  );
}
