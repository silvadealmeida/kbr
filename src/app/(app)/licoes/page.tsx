import { redirect } from "next/navigation";

/** Rota legada: o catálogo de cursos substituiu o placeholder de lições. */
export default function Page() {
  redirect("/cursos");
}
