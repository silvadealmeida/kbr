import { cloze, defineB2Lesson, listen, mcq, reading, translate } from "./shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e cumpre o gênero pedido." },
  { criterion: "organization" as const, labelPt: "Organização e coesão", descriptorPt: "As ideias têm ordem reconhecível e os parágrafos se conectam." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário", descriptorPt: "Usa palavras adequadas ao tema, inclusive parte do léxico da lição." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas são inteligíveis e o registro combina com o destinatário." },
  { criterion: "argument" as const, labelPt: "Clareza da posição", descriptorPt: "A posição ou avaliação fica explícita e sustentada pelo texto." },
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
  minWords = 80,
): CourseProductionTask {
  return { titlePt, promptPt, promptKo, guidance, checklist, minWords, rubric: RUBRIC, sample: { ko: sampleKo, pt: samplePt, notePt } };
}

/** b2-l06 — tese, evidência e nominalização. */
export const B2_L06 = defineB2Lesson({
  id: "b2-l06", number: 6, moduleId: "b2-m02", title: "Qual é o argumento?",
  objective: "Formular uma tese e sustentá-la com evidência e explicação.",
  prerequisites: ["b2-c01"], estimatedMinutes: 75, dialogueTitle: "A reunião editorial",
  intro: [
    { title: "O ponto central do argumento", body: "Para dizer onde está o núcleo de um argumento, use -는 데 있다 com verbos e -ㄴ/은 데 있다 com adjetivos. A forma não é uma definição neutra: ela aponta o lugar do problema ou da proposta. Compare com -는 것이다, que apenas identifica o que algo é.", ko: "문제의 핵심은 정보가 부족한 데 있어요." },
    { title: "Nominalizar para escrever com precisão", body: "-(으)ㅁ transforma verbo ou adjetivo em substantivo no registro formal/escrito. É comum em relatórios, avisos e títulos. Na fala, -기 e -는 것 são mais naturais. A forma passada é -았/었음; a negativa é -지 않음.", ko: "참석하지 않았음을 알려 주세요." },
  ],
  dialogue: [
    ["아나", "이 제안서, 어디서부터 읽으면 좋을까요?", "Por onde devo começar a ler esta proposta?"],
    ["민수", "먼저 개요를 보세요. 주장이 명확해야 독자가 따라옵니다.", "Veja primeiro o resumo geral. A tese precisa ser clara para o leitor acompanhar."],
    ["아나", "주장은 ‘유연 근무가 생산성을 높인다’네요.", "A tese é “o horário flexível aumenta a produtividade”."],
    ["민수", "네. 그런데 논지가 중간에 흔들려요. 자료가 주장을 뒷받침하는지 다시 봐야 해요.", "Sim. Mas o argumento oscila no meio. Precisamos ver de novo se os dados sustentam a tese."],
    ["아나", "이 조사 결과는 표본이 작아서 반증으로 보기 어렵지 않나요?", "Este resultado tem uma amostra pequena; não é difícil vê-lo como contraprova?"],
    ["민수", "맞아요. 그래서 초점을 ‘작은 조직의 시범 사례’로 좁히고, 결정을 데이터로 정당화하는 게 좋겠어요.", "Exato. Então é melhor estreitar o foco para “caso piloto de uma organização pequena” e justificar a decisão com os dados."],
    ["아나", "첫 문단의 주제문도 고치면 좋겠네요.", "Também seria bom corrigir a frase-tópico do primeiro parágrafo."],
    ["민수", "그렇게 하면 논지가 선명해질 거예요.", "Assim o argumento ficará mais nítido."],
  ],
  readingText: {
    titlePt: "Uma tese precisa de sustentação",
    paragraphs: [
      "좋은 제안서는 주장부터 시작한다. 그러나 주장만으로는 부족하다. 독자는 그 주장이 왜 타당한지 알고 싶어 하므로, 글의 개요와 주제문이 논지를 분명하게 보여 주어야 한다.",
      "근거는 주장을 뒷받침해야 하고, 반증이 나올 가능성도 인정해야 한다. 작은 표본이나 예외적인 사례를 전체로 확대하면 논지가 약해진다. 초점을 좁히고, 확인된 자료로 결정을 정당화하는 편이 낫다.",
      "마지막으로 반대 의견을 검토해야 한다. 반증을 무시하면 주장은 강해 보이지만 쉽게 무너진다. 명확한 주장, 검증 가능한 근거, 좁혀진 초점이 함께 있을 때 글은 설득력을 얻는다. 이 세 요소를 갖춘 글은 반박에도 흔들리지 않는다.",
    ],
    pt: "Uma boa proposta começa pela tese. Mas a tese sozinha não basta. O leitor quer saber por que ela é válida; por isso, o resumo geral e a frase-tópico precisam mostrar o argumento com clareza. A evidência deve sustentar a tese, e a possibilidade de contraprova precisa ser reconhecida. Se um caso pequeno ou excepcional for ampliado para o todo, o argumento perde força. É melhor estreitar o foco e justificar a decisão com dados confirmados. Por fim, é preciso examinar a objeção. Ignorar a contraprova pode fazer a tese parecer forte, mas ela quebra com facilidade. Uma tese clara, evidência verificável e um foco delimitado dão ao texto seu poder de persuasão.",
    objective: "Distinguir tese, evidência e conclusão, e perceber onde o argumento se enfraquece.",
  },
  reusedIds: ["ko:주장", "ko:근거", "ko:자료"],
  grammar: [
    ["-(으)ㅁ — nominalização formal", "동사/형용사 + -(으)ㅁ", "Transforma verbo ou adjetivo em substantivo no registro formal/escrito. É comum em relatórios, avisos, atas e títulos. A forma passada é -았/었음 e a negativa é -지 않음. Compare com -기 (mais verbal e frequente na fala) e -는 것 (neutro, muito produtivo). Não use -(으)ㅁ para uma ação cotidiana simples na conversa; soaria burocrático.", [["참석하지 않았음을 알려 주세요.", "Por favor, informe que você não compareceu."], ["그의 주장이 타당함을 인정했어요.", "Reconheci que o argumento dele é válido."]]],
    ["-는 데 있다 — o ponto está em", "동사 + -는 데 있다 / 형용사 + -ㄴ/은 데 있다", "Aponta o núcleo de um problema, proposta ou explicação: “o ponto está em...”. Com verbos, use -는 데; com adjetivos, -ㄴ/은 데. Compare com -는 것이다, que identifica o que algo é, sem destacar o locus. Registro: neutro a formal, comum em textos argumentativos.", [["문제의 핵심은 정보가 부족한 데 있어요.", "O ponto central do problema está na falta de informação."], ["이 제안의 목적은 비용을 줄이는 데 있어요.", "O objetivo desta proposta está em reduzir custos."]]],
  ],
  guided: [
    mcq("Qual é a tese da proposta?", ["O horário flexível aumenta a produtividade.", "A empresa deve fechar o escritório.", "Os dados são pequenos demais."], "O horário flexível aumenta a produtividade.", "유연 근무가 생산성을 높인다는 주장이에요."),
    cloze("Complete o foco: 이 제안의 목적은 비용을 줄이___ 데 있어요.", "는", "줄이는 데 = o ponto está em reduzir."),
    listen("Ouça e escreva a ação sobre o resumo geral.", "보고서의 개요를 먼저 정리했어요.", "보고서의 개요를 먼저 정리했어요.", "Organizei primeiro o resumo geral do relatório."),
    reading("좋은 제안서는 주장부터 시작한다. 그러나 주장만으로는 부족하다. 독자는 그 주장이 왜 타당한지 알고 싶어 하므로, 개요와 주제문이 논지를 분명하게 보여 주어야 한다.", "O que o texto exige além da tese?", ["Uma explicação de por que ela é válida.", "Um título mais longo e chamativo.", "Uma lista dos autores citados."], "Uma explicação de por que ela é válida.", "독자는 주장이 왜 타당한지 알고 싶어 해요."),
    translate("pt-ko", "Traduza: “O ponto central do problema está na falta de dados.”", "문제의 핵심은 자료가 부족한 데 있어요.", "부족한 데 있어요 = o ponto está na falta.", ["문제는 자료가 부족한 데 있어요."]),
  ],
  independent: [
    mcq("Qual frase usa a nominalização formal -(으)ㅁ?", ["참석하지 않았음을 알려 주세요.", "참석하지 않았어요.", "참석하지 않을 거예요."], "참석하지 않았음을 알려 주세요.", "않았음 é a nominalização formal de 않았다."),
    cloze("Complete a nominalização: 그의 주장이 타당___ 인정했어요.", "함을", "타당함을 = o fato de ser válido."),
    listen("Ouça e escreva o que os dados precisam fazer.", "자료가 주장을 뒷받침해야 해요.", "자료가 주장을 뒷받침해야 해요.", "Os dados precisam sustentar a tese."),
    translate("ko-pt", "Traduza: 반증이 없으면 결론을 확정할 수 없어요.", "Sem contraprova, não se pode confirmar a conclusão.", "반증 = contraprova; 확정하다 = confirmar.", ["Sem evidência contrária, não dá para confirmar a conclusão."]),
    reading("마지막으로 반대 의견을 검토해야 한다. 반증을 무시하면 주장은 강해 보이지만 쉽게 무너진다. 명확한 주장, 검증 가능한 근거, 좁혀진 초점이 함께 있을 때 글은 설득력을 얻는다. 이 세 요소를 갖춘 글은 반박에도 흔들리지 않는다.", "O que fortalece um argumento?", ["Tese clara, evidência verificável e foco delimitado.", "Ignorar todas as objeções.", "Usar o maior número possível de palavras."], "Tese clara, evidência verificável e foco delimitado.", "명확한 주장, 검증 가능한 근거, 좁혀진 초점."),
  ],
  summary: ["-(으)ㅁ nominaliza em registro formal.", "-는 데 있다 aponta o núcleo do argumento.", "Tese, evidência e foco delimitado sustentam a conclusão.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · uma proposta curta",
    "Escreva uma proposta de cinco a sete frases com uma tese clara, dois argumentos e uma conclusão. Use uma nominalização formal ou -는 데 있다.",
    "한 가지 제안을 다섯 문장 이상으로 써 보세요.",
    ["Enuncie a tese na primeira frase.", "Apresente dois argumentos distintos.", "Reconheça uma objeção ou limite.", "Feche com uma recomendação."],
    ["Tese explícita.", "Dois argumentos com evidência.", "Objeção ou limite mencionado.", "Conclusão coerente.", "Registro adequado ao texto escrito."],
    "저는 우리 동네에 작은 도서관이 필요하다고 생각해요. 첫째, 아이들이 책을 접할 공간이 부족해요. 둘째, 어른들도 조용히 공부할 곳이 거의 없어요. 물론 비용 문제가 있지만, 학교와 함께 공간을 나누면 비용을 줄일 수 있어요. 따라서 작은 도서관을 먼저 시범 운영할 것을 제안해요.",
    "Penso que nosso bairro precisa de uma pequena biblioteca. Primeiro, falta espaço para as crianças terem contato com livros. Segundo, quase não há lugar para adultos estudarem em silêncio. É claro que há a questão do custo, mas, se dividirmos o espaço com a escola, podemos reduzi-lo. Portanto, proponho operar primeiro uma pequena biblioteca em caráter piloto.",
    "Exemplo original de cinco frases. Note a tese, dois argumentos, uma concessão e a recomendação final. Não copie: compare a estrutura.",
  ),
});

