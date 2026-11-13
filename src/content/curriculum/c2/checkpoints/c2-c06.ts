import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto analisa a obra escolhida, integra focalização, símbolo ou contexto e responde ao que o enunciado pede, sem se limitar a resumir o enredo." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança da pista textual para a interpretação, da interpretação para o contexto e daí para a recepção, com função clara em cada parte." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico da leitura literária e da crítica cultural do módulo com colocações naturais e precisão de sentido." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro crítico se mantém consistente, sem coloquialidade fora de propósito." },
  { criterion: "argument" as const, labelPt: "Qualidade da interpretação", descriptorPt: "A leitura é sustentada por evidências textuais, distingue o que a obra mostra do que o leitor conclui e reconhece uma leitura alternativa." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a análise para outro leitor sem fechar o sentido, sem converter contexto em alegoria fixa e sem tratar a recepção como prova de valor." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · leitura literária e recepção",
  promptPt: "Escolha um conto, filme, peça ou série que você conheça. Em um texto único, apresente uma cena ou objeto central, analise a focalização ou o símbolo com duas pistas textuais, relacione a obra a um contexto ou a outro texto e comente uma reação pública à obra. Feche declarando o critério com que você avalia e um risco da sua própria leitura.",
  promptKo: "작품을 하나 골라 중심 장면이나 사물을 분석하고, 초점화나 상징을 두 가지 단서로 뒷받침한 뒤, 맥락과 대중의 반응을 연결해 평가해 보세요.",
  guidance: [
    "Comece pela cena ou objeto que organiza a sua análise, sem resumir a obra inteira.",
    "Nomeie duas pistas concretas: uma escolha de focalização, um detalhe material ou uma repetição.",
    "Relacione a obra a um contexto histórico ou a outro texto, delimitando o que essa relação explica.",
    "Distinga a obra da recepção pública e diga com que critério você a avalia.",
    "Termine reconhecendo um risco da sua leitura ou uma leitura alternativa.",
  ],
  checklist: [
    "Cena ou objeto central apresentado.",
    "Duas pistas textuais nomeadas.",
    "Focalização, símbolo ou contexto analisado com precisão.",
    "Obra e recepção distinguidas.",
    "Critério de avaliação declarado.",
    "Risco da própria leitura reconhecido.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "연극 「새벽호는 떠나지 않는다」를 나는 '원작의 여백을 얼마나 살렸는가'라는 기준으로 평가한다. 무대에는 배가 없고 매표소와 계단만 놓인다. 첫 번째 단서는 주인공이 표를 주머니에 넣는 동작이다. 이 동작은 원작에서 결말을 열어 두던 접힌 표를 확정된 증거로 바꾼다. 두 번째 단서는 마지막에 울리는 배의 경적이다. 소리는 떠남을 분명히 하지만, 인물의 표정은 여전히 설명되지 않는다. 이 연출은 1990년대 폐항의 맥락에서 읽힐 수 있다. 그러나 폐항을 국가의 몰락으로 등치하면 개인의 선택이 사라진다. 공연 뒤 관객의 호평과 혹평이 갈렸고, 나는 그 반응을 작품의 가치로 바로 환산하지 않으려 한다. 다만 접근성을 높였다는 점은 인정한다. 나의 기준도 원작 중심이라는 한계가 있다. 각색의 독자성을 과소평가할 위험이 있기 때문이다. 작품과 수용을 함께 읽는 일은 작품을 변호하거나 고발하는 것이 아니라, 해석이 가능해지는 조건을 밝히는 일이어야 한다.",
    pt: "Avalio a peça 'O navio da madrugada não parte' pelo critério de 'quanto preservou o espaço em branco do original'. No palco não há navio, apenas a bilheteria e a escada. A primeira pista é o gesto da protagonista de guardar o bilhete no bolso. Esse gesto transforma o bilhete dobrado, que no original mantinha o desfecho aberto, em prova definitiva. A segunda pista é a buzina do navio que soa no final. O som torna a partida evidente, mas a expressão da personagem continua sem explicação. Esta montagem pode ser lida no contexto do fechamento dos portos nos anos 1990. No entanto, equiparar o fechamento do porto à decadência do Estado apaga a escolha individual. Depois do espetáculo, os elogios e as críticas do público se dividiram, e não quero converter essa reação imediatamente no valor da obra. Reconheço, porém, que ela ampliou o acesso. Meu critério também tem um limite: é centrado no original. Há o risco de subestimar a autonomia da adaptação. Ler a obra e a recepção em conjunto não significa defendê-la nem acusá-la, mas explicitar as condições em que uma interpretação se torna possível.",
    notePt: "Exemplo original. Observe que o texto integra pista, focalização, contexto e recepção, declara o critério e reconhece o limite da própria leitura. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c06 — avaliação do Módulo 6: conto, focalização, símbolo, contexto e crítica cultural. */
export const C2_C06 = defineC2Checkpoint({
  id: "c2-c06", number: 6, moduleId: "c2-m06",
  title: "Checkpoint · Discurso literário e cultural",
  objective: "Avaliar conto, focalização, símbolo, contexto e crítica cultural do Módulo 6.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "Nas questões de leitura, escolha a interpretação que o trecho sustenta.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l26", "c2-l27", "c2-l28", "c2-l29", "c2-l30"],
  prerequisites: ["c2-l26", "c2-l27", "c2-l28", "c2-l29", "c2-l30", "c2-c01", "c2-c02", "c2-c03", "c2-c04", "c2-c05"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual leitura do final de 'O bilhete dobrado' é mais defensável?", ["O narrador não vê a escolha de Myeongju e o segundo bilhete impede uma conclusão única.", "Myeongju diz explicitamente que não vai partir.", "O conto resolve a dúvida no último parágrafo."], "O narrador não vê a escolha de Myeongju e o segundo bilhete impede uma conclusão única.", "A limitação do olhar do narrador e o bilhete restante sustentam duas leituras."),
    mcq("Qual é o efeito de narrar a cena a partir da percepção de Jeongho?", ["O leitor conhece o medo dele sem saber o que Myeongju sente.", "O leitor passa a saber todos os pensamentos de Myeongju.", "O narrador desaparece e a cena perde perspectiva."], "O leitor conhece o medo dele sem saber o que Myeongju sente.", "A focalização dá acesso a um interior e mantém o outro opaco."),
    mcq("Por que a autora da crítica separa obra, recepção e crítica da recepção?", ["Para avaliar a montagem sem tratar o público como massa passiva nem o sucesso como prova de valor.", "Para afirmar que o público sempre interpreta corretamente.", "Para provar que o texto original é superior a qualquer adaptação."], "Para avaliar a montagem sem tratar o público como massa passiva nem o sucesso como prova de valor.", "A distinção permite criticar escolhas específicas sem reduzir a recepção a erro."),

    cloze("Complete a retomada narrativa: 명주가 들어왔___.", "더라", "-더라 retoma uma cena observada pelo narrador."),
    cloze("Complete a análise da perspectiva: 이 장면은 정호의 ___에서 서술된다.", "시점", "-의 시점에서 indica de onde a cena é percebida."),
    cloze("Complete a formulação do símbolo: 접힌 승선권은 떠남의 ___이다.", "상징", "-의 상징이다 apresenta o objeto como portador de um sentido mais amplo."),
    cloze("Complete o contexto histórico: 폐항은 이 소설의 역사적 ___이다.", "배경", "-ㄴ/는 배경이다 situa a obra em condições históricas amplas."),
    cloze("Complete a leitura da montagem: 이 연출은 새로운 수용자를 위한 각색으로 ___.", "읽힌다", "-으로 읽힌다 atribui uma interpretação situada, não um fato objetivo."),

    listen("Ouça e escreva a fala sobre a data do bilhete. Escreva a frase completa que ouvir.", "표에 날짜가 없더라. 그건 오래된 표라는 뜻이고, 그래서 더 애매해.", "표에 날짜가 없더라. 그건 오래된 표라는 뜻이고, 그래서 더 애매해.", "Não havia data no bilhete. Isso significa que era um bilhete antigo e, por isso, tudo fica ainda mais ambíguo."),
    listen("Ouça e escreva o motivo do silêncio de Jeongho. Escreva a frase completa que ouvir.", "그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "O motivo de ele não explicar era simples: tinha medo de que, se explicasse, ela não partisse."),
    listen("Ouça e escreva a leitura sobre a dobra do bilhete. Escreva a frase completa que ouvir.", "접힌 자국은 되돌릴 수 없다는 뜻일 수도 있어.", "접힌 자국은 되돌릴 수 없다는 뜻일 수도 있어.", "A marca da dobra também pode significar que não há como voltar atrás."),
    listen("Ouça e escreva o dado histórico sobre a rota. Escreva a frase completa que ouvir.", "폐항 이후 여객선은 다시 다니지 않는다.", "폐항 이후 여객선은 다시 다니지 않는다.", "Depois do fechamento do porto, nenhuma balsa voltou a circular."),
    listen("Ouça e escreva a objeção sobre o desfecho da peça. Escreva a frase completa que ouvir.", "결말을 설명해 버리면 원작의 긴장이 사라져.", "결말을 설명해 버리면 원작의 긴장이 사라져.", "Se o desfecho é explicado, a tensão do original desaparece."),
    listen("Ouça e escreva a frase que resume o limite do narrador. Escreva a frase completa que ouvir.", "어느 쪽이 진짜였는지는 지금도 알 수 없다.", "어느 쪽이 진짜였는지는 지금도 알 수 없다.", "Até hoje não sei qual dos dois era o verdadeiro."),

    translate("pt-ko", "Traduza: “Parecia que o vento batia na janela.”", "바람이 유리창을 두드리는 듯했다.", "-는 듯했다 apresenta uma impressão perceptiva sem afirmá-la como fato."),
    translate("ko-pt", "Traduza: 표를 버리는 일은 떠나지 않겠다는 뜻처럼 보였지만, 동시에 미련을 버리는 일처럼도 보였다.", "Jogar o bilhete fora parecia significar que ela não partiria, mas ao mesmo tempo parecia um gesto de abandonar o que restava de apego.", "미련을 버리다 = abandonar o apego que ainda prende ao passado.", ["Jogar fora o bilhete parecia querer dizer que ela não partiria; ao mesmo tempo, porém, parecia um modo de deixar para trás o apego."]),
    translate("pt-ko", "Traduza: “Do ponto de vista de Jeongho, Myeongju não sabe de nada.”", "정호의 시점에서 보면, 명주는 아무것도 모르는 사람이다.", "-의 시점에서 보면 introduz o recorte de informação de um personagem.", ["정호의 시점에서 보면 명주는 아무것도 모르는 사람이다."]),
    translate("ko-pt", "Traduza: 상업적이라고 해서 자동으로 나쁜 것은 아니다.", "Ser comercial não faz algo automaticamente ruim.", "자동으로 = automaticamente; 상업적 = comercial.", ["O fato de ser comercial não o torna automaticamente ruim."]),
    translate("ko-pt", "Traduza: 이 모티프의 다의성은 우의나 환유로 축소되지 않는다.", "A polissemia deste motivo não se reduz a alegoria nem a metonímia.", "축소되다 = ser reduzido; 우의 = alegoria; 환유 = metonímia.", ["A multiplicidade de sentidos desse motivo não se deixa reduzir a alegoria ou metonímia."]),

    reading("배가 출항을 알리는 소리를 냈을 때, 명주는 출구 쪽으로 걸어갔다. 나는 그녀가 계단을 오르는지 내리는지 보지 못했다. 유리문이 닫히고, 빗물에 번진 불빛만 남았다. 배가 부두를 떠난 뒤에도 매표소 앞에는 접힌 승선권 한 장이 남아 있었다. 쓰레기통에 넣은 줄 알았던 표였다.", "O que impede o narrador de concluir que Myeongju partiu?", ["Ele não vê o movimento dela na escada, e o bilhete que ele achava descartado reaparece.", "Myeongju avisa que vai ficar no terminal.", "O navio não chega a partir naquela noite."], "Ele não vê o movimento dela na escada, e o bilhete que ele achava descartado reaparece.", "Dois limites concretos do relato mantêm a partida em aberto."),
    reading("그가 서랍에서 꺼낸 것은 오래된 승선권 한 장이었다. 날짜는 지워져 있었고, 모서리는 손때에 닳아 있었다. 정호는 그 표를 새 표와 함께 밀어냈다. 명주는 두 장을 받아 들고 잠시 멈췄다. 그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "O que a cena revela sobre a distribuição de conhecimento entre os personagens?", ["Jeongho conhece a história do bilhete antigo; Myeongju recebe os dois sem saber o que ele significa.", "Os dois compartilham a mesma lembrança do passado.", "Myeongju entende imediatamente por que há dois bilhetes."], "Jeongho conhece a história do bilhete antigo; Myeongju recebe os dois sem saber o que ele significa.", "A focalização em Jeongho expõe o saber dele e mantém a ignorância dela."),
    reading("한 해석에서는 접힌 자국이 미련의 흔적이다. 명주가 표를 완전히 버리지 못했다는 뜻이므로, 마지막에 남은 표는 귀환의 가능성을 가리킨다. 다른 해석에서는 같은 자국이 결심의 흔적이다. 여러 번 접었다 편 끝에 그녀는 표를 버렸고, 남은 표는 그녀가 이미 떠났다는 증거가 된다. 두 해석 모두 텍스트의 세부와 충돌하지 않는다.", "Por que as duas leituras do bilhete podem coexistir?", ["Porque a mesma dobra pode indicar apego ou decisão, e ambas se apoiam em detalhes do texto.", "Porque o conto tem dois finais escritos por autores diferentes.", "Porque o bilhete não aparece no final da história."], "Porque a mesma dobra pode indicar apego ou decisão, e ambas se apoiam em detalhes do texto.", "O mesmo traço material sustenta direções opostas sem contradizer o texto."),
    reading("북포항은 1970년대 이후 산업화와 이촌향도를 겪었다. 젊은 사람들이 일자리를 찾아 도시로 떠나면서 항구의 인구는 꾸준히 줄었고, 1990년대 후반에는 여객선 노선이 하나씩 줄었다. 1998년 겨울, 마지막 정기 노선이 폐항되었다. 폐항 이후 여객선은 다시 다니지 않는다.", "Como esse contexto ajuda a ler a cena do terminal?", ["A perda da linha marítima explica o peso do navio para quem parte e para quem fica.", "O texto passa a afirmar que o navio representa o Estado.", "O contexto resolve a dúvida sobre a partida de Myeongju."], "A perda da linha marítima explica o peso do navio para quem parte e para quem fica.", "O dado histórico ilumina a espera sem funcionar como chave única do desfecho."),
    reading("한 평론가는 이 연출을 새로운 수용자를 위한 각색으로 읽었다. 무대의 단순한 구조와 명확한 대사가 처음 연극을 보는 관객에게 작품을 가까이 가져왔다는 것이다. 다른 평론가는 같은 선택을 원작의 긴장을 훼손한 해석으로 보았다. 관객의 반응도 갈렸다.", "O que explica as avaliações opostas da mesma montagem?", ["Critérios diferentes: acesso do novo público em uma; preservação da ambiguidade do original na outra.", "O fato de os críticos terem visto peças diferentes.", "A ausência de público nas apresentações."], "Critérios diferentes: acesso do novo público em uma; preservação da ambiguidade do original na outra.", "O mesmo gesto é avaliado por critérios distintos, e não por erro de informação."),
    reading("대중의 호평을 곧 작품의 가치로 등치하면 비판의 몫이 사라지고, 반대로 흥행을 상업성의 증거로만 읽으면 관객의 경험을 무시하게 된다. 두 위험은 대칭적이다. 나는 이 연출을 '원작의 여지를 줄인 각색'으로 평가하되, 그 선택이 새로운 관객에게 문을 열었다는 점도 함께 기록해야 한다고 본다.", "Por que a autora considera os dois riscos simétricos?", ["Porque um elimina a crítica e o outro elimina a experiência do público.", "Porque ambos foram cometidos pelo mesmo crítico.", "Porque os dois tratam apenas do preço dos ingressos."], "Porque um elimina a crítica e o outro elimina a experiência do público.", "Os riscos são opostos, mas ambos reduzem a análise a um único fator."),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
