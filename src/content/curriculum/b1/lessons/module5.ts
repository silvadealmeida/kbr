import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l21 — tendências sociais com evidência e ressalva. */
export const B1_L21 = defineB1Lesson({
  id: "b1-l21", number: 21, moduleId: "b1-m05", title: "Mudanças sociais",
  objective: "Descrever uma tendência social com evidência, comparação entre gerações e uma ressalva.",
  prerequisites: ["b1-c04"], estimatedMinutes: 65, dialogueTitle: "Onde as pessoas estão morando",
  intro: [
    { title: "-는 경향이 있다 — tendência", body: "Use -는 경향이 있다 para falar de um padrão observável, não de uma lei. Com verbos, a forma é -는 경향이 있다; com adjetivos, -(으)ㄴ 경향이 있다. A tendência pode ter exceções.", ko: "젊은 사람들은 도시에 사는 경향이 있어요." },
    { title: "-에 따라 — conforme", body: "A forma indica que algo varia conforme um critério: geração, região, época ou dado. Não confunda com causa direta; aqui o foco é a variação.", ko: "세대에 따라 생각이 달라요." },
  ],
  dialogue: [
    ["지민", "요즘 우리 동네에 혼자 사는 사람이 많이 늘었어요.", "Ultimamente, o número de pessoas que moram sozinhas no meu bairro aumentou muito."],
    ["수진", "맞아요. 젊은 사람들은 도시에 사는 경향이 있어요.", "É verdade. As pessoas jovens tendem a morar na cidade."],
    ["지민", "그런데 세대에 따라 이유가 다른 것 같아요.", "Mas parece que o motivo é diferente conforme a geração."],
    ["수진", "맞아요. 젊은 세대는 일자리 때문에 오고, 나이 든 세대는 병원이 가까운 곳을 찾아요.", "Isso. A geração jovem vem por causa do trabalho, e a geração mais velha procura lugares perto de hospitais."],
    ["지민", "자료를 보면 혼자 사는 가구가 계속 늘고 있어요.", "Se olharmos os dados, o número de domicílios unipessoais continua aumentando."],
    ["수진", "숫자만 보면 그렇게 말할 수 있지만, 모든 사람이 같은 이유로 사는 건 아니에요.", "Se olharmos só os números, podemos dizer isso, mas não é todo mundo que mora sozinho pelo mesmo motivo."],
  ],
  reusedIds: ["ko:사람", "ko:많이", "ko:나이", "ko:병원"],
  grammar: [
    ["-는 경향이 있다 — tendência observável", "동사 + -는 경향이 있다 / 형용사 + -(으)ㄴ 경향이 있다", "A forma apresenta um padrão que se repete, não uma regra absoluta. Por isso combina com ressalvas como 모든 사람이 그런 것은 아니다.", [["혼자 사는 가구가 늘어나는 경향이 있어요.", "O número de domicílios unipessoais tende a aumentar."], ["요즘은 결혼을 늦게 하는 경향이 있어요.", "Hoje em dia, as pessoas tendem a se casar mais tarde."]]],
    ["-에 따라 — conforme, dependendo de", "명사 + -에 따라", "Marca o critério que produz variação. Pode aparecer em descrições de dados e comparações entre grupos, sem afirmar que o critério é a única causa.", [["세대에 따라 생활 방식이 달라요.", "O modo de vida varia conforme a geração."], ["자료에 따라 결과가 다를 수 있어요.", "O resultado pode variar conforme os dados."]]],
  ],
  guided: [
    mcq("O que Jimin observa no bairro?", ["Mais pessoas morando sozinhas.", "Menos hospitais na região.", "Mais famílias saindo da cidade."], "Mais pessoas morando sozinhas.", "혼자 사는 사람이 많이 늘었어요."),
    cloze("Complete a tendência: 젊은 사람들은 도시에 사___ 경향이 있어요.", "는", "사는 경향이 있어요 descreve um padrão observável."),
    listen("Ouça e escreva o que varia conforme a geração.", "세대에 따라 이유가 다른 것 같아요.", "세대에 따라 이유가 다른 것 같아요.", "O motivo parece variar conforme a geração.", ["세대에 따라 이유가 다른 것 같아요"]),
    reading("혼자 사는 가구가 늘고 있어요. 하지만 모든 사람이 같은 이유로 사는 것은 아니에요.", "Qual ressalva o texto apresenta?", ["Nem todos moram sozinhos pelo mesmo motivo.", "Ninguém mora sozinho na cidade.", "Os dados estão completamente errados."], "Nem todos moram sozinhos pelo mesmo motivo.", "모든 사람이 같은 이유로 사는 건 아니에요."),
    translate("pt-ko", "Traduza: “As pessoas jovens tendem a morar na cidade.”", "젊은 사람들은 도시에 사는 경향이 있어요.", "사는 경향이 있어요 expressa a tendência.", ["젊은 세대는 도시에 사는 경향이 있어요."]),
  ],
  independent: [
    mcq("Qual frase expressa uma tendência, não uma regra absoluta?", ["혼자 사는 가구가 늘어나는 경향이 있어요.", "모든 사람이 혼자 살아요.", "내일 혼자 살 거예요."], "혼자 사는 가구가 늘어나는 경향이 있어요.", "경향이 있어요 indica padrão, não lei."),
    cloze("Complete: 세대___ 따라 생활 방식이 달라요.", "에", "세대에 따라 significa “conforme a geração”."),
    listen("Ouça e escreva a ressalva sobre os dados.", "자료에 따라 결과가 다를 수 있어요.", "자료에 따라 결과가 다를 수 있어요.", "O resultado pode variar conforme os dados.", ["자료에 따라 결과가 다를 수 있어요"]),
    translate("ko-pt", "Traduza: 혼자 사는 가구가 계속 늘고 있어요.", "O número de domicílios unipessoais continua aumentando.", "계속 늘고 있어요 indica aumento contínuo.", ["As famílias que moram sozinhas continuam aumentando."]),
    reading("도시의 집값이 오르면서 젊은 사람들이 다른 지역으로 이동하는 경향이 있어요. 하지만 이 변화가 모든 도시에서 같은 속도로 일어나는 것은 아니에요.", "O que o texto destaca?", ["A mudança varia conforme a cidade.", "Todas as cidades mudam na mesma velocidade.", "Os jovens deixaram de se mudar."], "A mudança varia conforme a cidade.", "모든 도시에서 같은 속도로 일어나는 것은 아니에요."),
  ],
  summary: ["-는 경향이 있다 descreve um padrão observável, com exceções.", "-에 따라 marca o critério de variação.", "Dados e evidências sustentam a descrição da tendência.", "Uma ressalva evita transformar tendência em regra absoluta."],
  production: {
    titlePt: "Produção independente · uma tendência social", promptPt: "Descreva uma mudança que você observa na sua cidade ou no seu bairro. Apresente uma tendência, uma evidência e uma ressalva em cinco a sete frases.", promptKo: "여러분이 사는 곳에서 눈에 띄는 변화를 설명해 보세요.",
    guidance: ["Diga onde e entre quem a mudança aparece.", "Use -는 경향이 있다 uma vez.", "Inclua uma evidência e uma ressalva."],
    checklist: ["Tendência descrita com clareza.", "Uma evidência ou dado mencionado.", "Ressalva presente.", "Conclusão sem generalização absoluta."], minWords: 35,
  },
});

