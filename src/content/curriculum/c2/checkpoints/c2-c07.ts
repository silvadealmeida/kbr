import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume a tarefa de mediação: separa posições, interesses e limites, em vez de apenas resumir opiniões." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A proposta avança do que cada parte disse para o que pode ser acordado, e do acordo parcial para o que permanece aberto." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso de mediação, deliberação, negociação e reformulação técnica, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém adequado ao gênero escolhido." },
  { criterion: "argument" as const, labelPt: "Qualidade da mediação", descriptorPt: "Distingue o negociável do irreconciliável, sustenta a proposta com o que foi dito e nomeia o limite do acordo." },
  { criterion: "mediation" as const, labelPt: "Responsabilidade e representação", descriptorPt: "Reformula a fala das partes sem apagar divergências, sem transformar estimativa em certeza e sem transferir responsabilidade." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · mediar, reformular e registrar",
  promptPt: "Você recebeu duas falas conflitantes sobre um mesmo problema e precisa mediar a situação. Em um texto único, apresente as duas posições, separe o que pode ser negociado do que não pode, registre um acordo parcial e diga o que fica aberto. Se houver um número ou uma estimativa técnica, explique o que ele pressupõe. Feche com uma nota sobre o poder de quem registra e o limite da sua própria síntese.",
  promptKo: "서로 맞서는 두 입장을 중재하는 글을 쓰고, 협상 가능한 부분과 남겨 둘 한계를 구분하며, 기록자의 책임도 밝혀 보세요.",
  guidance: [
    "Abra situando as duas partes e o que cada uma diz querer.",
    "Separe um item negociável, um limite e uma pendência.",
    "Se usar um número, diga de que estimativa ou suposição ele depende.",
    "Use ao menos duas formas do módulo com função clara.",
    "Explique o critério do seu registro e reconheça o que pode ter ficado de fora.",
  ],
  checklist: [
    "Duas posições apresentadas sem caricatura.",
    "Item negociável e limite separados.",
    "Acordo parcial e pendência nomeados.",
    "Estimativa ou suposição explicitada, se houver número.",
    "Duas formas do módulo empregadas com função clara.",
    "Poder de registro e limite da síntese reconhecidos.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "두 동 철거를 둘러싼 갈등에서 나는 다음과 같이 중재안을 정리한다. 상인회 입장에서는 영업 중단 하루도 생계의 문제이므로, 이전 일정은 협의 대상이 되어야 한다. 시청 입장에서는 안전 기준을 낮출 수 없으므로, 철거 시한을 무기한 미루기는 어렵다. 나는 두 요구를 한 문장으로 합치지 않고, 각각의 조건으로 기록한다. 첫째, 철거 일정은 두 주 범위에서 조정한다. 둘째, 대체 자리가 문서로 확정되기 전에는 철거를 시작하지 않는다. 대신 나는 상인회가 첫째 주까지 점포 목록을 제출하도록 중재한다. 보상 금액과 이전 비용의 분담은 오늘 결정하지 않고, 다음 회의의 첫 안건으로 남긴다. 다만 이 정리에는 한계가 있다. 나는 회의 뒤에 오간 대화를 모두 듣지 못했고, 내가 먼저 배치한 문장이 특정 쪽에 유리하게 읽힐 위험이 있다. 그래서 나는 무엇을 왜 앞에 두었는지 함께 적는다.",
    pt: "No conflito em torno da demolição dos dois blocos, organizo a seguinte proposta de mediação. Do ponto de vista da associação de comerciantes, um único dia de interrupção das vendas já é uma questão de sustento; por isso, o cronograma da mudança deve ser negociável. Do ponto de vista da prefeitura, não se pode baixar as normas de segurança; por isso, é difícil adiar o prazo da demolição por tempo indeterminado. Não fundo as duas exigências numa única frase: registro cada uma como condição. Primeiro, o cronograma de demolição será ajustado dentro de um intervalo de duas semanas. Segundo, a demolição não começará antes que o espaço substituto seja confirmado por documento. Em troca, atuo para que a associação entregue a lista de lojas até a primeira semana. O valor da indenização e a divisão dos custos de mudança não serão decididos hoje e ficam como primeiro item da próxima reunião. Esta organização, porém, tem limites. Não ouvi todas as conversas ocorridas depois da reunião, e há risco de que a frase que coloquei primeiro seja lida como favorável a um dos lados. Por isso, registro também o que coloquei na frente e por quê.",
    notePt: "Exemplo original. Observe que o texto separa posições, registra um acordo parcial, explicita o limite e reconhece o poder de quem registra. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c07 — avaliação do Módulo 7: mediação, reformulação, deliberação, poder e responsabilidade. */
export const C2_C07 = defineC2Checkpoint({
  id: "c2-c07", number: 7, moduleId: "c2-m07",
  title: "Checkpoint · Mediação sofisticada",
  objective: "Avaliar mediação, reformulação técnica, deliberação, poder e responsabilidade do Módulo 7.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l31", "c2-l32", "c2-l33", "c2-l34", "c2-l35"],
  prerequisites: ["c2-l31", "c2-l32", "c2-l33", "c2-l34", "c2-l35", "c2-c01", "c2-c02", "c2-c03", "c2-c04", "c2-c05", "c2-c06"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual é o limite de um acordo parcial bem registrado?", ["Ele não elimina o desacordo; nomeia o que ficou aberto e quem dará o próximo passo.", "Ele garante que todas as partes concordem com o texto final.", "Ele dispensa a necessidade de uma reunião seguinte."], "Ele não elimina o desacordo; nomeia o que ficou aberto e quem dará o próximo passo.", "O acordo parcial preserva o desacordo em vez de fingir consenso."),
    mcq("O que uma reformulação técnica responsável precisa preservar?", ["A diferença entre fato confirmado, estimativa e lacuna.", "A certeza de que o pior cenário vai ocorrer.", "A supressão dos números para não confundir o público."], "A diferença entre fato confirmado, estimativa e lacuna.", "A reformulação útil para a decisão mantém a incerteza e as suposições que a produzem."),
    mcq("O que caracteriza uma contraproposta que reconhece a assimetria de poder?", ["Ela pede garantias verificáveis e não simula que as partes têm as mesmas alternativas.", "Ela declara que a parte mais fraca tem o mesmo poder de recusa.", "Ela exige que a parte mais forte renuncie a toda decisão antes de negociar."], "Ela pede garantias verificáveis e não simula que as partes têm as mesmas alternativas.", "Reconhecer a assimetria é nomear o limite real da escolha, não criar uma falsa igualdade."),

    cloze("Complete o registro do impasse na mediação: 회의는 곧 ___ 상태에 들어갔다.", "교착", "-교착 상태 descreve a paralisia em que nenhuma das partes consegue avançar."),
    cloze("Complete a crítica à simplificação do risco: '위험이 크다'는 ___ 말하면 확률이 사라진다.", "식으로", "-ㄴ/는 식으로 nomeia o modo de formular e pode indicar que ele é redutor."),
    cloze("Complete o motivo do adiamento: 정족수가 채워지지 않아 ___은 다음 회의로 미뤄졌다.", "표결", "-표결 é a decisão por votos, adiada quando falta quórum."),
    cloze("Complete a restrição que limita a escolha: 다른 제안이 없는 ___에서 수용하는 것은 선택이 아니다.", "조건", "-ㄴ/는 조건에서 nomeia a condição estrutural em que a decisão ocorre."),
    cloze("Complete a consequência do recorte na ata: 한 문장을 빼자 ___가 다른 쪽으로 옮겨 갔다.", "책임소재", "-책임소재 indica onde a responsabilidade é situada no texto."),

    listen("Ouça e escreva o limite que a mediadora registra na ata.", "일정과 구역은 조정 가능하고, 대체 자리 확정 전 철거는 논의에서 제외하겠습니다.", "일정과 구역은 조정 가능하고, 대체 자리 확정 전 철거는 논의에서 제외하겠습니다.", "O cronograma e as áreas são negociáveis, e a demolição antes da definição do espaço substituto fica fora da discussão."),
    listen("Ouça e escreva por que a mediação não é cortar a diferença ao meio.", "중재는 양쪽의 요구를 반으로 자르는 일이 아니라, 무엇이 교환 가능하고 무엇이 아닌지를 구분하는 일이다.", "중재는 양쪽의 요구를 반으로 자르는 일이 아니라, 무엇이 교환 가능하고 무엇이 아닌지를 구분하는 일이다.", "Mediar não é cortar as exigências dos dois lados ao meio, mas distinguir o que é trocável do que não é."),
    listen("Ouça e escreva a condição que acompanha o número de 1,4 vez.", "그 수치는 평균 기온 상승 시나리오에 따른 추정치입니다.", "그 수치는 평균 기온 상승 시나리오에 따른 추정치입니다.", "Esse número é uma estimativa baseada no cenário de aumento da temperatura média."),
    listen("Ouça e escreva a separação feita pela facilitadora.", "야간 운행 축소는 협의 가능한 안건이고, 보상 범위는 다음 회의로 넘기겠습니다.", "야간 운행 축소는 협의 가능한 안건이고, 보상 범위는 다음 회의로 넘기겠습니다.", "A redução da operação noturna é um item negociável, e a faixa de compensação fica para a próxima reunião."),
    listen("Ouça e escreva o que a trabalhadora diz sobre uma proposta sem recusa possível.", "거절할 수 없는 제안은 제안이 아니라 통보입니다.", "거절할 수 없는 제안은 제안이 아니라 통보입니다.", "Uma proposta que não se pode recusar não é proposta, é comunicado."),
    listen("Ouça e escreva o que o registro define, além de transportar falas.", "기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.", "기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.", "O registro não é o transporte da fala, mas a definição de quem, mais tarde, terá de explicar o quê."),

    reading("회의는 완전한 합의 없이 끝났다. 그러나 두 가지는 문서에 남았다. 첫째, 철거 일정은 두 주 범위에서 조정한다. 둘째, 대체 자리가 확정되기 전에는 철거를 시작하지 않는다. 합의하지 못한 것은 보상 금액과 이전 비용의 분담이었다.", "O que o registro da mediação estabelece?", ["Dois pontos acordados e um item que permanece aberto para a próxima reunião.", "Um acordo completo sobre indenização e custos de mudança.", "A suspensão definitiva da demolição."], "Dois pontos acordados e um item que permanece aberto para a próxima reunião.", "A ata separa o que foi decidido do que ficou pendente."),
    reading("보고서는 이 추정치를 확정된 예측으로 읽지 말 것을 요청한다. 1.4배라는 숫자는 평균 기온이 1.5도 오른다는 시나리오를 가정한 결과다. 기온 상승 폭이 작으면 위험은 낮아지고, 크면 더 높아진다. 연구팀은 모형의 민감도를 함께 공개했다.", "Por que o número não deve ser lido como previsão fechada?", ["Porque depende de um cenário e de variáveis que alteram o resultado.", "Porque o estudo não coletou nenhum dado de temperatura.", "Porque a prefeitura já decidiu não usar o relatório."], "Porque depende de um cenário e de variáveis que alteram o resultado.", "A estimativa está condicionada ao cenário de temperatura e à sensibilidade do modelo."),
    reading("진행자는 감정이 높아진 발언을 중간에 멈추고, 판단 기준을 먼저 합의하자고 제안했다. 기준은 세 가지였다. 피해의 지속 기간, 피해를 입은 주민의 수, 비용을 감당할 수 있는 주체였다. 진행자는 각 발언을 경청한 뒤 핵심만 요약했다.", "O que a facilitadora faz antes de retomar a discussão?", ["Propõe critérios comuns e resume as falas depois de ouvi-las.", "Encerra a reunião sem registrar as propostas.", "Decide sozinha o valor da compensação."], "Propõe critérios comuns e resume as falas depois de ouvi-las.", "A condução passa pela definição de critérios e pela escuta antes da síntese."),
    reading("지연 씨가 속한 회사는 원청의 물량을 받아 처리하는 하청 업체였다. 원청은 안전 비용을 하청에 떠넘기고, 하청은 일정 변경을 거의 거부하지 못한다. 지연 씨가 거부권을 행사할 수 있는 범위는 넓지 않았다.", "O que a posição de subcontratada limita?", ["O poder de recusar mudanças e de exigir que os custos de segurança fiquem com a contratante.", "A possibilidade de trabalhar à noite e nos fins de semana.", "O direito de enviar e-mails e mensagens à contratante."], "O poder de recusar mudanças e de transferir os custos de segurança à contratante.", "A assimetria aparece na cadeia de contratos e reduz o espaço real de recusa."),
    reading("A안은 업체 대표의 설명으로 시작한다. '물류 비용 상승으로 야간 운행 축소가 불가피하다.' 그다음에 주민 대표의 반대가 짧게 붙는다. B안은 주민 대표의 발언으로 시작한다. '야간 소음으로 수면권이 침해되었다.' 업체의 설명은 그 뒤에 조건으로 제시된다.", "O que muda entre as duas atas?", ["A ordem dos blocos de fala e, com ela, a impressão sobre a responsabilidade.", "Os fatos registrados, que são incompatíveis entre si.", "A ausência total da fala da empresa na versão B."], "A ordem dos blocos de fala e, com ela, a impressão sobre a responsabilidade.", "As duas versões partem dos mesmos fatos, mas o recorte desloca a responsabilidade."),
    reading("두 문서 모두 사실을 바꾸지는 않았다. 그러나 한 문장을 빼자 책임소재가 다른 쪽으로 옮겨 갔다. 기록자는 모든 발언을 같은 비중으로 옮길 수 없다. 선택은 불가피하지만, 선택했다는 사실을 숨기면 투명성은 사라진다.", "Por que a seleção do relator precisa ficar visível?", ["Porque escolher é inevitável, mas esconder a escolha elimina a transparência.", "Porque o relator deve registrar literalmente cada palavra.", "Porque a ata não pode conter nenhuma interpretação."], "Porque escolher é inevitável, mas esconder a escolha elimina a transparência.", "A transparência está em mostrar o critério e o que ficou de fora, não em fingir ausência de recorte."),

    translate("pt-ko", "Traduza: “Do ponto de vista dos comerciantes, um dia com a loja fechada também é uma questão de sustento.”", "상인들 입장에서는 하루 영업 중단도 생계의 문제다.", "-ㄴ/는 입장에서는 apresenta o ponto de vista condicionado por interesses concretos.", ["상인들 입장에서는 하루 영업이 중단되는 것도 생계의 문제다."]),
    translate("ko-pt", "Traduza: 확률을 확정으로 바꾸는 순간, 결정은 근거가 아니라 인상에 기대게 된다.", "No momento em que a probabilidade vira certeza, a decisão passa a depender de impressão, não de evidência.", "근거 = evidência, fundamento; 인상 = impressão.", ["Quando a probabilidade é transformada em certeza, a decisão se apoia em impressão, e não em evidência."]),
    translate("pt-ko", "Traduza: “A ata registra a decisão, mas não substitui a deliberação.”", "회의록은 결정을 기록하지만 숙의를 대신하지는 않는다.", "숙의 = deliberação, exame ponderado anterior à decisão.", ["회의록은 결정을 남기지만 숙의를 대체하지는 않는다."]),
    translate("ko-pt", "Traduza: 거절할 수 없다면 동의한 것이 아니다.", "Se não se pode recusar, não se consentiu.", "동의하다 = consentir; a frase separa aceitação de consentimento.", ["Se não há possibilidade de recusa, não houve consentimento."]),
    translate("pt-ko", "Traduza: “Reescrever a fala do outro também é distribuir responsabilidade.”", "타인의 말을 다시 쓰는 일은 책임을 배분하는 일이기도 하다.", "책임을 배분하다 = distribuir, atribuir responsabilidade.", ["타인의 말을 다시 쓰는 것은 책임을 나누는 일이기도 하다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
