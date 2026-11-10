# Hangul — referência pedagógica

**Status:** conteúdo em revisão (`in-review`). Nenhuma afirmação foi validada por falante nativo ou professor.
**Uso:** documento de apoio para autoria e implementação do módulo Hangul. Não é material do aluno e não deve ser exibido inteiro no app.
**Documentos irmãos:** `curriculum.md` (sequência), `pronunciation-ptbr.md` (contrastes com português), `exercise-design.md` (prática), `content-schema.md` (tipos e validação).

---

## 1. Como ler este documento

- **Fato linguístico:** descrição do sistema, com referência à fonte.
- **Decisão pedagógica:** escolha de como ensinar, marcada como tal.
- **Hipótese:** algo plausível que ainda não foi testado com usuários.
- **Pendência:** ponto que exige revisão humana.

Toda transcrição IPA é uma **aproximação de referência**. A pronúncia real varia por região, idade, registro e velocidade. O app não deve apresentar IPA como se fosse a única forma possível.

---

## 2. Terminologia mínima

| Termo | Definição | Evitar |
|---|---|---|
| Hangul (한글) | nome moderno do alfabeto coreano | “hangul” com h minúsculo no início de frase |
| Jamo (자모) | letra/componente do alfabeto | chamar jamo de “sílaba” |
| Bloco silábico | agrupamento visual de jamo que representa uma sílaba | “letra coreana” para o bloco inteiro |
| Inicial (초성) | consoante no topo/esquerda do bloco | “primeira letra” |
| Medial (중성) | vogal no centro/direita/base | “vogal do meio” |
| Final (종성) | consoante no pé do bloco; pode estar vazia | “última letra” |
| Batchim (받침) | nome tradicional do final consonantal | “consoante muda” |
| Som representativo | um dos 7 sons finais que resumem 28 grafias | “fonema final” |
| Ligação (연음) | pronúncia do batchim como início da sílaba seguinte | “sandhi” no texto do aluno |
| Nasalização | assimilação para [ŋ]/[n]/[m] antes de nasal | “transformação” genérica |
| Aspiração | fusão com ㅎ produzindo ㅋ/ㅌ/ㅍ/ㅊ | “sopro” como termo técnico |

**Decisão de UX:** o app pode usar “som final” e “batchim” alternadamente, mas deve explicar o termo na primeira ocorrência. Não usar “consoante final” sem dizer que ela não é pronunciada como uma consoante inicial.

---

## 3. História em poucas linhas

1. Antes do Hangul, o coreano era escrito com caracteres chineses e sistemas auxiliares (Idu, Hyangchal, Gugyeol). A escrita era acessível a uma minoria letrada.
2. O rei Sejong, da dinastia Joseon, criou o Hunminjeongeum (“sons corretos para instruir o povo”) em **1443**; a promulgação oficial é de **1446**.
3. O documento explicativo, *Hunminjeongeum Haerye*, descreve o princípio de construção das letras. O manuscrito foi inscrito no Registro da Memória do Mundo da UNESCO em **1997**.
4. O alfabeto original tinha **28 letras**: 17 consoantes e 11 vogais. O coreano moderno usa **19 consoantes** e **21 vogais**; cinco consoantes tensas foram acrescentadas e vogais compostas se consolidaram.
5. O nome “Hangul” foi adotado no início do século XX, associado ao estudioso Ju Si-gyeong. Durante o domínio japonês, o uso do coreano sofreu restrições; a padronização moderna veio depois de 1945.
6. Hoje, o alfabeto é usado nas duas Coreias, com diferenças de ortografia e de padrão. O KBR segue o padrão sul-coreano e a pronúncia de Seoul como referência, sem afirmar que seja a única.

**Cuidados de redação:**
- Não dizer “o alfabeto mais científico do mundo”. Dizer que o desenho tem princípio articulatório e que isso é notável, sem superlativo.
- Não atribuir a criação exclusivamente a Sejong como trabalho individual; ele foi o responsável pelo projeto, com participação de estudiosos da corte. A extensão exata da participação é debatida.
- Não usar “dia do Hangul” como dato de criação; o feriado é 9 de outubro, data de promulgação, não de invenção.
- Não afirmar que o Hangul “eliminou o analfabetismo” sozinho; alfabetização depende de escola, política e economia.

