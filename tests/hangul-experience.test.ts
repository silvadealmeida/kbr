import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { PronunciationLayers } from "@/components/hangul/PronunciationLayers";
import { SoundMap } from "@/components/hangul/SoundMap";
import { SyllableAnatomy } from "@/components/hangul/SyllableAnatomy";
import { SyllableBuilder } from "@/components/hangul/SyllableBuilder";
import { AudioControl } from "@/components/hangul/exercise-media";
import { ExerciseView } from "@/components/hangul/exercise-ui";
import { PlayerHeader } from "@/components/hangul/player-header";
import { RULES } from "@/content/hangul/rules";
import {
  checkAnswer,
  type BuildSyllableExercise,
  type ExerciseSpec,
} from "@/lib/exercises";

const render = (element: React.ReactElement) => renderToStaticMarkup(element);

const noFinal: BuildSyllableExercise = {
  id: "test-build-cv",
  type: "build-syllable",
  prompt: "Monte a sílaba 가.",
  initial: "ㄱ",
  medial: "ㅏ",
  initialOptions: ["ㄱ", "ㄴ"],
  medialOptions: ["ㅏ", "ㅓ"],
  tags: ["build"],
};

const withFinal: BuildSyllableExercise = {
  id: "test-build-cvc",
  type: "build-syllable",
  prompt: "Monte a sílaba 강.",
  initial: "ㄱ",
  medial: "ㅏ",
  final: "ㅇ",
  initialOptions: ["ㄱ", "ㄴ"],
  medialOptions: ["ㅏ", "ㅓ"],
  finalOptions: ["ㅇ", "ㄴ"],
  tags: ["build"],
};

const viewProps = {
  index: 0,
  total: 4,
  draft: null,
  result: null,
  onDraft: () => {},
  onSubmit: () => {},
  onContinue: () => {},
  isLast: false,
};

describe("bancada de composição", () => {
  test("mostra as três zonas mesmo quando a sílaba não pede final", () => {
    const html = render(
      createElement(SyllableBuilder, {
        exercise: noFinal,
        disabled: false,
        onChange: () => {},
      }),
    );

    expect(html).toContain("Bancada de composição");
    expect(html).toContain("Consoante inicial");
    expect(html).toContain("Vogal");
    expect(html).toContain("final opcional");
    expect(html).toContain("sem final");
    expect(html).not.toContain("Consoante final");
  });

  test("pede o final quando o exercício tem batchim e mantém os grupos nomeados", () => {
    const html = render(
      createElement(SyllableBuilder, {
        exercise: withFinal,
        disabled: false,
        onChange: () => {},
      }),
    );

    expect(html).toContain("Consoante inicial");
    expect(html).toContain("Vogal");
    expect(html).toContain("Consoante final");
    expect(html).toContain("final</span>");
    expect(html).toContain('aria-pressed="false"');
  });

  test("mantém alvos de toque de pelo menos 44 px e instrução sem arrastar", () => {
    const html = render(
      createElement(SyllableBuilder, {
        exercise: withFinal,
        disabled: false,
        onChange: () => {},
      }),
    );

    expect(html).toContain("min-h-12");
    expect(html).toContain("Use Tab e");
    expect(html).not.toContain("draggable");
  });
});

describe("camadas de pronúncia", () => {
  test("mostra escrita, fala e explicação sem depender de revelação", () => {
    const rule = RULES[0]!;
    const html = render(
      createElement(PronunciationLayers, {
        rule,
        examples: rule.examples,
      }),
    );

    expect(html).toContain("Camadas de pronúncia: 한국어");
    expect(html).toContain("Forma escrita");
    expect(html).toContain("Forma falada aproximada");
    expect(html).toContain("한국어");
    expect(html).toContain("muda na fala");
    expect(html).toContain("passa para");
    expect(html).toContain("em revisão");
    expect(html).toContain("Transcrição didática em revisão");
    expect(html).toContain("Ver comparação por bloco");
    expect(html).not.toContain("Ver forma falada");
  });

  test("expõe o status in-review e a comparação por bloco como detalhe opcional", () => {
    const rule = RULES[0]!;
    const html = render(createElement(PronunciationLayers, { rule }));

    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("Bloco com contorno e fundo");
    expect(html).toContain("Ouvir a forma falada");
  });
});

