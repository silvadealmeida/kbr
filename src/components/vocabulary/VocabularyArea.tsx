"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AudioControl, BilingualText } from "@/components/hangul/exercise-media";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, Plate } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { VOCAB_ENTRIES, sentencesFor, type VocabEntry } from "@/content/vocabulary";
import {
  VOCAB_STATUS_LABEL,
  isDue,
  isSaved,
  removeVocab,
  saveMany,
  saveVocab,
  summarizeVocab,
  vocabStatus,
  type VocabStatus,
} from "@/lib/vocabulary";
import type { Progress } from "@/lib/storage";
import { useVocabProgress } from "./useVocabProgress";

const PAGE = 30;
const STATUS_TONE: Record<VocabStatus, BadgeTone> = {
  available: "neutral",
  encountered: "accent",
  learning: "warning",
  consolidated: "success",
};

const fold = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const lessonOrder = (id: string) => id.replace(/\d+/g, (n) => n.padStart(4, "0"));
const LESSONS = [...new Set(VOCAB_ENTRIES.map((e) => `${e.course}/${e.lesson}`))].sort((a, b) => lessonOrder(a).localeCompare(lessonOrder(b)));
const COURSES = [...new Set(VOCAB_ENTRIES.map((e) => e.course))];
const COURSE_LABEL: Record<string, string> = {
  hangul: "Hangul",
  "ko-a1": "Coreano A1",
  "ko-a2": "Coreano A2",
  "ko-b1": "Coreano B1",
  "ko-b2": "Coreano B2",
  "ko-c1": "Coreano C1",
  "ko-c2": "Coreano C2",
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-l border-line py-1 pl-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Row({
  entry,
  progress,
  now,
  onToggle,
}: {
  entry: VocabEntry;
  progress: Progress;
  now: Date;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const saved = isSaved(progress, entry.id);
  const status = vocabStatus(progress, entry);
  const sentences = sentencesFor(entry.id);
  return (
    <li className="rounded-[var(--radius-field)] border border-line bg-surface p-4" data-testid="vocab-row">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p lang="ko" className="font-ko text-2xl font-bold">{entry.ko}</p>
          <p className="text-muted">{entry.pt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={STATUS_TONE[status]}>{VOCAB_STATUS_LABEL[status]}</Badge>
          {isDue(progress, entry.id, now) ? <Badge tone="danger">Para revisar</Badge> : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant={saved ? "secondary" : "primary"} onClick={onToggle} aria-pressed={saved} aria-label={`${saved ? "Remover" : "Salvar"} ${entry.ko}`}>
          {saved ? "Remover" : "Salvar"}
        </Button>
        <Button size="sm" variant="ghost" aria-expanded={open} aria-label={`${open ? "Ocultar" : "Ver"} detalhes de ${entry.ko}`} onClick={() => setOpen(!open)}>
          {open ? "Ocultar" : "Detalhes"}
        </Button>
      </div>
      {open ? (
        <div className="mt-3 space-y-3 border-t border-line pt-3 text-sm">
          <p className="text-muted">
            {entry.pos ? `${entry.pos} · ` : ""}apresentada em {COURSE_LABEL[entry.course] ?? entry.course} · lição {entry.lesson} · conteúdo em revisão
          </p>
          {entry.notes ? (
            <p className="text-muted">
              <BilingualText text={entry.notes} />
            </p>
          ) : null}
          <AudioControl text={entry.audioText} label="Ouvir a palavra" compact />
          {sentences.length ? (
            <ul className="space-y-2">
              {sentences.map((s) => (
                <li key={s.id}>
                  <AudioControl text={s.ko} label="Ouvir a frase" compact />
                  <p lang="ko" className="font-ko mt-2 text-lg">{s.ko}</p>
                  <p className="text-muted">“{s.pt}”</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Ainda sem frase de exemplo.</p>
          )}
        </div>
      ) : null}
    </li>
  );
}

export function VocabularyArea() {
  const { progress, update, loading, loadError, syncNote } = useVocabProgress();
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("");
  const [lesson, setLesson] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const now = new Date();
  const visible = useMemo(() => {
    const q = fold(query.trim());
    const words = q.split(/\s+/).filter(Boolean);
    const ptMatches = (text: string) => {
      if (words.length === 0) return true;
      const tokens = fold(text).split(/[^a-z0-9]+/).filter(Boolean);
      return words.every((word) => tokens.some((token) => token.startsWith(word)));
    };
    return VOCAB_ENTRIES.filter(
      (e) =>
        (!course || e.course === course) &&
        (!lesson || `${e.course}/${e.lesson}` === lesson) &&
        (!q || e.ko.includes(query.trim()) || ptMatches(e.pt)) &&
        (!onlySaved || (progress ? isSaved(progress, e.id) : false)),
    );
  }, [query, course, lesson, onlySaved, progress]);

  if (loading) return <Card><p role="status" className="text-muted">Carregando seu vocabulário…</p></Card>;
  if (loadError || !progress) {
    return (
      <Card>
        <p className="font-semibold">Não foi possível carregar seu vocabulário.</p>
        <p className="mt-1 text-muted">Verifique se o armazenamento do navegador está disponível e tente novamente.</p>
      </Card>
    );
  }

  const summary = summarizeVocab(progress, now);
  const lessonScope = lesson ? visible : [];
  const unsavedInLesson = lessonScope.filter((e) => !isSaved(progress, e.id));

  return (
    <>
      <Plate className="mb-6" label="Seu vocabulário" number={String(summary.saved).padStart(2, "0")}>
        <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          <Stat label="Salvas" value={summary.saved} />
          <Stat label="Para revisar" value={summary.due} />
          <Stat label="Em aprendizagem" value={summary.learning} />
          <Stat label="Consolidadas" value={summary.consolidated} />
        </div>
        <p className="mt-3 text-xs text-muted">Consolidada: caixa 4 ou mais (3 acertos seguidos sem ajuda; próxima revisão em 8 dias ou mais).</p>
        {summary.saved === 0 ? (
          <p className="mt-4 text-muted">Você ainda não salvou palavras. Escolha algumas abaixo com “Salvar” para praticá-las em frases.</p>
        ) : summary.due > 0 ? (
          <ButtonLink href="/vocabulario/revisao" className="mt-4 w-full sm:w-auto">{`Revisão diária (${summary.due})`}</ButtonLink>
        ) : (
          <p className="mt-4 text-muted">Nenhuma palavra para revisar agora.</p>
        )}
        {syncNote ? <p role="status" className="mt-3 border-l-2 border-accent bg-surface-2 p-3 text-sm text-muted">{syncNote}</p> : null}
      </Plate>

      <section aria-labelledby="vocab-list-title">
        <h2 id="vocab-list-title" className="text-xl font-semibold">Palavras</h2>
        <form role="search" className="mt-3 grid gap-3 min-[560px]:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="min-[560px]:col-span-2">
            <label htmlFor="vocab-q" className="text-sm font-medium">Buscar em coreano ou português</label>
            <Input id="vocab-q" type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }} placeholder="사과 ou maçã" autoComplete="off" />
            <p className="mt-2 text-xs text-muted">
              A busca cobre só as palavras apresentadas nas lições do KBR; não é um dicionário.
            </p>
          </div>
          <div>
            <label htmlFor="vocab-course" className="text-sm font-medium">Curso</label>
            <select id="vocab-course" value={course} onChange={(e) => { setCourse(e.target.value); setLesson(""); setLimit(PAGE); }} className="min-h-12 w-full rounded-[var(--radius-field)] border-[1.5px] border-muted bg-surface px-3 text-base">
              <option value="">Todos</option>
              {COURSES.map((c) => <option key={c} value={c}>{COURSE_LABEL[c] ?? c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="vocab-lesson" className="text-sm font-medium">Lição</label>
            <select id="vocab-lesson" value={lesson} onChange={(e) => { setLesson(e.target.value); setLimit(PAGE); }} className="min-h-12 w-full rounded-[var(--radius-field)] border-[1.5px] border-muted bg-surface px-3 text-base">
              <option value="">Todas</option>
              {LESSONS.filter((l) => !course || l.startsWith(`${course}/`)).map((l) => <option key={l} value={l}>{l.split("/")[1]}</option>)}
            </select>
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm min-[560px]:col-span-2">
            <input type="checkbox" checked={onlySaved} onChange={(e) => { setOnlySaved(e.target.checked); setLimit(PAGE); }} className="size-5 shrink-0 accent-[var(--accent)]" />
            Mostrar só as salvas
          </label>
        </form>

        {lesson && unsavedInLesson.length > 0 ? (
          <Button className="mt-3" variant="secondary" onClick={() => update((p, n) => saveMany(p, unsavedInLesson.map((e) => e.id), n))}>
            {`Salvar as ${unsavedInLesson.length} palavras desta lição`}
          </Button>
        ) : null}

        <p role="status" className="mt-4 text-sm text-muted">
          {visible.length === 0 ? "Nenhuma palavra das lições corresponde à busca." : `${visible.length} ${visible.length === 1 ? "palavra" : "palavras"}`}
        </p>
        {visible.length === 0 && onlySaved && summary.saved === 0 ? (
          <p className="mt-2 text-muted">Você ainda não salvou nenhuma. Desmarque o filtro e use “Salvar”.</p>
        ) : null}
        <ul className="mt-2 flex flex-col gap-3">
          {visible.slice(0, limit).map((entry) => (
            <Row key={entry.id} entry={entry} progress={progress} now={now}
              onToggle={() => update((p, n) => (isSaved(p, entry.id) ? removeVocab(p, entry.id, n) : saveVocab(p, entry.id, n)))} />
          ))}
        </ul>
        {visible.length > limit ? (
          <Button className="mt-4" variant="secondary" onClick={() => setLimit(limit + PAGE)}>{`Mostrar mais (${visible.length - limit})`}</Button>
        ) : null}
        <p className="mt-6 text-sm text-muted">
          Palavras vêm das lições; o conteúdo coreano está em revisão por falante nativo.{" "}
          <Link href="/hangul" className="font-semibold text-accent underline-offset-4 hover:underline">Ir ao Hangul</Link>
        </p>
      </section>
    </>
  );
}
