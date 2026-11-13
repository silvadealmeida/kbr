import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l16 — funções, limites e obrigações no trabalho. */
export const B1_L16 = defineB1Lesson({
  id: "b1-l16", number: 16, moduleId: "b1-m04", title: "Responsabilidades",
  objective: "Explicar funções, limites e obrigações no trabalho.",
  prerequisites: ["b1-c03"], estimatedMinutes: 65, dialogueTitle: "Quem faz o quê",
  intro: [
    { title: "-에 따라 — conforme, de acordo com", body: "-에 따라 indica o critério ou a base de uma ação: “conforme o regulamento”, “de acordo com a função”. Também pode mostrar que algo varia conforme a situação.", ko: "규정에 따라 처리해 주세요." },
    { title: "-도록 하다 — garantir que algo seja feito", body: "-도록 하다 organiza uma ação para que ela aconteça. Soa como orientação ou providência, não como ordem seca, e é comum em instruções de trabalho.", ko: "회의 전에 자료를 확인하도록 하세요." },
  ],
  dialogue: [
    ["지민", "이번 프로젝트에서 역할을 다시 정리할까요?", "Vamos reorganizar as funções neste projeto?"],
    ["민수", "네. 지난번에는 팀 안에서 업무가 겹쳐서 문제가 생겼어요.", "Sim. Da última vez, as tarefas se sobrepuseram na equipe e surgiu um problema."],
    ["지민", "그러면 업무 배분에 따라 다시 확인해 주세요. 저는 예산 승인을 맡을게요.", "Então confira novamente conforme a distribuição de tarefas. Eu fico responsável pela aprovação do orçamento."],
    ["민수", "알겠습니다. 저는 자료 조사를 맡도록 하겠습니다.", "Entendido. Eu vou me encarregar da pesquisa de materiais."],
    ["지민", "좋아요. 다만 최종 결정은 책임자에게 확인하도록 하세요.", "Certo. Só confirme a decisão final com o responsável."],
    ["민수", "네, 제 권한 밖의 일은 혼자 처리하지 않겠습니다.", "Sim, não vou tratar sozinho assuntos fora da minha autoridade."],
  ],
  reusedIds: ["ko:업무", "ko:팀", "ko:문제", "ko:책임", "ko:자료"],
  grammar: [
    ["-에 따라 — critério e variação", "명사 + -에 따라", "Use -에 따라 para dizer que uma ação segue um critério (“conforme o regulamento”) ou que algo muda conforme a circunstância. O substantivo recebe a partícula 에.", [["규정에 따라 처리해 주세요.", "Por favor, trate conforme o regulamento."], ["역할에 따라 업무가 달라요.", "As tarefas mudam conforme a função."]]],
    ["-도록 하다 — providência e orientação", "동사 + -도록 하다", "-도록 하다 indica que alguém faz ou organiza algo para que a ação ocorra. Em instruções, soa mais suave que uma ordem direta; na primeira pessoa, funciona como compromisso.", [["회의 전에 자료를 확인하도록 하세요.", "Confirme o material antes da reunião."], ["제가 직접 안내하도록 하겠습니다.", "Eu mesmo vou me encarregar de orientar."]]],
  ],
  guided: [
    mcq("O que Minsu assume no projeto?", ["A pesquisa de materiais.", "A aprovação do orçamento.", "A avaliação da equipe."], "A pesquisa de materiais.", "자료 조사를 맡도록 하겠습니다: ele assume a pesquisa; a aprovação ficou com Jimin."),
    cloze("Complete o critério: 규정___ 따라 처리해 주세요.", "에", "-에 따라 indica a base da ação: “conforme o regulamento”."),
    listen("Ouça e escreva a tarefa que Minsu assume.", "저는 자료 조사를 맡도록 하겠습니다.", "저는 자료 조사를 맡도록 하겠습니다.", "Ele diz que vai se encarregar da pesquisa de materiais.", ["저는 자료 조사를 맡도록 하겠습니다"]),
    reading("지민은 예산 승인을 맡고, 민수는 자료 조사를 맡아요. 업무 배분은 역할에 따라 정해졌어요. 권한 밖의 결정은 책임자와 상의해야 해요.", "Quem aprova o orçamento?", ["Jimin.", "Minsu.", "O responsável pela pesquisa."], "Jimin.", "지민은 예산 승인을 맡아요."),
    translate("pt-ko", "Traduza: “As tarefas mudam conforme a função.”", "역할에 따라 업무가 달라요.", "역할에 따라 expressa o critério da variação.", ["역할에 따라 업무가 달라져요."]),
  ],
  independent: [
    mcq("Qual frase usa -에 따라 para indicar critério?", ["규정에 따라 확인해요.", "규정을 따라 확인해요.", "규정이 따라 확인해요."], "규정에 따라 확인해요.", "-에 따라 pede a partícula 에 no substantivo que serve de critério."),
    cloze("Complete a orientação: 회의 전에 자료를 확인하___ 하세요.", "도록", "확인하도록 하세요 pede que a verificação seja feita."),
    listen("Ouça e escreva o limite que Minsu respeita.", "제 권한 밖의 일은 혼자 처리하지 않겠습니다.", "제 권한 밖의 일은 혼자 처리하지 않겠습니다.", "Ele não decide sozinho o que está fora de sua autoridade.", ["제 권한 밖의 일은 혼자 처리하지 않겠습니다"]),
    translate("ko-pt", "Traduza: 업무는 역할에 따라 나눠요.", "As tarefas são divididas conforme a função.", "나누다 é “dividir”; -에 따라 marca o critério.", ["As tarefas são divididas de acordo com a função."]),
    reading("새 직원은 지시를 받으면 바로 실행하지 말고, 먼저 자신의 역할과 권한을 확인해야 해요. 범위를 넘는 일은 책임자에게 물어보는 것이 안전해요.", "O que o novo funcionário deve fazer primeiro?", ["Confirmar sua função e autoridade.", "Executar a instrução imediatamente.", "Assinar o relatório final."], "Confirmar sua função e autoridade.", "먼저 자신의 역할과 권한을 확인해야 해요."),
  ],
  summary: ["-에 따라 apresenta o critério ou a base de uma ação.", "-도록 하다 organiza uma providência ou orienta alguém a fazer algo.", "Funções claras evitam tarefas sobrepostas.", "Decisões fora da própria autoridade devem ser confirmadas com o responsável."],
  production: {
    titlePt: "Produção independente · responsabilidades", promptPt: "Descreva três responsabilidades de um trabalho que você conhece e diga o limite de cada uma. Escreva de cinco a sete frases.", promptKo: "맡은 역할과 그 한계를 설명해 보세요.",
    guidance: ["Diga qual é a sua função ou a de um colega.", "Use -에 따라 uma vez para indicar o critério.", "Explique o que está fora da sua autoridade."],
    checklist: ["Três responsabilidades nomeadas.", "Pelo menos um limite explícito.", "-에 따라 ou -도록 하다 usado corretamente.", "Fechamento com quem confirma decisões."], minWords: 35,
  },
});

