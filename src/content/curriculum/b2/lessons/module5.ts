import { cloze, defineB2Lesson, listen, mcq, reading, translate } from "./shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e cumpre o gênero pedido." },
  { criterion: "organization" as const, labelPt: "Organização e coesão", descriptorPt: "As ideias têm ordem reconhecível e os parágrafos se conectam." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário", descriptorPt: "Usa palavras adequadas ao tema, inclusive parte do léxico da lição." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas são inteligíveis e o registro combina com o destinatário." },
  { criterion: "argument" as const, labelPt: "Clareza da posição", descriptorPt: "A posição ou avaliação fica explícita e sustentada pelo texto." },
];

function production(
  titlePt: string,
  promptPt: string,
  promptKo: string,
  guidance: readonly string[],
  checklist: readonly string[],
  sampleKo: string,
  samplePt: string,
  notePt: string,
  minWords = 80,
): CourseProductionTask {
  return { titlePt, promptPt, promptKo, guidance, checklist, minWords, rubric: RUBRIC, sample: { ko: sampleKo, pt: samplePt, notePt } };
}

/** b2-l21 — resumo de notícia com fonte. */
export const B2_L21 = defineB2Lesson({
  id: "b2-l21", number: 21, moduleId: "b2-m05", title: "Resumindo a notícia",
  objective: "Resumir uma notícia com fonte, fato principal e contexto.",
  prerequisites: ["b2-c04"], estimatedMinutes: 75, dialogueTitle: "O resumo da rádio",
  intro: [
    { title: "Reporta-se que", body: "-다고 보도하다 relata o conteúdo de uma notícia atribuindo-o a um veículo: “reportou-se que...”. O verbo 보도하다 deixa claro que a informação não é do falante. Compare com -다고 하다 (fala geral) e -ㄴ/는 것으로 전해지다 (informação divulgada, mais impessoal).", ko: "시청이 버스 노선을 늘린다고 보도했어요." },
    { title: "Foi divulgado que", body: "-ㄴ/는 것으로 전해지다 apresenta uma informação divulgada de forma impessoal: “foi divulgado que...”. É comum em notícias quando a fonte não é diretamente confirmada. Compare com -다고 보도하다 (veículo explícito) e -다고 하다 (fonte humana).", ko: "공사가 다음 달 시작되는 것으로 전해졌어요." },
  ],
  dialogue: [
    ["아나", "아침 뉴스 요약을 들어 봤어요?", "Você ouviu o resumo das notícias da manhã?"],
    ["민수", "네. 시청이 다음 달부터 심야 버스 노선을 두 개 늘린다고 보도했어요.", "Sim. Reportaram que a prefeitura vai aumentar duas linhas de ônibus noturno a partir do próximo mês."],
    ["아나", "보도자료에는 뭐라고 나왔어요?", "O que dizia o comunicado oficial?"],
    ["민수", "운행 시간은 자정부터 새벽 두 시까지라고 했어요. 그런데 헤드라인은 “전면 확대”라고 써서 범위가 커 보였어요.", "Dizia que o horário vai da meia-noite às duas da manhã. Mas a manchete escreveu “expansão total”, o que fez o alcance parecer maior."],
    ["아나", "사실관계를 다시 확인해야겠네요.", "Então é preciso verificar os fatos de novo."],
    ["민수", "맞아요. 기자가 현장을 취재했지만, 편집 과정에서 범위가 흐려졌어요. 출처를 함께 밝혀야 해요.", "Exato. O repórter foi a campo, mas o alcance ficou nebuloso no processo de edição. É preciso informar a fonte junto."],
    ["아나", "특종을 노리다가 과장한 경우죠?", "É o caso de exagerar tentando um furo de reportagem?"],
    ["민수", "그럴 수 있어요. 좋은 요약은 짧아도 출처와 범위가 분명해야 해요.", "Pode ser. Um bom resumo, mesmo curto, precisa deixar clara a fonte e o alcance."],
  ],
  readingText: {
    titlePt: "Resumir sem aumentar o alcance",
    paragraphs: [
      "어제 시청은 다음 달부터 심야 버스 노선을 두 개 늘리겠다고 발표했다. 보도자료에 따르면 운행 시간은 자정부터 새벽 두 시까지다. 지역 신문은 이 소식을 첫 면에 실었다.",
      "기자는 현장을 취재해 이용자 인터뷰를 보도했다. 그러나 헤드라인은 “심야 버스 전면 확대”라고 써서, 실제로는 두 노선만 늘어난다는 사실을 흐렸다. 편집 과정에서 사실관계와 현장 자료를 다시 확인해야 한다는 지적이 나왔다.",
      "좋은 요약은 출처와 범위를 함께 밝힌다. “시청이 두 노선을 시범 운영한다”는 문장은 짧지만 정확하다. 특종을 노리더라도 사실을 넘어서는 표현은 피해야 한다. 독자는 제목만 보고 내용을 판단하지 않도록 주의해야 한다.",
    ],
    pt: "Ontem, a prefeitura anunciou que vai aumentar duas linhas de ônibus noturno a partir do próximo mês. Segundo o comunicado oficial, o horário de operação será da meia-noite às duas da manhã. O jornal local publicou a notícia na primeira página. O repórter foi a campo e reportou entrevistas com usuários. No entanto, a manchete dizia “expansão total do ônibus noturno”, ofuscando o fato de que apenas duas linhas seriam ampliadas. Surgiram críticas de que os fatos deveriam ser verificados de novo no processo de edição. Um bom resumo informa a fonte e o alcance. A frase “a prefeitura vai operar duas linhas em caráter piloto” é curta, mas exata. Mesmo buscando um furo, é preciso evitar expressões que ultrapassem os fatos.",
    objective: "Identificar fonte, fato principal e alcance real da notícia.",
  },
  reusedIds: ["ko:보도", "ko:사실", "ko:자료"],
  grammar: [
    ["-다고 보도하다 — reportar que", "동사/형용사 + -다고 보도하다", "Relata o conteúdo de uma notícia atribuindo-o a um veículo: “reportou-se que...”. O verbo 보도하다 deixa claro que a informação não é do falante. Compare com -다고 하다 (fala geral) e -ㄴ/는 것으로 전해지다 (divulgação impessoal). Registro: jornalístico/formal.", [["시청이 버스 노선을 늘린다고 보도했어요.", "Reportaram que a prefeitura vai aumentar as linhas de ônibus."], ["현지 언론은 피해가 크다고 보도했습니다.", "A imprensa local reportou que o dano foi grande."]]],
    ["-ㄴ/는 것으로 전해지다 — foi divulgado que", "동사 + -는 것으로 전해지다 / 형용사 + -ㄴ/은 것으로 전해지다", "Apresenta uma informação divulgada de forma impessoal: “foi divulgado que...”. É comum quando a fonte não é diretamente confirmada. Compare com -다고 보도하다 (veículo explícito) e -다고 하다 (fonte humana). Registro: jornalístico/formal.", [["공사가 다음 달 시작되는 것으로 전해졌어요.", "Foi divulgado que a obra começa no próximo mês."], ["협상이 난항을 겪는 것으로 전해집니다.", "Foi divulgado que a negociação enfrenta dificuldades."]]],
  ],
  guided: [
    mcq("O que a prefeitura anunciou?", ["Duas linhas de ônibus noturno em caráter piloto.", "A expansão total do transporte.", "O fim dos ônibus noturnos."], "Duas linhas de ônibus noturno em caráter piloto.", "두 노선을 시범 운영한다고 발표했어요."),
    cloze("Complete o relato jornalístico: 시청이 노선을 늘린___ 보도했어요.", "다고", "늘린다고 보도했어요 = reportaram que vão aumentar."),
    listen("Ouça e escreva a informação divulgada.", "공사가 다음 달 시작되는 것으로 전해졌어요.", "공사가 다음 달 시작되는 것으로 전해졌어요.", "Foi divulgado que a obra começa no próximo mês."),
    reading("어제 시청은 다음 달부터 심야 버스 노선을 두 개 늘리겠다고 발표했다. 보도자료에 따르면 운행 시간은 자정부터 새벽 두 시까지다. 지역 신문은 이 소식을 첫 면에 실었다.", "O que diz o comunicado sobre o horário?", ["Da meia-noite às duas da manhã.", "Das seis da manhã ao meio-dia.", "Durante todo o dia."], "Da meia-noite às duas da manhã.", "자정부터 새벽 두 시까지."),
    translate("pt-ko", "Traduza: “Reportaram que a prefeitura vai aumentar as linhas de ônibus.”", "시청이 버스 노선을 늘린다고 보도했어요.", "-다고 보도하다 atribui a notícia ao veículo.", ["시청이 버스 노선을 늘린다고 보도했습니다."]),
  ],
  independent: [
    mcq("Qual frase apresenta informação divulgada de forma impessoal?", ["공사가 다음 달 시작되는 것으로 전해졌어요.", "공사가 다음 달 시작돼요.", "공사를 다음 달에 시작하세요."], "공사가 다음 달 시작되는 것으로 전해졌어요.", "-ㄴ/는 것으로 전해지다 = foi divulgado que."),
    cloze("Complete a divulgação: 협상이 난항을 겪___ 것으로 전해집니다.", "는", "겪는 것으로 전해집니다 = foi divulgado que enfrenta dificuldades."),
    listen("Ouça e escreva a fonte da notícia.", "지역 신문이 보도자료를 인용해 보도했어요.", "지역 신문이 보도자료를 인용해 보도했어요.", "O jornal local citou o comunicado oficial ao noticiar."),
    translate("ko-pt", "Traduza: 헤드라인이 실제 범위보다 넓게 보였어요.", "A manchete fez o alcance parecer maior do que o real.", "범위 = alcance; 넓게 보이다 = parecer mais amplo.", ["A manchete pareceu mais ampla que o alcance real."]),
    reading("좋은 요약은 출처와 범위를 함께 밝힌다. “시청이 두 노선을 시범 운영한다”는 문장은 짧지만 정확하다. 특종을 노리더라도 사실을 넘어서는 표현은 피해야 한다. 독자는 제목만 보고 내용을 판단하지 않도록 주의해야 한다.", "O que um bom resumo deve informar?", ["Fonte e alcance.", "Apenas o título.", "A opinião do repórter."], "Fonte e alcance.", "출처와 범위를 함께 밝혀요."),
  ],
  summary: ["-다고 보도하다 atribui a notícia ao veículo.", "-ㄴ/는 것으로 전해지다 é divulgação impessoal.", "Resumo bom informa fonte e alcance.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · resumo de notícia",
    "Resuma uma notícia curta (real ou inventada) em quatro a seis frases: fonte, fato principal, alcance e uma ressalva.",
    "짧은 뉴스를 출처와 범위를 포함해 요약해 보세요.",
    ["Diga de onde vem a informação.", "Apresente o fato principal.", "Limite o alcance.", "Use -다고 보도하다 ou -ㄴ/는 것으로 전해지다."],
    ["Fonte explícita.", "Fato principal.", "Alcance delimitado.", "Uma forma da lição.", "Ressalva clara."],
    "어제 시청은 다음 달부터 심야 버스 두 노선을 시범 운영한다고 발표했어요. 보도자료에 따르면 운행은 자정부터 새벽 두 시까지입니다. 지역 신문은 이 내용을 보도했지만, 제목은 실제 범위보다 넓게 보였어요.",
    "Ontem, a prefeitura anunciou que vai operar duas linhas de ônibus noturno em caráter piloto a partir do próximo mês. Segundo o comunicado, a operação vai da meia-noite às duas da manhã. O jornal local noticiou o conteúdo, mas o título pareceu mais amplo que o alcance real.",
    "Exemplo original de três frases. Fonte, fato e ressalva estão explícitos. Compare a estrutura.",
  ),
});

