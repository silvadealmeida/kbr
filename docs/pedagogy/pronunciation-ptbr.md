# Pronúncia coreana para brasileiros

**Status:** `in-review`. Todas as comparações com o português são aproximações pedagógicas, não equivalências fonéticas.
**Objetivo:** orientar autoria de áudio, feedback e exercícios de contraste para quem fala português brasileiro.
**Escopo:** sons do coreano padrão de Seoul, em registro neutro. Não cobre sotaques regionais, fala rápida extrema ou canto.

---

## 1. Advertência inicial

Não existe “som brasileiro” que substitua um som coreano sem perda. O português brasileiro (PB) tem um inventário diferente, e o ouvido adulto tende a encaixar o som novo na categoria mais próxima da língua materna. Este documento usa esse fato como **hipótese de design**, não como resultado de teste com usuários do KBR.

Regras de ouro:

1. **Nunca** apresentar uma aproximação como “é igual”.
2. **Nunca** avaliar produção oral por microfone no MVP.
3. **Sempre** oferecer áudio modelo e uma descrição articulatória curta.
4. **Sempre** marcar o conteúdo como `in-review` até revisão humana.
5. **Nunca** usar a romanização revisada (RR) como pronúncia ou resposta após `h15`.

---

## 2. Notação

- `/.../` = fonema; `[...]` = realização fonética.
- `∅` = ausência de som.
- `~` = variação aceita.
- `ˈ` = acento primário (usado só para explicar ritmo, não para ensinar regra).
- IPA é usado em documentação interna; o aluno vê descrições em pt-BR e ouve áudio.

**Convenção do projeto:** quando houver mais de uma pronúncia aceita, o app aceita todas as formas documentadas e não pune a variante do aluno.

---

## 3. O sistema do português brasileiro em contraste

O PB tem, aproximadamente:

- **Vogais orais:** /a, e, ɛ, i, o, ɔ, u/.
- **Vogais nasais:** /ɐ̃, ẽ, ĩ, õ, ũ/.
- **Consoantes:** /p, b, t, d, k, ɡ, f, v, s, z, ʃ, ʒ, m, n, ɲ, l, ʎ, ɾ, ʁ, h/ (varia por dialeto).
- **Consoantes em coda:** limitadas a /s, r, l/ e nasais, com realizações variáveis por dialeto.

O coreano tem:

- **Vogais:** /a, ʌ, o, u, ɯ, i, ɛ, e/ + glides.
- **Consoantes:** séries de três vias para oclusivas e africadas (simples, aspirada, tensa).
- **Codas:** consoantes finais não soltas, com apenas 7 sons representativos.
- **Sem acento lexical forte** como o PB; a duração vocálica não é o principal marcador de sentido.

### 3.1 Cinco interferências centrais

| Interferência | O que o brasileiro tende a fazer | O que o coreano faz |
|---|---|---|
| Palatalização de /t, d/ antes de /i/ | “tia” [tʃiɐ], “dia” [dʒiɐ] | 디 [ti]/[di], 티 [tʰi], sem “tch/dj” |
| Vocalização de /l/ final | “Brasil” [bɾaziʊ] | 물 [mul], com [l] alveolar |
| Epêntese depois de coda | “guki”, “babi”, “ipe” | 국 [kuk̚], 밥 [pap̚], 입 [ip̚] |
| ㅓ como “ó” | “ó” arredondado | ㅓ [ʌ] não arredondado |
| ㅡ como “u” | “u” arredondado | ㅡ [ɯ] não arredondado |

Essas tendências são previsíveis, mas não universais. O app deve testar com usuários e ajustar os distratores.

---

## 4. Vogais

### 4.1 Tabela de referência

