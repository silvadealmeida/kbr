# Prontidão para beta controlado — Fase 8D

**Data:** 2026-11-12  
**Veredito:** o KBR **não está pronto para produção pública**. Há um bloqueio material aberto (licença do áudio sintético) e pendências jurídicas de privacidade. Para um **beta fechado**, o código está estável, mas a decisão de distribuir os 287 MP3 depende do dono do projeto (ver `docs/audio/license-audit.md`). Nada aqui foi testado em dispositivo real.

Legenda: **PASS** (verificado nesta fase com evidência) · **BLOCKED** (impede o uso indicado) · **MANUAL TEST REQUIRED** (só aparelho/serviço real decide) · **DEFERRED** (fora do escopo, decisão registrada).

## 1. Checklist de lançamento

| # | Item | Status | Evidência / observação |
|---|---|---|---|
| 1 | Licença do áudio sintético (MeloTTS + `kykim/bert-kor-base`) | **BLOCKED** (público/comercial) | `license-audit.md`: encoder sem licença no repositório baixado; README do autor diz Apache-2.0 **e** exige MOU para uso comercial; treino da voz não documentado. Beta fechado = decisão do dono |
| 2 | Integridade dos 287 MP3 (cobertura, SHA-256, órfãos, corrupção, duplicados) | **PASS** | `audio-quality-report.md` §1 |
| 3 | Reprodução honesta (sem falso sucesso, voz `ko` explícita, fallback) | **PASS** (código + simulado) | revisão de `playback.ts`; 453 Vitest; real-device pendente (item 17) |
| 4 | Rótulo do áudio como sintético | **PASS** (corrigido na 8D) | "gravado" → "sintetizado (referência provisória)" |
| 5 | Qualidade fonética por falante nativo | **DEFERRED** | impossível sem revisor; todos os itens seguem `in-review`; bloqueia a promessa de "pronúncia correta", não o beta rotulado |
| 6 | Revisão nativa do conteúdo coreano | **DEFERRED** | lista de dúvidas em §4; conteúdo permanece `in-review` |
| 7 | Google OAuth | **MANUAL TEST REQUIRED** | fluxo coberto por mock/E2E; configuração Supabase/Google e iOS reais não acessados; produção da 4D.3 é relato do usuário |
| 8 | `Progress` v1 e CAS | **PASS** (local) | Vitest `supabase-cas`, `sync-concurrency`, `progress-sync` verdes; pgTAP/concorrência **não reexecutado** na 8D (o script exige senha do PostgreSQL local); remoto = relato do usuário |
| 9 | Offline / reconexão | **PASS** (reconexão) · **DEFERRED** (offline real) | E2E de reconexão e pendência em Chromium+WebKit; sem service worker por decisão (`docs/offline-pwa-decision.md`) |
| 10 | PWA (manifesto, instalabilidade, cabeçalhos) | **PASS** (automatizado) · **MANUAL TEST REQUIRED** (iOS) | `Page.getInstallabilityErrors`; ícone/instalação no iPhone é manual |
| 11 | `/fala` rotulada como experimental | **PASS** | aviso "Recurso experimental", fora da navegação, não vale nota, não toca `Progress`/SRS |
| 12 | `/fala` em navegadores reais | **MANUAL TEST REQUIRED** | só reconhecedor simulado; matriz em `iphone-manual-checklist.md` §14 |
| 13 | Layout móvel (375/390/768/1280, claro/escuro) | **PASS** (automatizado) · **MANUAL TEST REQUIRED** (aparelho) | `e2e/catalog-layout.spec.ts` e demais |
| 14 | Acessibilidade | **PASS** (axe wcag2a/aa/21a/21aa) · **MANUAL TEST REQUIRED** (VoiceOver/TalkBack/NVDA) | sem alegação de conformidade WCAG completa |
| 15 | Privacidade / jurídico | **BLOCKED** (público) | `/privacidade` e `/impressum` têm campos "a confirmar" (controlador, contato, retenção, DPAs); revisão jurídica pendente (`docs/privacy-audit.md`). A seção de microfone existe (§2.4) |
| 16 | Segurança | **PASS** (escopo da fase) | cabeçalhos globais, `no-store` em rotas privadas, sem `Permissions-Policy` que bloqueie o microfone; sem bloqueio de segurança identificado. **Não é pentest** |
| 17 | Testes automatizados | **PASS** | §2 |
| 18 | Dispositivos reais (iPhone Safari/Chrome, Android Chrome, Windows Chrome/Edge) | **MANUAL TEST REQUIRED** | nenhum teste físico existe |

