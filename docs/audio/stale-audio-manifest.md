# Manifesto de áudio obsoleto — Fase 12A (fechado na Fase 14)

**Data:** 2026-11-13  
**Baseline auditado:** `3103ce3`  
**Status atual:** **resolvido na Fase 14.** Os 12 textos corrigidos ganharam MP3 próprio e os 10 MP3 órfãos foram removidos pelo `encode-audio.py`. O inventário e o manifesto agora coincidem em **7.789 itens**, sem lacunas nem sobras.

## 1. Textos corrigidos que agora têm MP3 (12)

| Texto novo | Origem | Motivo |
|---|---|---|
| `감기가 심해요.` | `sent:a1-l33:감기` | alvo `감기` estava dentro de `감기약`; frase reescrita |
| `극장 앞에서 만나요.` | `g:a1-l25-appointment` | `에` → `에서` no ponto de encontro |
| `무거운 것은 들지 말고 저를 도와주세요.` | `g:a1-l19` exemplo | removeu `-라고 하다` não ensinado |
| `분실 신고를 했어요.` | `sent:a2-l28:분실` | alvo `분실` estava dentro de `분실물`; frase reescrita |
| `수진 씨, 서울로 이사했어요?` | `a2-l15` diálogo | removeu `-다면서요` não ensinado |
| `여행 이야기를 하면서 많이 배웠어요.` | `a2-l40` gramática | exemplo do novo bloco de `-면서` |
| `요금이 많이 올랐어요. 따라서 다른 방법을 찾아야 해요.` | `sent:a2-l32:따라서` | `따라서` agora é o conectivo “portanto” |
| `음악을 들으면서 공부해요.` | `a2-l40` gramática | exemplo do novo bloco de `-면서` |
| `좋아요. 지금 정하지 않아도 괜찮아요. 경험을 하면 찾게 될 거예요.` | `a2-l39` diálogo | removeu `-면서` antes do ensino |
| `죄송해요. 회의가 길어져서 연락을 못 했어요.` | `a2-l04` diálogo | removeu `-았/어야 했어요` cobrado antes do ensino |
| `해외에 가고 싶어요.` | `sent:a2-l02:해외` | alvo `해외` estava dentro de `해외여행`; frase reescrita |
| `회의가 길어졌지만 연락을 못 했어요.` | `a2-l04` gramática | removeu `-았/어야 했어요` do exemplo de `-지만` |

## 2. MP3 antigos removidos do corpus (10)

| Texto antigo | Substituído por |
|---|---|
| `감기약 있어요?` | `감기가 심해요.` |
| `규칙을 따라서 행동하세요.` | `요금이 많이 올랐어요. 따라서 다른 방법을 찾아야 해요.` |
| `극장 앞에 만나요.` | `극장 앞에서 만나요.` |
| `무거운 것은 들지 말고 도와달라고 하세요.` | `무거운 것은 들지 말고 저를 도와주세요.` |
| `분실물 센터에 문의했어요.` | `분실 신고를 했어요.` |
| `수진 씨, 서울로 이사했다면서요?` | `수진 씨, 서울로 이사했어요?` |
| `좋아요. 지금 정하지 않아도 괜찮아요. 경험하면서 찾게 될 거예요.` | `좋아요. … 경험을 하면 찾게 될 거예요.` |
| `죄송해요. 회의가 길어졌지만 연락을 했어야 했어요.` | `죄송해요. 회의가 길어져서 연락을 못 했어요.` |
| `해외여행을 좋아해요.` | `해외에 가고 싶어요.` |
| `회의가 길어졌지만 연락했어야 했어요.` | `회의가 길어졌지만 연락을 못 했어요.` |

## 3. Efeito verificável

- Inventário atual: **7.789 textos** (Hangul + A1 + A2 + B1 + vocabulário); manifesto: **7.789 MP3**.
- `tests/audio-manifest.test.ts` exige cobertura integral; qualquer nova lacuna falha.
- `tests/fixtures/stale-audio.json` mantém `missing`/`obsolete` vazios como contrato.
- O player usa os MP3 por padrão; `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é o kill switch.
- A licença do encoder `kykim/bert-kor-base` continua não esclarecida; a decisão de risco está em `docs/audio/license-audit.md` §13.
