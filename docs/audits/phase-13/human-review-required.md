# Fase 13C — itens que exigem revisão humana

**Nada nesta lista foi aprovado por falante nativo.** A auditoria 13C é assistida por IA; os itens abaixo permanecem abertos e não devem ser apresentados como resolvidos.

## 1. Revisão linguística nativa (bloqueante para lançamento público)

| Área | O que revisar | Por que |
|---|---|---|
| Todo o coreano de A1–C2 | Naturalidade, partículas, conjugação, escolha lexical, colocação | Nenhum texto foi validado por falante nativo. |
| Honoríficos e registro | `-시-`, `-(으)십니다`, `-님/께서`, 반말/해요체/합니다체, relações de poder | Erros de registro mudam a pragmática e podem ofender. |
| Traduções pt-BR | Equivalência, naturalidade brasileira, falso sentido | As glosas e traduções são autorais e não passaram por editor humano. |
| C1/C2 | Ironia, pressuposição, evasão, atenuação, implicatura, discurso literário | São fenômenos sensíveis a contexto e a variedade regional. |
| C2 jurídico | `강행규정`, `임의규정`, `구속력`, `소멸`, `손해배상` | O texto é pedagógico, não aconselhamento jurídico; terminologia exige especialista. |
| C2 cultural/literário | `이촌향도`, `폐항`, `우의`, `환유`, `상호텍스트성` | Evitar essencialismo e anacronismo. |
| B2/C1/C2 mediação | Reformulação, representação, ética | Não há validação de adequação institucional real. |

## 2. Revisão editorial e pedagógica

- **Pistas de comprimento:** 230 itens ainda têm gabarito >1,7× a maior alternativa; 7 casos de maior risco foram corrigidos. A reescrita dos demais exige calibração editorial para não criar ambiguidade.
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

## 4. Jurídico e áudio

- Licença do encoder `kykim/bert-kor-base`/MeloTTS continua não esclarecida; a decisão de risco do dono não é licença.
- `public/audio/` está fora do deploy e o áudio estático é opt-in; a distribuição pública/comercial segue bloqueada.
- Revisão jurídica da política de privacidade e do Impressum continua pendente.

## 5. Como fechar estes itens

1. Revisão por falante nativo com registro de revisor/data em `ReviewMeta` (`reviewedBy`, `reviewedAt`).
2. Correção editorial das traduções e das pistas de comprimento.
3. Teste com aprendizes e calibração dos limiares.
4. Teste manual em iPhone/Chrome iOS e leitor de tela.
5. Decisão jurídica sobre o áudio antes de qualquer distribuição.
