# Direção criativa — “Composição”

> Fase 7A. Este documento fixa a tese visual do KBR antes de qualquer alteração de interface. Ele responde a `docs/design/pendenteDesign.md` e traduz a pesquisa de `visual-research.md` em decisões originais. Nada aqui autoriza copiar ativos, layouts ou código de terceiros.

## 1. A ideia em uma frase

**O KBR é um ateliê tipográfico onde o brasileiro aprende coreano compondo letras, sílabas e frases — com a precisão de uma prancha técnica e o calor de um caderno de estudo.**

Conceito-guarda-chuva: **Composição**.

- **Composição** é o que o Hangul faz: consoante + vogal (+ batchim) formam um bloco.
- É o que o curso faz: som + forma + uso formam leitura.
- É o que a interface faz: tipografia + grid + anotação formam uma página de estudo.
- É o que o aluno faz: reconhecer, montar, ler, revisar.

A metáfora não é arquitetura, engenharia ou “produto de IA”. É **oficina de escrita**: papel, tinta, régua, carimbo, prova de impressão. A precisão é editorial, não industrial.

## 2. Posicionamento e promessa

**Para quem é:** adultos brasileiros que querem aprender coreano de verdade, começando do zero, no celular, sem promessas mágicas.

**O que prometemos:** clareza sobre o que está acontecendo na tela, progresso honesto e uma sensação de domínio que cresce a cada sílaba montada.

**O que não prometemos:** fluência em semanas, IA que “conversa como nativo”, gamificação infantil, recompensas falsas.

**Tom:** professor paciente e preciso; não é palco, é bancada. A interface some quando o conteúdo importa e aparece quando precisa orientar.

## 3. Três direções exploradas e a síntese

O briefing pedia três direções. Elas não competem: foram hierarquizadas.

### Direção A — Ateliê técnico (núcleo)

Prancha de desenho aplicada à letra: papel quente, tinta, hairlines, cotas, marcas de registro, numeração de lâmina, selo de revisão. Tipografia display com caráter, mono para anotações, muito espaço negativo.

- **Força:** identidade imediata, adequada ao conteúdo (Hangul é diagrama), escala bem no mobile.
- **Risco:** parecer frio ou “design de portfólio”; exigir disciplina para não virar decoração.
- **Decisão:** é o **sistema-base** do KBR.

### Direção B — Minimalismo editorial (disciplina)

Página de livro de ensino: grid assimétrico, títulos grandes, notas de margem, hierarquia rígida, quase nenhuma cor, foco absoluto em leitura e exercício.

- **Força:** acessibilidade, desempenho, longevidade, clareza.
- **Risco:** indiferenciado; poderia ser qualquer app de idiomas.
- **Decisão:** é a **disciplina de layout** aplicada ao sistema A, não uma direção separada.

### Direção C — Instrumento cinematográfico (tempero)

Entrada de página, transições e marcos com coreografia curta: máscaras, revelação de traços, contagem de progresso, View Transitions.

- **Força:** percepção de qualidade e memória afetiva nos momentos certos.
- **Risco:** atrasa tarefas, quebra reduced motion, pesa no mobile.
- **Decisão:** usar **apenas** na landing (uma sequência), na transição lição→resultado e em conclusão de curso. Nunca em exercício, revisão ou navegação.

**Síntese:** A estrutura é um ateliê técnico; a diagramação é editorial; o movimento é cinematográfico só onde há significado e sempre opcional.

## 4. Pilares

1. **A letra é o herói.** Hangul ocupa o centro óptico. Nada de ilustrações competindo com o caractere. Quando houver dúvida, aumente a letra e remova o resto.
2. **Precisão sem frieza.** Hairlines e mono dão precisão; papel quente, celadon e vermelho-selo dão humanidade.
3. **Progresso honesto.** Estados vazios, pendências e sincronização são visíveis. Nunca inventamos estatística, sequência ou “domínio”.
4. **Uma coisa por vez.** Cada tela tem uma tarefa dominante. Exercício: responder. Revisão: lembrar. Painel: decidir o próximo passo.
5. **Mobile é o projeto.** O layout nasce em 375 px; desktop é composição, não versão “cheia”.
6. **Movimento com permissão.** Toda animação tem equivalente estático e respeita `prefers-reduced-motion`.

## 5. Assinatura visual

