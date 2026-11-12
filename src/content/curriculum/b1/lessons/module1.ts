import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l02 — ações interrompidas e imediatas. */
export const B1_L02 = defineB1Lesson({
  id: "b1-l02", number: 2, moduleId: "b1-m01", title: "Enquanto voltava",
  objective: "Encadear ações interrompidas e acontecimentos imediatos em um relato de trajeto.",
  prerequisites: ["b1-l01"], estimatedMinutes: 65, dialogueTitle: "O imprevisto no caminho",
  intro: [
    { title: "Interrupção com -다가", body: "A forma -다가 mostra que uma ação foi interrompida por outra. Não indica que a primeira terminou; muitas vezes ela fica incompleta.", ko: "걷다가 넘어졌어요." },
    { title: "Imediato com -자마자", body: "-자마자 indica que a segunda ação aconteceu logo depois da primeira, quase sem intervalo. Use com verbos de ação e mantenha o tempo na oração final.", ko: "집을 나가자마자 비가 왔어요." },
  ],
  dialogue: [
    ["마르코", "오늘 왜 늦었어요?", "Por que você chegou tarde hoje?"],
    ["수진", "지하철에서 내리다가 넘어졌어요. 다행히 크게 다치지는 않았어요.", "Caí ao descer do metrô. Felizmente não me machuquei gravemente."],
    ["마르코", "그래서 병원에 갔어요?", "Então você foi ao hospital?"],
    ["수진", "아니요. 약국에 가자마자 약을 샀어요. 그리고 바로 회사로 갔어요.", "Não. Assim que cheguei à farmácia, comprei o remédio. E fui direto para a empresa."],
    ["마르코", "길이 미끄러웠겠어요.", "O chão devia estar escorregadio."],
    ["수진", "네. 조심스럽게 걸었지만 사람이 많아서 다시 부딪혔어요.", "Sim. Andei com cuidado, mas havia muita gente e esbarrei de novo."],
  ],
  reusedIds: ["ko:지하철", "ko:길", "ko:친구", "ko:시간"],
  grammar: [
    ["-다가 — ação interrompida", "동사 + -다가", "Use -다가 quando uma ação em andamento é interrompida por outra. A primeira ação não precisa ter terminado.", [["걷다가 넘어졌어요.", "Caí enquanto caminhava."], ["이야기하다가 전화를 받았어요.", "Atendi ao telefone enquanto conversava."]]],
    ["-자마자 — logo que", "동사 + -자마자", "A segunda ação acontece imediatamente depois da primeira. É mais forte que -고 나서 e não aceita ordem na segunda parte.", [["집을 나가자마자 비가 왔어요.", "Assim que saí de casa, choveu."], ["약국에 가자마자 약을 샀어요.", "Assim que cheguei à farmácia, comprei o remédio."]]],
  ],
  guided: [
    mcq("O que aconteceu com Sujin?", ["Ela caiu ao descer do metrô.", "Ela perdeu o metrô.", "Ela esqueceu o remédio."], "Ela caiu ao descer do metrô.", "내리다가 넘어졌어요."),
    cloze("Complete a interrupção: 지하철에서 내리___ 넘어졌어요.", "다가", "내리다가 indica a ação interrompida."),
    listen("Ouça e escreva o que ela fez ao chegar à farmácia.", "약국에 가자마자 약을 샀어요.", "약국에 가자마자 약을 샀어요.", "Assim que chegou à farmácia, comprou o remédio.", ["약국에 가자마자 약을 샀어요"]),
    reading("수진은 지하철에서 내리다가 넘어졌어요. 약국에 가자마자 약을 샀고 바로 회사로 갔어요.", "Qual foi a sequência?", ["Caiu, comprou remédio e foi ao trabalho.", "Foi ao hospital e voltou para casa.", "Perdeu o metrô e faltou ao trabalho."], "Caiu, comprou remédio e foi ao trabalho.", "내리다가 → 약국 → 회사."),
    translate("pt-ko", "Traduza: “Assim que saí de casa, começou a chover.”", "집을 나가자마자 비가 왔어요.", "나가자마자 indica imediatamente depois.", ["집에서 나가자마자 비가 왔어요."]),
  ],
  independent: [
    mcq("Qual frase indica interrupção?", ["걷다가 넘어졌어요.", "걸어서 넘어졌어요.", "걸을 거예요."], "걷다가 넘어졌어요.", "-다가 interrompe a caminhada."),
    cloze("Complete o imediato: 집을 나가___ 비가 왔어요.", "자마자", "나가자마자 significa “assim que saí”."),
    listen("Ouça e escreva o problema no caminho.", "사람이 많아서 다시 부딪혔어요.", "사람이 많아서 다시 부딪혔어요.", "Havia muita gente e ela esbarrou de novo.", ["사람이 많아서 다시 부딪혔어요"]),
    translate("ko-pt", "Traduza: 걷다가 친구를 만났어요.", "Encontrei um amigo enquanto caminhava.", "걷다가 marca a ação interrompida.", ["Enquanto caminhava, encontrei um amigo."]),
    reading("비가 오는 날에는 길이 미끄러워요. 뛰다가 넘어지는 사람도 많아요. 그래서 천천히 걷는 게 좋아요.", "Qual é o conselho?", ["Caminhar devagar em dias de chuva.", "Correr para chegar mais rápido.", "Evitar o transporte público."], "Caminhar devagar em dias de chuva.", "천천히 걷는 게 좋아요."),
  ],
  summary: ["-다가 interrompe uma ação em andamento.", "-자마자 marca imediatismo.", "O relato de trajeto combina causa, sequência e avaliação.", "Conteúdo novo permanece em revisão."],
  production: { titlePt: "Produção independente · um trajeto", promptPt: "Narre um trajeto em que algo inesperado aconteceu. Use de cinco a sete frases.", promptKo: "길에서 있었던 일을 이야기해 보세요.", guidance: ["Diga para onde ia.", "Use -다가 ou -자마자 uma vez.", "Explique a consequência."], checklist: ["Situação inicial clara.", "Uma interrupção ou ação imediata.", "Consequência e avaliação final.", "Verbos no tempo adequado."], minWords: 35 },
});

