import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l26 — mudança de reserva, custo e alternativa. */
export const B1_L26 = defineB1Lesson({
  id: "b1-l26", number: 26, moduleId: "b1-m06", title: "Reservas e mudanças",
  objective: "Negociar uma reserva, avaliar o custo da mudança e propor uma alternativa.",
  prerequisites: ["b1-c05"], estimatedMinutes: 65, dialogueTitle: "A taxa da mudança",
  intro: [
    { title: "-(으)ㄹ 만하다 — vale a pena", body: "A forma indica que algo merece o esforço ou o custo, sem soar como obrigação. Use com verbos de ação e mantenha o tom de avaliação pessoal.", ko: "이 호텔은 묵을 만해요." },
    { title: "-기에는 — para, considerando", body: "-기에는 avalia uma ação diante de uma circunstância concreta. Costuma vir seguido de um julgamento como 늦다, 비싸다 ou 이르다.", ko: "지금 취소하기에는 수수료가 너무 비싸요." },
  ],
  dialogue: [
    ["직원", "안녕하세요, 예약 변경 때문에 연락하셨죠?", "Olá, você entrou em contato por causa da alteração da reserva, certo?"],
    ["수진", "네. 이번 주 금요일 숙박을 하루 미루고 싶어요.", "Sim. Quero adiar a hospedagem de sexta-feira em um dia."],
    ["직원", "확인해 보니 다음 날은 대기 중이라 바로 확정하기 어렵습니다.", "Verifiquei e, para o dia seguinte, há uma lista de espera, então é difícil confirmar imediatamente."],
    ["수진", "그럼 다른 방으로 바꾸면 가능할까요?", "Então, se eu trocar para outro quarto, seria possível?"],
    ["직원", "가능하지만 변경 수수료가 발생합니다. 약관에 적혀 있어요.", "É possível, mas há uma taxa de alteração. Está escrito nos termos e condições."],
    ["수진", "수수료가 조금 비싸지만 예약을 잃는 것보다는 낫겠어요.", "A taxa é um pouco cara, mas é melhor do que perder a reserva."],
  ],
  reusedIds: ["ko:호텔", "ko:환불", "ko:여행", "ko:가격"],
  grammar: [
    ["-(으)ㄹ 만하다 — vale a pena", "동사 + -(으)ㄹ 만하다", "Use para dizer que uma ação compensa o esforço ou o custo. Não significa que a ação seja obrigatória; é uma avaliação do falante.", [["이 호텔은 묵을 만해요.", "Este hotel vale a pena para se hospedar."], ["가격이 조금 비싸지만 낼 만해요.", "O preço é um pouco caro, mas vale a pena pagar."]]],
    ["-기에는 — para, considerando", "동사 + -기에는", "-기에는 compara uma ação com uma circunstância que pesa na decisão. A segunda parte normalmente traz um julgamento negativo ou uma ressalva.", [["지금 취소하기에는 수수료가 너무 비싸요.", "Para cancelar agora, a taxa é cara demais."], ["주말에 가기에는 사람이 너무 많아요.", "Para ir no fim de semana, há gente demais."]]],
  ],
  guided: [
    mcq("O que a viajante quer fazer?", ["Adiar a hospedagem em um dia.", "Cancelar a viagem inteira.", "Trocar o quarto por um mais caro."], "Adiar a hospedagem em um dia.", "숙박을 하루 미루고 싶어요."),
    cloze("Complete a avaliação: 지금 취소하___ 수수료가 너무 비싸요.", "기에는", "취소하기에는 compara a ação de cancelar com o custo atual."),
    listen("Ouça e escreva o que a mudança provoca.", "변경 수수료가 발생합니다.", "변경 수수료가 발생합니다.", "A alteração gera uma taxa.", ["변경 수수료가 발생합니다"]),
    reading("여행 중에 숙박을 바꾸려면 약관을 먼저 확인해야 해요. 날짜가 임박하면 변경 수수료가 비싸고, 같은 방이 없으면 대기 명단에 올라가야 해요. 그래서 예약을 바꿀 때는 여유를 두는 게 좋아요.", "O que pode acontecer se não houver o mesmo quarto?", ["É preciso entrar na lista de espera.", "A reserva é confirmada automaticamente.", "A taxa desaparece."], "É preciso entrar na lista de espera.", "같은 방이 없으면 대기 명단에 올라가야 해요."),
    translate("pt-ko", "Traduza: “Quero adiar a hospedagem em um dia.”", "숙박을 하루 미루고 싶어요.", "숙박 é “hospedagem”; 미루다 significa “adiar”.", ["숙박을 하루 연기하고 싶어요."]),
  ],
  independent: [
    mcq("Qual frase significa que algo vale o custo?", ["수수료를 낼 만해요.", "수수료를 내기에는 비싸요.", "수수료가 임박했어요."], "수수료를 낼 만해요.", "낼 만해요 indica que compensa pagar."),
    cloze("Complete a ressalva: 주말에 가___ 사람이 너무 많아요.", "기에는", "가기에는 apresenta a circunstância que pesa na avaliação."),
    listen("Ouça e escreva a situação da reserva.", "예약이 아직 확정되지 않았어요.", "예약이 아직 확정되지 않았어요.", "A reserva ainda não foi confirmada.", ["예약이 아직 확정되지 않았어요"]),
    translate("ko-pt", "Traduza: 지금 취소하기에는 수수료가 너무 비싸요.", "Para cancelar agora, a taxa é cara demais.", "기에는 liga a ação ao julgamento sobre o custo.", ["Cancelar agora é caro demais por causa da taxa.", "A taxa é alta demais para cancelar agora."]),
    reading("호텔에 전화해서 예약을 바꿀 수는 있지만, 모든 변경이 무료는 아니에요. 날짜가 임박할수록 수수료가 올라가고, 환불 약관도 달라져요. 변경 전에 총비용을 확인하는 게 안전해요.", "Qual é o conselho?", ["Confirmar o custo total antes de mudar.", "Mudar sempre no dia da chegada.", "Nunca pedir alteração."], "Confirmar o custo total antes de mudar.", "변경 전에 총비용을 확인하는 게 안전해요."),
  ],
  summary: ["-(으)ㄹ 만하다 indica que algo vale o esforço ou o custo.", "-기에는 avalia uma ação diante de uma circunstância.", "Uma mudança de reserva envolve prazo, taxa e disponibilidade.", "Confirmar o total antes de aceitar evita surpresas."],
  production: {
    titlePt: "Produção independente · mudar uma reserva", promptPt: "Escreva um pedido de mudança de reserva para um hotel. Explique o que quer mudar, a condição e uma alternativa. Use de cinco a sete frases.", promptKo: "호텔에 예약 변경을 요청하는 글을 써 보세요.",
    guidance: ["Diga qual reserva quer alterar.", "Inclua uma condição de prazo ou custo.", "Proponha uma alternativa viável."],
    checklist: ["O pedido tem data e reserva identificadas.", "Usei -(으)ㄹ 만하다 ou -기에는 uma vez.", "Apresentei uma alternativa.", "Fechei com um pedido claro de confirmação."], minWords: 35,
  },
});

