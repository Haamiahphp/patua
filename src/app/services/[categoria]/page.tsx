import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, getCategory } from "@/lib/catalog";

type Params = Promise<{ categoria: string }>;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return {
    title: `${cat.name} · Patuá Artesania Brasileira`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();

  return (
    <>
      {/* Hero da categoria */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-[var(--color-bark)] text-[var(--color-cream-light)]">
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/30"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[var(--container-page)] flex-col justify-between px-4 pt-32 pb-12 md:px-10 md:pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-cream-light)]/85">
              <li>
                <Link href="/" className="hover:opacity-75">
                  Início
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/services" className="hover:opacity-75">
                  Peças
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-[var(--color-cream-light)]">{cat.name}</li>
            </ol>
          </nav>

          {/* Título da categoria */}
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-[var(--tracking-tight)]">
              {cat.name}
            </h1>
            {cat.description && (
              <p className="mt-6 max-w-[52ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-lg">
                {cat.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Grid de produtos */}
      <section className="bg-[var(--color-cream)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          {cat.products.length === 0 ? (
            <p className="text-base text-[var(--color-bark)]/70">
              Em breve. Estamos preparando as peças desta categoria.
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
              {cat.products.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${cat.slug}/${p.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-contain p-6 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] md:p-8"
                      />
                    </div>
                    <h2 className="mt-5 font-display text-xl text-[var(--color-bark)] md:text-2xl">
                      {p.name}
                    </h2>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
