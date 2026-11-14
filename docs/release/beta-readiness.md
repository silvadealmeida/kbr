# Prontidão para release público — decisão final

**Atualizado:** 14 de novembro de 2026
**Veredito:** projeto concluído para release público. A produção já foi aceita pelo responsável e não foi revalidada nesta execução; nova validação de produção não é requisito. Não haverá deploy manual. Não há fase ou tarefa planejada.

## Decisões consolidadas

| Área | Estado final | Evidência / limite declarado |
|---|---|---|
| Produção | **ACEITA PELO RESPONSÁVEL** | Não houve nova validação nesta execução, conforme decisão do responsável. Não é bloqueio. |
| Áudio | **RESOLVIDO COM CRÉDITOS** | 7.790 MP3 de Hangul, A1, A2, B1, B2, C1, C2 e vocabulário; servidos por padrão. `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é somente kill switch. Créditos para MeloTTS, MeloTTS-Korean, `kykim/bert-kor-base`/LMkor e FFmpeg/libmp3lame em `/impressum` e `docs/audio/credits.md`. |
| Revisão editorial | **CONCLUÍDA E ACEITA** | Revisão editorial final assistida por IA, aceita pelo responsável pelo projeto. Foram lidas as correções dos 237 distratores e os achados ainda `in-review`; dez erros concretos foram corrigidos com regressões. Não se afirma revisão por falante nativo. |
| Conteúdo `in-review` | **RISCO RESIDUAL ACEITO** | O rótulo permanece para não sugerir validação nativa. Naturalidade, registro, tradução e áudio sintético não foram aprovados por falante nativo; isso não bloqueia o release. |
| Privacidade e jurídico | **POLÍTICA OPERACIONAL FINALIZADA** | `/privacidade` e `/impressum` descrevem os limites e o canal público existente sem inventar dados pessoais. Não se afirma parecer de advogado ou conformidade profissional certificada. |
| Dispositivos físicos | **NÃO EXECUTADOS; NÃO EXIGIDOS** | Playwright Chromium/WebKit cobre a matriz documentada. iPhone/Android físicos, leitores de tela reais e teclados nativos não foram testados e não bloqueiam o release. |
| Testes automatizados | **APROVADOS NESTA FINALIZAÇÃO** | Typecheck, 728 testes Vitest, build de produção e matriz Playwright: 711 passaram, 38 skips intencionais, zero falhas. Nenhum teste foi enfraquecido. |

## Política operacional publicada

- O único canal de contato publicado é o repositório público `https://github.com/silvadealmeida/kbr`. Não há e-mail privado de privacidade publicado. A página instrui a não publicar dados pessoais e reconhece o limite de não haver canal privado.
- O repositório não declara licença de reutilização do código/conteúdo; acesso público não concede direitos de cópia. Nenhuma licença foi inventada nesta finalização. Isso não impede o funcionamento ou a publicação do serviço.
- Não há botão de exclusão de conta no app; a política não inventa prazo de retenção nem prazo próprio de resposta. Logs de provedores seguem as políticas deles.
- As páginas legais não alegam avaliação de advogado, isenção ou conformidade jurídica certificada. O responsável aceita esses limites operacionais como riscos residuais não bloqueantes.

## Limites e riscos residuais aceitos

- Sem revisão por falante nativo ou teste com aprendizes; sem validação psicométrica ou equivalência CEFR/TOPIK.
- Áudio sintético, não gravação nativa, e sem avaliação automática de pronúncia.
- Sem teste físico de iPhone/Android, VoiceOver/TalkBack ou teclado nativo; axe não é certificação WCAG.
- O canal público não é privado, não há exclusão de conta pelo app, e retenção de logs de terceiros/região de hospedagem não é especificada nesta política.
- O repositório não declara licença de reutilização do código/conteúdo; acesso público não concede direitos de cópia. Nenhuma licença foi inventada nesta finalização. Isso não impede o funcionamento ou a publicação do serviço.
- A decisão do responsável sobre produção é aceita; esta execução não acessa nem altera Vercel/Supabase.

Esses limites foram aceitos pelo responsável e **não são bloqueios do release**. Nenhum nível será descrito como revisado por falante nativo. Nenhuma nova fase está planejada.

## Gates desta finalização

| Comando | Resultado |
|---|---|
| `npm run typecheck` | **PASS** (`tsc --noEmit`) |
| `npm test` | **PASS** — 54 arquivos, **728 testes**; 8,54 s |
| `npm run build` | **PASS** — Next.js 16.4.6 / Turbopack; rotas públicas e dos cursos geradas |
| `npm run e2e -- --config=.e2e-isolated.config.ts` | **PASS** — matriz completa: **711 passaram, 38 skips intencionais, 0 falhas**; Chromium 375/390/768/1280 + WebKit 390; 3,4 min |

O E2E usou uma configuração isolada temporária na porta 3101, herdando os projetos e a matriz de `playwright.config.ts`, porque a porta 3100 estava ocupada por outro projeto local. O servidor preexistente não foi interrompido. O mock Supabase de teste iniciou em 54321. Os dois ajustes de regressão nesta finalização mantêm asserções válidas: o smoke verifica o aviso legal atual e o OAuth compara a origem efetiva da página. Os 38 skips existentes continuam intencionais e documentados nos specs; nenhum foi introduzido para obter o resultado.

O aviso de `configLoader: 'native'` do Vite durante o Vitest é informativo e não afeta o resultado. Os resultados acima são desta finalização; contagens históricas por fase não os substituem.
