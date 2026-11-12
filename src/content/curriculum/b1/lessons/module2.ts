import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l06 — planos provisórios e planos confirmados. */
export const B1_L06 = defineB1Lesson({
  id: "b1-l06", number: 6, moduleId: "b1-m02", title: "Talvez eu vá",
  objective: "Falar de planos provisórios e decisões ainda abertas, distinguindo-os de planos já confirmados.",
  prerequisites: ["b1-c01"], estimatedMinutes: 65, dialogueTitle: "Ainda não confirmei",
  intro: [
    { title: "Plano ainda aberto", body: "-(으)ㄹ까 하다 apresenta uma ideia que o falante está considerando, sem compromisso. A decisão pode mudar depois de conversar ou de ver as condições.", ko: "친구 집에 갈까 해요." },
    { title: "Plano já combinado", body: "-(으)ㄹ 예정이다 informa um plano tratado como certo, muitas vezes por causa de trabalho, estudo ou compromisso marcado. Não é uma promessa de resultado.", ko: "토요일에 일할 예정이에요." },
  ],
  dialogue: [
    ["마르코", "수진 씨, 이번 주말에 뭐 할 거예요?", "Sujin, o que você vai fazer neste fim de semana?"],
    ["수진", "아직 잘 모르겠어요. 친구 집에 갈까 해요.", "Ainda não sei bem. Estou pensando em ir à casa de uma amiga."],
    ["마르코", "저는 토요일에 회의가 있어서 일할 예정이에요.", "Eu tenho uma reunião no sábado, então pretendo trabalhar."],
    ["수진", "주말에도 일해요? 많이 힘들겠어요.", "Você trabalha até no fim de semana? Deve ser bem cansativo."],
    ["마르코", "다음 주에 발표가 있어서 어쩔 수 없어요.", "Tenho uma apresentação na próxima semana, então não tem jeito."],
    ["수진", "그러면 저는 집에서 조용히 쉴까 해요.", "Então acho que vou descansar em casa, com calma."],
  ],
  reusedIds: ["ko:계획", "ko:일정", "ko:미루다", "ko:결정하다", "ko:시간"],
  grammar: [
    ["-(으)ㄹ까 하다 — plano provisório", "동사 + -(으)ㄹ까 하다", "Use com verbos de ação para dizer o que você está pensando em fazer. O falante ainda não assumiu o plano e pode mudar de ideia; não use para um compromisso já marcado.", [["친구 집에 갈까 해요.", "Estou pensando em ir à casa de uma amiga."], ["저녁에 라면을 먹을까 해요.", "Estou pensando em comer ramen no jantar."]]],
    ["-(으)ㄹ 예정이다 — plano confirmado", "동사 + -(으)ㄹ 예정이다", "Marca um plano tratado como definido na conversa, frequentemente ligado a prazo, trabalho ou estudo. É mais firme que -(으)ㄹ까 하다, mas ainda fala do futuro, não de algo concluído.", [["저는 토요일에 일할 예정이에요.", "Pretendo trabalhar no sábado."], ["내년에 유학을 갈 예정이에요.", "Tenho planos de estudar no exterior no ano que vem."]]],
  ],
  guided: [
    mcq("O que Sujin pensa em fazer no fim de semana?", ["Ir à casa de uma amiga.", "Trabalhar no sábado.", "Viajar com a família."], "Ir à casa de uma amiga.", "친구 집에 갈까 해요 expressa um plano ainda aberto."),
    cloze("Complete o plano provisório: 친구 집에 ___ 해요.", "갈까", "갈까 해요 indica uma ideia que ainda pode mudar."),
    listen("Ouça e escreva o plano confirmado de Marco.", "저는 토요일에 회의가 있어서 일할 예정이에요.", "저는 토요일에 회의가 있어서 일할 예정이에요.", "Marco tem reunião no sábado e pretende trabalhar.", ["저는 토요일에 회의가 있어서 일할 예정이에요"]),
    reading("수진은 주말에 친구 집에 갈까 해요. 아직 정하지 않았어요. 마르코는 토요일에 회의가 있어서 일할 예정이에요.", "Quem tem um plano já definido?", ["Marco.", "Sujin.", "Nenhum dos dois."], "Marco.", "일할 예정이에요 indica plano confirmado; 갈까 해요 indica dúvida."),
    translate("pt-ko", "Traduza: “Estou pensando em descansar em casa.”", "집에서 쉴까 해요.", "쉴까 해요 expressa um plano provisório.", ["집에서 쉴까 해요", "집에서 좀 쉴까 해요"]),
  ],
  independent: [
    mcq("Qual frase indica um plano ainda não confirmado?", ["여행을 갈까 해요.", "여행을 갈 예정이에요.", "여행을 갔어요."], "여행을 갈까 해요.", "-(으)ㄹ까 하다 deixa o plano em aberto; -(으)ㄹ 예정이다 o apresenta como definido."),
    cloze("Complete o plano confirmado: 다음 주에 발표할 ___이에요.", "예정", "발표할 예정이에요 apresenta um plano tratado como certo."),
    listen("Ouça e escreva o plano provisório de Sujin.", "주말에는 집에서 쉴까 해요.", "주말에는 집에서 쉴까 해요.", "No fim de semana, ela está pensando em descansar em casa.", ["주말에는 집에서 쉴까 해요"]),
    translate("ko-pt", "Traduza: 다음 주에 발표가 있어서 일할 예정이에요.", "Como tenho uma apresentação na próxima semana, pretendo trabalhar.", "일할 예정이에요 apresenta o plano como definido.", ["Como tenho uma apresentação na próxima semana, tenho planos de trabalhar."]),
    reading("지수는 주말에 등산을 갈까 해요. 날씨를 보고 결정할 거예요. 민수는 토요일 아침에 출발할 예정이에요.", "O que Jisu vai fazer antes de decidir?", ["Ver o tempo.", "Comprar a passagem.", "Confirmar com Minsu."], "Ver o tempo.", "날씨를 보고 결정할 거예요: ela ainda vai olhar o tempo."),
  ],
  summary: ["-(으)ㄹ까 하다 apresenta um plano que ainda pode mudar.", "-(으)ㄹ 예정이다 apresenta um plano tratado como confirmado.", "O grau de certeza precisa combinar com a palavra escolhida.", "Todo o conteúdo novo continua em revisão."],
  production: {
    titlePt: "Produção independente · planos abertos", promptPt: "Escreva sobre o seu próximo fim de semana: o que você está pensando em fazer e o que já está confirmado. Use de cinco a sete frases.", promptKo: "이번 주말 계획을 이야기해 보세요. 아직 정하지 않은 일과 이미 정한 일을 나누어 써 보세요.",
    guidance: ["Separe o que é possibilidade do que já está marcado.", "Use -(으)ㄹ까 하다 pelo menos uma vez.", "Use -(으)ㄹ 예정이다 para o compromisso confirmado."],
    checklist: ["Um plano provisório com -(으)ㄹ까 하다.", "Um plano confirmado com -(으)ㄹ 예정이다.", "O motivo de cada plano aparece no texto.", "Não apresentei possibilidade como promessa."], minWords: 35,
  },
});

