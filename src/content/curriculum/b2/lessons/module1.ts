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

/** b2-l01 — fundo, evento principal e avaliação. */
export const B2_L01 = defineB2Lesson({
  id: "b2-l01", number: 1, moduleId: "b2-m01", title: "O dia que mudou tudo",
  objective: "Distinguir fundo, evento principal e avaliação em uma narrativa pessoal.",
  prerequisites: [], estimatedMinutes: 75, dialogueTitle: "O dia em que tudo mudou",
  intro: [
    { title: "Fundo e evento principal", body: "Uma narrativa B2 não é uma lista de fatos. O fundo mostra como era a vida antes; o evento principal mostra o que quebrou a rotina. Use -던 para o que estava em andamento ou era hábito, e o passado simples para o evento que interrompeu esse fundo.", ko: "회사 근처 카페에서 커피를 마시던 중이었어요." },
    { title: "O que ficou para trás", body: "-았/었던 apresenta uma ação ou estado passado já concluído e separado do presente. A diferença é de perspectiva: -던 olha para o que estava acontecendo; -았/었던 olha para o que terminou. Não use -던 para um evento pontual concluído.", ko: "어제 먹었던 빵이 아직 남아 있어요." },
  ],
  dialogue: [
    ["지민", "그날 이야기를 다시 들려줄래? 아직도 기억에 남아.", "Pode me contar de novo sobre aquele dia? Ainda está na minha memória."],
    ["수진", "그날 아침까지는 평범했어. 회사 근처 카페에서 커피를 마시던 중이었어.", "Até aquela manhã era tudo normal. Eu estava tomando café numa cafeteria perto da empresa."],
    ["지민", "그런데 갑자기 해고 통보를 받은 거지?", "E então você recebeu um aviso de demissão de repente, certo?"],
    ["수진", "응. 처음에는 당황했어. 계획했던 일이 모두 무너지는 것 같았어.", "Sim. No começo fiquei desconcertada. Parecia que tudo o que eu tinha planejado desmoronava."],
    ["지민", "퇴근길에 우연히 옛 동료를 마주친 것도 그날이었지?", "Foi nesse dia também que você encontrou por acaso um ex-colega no caminho de casa?"],
    ["수진", "맞아. 그 친구가 새 공고를 알려 줬어. 지금 돌아보면 그게 전환점이었어.", "Isso. Ele me contou sobre uma nova vaga. Olhando para trás, aquele foi o ponto de virada."],
    ["지민", "그 실패가 다시 공부를 시작한 계기가 된 거네.", "Então aquele fracasso se tornou o motivo para você voltar a estudar."],
    ["수진", "응. 그 경험을 좋은 기회로 여겼고, 스무 살 무렵의 꿈을 다시 좇았어.", "Sim. Encarei aquela experiência como uma boa oportunidade e voltei ao sonho dos meus vinte anos."],
  ],
  readingText: {
    titlePt: "O que aquele dia deixou",
    paragraphs: [
      "나는 스무 살 무렵부터 회사에 다니는 것이 꿈이었다. 그 꿈을 이루기 위해 매일 아침 일찍 일어났고, 주말에도 공부를 했다. 그때는 힘든 줄도 모르고 달렸다. 매일 조금씩 나아지고 있다고 믿었다.",
      "어느 날 갑자기 해고 통보를 받았다. 처음에는 당황했지만, 곧 그 일이 내 인생의 전환점이라는 것을 알았다. 퇴근길에 우연히 만난 옛 동료가 새로운 공고를 알려 주었고, 나는 그 실패를 다시 시작하는 계기로 여겼다.",
      "지금 돌아보면, 그날의 나는 두려움 때문에 쉽게 돌아서지 못했다. 하지만 시간이 지나면서 나는 그 경험을 필요한 기억으로 여겼다. 그 하루는 나를 바꾼 사건이었고, 지금의 나를 설명하는 장면이 되었다.",
    ],
    pt: "Eu sonhava em trabalhar numa empresa desde os vinte anos. Para realizar esse sonho, acordava cedo todos os dias e estudava até nos fins de semana. Naquela época, eu corria sem nem perceber o cansaço. Um dia, recebi de repente um aviso de demissão. No começo fiquei desconcertada, mas logo percebi que aquele acontecimento era um ponto de virada na minha vida. No caminho de casa, um ex-colega que encontrei por acaso me contou sobre uma nova vaga, e eu encarei aquele fracasso como o motivo para recomeçar. Olhando para trás, a pessoa que eu era naquele dia não conseguia mudar de direção facilmente por causa do medo. Mas, com o tempo, aceitei aquela experiência como uma memória necessária. Aquele dia foi o acontecimento que me transformou e se tornou a cena que explica quem eu sou hoje.",
    objective: "Separar o que era rotina do que foi o ponto de virada e localizar a avaliação da narradora.",
  },
  reusedIds: ["ko:기억", "ko:경험", "ko:시간"],
  grammar: [
    ["-던 — ação em andamento ou hábito no passado", "동사/형용사 + -던", "Use -던 quando a ação estava em andamento, era repetida ou não estava concluída no momento de referência. É comum com 마시다, 다니다, 살다 e com a estrutura -던 중이다. Não use -던 para um evento pontual concluído; nesse caso, o passado simples ou -았/었던 é mais claro. Registro: neutro, frequente na fala e na escrita narrativa.", [["회사 근처 카페에서 커피를 마시던 중이었어요.", "Eu estava tomando café numa cafeteria perto da empresa."], ["어렸을 때 자주 가던 곳이에요.", "É um lugar onde eu costumava ir quando criança."]]],
    ["-았/었던 — ação concluída e separada do presente", "동사/형용사 + -았/었던", "Use -았/었던 para uma ação ou estado passado que já terminou e não continua. A forma é especialmente útil para contrastar com o presente: 예전에 살았던 집 (a casa onde morei) versus 지금 사는 집 (a casa onde moro). A diferença em relação a -던 é de perspectiva, não de tempo: -던 destaca o processo; -았/었던 destaca o encerramento. Registro: neutro, um pouco mais narrativo.", [["어제 먹었던 빵이 아직 남아 있어요.", "O pão que eu comi ontem ainda está sobrando."], ["예전에 살았던 동네에 다시 가 봤어요.", "Voltei ao bairro onde morei antigamente."]]],
  ],
  guided: [
    mcq("Por que o dia foi um ponto de virada?", ["Porque ela perdeu o emprego e encontrou uma nova direção.", "Porque ela recebeu um aumento.", "Porque ela se mudou para outro país."], "Porque ela perdeu o emprego e encontrou uma nova direção.", "해고 통보 → 전환점 → 다시 공부."),
    cloze("Complete o fundo da cena: 회사 근처 카페에서 커피를 마시___ 중이었어요.", "던", "마시던 중 indica a ação em andamento no passado."),
    listen("Ouça e escreva o evento principal do relato.", "어느 날 갑자기 해고 통보를 받았어요.", "어느 날 갑자기 해고 통보를 받았어요.", "Um dia, recebi de repente um aviso de demissão."),
    reading("나는 스무 살 무렵부터 회사에 다니는 것이 꿈이었다. 어느 날 갑자기 해고 통보를 받았지만, 그 일은 내 인생의 전환점이 되었다. 퇴근길에 우연히 만난 옛 동료가 새로운 공고를 알려 주었다.", "O que transformou o dia em ponto de virada?", ["O aviso de demissão e o encontro com um ex-colega.", "O café da manhã e a reunião.", "A mudança de bairro e o novo curso."], "O aviso de demissão e o encontro com um ex-colega.", "해고 통보와 우연한 만남이 전환점을 만들었어요."),
    translate("pt-ko", "Traduza: “A empresa onde eu trabalhava fechou.”", "제가 다니던 회사가 문을 닫았어요.", "다니던 회사 usa -던 para o vínculo passado.", ["제가 일하던 회사가 문을 닫았어요."]),
  ],
  independent: [
    mcq("Qual frase usa -던 para uma ação em andamento no passado?", ["커피를 마시던 중이었어요.", "커피를 마셨어요.", "커피를 마실 거예요."], "커피를 마시던 중이었어요.", "-던 중 descreve a ação em andamento."),
    cloze("Complete a ação em andamento: 회사에 가___ 중이었어요.", "던", "가던 중 descreve a ação em andamento no passado."),
    listen("Ouça e escreva o ponto de virada.", "그날은 제 인생의 전환점이었어요.", "그날은 제 인생의 전환점이었어요.", "Aquele dia foi o ponto de virada da minha vida."),
    translate("ko-pt", "Traduza: 그 실패가 다시 공부를 시작한 계기가 되었어요.", "Aquele fracasso se tornou o motivo para eu voltar a estudar.", "계기가 되다 = tornar-se o motivo/oportunidade.", ["Aquele fracasso foi o que me levou a voltar a estudar."]),
    reading("지금 돌아보면, 그날의 나는 두려움 때문에 쉽게 돌아서지 못했다. 하지만 시간이 지나면서 나는 그 경험을 필요한 기억으로 여겼다.", "Como a narradora vê o dia hoje?", ["Como uma memória necessária que a ajudou a mudar.", "Como um erro que ela prefere apagar.", "Como um dia sem consequências."], "Como uma memória necessária que a ajudou a mudar.", "필요한 기억으로 받아들였다."),
  ],
  summary: ["-던 mostra ação em andamento ou hábito no passado.", "-았/었던 mostra ação concluída e separada do presente.", "Uma narrativa B2 organiza fundo, evento principal e avaliação.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · um ponto de virada",
    "Escreva um parágrafo narrativo sobre um dia que mudou sua rotina ou sua forma de ver algo. Mostre o fundo, o evento principal e a avaliação que você faz hoje.",
    "인생의 전환점이 된 하루에 대해 써 보세요.",
    ["Comece pelo fundo: como era a rotina antes.", "Use -던 ou -았/었던 uma vez.", "Nomeie o evento principal sem antecipar a conclusão.", "Termine com uma avaliação explícita."],
    ["Fundo reconhecível.", "Evento principal claro.", "Uma forma -던 ou -았/었던 usada com sentido.", "Avaliação final coerente.", "Parágrafo conectado, não uma lista."],
    "작년 봄, 저는 작은 회사에서 일하고 있었어요. 매일 같은 시간에 출근하던 평범한 생활이었어요. 어느 날 회사에서 갑자기 구조 조정을 한다는 소식을 들었어요. 처음에는 당황했지만, 그 일을 계기로 오래 미뤄 둔 공부를 다시 시작했어요. 지금 돌아보면 그 하루는 제 인생의 전환점이었어요.",
    "Na primavera passada, eu trabalhava numa pequena empresa. Era uma rotina comum, em que eu saía para o trabalho no mesmo horário todos os dias. Um dia, ouvi de repente na empresa a notícia de uma reestruturação. No começo fiquei desconcertado, mas usei aquilo como motivo para retomar os estudos que vinha adiando. Olhando para trás, aquele dia foi o ponto de virada da minha vida.",
    "Exemplo original de 5 frases. Observe o fundo com -던, o evento com o passado simples e a avaliação final. Não copie: use a estrutura para comparar com o seu texto.",
  ),
});