/** b2-l22 — origem, fonte e credibilidade. */
export const B2_L22 = defineB2Lesson({
  id: "b2-l22", number: 22, moduleId: "b2-m05", title: "De onde vem a informação?",
  objective: "Rastrear a origem de uma afirmação e avaliar sua credibilidade.",
  prerequisites: ["b2-l21"], estimatedMinutes: 75, dialogueTitle: "A mensagem viral",
  intro: [
    { title: "Segundo (fonte documental)", body: "-에 의하면 introduz a fonte de uma informação: “segundo...”. É semelhante a -에 따르면, mas costuma soar mais formal e é comum com documentos, relatórios e declarações. Compare com -에 따르면, mais versátil e frequente em notícias.", ko: "시험 기관의 발표에 의하면 기준치를 넘지 않았어요." },
    { title: "É a alegação de que", body: "-라는 주장이다 apresenta uma afirmação atribuída a alguém, sem endossá-la: “é a alegação de que...”. O falante marca distância. Compare com -다고 하다 (relato neutro) e -는 것이 사실이다 (endosso de fato).", ko: "제품이 위험하다는 주장이 제기됐어요." },
  ],
  dialogue: [
    ["지민", "이 메시지 봤어요? 새 제품에서 유해 물질이 나왔다고 해요.", "Você viu esta mensagem? Dizem que saiu substância nociva no novo produto."],
    ["수진", "출처가 있어요?", "Tem fonte?"],
    ["지민", "원문을 밝히지 않았고, 사진도 조작된 것 같아요.", "Não informa o texto original, e a foto parece ter sido manipulada."],
    ["수진", "악의적인 유포인지 확인되기 전에는 퍼뜨리면 안 돼요.", "Antes de confirmar se é uma disseminação mal-intencionada, não se deve espalhar."],
    ["지민", "그럼 어떻게 확인해요?", "Então como verificar?"],
    ["수진", "두 출처를 교차 검증해야 해요. 시험 기관의 발표에 의하면 기준치를 넘은 물질은 없었어요.", "É preciso fazer verificação cruzada de duas fontes. Segundo o anúncio do instituto de testes, não havia substância acima do limite."],
    ["지민", "그 매체는 믿을 만해요?", "Aquele veículo é confiável?"],
    ["수진", "신뢰성에 문제가 있었어요. 그래서 팩트체크가 필요해요. 인용문을 왜곡해서 보도하면 독자는 진실을 알 수 없어요.", "Havia problemas de credibilidade. Por isso é necessário o fact-checking. Se distorcerem a citação ao noticiar, o leitor não consegue saber a verdade."],
  ],
  readingText: {
    titlePt: "A cadeia da informação",
    paragraphs: [
      "한 온라인 커뮤니티에 “새 제품에서 유해 물질이 나왔다”는 글이 올라왔다. 글은 원문을 밝히지 않았고, 사진도 조작된 것으로 보였다. 악의적인 유포인지 확인되기 전에는 확산을 막아야 한다.",
      "기자는 두 출처를 교차 검증했다. 제조사 자료와 시험 기관의 발표를 비교한 결과, 기준치를 넘은 것은 없었다. 그 매체의 신뢰성은 이전 보도에서도 문제가 있었다.",
      "팩트체크는 의심만 키우는 일이 아니다. 인용문을 왜곡해서 보도하면 독자는 진실을 알 수 없다. 원문과 맥락을 함께 제시할 때 확인은 힘을 얻는다. 확인되지 않은 정보를 사실처럼 전하는 것은 또 다른 피해를 만든다. 그래서 원문 확인이 먼저다.",
    ],
    pt: "Em uma comunidade on-line, alguém publicou: “saiu substância nociva no novo produto”. O texto não informava o original, e a foto também parecia manipulada. Antes de confirmar se era uma disseminação mal-intencionada, é preciso impedir que se espalhe. O repórter fez verificação cruzada de duas fontes. Ao comparar os materiais do fabricante com o anúncio do instituto de testes, não havia nada acima do limite. A credibilidade daquele veículo já tinha problemas em reportagens anteriores. O fact-checking não serve apenas para aumentar a suspeita. Se uma citação é distorcida na reportagem, o leitor não consegue conhecer a verdade. A verificação ganha força quando apresenta o original e o contexto juntos.",
    objective: "Rastrear a fonte original, distinguir fonte primária de repetição e avaliar credibilidade.",
  },
  reusedIds: ["ko:사실", "ko:보도", "ko:자료"],
  grammar: [
    ["-에 의하면 — segundo", "명사 + 에 의하면", "Introduz a fonte de uma informação: “segundo...”. É semelhante a -에 따르면, mas costuma soar mais formal e é comum com documentos, relatórios e declarações. Compare com -에 따르면, mais versátil e frequente em notícias. Registro: formal/escrito.", [["시험 기관의 발표에 의하면 기준치를 넘지 않았어요.", "Segundo o anúncio do instituto de testes, não ultrapassou o limite."], ["보고서에 의하면 비용이 두 배로 늘었습니다.", "Segundo o relatório, o custo dobrou."]]],
    ["-라는 주장이다 — é a alegação de que", "명사 + 라는 주장이다 / 동사 + -ㄴ/는다는 주장이다", "Apresenta uma afirmação atribuída a alguém, sem endossá-la: “é a alegação de que...”. O falante marca distância. Compare com -다고 하다 (relato neutro) e -는 것이 사실이다 (endosso de fato). Registro: neutro a formal.", [["제품이 위험하다는 주장이 제기됐어요.", "Foi levantada a alegação de que o produto é perigoso."], ["그 정책이 효과가 있다는 주장에는 근거가 부족합니다.", "A alegação de que a política é eficaz carece de evidência."]]],
  ],
  guided: [
    mcq("Por que a mensagem não é confiável?", ["Não informa a fonte e a foto parece manipulada.", "Foi publicada por um jornal.", "Tem muitas palavras."], "Não informa a fonte e a foto parece manipulada.", "원문을 밝히지 않았고 사진도 조작된 것 같아요."),
    cloze("Complete a fonte formal: 시험 기관의 발표___ 의하면 기준치를 넘지 않았어요.", "에", "발표에 의하면 = segundo o anúncio."),
    listen("Ouça e escreva a conclusão da verificação.", "기준치를 넘은 물질은 없었어요.", "기준치를 넘은 물질은 없었어요.", "Não havia substância acima do limite."),
    reading("한 온라인 커뮤니티에 “새 제품에서 유해 물질이 나왔다”는 글이 올라왔다. 글은 원문을 밝히지 않았고, 사진도 조작된 것으로 보였다. 악의적인 유포인지 확인되기 전에는 확산을 막아야 한다.", "Qual é o problema da postagem?", ["Não informa a fonte e a foto parece manipulada.", "Foi publicada por um órgão oficial.", "Não tem imagem."], "Não informa a fonte e a foto parece manipulada.", "원문을 밝히지 않았고 사진도 조작된 것 같아요."),
    translate("pt-ko", "Traduza: “Segundo o anúncio do instituto de testes, não ultrapassou o limite.”", "시험 기관의 발표에 의하면 기준치를 넘지 않았어요.", "-에 의하면 introduz a fonte.", ["시험 기관 발표에 의하면 기준치를 넘지 않았습니다."]),
  ],
  independent: [
    mcq("Qual frase atribui uma alegação sem endossá-la?", ["제품이 위험하다는 주장이 제기됐어요.", "제품이 위험해요.", "제품이 위험할 거예요."], "제품이 위험하다는 주장이 제기됐어요.", "-라는 주장이다 marca distância."),
    cloze("Complete a alegação: 그 정책이 효과가 있다___ 주장에는 근거가 부족해요.", "는", "있다는 주장 = alegação de que é eficaz."),
    listen("Ouça e escreva o método de verificação.", "두 출처를 교차 검증했어요.", "두 출처를 교차 검증했어요.", "Fiz verificação cruzada de duas fontes."),
    translate("ko-pt", "Traduza: 인용문을 왜곡해서 보도하면 독자는 진실을 알 수 없어요.", "Se distorcerem a citação ao noticiar, o leitor não consegue saber a verdade.", "왜곡하다 = distorcer; 인용문 = citação.", ["Quando a citação é distorcida, o leitor não conhece a verdade."]),
    reading("팩트체크는 의심만 키우는 일이 아니다. 인용문을 왜곡해서 보도하면 독자는 진실을 알 수 없다. 원문과 맥락을 함께 제시할 때 확인은 힘을 얻는다. 확인되지 않은 정보를 사실처럼 전하는 것은 또 다른 피해를 만든다. 그래서 원문 확인이 먼저다.", "O que fortalece a verificação?", ["Apresentar o original e o contexto.", "Repetir a manchete sem alterações.", "Apagar a fonte e o nome do autor."], "Apresentar o original e o contexto.", "원문과 맥락을 함께 제시할 때 확인은 힘을 얻어요."),
  ],
  summary: ["-에 의하면 introduz fonte formal.", "-라는 주장이다 atribui sem endossar.", "Rastrear a fonte é diferente de repetir a fonte.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · verificar uma alegação",
    "Escolha uma alegação que você viu circular. Em cinco a sete frases, diga a fonte, o que falta, como verificaria e o que já pode concluir.",
    "온라인에서 본 주장의 출처와 확인 방법을 써 보세요.",
    ["Cite a alegação sem repetir como verdade.", "Diga de onde ela vem.", "Use -에 의하면 ou -라는 주장이다.", "Separe o que foi confirmado do que falta."],
    ["Alegação citada.", "Fonte ou ausência de fonte.", "Método de verificação.", "Uma forma da lição.", "Conclusão cautelosa."],
    "온라인에 올라온 제품 안전성 주장을 확인했어요. 원문에는 시험 기관 자료가 없었고, 사진도 조작된 것으로 보였어요. 두 출처를 교차 검증한 결과, 기준치를 넘은 물질은 없었습니다. 하지만 모든 제품을 확인한 것은 아니에요.",
    "Verifiquei a alegação de segurança de um produto que circulou on-line. O texto original não trazia material do instituto de testes, e a foto também parecia manipulada. Depois da verificação cruzada de duas fontes, não havia substância acima do limite. No entanto, não verificamos todos os produtos.",
    "Exemplo original de quatro frases. A alegação não é tratada como fato e o limite da verificação aparece. Compare a estrutura.",
  ),
});

