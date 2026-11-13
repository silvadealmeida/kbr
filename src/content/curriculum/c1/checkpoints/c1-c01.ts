import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero argumentativo pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "Cada parágrafo tem função própria e a argumentação avança em vez de repetir." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico do módulo, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém coerente." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A tese é delimitada, sustentada por evidência e responde a uma objeção real." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "A conclusão integra o que foi demonstrado e nomeia o que permanece em aberto." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · argumento condicional",
  promptPt: "Escreva um texto argumentativo curto sobre um tema do seu entorno. Delimite a tese, apresente uma evidência, reconstrua a objeção mais forte, conceda o que for válido e feche com uma conclusão condicional.",
  promptKo: "주장의 범위를 밝히고 반론을 공정하게 다루는 짧은 글을 써 보세요.",
  guidance: [
    "Delimite o objeto e o alcance da tese na abertura.",
    "Use uma forma de contraste ou adição vista no módulo.",
    "Apresente a objeção em sua versão mais forte, não na mais fácil.",
    "Diga explicitamente o que concede antes de responder.",
    "Feche nomeando o que ainda não foi demonstrado.",
  ],
  checklist: [
    "Tese delimitada e não universal.",
    "Evidência concreta com limite declarado.",
    "Objeção reconstruída com caridade.",
    "Concessão explícita antes da réplica.",
    "Conclusão condicional e coerente com o percurso.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "나는 학교 급식의 채식 선택권을 조건부로 확대해야 한다고 본다. 먼저 현재 급식은 모든 학생에게 같은 식단을 제공하지만, 채식이 필요한 학생의 비율은 학교마다 다르다. 한 고등학교의 설문에서는 응답자 420명 가운데 38명이 채식 선택을 원했다. 이 수치는 작아 보이지만, 해당 학생에게는 매일의 식사가 문제가 된다. 가장 강한 반론은 선택 식단이 비용과 운영 부담을 늘린다는 지적이다. 이 점은 타당하므로, 나는 모든 학교에 즉시 적용하자는 주장을 하지 않는다. 대신 수요가 확인된 학교에서 주 2회 시범 운영하고, 비용과 만족도를 함께 공개하는 조건을 제안한다. 근거가 부족한 확신보다 검증 가능한 절차가 우선이다.",
    pt: "Considero que a opção vegetariana na merenda escolar deve ser ampliada, com condições. Hoje a merenda oferece o mesmo cardápio a todos os alunos, mas a proporção de estudantes que precisam de alimentação vegetariana varia de escola para escola. Em uma pesquisa numa escola de ensino médio, 38 dos 420 respondentes disseram querer a opção vegetariana. Esse número pode parecer pequeno, mas, para esses estudantes, a refeição diária se torna um problema. A objeção mais forte é a crítica de que cardápios alternativos aumentam o custo e a carga operacional. Como esse ponto é válido, não defendo a aplicação imediata em todas as escolas. Em vez disso, proponho um piloto duas vezes por semana nas escolas em que a demanda foi confirmada, com divulgação conjunta de custos e satisfação. Procedimentos verificáveis vêm antes de convicções sem evidência.",
    notePt: "Exemplo original de oito frases. Observe a tese delimitada, o dado com limite, a objeção forte e a conclusão condicional. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c01 — avaliação do Módulo 1: tese, estrutura, evidência, refutação e apelo. */
export const C1_C01 = defineC1Checkpoint({
  id: "c1-c01", number: 1, moduleId: "c1-m01",
  title: "Checkpoint · Argumentação e persuasão",
  objective: "Avaliar tese, contra-tese, evidência, refutação e responsabilidade retórica do Módulo 1.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l01", "c1-l02", "c1-l03", "c1-l04", "c1-l05"],
  prerequisites: ["c1-l01", "c1-l02", "c1-l03", "c1-l04", "c1-l05"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual pergunta ajuda a delimitar o escopo de uma tese?", ["Que casos esta conclusão não pretende explicar?", "Quantas páginas o texto deve ter?", "Quem vai concordar comigo?"], "Que casos esta conclusão não pretende explicar?", "Delimitar o escopo exige dizer o que fica fora da conclusão, não apenas o que ela defende."),
    mcq("Um parágrafo que repete a tese sem acrescentar evidência ou objeção...", ["não cumpre função própria e deve ser fundido ou reescrito.", "fortalece a progressão do ensaio.", "serve obrigatoriamente como conclusão."], "não cumpre função própria e deve ser fundido ou reescrito.", "Repetição não é progressão: cada parágrafo precisa responder a uma pergunta nova."),
    mcq("Reconstruir a objeção em sua versão mais forte serve para...", ["responder ao argumento que realmente ameaça a tese.", "parecer neutro sem mudar a conclusão.", "evitar citar o adversário no texto."], "responder ao argumento que realmente ameaça a tese.", "A caridade interpretativa garante que a réplica enfrente a melhor crítica disponível."),

    cloze("Complete o contraste: 가격은 저렴한 데 ___ 품질은 뛰어나다.", "반해", "Com adjetivo, a forma é -(으)ㄴ 데 반해: 저렴한 데 반해."),
    cloze("Complete a adição: 이 제도는 비용을 줄일 ___ 만족도도 높인다.", "뿐더러", "-ㄹ 뿐더러 acrescenta um segundo fato na mesma direção."),
    cloze("Complete a origem do erro: 이 오해는 표본의 대표성을 확인하지 않은 데서 ___.", "비롯된다", "-는 데서 비롯된다 aponta a origem abstrata do problema."),
    cloze("Complete a concessão: 늦어질___ 보도를 왜곡하지는 않겠다.", "지언정", "-ㄹ지언정 liga o custo aceito a uma recusa deliberada."),
    cloze("Complete a inevitabilidade: 자료의 한계를 인정하지 ___ 수 없다.", "않을", "A forma é -지 않을 수 없다, distinta da obrigação de -아/어야 한다."),

    listen("Ouça e escreva o recorte declarado pelo artigo.", "이 글은 분석 대상을 개발 직군으로 한정하고, 결과의 적용 범위를 밝힌다.", "이 글은 분석 대상을 개발 직군으로 한정하고, 결과의 적용 범위를 밝힌다.", "Este artigo restringe o objeto às funções de desenvolvimento e esclarece o alcance dos resultados."),
    listen("Ouça e escreva o princípio de progressão do ensaio.", "결론은 앞 문단을 반복하지 않고 남은 질문에 답한다.", "결론은 앞 문단을 반복하지 않고 남은 질문에 답한다.", "A conclusão não repete o parágrafo anterior: responde à pergunta que restou."),
    listen("Ouça e escreva o limite interpretativo do estudo.", "관찰 연구의 결과를 인과관계로 해석하는 것은 아직 이르다.", "관찰 연구의 결과를 인과관계로 해석하는 것은 아직 이르다.", "Interpretar o resultado de um estudo observacional como relação causal ainda é precipitado."),
    listen("Ouça e escreva a diferença entre associação e causa.", "상관관계만으로 인과관계를 확증할 수는 없다.", "상관관계만으로 인과관계를 확증할 수는 없다.", "Não se pode confirmar uma relação causal apenas com uma correlação."),
    listen("Ouça e escreva a ordem que evita o adversário de palha.", "타당한 지적은 먼저 인정하고 남은 쟁점으로 넘어간다.", "타당한 지적은 먼저 인정하고 남은 쟁점으로 넘어간다.", "Reconheça primeiro a crítica válida e passe então ao ponto que resta."),
    listen("Ouça e escreva o limite do apelo emocional.", "감정에 호소하는 문장은 근거를 대신하지 못해요.", "감정에 호소하는 문장은 근거를 대신하지 못해요.", "Uma frase que apela à emoção não substitui a evidência."),

    reading("이 글은 수도권 중소 소프트웨어 기업 세 곳의 재택근무를 다루며, 분석 대상을 개발 직군으로 한정한다. 따라서 결과는 산업 전체가 아니라 비슷한 규모의 조직에만 시사점을 준다.", "O que a delimitação do escopo permite concluir?", ["Que a conclusão vale apenas para organizações semelhantes.", "Que o estudo representa toda a indústria.", "Que o recorte foi feito por falta de dados."], "Que a conclusão vale apenas para organizações semelhantes.", "O texto limita o alcance a organizações de porte e perfil semelhantes."),
    reading("둘째 문단은 근거를 제시하고, 셋째 문단은 반론을 검토한다. 넷째 문단은 반론에 답하며 남은 질문을 결론으로 이어 간다.", "Qual é a função do quarto parágrafo?", ["Responder à objeção e ligar o que resta à conclusão.", "Repetir a tese do primeiro parágrafo.", "Introduzir um tema novo sem relação com a tese."], "Responder à objeção e ligar o que resta à conclusão.", "O quarto parágrafo responde à objeção e conduz ao fechamento."),
    reading("관찰 연구는 두 변수의 관계를 보여 줄 뿐, 원인을 확증하지는 못한다. 표본의 대표성이 부족하면 그 관계를 전체 인구로 일반화하기도 어렵다.", "O que o texto afirma sobre estudos observacionais?", ["Mostram relação entre variáveis, mas não confirmam causalidade.", "Provam causalidade quando a amostra é grande.", "Não têm valor para a pesquisa aplicada."], "Mostram relação entre variáveis, mas não confirmam causalidade.", "O texto separa a relação observada da confirmação da causa."),
    reading("상대의 주장을 가장 강한 형태로 다시 말하는 일은 반박의 준비가 아니라 반박의 일부다. 약한 버전을 이기고 얻는 승리는 논점을 비켜 간 승리일 뿐이다.", "Por que reconstruir a objeção em sua versão mais forte?", ["Porque responder ao argumento mais forte é o que sustenta a refutação.", "Porque assim o adversário fica sem resposta.", "Porque evita citar a fonte original."], "Porque responder ao argumento mais forte é o que sustenta a refutação.", "A reconstrução faz parte da refutação; vencer uma versão fraca não decide o ponto."),
    reading("감정에 호소하는 문장은 근거를 대신하지 못한다. 독자가 느끼는 불안이 크다고 해서 정책의 효과가 커지는 것은 아니다.", "Qual é a relação entre apelo e evidência no texto?", ["O apelo pode acompanhar a evidência, mas não substituí-la.", "O apelo é mais confiável que os dados.", "A evidência dispensa qualquer consideração sobre o público."], "O apelo pode acompanhar a evidência, mas não substituí-la.", "O texto não condena a emoção; recusa que ela ocupe o lugar da prova."),
    reading("가장 강한 반론은 표본이 자발적 참여자로 구성되었다는 점이다. 이 한계를 인정하더라도, 반복 업무가 많은 직군에서는 근무 방식의 변화가 집중도에 영향을 줄 수 있다.", "Como o texto trata a limitação da amostra?", ["Reconhece o limite e restringe o alcance da conclusão.", "Nega o limite porque a amostra é grande.", "Abandona qualquer conclusão sobre o tema."], "Reconhece o limite e restringe o alcance da conclusão.", "O texto admite a autosseleção e mantém uma conclusão limitada ao contexto estudado."),

    translate("pt-ko", "Traduza: “O relatório não só carece de evidências, como também tem uma conclusão precipitada.”", "보고서는 근거가 부족할 뿐더러 결론도 성급하다.", "-ㄹ 뿐더러 soma a segunda falha na mesma direção.", ["보고서는 근거가 부족할 뿐만 아니라 결론도 성급하다."]),
    translate("ko-pt", "Traduza: 표본의 대표성이 부족하면 결과를 일반화하기 어렵다.", "Se falta representatividade à amostra, é difícil generalizar o resultado.", "대표성 = representatividade; 일반화하다 = generalizar.", ["Quando a amostra não é representativa, generalizar o resultado se torna difícil."]),
    translate("pt-ko", "Traduza: “Mesmo que os custos aumentem, não tomarei uma decisão sem evidências.”", "비용이 늘어날지언정 근거 없는 결정은 하지 않겠다.", "-ㄹ지언정 marca a concessão forte ligada a uma recusa deliberada.", ["비용이 늘어날지언정 근거 없는 결정은 하지 않겠습니다."]),
    translate("ko-pt", "Traduza: 이 글은 재택근무의 장기 효과를 검토하고자 한다.", "Este artigo pretende examinar os efeitos de longo prazo do trabalho remoto.", "-고자 한다 declara a intenção em registro formal.", ["Este artigo tem a intenção de examinar os efeitos de longo prazo do trabalho remoto."]),
    translate("pt-ko", "Traduza: “Não se pode deixar de mencionar o peso para os pais.”", "학부모의 부담을 언급하지 않을 수 없다.", "-지 않을 수 없다 expressa inevitabilidade, não obrigação externa.", ["학부모의 부담을 언급하지 않을 수 없습니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