/** b1-l17 — pauta, decisão e resumo de reunião. */
export const B1_L17 = defineB1Lesson({
  id: "b1-l17", number: 17, moduleId: "b1-m04", title: "Reuniões e relatórios",
  objective: "Participar de uma reunião e resumir encaminhamentos.",
  prerequisites: ["b1-l16"], estimatedMinutes: 70, dialogueTitle: "A reunião de segunda",
  intro: [
    { title: "-에 대한 — sobre, a respeito de", body: "-에 대한 fica antes de um substantivo e indica o tema dele: “discussão sobre o cronograma”. A forma adverbial equivalente é -에 대해(서), usada antes do verbo.", ko: "일정 변경에 대한 논의가 있었어요." },
    { title: "-는 데 반해 — em contraste com", body: "-는 데 반해 compara dois fatos constatados e destaca o contraste. Com verbos, usa -는 데 반해; com adjetivos, -(으)ㄴ 데 반해. É comum em relatórios e textos formais.", ko: "지난 회의는 길었던 데 반해 오늘은 짧았어요." },
  ],
  dialogue: [
    ["수진", "오늘 회의 안건이 뭐예요?", "Qual é a pauta da reunião de hoje?"],
    ["민수", "일정 변경에 대한 논의와 예산 보고예요.", "Uma discussão sobre a mudança de cronograma e o relatório de orçamento."],
    ["수진", "의제는 미리 받았어요?", "Você recebeu a pauta com antecedência?"],
    ["민수", "네, 참고 자료도 함께 받았어요. 지난 회의는 의견이 많았던 데 반해, 오늘은 안건이 적어요.", "Sim, também recebi os materiais de referência. Enquanto a última reunião teve muitas opiniões, hoje há poucos itens."],
    ["수진", "그래도 합의가 필요한 부분이 있죠?", "Mas há pontos que precisam de consenso, certo?"],
    ["민수", "네. 결정 사항은 회의록에 정리하고 모두에게 공유할게요.", "Sim. Vou registrar as decisões na ata e compartilhar com todos."],
  ],
  reusedIds: ["ko:회의", "ko:자료", "ko:일정", "ko:의견"],
  grammar: [
    ["-에 대한 — tema de um substantivo", "명사 + -에 대한 + 명사", "-에 대한 liga um substantivo ao tema de outro substantivo. Não substitui -에 대해(서), que aparece antes do verbo.", [["일정 변경에 대한 논의가 있었어요.", "Houve uma discussão sobre a mudança de cronograma."], ["그 결정에 대한 설명을 들었어요.", "Ouvi uma explicação sobre aquela decisão."]]],
    ["-는 데 반해 — contraste entre fatos", "동사 + -는 데 반해 / 형용사 + -(으)ㄴ 데 반해", "A forma contrasta dois fatos observados, sem ideia de concessão pessoal. Serve para relatórios e comparações objetivas.", [["지난 회의는 길었던 데 반해 오늘은 짧았어요.", "A reunião anterior foi longa, enquanto a de hoje foi curta."], ["이 방은 넓은 데 반해 창문이 적어요.", "Este quarto é amplo, enquanto tem poucas janelas."]]],
  ],
  guided: [
    mcq("Qual é a pauta da reunião?", ["Mudança de cronograma e relatório de orçamento.", "Contratação de novos funcionários.", "Escolha do novo mediador."], "Mudança de cronograma e relatório de orçamento.", "안건은 일정 변경에 대한 논의와 예산 보고예요."),
    cloze("Complete o tema: 일정 변경___ 대한 논의가 있어요.", "에", "-에 대한 liga “mudança de cronograma” ao substantivo “discussão”."),
    listen("Ouça e escreva o que será registrado na ata.", "결정 사항은 회의록에 정리할게요.", "결정 사항은 회의록에 정리할게요.", "As decisões serão organizadas na ata da reunião.", ["결정 사항은 회의록에 정리할게요"]),
    reading("오늘 회의에서는 일정 변경에 대한 논의가 있었어요. 발언은 짧았지만 합의가 필요했습니다. 진행자는 결정 사항을 회의록에 정리하고 참고 자료와 함께 공유했어요.", "O que o mediador fez depois da reunião?", ["Registrou as decisões e compartilhou os materiais.", "Cancelou o debate e encerrou a reunião.", "Alterou o orçamento sozinho, sem consultar."], "Registrou as decisões e compartilhou os materiais.", "결정 사항을 회의록에 정리하고 참고 자료와 함께 공유했어요."),
    translate("pt-ko", "Traduza: “A discussão sobre o cronograma foi curta.”", "일정에 대한 논의는 짧았어요.", "일정에 대한 논의 é “discussão sobre o cronograma”."),
  ],
  independent: [
    mcq("Qual frase contrasta dois fatos com -는 데 반해?", ["지난 회의는 길었던 데 반해 오늘은 짧았어요.", "지난 회의는 길어서 오늘은 짧았어요.", "지난 회의는 길었지만 오늘은 짧을 거예요."], "지난 회의는 길었던 데 반해 오늘은 짧았어요.", "-는 데 반해 apresenta um contraste entre dois fatos constatados."),
    cloze("Complete o contraste: 오늘은 안건이 적은 데 ___ 지난 회의는 의견이 많았어요.", "반해", "-는 데 반해 fecha a comparação entre os dois fatos."),
    listen("Ouça e escreva quantos itens a reunião de hoje tem.", "오늘은 안건이 세 가지예요.", "오늘은 안건이 세 가지예요.", "Hoje a pauta tem três itens.", ["오늘은 안건이 세 가지예요"]),
    translate("ko-pt", "Traduza: 일정 변경에 대한 질문이 있었어요.", "Houve uma pergunta sobre a mudança de cronograma.", "-에 대한 marca o tema da pergunta.", ["Houve uma pergunta a respeito da mudança de cronograma."]),
    reading("회의록은 길수록 좋은 것이 아니에요. 누가 무엇을 하기로 했는지, 언제까지 해야 하는지가 분명해야 해요. 그래서 진행자는 결정과 담당자만 간단히 적어요.", "O que torna uma ata útil?", ["Decisões, responsáveis e prazos claros.", "Muitas páginas de debate.", "A opinião pessoal do mediador."], "Decisões, responsáveis e prazos claros.", "누가 무엇을 하기로 했는지, 언제까지 해야 하는지가 분명해야 해요."),
  ],
  summary: ["-에 대한 apresenta o tema de um substantivo.", "-는 데 반해 contrasta dois fatos de forma objetiva.", "Uma ata útil registra decisão, responsável e prazo.", "Pauta e materiais devem circular antes da reunião.", "Textos de leitura podem usar o registro escrito formal (-ㅂ니다/-습니다), mesmo quando o diálogo da lição usa 해요체."],
  production: {
    titlePt: "Produção independente · resumo de reunião", promptPt: "Escreva um resumo de uma reunião fictícia com pauta, uma decisão, um responsável e um prazo. Use de quatro a seis frases.", promptKo: "회의 내용을 네 문장으로 정리해 보세요.",
    guidance: ["Comece pela pauta da reunião.", "Use -에 대한 uma vez.", "Termine com responsável e prazo."],
    checklist: ["Pauta declarada no início.", "Uma decisão concreta.", "Responsável e prazo indicados.", "Resumo sem opinião pessoal."], minWords: 30,
  },
});

