"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BilingualText, ExerciseView } from "@/components/hangul/exercise-ui";
import { PlayerHeader } from "@/components/hangul/player-header";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import type { A1CheckpointContent } from "@/content/curriculum/a1/types";
import { A1_COURSE } from "@/content/courses/a1";
import type { CourseClientView } from "@/content/courses/client";
import type { CourseStepDefinition } from "@/content/courses/types";
import {
  a1CheckpointRequiredCorrect,
  completeA1Checkpoint,
  evaluateA1Checkpoint,
  type A1CheckpointResult,
} from "@/lib/a1/lesson";
import {
  buildA1CompletionReport,
  type A1VocabularyFacts,
} from "@/lib/a1/completion";
import { isCourseStepUnlocked, missingCourseEntryPrerequisites } from "@/lib/courses/steps";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import { recordAttempt, type AnswerRecord } from "@/lib/progress/lesson";
import type { Progress } from "@/lib/storage";
import { A1CompletionPanel } from "./A1CompletionPanel";
import { ProductionTask } from "@/components/curriculum/ProductionTask";

/**
 * Checkpoint A1: avaliação cumulativa determinística, na mesma entrada
 * `Progress.lessons` das lições. Não introduz conteúdo, não usa a agenda SRS do
 * Hangul e só libera com o escopo e os checkpoints anteriores concluídos.
 */
