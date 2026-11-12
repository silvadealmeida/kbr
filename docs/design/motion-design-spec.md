# Movimento — especificação

> Fase 7A. O movimento no KBR existe para **explicar uma mudança de estado**, não para impressionar. Este documento define princípios, tokens, coreografias por área, implementação e limites de acessibilidade/desempenho.

## 1. Princípios

1. **Movimento é informação.** Se a animação não ajuda a entender “o que mudou”, ela não entra.
2. **Curto por padrão.** 140–240 ms resolvem quase tudo. 600 ms é exceção cinematográfica.
3. **Interrompível.** O usuário pode agir antes do fim; nada bloqueia input.
4. **Sem sequestro.** Nada de scroll hijack, pin de página, cursor customizado ou autoplay de áudio.
5. **Reduced motion é um modo de primeira classe.** Não é “desligar tudo”: é remover deslocamento, escala, parallax e stagger, preservando feedback instantâneo.
6. **60 fps ou não existe.** Apenas `transform` e `opacity`; nada de animar `height`, `top`, `filter` ou `box-shadow` em loop.
7. **Uma coisa de cada vez.** No máximo 3 elementos animando em paralelo, exceto a sequência de conclusão.

## 2. Tokens

```css
:root {
  --motion-instant: 80ms;
  --motion-fast: 140ms;
  --motion-base: 220ms;
  --motion-slow: 360ms;
  --motion-cinematic: 640ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring-soft: cubic-bezier(0.34, 1.4, 0.64, 1); /* só selo/marco */
}
```

| Token | Uso |
|---|---|
| `instant` | hover/press, troca de ícone, foco |
| `fast` | toast, tooltip, chip, nav ativa |
| `base` | feedback de exercício, entrada de card, progresso |
| `slow` | transição de página, painel, conclusão de etapa |
| `cinematic` | apenas hero da landing e conclusão do curso |

**Regra:** nunca usar `linear` em movimento de interface; `linear` só em rotação de spinner.

## 3. Coreografias por área

### 3.1 Navegação e transições de rota

- **Entrada de página:** fade 180 ms + translateY 8 px, `ease-enter`.
- **Saída:** fade 120 ms, `ease-exit`.
- **Elemento compartilhado:** usar `<ViewTransition name="...">` para o cartão da lição → cabeçalho da lição, e para o selo de conclusão. Não animar a página inteira em avanço de exercício.
- **Voltar/avançar:** direção sutil (8 px) via `transitionTypes={['nav-forward']}` / `['nav-back']` em links; sem slide de 100%.
- **Navegação mobile:** indicador ativo desliza 160 ms; labels não animam.
- **Troca de tema:** sem transição de cores global (evita flash e repaint); apenas ícone sol/lua faz crossfade 120 ms.

### 3.2 Landing

- **Hero:** uma sequência de entrada, uma vez por sessão: título em 2 linhas com máscara (240 ms, stagger 60 ms), bloco de Hangul desenhado por stroke-dashoffset (900 ms, `ease-standard`), anotações em fade (200 ms). Total ≤1,2 s, sem bloquear interação.
- **Scroll:** revelar seções com IntersectionObserver: opacidade 0→1 + 12 px, 300 ms, uma vez. Sem pin, sem scrub, sem parallax.
- **Hangul do herói:** SVG outline (não fonte) para manter 0 fontes coreanas. Em reduced motion, aparece completo.
- **Sem preloader.** O conteúdo pinta imediatamente; a animação é progressiva.

### 3.3 Lição e checkpoint

| Evento | Movimento | Duração |
|---|---|---|
| Selecionar opção | borda/fundo + check, sem deslocamento | 140 ms |
| Conferir | botão vira “Conferindo…”, spinner 16 px | 140 ms |
| Resultado correto | resultado entra 8 px + selo “CORRETO” carimba (scale 1,06→1) | 220 ms |
| Resultado incorreto | resultado entra 8 px; **sem shake**; borda + ícone + texto | 220 ms |
| Avançar | conteúdo antigo sai 80 ms, novo entra 180 ms | 260 ms |
| Barra de progresso | largura anima 360 ms | 360 ms |
| Foco no resultado | sem animação; foco imediato | 0 ms |

**Nunca:** confete, partículas, som automático, contagem de pontos animada, bloqueio do botão “Continuar” durante animação.