/** b1-l27 — imprevisto de viagem, causa e desfecho indesejado. */
export const B1_L27 = defineB1Lesson({
  id: "b1-l27", number: 27, moduleId: "b1-m06", title: "Quando algo dá errado",
  objective: "Relatar um imprevisto grave, encadear consequências e indicar a providência tomada.",
  prerequisites: ["b1-l26"], estimatedMinutes: 70, dialogueTitle: "A noite no aeroporto",
  intro: [
    { title: "-는 바람에 — por causa de", body: "A forma apresenta uma causa involuntária que produz um resultado negativo. O fato já aconteceu; não use para resultados positivos.", ko: "폭풍이 몰아치는 바람에 비행기가 연착됐어요." },
    { title: "-고 말다 — acabar fazendo", body: "-고 말다 mostra que algo indesejado acabou acontecendo, apesar da intenção do falante. O tom costuma ser de lamento.", ko: "숙소를 취소하고 말았어요." },
  ],
  dialogue: [
    ["지민", "공항에 도착했는데 왜 아직 출발하지 않아요?", "Chegamos ao aeroporto, mas por que ainda não saiu?"],
    ["수진", "폭풍이 몰아치는 바람에 비행기가 연착됐어요.", "Por causa da tempestade, o voo atrasou."],
    ["지민", "그럼 오늘 밤 호텔에 도착하기는 어렵겠네요.", "Então vai ser difícil chegar ao hotel hoje à noite."],
    ["수진", "네. 지연 때문에 예약한 숙소도 취소하고 말았어요.", "Sim. Por causa do atraso, acabei cancelando a hospedagem que eu tinha reservado."],
    ["지민", "항공사에서 대신 숙박을 제공해 주나요?", "A companhia aérea oferece hospedagem alternativa?"],
    ["수진", "아직 확정되지 않았어요. 직원이 대기 명단에 이름을 올려 줬어요.", "Ainda não foi confirmado. O funcionário colocou meu nome na lista de espera."],
  ],
  reusedIds: ["ko:공항", "ko:비행기", "ko:도착", "ko:수하물", "ko:시간"],
  grammar: [
    ["-는 바람에 — por causa de", "동사 + -는 바람에", "Liga uma causa involuntária a um resultado negativo já ocorrido. A causa não é uma escolha do falante, e a consequência costuma ser ruim.", [["폭풍이 몰아치는 바람에 비행기가 연착됐어요.", "Por causa da tempestade, o voo atrasou."], ["길이 막히는 바람에 공항에 늦었어요.", "Por causa do trânsito, cheguei atrasado ao aeroporto."]]],
    ["-고 말다 — acabar fazendo", "동사 + -고 말다", "Marca um desfecho indesejado que aconteceu apesar da intenção contrária. É comum em relatos de imprevisto e costuma trazer lamento.", [["숙소를 취소하고 말았어요.", "Acabei cancelando a hospedagem."], ["결국 비행기를 놓치고 말았어요.", "No fim, acabei perdendo o voo."]]],
  ],
  guided: [
    mcq("Por que o voo atrasou?", ["Por causa da tempestade.", "Por falta de combustível.", "Por um erro na reserva."], "Por causa da tempestade.", "폭풍이 몰아치는 바람에 비행기가 연착됐어요."),
    cloze("Complete a causa: 폭풍이 몰아치___ 비행기가 연착됐어요.", "는 바람에", "몰아치는 바람에 introduz a causa involuntária do atraso."),
    listen("Ouça e escreva o que aconteceu com a hospedagem.", "지연 때문에 예약한 숙소도 취소하고 말았어요.", "지연 때문에 예약한 숙소도 취소하고 말았어요.", "Por causa do atraso, ela acabou cancelando a hospedagem.", ["지연 때문에 예약한 숙소도 취소하고 말았어요"]),
    reading("수진은 공항에 일찍 도착했어요. 그런데 폭풍이 몰아치는 바람에 비행기가 연착됐어요. 기다리는 동안 호텔에 전화했지만, 늦게 도착하면 방이 취소된다고 했어요. 결국 그녀는 예약을 취소하고 말았어요.", "Por que a reserva foi cancelada?", ["Porque a chegada seria tarde demais.", "Porque o hotel estava cheio.", "Porque ela esqueceu o telefone."], "Porque a chegada seria tarde demais.", "늦게 도착하면 방이 취소된다고 했어요."),
    translate("pt-ko", "Traduza: “Por causa do atraso, acabei cancelando a hospedagem.”", "지연 때문에 숙소를 취소하고 말았어요.", "취소하고 말았어요 expressa o desfecho indesejado.", ["지연 때문에 예약한 숙소를 취소하고 말았어요."]),
  ],
  independent: [
    mcq("Qual frase mostra um resultado indesejado?", ["결국 숙소를 취소하고 말았어요.", "숙소를 미리 예약했어요.", "숙소가 아주 좋았어요."], "결국 숙소를 취소하고 말았어요.", "-고 말다 marca o desfecho que o falante não queria."),
    cloze("Complete o desfecho: 결국 비행기를 놓치___ 말았어요.", "고", "놓치고 말았어요 significa “acabei perdendo o voo”."),
    listen("Ouça e escreva a providência tomada.", "승객들은 안전하게 대피했어요.", "승객들은 안전하게 대피했어요.", "Os passageiros evacuaram em segurança.", ["승객들은 안전하게 대피했어요"]),
    translate("ko-pt", "Traduza: 폭풍이 몰아치는 바람에 비행기가 결항됐어요.", "Por causa da tempestade, o voo foi cancelado.", "결항 significa cancelamento de voo.", ["Devido à tempestade, o voo foi cancelado."]),
    reading("공항에서는 문제가 생겼을 때 안내 방송을 먼저 들어야 해요. 지연이나 결항이 확정되면 항공사에 숙박과 교통편을 요청할 수 있어요. 수하물을 찾는 데 시간이 오래 걸릴 때도 있으니 여유를 두세요. 영수증을 보관하면 나중에 배상을 받을 때 도움이 돼요.", "O que ajuda a receber compensação depois?", ["Guardar os recibos.", "Sair do aeroporto sem avisar.", "Comprar outra passagem imediatamente."], "Guardar os recibos.", "영수증을 보관하면 나중에 배상을 받을 때 도움이 돼요."),
  ],
  summary: ["-는 바람에 introduz uma causa involuntária com resultado negativo.", "-고 말다 marca um desfecho indesejado.", "Um relato de imprevisto liga causa, consequência e providência.", "Guardar comprovantes ajuda em pedidos posteriores."],
  production: {
    titlePt: "Produção independente · um imprevisto", promptPt: "Relate um imprevisto de viagem em seis frases: situação inicial, causa, consequência e providência. Explique também o que você aprendeu.", promptKo: "여행 중에 생긴 문제와 해결 과정을 이야기해 보세요.",
    guidance: ["Situe o lugar e o momento.", "Use -는 바람에 para a causa.", "Mostre uma consequência e a providência tomada."],
    checklist: ["A causa é involuntária e clara.", "Usei -고 말다 uma vez.", "A consequência decorre da causa.", "O relato termina com uma providência ou aprendizado."], minWords: 38,
  },
});