**Não marcar como pronto para produção** enquanto os itens 1 e 15 estiverem BLOCKED.

## 2. Testes executados na 8D

| Comando | Resultado |
|---|---|
| `npm run typecheck` | limpo |
| `npm test` | **453/453** em 30 arquivos (445 anteriores + 8 da auditoria estrutural) |
| `npm run build` | verde |
| `npm run e2e` | **452 passaram, 22 skips intencionais** (Chromium 375/390/768/1280 + WebKit 390), execução repetida depois das correções de texto |

Cobertura **simulada × real**:

| Área | Automatizado (simulado) | Real |
|---|---|---|
| Reconhecimento de fala | controlador e UI com reconhecedor falso (Vitest + Playwright) | **nenhuma** execução |
| Voz do sistema (`speechSynthesis`) | falsa nos testes; MP3 real no E2E de Chromium | **nenhuma** |
| WebKit | Playwright WebKit (iPhone 13 emulado) | iPhone físico: **nenhum** |
| OAuth / Supabase | mock local + testes SQL locais | produção só por relato (4D.3) |
| Leitores de tela | axe | **nenhuma** |

## 3. Prática de fala — auditoria de prontidão

| Critério | Resultado | Evidência |
|---|---|---|
| Detecção por recurso, não por nome de navegador | OK | `detectSpeechSupport` |
| "Local" só com pacote confirmado | OK | `available()==="available"` → `processLocally=true`; todo o resto é remoto/desconhecido |
| Consentimento antes de processamento remoto/desconhecido | OK | `start` sem `consent` emite `consent-required`; consentimento só em memória, revogável |
| Microfone só por clique | OK | nenhum `start()` em efeito; teste E2E |
| Permissão negada, sem fala, rede, timeout, idioma | OK | mapeados em pt-BR (`SPEECH_ERROR_MESSAGES`) |
| Cancelamento e limpeza | OK | `release()` anula handlers e chama `abort()`; token descarta eventos tardios; hook destrói ao desmontar |
| Comparação de texto conservadora | OK | NFC + remoção de espaços/pontuação; sem equivalência de jamo; não avalia pronúncia |
| Nada gravado/persistido/enviado pelo KBR | OK | varredura: sem `MediaRecorder`, `getUserMedia`, `fetch`, `localStorage`, `console` em `lib/speech` e `components/speaking` |
| Fallback para navegador sem API | OK | aviso + campo de texto/ditado do teclado |
| Documentação de privacidade | OK, com revisão jurídica pendente | `/privacidade` §2.4 |
| Pacote de idioma | OK | `install()` só em clique do botão |

Achados:

1. **Corrigido:** a mensagem de "indisponível" afirmava como fato o comportamento no iPhone ("exige o Safari com Siri/Ditado… não funciona na Tela de Início"). Era pesquisa, não teste em aparelho. Reescrita com "pode depender" e "ainda não verificamos em aparelho real".
2. **Baixo, não alterado:** o estado `starting` não tem timeout próprio (se o prompt de permissão for ignorado, o aluno precisa tocar em Cancelar/Parar; ambos estão visíveis). Se o aparelho nunca disparar `onstart`, a captura fica "Aguardando o microfone…" até a ação do aluno.
3. **A confirmar em aparelho:** cada cartão cria seu próprio controlador; ao tocar em *Falar* em outro cartão com um primeiro ainda ouvindo, o primeiro é cancelado no efeito seguinte. Verificar que não há dois microfones abertos (matriz C7).
4. **A confirmar em aparelho:** não há tratamento de `visibilitychange`/`pagehide`; o limite é o timeout de escuta de 10 s e o cancelamento ao desmontar (C7).
5. Nenhum ajuste de grading, `Progress`, SRS ou torna a fala obrigatória (nada foi mexido).

