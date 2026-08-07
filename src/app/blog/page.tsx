import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { getContent } from "@/lib/content";
import { listPublished } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Textos · Patuá Artesania Brasileira",
  description:
    "Reflexões sobre fazer manual, processo, autoria e brasilidade — direto do ateliê em Laranjeiras.",
};

function fmt(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const eyebrow = await getContent("blog.eyebrow", "Textos");
  const titulo = await getContent("blog.titulo", "Universo da Patuá");
  const intro = await getContent(
    "blog.intro",
    "Reflexões sobre fazer manual, processo, autoria e brasilidade — direto do ateliê em Laranjeiras.",
  );
  const posts = await listPublished();

  return (
    <section className="bg-[var(--color-cream)] pt-40 pb-32 md:pt-48 md:pb-48">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <Reveal>
          <Editable
            id="blog.eyebrow"
            as="span"
            className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60"
          >
            {eyebrow}
          </Editable>
          <Editable
            id="blog.titulo"
            as="h1"
            className="font-display mt-5 max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
          >
            {titulo}
          </Editable>
          <Editable
            id="blog.intro"
            as="p"
            className="mt-8 max-w-[58ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
          >
            {intro}
          </Editable>
        </Reveal>

        {posts.length === 0 ? (
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
        ) : (
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-24 md:gap-y-20 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[var(--color-bark)]/10">
                    {p.coverUrl ? (
                      <Image
                        src={p.coverUrl}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-bark)]/50">
                    {fmt(p.publishedAt)}
                  </p>
                  <h2 className="font-display mt-2 text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.15] text-[var(--color-bark)]">
                    {p.title}
                  </h2>
                  {p.excerpt ? (
                    <p className="mt-2 text-sm leading-[var(--leading-body)] text-[var(--color-bark)]/70">
                      {p.excerpt}
                    </p>
                  ) : null}
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