/** b1-l28 — reclamação formal, pedido e prazo. */
export const B1_L28 = defineB1Lesson({
  id: "b1-l28", number: 28, moduleId: "b1-m06", title: "Reclamações e soluções",
  objective: "Formalizar uma reclamação, pedir uma providência e negociar compensação com prazo.",
  prerequisites: ["b1-l27"], estimatedMinutes: 70, dialogueTitle: "O pedido de resposta oficial",
  intro: [
    { title: "-에 대한 — sobre, a respeito de", body: "-에 대한 transforma o substantivo anterior no tema de outro substantivo. Não confunda com -에 대해(서), que modifica um verbo.", ko: "지연에 대한 설명을 들었어요." },
    { title: "-도록 요청하다 — pedir que", body: "A estrutura formula um pedido formal para que alguém execute uma ação. É comum em reclamações, mensagens profissionais e atendimento ao cliente.", ko: "오늘 안으로 조치하도록 요청했습니다." },
  ],
  dialogue: [
    ["직원", "안녕하세요, 무슨 문제로 연락하셨어요?", "Olá, sobre qual problema você entrou em contato?"],
    ["수진", "지난주에 맡긴 짐이 아직 도착하지 않았어요. 배송 지연에 대한 설명을 듣고 싶어요.", "A bagagem que deixei na semana passada ainda não chegou. Quero ouvir uma explicação sobre o atraso na entrega."],
    ["직원", "죄송합니다. 확인해 보니 담당자가 기록을 놓쳤습니다.", "Desculpe. Verifiquei e o responsável deixou de registrar."],
    ["수진", "단순한 지연인지 분실인지에 대한 답변도 주세요.", "Peço também uma resposta sobre se é apenas um atraso ou uma perda."],
    ["직원", "오늘 안으로 조치하도록 요청하겠습니다. 배상도 검토하겠습니다.", "Vou pedir que tomem providências ainda hoje. Também vou avaliar uma indenização."],
    ["수진", "그럼 내일까지 공식 답변을 주시기 바랍니다.", "Então, por favor, enviem uma resposta oficial até amanhã."],
  ],
  reusedIds: ["ko:문제", "ko:해결", "ko:회사", "ko:전화"],
  grammar: [
    ["-에 대한 — sobre, a respeito de", "명사 + -에 대한 + 명사", "Liga um substantivo ao tema de outro substantivo: 설명, 답변, 요구, 조치. A forma não substitui uma oração completa.", [["지연에 대한 설명을 들었어요.", "Ouvi uma explicação sobre o atraso."], ["배상에 대한 답변을 기다려요.", "Aguardo uma resposta sobre a indenização."]]],
    ["-도록 요청하다 — pedir que", "동사 + -도록 요청하다", "Formula um pedido formal para que outra pessoa faça algo. O tom é adequado a reclamações e mensagens de trabalho.", [["오늘 안으로 조치하도록 요청했습니다.", "Pedi que tomassem providências ainda hoje."], ["공식 답변을 주도록 요청했어요.", "Pedi que enviassem uma resposta oficial."]]],
  ],
  guided: [
    mcq("Qual é o problema da cliente?", ["A bagagem não chegou.", "O quarto estava sujo.", "Ela perdeu o cartão."], "A bagagem não chegou.", "짐이 아직 도착하지 않았어요."),
    cloze("Complete o tema: 지연___ 대한 설명을 듣고 싶어요.", "에", "지연에 대한 설명 significa “explicação sobre o atraso”."),
    listen("Ouça e escreva o prazo do pedido.", "내일까지 공식 답변을 주시기 바랍니다.", "내일까지 공식 답변을 주시기 바랍니다.", "Pedem uma resposta oficial até amanhã.", ["내일까지 공식 답변을 주시기 바랍니다"]),
    reading("수진은 지난주에 맡긴 짐이 아직 도착하지 않아서 회사에 전화했어요. 그녀는 지연에 대한 설명과 분실 여부를 물었어요. 회사는 오늘 안으로 조치하겠다고 했지만, 그녀는 내일까지 공식 답변을 요청했어요.", "O que a cliente exige até amanhã?", ["Uma resposta oficial.", "Um desconto na próxima compra.", "A devolução do telefone."], "Uma resposta oficial.", "내일까지 공식 답변을 요청했어요."),
    translate("pt-ko", "Traduza: “Quero uma resposta sobre o atraso.”", "지연에 대한 답변을 주세요.", "답변을 주세요 é um pedido polido de resposta.", ["지연에 대한 답변을 받고 싶어요."]),
  ],
  independent: [
    mcq("Qual frase faz um pedido formal?", ["공식 답변을 주시도록 요청드립니다.", "답변 빨리 주세요.", "왜 답이 없어요?"], "공식 답변을 주시도록 요청드립니다.", "-도록 요청드립니다 marca um pedido formal."),
    cloze("Complete o pedido: 오늘 안으로 조치하___ 요청했습니다.", "도록", "조치하도록 요청했습니다 significa “pedi que tomassem providências”."),
    listen("Ouça e escreva o que a empresa vai avaliar.", "배상도 검토하겠습니다.", "배상도 검토하겠습니다.", "A empresa também vai avaliar uma indenização.", ["배상도 검토하겠습니다"]),
    translate("ko-pt", "Traduza: 지연에 대한 설명을 듣고 싶어요.", "Quero ouvir uma explicação sobre o atraso.", "에 대한 liga explicação e atraso.", ["Gostaria de ouvir uma explicação sobre o atraso."]),
    reading("민원을 남길 때는 감정보다 사실을 먼저 적는 게 좋아요. 무엇이 문제였는지, 어떤 조치를 원하는지, 언제까지 답을 받고 싶은지를 차례로 쓰면 담당자가 이해하기 쉬워요. 해결 방법이 분명하면 회사도 더 빨리 움직일 수 있어요.", "Qual é a recomendação?", ["Escrever fato, pedido e prazo.", "Escrever apenas reclamações emocionais.", "Não informar prazo."], "Escrever fato, pedido e prazo.", "무엇이 문제였는지, 어떤 조치를 원하는지, 언제까지 답을 받고 싶은지를 써요."),
  ],
  summary: ["-에 대한 liga um substantivo ao seu tema.", "-도록 요청하다 formula pedidos formais.", "Uma reclamação eficaz tem fato, pedido e prazo.", "Pedir compensação exige clareza e comprovantes."],
  production: {
    titlePt: "Produção independente · reclamação formal", promptPt: "Escreva uma reclamação formal sobre um serviço. Descreva o fato, peça uma providência e defina um prazo para a resposta. Use de cinco a sete frases.", promptKo: "서비스 문제에 대한 공식 민원을 작성해 보세요.",
    guidance: ["Comece pelo fato, sem exageros.", "Use -에 대한 para nomear o tema.", "Peça uma ação concreta com prazo."],
    checklist: ["O fato está datado e claro.", "O pedido usa -도록 요청하다.", "Há um prazo para a resposta.", "O fechamento é formal e respeitoso."], minWords: 38,
  },
});