/** b2-l07 — objeção, concessão e resposta. */
export const B2_L07 = defineB2Lesson({
  id: "b2-l07", number: 7, moduleId: "b2-m02", title: "Do outro lado",
  objective: "Reconhecer e responder a uma objeção sem descartá-la.",
  prerequisites: ["b2-l06"], estimatedMinutes: 75, dialogueTitle: "O debate sobre o escritório",
  intro: [
    { title: "Longe de...", body: "-기는커녕 nega o primeiro item e mostra que o segundo é ainda menos possível: “longe de..., muito menos...”. Pode seguir um substantivo (은/는커녕) ou um verbo nominalizado em -기. Compare com -는 대신 (em vez de) e -뿐만 아니라 (não só).", ko: "칭찬은커녕 비난만 들었어요." },
    { title: "Apesar de", body: "-에도 불구하고 introduz uma concessão factual: algo aconteceu apesar de um obstáculo. É formal/escrito e não serve para uma hipótese; para “mesmo se”, use -더라도 ou -ㄹ지라도. Compare com -지만, mais neutro e oral.", ko: "비가 왔음에도 불구하고 행사는 계속됐어요." },
  ],
  dialogue: [
    ["지민", "재택근무를 줄이자는 주장의 전제가 뭐예요?", "Qual é a premissa do argumento para reduzir o home office?"],
    ["마르코", "사무실에서 일할 때 협업이 더 잘 된다는 전제예요.", "A premissa de que a colaboração funciona melhor quando se trabalha no escritório."],
    ["지민", "그런데 그 전제에는 모순이 있어요. 협업 도구를 쓰는 사람은 재택에서도 협업해요.", "Mas há uma contradição nessa premissa. Quem usa ferramentas de colaboração também colabora em casa."],
    ["마르코", "그 점은 회의에서도 거론됐어요. 하지만 경영진은 생산성 문제를 근거 없이 일축했어요.", "Esse ponto também foi mencionado na reunião. Mas a direção descartou a questão da produtividade sem evidência."],
    ["지민", "그럼 반대 측 주장에 공감대는 없나요?", "Então não há consenso em torno do argumento do outro lado?"],
    ["마르코", "일부는 있어요. 출근을 원하는 사람도 많으니까요. 하지만 어느 쪽이 우세하다고 아직 말하기 어려워요.", "Há algum. Muitas pessoas também querem ir ao escritório. Mas ainda é difícil dizer qual lado prevalece."],
    ["지민", "제안의 취지는 이해해요. 다만 감정에 호소하는 부분은 빼야 해요.", "Entendo a intenção da proposta. Só é preciso tirar a parte que apela à emoção."],
    ["마르코", "맞아요. 논점을 분명히 하면 대화가 더 나아질 거예요.", "Exato. Se deixarmos o ponto claro, a conversa vai melhorar."],
  ],
  readingText: {
    titlePt: "Como tratar a opinião contrária",
    paragraphs: [
      "사내 게시판에 재택근무를 줄이자는 글이 올라왔다. 글의 전제는 '사무실에서만 협업이 잘 된다'는 것이었다. 그러나 이 전제에는 모순이 있었다. 온라인 도구를 쓰는 팀은 장소와 관계없이 협업하고 있었다.",
      "회의에서 반대 의견도 거론되었다. 경영진은 생산성 저하를 이유로 들었지만, 근거 없는 우려를 일축하듯 말했다. 반면 직원들은 통근 시간과 집중 환경을 문제로 꼽았다. 어느 쪽이 우세하다고 단정하기는 이르지만, 공감대는 분명히 존재했다.",
      "제안의 취지는 이해할 수 있다. 그러나 감정에 호소하는 문장은 논점을 흐린다. 반대 의견을 먼저 정확히 요약하고, 확인된 자료로 답할 때 대화는 생산적으로 변한다.",
    ],
    pt: "Um texto pedindo a redução do home office foi publicado no mural da empresa. A premissa era que “só no escritório a colaboração funciona”. Essa premissa, porém, tinha uma contradição: equipes que usavam ferramentas on-line colaboravam independentemente do lugar. Na reunião, a objeção também foi mencionada. A direção alegou queda de produtividade, mas descartou a preocupação sem evidência. Os funcionários, por outro lado, apontaram o tempo de deslocamento e o ambiente de concentração. Ainda era cedo para dizer qual lado prevalecia, mas havia claramente um consenso parcial. A intenção da proposta é compreensível. No entanto, frases que apelam à emoção desviam do ponto. Quando resumimos a objeção com precisão e respondemos com dados confirmados, a conversa se torna produtiva.",
    objective: "Reconhecer a objeção, a resposta e o ponto em que o argumento apela à emoção.",
  },
  reusedIds: ["ko:반대", "ko:의견", "ko:회의"],
  grammar: [
    ["-기는커녕 — longe de; muito menos", "명사 + 은/는커녕 / 동사 + -기는커녕", "Nega o primeiro item e intensifica a negação do segundo: “longe de..., muito menos...”. Costuma vir com 조차, 도 ou apenas um contraste. Compare com -는 대신 (substituição) e -뿐만 아니라 (adição). Registro: neutro, levemente enfático; comum na fala.", [["칭찬은커녕 비난만 들었어요.", "Longe de elogios, só ouvi críticas."], ["쉬기는커녕 밥 먹을 시간도 없었어요.", "Longe de descansar, não tive nem tempo de comer."]]],
    ["-에도 불구하고 — apesar de", "명사 + 에도 불구하고 / 동사 + -았/었음에도 불구하고", "Concessão factual: o resultado aconteceu apesar do obstáculo. É formal/escrito. Não use para uma hipótese; nesse caso, -더라도 ou -ㄹ지라도. Compare com -지만, mais neutro e frequente na fala. Com verbo, a forma escrita costuma ser -았/었음에도 불구하고.", [["비가 왔음에도 불구하고 행사는 계속됐어요.", "Apesar da chuva, o evento continuou."], ["어려운 조건에도 불구하고 끝까지 해냈어요.", "Apesar das condições difíceis, levou até o fim."]]],
  ],
  guided: [
    mcq("Qual é a premissa do texto contra o home office?", ["Só no escritório a colaboração funciona.", "O home office aumenta o salário.", "Os funcionários não usam ferramentas on-line."], "Só no escritório a colaboração funciona.", "사무실에서만 협업이 잘 된다는 전제예요."),
    cloze("Complete a negação enfática: 칭찬___ 비난만 들었어요.", "은커녕", "칭찬은커녕 = longe de elogios."),
    listen("Ouça e escreva o que não se deve fazer com a preocupação.", "근거 없는 우려를 일축하면 안 돼요.", "근거 없는 우려를 일축하면 안 돼요.", "Não se deve descartar uma preocupação sem evidência."),
    reading("사내 게시판에 재택근무를 줄이자는 글이 올라왔다. 글의 전제는 ‘사무실에서만 협업이 잘 된다’는 것이었다. 그러나 이 전제에는 모순이 있었다. 온라인 도구를 쓰는 팀은 장소와 관계없이 협업하고 있었다.", "Qual contradição o texto aponta?", ["Equipes colaboram on-line independentemente do lugar.", "Ninguém quer trabalhar em casa.", "A empresa não tem ferramentas on-line."], "Equipes colaboram on-line independentemente do lugar.", "장소와 관계없이 협업하고 있었다."),
    translate("pt-ko", "Traduza: “Apesar das dificuldades, a equipe terminou o projeto.”", "어려운 조건에도 불구하고 팀은 프로젝트를 끝냈어요.", "에도 불구하고 marca concessão factual.", ["어려운 조건에도 불구하고 팀은 프로젝트를 끝냈습니다."]),
  ],
  independent: [
    mcq("Qual frase usa -기는커녕 corretamente?", ["쉬기는커녕 밥 먹을 시간도 없었어요.", "쉬기는커녕 쉬었어요.", "쉬기는커녕 쉴 거예요."], "쉬기는커녕 밥 먹을 시간도 없었어요.", "-기는커녕 nega o primeiro item e intensifica o segundo."),
    cloze("Complete a concessão factual: 비가 왔___ 불구하고 행사는 계속됐어요.", "음에도", "왔음에도 불구하고 = apesar de ter chovido."),
    listen("Ouça e escreva o que a proposta não deve fazer.", "제안의 취지는 이해하지만 감정에 호소하면 안 돼요.", "제안의 취지는 이해하지만 감정에 호소하면 안 돼요.", "Entendo a intenção da proposta, mas não se deve apelar à emoção."),
    translate("ko-pt", "Traduza: 그 주장의 전제에는 모순이 있어요.", "A premissa daquele argumento tem uma contradição.", "전제 = premissa; 모순 = contradição.", ["Há uma contradição na premissa desse argumento."]),
    reading("제안의 취지는 이해할 수 있다. 그러나 감정에 호소하는 문장은 논점을 흐린다. 반대 의견을 먼저 정확히 요약하고, 확인된 자료로 답할 때 대화는 생산적으로 변한다.", "Como responder a uma objeção?", ["Resumindo-a com precisão e respondendo com dados confirmados.", "Ignorando-a completamente na resposta.", "Apelando à emoção do outro lado."], "Resumindo-a com precisão e respondendo com dados confirmados.", "반대 의견을 정확히 요약하고 확인된 자료로 답해요."),
  ],
  summary: ["-기는커녕 nega o primeiro item e intensifica o segundo.", "-에도 불구하고 marca concessão factual e formal.", "Responder à objeção real é diferente de atacá-la.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · responder a uma objeção",
    "Escolha uma opinião sua e escreva uma objeção real a ela. Responda à objeção em cinco a sete frases, sem enfraquecê-la.",
    "자신의 의견에 대한 반론을 쓰고 답해 보세요.",
    ["Enuncie sua posição.", "Resuma a objeção mais forte.", "Use -기는커녕 ou -에도 불구하고 uma vez.", "Responda com evidência ou critério."],
    ["Posição clara.", "Objeção real, não caricata.", "Uma forma de concessão.", "Resposta ligada à objeção.", "Conclusão que preserva a posição."],
    "재택근무를 줄이자는 의견에 반대해요. 물론 사무실에서의 협업이 중요한 것도 사실이에요. 하지만 온라인 도구를 쓰면 장소와 관계없이 협업할 수 있어요. 출근을 원하는 사람에게는 선택권을 주는 게 좋아요. 그러니까 재택근무를 없애기보다는 기준을 정하는 게 낫다고 생각해요.",
    "Sou contra a ideia de reduzir o home office. É claro que a colaboração no escritório também é importante. Mas, usando ferramentas on-line, é possível colaborar independentemente do lugar. É melhor dar opção a quem quer ir ao escritório. Por isso, penso que é melhor definir critérios do que eliminar o home office.",
    "Exemplo original de cinco frases. A objeção é reconhecida antes da resposta; não é um espantalho. Compare a estrutura.",
  ),
});

