import {
  cloze,
  defineA2Checkpoint,
  listen,
  mcq,
  reading,
  translate,
} from "../lessons/shared";

/**
 * Checkpoint final do A2. Amostra cumulativa de escuta, leitura, gramática e
 * produção controlada. A conclusão do curso só aparece com todos os 48 passos.
 */
export const A2_C08 = defineA2Checkpoint({
  id: "a2-c08",
  number: 8,
  moduleId: "a2-m08",
  title: "Desempenho A2 interno",
  objective:
    "Avaliar uma amostra cumulativa do A2 em escuta, leitura, gramática e produção controlada.",
  instructions: [
    "São 40 itens: 10 de escuta, 10 de leitura, 10 de gramática/vocabulário e 10 de produção controlada.",
    "A aprovação exige pelo menos 32 acertos (80%).",
    "O checkpoint é cumulativo e não introduz conteúdo novo.",
    "A conclusão é interna do KBR; não há certificação CEFR/TOPIK nem avaliação automática de fala livre.",
  ],
  lessonIds: ["a2-l36", "a2-l37", "a2-l38", "a2-l39", "a2-l40"],
  prerequisites: [
    "a2-l36",
    "a2-l37",
    "a2-l38",
    "a2-l39",
    "a2-l40",
    "a2-c01",
    "a2-c02",
    "a2-c03",
    "a2-c04",
    "a2-c05",
    "a2-c06",
    "a2-c07",
  ],
  estimatedMinutes: 75,
  minCorrect: 32,
  exercises: [
    // Escuta — 10
    listen("Ouça e escreva o relato do fim de semana.", "토요일에 친구와 전시를 봤어요.", "토요일에 친구와 전시를 봤어요.", "A pessoa viu uma exposição com uma amiga no sábado.", ["토요일에 친구와 전시를 봤어요"]),
    listen("Ouça e escreva a experiência de viagem.", "일본에 한번 가 봤어요.", "일본에 한번 가 봤어요.", "A pessoa já foi ao Japão uma vez.", ["일본에 한 번 가 봤어요", "일본에 한번 가 봤어요"]),
    listen("Ouça e escreva a intenção futura.", "한국으로 유학을 가려고 해요.", "한국으로 유학을 가려고 해요.", "A pessoa pretende estudar na Coreia.", ["한국으로 유학을 가려고 해요"]),
    listen("Ouça e escreva a sequência temporal.", "출근하기 전에 운동해요.", "출근하기 전에 운동해요.", "A pessoa se exercita antes de ir ao trabalho.", ["출근하기 전에 운동해요"]),
    listen("Ouça e escreva a obrigação doméstica.", "쓰레기는 매일 버려야 해요.", "쓰레기는 매일 버려야 해요.", "O lixo precisa ser jogado fora todos os dias.", ["쓰레기는 매일 버려야 해요"]),
    listen("Ouça e escreva o sintoma.", "어제부터 목이 아프고 열이 있어요.", "어제부터 목이 아프고 열이 있어요.", "Desde ontem a garganta dói e há febre.", ["어제부터 목이 아프고 열이 있어요"]),
    listen("Ouça e escreva a orientação de remédio.", "하루 세 번 식후에 복용하세요.", "하루 세 번 식후에 복용하세요.", "Tome três vezes ao dia, depois das refeições.", ["하루 세 번 식후에 복용하세요"]),
    listen("Ouça e escreva o requisito de emprego.", "한국어로 의사소통할 수 있어야 해요.", "한국어로 의사소통할 수 있어야 해요.", "É preciso conseguir se comunicar em coreano.", ["한국어로 의사소통할 수 있어야 해요"]),
    listen("Ouça e escreva o problema de viagem.", "짐을 찾지 못했어요.", "짐을 찾지 못했어요.", "A pessoa não conseguiu encontrar a bagagem.", ["짐을 찾지 못했어요"]),
    listen("Ouça e escreva a opinião final.", "조금 힘들었지만 정말 즐거웠어요.", "조금 힘들었지만 정말 즐거웠어요.", "Foi um pouco cansativo, mas realmente divertido.", ["조금 힘들었지만 정말 즐거웠어요"]),

    // Leitura — 10
    reading("지난주에 비가 와서 캠핑을 못 갔어요. 그래서 집에서 영화를 봤어요.", "O que a pessoa fez por causa da chuva?", ["Ficou em casa e viu um filme.", "Foi acampar mesmo assim.", "Foi ao museu."], "Ficou em casa e viu um filme.", "비가 와서 캠핑을 못 갔어요. 그래서 집에서 영화를 봤어요."),
    reading("아나는 일본에 두 번 갔어요. 온천에도 가 봤어요. 지우는 해외에서 산 적이 없어요.", "Quem já foi a uma fonte termal?", ["Ana.", "Jiwoo.", "As duas."], "Ana.", "아나는 온천에도 가 봤어요."),
    reading("지우의 동생은 지우보다 키가 커요. 얼굴은 비슷하지만 성격은 아주 달라요.", "O que é diferente entre os irmãos?", ["A personalidade.", "O rosto.", "A altura."], "A personalidade.", "성격은 아주 달라요."),
    reading("민수는 회사 일 때문에 약속에 가지 못했어요. 연락을 못 해서 미안해했어요.", "Por que Minsu se desculpou?", ["Por não ter avisado.", "Por não ter dinheiro.", "Por ter chegado cedo."], "Por não ter avisado.", "연락을 못 해서 미안해했어요."),
    reading("수진은 지난달에 서울로 이사했어요. 처음에는 낯설었지만 지금은 적응하고 있어요.", "Como Sujin está agora?", ["Está se adaptando.", "Quer voltar imediatamente.", "Ainda não chegou."], "Está se adaptando.", "지금은 적응하고 있어요."),
    reading("수진은 윗집 소음 때문에 잠을 못 자요. 이웃은 아이가 늦게까지 뛰어서 미안해해요.", "Qual é a causa do barulho?", ["O filho do vizinho corre até tarde.", "A televisão está alta.", "Há obras no prédio."], "O filho do vizinho corre até tarde.", "아이가 늦게까지 뛰어서요."),
    reading("환자는 일주일 전부터 허리가 아파요. 하루에 여덟 시간 앉아 있고 운동은 거의 안 해요.", "O que pode estar relacionado à dor?", ["Ficar muito tempo sentado.", "Dormir demais.", "Beber pouca água."], "Ficar muito tempo sentado.", "여덟 시간 앉아 있고 운동은 거의 안 해요."),
    reading("수진은 목요일 오후까지 자료를 정리해야 해요. 금요일 발표 전에 같이 확인해요.", "Quando os dados precisam estar prontos?", ["Até quinta à tarde.", "Até sexta de manhã.", "Até quarta à noite."], "Até quinta à tarde.", "목요일 오후까지 자료를 정리해야 해요."),
    reading("해운대는 무료이고 경치가 좋아요. 그런데 주말에는 사람이 아주 많아요. 아침 일찍 가는 게 좋아요.", "Qual é a desvantagem de Haeundae no fim de semana?", ["Muita gente.", "Entrada cara.", "Fechado."], "Muita gente.", "주말에는 사람이 아주 많아요."),
    reading("수진은 과거 이야기를 연습하면서 많이 익숙해졌어요. 간단한 문제를 설명하고 도움을 요청하는 것도 자신 있어요. 하지만 뉴스는 아직 어려워요.", "O que Sujin ainda acha difícil?", ["Notícias.", "Pedir ajuda.", "Falar do passado."], "Notícias.", "아직 뉴스는 어려워요."),

    // Gramática e vocabulário — 10
    cloze("Complete o passado: 토요일에 전시를 ___.", "봤어요", "봤어요 é o passado de 보다.", ["봤어요."]),
    cloze("Complete a experiência: 한국에 간 ___ 있어요.", "적이", "간 적이 있어요 significa “já estive”."),
    cloze("Complete a comparação: 오늘이 어제___ 더 따뜻해요.", "보다", "보다 marca o ponto de comparação."),
    cloze("Complete a intenção: 내년에 유학을 가___ 해요.", "려고", "가려고 해요 expressa intenção."),
    cloze("Complete a obrigação: 쓰레기는 매일 버려___ 해요.", "야", "버려야 해요 significa “precisa jogar fora”."),
    cloze("Complete a condição: 비가 오___ 집에 있을 거예요.", "면", "오면 significa “se chover”."),
    cloze("Complete o pedido cortês: 문을 열어 ___?", "주시겠어요", "열어 주시겠어요? é “poderia abrir?”."),
    cloze("Complete a mudança: 서울에서 살___ 되었어요.", "게", "살게 되었어요 significa “passei a morar”."),
    cloze("Complete a causa: 지하철이 멈췄___ 때문에 늦었어요.", "기", "멈췄기 때문에 significa “porque parou”."),
    cloze("Complete a recomendação: 일찍 가___ 게 좋겠어요.", "는", "가는 게 좋겠어요 significa “seria bom ir”."),

    // Produção controlada — 10
    translate("pt-ko", "Traduza para o coreano: “No sábado, vi uma exposição com uma amiga.”", "토요일에 친구와 전시를 봤어요.", "전시를 봤어요 é “vi uma exposição”.", ["토요일에 친구하고 전시를 봤어요."]),
    translate("ko-pt", "Traduza para o português: 저는 아직 온천에 가 본 적이 없어요.", "Eu ainda nunca fui a uma fonte termal.", "아직 reforça “ainda”; 가 본 적이 없어요 é “nunca fui”.", ["Ainda não fui a uma fonte termal."]),
    translate("pt-ko", "Traduza para o coreano: “Pretendo estudar na Coreia.”", "한국으로 유학을 가려고 해요.", "가려고 해요 marca intenção.", ["한국에 유학을 가려고 해요."]),
    translate("ko-pt", "Traduza para o português: 세 시에 만나는 게 어때요?", "Que tal nos encontrarmos às três?", "-는 게 어때요? é uma sugestão.", ["Que tal se encontrarmos às três?"]),
    translate("ko-pt", "Traduza para o português: 저녁을 먹고 나서 샤워해요.", "Tomo banho depois de jantar.", "먹고 나서 indica posterioridade.", ["Depois do jantar, tomo banho."]),
    translate("pt-ko", "Traduza para o coreano: “Não pode comer aqui.”", "여기에서 음식을 먹으면 안 돼요.", "먹으면 안 돼요 expressa proibição.", ["여기서 음식을 먹으면 안 돼요."]),
    translate("pt-ko", "Traduza para o coreano: “Viver sozinho é confortável.”", "혼자 사는 게 편해요.", "사는 게 nominaliza a ação.", ["혼자 사는 것이 편해요."]),
    translate("ko-pt", "Traduza para o português: 무거운 것은 들지 마세요.", "Não levante coisas pesadas.", "들지 마세요 é uma ordem negativa.", ["Não carregue objetos pesados."]),
    translate("pt-ko", "Traduza para o coreano: “Tenho caminhado todos os dias.”", "매일 걷고 있어요.", "걷고 있어요 descreve processo atual.", ["요즘 매일 걷고 있어요."]),
    translate("ko-pt", "Traduza para o português: 지금 정하지 않아도 괜찮아요.", "Não precisa decidir agora.", "정하지 않아도 괜찮아요 significa “não precisa decidir”.", ["Está tudo bem não decidir agora."]),
  ],
});
