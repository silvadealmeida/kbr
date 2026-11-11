# Pesquisa visual — Heron AI e linhagens de referência

> **Fase 7A — pesquisa e documentação.** Este arquivo registra o que foi observado, o que foi interpretado e o que é proposta original. Nenhum ativo, trecho de código, layout ou composição do Heron AI será copiado.
>
> Data da inspeção: 11/11/2026. Ambiente: Chromium via Playwright, viewport desktop 1440×900 e emulação mobile; artefatos brutos em `/tmp/opencode/heron/` (não versionados). O site muda; os números abaixo descrevem a versão observada nesta data.

## 1. Método e limites

1. Abrimos `https://heronaiapp.com/`, esperamos o carregamento, registramos DOM, CSS computado, folhas de estilo, scripts, fontes, cores, tamanhos de alvo e estrutura de rolagem.
2. Rolamos a página em passos, tiramos screenshots e observamos o comportamento com `prefers-reduced-motion: reduce`.
3. Lemos o CSS público e os scripts de terceiros carregados (Webflow, Lenis, GSAP, Swiper, Barba) para identificar **mecanismos**, não para reutilizar código.
4. Comparamos a experiência com o briefing `docs/design/pendenteDesign.md`, com o estado real do KBR e com restrições de acessibilidade, mobile e desempenho.

**Limites:** não tivemos acesso ao projeto Webflow, aos arquivos-fonte, ao design system interno, a métricas de campo ou a testes com usuários. Tudo que não pôde ser observado está marcado como **interpretação** ou **proposta**. Não afirmamos intenção de design do estúdio; descrevemos efeito observado.

## 2. O que foi verificado no Heron AI

### 2.1 Stack e comportamento de página

| Item | Observação verificada |
|---|---|
| Publicação | Webflow (HTML gerado, `webflow.js`, classes `w-*`) |
| Rolagem | Lenis 1.1.5 (scroll suave com interpolação) |
| Animação | GSAP 3.12.5 + ScrollTrigger; SplitText e TextPlugin 3.13.0 |
| Transições de página | Barba.js core + prefetch |
| Carrossel | Swiper 11 |
| 3D | **Nenhum** contexto WebGL; 1 elemento `<canvas>` presente, sem uso 3D observado |
| Vídeo/Lottie | 0 vídeos, 0 Lottie; a riqueza vem de SVG, tipografia e imagem |
| SVG | 144 elementos SVG no documento |
| Elementos transformados | 359 com transform ativo; 54 regras de animação |
| Seções sticky | 11 |
| Header | Fixo, com menu mobile próprio |
| Medição | `performance` local apenas; sem field data |

### 2.2 Paleta observada

Tokens declarados no `:root`:

```
--content--brand:      #FA3600   (laranja de sinalização)
--content--primary:    #282828   (quase-preto)
--content--secondary:  #414140
--content--surface:    #72726F
--content--border:     #B3B3AF
--content--disable:    #B4B4B0
--content--granite:    #626260
```

Fundos dominantes medidos: `#B3B3AF` (cinza-pedra), `#FA3600` (laranja), `#282828` (tinta), branco. Há textura de papel/ruído em SVG (`--bg-img`) e uma grade decorativa (`--bg-grid`). A paleta é deliberadamente dessaturada, com **um único acento saturado** usado como marca, alerta e foco.

> **Interpretação:** o cinza-pedra faz o papel de “papel de desenho”; o laranja funciona como marcação de revisão/obra, não como cor decorativa. O contraste texto/fundo depende de tamanhos grandes e pesos altos; textos pequenos em cinza médio ficam abaixo de AA em vários pontos.

### 2.3 Tipografia observada

| Elemento | Fonte | Tamanho / line-height | Detalhes |
|---|---|---|---|
| H1 | BT Grotesk 700 | 46,67 px / 46,67 px | uppercase, tracking −0,02em |
| Corpo | BT Grotesk 500 | 13,33 px / 17,33 px | tracking −0,02em, cor `rgba(40,40,40,.72)` |
| Rótulos | Geist Mono 500 | pequenos | uppercase, função de anotação técnica |

Famílias: **BT Grotesk** (display e texto) + **Geist Mono** (rótulos, coordenadas, legendas). A hierarquia não vem de muitas fontes, e sim de **escala, caixa alta, peso e espaço em branco**. Títulos muito grandes convivem com anotações minúsculas em mono — o contraste de escala é o principal gesto editorial.

### 2.4 Gramática visual observada