export function A1CheckpointPlayer({
  checkpoint,
  step,
  nextStep,
  vocabularyFacts,
  course = A1_COURSE,
  levelLabel = "A1",
  entryCourseLabel = "A1",
  entryCourseHref = "/a1",
}: {
  checkpoint: A1CheckpointContent;
  step: CourseStepDefinition;
  nextStep: CourseStepDefinition | null;
  vocabularyFacts: A1VocabularyFacts;
  course?: CourseClientView;
  levelLabel?: string;
  /** Curso anterior exigido na entrada, para a mensagem de bloqueio. */
  entryCourseLabel?: string;
  entryCourseHref?: string;
}) {
  const { progressStore, status } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [phase, setPhase] = useState<"intro" | "run" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ExerciseAnswer | null>(null);
  const [result, setResult] = useState<DetailedCheckResult | null>(null);
  const [checkpointResult, setCheckpointResult] = useState<A1CheckpointResult | null>(
    null,
  );
  const [saveWarning, setSaveWarning] = useState(false);
  const donePanelRef = useRef<HTMLElement | null>(null);

  const progressRef = useRef<Progress | null>(null);
  const answersRef = useRef<Record<string, AnswerRecord>>({});
  const resultRef = useRef<DetailedCheckResult | null>(null);
  const submittedRef = useRef<Set<string>>(new Set());
  const advancedForRef = useRef(-1);

  useEffect(() => {
    if (phase === "done") donePanelRef.current?.focus();
  }, [phase]);

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

  const exercise = checkpoint.exercises[index];
  const total = checkpoint.exercises.length;
  const requiredCorrect = a1CheckpointRequiredCorrect(checkpoint);

  const submit = () => {
    if (!exercise || !draft || resultRef.current || submittedRef.current.has(exercise.id)) {
      return;
    }
    submittedRef.current.add(exercise.id);
    const checked = checkAnswer(exercise, draft);
    resultRef.current = checked;
    setResult(checked);
    answersRef.current = {
      ...answersRef.current,
      [exercise.id]: { correct: checked.correct, scored: checked.scored },
    };
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
      const completed = completeA1Checkpoint(
        progressRef.current,
        checkpoint,
        answersRef.current,
        new Date(),
      );
      persist(completed.progress);
      setCheckpointResult(completed.result);
    } else {
      setCheckpointResult(evaluateA1Checkpoint(checkpoint, answersRef.current));
    }
    setPhase("done");
  };

  const restart = () => {
    answersRef.current = {};
    setIndex(0);
    setDraft(null);
    setResult(null);
    resultRef.current = null;
    submittedRef.current = new Set();
    advancedForRef.current = -1;
    setCheckpointResult(null);
    setSaveWarning(false);
    setPhase("run");
  };

  const coursePath = course.basePath ?? "/a1";

  if (status === "loading" || (loadingProgress && !progress)) {
    return (
      <Plate label={`Checkpoint ${levelLabel}`}>
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </Plate>
    );
  }

  if (!progress) {
    return (
      <Plate label={`Checkpoint ${levelLabel}`}>
        <p className="text-lg font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <ButtonLink href={coursePath} variant="secondary" className="mt-4">
          Voltar ao {levelLabel}
        </ButtonLink>
      </Plate>
    );
  }

  const entryMissing = missingCourseEntryPrerequisites(progress, course);

  if (entryMissing.length > 0) {
    const requiredLevel = course.entryPrerequisites?.some((id) => id.startsWith("a2-"))
      ? "A2"
      : "A1";
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Curso bloqueado"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={<span>{course.title}</span>}
          backHref="/cursos"
          backLabel="← Cursos"
        />
        <Plate className="mt-5" label="Requisito de entrada" number={course.id}>
          <p className="text-muted">
            Este curso abre depois de concluir o {entryCourseLabel}. Abrir o
            endereço direto não libera a avaliação.
          </p>
          <p className="mt-2 text-sm text-muted">Pendentes: {entryMissing.join(", ")}.</p>
          <ButtonLink href={entryCourseHref} className="mt-5">
            Ver o percurso do {entryCourseLabel}
          </ButtonLink>
        </Plate>
      </article>
    );
  }

  const record = progress.lessons[checkpoint.id];
  const alreadyDone = record?.done === true;
  const unlocked = alreadyDone || isCourseStepUnlocked(progress, step);
  const isFinal = checkpoint.id === course.completion.finalStepId;

  if (!unlocked) {
    const missing = step.prerequisites.filter(
      (id) => progress.lessons[id]?.done !== true,
    );
    return (
      <article
        aria-labelledby="checkpoint-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint bloqueado"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Módulo {checkpoint.number}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
            </>
          }
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <Plate className="mt-5" label="Requisitos pendentes" number={checkpoint.id}>
          <p className="text-muted">
            O checkpoint abre depois das cinco lições do módulo e dos checkpoints
            anteriores. Abrir o endereço diretamente não libera a avaliação.
          </p>
          <p className="mt-2 text-sm text-muted">Pendentes: {missing.join(", ")}.</p>
          <ButtonLink href={coursePath} className="mt-5">
            Ver o percurso do {levelLabel}
          </ButtonLink>
        </Plate>
      </article>
    );
  }

  const report =
    isFinal && (alreadyDone || checkpointResult?.passed)
      ? buildA1CompletionReport(progress, new Date(), course, vocabularyFacts)
      : null;
  const courseCompletionPage =
    report?.complete === true ? (
      <article
        ref={donePanelRef}
        tabIndex={-1}
        aria-labelledby="checkpoint-completion-title"
        className="mx-auto w-full max-w-[760px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow={`Fim do ${levelLabel}`}
          title={`Curso ${levelLabel} concluído`}
          titleId="checkpoint-completion-title"
          meta={<span>{checkpoint.title}</span>}
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <div className="mt-5">
          <A1CompletionPanel report={report} levelLabel={levelLabel} coursePath={coursePath} />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={restart}>
            Refazer checkpoint
          </Button>
          <ButtonLink href={coursePath} variant="ghost">
            Voltar ao {levelLabel}
          </ButtonLink>
        </div>
      </article>
    ) : null;

  if (phase === "intro" && alreadyDone) {
    if (courseCompletionPage) return courseCompletionPage;
    return (
      <article
        aria-labelledby="checkpoint-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint concluído"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Módulo {checkpoint.number}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
            </>
          }
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <Plate
          className="mt-5"
          label="Resultado registrado"
          number={`${record?.score ?? 0}%`}
        >
          <Badge tone="success">Concluído</Badge>
          <p className="mt-3 text-lg">
            Seu melhor resultado registrado é{" "}
            <strong className="font-mono tabular-nums">{record?.score ?? 0}%</strong>.
          </p>
          <p className="mt-2 text-muted">
            Você já concluiu este checkpoint. Pode seguir para a próxima etapa ou
            refazer a avaliação; o app mantém o maior score.
          </p>
          <p className="mt-2 text-sm text-muted">
            Aprovação registrada a partir de {requiredCorrect} de {total} acertos (
            {checkpoint.passingScore}% documentado).
          </p>
        </Plate>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {nextStep && isCourseStepUnlocked(progress, nextStep) ? (
            <ButtonLink href={`${coursePath}/${nextStep.id}`}>
              Próximo: {nextStep.id} · {nextStep.title}
            </ButtonLink>
          ) : null}
          <Button variant="secondary" onClick={restart}>
            Refazer checkpoint
          </Button>
          <ButtonLink href={coursePath} variant="secondary">
            Voltar ao {levelLabel}
          </ButtonLink>
        </div>
      </article>
    );
  }

  if (phase === "intro") {
    return (
      <article
        aria-labelledby="checkpoint-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint / avaliação"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Módulo {checkpoint.number}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
              <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-accent">
                Conteúdo em revisão
              </span>
            </>
          }
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <p className="mt-4 text-lg leading-relaxed text-muted">{checkpoint.objective}</p>

        <Plate className="mt-6" label="Ficha da avaliação" number={checkpoint.id}>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="border-l border-line pl-3">
              <dt className="text-xs text-muted">Itens</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">{total}</dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-xs text-muted">Aprovação</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                {requiredCorrect}/{total}
              </dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-xs text-muted">Nota documentada</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                {checkpoint.passingScore}%
              </dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-xs text-muted">Duração</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                {checkpoint.estimatedMinutes} min
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
            Lições incluídas: {checkpoint.lessonIds.join(", ")}. A avaliação não
            introduz conteúdo novo e não usa a agenda SRS do Hangul.
          </p>
        </Plate>

        <Plate className="mt-4" label="Instruções">
          <h2 className="text-lg font-semibold">Como funciona</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted">
            {checkpoint.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </Plate>

        {checkpoint.production ? (
          <ProductionTask task={checkpoint.production} />
        ) : null}

        <Plate className="mt-6" label="Início da avaliação">
          <Button className="w-full sm:w-auto" onClick={() => setPhase("run")}>
            Começar checkpoint
          </Button>
          <p className="mt-3 text-sm text-muted">
            {total} itens. Aprovação com pelo menos {requiredCorrect} de {total}{" "}
            ({checkpoint.passingScore}% documentado).
          </p>
        </Plate>
      </article>
    );
  }

  if (phase === "done" && checkpointResult) {
    if (courseCompletionPage) return courseCompletionPage;

    const done = progress.lessons[checkpoint.id]?.done === true;
    const heading = checkpointResult.passed
      ? "Checkpoint concluído"
      : done
        ? "Checkpoint já concluído"
        : "Quase lá";
    const explanation = !checkpointResult.passed
      ? done
        ? "Esta tentativa ficou abaixo do critério, mas o checkpoint já estava concluído. O app preserva a conclusão anterior e o maior score."
        : "Esta tentativa ficou abaixo do critério. Refaça quando quiser: o app preserva o maior resultado entre as tentativas."
      : "Seu resultado foi registrado. O app guarda o maior score entre as tentativas.";

    return (
      <article
        ref={donePanelRef}
        tabIndex={-1}
        aria-labelledby="checkpoint-completion-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Fim do checkpoint"
          title={heading}
          titleId="checkpoint-completion-title"
          meta={
            <>
              <span>{checkpoint.title}</span>
              <span aria-hidden>·</span>
              <span>Módulo {checkpoint.number}</span>
            </>
          }
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <Plate
          className="mt-5"
          label="Resultado desta tentativa"
          number={`${checkpointResult.score}%`}
        >
          <Badge tone={checkpointResult.passed ? "success" : "danger"}>
            {checkpointResult.passed ? "Aprovado" : "Abaixo do critério"}
          </Badge>
          <p className="mt-3 text-lg">
            Você acertou{" "}
            <strong className="font-mono tabular-nums">
              {checkpointResult.correct} de {checkpointResult.total}
            </strong>{" "}
            ({checkpointResult.score}%).
          </p>
          <p className="mt-2 text-muted">{explanation}</p>
          <p className="mt-2 text-sm text-muted">
            Critério: pelo menos {requiredCorrect} de {total} acertos. A tarefa
            funcional aberta continua como autoavaliação fora desta nota.
          </p>
          {saveWarning ? (
            <p role="status" className="mt-3 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm">
              O progresso foi salvo neste dispositivo, mas a sincronização com a
              conta pode estar pendente. Isso não apaga o que você fez.
            </p>
          ) : null}
          <p className="mt-4 border-l-2 border-warning bg-warning-soft p-3 text-sm">
            Conteúdo original em revisão. Esta avaliação é interna do KBR e não
            certifica CEFR ou TOPIK.
          </p>
        </Plate>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {checkpointResult.passed &&
          nextStep &&
          isCourseStepUnlocked(progress, nextStep) ? (
            <ButtonLink href={`${coursePath}/${nextStep.id}`}>
              Próximo: {nextStep.id} · {nextStep.title}
            </ButtonLink>
          ) : null}
          <Button variant="secondary" onClick={restart}>
            Refazer checkpoint
          </Button>
          <ButtonLink href="/vocabulario/revisao" variant="secondary">
            Revisar vocabulário
          </ButtonLink>
          <ButtonLink href={coursePath} variant="ghost">
            Voltar ao {levelLabel}
          </ButtonLink>
        </div>
      </article>
    );
  }

  if (phase === "run" && exercise) {
    return (
      <article
        aria-labelledby="checkpoint-title"
        className="mx-auto w-full max-w-[680px] pb-4"
      >
        <PlayerHeader
          compact
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow={`${levelLabel} · ${checkpoint.estimatedMinutes} min`}
          title={checkpoint.title}
          titleId="checkpoint-title"
          backHref={coursePath}
          backLabel={`← ${levelLabel}`}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <Badge tone="accent">Avaliação cumulativa</Badge>
          <span className="text-sm text-muted">
            Item {index + 1} de {total} · mínimo {requiredCorrect} de {total}
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
          lastLabel="Concluir checkpoint"
        />
        {saveWarning ? (
          <p role="status" className="mt-4 rounded-[var(--radius-field)] bg-surface-2 p-3 text-sm text-muted">
            Progresso local salvo; a sincronização com a conta pode estar pendente.
          </p>
        ) : null}
      </article>
    );
  }

  return null;
}