/** b2-l02 — causa encadeada e reinterpretação. */
export const B2_L02 = defineB2Lesson({
  id: "b2-l02", number: 2, moduleId: "b2-m01", title: "Por que isso aconteceu",
  objective: "Explicar causas encadeadas e reinterpretar um acontecimento depois dos fatos.",
  prerequisites: ["b2-l01"], estimatedMinutes: 75, dialogueTitle: "A causa que ninguém viu",
  intro: [
    { title: "A razão que impede outra ação", body: "-느라(고) explica que uma pessoa estava ocupada fazendo algo e por isso não pôde fazer outra coisa. O resultado costuma ser negativo ou lamentado. Não use com adjetivos nem para uma causa neutra; para isso, -아/어서 é mais natural.", ko: "발표를 준비하느라 쉬지 못했어요." },
    { title: "O que eu vi e o que mudou", body: "-더니 liga uma constatação passada do falante a uma mudança ou resultado que ele observou depois. A primeira oração costuma ter sujeito de terceira pessoa; com a primeira pessoa, a forma é mais restrita. Não confunda com -았/었더니, que parte de uma experiência do próprio falante.", ko: "동생이 열심히 공부하더니 합격했어요." },
  ],
  dialogue: [
    ["마르코", "프로젝트가 왜 이렇게 늦어졌어요?", "Por que o projeto atrasou tanto?"],
    ["수진", "처음에는 직원 한 명의 실수라고 짐작했어요.", "No começo, supus que fosse um erro de um funcionário."],
    ["마르코", "그런데 확인해 보니 달랐죠?", "Mas, quando verificaram, era diferente, certo?"],
    ["수진", "네. 발단은 작은 일정 변경이었어요. 그 변경이 다른 문제들과 엉켜서 큰 지연을 초래했어요.", "Sim. O início foi uma pequena mudança de cronograma. Essa mudança se emaranhou com outros problemas e provocou um grande atraso."],
    ["마르코", "그럼 원인은 한 사람이 아니었네요.", "Então a causa não era uma só pessoa."],
    ["수진", "맞아요. 회의 기록을 뒤늦게 확인하고 나서야 진짜 원인을 깨달았어요.", "Exato. Só depois de verificar tarde as atas de reunião é que percebi a causa real."],
    ["마르코", "결국 어떻게 풀렸어요?", "E como se resolveu no fim?"],
    ["수진", "팀이 역할을 다시 나누면서 일정이 조금씩 풀렸어요. 지연은 한 사람의 실수가 아니라 세 가지 결정에서 비롯됐다는 걸 알게 됐어요.", "À medida que a equipe redistribuiu as funções, o cronograma foi se desenrolando aos poucos. Descobrimos que o atraso não se originou de um erro de uma pessoa, mas de três decisões."],
  ],
  readingText: {
    titlePt: "Encontrando a razão do atraso",
    paragraphs: [
      "프로젝트가 늦어졌을 때 우리는 가장 먼저 한 직원의 실수를 짐작했다. 그러나 회의 기록을 확인해 보니 발단은 훨씬 작은 결정이었다. 한 부서가 일정을 하루 미루면서 다른 부서의 준비가 엉키기 시작했다.",
      "문제는 한 사람의 실수에서 비롯된 것이 아니었다. 세 번의 일정 변경이 서로 맞물리면서 납기 지연을 초래했고, 아무도 전체 흐름을 보지 못했다. 우리는 뒤늦게 그 사실을 깨달았다.",
      "원인을 정확히 나누고 나서야 일정이 조금씩 풀렸다. 그 경험은 문제를 해결할 때 비난보다 구조를 먼저 보아야 한다는 교훈을 남겼다. 그 뒤로 우리는 결정을 기록하고 공유하는 습관을 들였다. 회의록을 함께 읽는 일도 중요해졌다.",
    ],
    pt: "Quando o projeto atrasou, primeiro imaginamos que a culpa era de um funcionário. Porém, ao verificar as atas de reunião, vimos que o início foi uma decisão muito menor. Um departamento adiou o cronograma em um dia e a preparação de outro departamento começou a se emaranhar. O problema não se originou de uma única pessoa. Três mudanças de cronograma se encaixaram e provocaram o atraso na entrega, enquanto ninguém olhava para o fluxo inteiro. Percebemos esse fato tarde demais. Só depois de dividir a causa com precisão é que o cronograma foi se desenrolando aos poucos. Aquela experiência deixou a lição de que, ao resolver um problema, é preciso olhar para a estrutura antes de procurar culpados.",
    objective: "Separar a causa aparente da causa real e acompanhar a reinterpretação do problema.",
  },
  reusedIds: ["ko:원인", "ko:문제", "ko:기록"],
  grammar: [
    ["-느라(고) — porque estava ocupado fazendo", "동사 + -느라(고)", "Indica a razão pela qual o falante não pôde fazer outra coisa: a ação ocupou seu tempo. O resultado seguinte costuma ser negativo (못 하다, 늦다, 모르다). Só combina com verbos de ação; com adjetivos, use -아/어서. Compare com -는 바람에: este destaca o efeito inesperado de um fato, enquanto -느라 destaca a ocupação que impediu outra ação. Registro: neutro, muito comum na fala.", [["발표를 준비하느라 쉬지 못했어요.", "Não consegui descansar porque estava preparando a apresentação."], ["야근을 하느라 저녁을 못 먹었어요.", "Não jantei porque estava fazendo hora extra."]]],
    ["-더니 — constatação seguida de mudança", "동사/형용사 + -더니", "O falante relata algo que observou no passado e, na oração seguinte, uma mudança ou resultado percebido depois. A primeira oração normalmente tem sujeito de terceira pessoa ou uma situação, não o próprio falante em ação. A segunda oração não pode ser uma ordem, um pedido ou uma proposta. Compare com -고 보니: este é uma percepção depois de uma ação do falante; -더니 parte da observação de outra pessoa ou situação. Registro: neutro, narrativo.", [["동생이 열심히 공부하더니 시험에 합격했어요.", "Meu irmão estudou muito e acabou passando no exame."], ["어제는 따뜻하더니 오늘은 추워요.", "Ontem estava quente, mas hoje está frio."]]],
  ],
  guided: [
    mcq("Qual foi a causa inicial do atraso?", ["Uma pequena mudança de cronograma.", "Um erro grave de um funcionário novo.", "A falta de computadores."], "Uma pequena mudança de cronograma.", "발단은 작은 일정 변경이었어요."),
    cloze("Complete a razão que impediu outra ação: 회의 준비를 하___ 연락을 못 했어요.", "느라", "하느라 indica a ocupação que impediu o contato."),
    listen("Ouça e escreva a consequência das mudanças de cronograma.", "세 번의 일정 변경이 납기 지연을 초래했어요.", "세 번의 일정 변경이 납기 지연을 초래했어요.", "Três mudanças de cronograma provocaram o atraso na entrega."),
    reading("처음에는 한 직원의 실수라고 짐작했어요. 그러나 발단은 작은 일정 변경이었고, 세 가지 결정이 엉키면서 지연을 초래했어요. 회의 기록을 확인하고 나서야 진짜 원인을 깨달았어요.", "O que a equipe descobriu?", ["Que o atraso vinha de três decisões encadeadas.", "Que o funcionário novo era o único culpado.", "Que o projeto não tinha cronograma."], "Que o atraso vinha de três decisões encadeadas.", "세 가지 결정이 엉키면서 지연을 초래했어요."),
    translate("pt-ko", "Traduza: “Não consegui descansar porque estava preparando a apresentação.”", "발표를 준비하느라 쉬지 못했어요.", "준비하느라 explica a razão que impediu o descanso.", ["발표 준비를 하느라 쉬지 못했어요."]),
  ],
  independent: [
    mcq("Qual frase usa -더니 de forma natural?", ["동생이 열심히 공부하더니 합격했어요.", "동생이 열심히 공부하더니 합격할 거예요.", "제가 열심히 공부하더니 쉬어요."], "동생이 열심히 공부하더니 합격했어요.", "-더니 liga observação e resultado; a segunda oração não é futuro nem ordem."),
    cloze("Complete a mudança observada: 어제는 따뜻하___ 오늘은 추워요.", "더니", "따뜻하더니 contrasta o clima de ontem com o de hoje."),
    listen("Ouça e escreva o início do problema.", "발단은 작은 일정 변경이었어요.", "발단은 작은 일정 변경이었어요.", "O início foi uma pequena mudança de cronograma."),
    translate("ko-pt", "Traduza: 지연은 한 사람의 실수가 아니라 세 가지 결정에서 비롯됐어요.", "O atraso não se originou de um erro de uma pessoa, mas de três decisões.", "비롯되다 = originar-se de.", ["O atraso não veio do erro de uma pessoa, mas de três decisões."]),
    reading("원인을 정확히 나누고 나서야 일정이 조금씩 풀렸다. 그 경험은 문제를 해결할 때 비난보다 구조를 먼저 보아야 한다는 교훈을 남겼다. 그 뒤로 우리는 결정을 기록하고 공유하는 습관을 들였다. 회의록을 함께 읽는 일도 중요해졌다.", "Qual é a lição do texto?", ["Olhar para a estrutura antes de procurar culpados.", "Evitar reuniões de equipe.", "Mudar o cronograma sem avisar."], "Olhar para a estrutura antes de procurar culpados.", "비난보다 구조를 먼저 보아야 한다."),
  ],
  summary: ["-느라(고) explica a ocupação que impediu outra ação.", "-더니 liga observação passada e mudança percebida.", "Causa aparente e causa real podem ser diferentes.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · explicar um atraso",
    "Explique um problema que você viveu no trabalho, nos estudos ou em casa. Mostre a causa aparente, a causa real e o que mudou depois.",
    "문제가 생긴 이유를 차례대로 설명해 보세요.",
    ["Comece pela causa que todos imaginaram.", "Use -느라 ou -더니 uma vez.", "Mostre a reinterpretação depois dos fatos.", "Termine com o que foi aprendido."],
    ["Causa aparente apresentada.", "Causa real distinta e plausível.", "Uma forma -느라 ou -더니.", "Consequência e aprendizado.", "Coesão entre as frases."],
    "작년에 팀 프로젝트가 크게 늦어진 적이 있어요. 처음에는 한 사람이 자료를 늦게 보낸 게 원인이라고 생각했어요. 그런데 회의 기록을 확인해 보니 발단은 일정을 너무 촉박하게 잡은 결정이었어요. 여러 부서의 준비가 엉키면서 마감이 계속 밀렸고, 우리는 뒤늦게 진짜 원인을 깨달았어요. 그 뒤로는 일정을 세울 때 여유를 두기로 했어요.",
    "No ano passado, um projeto de equipe atrasou muito. No começo, pensei que a causa fosse o envio tardio de materiais por uma pessoa. Mas, ao verificar as atas de reunião, o início foi a decisão de marcar um cronograma apertado demais. A preparação de vários departamentos se emaranhou e os prazos foram sendo adiados, até que percebemos tarde a causa real. Depois disso, decidimos deixar margem ao montar o cronograma.",
    "Exemplo original de 5 frases. A causa aparente aparece primeiro; a reinterpretação vem com 그러나/그런데. Compare a estrutura, não o conteúdo.",
  ),
});

