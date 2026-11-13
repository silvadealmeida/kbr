import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume a tarefa de analisar escolhas lexicais e reformular um trecho, não apenas de opinar." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança do uso para o efeito e do efeito para a reformulação, sem repetir a mesma constatação." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico do módulo com colocações naturais e distingue termos próximos pela implicação, não pela tradução." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se ajusta ao gênero e ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "A escolha lexical é justificada pelo efeito que produz e pelo alcance da afirmação que permite." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a expressão para outro leitor sem apagar a avaliação, a modalidade ou a responsabilidade do original." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · precisão lexical e responsabilidade",
  promptPt: "Escolha um trecho curto com pelo menos três expressões avaliativas ou normativas: uma resenha, um relatório ou uma cláusula. Em um texto único, explique o efeito de duas escolhas lexicais, reescreva o trecho com mais precisão e diga que risco ou ambiguidade a sua versão ainda deixa em aberto.",
  promptKo: "평가적이거나 규범적인 표현이 세 개 이상 들어간 짧은 글을 골라, 어휘 선택의 효과를 분석하고 더 정확한 버전으로 다시 써 보세요.",
  guidance: [
    "Comece citando o trecho e identificando o gênero e o destinatário.",
    "Separe o que é avaliação (검소하다/치사하다) do que é modalidade (할 수 있다/하여야 한다).",
    "Explique o efeito de pelo menos uma colocação abstrata.",
    "Reescreva nomeando agente, critério ou procedimento quando o original os apaga.",
    "Termine reconhecendo o que a sua reescrita ainda não resolve.",
  ],
  checklist: [
    "Trecho original e gênero identificados.",
    "Duas escolhas lexicais analisadas pelo efeito.",
    "Uma colocação abstrata ou termo sino-coreano explicado.",
    "Reescrita com agente, critério ou modalidade explícita.",
    "Registro adequado ao destinatário.",
    "Risco residual da própria versão reconhecido.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "이용 약관의 한 조항은 '회사는 필요한 경우 서비스를 변경할 수 있다'고만 정한다. 이 문장은 허용을 말하지만, 변경의 기준과 절차를 말하지 않는다. '필요한 경우'라는 표현은 판단의 주체를 회사로 한정할 뿐, 객관적 기준을 제시하지 않으므로 회사의 재량을 넓게 인정한 것으로 해석될 소지가 있다. 또한 '변경할 수 있다'는 표현은 회사가 이용자에게 통지할 의무를 부과하지 않는다. 나는 이를 '회사는 서비스의 중대한 장애나 법령 개정이 있는 경우에만 서비스를 변경할 수 있으며, 변경 사유와 시행일을 30일 전까지 서면으로 통지하여야 한다'로 고친다. 이렇게 쓰면 권한은 유지되지만, 사유와 절차가 명확해진다. 다만 '중대한 장애'의 구체적 기준은 여전히 해석의 여지를 남긴다. 그 부분은 시행령이나 별도 기준에서 보완해야 한다.",
    pt: "Uma cláusula dos termos de uso determina apenas que 'a empresa pode alterar o serviço quando necessário'. A frase fala de permissão, mas não diz o critério nem o procedimento da alteração. A expressão 'quando necessário' apenas limita a empresa como sujeito da decisão; não apresenta um critério objetivo, por isso há possibilidade de que seja interpretada como reconhecimento amplo da discricionariedade da empresa. Além disso, 'pode alterar' não impõe à empresa o dever de notificar o usuário. Eu a corrijo para: 'A empresa pode alterar o serviço somente em caso de falha grave ou alteração legislativa, e deve notificar por escrito o motivo e a data de entrada em vigor com 30 dias de antecedência.' Assim, o poder permanece, mas os motivos e o procedimento ficam claros. No entanto, o critério concreto de 'falha grave' ainda deixa margem de interpretação. Essa parte precisa ser complementada em regulamento ou em critério separado.",
    notePt: "Exemplo original. O texto analisa a modalidade, reescreve com obrigação e procedimento, e reconhece o risco que permanece. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c04 — avaliação do Módulo 4: idiomatismo, hanja, colocação, nuance e modalidade. */
export const C2_C04 = defineC2Checkpoint({
  id: "c2-c04", number: 4, moduleId: "c2-m04",
  title: "Checkpoint · Léxico idiomático e precisão",
  objective: "Avaliar idiomatismo, hanja, colocação, nuance e modalidade do Módulo 4.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido, o registro e a avaliação do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l16", "c2-l17", "c2-l18", "c2-l19", "c2-l20"],
  prerequisites: ["c2-l16", "c2-l17", "c2-l18", "c2-l19", "c2-l20", "c2-c01", "c2-c02", "c2-c03"],
  estimatedMinutes: 55,
  exercises: [
    mcq("O que '발목을 잡다' indica na frase '과거의 실수가 지금도 발목을 잡아요'?", ["Que o erro continua impedindo o avanço da pessoa.", "Que a pessoa torceu o tornozelo.", "Que o erro foi completamente esquecido."], "Que o erro continua impedindo o avanço da pessoa.", "A expressão usa a imagem de segurar o tornozelo para indicar um obstáculo que trava o movimento."),
    mcq("Qual é a diferença central entre 상관성 e 인과성?", ["A primeira descreve variação conjunta; a segunda afirma causa e efeito.", "A primeira pertence à linguagem jurídica; a segunda, à literatura.", "As duas são sinônimos e podem ser trocadas livremente."], "A primeira descreve variação conjunta; a segunda afirma causa e efeito.", "A distinção delimita o alcance da afirmação: correlação não prova causalidade."),
    mcq("Em uma cláusula, qual formulação cria obrigação, e não apenas permissão?", ["이용자는 변경 내용을 30일 전까지 통지받아야 한다.", "회사는 필요하다고 판단하는 경우 계약을 변경할 수 있다.", "회사는 변경 여부를 검토할 수도 있다."], "이용자는 변경 내용을 30일 전까지 통지받아야 한다.", "-아/어야 한다 marca obrigação; -할 수 있다 e -할 수도 있다 abrem permissão ou possibilidade."),

    cloze("Complete a expressão de quem finge desconhecimento: 그는 책임을 묻자 ___을 내밀었어요.", "오리발", "오리발을 내밀다 significa fingir que não sabe ou não participa."),
    cloze("Complete a distinção metodológica: 두 변수 사이의 ___은 확인되었지만 인과성은 입증되지 않았다.", "상관성", "상관성 nomeia a variação conjunta observada, sem afirmar causa e efeito."),
    cloze("Complete a qualidade que se revela no acesso dos grupos excluídos: 정책의 ___은 소외 계층의 접근성으로 드러난다.", "포용성", "포용성 nomeia a capacidade de incluir grupos e demandas que costumam ficar de fora."),
    cloze("Complete a avaliação elogiosa da moderação: 그는 돈을 아끼지만 인색하지 않고 ___.", "검소해요", "검소하다 descreve moderação no consumo com avaliação de respeito, não de mesquinhez."),
    cloze("Complete a leitura jurídica da cláusula: 이 조항은 회사의 재량을 넓게 인정한 것으로 ___.", "해석된다", "-ㄴ/는 것으로 해석된다 atribui uma leitura ao texto sem afirmá-la como única."),

    listen("Ouça e escreva a fala sobre o que ficou na consciência.", "어제 본 영화, 결말이 계속 눈에 밟혀요.", "어제 본 영화, 결말이 계속 눈에 밟혀요.", "O filme que vi ontem, o final continua pesando na minha consciência."),
    listen("Ouça e escreva a reação de quem largou o filme.", "저는 오히려 중반부터 손을 놓았어요.", "저는 오히려 중반부터 손을 놓았어요.", "Eu, ao contrário, larguei a partir do meio."),
    listen("Ouça e escreva a distinção entre os dois termos acadêmicos.", "상관성은 함께 변한다는 뜻이고, 인과성은 원인과 결과를 말해요.", "상관성은 함께 변한다는 뜻이고, 인과성은 원인과 결과를 말해요.", "Correlação significa que variam juntas, enquanto causalidade fala de causa e efeito."),
    listen("Ouça e escreva a crítica ao relatório sem sujeito.", "보고서라서 주체를 빼면 책임도 흐려지니까요.", "보고서라서 주체를 빼면 책임도 흐려지니까요.", "Como é um relatório, omitir o sujeito também dilui a responsabilidade."),
    listen("Ouça e escreva a diferença entre os dois sentimentos.", "억울하다는 부당함에 대한 감정이고, 서운하다는 기대가 어긋난 감정이에요.", "억울하다는 부당함에 대한 감정이고, 서운하다는 기대가 어긋난 감정이에요.", "'Sentir-se injustiçado' é a emoção diante de algo injusto; 'ficar magoado' é a emoção quando uma expectativa se rompe."),
    listen("Ouça e escreva a proposta para tornar a cláusula clara.", "변경 사유를 열거하고, 서면 통지와 협의 절차를 의무로 규정해야 해요.", "변경 사유를 열거하고, 서면 통지와 협의 절차를 의무로 규정해야 해요.", "É preciso enumerar os motivos de alteração e estabelecer como obrigação o aviso por escrito e o procedimento de consulta."),

    reading("영화는 금세 발이 넓은 사람처럼 굴지 않는다. 오히려 낯선 사람들 사이의 어색한 침묵을 오래 비춘다. 주인공은 매일 같은 시간에 버스를 놓치고, 그때마다 오리발을 내미는 듯한 변명을 늘어놓는다.", "Qual leitura a comparação com '발이 넓은 사람' permite?", ["Que o filme evita a sociabilidade fácil e prefere o silêncio entre estranhos.", "Que o diretor tem muitos amigos na indústria.", "Que o protagonista trabalha em uma estação de ônibus."], "Que o filme evita a sociabilidade fácil e prefere o silêncio entre estranhos.", "A negação da expressão indica que o filme não se comporta como alguém que circula com facilidade."),
    reading("신뢰가 높은 지역에 제도가 투명한 경우가 많다는 관찰은, 제도가 신뢰를 만들었다는 결론을 곧바로 뒷받침하지 않는다. 오히려 신뢰가 높은 지역이 투명한 제도를 선택했을 가능성, 즉 역방향의 요인을 함께 검토해야 한다.", "Por que a observação não sustenta imediatamente a conclusão causal?", ["Porque a direção inversa — a confiança levando à escolha de instituições — também é possível.", "Porque a transparência não pode ser medida.", "Porque o estudo foi realizado em um único país."], "Porque a direção inversa — a confiança levando à escolha de instituições — também é possível.", "A correlação admite mais de uma direção causal; o texto exige examinar a inversa."),
    reading("추상적 명사만으로 구성된 문장은 정책의 방향을 밝히는 대신, 실행의 주체를 지운다. 형평성을 도모한다는 말은 기준을 누가 정하고 누가 예외를 승인하는지 말할 때 비로소 의미를 얻는다.", "O que falta para que 'promover a equidade' tenha sentido verificável?", ["Dizer quem define os critérios e quem aprova as exceções.", "Repetir a palavra 'equidade' em mais frases.", "Substituir o verbo por uma expressão mais difícil."], "Dizer quem define os critérios e quem aprova as exceções.", "A abstração só se torna verificável quando nomeia agente e procedimento."),
    reading("번역 A는 '대범하다'를 골라 인물을 관대한 사람으로 만들었다. 번역 B는 '야무지다'를 골라 반대 방향으로 움직였다. 그러나 원문의 인물은 어느 쪽도 아니다.", "O que a comparação das traduções demonstra?", ["Que escolhas lexicais opostas impõem ao personagem avaliações que o original não confirma.", "Que a tradução A é gramaticalmente incorreta.", "Que o original não permite nenhuma interpretação."], "Que escolhas lexicais opostas impõem ao personagem avaliações que o original não confirma.", "Cada tradução transforma a hesitação do original em um traço definido."),
    reading("이 조항은 회사의 재량을 넓게 인정하는 것으로 해석될 소지가 있다. 반면 '게시한 날부터 효력이 발생한다'는 부분은 발효 시점을 명확히 하므로, 이용자가 변경 사실을 알 수 있는 최소한의 장치로 볼 수 있다.", "Como o texto avalia a parte sobre a entrada em vigor?", ["Reconhece que ela fixa o momento da eficácia, embora não resolva o problema do critério.", "Considera que ela torna a cláusula inteiramente inválida.", "Afirma que ela elimina qualquer risco de interpretação."], "Reconhece que ela fixa o momento da eficácia, embora não resolva o problema do critério.", "O texto separa o ponto claro — o momento da eficácia — do ponto ainda aberto — o critério da necessidade."),
    reading("이 조항이 이용자에게 일방적으로 불리하게 해석될 경우, 약관의 구속력 자체가 문제가 될 수 있다. 또한 손해배상 책임을 전면적으로 면제하는 문구는 쉽게 소멸되지 않는 법적 의무와 충돌할 수 있다.", "O que o texto aponta como risco para a validade dos termos de uso?", ["Que a interpretação unilateralmente desfavorável e a isenção total de responsabilidade comprometam sua força vinculante.", "Que o usuário não possa rescindir o contrato em nenhuma hipótese.", "Que a empresa não possa publicar alterações no site."], "Que a interpretação unilateralmente desfavorável e a isenção total de responsabilidade comprometam sua força vinculante.", "O texto liga a força vinculante à ausência de desvantagem unilateral e à compatibilidade com obrigações legais."),

    translate("pt-ko", "Traduza: “A correlação não garante a causalidade.”", "상관성은 인과성을 보장하지 않는다.", "보장하다 = garantir; a frase separa correlação de causalidade.", ["상관성이 인과성을 보장하지는 않는다."]),
    translate("ko-pt", "Traduza: 관용 표현은 낱말의 합이 아니라 문맥 속에서 완성된다.", "A expressão idiomática não se completa pela soma das palavras, mas no contexto.", "낱말의 합 = soma das palavras; 문맥 = contexto.", ["A expressão idiomática não é a soma das palavras: completa-se no contexto."]),
    translate("pt-ko", "Traduza: “O comitê buscou ampliar a participação dos moradores.”", "위원회는 주민 참여 확대를 도모하였다.", "-을 도모하다 combina com objetivo abstrato em registro institucional.", ["위원회는 주민 참여 확대를 도모했습니다."]),
    translate("ko-pt", "Traduza: 검소한 것과 인색한 것은 다르다.", "Ser frugal é diferente de ser mesquinho.", "인색하다 = mesquinho, avarento; a frase separa moderação de avareza.", ["Ser econômico é diferente de ser mesquinho."]),
    translate("pt-ko", "Traduza: “Há possibilidade de que esta cláusula seja interpretada em prejuízo do usuário.”", "이 조항은 이용자에게 불리하게 해석될 소지가 있다.", "-ㄹ 소지가 있다 apresenta um risco de leitura possível.", ["이 조항이 이용자에게 불리하게 해석될 소지가 있습니다."]),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