### 5.1 Elementos proprietários do KBR

| Elemento | Descrição | Onde aparece |
|---|---|---|
| **Bloco de composição** | Quadrado com marcas de registro nos cantos e divisão interna implícita (C/V/batchim) | Landing, lição, ilustrações de Hangul |
| **Selo de verificação** | Carimbo circular/quadrado em vermelho-selo, com texto curto (“LIDO”, “REVISADO”, “CONCLUÍDO”) | Resultado, conclusão, checkpoint |
| **Número de lâmina** | `LÂMINA 03 / 25`, `PLACA h05`, em mono | Cabeçalho de lição, materiais |
| **Nota de margem** | Anotação curta em mono, alinhada à direita, com fio vertical | Landing, explicações |
| **Régua de leitura** | Linha horizontal com marcações; indica sílaba/partícula | Exercícios de leitura, player |
| **Papel hanji** | Fundo quente com textura sutil (CSS, não imagem pesada) | Landing e superfícies públicas |
| **Mesa de luz** | Modo escuro como mesa de desenho iluminada: verde-tinta profundo, off-white quente, coral/menta | Tema escuro |

### 5.2 O que não é assinatura

- Plantas arquitetônicas, cotas de ambiente, ícones de obra.
- Gradientes arco-íris, glassmorphism, neon.
- Personagens mascotes, emojis decorativos, confete.
- Cards flutuantes com sombras difusas por toda parte.
- Fundos fotográficos de Seul ou de “estudante feliz”.

## 6. Direção de arte

### 6.1 Materiais

- **Papel:** `#F4EFE3` (hanji claro), com grão a 2–3% de opacidade via SVG/CSS. Sem imagem de fundo >8 KB.
- **Tinta:** `#201E19` para texto; `#5C574C` para texto secundário.
- **Selo:** `#C33A22`, usado em no máximo ~5% da área visível.
- **Celadon:** `#2E6A5B`, cor de apoio, links, estados positivos e foco.
- **Linhas:** `#D8D0BF` a 1 px; nunca caixas com borda grossa em toda a tela.

### 6.2 Tipografia

- **Display/UI:** Archivo (variable), com fallback de sistema. Caráter grotesco editorial, boa em caixa alta e em português.
- **Anotação:** IBM Plex Mono, apenas metadados, números e legendas.
- **Coreano:** Noto Sans KR já existente, `lang="ko"`, carregada só onde há coreano.
- **Landing pública:** títulos em Hangul como **SVG outline** (sem download de fonte coreana). Texto coreano de exemplo pode usar a fonte do sistema com fallback.
- **Texto corrido:** começar com a stack do sistema; Archivo entra primeiro em títulos e UI. Isso preserva o orçamento de fontes da landing.

### 6.3 Imagem e ilustração

- Preferir **diagramas vetoriais** a fotografia.
- Ilustração de Hangul é **geométrica e funcional**: traços, blocos, setas, camadas, medidas.
- Se houver imagem editorial, usar recorte de papel/impressão em monocromo; nunca banco de imagens óbvio.
- Texturas são geradas em CSS/SVG, não em PNG grande.

## 7. Voz e escrita de interface

### 7.1 Princípios

- **Verbo antes de substantivo:** “Monte a sílaba”, não “Composição de sílaba”.
- **Explicar o porquê:** “O batchim fecha o som no fim da sílaba.”
- **Sem infantilizar:** nada de “Uhuu!”, “Você arrasou!”, “Vamos nessa?”.
- **Sem prometer:** “Você acertou 4 de 5” em vez de “Domínio avançado”.
- **Erro é informação:** “Ainda não. O ㅓ tem som de ‘ó’ aberto, não de ‘u’.”

### 7.2 Exemplos

| Contexto | Antes (genérico) | Depois (KBR) |
|---|---|---|
| Botão primário | Começar agora | Abrir a primeira lição |
| Exercício | Verificar resposta | Conferir leitura |
| Acerto | Incrível! | Certo. ㅏ soa como “a” em “casa”. |
| Erro | Resposta incorreta | Ainda não. Você trocou ㅓ por ㅗ. |
| Revisão vazia | Nada por aqui | Nenhum cartão venceu hoje. Volte amanhã ou faça uma lição. |
| Sincronização | Sincronizando… | Salvando neste dispositivo… / Sincronizado. |
| Conclusão | Parabéns! | Você leu os 25 blocos. Agora, leia sem a transcrição. |

