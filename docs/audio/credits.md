# Créditos do áudio e de terceiros

**Atualizado:** 2026-11-13 (Fase 14)  
**Política:** o áudio do KBR é síntese neural gerada com ferramentas e modelos abertos. O uso é
acompanhado de **crédito explícito** aos autores e aos repositórios de origem.

## 1. Crédito exigido e onde aparece

| Componente | Autor/origem | Licença declarada | Onde o crédito aparece |
|---|---|---|---|
| `myshell-ai/MeloTTS` | MyShell AI — https://github.com/myshell-ai/MeloTTS | MIT | `/impressum` (Créditos de terceiros), este documento, `docs/audio/generation-guide.md` |
| `myshell-ai/MeloTTS-Korean` @ `0207e5adfc90129a51b6b03d89be6d84360ed323` | MyShell AI — https://huggingface.co/myshell-ai/MeloTTS-Korean | MIT | `/impressum`, este documento, manifesto do áudio |
| `kykim/bert-kor-base` @ `1779cc0982ada0216dd6de0dd4e86fb78201926d` (LMkor) | Kiyoung Kim — https://github.com/kiyoungkim1/LMkor | Ver §2 | `/impressum`, este documento, manifesto do áudio, `src/lib/audio/flags.ts` |
| FFmpeg / `libmp3lame` | FFmpeg project — https://ffmpeg.org | LGPL/GPL conforme build | `/impressum`, este documento |

## 2. Situação do encoder coreano (informada pelo dono do projeto)

O dono do projeto perguntou ao autor do `kykim/bert-kor-base` sobre o uso do checkpoint para gerar
o áudio do KBR. **Conforme informado pelo dono, a orientação recebida foi que basta dar crédito ao
autor e ao repositório.** O KBR segue essa orientação:

- crédito visível em `/impressum` (seção “Créditos de terceiros”);
- crédito neste documento, no guia de geração e no manifesto do áudio;
- nenhuma alegação de que o checkpoint seja de domínio público ou de licença própria do KBR.

O áudio é **síntese provisória** e não substitui gravação de falante nativo; a qualidade e a
naturalidade seguem em revisão.

## 3. Referências

- `docs/audio/license-audit.md` — histórico da auditoria e decisão de exposição.
- `docs/audio/generation-guide.md` — pipeline, revisões fixadas e hashes.
- `src/content/audio/manifest.json` — modelo/encoder e parâmetros de cada MP3.
