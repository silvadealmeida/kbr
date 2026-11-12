# Áudio atual — auditoria técnica e de experiência

**Data:** 2026-11-12  
**Fase:** 7G (auditoria; nenhuma troca de engine nesta fase)  
**Escopo:** inventariar o áudio existente, rastrear o caminho de reprodução, diagnosticar o relato de ㄹ/vogais e separar fatos verificados de hipóteses.  
**Fora de escopo:** trocar TTS, instalar dependências, criar arquivos de áudio, alterar conteúdo, `Progress` v1, CAS, Supabase, auth ou PWA.

> **Atualização da 8B (2026-11-12):** esta auditoria descreve o estado da **7G** e foi preservada como registro histórico. A 8B implementou o caminho principal com **287 MP3 estáticos** gerados por MeloTTS-Korean, resolveu a seleção explícita de voz coreana, `voiceschanged`, timeouts, erros, replay, cancelamento e status honesto, e manteve a Web Speech API apenas como fallback. Os achados 1–3 abaixo estão resolvidos no código; a qualidade nativa de ㄹ/vogais e a reprodução em iPhone real continuam **não verificadas**. Ver `docs/audio/generation-guide.md`, `docs/audio/audio-quality-roadmap.md` e `docs/roadmap.md` §Status Fase 8B.

## Resumo executivo

1. O app **não tem áudio próprio**. Toda fala vem da Web Speech API do navegador (`speechSynthesis`), sem arquivo, sem CDN e sem API externa. `audioSrc` existe no tipo, mas nunca é lido e não há nenhum arquivo em `public/audio/`.
2. A voz **não é escolhida pelo app**. `speakKorean` define `lang = "ko-KR"` e `rate = 0.85`, mas não define `utterance.voice`, não verifica `getVoices()`, não espera `voiceschanged` e não checa `localService`.
3. O app **não sabe se existe voz coreana**. `speakKorean` retorna `true` só porque `speechSynthesis` existe; a UI então mostra “Áudio solicitado” mesmo quando o navegador vai usar uma voz padrão não coreana ou falhar depois do `speak()`.
4. O conteúdo falado é pequeno e finito: **547 ocorrências de `audioText`, 265 textos únicos, 411 caracteres coreanos**. Não há jamo isolado (`U+3131–U+318E`) em `audioText`; a fala recebe blocos silábicos e palavras.
5. O relato de ㄹ/vogais é plausível, mas **não foi reproduzido com falante nativo nem em iPhone real**. As causas mais prováveis são ausência/qualidade da voz coreana, falta de seleção explícita, prosódia de itens isolados, `rate = 0.85` e percepção de fusões que são reais no coreano moderno (ㅐ/ㅔ, ㅚ/ㅙ/ㅞ). Não há evidência de texto jamo malformado.

## 1. O que existe hoje

| Camada | Situação verificada | Evidência |
|---|---|---|
| Engine | Web Speech API do navegador; nenhuma biblioteca de TTS | `src/components/hangul/exercise-media.tsx:25-33` |
| Voz | `lang = "ko-KR"`, `rate = 0.85`, pitch/volume padrão; `voice` nunca é atribuído | `src/components/hangul/exercise-media.tsx:27-31` |
| Seleção | Nenhuma chamada a `getVoices()`, `voiceschanged` ou `localService` | busca em `src/**` |
| Erro | Nenhum `onerror`, `onend` ou timeout; o status não muda se a fala falhar | `exercise-media.tsx:72-76` |
| Arquivos | Nenhum `.mp3`, `.ogg`, `.wav`, `.m4a` ou `.webm` em `public/` | `find public -type f` |
| `audioSrc` | Declarado em `src/lib/exercises/index.ts:65` e `:76`; nenhum consumidor | busca em `src/**` |
| API paga | Nenhuma chave, endpoint ou chamada de TTS externo | busca em `src/**` e `docs/**` |
| Service worker | Não existe; portanto não há cache offline de áudio | decisão da 6B em `docs/offline-pwa-decision.md` |

O player é sob demanda e nunca inicia sozinho. O botão tem alvo mínimo de 48 px, o status usa `role="status"` e o fallback textual aparece junto (`exercise-media.tsx:78-110`). Isso é uma base correta de acessibilidade; o problema é a confiabilidade da voz por trás do botão.

## 2. Caminho de reprodução