/** b1-l22 — comparação cultural sem estereótipos. */
export const B1_L22 = defineB1Lesson({
  id: "b1-l22", number: 22, moduleId: "b1-m05", title: "Cultura e gerações",
  objective: "Comparar práticas culturais entre gerações, reconhecendo variações e evitando generalizações absolutas.",
  prerequisites: ["b1-l21"], estimatedMinutes: 65, dialogueTitle: "À mesa com duas gerações",
  intro: [
    { title: "-라고들 하다 — dizem que", body: "A forma relata o que as pessoas costumam dizer, sem apresentar isso como fato comprovado. Com substantivos, use -(이)라고들 하다; com verbos e adjetivos, -다고들 하다. O plural -들 reforça a ideia de “as pessoas em geral”.", ko: "명절에는 가족이 함께 모인다고들 해요." },
    { title: "-기는 하지만 — embora, ainda que", body: "A forma reconhece uma parte da afirmação e logo apresenta uma objeção. É útil para comparar práticas culturais sem parecer que se está negando tudo.", ko: "맛있기는 하지만 조금 매워요." },
  ],
  dialogue: [
    ["지민", "할머니, 요즘은 명절에 다 같이 모이기 어려운 것 같아요.", "Vovó, hoje em dia parece difícil nos reunirmos todos no feriado tradicional."],
    ["할머니", "그렇지. 그래도 명절에는 가족이 함께 밥을 먹어야 한다고들 해요.", "É verdade. Mesmo assim, dizem que no feriado a família deve comer junta."],
    ["지민", "저도 가족과 시간을 보내는 건 좋아요. 좋기는 하지만 모든 집이 같은 방식은 아닌 것 같아요.", "Eu também gosto de passar tempo com a família. Gosto, mas acho que não é todo lar que faz do mesmo jeito."],
    ["할머니", "물론이지. 우리 때는 온 가족이 한 집에 모였지만 지금은 사정이 다르니까.", "Claro. Na minha época a família inteira se reunia numa só casa, mas hoje as circunstâncias são diferentes."],
    ["지민", "맞아요. 친구들 중에는 여행을 가거나 조용히 쉬는 사람도 있어요.", "Exato. Entre meus amigos, tem gente que viaja ou descansa em silêncio."],
    ["할머니", "그래도 서로의 방식을 이해하면 좋겠구나. 한 가지 방식만 옳다고 말하면 안 되지.", "Mesmo assim, seria bom que entendessem o jeito um do outro. Não se deve dizer que só um jeito está certo."],
  ],
  reusedIds: ["ko:가족", "ko:사람", "ko:이해하다", "ko:밥"],
  grammar: [
    ["-라고들 하다 — o que as pessoas dizem", "명사 + -(이)라고들 하다 / 동사·형용사 + -다고들 하다", "Use para relatar uma opinião geral ou um costume que circula, sem assumir que todos concordam. O -들 não significa que cada pessoa foi ouvida individualmente.", [["이 음식은 지역의 전통 음식이라고들 해요.", "Dizem que este é um alimento tradicional da região."], ["명절에는 가족이 함께 모인다고들 해요.", "Dizem que a família se reúne no feriado tradicional."]]],
    ["-기는 하지만 — concessão", "동사/형용사 + -기는 하지만", "A forma admite o ponto anterior e acrescenta uma limitação. É mais suave que uma negação direta e ajuda a evitar generalizações.", [["맛있기는 하지만 조금 매워요.", "É gostoso, mas é um pouco picante."], ["이해하기는 하지만 모든 집이 같은 방식은 아니에요.", "Eu entendo, mas não é todo lar que faz do mesmo jeito."]]],
  ],
  guided: [
    mcq("O que a avó diz que as pessoas costumam afirmar sobre o feriado?", ["Que a família deve comer junta.", "Que ninguém deve viajar.", "Que a comida tradicional é ruim."], "Que a família deve comer junta.", "가족이 함께 밥을 먹어야 한다고들 해요."),
    cloze("Complete a opinião geral: 명절에는 가족이 모인___들 해요.", "다고", "모인다고들 해요 relata o que as pessoas dizem."),
    listen("Ouça e escreva a concessão de Jimin.", "좋기는 하지만 모든 집이 같은 방식은 아니에요.", "좋기는 하지만 모든 집이 같은 방식은 아니에요.", "Ela gosta, mas reconhece que nem todo lar faz igual.", ["좋기는 하지만 모든 집이 같은 방식은 아니에요"]),
    reading("할머니는 명절에 가족이 모이는 것을 중요하게 생각해요. 지민도 가족과의 시간을 좋아해요. 하지만 두 사람은 모든 집이 같은 방식으로 명절을 보내야 한다고 생각하지 않아요.", "O que as duas reconhecem?", ["Que existem formas diferentes de celebrar.", "Que só a tradição da avó é correta.", "Que ninguém gosta do feriado."], "Que existem formas diferentes de celebrar.", "모든 집이 같은 방식으로 보내야 한다고 생각하지 않아요."),
    translate("pt-ko", "Traduza: “Dizem que este é um alimento tradicional da região.”", "이 음식은 지역의 전통 음식이라고들 해요.", "이라고들 해요 relata o que se costuma dizer.", ["이 음식은 지역 전통 음식이라고들 해요."]),
  ],
  independent: [
    mcq("Qual frase evita uma generalização absoluta?", ["모든 집이 같은 방식으로 명절을 보내요.", "집마다 방식이 다를 수 있어요.", "아무도 명절을 지키지 않아요."], "집마다 방식이 다를 수 있어요.", "다를 수 있어요 deixa espaço para variação."),
    cloze("Complete a concessão: 맛있___ 하지만 조금 매워요.", "기는", "맛있기는 하지만 introduce a objeção."),
    listen("Ouça e escreva a frase que evita generalizar.", "모든 집이 같은 방식은 아니에요.", "모든 집이 같은 방식은 아니에요.", "Não é todo lar que faz do mesmo jeito.", ["모든 집이 같은 방식은 아니에요"]),
    translate("ko-pt", "Traduza: 이 음식은 지역의 전통 음식이라고들 해요.", "Dizem que este é um alimento tradicional da região.", "이라고들 해요 indica uma opinião difundida, não um fato verificado.", ["Dizem que esta comida é um prato tradicional da região."]),
    reading("같은 문화 안에서도 세대에 따라 생활 방식이 달라요. 어떤 사람은 전통을 중요하게 생각하고, 어떤 사람은 새로운 방식을 선택해요. 어느 한쪽이 항상 옳다고 말하기는 어려워요.", "Qual é a ideia central?", ["Há variações dentro da mesma cultura.", "Todos escolhem o mesmo caminho.", "A tradição desapareceu completamente."], "Há variações dentro da mesma cultura.", "세대에 따라 생활 방식이 달라요."),
  ],
  summary: ["-라고들 하다 relata uma opinião difundida, não um fato provado.", "-기는 하지만 reconhece um ponto e apresenta uma limitação.", "Práticas culturais variam dentro do mesmo grupo.", "Evite “todos” e “sempre” ao comparar gerações."],
  production: {
    titlePt: "Produção independente · uma comparação cultural", promptPt: "Compare uma prática cultural ou familiar entre duas gerações. Mostre uma semelhança, uma diferença e uma variação que impede generalizações. Escreva de cinco a sete frases.", promptKo: "두 세대의 생활 방식이나 관습을 비교해 보세요.",
    guidance: ["Escolha uma prática concreta, como uma refeição ou um feriado.", "Use -기는 하지만 uma vez.", "Reconheça uma exceção dentro do grupo."],
    checklist: ["Prática cultural descrita.", "Semelhança ou diferença explícita.", "Uma variação ou exceção.", "Nenhuma generalização absoluta."], minWords: 35,
  },
});

