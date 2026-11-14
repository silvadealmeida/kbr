# Fase 14 — endurecimento de qualidade e prontidão para release

**Data:** 2026-11-13  
**Base:** `phase-13/c1-c2-audit` (`c2a348d`)  
**Branch de trabalho:** `phase-14/quality-hardening`  
**Natureza:** correção editorial assistida por IA, auditoria visual em navegador real e validação completa. **Não é revisão por falante nativo**, não certifica CEFR/TOPIK e não substitui teste com aprendizes.

> **Decisão de release posterior:** o responsável aceitou a revisão editorial final assistida por
> IA. Os limites desta auditoria são riscos residuais aceitos, não bloqueios. Produção aceita pelo
> responsável; testes físicos não são requisito. Ver `docs/release/beta-readiness.md`.

## 1. Entregas

### 1.1 Fairness de comprimento (F13-012)

- **237 itens** de `mcq`/`reading` de A1–C2 tinham gabarito acima de **1,7×** o maior distrator no censo bruto de caracteres.
- Os 237 foram reescritos: o gabarito permaneceu na mesma posição, os distratores foram ampliados ou substituídos por alternativas plausíveis e erradas pelo conteúdo, sem enchimento genérico.
- Distribuição por nível: **A1 11 · A2 34 · B1 32 · B2 57 · C1 31 · C2 72**.
- **0 itens** permanecem acima de 1,7×.
- Novo teste permanente: `tests/content/phase14-fairness.test.ts` cobre **1.381 itens** de escolha de A1–C2 e falha se o gabarito passar do limite.
- O patch completo, item a item, está em `docs/audits/phase-14/data/option-length-corrections.json`; o método e exemplos estão em `option-length-corrections.md`.

### 1.2 Correções linguísticas e de coerência do C2

- `폐항` foi restrito ao **fechamento do porto**. Linhas de ferry passaram a usar `운항이 중단되다`/`폐지`; a glosa do vocabulário deixou de sugerir “desativação de rota portuária”.
- O conto de c2-l26/l27 passou a ter **dois bilhetes** (um antigo e um novo), sem o terceiro bilhete implícito na gaveta. O novo é amassado; o antigo fica no balcão e é guardado por Jeongho.
- Testes de regressão em `tests/content/c2-curriculum.test.ts`.
- Detalhes em `c2-linguistic-fixes.md`.

### 1.3 Auditoria visual responsiva

- Inspeção em Chromium/Playwright de **Hangul e A1–C2**: intro e conclusão em 320/375/390/768/1280; prática em 320/375/390; C2 em tema escuro; conclusão do C2 em 375.
- **0 rolagem horizontal**, alvos de toque ≥44 px nas alternativas e na rubrica, `lang="ko"` preservado.
- As correções de shell/primitivas da fase 14 anterior foram integradas (h1 único na revisão, `AccountCard`/`SyllableBuilder` compactos, `LessonVocabulary` em duas linhas, `Plate` alinhado, alvos ≥44 px, textos de A2/B1 e numeração do catálogo).
- Evidência reprodutível: `e2e/visual-audit.spec.ts` (4 testes; capturas em `/tmp/kbr-audit-shots`) e `e2e/mobile.spec.ts`.
- Limites: iPhone/Chrome iOS/VoiceOver reais não foram testados; axe não prova conformidade WCAG completa; o tema escuro foi verificado por axe e por captura da prática C2, não em todas as 29 telas.
- Relatório em `visual-audit.md`.

### 1.4 Gates e integração

- `npm run typecheck` verde.
- `npm test` verde (contagem final no relatório de release).
- `npm run build` verde, com `[audio-guard] OK` e nenhum MP3 em `.next`.
- Playwright completo na matriz Chromium 375/390/768/1280 + WebKit 390.
- `main` atualizado por fast-forward/merge normal, sem force-push e sem reescrever histórico compartilhado.

## 2. O que não foi demonstrado

- Revisão nativa de naturalidade, honoríficos, registro, ironia, focalização ou tradução.
- Validade psicométrica, calibração de dificuldade ou eficácia pedagógica.
- Acessibilidade completa WCAG, iPhone físico, VoiceOver/TalkBack ou voz do sistema em aparelho real.
- A auditoria não era parecer jurídico profissional. A decisão operacional posterior do
  responsável é áudio resolvido com créditos; ver `docs/audio/license-audit.md` §13.

## 3. Arquivos de referência

- `docs/audits/phase-14/option-length-corrections.md`
- `docs/audits/phase-14/c2-linguistic-fixes.md`
- `docs/audits/phase-14/visual-audit.md`
- `docs/audits/phase-13/findings.json` (F13-012 atualizado para `fixed`)
- `tests/content/phase14-fairness.test.ts`
- `tests/content/c2-curriculum.test.ts`
- `e2e/visual-audit.spec.ts`