- **Prato técnico:** hairlines, cotas, marcas de registro, grids, numeração de seção, legendas em mono.
- **Scrollytelling:** uma seção sticky de aproximadamente 6.300 px de altura mantém um desenho/planta fixo enquanto o texto e as camadas mudam por etapas.
- **Revelação em etapas:** o desenho é construído por partes (linhas, medidas, rótulos), não por um único fade.
- **Callouts laranja:** violações/alertas aparecem como anotações de revisão sobre o desenho.
- **Medição arrastável:** o usuário pode arrastar para revelar cotas/comparações.
- **Cursor e leitura de coordenadas:** há um cursor customizado com leitura de posição — verificado como comportamento de ponteiro, não como conteúdo.
- **Preloader:** contador de porcentagem + lista de inicialização técnica.
- **Textura:** papel/ruído sutil por baixo do cinza; a superfície parece impressa, não “vidro”.
- **Imagem:** fotografia/recorte com tratamento dessaturado; o laranja aparece em pequenas áreas.

> **Interpretação:** a página encena o produto como uma **ferramenta de precisão dentro de um ateliê de desenho**. A metáfora é arquitetônica/industrial: planta, cota, revisão, obra. A tipografia e o mono vendem “instrumento”, não “curso”.

### 2.5 Movimento observado

- Entrada com preloader e contagem; conteúdo entra depois.
- Headlines com SplitText (linhas/palavras), reveals com máscara e deslocamento.
- Scrollytelling com pin/scrub: o desenho avança conforme a rolagem.
- Microinterações de hover em links, botões e cartões; cursor customizado.
- Transições entre páginas via Barba.
- **Com `prefers-reduced-motion: reduce`, o scrollytelling continuou animando.** Isso foi observado, não inferido. É uma falha de acessibilidade que o KBR **não** deve reproduzir.

### 2.6 Mobile observado

- Header compacto com menu; a navegação principal vira um painel.
- Muitos alvos de toque pequenos: **32 de 42 alvos medidos ficaram abaixo de 44 px**. O KBR exige ≥44–48 px.
- A experiência mobile preserva o scrollytelling, o que aumenta custo de rolagem e risco de conteúdo “preso”.
- Tipografia display continua grande; textos pequenos em cinza claro perdem legibilidade ao sol.

### 2.7 Privacidade e peso observados

- Scripts de analytics de terceiros: Microsoft Clarity, Mixpanel, Google Analytics; RUM via Netlify.
- CSS inicial ~39,5 KB transferidos; textura de fundo ~53 KB; imagens hero em WebP/AVIF de centenas de KB.
- Muitos SVGs e imagens acima da dobra; não é um orçamento compatível com a landing pública do KBR (meta atual <450 KB totais, 0 fontes coreanas, JS <260 KB).

## 3. O que foi interpretado (e não copiado)

| Impressão | Leitura para o KBR |
|---|---|
| “Precisão de instrumento” | Adotar a **gramática de prancha técnica**, mas aplicada a letras e sílabas, não a plantas/arquitetura. |
| “Papel impresso” | Adotar papel quente e tinta, com textura discreta; rejeitar cinzas de baixo contraste. |
| “Um acento de revisão” | Adotar o vermelho-selo como acento escasso (marca, foco, erro), não como cor de fundo de seções inteiras. |
| “Mono como anotação” | Adotar mono para medidas, IDs de lição, coordenadas de traço e metadados; nunca para parágrafos longos. |
| “Revelação em etapas” | Adotar **revelação progressiva com significado pedagógico**: traço → sílaba → som → uso. |
| “Scrollytelling” | Usar no máximo uma sequência curta e opcional na landing; nunca em lição, revisão ou conteúdo principal. |
| “Preloader cinematográfico” | Rejeitar. Atrasa a tarefa e cria ansiedade; o KBR abre direto no conteúdo. |
| “Cursor customizado” | Rejeitar. Prejudica toque, teclado e leitores de tela. |
| “Menu escondido” | Rejeitar no app. A navegação principal do KBR é visível e persistente. |

## 4. Linhagens de referência (não sites inspecionados)

Estas referências orientam vocabulário visual; não foram tratadas como benchmarks de interface nem copiadas.

1. **Desenho técnico e pranchas de engenharia/arquitetura** — hairlines, cotas, carimbos, marcas de registro, legenda, numeração. Fornece a estrutura, não o assunto.
2. **Tipografia coreana tradicional e Hunminjeongeum** — a letra como diagrama de traços e blocos; a sílaba como composição, não como ornamento. Base conceitual para a metáfora “Composição”.
3. **Editorial impresso suíço e livros de ensino de escrita** — grid, hierarquia, notas de margem, monotipia, contraste entre display e texto.
4. **Sinalização urbana e carimbos coreanos (도장)** — o selo vermelho como marca de autoria/verificação; uso escasso.
5. **Cerâmica celadon e papel hanji** — vocabulário cromático quente/frio (papel, tinta, celadon), sem literalismo folclórico.
6. **Material de alfabetização para adultos** — clareza, repetição, instrução em língua materna, ausência de infantilização.

