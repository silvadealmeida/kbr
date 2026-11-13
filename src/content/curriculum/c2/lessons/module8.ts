import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto cumpre o gênero pedido, responde ao enunciado e deixa claro o que o leitor deve fazer com a proposta ou a análise." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a progressão vai da pergunta ou tese até a evidência, a objeção e o fechamento, sem repetir etapas." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do projeto, da argumentação ou da edição, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado ao gênero e ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A posição é sustentada por evidência delimitada, e o texto nomeia uma objeção ou um limite real, sem prometer mais do que pode." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula o conteúdo para um leitor específico sem apagar a incerteza, sem distorcer a posição contrária e sem transferir responsabilidade." },
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

/** c2-l36 — da curiosidade ampla à pergunta viável e ao método alinhado. */
export const C2_L36 = defineC2Lesson({
  id: "c2-l36", number: 36, moduleId: "c2-m08", title: "Pergunta e método",
  objective: "Formular uma pergunta de pesquisa viável e alinhar método e evidência.",
  prerequisites: ["c2-c07"], estimatedMinutes: 100, dialogueTitle: "A pergunta que cabia no projeto",
  intro: [
    {
      title: "De um tema amplo a uma pergunta respondível",
      body: "Um tema não é uma pergunta. 'Juventude e moradia' indica um campo, mas não diz o que será observado, em que período, com quais casos e contra qual resposta alternativa. Uma pergunta de pesquisa viável tem três marcas: delimita o objeto, indica o tipo de evidência que a responderia e cabe nos recursos disponíveis. Delimitar não é empobrecer o tema; é tornar possível discordar com base em algo observável.",
      ko: "좋은 질문은 답이 아니라 무엇을 답할 수 있는지를 먼저 정한다.",
    },
    {
      title: "O método não é enfeite",
      body: "O método é o caminho entre a pergunta e a evidência. Se a pergunta trata de experiência vivida, um survey fechado pode produzir números sem responder ao que se perguntou; se trata de frequência, três entrevistas não bastam. Alinhar método e pergunta também exige declarar o que ficará de fora. Um projeto que reconhece o próprio limite não é mais fraco: é mais fácil de avaliar, de repetir e de contestar.",
      ko: "방법은 질문에 맞추는 것이지, 질문을 방법에 맞추는 것이 아니다.",
    },
  ],
  dialogue: [
    ["지안", "처음에는 '청년 주거' 전체를 다루고 싶었는데, 자료를 모을수록 질문이 흐려져요.", "No começo eu queria tratar de 'moradia juvenil' como um todo, mas, quanto mais reúno dados, mais a pergunta se turva."],
    ["박 교수", "주제가 크다는 건 나쁘지 않아요. 다만 한 편의 논문이 답할 수 있는 범위로 잘라야 하죠.", "Um tema amplo não é ruim. Só é preciso recortá-lo no escopo que um artigo consegue responder."],
    ["지안", "그러면 '청년이 월세를 어떻게 감당하는가'로 좁히면 될까요?", "Então basta restringir para 'como os jovens arcam com o aluguel mensal'?"],
    ["박 교수", "조금 더 구체적으로, 어떤 지역의 어떤 기간에 누구를 만날 건지 정해야 해요.", "Um pouco mais concreto: é preciso definir em que região, em que período e quem será entrevistado."],
    ["지안", "서울 외곽의 1인 가구 20명을 6개월간 인터뷰하는 설정으로 잡아 보겠습니다.", "Vou adotar a configuração de entrevistar 20 domicílios unipessoais na periferia de Seul durante seis meses."],
    ["박 교수", "좋아요. 그렇다면 그 인터뷰가 무엇을 입증할 수 있는지도 함께 써야 합니다.", "Certo. Nesse caso, é preciso escrever também o que essas entrevistas podem comprovar."],
    ["지안", "월세 부담이 이사 결정에 미치는 영향을 보는 거죠. 다만 표본이 작아서 일반화는 어렵습니다.", "É ver o efeito do peso do aluguel na decisão de mudança. No entanto, a amostra é pequena, e a generalização é difícil."],
    ["박 교수", "그 한계를 먼저 밝히면 오히려 신뢰가 생겨요. 그 한계가 후속 연구의 근거를 마련해 줍니다.", "Declarar esse limite primeiro até gera confiança. Esse limite prepara a base para pesquisas posteriores."],
  ],
  readingText: {
    titlePt: "Uma pergunta que cabe em seis meses",
    paragraphs: [
      "이 글은 서울 외곽 1인 가구의 월세 부담이 이사 결정에 어떻게 작용하는지를 묻는다. 기존 논의는 주거비를 소득 대비 비율로만 다루어 왔다. 그러나 같은 비율이라도 통근 시간, 보증금 마련 방식, 이웃과의 관계에 따라 체감은 달라진다. 따라서 이 연구의 질문은 '월세 부담이 이사 시점과 목적지 선택을 어떻게 바꾸는가'이다. 질문을 이렇게 좁히는 것은 대상을 줄이기 위해서가 아니라, 관찰 가능한 결정에 답하기 위해서다.",
      "방법은 심층 인터뷰와 이동 기록의 결합이다. 2025년 3월부터 8월까지 서울 외곽 세 구에서 1인 가구 20명을 만나 두 번씩 인터뷰한다. 참여자를 최근 2년 안에 이사를 한 번 이상 경험한 사람으로 한정한다. 인터뷰에서는 이사 직전의 지출과 시간 사용을 구체적으로 묻고, 이동 기록으로 통근 시간의 변화를 확인한다. 이 설계는 '체감 부담'이라는 주관적 진술과 '이동 시간'이라는 관찰 가능한 자료를 함께 놓는 설정이다. 두 자료가 어긋나는 지점도 분석 대상으로 남긴다.",
      "이 연구가 답할 수 있는 것은 세 구의 사례에 한정된다. 표본이 작고, 인터뷰 참여자가 자기 경험을 사후에 재구성한다는 한계도 있다. 그러므로 결과를 전체 청년으로 일반화하지 않는다. 대신 어떤 조건에서 월세 부담이 결정을 바꾸는지에 대한 가설을 세우고, 후속 연구가 검증할 근거를 마련하는 데 목적을 둔다. 연구 윤리 측면에서는 참여자의 동의를 두 번 받고, 인터뷰 기록에서 신원을 드러내는 정보를 삭제한다. 한계를 숨기지 않는 것이 이 프로젝트의 결론을 더 단단하게 만든다.",
    ],
    pt: "Este texto pergunta como o peso do aluguel mensal atua na decisão de mudança de domicílios unipessoais na periferia de Seul. A discussão existente tratou o custo de moradia apenas como proporção da renda. No entanto, mesmo com a mesma proporção, a percepção varia conforme o tempo de deslocamento, a forma de reunir o depósito caução e as relações com os vizinhos. Por isso, a pergunta desta pesquisa é 'como o peso do aluguel mensal altera o momento da mudança e a escolha do destino'. Delimitar a pergunta assim não serve para reduzir o objeto, mas para responder a decisões observáveis. O método combina entrevistas em profundidade e registros de deslocamento. De março a agosto de 2025, encontramos 20 domicílios unipessoais em três distritos da periferia de Seul e entrevistamos cada pessoa duas vezes. Os participantes se limitam a quem vivenciou ao menos uma mudança nos últimos dois anos. Nas entrevistas, perguntamos concretamente sobre gastos e uso do tempo imediatamente antes da mudança, e verificamos a variação do tempo de deslocamento pelos registros de movimento. Esse desenho é uma configuração que coloca lado a lado o relato subjetivo do 'peso percebido' e um dado observável, o 'tempo de deslocamento'. Os pontos em que os dois materiais divergem também ficam como objeto de análise. O que esta pesquisa pode responder limita-se aos casos dos três distritos. Há também o limite de a amostra ser pequena e de os participantes reconstruírem a própria experiência depois do ocorrido. Por isso, não generalizamos os resultados para toda a juventude. Em vez disso, formulamos hipóteses sobre em que condições o peso do aluguel altera a decisão e temos como objetivo preparar a base para que pesquisas posteriores as verifiquem. Do ponto de vista da ética de pesquisa, obtemos o consentimento dos participantes duas vezes e apagamos dos registros das entrevistas as informações que revelam identidade. Não esconder os limites torna a conclusão deste projeto mais sólida.",
    objective: "Avaliar se a pergunta, o método e o limite declarado formam um projeto coerente e verificável.",
  },
  reusedIds: ["ko:입증", "ko:방법", "ko:일반화", "ko:재구성"],
  grammar: [
    [
      "-ㄴ/는 설정이다 — é a configuração/hipótese",
      "동사 + -는 설정이다 / 형용사 + -(으)ㄴ 설정이다 / 명사 + (이)라는 설정이다",
      "Apresenta o desenho, a condição ou a hipótese que o pesquisador adota, e não um fato já observado. É comum em projetos e relatórios para separar o que foi planejado do que foi encontrado. Compare com -ㄴ/는 셈이다, que conclui uma equivalência, e com -ㄴ/는 전제다, que nomeia um pressuposto. Na escrita acadêmica, a expressão também protege o autor: ela mostra que o arranjo poderia ter sido outro.",
      [
        ["이 설계는 두 자료를 함께 놓는 설정이다.", "Este desenho é uma configuração que coloca os dois materiais lado a lado."],
        ["참여자를 최근 2년 안에 이사한 사람으로 한정하는 설정이다.", "A configuração limita os participantes a quem se mudou nos últimos dois anos."],
      ],
    ],
    [
      "-ㄹ 근거를 마련하다 — preparar a base para",
      "동사 + -ㄹ 근거를 마련하다",
      "Indica que um estudo, dado ou procedimento cria a base para uma etapa futura, como verificar, decidir ou solicitar algo. É mais formal que 준비하다 e costuma ter como sujeito um trabalho, não uma pessoa apressada. Compare com -ㄹ 발판을 마련하다, de imagem semelhante, e com -ㄹ 이유가 되다, que apenas atribui uma razão. A expressão não promete que a etapa futura será concluída; apenas diz que haverá base para tentá-la.",
      [
        ["이번 조사는 후속 연구가 검증할 근거를 마련한다.", "Esta investigação prepara a base para que pesquisas posteriores verifiquem."],
        ["한계를 밝히는 일은 오히려 결론을 뒷받침할 근거를 마련해 준다.", "Declarar os limites, ao contrário, prepara a base que sustenta a conclusão."],
      ],
    ],
  ],
  guided: [
    mcq("Qual pergunta está delimitada o suficiente para um projeto de pesquisa?", ["Como o peso do aluguel mensal altera o momento da mudança em domicílios unipessoais de três distritos de Seul entre 2025 e 2026?", "Por que a juventude sofre com a moradia?", "Qual é a solução definitiva para a crise habitacional?"], "Como o peso do aluguel mensal altera o momento da mudança em domicílios unipessoais de três distritos de Seul entre 2025 e 2026?", "A pergunta indica objeto, período, casos e tipo de decisão observável; as outras são amplas demais para um projeto."),
    cloze("Complete o modo como o projeto descreve o próprio desenho: 두 자료를 함께 놓는 ___.", "설정이다", "-ㄴ/는 설정이다 apresenta o arranjo metodológico como escolha planejada, não como fato encontrado."),
    listen("Ouça e escreva o que a banca exige além de reduzir o tema.", "주제를 좁히는 것만으로는 부족하고, 무엇을 관찰할지 정해야 합니다.", "주제를 좁히는 것만으로는 부족하고, 무엇을 관찰할지 정해야 합니다.", "Não basta restringir o tema; é preciso definir o que será observado."),
    translate("pt-ko", "Traduza: “O método deve se ajustar à pergunta, não a pergunta ao método.”", "방법은 질문에 맞추는 것이지, 질문을 방법에 맞추는 것이 아니다.", "A construção -는 것이지 ... 것이 아니다 contrasta a ordem correta com a invertida.", ["방법은 질문에 맞추는 것이지 질문을 방법에 맞추는 것이 아니다."]),
    reading("인터뷰에서는 이사 직전의 지출과 시간 사용을 구체적으로 묻고, 이동 기록으로 통근 시간의 변화를 확인한다. 이 설계는 '체감 부담'이라는 주관적 진술과 '이동 시간'이라는 관찰 가능한 자료를 함께 놓는 설정이다. 두 자료가 어긋나는 지점도 분석 대상으로 남긴다.", "Por que o projeto mantém também os pontos em que os dois tipos de dado divergem?", ["Porque a divergência entre relato e registro também explica como a decisão se forma.", "Porque um dos dois dados será descartado no final.", "Porque a divergência prova que os participantes mentiram."], "Porque a divergência entre relato e registro também explica como a decisão se forma.", "O desenho não trata a divergência como erro a apagar, mas como material de análise."),
  ],
  independent: [
    mcq("Qual limite o projeto admite explicitamente?", ["A amostra é pequena e os relatos são reconstruídos depois do ocorrido.", "O tema não tem relação com o custo de moradia.", "Os pesquisadores não fizeram nenhuma entrevista.", "A pesquisa já foi generalizada para todo o país."], "A amostra é pequena e os relatos são reconstruídos depois do ocorrido.", "O terceiro parágrafo declara a limitação do escopo e da memória dos participantes."),
    cloze("Complete a finalidade do projeto: 후속 연구가 검증할 ___를 마련하는 데 목적을 둔다.", "근거", "A forma -ㄹ 근거를 마련하다 nomeia a base que outro estudo poderá verificar."),
    listen("Ouça e escreva a delimitação do alcance.", "이 연구가 답할 수 있는 것은 세 구의 사례에 한정된다.", "이 연구가 답할 수 있는 것은 세 구의 사례에 한정된다.", "O que esta pesquisa pode responder limita-se aos casos de três distritos."),
    translate("ko-pt", "Traduza: 질문을 이렇게 좁히는 것은 대상을 줄이기 위해서가 아니라, 관찰 가능한 결정에 답하기 위해서다.", "Delimitar a pergunta assim não é para reduzir o objeto, mas para responder a decisões observáveis.", "대상을 줄이다 = reduzir o objeto; 관찰 가능한 결정 = decisão observável.", ["Restringir a pergunta desse modo não serve para diminuir o objeto, e sim para responder a decisões que se podem observar."]),
    reading("이 연구가 답할 수 있는 것은 세 구의 사례에 한정된다. 표본이 작고, 인터뷰 참여자가 자기 경험을 사후에 재구성한다는 한계도 있다. 그러므로 결과를 전체 청년으로 일반화하지 않는다.", "O que o projeto faz com o próprio limite?", ["Reconhece o limite e transforma a generalização em hipótese para pesquisa posterior.", "Esconde o limite para proteger a conclusão.", "Abandona a pesquisa porque a amostra é pequena."], "Reconhece o limite e transforma a generalização em hipótese para pesquisa posterior.", "O limite não encerra o projeto: ele desloca a ambição para uma hipótese verificável."),
  ],
  summary: [
    "Tema não é pergunta: uma pergunta viável delimita objeto, período, casos e evidência.",
    "-ㄴ/는 설정이다 nomeia o desenho ou a hipótese adotada, não um fato observado.",
    "-ㄹ 근거를 마련하다 indica a base que uma etapa futura poderá usar.",
    "Método desalinhado produz dados que não respondem à pergunta.",
    "Declarar o limite aumenta a avaliação possível, em vez de enfraquecer o projeto.",
  ],
  production: production(
    "Produção independente · pergunta, método e limite",
    "Escolha um tema que você gostaria de investigar. Em um texto único, transforme-o em uma pergunta viável, apresente o método que a responderia e declare o que ficará fora do escopo. Feche explicando que evidência faria você mudar de hipótese.",
    "관심 있는 주제를 연구 가능한 질문으로 바꾸고, 방법과 범위의 한계를 밝혀 보세요.",
    ["Delimite período, casos e tipo de decisão ou experiência observável.", "Diga por que o método escolhido produz a evidência que a pergunta exige.", "Use -ㄴ/는 설정이다 uma vez para descrever o desenho.", "Use -ㄹ 근거를 마련하다 uma vez para indicar o que o estudo prepara.", "Nomeie um limite e a evidência que o faria rever a hipótese."],
    ["Pergunta delimitada e respondível.", "Método coerente com a pergunta.", "Limite de escopo declarado.", "Duas formas-alvo usadas com função clara.", "Evidência de revisão da hipótese indicada."],
    "이 프로젝트의 질문은 '야간 버스 노선 축소가 병원 종사자의 출근 시간을 어떻게 바꾸는가'이다. 대상은 서울 두 구의 병원 종사자 15명으로 한정하고, 2025년 9월부터 11월까지 두 번씩 인터뷰한다. 방법은 인터뷰와 교통카드 이용 기록의 결합이다. 인터뷰에서는 노선이 줄기 전후의 출근 경로를 묻고, 기록에서는 환승 횟수와 대기 시간을 확인한다. 이 설계는 진술과 관찰 자료를 함께 놓는 설정이다. 다만 표본이 작아 전체 병원 종사자로 일반화할 수 없고, 인터뷰가 사후 기억에 의존한다는 한계가 있다. 그럼에도 이 연구는 어떤 조건에서 이동 시간이 실제로 늘어나는지를 보여 주고, 후속 연구가 검증할 근거를 마련한다. 만약 인터뷰에서 대기 시간이 줄었다고 말한 사람이 기록에서는 늘어난 경우가 많다면, 나는 '노선 축소가 이동 시간을 늘린다'는 가설을 다시 세워야 한다.",
    "A pergunta deste projeto é 'como a redução das linhas de ônibus noturno altera o tempo de deslocamento até o trabalho de profissionais de hospital'. O alvo se limita a 15 profissionais de hospitais de dois distritos de Seul, entrevistados duas vezes de setembro a novembro de 2025. O método combina entrevistas e registros de uso do cartão de transporte. Nas entrevistas, pergunto sobre o trajeto até o trabalho antes e depois da redução das linhas; nos registros, verifico o número de baldeações e o tempo de espera. Esse desenho é uma configuração que coloca lado a lado relato e dado observável. No entanto, a amostra é pequena, o que impede generalizar para todos os profissionais de hospital, e há o limite de as entrevistas dependerem da memória posterior. Ainda assim, esta pesquisa mostra em que condições o tempo de deslocamento realmente aumenta e prepara a base para que estudos posteriores verifiquem. Se muitas pessoas disserem na entrevista que o tempo de espera diminuiu enquanto os registros mostrarem aumento, terei de reformular a hipótese de que 'a redução das linhas aumenta o tempo de deslocamento'.",
    "Exemplo original. Observe que a pergunta, o método e o limite se sustentam mutuamente e que a hipótese pode ser revista. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l37 — artigo de opinião com tese, evidência, objeção e voz própria. */
export const C2_L37 = defineC2Lesson({
  id: "c2-l37", number: 37, moduleId: "c2-m08", title: "Artigo de opinião",
  objective: "Produzir artigo de opinião com tese, evidência, objeção e voz própria.",
  prerequisites: ["c2-l36"], estimatedMinutes: 100, dialogueTitle: "A tese que o editor não aceitou",
  intro: [
    {
      title: "Tese é uma decisão, não um tema",
      body: "Um artigo de opinião não é um resumo de opiniões. Ele sustenta uma tese que o leitor pode aceitar, recusar ou qualificar. 'Precisamos melhorar a política habitacional' é um desejo; 'o critério de renda deve ser substituído pelo critério de tempo de deslocamento' é uma tese, porque indica o que mudar e permite prever quem ganha e quem perde. Quanto mais clara a tese, mais fácil o leitor saber com o que está discordando.",
      ko: "논지는 주제가 아니라, 독자가 이 글을 읽고 달라져야 할 판단이다.",
    },
    {
      title: "Evidência, objeção e voz",
      body: "A voz própria aparece na seleção e no modo de dizer, não na quantidade de adjetivos. Um dado bem delimitado vale mais que uma estatística sem fonte; uma objeção enfrentada vale mais que três parágrafos de concordância. O artigo ganha força quando diz em que caso sua proposta falharia. Isso não é fraqueza: é o que separa opinião de propaganda.",
      ko: "반론을 피하면 글이 짧아질 뿐 아니라 설득력도 약해진다.",
    },
  ],
  dialogue: [
    ["윤경", "원고의 논지는 '청년 지원을 늘려야 한다'는 논지인데, 이건 사설에서 이미 많이 다룬 말이에요.", "A tese do original é 'é preciso aumentar o apoio aos jovens', mas isso o editorial já tratou muitas vezes."],
    ["태호", "그럼 제 경험을 더 앞세우면 읽힐까요?", "Então, se eu colocar mais a minha experiência em primeiro plano, vai funcionar?"],
    ["윤경", "경험은 목소리를 만들지만, 그 자체로 근거가 되지는 않아요. 무엇을 어떻게 바꾸자는 건지가 먼저 분명해야 합니다.", "A experiência cria uma voz, mas não é evidência por si só. Primeiro é preciso deixar claro o que se quer mudar e como."],
    ["태호", "지원금을 늘리는 대신 신청 절차를 줄이자는 쪽으로 논지를 바꿔 보겠습니다.", "Vou mudar a tese para a ideia de reduzir o procedimento de inscrição em vez de aumentar o subsídio."],
    ["윤경", "좋아요. 그러면 반대편에서 '예산이 더 든다'고 할 텐데, 그 반론을 어떻게 다룰 건가요?", "Certo. Então o lado contrário dirá que 'custa mais do orçamento'; como vai tratar essa objeção?"],
    ["태호", "절차를 줄이면 심사 인력이 줄어서 총비용은 오히려 안정된다는 자료를 넣겠습니다.", "Vou incluir o dado de que reduzir o procedimento diminui a equipe de análise e, por isso, o custo total tende a se estabilizar."],
    ["윤경", "자료의 출처와 한계를 함께 밝히세요. 독자는 단언보다 조건을 더 신뢰합니다.", "Declare a fonte e o limite do dado. O leitor confia mais em condições do que em afirmações categóricas."],
    ["태호", "마지막에는 제가 틀릴 수 있는 경우도 한 문장 넣겠습니다.", "No final, vou incluir também uma frase sobre o caso em que posso estar errado."],
  ],
  readingText: {
    titlePt: "Seis folhas antes do dinheiro",
    paragraphs: [
      "청년 지원 정책을 둘러싼 논쟁은 늘 예산 규모에서 멈춘다. 그러나 현장에서 가장 자주 들리는 불만은 돈이 아니라 절차다. 신청서 여섯 장, 증빙 자료 네 종류, 두 번의 방문. 이 과정을 통과하지 못하면 지원금은 존재하지 않는 것과 같다. 이 글의 논지는 분명하다. 지원금을 늘리는 일보다 신청 절차를 절반으로 줄이는 일이 먼저다. 돈은 이미 정해져 있고, 시간은 아직 낭비되고 있기 때문이다.",
      "첫째, 절차를 줄이면 실제 수혜율이 오른다. 어떤 지자체가 신청 서류를 세 장으로 줄였더니 신청자 수가 40퍼센트 늘었고, 승인율은 거의 변하지 않았다. 둘째, 심사 인력의 부담도 줄어든다. 서류를 읽는 시간보다 같은 서류를 다시 확인하는 시간이 더 길기 때문이다. 물론 절차를 줄이면 부정 신청이 늘 것이라는 주장이 있다. 그러나 부정의 위험은 사후 점검과 무작위 표본으로 다룰 수 있다. 모든 신청자를 의심하는 비용이 모든 신청자를 기다리게 하는 비용보다 크다.",
      "여기서 내가 틀릴 수 있는 경우는 두 가지다. 첫째, 신청 절차가 실제로 부정을 걸러 내는 핵심 장치라면 줄이기는 위험하다. 둘째, 지자체의 전산 시스템이 약해 서류를 줄여도 처리 시간이 줄지 않을 수 있다. 그렇다면 답은 절차 폐지가 아니라 순서의 재설계다. 이 글은 예산을 늘리자는 요구에 반대하고자 한다. 다만 지금 필요한 것은 더 많은 돈을 더 복잡한 문 앞에서 기다리게 하는 일이 아니라고 본다. 독자가 이 글을 읽고 자기 지역의 신청서 장수를 세어 본다면, 이 글이 하려는 일은 이미 시작된 셈이다.",
    ],
    pt: "O debate em torno das políticas de apoio aos jovens sempre para no tamanho do orçamento. No entanto, a queixa mais frequente no campo não é o dinheiro, mas o procedimento. Seis formulários, quatro tipos de comprovante, duas visitas. Quem não passa por esse processo é como se o subsídio não existisse. A tese deste texto é clara: antes de aumentar o subsídio, é preciso reduzir pela metade o procedimento de inscrição. O dinheiro já está definido; o tempo ainda está sendo desperdiçado. Primeiro, reduzir o procedimento aumenta a taxa real de beneficiários. Quando um governo local reduziu os documentos para três páginas, o número de inscritos cresceu 40%, e a taxa de aprovação quase não mudou. Segundo, a carga da equipe de análise também diminui, porque o tempo de reler o mesmo documento é maior que o de lê-lo uma vez. É claro que há a objeção de que reduzir o procedimento aumentaria as inscrições fraudulentas. Mas o risco de fraude pode ser tratado com verificação posterior e amostragem aleatória. O custo de suspeitar de todos os inscritos é maior que o custo de fazer todos esperarem. Aqui há dois casos em que posso estar errado. Primeiro, se o procedimento for de fato um dispositivo central para filtrar fraude, reduzi-lo é perigoso. Segundo, se o sistema informatizado do governo local for frágil, reduzir documentos pode não reduzir o tempo de processamento. Nesse caso, a resposta não é abolir o procedimento, mas redesenhar a ordem. Este texto pretende contestar a exigência de aumentar o orçamento. Apenas considero que o que falta agora não é fazer mais dinheiro esperar diante de uma porta mais complexa. Se o leitor, depois de ler este texto, contar quantas páginas tem o formulário da sua região, o que este artigo quer fazer já terá começado.",
    objective: "Avaliar a tese, a força da evidência e o modo como o artigo responde à objeção.",
  },
  reusedIds: ["ko:반론", "ko:독자", "ko:논지", "ko:사후"],
  grammar: [
    [
      "-ㄴ/는 논지다 — a tese é; o argumento central é",
      "명사 + (이)라는 논지다 / 동사 + -자는 논지다",
      "Nomeia a tese que o texto sustenta, muitas vezes para distingui-la do tema ou do tom. É frequente em editoriais, resenhas e análises de argumento. Compare com -ㄴ/는 요지다, que resume o ponto central de uma fala ou texto, e com -ㄴ/는 주장이다, que pode soar mais confrontador. A expressão com 논지 costuma vir acompanhada de uma formulação completa da posição, não de um slogan.",
      [
        ["이 글의 논지는 절차를 먼저 줄이자는 것이다.", "A tese deste texto é reduzir primeiro o procedimento."],
        ["그는 지원보다 접근권이 우선이라는 논지다.", "A tese dele é que o direito de acesso vem antes do subsídio."],
      ],
    ],
    [
      "-고자 한다 — pretende-se; tenho a intenção de",
      "동사 + -고자 한다",
      "Declara a intenção do autor ou de uma instituição em registro formal, sobretudo quando se quer delimitar o que o texto faz e o que não faz. Compare com -려고 한다, mais coloquial, e com -고자 합니다, mais formal e comum em comunicados. Não use a forma para intenções corriqueiras do dia a dia; ela pertence à escrita pública e acadêmica.",
      [
        ["이 글은 예산 논쟁을 끝내고자 한다.", "Este texto pretende encerrar o debate orçamentário."],
        ["필자는 독자에게 판단의 근거를 남기고자 한다.", "O autor pretende deixar ao leitor a base do juízo."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a tese do artigo?", ["Reduzir o procedimento de inscrição deve vir antes de aumentar o subsídio.", "O subsídio aos jovens é inútil e deve ser extinto.", "O governo local deve aumentar o número de formulários."], "Reduzir o procedimento de inscrição deve vir antes de aumentar o subsídio.", "A tese indica uma ordem de prioridade e permite prever custos e beneficiários."),
    cloze("Complete a formulação da tese: 이 글의 ___는 분명하다.", "논지", "-ㄴ/는 논지다 nomeia a posição central que o texto sustenta."),
    listen("Ouça e escreva o que o editor exige sobre o dado.", "자료의 출처와 한계를 함께 밝히세요. 독자는 단언보다 조건을 더 신뢰합니다.", "자료의 출처와 한계를 함께 밝히세요. 독자는 단언보다 조건을 더 신뢰합니다.", "Declare a fonte e o limite do dado. O leitor confia mais em condições do que em afirmações categóricas."),
    translate("pt-ko", "Traduza: “O leitor confia mais em condições do que em afirmações categóricas.”", "독자는 단언보다 조건을 더 신뢰합니다.", "조건 = condição; 단언 = afirmação categórica.", ["독자는 단언보다 조건을 더 믿습니다."]),
    reading("물론 절차를 줄이면 부정 신청이 늘 것이라는 주장이 있다. 그러나 부정의 위험은 사후 점검과 무작위 표본으로 다룰 수 있다. 모든 신청자를 의심하는 비용이 모든 신청자를 기다리게 하는 비용보다 크다.", "Como o artigo responde à objeção sobre fraude?", ["Aceita o risco, mas mostra que verificações posteriores e amostragem custam menos que suspeitar de todos.", "Nega que a fraude exista em qualquer programa social.", "Propõe eliminar todos os controles do programa."], "Aceita o risco, mas mostra que verificações posteriores e amostragem custam menos que suspeitar de todos.", "A objeção é respondida com um mecanismo concreto e uma comparação de custos."),
  ],
  independent: [
    mcq("Qual evidência sustenta melhor a tese do artigo?", ["Um dado local sobre redução de documentos, com aumento de inscritos e taxa de aprovação estável.", "Uma frase de efeito sobre a juventude brasileira.", "A opinião de um amigo que nunca solicitou o benefício.", "Uma estatística sem fonte sobre todos os programas do país."], "Um dado local sobre redução de documentos, com aumento de inscritos e taxa de aprovação estável.", "O dado é delimitado, comparável e ligado diretamente ao que a tese propõe."),
    cloze("Complete a intenção declarada do texto: 이 글은 예산 논쟁을 끝내___.", "고자 한다", "-고자 한다 declara em registro formal o que o texto pretende fazer."),
    listen("Ouça e escreva um dos casos em que o autor admite estar errado.", "신청 절차가 실제로 부정을 걸러 내는 핵심 장치라면 줄이기는 위험하다.", "신청 절차가 실제로 부정을 걸러 내는 핵심 장치라면 줄이기는 위험하다.", "Se o procedimento de inscrição for de fato um dispositivo central para filtrar fraude, reduzi-lo é perigoso."),
    translate("ko-pt", "Traduza: 이 글은 예산을 늘리자는 요구에 반대하고자 한다.", "Este texto pretende se opor à exigência de aumentar o orçamento.", "부정하다 = contestar, negar; 요구 = exigência.", ["Este artigo pretende se opor à exigência de aumentar o orçamento."]),
    reading("그렇다면 답은 절차 폐지가 아니라 순서의 재설계다. 이 글은 예산을 늘리자는 요구에 반대하고자 한다. 다만 지금 필요한 것은 더 많은 돈을 더 복잡한 문 앞에서 기다리게 하는 일이 아니라고 본다.", "O que o fecho faz com a proposta do artigo?", ["Delimita a proposta: não abolir o procedimento, mas reorganizar a ordem e a prioridade.", "Abandona a tese inicial e passa a defender o aumento do orçamento.", "Promete que a fraude será eliminada por completo."], "Delimita a proposta: não abolir o procedimento, mas reorganizar a ordem e a prioridade.", "O fecho qualifica a tese em vez de exagerá-la, o que aumenta a credibilidade."),
  ],
  summary: [
    "Uma tese de opinião indica o que mudar, para quem e com que custo.",
    "Experiência dá voz, mas não substitui evidência delimitada.",
    "-ㄴ/는 논지다 nomeia a posição central do texto.",
    "-고자 한다 declara a intenção do autor em registro público.",
    "Enfrentar uma objeção e admitir um caso de erro fortalece o artigo.",
  ],
  production: production(
    "Produção independente · artigo de opinião",
    "Escreva um artigo de opinião curto sobre um problema público que você conheça. Apresente uma tese verificável, dois argumentos com evidência delimitada, uma objeção real e um caso em que você poderia estar errado.",
    "공공 문제에 대한 짧은 사설을 써 보세요. 논지, 근거 두 가지, 반론과 오류 가능성을 함께 다루어야 합니다.",
    ["Enuncie a tese em uma frase que indique o que deve mudar.", "Use dois argumentos, cada um com um dado ou exemplo delimitado.", "Apresente a objeção mais forte, não a mais fácil.", "Use -ㄴ/는 논지다 e -고자 한다 uma vez cada.", "Feche admitindo um caso de erro sem abandonar a tese."],
    ["Tese clara e verificável.", "Dois argumentos com evidência delimitada.", "Objeção real respondida.", "Duas formas-alvo empregadas corretamente.", "Caso de erro admitido sem apagar a posição."],
    "우리 동네의 야간 도서관은 오후 10시에 문을 닫는다. 시는 이용자가 적다는 이유로 폐관 시간을 앞당기려 하지만, 이 결정에는 한 가지 착각이 있다. 이용자 수는 '지금 이용하는 사람'만 세고, '이용하고 싶지만 포기한 사람'은 세지 않는다. 이 글의 논지는 폐관 시간을 유지하되, 조용한 시간대의 좌석을 줄여 비용을 맞추자는 것이다. 첫째, 야간 이용자의 70퍼센트가 시험 준비생과 야간 근무자다. 둘째, 좌석을 줄이면 전기와 인건비를 아끼면서도 접근권은 유지할 수 있다. 물론 '이용자가 적으니 닫는 것이 맞다'는 반론이 있다. 그러나 적은 이용자도 대체 장소가 없으면 그 시간을 잃는다. 다만 내가 틀릴 수 있는 경우도 있다. 야간 이용자가 실제로 다른 곳으로 이동할 수 있다면, 유지 비용은 정당화되기 어렵다. 그래서 나는 폐관 전에 이동 경로를 조사하고, 그 결과에 따라 결정을 다시 열고자 한다.",
    "A biblioteca noturna do meu bairro fecha às 22h. A prefeitura quer antecipar o horário alegando baixo número de usuários, mas essa decisão contém um engano. A contagem considera apenas quem usa agora, não quem gostaria de usar e desistiu. A tese deste texto é manter o horário e reduzir assentos no período mais silencioso para ajustar o custo. Primeiro, 70% dos usuários noturnos são pessoas que estudam para provas e trabalhadores do turno da noite. Segundo, reduzir assentos economiza eletricidade e mão de obra sem eliminar o direito de acesso. É claro que existe a objeção de que 'se são poucos, o certo é fechar'. Mas poucos usuários também perdem aquele horário se não houver lugar alternativo. No entanto, há um caso em que posso estar errado: se os usuários noturnos realmente puderem se deslocar para outro lugar, o custo de manter a biblioteca se justifica com dificuldade. Por isso, antes do fechamento, pretendo investigar os trajetos e reabrir a decisão conforme o resultado.",
    "Exemplo original. Observe que a tese é delimitada, que a objeção não é uma caricatura e que o caso de erro é concreto. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l38 — defesa oral diante de objeções hostis. */
export const C2_L38 = defineC2Lesson({
  id: "c2-l38", number: 38, moduleId: "c2-m08", title: "Defesa oral",
  objective: "Defender um projeto diante de perguntas hostis com precisão e compostura.",
  prerequisites: ["c2-l37"], estimatedMinutes: 100, dialogueTitle: "A pergunta atrás da pergunta",
  intro: [
    {
      title: "A objeção nem sempre é a pergunta",
      body: "Em uma defesa, a pergunta literal pode esconder uma dúvida sobre o desenho, a competência ou o alcance do trabalho. 'Quantos casos você entrevistou?' pode significar 'por que devo acreditar nesta conclusão?'. Responder apenas ao número alivia o primeiro segundo e deixa a dúvida intacta. Uma boa resposta nomeia o que a pergunta está testando e mostra onde o trabalho resiste e onde ele cede.",
      ko: "질문의 형식과 질문이 실제로 겨냥하는 바는 다를 수 있다.",
    },
    {
      title: "Responder sem abandonar a posição",
      body: "Reconhecer um limite não é concordar com a crítica inteira. A resposta defensável separa três coisas: o que o dado mostra, o que ele não mostra e o que você faria para mostrar mais. Quem responde a tudo com segurança excessiva parece não ter examinado o próprio trabalho; quem concorda com tudo perde a razão pela qual começou. A compostura não é frieza: é manter a pergunta em foco quando o tom sobe.",
      ko: "한계를 인정하는 답변과 결론을 포기하는 답변은 다르다.",
    },
  ],
  dialogue: [
    ["최 위원", "이 표본으로 어떻게 일반화하겠다는 겁니까?", "Com esta amostra, como o senhor pretende generalizar?"],
    ["서연", "일반화하지 않습니다. 세 구의 조건에서 어떤 기제가 작동하는지를 보여 주려는 것입니다.", "Não vou generalizar. O que pretendo é mostrar que mecanismo atua nas condições dos três distritos."],
    ["임 위원", "그럼 이 연구는 정책에 쓸 수 없겠네요.", "Então esta pesquisa não pode ser usada para políticas."],
    ["서연", "정책에 바로 쓰기보다, 어떤 조건에서 정책이 실패하는지를 설명하는 데 쓸 수 있습니다.", "Mais do que servir diretamente à política, ela pode explicar em que condições a política falha."],
    ["최 위원", "질문이 이미 결론을 전제한 것 아닙니까? '부담이 이사를 늦춘다'고 정해 놓고 시작한 것처럼 들립니다.", "A pergunta já não pressupõe a conclusão? Parece que o senhor começou já decidindo que 'o peso retarda a mudança'."],
    ["서연", "그 지적이 맞습니다. 그래서 반대 사례, 즉 부담이 커졌는데도 남은 사람들을 함께 인터뷰했습니다.", "Essa observação é justa. Por isso entrevistei também os casos contrários, isto é, quem permaneceu apesar do aumento do peso."],
    ["임 위원", "그 사례가 전체의 몇 퍼센트입니까?", "Esses casos são que porcentagem do total?"],
    ["서연", "표본의 4분의 1입니다. 그 비율 자체를 일반화하지 않고, 왜 남았는지를 설명하는 단서로 씁니다.", "Um quarto da amostra. Não generalizo essa proporção em si; uso-a como pista para explicar por que permaneceram."],
  ],
  readingText: {
    titlePt: "Três perguntas, três concessões",
    paragraphs: [
      "위원: 이 연구의 요지는 무엇입니까? 연구자: 월세 부담이 이사 결정을 늦추는 방식이 소득 수준만으로 설명되지 않는다는 점입니다. 같은 소득 집단에서도 이사 시점은 크게 달랐고, 그 차이는 통근 시간과 보증금 마련 경로에서 나타났습니다. 위원: 그렇다면 변수가 너무 많지 않습니까? 연구자: 많다는 지적을 받아들입니다. 다만 변수를 줄이면 오히려 판단의 근거가 사라집니다. 그래서 각 변수가 어떤 사례에서 작동했는지를 함께 제시했습니다.",
      "위원: 질문이 결론을 전제했다는 비판에는 어떻게 답변하십니까? 연구자: 타당한 비판입니다. 저는 처음에 '부담이 이사를 늦춘다'는 가설을 세웠고, 그것이 확인되지 않는 사례를 따로 모았습니다. 부담이 커졌는데도 같은 집에 남은 사람이 표본의 4분의 1이었습니다. 이 사례들은 가설을 약화시키지만, 동시에 왜 어떤 사람은 움직이지 못하는지를 보여 줍니다. 실패한 사례를 지우지 않은 것이 이 연구의 가장 중요한 절차였습니다.",
      "위원: 정책적 함의는 무엇입니까? 연구자: 지원 기준을 소득만으로 정하면, 이동 비용 때문에 이사를 포기한 사람을 놓칩니다. 다만 이 연구가 답할 수 있는 것은 세 구의 사례에 한정됩니다. 표본이 작고, 인터뷰가 사후 진술에 의존한다는 한계가 있습니다. 그럼에도 정책이 어떤 조건에서 실패하는지를 설명하도록 답변한 것은, 다음 연구가 검증할 질문을 남기기 위해서입니다. 저는 이 한계를 인정하는 것이 결론을 약하게 만든다고 생각하지 않습니다.",
    ],
    pt: "Membro da banca: Qual é o ponto central desta pesquisa? Pesquisador: É o fato de que o modo como o peso do aluguel mensal retarda a decisão de mudança não se explica apenas pelo nível de renda. Mesmo dentro do mesmo grupo de renda, o momento da mudança variava muito, e essa diferença aparecia no tempo de deslocamento e no caminho para reunir o depósito caução. Membro: Então não são variáveis demais? Pesquisador: Aceito a observação de que são muitas. No entanto, se reduzo as variáveis, o que desaparece é justamente a base do juízo. Por isso, apresentei também em que caso cada variável atuou. Membro: Como o senhor responde à crítica de que a pergunta já pressupunha a conclusão? Pesquisador: É uma crítica válida. No início, formulei a hipótese de que 'o peso retarda a mudança' e reuni separadamente os casos em que isso não se confirmou. As pessoas que permaneceram na mesma casa apesar do aumento do peso eram um quarto da amostra. Esses casos enfraquecem a hipótese, mas ao mesmo tempo mostram por que algumas pessoas não conseguem se mover. Não apagar os casos que falharam foi o procedimento mais importante desta pesquisa. Membro: Qual é a implicação para as políticas? Pesquisador: Se o critério de apoio é definido apenas pela renda, deixamos de fora quem desistiu de se mudar por causa do custo de deslocamento. No entanto, o que esta pesquisa pode responder limita-se aos casos dos três distritos. Há o limite de a amostra ser pequena e de as entrevistas dependerem de relatos posteriores. Ainda assim, responder de modo a explicar em que condições a política falha deixou perguntas para a próxima pesquisa verificar. Não considero que reconhecer esse limite enfraqueça a conclusão.",
    objective: "Reconhecer a objeção real, a concessão feita e o limite que a resposta admite.",
  },
  reusedIds: ["ko:답변", "ko:조건", "ko:가설", "ko:함의"],
  grammar: [
    [
      "-ㄴ/는 요지다 — o ponto central é",
      "명사 + (이)라는 요지다 / 동사 + -는 요지다",
      "Resume o núcleo de uma fala, texto ou proposta, sobretudo em contextos de apresentação, ata ou defesa. Compare com -ㄴ/는 논지다, que nomeia a tese que se defende, e com -ㄴ/는 핵심이다, mais direto e menos avaliativo. Na defesa oral, usar 요지 ajuda a responder antes de entrar nos detalhes, mas não substitui a evidência que sustenta o resumo.",
      [
        ["이 연구의 요지는 소득만으로 결정을 설명할 수 없다는 것이다.", "O ponto central desta pesquisa é que não se pode explicar a decisão apenas pela renda."],
        ["발표의 요지를 먼저 말하고 사례로 들어가겠습니다.", "Vou dizer primeiro o ponto central da apresentação e depois passar aos casos."],
      ],
    ],
    [
      "-도록 답변하다 — responder de modo a",
      "동사 + -도록 답변하다",
      "Descreve a finalidade ou o formato da resposta: não apenas o conteúdo, mas o efeito que ela deve produzir. É comum em atas, avaliações de banca e relatos de defesa. Compare com -라고 답변하다, que apenas introduz o conteúdo da fala, e com -도록 설명하다, que foca a explicação. A construção permite elogiar ou criticar a resposta pelo que ela torna possível, não só pelo que diz.",
      [
        ["정책이 어떤 조건에서 실패하는지 설명하도록 답변했습니다.", "Respondi de modo a explicar em que condições a política falha."],
        ["질문의 전제를 확인하도록 답변한 뒤 사례로 돌아갔습니다.", "Respondi de modo a confirmar a premissa da pergunta e depois voltei aos casos."],
      ],
    ],
  ],
  guided: [
    mcq("O que a pergunta 'com esta amostra, como pretende generalizar?' está testando de fato?", ["O alcance da conclusão e a consciência do pesquisador sobre o limite do desenho.", "O número de páginas do projeto.", "A qualidade da apresentação visual."], "O alcance da conclusão e a consciência do pesquisador sobre o limite do desenho.", "A pergunta literal sobre a amostra esconde uma dúvida sobre o alcance da conclusão."),
    cloze("Complete o resumo do pesquisador: 이 연구의 ___는 소득만으로 결정을 설명할 수 없다는 것이다.", "요지", "-ㄴ/는 요지다 resume o núcleo da pesquisa antes dos detalhes."),
    listen("Ouça e escreva a pergunta da banca sobre a premissa.", "질문이 이미 결론을 전제한 것 아닙니까?", "질문이 이미 결론을 전제한 것 아닙니까?", "A pergunta já não pressupõe a conclusão?"),
    translate("pt-ko", "Traduza: “Reconhecer um limite não é o mesmo que abandonar a conclusão.”", "한계를 인정하는 답변과 결론을 포기하는 답변은 다르다.", "A estrutura comparativa -과 ...은 다르다 separa duas atitudes que costumam ser confundidas.", ["한계를 인정하는 것과 결론을 포기하는 것은 다르다."]),
    reading("저는 처음에 '부담이 이사를 늦춘다'는 가설을 세웠고, 그것이 확인되지 않는 사례를 따로 모았습니다. 부담이 커졌는데도 같은 집에 남은 사람이 표본의 4분의 1이었습니다. 이 사례들은 가설을 약화시키지만, 동시에 왜 어떤 사람은 움직이지 못하는지를 보여 줍니다.", "Por que o pesquisador conserva os casos que enfraquecem a hipótese?", ["Porque eles explicam por que algumas pessoas não conseguem se mudar e tornam o limite visível.", "Porque eles provam que a hipótese estava totalmente correta.", "Porque ele precisa aumentar artificialmente a amostra."], "Porque eles explicam por que algumas pessoas não conseguem se mudar e tornam o limite visível.", "Os casos contrários não são descartados: eles mudam o tipo de explicação que o trabalho oferece."),
  ],
  independent: [
    mcq("Qual resposta mantém a posição sem esconder o limite?", ["Aceito que a amostra não permite generalizar; o que ela mostra é o mecanismo em três distritos, e é isso que sustento.", "Minha amostra prova tudo o que afirmei, sem nenhuma dúvida.", "O senhor tem razão; retiro toda a pesquisa."], "Aceito que a amostra não permite generalizar; o que ela mostra é o mecanismo em três distritos, e é isso que sustento.", "A resposta separa o que o dado mostra do que ele não mostra, sem abandonar a contribuição."),
    cloze("Complete o modo da resposta: 정책이 어떤 조건에서 실패하는지 설명하도록 ___ 것은 인상적이었다.", "답변한", "-도록 답변하다 descreve a finalidade da resposta, não apenas seu conteúdo."),
    listen("Ouça e escreva por que o pesquisador não apagou os casos contrários.", "실패한 사례를 지우지 않은 것이 이 연구의 가장 중요한 절차였습니다.", "실패한 사례를 지우지 않은 것이 이 연구의 가장 중요한 절차였습니다.", "Não apagar os casos que falharam foi o procedimento mais importante desta pesquisa."),
    translate("ko-pt", "Traduza: 그럼에도 정책이 어떤 조건에서 실패하는지를 설명하도록 답변한 것은, 다음 연구가 검증할 질문을 남기기 위해서입니다.", "Ainda assim, respondi de modo a explicar em que condições a política falha para deixar perguntas que a próxima pesquisa verifique.", "그럼에도 = ainda assim; 검증하다 = verificar.", ["Ainda assim, a resposta buscou explicar em que condições a política fracassa, a fim de deixar questões para a próxima pesquisa verificar."]),
    reading("지원 기준을 소득만으로 정하면, 이동 비용 때문에 이사를 포기한 사람을 놓칩니다. 다만 이 연구가 답할 수 있는 것은 세 구의 사례에 한정됩니다. 표본이 작고, 인터뷰가 사후 진술에 의존한다는 한계가 있습니다.", "Como a resposta articula implicação e limite?", ["Aponta um efeito para a política e, em seguida, restringe o alcance do estudo.", "Generaliza o resultado para todo o país sem ressalva.", "Recusa-se a dizer qualquer implicação prática."], "Aponta um efeito para a política e, em seguida, restringe o alcance do estudo.", "A implicação é apresentada como hipótese sobre um ponto cego, não como prova universal."),
  ],
  summary: [
    "A pergunta hostil costuma testar o alcance do trabalho, não apenas o detalhe que enuncia.",
    "-ㄴ/는 요지다 resume o núcleo da pesquisa antes dos detalhes.",
    "-도록 답변하다 nomeia a finalidade da resposta.",
    "Conceder um limite não é aceitar a crítica inteira.",
    "Uma defesa forte separa o que o dado mostra, o que não mostra e o que faria rever a posição.",
  ],
  production: production(
    "Produção independente · três respostas de defesa",
    "Imagine que você vai defender o projeto da lição anterior diante de uma banca cética. Escreva três respostas: uma sobre o tamanho da amostra, uma sobre uma pergunta que parece pressupor a conclusão e uma sobre a utilidade prática do trabalho. Cada resposta deve reconhecer um limite sem abandonar a posição.",
    "까다로운 질문 세 가지에 대한 답변을 준비해 보세요. 각 답변은 한계를 인정하되 결론을 포기하지 않아야 합니다.",
    ["Abra cada resposta com o que a pergunta está realmente testando.", "Diga o que o dado mostra e o que ele não mostra.", "Use -ㄴ/는 요지다 uma vez para resumir o núcleo do trabalho.", "Use -도록 답변하다 uma vez para declarar a finalidade de uma resposta.", "Feche com a evidência que faria você rever a posição."],
    ["Três respostas com foco claro.", "Limite e contribuição separados.", "Duas formas-alvo empregadas corretamente.", "Compostura mantida mesmo na objeção mais dura.", "Evidência de revisão indicada."],
    "먼저 표본에 대한 질문입니다. 이 연구의 요지는 소득만으로 이사 결정을 설명할 수 없다는 것이고, 20명의 인터뷰는 그 기제를 보여 주는 사례입니다. 그러므로 전체 청년으로 일반화하지 않습니다. 다만 같은 소득 집단 안에서도 이사 시점이 갈리는 이유를 설명하도록 답변한 것은, 다음 연구가 검증할 가설을 남기기 위해서입니다. 둘째, 질문이 결론을 전제했다는 지적에는 타당하게 답변하겠습니다. 저는 반대 사례를 따로 모았고, 그것이 표본의 4분의 1이었습니다. 이 사례를 지우지 않은 것이 연구의 절차였습니다. 셋째, 정책적 유용성에 대해서는 직접 처방보다 조건을 설명하는 데 쓸 수 있다고 답하겠습니다. 만약 후속 조사에서 이동 비용이 문제가 아니라는 결과가 나온다면, 저는 가설을 다시 세울 것입니다.",
    "Primeiro, a pergunta sobre a amostra. O ponto central desta pesquisa é que não se pode explicar a decisão de mudança apenas pela renda, e as entrevistas com 20 pessoas são casos que mostram esse mecanismo. Por isso, não generalizo para toda a juventude. No entanto, respondi de modo a explicar por que o momento da mudança se divide dentro do mesmo grupo de renda, para deixar hipóteses que a próxima pesquisa verifique. Segundo, à observação de que a pergunta pressupunha a conclusão, responderei com justiça. Reuni separadamente os casos contrários, e eles eram um quarto da amostra. Não apagar esses casos foi o procedimento da pesquisa. Terceiro, sobre a utilidade prática, responderei que ela pode servir para explicar condições, mais do que para prescrever diretamente. Se uma investigação posterior mostrar que o custo de deslocamento não é o problema, reformularei minha hipótese.",
    "Exemplo original. Observe que cada resposta nomeia o que está sendo testado e que a concessão não apaga a contribuição. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l39 — revisão editorial em quatro camadas. */
export const C2_L39 = defineC2Lesson({
  id: "c2-l39", number: 39, moduleId: "c2-m08", title: "Revisão editorial avançada",
  objective: "Revisar um texto longo em níveis de argumento, estrutura, estilo e linha.",
  prerequisites: ["c2-l38"], estimatedMinutes: 100, dialogueTitle: "Quatro camadas, uma tese",
  intro: [
    {
      title: "Revisar é escolher uma camada por vez",
      body: "Um texto longo pode falhar em quatro camadas: a tese, a estrutura, o estilo e a linha. Corrigir a vírgula antes de saber se a tese se mantém é trabalho perdido; reescrever o estilo antes de resolver a repetição de seções é maquiar o problema. A revisão profissional separa as camadas e registra o que mudou em cada uma. Assim, o autor sabe o que foi corrigido e o que continua sendo decisão dele.",
      ko: "문장을 고치기 전에 글이 무엇을 주장하는지 먼저 확인해야 한다.",
    },
    {
      title: "Estilo sem trocar a tese",
      body: "Lapidar o estilo é ajustar ritmo, precisão e registro sem alterar a posição. O risco aparece quando a busca por fluidez apaga uma concessão ou transforma uma hipótese em certeza. Uma revisão responsável compara antes e depois e marca se a mudança foi de expressão ou de conteúdo. Quando a mudança atinge a tese, ela deixa de ser edição e passa a ser outro texto, que precisa da concordância de quem assina.",
      ko: "표현을 다듬다가 논지를 바꾸면 그것은 편집이 아니라 다른 글쓰기다.",
    },
  ],
  dialogue: [
    ["하린", "이 원고는 네 층에서 문제가 보여요. 논지, 구조, 문체, 문장부호 순서로 봅시다.", "Neste original vejo problemas em quatro camadas. Vamos ver na ordem: tese, estrutura, estilo e pontuação."],
    ["준호", "첫 문단의 주장이 마지막과 다르다는 말씀이죠?", "A senhora quer dizer que a afirmação do primeiro parágrafo é diferente da do final?"],
    ["하린", "네. 첫 문단은 '속도를 줄이자'는 것인데, 결론은 '노선을 늘리자'예요. 둘 다 가능하지만 같은 글에 있으면 독자는 어느 쪽이 논지인지 모릅니다.", "Sim. O primeiro parágrafo diz 'vamos reduzir a velocidade', mas a conclusão diz 'vamos ampliar as linhas'. As duas coisas são possíveis, mas, no mesmo texto, o leitor não sabe qual é a tese."],
    ["준호", "구조는 어떤가요?", "E a estrutura?"],
    ["하린", "3절과 5절이 같은 사례를 두 번 설명해요. 5절을 3절 뒤로 옮기면 반복이 줄고 흐름이 살아납니다.", "As seções 3 e 5 explicam o mesmo caso duas vezes. Se mover a seção 5 para depois da 3, a repetição diminui e o fluxo melhora."],
    ["준호", "문체는요?", "E o estilo?"],
    ["하린", "중간에 갑자기 반말투의 인용이 들어와요. 인용이라면 따옴표와 출처를 붙이고, 아니라면 문어체로 고치세요.", "No meio entra de repente uma citação em registro informal. Se for citação, ponha aspas e fonte; se não for, corrija para o registro culto."],
    ["준호", "마지막 교정은 제가 맡겠습니다. 고친 뒤에 바뀐 문장만 다시 보여 드릴게요.", "A revisão final fica comigo. Depois de corrigir, mostrarei apenas as frases alteradas."],
  ],
  readingText: {
    titlePt: "O que muda quando se muda uma camada",
    paragraphs: [
      "원고를 네 층으로 나누어 읽었다. 첫째 층은 논지다. 서론은 '도시 철도 건설 속도를 늦추자'고 말하지만, 결론은 '노선을 더 늘리자'고 말한다. 두 주장이 모두 틀린 것은 아니다. 문제는 한 글 안에서 어느 쪽이 중심인지 독자가 판단할 수 없다는 점이다. 편집의 첫 단계는 문장을 고치는 일이 아니라, 이 글의 관점이 무엇인지 필자에게 확인하는 일이다.",
      "둘째 층은 구조다. 3절과 5절이 같은 사례를 두 번 설명하고, 4절은 2절의 내용을 거의 반복한다. 5절을 3절 뒤로 옮기고 4절을 삭제하면 논리가 앞으로 나아간다. 셋째 층은 문체다. 2절까지는 문어체인데 3절 중반부터 갑자기 구어체 인용이 이어진다. 인용이라면 따옴표와 출처가 필요하고, 필자의 말이라면 문어체로 다듬어야 한다.",
      "넷째 층은 문장과 부호다. 한 문장에 쉼표가 여섯 번 들어간 곳이 있고, 같은 뜻의 접속어가 두 번 반복된다. 이런 곳은 뜻을 바꾸지 않고도 문장을 나눌 수 있다. 예를 들어 '그러나'와 '다만'이 한 문단에서 세 번 반복된 곳은, 두 문장으로 나누고 접속어를 하나만 남기도록 고쳤다. 이런 수정은 읽는 속도를 바꾸지만 주장의 방향은 바꾸지 않는다. 다만 문체를 다듬다가 논지를 바꾸면 안 된다. '속도를 늦추자'는 주장이 '노선을 늘리자'로 바뀌면 그것은 편집이 아니라 다른 글쓰기다. 그래서 나는 수정 전후의 문장을 나란히 놓고, 바뀐 것이 표현인지 주장인지 표시하도록 다듬었다. 이 메모는 원고를 평가하려는 것이 아니라, 다음 수정이 어디서 멈춰야 하는지를 남기려는 기록이다.",
    ],
    pt: "Li o original dividido em quatro camadas. A primeira camada é a tese. A introdução diz 'vamos desacelerar a construção do metrô urbano', mas a conclusão diz 'vamos ampliar mais linhas'. Não é que as duas afirmações estejam erradas. O problema é que, dentro de um mesmo texto, o leitor não consegue julgar qual das duas é central. A primeira etapa da edição não é corrigir frases, mas confirmar com o autor qual é o ponto de vista do texto. A segunda camada é a estrutura. As seções 3 e 5 explicam o mesmo caso duas vezes, e a seção 4 quase repete o conteúdo da 2. Se movermos a 5 para depois da 3 e apagarmos a 4, a argumentação avança. A terceira camada é o estilo. Até a seção 2, o texto é culto; do meio da seção 3 em diante, segue uma citação coloquial. Se for citação, são necessários aspas e fonte; se for fala do autor, é preciso lapidar para o registro culto. A quarta camada é a frase e a pontuação. Há um trecho com seis vírgulas em uma frase e conectivos de mesmo sentido repetidos duas vezes. Nesses pontos, é possível dividir a frase sem mudar o sentido. Por exemplo, no trecho em que '그러나' e '다만' se repetem três vezes em um parágrafo, corrigi dividindo em duas frases e mantendo apenas um conectivo. Esse tipo de correção muda o ritmo da leitura, mas não a direção da tese. No entanto, não se deve mudar a tese ao lapidar o estilo. Se a afirmação 'vamos desacelerar' vira 'vamos ampliar linhas', isso não é edição, mas outro texto. Por isso, coloquei lado a lado as frases antes e depois da correção e lapidei de modo a marcar se o que mudou foi a expressão ou a tese. Esta nota não pretende avaliar o original; é uma expressão do que se quer deixar registrado sobre onde a próxima revisão deve parar.",
    objective: "Distinguir problema de tese, estrutura, estilo e linha, e justificar cada intervenção.",
  },
  reusedIds: ["ko:교정", "ko:문체", "ko:다듬다", "ko:서론"],
  grammar: [
    [
      "-ㄴ/는 표현이다 — é uma expressão de; é um modo de dizer",
      "명사 + (이)라는 표현이다 / 동사 + -는 표현이다",
      "Comenta a própria formulação, separando o que se diz do modo de dizer. É típico de revisão, análise de discurso e comentário metalinguístico. Compare com -ㄴ/는 말이다, mais coloquial, e com -ㄴ/는 방식이다, que foca o procedimento. A expressão permite criticar ou defender uma escolha de escrita sem atribuir a crítica à pessoa que escreveu.",
      [
        ["'속도를 늦추자'는 표현은 정책의 방향을 바꾸는 말이다.", "A expressão 'vamos desacelerar' é uma formulação que muda a direção da política."],
        ["이 문장은 평가가 아니라 관찰을 남기려는 기록이다.", "Esta frase é uma expressão que pretende registrar uma observação, não uma avaliação."],
      ],
    ],
    [
      "-도록 다듬다 — lapidar de modo a",
      "동사 + -도록 다듬다",
      "Indica o resultado que a revisão deve produzir: marcar, separar, manter ou esclarecer algo. É comum em oficinas de escrita, pareceres e relatórios de edição. Compare com -게 고치다, mais genérico, e com -도록 고쳐 쓰다, que enfatiza a reescrita. A construção permite avaliar a edição pelo efeito que ela produz no leitor, não pela quantidade de mudanças.",
      [
        ["바뀐 것이 표현인지 주장인지 표시하도록 다듬었다.", "Lapidei de modo a marcar se o que mudou foi a expressão ou a tese."],
        ["독자가 멈추지 않고 읽도록 문장을 다듬었습니다.", "Lapidei as frases de modo que o leitor não pare a leitura."],
      ],
    ],
  ],
  guided: [
    mcq("Qual problema pertence à camada da tese, e não à da linha?", ["O texto promete desacelerar a construção e conclui pedindo mais linhas.", "Há uma vírgula repetida no terceiro parágrafo.", "Uma citação coloquial aparece sem aspas."], "O texto promete desacelerar a construção e conclui pedindo mais linhas.", "A contradição entre abertura e conclusão atinge a posição do texto, não a forma da frase."),
    cloze("Complete o comentário metalinguístico: 이 문장은 평가가 아니라 관찰을 남기려는 ___.", "표현", "-ㄴ/는 표현이다 comenta o modo de dizer, separando-o do conteúdo."),
    listen("Ouça e escreva o que a editora propõe para a repetição entre as seções.", "5절을 3절 뒤로 옮기면 반복이 줄고 흐름이 살아납니다.", "5절을 3절 뒤로 옮기면 반복이 줄고 흐름이 살아납니다.", "Se mover a seção 5 para depois da 3, a repetição diminui e o fluxo melhora."),
    translate("pt-ko", "Traduza: “Lapidar o estilo não pode mudar a tese.”", "문체를 다듬다가 논지를 바꾸면 안 된다.", "A construção -다가 ...면 안 된다 expressa o limite que a revisão não deve ultrapassar.", ["문체를 다듬으면서 논지를 바꾸면 안 된다."]),
    reading("3절과 5절이 같은 사례를 두 번 설명하고, 4절은 2절의 내용을 거의 반복한다. 5절을 3절 뒤로 옮기고 4절을 삭제하면 논리가 앞으로 나아간다.", "Por que mover e apagar seções é uma revisão de estrutura, e não de estilo?", ["Porque altera a ordem e a função das partes, não apenas o modo de dizer.", "Porque corrige erros de ortografia.", "Porque muda a tese do texto."], "Porque altera a ordem e a função das partes, não apenas o modo de dizer.", "A intervenção reorganiza o percurso argumentativo sem tocar na posição final."),
  ],
  independent: [
    mcq("Qual mudança é de linha, e não de argumento?", ["Trocar um conectivo repetido e dividir uma frase com seis vírgulas.", "Retirar a conclusão que contradiz a introdução.", "Mover a seção 5 para depois da seção 3.", "Acrescentar a objeção que faltava."], "Trocar um conectivo repetido e dividir uma frase com seis vírgulas.", "A linha trata de precisão e legibilidade local, sem alterar a ordem nem a posição."),
    cloze("Complete a instrução de revisão: 바뀐 것이 표현인지 주장인지 표시하도록 ___.", "다듬었다", "-도록 다듬다 indica o efeito que a revisão deve produzir."),
    listen("Ouça e escreva a diferença entre editar e escrever outro texto.", "문체를 다듬다가 논지를 바꾸면 그것은 편집이 아니라 다른 글쓰기다.", "문체를 다듬다가 논지를 바꾸면 그것은 편집이 아니라 다른 글쓰기다.", "Lapidar o estilo e mudar a tese não é edição, mas outro texto."),
    translate("ko-pt", "Traduza: 편집의 첫 단계는 문장을 고치는 일이 아니라, 이 글의 관점이 무엇인지 필자에게 확인하는 일이다.", "A primeira etapa da edição não é corrigir frases, mas confirmar com o autor qual é o ponto de vista do texto.", "관점 = ponto de vista; 확인하다 = confirmar.", ["O primeiro passo da edição não é consertar frases, e sim verificar com quem escreveu qual é a perspectiva do texto."]),
    reading("다만 문체를 다듬다가 논지를 바꾸면 안 된다. '속도를 늦추자'는 주장이 '노선을 늘리자'로 바뀌면 그것은 편집이 아니라 다른 글쓰기다. 그래서 나는 수정 전후의 문장을 나란히 놓고, 바뀐 것이 표현인지 주장인지 표시하도록 다듬었다.", "Qual é o critério que a editora usa para distinguir edição de reescrita?", ["Verificar se a mudança atinge a expressão ou a posição defendida.", "Contar quantas palavras foram alteradas.", "Aceitar qualquer mudança que deixe o texto mais curto."], "Verificar se a mudança atinge a expressão ou a posição defendida.", "O critério é funcional: a mudança de tese exige outra autoria e outro acordo."),
  ],
  summary: [
    "A revisão em camadas começa pela tese, passa pela estrutura e pelo estilo e termina na linha.",
    "-ㄴ/는 표현이다 comenta o modo de dizer sem confundir com o conteúdo.",
    "-도록 다듬다 nomeia o efeito que a revisão deve produzir.",
    "Mover e apagar seções é intervenção estrutural, não estilística.",
    "Se a revisão muda a tese, o texto deixa de ser o mesmo e exige novo acordo com o autor.",
  ],
  production: production(
    "Produção independente · uma mudança por camada",
    "Escolha um texto seu com pelo menos quatro parágrafos. Revise-o em quatro camadas — tese, estrutura, estilo e linha — e registre uma mudança justificada por camada. Feche explicando qual mudança você recusou para não alterar a posição do texto.",
    "자기 글을 네 층으로 나누어 고치고, 층마다 바꾼 이유와 바꾸지 않은 이유를 적어 보세요.",
    ["Diga em uma frase qual é a tese antes de revisar.", "Registre uma mudança de estrutura, uma de estilo e uma de linha.", "Use -ㄴ/는 표현이다 uma vez para comentar uma escolha de escrita.", "Use -도록 다듬다 uma vez para declarar o efeito da revisão.", "Explique uma mudança que você recusou para preservar a tese."],
    ["Tese identificada antes da revisão.", "Uma mudança justificada por camada.", "Duas formas-alvo empregadas corretamente.", "Limite entre estilo e posição respeitado.", "Recusa justificada de uma alteração."],
    "이 글의 논지는 야간 도서관의 폐관 시간을 유지하자는 것이다. 먼저 구조를 고쳤다. 3절에 있던 이용자 통계를 2절로 옮겨, 주장과 근거가 바로 이어지도록 다듬었다. 다음으로 문체를 손봤다. 중간에 갑자기 짧은 구어체 문장이 이어져서, 문어체로 고르게 바꾸었다. 이 문장은 감정을 앞세우기보다 관찰을 남기려는 기록이다. 마지막으로 한 문장에 쉼표가 다섯 번 들어간 곳을 두 문장으로 나누었다. 다만 '폐관 시간을 유지하자'는 논지를 '좌석을 늘리자'로 바꾸자는 제안은 받아들이지 않았다. 그것은 표현을 다듬는 일이 아니라 다른 주장을 쓰는 일이기 때문이다. 수정 전후를 비교해 보니, 바뀐 것은 대부분 문장의 순서와 리듬이었고 논지는 그대로였다.",
    "A tese deste texto é manter o horário de fechamento da biblioteca noturna. Primeiro corrigi a estrutura. Movi a estatística de usuários da seção 3 para a seção 2, lapidando de modo que a afirmação e a evidência ficassem em sequência imediata. Depois ajustei o estilo. No meio, havia frases curtas em registro coloquial em sequência, e as tornei uniformes no registro culto. Esta frase é uma expressão que pretende registrar uma observação, mais do que colocar a emoção em primeiro plano. Por fim, dividi em duas uma frase com cinco vírgulas. No entanto, não aceitei a proposta de trocar a tese 'manter o horário de fechamento' por 'aumentar os assentos'. Isso não é lapidar a expressão, mas escrever outra argumentação. Comparando antes e depois, o que mudou foi sobretudo a ordem e o ritmo das frases; a tese permaneceu.",
    "Exemplo original. Observe que cada camada tem uma intervenção justificada e que a recusa protege a tese. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l40 — portfólio final e autoavaliação com evidências. */
export const C2_L40 = defineC2Lesson({
  id: "c2-l40", number: 40, moduleId: "c2-m08", title: "Portfólio C2",
  objective: "Integrar análise, argumento, mediação, estilo e revisão em um portfólio final.",
  prerequisites: ["c2-l39"], estimatedMinutes: 110, dialogueTitle: "O que o portfólio prova",
  intro: [
    {
      title: "Integrar não é justapor",
      body: "Um portfólio não é uma pasta com textos lado a lado. Integrar significa mostrar que a análise de uma fonte, o argumento, a leitura literária e a mediação respondem a uma mesma pergunta de percurso. O leitor deve conseguir seguir o fio entre os textos: o que você aprendeu a ver, o que passou a defender e como reformulou isso para outra pessoa. A integração aparece nas transições e na retomada de problemas, não na quantidade de gêneros.",
      ko: "포트폴리오는 글을 모은 것이 아니라, 글 사이의 관계를 보여 주는 것이다.",
    },
    {
      title: "Autoavaliação com evidência e próximo passo",
      body: "Avaliar o próprio trabalho sem estatísticas inventadas exige critérios e evidências. Em vez de dizer 'melhorei muito', o portfólio mostra uma passagem antes e depois, nomeia o que mudou e indica o que ainda não foi resolvido. O fecho olha para frente: qual pergunta você levaria para um próximo projeto? Essa pergunta não é uma promessa de maestria; é a marca de que o percurso continua.",
      ko: "좋은 자기평가는 점수가 아니라 근거와 다음 질문을 남긴다.",
    },
  ],
  dialogue: [
    ["문 교수", "포트폴리오를 읽었습니다. 세 글을 묶는 기준이 무엇인지 한 문장으로 말해 보세요.", "Li o portfólio. Diga em uma frase qual é o critério que reúne os três textos."],
    ["혜원", "야간 이동권이라는 하나의 문제를 자료, 논증, 문학으로 각각 다르게 본 것입니다.", "É a mesma questão do direito de circulação noturna vista de modos diferentes: dados, argumentação e literatura."],
    ["배 교수", "그런데 분석 글과 논증 글의 결론이 완전히 같지는 않더군요.", "No entanto, as conclusões do texto de análise e do texto de argumentação não são exatamente iguais."],
    ["혜원", "맞습니다. 분석에서는 확신이 줄었고, 논증에서는 주장이 더 분명해졌습니다. 그 차이를 감추지 않고 서로 설명했습니다.", "É verdade. Na análise, a certeza diminuiu; na argumentação, a posição ficou mais clara. Não escondi essa diferença e fiz um texto explicar o outro."],
    ["문 교수", "주민 설명회용으로 다시 쓴 글은 왜 넣었습니까?", "Por que incluiu o texto reescrito para a assembleia de moradores?"],
    ["혜원", "같은 논지를 다른 독자에게 옮기면서 무엇이 남고 무엇이 빠지는지 확인하고 싶었습니다.", "Queria verificar o que permanece e o que se perde ao transportar a mesma tese para outro leitor."],
    ["배 교수", "그 과정에서 가장 어려웠던 점은 무엇이었나요?", "O que foi mais difícil nesse processo?"],
    ["혜원", "전문 용어를 줄이면서도 한계를 지우지 않는 일이었습니다. 결국 한계를 먼저 말하는 문장을 맨 앞에 두었습니다.", "Foi reduzir o jargão sem apagar os limites. No fim, coloquei logo no início a frase que declara os limites."],
  ],
  readingText: {
    titlePt: "Três textos, uma pergunta de percurso",
    paragraphs: [
      "이 포트폴리오는 야간 버스 노선 축소를 둘러싼 세 가지 글을 하나로 묶는다. 첫 글은 시의 공개 자료를 분석한다. 자료에 따르면 지난해 야간 이용자는 12퍼센트 줄었지만, 병원과 공장이 몰린 두 구에서는 오히려 늘었다. 문제는 이 자료가 이용자의 이유를 묻지 않는다는 점이다. 나는 같은 기간의 민원 기록을 함께 읽었고, 거기에는 '막차를 놓으면 택시비가 두 배'라는 문장이 반복되었다. 수치와 목소리가 서로 다른 것을 말할 때, 분석은 둘 중 하나를 고르는 일이 아니라 둘 사이의 간격을 설명하는 일이 된다.",
      "둘째 글은 노선을 유지하자는 논증이다. 논지는 비용이 아니라 접근권에 있다. 야간 노선을 줄이면 이동 시간이 늘어나는 사람은 대개 선택권이 적은 사람이다. 물론 반론도 있다. 이용자가 줄었는데 노선을 유지하는 것은 낭비라는 주장이다. 나는 이 반론을 무시하지 않고, 이용률이 낮은 노선과 특정 시간대의 집중도를 구분하자고 답했다. 셋째 글은 정류장을 배경으로 한 짧은 시를 읽는다. 시에서 막차는 시간표가 아니라 관계의 상징으로 나타난다. 문학적 읽기는 정책적 주장을 대체하지 않지만, 숫자로 환산되지 않는 경험을 보여 준다.",
      "마지막으로 나는 이 글들을 주민 설명회에서 쓸 수 있도록 다시 썼다. 전문 용어를 줄이고, 자료의 한계를 먼저 밝히고, 반대 의견을 가진 사람이 무엇을 확인하면 판단을 바꿀 수 있는지 적었다. 이 과정은 글을 고치는 데 그치지 않고, 어디까지 주장할 수 있는지 밝히는 일이었다. 포트폴리오를 마무리하기에 앞서 나는 세 글을 다시 읽었다. 기록은 남았지만, 다음에 쓸 글에서 다룰 질문도 남았다. 그것이 내가 이번 작업에서 얻은 가장 정확한 성과다.",
    ],
    pt: "Este portfólio reúne em um só conjunto três textos sobre a redução das linhas de ônibus noturno. O primeiro analisa dados públicos da cidade. Segundo os dados, o número de usuários noturnos caiu 12% no ano passado, mas nos dois distritos onde se concentram hospitais e fábricas até aumentou. O problema é que esses dados não perguntam o motivo dos usuários. Li junto os registros de reclamações do mesmo período, e ali se repetia a frase 'se perco o último ônibus, o táxi custa o dobro'. Quando números e vozes dizem coisas diferentes, a análise não é escolher um dos dois, mas explicar a distância entre eles. O segundo texto é um argumento pela manutenção das linhas. A tese está no direito de acesso, não no custo. Quando se reduzem as linhas noturnas, quem vê o tempo de deslocamento aumentar é, em geral, quem tem menos opções. Há também a objeção: manter linhas com menos usuários seria desperdício. Não ignorei essa objeção e respondi propondo distinguir linhas de baixa utilização da concentração em determinados horários. O terceiro texto lê um poema curto ambientado em um ponto de ônibus. No poema, o último ônibus aparece não como horário, mas como símbolo de uma relação. A leitura literária não substitui a argumentação política, mas mostra uma experiência que não se converte em número. Por fim, reescrevi esses textos para usar em uma assembleia de moradores. Reduzi o jargão, declarei primeiro os limites dos dados e registrei o que uma pessoa com opinião contrária precisaria verificar para mudar de juízo. Esse processo não se limitou a corrigir o texto: foi também declarar até onde posso argumentar. Antes de concluir o portfólio, reli os três textos. O registro ficou, mas também ficaram as perguntas a tratar no próximo texto. Esse é o resultado mais preciso que obtive neste trabalho.",
    objective: "Identificar a pergunta que integra os gêneros e avaliar a autoavaliação por evidências.",
  },
  reusedIds: ["ko:논증", "ko:자기평가", "ko:발표", "ko:수치"],
  grammar: [
    [
      "-ㄴ/는 데 그치지 않고 — não se limita a",
      "동사 + -는 데 그치지 않고",
      "Indica que uma ação ou texto vai além de uma primeira função, acrescentando outra mais exigente. É comum em relatórios, autoavaliações e textos de percurso. Compare com -뿐만 아니라, que soma itens, e com -는 것을 넘어서, que enfatiza a ultrapassagem de um limite. A construção com 그치지 않고 costuma introduzir uma consequência que o leitor deve reconhecer como parte do trabalho, não como acréscimo decorativo.",
      [
        ["이 과정은 글을 고치는 데 그치지 않고, 주장의 범위를 밝히는 일이었다.", "Esse processo não se limitou a corrigir o texto: foi também declarar o alcance da argumentação."],
        ["인터뷰는 경험을 듣는 데 그치지 않고, 제도의 빈틈을 드러냈다.", "As entrevistas não se limitaram a ouvir experiências: revelaram lacunas do sistema."],
      ],
    ],
    [
      "-기에 앞서 — antes de",
      "동사 + -기에 앞서",
      "Marca a etapa que precisa ser cumprida antes de outra, em registro formal. É frequente em relatórios, atas e planejamentos. Compare com -기 전에, mais neutro e oral, e com -ㄴ/는 데 앞서, de sentido próximo mas menos comum com verbos de ação. A construção não indica apenas ordem temporal: costuma sugerir que a etapa prévia é uma condição para a qualidade do que vem depois.",
      [
        ["포트폴리오를 마무리하기에 앞서 나는 세 글을 다시 읽었다.", "Antes de concluir o portfólio, reli os três textos."],
        ["발표하기에 앞서 자료의 한계를 정리했다.", "Antes de apresentar, organizei os limites dos dados."],
      ],
    ],
  ],
  guided: [
    mcq("O que integra os três textos do portfólio?", ["A mesma pergunta sobre o direito de circulação noturna, vista por dados, argumento e literatura.", "O mesmo gênero textual repetido três vezes.", "A mesma conclusão, copiada para os três textos."], "A mesma pergunta sobre o direito de circulação noturna, vista por dados, argumento e literatura.", "A integração está no fio problemático que atravessa gêneros diferentes, não na repetição da forma."),
    cloze("Complete a função do processo de reescrita: 이 과정은 글을 고치는 데 ___ 않고, 주장의 범위를 밝히는 일이었다.", "그치지", "-는 데 그치지 않고 indica que a ação vai além de uma primeira função."),
    listen("Ouça e escreva o que a banca pergunta sobre os textos.", "그런데 분석 글과 논증 글의 결론이 완전히 같지는 않더군요.", "그런데 분석 글과 논증 글의 결론이 완전히 같지는 않더군요.", "No entanto, as conclusões do texto de análise e do texto de argumentação não são exatamente iguais."),
    translate("pt-ko", "Traduza: “Antes de concluir o portfólio, reli os três textos.”", "포트폴리오를 마무리하기에 앞서 나는 세 글을 다시 읽었다.", "-기에 앞서 marca a etapa prévia em registro formal.", ["포트폴리오를 마무리하기 전에 세 글을 다시 읽었다."]),
    reading("나는 같은 기간의 민원 기록을 함께 읽었고, 거기에는 '막차를 놓으면 택시비가 두 배'라는 문장이 반복되었다. 수치와 목소리가 서로 다른 것을 말할 때, 분석은 둘 중 하나를 고르는 일이 아니라 둘 사이의 간격을 설명하는 일이 된다.", "O que a análise faz quando números e vozes divergem?", ["Explica a distância entre eles, em vez de escolher um dos dois.", "Descarta os números e aceita apenas as vozes.", "Soma os dois para produzir uma média."], "Explica a distância entre eles, em vez de escolher um dos dois.", "A divergência é o próprio objeto da análise."),
  ],
  independent: [
    mcq("Qual fecho de autoavaliação é sustentado por evidência?", ["Mostro uma passagem antes e depois, nomeio o que mudou e indico a pergunta que ainda não resolvi.", "Afirmo que melhorei muito em todas as competências.", "Digo que não houve nenhuma mudança porque o texto já estava pronto.", "Comparo minha nota com uma estatística inventada."], "Mostro uma passagem antes e depois, nomeio o que mudou e indico a pergunta que ainda não resolvi.", "A autoavaliação avançada usa evidência textual e um próximo passo, não uma impressão global."),
    cloze("Complete a etapa prévia: 포트폴리오를 마무리하기에 ___ 나는 세 글을 다시 읽었다.", "앞서", "-기에 앞서 indica a etapa que deve vir antes da conclusão."),
    listen("Ouça e escreva a dificuldade que a autora nomeia.", "전문 용어를 줄이면서도 한계를 지우지 않는 일이었습니다.", "전문 용어를 줄이면서도 한계를 지우지 않는 일이었습니다.", "Foi reduzir o jargão sem apagar os limites."),
    translate("ko-pt", "Traduza: 기록은 남았지만, 다음에 쓸 글에서 다룰 질문도 남았다.", "O registro ficou, mas também ficaram as perguntas a tratar no próximo texto.", "남다 = ficar, permanecer; 다루다 = tratar.", ["O registro permaneceu, mas também permaneceram as questões que o próximo texto deverá abordar."]),
    reading("이 과정은 글을 고치는 데 그치지 않고, 어디까지 주장할 수 있는지 밝히는 일이었다. 포트폴리오를 마무리하기에 앞서 나는 세 글을 다시 읽었다. 기록은 남았지만, 다음에 쓸 글에서 다룰 질문도 남았다.", "Como o fecho avalia o percurso?", ["Reconhece o que ficou registrado e nomeia a pergunta que continua aberta.", "Declara que o percurso terminou sem nenhuma pendência.", "Repete a introdução sem acrescentar avaliação."], "Reconhece o que ficou registrado e nomeia a pergunta que continua aberta.", "O fecho articula conquista e continuidade, sem inventar um ponto final absoluto."),
  ],
  summary: [
    "Integrar gêneros é mostrar a pergunta que os atravessa, não apenas reuni-los.",
    "-ㄴ/는 데 그치지 않고 indica que o trabalho ultrapassa sua primeira função.",
    "-기에 앞서 marca uma etapa prévia que condiciona a qualidade do que vem depois.",
    "Autoavaliação avançada usa evidência textual e nomeia o que ainda não foi resolvido.",
    "O fecho do portfólio olha para frente: o percurso continua em uma pergunta seguinte.",
  ],
  production: production(
    "Produção independente · portfólio e autoavaliação",
    "Reúna três textos que você já escreveu neste curso, ou escreva três seções breves: uma análise de fonte, um argumento e uma leitura ou mediação. Em seguida, escreva uma apresentação que mostre a pergunta comum, a diferença entre os gêneros e uma autoavaliação com evidência e próximo passo.",
    "이번 과정에서 쓴 글 세 편을 골라 공통 질문과 장르의 차이를 밝히고, 근거 있는 자기평가와 다음 질문을 덧붙여 보세요.",
    ["Enuncie a pergunta que atravessa os três textos.", "Mostre o que cada gênero permite ver e o que ele deixa de fora.", "Use uma passagem antes e depois para sustentar a autoavaliação.", "Use -ㄴ/는 데 그치지 않고 e -기에 앞서 uma vez cada.", "Feche com uma pergunta concreta para o próximo projeto."],
    ["Pergunta comum aos três textos.", "Diferença entre gêneros explicitada.", "Autoavaliação com evidência textual.", "Duas formas-alvo empregadas corretamente.", "Próximo passo formulado como pergunta."],
    "내 포트폴리오의 공통 질문은 '야간 이동권은 누구의 시간으로 측정되는가'이다. 첫 글에서는 시의 자료와 민원 기록을 비교했다. 자료는 이용자 수를 보여 주지만, 왜 그 시간에 움직여야 하는지는 말하지 않는다. 둘째 글에서는 노선 유지가 비용이 아니라 접근권의 문제라고 주장했다. 셋째 글에서는 막차를 기다리는 사람의 장면을 읽었다. 문학은 정책의 근거가 되지 않지만, 숫자로 환산되지 않는 경험을 보여 준다. 이 작업은 세 장르를 나란히 놓는 데 그치지 않고, 같은 질문이 장르마다 다른 답을 낳는다는 점을 밝히는 일이었다. 자기평가를 하기에 앞서 나는 첫 글과 마지막 글을 다시 비교했다. 처음에는 결론을 빨리 내려고 했지만, 지금은 조건을 먼저 쓰는 편이 더 정확하다고 본다. 아직 해결하지 못한 질문은 이동권을 개인의 선택으로 볼 때와 권리로 볼 때 어떤 정책이 달라지는가이다. 다음 글에서는 이 질문을 다루고 싶다.",
    "A pergunta comum do meu portfólio é 'o direito de circulação noturna é medido pelo tempo de quem?'. No primeiro texto, comparei dados da cidade com registros de reclamações. Os dados mostram o número de usuários, mas não dizem por que essas pessoas precisam se mover naquele horário. No segundo texto, defendi que manter as linhas é uma questão de direito de acesso, não de custo. No terceiro, li a cena de alguém esperando o último ônibus. A literatura não serve como prova de política, mas mostra uma experiência que não se converte em número. Este trabalho não se limitou a colocar três gêneros lado a lado: foi também declarar que a mesma pergunta gera respostas diferentes em cada gênero. Antes de fazer a autoavaliação, comparei novamente o primeiro e o último texto. No início, eu queria concluir rápido; hoje considero mais preciso escrever primeiro as condições. A pergunta que ainda não resolvi é que políticas mudam quando o direito de circulação é visto como escolha individual ou como direito. No próximo texto, quero tratar dessa pergunta.",
    "Exemplo original. Observe que a pergunta comum organiza os gêneros, que a autoavaliação usa comparação textual e que o fecho propõe um próximo passo concreto. Exemplo ilustrativo; não é gabarito.",
  ),
});
