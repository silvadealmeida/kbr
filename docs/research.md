# KBR — Pesquisa

## 1. Método e limitações
- **REA (Reverse Engineer Anything)**: skill instalada, mas seu servidor MCP/ferramentas **não estão conectados** nesta sessão, e REA é voltado a binários/pacotes/captura de runtime. Não foi configurado (exigiria alterar config do cliente, sem aprovação).
- **Navegador (Playwright MCP)**: indisponível (Chrome não instalado em `/opt/google/chrome`). **Nenhuma inspeção direta da interface do Lingvist foi feita.**
- Fonte efetivamente usada: busca web (FAQ pública do Lingvist + resenhas de terceiros) e conhecimento geral dos produtos. Alegações de marketing/terceiros não verificadas estão marcadas como tal.
- **Fluxo de pesquisa recomendado para depois** (se desejado): instalar Chrome para Playwright (`npx playwright install chrome`), abrir páginas públicas, capturar screenshots só para estudo pessoal (não redistribuir), anotar padrões de interação. Sem copiar código, textos, marcas ou assets.

## 2. Produtos de referência (padrões gerais, não cópia)

| Produto | O que aprender | O que NÃO fazer |
|---|---|---|
| **Lingvist** | Cartões baseados em frase com lacuna; palavras mais frequentes primeiro; repetição que adapta à taxa de erro (FAQ oficial); interface minimalista, uma tarefa por tela, teclado/digitação. Crítica de terceiros: pouca gramática, sem diálogos/conversação, "ensina no vácuo". | Copiar conteúdo/visual; prometer "curva de memória em tempo real" (marketing não verificado). |
| **Assimil** | Diálogos curtos e progressivos, tradução paralela, fase "passiva" (ouvir/ler) antes da "ativa"; gramática introduzida gradualmente por exposição, notas curtas. | Copiar diálogos do curso (protegidos). Escrever diálogos originais. |
| **Anki** | Repetição espaçada com intervalos crescentes; autoavaliação (de novo/difícil/bom/fácil); SM-2 (histórico) e hoje opção FSRS. | Complexidade de configuração. |
| **Duolingo** | Lições curtas, feedback imediato certo/errado, sequência (streak), meta diária, trilha linear visível, tipos variados de exercício. | Mecânicas manipuladoras (vidas punitivas, notificações agressivas); estatísticas falsas. |

## 3. Princípios pedagógicos adotados
1. **Hangul primeiro, e curto**: 14 consoantes básicas, 5 duplas (ㄲ ㄸ ㅃ ㅆ ㅉ), 10 vogais básicas, 11 compostas. Ensinar por grupos de fonética/forma (ex.: ㄱ ㅋ ㄲ; ㅏ ㅓ ㅗ ㅜ), não ordem alfabética.
2. **Blocos silábicos**: consoante+vogal (vertical/horizontal), com patchim (consoante final). Construtor interativo de sílabas.
3. **Pronúncia para falantes de pt-BR** — pontos de atenção (a validar com material de referência antes do conteúdo final):
   - Distinção simples/aspirada/tensa (ㄱ/ㅋ/ㄲ) não existe em português.
   - ㅓ vs ㅗ, ㅡ vs ㅜ: vogais sem equivalente direto.
   - ㄹ entre vogal ≈ tap ("r" de "caro"); patchim ㄹ diferente.
   - ㅂ/ㄷ/ㄱ sonorizam entre vogais; português já sonoriza, porém em contextos distintos.
   - Patchim é "não solto"; assimilações (nasalização, ligação) → introduzir tarde.
4. **Romanização só como andaime** nas primeiras lições (revisada, RR), removida progressivamente; exercícios passam a Hangul puro.
5. **Vocabulário em contexto**: frases originais curtas, lacunas (cloze), alta frequência; palavra nova sempre em ≥2 frases.
6. **Gramática em pt-BR**, nota curta por lição, ligada ao diálogo: partículas (은/는, 이/가, 을/를), 이에요/예요, ordem SOV, 하다, polidez -아요/어요, negação 안.
7. **Escuta**: TTS do navegador quando houver voz coreana; senão, fallback honesto.
8. **Revisão espaçada**: agendador simples (Leitner/SM-2-like) atrás de uma interface que permita trocar por FSRS.
9. **Honestidade**: não avaliar pronúncia (sem reconhecimento de fala real); sem estatísticas inventadas — tudo vem do `localStorage`.

## 4. Referências de ensino de coreano (para consulta, não cópia)
- Sejong Institute / King Sejong Institute (currículo e níveis).
- Currículo KLEAR / TOPIK I (lista de vocabulário nível 1, ~800 palavras) como guia de frequência.
- Hangul: Hunminjeongeum (lógica de formação das letras) — didático: formas articulatórias.
- Material aberto: TTMIK, Seoul National University *Korean* — usar só como referência de ordem de conteúdo.
- Frequência: listas de frequência abertas (ex.: National Institute of Korean Language) para priorizar vocabulário.
- **Todo conteúdo no app será escrito originalmente**; revisão por falante nativo/professor é risco a tratar (ver roadmap).

## 5. Tecnologias — fatos relevantes
- **Web Speech `speechSynthesis`**: assíncrono; `getVoices()` pode vir vazio até o evento `voiceschanged`. Filtrar `lang` começando com `ko`. Pode não haver voz coreana (comum em Windows sem pacote de idioma; Linux). **Chrome no iOS usa WebKit** (obrigatório na Apple): comportamento = Safari; vozes dependem do iOS; fala exige gesto do usuário. Fallback: ocultar botão "ouvir" ou mostrar aviso + romanização/instrução.
- **FSRS**: algoritmo aberto; biblioteca `ts-fsrs` (MIT) — adotar depois, não agora.
- **Fonte Hangul**: Noto Sans KR via `next/font/google` (self-host em build, subset); fallback `system-ui`.
- **Testes iOS**: Playwright oferece WebKit e emulação de iPhone, **não é iPhone real nem Chrome iOS**. Só declarar "testado em dispositivo" se realmente ocorrer.
- Versões exatas de Next/Tailwind/Vitest/Playwright: confirmar no `init` (context7) antes de instalar.

## Fontes
- https://lingvist.com/help/why-do-i-see-the-same-words/
- https://lingvist.com/help/how-should-i-learn-with-lingvist-and-why-does-it-work/
- https://www.fluentu.com/blog/lingvist-review/
- https://www.thinkinitalian.com/app-review/lingvist
