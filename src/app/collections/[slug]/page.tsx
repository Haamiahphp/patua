import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { COLECOES, getColecao } from "@/lib/colecoes";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return COLECOES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getColecao(slug);
  if (!col) return {};
  return { title: `${col.nome} · Patuá Artesania Brasileira`, description: col.intro };
}

export default async function ColecaoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const col = getColecao(slug);
  if (!col) notFound();

  return (
    <>
      {/* HEADER — nome da coleção */}
      <section className="bg-[var(--color-cream)] pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex items-center gap-2 text-[var(--color-bark)]/60">
                <li>
                  <Link href="/collections" className="hover:opacity-70">
                    Coleções
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li className="text-[var(--color-bark)]">{col.nome}</li>
              </ol>
            </nav>
            <h1 className="font-display mt-6 max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
              {col.nome}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* INTRO — foto + texto lado a lado */}
      <section className="bg-[var(--color-cream)] pb-24 md:pb-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bark)]">
                <Image
                  src={col.introImagem}
                  alt={col.nome}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-[52ch] text-lg leading-[1.7] text-[var(--color-bark)]/85 md:text-xl">
                {col.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PEÇAS DA COLEÇÃO */}
      <section className="bg-[var(--color-cream-light)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
              Peças da coleção
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-y-16">
            {col.pecas.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/collections/${col.slug}/${p.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                    <Image
                      src={p.imagem}
                      alt={p.nome}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-5 flex items-center gap-2 font-display text-xl text-[var(--color-bark)] md:text-2xl">
                    {p.nome}
                    <span
                      aria-hidden
                      className="text-base text-[var(--color-terracotta)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
