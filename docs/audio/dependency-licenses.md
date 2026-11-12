# Licenças das dependências de geração do áudio — Fase 8E

**Data:** 2026-11-12. **Não é parecer jurídico.** Fonte: metadados instalados em `.audio/venv` (local, não versionado), `LICENSE` do pacote quando existe e fichas públicas (URLs na tabela de modelos). Versões = as realmente usadas na geração da 8B.

Legenda: **CLEAR** (licença permissiva, sem condição que atinja a saída ou o site) · **REQUIRES ATTRIBUTION** (permissiva, mas exige aviso se o artefato for redistribuído) · **UNRESOLVED** (declaração ausente ou contraditória) · **RESTRICTED** (condição que impede o uso pretendido).

**Distribuição:** os learners recebem **apenas** os MP3 (e, só quando a flag estiver ligada e a licença resolvida, o site). Nenhum código, dicionário ou peso abaixo é embutido no app nem nos MP3; todos são *generation-time*. Por isso as obrigações de redistribuição (aviso, ShareAlike, copyleft) não são acionadas pelo app. O que resta é a pergunta de **direitos sobre a saída** de modelos treinados em dados com licença desconhecida.

## Modelos e pesos

| Item | Versão/revisão | Licença declarada | Classe | Evidência e obrigação |
|---|---|---|---|---|
| `kykim/bert-kor-base` | `1779cc09…926d` | HF: nenhuma. LMkor README: Apache-2.0 **+** MOU para uso comercial; `LICENSE` sem titular | **UNRESOLVED** | https://huggingface.co/api/models/kykim/bert-kor-base (sem `license`); https://github.com/kiyoungkim1/LMkor (README linhas 6 e 146; `LICENSE` sha `261eeb9e…`); necessário na síntese. Bloqueia distribuição |
| `myshell-ai/MeloTTS-Korean` (checkpoint) | `0207e5ad…ed323` | MIT (metadado e card) | **UNRESOLVED** | https://huggingface.co/myshell-ai/MeloTTS-Korean; dados de treino não divulgados; depende do encoder acima |
| `myshell-ai/MeloTTS` (código) | `20914537…965a` | MIT, "Copyright (c) 2024 MyShell.ai" (API do GitHub: `mit`) | **REQUIRES ATTRIBUTION** (só se o código for redistribuído; aqui não é) | https://github.com/myshell-ai/MeloTTS/blob/main/LICENSE. Issue #43 (AGPL do Bert-VITS2) aberto, sem resposta: risco de linhagem não verificado |
| Dados de pré-treino do BERT (blogs, reviews, 모두의 말뭉치, Wikipédia, 나무위키) | — | não declaradas | **UNRESOLVED** | README do LMkor lista as fontes sem licença; efeito sobre o modelo/saída indeterminável |

## Software de geração (instalado no venv)

| Pacote | Versão | Licença (metadado) | Classe | Observação |
|---|---|---|---|---|
| g2pkk | 0.1.2 | Apache-2.0 | CLEAR | Única rota G2P coreana usada; regras/idiomas inclusas no pacote |
| python-mecab-ko | 1.3.7 | BSD-3-Clause | CLEAR | |
| python-mecab-ko-dic | 2.1.1.post2 | Apache-2.0 (`LICENSE` do pacote) | **REQUIRES ATTRIBUTION** | Dicionário derivado de corpus; só em geração. Não verifiquei a licença do corpus-fonte |
| mecab-python3 / fugashi | 1.0.9 / 1.3.0 | BSD / MIT | CLEAR | Puxados pelos requisitos multilíngues do MeloTTS; não fazem parte do caminho coreano |
| UniDic (`unidic` 1.1.0, `unidic-lite` 1.0.8) | — | MIT para o pacote; o *dado* UniDic tem licença própria (BSD/LGPL/GPL, tripla) | **REQUIRES ATTRIBUTION** | Japonês; **não** usado no caminho coreano; não verificado o dado baixado |
| NLTK | 3.10.4 | Apache-2.0 (código). Corpora (`cmudict`, tagger) em `~/nltk_data` têm licenças próprias | **REQUIRES ATTRIBUTION** | Só afeta inglês; o corpus de áudio é só Hangul (testado) |
| PyTorch / torchaudio | 2.14.1 / 2.11.1 | BSD-3 e Apache-2.0 (torch inclui várias) | CLEAR | |
| transformers / tokenizers / huggingface-hub | 4.27.4 / 0.13.3 / 0.36.2 | Apache-2.0 | CLEAR | |
| librosa, resampy, numba, scipy, numpy, soundfile, pydub | — | ISC / BSD / MIT | CLEAR | |
| jamo | 0.4.1 | Apache-2.0 | CLEAR | |
| num2words | 0.5.12 | LGPL | **REQUIRES ATTRIBUTION** | Copyleft fraco; só em geração, não redistribuído |
| pykakasi | 2.2.1 | GPLv3+ | **UNRESOLVED**, baixo risco | Importado pelo pacote multilíngue, **não** no caminho coreano; GPL não alcança saída que não contém o código. Nada distribuído |
| unidecode | 1.3.7 | GPL | **UNRESOLVED**, baixo risco | Idem: só ferramenta, nada distribuído |
| FFmpeg (libmp3lame) | 4.4.2 | LGPL/GPL conforme build; LAME é LGPL | **REQUIRES ATTRIBUTION** | Codifica MP3 localmente; o binário não é distribuído. Patentes de MP3 expiraram |
| gruut, jieba, pypinyin, cn2an, langid, inflect, g2p-en, gradio, tensorboard etc. | — | MIT / BSD / Apache-2.0 | CLEAR | Fora do caminho coreano |

Nenhum item acima é **RESTRICTED** por licença declarada. O único *bloqueio material* é o conjunto **UNRESOLVED** dos modelos (BERT, checkpoint, dados de treino).

## Obrigações a cumprir se o áudio for distribuído um dia

1. Manter `src/content/audio/manifest.json` (revisões e SHA-256) como registro de proveniência.
2. Citar MeloTTS (MIT) e, se a resposta do autor exigir, o BERT/LMkor em página de créditos.
3. Rotular o áudio como sintético (já feito na 8D).
