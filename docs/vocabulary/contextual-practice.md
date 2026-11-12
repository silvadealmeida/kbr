# Prática contextual (completar a frase)

Experiência principal de vocabulário (`ContextualCard`).

## Antes de responder
- Frase coreana com lacuna (`lang="ko"`), a dica **"Palavra esperada: <sentido>"** e o campo de texto (teclado coreano do aparelho; sem microfone).
- **"Mostrar/Ocultar tradução da frase"**: botão com `aria-expanded`/`aria-controls`; pode abrir e fechar quantas vezes quiser; não revela a palavra coreana.
- **Pista** opcional (âmbar): número de sílabas e a consoante inicial — nunca a palavra inteira (testado para todo o vocabulário).
- Enter envia (formulário), exceto durante a composição do IME coreano (`isComposing`), para não enviar uma sílaba incompleta.

## Conferência
`normalizeKorean` (NFC, sem caracteres invisíveis, `trim`) + **igualdade exata** com o alvo e as variantes registradas. Sem substring, sem remover partícula, sem aproximação, sem jamo de compatibilidade. Resposta vazia não é corrigida (mensagem de erro).

## Depois de responder (sempre)
Acerto ou erro, tradução aberta ou não: palavra esperada, frase coreana completa com o alvo destacado, tradução completa, **"Ouvir a frase"** (voz do navegador) e "Próximo cartão"/"Concluir"; no erro, também "Tentar de novo". "Correção" e "tradução visível" são estados independentes.

## Feedback e acessibilidade
- Celadon (`success`) no acerto, terracota (`danger`) no erro, âmbar (`warning`) na pista, neutro antes de responder — tokens do tema, claro e escuro.
- Nunca só cor: ícone + texto ("Correto!" / "Ainda não — veja a resposta"), região `aria-live="polite"`, foco movido para o título do resultado.
- Alvos de toque ≥ 44 px; sem animação além das transições existentes.

## Limites
Só 25 frases originais, todas em revisão nativa. As demais palavras caem para cartão simples. Não há áudio do corpus (MP3 restrito); só voz do sistema, que pode não existir no aparelho (mensagem honesta do `AudioControl`).
