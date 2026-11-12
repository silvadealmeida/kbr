import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l36 — relato completo com contexto, complicação, decisão e desfecho. */
export const B1_L36 = defineB1Lesson({
  id: "b1-l36", number: 36, moduleId: "b1-m08", title: "Contar uma história completa",
  objective: "Integrar contexto, complicação, decisão e desfecho em um relato com avaliação final.",
  prerequisites: ["b1-c07"], estimatedMinutes: 75, dialogueTitle: "A decisão de mudar de carreira",
  intro: [
    { title: "Contexto antes da complicação", body: "Uma história completa começa com tempo, lugar e situação. Só depois de situar o ouvinte o falante apresenta o problema que exige uma decisão.", ko: "작년 봄부터 일이 너무 힘들더라고요." },
    { title: "Conectores que fazem a história avançar", body: "그런데 abre um novo ângulo, 그래서 liga causa e consequência e 결국 marca o desfecho. Use cada um no momento certo, sem empilhar todos na mesma frase.", ko: "그래서 결국 옮기기로 했어요." },
  ],
  dialogue: [
    ["지민", "수진 씨, 회사를 그만두었다고 들었어요. 무슨 일이 있었어요?", "Sujin, ouvi dizer que você saiu da empresa. O que aconteceu?"],
    ["수진", "작년 봄부터 일이 너무 힘들더라고요. 그런데 바로 그만둘 용기는 없었어요.", "Desde a primavera passada o trabalho estava muito difícil. Mas eu não tinha coragem de sair logo."],
    ["지민", "그럼 어떻게 결정했어요?", "Então como você decidiu?"],
    ["수진", "몇 달 동안 고민하다가 작은 회사에서 제안을 받았어요. 그래서 결국 옮기기로 했어요.", "Depois de pensar por alguns meses, recebi uma proposta de uma empresa pequena. Então, no fim, decidi mudar."],
    ["지민", "지금은 어때요?", "Como está agora?"],
    ["수진", "월급은 조금 줄었지만 배우는 게 많아요. 그때 용기를 낸 게 정말 잘한 일이더라고요.", "O salário diminuiu um pouco, mas aprendo muita coisa. Ter tido coragem naquele momento foi realmente a coisa certa."],
  ],
  reusedIds: ["ko:경험", "ko:감동", "ko:장면", "ko:결말"],
  grammar: [
    ["-더라고요 — avaliação vivida", "동사/형용사 + -더라고요", "Use -더라고요 para trazer ao relato algo que o falante viveu ou percebeu. No fechamento de uma história, a forma acrescenta avaliação pessoal ao fato narrado.", [["일이 너무 힘들더라고요.", "O trabalho estava muito difícil, eu percebi."], ["용기를 낸 게 잘한 일이더라고요.", "Ter tido coragem foi realmente a coisa certa."]]],
    ["Conectores cumulativos", "그런데 / 그래서 / 결국", "Cada conector cumpre uma função: 그런데 vira o ângulo, 그래서 explica a consequência e 결국 sinaliza o desfecho. Uma história clara usa poucos conectores por frase.", [["그런데 바로 그만둘 용기는 없었어요.", "Mas eu não tinha coragem de sair logo."], ["그래서 결국 옮기기로 했어요.", "Então, no fim, decidi mudar."]]],
  ],
  guided: [
    mcq("Por que Sujin mudou de empresa?", ["Porque recebeu uma proposta de uma empresa menor.", "Porque o salário aumentou muito.", "Porque se mudou para outra cidade."], "Porque recebeu uma proposta de uma empresa menor.", "작은 회사에서 제안을 받았어요."),
    cloze("Complete a avaliação inicial: 일이 너무 힘들___.", "더라고요", "힘들더라고요 relata a dificuldade vivida pela falante."),
    listen("Ouça e escreva a decisão final de Sujin.", "그래서 결국 옮기기로 했어요.", "그래서 결국 옮기기로 했어요.", "Então, no fim, ela decidiu mudar de empresa.", ["그래서 결국 옮기기로 했어요"]),
    reading("수진은 작년 봄부터 일이 힘들다고 느꼈어요. 하지만 바로 그만두지 않고 몇 달 동안 고민했어요. 그러다 작은 회사에서 제안을 받아서 결국 회사를 옮기기로 했어요.", "Qual foi a ordem dos acontecimentos?", ["Dificuldade, espera, proposta e mudança.", "Proposta, dificuldade, mudança e espera.", "Mudança, proposta, dificuldade e espera."], "Dificuldade, espera, proposta e mudança.", "힘들다고 느꼈어요 → 고민했어요 → 제안을 받았어요 → 이직하기로 했어요."),
    translate("pt-ko", "Traduza: “No fim, decidi mudar de empresa.”", "결국 회사를 옮기기로 했어요.", "옮기기로 했어요 expressa a decisão tomada.", ["결국 이직하기로 했어요."]),
  ],
  independent: [
    mcq("Qual frase avalia a decisão tomada?", ["용기를 낸 게 잘한 일이더라고요.", "작은 회사에서 제안을 받았어요.", "월급은 조금 줄었어요."], "용기를 낸 게 잘한 일이더라고요.", "-더라고요 fecha o relato com avaliação pessoal."),
    cloze("Complete a sequência: 몇 달 동안 고민하___ 제안을 받았어요.", "다가", "고민하다가 indica a ação que antecedeu a proposta."),
    listen("Ouça e escreva o resultado atual.", "월급은 조금 줄었지만 배우는 게 많아요.", "월급은 조금 줄었지만 배우는 게 많아요.", "O salário diminuiu, mas ela aprende muita coisa.", ["월급은 조금 줄었지만 배우는 게 많아요"]),
    translate("ko-pt", "Traduza: 그때 용기를 낸 게 정말 잘한 일이더라고요.", "Ter tido coragem naquele momento foi realmente a coisa certa.", "잘한 일이더라고요 avalia a decisão como acertada.", ["Ter coragem naquele momento foi realmente a coisa certa."]),
    reading("직장을 바꾸는 것은 쉽지 않아요. 하지만 지금 하는 일이 맞지 않는다고 느끼면, 충분히 고민한 뒤에 결정하는 게 좋아요. 중요한 것은 남의 기준이 아니라 자기 기준으로 판단하는 거예요.", "Qual é o conselho do texto?", ["Pensar bem e decidir com critérios próprios.", "Mudar de emprego sem pensar.", "Seguir sempre a opinião da família."], "Pensar bem e decidir com critérios próprios.", "자기 기준으로 판단하는 거예요."),
  ],
  summary: ["Uma história completa situa o contexto antes da complicação.", "-더라고요 acrescenta a perspectiva de quem viveu o fato.", "그런데, 그래서 e 결국 organizam ângulo, consequência e desfecho.", "O desfecho deve incluir uma avaliação, não apenas um fato."],
  production: {
    titlePt: "Produção independente · uma mudança completa", promptPt: "Conte a história de uma mudança importante na sua vida. Situe o contexto, apresente a complicação, a decisão e o desfecho com uma avaliação. Escreva de sete a dez frases.", promptKo: "인생에서 중요한 변화를 겪은 이야기를 써 보세요.",
    guidance: ["Diga quando e onde tudo começou.", "Mostre o problema e a decisão tomada.", "Termine com o resultado e sua avaliação."],
    checklist: ["Contexto com tempo e lugar.", "Complicação e decisão reconhecíveis.", "Desfecho com consequência clara.", "Avaliação final com -더라고요 ou expressão equivalente."], minWords: 36,
  },
});

