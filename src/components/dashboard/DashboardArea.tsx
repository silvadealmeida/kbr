"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import {
  buildDashboardSummary,
  type DashboardActivity,
  type DashboardSummary,
} from "@/lib/progress/dashboard";
import type { SyncStatus } from "@/lib/storage";

const BOXES = [1, 2, 3, 4, 5] as const;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const activityFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function formatActivityDate(value: string): string {
  return activityFormatter.format(new Date(value));
}

function formatPercent(value: number | null): string {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

function formatStreak(value: number): string {
  if (value === 0) return "—";
  return `${value} ${value === 1 ? "dia" : "dias"}`;
}

function SyncBanner({ syncStatus }: { syncStatus: SyncStatus }) {
  if (syncStatus === "offline") {
    return (
      <p
        role="alert"
        className="rounded-2xl border border-border bg-soft p-4 text-sm text-fg"
      >
        Salvo neste dispositivo. A sincronização com sua conta está pendente — nada do
        que você fez foi perdido.
      </p>
    );
  }

  if (syncStatus === "syncing") {
    return (
      <p role="status" className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
        Sincronizando seu progresso…
      </p>
    );
  }

  return null;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

function ActivityList({ items }: { items: readonly DashboardActivity[] }) {
  if (items.length === 0) {
    return (
      <Card>
        <p className="text-muted">
          Nenhuma resposta registrada ainda. Comece pelo h01 para ver seu histórico aqui.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <ol className="flex flex-col divide-y divide-border">
        {items.map((activity, index) => (
          <li
            key={`${activity.exerciseId}-${activity.at}-${index}`}
            className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{activity.label}</p>
              <p className="mt-0.5 text-xs text-muted">
                {activity.detail} ·{" "}
                <time dateTime={activity.at}>{formatActivityDate(activity.at)}</time>
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                activity.correct ? "bg-soft text-brand" : "border border-border text-muted"
              }`}
            >
              {activity.correct ? "Acertou" : "Errou"}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function DashboardArea() {
  const { user, status, syncStatus, progressStore } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!progressStore) return;

    let active = true;
    setLoading(true);
    setLoadError(false);

    void progressStore
      .load()
      .then((progress) => {
        if (!active) return;
        setSummary(
          buildDashboardSummary(progress, {
            now: new Date(),
            lessons: LESSONS,
            checkpoints: CHECKPOINTS,
          }),
        );
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
  }, [progressStore, reloadKey]);

  if (status === "loading" || (loading && !summary && !loadError)) {
    return (
      <Card className="mb-6">
        <p role="status" className="text-muted">
          Carregando seu progresso…
        </p>
      </Card>
    );
  }

  if (loadError || !summary) {
    return (
      <Card className="mb-6">
        <p className="font-semibold">Não foi possível carregar seu progresso.</p>
        <p className="mt-1 text-muted">
          Verifique se o armazenamento do navegador está disponível e tente novamente.
        </p>
        <button
          type="button"
          onClick={() => setReloadKey((value) => value + 1)}
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
        >
          Tentar novamente
        </button>
      </Card>
    );
  }

  const { course, attempts, activity, review, recent } = summary;
  const firstName =
    typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.trim().split(/\s+/)[0]
      : null;
  const starting = course.completedSteps === 0 && attempts.total === 0;
  const largestBox = Math.max(1, ...BOXES.map((box) => review.cardsByBox[box]));
  const nextCharacterCount = Math.max(0, review.due - review.sessionSize);

  return (
    <div className="flex flex-col gap-6">
      <SyncBanner syncStatus={syncStatus} />

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {course.title} · {course.level}
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              {firstName ? `Olá, ${firstName}!` : "Olá!"}
            </h2>
            <p className="mt-1 text-muted">
              Acompanhe seu progresso real no módulo Hangul e continue de onde parou.
            </p>
          </div>
          <span className="rounded-full bg-soft px-3 py-1 text-sm font-semibold text-brand">
            {course.percent}% do curso
          </span>
        </div>

        <ProgressBar
          value={course.percent}
          label="Progresso geral do curso Hangul"
          className="mt-5"
        />

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-soft p-3">
            <dt className="text-muted">Lições concluídas</dt>
            <dd className="mt-1 text-xl font-bold">
              {course.completedLessons} de {course.totalLessons}
            </dd>
          </div>
          <div className="rounded-xl bg-soft p-3">
            <dt className="text-muted">Checkpoints concluídos</dt>
            <dd className="mt-1 text-xl font-bold">
              {course.completedCheckpoints} de {course.totalCheckpoints}
            </dd>
          </div>
        </dl>
      </Card>

      {course.complete ? (
        <Card className="border-2 border-brand/40">
          <p className="text-sm font-semibold text-brand">Curso concluído</p>
          <h2 className="mt-1 text-xl font-semibold">Módulo Hangul concluído</h2>
          <p className="mt-1 text-muted">
            Você concluiu as 25 lições e os quatro checkpoints. Isso registra a conclusão
            do módulo, não uma certificação de proficiência. O próximo módulo (CEFR A1)
            ainda não está disponível.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/revisao">Revisar cartões</ButtonLink>
            <ButtonLink href="/hangul" variant="ghost">
              Ver o curso
            </ButtonLink>
          </div>
        </Card>
      ) : course.nextStep ? (
        <Card>
          <p className="text-sm font-semibold text-brand">
            {starting ? "Comece por aqui" : "Continue de onde parou"}
          </p>
          <h2 className="mt-1 text-xl font-semibold">
            {course.nextStep.kind === "checkpoint" ? "Próximo checkpoint" : "Próxima lição"}:{" "}
            {course.nextStep.id}
          </h2>
          <p className="mt-1 font-medium">{course.nextStep.title}</p>
          <p className="mt-1 text-sm text-muted">
            {course.nextStep.kind === "checkpoint" ? "Checkpoint" : "Lição"} ·{" "}
            {course.nextStep.estimatedMinutes} min
          </p>
          <ButtonLink href={`/hangul/${course.nextStep.id}`}>
            {starting ? `Começar pelo ${course.nextStep.id}` : `Continuar ${course.nextStep.id}`}
          </ButtonLink>
        </Card>
      ) : (
        <Card>
          <h2 className="text-xl font-semibold">Próximo passo indisponível</h2>
          <p className="mt-1 text-muted">
            Há passos bloqueados por pré-requisitos não concluídos. Abra o curso para ver
            o que falta.
          </p>
          <ButtonLink href="/hangul">Abrir Hangul</ButtonLink>
        </Card>
      )}

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-brand">Revisão espaçada</p>
            <h2 className="mt-1 text-xl font-semibold">Fila de revisão</h2>
          </div>
          <span className="rounded-full bg-soft px-3 py-1 text-sm font-semibold text-brand">
            {review.due} {review.due === 1 ? "vencido" : "vencidos"}
          </span>
        </div>

        {review.due > 0 ? (
          <>
            <p className="mt-3 text-muted">
              {review.sessionSize} {review.sessionSize === 1 ? "cartão entra" : "cartões entram"}{" "}
              nesta sessão. {nextCharacterCount > 0
                ? `${nextCharacterCount} ${nextCharacterCount === 1 ? "fica" : "ficam"} para a próxima.`
                : "Todos os cartões vencidos cabem na sessão."}
            </p>
            <p className="mt-1 text-sm text-muted">
              {review.overdue} antes de hoje · {review.dueToday} vencem hoje.
            </p>
            <ButtonLink href="/revisao">
              Revisar {review.due} {review.due === 1 ? "cartão" : "cartões"}
            </ButtonLink>
          </>
        ) : (
          <>
            <p className="mt-3 text-muted">
              {review.nextDue
                ? `Nada vencido agora. O próximo cartão vence em ${formatDate(review.nextDue)}.`
                : "Nada vencido agora. Você ainda não tem cartões de revisão: erros nas lições e checkpoints criam cartões automaticamente."}
            </p>
            <ButtonLink href="/revisao" variant="ghost">
              Abrir revisão
            </ButtonLink>
          </>
        )}
      </Card>

      <section aria-labelledby="dashboard-stats">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h2 id="dashboard-stats" className="text-lg font-semibold">
            Estatísticas de aprendizagem
          </h2>
          <span className="text-xs text-muted">{attempts.total} tentativas no histórico</span>
        </div>
        <p className="mb-3 text-sm text-muted">
          Tentativas repetidas contam como prática; exercícios únicos contam uma vez.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard
            label="Exercícios únicos"
            value={attempts.uniqueExercises}
            hint={`${attempts.exerciseAttempts} tentativa(s) em lições e checkpoints`}
          />
          <StatCard
            label="Precisão nos exercícios"
            value={formatPercent(attempts.exerciseAccuracy)}
            hint={
              attempts.exerciseAttempts > 0
                ? `${attempts.exerciseCorrect} acertos de ${attempts.exerciseAttempts}`
                : "Ainda sem respostas avaliadas"
            }
          />
          <StatCard
            label="Revisões"
            value={attempts.review}
            hint={
              attempts.review > 0
                ? `${attempts.reviewCorrect} acertos · ${attempts.uniqueReviewCards} cartão(ões)`
                : "Nenhuma revisão registrada"
            }
          />
          <StatCard
            label="Sequência atual"
            value={formatStreak(activity.currentStreak)}
            hint={
              activity.longestStreak > 0
                ? `Maior sequência: ${formatStreak(activity.longestStreak)}`
                : "Sem atividade suficiente"
            }
          />
          <StatCard
            label="Dias com atividade"
            value={activity.activeDays}
            hint={`Hoje: ${activity.todayAttempts} ${activity.todayAttempts === 1 ? "resposta" : "respostas"}`}
          />
          <StatCard
            label="Lições praticadas"
            value={attempts.attemptedLessons}
            hint={`${attempts.attemptedCheckpoints} checkpoint(s) com tentativas`}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          A sequência é calculada pelas datas locais das respostas salvas no histórico.
        </p>
      </section>

      <section aria-labelledby="dashboard-srs">
        <h2 id="dashboard-srs" className="mb-2 text-lg font-semibold">
          Cartões por caixa Leitner
        </h2>
        {review.totalCards === 0 ? (
          <Card>
            <p className="text-muted">
              Ainda não há cartões de revisão. Um erro em lição ou checkpoint cria cartões
              na caixa 1.
            </p>
          </Card>
        ) : (
          <Card>
            <ul className="grid grid-cols-5 gap-2">
              {BOXES.map((box) => {
                const count = review.cardsByBox[box];
                return (
                  <li key={box} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-xs text-muted">Caixa {box}</span>
                    <span className="text-xl font-bold">{count}</span>
                    <span aria-hidden className="flex h-2 w-full overflow-hidden rounded-full bg-soft">
                      <span
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${(count / largestBox) * 100}%` }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm text-muted">
              {review.due} vencido(s) · {review.overdue} antes de hoje · {review.dueToday}{" "}
              hoje.
              {review.nextDue ? ` Próximo: ${formatDate(review.nextDue)}.` : ""}
            </p>
            {review.unknownCards > 0 ? (
              <p className="mt-1 text-xs text-muted">
                {review.unknownCards} cartão(ões) antigo(s) sem conteúdo correspondente não
                entram na fila.
              </p>
            ) : null}
          </Card>
        )}
      </section>

      <section aria-labelledby="dashboard-activity">
        <h2 id="dashboard-activity" className="mb-2 text-lg font-semibold">
          Atividade recente
        </h2>
        <ActivityList items={recent} />
      </section>
    </div>
  );
}
