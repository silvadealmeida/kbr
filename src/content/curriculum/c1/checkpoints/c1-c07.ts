import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero de mediação ou de crítica pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As posições, o ponto em comum e o próximo passo aparecem em ordem reconhecível." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem repetição vazia." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém adequado ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A análise separa posição, interesse e efeito, e sustenta o julgamento com evidência do caso." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra a análise, nomeia o que resta em aberto e propõe uma correção verificável." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · mediar e representar",
  promptPt: "Descreva uma situação em que duas partes divergem sobre o uso de um espaço ou de um recurso cultural. Reformule a posição de cada lado em termos de interesse, mostre o que as duas versões compartilham e analise um risco de representação envolvido no caso. Feche com uma correção de procedimento e com o ponto que ainda precisa ser decidido.",
  promptKo: "두 편의 입장을 공정하게 정리하고, 재현의 위험을 검토한 뒤 책임 있는 수정안을 제시해 보세요.",
  guidance: [
    "Comece pela situação e pelos participantes, sem atribuir culpa.",
    "Reformule cada posição com uma forma de perspectiva ou de definição vista no módulo.",
    "Diga o que as duas partes têm em comum antes de propor qualquer solução.",
    "Separe a intenção declarada do efeito observável.",
    "Proponha uma mudança de procedimento, não apenas um pedido de desculpas.",
    "Termine com o critério de julgamento e com o que permanece em aberto.",
  ],
  checklist: [
    "Duas posições reformuladas sem distorção.",
    "Interesse comum explicitado.",
    "Risco de representação nomeado com evidência do caso.",
    "Intenção e efeito distinguidos.",
    "Correção de procedimento verificável.",
    "Ponto em aberto declarado no fechamento.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "한 마을 축제에서 지역 농민과 사진 동호회가 김장 체험 행사를 두고 의견을 나누었다. 농민 입장에서는 체험보다 실제 노동의 가치를 알리고 싶었고, 동호회 입장에서는 방문객이 즐길 수 있는 장면이 필요했다. 두 요구는 달라 보였지만, 마을의 일을 더 많은 사람에게 보여 주려 한다는 점에서는 같았다. 문제는 홍보 사진이 손과 항아리만 강조하고 참여자의 이름과 역할을 지운 데 있었다. 의도가 홍보였다고 해서 효과까지 정당화되는 것은 아니다. 그래서 촬영 전에 농민 자문을 받고, 게시 전에 당사자의 검수를 거치며, 체험 수익의 일부를 마을 기금에 돌리기로 했다. 남은 결정은 사진의 사용 기간과 철회 절차다.",
    pt: "Em um festival de vilarejo, agricultores locais e um clube de fotografia discutiram uma atividade de experiência com kimchi. Do ponto de vista dos agricultores, o objetivo era divulgar o valor do trabalho real, mais do que a experiência; do ponto de vista do clube, era preciso ter cenas de que os visitantes pudessem gostar. Os dois pedidos pareciam diferentes, mas se igualavam no desejo de mostrar o trabalho do vilarejo a mais gente. O problema estava no fato de as fotos de divulgação destacarem apenas mãos e potes, apagando nomes e papéis dos participantes. O fato de a intenção ter sido divulgar não justifica o efeito. Por isso, decidiram consultar os agricultores antes da gravação, passar pela verificação das pessoas retratadas antes da publicação e destinar parte da receita da experiência a um fundo do vilarejo. A decisão que resta é o prazo de uso das fotos e o procedimento de retirada.",
    notePt: "Exemplo original de oito frases. Observe a reformulação das duas posições, a distinção entre intenção e efeito e a correção de procedimento. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c07 — avaliação do Módulo 7: mediação, reformulação, cultura, pertencimento e ética. */
export const C1_C07 = defineC1Checkpoint({
  id: "c1-c07", number: 7, moduleId: "c1-m07",
  title: "Checkpoint · Mediação e interculturalidade",
  objective: "Avaliar mediação, reformulação, conceito cultural, pertencimento e ética do Módulo 7.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l31", "c1-l32", "c1-l33", "c1-l34", "c1-l35"],
  prerequisites: ["c1-l31", "c1-l32", "c1-l33", "c1-l34", "c1-l35", "c1-c01", "c1-c02", "c1-c03", "c1-c04", "c1-c05", "c1-c06"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Em mediação, qual é a diferença entre posição e interesse?", ["A posição é o que a parte pede; o interesse é o que ela quer proteger.", "A posição é sempre falsa; o interesse é sempre declarado.", "São dois nomes para a mesma demanda."], "A posição é o que a parte pede; o interesse é o que ela quer proteger.", "Separar pedido e interesse permite reformular sem transformar a conversa em votação."),
    mcq("Ao reformular um texto técnico para o público geral, o que deve ser preservado?", ["As condições e o alcance da conclusão.", "Todos os termos técnicos, sem exceção.", "O nome dos autores, mesmo que irrelevante."], "As condições e o alcance da conclusão.", "Acessibilidade não autoriza apagar as condições que limitam a conclusão."),
    mcq("Qual distinção orienta a crítica ética de uma representação cultural?", ["Entre a intenção declarada e o efeito produzido pela composição.", "Entre o orçamento da campanha e o número de visualizações.", "Entre a nacionalidade dos produtores e a dos espectadores."], "Entre a intenção declarada e o efeito produzido pela composição.", "A ética da representação examina o efeito e o procedimento, sem reduzir tudo à intenção."),

    cloze("Complete a reformulação: 두 팀 모두 중요한 일을 놓치지 않으려는 ___에서는 같다.", "입장", "-ㄴ/는 입장에서는 apresenta a perspectiva de quem ocupa uma posição."),
    cloze("Complete a finalidade: 주민들이 조건을 이해할 수 ___ 설명 자료를 만들었다.", "있게", "-ㄹ 수 있게 indica a possibilidade prática criada pelo material."),
    cloze("Complete a cautela: 집단 전체를 하나의 성격으로 ___할 위험이 있다.", "본질화", "본질화 é o risco de transformar práticas variáveis em essência do grupo."),
    cloze("Complete a consequência inferida: 내가 침묵하면 다른 사람이 나를 설명하는 ___이다.", "셈", "A forma é -ㄴ/는 셈이다, que apresenta uma consequência calculada."),
    cloze("Complete a correção: 촬영 전에 지역 주민의 ___을 거쳐야 한다.", "자문", "자문 é a consulta prévia às pessoas que conhecem o contexto."),

    listen("Ouça e escreva o princípio da mediadora.", "중재자는 어느 쪽의 편도 들지 않고 남은 쟁점을 기록으로 남겼다.", "중재자는 어느 쪽의 편도 들지 않고 남은 쟁점을 기록으로 남겼다.", "A mediadora não ficou do lado de ninguém e registrou os pontos que restaram."),
    listen("Ouça e escreva a condição que a mediadora cria para as duas equipes.", "두 팀이 기준을 함께 만들 수 있도록 중재자가 초안을 준비했다.", "두 팀이 기준을 함께 만들 수 있도록 중재자가 초안을 준비했다.", "A mediadora preparou um rascunho para que as duas equipes pudessem construir o critério juntas."),
    listen("Ouça e escreva o que a paráfrase não é.", "환언은 같은 내용을 다른 말로 옮기는 작업이 아니다.", "환언은 같은 내용을 다른 말로 옮기는 작업이 아니다.", "Parafrasear não é passar o mesmo conteúdo para outras palavras."),
    listen("Ouça e escreva por onde começa a explicação de uma cultura.", "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다.", "문화를 설명하는 일은 그 문화의 특수성을 인정하는 데서 시작한다.", "Explicar uma cultura começa por reconhecer a particularidade dessa cultura."),
    listen("Ouça e escreva o limite que a narradora declara.", "나는 우리 집단을 대변할 수 없고, 내가 본 것만 말할 수 있다.", "나는 우리 집단을 대변할 수 없고, 내가 본 것만 말할 수 있다.", "Não posso falar em nome do meu grupo; posso falar apenas do que vi."),
    listen("Ouça e escreva o critério que deve orientar a decisão.", "민감한 소재일수록 결정의 근거를 공개해야 한다.", "민감한 소재일수록 결정의 근거를 공개해야 한다.", "Quanto mais sensível o tema, mais público deve ser o fundamento das decisões."),

    reading("표면적으로는 알림의 수를 줄이자는 요구와 늘리자는 요구가 맞섰지만, 중재자는 두 팀의 입장차를 그대로 옮기지 않고 각 팀이 지키려는 것을 따로 적었다. 디자인팀의 관점에서는 집중을 방해받지 않는 시간이 중요했고, 고객지원팀의 관점에서는 긴급한 문의를 놓치지 않는 절차가 중요했다.", "O que a mediadora registrou separadamente?", ["O que cada equipe queria preservar.", "Quem chegou primeiro à reunião.", "O orçamento de cada equipe."], "O que cada equipe queria preservar.", "O texto opõe os pedidos e mostra que a mediadora anotou à parte o que cada lado protegia."),
    reading("중재 기록에는 당사자의 발언과 중재자의 정리를 구분해 적었다. 예를 들어 ‘알림을 절반으로 줄여야 한다’는 발언은 요구로, ‘집중 시간을 지키고 싶다’는 설명은 이해관계로 분류했다. 이렇게 나누면 상대의 말을 반박하지 않고도 다시 말할 수 있다.", "Por que separar pedido e interesse no registro?", ["Para poder reformular sem refutar a fala do outro.", "Para decidir rapidamente quem tem razão.", "Para eliminar a necessidade de uma nova reunião."], "Para poder reformular sem refutar a fala do outro.", "O registro separa os dois planos justamente para permitir a reformulação fiel."),
    reading("요약본에는 ‘단기 노출’이라는 조건이 있었지만 보도 자료에는 빠져 있었다. 난이도를 낮추는 일과 조건을 지우는 일은 다르다. 독자가 결론을 어디까지 적용할 수 있는지 알 수 있게 하는 것이 설명의 목표다.", "O que o texto critica na versão de divulgação?", ["A omissão de uma condição presente no resumo.", "O excesso de analogias no texto original.", "A presença de números no release."], "A omissão de uma condição presente no resumo.", "A condição de exposição de curto prazo desapareceu, o que amplia indevidamente a conclusão."),
    reading("품앗이는 20세기 후반까지 널리 쓰였지만, 농기계와 임금 노동이 보급되면서 줄었다. 지금도 일부 마을에서는 이웃 간의 도움으로 남아 있지만, 모든 한국인이 품앗이를 경험했다고 말할 수는 없다. 호칭과 위계가 관계를 규정했던 방식도 세대에 따라 달랐다.", "O que o texto evita ao situar o 품앗이?", ["Generalizar a prática a todos os coreanos e a todas as gerações.", "Reconhecer que a prática mudou ao longo do tempo.", "Mencionar a diferença entre áreas rurais e urbanas."], "Generalizar a prática a todos os coreanos e a todas as gerações.", "O texto recorta período, região e geração para não transformar a prática em essência nacional."),
    reading("나는 우리 집단을 대변할 수 없다. 대신 내가 본 것과 기억하는 것을 말할 수 있다. 그 차이를 분명히 하면, 독자는 한 사람의 이야기를 전체로 착각하지 않게 된다. 그러나 개인의 경험이 곧 집단의 정형화된 이미지를 확인해 주는 자료가 되어서는 안 된다.", "Qual é o limite que a narradora estabelece?", ["Ela narra a própria experiência, mas não fala pelo grupo.", "Ela recusa qualquer relato em primeira pessoa.", "Ela afirma que o grupo inteiro tem a mesma experiência."], "Ela narra a própria experiência, mas não fala pelo grupo.", "A narradora distingue experiência individual e representação coletiva."),
    reading("카메라가 손과 항아리만 비추고, 실제로 일하는 사람의 이름과 목소리는 들리지 않는다. 이국취향은 낯선 것을 아름답게 만드는 데 그치지 않고, 그 노동을 보이지 않게 한다. 문화의 상품화는 참여자의 동의와 보상을 가리기 쉽다.", "O que a análise destaca na composição do vídeo?", ["A invisibilidade do trabalho e das condições de quem participa.", "A qualidade técnica da fotografia e da edição.", "A duração curta do vídeo e o formato vertical."], "A invisibilidade do trabalho e das condições de quem participa.", "O texto aponta que o enquadramento esconde trabalho, consentimento e remuneração."),

    translate("pt-ko", "Traduza: “Do ponto de vista da equipe de design, o problema é o fluxo de trabalho.”", "디자인팀 입장에서는 업무 흐름이 문제다.", "-ㄴ/는 입장에서는 introduz a perspectiva sem endossá-la.", ["디자인팀의 입장에서는 업무 흐름이 문제다."]),
    translate("ko-pt", "Traduza: 난이도를 낮추는 일과 조건을 지우는 일은 다르다.", "Reduzir a dificuldade e apagar as condições são coisas diferentes.", "A frase separa acessibilidade de omissão das condições do estudo."),
    translate("pt-ko", "Traduza: “Não se pode explicar o conceito sem indicar o período e a região.”", "시기와 지역을 밝히지 않고 그 개념을 설명할 수는 없다.", "A frase mantém a exigência de contexto e recusa a generalização.", ["시기와 지역을 밝히지 않으면 그 개념을 설명하기 어렵다."]),
    translate("ko-pt", "Traduza: 소속감은 하나의 이름표로 정리되지 않는다.", "O senso de pertencimento não se organiza em uma única etiqueta.", "소속감 = senso de pertencimento; a frase recusa reduzir pertencimento a um rótulo."),
    translate("pt-ko", "Traduza: “A boa intenção não isenta o efeito da crítica.”", "선한 의도가 효과를 비판에서 면제해 주지는 않는다.", "A frase separa intenção e efeito, sem negar que a intenção exista.", ["선한 의도가 있다고 해서 효과가 비판에서 자유로운 것은 아니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
