import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServicesHero } from "@/components/services-hero";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Todas as peças · Patuá Ateliê",
  description:
    "Todas as peças autorais do Patuá reunidas em um só lugar — bancos, banquetas, cadeiras, poltronas, cabeceiras e objetos tecidos à mão.",
};

export default function AllPiecesPage() {
  const categories = CATEGORIES.filter((c) => c.products.length > 0);

  return (
    <>
      <ServicesHero
        image="/images/about/about-capa.png"
        imageAlt="Ateliê Patuá — peças autorais em produção"
        title="Todas as peças"
        label="Peças"
        description="Cada peça autoral do Patuá, reunida em um só lugar. Sem ambientação — só a peça, como ela é."
        size="compact"
      />

      <section className="bg-[var(--color-cream)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          {categories.map((cat, ci) => (
            <div key={cat.slug} className={ci > 0 ? "mt-20 md:mt-28" : ""}>
              {/* Cabeçalho da categoria */}
              <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bark)]/15 pb-5">
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  {cat.name}
                </h2>
                <Link
                  href={`/services/${cat.slug}`}
                  className="shrink-0 text-sm text-[var(--color-bark)]/60 underline underline-offset-[5px] transition-colors hover:text-[var(--color-bark)]"
                >
                  Ver categoria
                </Link>
              </div>

              {/* Grid de peças */}
              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
                {cat.products.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${cat.slug}/${p.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                          className="object-contain p-6 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-lg text-[var(--color-bark)] md:text-xl">
                        {p.name}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