/** b1-l07 — objetivo, meio e providência. */
export const B1_L07 = defineB1Lesson({
  id: "b1-l07", number: 7, moduleId: "b1-m02", title: "Para conseguir",
  objective: "Explicar um objetivo, o meio escolhido e a providência necessária para cumpri-lo.",
  prerequisites: ["b1-l06"], estimatedMinutes: 65, dialogueTitle: "Antes do prazo",
  intro: [
    { title: "Objetivo com -기 위해(서)", body: "-기 위해(서) liga uma ação ao objetivo que ela pretende alcançar. O sujeito das duas partes costuma ser o mesmo; na fala, 위해서 aparece mais, e 위해 é mais frequente na escrita.", ko: "고객 문의를 줄이기 위해서 안내문을 만들었어요." },
    { title: "Providência com -도록", body: "-도록 indica o que precisa acontecer para que um resultado seja possível, ou um limite de tempo e de ação. É frequente em instruções, reuniões e pedidos de trabalho.", ko: "모든 직원이 알도록 교육을 했어요." },
  ],
  dialogue: [
    ["지민", "이번 달 목표를 다시 확인해 볼까요?", "Vamos revisar a meta deste mês?"],
    ["마르코", "네. 고객 문의를 줄이기 위해서 안내문을 새로 만들 거예요.", "Sim. Para reduzir as dúvidas dos clientes, vamos criar um novo aviso."],
    ["지민", "좋아요. 모든 직원이 내용을 알도록 교육도 해야 해요.", "Bom. Também precisamos fazer um treinamento para que todos os funcionários conheçam o conteúdo."],
    ["마르코", "교육은 다음 주 수요일까지 끝내도록 할게요.", "Vou providenciar para que o treinamento termine até a próxima quarta."],
    ["지민", "그럼 제가 자료를 정리해서 금요일까지 보내 드릴게요.", "Então eu organizo o material e envio até sexta."],
    ["마르코", "좋습니다. 목표를 이루기 위해 우리가 할 일이 분명해졌네요.", "Ótimo. Ficou claro o que precisamos fazer para alcançar a meta."],
  ],
  reusedIds: ["ko:목표", "ko:방법", "ko:연습하다", "ko:준비하다", "ko:노력"],
  grammar: [
    ["-기 위해(서) — objetivo", "동사 + -기 위해(서)", "Use para dizer para que serve uma ação. A parte com -기 위해(서) vem antes da ação principal. Não use com adjetivos.", [["고객 문의를 줄이기 위해서 안내문을 만들었어요.", "Criei um aviso para reduzir as dúvidas dos clientes."], ["목표를 이루기 위해 매일 연습해요.", "Pratico todos os dias para alcançar a meta."]]],
    ["-도록 — providência e limite", "동사 + -도록", "Mostra o resultado que se quer garantir com outra ação, ou um limite de tempo. Com verbos como 하다, pode indicar que alguém vai providenciar algo.", [["모든 직원이 알도록 교육을 했어요.", "Fiz um treinamento para que todos os funcionários soubessem."], ["금요일까지 끝내도록 할게요.", "Vou providenciar para terminar até sexta."]]],
  ],
  guided: [
    mcq("Por que a equipe vai criar um novo aviso?", ["Para reduzir as dúvidas dos clientes.", "Para aumentar o preço do serviço.", "Para mudar o horário da reunião."], "Para reduzir as dúvidas dos clientes.", "고객 문의를 줄이기 위해서: o aviso serve ao objetivo."),
    cloze("Complete o objetivo: 고객 문의를 줄이___ 안내문을 만들 거예요.", "기 위해서", "줄이기 위해서 liga a ação ao objetivo.", ["기 위해"]),
    listen("Ouça e escreva a providência que a equipe vai tomar.", "모든 직원이 내용을 알도록 교육도 해야 해요.", "모든 직원이 내용을 알도록 교육도 해야 해요.", "O treinamento existe para que todos conheçam o conteúdo.", ["모든 직원이 내용을 알도록 교육도 해야 해요"]),
    reading("마르코 씨 팀은 이번 달 목표를 다시 확인했어요. 고객 문의를 줄이기 위해서 안내문을 새로 만들 거예요. 그리고 다음 주 수요일까지 교육을 끝내도록 할게요.", "Até quando o treinamento deve terminar?", ["Até a próxima quarta.", "Até sexta.", "Até o fim do mês."], "Até a próxima quarta.", "다음 주 수요일까지 끝내도록 할게요."),
    translate("pt-ko", "Traduza: “Vou organizar o material para que todos entendam.”", "모든 사람이 이해하도록 자료를 정리할게요.", "이해하도록 indica o resultado que precisa acontecer.", ["모두가 이해하도록 자료를 정리할게요"]),
  ],
  independent: [
    mcq("Qual frase indica finalidade?", ["건강을 위해 매일 걸어요.", "건강이 좋아서 매일 걸어요.", "건강할 때 매일 걸었어요."], "건강을 위해 매일 걸어요.", "-기 위해 liga a caminhada ao objetivo de ter saúde."),
    cloze("Complete a providência: 모든 직원이 내용을 알___ 교육을 했어요.", "도록", "알도록 mostra o que o treinamento deve garantir."),
    listen("Ouça e escreva o que a equipe fez para atingir a meta.", "목표를 이루기 위해 계획을 세웠어요.", "목표를 이루기 위해 계획을 세웠어요.", "A equipe fez um plano para alcançar a meta.", ["목표를 이루기 위해 계획을 세웠어요"]),
    translate("ko-pt", "Traduza: 고객 문의를 줄이기 위해서 안내문을 새로 만들 거예요.", "Para reduzir as dúvidas dos clientes, vamos criar um novo aviso.", "줄이기 위해서 expressa o objetivo da ação.", ["Para reduzir as dúvidas dos clientes, criaremos um novo aviso."]),
    reading("수진은 한국 회사에서 일하고 싶어요. 그래서 매일 아침 한국어를 공부해요. 면접에서 자신 있게 말할 수 있도록 말하기 연습도 해요.", "Por que Sujin também pratica fala?", ["Para falar com confiança na entrevista.", "Para viajar para a Coreia.", "Para ensinar coreano a crianças."], "Para falar com confiança na entrevista.", "자신 있게 말할 수 있도록 말하기 연습도 해요."),
  ],
  summary: ["-기 위해(서) explica o objetivo de uma ação.", "-도록 aponta a providência ou o limite necessário.", "Objetivo e providência precisam caber no mesmo prazo.", "O conteúdo novo segue em revisão."],
  production: {
    titlePt: "Produção independente · um objetivo e seus passos", promptPt: "Escolha um objetivo real para este mês e explique duas ações que você precisa fazer para alcançá-lo. Escreva de cinco a sete frases.", promptKo: "이번 달 목표 하나를 정하고, 그 목표를 이루기 위해 해야 할 일을 두 가지 써 보세요.",
    guidance: ["Diga o objetivo antes das ações.", "Use -기 위해(서) uma vez.", "Use -도록 para indicar uma providência ou prazo."],
    checklist: ["O objetivo está explícito.", "Duas ações ligadas ao objetivo.", "Um prazo ou limite mencionado.", "Nenhuma ação contraditória ao objetivo."], minWords: 35,
  },
});

