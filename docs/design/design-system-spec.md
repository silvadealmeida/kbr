# Design system — especificação

> Fase 7A. Especificação normativa para a implementação da 7B+. Tokens, tipografia, layout, componentes e regras de acessibilidade. A implementação deve seguir este documento; divergências exigem atualização registrada aqui.

## 1. Princípios técnicos

1. **Semântico antes de literal.** Componentes usam `surface`, `ink`, `line`, `brand`, `success` — não `gray-100`, `green-700`.
2. **Poucos tokens, bem usados.** Uma escala curta força consistência.
3. **Compatibilidade durante a migração.** Os tokens atuais (`--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--brand`, `--brand-fg`, `--accent-soft`) continuam válidos como aliases até a 7G.
4. **CSS primeiro.** Nada de biblioteca de componentes ou CSS-in-JS. Tailwind 4 + CSS custom properties + SVG inline.
5. **Contraste é requisito, não estética.** Toda combinação texto/fundo precisa passar AA; a maioria passa AAA.
6. **Nenhum hex solto em componente.** Exceção: cores dinâmicas de dados/ilustração, documentadas.

## 2. Tokens de cor

### 2.1 Primitivos (não usar diretamente em componentes)

| Nome | Hex | Uso |
|---|---|---|
| `paper-50` | `#FBF7EC` | superfície elevada clara |
| `paper-100` | `#F4EFE3` | fundo claro |
| `paper-200` | `#EAE3D3` | fundo alternativo/soft |
| `paper-300` | `#D8D0BF` | linhas decorativas |
| `ink-900` | `#201E19` | texto principal claro |
| `ink-700` | `#5C574C` | texto secundário claro |
| `ink-500` | `#6B6255` | texto terciário claro |
| `seal-600` | `#C33A22` | marca/erro claro |
| `seal-700` | `#A02E17` | erro textual claro |
| `celadon-700` | `#2E6A5B` | apoio/sucesso claro |
| `celadon-800` | `#1F4E42` | sucesso textual claro |
| `night-950` | `#101512` | fundo escuro |
| `night-900` | `#171E1A` | superfície escura |
| `night-800` | `#1F2A24` | superfície alternativa escura |
| `night-700` | `#33413A` | linhas escuras |
| `bone-100` | `#F2EDE2` | texto principal escuro |
| `bone-300` | `#B4AFA3` | texto secundário escuro |
| `coral-400` | `#FF8A70` | marca/erro escuro |
| `mint-300` | `#8FD3BE` | apoio/sucesso escuro |

### 2.2 Semânticos — tema claro

| Token | Valor | Par de contraste | Ratio |
|---|---|---|---|
| `--bg` | `#F4EFE3` | `--fg` `#201E19` | **14,51** |
| `--surface` | `#FBF7EC` | `--fg` `#201E19` | 15,56 |
| `--surface-2` | `#EAE3D3` | `--fg` `#201E19` | 13,03 |
| `--fg` | `#201E19` | `--bg` | 14,51 |
| `--muted` | `#5C574C` | `--bg` | **6,26** |
| `--faint` | `#6B6255` | `--bg` | 5,22 |
| `--line` | `#D8D0BF` | decorativo | — |
| `--line-strong` | `#B9AF9B` | decorativo (marcas/linhas) | 1,89 |
| `--brand` | `#C33A22` | `--bg` / branco sobre brand | **4,64** / 5,32 |
| `--brand-fg` | `#FFFFFF` | `--brand` | 5,32 |
| `--accent` | `#2E6A5B` | `--bg` | **5,50** |
| `--success` | `#1F4E42` | `--bg` | 8,22 |
| `--success-soft` | `#DCEAE3` | `--success` | 7,6 |
| `--danger` | `#A02E17` | `--bg` | 6,32 |
| `--danger-soft` | `#F3DDD6` | `--danger` | 5,56 |
| `--warning` | `#7A4E00` | `--bg` | 6,27 |
| `--warning-soft` | `#F0E4C8` | `--warning` | 5,7 |
| `--focus` | `#2E6A5B` | `--bg` | 5,50 |
| `--selection` | `#E8CDBF` | `--fg` | 11,03 |

> `--line-strong` é decorativo e não atinge 3:1. Controles que dependem de borda (inputs, botões secundários, seleção) usam `--muted` ou `--accent` para o contorno essencial, garantindo 3:1.

