# Alternativas ao MeloTTS-Korean — avaliação de direitos (Fase 8E)

> **Pesquisa histórica, sem ação pendente.** Na Fase 14, o responsável aceitou o uso do corpus
> atual conforme a orientação de crédito recebida do autor do encoder. Estado vigente: áudio
> **resolvido com créditos**, 7.790 MP3 servidos por padrão; nenhum substituto está sendo avaliado
> para o release. As recomendações abaixo não controlam a decisão atual.

**Data:** 2026-11-12. **Nada foi baixado, executado nem regenerado.** Licenças vêm dos metadados/cartões primários do Hugging Face e do GitHub (consultados por API nesta sessão); **qualidade do coreano não foi ouvida** e nenhum substituto está aprovado. Nenhum cartão consultado documenta os dados de treino, então "pesos com licença permissiva" **não** equivale a "direitos sobre a saída resolvidos"; é apenas a melhor evidência disponível, melhor que o estado atual (UNRESOLVED).

Critérios (do pedido): código aberto; direitos claros sobre os pesos; saída redistribuível; geração local gratuita; bom coreano; reprodução consistente (MP3 estático).

## Ranking

| # | Candidato | Código / pesos | Coreano | Saída | Riscos e pendências |
|---|---|---|---|---|---|
| 1 | **Qwen3-TTS** (`Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice` e 0.6B) — https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice | Apache-2.0 (cartão; GitHub `QwenLM/Qwen3-TTS`: Apache-2.0) | Listado entre 10 idiomas; voz nomeada "Sohee" (coreana) | Apache-2.0 não reivindica direitos sobre a saída | Dados de treino não documentados no cartão; modelos autorregressivos podem errar em sílabas isoladas (ㄱ+ㅏ): **exigem escuta nativa**; 0.6B/1.7B rodam em CPU, mais lento |
| 2 | **Fun-CosyVoice3-0.5B-2512** — https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512 | Apache-2.0 (cartão e GitHub) | `ko` listado | idem | Clonagem exige áudio de referência: usar só voz embutida ou áudio com direitos próprios; dados de treino não documentados |
| 3 | **Chatterbox Multilingual** — https://huggingface.co/ResembleAI/chatterbox | MIT (código e pesos, cartão) | `ko` listado | Marca d'água PerTh imperceptível em toda saída (sobrevive a MP3); redistribuição permitida pelo MIT | Dados de treino não divulgados; pode herdar sotaque do clipe de referência |
| 4 | **Supertonic-2** — https://huggingface.co/Supertone/supertonic-2 | Código MIT; **modelo OpenRAIL-M** (restrições de uso; não aprovado pela OSI) | `ko` | RAIL-M §6: "Licensor claims no rights in the Output"; saída não pode contrariar as restrições de uso | Leve e roda em CPU (ONNX), mas a licença não é "livre de restrições"; avaliar as restrições contra o caso (educacional: em princípio compatível) |

Fora, com motivo verificado:

| Modelo | Motivo |
|---|---|
| `facebook/mms-tts-kor` | CC-BY-NC-4.0 (não comercial) |
| `fishaudio/openaudio-s1-mini` | CC-BY-NC-SA-4.0 |
| `coqui/XTTS-v2` | licença "coqui-public-model-license" (uso não comercial) |
| `bosonai/higgs-audio-v2` | licença "other" (não analisada) |
| `hexgrad/Kokoro-82M` | Apache-2.0, mas **sem** marcação de coreano no cartão (não assuma suporte) |
| MeloTTS + `klue/bert-base` | CC-BY-SA-4.0 e **não é drop-in**: o checkpoint foi treinado com as features do `kykim`; exigiria retreino |
| MeloTTS com `disable_bert` | O tokenizer/vocabulário do `kykim` continua necessário (`melo/text/korean.py`); o checkpoint não foi treinado sem BERT |
| TTS de nuvem (Google, Azure) e "Edge TTS" | Fora do critério "código aberto"; os termos de saída não foram lidos; Edge TTS é endpoint não oficial |

## Recomendação

1. **Manter o bloqueio aberto.** Nenhum substituto está estabelecido; o ranking é de *direitos documentados*, não de qualidade.
2. **Próximo passo barato (precisa de aprovação do dono):** gerar um piloto de ~20 itens (sílabas, palavras, frases, `한국어`, `읽어요`) com Qwen3-TTS-0.6B/1.7B, CosyVoice3 e Supertonic-2 em `.audio/trial/` (já ignorado pelo Git), e um falante nativo ou professor escolher às cegas. Só então regenerar os 287 (script novo; o `generate-melotts.py` não é reaproveitável).
3. Em paralelo, mandar os e-mails de `docs/audio/permissions/email-drafts.md`; se o autor do BERT liberar por escrito, o MeloTTS atual passa a ser a opção sem retrabalho.
4. Gravação nativa com consentimento escrito continua sendo a única opção que resolve licença **e** qualidade.
