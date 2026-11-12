# KBR — Prática de fala com reconhecimento nativo (Fase 8C, experimental)

Rota `/fala` (protegida, fora da navegação principal; link em `/hangul`). O aluno
ouve o modelo, toca no microfone, fala uma palavra coreana já existente no
currículo e vê **o texto que o navegador reconheceu** e se ele corresponde ao
esperado. Não vale nota, não escreve em `Progress`, não cria cartões SRS e não
bloqueia lições.

## Decisão

Usar a **Web Speech API** do próprio navegador (`SpeechRecognition` /
`webkitSpeechRecognition`, `lang = "ko-KR"`). Sem Whisper, sem backend, sem API
paga, sem dependência nova. Não existe acesso web às APIs nativas de fala do iOS
fora dessa interface; o que o navegador expõe é o que usamos.

## Arquitetura

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Lógica pura | `src/lib/speech/recognition.ts` | detecção por recurso, sondagem do pacote local, `SpeechController` (máquina de estados com dependências injetadas, sem `window`) |
| Lógica pura | `src/lib/speech/match.ts` | normalização e comparação conservadoras |
| Hook | `src/components/speaking/use-speech-practice.ts` | liga o controlador ao React; cancela ao ficar inativo e destrói ao desmontar |
| UI | `SpeakingPractice.tsx`, `SpeakingPracticeArea.tsx` | cartão por palavra; capacidade, consentimento e instalação local |
| Conteúdo | `src/content/speaking.ts` | ids de `WORDS` já existentes; teste garante que têm áudio estático |

O áudio de referência reutiliza `AudioControl` (MP3 do MeloTTS → voz coreana do
sistema → dica textual), sem alterar o player.

### Detecção (por recurso, nunca por nome de navegador)

1. `window.isSecureContext !== false`;
2. `window.SpeechRecognition ?? window.webkitSpeechRecognition`;
3. `ctor.available` e `ctor.install` existem? Se sim, `available({ langs: ["ko-KR"], processLocally: true })` devolve
   `available | downloadable | downloading | unavailable`. Isso **não** pede
   microfone nem baixa nada;
4. `install()` só roda por clique do aluno.

### Modos

- **Local** — só quando `available()` retorna `available`. O controlador define
  `processLocally = true`. É a única situação em que a interface afirma que o
  reconhecimento é no aparelho.
- **Remoto/desconhecido** — qualquer outro caso (inclusive navegadores sem
  `available()`, como o Safari do iPhone). A interface avisa que o navegador
  **pode** enviar o áudio a um serviço do fabricante e exige que o aluno ative
  "Permitir reconhecimento pelo navegador" antes de o botão Falar funcionar.
  O consentimento vive só na memória da página (não é salvo; some ao recarregar)
  e pode ser revogado.
- **Indisponível** — sem API, ou contexto inseguro: aviso explicativo, botão
  Falar desabilitado, e o **campo de texto** de cada cartão continua funcionando.

### Estados do controlador

`idle → starting → listening → (processing) → result | error`. Erros
(`not-allowed`, `no-speech`, `audio-capture`, `network`, `language-not-supported`,
`timeout`, `consent-required`, `failed`) têm mensagem em pt-BR sem tom punitivo.
`aborted` é ignorado (é o eco do nosso próprio `abort()`). Há timeout de 10 s
ouvindo e 4 s esperando o resultado após Parar. Um token por captura descarta
eventos tardios depois de Cancelar.

### Fallback opcional

"Prefere digitar ou usar o ditado do teclado?": campo `lang="ko"` + Comparar. O
ditado do teclado é do sistema operacional, não do KBR, e funciona em qualquer
navegador. O rótulo é "Você escreveu", não "Reconhecemos".

## Feedback e avaliação

Reconhecimento de fala **não é** avaliação fonética. A interface:

- mostra "Reconhecemos: …" e, separadamente, "Corresponde ao texto esperado" ou
  "Isto não corresponde … pode ser a pronúncia ou uma limitação do reconhecedor";
- repete que o reconhecimento compara texto e não avalia a qualidade da pronúncia;
- não mostra percentuais, notas, nem avalia jamo isolado;
- nunca transforma silenciosamente uma palavra errada em certa.

Comparação (`matchTranscript`): primeiro exata (NFC + `trim`); depois
**normalizada** (remove espaços e pontuação/símbolos, porque reconhecedores
variam o espaçamento do coreano); nada além disso. O reconhecedor pode devolver
até 3 hipóteses; se uma hipótese que não é a principal casa, a interface diz que
foi "interpretação alternativa".

## Privacidade

- O microfone **nunca** é ativado ao abrir a página, ao ouvir o modelo ou ao
  navegar: só após clique em Falar (e, no modo remoto, após consentimento).
- Listening visível ("Microfone ligado" + texto em região `role="status"`),
  com Parar e Cancelar.
- Desmontar (navegação interna), Cancelar, erro e timeout chamam `abort()` e
  soltam os handlers.
- **Nada é gravado, salvo ou enviado pelo KBR.** O KBR não acessa o áudio:
  só recebe o texto devolvido pelo navegador, que fica no estado do componente.
  Sem Supabase, sem `localStorage`/`sessionStorage`/cookie de fala, sem
  analytics, sem logs. Teste e2e confere o armazenamento do navegador.
- Remoto: o áudio pode ser processado pelo fabricante (por exemplo Google no
  Chrome; Apple no Safari). O KBR não controla essa política e o texto da
  interface e a política de privacidade dizem isso.
