import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { getContent } from "@/lib/content";
import { COLLECTIONS } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Coleções e Restauros · Patuá Ateliê",
  description:
    "Peças organizadas por contexto, processo e conceito — Coleções Andança, Cobogó, Xodó e Restauros.",
};

export default async function CollectionsIndex() {
  const eyebrow = await getContent("collections.eyebrow", "Coleções & Restauros");
  const titulo = await getContent(
    "collections.titulo",
    "Peças organizadas por contexto, processo e conceito.",
  );
  const intro = await getContent(
    "collections.intro",
    "Aqui as peças não se agrupam por função, mas por história. Cada coleção carrega um conceito; cada restauro, uma segunda vida.",
  );

  return (
    <>
      <section className="bg-[var(--color-cream)] pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <Editable
              id="collections.eyebrow"
              as="span"
              className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60"
            >
              {eyebrow}
            </Editable>
            <Editable
              id="collections.titulo"
              as="h1"
              className="font-display mt-5 max-w-[20ch] text-[clamp(2.75rem,5.4vw,5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
            >
              {titulo}
            </Editable>
            <Editable
              id="collections.intro"
              as="p"
              className="mt-8 max-w-[58ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
            >
              {intro}
            </Editable>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:gap-x-10 md:gap-y-20">
            {COLLECTIONS.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link
                  href={`/collections/${c.slug}`}
                  className={`group block ${i % 2 === 1 ? "md:mt-20" : ""}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bark)]">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-[var(--color-cream-light)]">
                        {c.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
