import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, type Collection } from "@/lib/collections";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";

export async function PortfolioSection() {
  const heading = await getContent(
    "home.portfolio.titulo",
    "Coleções que carregam um conceito.",
  );
  const ctaLabel = await getContent(
    "home.portfolio.cta",
    "Ver todas as coleções",
  );

  return (
    <section className="relative bg-[var(--color-bark-soft)] py-24 text-[var(--color-cream-light)] md:py-36">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Editable
              id="home.portfolio.titulo"
              as="h2"
              className="font-display max-w-[20ch] text-[clamp(1.875rem,3.6vw,3rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
            >
              {heading}
            </Editable>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-6 py-3 text-sm font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
            >
              <Editable id="home.portfolio.cta" as="span">
                {ctaLabel}
              </Editable>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-20 md:gap-8 lg:grid-cols-4">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <CollectionCard collection={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-[var(--color-bark)]"
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70">
          {collection.type === "restauro" ? "Restauros" : "Coleção"}
        </span>
        <h3 className="font-display mt-2 text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.1] text-[var(--color-cream-light)]">
          {collection.name.replace(/^Coleção /, "")}
        </h3>
      </div>
    </Link>
  );
}
