import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServicesHero } from "@/components/services-hero";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/lib/catalog";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Peças · Patuá Ateliê",
  description:
    "Bancos, banquetas, cadeiras, poltronas, cabeceiras e objetos autorais — peças artesanais tecidas à mão.",
};

export default async function ServicesPage() {
  const heroImage = await getContent("services.hero.imagem", {
    url: "/images/about/about-capa.png",
    alt: "Ateliê Patuá — bancada de trabalho com peças em produção",
  });
  const heroTitle = await getContent(
    "services.hero.titulo",
    "Peças autorais que habitam o seu espaço.",
  );
  const heroLabel = await getContent("services.hero.label", "Peças");
  const heroDescription = await getContent(
    "services.hero.descricao",
    "Cada peça do Patuá nasce de um traço e ganha vida no banco de marcenaria. Navegue pelas categorias e conheça os produtos.",
  );

  return (
    <>
      <ServicesHero
        imageId="services.hero.imagem"
        image={heroImage.url}
        imageAlt={heroImage.alt ?? "Ateliê Patuá — bancada de trabalho com peças em produção"}
        titleId="services.hero.titulo"
        title={heroTitle}
        labelId="services.hero.label"
        label={heroLabel}
        descriptionId="services.hero.descricao"
        description={heroDescription}
      />

      <section className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
            {CATEGORIES.map((c, i) => {
              const empty = c.products.length === 0;
              return (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link href={`/services/${c.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden bg-[var(--color-bark)]">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/65 via-black/25 to-transparent"
                      />
                      {empty && (
                        <span className="absolute right-4 top-4 rounded-[var(--radius-pill)] bg-[var(--color-cream-light)]/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-bark)]">
                          Em breve
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                        <h2 className="font-display text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[var(--leading-tight)] text-[var(--color-cream-light)]">
                          {c.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
