import type { Metadata } from "next";
import { AccountCard } from "@/components/auth/AccountCard";
import { DashboardArea } from "@/components/dashboard/DashboardArea";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Painel" };

export default function Dashboard() {
  return (
    <>
      <PageHeader
        ko="안녕하세요!"
        title="Seu painel"
        subtitle="Seu progresso real no módulo Hangul, com o próximo passo e a revisão do dia."
      />

      <AccountCard />
      <DashboardArea />
    </>
  );
}
