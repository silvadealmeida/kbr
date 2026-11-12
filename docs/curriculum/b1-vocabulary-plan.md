# B1 — plano de vocabulário

## Meta

O B1 adiciona **320 identidades novas** e **320 frases contextuais**, 8 por lição. A carga é menor que a do A2 por lição porque o B1 exige mais texto, gramática e produção; a meta foi definida pela cobertura funcional, não por cota arbitrária. As identidades A1/A2/Hangul são retomadas em novos contextos.

## Estrutura

- Linhas por módulo: `src/content/vocabulary/b1-m01.ts` … `b1-m08.ts`
- Entradas e sentenças: `src/content/vocabulary/b1-course.ts`
- Registro canônico: `VOCAB_ENTRIES` / `VOCAB_SENTENCES`
- IDs estáveis: `ko:<forma>`; homógrafos futuros usam `ko:<forma>#<sentido>`
- Origem: `course: "ko-b1"`, `lesson: "b1-lNN"`
- Frases: `sent:b1-lNN:<forma>`
- Referência de lição: `COURSE_LESSON_IDS` com `ko-b1`
- Prática: `/vocabulario` e `/vocabulario/revisao`, Leitner e cartões `v:` inalterados
- Nenhum cartão é salvo automaticamente

## Cobertura

| Módulo | Lições | Novas | Temas |
|---|---|---:|---|
| M1 Histórias | l01–l05 | 40 | memória, trajeto, relato, hipótese, mudança |
| M2 Planos | l06–l10 | 40 | previsão, objetivo, alternativa, risco, decisão |
| M3 Opinião | l11–l15 | 40 | ponto de vista, contraste, adição, discordância, argumento |
| M4 Trabalho | l16–l20 | 40 | função, reunião, vaga, estudo, conflito |
| M5 Sociedade | l21–l25 | 40 | tendência, cultura, limite, cidade, direito |
| M6 Viagem | l26–l30 | 40 | reserva, imprevisto, reclamação, comparação, relato |
| M7 Mídia | l31–l35 | 40 | fonte, tese, fato/opinião, dados, ética |
| M8 Integração | l36–l40 | 40 | narrativa, solução, mensagem, debate, balanço |

## Contexto obrigatório

Antes da resposta: frase com lacuna, dica em português, tradução opcional, campo de digitação. Depois: feedback com texto (não só cor), resposta, frase completa, tradução completa e áudio do navegador. Acerto com tradução/pista aberta repete a caixa Leitner.

## Contagens verificadas

- Identidades B1 novas: **320**
- Frases contextuais B1: **320**
- Reusos anteriores: **96 identidades distintas** de A1/A2/Hangul
- Identidades distintas ensinadas/retomadas: **416**
- Verificação por lição no validador; sem colisão de forma com A1/A2/Hangul
- Todos os itens `in-review`

## Limites

Naturalidade, glosas e traduções não foram validadas por falante nativo. Uma frase contextual não esgota todos os sentidos; o reencontro ao longo dos módulos e a revisão espaçada ajudam, mas não garantem domínio. Áudio é a voz do navegador; os MP3 existentes cobrem o corpus Hangul, e textos sem MP3 usam TTS.
