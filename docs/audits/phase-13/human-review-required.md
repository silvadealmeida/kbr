# Fase 13C — itens que exigem revisão humana

> **Lista histórica de riscos, não checklist bloqueante.** A revisão editorial final assistida por
> IA foi aceita pelo responsável pelo projeto. Não houve revisão por falante nativo; os riscos de
> qualidade permanecem aceitos e não bloqueiam o release. Nenhum item foi falsamente marcado como
> `reviewed`.

**Nada nesta lista foi aprovado por falante nativo.** A auditoria 13C é assistida por IA; os itens abaixo permanecem abertos e não devem ser apresentados como resolvidos.

## 1. Áreas sem validação por falante nativo (risco residual aceito)

| Área | O que revisar | Por que |
|---|---|---|
| Todo o coreano de A1–C2 | Naturalidade, partículas, conjugação, escolha lexical, colocação | Nenhum texto foi validado por falante nativo. |
| Honoríficos e registro | `-시-`, `-(으)십니다`, `-님/께서`, 반말/해요체/합니다체, relações de poder | Erros de registro mudam a pragmática e podem ofender. |
| Traduções pt-BR | Equivalência, naturalidade brasileira, falso sentido | As glosas e traduções são autorais e não passaram por editor humano. |
| C1/C2 | Ironia, pressuposição, evasão, atenuação, implicatura, discurso literário | São fenômenos sensíveis a contexto e a variedade regional. |
| C2 jurídico | `강행규정`, `임의규정`, `구속력`, `소멸`, `손해배상` | O texto é pedagógico, não aconselhamento jurídico; terminologia exige especialista. |
| C2 cultural/literário | `이촌향도`, `폐항`, `우의`, `환유`, `상호텍스트성` | Evitar essencialismo e anacronismo; a colocação de `폐항` foi corrigida na Fase 14, mas o enquadramento cultural ainda pede revisor. |
| B2/C1/C2 mediação | Reformulação, representação, ética | Não há validação de adequação institucional real. |

## 2. Revisão editorial e pedagógica

- **Pistas de comprimento (resolvido na Fase 14):** os 237 itens detectados acima de 1,7× foram reescritos com distratores plausíveis; resta 0 acima do limite. O teste `tests/content/phase14-fairness.test.ts` cobre 1.381 itens. A revisão editorial assistida por IA foi aceita pelo responsável; não houve revisão nativa e esse risco é aceito, não bloqueante.
- **Carga cognitiva:** 80–110 min por lição é estimativa de desenho, não medida com aprendizes.
- **Dificuldade:** não há calibração psicométrica nem estudo de validade.
- **Escuta:** o motor transcreve uma frase; não avalia compreensão de discurso longo.
- **Fala:** não há avaliação automática de pronúncia, fluência ou interação.
- **Produção aberta:** a rubrica é apoio de autoavaliação; não substitui correção humana.
- **Checkpoints:** os limiares 8/10, 20/25 e 32/40 são critérios internos, não equivalência CEFR/TOPIK.

## 3. Técnica e acessibilidade

- iPhone/Chrome iOS real, safe-area física e teclado nativo.
- VoiceOver/TalkBack e navegação por leitor de tela.
- Voz coreana do sistema em aparelhos reais; qualidade e disponibilidade variam.
- WebKit automatizado não substitui Safari real.
- axe não prova conformidade WCAG completa.
- Performance de C1/C2 não foi medida com field data.

## 4. Jurídico e áudio (fotografia histórica da auditoria)

- Na data da auditoria, o estado de licença e distribuição era descrito como não resolvido. A decisão vigente posterior é áudio **resolvido com créditos**, documentada em `docs/audio/license-audit.md` §13.
- Na fotografia da auditoria, `public/audio/` estava fora do deploy e o player era opt-in. Isso foi revertido: 7.790 MP3 são servidos por padrão, com `=0` apenas como kill switch.
- A auditoria registrava revisão jurídica não realizada. O produto adotou política operacional final, sem alegação de parecer profissional; o limite é aceito e não bloqueia o release.

## 5. Recomendações da auditoria histórica (não são tarefas planejadas)

1. A auditoria sugeria revisão por falante nativo e teste com aprendizes como trabalho futuro.
2. A Fase 14 fechou as pistas de comprimento e as correções confirmadas registradas.
3. O responsável aceitou os riscos restantes; não há tarefa ou fase planejada para este encerramento.
