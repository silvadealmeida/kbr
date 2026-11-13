# Geração do áudio estático — MeloTTS-Korean

**Fase:** 8B (corpus Hangul) e ampliação A1/A2  
**Data:** 2026-11-12  
**Status:** pipeline reproduzível. Os MP3 ficam em `public/audio/v1/`, são versionados e **servidos por padrão** desde a Fase 14 (2026-11-13).  
**Natureza do áudio:** síntese neural, **não** gravação nativa. Todo o conteúdo coreano continua `in-review`; estes arquivos são a referência estável provisória e ainda precisam de escuta e aprovação de falante nativo.

## Uso e desligamento

- O áudio estático é o caminho principal: `STATIC_AUDIO_ENABLED` é `true` por padrão.
  `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é o kill switch: o player ignora os MP3 e cai para a voz
  coreana do sistema (ou para a dica textual).
- `public/audio/` é publicado normalmente; `/audio/:path*` recebe cache imutável enquanto o kill
  switch não estiver ativo.
- `encode-audio.py` grava direto em `public/audio/v1/`; os arquivos são preservados e órfãos são
  removidos só quando o inventário deixa de citá-los.
- A decisão de risco do dono do projeto está registrada em [`license-audit.md`](license-audit.md)
  §13 e **não é licença**; nenhum texto corrigido depende mais de TTS.

**Verificação local:**
```bash
npm run build && npx playwright test e2e/audio.spec.ts
```


## Resultado

| Métrica | Valor |
|---|---|
| Textos únicos | **2.907** (Hangul + A1 + A2 + vocabulário: palavras e frases contextuais) |
| Prioridade 1 / 2 | **1.949 / 958** |
| Arquivos MP3 | **2.907** |
| Tamanho total | **38.464.973 bytes** (~36,7 MiB) |
| Duração total | **4.611,21 s** (~76,9 min) |
| Duração por clipe | **0,298–8,676 s** |
| Formato | MP3, **64 kbps**, mono, **44,1 kHz** |
| Loudness | RMS **−19,57 a −18,0 dBFS**; pico **−9,43 a −1,0 dBFS** |
| Ganho aplicado | **−4,76 a +6,44 dB** |
| Avisos de QC | **17** (frases completas acima de 6 s; nenhum erro) |
| Áudio no carregamento inicial | **0 bytes** (sob demanda) |
| Cache HTTP | `public, max-age=31536000, immutable` em `/audio/:path*` |

O corpus cobre `audioText` de exercícios, alternativas, leituras, diálogos, exemplos de gramática e painéis de introdução, sílabas, palavras, alvos de montagem, as formas `spoken` das três regras, a sílaba `한` da anatomia e o vocabulário (palavras e frases contextuais) de Hangul, A1, A2 e B1. O construtor livre de sílabas é dinâmico e não tem asset para toda combinação; nesses casos o player **não usa TTS**: mostra a prévia visual e a dica de pronúncia.

## Decisão: Python oficial, não imagem Docker

Foi mantido o fluxo oficial em Python, em ambiente isolado. A imagem `hangrylabs/melotts:v1.0.1` foi avaliada e **não** foi baixada nem executada:

- licença **AGPL-3.0-only**, incompatível com o uso pretendido sem revisão jurídica;
- somente `amd64`;
- cerca de **8,3 GB** comprimida;
- o pacote coreano opcional exige aceite manual em interface web;
- usa o mesmo encoder BERT sem licença declarada.

Digest avaliado: `hangrylabs/melotts:v1.0.1@sha256:f0da2ebce41283a5d2dae7125d4776522f95995abdad80773eb2b200fdd1292b` (o digest `latest` observado foi `sha256:3f145963eda21deb2b4ba2b16f00f98fa4414196a0b512103c98e445a24ef0d5`). Nenhum recurso Docker foi criado.

## Ambiente usado

- Ubuntu 22.04, **CPU only**; nenhuma GPU é necessária.
- Python **3.10.12** em `.audio/venv`.
- Node **20.20.2**.
- FFmpeg/ffprobe **4.4.2** com `libmp3lame`.
- MeloTTS **0.1.2**, instalado do commit `209145371cff8fc3bd60d7be902ea69cbdb7965a`.
- `torch 2.14.1+cu130` (o wheel traz CUDA, mas a geração roda em CPU), `torchaudio 2.11.1`, `transformers 4.27.4`, `librosa 0.9.1`, `soundfile 0.14.0`, `numpy 1.26.4`.
- `setuptools 80.10.2`; **`setuptools<81` é obrigatório** porque `librosa 0.9.1` importa `pkg_resources`. Com `setuptools 84` a geração falha no import.
- `python-mecab-ko 1.3.7` e `python-mecab-ko-dic 2.1.1.post2` (instalados pelo `g2pkk` na primeira síntese).
- Dicionário UniDic 3.1.0+2021-08-31 dentro do venv (`python -m unidic download`), ~526 MB.
- Dados NLTK baixados no primeiro import para `/root/nltk_data` (~20 MB): `averaged_perceptron_tagger`, `averaged_perceptron_tagger_eng` e `cmudict`.

O diretório `.audio/` é local e está no `.gitignore`; **nenhum peso, venv, WAV bruto ou cache é versionado**.

## Modelos fixados

| Papel | Repositório | Revisão | Licença |
|---|---|---|---|
| Voz coreana | `myshell-ai/MeloTTS-Korean` | `0207e5adfc90129a51b6b03d89be6d84360ed323` | **MIT** declarada no model card |
| Encoder BERT | `kykim/bert-kor-base` | `1779cc0982ada0216dd6de0dd4e86fb78201926d` | **não declarada** — ver caveat abaixo |
| Código MeloTTS | `myshell-ai/MeloTTS` | `209145371cff8fc3bd60d7be902ea69cbdb7965a` | MIT |

SHA-256 dos arquivos baixados:

```text
48e3ff3fd0b5348e095f0468e60ae727507564100f58142ef3a922ead6e0a4d0  MeloTTS-Korean/checkpoint.pth
74543376976dfadde45ba34336fa79c7e95509f43a7c2e701b22c0f71fd7695c  MeloTTS-Korean/config.json
ae43a392e533ccb9fd38e5c65130aeee50381b87e81e795f9d90469accd78236  bert-kor-base/pytorch_model.bin
c37ae92c39e3600e7c9645148e406286d44c9863cb8a237196ac6ad35bc47749  bert-kor-base/config.json
```

### Caveat de licença do encoder

O `kykim/bert-kor-base` **não declara licença** no repositório do Hugging Face. O MeloTTS-Korean o usa para converter texto em fonemas. Isso é um risco material para distribuição pública/comercial: a licença MIT do modelo de voz não cobre automaticamente o encoder. Antes de lançamento público, é preciso:

1. obter uma declaração de licença do autor do encoder;
2. substituir o encoder por um modelo com licença clara; ou
3. migrar a referência principal para gravação nativa.

Este documento não é parecer jurídico e não afirma que o pipeline esteja liberado para uso comercial. **A auditoria da 8D (`docs/audio/license-audit.md`) confirmou que o encoder é necessário na geração e manteve a distribuição pública/comercial como BLOQUEADA.**

## Preparação do ambiente

```bash
python3 -m venv .audio/venv
.audio/venv/bin/pip install --upgrade pip
.audio/venv/bin/pip install 'setuptools<81'
.audio/venv/bin/pip install \
  'git+https://github.com/myshell-ai/MeloTTS.git@209145371cff8fc3bd60d7be902ea69cbdb7965a'
