# Feedback do usuário — registro histórico (Igo)

> **Estado final:** o item 1 (posição da resposta) e o item 2 (áudio) estão resolvidos. O áudio está
> resolvido com créditos, com 7.790 MP3 servidos por padrão. O item 3 (flashcards ilustrados) não
> está planejado e não bloqueia o release. A revisão editorial final assistida por IA foi aceita
> pelo responsável; não houve revisão nativa. Testes físicos não são requisito. As descrições e
> propostas abaixo preservam o feedback original, não um backlog ativo.

Registro recebido fora do código e preservado aqui para não se perder entre fases.
Cada item separa **observação**, **verificação**, **severidade**, **área de
investigação**, **correção proposta**, **critérios de aceite** e **fase
recomendada**. O item 1 foi implementado e verificado na Fase 8A; o item 2 foi
resolvido com áudio estático e créditos na Fase 14; o item 3 permanece fora do
escopo e não é uma tarefa planejada. A auditoria vigente do áudio está em `docs/audio/`.

## 1. Resposta correta costuma aparecer primeiro nas múltiplas escolhas

- **Observação:** em exercícios de múltipla escolha, a alternativa correta
  muitas vezes é a primeira da lista, o que permite acertar por padrão.
- **Verificação (Fase 8A, concluída):** a alegação foi confirmada no conteúdo
  autoral. Em 341 exercícios de escolha única, 330 (96,8%) tinham a correta na
  primeira posição; em 126 grupos da bancada de composição, 125 (99,2%). Em 25
  dos 29 passos (`h01`–`h25`, `c1`–`c4`), todas as escolhas únicas tinham a
  correta primeiro. Não havia duplicatas dentro de um mesmo exercício e a
  resposta correta sempre existia nas opções. A revisão já usava um `salt`
  determinístico para variar a posição, mas lições/checkpoints não tinham
  embaralhamento algum.
- **Severidade:** alta para a validade pedagógica antes do lançamento público.
  Não bloqueia build, mas enfraquece a avaliação.
- **Área de investigação:** `src/lib/exercises/**`, `src/content/hangul/**`,
  player de lição/checkpoint, `ChoiceList` e `SyllableBuilder`.
- **Correção implementada:** embaralhamento Fisher–Yates na apresentação
  (`src/lib/exercises/shuffle.ts`) para `mcq`, `audio-to-char`,
  `char-to-audio`, `minimal-pair`, `reading` com escolha e para os grupos
  inicial/medial/final de `build-syllable`. A ordem é sorteada uma vez por
  tentativa, mantida durante seleção, feedback, tema, áudio e sync, e renovada
  ao montar o exercício em uma nova tentativa/revisita. A correção continua
  comparando IDs/valores; nenhum conteúdo, ID, nota, `Progress` v1, CAS ou SRS
  mudou.
- **Critérios de aceite — atendidos:**
  - a posição da alternativa correta não é previsível em uma amostra de
    exercícios (341 exercícios × 300 tentativas simuladas; distribuição dentro
    de 3σ para 2, 3, 4 e 6 posições);
  - a mesma tentativa mantém a ordem ao re-renderizar, trocar o tema ou receber
    feedback; a ordem só muda em nova montagem/tentativa;
  - `checkAnswer` continua comparando IDs/valores, nunca posição (teste com
    todas as permutações representativas);
  - testes cobrem todos os tipos com opções e a distribuição de posições;
  - nenhuma mudança em IDs, conteúdo coreano, grading, histórico ou banco.
- **Fase recomendada:** antes do lançamento público. **Implementado na 8A**
  (`tests/exercise-order.test.ts` e cobertura Playwright em `e2e/hangul.spec.ts`).
- **Status:** **resolvido na Fase 8A**.

## 2. Áudio coreano pouco claro, sobretudo ㄹ e algumas vogais

- **Observação:** o áudio soa confuso ou pouco natural em alguns itens,
  especialmente ㄹ e certas vogais.
- **Verificação:** não verificada com falante nativo nem em dispositivo real.
  A auditoria da 7G (`docs/audio/current-audio-audit.md`) confirmou que o app usa
  somente `speechSynthesis` do navegador (`ko-KR`, `rate = 0.85`), sem arquivo de
  áudio dedicado, sem escolha explícita de voz e sem checagem de voz coreana. O
  texto falado tem 547 `audioText` (265 únicos) e não contém jamo isolado; o
  relato pode vir da voz do sistema, de prosódia de item isolado, de `rate = 0.85`
  ou de fusões reais do coreano moderno (ㅐ/ㅔ, ㅚ/ㅙ/ㅞ), não de texto malformado.
  A qualidade percebida continua sem reprodução em iPhone/Android/Windows reais.
- **Severidade:** alta para compreensão oral e confiança no conteúdo antes do
  lançamento público. O texto e o IPA permanecem disponíveis como alternativa.