/** b1-l23 — limites e expectativas nas relações. */
export const B1_L23 = defineB1Lesson({
  id: "b1-l23", number: 23, moduleId: "b1-m05", title: "Relações e limites",
  objective: "Expressar expectativas e limites em uma relação, pedindo mudanças com respeito e propondo um acordo.",
  prerequisites: ["b1-l22"], estimatedMinutes: 65, dialogueTitle: "Precisamos conversar sobre isso",
  intro: [
    { title: "-도록 — para que, de modo que", body: "Use -도록 para indicar um objetivo ou um resultado pretendido. Em pedidos, suaviza a intenção: “faça de modo que…”. A forma também aparece em expressões de esforço, como -도록 노력하다.", ko: "서로 이해할 수 있도록 천천히 말해 주세요." },
    { title: "-는 데 — no ato de, para", body: "A forma nominaliza uma ação e indica o âmbito em que algo acontece, custa ou exige esforço. Com verbos de ação, use -는 데; o sujeito da ação normalmente vem antes.", ko: "관계를 유지하는 데 시간이 필요해요." },
  ],
  dialogue: [
    ["수진", "지민아, 요즘 연락이 늦어서 조금 서운했어.", "Jimin, ultimamente você demora a responder e eu fiquei um pouco magoada."],
    ["지민", "미안해. 일이 바빠서 답장을 자주 못 했어.", "Desculpa. Andei ocupado com o trabalho e não consegui responder com frequência."],
    ["수진", "이해해. 그래도 약속을 바꿀 때는 미리 알려 줬으면 좋겠어.", "Eu entendo. Mesmo assim, quando mudar um combinado, gostaria que me avisasse antes."],
    ["지민", "알겠어. 다음부터는 늦어도 하루 전에는 말할 수 있도록 할게.", "Entendi. Da próxima vez, vou avisar com pelo menos um dia de antecedência."],
    ["수진", "고마워. 내가 너무 심하게 말했으면 미안해.", "Obrigada. Desculpa se falei de forma dura demais."],
    ["지민", "아니야. 서로 불편한 점을 말하는 데 시간이 걸려도, 말하는 게 낫지.", "Não é isso. Mesmo que leve tempo para falarmos do que nos incomoda, é melhor falar."],
  ],
  reusedIds: ["ko:시간", "ko:이해하다", "ko:말하다", "ko:약속"],
  grammar: [
    ["-도록 — objetivo ou modo", "동사 + -도록", "Indica a finalidade ou o resultado que se quer alcançar. Pode aparecer com pedidos e com 노력하다. Não é uma ordem direta; o tom depende do verbo final.", [["친구가 쉴 수 있도록 조용히 했어요.", "Fiquei em silêncio para que meu amigo pudesse descansar."], ["오해가 없도록 먼저 이야기했어요.", "Conversei antes para que não houvesse mal-entendido."]]],
    ["-는 데 — âmbito da ação", "동사 + -는 데", "Transforma o verbo em uma expressão nominal e indica em que âmbito algo é necessário, difícil ou demorado. Não confunda com -는데, que tem função de contraste ou contexto.", [["관계를 유지하는 데 시간이 필요해요.", "É preciso tempo para manter uma relação."], ["이야기하는 데 오래 걸렸어요.", "Levou muito tempo para conversar."]]],
  ],
  guided: [
    mcq("O que Sujin pede a Jimin?", ["Que avise antes quando mudar um combinado.", "Que pare de trabalhar.", "Que responda imediatamente todas as mensagens."], "Que avise antes quando mudar um combinado.", "약속을 바꿀 때는 미리 알려 줬으면 좋겠어."),
    cloze("Complete o pedido: 서로 이해할 수 있___ 천천히 말해 주세요.", "도록", "이해할 수 있도록 indica o objetivo do pedido."),
    listen("Ouça e escreva o pedido de Sujin.", "약속을 바꿀 때는 미리 알려 줬으면 좋겠어.", "약속을 바꿀 때는 미리 알려 줬으면 좋겠어.", "Ela gostaria de ser avisada antes quando o combinado mudar.", ["약속을 바꿀 때는 미리 알려 줬으면 좋겠어"]),
    reading("수진은 지민이 연락을 늦게 해서 서운했어요. 하지만 지민을 비난하지 않고, 약속을 바꿀 때 미리 알려 달라고 말했어요. 지민은 다음부터 그렇게 하겠다고 했어요.", "Como Sujin expressou o limite?", ["Com um pedido claro e respeitoso.", "Terminando a amizade.", "Sem dizer o que sentia."], "Com um pedido claro e respeitoso.", "비난하지 않고 미리 알려 달라고 말했어요."),
    translate("pt-ko", "Traduza: “Gostaria que você me avisasse antes.”", "미리 알려 줬으면 좋겠어요.", "줬으면 좋겠어요 expressa o desejo de forma educada.", ["미리 알려 주면 좋겠어요."]),
  ],
  independent: [
    mcq("Qual frase usa -도록 para indicar objetivo?", ["오해가 없도록 먼저 말했어요.", "오해가 없어요.", "오해를 했어요."], "오해가 없도록 먼저 말했어요.", "-도록 apresenta o objetivo de evitar o mal-entendido."),
    cloze("Complete: 관계를 유지하___ 데 시간이 필요해요.", "는", "유지하는 데 nominaliza a ação."),
    listen("Ouça e escreva o que leva tempo.", "서로 불편한 점을 말하는 데 시간이 걸려도 괜찮아요.", "서로 불편한 점을 말하는 데 시간이 걸려도 괜찮아요.", "Tudo bem se levar tempo para falar do que incomoda.", ["서로 불편한 점을 말하는 데 시간이 걸려도 괜찮아요"]),
    translate("ko-pt", "Traduza: 친구가 쉴 수 있도록 조용히 했어요.", "Fiquei em silêncio para que meu amigo pudesse descansar.", "수 있도록 indica a finalidade.", ["Fiz silêncio para que o amigo pudesse descansar."]),
    reading("관계에서 한계를 말하는 것은 쉽지 않아요. 하지만 아무 말 없이 참으면 오해가 커질 수 있어요. 상대를 존중하면서 분명하게 말하는 것이 좋아요.", "Qual é o conselho?", ["Dizer o limite com respeito e clareza.", "Nunca dizer o que incomoda.", "Evitar todos os conflitos."], "Dizer o limite com respeito e clareza.", "상대를 존중하면서 분명하게 말하는 것이 좋아요."),
  ],
  summary: ["-도록 indica objetivo, modo ou resultado pretendido.", "-는 데 nominaliza a ação e mostra o âmbito em que algo custa ou exige esforço.", "Um limite claro descreve o pedido, não ataca a pessoa.", "Reconhecer o outro ajuda a preservar a relação."],
  production: {
    titlePt: "Produção independente · um limite com respeito", promptPt: "Escreva um pedido de limite a alguém próximo. Explique a situação, o que você sente e o que gostaria que mudasse em quatro a seis frases.", promptKo: "가까운 사람에게 조심스럽게 부탁하고 싶은 것을 써 보세요.",
    guidance: ["Descreva o comportamento concreto, sem rotular a pessoa.", "Use -도록 ou -는 데 uma vez.", "Termine com uma proposta de acordo."],
    checklist: ["Situação descrita sem acusação.", "Limite ou pedido explícito.", "Sentimento em primeira pessoa.", "Proposta de acordo ou próximo passo."], minWords: 35,
  },
});