/** b1-l37 — solução negociada com prazo, custo e responsável. */
export const B1_L37 = defineB1Lesson({
  id: "b1-l37", number: 37, moduleId: "b1-m08", title: "Resolver um problema complexo",
  objective: "Negociar uma solução com prazo, custo, responsável e próximo passo.",
  prerequisites: ["b1-l36"], estimatedMinutes: 75, dialogueTitle: "A reunião sobre o vazamento",
  intro: [
    { title: "-도록 — pedir e providenciar", body: "-도록 indica o objetivo de um pedido ou a providência que alguém deve tomar. É comum com 요청하다, 부탁하다 e 하다 em reuniões.", ko: "업체에 빨리 고치도록 요청했어요." },
    { title: "-기로 하다 — acordo fechado", body: "A forma -기로 하다 registra uma decisão ou um acordo entre pessoas. O passado 하기로 했어요 mostra o que ficou combinado.", ko: "절반씩 부담하기로 했어요." },
  ],
  dialogue: [
    ["지민", "이번 주 안으로 누수 문제를 해결해야 해요.", "Precisamos resolver o problema do vazamento até o fim desta semana."],
    ["마르코", "관리실에서는 원인을 찾았어요?", "A administração encontrou a causa?"],
    ["지민", "네, 옥상 배관이 낡아서 물이 새고 있었어요. 그래서 업체에 빨리 고치도록 요청했어요.", "Sim, o encanamento da cobertura estava velho e vazava. Por isso pedi à empresa que consertasse rapidamente."],
    ["마르코", "비용은 어떻게 나누기로 했어요?", "Como decidiram dividir o custo?"],
    ["지민", "관리비로 절반을 내고, 나머지는 건물주가 부담하기로 했어요. 금요일까지 견적을 받을 거예요.", "Decidimos pagar metade com a taxa de manutenção, e o proprietário assume o restante. Vou receber o orçamento até sexta."],
    ["마르코", "그럼 다음 주 월요일에 공사를 시작하도록 하죠.", "Então vamos fazer a obra começar na segunda-feira que vem."],
  ],
  reusedIds: ["ko:문제", "ko:해결", "ko:업무", "ko:절차"],
  grammar: [
    ["-도록 — pedido e providência", "동사 + -도록", "Use -도록 para indicar o que deve ser feito ou o resultado que se quer garantir. Não confunda com uma ordem direta: a forma aparece dentro de um pedido ou de uma providência.", [["업체에 빨리 고치도록 요청했어요.", "Pedi à empresa que consertasse rapidamente."], ["다음 주 월요일에 시작하도록 하겠습니다.", "Farei com que a obra comece na segunda-feira que vem."]]],
    ["-기로 하다 revisitado — acordo", "동사 + -기로 하다", "A forma consolida uma decisão conjunta. O sujeito pode ser singular ou plural; o contexto mostra quem participou do acordo.", [["비용은 절반씩 부담하기로 했어요.", "Decidimos dividir o custo pela metade cada um."], ["다음 주에 공사를 시작하기로 했어요.", "Ficou decidido começar a obra na semana que vem."]]],
  ],
  guided: [
    mcq("Qual é o problema do prédio?", ["Um vazamento no encanamento do telhado.", "A falta de água em todos os andares.", "Uma obra atrasada na garagem."], "Um vazamento no encanamento do telhado.", "옥상 배관이 낡아서 물이 새고 있었어요."),
    cloze("Complete o pedido: 업체에 빨리 고치___ 요청했어요.", "도록", "고치도록 요청했어요 indica a providência pedida à empresa."),
    listen("Ouça e escreva até quando o orçamento será recebido.", "금요일까지 견적을 받을 거예요.", "금요일까지 견적을 받을 거예요.", "O orçamento será recebido até sexta-feira.", ["금요일까지 견적을 받을 거예요"]),
    reading("관리실은 옥상 배관이 낡은 것을 발견했어요. 수리는 업체에 맡기고, 비용은 관리비와 건물주가 절반씩 부담하기로 했어요. 견적은 금요일까지 받고 공사는 다음 주 월요일에 시작해요.", "Quem paga a outra metade do conserto?", ["O proprietário do prédio.", "A empresa de reparo.", "Os moradores do primeiro andar."], "O proprietário do prédio.", "나머지는 건물주가 부담하기로 했어요."),
    translate("pt-ko", "Traduza: “Pedi à empresa que consertasse rapidamente.”", "업체에 빨리 고치도록 요청했어요.", "고치도록 요청했어요 registra o pedido feito à empresa.", ["업체에 빨리 수리하도록 요청했어요."]),
  ],
  independent: [
    mcq("Qual frase registra um acordo fechado?", ["절반씩 부담하기로 했어요.", "절반씩 부담할 수 있어요.", "절반씩 부담하면 좋겠어요."], "절반씩 부담하기로 했어요.", "-기로 했어요 indica o acordo decidido."),
    cloze("Complete o próximo passo: 다음 주 월요일에 공사를 시작하___ 할게요.", "도록", "시작하도록 할게요 expressa a providência assumida."),
    listen("Ouça e escreva como o custo foi dividido.", "관리비로 절반을 내고, 나머지는 건물주가 부담하기로 했어요.", "관리비로 절반을 내고, 나머지는 건물주가 부담하기로 했어요.", "Metade sai da taxa de manutenção e o restante fica com o proprietário.", ["관리비로 절반을 내고 나머지는 건물주가 부담하기로 했어요"]),
    translate("ko-pt", "Traduza: 다음 주 월요일에 공사를 시작하도록 하겠습니다.", "Farei a obra começar na segunda-feira da próxima semana.", "시작하도록 하겠습니다 anuncia a providência que será tomada.", ["Vou providenciar o início da obra na próxima segunda-feira."]),
    reading("문제가 여러 사람과 관련되어 있을 때는 먼저 각자의 이해를 확인해야 해요. 그다음 비용과 일정을 나누고, 누가 무엇을 맡을지 정하면 오해가 줄어요.", "Qual é a recomendação para um problema complexo?", ["Confirmar interesses e dividir custos, prazos e responsabilidades.", "Resolver tudo sozinho e avisar depois.", "Evitar conversar com as partes envolvidas."], "Confirmar interesses e dividir custos, prazos e responsabilidades.", "각자의 이해를 확인하고 비용과 일정, 담당을 정해요."),
  ],
  summary: ["-도록 indica o objetivo de um pedido ou providência.", "-기로 하다 consolida um acordo entre as partes.", "Uma solução complexa precisa de prazo, custo e responsável.", "O próximo passo deve ficar explícito antes de encerrar a reunião."],
  production: {
    titlePt: "Produção independente · um plano de solução", promptPt: "Descreva um problema que envolve várias pessoas e proponha uma solução. Inclua o problema, os interesses, o acordo, o custo, o prazo e o responsável. Escreva cerca de seis frases.", promptKo: "여러 사람이 관련된 문제를 해결하는 계획을 써 보세요.",
    guidance: ["Explique o problema e quem é afetado.", "Diga o que ficou acordado.", "Defina prazo, custo e responsável."],
    checklist: ["Problema descrito com clareza.", "Interesses das partes mencionados.", "Acordo com custo e prazo.", "Responsável e próximo passo definidos."], minWords: 34,
  },
});

