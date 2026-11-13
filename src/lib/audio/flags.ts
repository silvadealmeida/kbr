/**
 * O áudio estático é servido por padrão a partir de `public/audio/v1/`.
 * Decisão do dono do projeto (Fase 14, 2026-11-13): expor e usar o corpus
 * completo em vez de cair na voz sintética do navegador. A variável
 * `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` continua funcionando como kill switch.
 * O áudio é síntese MeloTTS provisória (`in-review`), nunca gravação nativa;
 * ver `docs/audio/license-audit.md` §13.
 */
export const STATIC_AUDIO_ENABLED =
  process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO !== "0";
