import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const IMG1_FALLBACK = "/images/b2b-1.jpg";
const IMG2_FALLBACK = "/images/b2b-2.jpg";

export async function B2BSection() {
  const [eyebrow, title, body, cta, img1, img2] = await Promise.all([
    getContent("home.b2b.eyebrow", "Para profissionais"),
    getContent("home.b2b.titulo", "Patuá para arquitetos e designers"),
    getContent(
      "home.b2b.corpo",
      "Peças autorais, personalização e atendimento consultivo para profissionais que buscam soluções pensadas para projetos residenciais e comerciais.",
    ),
    getContent("home.b2b.cta", "Fale com a Patuá"),
    getContent("home.b2b.imagem1", {
      url: IMG1_FALLBACK,
      alt: "Ambiente residencial com peça Patuá",
    }),
    getContent("home.b2b.imagem2", {
      url: IMG2_FALLBACK,
      alt: "Projeto com peça Patuá",
    }),
  ]);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-cream-light)] text-[var(--color-bark)]">
      <div className="grid items-stretch md:grid-cols-[minmax(0,38%)_1fr]">
        {/* Texto */}
        <div className="flex flex-col justify-center px-4 py-16 md:py-24 md:pr-12 md:pl-10 lg:pl-16">
          <Reveal>
            <Editable
              id="home.b2b.eyebrow"
              as="span"
              className="font-mono text-sm uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)] md:text-base"
            >
              {eyebrow}
            </Editable>
            <Editable
              id="home.b2b.titulo"
              as="h2"
              className="font-display mt-6 max-w-[14ch] text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
            >
              {title}
            </Editable>
            <Editable
              id="home.b2b.corpo"
              as="p"
              className="mt-6 max-w-[42ch] text-base leading-[var(--leading-body)] text-[var(--color-stone)] md:text-lg"
            >
              {body}
            </Editable>
            <Link
              href="/professionals"
              className="mt-9 inline-flex items-center justify-center self-start rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta-deep)]"
            >
              <Editable id="home.b2b.cta" as="span">
                {cta}
              </Editable>
            </Link>
          </Reveal>
        </div>

        {/* Fotos ambientadas — respiro igual em cima e embaixo, produto centralizado.
            No mobile fica só a primeira; no desktop, as duas. */}
        <div className="flex items-stretch py-8 md:py-14 lg:py-20">
          <div className="grid min-h-[320px] w-full grid-cols-1 gap-1.5 md:min-h-[420px] md:grid-cols-2 md:gap-2">
            <div className="relative overflow-hidden">
              <EditableImage
                id="home.b2b.imagem1"
                src={img1.url}
                alt={img1.alt ?? "Ambiente com peça Patuá"}
                fill
                sizes="(max-width: 768px) 100vw, 31vw"
                className="object-cover object-[center_66%]"
              />
            </div>
            <div className="relative hidden overflow-hidden md:block">
              <EditableImage
                id="home.b2b.imagem2"
                src={img2.url}
                alt={img2.alt ?? "Projeto com peça Patuá"}
                fill
                sizes="31vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
