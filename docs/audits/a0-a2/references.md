# Referências consultadas

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Regra desta auditoria: **ou a afirmação vem do repositório (código/validador/motor),
ou vem de norma coreana consultada de fato, ou fica `INCERTO`.** Nada de "parece
errado". Nenhuma fonte foi citada de memória: as que exigem citação foram abertas
durante a sessão e estão linkadas abaixo.

## 1. Normas da língua coreana (primárias)

| Fonte | Onde foi usada | O que sustentou |
|---|---|---|
| 국립국어원 — **한글 맞춤법** 제43항 (단위를 나타내는 명사는 띄어 쓴다; 예외: 순서/아라비아 숫자) — <https://korean.go.kr/kornorms/regltn/regltnView.do> | `A2M3-001` | `삼 층` é a forma de princípio; `삼층`/`3층` são **permitidas** → o erro real está no ditado que rejeita a variante, não na grafia do conteúdo |
| 국립국어원 **온라인가나다** 336486 (2026-10-01), "삼 층짜리 건물" | idem | confirma que quantidade ≠ ordem: `삼 층` correto; com algarismo, `3층` permitido |
| 국립국어원 **온라인가나다** 321977 / 317036 e **우리말 바루기** ("한 번" × "한번"; unificação de `다시 한번` em 2015) | `A1M8-*`, `V2-*` | `한 번` (contagem) × `한번` (tentativa/enfatização); em `다시 한번` o Instituto unificou o ligado → o curso está correto e **não** é achado |
| **한글 맞춤법** 제47항 (보조 용언: 원칙 띄어, permitido attached) | `V1-002` | `입어 보다` (princípio) e `입어보다` (permitido) — a forma do curso não é erro; rejeitei o achado do revisor |
| 국립국어원 **온라인가나다** 323080 (2025-11-03) | `A2M7-001` | "『계셔요』와 『계세요』는 어감의 차이가 있을 뿐… 표준국어대사전에서는 '-세요'와 '-셔요'를 동의어로 처리" → as duas são padrões; rejeitar `계셔요` é defeito de correção |
| **한글 맞춤법** 제35항 붙임 2 (되→돼, 뵈어→봬, 뵈었다→뵀) | `A2M7-002` | `뵀어요` é contração padrão de `뵈었어요` → deve ser aceita no cloze |
| **표준 발음법** 제5항 다만 3/4 + página do Instituto <https://www.korean.go.kr/front/page/pageView.do?page_id=P000098> | `A0-004`, `V0-002` | `주의[주의/주이]` (sílaba não inicial, **após vogal**) e `우리의[우리의/우리에]` (partícula genitiva) → o exemplo do curso classifica o ambiente errado, mas a nota de `나의 → [나에]` está correta (rejeitei `V0-002`) |
| 국립국어원 **온라인가나다** 327196 (2026-02-07), "옛 음악" | `A0-001`, `V0-001` | o próprio Instituto escreve `[옏 으막]` → a transcrição `으막` do curso está certa (o `ㅁ` de `음` se move); rejeitei `V0-001`, que alegava que `으막` "não existe". O erro remanescente é só a prosa que diz "**ㄱ** final de 음" |
| **받침** (한국민족문화대백과사전 <https://encykorea.aks.ac.kr/Article/E0021580>; <https://www.korean.go.kr/hangeul/principle/001.html>; <https://www.korean.go.kr/nkview/news/12/128.htm>) | `A0-002` | 16 홑받침 + 11 겹받침 = **27** finais escritos (o "28" do curso é eco das 28 letras do 훈민정음) |
| **표준 발음법** 제13항 + 해설 ("'ㅇ'으로 끝나는 말은 연음이 되지 않는다") | `A0-005` (contexto) | delimita onde a ligação se aplica; usado para checar as afirmações de h21–h25 |

## 2. Currículo e progressão

| Fonte | Uso |
|---|---|
| `src/content/curriculum/{a1,a2}/blueprint.ts` (campo `grammar` por lição) | definição operacional de "o que foi ensinado"; base de todos os achados `cobrança de marco não ensinado` |
| `docs/curriculum/{a1,a2}-learning-outcomes.md`, `-syllabus.md`, `docs/pedagogy/*` | resultados declarados × o que os itens cobram; nenhuma meta CEFR/TOPIK foi inventada |
| King Sejong Institute / padrão de syllabi A1–A2 (referência de nível, usada só qualitativamente) | plausibilidade de nível de léxico (`V2-014`, `CL-06` carga lexical) — sem afirmação de "equivalência oficial" |

## 3. Evidência interna do próprio repositório (a mais forte que existe aqui)

| Artefato | O que provou |
|---|---|
| `src/lib/exercises/index.ts` (`normalize`, `checkAnswer`) | igualdade exata de texto corrige `mcq` → o gabarito de `a2-l02-e01` é impossível (C1 da sonda); pontuação não é removida → 126 itens de A2 dependem do ponto final; `acceptedAnswers` é lista fechada → `언니는`, `계셔요`, `뵀어요`, `삼층이에요`, `커피를 좋아해요.` (sem `저는`) são rejeitados hoje |
| `src/content/curriculum/{a1,a2}/validate-content.ts`, `src/content/vocabulary/validate.ts`, `src/content/hangul/validate.ts` | lacunas de validação: `options × correctAnswer` inexistente, frase preenchida do `cloze` não conferida, `targetPosition` só olha início de palavra (`감기` dentro de `감기약` passa) |
| `src/lib/hangul/pronunciation.ts` (`applyLiaison`, `applyNasalization`, `applyAspiration`) | o que o app "sabe" de sandhi; conferiu os 23 pares `written → spoken` de A0 (todos corretos, inclusive `음악→으막`) |
| `src/content/vocabulary/{a1,a2}-*.ts`, `index.ts` | 976 entradas, 868 frases, 0 colisões de ID, 108 entradas sem frase contextual, reusos sempre anteriores à lição que os reusa |
| `src/lib/vocabulary/queue.ts:38-43` | entradas sem frase caem em modo `flashcard` (limite estrutural, não defeito) |
| `docs/roadmap.md`, `AGENTS.md` | contagens declaradas × medidas (batem; divergência só em 549 vs 543 testes) |

## 4. Controles positivos (para "zero ocorrências" significar alguma coisa)

As checagens numerais/irregulares foram exercitadas contra frases deliberadamente
erradas (`춥어요`, `어렵어요`, `되요`, `없어세요`, `삼 개`, `이 명을`): **7 de 7**
disparam. No corpus real, 0 ocorrências — ou seja, o corpus não tem esse tipo de
erro. Sem esse controle, um "0 ocorrências" seria indistinguível de um script que
nunca dispara.

## 5. Fontes que **não** usei

- Nenhum corpus de frequência (SKAE/Sejong) foi baixado → afirmações de "palavra fora
  de nível" ficaram `MINOR`/`INCERTO`, nunca `CRÍTICO`.
- Nenhuma gravação de falante nativo, nenhum material didático copiado.
- Não consultei IA anterior como autoridade: a discordância entre revisores foi
  resolvida por norma (seção 1) ou marcada `disputed`
  (`data/second-model-packet.md`).
