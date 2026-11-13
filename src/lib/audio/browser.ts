"use client";

import { resolvePublicAudioSrc } from "./manifest";
import {
  AudioPlayer,
  type AudioElementLike,
  type AudioPlaybackState,
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

  return new AudioPlayer({
    resolveAsset: (text) => resolvePublicAudioSrc(text),
    createAudio: (src) => {
      if (!AudioConstructor) {
        throw new Error("HTMLAudioElement indisponível");
      }
      const audio = new AudioConstructor(src);
      audio.preload = "auto";
      return audio as unknown as AudioElementLike;
    },
    onStateChange,
  });
}
