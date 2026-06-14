"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, type Category } from "@/lib/catalog";

export function ServicesSection() {
  return (
    <section className="relative bg-[var(--color-mustard)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="font-display max-w-[20ch] text-[clamp(1.875rem,3.6vw,3rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
              Criamos peças onde arte, matéria e autoria se encontram.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/services/todas"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-6 py-3 text-sm font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
            >
              Ver todas as peças
            </Link>
          </Reveal>
        </div>

        {/* Grid 3×3 */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 md:grid-cols-3 md:gap-6">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} cat={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      href={`/services/${cat.slug}`}
      className="group relative block aspect-square overflow-hidden bg-[var(--color-bark)]"
    >
      <Image
        src={cat.image}
        alt={cat.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/65 via-black/25 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[var(--leading-tight)] text-[var(--color-cream-light)]">
            {cat.name}
          </h3>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-cream-light)] text-[var(--color-bark)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7 3M11 7L7 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