/** b2-l23 — fato, opinião e inferência. */
export const B2_L23 = defineB2Lesson({
  id: "b2-l23", number: 23, moduleId: "b2-m05", title: "Fato, opinião e inferência",
  objective: "Classificar afirmações e justificar a classificação com o texto.",
  prerequisites: ["b2-l22"], estimatedMinutes: 75, dialogueTitle: "A classificação do artigo",
  intro: [
    { title: "É fato que", body: "-ㄴ/는 것이 사실이다 afirma que algo é fato: “é fato que...”. Use quando há verificação, não para opinião. Compare com -ㄴ/는 데 지나지 않는다 (não passa de) e -라고 볼 수 있다 (pode-se considerar).", ko: "이용자가 늘었다는 것은 사실이에요." },
    { title: "Não passa de", body: "-ㄴ/는 데 지나지 않는다 limita o valor de algo: “não passa de...”. É útil para separar um dado de uma conclusão maior. Compare com -뿐이다 (apenas) e -는 정도이다 (apenas o nível de). Registro: neutro a formal.", ko: "한 단지의 거래 감소는 전체 시장의 하락 신호에 지나지 않아요." },
  ],
  dialogue: [
    ["아나", "이 기사에서 어떤 문장이 사실이에요?", "Neste artigo, qual frase é fato?"],
    ["민수", "“주말에 공원을 찾는 사람이 지난달보다 늘었다”는 사실이에요.", "“O número de pessoas que vão ao parque nos fins de semana aumentou em relação ao mês passado” é fato."],
    ["아나", "“공원이 더 안전해졌다”는요?", "E “o parque ficou mais seguro”?"],
    ["민수", "그건 같은 자료로 확인하기 어려워요. 의견이거나 추론이에요.", "Isso é difícil de confirmar com os mesmos dados. É opinião ou inferência."],
    ["아나", "기사에서 자주 섞이더라고요.", "Nos artigos, isso se mistura com frequência."],
    ["민수", "맞아요. “주민들이 만족한다”는 인터뷰에 근거할 수 있지만, 전체 주민의 의견은 아니에요.", "Exato. “Os moradores estão satisfeitos” pode se basear em entrevistas, mas não é a opinião de todos os moradores."],
    ["아나", "그럼 단정적인 표현은 피해야겠네요.", "Então é preciso evitar expressões categóricas."],
    ["민수", "네. 개연성과 함의를 함께 보고, 사실적인지 과장되었는지 확인해야 해요. 맥락이 왜곡되면 문제가 드러나고, 기사는 정정되어야 해요.", "Sim. É preciso ver a probabilidade e a implicação juntas, e verificar se é factual ou exagerado. Se o contexto for distorcido, o problema aparece, e o artigo deve ser corrigido."],
  ],
  readingText: {
    titlePt: "O que o dado permite afirmar",
    paragraphs: [
      "“주말에 공원을 찾는 사람이 지난달보다 늘었다”는 문장은 사실이다. “공원이 더 안전해졌다”는 같은 자료로는 확인하기 어렵다. 후자는 해석이거나 기대일 수 있다.",
      "기사는 사실과 의견을 섞어 쓰기도 한다. “주민들이 만족한다”는 말은 인터뷰에 근거할 수 있지만, 전체 주민의 의견은 아니다. 단정적인 표현이나 유보적인 표현이 결과를 다르게 만든다.",
      "판단할 때는 개연성과 함의를 함께 본다. 문장이 사실적인지, 과장되었는지, 맥락이 왜곡되었는지 확인해야 한다. 문제가 드러나면 기사는 정정되어야 한다. 정정은 패배가 아니라 신뢰를 회복하는 절차다. 그 절차를 가볍게 여기면 안 된다.",
    ],
    pt: "A frase “o número de pessoas que visitam o parque nos fins de semana aumentou em relação ao mês passado” é um fato. Já “o parque ficou mais seguro” é difícil de confirmar com os mesmos dados. A segunda pode ser uma interpretação ou uma expectativa. Os artigos às vezes misturam fato e opinião. “Os moradores estão satisfeitos” pode se basear em entrevistas, mas não é a opinião de todos os moradores. Expressões categóricas ou reservadas fazem o resultado parecer diferente. Ao julgar, é preciso ver a probabilidade e a implicação juntas. É necessário verificar se a frase é factual, se foi exagerada e se o contexto foi distorcido. Quando o problema aparece, o artigo deve ser corrigido.",
    objective: "Classificar afirmações em fato, opinião e inferência e justificar com o texto.",
  },
  reusedIds: ["ko:사실", "ko:의견", "ko:판단"],
  grammar: [
    ["-ㄴ/는 것이 사실이다 — é fato que", "동사 + -는 것이 사실이다 / 형용사 + -ㄴ/은 것이 사실이다", "Afirma que algo é fato: “é fato que...”. Use quando há verificação, não para opinião. Compare com -ㄴ/는 데 지나지 않는다 (não passa de) e -라고 볼 수 있다 (pode-se considerar). Registro: neutro a formal.", [["이용자가 늘었다는 것은 사실이에요.", "É fato que o número de usuários aumentou."], ["비용이 많이 들었다는 것이 사실입니다.", "É fato que o custo foi alto."]]],
    ["-ㄴ/는 데 지나지 않는다 — não passa de", "동사 + -는 데 지나지 않는다 / 명사 + 에 지나지 않는다", "Limita o valor de algo: “não passa de...”. É útil para separar um dado de uma conclusão maior. Compare com -뿐이다 (apenas) e -는 정도이다 (apenas o nível de). Registro: neutro a formal.", [["한 단지의 거래 감소는 전체 시장의 하락 신호에 지나지 않아요.", "A queda de transações em um só complexo não passa de um sinal de queda do mercado total."], ["그건 추측에 지나지 않습니다.", "Isso não passa de conjectura."]]],
  ],
  guided: [
    mcq("Qual frase é fato no artigo?", ["O número de visitantes do parque aumentou.", "O parque ficou mais seguro.", "Todos os moradores estão satisfeitos."], "O número de visitantes do parque aumentou.", "이용자가 늘었다는 것은 자료로 확인된 사실이에요."),
    cloze("Complete a limitação: 그건 추측___ 지나지 않습니다.", "에", "추측에 지나지 않다 = não passa de conjectura."),
    listen("Ouça e escreva o que é fato.", "이용자가 늘었다는 것은 사실이에요.", "이용자가 늘었다는 것은 사실이에요.", "É fato que o número de usuários aumentou."),
    reading("“주말에 공원을 찾는 사람이 지난달보다 늘었다”는 문장은 사실이다. “공원이 더 안전해졌다”는 같은 자료로는 확인하기 어렵다. 후자는 해석이거나 기대일 수 있다.", "O que se pode dizer da segunda frase?", ["É interpretação ou expectativa, não fato verificado.", "É um dado do mesmo levantamento.", "É uma ordem."], "É interpretação ou expectativa, não fato verificado.", "후자는 해석이거나 기대일 수 있어요."),
    translate("pt-ko", "Traduza: “É fato que o número de usuários aumentou.”", "이용자가 늘었다는 것은 사실이에요.", "-ㄴ/는 것이 사실이다 afirma um fato.", ["이용자가 늘었다는 것이 사실입니다."]),
  ],
  independent: [
    mcq("Qual frase limita uma conclusão?", ["그건 추측에 지나지 않아요.", "그건 사실이에요.", "그건 반드시 맞아요."], "그건 추측에 지나지 않아요.", "-에 지나지 않는다 = não passa de."),
    cloze("Complete a classificação: 비용이 많이 들었다___ 것이 사실입니다.", "는", "들었다는 것이 사실 = é fato que custou muito."),
    listen("Ouça e escreva o limite da generalização.", "인터뷰 결과를 전체 의견으로 일반화하면 안 돼요.", "인터뷰 결과를 전체 의견으로 일반화하면 안 돼요.", "Não se deve generalizar o resultado da entrevista como opinião de todos."),
    translate("ko-pt", "Traduza: 단정적인 표현보다 유보적인 표현이 더 정확할 때가 있어요.", "Às vezes, uma expressão reservada é mais precisa do que uma categórica.", "단정적 = categórico; 유보적 = reservado.", ["Uma formulação cautelosa pode ser mais exata que uma categórica."]),
    reading("판단할 때는 개연성과 함의를 함께 본다. 문장이 사실적인지, 과장되었는지, 맥락이 왜곡되었는지 확인해야 한다. 문제가 드러나면 기사는 정정되어야 한다. 정정은 패배가 아니라 신뢰를 회복하는 절차다. 그 절차를 가볍게 여기면 안 된다.", "O que deve ser verificado?", ["Se é factual, exagerado ou distorcido.", "Apenas o número de palavras.", "A opinião do editor."], "Se é factual, exagerado ou distorcido.", "사실적인지, 과장되었는지, 왜곡되었는지 확인해요."),
  ],
  summary: ["-ㄴ/는 것이 사실이다 afirma fato verificado.", "-ㄴ/는 데 지나지 않는다 limita o alcance.", "Fato, opinião e inferência exigem justificativa textual.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · classificar afirmações",
    "Escolha três afirmações de um texto curto (real ou inventado) e classifique cada uma como fato, opinião ou inferência, justificando com uma pista.",
    "세 문장을 사실, 의견, 추론으로 분류해 보세요.",
    ["Cite a afirmação.", "Classifique com um critério.", "Aponte a pista textual.", "Use uma forma da lição."],
    ["Três afirmações citadas.", "Classificação justificada.", "Pista textual para cada uma.", "Uma forma da lição.", "Conclusão sem confundir opinião com fato."],
    "이 기사에서 “공원 이용자가 늘었다”는 사실이에요. “공원이 더 안전해졌다”는 의견이거나 추론이에요. 같은 자료로 안전성을 확인할 수는 없어요.",
    "Neste artigo, “o número de usuários do parque aumentou” é fato. “O parque ficou mais seguro” é opinião ou inferência. Com os mesmos dados, não é possível confirmar a segurança.",
    "Exemplo original de três frases. Cada classificação tem uma justificativa. Compare o critério.",
  ),
});

