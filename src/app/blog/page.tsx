import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Textos · Patuá Ateliê",
  description:
    "Reflexões sobre fazer manual, processo, autoria e brasilidade — direto do ateliê em Laranjeiras.",
};

export default function BlogPage() {
  return (
    <section className="bg-[var(--color-cream)] pt-40 pb-32 md:pt-48 md:pb-48">
      <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60">
            Textos
          </span>
          <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
            Em preparação.
          </h1>
          <p className="mt-8 max-w-[58ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
            Reflexões sobre fazer manual, processo, autoria e brasilidade —
            direto do ateliê em Laranjeiras. Em breve, os primeiros textos.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap gap-4 md:mt-24">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-bark)] px-6 py-3 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta)]"
            >
              Ver peças
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-bark)]/30 px-6 py-3 text-sm font-medium text-[var(--color-bark)] transition-colors hover:border-[var(--color-bark)] hover:bg-[var(--color-bark)] hover:text-[var(--color-cream-light)]"
            >
              Entre em contato
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
