# Auditoria visual responsiva — Fase 14

**Data:** 2026-11-13  
**Escopo:** Hangul e cursos A1, A2, B1, B2, C1 e C2, com prioridade para 320/375/390 px.  
**Método:** Chromium/Playwright contra a build de produção local, com o mock de Supabase do e2e. Capturas full-page e de viewport em `/tmp/kbr-audit-shots`. **Não é teste em iPhone físico nem auditoria WCAG completa.**

## 1. Cobertura executada

| Superfície | Estados | Larguras |
|---|---|---|
| Hangul (`/hangul/h01`) | intro, prática | 320, 375, 390, 768, 1280 |
| A1 (`/a1/a1-l01`) | intro, prática | 320, 375, 390, 768, 1280 |
| A2 (`/a2/a2-l01`) | intro, prática | 320, 375, 390, 768, 1280 |
| B1 (`/b1/b1-l01`) | intro, prática | 320, 375, 390, 768, 1280 |
| B2 (`/b2/b2-l01`) | intro, prática | 320, 375, 390, 768, 1280 |
| C1 (`/c1/c1-l01`) | intro, prática | 320, 375, 390, 768, 1280 |
| C2 (`/c2/c2-l01`) | intro, prática, tema escuro | 320, 375, 390, 768, 1280 |
| C2 (`/c2/c2-c08`) | conclusão do curso | 375 |
| Catálogo (`/cursos`) | disponíveis/bloqueados | 375, 1280 |

Cada estado foi verificado com:

- `document.documentElement.scrollWidth <= window.innerWidth`;
- captura visual inspecionada (não apenas assert);
- alvos de toque das alternativas e da rubrica ≥44 px;
- `lang="ko"` nos trechos coreanos (coberto pelos testes existentes e por inspeção);
- ausência de sobreposição da barra inferior no fim do conteúdo (o `main` reserva `padding-bottom`).

## 2. O que foi corrigido antes da captura final

As correções de shell e primitivas da fase 14 anterior foram integradas e reverificadas:

- `/revisao` e `/vocabulario/revisao`: um único `<h1>`, `PageHeader` só na visão geral e `ProgressBar` na sessão;
- `AccountCard` e `SyllableBuilder` compactados para a primeira dobra em 375–390 px;
- `LessonVocabulary` em duas linhas, sem `<div>` dentro de `<span>`, com botão de 44 px;
- `Plate` com `number` alinhado à linha de base do rótulo e sem colisão com as marcas de registro;
- `Button size="sm"`, rubrica de `ProductionTask`, sumário legal, rodapé e link do `c4` com ≥44 px;
- `BilingualText`/`lang="ko"` em títulos mistos e notas fonéticas;
- textos de A2/B1 e numeração `01`–`04` do catálogo;
- gutter mobile de 16 px e reflow sem overflow com fonte em 125%–150%.

## 3. Resultado da inspeção

- **0 rolagem horizontal** nas 7 lições × 5 larguras e nas 7 práticas × 3 larguras.
- As alternativas longas resultantes da correção de comprimento quebram linha e mantêm altura de toque; nenhuma ficou cortada em 320 px.
- O C2 em tema escuro mantém contraste de texto, bordas de foco e botão de conferir visíveis.
- A conclusão do C2 em 375 px mostra as 48 etapas, as métricas e os três CTAs sem overflow.
- O catálogo em 375 px mantém a numeração sequencial e os textos de desbloqueio corretos.
- A barra inferior é fixa e aparece uma vez na captura full-page (artefato do `fullPage`), mas o conteúdo tem `padding-bottom` suficiente e os controles ficam alcançáveis.

## 4. Testes de regressão

`e2e/visual-audit.spec.ts`:

1. captura intro/catálogo em 320/375/390/768/1280;
2. captura a primeira prática de Hangul e A1–C2 em 320/375/390, verifica alternativas ≥44 px e ausência de overflow;
3. captura a prática C2 em tema escuro em 375;
4. captura a conclusão do C2 em 375.

`e2e/mobile.spec.ts` cobre:

- 320 px e paisagem sem overflow nas páginas públicas e autenticadas;
- foco no enunciado, Enter e input de 16 px;
- `h1` único e controles acima da barra inferior em `/revisao` e `/vocabulario/revisao`;
- alvos ≥44 px em vocabulário, rubrica de produção e sumário legal;
- zoom de texto em 125% e 150% em 320/375 px.

A matriz completa do Playwright também executa `c1.spec.ts`, `c2.spec.ts`, `a1.spec.ts`, `a2.spec.ts`, `b1.spec.ts`, `b2.spec.ts` e `hangul.spec.ts` em WebKit 390, com axe claro/escuro nos fluxos principais.

## 5. Limitações

- iPhone/Chrome iOS, safe-area física, teclado nativo e VoiceOver/TalkBack não foram testados em aparelho real.
- WebKit automatizado não substitui Safari real.
- Axe não prova conformidade WCAG; não houve auditoria manual com leitor de tela.
- As capturas ficam fora do repositório; a verificação é reproduzível pelo spec, não pelo binário das imagens.
