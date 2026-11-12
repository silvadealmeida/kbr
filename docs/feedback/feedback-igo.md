# Feedback do usuário — backlog (Igo)

Registro recebido fora do código e preservado aqui para não se perder entre fases.
Cada item separa **observação**, **verificação**, **severidade**, **área de
investigação**, **correção proposta**, **critérios de aceite** e **fase
recomendada**. Nada nesta página foi implementado na 7F; o objetivo é transformar
o relato em trabalho verificável.

## 1. Resposta correta costuma aparecer primeiro nas múltiplas escolhas

- **Observação:** em exercícios de múltipla escolha, a alternativa correta
  muitas vezes é a primeira da lista, o que permite acertar por padrão.
- **Verificação:** não verificada nesta fase. A alegação é plausível porque a
  ordem das alternativas vem do conteúdo autoral (`ExerciseSpec.options`) e não
  há embaralhamento em tempo de execução. Não foi feita medição da frequência
  real em `h01`–`h25`/`c1`–`c4`.
- **Severidade:** alta para a validade pedagógica antes do lançamento público.
  Não bloqueia build, mas enfraquece a avaliação.
- **Área de investigação:** `src/lib/exercises/**` (ordenação/embaralhamento),
  `src/content/hangul/**` (ordem autoral das opções), player de lição/checkpoint
  e testes de correção. Também revisar os tipos `mcq`, `minimal-pair`,
  `audio-to-char`, `char-to-audio` e `reading` com opções.
- **Correção proposta:** definir uma política única de ordem de alternativas —
  preferencialmente embaralhar de forma determinística por tentativa, com seed
  estável para que recarregar não revele outra ordem no meio da mesma tentativa.
  A ordem correta não pode depender de posição. Alternativa mínima: distribuir
  editorialmente a posição correta e cobrir com teste de conteúdo.
- **Critérios de aceite:**
  - a posição da alternativa correta não é previsível em uma amostra de
    exercícios;
  - a mesma tentativa mantém a ordem ao recarregar ou re-renderizar;
  - `checkAnswer` continua comparando IDs/valores, nunca posição;
  - testes cobrem todos os tipos com opções e a distribuição de posições;
  - nenhuma mudança em IDs, conteúdo coreano ou histórico.
- **Fase recomendada:** antes do lançamento público; candidata à 7G ou a uma
  fatia própria de correção. **Não alterar grading nem randomização na 7F.**

## 2. Áudio coreano pouco claro, sobretudo ㄹ e algumas vogais

- **Observação:** o áudio soa confuso ou pouco natural em alguns itens,
  especialmente ㄹ e certas vogais.
- **Verificação:** não verificada com falante nativo nem em dispositivo real
  nesta fase. O app usa `speechSynthesis` do navegador (`ko-KR`), cuja voz,
  velocidade e disponibilidade variam por sistema; não há arquivo de áudio
  dedicado. A qualidade percebida pode ser da voz sintética, da pronúncia
  isolada de jamo ou de uma transcrição didática em revisão.
- **Severidade:** alta para compreensão oral e confiança no conteúdo antes do
  lançamento público. O texto e o IPA permanecem disponíveis como alternativa.
- **Área de investigação:** `src/components/hangul/exercise-media.tsx`
  (`speakKorean`, `AudioControl`), exercícios `listen`, `audio-to-char`,
  `char-to-audio`, `minimal-pair`; registros de `JAMO`/`SYLLABLES` com ㄹ e
  vogais; checklist de revisão nativa em `docs/roadmap.md`.
- **Correção proposta:** curto prazo, revisar as transcrições e oferecer sempre
  a forma escrita + IPA + dica textual; médio prazo, avaliar arquivos de áudio
  gravados por falante nativo (ou TTS premium) para jamo/sílabas críticas, com
  fallback para a voz do sistema. Não prometer pronúncia definitiva enquanto o
  conteúdo estiver `in-review`.
- **Critérios de aceite:**
  - itens com ㄹ e vogais críticas têm alternativa textual completa;
  - a UI não afirma que a voz sintética é a pronúncia oficial;
  - uma revisão nativa aprova ou corrige cada transcrição antes de publicar;
  - o fallback funciona quando `speechSynthesis` não existe ou falha;
  - decisão registrada sobre áudio dedicado versus voz do sistema.
- **Fase recomendada:** revisão nativa e decisão de áudio antes do lançamento
  público; implementação de arquivos dedicados é trabalho futuro, fora da 7F.

## 3. Vontade de flashcards de vocabulário ilustrados

- **Observação:** o usuário gostaria de cartões de vocabulário com ilustrações.
- **Verificação:** não implementado. O catálogo atual é de Hangul/Pré-A1; não há
  curso A1, banco de vocabulário amplo nem assets ilustrados. O SRS existente
  revisa erros já registrados, não um baralho de vocabulário novo.
- **Severidade:** média/oportunidade de produto. Não é requisito para concluir o
  módulo Hangul e não deve bloquear o lançamento atual.
- **Área de investigação:** roadmap CEFR A1–C2, modelo de conteúdo de
  vocabulário, SRS Leitner, política de assets e acessibilidade das imagens.
- **Correção proposta:** planejar um baralho de vocabulário somente quando
  houver conteúdo A1 aprovado; cada cartão deve ter palavra, leitura, tradução,
  exemplo, áudio/alternativa textual e ilustração com descrição acessível.
  Reutilizar o SRS existente sem criar outro scheduler.
- **Critérios de aceite:**
  - vocabulário com revisão nativa e status editorial explícito;
  - ilustrações originais ou licenciadas, com texto alternativo;
  - cartões entram na revisão sem duplicar o SRS ou o `Progress` v1;
  - funcionalidade não depende só de imagem ou áudio;
  - orçamento de desempenho e acessibilidade documentado.
- **Fase recomendada:** futuro, junto de conteúdo A1–C2. **Fora da 7F.**