/** b1-l29 — comparação de destinos e recomendação com critério. */
export const B1_L29 = defineB1Lesson({
  id: "b1-l29", number: 29, moduleId: "b1-m06", title: "Recomendações e comparações",
  objective: "Comparar destinos com critérios explícitos, reconhecer limites e recomendar uma opção.",
  prerequisites: ["b1-l28"], estimatedMinutes: 65, dialogueTitle: "Dois destinos, um orçamento",
  intro: [
    { title: "-에 비해 — em comparação com", body: "-에 비해 compara dois elementos e avalia o primeiro em relação ao segundo. Não significa automaticamente que um seja melhor; apenas estabelece a base da comparação.", ko: "제주는 경주에 비해 비행기 값이 비싸요." },
    { title: "-만큼 — tanto quanto", body: "-만큼 iguala quantidade ou grau. Com negação, indica que algo não alcança o mesmo nível do elemento comparado.", ko: "경주만큼 조용하지는 않아요." },
  ],
  dialogue: [
    ["마르코", "이번 휴가에 어디가 좋을까요?", "Para estas férias, qual lugar seria bom?"],
    ["수진", "저는 바다 쪽을 선호해요. 제주는 경주에 비해 비행기 값이 비싸요.", "Eu prefiro o litoral. Jeju é mais cara que Gyeongju na passagem de avião."],
    ["마르코", "그래도 제주는 바다가 정말 좋아요. 경주만큼 조용하지는 않지만 볼거리가 많아요.", "Mesmo assim, o mar de Jeju é realmente bom. Não é tão tranquila quanto Gyeongju, mas tem muita coisa para ver."],
    ["수진", "숙소 평점은 어때요? 리뷰에서 가성비가 좋다고 봤어요.", "Como são as notas das hospedagens? Vi nas avaliações que o custo-benefício é bom."],
    ["마르코", "제주 숙소는 경주만큼 싸지는 않아요. 대신 접근성과 편의 시설이 좋아요.", "As hospedagens em Jeju não são tão baratas quanto as de Gyeongju. Em compensação, o acesso e as instalações são bons."],
    ["수진", "그럼 예산에 맞춰 경주를 추천하고, 제주는 다음에 가는 게 좋겠어요.", "Então, dentro do orçamento, recomendo Gyeongju, e Jeju fica para a próxima."],
  ],
  reusedIds: ["ko:여행", "ko:가격", "ko:추천", "ko:좋다"],
  grammar: [
    ["-에 비해 — em comparação com", "명사 + -에 비해", "Estabelece o segundo elemento como base de comparação. A frase seguinte mostra em que aspecto o primeiro se diferencia.", [["제주는 경주에 비해 비행기 값이 비싸요.", "Jeju é mais cara que Gyeongju na passagem de avião."], ["이 호텔은 지난달에 비해 조용해요.", "Este hotel está mais tranquilo em comparação ao mês passado."]]],
    ["-만큼 — tanto quanto", "명사 + -만큼", "Iguala quantidade ou grau. Na forma negativa, indica que o primeiro elemento não chega ao nível do segundo.", [["경주만큼 조용하지는 않아요.", "Não é tão tranquila quanto Gyeongju."], ["생각만큼 비싸지 않아요.", "Não é tão caro quanto eu pensava."]]],
  ],
  guided: [
    mcq("Qual destino tem a passagem mais cara?", ["Jeju.", "Gyeongju.", "Os dois custam o mesmo."], "Jeju.", "제주는 경주에 비해 비행기 값이 비싸요."),
    cloze("Complete a comparação: 제주는 경주___ 비해 비행기 값이 비싸요.", "에", "경주에 비해 significa “em comparação com Gyeongju”."),
    listen("Ouça e escreva a vantagem de Jeju.", "대신 접근성과 편의 시설이 좋아요.", "대신 접근성과 편의 시설이 좋아요.", "Em compensação, o acesso e as instalações são bons.", ["대신 접근성과 편의 시설이 좋아요"]),
    reading("제주는 경주에 비해 비행기 값이 비싸지만 바다가 아름다워요. 경주는 제주만큼 화려하지는 않지만 조용하고 가성비가 좋아요. 두 곳 모두 장단점이 있어서 예산과 취향을 함께 생각해야 해요.", "Qual é a conclusão do texto?", ["É preciso considerar orçamento e preferência.", "Jeju é sempre melhor.", "Gyeongju não tem vantagens."], "É preciso considerar orçamento e preferência.", "예산과 취향을 함께 생각해야 해요."),
    translate("pt-ko", "Traduza: “Jeju é mais cara que Gyeongju.”", "제주는 경주에 비해 비싸요.", "에 비해 marca a base da comparação.", ["제주가 경주에 비해 비싸요."]),
  ],
  independent: [
    mcq("Qual frase compara dois lugares corretamente?", ["제주 숙소는 경주만큼 싸지는 않아요.", "제주 숙소는 경주만큼 비싸요?", "제주 숙소는 경주에 비해 만해요."], "제주 숙소는 경주만큼 싸지는 않아요.", "만큼 + negação indica que não alcança o mesmo nível."),
    cloze("Complete a comparação: 제주 숙소는 경주만큼 싸___ 않아요.", "지", "싸지 않아요 completa a negação com 만큼."),
    listen("Ouça e escreva o que foi comparado.", "숙소 평점과 가성비를 비교했어요.", "숙소 평점과 가성비를 비교했어요.", "Comparei a nota da hospedagem e o custo-benefício.", ["숙소 평점과 가성비를 비교했어요"]),
    translate("ko-pt", "Traduza: 가성비가 좋은 숙소를 찾았어요.", "Encontrei uma hospedagem com bom custo-benefício.", "가성비 é “custo-benefício”.", ["Achei uma hospedagem com bom custo-benefício."]),
    reading("여행지를 고를 때는 가격만 보면 안 돼요. 이동 시간, 숙소의 접근성, 주변 편의 시설도 함께 비교해야 해요. 어떤 곳은 가격이 조금 비싸도 시간을 아껴 주기 때문에 더 나은 선택이 될 수 있어요.", "O que o texto recomenda comparar?", ["Preço, deslocamento e acesso.", "Apenas o preço.", "Somente a avaliação dos amigos."], "Preço, deslocamento e acesso.", "가격, 이동 시간, 접근성, 편의 시설을 비교해야 해요."),
  ],
  summary: ["-에 비해 coloca dois elementos em comparação.", "-만큼 iguala grau ou quantidade.", "Uma recomendação precisa de critério e ressalva.", "Preço baixo não basta para escolher um destino."],
  production: {
    titlePt: "Produção independente · recomendar um destino", promptPt: "Compare dois destinos para uma viagem curta e recomende um deles. Use um critério claro, uma vantagem e uma limitação. Escreva de cinco a seis frases.", promptKo: "두 여행지를 비교하고 하나를 추천해 보세요.",
    guidance: ["Escolha dois critérios concretos.", "Use -에 비해 e -만큼.", "Reconheça uma limitação antes de recomendar."],
    checklist: ["Dois destinos identificados.", "Comparação com critério explícito.", "Uma vantagem e uma limitação.", "Recomendação final coerente."], minWords: 35,
  },
});