```text
botão “Ouvir …”
  → AudioControl.play()
    → speakKorean(text)
      → new SpeechSynthesisUtterance(text)
      → utterance.lang = "ko-KR"
      → utterance.rate = 0.85
      → speechSynthesis.cancel()
      → speechSynthesis.speak(utterance)
    → setSpoken(true) se a API existe
    → setUnavailable(true) apenas se a API não existe
```

Consequências:

- **Não há confirmação de que a voz coreana existe.** `speak()` é assíncrono e pode falhar depois; o app já anunciou sucesso.
- **Não há confirmação de que a fala terminou.** Não há `onend`; o status “Áudio solicitado” permanece.
- **Não há tratamento de erro.** Um `onerror` (voz indisponível, síntese interrompida, política do navegador) não altera a UI.
- **`cancel()` antes de cada fala** evita sobreposição, mas corta a fala anterior. Isso é aceitável para itens curtos, mas precisa ser considerado se o aluno tocar duas vezes.
- **`rate = 0.85`** alonga a fala. Em sílabas isoladas, isso pode soar artificial e exagerar contrastes de duração; não é a causa provável de troca de fonema, mas afeta naturalidade.

## 3. Onde o áudio é usado

| Superfície | Texto enviado | Observação |
|---|---|---|
| `AudioPrompt` / `AudioControl` em exercícios | `exercise.audioText` | `exercise-ui.tsx:340`, `:356-360` |
| Leitura | `exercise.audioText` | `exercise-ui.tsx:378-379` |
| Alternativas de `char-to-audio` | `option.audioText` | `exercise-ui.tsx:388` |
| Montador de sílaba | sílaba montada | `SyllableBuilder.tsx:236` |
| Camadas de pronúncia | `current.spoken` (transcrição didática) | `PronunciationLayers.tsx:169` |
| Anatomia de `한` | `syllable.audioText ?? syllable.text` | `SyllableAnatomy.tsx:193` |
| Mapa de 40 jamo | sem áudio por item | `HangulSounds` / `JAMO`; o mapa é textual |

O texto enviado é sempre Hangul em blocos. A verificação com expressão regular não encontrou jamo de compatibilidade isolado em nenhum `audioText`. Portanto, **não há evidência de que o app esteja mandando “ㄹ” ou “ㅓ” soltos para o TTS**; ele manda `리`, `라`, `말`, `물`, `어`, `오`, `한국어를 공부해요`, etc.

## 4. Inventário do conteúdo falado

Medição sobre `src/content`:

- 547 ocorrências de `audioText`.
- 265 textos únicos.
- 411 caracteres coreanos no total (média de 1,55 por item).
- 157 itens de 1 caractere; 87 de 2; 15 de 3; 2 de 4; 2 de 5; 1 de 8; 1 de 9.
- Exemplos longos: `한국어를 공부해요` (9), `저는 학생입니다` (8), `안녕하세요` (5), `감사합니다` (5).
- Nenhum `audioText` contém jamo isolado.

Esse tamanho é decisivo para a decisão de arquitetura: **265 clipes nativos cobrem todo o vocabulário falado atual**, sem depender de TTS em runtime. O inventário inclui itens de escuta, alternativas de `char-to-audio`, sílabas de montagem e palavras de leitura.

Além dos `audioText`, as camadas de pronúncia enviam `spoken` (`rules.ts`), que são reescritas didáticas como `한구거`, `일거요`, `안자요`, `임니다`, `한궁말`, `감사함니다`, `조타`, `추카`, `이팍`, `배콰점`, `구콰`, `전와`. Essas formas são aproximações para o TTS, não IPA; a grafia escrita não muda. Se forem gravadas, precisam entrar no inventário como itens separados, com revisão nativa.

## 5. Diagnóstico de vozes no ambiente de teste

Teste executado em Chromium e WebKit headless, na página inicial:

| Engine | `speechSynthesis` | Vozes | Voz coreana | `localService` |
|---|---|---|---|---|
| Chromium headless (Linux) | sim | 0 | nenhuma | — |
| WebKit headless (Linux) | sim | 4 (`kal`, `slt`, `rms`, `awb`) | nenhuma | `false` |

Isso **não representa** um iPhone, Android ou Windows real. Representa apenas o ambiente de CI: o teste automatizado não consegue provar que uma voz coreana será escolhida. Também não é possível ouvir a qualidade nem validar pronúncia em CI.

