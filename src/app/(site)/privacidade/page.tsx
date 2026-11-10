import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Como o KBR trata dados de conta, progresso de aprendizagem, cookies e armazenamento local.",
};

const updated = "10 de novembro de 2026";

const storageRows = [
  {
    name: "sb-<projeto>-auth-token (e partes .0, .1…)",
    type: "Cookie",
    purpose:
      "Mantém a sessão do Supabase Auth e permite renová-la sem pedir login a cada visita.",
    lifetime:
      "Até 400 dias, valor padrão do SDK do Supabase; pode ser reduzido na configuração do projeto.",
  },
  {
    name: "sb-<projeto>-auth-token-code-verifier",
    type: "Cookie temporário",
    purpose: "Protege o fluxo OAuth PKCE durante a entrada com Google.",
    lifetime: "Curto; removido ao concluir ou falhar a entrada.",
  },
  {
    name: "kbr_auth_next",
    type: "Cookie temporário",
    purpose:
      "Guarda o destino interno seguro (o painel por padrão) para retomar depois da entrada com Google.",
    lifetime: "Até 10 minutos; apagado ao concluir o redirecionamento.",
  },
  {
    name: "kbr:theme",
    type: "localStorage",
    purpose: "Guarda sua preferência de tema claro ou escuro.",
    lifetime: "Até você limpar os dados do site.",
  },
  {
    name: "kbr:v1",
    type: "localStorage",
    purpose:
      "Progresso de convidado: lições, cartões, histórico, sequência e meta diária.",
    lifetime: "Até você limpar os dados do site.",
  },
  {
    name: "kbr:user:<id>:v1",
    type: "localStorage",
    purpose: "Cópia local do progresso vinculada à sua conta, usada para sincronização.",
    lifetime: "Até você limpar os dados do site.",
  },
  {
    name: "kbr:migrated:<id>:v1",
    type: "localStorage",
    purpose:
      "Marcador que evita repetir a migração do progresso de convidado para a conta.",
    lifetime: "Até você limpar os dados do site.",
  },
];

