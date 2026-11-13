import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado, assume o gênero pedido e deixa explícito o que o leitor deve fazer com a análise lexical." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a análise avança do uso para o efeito de sentido, sem repetir a mesma constatação." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais, distinguindo termos próximos em vez de traduzi-los por uma única palavra." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado ao gênero e ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "A escolha lexical é justificada pelo efeito que produz no texto, e não apenas pela equivalência de dicionário." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a expressão para outro leitor sem apagar a avaliação, a incerteza ou a responsabilidade do original." },
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

/** c2-l16 — expressões idiomáticas: sentido no contexto e equivalência sem literalidade. */
export const C2_L16 = defineC2Lesson({
  id: "c2-l16", number: 16, moduleId: "c2-m04", title: "Expressões idiomáticas",
  objective: "Interpretar expressões idiomáticas pelo contexto e evitar tradução literal.",
  prerequisites: ["c2-c03"], estimatedMinutes: 85, dialogueTitle: "O filme que ninguém entendeu do mesmo jeito",
  intro: [
    {
      title: "A soma das palavras não entrega o sentido",
      body: "Uma expressão idiomática é uma unidade de sentido: o todo não se explica pela soma das partes. Quem ouve '발이 넓다' e traduz palavra por palavra chega a 'ter pés largos', mas o sentido é ter muitos contatos. O contexto não é um enfeite ao redor da expressão; é o que decide se ela está no sentido idiomático ou no literal. Em '그는 발이 넓다', a leitura idiomática é quase obrigatória; em uma descrição física dos pés, '발이 넓다' pode voltar ao corpo. Por isso, a primeira pergunta não é 'o que essa palavra significa?', mas 'que tipo de situação torna essa leitura possível?'.",
      ko: "관용 표현은 단어의 합으로 이해되지 않으므로 문맥과 결합 관계를 함께 읽어야 한다.",
    },
    {
      title: "Equivalência sem literalidade",
      body: "Traduzir uma expressão idiomática não é procurar a expressão 'igual' no outro idioma, mas preservar o efeito, o registro e a avaliação que ela produz. '찬물을 끼얹다' pode virar 'jogar água fria', mas em uma conversa formal talvez seja melhor dizer que algo 'esfriou o ânimo' ou 'interrompeu o entusiasmo'. A escolha depende de quem fala, com quem e para quê. Uma equivalência que salva a imagem e perde o tom pode ser pior do que uma explicação breve: o leitor entende o fato e perde a atitude de quem falou.",
      ko: "관용구를 옮길 때는 낱말이 아니라 효과와 태도를 살려야 한다.",
    },
  ],
  dialogue: [
    ["하린", "어제 본 영화, 결말이 계속 눈에 밟혀요.", "O filme que vi ontem, o final continua pesando na minha consciência."],
    ["도현", "저는 오히려 중반부터 손을 놓았어요. 인물이 너무 많아서요.", "Eu, ao contrário, larguei a partir do meio. Havia personagens demais."],
    ["하린", "인물이 많아도 서로 발목을 잡는 관계가 이 영화의 힘이에요.", "Mesmo com muitos personagens, as relações em que um trava o outro são a força deste filme."],
    ["도현", "그 힘이라면, 마지막 장면은 왜 관객에게 찬물을 끼얹는 건가요?", "Se é essa a força, por que a última cena joga água fria no espectador?"],
    ["하린", "찬물이라기보다는 여운이에요. 주인공이 오리발을 내미는 듯한 표정도 좋았고요.", "Mais do que água fria, é uma ressonância. Também gostei do rosto do protagonista, como quem finge desconhecimento."],
    ["도현", "오리발이요? 영화에 수영장이라도 나오던가요?", "Pé de pato? Aparece alguma piscina no filme?"],
    ["하린", "아니요, 발이 넓은 사람이 책임을 피하려고 모르는 척하는 장면이요. 관용 표현을 낱말로만 들으면 그렇게 들려요.", "Não. É a cena em que alguém de muitos contatos finge não saber para fugir da responsabilidade. Se você ouve a expressão só como palavras, soa assim."],
    ["도현", "아, 그 말이었군요. 저는 발등에 불이 떨어진 사람처럼 급하게 설명하는 줄 알았어요.", "Ah, era isso. Achei que fosse alguém explicando às pressas, como quem tem fogo no pé."],
  ],
  readingText: {
    titlePt: "Uma comédia que ri por dentro",
    paragraphs: [
      "영화 '오후의 정류장'은 작은 시골 버스 정류장을 배경으로 한다. 감독은 첫 장면부터 관객에게 친절하지 않다. 인물 소개도, 시간 표시도 없다. 그런데도 감독은 금세 발이 넓은 사람처럼 굴지 않는다. 오히려 낯선 사람들 사이의 어색한 침묵을 오래 비춘다. 주인공은 매일 같은 시간에 버스를 놓치고, 그때마다 오리발을 내미는 듯한 변명을 늘어놓는다. 관객은 그 변명이 우습고도 눈에 밟힌다. 웃음은 장면의 바깥에서 오지 않는다. 인물의 체면과 욕망이 부딪히는 자리에서 조용히 생긴다.",
      "영화의 논조는 끝까지 일정하다. 감독은 누구도 심판하지 않고, 누구도 미화하지 않는다. 중반에 마을 축제가 열리지만, 축제는 화려한 볼거리가 아니라 서로의 빚을 확인하는 자리로 쓰인다. 이 장면에서 감독의 풍자가 가장 날카롭다. 사람들은 웃으면서도 상대의 실수를 기억하고, 도와주는 척하면서 발목을 잡는다. 관객은 웃다가 멈칫한다. 웃음의 대상이 화면 속 인물이 아니라, 비슷한 방식으로 관계를 계산하는 우리 자신이기 때문이다.",
      "결말에서 주인공은 마을을 떠나지 않는다. 그는 마지막까지 손을 놓지 않고, 버스를 기다리는 사람들의 이름을 하나씩 외운다. 어떤 관객은 이 장면이 감상적이라고 말할 것이다. 그러나 앞선 장면들을 떠올리면 그 다정함은 오히려 계산된 반전이다. 영화는 눈물을 강요하지 않고, 웃음을 회수하지도 않는다. 다만 관용 표현처럼 겉으로는 가벼운 말이 속으로는 무거운 책임을 품을 수 있음을 보여 준다. 그래서 이 영화의 마지막은 찬물을 끼얹는 듯 시원하기보다, 오래 목에 걸리는 한 문장처럼 남는다.",
    ],
    pt: "O filme 'O ponto de ônibus da tarde' tem como cenário um pequeno ponto de ônibus rural. O diretor não é gentil com o espectador desde a primeira cena. Não há apresentação dos personagens nem indicação de tempo. Mesmo assim, o diretor não age como alguém de muitos contatos. Pelo contrário, filma longamente o silêncio constrangedor entre pessoas estranhas. O protagonista perde o ônibus no mesmo horário todos os dias e, a cada vez, desfia desculpas como quem finge desconhecimento. O espectador acha essas desculpas engraçadas e, ao mesmo tempo, elas ficam pesando na consciência. O riso não vem de fora da cena. Ele nasce em silêncio no ponto em que o decoro e o desejo dos personagens se chocam. O tom do filme permanece constante até o fim. O diretor não julga ninguém nem idealiza ninguém. No meio do filme há uma festa na vila, mas a festa não é um espetáculo vistoso: serve para que os moradores confirmem as dívidas uns com os outros. Nessa cena, a sátira do diretor é mais afiada. As pessoas riem, mas memorizam os erros do outro; fingem ajudar e, ao mesmo tempo, travam o outro. O espectador ri e hesita. O alvo do riso não são apenas os personagens na tela, mas nós mesmos, que calculamos as relações de modo parecido. No desfecho, o protagonista não deixa a vila. Até o fim, ele não larga a mão e decora um a um os nomes de quem espera o ônibus. Alguns espectadores dirão que essa cena é sentimental. Mas, lembrando as cenas anteriores, essa ternura é antes uma reviravolta calculada. O filme não força o choro nem retira o riso. Apenas mostra que, como nas expressões idiomáticas, uma fala leve por fora pode carregar uma responsabilidade pesada por dentro. Por isso o final deste filme, mais do que refrescante como um balde de água fria, permanece como uma frase que fica presa na garganta por muito tempo.",
    objective: "Distinguir o sentido idiomático do literal e justificar a equivalência pelo efeito e pelo registro.",
  },
  reusedIds: ["ko:풍자", "ko:논조", "ko:체면", "ko:겉으로"],
  grammar: [
    [
      "-ㄴ/는 감이 있다 — tem um quê de; dá a impressão de",
      "동사 + -는 감이 있다 / 형용사 + -(으)ㄴ 감이 있다 / 명사 + 인 감이 있다",
      "Apresenta uma impressão que o falante não quer afirmar como fato. É mais subjetivo que -ㄴ/는 편이다, que descreve uma tendência relativa, e mais avaliativo que -ㄴ/는 듯하다, que compara a aparência com o que se sabe. Em crítica cultural, serve para dizer que uma obra 'soa' de determinado modo sem transformar a impressão em veredito. Costuma vir com um pouco, 다소, 왠지.",
      [
        ["이 영화의 결말은 조금 급하게 마무리된 감이 있다.", "O final deste filme tem um quê de conclusão apressada."],
        ["그의 사과는 책임을 피하려는 감이 있어서 마음에 걸렸다.", "O pedido de desculpas dele deu a impressão de fugir da responsabilidade, e isso me incomodou."],
      ],
    ],
    [
      "-는 맛이 나다 — tem um gosto de; soa como",
      "동사 + -는 맛이 나다 / 형용사 + -(으)ㄴ 맛이 나다 / -(으)려는 맛이 나다",
      "Usa a metáfora do sabor para avaliar uma fala, uma cena ou uma atitude. Quase sempre tem carga crítica: o falante sente que há algo forçado, calculado ou desagradável no que ouviu. Compare com -ㄴ/는 감이 있다, que apenas registra uma impressão, sem a mesma avaliação negativa. Não confunda com 맛이 가다, que significa 'estragar-se' e se aplica a comida ou, figuradamente, a uma pessoa ou situação.",
      [
        ["그 칭찬은 겉도는 맛이 나서 오히려 불편했다.", "Aquele elogio soou como algo que não se compromete, e isso me deixou desconfortável."],
        ["이 장면은 억지로 웃기려는 맛이 나지만, 배우의 표정이 살려 낸다.", "Esta cena tem um gosto de humor forçado, mas a expressão do ator a salva."],
      ],
    ],
  ],
  guided: [
    mcq("O que a comparação com '발이 넓은 사람' diz sobre o diretor?", ["Que ele não tenta agradar nem exibir uma rede ampla de relações.", "Que o diretor não conhece os atores.", "Que a história se passa em uma cidade grande."], "Que ele não tenta agradar nem exibir uma rede ampla de relações.", "A expressão é lida pelo contraste com a cena: o filme prefere o silêncio entre estranhos à sociabilidade fácil."),
    cloze("Complete a comparação do primeiro parágrafo: 감독은 금세 발이 ___ 사람처럼 굴지 않는다.", "넓은", "A forma '발이 넓다' significa ter muitos contatos; aqui ela é negada pela comparação."),
    listen("Ouça e escreva a fala sobre o que ficou na consciência.", "어제 본 영화, 결말이 계속 눈에 밟혀요.", "어제 본 영화, 결말이 계속 눈에 밟혀요.", "O filme que vi ontem, o final continua pesando na minha consciência."),
    translate("pt-ko", "Traduza: “O final do filme continua pesando na minha consciência.”", "영화의 결말이 계속 눈에 밟혀요.", "눈에 밟히다 indica que algo não sai da consciência; não é uma dor física no olho.", ["영화 결말이 자꾸 눈에 밟혀요."]),
    reading("영화의 논조는 끝까지 일정하다. 감독은 누구도 심판하지 않고, 누구도 미화하지 않는다. 중반에 마을 축제가 열리지만, 축제는 화려한 볼거리가 아니라 서로의 빚을 확인하는 자리로 쓰인다. 이 장면에서 감독의 풍자가 가장 날카롭다.", "O que a festa da vila revela sobre o tom do filme?", ["Ela vira uma ocasião para confirmar dívidas mútuas, e não um espetáculo decorativo.", "Ela mostra que o diretor abandonou a crítica social.", "Ela serve apenas para apresentar novos personagens."], "Ela vira uma ocasião para confirmar dívidas mútuas, e não um espetáculo decorativo.", "A sátira está em transformar a festa em acerto de contas, mantendo o tom constante."),
  ],
  independent: [
    mcq("Qual é o risco de traduzir '눈에 밟히다' literalmente como 'ser pisado nos olhos'?", ["A imagem literal apaga o sentido de algo que fica na consciência e não sai do pensamento.", "A tradução literal é obrigatória em textos jornalísticos.", "A expressão coreana não tem uso figurado."], "A imagem literal apaga o sentido de algo que fica na consciência e não sai do pensamento.", "A literalidade preserva a imagem, mas perde o efeito de insistência e de incômodo que a expressão carrega."),
    cloze("Complete a cena em que o personagem foge da responsabilidade: 그는 책임을 묻자 ___을 내밀었어요.", "오리발", "오리발을 내밀다 significa fingir que não sabe ou não participa de algo."),
    listen("Ouça e escreva o que o filme não faz com o riso.", "영화는 눈물을 강요하지 않고, 웃음을 회수하지도 않는다.", "영화는 눈물을 강요하지 않고, 웃음을 회수하지도 않는다.", "O filme não força o choro nem recolhe o riso."),
    translate("ko-pt", "Traduza: 관용 표현은 낱말의 합이 아니라 문맥 속에서 완성된다.", "A expressão idiomática não se completa pela soma das palavras, mas no contexto.", "낱말의 합 = soma das palavras; 완성되다 = completar-se.", ["A expressão idiomática não é a soma das palavras: ela se completa no contexto."]),
    reading("그러나 앞선 장면들을 떠올리면 그 다정함은 오히려 계산된 반전이다. 영화는 눈물을 강요하지 않고, 웃음을 회수하지도 않는다. 다만 관용 표현처럼 겉으로는 가벼운 말이 속으로는 무거운 책임을 품을 수 있음을 보여 준다.", "Por que a ternura do final não é simples sentimentalismo?", ["Porque resulta de uma reviravolta calculada que reconsidera as cenas anteriores.", "Porque o protagonista chora sem motivo.", "Porque o diretor explica o final em uma entrevista."], "Porque resulta de uma reviravolta calculada que reconsidera as cenas anteriores.", "A cena final ganha sentido pelo contraste com o restante do filme, não por uma emoção isolada."),
  ],
  summary: [
    "O sentido idiomático não se deduz da soma das palavras: o contexto decide a leitura.",
    "Uma expressão pode ter leitura literal e figurada; a situação e a colocação desfazem a ambiguidade.",
    "-ㄴ/는 감이 있다 registra uma impressão sem transformá-la em veredito.",
    "-는 맛이 나다 avalia uma fala ou cena com carga crítica, como algo forçado ou calculado.",
    "Traduzir bem é preservar efeito, registro e avaliação, não apenas a imagem literal.",
  ],
  production: production(
    "Produção independente · a expressão que muda a avaliação",
    "Escolha uma cena de filme, série ou livro e escreva um comentário curto usando três expressões idiomáticas. Depois, explique o que cada expressão acrescenta à avaliação da cena e o que se perderia com uma tradução literal.",
    "영화나 소설의 한 장면을 골라 관용 표현 세 개로 평가하고, 직역했을 때 무엇이 사라지는지 설명해 보세요.",
    ["Descreva a cena antes de interpretá-la, para que o leitor veja de onde vem a expressão.", "Use três expressões idiomáticas em contextos diferentes.", "Explique uma expressão pelo efeito, não pela soma das palavras.", "Compare a sua escolha com uma tradução literal plausível.", "Feche dizendo qual avaliação você não quis impor ao leitor."],
    ["Cena descrita com detalhe suficiente.", "Três expressões usadas com naturalidade.", "Efeito de cada expressão explicado.", "Comparação com a leitura literal.", "Limite da própria interpretação reconhecido."],
    "나는 영화 '오후의 정류장'을 보고 관용 표현이 문맥에 따라 얼마나 다른 무게를 갖는지 생각했다. 주인공이 변명할 때 감독은 '오리발을 내민다'고 직접 쓰지 않는다. 대신 그는 고개를 돌리고, 다른 사람의 말을 흉내 낸다. 그 장면을 '오리발'이라는 말로 정리하면 인물에 대한 평가가 갑자기 차가워진다. 관객은 이미 그의 사정을 알고 있기 때문이다. 그래서 나는 이 영화를 '책임을 피하는 사람의 이야기'로 요약하고 싶지 않다. 그렇게 쓰는 순간, 인물의 망설임과 체면이 사라진다. 관용 표현은 장면을 빠르게 설명하지만, 동시에 인물을 하나의 유형으로 굳힌다. 좋은 해석은 표현이 만든 평가까지 설명해야 한다. 이 영화의 결말이 오래 남는 이유도 그 평가를 마지막까지 유보하기 때문이다.",
    "Depois de ver 'O ponto de ônibus da tarde', pensei em como uma expressão idiomática ganha pesos diferentes conforme o contexto. Quando o protagonista se desculpa, o diretor não escreve que ele 'finge desconhecimento'. Em vez disso, ele vira a cabeça e imita a fala de outra pessoa. Resumir essa cena com a expressão 'pé de pato' faz a avaliação do personagem esfriar de repente. Afinal, o espectador já conhece a situação dele. Por isso não quero resumir o filme como 'a história de alguém que foge da responsabilidade'. No momento em que escrevo isso, a hesitação e o decoro do personagem desaparecem. A expressão idiomática explica a cena com rapidez e, ao mesmo tempo, cristaliza o personagem em um tipo. Uma boa interpretação precisa explicar também a avaliação que a expressão produz. O final deste filme permanece por muito tempo justamente porque suspende essa avaliação até o fim.",
    "Exemplo original. O comentário usa as expressões em contexto e explica o efeito que a literalidade apagaria. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l17 — famílias sino-coreanas e vocabulário acadêmico. */
export const C2_L17 = defineC2Lesson({
  id: "c2-l17", number: 17, moduleId: "c2-m04", title: "Hanja e vocabulário acadêmico",
  objective: "Reconhecer famílias semânticas de origem sino-coreana e usá-las com precisão.",
  prerequisites: ["c2-l16"], estimatedMinutes: 85, dialogueTitle: "Duas palavras que parecem a mesma",
  intro: [
    {
      title: "Famílias de caracteres, não de traduções",
      body: "Muitas palavras acadêmicas do coreano vêm de caracteres chineses e compartilham uma sílaba com um núcleo de sentido: 상 (相) em 상관, 상대, 상호; 성 (性) em 가능성, 보편성, 상관성. Reconhecer a família ajuda a prever o campo semântico, mas não garante o sentido exato: a mesma sílaba pode ter caracteres diferentes e produzir palavras que só parecem parentes. O caminho seguro é observar como a palavra se combina — 상관성을 분석하다, 인과성을 주장하다 — e não deduzir o significado apenas pela forma.",
      ko: "같은 한자에서 나온 말이라도 결합하는 자리와 근거가 뜻을 정한다.",
    },
    {
      title: "Colocação acadêmica e limite do sinônimo",
      body: "Em texto acadêmico, duas palavras próximas raramente são intercambiáveis. 상관성 descreve variação conjunta; 인과성 afirma uma relação de causa e efeito. 보편성 nomeia o alcance de uma proposição; 일반성 pode descrever o que é comum, sem a mesma força teórica. A precisão não está em usar palavras difíceis, mas em escolher a que corresponde ao tipo de afirmação que o texto faz. Quando a colocação não fecha — '인과성을 분석하다' em vez de '상관성을 분석하다' — o leitor recebe uma promessa metodológica que o estudo não sustenta.",
      ko: "학술 어휘의 정확성은 어려운 단어가 아니라 주장의 범위를 맞추는 데 있다.",
    },
  ],
  dialogue: [
    ["지안", "이 논문, '상관성이 있다'와 '인과성이 있다'를 거의 같이 쓰고 있어요.", "Este artigo usa 'há correlação' e 'há causalidade' quase como se fossem a mesma coisa."],
    ["태오", "둘 다 '관계'로 읽히니까 번역할 때도 같은 말처럼 보이죠.", "Como os dois são lidos como 'relação', também parecem a mesma palavra na tradução."],
    ["지안", "하지만 상관성은 함께 변한다는 뜻이고, 인과성은 원인과 결과를 말해요.", "Mas correlação significa que variam juntas, enquanto causalidade fala de causa e efeito."],
    ["태오", "논문이 인과성을 주장하려면 다른 요인을 통제했다는 근거가 필요하겠네요.", "Se o artigo quer afirmar causalidade, precisa de evidência de que controlou outros fatores."],
    ["지안", "맞아요. 여기서는 그 전제가 빠져 있어서 결론이 성급해 보여요.", "Exato. Aqui essa premissa está ausente, e a conclusão parece precipitada."],
    ["태오", "그럼 '보편성'이라는 말은요? 이 사례 하나로 보편성을 말할 수 있나요?", "E a palavra 'universalidade'? Pode-se falar de universalidade com um único caso?"],
    ["지안", "어려워요. 사례의 특수성과 이론의 보편성을 구분해야 해요.", "É difícil. É preciso distinguir a particularidade do caso da universalidade da teoria."],
    ["태오", "결국 같은 한자를 쓰는 말이라도 결합하는 자리와 근거가 뜻을 정하네요.", "No fim, mesmo palavras com o mesmo hanja têm o sentido definido pela combinação e pela evidência."],
  ],
  readingText: {
    titlePt: "Correlação não é causalidade",
    paragraphs: [
      "이 연구는 지역 공동체의 신뢰 수준과 제도 투명성 사이의 상관성을 분석한다. 두 변수는 함께 움직이지만, 그 관계만으로 인과성을 주장할 수는 없다. 신뢰가 높은 지역에 제도가 투명한 경우가 많다는 관찰은, 제도가 신뢰를 만들었다는 결론을 곧바로 뒷받침하지 않는다. 오히려 신뢰가 높은 지역이 투명한 제도를 선택했을 가능성, 즉 역방향의 요인을 함께 검토해야 한다. 연구자는 이 지점에서 인과성의 필연성을 주장하지 않고, 관찰된 상관성의 범위를 명시한다.",
      "분석의 출발점은 '신뢰는 제도적 조건에 의해 형성된다'는 전제다. 그러나 이 전제는 보편적 명제가 아니라, 특정 지역과 시기에 한정된 가설이다. 따라서 연구 결과의 보편성을 주장하려면 다른 지역에서의 반복 검증이 필요하다. 또한 신뢰의 상대성과 문화적 맥락을 고려하지 않으면, 한 사회의 우연성을 다른 사회의 필연성으로 오해하기 쉽다. 이 연구가 기여하는 바는 거대한 결론이 아니라, 비교 가능한 지표와 설명력 있는 분석틀을 제시하는 데 있다.",
      "그럼에도 이 연구는 두 가지 한계를 안고 있다. 첫째, 횡단면 자료는 시간에 따른 변화를 담지 못하므로 인과성의 방향을 확정하기 어렵다. 둘째, 신뢰를 측정하는 문항이 지역의 언어와 관습에 따라 다르게 해석될 수 있다. 이러한 한계는 연구의 가치를 없애지 않는다. 다만 결론의 효력을 낮추고, 후속 연구가 검증해야 할 조건을 남긴다. 학술적 글쓰기에서 정확한 어휘는 장식이 아니라 주장의 범위를 정하는 장치다. 상관성과 인과성, 보편성과 특수성을 구분하는 일은 문장을 어렵게 만들기 위한 것이 아니라, 독자가 결론을 어디까지 믿어야 하는지 알게 하기 위한 것이다.",
    ],
    pt: "Esta pesquisa analisa a correlação entre o nível de confiança de uma comunidade local e a transparência institucional. As duas variáveis se movem juntas, mas essa relação sozinha não permite afirmar causalidade. A observação de que regiões com maior confiança costumam ter instituições mais transparentes não sustenta imediatamente a conclusão de que as instituições criaram a confiança. Pelo contrário, é preciso examinar também a possibilidade de que regiões mais confiáveis tenham escolhido instituições transparentes, ou seja, um fator na direção inversa. Nesse ponto, o pesquisador não afirma a necessidade da causalidade, mas explicita o alcance da correlação observada. O ponto de partida da análise é a premissa de que 'a confiança é formada por condições institucionais'. No entanto, essa premissa não é uma proposição universal, mas uma hipótese limitada a uma região e a um período. Portanto, para afirmar a universalidade dos resultados, é necessária uma verificação repetida em outras regiões. Além disso, se não se consideram a relatividade da confiança e o contexto cultural, é fácil confundir a contingência de uma sociedade com a necessidade de outra. A contribuição desta pesquisa não está numa conclusão grandiosa, mas em apresentar indicadores comparáveis e um quadro analítico com poder explicativo. Ainda assim, este estudo carrega duas limitações. Primeiro, os dados transversais não capturam mudanças ao longo do tempo, o que dificulta determinar a direção da causalidade. Segundo, os itens que medem a confiança podem ser interpretados de forma diferente conforme a língua e os costumes da região. Essas limitações não eliminam o valor da pesquisa. Apenas reduzem a força da conclusão e deixam condições que estudos posteriores devem verificar. Na escrita acadêmica, o vocabulário preciso não é ornamento: é um dispositivo que delimita o alcance da afirmação. Distinguir correlação de causalidade e universalidade de particularidade não serve para tornar a frase difícil, mas para que o leitor saiba até onde deve acreditar na conclusão.",
    objective: "Reconhecer o sentido preciso de termos da mesma família e a força de cada afirmação acadêmica.",
  },
  reusedIds: ["ko:전제", "ko:요인", "ko:우연", "ko:분석"],
  grammar: [
    [
      "-에 준하다 — equivaler a; seguir o padrão de",
      "명사 + 에 준하다 / 에 준하여 / 에 준하는",
      "Indica que algo segue um padrão ou equivale a uma categoria de referência. É comum em textos jurídicos e acadêmicos, sobretudo na forma 에 준하여 ('conforme', 'segundo o padrão de') e 에 준하는 ('equivalente a'). Compare com -에 해당하다, que apenas classifica algo em uma categoria, e com -에 따르다, que destaca obediência a uma regra. A forma 에 준하다 pressupõe um parâmetro já reconhecido, não uma simples semelhança.",
      [
        ["이 기준은 국제 규정에 준하여 마련되었다.", "Este critério foi estabelecido conforme a normativa internacional."],
        ["그의 발언은 공식 입장에 준하는 것으로 받아들여졌다.", "A fala dele foi recebida como equivalente a uma posição oficial."],
      ],
    ],
    [
      "-ㄴ/는 바 — o que; o fato",
      "동사 + -ㄴ/는 바 / 형용사 + -(으)ㄴ 바 / 명사 + 인 바",
      "Nominaliza um conteúdo de modo formal e o retoma em seguida, sobretudo em expressões como -ㄴ/는 바에 따르면 ('segundo o que...') e -ㄴ/는 바와 같이 ('conforme o que...'). É típico de relatórios e artigos. Compare com -ㄴ/는 것, que é neutro e serve a qualquer registro, e com -ㄴ/는 점, que destaca um aspecto específico. Em texto acadêmico, a forma -ㄴ/는 바 dá ao enunciado um ar de conclusão já estabelecida.",
      [
        ["연구 결과가 보여 주는 바에 따르면, 두 변수는 함께 움직인다.", "Segundo o que os resultados mostram, as duas variáveis se movem juntas."],
        ["앞서 논의한 바와 같이, 상관성은 인과성을 보장하지 않는다.", "Como discutido anteriormente, a correlação não garante a causalidade."],
      ],
    ],
  ],
  guided: [
    mcq("O que a pesquisa afirma sobre confiança e transparência?", ["Que há correlação, mas não se pode afirmar causalidade sem examinar fatores na direção inversa.", "Que a transparência sempre cria confiança.", "Que a confiança não tem relação com instituições."], "Que há correlação, mas não se pode afirmar causalidade sem examinar fatores na direção inversa.", "O texto sustenta a correlação e recusa o salto para a causalidade."),
    cloze("Complete a distinção metodológica: 두 변수는 함께 움직이지만, 그 관계만으로 ___을 주장할 수는 없다.", "인과성", "인과성 nomeia a relação de causa e efeito, que exige controle de outros fatores."),
    listen("Ouça e escreva o que a pesquisa analisa.", "이 연구는 지역 공동체의 신뢰 수준과 제도 투명성 사이의 상관성을 분석한다.", "이 연구는 지역 공동체의 신뢰 수준과 제도 투명성 사이의 상관성을 분석한다.", "Esta pesquisa analisa a correlação entre o nível de confiança da comunidade local e a transparência institucional."),
    translate("pt-ko", "Traduza: “A correlação não garante a causalidade.”", "상관성은 인과성을 보장하지 않는다.", "보장하다 = garantir; a frase separa os dois termos centrais da lição.", ["상관성이 인과성을 보장하지는 않는다."]),
    reading("분석의 출발점은 '신뢰는 제도적 조건에 의해 형성된다'는 전제다. 그러나 이 전제는 보편적 명제가 아니라, 특정 지역과 시기에 한정된 가설이다. 따라서 연구 결과의 보편성을 주장하려면 다른 지역에서의 반복 검증이 필요하다.", "Por que a premissa do estudo não sustenta sozinha uma conclusão universal?", ["Porque é uma hipótese limitada a uma região e a um período, e precisa de verificação repetida.", "Porque foi formulada por um pesquisador estrangeiro.", "Porque a confiança não pode ser medida."], "Porque é uma hipótese limitada a uma região e a um período, e precisa de verificação repetida.", "A premissa é explicitamente situada; a universalidade exigiria repetição em outros contextos."),
  ],
  independent: [
    mcq("O que o sufixo -성 tende a formar no vocabulário acadêmico?", ["Substantivos abstratos que nomeiam propriedades, qualidades ou possibilidades.", "Verbos que indicam uma ação concluída.", "Advérbios de tempo e lugar."], "Substantivos abstratos que nomeiam propriedades, qualidades ou possibilidades.", "Formas como 보편성, 상관성 e 인과성 nomeiam propriedades abstratas e pedem um complemento claro."),
    cloze("Complete a capacidade de explicação do quadro analítico: 분석틀의 ___은 용어 사용에서 드러난다.", "설명력", "설명력 indica a capacidade de um argumento de explicar os dados e sustentar a conclusão."),
    listen("Ouça e escreva o que a escrita acadêmica delimita.", "학술적 글쓰기에서 정확한 어휘는 장식이 아니라 주장의 범위를 정하는 장치다.", "학술적 글쓰기에서 정확한 어휘는 장식이 아니라 주장의 범위를 정하는 장치다.", "Na escrita acadêmica, o vocabulário preciso não é ornamento, mas um dispositivo que delimita o alcance da afirmação."),
    translate("ko-pt", "Traduza: 상관성은 인과성을 보장하지 않는다.", "A correlação não garante a causalidade.", "보장하다 = garantir; a frase resume a distinção central do texto.", ["A correlação não assegura a causalidade."]),
    reading("오히려 신뢰가 높은 지역이 투명한 제도를 선택했을 가능성, 즉 역방향의 요인을 함께 검토해야 한다. 연구자는 이 지점에서 인과성의 필연성을 주장하지 않고, 관찰된 상관성의 범위를 명시한다.", "O que o texto recomenda antes de concluir que as instituições criaram a confiança?", ["Examinar a possibilidade de que a confiança tenha levado à escolha de instituições transparentes.", "Aumentar o número de entrevistados sem mudar o desenho da pesquisa.", "Substituir a correlação por uma opinião de especialistas."], "Examinar a possibilidade de que a confiança tenha levado à escolha de instituições transparentes.", "A direção inversa é o fator que impede tratar a correlação como prova de causalidade."),
  ],
  summary: [
    "Palavras da mesma família sino-coreana compartilham um núcleo de sentido, mas não são sinônimos automáticos.",
    "상관성 descreve variação conjunta; 인과성 afirma causa e efeito e exige controle de outros fatores.",
    "-에 준하다 indica equivalência ou conformidade com um padrão já reconhecido.",
    "-ㄴ/는 바 nominaliza de modo formal e retoma o conteúdo em expressões como 'segundo o que se mostra'.",
    "A precisão acadêmica está em delimitar o alcance da afirmação, não em acumular palavras difíceis.",
  ],
  production: production(
    "Produção independente · traduzir a precisão de um parágrafo",
    "Escolha um parágrafo acadêmico curto, em coreano ou em português, com pelo menos dois termos próximos. Reescreva-o com escolhas lexicais mais precisas e explique, em seguida, o que cada troca altera no alcance da afirmação.",
    "학술 문단에서 비슷한 어휘 두 개를 골라 더 정확한 표현으로 고치고, 그 선택이 주장의 범위를 어떻게 바꾸는지 설명해 보세요.",
    ["Identifique dois termos que poderiam ser confundidos por tradução.", "Diga que tipo de relação cada termo nomeia: correlação, causa, propriedade, padrão.", "Use -에 준하다 ou -ㄴ/는 바 uma vez.", "Explique o que a troca ganha e o que ela deixa de afirmar.", "Feche reconhecendo o limite da sua própria escolha."],
    ["Dois termos próximos identificados.", "Relação nomeada com precisão.", "Reescrita com colocação natural.", "Uma forma-alvo empregada corretamente.", "Limite da escolha lexical reconhecido."],
    "논문의 한 문단에 '신뢰와 제도 사이에는 인과성이 있다'고 쓰여 있었다. 그러나 연구는 두 변수가 함께 움직인다는 사실만 보여 준다. 이때 정확한 표현은 '상관성이 있다'이다. 인과성은 원인과 결과의 방향을 주장하는 말이고, 상관성은 함께 변한다는 관찰을 말한다. 나는 이 문장을 '신뢰 수준과 제도 투명성 사이에는 상관성이 있으며, 인과성은 후속 연구에서 검증되어야 한다'로 고쳤다. 이렇게 쓰면 연구의 기여하는 바가 분명해지고, 결론의 효력도 과장되지 않는다. 물론 상관성이라는 말도 관계의 강도를 말해 주지는 않는다. 독자는 계수와 표본을 함께 보아야 한다. 정확한 어휘는 논문을 어렵게 만들기 위한 장식이 아니라, 독자가 결론을 어디까지 믿어야 하는지 알려 주는 장치다.",
    "Em um parágrafo do artigo estava escrito que 'há causalidade entre confiança e instituições'. No entanto, a pesquisa mostra apenas que as duas variáveis se movem juntas. Nesse caso, a expressão precisa é 'há correlação'. Causalidade afirma a direção de causa e efeito; correlação descreve a observação de que as variáveis variam juntas. Reescrevi a frase como: 'Há correlação entre o nível de confiança e a transparência institucional, e a causalidade deve ser verificada em pesquisas posteriores.' Assim, a contribuição do estudo fica clara e a força da conclusão não é exagerada. É claro que a palavra correlação também não diz a intensidade da relação. O leitor precisa ver o coeficiente e a amostra. O vocabulário preciso não é um ornamento para tornar o artigo difícil, mas um dispositivo que informa até onde o leitor deve acreditar na conclusão.",
    "Exemplo original. O texto distingue correlação de causalidade, reescreve a afirmação e reconhece o limite que a nova escolha ainda deixa. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l18 — colocações abstratas, agente e processo. */
export const C2_L18 = defineC2Lesson({
  id: "c2-l18", number: 18, moduleId: "c2-m04", title: "Colocações abstratas",
  objective: "Usar colocações de abstração para descrever processos sociais e institucionais.",
  prerequisites: ["c2-l17"], estimatedMinutes: 85, dialogueTitle: "O relatório sem sujeito",
  intro: [
    {
      title: "Por que 'promover' precisa de objeto",
      body: "Colocações abstratas são combinações fixas entre um substantivo e um verbo: 형평성을 제고하다, 참여를 유도하다, 신뢰를 구축하다. Elas dão densidade ao texto institucional, mas também escondem quem faz o quê. '참여가 확대되었다' descreve um resultado sem nomear o agente; '위원회가 참여 기회를 확대했다' nomeia quem agiu. A colocação natural não é a mais difícil: é a que combina com o substantivo e permite ao leitor reconstruir o processo. Quando o verbo não combina — '형평성을 이행하다' — o texto soa traduzido e a responsabilidade fica ainda mais vaga.",
      ko: "추상 명사는 과정을 압축하지만, 주체를 지우면 책임까지 지운다.",
    },
    {
      title: "Agente e processo",
      body: "Um relatório pode descrever um processo em três níveis: o resultado ('a participação aumentou'), o instrumento ('por meio de oficinas') e o agente ('a secretaria realizou oficinas'). Escolher apenas o primeiro nível é legítimo quando o foco é a tendência, mas é problemático quando o documento pede prestação de contas. A pergunta decisiva é: quem pode ser cobrado se o resultado não acontecer? Se a frase não permite responder, a abstração não está apenas deixando o texto elegante; está transferindo o custo da explicação para o leitor.",
      ko: "보고서는 결과만 말할지, 과정과 담당자까지 밝힐지 선택해야 한다.",
    },
  ],
  dialogue: [
    ["유진", "이 문단, '지역 참여가 확대되었다'고만 써서 누가 무엇을 했는지 모르겠어요.", "Este parágrafo diz apenas que 'a participação local foi ampliada', então não sei quem fez o quê."],
    ["상우", "보고서라서 주체를 빼면 책임도 흐려지니까요.", "Como é um relatório, omitir o sujeito também dilui a responsabilidade."],
    ["유진", "그런데 '형평성을 도모한다'는 말은 너무 추상적이에요. 구체적으로 무엇을 도모한다는 거죠?", "Mas 'promover a equidade' é abstrato demais. Promover o quê, concretamente?"],
    ["상우", "저소득 가구의 참여 기회를 늘린다는 뜻으로 썼어요.", "Escrevi com o sentido de ampliar as oportunidades de participação de famílias de baixa renda."],
    ["유진", "그러면 '참여 기회를 확대한다'고 써야죠. '공공성에 이바지한다'도 누가 어떻게 이바지하는지 밝혀야 하고요.", "Então é preciso escrever 'ampliar as oportunidades de participação'. E em 'contribuir para o caráter público' também é preciso dizer quem contribui e como."],
    ["상우", "심의위원회가 기준을 마련하고, 주민 설명회를 두 번 연다는 내용을 넣을까요?", "Incluímos que o comitê de avaliação estabelece os critérios e realiza duas apresentações para os moradores?"],
    ["유진", "네. 추상적인 명사만 남기면 성과처럼 보이지만, 실제로는 아무도 책임지지 않는 문장이 돼요.", "Sim. Se ficarem apenas substantivos abstratos, parece um resultado, mas na prática a frase não responsabiliza ninguém."],
    ["상우", "그럼 제목부터 '지역 참여 확대를 위한 실행 계획'으로 바꾸고, 각 항목에 담당 부서를 적겠습니다.", "Então vou mudar o título para 'Plano de execução para ampliar a participação local' e anotar o departamento responsável em cada item."],
  ],
  readingText: {
    titlePt: "Um relatório que promove tudo e não nomeia ninguém",
    paragraphs: [
      "본 사업은 지역 공동체의 지속가능성을 높이고 사회적 포용성을 확대하는 것을 목표로 한다. 이를 위해 주민 참여 프로그램을 운영하고, 취약 계층의 접근성을 개선하며, 지역 조직 간 연대성을 강화한다. 사업의 성과는 참여 인원과 만족도 조사로 측정한다. 아울러 형평성과 공공성을 제고하기 위해 운영 기준을 마련하고, 회계 자료를 공개하여 정보의 개방성을 높인다. 사업이 지역 경제에 미치는 파급 효과도 함께 분석할 예정이다.",
      "특히 올해는 자발성에 기반한 참여를 강조한다. 주민이 직접 제안한 사업을 우선 검토하고, 실행 과정에서 책무성을 확보하기 위해 담당자를 지정한다. 다만 보고서에는 '참여가 확대되었다', '신뢰가 형성되었다'와 같은 표현이 반복된다. 누가 어떤 자원을 투입했는지, 어떤 결정을 누가 내렸는지는 거의 드러나지 않는다. 자료의 출처도 대부분 명시되지 않는다. 이러한 서술은 성과를 부드럽게 만들지만, 동시에 책임의 소재를 흐린다.",
      "본 사업이 지역에 기여하는 바는 분명하다. 그러나 추상적 명사만으로 구성된 문장은 정책의 방향을 밝히는 대신, 실행의 주체를 지운다. 형평성을 도모한다는 말은 기준을 누가 정하고 누가 예외를 승인하는지 말할 때 비로소 의미를 얻는다. 마찬가지로 공공성에 이바지한다는 표현은 구체적인 대상과 절차를 동반해야 한다. 보고서를 읽는 사람이 알아야 할 것은 사업의 이름이 아니라, 누가 무엇을 언제까지 책임지는가이다. 이 문장을 고치는 일은 문체를 다듬는 일이 아니라, 책임을 되돌려 놓는 일이다.",
    ],
    pt: "Este projeto tem como objetivo aumentar a sustentabilidade da comunidade local e ampliar a inclusividade social. Para isso, opera programas de participação dos moradores, melhora o acesso de grupos vulneráveis e fortalece a solidariedade entre organizações locais. Os resultados são medidos pelo número de participantes e por pesquisas de satisfação. Além disso, para promover a equidade e o caráter público, estabelece critérios de operação e divulga os registros contábeis, aumentando a abertura da informação. Também pretende analisar o efeito indireto do projeto na economia local. Neste ano, em especial, enfatiza a participação baseada na espontaneidade. Propostas apresentadas diretamente pelos moradores são examinadas com prioridade, e responsáveis são designados para assegurar a accountability durante a execução. No entanto, o relatório repete expressões como 'a participação foi ampliada' e 'a confiança foi formada'. Quase não se revela quem investiu quais recursos nem quem tomou cada decisão. A origem dos dados também quase nunca é indicada. Esse tipo de descrição suaviza os resultados e, ao mesmo tempo, turva o lugar da responsabilidade. A contribuição do projeto para a região é evidente. Porém, frases compostas apenas de substantivos abstratos anunciam a direção da política e apagam o sujeito da execução. A expressão 'promover a equidade' só ganha sentido quando se diz quem define os critérios e quem aprova as exceções. Do mesmo modo, 'contribuir para o caráter público' precisa vir acompanhada de destinatários e procedimentos concretos. O que o leitor do relatório precisa saber não é o nome do projeto, mas quem é responsável por quê e até quando. Corrigir essa frase não é lapidar o estilo: é devolver a responsabilidade ao lugar dela.",
    objective: "Reconhecer colocações naturais e localizar o agente apagado por substantivos abstratos.",
  },
  reusedIds: ["ko:기여하다", "ko:파급", "ko:포용", "ko:출처"],
  grammar: [
    [
      "-을 도모하다 — buscar; promover",
      "명사 + 을/를 도모하다",
      "Combina com substantivos abstratos que nomeiam objetivos coletivos: 형평성, 발전, 협력, 안정. É formal e frequente em relatórios e discursos institucionais. Compare com 추구하다, que descreve a busca de um objetivo de modo mais neutro e pode ter sujeito individual, e com 기도하다, que enfatiza a intenção e às vezes sugere cálculo. Como 도모하다 apaga o método, o texto precisa dizer em outra frase quem executa e como.",
      [
        ["위원회는 주민 참여 확대를 도모하였다.", "O comitê buscou ampliar a participação dos moradores."],
        ["이 정책은 형평성 제고를 도모하지만, 구체적 기준이 없다.", "Esta política busca promover a equidade, mas não apresenta critérios concretos."],
      ],
    ],
    [
      "-에 이바지하다 — contribuir para",
      "명사 + 에 이바지하다",
      "Indica uma contribuição positiva, geralmente de uma pessoa, instituição ou esforço, para um bem coletivo. É mais formal e solene que 기여하다, que pode ser usado em contextos técnicos e com menor carga afetiva. Compare com -에 도움이 되다, mais cotidiano, e com -에 영향을 미치다, que é neutro e não avalia se o efeito foi bom. A frase com 이바지하다 pede um complemento claro: contribuir para quê e por meio de quê.",
      [
        ["지역 봉사 활동은 공동체 신뢰 형성에 이바지하였다.", "As atividades de voluntariado local contribuíram para a formação da confiança comunitária."],
        ["그 연구는 정책 설계의 투명성을 높이는 데 이바지했다.", "Aquela pesquisa contribuiu para aumentar a transparência na formulação de políticas."],
      ],
    ],
  ],
  guided: [
    mcq("O que o relatório esconde ao dizer apenas que 'a participação foi ampliada'?", ["Quem investiu recursos e quem tomou as decisões que produziram o resultado.", "O número de participantes do programa.", "O nome do projeto e o seu orçamento total."], "Quem investiu recursos e quem tomou as decisões que produziram o resultado.", "O resultado aparece, mas o agente e o processo ficam fora da frase."),
    cloze("Complete a meta de abertura do relatório: 회계 자료를 공개하여 정보의 ___을 높인다.", "개방성", "개방성 nomeia a abertura do acesso à informação, assegurada pela divulgação dos registros."),
    listen("Ouça e escreva a crítica ao uso de substantivos abstratos.", "추상적인 명사만 남기면 성과처럼 보이지만, 실제로는 아무도 책임지지 않는 문장이 돼요.", "추상적인 명사만 남기면 성과처럼 보이지만, 실제로는 아무도 책임지지 않는 문장이 돼요.", "Se ficarem apenas substantivos abstratos, parece um resultado, mas na prática a frase não responsabiliza ninguém."),
    translate("pt-ko", "Traduza: “O comitê buscou ampliar a participação dos moradores.”", "위원회는 주민 참여 확대를 도모하였다.", "-을 도모하다 combina com um objetivo abstrato e mantém o registro institucional.", ["위원회는 주민 참여 확대를 도모했습니다."]),
    reading("본 사업이 지역에 기여하는 바는 분명하다. 그러나 추상적 명사만으로 구성된 문장은 정책의 방향을 밝히는 대신, 실행의 주체를 지운다. 형평성을 도모한다는 말은 기준을 누가 정하고 누가 예외를 승인하는지 말할 때 비로소 의미를 얻는다.", "Por que a expressão 'promover a equidade' é insuficiente no relatório?", ["Porque não diz quem define os critérios nem quem aprova as exceções.", "Porque a equidade não é um objetivo institucional.", "Porque o relatório não menciona o orçamento."], "Porque não diz quem define os critérios nem quem aprova as exceções.", "A crítica não rejeita a meta, mas exige o agente e o procedimento que a tornam verificável."),
  ],
  independent: [
    mcq("Qual reescrita torna o agente e o processo explícitos?", ["A secretaria ampliou as vagas e realizou duas oficinas para famílias de baixa renda.", "A participação foi ampliada por meio de oficinas.", "A equidade foi promovida de forma sustentável.", "O projeto contribuiu para o caráter público."], "A secretaria ampliou as vagas e realizou duas oficinas para famílias de baixa renda.", "A frase nomeia quem agiu e o que foi feito, em vez de apenas declarar um resultado abstrato."),
    cloze("Complete a meta de coesão social: 지역 조직 간 ___을 강화한다.", "연대성", "연대성 nomeia o vínculo de apoio mútuo entre organizações e grupos."),
    listen("Ouça e escreva a proposta sobre o comitê.", "심의위원회가 기준을 마련하고, 주민 설명회를 두 번 연다는 내용을 넣을까요?", "심의위원회가 기준을 마련하고, 주민 설명회를 두 번 연다는 내용을 넣을까요?", "Incluímos que o comitê de avaliação estabelece os critérios e realiza duas apresentações para os moradores?"),
    translate("ko-pt", "Traduza: 추상 명사는 과정을 압축하지만, 주체를 지우면 책임까지 지운다.", "O substantivo abstrato comprime o processo, mas, ao apagar o agente, apaga também a responsabilidade.", "압축하다 = comprimir; 주체 = agente, sujeito da ação.", ["O substantivo abstrato resume o processo, mas, se apaga quem age, apaga também a responsabilidade."]),
    reading("특히 올해는 자발성에 기반한 참여를 강조한다. 주민이 직접 제안한 사업을 우선 검토하고, 실행 과정에서 책무성을 확보하기 위해 담당자를 지정한다. 다만 보고서에는 '참여가 확대되었다', '신뢰가 형성되었다'와 같은 표현이 반복된다.", "O que o contraste entre as duas partes do parágrafo revela?", ["Que o texto declara princípios de responsabilidade, mas descreve os resultados sem agentes.", "Que o projeto não aceita propostas dos moradores.", "Que a participação diminuiu no ano atual."], "Que o texto declara princípios de responsabilidade, mas descreve os resultados sem agentes.", "O parágrafo promete accountability e, ao mesmo tempo, usa frases que apagam quem executou."),
  ],
  summary: [
    "Colocações abstratas dão densidade ao texto, mas podem apagar o agente do processo.",
    "형평성을 제고하다 e 참여를 유도하다 são combinações naturais; o verbo precisa combinar com o substantivo.",
    "-을 도모하다 apresenta um objetivo coletivo em registro institucional e não informa o método.",
    "-에 이바지하다 indica contribuição positiva e exige dizer para quê e por meio de quê.",
    "Reescrever com agente, instrumento e prazo devolve a responsabilidade ao documento.",
  ],
  production: production(
    "Produção independente · do resultado ao responsável",
    "Reescreva um trecho de relatório ou comunicado que descreva apenas resultados abstratos. Nomeie o agente, o instrumento e o prazo de cada ação, e explique o que a versão original deixava sem responsável.",
    "결과만 추상적으로 서술한 보고서 문단을 주체, 수단, 기한이 드러나게 다시 쓰고, 원문이 무엇을 숨겼는지 설명해 보세요.",
    ["Mantenha as metas do texto original.", "Troque ao menos três construções sem agente por ações com responsável.", "Use -을 도모하다 ou -에 이바지하다 uma vez, com complemento claro.", "Diga o que se ganha e o que se perde com a versão mais concreta.", "Feche avaliando se a abstração original era apenas estilo ou também uma escolha de responsabilidade."],
    ["Trecho original resumido.", "Agentes e instrumentos nomeados.", "Prazos ou atos verificáveis.", "Uma forma-alvo empregada corretamente.", "Custo da abstração avaliado."],
    "원문은 '지역 참여가 확대되고 신뢰가 형성되었다'고만 서술한다. 이 문장은 결과를 말하지만, 누가 무엇을 했는지는 말하지 않는다. 나는 이를 '구청은 3월부터 6월까지 저소득 가구를 대상으로 설명회 두 번과 소규모 회의 네 번을 열고, 참여 신청을 온라인과 방문 접수로 나누어 받았다'로 고친다. 이렇게 쓰면 참여 확대를 도모한 주체와 수단이 드러난다. 또한 '신뢰가 형성되었다'는 표현은 '주민 협의체가 월 1회 공개 회의를 열고, 결정 사항을 게시판에 공개했다'로 바꾼다. 물론 이러한 서술은 문장이 길어지고 성과가 덜 화려해 보인다. 그러나 독자는 누구에게 무엇을 물어야 하는지 알 수 있다. 추상적인 명사는 보고서를 부드럽게 만들지만, 책임을 묻는 순간에는 아무것도 대답하지 못한다.",
    "O texto original apenas afirma que 'a participação local foi ampliada e a confiança foi formada'. A frase enuncia um resultado, mas não diz quem fez o quê. Eu a reescrevo como: 'A prefeitura realizou, de março a junho, duas apresentações e quatro pequenas reuniões para famílias de baixa renda, e recebeu inscrições on-line e presenciais.' Assim, aparecem o agente e o instrumento que buscaram ampliar a participação. Também troco 'a confiança foi formada' por 'o conselho de moradores passou a realizar uma reunião aberta por mês e a publicar as decisões no mural'. É claro que essa descrição alonga as frases e faz os resultados parecerem menos vistosos. No entanto, o leitor passa a saber a quem perguntar o quê. O substantivo abstrato suaviza o relatório, mas, no momento de cobrar responsabilidade, não responde nada.",
    "Exemplo original. A reescrita nomeia agentes, instrumentos e prazos, e avalia o custo de manter a abstração. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l19 — falsos amigos, nuance e implicação lexical. */
export const C2_L19 = defineC2Lesson({
  id: "c2-l19", number: 19, moduleId: "c2-m04", title: "Falsos amigos e nuance",
  objective: "Evitar falsos amigos e escolher palavras próximas pela implicação, não pela tradução.",
  prerequisites: ["c2-l18"], estimatedMinutes: 85, dialogueTitle: "A palavra que muda a avaliação",
  intro: [
    {
      title: "Mesmo referente, outra avaliação",
      body: "Duas palavras podem apontar para o mesmo fato e avaliá-lo de modo oposto. 검소하다 descreve quem consome com moderação e sugere respeito; 치사하다 descreve quem economiza de modo mesquinho e sugere reprovação. Em português, ambas podem cair em 'econômico' ou 'simples', e é justamente aí que a tradução perde a atitude. O mesmo ocorre com 대범하다, que pode elogiar a amplitude de alguém, e 무책임하다, que critica a falta de compromisso. A pergunta não é apenas 'qual palavra corresponde?', mas 'que avaliação essa escolha autoriza?'.",
      ko: "같은 사실을 가리키는 말도 평가의 방향은 다를 수 있다.",
    },
    {
      title: "Como testar uma escolha lexical",
      body: "Três testes ajudam a separar palavras próximas. O teste de substituição troca a palavra por outra e observa se a frase muda de avaliação. O teste de colocação verifica com que substantivos e verbos ela costuma aparecer: 검소한 생활 é natural, 치사한 생활 soa acusatório. O teste de registro pergunta se a palavra cabe na relação e no gênero: em uma resenha, 대범하다 pode ser ironia; em um relatório, seria uma avaliação sem base. Se os três testes apontam para direções diferentes, a escolha precisa ser justificada no texto, não escondida na tradução.",
      ko: "어감을 확인하려면 다른 말로 바꾸어 보고, 결합 관계와 문체를 함께 살펴야 한다.",
    },
  ],
  dialogue: [
    ["리사", "이 문장에서 '검소한 생활'을 '간단한 생활'로 옮기면 어떤 느낌인가요?", "Nesta frase, se traduzirmos 'vida frugal' como 'vida simples', que impressão fica?"],
    ["민규", "간단하다는 말은 생활의 복잡함을 말하고, 검소하다는 말은 소비와 태도를 말해요.", "'Simples' fala da complexidade da vida, enquanto 'frugal' fala de consumo e atitude."],
    ["리사", "그러면 포르투갈어로 둘 다 'simples'가 될 수 있지만, 평가는 달라지겠네요.", "Então, em português, as duas podem virar 'simples', mas a avaliação muda."],
    ["민규", "네. 검소하다는 존중에 가깝고, 치사하다는 비난에 가까워요.", "Sim. 'Frugal' está mais perto do respeito, e 'mesquinho' mais perto da reprovação."],
    ["리사", "주인공을 '대범하다'고 옮기면 칭찬이지만, 문맥에 따라 '무책임하다'로 읽힐 수도 있겠어요.", "Traduzir o protagonista como 'magnânimo' soa como elogio, mas, dependendo do contexto, pode ser lido como 'irresponsável'."],
    ["민규", "그 인물은 결정을 미루는 사람이에요. 그래서 대범하다는 말은 반어로만 가능해요.", "Esse personagem adia decisões. Por isso, 'magnânimo' só é possível como ironia."],
    ["리사", "그렇다면 '억울하다'와 '서운하다'도 구분해야겠어요. 둘 다 'sentir-se mal'로 번역되니까요.", "Então também é preciso distinguir 'sentir-se injustiçado' de 'ficar magoado'. Os dois viram 'sentir-se mal'."],
    ["민규", "억울하다는 부당함에 대한 감정이고, 서운하다는 기대가 어긋난 감정이에요. 그 차이가 인물의 성격을 바꿉니다.", "'Sentir-se injustiçado' é a emoção diante de algo injusto; 'ficar magoado' é a emoção quando uma expectativa se rompe. Essa diferença muda o caráter do personagem."],
  ],
  readingText: {
    titlePt: "Duas traduções, duas pessoas",
    paragraphs: [
      "원문은 주인공이 낡은 외투를 입고 식당에 들어가는 장면을 담고 있다. 원문의 '검소한 사람'은 소비를 절제하지만 초라하지는 않다. 번역 A는 이를 '간단한 사람'으로 옮겼다. 문법적으로 틀리지 않지만, 어감은 전혀 달라진다. '간단하다'는 사물의 구조를 말할 때 자연스럽고, 사람의 생활 태도를 존중하는 말로는 어색하다. 독자는 이 표현에서 절제보다 부족함을 먼저 느낀다. 반면 번역 B는 '검소한 사람'을 유지하고, 대신 문맥에 소비 습관을 설명하는 문장을 덧붙인다. 같은 인물이 한쪽에서는 가난한 사람으로, 다른 쪽에서는 절제하는 사람으로 읽힌다.",
      "두 번째 차이는 주인공의 성격을 평가하는 말에서 드러난다. 원문은 그가 약속을 미루는 장면을 '대범하다'고 부르지 않는다. 오히려 '무던하다'는 표현으로, 쉽게 화내지 않지만 결정을 미루는 태도를 함께 보여 준다. 번역 A는 '대범하다'를 골라 인물을 관대한 사람으로 만들었다. 번역 B는 '야무지다'를 골라 반대 방향으로 움직였다. 그러나 원문의 인물은 어느 쪽도 아니다. 그는 야무지지도 대범하지도 않으며, 상황 앞에서 서먹한 웃음을 짓고 겸연쩍은 표정으로 화제를 돌린다. 이 미묘한 차이를 지우면 독자는 인물의 선택을 이해할 수 없다.",
      "번역에서 어감의 치환은 사소한 문제가 아니다. '치사하다'와 '검소하다'는 둘 다 돈을 아끼는 태도를 가리키지만, 전자는 비난이고 후자는 존중이다. '억울하다'와 '서운하다'도 마찬가지다. 전자는 부당한 대우에 대한 감정이고, 후자는 기대가 어긋났을 때의 감정이다. 번역자가 이 차이를 무시하면, 인물은 원문과 다른 감정을 느끼게 된다. 물론 완벽한 등가는 없다. 다만 선택한 말이 만드는 평가를 인식하고, 그 평가가 원문의 태도와 충돌하지 않는지 확인해야 한다. 좋은 번역은 같은 정보를 옮기는 것이 아니라, 같은 정도의 존중과 의심을 옮기는 일이다.",
    ],
    pt: "O original traz a cena em que o protagonista entra no restaurante com um casaco gasto. O 'homem frugal' do original controla o consumo, mas não é miserável. A tradução A o transforma em 'homem simples'. Não há erro gramatical, mas o efeito é completamente diferente. 'Simples' é natural para a estrutura de um objeto e soa estranho como elogio à atitude de uma pessoa. Nessa expressão, o leitor sente primeiro a escassez, antes da moderação. A tradução B, por sua vez, mantém 'homem frugal' e acrescenta, no contexto, uma frase que explica seus hábitos de consumo. O mesmo personagem é lido como pobre em uma versão e como alguém moderado na outra. A segunda diferença aparece nas palavras que avaliam o caráter do protagonista. O original não chama de 'magnânimo' a cena em que ele adia uma promessa. Usa 'tolerante', mostrando ao mesmo tempo que ele não se irrita facilmente e que adia decisões. A tradução A escolhe 'magnânimo' e transforma o personagem em alguém generoso. A tradução B escolhe 'meticuloso' e vai na direção oposta. No entanto, o personagem do original não é nenhum dos dois. Não é meticuloso nem magnânimo; diante da situação, ele faz um sorriso constrangido e desvia o assunto com uma expressão de embaraço. Apagar essa diferença sutil impede o leitor de compreender a escolha do personagem. Na tradução, a substituição de efeitos não é um problema menor. 'Mesquinho' e 'frugal' indicam ambos uma atitude de poupar dinheiro, mas o primeiro é reprovação e o segundo, respeito. 'Sentir-se injustiçado' e 'ficar magoado' também. O primeiro é a emoção diante de um tratamento injusto; o segundo, a emoção quando uma expectativa se rompe. Se o tradutor ignora essa diferença, o personagem passa a sentir uma emoção diferente da do original. É claro que não existe equivalência perfeita. Apenas é preciso reconhecer a avaliação que a palavra escolhida produz e verificar se ela não entra em conflito com a atitude do original. Uma boa tradução não transfere a mesma informação, mas o mesmo grau de respeito e de suspeita.",
    objective: "Comparar duas traduções e justificar a escolha lexical pela implicação que ela produz.",
  },
  reusedIds: ["ko:어감", "ko:치환", "ko:서운하다", "ko:어색하다"],
  grammar: [
    [
      "-ㄴ/는 것과 다르다 — é diferente de",
      "동사 + -는 것과 다르다 / 형용사 + -(으)ㄴ 것과 다르다 / 명사 + 인 것과 다르다",
      "Compara ações ou propriedades, não apenas substantivos. Dizer '검소한 것과 인색한 것은 다르다' coloca duas qualidades em contraste; a forma com -와 다르다 ficaria presa ao substantivo e perderia a nominalização. Use a construção completa quando a diferença está no modo de agir ou no critério de avaliação, não no referente. Compare com -ㄴ/는 셈이다, que conclui uma equivalência em vez de marcar contraste.",
      [
        ["검소한 것과 인색한 것은 다르다.", "Ser frugal é diferente de ser mesquinho."],
        ["그가 말한 것과 그가 실제로 한 것은 다르다.", "O que ele disse é diferente do que ele realmente fez."],
      ],
    ],
    [
      "-ㄴ/는 셈이다 — equivale a; pode-se dizer que",
      "동사 + -는 셈이다 / 형용사 + -(으)ㄴ 셈이다 / 명사 + 인 셈이다",
      "Apresenta uma conclusão calculada a partir do que foi dito: '결국 ~인 셈이다'. Não é uma simples definição; é o resultado de um raciocínio que o falante considera justo. Compare com -ㄴ/는 것이다, que afirma uma identidade de modo mais direto, e com -기 마련이다, que apresenta algo como inevitável. Em análise de tradução, a forma ajuda a dizer que uma escolha, na prática, produz certo efeito.",
      [
        ["이 표현을 그대로 옮기면 인물을 비난한 셈이다.", "Traduzir esta expressão ao pé da letra equivale a condenar o personagem."],
        ["기준 없이 예외를 허용하면, 규칙이 없는 셈이다.", "Permitir exceções sem critério equivale a não ter regra."],
      ],
    ],
  ],
  guided: [
    mcq("O que a troca de '검소한 사람' por '간단한 사람' produz na tradução A?", ["Uma avaliação de escassez, em vez de respeito pela moderação.", "Uma informação mais precisa sobre a renda do personagem.", "Uma melhora no registro formal do texto."], "Uma avaliação de escassez, em vez de respeito pela moderação.", "'Simples' descreve a estrutura da vida, não a atitude de consumir com moderação."),
    cloze("Complete a diferença que o texto destaca: '간단하다'는 사물의 구조를 말할 때 자연스럽고, 사람의 생활 태도를 존중하는 말로는 ___.", "어색하다", "어색하다 indica que a combinação soa estranha naquele contexto."),
    listen("Ouça e escreva a diferença entre os dois sentimentos.", "억울하다는 부당함에 대한 감정이고, 서운하다는 기대가 어긋난 감정이에요.", "억울하다는 부당함에 대한 감정이고, 서운하다는 기대가 어긋난 감정이에요.", "'Sentir-se injustiçado' é a emoção diante de algo injusto; 'ficar magoado' é a emoção quando uma expectativa se rompe."),
    translate("pt-ko", "Traduza: “Ser frugal é diferente de ser mesquinho.”", "검소한 것과 치사한 것은 다르다.", "-ㄴ/는 것과 다르다 compara qualidades nominalizadas, não apenas substantivos.", ["검소한 것과 인색한 것은 다르다."]),
    reading("번역 A는 '대범하다'를 골라 인물을 관대한 사람으로 만들었다. 번역 B는 '야무지다'를 골라 반대 방향으로 움직였다. 그러나 원문의 인물은 어느 쪽도 아니다. 그는 야무지지도 대범하지도 않으며, 상황 앞에서 서먹한 웃음을 짓고 겸연쩍은 표정으로 화제를 돌린다.", "O que as duas traduções fazem com o personagem?", ["Cada uma impõe uma avaliação oposta que o original não confirma.", "As duas preservam exatamente a mesma ambiguidade.", "As duas eliminam o personagem da cena."], "Cada uma impõe uma avaliação oposta que o original não confirma.", "Uma o torna generoso; a outra, meticuloso; o original mantém a hesitação e o embaraço."),
  ],
  independent: [
    mcq("Qual pergunta testa melhor a implicação de uma escolha lexical?", ["Que avaliação essa palavra autoriza sobre o personagem, e essa avaliação está no original?", "A palavra tem mais de duas sílabas?", "A palavra aparece no dicionário como sinônimo?"], "Que avaliação essa palavra autoriza sobre o personagem, e essa avaliação está no original?", "Sinonímia de dicionário não garante a mesma atitude; é preciso testar a avaliação produzida."),
    cloze("Complete a conclusão sobre a tradução: 이 표현을 그대로 옮기면 인물을 비난한 ___.", "셈이다", "-ㄴ/는 셈이다 conclui que a escolha, na prática, equivale a uma condenação."),
    listen("Ouça e escreva o que a tradução deve preservar.", "좋은 번역은 같은 정보를 옮기는 것이 아니라, 같은 정도의 존중과 의심을 옮기는 일이다.", "좋은 번역은 같은 정보를 옮기는 것이 아니라, 같은 정도의 존중과 의심을 옮기는 일이다.", "Uma boa tradução não transfere a mesma informação, mas o mesmo grau de respeito e de suspeita."),
    translate("ko-pt", "Traduza: 검소한 것과 인색한 것은 다르다.", "Ser frugal é diferente de ser mesquinho.", "인색하다 = mesquinho, avarento; a frase separa moderação de avareza.", ["Ser econômico é diferente de ser mesquinho."]),
    reading("번역에서 어감의 치환은 사소한 문제가 아니다. '치사하다'와 '검소하다'는 둘 다 돈을 아끼는 태도를 가리키지만, 전자는 비난이고 후자는 존중이다.", "Por que a substituição de efeitos não é um detalhe?", ["Porque a mesma referência econômica pode carregar reprovação ou respeito, e isso muda o personagem.", "Porque todas as palavras coreanas têm tradução exata.", "Porque o texto original não descreve dinheiro."], "Porque a mesma referência econômica pode carregar reprovação ou respeito, e isso muda o personagem.", "A denotação é próxima, mas a avaliação é oposta; o leitor constrói outra pessoa a partir dela."),
  ],
  summary: [
    "Palavras próximas podem compartilhar o referente e divergir na avaliação que autorizam.",
    "검소하다 sugere respeito; 치사하다 sugere reprovação, embora ambas falem de economia.",
    "O teste de substituição, o de colocação e o de registro ajudam a separar nuances.",
    "-ㄴ/는 것과 다르다 compara ações e propriedades, não apenas substantivos.",
    "-ㄴ/는 셈이다 conclui uma equivalência prática: a escolha, no fim, produz certo efeito.",
  ],
  production: production(
    "Produção independente · cinco escolhas, cinco justificativas",
    "Escolha um trecho curto em português com pelo menos cinco palavras avaliativas. Traduza-o para o coreano e justifique cada escolha lexical pelo efeito que ela produz, indicando uma alternativa que teria mudado a avaliação.",
    "평가적인 표현이 다섯 개 이상 들어간 짧은 글을 한국어로 옮기고, 각 선택의 효과와 다른 선택이 만들 평가를 설명해 보세요.",
    ["Mantenha o mesmo fato nas versões comparadas.", "Justifique ao menos uma escolha com o teste de colocação.", "Use -ㄴ/는 것과 다르다 uma vez.", "Use -ㄴ/는 셈이다 uma vez.", "Reconheça uma perda que a sua tradução não conseguiu evitar."],
    ["Cinco escolhas identificadas.", "Efeito de cada escolha justificado.", "Alternativa contrastada.", "Duas formas-alvo usadas com função clara.", "Perda residual reconhecida."],
    "원문에서 주인공을 '검소한 사람'이라고 부른다. 나는 이 표현을 그대로 살렸다. '간단한 사람'이라고 쓰면 생활의 복잡함을 말하는 느낌이 강해지고, '치사한 사람'이라고 쓰면 비난이 앞선다. 검소한 것과 인색한 것은 다르기 때문이다. 두 번째 문장에서는 '무던하다'를 골랐다. 그런데 이 말만으로는 결정을 미루는 태도가 잘 드러나지 않는다. 그래서 문맥에 '결정을 미루는'이라는 설명을 덧붙였다. 이렇게 하면 원문의 애매함을 모두 살린 것은 아니지만, 인물을 관대한 사람으로 단정하지는 않은 셈이다. 번역은 같은 정보를 옮기는 일이 아니라, 같은 정도의 의심을 남기는 일이다. 다만 '겸연쩍다'의 미묘한 어감은 여전히 남은 숙제다.",
    "No original, o protagonista é chamado de 'homem frugal'. Mantive essa expressão. Se eu escrevesse 'homem simples', reforçaria a ideia de complexidade da vida; se escrevesse 'homem mesquinho', colocaria a reprovação em primeiro plano. Afinal, ser frugal é diferente de ser mesquinho. Na segunda frase, escolhi 'tolerante'. No entanto, essa palavra sozinha não mostra bem a atitude de adiar decisões. Por isso acrescentei ao contexto a explicação de que ele adia decisões. Assim, não preservei toda a ambiguidade do original, mas pode-se dizer que não reduzi o personagem a alguém generoso. Traduzir não é transferir a mesma informação, mas deixar o mesmo grau de dúvida. A nuance sutil de '겸연쩍다' continua sendo uma tarefa pendente.",
    "Exemplo original. O texto justifica cada escolha pela avaliação que ela produz e reconhece uma perda residual. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l20 — modalidade e precisão em contexto legal. */
export const C2_L20 = defineC2Lesson({
  id: "c2-l20", number: 20, moduleId: "c2-m04", title: "Precisão em contexto legal",
  objective: "Interpretar linguagem normativa e distinguir obrigação, permissão e possibilidade.",
  prerequisites: ["c2-l19"], estimatedMinutes: 85, dialogueTitle: "A cláusula que permite tudo",
  intro: [
    {
      title: "Obrigação, permissão, possibilidade",
      body: "Em um contrato, a diferença entre 'deve', 'pode' e 'pode vir a' não é estilo: é a distribuição de risco. -하여야 한다 cria obrigação; -할 수 있다 abre permissão ou capacidade; -할 수도 있다 apresenta uma possibilidade entre outras. Muitas cláusulas ambíguas usam a forma permissiva onde o leitor espera uma garantia, ou a forma impessoal onde deveria haver um responsável. Ler modalidade é perguntar: quem é obrigado, quem é autorizado, quem apenas corre o risco? A resposta muda o valor do contrato.",
      ko: "계약서에서 '할 수 있다'와 '하여야 한다'의 차이는 문체가 아니라 위험의 배분이다.",
    },
    {
      title: "Interpretação e risco",
      body: "Uma cláusula não diz apenas o que acontece; ela diz como o conflito será interpretado depois. '회사가 필요하다고 판단하는 경우' pode ser lido como discricionariedade ampla ou como exigência de um critério objetivo. Quando o texto não fixa o critério, ambas as leituras ficam disponíveis, e o custo recai sobre quem tem menos poder para litigar. A precisão jurídica não elimina a interpretação, mas reduz o espaço para que a parte mais forte escolha, depois, a leitura que lhe convém. Por isso, uma boa cláusula nomeia o fato gerador, o procedimento e a consequência.",
      ko: "모호한 조항은 분쟁을 없애지 않고, 해석의 비용을 약한 쪽에 넘긴다.",
    },
  ],
  dialogue: [
    ["재현", "이 조항, '회사는 필요하다고 판단하는 경우 계약을 변경할 수 있다'고만 되어 있어요.", "Esta cláusula diz apenas que 'a empresa pode alterar o contrato quando considerar necessário'."],
    ["수진", "그 문장은 회사에 변경 권한을 주지만, 절차와 한계를 정하지 않았어요.", "Essa frase dá à empresa o poder de alterar, mas não define procedimento nem limites."],
    ["재현", "그러면 회사가 아무 때나 바꿀 수 있다는 뜻인가요?", "Então significa que a empresa pode mudar a qualquer momento?"],
    ["수진", "그렇게 해석될 소지가 있어요. 다만 '필요하다고 판단하는' 부분이 재량의 범위를 좁힐 수도 있고요.", "Há possibilidade de ser interpretado assim. No entanto, a parte 'considerar necessário' também pode restringir o alcance da discricionariedade."],
    ["재현", "상대방은 이 조항을 어떻게 읽을까요?", "E como a outra parte leria esta cláusula?"],
    ["수진", "상대방은 '합리적 필요가 있을 때만' 변경할 수 있다고 해석할 수 있어요. 그래서 해석이 갈립니다.", "A outra parte pode interpretar que a alteração só é possível 'quando houver necessidade razoável'. Por isso as interpretações se dividem."],
    ["재현", "명확하게 하려면 어떻게 써야 하죠?", "Como devemos escrever para deixar claro?"],
    ["수진", "변경 사유를 열거하고, 서면 통지와 협의 절차를 의무로 규정해야 해요. '할 수 있다' 대신 '하여야 한다'를 써야 하는 자리도 구분하고요.", "É preciso enumerar os motivos de alteração e estabelecer como obrigação o aviso por escrito e o procedimento de consulta. Também é preciso distinguir onde usar 'deve' em vez de 'pode'."],
  ],
  readingText: {
    titlePt: "Uma cláusula, duas leituras",
    paragraphs: [
      "제7조(계약의 변경) 회사는 업무상 필요하다고 판단하는 경우 본 계약의 내용을 변경할 수 있다. 변경된 내용은 회사의 홈페이지에 게시한 날부터 효력이 발생한다. 이용자는 변경된 내용을 성실히 이행하여야 한다. 이용자가 변경된 내용에 동의하지 않는 경우 계약을 해지할 수 있다. 다만 회사는 이용자의 해지로 인하여 발생한 손해에 대하여 배상할 책임을 지지 않는다.",
      "이 조항에서 문제가 되는 것은 '변경할 수 있다'는 표현이다. 이는 회사에 변경 권한을 부여하지만, 변경의 사유와 절차를 구체적으로 정하지 않는다. '업무상 필요하다고 판단하는 경우'라는 문구도 판단의 주체를 회사로 한정할 뿐, 판단의 기준을 제시하지 않는다. 따라서 이 조항은 회사의 재량을 넓게 인정하는 것으로 해석될 소지가 있다. 반면 '게시한 날부터 효력이 발생한다'는 부분은 발효 시점을 명확히 하므로, 이용자가 변경 사실을 알 수 있는 최소한의 장치로 볼 수 있다.",
      "계약 조항의 효력은 문구의 명확성에 달려 있다. 강행규정에 위반되는 조항은 당사자의 합의와 관계없이 무효가 될 수 있고, 임의규정에 해당하는 조항은 당사자가 다르게 정할 수 있다. 이 조항이 이용자에게 일방적으로 불리하게 해석될 경우, 약관의 구속력 자체가 문제가 될 수 있다. 또한 손해배상 책임을 전면적으로 면제하는 문구는 쉽게 소멸되지 않는 법적 의무와 충돌할 수 있다. 계약서를 작성할 때는 '할 수 있다'와 '하여야 한다'를 구분하고, 변경 사유와 통지 절차를 명시해야 한다. 모호한 문장은 분쟁을 유예할 뿐, 해결하지 못한다.",
    ],
    pt: "Cláusula 7ª (Alteração do contrato): a empresa pode alterar o conteúdo deste contrato quando considerar necessário para o trabalho. O conteúdo alterado entra em vigor na data de sua publicação no site da empresa. O usuário deve cumprir fielmente o conteúdo alterado. Caso não concorde com a alteração, o usuário pode rescindir o contrato. No entanto, a empresa não responde por indenização pelos danos decorrentes da rescisão pelo usuário. Nesta cláusula, o problema é a expressão 'pode alterar'. Ela confere à empresa o poder de alteração, mas não define concretamente os motivos nem o procedimento. A fórmula 'quando considerar necessário para o trabalho' apenas limita a empresa como sujeito da decisão; não apresenta o critério. Portanto, há possibilidade de que a cláusula seja interpretada como reconhecimento amplo da discricionariedade da empresa. Por outro lado, a parte 'entra em vigor na data de publicação' deixa claro o momento da eficácia e pode ser vista como um dispositivo mínimo para que o usuário saiba da alteração. A validade de uma cláusula contratual depende da clareza do texto. Cláusulas que violam normas imperativas podem ser nulas independentemente do acordo das partes, e as que correspondem a normas dispositivas podem ser livremente modificadas pelos contratantes. Se esta cláusula for interpretada de modo unilateralmente desfavorável ao usuário, a própria força vinculante dos termos de uso pode ser questionada. Além disso, uma fórmula que isenta integralmente a responsabilidade por danos pode entrar em conflito com obrigações legais difíceis de extinguir. Ao redigir um contrato, é preciso distinguir 'pode' de 'deve' e explicitar os motivos de alteração e o procedimento de notificação. Uma frase ambígua apenas suspende o conflito; não o resolve.",
    objective: "Distinguir obrigação, permissão e possibilidade na cláusula e avaliar o risco de cada leitura.",
  },
  reusedIds: ["ko:이행", "ko:유예", "ko:서면", "ko:생략"],
  grammar: [
    [
      "-ㄴ/는 것으로 해석된다 — interpreta-se como",
      "동사 + -ㄴ/는 것으로 해석된다 / 형용사 + -(으)ㄴ 것으로 해석된다 / 명사 + (으)로 해석된다",
      "Atribui uma leitura a um texto, comportamento ou cláusula, sem afirmar que essa leitura é a única. É frequente em análise jurídica e institucional, porque separa o texto da interpretação que se faz dele. Compare com -다고 본다, que assume a interpretação como opinião de um sujeito, e com -ㄴ/는 것으로 보인다, que descreve aparência ou indício. Na forma com 해석되다, o foco está no processo de leitura e no risco que ele envolve.",
      [
        ["이 조항은 회사의 재량을 넓게 인정한 것으로 해석된다.", "Interpreta-se que esta cláusula reconhece amplamente a discricionariedade da empresa."],
        ["침묵을 동의로 해석하는 것은 위험하다.", "É arriscado interpretar o silêncio como consentimento."],
      ],
    ],
    [
      "-ㄹ 소지가 있다 — há possibilidade de",
      "동사 + -ㄹ 소지가 있다",
      "Aponta uma possibilidade indesejada ou um risco, sobretudo em contexto jurídico, administrativo e jornalístico. Compare com -ㄹ 가능성이 있다, que é neutro e pode descrever qualquer probabilidade, e com -ㄹ 우려가 있다, que expressa preocupação e costuma ter tom avaliativo. A forma -ㄹ 소지가 있다 não afirma que o risco se realizou: diz que o texto ou a situação permite essa leitura.",
      [
        ["이 문구는 이용자에게 불리하게 해석될 소지가 있다.", "Há possibilidade de que esta fórmula seja interpretada em prejuízo do usuário."],
        ["절차를 생략하면 계약이 무효가 될 소지가 있다.", "Se o procedimento for omitido, há possibilidade de que o contrato seja nulo."],
      ],
    ],
  ],
  guided: [
    mcq("O que a cláusula permite à empresa?", ["Alterar o contrato quando considerar necessário, sem definir critério ou procedimento.", "Alterar o contrato apenas com autorização judicial.", "Rescindir o contrato sem qualquer consequência para o usuário."], "Alterar o contrato quando considerar necessário, sem definir critério ou procedimento.", "'변경할 수 있다' concede a permissão e deixa o critério e o procedimento em aberto."),
    cloze("Complete a análise do risco: 따라서 이 조항은 회사의 재량을 넓게 인정하는 것으로 해석될 ___가 있다.", "소지", "-ㄹ 소지가 있다 indica uma possibilidade indesejada que o texto permite."),
    listen("Ouça e escreva o que a cláusula não define.", "그 문장은 회사에 변경 권한을 주지만, 절차와 한계를 정하지 않았어요.", "그 문장은 회사에 변경 권한을 주지만, 절차와 한계를 정하지 않았어요.", "Essa frase dá à empresa o poder de alterar, mas não define procedimento nem limites."),
    translate("pt-ko", "Traduza: “Há possibilidade de que esta cláusula seja interpretada em prejuízo do usuário.”", "이 조항은 이용자에게 불리하게 해석될 소지가 있다.", "-ㄹ 소지가 있다 apresenta um risco de leitura, não um fato consumado.", ["이 조항이 이용자에게 불리하게 해석될 소지가 있습니다."]),
    reading("이 조항에서 문제가 되는 것은 '변경할 수 있다'는 표현이다. 이는 회사에 변경 권한을 부여하지만, 변경의 사유와 절차를 구체적으로 정하지 않는다. '업무상 필요하다고 판단하는 경우'라는 문구도 판단의 주체를 회사로 한정할 뿐, 판단의 기준을 제시하지 않는다.", "O que falta na cláusula para limitar o poder da empresa?", ["Critérios objetivos para a necessidade e um procedimento de alteração.", "Uma lista de todos os funcionários da empresa.", "A assinatura de uma autoridade judicial."], "Critérios objetivos para a necessidade e um procedimento de alteração.", "A cláusula nomeia o sujeito que decide, mas não o critério nem o caminho da decisão."),
  ],
  independent: [
    mcq("Qual reescrita transforma permissão ambígua em obrigação verificável?", ["A empresa deve notificar o usuário por escrito com 30 dias de antecedência e indicar o motivo da alteração.", "A empresa poderá alterar o contrato quando julgar conveniente.", "A empresa poderá, se necessário, avaliar uma possível alteração.", "A alteração será comunicada de alguma forma."], "A empresa deve notificar o usuário por escrito com 30 dias de antecedência e indicar o motivo da alteração.", "A frase usa obrigação, prazo e conteúdo verificável, em vez de permissão aberta."),
    cloze("Complete a distinção entre tipos de norma: ___에 위반되는 조항은 당사자의 합의와 관계없이 무효가 될 수 있다.", "강행규정", "강행규정 é a norma que não pode ser afastada por acordo entre as partes."),
    listen("Ouça e escreva a proposta de redação.", "변경 사유를 열거하고, 서면 통지와 협의 절차를 의무로 규정해야 해요.", "변경 사유를 열거하고, 서면 통지와 협의 절차를 의무로 규정해야 해요.", "É preciso enumerar os motivos de alteração e estabelecer como obrigação o aviso por escrito e o procedimento de consulta."),
    translate("ko-pt", "Traduza: 모호한 문장은 분쟁을 유예할 뿐, 해결하지 못한다.", "Uma frase ambígua apenas suspende o conflito; não o resolve.", "유예하다 = suspender, adiar; 해결하다 = resolver.", ["A frase ambígua só adia o conflito, sem resolvê-lo."]),
    reading("계약 조항의 효력은 문구의 명확성에 달려 있다. 강행규정에 위반되는 조항은 당사자의 합의와 관계없이 무효가 될 수 있고, 임의규정에 해당하는 조항은 당사자가 다르게 정할 수 있다.", "Por que a distinção entre norma imperativa e dispositiva importa ao redigir?", ["Porque uma cláusula pode ser nula mesmo com acordo, enquanto outra pode ser modificada pelas partes.", "Porque toda cláusula é obrigatória e imutável.", "Porque apenas o juiz pode redigir um contrato."], "Porque uma cláusula pode ser nula mesmo com acordo, enquanto outra pode ser modificada pelas partes.", "A natureza da norma define se o acordo basta ou se o texto não pode contrariá-la."),
  ],
  summary: [
    "Em texto normativo, 'deve', 'pode' e 'pode vir a' distribuem obrigação, permissão e risco.",
    "Uma cláusula ambígua transfere o custo da interpretação para quem tem menos poder de litigar.",
    "-ㄴ/는 것으로 해석된다 atribui uma leitura ao texto sem afirmar que ela é a única.",
    "-ㄹ 소지가 있다 nomeia um risco de leitura possível, não um fato consumado.",
    "Precisão jurídica exige fato gerador, procedimento e consequência, não apenas vocabulário difícil.",
  ],
  production: production(
    "Produção independente · reescrever uma cláusula ambígua",
    "Escolha uma cláusula, regra de uso ou aviso institucional ambíguo. Reescreva-o separando obrigação, permissão e possibilidade, e explique o risco que a versão original distribuía sem dizer.",
    "모호한 계약 조항이나 이용 규정을 골라 의무, 허용, 가능성을 구분해 다시 쓰고, 원문이 누구에게 위험을 넘겼는지 설명해 보세요.",
    ["Identifique a forma modal do original: obrigação, permissão ou possibilidade.", "Nomeie quem é obrigado e quem é autorizado.", "Acrescente critério, procedimento e consequência.", "Use -ㄴ/는 것으로 해석된다 ou -ㄹ 소지가 있다 uma vez.", "Explique o que a sua versão ainda deixa em aberto."],
    ["Modalidade original identificada.", "Sujeitos obrigados e autorizados nomeados.", "Critério e procedimento explícitos.", "Uma forma-alvo empregada corretamente.", "Risco residual reconhecido."],
    "원문은 '회사는 필요하다고 판단하는 경우 계약을 변경할 수 있다'고만 정한다. 이 문장은 허용을 말하지만, 판단의 기준과 절차를 말하지 않는다. 나는 이를 다음과 같이 고친다. '회사는 다음 각 호의 사유가 발생한 경우에만 계약을 변경할 수 있다. 1. 법령의 개정, 2. 서비스의 중대한 장애, 3. 요금 체계의 변경. 회사는 변경 사유와 시행일을 30일 전까지 서면으로 통지하여야 한다.' 이렇게 쓰면 변경 권한은 유지되지만, 사유와 절차가 명확해진다. 또한 '이용자는 변경에 동의하지 않을 경우 계약을 해지할 수 있다'는 문장은 유지하되, 해지로 인한 손해배상 책임을 전면 면제하는 문구는 삭제해야 한다. 그 문구는 강행규정에 위반될 소지가 있기 때문이다. 물론 모든 해석을 없앨 수는 없지만, 적어도 위험을 누가 부담하는지는 분명해진다.",
    "O original determina apenas que 'a empresa pode alterar o contrato quando considerar necessário'. A frase fala de permissão, mas não diz o critério nem o procedimento da decisão. Eu a corrijo assim: 'A empresa pode alterar o contrato somente quando ocorrer uma das seguintes hipóteses: 1. alteração legislativa; 2. falha grave do serviço; 3. mudança na estrutura tarifária. A empresa deve notificar por escrito o motivo e a data de entrada em vigor com 30 dias de antecedência.' Assim, o poder de alteração permanece, mas os motivos e o procedimento ficam claros. Também mantenho a frase 'o usuário pode rescindir o contrato caso não concorde com a alteração', mas elimino a fórmula que isenta integralmente a empresa de indenizar danos pela rescisão. Essa fórmula tem possibilidade de violar norma imperativa. É claro que não se elimina toda interpretação, mas ao menos fica claro quem arca com o risco.",
    "Exemplo original. A reescrita separa permissão, obrigação e consequência, e reconhece o risco que permanece. Exemplo ilustrativo; não é gabarito.",
  ),
});
