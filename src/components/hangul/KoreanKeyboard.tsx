"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  KEYBOARD_CONSONANTS,
  KEYBOARD_VOWELS,
  backspaceJamo,
  insertJamo,
  insertSpace,
} from "@/lib/hangul/keyboard";

function Key({
  label,
  ariaLabel,
  disabled,
  onPress,
}: {
  label: string;
  ariaLabel?: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      lang="ko"
      aria-label={ariaLabel ?? `Inserir ${label}`}
      disabled={disabled}
      onClick={onPress}
      className="flex min-h-12 items-center justify-center rounded-[var(--radius-field)] border border-line-strong bg-surface font-ko text-lg font-semibold transition-colors duration-[var(--motion-fast)] hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

/**
 * Teclado de jamo para digitar coreano sem depender do teclado do sistema.
 * Cada tecla insere e compõe a sílaba no fim do texto (`insertJamo`); o teclado
 * físico continua funcionando normalmente.
 */
export function KoreanKeyboard({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-3">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar teclado coreano" : "Teclado coreano"}
      </Button>
      {open ? (
        <div
          id={id}
          role="group"
          aria-label="Teclado coreano"
          className="mt-2 rounded-[var(--radius-field)] border border-line bg-surface-2 p-3"
        >
          <p className="text-xs text-muted">
            Digite na ordem da sílaba: consoante inicial → vogal → batchim. As teclas entram no
            fim do texto.
          </p>
          <p className="mono-label mt-3 text-muted">Consoantes</p>
          <div className="mt-1.5 grid grid-cols-6 gap-1.5 min-[420px]:grid-cols-8 sm:grid-cols-10">
            {KEYBOARD_CONSONANTS.map((key) => (
              <Key
                key={key}
                label={key}
                disabled={disabled}
                onPress={() => onChange(insertJamo(value, key))}
              />
            ))}
          </div>
          <p className="mono-label mt-3 text-muted">Vogais</p>
          <div className="mt-1.5 grid grid-cols-6 gap-1.5 min-[420px]:grid-cols-8 sm:grid-cols-10">
            {KEYBOARD_VOWELS.map((key) => (
              <Key
                key={key}
                label={key}
                disabled={disabled}
                onPress={() => onChange(insertJamo(value, key))}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <Key
              label="Espaço"
              ariaLabel="Inserir espaço"
              disabled={disabled}
              onPress={() => onChange(insertSpace(value))}
            />
            <Key
              label="Apagar"
              ariaLabel="Apagar o último jamo"
              disabled={disabled}
              onPress={() => onChange(backspaceJamo(value))}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
