import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero de leitura crítica e síntese pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria: pressuposto, comparação, método, síntese ou posição avançam em ordem reconhecível." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém coerente do início ao fim." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A análise distingue o afirmado do pressuposto e calibra a conclusão pelo que a fonte permite." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra as fontes, preserva divergências e nomeia o que permanece em aberto." },
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

/** c1-l06 — pressuposição, enquadramento e o que o texto apresenta como óbvio. */
export const C1_L06 = defineC1Lesson({
  id: "c1-l06", number: 6, moduleId: "c1-m02", title: "O que o texto pressupõe",
  objective: "Identificar pressuposições, enquadramento e o que o texto apresenta como óbvio.",
  prerequisites: ["c1-c01"], estimatedMinutes: 80, dialogueTitle: "Duas manchetes, um estudo",
  intro: [
    {
      title: "Pressuposto não é afirmação",
      body: "Todo texto afirma algo e, ao mesmo tempo, dá outras coisas por evidentes. O pressuposto é o que precisa ser aceito para que a frase faça sentido, mas não é defendido com evidência. Quando um título diz que uma prática “torna as crianças mais inteligentes”, ele afirma uma causa e pressupõe que inteligência foi medida. Separar o dito do pressuposto é o primeiro gesto da leitura crítica: só então é possível verificar se o corpo do texto sustenta o que o título deu por óbvio. O pressuposto não é mentira; é uma dívida que o texto contrai e nem sempre paga.",
      ko: "제목이 암시하는 전제를 본문이 뒷받침하는지 먼저 확인해야 한다.",
    },
    {
      title: "O enquadramento pelas palavras",
      body: "A escolha lexical enquadra o leitor antes de qualquer argumento. “Avanço” e “mudança”, “custoso” e “caro”, “flexível” e “sem regras” descrevem o mesmo fato com avaliações diferentes. O enquadramento não está apenas no adjetivo: aparece no verbo, na voz passiva, na ordem dos parágrafos e no que fica fora da frase. Comparar dois títulos sobre a mesma pesquisa é um exercício eficiente, porque as diferenças de vocabulário mostram rapidamente o que cada texto quer que o leitor considere natural.",
      ko: "같은 연구를 다룬 두 제목의 어휘를 비교하면 각 기사의 관점이 드러난다.",
    },
  ],
  dialogue: [
    ["민서", "두 기사 제목을 나란히 놓고 보니까, 같은 연구인데 전제가 완전히 다르네요.", "Colocando os dois títulos lado a lado, vejo que é o mesmo estudo, mas os pressupostos são completamente diferentes."],
    ["태호", "첫 제목은 종이책을 읽는 아이가 원래 더 똑똑하다는 인상을 줘요.", "O primeiro título dá a impressão de que crianças que leem em papel são naturalmente mais inteligentes."],
    ["민서", "그렇죠. 연구는 집중 시간만 쟀는데, 제목은 지능까지 다룬 것처럼 들려요.", "Exato. O estudo mediu apenas o tempo de concentração, mas o título soa como se tratasse também da inteligência."],
    ["태호", "둘째 제목은 ‘화면보다 집중이 오래 유지된다’는 범위 안에 머물고요.", "E o segundo título fica dentro do alcance de ‘a concentração se mantém por mais tempo do que na tela’."],
    ["민서", "‘유리하다’와 ‘뛰어나다’의 차이도 커요. 앞은 비교이고 뒤는 우열이에요.", "A diferença entre ‘ser favorável’ e ‘ser superior’ também é grande. A primeira é comparação; a segunda, hierarquia."],
    ["태호", "본문에서 ‘부모의 독서 습관을 통제하지 못했다’는 문장이 빠진 것도 문제예요.", "Também é problema que tenha ficado de fora a frase ‘não foi possível controlar os hábitos de leitura dos pais’."],
    ["민서", "그 문장이 빠지면 독자는 원인을 종이책 하나로 좁히게 됩니다.", "Sem essa frase, o leitor reduz a causa apenas ao livro de papel."],
    ["태호", "그럼 두 제목 아래에 각각 무엇을 당연하게 여기는지 적어 보고, 근거가 있는지 확인해 봅시다.", "Então vamos anotar sob cada título o que ele toma como óbvio e verificar se há evidência."],
  ],
  readingText: {
    titlePt: "Duas manchetes, dois pressupostos",
    paragraphs: [
      "지난주 한 학습 연구소가 초등학생 120명을 대상으로 한 실험 결과를 발표했다. 연구진은 같은 시간 동안 종이책과 태블릿으로 글을 읽게 한 뒤, 집중이 유지된 시간을 측정했다. 결과는 종이책 집단이 평균 4분 더 오래 집중했다는 것이었다. A 신문은 이 결과를 ‘종이책 읽는 아이가 더 똑똑하다’는 제목으로 보도했다. 이 제목에는 두 가지 전제가 숨어 있다. 첫째, 집중 시간이 지능과 같다는 전제다. 둘째, 책을 읽는 습관이 아이의 능력을 결정한다는 전제다. 연구는 집중 시간만 측정했을 뿐 지능 검사를 하지 않았다.",
      "B 신문의 제목은 ‘같은 시간 읽어도 화면보다 종이에서 집중 유지’였다. 이 제목은 비교의 범위를 읽는 시간과 집중에 한정한다. 본문은 표본이 120명에 불과하고, 한 번의 측정으로 이루어졌으며, 부모의 독서 습관을 통제하지 못했다는 점을 밝힌다. 두 제목을 나란히 놓으면 차이가 분명해진다. A는 연구가 다루지 않은 능력까지 말하는 인상을 주고, B는 측정된 차이 안에 머문다. 독자는 제목이 무엇을 당연하게 여기는지 먼저 물어야 한다.",
      "전제는 문장에 직접 적히지 않아도 독자의 해석을 이끈다. ‘더 똑똑하다’는 표현은 우열을 전제하고, ‘집중이 유지된다’는 표현은 조건부 차이를 전제한다. 두 표현은 같은 수치를 서로 다른 위치에 놓는다. 비판적 읽기는 모든 전제를 의심하는 일이 아니라, 어떤 전제가 본문의 근거로 지지되는지 확인하는 일이다. 이 연구가 지지하는 것은 제한된 조건에서의 집중 시간 차이일 뿐이다. 그러므로 제목을 인용할 때도 그 범위를 함께 옮겨야 한다. 판단의 출발점은 언제나 무엇이 이미 전제되었는지를 밝히는 일이다.",
    ],
    pt: "Na semana passada, um instituto de pesquisa sobre aprendizagem divulgou o resultado de um experimento com 120 crianças do ensino fundamental. A equipe fez as crianças lerem um texto em papel e em tablet pelo mesmo tempo e depois mediu por quanto tempo a concentração se mantinha. O resultado foi que o grupo do papel manteve a concentração, em média, quatro minutos a mais. O jornal A noticiou o resultado com o título “Crianças que leem em papel são mais inteligentes”. Há dois pressupostos escondidos nesse título. O primeiro é que o tempo de concentração equivale à inteligência. O segundo é que o hábito de ler livros determina a capacidade da criança. O estudo mediu apenas o tempo de concentração e não aplicou nenhum teste de inteligência. O título do jornal B foi “Mesmo lendo o mesmo tempo, a concentração se mantém mais no papel do que na tela”. Esse título limita o alcance da comparação ao tempo de leitura e à concentração. O corpo da matéria esclarece que a amostra tem apenas 120 participantes, que houve uma única medição e que não foi possível controlar os hábitos de leitura dos pais. Colocados lado a lado, os dois títulos revelam a diferença. O texto A dá a impressão de falar até de capacidades que o estudo não abordou, enquanto o B permanece dentro da diferença medida. O leitor deve perguntar primeiro o que o título toma como evidente. O pressuposto orienta a interpretação do leitor mesmo sem estar escrito na frase. A expressão “mais inteligente” pressupõe hierarquia; a expressão “a concentração se mantém” pressupõe uma diferença condicional. As duas expressões colocam o mesmo número em posições diferentes. A leitura crítica não é desconfiar de todo pressuposto, mas verificar qual pressuposto é sustentado pelas evidências do texto. O que este estudo sustenta é apenas uma diferença de tempo de concentração em condições restritas. Por isso, ao citar o título, é preciso transportar também esse alcance. O ponto de partida do julgamento é sempre explicitar o que já foi pressuposto.",
    objective: "Comparar o que cada título afirma e o que apenas pressupõe.",
  },
  reusedIds: ["ko:판단", "ko:독자", "ko:전제", "ko:표본"],
  grammar: [
    [
      "-ㄴ/는 것으로 미루어 — a julgar por",
      "동사 + -는 것으로 미루어 / 형용사 + -(으)ㄴ 것으로 미루어 / 명사 + (으)로 미루어",
      "Introduz uma inferência feita a partir de um indício observável. O falante não afirma o fato diretamente: diz de onde o está deduzindo. É comum em textos analíticos e relatórios. Compare com -ㄴ/는 것을 보면, mais direto e frequente na fala, e com -ㄴ/는 듯하다, que expressa a impressão sem nomear a pista. Registro: neutro a formal, sobretudo escrito. Não use quando a conclusão é uma certeza documentada, porque a forma marca justamente o caráter inferencial.",
      [
        ["응답이 늦은 것으로 미루어 그는 아직 결정을 내리지 못한 듯하다.", "A julgar pela resposta tardia, ele parece ainda não ter conseguido decidir."],
        ["제목의 표현으로 미루어 기사는 원인을 하나로 좁히고 있다.", "A julgar pelas palavras do título, a matéria reduz a causa a um único fator."],
      ],
    ],
    [
      "-ㄴ/는 인상을 준다 — dá a impressão de que",
      "동사 + -는 인상을 준다 / 형용사 + -(으)ㄴ 인상을 준다 / 명사 + 인 인상을 준다",
      "Descreve o efeito que um texto, uma fala ou uma cena produz em quem lê ou ouve. A responsabilidade fica dividida: o enunciador relata a impressão sem endossá-la como fato. Compare com -ㄴ/는 느낌이다, mais subjetivo e oral, e com -ㄴ/는 척하다, que acusa uma intenção de fingir. Registro: neutro a formal. A forma é útil para criticar um enquadramento sem afirmar má-fé de quem escreveu.",
      [
        ["첫 제목은 연구가 지능까지 측정한 인상을 준다.", "O primeiro título dá a impressão de que o estudo mediu até a inteligência."],
        ["그 문단은 결론을 이미 정해 둔 인상을 준다.", "Esse parágrafo dá a impressão de que a conclusão já estava decidida."],
      ],
    ],
  ],
  guided: [
    mcq("Segundo o texto, o que o primeiro título pressupõe?", ["Que o tempo de concentração equivale à inteligência.", "Que o estudo aplicou testes padronizados de inteligência.", "Que os pais escolheram os livros das crianças."], "Que o tempo de concentração equivale à inteligência.", "O título fala em “mais inteligente”, mas o estudo mediu apenas o tempo de concentração."),
    cloze("Complete a análise do enquadramento: 이 제목은 연구가 다루지 않은 능력까지 말하는 ___을 준다.", "인상", "-는 인상을 준다 descreve o efeito do título sem assumi-lo como fato."),
    listen("Ouça e escreva o que a leitura crítica verifica.", "비판적 읽기는 모든 전제를 의심하는 일이 아니라, 어떤 전제가 본문의 근거로 지지되는지 확인하는 일이다.", "비판적 읽기는 모든 전제를 의심하는 일이 아니라, 어떤 전제가 본문의 근거로 지지되는지 확인하는 일이다.", "A leitura crítica não é desconfiar de todo pressuposto, mas verificar qual pressuposto é sustentado pelas evidências do texto."),
    reading("A 신문은 이 결과를 ‘종이책 읽는 아이가 더 똑똑하다’는 제목으로 보도했다. 이 제목에는 두 가지 전제가 숨어 있다. 첫째, 집중 시간이 지능과 같다는 전제다. 둘째, 책을 읽는 습관이 아이의 능력을 결정한다는 전제다.", "O que o texto aponta no título do jornal A?", ["Ele transforma uma medida de concentração em conclusão sobre inteligência.", "Ele informa corretamente o tamanho da amostra.", "Ele compara os hábitos de leitura dos pais."], "Ele transforma uma medida de concentração em conclusão sobre inteligência.", "O título amplia o resultado: de tempo de concentração para inteligência e capacidade."),
    translate("pt-ko", "Traduza: “O primeiro título dá a impressão de que o estudo mediu a inteligência.”", "첫 번째 제목은 연구가 지능을 측정한 인상을 준다.", "-ㄴ/는 인상을 준다 atribui o efeito ao título, não ao estudo.", ["첫 제목은 연구가 지능까지 측정한 인상을 준다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 것으로 미루어 corretamente?", ["응답이 늦은 것으로 미루어 그는 아직 결정을 내리지 못한 듯하다.", "응답이 늦는 것으로 미루어 그는 아직 결정을 내리지 못한 듯하다.", "응답이 늦었는 것으로 미루어 그는 아직 결정을 내리지 못한 듯하다."], "응답이 늦은 것으로 미루어 그는 아직 결정을 내리지 못한 듯하다.", "Com adjetivo, usa-se -(으)ㄴ 것으로 미루어: 늦은 것으로 미루어."),
    cloze("Complete a inferência: 제목의 표현으로 ___ 보면, 기사는 원인을 하나로 좁히고 있다.", "미루어", "A forma é -ㄴ/는 것으로 미루어; aqui aparece como “...으로 미루어 보면”."),
    listen("Ouça e escreva o que o segundo título limita.", "이 제목은 비교의 범위를 읽는 시간과 집중에 한정한다.", "이 제목은 비교의 범위를 읽는 시간과 집중에 한정한다.", "Esse título limita o alcance da comparação ao tempo de leitura e à concentração."),
    translate("ko-pt", "Traduza: 두 제목을 나란히 놓으면 전제의 차이가 분명해진다.", "Ao colocar os dois títulos lado a lado, a diferença de pressupostos fica clara.", "전제 = pressuposto; 나란히 놓다 = colocar lado a lado.", ["Se pusermos os dois títulos lado a lado, a diferença entre os pressupostos se torna evidente."]),
    reading("B 신문의 제목은 ‘같은 시간 읽어도 화면보다 종이에서 집중 유지’였다. 이 제목은 비교의 범위를 읽는 시간과 집중에 한정한다. 본문은 표본이 120명에 불과하고, 부모의 독서 습관을 통제하지 못했다는 점을 밝힌다.", "Como o segundo título se comporta em relação ao estudo?", ["Mantém a comparação dentro do que foi medido e o corpo da matéria declara os limites.", "Promete mais do que o estudo demonstrou.", "Oculta o tamanho da amostra."], "Mantém a comparação dentro do que foi medido e o corpo da matéria declara os limites.", "O título B limita o alcance e o texto informa a amostra pequena e a falta de controle sobre os hábitos dos pais."),
  ],
  summary: [
    "Pressuposto é o que o texto dá por evidente sem demonstrar; separá-lo do afirmado é o primeiro passo da leitura crítica.",
    "A escolha lexical enquadra o leitor antes de qualquer argumento explícito.",
    "-ㄴ/는 것으로 미루어 nomeia o indício de uma inferência em registro analítico.",
    "-ㄴ/는 인상을 준다 descreve o efeito de um texto sem endossá-lo como fato.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · revelar um pressuposto",
    "Escolha um título de notícia sobre uma pesquisa e escreva um parágrafo que separe o que ele afirma do que ele pressupõe. Depois, reescreva o título de modo que o pressuposto fique explícito e verificável.",
    "제목이 숨긴 전제를 드러내는 문단을 써 보세요.",
    ["Comece citando o título e o estudo que ele resume.", "Nomeie dois pressupostos com palavras suas, não com as do título.", "Use -ㄴ/는 것으로 미루어 uma vez para indicar de onde você infere o enquadramento.", "Use -ㄴ/는 인상을 준다 uma vez para descrever o efeito do título.", "Feche com um título reescrito que não prometa mais do que o estudo mostra."],
    ["Título e estudo identificados.", "Dois pressupostos nomeados.", "Distinção clara entre afirmado e pressuposto.", "As duas formas-alvo empregadas corretamente.", "Título reescrito compatível com a evidência."],
    "한 경제 신문은 ‘주 4일 근무, 생산성 20퍼센트 높였다’는 제목으로 한 기업의 실험을 보도했다. 이 제목은 생산성 향상이 제도 때문이라는 전제를 깔고 있다. 그러나 실험에는 통제 집단이 없었고, 참여 부서도 스스로 지원한 곳이었다. 제목의 표현으로 미루어 기사는 상관관계를 인과관계처럼 배치하고 있다. 또한 ‘20퍼센트’라는 숫자가 전체 업무의 질을 대표한다는 인상을 준다. 연구가 지지하는 것은 제한된 부서에서의 단기 변화일 뿐이다. 따라서 이 결과를 모든 기업의 생산성 향상으로 일반화하기는 어렵다. 수정 제목은 ‘주 4일 근무 시범 부서, 단기 처리량 20퍼센트 증가’가 더 정확하다.",
    "Um jornal econômico noticiou o experimento de uma empresa com o título “Semana de quatro dias aumentou a produtividade em 20%”. Esse título carrega o pressuposto de que o aumento se deve ao regime. No entanto, o experimento não teve grupo de controle, e os departamentos participantes se candidataram por conta própria. A julgar pelas palavras do título, a matéria posiciona uma correlação como se fosse causalidade. Além disso, o número “20%” dá a impressão de representar a qualidade de todo o trabalho. O que o estudo sustenta é apenas uma mudança de curto prazo em departamentos restritos. Por isso, generalizar esse resultado como aumento de produtividade de todas as empresas é difícil. Um título revisado, “Departamento-piloto da semana de quatro dias registra aumento de curto prazo no volume processado”, seria mais preciso.",
    "Exemplo original de oito frases. O parágrafo nomeia o pressuposto, indica a pista e propõe um título verificável. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l07 — comparar o alcance de duas fontes sem tratá-las como equivalentes. */
export const C1_L07 = defineC1Lesson({
  id: "c1-l07", number: 7, moduleId: "c1-m02", title: "Duas fontes, dois alcances",
  objective: "Comparar o alcance de duas fontes e explicar por que elas não são intercambiáveis.",
  prerequisites: ["c1-l06"], estimatedMinutes: 80, dialogueTitle: "O survey e a entrevista",
  intro: [
    {
      title: "Comparar exige um critério",
      body: "Dizer que duas fontes “falam do mesmo assunto” não é compará-las. Uma comparação útil escolhe um critério — escala, profundidade, período, população — e mostra como cada fonte se comporta nele. Sem critério, o leitor soma um survey nacional com uma entrevista de bairro como se fossem peças do mesmo quebra-cabeça. Com critério, fica visível que uma fonte estima a distribuição de opiniões e a outra explica por que elas existem. O critério não precisa ser único, mas precisa ser declarado antes do julgamento.",
      ko: "두 자료를 비교하려면 규모와 깊이 가운데 어떤 기준을 쓸지 먼저 밝혀야 한다.",
    },
    {
      title: "Alcance e limite andam juntos",
      body: "Toda fonte tem um alcance: o tipo de afirmação que ela permite fazer. O survey permite estimar proporções; a entrevista permite reconstruir razões; o dado administrativo permite acompanhar séries longas. O limite não é um defeito a ser escondido, mas a outra face desse alcance. Quando um texto usa uma entrevista para afirmar “a maioria dos moradores”, troca o alcance da fonte por uma conclusão que ela não sustenta. Comparar bem é dizer, para cada afirmação, de qual fonte ela vem e até onde vai.",
      ko: "인터뷰는 이유를 보여 주지만, 그 이유가 얼마나 흔한지는 알려 주지 않는다.",
    },
  ],
  dialogue: [
    ["지안", "전국 설문과 동네 인터뷰를 같이 읽고 있는데, 자꾸 같은 결론으로 묶게 돼요.", "Estou lendo o questionário nacional e as entrevistas do bairro juntos, mas acabo sempre juntando tudo numa mesma conclusão."],
    ["우재", "그게 위험한 지점이에요. 두 자료는 규모와 깊이가 달라서 서로를 대신할 수 없어요.", "Esse é o ponto perigoso. As duas fontes diferem em escala e profundidade, então não podem substituir uma à outra."],
    ["지안", "설문은 찬성 68퍼센트를 보여 주지만, 왜 찬성하는지는 말해 주지 않네요.", "O questionário mostra 68% de apoio, mas não diz por que as pessoas apoiam."],
    ["우재", "반대로 인터뷰는 이유를 자세히 보여 주는 데 비해, 그 이유가 얼마나 흔한지는 알려 주지 않아요.", "Em contrapartida, a entrevista mostra as razões em detalhe, mas não informa o quanto elas são comuns."],
    ["지안", "그러면 인터뷰 참여자 12명을 전체 여론으로 일반화하면 안 되겠네요.", "Então não devo generalizar os 12 entrevistados como a opinião de todos."],
    ["우재", "맞아요. 인터뷰는 자발적으로 참여한 주민들의 진술일 따름이에요.", "Exato. A entrevista é apenas o depoimento de moradores que participaram voluntariamente."],
    ["지안", "비교 기준을 ‘규모’와 ‘깊이’로 나눠서 문단을 쓰면 되겠어요.", "Então posso escrever o parágrafo separando os critérios de escala e profundidade."],
    ["우재", "네. 각 문장이 어느 자료에 속하는지 밝히면, 독자가 범위를 오해하지 않을 거예요.", "Sim. Se cada frase indicar a que fonte pertence, o leitor não vai confundir o alcance."],
  ],
  readingText: {
    titlePt: "Duas fontes, dois alcances",
    paragraphs: [
      "첫 번째 자료는 전국 성인 2,000명을 대상으로 한 온라인 설문이다. 조사 기관은 도시 공원의 야간 개방에 대해 찬성 68퍼센트, 반대 21퍼센트라는 결과를 발표했다. 표본은 지역과 연령을 고려해 배분되었지만, 온라인 패널에 스스로 가입한 사람들로 구성되었다는 한계가 있다. 이 자료가 보여 주는 것은 전국적 여론의 대략적인 분포다. 특정 공원의 소음이나 조명 문제를 설명하지는 못한다. 응답자의 62퍼센트는 야간에 공원을 이용한 경험이 없다고 답했다.",
      "두 번째 자료는 한 공원 인근 주민 12명을 세 차례에 걸쳐 심층 인터뷰한 기록이다. 참여자들은 개방 시간 연장에 대체로 찬성했지만, 운동장 조명과 귀가 시간대 소음을 구체적으로 걱정했다. 한 참여자는 “낮보다 밤에 산책하는 사람이 더 많아질 것”이라고 말했다. 이 자료는 경험과 우려의 내용을 보여 주는 데 비해, 그 우려가 얼마나 널리 퍼져 있는지는 알려 주지 않는다. 인터뷰는 자발적으로 참여한 주민 12명의 진술일 따름이다.",
      "두 자료를 비교할 때 기준은 규모와 깊이다. 설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다. 인터뷰는 이유를 보여 주지만, 빈도를 추정할 수 없다. 따라서 한 자료의 결론을 다른 자료에 그대로 옮길 수 없다. 야간 개방 정책을 판단하려면 두 자료를 함께 읽되, 각 문장이 어느 자료에 속하는지 밝혀야 한다. 여론 조사 결과를 주민 인터뷰의 근거로 쓰거나, 인터뷰 한 건을 전체 여론으로 일반화하는 것은 둘 다 잘못이다.",
    ],
    pt: "A primeira fonte é um questionário on-line com 2.000 adultos de todo o país. O instituto divulgou um resultado de 68% de apoio e 21% de rejeição à abertura noturna de parques urbanos. A amostra foi distribuída considerando região e faixa etária, mas tem o limite de ser formada por pessoas que se inscreveram por conta própria em um painel on-line. O que essa fonte mostra é a distribuição aproximada da opinião pública nacional. Ela não explica problemas de ruído ou iluminação de um parque específico. Sessenta e dois por cento dos respondentes disseram nunca ter usado um parque à noite. A segunda fonte é o registro de entrevistas em profundidade com 12 moradores próximos a um parque, realizadas em três encontros. Os participantes em geral apoiaram a extensão do horário, mas demonstraram preocupação concreta com a iluminação da quadra e com o ruído no horário de retorno para casa. Um participante disse que “haverá mais gente caminhando à noite do que de dia”. Essa fonte mostra o conteúdo das experiências e preocupações; em contrapartida, não informa o quanto essas preocupações estão disseminadas. A entrevista é apenas o depoimento de 12 moradores que participaram voluntariamente. Ao comparar as duas fontes, o critério é escala e profundidade. O questionário permite estimar a distribuição da opinião, mas não explica as razões da experiência. A entrevista mostra as razões, mas não permite estimar frequência. Por isso, não se pode transportar a conclusão de uma fonte diretamente para a outra. Para julgar a política de abertura noturna, é preciso ler as duas fontes juntas, indicando a que fonte pertence cada frase. Usar o resultado da pesquisa de opinião como evidência para as entrevistas de moradores, ou generalizar uma única entrevista como opinião de todos, são dois erros.",
    objective: "Reconhecer o que cada fonte permite concluir e o que não permite.",
  },
  reusedIds: ["ko:자료", "ko:근거", "ko:응답자", "ko:주민"],
  grammar: [
    [
      "-ㄴ/는 데 비해 — em comparação com; enquanto que",
      "동사 + -는 데 비해 / 형용사 + -(으)ㄴ 데 비해 / 명사 + 인 데 비해",
      "Compara dois fatos mostrando que um não acompanha o outro na mesma dimensão. É frequente em análises que contrastam métodos, custos e alcances. Compare com -는 반면(에), mais neutro e possível na fala; -는 데 비해 é mais formal e costuma explicitar a dimensão da diferença. Também se aproxima de -에 반해, que enfatiza oposição, enquanto -는 데 비해 enfatiza desproporção. Registro: formal, escrito. Não use para introduzir uma consequência nem uma ordem.",
      [
        ["설문은 규모가 큰 데 비해, 인터뷰는 경험의 깊이가 있다.", "Enquanto o questionário tem grande escala, a entrevista tem profundidade de experiência."],
        ["인터뷰는 이유를 보여 주는 데 비해, 빈도는 알려 주지 않는다.", "Enquanto a entrevista mostra as razões, não informa a frequência."],
      ],
    ],
    [
      "-ㄹ 따름이다 — é apenas; não passa de",
      "동사/형용사 + -(으)ㄹ 따름이다 / 명사 + 일 따름이다",
      "Delimita uma afirmação ao mínimo que ela pode sustentar, muitas vezes com tom de ressalva. Não acrescenta emoção: reduz o alcance. Compare com -ㄴ/는 데 지나지 않는다, que também rebaixa, mas soa mais avaliativo, e com -ㄹ 뿐이다, mais neutro e oral. Registro: formal, escrito. Use quando o objetivo é impedir que o leitor infira mais do que a fonte permite; evite em conversa casual.",
      [
        ["인터뷰는 자발적으로 참여한 주민 12명의 진술일 따름이다.", "A entrevista é apenas o depoimento de 12 moradores que participaram voluntariamente."],
        ["이 자료가 말해 주는 것은 지역적 차이일 따름이다.", "O que esta fonte diz é apenas uma diferença local."],
      ],
    ],
  ],
  guided: [
    mcq("O que o questionário nacional permite concluir?", ["A distribuição aproximada da opinião pública sobre a abertura noturna.", "As razões concretas de cada morador.", "O nível de ruído de um parque específico."], "A distribuição aproximada da opinião pública sobre a abertura noturna.", "O survey estima proporções, mas não explica as razões nem mede o ruído local."),
    cloze("Complete o limite da entrevista: 인터뷰는 자발적으로 참여한 주민 12명의 진술일 ___.", "따름이다", "-ㄹ 따름이다 reduz a afirmação ao mínimo que a fonte sustenta."),
    listen("Ouça e escreva o que o survey não consegue explicar.", "설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다.", "설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다.", "O questionário permite estimar a distribuição da opinião, mas não explica as razões da experiência."),
    reading("표본은 지역과 연령을 고려해 배분되었지만, 온라인 패널에 스스로 가입한 사람들로 구성되었다는 한계가 있다. 이 자료가 보여 주는 것은 전국적 여론의 대략적인 분포다. 특정 공원의 소음이나 조명 문제를 설명하지는 못한다.", "Qual é o alcance da primeira fonte?", ["Estimar a distribuição da opinião nacional, sem explicar problemas locais.", "Descrever em profundidade a experiência de 12 moradores.", "Medir diretamente o ruído dos parques."], "Estimar a distribuição da opinião nacional, sem explicar problemas locais.", "O texto atribui ao survey a estimativa de distribuição e nega a explicação local."),
    translate("pt-ko", "Traduza: “Enquanto o questionário tem grande escala, a entrevista tem profundidade.”", "설문은 규모가 큰 데 비해, 인터뷰는 깊이가 있다.", "-ㄴ/는 데 비해 compara duas fontes em uma dimensão explícita.", ["설문은 규모가 큰 반면, 인터뷰는 깊이가 있다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 데 비해 corretamente?", ["설문은 규모가 큰 데 비해, 인터뷰는 깊이가 있다.", "설문은 규모가 크는 데 비해, 인터뷰는 깊이가 있다.", "설문은 규모가 컸는 데 비해, 인터뷰는 깊이가 있다."], "설문은 규모가 큰 데 비해, 인터뷰는 깊이가 있다.", "Com adjetivo, a forma é -(으)ㄴ 데 비해: 큰 데 비해."),
    cloze("Complete a ressalva metodológica: 설문 결과를 인터뷰의 ___로 쓰는 것은 잘못이다.", "근거", "O resultado do survey não serve como evidência para o que as entrevistas mostram."),
    listen("Ouça e escreva o erro de generalização apontado.", "인터뷰 한 건을 전체 여론으로 일반화해서는 안 된다.", "인터뷰 한 건을 전체 여론으로 일반화해서는 안 된다.", "Não se deve generalizar uma única entrevista como a opinião de todos."),
    translate("ko-pt", "Traduza: 인터뷰는 자발적으로 참여한 주민 12명의 진술일 따름이다.", "A entrevista é apenas o depoimento de 12 moradores que participaram voluntariamente.", "진술일 따름이다 = é apenas um depoimento; a forma limita o alcance.", ["A entrevista não passa do depoimento de doze moradores que se dispuseram a participar."]),
    reading("두 자료를 비교할 때 기준은 규모와 깊이다. 설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다. 인터뷰는 이유를 보여 주지만, 빈도를 추정할 수 없다.", "Por que as duas fontes não são intercambiáveis?", ["Porque cada uma permite um tipo de afirmação e nenhuma cobre o que a outra cobre.", "Porque uma delas está incorreta.", "Porque ambas usam a mesma amostra."], "Porque cada uma permite um tipo de afirmação e nenhuma cobre o que a outra cobre.", "O texto separa estimativa de distribuição e explicação de razões; nenhuma fonte substitui a outra."),
  ],
  summary: [
    "Comparar fontes exige um critério declarado, como escala, profundidade, período ou população.",
    "Toda fonte tem alcance e limite: o survey estima distribuição; a entrevista reconstrói razões.",
    "-ㄴ/는 데 비해 contrasta duas fontes ou fatos em uma dimensão explícita, em registro formal.",
    "-ㄹ 따름이다 reduz a afirmação ao que a fonte realmente sustenta.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · duas fontes, um critério",
    "Escolha duas fontes sobre o mesmo tema com métodos diferentes e escreva um parágrafo comparativo. Declare o critério, diga o que cada fonte permite concluir e por que uma não substitui a outra.",
    "방법이 다른 두 자료를 하나의 기준으로 비교하는 문단을 써 보세요.",
    ["Abra com o critério de comparação, antes de descrever as fontes.", "Descreva o alcance de cada fonte em uma frase.", "Use -ㄴ/는 데 비해 uma vez para marcar a diferença principal.", "Use -ㄹ 따름이다 uma vez para delimitar o que uma das fontes não passa de.", "Feche dizendo o que seria preciso para integrar as duas."],
    ["Critério declarado na abertura.", "Alcance das duas fontes descrito.", "Diferença marcada com a forma-alvo.", "Limite de uma fonte delimitado.", "Conclusão que não iguala as fontes."],
    "이 글은 청년 주거 지원 정책을 다룬 두 자료를 비교한다. 비교 기준은 대상 인구와 정책 경험의 깊이다. 첫 자료는 전국 청년 3,000명을 대상으로 한 설문으로, 월세 부담을 느끼는 비율이 71퍼센트라는 분포를 보여 준다. 둘째 자료는 한 지역의 청년 15명을 심층 인터뷰한 기록으로, 부모와의 갈등이나 이사 과정의 구체적인 경험을 담고 있다. 설문은 대표성 있는 비율을 제시하는 데 비해, 인터뷰는 그 비율 뒤에 있는 이유를 보여 준다. 다만 인터뷰는 자발적으로 참여한 15명의 진술일 따름이므로, 전체 청년의 경험으로 일반화할 수 없다. 두 자료를 함께 쓰려면 비율은 설문에, 이유는 인터뷰에 귀속시켜야 한다.",
    "Este texto compara duas fontes sobre políticas de apoio à moradia para jovens. O critério de comparação é a população-alvo e a profundidade da experiência com a política. A primeira fonte é um questionário com 3.000 jovens de todo o país, que mostra que 71% deles sentem o peso do aluguel. A segunda é o registro de entrevistas em profundidade com 15 jovens de uma região, que traz experiências concretas de conflito com os pais ou de mudança de casa. Enquanto o questionário apresenta proporções com representatividade, a entrevista mostra as razões por trás dessas proporções. No entanto, a entrevista é apenas o depoimento de 15 pessoas que participaram voluntariamente, portanto não pode ser generalizada para todos os jovens. Para usar as duas fontes juntas, é preciso atribuir as proporções ao questionário e as razões à entrevista.",
    "Exemplo original de oito frases. O critério vem antes das fontes e cada afirmação é atribuída à fonte correspondente. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l08 — método, amostra e inferência antes de aceitar a conclusão. */
export const C1_L08 = defineC1Lesson({
  id: "c1-l08", number: 8, moduleId: "c1-m02", title: "Método e credibilidade",
  objective: "Avaliar método, amostra e inferência antes de aceitar uma conclusão.",
  prerequisites: ["c1-l07"], estimatedMinutes: 80, dialogueTitle: "Quarenta participantes, uma política nacional",
  intro: [
    {
      title: "Validade interna e externa",
      body: "Um estudo pode ser bem feito e, ainda assim, não autorizar a conclusão que dele se extrai. A validade interna pergunta se o desenho permite atribuir a mudança ao fator estudado: há grupo de controle, medição adequada, variáveis concorrentes? A validade externa pergunta a quem o resultado se aplica: a amostra representa a população que se quer atingir? Um estudo com boa validade interna e amostra pequena pode ser confiável e pouco generalizável. As duas perguntas precisam ser feitas separadamente, porque uma não compensa a outra.",
      ko: "표본이 작아도 설계가 좋으면 내적 타당도는 확보될 수 있지만, 외적 타당도는 별개의 문제다.",
    },
    {
      title: "Inferência pede grau, não salto",
      body: "A conclusão de uma pesquisa é sempre uma inferência: vai do que foi medido ao que se quer saber. Essa passagem deve ter um grau declarado. “O estudo mostra” é diferente de “há alta probabilidade de que, em condições semelhantes, ...”. Quando o texto salta da amostra para a política nacional sem declarar o grau, o leitor perde a medida do risco. Calibrar a inferência não enfraquece o estudo: mostra exatamente o que ele acrescenta ao debate e o que ainda precisa ser testado.",
      ko: "연구 결과를 정책에 적용하려면 표본과 조건이 얼마나 비슷한지 먼저 따져야 한다.",
    },
  ],
  dialogue: [
    ["혜원", "이 연구, 상담원 40명 결과로 전국 제도를 권고했네요.", "Este estudo recomenda um sistema nacional com base no resultado de 40 atendentes."],
    ["도현", "결과 자체는 흥미롭지만, 방법을 먼저 봐야 해요. 통제 집단이 없어요.", "O resultado em si é interessante, mas precisamos ver o método primeiro. Não há grupo de controle."],
    ["혜원", "수면 시간은 기기 기록과 자기 보고를 함께 쟀으니 신뢰도는 어느 정도 있겠네요.", "O tempo de sono foi medido com registro do aparelho e autorrelato, então deve haver alguma confiabilidade."],
    ["도현", "반면 상담 건수는 업무량 변화를 배제하지 못해요. 계절 요인도 있고요.", "Em contrapartida, o número de atendimentos não exclui mudanças no volume de trabalho. Há também o fator sazonal."],
    ["혜원", "참여자가 자발적으로 지원했다는 점도 편향으로 작용할 수 있겠네요.", "O fato de os participantes terem se candidatado voluntariamente também pode funcionar como viés."],
    ["도현", "그래서 이 결과를 근거로 전국 확대를 말하기는 어려워요.", "Por isso é difícil falar em expansão nacional com base neste resultado."],
    ["혜원", "그러면 ‘비슷한 환경에서 도움이 될 개연성이 높다’ 정도로 결론을 낮출까요?", "Então vamos baixar a conclusão para algo como “há alta probabilidade de ajudar em ambientes semelhantes”?"],
    ["도현", "좋아요. 대신 여러 지역에서 반복 연구가 필요하다는 조건을 꼭 붙입시다.", "Bom. Mas vamos incluir obrigatoriamente a condição de que são necessários estudos repetidos em várias regiões."],
  ],
  readingText: {
    titlePt: "O que quarenta participantes sustentam",
    paragraphs: [
      "한 연구팀이 콜센터 상담원 40명을 대상으로 근무 시작 시간을 30분 늦추는 실험을 8주 동안 진행했다. 연구진은 수면 시간과 집중도를 설문과 활동량 기록으로 측정했다. 결과는 평균 수면 시간이 22분 늘고, 오전 상담 건수가 6퍼센트 증가했다는 것이었다. 연구진은 이 결과를 근거로 전국 콜센터에 같은 제도를 권고했다. 그러나 표본은 한 회사, 한 지역의 상담원 40명이며, 통제 집단이 없었다. 같은 기간의 계절적 요인도 배제하지 못했다.",
      "방법을 살펴보면 타당도의 범위가 드러난다. 수면 시간은 기기 기록과 자기 보고를 함께 사용해 측정했으므로 내적 타당도는 어느 정도 확보되었다. 반면 상담 건수는 업무량 자체가 늘었을 가능성을 배제하지 못한다. 8주 동안 신규 상담이 증가했다면, 집중도가 아니라 업무량이 결과를 만들었을 수 있다. 또한 참여자는 자발적으로 지원한 상담원이므로, 이 제도에 우호적인 사람들이 더 많이 포함되었을 개연성이 높다.",
      "따라서 이 연구가 지지하는 결론은 제한적이다. 비슷한 업무 환경의 상담원에게 근무 시작 시간 조정이 도움이 될 개연성이 높다는 정도다. 전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다. 정책을 검토하려면 여러 지역과 규모가 다른 사업장에서 반복 연구가 필요하다. 연구 결과를 인용할 때는 표본, 기간, 통제 여부를 함께 밝혀야 한다. 결론이 방법보다 앞서면, 정책은 근거 대신 기대에 기대게 된다.",
    ],
    pt: "Uma equipe de pesquisa realizou, durante oito semanas, um experimento com 40 atendentes de call center, atrasando em 30 minutos o início do expediente. A equipe mediu o tempo de sono e a concentração por meio de questionários e registros de atividade. O resultado foi que o tempo médio de sono aumentou 22 minutos e o número de atendimentos pela manhã cresceu 6%. Com base nesse resultado, a equipe recomendou o mesmo sistema a todos os call centers do país. No entanto, a amostra é de 40 atendentes de uma única empresa e de uma única região, e não houve grupo de controle. Também não foi possível descartar fatores sazonais do mesmo período. Ao examinar o método, percebe-se o alcance da validade. Como o tempo de sono foi medido com registro do aparelho e autorrelato, a validade interna foi garantida em alguma medida. Em contrapartida, o número de atendimentos não exclui a possibilidade de o próprio volume de trabalho ter aumentado. Se novos atendimentos cresceram durante as oito semanas, pode ter sido o volume, e não a concentração, que produziu o resultado. Além disso, como os participantes se candidataram voluntariamente, há alta probabilidade de terem sido incluídos mais atendentes favoráveis ao sistema. Portanto, a conclusão que este estudo sustenta é limitada. No máximo, há alta probabilidade de que o ajuste do horário de início ajude atendentes em ambientes de trabalho semelhantes. Para servir de base a uma aplicação em todos os call centers do país, falta validade externa. Para avaliar a política, são necessários estudos repetidos em empresas de várias regiões e portes. Ao citar o resultado, é preciso declarar a amostra, o período e a existência ou não de controle. Se a conclusão vier antes do método, a política passa a se apoiar em expectativa, não em evidência.",
    objective: "Avaliar se a conclusão é compatível com o método descrito.",
  },
  reusedIds: ["ko:연구", "ko:결과", "ko:개연성", "ko:서면"],
  grammar: [
    [
      "-ㄴ/는 근거로 — com base em; tendo como base",
      "명사 + (을/를) 근거로 / 절 + -다는 근거로",
      "Indica a base sobre a qual se faz uma afirmação, uma decisão ou uma recomendação. Pode introduzir tanto a evidência legítima quanto a insuficiente — e é justamente por isso que serve à crítica metodológica. Compare com -에 따라, que descreve conformidade ou dependência, e com -을 바탕으로, que sugere uma base mais ampla e menos probatória. Registro: formal, escrito. Não confunda com -는 근거다, que apresenta a causa de um fato.",
      [
        ["연구진은 이 결과를 근거로 전국 확대를 권고했다.", "A equipe recomendou a expansão nacional com base neste resultado."],
        ["표본 40명을 근거로 모든 사업장에 적용하기는 어렵다.", "É difícil aplicar a todos os locais de trabalho com base em uma amostra de 40 pessoas."],
      ],
    ],
    [
      "-ㄹ 개연성이 높다 — há alta probabilidade de",
      "동사/형용사 + -(으)ㄹ 개연성이 높다",
      "Marca uma inferência provável, sem transformá-la em certeza. É típica de textos que avaliam risco, previsão ou generalização. Compare com -ㄹ 가능성이 높다, mais neutro e frequente na fala; -ㄹ 개연성은 mais analítico e aparece em relatórios. Também se distingue de -ㄹ 것이다, que projeta o futuro, enquanto a forma-alvo avalia a plausibilidade de uma hipótese. Registro: formal, escrito.",
      [
        ["제도에 우호적인 사람들이 더 많이 포함되었을 개연성이 높다.", "Há alta probabilidade de terem sido incluídas mais pessoas favoráveis ao sistema."],
        ["여러 지역에서 반복되면 비슷한 결과가 나올 개연성이 높다.", "Se for repetido em várias regiões, há alta probabilidade de surgir um resultado semelhante."],
      ],
    ],
  ],
  guided: [
    mcq("Por que a conclusão do estudo é limitada?", ["Porque a amostra é de uma empresa, sem grupo de controle e com participantes voluntários.", "Porque os pesquisadores não mediram o sono.", "Porque o estudo durou oito anos."], "Porque a amostra é de uma empresa, sem grupo de controle e com participantes voluntários.", "O texto aponta três limites: um único local, ausência de controle e autosseleção."),
    cloze("Complete a inferência sobre a autosseleção: 제도에 우호적인 사람들이 포함되었을 ___이 높다.", "개연성", "-ㄹ 개연성이 높다 expressa uma hipótese provável, não uma certeza."),
    listen("Ouça e escreva o limite de generalização apontado pela equipe.", "전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다.", "전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다.", "Para servir de base a uma aplicação em todos os call centers do país, falta validade externa."),
    reading("수면 시간은 기기 기록과 자기 보고를 함께 사용해 측정했으므로 내적 타당도는 어느 정도 확보되었다. 반면 상담 건수는 업무량 자체가 늘었을 가능성을 배제하지 못한다.", "Qual é a diferença de validade entre as duas medidas?", ["A medida do sono tem alguma validade interna; a dos atendimentos não exclui o aumento do volume de trabalho.", "As duas medidas têm a mesma validade.", "A medida dos atendimentos é mais confiável que a do sono."], "A medida do sono tem alguma validade interna; a dos atendimentos não exclui o aumento do volume de trabalho.", "O texto contrasta a medição do sono com a dos atendimentos e seus confundidores."),
    translate("pt-ko", "Traduza: “Com base na amostra, não se pode recomendar o sistema a todo o país.”", "표본을 근거로 전국에 제도를 권고할 수 없다.", "-을 근거로 indica a base da afirmação; aqui, uma base insuficiente.", ["표본 40명을 근거로 전국에 같은 제도를 권고할 수는 없다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ 개연성이 높다 corretamente?", ["여러 지역에서 반복되면 같은 결과가 나올 개연성이 높다.", "여러 지역에서 반복되면 같은 결과가 나오는 개연성이 높다.", "여러 지역에서 반복되면 같은 결과가 나왔을 개연성이 높다."], "여러 지역에서 반복되면 같은 결과가 나올 개연성이 높다.", "A forma é -(으)ㄹ 개연성이 높다: 나올 개연성이 높다."),
    cloze("Complete a ressalva metodológica: 기기 기록과 자기 보고를 함께 썼으므로 내적 ___는 어느 정도 확보되었다.", "타당도", "내적 타당도 = validade interna; o texto opõe esse ganho à falta de validade externa."),
    listen("Ouça e escreva o que a equipe deveria fazer antes de recomendar a política.", "여러 지역과 규모가 다른 사업장에서 반복 연구가 필요하다.", "여러 지역과 규모가 다른 사업장에서 반복 연구가 필요하다.", "São necessários estudos repetidos em empresas de várias regiões e portes."),
    translate("ko-pt", "Traduza: 참여자가 자발적으로 지원했으므로 선택 편향을 배제할 수 없다.", "Como os participantes se candidataram voluntariamente, não se pode descartar o viés de seleção.", "편향 = viés; 배제하다 = descartar.", ["Já que a participação foi voluntária, não é possível excluir um viés de seleção."]),
    reading("따라서 이 연구가 지지하는 결론은 제한적이다. 비슷한 업무 환경의 상담원에게 근무 시작 시간 조정이 도움이 될 개연성이 높다는 정도다. 전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다.", "Qual conclusão o texto considera defensável?", ["Que há alta probabilidade de ajuda em ambientes de trabalho semelhantes, não em todo o país.", "Que o sistema deve ser aplicado imediatamente em todos os call centers.", "Que o estudo não tem nenhum valor."], "Que há alta probabilidade de ajuda em ambientes de trabalho semelhantes, não em todo o país.", "O texto calibra a conclusão ao ambiente estudado e recusa a generalização nacional."),
  ],
  summary: [
    "Validade interna e externa são perguntas distintas: uma trata do desenho, outra da generalização.",
    "Amostra pequena e autosselecionada limitam a inferência mesmo quando a medição é cuidadosa.",
    "-을/를 근거로 indica a base de uma recomendação e pode expor uma base insuficiente.",
    "-ㄹ 개연성이 높다 calibra a hipótese em vez de convertê-la em certeza.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · uma ressalva metodológica",
    "Resuma um estudo com amostra pequena e escreva uma ressalva metodológica para um texto que o apresentou como prova definitiva. Diga o que o método sustenta, o que ele não sustenta e que estudo seria necessário.",
    "과장된 연구 요약에 방법론적 단서를 붙이는 글을 써 보세요.",
    ["Descreva a amostra, o instrumento e o período em uma frase cada.", "Use -을/를 근거로 uma vez para mostrar o que a conclusão toma como base.", "Use -ㄹ 개연성이 높다 uma vez para formular a inferência possível.", "Nomeie um confundidor concreto, não apenas “falta de dados”.", "Feche com o desenho que reduziria a incerteza."],
    ["Amostra, instrumento e período descritos.", "Confundidor específico nomeado.", "Conclusão recalibrada com a forma-alvo.", "Distinção entre validade interna e externa.", "Próximo estudo proposto."],
    "이 보고서는 한 회사 직원 35명을 대상으로 한 실내 조명 실험을 다룬다. 연구진은 조명 밝기를 높인 뒤 두 달 동안 오류 건수를 비교했다. 오류는 12퍼센트 줄었지만, 같은 기간에 업무 절차도 함께 바뀌었다. 따라서 조명만을 근거로 오류 감소를 설명하기는 어렵다. 참여자 35명은 지원한 사람들로 구성되어 선택 편향도 배제할 수 없다. 이 결과가 지지하는 것은 밝은 조명이 특정 업무 환경에서 도움이 될 개연성이 높다는 정도다. 다른 사업장에 적용하려면 절차 변화를 통제한 반복 연구가 필요하다.",
    "Este relatório trata de um experimento de iluminação interna com 35 funcionários de uma empresa. A equipe aumentou o brilho da iluminação e comparou o número de erros durante dois meses. Os erros caíram 12%, mas, no mesmo período, o procedimento de trabalho também mudou. Por isso, é difícil explicar a redução dos erros com base apenas na iluminação. Os 35 participantes foram pessoas que se candidataram, de modo que o viés de seleção também não pode ser descartado. O que este resultado sustenta é, no máximo, que há alta probabilidade de que uma iluminação mais clara ajude em ambientes específicos de trabalho. Para aplicar em outros locais, são necessários estudos repetidos que controlem a mudança de procedimento.",
    "Exemplo original de oito frases. A ressalva nomeia um confundidor concreto e recalibra a conclusão. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l09 — sintetizar fontes preservando convergências, divergências e lacunas. */
export const C1_L09 = defineC1Lesson({
  id: "c1-l09", number: 9, moduleId: "c1-m02", title: "Sintetizar sem apagar",
  objective: "Sintetizar duas ou três fontes preservando convergências, divergências e lacunas.",
  prerequisites: ["c1-l08"], estimatedMinutes: 80, dialogueTitle: "A tabela antes do texto",
  intro: [
    {
      title: "Convergência, divergência e lacuna",
      body: "Uma síntese não é um resumo em série nem uma média entre estudos. Ela organiza as fontes em três colunas: o que todas sustentam, onde elas se separam e o que nenhuma responde. A convergência dá a base comum; a divergência mostra o ponto exato do desacordo; a lacuna impede que o texto prometa uma resposta que as fontes não têm. Sem as três colunas, a síntese parece mais firme do que é. Com elas, o leitor vê não só o que sabemos, mas também por que ainda não sabemos tudo.",
      ko: "세 연구의 공통점과 차이점, 그리고 아무도 다루지 않은 빈틈을 따로 적어야 한다.",
    },
    {
      title: "Atribuição é parte da síntese",
      body: "Sintetizar exige devolver cada afirmação à fonte de onde veio. “Estudos mostram” é cômodo e quase sempre impreciso: quais estudos, com que método, sobre qual população? A atribuição não é um ornamento acadêmico; é o que permite ao leitor discordar de uma fonte sem descartar o conjunto. Quando três vozes viram uma só, o texto ganha fluidez e perde verificabilidade. O bom parágrafo de síntese nomeia a fonte na própria frase e deixa visível onde uma conclusão depende de um desenho específico.",
      ko: "“연구에 따르면”이라고 뭉뚱그리면 어느 연구의 결과인지 확인할 수 없게 된다.",
    },
  ],
  dialogue: [
    ["수빈", "세 연구를 표로 정리했는데, 공통점부터 쓸까요?", "Organizei os três estudos em uma tabela; começo pelos pontos em comum?"],
    ["예린", "네. 유연성이 학습 관리에 영향을 준다는 점은 세 연구가 함께 말해요.", "Sim. Os três estudos dizem juntos que a flexibilidade influencia a gestão do aprendizado."],
    ["수빈", "그런데 성취도는 첫 연구와 셋째 연구가 상반된 결과를 보여요.", "Mas no desempenho o primeiro e o terceiro estudos mostram resultados opostos."],
    ["예린", "설계가 다르니까요. 하나는 실험이고, 다른 하나는 행정 자료 분석이에요.", "Porque os desenhos são diferentes. Um é experimento; o outro, análise de dados administrativos."],
    ["수빈", "둘째 인터뷰는 이유를 설명하는 한편으로, 빈도는 말해 주지 않네요.", "A segunda entrevista, por um lado, explica as razões; por outro, não informa a frequência."],
    ["예린", "그래서 종합할 때 ‘무엇이 공통이고 무엇이 다른지’를 문장마다 표시해야 해요.", "Por isso, na síntese, é preciso indicar em cada frase o que é comum e o que é diferente."],
    ["수빈", "장기 유지에 대한 자료가 없다는 점도 빈틈으로 남기죠.", "Vamos deixar também como lacuna a ausência de dados sobre retenção de longo prazo."],
    ["예린", "좋아요. 갈등을 지우지 않고, 갈등의 위치를 정확히 쓰는 게 목적이에요.", "Bom. O objetivo é não apagar o conflito, mas escrever com precisão onde ele está."],
  ],
  readingText: {
    titlePt: "Três estudos, três vozes",
    paragraphs: [
      "온라인 강의의 효과를 다룬 세 편의 연구를 비교해 보자. 첫 연구는 대학생 1,200명을 무작위로 두 집단으로 나누어 12주 동안 수업을 진행했다. 온라인과 대면을 섞은 집단의 시험 점수가 0.2표준편차만큼 높았다. 두 번째 연구는 학생 30명을 인터뷰해 시간 관리의 자유를 장점으로, 고립감을 단점으로 정리했다. 세 번째 연구는 5년간의 행정 자료를 분석해 온라인 전용 과정의 수료율이 7퍼센트포인트 낮다고 보고했다.",
      "세 연구는 서로 다른 것을 보여 준다. 첫 연구는 특정 설계에서 성취도 차이를 추정할 수 있게 하고, 둘째 연구는 학생의 관점에서 그 차이가 생기는 이유를 설명한다. 셋째 연구는 장기간의 수료율을 보여 주지만, 과정의 질이나 학생 구성을 통제하지 못했다. 공통점은 유연성이 학습 관리에 영향을 준다는 점이다. 반면 성취도에 대해서는 긍정적 결과와 부정적 결과가 동시에 존재한다. 어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.",
      "이런 경우 좋은 종합은 하나의 결론으로 수렴하지 않는다. 먼저 유연성의 효과는 세 연구가 공유하는 부분으로 정리한다. 다음으로 성취도의 방향이 설계에 따라 달라진다는 점을 밝힌다. 마지막으로 장기 유지라는 빈틈을 남겨 둔다. 각 문장에는 어느 연구의 결과인지 표시해야 한다. “연구에 따르면”이라고 뭉뚱그리면, 세 목소리가 하나로 섞여 버린다. 종합의 목적은 갈등을 지우는 것이 아니라, 갈등의 위치를 정확히 표시하는 것이다.",
    ],
    pt: "Vamos comparar três estudos sobre o efeito das aulas on-line. O primeiro dividiu 1.200 universitários aleatoriamente em dois grupos e conduziu as aulas por 12 semanas. O grupo que combinava on-line e presencial teve notas 0,2 desvio-padrão mais altas. O segundo entrevistou 30 estudantes e organizou a liberdade de gestão do tempo como vantagem e o isolamento como desvantagem. O terceiro analisou cinco anos de dados administrativos e relatou que a taxa de conclusão dos cursos exclusivamente on-line era 7 pontos percentuais menor. Os três estudos mostram coisas diferentes. O primeiro permite estimar a diferença de desempenho em um desenho específico; o segundo explica, do ponto de vista dos estudantes, por que essa diferença ocorre. O terceiro mostra a taxa de conclusão ao longo do tempo, mas não controlou a qualidade do curso nem a composição dos estudantes. O ponto em comum é que a flexibilidade influencia a gestão do aprendizado. Em contrapartida, quanto ao desempenho, existem ao mesmo tempo resultados positivos e negativos. Nenhum dos estudos tratou da retenção de conhecimento depois da formatura. Nesse caso, uma boa síntese não converge para uma única conclusão. Primeiro, organiza o efeito da flexibilidade como a parte compartilhada pelos três estudos. Depois, mostra que a direção do desempenho varia conforme o desenho. Por fim, deixa em aberto a lacuna da retenção de longo prazo. Cada frase deve indicar de qual estudo vem o resultado. Se resumirmos tudo com “segundo pesquisas”, as três vozes se misturam em uma só. O objetivo da síntese não é apagar o conflito, mas indicar com precisão onde ele está.",
    objective: "Mapear convergência, divergência e lacuna entre as fontes.",
  },
  reusedIds: ["ko:분석", "ko:관점", "ko:설계", "ko:추정"],
  grammar: [
    [
      "-ㄴ/는 동시에 — ao mesmo tempo que; e também",
      "동사 + -는 동시에 / 형용사 + -(으)ㄴ 동시에 / 명사 + 인 동시에",
      "Liga dois fatos que coexistem, sem estabelecer causa entre eles. Na escrita analítica, serve para reconhecer um ganho e um custo na mesma fonte. Compare com -ㄹ 뿐더러, que soma na mesma direção e intensifica, e com -는 반면, que opõe. -ㄴ/는 동시에 não escolhe lado: apenas registra coexistência. Registro: formal, escrito. Não use para duas ações sequenciais nem para fatos que se excluem.",
      [
        ["온라인 강의는 시간 관리가 자유로운 동시에 고립감이 크다.", "A aula on-line é, ao mesmo tempo, livre na gestão do tempo e marcada pelo isolamento."],
        ["이 연구는 성취도를 보여 주는 동시에 수료율의 한계도 드러낸다.", "Este estudo mostra o desempenho e, ao mesmo tempo, revela o limite da taxa de conclusão."],
      ],
    ],
    [
      "-ㄴ/는 한편으로 — por um lado",
      "동사 + -는 한편으로 / 형용사 + -(으)ㄴ 한편으로 / 명사 + 인 한편으로",
      "Apresenta um segundo aspecto que coexiste com o primeiro, frequentemente com contraste ou ressalva. É comum em sínteses que reconhecem mérito e limite da mesma fonte. Compare com -는 한편, que também contrasta, mas costuma ter valor mais adversativo; -ㄴ/는 한편으로 destaca a coexistência de perspectivas. Pode aparecer como “한편으로는 ... 한편으로는 ...”. Registro: neutro a formal.",
      [
        ["인터뷰는 이유를 설명하는 한편으로, 빈도는 말해 주지 않는다.", "A entrevista, por um lado, explica as razões; por outro, não informa a frequência."],
        ["행정 자료는 규모를 보여 주는 한편으로, 과정의 질을 통제하지 못한다.", "Os dados administrativos, por um lado, mostram a escala; por outro, não controlam a qualidade do curso."],
      ],
    ],
  ],
  guided: [
    mcq("O que os três estudos têm em comum?", ["Que a flexibilidade influencia a gestão do aprendizado.", "Que as aulas on-line melhoram sempre as notas.", "Que todos usaram a mesma amostra de 1.200 estudantes."], "Que a flexibilidade influencia a gestão do aprendizado.", "O texto identifica a flexibilidade como o ponto compartilhado pelas três fontes."),
    cloze("Complete a convergência: 세 연구의 ___은 유연성이 학습 관리에 영향을 준다는 것이다.", "공통점", "공통점 = ponto em comum; a síntese separa convergência, divergência e lacuna."),
    listen("Ouça e escreva o que nenhum dos estudos tratou.", "어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "Nenhum dos estudos tratou da retenção de conhecimento depois da formatura."),
    reading("첫 연구는 대학생 1,200명을 무작위로 두 집단으로 나누어 12주 동안 수업을 진행했다. 온라인과 대면을 섞은 집단의 시험 점수가 0.2표준편차만큼 높았다. 세 번째 연구는 5년간의 행정 자료를 분석해 온라인 전용 과정의 수료율이 7퍼센트포인트 낮다고 보고했다.", "Como o texto trata os resultados de desempenho?", ["Reconhece que há resultados positivos e negativos, conforme o desenho.", "Escolhe o resultado positivo como definitivo.", "Descarta os dois resultados por serem contraditórios."], "Reconhece que há resultados positivos e negativos, conforme o desenho.", "A síntese preserva a divergência em vez de escolher um lado."),
    translate("pt-ko", "Traduza: “Os três estudos não convergem para uma única conclusão.”", "세 연구가 하나의 결론으로 수렴하지는 않는다.", "A partícula 는 em 수렴하지는 않는다 destaca a negação sem afirmar que os estudos se contradizem.", ["세 연구를 하나의 결론으로 묶을 수는 없다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 동시에 corretamente?", ["온라인 강의는 시간 관리가 자유로운 동시에 고립감이 크다.", "온라인 강의는 시간 관리가 자유롭는 동시에 고립감이 크다.", "온라인 강의는 시간 관리가 자유로울 동시에 고립감이 크다."], "온라인 강의는 시간 관리가 자유로운 동시에 고립감이 크다.", "Com adjetivo, usa-se -(으)ㄴ 동시에: 자유로운 동시에."),
    cloze("Complete a atribuição: 각 문장에는 어느 연구의 결과인지 ___해야 한다.", "표시", "표시하다 = indicar; a atribuição deve aparecer em cada frase da síntese."),
    listen("Ouça e escreva o objetivo da síntese.", "종합의 목적은 갈등을 지우는 것이 아니라, 갈등의 위치를 정확히 표시하는 것이다.", "종합의 목적은 갈등을 지우는 것이 아니라, 갈등의 위치를 정확히 표시하는 것이다.", "O objetivo da síntese não é apagar o conflito, mas indicar com precisão onde ele está."),
    translate("ko-pt", "Traduza: 인터뷰는 이유를 설명하는 한편으로, 빈도는 말해 주지 않는다.", "A entrevista, por um lado, explica as razões; por outro, não informa a frequência.", "-ㄴ/는 한편으로 apresenta dois aspectos coexistentes da mesma fonte.", ["A entrevista explica as razões, mas não diz com que frequência elas ocorrem."]),
    reading("공통점은 유연성이 학습 관리에 영향을 준다는 점이다. 반면 성취도에 대해서는 긍정적 결과와 부정적 결과가 동시에 존재한다. 어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "Qual é a lacuna que a síntese preserva?", ["A ausência de dados sobre retenção de conhecimento após a formatura.", "A falta de entrevistas com estudantes.", "A diferença entre aulas on-line e presenciais."], "A ausência de dados sobre retenção de conhecimento após a formatura.", "O texto nomeia explicitamente a lacuna: nenhum estudo acompanhou a retenção depois da formatura."),
  ],
  summary: [
    "A síntese organiza as fontes em convergência, divergência e lacuna, em vez de fazer uma média.",
    "Atribuir cada afirmação à fonte correta é condição de verificabilidade.",
    "-ㄴ/는 동시에 registra coexistência de dois fatos sem afirmar causa.",
    "-ㄴ/는 한편으로 introduz um segundo aspecto da mesma fonte, muitas vezes com ressalva.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · síntese de três fontes",
    "Escreva uma síntese de cinco a oito frases sobre um tema em que você encontrou pelo menos três fontes. Separe convergência, divergência e lacuna, e atribua cada afirmação à fonte correspondente.",
    "세 자료를 공통점, 차이점, 빈틈으로 나누어 종합해 보세요.",
    ["Abra com o tema e as três fontes, sem ainda concluir.", "Diga o que as fontes compartilham em uma frase.", "Use -ㄴ/는 동시에 uma vez para registrar dois aspectos de uma mesma fonte.", "Use -ㄴ/는 한편으로 uma vez para contrastar alcance ou limite.", "Feche nomeando a lacuna que nenhuma fonte cobre."],
    ["Três fontes identificadas.", "Convergência declarada.", "Divergência localizada, não apagada.", "As duas formas-alvo empregadas.", "Lacuna nomeada no fechamento."],
    "이 글은 재택근무와 협업에 관한 세 자료를 종합한다. 첫 자료는 한 기업의 실험으로, 재택근무 후 집중 시간이 늘었다고 보고한다. 둘째 자료는 직원 25명의 인터뷰로, 집중 시간은 늘었지만 동료와의 즉흥적 대화가 줄었다고 말한다. 셋째 자료는 5년간의 인사 기록을 분석해 승진 속도에는 유의미한 차이가 없었다고 밝힌다. 세 자료의 공통점은 재택근무가 집중 시간을 바꾼다는 점이다. 실험은 성과를 보여 주는 동시에 협업의 질은 측정하지 못한다. 인터뷰는 협업의 변화를 설명하는 한편으로, 그 변화가 성과에 미치는 영향은 알려 주지 않는다. 장기 승진에 대한 자료가 부족하다는 점은 남는 빈틈이다.",
    "Este texto sintetiza três fontes sobre trabalho remoto e colaboração. A primeira é o experimento de uma empresa, que relata aumento do tempo de concentração após o trabalho remoto. A segunda é uma entrevista com 25 funcionários, que relata que o tempo de concentração aumentou, mas as conversas espontâneas com colegas diminuíram. A terceira analisa cinco anos de registros de pessoal e revela que não houve diferença significativa na velocidade de promoção. O ponto em comum das três fontes é que o trabalho remoto altera o tempo de concentração. O experimento mostra o desempenho e, ao mesmo tempo, não consegue medir a qualidade da colaboração. A entrevista, por um lado, explica a mudança na colaboração; por outro, não informa o efeito dessa mudança sobre o desempenho. A falta de dados sobre promoção de longo prazo é a lacuna que permanece.",
    "Exemplo original de oito frases. As três fontes aparecem nomeadas e a lacuna fica explícita. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l10 — tomar posição com critério e incerteza declarada. */
export const C1_L10 = defineC1Lesson({
  id: "c1-l10", number: 10, moduleId: "c1-m02", title: "Tomar posição com honestidade",
  objective: "Posicionar-se diante de fontes conflitantes explicitando o critério e a incerteza.",
  prerequisites: ["c1-l09"], estimatedMinutes: 80, dialogueTitle: "Escolher sem prova conclusiva",
  intro: [
    {
      title: "Critério antes da posição",
      body: "Uma posição defensável não começa com a conclusão, mas com o critério que a torna preferível. Se o critério é a segurança, a posição precisará mostrar redução de risco; se é a equidade, precisará mostrar quem paga o custo. Declarar o critério permite que o leitor discorde da escolha sem acusar o autor de arbitrariedade. Também impede um vício comum: escolher primeiro a conclusão e depois procurar o critério que a justifica. O critério deve ser formulável antes de sabermos qual alternativa ele vai favorecer.",
      ko: "결론을 먼저 정하고 기준을 나중에 맞추면, 그 판단은 검증할 수 없게 된다.",
    },
    {
      title: "A incerteza residual não envergonha",
      body: "Toda decisão prática ocorre com informação incompleta. O que distingue uma posição honesta não é a ausência de dúvida, mas a nomeação do que continua incerto. Ao dizer “não sei se o efeito se manterá”, o autor não enfraquece a posição: mostra onde ela pode ser corrigida. A incerteza residual deve vir com um plano — que dado, em quanto tempo, mudaria a decisão. Assim, a posição deixa de ser uma aposta cega e se torna um compromisso revisável, compatível com o que as fontes realmente sustentam.",
      ko: "불확실성을 숨기지 않고 밝히는 것이 오히려 판단의 신뢰를 높인다.",
    },
  ],
  dialogue: [
    ["나래", "교수님, 확실한 근거가 없는데도 제한 방식 쪽으로 결론을 내려도 될까요?", "Professor, posso concluir pela abordagem restritiva mesmo sem evidência conclusiva?"],
    ["현우", "근거가 완전하지 않은 이상, 판단을 미룰수록 비용이 커지는 경우도 있어요.", "Já que a evidência não é completa, há casos em que adiar a decisão aumenta o custo."],
    ["나래", "사고가 한 구간에 집중된 이상, 그곳부터 속도를 제한할 수밖에 없다고 봤습니다.", "Como os acidentes se concentram em um trecho, concluí que não há outra opção senão limitar a velocidade ali primeiro."],
    ["현우", "그 기준은 분명하네요. 다만 신고되지 않은 사고는 어떻게 처리했어요?", "O critério está claro. Mas como você tratou os acidentes não notificados?"],
    ["나래", "그 부분은 한계로 남겼습니다. 6개월 뒤에 결과를 다시 공개하겠다고 썼어요.", "Deixei essa parte como limite. Escrevi que vou divulgar os resultados novamente em seis meses."],
    ["현우", "좋아요. 반대 입장의 설득력도 인정했나요?", "Bom. Você também reconheceu a força do argumento contrário?"],
    ["나래", "네. 전면 금지가 단속은 쉽다는 점을 인정하고, 접근성 비용과 함께 비교했어요.", "Sim. Reconheci que a proibição total facilita a fiscalização e comparei com o custo de acessibilidade."],
    ["현우", "그러면 지금의 결론은 확신이 아니라 우선순위에 따른 잠정적 판단이겠네요.", "Então a conclusão atual é um julgamento provisório baseado em prioridades, não uma certeza."],
  ],
  readingText: {
    titlePt: "Uma posição, dois critérios e uma dúvida",
    paragraphs: [
      "대학가 전동 킥보드 통행을 둘러싼 논의에서 나는 전면 금지보다 속도와 구역을 제한하는 쪽을 지지한다. 이 선택의 기준은 두 가지다. 첫째, 보행자 안전 사고의 실제 분포, 둘째, 통학 수단이 필요한 학생의 접근성이다. 지난 2년간 이 대학가에서 신고된 킥보드 관련 사고는 47건이었다. 그 가운데 31건이 차도와 인도가 만나는 지점에서 발생했다. 사고의 위치가 한곳에 몰려 있다는 점은 전면 금지보다 구역 제한이 더 정확한 대응일 수 있음을 시사한다.",
      "다만 이 결론에는 남는 불확실성이 있다. 신고되지 않은 사고가 얼마나 되는지 알 수 없고, 사고 건수에는 킥보드 이용자와 보행자가 함께 포함되어 있다. 또한 통학 수단이 필요한 학생의 규모도 정확히 파악되지 않았다. 그럼에도 위치별 사고 분포가 뚜렷한 이상, 아무 조치도 하지 않을 수는 없다. 나는 데이터가 완전해질 때까지 기다리는 대신, 사고가 집중된 구간부터 속도 제한을 시행할 수밖에 없다고 본다. 이 선택은 확신이 아니라 우선순위에 따른 판단이다.",
      "반대 입장도 타당하다. 전면 금지가 시행과 단속이 쉽고, 사고를 즉시 줄일 수 있다는 주장에는 설득력이 있다. 그러나 금지가 접근성을 낮추고 불법 주행을 늘릴 위험도 함께 고려해야 한다. 내가 지지하는 제한 방식도 완전한 해결책이 아니다. 6개월 뒤 사고 건수와 통학 시간을 함께 공개하고, 효과가 없으면 기준을 다시 조정해야 한다. 입장을 밝히는 일은 불확실성을 숨기는 일이 아니라, 어떤 기준으로 지금 결정하는지 보여 주는 일이다.",
    ],
    pt: "No debate sobre a circulação de patinetes elétricos na área universitária, defendo a restrição de velocidade e de zonas em vez da proibição total. O critério dessa escolha é duplo: primeiro, a distribuição real dos acidentes com pedestres; segundo, a acessibilidade dos estudantes que dependem do veículo para ir à aula. Nos últimos dois anos, houve 47 acidentes notificados envolvendo patinetes nessa área universitária. Desses, 31 ocorreram em pontos de encontro entre calçada e pista. O fato de os acidentes se concentrarem em um ponto sugere que a restrição por zona pode ser uma resposta mais precisa do que a proibição total. Há, porém, incerteza residual nesta conclusão. Não se sabe quantos acidentes não foram notificados, e o número inclui tanto usuários de patinete quanto pedestres. Além disso, o tamanho da população de estudantes que dependem do veículo para o deslocamento também não foi medido com precisão. Ainda assim, já que a distribuição dos acidentes por local é clara, não se pode deixar de tomar alguma providência. Em vez de esperar até que os dados fiquem completos, considero que não há outra opção senão aplicar o limite de velocidade primeiro nos trechos em que os acidentes se concentram. Esta escolha é um julgamento baseado em prioridades, não uma certeza. A posição contrária também é válida. É forte o argumento de que a proibição total é mais fácil de implementar e fiscalizar e reduz os acidentes imediatamente. No entanto, é preciso considerar também o risco de que a proibição reduza a acessibilidade e aumente a circulação irregular. A abordagem restritiva que defendo também não é uma solução completa. Em seis meses, é preciso divulgar o número de acidentes junto com o tempo de deslocamento dos estudantes e, se não houver efeito, ajustar os critérios novamente. Declarar uma posição não é esconder a incerteza, mas mostrar com que critério se decide agora.",
    objective: "Distinguir a posição do autor do consenso das fontes.",
  },
  reusedIds: ["ko:주장", "ko:설득력", "ko:발생", "ko:설득"],
  grammar: [
    [
      "-ㄴ/는 이상 — já que; uma vez que",
      "동사 + -는 이상 / 형용사 + -(으)ㄴ 이상 / 명사 + 인 이상",
      "Estabelece uma condição que, uma vez aceita, torna certa consequência necessária. Tem valor mais forte que -니까: não apenas explica, mas compromete o enunciador. É comum na escrita argumentativa e em decisões institucionais. Compare com -ㄴ/는 한, que delimita um limite (“enquanto”), e com -기 때문에, que é causal e neutro. Registro: formal, escrito. Não use com uma condição hipotética remota; nesse caso, -ㄴ다면 é mais adequado.",
      [
        ["사고가 한 구간에 집중된 이상, 그곳부터 속도를 제한해야 한다.", "Já que os acidentes se concentram em um trecho, é preciso limitar a velocidade ali primeiro."],
        ["데이터가 완전하지 않은 이상, 잠정적 기준으로 시작할 필요가 있다.", "Uma vez que os dados não estão completos, é preciso começar com critérios provisórios."],
      ],
    ],
    [
      "-ㄹ 수밖에 없다 — não há outra opção senão",
      "동사/형용사 + -(으)ㄹ 수밖에 없다",
      "Expressa uma conclusão que o falante considera inevitável diante das circunstâncias, não uma obrigação externa. É diferente de -아/어야 한다, que prescreve dever, e de -지 않을 수 없다, que descreve uma reação involuntária. Na argumentação, costuma marcar o ponto em que a dúvida cede lugar a uma decisão mínima. Registro: neutro a formal. Evite usar quando há alternativas reais: a forma perde força se o leitor vê uma saída que o texto ignorou.",
      [
        ["아무 조치도 하지 않을 수는 없으므로, 우선 제한 조치부터 시행할 수밖에 없다.", "Como não se pode deixar de tomar alguma providência, não há outra opção senão aplicar a restrição primeiro."],
        ["자료가 부족해도 지금은 잠정적 기준으로 결정할 수밖에 없다.", "Mesmo com dados insuficientes, agora não há outra opção senão decidir com critérios provisórios."],
      ],
    ],
  ],
  guided: [
    mcq("Quais são os dois critérios da posição da autora?", ["A distribuição dos acidentes e a acessibilidade dos estudantes.", "O preço dos patinetes e a opinião dos lojistas.", "A facilidade de fiscalização e o lucro das empresas."], "A distribuição dos acidentes e a acessibilidade dos estudantes.", "A autora declara os dois critérios no primeiro parágrafo."),
    cloze("Complete a necessidade reconhecida: 위치별 사고 분포가 뚜렷한 이상, 아무 조치도 하지 ___ 수는 없다.", "않을", "A forma é -지 않을 수 없다, que expressa inevitabilidade diante da situação."),
    listen("Ouça e escreva como a autora classifica a própria escolha.", "이 선택은 확신이 아니라 우선순위에 따른 판단이다.", "이 선택은 확신이 아니라 우선순위에 따른 판단이다.", "Esta escolha é um julgamento baseado em prioridades, não uma certeza."),
    reading("지난 2년간 이 대학가에서 신고된 킥보드 관련 사고는 47건이었다. 그 가운데 31건이 차도와 인도가 만나는 지점에서 발생했다. 사고의 위치가 한곳에 몰려 있다는 점은 전면 금지보다 구역 제한이 더 정확한 대응일 수 있음을 시사한다.", "Por que a autora prefere a restrição por zona?", ["Porque os acidentes se concentram em pontos específicos.", "Porque a proibição total é ilegal.", "Porque todos os estudantes são a favor dos patinetes."], "Porque os acidentes se concentram em pontos específicos.", "A concentração dos acidentes em certos pontos sustenta uma resposta localizada."),
    translate("pt-ko", "Traduza: “Já que os acidentes se concentram em um trecho, é preciso limitar a velocidade ali.”", "사고가 한 구간에 집중된 이상, 그곳에서는 속도를 제한할 수밖에 없다.", "-ㄴ/는 이상 estabelece a condição aceita; -ㄹ 수밖에 없다 marca a consequência inevitável.", ["사고가 한 구간에 집중된 이상, 그 구간부터 속도를 제한해야 한다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 이상 corretamente?", ["데이터가 완전하지 않은 이상, 잠정적 기준으로 시작할 수밖에 없다.", "데이터가 완전하지 않는 이상, 잠정적 기준으로 시작할 수밖에 없다.", "데이터가 완전하지 않았는 이상, 잠정적 기준으로 시작할 수밖에 없다."], "데이터가 완전하지 않은 이상, 잠정적 기준으로 시작할 수밖에 없다.", "Com adjetivo, usa-se -(으)ㄴ 이상: 완전하지 않은 이상."),
    cloze("Complete a concessão ao adversário: 전면 금지가 사고를 즉시 줄일 수 있다는 주장에는 ___이 있다.", "설득력", "설득력 = força de persuasão; reconhecer isso torna a posição mais honesta."),
    listen("Ouça e escreva o que deve ser divulgado seis meses depois.", "6개월 뒤 사고 건수와 통학 시간을 함께 공개해야 한다.", "6개월 뒤 사고 건수와 통학 시간을 함께 공개해야 한다.", "Seis meses depois, é preciso divulgar juntos o número de acidentes e o tempo de deslocamento."),
    translate("ko-pt", "Traduza: 입장을 밝히는 일은 불확실성을 숨기는 일이 아니라, 어떤 기준으로 결정하는지 보여 주는 일이다.", "Declarar uma posição não é esconder a incerteza, mas mostrar com que critério se decide.", "입장을 밝히다 = declarar posição; 기준 = critério.", ["Assumir uma posição não significa ocultar a incerteza, e sim mostrar segundo que critério se decide."]),
    reading("다만 이 결론에는 남는 불확실성이 있다. 신고되지 않은 사고가 얼마나 되는지 알 수 없고, 사고 건수에는 킥보드 이용자와 보행자가 함께 포함되어 있다. 그럼에도 위치별 사고 분포가 뚜렷한 이상, 아무 조치도 하지 않을 수는 없다.", "Como a autora lida com a incerteza?", ["Nomeia o que não sabe e ainda assim justifica uma decisão mínima.", "Afirma que os dados são completos.", "Abandona a posição até ter certeza total."], "Nomeia o que não sabe e ainda assim justifica uma decisão mínima.", "A autora declara a incerteza residual e decide com base na distribuição já conhecida."),
  ],
  summary: [
    "Uma posição defensável declara o critério antes da conclusão.",
    "Incerteza residual nomeada com prazo e indicador torna a decisão revisável.",
    "-ㄴ/는 이상 compromete o enunciador com uma consequência a partir de uma condição aceita.",
    "-ㄹ 수밖에 없다 expressa inevitabilidade prática, não dever externo.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · posição com critério e dúvida",
    "Escolha uma questão prática do seu entorno em que as fontes divergem. Escreva uma posição fundamentada: declare dois critérios, reconheça a força da posição contrária e nomeie a incerteza que permanece.",
    "기준과 남는 불확실성을 밝히면서 자신의 입장을 써 보세요.",
    ["Abra com a posição e os dois critérios que a sustentam.", "Use -ㄴ/는 이상 uma vez para ligar uma condição aceita a uma consequência.", "Use -ㄹ 수밖에 없다 uma vez para o ponto em que a decisão se torna inevitável.", "Reconheça um argumento contrário forte, sem caricaturá-lo.", "Feche com o dado e o prazo que poderiam mudar sua decisão."],
    ["Posição e dois critérios explícitos.", "Argumento contrário reconhecido com força.", "As duas formas-alvo empregadas.", "Incerteza residual nomeada.", "Condição de revisão com prazo ou indicador."],
    "나는 도서관의 좌석 예약제를 유지해야 한다고 본다. 기준은 두 가지다. 첫째, 좌석 회전율, 둘째, 장시간 공부가 필요한 학생의 접근성이다. 지난 학기 예약제 시행 후 평균 이용 시간은 40분 줄었지만, 좌석을 찾지 못해 돌아간 학생은 18퍼센트 감소했다. 예약제를 없애면 회전율이 다시 낮아질 개연성이 높다. 다만 예약 후 나타나지 않는 학생의 비율은 아직 파악되지 않았다. 그 비율이 높다면 제도를 조정할 수밖에 없다. 반대 입장도 설득력이 있다. 예약이 공부 계획을 경직시킨다는 지적은 타당하다. 그럼에도 좌석 부족이 더 큰 문제인 이상, 지금은 예약제를 유지하되 예약 불이행 비율을 공개하는 조건을 붙여야 한다. 6개월 뒤 회전율과 예약 불이행 비율을 함께 공개하고 기준을 다시 조정하겠다.",
    "Considero que o sistema de reserva de lugares da biblioteca deve ser mantido. O critério é duplo: primeiro, a rotatividade dos lugares; segundo, o acesso dos estudantes que precisam estudar por longos períodos. No semestre passado, após a implantação da reserva, o tempo médio de uso caiu 40 minutos, mas o número de estudantes que voltaram para casa sem encontrar lugar diminuiu 18%. Se a reserva for eliminada, há alta probabilidade de a rotatividade cair novamente. No entanto, a proporção de estudantes que reservam e não aparecem ainda não foi medida. Se essa proporção for alta, não haverá outra opção senão ajustar o sistema. A posição contrária também tem força. É válida a crítica de que a reserva engessa o planejamento de estudo. Ainda assim, uma vez que a falta de lugares é o problema maior, no momento é preciso manter a reserva, com a condição de divulgar a taxa de não comparecimento. Seis meses depois, divulgarei rotatividade e não comparecimento juntos e reajustarei os critérios.",
    "Exemplo original de oito frases. A posição vem com critério, concessão e uma condição de revisão verificável. Exemplo ilustrativo; não é gabarito.",
  ),
});
