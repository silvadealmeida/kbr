# Relatório de qualidade e integridade do áudio — Fase 8D

**Data:** 2026-11-12  
**Natureza:** auditoria técnica de 287 MP3 **sintéticos** (MeloTTS-Korean). Nada aqui certifica pronúncia: nenhuma escuta por falante nativo ocorreu, e transcrição/G2P automáticos não substituem essa escuta. Questão de licença: `license-audit.md`.

## 1. Integridade técnica (reverificada)

| Verificação | Resultado | Como |
|---|---|---|
| Cobertura do inventário | **287/287** textos do currículo têm asset | `tests/audio-manifest.test.ts` (inventário recalculado a partir do currículo) |
| Arquivos × manifesto | **287 arquivos, 0 órfãos, 0 faltando** | listagem do diretório × manifesto |
| SHA-256 e bytes | **287/287 conferem**; total 1.384.146 B | teste Vitest **e** conferência independente em Python (`hashlib`) |
| Hashes duplicados | **0** (nenhum par de textos distintos compartilha o mesmo MP3) | `tests/content/curriculum-audit.test.ts` (novo) |
| Arquivos corrompidos | **0**: todos começam com cabeçalho ID3 ou frame MP3 e têm ≥ 500 B | mesmo teste |
| Chaves/caminhos únicos, texto NFC só-Hangul | ok | `audio-manifest.test.ts` |
| Duração / loudness | 0,298–1,606 s; RMS −18,5 a −18,0 dBFS; pico ≤ −1 dBFS; 0 avisos de QC | manifesto + testes |
| Modelo e revisões registrados | MeloTTS-Korean `0207e5ad…`, encoder `kykim` `1779cc09…` | manifesto; `main` de ambos confere com o HF (ver `license-audit.md`) |

**Limites:** integridade ≠ correção linguística. Os testes provam que o arquivo é o que o manifesto diz, não que o som é o texto.

## 2. Reprodução, fallback e acessibilidade (revisão de código + testes)

Revisado `src/lib/audio/playback.ts` e `AudioControl` (`exercise-media.tsx`):

- Ordem **asset → voz coreana do sistema → dica textual**; asset ausente, erro, `play()` rejeitado ou sem início em 4 s cai para a voz do sistema; sem voz coreana o estado é "indisponível", **sem sucesso falso** (o status só vira "Reproduzindo" após `play()` resolver ou `onstart`).
- Seleção **explícita** de voz coreana (`/^ko([-_]|$)/i`, prefere `ko-KR` local); `utterance.lang`/`voice` vêm da voz escolhida; nunca usa voz padrão do sistema.
- Cancelamento por *token*, `destroy()` remove listeners/timers; novo play cancela o anterior.
- Acessibilidade: botão com nome e `aria-pressed` (0,75×), `aria-busy` ao carregar, `role="status"` não rouba foco.
- Cobertura automatizada: 453 Vitest (inclui playback com asset, `audioSrc`, 0,75×, timeout, ausência de voz, erro, cancelamento) e `e2e/audio.spec.ts` com MP3 real. **Reprodução em iPhone/Android/Windows reais não foi testada** (ver `docs/iphone-manual-checklist.md` §8, §13–14).

### Defeito verificado e corrigido nesta fase

`AudioControl` e `SyllableAnatomy` descreviam o MP3 como **"áudio gravado"**. O áudio é **síntese neural**, não gravação; o texto contradizia `audio-quality-roadmap.md` ("a voz sintetizada é rotulada como sintetizada") e podia levar o aluno a tomar o som como referência humana. Textos agora dizem "áudio sintetizado (referência provisória)" / "áudio do KBR". Teste atualizado; nenhuma lógica alterada.

## 3. Itens de alta prioridade para inspeção linguística

Selecionados por tag do manifesto (sem julgar o som). **Todos exigem escuta por falante nativo.**