describe("anatomia da sílaba", () => {
  test("mostra bloco montado, peças separadas e explicação estática", () => {
    const html = render(createElement(SyllableAnatomy));

    expect(html).toContain("Uma sílaba, três posições");
    expect(html).toContain("Ordem de composição");
    expect(html).toContain("Ver peças separadas");
    expect(html).toContain('aria-pressed="false"');
    expect(html).toContain('role="img"');
    expect(html).toContain("ㅎ na posição inicial");
    expect(html).toContain("Ocupa o canto superior esquerdo do bloco.");
    expect(html).toContain("Fecha o bloco por baixo");
    expect(html).toContain("Conteúdo em revisão · h18");
    expect(html).toContain('lang="ko"');
    expect(html).toContain("Ouvir a sílaba 한");
    expect(html).toContain("O áudio gravado tem prioridade");
    expect(html).toContain("Conteúdo em revisão");
    expect(html).not.toContain("draggable");
  });

  test("mantém três botões de parte com alvo de 44 px e estado acessível", () => {
    const html = render(createElement(SyllableAnatomy));

    expect(html).toContain("min-h-12");
    expect(html).toContain("Inicial");
    expect(html).toContain("Medial");
    expect(html).toContain("Final");
    expect(html.match(/aria-pressed="false"/g)?.length).toBeGreaterThanOrEqual(3);
    expect(html).toContain("Ver peças separadas");
  });
});

describe("mapa de sons", () => {
  test("deriva 19 consoantes e 21 vogais do conteúdo existente", () => {
    const html = render(createElement(SoundMap));

    expect(html).toContain("<details");
    expect(html).toContain("Mapa de sons · 40 jamo");
    expect(html).toContain("Consoantes · 19");
    expect(html).toContain("Vogais · 21");
    expect(html).toContain("não é uma tabela fonética completa");
    expect(html).toContain("em revisão");
    expect(html).toContain("h02");
    expect(html).toContain('lang="ko"');
    expect(html).not.toContain("<audio");
  });
});

