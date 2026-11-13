import type { ReviewMeta } from "@/content/hangul/types";
import type {
  B1CheckpointBlueprint,
  B1CurriculumBlueprint,
  B1LessonBlueprint,
  B1ModuleBlueprint,
} from "./types";

const IN_REVIEW: ReviewMeta = { status: "in-review" };
const CORE = ["mcq", "cloze", "listen", "translate", "reading"] as const;

export const B1_MODULES = [
  { id: "b1-m01", number: 1, title: "Histórias e conexões", communicativeArc: "Narrar experiências com contexto, voz indireta, hipóteses e imprevistos.", stepIds: ["b1-l01", "b1-l02", "b1-l03", "b1-l04", "b1-l05", "b1-c01"] },
  { id: "b1-m02", number: 2, title: "Planos, decisões e mudanças", communicativeArc: "Planejar com flexibilidade, justificar escolhas e lidar com condições que mudam.", stepIds: ["b1-l06", "b1-l07", "b1-l08", "b1-l09", "b1-l10", "b1-c02"] },
  { id: "b1-m03", number: 3, title: "Opiniões e argumentos", communicativeArc: "Sustentar opinião, comparar posições, discordar e construir argumentos.", stepIds: ["b1-l11", "b1-l12", "b1-l13", "b1-l14", "b1-l15", "b1-c03"] },
  { id: "b1-m04", number: 4, title: "Trabalho e estudo", communicativeArc: "Assumir responsabilidades, participar de reuniões e negociar conflitos.", stepIds: ["b1-l16", "b1-l17", "b1-l18", "b1-l19", "b1-l20", "b1-c04"] },
  { id: "b1-m05", number: 5, title: "Sociedade, cultura e relações", communicativeArc: "Interpretar mudanças sociais, negociar limites e discutir direitos.", stepIds: ["b1-l21", "b1-l22", "b1-l23", "b1-l24", "b1-l25", "b1-c05"] },
  { id: "b1-m06", number: 6, title: "Viagem, serviços e imprevistos", communicativeArc: "Resolver problemas complexos, reclamar, comparar e relatar viagens.", stepIds: ["b1-l26", "b1-l27", "b1-l28", "b1-l29", "b1-l30", "b1-c06"] },
  { id: "b1-m07", number: 7, title: "Mídia, informação e interpretação", communicativeArc: "Ler notícias, distinguir fato de opinião e interpretar dados.", stepIds: ["b1-l31", "b1-l32", "b1-l33", "b1-l34", "b1-l35", "b1-c07"] },
  { id: "b1-m08", number: 8, title: "Integração B1", communicativeArc: "Encadear narrativa, argumento, problema e produção independente.", stepIds: ["b1-l36", "b1-l37", "b1-l38", "b1-l39", "b1-l40", "b1-c08"] },
] satisfies readonly B1ModuleBlueprint[];

type Seed = readonly [
  id: string, number: number, moduleId: string, title: string, goal: string,
  prerequisites: readonly string[], themes: readonly string[], grammar: readonly string[],
  scenario: string, listening: string, writing: string, review: readonly string[],
  performance: string, minutes?: number,
];

function lesson(seed: Seed): B1LessonBlueprint {
  const [id, number, moduleId, title, communicativeGoal, prerequisites, themes, grammar, dialogueScenario, listeningObjective, writingObjective, reviewDependencies, performance, minutes = 65] = seed;
  return {
    id, number, moduleId, title, communicativeGoal, prerequisites,
    vocabulary: { themes, newItems: { min: 7, max: 9 } },
    grammar, dialogueScenario, listeningObjective, writingObjective,
    exerciseTypes: CORE, reviewDependencies,
    assessment: { automaticItems: 10, minCorrect: 8, performance },
    estimatedMinutes: minutes, distributedReviewMinutes: 30, review: IN_REVIEW,
  };
}