.audio/venv/bin/python -m unidic download
```

O `g2pkk` instala `python-mecab-ko`/`python-mecab-ko-dic` na primeira síntese e o NLTK baixa seus dados no primeiro import. Para uma execução offline, faça esses passos uma vez com rede e depois mantenha o venv.

### Download dos modelos no commit fixado

```bash
.audio/venv/bin/python - <<'PY'
from huggingface_hub import hf_hub_download

for repo, revision, files in [
    ("myshell-ai/MeloTTS-Korean", "0207e5adfc90129a51b6b03d89be6d84360ed323",
     ["config.json", "checkpoint.pth"]),
    ("kykim/bert-kor-base", "1779cc0982ada0216dd6de0dd4e86fb78201926d",
     ["config.json", "pytorch_model.bin", "tokenizer_config.json", "vocab.txt"]),
]:
    for filename in files:
        print(hf_hub_download(
            repo_id=repo,
            filename=filename,
            revision=revision,
            local_dir=f".audio/models/{repo.split('/')[-1]}",
        ))
PY
```

`scripts/audio/generate-melotts.py` redireciona o carregamento de `kykim/bert-kor-base` para a cópia local antes de importar `melo.api`. Sem esse patch, o MeloTTS baixaria o encoder sem revisão fixada.

## Pipeline

### 1. Inventário

```bash
node scripts/audio/build-inventory.mjs
```

Lê o currículo real via Vite SSR e grava `.audio/inventory.json` com texto NFC, chave FNV-1a, referências de origem, passos, tags e prioridade. O script cobre Hangul, A1, A2, B1, B2, C1, C2 e o vocabulário desses cursos e falha em colisão de chave. Saída observada na Fase 14: **7.790 itens**, 5.551 de prioridade 1 e 2.238 de prioridade 2.

### 2. Síntese

```bash
.audio/venv/bin/python scripts/audio/generate-melotts.py
# variantes:
.audio/venv/bin/python scripts/audio/generate-melotts.py --limit 1
.audio/venv/bin/python scripts/audio/generate-melotts.py --text '한' --force
# corpus grande: divida o trabalho em processos paralelos (retomável)
KBR_TORCH_THREADS=6 .audio/venv/bin/python scripts/audio/generate-melotts.py --shard 0/3
KBR_TORCH_THREADS=6 .audio/venv/bin/python scripts/audio/generate-melotts.py --shard 1/3
KBR_TORCH_THREADS=6 .audio/venv/bin/python scripts/audio/generate-melotts.py --shard 2/3
```

Parâmetros fixos: `TTS(language="KR", device="cpu")`, speaker `KR` (`speaker_id=0`), `speed=1.0`, `torch.manual_seed(0)`. Saída: `.audio/raw/<chave>.wav` (PCM 16 bits, 44,1 kHz, mono). A execução completa observada levou **146,5 s** e não teve falhas.

### 3. Corte, normalização e MP3

```bash
.audio/venv/bin/python scripts/audio/encode-audio.py
```

Para cada WAV:

- remove silêncio abaixo de **−45 dBFS**, mantendo **40 ms** antes e **80 ms** depois do trecho falado;
- normaliza para RMS **−18 dBFS**, limitado a pico **−1 dBFS** e ganho máximo de **+12 dB**;
- aplica fade-in de **5 ms** e fade-out de **20 ms**;
- grava WAV PCM 16 bits intermediário em `.audio/encoded/`;
- codifica com `libmp3lame` em **64 kbps mono 44,1 kHz**, com `-map_metadata -1` e `-fflags +bitexact`;
- calcula SHA-256, duração real via `ffprobe` e estatísticas de loudness;
- grava `src/content/audio/manifest.json` e o mapa compacto `src/content/audio/entries.ts`;
- remove MP3 órfãos do diretório versionado.

O encode é determinístico para a mesma versão de FFmpeg/LAME e o mesmo WAV de entrada. A síntese neural pode variar entre versões de PyTorch/transformers; por isso as versões e revisões ficam registradas e os MP3 publicados são versionados por conteúdo.

## Consumo no app

- `src/lib/audio/text.ts`: normalização NFC + trim e chave FNV-1a de 32 bits.
- `src/lib/audio/inventory.ts`: inventário determinístico a partir do currículo.
- `src/content/audio/entries.ts`: mapa compacto `texto → /audio/v1/<chave>.mp3`, gerado; é o único mapa que entra no bundle do cliente.
- `src/content/audio/manifest.json`: manifesto completo com hash, bytes, duração, loudness, fontes, passos, tags e prioridade; não entra no bundle do cliente.
- `src/lib/audio/manifest.ts`: resolve o asset por texto normalizado.
- `src/lib/audio/playback.ts`: controlador sem React, **somente MP3 do corpus** (sem voz sintética do navegador), com timeout de início, erros, cancelamento e limpeza.
- `src/lib/audio/browser.ts`: adapta `Audio`, `speechSynthesis` e `SpeechSynthesisUtterance` reais.
- `src/components/hangul/exercise-media.tsx`: `AudioControl` com botão, status `role="status"`, replay, alternância **0,75×** com preservação de pitch e dica textual.

Comportamento:

1. Se há `audioSrc` explícito no conteúdo, ele tem prioridade; senão, o mapa estático é consultado.
2. O MP3 é tocado sob demanda (`preload="auto"` no elemento criado no clique; nenhum áudio no carregamento da página).
3. Se o asset não existir, não iniciar em **4 s** ou falhar, o estado vira indisponibilidade (`missing-asset`/`playback-error`). **Não há fallback para voz sintética do navegador.**
4. Com `NEXT_PUBLIC_KBR_STATIC_AUDIO=0`, o app não resolve assets e o controle apenas informa a indisponibilidade.
5. A espera por `voiceschanged` é de **1,5 s**; se a fala não começar em **2 s**, o estado vira erro.
6. Um novo play cancela o anterior; `destroy()` remove listeners e timers. O replay reinicia o mesmo asset.
7. O status só vira “Reproduzindo” quando `play()` resolve ou `onstart` dispara.

## Verificação

```bash
npm run typecheck
npm test -- tests/audio-playback.test.ts tests/audio-manifest.test.ts
npm run build
npx playwright test e2e/audio.spec.ts --project=mobile-390
```

Os testes de manifesto verificam:

- cobertura integral dos textos do inventário (7.790 na Fase 14);
- texto não vazio, apenas Hangul + espaços, chave determinística e caminho único;
- existência, bytes e SHA-256 de cada MP3;
- ausência de órfãos no diretório versionado;
- duração, pico e RMS dentro dos limites;
- modelo, revisões e parâmetros de codificação.

Os testes de playback cobrem asset, `audioSrc` explícito, 0,75×, fallback por erro, asset que não responde, espera por `voiceschanged`, ausência de voz coreana, erro de síntese, cancelamento, replay e limpeza. O E2E cobre MP3 real, repetição, 0,75× e o cenário sem MP3 e sem voz coreana.

## Limpeza e ambiente retido

- Removidos apenas dois scripts temporários de inspeção: `scripts/audio/_count-audio.mjs` e `scripts/audio/_inventory-check.mjs`.
- Retido `.audio/` (gitignored) para reprodução: venv **~7,0 GB** (o wheel do PyTorch traz CUDA), modelos **~654 MB**, WAVs brutos **~33 MB**, inventário, WAVs normalizados e logs.
- Caches globais **não** foram apagados porque são compartilhados ou de propriedade incerta: `/root/.cache/pip` (~4,7 GB), `/root/.cache/uv` (~18 GB), `/root/nltk_data` (~20 MB), cache do Hugging Face (~12 KB).
- Nenhum container, volume ou imagem Docker foi criado.
- Revisão manual pendente: decidir se `.audio/` deve ser apagado após a aprovação dos assets; avaliar limpeza de caches; registrar um lock de dependências; resolver a licença do encoder; agendar gravação/escuta nativa.

## Privacidade

A geração é offline e local. Em runtime, o app serve MP3 do próprio corpus; nenhum texto coreano é enviado a um serviço de TTS e não há voz sintética do navegador. Não há telemetria de áudio.
