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

/** b2-l31 — cenários, premissas e contingência. */
export const B2_L31 = defineB2Lesson({
  id: "b2-l31", number: 31, moduleId: "b2-m07", title: "E se...?",
  objective: "Planejar cenários hipotéticos e explicitar premissas.",
  prerequisites: ["b2-c06"], estimatedMinutes: 75, dialogueTitle: "O plano B",
  intro: [
    { title: "Se assumirmos que", body: "-다고 가정하면 significa “se assumirmos que...”. Torna a premissa explícita antes de tirar consequências. Compare com -ㄴ다면 (condição hipotética) e -라고 하면 (se dissermos que). Registro: neutro a formal.", ko: "예산이 절반으로 줄어든다고 가정하면 계획을 바꿔야 해요." },
    { title: "Se a situação for de", body: "-ㄹ 상황이라면 significa “se a situação for de...”. Enquadra um cenário e pede uma resposta adequada. Compare com -ㄴ다면 (condição geral) e -ㄹ 경우에는 (no caso de). Registro: neutro a formal.", ko: "인력이 부족할 상황이라면 외부 협력을 고려해야 해요." },
  ],
  dialogue: [
    ["아나", "내년 예산이 줄어들면 어떻게 할 거예요?", "O que vocês vão fazer se o orçamento do ano que vem diminuir?"],
    ["민수", "예산이 절반으로 줄어든다고 가정하면, 먼저 장비 구매를 미뤄야 해요.", "Se assumirmos que o orçamento cai pela metade, primeiro é preciso adiar a compra de equipamentos."],
    ["아나", "최악의 경우도 생각했어요?", "Pensaram também no pior caso?"],
    ["민수", "네. 두 가지 시나리오를 설정했어요. 하나는 교육을 유지하는 것, 다른 하나는 외부 협력으로 비용을 줄이는 것이에요.", "Sim. Estabelecemos dois cenários. Um mantém o treinamento; o outro reduz custos com colaboração externa."],
    ["아나", "문제가 발생하면 바로 대응할 수 있어요?", "Se surgir um problema, dá para responder imediatamente?"],
    ["민수", "대비책을 미리 정해 두면 판단이 빨라져요. 인력이 부족할 상황이라면 외부 협력을 먼저 검토할 거예요.", "Se definirmos antes uma medida de contingência, a decisão fica mais rápida. Se a situação for de falta de pessoal, vamos considerar primeiro a colaboração externa."],
    ["아나", "예측은 믿을 만해요?", "A previsão é confiável?"],
    ["민수", "전문가는 성장률을 2%로 추산했지만, 그 예측이 틀릴 수도 있어요. 그래서 하나의 숫자에만 의존하지 않아요.", "O especialista estimou o crescimento em 2%, mas essa previsão pode estar errada. Por isso, não dependemos de um único número."],
  ],
  readingText: {
    titlePt: "Premissas antes do plano",
    paragraphs: [
      "팀은 내년 예산이 절반으로 줄어들 수 있다고 가정했다. 그런 상황이라면 어떤 사업을 먼저 줄일지 미리 정해야 했다. 두 가지 시나리오를 설정하고, 최악의 경우도 대비책으로 넣었다.",
      "첫 번째 시나리오에서는 교육을 유지하고 장비 구매를 미룬다. 두 번째에서는 외부 협력으로 비용을 줄인다. 발생할 수 있는 위험을 미리 적어 두면, 실제 상황에서 판단이 빨라진다.",
      "전문가는 성장률을 2%로 추산했지만, 그 예측이 틀릴 수도 있다. 그래서 계획은 하나의 숫자에만 의존하지 않는다. 가정을 분명히 하고, 바뀔 때 다시 계산하는 것이 중요하다. 그리고 그 가정이 바뀌면 계획도 다시 세워야 한다. 그것이 핵심이다.",
    ],
    pt: "A equipe assumiu que o orçamento do próximo ano poderia cair pela metade. Se a situação fosse essa, era preciso decidir antes quais projetos reduzir. Estabelecemos dois cenários e incluímos o pior caso como medida de contingência. No primeiro cenário, mantemos o treinamento e adiamos a compra de equipamentos. No segundo, reduzimos custos com colaboração externa. Se anotarmos antes os riscos que podem ocorrer, a decisão fica mais rápida na situação real. O especialista estimou o crescimento em 2%, mas essa previsão pode estar errada. Por isso, o plano não depende de um único número. É importante explicitar a premissa e recalcular quando ela mudar.",
    objective: "Identificar a premissa, o cenário e a consequência de cada plano.",
  },
  reusedIds: ["ko:계획", "ko:예산", "ko:문제"],
  grammar: [
    ["-다고 가정하면 — se assumirmos que", "동사/형용사 + -다고 가정하면", "Significa “se assumirmos que...”. Torna a premissa explícita antes de tirar consequências. Compare com -ㄴ다면 (condição hipotética) e -라고 하면 (se dissermos que). Registro: neutro a formal.", [["예산이 절반으로 줄어든다고 가정하면 계획을 바꿔야 해요.", "Se assumirmos que o orçamento cai pela metade, é preciso mudar o plano."], ["비가 온다고 가정하면 행사 장소를 실내로 옮겨야 합니다.", "Se assumirmos que vai chover, é preciso transferir o evento para um local fechado."]]],
    ["-ㄹ 상황이라면 — se a situação for de", "동사/형용사 + -ㄹ 상황이라면", "Significa “se a situação for de...”. Enquadra um cenário e pede uma resposta adequada. Compare com -ㄴ다면 (condição geral) e -ㄹ 경우에는 (no caso de). Registro: neutro a formal.", [["인력이 부족할 상황이라면 외부 협력을 고려해야 해요.", "Se a situação for de falta de pessoal, é preciso considerar colaboração externa."], ["예산이 남을 상황이라면 교육에 먼저 쓰겠습니다.", "Se a situação for de sobra de orçamento, usaremos primeiro em treinamento."]]],
  ],
  guided: [
    mcq("O que a equipe decide primeiro se o orçamento cair?", ["Adiar a compra de equipamentos.", "Contratar mais pessoas.", "Cancelar todo o treinamento."], "Adiar a compra de equipamentos.", "장비 구매를 미뤄야 해요."),
    cloze("Complete a premissa: 예산이 절반으로 줄어든___ 가정하면 계획을 바꿔야 해요.", "다고", "줄어든다고 가정하면 = se assumirmos que cai."),
    listen("Ouça e escreva o cenário de falta de pessoal.", "인력이 부족할 상황이라면 외부 협력을 고려해야 해요.", "인력이 부족할 상황이라면 외부 협력을 고려해야 해요.", "Se a situação for de falta de pessoal, é preciso considerar colaboração externa."),
    reading("팀은 내년 예산이 절반으로 줄어들 수 있다고 가정했다. 그런 상황이라면 어떤 사업을 먼저 줄일지 미리 정해야 했다. 두 가지 시나리오를 설정하고, 최악의 경우도 대비책으로 넣었다.", "O que a equipe fez antes da crise?", ["Definiu cenários e uma medida de contingência.", "Esperou o problema acontecer.", "Pediu demissão."], "Definiu cenários e uma medida de contingência.", "두 시나리오와 대비책을 정했어요."),
    translate("pt-ko", "Traduza: “Se assumirmos que o orçamento cai pela metade, é preciso mudar o plano.”", "예산이 절반으로 줄어든다고 가정하면 계획을 바꿔야 해요.", "-다고 가정하면 explicita a premissa.", ["예산이 절반으로 줄어든다고 가정하면 계획을 바꿔야 합니다."]),
  ],
  independent: [
    mcq("Qual frase explicita uma premissa?", ["비가 온다고 가정하면 실내에서 열어야 해요.", "비가 왔어요. 어제 많이 왔어요.", "비가 오면 좋겠어요. 정말요."], "비가 온다고 가정하면 실내에서 열어야 해요.", "-다고 가정하면 = se assumirmos que."),
    cloze("Complete o cenário: 예산이 남을 상황___ 먼저 교육에 쓰겠습니다.", "이라면", "상황이라면 = se a situação for."),
    listen("Ouça e escreva a estimativa do especialista.", "전문가는 성장률을 2%로 추산했어요.", "전문가는 성장률을 2%로 추산했어요.", "O especialista estimou o crescimento em 2%."),
    translate("ko-pt", "Traduza: 계획은 하나의 숫자에만 의존하지 않아요.", "O plano não depende de um único número.", "의존하다 = depender; 숫자 = número.", ["O plano não se apoia em um só número."]),
    reading("전문가는 성장률을 2%로 추산했지만, 그 예측이 틀릴 수도 있다. 그래서 계획은 하나의 숫자에만 의존하지 않는다. 가정을 분명히 하고, 바뀔 때 다시 계산하는 것이 중요하다. 그리고 그 가정이 바뀌면 계획도 다시 세워야 한다. 그것이 핵심이다.", "O que é importante quando a premissa muda?", ["Recalcular o plano.", "Ignorar a mudança.", "Manter o mesmo número."], "Recalcular o plano.", "바뀔 때 다시 계산하는 것."),
  ],
  summary: ["-다고 가정하면 explicita a premissa.", "-ㄹ 상황이라면 enquadra o cenário.", "Bom plano separa premissa, cenário e contingência.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · dois cenários",
    "Escreva dois cenários para um projeto ou viagem em cinco a sete frases. Explicite a premissa, a consequência e uma medida de contingência.",
    "두 가지 상황을 가정하고 대비책을 써 보세요.",
    ["Diga a premissa.", "Descreva o cenário.", "Use -다고 가정하면 ou -ㄹ 상황이라면.", "Proponha uma contingência."],
    ["Premissa explícita.", "Dois cenários distintos.", "Consequência coerente.", "Uma forma da lição.", "Contingência concreta."],
    "예산이 절반으로 줄어든다고 가정해 볼게요. 그런 상황이라면 장비 구매를 미루고 교육을 유지할 거예요. 문제가 발생하면 외부 협력으로 비용을 줄일 수 있어요. 미리 대비책을 정해 두면 판단이 빨라집니다.",
    "Vamos assumir que o orçamento caia pela metade. Nessa situação, adiaremos a compra de equipamentos e manteremos o treinamento. Se surgir um problema, podemos reduzir custos com colaboração externa. Definir antes uma medida de contingência acelera a decisão.",
    "Exemplo original de quatro frases. Premissa, cenário e contingência aparecem. Compare a estrutura.",
  ),
});