/** b2-l08 — concessão forte e limites. */
export const B2_L08 = defineB2Lesson({
  id: "b2-l08", number: 8, moduleId: "b2-m02", title: "Mesmo que...",
  objective: "Sustentar uma posição diante de objeções fortes com concessões bem delimitadas.",
  prerequisites: ["b2-l07"], estimatedMinutes: 75, dialogueTitle: "A regra de ruído",
  intro: [
    { title: "Mesmo que", body: "-ㄹ지라도 é uma concessão hipotética forte, mais formal que -더라도. Admite uma condição extrema e mantém a conclusão. Não é comum na conversa cotidiana. A segunda oração pode ser uma promessa, uma recomendação ou uma conclusão, mas não um simples fato já concluído no passado.", ko: "아무리 어려울지라도 포기하지 않겠습니다." },
    { title: "Mesmo que se diga", body: "-ㄴ/는다 해도 concede uma afirmação ou alegação: “mesmo que digam/façam...”. Com adjetivos, use -다 해도; com substantivos, (이)라 해도. Compare com -ㄹ지라도, que concede uma condição, e com -다고 해도, mais direto. Registro: neutro a formal.", ko: "모두가 반대한다 해도 저는 계속하겠어요." },
  ],
  dialogue: [
    ["아나", "회의에서 합의가 안 됐어요?", "Não houve acordo na reunião?"],
    ["민수", "한쪽이 자기 주장만 고집했어요. 상대는 완강하게 거절했고요.", "Um lado insistiu apenas na própria opinião. O outro recusou de forma inflexível."],
    ["아나", "그래서 규칙을 강행했나요?", "Então impuseram a regra?"],
    ["민수", "아니요. 반대를 무시하고 강행하면 나중에 더 큰 갈등이 생겨요.", "Não. Se impormos ignorando a oposição, mais tarde surge um conflito maior."],
    ["아나", "그럼 어떻게 설득했어요?", "Então como convenceram?"],
    ["민수", "상대의 우려를 먼저 듣고 설명하니 조금씩 수긍했어요. 완전히 납득한 건 아니지만, 한 발 물러서 주기로 했어요.", "Ouvimos primeiro a preocupação do outro lado e explicamos; aos poucos, ele foi concordando. Não ficou totalmente convencido, mas decidiu recuar um passo."],
    ["아나", "결국 요구를 관철한 건가요?", "No fim, conseguiram impor a exigência?"],
    ["민수", "일부만요. 압박에 굴복하지 않았지만, 모든 걸 관철하지도 않았어요.", "Só em parte. Não cedemos à pressão, mas também não impusemos tudo."],
  ],
  readingText: {
    titlePt: "Persuadir não é fazer o outro ceder",
    paragraphs: [
      "회의에서 한 참석자가 자기 주장만 고집했다. 다른 쪽도 완강하게 거절해서 대화가 멈출 것 같았다. 누군가는 압박에 굴복할 수도 있었지만, 그렇게 하면 문제는 해결되지 않는다.",
      "진행자는 먼저 상대의 우려를 정확히 듣자고 했다. 설명을 들은 참석자들은 조금씩 수긍했고, 한 발 물러서는 안을 받아들였다. 물론 완전히 납득한 것은 아니었다.",
      "결국 한쪽의 요구를 모두 관철한 것은 아니었다. 설득은 상대를 굴복시키는 일이 아니라, 서로가 받아들일 수 있는 범위를 찾는 일이다. 강행보다 느리지만, 그 합의는 더 오래 간다. 그래서 합의에는 시간이 걸리지만, 한쪽만 이기는 것보다 훨씬 낫다. 결국 오래 가는 쪽이 더 낫다.",
    ],
    pt: "Em uma reunião, um participante insistiu apenas na própria opinião. O outro lado também recusou de forma inflexível, e a conversa parecia ter parado. Alguém poderia ceder à pressão, mas isso não resolveria o problema. O mediador propôs primeiro ouvir com precisão a preocupação do outro lado. Depois da explicação, os participantes foram concordando aos poucos e aceitaram uma proposta de recuar um passo. É claro que não ficaram totalmente convencidos. No fim, não foi possível impor por completo a exigência de um dos lados. Persuadir não é fazer o outro ceder, mas encontrar um limite que ambos possam aceitar. É mais lento do que impor, porém o acordo dura mais.",
    objective: "Identificar o que cada lado concede, o que permanece em disputa e por que o acordo é parcial.",
  },
  reusedIds: ["ko:갈등", "ko:주장", "ko:회의"],
  grammar: [
    ["-ㄹ지라도 — mesmo que", "동사/형용사 + -ㄹ지라도", "Concessão hipotética forte e formal: admite uma condição extrema e mantém a conclusão. É mais literária que -더라도, que é neutra, e que -아/어도, cotidiana. A segunda oração não deve ser um fato concluído no passado; prefira promessa, recomendação ou conclusão. Registro: escrito/formal.", [["아무리 어려울지라도 포기하지 않겠습니다.", "Mesmo que seja muito difícil, não vou desistir."], ["비용이 들지라도 지금 고쳐야 해요.", "Mesmo que custe, é preciso consertar agora."]]],
    ["-ㄴ/는다 해도 — mesmo que se diga/faça", "동사 + -ㄴ/는다 해도 / 형용사 + -다 해도 / 명사 + (이)라 해도", "Concede uma afirmação ou alegação: “mesmo que digam que...”, “mesmo que se faça...”. Compare com -ㄹ지라도, que concede uma condição, e com -다고 해도, mais direto e oral. Registro: neutro a formal, útil em debate.", [["모두가 반대한다 해도 저는 계속하겠어요.", "Mesmo que todos sejam contra, eu vou continuar."], ["그게 사실이라 해도 방법은 바꿔야 해요.", "Mesmo que isso seja verdade, é preciso mudar o método."]]],
  ],
  guided: [
    mcq("Por que a equipe não impôs a regra?", ["Porque impor poderia gerar um conflito maior.", "Porque a regra era ilegal.", "Porque ninguém compareceu à reunião."], "Porque impor poderia gerar um conflito maior.", "강행하면 더 큰 갈등이 생겨요."),
    cloze("Complete a concessão: 아무리 어려___ 지라도 포기하지 않겠습니다.", "울", "어려울지라도 = mesmo que seja difícil."),
    listen("Ouça e escreva o resultado parcial.", "압박에 굴복하지 않았지만 모든 걸 관철하지도 않았어요.", "압박에 굴복하지 않았지만 모든 걸 관철하지도 않았어요.", "Não cedemos à pressão, mas também não impusemos tudo."),
    reading("회의에서 한 참석자가 자기 주장만 고집했다. 다른 쪽도 완강하게 거절해서 대화가 멈출 것 같았다. 진행자는 먼저 상대의 우려를 정확히 듣자고 했다. 설명을 들은 참석자들은 조금씩 수긍했다.", "O que o mediador fez primeiro?", ["Pediu para ouvir com precisão a preocupação do outro lado.", "Impôs a regra imediatamente, sem ouvir.", "Encerrou a reunião sem nenhum acordo."], "Pediu para ouvir com precisão a preocupação do outro lado.", "상대의 우려를 먼저 정확히 듣자고 했어요."),
    translate("pt-ko", "Traduza: “Mesmo que todos discordem, vou continuar.”", "모두가 반대한다 해도 계속하겠어요.", "ㄴ다 해도 concede a objeção e mantém a decisão.", ["모두가 반대한다 해도 저는 계속하겠어요."]),
  ],
  independent: [
    mcq("O que -ㄹ지라도 expressa?", ["Concessão hipotética formal.", "Causa factual.", "Sequência temporal."], "Concessão hipotética formal.", "-ㄹ지라도 = mesmo que, concessão formal."),
    cloze("Complete a concessão: 모두가 반대한___ 해도 계속하겠어요.", "다", "반대한다 해도 = mesmo que todos sejam contra."),
    listen("Ouça e escreva a reação após ouvir a preocupação.", "상대의 우려를 먼저 들었더니 조금씩 수긍했어요.", "상대의 우려를 먼저 들었더니 조금씩 수긍했어요.", "Depois de ouvir primeiro a preocupação, o outro lado foi concordando aos poucos."),
    translate("ko-pt", "Traduza: 설득은 상대를 굴복시키는 일이 아니에요.", "Persuadir não é fazer o outro se render.", "굴복시키다 = fazer ceder/render.", ["Convencer não é fazer a outra pessoa se render."]),
    reading("결국 한쪽의 요구를 모두 관철한 것은 아니었다. 설득은 상대를 굴복시키는 일이 아니라, 서로가 받아들일 수 있는 범위를 찾는 일이다. 강행보다 느리지만, 그 합의는 더 오래 간다. 그래서 합의에는 시간이 걸리지만, 한쪽만 이기는 것보다 훨씬 낫다. 결국 오래 가는 쪽이 더 낫다.", "Qual é a definição de persuasão no texto?", ["Encontrar um limite aceitável para ambos.", "Fazer o outro ceder à pressão.", "Evitar qualquer acordo."], "Encontrar um limite aceitável para ambos.", "서로가 받아들일 수 있는 범위를 찾는 일."),
  ],
  summary: ["-ㄹ지라도 é concessão hipotética formal.", "-ㄴ/는다 해도 concede uma alegação.", "Concessão não é concordância total.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · uma concessão delimitada",
    "Defenda uma posição impopular em cinco a sete frases. Conceda dois custos reais e mostre por que a posição ainda se sustenta.",
    "반대가 많은 의견을 논리적으로 주장해 보세요.",
    ["Enuncie a posição.", "Conceda um custo real.", "Use -ㄹ지라도 ou -ㄴ/는다 해도.", "Explique o que a concessão não muda."],
    ["Posição impopular clara.", "Duas concessões reais.", "Uma forma de concessão forte.", "Tese preservada.", "Conclusão sem exagero."],
    "저는 이 규칙을 바꿔야 한다고 생각해요. 물론 소음 문제를 무시할 수는 없어요. 하지만 모든 사람에게 같은 시간을 강요할 필요는 없어요. 어려울지라도 서로의 생활 시간을 존중하는 방식으로 조정할 수 있어요. 그래서 시간대를 나누는 안을 제안해요.",
    "Penso que esta regra precisa mudar. É claro que não se pode ignorar o problema do barulho. Mas não é necessário impor o mesmo horário a todos. Mesmo que seja difícil, podemos ajustar de modo a respeitar o horário de vida de cada um. Por isso, proponho dividir os períodos.",
    "Exemplo original de cinco frases. Duas concessões são reconhecidas e a proposta final continua de pé. Compare o equilíbrio, não o conteúdo.",
  ),
});

