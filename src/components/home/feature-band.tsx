import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { EditAwareLink } from "@/components/edit-aware-link";

export type FeatureBandProps = {
  /** Prefixo das chaves de conteúdo, ex.: "home.colecao" */
  base: string;
  title: string;
  image: string;
  imageAlt: string;
  /** Parágrafo de apoio. Se omitido, não é renderizado. */
  body?: string;
  /** CTA + destino. Só renderiza o link se ambos forem passados. */
  cta?: string;
  href?: string;
  /** Palavra do título a destacar em negrito. */
  boldWord?: string;
  /** Alinha o texto à direita (imagem "espelhada"). Só no layout "stack". */
  reverse?: boolean;
  /**
   * "stack": marca + filete no topo, título embaixo (esquerda).
   * "split": marca à esquerda ── título à direita na mesma linha (estilo
   * Breton "design brasileiro"), subtítulo embaixo à direita.
   */
  variant?: "stack" | "split";
  /** Classe extra na imagem (object-position no mobile / zoom por seção). */
  imageClass?: string;
};

/** Destaca `boldWord` dentro do título mantendo o restante em peso normal. */
function renderTitle(title: string, boldWord?: string): React.ReactNode {
  if (!boldWord || !title.includes(boldWord)) return title;
  const parts = title.split(boldWord);
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [
          part,
          <strong key={i} className="font-semibold">
            {boldWord}
          </strong>,
        ]
      : [part],
  );
}

/**
 * Faixa imersiva full-bleed com texto sobreposto — no espírito da
 * referência Breton enviada pela cliente.
 */
export async function FeatureBand({
  base,
  title,
  image,
  imageAlt,
  body,
  cta,
  href,
  boldWord,
  reverse = false,
  variant = "stack",
  imageClass,
}: FeatureBandProps) {
  const [tt, bd, ct, img] = await Promise.all([
    getContent(`${base}.titulo`, title),
    getContent(`${base}.corpo`, body ?? ""),
    getContent(`${base}.cta`, cta ?? ""),
    getContent(`${base}.imagem`, { url: image, alt: imageAlt }),
  ]);

  const showBody = Boolean(body && bd);
  const showCta = Boolean(cta && href && ct);

  if (variant === "split") {
    return (
      <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-[var(--color-bark)]">
        <EditableImage
          id={`${base}.imagem`}
          src={img.url}
          alt={img.alt ?? imageAlt}
          fill
          sizes="100vw"
          className={`object-cover ${imageClass ?? ""}`}
        />

        {/* Scrim uniforme para o texto que atravessa a faixa toda */}
        <div aria-hidden className="absolute inset-0 bg-black/35" />

        {/* Mobile: reforço embaixo pra o texto (que desce pro piso de madeira,
            fora da poltrona) ganhar leitura. Some no desktop. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent md:hidden"
        />

        {/* No mobile o texto ancora embaixo (sobre o piso de madeira, não sobre a
            poltrona); no desktop volta a centralizar à direita. */}
        <div className="absolute inset-0 z-10 flex items-end pb-14 md:items-center md:pb-0">
          <div className="mx-auto w-full max-w-[var(--container-prose)] px-6 md:px-14 lg:px-20">
            <Reveal>
              <div className="flex flex-col md:items-end">
                <Editable
                  id={`${base}.titulo`}
                  as="h2"
                  className="font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)] text-white md:whitespace-nowrap md:text-right"
                >
                  {renderTitle(tt, boldWord)}
                </Editable>
              </div>

              {showBody && (
                <Editable
                  id={`${base}.corpo`}
                  as="p"
                  className="mt-6 max-w-[42ch] text-base leading-[var(--leading-body)] text-white/85 md:ml-auto md:text-right md:text-lg"
                >
                  {bd}
                </Editable>
              )}

              {showCta && (
                <Link
                  href={href!}
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-white md:ml-auto md:justify-end"
                >
                  <Editable
                    id={`${base}.cta`}
                    as="span"
                    className="border-b border-white/40 pb-1 transition-colors group-hover:border-white"
                  >
                    {ct}
                  </Editable>
                  <span aria-hidden>→</span>
                </Link>
              )}
            </Reveal>
          </div>
        </div>

        {/* Faixa inteira clicável (quando `href` é passado), preservando a edição inline. */}
        {href && (
          <EditAwareLink
            href={href}
            ariaLabel={ct || tt}
            className="absolute inset-0 z-20"
          />
        )}
      </section>
    );
  }

  // "stack": imagem full-bleed com o texto sobreposto à esquerda. No mobile o texto
  // fica estreito (quebra em mais linhas) pra não invadir a peça que fica à direita.
  return (
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-[var(--color-bark)]">
      <EditableImage
        id={`${base}.imagem`}
        src={img.url}
        alt={img.alt ?? imageAlt}
        fill
        sizes="100vw"
        className={`object-cover ${imageClass ?? ""}`}
      />

      {/* Degradê lateral para legibilidade do texto */}
      <div
        aria-hidden
        className={`absolute inset-0 ${
          reverse
            ? "bg-gradient-to-l from-black/70 via-black/30 to-transparent md:to-[62%]"
            : "bg-gradient-to-r from-black/70 via-black/30 to-transparent md:to-[62%]"
        }`}
      />

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal
            className={`flex max-w-[40rem] flex-col ${reverse ? "ml-auto items-start text-left md:items-end md:text-right" : "items-start text-left"}`}
          >
            <Editable
              id={`${base}.titulo`}
              as="h2"
              className="font-display max-w-[48vw] text-[clamp(2rem,4.4vw,3.75rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)] text-white md:max-w-[18ch]"
            >
              {renderTitle(tt, boldWord)}
            </Editable>

            {showBody && (
              <Editable
                id={`${base}.corpo`}
                as="p"
                className="mt-6 max-w-[48vw] text-base leading-[var(--leading-body)] text-white/85 md:max-w-[42ch] md:text-lg"
              >
                {bd}
              </Editable>
            )}

            {showCta && (
              <Link
                href={href!}
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
            )}
          </Reveal>
        </div>
      </div>

      {/* Faixa inteira clicável (quando `href` é passado), preservando a edição inline. */}
      {href && (
        <EditAwareLink
          href={href}
          ariaLabel={ct || tt}
          className="absolute inset-0 z-20"
        />
      )}
    </section>
  );
}