### 2.3 Semânticos — tema escuro (“mesa de luz”)

| Token | Valor | Par de contraste | Ratio |
|---|---|---|---|
| `--bg` | `#101512` | `--fg` `#F2EDE2` | **15,81** |
| `--surface` | `#171E1A` | `--fg` | 14,54 |
| `--surface-2` | `#1F2A24` | `--fg` | 12,71 |
| `--fg` | `#F2EDE2` | `--bg` | 15,81 |
| `--muted` | `#B4AFA3` | `--bg` | **8,44** |
| `--faint` | `#A8A296` | `--bg` | 7,27 |
| `--line` | `#33413A` | decorativo | — |
| `--line-strong` | `#4A5A51` | decorativo (marcas/linhas) | 2,52 |
| `--brand` | `#FF8A70` | `--bg` / `--bg` sobre brand | **8,02** / 8,02 |
| `--brand-fg` | `#101512` | `--brand` | 8,02 |
| `--accent` | `#8FD3BE` | `--bg` | **10,75** |
| `--success` | `#8FD3BE` | `--bg` | 10,75 |
| `--success-soft` | `#1C3A31` | `--success` | 7,2 |
| `--danger` | `#FF8A70` | `--bg` | 8,02 |
| `--danger-soft` | `#3A211C` | `--danger` | 6,45 |
| `--warning` | `#F0C36A` | `--bg` | 11,18 |
| `--warning-soft` | `#332917` | `--warning` | 8,65 |
| `--focus` | `#8FD3BE` | `--bg` | 10,75 |

> Fundos “soft” de feedback não são usados como fundo de texto pequeno sem novo teste. Sempre combinar ícone + rótulo + cor.

### 2.4 Regras de uso

- **Vermelho-selo** é acento, não fundo de página. Área máxima orientativa: 5% da viewport.
- **Celadon** é a cor de apoio: links, progresso, foco, sucesso.
- **Nunca** usar `--brand` para erro e sucesso ao mesmo tempo sem rótulo/ícone. Erro usa `--danger` (texto), não o selo decorativo.
- **Gradientes** só em uma camada de fundo da landing, com dois stops próximos; nunca em botões.
- **Sombras** não substituem bordas. Máximo de uma sombra “de impressão” por superfície.
- **Dark mode** não é inversão automática: superfícies têm hierarquia própria e o acento é mais luminoso.

## 3. Tipografia

### 3.1 Famílias

| Token | Família | Pesos | Onde |
|---|---|---|---|
| `--font-display` | Archivo (variable) | 400–700 | títulos, UI, botões |
| `--font-body` | Archivo + stack do sistema | 400/500 | corpo |
| `--font-mono` | IBM Plex Mono | 400/500 | rótulos, números, metadados |
| `--font-ko` | Noto Sans KR (existente) | 400/700 | conteúdo coreano |

Fallbacks:

```css
--font-display: "Archivo", "Helvetica Neue", Arial, sans-serif;
--font-body: "Archivo", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Consolas, monospace;
--font-ko: var(--font-kr), "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
```

**Carregamento:** Archivo variável via `next/font/google` com subset `latin`, `display: swap`, `preload: false` no layout raiz e `preload: true` apenas onde é LCP (landing/hero). IBM Plex Mono 400 com `preload: false`, carregada sob demanda. Noto Sans KR permanece restrita a `(app)`, `preload: false`. Nenhuma fonte coreana na landing pública.

> **Migração do corpo:** na 7B, Archivo entra em display/UI; o texto corrido pode continuar na stack do sistema até a medição de LCP/CLS. A troca do corpo para Archivo é o alvo, mas só acontece se o orçamento e a legibilidade forem preservados.

> **Orçamento:** Archivo ~32–38 KB woff2 + Plex Mono ~16–20 KB. A landing pode chegar a ~290 KB totais, ainda abaixo de 450 KB. O teste `e2e/performance.spec.ts` precisa ser atualizado de “0 fontes” para “≤2 arquivos, ≤60 KB” de forma intencional e documentada.

### 3.2 Escala