**Pendência:** conferir datas e atribuições na revisão especializada antes de publicar qualquer linha do tempo detalhada.

---

## 4. Princípio de construção

### 4.1 Consoantes

As consoantes básicas foram desenhadas a partir da forma dos órgãos articuladores:

| Letra | Órgão/formato | Ideia |
|---|---|---|
| ㄱ | raiz da língua bloqueando a garganta | som velar |
| ㄴ | ponta da língua tocando o alvéolo | som alveolar |
| ㅁ | contorno da boca | som bilabial nasal |
| ㅅ | forma dos dentes | som fricativo |
| ㅇ | contorno da garganta | som glotal; hoje, inicial muda e final [ŋ] |

Letras derivadas acrescentam traços:

- ㄱ → ㅋ (aspiração) e ㄲ (tensão).
- ㄷ → ㅌ e ㄸ.
- ㅂ → ㅍ e ㅃ.
- ㅈ → ㅊ e ㅉ.
- ㅅ → ㅆ.
- ㅎ é uma letra à parte, ligada à garganta.

**Decisão pedagógica:** o currículo não ensina a etimologia de cada traço como regra de leitura. A história aparece em `h01` e em notas opcionais; o aluno não precisa desenhar letras para ler. O princípio ajuda a memorizar, mas não substitui prática.

### 4.2 Vogais

As vogais partem de três símbolos:

- `·` (ponto): céu.
- `ㅡ`: terra.
- `ㅣ`: ser humano.

Combinações:

- ㅏ = ㅣ + · (ponto à direita).
- ㅓ = · + ㅣ (ponto à esquerda).
- ㅗ = · + ㅡ (ponto acima).
- ㅜ = ㅡ + · (ponto abaixo).
- ㅛ e ㅠ usam dois pontos.
- ㅑ e ㅕ usam dois pontos.
- ㅐ e ㅔ são combinações históricas de ㅏ/ㅓ com ㅣ.
- ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ são combinações de vogais.

**Cuidado:** a etimologia não explica a pronúncia moderna de forma confiável. `ㅐ` e `ㅔ` convergiram; `ㅚ` e `ㅟ` têm realizações variáveis. Ensinar a forma, não deduzir o som.

---

## 5. Inventário moderno

### 5.1 Consoantes (19)

| # | Jamo | Nome | IPA inicial | IPA entre vogais | Classe |
|---|---|---|---|---|---|
| 1 | ㄱ | 기역 (giyeok) | [k] | [ɡ] | simples |
| 2 | ㄲ | 쌍기역 (ssanggiyeok) | [k͈] | [k͈] | tensa |
| 3 | ㄴ | 니은 (nieun) | [n] | [n] | nasal |
| 4 | ㄷ | 디귿 (digeut) | [t] | [d] | simples |
| 5 | ㄸ | 쌍디귿 (ssangdigeut) | [t͈] | [t͈] | tensa |
| 6 | ㄹ | 리을 (rieul) | [ɾ] | [ɾ] | líquida |
| 7 | ㅁ | 미음 (mieum) | [m] | [m] | nasal |
| 8 | ㅂ | 비읍 (bieup) | [p] | [b] | simples |
| 9 | ㅃ | 쌍비읍 (ssangbieup) | [p͈] | [p͈] | tensa |
| 10 | ㅅ | 시옷 (siot) | [s] | [s] | fricativa |
| 11 | ㅆ | 쌍시옷 (ssangsiot) | [s͈] | [s͈] | tensa |
| 12 | ㅇ | 이응 (ieung) | ∅ | ∅ | inicial muda |
| 13 | ㅈ | 지읒 (jieut) | [tɕ] | [dʑ] | africada |
| 14 | ㅉ | 쌍지읒 (ssangjieut) | [t͈ɕ] | [t͈ɕ] | tensa |
| 15 | ㅊ | 치읓 (chieut) | [tɕʰ] | [tɕʰ] | aspirada |
| 16 | ㅋ | 키읔 (kieuk) | [kʰ] | [kʰ] | aspirada |
| 17 | ㅌ | 티읕 (tieut) | [tʰ] | [tʰ] | aspirada |
| 18 | ㅍ | 피읖 (pieup) | [pʰ] | [pʰ] | aspirada |
| 19 | ㅎ | 히읗 (hieut) | [h] | [ɦ] ~ ∅ | glotal |