/** b1-l24 — problemas urbanos e soluções. */
export const B1_L24 = defineB1Lesson({
  id: "b1-l24", number: 24, moduleId: "b1-m05", title: "Problemas cotidianos",
  objective: "Relatar um problema urbano, explicar a causa e avaliar soluções viáveis com os moradores.",
  prerequisites: ["b1-l23"], estimatedMinutes: 70, dialogueTitle: "A reunião dos moradores",
  intro: [
    { title: "-는 통에 — por causa de uma situação contínua", body: "Use -는 통에 quando uma ação em andamento provoca uma consequência negativa para outra pessoa. O tom costuma ser de incômodo ou queixa, e a segunda parte traz o prejuízo.", ko: "윗집에서 수리하는 통에 잠을 못 잤어요." },
    { title: "-기 마련이다 — é inevitável", body: "A forma apresenta um resultado como natural ou previsível diante de uma situação. Não é uma promessa nem uma ordem; serve para justificar por que algo acontece.", ko: "사람이 많으면 기다리기 마련이에요." },
  ],
  dialogue: [
    ["이웃", "요즘 지하 주차장에 물이 새는 것 같아요.", "Parece que está vazando água na garagem subterrânea ultimamente."],
    ["지민", "맞아요. 누수 때문에 바닥이 미끄러워서 위험해요.", "É verdade. Por causa do vazamento, o chão está escorregadio e perigoso."],
    ["이웃", "관리실에 말씀하셨어요?", "Você falou com a administração?"],
    ["지민", "네. 그런데 수리를 기다리는 통에 주민들이 계속 불편을 겪고 있어요.", "Sim. Mas, enquanto esperamos o conserto, os moradores continuam sofrendo transtornos."],
    ["이웃", "오래된 건물이라 어디서 새는지 찾기 어렵기 마련이에요.", "Como o prédio é antigo, é natural que seja difícil encontrar de onde vem o vazamento."],
    ["지민", "그래도 임시 안내판을 붙이고, 이번 주 안에 점검 날짜를 정했으면 좋겠어요.", "Mesmo assim, seria bom colocar uma placa de aviso provisória e definir uma data de inspeção ainda esta semana."],
  ],
  reusedIds: ["ko:이웃", "ko:물", "ko:수리", "ko:불편"],
  grammar: [
    ["-는 통에 — consequência negativa", "동사 + -는 통에", "A primeira ação ainda está em curso e causa um prejuízo. A segunda oração costuma trazer o resultado ruim. Evite usar com resultados positivos.", [["공사가 하는 통에 길이 막혔어요.", "Por causa da obra em andamento, a rua ficou congestionada."], ["아이가 우는 통에 전화를 못 했어요.", "Não consegui telefonar porque a criança estava chorando."]]],
    ["-기 마련이다 — resultado previsível", "동사/형용사 + -기 마련이다", "Apresenta algo como consequência natural de uma situação. Pode suavizar uma crítica ao mostrar que o problema não depende só de uma pessoa.", [["사람이 많으면 기다리기 마련이에요.", "Se há muita gente, é natural que se espere."], ["처음에는 실수하기 마련이에요.", "É natural cometer erros no começo."]]],
  ],
  guided: [
    mcq("Qual é o problema relatado?", ["Um vazamento na garagem.", "Uma queda de energia.", "Um barulho à noite."], "Um vazamento na garagem.", "지하 주차장에 물이 새는 것 같아요."),
    cloze("Complete a causa: 수리를 기다리___ 통에 주민들이 불편을 겪고 있어요.", "는", "기다리는 통에 indica a situação contínua que causa o transtorno."),
    listen("Ouça e escreva por que é difícil encontrar o vazamento.", "오래된 건물이라 어디서 새는지 찾기 어렵기 마련이에요.", "오래된 건물이라 어디서 새는지 찾기 어렵기 마련이에요.", "O prédio é antigo, então é natural que seja difícil localizar o vazamento.", ["오래된 건물이라 어디서 새는지 찾기 어렵기 마련이에요"]),
    reading("지하 주차장에 물이 새고 있어요. 주민들은 수리를 기다리는 통에 불편을 겪고 있어요. 관리실은 이번 주 안에 점검 날짜를 정하기로 했어요.", "Qual é a solução combinada?", ["Definir uma data de inspeção nesta semana.", "Fechar a garagem para sempre.", "Ignorar o vazamento."], "Definir uma data de inspeção nesta semana.", "이번 주 안에 점검 날짜를 정하기로 했어요."),
    translate("pt-ko", "Traduza: “É natural que seja difícil consertar um prédio antigo.”", "오래된 건물은 수리하기 어렵기 마련이에요.", "기 마련이에요 apresenta o resultado como natural.", ["오래된 건물이라 수리하기 어렵기 마련이에요."]),
  ],
  independent: [
    mcq("Qual frase indica uma consequência negativa causada por uma situação contínua?", ["공사가 하는 통에 길이 막혔어요.", "공사가 끝났어요.", "길이 넓어요."], "공사가 하는 통에 길이 막혔어요.", "-는 통에 liga a situação em curso ao prejuízo."),
    cloze("Complete: 사람이 많으면 기다리___ 마련이에요.", "기", "기다리기 마련이에요 significa que esperar é previsível."),
    listen("Ouça e escreva a proposta final.", "임시 안내판을 붙이고 점검 날짜를 정했으면 좋겠어요.", "임시 안내판을 붙이고 점검 날짜를 정했으면 좋겠어요.", "Ele gostaria que colocassem um aviso provisório e definissem a data da inspeção.", ["임시 안내판을 붙이고 점검 날짜를 정했으면 좋겠어요"]),
    translate("ko-pt", "Traduza: 아이가 우는 통에 전화를 못 했어요.", "Não consegui telefonar porque a criança estava chorando.", "우는 통에 indica a causa contínua e negativa.", ["Por causa do choro da criança, não consegui telefonar."]),
    reading("도시에서 교통 체증은 피하기 어려운 문제예요. 하지만 대중교통을 늘리면 조금 줄일 수 있어요. 중요한 것은 문제를 인정하고 함께 해결 방법을 찾는 거예요.", "Qual é a mensagem principal?", ["Problemas urbanos exigem soluções coletivas.", "O trânsito nunca pode mudar.", "Cada pessoa deve evitar a cidade."], "Problemas urbanos exigem soluções coletivas.", "함께 해결 방법을 찾는 거예요."),
  ],
  summary: ["-는 통에 liga uma situação contínua a uma consequência negativa.", "-기 마련이다 apresenta um resultado como natural ou previsível.", "Uma boa reclamação separa problema, causa e impacto.", "A solução proposta precisa ser viável e ter prazo ou responsável."],
  production: {
    titlePt: "Produção independente · uma reclamação cidadã", promptPt: "Escreva uma reclamação sobre um problema do seu bairro. Descreva o problema, a causa, o impacto e uma solução viável em seis frases.", promptKo: "우리 동네에서 해결되었으면 하는 문제를 이야기해 보세요.",
    guidance: ["Comece pelo fato observável, não pela acusação.", "Use -는 통에 ou -기 마련이다 uma vez.", "Proponha uma solução com prazo ou responsável."],
    checklist: ["Problema e local identificados.", "Causa ou agravante explicado.", "Impacto sobre os moradores.", "Solução viável e próximo passo."], minWords: 40,
  },
});