| Token | Tamanho | Line-height | Tracking | Uso |
|---|---|---|---|---|
| `display-xl` | `clamp(2.75rem, 9vw, 5.5rem)` | `0,94` | `-0,035em` | hero da landing |
| `display-lg` | `clamp(2.25rem, 6vw, 3.75rem)` | `1,00` | `-0,03em` | títulos de seção |
| `h1` | `clamp(1.75rem, 4vw, 2.5rem)` | `1,08` | `-0,02em` | título de página |
| `h2` | `clamp(1.375rem, 3vw, 1.75rem)` | `1,2` | `-0,015em` | seção |
| `h3` | `1.125rem` | `1,35` | `0` | cartão/subseção |
| `body-lg` | `1.125rem` | `1,65` | `0` | introdução |
| `body` | `1rem` | `1,6` | `0` | texto padrão |
| `small` | `0.875rem` | `1,5` | `0` | apoio |
| `caption` | `0.75rem` | `1,4` | `0,01em` | legendas |
| `mono-label` | `0.6875rem` | `1,3` | `0,14em`, uppercase | rótulos técnicos |
| `mono-data` | `0.8125rem` | `1,4` | `0,02em` | métricas/IDs |

Regras:

- Corpo mínimo **16 px** em mobile; inputs **16 px** (evita zoom no iOS).
- Títulos em pt-BR podem usar caixa alta com moderação; nunca parágrafos inteiros.
- Não usar `text-align: justify`.
- Largura de leitura: **60–68ch**.
- Números em métricas: `font-variant-numeric: tabular-nums`.

### 3.3 Coreano

```css
.ko {
  font-family: var(--font-ko);
  font-size: 1.12em;
  line-height: 1.35;
  letter-spacing: 0;
  word-break: keep-all;
}
```

- Sempre `lang="ko"` no elemento que contém Hangul.
- Hangul display pode ser maior que o texto latino equivalente (1,1–1,25×).
- Romanização: `--font-mono`, `font-size: .875em`, cor `--muted`, nunca ao lado sem separação.
- Não aplicar `text-transform` em coreano.
- Evitar itálico sintético em Hangul.

## 4. Espaçamento e layout

### 4.1 Escala

Base 4 px. Tokens: `0, 1(4), 2(8), 3(12), 4(16), 5(20), 6(24), 8(32), 10(40), 12(48), 16(64), 20(80), 24(96), 32(128)`.

| Contexto | Mobile | Desktop |
|---|---|---|
| Gutters | 16 px | 24–32 px |
| Seção vertical | 48–64 px | 80–112 px |
| Padding de cartão | 20 px | 24–32 px |
| Stack entre título e texto | 8–12 px | 12–16 px |
| Stack entre blocos | 24 px | 32 px |
| Bottom nav | 56 px + safe-area | — |
| Sidebar | — | 240 px |

### 4.2 Grid e larguras

- `--container-content: 1120px`; `--container-wide: 1280px`; `--container-reading: 68ch`.
- App autenticado: sidebar 240 px + conteúdo com `max-width: 960px`, centralizado, gutter 24–40 px.
- Landing: grid de 12 colunas em ≥1024 px; 4 colunas em mobile. Assimetria permitida (7/5, 8/4), nunca centrada em tudo.
- Cards de exercício: largura máxima 720 px.
- Player: coluna única, `max-width: 680px`; ações fixas no rodapé em mobile (acima da safe-area).
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Mobile-first.

### 4.3 Z-index

| Camada | Valor |
|---|---|
| conteúdo | 0 |
| sticky header | 20 |
| bottom nav | 30 |
| sheet/dialog backdrop | 40 |
| dialog/sheet | 50 |
| toast/notice | 60 |
| skip link | 70 |

## 5. Forma, borda e elevação

| Token | Valor | Uso |
|---|---|---|
| `--radius-xs` | `4px` | selos, tags |
| `--radius-sm` | `8px` | inputs, botões pequenos |
| `--radius-md` | `12px` | cartões, blocos de exercício |
| `--radius-lg` | `16px` | painéis |
| `--radius-xl` | `24px` | hero/landing |
| `--radius-pill` | `999px` | chips, badges |

- Botões principais: raio 8–10 px (não pill), para o tom editorial.
- Cartões: 12 px; landing hero: 20–24 px.
- Bordas: 1 px `--line`; 1,5 px para controles; 3 px no foco.
- **Sombra de impressão:** `0 1px 0 rgba(32,30,25,.06), 0 12px 32px -24px rgba(32,30,25,.35)`; usar só em hero, sheet e selo.
- Proibido: `backdrop-filter`, sombras coloridas, múltiplas sombras por card.

### Textura de papel

