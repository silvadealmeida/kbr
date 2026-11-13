import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l01 — relato com avaliação e -더라고요. */
export const B1_L01 = defineB1Lesson({
  id: "b1-l01", number: 1, moduleId: "b1-m01", title: "A história que ficou",
  objective: "Narrar uma lembrança com fato, impressão e avaliação, usando conectores de discurso.",
  prerequisites: [], estimatedMinutes: 65, dialogueTitle: "A primeira viagem sozinha",
  intro: [
    { title: "Relembrar com -더라고요", body: "O falante usa -더라고요 para relatar algo que descobriu ou vivenciou e agora traz à conversa. A forma combina com verbos e adjetivos e fica no passado quando o fato já ocorreu.", ko: "바다가 정말 넓더라고요." },
    { title: "Avaliar a lembrança", body: "Uma narrativa B1 não é só uma lista de fatos. Depois do acontecimento, o falante avalia o que sentiu e o que aprendeu. Conectores como 그런데, 그래서 e 결국 organizam essa avaliação.", ko: "그때는 무서웠지만 지금은 좋은 기억이에요." },
  ],
  dialogue: [
    ["지민", "수진 씨, 첫 해외여행이 언제였어요?", "Sujin, quando foi sua primeira viagem ao exterior?"],
    ["수진", "대학생 때였어요. 혼자 갔는데 생각보다 외롭더라고요.", "Foi na época da faculdade. Fui sozinha e, para minha surpresa, foi mais solitário do que eu pensava."],
    ["지민", "그래도 좋은 기억이 남았어요?", "Mesmo assim ficou uma boa lembrança?"],
    ["수진", "네. 길을 잃었지만 현지 사람이 도와줬어요. 그때 친절이 정말 고맙더라고요.", "Sim. Me perdi, mas uma pessoa local ajudou. Naquele momento, a gentileza foi realmente comovente."],
    ["지민", "그래서 여행을 계속 좋아하게 됐어요?", "Então você passou a gostar ainda mais de viajar?"],
    ["수진", "맞아요. 결국 그 여행이 제가 세상을 보는 방식을 바꿨어요.", "Exato. No fim, aquela viagem mudou minha forma de ver o mundo."],
  ],
  reusedIds: ["ko:여행", "ko:사진", "ko:사람", "ko:좋다"],
  grammar: [
    ["-더라고요 — descoberta no relato", "동사/형용사 + -더라고요", "Use -더라고요 para algo que o falante presenciou ou descobriu e agora compartilha. Não é uma afirmação neutra de fato; há uma perspectiva de experiência pessoal.", [["바다가 정말 넓더라고요.", "O mar era realmente imenso."], ["생각보다 외롭더라고요.", "Era mais solitário do que eu pensava."]]],
    ["Conectores de narrativa", "그런데 / 그래서 / 결국", "그런데 introduz um contraste ou novo ângulo; 그래서 liga causa e consequência; 결국 marca o desfecho. Use-os para dar direção ao relato, sem repetir todos na mesma frase.", [["길을 잃었어요. 그런데 누군가 도와줬어요.", "Eu me perdi. Mas alguém ajudou."], ["결국 좋은 기억으로 남았어요.", "No fim, ficou como uma boa lembrança."]]],
  ],
  guided: [
    mcq("Como foi a primeira viagem de Sujin?", ["Foi mais solitária do que ela esperava.", "Foi perfeita desde o início.", "Ela viajou com a família."], "Foi mais solitária do que ela esperava.", "생각보다 외롭더라고요."),
    cloze("Complete a descoberta: 바다가 정말 넓___.", "더라고요", "넓더라고요 relata a impressão vivida."),
    listen("Ouça e escreva o que surpreendeu Sujin.", "생각보다 외롭더라고요.", "생각보다 외롭더라고요.", "Ela descobriu que era mais solitário do que esperava.", ["생각보다 외롭더라고요"]),
    reading("수진은 혼자 해외여행을 갔어요. 길을 잃었지만 현지 사람이 도와줬어요. 그 친절이 오래 기억에 남았어요.", "O que ficou na memória?", ["A gentileza de uma pessoa local.", "O hotel caro que ela escolheu.", "A comida ruim do restaurante."], "A gentileza de uma pessoa local.", "그 친절이 오래 기억에 남았어요."),
    translate("pt-ko", "Traduza: “A viagem mudou minha forma de ver o mundo.”", "그 여행이 제가 세상을 보는 방식을 바꿨어요.", "세상을 보는 방식 é “forma de ver o mundo”.", ["그 여행은 제가 세상을 보는 방식을 바꿨어요."]),
  ],
  independent: [
    mcq("Qual frase relata uma descoberta pessoal?", ["바다가 넓더라고요.", "바다가 넓어요.", "바다가 넓을 거예요."], "바다가 넓더라고요.", "-더라고요 marca a experiência pessoal."),
    cloze("Complete o contraste: 길을 잃었어요. ___ 누군가 도와줬어요.", "그런데", "그런데 introduz o novo ângulo."),
    listen("Ouça e escreva a avaliação final.", "결국 좋은 기억으로 남았어요.", "결국 좋은 기억으로 남았어요.", "No fim, ficou como uma boa lembrança.", ["결국 좋은 기억으로 남았어요"]),
    translate("ko-pt", "Traduza: 그때는 무서웠지만 지금은 좋은 기억이에요.", "Naquele momento foi assustador, mas hoje é uma boa lembrança.", "무서웠지만 contrasta com a avaliação presente.", ["Na época foi assustador, mas agora é uma boa lembrança."]),
    reading("여행에서 길을 잃는 것은 무섭지만, 낯선 사람의 도움을 경험하면 세상을 보는 시선이 달라지기도 해요.", "Qual é a ideia principal?", ["Dificuldades podem mudar nossa perspectiva.", "Viajar sozinho é sempre ruim.", "Nunca se deve pedir ajuda."], "Dificuldades podem mudar nossa perspectiva.", "세상을 보는 시선이 달라지기도 해요."),
  ],
  summary: ["-더라고요 traz uma descoberta vivida para o relato.", "Conectores organizam contraste, causa e desfecho.", "Uma boa narrativa inclui avaliação, não só fatos.", "Todo o coreano novo continua em revisão."],
  production: {
    titlePt: "Produção independente · uma lembrança", promptPt: "Conte uma lembrança de uma viagem ou de um momento que mudou sua forma de ver algo. Escreva de cinco a sete frases.", promptKo: "기억에 남는 여행이나 경험을 이야기해 보세요.",
    guidance: ["Situe quando e com quem aconteceu.", "Use pelo menos um fato e uma impressão.", "Inclua um contraste ou consequência."],
    checklist: ["Usei passado para os fatos.", "Incluí uma impressão pessoal.", "Organizei começo, complicação e desfecho.", "A frase final avalia a experiência."], minWords: 35,
  },
});
