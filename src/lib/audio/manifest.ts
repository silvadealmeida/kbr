import { AUDIO_ENTRIES } from "@/content/audio/entries";
import { STATIC_AUDIO_ENABLED } from "./flags";
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

  // `Object.hasOwn` evita que um texto como "constructor" ou "__proto__"
  // resolva para uma propriedade herdada do protótipo em vez de um MP3.
  const src = Object.hasOwn(AUDIO_ENTRIES, normalized)
    ? AUDIO_ENTRIES[normalized]
    : undefined;
  if (typeof src !== "string" || src.length === 0) return null;

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

/** Caminho de MP3 que o navegador pode pedir; sempre null com a flag desligada. */
export function resolvePublicAudioSrc(
  text: string,
  enabled: boolean = STATIC_AUDIO_ENABLED,
): string | null {
  return enabled ? (resolveAudioAsset(text)?.src ?? null) : null;
}
