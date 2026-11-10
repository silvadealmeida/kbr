# Deep UI/UX, Motion Design & Creative Development Research — KBR

You are acting as a Senior Creative Developer, UI/UX Design Director, Motion Designer, and Frontend Architect.

## Context

I am developing KBR — Korean for Brazilian Portuguese Speakers, an educational web application for learning Korean from scratch.

KBR website:
https://kbr-amber.vercel.app/

KBR source code:
https://github.com/silvadealmeida/kbr

The application uses Next.js, React, TypeScript, Tailwind CSS, Supabase authentication, and a mobile-first PWA architecture.

The product is still under development.

**Your mission is RESEARCH AND DESIGN PLANNING ONLY. Do not implement, modify, refactor, commit, or deploy code.**

## Primary design reference

https://heronaiapp.com/

I am particularly interested in its visual identity, navigation, animated transitions, scrolling experience, interactive elements, and polished motion design.

I want KBR to eventually reach a comparable level of creative quality, but it must retain its own identity as an educational product about the Korean language.

Do not copy Heron AI's branding, artwork, layouts, or proprietary assets.

## Task 1 — Thoroughly analyze Heron AI

Explore the website using browser inspection whenever available.

Inspect the desktop and mobile experiences, including:

- Homepage and navigation
- Hero section
- Colors and gradients
- Typography and text hierarchy
- Spacing, grids and layout composition
- Scroll-driven animations
- Pinned and sticky sections
- Page transitions
- Hover interactions
- Cursor effects
- Visual storytelling
- Background animations
- Interactive illustrations
- Loading sequences and preloaders
- Microinteractions
- Mobile adaptations
- Performance and accessibility

For each important interaction, explain:

1. What happens visually?
2. What triggers it?
3. What user-experience purpose does it serve?
4. What technology might reproduce it?
5. Would it be appropriate for KBR?

Record screenshots or visual references where supported.

Distinguish directly observed behavior from hypotheses. If browser access or visual inspection is unavailable, say so rather than inventing observations.

## Task 2 — Investigate the technical implementation

Determine, using verifiable evidence when possible, whether the site uses:

- GSAP / ScrollTrigger
- Lenis or another smooth-scrolling library
- CSS animations and transitions
- SVG animation
- Canvas 2D
- WebGL
- Three.js
- React Three Fiber
- Lottie or Rive
- Barba.js or similar navigation transitions
- Webflow or another site framework

Do not assume that visually complex effects necessarily require WebGL.

For every detected technology, label it:

- Confirmed
- Likely
- Unverified

Explain how to achieve comparable design quality using KBR's existing Next.js architecture, without unnecessary dependencies.

## Task 3 — Audit the current KBR UI

Inspect the public deployment and GitHub repository.

Read the available architecture, roadmap, component structure and styling.

Evaluate:

- Current visual identity
- Information architecture
- Navigation
- Responsive design
- Accessibility
- Learning experience
- Existing UI components
- Design consistency
- Performance constraints

Treat the current application as a work in progress. The learning modules are not complete.

## Task 4 — Propose an original KBR visual direction

Develop an independent design concept inspired by the creative sophistication of Heron AI.

The visual language should combine:

- Korean language and Hangul as meaningful visual elements
- Modern educational UX
- Strong typography
- Elegant motion
- Interactive learning
- A distinct and memorable identity
- Excellent mobile usability

Propose a concrete design system including:

- Color palette with HEX values
- Light and dark themes
- Typography pairings that support Korean and Brazilian Portuguese
- Spacing scale and grid
- Components and card styles
- Button states
- Navigation patterns
- Motion principles
- Accessibility standards

Avoid stereotypical or superficial Korean visual references.

## Task 5 — Motion design opportunities for KBR

Evaluate specific opportunities:

A. Landing page
- Animated Hangul composition
- Scroll-based visual storytelling
- Immersive educational illustrations
- Elegant transitions between sections

B. Hangul learning
- Animated stroke order
- Consonant and vowel assembly
- Syllable block transformations
- Interactive pronunciation feedback

C. Vocabulary
- Flashcard transitions
- Progressive word reveals
- Answer feedback animations

D. Learning dashboard
- Progress animations
- Streak visualization
- Milestone celebrations