- Apenas em `body` público e em superfícies `paper`.
- SVG `feTurbulence` estático em data URI ≤2 KB ou PNG tile ≤1,5 KB; opacidade 0,02–0,03; `pointer-events: none`.
- Não repetir em cada card; uma camada global basta.
- Em dark, textura quase invisível (0,015) ou ausente.

## 6. Iconografia e ilustração

- Ícones: SVG inline, traço 1,5 px, `currentColor`, 20/24 px, sem biblioteca.
- Ícones de navegação: Hangul existente como marca (`font-ko`) **ou** pictograma simples; manter consistência. Não misturar emoji.
- Ilustrações de Hangul: geométricas, monocromáticas, com camadas de cor semântica:
  - tinta = traço;
  - celadon = som/vogal;
  - selo = erro/atenção;
  - papel = espaço.
- Marcas de registro: 4 cantos, 8 px, traço 1 px, `--line-strong`.
- Selo: círculo 64–96 px, borda 2 px, texto em mono, rotação −6°; apenas em conclusão.
- Nunca usar ilustração para substituir texto essencial.

## 7. Componentes

### 7.1 Button

**Variantes:** `primary` (fundo `--fg`, texto `--bg`), `secondary` (fundo `--surface`, borda `--muted`), `ghost` (sem fundo), `danger` (fundo `--danger`, texto branco/`--bg`), `link`.

**Tamanhos:** `sm` 40 px (apenas desktop/secundário), `md` 48 px, `lg` 52 px. Largura mínima 44 px; no mobile, botão primário ocupa 100% quando é a ação principal.

**Estados:** default, hover (escurece 6%), active (translada 1 px), focus-visible (outline 3 px `--focus`, offset 2), disabled (opacidade .45 + `cursor: not-allowed`), loading (spinner 16 px + texto “Conferindo…” e `aria-busy`).

**Regras:** um primário por tela; não usar cor como único indicador de estado; ícone opcional à esquerda, 18 px.

### 7.2 Card / Plate

- **Card padrão:** `--surface`, borda 1 px, raio 12, padding 20–24, sem sombra.
- **Plate (prancha):** card com marcas de registro nos cantos, número de lâmina no topo direito, usado em lições e materiais.
- **Interactive:** hover com borda `--accent`, sem levantar 8 px; foco visível no card inteiro.
- **Empty/error:** mesma moldura, conteúdo centralizado, ação clara.

### 7.3 Field / Input

- Label acima, 14 px, peso 500; obrigatório indicado por texto, não só asterisco.
- Input 48 px, raio 8, borda 1,5 px `--muted`; foco `--accent` 2 px + outline.
- Fonte 16 px; `enterKeyHint` quando aplicável.
- Erro: borda `--danger`, texto 14 px com ícone e `aria-describedby`.
- Ajuda: 13 px `--muted`, acima da ação.
- Nunca placeholder como label.

### 7.4 Choice / Option

- Altura mínima 48 px; layout em coluna no mobile, grid 2 colunas em ≥640 px quando os rótulos forem curtos.
- **Selecionado:** borda 2 px `--accent`, fundo `--surface-2`, check visível.
- **Correto:** borda 2 px `--success`, fundo `--success-soft`, ícone ✓ + texto “Correto”.
- **Errado:** borda 2 px `--danger`, fundo `--danger-soft`, ícone ✕ + texto “Ainda não”.
- Estado nunca depende só de cor; o texto do resultado também aparece.
- Desabilitado após envio, com `aria-disabled` e opacidade .6.

### 7.5 Progress / Ruler

- Trilha 6 px, `--line`; preenchimento `--accent`; raio pill.
- Rótulo textual sempre presente (`4 de 25`, `62%`); `aria-valuetext`.
- Marcas de unidade a cada 5 lições; não usar arco/anel.
- Em conclusão, o progresso vira **régua de leitura** com 25 marcas.

### 7.6 Badge / Seal

- **Badge semântico:** retângulo 4 px, mono-label, fundo `--surface-2`, texto `--muted`; estados success/danger/warning.
- **Seal:** carimbo visual, `aria-hidden` quando decorativo; o texto equivalente fica em `sr-only` ou no heading.
- **Status de sincronização:** “Salvo neste dispositivo”, “Sincronizado”, “Sem conexão”; ícone + texto; nunca só bolinha.

### 7.7 Nav

