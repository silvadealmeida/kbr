import { isHangulText } from "@/lib/hangul";
import type { VocabEntry, VocabSentence } from "./types";

export type VocabIssue = { id: string; message: string };

/** Fronteira de palavra: início da frase ou depois de espaço. */
export function targetPosition(sentence: Pick<VocabSentence, "ko" | "target">): number | null {
  const { ko, target } = sentence;
  const first = ko.indexOf(target);
  if (first < 0 || ko.indexOf(target, first + 1) >= 0) return null;
  return first === 0 || ko[first - 1] === " " ? first : null;
}

/**
 * Validação ESTRUTURAL (formato, referências, unicidade). Não prova que o
 * coreano é natural ou correto — isso exige revisão por falante nativo.
 */
export function validateVocabulary(
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
  lessonIds: ReadonlyMap<string, ReadonlySet<string>>,
): VocabIssue[] {
  const issues: VocabIssue[] = [];
  const add = (id: string, message: string) => issues.push({ id, message });
  const ids = new Set<string>();
  const forms = new Map<string, string>();

  for (const e of entries) {
    if (ids.has(e.id)) add(e.id, "id duplicado");
    ids.add(e.id);
    if (e.id !== `ko:${e.ko}`) add(e.id, "id deve ser ko:<ko>");
    if (!e.ko || !isHangulText(e.ko)) add(e.id, "ko inválido");
    if (!e.pt.trim()) add(e.id, "tradução ausente");
    if (!e.audioText || !isHangulText(e.audioText)) add(e.id, "audioText inválido");
    if (!lessonIds.get(e.course)?.has(e.lesson)) add(e.id, `lição de origem inexistente: ${e.course}/${e.lesson}`);
    if (forms.has(e.ko)) add(e.id, "forma coreana duplicada");
    forms.set(e.ko, e.id);
  }

  const sentenceIds = new Set<string>();
  const entryById = new Map(entries.map((e) => [e.id, e]));
  for (const s of sentences) {
    if (sentenceIds.has(s.id)) add(s.id, "id de frase duplicado");
    sentenceIds.add(s.id);
    const entry = entryById.get(s.vocabId);
    if (!entry) { add(s.id, `vocabId inexistente: ${s.vocabId}`); continue; }
    if (s.target !== entry.ko) add(s.id, "alvo difere do item de vocabulário");
    if (!s.pt.trim()) add(s.id, "tradução da frase ausente");
    if (!s.contextMeaning.trim()) add(s.id, "dica de sentido ausente");
    if (!/[가-힣]/.test(s.ko)) add(s.id, "frase sem hangul");
    if (targetPosition(s) === null) add(s.id, "alvo deve ocorrer exatamente uma vez, no início de uma palavra");
    for (const a of s.accepted ?? []) {
      const other = forms.get(a);
      if (a === s.target) add(s.id, "variante repete o alvo");
      else if (other && other !== s.vocabId) add(s.id, `variante ambígua: ${a} é outro item (${other})`);
    }
  }
  return issues;
}
