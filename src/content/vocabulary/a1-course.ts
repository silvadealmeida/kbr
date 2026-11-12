import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabEntry, VocabPos, VocabSentence } from "./types";

const review: ReviewMeta = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso A1; forma, tradução e naturalidade aguardam revisão de falante nativo.",
};

type Row = readonly [
  lesson: string,
  ko: string,
  pt: string,
  pos: VocabPos,
  /** Forma exata ocultada na frase (pode ser a forma polida do verbo). */
  target: string,
  koSentence: string,
  ptSentence: string,
  contextMeaning: string,
  notes?: string,
];

/**
 * Vocabulário das lições a1-l02 em diante. O array é a fonte única das
 * identidades e das frases contextuais; cada lição referencia os IDs gerados
 * aqui em vez de repetir os objetos. Nenhuma forma do Hangul é recriada: ela
 * aparece em `reusedIds` na lição.
 */
const ROWS: readonly Row[] = [
  // a1-l02 — países, nacionalidades e ocupações
  ["a1-l02", "미국", "Estados Unidos", "substantivo", "미국", "저는 미국 사람이에요.", "Eu sou norte-americano; eu sou norte-americana.", "Estados Unidos", "País; 미국 사람 é a pessoa norte-americana."],
  ["a1-l02", "중국", "China", "substantivo", "중국", "친구는 중국 사람이에요.", "Meu amigo é chinês; minha amiga é chinesa.", "China"],
  ["a1-l02", "일본", "Japão", "substantivo", "일본", "선생님은 일본 사람이에요.", "O professor é japonês; a professora é japonesa.", "Japão"],
  ["a1-l02", "프랑스", "França", "substantivo", "프랑스", "아나 씨는 프랑스 사람이에요.", "A Ana é francesa.", "França"],
  ["a1-l02", "멕시코", "México", "substantivo", "멕시코", "민수 씨는 멕시코 사람이에요.", "Minsu é mexicano.", "México"],
  ["a1-l02", "국적", "nacionalidade", "substantivo", "국적", "제 국적은 브라질이에요.", "Minha nacionalidade é brasileira.", "nacionalidade"],
  ["a1-l02", "직업", "profissão", "substantivo", "직업", "직업이 뭐예요?", "Qual é a sua profissão?", "profissão"],
  ["a1-l02", "회사원", "funcionário de empresa; funcionária de empresa", "substantivo", "회사원", "저는 회사원이에요.", "Eu sou funcionário de empresa; eu sou funcionária de empresa.", "funcionário de empresa"],
  ["a1-l02", "대학생", "universitário; universitária", "substantivo", "대학생", "제 친구는 대학생이에요.", "Meu amigo é universitário; minha amiga é universitária.", "universitário; universitária"],
  ["a1-l02", "요리사", "cozinheiro; cozinheira", "substantivo", "요리사", "아버지는 요리사예요.", "Meu pai é cozinheiro.", "cozinheiro; cozinheira"],
  ["a1-l02", "어느", "qual", "pronome", "어느", "어느 나라 사람이에요?", "De qual país você é?", "qual"],
  ["a1-l02", "유학생", "estudante estrangeiro; estudante estrangeira", "substantivo", "유학생", "저는 유학생이에요.", "Eu sou estudante estrangeiro; eu sou estudante estrangeira.", "estudante estrangeiro"],

  // a1-l03 — objetos e demonstrativos
  ["a1-l03", "공책", "caderno", "substantivo", "공책", "이것은 공책이에요.", "Isto é um caderno.", "caderno"],
  ["a1-l03", "연필", "lápis", "substantivo", "연필", "그것은 연필이에요.", "Isso é um lápis.", "lápis"],
  ["a1-l03", "볼펜", "caneta", "substantivo", "볼펜", "저것은 볼펜이에요.", "Aquilo é uma caneta.", "caneta"],
  ["a1-l03", "가방", "mochila; bolsa", "substantivo", "가방", "이것은 제 가방이에요.", "Isto é a minha mochila.", "mochila; bolsa"],
  ["a1-l03", "휴대폰", "celular", "substantivo", "휴대폰", "그것은 휴대폰이에요.", "Isso é um celular.", "celular"],
  ["a1-l03", "열쇠", "chave", "substantivo", "열쇠", "이것은 열쇠예요.", "Isto é uma chave.", "chave"],
  ["a1-l03", "안경", "óculos", "substantivo", "안경", "저것은 안경이에요.", "Aquilo são óculos.", "óculos"],
  ["a1-l03", "이것", "isto", "pronome", "이것", "이것이 뭐예요?", "O que é isto?", "isto"],
  ["a1-l03", "그것", "isso", "pronome", "그것", "그것은 책이에요.", "Isso é um livro.", "isso"],
  ["a1-l03", "저것", "aquilo", "pronome", "저것", "저것은 의자예요.", "Aquilo é uma cadeira.", "aquilo"],

  // a1-l04 — existência, lugar e posição
  ["a1-l04", "거기", "aí; lá (perto de quem ouve)", "advérbio", "거기", "거기에 책이 있어요.", "Há um livro aí.", "aí; lá (perto de quem ouve)"],
  ["a1-l04", "저기", "ali; lá (longe)", "advérbio", "저기", "저기에 의자가 있어요.", "Há uma cadeira ali.", "ali; lá (longe)"],
  ["a1-l04", "방", "quarto", "substantivo", "방", "제 방에 책상이 있어요.", "Há uma escrivaninha no meu quarto.", "quarto"],
  ["a1-l04", "책상", "escrivaninha; mesa de estudo", "substantivo", "책상", "책상 위에 책이 있어요.", "Há um livro em cima da escrivaninha.", "escrivaninha"],
  ["a1-l04", "침대", "cama", "substantivo", "침대", "방에 침대가 있어요.", "Há uma cama no quarto.", "cama"],
  ["a1-l04", "아래", "embaixo; abaixo", "substantivo", "아래", "책상 아래에 가방이 있어요.", "Há uma mochila embaixo da escrivaninha.", "embaixo; abaixo"],
  ["a1-l04", "뒤", "atrás", "substantivo", "뒤", "문 뒤에 의자가 있어요.", "Há uma cadeira atrás da porta.", "atrás"],
  ["a1-l04", "옆", "lado; ao lado", "substantivo", "옆", "침대 옆에 책상이 있어요.", "Há uma escrivaninha ao lado da cama.", "lado; ao lado"],
  ["a1-l04", "어디", "onde", "pronome", "어디", "책이 어디에 있어요?", "Onde está o livro?", "onde"],
  ["a1-l04", "있다", "haver; estar; ter", "verbo", "있어요", "방에 침대가 있어요.", "Há uma cama no quarto.", "haver; estar", "Forma de dicionário; a frase usa a forma polida 있어요."],

  // a1-l05 — reparo e cortesia
  ["a1-l05", "이해하다", "entender; compreender", "verbo", "이해해요", "이해해요?", "Você entende?", "entender", "Forma de dicionário; a frase usa a forma polida 이해해요."],
  ["a1-l05", "다시", "de novo; novamente", "advérbio", "다시", "다시 말해 주세요.", "Fale de novo, por favor.", "de novo"],
  ["a1-l05", "천천히", "devagar", "advérbio", "천천히", "천천히 말해 주세요.", "Fale devagar, por favor.", "devagar"],
  ["a1-l05", "말하다", "falar; dizer", "verbo", "말해요", "조금 천천히 말해요.", "Fale um pouco devagar.", "falar", "Forma de dicionário; a frase usa a forma polida 말해요."],
  ["a1-l05", "주세요", "por favor; dê (pedido polido)", "interjeição", "주세요", "다시 말해 주세요.", "Fale de novo, por favor.", "por favor; dê"],
  ["a1-l05", "잘", "bem", "advérbio", "잘", "잘 모르겠어요.", "Não entendo bem.", "bem"],
  ["a1-l05", "모르다", "não saber", "verbo", "모르겠어요", "잘 모르겠어요.", "Não entendo bem.", "não saber", "모르겠어요 é a forma polida usada como bloco de reparo."],
  ["a1-l05", "괜찮아요", "está bem; tudo bem", "interjeição", "괜찮아요", "괜찮아요, 감사합니다.", "Está bem, obrigado; está bem, obrigada.", "está bem"],
  ["a1-l05", "죄송합니다", "desculpe; sinto muito (formal)", "interjeição", "죄송합니다", "죄송합니다, 잘 모르겠어요.", "Desculpe, não entendo bem.", "desculpe"],
  ["a1-l05", "뭐라고요", "como disse?; o quê?", "interjeição", "뭐라고요", "뭐라고요? 다시 말해 주세요.", "Como disse? Fale de novo, por favor.", "como disse?"],
  ["a1-l05", "잠깐만요", "um momento; só um instante", "interjeição", "잠깐만요", "잠깐만요, 천천히 말해 주세요.", "Um momento, fale devagar, por favor.", "um momento"],
  ["a1-l05", "도와주세요", "ajude-me, por favor", "interjeição", "도와주세요", "도와주세요, 잘 모르겠어요.", "Ajude-me, por favor; não entendo bem.", "ajude-me, por favor"],

  // a1-l06 — números funcionais
  ["a1-l06", "일", "um (numeral sino-coreano)", "numeral", "일", "제 번호는 일 번이에요.", "Meu número é o um.", "um"],
  ["a1-l06", "삼", "três (numeral sino-coreano)", "numeral", "삼", "제 번호는 삼 번이에요.", "Meu número é o três.", "três"],
  ["a1-l06", "사", "quatro (numeral sino-coreano)", "numeral", "사", "제 번호는 사 번이에요.", "Meu número é o quatro.", "quatro"],
  ["a1-l06", "오", "cinco (numeral sino-coreano)", "numeral", "오", "제 번호는 오 번이에요.", "Meu número é o cinco.", "cinco"],
  ["a1-l06", "육", "seis (numeral sino-coreano)", "numeral", "육", "제 번호는 육 번이에요.", "Meu número é o seis.", "seis"],
  ["a1-l06", "칠", "sete (numeral sino-coreano)", "numeral", "칠", "제 번호는 칠 번이에요.", "Meu número é o sete.", "sete"],
  ["a1-l06", "구", "nove (numeral sino-coreano)", "numeral", "구", "제 번호는 구 번이에요.", "Meu número é o nove.", "nove"],
  ["a1-l06", "십", "dez (numeral sino-coreano)", "numeral", "십", "제 번호는 십 번이에요.", "Meu número é o dez.", "dez"],
  ["a1-l06", "전화번호", "número de telefone", "substantivo", "전화번호", "전화번호가 뭐예요?", "Qual é o número de telefone?", "número de telefone"],
  ["a1-l06", "나이", "idade", "substantivo", "나이", "나이가 몇 살이에요?", "Quantos anos você tem?", "idade"],
  ["a1-l06", "살", "anos de idade", "substantivo", "살", "저는 열 살이에요.", "Eu tenho dez anos.", "anos de idade", "열 é o numeral nativo dez, ensinado na nota gramatical."],
  ["a1-l06", "몇", "quantos; quantas", "pronome", "몇", "몇 살이에요?", "Quantos anos você tem?", "quantos"],
  ["a1-l06", "번", "número (de ordem); vez", "substantivo", "번", "삼 번이에요.", "É o número três.", "número de ordem"],

  // a1-l07 — horas, dias e datas
  ["a1-l07", "시", "hora (no relógio)", "substantivo", "시", "몇 시예요?", "Que horas são?", "hora"],
  ["a1-l07", "분", "minuto", "substantivo", "분", "삼십 분이에요.", "São trinta minutos.", "minuto"],
  ["a1-l07", "요일", "dia da semana", "substantivo", "요일", "무슨 요일이에요?", "Que dia da semana é?", "dia da semana"],
  ["a1-l07", "월요일", "segunda-feira", "substantivo", "월요일", "오늘은 월요일이에요.", "Hoje é segunda-feira.", "segunda-feira"],
  ["a1-l07", "화요일", "terça-feira", "substantivo", "화요일", "내일은 화요일이에요.", "Amanhã é terça-feira.", "terça-feira"],
  ["a1-l07", "수요일", "quarta-feira", "substantivo", "수요일", "오늘은 수요일이에요.", "Hoje é quarta-feira.", "quarta-feira"],
  ["a1-l07", "목요일", "quinta-feira", "substantivo", "목요일", "내일은 목요일이에요.", "Amanhã é quinta-feira.", "quinta-feira"],
  ["a1-l07", "금요일", "sexta-feira", "substantivo", "금요일", "오늘은 금요일이에요.", "Hoje é sexta-feira.", "sexta-feira"],
  ["a1-l07", "토요일", "sábado", "substantivo", "토요일", "내일은 토요일이에요.", "Amanhã é sábado.", "sábado"],
  ["a1-l07", "일요일", "domingo", "substantivo", "일요일", "오늘은 일요일이에요.", "Hoje é domingo.", "domingo"],
  ["a1-l07", "오늘", "hoje", "advérbio", "오늘", "오늘은 월요일이에요.", "Hoje é segunda-feira.", "hoje"],
  ["a1-l07", "내일", "amanhã", "advérbio", "내일", "내일은 화요일이에요.", "Amanhã é terça-feira.", "amanhã"],
  ["a1-l07", "영화", "filme", "substantivo", "영화", "영화는 일곱 시예요.", "O filme é às sete horas.", "filme"],
  ["a1-l07", "무슨", "que; qual (tipo de)", "pronome", "무슨", "무슨 요일이에요?", "Que dia da semana é?", "que; qual"],

  // a1-l08 — rotina e presente polido
  ["a1-l08", "일어나다", "levantar-se; acordar", "verbo", "일어나요", "저는 아침에 일어나요.", "Eu me levanto de manhã.", "levantar-se", "Forma de dicionário; a frase usa a forma polida 일어나요."],
  ["a1-l08", "아침", "manhã; café da manhã", "substantivo", "아침", "아침에 공부해요.", "Estudo de manhã.", "manhã"],
  ["a1-l08", "공부하다", "estudar", "verbo", "공부해요", "저는 아침에 공부해요.", "Eu estudo de manhã.", "estudar", "Forma de dicionário; a frase usa a forma polida 공부해요."],
  ["a1-l08", "가다", "ir", "verbo", "가요", "저는 회사에 가요.", "Eu vou à empresa.", "ir"],
  ["a1-l08", "오다", "vir", "verbo", "와요", "친구가 여기에 와요.", "Um amigo vem aqui.", "vir"],
  ["a1-l08", "자다", "dormir", "verbo", "자요", "저는 잘 자요.", "Eu durmo bem.", "dormir"],
  ["a1-l08", "씻다", "lavar-se; lavar", "verbo", "씻어요", "저는 아침에 씻어요.", "Eu me lavo de manhã.", "lavar-se"],
  ["a1-l08", "점심", "almoço", "substantivo", "점심", "점심은 열두 시예요.", "O almoço é às doze horas.", "almoço"],
  ["a1-l08", "저녁", "jantar; noite", "substantivo", "저녁", "저녁은 일곱 시예요.", "O jantar é às sete horas.", "jantar"],
  ["a1-l08", "쉬다", "descansar", "verbo", "쉬어요", "저는 잘 쉬어요.", "Eu descanso bem.", "descansar"],
  ["a1-l08", "하다", "fazer", "verbo", "해요", "공부는 아침에 해요.", "O estudo, eu faço de manhã.", "fazer"],
  ["a1-l08", "마시다", "beber", "verbo", "마셔요", "커피는 아침에 마셔요.", "Café, eu bebo de manhã.", "beber"],

  // a1-l09 — negação, frequência e hábitos
  ["a1-l09", "자주", "frequentemente; com frequência", "advérbio", "자주", "저는 자주 공부해요.", "Eu estudo com frequência.", "frequentemente"],
  ["a1-l09", "가끔", "às vezes", "advérbio", "가끔", "저는 가끔 영화를 봐요.", "Eu às vezes assisto a filmes.", "às vezes"],
  ["a1-l09", "별로", "não muito", "advérbio", "별로", "저는 별로 안 자요.", "Eu não durmo muito.", "não muito"],
  ["a1-l09", "운동하다", "praticar exercício; treinar", "verbo", "운동해요", "저는 자주 운동해요.", "Eu pratico exercício com frequência.", "praticar exercício"],
  ["a1-l09", "매일", "todos os dias", "advérbio", "매일", "저는 매일 공부해요.", "Eu estudo todos os dias.", "todos os dias"],
  ["a1-l09", "주말", "fim de semana", "substantivo", "주말", "주말에 쉬어요.", "No fim de semana, eu descanso.", "fim de semana"],
  ["a1-l09", "보다", "ver; assistir", "verbo", "봐요", "영화는 가끔 봐요.", "Filmes, eu assisto às vezes.", "ver; assistir"],
  ["a1-l09", "듣다", "ouvir; escutar", "verbo", "들어요", "음악은 자주 들어요.", "Música, eu escuto com frequência.", "ouvir"],
  ["a1-l09", "못", "não conseguir; não poder", "advérbio", "못", "저는 못 가요.", "Eu não consigo ir.", "não conseguir"],
  ["a1-l09", "아니에요", "não é", "interjeição", "아니에요", "저는 학생이 아니에요.", "Eu não sou estudante.", "não é"],

  // a1-l10 — partes do dia e sequência
  ["a1-l10", "오전", "manhã (antes do meio-dia)", "substantivo", "오전", "오전에 공부해요.", "Estudo de manhã.", "manhã (antes do meio-dia)"],
  ["a1-l10", "오후", "tarde (depois do meio-dia)", "substantivo", "오후", "오후에 운동해요.", "Pratico exercício à tarde.", "tarde"],
  ["a1-l10", "밤", "noite", "substantivo", "밤", "밤에 자요.", "À noite, eu durmo.", "noite"],
  ["a1-l10", "그리고", "e; e então", "advérbio", "그리고", "아침에 공부해요. 그리고 밤에 쉬어요.", "Estudo de manhã. E à noite, descanso.", "e; e então"],
  ["a1-l10", "학교", "escola", "substantivo", "학교", "학교에 가요.", "Vou à escola.", "escola"],
  ["a1-l10", "직장", "local de trabalho", "substantivo", "직장", "직장에 가요.", "Vou ao trabalho.", "local de trabalho"],
  ["a1-l10", "시간", "tempo; hora", "substantivo", "시간", "시간이 없어요.", "Não tenho tempo.", "tempo; hora"],
  ["a1-l10", "바쁘다", "estar ocupado", "verbo", "바빠요", "저는 오늘 바빠요.", "Hoje estou ocupado.", "estar ocupado"],
  ["a1-l10", "시작하다", "começar", "verbo", "시작해요", "공부는 아홉 시에 시작해요.", "O estudo começa às nove horas.", "começar"],
  ["a1-l10", "끝나다", "terminar; acabar", "verbo", "끝나요", "공부는 다섯 시에 끝나요.", "O estudo termina às cinco horas.", "terminar"],

  // a1-l11 — família e pessoas próximas
  ["a1-l11", "가족", "família", "substantivo", "가족", "제 가족은 여기 있어요.", "Minha família está aqui.", "família"],
  ["a1-l11", "형", "irmão mais velho (dito por homem)", "substantivo", "형", "형은 회사원이에요.", "Meu irmão mais velho é funcionário de empresa.", "irmão mais velho (homem falando)"],
  ["a1-l11", "오빠", "irmão mais velho (dito por mulher)", "substantivo", "오빠", "오빠는 의사예요.", "Meu irmão mais velho é médico.", "irmão mais velho (mulher falando)"],
  ["a1-l11", "누나", "irmã mais velha (dita por homem)", "substantivo", "누나", "누나는 선생님이에요.", "Minha irmã mais velha é professora.", "irmã mais velha (homem falando)"],
  ["a1-l11", "언니", "irmã mais velha (dita por mulher)", "substantivo", "언니", "언니는 대학생이에요.", "Minha irmã mais velha é universitária.", "irmã mais velha (mulher falando)"],
  ["a1-l11", "동생", "irmão ou irmã mais novo(a)", "substantivo", "동생", "동생은 학생이에요.", "Meu irmão mais novo é estudante.", "irmão/irmã mais novo(a)"],
  ["a1-l11", "할머니", "avó", "substantivo", "할머니", "할머니는 요리사예요.", "Minha avó é cozinheira.", "avó"],
  ["a1-l11", "할아버지", "avô", "substantivo", "할아버지", "할아버지는 의사예요.", "Meu avô é médico.", "avô"],
  ["a1-l11", "아들", "filho", "substantivo", "아들", "아들은 학생이에요.", "Meu filho é estudante.", "filho"],
  ["a1-l11", "딸", "filha", "substantivo", "딸", "딸은 대학생이에요.", "Minha filha é universitária.", "filha"],
  ["a1-l11", "사진", "foto", "substantivo", "사진", "이 사진은 제 가족이에요.", "Esta foto é da minha família.", "foto"],
  ["a1-l11", "우리", "nosso; nós (coletivo)", "pronome", "우리", "우리 가족은 여기 있어요.", "Nossa família está aqui.", "nosso"],

  // a1-l12 — descrição de pessoas
  ["a1-l12", "크다", "ser grande", "verbo", "커요", "제 방은 커요.", "Meu quarto é grande.", "ser grande"],
  ["a1-l12", "작다", "ser pequeno", "verbo", "작아요", "제 방은 작아요.", "Meu quarto é pequeno.", "ser pequeno"],
  ["a1-l12", "키", "altura (de pessoa)", "substantivo", "키", "키가 커요.", "Ele é alto.", "altura"],
  ["a1-l12", "예쁘다", "ser bonito; ser bonita", "verbo", "예뻐요", "꽃이 예뻐요.", "A flor é bonita.", "ser bonito"],
  ["a1-l12", "잘생기다", "ser bonito (aparência masculina)", "verbo", "잘생겼어요", "제 친구는 잘생겼어요.", "Meu amigo é bonito.", "ser bonito", "Forma lexicalizada frequente para aparência; não é uma ação no passado."],
  ["a1-l12", "귀엽다", "ser fofo; ser fofa", "verbo", "귀여워요", "강아지가 귀여워요.", "O cachorrinho é fofo.", "ser fofo"],
  ["a1-l12", "재미있다", "ser interessante; ser divertido", "verbo", "재미있어요", "이 책은 재미있어요.", "Este livro é interessante.", "ser interessante"],
  ["a1-l12", "조용하다", "ser quieto; ser silencioso", "verbo", "조용해요", "이 방은 조용해요.", "Este quarto é silencioso.", "ser quieto"],
  ["a1-l12", "활발하다", "ser extrovertido; ser ativo", "verbo", "활발해요", "제 동생은 활발해요.", "Meu irmão mais novo é extrovertido.", "ser extrovertido"],
  ["a1-l12", "친절하다", "ser gentil", "verbo", "친절해요", "선생님은 친절해요.", "A professora é gentil.", "ser gentil"],
  ["a1-l12", "웃다", "sorrir; rir", "verbo", "웃어요", "친구가 웃어요.", "Meu amigo sorri.", "sorrir"],

  // a1-l13 — casa, cômodos e móveis
  ["a1-l13", "집", "casa", "substantivo", "집", "제 집은 여기예요.", "Minha casa é aqui.", "casa"],
  ["a1-l13", "거실", "sala de estar", "substantivo", "거실", "거실에 소파가 있어요.", "Há um sofá na sala.", "sala de estar"],
  ["a1-l13", "화장실", "banheiro", "substantivo", "화장실", "화장실이 어디예요?", "Onde fica o banheiro?", "banheiro"],
  ["a1-l13", "침실", "quarto de dormir", "substantivo", "침실", "침실에 침대가 있어요.", "Há uma cama no quarto.", "quarto de dormir"],
  ["a1-l13", "소파", "sofá", "substantivo", "소파", "거실에 소파가 있어요.", "Há um sofá na sala.", "sofá"],
  ["a1-l13", "냉장고", "geladeira", "substantivo", "냉장고", "부엌에 냉장고가 있어요.", "Há uma geladeira na cozinha.", "geladeira"],
  ["a1-l13", "창문", "janela", "substantivo", "창문", "방에 창문이 있어요.", "Há uma janela no quarto.", "janela"],
  ["a1-l13", "식탁", "mesa de jantar", "substantivo", "식탁", "식탁 위에 꽃이 있어요.", "Há flores em cima da mesa de jantar.", "mesa de jantar"],
  ["a1-l13", "옷장", "guarda-roupa", "substantivo", "옷장", "침실에 옷장이 있어요.", "Há um guarda-roupa no quarto.", "guarda-roupa"],
  ["a1-l13", "바닥", "chão", "substantivo", "바닥", "바닥에 가방이 있어요.", "Há uma mochila no chão.", "chão"],
  ["a1-l13", "벽", "parede", "substantivo", "벽", "벽에 시계가 있어요.", "Há um relógio na parede.", "parede"],
  ["a1-l13", "텔레비전", "televisão", "substantivo", "텔레비전", "거실에 텔레비전이 있어요.", "Há uma televisão na sala.", "televisão"],

  // a1-l14 — ações domésticas e objetos
  ["a1-l14", "요리하다", "cozinhar", "verbo", "요리해요", "저는 부엌에서 요리해요.", "Eu cozinho na cozinha.", "cozinhar"],
  ["a1-l14", "청소하다", "limpar; fazer limpeza", "verbo", "청소해요", "저는 거실에서 청소해요.", "Eu limpo a sala.", "limpar"],
  ["a1-l14", "빨래하다", "lavar roupa", "verbo", "빨래해요", "저는 화장실에서 빨래해요.", "Eu lavo roupa no banheiro.", "lavar roupa"],
  ["a1-l14", "설거지하다", "lavar a louça", "verbo", "설거지해요", "저는 부엌에서 설거지해요.", "Eu lavo a louça na cozinha.", "lavar a louça"],
  ["a1-l14", "읽다", "ler", "verbo", "읽어요", "저는 책을 읽어요.", "Eu leio um livro.", "ler"],
  ["a1-l14", "사용하다", "usar", "verbo", "사용해요", "저는 휴대폰을 사용해요.", "Eu uso o celular.", "usar"],
  ["a1-l14", "전화하다", "telefonar; ligar", "verbo", "전화해요", "저는 매일 전화해요.", "Eu telefono todos os dias.", "telefonar"],
  ["a1-l14", "이야기하다", "conversar; contar", "verbo", "이야기해요", "저는 거실에서 이야기해요.", "Eu converso na sala.", "conversar"],
  ["a1-l14", "도와주다", "ajudar", "verbo", "도와줘요", "저는 친구를 도와줘요.", "Eu ajudo meu amigo.", "ajudar"],
  ["a1-l14", "같이", "juntos; junto", "advérbio", "같이", "같이 청소해요.", "Limpamos juntos.", "juntos"],

  // a1-l15 — visita, hospitalidade e tratamento
  ["a1-l15", "어서 오세요", "bem-vindo; seja bem-vindo", "interjeição", "어서 오세요", "어서 오세요. 들어오세요.", "Bem-vindo. Entre.", "bem-vindo"],
  ["a1-l15", "들어오다", "entrar; vir para dentro", "verbo", "들어오세요", "어서 오세요. 들어오세요.", "Bem-vindo. Entre.", "entrar"],
  ["a1-l15", "앉으세요", "sente-se", "interjeição", "앉으세요", "여기 앉으세요.", "Sente-se aqui.", "sente-se"],
  ["a1-l15", "드세요", "coma; beba (forma honorífica)", "interjeição", "드세요", "물 드세요.", "Beba água.", "coma; beba"],
  ["a1-l15", "선물", "presente", "substantivo", "선물", "이것은 선물이에요.", "Isto é um presente.", "presente"],
  ["a1-l15", "초대", "convite", "substantivo", "초대", "오늘은 초대가 있어요.", "Hoje tenho um convite.", "convite"],
  ["a1-l15", "댁", "casa (forma honorífica)", "substantivo", "댁", "선생님 댁에 가요.", "Vou à casa da professora.", "casa (honorífico)"],
  ["a1-l15", "성함", "nome (forma honorífica)", "substantivo", "성함", "성함이 뭐예요?", "Qual é o seu nome?", "nome (honorífico)"],
  ["a1-l15", "처음", "primeira vez; começo", "substantivo", "처음", "처음이에요.", "É a primeira vez.", "primeira vez"],
  ["a1-l15", "환영합니다", "bem-vindo; damos as boas-vindas", "interjeição", "환영합니다", "환영합니다.", "Seja bem-vindo.", "bem-vindo"],
  ["a1-l15", "조심하다", "ter cuidado", "verbo", "조심해요", "길에서 조심해요.", "Tenha cuidado na rua.", "ter cuidado"],
  ["a1-l15", "기다리다", "esperar", "verbo", "기다려요", "조금 기다려요.", "Espere um pouco.", "esperar"],

  // a1-l16 — comida, bebida e preferências
  ["a1-l16", "음식", "comida", "substantivo", "음식", "한국 음식은 맛있어요.", "A comida coreana é saborosa.", "comida"],
  ["a1-l16", "과일", "fruta", "substantivo", "과일", "저는 과일을 좋아해요.", "Eu gosto de frutas.", "fruta"],
  ["a1-l16", "채소", "legume; verdura", "substantivo", "채소", "저는 채소를 좋아해요.", "Eu gosto de legumes.", "legume; verdura"],
  ["a1-l16", "생선", "peixe (alimento)", "substantivo", "생선", "저는 생선을 싫어해요.", "Eu não gosto de peixe.", "peixe"],
  ["a1-l16", "달다", "ser doce", "verbo", "달아요", "이 과일은 달아요.", "Esta fruta é doce.", "ser doce"],
  ["a1-l16", "맵다", "ser picante", "verbo", "매워요", "이 음식은 매워요.", "Esta comida é picante.", "ser picante"],
  ["a1-l16", "싫어하다", "não gostar de", "verbo", "싫어해요", "저는 생선을 싫어해요.", "Eu não gosto de peixe.", "não gostar"],
  ["a1-l16", "좋아하다", "gostar de", "verbo", "좋아해요", "저는 과일을 좋아해요.", "Eu gosto de frutas.", "gostar"],
  ["a1-l16", "어떤", "que tipo de; qual", "pronome", "어떤", "어떤 음식을 좋아해요?", "De que tipo de comida você gosta?", "que tipo de"],
  ["a1-l16", "맛있다", "ser saboroso; ser delicioso", "verbo", "맛있어요", "한국 음식은 맛있어요.", "A comida coreana é saborosa.", "ser saboroso"],
  ["a1-l16", "배고프다", "estar com fome", "verbo", "배고파요", "저는 배고파요.", "Estou com fome.", "estar com fome"],
  ["a1-l16", "배부르다", "estar satisfeito; estar cheio", "verbo", "배불러요", "저는 배불러요.", "Estou satisfeito.", "estar satisfeito"],

  // a1-l17 — pedidos em café e restaurante
  ["a1-l17", "메뉴", "cardápio; menu", "substantivo", "메뉴", "메뉴 주세요.", "O cardápio, por favor.", "cardápio"],
  ["a1-l17", "주문하다", "pedir; fazer um pedido", "verbo", "주문해요", "제가 주문해요.", "Eu faço o pedido.", "pedir"],
  ["a1-l17", "김치", "kimchi", "substantivo", "김치", "김치 주세요.", "Kimchi, por favor.", "kimchi"],
  ["a1-l17", "비빔밥", "bibimbap", "substantivo", "비빔밥", "비빔밥 하나 주세요.", "Um bibimbap, por favor.", "bibimbap"],
  ["a1-l17", "불고기", "bulgogi", "substantivo", "불고기", "불고기 하나 주세요.", "Um bulgogi, por favor.", "bulgogi"],
  ["a1-l17", "라면", "ramen; miojo coreano", "substantivo", "라면", "라면 하나 주세요.", "Um ramen, por favor.", "ramen"],
  ["a1-l17", "주스", "suco", "substantivo", "주스", "주스 하나 주세요.", "Um suco, por favor.", "suco"],
  ["a1-l17", "병", "garrafa", "substantivo", "병", "병이 여기 있어요.", "A garrafa está aqui.", "garrafa"],
  ["a1-l17", "잔", "copo; xícara", "substantivo", "잔", "잔이 여기 있어요.", "O copo está aqui.", "copo"],
  ["a1-l17", "계산서", "conta; fatura", "substantivo", "계산서", "계산서 주세요.", "A conta, por favor.", "conta"],
  ["a1-l17", "직원", "funcionário; funcionária", "substantivo", "직원", "직원이 친절해요.", "O funcionário é gentil.", "funcionário"],
  ["a1-l17", "잠시만요", "um instante, por favor", "interjeição", "잠시만요", "잠시만요.", "Um instante, por favor.", "um instante"],

  // a1-l18 — quantidade, preço e contadores
  ["a1-l18", "돈", "dinheiro", "substantivo", "돈", "돈이 있어요?", "Você tem dinheiro?", "dinheiro"],
  ["a1-l18", "원", "won (moeda coreana)", "substantivo", "원", "이것은 천 원이에요.", "Isto custa mil won.", "won"],
  ["a1-l18", "가격", "preço", "substantivo", "가격", "가격이 얼마예요?", "Qual é o preço?", "preço"],
  ["a1-l18", "얼마", "quanto", "pronome", "얼마", "얼마예요?", "Quanto custa?", "quanto"],
  ["a1-l18", "명", "contador de pessoas", "substantivo", "명", "학생이 세 명 있어요.", "Há três estudantes.", "contador de pessoas"],
  ["a1-l18", "비싸다", "ser caro", "verbo", "비싸요", "이 커피는 비싸요.", "Este café é caro.", "ser caro"],
  ["a1-l18", "전부", "tudo; total", "advérbio", "전부", "전부 얼마예요?", "Quanto é tudo?", "tudo; total"],
  ["a1-l18", "계산하다", "calcular; pagar a conta", "verbo", "계산해요", "제가 계산해요.", "Eu pago.", "calcular; pagar"],
  ["a1-l18", "카드", "cartão", "substantivo", "카드", "카드 있어요?", "Você tem cartão?", "cartão"],
  ["a1-l18", "현금", "dinheiro em espécie", "substantivo", "현금", "현금 있어요?", "Você tem dinheiro em espécie?", "dinheiro em espécie"],
  ["a1-l18", "받다", "receber", "verbo", "받아요", "돈을 받아요.", "Eu recebo o dinheiro.", "receber"],
  ["a1-l18", "봉투", "sacola; envelope", "substantivo", "봉투", "봉투 주세요.", "A sacola, por favor.", "sacola"],

  // a1-l19 — roupas, cores e tamanhos
  ["a1-l19", "바지", "calça", "substantivo", "바지", "이 바지는 커요.", "Esta calça é grande.", "calça"],
  ["a1-l19", "셔츠", "camisa", "substantivo", "셔츠", "이 셔츠는 작아요.", "Esta camisa é pequena.", "camisa"],
  ["a1-l19", "신발", "sapato", "substantivo", "신발", "이 신발은 예뻐요.", "Este sapato é bonito.", "sapato"],
  ["a1-l19", "모자", "chapéu; boné", "substantivo", "모자", "이 모자는 좋아요.", "Este chapéu é bom.", "chapéu"],
  ["a1-l19", "색", "cor", "substantivo", "색", "무슨 색이에요?", "De que cor é?", "cor"],
  ["a1-l19", "빨간색", "vermelho", "substantivo", "빨간색", "빨간색 주세요.", "O vermelho, por favor.", "vermelho"],
  ["a1-l19", "파란색", "azul", "substantivo", "파란색", "파란색 주세요.", "O azul, por favor.", "azul"],
  ["a1-l19", "검은색", "preto", "substantivo", "검은색", "검은색 주세요.", "O preto, por favor.", "preto"],
  ["a1-l19", "흰색", "branco", "substantivo", "흰색", "흰색 주세요.", "O branco, por favor.", "branco"],
  ["a1-l19", "사이즈", "tamanho", "substantivo", "사이즈", "사이즈가 뭐예요?", "Qual é o tamanho?", "tamanho"],
  ["a1-l19", "다른", "outro; outra", "pronome", "다른", "다른 색 있어요?", "Você tem outra cor?", "outro"],
  ["a1-l19", "더", "mais", "advérbio", "더", "더 큰 사이즈 있어요?", "Você tem um tamanho maior?", "mais"],
  ["a1-l19", "입어 보다", "experimentar roupa", "verbo", "입어 보세요", "입어 보세요.", "Experimente vestir.", "experimentar roupa"],

  // a1-l20 — desejo e escolha
  ["a1-l20", "원하다", "querer; desejar", "verbo", "원해요", "저는 커피를 원해요.", "Eu quero café.", "querer"],
  ["a1-l20", "배우다", "aprender", "verbo", "배워요", "저는 한국어를 배워요.", "Eu aprendo coreano.", "aprender"],
  ["a1-l20", "여행하다", "viajar", "verbo", "여행해요", "저는 가끔 여행해요.", "Eu viajo às vezes.", "viajar"],
  ["a1-l20", "만나다", "encontrar; encontrar-se com", "verbo", "만나요", "저는 친구를 만나요.", "Eu encontro meu amigo.", "encontrar"],
  ["a1-l20", "사다", "comprar", "verbo", "사요", "저는 과일을 사요.", "Eu compro frutas.", "comprar"],
  ["a1-l20", "팔다", "vender", "verbo", "팔아요", "저는 책을 팔아요.", "Eu vendo livros.", "vender"],
  ["a1-l20", "혼자", "sozinho; sozinha", "advérbio", "혼자", "저는 혼자 공부해요.", "Eu estudo sozinho.", "sozinho"],
  ["a1-l20", "결정하다", "decidir", "verbo", "결정해요", "저는 메뉴를 결정해요.", "Eu decido o cardápio.", "decidir"],
  ["a1-l20", "생각하다", "pensar", "verbo", "생각해요", "저는 자주 생각해요.", "Eu penso com frequência.", "pensar"],
  ["a1-l20", "고르다", "escolher", "verbo", "골라요", "저는 커피를 골라요.", "Eu escolho café.", "escolher"],

  // a1-l21 — lugares da cidade e destino
  ["a1-l21", "도서관", "biblioteca", "substantivo", "도서관", "저는 도서관에 가요.", "Eu vou à biblioteca.", "biblioteca"],
  ["a1-l21", "공원", "parque", "substantivo", "공원", "저는 공원에 가요.", "Eu vou ao parque.", "parque"],
  ["a1-l21", "식당", "restaurante", "substantivo", "식당", "저는 식당에 가요.", "Eu vou ao restaurante.", "restaurante"],
  ["a1-l21", "카페", "café (estabelecimento)", "substantivo", "카페", "저는 카페에 가요.", "Eu vou ao café.", "café (lugar)"],
  ["a1-l21", "병원", "hospital", "substantivo", "병원", "저는 병원에 가요.", "Eu vou ao hospital.", "hospital"],
  ["a1-l21", "시장", "mercado", "substantivo", "시장", "저는 시장에 가요.", "Eu vou ao mercado.", "mercado"],
  ["a1-l21", "은행", "banco (instituição)", "substantivo", "은행", "저는 은행에 가요.", "Eu vou ao banco.", "banco"],
  ["a1-l21", "역", "estação", "substantivo", "역", "저는 역에 가요.", "Eu vou à estação.", "estação"],
  ["a1-l21", "정류장", "parada (de ônibus)", "substantivo", "정류장", "저는 정류장에 가요.", "Eu vou à parada.", "parada"],
  ["a1-l21", "극장", "cinema; teatro", "substantivo", "극장", "저는 극장에 가요.", "Eu vou ao cinema.", "cinema; teatro"],
  ["a1-l21", "교실", "sala de aula", "substantivo", "교실", "저는 교실에 있어요.", "Eu estou na sala de aula.", "sala de aula"],
  ["a1-l21", "가게", "loja", "substantivo", "가게", "저는 가게에 가요.", "Eu vou à loja.", "loja"],

  // a1-l22 — transporte e duração
  ["a1-l22", "버스", "ônibus", "substantivo", "버스", "저는 버스로 가요.", "Eu vou de ônibus.", "ônibus"],
  ["a1-l22", "지하철", "metrô", "substantivo", "지하철", "저는 지하철로 가요.", "Eu vou de metrô.", "metrô"],
  ["a1-l22", "택시", "táxi", "substantivo", "택시", "저는 택시로 가요.", "Eu vou de táxi.", "táxi"],
  ["a1-l22", "자전거", "bicicleta", "substantivo", "자전거", "저는 자전거로 가요.", "Eu vou de bicicleta.", "bicicleta"],
  ["a1-l22", "걷다", "caminhar; andar a pé", "verbo", "걸어요", "저는 학교까지 걸어요.", "Eu vou a pé até a escola.", "caminhar"],
  ["a1-l22", "타다", "pegar; andar de", "verbo", "타요", "저는 버스를 타요.", "Eu pego o ônibus.", "pegar; andar de"],
  ["a1-l22", "걸리다", "levar (tempo)", "verbo", "걸려요", "삼십 분 걸려요.", "Leva trinta minutos.", "levar tempo"],
  ["a1-l22", "빠르다", "ser rápido", "verbo", "빨라요", "지하철은 빨라요.", "O metrô é rápido.", "ser rápido"],
  ["a1-l22", "느리다", "ser lento", "verbo", "느려요", "버스는 느려요.", "O ônibus é lento.", "ser lento"],
  ["a1-l22", "가깝다", "ser perto", "verbo", "가까워요", "역이 가까워요.", "A estação é perto.", "ser perto"],
  ["a1-l22", "멀다", "ser longe", "verbo", "멀어요", "학교가 멀어요.", "A escola é longe.", "ser longe"],
  ["a1-l22", "교통", "transporte; trânsito", "substantivo", "교통", "교통이 좋아요.", "O transporte é bom.", "transporte"],

  // a1-l23 — localização e direções
  ["a1-l23", "거리", "rua; avenida movimentada", "substantivo", "거리", "거리에 사람이 많아요.", "Há muita gente na rua.", "rua"],
  ["a1-l23", "사거리", "cruzamento de quatro vias", "substantivo", "사거리", "사거리에서 만나요.", "Encontro no cruzamento.", "cruzamento"],
  ["a1-l23", "약국", "farmácia", "substantivo", "약국", "약국이 어디에 있어요?", "Onde fica a farmácia?", "farmácia"],
  ["a1-l23", "편의점", "loja de conveniência", "substantivo", "편의점", "편의점이 가까워요.", "A loja de conveniência é perto.", "loja de conveniência"],
  ["a1-l23", "근처", "perto; vizinhança", "substantivo", "근처", "역 근처에 있어요.", "Fica perto da estação.", "perto; vizinhança"],
  ["a1-l23", "왼쪽", "esquerda", "substantivo", "왼쪽", "왼쪽으로 가세요.", "Vá para a esquerda.", "esquerda"],
  ["a1-l23", "오른쪽", "direita", "substantivo", "오른쪽", "오른쪽으로 가세요.", "Vá para a direita.", "direita"],
  ["a1-l23", "똑바로", "reto; em frente", "advérbio", "똑바로", "똑바로 가세요.", "Vá reto.", "reto"],
  ["a1-l23", "모퉁이", "esquina", "substantivo", "모퉁이", "모퉁이에서 기다려요.", "Espere na esquina.", "esquina"],
  ["a1-l23", "건너편", "do outro lado", "substantivo", "건너편", "건너편에 은행이 있어요.", "Há um banco do outro lado.", "do outro lado"],
  ["a1-l23", "지하", "subsolo", "substantivo", "지하", "지하에 있어요.", "Fica no subsolo.", "subsolo"],
  ["a1-l23", "층", "andar; pavimento", "substantivo", "층", "삼 층에 있어요.", "Fica no terceiro andar.", "andar"],

  // a1-l24 — instruções e deslocamento
  ["a1-l24", "돌다", "virar; girar", "verbo", "도세요", "오른쪽으로 도세요.", "Vire à direita.", "virar"],
  ["a1-l24", "건너다", "atravessar", "verbo", "건너세요", "길을 건너세요.", "Atravesse a rua.", "atravessar"],
  ["a1-l24", "멈추다", "parar", "verbo", "멈추세요", "여기에서 멈추세요.", "Pare aqui.", "parar"],
  ["a1-l24", "나가다", "sair", "verbo", "나가세요", "여기에서 나가세요.", "Saia por aqui.", "sair"],
  ["a1-l24", "계단", "escada", "substantivo", "계단", "계단으로 가세요.", "Vá pelas escadas.", "escada"],
  ["a1-l24", "엘리베이터", "elevador", "substantivo", "엘리베이터", "엘리베이터를 타세요.", "Pegue o elevador.", "elevador"],
  ["a1-l24", "신호등", "semáforo", "substantivo", "신호등", "신호등이 있어요.", "Há um semáforo.", "semáforo"],
  ["a1-l24", "횡단보도", "faixa de pedestres", "substantivo", "횡단보도", "횡단보도로 건너세요.", "Atravesse pela faixa de pedestres.", "faixa de pedestres"],
  ["a1-l24", "출구", "saída", "substantivo", "출구", "출구가 어디예요?", "Onde fica a saída?", "saída"],
  ["a1-l24", "입구", "entrada", "substantivo", "입구", "입구에 있어요.", "Fica na entrada.", "entrada"],
  ["a1-l24", "표", "bilhete; passagem", "substantivo", "표", "표 주세요.", "Um bilhete, por favor.", "bilhete"],

  // a1-l25 — encontro e sugestão
  ["a1-l25", "약속", "compromisso; encontro combinado", "substantivo", "약속", "약속이 있어요.", "Tenho um compromisso.", "compromisso"],
  ["a1-l25", "장소", "lugar; local", "substantivo", "장소", "장소가 어디예요?", "Qual é o lugar?", "lugar"],
  ["a1-l25", "조금", "um pouco", "advérbio", "조금", "조금 기다려요.", "Espere um pouco.", "um pouco"],
  ["a1-l25", "일찍", "cedo", "advérbio", "일찍", "일찍 만나요.", "Encontramos cedo.", "cedo"],
  ["a1-l25", "늦게", "tarde", "advérbio", "늦게", "늦게 만나요.", "Encontramos tarde.", "tarde"],
  ["a1-l25", "가능하다", "ser possível", "verbo", "가능해요", "내일 가능해요?", "Amanhã é possível?", "ser possível"],
  ["a1-l25", "미안하다", "sentir muito; desculpar-se", "verbo", "미안해요", "미안해요, 바빠요.", "Desculpe, estou ocupado.", "desculpar-se"],
  ["a1-l25", "다음", "próximo; seguinte", "substantivo", "다음", "다음에 만나요.", "Encontramos na próxima vez.", "próximo"],
  ["a1-l25", "모이다", "reunir-se; encontrar-se", "verbo", "모여요", "우리는 여기에서 모여요.", "Nós nos reunimos aqui.", "reunir-se"],
  ["a1-l25", "출발하다", "partir; sair (viagem)", "verbo", "출발해요", "우리는 여섯 시에 출발해요.", "Nós partimos às seis.", "partir"],

  // a1-l26 — hobbies, esportes e frequência
  ["a1-l26", "취미", "hobby; passatempo", "substantivo", "취미", "제 취미는 음악이에요.", "Meu hobby é música.", "hobby"],
  ["a1-l26", "운동", "exercício; esporte", "substantivo", "운동", "운동은 재미있어요.", "Exercício é divertido.", "exercício"],
  ["a1-l26", "축구", "futebol", "substantivo", "축구", "저는 축구를 좋아해요.", "Eu gosto de futebol.", "futebol"],
  ["a1-l26", "수영", "natação", "substantivo", "수영", "저는 수영을 좋아해요.", "Eu gosto de natação.", "natação"],
  ["a1-l26", "등산", "trilha; caminhada na montanha", "substantivo", "등산", "저는 등산을 좋아해요.", "Eu gosto de trilhas.", "trilha"],
  ["a1-l26", "게임", "jogo", "substantivo", "게임", "저는 게임을 좋아해요.", "Eu gosto de jogos.", "jogo"],
  ["a1-l26", "독서", "leitura", "substantivo", "독서", "저는 독서를 좋아해요.", "Eu gosto de leitura.", "leitura"],
  ["a1-l26", "그림", "desenho; pintura", "substantivo", "그림", "저는 그림을 좋아해요.", "Eu gosto de desenho.", "desenho"],
  ["a1-l26", "피아노", "piano", "substantivo", "피아노", "저는 피아노를 좋아해요.", "Eu gosto de piano.", "piano"],
  ["a1-l26", "노래", "canção; canto", "substantivo", "노래", "저는 노래를 좋아해요.", "Eu gosto de cantar.", "canção"],
  ["a1-l26", "춤", "dança", "substantivo", "춤", "저는 춤을 좋아해요.", "Eu gosto de dança.", "dança"],
  ["a1-l26", "여행", "viagem", "substantivo", "여행", "저는 여행을 좋아해요.", "Eu gosto de viagens.", "viagem"],
  ["a1-l26", "산책", "caminhada; passeio a pé", "substantivo", "산책", "저는 산책을 좋아해요.", "Eu gosto de caminhadas.", "caminhada"],

  // a1-l27 — capacidade, dificuldade e ajuda
  ["a1-l27", "잘하다", "fazer bem; ser bom em", "verbo", "잘해요", "저는 수영을 잘해요.", "Eu nado bem.", "fazer bem"],
  ["a1-l27", "못하다", "não conseguir fazer; ser ruim em", "verbo", "못해요", "저는 노래를 못해요.", "Eu não canto bem.", "não conseguir fazer"],
  ["a1-l27", "운전하다", "dirigir", "verbo", "운전해요", "저는 운전해요.", "Eu dirijo.", "dirigir"],
  ["a1-l27", "노래하다", "cantar", "verbo", "노래해요", "저는 노래해요.", "Eu canto.", "cantar"],
  ["a1-l27", "춤추다", "dançar", "verbo", "춤춰요", "저는 춤춰요.", "Eu danço.", "dançar"],
  ["a1-l27", "어렵다", "ser difícil", "verbo", "어려워요", "한국어는 어려워요.", "Coreano é difícil.", "ser difícil"],
  ["a1-l27", "쉽다", "ser fácil", "verbo", "쉬워요", "이것은 쉬워요.", "Isto é fácil.", "ser fácil"],
  ["a1-l27", "연습하다", "praticar; ensaiar", "verbo", "연습해요", "저는 매일 연습해요.", "Eu pratico todos os dias.", "praticar"],
  ["a1-l27", "가르치다", "ensinar", "verbo", "가르쳐요", "저는 한국어를 가르쳐요.", "Eu ensino coreano.", "ensinar"],
  ["a1-l27", "도움", "ajuda", "substantivo", "도움", "도움을 주세요.", "Ajude-me, por favor.", "ajuda"],
  ["a1-l27", "질문", "pergunta", "substantivo", "질문", "질문이 있어요.", "Tenho uma pergunta.", "pergunta"],

  // a1-l28 — convites, eventos e respostas
  ["a1-l28", "초대하다", "convidar", "verbo", "초대해요", "저는 친구를 초대해요.", "Eu convido meu amigo.", "convidar"],
  ["a1-l28", "영화관", "cinema (lugar)", "substantivo", "영화관", "우리는 영화관에 가요.", "Nós vamos ao cinema.", "cinema"],
  ["a1-l28", "콘서트", "concerto; show", "substantivo", "콘서트", "콘서트에 가요?", "Você vai ao show?", "show"],
  ["a1-l28", "전시회", "exposição", "substantivo", "전시회", "전시회에 가요?", "Você vai à exposição?", "exposição"],
  ["a1-l28", "파티", "festa", "substantivo", "파티", "파티에 가요?", "Você vai à festa?", "festa"],
  ["a1-l28", "생일", "aniversário", "substantivo", "생일", "오늘은 제 생일이에요.", "Hoje é meu aniversário.", "aniversário"],
  ["a1-l28", "준비하다", "preparar", "verbo", "준비해요", "저는 파티를 준비해요.", "Eu preparo a festa.", "preparar"],
  ["a1-l28", "참석하다", "participar; comparecer", "verbo", "참석해요", "저는 파티에 참석해요.", "Eu participo da festa.", "participar"],
  ["a1-l28", "약속하다", "combinar; prometer", "verbo", "약속해요", "우리는 약속해요.", "Nós combinamos.", "combinar"],
  ["a1-l28", "함께", "juntos; junto", "advérbio", "함께", "함께 가요.", "Vamos juntos.", "juntos"],

  // a1-l29 — planos e preparação
  ["a1-l29", "계획", "plano", "substantivo", "계획", "주말 계획이 있어요?", "Você tem planos para o fim de semana?", "plano"],
  ["a1-l29", "다음 주", "próxima semana", "substantivo", "다음 주", "다음 주에 여행해요.", "Na próxima semana, viajo.", "próxima semana"],
  ["a1-l29", "이번 주", "esta semana", "substantivo", "이번 주", "이번 주에 공부해요.", "Esta semana, estudo.", "esta semana"],
  ["a1-l29", "방학", "férias escolares", "substantivo", "방학", "방학에 여행해요.", "Nas férias escolares, viajo.", "férias escolares"],
  ["a1-l29", "휴가", "férias (de trabalho)", "substantivo", "휴가", "휴가에 여행해요.", "Nas férias, viajo.", "férias"],
  ["a1-l29", "출발", "partida; saída", "substantivo", "출발", "출발은 아홉 시예요.", "A partida é às nove.", "partida"],
  ["a1-l29", "도착", "chegada", "substantivo", "도착", "도착은 열두 시예요.", "A chegada é às doze.", "chegada"],
  ["a1-l29", "예약하다", "reservar", "verbo", "예약해요", "저는 표를 예약해요.", "Eu reservo o bilhete.", "reservar"],
  ["a1-l29", "짐", "bagagem", "substantivo", "짐", "짐이 많아요.", "Há muita bagagem.", "bagagem"],
  ["a1-l29", "일정", "agenda; programação", "substantivo", "일정", "일정이 있어요?", "Você tem uma agenda?", "agenda"],

  // a1-l30 — mensagens, mudanças e contato
  ["a1-l30", "메시지", "mensagem", "substantivo", "메시지", "메시지 보내요.", "Envio uma mensagem.", "mensagem"],
  ["a1-l30", "보내다", "enviar", "verbo", "보내요", "메시지 보내요.", "Envio uma mensagem.", "enviar"],
  ["a1-l30", "답장", "resposta; resposta a mensagem", "substantivo", "답장", "답장 보내요.", "Envio uma resposta.", "resposta"],
  ["a1-l30", "확인하다", "confirmar; verificar", "verbo", "확인해요", "메시지를 확인해요.", "Eu verifico a mensagem.", "confirmar"],
  ["a1-l30", "늦다", "atrasar; ser tarde", "verbo", "늦어요", "저는 조금 늦어요.", "Estou um pouco atrasado.", "atrasar"],
  ["a1-l30", "바꾸다", "mudar; trocar", "verbo", "바꿔요", "시간을 바꿔요.", "Mudo o horário.", "mudar"],
  ["a1-l30", "사과하다", "pedir desculpas", "verbo", "사과해요", "저는 사과해요.", "Eu peço desculpas.", "pedir desculpas"],
  ["a1-l30", "감사하다", "agradecer", "verbo", "감사해요", "정말 감사해요.", "Muito obrigado.", "agradecer"],
  ["a1-l30", "도착하다", "chegar", "verbo", "도착해요", "저는 여섯 시에 도착해요.", "Eu chego às seis.", "chegar"],
  ["a1-l30", "연락하다", "contatar; entrar em contato", "verbo", "연락해요", "저는 매일 연락해요.", "Eu entro em contato todos os dias.", "contatar"],
  ["a1-l30", "문제", "problema", "substantivo", "문제", "문제가 있어요.", "Há um problema.", "problema"],

  // a1-l31 — passado recente e visitas
  ["a1-l31", "어제", "ontem", "advérbio", "어제", "어제 공부했어요.", "Ontem eu estudei.", "ontem"],
  ["a1-l31", "지난주", "semana passada", "substantivo", "지난주", "지난주에 친구를 만났어요.", "Na semana passada, encontrei meu amigo.", "semana passada"],
  ["a1-l31", "지난달", "mês passado", "substantivo", "지난달", "지난달에 여행했어요.", "No mês passado, viajei.", "mês passado"],
  ["a1-l31", "지난해", "ano passado", "substantivo", "지난해", "지난해에 한국에 갔어요.", "No ano passado, fui à Coreia.", "ano passado"],
  ["a1-l31", "방문하다", "visitar", "verbo", "방문했어요", "저는 친구 집을 방문했어요.", "Eu visitei a casa do meu amigo.", "visitar"],
  ["a1-l31", "구경하다", "passear para ver; visitar como turista", "verbo", "구경했어요", "저는 시장을 구경했어요.", "Eu passei pelo mercado para ver.", "passear e ver"],
  ["a1-l31", "만들다", "fazer; criar; preparar", "verbo", "만들었어요", "저는 요리를 만들었어요.", "Eu preparei um prato.", "fazer; preparar"],
  ["a1-l31", "벌써", "já (antes do esperado)", "advérbio", "벌써", "벌써 도착했어요.", "Já cheguei.", "já"],
  ["a1-l31", "아직", "ainda", "advérbio", "아직", "아직 안 했어요.", "Ainda não fiz.", "ainda"],
  ["a1-l31", "그다음", "depois disso; em seguida", "advérbio", "그다음", "그다음에 쉬었어요.", "Depois disso, descansei.", "depois disso"],
  ["a1-l31", "머물다", "ficar; hospedar-se", "verbo", "머물렀어요", "저는 여기에 머물렀어요.", "Eu fiquei aqui.", "ficar; hospedar-se"],

  // a1-l32 — clima e estações
  ["a1-l32", "날씨", "tempo; clima", "substantivo", "날씨", "오늘 날씨가 좋아요.", "O tempo está bom hoje.", "tempo; clima"],
  ["a1-l32", "비", "chuva", "substantivo", "비", "비가 와요.", "Está chovendo.", "chuva"],
  ["a1-l32", "바람", "vento", "substantivo", "바람", "바람이 불어요.", "Está ventando.", "vento"],
  ["a1-l32", "구름", "nuvem", "substantivo", "구름", "구름이 많아요.", "Há muitas nuvens.", "nuvem"],
  ["a1-l32", "햇빛", "luz do sol", "substantivo", "햇빛", "햇빛이 좋아요.", "A luz do sol está boa.", "luz do sol"],
  ["a1-l32", "덥다", "estar quente (tempo)", "verbo", "더워요", "오늘은 더워요.", "Hoje está quente.", "estar quente"],
  ["a1-l32", "춥다", "estar frio", "verbo", "추워요", "겨울은 추워요.", "O inverno é frio.", "estar frio"],
  ["a1-l32", "따뜻하다", "estar morno; estar agradável", "verbo", "따뜻해요", "봄은 따뜻해요.", "A primavera é agradável.", "estar morno"],
  ["a1-l32", "시원하다", "estar fresco; ser refrescante", "verbo", "시원해요", "가을은 시원해요.", "O outono é fresco.", "estar fresco"],
  ["a1-l32", "봄", "primavera", "substantivo", "봄", "봄이에요.", "É primavera.", "primavera"],
  ["a1-l32", "여름", "verão", "substantivo", "여름", "여름은 더워요.", "O verão é quente.", "verão"],
  ["a1-l32", "가을", "outono", "substantivo", "가을", "가을은 시원해요.", "O outono é fresco.", "outono"],
  ["a1-l32", "겨울", "inverno", "substantivo", "겨울", "겨울은 추워요.", "O inverno é frio.", "inverno"],
  ["a1-l32", "많이", "muito; bastante", "advérbio", "많이", "비가 많이 와요.", "Está chovendo muito.", "muito"],

  // a1-l33 — corpo e sintomas
  ["a1-l33", "몸", "corpo", "substantivo", "몸", "몸이 아파요.", "Meu corpo dói.", "corpo"],
  ["a1-l33", "목", "pescoço; garganta", "substantivo", "목", "목이 아파요.", "Minha garganta dói.", "garganta"],
  ["a1-l33", "팔", "braço", "substantivo", "팔", "팔이 아파요.", "Meu braço dói.", "braço"],
  ["a1-l33", "손", "mão", "substantivo", "손", "손이 아파요.", "Minha mão dói.", "mão"],
  ["a1-l33", "발", "pé", "substantivo", "발", "발이 아파요.", "Meu pé dói.", "pé"],
  ["a1-l33", "어깨", "ombro", "substantivo", "어깨", "어깨가 아파요.", "Meu ombro dói.", "ombro"],
  ["a1-l33", "등", "costas", "substantivo", "등", "등이 아파요.", "Minhas costas doem.", "costas"],
  ["a1-l33", "증상", "sintoma", "substantivo", "증상", "증상이 뭐예요?", "Quais são os sintomas?", "sintoma"],
  ["a1-l33", "두통", "dor de cabeça", "substantivo", "두통", "두통이 있어요.", "Tenho dor de cabeça.", "dor de cabeça"],
  ["a1-l33", "열", "febre", "substantivo", "열", "열이 있어요.", "Tenho febre.", "febre"],
  ["a1-l33", "기침", "tosse", "substantivo", "기침", "기침이 있어요.", "Tenho tosse.", "tosse"],
  ["a1-l33", "감기", "resfriado", "substantivo", "감기", "감기약 있어요?", "Você tem remédio para resfriado?", "resfriado"],
  ["a1-l33", "약", "remédio", "substantivo", "약", "약이 있어요.", "Tenho remédio.", "remédio"],
  ["a1-l33", "피곤하다", "estar cansado", "verbo", "피곤해요", "저는 피곤해요.", "Estou cansado.", "estar cansado"],

  // a1-l34 — recomendações e proibições
  ["a1-l34", "피하다", "evitar", "verbo", "피하세요", "커피를 피하세요.", "Evite café.", "evitar"],
  ["a1-l34", "담배", "cigarro", "substantivo", "담배", "담배를 피우지 마세요.", "Não fume.", "cigarro"],
  ["a1-l34", "술", "álcool; bebida alcoólica", "substantivo", "술", "술을 마시지 마세요.", "Não beba álcool.", "álcool"],
  ["a1-l34", "잠", "sono", "substantivo", "잠", "잠을 자세요.", "Durma.", "sono"],
  ["a1-l34", "스트레스", "estresse", "substantivo", "스트레스", "스트레스가 있어요.", "Tenho estresse.", "estresse"],
  ["a1-l34", "건강", "saúde", "substantivo", "건강", "건강이 좋아요.", "A saúde está boa.", "saúde"],
  ["a1-l34", "회복하다", "recuperar-se", "verbo", "회복하세요", "빨리 회복하세요.", "Recupere-se rápido.", "recuperar-se"],
  ["a1-l34", "푹", "bem; profundamente", "advérbio", "푹", "푹 쉬세요.", "Descanse bem.", "bem; profundamente"],
  ["a1-l34", "조언", "conselho", "substantivo", "조언", "조언을 주세요.", "Dê-me um conselho.", "conselho"],
  ["a1-l34", "목욕하다", "tomar banho", "verbo", "목욕해요", "저는 저녁에 목욕해요.", "Eu tomo banho à noite.", "tomar banho"],

  // a1-l35 — relato de viagem e avaliação
  ["a1-l35", "관광지", "ponto turístico", "substantivo", "관광지", "서울은 관광지가 많아요.", "Seul tem muitos pontos turísticos.", "ponto turístico"],
  ["a1-l35", "찍다", "tirar (foto); fotografar", "verbo", "찍었어요", "저는 사진을 찍었어요.", "Eu tirei uma foto.", "tirar foto"],
  ["a1-l35", "아름답다", "ser bonito; ser belo", "verbo", "아름다워요", "바다가 아름다워요.", "O mar é bonito.", "ser bonito"],
  ["a1-l35", "즐겁다", "ser alegre; ser divertido", "verbo", "즐거웠어요", "여행은 즐거웠어요.", "A viagem foi divertida.", "ser divertido"],
  ["a1-l35", "기차", "trem", "substantivo", "기차", "기차로 갔어요.", "Fui de trem.", "trem"],
  ["a1-l35", "보트", "barco", "substantivo", "보트", "보트를 탔어요.", "Andei de barco.", "barco"],
  ["a1-l35", "비행기", "avião", "substantivo", "비행기", "비행기로 갔어요.", "Fui de avião.", "avião"],
  ["a1-l35", "호텔", "hotel", "substantivo", "호텔", "호텔에 머물렀어요.", "Fiquei no hotel.", "hotel"],
  ["a1-l35", "기념품", "lembrança; souvenir", "substantivo", "기념품", "기념품을 샀어요.", "Comprei uma lembrança.", "lembrança"],
  ["a1-l35", "입장권", "ingresso; bilhete de entrada", "substantivo", "입장권", "입장권을 샀어요.", "Comprei o ingresso.", "ingresso"],
  ["a1-l35", "여행사", "agência de viagens", "substantivo", "여행사", "여행사에 갔어요.", "Fui à agência de viagens.", "agência de viagens"],

  // a1-l36 — restaurante, restrições e alternativas
  ["a1-l36", "알레르기", "alergia", "substantivo", "알레르기", "알레르기가 있어요.", "Tenho alergia.", "alergia"],
  ["a1-l36", "돼지고기", "carne de porco", "substantivo", "돼지고기", "돼지고기 없어요?", "Você tem carne de porco?", "carne de porco"],
  ["a1-l36", "소고기", "carne bovina", "substantivo", "소고기", "소고기 주세요.", "Carne bovina, por favor.", "carne bovina"],
  ["a1-l36", "닭고기", "carne de frango", "substantivo", "닭고기", "닭고기 주세요.", "Carne de frango, por favor.", "carne de frango"],
  ["a1-l36", "채식", "vegetariano; alimentação vegetariana", "substantivo", "채식", "채식 메뉴 있어요?", "Você tem menu vegetariano?", "vegetariano"],
  ["a1-l36", "대신", "em vez de", "advérbio", "대신", "소고기 대신 닭고기 주세요.", "Carne de frango em vez de carne bovina, por favor.", "em vez de"],
  ["a1-l36", "빼다", "tirar; remover", "verbo", "빼 주세요", "고기를 빼 주세요.", "Tire a carne, por favor.", "tirar; remover"],
  ["a1-l36", "매운맛", "sabor picante", "substantivo", "매운맛", "매운맛은 싫어요.", "Não gosto do sabor picante.", "sabor picante"],
  ["a1-l36", "순한맛", "sabor suave", "substantivo", "순한맛", "순한맛 주세요.", "O sabor suave, por favor.", "sabor suave"],
  ["a1-l36", "음료", "bebida", "substantivo", "음료", "음료는 뭐예요?", "Qual é a bebida?", "bebida"],

  // a1-l37 — estação, plataforma e mudanças
  ["a1-l37", "승강장", "plataforma (de trem/metrô)", "substantivo", "승강장", "승강장이 어디예요?", "Onde fica a plataforma?", "plataforma"],
  ["a1-l37", "개찰구", "catraca; portão de embarque", "substantivo", "개찰구", "개찰구에서 기다려요.", "Espere na catraca.", "catraca"],
  ["a1-l37", "환승하다", "fazer baldeação; transferir", "verbo", "환승해요", "저는 여기에서 환승해요.", "Eu faço baldeação aqui.", "fazer baldeação"],
  ["a1-l37", "노선", "linha (de transporte)", "substantivo", "노선", "이 노선은 역에 가요.", "Esta linha vai à estação.", "linha"],
  ["a1-l37", "지연되다", "atrasar; sofrer atraso", "verbo", "지연돼요", "기차가 지연돼요.", "O trem está atrasado.", "atrasar"],
  ["a1-l37", "안내소", "posto de informação", "substantivo", "안내소", "안내소에 가세요.", "Vá ao posto de informação.", "posto de informação"],
  ["a1-l37", "닫다", "fechar", "verbo", "닫아요", "문을 닫아요.", "Fecho a porta.", "fechar"],
  ["a1-l37", "열다", "abrir", "verbo", "열어요", "문을 열어요.", "Abro a porta.", "abrir"],
  ["a1-l37", "첫차", "primeiro trem; primeira condução", "substantivo", "첫차", "첫차는 여섯 시예요.", "O primeiro trem é às seis.", "primeiro trem"],
  ["a1-l37", "막차", "último trem; última condução", "substantivo", "막차", "막차는 열두 시예요.", "O último trem é às doze.", "último trem"],

  // a1-l38 — contato, confirmação e remarcação
  ["a1-l38", "변경", "mudança; alteração", "substantivo", "변경", "시간 변경이 있어요.", "Há uma mudança de horário.", "mudança"],
  ["a1-l38", "취소하다", "cancelar", "verbo", "취소해요", "저는 약속을 취소해요.", "Eu cancelo o compromisso.", "cancelar"],
  ["a1-l38", "사정", "circunstância; motivo pessoal", "substantivo", "사정", "사정이 있어요.", "Tenho uma circunstância.", "circunstância"],
  ["a1-l38", "양해", "compreensão; entendimento", "substantivo", "양해", "양해해 주세요.", "Compreenda, por favor.", "compreensão"],
  ["a1-l38", "정말", "realmente; de verdade", "advérbio", "정말", "정말 미안해요.", "Sinto muito mesmo.", "realmente"],
  ["a1-l38", "걱정하다", "preocupar-se", "verbo", "걱정해요", "저는 걱정해요.", "Eu me preocupo.", "preocupar-se"],
  ["a1-l38", "연락처", "contato; dados de contato", "substantivo", "연락처", "연락처를 주세요.", "Dê-me seu contato, por favor.", "contato"],
  ["a1-l38", "전하다", "transmitir; passar uma mensagem", "verbo", "전해요", "메시지를 전해요.", "Transmito a mensagem.", "transmitir"],

  // a1-l39 — perfil e consolidação pessoal
  ["a1-l39", "프로필", "perfil", "substantivo", "프로필", "제 프로필을 소개해요.", "Apresento meu perfil.", "perfil"],
  ["a1-l39", "자기소개", "apresentação pessoal", "substantivo", "자기소개", "자기소개를 해요.", "Faço minha apresentação.", "apresentação pessoal"],
  ["a1-l39", "성격", "personalidade", "substantivo", "성격", "제 성격은 조용해요.", "Minha personalidade é quieta.", "personalidade"],
  ["a1-l39", "관심사", "interesses", "substantivo", "관심사", "제 관심사는 음악이에요.", "Meu interesse é música.", "interesses"],
  ["a1-l39", "경험", "experiência", "substantivo", "경험", "여행 경험이 있어요.", "Tenho experiência de viagem.", "experiência"],
  ["a1-l39", "목표", "objetivo; meta", "substantivo", "목표", "제 목표는 한국어 공부예요.", "Meu objetivo é estudar coreano.", "objetivo"],
  ["a1-l39", "꿈", "sonho", "substantivo", "꿈", "제 꿈은 선생님이에요.", "Meu sonho é ser professor.", "sonho"],
  ["a1-l39", "소개하다", "apresentar", "verbo", "소개해요", "제 친구를 소개해요.", "Apresento meu amigo.", "apresentar"],

  // a1-l40 — reparo e consolidação final
  ["a1-l40", "다시 한번", "mais uma vez", "advérbio", "다시 한번", "다시 한번 말해 주세요.", "Fale mais uma vez, por favor.", "mais uma vez"],
  ["a1-l40", "무슨 뜻이에요", "o que significa", "interjeição", "무슨 뜻이에요", "이 말은 무슨 뜻이에요?", "O que significa esta palavra?", "o que significa"],
  ["a1-l40", "어떻게 말해요", "como se diz", "interjeição", "어떻게 말해요", "한국어로 어떻게 말해요?", "Como se diz em coreano?", "como se diz"],
  ["a1-l40", "이해가 안 돼요", "não entendi; não faz sentido para mim", "interjeição", "이해가 안 돼요", "이해가 안 돼요.", "Não entendi.", "não entendi"],
  ["a1-l40", "문제없어요", "sem problema; não há problema", "interjeição", "문제없어요", "문제없어요.", "Sem problema.", "sem problema"],
];

export const A1_COURSE_VOCABULARY: readonly VocabEntry[] = ROWS.map(
  ([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`,
    ko,
    pt,
    pos,
    course: "ko-a1",
    lesson,
    audioText: ko,
    ...(notes ? { notes } : {}),
    review,
  }),
);

export const A1_COURSE_SENTENCES: readonly VocabSentence[] = ROWS.map(
  ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
    id: `sent:${lesson}:${ko}`,
    vocabId: `ko:${ko}`,
    ko: koSentence,
    pt: ptSentence,
    target,
    contextMeaning,
    review: {
      status: "in-review",
      notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
    },
  }),
);

const ROWS_BY_LESSON = new Map<string, Row[]>();
for (const row of ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newVocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function sentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}

export function newVocabFormsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => row[1]);
}
