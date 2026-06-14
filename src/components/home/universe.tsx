import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { universe } from "@/lib/data";

export function UniverseSection() {
  return (
    <section className="relative bg-[var(--color-bark-soft)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[var(--color-cream-light)]/35 pb-8 md:flex-row md:items-end md:pb-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
              Universo da Artesania Patuá
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/80 md:text-lg">
              Pensamentos, processos e presenças que atravessam a Patuá.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-6 py-3 text-sm font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
            >
              Ver todos os textos
            </Link>
          </Reveal>
        </div>

        {/* Cards alinhados à direita */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3" aria-hidden />
          <div className="grid gap-6 md:col-span-9 md:grid-cols-3 md:gap-6">
            {universe.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.1}>
                <UniverseCard
                  title={u.title}
                  body={u.body}
                  image={u.image}
                  href={u.href}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UniverseCard({
  title,
  body,
  image,
  href,
}: {
  title: string;
  body: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] border border-[var(--color-cream-light)] bg-transparent px-5 py-1.5 text-xs font-medium text-[var(--color-cream-light)] backdrop-blur-md">
          {title}
        </span>
      </div>
      <p className="mt-4 text-sm leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-base">
        {body}
      </p>
    </Link>
  );
}