- Permissions-Policy: o app não envia nenhum cabeçalho `Permissions-Policy`
  (verificado em `next.config.mjs` e `src/proxy.ts`), então o microfone é
  permitido por padrão para a própria origem. Se um cabeçalho for adicionado no
  futuro, ele deve manter `microphone=(self)` e `on-device-speech-recognition`
  para `/fala`, senão a prática de fala deixa de funcionar.

## Compatibilidade observada (pesquisa em 12/11/2026)

Fontes: caniuse (Speech Recognition API), MDN (`processLocally`,
`available()`, `install()`), discussões do Chromium e relatos de WebKit. Não há
dispositivo físico neste ambiente: **tudo abaixo precisa ser confirmado nos
aparelhos reais** (ver checklist manual).

| Ambiente | Situação esperada | Observações |
|---|---|---|
| Chrome/Edge Windows e Android | `SpeechRecognition`/`webkitSpeechRecognition` presentes. Reconhecimento remoto (serviço do fabricante). Chrome 139+ expõe `processLocally`, `available()`, `install()` (experimentais) | pacote de coreano pode ser "downloadable"; `install()` exige gesto do usuário |
| Safari iOS | `webkitSpeechRecognition` com suporte **parcial** (iOS 14.5+); depende de Siri/Ditado ativos; sem `available()`/`install()` | não funciona em web app adicionado à Tela de Início; origem do processamento desconhecida |
| Chrome iOS | **Não verificado.** Usa WebKit; a API pode não estar habilitada fora do Safari | cai no aviso "indisponível" + campo de texto |
| Firefox | Sem suporte | aviso + campo de texto |

Achado do e2e: no Chromium headless do Playwright (158) chamar
`SpeechRecognition.available()` **derruba o renderer** ("Target crashed"). Não
afeta o Chrome de desktop/Android; por isso os testes sempre substituem ambos os
construtores por um falso (ou por `undefined`). Não adicionamos código de
produção para contornar um ambiente de automação.

## Limitações conhecidas

- Os testes automatizados usam um reconhecedor **simulado**: provam a lógica do
  app, não o reconhecimento real em iPhone/Android/Windows.
- O reconhecedor pode acertar a palavra com pronúncia imperfeita e errar com
  pronúncia boa (palavras curtas, ambiente ruidoso, sotaque).
- Palavras de uma sílaba e jamo isolados são pouco confiáveis; por isso a lista
  só tem palavras de 2+ sílabas.
- Reconhecimento local depende de pacote de idioma do navegador e é
  experimental; `available()` pode ficar em `downloading` em alguns navegadores.
- O consentimento não persiste (decisão de privacidade); é pedido a cada visita.

## Teste manual por dispositivo

Pré-requisito: usuário autenticado; página `/fala`.

1. **Chrome Windows** — banner de capacidade correto; Falar sem consentimento
   (modo remoto) não liga o microfone; permitir → prompt do navegador → falar
   "엄마" → "Reconhecemos: 엄마 / Corresponde…"; negar o microfone → mensagem de
   bloqueio; desligar a rede (modo remoto) → mensagem de rede; ver se
   `available()` aparece como local e se o botão de instalação funciona.
2. **Chrome Android** — igual, com microfone do aparelho; trocar de aba durante
   a escuta (deve soltar o microfone ao voltar/Cancelar).
3. **Safari iOS** — Siri/Ditado ativos e inativos; verificar se o prompt de
   microfone aparece, se coreano é reconhecido, e o aviso de origem desconhecida.
   Repetir como web app da Tela de Início (esperado: indisponível).
4. **Chrome iOS** — confirmar se a API existe; se não, aviso + campo de texto +
   ditado do teclado.
5. Em todos: o ícone de gravação do sistema some após Parar/Cancelar/sair da
   página; modo escuro; VoiceOver/TalkBack anunciando "Ouvindo… fale agora.".

## Como virar um tipo de exercício (futuro)

Nada disso foi feito agora (`ExerciseSpec`, `checkAnswer`, `Progress` v1, CAS,
SRS e limiares permanecem intactos). Um caminho possível, só com pedido
explícito e revisão pedagógica:

1. novo tipo `speak-word` em `lib/exercises` com `skill: "speaking"`, correção
   "correspondeu / não correspondeu" **sem** reprovar por falha do reconhecedor
   (erro técnico ≠ resposta errada; nunca vira cartão SRS);
2. opcional por padrão, com alternativa de pular e campo de texto, para não
   bloquear quem não tem microfone/API;
3. decisão explícita sobre o que entra no `Progress` (provavelmente só
   "tentou"), sem texto reconhecido nem áudio.

## Testes

- Vitest: `tests/speech.test.ts` (detecção, sondagem local, consentimento,
  erros, silêncio, timeout, Parar/Cancelar, limpeza), `tests/speaking-content.test.ts`,
  `tests/routes.test.ts`.
- Playwright: `e2e/speech.spec.ts` (Chromium 375/390/768/1280 + WebKit 390, com
  reconhecedor simulado; inclui axe em claro/escuro nos estados de consentimento, escuta, resultado e sem suporte), `e2e/catalog-layout.spec.ts`.

Resultado da execução local (12/11/2026): typecheck limpo, 445 Vitest, build e
452 Playwright (+22 skips) verdes em Chromium 375/390/768/1280 e WebKit 390.