/** b2-l32 — probabilidade e incerteza. */
export const B2_L32 = defineB2Lesson({
  id: "b2-l32", number: 32, moduleId: "b2-m07", title: "Talvez, provavelmente",
  objective: "Expressar graus de probabilidade e distinguir previsão de certeza.",
  prerequisites: ["b2-l31"], estimatedMinutes: 75, dialogueTitle: "O prazo incerto",
  intro: [
    { title: "Parece que / é provável", body: "-ㄹ 듯하다 expressa aparência ou suposição: “parece que...”, “é provável que...”. É mais escrito que -것 같다. Compare com -ㄹ 법하다 (ser plausível) e -ㄹ 가능성이 있다 (haver possibilidade). Registro: escrito/neutro.", ko: "일정이 조금 늦어질 듯해요." },
    { title: "É plausível / era de se esperar", body: "-ㄹ 법하다 indica que algo é plausível ou natural de acontecer: “é de se esperar que...”. Compare com -ㄹ 만하다 (vale a pena) e -ㄹ 듯하다 (parece). Registro: neutro a formal.", ko: "그 정도 지연은 있을 법해요." },
  ],
  dialogue: [
    ["아나", "이번 프로젝트, 기한 안에 끝날 수 있을까요?", "Este projeto consegue terminar dentro do prazo?"],
    ["민수", "가능성은 반반이에요. 성공을 장담할 수 없지만, 실패 가능성도 배제할 수 없어요.", "A possibilidade é cinquenta por cento. Não dá para garantir o sucesso, mas a possibilidade de fracasso também não pode ser descartada."],
    ["아나", "아직 불확실한 게 많아요?", "Ainda há muita coisa incerta?"],
    ["민수", "네. 그래서 지금 결론을 속단하면 안 돼요. 지난 자료를 바탕으로 일정을 다시 추측했어요.", "Sim. Por isso, não se deve tirar uma conclusão precipitada agora. Estimei o cronograma de novo com base nos dados anteriores."],
    ["아나", "가장 유력한 시나리오는 뭐예요?", "Qual é o cenário mais provável?"],
    ["민수", "두 주 지연이에요. 일주일 안에 끝날 가능성도 있지만, 그건 예상했던 것보다 빠른 경우예요.", "Um atraso de duas semanas. Também há possibilidade de terminar em uma semana, mas esse seria um caso mais rápido do que o esperado."],
    ["아나", "보고서에는 어떻게 쓸 거예요?", "Como vai escrever no relatório?"],
    ["민수", "“가능성이 있다”와 “확실하다”를 구분해서 쓸 거예요. 일정이 늦어질 듯하다고만 쓰고, 확신은 하지 않을게요.", "Vou separar “há possibilidade” de “é certo”. Vou escrever apenas que o cronograma parece atrasar, sem afirmar certeza."],
  ],
  readingText: {
    titlePt: "Dizer “talvez” com precisão",
    paragraphs: [
      "프로젝트가 기한 안에 끝날 가능성은 반반이었다. 성공을 장담할 수 없었고, 실패 가능성도 배제할 수 없었다. 결과가 아직 불확실했기 때문이다. 따라서 성공과 실패를 모두 가능한 범위에 두고 논의를 시작했다.",
      "팀은 섣불리 속단하지 않았다. 대신 지난 자료를 바탕으로 일정을 다시 추측했다. 가장 유력한 시나리오는 두 주 지연이었고, 최선의 경우는 일주일 안에 끝나는 것이었다.",
      "예상했던 것보다 변수가 많았다. 그래서 보고서에는 “가능성이 있다”와 “확실하다”를 구분해 썼다. 확신이 없을 때는 그 사실을 인정하는 편이 더 정확하다. 또한 팀은 매주 일정을 다시 확인하기로 했다. 작은 변화도 기록하면 예측이 더 정확해진다. 예측은 계속 바뀐다.",
    ],
    pt: "A possibilidade de o projeto terminar dentro do prazo era de cinquenta por cento. Não dava para garantir o sucesso, mas havia quem dissesse que a possibilidade de fracasso era baixa. O resultado ainda era incerto. A equipe não tirou uma conclusão precipitada. Em vez disso, estimou o cronograma de novo com base nos dados anteriores. O cenário mais provável era um atraso de duas semanas; o melhor caso era terminar em uma semana, mas isso seria mais rápido do que o esperado. Havia mais variáveis do que o previsto. Por isso, o relatório separou “há possibilidade” de “é certo”. Quando não há convicção, reconhecer esse fato é mais exato do que fingir certeza.",
    objective: "Calibrar o grau de certeza e identificar a evidência de cada previsão.",
  },
  reusedIds: ["ko:가능성", "ko:결과", "ko:자료"],
  grammar: [
    ["-ㄹ 듯하다 — parece que; é provável", "동사/형용사 + -ㄹ 듯하다", "Expressa aparência ou suposição: “parece que...”, “é provável que...”. É mais escrito que -것 같다. Compare com -ㄹ 법하다 (ser plausível) e -ㄹ 가능성이 있다 (haver possibilidade). Registro: escrito/neutro.", [["일정이 조금 늦어질 듯해요.", "Parece que o cronograma vai atrasar um pouco."], ["그는 이미 알고 있는 듯했다.", "Ele parecia já saber."]]],
    ["-ㄹ 법하다 — ser plausível; era de se esperar", "동사/형용사 + -ㄹ 법하다", "Indica que algo é plausível ou natural de acontecer: “é de se esperar que...”. Compare com -ㄹ 만하다 (vale a pena) e -ㄹ 듯하다 (parece). Registro: neutro a formal.", [["그 정도 지연은 있을 법해요.", "Um atraso desse tamanho é plausível."], ["그런 실수는 누구나 할 법합니다.", "Qualquer um poderia cometer um erro assim."]]],
  ],
  guided: [
    mcq("Qual é a probabilidade de terminar no prazo?", ["Cinquenta por cento.", "Cem por cento.", "Zero."], "Cinquenta por cento.", "가능성은 반반이에요."),
    cloze("Complete a aparência: 일정이 조금 늦어질 ___해요.", "듯", "늦어질 듯해요 = parece que vai atrasar."),
    listen("Ouça e escreva a probabilidade.", "성공 가능성은 반반이에요.", "성공 가능성은 반반이에요.", "A possibilidade de sucesso é de cinquenta por cento."),
    reading("프로젝트가 기한 안에 끝날 가능성은 반반이었다. 성공을 장담할 수 없었고, 실패 가능성도 배제할 수 없었다. 결과가 아직 불확실했기 때문이다. 따라서 성공과 실패를 모두 가능한 범위에 두고 논의를 시작했다.", "Como estava a situação?", ["Incerta, com possibilidade dividida.", "Já concluída com sucesso.", "Cancelada."], "Incerta, com possibilidade dividida.", "가능성은 반반이고 결과는 불확실했어요."),
    translate("pt-ko", "Traduza: “Parece que o cronograma vai atrasar um pouco.”", "일정이 조금 늦어질 듯해요.", "-ㄹ 듯하다 expressa aparência.", ["일정이 조금 늦어질 것 같아요."]),
  ],
  independent: [
    mcq("Qual frase expressa plausibilidade?", ["그 정도 지연은 있을 법해요.", "그 정도 지연은 반드시 있어요.", "그 정도 지연은 없어요."], "그 정도 지연은 있을 법해요.", "-ㄹ 법하다 = é plausível."),
    cloze("Complete a probabilidade: 결과가 아직 ___해요.", "불확실", "불확실해요 = está incerto."),
    listen("Ouça e escreva o cenário mais provável.", "가장 유력한 시나리오는 두 주 지연이에요.", "가장 유력한 시나리오는 두 주 지연이에요.", "O cenário mais provável é um atraso de duas semanas."),
    translate("ko-pt", "Traduza: 지금 결론을 속단하면 안 돼요.", "Não se deve tirar uma conclusão precipitada agora.", "속단하다 = concluir precipitadamente.", ["Não se deve concluir com pressa agora."]),
    reading("예상했던 것보다 변수가 많았다. 그래서 보고서에는 “가능성이 있다”와 “확실하다”를 구분해 썼다. 확신이 없을 때는 그 사실을 인정하는 편이 더 정확하다. 또한 팀은 매주 일정을 다시 확인하기로 했다. 작은 변화도 기록하면 예측이 더 정확해진다. 예측은 계속 바뀐다.", "O que o relatório separou?", ["Possibilidade e certeza.", "Custo e prazo.", "Online e offline."], "Possibilidade e certeza.", "가능성과 확실성을 구분했어요."),
  ],
  summary: ["-ㄹ 듯하다 expressa aparência provável.", "-ㄹ 법하다 expressa plausibilidade.", "Previsão precisa separar possibilidade de certeza.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · prever com graus de certeza",
    "Faça três previsões sobre um projeto, uma viagem ou um estudo. Use graus diferentes de certeza e diga a evidência de cada uma.",
    "세 가지 예측을 서로 다른 확신도로 써 보세요.",
    ["Apresente o contexto.", "Use -ㄹ 듯하다 e -ㄹ 법하다.", "Varie o grau de certeza.", "Diga a evidência."],
    ["Três previsões.", "Graus de certeza distintos.", "Duas formas da lição.", "Evidência para cada uma.", "Sem prometer certeza absoluta."],
    "이번 시험은 다음 달에 있을 것 같아요. 준비 시간이 부족해서 결과가 불확실해요. 그래도 지금처럼 공부하면 합격할 듯해요. 다만 일정이 갑자기 바뀔 수도 있어요.",
    "A prova deste mês deve ser no próximo mês. Como o tempo de preparação é curto, o resultado é incerto. Mesmo assim, se eu estudar como agora, parece que vou passar. Só que o cronograma pode mudar de repente.",
    "Exemplo original de quatro frases. As previsões têm graus diferentes e a incerteza é explícita. Compare o grau de certeza.",
  ),
});

