import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

export type FeatureBandProps = {
  /** Prefixo das chaves de conteúdo, ex.: "home.colecao" */
  base: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Inverte a ordem (imagem à esquerda) */
  reverse?: boolean;
};

/**
 * Faixa editorial clara — texto num lado, imagem no outro.
 * Base clara com destaque em terracota, no espírito das referências
 * (Breton / Audo) enviadas pela cliente.
 */
export async function FeatureBand({
  base,
  eyebrow,
  title,
  body,
  cta,
  href,
  image,
  imageAlt,
  reverse = false,
}: FeatureBandProps) {
  const [eb, tt, bd, ct, img] = await Promise.all([
    getContent(`${base}.eyebrow`, eyebrow),
    getContent(`${base}.titulo`, title),
    getContent(`${base}.corpo`, body),
    getContent(`${base}.cta`, cta),
    getContent(`${base}.imagem`, { url: image, alt: imageAlt }),
  ]);

  return (
    <section className="relative bg-[var(--color-cream)] text-[var(--color-bark)]">
      <div
        className={`mx-auto grid w-full max-w-[var(--container-page)] items-center gap-10 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Texto */}
        <Reveal>
          <div className="flex items-center gap-4">
            <Editable
              id={`${base}.eyebrow`}
              as="span"
              className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]"
            >
              {eb}
            </Editable>
            <span
              aria-hidden
              className="h-px w-16 bg-[var(--color-terracotta)]/40"
            />
          </div>

          <Editable
            id={`${base}.titulo`}
            as="h2"
            className="font-display mt-6 max-w-[16ch] text-[clamp(2rem,4.2vw,3.5rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
          >
            {tt}
          </Editable>

          <Editable
            id={`${base}.corpo`}
            as="p"
            className="mt-6 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-stone)] md:text-lg"
          >
            {bd}
          </Editable>

          <Link
            href={href}
            className="group mt-9 inline-flex items-center gap-3 text-sm font-medium text-[var(--color-bark)]"
          >
            <Editable id={`${base}.cta`} as="span" className="border-b border-[var(--color-bark)]/30 pb-1 transition-colors group-hover:border-[var(--color-terracotta)] group-hover:text-[var(--color-terracotta)]">
              {ct}
            </Editable>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        {/* Imagem */}
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] md:aspect-[5/4]">
            <EditableImage
              id={`${base}.imagem`}
              src={img.url}
              alt={img.alt ?? imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
