import type { Metadata } from "next";
import Link from "next/link";
import { A1_MODULES, getA1Lesson } from "@/content/curriculum/a1";
import { A1_COURSE, courseStepHref } from "@/content/courses";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Coreano A1" };

export default function Page() {
  const lesson = getA1Lesson("a1-l01");
  const href = lesson ? courseStepHref(A1_COURSE, lesson.id) : null;

  return (
    <>
      <PageHeader
        ko="한국어 A1"
        title="Coreano A1"
        subtitle="Curso em desenvolvimento: a primeira lição já está disponível."
      />

      <div className="flex flex-col gap-6">
        <section
          aria-labelledby="a1-status-title"
          className="border-l-2 border-accent bg-surface-2 p-4 text-sm text-muted"
        >
          <h2 id="a1-status-title" className="font-semibold text-fg">
            Curso em desenvolvimento
          </h2>
          <p className="mt-2">
            O A1 prevê <strong>40 lições e 8 checkpoints</strong>. Apenas{" "}
            <strong>1 lição</strong> está disponível agora; as demais entram aos
            poucos e continuam em revisão. Concluir uma lição não conclui o curso
            e não emite certificação CEFR ou TOPIK.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="border-l border-line pl-3">
              <dt className="text-muted">Curso</dt>
              <dd className="mt-1 font-semibold">Coreano A1</dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-muted">Lições disponíveis</dt>
              <dd className="mt-1 font-semibold">1 de 40</dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-muted">Checkpoints planejados</dt>
              <dd className="mt-1 font-semibold">8</dd>
            </div>
            <div className="border-l border-line pl-3">
              <dt className="text-muted">Lição atual</dt>
              <dd className="mt-1 font-semibold">a1-l01</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="a1-available-title">
          <div className="mb-3">
            <h2 id="a1-available-title" className="text-lg font-semibold">
              Lição disponível
            </h2>
            <p className="mt-1 text-sm text-muted">
              Só aparecem links para conteúdo efetivamente implementado.
            </p>
          </div>
          {lesson && href ? (
            <Plate label="Lição" number="01" className="border-accent">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    A1 · Módulo 1 · Primeiro contato
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{lesson.title}</h3>
                  <p className="mt-1 text-muted">{lesson.objective}</p>
                </div>
                <Badge tone="accent">Disponível</Badge>
              </div>
              <div className="mt-5">
                <ButtonLink href={href}>Abrir a lição</ButtonLink>
              </div>
            </Plate>
          ) : (
            <Plate label="Lição">
              <p className="text-muted">A primeira lição ainda não está disponível.</p>
            </Plate>
          )}
        </section>

        <section aria-labelledby="a1-outline-title">
          <div className="mb-3">
            <h2 id="a1-outline-title" className="text-lg font-semibold">
              Roteiro planejado
            </h2>
            <p className="mt-1 text-sm text-muted">
              Referência editorial do A1. Os módulos abaixo não têm link até que
              suas lições sejam implementadas.
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {A1_MODULES.map((module) => {
              const implemented =
                module.stepIds.includes("a1-l01") ? 1 : 0;
              const lessons = module.stepIds.filter((id) =>
                /^a1-l\d{2}$/.test(id),
              ).length;
              return (
                <li
                  key={module.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-[var(--radius-plate)] border border-line px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium">
                      Módulo {module.number} · {module.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {module.communicativeArc}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {lessons} lições planejadas · 1 checkpoint
                    </p>
                  </div>
                  <Badge tone={implemented > 0 ? "accent" : "neutral"}>
                    {implemented > 0
                      ? `${implemented} de ${lessons} lições disponíveis`
                      : "Planejado"}
                  </Badge>
                </li>
              );
            })}
          </ol>
        </section>

        <p className="text-sm text-muted">
          O conteúdo coreano desta lição é original e está em revisão.{" "}
          <Link
            href="/cursos"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Voltar aos cursos
          </Link>
          .
        </p>
      </div>
    </>
  );
}
