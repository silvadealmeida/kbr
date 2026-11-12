import { ButtonLink } from "@/components/ui/Button";
import { Seal } from "@/components/ui/Badge";
import { Ruler } from "@/components/ui/Ruler";
import type { CourseCompletionReport } from "@/lib/progress/completion";
import { CourseJourney } from "./CourseJourney";
import { DiagnosticsList } from "./DiagnosticsList";

function formatPercent(value: number | null): string {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[var(--radius-plate)] bg-surface-2 p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold">{value}</dd>
    </div>
  );
}

/**
 * Experiência de conclusão reutilizada pelo checkpoint final, pelo catálogo
 * do curso e pelo painel. Os dados vêm do `Progress` v1 e nunca são
 * inventados. Por padrão só renderiza com `report.complete`; `allowIncomplete`
 * liga o estado de jornada em andamento usado no atlas do Hangul. `compact`
 * evita duplicar estatísticas e listas no painel.
 */
export function CourseCompletionPanel({
  report,
  title = "Módulo Hangul concluído",
  compact = false,
  showDashboardLink = true,
  allowIncomplete = false,
}: {
  report: CourseCompletionReport;
  title?: string;
  compact?: boolean;
  showDashboardLink?: boolean;
  allowIncomplete?: boolean;
}) {
  if (!report.complete && !allowIncomplete) return null;

  const { stats, finalAssessment } = report;
  const isComplete = report.complete;
  const hasMisses = (finalAssessment?.incorrect ?? 0) > 0;
  const heading = isComplete ? title : "Sua jornada no Hangul";

  return (
    <section
      aria-labelledby="course-completion-title"
      className={`relative overflow-hidden rounded-[var(--radius-panel)] border-2 bg-surface p-4 sm:p-5 ${
        isComplete ? "border-seal/50" : "border-line"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="completion-enter min-w-0 flex-1">
          <p
            className={`mono-label ${isComplete ? "text-seal" : "text-accent"}`}
          >
            {isComplete
              ? "Curso concluído · Hangul · Pré-A1"
              : "Curso em andamento · Hangul · Pré-A1"}
          </p>
          <h2
            id="course-completion-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-2 text-muted">
            {isComplete
              ? `Parabéns! Você concluiu as ${report.completedLessons} lições e os ${report.completedCheckpoints} checkpoints do módulo Hangul.`
              : `${report.completedSteps} de ${report.totalSteps} passos concluídos. A jornada abaixo mostra o que já foi feito, o passo atual e o que ainda está bloqueado.`}
          </p>
        </div>

        {isComplete ? (
          <div className="completion-seal shrink-0">
            <Seal label="Selo de conclusão do módulo Hangul">
              Módulo
              <br />
              concluído
            </Seal>
          </div>
        ) : (
          <div
            aria-hidden
            className="flex size-20 shrink-0 flex-col items-center justify-center rounded-full border border-dashed border-line-strong bg-surface-2 text-center"
          >
            <span className="font-mono text-2xl font-semibold tabular-nums text-accent">
              {report.completedSteps}
            </span>
            <span className="mono-label text-muted">de {report.totalSteps}</span>
          </div>
        )}
      </div>

      {isComplete ? (
        <p className="mt-2 max-w-[65ch] text-sm text-muted">
          Esta é a conclusão do módulo, não uma certificação oficial de proficiência
          em coreano. A avaliação cobre leitura e reconhecimento; o app não avalia
          pronúncia nem fala.
        </p>
      ) : (
        <p className="mt-2 max-w-[65ch] text-sm text-muted">
          A conclusão só é registrada quando as {report.totalLessons} lições e os{" "}
          {report.totalCheckpoints} checkpoints estiverem concluídos. Nenhum selo é
          emitido antes disso.
        </p>
      )}

      {!compact || allowIncomplete ? (
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
      ) : null}

      {!compact || allowIncomplete ? (
        <Ruler
          value={report.completedLessons}
          max={report.totalLessons}
          label={`Progresso nas ${report.totalLessons} lições de Hangul`}
          valueText={`${report.completedLessons} de ${report.totalLessons} lições concluídas`}
          className="mt-4"
        />
      ) : null}

      <CourseJourney journey={report.journey} compact={compact} />

      {isComplete && !compact ? (
        <>
          <section aria-labelledby="completion-stats-title" className="mt-6">
            <h3 id="completion-stats-title" className="text-lg font-semibold">
              Estatísticas reais da sua aprendizagem
            </h3>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat label="Tentativas no histórico" value={stats.attempts} />
              <Stat
                label="Precisão nos exercícios"
                value={formatPercent(stats.exerciseAccuracy)}
              />
              <Stat label="Dias com atividade" value={stats.activeDays} />
              <Stat
                label="Maior sequência"
                value={stats.longestStreak === 0 ? "—" : `${stats.longestStreak} dias`}
              />
              <Stat label="Revisões feitas" value={stats.reviewAttempts} />
              <Stat label="Cartões vencidos" value={stats.dueCards} />
            </dl>
            <p className="mt-2 text-xs text-muted">
              Tentativas repetidas contam como prática. A precisão usa apenas respostas
              avaliadas de lições e checkpoints; “—” significa que ainda não há
              denominador.
            </p>
          </section>

          <section
            id="checkpoint-feedback"
            aria-labelledby="final-assessment-title"
            className="mt-6 rounded-[var(--radius-plate)] border border-line p-4"
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
                  O app não avalia pronúncia nem fluência oral; os itens medem
                  reconhecimento e leitura.
                </p>
                {hasMisses ? (
                  <DiagnosticsList
                    categories={finalAssessment.diagnostics}
                    title="Áreas para estudar antes de seguir"
                    linkLessons
                    id="completion-diagnostics"
                  />
                ) : (
                  <p className="mt-2 rounded-[var(--radius-plate)] bg-surface-2 p-3 text-sm">
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
      ) : null}

      {isComplete ? (
        <p className="mt-4 rounded-[var(--radius-plate)] bg-surface-2 p-3 text-sm">
          O curso A1 está disponível com 40 lições e 8 checkpoints no currículo
          interno do KBR. Concluir o Hangul não libera o A1 automaticamente; A2–C2
          continuam planejados.
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {!isComplete && report.nextStep ? (
          <ButtonLink href={`/hangul/${report.nextStep.id}`}>
            Retomar jornada em {report.nextStep.id}
          </ButtonLink>
        ) : null}
        {isComplete && hasMisses ? (
          <ButtonLink href="#checkpoint-feedback">Rever pontos do checkpoint</ButtonLink>
        ) : null}
        <ButtonLink
          href="/revisao"
          variant={isComplete && !hasMisses ? "primary" : "ghost"}
        >
          Revisar cartões
        </ButtonLink>
        {!isComplete ? (
          <ButtonLink href="/cursos" variant="ghost">
            Ver catálogo
          </ButtonLink>
        ) : (
          <ButtonLink href="/hangul" variant="ghost">
            Rever o curso
          </ButtonLink>
        )}
        {showDashboardLink ? (
          <ButtonLink href="/dashboard" variant="ghost">
            Ir para o painel
          </ButtonLink>
        ) : null}
      </div>

      {!isComplete && report.nextStep ? (
        <p className="mono-data mt-3 text-muted">
          Próximo passo: {report.nextStep.id}
        </p>
      ) : null}
    </section>
  );
}
