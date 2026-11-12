# KBR — Checklist manual de iPhone / Chrome iOS (Fase 6B)

**Importante:** os testes automatizados desta fase rodam no WebKit do Playwright
(`webkit-390`, viewport iPhone 13). Eles **não** substituem um iPhone físico, o
Safari real, o Chrome iOS real nem o VoiceOver. Nenhuma validação em dispositivo
físico foi feita nesta sessão.

Marque cada item com data, modelo, versão do iOS e navegador. Registre falhas com
print e passos.

## 1. Instalação pelo Safari (tela de início)

1. Abrir o site no Safari e entrar com Google.
2. Compartilhar → “Adicionar à Tela de Início”.
3. Confirmar nome e ícone (maskable, sem borda branca estranha).
4. Abrir pelo ícone.

Esperado: abre em modo standalone, sem barra de endereço; título correto; ícone
nítido; continua na área autenticada (ou pede login de forma clara se a sessão
expirou).

## 2. Chrome iOS

1. Abrir o site no Chrome iOS e entrar com Google.
2. Navegar por Painel, Cursos, Hangul, Vocabulário e Revisão.
3. Testar “Adicionar à Tela de Início” pelo menu do Chrome (se disponível).

Esperado: layout mobile-first, sem overflow horizontal; login conclui; nav inferior
respeita a barra do iOS.

## 3. Launch standalone e retomada

1. Fechar o app pelo seletor de apps e reabrir pelo ícone.
2. Alternar para outro app no meio de uma lição e voltar.
3. Bloquear/desbloquear a tela no meio da lição.

Esperado: sessão persiste (quando válida); a lição não perde a resposta já enviada;
nenhum “sessão expirou” falso ao apenas trocar de app.

## 4. Safe areas, notch e barra inferior

1. Testar em aparelho com notch/ilha dinâmica e em um sem notch.
2. Rolar páginas longas até o fim.
3. Conferir header, nav inferior e botões fixos.

Esperado: nada fica sob o notch, a barra de status ou o indicador home; a nav
inferior não cobre o último botão; alvos ≥44 px.

## 5. Teclado, zoom e resposta textual

1. Abrir uma lição com resposta escrita (`/hangul/h04` ou posterior).
2. Tocar no campo “Sua resposta”.
3. Digitar, fechar o teclado, rolar e conferir com “Conferir”/Enter.
4. Testar em paisagem.

Esperado: sem zoom automático (fonte ≥16 px), teclado não cobre o campo/botão de
forma irremediável, rolagem horizontal ausente, Enter/done confere a resposta.

## 6. OAuth Google de ida e volta

1. Sair da conta.
2. Abrir um deep link privado (ex.: `/revisao`).
3. Entrar com Google e concluir no Safari/Chrome iOS.
4. Repetir a partir da landing.

Esperado: retorno para o destino interno pedido (não para a landing), sessão criada,
sem tela branca nem loop; cancelar o login volta de forma segura.

## 7. Persistência de sessão

1. Fechar e reabrir o app instalado.
2. Fechar todas as abas do Safari e reabrir o site.
3. Deixar parado por mais de uma hora e voltar.

Esperado: sessão válida continua; expiração real mostra “Sua sessão expirou” e pede
login; logout manual mostra “Você saiu da conta.” e não expiração.

## 8. Voz coreana (speechSynthesis)

1. Abrir uma lição com botão de áudio.
2. Tocar em ouvir.
3. Testar com voz coreana instalada e sem ela.

Esperado: com voz `ko-KR`, pronúncia é tocada; sem voz, a dica textual aparece e o
exercício continua respondível. Não avaliar pronúncia — o app não faz isso.
O caminho principal (MP3 sintetizado do KBR) e seu fallback estão na seção 14, B1–B3.

## 9. VoiceOver

1. Ativar VoiceOver (Ajustes → Acessibilidade).
2. Percorrer landing, login, Painel, lista do Hangul e uma lição.
3. Enviar uma resposta errada e uma certa; ouvir o feedback e avançar.
4. Concluir uma revisão.
5. Testar o alternador de tema e o skip link.

Esperado: foco na ordem lógica; skip link move para o conteúdo; o enunciado é
anunciado ao iniciar cada exercício; o **resultado** é anunciado antes do botão
“Continuar”; trechos coreanos são lidos como coreano (não letra a letra em pt-BR);
erros de formulário são anunciados; nenhum conteúdo apenas visual sem rótulo.

## 10. Offline e reconexão

1. Ativar modo avião com o app aberto numa revisão.
2. Responder e concluir a revisão.
3. Desativar modo avião sem recarregar.
4. Recarregar e abrir o app de novo.

Esperado: aviso “Sem conexão”; progresso salvo no dispositivo e mensagem de
pendência; ao reconectar, “Progresso sincronizado com sua conta.” aparece e o
cartão revisado não volta como pendente; recarregar mantém o resultado. Abrir uma
rota nova em modo avião pode falhar — isso é esperado nesta fase (sem offline).

## 11. Reduced motion

1. Ajustes → Acessibilidade → Movimento → Reduzir movimento.
2. Abrir uma lição e avançar.

Esperado: transições desnecessárias desligadas; a barra de prática não anima;
nenhuma informação depende de animação.

## 12. Instalação e atualização