Em dispositivos reais, a disponibilidade varia:

- **Windows:** vozes coreanas instaladas com o pacote de idioma, como Heami, InJoon e, em versões mais novas, SunHi. A qualidade muda entre versões e entre vozes compactas/naturais.
- **iPhone/iPad:** Yuna, Sora, Jina, Jian, Suhyun e Minsu, com qualidades padrão/expandida/premium; as melhores precisam ser baixadas em Ajustes → Acessibilidade → Conteúdo Falado → Vozes. Sem download, a voz padrão pode ser compacta.
- **Android/Chrome:** depende do Google TTS e dos dados de idioma instalados; algumas vozes são locais e outras de rede. `localService` indica a diferença.
- **Edge:** pode usar vozes online da Microsoft; nesse caso o texto sai do dispositivo.

Isso explica por que o mesmo item pode soar diferente entre celular, notebook e navegador. **A inconsistência entre dispositivos é um fato arquitetural, não um bug isolado de uma lição.**

## 6. Achados e severidade

| ID | Achado | Severidade | Evidência | Consequência |
|---|---|---|---|---|
| A1 | Não há verificação de voz coreana; a UI declara sucesso só pela existência da API | **Alta** | `exercise-media.tsx:25-33`, `:72-76` | Aluno pode ouvir voz não coreana, voz errada ou nada, com mensagem de sucesso |
| A2 | `onerror`/`onend` ausentes | Média | `exercise-media.tsx:25-33` | Falha silenciosa; status nunca corrige |
| A3 | Nenhuma escolha explícita de voz, `localService` ou `voiceschanged` | Média/Alta | `exercise-media.tsx:27-31` | Qualidade imprevisível; impossível preferir voz local/coreana |
| A4 | `rate = 0.85` fixo | Baixa/Média | `exercise-media.tsx:29` | Prosódia artificial em sílabas curtas; não explica troca de fonema |
| A5 | `audioText` não tem jamo isolado | Informativo | inventário acima | O texto enviado não é a causa do relato |
| A6 | ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅟ, ㅢ têm fusões reais no coreano moderno | Informativo | `docs/architecture.md:98` | Ouvir ㅐ e ㅔ iguais pode ser correto, não defeito |
| A7 | ㄹ tem realizações posicionais ([ɾ] inicial, [l] final) | Informativo | `jamo.ts:122-130`, `h19.ts:17-25` | Ouvir ㄹ diferente em `라` e `말` é esperado; a UI precisa explicar |
| A8 | `audioSrc` não é consumido; não há assets | Média | `src/lib/exercises/index.ts:65,76`; `public/` | Não há caminho para áudio revisado |
| A9 | Nenhum item tem aprovação de áudio por falante nativo | **Alta** | conteúdo `in-review` | Pronúncia didática e voz sintética não são referência certificada |
| A10 | Voz remota pode enviar texto ao fornecedor | Baixa | `localService` não checado | Privacidade/transparência; conteúdo é não sensível, mas deve ser documentado |

## 7. Causas prováveis do relato de ㄹ e vogais

Ordenadas por probabilidade, com o que sustenta e o que **não** sustenta cada uma:

1. **Ausência de voz coreana ou queda para voz padrão.** O app não verifica nem escolhe voz; se o sistema não tem coreano instalado, o navegador pode usar a voz padrão, ler Hangul com fonética estrangeira ou falhar. É a hipótese que melhor explica “soa confuso” de forma ampla e variável entre dispositivos.
2. **Qualidade e versão da voz do sistema.** Vozes compactas de Windows/Android/iOS soam robóticas e podem realizar ㄹ e vogais de forma instável. As vozes melhores (Apple expandida/premium, Windows natural, Google neural) nem sempre estão instaladas.
3. **Fusões reais do coreano moderno.** ㅐ/ㅔ são ensinadas como grafias distintas, mas a fala moderna de Seul frequentemente as funde; ㅚ/ㅙ/ㅞ convergem para [we]; ㅢ varia. O aluno pode interpretar isso como erro, quando é o padrão descrito no próprio conteúdo (`architecture.md:98`).
4. **ㄹ posicional.** O jamo tem [ɾ] no início e [l] no final; `라` e `말` devem soar diferentes. Se o aluno espera um único som, a diferença parece inconsistência. O conteúdo já explica isso (`jamo.ts:129`, `h19.ts:17-25`), mas a UI de áudio não reforça o contexto.
5. **Prosódia de itens isolados.** TTS de sílaba única (`아`, `어`, `리`) não tem frase para dar ritmo; a voz pode alongar, cortar ou inserir pausas. Isso afeta naturalidade, não necessariamente o fonema.
6. **`rate = 0.85`.** A desaceleração global pode exagerar durações e soar artificial; é um fator secundário, não a explicação principal.
7. **Transcrição didática versus áudio.** Em `PronunciationLayers`, o texto ouvido é `current.spoken` (`한구거`, `조타`), não a grafia escrita. Se o aluno comparar literalmente com `한국어`/`좋다`, pode achar que o áudio “está errado”, quando é a forma falada aproximada.
8. **Erro de conteúdo.** Não há evidência. As transcrições estão `in-review` e precisam de falante nativo, mas o relato não aponta um item específico; sem reprodução, não se deve “corrigir” fonética por suposição.

