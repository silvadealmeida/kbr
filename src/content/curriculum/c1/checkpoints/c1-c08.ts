import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto integra leitura, argumento, mediação e revisão conforme o enunciado." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "Cada parte tem função própria e o conjunto avança sem repetir." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do C1, com colocações naturais e sem empobrecimento do registro." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas cumulativas do C1 aparecem corretas e o registro se mantém coerente." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A posição é delimitada, sustentada por evidência e responde a uma objeção real." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "A conclusão integra as fontes e o percurso, nomeando o que permanece em aberto." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção final · portfólio C1",
  promptPt: "Escreva um texto de encerramento do C1 em dez a doze frases. Integre a análise de uma fonte, uma posição própria com evidência e objeção, um trecho de mediação entre duas perspectivas e uma decisão de revisão. Feche com o que você aprendeu e com a habilidade que pretende continuar praticando.",
  promptKo: "C1에서 배운 읽기, 주장, 중재, 편집을 하나의 글로 통합해 보세요.",
  guidance: [
    "Apresente a fonte analisada e o que ela permite concluir.",
    "Delimite sua posição e responda à objeção mais forte.",
    "Reformule duas perspectivas sem falar por nenhuma delas.",
    "Explique uma decisão de revisão e o que ela custou ao texto.",
    "Use ao menos duas formas cumulativas do C1.",
    "Termine com um próximo passo verificável.",
  ],
  checklist: [
    "Análise de fonte com alcance declarado.",
    "Posição delimitada e objeção respondida.",
    "Duas perspectivas preservadas na mediação.",
    "Revisão justificada com perda assumida.",
    "Duas formas cumulativas do C1.",
    "Próximo passo de aprendizagem nomeado.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "이 글은 C1에서 고친 세 편의 글을 하나로 묶은 포트폴리오다. 첫 글은 배달 노동 기사를 비교하며, 같은 통계가 서로 다른 결론에 쓰이는 방식을 분석했다. 둘째 글은 청년 주거 지원을 조건부로 확대하자는 주장을 담고 있다. 초고에서는 비용 문제를 다루지 않았지만, 수정 과정에서 반론을 먼저 인정하고 지원의 조건을 논의하는 쪽으로 결론을 옮겼다. 셋째 글은 지역 상인과 청년 단체의 갈등을 중재한 기록이다. 나는 어느 쪽도 대표하지 않으려고 했고, 합의되지 않은 쟁점도 지우지 않았다. 세 글은 갈래가 다르지만 근거의 범위를 밝히는 절차를 공유한다. 글을 고치는 과정에서, 나는 주장을 약하게 만드는 것이 아니라 반대할 지점을 줄이는 편집을 익혔다. 남은 과제는 인용의 정확도다. 시간이 걸릴지언정 인용마다 전거를 표시하고, 원문에서의 역할도 함께 적겠다. 포트폴리오의 완결성은 글의 수가 아니라 이 절차를 얼마나 지켰는가에서 드러난다.",
    pt: "Este texto é um portfólio que reúne três textos revisados no C1. O primeiro compara matérias sobre trabalho de entrega e analisa como a mesma estatística é usada em conclusões diferentes. O segundo contém a defesa de uma ampliação condicional do apoio à moradia de jovens. O rascunho não tratava do custo, mas, no processo de revisão, reconheci primeiro a objeção e desloquei a conclusão para a discussão das condições do apoio. O terceiro é o registro da mediação de um conflito entre comerciantes locais e um coletivo de jovens. Tentei não representar nenhum dos lados e não apaguei os pontos não acordados. Os três textos têm gêneros diferentes, mas compartilham o procedimento de explicitar o alcance da evidência. Ao revisar os textos, aprendi uma edição que não enfraquece a tese, mas reduz os pontos de discordância. A tarefa que resta é a precisão das citações. Ainda que leve tempo, vou indicar a fonte de cada citação e registrar também seu papel no original. O acabamento do portfólio se revela não no número de textos, mas no quanto esse procedimento foi respeitado.",
    notePt: "Exemplo original de onze frases. O texto integra análise, argumento, mediação e revisão, com uma perda assumida e um próximo passo. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c08 — checkpoint final: amostra cumulativa do C1. */
export const C1_C08 = defineC1Checkpoint({
  id: "c1-c08", number: 8, moduleId: "c1-m08",
  title: "Desempenho C1 interno",
  objective: "Avaliar uma amostra cumulativa do C1 em leitura longa, escuta, gramática e produção controlada.",
  instructions: [
    "Responda aos 40 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
    "São necessários 32 acertos entre os 40 itens automáticos.",
  ],
  lessonIds: ["c1-l36", "c1-l37", "c1-l38", "c1-l39", "c1-l40"],
  prerequisites: [
    "c1-l36", "c1-l37", "c1-l38", "c1-l39", "c1-l40",
    "c1-c01", "c1-c02", "c1-c03", "c1-c04", "c1-c05", "c1-c06", "c1-c07",
  ],
  estimatedMinutes: 95,
  exercises: [
    listen("Ouça e escreva o primeiro passo diante de um artigo longo.", "장문의 글을 읽을 때에는 먼저 각 문단의 역할을 표시하는 것이 좋다.", "장문의 글을 읽을 때에는 먼저 각 문단의 역할을 표시하는 것이 좋다.", "Diante de um texto longo, é melhor marcar primeiro a função de cada parágrafo."),
    listen("Ouça e escreva o limite da generalização regional.", "표본이 한 지역에 치우쳐 있으면 결과를 전국으로 일반화하기 어렵다.", "표본이 한 지역에 치우쳐 있으면 결과를 전국으로 일반화하기 어렵다.", "Se a amostra está concentrada em uma região, é difícil generalizar o resultado para o país inteiro."),
    listen("Ouça e escreva a diferença entre divergência e contradição.", "세 자료가 서로 다른 질문에 답한다면, 그 차이는 모순이 아니라 범위의 차이다.", "세 자료가 서로 다른 질문에 답한다면, 그 차이는 모순이 아니라 범위의 차이다.", "Se os três materiais respondem a perguntas diferentes, a diferença não é contradição, mas diferença de alcance."),
    listen("Ouça e escreva a ordem da refutação.", "가장 강한 반론을 먼저 인정한 뒤에야 남은 쟁점을 정확히 다룰 수 있다.", "가장 강한 반론을 먼저 인정한 뒤에야 남은 쟁점을 정확히 다룰 수 있다.", "Só depois de reconhecer primeiro a objeção mais forte é possível tratar com precisão o ponto que resta."),
    listen("Ouça e escreva a concessão que preserva a transparência.", "비용이 늘어날지언정 판단의 근거를 감추어서는 안 된다.", "비용이 늘어날지언정 판단의 근거를 감추어서는 안 된다.", "Ainda que o custo aumente, não se deve esconder a base da decisão."),
    listen("Ouça e escreva o critério de uma correção editorial.", "문장을 고칠 때에는 무엇을 왜 바꾸었는지 설명할 수 있어야 한다.", "문장을 고칠 때에는 무엇을 왜 바꾸었는지 설명할 수 있어야 한다.", "Ao corrigir uma frase, é preciso conseguir explicar o que foi mudado e por quê."),
    listen("Ouça e escreva o dever mínimo de quem cita.", "인용의 전거를 밝히는 일은 글의 신뢰를 지키는 최소한의 절차다.", "인용의 전거를 밝히는 일은 글의 신뢰를 지키는 최소한의 절차다.", "Indicar a fonte documental da citação é o procedimento mínimo para preservar a credibilidade do texto."),
    listen("Ouça e escreva o alcance da obrigação de explicar.", "설명 의무는 모든 알고리즘의 공개가 아니라 판단 기준의 요약 공개를 뜻한다.", "설명 의무는 모든 알고리즘의 공개가 아니라 판단 기준의 요약 공개를 뜻한다.", "A obrigação de explicar não significa divulgar todos os algoritmos, mas o resumo dos critérios de julgamento."),
    listen("Ouça e escreva o princípio da mediação.", "중재에서는 어느 쪽의 요구도 지우지 않고 각각의 자리를 남겨야 한다.", "중재에서는 어느 쪽의 요구도 지우지 않고 각각의 자리를 남겨야 한다.", "Na mediação, não se deve apagar a demanda de nenhum lado: é preciso deixar o lugar de cada uma."),
    listen("Ouça e escreva de onde vem a completude do portfólio.", "포트폴리오의 완결성은 글의 수가 아니라 절차를 지킨 정도에서 드러난다.", "포트폴리오의 완결성은 글의 수가 아니라 절차를 지킨 정도에서 드러난다.", "O acabamento do portfólio se revela não no número de textos, mas no grau em que se respeitou o procedimento."),

    reading("배달 플랫폼 노동을 둘러싼 논쟁은 대개 ‘근로자로 인정할 것인가’라는 질문으로 좁혀진다. 그러나 이 글은 그 질문이 법적 지위에만 집중하다 보니 실제로 일하는 사람의 시간 배분을 놓친다고 본다. 필자는 최소 휴식 시간을 먼저 보장해야 한다고 주장한다.", "O que o artigo considera que a pergunta sobre o status jurídico deixa de lado?", ["A distribuição real do tempo de quem trabalha.", "O número de empresas de entrega.", "A opinião dos consumidores."], "A distribuição real do tempo de quem trabalha.", "O texto afirma que o foco no status jurídico faz perder de vista a distribuição do tempo."),
    reading("인터뷰 표본이 수도권에 치우쳐 있어 전국적 일반화에는 분명한 한계가 있다. 가장 강한 반론은 최소 휴식 시간이 노동자의 소득을 줄일 수 있다는 것이다. 필자도 이 점을 인정하며, 휴식 보장과 소득 보전을 함께 설계해야 한다고 덧붙인다.", "Como o autor trata a objeção sobre a renda?", ["Reconhece o risco e propõe proteger renda e descanso em conjunto.", "Nega que o descanso afete a renda dos trabalhadores.", "Propõe abandonar o recorte regional do estudo."], "Reconhece o risco e propõe proteger renda e descanso em conjunto.", "O autor concede o ponto e acrescenta a proteção da renda ao desenho da proposta."),
    reading("설문 조사와 행정 자료는 주거비 지원이 거주 기간을 늘리는 데 기여한다는 결과를 보여 준다. 반면 인터뷰 연구는 지원이 있어도 일자리를 따라 이동하는 청년이 적지 않다고 보고한다. 두 결과가 상충하는 것은 아니다.", "Por que os resultados não se contradizem?", ["Porque respondem a decisões diferentes: ficar e partir.", "Porque usam a mesma base de dados.", "Porque ambos foram feitos na mesma região."], "Porque respondem a decisões diferentes: ficar e partir.", "Cada material ilumina uma decisão distinta, não um erro do outro."),
    reading("세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다. 청년은 주거비뿐 아니라 일자리, 관계, 돌봄을 함께 고려해 이동한다. 따라서 지원의 효과는 ‘얼마나 오래 머무는가’만으로 평가할 수 없다.", "Qual é a consequência dessa convergência?", ["O tempo de permanência não basta como medida do efeito.", "O apoio deve ser avaliado apenas pelo orçamento.", "A entrevista substitui os outros dois materiais."], "O tempo de permanência não basta como medida do efeito.", "Se a mobilidade depende de vários fatores, medir só a permanência é insuficiente."),
    reading("이 글은 채용 과정에서 쓰이는 자동화된 심사 도구의 설명 의무를 주장한다. 필자는 지원자가 탈락 이유를 알 수 없을 때 절차에 대한 신뢰가 무너진다고 본다. 분석 대상은 100명 이상을 선별하는 기업의 1차 서류 심사로 한정한다.", "Qual é o recorte da proposta?", ["A triagem de currículo de empresas que selecionam mais de 100 pessoas.", "Todas as contratações do país, sem distinção.", "Apenas as entrevistas presenciais da empresa."], "A triagem de currículo de empresas que selecionam mais de 100 pessoas.", "O texto delimita o objeto à primeira triagem de empresas com mais de 100 candidatos."),
    reading("가장 강한 반론은 설명 의무가 기업에 과도한 비용을 지운다는 것이다. 필자는 이 반론을 인정하되, 모든 알고리즘의 공개가 아니라 판단 기준의 요약 공개로 범위를 좁힌다. 비용과 신뢰를 함께 고려하자는 판단이다.", "Como o autor responde à objeção do custo?", ["Aceita a objeção e restringe a exigência ao resumo dos critérios.", "Nega qualquer custo adicional.", "Transfere a obrigação para os candidatos."], "Aceita a objeção e restringe a exigência ao resumo dos critérios.", "O autor reconhece o custo e reduz o escopo da exigência."),
    reading("원고의 첫 문단은 ‘청년 정책이 실패했다’는 단정으로 시작했다. 편집자는 주장의 범위를 좁히고, 근거가 없는 ‘모두가 불만이다’라는 문장을 삭제하도록 요청했다. 수정된 문단은 ‘청년 주거 정책은 특정 지역에서 기대만큼 성과를 내지 못했다’로 시작한다.", "O que a revisão fez com a tese original?", ["Estreitou seu alcance e removeu a generalização sem base.", "Ampliou o alcance para todo o país.", "Manteve a tese e apenas mudou o título."], "Estreitou seu alcance e removeu a generalização sem base.", "A revisão limita o objeto e elimina a frase sem evidência."),
    reading("사례를 앞으로 옮긴 대신, 필자의 해석은 짧아졌다. 이 교환은 손실이 아니라 선택이다. 글은 짧아졌지만, 주장과 근거의 연결은 선명해졌다. 편집의 성과는 문장의 수가 아니라 독자가 따라갈 수 있는 논리의 길이로 측정된다.", "Como o texto avalia a troca feita na edição?", ["Como escolha consciente, com uma perda assumida.", "Como erro que será desfeito.", "Como mudança sem consequência."], "Como escolha consciente, com uma perda assumida.", "O texto nomeia a perda e a trata como decisão, não como acidente."),
    reading("세 글은 주제도 형식도 다르지만, 모두 근거의 범위를 밝히는 절차를 공유한다. 둘째 글에서는 반론을 먼저 인정하고 지원의 조건을 논의하는 쪽으로 결론을 옮겼다. 셋째 글에서는 두 집단의 요구를 각각 정리하고, 합의되지 않은 쟁점도 남겼다.", "O que une os três textos do portfólio?", ["O procedimento de explicitar o alcance da evidência.", "O mesmo gênero textual.", "A mesma quantidade de citações."], "O procedimento de explicitar o alcance da evidência.", "A unidade vem do procedimento, não do tema ou do gênero."),
    reading("되돌아보면, 남은 과제는 인용의 정확도다. 필자는 아직 원문의 맥락을 충분히 확인하지 않은 채 문장을 옮긴 적이 있다. 다음 학기에는 인용마다 전거를 표시하고, 인용한 문장이 원문에서 어떤 역할을 하는지 함께 적을 계획이다.", "Qual é o próximo passo declarado pelo autor?", ["Indicar a fonte de cada citação e registrar sua função no original.", "Deixar de citar qualquer texto para evitar novos erros.", "Publicar os três textos sem nenhuma revisão."], "Indicar a fonte de cada citação e registrar sua função no original.", "O autor transforma a falha identificada em procedimento para o próximo semestre."),

    cloze("Complete a circunstância: 물가가 오르는 ___ 임금은 거의 오르지 않았다.", "가운데", "-는 가운데 situa o pano de fundo em que o outro fato ocorre."),
    cloze("Complete a adição: 보고서는 근거가 부족한 ___ 결론도 성급하다.", "데다가", "-ㄴ/는 데다가 soma um segundo fato na mesma direção."),
    cloze("Complete a retomada formal da fonte: 인터뷰 연구가 밝힌 ___에 따르면, 청년은 일자리를 우선 고려한다.", "바", "-ㄴ/는 바 retoma formalmente o teor de uma fonte."),
    cloze("Complete a simultaneidade: 지원은 거주 기간을 늘리는 ___ 이동의 자유를 제한할 수 있다.", "동시에", "-ㄴ/는 동시에 liga dois fatos coexistentes."),
    cloze("Complete a concessão: 비용이 늘어날___ 판단의 근거를 감추지는 않겠다.", "지언정", "-ㄹ지언정 admite o custo e mantém uma recusa deliberada."),
    cloze("Complete a finalidade da correção: 문장이 길어서 두 문장으로 나누___ 고쳤다.", "도록", "-도록 고치다 explicita a finalidade da correção."),
    cloze("Complete a troca: 모든 발언을 기록하는 ___ 결정에 이른 이유만 남겼다.", "대신", "-ㄴ/는 대신 nomeia a troca e o custo assumido."),
    cloze("Complete o contexto do percurso: 세 편을 고치는 ___ 필자는 반론을 먼저 인정하는 절차를 익혔다.", "가운데", "-는 가운데 situa o contexto em que o aprendizado ocorreu."),

    translate("pt-ko", "Traduza: “Este artigo pretende examinar o alcance da obrigação de explicar.”", "이 글은 설명 의무의 범위를 검토하고자 한다.", "-고자 하다 declara a intenção em registro formal.", ["이 글은 설명 의무의 범위를 검토하고자 합니다."]),
    translate("ko-pt", "Traduza: 표본이 수도권에 치우쳐 있어 전국적 일반화에는 한계가 있다.", "Como a amostra está concentrada na região metropolitana, há um limite para a generalização nacional.", "치우쳐 있다 = estar concentrado/tendencioso; 일반화 = generalização.", ["A amostra está concentrada na região metropolitana, o que limita a generalização para todo o país."]),
    translate("pt-ko", "Traduza: “Em vez de aumentar o número de textos, escolhi revisar um até o fim.”", "글의 수를 늘리는 대신, 한 편을 끝까지 고치는 쪽을 택했다.", "-ㄴ/는 대신 nomeia a troca entre duas alternativas.", ["글의 수를 늘리는 대신, 한 편을 끝까지 고치는 쪽을 택했어요."]),
    translate("ko-pt", "Traduza: 세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다.", "O ponto em que os três materiais convergem é o fato de o custo de moradia não ser a única causa da mobilidade.", "수렴하는 지점 = ponto de convergência; 유일한 원인 = causa única.", ["Os três materiais convergem no fato de o custo de moradia não ser a única razão da mudança."]),
    translate("pt-ko", "Traduza: “Mesmo que o custo aumente, não vou esconder a base da decisão.”", "비용이 늘어날지언정 판단의 근거를 감추지는 않겠다.", "-ㄹ지언정 liga o custo aceito a uma recusa deliberada.", ["비용이 늘어날지언정 판단의 근거를 감추지는 않겠어요."]),
    translate("ko-pt", "Traduza: 문장이 짧아지도록 고쳤고, 사례를 늘리는 대신 근거의 범위를 분명히 했다.", "Editei para que as frases ficassem curtas e, em vez de aumentar os exemplos, deixei claro o alcance da evidência.", "도록 고치다 = corrigir para que; 대신 = em vez de.", ["Corrigi o texto para encurtar as frases e, em lugar de multiplicar exemplos, delimitei o alcance das evidências."]),
    translate("pt-ko", "Traduza: “A tarefa que resta é a precisão das citações.”", "남은 과제는 인용의 정확도다.", "남은 과제 = tarefa que resta; 정확도 = precisão.", ["남은 과제는 인용의 정확도입니다."]),
    translate("ko-pt", "Traduza: 세 편의 글은 갈래가 다르지만, 근거의 범위를 밝히는 절차를 공유한다.", "Os três textos têm gêneros diferentes, mas compartilham o procedimento de explicitar o alcance da evidência.", "갈래 = gênero; 절차를 공유한다 = compartilham o procedimento.", ["Embora os três textos pertençam a gêneros distintos, todos seguem o mesmo procedimento de delimitar o alcance das evidências."]),

    mcq("Qual pergunta ajuda a mapear um artigo longo?", ["Qual é a função de cada parágrafo na argumentação?", "Quantas palavras tem o artigo?", "Quem vai concordar com o texto?"], "Qual é a função de cada parágrafo na argumentação?", "O mapa argumentativo localiza tese, evidência, objeção e conclusão antes de resumir."),
    mcq("O que caracteriza uma síntese madura de três fontes?", ["Preserva a atribuição e explica convergências e divergências.", "Escolhe a fonte mais forte e ignora as outras.", "Junta as três conclusões em uma frase sem atribuição."], "Preserva a atribuição e explica convergências e divergências.", "Uma síntese madura mantém o lugar de cada voz e não apaga a divergência."),
    mcq("Qual movimento preserva a tese ao conceder um ponto ao adversário?", ["Admitir o custo com -ㄹ지언정 e manter uma recusa deliberada.", "Abandonar a tese assim que a objeção aparece.", "Ignorar a objeção e repetir a tese com outras palavras."], "Admitir o custo com -ㄹ지언정 e manter uma recusa deliberada.", "A concessão forte admite o preço sem abandonar o ponto defendido."),
    mcq("O que uma revisão final responsável exige?", ["Um motivo verificável para cada mudança e consciência do que se perdeu.", "Mudar o máximo de frases possível.", "Aumentar o texto para parecer mais completo."], "Um motivo verificável para cada mudança e consciência do que se perdeu.", "Editar é escolher com motivo e assumir a troca, não mudar por gosto pessoal."),
  ],
  production: PRODUCTION,
  minCorrect: 32,
});
