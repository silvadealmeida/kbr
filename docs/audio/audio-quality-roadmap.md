# Roadmap de qualidade de áudio — Fase 8B (histórico, encerrado)

> **Arquivo histórico, superado pela Fase 14.** O áudio está **resolvido com créditos**: 7.790 MP3
> de Hangul, A1–C2 e vocabulário são servidos por padrão; `=0` é apenas kill switch. Gravação ou
> aprovação por falante nativo não são tarefas pendentes nem bloqueios do release. O áudio sintético
> não avalia pronúncia; o risco residual de qualidade foi aceito pelo responsável. Este roadmap
> registra o plano antigo e não representa trabalho atual.

**Data:** 2026-11-12  
**Status:** **parcialmente implementado na 8B local**. A camada de assets, o player e o fallback estão prontos com TTS neural provisório; gravação e QA por falante nativo continuam pendentes.  
**Objetivo:** substituir a dependência de voz do sistema por uma referência de pronúncia estável, revisada por falante nativo e compatível com o orçamento do app.

## Decisão de arquitetura

**Gravação nativa é a fonte principal; TTS é fallback.**

O corpus atual é pequeno: **265 `audioText` únicos, 411 caracteres**, além das formas `spoken` das regras de pronúncia. O inventário automático da 8B, que inclui `spoken` e alvos de montagem, encontrou **287 textos únicos**. Não há justificativa para depender de uma voz sintética diferente em cada dispositivo quando é possível gravar todos os itens e servi-los como assets estáticos.

TTS continua útil para:

- itens ainda sem gravação;
- conteúdo futuro, enquanto não houver sessão de gravação;
- diagnóstico e demonstração.

TTS **não** deve ser a referência oficial de ㄹ, vogais ou contrastes críticos.

## Estado da implementação (8B local)

A 8B foi implementada em código local com **MeloTTS-Korean sintético como referência provisória**, não como gravação nativa. O que está pronto:

- inventário reproduzível com **2.907 textos únicos** (Hangul, A1, A2 e vocabulário), 1.949 de prioridade 1 e 958 de prioridade 2;
- **2.907 MP3** em `public/audio/v1/`, cobrindo Hangul, A1, A2 e vocabulário, 64 kbps mono 44,1 kHz;
- manifesto versionado com SHA-256, duração, loudness, fontes, passos, tags e prioridade; mapa compacto `texto → src` separado para o cliente;
- player **asset → voz do sistema**, com seleção explícita de voz coreana, espera por `voiceschanged`, timeouts, erros, replay, cancelamento e limpeza;
- controle **0,75×** com preservação de pitch e status acessível que só anuncia reprodução depois de `play()`/`onstart`;
- nenhum áudio no carregamento inicial; cache HTTP imutável por um ano;
- testes de manifesto, integridade, cobertura, playback, fallback, erros e E2E.

O que **não** está pronto e continua sendo o critério de fechamento real da 8B:

- gravação com falante nativo e consentimento;
- escuta cega e aprovação item a item;
- revisão das transcrições didáticas de ㄹ/vogais;
- verificação em iPhone/Chrome iOS/VoiceOver reais;
- licença declarada do encoder BERT usado pelo MeloTTS.

Detalhes de reprodução, licenças e limpeza em `docs/audio/generation-guide.md`.

## Inventário e prioridade

### 8B.0 — Inventário automático

Gerar uma lista única a partir de:

- `audioText` de exercícios, alternativas, leituras e sílabas;
- `spoken` de `RULES` (formas didáticas como `한구거`, `조타`);
- sílabas-alvo de montagem que não apareçam em `audioText`;
- `한` da anatomia, se não estiver coberto.

Cada item recebe um ID estável (o ID do conteúdo, não o texto), texto escrito, texto falado, contexto, tags de contraste e status de revisão. O inventário deve ser reproduzível por script e comparado com o conteúdo em teste, para não faltar item novo.

**Prioridade de gravação:**

1. Contrastes críticos: ㄹ inicial/final, ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅟ, ㅢ, tensas/aspiradas, batchim simples e duplo.
2. Todos os itens de exercícios de escuta e alternativas de `char-to-audio`.
3. Sílabas de montagem e palavras de leitura.
4. Formas `spoken` das regras.
5. Itens decorativos ou de anatomia.

Como o corpus inteiro é pequeno, a meta é **gravar tudo**, não só os itens críticos.

### 8B.1 — Sessão de gravação

- Falante nativo de coreano padrão de Seul, com experiência em ensino ou locução; se possível, uma voz feminina e uma masculina.
- Estúdio caseiro tratado ou estúdio; microfone cardioide, sala silenciosa, mesma distância e mesmo ganho em toda a sessão.
- 48 kHz/24 bits na captura; 3 tomadas por item; palmas ou marcador no início para sincronizar.
- Ler o texto **como item de ensino**, não como frase de conversa: ritmo claro, sem exagero artificial, sem sotaque estrangeiro.
- Para ㄹ, gravar pares que mostrem a posição: `라`/`리` (tepe) e `말`/`물` (lateral), com instrução explícita ao falante.
- Para vogais, gravar pares mínimos reais do conteúdo, sem forçar contrastes que o coreano moderno fundiu.
- Registrar consentimento escrito para uso no app, distribuição e divulgação.