**Observações:**
- A coluna “entre vogais” descreve a sonorização das simples. Em início de palavra, ㄱ/ㄷ/ㅂ/ㅈ são surdas e levemente aspiradas.
- As tensas não são apenas “fortes”: envolvem tensão muscular e ausência de aspiração.
- ㅅ diante de ㅣ/ㅑ/ㅕ/ㅛ/ㅠ tende a [ɕ]; a tabela simplifica.
- ㅎ entre vogais pode ser [ɦ] ou cair; a tabela mostra a variação.
- ㅇ só tem som [ŋ] na posição final; como inicial, é mudo. Ver §6.

### 5.2 Vogais (21)

| # | Jamo | Nome | IPA de referência | Tipo | Observação |
|---|---|---|---|---|---|
| 1 | ㅏ | 아 | [a] | simples | — |
| 2 | ㅐ | 애 | [ɛ] ~ [e] | simples | em fusão com ㅔ |
| 3 | ㅑ | 야 | [ja] | iotizada | — |
| 4 | ㅒ | 얘 | [jɛ] ~ [je] | iotizada | pouco frequente |
| 5 | ㅓ | 어 | [ʌ] ~ [ə] | simples | não é “ó” |
| 6 | ㅔ | 에 | [e] ~ [ɛ] | simples | em fusão com ㅐ |
| 7 | ㅕ | 여 | [jʌ] ~ [jə] | iotizada | — |
| 8 | ㅖ | 예 | [je] ~ [e] | iotizada | após consoante, frequentemente [e] |
| 9 | ㅗ | 오 | [o] | simples | lábios arredondados |
| 10 | ㅘ | 와 | [wa] | ditongo | — |
| 11 | ㅙ | 왜 | [wɛ] ~ [we] | ditongo | em fusão com ㅞ/ㅚ |
| 12 | ㅚ | 외 | [ø] ~ [we] | ditongo/vogal | variação ampla |
| 13 | ㅛ | 요 | [jo] | iotizada | — |
| 14 | ㅜ | 우 | [u] | simples | — |
| 15 | ㅝ | 워 | [wʌ] ~ [wə] | ditongo | — |
| 16 | ㅞ | 웨 | [we] | ditongo | em fusão com ㅙ/ㅚ |
| 17 | ㅟ | 위 | [y] ~ [wi] | ditongo/vogal | aceitar ambas |
| 18 | ㅠ | 유 | [ju] | iotizada | — |
| 19 | ㅡ | 으 | [ɯ] | simples | lábios não arredondados |
| 20 | ㅢ | 의 | [ɰi] ~ [i] ~ [e] | ditongo | contexto decide |
| 21 | ㅣ | 이 | [i] | simples | — |

**Decisão pedagógica:** o app não exige produção de IPA nem testa a diferença ㅐ/ㅔ. A avaliação prioriza reconhecimento, leitura e ortografia; a produção é prática com áudio.

**Pendência:** a tabela inteira precisa de revisão de um foneticista ou professor nativo, especialmente ㅓ, ㅡ, ㅚ, ㅙ, ㅞ, ㅟ e ㅢ.

---

## 6. O ㅇ tem dois papéis

1. **Inicial:** marcador de lugar sem som. `아` = [a], `이` = [i], `우` = [u]. Não é “ng” inicial nem “h”.
2. **Final (batchim):** [ŋ], como o “ng” de “sing”. `강` = [kaŋ], `공` = [koŋ].

