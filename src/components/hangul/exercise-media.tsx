"use client";

import { useState } from "react";

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

/** TTS nativo; retorna `false` quando o navegador não expõe a API. */
export function speakKorean(text: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
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

/**
 * Áudio sob demanda, sempre com alternativa textual. O player nunca inicia
 * reprodução sozinho e o status é anunciado sem ocupar o foco.
 */
export function AudioControl({
  text,
  fallback,
  compact = false,
  label = "Ouvir o áudio",
}: {
  text: string;
  fallback?: string;
  compact?: boolean;
  label?: string;
}) {
  const [spoken, setSpoken] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const play = () => {
    const ok = speakKorean(text);
    setSpoken(ok);
    setUnavailable(!ok);
  };

  return (
    <div
      className={
        compact
          ? "mt-3"
          : "rounded-[var(--radius-panel)] border border-line bg-surface-2 p-3 sm:p-4"
      }
    >
      <button
        type="button"
        onClick={play}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-field)] border border-line-strong bg-surface px-4 font-semibold text-fg transition-colors duration-[var(--motion-fast)] hover:bg-surface-2"
      >
        <SpeakerIcon />
        {label}
      </button>
      {unavailable ? (
        <p role="status" className="mt-2 text-sm text-muted">
          Este navegador não conseguiu reproduzir a voz coreana.
        </p>
      ) : null}
      {spoken ? (
        <p role="status" className="mt-2 text-sm text-muted">
          Áudio solicitado. Se não ouvir, confira o volume ou use a dica abaixo.
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
