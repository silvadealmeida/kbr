"use client";

import { useAuth } from "./AuthProvider";

/**
 * Aviso global de conectividade. Não afirma que a lição funciona offline nem
 * que o progresso já está na conta: apenas explica que o salvamento local
 * continua valendo e que a sincronização depende da rede.
 */
export function ConnectionNotice() {
  const { isOnline } = useAuth();
  if (isOnline) return null;

  return (
    <p
      role="status"
      className="mb-4 rounded-2xl border border-border bg-soft p-4 text-sm text-fg"
    >
      <span className="font-semibold">Sem conexão.</span> O que você já abriu continua
      nesta tela e o progresso fica salvo neste dispositivo. A sincronização com sua
      conta acontece quando a conexão voltar; abrir o app de novo sem rede pode não
      funcionar.
    </p>
  );
}