/** b1-l25 — direitos, deveres e convivência. */
export const B1_L25 = defineB1Lesson({
  id: "b1-l25", number: 25, moduleId: "b1-m05", title: "Direitos e deveres",
  objective: "Discutir direitos e deveres em uma comunidade, equilibrando liberdade individual e convivência.",
  prerequisites: ["b1-l24"], estimatedMinutes: 70, dialogueTitle: "A assembleia do prédio",
  intro: [
    { title: "-(으)ㄹ 권리가 있다 — ter o direito de", body: "Use com verbos para dizer que alguém tem o direito de fazer algo: -을/ㄹ 권리가 있다. Com substantivos, a forma comum é 에 대한 권리. É uma estrutura de registro formal, adequada a regras e propostas.", ko: "누구나 의견을 말할 권리가 있어요." },
    { title: "-아/어야 할 의무가 있다 — ter o dever de", body: "Apresenta uma obrigação de forma objetiva e formal. É mais adequada a textos de regras do que a uma ordem direta. O verbo principal fica em -아/어야 할 의무가 있다.", ko: "주민은 규칙을 지켜야 할 의무가 있어요." },
  ],
  dialogue: [
    ["진행자", "오늘은 옥상 사용 규칙에 대해 이야기하겠습니다.", "Hoje vamos falar sobre as regras de uso do terraço."],
    ["지민", "저는 밤에 조용히 쉴 권리가 있다고 생각해요.", "Eu acho que tenho o direito de descansar em silêncio à noite."],
    ["이웃", "물론이지요. 하지만 옥상을 이용할 권리도 있어요.", "Claro. Mas também temos o direito de usar o terraço."],
    ["진행자", "두 의견을 함께 고려해야 합니다. 이용 시간을 정하면 어떨까요?", "Precisamos considerar as duas opiniões. Que tal definirmos um horário de uso?"],
    ["지민", "좋아요. 대신 늦은 시간에는 소리를 줄여야 할 의무가 있다고 분명히 알려야 해요.", "Certo. Em troca, devemos deixar claro que há o dever de reduzir o barulho em horários tardios."],
    ["이웃", "그렇게 하면 권리와 책임을 함께 지킬 수 있겠네요.", "Assim poderemos respeitar direitos e responsabilidades juntos."],
  ],
  reusedIds: ["ko:의견", "ko:규칙", "ko:책임", "ko:시간"],
  grammar: [
    ["-(으)ㄹ 권리가 있다 — direito", "동사 + -(으)ㄹ 권리가 있다 / 명사 + 에 대한 권리", "Afirma um direito reconhecido. Em uma discussão, costuma vir com uma justificativa ou um limite para não soar como privilégio ilimitado.", [["누구나 자신의 의견을 말할 권리가 있어요.", "Todos têm o direito de expressar a própria opinião."], ["주민은 회의에 참석할 권리가 있어요.", "Os moradores têm o direito de participar da reunião."]]],
    ["-아/어야 할 의무가 있다 — dever", "동사 + -아/어야 할 의무가 있다", "Expressa uma obrigação de modo formal e objetivo. Use para regras, contratos ou propostas; para uma conversa cotidiana, -아/어야 해요 costuma ser mais natural.", [["우리는 공공 장소의 규칙을 지켜야 할 의무가 있어요.", "Temos o dever de cumprir as regras dos espaços públicos."], ["이용자는 시설을 깨끗하게 사용해야 할 의무가 있어요.", "O usuário tem o dever de usar as instalações de forma limpa."]]],
  ],
  guided: [
    mcq("Qual direito Jimin defende?", ["Descansar em silêncio à noite.", "Usar o terraço a qualquer hora.", "Não pagar as taxas do prédio."], "Descansar em silêncio à noite.", "밤에 조용히 쉴 권리가 있다고 생각해요."),
    cloze("Complete o direito: 누구나 의견을 말할 권리___ 있어요.", "가", "권리가 있어요 marca o direito."),
    listen("Ouça e escreva o dever lembrado por Jimin.", "늦은 시간에는 소리를 줄여야 할 의무가 있어요.", "늦은 시간에는 소리를 줄여야 할 의무가 있어요.", "Em horários tardios, há o dever de reduzir o barulho.", ["늦은 시간에는 소리를 줄여야 할 의무가 있어요"]),
    reading("주민들은 옥상을 이용할 권리가 있어요. 하지만 늦은 시간에는 소리를 줄여야 할 의무도 있어요. 두 가지를 함께 지키는 것이 중요해요.", "Qual é o equilíbrio proposto?", ["Direitos e deveres devem ser respeitados juntos.", "Só os direitos importam.", "O terraço deve ser fechado."], "Direitos e deveres devem ser respeitados juntos.", "두 가지를 함께 지키는 것이 중요해요."),
    translate("pt-ko", "Traduza: “Todos têm o direito de expressar a própria opinião.”", "누구나 자신의 의견을 말할 권리가 있어요.", "말할 권리가 있어요 expressa o direito de falar.", ["모든 사람은 자신의 의견을 말할 권리가 있어요."]),
  ],
  independent: [
    mcq("Qual frase expressa um dever?", ["규칙을 지켜야 할 의무가 있어요.", "규칙을 지킬 권리가 있어요.", "규칙이 없어요."], "규칙을 지켜야 할 의무가 있어요.", "-아/어야 할 의무가 있어요 marca obrigação."),
    cloze("Complete o dever: 이용자는 시설을 깨끗하게 사용___ 할 의무가 있어요.", "해야", "사용해야 할 의무가 있어요 indica a obrigação."),
    listen("Ouça e escreva a conclusão da assembleia.", "권리와 책임을 함께 생각해야 해요.", "권리와 책임을 함께 생각해야 해요.", "É preciso pensar em direitos e responsabilidades juntos.", ["권리와 책임을 함께 생각해야 해요"]),
    translate("ko-pt", "Traduza: 주민은 회의에 참석할 권리가 있어요.", "Os moradores têm o direito de participar da reunião.", "참석할 권리가 있어요 expressa o direito de participar.", ["O morador tem o direito de participar da reunião."]),
    reading("어떤 사람은 자유를 중요하게 생각하고, 어떤 사람은 안전을 중요하게 생각해요. 하지만 자유에는 책임이 따라요. 서로의 권리를 인정할 때 공동체가 유지될 수 있어요.", "Qual é a conclusão do texto?", ["A convivência exige reconhecer os direitos dos outros.", "A liberdade não tem limites.", "A segurança importa menos que a liberdade."], "A convivência exige reconhecer os direitos dos outros.", "서로의 권리를 인정할 때 공동체가 유지될 수 있어요."),
  ],
  summary: ["-(으)ㄹ 권리가 있다 afirma um direito de forma formal.", "-아/어야 할 의무가 있다 apresenta uma obrigação objetiva.", "Direitos e deveres precisam ser discutidos em conjunto.", "Uma proposta equilibrada reconhece o conflito e define limites."],
  production: {
    titlePt: "Produção independente · uma proposta de convivência", promptPt: "Escreva uma proposta para uma regra de convivência no seu prédio, escola ou grupo. Apresente um direito, um dever e uma solução para um conflito em seis frases.", promptKo: "우리 공동체에 필요한 규칙을 제안해 보세요.",
    guidance: ["Diga qual conflito a proposta quer resolver.", "Use uma estrutura de direito e uma de dever.", "Mostre como a solução protege os dois lados."],
    checklist: ["Conflito ou necessidade descritos.", "Um direito explicitado.", "Um dever correspondente.", "Proposta viável e equilibrada."], minWords: 40,
  },
});
