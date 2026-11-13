import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "A revisão responde ao problema indicado no enunciado e produz uma versão utilizável do texto." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A cadeia de referências e a ordem das ideias se mantêm do início ao fim, sem saltos nem repetições." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico de edição com precisão, inclusive parte do léxico da lição, em colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém coerente com o gênero e o destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade da revisão", descriptorPt: "Cada mudança resolve um problema identificável e não apaga informação necessária." },
  { criterion: "synthesis" as const, labelPt: "Síntese e justificativa", descriptorPt: "O fechamento explica o que melhorou, o que foi sacrificado e o que ainda precisa de revisão." },
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

/** c1-l26 — coesão referencial e cadeia de retomadas. */
export const C1_L26 = defineC1Lesson({
  id: "c1-l26", number: 26, moduleId: "c1-m06", title: "Coesão referencial",
  objective: "Corrigir referências ambíguas e manter a cadeia de sentido ao longo do texto.",
  prerequisites: ["c1-c05"], estimatedMinutes: 80, dialogueTitle: "A que se refere ‘isto’",
  intro: [
    {
      title: "Uma retomada, um referente",
      body: "Um texto coeso não repete o mesmo substantivo nem deixa o leitor adivinhar o que cada retomada designa. O critério prático é o número de candidatos: se uma expressão remete a um único antecedente, ela pode ficar; se remete a dois ou mais, é preciso explicitar o referente ou reorganizar a frase. O problema raramente está no pronome em si: está na distância e no número de elementos que ocupam o mesmo espaço antes dele. Editar coesão é, antes de tudo, contar candidatos.",
      ko: "앞서 밝힌 바와 같이, 지시어가 무엇을 가리키는지 독자가 되짚을 수 없다면 그 문장은 이미 고쳐야 할 문장이다.",
    },
    {
      title: "Discurso: a cadeia referencial atravessa o parágrafo",
      body: "A coesão não se resolve frase por frase. O leitor acompanha uma cadeia: um termo é introduzido, retomado por um demonstrativo, substituído por uma expressão mais curta e, às vezes, recuperado muitas linhas depois. Se um elo dessa cadeia aponta para dois lugares, o parágrafo inteiro perde estabilidade. Ao revisar, marque cada retomada e suba até seu antecedente; se o caminho tiver bifurcação, o texto ainda não está pronto. Repetir um substantivo é menos grave do que obrigar o leitor a escolher no escuro.",
      ko: "지시어는 앞 문장의 표현을 그대로 받되, 같은 말이 지나치게 반복되지 않도록 자리를 옮긴다.",
    },
  ],
  dialogue: [
    ["서윤", "민재 씨, 이 문단에서 ‘이 조치’가 무엇을 가리키는지 먼저 확인해 볼까요?", "Minjae, que tal primeiro verificarmos a que ‘esta medida’ se refere neste parágrafo?"],
    ["민재", "운영 시간 연장을 말한 거예요. 바로 앞 문장에 있잖아요.", "É a extensão do horário de funcionamento. Está na frase imediatamente anterior, não está?"],
    ["서윤", "바로 앞 문장에 사서 배치 확대도 있어서 후보가 둘이에요.", "Na frase imediatamente anterior também está a ampliação da equipe de bibliotecários, então há dois candidatos."],
    ["민재", "아, 그러면 독자는 둘 중에 무엇인지 헷갈리겠네요.", "Ah, então o leitor vai ficar em dúvida sobre qual dos dois é."],
    ["서윤", "네. 지시어를 그대로 두려면 선행사를 하나로 만들어야 해요.", "Sim. Para manter o elemento anafórico, é preciso deixar um único antecedente."],
    ["민재", "운영 시간 연장을 먼저 쓰고, ‘이 연장’이라고 받으면 되겠네요.", "Então basta escrever primeiro a extensão do horário e retomá-la com ‘esta extensão’."],
    ["서윤", "좋아요. 대신 같은 명사가 반복되지 않도록 다음 문장에서는 대용 표현을 써 보세요.", "Bom. Em troca, na frase seguinte use uma expressão substituta para não repetir o mesmo substantivo."],
    ["민재", "수정한 뒤에 문단 전체를 소리 내어 읽어 보고, 다시 되짚어야 하는 문장이 있는지 확인할게요.", "Depois de revisar, vou ler o parágrafo inteiro em voz alta e verificar se há alguma frase que obrigue a voltar atrás."],
  ],
  readingText: {
    titlePt: "Dois candidatos, nenhuma pista",
    paragraphs: [
      "도서관 이용 시간을 바꾸자는 제안서를 검토하던 편집팀은 첫 문단에서 곧바로 문제를 발견했다. ‘이 조치는 이용자의 불편을 줄일 것이다’라는 문장에서 ‘이 조치’가 무엇을 가리키는지 분명하지 않았기 때문이다. 앞 문장에는 운영 시간 연장과 사서 배치 확대가 함께 언급되어 있었고, 두 가지 모두 조치가 될 수 있었다. 독자는 문장을 두 번 읽고 나서야 대상을 짐작해야 했다. 편집팀은 지시어를 그대로 두고 문장만 다듬는 대신, 가리키는 대상을 문장 안에 다시 밝히기로 했다.",
      "수정된 문단에서는 ‘운영 시간 연장’이 첫 문장에, ‘이 연장’이 둘째 문장에 놓였다. 같은 대상을 가리키지만 표현이 달라져 반복은 줄었고, 선행사와 지시어의 거리도 가까워졌다. 편집팀은 문단마다 지시어를 표시하고, 각 지시어에서 위로 올라가 선행사를 찾는 방식을 택했다. 중복이 지나치게 많은 문장은 대용 표현으로 바꾸었고, 후보가 둘 이상인 지시어는 구체적인 명사로 되돌렸다. 이 절차는 문장을 짧게 만드는 일이 아니라, 독자가 되짚는 시간을 줄이는 일이다.",
      "모든 지시어를 명사로 바꾸면 글이 안전해 보이지만, 같은 명사가 반복되어 오히려 읽기 어려워진다. 반대로 대용 표현만 늘리면 독자는 매번 대상을 추측해야 한다. 따라서 편집의 기준은 지시어의 개수가 아니라 후보의 수다. 한 지시어에 후보가 하나면 그대로 두고, 둘 이상이면 대상을 밝힌다. 이 원칙을 적용한 뒤 제안서의 첫 문단은 세 문장에서 다섯 문장으로 늘었지만, 검토에 걸리는 시간은 오히려 줄었다.",
    ],
    pt: "A equipe de edição que revisava a proposta de mudança no horário de funcionamento da biblioteca encontrou o problema logo no primeiro parágrafo. Isso porque, na frase ‘esta medida reduzirá o transtorno dos usuários’, não estava claro a que ‘esta medida’ se referia. No parágrafo anterior, mencionavam-se ao mesmo tempo a extensão do horário e a ampliação da equipe de bibliotecários, e ambas podiam ser a medida. O leitor só conseguia supor o referente depois de ler a frase duas vezes. Em vez de manter o elemento anafórico e apenas polir a frase, a equipe decidiu explicitar novamente o referente dentro da frase. No parágrafo revisado, ‘a extensão do horário de funcionamento’ aparece na primeira frase e ‘esta extensão’ na segunda. Embora apontem para o mesmo objeto, as expressões são diferentes, o que reduziu a repetição, e a distância entre o antecedente e o elemento anafórico também diminuiu. A equipe marcou os elementos anafóricos em cada parágrafo e adotou o procedimento de subir até encontrar o antecedente. As frases com redundância excessiva foram trocadas por expressões substitutas, e os elementos anafóricos com mais de um candidato voltaram a ser substantivos concretos. Esse procedimento não consiste em encurtar frases, mas em reduzir o tempo que o leitor leva para reconstruir o sentido. Trocar todos os elementos anafóricos por substantivos pode parecer seguro, mas o mesmo substantivo se repete e o texto fica, na verdade, mais difícil de ler. Por outro lado, se apenas aumentamos as expressões substitutas, o leitor precisa adivinhar o referente a cada momento. Por isso, o critério da edição não é o número de elementos anafóricos, mas o número de candidatos. Se um elemento anafórico tem um único candidato, deixa-se como está; se tem dois ou mais, explicita-se o referente. Depois de aplicar esse princípio, o primeiro parágrafo da proposta passou de três para cinco frases, mas o tempo de revisão, na verdade, diminuiu.",
    objective: "Identificar o referente de cada retomada e perceber por que dois candidatos tornam o parágrafo instável.",
  },
  reusedIds: ["ko:문제", "ko:독자", "ko:추측", "ko:대가"],
  grammar: [
    [
      "-ㄴ/는 바 — o que; o fato (retomada formal)",
      "동사 + -는 바 / 형용사 + -(으)ㄴ 바 / 명사 + 인 바",
      "Retoma como bloco um fato ou conteúdo já enunciado, sobretudo em relatórios e textos acadêmicos: 밝힌 바와 같이, 검토한 바에 따르면. É mais compacto e formal que -ㄴ/는 것 e nunca designa um objeto físico. Em edição, serve para retomar uma afirmação anterior sem repeti-la inteira. Não use para retomar uma pessoa nem para introduzir uma opinião nova.",
      [
        ["앞서 밝힌 바와 같이, 이번 수정은 문장의 길이를 줄이는 데 목적이 있다.", "Como já foi exposto acima, esta revisão tem por objetivo reduzir a extensão das frases."],
        ["검토한 바에 따르면, 불분명한 지시어는 첫 문단에 집중되어 있다.", "Segundo o que foi examinado, os elementos anafóricos pouco claros se concentram no primeiro parágrafo."],
      ],
    ],
    [
      "-ㄹ 것 — aquilo que; o que (retomada)",
      "동사 + -ㄹ 것 / 형용사 + -(으)ㄴ 것",
      "Nominaliza uma oração e retoma algo que se deve fazer, verificar ou corrigir: 고칠 것, 확인할 것. É mais amplo que 바, porque aceita tanto fatos abstratos quanto tarefas e objetos, e aparece com naturalidade na fala e na escrita. Compare com -ㄴ/는 바, reservado a fatos já enunciados em registro formal. Na revisão, -ㄹ 것 ajuda a nomear o alvo da edição antes de explicá-lo.",
      [
        ["이 문단에서 고칠 것은 지시어의 범위가 아니라 문장의 순서다.", "Neste parágrafo, o que precisa ser corrigido não é o alcance do elemento anafórico, mas a ordem das frases."],
        ["편집자가 확인할 것은 선행사가 하나인지 여부다.", "O que a editora precisa verificar é se há apenas um antecedente."],
      ],
    ],
  ],
  guided: [
    mcq("Segundo o texto, quando um elemento anafórico pode permanecer como está?", ["Quando tem um único candidato a antecedente.", "Quando aparece no início do parágrafo.", "Quando o autor o considera elegante."], "Quando tem um único candidato a antecedente.", "O critério é o número de candidatos: com um só, a retomada é segura."),
    cloze("Complete o princípio de edição: 한 지시어에 후보가 하나면 그대로 두고, 둘 이상이면 대상을 ___.", "밝힌다", "밝힌다 fecha o critério: com dois ou mais candidatos, o referente precisa ser explicitado."),
    listen("Ouça e escreva a regra para retomadas com mais de um candidato.", "한 지시어에 후보가 둘 이상이면 대상을 구체적인 명사로 밝힌다.", "한 지시어에 후보가 둘 이상이면 대상을 구체적인 명사로 밝힌다.", "Quando um elemento anafórico tem dois ou mais candidatos, explicita-se o referente com um substantivo concreto."),
    reading("수정된 문단에서는 ‘운영 시간 연장’이 첫 문장에, ‘이 연장’이 둘째 문장에 놓였다. 같은 대상을 가리키지만 표현이 달라져 반복은 줄었고, 선행사와 지시어의 거리도 가까워졌다.", "O que a revisão melhorou nesse trecho?", ["Reduziu a repetição e aproximou o antecedente da retomada.", "Eliminou todos os substantivos abstratos.", "Aumentou o número de candidatos."], "Reduziu a repetição e aproximou o antecedente da retomada.", "O texto diz que a repetição diminuiu e a distância entre antecedente e retomada encurtou."),
    translate("pt-ko", "Traduza: “O que a editora precisa verificar é se o antecedente é único.”", "편집자가 확인할 것은 선행사가 하나인지 여부다.", "-ㄹ 것 nominaliza o alvo da verificação em registro escrito.", ["편집자가 확인해야 할 것은 선행사가 하나인지 여부다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 바 de forma adequada?", ["검토한 바에 따르면 문제는 첫 문단에 있다.", "검토한 바가 문제는 첫 문단에 있다.", "검토하는 바에 따르면 문제는 첫 문단에 있다."], "검토한 바에 따르면 문제는 첫 문단에 있다.", "Com verbo, a forma é -ㄴ/는 바: 검토한 바에 따르면."),
    cloze("Complete a retomada formal: 앞서 밝힌 ___와 같이, 이번 수정은 범위를 좁힌다.", "바", "A expressão fixa é 밝힌 바와 같이, para retomar o que já foi dito."),
    listen("Ouça e escreva por que substituir todas as retomadas por substantivos não resolve o problema.", "모든 지시어를 명사로 바꾸면 같은 명사가 반복되어 글이 오히려 읽기 어려워진다.", "모든 지시어를 명사로 바꾸면 같은 명사가 반복되어 글이 오히려 읽기 어려워진다.", "Trocar todos os elementos anafóricos por substantivos faz o mesmo substantivo se repetir e deixa o texto mais difícil de ler."),
    translate("ko-pt", "Traduza: 편집의 기준은 지시어의 개수가 아니라 후보의 수다.", "O critério da edição não é o número de elementos anafóricos, mas o número de candidatos.", "기준 = critério; 후보 = candidato a referente.", ["O que orienta a edição não é a quantidade de retomadas, e sim quantos referentes possíveis existem."]),
    reading("모든 지시어를 명사로 바꾸면 글이 안전해 보이지만, 같은 명사가 반복되어 오히려 읽기 어려워진다. 반대로 대용 표현만 늘리면 독자는 매번 대상을 추측해야 한다. 따라서 편집의 기준은 지시어의 개수가 아니라 후보의 수다.", "Qual é o risco de aumentar apenas as expressões substitutas?", ["O leitor passa a adivinhar o referente a cada momento.", "O texto perde todos os substantivos.", "A pontuação fica incorreta."], "O leitor passa a adivinhar o referente a cada momento.", "O texto alerta que o excesso de substituições obriga o leitor a inferir o referente repetidamente."),
  ],
  summary: [
    "A coesão referencial se decide pelo número de candidatos a antecedente, não pela quantidade de pronomes.",
    "-ㄴ/는 바 retoma formalmente um fato já enunciado; -ㄹ 것 nomeia o que se deve fazer ou verificar.",
    "Repetir um substantivo pode ser melhor do que obrigar o leitor a escolher no escuro.",
    "Cada retomada precisa de um caminho único até seu antecedente.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · editar um parágrafo ambíguo",
    "Reescreva um parágrafo seu ou de um texto que você conhece em que haja retomadas ambíguas. Marque os elementos anafóricos, explicite os referentes necessários e justifique duas mudanças. O parágrafo final deve continuar coeso, sem repetição excessiva.",
    "지시어가 무엇을 가리키는지 분명하지 않은 문단을 고쳐 보세요.",
    ["Liste antes os candidatos de cada retomada.", "Use -ㄴ/는 바 uma vez para retomar uma afirmação anterior.", "Use -ㄹ 것 uma vez para nomear o alvo da revisão.", "Termine explicando o que mudou e por quê."],
    ["Retomadas ambíguas localizadas.", "Referentes explicitados sem repetição desnecessária.", "Uso correto de -ㄴ/는 바 e -ㄹ 것.", "Duas mudanças justificadas.", "Parágrafo final legível em uma única leitura."],
    "제안서 첫 문단에는 지시어가 세 번 나오지만, 그중 두 개는 대상을 바로 알 수 없다. ‘이 조치’는 운영 시간 연장을 가리키는 말이지만, 앞 문장에는 사서 배치 확대도 함께 나온다. 독자는 두 후보 사이에서 멈추게 된다. 고칠 것은 지시어의 개수가 아니라 후보의 수다. 먼저 운영 시간 연장을 문장 앞에 놓고, 다음 문장에서 ‘이 연장’으로 받았다. 사서 배치에 대해서는 새로운 문장을 만들어 구체적인 명사로 다시 밝혔다. 앞서 밝힌 바와 같이, 같은 명사를 반복하는 것보다 독자가 되짚는 시간을 줄이는 것이 우선이다. 수정한 문단은 세 문장에서 다섯 문장으로 늘었지만, 읽는 데 걸리는 시간은 오히려 짧아졌다.",
    "No primeiro parágrafo da proposta, o elemento anafórico aparece três vezes, mas em dois casos não é possível saber de imediato o referente. ‘Esta medida’ se refere à extensão do horário de funcionamento, mas a frase anterior também menciona a ampliação da equipe de bibliotecários. O leitor para entre os dois candidatos. O que precisa ser corrigido não é o número de retomadas, mas o número de candidatos. Primeiro coloquei a extensão do horário no começo da frase e, na frase seguinte, retomei com ‘esta extensão’. Para a questão da equipe de bibliotecários, criei uma nova frase e voltei a explicitar com um substantivo concreto. Como já foi exposto acima, reduzir o tempo que o leitor leva para reconstruir o sentido vem antes de evitar a repetição do mesmo substantivo. O parágrafo revisado passou de três para cinco frases, mas o tempo de leitura, na verdade, encurtou.",
    "Exemplo original de oito frases. Observe a contagem de candidatos, a retomada explícita e a justificativa final. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l27 — progressão e escolha de conectivos. */
export const C1_L27 = defineC1Lesson({
  id: "c1-l27", number: 27, moduleId: "c1-m06", title: "Progressão e conectivos",
  objective: "Escolher conectivos que expressem a relação real entre ideias, não apenas variedade.",
  prerequisites: ["c1-l26"], estimatedMinutes: 80, dialogueTitle: "O conectivo errado",
  intro: [
    {
      title: "O conectivo declara uma relação",
      body: "Trocar um conectivo não muda apenas o ritmo: muda o que o leitor entende que uma frase faz com a outra. Por isso, antes de escolher entre ‘portanto’, ‘além disso’ e ‘no entanto’, nomeie a relação em voz alta. Se a segunda frase apenas acrescenta um argumento na mesma direção, um conectivo de contraste transforma o texto em contradição. Variedade sem relação é ruído. A revisão começa pela pergunta “o que esta frase faz com a anterior?” e só depois chega à palavra que vai marcar isso.",
      ko: "접속어는 문장을 예쁘게 꾸미는 장식이 아니라, 두 생각 사이의 관계를 독자에게 알려 주는 표지다.",
    },
    {
      title: "Discurso: progressão é uma promessa cumprida",
      body: "Cada conectivo cria uma expectativa. ‘No entanto’ promete oposição; ‘além disso’ promete acréscimo; ‘por isso’ promete consequência. Se a frase seguinte não cumpre a promessa, o leitor sente que o texto travou, mesmo sem saber apontar a frase exata. Em um parágrafo bem editado, os conectivos formam uma sequência de promessas cumpridas, e cada uma delas faz o argumento avançar. Quando duas frases não têm relação clara, o problema pode não ser o conectivo, mas a ordem das ideias.",
      ko: "‘그러나’로 시작한 문장이 대립을 담지 않으면, 독자는 다음 문장에서 무엇을 기대해야 할지 모른다.",
    },
  ],
  dialogue: [
    ["수진", "태호 씨, 둘째 문장의 ‘따라서’를 잠깐 보세요. 앞 문장이 원인인가요?", "Taeho, dê uma olhada no ‘portanto’ da segunda frase. A frase anterior é uma causa?"],
    ["태호", "참여자가 늘었으니까 예산도 늘어야 한다는 뜻으로 썼어요.", "Escrevi no sentido de que, como os participantes aumentaram, o orçamento também deveria aumentar."],
    ["수진", "그건 원인이 아니라 요구예요. ‘따라서’는 확인된 원인과 결과를 이을 때 써요.", "Isso não é uma causa, é uma exigência. ‘Portanto’ se usa para ligar uma causa confirmada ao seu resultado."],
    ["태호", "그러면 ‘게다가’로 바꾸면 두 근거가 같은 방향이라는 게 드러나겠네요.", "Então, se eu trocar por ‘além disso’, fica claro que as duas evidências apontam na mesma direção."],
    ["수진", "맞아요. 접속어를 바꾸면 독자가 기대하는 관계도 바뀌어요.", "Exato. Trocar o conectivo também muda a relação que o leitor espera."],
    ["태호", "셋째 문단의 ‘그러나’도 대립이 아니라 보충이었는데, 그것도 같이 고칠게요.", "O ‘no entanto’ do terceiro parágrafo também era acréscimo, não oposição; vou corrigir isso junto."],
    ["수진", "좋아요. 다만 접속어를 붙이기 전에 두 사건의 시간 순서를 먼저 확인하세요.", "Bom. Mas, antes de inserir o conectivo, confirme primeiro a ordem temporal dos dois acontecimentos."],
    ["태호", "확인되지 않은 인과는 ‘관련이 있다’로 낮추고, 각주에 판단 근거를 남기겠습니다.", "Vou rebaixar a causalidade não confirmada para ‘há relação’ e deixar a base do julgamento numa nota de rodapé."],
  ],
  readingText: {
    titlePt: "Três conectivos, três relações trocadas",
    paragraphs: [
      "공동 텃밭 사업의 중간 보고서는 문단마다 다른 문제를 안고 있었다. 첫 문단은 참여자 수가 늘었다는 사실을 제시한 뒤, 곧바로 ‘따라서’라는 접속어로 예산 삭감을 주장했다. 참여자 증가는 예산 삭감의 근거가 될 수 없다. 접속어가 실제 관계와 어긋나면 독자는 논리의 끊김을 느낀다. 독자는 예산 삭감의 이유를 끝까지 찾지 못한다. 편집자는 이 문장을 ‘그럼에도 불구하고’로 바꾸어, 참여자 증가와 예산 삭감이 서로 다른 방향의 사실임을 드러냈다.",
      "둘째 문단은 ‘그러나’로 시작했지만 앞 문단과 대립하는 내용이 없었다. 대립을 기대하게 해 놓고 같은 주장을 되풀이한 것이다. 참여자의 관점에서는 접근성 문제가 더 중요했지만, 보고서는 그 지점을 다루지 않았다. 편집자는 이 자리에 ‘게다가’를 넣어 참여자 증가와 수확량 증가가 같은 방향의 근거임을 표시했다. 접속어는 장식이 아니라 관계의 표시다.",
      "셋째 문단은 원인과 결과가 뒤섞여 있었다. ‘예산이 줄어서 참여자가 늘었다’는 문장은 인과의 방향이 반대였다. 실제로는 참여자가 늘어서 예산 요구가 커졌다. 편집팀은 접속부사를 붙이기 전에 두 사건의 시간 순서를 확인했고, 확인되지 않은 인과는 ‘관련이 있다’로 낮추었다. 접속어를 고치는 일은 문장을 꾸미는 일이 아니라 관계를 정확히 말하는 일이다.",
    ],
    pt: "O relatório intermediário do projeto da horta comunitária tinha um problema diferente em cada parágrafo. O primeiro apresentava o fato de o número de participantes ter aumentado e, logo em seguida, com o conectivo ‘portanto’, defendia um corte no orçamento. O aumento de participantes não pode ser fundamento para cortar o orçamento. Quando o conectivo não corresponde à relação real, o leitor sente uma quebra na lógica. A editora trocou essa frase por ‘ainda assim’, deixando claro que o aumento de participantes e o corte no orçamento são fatos que apontam em direções diferentes. O segundo parágrafo começava com ‘no entanto’, mas não havia conteúdo oposto ao parágrafo anterior. Criava-se a expectativa de oposição para, em seguida, repetir a mesma tese. Do ponto de vista dos participantes, a questão do acesso era mais importante, mas o relatório não tratava desse ponto. A editora colocou ali ‘além disso’, para indicar que o aumento de participantes e o aumento da colheita eram evidências na mesma direção. O conectivo não é enfeite: é a marca de uma relação. O terceiro parágrafo misturava causa e resultado. A frase ‘o orçamento diminuiu, por isso os participantes aumentaram’ invertia a direção da causalidade. Na realidade, os participantes aumentaram, e por isso a demanda por orçamento cresceu. A equipe de edição conferiu a ordem temporal dos dois acontecimentos antes de inserir o advérbio conjuntivo e rebaixou a causalidade não confirmada para ‘há relação’. Corrigir conectivos não é embelezar frases, mas dizer a relação com precisão.",
    objective: "Reconhecer a relação que cada conectivo promete e verificar se a frase seguinte a cumpre.",
  },
  reusedIds: ["ko:근거", "ko:관점", "ko:곧바로", "ko:편집"],
  grammar: [
    [
      "-ㄹ 뿐더러 — não só, mas também (acréscimo na mesma direção)",
      "동사/형용사 + -ㄹ 뿐더러",
      "Acrescenta um segundo fato que reforça o primeiro, muitas vezes com um grau a mais. É mais avaliativo que -뿐만 아니라 e típico da escrita argumentativa. Na edição, funciona como um teste: se você consegue usar -ㄹ 뿐더러, os dois fatos apontam para o mesmo lado; se o segundo contradiz o primeiro, o conectivo está errado. A segunda oração não pode ser ordem, convite ou promessa.",
      [
        ["참여자 수가 늘었을 뿐더러 수확량도 함께 증가했다.", "Não só o número de participantes aumentou, como a colheita também cresceu."],
        ["이 문단은 근거가 빈약할 뿐더러 접속어도 관계와 어긋난다.", "Este parágrafo não só tem evidências fracas, como também usa conectivos que não correspondem à relação."],
      ],
    ],
    [
      "-ㄴ/는 가운데 — em meio a; enquanto",
      "동사 + -는 가운데 / 형용사 + -(으)ㄴ 가운데",
      "Apresenta o pano de fundo ou a circunstância em que algo acontece, com tom formal e escrito. Diferente de -는 동안, que mede duração, e de -면서, que exige o mesmo sujeito nas duas ações; 가운데 pode ter sujeitos diferentes e destaca a coexistência de situações. Em relatórios, é útil para contrastar uma tendência geral com um fato específico que ocorre ao mesmo tempo.",
      [
        ["예산이 줄어드는 가운데 참여자는 오히려 늘었다.", "Em meio à redução do orçamento, os participantes, ao contrário, aumentaram."],
        ["논의가 길어지는 가운데 편집팀은 접속어의 기능을 다시 확인했다.", "Enquanto a discussão se prolongava, a equipe de edição voltou a verificar a função dos conectivos."],
      ],
    ],
  ],
  guided: [
    mcq("Por que o ‘따라서’ do primeiro parágrafo está errado?", ["Porque liga uma exigência a um fato que não é sua causa.", "Porque é um conectivo informal demais.", "Porque deveria aparecer no fim da frase."], "Porque liga uma exigência a um fato que não é sua causa.", "O aumento de participantes não causa o corte de orçamento; o conectivo promete uma relação que não existe."),
    cloze("Complete o acréscimo na mesma direção: 참여자 수가 늘었을 ___ 수확량도 함께 증가했다.", "뿐더러", "-ㄹ 뿐더러 soma um segundo fato que reforça o primeiro."),
    listen("Ouça e escreva o que acontece quando o conectivo não corresponde à relação real.", "접속어가 실제 관계와 어긋나면 독자는 논리의 끊김을 느낀다.", "접속어가 실제 관계와 어긋나면 독자는 논리의 끊김을 느낀다.", "Quando o conectivo não corresponde à relação real, o leitor sente uma quebra na lógica."),
    reading("둘째 문단은 ‘그러나’로 시작했지만 앞 문단과 대립하는 내용이 없었다. 대립을 기대하게 해 놓고 같은 주장을 되풀이한 것이다.", "O que havia de errado no segundo parágrafo?", ["O conectivo prometia oposição, mas o conteúdo repetia a mesma tese.", "O parágrafo era curto demais.", "O conectivo ‘그러나’ não existe em coreano formal."], "O conectivo prometia oposição, mas o conteúdo repetia a mesma tese.", "O texto cria a expectativa de oposição e não a cumpre."),
    translate("pt-ko", "Traduza: “Este parágrafo não só tem evidências fracas, como também usa conectivos que não correspondem à relação.”", "이 문단은 근거가 빈약할 뿐더러 접속어도 관계와 어긋난다.", "-ㄹ 뿐더러 acrescenta a segunda falha na mesma direção.", ["이 문단은 근거가 빈약할 뿐만 아니라 접속어도 관계와 어긋난다."]),
  ],
  independent: [
    mcq("Qual frase usa -는 가운데 corretamente?", ["예산이 줄어드는 가운데 참여자는 오히려 늘었다.", "예산이 줄어들었는 가운데 참여자는 오히려 늘었다.", "예산이 줄어들 가운데 참여자는 오히려 늘었다."], "예산이 줄어드는 가운데 참여자는 오히려 늘었다.", "Com verbo, a forma é -는 가운데: 줄어드는 가운데."),
    cloze("Complete o pano de fundo: 예산이 ___ 가운데 참여자는 오히려 늘었다.", "줄어드는", "A forma é 줄어드는 가운데, para indicar a circunstância simultânea."),
    listen("Ouça e escreva a ordem que a editora recomenda antes de inserir um conectivo.", "접속어를 붙이기 전에 두 사건의 시간 순서를 먼저 확인해야 한다.", "접속어를 붙이기 전에 두 사건의 시간 순서를 먼저 확인해야 한다.", "Antes de inserir o conectivo, é preciso confirmar primeiro a ordem temporal dos dois acontecimentos."),
    translate("ko-pt", "Traduza: 접속어를 고치는 일은 문장을 꾸미는 일이 아니라 관계를 정확히 말하는 일이다.", "Corrigir conectivos não é embelezar frases, mas dizer a relação com precisão.", "꾸미다 = enfeitar; 관계를 정확히 말하다 = dizer a relação com precisão.", ["Editar conectivos não é ornamentar o texto, e sim nomear com exatidão a relação entre as ideias."]),
    reading("셋째 문단은 원인과 결과가 뒤섞여 있었다. ‘예산이 줄어서 참여자가 늘었다’는 문장은 인과의 방향이 반대였다. 실제로는 참여자가 늘어서 예산 요구가 커졌다.", "Qual era o erro de causalidade no terceiro parágrafo?", ["A causa e o efeito estavam invertidos.", "Não havia nenhum dado sobre orçamento.", "O parágrafo não usava conectivos."], "A causa e o efeito estavam invertidos.", "O texto afirma que a direção da causalidade estava invertida: os participantes aumentaram e, com isso, a demanda por orçamento cresceu."),
  ],
  summary: [
    "O conectivo não decora: declara a relação entre duas ideias e cria uma expectativa no leitor.",
    "-ㄹ 뿐더러 acrescenta um fato na mesma direção e serve como teste de coerência argumentativa.",
    "-ㄴ/는 가운데 apresenta o pano de fundo de um acontecimento em registro formal.",
    "Se a relação não existe, nenhum conectivo a cria; reordene as ideias antes de escolher a palavra.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · reescrever um parágrafo mal conectado",
    "Escolha um parágrafo em que os conectivos não correspondam à relação entre as ideias. Reescreva-o com três conectivos adequados, explicando em uma frase por que cada troca era necessária. Se a relação não existir, reorganize as frases.",
    "접속어가 실제 관계와 어긋난 문단을 다시 써 보세요.",
    ["Nomeie a relação de cada par de frases antes de escolher o conectivo.", "Use -ㄹ 뿐더러 uma vez para somar um fato na mesma direção.", "Use -ㄴ/는 가운데 uma vez para apresentar um pano de fundo.", "Termine justificando as trocas e o que mudou na ordem das ideias."],
    ["Três conectivos adequados à relação real.", "Uma frase justificando cada troca.", "Uso correto de -ㄹ 뿐더러 e -ㄴ/는 가운데.", "Ordem das ideias coerente com a progressão.", "Parágrafo final sem contradição interna."],
    "중간 보고서의 첫 문단은 참여자 증가를 근거로 예산 삭감을 주장했다. 그러나 두 사실은 서로 다른 방향을 가리킨다. 참여자가 늘었을 뿐더러 수확량도 늘었지만, 예산은 오히려 줄어야 한다는 주장은 성립하지 않는다. 예산이 줄어드는 가운데 참여자가 늘었다는 사실은, 오히려 지원이 더 필요하다는 근거가 된다. 따라서 이 문단은 삭감이 아니라 추가 배정을 요구해야 한다. 편집자는 ‘따라서’를 ‘그럼에도 불구하고’로 바꾸어 두 사실의 방향 차이를 드러냈다. 접속어를 고치기 전에 두 사건의 시간 순서와 인과의 방향을 먼저 확인했다. 접속어는 문장을 꾸미는 장식이 아니라 관계를 정확히 말하는 표지다.",
    "O primeiro parágrafo do relatório intermediário defendia um corte no orçamento com base no aumento de participantes. No entanto, os dois fatos apontam em direções diferentes. Não só o número de participantes aumentou, como a colheita também cresceu; a tese de que o orçamento deveria, ao contrário, diminuir não se sustenta. O fato de os participantes terem aumentado em meio à redução do orçamento é, na verdade, fundamento para que se precise de mais apoio. Portanto, esse parágrafo deveria pedir aumento, não corte. A editora trocou ‘portanto’ por ‘ainda assim’, revelando a diferença de direção entre os dois fatos. Antes de corrigir o conectivo, conferimos a ordem temporal dos acontecimentos e a direção da causalidade. O conectivo não é enfeite para embelezar frases, mas a marca que diz a relação com precisão.",
    "Exemplo original de oito frases. Observe que cada conectivo corresponde a uma relação nomeada antes da escolha. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l28 — clareza, concisão e nominalização. */
export const C1_L28 = defineC1Lesson({
  id: "c1-l28", number: 28, moduleId: "c1-m06", title: "Clareza e concisão",
  objective: "Reduzir redundância e nominalização excessiva sem perder precisão.",
  prerequisites: ["c1-l27"], estimatedMinutes: 80, dialogueTitle: "Metade das palavras, a mesma informação",
  intro: [
    {
      title: "Concisão não é apagar informação",
      body: "Um texto conciso diz o mesmo com menos obstáculos. A diferença entre concisão e corte é simples: a concisão remove o que não acrescenta, o corte remove o que o leitor precisa saber. Antes de encurtar uma frase, pergunte qual informação ela carrega e quem precisa dela. Condições, exceções e ressalvas costumam ser as primeiras vítimas de uma revisão apressada — e são justamente as partes que sustentam a credibilidade do texto. O objetivo é reduzir o esforço de leitura, não o conteúdo.",
      ko: "간결함의 기준은 단어 수가 아니라, 줄인 뒤에도 남아 있어야 할 정보의 정확성이다.",
    },
    {
      title: "Discurso: nominalização e legibilidade",
      body: "Transformar verbos em substantivos parece tornar o texto mais institucional, mas costuma esconder quem faz o quê. ‘Realizou-se a análise dos dados’ informa menos que ‘a equipe analisou os dados’. A nominalização tem seu lugar em títulos, atas e leis, onde o agente é irrelevante ou genérico. Fora disso, ela empilha substantivos e obriga o leitor a reconstruir a ação. Uma revisão de clareza começa devolvendo os verbos e só depois corta o que sobra. Nominalizar não é errado; nominalizar sem necessidade é o problema.",
      ko: "명사형이 많은 문장은 정중해 보이지만, 누가 무엇을 했는지가 사라지면 독자는 절차를 확인할 수 없다.",
    },
  ],
  dialogue: [
    ["혜림", "도현 씨, 이 문단은 배경 설명이 세 문장 이어지고 나서야 문제가 나와요.", "Dohyeon, neste parágrafo a explicação de contexto continua por três frases e só depois aparece o problema."],
    ["도현", "정중하게 쓰려고 배경을 먼저 둔 건데, 너무 길었나요?", "Coloquei o contexto primeiro para escrever com cortesia. Ficou longo demais?"],
    ["혜림", "길이 때문이 아니라 정보의 순서 때문이에요. 문제와 원인을 먼저 쓰면 독자가 덜 헤매요.", "Não é pelo comprimento, mas pela ordem da informação. Se o problema e a causa vêm primeiro, o leitor se perde menos."],
    ["도현", "‘예산이 부족해 3월 계획을 연기했다’처럼 바로 시작해도 괜찮을까요?", "Tudo bem começar direto com algo como ‘o orçamento foi insuficiente, por isso o plano de março foi adiado’?"],
    ["혜림", "좋아요. 그 문장은 원인과 결과가 한 번에 보여요. 대신 조건이 붙은 문장은 줄이지 마세요.", "Bom. Essa frase mostra causa e resultado de uma vez. Em troca, não encurte as frases com condições."],
    ["도현", "예산 근거를 밝힌 문장도 지워야 하나요?", "Também devo apagar a frase que explicita a base orçamentária?"],
    ["혜림", "아니요. 그 문장은 각주로 옮기세요. 삭제가 아니라 위치를 바꾸는 거예요.", "Não. Mova essa frase para uma nota de rodapé. Não é exclusão, é mudança de posição."],
    ["도현", "그러면 분량은 줄고 근거는 남겠네요. 수정한 뒤에 심의 시간이 어떻게 달라지는지도 보겠습니다.", "Então a extensão diminui e a evidência permanece. Depois de revisar, vou ver também como muda o tempo de deliberação."],
  ],
  readingText: {
    titlePt: "O que sobra quando o texto encolhe",
    paragraphs: [
      "다음 보고서는 문제를 설명하기 전에 배경을 세 문장이나 늘어놓는다. 문장을 줄이는 일과 정보를 줄이는 일은 다르다. ‘본 사업의 추진 배경과 관련하여 여러 가지 여건을 종합적으로 고려한 결과’라는 표현은 ‘예산이 부족해 계획을 연기했다’로 줄일 수 있다. 이런 문장이 반복되면 독자는 핵심을 찾기 전에 지친다. 장황함은 정중함이 아니며, 정보의 양과도 비례하지 않는다. 오히려 배경이 길어질수록 책임 소재는 흐려진다.",
      "수정된 문단은 원인과 결과를 먼저 제시한다. 분석 결과는 그다음 문장에 붙고, 배경은 마지막에 남는다. 명사형을 줄이고 동사를 살리면 행위자가 드러난다. 다만 모든 문장을 짧게 만들 필요는 없다. 조건과 예외를 담은 문장은 길어도 남겨야 한다. 간결함의 기준은 단어 수가 아니라 남은 정보의 정확성이다. 이 원칙을 적용하면 문장은 줄어들지만, 판단에 필요한 근거는 오히려 선명해진다.",
      "지운 문장 가운데 예산 근거를 밝힌 문장이 하나 있었다. 편집자는 그 문장을 각주로 옮겼다. 축약은 정보를 버리는 일이 아니라 위치를 바꾸는 일인 경우가 많다. 군더더기를 덜어 낸 자리에 필요한 근거가 들어가야 한다. 이 차이를 구분하지 않으면 수정은 삭제가 된다. 수정 뒤 보고서는 분량이 삼분의 일 줄었지만, 심의에 걸린 시간은 오히려 짧아졌다.",
    ],
    pt: "O relatório a seguir enfileira três frases de contexto antes de explicar o problema. A expressão ‘em resultado da consideração abrangente de diversas condições relacionadas ao contexto de implementação deste projeto’ pode ser reduzida a ‘o orçamento foi insuficiente, por isso o plano foi adiado’. Quando frases assim se repetem, o leitor se cansa antes de encontrar o ponto central. Prolixidade não é cortesia e não é proporcional à quantidade de informação. Ao contrário, quanto mais longo o contexto, mais turva fica a responsabilidade. O parágrafo revisado apresenta primeiro a causa e o resultado. O resultado da análise entra na frase seguinte, e o contexto fica para o fim. Reduzir as nominalizações e recuperar os verbos faz aparecer o agente. Não é preciso, porém, encurtar todas as frases. As frases que trazem condições e exceções devem permanecer, mesmo longas. O critério da concisão não é o número de palavras, mas a exatidão da informação que resta. Aplicando esse princípio, as frases encolhem, mas as evidências necessárias ao julgamento ficam, na verdade, mais nítidas. Entre as frases apagadas havia uma que explicitava a base orçamentária. A editora a transferiu para uma nota de rodapé. A condensação muitas vezes não é descartar informação, mas mudar sua posição. No lugar de onde se retirou o excesso verbal deve entrar a evidência necessária. Depois da revisão, o relatório ficou um terço menor, mas o tempo de deliberação, ao contrário, encurtou.",
    objective: "Distinguir concisão de corte e reconhecer quando a nominalização esconde o agente.",
  },
  reusedIds: ["ko:분석", "ko:결과", "ko:경우", "ko:예외"],
  grammar: [
    [
      "-ㄴ/는 식이다 — é do tipo; funciona assim",
      "동사 + -는 식이다 / 형용사 + -(으)ㄴ 식이다 / 명사 + 인 식이다",
      "Descreve um modo de fazer ou de ser, muitas vezes com leve distância crítica: “é o tipo de coisa que...”. Em edição, serve para nomear um padrão recorrente antes de corrigi-lo, como ‘설명을 먼저 길게 늘어놓는 식이다’. Não use para um evento único e concreto nem como equivalente neutro de -는 방법이다, que descreve um método. O tom costuma ser avaliativo.",
      [
        ["이 보고서는 배경을 먼저 길게 설명하는 식이다.", "Este relatório é do tipo que explica o contexto primeiro, de forma longa."],
        ["수정은 문장을 지우는 식이 아니라 정보의 위치를 바꾸는 식이어야 한다.", "A revisão deve ser do tipo que muda a posição da informação, não do tipo que apaga frases."],
      ],
    ],
    [
      "-ㄹ 필요가 있다 — é preciso; há necessidade de",
      "동사 + -ㄹ 필요가 있다",
      "Recomenda uma providência com tom impessoal, típico de relatórios e pareceres. É mais brando que -아/어야 한다 e não serve para leis ou obrigações externas. Na revisão, ajuda a justificar por que certa informação deve permanecer: ‘남길 필요가 있다’. Compare com -는 것이 좋다, que soa como sugestão amigável; -ㄹ 필요가 있다 apresenta a medida como exigência técnica do texto.",
      [
        ["조건을 담은 문장은 길어도 남길 필요가 있다.", "As frases que trazem condições precisam ser mantidas, mesmo que sejam longas."],
        ["지운 정보가 무엇인지 확인할 필요가 있다.", "É preciso verificar que informação foi apagada."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é o critério de concisão defendido no texto?", ["A exatidão da informação que permanece.", "O número de palavras por frase.", "A quantidade de notas de rodapé."], "A exatidão da informação que permanece.", "O texto repete que o critério não é o número de palavras, mas a informação preservada."),
    cloze("Complete o critério: 간결함의 기준은 단어 수가 아니라 남은 정보의 ___.", "정확성", "정확성 retoma a ideia de que a concisão preserva a exatidão do conteúdo."),
    listen("Ouça e escreva o critério de concisão que a editora defende.", "간결함의 기준은 단어 수가 아니라 남은 정보의 정확성이다.", "간결함의 기준은 단어 수가 아니라 남은 정보의 정확성이다.", "O critério da concisão não é o número de palavras, mas a exatidão da informação que resta."),
    reading("지운 문장 가운데 예산 근거를 밝힌 문장이 하나 있었다. 편집자는 그 문장을 각주로 옮겼다. 축약은 정보를 버리는 일이 아니라 위치를 바꾸는 일인 경우가 많다.", "O que a editora fez com a frase que explicitava a base orçamentária?", ["Transferiu-a para uma nota de rodapé.", "Apagou-a definitivamente.", "Fundiu-a com o título."], "Transferiu-a para uma nota de rodapé.", "O texto diz que ela foi movida para uma nota, não eliminada."),
    translate("pt-ko", "Traduza: “As frases que trazem condições precisam ser mantidas, mesmo que sejam longas.”", "조건을 담은 문장은 길어도 남길 필요가 있다.", "-ㄹ 필요가 있다 apresenta a medida como exigência técnica, não como ordem pessoal.", ["조건이 들어 있는 문장은 길더라도 남길 필요가 있습니다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 식이다 de forma adequada?", ["이 보고서는 배경을 먼저 길게 설명하는 식이다.", "이 보고서는 배경을 먼저 길게 설명할 식이다.", "이 보고서는 배경을 먼저 길게 설명한 식이다."], "이 보고서는 배경을 먼저 길게 설명하는 식이다.", "Com verbo, a forma é -는 식이다: 설명하는 식이다."),
    cloze("Complete a recomendação impessoal: 조건을 담은 문장은 길어도 남길 ___가 있다.", "필요", "A forma fixa é -ㄹ 필요가 있다, para recomendar uma providência."),
    listen("Ouça e escreva o que a nominalização excessiva esconde.", "명사형이 많은 문장은 누가 무엇을 했는지 감춘다.", "명사형이 많은 문장은 누가 무엇을 했는지 감춘다.", "Frases com muitas nominalizações escondem quem fez o quê."),
    translate("ko-pt", "Traduza: 수정은 문장을 지우는 식이 아니라 정보의 위치를 바꾸는 식이어야 한다.", "A revisão deve ser do tipo que muda a posição da informação, não do tipo que apaga frases.", "식이다 descreve o modo; a oposição está entre 지우다 e 위치를 바꾸다.", ["Revisar não é apagar frases, mas reposicionar a informação."]),
    reading("수정된 문단은 원인과 결과를 먼저 제시한다. 분석 결과는 그다음 문장에 붙고, 배경은 마지막에 남는다. 명사형을 줄이고 동사를 살리면 행위자가 드러난다. 다만 모든 문장을 짧게 만들 필요는 없다.", "Por que o texto não recomenda encurtar todas as frases?", ["Porque condições e exceções precisam permanecer, mesmo longas.", "Porque frases longas são sempre mais formais.", "Porque o leitor prefere textos extensos."], "Porque condições e exceções precisam permanecer, mesmo longas.", "O texto ressalva que frases com condições e exceções devem ser mantidas."),
  ],
  summary: [
    "Concisão remove obstáculos, não informação: condições e ressalvas permanecem.",
    "-ㄴ/는 식이다 nomeia um padrão de escrita, muitas vezes com distância crítica.",
    "-ㄹ 필요가 있다 recomenda uma providência em tom impessoal e técnico.",
    "Nominalização sem necessidade esconde o agente e obriga o leitor a reconstruir a ação.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · encurtar sem perder",
    "Reescreva um parágrafo burocrático reduzindo-o a cerca de metade das palavras. Preserve condições, exceções e a base das afirmações; o que não puder ser cortado pode mudar de posição. Ao final, justifique o que foi removido e o que foi preservado.",
    "관료적인 문단을 절반 정도로 줄이되 필요한 정보는 남겨 보세요.",
    ["Marque primeiro a informação que não pode desaparecer.", "Use -ㄴ/는 식이다 uma vez para nomear o padrão que você está corrigindo.", "Use -ㄹ 필요가 있다 uma vez para justificar a permanência de um dado.", "Termine dizendo o que foi movido de lugar, e não apenas apagado."],
    ["Extensão reduzida de forma clara.", "Condições, exceções e base das afirmações preservadas.", "Uso correto de -ㄴ/는 식이다 e -ㄹ 필요가 있다.", "Justificativa para o que saiu e para o que ficou.", "Versão final mais legível que a original."],
    "이 보고서는 배경을 먼저 길게 설명하는 식이다. 그러나 심의에 필요한 것은 배경의 길이가 아니라 결정의 근거다. 먼저 예산 부족으로 3월 계획을 연기했다는 사실을 쓴다. 이어서 분석 결과를 제시하고, 배경은 마지막 문단으로 옮긴다. 예산 근거를 밝힌 문장은 지우지 않고 각주로 보낼 필요가 있다. 조건이 붙은 문장도 길어도 남겨야 한다. 축약은 정보를 버리는 일이 아니라 위치를 바꾸는 일인 경우가 많다. 수정 뒤 분량은 삼분의 일 줄었지만, 심의에 걸린 시간은 오히려 짧아졌다.",
    "Este relatório é do tipo que explica o contexto primeiro, de forma longa. Mas o que a deliberação precisa não é do comprimento do contexto, e sim da base da decisão. Primeiro, registra-se o fato de o plano de março ter sido adiado por falta de orçamento. Em seguida, apresenta-se o resultado da análise, e o contexto vai para o último parágrafo. A frase que explicita a base orçamentária não deve ser apagada: precisa ser levada para uma nota de rodapé. As frases com condições também devem permanecer, mesmo longas. A condensação muitas vezes não é descartar informação, mas mudar sua posição. Depois da revisão, a extensão caiu um terço, mas o tempo de deliberação, ao contrário, encurtou.",
    "Exemplo original de oito frases. O corte reduz a extensão e preserva a base da decisão; a justificativa nomeia o que mudou de lugar. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l29 — revisão de registro e destinatário institucional. */
export const C1_L29 = defineC1Lesson({
  id: "c1-l29", number: 29, moduleId: "c1-m06", title: "Revisar o registro",
  objective: "Detectar misturas de registro e adequar o texto a seu destinatário institucional.",
  prerequisites: ["c1-l28"], estimatedMinutes: 80, dialogueTitle: "A mesma informação, outro destinatário",
  intro: [
    {
      title: "Registro é uma promessa de relação",
      body: "O registro diz ao leitor quem ele é para o autor e qual é o grau de distância entre os dois. Um relatório institucional não fica mais humano por incluir ‘저희가 좀 해 봤는데요’; fica apenas menos verificável. A revisão de registro não elimina a voz do autor: ela escolhe onde a voz pode aparecer. Citações de entrevistados, por exemplo, preservam a oralidade e dão concretude ao texto. O que se ajusta é a moldura: quem relata, em nome de qual instituição e com que responsabilidade.",
      ko: "한 문서 안에서 어법이 갑자기 달라지면 독자는 필자가 바뀌었다고 느끼고, 절차의 신뢰도 의심하게 된다.",
    },
    {
      title: "Discurso: gênero, destinatário e coerência",
      body: "O mesmo conteúdo pode exigir três registros: uma mensagem a um colega, um e-mail a uma chefia e um relatório a um órgão público. O erro mais comum não é usar a forma informal, mas misturá-la com a formal no mesmo documento, sem que a mudança tenha função. Antes de trocar palavras, defina o gênero e o destinatário, e verifique se cada parte cumpre a mesma promessa de relação. Registro coerente não é registro rígido: é registro previsível para quem lê.",
      ko: "격식체는 거리를 만들지만, 잘못 쓰면 오히려 무례하게 들린다. 예의는 표현의 높낮이가 아니라 책임의 분명함에서 나온다.",
    },
  ],
  dialogue: [
    ["지원", "소미 씨, 이 문장 ‘저희가 좀 해 봤는데요’는 공식 보고서에 그대로 두기 어려울 것 같아요.", "Somi, acho difícil manter esta frase, ‘a gente tentou ali e tal’, num relatório oficial."],
    ["소미", "현장의 분위기를 살리려고 쓴 문장인데, 너무 딱딱해지면 안 될까요?", "Foi uma frase que escrevi para preservar o clima do campo. Não ficaria rígido demais?"],
    ["지원", "모두 바꾸자는 게 아니에요. 인터뷰 인용문은 그대로 두고, 보고 문장만 문어체로 고쳐요.", "Não estou dizendo para trocar tudo. Mantenha as citações das entrevistas e passe para o registro escrito apenas as frases de relato."],
    ["소미", "그러면 ‘담당자가 3월 4일부터 8일까지 참여자 24명을 면담하였으며’로 시작하면 되겠네요.", "Então basta começar com ‘a responsável entrevistou 24 participantes de 4 a 8 de março’."],
    ["지원", "네. 행위자와 기간이 드러나면 독자가 절차를 확인할 수 있어요.", "Sim. Se o agente e o período ficam claros, o leitor consegue verificar o procedimento."],
    ["소미", "말미의 ‘예산 집행 내역을 보고함’도 명사형인데, 그대로 두면 될까요?", "O ‘reporto a execução orçamentária’ no final também está em forma nominal. Posso deixar como está?"],
    ["지원", "그건 문서 제목으로는 괜찮아요. 다만 본문에서는 누가 보고했는지 밝혀야 해요.", "Isso está bem como título de documento. Só que, no corpo do texto, é preciso dizer quem relatou."],
    ["소미", "원장님께서 초안을 직접 검토하셨습니다. 그 지적을 반영해서 담당자 이름을 넣겠습니다.", "O diretor revisou o rascunho pessoalmente. Vou incorporar essa observação e incluir o nome do responsável."],
  ],
  readingText: {
    titlePt: "Quando o relatório muda de voz",
    paragraphs: [
      "복지관의 사업 보고서에는 ‘저희가 좀 해 봤는데요, 반응이 괜찮았어요’라는 문장이 그대로 남아 있었다. 담당자는 현장의 목소리를 살리려고 했다고 설명했다. 그러나 공식 문서에서 구어체는 친근함이 아니라 절차의 불분명으로 읽힐 수 있다. 누가, 언제, 무엇을 확인했는지가 문장에서 사라지기 때문이다. 구어체 자체가 문제는 아니지만, 보고의 책임을 지는 자리에서는 다른 표지가 필요하다.",
      "수정된 문장은 ‘담당자가 3월 4일부터 8일까지 참여자 24명을 면담하였으며, 만족도는 4.2점으로 확인되었다’로 바뀌었다. 문어체로 고치면서 행위자와 기간이 드러났고, 감정적 평가는 수치로 대체되었다. 다만 모든 구어체를 없애면 글의 온도가 사라진다. 인터뷰 인용문은 그대로 두고, 행정적 보고에만 격식체를 적용했다. 이 판단은 문장의 높낮이를 맞추는 일이 아니라, 독자가 확인해야 할 정보를 정하는 일이다.",
      "보고서 말미에는 ‘예산 집행 내역을 보고함’이라고 적혀 있다. 명사형으로 끝나는 이 문장은 간결하지만, 누가 보고했는지는 밝히지 않는다. 원장님께서는 초안을 직접 검토하셨고, 담당자 이름을 각 항목에 넣도록 요청하셨다. 관련 자료는 별첨으로 정리했다. 어법을 바꾸는 일은 예의를 갖추는 일이면서 동시에 책임 소재를 분명히 하는 일이다.",
    ],
    pt: "No relatório de atividades do centro comunitário, tinha ficado intacta a frase ‘a gente tentou ali, e a reação foi boa’. A responsável explicou que quis preservar a voz do campo. Em um documento oficial, porém, o registro oral pode ser lido não como proximidade, mas como procedimento pouco claro. Isso porque desaparece da frase quem verificou o quê e quando. O registro oral não é um problema em si, mas, no lugar em que se assume a responsabilidade pelo relato, são necessárias outras marcas. A frase revisada passou a ser ‘a responsável entrevistou 24 participantes de 4 a 8 de março, e a satisfação foi confirmada em 4,2 pontos’. Ao passar para o registro escrito, o agente e o período ficaram visíveis, e a avaliação emocional foi substituída por um número. No entanto, eliminar todo o registro oral faz o texto perder temperatura. As citações das entrevistas foram mantidas, e o registro formal foi aplicado apenas ao relato administrativo. Esse julgamento não é ajustar o nível das frases, mas decidir que informação o leitor precisa poder verificar. No fim do relatório, está escrito ‘reporto a execução orçamentária’. Essa frase, terminada em forma nominal, é concisa, mas não revela quem relatou. O diretor revisou o rascunho pessoalmente e pediu que o nome do responsável fosse incluído em cada item. Os materiais relacionados foram organizados em anexo. Mudar o uso linguístico é, ao mesmo tempo, manter a cortesia e tornar clara a responsabilidade.",
    objective: "Comparar as escolhas de registro nas duas versões e identificar o que cada uma torna verificável.",
  },
  reusedIds: ["ko:판단", "ko:자료", "ko:반응", "ko:해지"],
  grammar: [
    [
      "-시- — honorífico de sujeito",
      "동사/형용사 어간 + -시- (어미 앞); -었- → -셨-",
      "Eleva o sujeito da frase, não o interlocutor nem o objeto. Por isso, aparece com 께서 e nunca com o próprio falante como sujeito. Em relatórios, é usado quando o sujeito é uma pessoa a quem se deve respeito institucional. Compare com -님, que marca o substantivo, e com o registro formal -(으)ㅂ니다, que ajusta a relação com o ouvinte. Honorificar o sujeito errado soa tão deslocado quanto não honorificar o sujeito devido.",
      [
        ["원장님께서 초안을 직접 검토하셨다.", "O diretor revisou o rascunho pessoalmente."],
        ["과장님께서 관련 자료를 정리하셨습니다.", "O chefe de seção organizou os materiais relacionados."],
      ],
    ],
    [
      "-ㅁ/음 — nominalização formal",
      "동사/형용사 + -ㅁ/음 (sem batchim ou com ㄹ: -ㅁ; com outros batchins: -음)",
      "Transforma uma oração em substantivo e é típico de títulos de seção, atas e comunicados oficiais: 보고함, 확인하였음. É mais compacto e impessoal que -기 e não aparece em conversa casual. Em um documento, a forma nominal pode encerrar um item sem repetir ‘eu relato que...’. O risco é apagar o agente: use-a onde a impessoalidade é adequada e nomeie o responsável no corpo do texto.",
      [
        ["예산 집행 내역을 보고함.", "Reporto a execução orçamentária."],
        ["회의 결과를 첨부함.", "Anexo o resultado da reunião."],
      ],
    ],
  ],
  guided: [
    mcq("Por que o registro oral é problemático no corpo de um relatório oficial?", ["Porque pode apagar quem verificou o quê e quando.", "Porque é gramaticalmente incorreto.", "Porque todo texto oficial deve ser curto."], "Porque pode apagar quem verificou o quê e quando.", "O texto diz que a oralidade, nesse lugar, faz desaparecer agente, data e procedimento."),
    cloze("Complete a forma nominal do fim do relatório: 예산 집행 내역을 ___.", "보고함", "A forma -ㅁ encerra o item em registro institucional compacto."),
    listen("Ouça e escreva o que se perde quando o agente desaparece do relato.", "명사형으로 끝나는 문장은 간결하지만 누가 보고했는지 밝히지 않는다.", "명사형으로 끝나는 문장은 간결하지만 누가 보고했는지 밝히지 않는다.", "A frase terminada em forma nominal é concisa, mas não revela quem relatou."),
    reading("수정된 문장은 ‘담당자가 3월 4일부터 8일까지 참여자 24명을 면담하였으며, 만족도는 4.2점으로 확인되었다’로 바뀌었다. 문어체로 고치면서 행위자와 기간이 드러났고, 감정적 평가는 수치로 대체되었다.", "O que a versão revisada tornou visível?", ["O agente e o período da entrevista.", "O nome de todos os participantes.", "O custo total do programa."], "O agente e o período da entrevista.", "A frase revisada explicita quem fez a entrevista e quando."),
    translate("pt-ko", "Traduza: “O diretor revisou o rascunho pessoalmente.”", "원장님께서 초안을 직접 검토하셨다.", "-시- eleva o sujeito 원장님; o verbo fica 검토하셨다.", ["원장님께서 초안을 직접 검토하셨습니다."]),
  ],
  independent: [
    mcq("Qual frase usa o honorífico de sujeito corretamente?", ["원장님께서 초안을 검토하셨다.", "원장님께서 초안을 검토하시었다.", "제가 초안을 검토하셨다."], "원장님께서 초안을 검토하셨다.", "O honorífico -시- eleva o sujeito 원장님; o falante não pode ser sujeito honorificado de si mesmo."),
    cloze("Complete o relato institucional: 원장님께서는 초안을 직접 ___.", "검토하셨습니다", "검토하셨습니다 combina o honorífico -시- com o registro formal -ㅂ니다."),
    listen("Ouça e escreva o que se deve preservar ao revisar o registro de um relatório.", "인터뷰 인용문은 그대로 두고 행정적 보고에만 격식체를 적용한다.", "인터뷰 인용문은 그대로 두고 행정적 보고에만 격식체를 적용한다.", "As citações das entrevistas são mantidas, e o registro formal se aplica apenas ao relato administrativo."),
    translate("ko-pt", "Traduza: 어법을 바꾸는 일은 예의를 갖추는 일이면서 동시에 책임 소재를 분명히 하는 일이다.", "Mudar o uso linguístico é, ao mesmo tempo, manter a cortesia e tornar clara a responsabilidade.", "예의를 갖추다 = manter a cortesia; 책임 소재 = a quem cabe a responsabilidade.", ["Ajustar o registro é uma forma de cortesia e, ao mesmo tempo, de deixar claro quem responde pelo quê."]),
    reading("보고서 말미에는 ‘예산 집행 내역을 보고함’이라고 적혀 있다. 명사형으로 끝나는 이 문장은 간결하지만, 누가 보고했는지는 밝히지 않는다. 원장님께서는 담당자 이름을 각 항목에 넣도록 요청하셨다.", "Por que o diretor pediu que o nome do responsável fosse incluído?", ["Porque a forma nominal não indicava quem havia relatado.", "Porque queria encurtar ainda mais o relatório.", "Porque o relatório tinha erros de ortografia."], "Porque a forma nominal não indicava quem havia relatado.", "O texto aponta que a forma nominal é concisa, mas omite o agente; o pedido corrige essa omissão."),
  ],
  summary: [
    "Registro é uma promessa de relação entre autor, texto e destinatário.",
    "-시- eleva o sujeito da frase; não se usa com o próprio falante como sujeito.",
    "-ㅁ/음 encerra itens em registro institucional, mas pode apagar o agente.",
    "Revisar registro é escolher onde a voz do autor aparece e onde o procedimento precisa falar.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · do oral ao institucional",
    "Reescreva um trecho oral de relato (uma mensagem ou anotação de reunião) em registro institucional para um destinatário de maior autoridade. Preserve as citações que dão concretude ao relato, nomeie o responsável pelas ações e mantenha a cortesia sem inflar o texto.",
    "구어체로 적힌 보고를 기관 문서의 문어체로 고쳐 보세요.",
    ["Defina o destinatário e o gênero antes de trocar palavras.", "Use -시- uma vez com um sujeito que exige respeito institucional.", "Use -ㅁ/음 uma vez para encerrar um item de forma oficial.", "Mantenha ao menos uma citação em registro oral."],
    ["Registro uniforme do início ao fim.", "Agente e procedimento verificáveis.", "Uso correto de -시- e -ㅁ/음.", "Uma citação preservada com função clara.", "Cortesia sem prolixidade."],
    "지난 3월 4일부터 8일까지 담당자가 참여자 24명을 면담하였으며, 만족도는 4.2점으로 확인되었다. 참여자 한 명은 ‘직원들이 먼저 말을 걸어 줘서 편했어요’라고 말했다. 이 인용문은 현장의 분위기를 보여 주므로 그대로 남긴다. 다만 보고 문장에서는 누가 무엇을 했는지 분명히 밝혀야 한다. 원장님께서는 초안을 직접 검토하셨고, 항목마다 담당자 이름을 넣도록 요청하셨다. 관련 자료는 별첨으로 정리하였음. 예산 집행 내역은 다음 보고에서 다룰 예정이다. 어법을 바꾸는 일은 예의를 갖추는 일이면서 동시에 책임 소재를 분명히 하는 일이다.",
    "De 4 a 8 de março, a responsável entrevistou 24 participantes, e a satisfação foi confirmada em 4,2 pontos. Uma participante disse: ‘foi bom porque a equipe veio falar com a gente primeiro’. Essa citação mostra o clima do campo e, por isso, permanece como está. Mas, nas frases de relato, é preciso deixar claro quem fez o quê. O diretor revisou o rascunho pessoalmente e pediu que o nome do responsável fosse incluído em cada item. Os materiais relacionados foram organizados em anexo. A execução orçamentária será tratada no próximo relatório. Mudar o uso linguístico é manter a cortesia e, ao mesmo tempo, tornar clara a responsabilidade.",
    "Exemplo original de oito frases. Observe a citação preservada, o agente nomeado e o fecho nominal. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l30 — protocolo de autoedição e justificativa das mudanças. */
export const C1_L30 = defineC1Lesson({
  id: "c1-l30", number: 30, moduleId: "c1-m06", title: "Reescrever o próprio texto",
  objective: "Aplicar um protocolo de autoedição e justificar as mudanças feitas.",
  prerequisites: ["c1-l29"], estimatedMinutes: 80, dialogueTitle: "Três leituras, três decisões",
  intro: [
    {
      title: "Um protocolo, não um impulso",
      body: "Revisar o próprio texto é difícil porque o autor lê o que quis dizer, não o que está escrito. Um protocolo resolve isso separando as leituras: na primeira, verifique a função de cada parágrafo; na segunda, a relação entre eles; na terceira, o ritmo e a superfície da frase. Cada leitura procura um tipo de problema e ignora os outros. Misturar tudo em uma passada produz mudanças locais que não alteram o problema central. O protocolo não garante um texto perfeito, mas garante que nenhuma dimensão ficou sem exame.",
      ko: "초고에서는 완벽한 문장보다 드러난 문제를 찾는 것이 중요하고, 탈고는 문장을 예쁘게 만드는 일이 아니라 판단을 다시 확인하는 일이다.",
    },
    {
      title: "Discurso: registrar a mudança é parte da mudança",
      body: "Uma revisão sem registro se perde: na próxima vez, o autor repete a mesma discussão e não sabe o que já tentou. Anotar ‘troquei o conectivo porque a relação era de acréscimo’ transforma uma intuição em critério reutilizável. O registro também revela o custo da revisão. Toda mudança melhora algo e piora algo: encurtar ganha legibilidade e perde nuance; tornar formal ganha verificabilidade e perde temperatura. Um protocolo honesto nomeia o que foi sacrificado, em vez de apresentar a versão final como se não tivesse perdido nada.",
      ko: "수정 기록이 없으면 다음 수정에서 같은 판단을 반복하게 된다. 무엇을 왜 바꿨는지 설명할 수 있어야 한다.",
    },
  ],
  dialogue: [
    ["지안", "윤호 선생님, 초고를 세 번 읽는 방식으로 고쳐 봤는데, 방향이 맞을까요?", "Professor Yunho, tentei revisar lendo o rascunho três vezes. A direção está certa?"],
    ["윤호", "먼저 무엇을 확인했는지 말해 볼래요?", "Pode começar me dizendo o que você verificou?"],
    ["지안", "첫 번째 읽기에서는 문단마다 기능을 한 줄로 적었고, 두 번째 읽기에서는 연결을 봤어요.", "Na primeira leitura, anotei em uma linha a função de cada parágrafo; na segunda, examinei as conexões."],
    ["윤호", "세 번째 읽기에서는요?", "E na terceira leitura?"],
    ["지안", "소리 내어 읽으면서 문장 길이를 조정했어요. 긴 문장이 세 번 이어지면 호흡이 끊기더라고요.", "Ajustei o comprimento das frases lendo em voz alta. Quando três frases longas se emendavam, o fôlego se rompia."],
    ["윤호", "좋아요. 그러면 바꾼 문장마다 이유를 적어 보세요. 기록이 없으면 다음에 같은 판단을 반복하게 돼요.", "Bom. Então anote o motivo de cada frase alterada. Sem registro, na próxima vez você repete o mesmo julgamento."],
    ["지안", "첫 문장을 문제 제시로 바꾼 이유, 접속어를 바꾼 이유, 반론을 옮긴 이유를 적었습니다.", "Anotei o motivo de transformar a primeira frase em apresentação do problema, o de trocar o conectivo e o de deslocar a objeção."],
    ["윤호", "그리고 초고를 버리지 마세요. 수정 전후를 함께 보관해야 무엇을 포기했는지도 설명할 수 있어요.", "E não descarte o rascunho. Guardar as versões antes e depois permite explicar também o que foi abandonado."],
  ],
  readingText: {
    titlePt: "Antes e depois, com as razões à vista",
    paragraphs: [
      "초고의 첫 문단은 ‘요즘 많은 사람들이 글을 쓴다’로 시작했다. 쓴 사람은 이 문장이 배경 설명이라고 생각했지만, 독자에게는 아무 정보도 주지 않는다. 첫 번째 읽기에서 필자는 각 문단의 기능을 한 줄로 적었다. 둘째 문단은 근거, 셋째 문단은 반론, 넷째 문단은 결론이었다. 기능이 드러나자 반복되는 문장 두 개가 바로 보였다. 첫 문장은 문제 제시로 고쳤고, 반복되는 문장은 지웠다.",
      "두 번째 읽기에서는 문단 사이의 연결을 확인했다. 둘째 문단과 셋째 문단이 ‘그러나’로 이어져 있었지만, 실제 관계는 대립이 아니라 보충이었다. 필자는 접속어를 ‘게다가’로 고치고, 반론은 넷째 문단 앞으로 옮겼다. 세 번째 읽기에서는 소리 내어 읽으며 문장 길이를 조정했다. 긴 문장이 세 번 이어지는 곳에서 호흡이 끊겼기 때문이다. 이전 원고에서 같은 실수를 한 경험이 있어서, 이번에는 긴 문장을 먼저 표시해 두었다.",
      "수정 기록에는 세 가지 근거를 남겼다. 첫째, 첫 문장을 문제 제시로 바꾼 이유. 둘째, 접속어를 바꾼 이유. 셋째, 반론의 위치를 옮긴 이유다. 기록이 없으면 다음 수정에서 같은 판단을 반복해야 한다. 초고를 버리는 대신 수정 전후를 함께 보관한 것도 같은 이유다. 탈고는 문장을 예쁘게 만드는 일이 아니라, 무엇을 왜 바꿨는지 설명할 수 있게 만드는 일이다.",
    ],
    pt: "O primeiro parágrafo do rascunho começava com ‘hoje em dia muitas pessoas escrevem’. Quem escreveu pensou que essa frase era uma explicação de contexto, mas ela não dá nenhuma informação ao leitor. Na primeira leitura, a autora anotou em uma linha a função de cada parágrafo. O segundo era a evidência, o terceiro a objeção e o quarto a conclusão. Assim que as funções ficaram visíveis, duas frases repetidas apareceram na hora. A primeira frase foi corrigida para apresentar o problema, e a frase repetida foi apagada. Na segunda leitura, ela verificou as conexões entre os parágrafos. O segundo e o terceiro estavam ligados por ‘no entanto’, mas a relação real não era de oposição, e sim de acréscimo. A autora trocou o conectivo por ‘além disso’ e deslocou a objeção para antes do quarto parágrafo. Na terceira leitura, ajustou o comprimento das frases lendo em voz alta. Isso porque, no trecho em que três frases longas se emendavam, o fôlego se rompia. Como já tinha cometido o mesmo erro num texto anterior, desta vez marcou antes as frases longas. No registro da revisão, deixou três justificativas. Primeira: por que transformou a primeira frase em apresentação do problema. Segunda: por que trocou o conectivo. Terceira: por que deslocou a objeção. Sem registro, a próxima revisão repete o mesmo julgamento. Guardar as versões antes e depois, em vez de descartar o rascunho, tem o mesmo motivo. Dar o texto por concluído não é deixar as frases bonitas, mas torná-lo capaz de explicar o que mudou e por quê.",
    objective: "Reconhecer o que a revisão melhorou, o que sacrificou e como cada mudança foi justificada.",
  },
  reusedIds: ["ko:경험", "ko:기록", "ko:게다가", "ko:보도"],
  grammar: [
    [
      "-도록 고치다 — corrigir para que",
      "동사 + -도록 고치다",
      "Indica a finalidade ou o resultado que a correção deve produzir: ‘para que a frase apresente o problema’. O foco está no efeito da mudança, não na ordem de quem revisa. Compare com -게 고치다, mais direto e às vezes mais informal; -도록 고치다 soa deliberado e é comum em relatos de revisão. Não use para descrever uma correção já concluída sem relação de finalidade.",
      [
        ["첫 문장이 문제를 바로 제시하도록 고쳤다.", "Corrigi a primeira frase para que apresente o problema de imediato."],
        ["접속어가 실제 관계를 드러내도록 고쳐야 한다.", "É preciso corrigir o conectivo para que ele revele a relação real."],
      ],
    ],
    [
      "-ㄴ/는 대신 — em vez de; em troca de",
      "동사 + -는 대신 / 형용사 + -(으)ㄴ 대신 / 명사 + 대신",
      "Marca substituição ou compensação: uma coisa ocupa o lugar de outra, ou um ganho compensa uma perda. Não é um simples contraste; por isso, não substitui ‘그러나’ quando as duas ideias apenas se opõem. Na revisão, ajuda a nomear o sacrifício consciente: encurtar em vez de explicar, guardar o rascunho em vez de descartá-lo. A primeira oração não pode ser uma ordem.",
      [
        ["문장을 지우는 대신 근거를 각주로 옮겼다.", "Em vez de apagar a frase, transferi a evidência para uma nota de rodapé."],
        ["초고를 버리는 대신 수정 전후를 함께 보관했다.", "Em vez de descartar o rascunho, guardei juntas as versões antes e depois."],
      ],
    ],
  ],
  guided: [
    mcq("O que a primeira leitura do protocolo verifica?", ["A função de cada parágrafo.", "A ortografia de cada palavra.", "O número de citações."], "A função de cada parágrafo.", "A primeira leitura mapeia a função dos parágrafos antes de olhar para a superfície."),
    cloze("Complete a finalidade da correção: 첫 문장이 문제를 바로 제시하___ 고쳤다.", "도록", "-도록 고치다 indica o efeito que a correção deve produzir."),
    listen("Ouça e escreva o que acontece quando não há registro da revisão.", "기록이 없으면 다음 수정에서 같은 판단을 반복하게 된다.", "기록이 없으면 다음 수정에서 같은 판단을 반복하게 된다.", "Sem registro, a próxima revisão repete o mesmo julgamento."),
    reading("수정 기록에는 세 가지 근거를 남겼다. 첫째, 첫 문장을 문제 제시로 바꾼 이유. 둘째, 접속어를 바꾼 이유. 셋째, 반론의 위치를 옮긴 이유다.", "O que o registro da revisão contém?", ["As razões de três mudanças específicas.", "A versão final sem as versões anteriores.", "Uma lista de livros consultados."], "As razões de três mudanças específicas.", "O trecho enumera três justificativas para mudanças concretas."),
    translate("pt-ko", "Traduza: “Em vez de descartar o rascunho, guardei juntas as versões antes e depois.”", "초고를 버리는 대신 수정 전후를 함께 보관했다.", "-ㄴ/는 대신 marca a substituição: guardar em vez de descartar.", ["초고를 버리지 않고 수정 전후를 함께 보관했습니다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 대신 corretamente?", ["문장을 지우는 대신 근거를 각주로 옮겼다.", "문장을 지우세요 대신 근거를 각주로 옮겼다.", "문장을 지우는 대신에 근거가 각주로 옮겼다."], "문장을 지우는 대신 근거를 각주로 옮겼다.", "A primeira oração não pode ser uma ordem; a segunda mantém sujeito e partículas coerentes."),
    cloze("Complete a substituição: 문장을 지우는 ___ 근거를 각주로 옮겼다.", "대신", "A forma -는 대신 indica que uma ação ocupa o lugar da outra."),
    listen("Ouça e escreva por que a autora marcou antes as frases longas.", "이전 원고에서 같은 실수를 한 경험이 있어서 긴 문장을 먼저 표시했다.", "이전 원고에서 같은 실수를 한 경험이 있어서 긴 문장을 먼저 표시했다.", "Como já tinha cometido o mesmo erro num texto anterior, marquei antes as frases longas."),
    translate("ko-pt", "Traduza: 탈고는 문장을 예쁘게 만드는 일이 아니라 무엇을 왜 바꿨는지 설명할 수 있게 만드는 일이다.", "Dar o texto por concluído não é deixar as frases bonitas, mas torná-lo capaz de explicar o que mudou e por quê.", "탈고 = conclusão do manuscrito; 설명할 수 있게 만들다 = tornar capaz de explicar.", ["Concluir o texto não é embelezar frases, e sim permitir explicar o que mudou e por quê."]),
    reading("두 번째 읽기에서는 문단 사이의 연결을 확인했다. 둘째 문단과 셋째 문단이 ‘그러나’로 이어져 있었지만, 실제 관계는 대립이 아니라 보충이었다. 필자는 접속어를 ‘게다가’로 고치고, 반론은 넷째 문단 앞으로 옮겼다.", "O que a segunda leitura revelou?", ["Que o conectivo indicava oposição, mas a relação era de acréscimo.", "Que o texto tinha erros de ortografia.", "Que a conclusão estava na introdução."], "Que o conectivo indicava oposição, mas a relação era de acréscimo.", "A leitura de conexões mostrou a incompatibilidade entre o conectivo e a relação real."),
  ],
  summary: [
    "O protocolo separa as leituras: função dos parágrafos, conexões, ritmo e superfície.",
    "-도록 고치다 nomeia o efeito que a correção deve produzir.",
    "-ㄴ/는 대신 marca substituição ou compensação, não simples contraste.",
    "Toda revisão melhora algo e sacrifica algo; o registro deve nomear os dois lados.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · autoedição com protocolo",
    "Aplique um protocolo de três leituras a um texto seu de pelo menos dois parágrafos. Reescreva o trecho mais problemático e registre três justificativas: o que mudou, por que mudou e o que foi sacrificado. Inclua a versão anterior de uma frase ao lado da versão revisada.",
    "세 번 읽기 프로토콜로 자신의 글을 고치고, 바꾼 이유를 기록해 보세요.",
    ["Faça a primeira leitura pensando só na função dos parágrafos.", "Use -도록 고치다 uma vez para declarar o efeito de uma correção.", "Use -ㄴ/는 대신 uma vez para nomear o que foi sacrificado.", "Registre três justificativas e uma versão anterior."],
    ["Protocolo de três leituras reconhecível.", "Três mudanças justificadas.", "Uso correto de -도록 고치다 e -ㄴ/는 대신.", "Uma versão anterior comparada com a revisada.", "Sacrifício nomeado, não escondido."],
    "첫 번째 읽기에서 문단마다 기능을 한 줄로 적었다. 둘째 문단은 근거인데도 첫 문단의 주장을 반복하고 있었다. 첫 문장이 문제를 바로 제시하도록 고쳤다. 두 번째 읽기에서는 접속어를 확인했다. ‘그러나’는 대립을 기대하게 했지만 실제 관계는 보충이었으므로 ‘게다가’로 바꾸었다. 세 번째 읽기에서는 소리 내어 읽으며 긴 문장을 나누었다. 문장을 지우는 대신 근거를 각주로 옮긴 이유도 기록했다. 초고를 버리는 대신 수정 전후를 함께 보관했다. 기록이 없으면 다음 수정에서 같은 판단을 반복하게 되기 때문이다.",
    "Na primeira leitura, anotei em uma linha a função de cada parágrafo. O segundo parágrafo era a evidência, mas repetia a tese do primeiro. Corrigi a primeira frase para que apresente o problema de imediato. Na segunda leitura, verifiquei os conectivos. O ‘no entanto’ criava a expectativa de oposição, mas a relação real era de acréscimo, então troquei por ‘além disso’. Na terceira leitura, li em voz alta e dividi as frases longas. Também registrei o motivo de ter transferido a evidência para uma nota de rodapé, em vez de apagar a frase. Em vez de descartar o rascunho, guardei juntas as versões antes e depois. Isso porque, sem registro, a próxima revisão repete o mesmo julgamento.",
    "Exemplo original de oito frases. Observe o protocolo explícito, as três justificativas e o sacrifício nomeado. Exemplo ilustrativo; não é gabarito.",
  ),
});