/** b2-l24 — versões, confiabilidade e múltiplas perspectivas. */
export const B2_L24 = defineB2Lesson({
  id: "b2-l24", number: 24, moduleId: "b2-m05", title: "Versões diferentes",
  objective: "Comparar versões de um fato e avaliar confiabilidade sem decidir por autoridade.",
  prerequisites: ["b2-l23"], estimatedMinutes: 75, dialogueTitle: "Duas versões da obra",
  intro: [
    { title: "Há margem para", body: "-ㄹ 여지가 있다 indica que existe espaço para uma interpretação, dúvida ou ação: “há margem para...”. Compare com -ㄹ 가능성이 있다 (possibilidade) e -ㄹ 수 있다 (capacidade/possibilidade geral). Registro: formal/escrito.", ko: "아직 다른 해석이 있을 여지가 있어요." },
    { title: "Só porque se diz que", body: "-다고 해서 significa “só porque se diz/faz..., não significa que...”. A segunda oração costuma negar uma conclusão automática. Compare com -ㄴ/는다 해도 (mesmo que se diga) e -라고 해도 (mesmo que digam). Registro: neutro a formal.", ko: "소문이 난다고 해서 사실은 아니에요." },
  ],
  dialogue: [
    ["지민", "공사 현장 때문에 주민들이 많이 불편하다면서요?", "Ouvi dizer que os moradores estão muito incomodados por causa da obra, é verdade?"],
    ["수진", "주민과 시의 설명이 달라요. 주민은 소음이 심하다고 하고, 시는 기준을 지켰다고 해요.", "As explicações dos moradores e da prefeitura são diferentes. Os moradores dizem que o barulho é intenso; a prefeitura diz que cumpriu os padrões."],
    ["지민", "어느 쪽이 맞아요?", "Qual lado está certo?"],
    ["수진", "자료에 따라 시각이 달라질 수 있어요. 아직 단정할 여지가 있어요.", "A perspectiva pode mudar conforme os dados. Ainda há margem para não afirmar."],
    ["지민", "보도는 어떻게 됐어요?", "Como foi a cobertura?"],
    ["수진", "논란과 반응이 이어졌어요. 어떤 기사는 주민 편에, 어떤 기사는 시 편에 섰어요.", "Seguiram-se polêmica e reações. Alguns artigos ficaram do lado dos moradores; outros, da prefeitura."],
    ["지민", "균형을 잃은 보도는 문제죠.", "Uma cobertura sem equilíbrio é um problema."],
    ["수진", "맞아요. 공정성, 중립성, 객관성에 대한 의심이 커져요. 편향성은 한 문장에서도 드러나요. 소문이 난다고 해서 사실은 아니에요. 문제를 다각도로 봐야 해요.", "Exato. Cresce a dúvida sobre fairness e neutralidade. O viés aparece até em uma frase. Só porque há um boato, não significa que seja fato. É preciso olhar o problema por vários ângulos."],
  ],
  readingText: {
    titlePt: "Duas versões, uma obra",
    paragraphs: [
      "같은 공사 현장을 두고 주민과 시의 설명이 달랐다. 주민은 소음이 심하다고 했고, 시는 기준을 지켰다고 했다. 어느 쪽이 맞는지는 자료에 따라 시각이 달라질 수 있다.",
      "보도가 나간 뒤 논란과 반응이 이어졌다. 어떤 기사는 주민 편에, 어떤 기사는 시 편에 섰다. 균형을 잃은 보도는 공정성과 중립성, 객관성에 대한 의심을 키운다.",
      "편향성은 한 문장에서도 드러난다. 그래서 문제를 다각도로 살펴야 한다. 서로 다른 주장을 비교하고, 확인되지 않은 부분을 밝히는 것이 신뢰의 시작이다. 보도는 한쪽의 주장만 크게 다루지 않도록 조심해야 한다. 그럴 때 독자는 스스로 판단할 수 있다. 그것이 공론의 출발점이다.",
    ],
    pt: "Sobre a mesma obra, as explicações dos moradores e da prefeitura eram diferentes. Os moradores diziam que o barulho era intenso; a prefeitura, que os padrões foram cumpridos. Qual lado está certo pode mudar conforme os dados e a perspectiva. Depois da reportagem, seguiram-se polêmica e reações. Alguns artigos ficaram do lado dos moradores; outros, da prefeitura. Uma cobertura sem equilíbrio aumenta a dúvida sobre fairness e neutralidade. O viés aparece até em uma frase. Por isso, é preciso olhar o problema por vários ângulos. Comparar as diferentes alegações e deixar claro o que ainda não foi confirmado é o começo da confiança.",
    objective: "Comparar versões, identificar critérios de confiabilidade e preservar a incerteza.",
  },
  reusedIds: ["ko:보도", "ko:기사", "ko:자료"],
  grammar: [
    ["-ㄹ 여지가 있다 — há margem para", "동사/형용사 + -ㄹ 여지가 있다", "Indica que existe espaço para uma interpretação, dúvida ou ação: “há margem para...”. Compare com -ㄹ 가능성이 있다 (possibilidade) e -ㄹ 수 있다 (capacidade/possibilidade geral). Registro: formal/escrito.", [["아직 다른 해석이 있을 여지가 있어요.", "Ainda há margem para outra interpretação."], ["논의할 여지가 남아 있습니다.", "Ainda há margem para discussão."]]],
    ["-다고 해서 — só porque se diz que", "동사/형용사 + -다고 해서", "Significa “só porque se diz/faz..., não significa que...”. A segunda oração costuma negar uma conclusão automática. Compare com -ㄴ/는다 해도 (mesmo que se diga) e -라고 해도 (mesmo que digam). Registro: neutro a formal.", [["소문이 난다고 해서 사실은 아니에요.", "Só porque há um boato, não significa que seja fato."], ["유명하다고 해서 품질이 좋은 것은 아닙니다.", "Só porque é famoso, não significa que a qualidade seja boa."]]],
  ],
  guided: [
    mcq("Por que é difícil decidir qual versão está certa?", ["Porque a perspectiva muda conforme os dados.", "Porque não há moradores no local.", "Porque a obra terminou antes do prazo."], "Porque a perspectiva muda conforme os dados.", "자료에 따라 시각이 달라질 수 있어요."),
    cloze("Complete a margem de dúvida: 아직 다른 해석이 있을 ___가 있어요.", "여지", "여지가 있다 = há margem."),
    listen("Ouça e escreva a diferença entre as versões.", "주민과 시의 설명이 서로 달라요.", "주민과 시의 설명이 서로 달라요.", "As explicações dos moradores e da prefeitura são diferentes."),
    reading("같은 공사 현장을 두고 주민과 시의 설명이 달랐다. 주민은 소음이 심하다고 했고, 시는 기준을 지켰다고 했다. 어느 쪽이 맞는지는 자료에 따라 시각이 달라질 수 있다.", "Por que as versões diferem?", ["Porque cada lado parte de dados e perspectivas diferentes.", "Porque a obra não existe de verdade.", "Porque todos concordam sobre o ocorrido."], "Porque cada lado parte de dados e perspectivas diferentes.", "자료에 따라 시각이 달라질 수 있어요."),
    translate("pt-ko", "Traduza: “Só porque há um boato, não significa que seja fato.”", "소문이 난다고 해서 사실은 아니에요.", "-다고 해서 nega a conclusão automática.", ["소문이 난다고 해서 사실이 되는 것은 아니에요."]),
  ],
  independent: [
    mcq("Qual frase nega uma conclusão automática?", ["유명하다고 해서 품질이 좋은 것은 아니에요.", "유명해서 품질이 좋아요.", "유명하면 품질이 좋을 거예요."], "유명하다고 해서 품질이 좋은 것은 아니에요.", "-다고 해서 = só porque se diz, não significa."),
    cloze("Complete a margem: 논의할 ___가 남아 있습니다.", "여지", "여지가 남아 있다 = ainda há margem."),
    listen("Ouça e escreva o efeito da cobertura sem equilíbrio.", "균형을 잃은 보도는 공정성에 대한 의심을 키워요.", "균형을 잃은 보도는 공정성에 대한 의심을 키워요.", "Uma cobertura sem equilíbrio aumenta a dúvida sobre a imparcialidade."),
    translate("ko-pt", "Traduza: 문제를 다각도로 살펴야 해요.", "É preciso olhar o problema por vários ângulos.", "다각도로 = por vários ângulos.", ["Devemos examinar o problema sob várias perspectivas."]),
    reading("편향성은 한 문장에서도 드러난다. 그래서 문제를 다각도로 살펴야 한다. 서로 다른 주장을 비교하고, 확인되지 않은 부분을 밝히는 것이 신뢰의 시작이다. 보도는 한쪽의 주장만 크게 다루지 않도록 조심해야 한다. 그럴 때 독자는 스스로 판단할 수 있다. 그것이 공론의 출발점이다.", "O que é o começo da confiança?", ["Comparar alegações e explicitar o que não foi confirmado.", "Escolher o lado mais forte da disputa.", "Repetir a versão mais popular da notícia."], "Comparar alegações e explicitar o que não foi confirmado.", "서로 다른 주장을 비교하고 확인되지 않은 부분을 밝히는 것."),
  ],
  summary: ["-ㄹ 여지가 있다 indica margem de interpretação.", "-다고 해서 nega conclusão automática.", "Confiabilidade exige critério, não autoridade.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · comparar duas versões",
    "Compare duas versões de um fato público ou cotidiano. Diga o que cada lado afirma, qual evidência apresenta e o que ainda falta para decidir.",
    "같은 사건에 대한 두 버전을 비교해 보세요.",
    ["Apresente as duas versões.", "Atribua cada uma à fonte.", "Use -ㄹ 여지가 있다 ou -다고 해서.", "Diga o que falta para decidir."],
    ["Duas versões atribuídas.", "Evidência de cada lado.", "Uma forma da lição.", "Incerteza preservada.", "Conclusão não autoritária."],
    "같은 공사 현장에 대해 주민과 시의 설명이 달랐어요. 주민은 소음이 심하다고 했고, 시는 기준을 지켰다고 했어요. 두 자료를 다각도로 비교해야 하지만, 아직 어느 쪽이 맞는지 단정할 수 없어요.",
    "Sobre a mesma obra, as explicações dos moradores e da prefeitura eram diferentes. Os moradores disseram que o barulho era intenso; a prefeitura, que os padrões foram cumpridos. É preciso comparar os dois materiais por vários ângulos, mas ainda não se pode afirmar qual lado está certo.",
    "Exemplo original de três frases. As duas versões são atribuídas e a incerteza é mantida. Compare a estrutura.",
  ),
});

