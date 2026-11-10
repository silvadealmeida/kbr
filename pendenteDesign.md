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


---

# ADDITIONAL RESEARCH — Cinematic Motion, Interactive Illustrations & Creative Development for KBR

## 8. Cinematic Motion Design and Interactive Storytelling

Expand the original research to investigate how cinematic motion graphics, visual storytelling, and sophisticated animated sequences can be implemented as interactive web experiences.

The goal is not to create prerecorded videos, but to build a website that feels as visually polished as a motion graphics production while remaining responsive to user input.

Research the following techniques:

- Kinetic typography
- Scroll-driven storytelling (scrollytelling)
- Scroll-linked animation timelines
- Pinned and sticky scroll sections
- Parallax and depth effects
- SVG path drawing animations
- SVG morphing and shape transitions
- Exploded-view animations
- Layered 2D/3D illustrations
- Technical drawing animations
- Interactive diagrams
- Cinematic page transitions
- Animated masks and reveals
- Smooth scrolling and scroll snapping
- Interactive particle systems
- Procedural animations
- Shader-based effects
- Microinteractions and animated feedback

For every technique, explain:

1. How the animation works.
2. What makes it visually effective.
3. Whether it requires JavaScript, SVG, Canvas, WebGL or another rendering technology.
4. How to implement it within Next.js and React.
5. Its performance impact on mobile devices.
6. Its accessibility implications.
7. Whether it improves the KBR learning experience.

Distinguish visual sophistication from unnecessary technical complexity.

## 9. Architectural Illustration and Editorial Drawing Styles

Study the illustration language used by Heron AI and investigate related artistic techniques.

Focus on:

- Architectural Pencil Sketch
- Architectural Editorial Illustration
- Technical Drawing
- Blueprint Aesthetic
- Cross-Hatching
- Engraving Illustration
- Ink Linework
- Graphite and Charcoal Textures
- Exploded Axonometric Diagrams
- Isometric Technical Illustrations
- Geometric Editorial Composition

Analyze:

- Line weight and stroke variation
- Texture and shading
- Hatching density
- Perspective and depth
- Grid systems
- Paper-like backgrounds
- Color accents
- Composition and negative space
- Integration with typography
- Techniques for animating illustrations

Investigate whether similar original illustrations could be created using SVG, procedural graphics, Canvas, CSS or vector illustration software.

Explain the difference between static illustrated assets and genuinely interactive vector illustrations.

The objective is not to imitate architectural drawings literally. It is to adapt their precision, visual sophistication and technical aesthetics to Korean writing and language learning.

## 10. Hangul as an Interactive Visual System

Explore how the Korean writing system itself can become the foundation of KBR's visual identity.

Hangul is particularly suitable for geometric visual storytelling because syllable blocks are composed from smaller consonant and vowel elements.

Investigate the following concepts.

### A. Animated Hangul Construction

Demonstrate how individual Jamo combine into complete syllable blocks.

Example:

ㅎ + ㅏ + ㄴ → 한

Potential interactions:

- Characters enter from different directions.
- Components align within a syllable grid.
- The syllable assembles progressively.
- Users can drag individual Jamo into position.
- Incorrect combinations produce subtle educational feedback.
- Correct combinations transition into the completed character.

Ensure the animation reflects actual Hangul composition rules rather than arbitrary visual positioning.

### B. Animated Stroke Order

Investigate how to teach Korean letter formation using:

- SVG path drawing
- Directional arrows
- Animated stroke sequences
- Touch-based tracing
- Adjustable playback speed
- Stroke-by-stroke replay
- Visual feedback on writing direction

Compare the feasibility of SVG tracing with Canvas-based handwriting input.

### C. Exploded-View Hangul Animations

Explore technical exploded-view diagrams adapted to Korean syllables.

For example:

1. Display a completed syllable.
2. Separate its constituent Jamo.
3. Highlight each component.
4. Explain its phonetic role in Brazilian Portuguese.
5. Animate the reconstruction.
6. Allow the learner to repeat the process interactively.

Investigate how this concept could combine technical drawing aesthetics, kinetic typography and educational interaction.

### D. Interactive Pronunciation Visualization

Research visual ways to explain Korean pronunciation.

Possible approaches:

- Animated mouth-position diagrams
- Articulation illustrations
- Visual comparison of similar Korean consonants
- Syllable highlighting synchronized with audio
- Audio playback with visual feedback

Do not imply that prerecorded audio or browser TTS can accurately evaluate a learner's pronunciation.

Distinguish visualization, audio playback and actual speech assessment.

### E. Educational Motion Principles

Define how animations should support:

- Attention
- Comprehension
- Retention
- Error recognition
- Learning progression
- Positive feedback

Avoid distracting movement, excessive delays and animations that make repeated practice slower.

## 11. Advanced Animation Technologies

Evaluate the following technologies in the context of KBR.

### CSS and Native Browser APIs

Investigate:

- CSS transitions and keyframes
- CSS scroll-driven animations
- Web Animations API
- IntersectionObserver
- View Transitions API