/** b1-l08 — alternativas, custos e prioridades. */
export const B1_L08 = defineB1Lesson({
  id: "b1-l08", number: 8, moduleId: "b1-m02", title: "Em vez de",
  objective: "Comparar alternativas, explicitar o que se abre mão e justificar uma escolha.",
  prerequisites: ["b1-l07"], estimatedMinutes: 65, dialogueTitle: "Duas opções de moradia",
  intro: [
    { title: "Troca com -는 대신(에)", body: "-는 대신(에) mostra que uma vantagem vem junto com um custo: ao escolher algo, abre-se mão de outra coisa. Pode vir depois de verbo ou de substantivo.", ko: "비싼 대신에 회사까지 걸어서 다닐 수 있어요." },
    { title: "Preferência com -기보다", body: "-기보다 compara duas ações e indica qual delas o falante prefere. A opção descartada aparece antes de -기보다.", ko: "돈을 아끼기보다 시간을 아끼고 싶어요." },
  ],
  dialogue: [
    ["수진", "이번 달부터 회사 근처로 이사할까 해요.", "Estou pensando em me mudar para perto da empresa a partir deste mês."],
    ["마르코", "회사 근처는 집세가 비싸요?", "Perto da empresa o aluguel é caro?"],
    ["수진", "네, 비싼 대신에 회사까지 걸어서 다닐 수 있어요.", "Sim, é caro, mas em troca posso ir e voltar a pé até a empresa."],
    ["마르코", "그럼 지금 집에 계속 사는 게 낫지 않아요?", "Então não é melhor continuar morando na casa atual?"],
    ["수진", "지금 집은 싼 대신에 지하철로 한 시간 걸려요. 그래서 이번에는 돈을 아끼기보다 시간을 아끼고 싶어요.", "A casa atual é barata, mas em troca leva uma hora de metrô. Por isso, desta vez prefiro economizar tempo a economizar dinheiro."],
    ["마르코", "그런 이유라면 새 집을 고르는 게 좋겠네요.", "Com esse motivo, acho melhor escolher a casa nova."],
  ],
  reusedIds: ["ko:선택", "ko:대신", "ko:비교", "ko:비싸다", "ko:장점"],
  grammar: [
    ["-는 대신(에) — em troca de", "동사 + -는 대신(에) / 명사 + 대신(에)", "Apresenta o custo ou a compensação de uma escolha. A primeira parte mostra o que se ganha ou perde; a segunda mostra o outro lado da troca.", [["비싼 대신에 회사까지 걸어서 다닐 수 있어요.", "É caro, mas em troca posso ir a pé até a empresa."], ["지금 집은 싼 대신에 한 시간 걸려요.", "A casa atual é barata, mas em troca leva uma hora."]]],
    ["-기보다 — mais do que", "동사 + -기보다(는)", "Compara duas ações e mostra a preferência do falante. O verbo antes de -기보다 é a opção que ele não escolhe.", [["돈을 아끼기보다 시간을 아끼고 싶어요.", "Prefiro economizar tempo a economizar dinheiro."], ["버스를 타기보다 걷는 게 좋아요.", "Prefiro caminhar a pegar o ônibus."]]],
  ],
  guided: [
    mcq("Por que Sujin quer mudar de casa?", ["Para economizar tempo.", "Para economizar dinheiro.", "Para morar com a família."], "Para economizar tempo.", "돈을 아끼기보다 시간을 아끼고 싶어요: ela prioriza o tempo."),
    cloze("Complete a troca: 비싼 ___ 회사까지 걸어서 다닐 수 있어요.", "대신에", "비싼 대신에 introduz o custo e a compensação.", ["대신"]),
    listen("Ouça e escreva a desvantagem da casa atual.", "지금 집은 싼 대신에 지하철로 한 시간 걸려요.", "지금 집은 싼 대신에 지하철로 한 시간 걸려요.", "A casa atual é barata, mas leva uma hora de metrô.", ["지금 집은 싼 대신에 지하철로 한 시간 걸려요"]),
    reading("수진은 회사 근처로 이사할까 해요. 새 집은 집세가 비싸지만 회사까지 걸어서 다닐 수 있어요. 지금 집은 싼 대신에 한 시간이나 걸려요. 수진은 돈을 아끼기보다 시간을 아끼고 싶어요.", "Qual é a desvantagem da casa atual?", ["Fica longe e leva uma hora.", "É muito cara.", "Não tem metrô perto."], "Fica longe e leva uma hora.", "싼 대신에 한 시간이나 걸려요."),
    translate("pt-ko", "Traduza: “Prefiro caminhar a pegar o ônibus.”", "버스를 타기보다 걸어가는 게 좋아요.", "타기보다 apresenta a opção descartada.", ["버스를 타기보다 걷는 게 좋아요"]),
  ],
  independent: [
    mcq("Qual frase mostra uma troca entre vantagem e custo?", ["값이 싼 대신에 시간이 오래 걸려요.", "값이 싸서 시간이 오래 걸려요.", "값이 싸면 시간이 오래 걸려요."], "값이 싼 대신에 시간이 오래 걸려요.", "-는 대신에 mostra o custo que acompanha a vantagem."),
    cloze("Complete a preferência: 돈을 아끼___ 시간을 아끼고 싶어요.", "기보다", "아끼기보다 apresenta a opção descartada."),
    listen("Ouça e escreva a vantagem da casa nova.", "새 집은 비싼 대신에 회사와 가까워요.", "새 집은 비싼 대신에 회사와 가까워요.", "A casa nova é cara, mas em troca fica perto da empresa.", ["새 집은 비싼 대신에 회사와 가까워요"]),
    translate("ko-pt", "Traduza: 이번에는 돈을 아끼기보다 시간을 아끼고 싶어요.", "Desta vez, prefiro economizar tempo a economizar dinheiro.", "아끼기보다 marca a opção de que ele abre mão.", ["Desta vez prefiro economizar tempo a economizar dinheiro.", "Nesta vez, prefiro poupar tempo em vez de dinheiro."]),
    reading("민수는 새 노트북을 사려고 해요. 가벼운 노트북은 비싼 대신에 들고 다니기 편해요. 무거운 노트북은 싼 대신에 매일 들고 다니기 힘들어요. 민수는 가격보다 무게를 중요하게 생각해요.", "O que Minsu prioriza?", ["O peso.", "O preço.", "A marca."], "O peso.", "가격보다 무게를 중요하게 생각해요."),
  ],
  summary: ["-는 대신(에) explicita o custo de uma escolha.", "-기보다 mostra qual opção o falante descarta.", "Comparar exige dizer o critério usado.", "Conteúdo original, ainda em revisão."],
  production: {
    titlePt: "Produção independente · duas opções", promptPt: "Descreva duas opções que você está considerando (curso, moradia, horário de trabalho) e recomende uma delas. Escreva de cinco a sete frases.", promptKo: "두 가지 선택을 비교하고, 하나를 추천하는 글을 써 보세요.",
    guidance: ["Diga qual é o critério da comparação.", "Use -는 대신(에) para o custo de cada opção.", "Use -기보다 para dizer o que você descarta."],
    checklist: ["Duas opções descritas.", "Uma vantagem e um custo de cada lado.", "Critério de escolha explícito.", "Recomendação final com motivo."], minWords: 40,
  },
});