export const B1_L03 = defineB1Lesson({
  id: "b1-l03", number: 3, moduleId: "b1-m01", title: "O que ele disse",
  objective: "Relatar falas e perguntas de outra pessoa com fonte explícita.",
  prerequisites: ["b1-l02"], estimatedMinutes: 65, dialogueTitle: "O recado errado",
  intro: [
    { title: "Fala relatada", body: "Para relatar uma afirmação, use -다고 하다. O verbo 하다 pode virar 했어요, 말했어요 ou 전했어요.", ko: "내일 온다고 했어요." },
    { title: "Pergunta relatada", body: "Para relatar uma pergunta, use -냐고 하다. Não copie a entonação da pergunta original.", ko: "어디에 가냐고 물었어요." },
  ],
  dialogue: [
    ["지민", "민수 씨가 뭐라고 했어요?", "O que Minsu disse?"],
    ["수진", "내일 회의에 못 온다고 했어요.", "Ele disse que não poderá vir à reunião amanhã."],
    ["지민", "이유도 말했어요?", "Ele disse o motivo?"],
    ["수진", "몸이 안 좋냐고 물었는데 대답하지 않았어요.", "Perguntei se ele não estava bem, mas ele não respondeu."],
    ["지민", "그럼 제가 다시 전화해 볼게요.", "Então vou ligar de novo."],
  ],
  reusedIds: ["ko:이야기하다", "ko:친구", "ko:말하다", "ko:사람"],
  grammar: [
    ["-다고 하다 — afirmação relatada", "동사/형용사 + -다고 하다", "Use -다고 하다 para relatar o que alguém disse. O tempo pode aparecer na citação ou em 하다; mantenha a perspectiva de quem relata.", [["내일 온다고 했어요.", "Ele disse que vem amanhã."], ["바쁘다고 말했어요.", "Ele disse que está ocupado."]]],
    ["-냐고 하다 — pergunta relatada", "동사/형용사 + -냐고 하다", "A forma relata uma pergunta. Com verbos de movimento, a citação mantém a forma interrogativa sem o ponto de interrogação final.", [["어디에 가냐고 물었어요.", "Perguntei aonde ele ia."], ["몸이 안 좋냐고 했어요.", "Perguntei se ele não estava bem."]]],
  ],
  guided: [
    mcq("O que Minsu disse?", ["Que não poderá ir à reunião.", "Que chegou cedo.", "Que perdeu o telefone."], "Que não poderá ir à reunião.", "못 온다고 했어요."),
    cloze("Complete o relato: 내일 온___ 했어요.", "다고", "온다고 했어요 relata a fala."),
    listen("Ouça e escreva a pergunta relatada.", "몸이 안 좋냐고 물었어요.", "몸이 안 좋냐고 물었어요.", "Perguntei se ele não estava bem.", ["몸이 안 좋냐고 물었어요"]),
    reading("민수는 내일 회의에 못 온다고 했어요. 수진이 이유를 물었지만 그는 대답하지 않았어요.", "O que Minsu não fez?", ["Não explicou o motivo.", "Não recebeu o recado.", "Não foi ao médico."], "Não explicou o motivo.", "대답하지 않았어요."),
    translate("pt-ko", "Traduza: “Ele disse que está ocupado.”", "바쁘다고 했어요.", "바쁘다고 relata a afirmação.", ["그는 바쁘다고 말했어요."]),
  ],
  independent: [
    mcq("Qual frase relata uma pergunta?", ["어디에 가냐고 했어요.", "어디에 간다고 했어요.", "어디에 갔어요."], "어디에 가냐고 했어요.", "-냐고 relata pergunta."),
    cloze("Complete: 내일 온___ 말했어요.", "다고", "온다고 말했어요."),
    listen("Ouça e escreva a afirmação relatada.", "바쁘다고 말했어요.", "바쁘다고 말했어요.", "Ele disse que estava ocupado.", ["바쁘다고 말했어요"]),
    translate("ko-pt", "Traduza: 내일 회의에 못 온다고 했어요.", "Ele disse que não poderá vir à reunião amanhã.", "못 온다고 relata a impossibilidade.", ["Ele disse que não pode vir à reunião amanhã."]),
    reading("소문을 그대로 전하면 오해가 생길 수 있어요. 누가 말했는지, 정확히 무엇을 말했는지 확인하는 게 중요해요.", "Qual é o conselho?", ["Confirmar a fonte e o conteúdo.", "Repetir tudo rapidamente.", "Evitar falar com amigos."], "Confirmar a fonte e o conteúdo.", "누가 말했는지, 무엇을 말했는지 확인해요."),
  ],
  summary: ["-다고 하다 relata afirmações.", "-냐고 하다 relata perguntas.", "A fonte deve ser explícita em um recado.", "Confirmar antes de transmitir evita mal-entendidos."],
  production: { titlePt: "Produção independente · transmitir um recado", promptPt: "Escreva um recado que você recebeu e explique a fonte, o conteúdo e uma dúvida. Use de quatro a seis frases.", promptKo: "친구에게 들은 이야기를 전해 보세요.", guidance: ["Diga quem falou.", "Use -다고/-냐고 uma vez.", "Inclua uma confirmação."], checklist: ["Fonte identificada.", "Fala relatada corretamente.", "Uma pergunta ou confirmação.", "Fechamento claro."], minWords: 30 },
});

