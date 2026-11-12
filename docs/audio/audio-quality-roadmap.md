# Roadmap de qualidade de áudio — proposta para a Fase 8B

**Data:** 2026-11-12  
**Status:** proposta. Nada aqui foi implementado na 7G.  
**Objetivo:** substituir a dependência de voz do sistema por uma referência de pronúncia estável, revisada por falante nativo e compatível com o orçamento do app.

## Decisão de arquitetura

**Gravação nativa é a fonte principal; TTS é fallback.**

O corpus atual é pequeno: **265 `audioText` únicos, 411 caracteres**, além das formas `spoken` das regras de pronúncia. Não há justificativa para depender de uma voz sintética diferente em cada dispositivo quando é possível gravar todos os itens e servi-los como assets estáticos.

TTS continua útil para:

- itens ainda sem gravação;
- conteúdo futuro, enquanto não houver sessão de gravação;
- diagnóstico e demonstração.

TTS **não** deve ser a referência oficial de ㄹ, vogais ou contrastes críticos.

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
- Nomear por ID estável: `public/audio/hangul/v1/<id>.m4a` e `.webm`. Evitar Hangul no nome do arquivo para não depender de normalização Unicode.
- Gerar um manifesto versionado:

```json
{
  "version": 1,
  "generatedAt": "2026-11-12",
  "items": [
    {
      "id": "syl:아",
      "src": "/audio/hangul/v1/syl-ah.m4a",
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
- Cache: `Cache-Control: public, max-age=31536000, immutable` para `/audio/hangul/v1/*`. Como não há service worker, o cache é apenas HTTP; offline continua fora de escopo.

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

- [ ] Inventário reproduzível cobre todos os `audioText` e formas `spoken`.
- [ ] 100% dos itens de escuta e contrastes críticos têm asset aprovado por falante nativo.
- [ ] Todo `audioSrc` aponta para arquivo existente; teste falha se faltar.
- [ ] Player toca asset, cai para TTS e, sem TTS, mostra fallback textual.
- [ ] Nenhum áudio carrega no inicial; orçamento por clipe e total documentados.
- [ ] UI não afirma sucesso antes de `play()`; erros são anunciados.
- [ ] iPhone/Chrome iOS/VoiceOver reais verificados no checklist manual.
- [ ] Licenças, consentimento e atribuições registrados.
- [ ] `Progress` v1, CAS, auth, PWA e conteúdo permanecem intactos.

## Sequência sugerida

1. 8B.0 inventário + script de verificação.
2. 8B.1 gravação nativa (sessão externa).
3. 8B.2 edição + manifesto + assets.
4. 8B.3 playback + fallback + testes.
5. 8B.4 QA nativo + correções.
6. 8B.5 documentação, orçamento e fechamento.

A 8B só deve começar depois da 7G e antes do lançamento público, junto com a correção da posição da resposta correta. As duas pendências de prioridade alta de `docs/feedback/feedback-igo.md` continuam abertas até lá.
