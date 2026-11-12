"use client";

import { resolveAudioAsset } from "./manifest";
import {
  AudioPlayer,
  type AudioElementLike,
  type AudioPlaybackState,
  type SpeechSynthesisLike,
  type SpeechUtteranceLike,
} from "./playback";

/**
 * Cria o controlador com as APIs reais do navegador. Só deve ser chamado em
 * efeito de cliente; no servidor retorna null.
 */
export function createBrowserAudioPlayer(
  onStateChange: (state: AudioPlaybackState) => void,
): AudioPlayer | null {
  if (typeof window === "undefined") return null;

  const AudioConstructor = window.Audio;
  const speech =
    "speechSynthesis" in window
      ? (window.speechSynthesis as unknown as SpeechSynthesisLike)
      : null;
  const UtteranceConstructor =
    "SpeechSynthesisUtterance" in window
      ? window.SpeechSynthesisUtterance
      : null;

  return new AudioPlayer({
    resolveAsset: (text) => resolveAudioAsset(text)?.src ?? null,
    createAudio: (src) => {
      if (!AudioConstructor) {
        throw new Error("HTMLAudioElement indisponível");
      }
      const audio = new AudioConstructor(src);
      audio.preload = "auto";
      return audio as unknown as AudioElementLike;
    },
    speech,
    createUtterance: UtteranceConstructor
      ? (text) =>
          new UtteranceConstructor(text) as unknown as SpeechUtteranceLike
      : null,
    onStateChange,
  });
}