**Mobile (＜768):** header 56 px com marca + tema + conta; bottom nav 56 px + safe-area, 5 itens, ícone 20 px + label 11 px, indicador ativo 3 px no topo, `aria-current="page"`.

**Desktop (≥768):** sidebar 240 px fixa, marca no topo, 5 links 48 px, ativo com barra 3 px à esquerda + fundo `--surface-2`, conta no rodapé.

**Regras:** navegação sempre visível; sem menu hambúrguer no app; skip link para `main`; foco no conteúdo após navegação.

### 7.8 Notice / Toast

- `role="status"` para informação; `role="alert"` apenas para erro bloqueante.
- Borda esquerda 3 px semântica + ícone + texto.
- Toast no topo, abaixo do header, 16 px de margem, fecha com botão e Escape; some em 6 s apenas se não for erro.
- Nunca cobrir a ação principal no mobile.

### 7.9 Dialog / Sheet

- Mobile: bottom sheet com raio 16 no topo, arraste opcional, foco preso, Escape fecha.
- Desktop: dialog central 480 px.
- Backdrop `rgba(16,21,18,.5)`; sem blur.
- Título com `aria-labelledby`, descrição com `aria-describedby`.
- Foco retorna ao gatilho ao fechar.

### 7.10 Stat / Data

- Número grande em `--font-display` 700, 32–40 px, tabular.
- Rótulo mono-label acima; dica em `caption`.
- Nunca usar gráfico decorativo sem tabela/equivalente textual.
- Sequência (streak) só com dados reais; estado vazio explícito.

## 8. Implementação CSS

### 8.1 Tokens em `globals.css`

```css
:root {
  --paper-50: #fbf7ec;
  --paper-100: #f4efe3;
  --paper-200: #eae3d3;
  --paper-300: #d8d0bf;
  --ink-900: #201e19;
  --ink-700: #5c574c;
  --ink-500: #6b6255;
  --seal-600: #c33a22;
  --seal-700: #a02e17;
  --celadon-700: #2e6a5b;
  --celadon-800: #1f4e42;

  --bg: var(--paper-100);
  --surface: var(--paper-50);
  --surface-2: var(--paper-200);
  --fg: var(--ink-900);
  --muted: var(--ink-700);
  --faint: var(--ink-500);
  --line: var(--paper-300);
  --line-strong: #b9af9b;
  --brand: var(--seal-600);
  --brand-fg: #fff;
  --accent: var(--celadon-700);
  --success: var(--celadon-800);
  --success-soft: #dceae3;
  --danger: var(--seal-700);
  --danger-soft: #f3ddd6;
  --warning: #7a4e00;
  --warning-soft: #f0e4c8;
  --focus: var(--celadon-700);
  --selection: #e8cdbf;
}

.dark {
  --bg: #101512;
  --surface: #171e1a;
  --surface-2: #1f2a24;
  --fg: #f2ede2;
  --muted: #b4afa3;
  --faint: #a8a296;
  --line: #33413a;
  --line-strong: #4a5a51;
  --brand: #ff8a70;
  --brand-fg: #101512;
  --accent: #8fd3be;
  --success: #8fd3be;
  --success-soft: #1c3a31;
  --danger: #ff8a70;
  --danger-soft: #3a211c;
  --warning: #f0c36a;
  --warning-soft: #332917;
  --focus: #8fd3be;
  --selection: #3a4a41;
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-faint: var(--faint);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-brand: var(--brand);
  --color-brand-fg: var(--brand-fg);
  --color-accent: var(--accent);
  --color-success: var(--success);
  --color-success-soft: var(--success-soft);
  --color-danger: var(--danger);
  --color-danger-soft: var(--danger-soft);
  --color-warning: var(--warning);
  --color-warning-soft: var(--warning-soft);
  --font-sans: var(--font-archivo), system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;
  --font-ko: var(--font-kr), "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
}
```

> `--font-archivo`, `--font-plex-mono` e `--font-kr` são as variáveis geradas por `next/font`. Não criar auto-referência (`--font-mono: var(--font-mono)`): no Tailwind 4, o token de tema e a variável de origem precisam ter nomes distintos.

### 8.2 Classes de componente

Usar `@layer components` apenas para padrões repetidos (`.plate`, `.seal`, `.field`, `.choice`). O resto é utilitário Tailwind. Não criar `@apply` para tudo: dificulta leitura e aumenta CSS.

### 8.3 Migração

