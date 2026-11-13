import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l11 — opinião com grau de certeza e justificativa. */
export const B1_L11 = defineB1Lesson({
  id: "b1-l11", number: 11, moduleId: "b1-m03", title: "Eu acho que...",
  objective: "Expressar opinião com grau de certeza e justificativa, distinguindo avaliação pessoal de fato.",
  prerequisites: ["b1-c02"], estimatedMinutes: 65, dialogueTitle: "A nova livraria do bairro",
  intro: [
    { title: "-다고 생각하다 — marcar opinião", body: "Use -다고 생각해요 para deixar claro que a frase é uma opinião sua, não um fato universal. O verbo 생각하다 pode aparecer no passado quando a avaliação mudou.", ko: "저는 그 공간이 좋다고 생각해요." },
    { title: "-는 편이다 — generalizar com cautela", body: "A forma apresenta uma tendência, não uma regra. Com verbos, use -는 편이다; com adjetivos, -(으)ㄴ 편이다. É comum em avaliações educadas.", ko: "사람들이 자주 가는 편이에요." },
  ],
  dialogue: [
    ["지민", "수진 씨, 동네에 새로 생긴 서점에 가 봤어요?", "Sujin, você já foi à livraria que abriu no bairro?"],
    ["수진", "네, 어제 가 봤어요. 저는 그 공간이 참 좋다고 생각해요.", "Sim, fui ontem. Eu acho aquele espaço muito bom."],
    ["지민", "저도 처음에는 그렇게 생각했어요. 그런데 책값이 좀 비싼 편이에요.", "Eu também pensava assim no começo. Mas os preços dos livros são um tanto caros."],
    ["수진", "맞아요. 그래도 아이들이 책을 읽는 모습을 보면 좋다고 생각해요.", "É verdade. Mesmo assim, quando vejo crianças lendo, acho bom."],
    ["지민", "그건 저도 공감해요. 지역 사람들이 자주 가는 편이에요.", "Nisso eu também concordo. As pessoas da região costumam ir com frequência."],
    ["수진", "네, 저는 앞으로도 계속 갈 거라고 생각해요.", "Sim, eu acho que vou continuar indo no futuro."],
  ],
  reusedIds: ["ko:의견", "ko:찬성", "ko:반대", "ko:생활"],
  grammar: [
    ["-다고 생각하다 — opinião pessoal", "동사/형용사 + -다고 생각하다 / -(으)ㄹ 거라고 생각하다", "A forma apresenta o conteúdo da frase como avaliação de quem fala. Não serve para anunciar um dado objetivo; para isso, basta a afirmação direta. Para opinar sobre o futuro, cite -(으)ㄹ 거예요: 갈 거예요 → 갈 거라고 생각해요.", [["저는 그 공간이 좋다고 생각해요.", "Eu acho aquele espaço bom."], ["앞으로도 계속 갈 거라고 생각해요.", "Acho que vou continuar indo no futuro."]]],
    ["-는 편이다 — tendência com cautela", "동사 + -는 편이다 / 형용사 + -(으)ㄴ 편이다", "Use -는 편이다 para dizer que algo costuma acontecer ou que um traço é relativamente forte. A forma suaviza a generalização e não descreve uma regra fixa.", [["사람들이 자주 가는 편이에요.", "As pessoas costumam ir com frequência."], ["책값이 비싼 편이에요.", "Os preços dos livros são um tanto caros."]]],
  ],
  guided: [
    mcq("O que Sujin acha do novo espaço?", ["Que é um espaço muito bom.", "Que é caro e vazio.", "Que fica longe do bairro."], "Que é um espaço muito bom.", "좋다고 생각해요 marca a opinião dela."),
    cloze("Complete a opinião: 저는 그 공간이 좋___ 생각해요.", "다고", "좋다고 생각해요 apresenta a avaliação pessoal."),
    listen("Ouça e escreva a ressalva de Jimin sobre os preços.", "그런데 책값이 좀 비싼 편이에요.", "그런데 책값이 좀 비싼 편이에요.", "A ressalva é que os preços são um tanto caros.", ["그런데 책값이 좀 비싼 편이에요"]),
    reading("수진은 새 서점이 동네에 생겨서 기뻐요. 책값은 비싼 편이지만 아이들이 책을 읽는 모습을 자주 볼 수 있어요. 그래서 수진은 이 공간이 좋다고 생각해요.", "Por que Sujin gosta da nova livraria?", ["Porque vê crianças lendo com frequência.", "Porque os livros são baratos.", "Porque fica longe de casa."], "Porque vê crianças lendo com frequência.", "아이들이 책을 읽는 모습을 자주 볼 수 있어요."),
    translate("pt-ko", "Traduza: “Eu acho que as pessoas da região costumam ir com frequência.”", "지역 사람들이 자주 가는 편이라고 생각해요.", "가는 편이다 suaviza a tendência; -다고 생각해요 marca a opinião.", ["동네 사람들이 자주 가는 편이라고 생각해요."]),
  ],
  independent: [
    mcq("Qual frase expressa uma tendência com cautela?", ["책값이 비싼 편이에요.", "책값이 비싸요.", "책값이 비쌀 거예요."], "책값이 비싼 편이에요.", "-는 편이다 apresenta tendência, não fato absoluto."),
    cloze("Complete a tendência: 사람들이 자주 가___ 편이에요.", "는", "가는 편이에요 descreve um costume frequente."),
    listen("Ouça e escreva a frase completa com a opinião de Sujin sobre o futuro.", "저는 앞으로도 계속 갈 거라고 생각해요.", "저는 앞으로도 계속 갈 거라고 생각해요.", "Ela acha que continuará indo.", ["저는 앞으로도 계속 갈 거라고 생각해요"]),
    translate("ko-pt", "Traduza: 저는 그 공간이 참 좋다고 생각해요.", "Eu acho aquele espaço realmente bom.", "-다고 생각해요 marca a avaliação de quem fala.", ["Eu acho aquele espaço muito bom.", "Eu penso que aquele espaço é realmente bom."]),
    reading("어떤 사람은 온라인 수업이 편하다고 생각해요. 다른 사람은 학교에서 친구를 만날 수 있다는 점을 더 중요하게 생각해요. 두 의견 모두 나름의 이유가 있어요.", "O que o texto mostra sobre as duas opiniões?", ["Cada uma tem seu próprio motivo.", "Uma delas está errada.", "As duas são iguais."], "Cada uma tem seu próprio motivo.", "두 의견 모두 나름의 이유가 있어요."),
  ],
  summary: ["-다고 생각해요 marca a frase como opinião pessoal.", "-는 편이다 suaviza uma tendência.", "Uma opinião B1 precisa de justificativa, não só de certeza.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · uma opinião sobre o bairro", promptPt: "Dê sua opinião sobre uma mudança recente no seu bairro. Escreva de cinco a seis frases e apresente duas justificativas.", promptKo: "동네의 변화에 대한 의견을 써 보세요.",
    guidance: ["Diga qual mudança você observou.", "Use -다고 생각해요 para marcar sua opinião.", "Apresente uma tendência com -는 편이다."],
    checklist: ["Descrevi a mudança com clareza.", "Marquei a frase como opinião.", "Dei duas justificativas diferentes.", "Fechei com uma avaliação pessoal."], minWords: 35,
  },
});