**Status 7D:** o feedback entra com fade + 8 px por `feedback-enter` (220 ms) apenas em `prefers-reduced-motion: no-preference`; o selo é estático (não há “carimbo” com escala) para não atrasar a leitura. A barra de progresso anima a largura, mas o valor textual/`aria-valuetext` está disponível imediatamente. O foco no resultado é imediato e usa margem de rolagem para não deixar “Continuar” atrás da nav inferior/safe-area. Não há transição entre itens além da troca de conteúdo; a seleção de alternativa muda borda/fundo em 140 ms. A conclusão final do curso continua reservada à 7F.

### 3.4 Revisão (Leitner)

- Virada do cartão: 280 ms, `rotateY` 0→180; metade da duração mostra a resposta. Em reduced motion, troca instantânea com fade de 80 ms.
- Após responder: cartão sai para a esquerda (-16 px, 180 ms) e o próximo entra (16 px, 220 ms).
- Contador “3 de 12” atualiza sem animação de número; barra anima 220 ms.
- Estado de sincronização: ícone estático + texto; nenhum pulso infinito. Spinner só durante envio real.

### 3.5 Painel

- Cards entram com stagger de 40 ms, máximo 6 itens, 240 ms.
- Números não fazem count-up; valores reais aparecem imediatamente.
- Barra de progresso anima uma vez ao montar (360 ms); em navegação subsequente, sem animação.
- Atualização após revisão: crossfade 140 ms no valor, sem mover layout.

### 3.6 Conclusão do curso

- Sequência única: régua de 25 marcas preenche (600 ms), selo carimba (360 ms), título entra (240 ms).
- Total ≤1,2 s; botão “Rever meu percurso” disponível desde o início.
- Em reduced motion: tudo estático, com o selo já visível.
- A sequência roda uma vez por sessão de conclusão; revisitar não repete.

### 3.7 Microinterações

| Elemento | Movimento |
|---|---|
| Botão hover | cor 120 ms; sem levantar |
| Botão press | `scale(.99)` 80 ms |
| Link | sublinhado 120 ms |
| Card interativo | borda 140 ms; sem sombra/translate |
| Toast | entra 12 px + fade 180 ms; sai 140 ms |
| Sheet | sobe 240 ms `ease-enter`; backdrop fade 180 ms |
| Acordeão | altura via grid-template-rows 220 ms (com cuidado) ou instante + fade |
| Tema | ícone crossfade 120 ms; cores instantâneas |

## 4. Implementação

### 4.1 CSS primeiro

```css
@media (prefers-reduced-motion: no-preference) {
  .enter {
    animation: enter var(--motion-base) var(--ease-enter) both;
  }
  @keyframes enter {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
}
```

- Animações de entrada usam `animation-fill-mode: both` e são declaradas apenas dentro de `no-preference`.
- Não usar `transition: all`. Liste propriedades.
- `will-change` apenas durante a animação e removido depois; nunca em listas grandes.

### 4.2 View Transitions (React 19.3 / Next 16)

Disponível sem configuração no App Router. Usar apenas para continuidade entre rotas e para o selo de conclusão.

```tsx
import { ViewTransition } from "react";

// cartão do curso
<ViewTransition name={`lesson-${lesson.id}`} share="morph" default="none">
  <LessonCard lesson={lesson} />
</ViewTransition>

// cabeçalho da lição
<ViewTransition name={`lesson-${lesson.id}`} share="morph" default="none">
  <LessonHeader lesson={lesson} />
</ViewTransition>
```

