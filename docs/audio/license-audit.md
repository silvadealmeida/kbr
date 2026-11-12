# Auditoria de licenças do áudio sintético — Fases 8D e 8E

**Data:** 2026-11-12  
**Escopo:** cadeia de dependências que gerou os 287 MP3 de `public/audio/hangul/v1/`.  
**Veredito:** **distribuição pública/comercial BLOQUEADA até esclarecimento por escrito ou substituição.** Este documento não é parecer jurídico e não afirma que o uso seja ilegal nem que seja permitido. Ausência de licença não é tratada como permissão, e a licença MIT do MeloTTS não é tratada como cobertura automática de cada checkpoint.

## 1. Cadeia de geração e o que cada elo declara

| Elo | Origem / revisão fixada | Licença **declarada** (fonte primária) | Estado |
|---|---|---|---|
| Código MeloTTS | `myshell-ai/MeloTTS` @ `209145371cff8fc3bd60d7be902ea69cbdb7965a` (24/12/2024) | MIT — arquivo `LICENSE` ("Copyright (c) 2024 MyShell.ai") e README | declarada |
| Checkpoint da voz | `myshell-ai/MeloTTS-Korean` @ `0207e5adfc90129a51b6b03d89be6d84360ed323` (= HEAD de `main`, 29/02/2024) | MIT — metadado `license: mit` e frase "free for both commercial and non-commercial use" no model card | declarada; **dados de treino não divulgados** (o card não cita datasets) |
| Encoder BERT | `kykim/bert-kor-base` @ `1779cc0982ada0216dd6de0dd4e86fb78201926d` (= HEAD de `main`, 19/05/2021) | **nenhuma** no repositório do Hugging Face (sem tag `license`, front matter só `language: ko`, README de 442 caracteres sem termos) | **sem licença no repositório baixado** |
| Mesmo encoder, repositório do autor | `kiyoungkim1/LMkor` (GitHub, README e `LICENSE`) | README: "The pretrained models is distributed under the terms of the Apache-2.0 License." **E** (em coreano) "para uso comercial, pode-se usar gratuitamente por meio de um MOU; contate kykim@artificial.sc". `LICENSE` = texto padrão do Apache-2.0 com o campo `[name of copyright owner]` **não preenchido** | declarações **não reconciliadas** |
| G2P / dicionários / runtime | `g2pkk`, `python-mecab-ko(-dic)`, UniDic 3.1.0, NLTK, PyTorch, transformers 4.27.4, librosa… | **não auditadas nesta fase** | pendente (ferramentas de geração; nenhum desses artefatos é embutido nos MP3) |

Hashes dos arquivos baixados (registrados na 8B, `generation-guide.md`): `checkpoint.pth` `48e3ff3f…a4d0`, `pytorch_model.bin` (BERT) `ae43a392…8236`.

### Itens adicionais encontrados

