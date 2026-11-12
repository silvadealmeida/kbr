"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Checkpoint } from "@/content/hangul/types";
import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { useAuth } from "@/components/auth/AuthProvider";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import { buildCourseCompletionReport } from "@/lib/progress/completion";
import {
  checkpointPrerequisiteIds,
  checkpointRequiredCorrect,
  completeCheckpoint,
  evaluateCheckpoint,
  isCheckpointUnlocked,
  isCourseComplete,
  recordAttempt,
  type CheckpointResult,
} from "@/lib/progress/lesson";
import { scheduleMissedReview } from "@/lib/srs";
import type { Progress } from "@/lib/storage";
import { CourseCompletionPanel } from "./CourseCompletionPanel";
import { DiagnosticsList } from "./DiagnosticsList";
import { BilingualText, ExerciseView } from "./exercise-ui";
import { PlayerHeader } from "./player-header";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { Ruler } from "@/components/ui/Ruler";

export function CheckpointPlayer({
  checkpoint,
  nextStep,
}: {
  checkpoint: Checkpoint;
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
  const [checkpointResult, setCheckpointResult] = useState<CheckpointResult | null>(null);
  const [saveWarning, setSaveWarning] = useState(false);

  const progressRef = useRef<Progress | null>(null);
  const answersRef = useRef<Record<string, { correct: boolean; scored?: boolean }>>({});
  const resultRef = useRef<DetailedCheckResult | null>(null);
  const submittedRef = useRef<Set<string>>(new Set());
  const advancedForRef = useRef(-1);
  const donePanelRef = useRef<HTMLElement | null>(null);

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
      void progressStore.save(next).then((ok) => {
        setSaveWarning(!ok);
      });
    },
    [progressStore],
  );

  const exercise = checkpoint.exercises[index];
  const total = checkpoint.exercises.length;
  const requiredCorrect = checkpointRequiredCorrect(checkpoint);

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
      const completed = completeCheckpoint(progressRef.current, checkpoint, answersRef.current, new Date());
      persist(completed.progress);
      setCheckpointResult(completed.result);
    } else {
      setCheckpointResult(evaluateCheckpoint(checkpoint, answersRef.current));
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
    setCheckpointResult(null);
    setPhase("run");
  };

  if (status === "loading" || (loadingProgress && !progress)) {
    return (
      <Plate label="Checkpoint">
        <p role="status" className="text-muted">
          Preparando seu progresso…
        </p>
      </Plate>
    );
  }

  if (!progress) {
    return (
      <Plate label="Checkpoint">
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

  const record = progress.lessons[checkpoint.id];
  const alreadyDone = record?.done === true;
  const isFinalCheckpoint = checkpoint.id === "c4";
  const courseComplete = isCourseComplete(progress, LESSONS, CHECKPOINTS);
  const completion =
    isFinalCheckpoint && courseComplete
      ? buildCourseCompletionReport(progress, {
          now: new Date(),
          lessons: LESSONS,
          checkpoints: CHECKPOINTS,
          finalCheckpoint: checkpoint,
          finalResult: checkpointResult ?? undefined,
        })
      : null;

  if (!alreadyDone && !isCheckpointUnlocked(progress, checkpoint, CHECKPOINTS)) {
    const missingLessons = checkpoint.lessonIds.filter(
      (id) => progress.lessons[id]?.done !== true,
    );
    const missingCheckpoints = checkpointPrerequisiteIds(CHECKPOINTS, checkpoint.id).filter(
      (id) => progress.lessons[id]?.done !== true,
    );
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint bloqueado"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Unidade {checkpoint.unit}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
            </>
          }
        />
        <Plate className="mt-5" label="Requisitos pendentes" number={checkpoint.id}>
          <p className="text-muted">
            Conclua as lições do escopo e os checkpoints anteriores antes de fazer esta
            avaliação. A avaliação não introduz conteúdo novo.
          </p>
          <p className="mt-2 text-sm text-muted">
            Pendentes: {[...missingCheckpoints, ...missingLessons].join(", ")}.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {missingCheckpoints.length > 0 ? (
              <div className="border-l-2 border-warning bg-surface-2 p-3">
                <p className="mono-label text-warning">Pré-requisito</p>
                <p className="mt-1 text-sm">
                  Checkpoints anteriores: {missingCheckpoints.join(", ")}.
                </p>
              </div>
            ) : null}
            {missingLessons.length > 0 ? (
              <div className="border-l-2 border-warning bg-surface-2 p-3">
                <p className="mono-label text-warning">Escopo</p>
                <p className="mt-1 text-sm">Lições do escopo: {missingLessons.join(", ")}.</p>
              </div>
            ) : null}
          </div>
          <ButtonLink href="/hangul" className="mt-5">
            Ver lições disponíveis
          </ButtonLink>
        </Plate>
      </article>
    );
  }

  const courseCompletionPage = completion ? (
    <article
      ref={donePanelRef}
      tabIndex={-1}
      aria-labelledby="checkpoint-completion-title"
      className="pb-4"
    >
      <Link href="/hangul" className="text-sm font-semibold text-brand">
        ← Hangul
      </Link>
      <p className="mt-4 text-sm font-semibold text-brand">Fim do checkpoint</p>
      <h1 id="checkpoint-completion-title" className="mt-1 text-3xl font-bold tracking-tight">
        Módulo Hangul concluído
      </h1>
      {saveWarning ? (
        <p role="status" className="mt-3 rounded-xl bg-soft p-3 text-sm">
          O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
          estar pendente. Isso não apaga o que você fez.
        </p>
      ) : null}
      <div className="mt-4">
        <CourseCompletionPanel report={completion} title="Sua jornada de 29 passos" />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={restart}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Refazer checkpoint
        </button>
        <Link
          href="/hangul"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Voltar para Hangul
        </Link>
      </div>
    </article>
  ) : null;

  if (phase === "intro" && alreadyDone && courseCompletionPage) {
    return courseCompletionPage;
  }

  if (phase === "intro" && alreadyDone) {
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint concluído"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Unidade {checkpoint.unit}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
            </>
          }
        />
        <Plate
          className="mt-5"
          label="Resultado registrado"
          number={`${record?.score ?? 0}%`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge tone="success">Concluído</Badge>
              <p className="mt-3 text-lg">
                Seu melhor resultado registrado é{" "}
                <strong className="font-mono tabular-nums">{record?.score ?? 0}%</strong>.
              </p>
            </div>
          </div>
          <p className="mt-2 text-muted">
            Você já concluiu este checkpoint. Pode seguir para a próxima etapa ou refazer
            a avaliação; o app mantém o maior score e não apaga o histórico.
          </p>
          <p className="mt-2 text-sm text-muted">
            Aprovação registrada a partir de {requiredCorrect} de {total} acertos (
            {checkpoint.passingScore}% documentado).
          </p>
        </Plate>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {nextStep ? (
            <ButtonLink href={`/hangul/${nextStep.id}`}>
              Próximo: {nextStep.id} · {nextStep.title}
            </ButtonLink>
          ) : null}
          {courseComplete ? (
            <ButtonLink href="/hangul/c4">Ver conclusão do curso</ButtonLink>
          ) : null}
          <Button variant="secondary" onClick={restart}>
            Refazer checkpoint
          </Button>
          <ButtonLink href="/hangul" variant="secondary">
            Voltar para Hangul
          </ButtonLink>
        </div>
      </article>
    );
  }

  if (phase === "intro") {
    return (
      <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
        <PlayerHeader
          tone="checkpoint"
          code={`checkpoint ${checkpoint.id}`}
          eyebrow="Checkpoint / avaliação"
          title={checkpoint.title}
          titleId="checkpoint-title"
          meta={
            <>
              <span>Unidade {checkpoint.unit}</span>
              <span aria-hidden>·</span>
              <span>{checkpoint.estimatedMinutes} min</span>
              <span aria-hidden>·</span>
              <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-accent">
                Conteúdo em revisão
              </span>
            </>
          }
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
            Lições incluídas: {checkpoint.lessonIds.join(", ")}. A avaliação não introduz
            conteúdo novo.
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
    const pendingCheckpoints = CHECKPOINTS.filter(
      (item) => progress.lessons[item.id]?.done !== true,
    ).map((item) => item.id);
    const incorrect = checkpointResult.total - checkpointResult.correct;
    const heading = checkpointResult.passed
      ? isFinalCheckpoint
        ? "Checkpoint final concluído"
        : "Checkpoint concluído"
      : done
        ? "Checkpoint já concluído"
        : "Quase lá";
    const explanation = !checkpointResult.passed
      ? done
        ? "Esta tentativa ficou abaixo do critério, mas o checkpoint já estava concluído. O app preserva a conclusão anterior e o maior score."
        : "Esta tentativa ficou abaixo do critério. Refaça quando quiser: o app preserva o maior resultado entre as tentativas."
      : isFinalCheckpoint
        ? `Você concluiu o checkpoint final. Ainda faltam: ${pendingCheckpoints.join(", ")}. O módulo será marcado como concluído quando todas as lições e todos os checkpoints estiverem feitos.`
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
              <span>Unidade {checkpoint.unit}</span>
            </>
          }
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
          <p className="mt-1 text-sm text-muted">
            {checkpointResult.correct} corretos · {incorrect} incorretos. Aprovação com pelo
            menos {requiredCorrect} de {total} ({checkpoint.passingScore}% documentado).
          </p>
          <Ruler
            value={checkpointResult.correct}
            max={checkpointResult.total}
            label="Acertos nesta tentativa"
            valueText={`${checkpointResult.correct} de ${checkpointResult.total} acertos nesta tentativa`}
            className="mt-4"
          />
          <p className="mt-3 text-muted">{explanation}</p>
          {saveWarning ? (
            <Notice tone="warning" title="Sincronização pendente" className="mt-3">
              O progresso foi salvo neste dispositivo, mas a sincronização com a conta pode
              estar pendente. Isso não apaga o que você fez.
            </Notice>
          ) : null}
        </Plate>

        <DiagnosticsList
          categories={checkpointResult.diagnostics}
          title="O que revisar antes de seguir"
          linkLessons
        />

        <Plate
          className="mt-4"
          label="Revisão dos itens desta sessão"
          number={`${checkpointResult.correct}/${checkpointResult.total}`}
        >
          <p className="text-sm text-muted">
            O status por item existe apenas nesta sessão; o Progress v1 guarda o resultado
            do checkpoint, não o detalhe de cada resposta.
          </p>
          <ol className="mt-3 flex flex-col">
            {checkpoint.exercises.map((item) => {
              const answer = answers[item.id];
              return (
                <li
                  key={item.id}
                  className="border-t border-line py-2.5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone={answer?.correct ? "success" : "danger"}>
                      {answer?.correct ? "Correto" : "Incorreto"}
                    </Badge>
                    <span className="mono-label text-muted">{item.id}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    <BilingualText text={item.prompt} />
                  </div>
                </li>
              );
            })}
          </ol>
        </Plate>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {checkpointResult.passed && nextStep ? (
            <ButtonLink href={`/hangul/${nextStep.id}`}>
              Próximo: {nextStep.id} · {nextStep.title}
            </ButtonLink>
          ) : null}
          {!checkpointResult.passed ? (
            <Button onClick={restart}>Refazer checkpoint</Button>
          ) : null}
          {incorrect > 0 ? (
            <ButtonLink href="/revisao" variant="secondary">
              Revisar cartões
            </ButtonLink>
          ) : null}
          {checkpointResult.passed ? (
            <Button variant="secondary" onClick={restart}>
              Refazer mesmo assim
            </Button>
          ) : null}
          <ButtonLink href="/hangul" variant="secondary">
            Voltar para Hangul
          </ButtonLink>
        </div>
      </article>
    );
  }

  if (!exercise) return null;

  return (
    <article aria-labelledby="checkpoint-title" className="mx-auto w-full max-w-[680px] pb-4">
      <PlayerHeader
        tone="checkpoint"
        compact
        code={`checkpoint ${checkpoint.id}`}
        eyebrow="Checkpoint / avaliação"
        title={checkpoint.title}
        titleId="checkpoint-title"
        meta={
          <>
            <span className="rounded-[var(--radius-seal)] bg-surface-2 px-2 py-0.5 text-seal">
              Avaliação
            </span>
            <span aria-hidden>·</span>
            <span>Aprovação {requiredCorrect}/{total}</span>
          </>
        }
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
        lastLabel="Concluir checkpoint"
      />
      {saveWarning ? (
        <Notice tone="warning" className="mt-4">
          Progresso local salvo; a sincronização com a conta pode estar pendente.
        </Notice>
      ) : null}
    </article>
  );
}