```css
@keyframes fade-in  { from { opacity: 0; } }
@keyframes fade-out { to   { opacity: 0; } }

::view-transition-group(.morph) {
  animation-duration: var(--motion-base);
}
::view-transition-old(root) {
  animation: fade-out var(--motion-fast) var(--ease-exit) both;
}
::view-transition-new(root) {
  animation: fade-in var(--motion-base) var(--ease-enter) both;
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

`share="morph"` aplica a classe `.morph` ao grupo; `default="none"` evita que o par anime em transições não relacionadas. Sem o par na mesma transição, não há morph — a navegação continua normal.

**Fallback:** sem suporte, a navegação funciona normalmente, sem animação. Nenhum conteúdo depende disso.

### 4.3 Scroll reveal

```tsx
"use client";
import { useEffect, useRef } from "react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "visible";
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{children}</div>;
}
```

```css
[data-reveal="pending"] { opacity: 0; transform: translateY(12px); }
[data-reveal="visible"] {
  opacity: 1; transform: none;
  transition: opacity var(--motion-slow) var(--ease-enter),
              transform var(--motion-slow) var(--ease-enter);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal="pending"] { opacity: 1; transform: none; }
}
```

**Importante:** o estado inicial invisível só é aplicado depois que o JS marca o elemento como `pending`. Sem JS — ou com reduced motion — o conteúdo nasce visível. Isso é progressive enhancement de verdade.

### 4.4 Scroll-driven animations

Podem ser usadas apenas como **enhancement** (ex.: régua de progresso na landing), com fallback estático. Suporte varia entre navegadores e versões; nunca colocar informação essencial dependente de `animation-timeline`.

### 4.5 Web Animations API

Para sequências com lógica (selo, régua), usar `element.animate()` e cancelar no cleanup. Não adicionar GSAP, Motion, Lottie ou Rive na 7B. Se uma única sequência complexa justificar GSAP no futuro, ela deve ser carregada sob demanda, isolada e documentada — nunca no caminho crítico.

## 5. Reduced motion

### 5.1 Política

| Categoria | Com reduced motion |
|---|---|
| Fade/opacidade | Permitido, ≤120 ms, se não houver deslocamento |
| Translate/scale/rotate | Removido |
| Parallax/scroll scrub | Removido |
| Stagger | Removido (tudo aparece junto) |
| Stroke draw | Removido (traço completo) |
| Virada 3D de cartão | Substituída por troca instantânea/fade |
| Contagem numérica | Valor final imediato |
| Vídeo/autoplay | Nunca |
| Spinner | Permitido apenas para operação em andamento |

### 5.2 Implementação global

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

O bloco global é uma **rede de segurança**; componentes que precisam manter um fade curto devem declarar exceção explícita e testada. Não usar `animation: none` global sem verificar estados que dependem de `animationend`.

### 5.3 Teste

- Chromium e WebKit com `reducedMotion: 'reduce'`.
- Verificar que nenhum conteúdo fica invisível (o bug clássico de `opacity: 0` + animação desligada).
- Verificar que o resultado do exercício ainda recebe foco e é anunciado.
- Verificar que a conclusão mostra todos os dados sem esperar a sequência.
- Verificar que o áudio (quando existir) não toca sozinho.

## 6. Desempenho

- Animar somente `transform` e `opacity`.
- Evitar `filter: blur()` em elementos grandes; se usar, limitar a 3 px e 200 ms.
- Não animar `box-shadow`; usar pseudo-elemento com opacidade.
- `IntersectionObserver` com `disconnect()` após o primeiro disparo.
- Sem `scroll` listener; se inevitável, `{ passive: true }` + `requestAnimationFrame`.
- Sem bibliotecas de animação no bundle inicial.
- Em dispositivos lentos, a página deve continuar utilizável durante a animação.
- Testar com CPU 4× mais lenta no DevTools e com rede Fast 3G.

## 7. Anti-padrões

- Preloader com porcentagem.
- Cursor customizado/coordenadas.
- Scroll hijack, pin de 6.000 px, scrub obrigatório.
- Texto que só aparece depois de animação.
- Contadores de pontos/streak animados.
- Confete, partículas, emojis saltando.
- Shake em resposta errada.
- Loop infinito decorativo (pulso, shimmer, gradiente animado).
- Animação que bloqueia o botão de continuar.
- `transition: all`.
- Ignorar `prefers-reduced-motion`.

## 8. Critérios de aceite

1. Nenhuma tarefa depende de esperar animação.
2. Com reduced motion, 100% das informações e ações estão disponíveis.
3. Nenhuma animação dura mais de 800 ms, exceto a sequência única de conclusão/hero (≤1,2 s).
4. Nenhum layout shift causado por animação.
5. Nenhuma biblioteca de animação no bundle inicial.
6. View Transitions degradam sem erro em navegadores sem suporte.
7. Testes WebKit/Chromium de reduced motion passam.
8. A landing continua com LCP <2,5 s em 4G e CLS <0,1.

## 9. Ordem de implementação

1. Tokens e bloco global de reduced motion (7B — **implementado**; nenhuma coreografia de página foi adicionada).
2. Microinterações de botão, foco, nav e toast (7C).
3. Feedback de exercício e progresso (7D).
4. Revisão (virada de cartão) e painel (7E).
5. Landing (hero + reveals) e conclusão (7F).
6. View Transitions entre curso → lição → resultado (7F, opcional).
7. Auditoria de performance e reduced motion (7G).

> Qualquer movimento não descrito aqui precisa de justificativa pedagógica e registro neste documento antes da implementação.
