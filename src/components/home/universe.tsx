import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { universe } from "@/lib/data";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

export async function UniverseSection() {
  const heading = await getContent(
    "home.universe.titulo",
    "Universo da Artesania Patuá",
  );
  const subtitle = await getContent(
    "home.universe.subtitulo",
    "Pensamentos, processos e presenças que atravessam a Patuá.",
  );
  const ctaLabel = await getContent("home.universe.cta", "Ver todos os textos");
  const cards = await Promise.all(
    universe.map(async (u, i) => {
      const base = `home.universe.card${i + 1}`;
      return {
        base,
        href: u.href,
        title: await getContent(`${base}.titulo`, u.title),
        body: await getContent(`${base}.corpo`, u.body),
        image: await getContent(`${base}.imagem`, { url: u.image, alt: u.title }),
      };
    }),
  );

  return (
    <section className="relative bg-[var(--color-bark-soft)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[var(--color-cream-light)]/35 pb-8 md:flex-row md:items-end md:pb-10">
          <Reveal>
            <Editable
              id="home.universe.titulo"
              as="h2"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
            >
              {heading}
            </Editable>
            <Editable
              id="home.universe.subtitulo"
              as="p"
              className="mt-4 max-w-[46ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/80 md:text-lg"
            >
              {subtitle}
            </Editable>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-6 py-3 text-sm font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
            >
              <Editable id="home.universe.cta" as="span">
                {ctaLabel}
              </Editable>
            </Link>
          </Reveal>
        </div>

        {/* Cards alinhados à direita */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3" aria-hidden />
          <div className="grid gap-6 md:col-span-9 md:grid-cols-3 md:gap-6">
            {cards.map((u, i) => (
              <Reveal key={u.base} delay={i * 0.1}>
                <Link href={u.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <EditableImage
                      id={`${u.base}.imagem`}
                      src={u.image.url}
                      alt={u.image.alt ?? u.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-[var(--radius-pill)] border border-[var(--color-cream-light)] bg-transparent px-5 py-1.5 text-xs font-medium text-[var(--color-cream-light)] backdrop-blur-md">
                      <Editable id={`${u.base}.titulo`} as="span">
                        {u.title}
                      </Editable>
                    </span>
                  </div>
                  <Editable
                    id={`${u.base}.corpo`}
                    as="p"
                    className="mt-4 text-sm leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-base"
                  >
                    {u.body}
                  </Editable>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