/** b1-l18 — vagas, requisitos e contrapartidas. */
export const B1_L18 = defineB1Lesson({
  id: "b1-l18", number: 18, moduleId: "b1-m04", title: "Procurar oportunidades",
  objective: "Avaliar uma vaga e reconhecer requisitos e contrapartidas.",
  prerequisites: ["b1-l17"], estimatedMinutes: 70, dialogueTitle: "Duas vagas, duas escolhas",
  intro: [
    { title: "-(으)ㄹ 수밖에 없다 — escolha inevitável", body: "A forma diz que, dadas as circunstâncias, não há outra saída: “não tenho como não…”. Use com verbos e mantenha o tom de constatação, não de desculpa.", ko: "대안이 없어서 결정을 미룰 수밖에 없어요." },
    { title: "-기에 — porque, pelo fato de", body: "-기에 apresenta o motivo de forma mais objetiva e escrita que -아/어서 ou -니까. Liga-se diretamente ao radical do verbo ou adjetivo.", ko: "가능성이 높기에 지원했어요." },
  ],
  dialogue: [
    ["지민", "두 회사 중에 어디에 지원할 거예요?", "Para qual das duas empresas você vai se candidatar?"],
    ["수진", "아직 선택을 못 했어요. 한 곳은 연봉이 높은데 야근이 많아요.", "Ainda não consegui escolher. Uma tem salário anual alto, mas muitas horas extras."],
    ["지민", "다른 곳은요?", "E a outra?"],
    ["수진", "월급은 적지만 복지가 좋고 정규직 전환 가능성도 높아요.", "O salário mensal é menor, mas os benefícios são bons e a chance de efetivação é alta."],
    ["지민", "그럼 근무 조건을 먼저 비교해 보는 게 좋겠어요.", "Então é melhor comparar primeiro as condições de trabalho."],
    ["수진", "네. 경력과 능력을 함께 생각해야 하니까 결정을 미룰 수밖에 없어요.", "Sim. Como preciso considerar experiência e competência juntas, não tenho como não adiar a decisão."],
  ],
  reusedIds: ["ko:월급", "ko:경력", "ko:선택", "ko:능력"],
  grammar: [
    ["-(으)ㄹ 수밖에 없다 — sem alternativa", "동사 + -(으)ㄹ 수밖에 없다", "Indica que a situação obriga a uma escolha. Não é uma promessa nem um desejo; é o reconhecimento de que não há outra opção prática.", [["대안이 없어서 결정을 미룰 수밖에 없어요.", "Como não há alternativa, não tenho como não adiar a decisão."], ["버스가 없어서 걸어갈 수밖에 없어요.", "Como não há ônibus, só me resta ir a pé."]]],
    ["-기에 — motivo objetivo", "동사/형용사 + -기에", "-기에 introduz o motivo de uma decisão ou constatação. Soa mais objetivo que -아/어서 e -니까 e aparece com frequência em textos profissionais; na conversa cotidiana, -니까 e -아/어서 são mais naturais.", [["가능성이 높기에 지원했어요.", "Candidatei-me porque a possibilidade era alta."], ["일정이 짧기에 인원을 늘렸어요.", "Como o prazo era curto, aumentamos a equipe."]]],
  ],
  guided: [
    mcq("Por que Sujin ainda não decidiu?", ["Porque cada vaga tem uma desvantagem.", "Porque não tem currículo.", "Porque já aceitou as duas propostas."], "Porque cada vaga tem uma desvantagem.", "Uma vaga tem muitas horas extras; a outra paga menos."),
    cloze("Complete a inevitabilidade: 결정을 미룰 ___ 없어요.", "수밖에", "미룰 수밖에 없어요 significa que não há outra opção além de adiar."),
    listen("Ouça e escreva o que a segunda vaga oferece de positivo.", "복지가 좋고 정규직 전환 가능성도 높아요.", "복지가 좋고 정규직 전환 가능성도 높아요.", "A segunda vaga tem bons benefícios e alta chance de efetivação.", ["복지가 좋고 정규직 전환 가능성도 높아요"]),
    reading("수진은 두 회사를 비교하고 있어요. 첫 회사는 연봉이 높지만 야근이 많아요. 둘째 회사는 복지가 좋고 정규직 전환 가능성도 높아요. 그래서 수진은 둘째 회사를 더 보고 있어요.", "Qual vantagem leva Sujin a preferir a segunda empresa?", ["A possibilidade de efetivação.", "O salário mais alto.", "As horas extras."], "A possibilidade de efetivação.", "정규직 전환 가능성도 높아요."),
    translate("pt-ko", "Traduza: “É inevitável comparar as condições de trabalho.”", "근무 조건을 비교할 수밖에 없어요.", "비교할 수밖에 없어요 expressa a ausência de alternativa."),
  ],
  independent: [
    mcq("O que -(으)ㄹ 수밖에 없다 indica?", ["Uma escolha inevitável diante das circunstâncias.", "Uma promessa feita no passado.", "Uma hipótese sem relação com a realidade."], "Uma escolha inevitável diante das circunstâncias.", "A forma constata que não há outra opção prática."),
    cloze("Complete o motivo com a forma de causa ensinada: 전환 가능성이 높___ 둘째 회사를 보고 있어요.", "기에", "높기에 introduz o motivo da preferência."),
    listen("Ouça e escreva o que a candidata quer mostrar.", "제 역량을 포트폴리오로 보여 주고 싶어요.", "제 역량을 포트폴리오로 보여 주고 싶어요.", "Ela quer mostrar sua competência por meio do portfólio.", ["제 역량을 포트폴리오로 보여 주고 싶어요"]),
    translate("ko-pt", "Traduza: 연봉이 높은 대신 야근이 많아요.", "O salário anual é alto, mas em troca há muitas horas extras.", "-(으)ㄴ 대신 marca a compensação entre vantagem e desvantagem.", ["O salário é alto, mas em compensação há muitas horas extras."]),
    reading("계약직으로 시작해도 괜찮아요. 중요한 것은 전환 가능성과 배울 수 있는 업무예요. 연봉만 보고 고르면 나중에 후회할 수 있어요.", "Qual critério o texto recomenda além do salário?", ["Possibilidade de efetivação e aprendizagem.", "Quantidade de horas extras.", "Distância de casa."], "Possibilidade de efetivação e aprendizagem.", "중요한 것은 전환 가능성과 배울 수 있는 업무예요."),
  ],
  summary: ["-(으)ㄹ 수밖에 없다 constata uma escolha inevitável.", "-기에 introduz o motivo de forma objetiva.", "Comparar vaga exige olhar salário, benefícios e limites.", "A possibilidade de aprender também é um critério."],
  production: {
    titlePt: "Produção independente · candidatura", promptPt: "Escreva uma candidatura curta para uma vaga: diga por que se interessa, qual requisito você atende e que limitação precisa negociar. Use de cinco a sete frases.", promptKo: "지원 동기와 조건을 정리해 보세요.",
    guidance: ["Apresente a vaga e o motivo do interesse.", "Use -기에 uma vez para justificar.", "Reconheça uma limitação sem esconder informação."],
    checklist: ["Motivação explícita.", "Um requisito atendido com exemplo.", "Uma limitação ou condição mencionada.", "-기에 ou -(으)ㄹ 수밖에 없다 usado corretamente."], minWords: 35,
  },
});

