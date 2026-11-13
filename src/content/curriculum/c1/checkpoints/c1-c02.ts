import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero de leitura crítica e síntese pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria: pressuposto, comparação, método, síntese ou posição avançam em ordem reconhecível." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico do módulo, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém coerente." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A análise distingue o afirmado do pressuposto e calibra a conclusão pelo que a fonte permite." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra as fontes, preserva divergências e nomeia o que permanece em aberto." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · síntese com posição",
  promptPt: "Escreva uma síntese de três fontes sobre um tema do seu entorno e termine com uma posição própria. Separe convergência, divergência e lacuna; diga o que cada fonte permite concluir; declare o critério da sua escolha e a incerteza que permanece.",
  promptKo: "세 자료를 종합한 뒤 기준과 불확실성을 밝히면서 자신의 입장을 써 보세요.",
  guidance: [
    "Identifique as três fontes e o alcance de cada uma antes de comparar.",
    "Separe o que as fontes compartilham do que só uma delas sustenta.",
    "Use uma forma de comparação ou contraste vista no módulo.",
    "Declare o critério da sua posição antes da conclusão.",
    "Nomeie a lacuna que nenhuma fonte cobre e o dado que poderia mudar sua decisão.",
  ],
  checklist: [
    "Três fontes com alcances distintos.",
    "Convergência e divergência explicitadas.",
    "Atribuição correta de cada afirmação.",
    "Critério da posição declarado.",
    "Incerteza residual e condição de revisão nomeadas.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "이 글은 도시 공원의 야간 개방을 다룬 세 자료를 종합한다. 첫 자료는 전국 성인 2,000명 설문으로, 찬성 68퍼센트라는 분포를 보여 준다. 둘째 자료는 공원 인근 주민 12명 인터뷰로, 조명과 소음에 대한 구체적 우려를 담고 있다. 셋째 자료는 경찰 신고 기록 분석으로, 야간 개방 이후 공원 주변 사고가 유의미하게 늘지 않았다고 보고한다. 세 자료의 공통점은 이용 시간이 늘어날 가능성이다. 설문은 여론의 분포를 보여 주는 동시에 이유를 설명하지 못한다. 인터뷰는 우려의 내용을 설명하는 한편으로, 그 우려가 얼마나 흔한지는 알려 주지 않는다. 나는 안전과 접근성을 기준으로 제한적 개방을 지지한다. 다만 신고되지 않은 사고가 남아 있으므로, 6개월 뒤 사고와 소음 민원을 함께 공개해야 한다.",
    pt: "Este texto sintetiza três fontes sobre a abertura noturna de parques urbanos. A primeira é um questionário com 2.000 adultos de todo o país, que mostra uma distribuição de 68% de apoio. A segunda é uma entrevista com 12 moradores próximos ao parque, que traz preocupações concretas com iluminação e ruído. A terceira analisa registros de ocorrências policiais e relata que, após a abertura noturna, os acidentes ao redor do parque não aumentaram de forma significativa. O ponto em comum das três fontes é a possibilidade de aumento do tempo de uso. O questionário mostra a distribuição da opinião e, ao mesmo tempo, não explica as razões. A entrevista, por um lado, explica o conteúdo das preocupações; por outro, não informa o quanto elas são comuns. Com base nos critérios de segurança e acessibilidade, apoio uma abertura restrita. No entanto, como ainda existem acidentes não notificados, seis meses depois é preciso divulgar juntos os acidentes e as reclamações de ruído.",
    notePt: "Exemplo original de oito frases. A síntese atribui cada afirmação, separa convergência e lacuna e fecha com critério e condição de revisão. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c02 — avaliação do Módulo 2: pressuposição, fontes, método, síntese e posição. */
export const C1_C02 = defineC1Checkpoint({
  id: "c1-c02", number: 2, moduleId: "c1-m02",
  title: "Checkpoint · Leitura crítica e síntese",
  objective: "Avaliar pressuposição, comparação de fontes, método, síntese e posição do Módulo 2.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido, o alcance e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l06", "c1-l07", "c1-l08", "c1-l09", "c1-l10"],
  prerequisites: ["c1-l06", "c1-l07", "c1-l08", "c1-l09", "c1-l10", "c1-c01"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual pergunta separa o que um título afirma do que ele pressupõe?", ["O que precisa ser verdade para que esta frase faça sentido, sem que o texto demonstre?", "Quantas palavras tem o título?", "Quem publicou a matéria?"], "O que precisa ser verdade para que esta frase faça sentido, sem que o texto demonstre?", "O pressuposto é a condição não demonstrada que o título apresenta como evidente."),
    mcq("Duas fontes com métodos diferentes devem ser comparadas...", ["com um critério declarado, como escala, profundidade ou período.", "somando os resultados em uma média única.", "pelo número de páginas de cada uma."], "com um critério declarado, como escala, profundidade ou período.", "Sem critério, a comparação trata fontes desiguais como equivalentes."),
    mcq("Uma síntese que preserva divergências deve...", ["atribuir cada afirmação à fonte e indicar onde as conclusões se separam.", "escolher o estudo mais recente como vencedor.", "omitir os resultados contrários para manter a fluidez."], "atribuir cada afirmação à fonte e indicar onde as conclusões se separam.", "Atribuição e localização da divergência tornam a síntese verificável."),

    cloze("Complete o efeito do enquadramento: 첫 제목은 연구가 지능까지 측정한 ___을 준다.", "인상", "-는 인상을 준다 descreve o efeito sem endossá-lo como fato."),
    cloze("Complete o limite da entrevista: 인터뷰는 자발적으로 참여한 주민 12명의 진술일 ___.", "따름이다", "-ㄹ 따름이다 reduz a afirmação ao mínimo que a fonte sustenta."),
    cloze("Complete a inferência sobre autosseleção: 제도에 우호적인 사람들이 포함되었을 ___이 높다.", "개연성", "-ㄹ 개연성이 높다 expressa hipótese provável, não certeza."),
    cloze("Complete a convergência: 세 연구의 ___은 유연성이 학습 관리에 영향을 준다는 것이다.", "공통점", "A síntese separa o ponto comum das divergências e da lacuna."),
    cloze("Complete a concessão: 전면 금지가 사고를 즉시 줄일 수 있다는 주장에는 ___이 있다.", "설득력", "Reconhecer a força do adversário sustenta uma posição honesta."),

    listen("Ouça e escreva o que a leitura crítica verifica.", "비판적 읽기는 모든 전제를 의심하는 일이 아니라, 어떤 전제가 본문의 근거로 지지되는지 확인하는 일이다.", "비판적 읽기는 모든 전제를 의심하는 일이 아니라, 어떤 전제가 본문의 근거로 지지되는지 확인하는 일이다.", "A leitura crítica não é desconfiar de todo pressuposto, mas verificar qual pressuposto é sustentado pelas evidências do texto."),
    listen("Ouça e escreva o limite do survey nacional.", "설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다.", "설문은 여론의 분포를 추정할 수 있게 하지만, 경험의 이유를 설명하지 못한다.", "O questionário permite estimar a distribuição da opinião, mas não explica as razões da experiência."),
    listen("Ouça e escreva o limite de generalização do estudo.", "전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다.", "전국 콜센터에 적용할 근거로 쓰기에는 외적 타당도가 부족하다.", "Para servir de base a uma aplicação em todos os call centers do país, falta validade externa."),
    listen("Ouça e escreva o que nenhuma das três fontes cobre.", "어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "Nenhum dos estudos tratou da retenção de conhecimento depois da formatura."),
    listen("Ouça e escreva o objetivo da síntese.", "종합의 목적은 갈등을 지우는 것이 아니라, 갈등의 위치를 정확히 표시하는 것이다.", "종합의 목적은 갈등을 지우는 것이 아니라, 갈등의 위치를 정확히 표시하는 것이다.", "O objetivo da síntese não é apagar o conflito, mas indicar com precisão onde ele está."),
    listen("Ouça e escreva como a autora classifica a própria escolha.", "이 선택은 확신이 아니라 우선순위에 따른 판단이다.", "이 선택은 확신이 아니라 우선순위에 따른 판단이다.", "Esta escolha é um julgamento baseado em prioridades, não uma certeza."),

    reading("A 신문은 이 결과를 ‘종이책 읽는 아이가 더 똑똑하다’는 제목으로 보도했다. 이 제목에는 두 가지 전제가 숨어 있다. 첫째, 집중 시간이 지능과 같다는 전제다. 둘째, 책을 읽는 습관이 아이의 능력을 결정한다는 전제다.", "Qual pressuposto o título do jornal A introduz?", ["Que o tempo de concentração medido equivale à inteligência da criança.", "Que o estudo avaliou os hábitos de leitura dos pais.", "Que as crianças leram os mesmos livros no tablet."], "Que o tempo de concentração medido equivale à inteligência da criança.", "O título transforma uma medida de concentração em afirmação sobre inteligência."),
    reading("B 신문의 제목은 ‘같은 시간 읽어도 화면보다 종이에서 집중 유지’였다. 이 제목은 비교의 범위를 읽는 시간과 집중에 한정한다. 본문은 표본이 120명에 불과하고, 부모의 독서 습관을 통제하지 못했다는 점을 밝힌다.", "O que diferencia o título do jornal B?", ["Ele limita a comparação ao que foi medido e o corpo da matéria declara os limites.", "Ele generaliza o resultado para todas as crianças do país.", "Ele omite o tamanho da amostra."], "Ele limita a comparação ao que foi medido e o corpo da matéria declara os limites.", "O título B restringe o alcance e o texto informa os limites do estudo."),
    reading("표본은 지역과 연령을 고려해 배분되었지만, 온라인 패널에 스스로 가입한 사람들로 구성되었다는 한계가 있다. 이 자료가 보여 주는 것은 전국적 여론의 대략적인 분포다. 특정 공원의 소음이나 조명 문제를 설명하지는 못한다.", "O que a primeira fonte permite afirmar?", ["A distribuição aproximada da opinião nacional, não os problemas de um parque específico.", "As razões individuais de cada morador.", "O nível exato de ruído noturno."], "A distribuição aproximada da opinião nacional, não os problemas de um parque específico.", "O survey estima distribuição e não explica experiência local."),
    reading("수면 시간은 기기 기록과 자기 보고를 함께 사용해 측정했으므로 내적 타당도는 어느 정도 확보되었다. 반면 상담 건수는 업무량 자체가 늘었을 가능성을 배제하지 못한다. 8주 동안 신규 상담이 증가했다면, 집중도가 아니라 업무량이 결과를 만들었을 수 있다.", "Qual é o confundidor apontado no texto?", ["O aumento do volume de trabalho pode explicar o aumento dos atendimentos.", "A medição do sono foi feita apenas por autorrelato.", "Todos os participantes tinham o mesmo tempo de casa."], "O aumento do volume de trabalho pode explicar o aumento dos atendimentos.", "O texto mostra que o volume de trabalho não foi controlado e pode ter produzido o resultado."),
    reading("공통점은 유연성이 학습 관리에 영향을 준다는 점이다. 반면 성취도에 대해서는 긍정적 결과와 부정적 결과가 동시에 존재한다. 어느 연구도 졸업 후의 지식 유지까지 다루지는 않았다.", "Como a síntese trata os resultados de desempenho?", ["Preserva a divergência em vez de escolher um único vencedor.", "Soma os resultados para calcular uma média.", "Descarta os estudos que divergem."], "Preserva a divergência em vez de escolher um único vencedor.", "A síntese reconhece resultados positivos e negativos e não os apaga."),
    reading("다만 이 결론에는 남는 불확실성이 있다. 신고되지 않은 사고가 얼마나 되는지 알 수 없고, 사고 건수에는 킥보드 이용자와 보행자가 함께 포함되어 있다. 그럼에도 위치별 사고 분포가 뚜렷한 이상, 아무 조치도 하지 않을 수는 없다.", "Como a autora justifica a decisão apesar da incerteza?", ["Nomeia o que não sabe e decide com base na distribuição já observada.", "Afirma que os dados estão completos.", "Espera até que todos os acidentes sejam notificados."], "Nomeia o que não sabe e decide com base na distribuição já observada.", "A autora declara a incerteza residual e ainda assim sustenta uma providência mínima."),

    translate("pt-ko", "Traduza: “O primeiro título dá a impressão de que o estudo mediu a inteligência.”", "첫 번째 제목은 연구가 지능을 측정한 인상을 준다.", "-ㄴ/는 인상을 준다 atribui o efeito ao título, sem endossá-lo.", ["첫 제목은 연구가 지능까지 측정한 인상을 준다."]),
    translate("ko-pt", "Traduza: 설문은 규모가 큰 데 비해, 인터뷰는 경험의 깊이가 있다.", "Enquanto o questionário tem grande escala, a entrevista tem profundidade de experiência.", "-ㄴ/는 데 비해 compara as duas fontes em uma dimensão explícita.", ["O questionário tem grande escala; a entrevista, em contrapartida, tem profundidade de experiência."]),
    translate("pt-ko", "Traduza: “Com base em uma amostra de 40 pessoas, não se pode recomendar o sistema a todo o país.”", "표본 40명을 근거로 전국에 제도를 권고할 수 없다.", "-을 근거로 indica a base da recomendação; aqui, uma base insuficiente.", ["40명 표본을 근거로 전국에 같은 제도를 권고할 수는 없다."]),
    translate("ko-pt", "Traduza: 인터뷰는 이유를 설명하는 한편으로, 빈도는 말해 주지 않는다.", "A entrevista, por um lado, explica as razões; por outro, não informa a frequência.", "-ㄴ/는 한편으로 apresenta dois aspectos coexistentes da mesma fonte.", ["A entrevista explica as razões, mas não diz com que frequência elas ocorrem."]),
    translate("pt-ko", "Traduza: “Já que os acidentes se concentram em um trecho, é preciso limitar a velocidade ali.”", "사고가 한 구간에 집중된 이상, 그곳에서는 속도를 제한할 수밖에 없다.", "-ㄴ/는 이상 estabelece a condição aceita; -ㄹ 수밖에 없다 marca a consequência inevitável.", ["사고가 한 구간에 집중된 이상, 그 구간부터 속도를 제한해야 한다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