| Jamo | IPA | Aproximação para o aluno | O que evitar | Revisão |
|---|---|---|---|---|
| ㅏ | [a] | “a” de “casa” | “ã” nasalizado | baixa |
| ㅓ | [ʌ] ~ [ə] | “ó” sem arredondar os lábios, língua recuada | “ó” de “avó”; “é” | alta |
| ㅗ | [o] | “ô” de “avô” | “ó” aberto | baixa |
| ㅜ | [u] | “u” de “uva”, curto | “u” longo; “ü” | baixa |
| ㅡ | [ɯ] | “i” com a língua recuada e lábios esticados | “u”; “i” comum | alta |
| ㅣ | [i] | “i” de “ilha” | “i” nasalizado | baixa |
| ㅐ | [ɛ] ~ [e] | “é” de “pé” | “ai” | alta |
| ㅔ | [e] ~ [ɛ] | “ê” de “você” | “ei” | alta |
| ㅑ | [ja] | “ia” curto, uma sílaba | “i-a” com pausa | média |
| ㅕ | [jʌ] | “i” + ㅓ, uma sílaba | “i-ó” | alta |
| ㅛ | [jo] | “io” curto, uma sílaba | “i-o” | média |
| ㅠ | [ju] | “iu” curto, uma sílaba | “i-u” | média |
| ㅒ | [jɛ] ~ [je] | “i” + “é”, uma sílaba | “iai” | alta |
| ㅖ | [je] ~ [e] | “i” + “ê”, uma sílaba | “iei” | alta |
| ㅘ | [wa] | “ua” de “quase”, sem o “q” | “u-a” | média |
| ㅝ | [wʌ] | “u” + ㅓ, uma sílaba | “u-ô” | alta |
| ㅙ | [wɛ] ~ [we] | “u” + “é/ê”, uma sílaba | “u-ai” | alta |
| ㅞ | [we] | “u” + “ê”, uma sílaba | “u-ei” | alta |
| ㅚ | [ø] ~ [we] | “u” + “ê” com lábios arredondados | “oi” | alta |
| ㅟ | [y] ~ [wi] | “u” francês ou “ui” de “cuíca” | “u-i” separado | alta |
| ㅢ | [ɰi] ~ [i] ~ [e] | “i” com a língua recuada; contexto decide | “ui” sempre | alta |

### 4.2 Notas por grupo

**ㅓ não é “ó”.** O “ó” português é arredondado ([ɔ]); o ㅓ coreano não é. A língua fica mais recuada e a boca mais relaxada. Para o brasileiro, a pista útil é: “diga ‘ó’ e depois retire o arredondamento dos lábios, mantendo a língua atrás”.

**ㅡ não é “u”.** O “u” português é arredondado ([u]); o ㅡ é não arredondado ([ɯ]). A pista: “sorria com os lábios esticados e diga ‘u’ sem arredondar”. O resultado ainda não é perfeito, mas evita a fusão com ㅜ.

**ㅐ/ㅔ.** A distinção está em fusão em Seoul. Ensinar a diferença **gráfica** e aceitar as duas pronúncias. Não usar “ㅐ é aberto, ㅔ é fechado” como regra absoluta.

**ㅚ/ㅙ/ㅞ.** Também em fusão para [we]. A ortografia diferencia; a fala moderna, muitas vezes não. Não exigir [ø] se o aluno diz [we].

**ㅟ.** Aceitar [y] e [wi]. O [y] é o “u” francês de “tu”; o [wi] é o “ui” de “cuíca”. Não separar em duas sílabas.

**ㅢ.** O som inicial é [ɰi], uma vogal alta central não arredondada seguida de [i]. Depois de consoante, pode ser [i]; como partícula possessiva, [e]. O app deve aceitar as variantes e ensinar a mais comum no contexto.

**Vogais nasais do PB.** O português nasaliza vogais antes de consoante nasal (“campo” [kɐ̃pu]). O coreano não nasaliza a vogal em `강`; ele produz [a] oral + [ŋ] final. Evitar “kãg”.

**Redução de vogais átonas.** O PB reduz “e” para [i] e “o” para [u] em sílabas átonas (“menino” [mininu]). O coreano não reduz dessa forma. Não ensinar “어” como “i” porque ela é átona.

---

## 5. Consoantes

### 5.1 Tabela de referência

