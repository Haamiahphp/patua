import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const IMG1_FALLBACK = "/images/processo/processo-4-presenca.png";
const IMG2_FALLBACK = "/images/hero/hero-poltrona-diretor.png";

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
      alt: "Projeto com poltronas Patuá",
    }),
  ]);

  return (
    <section className="relative bg-[var(--color-cream-light)] text-[var(--color-bark)]">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] items-center gap-10 px-4 py-20 md:grid-cols-12 md:gap-12 md:px-10 md:py-28">
        {/* Texto */}
        <div className="md:col-span-4">
          <Reveal>
            <Editable
              id="home.b2b.eyebrow"
              as="span"
              className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]"
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
              href="/contact-us"
              className="mt-9 inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta-deep)]"
            >
              <Editable id="home.b2b.cta" as="span">
                {cta}
              </Editable>
            </Link>
          </Reveal>
        </div>

        {/* Duas fotos ambientadas */}
        <div className="grid gap-4 md:col-span-8 md:grid-cols-2 md:gap-6">
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2px]">
              <EditableImage
                id="home.b2b.imagem1"
                src={img1.url}
                alt={img1.alt ?? "Ambiente com peça Patuá"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] md:mt-12">
              <EditableImage
                id="home.b2b.imagem2"
                src={img2.url}
                alt={img2.alt ?? "Projeto com peça Patuá"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