/** b1-l09 — condições, limites e exceções. */
export const B1_L09 = defineB1Lesson({
  id: "b1-l09", number: 9, moduleId: "b1-m02", title: "Se as condições mudarem",
  objective: "Planejar com condições, limites e exceções sem contradizer o próprio plano.",
  prerequisites: ["b1-l08"], estimatedMinutes: 70, dialogueTitle: "Plano de viagem e clima",
  intro: [
    { title: "Condição com -는 한", body: "-는 한 significa “enquanto” ou “desde que” uma condição continuar verdadeira. Se a condição deixar de valer, o plano também muda.", ko: "날씨가 좋은 한 야외 일정을 유지할 거예요." },
    { title: "Exceção com -더라도", body: "-더라도 apresenta uma hipótese forte, do tipo “mesmo que”. É mais enfático que -아/어도 e costuma vir com situações extremas.", ko: "비가 오더라도 여행은 취소하지 않을 거예요." },
  ],
  dialogue: [
    ["지민", "다음 주 제주도 여행 계획은 잘 되어 가요?", "O plano da viagem a Jeju na próxima semana está indo bem?"],
    ["수진", "거의 다 했어요. 날씨가 좋은 한 야외 일정을 유지할 거예요.", "Está quase tudo pronto. Desde que o tempo esteja bom, vou manter o roteiro ao ar livre."],
    ["지민", "비가 오면 어떻게 해요?", "E se chover?"],
    ["수진", "비가 오더라도 실내 일정으로 바꿀 수 있어요.", "Mesmo que chova, posso trocar para um roteiro indoor."],
    ["지민", "돈은 충분해요?", "O dinheiro é suficiente?"],
    ["수진", "호텔 비용을 조금 줄이면 예산 안에서 다 할 수 있어요.", "Se eu reduzir um pouco o custo do hotel, dá para fazer tudo dentro do orçamento."],
  ],
  reusedIds: ["ko:날씨", "ko:여행", "ko:변경", "ko:조건", "ko:예약하다"],
  grammar: [
    ["-는 한 — desde que", "동사/형용사 + -는 한", "Estabelece a condição que precisa continuar verdadeira para o plano valer. Se a condição falhar, a consequência também muda; por isso não use duas condições incompatíveis na mesma frase.", [["날씨가 좋은 한 야외 일정을 유지할 거예요.", "Desde que o tempo esteja bom, vou manter o roteiro ao ar livre."], ["시간이 있는 한 매일 연습할 거예요.", "Enquanto eu tiver tempo, vou praticar todos os dias."]]],
    ["-더라도 — mesmo que", "동사/형용사 + -더라도", "Marca uma concessão forte: a ação ou o plano continua válido diante de uma hipótese desfavorável. É mais enfático que -아/어도.", [["비가 오더라도 실내 일정으로 바꿀 수 있어요.", "Mesmo que chova, posso trocar para um roteiro indoor."], ["아무리 바쁘더라도 식사는 해야 해요.", "Mesmo que esteja muito ocupado, é preciso comer."]]],
  ],
  guided: [
    mcq("O que Sujin vai manter se o tempo estiver bom?", ["O roteiro ao ar livre.", "O roteiro indoor.", "A viagem cancelada."], "O roteiro ao ar livre.", "날씨가 좋은 한 야외 일정을 유지할 거예요."),
    cloze("Complete a condição: 날씨가 좋___ 야외 일정을 유지할 거예요.", "은 한", "좋은 한 significa “desde que esteja bom”."),
    listen("Ouça e escreva o que ela fará mesmo se chover.", "비가 오더라도 실내 일정으로 바꿀 수 있어요.", "비가 오더라도 실내 일정으로 바꿀 수 있어요.", "Mesmo com chuva, ela pode mudar para um roteiro indoor.", ["비가 오더라도 실내 일정으로 바꿀 수 있어요"]),
    reading("수진은 다음 주에 제주도로 여행을 가요. 날씨가 좋은 한 야외 일정을 유지할 거예요. 비가 오더라도 실내 일정으로 바꿀 수 있어요. 호텔 비용을 조금 줄이면 예산 안에서 여행할 수 있어요.", "O que acontece se chover?", ["Ela troca para um roteiro indoor.", "Ela cancela a viagem.", "Ela muda a data da viagem."], "Ela troca para um roteiro indoor.", "비가 오더라도 실내 일정으로 바꿀 수 있어요."),
    translate("pt-ko", "Traduza: “Mesmo que chova, vou viajar.”", "비가 오더라도 여행을 갈 거예요.", "오더라도 mantém o plano diante da chuva.", ["비가 오더라도 여행은 갈 거예요"]),
  ],
  independent: [
    mcq("Qual frase apresenta uma condição-limite?", ["시간이 있는 한 매일 연습할 거예요.", "시간이 있으면 매일 연습했어요.", "시간이 없어서 매일 연습해요."], "시간이 있는 한 매일 연습할 거예요.", "-는 한 condiciona o plano ao tempo disponível."),
    cloze("Complete a exceção: 비가 오___ 실내 일정으로 바꿀 수 있어요.", "더라도", "오더라도 significa “mesmo que chova”."),
    listen("Ouça e escreva a condição para manter o roteiro.", "날씨가 좋은 한 야외 일정을 유지할 거예요.", "날씨가 좋은 한 야외 일정을 유지할 거예요.", "O roteiro ao ar livre depende do bom tempo.", ["날씨가 좋은 한 야외 일정을 유지할 거예요"]),
    translate("ko-pt", "Traduza: 비가 오더라도 여행은 취소하지 않을 거예요.", "Mesmo que chova, não vou cancelar a viagem.", "오더라도 expressa a concessão forte.", ["Mesmo que chova, não cancelarei a viagem."]),
    reading("여행을 준비할 때는 계획이 중요해요. 하지만 날씨와 돈은 계획대로 되지 않을 수 있어요. 그래서 한 가지 계획만 세우지 말고 다른 선택도 준비하는 게 좋아요.", "Qual é o conselho do texto?", ["Preparar mais de uma opção.", "Não planejar nada.", "Viajar apenas no verão."], "Preparar mais de uma opção.", "다른 선택도 준비하는 게 좋아요."),
  ],
  summary: ["-는 한 fixa a condição que sustenta o plano.", "-더라도 mantém o plano diante de uma hipótese ruim.", "Condição e exceção não podem se contradizer.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · plano com condição", promptPt: "Escreva um plano para o próximo mês com uma condição e uma exceção: o que você faz se tudo correr bem e o que muda se algo der errado. Use de cinco a sete frases.", promptKo: "다음 달 계획을 세우고, 조건이 바뀌면 어떻게 할지 함께 써 보세요.",
    guidance: ["Diga a condição principal do plano.", "Use -는 한 uma vez.", "Use -더라도 para a exceção."],
    checklist: ["Um plano principal claro.", "Uma condição com -는 한.", "Uma exceção com -더라도.", "Plano e exceção não se contradizem."], minWords: 40,
  },
});

