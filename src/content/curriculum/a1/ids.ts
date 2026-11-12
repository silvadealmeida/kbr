/**
 * IDs estáveis das 40 lições A1. Módulo leve: importadores que só precisam
 * validar referências (por exemplo, o registro canônico de vocabulário) não
 * carregam o blueprint completo no bundle do cliente.
 *
 * O blueprint continua sendo a fonte editorial; `validateA1Blueprint` e os
 * testes garantem que as lições usam exatamente estes IDs, em ordem.
 */
export const A1_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from(
    { length: 40 },
    (_, index) => `a1-l${String(index + 1).padStart(2, "0")}`,
  ),
);