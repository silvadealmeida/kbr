"use client";

import { useEffect, useRef, useState } from "react";
import { createBrowserAudioPlayer } from "@/lib/audio/browser";
import type {
  AudioPlaybackState,
  AudioPlayer,
} from "@/lib/audio/playback";

const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;

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
    if (state.source === "asset") return "Reproduzindo áudio sintetizado (referência provisória).";
    return state.fallback
      ? "Áudio do KBR indisponível; usando a voz coreana do navegador."
      : "Reproduzindo pela voz coreana do navegador (voz do sistema, sem revisão nativa).";
  }

  if (state.status === "ended") {
    if (state.source === "asset") return "Áudio concluído.";
    return state.fallback
      ? "Áudio concluído pela voz coreana do navegador (o arquivo de áudio do KBR não carregou)."
      : "Áudio concluído pela voz coreana do navegador (voz do sistema, sem revisão nativa).";
  }

  if (state.reason === "unsupported") {
    return "Este navegador não consegue reproduzir áudio.";
  }
  if (state.reason === "no-korean-voice") {
    return "Este navegador não tem uma voz coreana instalada. Use a dica de som abaixo.";
  }
  return "Não foi possível reproduzir o áudio neste navegador. Use a dica de som abaixo.";
}

/**
 * Áudio sob demanda, sempre com alternativa textual. O player nunca inicia
 * reprodução sozinho e o status é anunciado sem ocupar o foco.
 *
 * A ordem é: MP3 estático do corpus → voz coreana do sistema. A voz do
 * sistema só entra quando existe uma voz coreana explícita; caso contrário o
 * controle informa a indisponibilidade em vez de fingir sucesso.
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
  const [slow, setSlow] = useState(false);
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
    void player.play(text, { rate: slow ? 0.75 : 1, src });
  };

  const toggleSlow = () => {
    const next = !slow;
    setSlow(next);
    if (state.status === "playing" || state.status === "loading") {
      void playerRef.current?.play(text, {
        rate: next ? 0.75 : 1,
        src,
      });
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
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={play}
          aria-busy={state.status === "loading"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-field)] border border-line-strong bg-surface px-4 font-semibold text-fg transition-colors duration-[var(--motion-fast)] hover:bg-surface-2"
        >
          <SpeakerIcon />
          {buttonLabel}
        </button>
        <button
          type="button"
          onClick={toggleSlow}
          aria-pressed={slow}
          aria-label={
            slow
              ? "Velocidade lenta ativada; voltar à velocidade normal"
              : "Usar velocidade lenta, 0,75 vezes"
          }
          className={`inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border px-3 text-sm font-semibold transition-colors duration-[var(--motion-fast)] ${
            slow
              ? "border-accent bg-success-soft text-fg"
              : "border-line bg-surface text-muted hover:text-fg"
          }`}
        >
          0,75×
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