### SVG

Investigate:

- Stroke animations
- Path interpolation
- Morphing
- Masks and clipping
- Animated diagrams
- Interactive vector illustrations

### Motion for React

Evaluate:

- Component transitions
- Layout animations
- Gesture interactions
- Animated educational feedback

### GSAP and ScrollTrigger

Evaluate:

- Timeline orchestration
- Scroll synchronization
- Pinned sequences
- Complex animated storytelling
- SVG transformations

Check current licensing and commercial-use conditions before making recommendations.

### Rive and Lottie

Compare:

- Interactive state-machine animations
- Exported motion graphics
- File sizes
- Runtime performance
- Accessibility
- Authoring workflow
- Free versus paid capabilities

### WebGL and Three.js

Research:

- Interactive 3D illustrations
- Extruded Hangul characters
- Procedural geometry
- Shaders
- Particle effects
- Camera animations
- React Three Fiber integration

Evaluate whether these technologies are actually necessary.

Do not recommend WebGL simply because a reference website looks visually sophisticated.

Prefer SVG and lightweight 2D animations when they offer the same educational value with less complexity.

## 12. Prototype Concepts — Research Only

Propose detailed concepts for five future KBR interactions.

**Concept 1 — Cinematic Hangul Introduction**

An interactive landing-page sequence in which Korean letterforms appear progressively, transform and combine into recognizable syllables.

**Concept 2 — Hangul Exploded View**

A syllable separates into its constituent Jamo and reconstructs itself in response to scrolling, dragging or tapping.

**Concept 3 — Interactive Stroke Drawing**

The learner watches stroke-order animations and practices tracing Hangul characters on a touchscreen.

**Concept 4 — Animated Vocabulary Cards**

Vocabulary cards reveal pronunciation, meaning and example sentences through elegant, lightweight transitions.

**Concept 5 — Learning Journey Visualization**

A progress interface that communicates completed lessons, new achievements and review milestones through meaningful animation.

For each concept, provide:

- Visual description
- User interaction
- Educational objective
- Animation timeline
- Suggested technology
- Implementation complexity
- Mobile compatibility
- Performance considerations
- Accessibility requirements
- Reduced-motion alternative

These are specifications and concepts only.

Do not implement the prototypes yet.

## 13. Art Direction Exploration

Propose three original visual directions for KBR.

### Direction A — Editorial Korean Minimalism

Sophisticated typography, generous whitespace, geometric Hangul compositions and subtle motion.

### Direction B — Technical Hangul Atelier

Illustrations inspired by architectural sketches, technical drawings, hatching, precise grids and exploded diagrams.

### Direction C — Cinematic Interactive Learning

Immersive typography, narrative transitions, animated compositions and highly polished microinteractions.

For each direction, propose:

- A short creative rationale
- Color palette with HEX codes
- Typography recommendations supporting Korean and Portuguese
- Illustration language
- Navigation style
- Motion language
- Example landing-page composition
- Example learning screen
- Mobile adaptation
- Advantages and tradeoffs

Evaluate whether elements from these directions could form one coherent design system.

Avoid direct copying of Heron AI's visual identity.

## 14. Performance and Accessibility Requirements

All recommendations must consider the real constraints of an educational mobile-first application.

Evaluate:

- Low-powered smartphones
- iPhone Safari and Chrome iOS
- Touch interactions
- Battery consumption
- GPU and memory usage
- Bundle size
- Loading performance
- Reduced-motion preferences
- Keyboard navigation
- Screen readers
- Color contrast
- Focus visibility
- Motion sensitivity
- Progressive enhancement

Aim for smooth animation where appropriate without assuming that every device can maintain 60 FPS.

Specify fallback behavior when animation APIs or hardware acceleration are unavailable.

Avoid unnecessary animation dependencies.

## 15. Additional Deliverables

Extend the original design report with:

1. A cinematic motion design reference catalog.
2. An analysis of technical illustration aesthetics.
3. A Hangul-specific interactive animation strategy.
4. Five detailed interaction specifications.
5. Three original visual directions for KBR.
6. A technology decision matrix.
7. An accessibility and performance checklist.
8. A phased creative-development implementation roadmap.
9. References and technical sources for major recommendations.
10. A prioritized shortlist of animations that provide genuine educational value.

Where repository documentation access is available, organize the additional findings under:

- `docs/design/creative-motion-research.md`
- `docs/design/hangul-animation-concepts.md`
- `docs/design/visual-directions.md`

These should complement the documentation files requested in the original prompt.

## Final Constraints

This remains a research-only assignment.

Do not:

- Implement components.
- Modify application code.
- Install libraries.
- Create commits.
- Push changes.
- Change authentication or backend logic.
- Interfere with ongoing development.
- Generate finished marketing videos instead of researching interactive motion.

Clearly distinguish verified technology usage from speculation.

Write the final research and recommendations in Brazilian Portuguese.

The ultimate goal is for KBR to become a visually exceptional Korean learning platform where interaction, illustration and animation actively improve language acquisition rather than merely decorate the interface.