/** b2-l33 — concessão em adversidade. */
export const B2_L33 = defineB2Lesson({
  id: "b2-l33", number: 33, moduleId: "b2-m07", title: "Mesmo assim",
  objective: "Expressar concessão em situações adversas e reconhecer persistência.",
  prerequisites: ["b2-l32"], estimatedMinutes: 75, dialogueTitle: "A terceira tentativa",
  intro: [
    { title: "Apesar de", body: "-ㄴ/는 데도 expressa concessão factual: “apesar de...”. Use -는 데도 com verbos e -ㄴ/은 데도 com adjetivos. Compare com -에도 불구하고 (mais formal) e -지만 (mais neutro). Registro: neutro.", ko: "어려운 상황인 데도 그는 계속 공부했어요." },
    { title: "Mesmo depois de fazer", body: "-고서도 indica que, mesmo depois de fazer algo, o resultado esperado não ocorre: “mesmo depois de...”. Compare com -고도 (mesmo fazendo) e -았/었는데도 (apesar de ter feito). Registro: neutro a formal.", ko: "시험에 떨어지고서도 포기하지 않았어요." },
  ],
  dialogue: [
    ["아나", "그 사람은 두 번 떨어졌는데도 계속 공부했대요.", "Ouvi dizer que ele continuou estudando mesmo depois de reprovar duas vezes."],
    ["민수", "네. 그럼에도 같은 시간에 도서관에 갔어요. 여전히 규칙적으로 공부했고요.", "Sim. Apesar disso, ia à biblioteca no mesmo horário. Continuava estudando regularmente."],
    ["아나", "주변에서 그만두라고 하지 않았어요?", "As pessoas ao redor não disseram para ele desistir?"],
    ["민수", "많이 했어요. 경제적인 어려움도 있었어요. 그런데 그는 강한 의지로 버텼어요.", "Muito. Também havia dificuldades financeiras. Mas ele resistiu com forte vontade."],
    ["아나", "건강 문제도 있었다면서요?", "Ouvi dizer que também houve problema de saúde."],
    ["민수", "네. 어려움이 있었지만 극복했어요. 역경 속에서도 웃음을 잃지 않았고, 끈기 있게 문제를 풀었어요.", "Sim. Havia um obstáculo, mas ele superou. Mesmo na adversidade, não perdeu o sorriso e resolvia os problemas com persistência."],
    ["아나", "결국 합격했죠?", "E no fim passou, certo?"],
    ["민수", "세 번째 시험에서 합격했어요. 그런데 자신을 특별한 사람이라고 말하지 않았어요. 매일 조금씩 버티는 게 가장 큰 힘이었다고 했어요.", "Passou na terceira prova. Mas não disse que era uma pessoa especial. Disse que resistir um pouco todos os dias foi a maior força."],
  ],
  readingText: {
    titlePt: "O que a persistência não apaga",
    paragraphs: [
      "그는 두 번 시험에 떨어졌지만 그럼에도 계속 공부했다. 여전히 같은 시간에 도서관에 갔고, 끈기 있게 문제를 풀었다. 주변 사람들은 이제 그만두라고 말하기도 했다.",
      "그는 강한 의지로 버텼다. 경제적인 어려움과 건강 문제라는 어려움이 있었지만, 극복할 수 있다고 믿었다. 역경 속에서도 웃음을 잃지 않았다.",
      "세 번째 시험에서 그는 합격했다. 그러나 그는 자신을 특별한 사람이라고 말하지 않았다. 매일 조금씩 버티는 것이 결국 가장 큰 힘이었다고 했다. 그는 지금도 후배들에게 같은 말을 한다. 힘든 날에도 한 걸음씩 나아가면 된다고. 그 말에는 자신의 경험이 담겨 있다. 그 말은 아직도 기억에 남는다.",
    ],
    pt: "Ele reprovou duas vezes, mas, apesar disso, continuou estudando. Ainda ia à biblioteca no mesmo horário e resolvia os problemas com persistência. As pessoas ao redor às vezes diziam para ele desistir. Ele resistiu com forte vontade. Havia obstáculos financeiros e de saúde, mas acreditava que podia superá-los. Mesmo na adversidade, não perdeu o sorriso. Na terceira prova, passou. No entanto, não disse que era uma pessoa especial. Disse que resistir um pouco todos os dias acabou sendo a maior força.",
    objective: "Distinguir obstáculo, concessão e razão para continuar.",
  },
  reusedIds: ["ko:시험", "ko:시간", "ko:사람"],
  grammar: [
    ["-ㄴ/는 데도 — apesar de", "동사 + -는 데도 / 형용사 + -ㄴ/은 데도", "Expressa concessão factual: “apesar de...”. Use -는 데도 com verbos e -ㄴ/은 데도 com adjetivos. Compare com -에도 불구하고 (mais formal) e -지만 (mais neutro). Registro: neutro.", [["어려운 상황인 데도 그는 계속 공부했어요.", "Apesar de a situação ser difícil, ele continuou estudando."], ["비가 오는 데도 많은 사람이 나왔어요.", "Apesar da chuva, muita gente compareceu."]]],
    ["-고서도 — mesmo depois de fazer", "동사 + -고서도", "Indica que, mesmo depois de fazer algo, o resultado esperado não ocorre: “mesmo depois de...”. Compare com -고도 (mesmo fazendo) e -았/었는데도 (apesar de ter feito). Registro: neutro a formal.", [["시험에 떨어지고서도 포기하지 않았어요.", "Mesmo depois de reprovar no exame, não desistiu."], ["약속하고서도 지키지 않았어요.", "Mesmo depois de prometer, não cumpriu."]]],
  ],
  guided: [
    mcq("Quantas vezes ele reprovou antes de passar?", ["Duas vezes.", "Uma vez.", "Nenhuma."], "Duas vezes.", "두 번 떨어졌어요."),
    cloze("Complete a concessão: 어려운 상황인 ___ 그는 계속 공부했어요.", "데도", "상황인 데도 = apesar de a situação ser difícil."),
    listen("Ouça e escreva a persistência.", "시험에 떨어지고서도 포기하지 않았어요.", "시험에 떨어지고서도 포기하지 않았어요.", "Mesmo depois de reprovar no exame, não desistiu."),
    reading("그는 두 번 시험에 떨어졌지만 그럼에도 계속 공부했다. 여전히 같은 시간에 도서관에 갔고, 끈기 있게 문제를 풀었다. 주변 사람들은 이제 그만두라고 말하기도 했다.", "O que ele manteve apesar das reprovações?", ["O horário e a persistência nos estudos.", "O emprego que ele conseguiu no ano anterior.", "A viagem de que falava com os colegas."], "O horário e a persistência nos estudos.", "같은 시간에 도서관에 갔고 끈기 있게 공부했어요."),
    translate("pt-ko", "Traduza: “Mesmo depois de reprovar no exame, não desistiu.”", "시험에 떨어지고서도 포기하지 않았어요.", "-고서도 = mesmo depois de fazer.", ["시험에 떨어지고서도 포기하지 않았습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa concessão factual?", ["비가 오는 데도 많은 사람이 나왔어요.", "비가 와서 사람이 나왔어요.", "비가 오면 사람이 나올 거예요."], "비가 오는 데도 많은 사람이 나왔어요.", "-는 데도 = apesar de."),
    cloze("Complete a concessão: 약속하___ 지키지 않았어요.", "고서도", "약속하고서도 = mesmo depois de prometer."),
    listen("Ouça e escreva o obstáculo superado.", "어려움이 있었지만 극복했어요.", "어려움이 있었지만 극복했어요.", "Havia um obstáculo, mas ele superou."),
    translate("ko-pt", "Traduza: 역경 속에서도 웃음을 잃지 않았어요.", "Mesmo na adversidade, não perdeu o sorriso.", "역경 = adversidade; 잃다 = perder.", ["Não perdeu o sorriso nem na adversidade."]),
    reading("세 번째 시험에서 그는 합격했다. 그러나 그는 자신을 특별한 사람이라고 말하지 않았다. 매일 조금씩 버티는 것이 결국 가장 큰 힘이었다고 했다. 그는 지금도 후배들에게 같은 말을 한다. 힘든 날에도 한 걸음씩 나아가면 된다고. 그 말에는 자신의 경험이 담겨 있다. 그 말은 아직도 기억에 남는다.", "O que ele considerou sua maior força?", ["Resistir um pouco todos os dias.", "A sorte de encontrar a prova certa.", "O talento natural para os estudos."], "Resistir um pouco todos os dias.", "매일 조금씩 버티는 것."),
  ],
  summary: ["-는 데도 expressa concessão factual.", "-고서도 significa mesmo depois de fazer.", "Persistência não apaga o custo do obstáculo.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · persistência com custo",
    "Escreva sobre uma situação em que você continuou apesar de uma dificuldade. Em cinco a sete frases, diga o obstáculo, a concessão e o que aprendeu.",
    "어려움에도 계속한 경험을 써 보세요.",
    ["Descreva o obstáculo.", "Use -는 데도 ou -고서도.", "Reconheça o custo.", "Diga o que aprendeu."],
    ["Obstáculo claro.", "Concessão factual.", "Custo reconhecido.", "Uma forma da lição.", "Aprendizado sem heroísmo."],
    "저는 두 번 시험에 떨어졌어요. 그럼에도 계속 공부했고, 여전히 같은 시간에 도서관에 갔어요. 경제적으로 어려운 데도 포기하지 않았어요. 세 번째에 합격했지만, 저는 특별한 사람이 아니에요. 매일 조금씩 버틴 것이 가장 큰 힘이었어요.",
    "Reprovei duas vezes no exame. Apesar disso, continuei estudando e ainda ia à biblioteca no mesmo horário. Mesmo com dificuldades financeiras, não desisti. Passei na terceira, mas não sou uma pessoa especial. Resistir um pouco todos os dias foi a maior força.",
    "Exemplo original de cinco frases. O custo é reconhecido e não há heroísmo. Compare a estrutura.",
  ),
});

/** b2-l34 — implicação e leitura do não dito. */
export const B2_L34 = defineB2Lesson({
  id: "b2-l34", number: 34, moduleId: "b2-m07", title: "O que isso quer dizer?",
  objective: "Inferir implicações e distinguir o que é dito do que é sugerido.",
  prerequisites: ["b2-l33"], estimatedMinutes: 75, dialogueTitle: "A recusa educada",
  intro: [
    { title: "É como se fosse", body: "-거나 다름없다 significa “é como se fosse”, “não é diferente de”. Indica equivalência prática entre duas coisas. Compare com -나 마찬가지다 (é o mesmo que) e -에 지나지 않는다 (não passa de). Registro: neutro a formal.", ko: "그 말은 거절이나 다름없었어요." },
    { title: "Pode-se dizer que", body: "-ㄴ/는 셈이다 significa “pode-se dizer que”, “equivale a”. Resume uma conclusão a partir dos fatos. Compare com -는 것이다 (é que) e -거나 다름없다 (é como se). Registro: neutro.", ko: "결국 혼자 결정한 셈이에요." },
  ],
  dialogue: [
    ["아나", "동료가 “다음에 다시 이야기해요”라고 했어요.", "A colega disse “vamos conversar de novo na próxima”."],
    ["민수", "긍정으로 들렸어요?", "Pareceu positivo?"],
    ["아나", "처음에는요. 그런데 표면적인 의미와 이면이 다를 수 있잖아요.", "No começo. Mas o sentido de superfície e o avesso podem ser diferentes."],
    ["민수", "맞아요. 그 동료는 직접적으로 거절하지 않고 간접적으로 돌려 말하는 편이에요.", "Exato. Essa colega costuma não recusar diretamente, mas falar de forma indireta."],
    ["아나", "회의에서도 상황을 빗대어 이야기했죠?", "Na reunião também falou por analogia com a situação, certo?"],
    ["민수", "네. “시간이 부족하다”는 말은 “이 일을 더 할 수 없다”는 뜻에 가까워요.", "Sim. “Falta tempo” está mais perto de “não posso fazer mais isso”."],
    ["아나", "그럼 거절이나 다름없네요.", "Então é como se fosse uma recusa."],
    ["민수", "그렇게 볼 수 있어요. 하지만 확인하지 않고 단정하면 오해가 생겨요. 은유와 상징을 읽되, 의도를 확인하는 절차가 필요해요.", "Pode-se ver assim. Mas, se afirmarmos sem confirmar, surge mal-entendido. É preciso ler a metáfora e o símbolo, mas também confirmar a intenção."],
  ],
  readingText: {
    titlePt: "O avesso da frase",
    paragraphs: [
      "동료가 “다음에 다시 이야기해요”라고 했다. 표면적인 의미는 긍정이지만, 이면에는 지금은 어렵다는 뜻이 있을 수 있다. 그는 직접적으로 거절하지 않고 간접적으로 돌려 말하는 편이다.",
      "회의에서도 상황을 빗대어 이야기하는 경우가 있다. “시간이 부족하다”는 말은 “이 일을 더 할 수 없다”는 뜻에 가깝다. 문장은 하나지만, 함의는 여러 가지다.",
      "그 말은 거절이나 다름없었다. 그러나 확인하지 않고 단정하면 오해가 생긴다. 은유와 상징을 읽되, 상대의 의도를 확인하는 절차가 필요하다. 그래서 나는 다음 날 따로 물어보았다. 상대는 잠시 생각하더니 지금은 어렵다고 말했다. 확인은 빠를수록 좋다.",
    ],
    pt: "A colega disse: “vamos conversar de novo na próxima”. O sentido de superfície é positivo, mas o avesso pode significar que agora é difícil. Ela costuma não recusar diretamente, mas falar de forma indireta. Na reunião também houve casos de falar por analogia com a situação. “Falta tempo” está mais perto de “não posso fazer mais este trabalho”. A frase é uma, mas a implicação é múltipla. Aquilo era como uma recusa. No entanto, afirmar sem confirmar gera mal-entendido. É preciso ler a metáfora e o símbolo, mas também ter um procedimento para confirmar a intenção do outro.",
    objective: "Distinguir o dito do sugerido e ancorar a inferência em uma pista textual.",
  },
  reusedIds: ["ko:회의", "ko:의미", "ko:상황"],
  grammar: [
    ["-거나 다름없다 — é como se fosse", "동사 + -거나 다름없다 / 명사 + -(이)나 다름없다", "Significa “é como se fosse”, “não é diferente de”. Indica equivalência prática entre duas coisas. Compare com -나 마찬가지다 (é o mesmo que) e -에 지나지 않는다 (não passa de). Registro: neutro a formal.", [["그 말은 거절이나 다름없었어요.", "Aquelas palavras não eram diferentes de uma recusa."], ["매일 늦는 것은 약속을 안 지키는 것이나 다름없습니다.", "Chegar atrasado todos os dias é como não cumprir o combinado."]]],
    ["-ㄴ/는 셈이다 — pode-se dizer que", "동사/형용사 + -ㄴ/는 셈이다", "Significa “pode-se dizer que”, “equivale a”. Resume uma conclusão a partir dos fatos. Compare com -는 것이다 (é que) e -거나 다름없다 (é como se). Registro: neutro.", [["결국 혼자 결정한 셈이에요.", "No fim, pode-se dizer que decidi sozinho."], ["돈을 두 배로 낸 셈입니다.", "Pode-se dizer que pagamos o dobro."]]],
  ],
  guided: [
    mcq("O que a frase da colega provavelmente significa?", ["Que agora é difícil, dito de forma indireta.", "Que ela aceitou imediatamente.", "Que ela não ouviu."], "Que agora é difícil, dito de forma indireta.", "표면은 긍정이지만 이면은 거절에 가까워요."),
    cloze("Complete a equivalência: 그 말은 거절이___ 다름없었어요.", "나", "거절이나 다름없다 = é como se fosse recusa."),
    listen("Ouça e escreva a implicação.", "“시간이 부족하다”는 말은 더 할 수 없다는 뜻에 가까워요.", "“시간이 부족하다”는 말은 더 할 수 없다는 뜻에 가까워요.", "“Falta tempo” está mais perto de “não posso fazer mais”."),
    reading("동료가 “다음에 다시 이야기해요”라고 했다. 표면적인 의미는 긍정이지만, 이면에는 지금은 어렵다는 뜻이 있을 수 있다. 그는 직접적으로 거절하지 않고 돌려 말하는 편이다.", "O que a frase pode implicar?", ["Que agora é difícil.", "Que o projeto acabou.", "Que ela vai viajar."], "Que agora é difícil.", "이면에는 지금은 어렵다는 뜻이 있을 수 있어요."),
    translate("pt-ko", "Traduza: “Aquelas palavras não eram diferentes de uma recusa.”", "그 말은 거절이나 다름없었어요.", "-거나 다름없다 = é como se fosse.", ["그 말은 거절이나 마찬가지였어요."]),
  ],
  independent: [
    mcq("Qual frase resume uma conclusão?", ["결국 혼자 결정한 셈이에요.", "결국 혼자 결정했어요.", "결국 혼자 결정할 거예요."], "결국 혼자 결정한 셈이에요.", "-ㄴ/는 셈이다 = pode-se dizer que."),
    cloze("Complete a equivalência: 매일 늦는 것은 약속을 안 지키는 것이___ 다름없어요.", "나", "지키는 것이나 다름없다 = é como não cumprir."),
    listen("Ouça e escreva a conclusão resumida.", "결국 혼자 결정한 셈이에요.", "결국 혼자 결정한 셈이에요.", "No fim, pode-se dizer que decidi sozinho."),
    translate("ko-pt", "Traduza: 확인하지 않고 단정하면 오해가 생겨요.", "Se afirmarmos sem confirmar, surge mal-entendido.", "단정하다 = afirmar; 오해 = mal-entendido.", ["Afirmar sem confirmar gera mal-entendidos."]),
    reading("그 말은 거절이나 다름없었다. 그러나 확인하지 않고 단정하면 오해가 생긴다. 은유와 상징을 읽되, 상대의 의도를 확인하는 절차가 필요하다. 그래서 나는 다음 날 따로 물어보았다. 상대는 잠시 생각하더니 지금은 어렵다고 말했다. 확인은 빠를수록 좋다.", "O que é necessário além de interpretar?", ["Confirmar a intenção do outro.", "Ignorar a fala.", "Responder imediatamente."], "Confirmar a intenção do outro.", "상대의 의도를 확인하는 절차."),
  ],
  summary: ["-거나 다름없다 indica equivalência prática.", "-ㄴ/는 셈이다 resume uma conclusão.", "Implicação precisa de pista e confirmação.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · ler uma implicação",
    "Descreva uma fala indireta e duas implicações possíveis. Em cinco a sete frases, diga a pista, a interpretação e como confirmaria.",
    "간접적인 말의 의미를 두 가지로 해석해 보세요.",
    ["Cite a fala.", "Apresente duas implicações.", "Use -거나 다름없다 ou -ㄴ/는 셈이다.", "Diga como confirmaria."],
    ["Fala citada.", "Duas implicações.", "Pista textual.", "Uma forma da lição.", "Confirmação proposta."],
    "동료가 “다음에 다시 이야기해요”라고 했어요. 표면적으로는 긍정이지만, 지금은 어렵다는 뜻일 수도 있어요. 그 말은 거절이나 다름없었어요. 그래도 확인하지 않고 단정하면 오해가 생기니까, 다음 날 따로 물어볼 거예요.",
    "A colega disse “vamos conversar de novo na próxima”. Na superfície é positivo, mas pode significar que agora é difícil. Aquilo era como uma recusa. Mesmo assim, como afirmar sem confirmar gera mal-entendido, vou perguntar separadamente no dia seguinte.",
    "Exemplo original de quatro frases. A implicação é marcada como possibilidade e há confirmação. Compare a estrutura.",
  ),
});

/** b2-l35 — nuances interpessoais e reparação. */
export const B2_L35 = defineB2Lesson({
  id: "b2-l35", number: 35, moduleId: "b2-m07", title: "Nas entrelinhas do convívio",
  objective: "Interpretar nuances interpessoais e lidar com mal-entendidos.",
  prerequisites: ["b2-l34"], estimatedMinutes: 75, dialogueTitle: "O \"está tudo bem\"",
  intro: [
    { title: "Fingir que", body: "-ㄴ/는 척하다 significa “fingir que...”. Use -는 척 com verbos e -ㄴ/은 척 com adjetivos. Compare com -는 체하다 (fingir, mais formal) e -는 듯하다 (parecer, sem intenção de enganar). Registro: neutro.", ko: "그는 아무 일도 없는 척했어요." },
    { title: "Não há como", body: "-ㄹ 리가 없다 significa “não há como...”, “é impossível que...”. Nega uma expectativa com forte convicção. Compare com -ㄹ 수 없다 (não poder) e -지 않을 리가 없다 (não há como não). Registro: neutro.", ko: "그가 화난 걸 모를 리가 없어요." },
  ],
  dialogue: [
    ["아나", "지민이가 “괜찮아”라고 했는데 표정이 안 좋았어요.", "A Jimin disse “estou bem”, mas a expressão não estava boa."],
    ["민수", "아무 일도 없는 척했지만, 목소리가 떨렸어요.", "Ela fingiu que não havia nada, mas a voz tremia."],
    ["아나", "속마음을 드러내지 않는 편이죠?", "Ela costuma não revelar o que sente, né?"],
    ["민수", "네. 억누른 감정은 사라지지 않아요. 슬픔을 숨기고 웃어도 대화가 어색하게 끝나요.", "Sim. Emoção reprimida não desaparece. Mesmo escondendo a tristeza e sorrindo, a conversa termina de forma estranha."],
    ["아나", "그럼 어떻게 물어봐야 해요?", "Então como devo perguntar?"],
    ["민수", "“정말 괜찮아?”라고 직접 물어보세요. 괜찮은 척하는 마음은 이해할 수 있지만, 혼자 감당할 필요는 없어요.", "Pergunte diretamente: “Você está mesmo bem?”. Entendo a vontade de fingir que está tudo bem, mas não é preciso aguentar sozinha."],
    ["아나", "제가 너무 캐물으면 어때요?", "E se eu insistir demais?"],
    ["민수", "한 번에 다 말하라고 하지 마세요. 기다리면 속마음을 털어놓을 거예요. 거짓말이 결국 들켰지만, 아나 씨를 속이고 싶지 않았대요. 그 점도 이해해 주세요.", "Não exija que ela conte tudo de uma vez. Se esperar, ela vai confidenciar o que sente. Mesmo que a mentira tenha acabado aparecendo, entenda que ela não queria enganar você."],
  ],
  readingText: {
    titlePt: "Quando o “está tudo bem” não é bem",
    paragraphs: [
      "친구가 “괜찮아”라고 했지만, 표정은 밝지 않았다. 친구는 아무 일도 없는 척했지만, 목소리는 떨렸다. 나는 속마음을 드러내지 않는 친구를 오래 봐 왔다.",
      "억누른 감정은 사라지지 않는다. 슬픔을 숨기고 웃어도, 대화는 어색하게 끝난다. 그때 나는 “정말 괜찮아?”라고 물었고, 친구는 잠시 망설이다 속마음을 털어놓았다.",
      "거짓말이 결국 들켰지만, 친구는 나를 속이고 싶지 않았던 것이다. 서로 솔직해지자 분위기가 풀렸다. 괜찮은 척하는 마음은 이해할 수 있지만, 혼자 감당할 필요는 없다. 그날 우리는 오래 이야기했고, 다음부터는 괜찮지 않을 때 먼저 말하기로 했다. 솔직함이 관계를 더 편하게 만든다.",
    ],
    pt: "A amiga disse “estou bem”, mas o rosto não estava claro. Ela fingiu que não havia nada, mas a voz tremia. Eu conhecia há muito tempo aquela amiga que não revelava o que sentia. Emoção reprimida não desaparece. Mesmo escondendo a tristeza e sorrindo, a conversa termina de forma estranha. Naquele momento, perguntei: “Você está mesmo bem?”. Ela hesitou e, depois, confidenciou o que sentia. A mentira acabou aparecendo, mas ela não queria enganar o amigo. Quando ficamos sinceros um com o outro, o clima se desanuviou. Entendo a vontade de fingir que está tudo bem, mas não é preciso aguentar sozinho.",
    objective: "Reconhecer o que é fingido, o que é sentido e a pista que revela o desconforto.",
  },
  reusedIds: ["ko:감정", "ko:친구", "ko:웃다"],
  grammar: [
    ["-ㄴ/는 척하다 — fingir que", "동사 + -는 척하다 / 형용사 + -ㄴ/은 척하다", "Significa “fingir que...”. Use -는 척 com verbos e -ㄴ/은 척 com adjetivos. Compare com -는 체하다 (fingir, mais formal) e -는 듯하다 (parecer, sem intenção de enganar). Registro: neutro.", [["그는 아무 일도 없는 척했어요.", "Ele fingiu que não havia nada."], ["모르는 척하지 말고 말해 주세요.", "Não finja que não sabe; por favor, diga."]]],
    ["-ㄹ 리가 없다 — não há como", "동사/형용사 + -ㄹ 리가 없다", "Significa “não há como...”, “é impossível que...”. Nega uma expectativa com forte convicção. Compare com -ㄹ 수 없다 (não poder) e -지 않을 리가 없다 (não há como não). Registro: neutro.", [["그가 화난 걸 모를 리가 없어요.", "Não há como ele não saber que ela está irritada."], ["그 사람이 약속을 잊을 리가 없습니다.", "Não há como ele esquecer o combinado."]]],
  ],
  guided: [
    mcq("O que Jimin estava fazendo?", ["Fingindo que estava tudo bem.", "Contando toda a verdade.", "Pedindo desculpas."], "Fingindo que estava tudo bem.", "아무 일도 없는 척했어요."),
    cloze("Complete a aparência fingida: 그는 아무 일도 없___ 척했어요.", "는", "없는 척했어요 = fingiu que não havia nada."),
    listen("Ouça e escreva a convicção.", "그가 화난 걸 모를 리가 없어요.", "그가 화난 걸 모를 리가 없어요.", "Não há como ele não saber que ela está irritada."),
    reading("친구가 “괜찮아”라고 했지만, 표정은 밝지 않았다. 친구는 아무 일도 없는 척했지만, 목소리는 떨렸다. 나는 속마음을 드러내지 않는 친구를 오래 봐 왔다.", "Qual pista revelava o desconforto?", ["A voz tremia, apesar do “estou bem”.", "Ela estava rindo alto.", "Ela não disse nada."], "A voz tremia, apesar do “estou bem”.", "목소리가 떨렸어요."),
    translate("pt-ko", "Traduza: “Não há como ele não saber que ela está irritada.”", "그가 화난 걸 모를 리가 없어요.", "-ㄹ 리가 없다 expressa forte convicção negativa.", ["그가 화난 걸 모를 리가 없습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa “fingir que”?", ["모르는 척하지 마세요.", "모르세요? 정말 모르세요?", "모를 거예요. 아마도요."], "모르는 척하지 마세요.", "-는 척하다 = fingir que."),
    cloze("Complete a convicção: 그 사람이 약속을 잊을 ___가 없습니다.", "리", "잊을 리가 없다 = não há como esquecer."),
    listen("Ouça e escreva o que ela confidenciou.", "결국 속마음을 털어놓았어요.", "결국 속마음을 털어놓았어요.", "No fim, ela confidenciou o que sentia."),
    translate("ko-pt", "Traduza: 억누른 감정은 사라지지 않아요.", "Emoção reprimida não desaparece.", "억누르다 = reprimir; 사라지다 = desaparecer.", ["Sentimentos reprimidos não somem."]),
    reading("거짓말이 결국 들켰지만, 친구는 나를 속이고 싶지 않았던 것이다. 서로 솔직해지자 분위기가 풀렸다. 괜찮은 척하는 마음은 이해할 수 있지만, 혼자 감당할 필요는 없다. 그날 우리는 오래 이야기했고, 다음부터는 괜찮지 않을 때 먼저 말하기로 했다. 솔직함이 관계를 더 편하게 만든다.", "O que ajudou a resolver o mal-entendido?", ["Sinceridade mútua e tempo para falar.", "Insistir imediatamente.", "Ignorar o desconforto."], "Sinceridade mútua e tempo para falar.", "서로 솔직해지자 분위기가 풀렸어요."),
  ],
  summary: ["-ㄴ/는 척하다 significa fingir que.", "-ㄹ 리가 없다 nega com convicção.", "Nuance interpessoal exige pista e cuidado.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · reparar um mal-entendido",
    "Escreva uma mensagem de reparação em cinco a sete frases. Reconheça o contexto, o impacto, o que foi mal interpretado e um pedido concreto.",
    "오해를 풀기 위한 메시지를 써 보세요.",
    ["Descreva o contexto sem acusar.", "Reconheça o impacto.", "Use -ㄴ/는 척하다 ou -ㄹ 리가 없다.", "Faça um pedido concreto."],
    ["Contexto claro.", "Impacto reconhecido.", "Uma forma da lição.", "Pedido concreto.", "Sem exigir perdão."],
    "어제 제가 아무렇지 않은 척해서 오해가 생긴 것 같아요. 제 말이 무관심하게 들렸다면 미안해요. 그런 뜻은 아니었어요. 시간을 주시면 제가 왜 그렇게 말했는지 설명하고 싶어요.",
    "Acho que o mal-entendido surgiu porque ontem fingi que estava tudo bem. Desculpe se minhas palavras soaram indiferentes. Não era essa a intenção. Se você me der um tempo, gostaria de explicar por que falei daquele jeito.",
    "Exemplo original de quatro frases. Contexto, impacto e pedido aparecem sem exigir perdão. Compare o tom.",
  ),
});
