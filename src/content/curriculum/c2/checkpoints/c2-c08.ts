import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto integra análise, argumento, leitura ou mediação e cumpre o gênero pedido, sem se limitar a resumir o curso." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A pergunta de percurso organiza as partes; cada seção tem função própria e o fecho retoma o que ficou aberto." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso de pesquisa, argumentação, edição e mediação, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo do módulo aparecem corretas e o registro se ajusta ao gênero e ao destinatário de cada seção." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A posição é sustentada por evidência delimitada, responde a uma objeção real e declara o limite do que foi demonstrado." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula o conteúdo para outro leitor sem apagar a incerteza, sem distorcer a posição contrária e sem transferir responsabilidade." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção final · amostra cumulativa do C2",
  promptPt: "Escreva um texto de portfólio que una uma análise de fonte, um argumento próprio, uma leitura literária ou cultural e uma reformulação para um leitor não especialista. O fio condutor deve ser uma pergunta de percurso formulada por você. Feche com uma autoavaliação que use uma evidência textual e nomeie uma pergunta ainda aberta.",
  promptKo: "자료 분석, 자기 논증, 문학적 읽기, 독자를 위한 재구성을 하나의 질문으로 묶고, 근거 있는 자기평가와 다음 질문을 덧붙여 보세요.",
  guidance: [
    "Enuncie a pergunta de percurso na abertura e retome-a no fecho.",
    "Mostre o que cada gênero permite ver e o que ele deixa de fora.",
    "Sustente o argumento com um dado ou exemplo delimitado, não com uma estatística sem fonte.",
    "Reformule um trecho para um leitor não especialista, preservando a incerteza.",
    "Use ao menos duas formas do módulo: -ㄴ/는 설정이다, -ㄹ 근거를 마련하다, -ㄴ/는 논지다, -ㄴ/는 요지다, -기에 앞서 ou -는 데 그치지 않고.",
    "Na autoavaliação, compare um antes e um depois e nomeie o que ainda não foi resolvido.",
  ],
  checklist: [
    "Pergunta de percurso explícita e retomada.",
    "Análise de fonte com limite declarado.",
    "Argumento com evidência delimitada e objeção respondida.",
    "Leitura literária ou cultural integrada ao fio condutor.",
    "Reformulação para leitor não especialista sem apagar a incerteza.",
    "Autoavaliação com evidência textual e próximo passo.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "이 포트폴리오의 질문은 '야간 이동권은 누구의 시간으로 측정되는가'이다. 첫째, 시의 자료를 분석했다. 지난해 야간 버스 이용자는 12퍼센트 줄었지만, 병원과 공장이 몰린 두 구에서는 늘었다. 문제는 자료가 이용자의 이유를 묻지 않는다는 점이다. 나는 같은 기간의 민원 기록을 함께 읽었고, 거기에는 막차를 놓치면 택시비가 두 배가 된다는 문장이 반복되었다. 수치와 목소리가 어긋날 때, 분석은 하나를 고르는 일이 아니라 간격을 설명하는 일이 된다. 둘째, 노선을 유지하자는 논증을 썼다. 논지는 비용이 아니라 접근권에 있다. 이용자가 줄었는데 유지하는 것은 낭비라는 반론에는, 이용률이 낮은 노선과 특정 시간대의 집중도를 구분하자고 답했다. 셋째, 정류장을 배경으로 한 시를 읽었다. 막차는 시간표가 아니라 관계의 상징으로 나타난다. 문학은 정책의 근거가 되지 않지만, 숫자로 환산되지 않는 경험을 보여 준다. 넷째, 이 내용을 주민 설명회용으로 다시 썼다. 전문 용어를 줄이면서도 자료의 한계를 먼저 밝혔다. 이 작업은 글을 고치는 데 그치지 않고, 어디까지 주장할 수 있는지 밝히는 일이었다. 자기평가를 하기에 앞서 첫 글과 마지막 글을 비교했다. 처음에는 결론을 빨리 내려고 했지만, 지금은 조건을 먼저 쓰는 편이 더 정확하다고 본다. 아직 열린 질문은 이동권을 개인의 선택으로 볼 때와 권리로 볼 때 어떤 정책이 달라지는가이다.",
    pt: "A pergunta deste portfólio é 'o direito de circulação noturna é medido pelo tempo de quem?'. Primeiro, analisei dados da cidade. No ano passado, os usuários de ônibus noturno caíram 12%, mas nos dois distritos onde se concentram hospitais e fábricas aumentaram. O problema é que os dados não perguntam o motivo dos usuários. Li junto os registros de reclamações do mesmo período, e ali se repetia a frase de que, ao perder o último ônibus, o táxi custa o dobro. Quando números e vozes divergem, a análise não é escolher um dos dois, mas explicar a distância. Segundo, escrevi um argumento pela manutenção das linhas. A tese está no direito de acesso, não no custo. À objeção de que manter linhas com menos usuários é desperdício, respondi propondo distinguir linhas de baixa utilização da concentração em determinados horários. Terceiro, li um poema ambientado em um ponto de ônibus. O último ônibus aparece não como horário, mas como símbolo de uma relação. A literatura não serve como prova de política, mas mostra uma experiência que não se converte em número. Quarto, reescrevi esse conteúdo para uma assembleia de moradores. Reduzi o jargão e, ainda assim, declarei primeiro os limites dos dados. Esse trabalho não se limitou a corrigir o texto: foi também declarar até onde posso argumentar. Antes de fazer a autoavaliação, comparei o primeiro e o último texto. No início, queria concluir rápido; hoje considero mais preciso escrever primeiro as condições. A pergunta ainda aberta é que políticas mudam quando o direito de circulação é visto como escolha individual ou como direito.",
    notePt: "Exemplo original. A amostra integra análise, argumento, leitura literária, mediação e autoavaliação, retoma a pergunta de percurso e declara uma pendência. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c08 — amostra cumulativa final do C2, com foco no projeto e na autonomia. */
export const C2_C08 = defineC2Checkpoint({
  id: "c2-c08", number: 8, moduleId: "c2-m08",
  title: "Desempenho C2 interno",
  objective: "Avaliar uma amostra cumulativa do C2 em leitura longa, escuta, gramática e produção controlada.",
  instructions: [
    "Responda aos 40 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido e o registro do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
    "Este é o passo final do C2: a amostra retoma os oito módulos, com foco no projeto, na edição e no portfólio.",
  ],
  lessonIds: ["c2-l36", "c2-l37", "c2-l38", "c2-l39", "c2-l40"],
  prerequisites: ["c2-l36", "c2-l37", "c2-l38", "c2-l39", "c2-l40", "c2-c01", "c2-c02", "c2-c03", "c2-c04", "c2-c05", "c2-c06", "c2-c07"],
  estimatedMinutes: 100,
  exercises: [
    // ── escuta (10) ────────────────────────────────────────────────────────
    listen("Ouça e escreva a pergunta de pesquisa delimitada.", "월세 부담이 이사 시점과 목적지 선택을 어떻게 바꾸는가가 이 연구의 질문이다.", "월세 부담이 이사 시점과 목적지 선택을 어떻게 바꾸는가가 이 연구의 질문이다.", "A pergunta delimita o objeto e o tipo de decisão observável."),
    listen("Ouça e escreva o que o método deve respeitar.", "방법은 질문에 맞추는 것이지, 질문을 방법에 맞추는 것이 아니다.", "방법은 질문에 맞추는 것이지, 질문을 방법에 맞추는 것이 아니다.", "O método se ajusta à pergunta, e não o contrário."),
    listen("Ouça e escreva a tese do artigo de opinião.", "지원금을 늘리는 일보다 신청 절차를 절반으로 줄이는 일이 먼저다.", "지원금을 늘리는 일보다 신청 절차를 절반으로 줄이는 일이 먼저다.", "A tese estabelece uma ordem de prioridade entre subsídio e procedimento."),
    listen("Ouça e escreva como o artigo trata a objeção sobre fraude.", "부정의 위험은 사후 점검과 무작위 표본으로 다룰 수 있다.", "부정의 위험은 사후 점검과 무작위 표본으로 다룰 수 있다.", "A objeção recebe um mecanismo concreto de verificação posterior."),
    listen("Ouça e escreva a concessão feita na defesa.", "질문이 결론을 전제했다는 비판은 타당합니다.", "질문이 결론을 전제했다는 비판은 타당합니다.", "O pesquisador reconhece a validade da crítica antes de explicar o procedimento."),
    listen("Ouça e escreva o limite que a defesa admite.", "표본이 작고 인터뷰가 사후 진술에 의존한다는 한계가 있습니다.", "표본이 작고 인터뷰가 사후 진술에 의존한다는 한계가 있습니다.", "O limite é nomeado sem abandonar a contribuição do estudo."),
    listen("Ouça e escreva o que a revisão deve preservar.", "문체를 다듬다가 논지를 바꾸면 그것은 편집이 아니라 다른 글쓰기다.", "문체를 다듬다가 논지를 바꾸면 그것은 편집이 아니라 다른 글쓰기다.", "A revisão de estilo não pode alterar a tese."),
    listen("Ouça e escreva a primeira camada que a editora examina.", "편집의 첫 단계는 문장을 고치는 일이 아니라, 이 글의 관점을 확인하는 일이다.", "편집의 첫 단계는 문장을 고치는 일이 아니라, 이 글의 관점을 확인하는 일이다.", "A edição começa pela tese e pelo ponto de vista, não pela frase."),
    listen("Ouça e escreva o que o portfólio deve mostrar.", "포트폴리오는 글을 모은 것이 아니라, 글 사이의 관계를 보여 주는 것이다.", "포트폴리오는 글을 모은 것이 아니라, 글 사이의 관계를 보여 주는 것이다.", "Integrar é mostrar a relação entre os textos, não apenas reuni-los."),
    listen("Ouça e escreva o critério da autoavaliação final.", "좋은 자기평가는 점수가 아니라 근거와 다음 질문을 남긴다.", "좋은 자기평가는 점수가 아니라 근거와 다음 질문을 남긴다.", "A autoavaliação deixa evidência e uma pergunta seguinte, não uma nota."),

    // ── leitura (10) ───────────────────────────────────────────────────────
    reading("이 글은 서울 외곽 1인 가구의 월세 부담이 이사 결정에 어떻게 작용하는지를 묻는다. 기존 논의는 주거비를 소득 대비 비율로만 다루어 왔다. 그러나 같은 비율이라도 통근 시간, 보증금 마련 방식, 이웃과의 관계에 따라 체감은 달라진다.", "Por que o projeto não se contenta com a proporção da renda?", ["Porque a mesma proporção pode ser vivida de modos diferentes conforme deslocamento, caução e relações.", "Porque a proporção da renda é sempre falsa.", "Porque o projeto não mede renda."], "Porque a mesma proporção pode ser vivida de modos diferentes conforme deslocamento, caução e relações.", "A pergunta se abre para a experiência e para condições que a taxa isolada não capta."),
    reading("이 설계는 '체감 부담'이라는 주관적 진술과 '이동 시간'이라는 관찰 가능한 자료를 함께 놓는 설정이다. 두 자료가 어긋나는 지점도 분석 대상으로 남긴다.", "O que o desenho faz com a divergência entre relato e registro?", ["Trata a divergência como material de análise, não como erro a apagar.", "Descarta o relato quando ele diverge do registro.", "Soma os dois para obter uma média."], "Trata a divergência como material de análise, não como erro a apagar.", "A diferença entre o que se sente e o que se registra também explica a decisão."),
    reading("첫째, 절차를 줄이면 실제 수혜율이 오른다. 어떤 지자체가 신청 서류를 세 장으로 줄였더니 신청자 수가 40퍼센트 늘었고, 승인율은 거의 변하지 않았다. 둘째, 심사 인력의 부담도 줄어든다. 서류를 읽는 시간보다 같은 서류를 다시 확인하는 시간이 더 길기 때문이다.", "Qual é a função dos dois argumentos no artigo?", ["Mostrar que reduzir o procedimento aumenta o alcance e diminui o retrabalho.", "Provar que o subsídio é inútil.", "Defender o aumento do número de documentos."], "Mostrar que reduzir o procedimento aumenta o alcance e diminui o retrabalho.", "Os argumentos são consequências verificáveis da mesma medida."),
    reading("여기서 내가 틀릴 수 있는 경우는 두 가지다. 첫째, 신청 절차가 실제로 부정을 걸러 내는 핵심 장치라면 줄이기는 위험하다. 둘째, 지자체의 전산 시스템이 약해 서류를 줄여도 처리 시간이 줄지 않을 수 있다.", "O que o autor faz ao nomear dois casos de erro?", ["Delimita a própria tese e mostra em que condições ela falharia.", "Abandona a tese e passa a defender o oposto.", "Promete que não há risco algum na proposta."], "Delimita a própria tese e mostra em que condições ela falharia.", "Admitir condições de erro torna a proposta avaliável, em vez de a enfraquecer."),
    reading("저는 처음에 '부담이 이사를 늦춘다'는 가설을 세웠고, 그것이 확인되지 않는 사례를 따로 모았습니다. 부담이 커졌는데도 같은 집에 남은 사람이 표본의 4분의 1이었습니다. 이 사례들은 가설을 약화시키지만, 동시에 왜 어떤 사람은 움직이지 못하는지를 보여 줍니다.", "Por que os casos contrários não são eliminados da defesa?", ["Porque explicam a imobilidade de parte dos participantes e tornam o limite visível.", "Porque aumentam artificialmente o tamanho da amostra.", "Porque confirmam integralmente a hipótese inicial."], "Porque explicam a imobilidade de parte dos participantes e tornam o limite visível.", "Os casos que enfraquecem a hipótese mudam o tipo de explicação oferecida."),
    reading("지원 기준을 소득만으로 정하면, 이동 비용 때문에 이사를 포기한 사람을 놓칩니다. 다만 이 연구가 답할 수 있는 것은 세 구의 사례에 한정됩니다. 표본이 작고, 인터뷰가 사후 진술에 의존한다는 한계가 있습니다.", "Como a resposta combina implicação e limite?", ["Aponta um ponto cego da política e, em seguida, restringe o alcance do estudo.", "Generaliza o resultado para todo o país.", "Recusa qualquer implicação prática."], "Aponta um ponto cego da política e, em seguida, restringe o alcance do estudo.", "A implicação é uma hipótese sobre um ponto cego, não uma prova universal."),
    reading("둘째 층은 구조다. 3절과 5절이 같은 사례를 두 번 설명하고, 4절은 2절의 내용을 거의 반복한다. 5절을 3절 뒤로 옮기고 4절을 삭제하면 논리가 앞으로 나아간다.", "Por que essa intervenção pertence à camada da estrutura?", ["Porque altera a ordem e a função das seções, não apenas a forma das frases.", "Porque corrige apenas a pontuação.", "Porque muda a tese do texto."], "Porque altera a ordem e a função das seções, não apenas a forma das frases.", "Mover e apagar seções reorganiza o percurso argumentativo."),
    reading("다만 문체를 다듬다가 논지를 바꾸면 안 된다. '속도를 늦추자'는 주장이 '노선을 늘리자'로 바뀌면 그것은 편집이 아니라 다른 글쓰기다. 그래서 나는 수정 전후의 문장을 나란히 놓고, 바뀐 것이 표현인지 주장인지 표시하도록 다듬었다.", "Qual é o limite entre edição e outro texto?", ["Quando a mudança atinge a tese, deixa de ser edição e exige outro acordo de autoria.", "Quando o texto fica mais curto do que o original.", "Quando o editor corrige a pontuação."], "Quando a mudança atinge a tese, deixa de ser edição e exige outro acordo de autoria.", "A tese é o limite que a revisão de estilo não pode ultrapassar."),
    reading("수치와 목소리가 서로 다른 것을 말할 때, 분석은 둘 중 하나를 고르는 일이 아니라 둘 사이의 간격을 설명하는 일이 된다. 그래서 나는 두 자료를 같은 표에 놓고, 어긋나는 지점을 따로 표시했다.", "O que a análise faz com a distância entre números e vozes?", ["Explica a distância, em vez de escolher um dos dois lados.", "Descarta os números para aceitar apenas as vozes.", "Transforma as vozes em uma média estatística."], "Explica a distância, em vez de escolher um dos dois lados.", "A divergência é o objeto que a análise precisa explicar, e o procedimento mostra onde os dois materiais se separam."),
    reading("이 과정은 글을 고치는 데 그치지 않고, 어디까지 주장할 수 있는지 밝히는 일이었다. 포트폴리오를 마무리하기에 앞서 나는 세 글을 다시 읽었다. 기록은 남았지만, 다음에 쓸 글에서 다룰 질문도 남았다.", "Como o fecho do portfólio avalia o percurso?", ["Reconhece o que ficou registrado e nomeia a pergunta que continua aberta.", "Declara que não há mais nada a aprender.", "Repete a introdução sem avaliar o trabalho."], "Reconhece o que ficou registrado e nomeia a pergunta que continua aberta.", "O fecho articula conquista e continuidade, sem inventar um ponto final absoluto."),

    // ── cloze (8) ──────────────────────────────────────────────────────────
    cloze("Complete o desenho metodológico: 두 자료를 함께 놓는 ___.", "설정이다", "-ㄴ/는 설정이다 descreve o arranjo planejado, não um fato observado."),
    cloze("Complete a finalidade do projeto: 후속 연구가 검증할 ___를 마련하는 데 목적을 둔다.", "근거", "-ㄹ 근거를 마련하다 nomeia a base que outro estudo poderá verificar."),
    cloze("Complete a formulação da tese: 이 글의 ___는 분명하다.", "논지", "-ㄴ/는 논지다 nomeia a posição central que o texto sustenta."),
    cloze("Complete o resumo da pesquisa: 이 연구의 ___는 소득만으로 결정을 설명할 수 없다는 것이다.", "요지", "-ㄴ/는 요지다 resume o núcleo de uma pesquisa ou fala."),
    cloze("Complete o modo da resposta: 정책이 어떤 조건에서 실패하는지 설명하도록 ___ 것은 인상적이었다.", "답변한", "-도록 답변하다 indica a finalidade que a resposta deve cumprir."),
    cloze("Complete o comentário metalinguístico: 이 문장은 평가가 아니라 관찰을 남기려는 ___.", "표현", "-ㄴ/는 표현이다 comenta o modo de dizer, separando-o do conteúdo."),
    cloze("Complete a função da reescrita: 이 과정은 글을 고치는 데 ___ 않고, 주장의 범위를 밝히는 일이었다.", "그치지", "-는 데 그치지 않고 indica que o trabalho vai além da primeira função."),
    cloze("Complete a etapa prévia: 포트폴리오를 마무리하기에 ___ 나는 세 글을 다시 읽었다.", "앞서", "-기에 앞서 marca a etapa que deve vir antes da conclusão."),

    // ── tradução (8) ───────────────────────────────────────────────────────
    translate("pt-ko", "Traduza: “O método deve se ajustar à pergunta, não a pergunta ao método.”", "방법은 질문에 맞추는 것이지, 질문을 방법에 맞추는 것이 아니다.", "A construção contrastiva -는 것이지 ... 것이 아니다 separa a ordem correta da invertida.", ["방법은 질문에 맞추는 것이지 질문을 방법에 맞추는 것이 아니다."]),
    translate("ko-pt", "Traduza: 질문을 이렇게 좁히는 것은 대상을 줄이기 위해서가 아니라, 관찰 가능한 결정에 답하기 위해서다.", "Delimitar a pergunta assim não é para reduzir o objeto, mas para responder a decisões observáveis.", "대상을 줄이다 = reduzir o objeto; 관찰 가능한 결정 = decisão observável.", ["Restringir a pergunta desse modo não serve para diminuir o objeto, e sim para responder a decisões que se podem observar."]),
    translate("pt-ko", "Traduza: “O leitor confia mais em condições do que em afirmações categóricas.”", "독자는 단언보다 조건을 더 신뢰합니다.", "조건 = condição; 단언 = afirmação categórica.", ["독자는 단언보다 조건을 더 믿습니다."]),
    translate("ko-pt", "Traduza: 이 글은 예산을 늘리자는 요구를 부정하고자 한다.", "Este texto pretende contestar a exigência de aumentar o orçamento.", "부정하다 = contestar; 요구 = exigência.", ["Este artigo tem a intenção de recusar a exigência de aumentar o orçamento."]),
    translate("pt-ko", "Traduza: “Reconhecer um limite não é o mesmo que abandonar a conclusão.”", "한계를 인정하는 답변과 결론을 포기하는 답변은 다르다.", "A comparação -과 ...은 다르다 separa duas atitudes que costumam ser confundidas.", ["한계를 인정하는 것과 결론을 포기하는 것은 다르다."]),
    translate("ko-pt", "Traduza: 실패한 사례를 지우지 않은 것이 이 연구의 가장 중요한 절차였습니다.", "Não apagar os casos que falharam foi o procedimento mais importante desta pesquisa.", "지우다 = apagar; 절차 = procedimento.", ["O procedimento mais importante desta pesquisa foi não eliminar os casos que fracassaram."]),
    translate("pt-ko", "Traduza: “Lapidar o estilo não pode mudar a tese.”", "문체를 다듬다가 논지를 바꾸면 안 된다.", "A construção -다가 ...면 안 된다 expressa o limite que a revisão não deve ultrapassar.", ["문체를 다듬으면서 논지를 바꾸면 안 된다."]),
    translate("ko-pt", "Traduza: 편집의 첫 단계는 문장을 고치는 일이 아니라, 이 글의 관점이 무엇인지 확인하는 일이다.", "A primeira etapa da edição não é corrigir frases, mas confirmar qual é o ponto de vista do texto.", "관점 = ponto de vista; 확인하다 = confirmar.", ["O primeiro passo da edição não é consertar frases, e sim verificar com o autor qual é a perspectiva do texto."]),

    // ── múltipla escolha (4) ───────────────────────────────────────────────
    mcq("Qual pergunta de pesquisa é viável e delimitada?", ["Como a redução das linhas noturnas altera o tempo de deslocamento de profissionais de hospital em dois distritos de Seul entre 2025 e 2026?", "Por que o mundo está cada vez pior e ninguém faz nada para melhorar a situação?", "Qual é a melhor cidade para se viver, considerando clima, custo de vida e transporte público?", "O que é mobilidade urbana e por que ela importa para o planejamento das cidades?"], "Como a redução das linhas noturnas altera o tempo de deslocamento de profissionais de hospital em dois distritos de Seul entre 2025 e 2026?", "A pergunta define objeto, população, período e tipo de mudança observável."),
    mcq("Qual evidência sustenta melhor uma tese de artigo de opinião?", ["Um dado local delimitado, com período, fonte e limite declarados.", "Uma estatística sem fonte que confirma o que o autor já pensava.", "Uma frase de efeito repetida por muitas pessoas.", "Uma experiência pessoal apresentada como prova universal."], "Um dado local delimitado, com período, fonte e limite declarados.", "A evidência de opinião precisa ser verificável e delimitada, não apenas persuasiva."),
    mcq("O que distingue uma boa resposta de defesa oral?", ["Nomeia o que a pergunta testa, separa o que o dado mostra e admite um limite sem abandonar a posição.", "Responde ao número perguntado e muda de assunto.", "Concorda com toda crítica para encerrar o debate.", "Repete a conclusão em voz mais alta."], "Nomeia o que a pergunta testa, separa o que o dado mostra e admite um limite sem abandonar a posição.", "A defesa forte articula concessão e contribuição, sem confundir as duas."),
    mcq("Qual decisão pertence à camada da estrutura na revisão editorial?", ["Mover uma seção que repete outra e apagar a repetição.", "Corrigir uma vírgula repetida.", "Trocar um conectivo por outro de mesmo sentido.", "Padronizar o registro de uma citação."], "Mover uma seção que repete outra e apagar a repetição.", "A estrutura trata da ordem e da função das partes; as outras opções são de linha ou estilo."),
  ],
  production: PRODUCTION,
  minCorrect: 32,
});