describe("apresentação dos exercícios", () => {
  test("mostra progresso com texto acessível e alternativas agrupadas", () => {
    const exercise: ExerciseSpec = {
      id: "test-mcq",
      type: "mcq",
      prompt: "Qual é a vogal?",
      options: ["ㅏ", "ㅓ"],
      correctAnswer: "ㅏ",
      tags: [],
    };

    const html = render(
      createElement(ExerciseView, {
        ...viewProps,
        exercise,
      }),
    );

    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-valuetext="0 de 4 concluídos"');
    expect(html).toContain('aria-label="Alternativas"');
    expect(html).toContain("Conferir");
    expect(html).toContain("A primeira tentativa é a que conta");
  });

  test("feedback usa status, ícone e texto; não depende só de cor", () => {
    const exercise: ExerciseSpec = {
      id: "test-mcq-feedback",
      type: "mcq",
      prompt: "Qual é a vogal?",
      options: ["ㅏ", "ㅓ"],
      correctAnswer: "ㅏ",
      tags: [],
    };
    const result = checkAnswer(exercise, { kind: "text", value: "ㅓ" });

    const html = render(
      createElement(ExerciseView, {
        ...viewProps,
        exercise,
        draft: { kind: "text", value: "ㅓ" },
        result,
      }),
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("Ainda não.");
    expect(html).toContain("Resposta correta:");
    expect(html).toContain("Sua resposta:");
    expect(html).toContain("Resultado");
    expect(html).toContain("Continuar");
    expect(html).not.toContain("Conferir<");
  });

  test("cobre a apresentação dos nove tipos sem alterar o contrato", () => {
    const exercises: ExerciseSpec[] = [
      {
        id: "mcq",
        type: "mcq",
        prompt: "Escolha.",
        options: ["a", "b"],
        correctAnswer: "a",
        tags: [],
      },
      {
        id: "cloze",
        type: "cloze",
        prompt: "Complete.",
        answer: "가",
        tags: [],
      },
      {
        id: "listen",
        type: "listen",
        prompt: "Ouça.",
        answer: "가",
        audioText: "가",
        tags: [],
      },
      {
        id: "translate",
        type: "translate",
        prompt: "Traduza.",
        answer: "pessoa",
        direction: "ko-pt",
        tags: [],
      },
      {
        id: "audio-to-char",
        type: "audio-to-char",
        prompt: "Ouça e escolha.",
        audioText: "가",
        fallback: "som de ㄱ",
        options: [
          { id: "a", jamo: "가" },
          { id: "b", jamo: "나" },
        ],
        correctOptionId: "a",
        tags: [],
      },
      {
        id: "char-to-audio",
        type: "char-to-audio",
        prompt: "Como soa?",
        text: "가",
        options: [
          { id: "a", audioText: "가", label: "ga" },
          { id: "b", audioText: "나", label: "na" },
        ],
        correctOptionId: "a",
        tags: [],
      },
      {
        id: "minimal-pair",
        type: "minimal-pair",
        prompt: "Contraste.",
        presentation: "text",
        text: "가 / 카",
        options: [
          { id: "a", label: "가" },
          { id: "b", label: "카" },
        ],
        correctOptionId: "a",
        contrast: { feature: "aspiração", a: "ㄱ", b: "ㅋ" },
        tags: [],
      },
      {
        id: "reading",
        type: "reading",
        prompt: "Leia.",
        text: "가",
        mode: "mcq",
        options: [
          { id: "a", label: "ga" },
          { id: "b", label: "na" },
        ],
        correctOptionId: "a",
        tags: [],
      },
      withFinal,
    ];

    const labels = exercises.map((exercise) =>
      render(
        createElement(ExerciseView, {
          ...viewProps,
          exercise,
        }),
      ),
    );

    expect(labels[0]).toContain("Alternativas");
    expect(labels[1]).toContain("Sua resposta");
    expect(labels[2]).toContain("Ouvir o áudio");
    expect(labels[3]).toContain("Sua resposta");
    expect(labels[4]).toContain("Ouvir o áudio");
    expect(labels[5]).toContain("Leia a sílaba");
    expect(labels[6]).toContain("Contraste");
    expect(labels[7]).toContain("Texto para ler");
    expect(labels[8]).toContain("Bancada de composição");
  });
});

describe("moldura do player", () => {
  test("checkpoint usa o tom de selo e o título compacto da prática", () => {
    const html = render(
      createElement(PlayerHeader, {
        tone: "checkpoint",
        compact: true,
        code: "checkpoint c1",
        eyebrow: "Checkpoint / avaliação",
        title: "Checkpoint 1 — consoantes e primeiras vogais",
        titleId: "checkpoint-title",
        meta: "Aprovação 19/20",
      }),
    );

    expect(html).toContain("text-seal");
    expect(html).toContain("border-seal");
    expect(html).toContain("text-xl");
    expect(html).toContain('id="checkpoint-title"');
    expect(html).toContain("← Hangul");
  });
});

describe("controle de áudio", () => {
  test("renderiza botão principal, velocidade lenta e nenhum sucesso falso", () => {
    const html = render(
      createElement(AudioControl, {
        text: "한",
        label: "Ouvir a sílaba 한",
      }),
    );

    expect(html).toContain("Ouvir a sílaba 한");
    expect(html).toContain("0,75×");
    expect(html).toContain('aria-pressed="false"');
    expect(html).not.toContain("Reproduzindo");
    expect(html).not.toContain("<audio");
  });
});
