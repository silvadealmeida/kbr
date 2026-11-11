import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { Badge, Seal } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Card, Plate } from "@/components/ui/Card";
import { Field, Input, fieldDescribedBy } from "@/components/ui/Field";
import { SkipLink } from "@/components/ui/Navigation";
import { Notice } from "@/components/ui/Notice";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Ruler } from "@/components/ui/Ruler";

const render = (element: React.ReactElement) => renderToStaticMarkup(element);

describe("primitivas visuais (7B)", () => {
  test("Button preserva type=button e expõe variantes/tamanhos", () => {
    const html = render(createElement(Button, null, "Continuar"));
    expect(html).toContain("<button");
    expect(html).toContain('type="button"');
    expect(html).toContain("bg-fg");
    expect(html).toContain("min-h-12");
    expect(html).toContain("Continuar");

    expect(buttonStyles({ variant: "secondary", size: "sm" })).toContain(
      "border-[1.5px]",
    );
    expect(buttonStyles({ variant: "danger" })).toContain("bg-danger");
    expect(buttonStyles({ variant: "ghost" })).toContain("hover:bg-surface-2");
  });

  test("Button loading anuncia aria-busy e desabilita", () => {
    const html = render(createElement(Button, { loading: true }, "Conferindo…"));
    expect(html).toContain('aria-busy="true"');
    expect(html).toMatch(/disabled/);
    expect(html).toContain("spinner");
  });

  test("Card e Plate usam moldura/tokens sem sombra", () => {
    const card = render(createElement(Card, null, "conteúdo"));
    expect(card).toContain("border-line");
    expect(card).toContain("bg-surface");
    expect(card).not.toContain("shadow");

    const plate = render(
      createElement(Plate, { number: "03", label: "Lâmina", children: "conteúdo" }),
    );
    expect(plate).toContain("border-line-strong");
    expect(plate).toContain("03");
    expect(plate).toContain("Lâmina");
  });

  test("Field associa label, ajuda e erro", () => {
    const describedBy = fieldDescribedBy("email", {
      hint: "Use seu e-mail",
      error: "E-mail inválido",
    });
    expect(describedBy).toBe("email-hint email-error");

    const html = render(
      createElement(
        Field,
        {
          id: "email",
          label: "E-mail",
          hint: "Use seu e-mail",
          error: "E-mail inválido",
          required: true,
          children: createElement(Input, {
            id: "email",
            invalid: true,
            "aria-describedby": describedBy,
          }),
        },
      ),
    );

    expect(html).toContain('for="email"');
    expect(html).toContain("(obrigatório)");
    expect(html).toContain('id="email-hint"');
    expect(html).toContain('id="email-error"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('aria-describedby="email-hint email-error"');
    expect(html).toContain("min-h-12");
    expect(html).toContain("text-base");
  });

  test("ProgressBar e Ruler expõem valor textual e não dependem de cor", () => {
    const bar = render(
      createElement(ProgressBar, {
        value: 40,
        label: "Progresso",
        valueText: "10 de 25",
      }),
    );
    expect(bar).toContain('role="progressbar"');
    expect(bar).toContain('aria-valuenow="40"');
    expect(bar).toContain('aria-valuetext="10 de 25"');
    expect(bar).toContain("width:40%");

    const ruler = render(
      createElement(Ruler, {
        value: 3,
        max: 25,
        label: "Régua do curso",
      }),
    );
    expect(ruler).toContain('aria-valuemax="25"');
    expect(ruler).toContain('aria-valuenow="3"');
    expect(ruler).toContain("3 de 25");
    expect(ruler.match(/w-0\.5/g)).toHaveLength(25);
  });

  test("Badge e Seal não usam apenas cor", () => {
    const badge = render(
      createElement(Badge, { tone: "success", children: "Sincronizado" }),
    );
    expect(badge).toContain("Sincronizado");
    expect(badge).toContain("bg-success-soft");
    expect(badge).toContain("text-success");

    const decorative = render(createElement(Seal, null, "Concluído"));
    expect(decorative).toContain('aria-hidden="true"');

    const meaningful = render(
      createElement(Seal, { label: "Curso concluído", children: "Concluído" }),
    );
    const outerTag = meaningful.slice(0, meaningful.indexOf(">"));
    expect(outerTag).not.toContain('aria-hidden="true"');
    expect(meaningful).toContain("Curso concluído");
  });

  test("Notice usa role=alert só para erro bloqueante", () => {
    const info = render(
      createElement(Notice, {
        title: "Salvo",
        children: "Progresso neste dispositivo.",
      }),
    );
    expect(info).toContain('role="status"');
    expect(info).toContain("border-l-accent");

    const danger = render(
      createElement(Notice, {
        tone: "danger",
        title: "Falha",
        children: "Tente de novo.",
      }),
    );
    expect(danger).toContain('role="alert"');
    expect(danger).toContain("border-l-danger");
  });

  test("SkipLink mantém alvo visível ao focar", () => {
    const html = render(createElement(SkipLink));
    expect(html).toContain('href="#conteudo"');
    expect(html).toContain("focus:not-sr-only");
    expect(html).toContain("Pular para o conteúdo");
  });
});
