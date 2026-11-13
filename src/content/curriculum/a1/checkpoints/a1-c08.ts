import type { A1CheckpointContent } from "../types";
import {
  choices,
  cloze,
  listen,
  mcq,
  reading,
  review,
  translate,
} from "../lessons/shared";

const ALL_LESSON_IDS = [
  "a1-l36",
  "a1-l37",
  "a1-l38",
  "a1-l39",
  "a1-l40",
];
const PREVIOUS_CHECKPOINTS = Array.from(
  { length: 7 },
  (_, index) => `a1-c${String(index + 1).padStart(2, "0")}`,
);

/**
 * Checkpoint final do A1. Avalia uma amostra cumulativa de escuta, leitura,
 * vocabulário/gramática e interação controlada. A conclusão do curso só é
 * exibida quando todas as 40 lições e os 8 checkpoints estão concluídos.
 */
export const A1_C08: A1CheckpointContent = {
  id: "a1-c08",
  number: 8,
  moduleId: "a1-m08",
  title: "Desempenho A1 interno",
  objective:
    "Avaliar uma amostra cumulativa do A1 em escuta, leitura, vocabulário/gramática e interação controlada.",
  instructions: [
    "São 40 itens: 10 de escuta, 10 de leitura, 10 de vocabulário/gramática e 10 de interação/escrita controlada.",
    "A aprovação exige pelo menos 32 acertos (80%).",
    "O checkpoint é cumulativo e não introduz conteúdo novo.",
    "A conclusão é interna do KBR; não há certificação CEFR/TOPIK nem avaliação automática de fala livre.",
  ],
  lessonIds: ALL_LESSON_IDS,
  prerequisites: [...ALL_LESSON_IDS, ...PREVIOUS_CHECKPOINTS],
  estimatedMinutes: 75,
  passingScore: 80,
  minCorrect: 32,
  review,
  exercises: [
    // Escuta — 10 itens
    listen("a1-c08-e01", "independent", "Ouça e escreva a frase completa que contém a apresentação.", "안녕하세요. 저는 아나예요.", "안녕하세요. 저는 아나예요.", "A fala cumprimenta e diz “eu sou Ana”.", ["안녕하세요. 저는 아나예요"]),
    listen("a1-c08-e02", "independent", "Ouça e escreva a frase completa que contém a nacionalidade.", "저는 브라질 사람이에요.", "저는 브라질 사람이에요.", "A pessoa é brasileira.", ["저는 브라질 사람이에요"]),
    listen("a1-c08-e03", "independent", "Ouça e escreva a frase completa que contém o dia da semana.", "오늘은 수요일이에요.", "오늘은 수요일이에요.", "Hoje é quarta-feira.", ["오늘은 수요일이에요"]),
    listen("a1-c08-e04", "independent", "Ouça e escreva a frase completa que contém a rotina.", "저는 아침에 공부해요.", "저는 아침에 공부해요.", "A pessoa estuda de manhã.", ["저는 아침에 공부해요"]),
    listen("a1-c08-e05", "independent", "Ouça e escreva a frase completa que contém a localização.", "가방이 책상 아래에 있어요.", "가방이 책상 아래에 있어요.", "A mochila está embaixo da escrivaninha.", ["가방이 책상 아래에 있어요"]),
    listen("a1-c08-e06", "independent", "Ouça e escreva a frase completa que contém o pedido.", "비빔밥 하나 주세요.", "비빔밥 하나 주세요.", "O pedido é um bibimbap.", ["비빔밥 하나 주세요"]),
    listen("a1-c08-e07", "independent", "Ouça e escreva a frase completa que contém o meio de transporte.", "저는 지하철로 학교에 가요.", "저는 지하철로 학교에 가요.", "A pessoa vai à escola de metrô.", ["저는 지하철로 학교에 가요"]),
    listen("a1-c08-e08", "independent", "Ouça e escreva a frase completa que contém o convite.", "우리 같이 영화관에 갈까요?", "우리 같이 영화관에 갈까요?", "O convite é para ir ao cinema juntos.", ["우리 같이 영화관에 갈까요"]),
    listen("a1-c08-e09", "independent", "Ouça e escreva a frase completa que contém os sintomas.", "목이 아파요. 그리고 열이 있어요.", "목이 아파요. 그리고 열이 있어요.", "A pessoa tem dor de garganta e febre.", ["목이 아파요. 그리고 열이 있어요", "목이 아파요 그리고 열이 있어요"]),
    listen("a1-c08-e10", "independent", "Ouça e escreva a frase completa que contém a avaliação da viagem.", "여행은 즐거웠어요.", "여행은 즐거웠어요.", "A viagem foi divertida.", ["여행은 즐거웠어요"]),

    // Leitura — 10 itens
    reading("a1-c08-e11", "independent", "저는 아나예요. 브라질 사람이에요. 저는 유학생이에요.", "Quem é Ana?", choices("Brasileira e estudante estrangeira.", "Coreana e professora.", "Mexicana e cozinheira."), "Brasileira e estudante estrangeira.", "브라질 사람이에요 e 유학생이에요 descrevem Ana."),
    reading("a1-c08-e12", "independent", "제 어머니는 요리사예요. 제 아버지는 의사예요.", "Qual é a profissão da mãe?", choices("Cozinheira.", "Médica.", "Professora."), "Cozinheira.", "어머니는 요리사예요."),
    reading("a1-c08-e13", "independent", "거실에 소파가 있어요. 화장실은 침실 옆에 있어요.", "Onde fica o banheiro?", choices("Ao lado do quarto.", "Na cozinha.", "Na sala."), "Ao lado do quarto.", "화장실은 침실 옆에 있어요."),
    reading("a1-c08-e14", "independent", "저는 아침에 공부해요. 오후에 회사에 가요.", "O que a pessoa faz de manhã?", choices("Estuda.", "Vai à empresa.", "Descansa."), "Estuda.", "아침에 공부해요."),
    reading("a1-c08-e15", "independent", "저는 과일을 좋아해요. 생선은 싫어해요.", "O que a pessoa gosta de comer?", choices("Frutas.", "Peixe.", "Carne."), "Frutas.", "과일을 좋아해요."),
    reading("a1-c08-e16", "independent", "사과는 천 원이에요. 물은 이천 원이에요.", "Quanto custam os dois juntos?", choices("Três mil won.", "Dois mil won.", "Mil won."), "Três mil won.", "Mil mais dois mil são três mil won."),
    reading("a1-c08-e17", "independent", "계단으로 가세요. 그리고 오른쪽으로 도세요. 출구가 거기 있어요.", "Qual é o caminho para a saída?", choices("Escadas e depois à direita.", "Elevador e depois à esquerda.", "Escadas e depois à esquerda."), "Escadas e depois à direita.", "계단으로 가세요 e 오른쪽으로 도세요."),
    reading("a1-c08-e18", "independent", "민수: 우리 같이 극장에 갈까요? 아나: 좋아요. 일곱 시에 만나요.", "O que eles combinam?", choices("Ir ao cinema às sete.", "Ir ao parque às oito.", "Estudar em casa."), "Ir ao cinema às sete.", "극장에 갈까요? e 일곱 시에 만나요."),
    reading("a1-c08-e19", "independent", "오늘은 비가 와요. 그리고 추워요. 그래서 집에 있어요.", "Por que a pessoa fica em casa?", choices("Por causa da chuva e do frio.", "Porque está quente.", "Porque vai viajar."), "Por causa da chuva e do frio.", "비가 와요 e 추워요."),
    reading("a1-c08-e20", "independent", "저는 기차로 바다에 갔어요. 사진을 찍었어요. 바다가 아름다웠어요.", "Como foi a visita?", choices("Foi de trem, tirou fotos e achou o mar bonito.", "Foi de avião e ficou no hotel.", "Ficou em casa e estudou."), "Foi de trem, tirou fotos e achou o mar bonito.", "기차로 갔어요, 사진을 찍었어요, 아름다웠어요."),

    // Vocabulário e gramática — 10 itens
    cloze("a1-c08-e21", "independent", "Complete a apresentação: 저는 학생___.", "이에요", "학생 termina em consoante e recebe 이에요."),
    cloze("a1-c08-e22", "independent", "Complete o tópico: ___ 브라질 사람이에요.", "저는", "저는 apresenta “eu” como tópico."),
    cloze("a1-c08-e23", "independent", "Complete o objeto: 저는 과일___ 좋아해요.", "을", "과일 termina em consoante e recebe 을."),
    cloze("a1-c08-e24", "independent", "Complete o lugar da ação: 저는 부엌___ 요리해요.", "에서", "에서 marca o lugar da ação."),
    cloze("a1-c08-e25", "independent", "Complete o desejo: 저는 커피를 마시고 ___.", "싶어요", "마시고 싶어요 significa “quero beber”."),
    cloze("a1-c08-e26", "independent", "Complete o passado: 어제 공부___.", "했어요", "공부하다 vira 공부했어요 no passado."),
    cloze("a1-c08-e27", "independent", "Complete o futuro: 다음 주에 여행___.", "할 거예요", "여행할 거예요 significa “vou viajar”."),
    cloze("a1-c08-e28", "independent", "Complete a proibição: 커피를 ___.", "마시지 마세요", "마시지 마세요 significa “não beba”."),
    mcq("a1-c08-e29", "independent", "Qual pergunta pede o preço?", ["얼마예요?", "몇 살이에요?", "몇 시예요?"], "얼마예요?", "얼마예요? pergunta o preço."),
    mcq("a1-c08-e30", "independent", "Qual tratamento é adequado em uma primeira visita?", ["성함이 뭐예요?", "이름이 뭐야?", "너는 누구야?"], "성함이 뭐예요?", "성함이 뭐예요? é a forma polida e honorífica."),

    // Interação e escrita controlada — 10 itens
    mcq("a1-c08-e31", "independent", "Você não entendeu. O que diz?", ["이해가 안 돼요. 다시 한번 말해 주세요.", "안녕하세요.", "얼마예요?"], "이해가 안 돼요. 다시 한번 말해 주세요.", "A frase pede reparo de forma clara."),
    mcq("a1-c08-e32", "independent", "Como pedir a conta em um restaurante?", ["계산서 주세요.", "메뉴 주세요.", "물 주세요."], "계산서 주세요.", "계산서 é a conta."),
    mcq("a1-c08-e33", "independent", "Como perguntar onde fica a estação?", ["역이 어디에 있어요?", "역이 뭐예요?", "역은 몇 시예요?"], "역이 어디에 있어요?", "어디에 있어요? pergunta a localização."),
    cloze("a1-c08-e34", "independent", "Complete o pedido de repetição: 다시 ___ 말해 주세요.", "한번", "다시 한번 significa “mais uma vez”."),
    translate("a1-c08-e35", "independent", "pt-ko", "Traduza para o coreano polido: “Eu sou brasileiro.”", "저는 브라질 사람이에요.", "브라질 사람 é “pessoa brasileira”; a forma é 사람이에요.", ["저는 브라질 사람이에요"]),
    translate("a1-c08-e36", "independent", "pt-ko", "Traduza para o coreano polido: “Um bibimbap, por favor.”", "비빔밥 하나 주세요.", "비빔밥 하나 주세요 é o pedido.", ["비빔밥 하나 주세요"]),
    translate("a1-c08-e37", "independent", "ko-pt", "Traduza para o português: 우리 같이 갈까요?", "Vamos juntos?", "갈까요? propõe uma ação conjunta.", ["Vamos juntos"]),
    translate("a1-c08-e38", "independent", "ko-pt", "Traduza para o português: 푹 쉬세요.", "Descanse bem.", "푹 쉬세요 é uma recomendação de descanso.", ["Descanse bem", "Descanse bastante."]),
    translate("a1-c08-e39", "independent", "pt-ko", "Traduza para o coreano polido: “Eu fui de trem.”", "저는 기차로 갔어요.", "기차로 é o meio; 갔어요 é “fui”.", ["저는 기차로 갔어요"]),
    translate("a1-c08-e40", "independent", "pt-ko", "Traduza para o coreano polido: “Eu vou viajar na próxima semana.”", "저는 다음 주에 여행할 거예요.", "다음 주에 é “na próxima semana”; 여행할 거예요 é “vou viajar”.", ["저는 다음 주에 여행할 거예요"]),
  ],
};
