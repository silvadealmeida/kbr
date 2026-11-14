# Opções de TTS coreano — comparação para o KBR

> **Comparação histórica (Fase 7G), sem decisão pendente.** O produto usa os MP3 de MeloTTS-Korean
> já gerados: áudio resolvido com créditos, **7.790 MP3** servidos por padrão, e sem TTS de
> navegador no player. Os riscos residuais de naturalidade foram aceitos e não bloqueiam release.
> As recomendações abaixo não constituem plano atual de troca de engine ou gravação nativa.

**Data:** 2026-11-12  
**Pergunta:** qual caminho dá áudio coreano confiável, revisável e sustentável para um app web mobile-first, sem transformar pronúncia em dependência de nuvem?  
**Natureza:** pesquisa e recomendação da 7G. A 8B instalou o MeloTTS-Korean em ambiente local e publicou assets sintéticos provisórios; a recomendação de gravação nativa como fonte principal continua válida. Ver `docs/audio/generation-guide.md`.

## Critérios

1. **Qualidade em coreano**, especialmente ㄹ posicional, vogais ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅟ, ㅢ, tensas/aspiradas e batchim.
2. **Licença compatível** com distribuição web e uso comercial do app.
3. **Estabilidade**: o mesmo item deve soar igual em qualquer dispositivo.
4. **Revisabilidade**: um falante nativo precisa poder ouvir, aprovar e substituir cada item.
5. **Custo e operação**: sem API paga em runtime, sem conta externa obrigatória, sem nova dependência pesada no cliente.
6. **Privacidade**: idealmente síntese local; se remota, o texto coreano sai do dispositivo.
7. **Acessibilidade**: fallback textual e controle do usuário, nunca autoplay.

## Comparação

| Opção | Tipo | Coreano | Licença | Custo | Offline | Privacidade | Esforço | Veredito |
|---|---|---|---|---|---|---|---|---|
| **Web Speech API** (voz do sistema) | Runtime do navegador | Variável; depende de voz instalada | Vozes do SO/navegador; sem licença própria do app | Grátis | Depende da voz (`localService`) | Pode ser local ou remota | Já implementado | **Fallback**, nunca referência única |
| **MeloTTS-Korean** | Neural offline | Bom; prosódia inferior a nativo | **MIT** (código e pesos publicados) | Grátis | Sim, após instalar | Local | Médio | **Melhor OSS para rascunho/cobertura** |
| **Piper `ko_KR-kss-medium`** | Neural offline | Razoável | Model card aponta dataset **CC BY-NC-SA 4.0** | Grátis | Sim | Local | Médio | **Excluir** de produção sem licença comercial |
| **XTTS v2** | Neural offline, clonagem | Bom em zero-shot | **CPML 1.0.0 — non-commercial** | Grátis | Sim | Local | Médio/Alto | **Excluir** |
| **Kokoro-82M** | Neural offline | **Sem voz coreana** | Apache 2.0 | Grátis | Sim | Local | Baixo/Médio | **Excluir** para coreano |
| **Google Cloud TTS** | Nuvem | Muito bom (Chirp 3/Neural2) | Proprietária; termos do serviço | 1M caracteres/mês grátis em Chirp 3/Neural2; 4M em Standard/WaveNet; exige billing | Não | Texto sai do dispositivo | Médio | **Só geração offline**, não runtime |
| **Azure Speech** | Nuvem | Muito bom (neural) | Proprietária; termos do serviço | F0: 0,5M caracteres neurais/mês | Não | Texto sai do dispositivo | Médio | **Só geração offline**, não runtime |
| **Gravação nativa** | Humano | **Referência** | Direitos autorais do próprio app, com contrato/consentimento | Custo da sessão | Sim | Local | Médio | **Recomendado para os 265 itens** |

Valores e limites de nuvem mudam; conferir a página de preços na data de contratação. O ponto importante não é o valor exato, e sim que **nuvem em runtime não é necessária** para um corpus de 265 clipes.

## Detalhe por opção

### 1. Web Speech API (estado atual)

**O que é:** `speechSynthesis` do navegador. Não é uma engine do app; é uma interface para vozes do sistema operacional ou do fornecedor do navegador.

