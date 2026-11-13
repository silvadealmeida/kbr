import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e produz as duas versões pedidas, sem fugir ao recorte." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a comparação entre as versões é compreensível." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem repetição vazia." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém coerente em cada versão." },
  { criterion: "argument" as const, labelPt: "Adequação pragmática", descriptorPt: "A marca de fonte, a força e a diretividade correspondem ao risco de cada situação." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento avalia o que cada versão protege e o que cada uma arrisca." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · dizer com a força certa",
  promptPt:
    "Escolha uma situação em que você precisou dar uma informação incerta e fazer um pedido delicado. Escreva um texto curto com duas partes. Na primeira, relate o que você viu, o que ouviu e o que inferiu, marcando a fonte de cada afirmação. Na segunda, formule o pedido em duas versões, uma mais direta e outra mais indireta, e explique o que cada uma protege.",
  promptKo: "정보의 출처를 밝히고, 같은 부탁을 두 가지 강도로 써 보세요.",
  guidance: [
    "Separe observação direta, relato de terceiros e inferência.",
    "Use uma forma de inferência vista no módulo.",
    "Use uma forma de atenuação ou de intensificação de modo consciente.",
    "Mantenha o registro coerente em cada versão.",
    "Diga qual versão deixa margem real de recusa.",
  ],
  checklist: [
    "Fonte de cada afirmação indicada.",
    "Uma inferência marcada como inferência.",
    "Duas versões do mesmo pedido.",
    "Registro coerente em cada versão.",
    "Fechamento avaliando risco e ganho.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "어제 오후, 회의가 예정보다 일찍 끝났다는 이야기를 들었다. 나는 회의실에 들어가지 않았고, 복도에서 나오는 사람들의 표정만 보았다. 회의가 잘 끝난 모양이라고 짐작했지만, 그것은 내 인상일 뿐이다. 점심에 총무팀 직원에게서 예산안이 아직 통과되지 않았다는 말을 들었다. 이 이야기는 회의 참석자가 아니라 준비 담당자에게서 나왔으므로, 최종 판단과 다를 성싶다. 오후에 팀장님께 확인하니, 회의는 예정대로 끝났고 예산안은 다음 주에 다시 논의한다고 했다. 이 내용을 동료에게는 이렇게 전한다. 회의는 예정대로 끝났는데, 예산안은 다음 주에 다시 본대. 네가 들은 것과 다르면 알려 줘. 같은 내용을 부장님께는 이렇게 전한다. 부장님, 회의는 예정대로 끝났고 예산안은 다음 주에 다시 논의할 예정입니다. 제가 들은 정보와 확인한 내용이 달라, 확인한 내용만 전해 드립니다. 두 버전 모두 사실은 같지만, 첫 번째는 가까운 사이의 빠른 공유를, 두 번째는 책임의 범위를 지킨다.",
    pt: "Ontem à tarde, ouvi dizer que a reunião terminou antes do previsto. Não entrei na sala de reunião; apenas vi as expressões das pessoas que saíam pelo corredor. Imaginei que a reunião devia ter terminado bem, mas isso é apenas uma impressão minha. No almoço, ouvi de um funcionário da equipe administrativa que o orçamento ainda não tinha sido aprovado. Como essa informação veio de quem cuidava da preparação, e não de quem participou da reunião, é provável que seja diferente do julgamento final. À tarde, confirmei com a chefe de equipe: a reunião terminou conforme o previsto, e o orçamento seria discutido de novo na semana seguinte. Aos colegas, eu repasso assim: “A reunião terminou conforme o previsto, e o orçamento será visto de novo na semana que vem. Se for diferente do que você ouviu, me avisa.” Ao diretor, eu repasso assim: “Diretor, a reunião terminou conforme o previsto, e o orçamento será discutido de novo na semana que vem. Como a informação que ouvi e a que confirmei divergiam, transmito apenas o que confirmei.” As duas versões têm o mesmo fato, mas a primeira preserva o compartilhamento rápido entre próximos, e a segunda preserva o alcance da responsabilidade.",
    notePt: "Exemplo original. Observe a fonte marcada, a inferência assumida e as duas versões do repasse. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c04 — avaliação do Módulo 4: evidencialidade, ironia, força, registro e risco. */
export const C1_C04 = defineC1Checkpoint({
  id: "c1-c04", number: 4, moduleId: "c1-m04",
  title: "Checkpoint · Evidencialidade, ironia e registro",
  objective: "Avaliar evidencialidade, ironia, atenuação, honoríficos e risco pragmático do Módulo 4.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l16", "c1-l17", "c1-l18", "c1-l19", "c1-l20"],
  prerequisites: ["c1-l16", "c1-l17", "c1-l18", "c1-l19", "c1-l20", "c1-c01", "c1-c02", "c1-c03"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual frase deixa claro que a informação foi inferida, e não observada diretamente?", ["회의실이 조용한 걸 보니 회의가 끝난 모양이다.", "나는 회의실에서 회의가 끝나는 것을 직접 보았다.", "회의는 세 시에 시작합니다."], "회의실이 조용한 걸 보니 회의가 끝난 모양이다.", "-ㄴ/는 모양이다 marca uma conclusão tirada de indícios observados, não uma observação direta."),
    mcq("Qual resposta rebaixa um elogio sem ofender?", ["대단하기는요. 아직 절반도 못 했어요.", "그 말은 틀렸습니다.", "네, 제가 최고입니다."], "대단하기는요. 아직 절반도 못 했어요.", "-기는요 recusa o elogio de modo polido, sem transformar a discordância em ataque."),
    mcq("Qual pedido deixa ao outro uma margem real de recusa?", ["시간 되실 때 같이 확인해 주실 수 있을까요?", "지금 당장 다시 하세요.", "이건 반드시 오늘 안에 끝내야 합니다."], "시간 되실 때 같이 확인해 주실 수 있을까요?", "A pergunta com condição e possibilidade preserva a autonomia de quem recebe o pedido."),

    cloze("Complete a inferência a partir da pista: 회의실 불이 꺼진 걸 보니 회의가 일찍 끝난 ___.", "모양이다", "-ㄴ/는 모양이다 conclui a partir de uma evidência observável."),
    cloze("Complete a previsão em registro escrito: 예산안이 아직 통과되지 않아 다음 주에 다시 회의를 열 ___.", "성싶다", "-ㄹ 성싶다 apresenta uma suposição provável em registro escrito."),
    cloze("Complete a análise da resenha: 칭찬 뒤에 구체적인 지적이 붙으면, 그 칭찬은 더 이상 순수한 칭찬으로 읽히지 않는다. 여기서 ___는 배열에서 생긴다.", "반어", "A ironia, nesse caso, nasce da disposição dos enunciados, não do conteúdo literal."),
    cloze("Complete a tendência: 이 책은 설명이 반복되는 ___.", "편이다", "-ㄴ/는 편이다 descreve uma tendência relativa, não uma regra absoluta."),
    cloze("Complete o aviso preventivo: 늦지 ___ 유의하여 주시기 바랍니다.", "않도록", "-지 않도록 유의하다 formula uma instrução que evita o problema."),

    listen("Ouça e escreva a inferência feita a partir da sala vazia.", "회의가 예정보다 일찍 끝난 모양이에요.", "회의가 예정보다 일찍 끝난 모양이에요.", "Pelo visto, a reunião terminou antes do previsto."),
    listen("Ouça e escreva o cuidado ao tratar informação de terceiros.", "직접 본 장면과 들은 이야기를 같은 무게로 다루어서는 안 된다.", "직접 본 장면과 들은 이야기를 같은 무게로 다루어서는 안 된다.", "Não se deve tratar uma cena vista diretamente e uma história ouvida com o mesmo peso."),
    listen("Ouça e escreva como a colega rebaixa o próprio trabalho.", "대단하기는요. 자료 절반은 어제 밤에 겨우 채웠어요.", "대단하기는요. 자료 절반은 어제 밤에 겨우 채웠어요.", "Imagina. Metade do material eu preenchi às pressas ontem à noite."),
    listen("Ouça e escreva o que a atenuação não elimina.", "평가의 강도를 낮춘다고 해서 비판이 사라지는 것은 아니다.", "평가의 강도를 낮춘다고 해서 비판이 사라지는 것은 아니다.", "Baixar a intensidade da avaliação não faz a crítica desaparecer."),
    listen("Ouça e escreva a regra de coerência de registro.", "한 사람에게 보내는 글 안에서는 높임의 정도를 끝까지 유지해야 한다.", "한 사람에게 보내는 글 안에서는 높임의 정도를 끝까지 유지해야 한다.", "Dentro de um texto enviado a uma só pessoa, é preciso manter o grau de reverência do começo ao fim."),
    listen("Ouça e escreva o limite de um pedido sem saída.", "거절할 수 없는 부탁은 정중해 보여도 압박이 된다.", "거절할 수 없는 부탁은 정중해 보여도 압박이 된다.", "Um pedido impossível de recusar, por mais cortês que pareça, vira pressão."),

    reading("회의실 불이 일찍 꺼졌고 복도가 조용했다. 나는 회의가 예정보다 일찍 끝난 모양이라고 생각했다. 그러나 끝난 시각과 결론이 난 시각은 다를 수 있다. 직접 본 장면만으로 판단하지 않고 확인된 정보를 기다린 이유가 여기에 있다.", "O que o texto mostra sobre a inferência?", ["Ela parte de indícios, mas não se confunde com a informação confirmada.", "Ela dispensa qualquer verificação posterior.", "Ela só é válida quando há muitas pessoas presentes."], "Ela parte de indícios, mas não se confunde com a informação confirmada.", "A inferência organiza os indícios, mas o texto separa o que foi visto do que foi confirmado."),
    reading("리뷰는 ‘훌륭한 시도’라는 말을 네 번 반복하면서, 그때마다 구체적인 문제를 덧붙인다. 칭찬이 반복될수록 무게가 가벼워지고, 마지막에는 ‘다음에는 더 나은 기억으로 남기를’이라는 문장이 남는다.", "Qual pista sustenta a leitura irônica?", ["A repetição do elogio seguida sempre de um problema concreto.", "A ausência de qualquer elogio no texto.", "O uso de uma única frase curta no título."], "A repetição do elogio seguida sempre de um problema concreto.", "O elogio se esvazia porque cada repetição vem acompanhada de uma objeção específica."),
    reading("평가의 강도를 낮춘다고 비판이 사라지는 것은 아니다. ‘기대에 미치지 못한 부분이 있다’는 문장은 저자의 능력 전체를 문제로 만들지 않으면서도, 특정 부분의 성취를 인정한다. 대신 근거가 약하면 완곡한 표현도 책임을 흐릴 수 있다.", "O que a atenuação faz, segundo o texto?", ["Delimita o alcance da crítica, mas não substitui a evidência.", "Elimina a necessidade de apresentar provas.", "Transforma qualquer crítica em elogio."], "Delimita o alcance da crítica, mas não substitui a evidência.", "A atenuação restringe o juízo; sem evidência, ela apenas dilui a responsabilidade."),
    reading("같은 회의 일정을 두고 팀장에게 보낸 글과 동료에게 보낸 글이 있다. 첫 글은 ‘제출해 주시기 바랍니다’로 끝나고, 둘째 글은 ‘보내 줄 수 있어?’로 끝난다. 두 글 모두 공손하지만, 공손함의 종류가 다르다. 중요한 것은 한 글 안에서 높임의 정도가 흔들리지 않는 것이다.", "O que o texto destaca na comparação entre as mensagens?", ["A coerência interna do registro em cada mensagem.", "A superioridade da mensagem mais formal.", "A necessidade de usar 반말 com colegas."], "A coerência interna do registro em cada mensagem.", "O texto aceita os dois registros e cobra coerência dentro de cada mensagem."),
    reading("공개된 대화방에서 다시 확인하라는 요청은 상대의 실수를 모두에게 알리는 것처럼 들릴 수 있다. 같은 내용을 개인 메시지로 옮기고 책임의 위치를 ‘제가’로 바꾸자 답장이 바로 왔다. 요청의 강도는 낮아졌지만 일의 목적은 오히려 분명해졌다.", "Por que o segundo pedido funcionou melhor?", ["Porque reduziu a exposição pública e assumiu parte da responsabilidade.", "Porque aumentou o prazo e retirou a exigência.", "Porque foi enviado a mais pessoas."], "Porque reduziu a exposição pública e assumiu parte da responsabilidade.", "A mudança de canal e de responsável diminui o risco para a face do outro."),
    reading("전언은 구체적일수록 사실처럼 들린다. 그러나 누가 언제 어디서 말했는지 밝히지 않으면, 그것은 여전히 전언일 뿐이다. 반어도 마찬가지다. 표면의 칭찬만 인용하면 필자의 거리 두기가 사라진다. 인용할 때는 말의 내용과 말의 태도를 함께 옮겨야 한다.", "O que o texto pede ao citar um relato ou uma ironia?", ["Preservar a fonte e a atitude, não apenas o conteúdo literal.", "Resumir o texto com o menor número de palavras possível.", "Substituir a citação por uma opinião pessoal."], "Preservar a fonte e a atitude, não apenas o conteúdo literal.", "O texto exige que a citação carregue a fonte e a distância do enunciador."),

    translate("pt-ko", "Traduza: “Pelo visto, a reunião terminou mais cedo do que o previsto.”", "회의가 예정보다 일찍 끝난 모양이다.", "-ㄴ/는 모양이다 marca a inferência a partir de indícios observados.", ["회의가 예정보다 일찍 끝난 모양이에요."]),
    translate("ko-pt", "Traduza: 직접 본 장면과 들은 이야기를 같은 무게로 다루어서는 안 된다.", "Não se deve tratar uma cena vista diretamente e uma história ouvida com o mesmo peso.", "무게 = peso; 다루다 = tratar."),
    translate("pt-ko", "Traduza: “Esse editor costuma atenuar as críticas.”", "그 편집자는 비판을 완곡하게 쓰는 편이다.", "-ㄴ/는 편이다 descreve uma tendência relativa.", ["그 편집자는 비판을 완곡하게 쓰는 편이에요."]),
    translate("ko-pt", "Traduza: 부장님께서는 자료를 직접 검토하셨습니다.", "O diretor revisou o material pessoalmente.", "께서 e -시- marcam o sujeito honorificado."),
    translate("pt-ko", "Traduza: “Pedimos que tomem cuidado para não se atrasarem.”", "늦지 않도록 유의하여 주시기 바랍니다.", "-지 않도록 유의하다 é uma instrução preventiva em registro institucional."),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