**Critério de saída:** todas as tomadas identificadas por ID, com anotação de qual foi aprovada e qual foi descartada.

### 8B.2 — Pipeline de assets

- Editar: remover ruído, cortar silêncio, normalizar para **-16 LUFS** (ou padrão definido), true peak ≤ **-1 dBTP**, sem compressão que altere consoantes.
- Padronizar **40 ms de silêncio no início e 80 ms no fim**, para o clique não cortar a primeira sílaba.
- Exportar dois formatos:
  - **AAC/M4A** como base universal (Safari/iOS);
  - **Opus/WebM** para navegadores que suportam, se o ganho de tamanho justificar.
- Nomear por ID estável: `public/audio/v1/<id>.m4a` e `.webm`. Evitar Hangul no nome do arquivo para não depender de normalização Unicode.
- Gerar um manifesto versionado:

```json
{
  "version": 1,
  "generatedAt": "2026-11-12",
  "items": [
    {
      "id": "syl:아",
      "src": "/audio/v1/syl-ah.m4a",
      "mime": "audio/mp4",
      "durationMs": 620,
      "speaker": "spk-1",
      "review": "approved",
      "sha256": "…"
    }
  ]
}
```

- Versionar o manifesto e os assets; não versionar tomadas brutas. Guardar as tomadas brutas em armazenamento do projeto, fora do repositório.
- Cache: `Cache-Control: public, max-age=31536000, immutable` para `/audio/v1/*`. Como não há service worker, o cache é apenas HTTP; offline continua fora de escopo.

**Implementação local (8B):** o formato publicado é **MP3 64 kbps mono 44,1 kHz**, não AAC/WebM. A decisão foi tomada depois de medir o corpus: os clipes somam poucos MB, muito abaixo do orçamento; um único formato universal reduz complexidade de encode, manifesto e fallback sem ganho material de tamanho. O AAC/WebM continua sendo a escolha preferida quando houver gravação nativa em alta qualidade. O `Cache-Control` imutável foi aplicado em `next.config.mjs` para `/audio/:path*`.

### 8B.3 — Camada de reprodução

O tipo `audioSrc` já existe em `src/lib/exercises/index.ts:65,76`; a 8B deve finalmente consumi-lo.

Ordem de reprodução:

1. Se `audioSrc` existe, tocar o asset.
2. Se o asset falhar (`onerror`), cair para TTS coreano, se disponível.
3. Se não houver TTS coreano, mostrar o fallback textual e não contar o item como áudio reproduzido.

Requisitos:

- `preload="none"`; carregar no clique/toque, não no carregamento da página.
- Um único player por vez; parar o anterior ao iniciar outro.
- `onplay`, `onended` e `onerror` para status acessível; nunca anunciar sucesso antes do `play()` resolver.
- Não iniciar sozinho; respeitar `prefers-reduced-motion` (áudio não é animação, mas o controle deve continuar estável).
- Não bloquear “Conferir”/“Continuar” enquanto o áudio carrega.
- Em iOS, o primeiro `play()` precisa de gesto do usuário; o botão já é um gesto, mas o asset deve ser carregado no mesmo handler.
- Se o item tiver `audioSrc` e o arquivo não existir, o fallback precisa ser testado.

**Implementação local (8B):** o elemento de áudio é criado no clique e o asset é buscado sob demanda; nenhum MP3 entra no carregamento da página. O player tenta o asset por até **4 s**; se o arquivo falhar, não iniciar ou não existir, cai para a voz do sistema. A voz só é usada se houver uma variante coreana explícita (`ko`, `ko-KR` etc.); a espera por `voiceschanged` é de **1,5 s** e a fala precisa começar em **2 s**. Um novo play cancela o anterior; `destroy()` remove listeners e timers. O status só vira “Reproduzindo” depois de `play()` resolver ou `onstart` disparar.

### 8B.4 — QA com falante nativo

- Escuta cega: o revisor ouve o asset sem ver o texto e identifica o item; erro de identificação é sinal de gravação ruim.
- Revisão item a item no inventário: aprovado, refazer, ou “não é este som”.
- Checagem específica de ㄹ e vogais contra os pares do conteúdo, sem inventar IPA novo.
- Segunda escuta em fone e em alto-falante de celular, para confirmar inteligibilidade.
- Amostragem de 100% dos itens críticos e de pelo menos 20% dos demais; se houver falha sistêmica, refazer a sessão.
- Registrar no manifesto quem aprovou e quando; itens não aprovados não entram como referência.

### 8B.5 — Testes e documentação