/** b1-l12 — comparação de posições com contraste e critério. */
export const B1_L12 = defineB1Lesson({
  id: "b1-l12", number: 12, moduleId: "b1-m03", title: "Por um lado...",
  objective: "Comparar posições e apresentar contraste com critério explícito.",
  prerequisites: ["b1-l11"], estimatedMinutes: 65, dialogueTitle: "Dois jeitos de trabalhar",
  intro: [
    { title: "-는 반면에 — contrastar dois lados", body: "A forma liga dois fatos contrastantes e mostra que ambos coexistem. Com verbos, use -는 반면에; com adjetivos, -(으)ㄴ 반면에.", ko: "재택근무는 시간을 아끼는 반면에 대화가 적어요." },
    { title: "-에 비해 — comparar com um parâmetro", body: "Use -에 비해(서) depois do elemento que serve de base de comparação. A oração final traz a diferença observada.", ko: "지난해에 비해 이용자가 늘었어요." },
  ],
  dialogue: [
    ["지민", "요즘 회사에서 재택근무를 늘리고 있지요?", "Ultimamente a empresa está ampliando o trabalho remoto, não é?"],
    ["마르코", "네. 재택근무는 시간을 아낄 수 있는 반면에 동료와 대화가 적어요.", "Sim. O trabalho remoto economiza tempo; por outro lado, há menos conversa com os colegas."],
    ["지민", "사무실에서는 집중하기 어려운 반면에 협업은 빨라요.", "No escritório é difícil se concentrar; por outro lado, a colaboração é rápida."],
    ["마르코", "맞아요. 두 방식의 차이가 뚜렷해요.", "É verdade. A diferença entre os dois métodos é nítida."],
    ["지민", "지난해에 비해 재택근무를 선택한 사람이 많아졌어요.", "Em comparação com o ano passado, mais pessoas escolheram o trabalho remoto."],
    ["마르코", "저는 조용한 집에서 일하는 게 좋아요.", "Eu gosto de trabalhar em uma casa silenciosa."],
  ],
  reusedIds: ["ko:비교", "ko:문화", "ko:생활", "ko:방법"],
  grammar: [
    ["-는 반면에 — contraste", "동사 + -는 반면에 / 형용사 + -(으)ㄴ 반면에", "A forma apresenta dois lados de uma mesma situação. Não escolhe um vencedor; apenas mostra que as características são diferentes.", [["재택근무는 시간을 아낄 수 있는 반면에 대화가 적어요.", "O trabalho remoto economiza tempo; por outro lado, há menos conversa."], ["사무실에서는 집중하기 어려운 반면에 협업이 빨라요.", "No escritório é difícil se concentrar; por outro lado, a colaboração é rápida."]]],
    ["-에 비해 — parâmetro de comparação", "명사 + -에 비해(서)", "O elemento antes de -에 비해 é a base de comparação. A diferença vem depois, sem precisar de outra marca comparativa.", [["지난해에 비해 이용자가 늘었어요.", "Em comparação com o ano passado, os usuários aumentaram."], ["이 회사는 다른 회사에 비해 회의가 적어요.", "Esta empresa tem menos reuniões em comparação com outras."]]],
  ],
  guided: [
    mcq("Qual desvantagem do trabalho remoto Marco menciona?", ["Menos conversa com os colegas.", "Mais tempo de deslocamento.", "Menos tarefas para fazer."], "Menos conversa com os colegas.", "동료와 대화가 적어요."),
    cloze("Complete o contraste: 재택근무는 시간을 아낄 수 있___ 반면에 대화가 적어요.", "는", "있는 반면에 liga os dois lados opostos."),
    listen("Ouça e escreva a vantagem do trabalho no escritório.", "사무실에서는 집중하기 어려운 반면에 협업은 빨라요.", "사무실에서는 집중하기 어려운 반면에 협업은 빨라요.", "No escritório, a colaboração é rápida, embora seja difícil se concentrar.", ["사무실에서는 집중하기 어려운 반면에 협업은 빨라요"]),
    reading("재택근무는 출근 시간을 아낄 수 있어요. 반면에 동료와 바로 이야기하기 어려울 때가 있어요. 사무실 근무는 대화가 빠른 반면에 집중하기 어려워요.", "Qual contraste o texto apresenta?", ["Tempo economizado versus conversa difícil no remoto.", "Salário alto versus salário baixo.", "Férias longas versus férias curtas."], "Tempo economizado versus conversa difícil no remoto.", "출근 시간을 아낄 수 있어요 ↔ 동료와 이야기하기 어려워요."),
    translate("pt-ko", "Traduza: “Em comparação com o ano passado, mais pessoas escolheram o trabalho remoto.”", "지난해에 비해 재택근무를 선택한 사람이 많아졌어요.", "-에 비해 introduz o parâmetro de comparação.", ["작년에 비해 재택근무를 선택한 사람이 많아졌어요."]),
  ],
  independent: [
    mcq("Qual frase compara com um parâmetro explícito?", ["회사에 비해 집이 조용해요.", "집이 아주 조용하고 좋아요.", "집에서 일을 하고 있어요."], "회사에 비해 집이 조용해요.", "-에 비해 apresenta a base da comparação."),
    cloze("Complete a avaliação: 두 방식의 차이가 뚜___.", "렷해요", "뚜렷해요 significa que a diferença é nítida."),
    listen("Ouça e escreva a conclusão de Marco sobre os dois métodos.", "두 방식의 차이가 뚜렷해요.", "두 방식의 차이가 뚜렷해요.", "Ele diz que a diferença entre os dois métodos é nítida.", ["두 방식의 차이가 뚜렷해요"]),
    translate("ko-pt", "Traduza: 재택근무는 시간을 아낄 수 있는 반면에 대화가 적어요.", "O trabalho remoto economiza tempo; por outro lado, há menos conversa.", "-는 반면에 apresenta o contraste entre os dois lados.", ["O trabalho remoto economiza tempo, mas há menos conversa."]),
    reading("지난해에 비해 올해 재택근무를 선택한 사람이 늘었어요. 하지만 모든 직업에 재택근무가 맞는 것은 아니에요.", "O que o texto acrescenta à comparação?", ["Uma ressalva sobre a adequação do trabalho remoto.", "Um dado sobre salários.", "Uma previsão para o próximo ano."], "Uma ressalva sobre a adequação do trabalho remoto.", "모든 직업에 맞는 것은 아니에요 limita a conclusão."),
  ],
  summary: ["-는 반면에 contrasta dois lados sem eliminá-los.", "-에 비해 apresenta a base da comparação.", "Uma comparação B1 deve dizer qual critério está sendo usado.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · comparar dois modelos", promptPt: "Compare dois modos de trabalhar ou estudar que você conhece. Escreva de cinco a seis frases, com um contraste e um critério de comparação.", promptKo: "두 가지 일하는 방식이나 공부 방식을 비교해 보세요.",
    guidance: ["Apresente os dois modelos em uma frase cada.", "Use -는 반면에 para o contraste.", "Use -에 비해 para indicar o critério."],
    checklist: ["Os dois modelos estão claros.", "Há um contraste explícito.", "O critério de comparação aparece.", "A conclusão não declara um modelo universalmente melhor."], minWords: 35,
  },
});

