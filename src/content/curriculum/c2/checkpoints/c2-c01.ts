import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume a tarefa de interpretar e reformular, não apenas de opinar." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança da pista para a interpretação e da interpretação para a reformulação, sem repetir etapas." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se ajusta à relação entre os falantes." },
  { criterion: "argument" as const, labelPt: "Qualidade da interpretação", descriptorPt: "A leitura é sustentada por evidências do texto e reconhece uma leitura alternativa." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a fala ambígua para um terceiro sem apagar a incerteza nem transferir responsabilidade." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · interpretar e reformular",
  promptPt: "Escolha uma fala, nota ou comunicado ambíguo do seu entorno. Em um texto único, identifique a pista que permite mais de uma leitura, explique o que o texto pressupõe, diga o que ele evita afirmar e reescreva-o em uma versão responsável. Feche explicando o risco que a sua interpretação ainda corre.",
  promptKo: "모호한 말이나 공지문을 골라, 해석의 단서와 전제, 빠진 정보를 분석하고 책임 있는 버전으로 다시 써 보세요.",
  guidance: [
    "Comece citando ou parafraseando a fala ambígua, sem já interpretá-la.",
    "Nomeie uma pista linguística concreta: uma palavra, uma pressuposição, um honorífico ou uma atenuação.",
    "Diga o que a formulação original evita afirmar.",
    "Reescreva em registro adequado ao destinatário.",
    "Termine reconhecendo o que a sua leitura pode ter deixado de fora.",
  ],
  checklist: [
    "Fala original e leitura alternativa apresentadas.",
    "Pista linguística nomeada.",
    "Pressuposto ou evasão identificados.",
    "Reescrita com compromisso verificável.",
    "Registro adequado ao destinatário.",
    "Risco de erro da própria interpretação reconhecido.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "부서장은 회의에서 '이번 개편은 다음 달부터 검토할 예정'이라고만 말했다. 이 문장은 개편이 시행된다는 뜻도, 취소된다는 뜻도 아니다. '검토'라는 단어가 결정을 미루는 역할을 하고, '다음 달부터'라는 표현은 시행 시점을 약속하는 것처럼 들리게 한다. 팀원들은 이 말을 듣고 두 가지로 해석했다. 어떤 사람은 곧 시행된다고 준비했고, 어떤 사람은 없던 일이 될 것이라고 기다렸다. 부서장은 아마도 반발을 줄이려고 이 표현을 골랐을 것이다. 그러나 그 선택의 비용은 현장 직원에게 돌아갔다. 나는 이 문장을 '개편안은 10월 1일부터 시행하며, 세부 일정은 9월 15일까지 공지한다'로 고쳐야 한다고 본다. 다만 내 해석도 부서장의 의도를 완전히 알 수는 없다는 한계가 있다.",
    pt: "Na reunião, o chefe de departamento disse apenas que 'a reorganização será examinada a partir do mês que vem'. Essa frase não significa que a reorganização será implementada nem que será cancelada. A palavra 'exame' serve para adiar a decisão, e a expressão 'a partir do mês que vem' soa como uma promessa de prazo. Ao ouvir isso, a equipe se dividiu em duas leituras. Alguns se prepararam como se a medida fosse entrar em vigor em breve; outros esperaram como se tudo fosse ser desfeito. O chefe provavelmente escolheu essa formulação para reduzir a resistência. No entanto, o custo dessa escolha recaiu sobre os funcionários na ponta. Considero que a frase deveria ser corrigida para: 'A reorganização entra em vigor em 1º de outubro, e o cronograma detalhado será divulgado até 15 de setembro.' Reconheço, porém, que minha interpretação também tem um limite: não é possível saber completamente a intenção do chefe.",
    notePt: "Exemplo original. O texto identifica a pista, o pressuposto e o custo, reescreve com prazo verificável e preserva a incerteza sobre a intenção. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c01 — avaliação do Módulo 1: ironia, pressuposição, evasão, cortesia e ambiguidade. */
export const C2_C01 = defineC2Checkpoint({
  id: "c2-c01", number: 1, moduleId: "c2-m01",
  title: "Checkpoint · Pragmática fina e implicatura",
  objective: "Avaliar ironia, pressuposição, evasão, cortesia e ambiguidade do Módulo 1.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l01", "c2-l02", "c2-l03", "c2-l04", "c2-l05"],
  prerequisites: ["c2-l01", "c2-l02", "c2-l03", "c2-l04", "c2-l05"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual pergunta investiga um pressuposto, em vez de apenas negar o que foi dito?", ["Por que a nota já trata a falha do estudante como a hipótese principal?", "A nota foi publicada em maio?", "Quem assinou a nota?"], "Por que a nota já trata a falha do estudante como a hipótese principal?", "A pergunta mira o enquadramento que distribui a culpa antes da conclusão da investigação."),
    mcq("Qual resposta assume responsabilidade, em vez de apenas atenuar?", ["점검 기록을 오늘 공개하고, 누락이 확인되면 제가 책임을 지겠습니다.", "점검은 일반적으로 잘 이루어지는 편입니다.", "기록이 없을 수도 있다고 봅니다."], "점검 기록을 오늘 공개하고, 누락이 확인되면 제가 책임을 지겠습니다.", "A resposta fixa um ato verificável, um prazo e um responsável."),
    mcq("O que a ironia exige do ouvinte para não se tornar ofensa?", ["Que ele perceba a inversão e tenha contexto suficiente para não tomar o enunciado ao pé da letra.", "Que ele concorde com o falante sem interpretar.", "Que ele ignore completamente o tom da fala."], "Que ele perceba a inversão e tenha contexto suficiente para não tomar o enunciado ao pé da letra.", "A ironia depende de pistas compartilhadas; sem elas, o enunciado literal prevalece."),

    cloze("Complete a reação de espanto: 그 발표가 완벽했___? 자료가 세 장뿐이었는데요.", "다니요", "-다니요 retoma a fala do outro para marcar incredulidade."),
    cloze("Complete o rebaixamento do problema: 회사는 그 사고를 작은 실수로 ___.", "치부했다", "-로 치부하다 classifica algo de modo redutor, dispensando exame."),
    cloze("Complete a tendência institucional: 저희는 점검을 정기적으로 실시하는 ___.", "편입니다", "-는 편이다 descreve uma tendência, sem confirmar o caso concreto."),
    cloze("Complete a instrução honorífica: 내일까지 자료를 정리하도록 ___.", "하십시오", "-도록 하십시오 suaviza a ordem sem perder clareza."),
    cloze("Complete a margem de interpretação: 이 문장은 다르게 해석될 ___가 있다.", "여지", "-ㄹ 여지 indica espaço para outra leitura ou ação."),

    listen("Ouça e escreva a resposta modesta ao elogio.", "칭찬이기는요. 그저 시간에 맞춰 끝냈을 뿐이에요.", "칭찬이기는요. 그저 시간에 맞춰 끝냈을 뿐이에요.", "Elogio? Que nada. Só terminei dentro do prazo."),
    listen("Ouça e escreva o risco que a ironia cria.", "같은 문장이 사람마다 다르게 들리는 게 반어의 위험이에요.", "같은 문장이 사람마다 다르게 들리는 게 반어의 위험이에요.", "Que a mesma frase soe diferente para cada pessoa é o risco da ironia."),
    listen("Ouça e escreva por que a pergunta deve mirar o pressuposto.", "부정해도 사라지지 않는 정보가 있으므로, 질문은 문장 전체가 아니라 전제를 겨냥해야 한다.", "부정해도 사라지지 않는 정보가 있으므로, 질문은 문장 전체가 아니라 전제를 겨냥해야 한다.", "Como há informações que não desaparecem nem com a negação, a pergunta deve mirar o pressuposto, não a frase inteira."),
    listen("Ouça e escreva a prioridade declarada pelo porta-voz.", "지금은 원인을 밝히는 것이 우선입니다.", "지금은 원인을 밝히는 것이 우선입니다.", "No momento, esclarecer a causa é prioritário."),
    listen("Ouça e escreva a concessão do diretor.", "원칙은 어렵지만, 이번 건은 재량으로 검토하겠습니다.", "원칙은 어렵지만, 이번 건은 재량으로 검토하겠습니다.", "Em princípio é difícil, mas vou examinar este caso dentro da minha margem de decisão."),
    listen("Ouça e escreva o que deve ser exigido do comunicado.", "그래서 우리가 요구해야 할 것은 해석이 아니라 일정과 책임자입니다.", "그래서 우리가 요구해야 할 것은 해석이 아니라 일정과 책임자입니다.", "Por isso, o que devemos exigir não é uma interpretação, mas um cronograma e um responsável."),

    reading("두 번째 방에서는 사진의 구도가 갑자기 달라진다. 인물은 화면 가장자리로 밀려나고, 간판과 셔터가 화면의 중심을 차지한다. 작가가 골목을 사랑한다고 말하기는 어렵다. 오히려 그는 골목을 오래된 풍경으로 소비하고 있는지도 모른다.", "Qual leitura a composição das fotos permite?", ["Que o artista trata o beco como paisagem e deixa as pessoas em segundo plano.", "Que o artista se recusa a fotografar qualquer ser humano.", "Que o artista documenta apenas a vida dos moradores."], "Que o artista trata o beco como paisagem e deixa as pessoas em segundo plano.", "A posição das pessoas na margem sustenta a suspeita de que o beco virou objeto estético."),
    reading("물론 이것은 나의 해석이다. 작가는 인터뷰에서 '사라지는 것들을 기록하고 싶었다'고 말했다. 그 말을 믿는다면 전시는 애도의 형식일 수도 있다. 그러나 기록과 미화는 다르다.", "Por que a autora mantém duas leituras possíveis?", ["Porque reconhece a intenção declarada do artista sem abandonar a crítica ao efeito da obra.", "Porque não sabe quem é o artista.", "Porque a exposição não tem título."], "Porque reconhece a intenção declarada do artista sem abandonar a crítica ao efeito da obra.", "A autora admite a leitura do luto, mas distingue registro de embelezamento."),
    reading("해당 실험은 사전 승인 절차를 거쳤으며, 안전 관리 담당자는 정기 점검을 수행했습니다. 다만 사고 당시 학생 A 씨가 안전 교육을 이수하지 않은 상태였다는 점이 확인되었습니다. 지도교수는 평소 실험실 안전 수칙을 강조해 왔으며, 이번 사고와 관련하여 별도의 지시를 내린 사실은 없습니다.", "O que a seleção de fatos na nota sugere?", ["Que o procedimento e o professor são apresentados como confiáveis, e o estudante como elo falho.", "Que a universidade não possui normas de segurança.", "Que o estudante concluiu toda a formação exigida."], "Que o procedimento e o professor são apresentados como confiáveis, e o estudante como elo falho.", "A nota reforça o procedimento e a conduta do orientador enquanto destaca a formação incompleta do estudante."),
    reading("저희는 점검을 정기적으로 실시하는 편입니다. 다만 이번 창고는 준공된 지 오래되어 일부 설비의 교체가 필요한 상황이었습니다. 점검 기록은 확인되는 대로 공개하겠습니다.", "Como a resposta atenua o compromisso?", ["Descreve uma prática geral, mas não confirma a inspeção do caso concreto.", "Nega que a empresa faça inspeções.", "Confirma que o registro foi perdido."], "Descreve uma prática geral, mas não confirma a inspeção do caso concreto.", "A tendência ('하는 편') não responde à pergunta sobre o caso específico."),
    reading("두 메시지의 요청 내용은 같다. 그러나 첫 번째 메시지는 '여쭙고자 합니다', '부담이 되실 수 있으나'와 같은 완곡한 표현으로 상대의 재량을 인정하고, 거절의 여지를 넓혀 준다. 두 번째 메시지는 짧고 직접적이지만, '괜찮아'와 '편할 때 알려 줘'라는 표현이 동료 관계의 친밀함을 전제한다.", "O que a comparação das mensagens mostra sobre a cortesia?", ["Ela redistribui o poder de decidir e o custo da recusa, além de mudar o tom.", "Ela serve apenas para deixar o texto mais longo.", "Ela elimina a necessidade de dizer o que se pede."], "Ela redistribui o poder de decidir e o custo da recusa, além de mudar o tom.", "A cortesia não é só etiqueta: ela altera quem pode recusar e com que custo."),
    reading("발표 직후 두 단체가 서로 다른 해석을 내놓았다. 확대를 요구해 온 한 단체는 '검토'라는 표현에 주목했다. 이들은 예산 검토가 끝나면 규모가 늘어날 것이라고 읽었다. 반면 사업 축소를 우려하는 다른 단체는 '적용 여부'라는 말에 주목했다. 이들은 다음 달부터 지원이 중단될 수도 있다고 보았다.", "O que a ambiguidade do comunicado produz?", ["Duas leituras defensáveis que adiam o custo da decisão.", "Uma leitura correta e outra claramente errada.", "Uma promessa de aumento imediato do orçamento."], "Duas leituras defensáveis que adiam o custo da decisão.", "Cada grupo encontra no texto uma base para sua expectativa, e o órgão não precisa decidir."),

    translate("pt-ko", "Traduza: “Elogio? Que nada; apenas terminei dentro do prazo.”", "칭찬이기는요. 그저 시간에 맞춰 끝냈을 뿐이에요.", "-기는요 refuta o elogio com modéstia, em registro oral cortês.", ["칭찬이기는요. 그저 시간 맞춰 끝냈을 뿐이에요."]),
    translate("pt-ko", "Traduza: “A nota trata o acidente como um pequeno erro.”", "그 공지문은 사고를 작은 실수로 치부한다.", "치부하다 rebaixa o fato a uma categoria que dispensa exame.", ["그 공지문은 그 사고를 작은 실수로 치부한다."]),
    translate("ko-pt", "Traduza: 책임 있는 유보는 아는 것과 모르는 것을 구분하지만, 책임 회피는 그 경계를 흐린다.", "Uma ressalva responsável distingue o que se sabe do que não se sabe; a fuga da responsabilidade, porém, turva essa fronteira.", "유보 = ressalva; 경계를 흐리다 = turvar a fronteira.", ["Uma cautela responsável separa o que se sabe do que se ignora, enquanto a evasão da responsabilidade confunde essa linha."]),
    translate("pt-ko", "Traduza: “Por favor, organize os materiais até amanhã.”", "내일까지 자료를 정리하도록 하십시오.", "-도록 하십시오 dá uma instrução honorífica indireta em registro institucional.", ["내일까지 자료를 정리하도록 하세요."]),
    translate("ko-pt", "Traduza: 모호한 문장은 결정을 미루는 동안 책임을 분산시키지만, 그 비용은 기다리는 사람에게 돌아간다.", "Uma frase ambígua dispersa a responsabilidade enquanto adia a decisão, mas o custo recai sobre quem espera.", "분산시키다 = dispersar; 돌아가다 = recair sobre.", ["Enquanto adia a decisão, a frase ambígua dilui a responsabilidade, mas quem espera acaba arcando com o custo."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