E. Mobile experience
- Touch-friendly interactions
- Reduced motion
- Low-powered device fallback
- iPhone Chrome/Safari compatibility

For each proposed effect, explain educational value, visual complexity, performance cost, accessibility considerations and implementation approach.

## Task 6 — Compare implementation strategies

Compare:

1. CSS + native browser APIs
2. Motion for React
3. GSAP + ScrollTrigger
4. SVG animation
5. Rive / Lottie
6. Canvas / Three.js / React Three Fiber

Recommend which solutions are justified for KBR.

Prefer solutions that are lightweight, maintainable, free or open-source under applicable licenses, and compatible with Next.js, Vercel, and mobile browsers.

Consider bundle size, battery consumption, reduced-motion preferences, SEO, performance and accessibility.

## Task 7 — Create a future implementation roadmap

Design an incremental visual enhancement roadmap to execute AFTER the core educational application is functional.

Divide improvements into:

- Quick wins
- Medium-complexity improvements
- Advanced creative interactions
- Optional experimental features

Prioritize improvements based on educational value, visual impact, technical effort, performance, and maintainability.

Do not recommend complex animations solely for decoration.

## Deliverables

Produce a detailed report in Brazilian Portuguese.

Include:

1. Executive summary
2. Heron AI visual and interaction audit
3. Evidence-based technology analysis
4. KBR design system proposal
5. Screen-by-screen visual improvement concepts
6. Motion and animation specification
7. Technical recommendations
8. Accessibility and performance guidelines
9. Phased implementation roadmap
10. Reference links and sources
11. A concise implementation brief that another AI coding agent can follow later

Where repository writing is available, save the research as:

`docs/design/heron-reference-audit.md`

`docs/design/kbr-visual-direction.md`

`docs/design/motion-roadmap.md`

These are documentation files only.

Do not change application code or existing project plans without explicit permission.

## Critical constraints

- RESEARCH ONLY.
- No implementation.
- No commits or pushes.
- No deployment.
- Do not interfere with another AI agent currently implementing KBR features.
- Preserve the current application architecture.
- Avoid paid tools and APIs.
- Do not reproduce protected assets or copy another company's design verbatim.
- Clearly identify all unverified claims.
- Write the final report in Brazilian Portuguese.

The goal is to build a durable creative direction for a visually exceptional, accessible, performant Korean learning application.
Como aproveitar melhor o Opus
Eu daria atenção especial a três efeitos do Heron AI:










1. Storytelling com scroll

As seções podem apresentar conteúdo progressivamente. No KBR, isso poderia explicar como consoantes e vogais se combinam para formar sílabas.













2. Ilustrações interativas

O Heron usa representações arquitetônicas que respondem à interação. No KBR, poderíamos usar o próprio Hangul como elemento visual interativo.













3. Motion design sofisticado

Transições, tipografia animada e feedback visual poderiam tornar o aprendizado mais envolvente, sem comprometer a legibilidade.
O estilo de ilustração usado no site Heron AI se chama principalmente Architectural Sketch Illustration, ou ilustração arquitetônica com aparência de desenho técnico feito à mão.

Mais especificamente, ele mistura três estilos:










1. Architectural Pencil Sketch

Desenhos de arquitetura com aparência de grafite, sombreamento manual e linhas finas.












2. Engraving / Cross-Hatching

Técnica de hachuras cruzadas, com linhas repetidas que criam textura, sombras e profundidade.












3. Technical Drawing / Blueprint Aesthetic

Estética de plantas técnicas, grades de alinhamento, marcações geométricas e composição editorial.



O Heron combina essas técnicas com papel creme, preto-carvão e laranja-avermelhado. Uma análise do site descreve especificamente o uso de texturas de lápis, carvão e hachuras finas. 
rickcreates.com


Para o KBR, eu exploraria a mesma linguagem gráfica, mas aplicada à escrita coreana: letras Hangul com traços técnicos, diagramas de composição silábica e animações que revelam progressivamente cada linha.

Se quiser pesquisar referências desse estilo no Pinterest, Behance ou Awwwards, use:

Architectural Editorial Illustration + Pencil Hatching + Technical Drawing + Interactive Motion Design

Essa combinação descreve muito bem o que chamou sua atenção no Heron AI.