/** b1-l19 — estudo, competência e plano de carreira. */
export const B1_L19 = defineB1Lesson({
  id: "b1-l19", number: 19, moduleId: "b1-m04", title: "Estudo e carreira",
  objective: "Relacionar estudo, competência e plano profissional.",
  prerequisites: ["b1-l18"], estimatedMinutes: 70, dialogueTitle: "Mestrado ou curso prático?",
  intro: [
    { title: "-기 위해서는 — para, é preciso", body: "-기 위해서는 apresenta a finalidade e já prepara a condição necessária: “para fazer X, é preciso…”. A partícula 는 reforça o contraste com o que vem depois.", ko: "한국어를 잘하기 위해서는 매일 연습해야 해요." },
    { title: "-는 것이 중요하다 — é importante fazer", body: "A nominalização com -는 것 transforma um verbo em substantivo. Com 중요하다, avalia o que é importante em um processo, não uma obrigação legal.", ko: "기록하는 것이 중요해요." },
  ],
  dialogue: [
    ["민수", "요즘 공부를 계속할지 고민이에요.", "Ultimamente estou pensando se continuo os estudos."],
    ["수진", "석사 학위를 생각하고 있어요?", "Você está pensando no mestrado?"],
    ["민수", "네. 그런데 연구보다 실습 경험이 더 필요해요.", "Sim. Mas preciso mais de experiência prática do que de pesquisa."],
    ["수진", "그럼 논문을 준비하기 위해서는 시간을 어떻게 쓸지 먼저 정해야 해요.", "Então, para preparar a tese, primeiro é preciso decidir como usar o tempo."],
    ["민수", "맞아요. 매일 조금씩 집중력을 유지하는 것이 중요하다고 느꼈어요.", "Exato. Senti que é importante manter a concentração um pouco todos os dias."],
    ["수진", "저는 연구실 실습을 먼저 해 보는 것을 추천해요.", "Eu recomendo fazer primeiro a prática no laboratório."],
  ],
  reusedIds: ["ko:목표", "ko:경험", "ko:시간", "ko:배우다"],
  grammar: [
    ["-기 위해서는 — finalidade com condição", "동사 + -기 위해서는", "Apresenta o objetivo e prepara o que é necessário para alcançá-lo. É mais explícito que -려고 porque aponta para uma condição.", [["논문을 준비하기 위해서는 시간 관리가 필요해요.", "Para preparar a tese, é preciso administrar o tempo."], ["숙달하기 위해서는 반복이 중요해요.", "Para dominar, a repetição é importante."]]],
    ["-는 것이 중요하다 — avaliação de processo", "동사 + -는 것이 중요하다", "A nominalização -는 것 permite falar de uma ação como conceito. Use para avaliar prioridades e hábitos, sem transformar a frase em ordem.", [["매일 조금씩 공부하는 것이 중요해요.", "É importante estudar um pouco todos os dias."], ["질문을 기록하는 것이 중요해요.", "É importante registrar as perguntas."]]],
  ],
  guided: [
    mcq("O que Minsu sente que precisa mais?", ["Experiência prática.", "Um salário maior.", "Menos tempo de estudo."], "Experiência prática.", "연구보다 실습 경험이 더 필요해요."),
    cloze("Complete a finalidade: 논문을 준비하___ 위해서는 시간 관리가 필요해요.", "기", "준비하기 위해서는 introduz o objetivo e a condição."),
    listen("Ouça e escreva o que Minsu considera importante manter.", "매일 조금씩 집중력을 유지하는 것이 중요해요.", "매일 조금씩 집중력을 유지하는 것이 중요해요.", "Manter a concentração aos poucos, todos os dias, é importante.", ["매일 조금씩 집중력을 유지하는 것이 중요해요"]),
    reading("민수는 석사 학위를 고민하고 있어요. 하지만 연구보다 실습 경험이 더 필요하다고 느껴요. 수진은 연구실에서 실습을 먼저 해 보라고 권했어요.", "O que Sujin recomenda?", ["Fazer prática no laboratório primeiro.", "Escrever a tese imediatamente.", "Desistir do mestrado."], "Fazer prática no laboratório primeiro.", "연구실 실습을 먼저 해 보는 것을 추천해요."),
    translate("pt-ko", "Traduza: “Para melhorar a eficiência, é importante praticar.”", "효율성을 높이기 위해서는 연습하는 것이 중요해요.", "높이기 위해서는 marca a finalidade; 연습하는 것이 중요해요 avalia o meio."),
  ],
  independent: [
    mcq("Qual frase expressa finalidade com -기 위해서는?", ["숙달하기 위해서는 반복이 필요해요.", "숙달해서 반복이 필요해요.", "숙달하면 반복이 필요해요."], "숙달하기 위해서는 반복이 필요해요.", "-기 위해서는 liga a meta “dominar” à condição “repetir”."),
    cloze("Complete a avaliação: 매일 조금씩 공부하___ 것이 중요해요.", "는", "공부하는 것이 중요해요 nominaliza a ação com -는 것."),
    listen("Ouça e escreva como é possível dominar uma habilidade.", "반복 연습으로 숙달할 수 있어요.", "반복 연습으로 숙달할 수 있어요.", "É possível dominar com prática repetida.", ["반복 연습으로 숙달할 수 있어요"]),
    translate("ko-pt", "Traduza: 연구보다 실습 경험이 더 필요해요.", "Preciso de mais experiência prática do que de pesquisa.", "보다 marca a comparação; 더 필요해요 indica maior necessidade.", ["Preciso mais de experiência prática do que de pesquisa."]),
    reading("학위만으로는 부족할 때가 있어요. 연구를 계속하려면 논문이 중요하지만, 현장에서 일하려면 실습과 탐구 경험이 더 도움이 돼요. 그래서 목표를 먼저 정하는 것이 좋아요.", "Qual é o conselho do texto?", ["Definir o objetivo antes de escolher o caminho.", "Fazer só pesquisa e evitar prática.", "Escolher sempre pelo salário."], "Definir o objetivo antes de escolher o caminho.", "목표를 먼저 정하는 것이 좋아요."),
  ],
  summary: ["-기 위해서는 une finalidade e condição necessária.", "-는 것이 중요하다 avalia um hábito ou prioridade.", "Estudo e carreira se conectam por objetivos explícitos.", "Prática e pesquisa respondem a metas diferentes."],
  production: {
    titlePt: "Produção independente · plano de desenvolvimento", promptPt: "Escreva um plano de desenvolvimento com um objetivo, uma competência a desenvolver e duas ações concretas. Use de cinco a sete frases.", promptKo: "배우고 싶은 것과 계획을 설명해 보세요.",
    guidance: ["Declare o objetivo profissional.", "Diga qual competência precisa crescer.", "Use -기 위해서는 e -는 것이 중요하다."],
    checklist: ["Objetivo claro no início.", "Uma competência nomeada.", "Duas ações concretas.", "Relação explícita entre estudo e meta."], minWords: 35,
  },
});

