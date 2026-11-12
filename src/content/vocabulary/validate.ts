import { isHangulText } from "@/lib/hangul";
import type { VocabEntry, VocabSentence } from "./types";

export type VocabIssue = { id: string; message: string };

const SENSE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
  const forms = new Map<string, string[]>();

  for (const e of entries) {
    if (ids.has(e.id)) add(e.id, "id duplicado");
    ids.add(e.id);
    const expectedId = `ko:${e.ko}${e.sense ? `#${e.sense}` : ""}`;
    if (e.id !== expectedId) add(e.id, "id deve ser ko:<ko> ou ko:<ko>#<sense>");
    if (e.sense !== undefined && !SENSE_ID.test(e.sense)) add(e.id, "sense inválido");
    if (!e.ko || !isHangulText(e.ko)) add(e.id, "ko inválido");
    if (!e.pt.trim()) add(e.id, "tradução ausente");
    if (!e.audioText || !isHangulText(e.audioText)) add(e.id, "audioText inválido");
    if (!lessonIds.get(e.course)?.has(e.lesson)) add(e.id, `lição de origem inexistente: ${e.course}/${e.lesson}`);
    forms.set(e.ko, [...(forms.get(e.ko) ?? []), e.id]);
  }

  for (const [form, formIds] of forms) {
    if (formIds.length <= 1) continue;
    const sameForm = entries.filter((entry) => entry.ko === form);
    if (sameForm.some((entry) => !entry.sense)) {
      add(formIds.join(","), "homógrafos separados exigem sense em todos os itens");
    }
    if (new Set(sameForm.map((entry) => entry.sense)).size !== sameForm.length) {
      add(formIds.join(","), "sense duplicado para a mesma forma coreana");
    }
  }

  const sentenceIds = new Set<string>();
  const entryById = new Map(entries.map((e) => [e.id, e]));
  for (const s of sentences) {
    if (sentenceIds.has(s.id)) add(s.id, "id de frase duplicado");
    sentenceIds.add(s.id);
    if (!entryById.has(s.vocabId)) { add(s.id, `vocabId inexistente: ${s.vocabId}`); continue; }
    if (!s.target.trim()) add(s.id, "alvo vazio");
    if (!s.pt.trim()) add(s.id, "tradução da frase ausente");
    if (!s.contextMeaning.trim()) add(s.id, "dica de sentido ausente");
    if (!/[가-힣]/.test(s.ko)) add(s.id, "frase sem hangul");
    if (targetPosition(s) === null) add(s.id, "alvo deve ocorrer exatamente uma vez, no início de uma palavra");
    for (const a of s.accepted ?? []) {
      const other = forms.get(a)?.find((id) => id !== s.vocabId);
      if (a === s.target) add(s.id, "variante repete o alvo");
      else if (other && other !== s.vocabId) add(s.id, `variante ambígua: ${a} é outro item (${other})`);
    }
  }
  return issues;
}