| Tema | Qtde | Itens (texto falado) |
|---|---|---|
| ㄹ inicial | 20 | 꼬리 나라 다리 도로 따로 라 람 랑 로 를 리 머리 뿌리 사람 사랑 요리 유리 한국어를 공부해요 허리 |
| ㄹ final | 21 | 국물 궁물 글 길 달 를 말 물 바블 밥을 서울 오슬 옷을 울 을 일거요 한국말 한국어를 … 한궁말 한글 |
| Pares mínimos / contrastes | 29 | 거 고 국 그 까 나 따 라 머 물 바 밥 빠 사 새 싸 아 야 어 오 우 웨 의 자 지 짜 코 타 하 |
| Vogais compostas / distinções | 22 | 개 게 고 과 귀 내 네 새 야 여 예 왜 외 요 워 웨 유 의 의사 의자 회 희 |
| Variação de ㅢ/ㅟ/ㅚ | 7 | 나의 의 의미 의사 의자 주의 희 |
| Ligação | 19 | 강아지 꼬치 꽃이 바블 밥을 안자요 앉아요 오슬 옷을 으막 음악 일거요 읽어요 입이 조아요 좋아요 한구거 한국어 … |
| Nasalização | 17 | 감사합니다 국물 궁물 먹는다 멍는다 반는다 받는다 심만 십만 임니다 입니다 잠는 잡는 학년 한국말 한궁말 항년 |
| Aspiração | 12 | 구콰 국화 배콰점 백화점 이팍 입학 전화 조타 좋다 추카 축하 축하해요 |
| Batchim duplo | 17 | 값 곬 넓다 닭 많다 몫 밟다 삶 싫다 앉다 앉아요 없다 읊다 읽어요 젊다 핥다 훑다 |
| Sílabas isoladas | **158 de 287** | 1 sílaba (a prosódia de itens tão curtos é um risco conhecido de TTS) |
| Clipes < 0,35 s | 13 | 앞 없 옷 입 악 밥 꽃 읽 합 따 값 밟 아 — conferir se o batchim e o ataque não foram cortados pelo recorte de silêncio (−45 dBFS, 40 ms/80 ms) |

Destaques para a escuta: (a) contraste ㅐ/ㅔ, ㅚ/ㅙ/ㅞ (fusões reais do coreano moderno: um par "mínimo" pode soar igual para falantes nativos); (b) ㄹ inicial (tepe) × final (lateral) em itens de uma sílaba; (c) tensas × aspiradas × lenes (까/카/가, 따/타/다, 빠/파/바, 짜/차/자) em sílabas isoladas, onde só o VOT/tom as distingue; (d) batchim em clipes curtos e a distinção entre batchim solto e ligação; (e) `를`/`을` sem contexto.

## 4. Evidência mecânica sobre as formas faladas (`spoken`)

As regras de h21–h23 declaram 23 pares escrita→falada (`한국어→한구거`, `읽어요→일거요`, `좋다→조타`…). Dois cruzamentos automáticos:

1. `tests/content/curriculum-audit.test.ts`: os pares coincidem com `applyLiaison/applyNasalization/applyAspiration` (código do próprio KBR).
2. `scripts/audio/check-spoken-forms.py`: `g2pkk` (o mesmo G2P do pipeline MeloTTS) produz **exatamente** a forma `spoken` para os 23 pares, e é **idempotente** sobre a forma falada (aplicar o G2P ao texto já transcrito não o altera). Resultado: **23 pares, 0 divergências**.

Isso mostra consistência interna e que o TTS não "re-transforma" o texto de entrada. **Não** prova que as transcrições sejam a forma preferida de um falante nativo — o g2pkk é uma implementação de regras, não um falante.

## 5. Limites e riscos remanescentes

- Áudio sintético segue **`in-review`** em todos os 287 itens; nenhuma aprovação humana.
- Sílabas isoladas e contrastes sutis são o maior risco de pronúncia ruim; o feedback original (item 2 de `feedback-igo.md`) continua aberto.
- Segmentação de um único speaker (`KR`), sem variação de gênero.
- Não houve escuta humana nem ASR de verificação; qualquer ASR automático seria evidência fraca e não foi usada como certificação.
