"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SpeechController,
  type RecognitionMode,
  type SpeechState,
  type SpeechSupport,
} from "@/lib/speech/recognition";

/**
 * Liga um `SpeechController` ao React. O controlador só é criado depois que o
 * navegador confirma suporte, e nunca inicia sozinho: `start` precisa de um
 * clique. Desmontar ou ficar inativo libera o microfone.
 */
export function useSpeechPractice(support: SpeechSupport | null, active: boolean) {
  const [state, setState] = useState<SpeechState>({ status: "idle" });
  const controller = useRef<SpeechController | null>(null);

  useEffect(() => {
    if (!support?.supported) return;
    const instance = new SpeechController({ ctor: support.ctor, onStateChange: setState });
    controller.current = instance;
    return () => {
      instance.destroy();
      controller.current = null;
    };
  }, [support]);

  useEffect(() => {
    if (!active) controller.current?.cancel();
  }, [active]);

  const start = useCallback((mode: RecognitionMode, consent: boolean) => {
    if (typeof navigator !== "undefined" && mode === "remote" && navigator.onLine === false) {
      setState({ status: "error", reason: "network" });
      return;
    }
    controller.current?.start({ mode, consent });
  }, []);
  const stop = useCallback(() => controller.current?.stop(), []);
  const cancel = useCallback(() => controller.current?.cancel(), []);

  return { state, start, stop, cancel };
}