## 5. O que o KBR deve absorver do Heron

1. **Disciplina de grid e hierarquia por escala**, não por excesso de cores ou cartões.
2. **Um acento cromático com função** (selo/revisão) sobre uma base neutra quente.
3. **Mono para metadados e anotações**, criando a sensação de instrumento editorial.
4. **Revelação em camadas com significado**: cada camada ensina algo (traço, parte, som, exemplo).
5. **Superfície com materialidade discreta** (papel, tinta), sem custo de imagem.
6. **Contraste entre display e anotação** — títulos grandes, dados pequenos e precisos.

## 6. O que o KBR deve rejeitar explicitamente

| Prática observada | Por que rejeitar |
|---|---|
| Scroll hijack/Lenis + pin de 6.300 px | Prejudica mobile, teclado, leitores de tela e reduz movimento; aumenta o custo de manutenção. |
| Preloader com contador | Não há espera real a justificar; atrasa a primeira tarefa. |
| Cursor customizado e coordenadas | Inacessível por toque/teclado; ruído sem valor pedagógico. |
| Texto pequeno em cinza médio | Falha de contraste; o público inclui iniciantes e leitores em telas ao sol. |
| Alvos < 44 px | Viola o requisito mobile-first do projeto. |
| Movimento ignorando `prefers-reduced-motion` | Inaceitável; o KBR já tem suíte de reduced motion. |
| Analytics de terceiros por padrão | Contraria a política de privacidade e o orçamento de desempenho do KBR. |
| Metáfora arquitetônica literal | Copiaria a assinatura conceitual do Heron; o KBR precisa de identidade própria. |
| Muitas imagens acima da dobra | Estoura o orçamento da landing e piora LCP em 3G/4G. |

## 7. Conclusão da pesquisa

O Heron AI oferece uma **gramática** valiosa — precisão editorial, mono, papel, um acento de revisão, revelação em camadas —, mas a sua **encenação** (arquitetura, scroll pinado, preloader, cursor) é incompatível com um app de estudo mobile-first, acessível e de baixo peso.

A oportunidade do KBR não é “fazer um Heron de coreano”. É deslocar a mesma família de sinais para um território próprio: **a letra como objeto de oficina**. Onde o Heron desenha plantas, o KBR desenha traços, sílabas e blocos. Onde o Heron mede espaços, o KBR mede sons. Onde o Heron revisa uma obra, o KBR revisa uma hipótese de leitura.

Essa tese está desenvolvida em `creative-direction.md`; os tokens e componentes, em `design-system-spec.md`; o movimento, em `motion-design-spec.md`; e as interações de Hangul, em `hangul-interaction-concepts.md`.

## 8. Fontes consultadas

**Inspecionadas diretamente**

- `https://heronaiapp.com/` — DOM, CSS computado, scripts, fontes, cores, alvos, comportamento de rolagem, reduced motion, mobile.
- CSS público do Webflow e scripts de Lenis/GSAP/Barba/Swiper carregados pela página.
- Documentação local do Next.js 16.4.6 em `node_modules/next/dist/docs/` — guia de View Transitions e boas práticas de acessibilidade/movimento.
- Código e documentos do próprio KBR: `docs/design/pendenteDesign.md`, `docs/architecture.md`, `docs/roadmap.md`, `src/app/globals.css`, landing, player, catálogo, painel, revisão, `Nav.tsx`, `e2e/performance.spec.ts`, `docs/offline-pwa-decision.md`.

**Consultadas como referência conceitual (sem inspeção de interface)**

- Norma WCAG 2.2 (contraste, alvos, movimento, foco).
- Especificações CSS de `prefers-reduced-motion`, `scroll-driven animations` e View Transitions.
- Materiais públicos sobre Hunminjeongeum e composição de Hangul (conceito histórico, não conteúdo de curso).
- Documentação pública da GSAP sobre licenciamento (plugins gratuitos desde 2025), usada apenas para a decisão de “não adicionar dependência agora”.

**Artefatos locais da inspeção (não versionados)**

```
/tmp/opencode/heron/meta.json
/tmp/opencode/heron/palette-type.json
/tmp/opencode/heron/map-structure.json
/tmp/opencode/heron/desktop-scroll-01.png … desktop-scroll-0N.png
/tmp/opencode/heron/after-nav.png
/tmp/opencode/heron/desktop-reduced-top.png
```