export const B1_LESSONS: readonly B1LessonBlueprint[] = [
  lesson(["b1-l01", 1, "b1-m01", "A história que ficou", "Narrar uma lembrança com avaliação e conectores de discurso.", [], ["memória", "emoções", "relatos"], ["-더라고요", "conectores de narrativa"], "Duas pessoas comparam uma lembrança marcante.", "Identificar fato, impressão e avaliação no relato.", "Reescrever uma lembrança em cinco frases.", [], "Relato com fato, impressão e conclusão.", 65]),
  lesson(["b1-l02", 2, "b1-m01", "Enquanto voltava", "Encadear ações interrompidas e acontecimentos imediatos.", ["b1-l01"], ["deslocamento", "acidentes", "tempo"], ["-다가", "-자마자"], "Um imprevisto no caminho para casa.", "Ordenar ações e identificar a interrupção.", "Narrar um trajeto com uma interrupção.", ["b1-l01"], "Sequência com interrupção clara.", 65]),
  lesson(["b1-l03", 3, "b1-m01", "O que ele disse", "Relatar falas e perguntas de outra pessoa.", ["b1-l02"], ["comunicação", "boatos", "confiança"], ["-다고 하다", "-냐고 하다"], "Amigos esclarecem um recado transmitido errado.", "Distinguir fala relatada de fala direta.", "Transformar um diálogo em relato indireto.", ["b1-l01", "b1-l02"], "Relato indireto com fonte explícita.", 65]),
  lesson(["b1-l04", 4, "b1-m01", "Se eu pudesse voltar", "Expressar arrependimento, desejo e hipótese passada.", ["b1-l03"], ["arrependimento", "decisões", "hipóteses"], ["-았/었으면 좋겠다", "-더라면"], "Uma conversa sobre uma escolha que poderia ter sido diferente.", "Identificar o desejo e a hipótese irreal.", "Escrever um desejo e uma hipótese sobre o passado.", ["b1-l01", "b1-l03"], "Desejo e hipótese diferenciados.", 65]),
  lesson(["b1-l05", 5, "b1-m01", "Uma mudança inesperada", "Narrar mudanças involuntárias e consequências definitivas.", ["b1-l04"], ["mudanças", "imprevistos", "consequências"], ["-아/어 버리다", "-고 말다"], "Uma família conta uma mudança que ninguém planejou.", "Reconstruir a mudança e sua consequência.", "Narrar uma mudança inesperada em seis frases.", ["b1-l02", "b1-l04"], "Mudança involuntária com consequência.", 70]),
  lesson(["b1-l06", 6, "b1-m02", "Talvez eu vá", "Falar de planos provisórios e decisões ainda abertas.", ["b1-c01"], ["planos", "possibilidades", "prazos"], ["-(으)ㄹ까 하다", "-(으)ㄹ 예정이다"], "Dois colegas comparam planos ainda não confirmados.", "Distinguir plano provisório de plano confirmado.", "Escrever três possibilidades e uma decisão.", ["b1-l01", "b1-l04"], "Grau de certeza adequado ao plano.", 65]),
  lesson(["b1-l07", 7, "b1-m02", "Para conseguir", "Explicar objetivo, meio e providência necessária.", ["b1-l06"], ["objetivos", "métodos", "processos"], ["-기 위해(서)", "-도록"], "Uma equipe organiza o que precisa fazer para cumprir uma meta.", "Identificar objetivo e providência.", "Explicar um objetivo e duas ações para alcançá-lo.", ["b1-l06"], "Objetivo e meio conectados.", 65]),
  lesson(["b1-l08", 8, "b1-m02", "Em vez de", "Comparar alternativas e justificar uma escolha.", ["b1-l07"], ["alternativas", "comparação", "prioridades"], ["-는 대신(에)", "-기보다"], "Duas pessoas escolhem entre opções com custos diferentes.", "Identificar a opção descartada e o motivo.", "Comparar duas opções e recomendar uma.", ["b1-l06", "b1-l07"], "Alternativa descartada e critério explícitos.", 65]),
  lesson(["b1-l09", 9, "b1-m02", "Se as condições mudarem", "Planejar com condições, limites e exceções.", ["b1-l08"], ["condições", "riscos", "mudanças"], ["-는 한", "-더라도"], "Um plano de viagem depende do clima e do orçamento.", "Identificar condição, limite e exceção.", "Escrever um plano com uma condição e uma exceção.", ["b1-l06", "b1-l08"], "Condição e exceção sem contradição.", 70]),
  lesson(["b1-l10", 10, "b1-m02", "Decisões que mudam", "Justificar uma decisão difícil e assumir suas consequências.", ["b1-l09"], ["decisões", "consequências", "responsabilidade"], ["-기로 하다 revisitado", "-지 않을 수 없다"], "Uma pessoa explica uma decisão profissional difícil.", "Identificar decisão, motivo e consequência.", "Escrever uma decisão e duas consequências.", ["b1-l06", "b1-l09"], "Decisão com motivo e consequência assumida.", 70]),
  lesson(["b1-l11", 11, "b1-m03", "Eu acho que...", "Expressar opinião com grau de certeza e justificativa.", ["b1-c02"], ["opinião", "crenças", "valores"], ["-다고 생각하다", "-는 편이다"], "Duas pessoas avaliam uma mudança no bairro.", "Distinguir opinião forte de opinião cautelosa.", "Escrever uma opinião com duas justificativas.", ["b1-l01", "b1-l10"], "Opinião com justificativa e grau de certeza.", 65]),
  lesson(["b1-l12", 12, "b1-m03", "Por um lado...", "Comparar posições e apresentar contraste.", ["b1-l11"], ["comparação", "contraste", "análise"], ["-는 반면에", "-에 비해"], "Dois colegas comparam dois modelos de trabalho.", "Identificar o critério de comparação e o contraste.", "Comparar duas opções em um parágrafo curto.", ["b1-l08", "b1-l11"], "Contraste com critério explícito.", 65]),
  lesson(["b1-l13", 13, "b1-m03", "Não só...", "Acrescentar argumentos e hierarquizar informações.", ["b1-l12"], ["argumentos", "exemplos", "ênfase"], ["-뿐만 아니라", "-기도 하다"], "Uma apresentação defende a ampliação de um serviço.", "Identificar argumento principal e argumento adicional.", "Acrescentar dois argumentos a uma opinião.", ["b1-l11", "b1-l12"], "Adição sem repetição do mesmo argumento.", 65]),
  lesson(["b1-l14", 14, "b1-m03", "Discordar sem brigar", "Discordar, reconhecer o outro e propor outra leitura.", ["b1-l13"], ["discordância", "respeito", "debate"], ["-기는 하지만", "-라고 해도"], "Dois amigos discordam sobre uma série sem romper a conversa.", "Identificar concessão e contra-argumento.", "Escrever uma discordância com concessão.", ["b1-l11", "b1-l13"], "Discordância com concessão e contra-argumento.", 65]),
  lesson(["b1-l15", 15, "b1-m03", "Defender uma opinião", "Organizar tese, evidência e conclusão.", ["b1-l14"], ["argumentação", "evidência", "conclusão"], ["-다는 점에서", "-다고 볼 수 있다"], "Um debate sobre transporte público exige argumentos organizados.", "Identificar tese, evidência e conclusão.", "Produzir um argumento de cinco frases.", ["b1-l12", "b1-l14"], "Tese, evidência e conclusão reconhecíveis.", 70]),
  lesson(["b1-l16", 16, "b1-m04", "Responsabilidades", "Explicar funções, limites e obrigações no trabalho.", ["b1-c03"], ["trabalho", "funções", "obrigações"], ["-에 따라", "-도록 하다"], "Uma equipe esclarece quem faz o quê.", "Identificar responsável, tarefa e limite.", "Descrever três responsabilidades com limites.", ["b1-l07", "b1-l15"], "Responsabilidades sem sobreposição.", 65]),
  lesson(["b1-l17", 17, "b1-m04", "Reuniões e relatórios", "Participar de uma reunião e resumir encaminhamentos.", ["b1-l16"], ["reuniões", "relatórios", "decisões"], ["-에 대한", "-는 데 반해"], "Uma reunião decide prioridades e prazos.", "Extrair pauta, decisão e responsável.", "Escrever um resumo de reunião em quatro frases.", ["b1-l16"], "Resumo com pauta, decisão e prazo.", 70]),
  lesson(["b1-l18", 18, "b1-m04", "Procurar oportunidades", "Avaliar uma vaga e reconhecer requisitos e contrapartidas.", ["b1-l17"], ["emprego", "requisitos", "negociação"], ["-(으)ㄹ 수밖에 없다", "-기에"], "Uma candidata compara duas vagas com condições diferentes.", "Identificar requisito, benefício e limitação.", "Escrever uma candidatura com motivação e requisito.", ["b1-l16", "b1-l17"], "Candidatura com requisito e motivação.", 70]),
  lesson(["b1-l19", 19, "b1-m04", "Estudo e carreira", "Relacionar estudo, competência e plano profissional.", ["b1-l18"], ["estudo", "carreira", "competência"], ["-기 위해서는", "-는 것이 중요하다"], "Dois profissionais comparam caminhos de especialização.", "Identificar objetivo de estudo e competência.", "Escrever um plano de desenvolvimento em cinco frases.", ["b1-l18"], "Plano com competência e objetivo.", 70]),
  lesson(["b1-l20", 20, "b1-m04", "Conflitos no trabalho", "Descrever um conflito e propor uma solução.", ["b1-l19"], ["conflito", "negociação", "acordo"], ["-는 바람에", "-더라도"], "Dois colegas lidam com um erro que afetou a equipe.", "Identificar causa, impacto e proposta.", "Escrever uma mensagem de reparação em cinco frases.", ["b1-l17", "b1-l19"], "Conflito com causa, impacto e acordo.", 75]),
  lesson(["b1-l21", 21, "b1-m05", "Mudanças sociais", "Descrever tendências sociais com evidências e cautela.", ["b1-c04"], ["sociedade", "tendências", "dados"], ["-는 경향이 있다", "-에 따라"], "Uma conversa compara mudanças de moradia entre gerações.", "Identificar tendência, dado e ressalva.", "Descrever uma tendência em cinco frases.", ["b1-l11", "b1-l12"], "Tendência com evidência e ressalva.", 65]),
  lesson(["b1-l22", 22, "b1-m05", "Cultura e gerações", "Comparar práticas culturais sem estereótipos.", ["b1-l21"], ["cultura", "gerações", "identidade"], ["-라고들 하다", "-기는 하지만"], "Duas gerações discutem um costume de refeição.", "Identificar prática, variação e estereótipo evitado.", "Escrever uma comparação cultural em cinco frases.", ["b1-l21"], "Comparação cultural sem generalização absoluta.", 65]),
  lesson(["b1-l23", 23, "b1-m05", "Relações e limites", "Negociar proximidade, limites e expectativas.", ["b1-l22"], ["relações", "limites", "comunicação"], ["-도록", "-는 데"], "Dois amigos conversam sobre um limite que precisa ser dito.", "Identificar expectativa, limite e acordo.", "Escrever um pedido de limite com respeito.", ["b1-l14", "b1-l22"], "Limite claro e relação preservada.", 65]),
  lesson(["b1-l24", 24, "b1-m05", "Problemas cotidianos", "Relatar problemas urbanos e avaliar soluções.", ["b1-l23"], ["cidade", "problemas", "soluções"], ["-는 통에", "-기 마련이다"], "Moradores discutem um problema de infraestrutura.", "Identificar problema, causa e solução proposta.", "Escrever uma reclamação cidadã em seis frases.", ["b1-l21", "b1-l23"], "Problema com causa e solução viável.", 70]),
  lesson(["b1-l25", 25, "b1-m05", "Direitos e deveres", "Discutir direitos, deveres e limites de forma equilibrada.", ["b1-l24"], ["direitos", "deveres", "cidadania"], ["-을 권리가 있다", "-해야 할 의무가 있다"], "Uma assembleia discute regras de convivência.", "Identificar direito, dever e conflito.", "Escrever uma proposta com direito e dever.", ["b1-l23", "b1-l24"], "Proposta equilibra direito e dever.", 70]),
  lesson(["b1-l26", 26, "b1-m06", "Reservas e mudanças", "Negociar reserva, mudança e condições.", ["b1-c05"], ["viagem", "reserva", "condições"], ["-(으)ㄹ 만하다", "-기에는"], "Uma viajante muda uma reserva e avalia a taxa.", "Identificar condição, custo e alternativa.", "Escrever um pedido de mudança de reserva.", ["b1-l08", "b1-l18"], "Pedido com condição e alternativa.", 65]),
  lesson(["b1-l27", 27, "b1-m06", "Quando algo dá errado", "Relatar um imprevisto grave e suas consequências.", ["b1-l26"], ["viagem", "emergência", "consequências"], ["-는 바람에", "-고 말다"], "Um atraso de voo provoca uma série de problemas.", "Reconstruir causa, consequência e providência.", "Escrever um relato de imprevisto em seis frases.", ["b1-l20", "b1-l26"], "Causa e consequência sem salto lógico.", 70]),
  lesson(["b1-l28", 28, "b1-m06", "Reclamações e soluções", "Formalizar uma reclamação e negociar compensação.", ["b1-l27"], ["consumo", "reclamação", "solução"], ["-에 대한", "-도록 요청하다"], "Um cliente reclama de um serviço e pede uma solução.", "Identificar problema, pedido e prazo.", "Escrever uma reclamação formal em seis frases.", ["b1-l26", "b1-l27"], "Reclamação com fato, pedido e prazo.", 70]),
  lesson(["b1-l29", 29, "b1-m06", "Recomendações e comparações", "Comparar opções e recomendar com critérios.", ["b1-l28"], ["recomendações", "critérios", "comparação"], ["-에 비해", "-만큼"], "Duas pessoas comparam destinos com orçamentos diferentes.", "Identificar critério, vantagem e limitação.", "Recomendar uma opção em cinco frases.", ["b1-l12", "b1-l28"], "Recomendação com critério e ressalva.", 65]),
  lesson(["b1-l30", 30, "b1-m06", "Relato de viagem", "Relatar uma viagem com avaliação e aprendizado.", ["b1-l29"], ["viagem", "avaliação", "memória"], ["-더라고요 revisitado", "-다는 생각이 들다"], "Uma viajante conta o que aprendeu com uma viagem difícil.", "Identificar impressão, dificuldade e aprendizado.", "Escrever um relato de viagem em sete frases.", ["b1-l01", "b1-l29"], "Relato com impressão e aprendizado.", 75]),
  lesson(["b1-l31", 31, "b1-m07", "Segundo a notícia", "Relatar informação jornalística com fonte.", ["b1-c06"], ["mídia", "notícia", "fonte"], ["-에 따르면", "-다고 한다"], "Duas pessoas comentam uma notícia e verificam a fonte.", "Identificar fonte, dado e afirmação relatada.", "Resumir uma notícia em quatro frases.", ["b1-l03", "b1-l15"], "Resumo com fonte e dado principal.", 65]),
  lesson(["b1-l32", 32, "b1-m07", "O que o texto diz", "Identificar tese e detalhes de um texto conectado.", ["b1-l31"], ["leitura", "interpretação", "texto"], ["-다는 내용이다", "-는 것으로 보이다"], "Um texto sobre transporte escolar é discutido em sala.", "Distinguir tese, exemplo e conclusão.", "Resumir a tese e dois argumentos do texto.", ["b1-l31"], "Tese e argumentos identificados.", 70]),
  lesson(["b1-l33", 33, "b1-m07", "Fatos e opiniões", "Separar fato, opinião e inferência.", ["b1-l32"], ["fatos", "opinião", "interpretação"], ["-는 반면", "-다고 볼 수 있다"], "Dois leitores interpretam o mesmo artigo de forma diferente.", "Classificar afirmações em fato, opinião e inferência.", "Reescrever três opiniões como fatos verificáveis.", ["b1-l31", "b1-l32"], "Classificação com justificativa textual.", 70]),
  lesson(["b1-l34", 34, "b1-m07", "Interpretar dados", "Descrever tendências e comparar dados com cautela.", ["b1-l33"], ["dados", "tendências", "comparação"], ["-에 비해 revisitado", "-는 경향이 있다 revisitado"], "Uma reportagem compara dados de dois anos.", "Identificar aumento, queda e ressalva.", "Descrever um gráfico em cinco frases.", ["b1-l21", "b1-l33"], "Tendência descrita sem causalidade indevida.", 70]),
  lesson(["b1-l35", 35, "b1-m07", "Notícias e responsabilidade", "Avaliar impacto e responsabilidade da informação.", ["b1-l34"], ["ética", "mídia", "responsabilidade"], ["-도록", "-(으)ㄹ 수밖에 없다 revisitado"], "Uma notícia errada é corrigida e discutida.", "Identificar erro, impacto e correção.", "Escrever uma análise curta da responsabilidade.", ["b1-l31", "b1-l34"], "Análise com impacto e correção.", 75]),
  lesson(["b1-l36", 36, "b1-m08", "Contar uma história completa", "Integrar contexto, complicação, decisão e desfecho.", ["b1-c07"], ["narrativa", "integração", "memória"], ["conectores cumulativos", "-더라고요"], "Uma pessoa conta uma história completa de mudança de carreira.", "Reconstruir todas as etapas do relato.", "Produzir um relato de sete a dez frases.", ["b1-l01", "b1-l05", "b1-l30"], "Relato completo com desfecho e avaliação.", 75]),
  lesson(["b1-l37", 37, "b1-m08", "Resolver um problema complexo", "Negociar solução com prazo, custo e responsável.", ["b1-l36"], ["problemas", "negociação", "acordo"], ["-도록", "-기로 하다 revisitado"], "Um grupo resolve um problema com várias partes envolvidas.", "Identificar interesses, acordo e próximo passo.", "Escrever um plano de solução em seis frases.", ["b1-l20", "b1-l28", "b1-l36"], "Solução com prazo, custo e responsável.", 75]),
  lesson(["b1-l38", 38, "b1-m08", "Escrever uma mensagem formal", "Escrever mensagem com contexto, pedido e encerramento.", ["b1-l37"], ["mensagens", "formalidade", "pedidos"], ["-에 대한", "-도록 요청하다 revisitado"], "Uma pessoa escreve a uma instituição sobre um problema.", "Identificar contexto, pedido e prazo na mensagem.", "Produzir uma mensagem formal de seis frases.", ["b1-l28", "b1-l37"], "Mensagem formal com contexto, pedido e prazo.", 70]),
  lesson(["b1-l39", 39, "b1-m08", "Debater um tema", "Organizar tese, concessão e conclusão em debate.", ["b1-l38"], ["debate", "argumentação", "conclusão"], ["-기는 하지만 revisitado", "-다는 점에서"], "Dois debatedores discutem trabalho remoto.", "Identificar tese, concessão e conclusão.", "Produzir uma intervenção de seis frases.", ["b1-l14", "b1-l15", "b1-l38"], "Intervenção com tese, concessão e conclusão.", 75]),
  lesson(["b1-l40", 40, "b1-m08", "Meu percurso B1", "Integrar narrativa, opinião, plano e produção independente.", ["b1-l39"], ["consolidação", "autoavaliação", "futuro"], ["seleção cumulativa", "conectores de discurso"], "Uma conversa de encerramento reúne uma história, uma opinião e um plano.", "Integrar informações de um diálogo longo.", "Produzir um texto de oito a dez frases.", ["b1-l36", "b1-l37", "b1-l38", "b1-l39"], "Texto integrado com narrativa, opinião e plano.", 80]),
];