**Erro comum:** ler `아` como “nga” ou `강` como “gan”. O mesmo símbolo, funções diferentes. O currículo separa os dois momentos (`h02` e `h17`) e usa a posição no bloco para explicar.

**Decisão de nomenclatura:** no app, chamar o inicial de “ㅇ mudo” e o final de “ㅇ de [ŋ]”. Evitar “ㅇ é sempre mudo” e “ㅇ é sempre ng”.

---

## 7. Bloco silábico

### 7.1 Estrutura

Um bloco pode ter:

- **C + V:** `가`, `고`, `과`.
- **C + V + C:** `강`, `국`, `문`.
- **C + V + C duplo:** `닭`, `삶`, `값`.

Não existe bloco sem consoante inicial na escrita. Quando não há som consonantal, usa-se ㅇ.

### 7.2 Formatos

| Formato da vogal | Exemplos | Posição da inicial | Posição da vogal | Batchim |
|---|---|---|---|---|
| vertical (ㅏㅓㅣㅑㅕㅒㅖ) | 가, 너, 지 | esquerda | direita | abaixo |
| horizontal (ㅗㅜㅡㅛㅠ) | 고, 우, 크 | topo | base | abaixo |
| mista (ㅘㅙㅚㅝㅞㅟㅢ) | 과, 귀, 의 | topo-esquerda | ao redor | abaixo |

**Decisão pedagógica:** não ensinar “seis formatos” de uma vez. `h16` mostra três exemplos e pede montagem; a pessoa aprende pela manipulação, não pela tabela.

### 7.3 Ordem de leitura

1. Identificar o bloco.
2. Ler a inicial (ou nada, se ㅇ).
3. Ler a medial.
4. Ler o final, se houver.
5. Juntar sem pausas.

**Cuidado:** a ordem visual não é sempre “esquerda → direita”. Em `고`, a inicial está acima; em `과`, a vogal envolve a inicial. O app deve destacar a posição, não a ordem linear.

### 7.4 Unicode e composição

O Hangul moderno tem **11.172 sílabas teoricamente possíveis** (19 × 21 × 28, incluindo final vazio). A fórmula de composição é:

```
U+AC00 + ((índice_inicial × 21) + índice_medial) × 28 + índice_final
```

O código existente em `src/lib/hangul/index.ts` já implementa `composeSyllable`, `INITIALS`, `MEDIALS` e `FINALS`. A Fase 3B deve **reutilizar** essas listas, não duplicar.

**Jamo de compatibilidade × jamo conjoining:**
- O app usa jamo de compatibilidade (U+3131–U+318E): `ㄱ`, `ㅏ`.
- Jamo conjoining (U+1100–U+11FF) são para composição interna; não devem aparecer no conteúdo avaliado.
- Texto coreano deve ser normalizado em NFC. `가` pode ser escrito como um caractere pré-composto ou como jamo conjoining; só a forma NFC é aceita.

**Pendência:** validar a faixa Unicode e o round-trip com testes automatizados antes de qualquer conteúdo.

---

## 8. Batchim

### 8.1 Definição

Batchim é a consoante final do bloco. Ele **não** é uma sílaba separada e **não** é pronunciado com uma vogal depois. Na fala natural, pode se ligar à sílaba seguinte (ver §9.1).

### 8.2 Os 28 finais escritos

O coreano moderno tem 28 finais: vazio + 16 simples + 11 duplos.

**16 simples:**

| Final | Som | Exemplo |
|---|---|---|
| ㄱ | [k̚] | 국 |
| ㄲ | [k̚] | 밖 |
| ㄴ | [n] | 눈 |
| ㄷ | [t̚] | 곧 |
| ㄹ | [l] | 물 |
| ㅁ | [m] | 밤 |
| ㅂ | [p̚] | 밥 |
| ㅅ | [t̚] | 옷 |
| ㅆ | [t̚] | 있 |
| ㅇ | [ŋ] | 강 |
| ㅈ | [t̚] | 낮 |
| ㅊ | [t̚] | 꽃 |
| ㅋ | [k̚] | 부엌 |
| ㅌ | [t̚] | 밭 |
| ㅍ | [p̚] | 앞 |
| ㅎ | [t̚] | 히읗 (nome da letra) |

