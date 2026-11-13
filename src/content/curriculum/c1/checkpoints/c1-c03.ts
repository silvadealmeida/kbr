import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume o gênero institucional ou acadêmico pedido e responde integralmente ao enunciado." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes do gênero aparecem na ordem adequada e cada uma cumpre uma função identificável." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem generalizações vazias." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro formal se mantém coerente." },
  { criterion: "argument" as const, labelPt: "Precisão do conteúdo", descriptorPt: "Método, ressalva, premissa ou pedido são delimitados e não prometem mais do que o texto sustenta." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento retoma o essencial, indica o próximo passo e nomeia o que permanece em aberto." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · pedido institucional fundamentado",
  promptPt: "Escreva uma carta institucional curta a um órgão público solicitando apoio para uma atividade acadêmica ou cultural. Inclua a referência do assunto, uma premissa ou limite, três pedidos em itens, os anexos e um prazo de resposta verificável.",
  promptKo: "공공 기관에 보낼 요청 공문을 전제와 한계, 세 가지 요청, 첨부 자료, 회신 기한을 갖추어 써 보세요.",
  guidance: [
    "Abra com número, data, destinatário e referência ao assunto.",
    "Use uma forma de premissa ou limite vista no módulo antes de apresentar os pedidos.",
    "Separe os três pedidos em itens e diga o que cada anexo contém.",
    "Fixe um prazo de resposta e diga o que acontece se ele não for cumprido.",
    "Feche com um pedido de cooperação em registro institucional.",
  ],
  checklist: [
    "Cabeçalho com documento, data, destinatário e referência.",
    "Premissa ou limite explícito antes dos pedidos.",
    "Três pedidos distintos e verificáveis.",
    "Anexos nomeados pelo conteúdo.",
    "Prazo de resposta e consequência do atraso.",
    "Registro formal coerente do início ao fim.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "문서번호: 평생교육과-2026-0620 / 시행일: 2026년 6월 20일 / 수신: ○○시 교육청 평생교육과 / 참조: 지역교육 담당관. 이 문서는 7월 학부모 독서 연수의 공간과 인력 지원을 요청하기 위해 발송합니다. 관련 규정에 준하여 신청 서류를 갖추었으며, 세부 요청은 다음과 같습니다. 첫째, 7월 11일과 18일 오후에 교육청 대강당을 사용하게 해 주시기 바랍니다. 둘째, 행사 당일 운영 시간을 오후 8시까지 연장해 주시기를 요청드립니다. 셋째, 참가자 안내를 위해 담당 직원 한 분의 협조를 요청드립니다. 다만 강사 섭외가 확정되지 않는 한 참가 인원을 80명으로 제한하겠습니다. 연수 계획서는 붙임 1에, 참가 신청 명단은 별첨으로 정리했습니다. 회신은 7월 3일까지 평생교육과 담당자 앞으로 보내 주시기 바랍니다. 기한 안에 회신이 없으면 7월 일정은 조정될 수 있습니다. 연수가 안전하게 진행될 수 있도록 협조를 구합니다.",
    pt: "Número do documento: Educação ao Longo da Vida-2026-0620 / Data de expedição: 20 de junho de 2026 / Destinatário: Departamento de Educação ao Longo da Vida da Secretaria de Educação de ○○ / Referência: responsável pela educação regional. Este documento é enviado para solicitar apoio de espaço e pessoal para a formação de pais em leitura de julho. Em conformidade com as normas pertinentes, preparamos os documentos de solicitação, e os pedidos detalhados são os seguintes. Primeiro, pedimos que nos permitam usar o auditório principal da Secretaria nas tardes de 11 e 18 de julho. Segundo, solicitamos que o horário de funcionamento seja estendido até as 20h no dia do evento. Terceiro, pedimos a cooperação de um funcionário responsável para orientar os participantes. No entanto, enquanto a contratação dos palestrantes não estiver confirmada, limitaremos o número de participantes a 80. O plano da formação está organizado no anexo 1, e a lista de inscritos segue em anexo separado. Pedimos que a resposta seja enviada ao responsável do Departamento de Educação ao Longo da Vida até 3 de julho. Se não houver resposta dentro do prazo, o calendário de julho poderá ser ajustado. Solicito cooperação para que a formação transcorra com segurança.",
    notePt: "Exemplo original de dez frases. O cabeçalho, a premissa, os três pedidos, os anexos e o prazo aparecem em ordem. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c03 — avaliação do Módulo 3: apresentação, artigo, reformulação, negociação e carta. */
export const C1_C03 = defineC1Checkpoint({
  id: "c1-c03", number: 3, moduleId: "c1-m03",
  title: "Checkpoint · Discurso acadêmico e profissional",
  objective: "Avaliar apresentação, artigo, reformulação, negociação e carta institucional do Módulo 3.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l11", "c1-l12", "c1-l13", "c1-l14", "c1-l15"],
  prerequisites: ["c1-l11", "c1-l12", "c1-l13", "c1-l14", "c1-l15", "c1-c01", "c1-c02"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual elemento deve abrir uma comunicação acadêmica oral?", ["A pergunta de pesquisa que o estudo responde.", "O currículo completo do apresentador.", "A lista de agradecimentos aos financiadores."], "A pergunta de pesquisa que o estudo responde.", "A pergunta organiza o que o público deve acompanhar; sem ela, os números perdem função."),
    mcq("Em uma ata de reunião, qual distinção é indispensável?", ["Entre o que foi falado, o que ficou pendente e o que foi decidido.", "Entre o nome dos participantes e o horário do café.", "Entre a opinião do redator e a pauta do dia."], "Entre o que foi falado, o que ficou pendente e o que foi decidido.", "A ata registra seletivamente posição, pendência e deliberação, sem transformar opinião em decisão."),
    mcq("Qual traço é próprio da carta institucional?", ["Cabeçalho com documento, data, destinatário e referência antes do pedido.", "Uso de gírias para aproximar o leitor.", "Ausência de prazo para não pressionar o destinatário."], "Cabeçalho com documento, data, destinatário e referência antes do pedido.", "A carta precisa ser identificável e verificável por quem não participou da conversa."),

    cloze("Complete o ponto relevante da pergunta: 이 질문이 중요한 ___은, 예산 배분의 근거가 아직 부족하다는 점입니다.", "대목", "-ㄴ/는 대목이다 destaca o aspecto que dá importância à pergunta."),
    cloze("Complete o juízo impessoal: 이 차이는 중증도 차이에서 비롯된 것으로 ___.", "판단된다", "-ㄴ/는 것으로 판단된다 apresenta um juízo baseado em evidência, sem atribuí-lo a uma pessoa."),
    cloze("Complete a consideração: 두 우려가 서로 다른 시간대를 보고 있다는 점을 ___ 비용과 절감액을 함께 비교해야 한다.", "감안하면", "-라는 점을 감안하면 introduz o fato que justifica a mudança de critério."),
    cloze("Complete a premissa: 프로그램 기획권을 갖는 것을 ___ 인력을 배치하겠습니다.", "전제로", "-ㄹ 것을 전제로 apresenta o pressuposto de que depende a oferta."),
    cloze("Complete a conformidade normativa: 관련 규정에 ___ 신청 절차를 진행하였습니다.", "준하여", "-에 준하여 indica que o procedimento segue uma norma ou padrão."),

    listen("Ouça e escreva a pergunta de pesquisa da apresentação.", "저희가 답하고자 하는 질문은 녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가입니다.", "저희가 답하고자 하는 질문은 녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가입니다.", "A pergunta que pretendemos responder é se, à medida que a área verde aumenta, a amplitude da alta da temperatura noturna diminui."),
    listen("Ouça e escreva o limite causal que a apresentadora reconhece.", "이 차이가 녹지 때문이라고 단정하기는 어렵습니다.", "이 차이가 녹지 때문이라고 단정하기는 어렵습니다.", "É difícil afirmar categoricamente que essa diferença se deva à área verde."),
    listen("Ouça e escreva a ressalva sobre a aplicação do resultado.", "세 병원의 규모와 진료 과목이 달라 결과를 다른 병원에 그대로 적용할 여지가 다분하다.", "세 병원의 규모와 진료 과목이 달라 결과를 다른 병원에 그대로 적용할 여지가 다분하다.", "Como o porte e as especialidades dos três hospitais são diferentes, há ampla margem para aplicar o resultado diretamente a outros hospitais."),
    listen("Ouça e escreva a reformulação feita pela facilitadora.", "물류팀은 시간 단축의 효과가 크다고 보고, 재무팀은 초기 비용의 부담이 크다고 본다.", "물류팀은 시간 단축의 효과가 크다고 보고, 재무팀은 초기 비용의 부담이 크다고 본다.", "A equipe de logística considera grande o efeito da redução de tempo, e a equipe financeira considera grande o peso do custo inicial."),
    listen("Ouça e escreva a cláusula que condiciona a validade do contrato.", "세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다.", "세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다.", "Enquanto não houver acordo sobre os indicadores detalhados, o contrato principal não terá efeito."),
    listen("Ouça e escreva o prazo de resposta da carta.", "회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다.", "회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다.", "Pedimos que a resposta seja enviada ao responsável da Divisão de Cooperação Educacional até 30 de abril."),

    reading("이 질문이 중요한 대목은, 지자체가 조성 예산을 배분할 때 근거로 삼을 만한 수치가 아직 부족하다는 점입니다. 저희는 25개 구의 3년 자료를 비교해 질문에 답하려 했습니다.", "Por que a pergunta da pesquisa é considerada importante?", ["Porque faltam números que sirvam de base para a distribuição do orçamento.", "Porque o governo já decidiu todo o orçamento.", "Porque os distritos não têm parques."], "Porque faltam números que sirvam de base para a distribuição do orçamento.", "A importância está na falta de base numérica para a decisão orçamentária."),
    reading("논문은 이 한계를 각주와 마지막 절에서 밝히고 있다. 그럼에도 일부 보도는 이 결과를 ‘당직 확대의 근거’로만 인용해, 저자들이 밝힌 조건을 지면에서 지웠다.", "Qual é a crítica feita à imprensa?", ["Ela citou o resultado como base para ampliar o plantão e apagou as condições dos autores.", "Ela publicou o artigo sem revisão ortográfica.", "Ela entrevistou os autores antes de publicar."], "Ela citou o resultado como base para ampliar o plantão e apagou as condições dos autores.", "A crítica recai sobre a citação seletiva que elimina o limite declarado."),
    reading("회의는 후보지 한 곳을 즉시 채택하는 대신, 6개월 시범 운영을 조건으로 하는 안을 가결했다. 다만 임대료 상한선은 다음 회의에서 다시 논의하기로 하고 최종 결정은 보류했다.", "O que a ata registra como decidido e como pendente?", ["Decidiu-se o piloto de seis meses; o teto do aluguel ficou pendente.", "Decidiu-se o contrato principal; o piloto ficou pendente.", "Nada foi decidido; todos os itens foram suspensos."], "Decidiu-se o piloto de seis meses; o teto do aluguel ficou pendente.", "A decisão sobre o piloto é separada da suspensão do teto do aluguel."),
    reading("도서관은 앞의 두 조건은 받아들였지만, 세 번째 조건에는 유예 기간을 요구했다. 도서관 측은 “첫 6개월은 준비 기간이므로 같은 기준을 적용하지 않는다”는 단서를 붙일 것을 전제로 협상에 응했다.", "Sob que premissa a biblioteca aceitou negociar?", ["Que os primeiros seis meses não sejam avaliados pelo mesmo critério.", "Que a organização pague todo o aluguel.", "Que o projeto dure apenas seis meses."], "Que os primeiros seis meses não sejam avaliados pelo mesmo critério.", "A premissa é a ressalva sobre o período de preparação."),
    reading("본문의 요지는 세 가지입니다. 공간 사용 허가, 주말 운영 시간 연장, 그리고 안전 인력 배치입니다. 이 세 가지 조건이 충족되지 않는 한 행사 일정을 확정하기 어렵다는 점을 미리 말씀드립니다.", "O que a carta condiciona ao atendimento dos três pedidos?", ["A confirmação do calendário do evento.", "O pagamento antecipado do aluguel.", "A contratação de novos funcionários públicos."], "A confirmação do calendário do evento.", "O texto diz que, sem as três condições, é difícil confirmar o calendário."),
    reading("지면이 부족해 인터뷰 전문은 온라인에 실렸다. 편집국은 인쇄본에 핵심 인용만 남기고, 인터뷰의 맥락과 조건은 온라인판에 함께 공개했다.", "O que a decisão editorial preservou?", ["O contexto e as condições da entrevista na versão on-line.", "A íntegra da entrevista no jornal impresso.", "Apenas o título, sem nenhum conteúdo."], "O contexto e as condições da entrevista na versão on-line.", "A versão on-line manteve o contexto que o espaço impresso não comportava."),

    translate("pt-ko", "Traduza: “Pretendo apresentar a pergunta de pesquisa e o limite deste estudo.”", "저는 연구 질문과 이 연구의 한계를 발표하고자 합니다.", "-고자 합니다 declara a intenção em registro formal de apresentação.", ["연구 질문과 이 연구의 한계를 발표하고자 합니다."]),
    translate("ko-pt", "Traduza: 이 차이는 중증도 차이에서 비롯된 것으로 판단된다.", "Julga-se que essa diferença se origina da diferença de gravidade.", "-것으로 판단된다 apresenta um juízo impessoal baseado em evidência.", ["Considera-se que essa diferença decorre da diferença de gravidade."]),
    translate("pt-ko", "Traduza: “Enquanto não houver acordo sobre os indicadores, o contrato principal não terá efeito.”", "세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다.", "-지 않는 한 fixa o limite sem o qual o contrato não vale.", ["세부 지표에 합의하지 않는 한 본계약은 효력이 없다."]),
    translate("ko-pt", "Traduza: 참석자들은 이 문장이 나중에 책임 소재를 분명히 한다는 데 동의했다.", "Os participantes concordaram que essa frase esclareceria a responsabilidade mais tarde.", "책임 소재 = a quem cabe a responsabilidade.", ["Os presentes concordaram que a frase tornaria clara, mais tarde, a responsabilidade."]),
    translate("pt-ko", "Traduza: “Solicito cooperação para que a preparação do evento transcorra sem problemas.”", "행사 준비가 원활히 진행될 수 있도록 협조를 구합니다.", "-도록 협조를 구하다 formula um pedido institucional de cooperação.", ["행사 준비가 원활히 진행되도록 협조를 구합니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