/** b1-l10 — decisão difícil, motivo e consequência. */
export const B1_L10 = defineB1Lesson({
  id: "b1-l10", number: 10, moduleId: "b1-m02", title: "Decisões que mudam",
  objective: "Justificar uma decisão difícil, assumir suas consequências e reconhecer o que não havia alternativa.",
  prerequisites: ["b1-l09"], estimatedMinutes: 70, dialogueTitle: "A decisão de Sujin",
  intro: [
    { title: "Decisão retomada com -기로 하다", body: "Já visto no A2, -기로 하다 volta aqui para decisões que mudaram a vida do falante. Diferente de -(으)ㄹ까 하다, a decisão está tomada e o texto costuma trazer o motivo.", ko: "결국 퇴사하기로 했어요." },
    { title: "Necessidade com -지 않을 수 없다", body: "A dupla negação diz que não havia como evitar: “não tive como não…”. Aparece em relatos de decisões difíceis e costuma vir no passado.", ko: "일을 줄이지 않을 수 없었어요." },
  ],
  dialogue: [
    ["마르코", "수진 씨, 회사를 그만둔다고 들었어요.", "Sujin, ouvi dizer que você vai sair da empresa."],
    ["수진", "네. 오래 고민했지만 결국 퇴사하기로 했어요.", "Sim. Pensei muito, mas no fim decidi me desligar."],
    ["마르코", "왜 그렇게 결정했어요?", "Por que você decidiu assim?"],
    ["수진", "가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요.", "Eu precisava cuidar da família, então não tive como não reduzir o trabalho."],
    ["마르코", "새 일은 정했어요?", "Já decidiu o novo trabalho?"],
    ["수진", "아직요. 일단은 집에서 일하기로 했어요. 결정이 쉽지는 않았지만 지금은 마음이 편해요.", "Ainda não. Por enquanto decidi trabalhar em casa. A decisão não foi fácil, mas agora estou em paz."],
  ],
  reusedIds: ["ko:결정하다", "ko:책임", "ko:경험", "ko:미래", "ko:자신"],
  grammar: [
    ["-기로 하다 revisitado — decisão assumida", "동사 + -기로 하다", "Marca uma decisão tomada, muitas vezes depois de hesitação. No relato, costuma aparecer com o motivo e com a consequência aceita pelo falante.", [["결국 퇴사하기로 했어요.", "No fim, decidi me desligar da empresa."], ["일단은 집에서 일하기로 했어요.", "Por enquanto, decidi trabalhar em casa."]]],
    ["-지 않을 수 없다 — não ter como não", "동사 + -지 않을 수 없다", "Indica necessidade inevitável: o falante não tinha outra saída. É mais formal e mais forte que -아/어야 하다; use quando a decisão foi imposta pelas circunstâncias.", [["일을 줄이지 않을 수 없었어요.", "Não tive como não reduzir o trabalho."], ["그 결정을 받아들이지 않을 수 없어요.", "Não há como não aceitar essa decisão."]]],
  ],
  guided: [
    mcq("O que Sujin decidiu?", ["Sair da empresa.", "Mudar de cidade.", "Abrir uma loja."], "Sair da empresa.", "결국 퇴사하기로 했어요: ela decidiu se desligar."),
    cloze("Complete a decisão: 결국 퇴사하___ 했어요.", "기로", "퇴사하기로 했어요 marca a decisão assumida."),
    listen("Ouça e escreva por que ela não teve alternativa.", "가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요.", "가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요.", "Ela precisava cuidar da família e não teve como não reduzir o trabalho.", ["가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요"]),
    reading("수진은 오래 고민한 끝에 회사를 그만두기로 했어요. 가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요. 지금은 집에서 일하고 있어요. 결정이 쉽지는 않았지만 마음은 편해요.", "Por que ela tomou essa decisão?", ["Para cuidar da família.", "Para ganhar mais.", "Para estudar no exterior."], "Para cuidar da família.", "가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요."),
    translate("pt-ko", "Traduza: “Decidi trabalhar em casa por enquanto.”", "일단은 집에서 일하기로 했어요.", "일하기로 했어요 registra a decisão tomada.", ["당분간은 집에서 일하기로 했어요"]),
  ],
  independent: [
    mcq("Qual frase expressa uma decisão já tomada?", ["집에서 일하기로 했어요.", "집에서 일할까 해요.", "집에서 일할 수 있어요."], "집에서 일하기로 했어요.", "-기로 했어요 indica decisão; -(으)ㄹ까 하다 indica hipótese."),
    cloze("Complete a necessidade inevitável: 일을 줄이지 ___ 수 없었어요.", "않을", "줄이지 않을 수 없었어요: não houve como evitar."),
    listen("Ouça e escreva como ela se sente agora.", "결정이 쉽지는 않았지만 지금은 마음이 편해요.", "결정이 쉽지는 않았지만 지금은 마음이 편해요.", "A decisão não foi fácil, mas hoje ela está em paz.", ["결정이 쉽지는 않았지만 지금은 마음이 편해요"]),
    translate("ko-pt", "Traduza: 가족을 돌봐야 해서 일을 줄이지 않을 수 없었어요.", "Como precisava cuidar da família, não tive como não reduzir o trabalho.", "줄이지 않을 수 없었어요 expressa a necessidade inevitável.", ["Como eu precisava cuidar da família, não teve como não reduzir o trabalho."]),
    reading("민수는 좋은 제안을 받았지만 거절하기로 했어요. 새 일은 돈을 더 주지만 가족과 보내는 시간이 줄어들 거예요. 그는 가족과의 시간이 더 중요하다고 생각해요.", "Por que Minsu recusou a proposta?", ["Para manter o tempo com a família.", "Porque o salário era baixo.", "Porque não gostava da empresa."], "Para manter o tempo com a família.", "가족과의 시간이 더 중요하다고 생각해요."),
  ],
  summary: ["-기로 하다 registra uma decisão já tomada.", "-지 않을 수 없다 mostra que não havia alternativa.", "Uma decisão B1 traz motivo e consequência assumida.", "Conteúdo original, ainda em revisão."],
  production: {
    titlePt: "Produção independente · uma decisão difícil", promptPt: "Conte uma decisão difícil que você tomou ou que alguém próximo tomou. Explique o motivo, o que mudou e como você avalia a escolha hoje. Escreva de seis a oito frases.", promptKo: "힘든 결정을 내렸던 경험을 이야기해 보세요. 이유와 결과, 지금의 생각을 함께 써 보세요.",
    guidance: ["Situe a decisão no tempo.", "Diga o motivo que pesou.", "Use -기로 하다 e -지 않을 수 없다 uma vez cada."],
    checklist: ["A decisão está clara.", "O motivo aparece antes da consequência.", "Duas consequências descritas.", "A avaliação final é do próprio falante."], minWords: 40,
  },
});
