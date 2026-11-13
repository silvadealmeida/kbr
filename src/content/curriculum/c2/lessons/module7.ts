import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume a tarefa de mediação pedida: separa posições, interesses e limites, em vez de apenas opinar sobre o conflito." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e o texto avança do que foi dito para o que pode ser acordado, do acordo parcial para o que permanece aberto." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso da mediação, da deliberação e da negociação, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado ao gênero: registro, ata, memória ou mensagem profissional." },
  { criterion: "argument" as const, labelPt: "Qualidade da mediação", descriptorPt: "Distingue o que é negociável do que não é, sustenta a proposta com o que foi dito e nomeia o limite do acordo." },
  { criterion: "mediation" as const, labelPt: "Responsabilidade e representação", descriptorPt: "Reformula a fala das partes sem apagar divergências nem transferir a responsabilidade de quem a assumiu." },
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

/** c2-l31 — mediar posições incompatíveis sem prometer consenso. */
export const C2_L31 = defineC2Lesson({
  id: "c2-l31", number: 31, moduleId: "c2-m07", title: "Mediar o irreconciliável",
  objective: "Mediar posições incompatíveis sem fingir consenso.",
  prerequisites: ["c2-c06"], estimatedMinutes: 85, dialogueTitle: "O acordo que não fecha",
  intro: [
    {
      title: "Interesse, posição e o que não se negocia",
      body: "Na mediação, é preciso separar a posição — o que cada lado diz querer — do interesse que a sustenta. Também é preciso reconhecer que nem tudo é negociável: algumas posições se apoiam em direitos, valores ou condições de sobrevivência que não podem ser trocados por outro item. O papel de quem media não é cortar a diferença ao meio a qualquer custo, mas mapear onde há espaço de troca e onde não há. Dizer em voz alta que um ponto não será resolvido naquela mesa pode proteger o restante da negociação.",
      ko: "중재는 양쪽의 요구를 반으로 자르는 일이 아니라, 무엇이 교환 가능하고 무엇이 아닌지를 구분하는 일이다.",
    },
    {
      title: "Acordo parcial e limite explícito",
      body: "Um acordo parcial não é fracasso quando nomeia o que ficou aberto e quem cuidará disso. Fingir consenso apenas adia a ruptura. O registro deve separar três coisas: o que foi decidido, o que continua em disputa e qual é o próximo passo verificável. Esse limite protege sobretudo a parte com menos poder, porque impede que um consenso verbal seja reinterpretado depois por quem tem mais recursos para narrar o encontro.",
      ko: "합의하지 못한 부분을 기록하지 않으면, 그 부분은 나중에 다른 사람의 해석에 맡겨진다.",
    },
  ],
  dialogue: [
    ["유진", "오늘 논의는 철거 일정과 임시 상가 위치, 두 가지로 나눠 보겠습니다.", "Vamos dividir a discussão de hoje em dois pontos: o cronograma de demolição e a localização do mercado provisório."],
    ["명수", "일정은 조정할 수 있습니다. 하지만 시장 자체를 없애는 건 받아들일 수 없습니다.", "O cronograma pode ser ajustado. Mas eliminar o mercado em si é algo que não podemos aceitar."],
    ["하람", "저희도 시장을 없애려는 건 아닙니다. 다만 안전 기준을 맞추려면 일부 구역은 비워야 합니다.", "Nós também não queremos acabar com o mercado. Apenas precisamos liberar algumas áreas para atender às normas de segurança."],
    ["유진", "하람 씨, '일부 구역'이 어디까지인지 숫자로 말씀해 주시겠어요?", "Haram, o senhor poderia dizer em números até onde vai essa 'algumas áreas'?"],
    ["하람", "동쪽 두 동입니다. 나머지는 존치가 가능합니다.", "São os dois blocos do lado leste. O restante pode ser mantido."],
    ["명수", "그 두 동에는 생계를 걸고 있는 사람들이 있습니다. 대체 자리를 먼저 확정해 주셔야 합니다.", "Naqueles dois blocos há pessoas que dependem disso para viver. É preciso definir primeiro o espaço substituto."],
    ["유진", "그러면 일정과 구역은 조정 가능하고, 대체 자리 확정 전 철거는 논의에서 제외하겠습니다. 이 한계를 회의록에 적겠습니다.", "Então o cronograma e as áreas são negociáveis, e a demolição antes da definição do espaço substituto fica fora da discussão. Vou registrar esse limite na ata."],
    ["하람", "보상 금액은 오늘 결정하기 어렵습니다. 다음 회의까지 자료를 준비하겠습니다.", "O valor da indenização é difícil de decidir hoje. Vou preparar os documentos até a próxima reunião."],
  ],
  readingText: {
    titlePt: "Registro de uma mediação sem acordo completo",
    paragraphs: [
      "중재 회의는 9월 3일 오후 두 시에 시작되었다. 참석자는 상인회 대표 두 명, 시청 도시계획과 담당자 두 명, 중재자 한 명이었다. 안건은 동쪽 두 동의 철거 일정과 임시 상가 위치였다. 상인회는 철거 자체에 반대하지 않았지만, 대체 자리가 확정되기 전에는 짐을 옮길 수 없다고 밝혔다. 시청은 안전 기준상 11월까지 철거를 마쳐야 한다고 설명했다. 첫 한 시간 동안 어느 쪽도 쉽게 양보하지 않았고, 회의는 곧 교착 상태에 들어갔다. 중재자는 논의를 두 항목으로 나누자고 제안했다.",
      "하나는 철거 일정이고, 다른 하나는 대체 자리의 확정 시점이었다. 상인회는 일정을 두 주 늦춰 주는 대신, 첫째 주에 점포 목록을 제출하기로 했다. 시청은 목록을 받은 뒤 임시 상가 후보지를 문서로 통보하겠다고 했다. 다만 시청은 철거 전에 모든 점포의 이전이 끝나야 한다는 요구는 수용할 수 없다고 말했다. 이 지점에서 양쪽의 대립은 다시 드러났다. 중재자는 두 요구를 한 문장으로 합치지 않고, 각각의 조건으로 기록하라고 요청했다. 합의가 필요한 항목과 설명이 필요한 항목은 다르게 다뤄야 한다는 뜻이었다.",
      "회의는 완전한 합의 없이 끝났다. 그러나 두 가지는 문서에 남았다. 첫째, 철거 일정은 두 주 범위에서 조정한다. 둘째, 대체 자리가 확정되기 전에는 철거를 시작하지 않는다. 합의하지 못한 것은 보상 금액과 이전 비용의 분담이었다. 중재자는 이 항목을 다음 회의의 첫 안건으로 두자고 했다. 합의하지 못한 부분을 기록하지 않으면, 그 부분은 나중에 다른 사람의 해석에 맡겨진다. 회의록은 이 문장을 그대로 남겼다.",
    ],
    pt: "A reunião de mediação começou às duas da tarde de 3 de setembro. Participaram dois representantes da associação de comerciantes, dois responsáveis do Departamento de Planejamento Urbano da prefeitura e um mediador. A pauta era o cronograma de demolição dos dois blocos do lado leste e a localização do mercado provisório. A associação não se opunha à demolição em si, mas deixou claro que não podia mudar de lugar antes da definição do espaço substituto. A prefeitura explicou que, por critérios de segurança, a demolição precisa terminar até novembro. Durante a primeira hora, nenhum dos lados cedeu com facilidade, e a reunião logo entrou em impasse. O mediador propôs dividir a discussão em dois itens. Um era o cronograma de demolição; o outro, o momento de definição do espaço substituto. A associação aceitou que o cronograma fosse adiado em duas semanas e, em troca, entregar a lista de lojas na primeira semana. A prefeitura disse que, após receber a lista, comunicaria por documento as opções de local provisório. No entanto, afirmou que não podia aceitar a exigência de concluir a mudança de todas as lojas antes da demolição. Nesse ponto, o confronto entre os dois lados voltou a aparecer. O mediador pediu que as duas exigências não fossem fundidas numa única frase, mas registradas como condições separadas. Isso significava tratar de modo diferente os itens que exigem acordo e os que exigem explicação. A reunião terminou sem acordo completo. Mesmo assim, dois pontos ficaram registrados. Primeiro, o cronograma de demolição será ajustado dentro de um intervalo de duas semanas. Segundo, a demolição não começará antes da definição do espaço substituto. O que não foi acordado foi o valor da indenização e a divisão dos custos de mudança. O mediador propôs que esse item fosse o primeiro da pauta da próxima reunião. Se a parte não acordada não for registrada, ela fica mais tarde entregue à interpretação de outra pessoa. A ata manteve essa frase tal como foi dita.",
    objective: "Reconhecer o limite do acordo e o que permanece aberto no registro da mediação.",
  },
  reusedIds: ["ko:양보하다", "ko:대립", "ko:문서", "ko:통보"],
  grammar: [
    [
      "-ㄴ/는 입장에서는 — do ponto de vista de",
      "명사 + 의 입장에서는 / 동사 + -는 입장에서는 / 형용사 + -(으)ㄴ 입장에서는",
      "Apresenta o ponto de vista a partir do qual uma afirmação faz sentido, sobretudo quando os interesses divergem. Não é apenas 'na opinião de'; a forma indica uma posição condicionada por circunstâncias. Compare com -에 따르면, que atribui a informação a uma fonte, e com -에게는, que indica quem é afetado. Em mediação, usar essa forma ajuda a reconhecer a legitimidade parcial de cada lado sem transformar todas as posições em equivalentes.",
      [
        ["상인들 입장에서는 하루 영업 중단도 생계의 문제다.", "Do ponto de vista dos comerciantes, até um dia de loja fechada é uma questão de sustento."],
        ["시청 입장에서는 안전 기준을 낮출 수 없다는 점도 이해해야 한다.", "Também é preciso entender que, do ponto de vista da prefeitura, não se pode baixar as normas de segurança."],
      ],
    ],
    [
      "-도록 중재하다 — mediar para que",
      "동사 + -도록 중재하다 / -도록 조정하다 / -도록 이끌다",
      "Descreve a ação de quem media para produzir um resultado, sem atribuir a decisão às partes. O sujeito é o mediador, e o verbo principal explicita o papel dele. Compare com -게 하다, causativo mais geral, e com -도록 하다, que costuma dar instruções ao interlocutor. A forma é comum em registros de reunião e relatórios de processo, porque nomeia a intervenção sem esconder a agência de quem a realiza.",
      [
        ["중재자는 양쪽이 같은 자료를 보도록 중재했다.", "O mediador atuou para que os dois lados vissem os mesmos documentos."],
        ["갈등이 확대되지 않도록 중재하는 일이 먼저였다.", "Antes de tudo, era preciso mediar para que o conflito não se ampliasse."],
      ],
    ],
  ],
  guided: [
    mcq("O que a mediadora faz ao separar o cronograma do local provisório?", ["Transforma a disputa em um item negociável e um limite que não será decidido naquela reunião.", "Promete que as partes chegarão a um acordo completo antes de sair.", "Decide sozinha o valor da indenização."], "Transforma a disputa em um item negociável e um limite que não será decidido naquela reunião.", "A separação permite trocar o que é trocável e registrar o que não será votado naquele encontro."),
    cloze("Complete o impasse registrado na ata: 회의는 곧 ___ 상태에 들어갔다.", "교착", "-교착 상태 descreve a paralisia em que nenhuma das partes consegue avançar."),
    listen("Ouça e escreva o limite que a mediadora registra na ata.", "일정과 구역은 조정 가능하고, 대체 자리 확정 전 철거는 논의에서 제외하겠습니다.", "일정과 구역은 조정 가능하고, 대체 자리 확정 전 철거는 논의에서 제외하겠습니다.", "O cronograma e as áreas são negociáveis, e a demolição antes da definição do espaço substituto fica fora da discussão."),
    translate("pt-ko", "Traduza: “Do ponto de vista dos comerciantes, um dia com a loja fechada também é uma questão de sustento.”", "상인들 입장에서는 하루 영업 중단도 생계의 문제다.", "-ㄴ/는 입장에서는 apresenta uma posição condicionada por interesses concretos.", ["상인들 입장에서는 하루 영업이 중단되는 것도 생계의 문제다."]),
    reading("상인회는 일정을 두 주 늦춰 주는 대신, 첫째 주에 점포 목록을 제출하기로 했다. 시청은 목록을 받은 뒤 임시 상가 후보지를 문서로 통보하겠다고 했다. 다만 시청은 철거 전에 모든 점포의 이전이 끝나야 한다는 요구는 수용할 수 없다고 말했다.", "O que o acordo parcial define sobre a ordem das ações?", ["A lista de lojas vem primeiro, e a prefeitura deve comunicar por documento os locais provisórios.", "A demolição começa antes da entrega da lista de lojas.", "A prefeitura paga toda a indenização antes de receber a lista."], "A lista de lojas vem primeiro, e a prefeitura deve comunicar por documento os locais provisórios.", "O registro fixa uma sequência verificável: lista, comunicação documental, depois as etapas seguintes."),
  ],
  independent: [
    mcq("Qual definição de acordo parcial corresponde ao texto?", ["Registra o que foi acordado, o que ficou aberto e quem dará o próximo passo.", "Exige que todos declarem consenso para encerrar a reunião.", "Adia todos os pontos para uma única decisão final."], "Registra o que foi acordado, o que ficou aberto e quem dará o próximo passo.", "O acordo parcial não apaga o desacordo; ele o nomeia e distribui o próximo passo."),
    cloze("Complete o ponto em que o desacordo reaparece: 이 지점에서 양쪽의 ___은 다시 드러났다.", "대립", "-대립 nomeia a oposição entre posições que o acordo parcial não eliminou."),
    listen("Ouça e escreva por que a mediação não é cortar a diferença ao meio.", "중재는 양쪽의 요구를 반으로 자르는 일이 아니라, 무엇이 교환 가능하고 무엇이 아닌지를 구분하는 일이다.", "중재는 양쪽의 요구를 반으로 자르는 일이 아니라, 무엇이 교환 가능하고 무엇이 아닌지를 구분하는 일이다.", "Mediar não é cortar as exigências dos dois lados ao meio, mas distinguir o que é trocável do que não é."),
    translate("ko-pt", "Traduza: 합의하지 못한 부분을 기록하지 않으면, 그 부분은 나중에 다른 사람의 해석에 맡겨진다.", "Se a parte não acordada não for registrada, ela fica mais tarde entregue à interpretação de outra pessoa.", "해석에 맡겨지다 = ficar entregue à interpretação de alguém.", ["Se a parte que não foi acordada não for registrada, ela acaba entregue depois à interpretação de outra pessoa."]),
    reading("회의는 완전한 합의 없이 끝났다. 그러나 두 가지는 문서에 남았다. 첫째, 철거 일정은 두 주 범위에서 조정한다. 둘째, 대체 자리가 확정되기 전에는 철거를 시작하지 않는다. 합의하지 못한 것은 보상 금액과 이전 비용의 분담이었다.", "Por que registrar o que não foi acordado protege o processo?", ["Porque impede que a parte aberta seja decidida depois por quem não participou da mediação.", "Porque garante que o acordo completo será assinado na mesma reunião.", "Porque elimina a necessidade de uma próxima reunião."], "Porque impede que a parte aberta seja decidida depois por quem não participou da mediação.", "Sem registro, o ponto aberto volta ao controle de quem tiver poder para reinterpretá-lo."),
  ],
  summary: [
    "Mediação começa por separar posição, interesse e limite do que pode ser trocado.",
    "Acordo parcial não é fracasso quando nomeia o que ficou aberto e o próximo passo.",
    "-ㄴ/는 입장에서는 apresenta o ponto de vista condicionado por interesses e circunstâncias.",
    "-도록 중재하다 nomeia a intervenção do mediador sem atribuir a decisão às partes.",
    "Registrar o desacordo impede que ele seja reinterpretado depois por quem não estava na mesa.",
  ],
  production: production(
    "Produção independente · proposta de mediação com limite",
    "Pense em um conflito real ou plausível entre duas partes com interesses incompatíveis. Escreva uma proposta de mediação que separe o que pode ser negociado do que não pode, registre um acordo parcial e nomeie explicitamente o ponto que permanece aberto.",
    "양립하기 어려운 두 입장을 다루는 중재안을 쓰고, 합의 가능한 부분과 남겨 둘 한계를 분명히 밝혀 보세요.",
    ["Diga qual é o ponto de partida de cada parte, sem caricaturar nenhuma delas.", "Separe um item negociável de um limite que não será decidido agora.", "Use -ㄴ/는 입장에서는 ao menos uma vez.", "Use -도록 중재하다 ou -도록 조정하다 ao menos uma vez.", "Termine com o que fica aberto e quem fará o próximo passo."],
    ["Duas posições apresentadas com precisão.", "Item negociável e limite separados.", "Acordo parcial registrado.", "Duas formas-alvo empregadas com função clara.", "Ponto aberto e próximo passo nomeados."],
    "두 동의 철거를 둘러싼 갈등에서 중재안을 다음과 같이 제안한다. 상인회 입장에서는 영업 중단 하루도 생계의 문제이므로, 이전 일정은 협의 대상이 되어야 한다. 시청 입장에서는 안전 기준을 낮출 수 없으므로, 철거 시한을 무기한 미루기는 어렵다. 따라서 나는 두 항목을 분리할 것을 제안한다. 첫째, 철거 일정은 두 주 범위에서 조정한다. 둘째, 대체 자리가 문서로 확정되기 전에는 철거를 시작하지 않는다. 대신 나는 상인회가 첫째 주까지 점포 목록을 제출하도록 중재한다. 보상 금액과 이전 비용의 분담은 오늘 결정하지 않는다. 이 항목은 다음 회의의 첫 안건으로 남긴다. 이 중재안은 완전한 합의를 약속하지 않는다. 다만 양쪽이 무엇을 얻고 무엇을 얻지 못했는지 분명히 남긴다.",
    "Proponho a seguinte mediação para o conflito em torno da demolição dos dois blocos. Do ponto de vista da associação de comerciantes, um único dia de interrupção das vendas já é uma questão de sustento; por isso, o cronograma da mudança deve ser negociável. Do ponto de vista da prefeitura, não se pode baixar as normas de segurança; por isso, é difícil adiar o prazo da demolição por tempo indeterminado. Proponho, portanto, separar os dois itens. Primeiro, o cronograma de demolição será ajustado dentro de um intervalo de duas semanas. Segundo, a demolição não começará antes que o espaço substituto seja confirmado por documento. Em troca, atuo para que a associação entregue a lista de lojas até a primeira semana. O valor da indenização e a divisão dos custos de mudança não serão decididos hoje. Esse item fica como primeiro ponto da pauta da próxima reunião. Esta proposta não promete um acordo completo. Apenas deixa claro o que cada lado ganha e o que não ganha.",
    "Exemplo original. Observe que a proposta separa interesse, item negociável e limite, sem declarar consenso onde ele não existe. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l32 — reformular discurso técnico sem transformar probabilidade em certeza. */
export const C2_L32 = defineC2Lesson({
  id: "c2-l32", number: 32, moduleId: "c2-m07", title: "Reformular o técnico",
  objective: "Reformular discurso técnico para decisores sem perder a incerteza.",
  prerequisites: ["c2-l31"], estimatedMinutes: 85, dialogueTitle: "O número que não decide sozinho",
  intro: [
    {
      title: "Levar o risco até a decisão sem fechar a incerteza",
      body: "Um relatório técnico trabalha com probabilidades, margens de erro e cenários. Quem decide, porém, precisa de uma frase acionável. O risco da reformulação está em transformar '1,4 vez mais provável sob certas condições' em 'vai acontecer'. Uma boa mediação técnica diz o que se sabe, o que se estima e o que se ignora, e mostra qual decisão muda com cada hipótese. A incerteza não é um detalhe a ser cortado: ela é parte da informação.",
      ko: "추정치를 확정된 사실처럼 말하면, 결정은 근거가 아니라 인상에 기대게 된다.",
    },
    {
      title: "Analogia, escala e limite",
      body: "Analogias ajudam um leigo a imaginar a ordem de grandeza, mas escondem a escala e o recorte do modelo. Dizer que 'é como um acidente de trânsito por dia' pode comunicar urgência e, ao mesmo tempo, apagar a diferença entre mortes confirmadas e casos estimados. A analogia responsável vem com o ponto em que deixa de valer. Para o decisor, o teste é simples: a frase permite comparar opções, ou apenas produz medo ou alívio?",
      ko: "비유는 규모를 상상하게 해 주지만, 어디까지 맞는지는 따로 말해야 한다.",
    },
  ],
  dialogue: [
    ["지안", "이번 보고서는 폭염으로 인한 응급실 방문이 지금보다 1.4배 늘 수 있다고 추정합니다.", "Este relatório estima que as visitas ao pronto-socorro por causa da onda de calor podem aumentar cerca de 40% a mais (1,4 vez o valor atual)."],
    ["태오", "1.4배면 주민들이 바로 대피해야 한다는 뜻입니까?", "1,4 vez significa um aumento de cerca de 40%, e não que os moradores devam evacuar imediatamente?"],
    ["지안", "그 수치는 평균 기온 상승 시나리오에 따른 추정치입니다. 지역과 연령에 따라 차이가 큽니다.", "Esse número é uma estimativa baseada no cenário de aumento da temperatura média. A diferença é grande conforme a região e a faixa etária."],
    ["미라", "그럼 '위험이 크다'고 말해도 됩니까?", "Então podemos dizer que 'o risco é grande'?"],
    ["지안", "크다고 말하려면 비교 기준이 필요합니다. 저희는 65세 이상 단독가구를 우선 대상으로 봅니다.", "Para dizer que é grande, é preciso um critério de comparação. Consideramos prioritárias as pessoas acima de 65 anos que moram sozinhas."],
    ["태오", "예산을 어디에 먼저 써야 합니까?", "Onde devemos gastar o orçamento primeiro?"],
    ["미라", "그 가정이 틀리면 어떻게 됩니까?", "E se essa suposição estiver errada?"],
    ["지안", "가정이 틀리면 효과도 줄어듭니다. 그래서 확정된 결론이 아니라 조건부 권고로 말씀드립니다.", "Se a suposição estiver errada, o efeito também diminui. Por isso falo de uma recomendação condicional, não de uma conclusão fechada."],
  ],
  readingText: {
    titlePt: "Do resumo técnico à nota para quem decide",
    paragraphs: [
      "도시 열섬 대응 연구는 2021년부터 2024년까지의 기온과 응급실 방문 기록을 결합했다. 분석 결과, 폭염이 사흘 이상 이어질 때 65세 이상 단독가구의 응급실 방문이 평균 1.4배 늘었다. 이 수치는 도시 전체의 평균이며, 지역별 차이는 크다. 녹지가 적은 구역에서는 1.8배까지 올라갔고, 냉방 시설이 잘 갖춰진 구역에서는 1.1배에 그쳤다. 연구팀은 이 차이를 인구 구성과 주거 형태로 설명했다. 다만 표본이 5개 구역에 한정되어 있다는 한계도 있다.",
      "보고서는 이 추정치를 확정된 예측으로 읽지 말 것을 요청한다. 1.4배라는 숫자는 평균 기온이 1.5도 오른다는 시나리오를 가정한 결과다. 기온 상승 폭이 작으면 위험은 낮아지고, 크면 더 높아진다. 연구팀은 모형의 민감도를 함께 공개했다. 냉방 시설의 이용률을 10퍼센트 높게 잡으면 위험은 눈에 띄게 줄어든다. 반대로 단독가구의 실내 체류 시간을 낮게 잡으면 위험은 커진다. 오차범위를 빼고 숫자만 말하면, 결정권자는 위험을 실제보다 단순하게 이해하게 된다.",
      "정책 메모는 이 내용을 결정권자의 언어로 다시 썼다. 메모는 '위험이 크다'는 표현 대신 '65세 이상 단독가구의 응급실 방문이 1.4배 늘 수 있다'고 적었다. 그리고 이 문장 뒤에 '이 추정은 특정 가정에 기반하며, 구역별 차이가 크다'는 문장을 붙였다. 마지막에는 우선 확인할 대상과 예산의 쓰임을 제안했다. 추정치를 확정된 사실처럼 말하면 결정이 잘못된다. 확률을 확정으로 바꾸는 순간, 결정은 근거가 아니라 인상에 기대게 된다. 비전문가도 판단할 수 있게 쓴다는 것은 숫자를 지우는 일이 아니라, 숫자가 무엇을 전제하는지 함께 보여 주는 일이다.",
    ],
    pt: "Um estudo sobre ilhas de calor urbanas combinou registros de temperatura e de visitas ao pronto-socorro de 2021 a 2024. A análise mostrou que, quando a onda de calor dura três dias ou mais, as visitas ao pronto-socorro de pessoas acima de 65 anos que moram sozinhas aumentam cerca de 40% (chegam a 1,4 vez o valor atual). Esse número é a média da cidade inteira, e a diferença entre regiões é grande. Em áreas com pouca vegetação, chegou a 1,8 vez; em áreas bem equipadas com refrigeração, ficou em 1,1 vez. A equipe explicou a diferença pela composição da população e pelo tipo de moradia. Há também o limite de a amostra se restringir a cinco regiões. O relatório pede que essa estimativa não seja lida como previsão fechada. O número de 1,4 vez é resultado de uma suposição de aumento de 1,5 grau na temperatura média. Se a alta for menor, o risco cai; se for maior, sobe. A equipe divulgou junto a sensibilidade do modelo. Se a taxa de uso da refrigeração for estimada dez por cento mais alta, o risco diminui de forma visível. Ao contrário, se o tempo de permanência em casa das pessoas que moram sozinhas for estimado mais baixo, o risco cresce. Falar apenas os números, sem a margem de erro, faz o tomador de decisão entender o risco de forma mais simples do que ele é. A nota de política reescreveu o conteúdo na linguagem de quem decide. Em vez da expressão 'o risco é grande', registrou que 'as visitas ao pronto-socorro de pessoas acima de 65 anos que moram sozinhas podem aumentar 1,4 vez'. E acrescentou, depois dessa frase, que 'a estimativa se baseia em suposições específicas e varia muito por região'. No final, propôs os públicos a confirmar primeiro e o uso do orçamento. Dizer uma estimativa como se fosse fato confirmado leva a decisões erradas. No momento em que a probabilidade vira certeza, a decisão passa a depender de impressão, não de evidência. Escrever para que um leigo também possa julgar não é apagar os números, mas mostrar junto o que os números pressupõem.",
    objective: "Comparar precisão técnica e utilidade para a decisão, localizando a incerteza que a reformulação preserva.",
  },
  reusedIds: ["ko:근거", "ko:한계", "ko:시나리오", "ko:확률"],
  grammar: [
    [
      "-ㄴ/는 식으로 — da forma como; no sentido de",
      "동사 + -는 식으로 / 형용사 + -(으)ㄴ 식으로 / 명사 + (이)라는 식으로",
      "Descreve um modo de formular, não um método técnico. Muitas vezes carrega avaliação crítica: 'desse jeito' pode soar redutor. Compare com -는 방식으로, que descreve um procedimento de modo neutro, e com -는 셈이다, que tira uma conclusão. Em texto técnico reformulado, a forma serve para citar a versão simplificada e mostrar o que ela perde.",
      [
        ["'위험이 크다'는 식으로 말하면 확률이 사라진다.", "Falar no sentido de 'o risco é grande' faz a probabilidade desaparecer."],
        ["보고서는 결론을 단정하는 식으로 쓰이지 않았다.", "O relatório não foi escrito de um modo que fechasse a conclusão."],
      ],
    ],
    [
      "-ㄹ 수 있게 — de modo que se possa",
      "동사 + -ㄹ 수 있게",
      "Indica que uma reformulação cria a possibilidade de compreender, comparar ou decidir. O foco está na capacidade habilitada, não apenas no propósito. Compare com -도록, que também expressa finalidade, mas é mais amplo, e com -게, que descreve modo. A forma é frequente em recomendações a públicos não especializados.",
      [
        ["비전문가도 이해할 수 있게 수치를 풀어 썼다.", "Reescrevi os números de forma que um leigo também pudesse entender."],
        ["결정권자가 위험의 크기를 비교할 수 있게 표를 붙였다.", "Acrescentei uma tabela para que o tomador de decisão pudesse comparar a dimensão do risco."],
      ],
    ],
  ],
  guided: [
    mcq("O que a pesquisadora preserva ao chamar 1,4 de estimativa?", ["A dependência de cenário, região e faixa etária, em vez de apresentar o número como certeza.", "A certeza de que todos os moradores devem evacuar imediatamente.", "A decisão final sobre o orçamento municipal."], "A dependência de cenário, região e faixa etária, em vez de apresentar o número como certeza.", "A palavra 'estimativa' mantém o número ligado às suposições que o produziram."),
    cloze("Complete a crítica à simplificação: '위험이 크다'는 ___ 말하면 확률이 사라진다.", "식으로", "-ㄴ/는 식으로 nomeia o modo de formular e pode marcar que ele é redutor."),
    listen("Ouça e escreva o que a pesquisadora diz sobre o número de 1,4 vez.", "그 수치는 평균 기온 상승 시나리오에 따른 추정치입니다.", "그 수치는 평균 기온 상승 시나리오에 따른 추정치입니다.", "Esse número é uma estimativa baseada no cenário de aumento da temperatura média."),
    translate("pt-ko", "Traduza: “É preciso dizer o que é estimativa e o que é fato confirmado.”", "무엇이 추정치이고 무엇이 확인된 사실인지 말해야 한다.", "A frase separa estimativa e fato confirmado, preservando a incerteza na reformulação.", ["무엇이 추정치인지 무엇이 확인된 사실인지 말해야 한다."]),
    reading("1.4배라는 숫자는 평균 기온이 1.5도 오른다는 시나리오를 가정한 결과다. 기온 상승 폭이 작으면 위험은 낮아지고, 크면 더 높아진다. 연구팀은 모형의 민감도를 함께 공개했다.", "Por que o relatório pede que não se leia a estimativa como previsão fechada?", ["Porque o número depende de suposições sobre temperatura, uso de refrigeração e tempo em casa.", "Porque o estudo não mediu nenhuma visita ao pronto-socorro.", "Porque a prefeitura já decidiu o orçamento antes do relatório."], "Porque o número depende de suposições sobre temperatura, uso de refrigeração e tempo em casa.", "A estimativa é condicionada por um cenário e por variáveis que mudam o resultado."),
  ],
  independent: [
    mcq("Qual frase usa uma analogia de forma responsável?", ["A analogia ajuda a imaginar a escala, mas vem acompanhada do ponto em que deixa de valer.", "A analogia substitui os dados porque o público não entende números.", "A analogia serve para provar que o risco é certo."], "A analogia ajuda a imaginar a escala, mas vem acompanhada do ponto em que deixa de valer.", "A analogia responsável ilumina uma relação e declara o próprio limite."),
    cloze("Complete a recomendação de escrita para leigos: 비전문가도 ___ 수치를 풀어 썼다.", "이해할 수 있게", "-ㄹ 수 있게 indica a capacidade que a reformulação deve habilitar."),
    listen("Ouça e escreva o efeito de tratar uma estimativa como fato.", "추정치를 확정된 사실처럼 말하면 결정이 잘못된다.", "추정치를 확정된 사실처럼 말하면 결정이 잘못된다.", "Dizer uma estimativa como se fosse fato confirmado leva a decisões erradas."),
    translate("ko-pt", "Traduza: 확률을 확정으로 바꾸는 순간, 결정은 근거가 아니라 인상에 기대게 된다.", "No momento em que a probabilidade vira certeza, a decisão passa a depender de impressão, não de evidência.", "근거 = evidência, fundamento; 인상 = impressão.", ["Quando a probabilidade é transformada em certeza, a decisão se apoia em impressão, e não em evidência."]),
    reading("정책 메모는 이 내용을 결정권자의 언어로 다시 썼다. 메모는 '위험이 크다'는 표현 대신 '65세 이상 단독가구의 응급실 방문이 1.4배 늘 수 있다'고 적었다. 그리고 이 문장 뒤에 '이 추정은 특정 가정에 기반하며, 구역별 차이가 크다'는 문장을 붙였다.", "O que a nota de política acrescenta à frase sobre o aumento?", ["A condição de que a estimativa se baseia em suposições e varia por região.", "A garantia de que o aumento já ocorreu em toda a cidade.", "A retirada de todos os números do documento."], "A condição de que a estimativa se baseia em suposições e varia por região.", "A nota mantém o número e acrescenta a condição que impede lê-lo como certeza."),
  ],
  summary: [
    "Reformular para decisores exige dizer o que se sabe, o que se estima e o que se ignora.",
    "-ㄴ/는 식으로 nomeia um modo de formular e pode sinalizar que ele é redutor.",
    "-ㄹ 수 있게 indica a compreensão ou a comparação que a reformulação deve tornar possível.",
    "Analogias ajudam a imaginar a escala, mas precisam vir com o ponto em que deixam de valer.",
    "Substituir probabilidade por certeza muda a decisão de base: ela passa da evidência para a impressão.",
  ],
  production: production(
    "Produção independente · risco técnico para um decisor",
    "Escolha um risco técnico — climático, sanitário, financeiro ou de infraestrutura — e escreva uma nota curta para alguém que precisa decidir. Mantenha a incerteza, indique o que é estimativa e o que é fato, e proponha uma ação condicionada.",
    "기술적 위험을 결정권자에게 설명하되, 추정과 사실을 구분하고 불확실성을 지우지 마세요.",
    ["Diga qual é o número ou a estimativa central e de que cenário ele depende.", "Separe explicitamente fato confirmado, estimativa e lacuna.", "Use -ㄴ/는 식으로 ao menos uma vez.", "Use -ㄹ 수 있게 ao menos uma vez.", "Termine com uma ação condicionada, não com uma promessa de certeza."],
    ["Estimativa e fato confirmado separados.", "Cenário ou suposição nomeados.", "Duas formas-alvo empregadas com função clara.", "Ação condicionada proposta.", "Nenhuma certeza inventada."],
    "이번 폭염 대책을 검토하는 분께 다음 내용을 보고드립니다. 연구 결과, 폭염이 사흘 이상 이어질 때 65세 이상 단독가구의 응급실 방문이 평균 1.4배 늘었습니다. 다만 이 수치는 평균 기온이 1.5도 오른다는 시나리오에 따른 추정치이며, 구역별 차이가 큽니다. 확인된 사실은 방문 증가가 관찰되었다는 점이고, 추정인 부분은 앞으로의 증가 폭입니다. 저는 '위험이 크다'는 식으로 말하기보다, 어느 집단에서 어떤 조건일 때 위험이 커지는지를 함께 제시하는 편이 낫다고 봅니다. 그래서 냉방 쉼터 두 곳을 먼저 늘리는 안을 조건부로 권고합니다. 이 결정은 실내 체류 시간과 냉방 이용률에 대한 가정이 맞을 때 효과가 있습니다. 결정권자가 두 안의 비용과 효과를 비교할 수 있게 표를 함께 첨부했습니다.",
    "Reporto o seguinte a quem está avaliando as medidas para esta onda de calor. O estudo mostrou que, quando a onda de calor dura três dias ou mais, as visitas ao pronto-socorro de pessoas acima de 65 anos que moram sozinhas aumentam cerca de 40% (chegam a 1,4 vez o valor atual). No entanto, esse número é uma estimativa baseada no cenário de aumento de 1,5 grau na temperatura média, e a diferença entre regiões é grande. O fato confirmado é que foi observado um aumento das visitas; a parte estimada é a dimensão desse aumento no futuro. Considero melhor do que dizer no sentido de que 'o risco é grande' apresentar juntos em qual grupo e sob quais condições o risco cresce. Por isso, recomendo condicionalmente a ampliação de dois centros de refrigeração. Essa decisão terá efeito se as suposições sobre tempo de permanência em casa e uso da refrigeração estiverem corretas. Anexei uma tabela para que o tomador de decisão possa comparar custo e efeito das duas opções.",
    "Exemplo original. Observe que a nota separa fato, estimativa e lacuna, e que a recomendação é condicional. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l33 — conduzir deliberação com turnos, critérios e síntese. */
export const C2_L33 = defineC2Lesson({
  id: "c2-l33", number: 33, moduleId: "c2-m07", title: "Conduzir a deliberação",
  objective: "Facilitar uma deliberação pública com turnos, critérios e síntese.",
  prerequisites: ["c2-l32"], estimatedMinutes: 85, dialogueTitle: "A audiência que não terminou em votação",
  intro: [
    {
      title: "Turnos, critérios e o que a ata transforma",
      body: "Facilitar não é apenas dar a palavra. Quem conduz distribui tempo, define a ordem, propõe critérios e decide o que entra no registro. Essas escolhas mudam o peso de cada fala. Quando os critérios são acordados antes das propostas, as partes passam a discutir parâmetros comuns em vez de força ou simpatia. A ata, por sua vez, não é uma transcrição neutra: ela transforma fala em decisão, opinião em encaminhamento e divergência em item de pauta.",
      ko: "회의록은 말을 그대로 옮기는 문서가 아니라, 무엇을 결정으로 남길지 고르는 문서다.",
    },
    {
      title: "Síntese que registra divergência",
      body: "Uma síntese responsável não pretende eliminar o conflito. Ela separa o que foi decidido, o que foi apenas discutido e o que ficou pendente. Também preserva a opinião minoritária, mesmo quando o encaminhamento segue outra direção. Apagar a divergência pode parecer eficiência no dia seguinte, mas cobra um preço alto depois: quem se sentiu apagado deixa de reconhecer a ata como registro do que aconteceu.",
      ko: "합의를 만드는 일과 이견을 지우는 일은 다르다.",
    },
  ],
  dialogue: [
    ["수현", "오늘은 발언권을 순서대로 드리고, 판단 기준을 먼저 정하겠습니다.", "Hoje vou conceder a palavra na ordem e definir primeiro os critérios de julgamento."],
    ["경호", "기준부터 정한다고요? 소음 피해는 이미 몇 년째 계속되고 있습니다.", "Definir critérios primeiro? O dano do barulho já continua há anos."],
    ["수현", "피해 기간도 기준에 넣겠습니다. 다만 오늘 결정할 수 있는 범위와 다음 회의로 넘길 범위를 나눠야 합니다.", "O tempo de dano também entrará nos critérios. Mas precisamos separar o que pode ser decidido hoje do que será levado à próxima reunião."],
    ["나영", "저희는 야간 운행을 줄일 수 있습니다. 대신 물류 비용이 늘어나는 부분은 보상이 필요합니다.", "Podemos reduzir a operação noturna. Em troca, a parte em que os custos logísticos aumentam precisa de compensação."],
    ["경호", "보상보다 먼저 주민의 수면권이 보장되어야 합니다.", "Antes da compensação, é preciso garantir o direito ao sono dos moradores."],
    ["수현", "두 요구를 따로 적겠습니다. 야간 운행 축소는 협의 가능한 안건이고, 보상 범위는 다음 회의로 넘기겠습니다.", "Vou registrar as duas exigências separadamente. A redução da operação noturna é um item negociável, e a faixa de compensação fica para a próxima reunião."],
    ["나영", "다음 회의까지 운영 자료를 제출하겠습니다.", "Vou entregar os dados operacionais até a próxima reunião."],
    ["수현", "그러면 오늘 결정은 두 가지입니다. 두 안을 모두 기록하고, 소수의견도 삭제하지 않겠습니다.", "Então hoje temos duas decisões. Vou registrar as duas propostas e também não apagarei a opinião minoritária."],
  ],
  readingText: {
    titlePt: "Ata de uma audiência pública",
    paragraphs: [
      "공청회는 10월 7일 저녁 일곱 시에 시청 대회의실에서 열렸다. 참석자는 주민 대표 세 명, 물류업체 대표 두 명, 시의원 두 명이었다. 진행자는 회의 시작 전에 두 가지를 확인했다. 첫째, 발언 시간은 한 사람당 삼 분이다. 둘째, 오늘 결정할 수 있는 사항과 다음 회의로 넘길 사항을 구분해 기록한다. 발언권은 진행자가 순서에 따라 부여했다. 첫 발언에서 주민 대표는 야간 소음이 수년째 계속되었다고 말했다. 업체 대표는 야간 운행을 줄일 수 있지만 물류 비용이 늘어난다고 답했다.",
      "진행자는 감정이 높아진 발언을 중간에 멈추고, 판단 기준을 먼저 합의하자고 제안했다. 기준은 세 가지였다. 피해의 지속 기간, 피해를 입은 주민의 수, 비용을 감당할 수 있는 주체였다. 진행자는 각 발언을 경청한 뒤 핵심만 요약했다. 이 기준에 따라 논의를 다시 시작하자, 요구는 조금씩 구체화되었다. 주민 대표는 야간 운행을 열한 시까지로 제한할 것을 요구했다. 업체 대표는 열두 시까지는 허용해 달라고 했다. 진행자는 두 안을 모두 기록하고, 나머지 시간에는 보상 범위를 논의하자고 이끌었다.",
      "표결은 충분한 논의 뒤에 진행하기로 했지만, 정족수가 채워지지 않아 다음 회의로 미뤄졌다. 대신 두 가지는 오늘 결정되었다. 야간 운행 축소는 협의 가능한 안건으로 남긴다. 보상 범위는 다음 회의의 첫 안건으로 올린다. 소수의견은 회의록에 그대로 남겼다. 한 주민 대표는 야간 운행 제한만으로는 수면권이 보장되지 않는다고 주장했다. 진행자는 이 의견을 삭제하지 않고, 권고안 작성 시 별도 항목으로 다루겠다고 밝혔다. 숙의는 결론을 서두르지 않고 쟁점을 검토하는 과정이다. 회의록은 이 문장을 첫 줄에 적었다.",
    ],
    pt: "A audiência pública foi realizada às sete da noite de 7 de outubro, no salão de reuniões da prefeitura. Participaram três representantes dos moradores, dois representantes da empresa de logística e dois vereadores. Antes de começar, a facilitadora confirmou dois pontos. Primeiro, o tempo de fala seria de três minutos por pessoa. Segundo, os assuntos que podiam ser decididos naquele dia seriam registrados separadamente dos que passariam à próxima reunião. A palavra foi concedida pela facilitadora conforme a ordem. Na primeira fala, o representante dos moradores disse que o barulho noturno se prolongava por anos. O representante da empresa respondeu que podia reduzir a operação noturna, mas que os custos logísticos aumentariam. A facilitadora interrompeu as falas mais exaltadas e propôs acordar primeiro os critérios de julgamento. Eram três: a duração do dano, o número de moradores afetados e quem poderia arcar com os custos. A facilitadora ouviu cada fala com atenção e resumiu apenas o essencial. Quando a discussão recomeçou com base nesses critérios, as exigências foram ficando mais concretas. Os moradores pediram que a operação noturna fosse limitada até as onze da noite. A empresa pediu que fosse permitida até meia-noite. A facilitadora registrou as duas propostas e conduziu o restante do tempo para a discussão da faixa de compensação. Ficou decidido que a votação ocorreria após discussão suficiente, mas o quórum não foi atingido, e ela foi adiada para a reunião seguinte. Em troca, dois pontos foram decididos naquele dia. A redução da operação noturna permanece como item negociável. A faixa de compensação entra como primeiro item da próxima reunião. A opinião minoritária foi registrada na ata sem alterações. Um representante dos moradores argumentou que limitar a operação noturna, por si só, não garantiria o direito ao sono. A facilitadora não apagou essa opinião e declarou que ela seria tratada como item separado na elaboração da recomendação. A deliberação é o processo de examinar os pontos em disputa sem apressar a conclusão. A ata registrou essa frase na primeira linha.",
    objective: "Reconhecer como a ata transforma fala em decisão, preservando critérios, divergências e pendências.",
  },
  reusedIds: ["ko:발언권", "ko:경청", "ko:삭제", "ko:회의록"],
  grammar: [
    [
      "-ㄴ/는 자리에서 — no espaço/ocasião de",
      "동사 + -는 자리에서 / 형용사 + -(으)ㄴ 자리에서 / 명사 + 자리에서",
      "Refere-se a uma ocasião oficial ou pública, não a um lugar físico qualquer. É comum em atas, discursos e relatos de reunião. Compare com -는 회의에서, mais literal, e com -는 과정에서, que fala de processo. A forma dá peso institucional ao que foi dito ou decidido naquele encontro.",
      [
        ["오늘 자리에서는 결정할 수 있는 범위를 먼저 밝히겠습니다.", "Nesta ocasião, vou esclarecer primeiro o que pode ser decidido."],
        ["공청회 자리에서 나온 의견은 모두 기록되었다.", "Todas as opiniões surgidas na audiência pública foram registradas."],
      ],
    ],
    [
      "-도록 이끌다 — conduzir para que",
      "동사 + -도록 이끌다",
      "Descreve a condução de um processo até certo resultado, com foco na ação de quem facilita. Compare com -도록 중재하다, que pressupõe um conflito entre partes, e com -게 만들다, que pode soar mais coercitivo. Em deliberação, a forma nomeia a responsabilidade de quem organiza a discussão sem atribuir a decisão ao facilitador.",
      [
        ["진행자는 발언이 결론으로 이어지도록 이끌었다.", "A facilitadora conduziu as falas para que chegassem a uma conclusão."],
        ["감정적인 논쟁이 쟁점으로 돌아오도록 이끄는 것이 진행자의 몫이다.", "É papel de quem facilita conduzir o debate emocional de volta aos pontos em disputa."],
      ],
    ],
  ],
  guided: [
    mcq("Por que a facilitadora estabelece critérios antes das propostas?", ["Para que as propostas sejam comparadas pelos mesmos parâmetros, e não pela força de quem fala.", "Para reduzir o tempo de fala dos moradores na reunião.", "Para garantir que a votação ocorra no mesmo dia e local."], "Para que as propostas sejam comparadas pelos mesmos parâmetros, e não pela força de quem fala.", "Critérios comuns deslocam a disputa para parâmetros verificáveis e reduzem o peso da posição de poder."),
    cloze("Complete o motivo do adiamento da votação: ___가 채워지지 않아 표결은 다음 회의로 미뤄졌다.", "정족수", "-정족수 é o número mínimo de participantes exigido para que a votação valha."),
    listen("Ouça e escreva como a facilitadora organiza os turnos.", "오늘은 발언권을 순서대로 드리고, 판단 기준을 먼저 정하겠습니다.", "오늘은 발언권을 순서대로 드리고, 판단 기준을 먼저 정하겠습니다.", "Hoje vou conceder a palavra na ordem e definir primeiro os critérios de julgamento."),
    translate("pt-ko", "Traduza: “A ata registra a decisão, mas não substitui a deliberação.”", "회의록은 결정을 기록하지만 숙의를 대신하지는 않는다.", "숙의 = deliberação, exame ponderado anterior à decisão.", ["회의록은 결정을 남기지만 숙의를 대체하지는 않는다."]),
    reading("진행자는 감정이 높아진 발언을 중간에 멈추고, 판단 기준을 먼저 합의하자고 제안했다. 기준은 세 가지였다. 피해의 지속 기간, 피해를 입은 주민의 수, 비용을 감당할 수 있는 주체였다. 이 기준에 따라 논의를 다시 시작하자, 요구는 조금씩 구체화되었다.", "O que os critérios mudam na discussão?", ["Tornam as exigências comparáveis e deslocam a disputa para parâmetros explícitos.", "Eliminam a necessidade de registrar as falas e as propostas.", "Transferem a decisão final para a empresa contratante."], "Tornam as exigências comparáveis e deslocam a disputa para parâmetros explícitos.", "Com critérios comuns, as propostas passam a ser avaliadas pelos mesmos parâmetros."),
  ],
  independent: [
    mcq("O que a ata faz com a opinião minoritária?", ["Registra a divergência e a encaminha como item separado da recomendação.", "Apaga a divergência para facilitar o consenso.", "Transforma a divergência em votação secreta."], "Registra a divergência e a encaminha como item separado da recomendação.", "A minoria não é convertida em consenso: ela permanece registrada e recebe encaminhamento próprio."),
    cloze("Complete o registro da divergência: 소수의견은 회의록에 그대로 ___.", "남겼다", "남기다 = deixar registrado; a ata preserva a opinião minoritária."),
    listen("Ouça e escreva a definição de deliberação registrada na ata.", "숙의는 결론을 서두르지 않고 쟁점을 검토하는 과정이다.", "숙의는 결론을 서두르지 않고 쟁점을 검토하는 과정이다.", "A deliberação é o processo de examinar os pontos em disputa sem apressar a conclusão."),
    translate("ko-pt", "Traduza: 합의를 만드는 일과 이견을 지우는 일은 다르다.", "Fazer um acordo e apagar as divergências são coisas diferentes.", "이견 = divergência, opinião diferente.", ["Criar consenso é diferente de eliminar as opiniões divergentes."]),
    reading("표결은 충분한 논의 뒤에 진행하기로 했지만, 정족수가 채워지지 않아 다음 회의로 미뤄졌다. 대신 두 가지는 오늘 결정되었다. 야간 운행 축소는 협의 가능한 안건으로 남긴다. 보상 범위는 다음 회의의 첫 안건으로 올린다.", "Como a ata separa decisão, pendência e divergência?", ["Decide dois encaminhamentos, deixa a compensação pendente e preserva a opinião minoritária.", "Decide a compensação e deixa apenas a votação pendente.", "Registra tudo como opinião, sem nenhum encaminhamento."], "Decide dois encaminhamentos, deixa a compensação pendente e preserva a opinião minoritária.", "A ata tem três níveis: o que foi decidido, o que foi adiado e o que permanece como divergência registrada."),
  ],
  summary: [
    "Facilitar é distribuir turnos, definir critérios e decidir o que entra no registro.",
    "Critérios acordados antes das propostas tornam as exigências comparáveis.",
    "-ㄴ/는 자리에서 dá peso institucional à ocasião em que algo foi dito ou decidido.",
    "-도록 이끌다 nomeia a condução do processo sem transferir a decisão ao facilitador.",
    "A síntese responsável separa decisão, pendência e divergência, sem apagar a minoria.",
  ],
  production: production(
    "Produção independente · síntese de deliberação",
    "Escreva a síntese de uma reunião ou audiência em que as posições estavam exaltadas. Registre os critérios acordados, o que foi decidido, o que ficou pendente e a opinião minoritária.",
    "감정이 높았던 회의나 공청회를 정리하는 글을 쓰고, 기준과 결정, 보류, 소수의견을 구분해 보세요.",
    ["Abra com a ocasião, os participantes e o objetivo da reunião.", "Nomeie os critérios usados para comparar as propostas.", "Separe decisão, pendência e divergência em blocos reconhecíveis.", "Use -ㄴ/는 자리에서 ao menos uma vez.", "Use -도록 이끌다 ao menos uma vez.", "Feche com o próximo passo e quem é responsável por ele."],
    ["Ocasião e objetivo situados.", "Critérios explícitos.", "Decisão, pendência e minoria separadas.", "Duas formas-alvo empregadas com função clara.", "Próximo passo atribuído a alguém."],
    "지난 10월 7일 공청회에서 진행자는 발언권을 순서대로 부여하고, 판단 기준을 먼저 합의하도록 이끌었다. 기준은 피해 기간, 피해 주민 수, 비용 부담 주체 세 가지였다. 이 기준에 따라 논의를 다시 시작하자, 요구는 구체화되었다. 주민 대표는 야간 운행을 열한 시까지 제한할 것을 요구했고, 업체 대표는 열두 시까지 허용해 달라고 했다. 오늘 결정된 것은 두 가지다. 야간 운행 축소는 협의 가능한 안건으로 남긴다. 보상 범위는 다음 회의의 첫 안건으로 올린다. 표결은 정족수가 채워지지 않아 다음 회의로 미뤘다. 한 주민 대표는 운행 제한만으로 수면권이 보장되지 않는다고 주장했다. 이 의견은 삭제하지 않고 권고안의 별도 항목으로 남긴다. 다음 회의 전까지 업체는 운영 자료를 제출하고, 진행자는 보상 기준 초안을 준비한다.",
    "Na audiência pública de 7 de outubro, a facilitadora concedeu a palavra na ordem e conduziu para que os critérios de julgamento fossem acordados primeiro. Os critérios eram três: duração do dano, número de moradores afetados e quem arcaria com os custos. Quando a discussão recomeçou com base nesses critérios, as exigências ficaram mais concretas. Os representantes dos moradores pediram que a operação noturna fosse limitada até as onze da noite, e a empresa pediu que fosse permitida até meia-noite. Dois pontos foram decididos hoje. A redução da operação noturna permanece como item negociável. A faixa de compensação entra como primeiro item da próxima reunião. A votação foi adiada para a próxima reunião porque o quórum não foi atingido. Um representante dos moradores argumentou que limitar a operação, por si só, não garantiria o direito ao sono. Essa opinião não será apagada e fica como item separado da recomendação. Até a próxima reunião, a empresa entregará os dados operacionais, e a facilitadora preparará um esboço dos critérios de compensação.",
    "Exemplo original. Observe que a síntese separa critérios, decisões, pendências e minoria, e atribui o próximo passo. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l34 — negociar sob poder assimétrico sem falsa simetria. */
export const C2_L34 = defineC2Lesson({
  id: "c2-l34", number: 34, moduleId: "c2-m07", title: "Poder assimétrico",
  objective: "Negociar em contextos de poder desigual sem falsa simetria.",
  prerequisites: ["c2-l33"], estimatedMinutes: 85, dialogueTitle: "A proposta que não podia ser recusada",
  intro: [
    {
      title: "Assimetria não é simetria mal ajustada",
      body: "Duas partes podem sentar-se à mesma mesa e continuar profundamente desiguais. Recursos, alternativas e tempo disponível não se distribuem por igual. Uma concessão feita sob ameaça de perder o contrato não é consentimento livre, mesmo que seja assinada. Reconhecer a assimetria não é vitimizar ninguém: é identificar o que a parte mais fraca não pode recusar e o que ela ainda pode exigir. A mesa é o lugar de negociação, e a mesa também é uma relação de poder.",
      ko: "거절할 수 없는 제안은 제안이 아니라 통보에 가깝다.",
    },
    {
      title: "Concessão, limite e contraproposta",
      body: "Negociar em desvantagem exige escolher onde ceder e onde não ceder. Antes de responder, vale separar três coisas: o que é indispensável, o que é preferível e o que é apenas aceitável. Também vale documentar promessas e pedir critérios por escrito. Uma contraproposta que reconhece a assimetria não finge que as partes têm o mesmo poder; ela nomeia o que está em jogo e pede garantias verificáveis. Aceitar não é o mesmo que concordar.",
      ko: "수용과 동의는 다르며, 그 차이는 기록으로 남겨야 한다.",
    },
  ],
  dialogue: [
    ["지연", "야간 작업을 두 주에 한 번으로 줄이면 소득은 어떻게 보전됩니까?", "Se a operação noturna for reduzida para uma vez a cada duas semanas, como será compensada a renda?"],
    ["태식", "예산이 확정되지 않아 지금은 약속드리기 어렵습니다.", "Como o orçamento não está definido, é difícil prometer algo agora."],
    ["지연", "추가 수당도 아직 지급 일정이 없습니다. 이 두 가지를 문서로 남겨 주실 수 있습니까?", "O adicional também ainda não tem data de pagamento. O senhor pode registrar esses dois pontos por documento?"],
    ["태식", "문서로 남기면 본사 승인이 필요합니다. 시간이 걸립니다.", "Registrar por documento exige aprovação da matriz. Vai levar tempo."],
    ["지연", "시간이 걸리는 것은 이해합니다. 다만 거절할 수 없는 제안은 제안이 아니라 통보입니다.", "Entendo que leve tempo. No entanto, uma proposta que não se pode recusar não é proposta, é comunicado."],
    ["태식", "그렇게 말씀하시면 저희도 곤란합니다. 저희가 일방적으로 정한 것은 아닙니다.", "Falar assim também nos deixa em dificuldade. Não fomos nós que decidimos unilateralmente."],
    ["지연", "그렇다면 계약 갱신 기준이라도 먼저 공개해 주십시오. 저희가 무엇을 기준으로 평가받는지 알아야 합니다.", "Então, que se divulgue ao menos o critério de renovação do contrato. Precisamos saber por que critério somos avaliados."],
    ["태식", "갱신 기준은 다음 주까지 정리해 보내겠습니다. 다만 보전 방안은 본사와 협의해야 합니다.", "Vou organizar e enviar o critério de renovação até a próxima semana. Mas a forma de compensação precisa ser negociada com a matriz."],
  ],
  readingText: {
    titlePt: "Uma troca de e-mails sob condições desiguais",
    paragraphs: [
      "김지연 씨는 3월 4일 오전, 협력업체 인사 담당자에게 메일을 보냈다. 메일에는 야간 작업이 한 달째 이어지고 있으며, 추가 수당이 지급되지 않았다는 내용이 담겨 있었다. 담당자는 같은 날 오후에 답했다. '현재 예산이 확정되지 않아 추가 수당을 약속하기 어렵습니다. 다만 다음 달부터 야간 작업을 두 주에 한 번으로 줄이겠습니다.' 지연 씨는 이 답변을 읽고 오히려 불안해졌다. 야간 작업을 줄이면 소득이 줄어들기 때문이다.",
      "지연 씨가 속한 회사는 원청의 물량을 받아 처리하는 하청 업체였다. 원청은 안전 비용을 하청에 떠넘기고, 하청은 일정 변경을 거의 거부하지 못한다. 지연 씨가 거부권을 행사할 수 있는 범위는 넓지 않았다. 계약을 거절하면 다음 분기 물량이 줄어들 수 있다는 말은 이미 여러 번 들었다. 그 말은 위협이라기보다 관행에 가까웠다. 그녀는 그 말이 부당하다고 느꼈지만, 반박할 자료도 없었다. 협상 초반부터 열세가 분명했고, 그녀는 그것을 인정하지 않을 수 없었다.",
      "지연 씨는 답장을 바로 보내지 않았다. 대신 세 가지를 문서로 요구했다. 첫째, 야간 작업 축소가 소득 감소로 이어질 경우의 보전 방안. 둘째, 추가 수당 지급 일정. 셋째, 계약 갱신 기준의 문서화였다. 그녀는 모든 요구를 관철할 수 없다는 것을 알고 있었다. 그래도 거절할 수 없는 제안은 제안이 아니라 통보라는 점을 분명히 남기고 싶었다. 거절할 수 없다면 동의한 것이 아니다. 마지막 문장은 이렇게 끝났다. '저는 이 조건을 수용할 수 있지만, 수용과 동의는 다릅니다.'",
    ],
    pt: "Na manhã de 4 de março, Kim Jiyon enviou um e-mail à responsável de recursos humanos da empresa parceira. O e-mail dizia que o trabalho noturno já durava um mês e que o adicional não havia sido pago. A responsável respondeu na mesma tarde: 'Como o orçamento ainda não está definido, é difícil prometer o adicional. No entanto, a partir do mês que vem, vamos reduzir o trabalho noturno para uma vez a cada duas semanas.' Ao ler a resposta, Jiyon ficou ainda mais inquieta. Reduzir o trabalho noturno significaria reduzir sua renda. A empresa de Jiyon era uma subcontratada que executava o volume recebido da contratante principal. A contratante principal empurrava os custos de segurança para a subcontratada, e a subcontratada quase nunca conseguia recusar mudanças de cronograma. O espaço de Jiyon para exercer o direito de recusa não era amplo. Ela já tinha ouvido várias vezes que, se recusasse o contrato, o volume do trimestre seguinte poderia diminuir. Essa fala estava mais para prática costumeira do que para ameaça explícita. Ela sentiu que aquela fala era injusta, mas não tinha nem material para refutá-la. A desvantagem ficou clara desde o início da negociação, e ela não podia deixar de reconhecê-la. Jiyon não respondeu imediatamente. Em vez disso, pediu três coisas por documento. Primeiro, uma forma de compensar a renda caso a redução do trabalho noturno a diminuísse. Segundo, um cronograma de pagamento do adicional. Terceiro, a documentação dos critérios de renovação do contrato. Ela sabia que não conseguiria tudo. Ainda assim, queria deixar claro que uma proposta que não se pode recusar não é proposta, é comunicado. Se não se pode recusar, não se consentiu. A última frase terminava assim: 'Posso aceitar estas condições, mas aceitar e concordar são coisas diferentes.'",
    objective: "Reconhecer a assimetria de poder e o limite real da concessão na troca de mensagens.",
  },
  reusedIds: ["ko:수용", "ko:열세", "ko:갱신", "ko:이면"],
  grammar: [
    [
      "-ㄴ/는 조건에서 — sob a condição de",
      "명사 + 의 조건에서 / 동사 + -는 조건에서 / 형용사 + -(으)ㄴ 조건에서",
      "Descreve a condição estrutural em que uma ação ou decisão ocorre, muitas vezes para mostrar que a escolha é limitada. Compare com -ㄴ/는 상황에서, que descreve circunstância, e com -ㄹ 경우, que abre uma hipótese. Em contextos de poder desigual, a forma ajuda a nomear o que torna uma recusa difícil.",
      [
        ["거절할 수 없는 조건에서 이루어진 동의는 자유로운 동의가 아니다.", "Um consentimento dado sob uma condição em que não se pode recusar não é consentimento livre."],
        ["자금이 부족한 조건에서 장기 계획을 세우기는 어렵다.", "É difícil fazer um plano de longo prazo sob a condição de falta de recursos."],
      ],
    ],
    [
      "-지 않을 수 없다 — não se pode deixar de",
      "동사 + -지 않을 수 없다 / 형용사 + -지 않을 수 없다",
      "Dupla negação que apresenta uma conclusão ou ação como inevitável diante das circunstâncias. É mais formal e mais forte do que -아/어야 한다 em muitos contextos. Compare com -지 않으면 안 된다, que impõe uma obrigação, e com -수밖에 없다, que destaca a ausência de alternativa. A forma é útil para reconhecer um fato incômodo sem transformá-lo em escolha livre.",
      [
        ["상대가 원청이라는 점을 인정하지 않을 수 없다.", "Não se pode deixar de reconhecer que a outra parte é a contratante principal."],
        ["조건이 이렇다면 불이익을 감수하지 않을 수 없다.", "Com condições assim, não se pode deixar de arcar com a desvantagem."],
      ],
    ],
  ],
  guided: [
    mcq("O que a troca de e-mails mostra sobre a posição de Jiyon?", ["Ela pode aceitar as condições, mas não tem poder real para recusá-las sem sofrer represália.", "Ela tem o mesmo poder de negociação que a empresa contratante.", "Ela se recusa a qualquer forma de acordo."], "Ela pode aceitar as condições, mas não tem poder real para recusá-las sem sofrer represália.", "Aceitar sem poder de recusa não equivale a consentir livremente."),
    cloze("Complete o reconhecimento da desvantagem: 협상 초반부터 ___가 분명했고, 그녀는 그것을 인정하지 않을 수 없었다.", "열세", "-열세 indica a posição inferior na correlação de forças."),
    listen("Ouça e escreva o que a trabalhadora diz sobre uma proposta sem possibilidade de recusa.", "거절할 수 없는 제안은 제안이 아니라 통보입니다.", "거절할 수 없는 제안은 제안이 아니라 통보입니다.", "Uma proposta que não se pode recusar não é proposta, é comunicado."),
    translate("pt-ko", "Traduza: “Sob a condição de que não há outra proposta, aceitar não é escolher.”", "다른 제안이 없는 조건에서 수용하는 것은 선택이 아니다.", "-ㄴ/는 조건에서 nomeia a restrição estrutural que limita a escolha.", ["다른 제안이 없는 조건에서는 수용이 선택이 아니다."]),
    reading("지연 씨가 속한 회사는 원청의 물량을 받아 처리하는 하청 업체였다. 원청은 안전 비용을 하청에 떠넘기고, 하청은 일정 변경을 거의 거부하지 못한다. 지연 씨가 거부권을 행사할 수 있는 범위는 넓지 않았다.", "O que a posição de subcontratada limita?", ["O poder de recusar mudanças e de exigir que os custos de segurança fiquem com a contratante.", "A possibilidade de trabalhar à noite e nos fins de semana.", "O direito de enviar e-mails e mensagens à contratante."], "O poder de recusar mudanças e de exigir que os custos de segurança fiquem com a contratante.", "A assimetria aparece na cadeia de contratos: quem executa absorve custos e não pode recusar prazos."),
  ],
  independent: [
    mcq("Qual contraproposta reconhece a assimetria sem fingir simetria?", ["Pede critérios de renovação por escrito e um prazo, sabendo que nem todos os pontos serão atendidos.", "Exige que a empresa renuncie a todo o poder de decisão antes de negociar.", "Declara que as duas partes têm exatamente as mesmas alternativas."], "Pede critérios de renovação por escrito e um prazo, sabendo que nem todos os pontos serão atendidos.", "A contraproposta realista documenta o que pode ser exigido e não simula igualdade de condições."),
    cloze("Complete a cadeia de subcontratação: 원청은 안전 비용을 ___에 떠넘겼다.", "하청", "-하청 designa a empresa que executa o contrato de outra, em posição subordinada."),
    listen("Ouça e escreva como a assimetria se reproduz na cadeia de contratos.", "원청은 안전 비용을 하청에 떠넘기고, 하청은 일정 변경을 거의 거부하지 못한다.", "원청은 안전 비용을 하청에 떠넘기고, 하청은 일정 변경을 거의 거부하지 못한다.", "A contratante principal empurra os custos de segurança para a subcontratada, e a subcontratada quase nunca consegue recusar mudanças de cronograma."),
    translate("ko-pt", "Traduza: 거절할 수 없다면 동의한 것이 아니다.", "Se não se pode recusar, não se consentiu.", "동의하다 = consentir, concordar; a frase separa aceitação de consentimento.", ["Se não há possibilidade de recusa, não houve consentimento."]),
    reading("지연 씨는 답장을 바로 보내지 않았다. 대신 세 가지를 문서로 요구했다. 첫째, 야간 작업 축소가 소득 감소로 이어질 경우의 보전 방안. 둘째, 추가 수당 지급 일정. 셋째, 계약 갱신 기준의 문서화였다.", "Por que Jiyon pede documentos em vez de responder imediatamente?", ["Porque documentar critérios e prazos cria uma garantia verificável mesmo sem igualdade de poder.", "Porque acredita que a empresa vai aceitar todas as exigências.", "Porque quer encerrar a negociação sem acordo."], "Porque documentar critérios e prazos cria uma garantia verificável mesmo sem igualdade de poder.", "O documento não elimina a assimetria, mas cria pontos de controle que não dependem apenas da palavra da empresa."),
  ],
  summary: [
    "Assimetria de poder não desaparece porque as partes ocupam a mesma mesa.",
    "Aceitar uma condição sem poder de recusa não é o mesmo que consentir livremente.",
    "-ㄴ/는 조건에서 nomeia a restrição estrutural que limita a escolha.",
    "-지 않을 수 없다 reconhece um fato inevitável sem transformá-lo em escolha livre.",
    "Uma contraproposta responsável pede garantias verificáveis e não simula igualdade.",
  ],
  production: production(
    "Produção independente · contraproposta sob assimetria",
    "Escreva uma contraproposta em uma negociação em que uma das partes tem muito menos poder. Reconheça a assimetria, diga o que não pode ser recusado, peça garantias verificáveis e delimite o que você aceita sem concordar.",
    "힘의 차이가 큰 협상에서 상대의 제안에 대한 반대 제안을 쓰고, 무엇을 수용하고 무엇을 요구할지 구분해 보세요.",
    ["Descreva a assimetria com fatos, não com adjetivos.", "Diga explicitamente o que a parte mais fraca não pode recusar.", "Use -ㄴ/는 조건에서 ao menos uma vez.", "Use -지 않을 수 없다 ao menos uma vez.", "Peça um critério, prazo ou documento verificável.", "Distinga aceitar de concordar."],
    ["Assimetria descrita com fatos.", "Limite de recusa nomeado.", "Duas formas-alvo empregadas com função clara.", "Garantia verificável pedida.", "Aceitação e concordância distinguidas."],
    "보내 주신 제안은 야간 작업을 두 주에 한 번으로 줄이는 내용입니다. 저는 이 조건을 수용할 수 있지만, 먼저 두 가지를 분명히 하고 싶습니다. 첫째, 현재 저희 회사는 원청의 물량에 의존하는 하청 업체이므로, 계약을 거절하면 다음 분기 물량이 줄어들 수 있다는 점을 인정하지 않을 수 없습니다. 둘째, 다른 제안이 없는 조건에서 수용하는 것은 자유로운 선택이 아닙니다. 그래서 저는 세 가지를 문서로 요청합니다. 소득 감소에 대한 보전 방안, 추가 수당 지급 일정, 계약 갱신 기준입니다. 모든 요구가 받아들여지리라고 기대하지는 않습니다. 다만 기준과 일정이 문서로 남으면, 다음 협상에서 그것을 근거로 이야기할 수 있습니다. 저는 이 조건을 수용하되, 수용과 동의가 같지는 않다는 점을 기록에 남기고자 합니다.",
    "A proposta que o senhor enviou consiste em reduzir o trabalho noturno para uma vez a cada duas semanas. Posso aceitar essa condição, mas antes quero deixar dois pontos claros. Primeiro, como nossa empresa é uma subcontratada que depende do volume da contratante principal, não posso deixar de reconhecer que, se recusarmos o contrato, o volume do próximo trimestre pode diminuir. Segundo, aceitar sob a condição de que não há outra proposta não é uma escolha livre. Por isso, solicito três coisas por documento: uma forma de compensar a redução de renda, um cronograma de pagamento do adicional e os critérios de renovação do contrato. Não espero que todas as exigências sejam atendidas. No entanto, se os critérios e o cronograma ficarem registrados, poderei usá-los como base na próxima negociação. Aceito estas condições, mas quero registrar que aceitar e concordar não são a mesma coisa.",
    "Exemplo original. Observe que a contraproposta descreve a assimetria com fatos, pede garantias verificáveis e separa aceitação de concordância. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l35 — avaliar o poder e a responsabilidade de quem reformula a fala do outro. */
export const C2_L35 = defineC2Lesson({
  id: "c2-l35", number: 35, moduleId: "c2-m07", title: "A responsabilidade de mediar",
  objective: "Avaliar o poder e a responsabilidade de quem reformula a fala do outro.",
  prerequisites: ["c2-l34"], estimatedMinutes: 85, dialogueTitle: "A ata que mudou o culpado",
  intro: [
    {
      title: "Quem reformula também escolhe",
      body: "Registrar, resumir e sintetizar são atos de seleção. Quem media decide o que vem primeiro, o que recebe uma frase inteira e o que cabe em uma oração subordinada. Essa escolha não é neutra: ela altera a impressão sobre quem deve responder pelo quê. Reconhecer o próprio poder de mediação não significa paralisar, mas tornar visível o critério usado. Uma ata honesta não é a que reproduz tudo, e sim a que permite saber o que foi cortado e por quê.",
      ko: "기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.",
    },
    {
      title: "Fidelidade, efeito e correção",
      body: "Fidelidade não é transcrição literal. Uma fala pode ser resumida com exatidão ou distorcida com citações corretas, dependendo do que se omite. O teste prático é comparar versões: o que muda quando a ordem dos blocos muda? A correção responsável nomeia o recorte, reconhece o efeito e refaz o registro com justificativa. Também evita transformar a divergência em falha moral de quem a expressou.",
      ko: "요약이 원래 맥락을 지울 위험이 있다면, 무엇을 왜 지웠는지 밝혀야 한다.",
    },
  ],
  dialogue: [
    ["지안", "제가 정리한 순서가 한쪽의 책임을 흐리게 했습니다. 다시 확인해 주시겠습니까?", "A ordem que organizei acabou turvando a responsabilidade de um dos lados. Podem verificar comigo?"],
    ["서윤", "회의록에는 업체의 사정이 먼저 나오고, 저희 요구는 뒤에 붙어 있었습니다.", "Na ata, a situação da empresa aparece primeiro, e a nossa exigência ficou colada no fim."],
    ["민호", "순서가 바뀌었다고 해서 사실이 달라지는 건 아닙니다.", "Mudar a ordem não altera os fatos."],
    ["지안", "사실은 그대로지만, 읽는 사람이 책임을 어디에 두는지는 달라집니다.", "Os fatos permanecem, mas o lugar em que o leitor coloca a responsabilidade muda."],
    ["서윤", "저는 야간 순찰을 제안했는데, 그 발언은 아예 빠져 있었습니다.", "Eu propus rondas noturnas, mas essa fala simplesmente desapareceu."],
    ["지안", "누락된 발언 두 개를 확인했습니다. 제가 요약하면서 기준을 밝히지 않았습니다.", "Confirmei duas falas omitidas. Ao resumir, não deixei claro o critério que usei."],
    ["민호", "그럼 다시 쓰면 되지 않습니까? 시간이 오래 걸릴 일은 아닙니다.", "Então basta reescrever, não? Não deve levar muito tempo."],
    ["지안", "다시 쓰는 것보다 먼저, 무엇을 왜 뺐는지 기록해야 합니다. 그래야 다음 기록자가 같은 실수를 반복하지 않습니다.", "Antes de reescrever, é preciso registrar o que foi retirado e por quê. Só assim o próximo relator não repete o mesmo erro."],
  ],
  readingText: {
    titlePt: "Duas atas da mesma reunião",
    paragraphs: [
      "9월 12일 협의회 회의록 두 가지가 남아 있다. 첫 번째 기록은 A안, 두 번째는 B안이라고 부르자. 두 문서는 같은 회의를 다루지만, 문장의 순서와 강조가 다르다. A안은 업체 대표의 설명으로 시작한다. '물류 비용 상승으로 야간 운행 축소가 불가피하다.' 그다음에 주민 대표의 반대가 짧게 붙는다. B안은 주민 대표의 발언으로 시작한다. '야간 소음으로 수면권이 침해되었다.' 업체의 설명은 그 뒤에 조건으로 제시된다. 어느 문장을 앞에 두느냐가 회의의 책임을 바꾼다.",
      "A안을 쓴 기록자는 업체의 사정을 먼저 배치했다. 그 결과, 주민의 요구는 예산 문제에 대한 반응처럼 읽힌다. B안을 쓴 기록자는 피해를 먼저 배치했다. 그 결과, 업체의 설명은 피해에 대한 변명처럼 읽힌다. 두 문서 모두 사실을 바꾸지는 않았다. 그러나 한 문장을 빼자 책임소재가 다른 쪽으로 옮겨 갔다. 기록자는 모든 발언을 같은 비중으로 옮길 수 없다. 선택은 불가피하지만, 선택했다는 사실을 숨기면 투명성은 사라진다.",
      "세 번째 기록은 두 문서를 비교한 검토 메모다. 메모는 A안에서 누락된 발언 두 개를 찾아냈다. 하나는 주민 대표가 제안한 야간 순찰이었고, 다른 하나는 업체가 먼저 꺼낸 보상 논의였다. 메모는 A안에 편향이 생길 수 있는 지점을 지적했지만, 의도까지 단정하지는 않았다. 대신 누가 어떤 기준으로 발언을 골랐는지 묻는다. 기록자는 무엇을 쓰지 않을지 먼저 고민한다. 자기검열은 기록 단계에서 이미 시작된다. 타인의 말을 다시 쓰는 일은 책임을 배분하는 일이기도 하다. 기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.",
    ],
    pt: "Restaram duas atas da reunião do conselho de 12 de setembro. Chamemos a primeira de versão A e a segunda de versão B. Os dois documentos tratam da mesma reunião, mas a ordem das frases e as ênfases são diferentes. A versão A começa pela explicação do representante da empresa: 'Com o aumento dos custos logísticos, a redução da operação noturna é inevitável.' Em seguida, a objeção do representante dos moradores aparece de forma breve. A versão B começa pela fala do representante dos moradores: 'O barulho noturno violou o direito ao sono.' A explicação da empresa vem depois, como condição. A frase que se coloca primeiro muda a responsabilidade da reunião. Quem escreveu a versão A colocou primeiro a situação da empresa. Como resultado, a exigência dos moradores soa como reação a um problema de orçamento. Quem escreveu a versão B colocou primeiro o dano. Como resultado, a explicação da empresa soa como justificativa diante do dano. Nenhum dos dois documentos alterou os fatos. No entanto, ao retirar uma frase, a localização da responsabilidade se deslocou para o outro lado. Quem registra não consegue transportar todas as falas com o mesmo peso. A escolha é inevitável, mas, se a própria escolha for escondida, a transparência desaparece. O terceiro documento é uma nota de revisão que compara as duas versões. A nota encontrou duas falas omitidas na versão A. Uma era a ronda noturna proposta pelo representante dos moradores; a outra era a discussão sobre compensação levantada primeiro pela empresa. A nota apontou pontos em que a versão A poderia produzir viés, mas não afirmou qual era a intenção. Em vez disso, perguntou quem escolheu as falas e com que critério. Quem registra pensa primeiro no que não vai escrever. A autocensura já começa na etapa do registro. Reescrever a fala do outro também é distribuir responsabilidade. O registro não é o transporte da fala, mas a definição de quem, mais tarde, terá de explicar o quê.",
    objective: "Comparar duas atas e avaliar como o recorte altera a responsabilidade atribuída.",
  },
  reusedIds: ["ko:편향", "ko:누락", "ko:불가피하다", "ko:검열"],
  grammar: [
    [
      "-ㄴ/는 책임이 따르다 — vem acompanhado de responsabilidade",
      "명사 + 에 따르는 책임 / 동사 + -는 책임이 따르다",
      "Indica que uma ação, função ou escolha traz consigo uma responsabilidade correspondente. Compare com -ㄹ 책임이 있다, que aponta um dever específico, e com -에 대한 책임, que nomeia aquilo de que se responde. A forma é comum em textos institucionais e éticos porque liga o ato a quem o realiza.",
      [
        ["타인의 말을 요약하는 일에는 책임이 따른다.", "A tarefa de resumir a fala de outra pessoa vem acompanhada de responsabilidade."],
        ["기록을 공개하지 않는 선택에도 책임이 따른다.", "A escolha de não divulgar o registro também vem acompanhada de responsabilidade."],
      ],
    ],
    [
      "-ㄹ 위험이 있다 — há risco de",
      "동사 + -ㄹ 위험이 있다",
      "Aponta um risco concreto ligado a uma ação ou omissão. É mais avaliativo do que -ㄹ 수 있다, que apenas abre uma possibilidade, e mais próximo de -ㄹ 우려가 있다, que expressa preocupação. Em análise de mediação, a forma permite nomear o custo de um recorte sem acusar quem o fez.",
      [
        ["한쪽 발언만 실으면 다른 쪽의 책임이 축소될 위험이 있다.", "Se apenas a fala de um lado for incluída, há risco de que a responsabilidade do outro seja reduzida."],
        ["요약이 원래 맥락을 지울 위험이 있다.", "Há risco de que o resumo apague o contexto original."],
      ],
    ],
  ],
  guided: [
    mcq("O que a mediadora percebe ao comparar sua ata com a fala original?", ["Que a ordem escolhida deslocou a responsabilidade para um dos lados.", "Que os fatos registrados estavam todos incorretos.", "Que a reunião não teve nenhuma divergência."], "Que a ordem escolhida deslocou a responsabilidade para um dos lados.", "O recorte não alterou os fatos, mas mudou a impressão sobre quem deve responder."),
    cloze("Complete a consequência do recorte: 한 문장을 빼자 ___가 다른 쪽으로 옮겨 갔다.", "책임소재", "-책임소재 indica onde a responsabilidade é situada no texto."),
    listen("Ouça e escreva o que a mediadora reconhece sobre sua própria síntese.", "제가 정리한 순서가 한쪽의 책임을 흐리게 했습니다.", "제가 정리한 순서가 한쪽의 책임을 흐리게 했습니다.", "A ordem que organizei acabou turvando a responsabilidade de um dos lados."),
    translate("pt-ko", "Traduza: “Reescrever a fala do outro também é distribuir responsabilidade.”", "타인의 말을 다시 쓰는 일은 책임을 배분하는 일이기도 하다.", "책임을 배분하다 = distribuir, atribuir responsabilidade.", ["타인의 말을 다시 쓰는 것은 책임을 나누는 일이기도 하다."]),
    reading("A안은 업체 대표의 설명으로 시작한다. '물류 비용 상승으로 야간 운행 축소가 불가피하다.' 그다음에 주민 대표의 반대가 짧게 붙는다. B안은 주민 대표의 발언으로 시작한다. '야간 소음으로 수면권이 침해되었다.' 업체의 설명은 그 뒤에 조건으로 제시된다.", "O que distingue as duas atas?", ["A ordem dos blocos de fala, que muda a impressão sobre quem deve responder pelo quê.", "Os fatos registrados, que são diferentes em cada ata.", "A ausência de qualquer fala da empresa na versão B."], "A ordem dos blocos de fala, que muda a impressão sobre quem deve responder pelo quê.", "As duas versões usam os mesmos fatos, mas a ordem altera a atribuição de responsabilidade."),
  ],
  independent: [
    mcq("O que a nota de revisão faz com a possível intenção do relator?", ["Aponta o ponto de viés, mas não afirma a intenção; pergunta quem escolheu e com que critério.", "Declara que o relator agiu de má-fé e pede punição imediata.", "Conclui que não houve nenhum recorte no relatório nem na escolha dos dados."], "Aponta o ponto de viés, mas não afirma a intenção; pergunta quem escolheu e com que critério.", "A revisão responsável nomeia o efeito sem transformar suspeita em acusação."),
    cloze("Complete a descrição da autocensura: ___은 기록 단계에서 이미 시작된다.", "자기검열", "-자기검열 é a censura que a pessoa aplica à própria fala antes de registrá-la."),
    listen("Ouça e escreva o que o registro define, além de transportar falas.", "기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.", "기록은 말을 옮기는 일이 아니라, 나중에 누가 무엇을 설명해야 하는지를 정하는 일이다.", "O registro não é o transporte da fala, mas a definição de quem, mais tarde, terá de explicar o quê."),
    translate("ko-pt", "Traduza: 어느 문장을 앞에 두느냐에 따라 책임소재가 달라 보인다.", "A depender de qual frase se coloca primeiro, a localização da responsabilidade parece mudar.", "앞에 두다 = colocar na frente; 책임소재 = onde está a responsabilidade.", ["Conforme a frase que se põe primeiro, o lugar da responsabilidade parece outro."]),
    reading("두 문서 모두 사실을 바꾸지는 않았다. 그러나 한 문장을 빼자 책임소재가 다른 쪽으로 옮겨 갔다. 기록자는 모든 발언을 같은 비중으로 옮길 수 없다. 선택은 불가피하지만, 선택했다는 사실을 숨기면 투명성은 사라진다.", "Por que a escolha do relator precisa ser visível?", ["Porque a seleção é inevitável, mas escondê-la elimina a transparência.", "Porque o relator deve registrar literalmente todas as falas.", "Porque a ata não pode conter nenhuma interpretação."], "Porque a seleção é inevitável, mas escondê-la elimina a transparência.", "A transparência não está em registrar tudo, mas em mostrar o critério e o que foi deixado de fora."),
  ],
  summary: [
    "Registrar e resumir são atos de seleção que distribuem responsabilidade.",
    "Mudar a ordem dos blocos de fala altera a leitura sem alterar os fatos.",
    "-ㄴ/는 책임이 따르다 liga uma ação ou função à responsabilidade que ela traz.",
    "-ㄹ 위험이 있다 nomeia o risco de um recorte sem acusar quem o fez.",
    "Corrigir uma ata exige nomear o critério, o efeito e o que foi omitido.",
  ],
  production: production(
    "Produção independente · corrigir uma ata tendenciosa",
    "Escolha ou invente uma ata de reunião em que a ordem das falas favorece um dos lados. Reescreva-a corrigindo o recorte e acrescente uma nota explicando o que foi mudado e por quê.",
    "한쪽에 유리하게 정리된 회의록을 다시 쓰고, 무엇을 왜 고쳤는지 설명하는 글을 덧붙여 보세요.",
    ["Mostre o recorte original antes de corrigir.", "Reordene as falas sem inventar conteúdo novo.", "Use -ㄴ/는 책임이 따르다 ao menos uma vez.", "Use -ㄹ 위험이 있다 ao menos uma vez.", "Explique o critério da correção e reconheça o próprio poder de recorte.", "Feche com o que ainda pode ter ficado de fora."],
    ["Recorte original identificado.", "Reescrita sem conteúdo inventado.", "Duas formas-alvo empregadas com função clara.", "Critério da correção explicitado.", "Limite da própria correção reconhecido."],
    "원래 회의록은 업체의 사정을 먼저 배치하고 주민의 요구를 뒤에 붙였다. 그 결과, 주민의 요구가 예산 문제에 대한 반응처럼 읽혔다. 나는 이 순서를 다음과 같이 고친다. 먼저 주민 대표가 야간 소음과 수면권 침해를 제기했다는 사실을 쓴다. 그다음 업체 대표가 물류 비용 상승을 이유로 운행 축소가 어렵다고 답했다는 사실을 쓴다. 마지막으로 주민 대표가 야간 순찰을 제안했고, 업체가 보상 논의를 먼저 꺼냈다는 점을 추가한다. 이 수정은 없던 발언을 만드는 것이 아니라, 빠진 발언을 제자리에 돌려놓는 일이다. 기록을 공개하지 않는 선택에도 책임이 따른다. 다만 이번 수정이 모든 맥락을 복원했다고 말할 수는 없다. 회의 뒤에 오간 대화와 표정은 여전히 빠져 있다. 그 부분이 결정에 영향을 주었을 위험이 있다. 그래서 나는 수정한 이유와 남은 한계를 함께 적는다.",
    "A ata original colocava primeiro a situação da empresa e acrescentava a exigência dos moradores no fim. Como resultado, a exigência dos moradores era lida como reação a um problema de orçamento. Corrijo a ordem da seguinte forma. Primeiro, registro que o representante dos moradores levantou o barulho noturno e a violação do direito ao sono. Em seguida, registro que o representante da empresa respondeu que a redução da operação era difícil por causa do aumento dos custos logísticos. Por último, acrescento que o representante dos moradores propôs rondas noturnas e que a empresa levantou primeiro a discussão sobre compensação. Essa correção não cria falas inexistentes: devolve falas omitidas ao seu lugar. A escolha de não divulgar o registro também vem acompanhada de responsabilidade. No entanto, não posso dizer que esta revisão recuperou todo o contexto. As conversas e expressões trocadas depois da reunião continuam de fora. Há risco de que essa parte tenha influenciado a decisão. Por isso, registro junto o motivo da correção e o limite que permanece.",
    "Exemplo original. Observe que a reescrita não inventa falas, nomeia o critério e reconhece o limite da própria correção. Exemplo ilustrativo; não é gabarito.",
  ),
});
