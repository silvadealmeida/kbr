import type { A2VocabRow } from "./a2-shared";

/** Vocabulário do Módulo 6 do A2 — viagem e serviços. */
export const A2_M06_ROWS: readonly A2VocabRow[] = [
  // a2-l26 — reserva de hotel
  ["a2-l26", "체크인", "check-in", "substantivo", "체크인", "체크인은 세 시부터예요.", "O check-in começa às três.", "check-in"],
  ["a2-l26", "체크아웃", "check-out", "substantivo", "체크아웃", "체크아웃은 열한 시예요.", "O check-out é às onze.", "check-out"],
  ["a2-l26", "조식", "café da manhã incluso", "substantivo", "조식", "조식이 포함되어 있어요.", "O café da manhã está incluído.", "café da manhã"],
  ["a2-l26", "수영장", "piscina", "substantivo", "수영장", "수영장은 몇 층에 있어요?", "Em que andar fica a piscina?", "piscina"],
  ["a2-l26", "와이파이", "wi-fi", "substantivo", "와이파이", "와이파이 비밀번호를 알려 주세요.", "Informe a senha do wi-fi, por favor.", "wi-fi"],
  ["a2-l26", "객실", "quarto de hotel; cabine", "substantivo", "객실", "객실을 바꿀 수 있을까요?", "Posso trocar de quarto?", "quarto de hotel"],
  ["a2-l26", "예약금", "depósito de reserva", "substantivo", "예약금", "예약금을 카드로 냈어요.", "Paguei o depósito com cartão.", "depósito de reserva"],
  ["a2-l26", "환불", "reembolso", "substantivo", "환불", "환불 규정을 확인해 주세요.", "Verifique a política de reembolso.", "reembolso"],
  ["a2-l26", "연박", "estadia de várias noites", "substantivo", "연박", "이틀 연박하고 싶어요.", "Quero ficar duas noites.", "estadia de várias noites"],
  ["a2-l26", "투숙객", "hóspede", "substantivo", "투숙객", "투숙객은 무료로 주차할 수 있어요.", "Hóspedes podem estacionar gratuitamente.", "hóspede"],

  // a2-l27 — aeroporto
  ["a2-l27", "공항", "aeroporto", "substantivo", "공항", "공항까지 한 시간 걸려요.", "Leva uma hora até o aeroporto.", "aeroporto"],
  ["a2-l27", "탑승", "embarque", "substantivo", "탑승", "탑승 시간이 십 분 남았어요.", "Faltam dez minutos para o embarque.", "embarque"],
  ["a2-l27", "탑승구", "portão de embarque", "substantivo", "탑승구", "탑승구가 바뀌었어요.", "O portão de embarque mudou.", "portão de embarque"],
  ["a2-l27", "수하물", "bagagem despachada", "substantivo", "수하물", "수하물을 부쳐야 해요.", "Preciso despachar a bagagem.", "bagagem"],
  ["a2-l27", "보안검색", "controle de segurança", "substantivo", "보안검색", "보안검색 후에 면세점에 가세요.", "Depois do controle de segurança, vá à loja duty-free.", "controle de segurança"],
  ["a2-l27", "면세점", "loja duty-free", "substantivo", "면세점", "면세점에서 선물을 샀어요.", "Comprei um presente na loja duty-free.", "loja duty-free"],
  ["a2-l27", "탑승권", "cartão de embarque", "substantivo", "탑승권", "탑승권을 보여 주세요.", "Mostre o cartão de embarque, por favor.", "cartão de embarque"],
  ["a2-l27", "국제선", "voo internacional", "substantivo", "국제선", "국제선은 이쪽이에요.", "Os voos internacionais são por aqui.", "voo internacional"],
  ["a2-l27", "국내선", "voo doméstico", "substantivo", "국내선", "국내선은 다른 건물이에요.", "Os voos domésticos ficam em outro prédio.", "voo doméstico"],
  ["a2-l27", "기내", "interior da aeronave", "substantivo", "기내", "기내에서 물을 마셨어요.", "Bebi água dentro do avião.", "interior da aeronave"],

  // a2-l28 — imprevisto de viagem
  ["a2-l28", "잃어버리다", "perder", "verbo", "잃어버렸어요", "공항에서 가방을 잃어버렸어요.", "Perdi a bolsa no aeroporto.", "perder", "Forma de dicionário; a frase usa 잃어버렸어요."],
  ["a2-l28", "도난", "roubo", "substantivo", "도난", "도난 신고를 했어요.", "Registrei um boletim de roubo.", "roubo"],
  ["a2-l28", "경찰", "polícia", "substantivo", "경찰", "경찰에 신고했어요.", "Comunicei à polícia.", "polícia"],
  ["a2-l28", "신고", "denúncia; comunicação oficial", "substantivo", "신고", "분실 신고를 어디에서 해요?", "Onde faço a comunicação de perda?", "comunicação oficial"],
  ["a2-l28", "보상", "compensação; indenização", "substantivo", "보상", "보상을 받을 수 있을까요?", "Posso receber compensação?", "compensação"],
  ["a2-l28", "보험", "seguro", "substantivo", "보험", "여행자 보험에 가입했어요.", "Contratei seguro de viagem.", "seguro"],
  ["a2-l28", "분실", "perda de objeto", "substantivo", "분실", "분실물 센터에 문의했어요.", "Perguntei no setor de achados e perdidos.", "perda"],
  ["a2-l28", "습득", "achado; recolhimento de objeto", "substantivo", "습득한", "습득한 물건은 안내소에 맡기세요.", "Entregue o objeto encontrado no balcão de informações.", "achado"],
  ["a2-l28", "긴급", "emergência; urgente", "substantivo", "긴급", "긴급 상황이 아니에요.", "Não é uma emergência.", "emergência"],
  ["a2-l28", "상황", "situação", "substantivo", "상황", "상황을 자세히 설명해 주세요.", "Explique a situação em detalhes.", "situação"],

  // a2-l29 — recomendações
  ["a2-l29", "추천", "recomendação", "substantivo", "추천해", "좋은 식당을 추천해 주세요.", "Recomende um bom restaurante.", "recomendação"],
  ["a2-l29", "걸어가다", "ir a pé", "verbo", "걸어가면", "역에서 걸어가면 십 분이에요.", "A pé da estação leva dez minutos.", "ir a pé", "Forma de dicionário; a frase usa 걸어가면."],
  ["a2-l29", "입장료", "taxa de entrada; ingresso", "substantivo", "입장료", "입장료가 얼마예요?", "Quanto é a entrada?", "taxa de entrada"],
  ["a2-l29", "할인", "desconto", "substantivo", "할인", "학생은 할인이 있어요.", "Estudantes têm desconto.", "desconto"],
  ["a2-l29", "무료", "gratuito", "substantivo", "무료", "오늘은 무료예요.", "Hoje é gratuito.", "gratuito"],
  ["a2-l29", "인기", "popularidade", "substantivo", "인기", "이 카페는 인기가 많아요.", "Este café é muito popular.", "popularidade"],
  ["a2-l29", "분위기", "atmosfera; clima", "substantivo", "분위기", "분위기가 좋은 곳이에요.", "É um lugar com boa atmosfera.", "atmosfera"],
  ["a2-l29", "추천하다", "recomendar", "verbo", "추천했어요", "친구에게 이 책을 추천했어요.", "Recomendei este livro a um amigo.", "recomendar", "Forma de dicionário; a frase usa 추천했어요."],
  ["a2-l29", "현지", "local; no local", "substantivo", "현지", "현지 음식을 먹어 봤어요.", "Experimentei a comida local.", "local"],
  ["a2-l29", "가볼 만하다", "valer a pena visitar", "verbo", "가볼 만해요", "이곳은 정말 가볼 만해요.", "Vale muito a pena visitar este lugar.", "valer a pena visitar"],

  // a2-l30 — relato de viagem
  ["a2-l30", "힘들다", "ser difícil; ser cansativo", "verbo", "힘들었어요", "여행이 조금 힘들었어요.", "A viagem foi um pouco cansativa.", "ser cansativo", "Forma de dicionário; a frase usa 힘들었어요."],
  ["a2-l30", "추억", "memória afetiva; lembrança", "substantivo", "추억", "좋은 추억을 만들었어요.", "Criei boas lembranças.", "lembrança"],
  ["a2-l30", "여정", "jornada; itinerário", "substantivo", "여정", "긴 여정이었지만 즐거웠어요.", "Foi uma jornada longa, mas agradável.", "jornada"],
  ["a2-l30", "일행", "acompanhante; grupo de viagem", "substantivo", "일행", "일행이 세 명이에요.", "Somos três acompanhantes.", "acompanhante"],
  ["a2-l30", "사건", "incidente; acontecimento", "substantivo", "사건", "여행 중에 작은 사건이 있었어요.", "Houve um pequeno incidente durante a viagem.", "incidente"],
  ["a2-l30", "감동", "emoção; comoção", "substantivo", "감동", "그 장면은 정말 감동이었어요.", "Aquela cena foi realmente emocionante.", "emoção"],
  ["a2-l30", "만족", "satisfação", "substantivo", "만족했어요", "숙소에 만족했어요.", "Fiquei satisfeito com a hospedagem.", "satisfação"],
  ["a2-l30", "후기", "avaliação; resenha", "substantivo", "후기", "후기를 읽고 예약했어요.", "Li a avaliação e reservei.", "avaliação"],
  ["a2-l30", "별점", "avaliação por estrelas", "substantivo", "별점", "별점을 다섯 개 줬어요.", "Dei cinco estrelas.", "avaliação por estrelas"],
  ["a2-l30", "떠나다", "partir; sair de", "verbo", "떠났어요", "어제 부산을 떠났어요.", "Ontem parti de Busan.", "partir", "Forma de dicionário; a frase usa 떠났어요."],
];