**11 duplos:**

| Final | Som isolado | Exemplo | Observação |
|---|---|---|---|
| ㄳ | [k̚] | 몫 | o ㅅ não é pronunciado |
| ㄵ | [n] | 앉다 | o ㅈ não é pronunciado no final |
| ㄶ | [n] | 많다 | o ㅎ não é pronunciado no final |
| ㄺ | [k̚] | 닭 | o ㄹ não é pronunciado no final |
| ㄻ | [m] | 삶 | o ㄹ não é pronunciado no final |
| ㄼ | [l] | 넓다 | o ㅂ não é pronunciado; exceto `밟다` → [p̚] |
| ㄽ | [l] | 곬 | o ㅅ não é pronunciado |
| ㄾ | [l] | 핥다 | o ㅌ não é pronunciado no final |
| ㄿ | [p̚] | 읊다 | o ㄹ não é pronunciado no final |
| ㅀ | [l] | 싫다 | o ㅎ não é pronunciado no final |
| ㅄ | [p̚] | 없다 | o ㅅ não é pronunciado no final |

**Cuidado:** “som isolado” é uma simplificação pedagógica. Em contexto, a escolha do som pode mudar (ex.: `닭` → [tak̚], mas `닭이` → [talɡi]). O currículo ensina o valor isolado em `h20` e trata a variação em leitura assistida.

### 8.3 Os sete sons representativos

| Som | Grafias que o representam | Exemplos |
|---|---|---|
| [k̚] | ㄱ, ㄲ, ㅋ, ㄳ, ㄺ | 국, 밖, 부엌, 몫, 닭 |
| [n] | ㄴ, ㄵ, ㄶ | 눈, 앉다, 많다 |
| [t̚] | ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ | 곧, 옷, 있, 낮, 꽃, 밭, 히읗 |
| [l] | ㄹ, ㄼ, ㄽ, ㄾ, ㅀ | 물, 넓다, 곬, 핥다, 싫다 |
| [m] | ㅁ, ㄻ | 밤, 삶 |
| [p̚] | ㅂ, ㅍ, ㄿ, ㅄ | 밥, 앞, 읊다, 없다 |
| [ŋ] | ㅇ | 강 |

**Decisão pedagógica:** ensinar os sete sons como “famílias” reduz a carga de 28 para 7. A pessoa ainda precisa reconhecer a grafia, mas não precisa decorar 28 pronúncias independentes.

### 8.4 Oclusivas não soltas

[k̚], [t̚] e [p̚] são **unreleased**: a boca fecha, mas o ar não sai. Em português, consoantes finais geralmente são soltas ou vocalizadas; por isso o brasileiro tende a dizer “guki”, “babi”, “ipe”. O app deve:

- mostrar a boca fechada e o som curto;
- pedir “segure o som e pare”;
- nunca usar áudio com vogal epentética;
- comparar `국` com `구` (sem final) e `국이` (com ligação, em `h21`).

### 8.5 Batchim duplo: regra de sobrevivência

Em geral, sobrevive **um** dos dois componentes:

- ㄳ → ㄱ; ㄵ → ㄴ; ㄶ → ㄴ; ㄺ → ㄱ; ㄻ → ㅁ; ㄼ → ㄹ; ㄽ → ㄹ; ㄾ → ㄹ; ㄿ → ㅂ; ㅀ → ㄹ; ㅄ → ㅂ.
- Exceção: `밟다` → [p̚], não [l].
- Em contexto de ligação, o segundo componente pode se mover para a sílaba seguinte: `읽어요` → [ilɡʌjo], `앉아요` → [andʑajo].

**Não ensinar a regra completa de escolha contextual em 3A.** O aluno aprende o valor isolado e alguns exemplos; a regra contextual entra em uma fase posterior ou em leitura assistida.

---

## 9. Fenômenos de fronteira