/** b1-l30 — relato de viagem com impressão e aprendizado. */
export const B1_L30 = defineB1Lesson({
  id: "b1-l30", number: 30, moduleId: "b1-m06", title: "Relato de viagem",
  objective: "Relatar uma viagem com impressões, dificuldades e um aprendizado pessoal.",
  prerequisites: ["b1-l29"], estimatedMinutes: 75, dialogueTitle: "O que ficou da viagem",
  intro: [
    { title: "-더라고요 revisitado — impressão vivida", body: "A forma retoma uma descoberta ou impressão que o falante viveu. Em relatos de viagem, aproxima o ouvinte da cena e mostra a perspectiva de quem esteve lá.", ko: "골목이 낯익더라고요." },
    { title: "-다는 생각이 들다 — ter a impressão de que", body: "A estrutura introduz uma reflexão ou conclusão que surgiu na mente do falante. É útil para fechar um relato com o que a experiência ensinou.", ko: "다시 와야겠다는 생각이 들었어요." },
  ],
  dialogue: [
    ["지민", "제주 여행은 어땠어요?", "Como foi a viagem a Jeju?"],
    ["수진", "첫날은 설렘이 컸는데 둘째 날은 비가 와서 많이 걸을 수 없었어요.", "No primeiro dia a empolgação foi grande, mas no segundo choveu e não pude caminhar muito."],
    ["지민", "그래도 좋은 장면이 있었죠?", "Mas houve alguma cena boa, certo?"],
    ["수진", "바다 마을에 갔는데 골목이 낯익더라고요. 예전에 본 사진이 떠올랐어요.", "Fui a um vilarejo à beira-mar e a ruela me pareceu familiar. Lembrei de uma foto que tinha visto antes."],
    ["지민", "힘든 부분도 있었어요?", "Também houve uma parte difícil?"],
    ["수진", "네. 일정이 너무 빡빡해서 아쉬움이 남았어요. 그래도 다음에는 더 천천히 와야겠다는 생각이 들었어요.", "Sim. O itinerário estava apertado demais, então ficou uma sensação de que faltou algo. Mesmo assim, tive a impressão de que devo voltar com mais calma na próxima vez."],
  ],
  reusedIds: ["ko:여행", "ko:사진", "ko:추억", "ko:좋다"],
  grammar: [
    ["-더라고요 revisitado — impressão vivida", "동사/형용사 + -더라고요", "Retoma a forma para relatar uma descoberta ou impressão de experiência própria. No relato de viagem, dá concretude ao momento vivido.", [["골목이 낯익더라고요.", "A ruela me pareceu familiar."], ["바다가 생각보다 넓더라고요.", "O mar era mais amplo do que eu pensava."]]],
    ["-다는 생각이 들다 — ter a impressão de que", "동사/형용사 + -다는 생각이 들다", "Introduz uma reflexão que surgiu a partir da experiência. Costuma aparecer no fechamento de um relato, com um aprendizado ou uma intenção futura.", [["더 천천히 와야겠다는 생각이 들었어요.", "Tive a impressão de que devo voltar com mais calma."], ["여행이 짧다는 생각이 들었어요.", "Tive a impressão de que a viagem foi curta."]]],
  ],
  guided: [
    mcq("O que atrapalhou o segundo dia?", ["A chuva.", "O preço do hotel.", "A falta de passagem."], "A chuva.", "둘째 날은 비가 와서 많이 걸을 수 없었어요."),
    cloze("Complete a reflexão: 다음에는 더 천천히 와야겠___ 생각이 들었어요.", "다는", "와야겠다는 생각이 들었어요 introduz a reflexão final."),
    listen("Ouça e escreva a impressão sobre a ruela.", "골목이 낯익더라고요.", "골목이 낯익더라고요.", "A ruela me pareceu familiar.", ["골목이 낯익더라고요"]),
    reading("수진은 제주에서 사흘을 보냈어요. 첫날은 설렘이 컸지만 둘째 날에는 비가 많이 왔어요. 그래도 바다 마을의 골목이 낯익어서 예전 사진이 떠올랐어요. 일정이 빡빡해서 아쉬움이 남았지만, 다음에는 더 천천히 오고 싶다는 생각이 들었어요.", "O que ela aprendeu com a viagem?", ["Que deve viajar com mais calma na próxima vez.", "Que nunca deve voltar a Jeju.", "Que a chuva estragou tudo."], "Que deve viajar com mais calma na próxima vez.", "다음에는 더 천천히 오고 싶다는 생각이 들었어요."),
    translate("pt-ko", "Traduza: “Achei que deveria voltar.”", "다시 와야겠다는 생각이 들었어요.", "와야겠다는 생각이 들었어요 expressa a reflexão sobre voltar.", ["다시 와야 한다는 생각이 들었어요."]),
  ],
  independent: [
    mcq("Qual frase expressa uma impressão pessoal?", ["바다가 정말 넓더라고요.", "바다는 넓어요.", "바다에 갈 거예요."], "바다가 정말 넓더라고요.", "-더라고요 apresenta a impressão vivida pelo falante."),
    cloze("Complete o fechamento: 여행이 짧___ 생각이 들었어요.", "다는", "짧다는 생각이 들었어요 significa “achei que a viagem foi curta”."),
    listen("Ouça e escreva a avaliação final da viagem.", "좋은 여행이었지만 아쉬움도 남았어요.", "좋은 여행이었지만 아쉬움도 남았어요.", "Foi uma boa viagem, mas também ficou uma sensação de que faltou algo.", ["좋은 여행이었지만 아쉬움도 남았어요"]),
    translate("ko-pt", "Traduza: 그 골목이 낯익더라고요.", "Aquela ruela me pareceu familiar.", "낯익다 significa “parecer familiar”.", ["Aquele beco me pareceu familiar."]),
    reading("여행을 마치고 나면 좋았던 일만 기억나기 쉬워요. 하지만 힘들었던 순간까지 적어 두면 다음 여행을 더 잘 준비할 수 있어요. 사진과 짧은 메모를 함께 남기면 나중에 추억이 더 생생해져요.", "Qual é a sugestão do texto?", ["Registrar também os momentos difíceis.", "Apagar as fotos ruins.", "Viajar sempre sem plano."], "Registrar também os momentos difíceis.", "힘들었던 순간까지 적어 두면 다음 여행을 더 잘 준비할 수 있어요."),
  ],
  summary: ["-더라고요 retoma impressões vividas no relato.", "-다는 생각이 들다 introduz uma reflexão.", "Um relato de viagem equilibra impressão, dificuldade e aprendizado.", "Registrar detalhes mantém a memória viva."],
  production: {
    titlePt: "Produção independente · relato de viagem", promptPt: "Escreva um relato de uma viagem difícil em sete frases. Inclua uma impressão, uma dificuldade, uma avaliação e o que você aprendeu.", promptKo: "힘들었던 여행을 돌아보는 글을 써 보세요.",
    guidance: ["Situe o destino e a duração.", "Use -더라고요 para uma impressão.", "Feche com -다는 생각이 들다."],
    checklist: ["O relato tem começo, dificuldade e avaliação.", "Usei uma impressão com -더라고요.", "A reflexão final é coerente com o relato.", "Há detalhes concretos, não só adjetivos."], minWords: 40,
  },
});
