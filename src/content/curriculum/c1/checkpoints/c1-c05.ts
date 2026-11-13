import { cloze, defineC1Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero analítico pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança em partes com função própria, sem repetir a mesma ideia." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, inclusive parte dos itens estudados, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas de causa, avaliação, atribuição, contraste e precisão aparecem corretas." },
  { criterion: "argument" as const, labelPt: "Precisão da análise", descriptorPt: "Distingue causa, fator e condição; critério e veredito; fato e interpretação." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra o percurso e nomeia o que permanece em aberto." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · análise lexical de um trecho",
  promptPt: "Escolha um trecho curto de notícia, relatório ou comunicado. Analise como ele atribui causa, avalia e cita fontes; depois revise duas escolhas lexicais que exagerem a responsabilidade. Feche com uma avaliação calibrada do trecho.",
  promptKo: "짧은 글을 골라 원인과 평가, 인용의 표현을 분석하고 어휘 선택을 두 곳 고쳐 보세요.",
  guidance: [
    "Transcreva o trecho e identifique a fonte.",
    "Separe causa principal, fator contribuinte e condição, se houver.",
    "Diga se a avaliação nomeia o critério antes do veredito.",
    "Verifique os verbos de atribuição e marque o que é inferência.",
    "Use uma forma de contraste ou concessão para qualificar sua própria avaliação.",
    "Justifique duas trocas lexicais por implicação, colocação ou registro.",
  ],
  checklist: [
    "Trecho e fonte identificados.",
    "Causa e fator distinguidos.",
    "Critério de avaliação explicitado.",
    "Fato separado de interpretação.",
    "Duas trocas lexicais justificadas.",
    "Conclusão calibrada e não categórica.",
  ],
  minWords: 100,
  rubric: RUBRIC,
  sample: {
    ko: "분석할 글은 “시가 복지 예산을 삭감해 단체들이 강하게 비난했다”는 한 문장이다. 먼저 원인을 보면, 예산 변경은 확인되지만 ‘삭감’이 정책 실패에 기인한다고 단정할 근거는 없다. 실제 감소는 3퍼센트였고, 물가 상승을 고려하면 실질 감소 폭은 더 작다. 따라서 이 문장은 원인과 평가를 섞고 있다. 둘째, ‘비난했다’는 도덕적 책임을 묻는 표현인 반면, 원자료에는 근거 공개를 요구했다는 내용만 있다. 이 표현은 사실과는 거리가 멀다. ‘요구했다’로 바꾸면 행위는 유지되고 책임의 강도는 낮아진다. 셋째, ‘강하게’는 근거 없이 갈등을 키우는 부사이므로 삭제할 필요가 있다. 수정된 문장은 “시가 복지 예산을 3퍼센트 줄이자 단체들이 배분 근거 공개를 요구했다”이다. 이 문장은 사건을 약화시키지 않으면서 독자가 원인을 정확히 판단하도록 돕는다. 다만 예산 변경이 서비스 축소로 이어졌는지는 자료에 없으므로, 그 부분은 여전히 확인이 필요하다.",
    pt: "O texto a analisar é a frase “quando a cidade cortou o orçamento de assistência social, as entidades o condenaram duramente”. Primeiro, quanto à causa, a mudança orçamentária está confirmada, mas não há base para afirmar que o ‘corte’ decorre do fracasso da política. A redução real foi de 3% e, considerando a alta dos preços, a queda real é ainda menor. Portanto, a frase mistura causa e avaliação. Segundo, ‘condenaram’ é uma expressão que cobra responsabilidade moral, enquanto o material original contém apenas a exigência de divulgação dos critérios. Essa expressão está longe dos fatos. Trocando por ‘exigiram’, a ação se mantém e a intensidade da responsabilidade diminui. Terceiro, ‘duramente’ é um advérbio que aumenta o conflito sem evidência e precisa ser eliminado. A frase revisada é “quando a cidade reduziu o orçamento de assistência social em 3%, as entidades exigiram a divulgação dos critérios de distribuição”. Essa frase não enfraquece o incidente e ajuda o leitor a julgar a causa com precisão. No entanto, o material não diz se a mudança orçamentária levou à redução de serviços; essa parte ainda precisa de verificação.",
    notePt: "Exemplo original de oito frases. Observe a separação entre causa e avaliação, a crítica à atribuição e as duas trocas lexicais justificadas. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c1-c05 — avaliação do Módulo 5: causa, avaliação, atribuição, contraste e precisão lexical. */
export const C1_C05 = defineC1Checkpoint({
  id: "c1-c05", number: 5, moduleId: "c1-m05",
  title: "Checkpoint · Léxico avançado e colocação",
  objective: "Avaliar causa, avaliação, atribuição, contraste e precisão lexical do Módulo 5.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido, o registro e a implicação do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c1-l21", "c1-l22", "c1-l23", "c1-l24", "c1-l25"],
  prerequisites: ["c1-l21", "c1-l22", "c1-l23", "c1-l24", "c1-l25", "c1-c01", "c1-c02", "c1-c03", "c1-c04"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual formulação distingue corretamente causa principal e fator contribuinte?", ["A falha decorreu do erro de configuração; o volume de acessos contribuiu para ampliar o dano.", "A falha decorreu do volume de acessos; o erro de configuração foi apenas uma coincidência.", "O erro de configuração e o volume de acessos são a mesma causa."], "A falha decorreu do erro de configuração; o volume de acessos contribuiu para ampliar o dano.", "A causa principal é o elemento sem o qual o resultado não ocorreria; o fator contribuinte altera a extensão do dano."),
    mcq("Uma avaliação calibrada começa por...", ["nomear o critério antes de emitir o veredito.", "escolher um meio-termo sem justificar o peso de cada dimensão.", "evitar qualquer ressalva para não enfraquecer o elogio."], "nomear o critério antes de emitir o veredito.", "Sem critério explícito, o veredito revela preferência, não avaliação fundamentada."),
    mcq("Qual verbo preserva o ato de fala de uma fonte que apresentou uma proposta?", ["제안했다", "비난했다", "단정했다"], "제안했다", "제안하다 descreve uma proposta; os outros verbos mudam o ato e a responsabilidade atribuída."),

    cloze("Complete a origem: 이번 혼란은 배포 절차의 미비에 ___.", "기인한다", "-에 기인하다 atribui a origem de um fenômeno em registro analítico."),
    cloze("Complete a contribuição: 접속량 증가는 피해 확대에 ___.", "기여했다", "-는 데 기여하다 / 에 기여하다 indica participação, não causa exclusiva."),
    cloze("Complete a avaliação externa: 이 정책은 비용 대비 효과가 큰 것으로 ___.", "평가된다", "A passiva -ㄴ/는 것으로 평가된다 atribui a avaliação sem nomear o avaliador."),
    cloze("Complete o teor do comunicado: 자료의 ___는 자격 기준을 다시 검토하겠다는 것이다.", "취지", "-ㄴ/는 취지다 explicita a intenção global do enunciado."),
    cloze("Complete a recomendação editorial: 제목을 다시 쓸 ___ 있다.", "필요가", "A forma é -ㄹ 필요가 있다, recomendação impessoal e calibrada."),

    listen("Ouça e escreva a causa principal da falha.", "장애는 설정 오류에 기인하고, 접속량 증가는 피해 확대에 기여했다.", "장애는 설정 오류에 기인하고, 접속량 증가는 피해 확대에 기여했다.", "A falha decorreu do erro de configuração, e o aumento dos acessos contribuiu para ampliar o dano."),
    listen("Ouça e escreva a conclusão condicional sobre a política.", "외곽 노선을 포함해 6개월 더 운영할 만하지만, 비용 조정이 필요하다.", "외곽 노선을 포함해 6개월 더 운영할 만하지만, 비용 조정이 필요하다.", "Vale a pena operar mais seis meses, incluindo as linhas periféricas, mas é preciso ajustar o custo."),
    listen("Ouça e escreva a diferença entre moderado e vago.", "온건한 것과 모호한 것은 다르며, 기준을 밝히면 판단은 더 선명해진다.", "온건한 것과 모호한 것은 다르며, 기준을 밝히면 판단은 더 선명해진다.", "Moderado e vago são diferentes; explicitar o critério torna o julgamento mais nítido."),
    listen("Ouça e escreva o limite da paráfrase jornalística.", "자료는 기준 조정을 언급했을 뿐, 대상 축소를 단정하지 않았다.", "자료는 기준 조정을 언급했을 뿐, 대상 축소를 단정하지 않았다.", "O material apenas mencionou o ajuste do critério; não afirmou categoricamente a redução de beneficiários."),
    listen("Ouça e escreva a concessão que mantém a prioridade.", "비용이 든다 할지라도 야간 노동자의 이동권을 먼저 봐야 한다.", "비용이 든다 할지라도 야간 노동자의 이동권을 먼저 봐야 한다.", "Mesmo que custe, é preciso priorizar o direito de circulação dos trabalhadores noturnos."),
    listen("Ouça e escreva o efeito de uma colocação inadequada.", "어색한 표현은 이해를 막지는 않지만, 글의 신뢰를 떨어뜨린다.", "어색한 표현은 이해를 막지는 않지만, 글의 신뢰를 떨어뜨린다.", "Uma expressão estranha não impede a compreensão, mas reduz a confiança no texto."),

    reading("운영팀은 설정 오류를 주된 원인으로 판단했다. 오류가 없었다면 접속량이 늘어도 시스템은 정상적으로 작동했을 것이기 때문이다. 반면 접속량 증가는 단독으로 장애를 일으킬 만한 요인이 아니었다.", "Qual critério sustenta a conclusão sobre a causa principal?", ["A hipótese contrafactual: sem o erro, o resultado não teria ocorrido.", "O número de usuários afetados.", "A opinião dos funcionários do plantão."], "A hipótese contrafactual: sem o erro, o resultado não teria ocorrido.", "O texto mostra que, sem o erro, o sistema teria funcionado apesar do volume de acessos."),
    reading("접근성 개선은 분명한 성과로 평가된다. 다만 이 수치는 설문 응답자 240명을 기준으로 한 것이며, 무응답자의 상황은 알 수 없다. 비용 측면에서는 적정 수준을 넘었다고 보기 어렵다.", "Como a avaliação combina mérito e limite?", ["Reconhece o ganho de acessibilidade e restringe o alcance do dado.", "Nega o ganho porque o custo aumentou.", "Afirma que o resultado vale para toda a cidade."], "Reconhece o ganho de acessibilidade e restringe o alcance do dado.", "A avaliação separa dimensões e limita o alcance da amostra."),
    reading("한 매체는 이 자료를 “청년 주거 지원 대폭 확대”라는 제목으로 보도했다. 기사 본문에는 지원금 인상이 정확히 전달되었지만, 소득 기준 조정은 “지원 대상 확대”로 바뀌었다. 그러나 기준이 높아지면 대상은 오히려 줄어들 수 있다.", "Onde está a distorção da matéria?", ["Em transformar ajuste do critério de renda em ampliação de beneficiários.", "Em informar o aumento do auxílio.", "Em citar o orçamento do programa."], "Em transformar ajuste do critério de renda em ampliação de beneficiários.", "O ajuste do critério não autoriza concluir ampliação; pode ocorrer o contrário."),
    reading("증차는 접근성을 넓히는 반면, 요금 인하는 기존 이용자의 부담을 줄인다. 증차 비용은 요금 인하의 세 배에 이른다. 비용이 크다는 사실만 보면 증차가 열세로 보이지만, 편익을 집단별로 나누면 판단이 달라진다.", "O que o contraste mostra sobre as duas medidas?", ["Elas produzem efeitos diferentes para públicos diferentes e com custos diferentes.", "As duas produzem exatamente o mesmo efeito.", "A redução tarifária não tem custo algum."], "Elas produzem efeitos diferentes para públicos diferentes e com custos diferentes.", "O contraste opõe acesso e alívio tarifário, com custos assimétricos."),
    reading("이 글은 증차를 우선하자는 쪽에 선다. 그 선택에는 분명한 반대급부가 있다. 요금 인하를 미루면 저소득층의 월 부담이 계속되고, 이는 증차의 편익만큼이나 실제적인 손실이다.", "Como o texto qualifica a própria escolha?", ["Admite uma contrapartida real antes de manter a prioridade.", "Nega que a redução tarifária beneficie alguém.", "Abandona a defesa do aumento da frota."], "Admite uma contrapartida real antes de manter a prioridade.", "A concessão reconhece a perda sem anular a tese."),
    reading("‘비난’은 도덕적 잘못을 전제하는 어감을 지닌다. 원자료에는 단체가 예산 배분의 근거를 공개하라고 요구했다는 내용만 있었다. ‘삭감’ 역시 실제 변화가 3퍼센트 감소였음을 고려하면 과도하게 강한 표현이었다.", "Por que as duas palavras foram consideradas inadequadas?", ["Porque acrescentavam acusação e intensidade que o material não sustentava.", "Porque eram informais demais para um texto jornalístico.", "Porque repetiam uma palavra já usada no título."], "Porque acrescentavam acusação e intensidade que o material não sustentava.", "As trocas ajustam implicação e intensidade ao que o material registrava."),

    translate("pt-ko", "Traduza: “A falha decorreu de um erro de configuração, e o volume de acessos contribuiu para ampliar o dano.”", "장애는 설정 오류에 기인했고, 접속량 증가는 피해 확대에 기여했다.", "É preciso manter a diferença entre -에 기인하다 e -는 데 기여하다.", ["장애는 설정 오류에 기인했으며, 접속량 증가는 피해 확대에 기여했습니다."]),
    translate("ko-pt", "Traduza: 이 정책은 비용 대비 효과가 큰 것으로 평가되지만, 데이터의 대표성에는 한계가 있다.", "Esta política é avaliada como tendo grande efeito em relação ao custo, mas a representatividade dos dados tem limites.", "A avaliação é atribuída de forma passiva; a segunda oração limita seu alcance.", ["A política é considerada muito eficaz em relação ao custo, embora os dados tenham representatividade limitada."]),
    translate("pt-ko", "Traduza: “O responsável mencionou que o critério seria ajustado, mas não afirmou que os beneficiários aumentariam.”", "담당자는 기준을 조정할 것이라고 언급했지만, 대상이 늘어난다고 단정하지는 않았다.", "Mantenha 언급하다 separado de 단정하다 para preservar o ato de fala.", ["담당자는 기준을 조정할 계획이라고 언급했으나, 대상이 늘어난다고 단정하지 않았습니다."]),
    translate("ko-pt", "Traduza: 비용이 든다 할지라도 야간 노동자의 이동권을 먼저 봐야 한다.", "Mesmo que custe, é preciso priorizar o direito de circulação dos trabalhadores noturnos.", "-ㄹ지라도 introduz a concessão forte que preserva a tese.", ["Ainda que haja custo, devemos colocar em primeiro lugar o direito de locomoção dos trabalhadores noturnos."]),
    translate("pt-ko", "Traduza: “É preciso distinguir a implicação das duas palavras, porque a troca muda a responsabilidade da frase.”", "두 단어의 함의를 구분할 필요가 있다. 표현을 바꾸면 문장의 책임이 달라지기 때문이다.", "Use -ㄹ 필요가 있다 e preserve a relação causal com 때문이다.", ["두 단어의 함의를 구별할 필요가 있습니다. 어휘를 바꾸면 문장의 책임이 달라지기 때문입니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