const TITLES = [
  "Checkpoint · Histórias e conexões", "Checkpoint · Planos e decisões",
  "Checkpoint · Opiniões e argumentos", "Checkpoint · Trabalho e estudo",
  "Checkpoint · Sociedade, cultura e relações", "Checkpoint · Viagem, serviços e imprevistos",
  "Checkpoint · Mídia, informação e interpretação", "Desempenho B1 interno",
] as const;

const OBJECTIVES = [
  "Avaliar narração, voz indireta, hipóteses e imprevistos.",
  "Avaliar planos provisórios, prioridades, condições e decisões.",
  "Avaliar opinião, comparação, argumento e discordância.",
  "Avaliar responsabilidades, reuniões, candidatura e conflitos.",
  "Avaliar tendências sociais, cultura, limites e direitos.",
  "Avaliar reservas, imprevistos, reclamações e relatos de viagem.",
  "Avaliar fonte, tese, fato/opinião e interpretação de dados.",
  "Avaliar uma amostra cumulativa do B1 em leitura, escuta, gramática e produção controlada.",
] as const;

const checkpoints: B1CheckpointBlueprint[] = [];
TITLES.forEach((title, index) => {
  const number = index + 1;
  const lessonIds = B1_LESSONS.slice(index * 5, index * 5 + 5).map((item) => item.id);
  const previous = checkpoints.map((item) => item.id);
  const final = number === 8;
  checkpoints.push({
    id: `b1-c${String(number).padStart(2, "0")}`, number,
    moduleId: `b1-m${String(number).padStart(2, "0")}`, title, lessonIds,
    prerequisites: [...lessonIds, ...previous],
    cumulativeReviewFrom: B1_LESSONS.slice(0, (index + 1) * 5).map((item) => item.id),
    skills: ["reading", "listening", "grammar", "vocabulary", "register", "writing"],
    assessment: { automaticItems: final ? 40 : 25, minCorrect: final ? 32 : 20, performance: final ? "Amostra cumulativa; produção aberta por rubrica humana." : "Itens automáticos; produção aberta por rubrica humana." },
    estimatedMinutes: final ? 80 : 45,
    review: IN_REVIEW,
  });
});

export const B1_CHECKPOINTS: readonly B1CheckpointBlueprint[] = checkpoints;

export const B1_CURRICULUM: B1CurriculumBlueprint = {
  version: 1, courseId: "ko-b1", status: "blueprint", prerequisite: "ko-a2",
  modules: B1_MODULES, lessons: B1_LESSONS, checkpoints: B1_CHECKPOINTS, review: IN_REVIEW,
};