## 8. O que não foi possível verificar

- iPhone, Chrome iOS, Android e Windows reais.
- Vozes expandidas/premium da Apple e vozes naturais da Microsoft.
- Se o navegador do aluno escolheu uma voz coreana, uma voz padrão ou nenhuma.
- Qualidade percebida por falante nativo e por aprendiz brasileiro.
- Latência, falhas de rede e comportamento de vozes remotas.
- Se o relato se concentra em um item, uma lição ou um dispositivo.

Esses pontos exigem o checklist manual de `docs/iphone-manual-checklist.md` e uma sessão de escuta com falante nativo.

## 9. Correções recomendadas (para a 8B, não implementadas aqui)

1. **Selecionar voz explicitamente.** Escolher uma voz `ko-KR` local quando existir; preferir `localService`; só cair para voz remota ou padrão com aviso. Esperar `voiceschanged` antes de conclusão.
2. **Não declarar sucesso antes da hora.** Usar `onstart`, `onend` e `onerror`; se não houver voz coreana, mostrar “Este dispositivo não tem voz coreana instalada” e manter a dica textual. Não prometer áudio que não existe.
3. **Separar “áudio revisado” de “voz do sistema”.** A UI deve dizer quando o som é sintetizado e não é referência oficial.
4. **Trocar o caminho principal por assets nativos** para os 265 itens, mantendo TTS como fallback. Isso elimina a variabilidade entre dispositivos e permite revisão.
5. **Revisar `rate`.** 0.85 pode continuar como opção, mas o padrão deve ser 1.0 para itens de pronúncia; oferecer “mais devagar” sob demanda.
6. **Instrumentar sem telemetria invasiva.** Em desenvolvimento, um painel de diagnóstico pode mostrar voz escolhida, `localService` e evento; em produção, não coletar dados sem necessidade.
7. **Registrar a decisão de privacidade.** Se uma voz remota for usada, o texto coreano sai do dispositivo; documentar e evitar depender dela.

## 10. Critérios de aceite desta auditoria

- [x] Caminho de código rastreado até a chamada de `speechSynthesis`.
- [x] Inventário de `audioText` medido e verificado.
- [x] Confirmado que não há arquivo, API externa ou `audioSrc` em uso.
- [x] Confirmado que não há jamo isolado em `audioText`.
- [x] Diagnóstico de vozes em CI registrado com limites explícitos.
- [x] Causas separadas em fatos, hipóteses e pontos não verificáveis.
- [x] Nenhuma mudança de engine, conteúdo, `Progress` v1, CAS, auth ou PWA nesta fase.

## Referências internas

- `src/components/hangul/exercise-media.tsx` — `speakKorean`, `AudioControl`, `BilingualText`.
- `src/components/hangul/exercise-ui.tsx` — `AudioPrompt`, leitura, alternativas.
- `src/components/hangul/SyllableBuilder.tsx`, `PronunciationLayers.tsx`, `SyllableAnatomy.tsx` — gatilhos de áudio.
- `src/lib/exercises/index.ts` — `audioSrc` declarado e não consumido.
- `src/content/hangul/**` — 547 `audioText`, 265 únicos.
- `src/content/hangul/jamo.ts`, `lessons/h19.ts`, `rules.ts` — ㄹ, vogais e transcrições didáticas.
- `docs/architecture.md:97` — resumo atual do áudio.
- `docs/feedback/feedback-igo.md` — relato original.
