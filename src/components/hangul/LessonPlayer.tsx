"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lesson } from "@/content/hangul/types";
import { RULES } from "@/content/hangul/rules";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  checkAnswer,
  type DetailedCheckResult,
  type ExerciseAnswer,
} from "@/lib/exercises";
import {
  isLessonUnlocked,
  completeLesson,
  evaluateLesson,
  lessonRequiredCorrect,
  recordAttempt,
  type LessonResult,
} from "@/lib/progress/lesson";
import { scheduleMissedReview } from "@/lib/srs";
import { type Progress } from "@/lib/storage";
import { DiagnosticsList } from "./DiagnosticsList";
import { BilingualText, ExerciseView } from "./exercise-ui";
import { PronunciationLayers } from "./PronunciationLayers";
import { PlayerHeader } from "./player-header";
import { Plate } from "@/components/ui/Card";
import { LessonVocabulary } from "@/components/vocabulary/LessonVocabulary";

export function LessonPlayer({
  lesson,
  nextStep,
}: {
  lesson: Lesson;
  nextStep: { id: string; title: string } | null;
}) {
  const { progressStore, status } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [phase, setPhase] = useState<"intro" | "run" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ExerciseAnswer | null>(null);
  const [result, setResult] = useState<DetailedCheckResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, { correct: boolean; scored?: boolean }>>({});
  const [lessonResult, setLessonResult] = useState<LessonResult | null>(null);
  const [saveWarning, setSaveWarning] = useState(false);

  const progressRef = useRef<Progress | null>(null);
  const answersRef = useRef<Record<string, { correct: boolean; scored?: boolean }>>({});
  // Guardas síncronas: o estado do React não muda entre dois cliques/entradas
  // rápidas, então refs evitam registrar a mesma resposta duas vezes.
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
      void progressStore.save(next).then((ok) => {
        setSaveWarning(!ok);
      });
    },
    [progressStore],
  );

  const exercise = lesson.exercises[index];
  const total = lesson.exercises.length;
  const requiredCorrect = lessonRequiredCorrect(lesson);

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
      const now = new Date();
      let next = recordAttempt(progressRef.current, exercise.id, checked.correct, now, crypto.randomUUID());
      if (!checked.correct) next = scheduleMissedReview(next, exercise, now);
      persist(next);
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
      const completed = completeLesson(progressRef.current, lesson, answersRef.current, new Date());
      persist(completed.progress);
      setLessonResult(completed.result);
    } else {
      setLessonResult(evaluateLesson(lesson, answersRef.current));
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
        <Link
          href="/hangul"
          className="mt-4 inline-flex min-h-12 items-center font-semibold text-accent underline-offset-4 hover:underline"
        >
          Voltar para Hangul
        </Link>
      </Plate>
    );
  }

  const record = progress.lessons[lesson.id];
  const alreadyDone = record?.done === true;

  if (!alreadyDone && !isLessonUnlocked(progress, lesson)) {
    return (
      <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          code={`lição ${lesson.id}`}
          eyebrow="Lição bloqueada"
          title={lesson.title}
          titleId="lesson-title"
          meta={<span>Unidade {lesson.unit}</span>}
        />
        <Plate className="mt-5">
          <p className="text-muted">
            Conclua antes:{" "}
            <strong className="font-mono text-fg">{lesson.prerequisites.join(", ")}</strong>.
            As lições seguem a ordem do currículo para que você encontre apenas conteúdo já
            ensinado.
          </p>
          <Link
            href="/hangul"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
          >
            Ver lições disponíveis
          </Link>
        </Plate>
      </article>
    );
  }

  if (phase === "intro" && alreadyDone) {
    return (
      <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          code={`lição ${lesson.id}`}
          eyebrow="Lição concluída"
          title={lesson.title}
          titleId="lesson-title"
          meta={
            <>
              <span>Unidade {lesson.unit}</span>
              <span aria-hidden>·</span>
              <span>{lesson.estimatedMinutes} min</span>
            </>
          }
        />
        <Plate className="mt-5" label="Resultado registrado">
          <p className="text-lg">
            Seu melhor resultado registrado é{" "}
            <strong className="font-mono tabular-nums">{record?.score ?? 0}%</strong>.
          </p>
          <p className="mt-2 text-muted">
            Você já concluiu esta lição. Pode seguir para a próxima etapa ou refazer a
            prática; o app mantém o maior score e não apaga o histórico.
          </p>
        </Plate>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
            >
              Próximo: {nextStep.id} · <BilingualText text={nextStep.title} />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
          >
            Refazer lição
          </button>
          <Link
            href="/hangul"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
          >
            Voltar para Hangul
          </Link>
        </div>
      </article>
    );
  }

  if (phase === "intro") {
    return (
      <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          code={`lição ${lesson.id}`}
          eyebrow="Lâmina de estudo"
          title={lesson.title}
          titleId="lesson-title"
          meta={
            <>
              <span>Unidade {lesson.unit}</span>
              <span aria-hidden>·</span>
              <span>{lesson.estimatedMinutes} min</span>
              <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-accent">
                Conteúdo em revisão
              </span>
            </>
          }
        />
        <p className="mt-4 text-lg leading-relaxed text-muted">
          <BilingualText text={lesson.objective} />
        </p>

        <Plate className="mt-6" label="Objetivos">
          <h2 className="sr-only">Objetivos</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            {lesson.objectives.map((objective) => (
              <li key={objective}>
                <BilingualText text={objective} />
              </li>
            ))}
          </ul>
        </Plate>

        <div className="mt-4 flex flex-col gap-3">
          {lesson.intro.map((panel, index) => (
            <Plate
              key={panel.title}
              label={`${String(index + 1).padStart(2, "0")} / explicação`}
            >
              <h2 className="text-lg font-semibold">
                <BilingualText text={panel.title} />
              </h2>
              <p className="mt-2 text-muted">
                <BilingualText text={panel.body} />
              </p>
              {panel.ko ? (
                <p
                  lang="ko"
                  className="mt-3 break-words font-ko text-3xl font-semibold tracking-wide text-accent"
                >
                  {panel.ko}
                </p>
              ) : null}
            </Plate>
          ))}
        </div>

        {lesson.unit === 7 ? (
          <div className="mt-8 space-y-3">
            <div>
              <p className="mono-label text-muted">Camadas de pronúncia</p>
              <h2 className="mt-1 text-xl font-semibold">Escrita e pronúncia</h2>
              <p className="mt-1 text-sm text-muted">
                Compare a forma escrita com a transcrição didática. A escrita não muda;
                o que muda é a fala.
              </p>
            </div>
            {(lesson.id === "h24" || lesson.id === "h25"
              ? RULES
              : RULES.filter((rule) => rule.introducedIn === lesson.id)
            ).map((rule) => (
              <PronunciationLayers
                key={rule.id}
                rule={rule}
                examples={rule.examples}
              />
            ))}
          </div>
        ) : null}

        <Plate className="mt-8" label="Prática">
          <button
            type="button"
            onClick={() => setPhase("run")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-field)] bg-fg px-6 font-semibold text-bg transition-colors duration-[var(--motion-fast)] hover:opacity-90 sm:w-auto"
          >
            Começar a prática
          </button>
          <p className="mt-3 text-sm text-muted">
            {total} itens. Para concluir, acerte pelo menos {requiredCorrect} de {total}{" "}
            ({lesson.completion.minScore}% documentado).
          </p>
          {lesson.completion.rules?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {lesson.completion.rules.map((rule) => (
                <li key={rule.id}>{rule.label}.</li>
              ))}
            </ul>
          ) : null}
        </Plate>
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
          meta={<span><BilingualText text={lesson.title} /></span>}
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
              ? "Seu progresso foi registrado e a próxima etapa foi liberada."
              : "Esta lição pede " +
                `${requiredCorrect} de ${total} acertos (${lesson.completion.minScore}% documentado) e os critérios adicionais. ` +
                "Você pode refazer quando quiser; o app guarda o seu melhor resultado."}
          </p>
          {!lessonResult.requiredMet ? (
            <div className="mt-2 text-sm text-muted">
              {lessonResult.requiredExerciseIds.length > 0 ? (
                <p>Revise os itens obrigatórios: {lessonResult.requiredExerciseIds.join(", ")}.</p>
              ) : null}
              {lessonResult.rules.filter((rule) => !rule.met).length > 0 ? (
                <ul className="mt-1 list-disc pl-5">
                  {lessonResult.rules
                    .filter((rule) => !rule.met)
                    .map((rule) => (
                      <li key={rule.id}>
                        {rule.label} ({rule.correct}/{rule.minCorrect}).
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
        </Plate>

        <DiagnosticsList categories={lessonResult.diagnostics} />

        <Plate className="mt-4" label="Revisão dos itens">
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {lesson.exercises.map((item) => {
              const answer = answers[item.id];
              return (
                <li key={item.id} className="flex items-start gap-2">
                  <span aria-hidden className={answer?.correct ? "text-success" : "text-danger"}>
                    {answer?.correct ? "✓" : "✗"}
                  </span>
                  <span>
                    <span className="sr-only">{answer?.correct ? "Correto: " : "Incorreto: "}</span>
                    <BilingualText text={item.prompt} />
                  </span>
                </li>
              );
            })}
          </ul>
        </Plate>

        {lessonResult.passed ? <LessonVocabulary course="hangul" lesson={lesson.id} /> : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {lessonResult.passed && nextStep ? (
            <Link
              href={`/hangul/${nextStep.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
            >
              Próximo: {nextStep.id} · <BilingualText text={nextStep.title} />
            </Link>
          ) : null}
          {!lessonResult.passed ? (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] bg-fg px-5 font-semibold text-bg"
            >
              Refazer lição
            </button>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
            >
              Refazer mesmo assim
            </button>
          )}
          <Link
            href="/hangul"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-5 font-semibold hover:bg-surface-2"
          >
            Voltar para Hangul
          </Link>
        </div>
      </article>
    );
  }

  if (!exercise) return null;

  return (
    <article aria-labelledby="lesson-title" className="mx-auto w-full max-w-[680px] pb-4">
      <PlayerHeader
        compact
        code={`lição ${lesson.id}`}
        eyebrow={`Lâmina de estudo / unidade ${lesson.unit}`}
        title={lesson.title}
        titleId="lesson-title"
      />
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
      />
      {saveWarning ? (
        <p role="status" className="mt-4 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm text-muted">
          Progresso local salvo; a sincronização com a conta pode estar pendente.
        </p>
      ) : null}
    </article>
  );
}
