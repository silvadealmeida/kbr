# Rascunhos de pedido de esclarecimento de licença — RESOLVIDO (Fase 14)

**Status:** **não é necessário enviar.** O responsável pelo projeto perguntou diretamente ao autor do
`kykim/bert-kor-base` sobre o uso do checkpoint e recebeu a orientação de que o uso **exige crédito**
ao autor e ao repositório. O KBR publica esse crédito em `/impressum` e em `docs/audio/credits.md`.
Os rascunhos abaixo ficam apenas como registro histórico de como a pergunta foi preparada.

## Contatos verificados (fonte primária, 2026-11-12)

| Destinatário | Canal | Fonte |
|---|---|---|
| Autor do LMkor / `kykim/bert-kor-base` | `kykim@artificial.sc` | README do `kiyoungkim1/LMkor` (linha 6: "MOU … kykim@artificial.sc 로 문의 부탁드립니다") — https://github.com/kiyoungkim1/LMkor. Aviso: o repositório não tem push desde 2023-01-01; o endereço pode estar inativo. Alternativa pública: abrir issue em https://github.com/kiyoungkim1/LMkor/issues |
| Mantenedores do MeloTTS | **Sem e-mail publicado.** Canais verificados: Issues do repositório (https://github.com/myshell-ai/MeloTTS/issues; Discussions desativadas) e o README do model card, que manda contatar Zengyi Qin pelo site https://www.qinzy.tech/ (o site não expõe e-mail legível). Issue #43 "License error" (https://github.com/myshell-ai/MeloTTS/issues/43) está aberto há meses, sem resposta | README de `myshell-ai/MeloTTS-Korean` |

Um issue público expõe a pergunta; um e-mail não. Para o autor do BERT, prefira e-mail e, sem resposta em ~3 semanas, o issue.

---

## A. Para o autor do LMkor / BERT coreano

**To:** kykim@artificial.sc  
**Subject:** License clarification: kykim/bert-kor-base used to generate audio for a free, open-source Korean learning site

Dear Dr. Kim,

I am building KBR, a free, open-source web application for Brazilians learning Korean. Thank you for publishing LMkor; it is a valuable resource.

I would like your written confirmation about one specific use. I used the checkpoint `kykim/bert-kor-base` (Hugging Face revision `1779cc0982ada0216dd6de0dd4e86fb78201926d`, pytorch_model.bin SHA-256 `ae43a392…8236`) as a required component of the MeloTTS-Korean text-to-speech pipeline to generate 287 short synthetic Korean audio clips (single syllables, words and phrases). The BERT weights are not included in the audio files or the website; only the resulting MP3 files would be distributed, free of charge, from a public website, and the project's source code is public.

Your questions, in short:

1. Which license applies to the published `kykim/bert-kor-base` checkpoint? The LMkor README says the pretrained models are distributed under Apache-2.0 and, separately, that commercial use is free through an MOU. The Hugging Face repository itself declares no license. Does the Apache-2.0 statement apply to this checkpoint?
2. Is an MOU required for the use described above (generating audio with the checkpoint and publicly distributing that audio in a free, open-source learning site)?
3. If the project later accepted donations or became commercial, would an MOU be required, and how would I request one?
4. May I record your answer in the project's public license documentation?

A short reply by e-mail is enough. If a permission is granted, please state which checkpoint revision and which use it covers.

Thank you for your time.

Kind regards,  
[NOME]  
[CONTATO]  
Project: https://github.com/silvadealmeida/kbr

---

## B. Para os mantenedores do MeloTTS (issue público no repositório ou contato via site do autor)

**Title / Subject:** Licensing of generated audio from MeloTTS-Korean (MIT) when its text pipeline depends on kykim/bert-kor-base

Hello MeloTTS maintainers,

Thank you for releasing MeloTTS. I am building a free, open-source Korean learning website and generated short Korean audio clips with `myshell-ai/MeloTTS-Korean` (revision `0207e5adfc90129a51b6b03d89be6d84360ed323`) and the code at commit `209145371cff8fc3bd60d7be902ea69cbdb7965a`. I would like to confirm what can be redistributed. I understand this is not legal advice.

1. The README and model card state the library is MIT ("free for both commercial and non-commercial use"). Does that MIT license cover the full Korean synthesis pipeline as shipped, including the `checkpoint.pth` weights?
2. The Korean pipeline loads `kykim/bert-kor-base` (`melo/text/korean.py`), whose Hugging Face repository declares no license while its author's page says Apache-2.0 plus an MOU for commercial use. Did MyShell obtain permission to use it, and is there any known restriction on distributing audio produced with it?
3. Can you share, or point to, the training data and its licenses for the Korean model? The model card does not list them.
4. Issue #43 raises a possible conflict with Bert-VITS2's AGPL-3.0 license. Is there an official position on that?
5. Do you impose any condition (attribution, naming) on public distribution of generated audio?

A written answer, even a short one, would let me document the provenance publicly. Thank you.

[NOME] — https://github.com/silvadealmeida/kbr