export const B1_L04 = defineB1Lesson({
  id: "b1-l04", number: 4, moduleId: "b1-m01", title: "Se eu pudesse voltar",
  objective: "Expressar arrependimento, desejo e hipótese sobre o passado.",
  prerequisites: ["b1-l03"], estimatedMinutes: 65, dialogueTitle: "A escolha de outra época",
  intro: [
    { title: "Desejo com -았/었으면 좋겠다", body: "Use a forma de passado antes de -으면 좋겠다 para desejar que algo do passado tivesse sido diferente.", ko: "그때 더 용기를 냈으면 좋겠어요." },
    { title: "Hipótese irreal com -더라면", body: "-더라면 introduz uma condição que não aconteceu. A consequência também fica no passado hipotético.", ko: "시간을 되돌릴 수 있더라면 다시 도전했을 거예요." },
  ],
  dialogue: [
    ["지민", "그 선택을 아직도 후회해요?", "Você ainda se arrepende daquela escolha?"],
    ["수진", "가끔요. 그때 더 용기를 냈으면 좋겠어요.", "Às vezes. Gostaria de ter tido mais coragem naquela época."],
    ["지민", "시간을 되돌릴 수 있더라면 뭐를 바꿀 거예요?", "Se pudesse voltar o tempo, o que mudaria?"],
    ["수진", "먼저 사과했을 거예요. 그래서 지금은 망설이지 않으려고 해요.", "Teria pedido desculpas primeiro. Por isso, agora tento não hesitar."],
    ["지민", "그 결정도 의미가 있었을 거예요.", "Aquela decisão também deve ter tido significado."],
  ],
  reusedIds: ["ko:시간", "ko:생각하다", "ko:선택", "ko:여행"],
  grammar: [
    ["-았/었으면 좋겠다 — desejo sobre o passado", "동사 + -았/었으면 좋겠다", "Expressa que o falante gostaria que algo tivesse acontecido de outra forma. Não muda o passado; é um desejo ou arrependimento.", [["더 용기를 냈으면 좋겠어요.", "Gostaria de ter tido mais coragem."], ["먼저 사과했으면 좋겠어요.", "Gostaria de ter pedido desculpas primeiro."]]],
    ["-더라면 — hipótese irreal", "동사/형용사 + -더라면", "A forma imagina uma situação contrária ao que aconteceu. A oração seguinte costuma usar -았/었을 거예요.", [["시간을 되돌릴 수 있더라면 다시 도전했을 거예요.", "Se pudesse voltar o tempo, teria tentado de novo."], ["그때 알더라면 다른 선택을 했을 거예요.", "Se soubesse na época, teria feito outra escolha."]]],
  ],
  guided: [
    mcq("O que Sujin gostaria de ter feito?", ["Ter tido mais coragem.", "Ter comprado uma passagem.", "Ter mudado de cidade."], "Ter tido mais coragem.", "더 용기를 냈으면 좋겠어요."),
    cloze("Complete o desejo: 더 용기를 냈___ 좋겠어요.", "으면", "냈으면 좋겠어요."),
    listen("Ouça e escreva a hipótese.", "시간을 되돌릴 수 있더라면 다시 도전했을 거예요.", "시간을 되돌릴 수 있더라면 다시 도전했을 거예요.", "Se pudesse voltar o tempo, teria tentado de novo.", ["시간을 되돌릴 수 있더라면 다시 도전했을 거예요"]),
    reading("수진은 그 선택을 가끔 후회해요. 시간을 되돌릴 수 있더라면 먼저 사과했을 거예요.", "O que ela teria feito?", ["Pedido desculpas primeiro.", "Comprado uma casa.", "Mudado de profissão."], "Pedido desculpas primeiro.", "먼저 사과했을 거예요."),
    translate("pt-ko", "Traduza: “Gostaria de ter tido mais coragem.”", "더 용기를 냈으면 좋겠어요.", "냈으면 좋겠어요.", ["그때 더 용기를 냈으면 좋겠어요."]),
  ],
  independent: [
    mcq("Qual frase expressa hipótese irreal?", ["알더라면 바꿨을 거예요.", "알면 바꿀 거예요.", "알아서 바꿨어요."], "알더라면 바꿨을 거예요.", "-더라면 apresenta hipótese contrária."),
    cloze("Complete a hipótese: 시간을 되돌릴 수 있___ 다시 도전했을 거예요.", "더라면", "있더라면."),
    listen("Ouça e escreva o arrependimento.", "먼저 사과했으면 좋겠어요.", "먼저 사과했으면 좋겠어요.", "Gostaria de ter pedido desculpas primeiro.", ["먼저 사과했으면 좋겠어요"]),
    translate("ko-pt", "Traduza: 그 결정도 의미가 있었을 거예요.", "Aquela decisão também deve ter tido significado.", "의미가 있었을 거예요.", ["Aquela decisão também deve ter sido significativa."]),
    reading("후회는 과거를 바꾸지 못해요. 하지만 다음 선택을 더 신중하게 만들 수는 있어요.", "Qual é a mensagem?", ["O arrependimento pode orientar escolhas futuras.", "Nunca se deve sentir arrependimento.", "O passado pode ser mudado."], "O arrependimento pode orientar escolhas futuras.", "다음 선택을 더 신중하게 만들 수 있어요."),
  ],
  summary: ["-았/었으면 좋겠다 expressa desejo sobre o passado.", "-더라면 introduz hipótese irreal.", "Arrependimento não muda o passado, mas pode orientar o futuro.", "Conteúdo em revisão."],
  production: { titlePt: "Produção independente · uma escolha passada", promptPt: "Escreva sobre uma escolha que você faria diferente. Use de quatro a seis frases.", promptKo: "과거의 선택에 대해 써 보세요.", guidance: ["Descreva a escolha.", "Use um desejo ou hipótese.", "Diga o que aprendeu."], checklist: ["Passado claro.", "Desejo ou hipótese presente.", "Aprendizado final.", "Coerência temporal."], minWords: 30 },
});

