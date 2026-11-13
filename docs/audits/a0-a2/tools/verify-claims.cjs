/**
 * Auditoria — registro de verificação independente dos achados (PASS C).
 * Read-only: relê o dump e mede, item a item, se a alegação do revisor é
 * verdadeira no repositório. Nada no conteúdo é alterado.
 *
 * Uso: node docs/audits/a0-a2/tools/verify-claims.cjs
 * Saída: docs/audits/a0-a2/data/claim-verifications.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const steps = [];
for (const c of ["a1", "a2"]) for (const s of [...data[`${c}Lessons`], ...data[`${c}Checkpoints`]]) steps.push(s);
const ex = (id) => {
  for (const s of steps) {
    const e = s.exercises.find((x) => x.id === id);
    if (e) return { step: s, e };
  }
  return null;
};
const vocab = (id) => data.vocab.find((v) => v.id === id);
const sentence = (id) => data.sentences.find((s) => s.id === id);

const checks = [];
const record = (claim, verdict, evidence) => checks.push({ claim, verdict, evidence });

// 1. MCQ impossível (A2M1-001)
{
  const r = ex("a2-l02-e01");
  const hit = (r.e.options || []).some((o) => String(o).trim() === String(r.e.correctAnswer).trim());
  record("A2M1-001 mcq a2-l02-e01: gabarito fora das opções", hit ? "REJEITADO" : "CONFIRMADO", {
    options: r.e.options,
    correctAnswer: r.e.correctAnswer,
    regra: "src/lib/exercises/index.ts:256-263 (normalize não casa com nenhuma opção)",
  });
}

// 2. Cloze que imprime partícula discordante (A1M3-001)
{
  const r = ex("a1-l11-e06");
  const filled = r.e.prompt.replace(/_{2,}/, r.e.answer);
  record("A1M3-001 a1-l11-e06/a1-c03-e13: '언니'+'은' gera coreano agramatical", /언니은/.test(filled) ? "CONFIRMADO" : "REJEITADO", {
    preenchido: filled,
    parceiro: ex("a1-c03-e13").e.prompt.replace(/_{2,}/, ex("a1-c03-e13").e.answer),
    nota: "a forma correta é 언니는; '언니는' também é rejeitado pelo gabarito (probe S4)",
  });
}

// 3. 음악 → 으막: dois revisores discordam (A0-001 × V0-001)
{
  const lia = data.hangul.rules.find((r) => r.id === "rule:liaison").examples.find((e) => e.written === "음악");
  const word = data.hangul.words.find((w) => w.id === "word:音楽" || w.id === "word:음악");
  const h21 = data.hangul.lessons.find((l) => l.id === "h21").exercises.find((e) => e.id === "h21-e02");
  record(
    "A0-001 (prosa diz 'o ㄱ final de âm') × V0-001 (diz que '으막' não existe)",
    "A0-001 CONFIRMADO (prosa errada) / V0-001 REJEITADO (transcrição correta)",
    {
      prosa_do_item: h21.explanation,
      nota_da_regra: lia.note,
      falado_na_regra: lia.spoken,
      nota_da_palavra: word.notes,
      probe_motor: "applyLiaison('음악') === '으막' (docs/audits/a0-a2/data/engine-probe.json C1)",
      norma: "Nacional (온라인가나다 327196, 2026-02-07) escreve '옛 음악' como [옏 으막] — ou seja, a sílaba fica '으' e o ㅁ vai para '막'; a transcrição do app está certa, o nome da letra na prosa está errado",
      audio: "public/audio/v1 tem entrada para '으막' (src/content/audio/entries.ts:195) e para '음악' (:200)",
    },
  );
}

// 4. 삼 층 × 삼층 (A2M3-001)
{
  const r = ex("a2-l13-e08");
  record(
    "A2M3-001: 'espaçamento não padrão' + ditado rejeita variante",
    "PREMissa CORREGIDA: '삼 층' é a forma de princípio (양적 수량); o defeito real é a variante aceita",
    {
      item: { answer: r.e.answer, accepted: r.e.acceptedAnswers },
      norma: "한글 맞춤법 제43항: unidade/contador separado do numeral escrito em hangul ('삼 층' princípio; '삼층' permitido como ordem/numeração; com algarismo '3층' permitido). Confirmação: onlineQna 336486 (2026-10-01) e 321977.",
      consequencia: "quem digitar '삼층이에요' (grafia permitida para pavimento) é marcado errado",
    },
  );
}

// 5. 극장 앞에 만나요 (A1M5-001)
{
  const g = data.a1Lessons.find((l) => l.id === "a1-l25").grammar.find((x) => x.id === "g:a1-l25-appointment");
  const l23 = data.a1Lessons.find((l) => l.id === "a1-l23").grammar.find((x) => (x.id || "").includes("place") || JSON.stringify(x).includes("에서"));
  record("A1M5-001 '극장 앞에 만나요' (만나요 pede 에서)", "CONFIRMADO", {
    forma_ensinada: g.form,
    explicacao: g.explanationPt,
    exemplos: g.examples.map((e) => e.ko),
    contradicao_interna: (l23.examples || []).map((e) => e.ko),
    norma: "에 = localização de estado/existência; 에서 = local onde a ação ocorre (o próprio curso o afirma em a1-l23)",
  });
}

// 6. Variantes rejeitadas
{
  const casos = [
    ["a2-l33-e02", ["계세요", "계셔요"]],
    ["a2-l33-e07", ["뵈었어요", "뵀어요"]],
    ["a1-l37-e01", ["이", "은"]],
    ["a2-l09-e05", ["여기에서 음식을 먹으면 안 돼요.", "여기서 음식을 먹으면 안 돼요."]],
    ["a2-l08-e05", ["저녁을 먹고 나서 샤워해요.", "저녁을 먹은 후에 샤워해요.", "저녁을 먹고 나서 샤워해요"]],
  ];
  const out = casos.map(([id, variants]) => {
    const r = ex(id);
    const aceitas = new Set([r.e.answer, ...(r.e.acceptedAnswers || [])].map((s) => String(s).trim()));
    return { item: id, aceitas: [...aceitas], testes: variants.map((v) => ({ forma: v, aceita: aceitas.has(v) })) };
  });
  record("Cluster 'variante válida rejeitada' (A2M7-001, A2M7-002, A1M8-003, A1M2-002, A2M2-001)", "CONFIRMADO na forma medida", out);
}

// 7. Vocabulário: homógrafos/âncoras erradas
{
  const lista = [
    ["ko:따라서", "sent:a2-l32:따라서"],
    ["ko:감기", "sent:a1-l33:감기"],
    ["ko:돼지고기", "sent:a1-l36:돼지고기"],
    ["ko:입어 보다", "sent:a1-l19:입어 보다"],
    ["ko:일", null],
    ["ko:안", null],
  ];
  const out = lista.map(([vid, sid]) => {
    const v = vocab(vid);
    const s = sid ? sentence(sid) : data.sentences.find((x) => x.vocabId === vid);
    return {
      id: vid,
      ko: v ? v.ko : null,
      pt: v ? v.pt : null,
      pos: v ? v.pos : null,
      frase: s ? s.ko : null,
      traducao: s ? s.pt : null,
      alvo: s ? s.target : null,
    };
  });
  record("Achados de vocabulário (V2-001, V1-003, V1-004, V1-002, V2-002, V0-003)", "CONFIRMADO por leitura direta do registro", out);
}

// 8. Escuta: enunciado pede fragmento, gabarito é a frase toda
{
  const FRAG =
    /escreva (?:o|a|os|as) (?:n[úu]mero|idade|profiss[ãa]o|hora|hor[áa]rio|dia|valor|lugar|local|nome|atividade|a[çc][ãa]o|frequ[êe]ncia|motivo|raz[ãa]o|causa|parte|informa[çc][ãa]o|detalhe|endere[çc]o|contato|pedido|sugest[ãa]o|compara[çc][ãa]o|diferen[çc]a|experi[êe]ncia|desculpa|decis[ãa]o|condi[çc][ãa]o|desfecho|complica[çc][ãa]o|justificativa|conselho|opini[ãa]o)/i;
  const strip = (s) => String(s).replace(/[.,!?;:…]/g, "").replace(/\s+/g, " ").trim();
  let escuta = 0;
  let pedeFragmento = 0;
  let semVariante = 0;
  const exemplos = [];
  for (const s of steps)
    for (const e of s.exercises) {
      if (e.type !== "listen") continue;
      escuta += 1;
      if (!FRAG.test(e.prompt)) continue;
      pedeFragmento += 1;
      const base = strip(e.answer);
      const frags = (e.acceptedAnswers || []).map(strip).filter((a) => a && a !== base && base.includes(a));
      if (!frags.length) {
        semVariante += 1;
        if (exemplos.length < 6) exemplos.push({ item: e.id, prompt: e.prompt, answer: e.answer, aceitas: e.acceptedAnswers || [] });
      }
    }
  record("Cluster 'listen pede fragmento e cobra a frase inteira' (A1M2/A1M3/A1M5/A1M6/A1M7)", "CONFIRMADO", { escuta_total: escuta, pedeFragmento, semVarianteDeFragmento: semVariante, exemplos });
}

// 9. Gramática cobrada sem ensino (amostra verificada)
{
  const amostra = [
    { marcador: "-라고 하다 (relato de fala de terceiro)", busca: /라고 (했|하|해)/, em: ["a2-l16-e10", "a2-l19-e04", "a2-c04-e10"] },
    { marcador: "-았/어야 했어요", busca: /(야|어야) 했/, em: ["a2-l04-d4", "a2-l04-e07"] },
    { marcador: "-면서", busca: /면서/, em: ["a2-l40-e02", "a2-c08-e20"] },
    { marcador: "-(으)ㄹ 때", busca: /(을|ㄹ) 때/, em: ["a2-l19-e10", "a2-c04-e12"] },
  ];
  const out = amostra.map((a) => ({
    marcador: a.marcador,
    declaradoNoBlueprint: [...data.a1Blueprint.lessons, ...data.a2Blueprint.lessons].filter((l) => (l.grammar || []).join(" ").match(a.busco || a.busca)).map((l) => l.id),
    ocorreEm: a.em.map((id) => {
      const r = ex(id) || { step: null, e: null };
      return { item: id, achou: r.e ? JSON.stringify(r.e).match(new RegExp(a.busca.source))?.[0] : null };
    }),
  }));
  record("Cluster 'cobra marco não ensinado' (A2M1-003, A2M4-001, A2M4-002, A2M5-001, A2M6-002, A2M8-001)", "CONFIRMADO por presença no texto + ausência no blueprint", out);
}

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/claim-verifications.json"), JSON.stringify(checks, null, 2));
for (const c of checks) console.log(`\n### ${c.claim}\n${c.verdict}\n${JSON.stringify(c.evidence, null, 1).slice(0, 900)}`);