/** b2-l25 — enquadramento e leitura de manchete. */
export const B2_L25 = defineB2Lesson({
  id: "b2-l25", number: 25, moduleId: "b2-m05", title: "O que a manchete esconde",
  objective: "Analisar enquadramento e distinguir manchete, corpo e intenção editorial.",
  prerequisites: ["b2-l24"], estimatedMinutes: 75, dialogueTitle: "A manchete do aplicativo",
  intro: [
    { title: "Não significa que", body: "-다는 뜻은 아니다 esclarece que uma formulação não deve ser interpretada de certo modo: “não significa que...”. É útil para corrigir uma inferência apressada. Compare com -는 것은 아니다 (não é que) e -다고 해서 (só porque).", ko: "거래가 줄었다는 뜻은 아니에요." },
    { title: "É preciso verificar se", body: "-ㄴ/는지 따져야 한다 indica a necessidade de verificar uma questão: “é preciso verificar se...”. Compare com -ㄴ/는지 알 수 없다 (não se pode saber) e -ㄴ/는지 확인하다 (confirmar se). Registro: formal/escrito.", ko: "제목이 본문과 같은지 따져야 해요." },
  ],
  dialogue: [
    ["아나", "이 기사 제목 봤어요? “아파트 값 폭락 시작”이래요.", "Você viu o título desta notícia? “Começa o colapso dos preços dos apartamentos”."],
    ["민수", "본문을 보면 한 단지의 거래가 줄었다는 내용이에요.", "No corpo, o conteúdo é que as transações diminuíram em um único complexo."],
    ["아나", "그럼 제목이 내용을 오도하네요.", "Então o título engana sobre o conteúdo."],
    ["민수", "네. 선정적인 표현이에요. 조회수를 높이려는 자극적인 제목이 늘고 있어요.", "Sim. É uma expressão sensacionalista. Títulos provocativos para aumentar visualizações estão crescendo."],
    ["아나", "미디어 환경이 빨라진 것도 영향이 있겠죠?", "O ambiente midiático mais rápido também deve influenciar, certo?"],
    ["민수", "맞아요. 확인보다 클릭이 앞서요. 기자의 책임감만으로는 부족해요.", "Exato. O clique vem antes da verificação. Só a responsabilidade do repórter não basta."],
    ["아나", "그럼 검열이 필요하다는 건가요?", "Então é preciso censura?"],
    ["민수", "아니요. 문제를 공론화하는 건 필요하지만, 검열로 해결할 일은 아니에요. “폭락”이라는 말은 “거래 감소”라는 뜻은 아니에요. 제목이 본문과 같은지 따져야 해요.", "Não. É necessário trazer o problema ao debate público, mas não se resolve com censura. “Colapso” não significa “redução de transações”. É preciso verificar se o título corresponde ao corpo."],
  ],
  readingText: {
    titlePt: "O título que diz mais do que o texto",
    paragraphs: [
      "한 기사가 “아파트 값 폭락 시작”이라는 제목으로 게시되었다. 그러나 본문을 보면 한 단지의 거래가 줄었다는 내용이었다. 제목은 내용을 오도하는 선정적인 표현이었다.",
      "조회수가 높아질수록 자극적인 제목이 늘어난다. 미디어 환경이 빨라지면서 확인보다 클릭이 앞서는 경우도 많다. 기자의 책임감만으로는 부족하다.",
      "문제를 공론화하는 것은 필요하지만, 검열로 해결할 일은 아니다. “폭락”이라는 말은 “거래 감소”라는 뜻은 아니다. 제목이 본문과 같은지 따져야 한다. 제목을 고치는 일은 작아 보이지만, 독자의 이해를 바꾼다. 그래서 편집 기준을 공개하는 것도 도움이 된다. 작은 실천이 필요하다.",
    ],
    pt: "Um artigo foi publicado com o título “começa o colapso dos preços dos apartamentos”. No entanto, o corpo dizia que as transações haviam diminuído em um único complexo. O título era uma expressão sensacionalista que induzia a uma leitura errada do conteúdo. Quanto maior o número de visualizações, mais títulos provocativos aparecem. Com o ambiente midiático mais rápido, há casos em que o clique vem antes da verificação. Só a responsabilidade do repórter não basta. Trazer o problema ao debate público é necessário, mas não se resolve com censura. A palavra “colapso” não significa “redução de transações”. É preciso verificar se o título corresponde ao corpo.",
    objective: "Comparar manchete e corpo, identificar enquadramento e reescrever com fidelidade.",
  },
  reusedIds: ["ko:기사", "ko:내용", "ko:제목"],
  grammar: [
    ["-다는 뜻은 아니다 — não significa que", "동사/형용사 + -다는 뜻은 아니다", "Esclarece que uma formulação não deve ser interpretada de certo modo: “não significa que...”. É útil para corrigir uma inferência apressada. Compare com -는 것은 아니다 (não é que) e -다고 해서 (só porque). Registro: neutro a formal.", [["거래가 줄었다는 뜻은 아니에요.", "Não significa que as transações diminuíram."], ["제가 반대한다는 뜻은 아닙니다.", "Não significa que eu seja contra."]]],
    ["-ㄴ/는지 따져야 한다 — é preciso verificar se", "동사/형용사 + -ㄴ/는지 따져야 한다", "Indica a necessidade de verificar uma questão: “é preciso verificar se...”. Compare com -ㄴ/는지 알 수 없다 (não se pode saber) e -ㄴ/는지 확인하다 (confirmar se). Registro: formal/escrito.", [["제목이 본문과 같은지 따져야 해요.", "É preciso verificar se o título corresponde ao corpo."], ["그 주장이 사실인지 따져야 합니다.", "É preciso verificar se essa alegação é verdadeira."]]],
  ],
  guided: [
    mcq("Por que a manchete é enganosa?", ["Porque o corpo fala de um só complexo, não do mercado todo.", "Porque o artigo não tem título nem subtítulo.", "Porque o preço subiu muito no mercado."], "Porque o corpo fala de um só complexo, não do mercado todo.", "한 단지의 거래 감소를 전체 시장처럼 썼어요."),
    cloze("Complete a verificação: 제목이 본문과 같은___ 따져야 해요.", "지", "같은지 따져야 = é preciso verificar se é o mesmo."),
    listen("Ouça e escreva o problema do título.", "제목이 내용을 오도해요.", "제목이 내용을 오도해요.", "O título induz a uma leitura errada do conteúdo."),
    reading("한 기사가 “아파트 값 폭락 시작”이라는 제목으로 게시되었다. 그러나 본문을 보면 한 단지의 거래가 줄었다는 내용이었다. 제목은 내용을 오도하는 선정적인 표현이었다.", "O que o corpo realmente dizia?", ["As transações diminuíram em um único complexo.", "Todo o mercado entrou em colapso.", "Os preços subiram em toda a cidade."], "As transações diminuíram em um único complexo.", "한 단지의 거래가 줄었다는 내용이었어요."),
    translate("pt-ko", "Traduza: “Não significa que as transações diminuíram.”", "거래가 줄었다는 뜻은 아니에요.", "-다는 뜻은 아니다 corrige a inferência.", ["거래가 줄었다는 것은 아니에요."]),
  ],
  independent: [
    mcq("Qual frase corrige uma interpretação apressada?", ["제가 반대한다는 뜻은 아닙니다.", "제가 반대합니다.", "제가 반대할 거예요."], "제가 반대한다는 뜻은 아닙니다.", "-다는 뜻은 아니다 = não significa que."),
    cloze("Complete a verificação: 그 주장이 사실인___ 따져야 합니다.", "지", "사실인지 따져야 = é preciso verificar se é verdade."),
    listen("Ouça e escreva o que é mais importante que cliques.", "조회수보다 정확성이 중요해요.", "조회수보다 정확성이 중요해요.", "A exatidão é mais importante que as visualizações."),
    translate("ko-pt", "Traduza: 문제를 공론화하는 것은 필요하지만 검열로 해결할 일은 아니에요.", "É necessário trazer o problema ao debate público, mas não se resolve com censura.", "공론화 = trazer ao debate público; 검열 = censura.", ["É preciso debater o problema publicamente, mas censura não é a solução."]),
    reading("문제를 공론화하는 것은 필요하지만, 검열로 해결할 일은 아니다. “폭락”이라는 말은 “거래 감소”라는 뜻은 아니다. 제목이 본문과 같은지 따져야 한다. 제목을 고치는 일은 작아 보이지만, 독자의 이해를 바꾼다. 그래서 편집 기준을 공개하는 것도 도움이 된다. 작은 실천이 필요하다.", "O que é preciso verificar?", ["Se o título corresponde ao corpo.", "Se o artigo tem muitos cliques.", "Se o autor é famoso."], "Se o título corresponde ao corpo.", "제목이 본문과 같은지 따져야 해요."),
  ],
  summary: ["-다는 뜻은 아니다 corrige uma inferência.", "-ㄴ/는지 따져야 한다 pede verificação.", "Manchete e corpo podem ter alcances diferentes.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · reescrever uma manchete",
    "Reescreva uma manchete exagerada para que ela corresponda ao corpo. Em quatro a seis frases, explique o que mudou e por quê.",
    "과장된 제목을 본문에 맞게 다시 써 보세요.",
    ["Cite a manchete original.", "Diga o que o corpo realmente afirma.", "Use -다는 뜻은 아니다 ou -ㄴ/는지 따져야 한다.", "Escreva a nova manchete."],
    ["Manchete original citada.", "Diferença entre título e corpo.", "Uma forma da lição.", "Nova manchete fiel.", "Justificativa clara."],
    "원래 제목은 “아파트 값 폭락 시작”이었어요. 하지만 본문은 한 단지의 거래 감소를 다뤘어요. 그래서 “한 단지 거래 감소, 시장 전체로 확대 해석은 이르다”로 고쳤어요.",
    "O título original era “começa o colapso dos preços dos apartamentos”. Mas o corpo tratava da redução de transações em um único complexo. Por isso, mudei para “redução de transações em um complexo; é cedo para estender ao mercado todo”.",
    "Exemplo original de três frases. A nova manchete mantém o fato e retira o exagero. Compare o critério.",
  ),
});
