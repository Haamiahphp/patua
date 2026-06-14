import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, getCollection } from "@/lib/collections";
import { getProduct } from "@/lib/catalog";
import { RestauroGallery } from "@/components/restauro-gallery";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) return {};
  return { title: `${col.name} · Patuá Ateliê`, description: col.intro };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-[var(--color-bark)] text-[var(--color-cream-light)]">
        <Image
          src={col.image}
          alt={col.name}
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
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-cream-light)]/85">
              <li>
                <Link href="/" className="hover:opacity-75">
                  Início
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/collections" className="hover:opacity-75">
                  Coleções
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-[var(--color-cream-light)]">{col.name}</li>
            </ol>
          </nav>

          <div className="max-w-[60ch]">
            <h1 className="font-display text-[clamp(2.75rem,6.4vw,6rem)] leading-[1] tracking-[var(--tracking-tight)]">
              {col.name}
            </h1>
            <p className="mt-6 text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-lg">
              {col.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      {col.type === "restauro" && col.gallery ? (
        <section className="bg-[var(--color-cream)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
            <RestauroGallery items={col.gallery} />
          </div>
        </section>
      ) : (
        <CollectionProducts slug={col.slug} />
      )}
    </>
  );
}

async function CollectionProducts({ slug }: { slug: string }) {
  const col = getCollection(slug);
  if (!col || !col.products) return null;

  const items = col.products
    .map((ref) => {
      const found = getProduct(ref.category, ref.product);
      if (!found) return null;
      return {
        ...found.product,
        href: `/services/${found.category.slug}/${found.product.slug}`,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Layout assimétrico: alternar tamanhos pra evitar grid rígido
  // Padrão: large(7) / pair (3+3) / wide (6/6) / centered (5)
  return (
    <section className="bg-[var(--color-cream)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="flex flex-col gap-16 md:gap-24">
          {items.map((p, i) => {
            const pattern = i % 4;
            const align =
              pattern === 0
                ? "md:ml-[8%] md:max-w-[55%]"
                : pattern === 1
                  ? "md:ml-auto md:max-w-[45%]"
                  : pattern === 2
                    ? "md:ml-[20%] md:max-w-[50%]"
                    : "md:mx-auto md:max-w-[42%]";

            return (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={p.href} className={`group block ${align}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <h2 className="mt-5 font-display text-xl text-[var(--color-bark)] md:text-2xl">
                    {p.name}
                  </h2>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