/** b1-l20 — conflito, causa e proposta de acordo. */
export const B1_L20 = defineB1Lesson({
  id: "b1-l20", number: 20, moduleId: "b1-m04", title: "Conflitos no trabalho",
  objective: "Descrever um conflito e propor uma solução.",
  prerequisites: ["b1-l19"], estimatedMinutes: 75, dialogueTitle: "O erro do relatório",
  intro: [
    { title: "-는 바람에 — por causa de algo inesperado", body: "-는 바람에 introduz uma causa que foge ao controle e costuma trazer resultado negativo. A consequência vem sempre depois e, em geral, no passado.", ko: "늦잠을 자는 바람에 약속에 늦었어요." },
    { title: "-더라도 — mesmo que", body: "-더라도 apresenta uma concessão hipotética mais forte que -아/어도: “mesmo que aconteça isso, a decisão se mantém”. Use para assumir responsabilidade sem condicionar o acordo.", ko: "힘들더라도 끝까지 해 보세요." },
  ],
  dialogue: [
    ["지민", "어제 보고서에 숫자가 잘못 들어갔다는 이야기 들었어요.", "Ouvi dizer que os números do relatório de ontem estavam errados."],
    ["민수", "네. 제가 확인을 늦게 하는 바람에 팀 전체가 다시 작업했어요.", "Sim. Como confirmei tarde, a equipe inteira teve de refazer o trabalho."],
    ["지민", "고객에게도 문제가 됐나요?", "Isso também causou problema para o cliente?"],
    ["민수", "다행히 아직 발송 전이었어요. 하지만 팀 안에 갈등이 생길까 걱정했어요.", "Felizmente ainda não tinha sido enviado. Mas fiquei preocupado que surgisse um conflito na equipe."],
    ["지민", "먼저 해명하고, 재발 방지 계획을 함께 세우는 게 좋겠어요.", "É melhor esclarecer primeiro e montar juntos um plano para evitar recorrência."],
    ["민수", "알겠습니다. 징계를 받더라도 책임은 제가 지겠습니다.", "Entendido. Mesmo que receba uma medida disciplinar, eu assumo a responsabilidade."],
  ],
  reusedIds: ["ko:보고서", "ko:팀", "ko:책임", "ko:문제"],
  grammar: [
    ["-는 바람에 — causa inesperada e negativa", "동사 + -는 바람에", "A forma liga uma causa involuntária a um resultado ruim já ocorrido. Não use para causas planejadas nem para resultados positivos.", [["늦잠을 자는 바람에 약속에 늦었어요.", "Como dormi demais, cheguei atrasado ao compromisso."], ["확인을 늦게 하는 바람에 팀이 다시 작업했어요.", "Como confirmei tarde, a equipe refez o trabalho."]]],
    ["-더라도 — concessão hipotética", "동사/형용사 + -더라도", "-더라도 diz “mesmo que” e mantém a conclusão apesar da hipótese. É mais enfático que -아/어도 e comum ao assumir responsabilidade ou compromisso.", [["징계를 받더라도 책임은 제가 지겠습니다.", "Mesmo que receba uma medida disciplinar, assumirei a responsabilidade."], ["비가 오더라도 출발하겠습니다.", "Mesmo que chova, partiremos."]]],
  ],
  guided: [
    mcq("Por que a equipe teve de refazer o trabalho?", ["Porque Minsu confirmou os números tarde.", "Porque o cliente cancelou o pedido.", "Porque o relatório foi enviado cedo."], "Porque Minsu confirmou os números tarde.", "확인을 늦게 하는 바람에 팀 전체가 다시 작업했어요."),
    cloze("Complete a causa: 확인을 늦게 하는 ___ 팀 전체가 다시 작업했어요.", "바람에", "하는 바람에 introduz a causa involuntária do problema."),
    listen("Ouça e escreva a promessa de Minsu.", "징계를 받더라도 책임은 제가 지겠습니다.", "징계를 받더라도 책임은 제가 지겠습니다.", "Mesmo com uma possível medida disciplinar, ele assume a responsabilidade.", ["징계를 받더라도 책임은 제가 지겠습니다"]),
    reading("민수는 보고서 숫자를 늦게 확인하는 바람에 팀 전체가 다시 작업했어요. 다행히 고객에게 보내기 전이었어요. 그는 먼저 해명하고 재발 방지 계획을 세우기로 했어요.", "O que Minsu decidiu fazer?", ["Esclarecer o erro e criar um plano de prevenção.", "Culpar outro colega.", "Pedir demissão imediatamente."], "Esclarecer o erro e criar um plano de prevenção.", "먼저 해명하고 재발 방지 계획을 세우기로 했어요."),
    translate("pt-ko", "Traduza: “Mesmo que seja difícil, vou esclarecer o erro.”", "어렵더라도 실수한 경위를 해명하겠습니다.", "어렵더라도 mantém a decisão apesar da dificuldade."),
  ],
  independent: [
    mcq("Qual frase usa -는 바람에 com causa e resultado negativo?", ["늦게 도착하는 바람에 회의에 못 들어갔어요.", "늦게 도착해서 회의에 들어갔어요.", "늦게 도착하더라도 회의에 들어갈게요."], "늦게 도착하는 바람에 회의에 못 들어갔어요.", "-는 바람에 liga a causa involuntária ao resultado negativo."),
    cloze("Complete a concessão: 비가 오___ 출발하겠습니다.", "더라도", "오더라도 significa “mesmo que chova”."),
    listen("Ouça e escreva o que preocupava Minsu.", "팀 안에 갈등이 생길까 걱정했어요.", "팀 안에 갈등이 생길까 걱정했어요.", "Ele temia que surgisse um conflito dentro da equipe.", ["팀 안에 갈등이 생길까 걱정했어요"]),
    translate("ko-pt", "Traduza: 불만이 있더라도 먼저 상대의 말을 듣는 것이 중요해요.", "Mesmo que haja insatisfação, é importante ouvir primeiro o que o outro diz.", "-더라도 mantém a recomendação apesar da insatisfação."),
    reading("규정을 어기면 징계를 받을 수 있어요. 하지만 갈등이 생겼을 때 가장 중요한 것은 사실을 숨기지 않는 거예요. 중재자를 통해 해명하고 협상하는 편이 낫습니다.", "Qual atitude o texto recomenda em um conflito?", ["Esclarecer os fatos e negociar com mediação.", "Esconder o erro até o fim.", "Evitar qualquer conversa."], "Esclarecer os fatos e negociar com mediação.", "중재자를 통해 해명하고 협상하는 편이 낫습니다."),
  ],
  summary: ["-는 바람에 liga causa involuntária a resultado negativo.", "-더라도 mantém uma decisão diante de uma hipótese contrária.", "Assumir a causa abre espaço para reparação.", "Um acordo bom inclui esclarecimento e prevenção.", "Textos de leitura podem usar o registro escrito formal (-ㅂ니다/-습니다), mesmo quando o diálogo da lição usa 해요체."],
  production: {
    titlePt: "Produção independente · mensagem de reparação", promptPt: "Escreva uma mensagem a um colega sobre um erro que afetou a equipe: explique a causa, o impacto, sua responsabilidade e a proposta de solução. Use de cinco a sete frases.", promptKo: "실수에 대해 사과하고 해결 방법을 제안해 보세요.",
    guidance: ["Descreva o fato sem culpar outra pessoa.", "Use -는 바람에 para a causa e -더라도 para assumir o compromisso.", "Termine com uma ação concreta e um prazo."],
    checklist: ["Causa e impacto descritos.", "Responsabilidade assumida na primeira pessoa.", "Proposta de prevenção concreta.", "Tom respeitoso e sem justificativas vagas."], minWords: 35,
  },
});