### 7.3 Regras de estilo

- pt-BR, “você”, frases curtas.
- Números por extenso em títulos; algarismos em métricas.
- Coreano sempre com `lang="ko"`; romanização em itálico leve ou mono, nunca competindo com o Hangul.
- Evitar jargão gramatical sem explicação na primeira ocorrência.

## 8. Diferenciação do Heron AI

| Dimensão | Heron (observado) | KBR (proposto) |
|---|---|---|
| Metáfora | Planta/obra de arquitetura | Oficina de escrita e composição |
| Cor de acento | Laranja de sinalização | Vermelho-selo de revisão |
| Base | Cinza-pedra frio | Papel hanji quente |
| Tipografia | BT Grotesk + Geist Mono | Archivo + IBM Plex Mono + Noto Sans KR |
| Movimento | Scrollytelling longo, preloader, cursor | Revelação curta com significado; sem hijack |
| Navegação | Header fixo com menu | Sidebar/bottom nav persistente com 5 rotas |
| Público | Designer/produto | Aprendiz brasileiro de coreano |
| Mobile | Alvos pequenos | Alvos ≥44 px, safe-area, uma tarefa por tela |
| Privacidade | Analytics de terceiros | Sem rastreadores; dados mínimos |

**Teste de originalidade:** se um screenshot do KBR puder ser confundido com o Heron, a direção falhou. O que deve ser reconhecível é o **bloco de composição**, o **selo** e a **lâmina** — não a planta, o laranja ou o cursor.

## 9. Conflitos do briefing e resoluções

| Conflito | Resolução |
|---|---|
| “Premium/cinematográfico” vs. mobile-first e orçamento de bytes | Cinema só em 3 momentos; o resto é editorial e estático. Nenhum vídeo, WebGL ou fontes extras na landing. |
| “Inspirado no Heron” vs. “não copiar” | Adotar gramática (grid, mono, um acento, camadas), rejeitar encenação (planta, preloader, cursor, scroll pinado) e criar símbolos próprios (bloco, selo, lâmina). |
| Três direções vs. um sistema coerente | A é o núcleo; B é a disciplina de layout; C é o tempero de movimento. Documentado acima. |
| “Dark mode” vs. referência clara | Dark é uma **mesa de luz**, não uma inversão. Tokens semânticos próprios e contraste ≥7:1. |
| “Não fazer commit” (briefing) vs. fluxo do repositório (`AGENTS.md`) | Commitar **apenas documentação** da 7A, sem código de app, sem push. O trabalho fica retomável e a árvore não fica suja. |
| “Pesquisa agora, implementação depois” | Nenhuma alteração de app nesta fase. A 7B começa somente após revisão humana. |

## 10. O que esta direção muda — e o que preserva

**Muda:** tipografia, cor, espaçamento, superficies, navegação visual, componentes de exercício, feedback, painel, landing, ilustrações de Hangul, movimento.

**Preserva:** rotas, IDs `h01`–`h25`/`c1`–`c4`, conteúdo coreano, `Progress` v1, CAS, SRS/Leitner, OAuth, comportamento dos exercícios, textos legais, privacidade, orçamentos de desempenho.

## 11. Critérios de sucesso

1. Em 5 segundos, uma pessoa entende que é um curso de coreano para brasileiros — não um app de IA, não um jogo infantil.
2. O Hangul é o elemento mais lembrado de qualquer tela.
3. Um screenshot de landing, lição e revisão é reconhecível como o mesmo produto.
4. Nenhuma tela depende de cor para transmitir estado.
5. A landing continua abaixo de 450 KB e sem fontes coreanas.
6. Com reduced motion, nenhuma informação ou ação é perdida.
7. Um iniciante sabe sempre qual é o próximo passo.

## 12. Anti-metas

- Não parecer “template de SaaS com cartões arredondados”.
- Não parecer “curso infantil” com mascotes e confete.
- Não parecer “site de portfólio” onde o conteúdo é secundário.
- Não copiar a paleta, a tipografia ou as composições do Heron.
- Não usar movimento para esconder falta de conteúdo.
- Não adicionar complexidade técnica (WebGL, Lottie, Rive, CMS) sem ganho pedagógico mensurável.
