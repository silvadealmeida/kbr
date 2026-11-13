# C2 — correções linguísticas e de coerência (Fase 14)

**Escopo:** `c2-l26`, `c2-l27`, `c2-l28`, `c2-l29`, `c2-c06` e o vocabulário de `c2-m06`.  
**Natureza:** correção editorial assistida por IA, com teste de regressão. **Não é revisão nativa.**

## 1. `폐항` não rege `노선`

**Achado:** C2R-113. `폐항` significa o fechamento/desativação de um **porto**, não o fim de uma linha de transporte. As frases `마지막 정기 노선이 폐항되었다` e `정기 여객선 노선이 폐항되었고` misturavam o sujeito (linha) com o predicado (fechamento do porto).

**Correção:**

- linhas passaram a usar `운항이 중단되다` / `폐지되다`;
- o porto passou a ser o sujeito de `폐항하다` (`북포항은 사실상 폐항하였다`);
- o exemplo de escuta passou a `북포항이 폐항한 이후 여객선은 다시 다니지 않는다.`;
- a glosa de `폐항` no vocabulário passou de “fechamento de porto; desativação de rota portuária” para “fechamento de porto; encerramento das operações de um porto”;
- o exemplo de vocabulário passou a `북포항은 1998년에 폐항하였다.`

O termo cultural `폐항` continua na lista de revisão nativa (enquadramento histórico e escolha lexical), mas a colocação gramatical está corrigida.

## 2. Quantos bilhetes existem no conto?

**Achado:** a coerência entre `c2-l26` e `c2-l27` era ambígua. Em c2-l26, Jeongho empurrava **um** bilhete, Myeongju o amassava e, no fim, **outro** bilhete aparecia no balcão; o narrador especulava que ela tinha dois. Em c2-l27, Jeongho entregava **dois** bilhetes (um antigo e um novo), Myeongju recebia os dois e a gaveta ainda guardava “mais um” bilhete do dia, o que sugeria um terceiro.

**Correção canônica:** existem **dois** bilhetes.

1. Jeongho entrega o bilhete antigo (sem data, guardado por quinze anos) e o bilhete novo do dia.
2. Myeongju recebe os dois, amassa **apenas o novo** e o joga no lixo.
3. O bilhete antigo fica no balcão; Jeongho o recolhe e o guarda na gaveta.
4. O narrador não sabe qual dos dois era “o verdadeiro”; a ambiguidade permanece, mas a contagem fecha.

Foram ajustados:

- o texto-âncora de `c2-l26` e sua tradução;
- a pergunta guiada e a explicação;
- o exemplo gramatical de `-ㄴ/는 듯`;
- o texto-âncora de `c2-l27` e sua tradução;
- o trecho correspondente em `c2-c06`;
- a resposta de leitura do checkpoint.

## 3. Testes de regressão

`tests/content/c2-curriculum.test.ts` verifica:

- nenhum texto C2 usa `노선이 폐항...`;
- o texto contém `운항이 중단` e `북포항은 사실상 폐항하였다`;
- c2-l26 contém `표 두 장을 밀어냈다` e `새 표만 구겨서`;
- c2-l26 não contém a antiga especulação `두 장을 가지고 있었던`;
- c2-l27 contém `오래된 승선권이 남아 있었다` e não contém `한 장 더`.

## 4. O que continua pendente

- Revisão nativa da focalização, da ironia e da naturalidade das falas.
- Revisão editorial da tradução portuguesa do conto.
- A decisão sobre quanto da ambiguidade deve ser explicada ao aluno; a Fase 14 apenas removeu a contradição factual.
