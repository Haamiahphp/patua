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
  /** Alinha o texto à direita (imagem "espelhada") */
  reverse?: boolean;
};

/**
 * Faixa imersiva full-bleed com texto sobreposto — no espírito da
 * referência Breton (design brasileiro) enviada pela cliente:
 * imagem ocupando toda a largura, marca + filete + título por cima.
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
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-[var(--color-bark)]">
      <EditableImage
        id={`${base}.imagem`}
        src={img.url}
        alt={img.alt ?? imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Degradê suave para legibilidade do texto */}
      <div
        aria-hidden
        className={`absolute inset-0 ${
          reverse
            ? "bg-gradient-to-l from-black/55 via-black/20 to-transparent md:to-[65%]"
            : "bg-gradient-to-r from-black/55 via-black/20 to-transparent md:to-[65%]"
        }`}
      />

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal
            className={`flex max-w-[40rem] flex-col ${reverse ? "ml-auto items-start text-left md:items-end md:text-right" : "items-start text-left"}`}
          >
            {/* Marca + filete */}
            <div
              className={`flex items-center gap-5 ${reverse ? "md:flex-row-reverse" : ""}`}
            >
              <Editable
                id={`${base}.eyebrow`}
                as="span"
                className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-white/85"
              >
                {eb}
              </Editable>
              <span aria-hidden className="h-px w-20 bg-white/45 md:w-28" />
            </div>

            <Editable
              id={`${base}.titulo`}
              as="h2"
              className="font-display mt-6 max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)] text-white"
            >
              {tt}
            </Editable>

            <Editable
              id={`${base}.corpo`}
              as="p"
              className="mt-6 max-w-[42ch] text-base leading-[var(--leading-body)] text-white/85 md:text-lg"
            >
              {bd}
            </Editable>

            <Link
              href={href}
              className="group mt-9 inline-flex items-center gap-3 text-sm font-medium text-white"
            >
              <Editable
                id={`${base}.cta`}
                as="span"
                className="border-b border-white/40 pb-1 transition-colors group-hover:border-white"
              >
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
        </div>
      </div>
    </section>
  );
}
