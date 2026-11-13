"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AudioControl, BilingualText } from "@/components/hangul/exercise-media";
import { Button } from "@/components/ui/Button";
import { Input, fieldDescribedBy } from "@/components/ui/Field";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary";
import { checkVocabAnswer, fillSentence, hintFor, type VocabOutcome } from "@/lib/vocabulary";

type Props = {
  entry: VocabEntry;
  sentence: VocabSentence;
  isLast: boolean;
  /** Chamado uma única vez, na primeira resposta; retentativas não reagendam. */
  onGrade: (outcome: VocabOutcome) => void;
  onNext: () => void;
};

function StatusIcon({ ok }: { ok: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" />
      {ok ? <path d="m6.5 10 2.4 2.4 4.6-5" /> : <path d="M10 6.5v4.2M10 13.6h.01" />}
    </svg>
  );
}

/**
 * Frase com lacuna. Três estados independentes: tradução aberta (antes de
 * responder), pista usada e resultado. Depois de responder, a frase completa
 * e a tradução aparecem sempre — acerto ou erro, tradução aberta ou não.
 */
export function ContextualCard({ entry, sentence, isLast, onGrade, onNext }: Props) {
  const uid = useId();
  const inputId = `${uid}-answer`;
  const translationId = `${uid}-translation`;
  const [value, setValue] = useState("");
  const [translationOpen, setTranslationOpen] = useState(false);
  const [usedTranslation, setUsedTranslation] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);
  const [emptyError, setEmptyError] = useState(false);
  const [retried, setRetried] = useState(false);
  const graded = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const at = sentence.ko.indexOf(sentence.target);
  const before = sentence.ko.slice(0, at);
  const after = sentence.ko.slice(at + sentence.target.length);
  const assisted = usedTranslation || hintOpen;

  const submit = () => {
    if (result?.correct) return;
    const check = checkVocabAnswer(sentence, value);
    if (check.empty) return setEmptyError(true);
    setEmptyError(false);
    setResult({ correct: check.correct });
    if (!graded.current) {
      graded.current = true;
      onGrade(!check.correct ? "again" : assisted ? "assisted" : "correct");
    }
  };

  const retry = () => {
    setResult(null);
    setValue("");
    setRetried(true);
    queueMicrotask(() => inputRef.current?.focus());
  };

  const tone = result?.correct
    ? "border-success bg-success-soft"
    : result
      ? "border-danger bg-danger-soft"
      : "border-line bg-surface";

  return (
    <section aria-label="Prática contextual" className="mt-4">
      <div className="rounded-[var(--radius-plate)] border border-line bg-surface p-5">
        <p className="mono-label text-muted">Complete a frase</p>
        <p lang="ko" className="font-ko mt-3 text-[1.75rem] font-medium leading-snug">
          {result ? (
            <>
              <span className="sr-only">Frase completa: </span>
              {before}
              <strong className={`rounded-sm px-1 ${result.correct ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
                {sentence.target}
              </strong>
              {after}
            </>
          ) : (
            <>
              {before}
              <span className="mx-1 inline-block min-w-16 border-b-2 border-fg text-center" aria-hidden>
                &nbsp;
              </span>
              <span className="sr-only">lacuna</span>
              {after}
            </>
          )}
        </p>
        <p className="mt-3 text-lg">
          Palavra esperada: <strong>{sentence.contextMeaning}</strong>
        </p>

        {!result ? (
          <div className="mt-3">
            <button
              type="button"
              aria-expanded={translationOpen}
              aria-controls={translationId}
              onClick={() => {
                setTranslationOpen((open) => !open);
                setUsedTranslation(true);
              }}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              {translationOpen ? "Ocultar tradução da frase" : "Mostrar tradução da frase"}
            </button>
            <p id={translationId} hidden={!translationOpen} className="mt-1 text-muted">
              “{sentence.pt}”
            </p>
          </div>
        ) : null}
      </div>

      {!result ? (
        <form
          className="mt-4 flex flex-col gap-3"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor={inputId} className="text-sm font-medium">
              {retried ? "Tente de novo: a palavra que falta" : "Digite a palavra que falta (em coreano)"}
            </label>
            <Input
              id={inputId}
              ref={inputRef}
              lang="ko"
              className="font-ko text-xl"
              value={value}
              invalid={emptyError}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
              aria-describedby={fieldDescribedBy(inputId, { error: emptyError ? "x" : undefined })}
              onChange={(event) => {
                setValue(event.target.value);
                setEmptyError(false);
              }}
              // Enter durante a composição do IME coreano confirma a sílaba, não envia.
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229) event.preventDefault();
              }}
            />
            {emptyError ? (
              <p id={`${inputId}-error`} role="alert" className="text-sm text-danger">
                Digite a palavra antes de verificar.
              </p>
            ) : null}
          </div>

          {hintOpen ? (
            <p className="rounded-[var(--radius-field)] border border-warning bg-warning-soft p-3 text-sm">
              <strong>Pista:</strong> <BilingualText text={hintFor(entry)} />
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit">Verificar</Button>
            {!hintOpen ? (
              <Button type="button" variant="secondary" onClick={() => setHintOpen(true)}>
                Pista
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted">
            Abrir a tradução ou a pista é permitido; nesse caso o acerto repete o intervalo atual em vez de avançar o cartão.
          </p>
        </form>
      ) : (
        <div aria-live="polite" className={`mt-4 rounded-[var(--radius-plate)] border-2 p-5 ${tone}`}>
          <h2
            ref={resultRef}
            tabIndex={-1}
            className={`flex items-center gap-2 text-xl font-bold outline-offset-4 ${result.correct ? "text-success" : "text-danger"}`}
          >
            <StatusIcon ok={result.correct} />
            {result.correct ? "Correto!" : "Ainda não — veja a resposta"}
          </h2>
          {result.correct && assisted && !retried ? (
            <p className="mt-2 text-sm">Você usou ajuda: o cartão será revisto no mesmo intervalo, sem avançar de caixa.</p>
          ) : null}
          {!result.correct ? (
            <p className="mt-2 text-sm">
              Você digitou <BilingualText text={value.trim() || "—"} />. Errar faz parte; o cartão volta amanhã.
            </p>
          ) : null}
          {retried ? <p className="mt-2 text-sm text-muted">Esta tentativa extra não altera a agenda do cartão.</p> : null}
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="mono-label text-muted">Palavra esperada</dt>
              <dd className="text-lg">
                <span lang="ko" className="font-ko text-2xl font-bold">{sentence.target}</span> — {sentence.contextMeaning}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-muted">Tradução</dt>
              <dd className="text-lg">“{sentence.pt}”</dd>
            </div>
          </dl>
          <AudioControl text={sentence.ko} label="Ouvir a frase" />
          <div className="mt-4 flex flex-wrap gap-3">
            {!result.correct ? (
              <Button variant="secondary" onClick={retry}>
                Tentar de novo
              </Button>
            ) : null}
            <Button onClick={onNext}>{isLast ? "Concluir" : "Próximo cartão"}</Button>
          </div>
        </div>
      )}
    </section>
  );
}
