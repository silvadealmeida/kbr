# Vocabulário — arquitetura (Fase 9A-V)

Sistema de vocabulário pessoal, prática contextual e revisão espaçada. Reutiliza a infraestrutura existente; **não há novo motor de SRS, novo armazenamento nem migração de banco**.

## Camadas

| Camada | Onde | Responsabilidade |
|---|---|---|
| Conteúdo canônico | `src/content/vocabulary/` | `VocabEntry`, `VocabSentence`, vocabulário do Hangul (derivado de `WORDS`), frases, validação estrutural. Sem lógica de aluno. |
| Lógica pura | `src/lib/vocabulary/` | normalização/conferência de resposta, pista, estado salvo/removido, mapeamento ao Leitner, fila diária. `now` sempre injetado. |
| UI | `src/components/vocabulary/` | `VocabularyArea` (`/vocabulario`), `VocabReviewArea` (`/vocabulario/revisao`), `ContextualCard`, `Flashcard`, `useVocabProgress`. |
| Estado do aluno | `Progress.cards["v:<vocabId>"]` | Um `SrsState` (`box`, `due`, `reviewedAt`) por palavra salva. |

## Reutilizado

`Progress` v1 e `isProgress`; `mergeProgress` (merge por cartão); RPC CAS do Supabase e store sincronizado; `leitner` (`lib/srs`); `AudioControl` (voz coreana do navegador); `Button/Card/Plate/Badge/Input`; tokens `success/danger/warning`; `useAuth().progressStore` (local ou sincronizado, convidado ou conta).

## Persistência e sincronização

Decisão: o vocabulário **cabe** no contrato atual sem alterá-lo.

- Chave `v:<id>` no mapa `cards`. O merge existente une cartões por chave e escolhe o de maior `reviewedAt`; o RPC só valida o envelope (`cards` é objeto). Nada de SQL, formato ou CAS muda.
- **Salvar** = criar o cartão (caixa 1, vence na hora). Idempotente.
- **Remover** = gravar uma *marca de remoção*: o mesmo cartão com `due = 9999-12-31T00:00:00.000Z` e `reviewedAt = agora`. Necessário porque o merge é uma união: apagar a chave ressuscitaria a palavra vinda de outro aparelho. Vence a marca mais recente; salvar ou revisar **depois** da remoção vence a marca (testado).
- **Sem `history`**: revisões de vocabulário não entram no histórico para não alterar estatísticas, sequência e atividade recente do painel do Hangul. A última revisão fica em `reviewedAt`.
- Isolamento: a fila de revisão do Hangul e o painel ignoram chaves `v:` (`isVocabCardKey`), então o SRS do Hangul não vê esses cartões (nem como "cartões antigos sem conteúdo").
- Merge convidado→conta e multi-dispositivo usam o código existente; o comportamento está coberto por `tests/vocabulary.test.ts` (merge real, comutatividade, remoção × revisão concorrentes).

### Limites conhecidos (herdados do `Progress` v1)

- Revisões concorrentes da mesma palavra em dois aparelhos: vence a de `reviewedAt` maior; a outra não deixa rastro (sem `history`). Aceitável para SRS; não há perda de palavras.
- Dependência do relógio dos aparelhos para `reviewedAt` (remoção × salvamento próximos no tempo).
- A sincronização remota **não foi verificada contra Supabase real**: os testes usam o merge real + RPC/e2e **simulados**.

## Estados de uma palavra

`available` (existe no currículo) → `encountered` (lição de origem concluída; derivado de `Progress.lessons`) → `learning` (salva = agendada; caixa 1–3) → `consolidated` (caixa ≥ 4: três acertos seguidos sem ajuda, próxima revisão ≥ 8 dias). "Salva" ⇒ "agendada para revisão": salvar cria o cartão Leitner. Nada é marcado como aprendido sem cartão e revisão.

## Áudio

Somente voz coreana do navegador/sistema (`AudioControl`); `resolveAudioAsset` continua `null` para o texto novo. Nenhum MP3 foi gerado, movido ou reativado; a contenção da 8E/8F não foi tocada.