/** b2-l03 — versões, fonte e perspectiva. */
export const B2_L03 = defineB2Lesson({
  id: "b2-l03", number: 3, moduleId: "b2-m01", title: "O que cada um viu",
  objective: "Comparar versões de um mesmo fato e explicitar a fonte de cada afirmação.",
  prerequisites: ["b2-l02"], estimatedMinutes: 75, dialogueTitle: "Duas versões do mesmo incidente",
  intro: [
    { title: "Informação ouvida", body: "-다면서요? confirma uma informação que o falante ouviu. Para substantivos, use -(이)라면서요?. A pergunta pede confirmação e pode expressar surpresa; não é o mesmo que -다고 들었어요, que apenas relata. Registro: oral, polido.", ko: "회의가 취소됐다면서요?" },
    { title: "O que se dizia e o que se viu", body: "-다더니 combina a informação ouvida com o que o falante constatou depois: “diziam que..., mas...”. A segunda oração descreve o resultado observado. Compare com -더니, que parte da observação direta do falante, e com -다면서요?, que só pede confirmação.", ko: "그 식당이 맛있다더니 정말 줄이 길었어요." },
  ],
  dialogue: [
    ["아나", "어제 로비에서 무슨 일이 있었어요?", "O que aconteceu no saguão ontem?"],
    ["민수", "저는 한 남자가 소리를 높이는 걸 봤어요. 제 증언은 그게 전부예요.", "Eu vi um homem levantar a voz. Meu testemunho é só isso."],
    ["아나", "다른 목격자는 남자가 넘어졌다고 했는데요.", "Outra testemunha disse que o homem caiu."],
    ["민수", "네, 그래서 두 진술이 엇갈려요. 제가 본 장면에는 넘어지는 사람이 없었어요.", "Sim, por isso os dois depoimentos divergem. Na cena que eu vi, não havia ninguém caindo."],
    ["아나", "경비 기록에는 일관성이 있었나요?", "Os registros da segurança tinham consistência?"],
    ["민수", "시간은 맞았지만, 사람 수가 달랐어요. 두 설명이 서로 상충해요.", "O horário batia, mas o número de pessoas era diferente. As duas explicações se contradizem."],
    ["아나", "결정적인 단서는 있나요?", "Há alguma pista decisiva?"],
    ["민수", "아직은 없어요. 카메라 위치를 확인해야 하지만, 아직 판단할 여지는 남아 있어요. 기사는 그 점을 정확히 짚었어요.", "Ainda não. É preciso verificar a posição das câmeras, mas ainda há margem para avaliar. A reportagem apontou esse ponto com precisão."],
  ],
  readingText: {
    titlePt: "A mesma cena, memórias diferentes",
    paragraphs: [
      "어제 오후, 한 건물 로비에서 작은 소동이 있었다. 목격자 두 사람은 같은 시간에 같은 장소에 있었지만 서로 다른 증언을 했다. 한 사람은 남자가 소리를 높였다고 했고, 다른 사람은 남자가 넘어졌다고 했다. 두 증언은 처음부터 엇갈렸다.",
      "경비 기록의 시간은 두 진술과 일치했지만, 사람 수에서는 일관성이 없었다. 두 설명은 서로 상충했고, 현장에는 결정적인 단서가 없었다. 기사는 이 점을 정확히 짚으면서도 아직 판단할 여지가 있다고 썼다.",
      "기억은 증거가 아니다. 두 사람 모두 거짓말을 하지 않았을 수 있다. 중요한 것은 어느 진술이 더 그럴듯한지가 아니라, 무엇을 확인할 수 있는지 구분하는 일이다.",
    ],
    pt: "Ontem à tarde, houve uma pequena confusão no saguão de um prédio. Duas testemunhas estavam no mesmo lugar, no mesmo horário, mas deram depoimentos diferentes. Uma disse que o homem levantou a voz; a outra, que ele caiu. Os dois depoimentos já divergiam no primeiro detalhe. O horário no registro da segurança coincidia com as duas declarações, mas não havia consistência no número de pessoas. As duas explicações se contradiziam e não havia pista decisiva no local. A reportagem apontou esse ponto com precisão, mas escreveu que ainda havia margem de avaliação. Memória não é prova. Pode ser que nenhuma das duas pessoas tenha mentido. O importante não é decidir qual versão parece mais plausível, mas distinguir o que pode ser confirmado do que ainda é suposição.",
    objective: "Identificar a fonte de cada afirmação e a divergência entre as versões.",
  },
  reusedIds: ["ko:기억", "ko:판단", "ko:시간"],
  grammar: [
    ["-다면서요? — confirmação de informação ouvida", "동사/형용사 + -다면서요? / 명사 + -(이)라면서요?", "Use -다면서요? para confirmar algo que você ouviu de outra pessoa. A entonação sobe e a pergunta pode soar como surpresa. Não use para uma informação que você mesmo viu. Compare com -다고 들었어요: este apenas relata a fonte; -다면서요? pede que o interlocutor confirme. Registro: oral, polido; em 반말, -다면서.", [["회의가 취소됐다면서요?", "Ouvi dizer que a reunião foi cancelada. É verdade?"], ["그분이 은퇴하셨다면서요?", "Ouvi dizer que ele se aposentou. É verdade?"]]],
    ["-다더니 — o que se dizia e o que se constatou", "동사/형용사 + -다더니", "A forma retoma uma informação ouvida e contrasta com o que o falante observou depois: “diziam que..., mas na verdade...”. A segunda oração é uma constatação, não uma ordem nem uma promessa. Compare com -더니, que não precisa de informação prévia, e com -다면서요?, que só confirma. Registro: neutro, narrativo e levemente avaliativo.", [["그 식당이 맛있다더니 정말 줄이 길었어요.", "Diziam que aquele restaurante era gostoso; de fato, a fila era enorme."], ["그 사람이 꼼꼼하다더니 서류에 실수가 많았어요.", "Diziam que ele era detalhista, mas havia muitos erros nos documentos."]]],
  ],
  guided: [
    mcq("Por que as versões divergem?", ["Porque as duas testemunhas viram detalhes diferentes.", "Porque uma delas chegou atrasada.", "Porque o saguão estava vazio."], "Porque as duas testemunhas viram detalhes diferentes.", "두 진술이 엇갈려요."),
    cloze("Complete a divergência: 두 사람의 증언이 서로 ___.", "엇갈렸어요", "엇갈리다 = divergir, não coincidir."),
    listen("Ouça e escreva a divergência central.", "두 사람의 증언이 서로 엇갈렸어요.", "두 사람의 증언이 서로 엇갈렸어요.", "Os depoimentos das duas pessoas divergiram."),
    reading("어제 로비에서 작은 소동이 있었어요. 한 목격자는 남자가 소리를 높였다고 했고, 다른 목격자는 남자가 넘어졌다고 했어요. 두 증언은 처음부터 엇갈렸어요.", "O que os dois disseram?", ["Um falou em voz alta; o outro, em queda.", "Os dois viram a mesma queda.", "Os dois chegaram depois do incidente."], "Um falou em voz alta; o outro, em queda.", "소리를 높였다 vs 넘어졌다."),
    translate("pt-ko", "Traduza: “Ouvi dizer que a reunião foi cancelada. É verdade?”", "회의가 취소됐다면서요?", "-다면서요? pede confirmação de informação ouvida.", ["회의가 취소되었다면서요?"]),
  ],
  independent: [
    mcq("Qual pergunta confirma uma informação ouvida?", ["내일 회의가 취소된다면서요?", "내일 회의가 취소됐어요?", "내일 회의가 취소될 거예요?"], "내일 회의가 취소된다면서요?", "-다면서요? retoma o que foi ouvido e pede confirmação."),
    cloze("Complete o contraste: 그 식당이 맛있___ 정말 줄이 길었어요.", "다더니", "맛있다더니 retoma o que diziam e contrasta com o observado."),
    listen("Ouça e escreva o que os registros mostravam.", "경비 기록의 시간은 맞았지만 사람 수가 달랐어요.", "경비 기록의 시간은 맞았지만 사람 수가 달랐어요.", "O horário no registro da segurança batia, mas o número de pessoas era diferente."),
    translate("ko-pt", "Traduza: 두 설명이 서로 상충해요.", "As duas explicações se contradizem.", "상충하다 = entrar em conflito, contradizer-se.", ["As duas explicações são contraditórias."]),
    reading("기억은 증거가 아니다. 두 사람 모두 거짓말을 하지 않았을 수 있다. 중요한 것은 어느 진술이 더 그럴듯한지가 아니라, 무엇을 확인할 수 있는지 구분하는 일이다.", "Qual é a conclusão do texto?", ["Distinguir o que pode ser confirmado do que é suposição.", "Escolher a versão mais emocionante.", "Concluir que todos mentiram."], "Distinguir o que pode ser confirmado do que é suposição.", "무엇을 확인할 수 있는지 구분하는 일."),
  ],
  summary: ["-다면서요? confirma informação ouvida.", "-다더니 contrasta o que se dizia com o que se constatou.", "Versões diferentes podem ser sinceras; a fonte precisa ser explícita.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · duas versões",
    "Relate um fato cotidiano a partir de duas versões diferentes. Deixe claro quem disse o quê e o que ainda não pode ser confirmado.",
    "같은 일에 대한 두 사람의 이야기를 전해 보세요.",
    ["Apresente o fato em uma frase.", "Atribua cada versão a uma fonte.", "Use -다면서요? ou -다더니 uma vez.", "Diga o que falta para confirmar."],
    ["Duas versões atribuídas.", "Fonte explícita.", "Uma forma de relato indireto.", "O que é fato e o que é suposição.", "Fechamento cauteloso."],
    "어제 회사 앞에서 작은 교통사고가 있었어요. 한 목격자는 자전거가 먼저 멈췄다고 했고, 다른 사람은 자동차가 갑자기 나왔다고 했어요. 두 증언은 서로 엇갈렸지만, 경찰은 아직 어느 쪽이 맞는지 확인하지 못했어요. 저는 두 이야기를 모두 들었지만, 영상을 보기 전에는 판단하지 않으려고 해요.",
    "Ontem houve um pequeno acidente de trânsito em frente à empresa. Uma testemunha disse que a bicicleta parou primeiro; outra, que o carro saiu de repente. Os dois depoimentos divergiram, mas a polícia ainda não confirmou qual lado está certo. Ouvi as duas versões, mas prefiro não julgar antes de ver o vídeo.",
    "Exemplo original de 4 frases. Note a atribuição explícita (한 목격자는... 다른 사람은...) e a conclusão que preserva a incerteza.",
  ),
});