| Jamo | IPA inicial | IPA entre vogais | Aproximação | O que evitar |
|---|---|---|---|---|
| ㄱ | [k] | [ɡ] | “k” leve; “g” entre vogais | “g” explosivo sempre |
| ㄲ | [k͈] | [k͈] | “k” tenso, sem sopro | “k” simples |
| ㅋ | [kʰ] | [kʰ] | “k” com sopro forte | “k” simples |
| ㄷ | [t] | [d] | “t” leve; “d” entre vogais | “tch” antes de ㅣ |
| ㄸ | [t͈] | [t͈] | “t” tenso, sem sopro | “t” simples |
| ㅌ | [tʰ] | [tʰ] | “t” com sopro | “tch” antes de ㅣ |
| ㅂ | [p] | [b] | “p” leve; “b” entre vogais | “b” explosivo sempre |
| ㅃ | [p͈] | [p͈] | “p” tenso, sem sopro | “p” simples |
| ㅍ | [pʰ] | [pʰ] | “p” com sopro | “p” simples |
| ㅅ | [s] | [s] | “ss” sempre | [z] entre vogais |
| ㅆ | [s͈] | [s͈] | “ss” tenso | [z]; “ss” longo |
| ㅈ | [tɕ] | [dʑ] | “tch” curto; “dj” entre vogais | “j” de “janela” |
| ㅉ | [t͈ɕ] | [t͈ɕ] | “tch” tenso | “dj” |
| ㅊ | [tɕʰ] | [tɕʰ] | “tch” com sopro | “ch” de “chave” |
| ㄴ | [n] | [n] | “n” de “nada” | “nh” |
| ㅁ | [m] | [m] | “m” de “mão” | — |
| ㄹ | [ɾ] | [ɾ] | “r” de “caro” | “rr” de “carro” |
| ㅎ | [h] | [ɦ] ~ ∅ | sopro leve | “rr” de “rato” |
| ㅇ | ∅ | ∅ | mudo no início | “ng” inicial |

### 5.2 Notas por grupo

**Oclusivas simples (ㄱ, ㄷ, ㅂ).** Em início de palavra, são surdas e levemente aspiradas; entre vogais, sonorizam. O PB tem /k, t, p/ surdos e /ɡ, d, b/ vozeados, mas a distribuição não é igual. O aluno deve aprender que o mesmo jamo muda de som conforme a posição.

**Oclusivas aspiradas (ㅋ, ㅌ, ㅍ).** A aspiração é um traço que muda o sentido. O PB usa aspiração de forma não distintiva; o brasileiro precisa exagerar o sopro e depois reduzir. Não confundir com tensão.

**Oclusivas tensas (ㄲ, ㄸ, ㅃ).** Produzidas com tensão muscular, glote fechada e sem sopro. A sensação é de som “seco” e mais agudo. Não são “consoantes dobradas” nem “versões fortes” das simples.

**Africadas (ㅈ, ㅉ, ㅊ).** O PB tem [tʃ] e [dʒ] em “tia” e “dia”, mas eles são alofones de /t, d/ antes de /i/, não fonemas. O coreano usa africadas em qualquer contexto. O ㅈ não é o “j” [ʒ] de “janela”; é uma africada com componente oclusivo. O ㅊ não é o “ch” [ʃ] de “chave”; é aspirado.

**ㅅ.** Sempre [s] ou [ɕ], nunca [z]. O PB sonoriza o “s” entre vogais (“casa” [kaza]); o coreano não. `사자` não é “saza”.

**ㅆ.** Tensa, não longa. Não é [z] nem “ss” sustentado. A duração não é o traço principal; a tensão é.

**ㅎ.** Sopro leve, sem vibração. O “rr” carioca [h] é próximo, mas mais forte e muitas vezes com fricção; o “h” inglês é uma referência melhor. Não usar a garganta nem a úvula.

**ㄴ.** Alveolar, como “n” de “nada”. Antes de ㅣ, não vira “nh” [ɲ]. `니` é [ni], não “nhi”.

**ㄹ inicial.** Tepe alveolar, como o “r” simples de “caro”, “prato” (em algumas pronúncias), “amarelo”. Não é o “rr” de “carro”, nem o “l” de “lua”, nem o “r” retroflexo de interior.

**ㄹ final.** [l] alveolar, como o “l” de “lua”, mas sem vogal depois. O “l” final do PB é vocalizado para [w] em grande parte do Brasil (“Brasil” [bɾaziʊ]); isso é um erro previsível em `물` (“muw”). O app deve comparar `물` com `무`.

**ㅇ.** Inicial mudo; final [ŋ]. O erro é ler o inicial como “ng” ou o final como “n”. O app deve mostrar a posição no bloco e usar pares como `아/앙`, `안/앙`.

---

## 6. O contraste de três vias

O coreano distingue:

