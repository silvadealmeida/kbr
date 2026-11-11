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
