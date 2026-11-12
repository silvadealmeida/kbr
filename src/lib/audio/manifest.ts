import { AUDIO_ENTRIES } from "@/content/audio/entries";
import { audioKey, normalizeAudioText } from "./text";

export type AudioAsset = {
  text: string;
  key: string;
  src: string;
};

/**
 * Resolve o MP3 estático de um texto coreano. A busca usa a mesma
 * normalização da geração (NFC + trim), sem alterar o texto exibido.
 */
export function resolveAudioAsset(text: string): AudioAsset | null {
  const normalized = normalizeAudioText(text);
  if (!normalized) return null;

  const src = AUDIO_ENTRIES[normalized];
  if (!src) return null;

  return {
    text: normalized,
    key: audioKey(normalized),
    src,
  };
}

export function hasAudioAsset(text: string): boolean {
  return resolveAudioAsset(text) !== null;
}

export function audioAssetCount(): number {
  return Object.keys(AUDIO_ENTRIES).length;
}