/** b1-l13 — adição de argumentos e hierarquização. */
export const B1_L13 = defineB1Lesson({
  id: "b1-l13", number: 13, moduleId: "b1-m03", title: "Não só...",
  objective: "Acrescentar argumentos e hierarquizar informações sem repetir a mesma ideia.",
  prerequisites: ["b1-l12"], estimatedMinutes: 65, dialogueTitle: "A proposta do novo serviço",
  intro: [
    { title: "-뿐만 아니라 — somar argumentos", body: "A forma acrescenta um segundo argumento ao primeiro. Com substantivos, aparece depois do nome; com verbos e adjetivos, use -(으)ㄹ 뿐만 아니라.", ko: "이용료가 저렴할 뿐만 아니라 시설도 깨끗해요." },
    { title: "-기도 하다 — outra faceta", body: "Use -기도 하다 para dizer que a mesma coisa também faz outra ação ou apresenta outro estado. Não substitui o argumento principal; acrescenta informação.", ko: "주민들이 직접 참여하기도 해요." },
  ],
  dialogue: [
    ["지민", "오늘 발표는 어떤 내용이에요?", "Qual é o conteúdo da apresentação de hoje?"],
    ["수진", "작은 도서관의 운영 시간을 늘리자는 제안이에요.", "É uma proposta para ampliar o horário de funcionamento da pequena biblioteca."],
    ["지민", "비용이 많이 들지 않아요?", "Não custa muito?"],
    ["수진", "이용료가 저렴할 뿐만 아니라 자원봉사자도 많아요.", "Além de a taxa ser barata, também há muitos voluntários."],
    ["지민", "그래도 밤에는 사람이 적지 않을까요?", "Mas à noite não haveria poucas pessoas?"],
    ["수진", "주민들이 직접 참여하기도 해서 걱정이 적어요.", "Como os moradores também participam diretamente, a preocupação é menor."],
  ],
  reusedIds: ["ko:주장", "ko:자료", "ko:이유", "ko:결과"],
  grammar: [
    ["-뿐만 아니라 — adição", "명사 + -뿐만 아니라 / 동사·형용사 + -(으)ㄹ 뿐만 아니라", "A forma soma um argumento a outro já apresentado. O segundo item não repete o primeiro; acrescenta uma razão diferente.", [["이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "Além de a taxa ser barata, as instalações também são limpas."], ["학생뿐만 아니라 지역 주민도 이용할 수 있어요.", "Não só estudantes, mas também moradores locais podem usar."]]],
    ["-기도 하다 — informação adicional", "동사/형용사 + -기도 하다", "Use -기도 하다 para acrescentar outra ação ou estado ligado ao mesmo assunto. Não é uma lista completa; é uma faceta a mais.", [["주민들이 직접 참여하기도 해요.", "Os moradores também participam diretamente."], ["이 서비스는 밤에도 운영하기도 해요.", "Este serviço também funciona à noite."]]],
  ],
  guided: [
    mcq("O que a proposta de Sujin defende?", ["Ampliar o horário de uma pequena biblioteca.", "Fechar a biblioteca à noite.", "Aumentar a taxa de uso."], "Ampliar o horário de uma pequena biblioteca.", "운영 시간을 늘리자는 제안이에요."),
    cloze("Complete a adição: 이용료가 저렴할 ___ 아니라 자원봉사자도 많아요.", "뿐만", "저렴할 뿐만 아니라 soma o segundo argumento."),
    listen("Ouça e escreva a frase completa com a informação adicional sobre os moradores.", "주민들이 직접 참여하기도 해요.", "주민들이 직접 참여하기도 해요.", "Os moradores também participam diretamente.", ["주민들이 직접 참여하기도 해요"]),
    reading("새 서비스는 이용료가 저렴할 뿐만 아니라 시설도 깨끗해요. 또한 주민들이 직접 참여하기도 해요. 그래서 더 많은 사람이 이용할 수 있다고 생각해요.", "Qual argumento é adicional ao preço baixo?", ["As instalações limpas.", "O horário curto.", "A localização distante."], "As instalações limpas.", "시설도 깨끗해요 acrescenta o segundo argumento."),
    translate("pt-ko", "Traduza: “Não só a taxa é barata, mas as instalações também são limpas.”", "이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "-뿐만 아니라 acrescenta o segundo ponto sem repetir o primeiro.", ["가격이 저렴할 뿐만 아니라 시설도 깨끗해요."]),
  ],
  independent: [
    mcq("Qual frase acrescenta um segundo argumento?", ["이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "이용료가 저렴하고 부담이 없어요.", "시설이 깨끗할 거라고 생각해요."], "이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "-뿐만 아니라 soma informações distintas."),
    cloze("Complete a informação adicional: 주민들이 직접 참여하___ 해요.", "기도", "참여하기도 해요 acrescenta outra faceta."),
    listen("Ouça e escreva os dois argumentos sobre o serviço.", "이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "이용료가 저렴할 뿐만 아니라 시설도 깨끗해요.", "O serviço é barato e as instalações são limpas.", ["이용료가 저렴할 뿐만 아니라 시설도 깨끗해요"]),
    translate("ko-pt", "Traduza: 학생뿐만 아니라 지역 주민도 이용할 수 있어요.", "Não só estudantes, mas também moradores locais podem usar.", "뿐만 아니라 inclui os dois grupos.", ["Não só estudantes, mas também os moradores locais podem usar."]),
    reading("이 프로그램은 학생뿐만 아니라 지역 주민도 이용할 수 있어요. 주민들이 직접 운영하기도 해요.", "Quem pode usar o programa?", ["Estudantes e moradores locais.", "Somente estudantes.", "Somente turistas."], "Estudantes e moradores locais.", "학생뿐만 아니라 지역 주민도 이용할 수 있어요."),
  ],
  summary: ["-뿐만 아니라 acrescenta um argumento diferente.", "-기도 하다 introduz outra faceta do mesmo assunto.", "Uma boa argumentação hierarquiza: primeiro a tese, depois as razões.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · dois argumentos", promptPt: "Defenda a ampliação de um serviço do seu bairro com dois argumentos diferentes. Escreva de cinco a seis frases.", promptKo: "동네 서비스 확대 방안에 대한 제안을 써 보세요.",
    guidance: ["Apresente a proposta em uma frase.", "Use -뿐만 아니라 para o segundo argumento.", "Use -기도 하다 para uma informação adicional."],
    checklist: ["A proposta está clara.", "Os dois argumentos são diferentes.", "Há uma informação adicional com -기도 하다.", "A conclusão retoma a proposta."], minWords: 35,
  },
});

/** b1-l14 — discordância com concessão e contra-argumento. */
export const B1_L14 = defineB1Lesson({
  id: "b1-l14", number: 14, moduleId: "b1-m03", title: "Discordar sem brigar",
  objective: "Discordar, reconhecer o ponto do outro e propor outra leitura sem romper a conversa.",
  prerequisites: ["b1-l13"], estimatedMinutes: 65, dialogueTitle: "A série que dividiu a opinião",
  intro: [
    { title: "-기는 하지만 — conceder e contrastar", body: "A forma reconhece que algo é verdade antes de apresentar a objeção. Soa menos brusca que -지만 e ajuda a manter o respeito na conversa.", ko: "재미있기는 하지만 너무 길어요." },
    { title: "-라고 해도 — mesmo que se diga", body: "Use -라고 해도 quando aceita uma afirmação possível do outro, mas mantém sua posição. Com substantivos, a forma é -(이)라고 해도.", ko: "좋은 작품이라고 해도 모두가 좋아하지는 않아요." },
  ],
  dialogue: [
    ["마르코", "어제 그 드라마 마지막 화 봤어요?", "Você viu o último episódio daquela série ontem?"],
    ["수진", "네. 저는 결말이 좋았다고 생각해요.", "Sim. Eu acho que o final foi bom."],
    ["마르코", "재미있기는 하지만 마지막이 너무 갑작스러웠어요.", "É divertido, mas o final foi repentino demais."],
    ["수진", "그렇게 느낄 수도 있어요. 그래도 인물의 선택은 이해가 됐어요.", "É possível sentir assim. Mesmo assim, a escolha da personagem foi compreensível."],
    ["마르코", "유명한 배우라고 해도 이야기가 약하면 설득되지 않아요.", "Mesmo que o ator seja famoso, se a história é fraca, não convence."],
    ["수진", "맞아요. 좋은 작품이라고 해도 모든 사람이 좋아할 필요는 없어요.", "É verdade. Mesmo sendo uma boa obra, não é preciso que todos gostem."],
  ],
  reusedIds: ["ko:반대", "ko:의견", "ko:이유", "ko:상황"],
  grammar: [
    ["-기는 하지만 — concessão", "동사/형용사 + -기는 하지만", "A forma admite um ponto positivo ou verdadeiro e, em seguida, apresenta a objeção. É uma concessão educada, não uma concordância total.", [["재미있기는 하지만 너무 길어요.", "É divertido, mas é longo demais."], ["이해하기는 하지만 모두 동의하지는 않아요.", "Entendo, mas não concordo com tudo."]]],
    ["-라고 해도 — mesmo que se diga", "동사/형용사 + -다고 해도 / 명사 + -(이)라고 해도", "Use -다고 해도 depois de verbos e adjetivos, e -(이)라고 해도 depois de substantivos, para aceitar hipoteticamente o argumento do outro e mostrar que sua posição continua. Não significa que você concorda com a afirmação.", [["좋은 작품이라고 해도 모든 사람이 좋아하지는 않아요.", "Mesmo que se diga que é uma boa obra, não é todo mundo que gosta."], ["그 배우가 유명하다고 해도 이야기가 약하면 설득되지 않아요.", "Mesmo que se diga que esse ator é famoso, se a história é fraca, não convence."]]],
  ],
  guided: [
    mcq("Como Marco avalia o final da série?", ["É divertido, mas o final foi repentino demais.", "O final foi perfeito.", "Ele não assistiu ao episódio."], "É divertido, mas o final foi repentino demais.", "재미있기는 하지만 마지막이 갑작스러웠어요."),
    cloze("Complete a concessão: 재미있___ 하지만 마지막이 갑작스러웠어요.", "기는", "재미있기는 하지만 reconhece o lado bom antes da objeção."),
    listen("Ouça e escreva o contra-argumento de Marco sobre o ator.", "유명한 배우라고 해도 이야기가 약하면 설득되지 않아요.", "유명한 배우라고 해도 이야기가 약하면 설득되지 않아요.", "Nem um ator famoso convence se a história é fraca.", ["유명한 배우라고 해도 이야기가 약하면 설득되지 않아요"]),
    reading("마르코는 드라마가 재미있기는 하지만 결말이 갑작스러웠다고 말해요. 수진은 결말을 이해했다고 생각해요. 두 사람은 생각이 다르지만 서로의 의견을 존중해요.", "Como os dois terminam a conversa?", ["Respeitando opiniões diferentes.", "Concordando sobre o final.", "Deixando de conversar."], "Respeitando opiniões diferentes.", "서로의 의견을 존중해요."),
    translate("pt-ko", "Traduza: “Mesmo que seja uma boa obra, não é preciso que todos gostem.”", "좋은 작품이라고 해도 모든 사람이 좋아할 필요는 없어요.", "-라고 해도 mantém a posição após conceder o argumento.", ["좋은 작품이라고 해도 모두가 좋아할 필요는 없어요."]),
  ],
  independent: [
    mcq("Qual frase reconhece um ponto e depois discorda?", ["재미있기는 하지만 너무 길어요.", "재미있어요. 정말 재미있어요.", "너무 길어요. 두 시간이나 돼요."], "재미있기는 하지만 너무 길어요.", "-기는 하지만 faz a concessão antes da objeção."),
    cloze("Complete a concessão hipotética: 좋은 작품이___ 해도 모두가 좋아하지는 않아요.", "라고", "작품이라고 해도 aceita a afirmação sem concordar com ela."),
    listen("Ouça e escreva como os dois preservam a relação.", "생각은 다르지만 서로 존중해요.", "생각은 다르지만 서로 존중해요.", "Eles respeitam um ao outro apesar da diferença de opinião.", ["생각은 다르지만 서로 존중해요"]),
    translate("ko-pt", "Traduza: 재미있기는 하지만 마지막이 너무 갑작스러웠어요.", "É divertido, mas o final foi repentino demais.", "A concessão vem antes do contraste.", ["É divertido, mas o final foi abrupto demais."]),
    reading("좋은 작품이라고 해도 모든 사람이 좋아하지는 않아요. 취향이 다르기 때문이에요. 그래서 다른 의견을 들을 때는 이유를 먼저 묻는 게 좋아요.", "Qual é o conselho do texto?", ["Perguntar o motivo antes de julgar outra opinião.", "Evitar conversar sobre séries.", "Mudar de opinião sempre."], "Perguntar o motivo antes de julgar outra opinião.", "다른 의견을 들을 때는 이유를 먼저 묻는 게 좋아요."),
  ],
  summary: ["-기는 하지만 reconhece um ponto antes de discordar.", "-라고 해도 mantém a posição mesmo aceitando a hipótese.", "Discordar com respeito exige ouvir o motivo do outro.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · discordar com respeito", promptPt: "Discorde de uma opinião sobre um filme, uma série ou um livro. Escreva de cinco a seis frases, com uma concessão e um contra-argumento.", promptKo: "영화나 드라마에 대한 다른 의견에 정중하게 반대해 보세요.",
    guidance: ["Resuma a opinião do outro em uma frase.", "Use -기는 하지만 para conceder um ponto.", "Use -라고 해도 para manter sua posição."],
    checklist: ["A opinião do outro está resumida.", "Há uma concessão clara.", "O contra-argumento tem uma razão.", "O fechamento preserva o respeito."], minWords: 35,
  },
});

/** b1-l15 — tese, evidência e conclusão. */
export const B1_L15 = defineB1Lesson({
  id: "b1-l15", number: 15, moduleId: "b1-m03", title: "Defender uma opinião",
  objective: "Organizar tese, evidência e conclusão em um argumento curto e coerente.",
  prerequisites: ["b1-l14"], estimatedMinutes: 70, dialogueTitle: "O debate sobre o ônibus noturno",
  intro: [
    { title: "-다는 점에서 — citar um aspecto", body: "A forma nomeia o aspecto que serve de base para a avaliação. Com verbos e adjetivos, use -다는 점에서; com substantivos, -(이)라는 점에서.", ko: "밤에도 이동할 수 있다는 점에서 도움이 돼요." },
    { title: "-다고 볼 수 있다 — conclusão cautelosa", body: "Use -다고 볼 수 있어요 para apresentar uma conclusão baseada em evidências, sem tratá-la como verdade absoluta. É comum em debates e textos de opinião.", ko: "그 변화는 긍정적이라고 볼 수 있어요." },
  ],
  dialogue: [
    ["지민", "오늘 토론 주제는 심야 버스 확대예요.", "O tema do debate de hoje é a ampliação dos ônibus noturnos."],
    ["마르코", "저는 찬성해요. 밤에도 이동할 수 있다는 점에서 시민에게 도움이 돼요.", "Sou a favor. Por permitir circular também à noite, ajuda os cidadãos."],
    ["수진", "비용이 많이 든다는 점은 문제예요.", "O aspecto de custar muito é um problema."],
    ["마르코", "맞아요. 하지만 사고를 줄일 수 있다고 볼 수 있어요.", "Verdade. Mas pode-se considerar que reduz acidentes."],
    ["수진", "그 근거는 아직 부족해요. 통계를 먼저 확인해야 해요.", "Essa evidência ainda é insuficiente. Precisamos verificar as estatísticas primeiro."],
    ["지민", "그러면 다음 시간에 자료를 함께 보고 결론을 내려요.", "Então, na próxima aula, vemos os dados juntos e chegamos a uma conclusão."],
  ],
  reusedIds: ["ko:교통", "ko:문제", "ko:자료", "ko:결과"],
  grammar: [
    ["-다는 점에서 — aspecto como base", "동사/형용사 + -다는 점에서 / 명사 + -(이)라는 점에서", "A forma introduz o aspecto concreto que sustenta a avaliação. Ajuda a separar a tese do motivo que a justifica.", [["밤에도 이동할 수 있다는 점에서 시민에게 도움이 돼요.", "Por permitir circular também à noite, ajuda os cidadãos."], ["비용이 적게 든다는 점에서도 장점이 있어요.", "Também tem vantagem por custar pouco."]]],
    ["-다고 볼 수 있다 — conclusão baseada em evidência", "동사/형용사 + -다고 볼 수 있다", "A forma apresenta uma conclusão possível, não uma certeza. É útil quando os dados sustentam a leitura, mas ainda falta confirmação.", [["그 변화는 긍정적이라고 볼 수 있어요.", "Pode-se considerar essa mudança positiva."], ["이 자료는 신뢰할 만하다고 볼 수 있어요.", "Pode-se considerar que este dado é confiável."]]],
  ],
  guided: [
    mcq("Qual é a tese de Marco?", ["A ampliação do ônibus noturno ajuda os cidadãos.", "O ônibus noturno custa pouco.", "O debate deve ser cancelado."], "A ampliação do ônibus noturno ajuda os cidadãos.", "밤에도 이동할 수 있다는 점에서 시민에게 도움이 돼요."),
    cloze("Complete o aspecto: 밤에도 이동할 수 있___ 점에서 도움이 돼요.", "다는", "있다는 점에서 nomeia o aspecto que sustenta a tese."),
    listen("Ouça e escreva a conclusão cautelosa de Marco.", "사고를 줄일 수 있다고 볼 수 있어요.", "사고를 줄일 수 있다고 볼 수 있어요.", "Pode-se considerar que é possível reduzir acidentes.", ["사고를 줄일 수 있다고 볼 수 있어요"]),
    reading("심야 버스 확대는 비용이 든다는 점에서 부담이에요. 하지만 밤에도 이동할 수 있다는 점에서 시민에게 도움이 돼요. 아직 통계가 부족하므로 결론을 내리기에는 이르다고 볼 수 있어요.", "Qual é a conclusão cautelosa do texto?", ["Ainda é cedo para concluir sem estatísticas.", "O projeto deve ser cancelado.", "O custo não importa."], "Ainda é cedo para concluir sem estatísticas.", "통계가 부족하므로 결론을 내리기에는 이르다고 볼 수 있어요."),
    translate("pt-ko", "Traduza: “Pode-se considerar que essa mudança é positiva.”", "그 변화는 긍정적이라고 볼 수 있어요.", "-다고 볼 수 있어요 apresenta uma conclusão sem certeza absoluta."),
  ],
  independent: [
    mcq("Qual frase introduz um aspecto como base do argumento?", ["시간을 아낄 수 있다는 점에서 좋아요.", "시간을 아낄 수 있어요.", "시간이 없어요."], "시간을 아낄 수 있다는 점에서 좋아요.", "-다는 점에서 liga o aspecto à avaliação."),
    cloze("Complete a conclusão: 그 변화는 긍정적이___ 볼 수 있어요.", "라고", "긍정적이라고 볼 수 있어요 apresenta uma leitura possível."),
    listen("Ouça e escreva o que Sujin pede antes da conclusão.", "통계를 먼저 확인해야 해요.", "통계를 먼저 확인해야 해요.", "Ela pede para verificar as estatísticas primeiro.", ["통계를 먼저 확인해야 해요"]),
    translate("ko-pt", "Traduza: 밤에도 이동할 수 있다는 점에서 시민에게 도움이 돼요.", "Ajuda os cidadãos por permitir que circulem também à noite.", "-다는 점에서 indica o aspecto que fundamenta a avaliação."),
    reading("마르코는 심야 버스 확대를 찬성해요. 그는 사고를 줄일 수 있다는 점을 근거로 들어요. 수진은 통계가 더 필요하다고 말해요. 두 사람의 주장은 아직 합의되지 않았어요.", "Com base em que Marco defende a proposta?", ["Na possibilidade de reduzir acidentes.", "No preço baixo do ônibus.", "Na opinião de Sujin."], "Na possibilidade de reduzir acidentes.", "사고를 줄일 수 있다는 점을 근거로 들어요."),
  ],
  summary: ["-다는 점에서 apresenta o aspecto que sustenta a tese.", "-다고 볼 수 있다 formula uma conclusão cautelosa.", "Um argumento B1 separa tese, evidência e conclusão.", "Conteúdo novo permanece em revisão."],
  production: {
    titlePt: "Produção independente · defender uma tese", promptPt: "Escreva um argumento de cinco a seis frases sobre transporte público. Apresente uma tese, um dado ou exemplo e uma conclusão.", promptKo: "대중교통에 대한 주장을 논리적으로 써 보세요.",
    guidance: ["Comece com a tese em uma frase.", "Use -다는 점에서 para ligar o aspecto à avaliação.", "Feche com -다고 볼 수 있다 para não exagerar a certeza."],
    checklist: ["A tese aparece no começo.", "Há um dado ou exemplo concreto.", "A conclusão retoma a tese.", "Não apresentei opinião como fato absoluto."], minWords: 40,
  },
});
