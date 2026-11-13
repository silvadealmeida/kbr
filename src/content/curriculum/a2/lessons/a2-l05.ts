import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l05 — narrativa curta com começo, complicação e desfecho. */
export const A2_L05 = defineA2Lesson({
  id: "a2-l05",
  number: 5,
  moduleId: "a2-m01",
  title: "Uma história curta",
  objective:
    "Contar uma história curta com começo, complicação e desfecho usando conectores simples.",
  prerequisites: ["a2-l04"],
  estimatedMinutes: 60,
  dialogueTitle: "O livro que Jiwoo leu",
  intro: [
    {
      title: "Sequência com -고",
      body:
        "-고 liga ações em sequência ou acrescenta informação. Na narrativa, ele ajuda a avançar sem dizer “depois” em todas as frases. A ordem dos fatos continua sendo a ordem das orações.",
      ko: "주인공이 집을 나가고 기차를 탔어요.",
    },
    {
      title: "Cenário com -는데",
      body:
        "-는데 apresenta o cenário antes da complicação. Pode equivaler a “e”, “mas” ou “enquanto”. Na narrativa, ele prepara o ouvinte para o que vem depois.",
      ko: "기차가 늦었는데 친구가 기다리고 있었어요.",
    },
    {
      title: "Marcar as etapas",
      body:
        "옛날에 abre a história; 중간에 introduz a complicação; 결말 mostra o desfecho. Use poucos conectores e mantenha a clareza; não é preciso imitar um estilo literário.",
      ko: "옛날에 작은 마을이 있었어요.",
    },
  ],
  dialogue: [
    ["지우", "그 책 재미있었어요?", "Aquele livro era interessante?"],
    ["아나", "네, 아주 재미있었어요. 옛날에 작은 마을이 있었어요.", "Sim, era muito interessante. Antigamente havia uma pequena vila."],
    ["지우", "어떤 이야기예요?", "Que história é?"],
    ["아나", "주인공이 마을을 떠나고 서울로 갔어요. 그런데 서울에서 길을 잃었어요.", "O protagonista saiu da vila e foi para Seul. Mas se perdeu em Seul."],
    ["지우", "그래서 어떻게 됐어요?", "E então o que aconteceu?"],
    ["아나", "중간에 도움을 주는 사람이 나타났어요. 결국 주인공은 집으로 돌아왔어요.", "No meio, apareceu uma pessoa que o ajudou. No fim, o protagonista voltou para casa."],
  ],
  reusedIds: ["ko:이야기하다", "ko:책", "ko:재미있다", "ko:처음", "ko:그다음"],
  grammar: [
    [
      "-고 — sequência e acréscimo",
      "radical + -고",
      "-고 liga duas orações sem marcar causa ou contraste. Pode indicar sequência de ações ou simples adição. Para uma sequência com ênfase em “depois de fazer”, o A2 também usa -고 나서.",
      [
        ["마을을 떠나고 서울로 갔어요.", "Saiu da vila e foi para Seul."],
        ["책을 읽고 친구에게 이야기했어요.", "Leu o livro e contou ao amigo."],
      ],
    ],
    [
      "-는데 — cenário e contraste suave",
      "radical + -는데",
      "-는데 prepara uma informação de fundo e pode introduzir contraste suave. Não é uma tradução única de “mas”: o contexto decide. Na narrativa, ele desacelera para explicar a situação.",
      [
        ["기차가 늦었는데 친구가 기다리고 있었어요.", "O trem atrasou, mas o amigo estava esperando."],
        ["저는 학생인데 이 책은 어려워요.", "Sou estudante, mas este livro é difícil."],
      ],
    ],
    [
      "Conectores de narrativa",
      "옛날에 / 중간에 / 결국",
      "옛날에 abre histórias de forma convencional. 중간에 marca a complicação, e 결국 mostra o resultado final. Use esses marcadores como apoio, não como substitutos da clareza dos fatos.",
      [
        ["옛날에 작은 마을이 있었어요.", "Antigamente havia uma pequena vila."],
        ["결국 주인공이 이겼어요.", "No fim, o protagonista venceu."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Onde o protagonista se perdeu?",
      ["Em Seul.", "Na vila.", "Na estação."],
      "Em Seul.",
      "서울에서 길을 잃었어요: ele se perdeu em Seul.",
    ),
    cloze(
      "Complete a sequência: 마을을 떠나___ 서울로 갔어요.",
      "고",
      "떠나고 서울로 갔어요 encadeia as duas ações na ordem.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o desfecho da história.",
      "결국 주인공은 집으로 돌아왔어요.",
      "결국 주인공은 집으로 돌아왔어요.",
      "No fim, o protagonista voltou para casa.",
      ["결국 주인공은 집으로 돌아왔어요"],
    ),
    reading(
      "주인공은 서울에서 길을 잃었어요. 그런데 한 사람이 도와줬어요. 결국 그는 집으로 돌아갔어요.",
      "Quem ajudou o protagonista?",
      ["Uma pessoa que apareceu na história.", "A família dele, que o esperava em casa.", "O autor do livro, que narra a história."],
      "Uma pessoa que apareceu na história.",
      "한 사람이 도와줬어요: uma pessoa o ajudou.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “O protagonista saiu da vila e foi para Seul.”",
      "주인공이 마을을 떠나고 서울로 갔어요.",
      "떠나고 liga a saída à ida; 서울로 indica direção.",
      ["주인공은 마을을 떠나고 서울로 갔어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual conector prepara o cenário antes da complicação?",
      ["-는데", "-고", "-지만"],
      "-는데",
      "-는데 introduz informação de fundo ou contraste suave antes do fato principal.",
    ),
    cloze(
      "Complete com “no fim”: ___ 주인공이 이겼어요.",
      "결국",
      "결국 marca o resultado final da história.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a complicação.",
      "그런데 서울에서 길을 잃었어요.",
      "그런데 서울에서 길을 잃었어요.",
      "A complicação é que ele se perdeu em Seul.",
      ["그런데 서울에서 길을 잃었어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 중간에 도움을 주는 사람이 나타났어요.",
      "No meio da história, apareceu uma pessoa que ajudou.",
      "중간에 marca a etapa; 도움을 주는 사람 é “uma pessoa que ajuda”.",
      ["No meio, apareceu uma pessoa que ajudou.", "No meio da história apareceu uma pessoa que ajudou."],
    ),
    reading(
      "옛날에 한 소녀가 숲에서 살았어요. 어느 날 길을 잃었지만 결국 집을 찾았어요.",
      "Como a história termina?",
      ["A menina encontra o caminho de casa.", "A menina se muda para a cidade.", "A menina perde a casa para sempre."],
      "A menina encontra o caminho de casa.",
      "결국 집을 찾았어요: no fim, ela encontrou a casa.",
    ),
  ],
  summary: [
    "-고 encadeia ações e informações sem marcar causa.",
    "-는데 prepara o cenário ou introduz contraste suave.",
    "옛날에, 중간에 e 결국 organizam começo, complicação e desfecho.",
    "Narrativas curtas priorizam clareza, não estilo literário.",
  ],
});