export const B1_L05 = defineB1Lesson({
  id: "b1-l05", number: 5, moduleId: "b1-m01", title: "Uma mudança inesperada",
  objective: "Narrar mudanças involuntárias e consequências definitivas.",
  prerequisites: ["b1-l04"], estimatedMinutes: 70, dialogueTitle: "A mudança que ninguém planejou",
  intro: [
    { title: "-아/어 버리다 — consequência definitiva", body: "A forma acrescenta a ideia de que a ação foi concluída e não pode ser desfeita com facilidade. Pode expressar alívio ou arrependimento.", ko: "계획을 잃어버렸어요." },
    { title: "-고 말다 — acabou acontecendo", body: "A forma mostra que algo indesejado acabou acontecendo, apesar dos esforços. É comum em relatos de imprevisto.", ko: "결국 이사하고 말았어요." },
  ],
  dialogue: [
    ["마르코", "갑자기 이사하게 됐다면서요?", "Ouvi dizer que você acabou se mudando de repente."],
    ["수진", "네. 집주인이 계약을 갑자기 바꿔 버렸어요.", "Sim. O locador mudou o contrato de repente."],
    ["마르코", "그래서 어떻게 됐어요?", "E o que aconteceu?"],
    ["수진", "결국 한 달 만에 이사하고 말았어요. 계획이 완전히 엉망이 됐어요.", "No fim, acabei me mudando em um mês. O plano virou uma bagunça."],
    ["마르코", "그래도 새집은 괜찮아요?", "Mesmo assim, a casa nova é boa?"],
    ["수진", "처음에는 낯설었지만 지금은 적응했어요.", "No começo era estranha, mas agora me adaptei."],
  ],
  reusedIds: ["ko:이사", "ko:가족", "ko:회사", "ko:집"],
  grammar: [
    ["-아/어 버리다 — ação concluída", "동사 + -아/어 버리다", "A forma indica que a ação foi levada até o fim e traz uma avaliação do falante. Pode ser alívio, surpresa ou arrependimento.", [["계약을 바꿔 버렸어요.", "Ele acabou mudando o contrato."], ["숙제를 다 해 버렸어요.", "Acabei terminando toda a tarefa."]]],
    ["-고 말다 — acabou acontecendo", "동사 + -고 말다", "Mostra que um resultado indesejado aconteceu no fim. A forma no passado é -고 말았어요.", [["결국 이사하고 말았어요.", "No fim, acabei me mudando."], ["약속에 늦고 말았어요.", "Acabei me atrasando para o compromisso."]]],
  ],
  guided: [
    mcq("Por que Sujin se mudou?", ["O locador mudou o contrato.", "Ela comprou uma casa.", "A família pediu."], "O locador mudou o contrato.", "집주인이 계약을 바꿔 버렸어요."),
    cloze("Complete a consequência: 결국 이사하___ 말았어요.", "고", "이사하고 말았어요."),
    listen("Ouça e escreva o que aconteceu com o plano.", "계획이 완전히 엉망이 됐어요.", "계획이 완전히 엉망이 됐어요.", "O plano virou uma bagunça.", ["계획이 완전히 엉망이 됐어요"]),
    reading("수진은 한 달 만에 이사하고 말았어요. 처음에는 낯설었지만 지금은 적응했어요.", "Como ela está agora?", ["Adaptada.", "Ainda sem casa.", "De volta à casa antiga."], "Adaptada.", "지금은 적응했어요."),
    translate("pt-ko", "Traduza: “No fim, acabei me mudando.”", "결국 이사하고 말았어요.", "이사하고 말았어요.", ["결국 이사를 하고 말았어요."]),
  ],
  independent: [
    mcq("Qual forma indica resultado indesejado?", ["이사하고 말았어요.", "이사했어요.", "이사할 거예요."], "이사하고 말았어요.", "-고 말았어요."),
    cloze("Complete a ação definitiva: 계약을 바꿔 ___.", "버렸어요", "바꿔 버렸어요."),
    listen("Ouça e escreva a adaptação.", "지금은 적응했어요.", "지금은 적응했어요.", "Agora ela se adaptou.", ["지금은 적응했어요"]),
    translate("ko-pt", "Traduza: 계획이 완전히 엉망이 됐어요.", "O plano virou uma bagunça completa.", "엉망이 됐어요.", ["O plano ficou completamente bagunçado."]),
    reading("예상하지 못한 변화는 힘들지만, 시간이 지나면 새로운 환경에 적응하기도 해요.", "Qual é a mensagem?", ["É possível se adaptar com o tempo.", "Mudanças nunca terminam bem.", "Não se deve planejar."], "É possível se adaptar com o tempo.", "시간이 지나면 적응하기도 해요."),
  ],
  summary: ["-아/어 버리다 marca conclusão com avaliação.", "-고 말다 marca resultado indesejado.", "Mudanças inesperadas exigem adaptação.", "Conteúdo em revisão."],
  production: { titlePt: "Produção independente · mudança inesperada", promptPt: "Narre uma mudança que você não planejou e como se adaptou. Use de cinco a sete frases.", promptKo: "예상하지 못한 변화에 대해 써 보세요.", guidance: ["Explique o que mudou.", "Use -고 말다 ou -아/어 버리다.", "Diga como terminou."], checklist: ["Mudança clara.", "Reação ou consequência.", "Adaptação ou desfecho.", "Tempo verbal consistente."], minWords: 35 },
});
