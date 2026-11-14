# KBR — auditoria técnica e política operacional de privacidade

**Atualizado:** 14 de novembro de 2026.
**Estado:** política operacional finalizada pelo responsável pelo projeto; sem alegação de parecer profissional. Os riscos residuais descritos aqui são aceitos e não bloqueiam o release. A produção foi aceita pelo responsável; esta auditoria não solicita nem condiciona nova validação de produção.

Este documento descreve o comportamento identificado no produto e as decisões operacionais publicadas em `/privacidade` e `/impressum`. Não é parecer jurídico, não afirma que houve revisão por advogado e não inventa nome civil, endereço, e-mail ou prazos.

## 1. Dados tratados

- **Conta Google:** o login é intermediado pelo Supabase Auth. O serviço recebe identificador do Google, e-mail, nome/foto quando fornecidos e metadados da conta e sessão. O KBR não recebe a senha Google.
- **Progresso:** lições, cartões e agenda de revisão, histórico de tentativas, sequência, meta diária e última atividade. Com conta, o snapshot é sincronizado no Supabase e mantido em cópia local; no modo convidado, fica no navegador.
- **Dados técnicos:** Vercel e Supabase podem registrar IP, horário, navegador, rota e erros necessários à operação e segurança. O KBR não usa esses registros para publicidade ou perfilamento.
- **Fala experimental (`/fala`):** o microfone só é iniciado após clique e, se o processamento for remoto ou desconhecido, após consentimento em memória. O KBR não grava, armazena, registra ou transmite áudio ou texto reconhecido. O navegador ou seu fornecedor pode processar a fala conforme a própria política.

## 2. Cookies e armazenamento local

Os cookies de sessão e PKCE são geridos pelo Supabase; `kbr_auth_next` guarda apenas o destino interno do login por até dez minutos. A configuração padrão do SDK pode manter a sessão por até 400 dias, sujeita à configuração efetiva do projeto. O cookie de sessão não é `HttpOnly`, pois o SDK o lê no navegador, e usa `SameSite=Lax`.

Chaves locais conhecidas: `kbr:theme` (tema), `kbr:v1` (progresso de convidado), `kbr:user:<uuid>:v1` (cópia local da conta) e `kbr:migrated:<uuid>:v1` (marcador de migração). Limpar dados do navegador apaga essas cópias locais, mas não apaga o snapshot remoto.

Não há analytics, pixels, publicidade, iframes, service worker ou cache offline no app. Google é usado para OAuth; Supabase para autenticação e banco; Vercel para hospedagem e logs técnicos. Fontes usadas no app são servidas pelo próprio domínio após o build.

## 3. Finalidades e bases operacionais

O produto trata dados para manter a conta e sincronizar o progresso, operar e proteger o serviço, cumprir obrigações aplicáveis e responder a pedidos. As bases consideradas pelo produto são execução de contrato/procedimentos preliminares, obrigação legal e legítimo interesse, conforme a finalidade. Esta classificação é uma política operacional do projeto, não uma conclusão profissional sobre a legislação aplicável.

## 4. Retenção, exclusão e pedidos de titulares

O produto não define prazo fixo para o snapshot remoto: ele é mantido enquanto a conta existir, até que uma exclusão seja solicitada e processada ou uma obrigação aplicável exija conservação. A cópia local permanece até a pessoa limpar os dados do navegador. Logs de provedores seguem as políticas e configurações desses provedores; o KBR não publica um prazo específico para eles.

Não há botão de exclusão de conta no app. O único canal de contato publicado pelo projeto é a página pública do repositório [silvadealmeida/kbr](https://github.com/silvadealmeida/kbr). Esse canal não é privado: não publique ali e-mail, identificadores de conta, progresso ou outros dados pessoais. Use-o apenas para pedir um meio privado de contato. Atualmente não há endereço de e-mail de privacidade nem outro canal privado publicado; isso limita o processamento de pedidos que exijam troca de dados de identificação e é um risco operacional aceito, não um bloqueio de release.

Pedidos de acesso, correção, exclusão ou outras solicitações podem ser iniciados por esse canal público sem incluir dados pessoais. O projeto não promete prazo próprio além dos prazos legais aplicáveis e não afirma que a identidade possa ser verificada por uma mensagem pública.

## 5. Compartilhamento e transferências

Não vendemos dados pessoais. Supabase trata autenticação e progresso sincronizado; Google fornece identidade para o login; Vercel hospeda a aplicação e pode registrar eventos técnicos. Esses prestadores podem tratar dados fora do Brasil ou do Espaço Econômico Europeu. A página pública não afirma uma região específica de hospedagem nem detalha instrumentos contratuais de transferência que não estejam publicados.

## 6. Aviso legal / Impressum

O projeto não publica intencionalmente nome civil ou razão social de operador, endereço postal, telefone, representante ou registro comercial. Nenhum desses dados é inventado ou substituído por placeholder. O canal público disponível é o repositório GitHub indicado acima; não é um canal privado para dados pessoais.

A página `/impressum` informa que a análise de aplicabilidade de regras como DDG e MStV não foi objeto de parecer profissional. O produto não afirma isenção, conformidade jurídica certificada ou revisão por advogado. A decisão operacional final do responsável é manter a política publicada e aceitar esse limite residual sem bloquear o release.

## 7. Segurança e cobertura

A aplicação usa HTTPS em produção, chave publicável do Supabase no cliente, RLS por usuário e `no-store` nas rotas privadas. Esses controles são defesa em profundidade, não pentest nem garantia contra todo incidente. O app não usa chave `service_role` no navegador.

A matriz Playwright cobre Chromium e WebKit com viewports documentados no relatório de release. Testes em iPhone/Android físicos, leitores de tela reais e validação manual de teclado/safe-area não foram executados nesta finalização e não são requisito para encerrá-la. axe não equivale a certificação WCAG. Esses limites foram aceitos e não são bloqueios ativos.

## Referências

- Política pública: `src/app/(site)/privacidade/page.tsx`.
- Impressum: `src/app/(site)/impressum/page.tsx`.
- Inventário de dados e sincronização: `docs/architecture.md`.
- Prontidão e gates do release: `docs/release/beta-readiness.md`.
