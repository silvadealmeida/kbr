import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import type { CourseCompletionReport } from "@/lib/progress/completion";
import { DiagnosticsList } from "./DiagnosticsList";

function formatPercent(value: number | null): string {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-soft p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold">{value}</dd>
    </div>
  );
}

/**
 * Experiência de conclusão reutilizada pelo checkpoint final, pelo catálogo
 * do curso e pelo painel. Só renderiza com `report.complete`; os dados vêm do
 * `Progress` v1 e nunca são inventados. `compact` evita duplicar as
 * estatísticas que o painel já mostra logo abaixo.
 */
export function CourseCompletionPanel({
  report,
  title = "Módulo Hangul concluído",
  compact = false,
  showDashboardLink = true,
}: {
  report: CourseCompletionReport;
  title?: string;
  compact?: boolean;
  showDashboardLink?: boolean;
}) {
  if (!report.complete) return null;

  const { stats, finalAssessment } = report;
  const hasMisses = (finalAssessment?.incorrect ?? 0) > 0;

  return (
    <section
      aria-labelledby="course-completion-title"
      className="rounded-2xl border-2 border-brand/40 bg-surface p-5"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        Curso concluído · Hangul · Pré-A1
      </p>
      <h2 id="course-completion-title" className="mt-1 text-2xl font-bold">
        {title}
      </h2>
      <p className="mt-2 text-muted">
        Parabéns! Você concluiu as {report.completedLessons} lições e os{" "}
        {report.completedCheckpoints} checkpoints do módulo Hangul.
      </p>
      <p className="mt-2 text-sm text-muted">
        Esta é a conclusão do módulo, não uma certificação oficial de proficiência em
        coreano. A avaliação cobre leitura e reconhecimento; o app não avalia pronúncia
        nem fala.
      </p>

      {compact ? null : (
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat
            label="Lições concluídas"
            value={`${report.completedLessons} de ${report.totalLessons}`}
          />
          <Stat
            label="Checkpoints concluídos"
            value={`${report.completedCheckpoints} de ${report.totalCheckpoints}`}
          />
        </dl>
      )}

      {compact ? null : (
        <>
          <section aria-labelledby="completion-stats-title" className="mt-6">
            <h3 id="completion-stats-title" className="text-lg font-semibold">
              Estatísticas reais da sua aprendizagem
            </h3>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat label="Tentativas no histórico" value={stats.attempts} />
              <Stat label="Precisão nos exercícios" value={formatPercent(stats.exerciseAccuracy)} />
              <Stat label="Dias com atividade" value={stats.activeDays} />
              <Stat label="Maior sequência" value={stats.longestStreak === 0 ? "—" : `${stats.longestStreak} dias`} />
              <Stat label="Revisões feitas" value={stats.reviewAttempts} />
              <Stat label="Cartões vencidos" value={stats.dueCards} />
            </dl>
            <p className="mt-2 text-xs text-muted">
              Tentativas repetidas contam como prática. A precisão usa apenas respostas
              avaliadas de lições e checkpoints; “—” significa que ainda não há denominador.
            </p>
          </section>

          <section aria-labelledby="completed-checkpoints-title" className="mt-6">
            <h3 id="completed-checkpoints-title" className="text-lg font-semibold">
              Checkpoints concluídos
            </h3>
            <ul className="mt-2 flex flex-col gap-2">
              {report.completedCheckpointList.map((checkpoint) => (
                <li
                  key={checkpoint.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2"
                >
                  <Link
                    href={`/hangul/${checkpoint.id}`}
                    className="min-h-11 flex-1 font-medium text-brand hover:underline"
                  >
                    {checkpoint.id} · {checkpoint.title}
                  </Link>
                  <span className="shrink-0 text-sm font-semibold">{checkpoint.score}%</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="completed-lessons-title" className="mt-6">
            <h3 id="completed-lessons-title" className="text-lg font-semibold">
              Lições concluídas
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
              {report.completedLessonList.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/hangul/${lesson.id}`}
                    className="flex min-h-11 flex-col justify-center rounded-xl border border-border px-3 py-2 hover:bg-soft"
                  >
                    <span className="font-semibold">{lesson.id}</span>
                    <span className="truncate text-xs text-muted">
                      {lesson.score}% · {lesson.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="checkpoint-feedback"
            aria-labelledby="final-assessment-title"
            className="mt-6 rounded-xl border border-border p-4"
          >
            <h3 id="final-assessment-title" className="text-lg font-semibold">
              Resultado do checkpoint final
            </h3>
            {finalAssessment ? (
              <>
                <p className="mt-2">
                  Você acertou{" "}
                  <strong>
                    {finalAssessment.correct} de {finalAssessment.total}
                  </strong>{" "}
                  ({finalAssessment.score}%). {finalAssessment.correct} corretos ·{" "}
                  {finalAssessment.incorrect} incorretos.
                </p>
                <p className="mt-1 text-sm text-muted">
                  Aprovação: pelo menos {finalAssessment.requiredCorrect} de{" "}
                  {finalAssessment.total} acertos.{" "}
                  {finalAssessment.passed
                    ? "Esta tentativa atingiu o critério."
                    : "Esta tentativa ficou abaixo do critério; a conclusão anterior do checkpoint continua registrada."}
                </p>
                <p className="mt-1 text-xs text-muted">
                  O app não avalia pronúncia nem fluência oral; os itens medem reconhecimento
                  e leitura.
                </p>
                {hasMisses ? (
                  <DiagnosticsList
                    categories={finalAssessment.diagnostics}
                    title="Áreas para estudar antes de seguir"
                    linkLessons
                    id="completion-diagnostics"
                  />
                ) : (
                  <p className="mt-2 rounded-xl bg-soft p-3 text-sm">
                    Nenhum item errado nesta tentativa. Você pode revisar os cartões
                    espaçados para manter o conteúdo ativo.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">
                {report.finalCheckpointScore !== null
                  ? `Seu melhor score registrado no checkpoint final é ${report.finalCheckpointScore}%. O detalhe por item e o diagnóstico só ficam disponíveis na tela de conclusão do checkpoint; o Progress v1 guarda apenas o maior score.`
                  : "O detalhe por item e o diagnóstico aparecem quando o checkpoint final é concluído; o Progress v1 guarda apenas o maior score."}
              </p>
            )}
          </section>
        </>
      )}

      <p className="mt-4 rounded-xl bg-soft p-3 text-sm">
        O próximo módulo (CEFR A1) ainda não está disponível. Nenhum conteúdo novo é
        liberado automaticamente.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {hasMisses ? (
          <ButtonLink href="#checkpoint-feedback">Rever pontos do checkpoint</ButtonLink>
        ) : null}
        <ButtonLink href="/revisao" variant={hasMisses ? "ghost" : "primary"}>
          Revisar cartões
        </ButtonLink>
        <ButtonLink href="/hangul" variant="ghost">
          Rever o curso
        </ButtonLink>
        {showDashboardLink ? (
          <ButtonLink href="/dashboard" variant="ghost">
            Ir para o painel
          </ButtonLink>
        ) : null}
      </div>
    </section>
  );
}