/** b2-l04 — decisão passada, arrependimento e hipótese. */
export const B2_L04 = defineB2Lesson({
  id: "b2-l04", number: 4, moduleId: "b2-m01", title: "Se eu tivesse agido diferente",
  objective: "Avaliar uma decisão passada com arrependimento, hipótese e perspectiva atual.",
  prerequisites: ["b2-l03"], estimatedMinutes: 75, dialogueTitle: "A escolha que ficou",
  intro: [
    { title: "Deveria ter feito", body: "-았/었어야 했는데 expressa que uma ação deveria ter sido feita, mas não foi. O -는데 suaviza a frase e acrescenta a ideia de “mas...”. É diferente de -았/었으면 좋겠다, que expressa desejo, e de -았/었더라면, que introduz uma condição contrafactual explícita.", ko: "그때 더 일찍 말했어야 했는데." },
    { title: "O que teria sido", body: "-았/었을 텐데 expressa uma suposição sobre um passado que não aconteceu, muitas vezes com arrependimento: “teria sido...”. Pode vir depois de uma condição com -(으)면 ou -았/었더라면. Não é uma promessa nem uma certeza; é uma inferência contrafactual.", ko: "그때 출발했으면 늦지 않았을 텐데." },
  ],
  dialogue: [
    ["지민", "그때 왜 회사를 바로 그만두지 않았어요?", "Por que você não pediu demissão na hora?"],
    ["수진", "두려웠어요. 지금 돌이켜 보면 핑계가 많았던 것 같아요.", "Eu estava com medo. Olhando para trás agora, acho que tinha muitas desculpas."],
    ["지민", "그 선택을 아직도 자책해요?", "Você ainda se culpa por aquela escolha?"],
    ["수진", "가끔요. 그때 말하지 않은 것을 자책하기도 해요.", "Às vezes. Também me culpo por não ter falado naquela época."],
    ["지민", "하지만 그 경험에서 배운 것도 있죠?", "Mas você também aprendeu algo com essa experiência, certo?"],
    ["수진", "네. 그 선택을 오랫동안 되새기면서 제가 무엇을 두려워했는지 인정하게 됐어요.", "Sim. Ao remoer aquela escolha por muito tempo, passei a admitir o que eu temia."],
    ["지민", "지금은 어떻게 생각해요?", "E como você pensa nisso agora?"],
    ["수진", "그때의 저를 받아들이기로 했어요. 늦게라도 실수를 만회하고 싶고, 그 경험을 통해 제 태도를 성찰했어요. 그래도 그 말은 아직 후회스러워요.", "Decidi aceitar quem eu era naquela época. Quero compensar meus erros, mesmo que tarde, e aquela experiência me fez refletir sobre minha postura. Mesmo assim, aquelas palavras ainda me causam arrependimento."],
  ],
  readingText: {
    titlePt: "Arrependimento tardio, começo tardio",
    paragraphs: [
      "서른 살 무렵, 나는 좋지 않은 회사에 계속 다녔다. 더 나은 조건을 제안받았지만, 안정을 이유로 거절했다. 지금 돌이켜 보면 그 결정에는 두려움이 크게 작용했다.",
      "한참 후에야 나는 그 선택을 되새기며 내가 무엇을 두려워했는지 인정했다. 스스로를 자책하는 데 시간을 쓰기보다, 늦게라도 배우지 못한 것을 만회하고 싶었다.",
      "나는 그때의 나를 받아들이기로 했다. 후회스러운 말은 여전히 남아 있지만, 그 경험을 통해 내 태도를 성찰할 수 있었다. 후회는 끝이 아니라 다음 선택을 준비하는 과정이었다. 그래서 지금은 같은 실수를 반복하지 않으려고 노력한다. 그 결정 덕분에 지금의 제가 있다고 생각한다. 지금도 그렇게 생각한다.",
    ],
    pt: "Aos trinta anos, eu continuava numa empresa ruim. Recebi uma proposta com condições melhores, mas recusei por causa da estabilidade. Olhando para trás, o medo teve um peso grande naquela decisão. Só muito depois é que remoí aquela escolha e admiti o que eu temia. Em vez de gastar tempo me culpando, quis compensar, mesmo tarde, o que não tinha aprendido. Decidi aceitar quem eu era naquela época. As palavras de que me arrependo ainda permanecem, mas aquela experiência me fez refletir sobre minha postura. O arrependimento não era o fim, e sim o processo de preparar a próxima escolha. Acho que foi graças àquela decisão que sou quem sou hoje. Ainda penso assim.",
    objective: "Distinguir o arrependimento, a hipótese contrafactual e a avaliação atual da narradora.",
  },
  reusedIds: ["ko:후회", "ko:시간", "ko:선택"],
  grammar: [
    ["-았/었어야 했는데 — deveria ter feito", "동사 + -았/었어야 했는데", "Expressa arrependimento ou crítica porque uma ação necessária não foi feita. O -는데 suaviza o tom e sugere “mas não foi assim”. Compare com -았/었으면 좋겠다 (desejo sobre o passado) e com -았/었더라면 (condição contrafactual explícita). Não use para uma obrigação presente; para isso, -아/어야 해요. Registro: neutro, frequente na fala.", [["그때 더 일찍 말했어야 했는데.", "Eu deveria ter falado mais cedo naquela época."], ["약속을 지켰어야 했는데 미안해요.", "Eu deveria ter cumprido o combinado; desculpe."]]],
    ["-았/었을 텐데 — teria sido/feito", "동사/형용사 + -았/었을 텐데", "Expressa uma suposição sobre um passado contrafactual: “teria sido...”, muitas vezes com arrependimento. Costuma seguir uma condição com -(으)면 ou -았/었더라면. É mais suave que -았/었을 거예요, que afirma com mais confiança. Não use para um fato que realmente aconteceu. Registro: neutro, levemente literário.", [["그때 출발했으면 늦지 않았을 텐데.", "Se tivéssemos saído naquela hora, não teríamos nos atrasado."], ["미리 알았더라면 준비했을 텐데.", "Se eu tivesse sabido antes, teria me preparado."]]],
  ],
  guided: [
    mcq("O que a pessoa lamenta?", ["Não ter falado ou saído antes.", "Ter aceitado um emprego melhor.", "Ter estudado demais."], "Não ter falado ou saído antes.", "그때 말하지 않은 것을 자책해요."),
    cloze("Complete o arrependimento: 그때 더 일찍 말___ 했는데.", "했어야", "말했어야 했는데 = deveria ter falado."),
    listen("Ouça e escreva o arrependimento.", "그때 더 일찍 말했어야 했는데.", "그때 더 일찍 말했어야 했는데.", "Eu deveria ter falado mais cedo naquela época."),
    reading("서른 살 무렵, 저는 좋지 않은 회사에 계속 다녔어요. 더 나은 제안을 받았지만 안정을 이유로 거절했어요. 지금 돌이켜 보면 두려움이 크게 작용했어요.", "Por que ela recusou a proposta?", ["Por causa da estabilidade e do medo.", "Porque o salário era menor.", "Porque não gostava da cidade."], "Por causa da estabilidade e do medo.", "안정을 이유로 거절했고, 두려움이 크게 작용했어요."),
    translate("pt-ko", "Traduza: “Eu deveria ter aceitado aquela proposta.”", "그 제안을 받아들였어야 했는데.", "받아들였어야 했는데 expressa arrependimento.", ["그때 그 제안을 받아들였어야 했는데."]),
  ],
  independent: [
    mcq("Qual frase expressa arrependimento sobre uma ação não feita?", ["그때 말했어야 했는데.", "그때 말할 거예요.", "그때 말했어요."], "그때 말했어야 했는데.", "-았/었어야 했는데 marca a obrigação não cumprida."),
    cloze("Complete a suposição contrafactual: 그때 출발했으면 늦지 않___ 텐데.", "았을", "않았을 텐데 = não teria se atrasado."),
    listen("Ouça e escreva o que ela remoeu.", "그 선택을 오랫동안 되새겼어요.", "그 선택을 오랫동안 되새겼어요.", "Remoí aquela escolha por muito tempo."),
    translate("ko-pt", "Traduza: 그때의 저를 받아들이기로 했어요.", "Decidi aceitar quem eu era naquela época.", "받아들이다 = aceitar; -기로 하다 = decidir.", ["Decidi acolher a pessoa que eu era naquela época."]),
    reading("나는 그때의 나를 받아들이기로 했다. 후회스러운 말은 여전히 남아 있지만, 그 경험을 통해 내 태도를 성찰할 수 있었다. 후회는 끝이 아니라 다음 선택을 준비하는 과정이었다. 그래서 지금은 같은 실수를 반복하지 않으려고 노력한다. 그 결정 덕분에 지금의 제가 있다고 생각한다. 지금도 그렇게 생각한다.", "Como ela vê o arrependimento hoje?", ["Como parte do processo de preparar a próxima escolha.", "Como algo que deve ser esquecido.", "Como prova de que nada pode mudar."], "Como parte do processo de preparar a próxima escolha.", "후회는 다음 선택을 준비하는 과정이었다."),
  ],
  summary: ["-았/었어야 했는데 expressa dever não cumprido.", "-았/었을 텐데 expressa suposição contrafactual.", "Arrependimento pode ser avaliação, não apenas culpa.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · uma decisão revista",
    "Escreva sobre uma decisão passada que você avalia de forma diferente hoje. Inclua o que deveria ter feito, o que teria acontecido e o que aprendeu.",
    "과거의 결정을 지금의 관점에서 돌아보세요.",
    ["Descreva a decisão e o contexto.", "Use -았/었어야 했는데 uma vez.", "Use -았/었을 텐데 uma vez.", "Feche com a avaliação atual, sem reescrever o passado."],
    ["Decisão e contexto claros.", "Dever não cumprido explícito.", "Hipótese contrafactual marcada.", "Avaliação atual distinta da hipótese.", "Coerência temporal."],
    "대학을 졸업할 때 저는 유학 제안을 거절했어요. 당시에는 돈과 시간이 부족하다고 생각했어요. 지금 돌아보면 조금 더 준비했어야 했는데 하는 아쉬움이 있어요. 그때 지원했더라면 다른 경험을 했을 텐데, 지금은 그 선택 덕분에 일을 일찍 배웠다고 생각해요. 후회는 있지만, 그 결정을 통해 제가 무엇을 중요하게 여기는지 알게 되었어요.",
    "Quando me formei na faculdade, recusei uma proposta de estudar no exterior. Na época, achei que faltavam dinheiro e tempo. Olhando para trás, tenho a sensação de que deveria ter me preparado um pouco mais. Se tivesse me candidatado naquela época, teria vivido outras experiências; hoje, porém, penso que aquela escolha me fez aprender o trabalho mais cedo. Tenho arrependimento, mas, por meio daquela decisão, descobri o que considero importante.",
    "Exemplo original de 6 frases. Note que a hipótese (-았/었을 텐데) não é apresentada como fato e a avaliação final não apaga o arrependimento.",
  ),
});

