"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AudioControl, BilingualText, ExerciseView } from "@/components/hangul/exercise-ui";
import { PlayerHeader } from "@/components/hangul/player-header";
import { LessonVocabulary } from "@/components/vocabulary/LessonVocabulary";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import type { A1LessonContent } from "@/content/curriculum/a1/types";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import {
  a1RequiredCorrect,
  completeA1Lesson,
  evaluateA1Lesson,
  type A1LessonResult,
} from "@/lib/a1/lesson";
import { recordAttempt, type AnswerRecord } from "@/lib/progress/lesson";
import type { Progress } from "@/lib/storage";

const STAGE_LABEL = {
  guided: "Prática guiada",
  independent: "Prática independente",
} as const;

/**
 * Player mínimo da primeira lição A1. Reutiliza o motor de exercícios, o áudio
 * sob demanda e as primitivas visuais do Hangul; não cria progresso paralelo.
 * A conclusão é da lição, nunca do curso A1.
 */
export function A1LessonPlayer({ lesson }: { lesson: A1LessonContent }) {
  const { progressStore, status } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [phase, setPhase] = useState<"intro" | "run" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ExerciseAnswer | null>(null);
  const [result, setResult] = useState<DetailedCheckResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [lessonResult, setLessonResult] = useState<A1LessonResult | null>(null);
  const [saveWarning, setSaveWarning] = useState(false);

  const progressRef = useRef<Progress | null>(null);
  const answersRef = useRef<Record<string, AnswerRecord>>({});
  const resultRef = useRef<DetailedCheckResult | null>(null);
  const submittedRef = useRef<Set<string>>(new Set());
  const advancedForRef = useRef(-1);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    setLoadingProgress(true);
    void progressStore.load().then((loaded) => {
      if (!active) return;
      progressRef.current = loaded;
      setProgress(loaded);
      setLoadingProgress(false);
    });
    return () => {
      active = false;
    };
  }, [progressStore]);

  const persist = useCallback(
    (next: Progress) => {
      progressRef.current = next;
      setProgress(next);
      if (!progressStore) {
        setSaveWarning(true);
        return;
      }
      void progressStore.save(next).then((ok) => setSaveWarning(!ok));
    },
    [progressStore],
  );

  const exercise = lesson.exercises[index];
  const total = lesson.exercises.length;
  const requiredCorrect = a1RequiredCorrect(lesson);
  const guidedCount = lesson.exercises.filter((item) => item.stage === "guided").length;
  const independentCount = total - guidedCount;
  const vocabularyIds = [...lesson.vocabulary.newIds, ...lesson.vocabulary.reusedIds];

  const submit = () => {
    if (!exercise || !draft || resultRef.current || submittedRef.current.has(exercise.id)) {
      return;
    }
    submittedRef.current.add(exercise.id);
    const checked = checkAnswer(exercise, draft);
    resultRef.current = checked;
    setResult(checked);
    const nextAnswers = {
      ...answersRef.current,
      [exercise.id]: { correct: checked.correct, scored: checked.scored },
    };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);

    if (progressRef.current) {
      persist(
        recordAttempt(
          progressRef.current,
          exercise.id,
          checked.correct,
          new Date(),
          crypto.randomUUID(),
        ),
      );
    }
  };

  const advance = () => {
    if (!resultRef.current || advancedForRef.current === index) return;
    advancedForRef.current = index;
    if (index + 1 < total) {
      setIndex(index + 1);
      setDraft(null);
      setResult(null);
      resultRef.current = null;
      return;
    }

    if (progressRef.current) {
      const completed = completeA1Lesson(
        progressRef.current,
        lesson,
        answersRef.current,
        new Date(),
      );
      persist(completed.progress);
      setLessonResult(completed.result);
    } else {
      setLessonResult(evaluateA1Lesson(lesson, answersRef.current));
    }
    setPhase("done");
  };

  const restart = () => {
    answersRef.current = {};
    setAnswers({});
    setIndex(0);
    setDraft(null);
    setResult(null);
    resultRef.current = null;
    submittedRef.current = new Set();
    advancedForRef.current = -1;
    setLessonResult(null);
    setSaveWarning(false);
    setPhase("run");
  };

  if (status === "loading" || (loadingProgress && !progress)) {
    return (
      <Plate label="Lâmina de estudo">
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </Plate>
    );
  }

  if (!progress) {
    return (
      <Plate label="Lâmina de estudo">
        <p className="text-lg font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <ButtonLink href="/a1" variant="secondary" className="mt-4">
          Voltar ao A1
        </ButtonLink>
      </Plate>
    );
  }

  const record = progress.lessons[lesson.id];

  if (phase === "run" && exercise) {
    return (
      <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          compact
          code={`lição ${lesson.id}`}
          eyebrow="Curso A1 em desenvolvimento"
          title={lesson.title}
          titleId="lesson-title"
          backHref="/a1"
          backLabel="← A1"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <Badge tone="accent">{STAGE_LABEL[exercise.stage]}</Badge>
          <span className="text-sm text-muted">
            Aula de apresentação · mínimo {requiredCorrect} de {total}
          </span>
        </div>
        <ExerciseView
          key={exercise.id}
          exercise={exercise}
          index={index}
          total={total}
          draft={draft}
          result={result}
          onDraft={setDraft}
          onSubmit={submit}
          onContinue={advance}
          isLast={index + 1 === total}
          lastLabel="Concluir lição"
        />
        {saveWarning ? (
          <p
            role="status"
            className="mt-4 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm text-muted"
          >
            Progresso local salvo; a sincronização com a conta pode estar pendente.
          </p>
        ) : null}
      </article>
    );
  }

  if (phase === "done" && lessonResult) {
    return (
      <article aria-labelledby="completion-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          code={`lição ${lesson.id}`}
          eyebrow="Fim da prática"
          title={lessonResult.passed ? "Lição concluída" : "Quase lá"}
          titleId="completion-title"
          meta={<span>{lesson.title}</span>}
          backHref="/a1"
          backLabel="← A1"
        />
        <Plate className="mt-5" label="Resultado">
          <p className="text-lg">
            Você acertou{" "}
            <strong className="font-mono tabular-nums">
              {lessonResult.correct} de {lessonResult.total}
            </strong>{" "}
            ({lessonResult.score}%).
          </p>
          <p className="mt-2 text-muted">
            {lessonResult.passed
              ? "Seu progresso nesta lição foi registrado."
              : `Esta lição pede ${lessonResult.minCorrect} de ${lessonResult.total} acertos. Você pode refazer quando quiser; o app guarda o seu melhor resultado.`}
          </p>
          {saveWarning ? (
            <p
              role="status"
              className="mt-3 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm"
            >
              O progresso foi salvo neste dispositivo, mas a sincronização com a
              conta pode estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
          <p className="mt-4 border-l-2 border-warning bg-warning-soft p-3 text-sm">
            Esta é a primeira lição de um curso A1 <strong>em desenvolvimento</strong>.
            Concluí-la não conclui o curso A1 e não emite certificação CEFR ou TOPIK.
          </p>
        </Plate>

        <Plate className="mt-4" label="O que você praticou">
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            <li>
              {guidedCount} itens de prática guiada, logo depois das explicações.
            </li>
            <li>
              {independentCount} itens de prática independente, com menos apoio.
            </li>
            <li>
              {lesson.dialogue.length} turnos de diálogo e {lesson.grammar.length}{" "}
              notas de gramática.
            </li>
          </ul>
        </Plate>

        <Plate className="mt-4" label="Gramática central">
          <ul className="flex flex-col gap-2 text-sm">
            {lesson.grammar.map((note) => (
              <li key={note.id} className="border-l-2 border-line-strong pl-3">
                <p className="font-semibold">{note.titlePt}</p>
                <p lang="ko" className="font-ko text-muted">
                  {note.form}
                </p>
              </li>
            ))}
          </ul>
        </Plate>

        <Plate className="mt-4" label="Resumo da lição">
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            {lesson.summary.map((point) => (
              <li key={point}>
                <BilingualText text={point} />
              </li>
            ))}
          </ul>
        </Plate>

        <LessonVocabulary
          course="ko-a1"
          lesson={lesson.id}
          ids={vocabularyIds}
          label="Palavras desta lição"
          audio
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button variant="secondary" onClick={restart}>
            Refazer lição
          </Button>
          <ButtonLink href="/a1" variant="ghost">
            Voltar ao A1
          </ButtonLink>
        </div>
        <p className="mt-4 border-l-2 border-accent bg-surface-2 p-3 text-sm text-muted">
          <strong className="text-fg">Próximo estado:</strong> o A1 tem 1 de 40
          lições publicadas. A lição a1-l02 ainda não está disponível; novas
          lições entram aos poucos e continuam em revisão. Concluir a1-l01 não
          conclui o curso.
        </p>
      </article>
    );
  }

  return (
    <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
      <PlayerHeader
        code={`lição ${lesson.id}`}
        eyebrow="Curso A1 em desenvolvimento"
        title={lesson.title}
        titleId="lesson-title"
        meta={
          <>
            <span>Lição 1 de 40 planejadas</span>
            <span aria-hidden>·</span>
            <span>≈ 50 min</span>
            <span aria-hidden>·</span>
            <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-accent">
              Conteúdo em revisão
            </span>
          </>
        }
        backHref="/a1"
        backLabel="← A1"
      />
      <p className="mt-4 text-lg leading-relaxed text-muted">
        <BilingualText text={lesson.objective} />
      </p>

      <p className="mt-4 border-l-2 border-accent bg-surface-2 p-4 text-sm text-muted">
        O curso A1 está em desenvolvimento: esta é a única lição jogável por
        enquanto. O A1 completo prevê 40 lições e 8 checkpoints; nada aqui
        certifica CEFR ou TOPIK. A conclusão desta lição fica registrada apenas
        como a1-l01, nunca como curso A1 concluído.
      </p>

      {record?.done ? (
        <p className="mt-4 rounded-[var(--radius-field)] border border-line p-3 text-sm">
          Você já concluiu esta lição com{" "}
          <strong className="font-mono tabular-nums">{record.score}%</strong>. Pode
          reler a explicação ou refazer a prática.
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-3">
        {lesson.intro.map((panel, panelIndex) => (
          <Plate
            key={panel.title}
            label={`${String(panelIndex + 1).padStart(2, "0")} / explicação`}
          >
            <h2 className="text-lg font-semibold">{panel.title}</h2>
            <p className="mt-2 text-muted">
              <BilingualText text={panel.body} />
            </p>
            {panel.ko ? (
              <>
                <p
                  lang="ko"
                  className="mt-3 break-words font-ko text-3xl font-semibold tracking-wide text-accent"
                >
                  {panel.ko}
                </p>
                <AudioControl
                  text={panel.ko}
                  compact
                  label="Ouvir a expressão"
                />
              </>
            ) : null}
          </Plate>
        ))}
      </div>

      <Plate className="mt-4" label="Diálogo" number={`${lesson.dialogue.length}`}>
        <h2 className="text-lg font-semibold">Minsu e Ana se conhecem</h2>
        <p className="mt-1 text-sm text-muted">
          Toque no áudio apenas se quiser ouvir. A voz é a coreana do seu
          navegador quando disponível.
        </p>
        <ol className="mt-4 flex flex-col gap-4">
          {lesson.dialogue.map((line) => (
            <li key={line.id} className="border-l-2 border-line-strong pl-3">
              <p className="mono-label text-muted">
                <span lang="ko">{line.speaker}</span>
              </p>
              <p
                lang="ko"
                className="mt-1 break-words font-ko text-xl font-semibold leading-snug"
              >
                {line.ko}
              </p>
              <p className="mt-1 text-sm text-muted">{line.pt}</p>
              <AudioControl text={line.audioText} compact label="Ouvir a fala" />
            </li>
          ))}
        </ol>
      </Plate>

      <section aria-labelledby="grammar-title" className="mt-6">
        <h2 id="grammar-title" className="text-xl font-semibold">
          Como a frase se organiza
        </h2>
        <p className="mt-1 text-sm text-muted">
          Leia as notas antes de praticar. Elas explicam o que os exercícios vão
          pedir.
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {lesson.grammar.map((note, noteIndex) => (
            <Plate
              key={note.id}
              label={`${String(noteIndex + 1).padStart(2, "0")} / gramática`}
            >
              <h3 className="text-lg font-semibold">{note.titlePt}</h3>
              <p lang="ko" className="mt-1 break-words font-ko text-base font-semibold text-accent">
                {note.form}
              </p>
              <p className="mt-2 text-muted">
                <BilingualText text={note.explanationPt} />
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {note.examples.map((example) => (
                  <li key={example.ko} className="border-t border-line pt-2">
                    <p lang="ko" className="font-ko text-lg font-semibold">
                      {example.ko}
                    </p>
                    <p className="text-sm text-muted">{example.pt}</p>
                    <AudioControl
                      text={example.audioText}
                      compact
                      label="Ouvir o exemplo"
                    />
                  </li>
                ))}
              </ul>
            </Plate>
          ))}
        </div>
      </section>

      <Plate className="mt-8" label="Prática">
        <h2 className="text-lg font-semibold">Hora de praticar</h2>
        <p className="mt-2 text-sm text-muted">
          {total} itens em duas etapas: {guidedCount} de prática guiada e{" "}
          {independentCount} de prática independente. Para concluir a lição,
          acerte pelo menos {requiredCorrect} de {total}.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            onClick={() => {
              setPhase("run");
            }}
          >
            {record?.done ? "Refazer a prática" : "Começar a prática"}
          </Button>
          <Link
            href="/a1"
            className="inline-flex min-h-12 items-center font-semibold text-accent underline-offset-4 hover:underline"
          >
            Voltar ao A1
          </Link>
        </div>
      </Plate>

      <LessonVocabulary
        course="ko-a1"
        lesson={lesson.id}
        ids={vocabularyIds}
        label="Palavras desta lição"
        audio
      />
    </article>
  );
}
