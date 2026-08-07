import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { PieceGallery } from "@/components/piece-gallery";
import { WhatsappIcon } from "@/components/icons";
import { COLECOES, getPeca } from "@/lib/colecoes";

type Params = Promise<{ slug: string; piece: string }>;

const WHATSAPP = "https://wa.me/5521975397680";

export function generateStaticParams() {
  return COLECOES.flatMap((c) =>
    c.pecas.map((p) => ({ slug: c.slug, piece: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, piece } = await params;
  const found = getPeca(slug, piece);
  if (!found) return {};
  return {
    title: `${found.peca.nome} · ${found.colecao.nome} · Patuá Ateliê`,
    description: found.peca.paragrafos[0],
  };
}

export default async function PecaPage({ params }: { params: Params }) {
  const { slug, piece } = await params;
  const found = getPeca(slug, piece);
  if (!found) notFound();
  const { colecao, peca } = found;
  // A galeria já começa pela capa; sem galeria, mostra só a capa.
  const fotos = peca.galeria?.length ? peca.galeria : [peca.imagem];

  return (
    <>
      {/* PEÇA — foto + texto lado a lado */}
      <section className="bg-[var(--color-cream)] pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-2 text-[var(--color-bark)]/60">
                <li>
                  <Link href="/collections" className="hover:opacity-70">
                    Coleções
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <Link
                    href={`/collections/${colecao.slug}`}
                    className="hover:opacity-70"
                  >
                    {colecao.nome}
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li className="text-[var(--color-bark)]">{peca.nome}</li>
              </ol>
            </nav>
          </Reveal>

          {/* `grid-cols-1` explícito + `min-w-0`: sem isso a faixa de miniaturas
              (que sangra até a borda no mobile) alargava a coluna e criava
              rolagem horizontal na página. */}
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <PieceGallery fotos={fotos} nome={peca.nome} />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="md:pt-4">
                <h1 className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.03] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  {peca.nome}
                </h1>
                <div className="mt-7 max-w-[52ch] space-y-5 text-base leading-[1.75] text-[var(--color-bark)]/80 md:text-lg">
                  {peca.paragrafos.map((par, i) => (
                    <p key={i}>{par}</p>
                  ))}
                </div>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta-deep)]"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Personalizar esta peça
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INFORMAÇÕES TÉCNICAS */}
      <section className="bg-[var(--color-cream-light)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
                  Ficha técnica
                </span>
                <h2 className="font-display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  Informações técnicas
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.12}>
                <dl className="divide-y divide-[color:var(--color-bark)]/12 border-y border-[color:var(--color-bark)]/12">
                  {peca.ficha.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-6"
                    >
                      <dt className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--color-bark)]/60">
                        {spec.label}
                      </dt>
                      <dd className="text-base leading-[var(--leading-body)] text-[var(--color-bark)]/90 sm:col-span-2">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={`/collections/${colecao.slug}`}
                  className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-bark)]"
                >
                  <span
                    aria-hidden
                    className="text-[var(--color-terracotta)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  <span className="border-b border-[color:var(--color-bark)]/30 pb-1 transition-colors group-hover:border-[var(--color-bark)]">
                    Voltar para {colecao.nome}
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
