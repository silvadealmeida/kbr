"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { shuffle } from "@/lib/exercises/shuffle";

/**
 * O servidor não pode sortear: o HTML dele precisa bater com a primeira
 * renderização do cliente. No cliente, o layout effect troca a ordem antes da
 * primeira pintura, então não há piscada da ordem autoral.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type ShuffledState<T> = { signature: string; items: readonly T[] } | null;

/**
 * Embaralha uma vez por montagem/tentativa.
 *
 * - Montagem nova (novo item, “Refazer”, nova sessão de revisão) = nova ordem.
 * - Re-render, tema, áudio, foco, feedback ou status de sync = mesma ordem.
 * - Mudança de assinatura no mesmo componente = nova ordem para o novo conjunto.
 *
 * A assinatura identifica o conjunto de alternativas. Ela não usa a posição, e
 * sim os IDs (ou valores) estáveis. `items` fica fora das dependências de
 * propósito: os componentes recriam arrays a cada render.
 */
export function useShuffledOrder<T>(items: readonly T[], signature: string): readonly T[] {
  const [state, setState] = useState<ShuffledState<T>>(null);

  useIsomorphicLayoutEffect(() => {
    setState((current) =>
      current?.signature === signature
        ? current
        : { signature, items: shuffle(items) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mesma tentativa não reembaralha
  }, [signature]);

  return state?.signature === signature ? state.items : items;
}
