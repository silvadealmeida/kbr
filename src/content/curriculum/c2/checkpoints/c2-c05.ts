import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto integra as fontes escolhidas e responde ao que foi pedido: método, viés, conflito, revisão ou atribuição." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança da evidência para a interpretação e da interpretação para o limite, sem repetir a mesma etapa." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro acadêmico se mantém consistente." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "Distingue o que a fonte mostra do que ela permite concluir e nomeia o que permanece em aberto." },
  { criterion: "mediation" as const, labelPt: "Mediação e ética", descriptorPt: "Representa fontes e posições sem distorcer, atribui ideias a quem as formulou e não transforma suspeita em acusação." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · síntese com duas fontes",
  promptPt: "Escolha duas fontes sobre o mesmo tema — por exemplo, um número de pesquisa e uma entrevista, ou dois textos com posições opostas. Em um texto único, diga o que cada fonte sustenta, onde elas se complementam ou se chocam, qual é o limite de cada uma e o que permanece sem resposta. Se usar uma ideia de outra pessoa, atribua a fonte explicitamente.",
  promptKo: "같은 주제를 다룬 자료 두 개를 골라, 각 자료가 무엇을 뒷받침하는지와 무엇을 말해 주지 않는지를 밝히고, 남은 질문을 정리해 보세요.",
  guidance: [
    "Apresente as duas fontes com o tipo de evidência que cada uma oferece.",
    "Diga o que uma explica que a outra não explica.",
    "Nomeie um viés ou uma lacuna de cada fonte.",
    "Use ao menos duas formas do módulo: -에 근거한, -ㄴ/는 반면, -다는 한계가 있다, -ㄹ 우려가 있다, -ㄴ/는 동시에, -ㄴ/는 한편, -ㄴ/는 바, -ㄹ 뿐더러, -라고 명시하다 ou -ㄴ/는 책임이 따른다.",
    "Se houver desacordo de valor, nomeie-o em vez de resolvê-lo à força.",
    "Feche com a pergunta que ainda não pode responder.",
  ],
  checklist: [
    "Duas fontes identificadas com seu tipo de evidência.",
    "Complementaridade ou conflito explicitado.",
    "Viés ou lacuna nomeado.",
    "Atribuição de ideias de terceiros.",
    "Duas formas do módulo empregadas corretamente.",
    "Pergunta pendente formulada no fechamento.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "지역 보건소의 설문과 의사 면담을 함께 읽었다. 설문은 주민 1,500명을 대상으로 했고, 응답률은 46퍼센트였다. 응답자의 68퍼센트가 '야간 진료가 필요하다'고 답했다. 반면 면담에 참여한 의사 세 명은 야간 진료의 가장 큰 장애가 인력이 아니라 조명과 귀가 동선이라고 말했다. 설문에 근거한 68퍼센트는 요구의 크기를 보여 주지만, 누가 밤에 혼자 귀가할 수 있는지는 말해 주지 않는다. 면담은 그 조건을 설명하는 대신, 세 명의 경험이 전체 주민을 대표하지 않는다는 한계가 있다. 두 자료를 합치면 '야간 진료에 대한 요구는 넓지만, 진료 시간만 늘리는 것으로는 충분하지 않다'는 결론이 가능하다. 이 결론은 이용률을 예측하지 못한다는 점에서 여전히 제한적이다.",
    pt: "Li juntos o questionário de um posto de saúde local e as entrevistas com médicos. O questionário foi aplicado a 1.500 moradores, e a taxa de resposta foi de 46%. Dos respondentes, 68% disseram que 'é necessário atendimento noturno'. Por outro lado, os três médicos entrevistados afirmaram que o maior obstáculo ao atendimento noturno não é a equipe, mas a iluminação e o trajeto de volta para casa. Os 68% baseados no questionário mostram o tamanho da demanda, mas não informam quem consegue voltar sozinho à noite. As entrevistas explicam essa condição, porém têm a limitação de que a experiência de três pessoas não representa o conjunto dos moradores. Reunindo os dois materiais, é possível concluir que 'a demanda por atendimento noturno é ampla, mas aumentar apenas o horário de atendimento não basta'. Essa conclusão continua limitada porque não permite prever a taxa de uso.",
    notePt: "Exemplo original. Observe que o texto separa o que cada fonte sustenta, nomeia os limites e não trata a entrevista como prova estatística. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c05 — avaliação do Módulo 5: métodos, viés, conflito, revisão e ética. */
export const C2_C05 = defineC2Checkpoint({
  id: "c2-c05", number: 5, moduleId: "c2-m05",
  title: "Checkpoint · Síntese crítica de fontes",
  objective: "Avaliar integração de métodos, viés, conflito, revisão de literatura e ética do Módulo 5.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l21", "c2-l22", "c2-l23", "c2-l24", "c2-l25"],
  prerequisites: ["c2-l21", "c2-l22", "c2-l23", "c2-l24", "c2-l25", "c2-c01", "c2-c02", "c2-c03", "c2-c04"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual afirmação trata corretamente a relação entre um questionário e entrevistas sobre o mesmo tema?", ["O questionário mostra a distribuição; as entrevistas explicam o sentido que os respondentes deram às respostas.", "As entrevistas confirmam estatisticamente o percentual do questionário.", "O questionário explica o sentido das falas coletadas nas entrevistas."], "O questionário mostra a distribuição; as entrevistas explicam o sentido que os respondentes deram às respostas.", "Cada método responde a uma pergunta própria; a integração articula as duas respostas sem converter uma na outra."),
    mcq("Qual crítica distingue uma lacuna de método de uma acusação de má-fé?", ["Apontar que faltam dados sobre quem saiu, sem afirmar que a empresa agiu para esconder.", "Afirmar que todo relatório financiado por empresa é falso.", "Recusar-se a examinar o relatório por causa da capa."], "Apontar que faltam dados sobre quem saiu, sem afirmar que a empresa agiu para esconder.", "A crítica responsável nomeia o mecanismo e a ausência sem atribuir intenção."),
    mcq("O que caracteriza uma revisão de literatura organizada por debates?", ["Ela mostra o que está em disputa e situa a contribuição de cada estudo nesse debate.", "Ela resume um autor por parágrafo, em ordem cronológica.", "Ela reúne o maior número possível de citações diretas."], "Ela mostra o que está em disputa e situa a contribuição de cada estudo nesse debate.", "A revisão por debate começa pela controvérsia e distribui os estudos pela resposta que oferecem."),

    cloze("전체 2,900명 가운데 1,200명이 답해 ___이 41퍼센트였다.", "응답률", "응답률 é a proporção de pessoas que responderam ao questionário."),
    cloze("남은 사람만 조사하면 평균이 실제보다 높아 보이는 ___이 생긴다.", "맹점", "맹점 é o ponto cego criado pela seleção da amostra."),
    cloze("두 요구는 같은 30분을 두고 ___한다.", "경합", "경합하다 indica que duas demandas disputam o mesmo recurso."),
    cloze("각 연구가 논쟁에 어떻게 ___했는지 밝혀야 한다.", "기여", "기여하다 nomeia o que cada estudo acrescenta ao debate."),
    cloze("출처를 밝히지 않고 아이디어를 가져오면 ___이 된다.", "표절", "표절 ocorre quando a ideia alheia é apresentada sem indicação de fonte."),

    listen("Ouça e escreva o limite que as entrevistas têm diante dos números.", "면담은 그 차이를 설명해 주지만, 숫자를 대신하지는 못합니다. 열여덟 명으로 전체를 대표할 수는 없으니까요.", "면담은 그 차이를 설명해 주지만, 숫자를 대신하지는 못합니다. 열여덟 명으로 전체를 대표할 수는 없으니까요.", "As entrevistas explicam essa diferença, mas não substituem os números. Dezoito pessoas não podem representar o conjunto."),
    listen("Ouça e escreva o que precisa ser dito para que a confiança apareça.", "자료의 출처와 수집 기간을 밝히는 것만으로는 충분하지 않다. 누가 빠졌는지 밝혀야 신뢰가 생긴다.", "자료의 출처와 수집 기간을 밝히는 것만으로는 충분하지 않다. 누가 빠졌는지 밝혀야 신뢰가 생긴다.", "Indicar a fonte dos dados e o período de coleta não basta. É preciso dizer quem ficou de fora para que haja confiança."),
    listen("Ouça e escreva o que os dois lados disputam.", "차량 통행은 생계 문제이고, 보행 안전은 생활 문제입니다. 두 요구는 같은 30분을 두고 경합합니다.", "차량 통행은 생계 문제이고, 보행 안전은 생활 문제입니다. 두 요구는 같은 30분을 두고 경합합니다.", "O trânsito de veículos é uma questão de sustento, e a segurança do pedestre, uma questão de vida cotidiana. As duas demandas disputam os mesmos trinta minutos."),
    listen("Ouça e escreva o resultado do confronto entre os dois estudos.", "두 연구는 같은 현상을 다르게 설명하며, 어느 쪽도 상대를 완전히 반박하지 못했다.", "두 연구는 같은 현상을 다르게 설명하며, 어느 쪽도 상대를 완전히 반박하지 못했다.", "Os dois estudos explicam o mesmo fenômeno de formas diferentes, e nenhum refutou completamente o outro."),
    listen("Ouça e escreva como o plágio é julgado.", "표절 여부는 의도만으로 판단하지 않는다. 다만 의도가 없었다고 해서 책임이 사라지지는 않는다.", "표절 여부는 의도만으로 판단하지 않는다. 다만 의도가 없었다고 해서 책임이 사라지지는 않는다.", "O plágio não é julgado apenas pela intenção. No entanto, a ausência de intenção não faz a responsabilidade desaparecer."),
    listen("Ouça e escreva o limite que o relatório reconhece.", "이 보고서는 그만둔 배달원을 표본에서 배제했다는 한계가 있다.", "이 보고서는 그만둔 배달원을 표본에서 배제했다는 한계가 있다.", "Este relatório tem a limitação de ter excluído da amostra os entregadores que saíram."),

    reading("여성 응답자 가운데 밤에 혼자 공원을 걷겠다고 한 사람은 34퍼센트였고, 65세 이상에서는 28퍼센트로 떨어졌다. 전체 평균 62퍼센트는 이 차이를 보여 주지 않는다.", "O que a comparação entre a média e os grupos mostra?", ["Que a média geral esconde diferenças de experiência entre os usuários.", "Que o parque é mais seguro para as mulheres do que para os homens.", "Que os idosos deixaram de responder ao questionário."], "Que a média geral esconde diferenças de experiência entre os usuários.", "O número agregado reúne grupos com experiências distintas e apaga a desigualdade de uso."),
    reading("조사팀은 보고서에서 두 자료를 교차검증하되, 한쪽으로 다른 쪽을 대체하지 않았다. 먼저 설문에 근거한 분포를 제시하고, 이어서 면접에 근거한 해석을 별도 절로 두었다.", "Como o relatório evita subordinar um método ao outro?", ["Separa a distribuição baseada no questionário da interpretação baseada nas entrevistas.", "Usa apenas as entrevistas, porque são mais detalhadas.", "Apresenta os dois resultados como se fossem a mesma medida."], "Separa a distribuição baseada no questionário da interpretação baseada nas entrevistas.", "Cada método ocupa uma seção com função própria, e um não serve de prova para o outro."),
    reading("실제로 이 보고서는 소득만 다루고 근무 시간은 다루지 않았다. 주당 소득이 늘어난 이유가 시간을 더 일했기 때문일 수 있는데, 그 가능성은 검토되지 않았다.", "Por que o aumento da renda não sustenta sozinho a conclusão de melhora?", ["Porque o ganho semanal pode vir de mais horas trabalhadas, possibilidade que o relatório não examina.", "Porque a empresa não tinha registros de renda.", "Porque o relatório foi publicado em março."], "Porque o ganho semanal pode vir de mais horas trabalhadas, possibilidade que o relatório não examina.", "Sem a jornada, o aumento da renda semanal é compatível com mais trabalho, e não necessariamente com melhora nas condições."),
    reading("이 차이를 한쪽의 무지나 이기심으로 환원하면 대화는 끝난다. 그렇다고 합의를 서둘러 봉합하면, 두 요구 가운데 하나는 이름 없이 사라진다.", "O que o texto alerta sobre um acordo apressado?", ["Que ele pode fazer uma das demandas desaparecer sem ser tratada.", "Que ele sempre resolve o problema do trânsito.", "Que ele impede qualquer negociação futura."], "Que ele pode fazer uma das demandas desaparecer sem ser tratada.", "O acordo que busca aliviar o desconforto esconde o desacordo em vez de nomeá-lo."),
    reading("이 논쟁은 연구 방법의 차이와 함께, 청소년을 보호 대상으로만 보는 사조와 행위자로 보는 사조의 차이를 반영한다. 최근에는 두 사조가 겹치는 지점이 부각되었다.", "O que o debate sobre restrição de aparelhos reflete, além das diferenças de método?", ["Duas correntes que veem o adolescente de formas diferentes: só como alvo de proteção ou também como agente.", "A falta de estudos sobre o tema.", "A recusa dos pesquisadores em publicar resultados."], "Duas correntes que veem o adolescente de formas diferentes: só como alvo de proteção ou também como agente.", "O texto articula método e pressuposto: a forma de ver o adolescente organiza as perguntas da pesquisa."),
    reading("C는 단어 몇 개를 바꾸었을 뿐 아이디어와 구조가 원문과 거의 같다. 이 경우 출처를 밝히지 않았다는 점에서 표절이 된다. 표절은 문장을 그대로 베꼈는지로만 판단되지 않는다.", "Por que a versão de C é plágio?", ["Porque mantém a ideia e a estrutura do original sem indicar a fonte.", "Porque usa aspas em excesso.", "Porque cita uma página que não existe."], "Porque mantém a ideia e a estrutura do original sem indicar a fonte.", "A ausência de atribuição é o que caracteriza o plágio, mesmo quando as palavras foram trocadas."),

    translate("pt-ko", "Traduza: “A conclusão baseada no questionário carrega a limitação de uma taxa de resposta de 41%.”", "질문지에 근거한 결론은 응답률 41퍼센트라는 한계를 안고 있다.", "-에 근거한 liga a conclusão à base, e -라는 한계 indica o limite que ela carrega.", ["질문지에 근거한 결론은 응답률이 41퍼센트라는 한계를 안고 있다."]),
    translate("pt-ko", "Traduza: “O relatório tem a limitação de ter excluído da amostra os entregadores que saíram.”", "보고서는 그만둔 배달원을 표본에서 배제했다는 한계가 있다.", "-다는 한계가 있다 delimita o alcance da conclusão citando o próprio limite.", ["보고서는 그만둔 배달원을 표본에서 뺐다는 한계가 있다."]),
    translate("ko-pt", "Traduza: 갈등은 시간대보다 우선순위에 있다. 한쪽은 생계의 연속성을, 다른 쪽은 이동의 안전을 먼저 놓는다.", "O conflito está mais na prioridade do que no horário. Um lado coloca primeiro a continuidade do sustento; o outro, a segurança do deslocamento.", "우선순위 = ordem de prioridade; 생계의 연속성 = continuidade do sustento.", ["O conflito está menos no horário e mais na prioridade: um lado põe à frente a continuidade do sustento, o outro a segurança do deslocamento."]),
    translate("ko-pt", "Traduza: 이 논쟁은 연구 방법의 차이와 함께, 청소년을 보호 대상으로만 보는 사조와 행위자로 보는 사조의 차이를 반영한다.", "Esse debate reflete, junto com diferenças de método, a diferença entre uma corrente que vê o adolescente apenas como alvo de proteção e outra que o vê como agente.", "사조 = corrente de pensamento; 보호 대상 = alvo de proteção; 행위자 = agente.", ["Além das diferenças de método, o debate reflete duas correntes: uma que trata o adolescente só como alguém a proteger e outra que o trata como agente."]),
    translate("ko-pt", "Traduza: 저자로 이름을 올리면 그 내용을 확인하는 책임이 따른다.", "Assinar como autor traz consigo a responsabilidade de verificar o conteúdo.", "-ㄴ/는 책임이 따른다 apresenta a responsabilidade como consequência inseparável da escolha.", ["Assumir a autoria traz consigo a responsabilidade de verificar o conteúdo."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