### 9.1 Ligação (연음)

Quando uma sílaba termina em batchim e a seguinte começa com ㅇ mudo, o batchim passa a ser o início da sílaba seguinte:

| Escrita | Pronúncia | Observação |
|---|---|---|
| 한국어 | 한구거 | ㄱ → inicial de 어 |
| 음악 | 으막 | ㄱ → inicial de 악 |
| 밥을 | 바블 | ㅂ → inicial de 을 |
| 옷을 | 오슬 | ㅅ → [s] inicial |
| 꽃이 | 꼬치 | ㅊ → [tɕʰ] inicial |
| 좋아요 | 조아요 | ㅎ cai |
| 읽어요 | 일거요 | ㄺ: ㄹ se move |
| 앉아요 | 안자요 | ㄵ: ㄴ se move |

**Exceções e cuidados:**
- ㅇ final não se move: `강아지` = [kaŋadʑi].
- Se a sílaba seguinte tem consoante inicial, não há ligação: `한국말` não vira “한구말”.
- A escrita nunca muda.
- Em `좋아요`, o ㅎ cai; em outros contextos, pode haver aspiração (ver §9.3).

### 9.2 Nasalização

Antes de ㄴ ou ㅁ, os finais oclusivos assimilam:

| Final | Vira | Exemplo |
|---|---|---|
| ㄱ | ㅇ | 한국말 → 한궁말 |
| ㄷ | ㄴ | 받는다 → 반는다 |
| ㅂ | ㅁ | 입니다 → 임니다 |

Outros exemplos: `학년` → 항년; `국물` → 궁물; `십만` → 심만; `먹는다` → 멍는다; `잡는` → 잠는.

**Cuidado:** não nasalizar antes de vogal. `입이` → 이비 (ligação), não “임이”.

### 9.3 Aspiração

Quando ㄱ/ㄷ/ㅂ/ㅈ encontram ㅎ, o resultado é a aspirada correspondente:

| Encontro | Resultado | Exemplo |
|---|---|---|
| ㄱ + ㅎ | ㅋ | 축하 → 추카 |
| ㄷ + ㅎ | ㅌ | 좋다 → 조타 |
| ㅂ + ㅎ | ㅍ | 입학 → 이팍 |
| ㅈ + ㅎ | ㅊ | 맞히다 → 마치다 |

Outros exemplos: `백화점` → 배콰점; `국화` → 구콰.

**Cuidado:** ㅎ depois de ㄴ/ㅁ/ㅇ frequentemente enfraquece ou cai (`전화` ~ [tɕʌnwa]). Não generalizar a regra para todos os ㅎ.

### 9.4 Fenômenos não ensinados em 3A

Existem, mas ficam para depois:

- **Tensificação:** `학교` → [hak̚k͈jo], `먹다` → [mʌk̚t̚a].
- **Lateralização:** `신라` → [silla], `연락` → [jʌllak].
- **Palatalização:** `같이` → [k͈atɕʰi], `굳이` → [kudʑi].
- **Queda de ㅎ** em contextos complexos.
- **Variação de ㅢ** em partículas e nomes.

**Decisão:** o app pode tocar o áudio correto dessas palavras, mas não deve cobrar a regra. Se um exemplo exigir tensificação, marcar como `sound-only` e avaliar apenas o alvo da lição.

---

## 10. Notas de ensino por letra

A tabela resume o que enfatizar. A sequência completa está em `curriculum.md`.