/** b1-l38 — mensagem formal com contexto, pedido e encerramento. */
export const B1_L38 = defineB1Lesson({
  id: "b1-l38", number: 38, moduleId: "b1-m08", title: "Escrever uma mensagem formal",
  objective: "Escrever uma mensagem formal com contexto, pedido, prazo e encerramento adequado.",
  prerequisites: ["b1-l37"], estimatedMinutes: 70, dialogueTitle: "Revisando o e-mail para a biblioteca",
  intro: [
    { title: "As partes de uma mensagem formal", body: "Uma mensagem formal costuma ter assunto, contexto, pedido, prazo de resposta e encerramento. O assunto resume o tema; o corpo explica a situação sem rodeios.", ko: "예약 취소에 대한 문의입니다." },
    { title: "-에 대한 — a respeito de", body: "A estrutura 명사 + 에 대한 + 명사 liga um tema ao documento ou à ação. É típica de assuntos e pedidos formais.", ko: "환불에 대한 안내를 부탁드립니다." },
  ],
  dialogue: [
    ["수진", "이 메시지 좀 봐 주시겠어요? 도서관에 보내려고요.", "Pode dar uma olhada nesta mensagem? Vou enviá-la à biblioteca."],
    ["지민", "네. 제목은 뭐라고 썼어요?", "Claro. Qual assunto você escreveu?"],
    ["수진", "예약 취소에 대한 문의라고 썼어요.", "Escrevi “Consulta sobre cancelamento de reserva”."],
    ["지민", "좋아요. 본문에 날짜와 예약 번호가 들어 있나요?", "Bom. O corpo tem a data e o número da reserva?"],
    ["수진", "네, 그리고 환불을 받을 수 있도록 확인해 달라고 했어요.", "Sim, e pedi que confirmassem para eu poder receber o reembolso."],
    ["지민", "마지막에 회신 기한을 꼭 넣으세요. 금요일까지라고 쓰면 좋겠어요.", "Não esqueça de incluir o prazo de resposta no final. Seria bom escrever “até sexta-feira”."],
  ],
  reusedIds: ["ko:부탁", "ko:확인하다", "ko:메시지", "ko:답장"],
  grammar: [
    ["-에 대한 — a respeito de", "명사 + 에 대한 + 명사", "Use -에 대한 para dizer sobre o que é a mensagem, a pergunta ou a providência. O substantivo seguinte costuma ser 문의, 안내, 요청 ou 확인.", [["예약 취소에 대한 문의입니다.", "É uma consulta sobre o cancelamento da reserva."], ["환불에 대한 안내를 부탁드립니다.", "Peço orientações sobre o reembolso."]]],
    ["-도록 요청하다 revisitado — pedido formal", "동사 + -도록 요청하다 / 부탁드리다", "Em mensagens formais, -도록 suaviza o pedido e o apresenta como providência necessária. O verbo 요청하다 ou 부탁드리다 fecha a frase com registro cortês.", [["환불을 받을 수 있도록 확인해 주시기 바랍니다.", "Peço que confirmem para que eu possa receber o reembolso."], ["금요일까지 회신해 주시기 바랍니다.", "Peço que respondam até sexta-feira."]]],
  ],
  guided: [
    mcq("Qual é o assunto da mensagem de Sujin?", ["Cancelamento de uma reserva e reembolso.", "Uma nova inscrição em um curso.", "Um atraso no transporte público."], "Cancelamento de uma reserva e reembolso.", "예약 취소에 대한 문의라고 썼어요."),
    cloze("Complete o assunto: 예약 취소___ 문의입니다.", "에 대한", "취소에 대한 문의 significa “consulta sobre o cancelamento”."),
    listen("Ouça e escreva o prazo pedido na mensagem.", "금요일까지 회신해 주시기 바랍니다.", "금요일까지 회신해 주시기 바랍니다.", "Pede-se uma resposta até sexta-feira.", ["금요일까지 회신해 주시기 바랍니다"]),
    reading("안녕하세요. 지난달에 도서관 강의실을 예약했습니다. 그런데 같은 날짜에 다른 예약이 잡혀 있어 사용할 수 없다는 안내를 받았습니다. 예약 취소에 대한 환불 절차를 안내해 주시기 바랍니다. 가능하시다면 금요일까지 회신을 부탁드립니다. 감사합니다.", "Qual é o pedido principal?", ["Informações sobre o procedimento de reembolso.", "Uma nova data para o curso.", "A confirmação do número de telefone."], "Informações sobre o procedimento de reembolso.", "환불 절차를 안내해 주시기 바랍니다."),
    translate("pt-ko", "Traduza: “Enviei uma consulta sobre o cancelamento da reserva.”", "예약 취소에 대한 문의를 보냈어요.", "취소에 대한 문의 é a estrutura de assunto formal.", ["예약 취소에 대한 질문을 보냈어요."]),
  ],
  independent: [
    mcq("Qual parte da mensagem indica até quando a instituição deve responder?", ["회신 기한", "제목", "서명"], "회신 기한", "회신 기한 é o prazo de resposta."),
    cloze("Complete o pedido: 환불을 받을 수 있___ 확인해 주세요.", "도록", "받을 수 있도록 확인해 주세요 apresenta o pedido como providência."),
    listen("Ouça e escreva o que foi incluído no corpo da mensagem.", "본문에 날짜와 예약 번호를 넣었어요.", "본문에 날짜와 예약 번호를 넣었어요.", "A data e o número da reserva foram incluídos no corpo.", ["본문에 날짜와 예약 번호를 넣었어요"]),
    translate("ko-pt", "Traduza: 금요일까지 회신해 주시기 바랍니다.", "Peço que respondam até sexta-feira.", "회신해 주시기 바랍니다 é um pedido formal de resposta.", ["Solicito uma resposta até sexta-feira."]),
    reading("문의를 보낼 때는 제목에 핵심을 쓰고, 본문에는 상황과 요청을 간단히 정리하는 것이 좋아요. 마지막에는 회신 기한과 감사 인사를 넣으면 상대가 빠르게 답할 수 있어요.", "O que ajuda a receber uma resposta rápida?", ["Um prazo claro e um agradecimento.", "Um texto muito longo e detalhado.", "Vários pedidos diferentes na mesma frase."], "Um prazo claro e um agradecimento.", "회신 기한과 감사 인사를 넣으면 빨리 답할 수 있어요."),
  ],
  summary: ["Uma mensagem formal tem assunto, contexto, pedido e prazo.", "-에 대한 liga o tema ao documento ou à providência.", "-도록 요청하다 suaviza e organiza o pedido formal.", "O encerramento deve agradecer e indicar a expectativa de resposta."],
  production: {
    titlePt: "Produção independente · mensagem formal", promptPt: "Escreva uma mensagem formal a uma instituição sobre um problema. Inclua assunto, contexto, pedido, prazo de resposta e encerramento. Use cerca de seis frases.", promptKo: "기관에 보낼 정중한 메시지를 써 보세요.",
    guidance: ["Comece com um assunto claro.", "Explique a situação em duas frases.", "Feche com pedido, prazo e agradecimento."],
    checklist: ["Assunto específico.", "Contexto com data ou número.", "Pedido com -도록 ou -에 대한.", "Prazo de resposta e encerramento cordial."], minWords: 33,
  },
});