- Teste de conteúdo: todo item de escuta tem `audioSrc`; todo `audioSrc` aponta para um arquivo existente; nenhum ID duplicado.
- Teste de playback: asset toca, fallback TTS funciona, erro mostra mensagem, não há autoplay.
- Teste de acessibilidade: botão com nome acessível, status anunciado, foco preservado, alvos ≥44 px.
- Teste de performance: nenhum áudio no carregamento inicial; orçamento por clipe e total documentado.
- Atualizar `docs/architecture.md`, `docs/roadmap.md` e `docs/feedback/feedback-igo.md`.

## Orçamento e desempenho

- **Por clipe:** ≤ 60 KB (AAC 64–96 kbps mono; itens de 1–2 sílabas ficam bem abaixo).
- **Total:** 265 clipes × ~30 KB ≈ **8 MB**, carregados sob demanda.
- **Carregamento inicial:** 0 bytes de áudio.
- **Latência desejada:** primeiro som em < 300 ms após o toque, em 4G; preload opcional dos próximos 1–2 itens da lição.
- **Sem layout shift:** o player reserva o espaço do status; o áudio não altera a altura do cartão.
- **Sem service worker:** offline continua fora de escopo; o cache HTTP não garante disponibilidade offline.

## Acessibilidade

- O botão continua com rótulo específico (“Ouvir a sílaba”, “Ouvir a forma falada”) e não depende só do ícone.
- O status usa `role="status"` e texto curto; não rouba foco.
- O fallback textual continua visível e completo.
- Se o áudio não estiver disponível, a UI diz isso e não finge sucesso.
- A voz sintetizada é rotulada como sintetizada; a gravação nativa é a referência.
- Nenhuma informação é transmitida só por áudio.

## Riscos e mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Voz nativa não cobrir todos os itens | Média | Médio | Inventário antes da sessão; sobras ficam em TTS com rótulo |
| Custo/tempo da edição | Média | Médio | Corpus curto; template de edição; lote por lição |
| Asset grande no repositório | Baixa | Médio | 8 MB é aceitável; se crescer, storage/CDN |
| Áudio revisado envelhece quando o conteúdo muda | Média | Médio | Manifesto versionado; teste que acusa item sem asset |
| Licença de voz/gravação | Baixa | Alto | Contrato e consentimento escrito; voz própria ou licenciada |
| TTS de fallback continuar ruim | Alta | Baixo | UI honesta; fallback textual; prioridade para gravar tudo |
| iPhone exigir gesto | Alta | Baixo | Play no handler do clique; testar em dispositivo real |
| Cache HTTP não funcionar offline | Alta | Baixo | Documentar que offline não é suportado |

## Fora de escopo

- Substituir a engine por nuvem em runtime.
- Clonagem de voz, voz personalizada ou “AI voice” de celebridade.
- Avaliação automática de pronúncia do aluno.
- Novas lições, novo vocabulário ou mudança de grading.
- Service worker/cache offline.
- Migração de `Progress` v1, CAS, Supabase ou auth.
- IPA novo ou correção fonética sem revisão nativa.

## Critérios de aceite da 8B

Os itens marcados foram atendidos pela implementação local com áudio sintético; os demais exigem gravação/revisão nativa ou dispositivo real.

- [x] Inventário reproduzível cobre todos os `audioText` e formas `spoken` de Hangul, A1, A2 e vocabulário (2.907 textos; teste de cobertura).
- [ ] 100% dos itens de escuta e contrastes críticos têm asset **aprovado por falante nativo** — os 287 assets existem, mas são sintéticos e seguem `in-review`.
- [x] Todo `audioSrc` aponta para arquivo existente; teste falha se faltar (SHA-256 e bytes verificados).
- [x] Player toca asset, cai para TTS e, sem TTS, mostra fallback textual.
- [x] Nenhum áudio carrega no inicial; orçamento por clipe e total documentados (maior ~70 KB; total ~38 MB).
- [x] UI não afirma sucesso antes de `play()`; erros são anunciados.
- [ ] iPhone/Chrome iOS/VoiceOver reais verificados no checklist manual.
- [ ] Licenças, consentimento e atribuições registrados — MeloTTS-Korean é MIT, mas o encoder BERT não declara licença e não há consentimento de voz humana.
- [x] `Progress` v1, CAS, auth, PWA e conteúdo permanecem intactos.

## Sequência sugerida

1. 8B.0 inventário + script de verificação — **feito**.
2. 8B.1 gravação nativa (sessão externa) — **pendente**.
3. 8B.2 edição + manifesto + assets — **feito com MeloTTS provisório**; refazer com gravação nativa.
4. 8B.3 playback + fallback + testes — **feito**.
5. 8B.4 QA nativo + correções — **pendente**.
6. 8B.5 documentação, orçamento e fechamento — **documentação feita**; fechamento depende de 8B.1/8B.4.

A 8B começou depois da 7G. A implementação local resolveu a estabilidade do áudio e a honestidade do fallback, mas **não** substitui a revisão nativa. O item 1 de `docs/feedback/feedback-igo.md` foi resolvido na 8A; o item 2 está parcialmente resolvido e só fecha com gravação/escuta nativa. O item 3 (flashcards ilustrados) segue aberto.