/** b2-l09 — alternativas, custos e critérios. */
export const B2_L09 = defineB2Lesson({
  id: "b2-l09", number: 9, moduleId: "b2-m02", title: "Entre duas opções",
  objective: "Comparar alternativas e justificar uma escolha com critérios explícitos.",
  prerequisites: ["b2-l08"], estimatedMinutes: 75, dialogueTitle: "Duas ofertas",
  intro: [
    { title: "Em vez de... prefiro", body: "-느니 rejeita a primeira ação como pior e apresenta a segunda como preferível: “em vez de..., prefiro...”. Costuma vir com 차라리. Compare com -기보다 (comparação neutra) e -는 대신 (substituição). Registro: neutro, frequente na fala.", ko: "매일 기다리느니 차라리 걸어가겠어요." },
    { title: "Se é para chegar a esse ponto", body: "-ㄹ 바에야 é mais forte e retórico que -느니: “se é para..., melhor...”. Apresenta a primeira ação como inaceitável. Compare com -느니, que é mais cotidiano. Registro: escrito/formal, enfático.", ko: "이렇게 기다릴 바에야 차라리 다른 길을 찾겠어요." },
  ],
  dialogue: [
    ["지민", "두 회사 중에 어디로 갈 거예요?", "Para qual das duas empresas você vai?"],
    ["수진", "아직 저울질하고 있어요. 한 곳은 연봉이 높고, 다른 곳은 출퇴근이 짧아요.", "Ainda estou pesando. Uma paga mais; a outra fica perto."],
    ["지민", "높은 연봉의 대가로 무엇을 포기하게 되죠?", "O que você abre mão em troca do salário mais alto?"],
    ["수진", "시간이에요. 매일 두 시간씩 통근해야 해요.", "Tempo. Eu teria que me deslocar duas horas por dia."],
    ["지민", "그럼 손익을 계산해 봤어요?", "Então você calculou os prós e contras?"],
    ["수진", "네. 돈은 더 받지만, 기회비용까지 생각하면 쉽지 않아요.", "Sim. Receberia mais dinheiro, mas, pensando no custo de oportunidade, não é fácil."],
    ["지민", "위험을 감수할 만한가요?", "Vale a pena assumir o risco?"],
    ["수진", "신중하게 결정하려고요. 득실만 보지 말고, 3년 뒤의 생활도 생각해야 하니까요.", "Vou decidir com prudência. Não devo olhar só para ganhos e perdas, mas também para a vida daqui a três anos."],
  ],
  readingText: {
    titlePt: "Toda escolha tem um custo",
    paragraphs: [
      "두 제안을 받았을 때 나는 연봉만 비교했다. 그러나 선택에는 항상 대가가 따른다. 높은 연봉을 택하면 시간을 포기해야 하고, 짧은 통근을 택하면 성장 기회를 포기할 수도 있다.",
      "나는 두 선택지를 며칠 동안 저울질했다. 손익을 표로 만들고, 기회비용까지 적어 보았다. 어떤 위험은 감수할 수 있지만, 모든 위험을 감수할 필요는 없었다.",
      "결국 나는 신중하게 한쪽을 골랐다. 득실은 숫자로만 계산되지 않는다. 무엇을 중요하게 여기는지 먼저 정해야 선택의 이유도 분명해진다. 그래서 나는 선택의 이유를 글로 적어 두었다. 나중에 같은 고민을 할 때 도움이 되기 때문이다. 선택은 한 번으로 끝나지 않는다.",
    ],
    pt: "Quando recebi duas propostas, comparei apenas o salário. Mas toda escolha tem um custo. Se eu escolher o salário maior, preciso abrir mão de tempo; se escolher o deslocamento curto, posso abrir mão de uma oportunidade de crescimento. Passei vários dias pesando as duas opções. Fiz uma tabela de prós e contras e anotei até o custo de oportunidade. Alguns riscos podem ser assumidos, mas não é necessário assumir todos. No fim, escolhi uma das opções com prudência. Ganhos e perdas não se calculam apenas com números. É preciso decidir primeiro o que é importante para que a razão da escolha também fique clara.",
    objective: "Identificar o trade-off, o critério da escolha e o que foi abandonado.",
  },
  reusedIds: ["ko:선택", "ko:기회", "ko:비교"],
  grammar: [
    ["-느니 — em vez de; prefiro", "동사 + -느니", "Rejeita a primeira ação como pior e apresenta a segunda como preferível: “em vez de..., prefiro...”. Costuma vir com 차라리. Compare com -기보다 (comparação neutra) e -는 대신 (substituição). A segunda oração expressa preferência ou avaliação. Registro: neutro, cotidiano.", [["매일 기다리느니 차라리 걸어가겠어요.", "Em vez de esperar todos os dias, prefiro ir a pé."], ["거짓말하느니 침묵하는 게 낫겠어요.", "Em vez de mentir, é melhor ficar em silêncio."]]],
    ["-ㄹ 바에야 — se é para chegar a esse ponto", "동사 + -ㄹ 바에야", "Versão mais forte e retórica de -느니: apresenta a primeira ação como inaceitável e a segunda como melhor alternativa. Costuma vir com 차라리. Compare com -느니, mais cotidiano. Registro: escrito/formal, enfático.", [["이렇게 기다릴 바에야 차라리 다른 길을 찾겠어요.", "Se é para esperar assim, prefiro procurar outro caminho."], ["거짓으로 채울 바에야 빈칸으로 두겠습니다.", "Se for para preencher com mentira, prefiro deixar em branco."]]],
  ],
  guided: [
    mcq("Qual é o principal trade-off da oferta com salário maior?", ["Perder tempo com o deslocamento.", "Perder o interesse pelo trabalho.", "Receber menos férias."], "Perder tempo com o deslocamento.", "높은 연봉의 대가로 시간을 포기해요."),
    cloze("Complete a preferência: 매일 기다리___ 차라리 걸어가겠어요.", "느니", "기다리느니 = em vez de esperar."),
    listen("Ouça e escreva o custo da escolha.", "높은 연봉의 대가로 시간을 포기해야 해요.", "높은 연봉의 대가로 시간을 포기해야 해요.", "Em troca do salário alto, é preciso abrir mão de tempo."),
    reading("두 제안을 받았을 때 나는 연봉만 비교했다. 그러나 선택에는 항상 대가가 따른다. 높은 연봉을 택하면 시간을 포기해야 하고, 짧은 통근을 택하면 성장 기회를 포기할 수도 있다.", "O que a autora percebeu?", ["Que toda escolha tem um custo.", "Que o salário é o único critério.", "Que não precisa escolher."], "Que toda escolha tem um custo.", "선택에는 항상 대가가 따른다."),
    translate("pt-ko", "Traduza: “Em vez de esperar todos os dias, prefiro caminhar.”", "매일 기다리느니 차라리 걸어가겠어요.", "느니 + 차라리 expressa a preferência.", ["매일 기다리느니 걸어가겠어요."]),
  ],
  independent: [
    mcq("Qual frase usa -느니 para rejeitar uma alternativa?", ["기다리느니 걸어가겠어요.", "기다리느니 걸었어요.", "기다리느니 기다릴 거예요."], "기다리느니 걸어가겠어요.", "-느니 apresenta a segunda ação como preferível."),
    cloze("Complete a alternativa forte: 이렇게 기다릴 바___ 차라리 다른 길을 찾겠어요.", "에야", "바에야 = se é para chegar a esse ponto."),
    listen("Ouça e escreva a decisão prudente.", "신중하게 결정하려고 득실을 다시 계산했어요.", "신중하게 결정하려고 득실을 다시 계산했어요.", "Para decidir com prudência, recalculei ganhos e perdas."),
    translate("ko-pt", "Traduza: 선택에는 항상 대가가 따라요.", "Toda escolha tem sempre um custo.", "대가가 따르다 = vir com um custo.", ["Toda escolha sempre vem com um preço."]),
    reading("결국 나는 신중하게 한쪽을 골랐다. 득실은 숫자로만 계산되지 않는다. 무엇을 중요하게 여기는지 먼저 정해야 선택의 이유도 분명해진다. 그래서 나는 선택의 이유를 글로 적어 두었다. 나중에 같은 고민을 할 때 도움이 되기 때문이다. 선택은 한 번으로 끝나지 않는다.", "O que é mais importante que os números?", ["Decidir primeiro o que se valoriza.", "Escolher sempre o maior salário.", "Evitar qualquer escolha."], "Decidir primeiro o que se valoriza.", "무엇을 중요하게 여기는지 먼저 정해야 해요."),
  ],
  summary: ["-느니 rejeita uma alternativa e prefere outra.", "-ㄹ 바에야 é uma versão forte e formal.", "Comparar exige critério, custo e o que se abandona.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · comparar duas opções",
    "Compare duas opções reais (curso, emprego, moradia ou viagem). Explique o critério, o custo aceito e a opção descartada.",
    "두 가지 선택을 비교하고 하나를 추천해 보세요.",
    ["Apresente as duas opções.", "Defina o critério principal.", "Use -느니 ou -ㄹ 바에야 uma vez.", "Diga o que você abre mão."],
    ["Duas opções claras.", "Critério explícito.", "Custo aceito nomeado.", "Alternativa descartada.", "Recomendação coerente."],
    "저는 두 제안 중에서 두 번째를 선택하겠어요. 첫 번째는 연봉이 높지만, 매일 두 시간을 통근해야 해요. 그 시간을 공부에 쓰면 장기적으로 더 큰 이득이 있어요. 물론 당장의 수입은 줄어들어요. 그래도 기회비용을 생각하면 두 번째가 더 낫다고 판단했어요.",
    "Entre as duas propostas, escolheria a segunda. A primeira paga mais, mas eu teria que me deslocar duas horas por dia. Se usar esse tempo para estudar, haverá um ganho maior a longo prazo. É claro que a renda imediata diminui. Mesmo assim, pensando no custo de oportunidade, julgo que a segunda é melhor.",
    "Exemplo original de cinco frases. O critério é o custo de oportunidade, e o custo aceito é explicitado. Compare a estrutura.",
  ),
});