1. **Fase 7B:** introduzir tokens novos como aliases, sem mudar a aparência; validar contraste e testes.
2. **Fase 7C:** landing e navegação com a nova tipografia/cor.
3. **Fase 7D:** lição/checkpoint/revisão.
4. **Fase 7E:** painel/catálogo/conclusão.
5. **Fase 7F:** movimento e ilustrações.
6. **Fase 7G:** remover tokens antigos, atualizar testes de performance e documentação.

## 9. Acessibilidade

### 9.1 Requisitos

- **Contraste:** texto normal ≥4,5:1; texto grande ≥3:1; componentes/estados ≥3:1. A tabela da seção 2 serve como referência; qualquer par novo precisa de cálculo.
- **Alvos:** ≥44×44 px (ideal 48). Exceção: links inline em texto.
- **Foco:** sempre visível, 3 px, offset 2, nunca removido. Em fundo colorido, usar anel claro.
- **Teclado:** toda ação acessível; ordem lógica; Escape fecha overlays; foco preso em dialog/sheet.
- **Leitor de tela:** landmarks, headings hierárquicos, `aria-current`, `aria-live` para feedback, `aria-valuetext` em progresso.
- **Cor:** nunca único canal. Estados usam ícone + texto + cor.
- **Movimento:** `prefers-reduced-motion` remove transformações e autoplay; ver `motion-design-spec.md`.
- **Zoom:** 200% sem perda de função; reflow a 320 px.
- **Texto:** suportar espaçamento de texto WCAG (line-height 1,5; paragraph 2; letter 0,12em; word 0,16em).
- **Coreano:** `lang="ko"`; leitores de tela pronunciam corretamente.
- **Formulários:** labels explícitos, erros associados, instruções antes do campo.
- **Áudio:** todo áudio tem texto equivalente e controle; nunca autoplay.

### 9.2 Testes obrigatórios por área

- axe `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` (já usado no projeto).
- Navegação só por teclado (Tab/Shift+Tab/Enter/Escape).
- Leitor de tela manual (VoiceOver no iPhone; NVDA no desktop) — pendência manual.
- Contraste calculado para tokens e estados.
- Reduced motion em Chromium e WebKit.
- Viewport 320/375/390/768/1280.

## 10. Desempenho

| Recurso | Orçamento | Observação |
|---|---|---|
| CSS da landing | ≤20 KB transferidos | hoje ~6,9 KB; folga para tokens/componentes |
| JS da landing | ≤260 KB | orçamento atual mantido |
| Fontes da landing | ≤2 arquivos / ≤60 KB | Archivo + Plex Mono; sem coreano |
| Textura | ≤2 KB | SVG/PNG tile; sem imagem grande |
| Ícones | 0 KB de biblioteca | SVG inline |
| Imagens | ≤120 KB acima da dobra | AVIF/WebP, `srcset` |
| CLS | <0,1 | fontes com `size-adjust`/fallback |
| LCP | <2,5 s em 4G | herói tipográfico, sem imagem pesada |
| Animações | 60 fps; só `transform`/`opacity` | nada de animar layout |

**Regra:** nenhuma dependência nova de UI, animação ou ícones nesta fase. Se uma necessidade não puder ser resolvida com CSS/SVG/WAAPI, registrar a decisão antes de instalar.

## 11. Governança

- Mudança de token = atualização deste documento + verificação de contraste + screenshot comparativo.
- Componente novo = anatomia, estados e critérios de aceite documentados em `component-redesign-plan.md`.
- Exceção visual = comentário no código com motivo e prazo de revisão.
- Toda página deve funcionar sem JavaScript para leitura de conteúdo essencial (progressive enhancement), exceto exercícios interativos.
- Nenhum texto essencial dentro de SVG/Canvas/imagem.
- Revisão de acessibilidade antes de cada fase concluída.

## 12. Critérios de aceite do design system

1. Todos os pares texto/fundo usados passam AA; os principais passam AAA.
2. Nenhum componente usa hex fora dos tokens.
3. Botões, inputs e itens de navegação medem ≥44 px.
4. Foco visível em todos os controles, inclusive cards interativos.
5. Tema claro e escuro têm hierarquia equivalente e contraste ≥7:1 no texto principal.
6. Landing com ≤2 fontes, ≤20 KB de CSS e ≤450 KB totais.
7. Componentes existentes podem ser migrados sem alterar comportamento, rotas ou dados.