## 4. Auditoria do currículo

Checagens programáticas novas (`tests/content/curriculum-audit.test.ts`, 8 testes, todos verdes), independentes de `validateCurriculum` e usando decomposição Unicode NFD própria.

### 4.1 Defeitos estruturais verificados

- **1 defeito corrigido:** rótulo "áudio gravado" para áudio sintético (§ licença/áudio).
- **Nenhum** outro: IDs de exercício únicos em 29 passos; sílabas decompõem exatamente nas partes declaradas e textos únicos; gabaritos presentes nas opções; sem opções duplicadas (ids, glifos, rótulos, `audioText`); em `audio-to-char` o som tocado contém o jamo-gabarito (jamo solto é pronunciado numa sílaba-veículo, p. ex. ㅋ→코; por desenho); em `char-to-audio` e `listen` o áudio correto coincide com o texto; pré-requisitos existem e são anteriores na ordem real do curso (que intercala checkpoints); cada jamo aparece em `newJamo` da lição que o introduz; as 23 formas faladas coincidem com as funções puras e com o `g2pkk`; sem MP3 repetido ou corrompido. Nomes dos jamo (`namePt`: ieung, giyeok, nieun… ssangjieut) seguem a romanização revisada das letras; o curso não usa romanização em palavras.

### 4.2 Questões linguísticas que exigem revisão nativa (não alteradas)

- Transcrições didáticas: as 23 formas faladas de `rules.ts` e `감사함니다` coincidem com o `g2pkk`, mas sem aval humano. **`전와`** (nota de `syllables.ts`, aproximação do ㅎ fraco de 전화) **não** é confirmada: o `g2pkk` mantém `전화` e, se alimentado com `전와`, devolve `저놔` (ligação). Tratar como descrição informal, não como transcrição; revisar com falante nativo.
- IPA `ㅟ [y]` e `ㅚ [ø]` (monotongos de manual) × realizações comuns como ditongo; já existem tags `pronunciation:variation-wi/oe`, mas a escolha do valor exibido precisa de revisão.
- Fusões ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅒ/ㅖ: já marcadas `merged-*`; confirmar quais "pares mínimos" são realmente distinguíveis para nativos.
- Variação de ㅢ; ㄹ final em contexto; 11 batchim duplos; tradução de `곬`; naturalidade das frases de h24/h25/c4; critério h18 aproximado por `h18-seen-sounds`.

### 4.3 Preferências subjetivas (não são defeitos)

Voz única (`KR`), ritmo de item isolado, 0,75× como velocidade lenta, escolha dos textos de exemplo, tom das explicações.

## 5. Bloqueios de lançamento

1. **Licença do áudio** (item 1) — resolver com R1/R2/R3 de `license-audit.md`.
2. **Privacidade/Impressum** (item 15) — preencher controlador, contato, retenção; revisão jurídica.
3. (Para promessa de qualidade, não para beta rotulado) revisão nativa do áudio e do conteúdo.

## 6. Próxima fase recomendada

**8E — Resolução de licença e contenção do áudio**, sem conteúdo novo: (a) enviar R1/R2 e registrar respostas; (b) implementar a contenção R3 (flag + exclusão de `public/audio/**` do deploy, voz do sistema como padrão) com testes, **sem apagar** os MP3; (c) auditar as licenças restantes da cadeia (R6); (d) o dono executa a matriz do §14 do checklist em pelo menos um iPhone e um Android/Windows; (e) só depois decidir entre manter o MeloTTS, trocar de TTS ou gravar com falante nativo.