- **Área de investigação:** `src/components/hangul/exercise-media.tsx`
  (`speakKorean`, `AudioControl`), exercícios `listen`, `audio-to-char`,
  `char-to-audio`, `minimal-pair`; registros de `JAMO`/`SYLLABLES` com ㄹ e
  vogais; checklist de revisão nativa em `docs/roadmap.md`.
- **Correção proposta:** curto prazo, revisar as transcrições e oferecer sempre
  a forma escrita + IPA + dica textual; médio prazo, gravar os 265 itens únicos
  com falante nativo e usar TTS apenas como fallback (proposta em
  `docs/audio/audio-quality-roadmap.md`). Não prometer pronúncia definitiva
  enquanto o conteúdo estiver `in-review`.
- **Critérios de aceite:**
  - itens com ㄹ e vogais críticas têm alternativa textual completa;
  - a UI não afirma que a voz sintética é a pronúncia oficial;
  - uma revisão nativa aprova ou corrige cada transcrição antes de publicar;
  - o fallback funciona quando `speechSynthesis` não existe ou falha;
  - decisão registrada sobre áudio dedicado versus voz do sistema.
- **Estado final:** áudio resolvido com créditos e riscos residuais de naturalidade aceitos como
  não bloqueantes. O registro acima descreve a recomendação original, não o veredito atual.

## 3. Vontade de flashcards de vocabulário ilustrados

- **Observação:** o usuário gostaria de cartões de vocabulário com ilustrações.
- **Verificação:** parcialmente atendido pelo vocabulário em texto. O A1 já tem
  40 lições, 443 identidades lexicais e 443 frases contextuais, mas **não há
  ilustrações** nem um baralho ilustrado. O SRS existente revisa as palavras
  salvas pelo aluno, não um baralho visual novo.
- **Severidade:** média/oportunidade de produto. Não é requisito para concluir o
  módulo Hangul e não deve bloquear o lançamento atual.
- **Área de investigação:** roadmap CEFR A1–C2, modelo de conteúdo de
  vocabulário, SRS Leitner, política de assets e acessibilidade das imagens.
- **Correção proposta:** planejar um baralho ilustrado depois da revisão nativa
  do vocabulário A1; cada cartão deve ter palavra, leitura, tradução, exemplo,
  áudio/alternativa textual e ilustração com descrição acessível. Reutilizar o
  SRS existente sem criar outro scheduler.
- **Critérios de aceite:**
  - vocabulário com revisão nativa e status editorial explícito;
  - ilustrações originais ou licenciadas, com texto alternativo;
  - cartões entram na revisão sem duplicar o SRS ou o `Progress` v1;
  - funcionalidade não depende só de imagem ou áudio;
  - orçamento de desempenho e acessibilidade documentado.
- **Fase recomendada:** futuro, junto de conteúdo A1–C2. **Fora da 7F.**

## 4. Prática de fala nativa e cartão do catálogo no iPhone (Fase 8C)

- **Pedido:** treinar fala coreana com o reconhecimento nativo do aparelho/
  navegador (sem Whisper nem backend) e corrigir o espaço vazio à direita do
  cartão do curso em `/cursos`, visto em iPhone real.
- **Verificação do layout:** medido em 320/375/390/768/1280 px, claro e escuro:
  sem overflow horizontal; o conteúdo do cartão começava a 21 px da borda
  esquerda e terminava a 57 px da direita. Causa: `Plate` aplicava `pr-14` ao
  cartão inteiro sempre que recebia `number`. Corrigido reservando espaço só no
  rótulo; teste de regressão em `e2e/catalog-layout.spec.ts`.
- **Prática de fala:** implementada como recurso **experimental** em `/fala`
  (`docs/speech/speech-recognition.md`). Exibe o texto reconhecido e se
  corresponde ao esperado; não avalia pronúncia, não altera progresso e não
  bloqueia lições.
- **Cobertura:** teste físico em iPhone/Safari, Chrome iOS, Chrome Android e Chrome Windows não foi
  executado; não é requisito de release. O checklist é referência opcional, não bloqueio.

## Fotografia histórica da Fase 8D (superada)

- **Item 2 (áudio):** a auditoria 8D descreveu o corpus de 287 MP3 e uma avaliação de licença então
  bloqueante. Isso foi superado na Fase 14: áudio resolvido com créditos, 7.790 MP3 servidos por
  padrão e sem bloqueio de distribuição no estado operacional aceito pelo responsável.
- **Item 3 (flashcards ilustrados):** inalterado, futuro.
- **Item 4 (fala/catálogo):** a prática de fala continua testada só com
  reconhecedor simulado; a matriz para o usuário rodar nos aparelhos está em
  `docs/iphone-manual-checklist.md` §14.