/** b1-l39 — debate com tese, concessão e conclusão. */
export const B1_L39 = defineB1Lesson({
  id: "b1-l39", number: 39, moduleId: "b1-m08", title: "Debater um tema",
  objective: "Organizar tese, concessão e conclusão em uma intervenção de debate.",
  prerequisites: ["b1-l38"], estimatedMinutes: 75, dialogueTitle: "Debate sobre trabalho remoto",
  intro: [
    { title: "Tese, concessão e conclusão", body: "Em um debate, primeiro se apresenta a tese. Depois se reconhece algo válido no argumento contrário e, por fim, se propõe uma conclusão que una os pontos.", ko: "장점이 많다는 점은 인정해요." },
    { title: "-기는 하지만 — conceder sem ceder", body: "A forma -기는 하지만 reconhece um fato e imediatamente apresenta uma ressalva. É uma concessão educada, não uma concordância total.", ko: "중요한 일도 있기는 하지만 집중력이 높아져요." },
  ],
  dialogue: [
    ["지민", "저는 재택근무를 계속 확대해야 한다고 생각해요.", "Eu acho que o trabalho remoto deve continuar sendo ampliado."],
    ["마르코", "저도 장점이 많다는 점은 인정해요. 하지만 모든 직무에 맞지는 않아요.", "Também reconheço que há muitas vantagens. Mas não serve para todas as funções."],
    ["지민", "물론 협업이 중요한 일도 있기는 하지만, 출퇴근 시간을 줄이면 집중력이 높아져요.", "Claro que há trabalhos em que a colaboração é importante, mas reduzir o tempo de deslocamento aumenta a concentração."],
    ["마르코", "그 점은 맞아요. 그래도 신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요.", "Nesse ponto você tem razão. Ainda assim, considerando que funcionários novos precisam de tempo para aprender presencialmente, deve ser introduzido de forma gradual."],
    ["지민", "좋아요. 그러면 직무에 따라 선택할 수 있도록 하면 어떨까요?", "Certo. Então que tal permitir a escolha conforme a função?"],
    ["마르코", "합리적이네요. 저는 그 방식에 동의해요.", "É razoável. Concordo com essa abordagem."],
  ],
  reusedIds: ["ko:의견", "ko:주장", "ko:논쟁", "ko:동의"],
  grammar: [
    ["-기는 하지만 revisitado — concessão", "동사/형용사 + -기는 하지만", "Use -기는 하지만 para admitir um ponto do outro lado antes de defender sua posição. A concessão prepara o contraste; ela não anula a tese.", [["협업이 중요한 일도 있기는 하지만 집중력이 높아져요.", "Há trabalhos em que a colaboração é importante, mas a concentração aumenta."], ["장점이 많기는 하지만 모든 직무에 맞지는 않아요.", "Há muitas vantagens, mas não serve para todas as funções."]]],
    ["-다는 점에서 — sob o aspecto de", "동사/형용사 + -다는 점에서", "A forma apresenta o aspecto que justifica uma conclusão. É comum em debates e textos argumentativos para ligar evidência e proposta.", [["신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요.", "Considerando que funcionários novos precisam aprender presencialmente, deve ser introduzido gradualmente."], ["비용이 줄어든다는 점에서 의미가 있어요.", "Tem sentido sob o aspecto de que os custos diminuem."]]],
  ],
  guided: [
    mcq("Qual é a tese de Jimin?", ["Ampliar o trabalho remoto.", "Encerrar o trabalho remoto.", "Reduzir o salário dos funcionários."], "Ampliar o trabalho remoto.", "재택근무를 계속 확대해야 한다고 생각해요."),
    cloze("Complete a concessão: 협업이 중요한 일도 있___ 하지만 집중력이 높아져요.", "기는", "있기는 하지만 reconhece o ponto contrário antes da ressalva."),
    listen("Ouça e escreva a ressalva de Marco sobre os novos funcionários.", "신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요.", "신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요.", "Ele defende uma introdução gradual por causa da aprendizagem presencial.", ["신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요"]),
    reading("재택근무를 확대하자는 의견에는 장점이 많아요. 출퇴근 시간이 줄고 집중하기 쉬워지기 때문이에요. 하지만 모든 일을 혼자 할 수는 없다는 점도 고려해야 해요. 그래서 직무에 따라 선택하는 방식이 합리적이에요.", "Qual é a conclusão do texto?", ["Escolher conforme a função é razoável.", "Todos devem trabalhar em casa.", "O trabalho remoto deve acabar."], "Escolher conforme a função é razoável.", "직무에 따라 선택하는 방식이 합리적이에요."),
    translate("pt-ko", "Traduza: “Reconheço as vantagens, mas não serve para todas as funções.”", "장점이 많다는 점은 인정하지만 모든 직무에 맞지는 않아요.", "인정하지만 apresenta a concessão antes da ressalva.", ["장점이 많다는 점은 인정해요. 하지만 모든 직무에 맞지는 않아요."]),
  ],
  independent: [
    mcq("Qual expressão introduz uma concessão?", ["-기는 하지만", "-다는 점에서", "-도록"], "-기는 하지만", "-기는 하지만 reconhece um ponto e apresenta ressalva."),
    cloze("Complete a justificativa: 비용이 줄어든___ 점에서 의미가 있어요.", "다는", "줄어든다는 점에서 apresenta o aspecto que dá sentido à proposta."),
    listen("Ouça e escreva a conclusão de Marco.", "저는 그 방식에 동의해요.", "저는 그 방식에 동의해요.", "Ele concorda com a proposta de escolha conforme a função.", ["저는 그 방식에 동의해요"]),
    translate("ko-pt", "Traduza: 신입 사원에게는 직접 배우는 시간이 필요하다는 점에서 단계적으로 도입해야 해요.", "Considerando que funcionários novos precisam de tempo para aprender presencialmente, deve-se introduzir de forma gradual.", "필요하다는 점에서 liga a evidência à conclusão.", ["Como funcionários novos precisam de tempo para aprender presencialmente, a introdução deve ser gradual."]),
    reading("토론에서는 상대의 의견을 먼저 인정한 뒤 내 주장을 말하면 설득력이 높아져요. 감정적으로 반응하기보다 근거를 제시하고, 마지막에는 합의할 수 있는 부분을 찾는 것이 좋아요.", "Qual estratégia é recomendada?", ["Reconhecer o argumento do outro e apresentar evidências.", "Falar mais alto para vencer a discussão.", "Evitar qualquer acordo no final."], "Reconhecer o argumento do outro e apresentar evidências.", "상대의 의견을 인정한 뒤 근거를 제시해요."),
  ],
  summary: ["Uma intervenção de debate começa pela tese.", "-기는 하지만 reconhece o outro lado sem abandonar a posição.", "-다는 점에서 liga evidência e conclusão.", "Uma concessão bem feita abre espaço para uma proposta comum."],
  production: {
    titlePt: "Produção independente · intervenção em debate", promptPt: "Escreva uma intervenção sobre um tema polêmico. Apresente sua tese, faça uma concessão ao lado contrário, traga uma evidência e conclua com uma proposta. Use cerca de seis frases.", promptKo: "찬반이 갈리는 주제에 대한 토론 발언을 써 보세요.",
    guidance: ["Declare sua tese na primeira frase.", "Reconheça um ponto válido do outro lado.", "Conclua com uma proposta concreta."],
    checklist: ["Tese explícita.", "Concessão com -기는 하지만.", "Evidência ligada à conclusão com -다는 점에서.", "Proposta final que responde à objeção."], minWords: 38,
  },
});