- **Simples (lenis):** ㄱ, ㄷ, ㅂ, ㅈ, ㅅ.
- **Aspirada:** ㅋ, ㅌ, ㅍ, ㅊ (ㅅ não tem aspirada).
- **Tensa:** ㄲ, ㄸ, ㅃ, ㅉ, ㅆ.

### 6.1 Como descrever sem jargão

- **Simples:** som “leve”, sem muita força.
- **Aspirada:** som “com sopro”.
- **Tensa:** som “apertado”, sem sopro.

Evitar “forte/fraca”, porque o aluno pode confundir intensidade com aspiração. Usar “sopro” e “tensão”.

### 6.2 Ordem de prática

1. Percepção: ouvir os três e apontar qual é qual.
2. Discriminação: pares mínimos com a mesma vogal.
3. Produção: repetir depois do áudio, com autocorreção.
4. Uso: ler palavra real com o contraste.

**Não** começar pela produção antes de a pessoa discriminar. Se ela não ouve a diferença, não consegue corrigir.

### 6.3 Pares mínimos úteis

| Contraste | Par | Observação |
|---|---|---|
| ㄱ/ㅋ/ㄲ | 가/카/까 | sílabas sem sentido lexical; use áudio |
| ㄷ/ㅌ/ㄸ | 다/타/따 | idem |
| ㅂ/ㅍ/ㅃ | 바/파/빠 | idem |
| ㅈ/ㅊ/ㅉ | 자/차/짜 | idem |
| ㅅ/ㅆ | 사/싸 | idem |
| ㄱ/ㄲ | 고기/꼬기? | `꼬기` não é palavra comum; usar sílabas |

**Cuidado:** pares de sílabas isoladas são artificiais. O aluno pode achar que “까” é uma palavra. O app deve dizer “sílaba de treino” e usar palavras reais quando possível.

---

## 7. Batchim e consoantes finais

### 7.1 O que o PB faz

- O PB tem poucas consoantes em coda: /s, r, l, n/ e nasais.
- O /l/ final é vocalizado em muitas regiões: “Brasil” [bɾaziʊ].
- O /r/ final pode ser [h], [ɾ] ou cair.
- O PB insere vogal epentética em empréstimos com coda complexa: “pizza” → [pitsa], “rock” → [ʁɔki].

### 7.2 O que o coreano faz

- Batchim é uma consoante final **não solta** ou um nasal/lateral.
- Só 7 sons representativos: [k̚], [n], [t̚], [l], [m], [p̚], [ŋ].
- Não se adiciona vogal: `국` é [kuk̚], não “guki”.
- O batchim pode se ligar à sílaba seguinte se ela começar com ㅇ.

### 7.3 Erros previsíveis

| Escrita | Erro do brasileiro | Correção |
|---|---|---|
| 국 | “guki” | feche a boca no [k] e pare |
| 밥 | “babi” | feche os lábios no [p] e pare |
| 입 | “ipe” | idem |
| 물 | “muw” | língua no alvéolo, [l] |
| 강 | “gan” | [ŋ] no final, sem [n] |
| 안 | “ã” | vogal oral + [n] |
| 꽃 | “kkochi” | [t̚] final, sem vogal |
| 닭 | “daluki” | [t̚] final; não pronunciar ㄹ |

### 7.4 Como ensinar

1. Mostrar a boca fechada e o som curto.
2. Pedir para “segurar e parar”, sem soltar ar.
3. Comparar com a sílaba sem batchim (`구` vs `국`).
4. Comparar com a sílaba com ligação (`국이`), mas só depois de `h21`.
5. Usar áudio humano, não TTS, se possível.

**Não** usar “consoante muda” como sinônimo de batchim. Ela não é muda; é não solta.

---

## 8. Ligações, nasalização e aspiração

### 8.1 Ligação

O brasileiro já faz algo parecido ao falar rápido: “minha amiga” pode soar “mi-nha-mi-ga”. Mas o coreano é sistemático: o batchim passa para a sílaba seguinte.

Cuidados:
- Não ligar quando a sílaba seguinte tem consoante inicial.
- Não ligar ㅇ final.
- Não mudar a escrita.
- `좋아요` perde o ㅎ; não é “jo-ha-yo”.

### 8.2 Nasalização

