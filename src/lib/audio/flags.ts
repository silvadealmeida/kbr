/**
 * O áudio estático é opt-in (`NEXT_PUBLIC_KBR_STATIC_AUDIO=1`). O corpus em
 * `public/audio/v1/` continua versionado, mas não é publicado por padrão:
 * a licença do encoder BERT segue não esclarecida e a decisão de risco do dono
 * não é uma licença. Sem a flag, o player usa a voz coreana do navegador.
 * Ver `docs/audio/license-audit.md` §11 e `docs/audio/stale-audio-manifest.md`.
 */
export const STATIC_AUDIO_ENABLED =
  process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "1";
