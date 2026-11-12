# A2 — pesquisa, referências e decisões pedagógicas

Pesquisa concluída em **2026-11-12**. Este documento orienta o blueprint A2 do KBR; não licencia copiar lições, diálogos ou exercícios de terceiros. Todo o conteúdo implementado é original e permanece `in-review` até revisão por falante nativo.

## 1. Como o A2 é tratado aqui

O KBR usa três referenciais com finalidades diferentes:

- **CEFR**: quadro de resultados comunicativos e de progressão por uso da língua.
- **Currículo nacional coreano (NIKL)**: referência específica de temas, funções e conhecimento linguístico do coreano.
- **TOPIK I**: fonte secundária para tarefas receptivas de escuta e leitura.

Esses referenciais **não são equivalentes**. O KBR não declara que o curso A2 certifica CEFR A2, não afirma equivalência com TOPIK e não prepara oficialmente para o exame. A conclusão é interna.

## 2. CEFR A2 — descritores usados

**Padrão publicado (paráfrase).** O A2 descreve um usuário que compreende frases e expressões frequentes sobre áreas de relevância imediata (informação pessoal e familiar, compras, geografia local, emprego), comunica-se em tarefas simples e rotineiras que exigem troca direta de informação e descreve, em termos simples, aspectos do passado, do ambiente e de necessidades imediatas.

Consequências para o KBR:

- o curso precisa ir além de frases isoladas: textos curtos conectados, relatos e mensagens;
- a compreensão oral continua controlada, mas inclui conversas cotidianas com mais de um turno;
- a produção escrita é curta e conectada, não uma redação longa;
- a produção oral espontânea não é avaliada automaticamente;
- o curso deve treinar reparo, cortesia e adequação de registro.

Fonte primária: Council of Europe, *CEFR Companion Volume* (2020), descritores de recepção, produção, interação e mediação. Acesso em 2026-11-12. Ver também a página oficial de descritores do CEFR.

## 3. Currículo coreano — nível 2

**Padrão publicado (paráfrase).** O *International Standard Curriculum for Korean Language* organiza cada nível por temas, funções/tarefas, vocabulário, gramática, pronúncia, escuta, fala, leitura, escrita, texto e cultura. O nível 2 amplia a comunicação cotidiana para relações sociais, moradia, saúde, trabalho/estudo, viagem, serviços, lazer e comparação cultural, com textos e diálogos mais longos que o nível 1.

Consequências para o KBR:

- os módulos do A2 retomam domínios do A1, mas com tarefas mais longas e maior exigência de coerência;
- gramática nova é preparada antes de ser cobrada;
- temas culturais aparecem como comparação e prática, não como estereótipo;
- o curso não copia a sequência oficial nem reivindica cobrir todo o nível 2.

Fontes primárias: National Institute of Korean Language, *International Standard Curriculum for Korean Language*; Korean Language Teaching and Learning Center; King Sejong Institute Foundation (materiais por faixa). A consulta foi de estrutura/cobertura; nenhum conteúdo foi copiado.

## 4. TOPIK I

**Padrão publicado (paráfrase).** O TOPIK I avalia escuta e leitura em nível iniciante. Ele não avalia fala nem escrita e não define sozinho um curso comunicativo.

Consequências para o KBR:

- itens de leitura e escuta podem se inspirar em tarefas de informação concreta;
- o curso mantém produção escrita e interação, que o TOPIK I não cobre;
- não há promessa de nota, nível ou aprovação em TOPIK.

Fonte primária: National Institute for International Education, *TOPIK overview*.

## 5. Evidência de aprendizagem usada

**Recuperação espaçada.** Praticar recordação em intervalos melhora retenção em comparação com releitura passiva. O KBR mantém o Leitner existente e não cria um algoritmo novo.

**Prática contextual.** Vocabulário em frase comunicativa não ambígua, com dica de sentido, resposta digitada e feedback completo, favorece recuperação e uso. Uma frase isolada não basta: o A2 retoma itens em novos contextos ao longo dos módulos.

**Carga cognitiva.** Lições com objetivo comunicativo claro, uma situação e poucos focos gramaticais reduzem sobrecarga. O A2 usa 10 itens por lição, 5 guiados e 5 independentes, em vez de acumular exercícios.

**Variação sem inflação.** A repetição de estrutura é aceitável quando o conteúdo comunicativo muda; não é aceitável duplicar diálogos ou exercícios para atingir contagem. Cada lição tem situação, falas e itens próprios.

Fontes de pesquisa: Karpicke & Bauernschmidt (2011); Karpicke & Roediger (2008); van den Broek et al. (2018, 2022). Ver também `docs/curriculum/a1-research.md` para a base completa já usada no projeto.

## 6. Decisões específicas do A2

1. **Entrada após o A1.** O A2 exige `a1-c08` concluído. A política é explícita no registro do curso, no catálogo, na página do curso e no player; não altera `Progress` v1.
2. **Progressão cumulativa.** Cada módulo tem 5 lições e 1 checkpoint. O checkpoint exige as cinco lições e todos os checkpoints anteriores.
3. **Gramática em espiral.** Estruturas do A1 reaparecem dentro de relatos e planos; estruturas novas são apresentadas antes de serem avaliadas.
4. **Vocabulário opt-in.** Nenhum cartão é salvo automaticamente. O A2 adiciona 400 identidades novas e 400 frases contextuais, com 115 identidades do A1/Hangul retomadas em contexto.
5. **Sem novo motor de exercício.** O A2 usa `mcq`, `cloze`, `listen`, `translate` e `reading`, todos implementados e determinísticos.
6. **Sem áudio novo.** A voz coreana do navegador é usada sob clique; nenhum MP3 restrito é reativado.

## 7. Limites e riscos

- Naturalidade, partículas, conjugações e traduções **não foram validadas por falante nativo**.
- A distribuição de itens por tipo é editorial, não psicometricamente calibrada.
- Não há estudo com aprendizes nem teste de validade.
- A conclusão A2 não é certificação CEFR/TOPIK.
- A fala livre e a escrita aberta continuam fora da nota automática.
- Dispositivos reais (iPhone/Chrome iOS/VoiceOver) não foram testados nesta fase.