O PB nasaliza vogais antes de consoante nasal; o coreano assimila o **final**, não a vogal. `입니다` é [imnida], com [m] final, não “ĩpida”.

Cuidados:
- Não nasalizar antes de vogal.
- Não aplicar a regra antes de aprender ligação.
- Não ensinar ㄹ → ㄴ nesta fase.

### 8.3 Aspiração

O PB tem aspiração alofônica; o coreano tem aspiração fonêmica. `좋다` → [tɕotʰa] tem um [tʰ] que o brasileiro pode não produzir.

Cuidados:
- Não confundir com tensificação.
- Não aplicar a regra a todo ㅎ.
- `전화` pode soar [tɕʌnwa]; não é “jeon-hwa” com [h] forte.

---

## 9. Ritmo, acento e entonação

- O coreano não tem acento lexical forte como o PB. Não ensinar “sílaba tônica” para cada palavra.
- A duração vocálica não é o principal marcador de sentido no coreano moderno de Seoul. Não alongar vogais para “marcar acento”.
- O PB alonga a sílaba tônica e reduz as átonas; o coreano mantém as sílabas mais equilibradas.
- A entonação frasal expressa perguntas, surpresa e foco; não é o foco do módulo 3A.
- Falar devagar é melhor que falar com “sotaque de leitura” artificial.

**Decisão:** o app não ensina prosódia avançada nesta fase. Áudios modelo são frases curtas e naturais, não robotizadas.

---

## 10. Romanização: por que ela engana

A Romanização Revisada (RR) é oficial na Coreia do Sul, mas foi feita para quem lê inglês. Para brasileiros, ela cria erros:

| RR | Aluno brasileiro tende a ler | Coreano |
|---|---|---|
| eo (어) | “éo” | [ʌ] |
| eu (으) | “eu” | [ɯ] |
| ae (ㅐ) | “a-e” | [ɛ]/[e] |
| oe (ㅚ) | “o-e” | [ø]/[we] |
| ui (ㅢ) | “u-i” | [ɰi]/[i]/[e] |
| g (ㄱ) | “g” de gato | [k]/[ɡ] |
| d (ㄷ) | “d” de dado | [t]/[d] |
| b (ㅂ) | “b” de bola | [p]/[b] |
| j (ㅈ) | “j” de janela | [tɕ]/[dʑ] |
| ch (ㅊ) | “ch” de chave | [tɕʰ] |
| r/l (ㄹ) | “r” ou “l” do PB | [ɾ] ou [l] |
| ng (ㅇ final) | “ng” de inglês | [ŋ] |

**Decisão do currículo:** RR aparece só como apoio temporário até `h15`, nunca como resposta correta. Depois de `h15`, o app usa IPA interno, áudio e descrição em pt-BR.

**Não usar** a romanização McCune-Reischauer com apóstrofos; ela é ainda mais confusa para leigos.

---

## 11. Tabela de aproximações para a interface

Se o app precisar de uma pista textual (por exemplo, em um tooltip), usar a coluna “pista” com cautela:

| Jamo | Pista curta | Aviso |
|---|---|---|
| ㅓ | “ó” sem arredondar | não é “ó” |
| ㅡ | “u” com lábios esticados | não é “u” |
| ㄹ inicial | “r” de “caro” | não é “rr” |
| ㄹ final | “l” de “lua” | não é “u” |
| ㅎ | sopro leve | não é “rr” |
| ㅈ | “tch” curto | não é “j” |
| ㅊ | “tch” com sopro | não é “ch” |
| ㅅ | “ss” | nunca “z” |
| batchim ㄱ | “k” sem soltar | não é “ki” |
| batchim ㅂ | “p” sem soltar | não é “pi” |

**Regra:** a pista nunca substitui o áudio; ela só ajuda a lembrar. Se a pista criar mais confusão, remover.

---

## 12. Limites do TTS

TTS coreano pode:

- pronunciar batchim com vogal epentética;
- errar ㅓ/ㅡ;
- não distinguir tensas;
- aplicar regras de sandhi de forma inconsistente;
- ler empréstimos com sotaque;
- ter voz robotizada ou de outro dialeto.

