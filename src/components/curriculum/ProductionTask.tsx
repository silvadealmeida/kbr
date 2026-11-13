"use client";

import { useId, useState } from "react";
import { BilingualText } from "@/components/hangul/exercise-media";
import type { CourseProductionTask } from "@/content/curriculum/course-types";

/**
 * Prática de produção aberta, opcional e não avaliada automaticamente. O texto
 * nunca sai desta tela: não há persistência, envio, IA ou sincronização.
 */
export function ProductionTask({ task }: { task: CourseProductionTask }) {
  const [draft, setDraft] = useState("");
  const titleId = useId();
  const helpId = useId();
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const meetsLength = task.minWords === undefined || words >= task.minWords;

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={helpId}
      className="mt-4 rounded-[var(--radius-panel)] border border-accent/40 bg-surface-2 p-4 sm:p-5"
    >
      <h2 id={titleId} className="text-lg font-semibold">
        <BilingualText text={task.titlePt} />
      </h2>
      <p id={helpId} className="mt-1 text-sm text-muted">
        Produção independente opcional. Não entra na nota, não é enviada e não é
        salva no progresso. Use a rubrica para se autoavaliar; uma revisão humana
        continua necessária.
      </p>
      <p className="mt-3 text-muted">
        <BilingualText text={task.promptPt} />
      </p>
      {task.promptKo ? (
        <p lang="ko" className="mt-2 font-ko text-lg font-semibold">
          {task.promptKo}
        </p>
      ) : null}
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        {task.guidance.map((item) => (
          <li key={item}>
            <BilingualText text={item} />
          </li>
        ))}
      </ul>
      <label htmlFor={`${titleId}-draft`} className="mt-4 block text-sm font-semibold">
        Seu texto
      </label>
      <textarea
        id={`${titleId}-draft`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={6}
        className="mt-2 w-full rounded-[var(--radius-field)] border border-line-strong bg-surface p-3 text-base"
        placeholder={task.promptKo ? "한국어로 써 보세요." : "Escreva em coreano."}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted" aria-live="polite">
          {words} palavra(s)
          {task.minWords ? ` · sugerido: ${task.minWords}+` : ""}
        </span>
        <span className={meetsLength ? "text-success" : "text-warning"}>
          {meetsLength ? "Extensão sugerida atingida" : "Ainda abaixo do sugerido"}
        </span>
      </div>
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold">Rubrica de autoavaliação</legend>
        <ul className="mt-2 flex flex-col gap-1">
          {task.checklist.map((item) => (
            <li key={item}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 py-1.5 text-sm text-muted">
                <input type="checkbox" className="size-5 shrink-0 accent-[var(--accent)]" />
                <span>
                  <BilingualText text={item} />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      {task.rubric && task.rubric.length > 0 ? (
        <div className="mt-5">
          <h3 className="text-sm font-semibold">Critérios de avaliação</h3>
          <dl className="mt-2 flex flex-col gap-2 text-sm">
            {task.rubric.map((criterion) => (
              <div key={criterion.criterion} className="border-l-2 border-line-strong pl-3">
                <dt className="font-semibold">{criterion.labelPt}</dt>
                <dd className="text-muted">{criterion.descriptorPt}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      {task.sample ? (
        <details className="mt-5 rounded-[var(--radius-field)] border border-line p-3">
          <summary className="cursor-pointer text-sm font-semibold">
            Exemplo ilustrativo (não é gabarito)
          </summary>
          <p className="mt-3 whitespace-pre-line text-muted">{task.sample.notePt}</p>
          <p lang="ko" className="mt-3 whitespace-pre-line font-ko text-lg leading-relaxed">
            {task.sample.ko}
          </p>
          <p className="mt-2 text-sm text-muted">{task.sample.pt}</p>
        </details>
      ) : null}
    </section>
  );
}