- A página do GitHub do LMkor lista o dataset de pré-treino do BERT (reviews, blogs, "모두의 말뭉치", Wikipédia, 나무위키) **sem declarar licença dos dados**. Se e como isso afeta o modelo ou saídas derivadas não é determinável com a evidência disponível.
- O único issue aberto do LMkor (#8) não trata de licença; issues fechados não foram lidos. Não há resposta de mantenedor sobre licença.
- O issue #43 do MeloTTS ("License error", aberto em 02/03/2024, sem resposta de mantenedor) levanta, de um terceiro, que o Bert-VITS2 (base declarada do MeloTTS em "Acknowledgements") é AGPL-3.0 enquanto o MeloTTS se declara MIT. Não verificamos o mérito; é um risco de **linhagem** adicional, independente do `kykim`.
- A imagem Docker `hangrylabs/melotts` (AGPL-3.0-only) **não** foi usada (decisão da 8B).

## 2. O checkpoint do `kykim/bert-kor-base` é necessário?

**Sim, nos dois usos, com evidência no código instalado:**

1. **Tokenizer/vocabulário** — `melo/text/korean.py:94-95`: `model_id = 'kykim/bert-kor-base'; tokenizer = AutoTokenizer.from_pretrained(model_id)`. `g2p()` usa esse tokenizer para segmentar o texto e distribuir fonemas (`word2ph`). Isso ocorre mesmo que os pesos do BERT não fossem usados.
2. **Pesos (features contextuais)** — `melo/text/korean.py` → `get_bert_feature` → `japanese_bert.get_bert_feature(..., model_id=model_id)`. Em `melo/utils.py:34` os embeddings só viram zeros se `hps.data.disable_bert` for verdadeiro; o `config.json` do `MeloTTS-Korean` **não define** `disable_bert`, logo o BERT roda em toda síntese e alimenta `ja_bert_proj` (`melo/models.py`, entrada de 768 dim.).

O script `scripts/audio/generate-melotts.py` só redireciona o carregamento para a cópia local fixada; não remove a dependência.

## 3. Os MP3 contêm o BERT? Os termos alcançam a saída?

- Os pesos do BERT **não são embutidos** nos MP3; são entrada do processo de síntese. Os MP3 são saída de outro modelo (VITS) condicionado nessas features.
- Nenhum dos textos acima (Apache-2.0, frase do MOU, MIT) trata de **obras geradas** a partir do modelo. Se uma restrição de uso comercial do MOU alcança áudio produzido com o encoder é uma questão **jurídica em aberto**; não há base para afirmar nem negar.
- Também não está documentado quais dados treinaram a voz do `MeloTTS-Korean`; direitos sobre a voz/corpus de treino são desconhecidos.

## 4. Restrições aplicáveis e documentação defensável

- **Apache-2.0** (se aplicável ao modelo) concederia, em tese, direitos de uso/redistribuição, inclusive comerciais; **mas** a mesma página afirma que o uso comercial passa por um MOU, e o `LICENSE` não identifica o titular. O repositório baixado (HF) não repete nenhum dos dois.
- **MIT** do MeloTTS não faz menção a pesos de terceiros.
- **Conclusão sobre "documentação de direitos defensável":** hoje o projeto tem proveniência e hashes completos, mas **falta o elo essencial** — uma declaração do autor do encoder que resolva a contradição Apache-2.0 × MOU e cubra o uso para gerar áudio distribuído. Sem isso, a documentação **não é defensável** para distribuição pública ou comercial.

## 5. Alternativas com licença clara

| Alternativa | Licença (declarada) | Impacto técnico | Observação |
|---|---|---|---|
| `klue/bert-base` no lugar do `kykim` | CC-BY-SA-4.0 (verificado no card) | **Não é drop-in.** O checkpoint foi treinado com as features do `kykim`; trocar o encoder exige ajuste fino/retreino (dados e GPU que o projeto não tem) e a cláusula *ShareAlike* teria que ser analisada | descartar para esta fase |
| Rodar com `disable_bert` | — | O checkpoint não foi treinado sem BERT; qualidade provavelmente degradada. Pode ser **testado localmente, sem custo**, em diretório temporário (não feito aqui; exigiria regerar áudio) | experimento barato antes de decidir |
| Outro TTS coreano de código aberto com licença permissiva | a avaliar | Reescrever `scripts/audio/*`, regerar 287 clipes, reauditar qualidade | nenhum candidato foi verificado nesta sessão; exigir licença do **código, dos pesos e dos dados** |
| Gravação por falante nativo com consentimento escrito | contrato próprio | Maior custo; resolve licença e qualidade | meta de longo prazo (sem exigência para a 8D) |
| Apenas voz do sistema (sem MP3) | do SO/navegador | Zero risco de licença de assets; qualidade variável | já existe como fallback |

## 6. Plano de remediação (nada foi apagado nem regenerado)

| # | Ação | Responsável | Impacto estimado | Resultado esperado |
|---|---|---|---|---|
| R1 | Pedir **por escrito** ao autor (endereço publicado no README do LMkor) que confirme: licença aplicável ao `bert-kor-base` do HF; se o uso para **gerar áudio distribuído/comercial** é permitido ou exige MOU. Guardar a resposta em `docs/audio/permissions/` | dono do projeto | ~0,5 h + espera | libera, restringe ou nega — decisão final |
| R2 | Perguntar à MyShell (issue/e-mail) sobre dados de treino do `MeloTTS-Korean` e a relação com Bert-VITS2 (issue #43) | dono do projeto | ~0,5 h + espera | fecha o risco de linhagem |
| R3 (**feito na 8E**, ver §8) | **Interromper distribuição sem apagar:** `public/` é servido direto, então desligar no player **não basta**; excluir `public/audio/**` do deploy (por exemplo `.vercelignore`/artefato de build) **e** tornar `resolveAudioAsset` nulo por flag, caindo na voz do sistema. Os arquivos permanecem no Git | agente (com aprovação) | ~0,5–1 dia com testes | contingência pronta se R1 negar ou não responder |
| R4 (**avaliado na 8E**: `tts-alternatives.md`; sem substituto aprovado) | Avaliar TTS alternativo com licença verificável (código + pesos + dados) e comparar com os 287 itens | agente | 1–3 dias | substituto ou decisão de não ter MP3 |
| R5 | Gravação nativa (já planejada em `audio-quality-roadmap.md`) | dono + falante nativo | semanas | substitui o sintético; resolve licença e revisão |
| R6 (**feito na 8E**: `dependency-licenses.md`) | Auditar licenças restantes (`g2pkk`, `mecab-ko-dic`, UniDic, NLTK, torch…) e registrar | agente | ~0,5 dia | fecha o item "pendente" da tabela 1 |

**Caminho recomendado:** R1 e R2 imediatamente (custo zero); preparar R3 em paralelo como contingência; decidir R4/R5 conforme as respostas.

## 7. Estado de distribuição

| Contexto | Estado |
|---|---|
| Desenvolvimento local / testes automatizados | permitido (sem redistribuição) |
| Beta fechado com convidados | **decisão do dono do projeto**, risco não resolvido; rotular o áudio como sintético/provisório (já corrigido na 8D) |
| Lançamento público ou comercial | **BLOQUEADO** |

Tabela de revisão futura: quando houver resposta, registrar data, remetente, texto recebido e revisão do encoder coberta, e só então remover o bloqueio em `docs/release/beta-readiness.md`.

## 8. Fase 8E — contenção, evidências reverificadas e pendências

**Reverificado em 2026-11-12 nas fontes primárias** (API do Hugging Face e do GitHub):

| Fonte | Achado |
|---|---|
| `kykim/bert-kor-base` @ `1779cc09…926d` (https://huggingface.co/api/models/kykim/bert-kor-base) | tags sem `license`; `cardData` = só `language: ko`. Inalterado desde 19/05/2021 |
| `kiyoungkim1/LMkor` (https://github.com/kiyoungkim1/LMkor) | API de licença: Apache-2.0 (`LICENSE` sha `261eeb9e…`). README linha 6: uso comercial via MOU (kykim@artificial.sc); linha 146: "distributed under the terms of the Apache-2.0 License". Último push 2023-01-01. A contradição **persiste** |
| `myshell-ai/MeloTTS-Korean` @ `0207e5ad…ed323` | `license: mit`; sem menção a dados de treino nem ao encoder |
| `myshell-ai/MeloTTS` | MIT (`LICENSE` sha `7c494760…`); README cita "TTS, VITS, VITS2 e Bert-VITS2" como base; Discussions desativadas; issue #43 "License error" ainda **aberto, 0 comentários** |

Separação pedida: **licença de código** (MeloTTS MIT, g2pkk Apache-2.0 etc.) ≠ **licença dos pesos** (MeloTTS-Korean MIT declarada; BERT sem licença no HF) ≠ **encoder** (contraditório) ≠ **dependências de terceiros** (`dependency-licenses.md`) ≠ **direitos na saída** (nenhum documento consultado trata de obras geradas) ≠ **redistribuição/uso comercial** (condicionados ao MOU para o encoder). Nenhuma permissão foi inferida do MIT do pai.

**Perguntas ainda sem resposta:** (1) Apache-2.0 vale para o checkpoint do HF? (2) O MOU alcança áudio gerado com o encoder, mesmo gratuito/open source? (3) Com que dados a voz `KR` foi treinada? (4) A linhagem Bert-VITS2/AGPL (issue #43) afeta o checkpoint? (5) Os direitos do corpus de pré-treino do BERT. Rascunhos de pedido: `docs/audio/permissions/email-drafts.md` (**não enviados**).

**Contenção implementada (reversível, nada apagado):**
- `git mv public/audio restricted-assets/audio` (287 MP3; manifesto em `src/content/audio/` e scripts de geração intactos).
- Flag de build `NEXT_PUBLIC_KBR_STATIC_AUDIO` (padrão desligada) em `src/lib/audio/flags.ts`; o player só recebe caminho de MP3 via `resolvePublicAudioSrc`.
- Guarda de build `scripts/audio/verify-no-restricted-audio.mjs` (prebuild e postbuild) e testes em `tests/audio-containment.test.ts`.
- Fallback: voz coreana explícita do sistema; sem voz, dica textual. A mensagem diz "voz do sistema, sem revisão nativa".
- Reativação: `docs/audio/generation-guide.md` ("Contenção e como reativar").

## 9. Exposição que a contenção NÃO remove (atualizado na 8F)

> **Correção da 8F (2026-11-12):** a versão da 8E (escrita antes do deploy) dizia que a produção ainda servia os MP3. O push de `daf4f12` já ocorreu, a Vercel implantou (status `success`) e a **produção responde 404** nos MP3. O que continua exposto é o **GitHub** e, possivelmente, **deployments antigos**. Evidências, comandos e plano completo: [`exposure-and-removal-plan.md`](exposure-and-removal-plan.md).

| Superfície | Estado em 2026-11-12 |
|---|---|
| Produção `kbr-amber.vercel.app` | **contida**: `/audio/hangul/v1/*.mp3` → 404 (a `max-age=1 ano, immutable` servida por `f0b2f43` até o deploy pode ter ficado em navegadores/CDN de terceiros) |
| Deployments anteriores da Vercel | **não verificado** (sem acesso à Vercel); aliases do projeto redirecionam para SSO; exige o dono (plano §4) |
| GitHub `main` | **exposto** em `restricted-assets/audio/` (HTTP 200); `public/audio/` já dá 404 |
| GitHub, histórico (`f0b2f43`, `a8a7fb0`…) | **exposto** (287 blobs; 574 caminhos) |
| Rede do repositório | público, 0 forks, 1 stargazer; cópias de terceiros desconhecidas e irreversíveis |

Opções (todas dependem do dono; nada foi feito): (a) tornar o repositório privado — mais barata e reversível; (b) `git rm -r --cached restricted-assets/audio` + `.gitignore` com backup privado (remove do HEAD, não da história); (c) `git filter-repo` + force-push (só após backup; invalida SHAs); (d) manter, aceitando o risco. Detalhes no plano.

## 10. Estado de distribuição (8E)

| Contexto | Estado |
|---|---|
| Desenvolvimento local / testes | permitido |
| Novo build do site | **sem MP3** (guardado por teste e por `postbuild`) |
| Site publicado (produção) | **sem MP3** (404 verificado na 8F); deployments antigos não verificados |
| Repositório público | **ainda expõe** os MP3 em `restricted-assets/` e na história (§9) |
| Lançamento público ou comercial | **BLOQUEADO** |

## 11. Decisão do dono do projeto (2026-11-12): uso liberado no app

**Decisão:** o dono do projeto determinou que as restrições técnicas de uso sejam removidas e que o áudio
sintético seja servido normalmente no app, incluindo todo o curso A2. A contenção da 8E foi revertida.

- `restricted-assets/audio/` foi movido de volta para `public/audio/v1/` e é versionado novamente.
- `NEXT_PUBLIC_KBR_STATIC_AUDIO` deixou de bloquear o player: o padrão é **ligado**
  (`STATIC_AUDIO_ENABLED = process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO !== "0"`). `0` funciona como
  kill switch de deploy.
- A guarda de build, o script de stage/unstage e `tests/audio-containment.test.ts` foram removidos.
- O corpus foi ampliado de 287 para os textos de Hangul + A1 + A2 + vocabulário (ver
  `docs/audio/generation-guide.md`).

**Risco que permanece registrado, sem alteração de fato:** o encoder `kykim/bert-kor-base` continua sem
licença declarada no Hugging Face e a contradição Apache-2.0 × MOU do repositório do autor não foi
resolvida. A decisão acima é de risco aceito pelo dono do projeto, **não** um parecer jurídico nem uma
confirmação de licença. Antes de lançamento comercial, as ações R1/R2/R5 do §6 continuam recomendadas.
