"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, Plate } from "@/components/ui/Card";
import { sentencesFor } from "@/content/vocabulary";
import { buildVocabQueue, reviewVocab, type VocabOutcome, type VocabQueueItem } from "@/lib/vocabulary";
import { ContextualCard } from "./ContextualCard";
import { Flashcard } from "./Flashcard";
import { useVocabProgress } from "./useVocabProgress";

type Phase = "overview" | "run" | "done";

export function VocabReviewArea() {
  const { progress, update, loading, loadError, syncNote } = useVocabProgress();
  const [phase, setPhase] = useState<Phase>("overview");
  const [session, setSession] = useState<readonly VocabQueueItem[]>([]);
  const [index, setIndex] = useState(0);
  const [outcomes, setOutcomes] = useState<VocabOutcome[]>([]);
  const [graded, setGraded] = useState(false);

  if (loading) {
    return (
      <Card>
        <p role="status" className="text-muted">Preparando seu vocabulário…</p>
      </Card>
    );
  }
  if (loadError || !progress) {
    return (
      <Card>
        <p className="font-semibold">Não foi possível carregar seu vocabulário.</p>
        <p className="mt-1 text-muted">Verifique se o armazenamento do navegador está disponível e tente novamente.</p>
      </Card>
    );
  }

  const queue = buildVocabQueue(progress, new Date());
  const item = session[index];

  const start = (flashcardsOnly: boolean) => {
    const { session: next } = buildVocabQueue(progress, new Date(), { flashcardsOnly });
    if (next.length === 0) return;
    setSession(next);
    setIndex(0);
    setOutcomes([]);
    setGraded(false);
    setPhase("run");
  };

  const grade = (outcome: VocabOutcome) => {
    if (!item || graded) return;
    setGraded(true);
    setOutcomes((current) => [...current, outcome]);
    update((current, now) => reviewVocab(current, item.vocabId, outcome, now));
  };

  const next = () => {
    if (index + 1 < session.length) {
      setIndex(index + 1);
      setGraded(false);
    } else setPhase("done");
  };

  const warning = syncNote ? (
    <p role="status" className="mt-4 border-l-2 border-accent bg-surface-2 p-3 text-sm text-muted">{syncNote}</p>
  ) : null;

  if (phase === "run" && item) {
    return (
      <article aria-labelledby="vocab-session-title" className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/vocabulario" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
            ← Vocabulário
          </Link>
          <span className="text-sm text-muted" aria-label={`Cartão ${index + 1} de ${session.length}`}>
            {index + 1} de {session.length}
          </span>
        </div>
        <h1 id="vocab-session-title" className="mt-3 text-2xl font-bold tracking-tight">Revisão diária</h1>
        <progress className="mt-2 h-1.5 w-full accent-[var(--color-accent)]" value={index + (graded ? 1 : 0)} max={session.length} aria-label="Progresso da sessão" />
        {item.mode === "context" && item.sentence ? (
          <ContextualCard
            key={item.vocabId}
            entry={item.entry}
            sentence={item.sentence}
            isLast={index + 1 === session.length}
            onGrade={grade}
            onNext={next}
          />
        ) : (
          <Flashcard
            key={item.vocabId}
            entry={item.entry}
            sentence={sentencesFor(item.vocabId)[0]}
            onGrade={(outcome) => {
              grade(outcome);
              next();
            }}
          />
        )}
        {warning}
      </article>
    );
  }

  if (phase === "done") {
    const right = outcomes.filter((o) => o === "correct").length;
    const assisted = outcomes.filter((o) => o === "assisted").length;
    const again = outcomes.filter((o) => o === "again").length;
    const remaining = queue.totalDue;
    return (
      <article aria-labelledby="vocab-done-title" className="pb-4">
        <p className="mono-label text-accent">Fim da sessão</p>
        <h1 id="vocab-done-title" className="mt-1 text-3xl font-bold tracking-tight">Revisão concluída</h1>
        <Card className="mt-4">
          <p className="text-lg">
            Você revisou <strong>{outcomes.length}</strong> {outcomes.length === 1 ? "palavra" : "palavras"}: {right} sem ajuda, {assisted} com ajuda e {again} {again === 1 ? "erro" : "erros"}.
          </p>
          <p className="mt-2 text-muted">
            Acertos sem ajuda avançam o cartão; acertos com ajuda repetem o intervalo; erros voltam amanhã.
          </p>
          {remaining > 0 ? <p className="mt-2 border-l-2 border-accent bg-surface-2 p-3 text-sm">Ainda há {remaining} para revisar. Você pode fazer outra sessão curta.</p> : null}
        </Card>
        {warning}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {remaining > 0 ? <Button onClick={() => start(false)}>Revisar mais</Button> : null}
          <ButtonLink href="/vocabulario" variant="secondary">Voltar ao vocabulário</ButtonLink>
        </div>
      </article>
    );
  }

  return (
    <>
      <Plate className="mb-6" label="Revisão diária" number={String(queue.totalDue).padStart(2, "0")}>
        {queue.totalDue > 0 ? (
          <>
            <p className="text-lg">
              {queue.totalDue === 1 ? "1 palavra" : `${queue.totalDue} palavras`} para revisar. Esta sessão tem {queue.session.length} (cerca de {Math.max(2, Math.ceil(queue.session.length / 2))} minutos).
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => start(false)}>{`Começar revisão (${queue.session.length})`}</Button>
              <Button variant="secondary" onClick={() => start(true)}>Só cartões, sem digitar</Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Nada para revisar agora</h2>
            <p className="mt-2 text-muted">
              {Object.keys(progress.cards).some((key) => key.startsWith("v:"))
                ? "Suas palavras salvas voltam quando chegar a data de cada uma."
                : "Salve palavras em Vocabulário para começar a revisá-las aqui."}
            </p>
          </>
        )}
        {warning}
      </Plate>
      <section aria-labelledby="vocab-how" className="border-t border-line pt-5">
        <h2 id="vocab-how" className="text-lg font-semibold">Como funciona</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          <li>Você completa frases com a palavra em coreano; a tradução da frase sempre aparece depois da resposta.</li>
          <li>Acerto sem ajuda avança a caixa (1, 2, 4, 8 e 16 dias); erro volta para a primeira.</li>
          <li>O áudio é a voz coreana do seu navegador e não avalia sua pronúncia.</li>
          <li>Conteúdo em revisão por falante nativo.</li>
        </ul>
        <div className="mt-4"><Badge tone="neutral">Em revisão</Badge></div>
      </section>
    </>
  );
}
