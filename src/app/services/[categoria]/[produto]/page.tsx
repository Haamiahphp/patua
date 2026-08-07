import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  CATEGORIES,
  getCategory,
  getProduct,
  type Category,
  type Color,
  type Product,
} from "@/lib/catalog";
import { COLLECTIONS } from "@/lib/collections";
import { urlDaPecaPorSlug } from "@/lib/colecoes";

type Params = Promise<{ categoria: string; produto: string }>;

const WHATSAPP_BASE = "https://wa.me/5521975397680";

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    c.products.map((p) => ({ categoria: c.slug, produto: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { categoria, produto } = await params;
  const found = getProduct(categoria, produto);
  if (!found) return {};
  // Peça que também vive em /collections: aquela é a URL oficial. Sem isto o
  // Google vê duas páginas iguais e divide o sinal entre as duas.
  const canonical = urlDaPecaPorSlug(produto);
  return {
    title: `${found.product.name} · ${found.category.name} · Patuá Artesania Brasileira`,
    description: found.product.description,
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { categoria, produto } = await params;
  const found = getProduct(categoria, produto);
  if (!found) notFound();
  const { category, product } = found;

  const whatsappURL = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `Olá, gostaria de saber mais sobre a peça ${product.name} (${category.name}).`,
  )}`;

  const related = getRelatedProducts(category, product, 3);

  return (
    <>
      {/* Breadcrumb + abertura */}
      <section className="bg-[var(--color-cream)] pt-32 md:pt-36">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-[var(--color-bark)]/70">
              <li>
                <Link href="/" className="hover:text-[var(--color-bark)]">
                  Início
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link
                  href={`/services/${category.slug}`}
                  className="hover:text-[var(--color-bark)]"
                >
                  {category.name}
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-[var(--color-bark)]">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Bloco principal: imagem + ficha técnica */}
      <section className="bg-[var(--color-cream)] py-12 md:py-20">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Imagem */}
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 md:p-10"
                />
              </div>

              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {product.gallery.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden bg-[var(--color-cream-light)]"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Reveal>

            {/* Ficha técnica */}
            <Reveal delay={0.15}>
              <div className="md:sticky md:top-32">
                <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  {product.name}
                </h1>

                {product.description && (
                  <p className="mt-6 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80">
                    {product.description}
                  </p>
                )}

                <dl className="mt-10 space-y-6 text-sm md:text-base">
                  {product.dimensions && (
                    <FichaRow label="Dimensões" value={product.dimensions} />
                  )}
                  {product.materials && (
                    <FichaRow label="Materiais" value={product.materials} />
                  )}

                  {product.structureColors && product.structureColors.length > 0 && (
                    <ColorRow
                      label="Cores da estrutura metálica"
                      colors={product.structureColors}
                    />
                  )}

                  {product.yarnColors && product.yarnColors.length > 0 && (
                    <ColorRow label="Cores dos fios" colors={product.yarnColors} />
                  )}
                </dl>

                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-bark)] px-7 py-4 text-base text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta)]"
                >
                  Pedir orçamento pelo WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Segunda sessão — foto ambientada (ou espaço reservado) */}
      <section className="bg-[var(--color-cream)] pb-12 md:pb-20">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            {product.ambientImage ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-cream-light)]">
                <Image
                  src={product.ambientImage}
                  alt={product.ambientAlt ?? `${product.name} ambientada`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 border border-dashed border-[var(--color-bark)]/25 bg-[var(--color-cream-light)] text-center text-[var(--color-bark)]/45">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm uppercase tracking-[0.2em]">
                  Foto ambientada em breve
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Conteúdo complementar — descrição conceitual, materiais, cuidado */}
      {(product.concept || product.finishes || product.care) && (
        <section className="bg-[var(--color-cream)] pb-20 md:pb-28">
          <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
            <div className="border-t border-[var(--color-bark)]/15 pt-16 md:pt-24">
              {product.concept && (
                <Reveal>
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/55">
                      Sobre a peça
                    </span>
                    <p className="mt-6 text-lg leading-[var(--leading-body)] text-[var(--color-bark)]/85 md:text-xl">
                      {product.concept}
                    </p>
                  </div>
                </Reveal>
              )}

              {(product.finishes || product.care) && (
                <Reveal delay={0.1}>
                  <div className="mt-16 grid gap-12 border-t border-[var(--color-bark)]/15 pt-16 md:mt-24 md:grid-cols-2 md:gap-16 md:pt-24">
                    {product.finishes && (
                      <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/55">
                          Materiais e acabamentos
                        </span>
                        <p className="mt-5 whitespace-pre-line text-base leading-[var(--leading-body)] text-[var(--color-bark)]/85">
                          {product.finishes}
                        </p>
                      </div>
                    )}
                    {product.care && (
                      <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/55">
                          Cuidado
                        </span>
                        <p className="mt-5 text-base leading-[var(--leading-body)] text-[var(--color-bark)]/85">
                          {product.care}
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Produtos relacionados */}
      {related.length > 0 && (
        <section className="bg-[var(--color-cream-light)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[var(--tracking-snug)] text-[var(--color-bark)]">
              Você também pode gostar
            </h2>

            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-x-10">
              {related.map((p, i) => (
                <Reveal key={`${p.categorySlug}-${p.slug}`} delay={i * 0.08}>
                  <Link
                    href={`/services/${p.categorySlug}/${p.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-6 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-[var(--color-bark)] md:text-xl">
                      {p.name}
                    </h3>
                    <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[var(--color-bark)]/55">
                      {p.categoryName}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

type RelatedProduct = Product & { categorySlug: string; categoryName: string };

function getRelatedProducts(
  category: Category,
  product: Product,
  limit: number,
): RelatedProduct[] {
  const seen = new Set<string>([`${category.slug}/${product.slug}`]);
  const pick = (cat: Category, p: Product): RelatedProduct => ({
    ...p,
    categorySlug: cat.slug,
    categoryName: cat.name,
  });
  const out: RelatedProduct[] = [];

  // 1. Siblings na mesma categoria
  for (const p of category.products) {
    const k = `${category.slug}/${p.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(pick(category, p));
    if (out.length >= limit) return out;
  }

  // 2. Peças das coleções que contêm este produto
  for (const col of COLLECTIONS) {
    if (!col.products) continue;
    const isMember = col.products.some(
      (ref) => ref.category === category.slug && ref.product === product.slug,
    );
    if (!isMember) continue;
    for (const ref of col.products) {
      const k = `${ref.category}/${ref.product}`;
      if (seen.has(k)) continue;
      const refCat = getCategory(ref.category);
      const refProd = refCat?.products.find((p) => p.slug === ref.product);
      if (!refCat || !refProd) continue;
      seen.add(k);
      out.push(pick(refCat, refProd));
      if (out.length >= limit) return out;
    }
  }

  // 3. Fallback: primeira peça de cada outra categoria
  for (const cat of CATEGORIES) {
    if (cat.slug === category.slug || cat.products.length === 0) continue;
    const p = cat.products[0];
    const k = `${cat.slug}/${p.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(pick(cat, p));
    if (out.length >= limit) return out;
  }

  return out;
}

function FichaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-bark)]/55">
        {label}
      </dt>
      <dd className="mt-2 text-[var(--color-bark)]">{value}</dd>
    </div>
  );
}

function ColorRow({ label, colors }: { label: string; colors: Color[] }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.25em] text-[var(--color-bark)]/55">
        {label}
      </dt>
      <dd className="mt-3">
        <ul className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <li key={c.name} className="group/c flex flex-col items-center gap-2">
              <span
                aria-hidden
                className="block h-9 w-9 rounded-full border border-[var(--color-bark)]/15 transition-transform group-hover/c:scale-[1.08]"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[11px] text-[var(--color-bark)]/70">
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
