import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto integra as fontes pedidas e deixa claro o que cada uma sustenta, sem trocar a tarefa por um resumo separado." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a análise avança da evidência para a interpretação e da interpretação para o limite." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso de método, viés, conflito ou citação, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro acadêmico se mantém consistente do começo ao fim." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "Distingue o que a fonte mostra do que ela permite concluir e nomeia o que permanece em aberto." },
  { criterion: "mediation" as const, labelPt: "Mediação e ética", descriptorPt: "Representa fontes e posições sem distorcer, atribui ideias a quem as formulou e não transforma suspeita em acusação." },
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
): CourseProductionTask {
  return {
    titlePt,
    promptPt,
    promptKo,
    guidance,
    checklist,
    minWords: 110,
    rubric: RUBRIC,
    sample: { ko: sampleKo, pt: samplePt, notePt },
  };
}

/** c2-l21 — integrar evidência quantitativa e qualitativa. */
export const C2_L21 = defineC2Lesson({
  id: "c2-l21", number: 21, moduleId: "c2-m05", title: "Números e entrevistas",
  objective: "Integrar evidência quantitativa e qualitativa sem hierarquizá-las automaticamente.",
  prerequisites: ["c2-c04"], estimatedMinutes: 85, dialogueTitle: "O que o gráfico não conta",
  intro: [
    {
      title: "O que o número mede e o que ele cala",
      body: "Um percentual é uma síntese: ele soma respostas diferentes e produz uma média que nenhuma pessoa viveu. Dizer que 62% consideram o parque seguro não informa quem se sente seguro, em que horário nem em que companhia. A entrevista não corrige esse número; ela mostra o que ele significa para grupos concretos. Quando as duas evidências são tratadas como se respondessem à mesma pergunta, a média apaga a diferença que o pesquisador precisava ver.",
      ko: "설문은 분포를 보여 주지만, 그 숫자가 어떤 경험을 뜻하는지는 면담이 설명한다.",
    },
    {
      title: "Integrar não é somar",
      body: "Integrar métodos é distribuir perguntas: o questionário responde com que frequência e em que proporção; a entrevista responde como as pessoas entendem o que respondem. A entrevista nunca confirma estatisticamente um percentual, e o percentual nunca explica o sentido de uma prática. O ganho da integração aparece quando o descompasso entre os dois vira objeto de análise, e não um defeito a esconder.",
      ko: "두 방법을 교차검증한다는 것은 같은 결론을 두 번 확인하는 일이 아니라, 서로 다른 질문에 답하게 하는 일이다.",
    },
  ],
  dialogue: [
    ["하린", "설문은 어제 마감했어요. 2,900명 가운데 1,200명이 답했으니 응답률은 41퍼센트입니다.", "O questionário fechou ontem. De 2.900 pessoas, 1.200 responderam, então a taxa de resposta é de 41%."],
    ["준호", "그 정도면 나쁘지 않네요. 그런데 '밤에도 안전하다'는 응답이 62퍼센트였다면서요?", "Com essa taxa de resposta, não está mal. Mas você disse que 62% responderam que o parque 'é seguro à noite'?"],
    ["하린", "네. 그런데 여성 응답자만 보면 밤에 혼자 걷겠다는 비율이 34퍼센트로 떨어져요.", "Sim. Só que, se olharmos apenas as mulheres, a proporção das que caminhariam sozinhas à noite cai para 34%."],
    ["준호", "제가 만난 열여덟 명도 비슷했습니다. '안전하다'는 말이 '낮에 다닌다'는 뜻인 경우가 많았어요.", "As dezoito pessoas que entrevistei disseram algo parecido. Muitas vezes 'é seguro' queria dizer 'eu só vou de dia'."],
    ["하린", "그러면 62퍼센트를 그대로 요약하면 집단 사이의 차이를 지워 버리겠네요.", "Então, se resumirmos os 62% como estão, apagamos a diferença entre os grupos."],
    ["준호", "면담은 그 차이를 설명해 주지만, 숫자를 대신하지는 못합니다. 열여덟 명으로 전체를 대표할 수는 없으니까요.", "As entrevistas explicam essa diferença, mas não substituem os números. Dezoito pessoas não podem representar o conjunto."],
    ["하린", "그래서 결론에는 '설문에 근거한 분포'와 '면담에 근거한 해석'을 나눠 쓰는 게 좋겠어요.", "Por isso, na conclusão é melhor separar a 'distribuição baseada no questionário' da 'interpretação baseada nas entrevistas'."],
    ["준호", "동의해요. 두 자료를 교차검증하되, 면담을 통계적 증거처럼 쓰지는 맙시다.", "Concordo. Vamos cruzar os dois conjuntos, sem usar as entrevistas como prova estatística."],
  ],
  readingText: {
    titlePt: "As duas noites atrás dos 62%",
    paragraphs: [
      "지난 6월, 시립공원관리센터는 '밤의 공원' 이용 실태를 조사했다. 조사팀은 만 19세 이상 시민 2,900명에게 질문지를 보냈고, 1,200명이 답했다. 응답률은 41퍼센트였다. 핵심 문항은 '밤에도 공원이 안전하다'를 다섯 단계 척도로 묻는 것이었다. 전체 응답자의 62퍼센트가 '그렇다' 또는 '매우 그렇다'를 골랐다. 그러나 같은 응답을 성별과 연령으로 나누어 분석하면 그림이 달라진다. 여성 응답자 가운데 밤에 혼자 공원을 걷겠다고 한 사람은 34퍼센트였고, 65세 이상에서는 28퍼센트로 떨어졌다. 전체 평균 62퍼센트는 이 차이를 보여 주지 않는다.",
      "조사팀은 설문과 별도로 시민 18명을 만나 심층면접을 진행했다. 면접은 한 사람당 50분에서 90분까지 이어졌다. 기록에는 숫자만으로는 잡히지 않는 설명이 남아 있었다. 20대 여성 참여자는 '안전하다고 답했지만, 밤에는 혼자 다니지 않는다'고 말했다. 그 참여자에게 안전은 공간의 상태가 아니라 동행의 유무였다. 70대 참여자는 '낮에는 산책이 유일한 운동'이라며, 밤의 안전 문제와 별개로 이용 시간이 이미 정해져 있다고 서술했다. 이 두 사례는 34퍼센트와 28퍼센트가 무엇을 뜻하는지 보여 준다. 숫자는 집단이 어떻게 나뉘는지를 알려 주고, 면접은 그 분포가 어떤 판단과 습관에서 나왔는지를 설명한다. 두 자료의 괴리는 오류가 아니라 서로 다른 질문에 대한 답이다.",
      "조사팀은 보고서에서 두 자료를 교차검증하되, 한쪽으로 다른 쪽을 대체하지 않았다. 먼저 설문에 근거한 분포를 제시하고, 이어서 면접에 근거한 해석을 별도 절로 두었다. 결론에는 '여성과 고령층의 야간 이용은 여전히 제한적이다'라는 문장과 '이용을 막는 것은 시설이 아니라 동행과 귀가 수단이다'라는 문장이 함께 들어갔다. 다만 보고서는 18명의 면접이 전체 시민을 대표하지 않는다는 점, 응답률 41퍼센트가 공원 이용에 관심이 있는 사람에게 치우쳤을 수 있다는 점을 한계로 밝혔다. 체감 안전도는 정책의 유일한 근거가 될 수 없지만, 무시할 근거도 아니다. 좋은 통합은 두 방법을 같은 방향으로 정렬하는 일이 아니라, 각 방법이 대답할 수 있는 질문의 범위를 밝히는 일이다.",
    ],
    pt: "Em junho passado, o Centro de Gestão dos Parques Municipais investigou como o parque é usado à noite. A equipe enviou um questionário a 2.900 cidadãos com 19 anos ou mais, e 1.200 responderam. A taxa de resposta foi de 41%. A pergunta central pedia que avaliassem, numa escala de cinco pontos, a afirmação 'o parque é seguro à noite'. No total, 62% dos respondentes escolheram 'concordo' ou 'concordo plenamente'. No entanto, quando as mesmas respostas são analisadas por sexo e faixa etária, o quadro muda. Entre as mulheres, 34% disseram que caminhariam sozinhas no parque à noite, e entre as pessoas de 65 anos ou mais o índice caiu para 28%. A média geral de 62% não mostra essa diferença. Além do questionário, a equipe entrevistou dezoito cidadãos em profundidade. As entrevistas duraram de 50 a 90 minutos por pessoa. Nos registros ficaram explicações que os números sozinhos não captam. Uma participante na casa dos 20 anos disse: 'Respondi que é seguro, mas não ando sozinha à noite.' Para ela, segurança não era um estado do espaço, mas a presença de alguém junto. Um participante na casa dos 70 anos relatou que 'de dia, a caminhada é o único exercício' e que, independentemente da questão da segurança noturna, seu horário de uso já estava definido. Esses dois casos mostram o que significam os 34% e os 28%. Os números informam como os grupos se dividem; as entrevistas explicam de que julgamentos e hábitos essa distribuição nasce. O descompasso entre os dois conjuntos não é um erro, mas a resposta a perguntas diferentes. No relatório, a equipe cruzou os dois conjuntos sem substituir um pelo outro. Primeiro apresentou a distribuição baseada no questionário; em seguida, colocou a interpretação baseada nas entrevistas numa seção separada. A conclusão reuniu duas frases: 'o uso noturno por mulheres e idosos continua limitado' e 'o que impede o uso não são as instalações, mas a companhia e o meio de voltar para casa'. O relatório reconheceu, porém, duas limitações: dezoito entrevistas não representam o conjunto dos cidadãos, e a taxa de resposta de 41% pode ter se inclinado para quem já se interessa pelo parque. A percepção de segurança não pode ser a única base de uma política, mas também não é algo a ignorar. Uma boa integração não alinha os dois métodos na mesma direção: ela mostra o alcance das perguntas que cada um pode responder.",
    objective: "Comparar o que os números mostram e o que as entrevistas explicam, sem transformar uma evidência na outra.",
  },
  reusedIds: ["ko:분석", "ko:근거", "ko:설문", "ko:단계"],
  grammar: [
    [
      "-에 근거한 — baseado em",
      "명사 + 에 근거한 + 명사 / 명사 + 에 근거해(서) + 동사",
      "Indica a base sobre a qual uma afirmação ou decisão se apoia. É frequente em textos acadêmicos e relatórios, e pressupõe que a base possa ser identificada. Compare com -에 기반한, mais neutro e comum para descrever estruturas, e com -을 근거로, que apresenta o elemento como instrumento de prova. Use 근거한 quando a base for um conjunto de dados, um documento ou um testemunho que sustenta o enunciado.",
      [
        ["질문지에 근거한 결론은 응답률 41퍼센트라는 한계를 안고 있다.", "A conclusão baseada no questionário carrega a limitação de uma taxa de resposta de 41%."],
        ["면접에 근거해 해석을 보완했지만, 면접 자체가 통계적 대표성을 갖지는 않는다.", "Complementamos a interpretação com base nas entrevistas, mas as entrevistas em si não têm representatividade estatística."],
      ],
    ],
    [
      "-ㄴ/는 반면(에) — enquanto; ao passo que",
      "동사 + -는 반면(에) / 형용사 + -(으)ㄴ 반면(에) / 명사 + 인 반면(에)",
      "Contrasta dois fatos do mesmo tema sem estabelecer causa entre eles. Pode ligar sujeitos diferentes ou o mesmo sujeito em aspectos distintos. Compare com -지만, que concede e sugere expectativa contrariada, e com -고, que apenas enumera. Em textos analíticos, 반면 é útil para mostrar que dois dados descrevem o mesmo objeto em direções diferentes, sem que um corrija o outro.",
      [
        ["설문에서는 62퍼센트가 안전하다고 답한 반면, 밤에 혼자 걷는 여성은 34퍼센트에 그쳤다.", "No questionário, 62% responderam que era seguro, enquanto as mulheres que caminham sozinhas à noite ficaram em 34%."],
        ["숫자는 집단의 분포를 보여 주는 반면, 그 분포의 이유는 설명하지 못한다.", "Os números mostram a distribuição dos grupos, enquanto não explicam a razão dessa distribuição."],
      ],
    ],
  ],
  guided: [
    mcq("O que a comparação entre os 62% gerais e os 34% das mulheres revela?", ["Que a média geral esconde diferenças entre grupos de usuários.", "Que o questionário foi respondido apenas por mulheres.", "Que o parque é mais seguro para mulheres do que para homens."], "Que a média geral esconde diferenças entre grupos de usuários.", "O número agregado reúne grupos com experiências distintas; separá-los mostra que o uso noturno é desigual."),
    cloze("전체 2,900명 가운데 1,200명이 답해 ___이 41퍼센트였다.", "응답률", "응답률 designa a proporção de pessoas que devolveram o questionário; aparece no primeiro parágrafo da leitura."),
    listen("Ouça e escreva o que as entrevistas explicam.", "면접은 그 분포가 어떤 판단과 습관에서 나왔는지를 설명한다.", "면접은 그 분포가 어떤 판단과 습관에서 나왔는지를 설명한다.", "As entrevistas explicam de que julgamentos e hábitos essa distribuição nasce."),
    translate("pt-ko", "Traduza: “A conclusão baseada no questionário carrega a limitação de uma taxa de resposta de 41%.”", "질문지에 근거한 결론은 응답률 41퍼센트라는 한계를 안고 있다.", "-에 근거한 liga a conclusão à sua base, e -라는 한계 indica o limite que ela carrega.", ["질문지에 근거한 결론은 응답률이 41퍼센트라는 한계를 안고 있다."]),
    reading("20대 여성 참여자는 '안전하다고 답했지만, 밤에는 혼자 다니지 않는다'고 말했다. 그 참여자에게 안전은 공간의 상태가 아니라 동행의 유무였다.", "O que a fala da participante acrescenta aos números?", ["Mostra que 'seguro' significava não andar sozinha, e não uma qualidade do espaço.", "Prova que o questionário foi mal redigido e não deveria ser usado.", "Indica que ela nunca frequenta o parque, de dia ou de noite."], "Mostra que 'seguro' significava não andar sozinha, e não uma qualidade do espaço.", "A entrevista revela o sentido que a respondente deu à palavra usada na escala, algo que o percentual não registra."),
  ],
  independent: [
    mcq("Qual formulação integra os dois métodos sem subordinar um ao outro?", ["Os números mostram como os grupos se dividem; as entrevistas explicam de que prática e de que juízo essa divisão nasce.", "As entrevistas provam estatisticamente o que o questionário já havia indicado.", "O questionário explica o sentido das falas coletadas nas entrevistas e nos grupos."], "Os números mostram como os grupos se dividem; as entrevistas explicam de que prática e de que juízo essa divisão nasce.", "Cada método responde a uma pergunta própria; a integração articula as duas respostas sem converter uma na outra."),
    cloze("젊은 층은 밤에도 공원을 찾는 ___ 고령층은 오전 이용에 집중됐다.", "반면", "-ㄴ/는 반면 contrasta dois grupos no mesmo tema."),
    listen("Ouça e escreva a frase que define uma boa integração.", "좋은 통합은 두 방법을 같은 방향으로 정렬하는 일이 아니라, 각 방법이 대답할 수 있는 질문의 범위를 밝히는 일이다.", "좋은 통합은 두 방법을 같은 방향으로 정렬하는 일이 아니라, 각 방법이 대답할 수 있는 질문의 범위를 밝히는 일이다.", "Uma boa integração não é alinhar os dois métodos na mesma direção, mas mostrar o alcance das perguntas que cada um pode responder."),
    translate("ko-pt", "Traduza: 숫자는 집단이 어떻게 나뉘는지를 알려 주고, 면접은 그 분포가 어떤 판단과 습관에서 나왔는지를 설명한다.", "Os números informam como os grupos se dividem, e as entrevistas explicam de que julgamentos e hábitos essa distribuição nasce.", "분포 = distribuição; 판단과 습관 = julgamento e hábito.", ["Os números mostram como os grupos se dividem; as entrevistas explicam de que julgamento e de que hábito nasce essa distribuição."]),
    reading("조사팀은 만 19세 이상 시민 2,900명에게 질문지를 보냈고, 1,200명이 답했다. 응답률은 41퍼센트였다.", "Por que a taxa de resposta de 41% limita a conclusão?", ["Porque quem respondeu pode se interessar mais pelo parque do que quem não respondeu.", "Porque 1.200 pessoas é um número pequeno em qualquer pesquisa.", "Porque o questionário foi aplicado apenas a idosos."], "Porque quem respondeu pode se interessar mais pelo parque do que quem não respondeu.", "A taxa baixa levanta a suspeita de autosseleção: o grupo que responde não é uma amostra neutra do conjunto."),
  ],
  summary: [
    "Um percentual agrega respostas diferentes e pode esconder a divisão entre grupos.",
    "A entrevista explica o sentido das respostas; não confirma estatisticamente um percentual.",
    "-에 근거한 identifica a base de uma afirmação; -ㄴ/는 반면 contrasta dois fatos do mesmo tema.",
    "Integrar é distribuir perguntas entre métodos, não somar conclusões parecidas.",
    "O limite de cada método deve aparecer no texto, e não apenas na nota de rodapé.",
  ],
  production: production(
    "Produção independente · um número e uma fala",
    "Escolha um número de um relatório, notícia ou pesquisa que você conheça e uma fala de entrevista sobre o mesmo tema. Escreva um parágrafo que integre os dois: diga o que o número mostra, o que a fala explica, o que nenhum dos dois permite concluir e qual é o limite de cada um.",
    "숫자 하나와 인터뷰 발언 하나를 골라, 각각 무엇을 보여 주고 무엇을 말해 주지 않는지 밝히는 문단을 써 보세요.",
    ["Apresente o número com sua base: quem respondeu, quando e com que pergunta.", "Use a fala para explicar o sentido da resposta, não para confirmar o percentual.", "Use -에 근거한 uma vez e -ㄴ/는 반면 uma vez.", "Nomeie um limite de cada fonte.", "Feche dizendo o que ainda seria preciso investigar."],
    ["Número e fala identificados com a respectiva base.", "Sentido da fala articulado ao número.", "Limite de cada fonte nomeado.", "Duas formas-alvo empregadas com função clara.", "Pergunta pendente formulada no fechamento."],
    "우리 동네 도서관은 지난해 이용자 조사를 했다. 응답자 840명 가운데 71퍼센트가 '야간 개관이 필요하다'고 답했다. 그러나 사서 다섯 명과의 면담에서는 다른 이야기가 나왔다. 야간 이용자는 하루 평균 열두 명이었고, 그중 대부분이 시험 기간의 학생이었다. 설문에 근거한 71퍼센트는 요구의 크기를 보여 주지만, 실제 이용의 빈도를 말해 주지는 않는다. 반면 면담은 누가, 언제, 왜 오는지를 설명한다. 다만 다섯 명의 면담으로 전체 이용자를 대표할 수는 없다. 나는 두 자료를 합쳐 '야간 개관에 대한 요구는 넓지만, 상시 운영보다 시험 기간 한정 운영이 현실적'이라는 결론을 냈다. 숫자는 규모를 알려 주고, 면담은 조건을 알려 준다. 아직 확인하지 못한 것은 주말 야간 이용에 대한 수요다.",
    "A biblioteca do meu bairro fez uma pesquisa com usuários no ano passado. Dos 840 respondentes, 71% disseram que 'é necessário abrir à noite'. No entanto, nas entrevistas com cinco bibliotecários apareceu outra história. O uso noturno era de doze pessoas por dia em média, e a maioria eram estudantes em período de provas. Os 71% baseados no questionário mostram o tamanho da demanda, mas não informam a frequência real de uso. As entrevistas, por outro lado, explicam quem vem, quando e por quê. Ainda assim, cinco entrevistas não representam o conjunto dos usuários. Reunindo os dois materiais, cheguei à conclusão de que 'a demanda por abertura noturna é ampla, mas, em vez de funcionamento permanente, a abertura limitada ao período de provas é mais realista'. Os números informam a escala; as entrevistas, as condições. O que ainda não pude verificar é a demanda por uso noturno nos fins de semana.",
    "Exemplo original. Observe que o número aparece com sua base, a fala explica o sentido e os dois limites são nomeados. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l22 — viés de seleção, financiamento e lacunas declaradas. */
export const C2_L22 = defineC2Lesson({
  id: "c2-l22", number: 22, moduleId: "c2-m05", title: "Vieses e lacunas",
  objective: "Avaliar viés de seleção, enquadramento e lacunas de uma fonte.",
  prerequisites: ["c2-l21"], estimatedMinutes: 85, dialogueTitle: "O relatório que a empresa pagou",
  intro: [
    {
      title: "Viés não é mentira",
      body: "Um dado pode ser verdadeiro e, ainda assim, sustentar uma conclusão estreita. O viés de seleção aparece quando o grupo estudado não representa o grupo sobre o qual se fala: quem saiu, quem nunca respondeu e quem ficou de fora do registro desaparecem do cálculo. O viés de enquadramento aparece na escolha do indicador: renda sem horas trabalhadas, média sem distribuição, satisfação sem alternativa de comparação. Nomear o mecanismo é mais útil do que discutir a intenção de quem produziu o número.",
      ko: "편향은 거짓 자료가 아니라, 어떤 자료를 넣고 어떤 자료를 빼기로 한 선택에서 생긴다.",
    },
    {
      title: "Suspeita e acusação",
      body: "Conflito de interesses não prova manipulação. Prova que a conclusão deve ser examinada com mais cuidado, porque quem financiou a pesquisa também escolheu as perguntas. A crítica responsável separa três coisas: o que o dado mostra, o que ele deixa de fora e o que só uma nova coleta poderia responder. Quando a suspeita ocupa o lugar da lacuna, a discussão vira disputa sobre motivos e o leitor continua sem saber até onde pode confiar no número.",
      ko: "이해충돌은 조작의 증거가 아니라, 결론을 더 엄격하게 검토해야 할 이유다.",
    },
  ],
  dialogue: [
    ["지현", "보고서 표지에 재원이 적혀 있네요. 조사비 전액을 한길물류가 냈습니다.", "A capa do relatório indica a fonte de financiamento. A Han-gil Logística pagou a pesquisa inteira."],
    ["태오", "그렇다고 결론이 틀렸다고 단정할 수는 없습니다. 숫자 자체는 검증할 수 있으니까요.", "Isso não permite afirmar que a conclusão está errada. Os números em si podem ser verificados."],
    ["지현", "숫자는 맞을 수 있어요. 문제는 누가 빠졌는지입니다. 지난 석 달 안에 그만둔 배달원은 표본에서 빠졌어요.", "Os números podem estar certos. O problema é quem ficou de fora. Os entregadores que saíram nos últimos três meses não estão na amostra."],
    ["태오", "그러면 남은 사람만 조사한 셈이라, 평균 소득이 실제보다 높아 보이는 맹점이 생기겠네요.", "Então pesquisaram apenas quem permaneceu, e surge um ponto cego que faz a renda média parecer maior do que é."],
    ["지현", "네. 보고서도 '최근 석 달간 주 40시간 이상 일한 배달원만 대상으로 했다'는 한계를 인정했어요.", "Sim. O próprio relatório reconhece a limitação de ter estudado apenas entregadores que trabalharam 40 horas ou mais por semana nos últimos três meses."],
    ["태오", "다만 의도적으로 은폐했다고 말하기는 어렵습니다. 방법의 공백과 속임수는 다르니까요.", "Ainda assim, é difícil dizer que houve encobrimento intencional. Uma lacuna de método e um engano são coisas diferentes."],
    ["지현", "맞아요. 그래서 동기를 추정하는 대신, 빠진 집단과 빠진 질문을 지적해야 합니다.", "Exato. Por isso, em vez de supor motivos, devemos apontar os grupos e as perguntas que faltam."],
    ["태오", "지역별 근무 시간이 빠진 것도 문제네요. 그 공백 때문에 결론의 적용 범위가 협소해집니다.", "A ausência de dados sobre jornada por região também é um problema. Por causa dessa lacuna, o alcance da conclusão fica estreito."],
  ],
  readingText: {
    titlePt: "Um número verdadeiro, uma conclusão estreita",
    paragraphs: [
      "한길물류는 지난 3월 자사 배달원의 소득 실태를 조사해 보고서를 발표했다. 조사비 전액은 회사가 부담했고, 분석은 외부 연구소에 맡겼다. 보고서에 따르면 지난해 배달원의 주당 평균 소득은 전년보다 12퍼센트 늘었다. 분석에는 최근 석 달간 주 40시간 이상 일한 배달원 1,800명의 앱 기록이 쓰였다. 회사는 이 결과를 '처우 개선의 성과'로 홍보했다. 그러나 보고서 3장에는 이 분석이 그만둔 배달원을 포함하지 않는다는 한계가 적혀 있다. 앱 기록은 계속 일한 사람의 것만 남기 때문이다.",
      "이해충돌은 조작의 증거가 아니다. 재원을 댄 회사가 결과에 유리한 질문을 고를 수 있다는 뜻이다. 실제로 이 보고서는 소득만 다루고 근무 시간은 다루지 않았다. 주당 소득이 늘어난 것이 시간을 더 일했기 때문일 수 있는데, 그 가능성은 검토되지 않았다. 지역별 차이도 빠졌다. 수도권과 지방의 운임 구조가 다르다는 점을 고려하면, 전국 평균 하나로 정책을 판단하기는 어렵다. 보고서는 원자료를 공개하지 않았고, 다른 연구자가 같은 분석을 다시 해 볼 수 있는 재현성도 확보되지 않았다. 이 공백은 회사의 의도와 별개로 존재한다.",
      "위원회는 숫자를 부정하지 않았다. 다만 그 숫자가 지지하는 결론의 범위를 좁혔다. 평균 소득 12퍼센트 증가는 '최근 석 달간 계속 일한 배달원의 앱 기록'에 한해 참이다. 그만둔 사람, 주 40시간 미만으로 일한 사람, 다른 지역에 사는 사람은 이 문장에 포함되지 않는다. 위원회는 회사에 원자료 공개와 재분석을 요구했다. 동시에 보고서가 의도적으로 사실을 은폐했다고 쓰지는 않았다. 대신 표본에서 배제된 집단과 답하지 않은 질문을 목록으로 만들었다. 비판의 목적은 동기를 심판하는 것이 아니라, 독자가 결론을 어디까지 믿을 수 있는지 알게 하는 것이다. 자료의 출처와 수집 기간을 밝히는 것만으로는 충분하지 않다. 누가 빠졌는지 밝혀야 신뢰가 생긴다.",
    ],
    pt: "Em março passado, a Han-gil Logística publicou um relatório sobre a renda de seus entregadores. A empresa pagou a pesquisa inteira e contratou um instituto externo para a análise. Segundo o relatório, a renda média semanal dos entregadores no ano anterior cresceu 12% em relação ao ano retrasado. A análise usou os registros do aplicativo de 1.800 entregadores que trabalharam 40 horas ou mais por semana nos últimos três meses. A empresa divulgou o resultado como 'conquista na melhoria das condições de trabalho'. No entanto, o capítulo 3 do relatório registra a limitação de que essa análise não inclui os entregadores que saíram. Os registros do aplicativo só permanecem para quem continuou trabalhando. Conflito de interesses não é prova de manipulação. Significa que a empresa financiadora pode escolher perguntas favoráveis ao resultado. De fato, este relatório trata da renda e não da jornada. O aumento da renda semanal pode ter vindo de mais horas trabalhadas, mas essa possibilidade não foi examinada. As diferenças regionais também ficaram de fora. Considerando que a estrutura de tarifas difere entre a região metropolitana e o interior, é difícil julgar uma política com uma única média nacional. O relatório não divulgou os dados brutos, e não garantiu a reprodutibilidade que permitiria a outro pesquisador refazer a mesma análise. Essa lacuna existe independentemente da intenção da empresa. A comissão não negou os números. Apenas estreitou o alcance da conclusão que eles sustentam. O aumento de 12% na renda média é verdadeiro apenas para 'os registros do aplicativo de entregadores que trabalharam continuamente nos últimos três meses'. Quem saiu, quem trabalhou menos de 40 horas por semana e quem mora em outra região não está nessa frase. A comissão pediu à empresa a divulgação dos dados brutos e uma nova análise. Ao mesmo tempo, não escreveu que o relatório encobriu fatos de propósito. Em vez disso, listou os grupos excluídos da amostra e as perguntas sem resposta. O objetivo da crítica não é julgar motivos, mas fazer o leitor saber até onde pode confiar na conclusão. Indicar a fonte dos dados e o período de coleta não basta. É preciso dizer quem ficou de fora para que haja confiança.",
    objective: "Avaliar como o financiamento e a seleção da amostra limitam a conclusão, sem transformar suspeita em acusação.",
  },
  reusedIds: ["ko:신뢰", "ko:출처", "ko:추정", "ko:표본"],
  grammar: [
    [
      "-다는 한계가 있다 — tem a limitação de que",
      "동사·형용사 + -다는 한계가 있다 / 명사 + (이)라는 한계가 있다",
      "Aponta o limite de um estudo, argumento ou documento citando o próprio conteúdo limitado. É uma forma avaliativa e frequente em pareceres e revisões. Compare com -에는 한계가 있다, que situa o limite no campo ou no instrumento ('na comparação há limites'), e com -ㄹ 수밖에 없다, que expressa necessidade e não restrição. A forma não acusa; ela delimita o que a conclusão pode sustentar.",
      [
        ["이 보고서는 그만둔 배달원을 표본에서 배제했다는 한계가 있다.", "Este relatório tem a limitação de ter excluído da amostra os entregadores que saíram."],
        ["앱 기록만 사용했다는 한계가 있어, 근무 시간과 소득의 관계는 확인되지 않는다.", "Há a limitação de que só se usaram registros do aplicativo; por isso, a relação entre jornada e renda não foi verificada."],
      ],
    ],
    [
      "-ㄹ 우려가 있다 — há a preocupação de que",
      "동사 + -ㄹ 우려가 있다",
      "Sinaliza uma consequência negativa possível que merece atenção antes de acontecer. É mais avaliativa que -ㄹ 가능성이 있다, que apenas calcula probabilidade, e mais branda que -ㄹ 위험이 있다, que nomeia um dano provável. Em pareceres, costuma introduzir o efeito sobre o leitor ou sobre a instituição, e não uma acusação contra quem escreveu.",
      [
        ["평균만 제시하면 독자가 소득이 고르게 올랐다고 오해할 우려가 있다.", "Se apenas a média for apresentada, há a preocupação de que o leitor entenda que a renda subiu de forma uniforme."],
        ["이해충돌을 밝히지 않으면 결론 전체가 신뢰를 잃을 우려가 있다.", "Se o conflito de interesses não for declarado, há a preocupação de que toda a conclusão perca credibilidade."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é o viés central do relatório?", ["Ele inclui apenas quem continuou trabalhando, e não quem saiu da plataforma.", "Ele foi escrito por pesquisadores sem formação.", "Ele apresenta dados de outra empresa."], "Ele inclui apenas quem continuou trabalhando, e não quem saiu da plataforma.", "A amostra é formada pelos registros de quem permaneceu; os que saíram não aparecem no cálculo da média."),
    cloze("남은 사람만 조사하면 평균이 실제보다 높아 보이는 ___이 생긴다.", "맹점", "맹점 é o ponto que o método não consegue enxergar; aparece no diálogo."),
    listen("Ouça e escreva a frase que separa conflito de interesses de manipulação.", "이해충돌은 조작의 증거가 아니라, 결론을 더 엄격하게 검토해야 할 이유다.", "이해충돌은 조작의 증거가 아니라, 결론을 더 엄격하게 검토해야 할 이유다.", "Conflito de interesses não é prova de manipulação, mas um motivo para examinar a conclusão com mais rigor."),
    translate("pt-ko", "Traduza: “O relatório tem a limitação de ter excluído da amostra os entregadores que saíram.”", "보고서는 그만둔 배달원을 표본에서 배제했다는 한계가 있다.", "-다는 한계가 있다 cita o conteúdo limitado e delimita o alcance da conclusão.", ["보고서는 그만둔 배달원을 표본에서 뺐다는 한계가 있다."]),
    reading("실제로 이 보고서는 소득만 다루고 근무 시간은 다루지 않았다. 주당 소득이 늘어난 것이 시간을 더 일했기 때문일 수 있는데, 그 가능성은 검토되지 않았다.", "Por que o aumento de 12% não sustenta sozinho a conclusão de melhora?", ["Porque o ganho semanal pode vir de mais horas trabalhadas, e o relatório não examina essa possibilidade.", "Porque o relatório foi escrito em março e não no fim do ano passado.", "Porque a empresa não tem dados de renda, jornada ou horas extras."], "Porque o ganho semanal pode vir de mais horas trabalhadas, e o relatório não examina essa possibilidade.", "Sem a jornada, o aumento da renda semanal é compatível com mais trabalho, e não necessariamente com melhora nas condições."),
  ],
  independent: [
    mcq("Qual crítica distingue lacuna de má-fé?", ["Apontar que faltam dados sobre quem saiu, sem afirmar que a empresa agiu para esconder.", "Afirmar que todo relatório financiado por empresa é falso.", "Recusar-se a ler o relatório por causa da capa."], "Apontar que faltam dados sobre quem saiu, sem afirmar que a empresa agiu para esconder.", "A crítica responsável nomeia o mecanismo e a ausência sem atribuir intenção; é isso que separa lacuna de acusação."),
    cloze("평균만 제시하면 독자가 소득이 고르게 올랐다고 오해할 ___가 있다.", "우려", "-ㄹ 우려가 있다 indica uma consequência negativa possível que merece exame."),
    listen("Ouça e escreva o que precisa ser dito para que haja confiança.", "누가 빠졌는지 밝혀야 신뢰가 생긴다.", "누가 빠졌는지 밝혀야 신뢰가 생긴다.", "É preciso dizer quem ficou de fora para que haja confiança."),
    translate("ko-pt", "Traduza: 위원회는 회사에 원자료 공개와 재분석을 요구했다. 동시에 보고서가 의도적으로 사실을 은폐했다고 쓰지는 않았다.", "A comissão pediu à empresa a divulgação dos dados brutos e uma nova análise. Ao mesmo tempo, não escreveu que o relatório encobriu fatos de propósito.", "원자료 = dados brutos; 재분석 = nova análise; 은폐하다 = encobrir.", ["A comissão exigiu da empresa os dados brutos e uma reanálise, mas não afirmou que o relatório escondeu fatos intencionalmente."]),
    reading("평균 소득 12퍼센트 증가는 '최근 석 달간 계속 일한 배달원의 앱 기록'에 한해 참이다. 그만둔 사람, 주 40시간 미만으로 일한 사람, 다른 지역에 사는 사람은 이 문장에 포함되지 않는다.", "O que a comissão exige sem acusar a empresa de manipulação?", ["A divulgação dos dados brutos e uma nova análise que inclua os grupos excluídos.", "A demissão dos responsáveis pelo relatório.", "A retirada imediata do relatório do site da empresa."], "A divulgação dos dados brutos e uma nova análise que inclua os grupos excluídos.", "A exigência é metodológica: abrir os dados e refazer a análise com quem ficou de fora, sem julgar a intenção."),
  ],
  summary: [
    "Um dado verdadeiro pode sustentar uma conclusão estreita quando a seleção ou o enquadramento a limitam.",
    "Conflito de interesses exige exame mais rigoroso; não prova manipulação.",
    "-다는 한계가 있다 delimita o alcance de uma conclusão citando o próprio limite.",
    "-ㄹ 우려가 있다 aponta uma consequência negativa possível, sem acusar.",
    "A crítica responsável nomeia o grupo excluído e a pergunta sem resposta, não o motivo suposto.",
  ],
  production: production(
    "Produção independente · nota de leitura com dois vieses",
    "Escolha um relatório, notícia ou estudo com número e conclusão fortes. Escreva uma nota de leitura que identifique dois vieses — de seleção, de enquadramento ou de financiamento — e uma lacuna que a fonte não responde. Termine dizendo o que a conclusão permite afirmar e o que não permite.",
    "보고서나 기사에서 편향 두 가지와 답하지 않은 질문 하나를 찾아, 결론의 범위를 정리해 보세요.",
    ["Resuma a conclusão em uma frase, antes de criticá-la.", "Descreva cada viés pelo mecanismo: quem ficou de fora, qual indicador foi escolhido.", "Não atribua intenção sem prova; use formulações como -다는 한계가 있다.", "Nomeie uma pergunta que a fonte não responde.", "Feche delimitando o que a conclusão ainda sustenta."],
    ["Conclusão resumida antes da crítica.", "Dois vieses descritos por mecanismo.", "Uma lacuna nomeada com precisão.", "Intenção não atribuída sem prova.", "Alcance final da conclusão delimitado."],
    "지역 신문은 한 아파트 단지의 재건축 찬성률이 78퍼센트라고 보도했다. 조사는 조합이 의뢰했고, 응답자는 전체 소유자 1,100명 가운데 420명이었다. 두 가지 편향이 보인다. 첫째, 응답률이 38퍼센트에 그쳐 응답하지 않은 680명의 의견이 빠졌다. 둘째, 조사가 재건축을 검토하는 사람들의 모임에서 먼저 배포되었다. 이 두 가지는 찬성 쪽으로 기울었을 가능성을 만든다. 다만 조합이 결과를 조작했다고 단정할 수는 없다. 확인되지 않은 것은 세입자의 의견이다. 이 조사에는 세입자가 아예 포함되지 않았다. 따라서 78퍼센트는 '소유자 가운데 응답한 사람의 78퍼센트'까지만 뜻한다. 나는 이 문장을 '응답자 420명 중 78퍼센트가 찬성했으며, 미응답자와 세입자의 의견은 확인되지 않았다'로 고쳐야 한다고 본다.",
    "O jornal local noticiou que 78% dos moradores de um condomínio eram favoráveis à reconstrução. A pesquisa foi encomendada pela associação de moradores, e os respondentes foram 420 dos 1.100 proprietários. Dois vieses aparecem. Primeiro, a taxa de resposta ficou em 38%, deixando de fora a opinião dos 680 que não responderam. Segundo, o questionário foi distribuído primeiro num grupo de pessoas que já discutiam a reconstrução. Esses dois fatores criam a possibilidade de uma inclinação favorável. Ainda assim, não se pode afirmar que a associação manipulou o resultado. O que não foi verificado é a opinião dos inquilinos. Eles não foram incluídos na pesquisa. Portanto, os 78% significam apenas '78% dos proprietários que responderam'. Considero que a frase deveria ser corrigida para: 'Dos 420 respondentes, 78% foram favoráveis; a opinião dos não respondentes e dos inquilinos não foi verificada.'",
    "Exemplo original. Observe que os vieses são descritos por mecanismo e que o texto evita atribuir intenção. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l23 — integrar posições incompatíveis sem forçar consenso. */
export const C2_L23 = defineC2Lesson({
  id: "c2-l23", number: 23, moduleId: "c2-m05", title: "Perspectivas em conflito",
  objective: "Integrar perspectivas conflitantes sem reduzir uma delas a erro.",
  prerequisites: ["c2-l22"], estimatedMinutes: 85, dialogueTitle: "A rua de que duas pessoas precisam",
  intro: [
    {
      title: "Valores, não erros",
      body: "Duas pessoas podem descrever os mesmos fatos e chegar a conclusões opostas porque ordenam os valores de outra maneira. Uma coloca a continuidade do sustento em primeiro lugar; a outra, a segurança do deslocamento. Tratar a diferença como falta de informação ou como egoísmo parece uma explicação, mas é uma forma de não ouvir. Enquanto o desacordo de valor não é nomeado, cada lado passa a impressão de que o outro está sendo teimoso por má vontade.",
      ko: "입장이 다른 이유가 사실을 몰라서가 아니라, 무엇을 더 중요하게 여기는지가 달라서일 수 있다.",
    },
    {
      title: "O que não se reconcilia",
      body: "Uma síntese honesta separa o que pode ser acordado do que permanece incompatível. O acordo parcial não é uma versão menor do consenso: ele registra os pontos em que as partes conseguiram conviver e nomeia o ponto em que não conseguiram. Quando o mediador apressa uma solução para encerrar o desconforto, um dos lados sai da mesa sem que sua demanda tenha sequer entrado no texto. A clareza sobre o limite é o que mantém a conversa possível depois da reunião.",
      ko: "합의할 수 있는 부분과 양립하기 어려운 부분을 나누어야 중재가 정직해진다.",
    },
  ],
  dialogue: [
    ["진행자", "오늘은 장미시장 앞 도로를 보행자 거리로 바꾸는 안을 놓고 이야기하겠습니다.", "Hoje vamos discutir a proposta de transformar a rua em frente ao Mercado Jangmi em calçadão."],
    ["명숙", "저희는 반대가 아닙니다. 다만 새벽 배송 차량이 들어올 수 있어야 합니다.", "Não somos contra. Só é preciso que os veículos de entrega da madrugada possam entrar."],
    ["현우", "주민 입장에서는 오전부터 차가 없어야 아이들이 안전합니다.", "Do ponto de vista dos moradores, é preciso que não haja carros desde a manhã para as crianças ficarem seguras."],
    ["명숙", "새벽 다섯 시부터 일곱 시까지만 허용하면 어떨까요?", "Que tal permitir só das cinco às sete da manhã?"],
    ["현우", "그 시간에 등교가 시작됩니다. 저희가 우려하는 것은 바로 그 시간대입니다.", "Nesse horário começa a entrada na escola. É exatamente essa faixa de horário que nos preocupa."],
    ["진행자", "두 요구가 같은 시간대에 걸쳐 있네요. 사실 확인과 가치 판단을 나눠 볼까요?", "As duas demandas se sobrepõem no mesmo horário. Vamos separar a verificação dos fatos do julgamento de valor?"],
    ["명숙", "차량 통행은 생계 문제이고, 보행 안전은 생활 문제입니다. 두 요구는 같은 30분을 두고 경합합니다.", "O trânsito de veículos é uma questão de sustento, e a segurança do pedestre, uma questão de vida cotidiana. As duas demandas disputam os mesmos trinta minutos."],
    ["현우", "그렇다면 완전한 합의는 어렵습니다. 양립하기 어려운 부분을 먼저 정리합시다.", "Então um acordo completo é difícil. Vamos primeiro registrar o ponto que é difícil de conciliar."],
  ],
  readingText: {
    titlePt: "Duas pessoas, uma mesma calçada",
    paragraphs: [
      "명숙 씨는 장미시장에서 28년째 채소를 판다. 명숙 씨가 새벽 배송을 고집하는 이유는 단순하다. 채소는 새벽 네 시에 도착하고, 다섯 시부터 손질해야 여덟 시에 문을 열 수 있다. 차량이 들어오지 못하면 손질할 공간도, 쓰레기를 내보낼 길도 없다. 명숙 씨는 '아이들이 안전한 거리를 반대하는 게 아니다'라고 말한다. 다만 보행자 거리가 되면 자기 가게의 영업 시간이 두 시간 줄어든다고 본다. 명숙 씨에게 이 거리는 산책로가 아니라 일터다.",
      "현우 씨는 같은 골목에서 십 년째 살고 있다. 그의 아이는 오전 일곱 시 이십 분에 집을 나선다. 그 시간에는 배송 차량과 학원 차량이 한꺼번에 몰린다. 그는 '차를 모두 막자는 것이 아니라, 등교 시간만큼은 비워 달라'고 주장한다. 그의 관점에서 이 거리는 아이가 혼자 걸어야 하는 통로다. 명숙 씨가 제안한 오전 다섯 시에서 일곱 시까지의 허용은, 그의 기준으로는 가장 위험한 시간과 정확히 겹친다.",
      "두 진술은 사실관계에서 크게 어긋나지 않는다. 배송 시간과 등교 시간이 겹친다는 점, 차량이 생계와 안전에 동시에 영향을 준다는 점을 둘 다 인정한다. 갈등은 시간대보다 우선순위에 있다. 한쪽은 생계의 연속성을, 다른 쪽은 이동의 안전을 먼저 놓는다. 이 차이를 한쪽의 무지나 이기심으로 환원하면 대화는 끝난다. 그렇다고 합의를 서둘러 봉합하면, 두 요구 가운데 하나는 이름 없이 사라진다. 이 사안은 이해관계가 첨예한 전형적인 딜레마다. 회의는 세 시간 넘게 이어졌고, 두 입장은 끝까지 팽팽하게 맞섰다. 중재자는 형평의 원칙을 먼저 세웠다. 어느 쪽도 일방적으로 손실을 떠안아서는 안 된다는 뜻이었다. 가능한 부분은 오전 일곱 시 이후의 통행 제한과 오후 배송 창구 마련이다. 양립하기 어려운 부분은 새벽 다섯 시에서 일곱 시 사이의 통행이다. 좋은 중재는 평행선을 감추지 않고, 어디까지가 합의이고 어디부터가 남은 문제인지 밝힌다.",
    ],
    pt: "Myeongsuk vende verduras no Mercado Jangmi há 28 anos. O motivo de ela insistir na entrega de madrugada é simples. As verduras chegam às quatro da manhã, e é preciso prepará-las a partir das cinco para abrir às oito. Se os veículos não entram, não há espaço para o preparo nem caminho para tirar o lixo. Ela diz que 'não é contra uma rua segura para as crianças'. Apenas considera que, se a rua virar calçadão, o horário de funcionamento da loja diminui duas horas. Para ela, essa rua não é local de passeio, é local de trabalho. Hyeonwoo mora no mesmo beco há dez anos. O filho dele sai de casa às sete e vinte da manhã. Nesse horário, veículos de entrega e vans escolares se acumulam ao mesmo tempo. Ele defende que 'não se trata de bloquear todos os carros, mas de liberar o horário de entrada na escola'. Do ponto de vista dele, essa rua é a passagem que a criança precisa fazer sozinha. A proposta de Myeongsuk, de permitir das cinco às sete da manhã, coincide exatamente com o horário que ele considera mais perigoso. Os dois depoimentos não divergem muito nos fatos. Ambos reconhecem que os horários de entrega e de entrada na escola se sobrepõem e que os veículos afetam ao mesmo tempo o sustento e a segurança. O conflito está mais na prioridade do que no horário. Um lado coloca primeiro a continuidade do sustento; o outro, a segurança do deslocamento. Reduzir essa diferença à ignorância ou ao egoísmo de um dos lados encerra a conversa. Mas apressar um acordo para tapar o conflito faz uma das demandas desaparecer sem nome. Este caso é um dilema típico, com interesses acirrados. A reunião durou mais de três horas, e as duas posições se mantiveram tensas até o fim, sem cedência. A mediadora estabeleceu primeiro o princípio da equidade: nenhum dos lados deveria arcar sozinho com a perda. A parte possível é restringir a circulação depois das sete da manhã e criar um ponto de entrega à tarde. A parte difícil de conciliar é a circulação entre cinco e sete da manhã. Uma boa mediação não esconde o impasse: ela indica até onde há acordo e a partir de onde o problema permanece.",
    objective: "Reconhecer por que as posições não se reconciliam facilmente e nomear o desacordo irredutível.",
  },
  reusedIds: ["ko:관점", "ko:주장", "ko:사실관계", "ko:손실"],
  grammar: [
    [
      "-ㄴ/는 동시에 — ao mesmo tempo que",
      "동사 + -는 동시에 / 형용사 + -(으)ㄴ 동시에 / 명사 + 인 동시에",
      "Sinaliza que dois efeitos ou duas ações ocorrem juntos, muitas vezes com direções opostas. Em textos analíticos, é útil para mostrar que uma medida produz ganhos e perdas no mesmo movimento. Compare com -면서, que descreve ações simultâneas do mesmo sujeito e é mais coloquial, e com -ㄴ/는 한편, que acrescenta um aspecto contrastante sem exigir simultaneidade estrita.",
      [
        ["보행자 거리는 아이들의 안전을 높이는 동시에 상인의 생계를 위협할 수 있다.", "Um calçadão pode aumentar a segurança das crianças e, ao mesmo tempo, ameaçar o sustento dos comerciantes."],
        ["두 진술은 서로를 반박하는 동시에 같은 사실을 인정하고 있다.", "Os dois depoimentos se refutam ao mesmo tempo que reconhecem o mesmo fato."],
      ],
    ],
    [
      "-ㄴ/는 한편(으로) — por outro lado",
      "동사 + -는 한편(으로) / 형용사 + -(으)ㄴ 한편(으로)",
      "Acrescenta um segundo aspecto que contrasta com o primeiro, sem afirmar que os dois ocorrem no mesmo instante. É comum em textos institucionais que descrevem medidas paralelas. Compare com -ㄴ/는 반면, que destaca o contraste entre dois fatos, e com -고도, que enfatiza a acumulação. Use 한편 quando quiser registrar que uma parte fez algo enquanto outra dimensão ficou pendente.",
      [
        ["주민은 차량 통행을 줄이자고 요구하는 한편, 새벽 배송 문제에는 답을 미뤘다.", "Os moradores exigem a redução do trânsito de veículos e, por outro lado, adiaram a resposta sobre a entrega de madrugada."],
        ["시는 보행 환경을 개선하는 한편, 상인과의 협의를 병행하겠다고 밝혔다.", "A prefeitura afirmou que vai melhorar o ambiente para pedestres e, paralelamente, manter a negociação com os comerciantes."],
      ],
    ],
  ],
  guided: [
    mcq("O que separa as duas posições?", ["A prioridade entre manter o sustento e garantir a segurança no horário de entrada.", "A discordância sobre o horário em que as verduras chegam ao mercado.", "O fato de uma das partes não conhecer o projeto."], "A prioridade entre manter o sustento e garantir a segurança no horário de entrada.", "Os dois reconhecem os mesmos fatos; o desacordo está na ordem de importância dos valores."),
    cloze("두 요구는 같은 30분을 두고 ___한다.", "경합", "경합하다 indica que duas demandas disputam o mesmo recurso; aparece no diálogo e na leitura."),
    listen("Ouça e escreva o que uma boa mediação não faz.", "좋은 중재는 평행선을 감추지 않고, 어디까지가 합의이고 어디부터가 남은 문제인지 밝힌다.", "좋은 중재는 평행선을 감추지 않고, 어디까지가 합의이고 어디부터가 남은 문제인지 밝힌다.", "Uma boa mediação não esconde o impasse: ela indica até onde há acordo e a partir de onde o problema permanece."),
    translate("pt-ko", "Traduza: “É difícil conciliar a entrega de madrugada com a segurança no horário de entrada.”", "새벽 배송과 등교 시간의 안전은 양립하기 어렵다.", "양립하다 descreve a compatibilidade entre duas exigências; a forma negativa é a mais frequente.", ["새벽 배송과 등교 안전은 양립하기 어렵다."]),
    reading("이 차이를 한쪽의 무지나 이기심으로 환원하면 대화는 끝난다. 그렇다고 합의를 서둘러 봉합하면, 두 요구 가운데 하나는 이름 없이 사라진다.", "Por que apressar o acordo pode apagar uma das demandas?", ["Porque o acordo fechado sem nomear o desacordo faz uma das posições sair do texto sem ser tratada.", "Porque os comerciantes não querem nenhum acordo com a prefeitura.", "Porque a prefeitura já decidiu o projeto sem consultar ninguém."], "Porque o acordo fechado sem nomear o desacordo faz uma das posições sair do texto sem ser tratada.", "O texto opõe duas saídas ruins: reduzir o outro a erro ou fechar um acordo que esconde o conflito."),
  ],
  independent: [
    mcq("Qual síntese preserva o desacordo em vez de dissolvê-lo?", ["As partes concordam com o fechamento da rua após as sete, mas não chegaram a um acordo sobre a circulação entre cinco e sete.", "Todos concordam que a segurança das crianças é o valor mais importante.", "Os comerciantes aceitaram a proposta dos moradores e encerraram o assunto."], "As partes concordam com o fechamento da rua após as sete, mas não chegaram a um acordo sobre a circulação entre cinco e sete.", "A síntese registra o acordo parcial e nomeia o ponto que permanece incompatível, sem fingir consenso."),
    cloze("갈등을 한쪽의 무지로 ___하면 대화가 끝난다.", "환원", "환원하다 reduz uma questão complexa a uma única causa; aqui, a uma suposta ignorância."),
    listen("Ouça e escreva como o texto classifica o caso.", "이 사안은 이해관계가 첨예한 전형적인 딜레마다.", "이 사안은 이해관계가 첨예한 전형적인 딜레마다.", "Este caso é um dilema típico, com interesses acirrados."),
    translate("ko-pt", "Traduza: 갈등은 시간대보다 우선순위에 있다. 한쪽은 생계의 연속성을, 다른 쪽은 이동의 안전을 먼저 놓는다.", "O conflito está mais na prioridade do que no horário. Um lado coloca primeiro a continuidade do sustento; o outro, a segurança do deslocamento.", "우선순위 = ordem de prioridade; 생계의 연속성 = continuidade do sustento.", ["O conflito está menos no horário e mais na prioridade: um lado põe à frente a continuidade do sustento, o outro a segurança do deslocamento."]),
    reading("그의 관점에서 이 거리는 아이가 혼자 걸어야 하는 통로다. 명숙 씨가 제안한 오전 다섯 시에서 일곱 시까지의 허용은, 그의 기준으로는 가장 위험한 시간과 정확히 겹친다.", "O que a proposta das cinco às sete significa para o morador?", ["Ela libera exatamente o horário que ele considera mais perigoso para a entrada na escola.", "Ela resolve o problema porque os carros passam antes das sete.", "Ela foi feita pelos moradores, e não pelos comerciantes."], "Ela libera exatamente o horário que ele considera mais perigoso para a entrada na escola.", "A mesma faixa de horário é a solução para um lado e o problema para o outro; é isso que torna o desacordo irredutível."),
  ],
  summary: [
    "Posições opostas podem partir dos mesmos fatos e de hierarquias de valor diferentes.",
    "Reduzir o outro à ignorância ou ao egoísmo encerra a conversa antes do desacordo real.",
    "-ㄴ/는 동시에 mostra efeitos simultâneos; -ㄴ/는 한편 acrescenta um aspecto contrastante.",
    "Uma síntese honesta registra o acordo parcial e nomeia o que permanece incompatível.",
    "Apressar o acordo para aliviar o desconforto pode apagar uma demanda sem que ela seja tratada.",
  ],
  production: production(
    "Produção independente · duas posições, um limite",
    "Pense em um conflito local concreto: uma obra, uma mudança de horário, uma regra de condomínio. Apresente as duas posições com os valores que as sustentam, mostre onde elas se sobrepõem nos fatos, diga o que pode ser acordado e nomeie o ponto que permanece incompatível.",
    "지역 갈등을 하나 골라 두 입장의 가치를 정리하고, 합의 가능한 부분과 양립하기 어려운 부분을 나누어 써 보세요.",
    ["Descreva as duas posições sem já classificá-las como certas ou erradas.", "Mostre o fato que ambas reconhecem.", "Nomeie o valor que cada lado coloca em primeiro lugar.", "Use -ㄴ/는 동시에 uma vez e -ㄴ/는 한편 uma vez.", "Feche com o acordo parcial e o ponto que permanece aberto."],
    ["Duas posições apresentadas com seus valores.", "Fato comum reconhecido.", "Acordo parcial explicitado.", "Desacordo irredutível nomeado.", "Duas formas-alvo usadas com função clara."],
    "우리 아파트 단지에는 주차 문제로 두 입장이 맞서고 있다. 한쪽은 방문 차량을 완전히 막자고 하고, 다른 쪽은 저녁 시간에만 허용하자고 한다. 두 입장은 사실을 다르게 보지 않는다. 모두 저녁 일곱 시 이후 주차장이 가득 찬다는 점을 인정한다. 갈등은 무엇을 먼저 보호할지에 있다. 한쪽은 보행 안전을, 다른 쪽은 돌봄과 배송의 편의를 먼저 놓는다. 주차를 막는 것은 아이들의 통학로를 비우는 동시에, 저녁에 약을 받아야 하는 이웃의 길을 막을 수 있다. 주민회는 저녁 여덟 시 이후의 통행을 제한하는 한편, 돌봄 차량에는 예외를 두기로 했다. 양립하기 어려운 부분은 오후 여섯 시에서 여덟 시 사이의 일반 방문 차량이다. 나는 이 부분을 숨기지 않고 다음 회의 안건으로 남겨 두는 것이 정직하다고 본다.",
    "No nosso condomínio, duas posições se confrontam por causa do estacionamento. Um lado quer proibir totalmente os veículos de visita; o outro quer permiti-los apenas à noite. As duas posições não veem os fatos de forma diferente. Todos reconhecem que, depois das sete da noite, o estacionamento fica cheio. O conflito está em o que proteger primeiro. Um lado coloca à frente a segurança dos pedestres; o outro, a conveniência do cuidado e das entregas. Bloquear o estacionamento libera o caminho das crianças para a escola e, ao mesmo tempo, pode fechar o caminho de um vizinho que precisa receber remédio à noite. A associação de moradores decidiu restringir a circulação depois das oito da noite e, por outro lado, abrir exceção para veículos de cuidado. A parte difícil de conciliar é a dos veículos de visita comuns entre as seis e as oito da noite. Considero honesto não esconder essa parte e deixá-la como pauta da próxima reunião.",
    "Exemplo original. Observe que as duas posições aparecem com seus valores e que o fechamento nomeia o ponto ainda incompatível. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l24 — organizar a revisão de literatura por debates. */
export const C2_L24 = defineC2Lesson({
  id: "c2-l24", number: 24, moduleId: "c2-m05", title: "Revisão de literatura",
  objective: "Organizar uma revisão de literatura por debates, não por lista de autores.",
  prerequisites: ["c2-l23"], estimatedMinutes: 85, dialogueTitle: "Por debate, não por lista",
  intro: [
    {
      title: "A lista não é uma revisão",
      body: "Uma sequência de resumos, um autor por parágrafo, parece demonstrar leitura, mas não mostra o que a área discute. O leitor termina sabendo quem escreveu e continua sem saber qual pergunta está em jogo. A revisão por debates começa pelo desacordo e distribui os estudos conforme a resposta que oferecem. Assim, cada fonte ganha uma função: sustentar uma posição, complicá-la ou abrir uma pergunta que ninguém respondeu ainda.",
      ko: "선행연구를 나열하는 대신, 무엇이 논쟁의 대상인지 먼저 밝혀야 한다.",
    },
    {
      title: "Atribuir e situar",
      body: "Organizar por debate não dispensa a atribuição; ela se torna mais exigente. Não basta dizer que um estudo tratou do tema: é preciso dizer o que ele acrescentou à controvérsia e em que ponto ficou aquém. O histórico da pesquisa pode ficar curto, desde que o leitor veja a mudança das perguntas ao longo do tempo. A genealogia das ideias, quando não cabe no corpo do texto, vai para a nota, e não desaparece.",
      ko: "각 연구가 무엇을 밝혔는지보다, 그 연구가 논쟁에 어떻게 기여했는지가 중요하다.",
    },
  ],
  dialogue: [
    ["유나", "교수님, 선행연구 스물두 편을 다 읽었는데 정리가 안 됩니다.", "Professor, li os vinte e dois estudos anteriores, mas não consigo organizar."],
    ["성호", "지금 초고는 논문 한 편씩 요약한 목록에 가깝네요. 독자는 무엇이 쟁점인지 알 수 없습니다.", "O rascunho atual está mais para uma lista de resumos artigo por artigo. O leitor não consegue saber o que está em disputa."],
    ["유나", "쟁점이 두 개로 보입니다. 사용 시간이 수면을 줄이는지, 아니면 수면 부족이 사용을 늘리는지요.", "Vejo dois pontos em disputa. Se o tempo de uso reduz o sono, ou se a falta de sono aumenta o uso."],
    ["성호", "좋습니다. 두 번째 쟁점에는 학교에서 기기를 압수하는 정책이 효과가 있는지도 붙어 있죠.", "Bom. Ao segundo ponto se junta também a questão de se a política de confiscar aparelhos na escola tem efeito."],
    ["유나", "그러면 절을 나눠서 각 논쟁에 어떤 연구가 기여했는지 쓰면 되겠네요.", "Então posso dividir em seções e escrever como cada estudo contribuiu para cada debate."],
    ["성호", "네. 다만 연구사가 길어지면 독자가 지칩니다. 동향은 두 문단으로 조망하고, 계보는 각주로 빼세요.", "Sim. Só que, se o histórico da pesquisa ficar longo, o leitor se cansa. Apresente a tendência em dois parágrafos e mande a genealogia para as notas."],
    ["유나", "특정 사조에 속한 연구가 과대평가된 점도 짚어야 할까요?", "Devo também apontar que estudos de uma certa corrente foram supervalorizados?"],
    ["성호", "그건 마지막 절에서 다루세요. 대신 특정 저자를 공격하는 방식이 아니라, 방법의 한계로 설명해야 합니다.", "Trate disso na última seção. Mas explique pela limitação do método, não atacando um autor específico."],
  ],
  readingText: {
    titlePt: "Dois debates, vinte e dois estudos",
    paragraphs: [
      "청소년의 스마트폰 사용과 수면에 관한 연구는 두 갈래로 나뉜다. 첫 번째 갈래는 사용 시간이 수면 시간을 줄인다고 본다. 2019년에 발표된 한 패널 연구는 중학생 2,400명을 3년간 추적해, 취침 전 사용이 30분 이상 늘어난 집단에서 수면 시간이 평균 22분 줄었다고 보고했다. 두 번째 갈래는 인과의 방향을 반대로 본다. 수면이 부족한 학생이 오히려 기기를 더 오래 들여다본다는 것이다. 2021년의 일기 연구는 불면 증상이 심한 날에 사용 시간이 늘어난다는 결과를 내놓았다. 두 연구는 같은 현상을 다르게 설명하며, 어느 쪽도 상대를 완전히 반박하지 못했다.",
      "두 번째 쟁점은 학교의 기기 사용 제한이다. 제한이 수면을 개선했다는 연구가 있는가 하면, 효과가 없거나 오히려 학생과 교사 사이의 신뢰를 낮췄다는 연구도 있다. 이 논쟁은 연구 방법의 차이와 함께, 청소년을 보호 대상으로만 보는 사조와 행위자로 보는 사조의 차이를 반영한다. 최근에는 두 사조가 겹치는 지점이 부각되었다. 제한의 효과보다 제한이 어떻게 운영되는지가 더 중요하다는 주장이다.",
      "선행연구를 논문 한 편씩 요약하면 이 두 쟁점이 보이지 않는다. 연구사는 두 문단으로 조망하고, 각 연구의 계보는 각주로 처리하는 편이 낫다. 본고에서 정리한 바에 따르면, 갈등의 핵심은 기기의 양이 아니라 수면을 둘러싼 책임의 소재다. 학교는 학생의 수면을 관리할 책임이 있는가, 아니면 학생이 스스로 조절할 능력을 길러야 하는가. 이 질문에 답하지 않으면, 어떤 연구 결과를 모아도 정책은 흔들린다. 각 연구의 신뢰성은 표본과 측정 방식으로 판단해야 한다. 좋은 문헌 검토는 연구를 많이 인용하는 일이 아니라, 각 연구가 이 질문에 어떻게 기여했는지를 밝히는 일이다. 다만 이 검토도 영어 학술지에 실린 연구에 치우쳤다는 한계가 있다.",
    ],
    pt: "As pesquisas sobre uso de smartphone e sono entre adolescentes se dividem em dois ramos. O primeiro ramo considera que o tempo de uso reduz o tempo de sono. Um estudo de painel publicado em 2019 acompanhou 2.400 estudantes do ensino fundamental II por três anos e relatou que, no grupo em que o uso antes de dormir aumentou mais de 30 minutos, o sono diminuiu em média 22 minutos. O segundo ramo vê a direção da causalidade ao contrário: seriam os estudantes com sono insuficiente que ficariam mais tempo com os aparelhos. Um estudo de diário de 2021 apresentou o resultado de que, em dias com sintomas de insônia mais fortes, o tempo de uso aumentava. Os dois estudos explicam o mesmo fenômeno de formas diferentes, e nenhum refutou completamente o outro. O segundo ponto em disputa é a restrição do uso de aparelhos na escola. Há estudos de que a restrição melhorou o sono e estudos de que ela não teve efeito ou até reduziu a confiança entre alunos e professores. Esse debate reflete, junto com diferenças de método, a diferença entre uma corrente que vê o adolescente apenas como alvo de proteção e outra que o vê como agente. Recentemente ganhou destaque o ponto em que as duas correntes se cruzam: mais importante do que o efeito da restrição é como ela é aplicada. Resumir os estudos anteriores artigo por artigo não mostra esses dois pontos em disputa. É melhor apresentar o histórico da pesquisa em dois parágrafos e tratar a genealogia de cada estudo nas notas. Segundo o que este texto organiza, o núcleo do conflito não é a quantidade de aparelhos, mas a quem cabe a responsabilidade pelo sono. A escola tem a responsabilidade de administrar o sono dos alunos, ou os alunos devem desenvolver a capacidade de regular a si mesmos? Sem responder a essa pergunta, qualquer conjunto de resultados deixa a política oscilando. A confiabilidade de cada estudo deve ser julgada pelo tamanho da amostra e pelo método de medição. Uma boa revisão de literatura não é citar muitos estudos, mas mostrar como cada estudo contribuiu para essa pergunta. Esta revisão também tem a limitação de se inclinar para pesquisas publicadas em revistas em inglês.",
    objective: "Reconhecer o debate que organiza cada seção e a contribuição de cada fonte.",
  },
  reusedIds: ["ko:연구", "ko:신뢰성", "ko:과대평가", "ko:학술지"],
  grammar: [
    [
      "-ㄴ/는 바 — o que; o fato",
      "동사 + -ㄴ/는 바 / 형용사 + -(으)ㄴ 바",
      "Retoma um conteúdo já apresentado e o apresenta como base de uma afirmação seguinte. É formal e típico de artigos, pareceres e relatórios. Aparece em fórmulas como 밝힌 바에 따르면 ('segundo o que foi exposto') e 정리한 바와 같이 ('conforme o que foi organizado'). Compare com -ㄴ/는 내용, mais neutro, e com -ㄴ/는 점, que destaca um aspecto. Não use 바 para introduzir informação nova: ele pressupõe que o conteúdo já foi dito ou será detalhado em seguida.",
      [
        ["선행연구가 밝힌 바에 따르면, 수면 시간과 사용 시간의 관계는 일방적이지 않다.", "Segundo o que os estudos anteriores mostraram, a relação entre tempo de sono e tempo de uso não é unilateral."],
        ["본고에서 정리한 바는 다음 세 가지다.", "O que este texto organiza é o seguinte, em três pontos."],
      ],
    ],
    [
      "-ㄹ 뿐더러 — não só, mas também",
      "동사·형용사 + -ㄹ 뿐더러",
      "Acrescenta uma segunda razão ou característica que reforça a primeira, com peso igual ou maior. A primeira parte precisa ser verdadeira por si só; a forma não substitui uma negação. Compare com -고, que apenas soma informações, e com -ㄴ/는 데다가, que é mais oral e enfatiza o acúmulo. Em textos acadêmicos, -ㄹ 뿐더러 costuma introduzir uma limitação que torna o problema mais grave.",
      [
        ["이 연구는 표본이 작을 뿐더러 지역도 한정되어 있다.", "Este estudo não só tem uma amostra pequena, mas também se limita a uma região."],
        ["기기 제한은 효과가 불분명할 뿐더러 학생과 교사 사이의 신뢰도 훼손한다.", "A restrição de aparelhos não só tem efeito incerto, mas também abala a confiança entre alunos e professores."],
      ],
    ],
  ],
  guided: [
    mcq("Como uma revisão organizada por debates difere de uma lista de autores?", ["Ela mostra o que está em disputa e situa a contribuição de cada estudo nesse debate.", "Ela cita um número maior de autores por parágrafo.", "Ela dispensa a atribuição das ideias."], "Ela mostra o que está em disputa e situa a contribuição de cada estudo nesse debate.", "A revisão por debate começa pela controvérsia e distribui os estudos conforme a resposta que oferecem."),
    cloze("동향은 두 문단으로 ___하고, 계보는 각주로 빼세요.", "조망", "조망하다 significa apresentar o conjunto de um campo; aparece no diálogo."),
    listen("Ouça e escreva o que uma boa revisão de literatura mostra.", "좋은 문헌 검토는 연구를 많이 인용하는 일이 아니라, 각 연구가 이 질문에 어떻게 기여했는지를 밝히는 일이다.", "좋은 문헌 검토는 연구를 많이 인용하는 일이 아니라, 각 연구가 이 질문에 어떻게 기여했는지를 밝히는 일이다.", "Uma boa revisão de literatura não é citar muitos estudos, mas mostrar como cada estudo contribuiu para essa pergunta."),
    translate("pt-ko", "Traduza: “A revisão deve mostrar o que está em disputa, e não apenas quem escreveu.”", "문헌 검토는 누가 썼는지가 아니라 무엇이 쟁점인지를 보여 주어야 한다.", "A estrutura contrastiva -가 아니라 ... -를 보여 주어야 한다 mantém o foco no debate.", ["문헌 검토는 누가 썼는지보다 무엇이 쟁점인지를 보여 주어야 한다."]),
    reading("2019년에 발표된 한 패널 연구는 중학생 2,400명을 3년간 추적해, 취침 전 사용이 30분 이상 늘어난 집단에서 수면 시간이 평균 22분 줄었다고 보고했다. 2021년의 일기 연구는 불면 증상이 심한 날에 사용 시간이 늘어난다는 결과를 내놓았다.", "O que os dois estudos permitem concluir?", ["Que a relação entre uso e sono admite mais de uma direção causal, e nenhum dos estudos encerra o debate.", "Que o estudo de 2021 refutou completamente o de 2019.", "Que o tempo de uso não tem nenhuma relação com a qualidade do sono."], "Que a relação entre uso e sono admite mais de uma direção causal, e nenhum dos estudos encerra o debate.", "Os desenhos apontam em direções opostas; o texto mantém os dois como posições em disputa."),
  ],
  independent: [
    mcq("Qual é o risco de organizar a revisão por autor?", ["O leitor vê resumos, mas não entende qual pergunta cada estudo tenta responder.", "O texto fica curto demais para uma revista acadêmica.", "A revisão passa a exigir mais notas de rodapé."], "O leitor vê resumos, mas não entende qual pergunta cada estudo tenta responder.", "Sem a pergunta que organiza, a sequência de resumos não mostra o debate nem a contribuição de cada fonte."),
    cloze("각 연구가 논쟁에 어떻게 ___했는지 밝혀야 한다.", "기여", "기여하다 indica o que cada estudo acrescenta ao debate; aparece na conclusão da leitura."),
    listen("Ouça e escreva o que os dois estudos não conseguiram fazer.", "두 연구는 같은 현상을 다르게 설명하며, 어느 쪽도 상대를 완전히 반박하지 못했다.", "두 연구는 같은 현상을 다르게 설명하며, 어느 쪽도 상대를 완전히 반박하지 못했다.", "Os dois estudos explicam o mesmo fenômeno de formas diferentes, e nenhum refutou completamente o outro."),
    translate("ko-pt", "Traduza: 이 논쟁은 연구 방법의 차이와 함께, 청소년을 보호 대상으로만 보는 사조와 행위자로 보는 사조의 차이를 반영한다.", "Esse debate reflete, junto com diferenças de método, a diferença entre uma corrente que vê o adolescente apenas como alvo de proteção e outra que o vê como agente.", "사조 = corrente de pensamento; 보호 대상 = alvo de proteção; 행위자 = agente.", ["Além das diferenças de método, o debate reflete duas correntes: uma que trata o adolescente só como alguém a proteger e outra que o trata como agente."]),
    reading("본고에서 정리한 바에 따르면, 갈등의 핵심은 기기의 양이 아니라 수면을 둘러싼 책임의 소재다. 학교는 학생의 수면을 관리할 책임이 있는가, 아니면 학생이 스스로 조절할 능력을 길러야 하는가.", "O que a autora considera o núcleo do desacordo?", ["A responsabilidade pelo sono dos adolescentes: da escola ou deles próprios.", "A quantidade de aparelhos que cada aluno possui.", "O número de estudos publicados sobre o tema."], "A responsabilidade pelo sono dos adolescentes: da escola ou deles próprios.", "A pergunta desloca o debate da quantidade de aparelhos para a atribuição de responsabilidade."),
  ],
  summary: [
    "Uma revisão por debates começa pela controvérsia e distribui os estudos pela resposta que oferecem.",
    "Atribuir exige dizer o que cada fonte acrescentou e onde ficou aquém, não apenas que tratou do tema.",
    "-ㄴ/는 바 retoma um conteúdo já exposto como base de uma afirmação formal.",
    "-ㄹ 뿐더러 acrescenta uma segunda razão que agrava ou reforça a primeira.",
    "O histórico da pesquisa pode ser curto, desde que mostre como as perguntas mudaram.",
  ],
  production: production(
    "Produção independente · revisão por dois debates",
    "Escolha um tema sobre o qual você já leu pelo menos quatro textos. Escreva uma revisão curta organizada por dois debates: apresente a pergunta de cada um, distribua as fontes pela resposta que oferecem e diga qual questão continua sem resposta.",
    "이미 읽은 자료 네 편을 바탕으로 두 개의 논쟁을 중심으로 문헌 검토를 구성해 보세요.",
    ["Enuncie os dois debates em forma de pergunta, não de tema.", "Coloque cada fonte dentro de um debate e diga o que ela acrescenta.", "Use -ㄴ/는 바 uma vez e -ㄹ 뿐더러 uma vez.", "Não resuma artigo por artigo; agrupe pelo argumento.", "Feche com a pergunta que a literatura ainda não responde."],
    ["Dois debates formulados como perguntas.", "Fontes distribuídas por argumento.", "Contribuição de cada fonte indicada.", "Pergunta pendente nomeada.", "Duas formas-alvo empregadas corretamente."],
    "온라인 강의의 효과를 다룬 연구들은 크게 두 논쟁으로 나뉜다. 첫째, 온라인 강의가 학습 격차를 줄이는가, 아니면 늘리는가. 둘째, 출석을 자동으로 기록하는 방식이 학습 태도를 개선하는가, 아니면 감시로 느껴지는가. 첫 번째 논쟁에서 어떤 연구는 접근성을 높였다고 보고했고, 다른 연구는 집중 환경이 다른 학생에게 불리하다고 밝혔다. 두 번째 논쟁에서는 출석 자동화가 참여율을 높였다는 결과와, 학생들이 감시로 받아들여 신뢰가 낮아졌다는 결과가 함께 나왔다. 선행연구가 밝힌 바에 따르면, 두 논쟁 모두 강의의 질보다 환경과 신뢰의 문제에 가깝다. 이 검토는 표본이 한 학기로 제한되었을 뿐더러, 중도 포기자의 자료가 빠져 있다는 한계가 있다. 아직 답하지 못한 질문은 온라인 강의가 어떤 조건에서 격차를 줄이는가다.",
    "As pesquisas sobre a eficácia das aulas on-line se dividem em dois debates principais. Primeiro, se a aula on-line reduz ou amplia a desigualdade de aprendizagem. Segundo, se o registro automático de presença melhora a atitude de estudo ou é percebido como vigilância. No primeiro debate, alguns estudos relataram maior acesso, enquanto outros mostraram desvantagem para estudantes com condições de concentração diferentes. No segundo, apareceram juntos o resultado de que a automação da presença aumentou a participação e o de que os estudantes a perceberam como vigilância, o que reduziu a confiança. Segundo o que os estudos anteriores mostraram, os dois debates estão mais próximos de questões de ambiente e confiança do que da qualidade da aula. Esta revisão não só tem uma amostra limitada a um semestre, mas também deixa de fora os dados de quem abandonou o curso. A pergunta ainda sem resposta é em que condições a aula on-line reduz a desigualdade.",
    "Exemplo original. Observe que os dois debates organizam as fontes e que a pergunta final permanece aberta. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l25 — distinguir citação, paráfrase e plágio. */
export const C2_L25 = defineC2Lesson({
  id: "c2-l25", number: 25, moduleId: "c2-m05", title: "Ética de citação",
  objective: "Atribuir ideias com precisão e distinguir citação, paráfrase e plágio.",
  prerequisites: ["c2-l24"], estimatedMinutes: 85, dialogueTitle: "A frase que voltou sem nome",
  intro: [
    {
      title: "Três gestos: citar, parafrasear, copiar",
      body: "Citar é transportar palavras alheias com marcas visíveis: aspas, página e referência. Parafrasear é reconstruir a ideia com a própria sintaxe, mantendo a fonte. Copiar é manter a ideia e a estrutura sem dizer de onde vêm. A diferença entre parafrasear e copiar não está no número de palavras trocadas, mas em quem organiza o raciocínio. Um texto que segue a ordem do original, mesmo com sinônimos, continua sendo o texto do outro.",
      ko: "인용은 그대로 옮기고 밝히는 일이고, 바꿔 쓰기는 자기 문장으로 다시 쓰되 출처를 밝히는 일이다.",
    },
    {
      title: "Além da regra",
      body: "A ética de citação não termina no formato. Reutilizar um texto próprio sem declarar é autoplágio; citar uma fonte a partir de outra pessoa é citação secundária e exige verificar o original; publicar de novo um trabalho já divulgado é publicação duplicada. Em coautoria, o nome assinado distribui responsabilidade, não apenas crédito. Por isso, a pergunta útil não é apenas 'eu citei?', mas 'quem pode verificar o que eu afirmo e o que eu acrescentei?'.",
      ko: "저자라는 이름에는 그 문장을 확인할 책임이 따른다.",
    },
  ],
  dialogue: [
    ["재현", "이 문단, 어디서 본 것 같은데 출처가 없네요.", "Este parágrafo me parece familiar, mas não tem fonte."],
    ["민서", "작년 논문에서 가져왔어요. 문장은 조금 바꿨습니다.", "Peguei de um artigo do ano passado. Mudei um pouco as frases."],
    ["재현", "문장을 바꿔도 아이디어와 구조가 그대로면 인용으로 보기 어려워요.", "Mesmo mudando as frases, se a ideia e a estrutura continuam iguais, é difícil considerar citação."],
    ["민서", "각주만 달면 되는 건가요? 재인용 부분은요?", "Basta colocar uma nota de rodapé? E a parte de citação secundária?"],
    ["재현", "직접 인용이면 인용부호와 쪽수를, 바꿔 쓴 것이면 출처를 밝히고 자기 문장으로 다시 써야 합니다. 재인용은 원문을 확인하고, 확인할 수 없으면 그 사실을 명시해야 하고요.", "Se for citação direta, aspas e página; se for paráfrase, indicar a fonte e reescrever com frases próprias. Na citação secundária, é preciso verificar o original e, quando isso não for possível, declarar o fato."],
    ["민서", "제가 쓴 다른 글과 문장이 겹치는 것도 문제인가요?", "Se frases se repetirem em outro texto meu, isso também é problema?"],
    ["재현", "네, 자기표절입니다. 공저 논문을 다시 낼 때는 공동 저자의 동의도 필요합니다.", "Sim, é autoplágio. E, para republicar um artigo em coautoria, também é necessário o consentimento dos coautores."],
    ["민서", "그러면 이 문단은 출처를 밝히고, 제 문장으로 처음부터 다시 쓰겠습니다.", "Então vou indicar a fonte deste parágrafo e reescrevê-lo do zero com minhas próprias frases."],
  ],
  readingText: {
    titlePt: "O mesmo argumento, três assinaturas",
    paragraphs: [
      "김하늘(2023)은 도시의 그늘을 '걷기의 조건'으로 정의했다. 그는 논문에서 '그늘이 없는 보행로는 이용자를 선택한다'라고 썼다. 그에 따르면 그늘은 미관의 문제가 아니라, 누가 낮에 밖을 다닐 수 있는지를 정하는 조건이다. 이 문장을 두고 세 편의 학생 글이 나왔다. A는 문장을 그대로 옮기며 인용부호와 쪽수를 밝혔다. B는 '그늘이 부족한 길은 특정한 사람만 걷게 만든다'고 바꿔 쓰고, 문단 끝에 김하늘(2023)을 적었다. C는 '그늘이 없는 보행로는 이용자를 선택한다'는 취지를 유지하면서도 출처를 밝히지 않았다.",
      "A는 직접 인용의 형식을 지켰다. B는 문장을 자기 말로 다시 쓰고 출처를 밝혔으므로 바꿔 쓰기로 볼 수 있다. C는 단어 몇 개를 바꾸었을 뿐 아이디어와 구조가 원문과 거의 같다. 이 경우 출처를 밝히지 않았다는 점에서 표절이 된다. 표절은 문장을 그대로 베꼈는지로만 판단되지 않는다. 개념을 빌려 오는 차용도, 아이디어를 요약하는 과정도 출전을 밝히지 않으면 문제가 된다. 반대로 출처를 밝혔다고 해서 원문의 문장을 그대로 가져와도 된다는 뜻은 아니다. 인용에는 분량의 한계가 있고, 바꿔 쓰기에는 자기 문장으로 다시 구성해야 하는 조건이 붙는다.",
      "연구 윤리는 인용 형식보다 넓다. 자기 글을 다시 쓰는 자기표절, 다른 논문을 거쳐 인용하는 재인용, 공저 논문을 다시 발표하는 중복게재가 모두 여기에 속한다. 재인용은 원문을 확인하는 것이 원칙이고, 확인할 수 없으면 그 사실을 명시해야 한다. 공저 논문을 다시 낼 때는 공동 저자의 동의가 필요하다. 저자로 이름을 올리면 그 내용을 확인하는 책임이 따른다. 표절 여부는 의도만으로 판단하지 않는다. 다만 의도가 없었다고 해서 책임이 사라지지는 않는다. 문헌 목록은 읽은 책의 목록이 아니라, 실제로 논증에 사용한 자료의 목록이어야 한다.",
    ],
    pt: "Kim Haneul (2023) definiu a sombra urbana como 'condição para caminhar'. No artigo, escreveu que 'uma calçada sem sombra seleciona seus usuários'. Segundo ele, a sombra não é uma questão estética, mas uma condição que determina quem pode sair de casa durante o dia. A partir dessa frase surgiram três textos de estudantes. A transcreveu a frase com aspas e número de página. B reescreveu 'uma rua com pouca sombra faz com que só certas pessoas caminhem por ela' e indicou Kim Haneul (2023) ao final do parágrafo. C manteve a ideia de que 'uma calçada sem sombra seleciona seus usuários', mas não indicou a fonte. A respeitou o formato da citação direta. B reescreveu a frase com palavras próprias e indicou a fonte, por isso pode ser considerada paráfrase. C trocou apenas algumas palavras, e a ideia e a estrutura continuam quase iguais às do original. Nesse caso, o plágio ocorre por não indicar a fonte. O plágio não é julgado apenas por ter copiado a frase literalmente. A apropriação de um conceito e o processo de resumir uma ideia também se tornam problema quando a fonte não é indicada. Por outro lado, indicar a fonte não significa que se possa trazer a frase do original tal como está. A citação tem limite de extensão, e a paráfrase exige reconstruir o texto com frases próprias. A ética da pesquisa é mais ampla que o formato da citação. O autoplágio, que reutiliza um texto próprio; a citação secundária, que cita passando por outro artigo; e a publicação duplicada, que republica um artigo em coautoria, todos pertencem a esse campo. Na citação secundária, o princípio é verificar o original; quando isso não é possível, é preciso declarar o fato. Para republicar um artigo em coautoria, é necessário o consentimento dos coautores. Quem assina como autor carrega a responsabilidade de verificar o conteúdo. O plágio não é julgado apenas pela intenção. No entanto, a ausência de intenção não faz a responsabilidade desaparecer. A lista de referências não é uma lista de livros lidos, mas dos materiais efetivamente usados na argumentação.",
    objective: "Comparar as três paráfrases com o original e distinguir citação, paráfrase e plágio.",
  },
  reusedIds: ["ko:인용", "ko:판단", "ko:취지", "ko:원문"],
  grammar: [
    [
      "-라고 명시하다 — declarar que",
      "동사 + -라고 명시하다 / 명사 + (이)라고 명시하다",
      "Introduz o conteúdo declarado de forma explícita, sobretudo em documentos, normas e notas. O verbo 명시하다 indica que a informação foi registrada de modo deliberado, e não apenas sugerida. Compare com -다고 적다, mais neutro e comum em relatos, e com -을 밝히다, que destaca a revelação. Use -라고 명시하다 quando a exigência é que o texto diga com clareza o que antes poderia ficar implícito.",
      [
        ["필자는 해당 문장이 재인용이라고 각주에 명시했다.", "O autor declarou na nota de rodapé que aquela frase era uma citação secundária."],
        ["학회는 이 논문이 중복게재에 해당한다고 명시하지 않았다.", "A sociedade acadêmica não declarou que este artigo configura publicação duplicada."],
      ],
    ],
    [
      "-ㄴ/는 책임이 따른다 — vem acompanhada de responsabilidade",
      "동사 + -는 책임이 따른다 / 형용사 + -(으)ㄴ 책임이 따른다",
      "Indica que uma posição, um ato ou um benefício traz consigo uma responsabilidade correspondente. É uma colocação fixa e formal, frequente em textos sobre ética, gestão e pesquisa. Compare com -을 의무가 있다, que enuncia uma obrigação externa, e com -을 책임지다, que nomeia quem responde por algo. A construção com 따르다 apresenta a responsabilidade como consequência inseparável da escolha.",
      [
        ["저자로 이름을 올리면 그 내용을 확인하는 책임이 따른다.", "Assinar como autor traz consigo a responsabilidade de verificar o conteúdo."],
        ["자료를 공개하면 재현성을 보장해야 하는 책임이 따른다.", "Divulgar os dados traz consigo a responsabilidade de garantir a reprodutibilidade."],
      ],
    ],
  ],
  guided: [
    mcq("Qual das três versões configura plágio?", ["A de C, que mantém a ideia e a estrutura do original sem indicar a fonte.", "A de A, que usa aspas e indica a página.", "A de B, que reescreve e indica a fonte no fim do parágrafo."], "A de C, que mantém a ideia e a estrutura do original sem indicar a fonte.", "C preserva o raciocínio e a formulação central sem atribuição; a troca de palavras não altera o problema."),
    cloze("출처를 밝히지 않고 아이디어를 가져오면 ___이 된다.", "표절", "표절 ocorre quando a ideia alheia é apresentada sem indicação de fonte."),
    listen("Ouça e escreva como o plágio não deve ser julgado.", "표절은 문장을 그대로 베꼈는지로만 판단되지 않는다.", "표절은 문장을 그대로 베꼈는지로만 판단되지 않는다.", "O plágio não é julgado apenas por ter copiado a frase literalmente."),
    translate("pt-ko", "Traduza: “A paráfrase exige indicar a fonte e reescrever com as próprias palavras.”", "바꿔 쓰기는 출처를 밝히고 자기 문장으로 다시 쓰는 일이다.", "바꿔 쓰기 = paráfrase; a frase usa a estrutura -은 ... -는 일이다.", ["바꿔 쓰기는 출처를 밝히고 자기 문장으로 다시 쓰는 것을 뜻한다."]),
    reading("B는 문장을 자기 말로 다시 쓰고 출처를 밝혔으므로 바꿔 쓰기로 볼 수 있다. C는 단어 몇 개를 바꾸었을 뿐 아이디어와 구조가 원문과 거의 같다.", "Por que a versão de B é aceitável?", ["Porque reformula com palavras próprias e indica a fonte.", "Porque usa mais palavras que o original.", "Porque foi escrita antes das outras duas."], "Porque reformula com palavras próprias e indica a fonte.", "A paráfrase legítima combina reconstrução da frase e atribuição explícita."),
  ],
  independent: [
    mcq("Por que a versão de C é plágio, mesmo com palavras trocadas?", ["Porque mantém a ideia e a estrutura do original sem atribuição.", "Porque cita um autor que não existe e inventa a fonte.", "Porque foi publicada em outro idioma, sem tradução."], "Porque mantém a ideia e a estrutura do original sem atribuição.", "A atribuição é o que separa a paráfrase da apropriação; trocar sinônimos não resolve a ausência de fonte."),
    cloze("재인용임을 각주에 ___해야 한다.", "명시", "명시하다 registra de forma explícita; é o verbo usado para declarar a citação secundária."),
    listen("Ouça e escreva a responsabilidade que acompanha a assinatura.", "저자로 이름을 올리면 그 내용을 확인하는 책임이 따른다.", "저자로 이름을 올리면 그 내용을 확인하는 책임이 따른다.", "Assinar como autor traz consigo a responsabilidade de verificar o conteúdo."),
    translate("ko-pt", "Traduza: 표절 여부는 의도만으로 판단하지 않는다. 다만 의도가 없었다고 해서 책임이 사라지지는 않는다.", "O plágio não é julgado apenas pela intenção. No entanto, a ausência de intenção não faz a responsabilidade desaparecer.", "여부 = se ocorre ou não; 사라지다 = desaparecer.", ["A intenção, sozinha, não decide se houve plágio; mas a falta de intenção também não elimina a responsabilidade."]),
    reading("연구 윤리는 인용 형식보다 넓다. 자기 글을 다시 쓰는 자기표절, 다른 논문을 거쳐 인용하는 재인용, 공저 논문을 다시 발표하는 중복게재가 모두 여기에 속한다.", "O que caracteriza autoplágio no texto?", ["Reutilizar um texto próprio sem declarar que ele já foi publicado.", "Citar o próprio orientador em um artigo.", "Publicar um artigo com mais de um autor."], "Reutilizar um texto próprio sem declarar que ele já foi publicado.", "O texto trata o reaproveitamento do próprio texto como uma questão de transparência, não de autoria alheia."),
  ],
  summary: [
    "Citar exige marcas visíveis; parafrasear exige reconstrução e fonte; copiar mantém ideia e estrutura sem atribuição.",
    "Trocar palavras não basta: a organização do raciocínio também pertence a quem a formulou.",
    "-라고 명시하다 registra explicitamente uma informação que não pode ficar implícita.",
    "-ㄴ/는 책임이 따른다 apresenta a responsabilidade como consequência inseparável de um ato.",
    "Autoplágio, citação secundária e publicação duplicada ampliam a ética para além do formato.",
  ],
  production: production(
    "Produção independente · reescrever com atribuição",
    "Escolha um trecho de um texto que você leu recentemente. Escreva três versões: uma citação direta, uma paráfrase com atribuição e uma paráfrase que ainda precise de correção. Depois, explique em um parágrafo o que distingue a segunda da terceira e que responsabilidade o autor assume ao assinar o texto.",
    "읽은 글의 한 문장을 골라 직접 인용, 출처를 밝힌 바꿔 쓰기, 고쳐야 할 바꿔 쓰기를 각각 써 보고 차이를 설명해 보세요.",
    ["Transcreva a citação direta com aspas e localização.", "Na paráfrase correta, mude a sintaxe e mantenha a fonte.", "Na versão a corrigir, mostre o que ficou próximo demais do original.", "Use -라고 명시하다 uma vez e -ㄴ/는 책임이 따른다 uma vez.", "Feche dizendo que responsabilidade vem com a assinatura."],
    ["Três versões claramente distintas.", "Fonte indicada na citação e na paráfrase.", "Problema da terceira versão nomeado.", "Duas formas-alvo empregadas com função clara.", "Responsabilidade autoral explicitada no fechamento."],
    "김하늘(2023)의 문장을 세 가지 방식으로 다시 써 보았다. 첫째, 직접 인용이다. '그늘이 없는 보행로는 이용자를 선택한다'(김하늘 2023, 47쪽). 둘째, 출처를 밝힌 바꿔 쓰기다. 그늘은 도시의 장식이 아니라, 누가 낮에 걸을 수 있는지를 가르는 조건이라는 뜻으로 이해했다(김하늘 2023). 셋째, 고쳐야 할 버전이다. '그늘이 부족한 길은 이용자를 고르게 만든다.' 이 문장은 단어만 바꾸었을 뿐 원문의 구조를 그대로 따라간다. 나는 이 문장이 김하늘(2023)의 문장을 바꾼 것이라고 각주에 명시해야 한다고 본다. 글을 쓰는 사람은 인용한 문장의 출처를 확인할 책임이 따른다. 같은 생각을 쓰더라도 누구의 문장으로 시작했는지 밝히는 순간, 책임의 소재가 분명해진다.",
    "Reescrevi a frase de Kim Haneul (2023) de três maneiras. Primeiro, a citação direta: 'Uma calçada sem sombra seleciona seus usuários' (Kim Haneul, 2023, p. 47). Segundo, a paráfrase com fonte: entendi que a sombra não é um enfeite urbano, mas uma condição que decide quem pode caminhar de dia (Kim Haneul, 2023). Terceiro, a versão a corrigir: 'Uma rua com pouca sombra faz com que os usuários sejam escolhidos.' Essa frase apenas troca palavras e segue a estrutura do original. Considero que é preciso declarar na nota que ela reformula Kim Haneul (2023). Quem escreve carrega a responsabilidade de verificar a fonte da frase citada. Mesmo ao tratar da mesma ideia, o momento em que se indica de quem partiu a formulação torna claro onde está a responsabilidade.",
    "Exemplo original. Observe que as três versões se distinguem pelo grau de atribuição e que o fechamento nomeia a responsabilidade. Exemplo ilustrativo; não é gabarito.",
  ),
});