const legalBasis = [
  {
    purpose: "Criar e manter sua conta e sincronizar seu progresso.",
    basis:
      "Execução de contrato ou procedimentos preliminares (GDPR, art. 6º, §1º, b; LGPD, art. 7º, V).",
  },
  {
    purpose: "Proteger o serviço, prevenir abuso e manter registros técnicos de segurança.",
    basis:
      "Legítimo interesse (GDPR, art. 6º, §1º, f; LGPD, art. 7º, IX), com ponderação e minimização.",
  },
  {
    purpose: "Cumprir obrigações legais e responder a autoridades competentes.",
    basis: "Obrigação legal (GDPR, art. 6º, §1º, c; LGPD, art. 7º, II).",
  },
  {
    purpose: "Atender pedidos de suporte ou de direitos que você fizer.",
    basis:
      "Execução de contrato, obrigação legal ou legítimo interesse, conforme o pedido.",
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-border pt-8">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-soft px-2 py-0.5 text-xs font-semibold text-brand">
      {children}
    </span>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        Transparência
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Privacidade e proteção de dados
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Esta página explica, em português claro, quais dados o KBR trata, por quê, onde ficam
        e como você pode exercer seus direitos.
      </p>
      <p className="mt-4 text-sm text-muted">
        Última atualização: {updated}. Documento em revisão antes do lançamento público.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed">
        <p className="font-semibold">O KBR está em desenvolvimento.</p>
        <p className="mt-2 text-muted">
          Esta política descreve o que o aplicativo faz hoje. Informações que ainda dependem de
          definição — como identidade legal, contato e prazos de retenção — estão marcadas como
          pendentes e não foram inventadas. Elas serão publicadas antes do lançamento público.
        </p>
      </div>

      <nav aria-label="Nesta página" className="mt-8 rounded-2xl border border-border p-5 text-sm">
        <h2 className="font-semibold">Nesta página</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            ["responsavel", "Quem é o responsável"],
            ["dados", "Dados coletados"],
            ["armazenamento", "Cookies e armazenamento local"],
            ["finalidade", "Finalidade e base legal"],
            ["compartilhamento", "Compartilhamento"],
            ["retencao", "Retenção e exclusão"],
            ["direitos", "Seus direitos"],
            ["seguranca", "Segurança"],
            ["contato", "Contato"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-brand underline underline-offset-2">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10">
        <Section id="responsavel" title="1. Quem é o responsável">
          <p>
            O KBR é um projeto independente de aprendizagem de coreano para pessoas que falam
            português. O responsável pelo tratamento (controlador) será identificado aqui antes
            do lançamento público.
          </p>
          <dl className="grid gap-3 rounded-2xl border border-border bg-surface p-5 text-sm">
            <div>
              <dt className="font-semibold text-fg">Controlador</dt>
              <dd>
                <Pending>a confirmar</Pending> — nome ou razão social, endereço e forma de
                contato.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-fg">Contato de privacidade</dt>
              <dd>
                <Pending>a confirmar</Pending> — endereço de e-mail dedicado a pedidos de
                privacidade.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-fg">Encarregado (DPO)</dt>
              <dd>
                <Pending>a confirmar</Pending> — a necessidade de indicação depende da avaliação
                jurídica.
              </dd>
            </div>
          </dl>
        </Section>

        <Section id="dados" title="2. Dados coletados">
          <h3 className="text-lg font-semibold text-fg">2.1 Conta Google</h3>
          <p>
            A entrada é feita pelo Google OAuth, intermediada pelo Supabase Auth. Com os escopos
            básicos (<code>openid</code>, e-mail e perfil), o serviço recebe e armazena:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>identificador da conta Google (subject) e identificador interno do usuário;</li>
            <li>endereço de e-mail;</li>
            <li>nome e URL da foto de perfil, quando fornecidos pelo Google;</li>
            <li>
              metadados de autenticação e sessão, como provedor, datas de criação e último
              acesso.
            </li>
          </ul>
          <p>
            O KBR não recebe nem armazena sua senha do Google. O e-mail é usado para identificar
            sua conta na interface; o identificador interno separa seu progresso dos demais
            usuários.
          </p>

          <h3 className="text-lg font-semibold text-fg">2.2 Progresso de aprendizagem</h3>
          <p>
            Quando você estuda com uma conta, o progresso é enviado ao Supabase e guardado em um
            registro vinculado ao seu usuário. O documento inclui:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>lições concluídas e pontuações;</li>
            <li>cartões de vocabulário e a agenda de revisão;</li>
            <li>histórico de tentativas, sequência de estudo e meta diária;</li>
            <li>data da última atividade.</li>
          </ul>
          <p>
            As políticas de segurança do banco (Row Level Security) restringem leitura e escrita
            ao próprio usuário. Também mantemos uma cópia local no navegador para funcionar
            durante falhas de rede e para o modo convidado.
          </p>

          <h3 className="text-lg font-semibold text-fg">2.3 Dados técnicos</h3>
          <p>
            Os provedores de hospedagem e banco (Vercel e Supabase) podem registrar dados técnicos
            necessários para operar e proteger o serviço, como endereço IP, data e hora, navegador,
            endereço solicitado e mensagens de erro. O KBR não usa esses registros para
            publicidade ou perfilamento comportamental.
          </p>
        </Section>

        <Section id="armazenamento" title="3. Cookies e armazenamento local">
          <p>
            Usamos apenas cookies e armazenamento necessários para autenticação, segurança e
            funcionamento do progresso. Não há cookies de publicidade, análise comportamental ou
            rastreamento entre sites.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">
                Cookies e chaves de armazenamento local usados pelo KBR
              </caption>
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Nome</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Tipo</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Para que serve</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duração</th>
                </tr>
              </thead>
              <tbody>
                {storageRows.map((row) => (
                  <tr key={row.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top">
                      <code className="break-all text-xs">{row.name}</code>
                    </td>
                    <td className="px-4 py-3 align-top">{row.type}</td>
                    <td className="px-4 py-3 align-top text-muted">{row.purpose}</td>
                    <td className="px-4 py-3 align-top text-muted">{row.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            O cookie de sessão do Supabase não é <code>HttpOnly</code>: o SDK precisa lê-lo no
            navegador para renovar a sessão. Ele usa <code>SameSite=Lax</code> e caminho{" "}
            <code>/</code>. Você pode apagar os dados locais nas configurações do navegador; isso
            não apaga a cópia sincronizada no Supabase.
          </p>
          <p>
            Como não há rastreamento não essencial, o KBR não exibe um banner de consentimento de
            cookies. Se um recurso opcional de medição ou publicidade for adicionado, ele só será
            ativado depois de um consentimento prévio e específico.
          </p>
        </Section>

        <Section id="finalidade" title="4. Finalidade e base legal">
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <caption className="sr-only">Finalidades e bases legais do tratamento</caption>
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Finalidade</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Base legal</th>
                </tr>
              </thead>
              <tbody>
                {legalBasis.map((row) => (
                  <tr key={row.purpose} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top">{row.purpose}</td>
                    <td className="px-4 py-3 align-top text-muted">{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            A avaliação definitiva das bases legais faz parte da revisão jurídica antes do
            lançamento. O KBR não usa seus dados para publicidade e não toma decisões
            automatizadas com efeitos jurídicos sobre você.
          </p>
        </Section>

        <Section id="compartilhamento" title="5. Com quem compartilhamos">
          <p>
            Não vendemos dados pessoais. O tratamento envolve os seguintes prestadores, cada um
            no papel que exerce:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-fg">Supabase</strong> — autenticação e banco PostgreSQL onde
              ficam a conta e o progresso sincronizado.
            </li>
            <li>
              <strong className="text-fg">Google</strong> — provedor de identidade usado no login.
              O tratamento pelo Google segue as políticas da própria conta Google.
            </li>
            <li>
              <strong className="text-fg">Vercel</strong> — hospedagem da aplicação e registros
              técnicos de acesso e erro.
            </li>
            <li>
              <strong className="text-fg">Autoridades públicas</strong> — somente quando houver
              obrigação legal ou ordem válida.
            </li>
          </ul>
          <p>
            Esses provedores podem processar dados fora do Brasil ou do Espaço Econômico Europeu.
            A região do projeto Supabase e os instrumentos contratuais de transferência
            internacional estão <Pending>a confirmar</Pending> na revisão jurídica.
          </p>
        </Section>

        <Section id="retencao" title="6. Retenção e exclusão">
          <p>
            Ainda não há um prazo de retenção definido. Enquanto sua conta existir, o progresso
            sincronizado permanece armazenado para que você possa continuar estudando em outros
            dispositivos. Os dados locais permanecem no navegador até você limpar os dados do
            site.
          </p>
          <p>
            Também não existe, nesta fase, um botão de exclusão de conta dentro do aplicativo.
            Pedidos de exclusão serão atendidos pelo contato de privacidade assim que ele for
            publicado (<Pending>a confirmar</Pending>). A exclusão remove o progresso sincronizado
            e o registro de autenticação, ressalvadas obrigações legais de conservação. O prazo
            para concluir a exclusão será definido na política final.
          </p>
          <p>
            Para apagar apenas a cópia local, limpe os dados do site no navegador. Isso não remove
            o registro no Supabase.
          </p>
        </Section>

        <Section id="direitos" title="7. Seus direitos">
          <p>
            Conforme o GDPR e a LGPD, você pode solicitar confirmação de tratamento, acesso,
            correção, portabilidade, anonimização, bloqueio ou eliminação de dados, informação
            sobre compartilhamentos e oposição a tratamentos baseados em legítimo interesse. Você
            também pode retirar um consentimento já dado, quando essa for a base legal.
          </p>
          <p>
            Para exercer seus direitos, use o contato de privacidade (<Pending>a confirmar</Pending>
            ). Responderemos dentro do prazo legal aplicável. Você tem direito de reclamar à
            autoridade de proteção de dados competente no seu país — na Alemanha, a autoridade
            estadual de proteção de dados; no Brasil, a ANPD.
          </p>
        </Section>

        <Section id="seguranca" title="8. Segurança">
          <p>
            O acesso ao banco é limitado por Row Level Security ao usuário autenticado. A
            aplicação usa HTTPS em produção, mantém apenas a chave publicável do Supabase no
            navegador e não usa chave de serviço (service role) no cliente. Nenhum sistema é
            totalmente imune a incidentes; se houver um incidente relevante, adotaremos as
            comunicações exigidas pela lei aplicável.
          </p>
        </Section>

        <Section id="contato" title="9. Contato e alterações">
          <p>
            O KBR não é direcionado a crianças. Se você acredita que uma criança forneceu dados
            pessoais, entre em contato para que possamos avaliar a remoção.
          </p>
          <p>
            Esta política pode mudar quando o aplicativo evoluir. A data de atualização no topo
            será revisada e mudanças relevantes serão comunicadas na interface antes de entrar em
            vigor.
          </p>
          <p>
            Contato de privacidade: <Pending>a confirmar</Pending>. Aviso legal e informações
            exigidas na Alemanha: consulte a página de{" "}
            <Link href="/impressum" className="text-brand underline underline-offset-2">
              Aviso legal / Impressum
            </Link>
            .
          </p>
        </Section>

        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">Pendências para revisão jurídica</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Identidade legal do controlador e endereço.</li>
            <li>E-mail de contato de privacidade e eventual encarregado (DPO).</li>
            <li>Prazos de retenção e de resposta a pedidos de exclusão.</li>
            <li>Região do projeto Supabase e instrumentos de transferência internacional.</li>
            <li>Contratos de processamento (DPA) e revisão das bases legais.</li>
            <li>Definição sobre a necessidade de Impressum separado.</li>
          </ul>
        </section>
      </div>

      <p className="mt-10 text-sm">
        <Link href="/" className="text-brand underline underline-offset-2">
          ← Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}