/** b2-l10 — evidência, incerteza e cautela. */
export const B2_L10 = defineB2Lesson({
  id: "b2-l10", number: 10, moduleId: "b2-m02", title: "O que os dados não dizem",
  objective: "Reconhecer limites de evidência e formular afirmações com cautela.",
  prerequisites: ["b2-l09"], estimatedMinutes: 75, dialogueTitle: "A leitura da pesquisa",
  intro: [
    { title: "Não se pode saber se", body: "-ㄴ/는지 알 수 없다 marca incerteza sobre um fato: “não se pode saber se...”. Com verbos, use -는지; com adjetivos, -ㄴ지; no passado, -았/었는지. Compare com -ㄴ/는지 모르다 (não sei) e -것 같다 (parece). Registro: neutro a formal.", ko: "그가 동의했는지 알 수 없어요." },
    { title: "Há possibilidade de", body: "-ㄹ 가능성이 있다 expressa possibilidade epistêmica de forma medida: “há possibilidade de...”. Costuma vir com 높다/낮다. Compare com -ㄹ 수 있다 (capacidade ou possibilidade geral) e -ㄹ 것이다 (previsão mais forte). Não use para permissão. Registro: formal/escrito.", ko: "비용이 늘어날 가능성이 있어요." },
  ],
  dialogue: [
    ["마르코", "이 설문 결과를 보고 만족도가 높다고 할 수 있을까요?", "Podemos dizer que a satisfação é alta vendo este resultado da pesquisa?"],
    ["수진", "표본이 작아서 전체를 추정하기 어려워요.", "A amostra é pequena, então é difícil estimar o todo."],
    ["마르코", "그럼 ‘고객의 80%가 만족한다’고 쓸 수는 없겠네요.", "Então não podemos escrever “80% dos clientes estão satisfeitos”."],
    ["수진", "네. 그렇게 쓰면 일반화이고, 결론으로 바로 비약하는 거예요.", "Não. Escrever assim é generalizar e saltar direto para a conclusão."],
    ["마르코", "오차도 있나요?", "Também há margem de erro?"],
    ["수진", "있어요. 응답률도 낮아서 확률을 높게 볼 수 없어요.", "Há. A taxa de resposta também é baixa, então não dá para ver a probabilidade como alta."],
    ["마르코", "그럼 어떻게 결론을 써야 하죠?", "Então como devemos escrever a conclusão?"],
    ["수진", "‘일부 고객이 만족했다’ 정도로 유보하고, 추가 조사가 필요하다고 쓰는 게 안전해요. 지금 결과를 단정하면 안 돼요.", "É mais seguro reservar e escrever que “alguns clientes ficaram satisfeitos” e que é necessária uma pesquisa adicional. Não se deve afirmar o resultado agora."],
  ],
  readingText: {
    titlePt: "O que os números não dizem",
    paragraphs: [
      "설문 결과를 보면 만족도가 높아 보인다. 그러나 표본이 작고 응답률이 낮으면 전체 고객을 추정하기 어렵다. 숫자는 사실처럼 보이지만, 해석에는 한계가 있다.",
      "'80%가 만족한다'는 문장은 쉬워 보이지만, 작은 표본을 전체로 일반화한 것일 수 있다. 조사에는 오차가 있고, 만족의 기준도 사람마다 다르다. 이 결과만으로 성공 확률을 높게 보기는 어렵다.",
      "그래서 보고서는 결론을 잠시 유보하고 추가 조사를 제안했다. 확인된 자료와 추정을 구분하고, 한 사례에서 결론으로 비약하지 않을 때 데이터는 더 신뢰할 수 있다. 지금 판단을 단정으로 바꾸면 안 된다. 단정보다 정확한 한계가 낫다. 이 태도가 데이터를 더 정직하게 만든다. 신뢰는 거기서 생긴다.",
    ],
    pt: "Olhando o resultado da pesquisa, a satisfação parece alta. No entanto, quando a amostra é pequena e a taxa de resposta é baixa, é difícil estimar o conjunto dos clientes. Os números parecem fatos, mas a interpretação tem limites. A frase “80% estão satisfeitos” parece simples, mas pode ser uma generalização de uma amostra pequena para o todo. Toda pesquisa tem margem de erro, e o critério de satisfação varia de pessoa para pessoa. Só com este resultado, é difícil ver alta probabilidade de sucesso. Por isso, o relatório reservou a conclusão e propôs uma investigação adicional. Quando separamos fato confirmado de estimativa e não saltamos de um caso para a conclusão, os dados se tornam mais confiáveis. Um limite preciso é melhor do que uma afirmação categórica.",
    objective: "Distinguir dado, estimativa e conclusão, e identificar o limite da generalização.",
  },
  reusedIds: ["ko:결과", "ko:자료", "ko:판단"],
  grammar: [
    ["-ㄴ/는지 알 수 없다 — não se pode saber se", "동사 + -는지 / 형용사 + -ㄴ지 + 알 수 없다", "Marca incerteza sobre um fato: “não se pode saber se...”. Use -는지 com verbos, -ㄴ지 com adjetivos e -았/었는지 no passado. Compare com -ㄴ/는지 모르다 (não sei) e -것 같다 (parece). Registro: neutro a formal; útil em relatórios e análises.", [["그가 동의했는지 알 수 없어요.", "Não se pode saber se ele concordou."], ["이 결과가 정확한지 알 수 없습니다.", "Não é possível saber se este resultado é exato."]]],
    ["-ㄹ 가능성이 있다 — há possibilidade de", "동사/형용사 + -ㄹ 가능성이 있다", "Expressa possibilidade epistêmica de forma medida: “há possibilidade de...”. Costuma vir com 높다/낮다. Compare com -ㄹ 수 있다 (capacidade ou possibilidade geral) e -ㄹ 것이다 (previsão mais forte). Não use para permissão. Registro: formal/escrito.", [["비용이 늘어날 가능성이 있어요.", "Há possibilidade de os custos aumentarem."], ["조사 결과가 달라질 가능성도 있습니다.", "Também há possibilidade de o resultado da pesquisa mudar."]]],
  ],
  guided: [
    mcq("Por que não se pode dizer que 80% dos clientes estão satisfeitos?", ["Porque a amostra é pequena e a taxa de resposta é baixa.", "Porque todos os clientes responderam.", "Porque a pesquisa foi feita on-line."], "Porque a amostra é pequena e a taxa de resposta é baixa.", "표본이 작고 응답률이 낮아요."),
    cloze("Complete a incerteza: 그가 동의했___ 알 수 없어요.", "는지", "동의했는지 알 수 없어요 = não se pode saber se concordou."),
    listen("Ouça e escreva o limite da estimativa.", "표본이 작아서 전체를 추정하기 어려워요.", "표본이 작아서 전체를 추정하기 어려워요.", "Como a amostra é pequena, é difícil estimar o todo."),
    reading("설문 결과를 보면 만족도가 높아 보인다. 그러나 표본이 작고 응답률이 낮으면 전체 고객을 추정하기 어렵다. 숫자는 사실처럼 보이지만, 해석에는 한계가 있다.", "Qual é o limite do dado?", ["A amostra pequena e a baixa taxa de resposta.", "O excesso de entrevistados.", "A falta de perguntas sobre preço."], "A amostra pequena e a baixa taxa de resposta.", "표본이 작고 응답률이 낮으면 전체를 추정하기 어려워요."),
    translate("pt-ko", "Traduza: “Há possibilidade de o custo aumentar.”", "비용이 늘어날 가능성이 있어요.", "가능성이 있다 expressa possibilidade medida.", ["비용이 증가할 가능성이 있어요."]),
  ],
  independent: [
    mcq("Qual frase marca incerteza sobre um fato?", ["그가 동의했는지 알 수 없어요.", "그가 동의했어요.", "그가 동의할 거예요."], "그가 동의했는지 알 수 없어요.", "-는지 알 수 없다 marca incerteza."),
    cloze("Complete a possibilidade: 조사 결과가 달라질 ___도 있습니다.", "가능성", "가능성도 있습니다 = também há possibilidade."),
    listen("Ouça e escreva a conclusão prudente.", "지금 결과를 단정하면 안 돼요.", "지금 결과를 단정하면 안 돼요.", "Não se deve afirmar o resultado agora."),
    translate("ko-pt", "Traduza: 작은 표본을 전체로 일반화하면 안 돼요.", "Não se deve generalizar uma amostra pequena para o todo.", "일반화하다 = generalizar.", ["Não generalize um pequeno grupo para o todo."]),
    reading("그래서 보고서는 결론을 잠시 유보하고 추가 조사를 제안했다. 확인된 자료와 추정을 구분하고, 한 사례에서 결론으로 비약하지 않을 때 데이터는 더 신뢰할 수 있다. 지금 판단을 단정으로 바꾸면 안 된다. 단정보다 정확한 한계가 낫다. 이 태도가 데이터를 더 정직하게 만든다. 신뢰는 거기서 생긴다.", "O que o relatório decidiu fazer?", ["Reservar a conclusão e propor mais pesquisa.", "Afirmar que todos estão satisfeitos.", "Descartar todos os dados."], "Reservar a conclusão e propor mais pesquisa.", "결론을 유보하고 추가 조사를 제안했어요."),
  ],
  summary: ["-ㄴ/는지 알 수 없다 marca incerteza factual.", "-ㄹ 가능성이 있다 calibra a possibilidade.", "Dado, estimativa e conclusão são camadas diferentes.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · afirmar com cautela",
    "Receba uma conclusão forte (invente uma) e reescreva-a em cinco frases, separando dado, estimativa e limite. Termine com uma recomendação.",
    "강한 주장을 조심스러운 문장으로 다시 써 보세요.",
    ["Apresente o dado.", "Diga o que ele não permite concluir.", "Use -ㄴ/는지 알 수 없다 ou -ㄹ 가능성이 있다.", "Termine com uma recomendação prudente."],
    ["Dado separado da interpretação.", "Limite explícito.", "Uma forma de cautela.", "Recomendação proporcional.", "Sem generalização absoluta."],
    "이번 설문 결과만으로 고객 만족도가 높다고 단정하기는 어려워요. 표본이 작고 응답률도 낮아서 전체를 추정하기 어렵기 때문이에요. 다만 일부 고객이 새로운 서비스에 만족했다는 가능성은 있어요. 추가 조사를 하면 더 정확한 결론을 얻을 수 있을 거예요. 그래서 지금은 결과를 유보하고 다음 조사를 준비하는 게 좋겠어요.",
    "Só com o resultado desta pesquisa, é difícil afirmar que a satisfação dos clientes é alta. Isso porque a amostra é pequena e a taxa de resposta é baixa, o que dificulta estimar o todo. No entanto, existe a possibilidade de que alguns clientes tenham ficado satisfeitos com o novo serviço. Uma pesquisa adicional poderia gerar uma conclusão mais precisa. Por isso, agora é melhor reservar o resultado e preparar o próximo levantamento.",
    "Exemplo original de cinco frases. O dado não é descartado, mas também não é transformado em certeza. Compare o grau de cautela.",
  ),
});