**Vantagens:** zero dependência, zero asset, funciona offline quando a voz é local, já integrada e acessível.

**Limites:** a voz muda por dispositivo; o app não controla qualidade; não há garantia de voz coreana; vozes remotas podem enviar texto ao fornecedor; `localService` e `voiceschanged` não são tratados hoje (ver `current-audio-audit.md`).

**Papel recomendado:** fallback para itens sem asset e para conteúdo futuro, com seleção explícita de voz coreana e mensagem honesta quando não houver.

### 2. MeloTTS-Korean

**O que é:** biblioteca de TTS da MyShell.ai, com modelo coreano publicado no Hugging Face como `myshell-ai/MeloTTS-Korean`, licença **MIT**.

**Vantagens:** licença permissiva; roda offline; permite gerar os 265 itens de uma vez; bom para rascunho, testes de duração e cobertura inicial.

**Limites:** não é referência nativa; pode errar ㄹ posicional, grupos consonantais e prosódia de frase; exige instalação Python/CPU ou GPU fora do app; a licença MIT dos pesos não dispensa revisar os termos dos dados de treino e manter atribuição.

**Papel recomendado:** gerar candidatos para revisão, nunca publicar como pronúncia final sem escuta nativa. Se usado, marcar os itens como “áudio sintetizado em revisão”.

**Uso na 8B e ampliação:** o MeloTTS-Korean foi escolhido para a referência provisória e rodou em CPU, com revisões fixadas. O corpus em `public/audio/v1/` cobre Hangul, A1, A2 e vocabulário (2.907 textos) e está documentado em `docs/audio/generation-guide.md`. A imagem Docker `hangrylabs/melotts` foi avaliada e **rejeitada** por licença AGPL-3.0-only, suporte apenas `amd64`, tamanho (~8,3 GB comprimida) e pacote coreano com aceite manual. O ponto pendente é o encoder `kykim/bert-kor-base`, que **não declara licença**; isso impede tratar o pipeline como liberado para produção comercial sem revisão jurídica.

**Referência:** <https://huggingface.co/myshell-ai/MeloTTS-Korean>

### 3. Piper `ko_KR-kss-medium`

**O que é:** voz VITS do projeto Piper, rápida e offline.

**Licença:** o card do modelo em `rhasspy/piper-voices` aponta o dataset KSS para **CC BY-NC-SA 4.0**. O repositório do Hugging Face exibe metadado “MIT”, mas o próprio model card e o dataset linkam a licença não comercial. Tratar como **non-commercial** até parecer jurídico em contrário.

**Vantagens:** leve, rápido, offline, boa latência.

**Limites:** a restrição não comercial inviabiliza um app que possa ser monetizado ou redistribuído sem essa cláusula; a qualidade é inferior à gravação nativa.

**Papel recomendado:** **não usar** no produto. Serve apenas para experimento interno, se a licença for aceita para pesquisa.

**Referência:** <https://huggingface.co/rhasspy/piper-voices/blob/main/ko/ko_KR/kss/medium/MODEL_CARD>

### 4. XTTS v2 (Coqui)

**O que é:** modelo multilíngue com clonagem zero-shot, incluindo coreano.

**Licença:** **Coqui Public Model License 1.0.0 (CPML)**, que permite apenas uso não comercial do modelo e das saídas.

**Vantagens:** naturalidade alta; clonagem de voz com poucos segundos.

**Limites:** licença não comercial; modelo pesado; clonagem levanta consentimento e direitos de voz; não é necessário para um corpus fixo de 265 itens.

**Papel recomendado:** **excluir**. Não vale trocar uma licença restritiva por alguns pontos de naturalidade quando a gravação nativa é viável.

**Referência:** <https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt>

### 5. Kokoro-82M

**O que é:** modelo leve, Apache 2.0, popular por rodar em CPU e em dispositivo.

**Coreano:** a lista de vozes cobre inglês, espanhol, francês, hindi, italiano, japonês, português e chinês; **não há voz coreana** na versão 82M.

**Papel recomendado:** **excluir** para coreano. Não adianta a licença permissiva sem cobertura do idioma.

### 6. Google Cloud Text-to-Speech

