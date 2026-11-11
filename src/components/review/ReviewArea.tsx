"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BilingualText, ExerciseView } from "@/components/hangul/exercise-ui";
import { Card } from "@/components/ui/Card";
import { checkAnswer, type DetailedCheckResult, type ExerciseAnswer } from "@/lib/exercises";
import { applyReview, buildReviewQueue, REVIEW_KIND_LABELS, type ReviewItem, type ReviewQueue } from "@/lib/review";
import type { Progress } from "@/lib/storage";

type Phase = "overview" | "run" | "done";

type ReviewedItem = {
  cardId: string;
  kind: ReviewItem["kind"];
  correct: boolean;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function SyncNote({
  offline,
  synced,
  syncing,
}: {
  offline: boolean;
  synced: boolean;
  syncing?: boolean;
}) {
  if (!offline && !synced && !syncing) return null;

  return (
    <p
      role="status"
      className={`rounded-xl p-3 text-sm ${offline ? "bg-soft text-fg" : "text-muted"}`}
    >
      {offline
        ? "Salvo neste dispositivo. A sincronização com sua conta está pendente — nada do que você fez foi perdido."
        : syncing
          ? "Sincronizando este resultado com sua conta…"
          : "Progresso sincronizado com sua conta."}
    </p>
  );
}

export function ReviewArea() {
  const { progressStore, status, syncStatus, user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [queue, setQueue] = useState<ReviewQueue | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [phase, setPhase] = useState<Phase>("overview");
  const [session, setSession] = useState<readonly ReviewItem[]>([]);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ExerciseAnswer | null>(null);
  const [result, setResult] = useState<DetailedCheckResult | null>(null);
  const [reviewed, setReviewed] = useState<ReviewedItem[]>([]);
  const [saveWarning, setSaveWarning] = useState(false);

  const progressRef = useRef<Progress | null>(null);
  const resultRef = useRef<DetailedCheckResult | null>(null);
  const submittedRef = useRef<Set<string>>(new Set());
  const advancedForRef = useRef(-1);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    void progressStore
      .load()
      .then((loaded) => {
        if (!active) return;
        progressRef.current = loaded;
        setProgress(loaded);
        setQueue(buildReviewQueue(loaded, new Date()));
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setLoadError(true);
        setLoading(false);
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

  const start = () => {
    if (!queue || queue.session.length === 0) return;
    setSession(queue.session);
    setIndex(0);
    setDraft(null);
    setResult(null);
    resultRef.current = null;
    submittedRef.current = new Set();
    advancedForRef.current = -1;
    setReviewed([]);
    setPhase("run");
  };

  const item = session[index];

  const submit = () => {
    if (!item || !draft || resultRef.current || submittedRef.current.has(item.cardId)) return;
    if (!progressRef.current) return;

    submittedRef.current.add(item.cardId);
    const checked = checkAnswer(item.exercise, draft);
    resultRef.current = checked;
    setResult(checked);
    setReviewed((current) => [
      ...current,
      { cardId: item.cardId, kind: item.kind, correct: checked.correct },
    ]);

    const now = new Date();
    const next = applyReview(
      progressRef.current,
      item,
      checked.correct ? "correct" : "again",
      now,
      crypto.randomUUID(),
    );
    persist(next);
    setQueue(buildReviewQueue(next, now));
  };

  const advance = () => {
    if (!resultRef.current || advancedForRef.current === index) return;
    advancedForRef.current = index;

    if (index + 1 < session.length) {
      setIndex(index + 1);
      setDraft(null);
      setResult(null);
      resultRef.current = null;
      return;
    }

    setPhase("done");
  };

  // A sessão autenticada manda no estado: uma falha local antiga não pode
  // esconder para sempre o “sincronizado” depois que a reconexão escoa a fila.
  const authSynced = Boolean(user) && syncStatus === "synced";
  const authSyncing = Boolean(user) && syncStatus === "syncing";
  const offline = syncStatus === "offline" || (saveWarning && !authSynced);
  const synced = authSynced && !offline;
  const syncing = authSyncing && !offline;

  if (status === "loading" || (loading && !progress && !loadError)) {
    return (
      <Card>
        <p role="status" className="text-muted">
          Preparando seus cartões…
        </p>
      </Card>
    );
  }

  if (loadError || (!loading && !progress)) {
    return (
      <Card>
        <p className="font-semibold">Não foi possível carregar seus cartões.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex min-h-12 items-center font-semibold text-brand"
        >
          Voltar ao painel
        </Link>
      </Card>
    );
  }

  if (phase === "run" && item) {
    return (
      <article aria-labelledby="review-session-title" className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-brand">
            ← Painel
          </Link>
          <span className="text-sm text-muted">
            {REVIEW_KIND_LABELS[item.kind]} · {index + 1} de {session.length}
          </span>
        </div>
        <h1 id="review-session-title" className="mt-3 text-2xl font-bold tracking-tight">
          Revisão
        </h1>
        <p className="mt-1 text-sm text-muted">
          Responda sem consultar. O acerto avança o cartão; o erro o traz de volta.
        </p>

        <ExerciseView
          key={item.cardId}
          exercise={item.exercise}
          index={index}
          total={session.length}
          draft={draft}
          result={result}
          onDraft={setDraft}
          onSubmit={submit}
          onContinue={advance}
          isLast={index + 1 === session.length}
          lastLabel="Concluir revisão"
          progressLabel="revisão"
        />

        {offline ? (
          <div className="mt-4">
            <SyncNote offline synced={false} />
          </div>
        ) : null}
      </article>
    );
  }

  if (phase === "done") {
    const correct = reviewed.filter((review) => review.correct).length;
    const wrong = reviewed.length - correct;
    const remaining = queue?.totalDue ?? 0;

    return (
      <article aria-labelledby="review-done-title" className="pb-4">
        <p className="text-sm font-semibold text-brand">Fim da sessão</p>
        <h1 id="review-done-title" className="mt-1 text-3xl font-bold tracking-tight">
          Revisão concluída
        </h1>

        <Card className="mt-4">
          <p className="text-lg">
            Você revisou <strong>{reviewed.length}</strong>{" "}
            {reviewed.length === 1 ? "cartão" : "cartões"}: {correct}{" "}
            {correct === 1 ? "acerto" : "acertos"} e {wrong}{" "}
            {wrong === 1 ? "erro" : "erros"}.
          </p>
          <p className="mt-2 text-muted">
            {wrong === 0
              ? "Todos os cartões desta sessão avançaram no intervalo de revisão."
              : "Os cartões com erro voltam para a primeira caixa do Leitner e aparecerão novamente amanhã."}
          </p>
          {queue?.nextDue ? (
            <p className="mt-2 text-sm text-muted">
              Próxima revisão: {formatDate(queue.nextDue)}.
            </p>
          ) : null}
          {remaining > 0 ? (
            <p className="mt-2 rounded-xl bg-soft p-3 text-sm">
              Ainda há {remaining} {remaining === 1 ? "cartão vencido" : "cartões vencidos"}{" "}
              para revisar hoje. Você pode iniciar outra sessão.
            </p>
          ) : null}
          <div className="mt-4">
            <SyncNote offline={offline} synced={synced} syncing={syncing} />
          </div>
        </Card>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {reviewed.map((review) => (
            <li key={review.cardId} className="flex items-start gap-2">
              <span aria-hidden>{review.correct ? "✓" : "✗"}</span>
              <span>
                <span className="sr-only">{review.correct ? "Correto: " : "Incorreto: "}</span>
                {REVIEW_KIND_LABELS[review.kind]} revisitado.
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {(queue?.totalDue ?? 0) > 0 ? (
            <button
              type="button"
              onClick={() => {
                setPhase("overview");
                setSession([]);
                setReviewed([]);
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
            >
              Revisar mais
            </button>
          ) : null}
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
          >
            Voltar ao painel
          </Link>
        </div>
      </article>
    );
  }

  const totalDue = queue?.totalDue ?? 0;

  return (
    <>
      <Card className="mb-6">
        {totalDue > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              <div className="rounded-xl bg-soft p-4">
                <p className="text-sm text-muted">Vencidos</p>
                <p className="text-3xl font-bold">{queue?.overdue ?? 0}</p>
                <p className="text-xs text-muted">antes de hoje</p>
              </div>
              <div className="rounded-xl bg-soft p-4">
                <p className="text-sm text-muted">Vencem hoje</p>
                <p className="text-3xl font-bold">{queue?.dueToday ?? 0}</p>
                <p className="text-xs text-muted">desde 00:00</p>
              </div>
              <div className="rounded-xl bg-soft p-4">
                <p className="text-sm text-muted">Nesta sessão</p>
                <p className="text-3xl font-bold">{queue?.session.length ?? 0}</p>
                <p className="text-xs text-muted">de {totalDue} pendentes</p>
              </div>
            </div>
            <p className="mt-4 text-muted">
              {totalDue === 1
                ? "Há 1 cartão para revisar."
                : `Há ${totalDue} cartões para revisar.`}{" "}
              A sessão começa pelos mais atrasados e usa a agenda Leitner já existente.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-fg sm:w-auto"
            >
              {`Começar revisão (${queue?.session.length ?? 0})`}
            </button>
            <div className="mt-3">
              <SyncNote offline={offline} synced={synced} syncing={syncing} />
            </div>
          </>
        ) : (
          <>
            <p lang="ko" aria-hidden className="font-ko text-4xl font-bold text-brand">
              복습
            </p>
            <h2 className="mt-2 text-xl font-semibold">Nada para revisar agora</h2>
            <p className="mt-2 text-muted">
              {queue?.nextDue
                ? `Seu próximo cartão vence em ${formatDate(queue.nextDue)}.`
                : "Você ainda não tem cartões de revisão. Erros nas lições e nos checkpoints criam cartões automaticamente."}
            </p>
            <p className="mt-2 text-sm text-muted">
              A revisão usa as respostas já registradas; nenhum cartão é inventado.
            </p>
            <div className="mt-4">
              <SyncNote offline={offline} synced={synced} syncing={syncing} />
            </div>
          </>
        )}
      </Card>

      <section aria-labelledby="review-how" className="rounded-2xl border border-border bg-surface p-5">
        <h2 id="review-how" className="text-lg font-semibold">
          Como funciona
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          <li>O acerto avança o cartão: 1, 2, 4, 8 e 16 dias.</li>
          <li>O erro volta o cartão para a primeira caixa, com nova revisão no dia seguinte.</li>
          <li>O áudio do navegador é apoio; ele não avalia sua pronúncia.</li>
          <li>Cada resposta é salva imediatamente neste dispositivo e sincronizada quando possível.</li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          <BilingualText text="Conteúdo coreano em revisão por falante nativo." />
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
        >
          Voltar ao painel
        </Link>
      </section>
    </>
  );
}
