import { Badge, Seal } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Ruler } from "@/components/ui/Ruler";
import type { A1CompletionReport } from "@/lib/a1/completion";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[var(--radius-plate)] bg-surface-2 p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-bold">{value}</dd>
    </div>
  );
}

/**
 * Conclusão interna do A1. Só é renderizada quando as 40 lições e os 8
 * checkpoints estão concluídos; não emite certificado nem mede fala livre.
 */
export function A1CompletionPanel({ report }: { report: A1CompletionReport }) {
  if (!report.complete) return null;

  return (
    <section
      aria-labelledby="a1-completion-title"
      className="relative overflow-hidden rounded-[var(--radius-panel)] border-2 border-seal/50 bg-surface p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="completion-enter min-w-0 flex-1">
          <p className="mono-label text-seal">Curso concluído · Coreano A1</p>
          <h2
            id="a1-completion-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            Você concluiu o percurso A1 do KBR
          </h2>
          <p className="mt-2 text-muted">
            Foram {report.completedLessons} lições e {report.completedCheckpoints}{" "}
            checkpoints, com {report.vocabIntroduced} palavras novas apresentadas e{" "}
            {report.vocabReused} retomadas de outros cursos.
          </p>
        </div>
        <div className="completion-seal shrink-0">
          <Seal label="Selo de conclusão do curso A1 do KBR">
            Curso
            <br />
            concluído
          </Seal>
        </div>
      </div>

      <p className="mt-3 max-w-[65ch] text-sm text-muted">
        Esta é a conclusão interna do currículo A1 do KBR. Não é certificado CEFR,
        não equivale ao TOPIK e não comprova proficiência oficial. Leitura, escuta e
        itens controlados têm correção automática; fala livre e escrita aberta não
        são avaliadas automaticamente.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <Stat
          label="Lições concluídas"
          value={`${report.completedLessons} de ${report.totalLessons}`}
        />
        <Stat
          label="Checkpoints concluídos"
          value={`${report.completedCheckpoints} de ${report.totalCheckpoints}`}
        />
        <Stat label="Passos concluídos" value={`${report.completedSteps} de ${report.totalSteps}`} />
        <Stat label="Palavras novas do A1" value={report.vocabIntroduced} />
        <Stat label="Palavras retomadas" value={report.vocabReused} />
        <Stat label="Palavras salvas" value={report.vocabSaved} />
      </dl>

      <Ruler
        value={report.completedSteps}
        max={report.totalSteps}
        label="Progresso nos passos do A1"
        valueText={`${report.completedSteps} de ${report.totalSteps} passos concluídos`}
        className="mt-4"
      />

      <div className="mt-4 rounded-[var(--radius-plate)] bg-surface-2 p-3 text-sm">
        <Badge tone="accent">Revisão contínua</Badge>
        <p className="mt-2 text-muted">
          Você tem {report.vocabSaved} palavra(s) no vocabulário pessoal e{" "}
          {report.vocabDue} vencida(s) para revisão agora. A conclusão do curso não
          encerra a revisão espaçada: ela continua disponível em Vocabulário.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href="/vocabulario/revisao">Revisar vocabulário</ButtonLink>
        <ButtonLink href="/dashboard" variant="secondary">
          Ir para o painel
        </ButtonLink>
        <ButtonLink href="/a1" variant="ghost">
          Rever o curso
        </ButtonLink>
      </div>
    </section>
  );
}