**O que é:** API neural com vozes coreanas (Chirp 3, Neural2, WaveNet/Standard).

**Free tier publicado:** 0 a 1 milhão de caracteres/mês para Chirp 3 e Neural2; 0 a 4 milhões para WaveNet/Standard. Exige habilitar billing e pode cobrar ao ultrapassar.

**Vantagens:** qualidade alta; vozes consistentes; útil para gerar um lote de rascunhos.

**Limites:** runtime remoto; conta e billing; latência e disponibilidade externas; o texto sai do dispositivo; termos de cache/redistribuição do áudio gerado precisam ser verificados antes de publicar.

**Papel recomendado:** **geração offline em lote** para candidatos, se MeloTTS não bastar. Não usar como engine de runtime.

**Referência:** <https://cloud.google.com/text-to-speech/pricing>

### 7. Azure Speech

**O que é:** API neural da Microsoft, com vozes coreanas.

**Free tier publicado:** F0 com 0,5 milhão de caracteres neurais por mês.

**Vantagens:** qualidade alta; boa variedade de vozes.

**Limites:** os mesmos de nuvem: conta, billing, latência, privacidade, termos; não é necessária para 265 clipes.

**Papel recomendado:** alternativa de geração offline; não runtime.

**Referência:** <https://azure.microsoft.com/en-us/pricing/details/speech/>

### 8. Gravação com falante nativo

**O que é:** gravar os 265 textos únicos (e as formas `spoken` das regras) com um ou dois falantes nativos, em estúdio caseiro tratado ou estúdio.

**Vantagens:** melhor qualidade; consistência entre dispositivos; permite revisão item a item; elimina dependência de voz do sistema; funciona offline; o app é dono do asset (com contrato).

**Limites:** custo da sessão, tempo de edição e necessidade de refazer se o conteúdo mudar. Para 265 itens curtos, é uma sessão pequena, não um projeto de dublagem.

**Papel recomendado:** **fonte principal** da pronúncia. TTS fica como fallback.

## Licenças: o que não confundir

- **Licença do código ≠ licença dos pesos ≠ licença do dataset ≠ licença do áudio gerado.** O caso do Piper é o exemplo: runtime MIT, mas a voz KSS herda um dataset CC BY-NC-SA.
- **MIT nos pesos** não garante que todo o pipeline de treino esteja livre; mantenha um arquivo `NOTICE` com modelo, versão, licença e atribuição.
- **Áudio gerado por nuvem** pode ter termos de uso, cache e redistribuição; leia antes de versionar o arquivo no repositório.
- **Voz humana** exige consentimento escrito para uso no app, incluindo futura distribuição e eventuais peças de divulgação. Não use voz de celebridade, político ou pessoa pública sem autorização.
- **Clonagem de voz** não é necessária para este produto e adiciona risco jurídico e ético; evitar.

## Recomendação

**Trilha principal:** gravar nativamente os 265 `audioText` únicos + as formas `spoken` das três regras + os itens de anatomia/montagem que não estiverem cobertos. Publicar como assets estáticos, com revisão nativa e fallback para TTS.

**Trilha de apoio:** usar **MeloTTS-Korean (MIT)** apenas para gerar rascunhos e testar duração/cobertura; nunca como pronúncia final sem escuta nativa. Se a qualidade não bastar, gerar candidatos no Google Cloud/Azure e revisar, mas sem runtime de nuvem.

**Na 8B:** o MeloTTS-Korean gerou os 287 assets provisórios, com revisões fixadas e sem dependência em runtime. Isso deu estabilidade entre dispositivos e permitiu testar o player, o fallback e o orçamento. A gravação nativa continua sendo a fonte principal e o critério para marcar o áudio como aprovado.

**Não usar:** Piper KSS (NC), XTTS v2 (CPML NC), Kokoro (sem coreano) e qualquer engine que não permita redistribuir o áudio.

**Resposta curta à pergunta “melhor solução gratuita/OSS”:** para este corpus, a melhor solução é **gravação nativa**; se for preciso TTS para rascunho, **MeloTTS-Korean** é a opção OSS permissiva mais adequada. Não existe TTS gratuito que substitua a revisão de um falante nativo para ㄹ e vogais.