**Política:**
- Áudio TTS é “modelo aproximado”, não “pronúncia correta”.
- Itens avaliados devem usar gravação humana sempre que possível.
- Se o TTS errar um item, o item é removido ou marcado `audio-review`.
- O aluno pode reportar áudio ruim; o relatório entra na fila de revisão.
- Não usar TTS para avaliar produção.

---

## 13. Roteiro de gravação (para revisão humana)

Se houver gravação com falante nativo, pedir:

1. Lista de jamo isolados: ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ.
2. Vogais isoladas: ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ ㅐ ㅔ ㅑ ㅕ ㅛ ㅠ ㅒ ㅖ ㅘ ㅝ ㅟ ㅙ ㅞ ㅚ ㅢ.
3. Sílabas CV: 가 고 과 귀 의 와 워 외 왜.
4. Batchim: 국 밥 곧 입 책 꽃 앞 밖 부엌 낮.
5. Duplos: 닭 삶 값 없다 많다 앉다 핥다 싫다 밟다 젊다 넓다 읊다.
6. Regras: 한국어 음악 밥을 옷을 꽃이 좋아요 읽어요 앉아요; 입니다 학년 국물 십만; 좋다 축하 입학 백화점 국화.
7. Frases de `h24`: 안녕하세요? 감사합니다. 저는 학생입니다.

**Especificações:** ritmo natural, sem exagero didático; duas versões (lenta e normal); silêncio de fundo; mesma voz para todos os itens; identificar variedade regional e idade do falante.

---

## 14. Pontos que exigem revisão especializada

| Ponto | Risco | Prioridade |
|---|---|---|
| ㅓ e ㅡ | fusão com “ó”/“u”; alta interferência | alta |
| ㅐ/ㅔ, ㅒ/ㅖ | fusão variável | alta |
| ㅚ/ㅙ/ㅞ, ㅟ, ㅢ | múltiplas realizações | alta |
| ㄹ inicial/final | alofonia e vocalização | alta |
| ㅎ e aspiração | queda e fricção | alta |
| ㅅ antes de ㅣ/ㅑ/ㅕ/ㅛ/ㅠ | palatalização | média |
| ㅈ/ㅊ/ㅉ | africadas e aspiração | alta |
| Batchim duplo | exceções e contexto | alta |
| Ligações e nasalização | naturalidade e transcrição | alta |
| Empréstimos | pronúncia real | média |
| Prosódia | ritmo e entonação | média |
| Descrições articulatórias | precisão e clareza | alta |

**Critério de aprovação:** um falante nativo com formação em ensino de coreano (ou fonética) revisa os itens, grava ou valida o áudio e assina o status. Sem isso, o conteúdo permanece `in-review`.

---

## 15. Sequência de prática para brasileiros

1. **Ouvir sem ler:** o aluno ouve o som e escolhe entre duas opções.
2. **Ouvir com pista:** vê a boca/descrição e ouve de novo.
3. **Discriminar:** pares mínimos, com feedback imediato.
4. **Produzir:** repete depois do áudio; sem avaliação automática.
5. **Ler:** aplica o som em sílaba e palavra.
6. **Revisar:** cartão SRS com áudio e contraste.

**Não** corrigir tudo de uma vez. Escolher um traço por vez: primeiro ㅓ/ㅗ, depois ㅡ/ㅜ, depois aspiração/tensão. A sobrecarga de correções aumenta a ansiedade e não melhora a percepção.

---

## 16. Referências

- Shin, J., Kiaer, J., & Cha, J. (2013). *The Sounds of Korean*. Cambridge University Press.
- National Institute of Korean Language. *Korean Orthography and Pronunciation Rules*.  
  https://www.korean.go.kr/front/page/pageView.do?page_id=P000102&mn_id=95
- National Institute of Korean Language. *The Principles of Hunminjeongeum*.  
  https://www.korean.go.kr/eng_hangeul/principle/001.html
- Câmara Jr., J. M. (1970). *Estrutura da língua portuguesa*. Vozes. (referência clássica de fonologia do PB; não copiada)
- Seara, I. C., Nunes, V. G., & Lazzarotto-Volcão, C. (2011). *Fonética e fonologia do português brasileiro*. (referência de apoio; conferir edição)

**Nota:** as referências de PB são para descrição geral; o projeto não fez medição acústica nem teste de percepção com brasileiros. As afirmações sobre interferência são hipóteses pedagógicas a validar.