/** b2-l05 — coesão, síntese e revisão de narrativa. */
export const B2_L05 = defineB2Lesson({
  id: "b2-l05", number: 5, moduleId: "b2-m01", title: "Recontando a história",
  objective: "Organizar um relato longo com coesão, síntese e mudança de perspectiva.",
  prerequisites: ["b2-l04"], estimatedMinutes: 80, dialogueTitle: "A revisão do texto",
  intro: [
    { title: "Perceber depois de fazer", body: "-고 보니 mostra que, depois de concluir uma ação, o falante percebe algo novo. A segunda oração é uma constatação do próprio falante. Não confunda com -더니, que parte da observação de outra pessoa ou situação, nem com -다 보니, que envolve repetição.", ko: "글을 다 쓰고 보니 처음 생각과 달라졌어요." },
    { title: "Mudança gradual", body: "-다 보니 mostra que uma ação repetida ou contínua leva naturalmente a um resultado ou percepção. É comum com hábitos e processos. Compare com -고 보니 (uma ação concluída) e com -다 보면 (se continuar fazendo, no futuro).", ko: "매일 읽다 보니 어휘가 늘었어요." },
  ],
  dialogue: [
    ["아나", "이 글, 어디부터 고치면 좋을까요?", "Por onde devo começar a revisar este texto?"],
    ["민수", "먼저 이야기의 흐름을 요약해 볼게요. 지금은 첫 문단에서 결론이 먼저 나와요.", "Primeiro vou resumir o fluxo da história. Agora a conclusão aparece antes, no primeiro parágrafo."],
    ["아나", "그럼 순서를 바꿔야겠네요.", "Então preciso mudar a ordem."],
    ["민수", "네. 사건을 먼저 보여 주고, 마지막에 의미를 부각하면 독자가 따라가기 쉬워요.", "Sim. Mostre o acontecimento primeiro e destaque o sentido no final; assim o leitor acompanha com mais facilidade."],
    ["아나", "문단이 서로 자연스럽게 이어지지 않는 느낌도 있어요.", "Também sinto que os parágrafos não se conectam naturalmente."],
    ["민수", "맞아요. 접속어를 다듬고, 각 문단의 짜임새를 확인해 봐요.", "Exato. Vamos lapidar os conectivos e verificar a estrutura de cada parágrafo."],
    ["아나", "이 문장은 너무 길어서 설득력이 떨어지는 것 같아요.", "Esta frase é longa demais e parece perder força de persuasão."],
    ["민수", "그러면 두 문장으로 나누고, 마지막에 핵심을 다시 요약해 보세요.", "Então divida em duas frases e resuma o ponto principal novamente no final."],
  ],
  readingText: {
    titlePt: "As três mãos que revisam um texto",
    paragraphs: [
      "처음 쓴 글은 감정은 풍부했지만 흐름이 자주 끊겼다. 나는 먼저 글의 내용을 세 문장으로 요약해 보았다. 그러자 무엇을 앞에 두고 무엇을 뒤에 둘지 보이기 시작했다.",
      "다음으로 각 문단의 짜임새를 확인했다. 한 문단에는 하나의 생각만 남기고, 앞 문단과 자연스럽게 이어지도록 접속어를 다듬었다. 마지막 문단에서는 경험이 남긴 의미를 부각했다.",
      "세 번의 수정 끝에 글의 설득력이 높아졌다. 독자가 결론을 미리 짐작하지 않아도 따라올 수 있었기 때문이다. 좋은 글은 한 번에 완성되지 않는다. 요약하고, 연결하고, 다시 다듬는 과정이 필요하다. 독자가 읽는 속도도 고려해야 하므로 문단의 길이도 함께 조정했다.",
    ],
    pt: "O primeiro rascunho tinha emoção de sobra, mas o fluxo se interrompia com frequência. Primeiro, tentei resumir o conteúdo do texto em três frases. Então comecei a ver o que deveria vir antes e o que deveria ficar para depois. Em seguida, verifiquei a estrutura de cada parágrafo. Deixei apenas uma ideia por parágrafo e lapidei os conectivos para que o texto se conectasse naturalmente ao anterior. No último parágrafo, destaquei o sentido que a experiência havia deixado. Depois de três revisões, a força de persuasão do texto aumentou. O leitor conseguia acompanhar sem adivinhar a conclusão antes da hora. Um bom texto não fica pronto de uma vez; é preciso resumir, conectar e lapidar de novo.",
    objective: "Reconhecer a função de cada parágrafo e os elos de coesão que sustentam a narrativa.",
  },
  reusedIds: ["ko:내용", "ko:결론", "ko:핵심"],
  grammar: [
    ["-고 보니 — perceber depois de fazer", "동사 + -고 보니", "Mostra que, depois de concluir uma ação, o falante percebe algo que não sabia ou não via antes. A segunda oração é uma constatação do próprio falante. Compare com -더니, que observa outra pessoa/situação, e com -다 보니, que descreve uma mudança gradual por repetição. Registro: neutro, comum na fala e na escrita reflexiva.", [["글을 다 쓰고 보니 처음 생각과 달라졌어요.", "Depois de terminar o texto, percebi que ele estava diferente da ideia inicial."], ["설명을 듣고 보니 이해가 됐어요.", "Depois de ouvir a explicação, entendi."]]],
    ["-다 보니 — mudança gradual por repetição", "동사 + -다 보니", "Mostra que uma ação repetida ou contínua leva naturalmente a um resultado ou percepção. É comum com hábitos, estudo e convivência. Compare com -고 보니 (uma ação concluída) e com -다 보면 (projeção: se continuar, talvez). Registro: neutro, frequente na fala.", [["매일 읽다 보니 어휘가 늘었어요.", "À medida que lia todos os dias, meu vocabulário aumentou."], ["사람을 만나다 보니 말하는 게 편해졌어요.", "À força de encontrar pessoas, falar se tornou mais confortável."]]],
  ],
  guided: [
    mcq("Qual é o primeiro problema do texto?", ["O fluxo e a ordem das ideias.", "A falta de vocabulário.", "O tamanho da letra."], "O fluxo e a ordem das ideias.", "이야기의 흐름과 순서를 먼저 고쳐요."),
    cloze("Complete a percepção: 설명을 듣___ 보니 이해가 됐어요.", "고", "듣고 보니 = depois de ouvir, percebi."),
    listen("Ouça e escreva a mudança gradual.", "매일 읽다 보니 어휘가 늘었어요.", "매일 읽다 보니 어휘가 늘었어요.", "À medida que lia todos os dias, meu vocabulário aumentou."),
    reading("처음 쓴 글은 감정은 풍부했지만 흐름이 자주 끊겼다. 나는 먼저 글의 내용을 세 문장으로 요약했다. 그러자 무엇을 앞에 두고 무엇을 뒤에 둘지 보이기 시작했다.", "O que a autora fez primeiro?", ["Resumiu o conteúdo em três frases.", "Apagou todos os parágrafos.", "Pediu a opinião de um leitor."], "Resumiu o conteúdo em três frases.", "내용을 세 문장으로 요약했다."),
    translate("pt-ko", "Traduza: “Depois de terminar o texto e reler, percebi que o começo estava longo.”", "글을 다 쓰고 보니 시작 부분이 길었어요.", "쓰고 보니 marca a percepção depois da ação concluída.", ["글을 다 쓰고 다시 보니 시작 부분이 길었어요."]),
  ],
  independent: [
    mcq("Qual frase mostra uma percepção depois de uma ação concluída?", ["글을 다 쓰고 보니 달라졌어요.", "글을 쓰다 보니 달라졌어요.", "글을 쓰더니 달라졌어요."], "글을 다 쓰고 보니 달라졌어요.", "-고 보니 liga a ação concluída à percepção."),
    cloze("Complete a mudança gradual: 사람을 만나___ 보니 말하는 게 편해졌어요.", "다", "만나다 보니 = à força de encontrar pessoas."),
    listen("Ouça e escreva o resultado da revisão.", "세 번의 수정 끝에 글의 설득력이 높아졌어요.", "세 번의 수정 끝에 글의 설득력이 높아졌어요.", "Depois de três revisões, a força de persuasão do texto aumentou."),
    translate("ko-pt", "Traduza: 좋은 글은 한 번에 완성되지 않는다.", "Um bom texto não fica pronto de uma vez.", "한 번에 = de uma só vez.", ["Um bom texto não se completa de uma vez."]),
    reading("좋은 글은 한 번에 완성되지 않는다. 요약하고, 연결하고, 다시 다듬는 과정이 필요하다. 독자가 결론을 미리 짐작하지 않아도 따라올 수 있어야 한다.", "Qual é a mensagem final?", ["Revisar é um processo de resumir, conectar e lapidar.", "Um texto bom nasce pronto.", "O leitor deve adivinhar a conclusão."], "Revisar é um processo de resumir, conectar e lapidar.", "요약하고, 연결하고, 다시 다듬는 과정."),
  ],
  summary: ["-고 보니 marca percepção após ação concluída.", "-다 보니 marca mudança gradual por repetição.", "Coesão exige ordem, conectivos e função clara por parágrafo.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · recontar com coesão",
    "Reescreva uma lembrança curta em três parágrafos: fundo, acontecimento e avaliação. Use pelo menos um conectivo de causa e um de contraste.",
    "기억에 남는 일을 세 문단으로 다시 써 보세요.",
    ["Separe fundo, acontecimento e avaliação.", "Use -고 보니 ou -다 보니 uma vez.", "Conecte os parágrafos com um marcador explícito.", "Feche com uma avaliação, não com um novo fato."],
    ["Três parágrafos com funções distintas.", "Conectivos de causa e contraste.", "Uma forma -고 보니/-다 보니.", "Avaliação final.", "Fluxo sem repetição desnecessária."],
    "예전에는 저는 발표를 아주 싫어했어요. 준비를 많이 해도 사람들 앞에 서면 목소리가 떨렸거든요. 어느 날 작은 모임에서 발표를 맡고 보니, 긴장은 해도 끝까지 말할 수 있었어요. 그 뒤로 조금씩 발표를 하다 보니 이제는 긴장해도 포기하지 않게 되었어요. 아직 잘하지는 못하지만, 예전보다는 분명히 나아졌어요.",
    "Antes, eu detestava apresentações. Mesmo me preparando muito, minha voz tremia diante das pessoas. Um dia, depois de assumir uma apresentação num grupo pequeno, percebi que, apesar do nervosismo, conseguia falar até o fim. Depois disso, à medida que fui apresentando aos poucos, passei a não desistir mesmo nervoso. Ainda não sou boa, mas com certeza melhorei em relação a antes.",
    "Exemplo original de 5 frases. Observe os três parágrafos/funções e os conectivos 그 뒤로, 하지만. Use como referência estrutural.",
  ),
});