| Jamo | Lição | Ênfase | Erro previsível |
|---|---|---|---|
| ㅇ (inicial) | `h02` | mudo | “nga”, “ha” |
| ㅏ | `h02` | “a” aberto | — |
| ㅓ | `h02` | não arredondar; não é “ó” | “ó” |
| ㅗ | `h02` | arredondar | “ô” fechado demais? aceitável |
| ㅜ | `h02` | “u” curto | “u” longo |
| ㅡ | `h03` | lábios esticados | “u” |
| ㅣ | `h03` | “i” | — |
| ㄱ | `h04` | [k] inicial, [ɡ] entre vogais | “g” forte sempre |
| ㄴ | `h04` | [n] | nasalizar demais |
| ㄷ | `h05` | [t]/[d], sem “dj” antes de ㅣ | “dji” |
| ㄹ | `h05` | tepe inicial | “rr” |
| ㅁ | `h05` | [m] | — |
| ㅂ | `h06` | [p]/[b] | “b” explosivo |
| ㅅ | `h06` | [s], nunca [z] entre vogais | “z” |
| ㅈ | `h06` | [tɕ]/[dʑ], não “j” | “j” de janela |
| ㅋ | `h07` | aspiração | “k” simples |
| ㅌ | `h07` | aspiração | “t” simples |
| ㅍ | `h07` | aspiração | “p” simples |
| ㅊ | `h07` | africada aspirada | “ch” de chave |
| ㅎ | `h08` | [h] suave | “rr” |
| ㄲ | `h09` | tensão, sem ar | “k” |
| ㄸ | `h09` | tensão, sem ar | “t” |
| ㅃ | `h09` | tensão, sem ar | “p” |
| ㅆ | `h10` | [s͈] | [z] ou “ss” longo |
| ㅉ | `h10` | [t͈ɕ] | “dj” |
| ㅑㅕㅛㅠ | `h11` | glide curto | “ia/ie/io/iu” |
| ㅐㅔ | `h12` | fusão; ortografia distinta | exigir “é/ê” |
| ㅒㅖ | `h12` | [je] | “ie” |
| ㅘㅝ | `h13` | [wa]/[wʌ] | duas sílabas |
| ㅟ | `h13` | [y]~[wi] | “ui” |
| ㅙㅞㅚ | `h14` | [we] | separar “ho-e” |
| ㅢ | `h15` | [ɰi]/[i]/[e] | “ui” sempre |
| batchim ㅇ | `h17` | [ŋ] | [n] |
| batchim ㄴ/ㅁ | `h17` | [n]/[m] | vogal epentética |
| batchim ㄱ/ㄷ/ㅂ | `h18` | não solto | “guki/babi/ipe” |
| batchim ㄹ | `h19` | [l] | [w] |
| duplos | `h20` | um sobrevive | pronunciar os dois |

**Pendência:** todas as linhas com IPA ou comparação com português precisam de revisão nativa. A tabela é um roteiro de autoria, não texto final para o aluno.

---

## 11. Originalidade e limites

- Todos os exemplos e explicações foram criados para este projeto. Não há cópia de diálogos, listas de vocabulário, ilustrações ou exercícios de terceiros.
- Palavras isoladas da língua coreana não são protegidas por direitos autorais; a seleção e a explicação são originais.
- Nenhuma imagem de livro, curso ou aplicativo deve ser usada sem licença.
- Se um exemplo coincidir com material de terceiros, é coincidência de língua, não citação. Ainda assim, registrar a fonte de qualquer definição copiada.

---

## 12. Referências

- National Institute of Korean Language (NIKL). *The Principles of Hunminjeongeum*.  
  https://www.korean.go.kr/eng_hangeul/principle/001.html  
  https://www.korean.go.kr/eng_hangeul/principle/002.html  
  https://www.korean.go.kr/eng_hangeul/principle/003.html
- National Institute of Korean Language. *Korean Orthography and Pronunciation Rules*.  
  https://www.korean.go.kr/front/page/pageView.do?page_id=P000102&mn_id=95
- UNESCO. *Hunminjeongum Manuscript*.  
  https://www.unesco.org/en/memory-world/hunminjeongum-manuscript
- King Sejong Institute. *Currículo de coreano*.  
  https://www.iksi.or.kr/lms/main/main.do
- Shin, J., Kiaer, J., & Cha, J. (2013). *The Sounds of Korean*. Cambridge University Press.

**Nota:** as referências acima foram consultadas para princípios gerais; nenhuma frase foi traduzida ou copiada para o app. A revisão especializada deve confirmar cada tabela antes de o conteúdo sair de `in-review`.