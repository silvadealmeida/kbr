# Auditoria 13C — resumo executivo

> **Resumo histórico, superado como decisão de release.** A revisão editorial final assistida
> por IA foi aceita pelo responsável pelo projeto. Não houve revisão por falante nativo; o risco
> residual de qualidade foi aceito e não bloqueia o release. Consulte `docs/release/beta-readiness.md`.

**Escopo:** Hangul, A1, A2, B1, B2, C1 e C2.
**Natureza:** auditoria assistida por IA com verificação de referências externas e testes automatizados. **Não é revisão por falante nativo**, não certifica CEFR/TOPIK e não mede eficácia pedagógica com aprendizes.

## 1. O que foi feito

- Leitura estrutural de todos os datasets de curso, checkpoints, vocabulário e frases contextuais.
- Validadores próprios de A1–C2 e testes de fairness, pontuação, unidades de escuta, opções, IDs e reuso lexical.
- Auditoria 13C permanente em `tests/content/phase13-audit.test.ts` (invariantes globais).
- Revisão linguística assistida por IA de amostras de A1, A2, B1, B2, C1 e C2, módulo a módulo, com registro de incerteza.
- Playwright/axe em Chromium 320/375/390/768/1280 e WebKit 390; capturas de tela inspecionadas.
- Correções de conteúdo e de UI acompanhadas de testes de regressão.

## 2. Contagens

- **Cursos:** 7 (Hangul + A1–C2), **317 passos**, **285 lições**, **52 checkpoints**, **4.095 itens**.
- **Vocabulário:** **2.256 entradas** e **2.148 frases contextuais**.
- **C1:** 40 lições + 8 checkpoints; 320 identidades novas, 85 anteriores retomadas, 615 itens; rubrica de 6 critérios com síntese.
- **C2:** 40 lições + 8 checkpoints; 320 identidades novas, 130 anteriores retomadas, 615 itens; rubrica de 6 critérios com mediação.
- **Testes:** 703 Vitest verdes; typecheck e build verdes; matriz Playwright no relatório final.

## 3. Achados

O ledger canônico é `findings.json`: **3 Critical, 19 High, 8 Medium, 3 Low** — 31 corrigidos, 1 adiado (pistas de comprimento) e 1 risco sistêmico de revisão humana. Os achados incluem:

- correções de infraestrutura C1/C2 (imports, contrato de rubrica, blueprints, registro de cursos);
- correção de interpolação de `levelLabel` no player compartilhado;
- correção de fairness de `listen` em A1 (enunciado agora pede frase completa quando o gabarito tem 2+ palavras);
- correção de pistas de comprimento: os 237 itens acima de 1,7× foram reescritos na Fase 14 e há teste permanente; a dívida editorial está fechada;
- correções de honorífico, regência, colocação, referência, lógica e tradução em A1, A2, B1, B2, C1 e C2.
- itens de revisão nativa que permanecem `requires-native-review`, sem correção automática.

## 4. O que não foi demonstrado

- Proficiência CEFR/TOPIK de qualquer aluno.
- Revisão nativa de coreano, honoríficos, registro, naturalidade ou tradução.
- Validade psicométrica, calibração de dificuldade ou eficácia pedagógica.
- Fala espontânea, pronúncia, fluência ou escrita aberta corrigida automaticamente.
- Acessibilidade completa WCAG ou teste em iPhone/VoiceOver reais.
- Que a conclusão de 48 passos equivale a um nível de proficiência.

## 5. Recomendação histórica (não é requisito atual)

Na data da auditoria 13C, recomendou-se revisão por falante nativo, edição de traduções, teste com aprendizes e decisão de áudio. A decisão posterior do responsável aceita os riscos residuais e encerra o produto para release sem alegar revisão nativa ou parecer profissional. Esta recomendação não controla o estado atual.
