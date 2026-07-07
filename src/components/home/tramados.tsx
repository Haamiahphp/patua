import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

// Recortes de tramado — prevalece a imagem da trama (pedido da cliente).
const TRAMAS = [
  "/images/tramas/trama-01.jpg",
  "/images/tramas/trama-03.jpg",
  "/images/tramas/trama-06.jpg",
  "/images/tramas/trama-09.jpeg",
  "/images/tramas/trama-11.jpeg",
  "/images/tramas/trama-13.jpeg",
  "/images/tramas/trama-02.jpg",
  "/images/tramas/trama-07.jpg",
  "/images/tramas/trama-15.jpeg",
  "/images/tramas/trama-17.jpeg",
  "/images/tramas/trama-04.jpg",
  "/images/tramas/trama-18.jpeg",
];

export async function TramadosSection() {
  const eyebrow = await getContent("home.tramados.eyebrow", "Tramados");
  const titulo = await getContent(
    "home.tramados.titulo",
    "Explore nossos tramados",
  );
  const corpo = await getContent(
    "home.tramados.corpo",
    "Nenhuma peça Patuá é igual à outra. Cores, desenhos e ritmos podem ser combinados para criar uma peça que converse com o seu espaço. Estas são algumas das possibilidades que já nasceram por aqui.",
  );
  const cta = await getContent("home.tramados.cta", "Vamos criar o seu");
  const tramas = await Promise.all(
    TRAMAS.map(async (src, i) => {
      const key = `home.tramados.item${i + 1}`;
      const value = await getContent(key, { url: src, alt: "Tramado Patuá" });
      return { key, url: value.url, alt: value.alt ?? "Tramado Patuá" };
    }),
  );

  return (
    <section className="relative bg-[var(--color-cream)] py-20 text-[var(--color-bark)] md:py-28">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-10 px-4 md:grid-cols-12 md:gap-12 md:px-10">
        {/* Texto */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal>
              <div className="flex items-center gap-4">
                <Editable
                  id="home.tramados.eyebrow"
                  as="span"
                  className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]"
                >
                  {eyebrow}
                </Editable>
                <span
                  aria-hidden
                  className="h-px w-14 bg-[var(--color-terracotta)]/40"
                />
              </div>
              <Editable
                id="home.tramados.titulo"
                as="h2"
                className="font-display mt-6 max-w-[12ch] text-[clamp(2rem,3.8vw,3.25rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
              >
                {titulo}
              </Editable>
              <Editable
                id="home.tramados.corpo"
                as="p"
                className="mt-6 max-w-[40ch] text-base leading-[var(--leading-body)] text-[var(--color-stone)]"
              >
                {corpo}
              </Editable>
              <Link
                href="/contact-us"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-[var(--color-terracotta)]"
              >
                <Editable
                  id="home.tramados.cta"
                  as="span"
                  className="border-b border-[var(--color-terracotta)]/40 pb-1 transition-colors group-hover:border-[var(--color-terracotta)]"
                >
                  {cta}
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

        {/* Mosaico de tramados */}
        <div className="md:col-span-8">
          <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
            {tramas.map((t, i) => (
              <Reveal key={t.key} delay={(i % 3) * 0.06}>
                <div
                  className={`relative overflow-hidden rounded-[2px] ${
                    i % 4 === 0 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  <EditableImage
                    id={t.key}
                    src={t.url}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
