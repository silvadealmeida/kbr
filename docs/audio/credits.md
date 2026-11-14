# Créditos do áudio e de terceiros

**Atualizado:** 2026-11-14 (finalização)
**Estado:** áudio **resolvido com créditos**. O responsável pelo projeto informa que a orientação
do autor foi creditar o autor e o repositório; por isso, o uso segue acompanhado de atribuição
explícita. Esta é a decisão operacional do projeto, não um parecer jurídico profissional.

## 1. Crédito exigido e onde aparece

| Componente | Autor/origem | Licença declarada | Onde o crédito aparece |
|---|---|---|---|
| `myshell-ai/MeloTTS` | MyShell AI — https://github.com/myshell-ai/MeloTTS | MIT | `/impressum` (Créditos de terceiros), este documento, `docs/audio/generation-guide.md` |
| `myshell-ai/MeloTTS-Korean` @ `0207e5adfc90129a51b6b03d89be6d84360ed323` | MyShell AI — https://huggingface.co/myshell-ai/MeloTTS-Korean | MIT | `/impressum`, este documento, manifesto do áudio |
| `kykim/bert-kor-base` @ `1779cc0982ada0216dd6de0dd4e86fb78201926d` (LMkor) | Kiyoung Kim — https://github.com/kiyoungkim1/LMkor | Ver §2 | `/impressum`, este documento, manifesto do áudio, `src/lib/audio/flags.ts` |
| FFmpeg / `libmp3lame` | FFmpeg project — https://ffmpeg.org | LGPL/GPL conforme build | `/impressum`, este documento |

## 2. Situação do encoder coreano (informada pelo dono do projeto)

O responsável pelo projeto perguntou ao autor do `kykim/bert-kor-base` sobre o uso do checkpoint
para gerar o áudio do KBR. **Conforme informado pelo responsável, a orientação recebida foi que o
uso exige crédito ao autor e ao repositório.** O KBR segue essa orientação:

- crédito visível em `/impressum` (seção “Créditos de terceiros”);
- crédito neste documento, no guia de geração e no manifesto do áudio;
- nenhuma alegação de que o checkpoint seja de domínio público ou de licença própria do KBR.

O corpus tem **7.790 MP3** de Hangul, A1, A2, B1, B2, C1, C2 e vocabulário, servido por padrão;
`NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é apenas kill switch. O áudio é síntese, não gravação nativa, e
não avalia pronúncia. A revisão editorial final assistida por IA foi aceita pelo responsável pelo
projeto; não houve revisão por falante nativo. Esses riscos residuais de qualidade são aceitos e
não bloqueiam o release.

## 3. Referências

- `docs/audio/license-audit.md` — histórico da auditoria e decisão de exposição.
- `docs/audio/generation-guide.md` — pipeline, revisões fixadas e hashes.
- `src/content/audio/manifest.json` — modelo/encoder e parâmetros de cada MP3.
