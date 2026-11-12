# A2 — plano de vocabulário

## 1. Meta

O A2 adiciona **400 identidades lexicais novas** e **400 frases contextuais originais**, 10 por lição. A meta foi definida pela cobertura comunicativa dos 8 módulos, não por uma cota arbitrária: cada lição precisa de vocabulário suficiente para a situação, sem transformar a lição em lista.

Além disso, o curso retoma **115 identidades distintas** do A1/Hangul em contexto, totalizando **515 identidades ensinadas ou retomadas**. Reusar uma identidade não cria um segundo cartão.

## 2. Regras de identidade

- ID canônico: `ko:<forma>`; homógrafos futuros usam `ko:<forma>#<sentido>`.
- A forma é a entrada de dicionário; a frase pode ocultar a forma conjugada (`target`).
- Uma forma nova do A2 não pode colidir com uma identidade existente do A1/Hangul.
- Cada item novo tem origem `course: "ko-a2"`, `lesson: "a2-lNN"` e exatamente uma frase contextual.
- Itens reutilizados apontam para a identidade existente e aparecem em `reusedIds`; não duplicam cartão em `Progress.cards["v:<id>"]`.
- Nenhum item é salvo automaticamente. O aluno decide salvar em `/vocabulario`.

## 3. Estrutura dos dados

- Entradas e sentenças: `src/content/vocabulary/a2-course.ts`.
- Linhas por módulo: `src/content/vocabulary/a2-m01.ts` … `a2-m08.ts`.
- Tipo de linha: `A2VocabRow` em `a2-shared.ts`.
- Registro canônico: `VOCAB_ENTRIES` e `VOCAB_SENTENCES` em `src/content/vocabulary/index.ts`.
- Referências de lição: `A2_STEP_IDS` em `CoursesLessonIds` com a chave `ko-a2`.
- Prática: `/vocabulario` e `/vocabulario/revisao` usam o mesmo Leitner e o mesmo formato `v:`.

## 4. Cobertura por módulo

| Módulo | Lições | Identidades novas | Temas |
|---|---|---|---|
| M1 Reencontros e relatos | l01–l05 | 50 | atividades, viagens, comparação, imprevistos, narrativa |
| M2 Planos e decisões | l06–l10 | 50 | futuro, agenda, sequência, regras, condições |
| M3 Casa e convivência | l11–l15 | 50 | moradia, tarefas, favores, vizinhança, mudança |
| M4 Saúde e bem-estar | l16–l20 | 50 | sintomas, duração, remédios, conselhos, hábitos |
| M5 Trabalho e estudo | l21–l25 | 50 | profissões, candidatura, entrevista, estudo, prazos |
| M6 Viagem e serviços | l26–l30 | 50 | hotel, aeroporto, imprevisto, recomendações, relato |
| M7 Cultura e relações | l31–l35 | 50 | opinião, causa, tratamento, convites, cultura |
| M8 Integração | l36–l40 | 50 | relato, problema, mensagem, futuro, consolidação |

## 5. Prática contextual obrigatória

Antes da resposta, a tela mostra:

- frase coreana com uma lacuna;
- dica de sentido em português;
- tradução completa opcional (abrir/fechar);
- campo para digitar em coreano.

Depois da resposta, a tela mostra:

- acerto/erro com celadon ou terracota, sempre com texto/ícone (nunca só cor);
- resposta esperada;
- frase coreana completa;
- tradução brasileira completa;
- áudio sob clique pela voz coreana do navegador.

O acerto com tradução ou pista aberta repete a caixa Leitner; não avança. O agendamento continua no mesmo estado `v:<id>`.

## 6. Reuso e contexto

- Reusos do A1/Hangul só ocorrem quando forma e sentido coincidem.
- Cada reuso aparece em uma lição com frase própria, não apenas em uma lista.
- Alguns itens do A2 são expressões lexicalizadas (`어쩔 수 없어요`, `가볼 만하다`, `시간을 내다`), tratadas como identidade própria.
- Homógrafos e sentidos contextuais permanecem suportados pelo campo `sense` do registro; o A2 publicado não precisa deles.

## 7. Contagens verificadas

- Identidades A2 novas: **400**.
- Frases contextuais A2: **400**.
- Reusos distintos de outros cursos: **115**.
- Identidades distintas ensinadas/retomadas: **515**.
- Identidades do registro com review `in-review`: **400**.
- Colisões de forma com A1/Hangul: **0**.

## 8. Limites

- A naturalidade das 400 frases e das glosas ainda não foi validada por falante nativo.
- A tradução pode ter mais de uma leitura; o `accepted` cobre variantes lexicais registradas, não todas as paráfrases possíveis.
- Uma frase contextual não esgota o sentido de uma palavra; a revisão espaçada e os reencontros ao longo do curso ajudam, mas não garantem domínio.
- O áudio é a voz do navegador; não há MP3 novo e a qualidade depende do dispositivo.
