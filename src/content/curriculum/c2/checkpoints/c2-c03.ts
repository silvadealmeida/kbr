import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume a tarefa de reconstruir, testar ou reformular um argumento, e não apenas de emitir opinião sobre o tema." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise segue uma ordem reconhecível: formulação, premissa ou analogia, consequência ou concessão, limite e fechamento." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso da argumentação, inclusive itens do módulo, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se ajusta ao gênero e ao destinatário do texto." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A premissa, a analogia, a reductio, a concessão ou o apelo é apresentado com caridade e tem seu alcance delimitado." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a posição do outro para um terceiro sem caricatura, sem apagar o desacordo e sem transferir responsabilidade." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · argumentar e delimitar",
  promptPt: "Escolha uma proposta pública — uma regra da escola, uma mudança no trabalho, uma obra no bairro. Em um texto único, reconstrua a premissa oculta que a sustenta, teste-a com uma analogia ou uma reductio, faça uma concessão ao lado contrário e feche com uma conclusão proporcional à evidência e um apelo com destinatário e ação concretos.",
  promptKo: "공공 제안을 하나 골라 숨은 전제를 드러내고, 비유나 귀류법으로 시험한 뒤, 상대의 지적을 일부 인정하고, 근거에 맞는 결론과 구체적인 촉구로 마무리해 보세요.",
  guidance: [
    "Comece pela formulação original, sem já enfraquecê-la.",
    "Formule a premissa oculta e diga se ela é aceitável.",
    "Use uma analogia com limite declarado ou uma reductio que preserve a posição original.",
    "Faça uma concessão específica ao lado contrário e diga o que permanece em disputa.",
    "Feche com uma conclusão que não ultrapasse a evidência.",
    "Nomeie destinatário, ação e prazo no apelo final.",
  ],
  checklist: [
    "Premissa oculta formulada.",
    "Analogia ou reductio com limite declarado.",
    "Concessão específica e ponto em disputa nomeado.",
    "Conclusão proporcional à evidência.",
    "Apelo com destinatário, ação e prazo.",
    "Registro adequado ao gênero escolhido.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "우리 학교는 다음 달부터 교내 매점에서 탄산음료를 전면 판매 금지하기로 했다. 제안의 숨은 전제는 ‘탄산음료를 팔지 않으면 학생들의 건강이 좋아진다’는 것이다. 그러나 이것은 자판기 하나를 없애는 일과 건강 사이에 인과관계가 있다고 가정한다. 나는 이 전제를 인정하지 않는다. 학생들은 등굣길 편의점에서 같은 음료를 살 수 있기 때문이다. 물론 반대쪽 지적도 인정한다. 학교가 건강한 환경을 만들 책임이 있다는 점, 그리고 당분 섭취를 줄이는 것이 중요하다는 점은 타당하다. 그래서 나는 판매 금지 대신 가격과 종류를 조정하는 타협안을 제안한다. 예를 들어 탄산음료는 줄이고 물과 무가당 음료를 늘리되, 학생 대표가 다음 학기까지 이용 실태를 조사하게 하는 방식이다. 결론은 분명하다. 전면 금지는 근거보다 큰 조치다. 학교는 다음 달까지 조사 계획을 공개하고, 학생과 학부모의 의견을 듣도록 촉구한다. 나는 이 제안이 건강 개선을 보장하지는 않는다는 점을 인정한다. 그래도 규칙의 목적과 범위를 분명히 한다는 점에서, 지금의 일괄 금지보다 낫다.",
    pt: "A partir do mês que vem, nossa escola proibirá totalmente a venda de refrigerantes na cantina. A premissa oculta da proposta é que ‘se não vendermos refrigerantes, a saúde dos estudantes melhora’. Mas isso pressupõe uma relação causal entre eliminar uma máquina e a saúde. Não aceito essa premissa, porque os estudantes podem comprar a mesma bebida na loja de conveniência no caminho para a escola. É claro que também reconheço a crítica do outro lado. É válido que a escola tem responsabilidade de criar um ambiente saudável e que reduzir o consumo de açúcar é importante. Por isso, em vez da proibição total, proponho uma solução negociada que ajuste preços e variedades. Por exemplo, reduzir os refrigerantes e aumentar a água e as bebidas sem açúcar, deixando que representantes dos alunos pesquisem os hábitos de consumo até o próximo semestre. A conclusão é clara: a proibição total é uma medida maior do que a evidência sustenta. Exortamos a escola a divulgar o plano de pesquisa até o próximo mês e a ouvir alunos e responsáveis. Reconheço que esta proposta não garante melhora da saúde. Ainda assim, é melhor do que a proibição geral atual porque deixa claros o objetivo e o alcance da regra.",
    notePt: "Exemplo original. O texto reconstrói a premissa, faz uma concessão, propõe um limite e fecha com apelo proporcional. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c03 — avaliação do Módulo 3: premissa, analogia, reductio, concessão e apelo. */
export const C2_C03 = defineC2Checkpoint({
  id: "c2-c03", number: 3, moduleId: "c2-m03",
  title: "Checkpoint · Argumentação retórica complexa",
  objective: "Avaliar premissa, analogia, reductio, concessão e apelo do Módulo 3.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l11", "c2-l12", "c2-l13", "c2-l14", "c2-l15"],
  prerequisites: ["c2-l11", "c2-l12", "c2-l13", "c2-l14", "c2-l15", "c2-c01", "c2-c02"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual pergunta testa a força de uma premissa oculta, em vez de apenas negar a conclusão?", ["Que frase precisa ser verdadeira para que a conclusão siga do que foi dito?", "A conclusão foi escrita em linguagem difícil?", "Quem publicou o texto primeiro?"], "Que frase precisa ser verdadeira para que a conclusão siga do que foi dito?", "Reconstruir a premissa permite avaliar o que o argumento precisa assumir, não apenas discordar do resultado."),
    mcq("O que distingue uma analogia argumentativa de uma prova?", ["A analogia mostra uma semelhança; a prova mostra que a conclusão decorre das premissas.", "A analogia é sempre mais confiável que a prova.", "A prova depende de imagens e a analogia, de números."], "A analogia mostra uma semelhança; a prova mostra que a conclusão decorre das premissas.", "A analogia pode explicar e sugerir, mas precisa que a semelhança seja relevante para a conclusão."),
    mcq("O que uma reductio precisa evitar para não se tornar caricatura?", ["Ampliar o domínio da posição original até um caso que ninguém defende.", "Derivar uma consequência da premissa do outro.", "Declarar o limite do resultado obtido."], "Ampliar o domínio da posição original até um caso que ninguém defende.", "A caricatura substitui a posição real por uma versão enfraquecida, fácil de refutar."),

    cloze("Complete a premissa que sustenta o anúncio: 그 광고는 ‘20분이면 누구나 상위 1%가 된다’는 ___ 아래에서만 성립한다.", "전제", "-ㄴ/는 전제하에 explicita o que precisa ser aceito para a conclusão valer."),
    cloze("Complete o critério da analogia: 이 ___가 성립하려면 닮은 점이 결론과 관련 있어야 한다.", "유비", "유비 é o raciocínio por semelhança; a relevância das semelhanças decide seu alcance."),
    cloze("Complete a consequência levada ao extremo: 회의가 순수한 시간 낭비라면, 회사는 침묵 속에서 운영되어야 한다. 이것이 ___의 형식이다.", "귀류법", "귀류법 deriva uma consequência inaceitável da premissa assumida."),
    cloze("Complete a concessão que preserva o essencial: 조경 예산은 줄일___ 통로의 공공성은 포기하지 않겠습니다.", "지언정", "-ㄹ지언정 aceita uma perda menor para não ceder no ponto central."),
    cloze("Complete o pedido concreto do fechamento: 관심 있는 주민은 공청회에 참석해 주시기 ___.", "바랍니다", "-기를 바란다 expressa expectativa em registro formal, aqui ligada a uma ação concreta."),

    listen("Ouça e escreva a pergunta que expõe a premissa do anúncio.", "그 20분이 실력의 원인입니까?", "그 20분이 실력의 원인입니까?", "Esses 20 minutos são a causa do desempenho?"),
    listen("Ouça e escreva o que a analogia da empresa-organismo deixa de fora.", "세포는 자기가 몸을 떠날지 결정하지 못하지만, 직원은 다른 회사로 갈 수 있죠.", "세포는 자기가 몸을 떠날지 결정하지 못하지만, 직원은 다른 회사로 갈 수 있죠.", "Uma célula não decide se sai do corpo, mas um funcionário pode ir para outra empresa."),
    listen("Ouça e escreva como o falante classifica o argumento do riso das crianças.", "그건 귀류법이 아니라 확대해석이에요.", "그건 귀류법이 아니라 확대해석이에요.", "Isso não é reductio, é interpretação extensiva."),
    listen("Ouça e escreva o que a negociação conseguiu delimitar.", "서로 물러설 수 있는 것과 없는 것을 분명히 했으니, 이제 쟁점이 좁아졌네요.", "서로 물러설 수 있는 것과 없는 것을 분명히 했으니, 이제 쟁점이 좁아졌네요.", "Como deixamos claro o que cada lado pode ceder e o que não pode, o ponto em disputa agora ficou mais estreito."),
    listen("Ouça e escreva o que o fechamento revisado equilibrou.", "우리가 요구하는 것과 우리가 감당할 책임을 함께 적었으니, 이제 결론이 과장되지 않았어요.", "우리가 요구하는 것과 우리가 감당할 책임을 함께 적었으니, 이제 결론이 과장되지 않았어요.", "Como registramos juntos o que exigimos e a responsabilidade que assumimos, a conclusão agora não está exagerada."),
    listen("Ouça e escreva a regra que limita o tamanho da conclusão.", "결론의 크기는 근거의 크기를 넘지 않아야 한다.", "결론의 크기는 근거의 크기를 넘지 않아야 한다.", "O tamanho da conclusão não pode ultrapassar o tamanho da evidência."),

    reading("자전거 이용률이 높은 도시는 대개 차량 속도가 낮고, 대중교통이 잘 갖춰져 있으며, 보행자와 자전거 이용자를 위한 시설이 이미 많다. 사망자 감소는 자전거 도로 하나가 아니라 그 조건들의 합일 수 있다. 상관관계에서 인과를 도출하는 순간, 대전제는 검증 없이 통과된다.", "O que o texto aponta como problema no argumento da ciclovia?", ["A passagem indevida da correlação para a causalidade, sem considerar outras condições urbanas.", "A ausência de qualquer dado sobre acidentes.", "O fato de o texto não mencionar bicicletas."], "A passagem indevida da correlação para a causalidade, sem considerar outras condições urbanas.", "A premissa maior trata como causa o que pode ser efeito de um conjunto de condições."),
    reading("그러나 이 세 가지를 인정한다고 해서 논쟁이 끝나는 것은 아니다. 여기서 내가 고수하는 것은 재택근무를 선택할 권리다. 출퇴근에 두 시간을 쓰는 사람, 돌봄 책임을 혼자 지는 사람, 장애로 이동이 어려운 사람에게 재택은 편의가 아니라 조건이다.", "Qual é a função da concessão nesse trecho?", ["Reconhecer críticas válidas para delimitar melhor o ponto que a autora não abre mão.", "Encerrar o debate aceitando todas as críticas do lado contrário.", "Provar que o trabalho remoto não tem desvantagens."], "Reconhecer críticas válidas para delimitar melhor o ponto que a autora não abre mão.", "A concessão organiza a disputa e dá credibilidade à linha que será preservada."),
    reading("제안자는 ‘모든 회의’를 없애자고 하지 않았다. 형식적인 보고 회의를 줄이자고 했다. 극단으로 밀어붙인 결과는 원래 주장이 아니라, 아무도 주장하지 않은 허수아비를 논박한 것이다.", "Por que a reductio descrita no texto erra o alvo?", ["Porque refuta uma versão ampliada da proposta, não a proposta que foi feita.", "Porque o autor da proposta defendia todas as reuniões.", "Porque a empresa não realiza reuniões formais."], "Porque refuta uma versão ampliada da proposta, não a proposta que foi feita.", "A consequência absurda foi construída sobre ‘todas as reuniões’, enquanto a proposta falava das reuniões de relatório."),
    reading("비유가 편리할수록 그 안에 숨은 선택을 보기 어려워진다. 몸에는 중심과 주변이 있고, 주변은 중심을 위해 희생된다. 도시를 몸으로 그리면, 어떤 동네가 ‘주변’이 되는지가 자연스러워 보인다.", "O que a analogia da cidade-corpo pode esconder?", ["Uma divisão política entre centro e periferia apresentada como se fosse natural.", "A existência de ruas e transportes na cidade.", "A importância de se explicar o corpo humano."], "Uma divisão política entre centro e periferia apresentada como se fosse natural.", "A imagem do corpo naturaliza uma hierarquia que deveria ser discutida."),
    reading("A 단체는 ‘불안이 줄었다’는 응답을 ‘범죄가 줄었다’는 사실로 바꾼다. ‘모든 시민’이라는 표현은 책임을 흐린다. 누가 무엇을 해야 하는지 말하지 않기 때문이다.", "Qual é o problema do fechamento da organização A?", ["Ele converte uma resposta sobre medo em fato sobre crime e usa ‘todos’ sem distribuir responsabilidade.", "Ele cita um número excessivamente alto de entrevistados.", "Ele é longo demais para um manifesto."], "Ele converte uma resposta sobre medo em fato sobre crime e usa ‘todos’ sem distribuir responsabilidade.", "O texto aponta dois saltos: do medo para o crime e de ‘todos’ para ninguém em particular."),
    reading("좋은 귀류법은 상대의 주장을 약하게 만드는 것이 아니라, 가장 강한 형태로 세운 뒤에 시험한다. 그렇게 해야 자가당착을 피하고, 무엇이 정말 문제인지 볼 수 있다.", "O que torna uma reductio mais forte, segundo o texto?", ["Testar a versão mais forte da posição, em vez de enfraquecê-la.", "Usar uma linguagem mais emocional que o oponente.", "Evitar qualquer concessão ao lado contrário."], "Testar a versão mais forte da posição, em vez de enfraquecê-la.", "A caridade argumentativa evita a caricatura e permite localizar o problema real."),

    translate("pt-ko", "Traduza: “Se a premissa for falsa, a conclusão não se sustenta.”", "전제가 거짓일 경우 결론은 성립하지 않는다.", "-ㄹ 경우 abre o cenário hipotético; 성립하지 않는다 mantém o registro analítico.", ["전제가 거짓일 경우, 결론은 성립하지 않는다."]),
    translate("pt-ko", "Traduza: “Comparar a empresa a um organismo ajuda a entender, mas não prova.”", "회사를 유기체에 비유하면 이해는 쉬워지지만 증명은 되지 않는다.", "-에 비유하다 introduz a analogia e a segunda oração delimita seu alcance.", ["회사를 유기체에 비유하면 이해는 쉬워지지만, 그것이 증명은 아니다."]),
    translate("pt-ko", "Traduza: “Se aceitarmos essa regra, toda conversa será proibida.”", "그 규칙을 받아들인다면 모든 대화가 금지될 것이다.", "-ㄴ다면 assume a hipótese e -ㄹ 것이다 projeta a consequência.", ["그 규칙을 받아들인다면, 모든 대화가 금지될 것이다."]),
    translate("ko-pt", "Traduza: 양보는 상대의 말을 인정하는 일이지, 내 주장을 포기하는 일이 아니다.", "Conceder é reconhecer o que o outro diz, não abandonar a própria tese.", "양보 = concessão; 포기하다 = abandonar.", ["Uma concessão reconhece a fala do outro; não significa desistir da própria posição."]),
    translate("ko-pt", "Traduza: 촉구는 상대를 탓하는 일이 아니라, 함께 할 일을 구체적으로 제안하는 일이다.", "Exortar não é culpar o outro, mas propor concretamente o que deve ser feito em conjunto.", "탓하다 = culpar; 구체적으로 = de forma concreta.", ["Uma exortação não acusa o outro: propõe com precisão o que precisa ser feito junto."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