1. Instalar, abrir, fechar.
2. Publicar/atualizar uma versão nova (quando houver deploy).
3. Reabrir o app instalado.

Esperado: a nova versão carrega de forma confiável (o app não usa service worker;
a atualização segue o cache HTTP normal). Se ficar preso em versão antiga, registrar
como bug.

## 13. Prática de fala experimental (`/fala`) e catálogo (Fase 8C)

- [ ] `/cursos` em iPhone: o texto do cartão do curso ocupa a largura útil, sem
      faixa vazia à direita; claro e escuro; sem rolagem horizontal.
- [ ] `/fala` abre sem pedir microfone. Ouvir o modelo não liga o microfone.
- [ ] Safari iOS (Siri/Ditado ativos): aviso de origem desconhecida; Falar sem
      permitir não liga o microfone; após permitir, o prompt do sistema aparece e
      "엄마" é reconhecido ou o erro é claro. Repetir com Siri/Ditado desativados.
- [ ] Web app na Tela de Início: aviso de indisponível + campo de texto.
- [ ] Chrome iOS: registrar se a API existe; se não, aviso + campo de texto.
- [ ] Parar/Cancelar/sair da página: o indicador de gravação do sistema some.
- [ ] Campo "Texto em coreano" com ditado do teclado funciona e compara.
- [ ] VoiceOver anuncia "Ouvindo… fale agora." e o resultado.

## 14. Matriz de teste manual para o beta controlado (Fase 8D)

Executada **pelo usuário**, em aparelhos reais. Nenhuma célula abaixo foi
testada pelo agente: **todas começam em "NÃO TESTADO"**. Preencha com
`OK`, `FALHA` (descreva) ou `N/A`, a data e a versão do SO/navegador. Não marque
`OK` por inferência.

Pré-requisitos: usuário autenticado; um item de cada bloco abaixo; pacote de
voz coreana do sistema instalado ou não, anotando qual caso.

| # | Cenário | iPhone Safari | iPhone Chrome | Android Chrome | Windows Chrome | Windows Edge |
|---|---|---|---|---|---|---|
| A1 | Login Google ida e volta, sessão persiste ao reabrir | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| A2 | Lição h01–h03 completa; progresso sincroniza entre dois aparelhos | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| A3 | Modo avião durante a lição → reconectar sem perder progresso | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| B1 | Áudio: "Ouvir" toca o MP3 (som audível, sem corte do início/fim) | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| B2 | Áudio: 0,75× mantém o tom; status diz "sintetizado", não "gravado" | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| B3 | Áudio com rede bloqueada para `/audio/*`: cai para voz coreana do sistema ou mostra "indisponível" (nunca "Reproduzindo" sem som) | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| B4 | Anotar impressões de ㄹ (라, 리, 말, 물), ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ — soam claras? (subjetivo; vira insumo para revisão nativa) | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C1 | `/fala` abre sem pedir microfone; "Ouvir o modelo" não liga o microfone | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C2 | Banner de capacidade correto (local / pode enviar / indisponível). Registrar qual apareceu | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C3 | Falar sem consentimento (modo remoto) **não** liga o microfone | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C4 | Após permitir: prompt do sistema; falar "엄마" → "Reconhecemos: …" coerente | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C5 | Negar o microfone → mensagem de bloqueio; campo de texto continua | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C6 | Falar em silêncio → "Não ouvimos nada"; depois de ~10 s sem fala → mensagem de tempo | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C7 | Cancelar, trocar de cartão enquanto ouve, trocar de aba e sair da página: o indicador de gravação do sistema **some** | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C8 | Desligar a rede no modo remoto → mensagem de rede | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C9 | Chrome/Edge: `available()` mostra "local"? Botão "Instalar reconhecimento local" só age com clique | N/A | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| C10 | Web app da Tela de Início (iOS) / app instalado: API disponível ou aviso de indisponível | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | N/A | N/A |
| D1 | `/cursos` sem faixa vazia à direita; claro e escuro | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| D2 | Instalação PWA (Adicionar à Tela de Início / Instalar app) e ícone | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO | NÃO TESTADO |
| D3 | Leitor de tela (VoiceOver / TalkBack / NVDA) anuncia "Ouvindo… fale agora." e o status do áudio | NÃO TESTADO | N/A | NÃO TESTADO | N/A | NÃO TESTADO |

Como relatar uma falha: modelo do aparelho, versão do SO e do navegador,
passo, resultado esperado × obtido e, se possível, captura de tela. Nunca anexe
áudio gravado; o KBR não grava e não precisa de áudio para diagnosticar.

Esta matriz **não** altera a nota nem o progresso de ninguém: é só evidência de
compatibilidade.

## Registro

| Item | Modelo / iOS / navegador | Data | Resultado | Observações |
|---|---|---|---|---|
| 1. Instalação Safari | | | | |
| 2. Chrome iOS | | | | |
| 3. Standalone/retomada | | | | |
| 4. Safe areas | | | | |
| 5. Teclado/zoom | | | | |
| 6. OAuth | | | | |
| 7. Sessão | | | | |
| 8. Voz coreana | | | | |
| 9. VoiceOver | | | | |
| 10. Offline/reconexão | | | | |
| 11. Reduced motion | | | | |
| 12. Atualização | | | | |
| 14. Matriz do beta (8D) | | | | preencher a tabela da seção 14 |
