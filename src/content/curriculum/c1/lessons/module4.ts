import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero pedido, sem fugir ao recorte." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a informação avança sem repetição desnecessária." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, inclusive parte das palavras da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém coerente com o destinatário." },
  { criterion: "argument" as const, labelPt: "Adequação pragmática", descriptorPt: "A força do enunciado, a marca de fonte e a polidez correspondem ao risco da situação." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra o que foi dito e nomeia o que permanece incerto ou em aberto." },
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

/** c1-l16 — fonte da informação e grau de certeza. */
export const C1_L16 = defineC1Lesson({
  id: "c1-l16", number: 16, moduleId: "c1-m04", title: "De onde eu sei",
  objective: "Marcar a fonte e o grau de certeza de uma inferência.",
  prerequisites: ["c1-c03"], estimatedMinutes: 80, dialogueTitle: "A reunião que ninguém viu",
  intro: [
    {
      title: "A fonte vem antes da conclusão",
      body: "Em coreano, a mesma informação muda de responsabilidade conforme a marca de fonte. Quem viu diz que viu; quem ouviu diz que ouviu; quem deduziu apresenta a dedução como dedução. Não se trata de excesso de cautela, mas de precisão: o leitor precisa saber o que você presenciou, o que lhe contaram e o que você concluiu. Quando as três coisas aparecem com o mesmo verbo, a informação mais frágil ganha a aparência da mais sólida.",
      ko: "직접 본 일, 들은 이야기, 짐작한 것을 같은 문장으로 말하지 않는다.",
    },
    {
      title: "Discurso: inferência é uma afirmação sobre o próprio saber",
      body: "Uma inferência não descreve apenas o mundo; descreve também como quem fala chegou àquela conclusão. Por isso ela costuma vir com uma marca de incerteza e com uma pista: o que foi observado, que horas eram, quem estava lá. Em textos argumentativos, essa marca protege o enunciador quando a dedução se revela errada. Em conversa, ela também abre espaço para o outro corrigir a leitura sem constrangimento.",
      ko: "확신의 정도를 밝히는 일은 책임의 범위를 정하는 일이다.",
    },
  ],
  dialogue: [
    ["지우", "회의실 불이 벌써 꺼졌네요. 예정보다 일찍 끝난 모양이에요.", "A luz da sala de reunião já está apagada. Pelo visto, terminou antes do previsto."],
    ["민호", "저도 그렇게 봤어요. 그런데 회의가 끝난 것과 결론이 난 것은 다르지요.", "Eu também achei isso. Mas uma coisa é a reunião ter terminado, outra é ter havido uma conclusão."],
    ["지우", "맞아요. 아까 복도에서 부장님이 웃으시는 걸 봤어요.", "É verdade. Há pouco vi o diretor rindo no corredor."],
    ["민호", "그건 직접 보신 거고, 결론이 났다는 건 짐작이에요.", "Isso você viu diretamente; já a conclusão é suposição."],
    ["지우", "그럼 팀장님께 물어볼까요?", "Então vou perguntar à chefe de equipe?"],
    ["민호", "묻기 전에, 아까 들은 이야기가 있어요. 총무팀에서 회의가 길어질 성싶다고 하더라고요.", "Antes de perguntar, ouvi uma história há pouco. Na equipe administrativa disseram que a reunião provavelmente se estenderia."],
    ["지우", "그건 회의 전에 들은 이야기라 지금 상황과 다를 수 있겠네요.", "Isso foi ouvido antes da reunião, então pode ser diferente da situação agora."],
    ["민호", "그러니까 확인한 뒤에 말하는 게 좋겠어요. 지금은 관찰과 전언이 섞여 있어요.", "Por isso é melhor falar depois de confirmar. Agora observação e relato de terceiros estão misturados."],
  ],
  readingText: {
    titlePt: "O que sobrou depois da reunião",
    paragraphs: [
      "화요일 오후, 기획팀 회의가 예정보다 일찍 끝났다는 이야기를 들었다. 나는 회의실에 직접 들어가지 않았고, 복도에서 나오는 사람들의 표정만 보았다. 세 명은 서로 어깨를 두드리며 웃었고, 한 명은 조용히 계단으로 내려갔다. 그 장면만으로 결론이 났다고 말하기는 어렵다. 다만 분위기가 무겁지 않았다는 점은 분명하다. 회의가 잘 끝난 모양이라고 짐작한 사람이 많았지만, 그것은 어디까지나 인상일 뿐이다.",
      "점심시간에 총무팀 직원에게서 다른 이야기를 들었다. 예산안이 아직 통과되지 않아 다음 주에 다시 회의를 열 성싶다는 것이었다. 이 이야기는 회의에 참석한 사람이 아니라 준비를 맡은 직원에게서 나왔다. 따라서 내용은 구체적이지만, 회의의 최종 판단과는 거리가 있을 수 있다. 들은 정보와 확인된 정보를 구분하지 않으면, 문제의 핵심을 놓치기 쉽다. 나는 이 이야기를 그대로 옮기지 않고, 출처를 밝혀서 전달하기로 했다.",
      "오후에 팀장님께 짧게 확인했다. 회의는 예정대로 끝났고, 예산안은 다음 회의에서 다시 다룰 예정이라고 했다. 그제야 내가 가진 조각들이 하나의 그림이 되었다. 직접 본 장면, 들은 이야기, 그리고 그 사이에서 내가 만든 판단이 서로 맞아떨어진 것이다. 돌아보면 처음의 짐작은 절반만 맞았다. 정확한 판단은 관찰과 전언을 구분하는 데서 시작된다. 앞으로는 결론을 말하기 전에, 내가 그것을 어떻게 알게 되었는지 먼저 밝혀야겠다.",
    ],
    pt: "Na tarde de terça-feira, ouvi dizer que a reunião da equipe de planejamento terminou antes do previsto. Não entrei na sala de reunião; apenas vi as expressões das pessoas que saíam pelo corredor. Três delas riam e batiam nos ombros umas das outras, e uma desceu as escadas em silêncio. Só com essa cena, é difícil dizer que houve uma conclusão. É certo, porém, que o clima não era pesado. Muitos imaginaram que a reunião devia ter terminado bem, mas isso é apenas uma impressão. Na hora do almoço, ouvi outra história de um funcionário da equipe administrativa. Ele disse que, como o orçamento ainda não fora aprovado, provavelmente haveria outra reunião na semana seguinte. Essa informação veio de um funcionário responsável pela preparação, e não de alguém que participou da reunião. Por isso, o conteúdo é concreto, mas pode estar distante do julgamento final da reunião. Se não separamos a informação ouvida da informação confirmada, é fácil perder o ponto central do problema. Decidi não repassar essa história como se fosse minha, mas informar a fonte. À tarde, confirmei brevemente com a chefe de equipe. Ela disse que a reunião terminou conforme o previsto e que o orçamento seria tratado de novo na reunião seguinte. Só então as peças que eu tinha formaram uma única imagem. A cena que vi diretamente, a história que ouvi e o julgamento que construí entre as duas coisas se encaixaram. Em retrospecto, minha suposição inicial estava certa só pela metade. Um julgamento preciso começa por distinguir observação de relato de terceiros. De agora em diante, antes de dizer uma conclusão, devo primeiro deixar claro como cheguei a saber dela.",
    objective: "Identificar a marca evidencial de cada afirmação e separar o visto, o ouvido e o inferido.",
  },
  reusedIds: ["ko:문제", "ko:판단", "ko:출처", "ko:예산"],
  grammar: [
    [
      "-ㄹ 성싶다 — parece que; provável (registro escrito)",
      "동사/형용사 + -(으)ㄹ 성싶다",
      "Apresenta uma suposição apoiada em indícios, com tom mais literário e escrito do que -(으)ㄹ 것 같다. Aparece em colunas, relatórios e narrativas, raramente na fala espontânea. A forma não transforma a suposição em fato: ela declara que quem escreve considera o desfecho provável. Compare com -ㄴ/는 모양이다, que parte de uma evidência observável e soa mais coloquial. Evite usar com uma certeza já comprovada ou como ordem.",
      [
        ["예산안이 아직 통과되지 않아 다음 주에 다시 회의를 열 성싶다.", "Como o orçamento ainda não foi aprovado, é provável que haja outra reunião na semana seguinte."],
        ["이번 결정은 예상보다 오래 걸릴 성싶다.", "Esta decisão provavelmente vai demorar mais do que o esperado."],
      ],
    ],
    [
      "-ㄴ/는 모양이다 — pelo visto; parece que",
      "동사 + -는 모양이다 / 형용사 + -(으)ㄴ 모양이다 / 명사 + 인 모양이다",
      "Marca uma inferência feita a partir do que se observa agora, como “pelo visto” ou “ao que parece”. É comum na fala e na escrita neutra, e costuma vir acompanhada da pista que sustenta a conclusão (-걸 보니, -네요). Diferente de -다고 하다, não atribui a informação a outra pessoa: a conclusão é de quem fala. Não use para relatar o que alguém disse nem para uma certeza verificada.",
      [
        ["회의실 불이 꺼진 걸 보니 회의가 일찍 끝난 모양이다.", "Pelo visto, a reunião terminou cedo, já que a luz da sala está apagada."],
        ["사람들이 우산을 들고 다니는 걸 보니 밖에 비가 오는 모양이다.", "Pelo visto está chovendo lá fora, já que as pessoas andam com guarda-chuva."],
      ],
    ],
  ],
  guided: [
    mcq("Qual frase deixa claro que a informação foi ouvida de outra pessoa, e não vista?", ["들은 이야기인데, 예산안이 아직 통과되지 않았다고 한다.", "내가 직접 예산안을 확인했다.", "아마 예산안이 통과될 것이다."], "들은 이야기인데, 예산안이 아직 통과되지 않았다고 한다.", "A forma -다고 한다 atribui a informação a outra fonte; as demais apresentam observação ou suposição."),
    cloze("Complete a inferência a partir da pista: 회의실 불이 꺼진 걸 보니 회의가 일찍 끝난 ___.", "모양이다", "-ㄴ/는 모양이다 marca uma conclusão tirada de uma evidência observável."),
    listen("Ouça e escreva o que a narradora realmente presenciou.", "나는 회의실에 직접 들어가지 않았고, 복도에서 나오는 사람들의 표정만 보았다.", "나는 회의실에 직접 들어가지 않았고, 복도에서 나오는 사람들의 표정만 보았다.", "Não entrei na sala de reunião; apenas vi as expressões das pessoas que saíam pelo corredor."),
    reading("이야기는 회의에 참석한 사람이 아니라 준비를 맡은 직원에게서 나왔다. 따라서 내용은 구체적이지만, 회의의 최종 판단과는 거리가 있을 수 있다.", "Por que a informação do funcionário administrativo não equivale ao resultado da reunião?", ["Porque veio de quem preparava a reunião, não de quem participou dela.", "Porque o funcionário mentiu de propósito.", "Porque a reunião foi cancelada."], "Porque veio de quem preparava a reunião, não de quem participou dela.", "A fonte é a preparação, não a deliberação; por isso o relato pode não coincidir com o julgamento final."),
    translate("pt-ko", "Traduza: “Pelo visto, a reunião terminou mais cedo do que o previsto.”", "회의가 예정보다 일찍 끝난 모양이다.", "-ㄴ/는 모양이다 expressa inferência a partir de indícios observados.", ["회의가 예정보다 일찍 끝난 모양이에요."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ 성싶다 de forma adequada ao registro escrito?", ["협상이 길어질 성싶다.", "협상이 길어질 성싶어요, 지금 만나요.", "협상이 길어질 성싶으니까 당장 결정하세요."], "협상이 길어질 성싶다.", "-ㄹ 성싶다 pertence ao registro escrito e não introduz convite nem ordem."),
    cloze("Complete a previsão: 다음 주에 다시 회의를 열 ___.", "성싶다", "-ㄹ 성싶다 apresenta uma suposição provável em registro escrito."),
    listen("Ouça e escreva o critério que evita confundir relato e conclusão.", "들은 정보와 확인된 정보를 구분하지 않으면, 문제의 핵심을 놓치기 쉽다.", "들은 정보와 확인된 정보를 구분하지 않으면, 문제의 핵심을 놓치기 쉽다.", "Se não separamos a informação ouvida da informação confirmada, é fácil perder o ponto central do problema."),
    translate("ko-pt", "Traduza: 정확한 판단은 관찰과 전언을 구분하는 데서 시작된다.", "Um julgamento preciso começa por distinguir observação de relato de terceiros.", "전언 = relato de terceiros; -는 데서 시작된다 indica o ponto de partida.", ["O julgamento preciso começa quando se separa o que foi observado do que foi apenas relatado."]),
    reading("회의는 예정대로 끝났고, 예산안은 다음 회의에서 다시 다룰 예정이라고 했다. 그제야 내가 가진 조각들이 하나의 그림이 되었다.", "O que mudou quando a chefe confirmou a informação?", ["As peças isoladas passaram a formar um quadro coerente.", "A narradora descobriu que a reunião havia sido cancelada.", "O orçamento foi aprovado naquele mesmo dia."], "As peças isoladas passaram a formar um quadro coerente.", "A confirmação permite articular o que foi visto, o que foi ouvido e o que foi inferido."),
  ],
  summary: [
    "A marca evidencial diz de onde vem a informação: visão direta, relato de outro ou inferência.",
    "-ㄹ 성싶다 apresenta uma suposição provável em registro escrito e literário.",
    "-ㄴ/는 모양이다 conclui a partir de uma pista observável e é comum na fala.",
    "Separar observação, relato e julgamento reduz o risco de apresentar uma suposição como fato.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · três vias de saber",
    "Descreva uma situação em que você soube de algo por três vias diferentes: viu uma cena, ouviu um relato e tirou uma conclusão. Diga o que cada via permite afirmar e o que ainda não está confirmado.",
    "직접 본 것, 들은 것, 짐작한 것을 구분해 쓰는 글을 써 보세요.",
    ["Comece pela cena observada, sem interpretá-la ainda.", "Use -ㄴ/는 모양이다 uma vez para uma inferência baseada em pista.", "Use -ㄹ 성싶다 uma vez em registro escrito.", "Nomeie a fonte de cada informação e o limite de cada uma."],
    ["Cena, relato e inferência distinguidos.", "Fonte de cada afirmação indicada.", "Uma inferência marcada com -ㄴ/는 모양이다.", "Uma previsão marcada com -ㄹ 성싶다.", "Fechamento dizendo o que falta confirmar."],
    "어제 오후, 우리 팀 회의가 예정보다 일찍 끝났다. 나는 회의실에 들어가지 않았고, 복도에서 나오는 사람들의 표정만 보았다. 두 사람이 웃으면서 이야기했고, 한 사람은 조용히 엘리베이터로 갔다. 회의가 잘 끝난 모양이라고 짐작했지만, 그것은 내 인상일 뿐이다. 점심에 동료에게서 예산안이 아직 통과되지 않았다는 이야기를 들었다. 이 이야기는 회의 참석자가 아니라 준비 담당자에게서 나왔으므로, 최종 판단과 다를 성싶다. 오후에 팀장님께 확인하니, 회의는 예정대로 끝났고 예산안은 다음 주에 다시 논의한다고 했다. 직접 본 장면과 들은 이야기, 그리고 내가 만든 짐작을 구분해 두면, 나중에 틀렸을 때 무엇을 고쳐야 하는지 알 수 있다.",
    "Ontem à tarde, a reunião da nossa equipe terminou antes do previsto. Não entrei na sala de reunião; apenas vi as expressões das pessoas que saíam pelo corredor. Duas conversavam sorrindo, e uma desceu de elevador em silêncio. Imaginei que a reunião devia ter terminado bem, mas isso é apenas uma impressão minha. No almoço, ouvi de um colega que o orçamento ainda não tinha sido aprovado. Como essa informação veio de quem cuidava da preparação, e não de quem participou da reunião, é provável que seja diferente do julgamento final. À tarde, confirmei com a chefe de equipe: a reunião terminou conforme o previsto, e o orçamento seria discutido de novo na semana seguinte. Se eu mantiver separados a cena que vi, a história que ouvi e a suposição que fiz, saberei o que corrigir caso esteja errado.",
    "Exemplo original. Observe como cada via de informação recebe uma marca diferente. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l17 — ironia, distância e pista textual. */
export const C1_L17 = defineC1Lesson({
  id: "c1-l17", number: 17, moduleId: "c1-m04", title: "O que a ironia faz",
  objective: "Reconhecer ironia e distância sem tomar o enunciado literalmente.",
  prerequisites: ["c1-l16"], estimatedMinutes: 80, dialogueTitle: "Elogio com segunda camada",
  intro: [
    {
      title: "Ironia não é mentira",
      body: "Na ironia, o enunciado literal e a intenção não coincidem, mas o falante não está simplesmente mentindo. Ele conta com um contexto compartilhado para que o outro perceba a distância. Por isso a ironia é frágil: depende de quem ouve, do tom, do momento e do que já se sabe. Quando essa base falta, o elogio irônico é lido como elogio sincero — ou como ofensa. Reconhecer ironia é, antes de tudo, admitir que a interpretação é uma hipótese.",
      ko: "반어는 말의 내용과 말하려는 뜻이 어긋날 때 생긴다.",
    },
    {
      title: "Discurso: a pista está no texto, não só no tom",
      body: "Em textos escritos não há voz para carregar a ironia, então ela precisa de pistas formais: repetição de um elogio que perde força, uma concessão que chega tarde, um adjetivo positivo colado a um detalhe negativo, aspas que citam sem assumir, um fecho que promete e retira ao mesmo tempo. Essas pistas não provam a ironia; elas tornam a leitura irônica defensável. Ao interpretar, cite a pista e marque a conclusão como leitura possível, não como fato.",
      ko: "칭찬 뒤에 붙는 구체적인 지적이 반어의 단서가 된다.",
    },
  ],
  dialogue: [
    ["하나", "도윤 씨, 이번 발표 정말 대단하던데요.", "Doyun, a sua apresentação desta vez foi realmente impressionante."],
    ["도윤", "대단하기는요. 자료 절반은 어제 밤에 겨우 채웠어요.", "Imagina. Metade do material eu preenchi às pressas ontem à noite."],
    ["하나", "그래도 흐름은 깔끔했어요. 특히 첫 장이 인상적이었고요. 작년 자료를 거의 그대로 쓰셨는데도요.", "Ainda assim, o encadeamento estava limpo. O primeiro slide foi especialmente marcante. Mesmo tendo usado quase literalmente o material do ano passado."],
    ["도윤", "작년 자료라니요? 아, 틀만 다시 쓴 거예요. 내용은 새로 채웠고요.", "Como assim, material do ano passado? Ah, eu só reaproveitei o modelo. O conteúdo foi todo novo."],
    ["하나", "그럼 제가 잘못 들었네요. 그런데 첫 장만 글꼴이 달라서 조금 어색했어요.", "Então eu ouvi errado. Mas só o primeiro slide tinha uma fonte diferente, e isso ficou um pouco estranho."],
    ["도윤", "거기만 어제 급하게 고쳤거든요. 티가 많이 났나요?", "Foi o único ponto que corrigi às pressas ontem. Ficou muito evidente?"],
    ["하나", "조금요. 아무도 말하지 않았지만, 다들 눈치챘을 성싶어요.", "Um pouco. Ninguém falou nada, mas é provável que todos tenham percebido."],
    ["도윤", "다음에는 자료를 미리 공유할게요. 처음에는 칭찬인 줄 알았는데, 듣고 보니 조금 다른 뜻이 있었네요.", "Da próxima vez vou compartilhar o material com antecedência. No começo achei que era um elogio, mas, ouvindo bem, havia um outro sentido."],
  ],
  readingText: {
    titlePt: "Lê-se como elogio, mas não é só isso",
    paragraphs: [
      "이 전시를 두고 ‘올해 가장 친절한 기획’이라고 쓴 리뷰가 있었다. 문장만 보면 칭찬이 분명하다. 그러나 같은 글에는 관람 동선이 세 번 끊긴다는 지적이 함께 붙어 있다. 친절하다는 말과 동선이 끊긴다는 사실이 한 문단에 나란히 놓이면, 앞의 칭찬은 더 이상 순수한 칭찬으로 읽히지 않는다. 필자는 좋은 점을 말하면서 동시에 불편을 기록하고 있는 것이다. 독자는 이 글이 어느 쪽에 무게를 두는지 스스로 판단해야 한다.",
      "두 번째 단서는 반복이다. 글은 ‘훌륭한 시도’라는 표현을 네 번 쓰지만, 그때마다 곧바로 구체적인 문제를 덧붙인다. 사진의 크기가 설명과 맞지 않는다든지, 관람객이 많은 시간에는 작품을 제대로 볼 수 없다든지 하는 식이다. 칭찬이 반복될수록 오히려 그 칭찬의 무게는 가벼워진다. 필자가 진심으로 감탄했다면 같은 말을 네 번 반복할 이유가 없기 때문이다. 여기서 반어는 말의 내용이 아니라 배열에서 생긴다.",
      "물론 이 글을 완전한 비판으로 읽을 필요는 없다. 필자는 전시의 관점이 신선하다고 인정하고, 다시 보고 싶은 작품도 구체적으로 적었다. 문제는 그 인정이 마지막 문장에서 갑자기 힘을 잃는다는 점이다. ‘다음에는 더 나은 기억으로 남기를’이라는 문장은 축복이면서 동시에 유보다. 우리는 이런 문장을 문자 그대로 받아들일 수도 있고, 거리 두기로 읽을 수도 있다. 어느 쪽이 맞는지는 글 전체의 배열과 독자가 아는 맥락에 달려 있다.",
    ],
    pt: "Sobre esta exposição, houve uma resenha que a chamou de “a programação mais acolhedora do ano”. Só pelas frases, o elogio é claro. No mesmo texto, porém, vem junto a crítica de que o percurso de visita foi interrompido três vezes. Quando a palavra “acolhedora” e o fato de o percurso ser interrompido aparecem lado a lado no mesmo parágrafo, o elogio anterior já não se lê como elogio puro. A autora fala dos pontos positivos e, ao mesmo tempo, registra o incômodo. Cabe ao leitor julgar para que lado o texto pende. A segunda pista é a repetição. O texto usa a expressão “tentativa louvável” quatro vezes, mas a cada vez acrescenta imediatamente um problema concreto. Seja porque o tamanho das fotos não corresponde à explicação, seja porque, nos horários de maior público, não se consegue ver as obras direito. Quanto mais o elogio se repete, mais leve fica o seu peso. Se a autora tivesse se impressionado de verdade, não haveria motivo para repetir a mesma frase quatro vezes. Aqui a ironia nasce da disposição das partes, não do conteúdo das palavras. É claro que não é preciso ler esse texto como crítica integral. A autora reconhece que o ponto de vista da exposição é original e indica concretamente obras que gostaria de rever. O problema é que esse reconhecimento perde força de repente na última frase. A frase “que da próxima vez fique uma lembrança melhor” é ao mesmo tempo uma bênção e uma ressalva. Podemos tomar essa frase ao pé da letra ou lê-la como distanciamento. Qual das duas leituras é correta depende da disposição do texto inteiro e do contexto que o leitor conhece.",
    objective: "Localizar a pista textual que sustenta a leitura irônica de um elogio.",
  },
  reusedIds: ["ko:관점", "ko:기억", "ko:흐름", "ko:단서"],
  grammar: [
    [
      "-기는요 — imagina; que nada (negação polida)",
      "동사/형용사 + -기는요 (구어)",
      "Rebaixa ou recusa de modo polido um elogio, uma suposição ou uma avaliação do interlocutor. Soa como “imagina” ou “que nada”. Pode ser humildade sincera ou ironia, conforme o tom e o contexto. Não se usa para corrigir um fato com informação nova; nesse caso, -ㄴ/는걸요 é mais adequado. A forma aparece sobretudo na fala e em mensagens informais.",
      [
        ["자료를 다 준비하셨다면서요? — 준비하기는요. 아직 절반도 못 했어요.", "Disseram que você preparou todo o material? — Preparar o quê. Ainda não fiz nem metade."],
        ["발표가 아주 좋았다면서요. — 좋기는요. 중간에 순서를 두 번이나 바꿨어요.", "Disseram que a apresentação foi ótima. — Ótima, imagina. Mudei a ordem duas vezes no meio."],
      ],
    ],
    [
      "-다니요 — como assim? surpresa ou discordância",
      "동사/형용사 + -다니요 / 명사 + (이)라니요",
      "Expressa surpresa ou descrença diante do que o interlocutor acabou de dizer, pedindo confirmação ou correção. Não serve para simples desconhecimento; para isso, use -ㄴ/는지 몰랐다. Se o tom sobe, pode soar como discordância forte; em contexto polido, costuma vir acompanhada de uma reformulação ou de um pedido de esclarecimento.",
      [
        ["첫 장이 작년 자료라니요? 저는 완전히 새로 만든 줄 알았어요.", "Como assim, o primeiro slide é material do ano passado? Eu achei que fosse totalmente novo."],
        ["회의가 취소됐다니요? 아까는 정상적으로 열린다고 들었는데요.", "Como assim, a reunião foi cancelada? Ouvi há pouco que aconteceria normalmente."],
      ],
    ],
  ],
  guided: [
    mcq("Qual traço do texto sustenta a leitura irônica do elogio?", ["A repetição de um elogio seguida sempre de um problema concreto.", "O uso de uma única frase curta no início.", "A ausência total de críticas ao longo do texto."], "A repetição de um elogio seguida sempre de um problema concreto.", "O elogio perde força porque cada repetição vem acompanhada de uma objeção específica."),
    cloze("Complete a análise: 친절하다는 칭찬과 동선에 대한 지적이 한 문단에 놓이면, 여기서 ___는 말의 내용이 아니라 배열에서 생긴다.", "반어", "A ironia, aqui, é produzida pela disposição dos enunciados no parágrafo."),
    listen("Ouça e escreva como a colega rebaixa o próprio trabalho.", "대단하기는요. 자료 절반은 어제 밤에 겨우 채웠어요.", "대단하기는요. 자료 절반은 어제 밤에 겨우 채웠어요.", "Imagina. Metade do material eu preenchi às pressas ontem à noite."),
    reading("글은 ‘훌륭한 시도’라는 표현을 네 번 쓰지만, 그때마다 곧바로 구체적인 문제를 덧붙인다. 칭찬이 반복될수록 오히려 그 칭찬의 무게는 가벼워진다.", "Por que a repetição enfraquece o elogio?", ["Porque cada repetição vem seguida de uma crítica concreta.", "Porque o texto usa palavras difíceis demais.", "Porque o elogio aparece uma única vez."], "Porque cada repetição vem seguida de uma crítica concreta.", "A repetição não reforça o elogio: ela o esvazia ao justapor problemas específicos."),
    translate("pt-ko", "Traduza: “Como assim, o primeiro slide é material do ano passado?”", "첫 장이 작년 자료라니요?", "-다니요 expressa surpresa ou descrença diante do que foi dito."),
  ],
  independent: [
    mcq("Em qual situação -기는요 soa natural?", ["Ao recusar com modéstia um elogio recebido.", "Ao informar um horário de reunião.", "Ao pedir desculpas por um atraso grave."], "Ao recusar com modéstia um elogio recebido.", "-기는요 rebaixa de modo polido o que o outro acabou de dizer, tipicamente um elogio."),
    cloze("Complete a pergunta de surpresa: ‘작년 자료___?’라고 되물었다.", "라니요", "Com substantivo, a forma é (이)라니요: 작년 자료라니요?"),
    listen("Ouça e escreva a leitura que o colega faz do próprio elogio.", "처음에는 칭찬인 줄 알았는데, 듣고 보니 조금 다른 뜻이 있었네요.", "처음에는 칭찬인 줄 알았는데, 듣고 보니 조금 다른 뜻이 있었네요.", "No começo achei que era um elogio, mas, ouvindo bem, havia um outro sentido."),
    translate("ko-pt", "Traduza: ‘다음에는 더 나은 기억으로 남기를’이라는 문장은 축복이면서 동시에 유보다.", "A frase “que da próxima vez fique uma lembrança melhor” é ao mesmo tempo uma bênção e uma ressalva.", "동시에 = ao mesmo tempo; 유보 = ressalva, reserva."),
    reading("필자는 전시의 관점이 신선하다고 인정하고, 다시 보고 싶은 작품도 구체적으로 적었다. 문제는 그 인정이 마지막 문장에서 갑자기 힘을 잃는다는 점이다.", "Como o texto descreve o fecho da resenha?", ["O reconhecimento inicial perde força na última frase.", "A resenha termina com um elogio sem reservas.", "A autora retira tudo o que havia elogiado."], "O reconhecimento inicial perde força na última frase.", "O fecho mantém o elogio e a ressalva juntos, e é essa ambiguidade que sustenta a ironia."),
  ],
  summary: [
    "Ironia é a distância entre o enunciado literal e a intenção, sustentada por contexto compartilhado.",
    "-기는요 rebaixa ou recusa um elogio de modo polido e pode ser sincero ou irônico.",
    "-다니요 marca surpresa ou descrença diante do que o outro acabou de dizer.",
    "Em texto escrito, a pista da ironia está na repetição, na justaposição e no fecho ambíguo.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · reinterpretar um elogio",
    "Escolha uma resenha, comentário ou mensagem em que o elogio pareça ambíguo. Descreva a pista que sustenta a leitura irônica e reescreva o mesmo conteúdo como crítica explícita e polida.",
    "칭찬처럼 보이는 문장을 비판으로 다시 써 보세요.",
    ["Cite a pista textual antes de interpretar.", "Apresente a ironia como leitura possível, não como fato.", "Use -기는요 ou -다니요 uma vez, de forma coerente com a cena.", "Na reescrita, mantenha a crítica específica e retire a ambiguidade."],
    ["Pista textual citada.", "Interpretação marcada como hipótese.", "Uma forma do módulo usada com naturalidade.", "Reescrita polida e específica.", "Fechamento que diz o que se ganha e o que se perde ao explicitar."],
    "전시 리뷰에는 ‘올해 가장 친절한 기획’이라는 문장이 있다. 그러나 같은 문단에서 관람 동선이 세 번 끊긴다고 지적한다. 이 배열을 보면 앞의 칭찬은 순수한 칭찬이 아니라 거리 두기로 읽힌다. 물론 이것은 하나의 해석이다. 필자가 정말로 친절하다고 느꼈을 수도 있다. 다만 ‘훌륭한 시도’라는 말을 네 번 반복하면서 매번 구체적인 문제를 붙인 점은 우연으로 보기 어렵다. 이 글을 비판으로 다시 쓰면 다음과 같다. 전시의 관점은 신선하지만, 동선이 세 번 끊기고 작품 크기와 설명이 맞지 않아 관람 경험이 자주 방해받는다. 다음 기획에서는 동선과 설명을 먼저 점검해 주기 바란다. 이렇게 쓰면 인상은 덜 세련되지만, 독자는 무엇이 문제인지 분명히 알 수 있다.",
    "A resenha da exposição tem a frase “a programação mais acolhedora do ano”. No mesmo parágrafo, porém, ela critica que o percurso de visita foi interrompido três vezes. Vendo essa disposição, o elogio anterior se lê não como elogio puro, mas como distanciamento. É claro que esta é uma interpretação. Pode ser que a autora realmente tenha achado a mostra acolhedora. Só que repetir “tentativa louvável” quatro vezes, acrescentando sempre um problema concreto, dificilmente é coincidência. Se reescrevermos o texto como crítica, ficaria assim: o ponto de vista da exposição é original, mas o percurso é interrompido três vezes e o tamanho das obras não corresponde à explicação, o que atrapalha com frequência a experiência de visita. Na próxima curadoria, pedimos que verifiquem primeiro o percurso e as legendas. Escrito assim, o texto perde elegância, mas o leitor entende com clareza qual é o problema.",
    "Exemplo original. A interpretação vem ancorada em uma pista e a reescrita explicita a crítica. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l18 — força da avaliação, atenuação e intensificação. */
export const C1_L18 = defineC1Lesson({
  id: "c1-l18", number: 18, moduleId: "c1-m04", title: "Atenuar e intensificar",
  objective: "Ajustar a força de uma avaliação conforme o risco e o destinatário.",
  prerequisites: ["c1-l17"], estimatedMinutes: 80, dialogueTitle: "A crítica que precisa passar",
  intro: [
    {
      title: "Força não é o mesmo que verdade",
      body: "Duas frases podem descrever o mesmo fato e assumir responsabilidades diferentes. “Este livro fracassou” compromete o enunciador com uma avaliação total; “há partes que ficaram aquém da expectativa” compromete-o com um recorte. Atenuar não é ser frouxo: é dizer com precisão até onde a avaliação vai. Intensificar também tem custo: quanto mais forte o juízo, maior a exigência de evidência e maior a exposição de quem o faz.",
      ko: "같은 사실도 표현의 강도에 따라 다른 책임을 만든다.",
    },
    {
      title: "Discurso: força, risco e destinatário",
      body: "A escolha da força depende de três fatores: o tamanho do risco para quem recebe, a distância entre os interlocutores e a solidez da evidência. Com um chefe, um autor ou alguém em posição vulnerável, a atenuação protege a relação sem abandonar o conteúdo. Com um problema grave e comprovado, a intensificação pode ser necessária para que a responsabilidade não se dilua. O erro é escolher a força pelo hábito, e não pela situação.",
      ko: "근거가 약할수록 단정의 강도를 낮추고, 근거가 분명할수록 책임의 범위를 밝힌다.",
    },
  ],
  dialogue: [
    ["서윤", "이 문단, 지금 표현이 조금 노골적이에요.", "Este parágrafo, do jeito que está, ficou um pouco direto demais."],
    ["태호", "그렇게까지요? ‘이 책은 실패했다’는 문장인데요.", "Tanto assim? É a frase “este livro fracassou”."],
    ["서윤", "사실과 가깝더라도, 이대로 보내면 독자는 저자를 공격하는 글로 읽을 수 있어요.", "Mesmo que esteja próxima dos fatos, se enviarmos assim o leitor pode ler como um ataque ao autor."],
    ["태호", "그럼 어떻게 바꾸면 좋을까요?", "Então como seria bom mudar?"],
    ["서윤", "근거를 먼저 놓고, 평가의 강도를 낮춰 보세요. ‘기대에 미치지 못한 부분이 있다’ 정도면 충분해요.", "Coloque primeiro a evidência e baixe a intensidade da avaliação. Algo como “há partes que ficaram aquém da expectativa” já basta."],
    ["태호", "너무 약해 보이지 않을까요?", "Não vai parecer fraco demais?"],
    ["서윤", "약한 게 아니라 정확한 거예요. 비판은 남기되 단정은 줄이는 거죠. 대신 근거는 더 분명하게 쓰세요.", "Não é fraco: é preciso. A crítica permanece, mas a afirmação categórica diminui. Em troca, deixe a evidência mais clara."],
    ["태호", "알겠습니다. 지적은 유지하고 표현만 누그러뜨려 볼게요.", "Entendido. Vou manter a crítica e apenas suavizar a expressão."],
  ],
  readingText: {
    titlePt: "Duas resenhas, duas responsabilidades",
    paragraphs: [
      "같은 책을 다룬 두 편의 서평이 있다. 첫 번째 글은 ‘이 책은 실패했다’고 단정한다. 두 번째 글은 ‘기대에 미치지 못한 부분이 있다’고 쓴다. 두 문장은 같은 불만을 담고 있지만, 독자에게 요구하는 동의의 수준이 다르다. 첫 번째 문장은 저자의 능력 전체를 문제로 만들고, 두 번째 문장은 특정 부분의 성취를 인정하면서 논점을 좁힌다. 평가의 강도를 낮춘다고 해서 비판이 사라지는 것은 아니다. 오히려 책임의 범위가 분명해진다.",
      "두 번째 글에는 완곡한 표현이 여러 번 나온다. ‘다소 아쉽다’, ‘조금은 서두르는 편이다’, ‘설명이 반복되는 감이 없지 않다’ 같은 문장이다. 이런 표현은 약해 보이지만, 근거를 붙이면 오히려 정확해진다. 예를 들어 3장의 사례가 1장의 주장과 어긋난다는 지적은 완곡하게 써도 힘을 잃지 않는다. 반대로 근거 없이 ‘형편없다’고 쓰면, 감정의 강도만 남고 판단의 근거는 흐려진다.",
      "물론 모든 비판을 완곡하게 써야 하는 것은 아니다. 피해가 분명한 사안에서는 단호한 표현이 필요하다. 문제는 강도와 근거가 서로 맞는가이다. 이 책에 대한 두 번째 서평이 더 설득력 있는 이유도 여기에 있다. 필자는 아쉬움을 숨기지 않으면서도, 무엇을 근거로 그렇게 판단했는지 밝힌다. 독자는 문장의 세기보다 근거의 무게를 먼저 보아야 한다. 그럴 때 평가는 취향에서 판단으로 넘어간다.",
    ],
    pt: "Há duas resenhas sobre o mesmo livro. O primeiro texto afirma categoricamente: “este livro fracassou”. O segundo escreve: “há partes que ficaram aquém da expectativa”. As duas frases carregam o mesmo descontentamento, mas exigem do leitor um nível diferente de concordância. A primeira transforma toda a capacidade do autor em problema; a segunda reconhece o êxito de partes específicas e estreita o ponto em discussão. Baixar a intensidade da avaliação não faz a crítica desaparecer. Pelo contrário, torna mais claro o alcance da responsabilidade. No segundo texto aparecem várias expressões atenuadas: “é um tanto lamentável”, “tende a ser um pouco apressado”, “não deixa de haver uma sensação de que a explicação se repete”. Essas expressões parecem fracas, mas, quando recebem evidência, tornam-se mais precisas. Por exemplo, a crítica de que o caso do capítulo 3 contradiz a tese do capítulo 1 não perde força por ser escrita de forma atenuada. Ao contrário, escrever “é péssimo” sem evidência deixa apenas a intensidade da emoção e turva a base do julgamento. É claro que não se deve escrever toda crítica de forma atenuada. Em questões com dano evidente, é necessária uma expressão firme. O problema é se intensidade e evidência combinam. É também por isso que a segunda resenha deste livro é mais persuasiva. A autora não esconde o descontentamento, mas deixa claro com base em que julga assim. O leitor deve olhar o peso da evidência antes da força da frase. É aí que a avaliação passa de preferência a julgamento.",
    objective: "Reconhecer como a atenuação redistribui a responsabilidade do enunciador.",
  },
  reusedIds: ["ko:근거", "ko:설득력", "ko:편집", "ko:독자"],
  grammar: [
    [
      "-ㄴ/는 편이다 — tende a; está mais para",
      "동사 + -는 편이다 / 형용사 + -(으)ㄴ 편이다",
      "Situa uma característica em relação a uma norma ou a outros casos, como “tende a” ou “é relativamente”. É mais brando que uma afirmação direta e costuma aparecer com 다소, 비교적, 대체로. Não serve para um acontecimento único: descreve regularidade ou tendência. Em avaliações, permite reconhecer um traço sem transformá-lo em regra absoluta.",
      [
        ["이 책은 설명이 반복되는 편이지만, 사례는 구체적이다.", "Este livro tende a repetir explicações, mas os exemplos são concretos."],
        ["그 편집자는 비판을 완곡하게 쓰는 편이다.", "Esse editor costuma escrever as críticas de forma atenuada."],
      ],
    ],
    [
      "-기 그지없다 — extremamente; não ter fim",
      "형용사 + -기 그지없다",
      "Intensifica uma avaliação de modo literário e afetivo, mais forte que 매우 ou 아주. Aparece com adjetivos de emoção ou julgamento, como 안타깝다, 답답하다, 부끄럽다, 아쉽다. Não combine com fatos neutros nem use em conversa casual; o efeito é de escrito elaborado. A forma também deixa claro que a intensidade é do enunciador, não uma propriedade objetiva do fato.",
      [
        ["근거 없이 단정하는 태도는 안타깝기 그지없다.", "É extremamente lamentável a postura de afirmar categoricamente sem evidência."],
        ["자료를 공개하지 않은 점은 답답하기 그지없다.", "O fato de não terem divulgado os dados é extremamente frustrante."],
      ],
    ],
  ],
  guided: [
    mcq("O que a atenuação muda em uma avaliação?", ["O alcance da responsabilidade assumida pelo enunciador.", "A verdade dos fatos descritos.", "A necessidade de apresentar evidências."], "O alcance da responsabilidade assumida pelo enunciador.", "A atenuação redistribui a responsabilidade e delimita o alcance do juízo, sem alterar os fatos."),
    cloze("Complete a tendência: 이 책은 설명이 반복되는 ___.", "편이다", "-ㄴ/는 편이다 descreve uma tendência relativa, não uma regra absoluta."),
    listen("Ouça e escreva o que a atenuação não faz.", "평가의 강도를 낮춘다고 해서 비판이 사라지는 것은 아니다.", "평가의 강도를 낮춘다고 해서 비판이 사라지는 것은 아니다.", "Baixar a intensidade da avaliação não faz a crítica desaparecer."),
    reading("같은 책을 다룬 두 편의 서평이 있다. 첫 번째 문장은 저자의 능력 전체를 문제로 만들고, 두 번째 문장은 특정 부분의 성취를 인정하면서 논점을 좁힌다. 두 문장은 같은 불만을 담고 있지만 요구하는 동의의 수준이 다르다.", "Qual é a diferença entre as duas resenhas?", ["A segunda restringe a crítica a partes específicas e reconhece êxitos.", "A primeira é mais bem escrita que a segunda.", "A segunda não faz nenhuma crítica."], "A segunda restringe a crítica a partes específicas e reconhece êxitos.", "A segunda resenha estreita o alvo e admite o que funcionou, sem retirar a crítica."),
    translate("pt-ko", "Traduza: “Este livro tende a repetir as explicações.”", "이 책은 설명이 반복되는 편이다.", "-ㄴ/는 편이다 expressa tendência relativa em registro neutro.", ["이 책은 설명이 반복되는 편이에요."]),
  ],
  independent: [
    mcq("Qual frase usa -기 그지없다 de forma adequada?", ["그 결정이 아쉽기 그지없다.", "그 결정은 내일 발표되기 그지없다.", "그 결정을 그지없다 발표했다."], "그 결정이 아쉽기 그지없다.", "-기 그지없다 liga-se a adjetivos de avaliação ou emoção, não a verbos de ação."),
    cloze("Complete a intensificação: 근거 없이 단정하는 태도는 안타깝기 ___.", "그지없다", "-기 그지없다 intensifica uma avaliação afetiva em registro elaborado."),
    listen("Ouça e escreva o critério que impede a crítica vazia.", "근거 없이 ‘형편없다’고 쓰면, 감정의 강도만 남고 판단의 근거는 흐려진다.", "근거 없이 ‘형편없다’고 쓰면, 감정의 강도만 남고 판단의 근거는 흐려진다.", "Escrever “é péssimo” sem evidência deixa apenas a intensidade da emoção e turva a base do julgamento."),
    translate("ko-pt", "Traduza: 이 책에 대한 두 번째 서평이 더 설득력 있는 이유도 여기에 있다.", "É também por isso que a segunda resenha deste livro é mais persuasiva.", "설득력 = poder de persuasão; 이유도 여기에 있다 = a razão está também aqui."),
    reading("물론 모든 비판을 완곡하게 써야 하는 것은 아니다. 피해가 분명한 사안에서는 단호한 표현이 필요하다. 문제는 강도와 근거가 서로 맞는가이다. 그럴 때 평가는 취향에서 판단으로 넘어간다.", "Quando a intensificação é defendida no texto?", ["Quando há dano evidente e a força corresponde à evidência.", "Sempre que o autor está irritado.", "Nunca, porque toda crítica deve ser atenuada."], "Quando há dano evidente e a força corresponde à evidência.", "O texto não condena a intensificação em si; exige que ela corresponda à evidência e ao dano."),
  ],
  summary: [
    "A força de uma avaliação define a responsabilidade que o enunciador assume.",
    "-ㄴ/는 편이다 descreve tendências relativas e evita transformar um traço em regra.",
    "-기 그지없다 intensifica avaliações afetivas em registro literário.",
    "Atenuar não apaga a crítica; intensificar exige evidência proporcional.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · duas versões de uma crítica",
    "Escreva duas versões da mesma crítica a um texto, projeto ou serviço: uma atenuada, para preservar a relação de trabalho, e uma firme, para um registro interno. Mantenha o mesmo conteúdo e mostre o que muda na responsabilidade.",
    "같은 비판을 두 가지 강도로 써 보세요.",
    ["Escolha um objeto concreto e uma falha verificável.", "Na versão atenuada, use -ㄴ/는 편이다 e uma expressão de moderação.", "Na versão firme, use -기 그지없다 uma vez, com evidência ao lado.", "Termine dizendo o que cada versão ganha e o que arrisca."],
    ["Duas versões do mesmo conteúdo.", "Atenuação com tendência relativa.", "Intensificação ancorada em evidência.", "Diferença de responsabilidade explicitada.", "Fechamento com risco e ganho de cada versão."],
    "이 보고서는 자료 정리가 대체로 꼼꼼한 편이지만, 결론 부분은 다소 서두르는 감이 없지 않다. 특히 3장의 사례와 1장의 주장이 어긋나는데도, 그 차이를 설명하는 문장이 없다. 이 점은 아쉽기 그지없다. 내부 검토용으로는 더 분명하게 쓸 수 있다. 결론은 근거 없이 단정되어 있고, 3장의 사례는 1장의 주장을 반박한다. 따라서 결론을 다시 쓰거나, 반대 사례를 다루는 절을 추가해야 한다. 두 버전은 같은 문제를 가리키지만, 첫 번째는 관계를 지키고 두 번째는 책임을 분명히 한다. 어느 쪽이든 근거를 함께 제시해야 설득력이 생긴다.",
    "Este relatório tende a organizar os dados com bastante cuidado, mas a conclusão passa um pouco a impressão de pressa. Em especial, o caso do capítulo 3 contradiz a tese do capítulo 1, e não há nenhuma frase que explique essa diferença. Esse ponto é extremamente lamentável. Para uso em revisão interna, é possível escrever com mais clareza: a conclusão afirma sem evidência, e o caso do capítulo 3 refuta a tese do capítulo 1. Portanto, é preciso reescrever a conclusão ou acrescentar uma seção que trate dos casos contrários. As duas versões apontam o mesmo problema, mas a primeira preserva a relação e a segunda torna clara a responsabilidade. Em qualquer das duas, é preciso apresentar a evidência junto para haver poder de persuasão.",
    "Exemplo original. As duas versões dizem o mesmo com forças diferentes. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l19 — honoríficos, tratamento e coerência de registro. */
export const C1_L19 = defineC1Lesson({
  id: "c1-l19", number: 19, moduleId: "c1-m04", title: "Registro e honoríficos",
  objective: "Adequar honoríficos, formas de tratamento e registro ao contexto institucional.",
  prerequisites: ["c1-l18"], estimatedMinutes: 80, dialogueTitle: "Duas mensagens, dois destinatários",
  intro: [
    {
      title: "Honrar o sujeito e honrar o ouvinte",
      body: "O coreano distribui a cortesia em dois eixos. O honorífico de sujeito -시- marca quem é o sujeito da frase; a terminação -(으)십니다 marca ao mesmo tempo o sujeito honorificado e a distância formal em relação a quem ouve. Confundir os eixos produz frases gramaticalmente possíveis e socialmente estranhas, como elevar a própria ação diante de alguém que deveria ser exaltado. O sistema também usa formas supletivas: 계시다, 드시다, 주무시다, 말씀하시다.",
      ko: "높임은 주어를 높이는 표지와 듣는 사람을 높이는 종결로 나뉜다.",
    },
    {
      title: "Discurso: coerência vale mais que intensidade",
      body: "Não existe um único grau de polidez correto: existe o grau adequado a cada destinatário e a cada gênero. O problema aparece quando a cortesia oscila dentro do mesmo texto. Uma saudação em 합쇼체 seguida de um pedido em 해요체, ou um vocativo cerimonioso seguido de 반말, faz o leitor procurar uma intenção que talvez não exista. Em mensagens institucionais, escolha o grau na primeira linha e mantenha-o até o fecho.",
      ko: "한 사람에게 보내는 글 안에서는 높임의 정도를 끝까지 유지한다.",
    },
  ],
  dialogue: [
    ["지은", "선배님, 이 메일을 부장님께 보내려는데, 이 표현이 실례가 될까요?", "Sunbae, vou enviar este e-mail ao diretor; essa expressão pode ser falta de respeito?"],
    ["민재", "어떤 부분이요?", "Que parte?"],
    ["지은", "‘자료를 다시 보내 주세요’라고 썼어요.", "Escrevi “envie o material de novo, por favor”."],
    ["민재", "내용은 맞지만, 부장님께는 조금 더 공손하게 쓰는 게 좋아요. ‘다시 보내 주시기 바랍니다’ 정도면 자연스럽고요.", "O conteúdo está certo, mas ao diretor é melhor escrever com mais cortesia. Algo como “peço que envie novamente” fica natural."],
    ["지은", "그런데 같은 내용을 옆자리 과장님께는 어떻게 쓸까요?", "Mas o mesmo conteúdo para o gerente ao lado, como devo escrever?"],
    ["민재", "과장님께도 존칭은 쓰지만, 부장님께 쓰는 것만큼 격식을 갖출 필요는 없어요. 위계에 따라 호칭과 끝맺음을 조금씩 조정하는 거죠.", "Ao gerente também se usa tratamento honorífico, mas não é preciso tanta formalidade quanto com o diretor. Ajustamos aos poucos a forma de tratamento e o fecho conforme a hierarquia."],
    ["지은", "그러면 한 메일 안에서 높임의 정도가 달라져도 괜찮은가요?", "Então não há problema se o grau de reverência mudar dentro de um mesmo e-mail?"],
    ["민재", "받는 사람이 다르면 괜찮아요. 다만 한 사람에게 보내는 글 안에서는 처음부터 끝까지 같은 정도를 유지해야 해요. 그래야 무례하게 읽히지 않아요.", "Se os destinatários são diferentes, não há problema. Mas dentro de um texto enviado a uma só pessoa é preciso manter o mesmo grau do começo ao fim. Só assim não soa descortês."],
  ],
  readingText: {
    titlePt: "O mesmo assunto em dois registros",
    paragraphs: [
      "같은 회의 일정을 두고 두 통의 메시지가 오갔다. 첫 번째는 팀장에게 보낸 글이고, 두 번째는 같은 팀 동료에게 보낸 글이다. 첫 번째 글은 ‘회의 자료를 금요일까지 제출해 주시기 바랍니다’로 시작해 ‘확인 부탁드립니다’로 끝난다. 두 번째 글은 ‘자료 금요일까지 보내 줄 수 있어?’로 시작해 ‘고마워’로 끝난다. 두 글의 내용은 같지만, 독자가 느끼는 거리는 전혀 다르다.",
      "첫 번째 글에는 주어를 높이는 표지가 반복된다. ‘팀장님께서 확인하셨습니다’, ‘자료를 검토하셨습니다’ 같은 문장이다. 여기서 -시-는 단순한 예의가 아니라, 누가 결정권을 가진 사람인지 드러내는 장치다. 반면 두 번째 글에는 그 표지가 거의 없다. 대신 ‘나’, ‘우리’ 같은 표현이 자주 나오고, 문장의 끝도 짧다. 이 차이는 위계가 없다는 뜻이 아니라, 같은 위계 안에서 친밀함을 선택했다는 뜻이다.",
      "두 글은 모두 공손하다. 다만 공손함의 종류가 다르다. 첫 번째 글은 격식을 통해 상대의 지위를 인정하고, 두 번째 글은 친밀함을 통해 상대와의 관계를 확인한다. 이때 중요한 것은 한 글 안에서 태도가 흔들리지 않는 것이다. 인사는 격식을 갖추었는데 본문이 반말로 바뀌면, 독자는 그 불일치를 무례나 실수로 읽는다. 이 두 메시지가 주장하는 바는 같지만, 독자에게 남기는 인상은 전혀 다르다.",
    ],
    pt: "Duas mensagens trocadas trataram do mesmo assunto, o horário de uma reunião. A primeira foi enviada à chefe de equipe; a segunda, a um colega da mesma equipe. O primeiro texto começa com “peço que envie o material da reunião até sexta-feira” e termina com “peço a confirmação”. O segundo começa com “dá para me mandar o material até sexta?” e termina com “obrigado”. O conteúdo é o mesmo, mas a distância que o leitor sente é completamente diferente. No primeiro texto, repetem-se as marcas que elevam o sujeito: “a chefe confirmou”, “ela revisou o material”. Aqui, -시- não é simples cortesia: é um dispositivo que mostra quem detém o poder de decisão. No segundo texto, essas marcas quase não aparecem. Em vez disso, surgem com frequência expressões como “eu” e “nós”, e as frases terminam de forma mais curta. Essa diferença não significa ausência de hierarquia, mas a escolha da intimidade dentro da mesma hierarquia. Os dois textos são polidos. Apenas o tipo de polidez é diferente. O primeiro reconhece a posição do outro por meio da formalidade; o segundo confirma a relação por meio da proximidade. O importante, aqui, é que a atitude não oscile dentro de um mesmo texto. Se a saudação é formal e o corpo passa para o 반말, o leitor interpreta essa incoerência como descortesia ou erro. As duas mensagens defendem o mesmo ponto, mas a impressão que deixam no leitor é totalmente diferente.",
    objective: "Comparar honoríficos, tratamento e distância nas duas mensagens.",
  },
  reusedIds: ["ko:주장", "ko:독자", "ko:격식", "ko:함의"],
  grammar: [
    [
      "-시- — marca de sujeito honorificado",
      "동사/형용사 어간 + -시- (주어 높임)",
      "Honra o sujeito da frase, não o ouvinte. Com alguns verbos, usa-se a forma supletiva: 있다 → 계시다, 먹다 → 드시다, 자다 → 주무시다, 말하다 → 말씀하시다. Não se usa -시- para a própria ação em contextos em que o falante se apresenta como inferior, salvo em citações ou fórmulas indiretas. Se o sujeito muda no meio do texto, a marca deve mudar com ele; caso contrário, o leitor perde a pista de quem é exaltado.",
      [
        ["팀장님께서 자료를 검토하셨습니다.", "A chefe de equipe revisou o material."],
        ["부장님은 지금 회의실에 계십니다.", "O diretor está agora na sala de reunião."],
      ],
    ],
    [
      "-(으)십니다 — forma honorífica formal",
      "동사/형용사 어간 + -(으)십니다 / 명사 + 이십니다",
      "Terminação do registro 합쇼체 que honra o sujeito e marca distância formal em relação a quem ouve. É típica de e-mails institucionais, avisos e apresentações. Não misture com 해요체 no mesmo texto dirigido à mesma pessoa: a oscilação soa como erro ou descuido. Para o registro formal sem honorífico de sujeito, usa-se -ㅂ니다.",
      [
        ["부장님은 오후 세 시에 도착하십니다.", "O diretor chega às três da tarde."],
        ["부장님께서는 매주 월요일에 보고를 받으십니다.", "O diretor recebe o relatório toda segunda-feira."],
      ],
    ],
  ],
  guided: [
    mcq("O que -시- marca em uma frase?", ["O sujeito honorificado, não o ouvinte.", "O tempo verbal da ação.", "O grau de formalidade do texto escrito."], "O sujeito honorificado, não o ouvinte.", "-시- eleva o sujeito da frase; a distância em relação ao ouvinte é marcada pela terminação."),
    cloze("Complete a forma honorífica: 부장님은 오후 세 시에 도착하___.", "십니다", "-(으)십니다 é a terminação honorífica formal do registro 합쇼체, usada com sujeito humano honorificado."),
    listen("Ouça e escreva a regra de coerência dentro de uma mensagem.", "한 사람에게 보내는 글 안에서는 높임의 정도를 끝까지 유지해야 한다.", "한 사람에게 보내는 글 안에서는 높임의 정도를 끝까지 유지해야 한다.", "Dentro de um texto enviado a uma só pessoa, é preciso manter o grau de reverência do começo ao fim."),
    reading("첫 번째 글은 ‘회의 자료를 금요일까지 제출해 주시기 바랍니다’로 시작해 ‘확인 부탁드립니다’로 끝난다. 두 번째 글은 ‘자료 금요일까지 보내 줄 수 있어?’로 시작해 ‘고마워’로 끝난다.", "O que explica a diferença entre as duas mensagens?", ["O destinatário e a relação de distância, não o assunto.", "O assunto tratado em cada mensagem.", "O horário em que foram enviadas."], "O destinatário e a relação de distância, não o assunto.", "O conteúdo é o mesmo; muda o destinatário e, com ele, o grau de formalidade."),
    translate("pt-ko", "Traduza: “A chefe de equipe revisou o material.”", "팀장님께서 자료를 검토하셨습니다.", "O sujeito honorificado exige -께서 e -시- na terminação.", ["팀장님께서 자료를 검토하셨어요."]),
  ],
  independent: [
    mcq("Qual frase mantém o registro coerente em um e-mail institucional?", ["부장님, 자료를 확인하셨습니까? 회신 부탁드립니다.", "부장님, 자료 확인했어? 회신 부탁드립니다.", "부장님, 자료를 확인하셨습니까? 회신 부탁해."], "부장님, 자료를 확인하셨습니까? 회신 부탁드립니다.", "A coerência exige manter o mesmo grau formal do começo ao fim."),
    cloze("Complete o sujeito honorificado: 팀장님___ 자료를 검토하셨습니다.", "께서", "Com sujeito honorificado, usa-se a partícula 께서 em lugar de 이/가."),
    listen("Ouça e escreva o efeito da oscilação de registro.", "인사는 격식을 갖추었는데 본문이 반말로 바뀌면, 독자는 그 불일치를 무례나 실수로 읽는다.", "인사는 격식을 갖추었는데 본문이 반말로 바뀌면, 독자는 그 불일치를 무례나 실수로 읽는다.", "Se a saudação é formal e o corpo passa para o 반말, o leitor interpreta essa incoerência como descortesia ou erro."),
    translate("ko-pt", "Traduza: 이 두 메시지가 주장하는 바는 같지만, 독자에게 남기는 인상은 전혀 다르다.", "As duas mensagens defendem o mesmo ponto, mas a impressão que deixam no leitor é totalmente diferente.", "주장하는 바 = o ponto que defendem; 인상 = impressão."),
    reading("두 글은 모두 공손하다. 다만 공손함의 종류가 다르다. 첫 번째 글은 격식을 통해 상대의 지위를 인정하고, 두 번째 글은 친밀함을 통해 상대와의 관계를 확인한다.", "Como o texto descreve a polidez das duas mensagens?", ["São polidas de modos diferentes: uma pela formalidade, outra pela proximidade.", "A primeira é polida e a segunda é descortês.", "As duas usam exatamente o mesmo grau de formalidade."], "São polidas de modos diferentes: uma pela formalidade, outra pela proximidade.", "O texto distingue polidez por formalidade de polidez por intimidade, sem hierarquizar as duas."),
  ],
  summary: [
    "-시- honra o sujeito da frase; não é o mesmo eixo da cortesia dirigida ao ouvinte.",
    "-(으)십니다 pertence ao registro formal e exige coerência até o fim do texto.",
    "Formas supletivas como 계시다 e 드시다 substituem -시- com verbos frequentes.",
    "Mudar de destinatário permite mudar de registro; oscilar dentro do mesmo texto soa como erro ou descortesia.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · o mesmo pedido em dois registros",
    "Reescreva uma mensagem sua para um destinatário de maior poder institucional, mantendo o conteúdo e elevando o registro. Depois, escreva a versão para um colega próximo e explique o que mudou.",
    "같은 부탁을 상사에게 보내는 글과 동료에게 보내는 글로 각각 써 보세요.",
    ["Escolha um pedido concreto com prazo e anexo.", "Na versão ao superior, use -시- e -(으)십니다 de forma consistente.", "Na versão ao colega, mantenha a polidez sem copiar o grau formal.", "Explique uma mudança de tratamento e uma de terminação."],
    ["Duas versões com o mesmo conteúdo.", "Honorífico de sujeito correto na versão formal.", "Registro coerente do início ao fim.", "Diferença de tratamento justificada.", "Fechamento que avalia o risco de cada escolha."],
    "부장님께 보내는 글입니다. 안녕하십니까. 기획팀 김지은입니다. 다음 주 월요일 회의에 사용할 자료를 금요일까지 제출해 주시기 바랍니다. 첨부한 양식에 맞추어 작성해 주시면 됩니다. 확인하신 뒤 회신 부탁드립니다. 감사합니다. 같은 내용을 동료에게 보내면 이렇게 씁니다. 민재 씨, 다음 주 회의 자료인데 금요일까지 보내 줄 수 있어? 첨부한 양식에 맞춰서 작성해 주면 돼. 확인하고 답장해 줘. 고마워. 두 글의 내용은 같지만, 첫 번째는 격식을 통해 지위를 인정하고 두 번째는 친밀함을 확인한다. 한 글 안에서 높임의 정도가 흔들리면 무례하게 읽힐 수 있으므로, 처음 정한 정도를 끝까지 유지해야 한다.",
    "Esta é a mensagem enviada ao diretor. “Olá. Sou Jieun, da equipe de planejamento. Peço que envie o material a ser usado na reunião da próxima segunda-feira até sexta. Basta preencher conforme o formulário anexado. Após verificar, peço a resposta. Obrigada.” O mesmo conteúdo, enviado a um colega, fica assim: “Minjae, é o material da reunião da próxima semana; dá para me mandar até sexta? É só preencher conforme o formulário anexo. Confere e me responde. Valeu.” O conteúdo dos dois textos é o mesmo, mas o primeiro reconhece a posição pela formalidade e o segundo confirma a proximidade. Se o grau de reverência oscila dentro de um mesmo texto, ele pode ser lido como descortês; por isso é preciso manter até o fim o grau escolhido no início.",
    "Exemplo original. As duas versões mantêm o conteúdo e mudam o eixo de polidez. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l20 — diretividade, face e risco pragmático. */
export const C1_L20 = defineC1Lesson({
  id: "c1-l20", number: 20, moduleId: "c1-m04", title: "O risco de dizer",
  objective: "Antecipar o efeito pragmático de um pedido e escolher o grau de diretividade.",
  prerequisites: ["c1-l19"], estimatedMinutes: 80, dialogueTitle: "O pedido que precisou mudar",
  intro: [
    {
      title: "Pedir é calcular o custo do outro",
      body: "Todo pedido impõe algo: tempo, trabalho, exposição. A diretividade é a quantidade desse custo que deixamos visível. Um pedido direto é eficiente e assume que a relação suporta a imposição; um pedido indireto protege a face, mas pode esconder o que realmente se quer. O ponto de equilíbrio depende do risco: quanto maior a exposição do outro, maior a necessidade de deixar uma saída. Pedido sem saída não é polidez, é pressão.",
      ko: "부탁은 상대의 시간과 체면을 함께 계산하는 일이다.",
    },
    {
      title: "Discurso: diretividade, face e margem de recusa",
      body: "Em contextos institucionais, a diretividade não se mede só pelo verbo, mas pela estrutura do enunciado: quem aparece como responsável, se o pedido é público ou privado, se há prazo e se existe alternativa. Mover a responsabilidade para si (“posso ter me enganado”), oferecer uma saída (“se não for possível, me avise”) e reduzir a exposição pública são ajustes de risco, não enfeites. O teste é simples: o outro consegue dizer não sem se sentir punido?",
      ko: "거절할 수 없는 부탁은 정중해 보여도 압박이 된다.",
    },
  ],
  dialogue: [
    ["유나", "지훈 씨, 잠깐 시간 괜찮으세요?", "Jihun, você tem um instante?"],
    ["지훈", "네, 무슨 일이세요?", "Sim, o que foi?"],
    ["유나", "이번 보고서 숫자 부분을 한 번만 다시 확인해 주실 수 있을까요?", "Você poderia verificar mais uma vez a parte dos números deste relatório?"],
    ["지훈", "제가 계산을 잘못했다는 말씀이세요?", "Você está dizendo que eu errei o cálculo?"],
    ["유나", "아니요, 그런 뜻은 아니고요. 제가 보기에 단위가 바뀐 부분이 있어서요. 시간 되실 때 같이 볼 수 있을까요?", "Não, não é isso. É que, pelo que vi, há um trecho em que a unidade mudou. Quando tiver tempo, podemos ver juntos?"],
    ["지훈", "지금은 조금 어렵습니다. 다른 일이 밀려 있어서요.", "Agora é um pouco difícil. Tenho outro trabalho acumulado."],
    ["유나", "그러면 제가 초안에 표시만 해 둘게요. 지훈 씨가 처음부터 다시 하실 필요는 없습니다.", "Então eu apenas marco no rascunho. Você não precisa refazer do zero."],
    ["지훈", "그렇게 해 주시면 좋겠습니다. 처음에는 조금 난처했는데, 이제는 편하게 이야기할 수 있겠네요.", "Se puder fazer assim, ótimo. No começo fiquei um pouco sem jeito, mas agora posso conversar com tranquilidade."],
  ],
  readingText: {
    titlePt: "A mensagem que mudou de tom",
    paragraphs: [
      "수요일 오전, 김 과장은 단체 대화방에 ‘보고서 숫자 다시 확인 바랍니다’라는 메시지를 올렸다. 답장은 삼십 분 뒤에야 왔다. ‘네, 알겠습니다.’라는 짧은 문장이 전부였다. 김 과장은 답장이 늦은 원인을 업무량이라고 생각했다. 그러나 같은 방에 있던 동료들은 다른 이유를 짐작했다. 공개된 자리에서 다시 확인하라는 말은, 누군가의 실수를 모두에게 알리는 것처럼 들릴 수 있기 때문이다.",
      "이틀 뒤, 김 과장은 같은 요청을 개인 메시지로 다시 보냈다. ‘어제 숫자 부분, 제가 단위를 잘못 봤을 수 있어서요. 시간 되실 때 같이 확인해 주시면 좋겠습니다.’ 첫 메시지와 사실은 같지만, 책임의 위치가 달라졌다. 첫 메시지는 상대의 확인을 요구했고, 두 번째 메시지는 자신의 확인을 먼저 말한다. 요청의 강도는 낮아졌지만, 일의 목적은 오히려 분명해졌다.",
      "이번에는 답장이 바로 왔다. ‘제가 오후에 표시해 둘게요. 같이 보면 좋을 것 같습니다.’ 결과만 보면 메시지 한 번을 고친 일이 작아 보인다. 그러나 그 작은 수정이 상대의 자존심과 관계를 지켰다. 요청을 할 때 중요한 것은 얼마나 정중한가만이 아니라, 상대가 거절할 여지를 남기는가이다. 거절할 수 없는 요청은 정중해 보여도 압박이 된다. 좋은 요청은 상대의 시간과 체면을 함께 계산한다.",
    ],
    pt: "Na manhã de quarta-feira, o gerente Kim publicou no grupo coletivo a mensagem “peço que verifiquem novamente os números do relatório”. A resposta chegou só trinta minutos depois. Era apenas uma frase curta: “Sim, entendi.” O gerente Kim pensou que a causa da demora fosse o volume de trabalho. No entanto, os colegas que estavam no mesmo grupo imaginaram outro motivo. Pedir uma nova verificação em um espaço público pode soar como anunciar o erro de alguém para todos. Dois dias depois, o gerente Kim enviou o mesmo pedido por mensagem individual: “Sobre a parte dos números de ontem, pode ser que eu tenha visto a unidade errada. Quando tiver tempo, seria bom confirmarmos juntos.” O fato é o mesmo da primeira mensagem, mas o lugar da responsabilidade mudou. A primeira exigia a confirmação do outro; a segunda começa por falar da própria confirmação. A intensidade do pedido baixou, mas o objetivo do trabalho ficou mais claro. Desta vez, a resposta veio na hora: “Eu marco no rascunho à tarde. Acho que seria bom vermos juntos.” Olhando só o resultado, parece pequeno ter corrigido uma mensagem. Mas esse pequeno ajuste preservou o amor-próprio e a relação do outro. Ao fazer um pedido, o importante não é apenas quão cortês ele é, mas se deixa ao outro espaço para recusar. Um pedido impossível de recusar, por mais cortês que pareça, vira pressão. Um bom pedido calcula junto o tempo e a face do outro.",
    objective: "Reconhecer o risco que o falante tenta reduzir ao ajustar o pedido.",
  },
  reusedIds: ["ko:원인", "ko:결과", "ko:여지", "ko:대가"],
  grammar: [
    [
      "-도록 하다 — fazer com que; instrução atenuada",
      "동사 + -도록 하다",
      "Suaviza uma instrução ou um pedido, sobretudo quando quem fala tem responsabilidade sobre a tarefa. É mais indireto que -(으)세요 e menos impositivo que o imperativo. Na primeira pessoa, -도록 하겠습니다 expressa compromisso: “vou providenciar”. Não confunda com -게 하다, que é causativo (“fazer alguém fazer”), nem com -도록 de finalidade ou grau.",
      [
        ["회의 자료는 금요일까지 공유하도록 하겠습니다.", "Vou providenciar o compartilhamento do material da reunião até sexta-feira."],
        ["보고서는 다음 주 월요일까지 제출하도록 하세요.", "Providencie a entrega do relatório até a próxima segunda-feira."],
      ],
    ],
    [
      "-지 않도록 유의하다 — ter cuidado para não",
      "동사 + -지 않도록 유의하다",
      "Instrução preventiva típica de avisos, manuais e mensagens institucionais. O foco não é ordenar uma ação, mas evitar um problema, e a responsabilidade pelo cuidado é compartilhada. Pode aparecer como 유의하여 주시기 바랍니다, mais formal. Não use para o passado nem para uma culpa já ocorrida; nesse caso, fale do fato diretamente.",
      [
        ["늦지 않도록 유의하여 주시기 바랍니다.", "Pedimos que tomem cuidado para não se atrasarem."],
        ["개인 정보가 노출되지 않도록 유의해야 합니다.", "É preciso ter cuidado para que dados pessoais não sejam expostos."],
      ],
    ],
  ],
  guided: [
    mcq("O que o segundo pedido do gerente Kim muda em relação ao primeiro?", ["Desloca a responsabilidade para si e retira a exposição pública.", "Aumenta a urgência e o prazo.", "Elimina a necessidade de verificar os números."], "Desloca a responsabilidade para si e retira a exposição pública.", "O pedido passa ao privado e começa pela própria dúvida, reduzindo a exposição do outro."),
    cloze("Complete a instrução atenuada: 회의 자료는 금요일까지 공유하___ 하겠습니다.", "도록", "-도록 하겠습니다 expressa compromisso e suaviza a instrução."),
    listen("Ouça e escreva o efeito do pedido feito em público.", "공개된 자리에서 다시 확인하라는 말은, 누군가의 실수를 모두에게 알리는 것처럼 들릴 수 있다.", "공개된 자리에서 다시 확인하라는 말은, 누군가의 실수를 모두에게 알리는 것처럼 들릴 수 있다.", "Pedir uma nova verificação em um espaço público pode soar como anunciar o erro de alguém para todos."),
    reading("첫 메시지는 상대의 확인을 요구했고, 두 번째 메시지는 자신의 확인을 먼저 말한다. 요청의 강도는 낮아졌지만, 일의 목적은 오히려 분명해졌다.", "Como o texto avalia a mudança de tom?", ["A intensidade baixou, mas o objetivo ficou mais claro.", "O pedido perdeu o sentido e foi abandonado.", "A mudança tornou a mensagem menos educada."], "A intensidade baixou, mas o objetivo ficou mais claro.", "A reformulação reduz a imposição e, ao mesmo tempo, esclarece o que se quer."),
    translate("pt-ko", "Traduza: “Quando tiver tempo, podemos ver juntos?”", "시간 되실 때 같이 볼 수 있을까요?", "O pedido deixa margem de recusa e usa honorífico de sujeito."),
  ],
  independent: [
    mcq("Qual pedido deixa uma margem real de recusa?", ["시간 되실 때 같이 확인해 주실 수 있을까요?", "지금 당장 다시 하세요.", "이건 반드시 오늘 안에 끝내야 합니다."], "시간 되실 때 같이 확인해 주실 수 있을까요?", "A pergunta com condição e verbo de possibilidade deixa espaço para o outro recusar."),
    cloze("Complete o aviso preventivo: 늦지 ___ 유의하여 주시기 바랍니다.", "않도록", "-지 않도록 유의하다 evita o problema em vez de ordenar a ação."),
    listen("Ouça e escreva o limite de um pedido sem saída.", "거절할 수 없는 부탁은 정중해 보여도 압박이 된다.", "거절할 수 없는 부탁은 정중해 보여도 압박이 된다.", "Um pedido impossível de recusar, por mais cortês que pareça, vira pressão."),
    translate("ko-pt", "Traduza: 그 작은 수정이 상대의 자존심과 관계를 지켰다.", "Esse pequeno ajuste preservou o amor-próprio e a relação do outro.", "자존심 = amor-próprio; 지키다 = preservar, proteger."),
    reading("좋은 요청은 상대의 시간과 체면을 함께 계산한다. 거절할 수 없는 요청은 정중해 보여도 압박이 된다. 반대로 지나치게 우회적인 요청은 무엇을 원하는지 흐릴 수 있다.", "Qual é o critério de um bom pedido segundo o texto?", ["Deixar espaço real de recusa, considerando tempo e face.", "Usar o maior número possível de honoríficos.", "Enviar sempre em canal público para haver transparência."], "Deixar espaço real de recusa, considerando tempo e face.", "O texto desloca o critério da aparência de polidez para a autonomia de quem recebe."),
  ],
  summary: [
    "Todo pedido tem um custo para o outro: tempo, trabalho e exposição.",
    "-도록 하다 suaviza instruções e, na primeira pessoa, expressa compromisso.",
    "-지 않도록 유의하다 formula avisos preventivos em registro institucional.",
    "Ajustar quem aparece como responsável e oferecer saída reduz o risco pragmático.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · dois graus de diretividade",
    "Pense em um pedido delicado que você precisa fazer. Escreva duas versões: uma direta, adequada a uma relação próxima e a uma tarefa simples, e outra indireta, para alguém com menos autonomia ou mais exposição. Explique o que cada versão protege.",
    "같은 부탁을 직접적인 표현과 우회적인 표현으로 각각 써 보세요.",
    ["Defina o custo do pedido: tempo, trabalho e exposição.", "Na versão indireta, use -도록 하다 ou -지 않도록 유의하다.", "Diga quem aparece como responsável em cada versão.", "Explique qual versão deixa margem de recusa e por quê."],
    ["Duas versões do mesmo pedido.", "Custo e risco identificados.", "Uma forma do módulo usada com precisão.", "Margem de recusa avaliada.", "Fechamento que justifica a escolha."],
    "지훈 씨, 보고서 숫자 부분을 오늘 안에 다시 확인해 줄 수 있어? 시간이 없으면 내가 볼 테니 말해 줘. 이렇게 쓰면 가까운 동료에게는 빠르고 분명하다. 같은 부탁을 부장님께는 이렇게 쓴다. 부장님, 보고서 숫자 부분에서 제가 단위를 잘못 본 것 같습니다. 시간 되실 때 함께 확인해 주시면 좋겠습니다. 급한 부분은 제가 먼저 표시해 두겠습니다. 두 번째 버전은 책임을 제 쪽으로 옮기고, 상대가 거절할 여지를 남긴다. 첫 번째 버전은 효율적이지만, 상대가 이미 바쁘다면 압박으로 읽힐 수 있다. 좋은 요청은 정중한 표현보다 상대의 시간과 체면을 얼마나 계산했는가로 판단된다.",
    "Jihun, você pode conferir de novo a parte dos números do relatório ainda hoje? Se não tiver tempo, eu vejo e você me avisa. Escrito assim, para um colega próximo, é rápido e claro. O mesmo pedido ao diretor fica assim: “Diretor, parece que eu vi a unidade errada na parte dos números do relatório. Quando tiver tempo, seria bom confirmarmos juntos. Eu marco primeiro a parte urgente.” A segunda versão desloca a responsabilidade para o meu lado e deixa espaço para o outro recusar. A primeira é eficiente, mas, se o outro já está ocupado, pode ser lida como pressão. Um bom pedido se julga menos pela expressão cortês e mais por quanto calcula o tempo e a face do outro.",
    "Exemplo original. As duas versões mudam a diretividade e o risco assumido. Exemplo ilustrativo; não é gabarito.",
  ),
});
