import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "A revisão responde ao enunciado e entrega uma versão utilizável do trecho, não apenas comentários soltos." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As referências, os conectivos e a ordem das ideias formam uma sequência estável do início ao fim." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico de edição com precisão, inclusive parte do léxico do módulo, em colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém adequado ao gênero e ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade da revisão", descriptorPt: "Cada mudança resolve um problema identificável e preserva a informação necessária." },
  { criterion: "synthesis" as const, labelPt: "Síntese e justificativa", descriptorPt: "O fechamento explica o que melhorou, o que foi sacrificado e o que ainda precisa de revisão." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · revisão justificada",
  promptPt: "Escolha um trecho de dois parágrafos com problemas de coesão, conectivos ou registro. Reescreva-o e registre quatro justificativas: duas para mudanças de coesão ou conexão, uma para uma escolha de registro e uma para o que foi sacrificado. Preserve a informação que o leitor precisa para verificar o relato.",
  promptKo: "지시어, 접속어, 문체 가운데 두 가지 이상을 고치고, 바꾼 이유를 기록해 보세요.",
  guidance: [
    "Marque os problemas antes de reescrever: referência ambígua, conectivo inadequado, registro misturado.",
    "Use uma forma de retomada vista no módulo, como -ㄴ/는 바 ou -ㄹ 것.",
    "Use um conectivo que corresponda à relação real, como -ㄹ 뿐더러 ou -ㄴ/는 가운데.",
    "Mantenha uma citação ou um dado verificável ao encurtar.",
    "Feche dizendo o que a revisão melhorou e o que perdeu.",
  ],
  checklist: [
    "Problemas de coesão, conexão ou registro identificados.",
    "Quatro mudanças justificadas.",
    "Referentes sem ambiguidade.",
    "Registro uniforme e adequado ao destinatário.",
    "Informação verificável preservada.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "이 보고서는 ‘이 조치’가 무엇을 가리키는지 밝히지 않아 첫 문단에서 독자를 멈추게 한다. 먼저 운영 시간 연장을 문장 앞에 두고, 다음 문장에서 ‘이 연장’으로 받았다. 둘째 문단의 ‘그러나’는 대립이 아니라 보충을 나타내므로 ‘게다가’로 고쳤다. 참여자가 늘었을 뿐더러 수확량도 늘었다는 두 근거가 같은 방향을 가리키기 때문이다. 셋째 문단의 구어체는 행정적 보고에만 문어체로 바꾸었고, 참여자 인용문은 그대로 두었다. 예산 근거를 밝힌 문장은 지우는 대신 각주로 옮겼다. 이렇게 하면 분량은 줄고 절차는 더 분명해진다. 다만 문장의 온도는 조금 낮아졌다는 점을 인정해야 한다.",
    pt: "Este relatório não deixa claro a que ‘esta medida’ se refere e, com isso, faz o leitor parar no primeiro parágrafo. Primeiro coloquei a extensão do horário no início da frase e, na frase seguinte, retomei com ‘esta extensão’. O ‘no entanto’ do segundo parágrafo não indica oposição, mas acréscimo, por isso o troquei por ‘além disso’. Isso porque as duas evidências — o aumento de participantes e o aumento da colheita — apontam na mesma direção. O registro oral do terceiro parágrafo foi passado para o registro escrito apenas no relato administrativo, e as citações dos participantes ficaram como estavam. A frase que explicita a base orçamentária foi transferida para uma nota de rodapé, em vez de apagada. Assim, a extensão diminui e o procedimento fica mais claro. Devo admitir, porém, que a temperatura das frases baixou um pouco.",
    notePt: "Exemplo original de oito frases. Observe a referência corrigida, o conectivo justificado, o registro ajustado e o sacrifício admitido. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c06 — avaliação do Módulo 6: coesão, conectivos, concisão, registro e autoedição. */
export const C1_C06 = defineC1Checkpoint({
  id: "c1-c06", number: 6, moduleId: "c1-m06",
  title: "Checkpoint · Edição e revisão de texto",
  objective: "Avaliar coesão, conectivos, concisão, registro e autoedição do Módulo 6.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l26", "c1-l27", "c1-l28", "c1-l29", "c1-l30"],
  prerequisites: ["c1-l26", "c1-l27", "c1-l28", "c1-l29", "c1-l30", "c1-c01", "c1-c02", "c1-c03", "c1-c04", "c1-c05"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual é o critério prático para decidir se uma retomada pode permanecer?", ["O número de candidatos a antecedente.", "O número de parágrafos do texto.", "A posição da retomada no fim da frase."], "O número de candidatos a antecedente.", "Com um único candidato, a retomada é segura; com dois ou mais, o referente precisa ser explicitado."),
    mcq("Um conectivo de contraste usado para ligar duas evidências na mesma direção...", ["promete uma oposição que o texto não cumpre.", "deixa o texto mais formal sem mudar o sentido.", "substitui a necessidade de evidência."], "promete uma oposição que o texto não cumpre.", "O conectivo cria uma expectativa de relação; se ela não se realiza, o leitor sente uma quebra."),
    mcq("O que caracteriza uma concisão responsável?", ["Remover o excesso e preservar condições, exceções e base das afirmações.", "Encurtar todas as frases ao máximo, sem exceção.", "Eliminar as notas de rodapé e as ressalvas."], "Remover o excesso e preservar condições, exceções e base das afirmações.", "Concisão reduz o esforço de leitura sem apagar a informação que sustenta a credibilidade."),

    cloze("Complete a regra de retomada: 후보가 둘 이상이면 대상을 구체적인 명사로 ___.", "밝힌다", "밝힌다 fecha o critério: com mais de um candidato, explicita-se o referente."),
    cloze("Complete o acréscimo na mesma direção: 참여자가 늘었을 ___ 수확량도 늘었다.", "뿐더러", "-ㄹ 뿐더러 soma um segundo fato que reforça o primeiro."),
    cloze("Complete o pano de fundo: 예산이 줄어드는 ___ 참여자는 오히려 늘었다.", "가운데", "-ㄴ/는 가운데 apresenta a circunstância em que o fato ocorre."),
    cloze("Complete a recomendação impessoal: 조건을 담은 문장은 길어도 남길 ___가 있다.", "필요", "A forma fixa é -ㄹ 필요가 있다, para recomendar uma providência técnica."),
    cloze("Complete a forma nominal do relatório: 예산 집행 내역을 ___.", "보고함", "-ㅁ encerra o item em registro institucional compacto."),

    listen("Ouça e escreva a regra para retomadas com mais de um candidato.", "한 지시어에 후보가 둘 이상이면 대상을 구체적인 명사로 밝힌다.", "한 지시어에 후보가 둘 이상이면 대상을 구체적인 명사로 밝힌다.", "Quando um elemento anafórico tem dois ou mais candidatos, explicita-se o referente com um substantivo concreto."),
    listen("Ouça e escreva o que acontece quando o conectivo não corresponde à relação real.", "접속어가 실제 관계와 어긋나면 독자는 논리의 끊김을 느낀다.", "접속어가 실제 관계와 어긋나면 독자는 논리의 끊김을 느낀다.", "Quando o conectivo não corresponde à relação real, o leitor sente uma quebra na lógica."),
    listen("Ouça e escreva a ordem que a editora recomenda antes de inserir um conectivo.", "접속어를 붙이기 전에 두 사건의 시간 순서를 먼저 확인해야 한다.", "접속어를 붙이기 전에 두 사건의 시간 순서를 먼저 확인해야 한다.", "Antes de inserir o conectivo, é preciso confirmar primeiro a ordem temporal dos dois acontecimentos."),
    listen("Ouça e escreva o critério de concisão.", "간결함의 기준은 단어 수가 아니라 남은 정보의 정확성이다.", "간결함의 기준은 단어 수가 아니라 남은 정보의 정확성이다.", "O critério da concisão não é o número de palavras, mas a exatidão da informação que resta."),
    listen("Ouça e escreva o que se perde quando a forma nominal esconde o agente.", "명사형으로 끝나는 문장은 간결하지만 누가 보고했는지 밝히지 않는다.", "명사형으로 끝나는 문장은 간결하지만 누가 보고했는지 밝히지 않는다.", "A frase terminada em forma nominal é concisa, mas não revela quem relatou."),
    listen("Ouça e escreva por que a autora marcou antes as frases longas.", "이전 원고에서 같은 실수를 한 경험이 있어서 긴 문장을 먼저 표시했다.", "이전 원고에서 같은 실수를 한 경험이 있어서 긴 문장을 먼저 표시했다.", "Como já tinha cometido o mesmo erro num texto anterior, marquei antes as frases longas."),

    reading("수정된 문단에서는 ‘운영 시간 연장’이 첫 문장에, ‘이 연장’이 둘째 문장에 놓였다. 같은 대상을 가리키지만 표현이 달라져 반복은 줄었고, 선행사와 지시어의 거리도 가까워졌다.", "O que a revisão do parágrafo melhorou?", ["Reduziu a repetição e aproximou o antecedente da retomada.", "Eliminou o uso de substantivos.", "Afastou o antecedente para o fim do texto."], "Reduziu a repetição e aproximou o antecedente da retomada.", "A versão revisada troca a expressão e encurta a distância entre antecedente e retomada."),
    reading("모든 지시어를 명사로 바꾸면 글이 안전해 보이지만, 같은 명사가 반복되어 오히려 읽기 어려워진다. 반대로 대용 표현만 늘리면 독자는 매번 대상을 추측해야 한다. 따라서 편집의 기준은 지시어의 개수가 아니라 후보의 수다.", "Qual é o critério de edição defendido?", ["O número de candidatos a referente.", "O número de pronomes por parágrafo.", "A extensão total do texto."], "O número de candidatos a referente.", "O texto rejeita contar pronomes e propõe contar candidatos a antecedente."),
    reading("둘째 문단은 ‘그러나’로 시작했지만 앞 문단과 대립하는 내용이 없었다. 대립을 기대하게 해 놓고 같은 주장을 되풀이한 것이다. 편집자는 이 자리에 ‘게다가’를 넣어 참여자 증가와 수확량 증가가 같은 방향의 근거임을 표시했다.", "Por que o conectivo foi trocado por ‘게다가’?", ["Porque as duas evidências apontam na mesma direção.", "Porque o parágrafo ficou curto demais.", "Porque ‘그러나’ é informal."], "Porque as duas evidências apontam na mesma direção.", "A troca marca acréscimo, não oposição, e corresponde à relação real entre as evidências."),
    reading("지운 문장 가운데 예산 근거를 밝힌 문장이 하나 있었다. 편집자는 그 문장을 각주로 옮겼다. 축약은 정보를 버리는 일이 아니라 위치를 바꾸는 일인 경우가 많다.", "O que a editora fez com a frase da base orçamentária?", ["Moveu-a para uma nota de rodapé.", "Eliminou-a do relatório.", "Transformou-a em título."], "Moveu-a para uma nota de rodapé.", "A frase não foi descartada: mudou de posição para preservar a informação."),
    reading("수정된 문장은 ‘담당자가 3월 4일부터 8일까지 참여자 24명을 면담하였으며, 만족도는 4.2점으로 확인되었다’로 바뀌었다. 문어체로 고치면서 행위자와 기간이 드러났고, 감정적 평가는 수치로 대체되었다. 다만 모든 구어체를 없애면 글의 온도가 사라진다.", "O que a revisão preservou de propósito?", ["A citação em registro oral, que mantém a temperatura do texto.", "Todos os comentários informais no corpo do relatório.", "A ausência de datas e responsáveis."], "A citação em registro oral, que mantém a temperatura do texto.", "O texto mantém as citações e ajusta apenas o relato administrativo."),
    reading("수정 기록에는 세 가지 근거를 남겼다. 첫째, 첫 문장을 문제 제시로 바꾼 이유. 둘째, 접속어를 바꾼 이유. 셋째, 반론의 위치를 옮긴 이유다. 기록이 없으면 다음 수정에서 같은 판단을 반복해야 한다.", "Por que o registro da revisão é necessário?", ["Para não repetir o mesmo julgamento numa revisão futura.", "Para aumentar o número de palavras do texto.", "Para dispensar a versão anterior."], "Para não repetir o mesmo julgamento numa revisão futura.", "O registro transforma a decisão em critério reutilizável e evita refazer a mesma discussão."),

    translate("pt-ko", "Traduza: “O critério da edição não é o número de elementos anafóricos, mas o número de candidatos.”", "편집의 기준은 지시어의 개수가 아니라 후보의 수다.", "개수 = quantidade; 후보 = candidato a referente.", ["편집의 기준은 지시어의 수가 아니라 후보의 수입니다."]),
    translate("ko-pt", "Traduza: 이 문단은 근거가 빈약할 뿐더러 접속어도 관계와 어긋난다.", "Este parágrafo não só tem evidências fracas, como também usa conectivos que não correspondem à relação.", "-ㄹ 뿐더러 acrescenta a segunda falha na mesma direção.", ["Além de ter evidências fracas, este parágrafo usa conectivos que não batem com a relação entre as ideias."]),
    translate("pt-ko", "Traduza: “As frases que trazem condições precisam ser mantidas, mesmo que sejam longas.”", "조건을 담은 문장은 길어도 남길 필요가 있다.", "-ㄹ 필요가 있다 recomenda a medida em tom impessoal.", ["조건이 들어 있는 문장은 길더라도 남길 필요가 있습니다."]),
    translate("ko-pt", "Traduza: 원장님께서 초안을 직접 검토하셨다.", "O diretor revisou o rascunho pessoalmente.", "-시- eleva o sujeito 원장님; 검토하셨다 reúne honorífico e passado.", ["O diretor examinou ele mesmo o esboço."]),
    translate("pt-ko", "Traduza: “Em vez de descartar o rascunho, guardei juntas as versões antes e depois.”", "초고를 버리는 대신 수정 전후를 함께 보관했다.", "-ㄴ/는 대신 marca substituição, não simples contraste.", ["초고를 버리지 않고 수정 전후를 함께 보관했습니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
