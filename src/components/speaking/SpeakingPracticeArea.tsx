"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { WORDS } from "@/content/hangul";
import { SPEAKING_WORD_IDS } from "@/content/speaking";
import {
  detectSpeechSupport,
  installLocalKorean,
  probeLocalKorean,
  type LocalAvailability,
  type RecognitionMode,
  type SpeechSupport,
} from "@/lib/speech/recognition";
import { SpeakingPractice } from "./SpeakingPractice";

const ITEMS = SPEAKING_WORD_IDS.map((id) => WORDS.find((word) => word.id === id)).filter(
  (word): word is NonNullable<typeof word> => Boolean(word),
);

export function modeFor(
  support: SpeechSupport | null,
  local: LocalAvailability | null,
): RecognitionMode | null {
  if (!support?.supported) return null;
  return local === "available" ? "local" : "remote";
}

const UNSUPPORTED: Record<string, string> = {
  "no-api":
    "Este navegador não oferece reconhecimento de fala para sites (ele depende do navegador e do sistema; no iPhone exige o Safari com Siri/Ditado ativos e não funciona no app instalado na Tela de Início). Use o campo de texto de cada cartão ou o ditado do teclado.",
  "insecure-context":
    "O reconhecimento de fala só funciona em conexão segura (HTTPS).",
  "no-window": "Verificando o navegador…",
};

export function SpeakingPracticeArea() {
  const [support, setSupport] = useState<SpeechSupport | null>(null);
  const [local, setLocal] = useState<LocalAvailability | null>(null);
  const [consent, setConsent] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [installing, setInstalling] = useState<"idle" | "busy" | "failed">("idle");

  useEffect(() => {
    // Detecção em efeito: precisa de `window`, que não existe na renderização no servidor.
    const detected = detectSpeechSupport(typeof window === "undefined" ? undefined : (window as never));
    setSupport(detected);
    let alive = true;
    void probeLocalKorean(detected).then((value) => {
      if (alive) setLocal(value);
    });
    return () => {
      alive = false;
    };
  }, []);

  const mode = modeFor(support, local);

  async function install() {
    if (!support) return;
    setInstalling("busy");
    const ok = await installLocalKorean(support);
    setInstalling(ok ? "idle" : "failed");
    setLocal(await probeLocalKorean(support));
  }

  return (
    <div className="flex flex-col gap-6">
      <Notice tone="info" title="Recurso experimental">
        Fale a palavra e veja o que o navegador reconheceu. Isto não vale nota,
        não altera seu progresso nem bloqueia lições, e não avalia a qualidade da
        pronúncia: reconhecer a palavra certa não significa pronúncia nativa.
      </Notice>

      {support === null ? (
        <p role="status" className="text-sm text-muted">
          Verificando o navegador…
        </p>
      ) : !support.supported ? (
        <Notice tone="warning" title="Reconhecimento de fala indisponível">
          {UNSUPPORTED[support.reason]}
        </Notice>
      ) : local === "available" ? (
        <Notice tone="success" title="Reconhecimento no aparelho">
          O navegador informa que o pacote de coreano está instalado e o
          reconhecimento será feito localmente (<code>processLocally</code>).
          Nenhuma gravação é enviada ou guardada pelo KBR.
        </Notice>
      ) : (
        <Notice tone="warning" title="O navegador pode enviar sua voz a um serviço externo">
          {local === "downloadable" || local === "downloading"
            ? "O reconhecimento local de coreano pode ser instalado neste navegador. "
            : "Não conseguimos confirmar reconhecimento local de coreano neste navegador. "}
          Sem ele, o navegador pode enviar o áudio ao serviço de reconhecimento
          do fabricante (por exemplo Google ou Apple), sob a política dele. O KBR
          não grava, não guarda e não envia esse áudio.
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {local === "downloadable" ? (
              <Button variant="secondary" loading={installing === "busy"} onClick={install}>
                Instalar reconhecimento local (coreano)
              </Button>
            ) : null}
            <Button
              variant={consent ? "secondary" : "primary"}
              aria-pressed={consent}
              onClick={() => setConsent((value) => !value)}
            >
              {consent
                ? "Revogar permissão"
                : "Permitir reconhecimento pelo navegador"}
            </Button>
          </div>
          <p aria-live="polite" className="mt-2 text-sm">
            {consent
              ? "Permissão dada nesta visita; ela não é salva."
              : "Sem permissão, o botão Falar não ativa o microfone."}
            {installing === "failed"
              ? " Não foi possível instalar o pacote local agora."
              : ""}
          </p>
        </Notice>
      )}

      <ul className="flex flex-col gap-4">
        {ITEMS.map((word) => (
          <li key={word.id}>
            <SpeakingPractice
              id={word.id}
              ko={word.ko}
              pt={word.pt}
              audioText={word.audioText ?? word.ko}
              support={support}
              mode={mode}
              consent={mode === "local" || consent}
              active={activeId === word.id}
              onActivate={() => setActiveId(word.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