/** b1-l40 — consolidação com narrativa, opinião e plano. */
export const B1_L40 = defineB1Lesson({
  id: "b1-l40", number: 40, moduleId: "b1-m08", title: "Meu percurso B1",
  objective: "Integrar narrativa, opinião e plano em um texto de encerramento do percurso.",
  prerequisites: ["b1-l39"], estimatedMinutes: 80, dialogueTitle: "O que aprendi até aqui",
  intro: [
    { title: "Retomar sem repetir tudo", body: "Em um texto de encerramento, não é preciso usar todas as estruturas aprendidas. Escolha as que cumprem cada função: narrar, opinar, comparar e planejar.", ko: "이야기를 끝까지 말할 수 있게 되었어요." },
    { title: "Conectores de discurso no fechamento", body: "처음에는, 그런데, 지금은 e 앞으로는 organizam passado, mudança, presente e futuro. Esses marcadores dão direção ao texto sem repetir o mesmo conector.", ko: "지금은 예전보다 자신감이 생겼어요." },
  ],
  dialogue: [
    ["지민", "수진 씨, 이 과정을 거의 끝냈는데 어떤 변화가 있었어요?", "Sujin, você está quase terminando este curso; que mudanças houve?"],
    ["수진", "처음에는 긴 문장을 만들기가 어려웠어요. 그런데 꾸준히 연습하면서 이야기를 끝까지 말할 수 있게 되었어요.", "No começo era difícil formar frases longas. Mas, praticando com constância, passei a conseguir contar uma história até o fim."],
    ["지민", "가장 어려웠던 점은 뭐였어요?", "Qual foi o ponto mais difícil?"],
    ["수진", "제 생각을 근거와 함께 말하는 일이었어요. 지금도 완벽하지는 않지만 예전보다 자신감이 생겼어요.", "Era falar minhas opiniões com fundamento. Ainda hoje não é perfeito, mas ganhei mais confiança do que antes."],
    ["지민", "앞으로는 무엇을 하고 싶어요?", "O que você quer fazer daqui para frente?"],
    ["수진", "뉴스 읽기를 더 연습하고, 내년에는 한국어로 짧은 글을 꾸준히 쓰고 싶어요.", "Quero praticar mais a leitura de notícias e, no ano que vem, escrever textos curtos em coreano com constância."],
  ],
  reusedIds: ["ko:경험", "ko:목표", "ko:성장", "ko:자신감", "ko:미래"],
  grammar: [
    ["Seleção cumulativa", "passado + -더라고요 / -게 되다 / -기는 하지만", "Escolha a estrutura pela função: -더라고요 avalia uma experiência, -게 되다 mostra uma mudança e -기는 하지만 apresenta uma concessão. Não empilhe as três na mesma frase.", [["처음에는 어려웠지만 지금은 자신감이 생겼어요.", "No começo foi difícil, mas agora ganhei confiança."], ["꾸준히 연습하면서 이야기를 끝까지 말할 수 있게 되었어요.", "Praticando com constância, passei a conseguir contar uma história até o fim."]]],
    ["Conectores de discurso", "처음에는 / 그런데 / 지금은 / 앞으로는", "Esses marcadores organizam o texto no tempo e no ponto de vista. Use um por etapa para que o leitor acompanhe a mudança sem se perder.", [["처음에는 긴 문장을 만들기가 어려웠어요.", "No começo era difícil formar frases longas."], ["앞으로는 뉴스 읽기를 더 연습하고 싶어요.", "Daqui para frente, quero praticar mais a leitura de notícias."]]],
  ],
  guided: [
    mcq("O que era difícil para Sujin no começo?", ["Formar frases longas.", "Entender notícias.", "Conversar com falantes nativos."], "Formar frases longas.", "처음에는 긴 문장을 만들기가 어려웠어요."),
    cloze("Complete a mudança: 꾸준히 연습하___ 이야기를 끝까지 말할 수 있게 되었어요.", "면서", "연습하면서 liga a prática constante ao resultado alcançado."),
    listen("Ouça e escreva como Sujin se sente agora.", "지금도 완벽하지는 않지만 예전보다 자신감이 생겼어요.", "지금도 완벽하지는 않지만 예전보다 자신감이 생겼어요.", "Ela ainda não é perfeita, mas ganhou confiança.", ["지금도 완벽하지는 않지만 예전보다 자신감이 생겼어요"]),
    reading("수진은 이 과정에서 긴 문장을 만드는 연습을 많이 했어요. 처음에는 어려웠지만, 꾸준히 쓰고 말하면서 자신의 생각을 정리하는 힘이 생겼어요. 앞으로는 뉴스 읽기와 짧은 글쓰기를 이어 갈 계획이에요.", "O que Sujin planeja fazer?", ["Ler notícias e escrever textos curtos.", "Parar de estudar coreano.", "Fazer um exame de nível."], "Ler notícias e escrever textos curtos.", "뉴스 읽기와 짧은 글쓰기를 이어 갈 계획이에요."),
    translate("pt-ko", "Traduza: “No começo era difícil, mas agora ganhei confiança.”", "처음에는 어려웠지만 지금은 자신감이 생겼어요.", "처음에는 e 지금은 marcam a mudança no tempo.", ["처음에는 힘들었지만 지금은 자신감이 생겼어요."]),
  ],
  independent: [
    mcq("Qual conector introduz o plano futuro?", ["앞으로는", "처음에는", "그런데"], "앞으로는", "앞으로는 marca o que se pretende fazer daqui para frente."),
    cloze("Complete o contraste: 처음에는 어려웠___ 지금은 자신감이 생겼어요.", "지만", "어려웠지만 contrasta o começo com o presente."),
    listen("Ouça e escreva o plano de Sujin para o próximo ano.", "내년에는 한국어로 짧은 글을 꾸준히 쓰고 싶어요.", "내년에는 한국어로 짧은 글을 꾸준히 쓰고 싶어요.", "No ano que vem, ela quer escrever textos curtos em coreano com constância.", ["내년에는 한국어로 짧은 글을 꾸준히 쓰고 싶어요"]),
    translate("ko-pt", "Traduza: 꾸준히 연습하면서 이야기를 끝까지 말할 수 있게 되었어요.", "Praticando com constância, passei a conseguir contar uma história até o fim.", "게 되었어요 registra a mudança alcançada pela prática.", ["Com prática constante, passei a conseguir contar uma história até o fim."]),
    reading("배움은 한 번에 끝나지 않아요. 어려운 순간에도 꾸준히 연습하면 어느새 할 수 있는 일이 늘어나요. 중요한 것은 완벽함이 아니라 계속 나아가는 방향이에요.", "Qual é a mensagem principal?", ["Continuar praticando importa mais que a perfeição.", "Só vale a pena estudar se o resultado for perfeito.", "O aprendizado termina quando o curso acaba."], "Continuar praticando importa mais que a perfeição.", "중요한 것은 완벽함이 아니라 계속 나아가는 방향이에요."),
  ],
  summary: ["O fechamento do percurso retoma narrativa, opinião e plano.", "Selecione estruturas pela função em vez de acumular formas.", "처음에는, 지금은 e 앞으로는 organizam a linha do tempo.", "A avaliação final deve reconhecer o avanço sem prometer perfeição."],
  production: {
    titlePt: "Produção independente · meu percurso", promptPt: "Escreva um texto sobre seu percurso de aprendizado: como começou, o que mudou, que dificuldade permanece e o que pretende fazer em seguida. Inclua uma opinião e um plano. Use de oito a dez frases.", promptKo: "지금까지의 학습 과정과 앞으로의 계획을 글로 써 보세요.",
    guidance: ["Comece com o ponto de partida.", "Mostre uma mudança concreta.", "Termine com uma opinião e um plano futuro."],
    checklist: ["Narrativa com começo e mudança.", "Uma opinião com justificativa.", "Plano futuro com prazo ou ação.", "Conectores de discurso variados."], minWords: 40,
  },
});
