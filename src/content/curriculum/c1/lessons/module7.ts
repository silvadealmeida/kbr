import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero de mediação ou de explicação pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As posições, os interesses e o próximo passo aparecem em ordem reconhecível, sem repetição." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A posição é sustentada com critério, reconhece o ponto do outro e não distorce a fala alheia." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra o que foi dito, nomeia o que resta em aberto e propõe um passo verificável." },
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
    minWords: 100,
    rubric: RUBRIC,
    sample: { ko: sampleKo, pt: samplePt, notePt },
  };
}

/** c1-l31 — reformular posições e interesses sem tomar partido. */
export const C1_L31 = defineC1Lesson({
  id: "c1-l31", number: 31, moduleId: "c1-m07", title: "Mediar um conflito",
  objective: "Reformular as posições de duas partes e propor um caminho sem tomar partido.",
  prerequisites: ["c1-c06"], estimatedMinutes: 80, dialogueTitle: "Antes de decidir quem tem razão",
  intro: [
    {
      title: "Posição declarada e interesse subjacente",
      body: "Numa disputa, cada parte diz o que quer: reduzir os alertas, aumentar o prazo, mudar o horário. Essa é a posição. O interesse é o que a posição protege: tempo de concentração, sensação de segurança, reconhecimento do trabalho. Quem media não escolhe entre as posições; primeiro nomeia os interesses, porque é ali que duas partes opostas podem se reconhecer. Sem essa separação, a conversa vira votação e alguém perde.",
      ko: "중재자는 두 팀 모두 중요한 일을 놓치지 않으려는 입장에서는 같다는 점을 먼저 확인했다.",
    },
    {
      title: "Reformular não é concordar",
      body: "Reformular é devolver a fala do outro em uma versão que ele reconheça como sua. Isso não significa aceitar o pedido nem suavizar a queixa até ela desaparecer. Uma boa reformulação mantém o desconforto e retira a acusação: em vez de “vocês só pensam em si”, diz-se “o que está em jogo para vocês é não perder prazo”. Quando a reformulação é fiel, o outro corrige o que ficou faltando em vez de se defender.",
      ko: "중재자는 어느 쪽의 편도 들지 않고, 두 팀이 기준을 함께 만들 수 있도록 초안을 준비했다.",
    },
  ],
  dialogue: [
    ["지안", "두 팀이 같은 알림 도구 때문에 부딪히고 있다고 들었어요. 시작하기 전에 각 팀이 무엇을 원하는지부터 정리해 볼까요?", "Ouvi dizer que as duas equipes estão em conflito por causa da mesma ferramenta de notificações. Antes de começar, que tal organizarmos o que cada equipe quer?"],
    ["태호", "디자인팀은 알림이 너무 많아서 집중이 깨지는 게 문제예요. 중요한 알림만 남기고 싶어요.", "Para a equipe de design, o problema é que há alertas demais e a concentração se quebra. Queremos manter só os alertas importantes."],
    ["지안", "다시 말하면, 디자인팀은 알림의 수를 줄이는 것보다 업무 흐름을 지키고 싶은 거네요.", "Falando de outro modo, a equipe de design quer preservar o fluxo de trabalho mais do que reduzir o número de alertas."],
    ["미르", "저희 고객지원팀은 긴급 문의를 놓치면 곤란해요. 알림이 줄면 대응이 늦어질까 봐 걱정이에요.", "Nossa equipe de atendimento não pode perder mensagens urgentes. Preocupa-nos que a resposta atrase se os alertas diminuírem."],
    ["지안", "고객지원팀의 관심은 알림의 양이 아니라 놓치지 않는 구조에 있네요. 두 팀 모두 중요한 일을 놓치지 않으려는 입장에서는 같아요.", "O que importa para o atendimento não é o volume de alertas, mas uma estrutura que não deixe nada passar. As duas equipes se igualam no ponto de vista de não perder o que é importante."],
    ["태호", "그렇게 들으니 저희도 무조건 줄이자는 게 아니라는 게 보이네요.", "Ouvindo assim, fica claro que nós também não estamos pedindo redução a qualquer custo."],
    ["미르", "등급을 나눠서 긴급한 것만 즉시 보내고, 나머지는 정해진 시간에 모아 보는 방식은 어떨까요?", "Que tal classificarmos por nível, enviar imediatamente só o que é urgente e agrupar o restante em horários definidos?"],
    ["지안", "좋아요. 다음 주까지 두 팀이 기준을 함께 만들 수 있도록 제가 초안을 정리해서 보내 드릴게요.", "Bom. Até a próxima semana, eu organizo um rascunho e envio para que as duas equipes possam construir o critério juntas."],
  ],
  readingText: {
    titlePt: "O que ficou registrado antes do acordo",
    paragraphs: [
      "지난 3주 동안 디자인팀과 고객지원팀 사이에는 알림 도구를 둘러싼 분쟁이 이어졌다. 표면적으로는 알림의 수를 줄이자는 요구와 늘리자는 요구가 맞섰지만, 중재자는 두 팀의 입장차를 그대로 옮기지 않고 각 팀이 지키려는 것을 따로 적었다. 디자인팀의 관점에서는 집중을 방해받지 않는 시간이 중요했고, 고객지원팀의 관점에서는 긴급한 문의를 놓치지 않는 절차가 중요했다. 두 요구는 서로 반대처럼 보였지만, 두 팀 모두 중요한 일을 놓치지 않으려 한다는 점에서는 같았다. 이 공통점을 확인한 뒤에야 논의는 마찰에서 조정으로 넘어갈 수 있었다.",
      "중재 기록에는 당사자의 발언과 중재자의 정리를 구분해 적었다. 예를 들어 ‘알림을 절반으로 줄여야 한다’는 발언은 요구로, ‘집중 시간을 지키고 싶다’는 설명은 이해관계로 분류했다. 이렇게 나누면 상대의 말을 반박하지 않고도 다시 말할 수 있다. 회의에서는 긴급 알림과 일반 알림을 나누고, 일반 알림은 두 시간마다 모아 보내는 안이 제안되었다. 합의는 완전한 봉합이 아니었다. 긴급의 기준을 누가 정하는지는 여전히 남은 문제였고, 두 팀은 그 기준을 다음 회의에서 다시 논의하기로 했다.",
      "중재자는 어느 쪽의 편도 들지 않았다. 대신 양쪽이 받아들일 수 있는 조건을 확인하고, 결정이 늦어져도 절차를 지키도록 했다. 이 사례에서 배울 점은 갈등 해소가 감정의 정리로 끝나지 않는다는 것이다. 입장차를 없애는 대신 이해관계를 분명히 하고, 남은 쟁점을 기록으로 남겨야 다음 단계로 갈 수 있다. 유연성은 원칙을 버리는 태도가 아니라, 원칙을 지키면서 방법을 바꾸는 능력이다. 독자는 이 기록에서 누가 이겼는지를 찾기보다, 어떤 문제가 아직 열려 있는지를 읽어야 한다.",
    ],
    pt: "Durante três semanas, uma disputa em torno da ferramenta de notificações se arrastou entre a equipe de design e a de atendimento ao cliente. Na superfície, o pedido de reduzir o número de alertas se opunha ao de aumentá-los, mas a mediadora não transcreveu a diferença de posições tal como estava: anotou separadamente o que cada equipe queria preservar. Do ponto de vista da equipe de design, o importante era ter tempo sem interrupções; do ponto de vista do atendimento, era ter um procedimento para não perder mensagens urgentes. Os dois pedidos pareciam opostos, mas as duas equipes se igualavam no desejo de não deixar escapar o que é importante. Só depois de confirmar esse ponto em comum a conversa pôde passar do atrito para o ajuste. No registro da mediação, as falas das partes e as sínteses da mediadora foram anotadas em separado. Por exemplo, a fala “é preciso reduzir os alertas pela metade” foi classificada como pedido, e a explicação “quero preservar o tempo de concentração” como interesse. Separando assim, é possível reformular sem refutar a fala do outro. Na reunião, propôs-se dividir os alertas entre urgentes e gerais e agrupar os gerais a cada duas horas. O acordo não foi um remendo completo. Quem define o critério de urgência continuava sendo um problema em aberto, e as duas equipes decidiram discutir esse critério de novo na reunião seguinte. A mediadora não ficou do lado de ninguém. Em vez disso, verificou as condições que ambos podiam aceitar e fez com que o procedimento fosse respeitado mesmo com a decisão atrasada. O que se aprende com este caso é que a resolução de um conflito não termina com a organização das emoções. Em vez de eliminar a diferença de posições, é preciso esclarecer os interesses e registrar os pontos que restam para que se possa avançar. Flexibilidade não é abandonar princípios, mas saber mudar o método sem abandoná-los. O leitor deve procurar neste registro não quem venceu, mas quais problemas continuam abertos.",
    objective: "Reconhecer onde a mediadora reformula sem distorcer e separar posição, interesse e ponto em aberto.",
  },
  reusedIds: ["ko:문제", "ko:관점", "ko:여전히", "ko:표면적"],
  grammar: [
    [
      "-ㄴ/는 입장에서는 — do ponto de vista de; na posição de",
      "동사 + -는 입장에서는 / 형용사 + -(으)ㄴ 입장에서는 / 명사 + (의) 입장에서는",
      "Desloca o enunciado para a perspectiva de quem está em determinada posição, sem afirmar que essa perspectiva é a correta. É comum em mediação, reportagens e reuniões, porque permite reconhecer o ponto do outro antes de discordar. Compare com -에 따르면, que atribui a informação a uma fonte; -ㄴ/는 입장에서는 descreve o que se vê a partir de um lugar. Não use para uma opinião pessoal simples: nesse caso, -ㄴ/는 내 생각에는 é mais natural.",
      [
        ["학부모 입장에서는 등교 시간이 더 중요할 수 있다.", "Do ponto de vista dos pais, o horário de entrada pode ser mais importante."],
        ["중재자 입장에서는 양쪽의 요구를 그대로 받아들이기 어렵다.", "Do ponto de vista do mediador, é difícil aceitar os pedidos dos dois lados tal como estão."],
      ],
    ],
    [
      "-ㄹ 수 있도록 — para que se possa; de modo que",
      "동사 + -ㄹ 수 있도록",
      "Indica a finalidade de uma ação, com foco na criação de uma condição para que outra pessoa ou outro grupo consiga fazer algo. É frequente em propostas, atas e instruções institucionais. Compare com -기 위해, que expressa o objetivo de quem age; -ㄹ 수 있도록 coloca em primeiro plano a condição oferecida a terceiros. O sujeito da segunda oração não precisa ser o mesmo da primeira.",
      [
        ["중재자는 두 팀이 기준을 함께 만들 수 있도록 초안을 준비했다.", "A mediadora preparou um rascunho para que as duas equipes pudessem construir o critério juntas."],
        ["회의가 길어지지 않도록 안건을 세 개로 줄였다.", "Reduzi a pauta a três itens para que a reunião não se alongasse."],
      ],
    ],
  ],
  guided: [
    mcq("O que a mediadora faz antes de propor uma solução?", ["Separa o pedido declarado do interesse que ele protege.", "Decide qual das duas equipes tem razão.", "Pede que as partes assinem um acordo imediato."], "Separa o pedido declarado do interesse que ele protege.", "A mediação começa distinguindo posição e interesse, para que o acordo não seja apenas uma votação."),
    cloze("Complete a reformulação da mediadora: 두 팀 모두 중요한 일을 놓치지 않으려는 ___에서는 같다.", "입장", "-ㄴ/는 입장에서는 introduz a perspectiva a partir da qual os dois lados se igualam."),
    listen("Ouça e escreva a fala em que a mediadora reformula o interesse da equipe de design.", "디자인팀은 알림의 수를 줄이는 것보다 업무 흐름을 지키고 싶은 거네요.", "디자인팀은 알림의 수를 줄이는 것보다 업무 흐름을 지키고 싶은 거네요.", "Falando de outro modo, a equipe de design quer preservar o fluxo de trabalho mais do que reduzir o número de alertas."),
    reading("표면적으로는 알림의 수를 줄이자는 요구와 늘리자는 요구가 맞섰지만, 중재자는 두 팀의 입장차를 그대로 옮기지 않고 각 팀이 지키려는 것을 따로 적었다. 디자인팀의 관점에서는 집중을 방해받지 않는 시간이 중요했고, 고객지원팀의 관점에서는 긴급한 문의를 놓치지 않는 절차가 중요했다.", "Qual foi o procedimento da mediadora?", ["Ela registrou separadamente o que cada equipe queria preservar.", "Ela escolheu a equipe com o pedido mais razoável.", "Ela pediu que as equipes parassem de se comunicar."], "Ela registrou separadamente o que cada equipe queria preservar.", "O texto diz que ela não transcreveu a diferença de posições, mas anotou à parte o que cada equipe protegia."),
    translate("pt-ko", "Traduza: “Do ponto de vista da equipe de atendimento, o volume de alertas não é o problema.”", "고객지원팀 입장에서는 알림의 양이 문제가 아니다.", "-ㄴ/는 입장에서는 apresenta a perspectiva sem endossá-la.", ["고객지원팀의 입장에서는 알림의 양이 문제가 아니다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ 수 있도록 corretamente?", ["두 팀이 기준을 함께 만들 수 있도록 초안을 준비했다.", "두 팀이 기준을 함께 만들도록 수 있어요.", "두 팀이 기준을 함께 만들 수 있도록 했다 기준을."], "두 팀이 기준을 함께 만들 수 있도록 초안을 준비했다.", "A forma é 동사 + -ㄹ 수 있도록, e a oração seguinte expressa a ação que cria a condição."),
    cloze("Complete a finalidade: 두 팀이 기준을 함께 만들 수 ___ 제가 초안을 정리하겠습니다.", "있도록", "-ㄹ 수 있도록 liga a ação da mediadora à condição oferecida às duas equipes."),
    listen("Ouça e escreva o princípio que a mediadora repete.", "중재자는 어느 쪽의 편도 들지 않고 남은 쟁점을 기록으로 남겼다.", "중재자는 어느 쪽의 편도 들지 않고 남은 쟁점을 기록으로 남겼다.", "A mediadora não ficou do lado de ninguém e registrou os pontos que restaram."),
    translate("ko-pt", "Traduza: 갈등 해소는 감정의 정리로 끝나지 않는다.", "A resolução do conflito não termina com a organização das emoções.", "해소 = resolução; a frase nega que a mediação se encerre no plano emocional.", ["Resolver o conflito não se encerra no ajuste das emoções."]),
    reading("이 사례에서 배울 점은 갈등 해소가 감정의 정리로 끝나지 않는다는 것이다. 입장차를 없애는 대신 이해관계를 분명히 하고, 남은 쟁점을 기록으로 남겨야 다음 단계로 갈 수 있다. 유연성은 원칙을 버리는 태도가 아니라, 원칙을 지키면서 방법을 바꾸는 능력이다.", "O que o texto entende por flexibilidade?", ["Manter os princípios e mudar o método.", "Abandonar os princípios para chegar a um acordo.", "Evitar registrar os pontos que ficaram abertos."], "Manter os princípios e mudar o método.", "O texto define flexibilidade como mudar o método sem abandonar os princípios."),
  ],
  summary: [
    "Mediar começa por separar a posição declarada do interesse que ela protege.",
    "Reformular é devolver a fala em uma versão que o outro reconheça, sem apagar o conflito.",
    "-ㄴ/는 입장에서는 apresenta a perspectiva de quem ocupa uma posição.",
    "-ㄹ 수 있도록 indica a condição criada para que outra pessoa possa agir.",
    "Um acordo parcial registra o que ficou aberto em vez de fingir um remendo completo.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · duas posições, um próximo passo",
    "Descreva um conflito real ou plausível entre dois grupos. Reformule a posição de cada lado em termos de interesse, diga o que as duas versões têm em comum e proponha um próximo passo verificável. Não escolha um vencedor.",
    "두 편의 입장을 공정하게 정리하고 다음 단계를 제안해 보세요.",
    ["Comece pela situação, sem atribuir culpa.", "Reformule cada posição com -ㄴ/는 입장에서는.", "Nomeie um interesse comum às duas partes.", "Use -ㄹ 수 있도록 uma vez para apresentar a condição que você propõe.", "Termine com um passo concreto e com o que ainda precisa ser decidido."],
    ["Duas posições reformuladas sem distorção.", "Interesse comum nomeado.", "Uso correto de -ㄴ/는 입장에서는.", "Uso correto de -ㄹ 수 있도록.", "Próximo passo verificável.", "Ponto em aberto declarado."],
    "지난달 두 팀 사이에 알림 도구를 둘러싼 분쟁이 생겼다. 디자인팀은 알림이 너무 많다고 했고, 고객지원팀은 긴급 문의를 놓칠 수 없다고 했다. 중재자 입장에서는 두 요구를 그대로 맞세우면 결론이 나지 않는다는 점이 분명했다. 그래서 각 팀이 무엇을 지키려는지 먼저 확인했다. 디자인팀은 집중 시간을, 고객지원팀은 대응 절차를 중요하게 여겼다. 두 팀이 같은 기준을 만들 수 있도록 중재자가 초안을 준비했다. 합의는 완전한 봉합이 아니었고, 긴급의 기준은 다음 회의에서 다시 논의하기로 했다. 갈등 해소는 감정을 정리하는 일이 아니라 남은 문제를 기록하는 일이다.",
    "No mês passado, surgiu uma disputa entre duas equipes por causa da ferramenta de notificações. A equipe de design disse que havia alertas demais, e o atendimento ao cliente disse que não podia perder mensagens urgentes. Do ponto de vista da mediadora, estava claro que contrapor os dois pedidos tal como estavam não levaria a conclusão alguma. Por isso, primeiro verifiquei o que cada equipe queria preservar. A equipe de design valorizava o tempo de concentração; o atendimento, o procedimento de resposta. A mediadora preparou um rascunho para que as duas equipes pudessem construir o mesmo critério. O acordo não foi um remendo completo, e o critério de urgência ficou para ser discutido de novo na reunião seguinte. Resolver um conflito não é organizar emoções, mas registrar os problemas que restam.",
    "Exemplo original de oito frases. Observe a separação entre posição e interesse e o ponto que permanece aberto. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l32 — adaptar um texto técnico para leitores não especialistas. */
export const C1_L32 = defineC1Lesson({
  id: "c1-l32", number: 32, moduleId: "c1-m07", title: "Reformular para outro público",
  objective: "Adaptar um texto técnico para leitores não especialistas sem perder precisão.",
  prerequisites: ["c1-l31"], estimatedMinutes: 80, dialogueTitle: "A mesma pesquisa, outra plateia",
  intro: [
    {
      title: "O público não é um déficit",
      body: "Reformular para não especialistas não é esvaziar o conteúdo: é reconstruir o caminho até ele. O leitor de fora não conhece o vocabulário, mas conhece o mundo, e é por ali que a explicação começa. A pergunta útil não é “como simplificar?”, e sim “o que esta pessoa precisa saber para julgar a conclusão?”. Isso costuma exigir menos termos técnicos e mais contexto sobre o que foi medido, com quem e por quanto tempo.",
      ko: "일반 독자는 전문용어를 모르지만, 무엇을 비교했는지는 이해할 수 있다.",
    },
    {
      title: "Analogia com prazo de validade",
      body: "Uma analogia aproxima o desconhecido, mas sempre deixa algo de fora. Depois de usá-la, diga o que ela não cobre: o estudo mediu a média da cidade, não o ar de uma sala; observou um período curto, não a vida inteira. Se a analogia substituir a condição, o leitor aplica a conclusão onde ela não vale. A boa explicação mantém o número principal, define o termo uma vez e repete a ressalva no fim.",
      ko: "비유는 이해를 돕지만, 연구의 범위를 넓히지 않도록 조건을 함께 밝혀야 한다.",
    },
  ],
  dialogue: [
    ["성민", "선생님, 지난번에 보내 주신 자료는 읽었는데 숫자가 너무 많아서 어디부터 봐야 할지 모르겠어요.", "Professora, li o material que a senhora enviou, mas há números demais e não sei por onde começar."],
    ["하윤", "죄송합니다. 제가 논문 요약본을 그대로 보냈네요. 오늘은 같은 내용을 다른 방식으로 설명해 보겠습니다.", "Desculpe. Enviei o resumo do artigo tal como estava. Hoje vou tentar explicar o mesmo conteúdo de outro modo."],
    ["성민", "이 지역 아이들의 호흡기 질환이 늘었다는 결론은 이해했어요. 다만 원인이 공기 때문인지 확실한가요?", "Entendi a conclusão de que as doenças respiratórias das crianças desta região aumentaram. Mas é certo que a causa é o ar?"],
    ["하윤", "확실하다고 말할 수는 없습니다. 관찰 자료라서 다른 요인을 완전히 배제하지 못했습니다.", "Não posso dizer que seja certo. Como são dados observacionais, não foi possível excluir completamente outros fatores."],
    ["성민", "그럼 ‘공기가 나빠서 아이들이 아프다’고 하면 너무 단정적인 거네요.", "Então dizer ‘as crianças adoecem porque o ar está ruim’ é categórico demais."],
    ["하윤", "맞습니다. ‘공기 질과 호흡기 질환 사이에 관련이 관찰되었다’는 식으로 말해야 합니다.", "Exato. É preciso falar no sentido de ‘foi observada uma relação entre a qualidade do ar e as doenças respiratórias’."],
    ["성민", "주민들에게 설명할 때는 그 차이를 어떻게 전하면 좋을까요?", "Como é melhor transmitir essa diferença ao explicar para os moradores?"],
    ["하윤", "숫자는 하나만 남기고, 대신 무엇을 비교했는지와 한계를 함께 말씀해 주세요. 주민들이 조건을 이해할 수 있게 한 장짜리 설명 자료를 만들어 드릴게요.", "Deixe apenas um número e diga, em contrapartida, o que foi comparado e quais são os limites. Vou preparar um material explicativo de uma página para que os moradores possam entender as condições."],
  ],
  readingText: {
    titlePt: "Traduzir um número para quem vai decidir",
    paragraphs: [
      "기후 연구를 취재하는 기자는 논문의 요약본과 보도 자료를 함께 읽는다. 논문에는 ‘미세먼지 농도가 1세제곱미터당 5마이크로그램 증가할 때 호흡기 질환 입원율이 2퍼센트 높아졌다’는 문장이 있다. 이 문장을 그대로 옮기면 일반 독자는 숫자의 의미를 붙잡기 어렵다. 그래서 기자는 먼저 무엇을 비교했는지 확인하고, 그다음에 비유를 하나 찾는다. ‘방 안의 공기가 조금 더 탁해질 때 병원을 찾는 사람이 늘어난다’는 식으로 풀어쓴다. 그러나 비유는 방 안의 공기를 다루지만, 연구가 측정한 것은 도시 전체의 평균 농도다.",
      "눈높이에 맞춘다고 해서 숫자를 지울 필요는 없다. 기자는 2퍼센트라는 수치를 남기고, 대신 기준과 범위를 함께 적었다. 요약본에는 ‘단기 노출’이라는 조건이 있었지만 보도 자료에는 빠져 있었다. 난이도를 낮추는 일과 조건을 지우는 일은 다르다. 독자가 결론을 어디까지 적용할 수 있는지 알 수 있게 하는 것이 설명의 목표다. 친숙한 사례로 시작하되, 사례와 연구 대상이 같은지 확인해야 한다. 그 확인이 없으면 친절한 설명이 오히려 과장으로 변한다.",
      "환언은 같은 내용을 다른 말로 옮기는 작업에 그치지 않는다. 무엇을 남기고 무엇을 설명으로 채울지 결정하는 일이다. 전문용어를 모두 없애면 정확성이 사라질 수 있고, 하나도 풀지 않으면 독자가 멈춘다. 좋은 재서술은 필요한 용어를 한 번 정의하고, 그 용어를 일관되게 쓴다. 이 기사는 마지막에 연구의 한계를 두 문장으로 밝혔다. 자료의 출처와 조건을 함께 적을 때, 쉬운 설명은 책임을 피하지 않는다.",
    ],
    pt: "A jornalista que cobre pesquisas sobre clima lê o resumo do artigo e o release de imprensa em conjunto. No artigo há a frase “quando a concentração de material particulado aumenta 5 microgramas por metro cúbico, a taxa de internação por doenças respiratórias sobe 2%”. Copiar essa frase tal como está faz com que o leitor geral tenha dificuldade de apreender o sentido do número. Por isso a jornalista primeiro verifica o que foi comparado e então procura uma analogia. Ela explica no sentido de “quando o ar de um quarto fica um pouco mais turvo, aumenta o número de pessoas que procuram o hospital”. A analogia, porém, trata do ar de um quarto, enquanto o estudo mediu a concentração média da cidade inteira. Ajustar-se ao nível do público não exige apagar os números. A jornalista mantém o valor de 2% e, em contrapartida, registra o critério e o alcance. O resumo trazia a condição de “exposição de curto prazo”, mas ela havia ficado de fora do release. Reduzir a dificuldade e apagar as condições são coisas diferentes. O objetivo da explicação é permitir que o leitor saiba até onde pode aplicar a conclusão. Comece por um exemplo familiar, mas verifique se o exemplo e o objeto do estudo são a mesma coisa. Sem essa verificação, uma explicação gentil se transforma justamente em exagero. Parafrasear não se limita a passar o mesmo conteúdo para outras palavras. É decidir o que manter e o que preencher com explicação. Eliminar todos os termos técnicos pode fazer a precisão desaparecer; não explicar nenhum faz o leitor parar. Uma boa reescrita define o termo necessário uma vez e o usa de modo consistente. Esta matéria esclareceu os limites do estudo em duas frases, no final. Quando a fonte e as condições dos dados são registradas em conjunto, a explicação fácil não foge da responsabilidade.",
    objective: "Comparar precisão e acessibilidade nas duas versões e localizar o que a analogia deixa de fora.",
  },
  reusedIds: ["ko:독자", "ko:자료", "ko:단정적", "ko:취재"],
  grammar: [
    [
      "-ㄴ/는 식으로 — no sentido de; da forma como",
      "동사 + -는 식으로 / 형용사 + -(으)ㄴ 식으로 / 명사 + 인 식으로",
      "Introduz o modo como algo é dito, feito ou formulado, muitas vezes como uma aproximação e não como citação exata. É comum ao reformular, resumir ou propor um formato. Compare com -는 방식으로, que descreve um método mais estável; -ㄴ/는 식으로 sugere “algo nessa linha” e admite variação. Não use quando o leitor precisa de uma transcrição literal.",
      [
        ["‘공기 질과 질환 사이에 관련이 관찰되었다’는 식으로 말해야 한다.", "É preciso falar no sentido de “foi observada uma relação entre a qualidade do ar e as doenças”."],
        ["그는 모든 문제를 일정 관리의 문제인 식으로 설명한다.", "Ele explica todos os problemas como se fossem uma questão de gestão de prazos."],
      ],
    ],
    [
      "-ㄹ 수 있게 — de modo que se possa",
      "동사 + -ㄹ 수 있게",
      "Semelhante a -ㄹ 수 있도록, mas com foco no resultado prático: a ação principal torna possível que alguém faça algo. Aparece em instruções, materiais didáticos e propostas. Compare com -게, que indica apenas o modo ou o resultado, sem a ideia de capacidade; -ㄹ 수 있게 acrescenta a possibilidade aberta pela ação. Na escrita formal, -ㄹ 수 있도록 é mais frequente; -ㄹ 수 있게 soa um pouco mais direto.",
      [
        ["주민들이 조건을 이해할 수 있게 한 장짜리 자료를 만들었다.", "Preparei um material de uma página para que os moradores pudessem entender as condições."],
        ["누구나 다시 확인할 수 있게 출처를 문장 끝에 적었다.", "Registrei a fonte no fim da frase para que qualquer pessoa pudesse verificar de novo."],
      ],
    ],
  ],
  guided: [
    mcq("Por que a jornalista evita copiar a frase técnica sem explicação?", ["Porque o leitor geral não consegue avaliar o número sem saber o que foi comparado.", "Porque números não podem aparecer em textos jornalísticos.", "Porque o estudo ainda não foi publicado."], "Porque o leitor geral não consegue avaliar o número sem saber o que foi comparado.", "A explicação precisa reconstruir o que foi medido e comparado, não apenas trocar palavras."),
    cloze("Complete a explicação: 기자는 ‘방 안의 공기가 탁해질 때’라는 ___로 시작했다.", "비유", "A analogia aproxima o leitor, mas precisa vir acompanhada do limite do estudo."),
    listen("Ouça e escreva como a pesquisadora reformula a conclusão para o conselho.", "‘공기 질과 호흡기 질환 사이에 관련이 관찰되었다’는 식으로 말해야 합니다.", "‘공기 질과 호흡기 질환 사이에 관련이 관찰되었다’는 식으로 말해야 합니다.", "É preciso falar no sentido de “foi observada uma relação entre a qualidade do ar e as doenças respiratórias”."),
    reading("‘방 안의 공기가 조금 더 탁해질 때 병원을 찾는 사람이 늘어난다’는 식으로 풀어쓴다. 그러나 비유는 방 안의 공기를 다루지만, 연구가 측정한 것은 도시 전체의 평균 농도다.", "O que a analogia deixa de fora?", ["O estudo mediu a média da cidade, não o ar de um ambiente isolado.", "O estudo não tinha nenhum dado numérico.", "O estudo foi feito apenas com crianças."], "O estudo mediu a média da cidade, não o ar de um ambiente isolado.", "O texto aponta explicitamente a diferença entre o ar de uma sala e a média urbana."),
    translate("pt-ko", "Traduza: “Reduzir a dificuldade e apagar as condições são coisas diferentes.”", "난이도를 낮추는 일과 조건을 지우는 일은 다르다.", "A frase separa acessibilidade de omissão das condições do estudo.", ["난이도를 낮추는 것과 조건을 지우는 것은 다르다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 식으로 corretamente?", ["그는 결과를 ‘가능성이 있다’는 식으로 설명했다.", "그는 결과를 ‘가능성이 있다’ 식으로는 설명했다.", "그는 결과를 ‘가능성이 있다’는 식으로 설명하는 식이다 했다."], "그는 결과를 ‘가능성이 있다’는 식으로 설명했다.", "A forma é -는 식으로, ligada ao conteúdo citado e ao verbo de dizer ou fazer."),
    cloze("Complete o objetivo: 주민들이 조건을 이해할 수 ___ 한 장짜리 자료를 만들었다.", "있게", "-ㄹ 수 있게 indica a possibilidade prática criada pelo material."),
    listen("Ouça e escreva o que a autora diz que a paráfrase não é.", "환언은 같은 내용을 다른 말로 옮기는 작업에 그치지 않는다.", "환언은 같은 내용을 다른 말로 옮기는 작업에 그치지 않는다.", "Parafrasear não se limita a passar o mesmo conteúdo para outras palavras."),
    translate("ko-pt", "Traduza: 요약본만 읽으면 조건이 사라지기 쉽다.", "Lendo apenas o resumo, as condições desaparecem facilmente.", "요약본 = versão resumida; a frase alerta para a perda das condições do estudo.", ["Se se lê apenas o resumo, é fácil que as condições desapareçam."]),
    reading("환언은 같은 내용을 다른 말로 옮기는 작업에 그치지 않는다. 무엇을 남기고 무엇을 설명으로 채울지 결정하는 일이다. 좋은 재서술은 필요한 용어를 한 번 정의하고, 그 용어를 일관되게 쓴다.", "O que caracteriza uma boa reescrita, segundo o texto?", ["Definir uma vez o termo necessário e usá-lo de modo consistente.", "Eliminar todos os termos técnicos.", "Repetir a frase original com sinônimos."], "Definir uma vez o termo necessário e usá-lo de modo consistente.", "O texto define a reescrita como escolha e pede definição única e uso consistente do termo."),
  ],
  summary: [
    "Reformular para outro público exige reconstruir o caminho até a conclusão, não esvaziá-la.",
    "A analogia aproxima, mas precisa declarar o que deixa de fora.",
    "-ㄴ/는 식으로 introduz uma formulação aproximada, não uma citação literal.",
    "-ㄹ 수 있게 indica a possibilidade prática criada por uma ação.",
    "Manter um número principal e explicar as condições é diferente de apagar o número ou as condições.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · o mesmo estudo, dois públicos",
    "Escolha um resultado técnico que você conhece e escreva um texto de divulgação para um público não especialista. Mantenha um número principal, explique o que foi comparado e diga o que a analogia escolhida não cobre.",
    "전문적인 내용을 일반 독자를 위해 다시 써 보세요.",
    ["Comece pelo que o público já sabe ou vive.", "Use uma analogia e diga imediatamente o que ela não cobre.", "Mantenha um número e explique sua base.", "Use -ㄴ/는 식으로 uma vez ao reformular uma conclusão.", "Use -ㄹ 수 있게 uma vez para explicar o que o material permite ao leitor fazer.", "Termine com a condição que não pode desaparecer."],
    ["Público e ponto de partida definidos.", "Uma analogia com limite declarado.", "Número principal mantido e contextualizado.", "Reformulação com -ㄴ/는 식으로.", "Condição preservada no fechamento.", "Registro acessível sem perda de precisão."],
    "지난주 지역 주민에게 공기 질 연구를 설명할 일이 있었다. 처음에는 논문 요약본을 그대로 읽었지만, 숫자가 많아 핵심이 보이지 않았다. 그래서 비교 대상과 기간을 먼저 말하고, 비유는 하나만 쓰기로 했다. ‘방 안의 공기가 탁해질 때 병원을 찾는 사람이 늘어난다’는 식으로 설명하자 주민들이 고개를 끄덕였다. 다만 비유가 연구의 범위를 넓히지 않도록 조건을 함께 밝혔다. 관찰 자료라는 점과 단기 노출만 다루었다는 점을 빼면 안 된다. 주민들이 조건을 이해할 수 있게 한 장짜리 자료도 만들었다. 쉬운 설명은 숫자를 지우는 일이 아니라, 숫자가 무엇을 말하는지 함께 놓는 일이다.",
    "Na semana passada, tive de explicar um estudo sobre qualidade do ar aos moradores da região. No começo, li o resumo do artigo tal como estava, mas havia números demais e o essencial não aparecia. Por isso decidi falar primeiro do que foi comparado e do período, e usar apenas uma analogia. Quando expliquei no sentido de “quando o ar de um quarto fica turvo, aumenta o número de pessoas que procuram o hospital”, os moradores assentaram a cabeça. No entanto, esclareci as condições junto, para que a analogia não ampliasse o alcance do estudo. Não se pode omitir que são dados observacionais e que o estudo trata apenas de exposição de curto prazo. Também preparei um material de uma página para que os moradores pudessem entender as condições. Explicar de forma fácil não é apagar os números, mas colocar junto o que os números dizem.",
    "Exemplo original de oito frases. Observe a analogia, o limite declarado e a condição preservada. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l33 — explicar um conceito cultural sem essencializar. */
export const C1_L33 = defineC1Lesson({
  id: "c1-l33", number: 33, moduleId: "c1-m07", title: "Traduzir conceitos culturais",
  objective: "Explicar um conceito cultural sem reduzi-lo a estereótipo nem tratá-lo como universal.",
  prerequisites: ["c1-l32"], estimatedMinutes: 80, dialogueTitle: "O que a foto não mostra",
  intro: [
    {
      title: "Equivalência não é identidade",
      body: "Traduzir um conceito cultural não é encontrar a palavra equivalente em outra língua: é dizer o que a prática faz, quem participa dela e em que condições. ‘Mutirão’ pode se aproximar de 품앗이, mas os dois não cobrem as mesmas obrigações nem a mesma história. Quando a explicação começa pela semelhança, o leitor entende rápido e conclui errado. Quando começa pela função e pelo contexto, ele entende devagar e entende melhor.",
      ko: "품앗이는 일을 서로 바꾸는 관행이라는 개념이지만, 모든 지역에서 같은 방식으로 운영된 것은 아니다.",
    },
    {
      title: "Descrever práticas, não essências",
      body: "Uma cultura não é uma personalidade coletiva. Dizer “os coreanos são assim” transforma uma prática histórica em natureza. Prefira sujeitos e situações: em certas famílias, em determinada geração, em áreas rurais até os anos 1980. Nomeie também quem ficava de fora: quem não tinha terra, quem trabalhava por salário, quem migrou. A variação não enfraquece a explicação; é o que impede que ela vire estereótipo.",
      ko: "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작하지만, 집단 전체를 본질화하지 않는 태도가 필요하다.",
    },
  ],
  dialogue: [
    ["루카", "이 마을에서 ‘품앗이’라는 말을 들었는데, 정확히 무슨 뜻이에요?", "Ouvi a palavra “품앗이” neste vilarejo. O que ela significa exatamente?"],
    ["지안", "일을 서로 바꾸는 관행이에요. 이웃이 논일을 도와주면, 나중에 그만큼 도와주는 거죠.", "É um costume de trocar trabalho. Se um vizinho ajuda no trabalho do arrozal, mais tarde ele recebe ajuda na mesma medida."],
    ["루카", "그러면 한국의 모든 농촌에서 지금도 하는 건가요?", "Então ainda se pratica em todas as zonas rurais da Coreia?"],
    ["지안", "지금은 거의 남아 있지 않아요. 기계가 들어오고 임금을 주고 일하는 방식이 퍼지면서 줄었어요.", "Hoje quase não resta. Diminuiu à medida que máquinas chegaram e o trabalho assalariado se difundiu."],
    ["루카", "아, 제가 본 사진에는 다 같이 웃으면서 일하는 모습만 있었어요.", "Ah, na foto que vi, só apareciam pessoas sorrindo enquanto trabalhavam juntas."],
    ["지안", "그 사진은 정서적인 면을 보여 주지만, 노동의 양과 의무는 보여 주지 않아요. 그걸 ‘전통’이라고만 하면 본질화가 되기 쉬워요.", "Essa foto mostra o lado afetivo, mas não mostra a quantidade de trabalho nem as obrigações. Chamar isso apenas de “tradição” facilita a essencialização."],
    ["루카", "그럼 어떻게 설명하면 좋을까요?", "Então como seria melhor explicar?"],
    ["지안", "어느 시기, 어느 지역의 이야기인지 밝히고, 지금도 하는 사람과 하지 않는 사람을 함께 말해 주세요.", "Diga de que período e de que região se trata e fale junto das pessoas que ainda praticam e das que não praticam."],
  ],
  readingText: {
    titlePt: "Uma troca que não cabe numa foto",
    paragraphs: [
      "품앗이는 마을 사람들이 일을 서로 나누어 주고받던 관행이다. 논밭일처럼 손이 많이 필요한 때에 이웃이 함께 일하고, 그만큼의 노동을 나중에 돌려받는다. 이 관계는 돈으로 계산되지 않지만, 정확한 장부가 없어도 오래 유지되었다. 품앗이를 단순한 친절로 설명하면 노동의 교환과 상호 의무를 놓치게 된다. 한국의 농촌에서 흔히 발견되지만, 비슷한 방식은 다른 지역에도 있다. 따라서 이 관행을 한국만의 고유한 정서로 설명하는 것은 조심스럽다.",
      "이 관행을 설명할 때는 시제와 지역을 함께 밝혀야 한다. 품앗이는 20세기 후반까지 널리 쓰였지만, 농기계와 임금 노동이 보급되면서 줄었다. 지금도 일부 마을에서는 이웃 간의 도움으로 남아 있지만, 모든 한국인이 품앗이를 경험했다고 말할 수는 없다. 호칭과 위계가 관계를 규정했던 방식도 세대에 따라 달랐다. 의례나 풍습을 설명할 때 ‘한국에서는 원래’라는 문장으로 시작하면 변화와 예외가 사라진다. 설명의 첫 문장이 집단 전체를 규정하면, 뒤에 붙는 예외는 읽히지 않는다.",
      "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다. 그러나 특수성을 강조하다 보면 집단 전체를 하나의 성격으로 본질화할 위험이 있다. 품앗이를 이야기할 때 중요한 것은 낭만적인 공동체상이 아니라, 누가 누구와 일을 바꾸었고 누가 그 관계에서 빠졌는가이다. 연구자들은 특정 마을의 경험을 일반화하지 않도록 사례의 범위를 밝힌다. 독자는 설명이 어디까지 유효한지 스스로 판단할 수 있어야 한다. 좋은 설명은 감동을 주는 대신 판단의 재료를 남긴다.",
    ],
    pt: "품앗이 é o costume pelo qual os moradores de um vilarejo dividiam e trocavam trabalho entre si. Em épocas de muita mão de obra, como no cultivo do arrozal, os vizinhos trabalhavam juntos e recebiam depois a mesma quantidade de trabalho de volta. Essa relação não era calculada em dinheiro, mas se manteve por muito tempo sem um livro-caixa exato. Explicar o 품앗이 como simples gentileza faz perder de vista a troca de trabalho e a obrigação mútua. Ele é encontrado com frequência no campo coreano, mas formas semelhantes existem em outras regiões. Por isso, é prudente não explicar esse costume como um afeto exclusivo da Coreia. Ao explicar esse costume, é preciso indicar o período e a região. O 품앗이 foi amplamente usado até o final do século XX, mas diminuiu com a difusão de máquinas agrícolas e do trabalho assalariado. Ainda hoje, em alguns vilarejos, ele permanece como ajuda entre vizinhos, mas não se pode dizer que todos os coreanos tenham vivenciado o 품앗이. A maneira como as formas de tratamento e a hierarquia definiam as relações também variou de geração para geração. Ao explicar rituais ou costumes, começar com a frase “na Coreia, originalmente” apaga mudanças e exceções. Se a primeira frase da explicação define o grupo inteiro, as exceções que vêm depois não são lidas. Explicar uma cultura começa por reconhecer a particularidade dessa cultura. No entanto, ao enfatizar a particularidade, corre-se o risco de essencializar o grupo inteiro como uma única personalidade. Ao falar do 품앗이, o importante não é a imagem romântica de comunidade, mas quem trocou trabalho com quem e quem ficou fora dessa relação. Os pesquisadores esclarecem o alcance dos casos para não generalizar a experiência de um vilarejo específico. O leitor deve poder julgar por si até onde a explicação é válida. Uma boa explicação, em vez de comover, deixa material para o julgamento.",
    objective: "Reconhecer contexto, variação e limite da explicação de um conceito cultural.",
  },
  reusedIds: ["ko:경험", "ko:연구", "ko:조심스럽다", "ko:의무"],
  grammar: [
    [
      "-ㄴ/는 개념이다 — é um conceito de; designa",
      "명사 + (이)라는 개념이다 / 동사 + -는 개념이다",
      "Usa-se para definir um termo, sobretudo quando ele nomeia uma ideia abstrata ou uma categoria analítica. É mais preciso que -는 것이다, porque deixa claro que se trata de uma definição conceitual, não de uma identidade entre duas coisas. Compare com -를 뜻하다, que explica o sentido de uma palavra; -ㄴ/는 개념이다 apresenta o termo como parte de um vocabulário de análise. Registro: acadêmico e ensaístico.",
      [
        ["‘품앗이’는 일을 서로 바꾸는 관행을 가리키는 개념이다.", "“품앗이” é um conceito que designa o costume de trocar trabalho entre si."],
        ["이 글에서 ‘공동체’는 지리적 범위가 아니라 관계의 밀도를 뜻하는 개념이다.", "Neste texto, “comunidade” é um conceito que designa a densidade das relações, não um limite geográfico."],
      ],
    ],
    [
      "-ㄹ 때 — quando; ao",
      "동사 + -ㄹ 때 / 형용사 + -(으)ㄹ 때 / 명사 + 일 때",
      "Marca o momento ou a situação em que algo ocorre. Em textos explicativos, também pode introduzir a condição em que uma prática faz sentido, como em “ao explicar um costume”. Compare com -는 동안, que indica simultaneidade com duração; -ㄹ 때 recorta um momento ou uma ocasião. Não confunda com -았/었을 때, que situa o fato no passado.",
      [
        ["품앗이를 설명할 때는 시제와 지역을 함께 밝혀야 한다.", "Ao explicar o 품앗이, é preciso indicar o período e a região."],
        ["집단 전체를 하나의 성격으로 볼 때 설명은 쉽게 본질화된다.", "Quando se vê o grupo inteiro como uma única personalidade, a explicação se essencializa facilmente."],
      ],
    ],
  ],
  guided: [
    mcq("O que o texto diz sobre o alcance do 품앗이?", ["Foi comum no campo coreano, mas variou conforme o período e a região.", "É praticado por todos os coreanos até hoje.", "Nunca existiu fora da Coreia."], "Foi comum no campo coreano, mas variou conforme o período e a região.", "O texto situa a prática no tempo e no espaço e recusa a generalização a todos os coreanos."),
    cloze("Complete a definição: 품앗이는 일을 서로 바꾸는 ___이다.", "관행", "O texto define o 품앗이 como um costume (관행) de troca de trabalho, não como simples gentileza."),
    listen("Ouça e escreva a advertência sobre explicar o 품앗이 apenas como afeto.", "품앗이를 정서적 유대만으로 설명하면 노동의 양과 의무가 사라진다.", "품앗이를 정서적 유대만으로 설명하면 노동의 양과 의무가 사라진다.", "Explicar o 품앗이 apenas como vínculo afetivo faz desaparecer a quantidade de trabalho e a obrigação."),
    reading("품앗이는 마을 사람들이 일을 서로 나누어 주고받던 관행이다. 논밭일처럼 손이 많이 필요한 때에 이웃이 함께 일하고, 그만큼의 노동을 나중에 돌려받는다. 이 관계는 돈으로 계산되지 않지만, 정확한 장부가 없어도 오래 유지되었다.", "O que o texto destaca no 품앗이 além da ajuda mútua?", ["A troca de trabalho e a obrigação de retribuir.", "O pagamento em dinheiro ao final do dia.", "A ausência de qualquer relação duradoura."], "A troca de trabalho e a obrigação de retribuir.", "O texto insiste que não se trata de gentileza isolada, mas de troca com retribuição posterior."),
    translate("pt-ko", "Traduza: “Sem indicar o período e a região, é difícil explicar o conceito.”", "시기와 지역을 밝히지 않으면 그 개념을 설명하기 어렵다.", "A frase mantém a exigência de contexto e usa o vocabulário da lição.", ["시기와 지역을 밝히지 않고 그 개념을 설명하기는 어렵다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 개념이다 de forma adequada?", ["‘품앗이’는 일을 서로 바꾸는 관행을 가리키는 개념이다.", "‘품앗이’는 일을 서로 바꾸는 관행이라는 개념을 했다.", "‘품앗이’는 일을 서로 바꾸는 관행인 개념이에요 한다."], "‘품앗이’는 일을 서로 바꾸는 관행을 가리키는 개념이다.", "A definição conceitual usa -는 개념이다 e não transforma o termo em sujeito de um verbo de fala."),
    cloze("Complete a cautela: 집단 전체를 하나의 성격으로 ___할 위험이 있다.", "본질화", "본질화 é o risco de transformar práticas variáveis em uma suposta essência do grupo."),
    listen("Ouça e escreva por onde começa a explicação de uma cultura.", "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다.", "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다.", "Explicar uma cultura começa por reconhecer a particularidade dessa cultura."),
    translate("ko-pt", "Traduza: 품앗이는 모든 한국인이 경험한 풍습이 아니다.", "O 품앗이 não é um costume que todos os coreanos vivenciaram.", "A frase recusa a generalização e separa a prática de uma suposta experiência nacional comum.", ["O 품앗이 não é um costume vivido por todos os coreanos."]),
    reading("문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다. 그러나 특수성을 강조하다 보면 집단 전체를 하나의 성격으로 본질화할 위험이 있다. 품앗이를 이야기할 때 중요한 것은 낭만적인 공동체상이 아니라, 누가 누구와 일을 바꾸었고 누가 그 관계에서 빠졌는가이다.", "O que o texto considera mais importante ao falar do 품앗이?", ["Quem trocou trabalho com quem e quem ficou de fora.", "A imagem romântica da comunidade rural.", "A certeza de que a prática continua igual em todo o país."], "Quem trocou trabalho com quem e quem ficou de fora.", "O texto troca a imagem romântica pela pergunta sobre participantes e exclusões."),
  ],
  summary: [
    "Traduzir um conceito cultural é explicar prática, participantes e condições, não achar um equivalente exato.",
    "Toda explicação precisa de período, região e variação; sem isso, a prática vira essência.",
    "-ㄴ/는 개념이다 define um termo como categoria analítica, com precisão.",
    "-ㄹ 때 recorta o momento ou a ocasião em que algo ocorre.",
    "A pergunta “quem ficou de fora?” protege a explicação do estereótipo.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · um conceito, com contexto e ressalva",
    "Escolha um conceito cultural que você conhece bem e explique-o a alguém de fora. Diga o que a prática faz, quem participa, de que período e região você está falando e o que a sua explicação não cobre.",
    "하나의 문화 개념을 맥락과 한계를 함께 밝혀 설명해 보세요.",
    ["Comece pela função da prática, não por uma equivalência de palavras.", "Defina o termo com -ㄴ/는 개념이다.", "Use -ㄹ 때 uma vez para situar a explicação.", "Inclua uma variação interna e uma mudança histórica.", "Termine dizendo quem fica fora da sua descrição."],
    ["Conceito definido pela função.", "Período e região indicados.", "Variação interna mencionada.", "Uso correto de -ㄴ/는 개념이다.", "Uso correto de -ㄹ 때.", "Ressalva contra a generalização."],
    "품앗이는 이웃이 일을 서로 바꾸던 관행이다. 논일이 많은 시기에 함께 일하고, 그만큼의 노동을 나중에 돌려받는다. 이 관행은 한국의 농촌에서 흔히 발견되지만, 모든 지역이나 세대가 같은 방식으로 경험한 것은 아니다. 농기계와 임금 노동이 퍼지면서 20세기 후반에 크게 줄었다. 품앗이를 설명할 때는 정서적 유대만 강조하면 노동의 양과 의무가 사라진다. 또한 ‘한국에서는 원래’라는 문장으로 시작하면 변화와 예외를 지우기 쉽다. 따라서 어느 시기, 어느 지역의 이야기인지 밝히고, 지금도 이 관행을 이어 가는 사람과 그렇지 않은 사람을 함께 말해야 한다. 문화를 설명하는 일은 집단을 본질화하지 않는 데서 시작한다.",
    "O 품앗이 é o costume pelo qual vizinhos trocavam trabalho entre si. Em épocas de muito trabalho no arrozal, trabalhavam juntos e recebiam depois a mesma quantidade de trabalho de volta. Esse costume é encontrado com frequência no campo coreano, mas nem todas as regiões ou gerações o vivenciaram da mesma forma. Ele diminuiu muito no final do século XX, com a difusão de máquinas agrícolas e do trabalho assalariado. Ao explicar o 품앗이, enfatizar apenas o vínculo afetivo faz desaparecer a quantidade de trabalho e a obrigação. Além disso, começar com a frase “na Coreia, originalmente” apaga facilmente mudanças e exceções. Por isso, é preciso indicar de que período e de que região se fala e mencionar juntas as pessoas que ainda mantêm essa prática e as que não a mantêm. Explicar uma cultura começa por não essencializar o grupo.",
    "Exemplo original de oito frases. Observe a definição pela função, o recorte histórico e a recusa da generalização. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l34 — pertencimento e representação sem falar pelo grupo. */
export const C1_L34 = defineC1Lesson({
  id: "c1-l34", number: 34, moduleId: "c1-m07", title: "Pertencer e representar",
  objective: "Discutir identidade e pertencimento sem falar em nome de um grupo inteiro.",
  prerequisites: ["c1-l33"], estimatedMinutes: 80, dialogueTitle: "Quem fala por nós",
  intro: [
    {
      title: "Experiência própria e voz coletiva",
      body: "Falar sobre si é diferente de falar pelo grupo. A primeira pessoa pode descrever o que viu, onde cresceu, o que lhe custou; a segunda reivindica uma voz que ninguém delegou. O problema não é usar “nós” quando ele foi construído com outras pessoas, mas transformar uma experiência em explicação geral. Quando a fala individual é recebida como retrato do grupo, o interlocutor deixa de ouvir uma pessoa e passa a confirmar uma imagem que já tinha.",
      ko: "내가 말할 수 있는 것은 한 사람의 경험에 지나지 않는다는 점을 분명히 해야 한다.",
    },
    {
      title: "A expectativa de representar",
      body: "Quem vem de um grupo minoritário muitas vezes é convidado a explicar o grupo inteiro. Recusar esse convite não é negar a própria origem: é delimitar o que se pode afirmar. Uma saída prática é dizer “no meu caso” e, em seguida, indicar que outras pessoas vivem de outra maneira. Outra é transformar a pergunta: em vez de “como é ser X?”, perguntar “o que aconteceu com você?”. A segunda pergunta abre espaço para uma pessoa; a primeira pede um representante.",
      ko: "집단의 이름으로 말할수록 한 사람의 경험은 정형화된 이미지에 가까워진다.",
    },
  ],
  dialogue: [
    ["유나", "그 다큐멘터리 봤어? 우리 학교 출신 사람들이 나온다고 해서 봤는데.", "Você viu aquele documentário? Vi porque disseram que apareciam pessoas formadas na nossa escola."],
    ["도현", "봤어. 그런데 우리를 너무 한 가지 이야기로 묶는 것 같지 않았어?", "Vi. Mas não pareceu que nos juntavam numa única história?"],
    ["유나", "응. 제작진이 ‘이주배경 청소년의 고민’을 보여 준다고 했는데, 인터뷰 질문이 늘 비슷했어.", "Sim. A equipe disse que mostraria “as angústias dos jovens de origem migrante”, mas as perguntas da entrevista eram sempre parecidas."],
    ["도현", "나는 한국어를 잘한다는 칭찬을 자주 받는데, 그게 칭찬인지 확인인지 모르겠어.", "Eu recebo muitas vezes o elogio de falar bem coreano, mas não sei se é elogio ou verificação."],
    ["유나", "나도. 내가 브라질에서 왔다고 하면 삼바를 아느냐고 물어. 그건 내 경험이 아니라 정형화된 이미지잖아.", "Eu também. Quando digo que vim do Brasil, perguntam se sei sambar. Isso não é a minha experiência, é uma imagem estereotipada."],
    ["도현", "그런데 우리가 아무 말도 안 하면, 또 다른 사람이 우리를 대신 설명하게 되잖아.", "Mas, se não dissermos nada, outra pessoa acaba explicando por nós."],
    ["유나", "그래서 내가 말할 때는 ‘우리’ 대신 ‘나’를 쓰려고 해. 그게 집단을 대변하는 건 아니니까.", "Por isso, quando falo, tento usar “eu” em vez de “nós”. Isso não é falar em nome do grupo."],
    ["도현", "좋다. 다음 인터뷰에서는 질문을 먼저 확인하고, 우리가 답하고 싶은 범위를 정하자.", "Bom. Na próxima entrevista, vamos verificar as perguntas antes e definir até onde queremos responder."],
  ],
  readingText: {
    titlePt: "Um nome que não cabe em mim",
    paragraphs: [
      "나는 초등학교 때 한국에 왔다. 집에서는 포르투갈어를 쓰고, 학교에서는 한국어를 썼다. 어느 쪽도 완벽하지 않다는 말을 자주 들었지만, 나는 두 언어가 섞인 문장으로 친구들과 잘 지냈다. 문제는 내가 ‘다문화 가정 아이’로 소개될 때 시작되었다. 선생님은 나를 교실의 대표로 세우고 다른 문화를 설명해 달라고 했다. 한 번은 설명을 거절했더니, 부끄러워하는 아이로 기록되었다. 그때 나는 말하지 않는 것도 하나의 답이라는 걸 배웠다.",
      "그 경험 뒤로 나는 내가 무엇을 대표하는지 자주 생각했다. 내가 한국 사람이라고 하면 누군가는 고향을 묻고, 브라질 사람이라고 하면 한국어 실력을 확인한다. 정체성은 하나의 이름표로 정리되지 않는다. 내 관점에서 소속감은 집, 친구, 음식, 언어가 겹치는 자리에서 만들어진다. 그것은 집단의 대표성이 아니라 한 사람의 경험이다. 그런데도 인터뷰 요청은 늘 ‘이주민의 목소리’라는 틀을 요구했다. 내가 조용히 있으면 다른 사람이 나를 설명하는 셈이지만, 내가 나서면 내 경험이 집단 전체의 답이 된다.",
      "나는 우리 집단을 대변할 수 없다. 대신 내가 본 것과 기억하는 것을 말할 수 있다. 그 차이를 분명히 하면, 독자는 한 사람의 이야기를 전체로 착각하지 않게 된다. 물론 개인의 이야기도 사회적 조건을 보여 준다. 그러나 개인의 경험이 곧 집단의 정형화된 이미지를 확인해 주는 자료가 되어서는 안 된다. 내가 말할 수 있는 것은 한 사람의 경험에 지나지 않는다. 소수자라는 이름으로 묶이는 순간, 그 안의 차이는 보이지 않게 된다. 타자를 이해한다는 것은 그 사람을 하나의 사례로 소비하지 않는 일이다.",
    ],
    pt: "Eu vim para a Coreia no ensino fundamental. Em casa falava português; na escola, coreano. Ouvia com frequência que eu não era perfeito em nenhum dos dois, mas me dava bem com os amigos usando frases misturadas das duas línguas. O problema começou quando passei a ser apresentado como “criança de família multicultural”. A professora me colocava como representante da turma e pedia que eu explicasse outra cultura. Uma vez recusei explicar, e fui registrado como uma criança tímida. Naquele momento aprendi que não falar também é uma resposta. Depois dessa experiência, passei a pensar com frequência no que eu represento. Se digo que sou coreano, alguém pergunta de onde vem minha família; se digo que sou brasileiro, verificam meu nível de coreano. A identidade não se organiza em uma única etiqueta. Do meu ponto de vista, o senso de pertencimento se constrói no lugar em que casa, amigos, comida e língua se sobrepõem. Isso não é a representatividade de um grupo, mas a experiência de uma pessoa. Ainda assim, os pedidos de entrevista sempre exigiam a moldura “a voz dos imigrantes”. Se fico em silêncio, é como se outra pessoa me explicasse; mas, se me apresento, minha experiência se torna a resposta de todo o grupo. Não posso falar em nome do meu grupo. Em vez disso, posso falar do que vi e do que lembro. Se essa diferença fica clara, o leitor não confunde a história de uma pessoa com o todo. É claro que a história individual também mostra condições sociais. No entanto, a experiência individual não deve se tornar material que confirma a imagem estereotipada do grupo. O que posso dizer não passa da experiência de uma pessoa. No momento em que somos agrupados sob o nome de minoria, as diferenças internas deixam de ser vistas. Entender o outro é não consumir essa pessoa como mais um caso.",
    objective: "Reconhecer a tensão entre experiência individual e expectativa de representação do grupo.",
  },
  reusedIds: ["ko:기억", "ko:관점", "ko:정체성", "ko:요청"],
  grammar: [
    [
      "-ㄴ/는 셈이다 — pode-se dizer que; equivale a",
      "동사 + -는 셈이다 / 형용사 + -(으)ㄴ 셈이다 / 명사 + 인 셈이다",
      "Apresenta uma conclusão inferida: dadas as circunstâncias, pode-se dizer que é assim. Não descreve um fato observado, mas o resultado de um cálculo ou de uma situação. Compare com -는 것이다, que afirma uma definição; -ㄴ/는 셈이다 admite que se trata de uma consequência. É comum na fala e em textos de opinião, com registro neutro.",
      [
        ["내가 조용히 있으면 다른 사람이 나를 설명하는 셈이다.", "Se eu ficar em silêncio, é como se outra pessoa me explicasse."],
        ["이름을 밝히지 않으면 독자는 그 경험을 누구의 것도 아닌 것으로 읽는 셈이다.", "Se não se revela o nome, é como se o leitor lesse essa experiência como se não fosse de ninguém."],
      ],
    ],
    [
      "-ㄴ/는 데 지나지 않는다 — não passa de; é apenas",
      "동사 + -는 데 지나지 않는다 / 형용사 + -(으)ㄴ 데 지나지 않는다 / 명사 + 에 지나지 않는다",
      "Limita o alcance de algo, muitas vezes corrigindo uma expectativa excessiva. Pode soar duro, por isso aparece em críticas, ensaios e autodefinições cuidadosas. Compare com -ㄹ 뿐이다, que também limita, mas é mais neutro; -ㄴ/는 데 지나지 않는다 acrescenta a ideia de que algo ficou aquém do que se supunha. Não use para desqualificar uma pessoa em contexto público sem necessidade.",
      [
        ["내가 말할 수 있는 것은 한 사람의 경험에 지나지 않는다.", "O que posso dizer não passa da experiência de uma pessoa."],
        ["그 인터뷰는 집단의 목소리가 아니라 한 사례에 지나지 않았다.", "Aquela entrevista não era a voz do grupo, mas apenas um caso."],
      ],
    ],
  ],
  guided: [
    mcq("Por que a narradora recusa representar o grupo?", ["Porque uma experiência individual não pode responder por todas as pessoas do grupo.", "Porque não se considera parte de nenhum grupo social.", "Porque não quer falar sobre a própria infância."], "Porque uma experiência individual não pode responder por todas as pessoas do grupo.", "O texto separa a experiência própria da representação coletiva e recusa a equiparação."),
    cloze("Complete a frase: 내가 느끼는 ___은 하나의 이름표로 정리되지 않는다.", "소속감", "O pertencimento aparece como relação construída, não como etiqueta fixa."),
    listen("Ouça e escreva o limite que a narradora declara.", "나는 우리 집단을 대변할 수 없고, 내가 본 것만 말할 수 있다.", "나는 우리 집단을 대변할 수 없고, 내가 본 것만 말할 수 있다.", "Não posso falar em nome do meu grupo; posso falar apenas do que vi."),
    reading("선생님은 나를 교실의 대표로 세우고 다른 문화를 설명해 달라고 했다. 한 번은 설명을 거절했더니, 부끄러워하는 아이로 기록되었다. 그때 나는 말하지 않는 것도 하나의 답이라는 걸 배웠다.", "O que a narradora aprendeu com a recusa?", ["Que não falar também é uma resposta.", "Que deveria ter explicado a cultura do grupo.", "Que a escola tinha razão em usá-la como exemplo."], "Que não falar também é uma resposta.", "A recusa foi interpretada como timidez, e a narradora passou a ver o silêncio como resposta possível."),
    translate("pt-ko", "Traduza: “Uma pessoa não pode falar em nome do grupo inteiro.”", "한 사람이 집단 전체를 대변할 수는 없다.", "대변하다 = falar em nome de; a frase limita o alcance da voz individual.", ["한 사람이 집단 전체를 대표할 수는 없다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 셈이다 corretamente?", ["내가 침묵하면 다른 사람이 나를 설명하는 셈이다.", "내가 침묵하면 다른 사람이 나를 설명하는 셈이었다 된다.", "내가 침묵하면 다른 사람이 나를 설명한다 셈이다."], "내가 침묵하면 다른 사람이 나를 설명하는 셈이다.", "-ㄴ/는 셈이다 apresenta a consequência inferida da situação, não um fato independente."),
    cloze("Complete o limite: 내가 말할 수 있는 것은 한 사람의 경험에 ___ 않는다.", "지나지", "A forma é -ㄴ/는 데 지나지 않는다, que reduz o alcance do que se afirma."),
    listen("Ouça e escreva o que a experiência individual não deve se tornar.", "개인의 경험이 집단의 정형화된 이미지를 확인해 주는 자료가 되어서는 안 된다.", "개인의 경험이 집단의 정형화된 이미지를 확인해 주는 자료가 되어서는 안 된다.", "A experiência individual não deve se tornar material que confirme a imagem estereotipada do grupo."),
    translate("ko-pt", "Traduza: 타자를 이해한다는 것은 그 사람을 하나의 사례로 소비하지 않는 일이다.", "Entender o outro é não consumir essa pessoa como mais um caso.", "타자 = o outro; 소비하다 = consumir; a frase recusa transformar a pessoa em exemplo."),
    reading("나는 우리 집단을 대변할 수 없다. 대신 내가 본 것과 기억하는 것을 말할 수 있다. 그 차이를 분명히 하면, 독자는 한 사람의 이야기를 전체로 착각하지 않게 된다. 그러나 개인의 경험이 곧 집단의 정형화된 이미지를 확인해 주는 자료가 되어서는 안 된다.", "Qual é a distinção central do último parágrafo?", ["Entre narrar a própria experiência e representar o grupo inteiro.", "Entre falar coreano e falar português.", "Entre morar na cidade e morar no campo."], "Entre narrar a própria experiência e representar o grupo inteiro.", "O parágrafo separa o que a narradora viu do que seria falar em nome de todos."),
  ],
  summary: [
    "Pertencimento é relação e sobreposição de experiências, não uma etiqueta única.",
    "Falar de si não autoriza falar pelo grupo; a voz coletiva precisa ser delegada.",
    "-ㄴ/는 셈이다 apresenta a consequência inferida de uma situação.",
    "-ㄴ/는 데 지나지 않는다 limita o alcance de uma afirmação.",
    "Recusar a expectativa de representar também é uma resposta ética.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · pertencer sem falar por todos",
    "Escreva um parágrafo pessoal sobre um lugar ou grupo a que você pertence. Narre uma experiência concreta, diga o que ela não permite concluir sobre o grupo e recuse explicitamente a representação coletiva.",
    "한 집단에 속한 경험을 개인의 목소리로 써 보세요.",
    ["Comece por uma cena concreta, não por uma definição de identidade.", "Use -ㄴ/는 셈이다 uma vez para mostrar uma consequência.", "Use -ㄴ/는 데 지나지 않는다 uma vez para limitar o alcance do relato.", "Diga o que outras pessoas do grupo podem viver de forma diferente.", "Evite explicar o grupo inteiro."],
    ["Experiência concreta e situada.", "Distinção entre “eu” e “nós”.", "Uso correto de -ㄴ/는 셈이다.", "Uso correto de -ㄴ/는 데 지나지 않는다.", "Limite do relato declarado.", "Sem generalização pelo grupo."],
    "나는 어릴 때 한국에 와서 두 언어 사이에서 자랐다. 학교에서는 나를 ‘다문화 가정 아이’로 소개했고, 다른 문화를 설명해 달라는 요청을 자주 받았다. 처음에는 내 경험이 도움이 된다고 생각했지만, 곧 내가 집단 전체를 대변하고 있다는 느낌을 받았다. 내가 말하지 않으면 또 다른 사람이 나를 대신 설명하게 된다는 점도 알고 있다. 그래서 나는 ‘우리’ 대신 ‘나’를 쓰고, 내가 본 것과 기억하는 것을 구분해서 말한다. 소속감은 하나의 이름표가 아니라 관계가 겹치는 자리에서 만들어진다. 내가 말할 수 있는 것은 한 사람의 경험에 지나지 않는다. 개인의 이야기는 집단의 정형화된 이미지를 확인하는 자료가 아니다. 타자를 이해한다는 것은 그 사람을 하나의 사례로 소비하지 않는 일이다.",
    "Eu vim para a Coreia criança e cresci entre duas línguas. Na escola, apresentavam-me como “criança de família multicultural”, e eu recebia com frequência o pedido de explicar outra cultura. No começo, achei que minha experiência ajudava, mas logo tive a sensação de que falava pelo grupo inteiro. Também sei que, se eu não falar, outra pessoa acaba me explicando. Por isso uso “eu” em vez de “nós” e separo o que vi do que lembro. O pertencimento não é uma etiqueta, mas se constrói no lugar em que as relações se sobrepõem. O que posso dizer não passa da experiência de uma pessoa. A história individual não é material para confirmar a imagem estereotipada do grupo. Entender o outro é não consumir essa pessoa como mais um caso.",
    "Exemplo original de nove frases. Observe a cena concreta, o limite declarado e a recusa da voz coletiva. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l35 — ética da representação e correção responsável. */
export const C1_L35 = defineC1Lesson({
  id: "c1-l35", number: 35, moduleId: "c1-m07", title: "A ética de representar",
  objective: "Avaliar o risco de uma representação cultural e propor uma correção responsável.",
  prerequisites: ["c1-l34"], estimatedMinutes: 80, dialogueTitle: "A intenção não fecha a questão",
  intro: [
    {
      title: "Intenção e efeito não se anulam",
      body: "Uma campanha pode querer homenagear uma prática e, ao mesmo tempo, transformá-la em decoração. Dizer “não foi a intenção” encerra a conversa cedo demais: intenção explica de onde veio a escolha, não o que a imagem faz com quem aparece nela. A análise ética separa as duas coisas. Também não se trata de culpar um indivíduo isolado; trata-se de examinar decisões de roteiro, câmera, edição e pagamento, que são coletivas e verificáveis.",
      ko: "선한 의도가 있다고 해서 효과가 비판에서 자유로운 것은 아니다.",
    },
    {
      title: "Corrigir é mudar o procedimento",
      body: "Pedir desculpas sem alterar o processo garante que o problema volte. Uma correção responsável muda quem decide: consulta prévia às pessoas representadas, revisão do material por quem conhece o contexto, crédito e remuneração pelo trabalho, direito de retirar uma cena que exponha alguém. Nenhum desses passos elimina todo risco, mas cada um deixa um rastro verificável. O critério deixa de ser o gosto de quem produz e passa a incluir quem foi representado.",
      ko: "촬영 전에 지역 주민의 자문을 거치고, 편집본은 당사자의 검수를 받아야 한다.",
    },
  ],
  dialogue: [
    ["서윤", "이번 캠페인 영상, 반응은 좋던데 우리가 놓친 부분이 있을까요?", "O vídeo desta campanha está tendo boa reação. Será que deixamos algo passar?"],
    ["민재", "조회수는 높아요. 그런데 댓글을 보면 ‘한국은 역시 정이 많다’는 식의 반응이 많아요.", "As visualizações estão altas. Mas, vendo os comentários, muitas reações são do tipo “a Coreia realmente tem muito afeto”."],
    ["서윤", "그건 우리가 의도한 가족의 온기와는 조금 다른 방향이네요.", "Isso é um pouco diferente da direção do calor familiar que pretendíamos."],
    ["민재", "네. 영상이 김장을 장식처럼 보여 주면서 노동은 지웠어요. 그게 이국취향으로 읽힐 위험이 있어요.", "Sim. O vídeo mostra o kimchi como decoração e apaga o trabalho. Há o risco de isso ser lido como exotismo."],
    ["서윤", "의도가 좋았다고 해서 효과까지 정당화되지는 않죠.", "O fato de a intenção ter sido boa não isenta o efeito."],
    ["민재", "맞아요. 그래서 촬영 전에 지역 주민 자문을 받고, 참여자 이름과 역할을 화면에 넣자고 제안합니다.", "Exato. Por isso proponho consultar os moradores antes da gravação e incluir na tela os nomes e papéis dos participantes."],
    ["서윤", "일정이 촉박한데, 검수와 감수를 어디까지 넣을 수 있을까요?", "O cronograma está apertado. Até onde podemos incluir a verificação e a supervisão?"],
    ["민재", "최소한 편집본을 당사자에게 보여 주고, 민감한 장면은 다시 찍을 수 있게 일정을 조정합시다.", "No mínimo, mostremos o corte final às pessoas representadas e ajustemos o cronograma para que cenas sensíveis possam ser refeitas."],
  ],
  readingText: {
    titlePt: "O que a câmera aquece e o que ela apaga",
    paragraphs: [
      "한 식품 기업의 겨울 캠페인 ‘겨울의 온기’는 김장을 다룬 30초 영상으로 시작되었다. 영상에는 붉은 고추, 김이 서린 항아리, 웃는 가족이 반복해서 등장한다. 제작진은 한국의 가족 문화를 따뜻하게 보여 주려 했다고 밝혔다. 의도는 존중할 만하지만, 영상이 만든 효과는 다르다. 김장은 공동 노동과 저장의 기술이며, 지역과 계층에 따라 방식이 다르다. 영상은 그 과정을 장식적인 배경으로 바꾸었다. 재현은 대상을 고르는 일이며, 고르지 않은 것을 지우는 일이기도 하다.",
      "비평의 초점은 제작진의 개인적 태도가 아니라 구성에 있다. 카메라가 손과 항아리만 비추고, 실제로 일하는 사람의 이름과 목소리는 들리지 않는다. 이국취향은 낯선 것을 아름답게 만드는 데 그치지 않고, 그 노동을 보이지 않게 한다. 문화의 상품화는 참여자의 동의와 보상을 가리기 쉽다. 이 영상은 김장을 ‘한국의 전통’으로만 설명하면서, 겨울철 노동의 부담과 세대 간 갈등을 지웠다. 웃는 가족의 이미지는 갈등이 없다는 뜻이 아니라, 갈등이 화면에 들어오지 않았다는 뜻이다.",
      "책임 있는 수정은 영상을 없애는 일이 아니다. 먼저 촬영 전에 지역 주민과 자문을 거치고, 등장하는 사람의 역할을 화면에 밝힌다. 대본과 편집본은 당사자의 검수를 받고, 감수자가 맥락을 확인해야 한다. 기업은 캠페인의 수익 일부를 지역 공동체에 돌려주는 방안도 검토할 수 있다. 민감한 소재일수록 결정의 근거를 공개해야 한다. 이런 절차가 없으면 선한 의도는 또 다른 차용으로 남는다. 판단의 근거는 취향이 아니라, 누가 말하고 누가 보상받는가이다.",
    ],
    pt: "A campanha de inverno de uma empresa de alimentos, “O calor do inverno”, começou com um vídeo de 30 segundos sobre o kimchi. No vídeo aparecem repetidamente pimentas vermelhas, potes cobertos de vapor e uma família sorrindo. A equipe declarou que quis mostrar com afeto a cultura familiar coreana. A intenção merece respeito, mas o efeito criado pelo vídeo é outro. O kimchi é trabalho coletivo e técnica de conservação, e seu modo de preparo varia conforme a região e a classe social. O vídeo transformou esse processo em cenário decorativo. Representar é escolher um objeto e também apagar o que não foi escolhido. O foco da crítica não está na atitude pessoal da equipe, mas na composição. A câmera mostra apenas mãos e potes, e não se ouvem o nome nem a voz de quem realmente trabalha. O exotismo não se limita a embelezar o que é estranho: ele torna esse trabalho invisível. A mercantilização da cultura tende a esconder o consentimento e a remuneração dos participantes. O vídeo explicou o kimchi apenas como “tradição coreana” e apagou o peso do trabalho de inverno e os conflitos entre gerações. A imagem da família sorrindo não significa que não haja conflito, mas que o conflito não entrou no enquadramento. Uma correção responsável não é eliminar o vídeo. Primeiro, consultar os moradores da região antes da gravação e esclarecer na tela o papel de cada pessoa que aparece. O roteiro e o corte final devem passar pela verificação das pessoas representadas, e o supervisor deve confirmar o contexto. A empresa também pode considerar devolver parte da receita da campanha à comunidade local. Quanto mais sensível o tema, mais público deve ser o fundamento das decisões. Sem esses procedimentos, a boa intenção permanece apenas como mais uma apropriação. O fundamento do julgamento não é o gosto, mas quem fala e quem é remunerado.",
    objective: "Reconhecer onde a representação simplifica ou exotiza e distinguir intenção de efeito.",
  },
  reusedIds: ["ko:판단", "ko:근거", "ko:조회수", "ko:의도"],
  grammar: [
    [
      "-ㄴ/는 것은 아니다 — não é que seja; não significa que",
      "동사 + -는 것은 아니다 / 형용사 + -(으)ㄴ 것은 아니다 / 명사 + 인 것은 아니다",
      "Nega uma inferência que o interlocutor poderia tirar, sem negar o fato anterior. É uma forma de precisão argumentativa: admite o dado e recusa a conclusão apressada. Compare com -지 않다, que nega diretamente o predicado; -ㄴ/는 것은 아니다 nega a leitura, não o fato. Muito comum em críticas e respostas institucionais.",
      [
        ["선한 의도가 있다고 해서 효과가 비판에서 자유로운 것은 아니다.", "O fato de haver boa intenção não isenta o efeito da crítica."],
        ["영상을 없애자는 것이 우리 제안인 것은 아니다.", "Não é que nossa proposta seja eliminar o vídeo."],
      ],
    ],
    [
      "-ㄹ 위험이 있다 — há risco de",
      "동사 + -ㄹ 위험이 있다",
      "Aponta um risco possível, não uma consequência certa. É frequente em avaliações, pareceres e críticas que querem evitar alarmismo. Compare com -ㄹ 수 있다, que indica possibilidade neutra; -ㄹ 위험이 있다 carrega avaliação negativa e pede, em geral, uma medida preventiva. Não use para riscos físicos imediatos em que há expressões mais diretas.",
      [
        ["그 장면은 이국취향으로 읽힐 위험이 있다.", "Há o risco de aquela cena ser lida como exotismo."],
        ["절차가 없으면 선한 의도가 또 다른 차용으로 남을 위험이 있다.", "Sem procedimento, há o risco de a boa intenção permanecer como mais uma apropriação."],
      ],
    ],
  ],
  guided: [
    mcq("Onde o texto localiza o problema da campanha?", ["Na composição, que mostra o trabalho sem nome, voz ou remuneração.", "Na vida pessoal de cada integrante da equipe.", "No fato de o vídeo ter poucas visualizações."], "Na composição, que mostra o trabalho sem nome, voz ou remuneração.", "A crítica se dirige a decisões de composição e processo, não a culpa individual."),
    cloze("Complete o risco: 영상이 김장을 장식으로만 보여 주면서 이국취향으로 읽힐 ___이 있다.", "위험", "A forma -ㄹ 위험이 있다 nomeia um risco possível e pede uma medida preventiva."),
    listen("Ouça e escreva o que a representação também faz, além de escolher.", "재현은 대상을 고르는 일이며, 고르지 않은 것을 지우는 일이기도 하다.", "재현은 대상을 고르는 일이며, 고르지 않은 것을 지우는 일이기도 하다.", "Representar é escolher um objeto e também apagar o que não foi escolhido."),
    reading("카메라가 손과 항아리만 비추고, 실제로 일하는 사람의 이름과 목소리는 들리지 않는다. 이국취향은 낯선 것을 아름답게 만드는 데 그치지 않고, 그 노동을 보이지 않게 한다. 문화의 상품화는 참여자의 동의와 보상을 가리기 쉽다.", "Qual é o efeito apontado pelo texto?", ["Tornar invisíveis o trabalho e as condições de quem participa.", "Aumentar a renda das comunidades locais.", "Explicar detalhadamente a técnica de conservação."], "Tornar invisíveis o trabalho e as condições de quem participa.", "O texto mostra que o exotismo e a mercantilização escondem trabalho, consentimento e remuneração."),
    translate("pt-ko", "Traduza: “A boa intenção não isenta o efeito da crítica.”", "선한 의도가 효과를 비판에서 면제해 주지는 않는다.", "A frase separa intenção e efeito, sem negar que a intenção exista.", ["선한 의도가 있다고 해서 효과가 비판에서 자유로운 것은 아니다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 것은 아니다 corretamente?", ["영상을 없애자는 것이 우리 제안인 것은 아니다.", "영상을 없애자는 것이 우리 제안인 것은 아니다 했다.", "영상을 없애자는 것이 우리 제안인 것 아니다는 것이다."], "영상을 없애자는 것이 우리 제안인 것은 아니다.", "A forma nega a leitura do interlocutor e mantém o fato anterior."),
    cloze("Complete a correção: 촬영 전에 지역 주민의 ___을 거쳐야 한다.", "자문", "자문 é a consulta prévia às pessoas que conhecem o contexto."),
    listen("Ouça e escreva qual é o fundamento do julgamento, segundo o texto.", "판단의 근거는 취향이 아니라, 누가 말하고 누가 보상받는가이다.", "판단의 근거는 취향이 아니라, 누가 말하고 누가 보상받는가이다.", "O fundamento do julgamento não é o gosto, mas quem fala e quem é remunerado."),
    translate("ko-pt", "Traduza: 민감한 소재일수록 결정의 근거를 공개해야 한다.", "Quanto mais sensível o tema, mais público deve ser o fundamento das decisões.", "민감한 = sensível; 근거 = fundamento; a frase pede transparência proporcional ao risco."),
    reading("책임 있는 수정은 영상을 없애는 일이 아니다. 먼저 촬영 전에 지역 주민과 자문을 거치고, 등장하는 사람의 역할을 화면에 밝힌다. 대본과 편집본은 당사자의 검수를 받고, 감수자가 맥락을 확인해야 한다. 이런 절차가 없으면 선한 의도는 또 다른 차용으로 남는다.", "O que o texto propõe como correção?", ["Mudar o procedimento, com consulta, crédito, verificação e supervisão.", "Retirar o vídeo do ar imediatamente.", "Substituir a equipe responsável pela campanha."], "Mudar o procedimento, com consulta, crédito, verificação e supervisão.", "A proposta não é apagar o vídeo, mas alterar quem participa e como o material é verificado."),
  ],
  summary: [
    "Intenção e efeito são planos distintos: a boa intenção não responde pelo que a imagem faz.",
    "Exotismo e mercantilização escondem trabalho, consentimento e remuneração.",
    "-ㄴ/는 것은 아니다 nega a leitura apressada sem negar o fato.",
    "-ㄹ 위험이 있다 nomeia um risco possível e pede medida preventiva.",
    "Corrigir é mudar o procedimento: consulta, crédito, verificação e supervisão.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · uma crítica com correção",
    "Analise uma peça de comunicação que representa uma prática cultural. Descreva a intenção declarada, o efeito que a composição produz, o risco que você identifica e uma correção de procedimento verificável.",
    "문화를 재현한 콘텐츠를 비판하고 책임 있는 수정안을 제안해 보세요.",
    ["Descreva a peça antes de avaliar.", "Separe a intenção declarada do efeito observável.", "Use -ㄴ/는 것은 아니다 uma vez para recusar uma leitura fácil.", "Use -ㄹ 위험이 있다 uma vez para nomear o risco.", "Proponha uma mudança de procedimento, não apenas um pedido de desculpas.", "Termine com o critério que deve orientar a decisão."],
    ["Intenção e efeito separados.", "Risco nomeado com evidência da peça.", "Uso correto de -ㄴ/는 것은 아니다.", "Uso correto de -ㄹ 위험이 있다.", "Correção de procedimento verificável.", "Critério de julgamento explícito."],
    "한 기업의 겨울 캠페인은 김장을 장식적인 영상으로 만들었다. 제작진은 가족의 온기를 보여 주려 했다고 하지만, 화면에는 노동하는 사람의 이름과 목소리가 없었다. 재현은 대상을 고르는 일이며, 고르지 않은 것을 지우는 일이기도 하다. 이 영상은 김장을 ‘한국의 전통’으로만 설명하면서 지역과 계층에 따른 차이를 사라지게 했다. 의도가 좋았다고 해서 효과까지 정당화되는 것은 아니다. 수정은 영상을 없애는 일이 아니라, 촬영 전 자문과 편집본 검수, 참여자에 대한 보상을 절차로 만드는 일이다. 이런 절차가 없으면 선한 의도가 또 다른 차용으로 남을 위험이 있다. 민감한 소재일수록 결정의 근거를 공개해야 한다. 판단의 기준은 취향이 아니라 누가 말하고 누가 보상받는가이다.",
    "A campanha de inverno de uma empresa transformou o kimchi em um vídeo decorativo. A equipe diz que quis mostrar o calor da família, mas na tela não havia o nome nem a voz de quem trabalha. Representar é escolher um objeto e também apagar o que não foi escolhido. O vídeo explicou o kimchi apenas como “tradição coreana” e fez desaparecer as diferenças conforme a região e a classe social. O fato de a intenção ter sido boa não justifica o efeito. A correção não é eliminar o vídeo, mas transformar em procedimento a consulta antes da gravação, a verificação do corte final e a remuneração dos participantes. Sem esses procedimentos, há o risco de a boa intenção permanecer como mais uma apropriação. Quanto mais sensível o tema, mais público deve ser o fundamento das decisões. O critério do julgamento não é o gosto, mas quem fala e quem é remunerado.",
    "Exemplo original de nove frases. Observe a separação entre intenção e efeito e a correção voltada ao procedimento. Exemplo ilustrativo; não é gabarito.",
  ),
});
