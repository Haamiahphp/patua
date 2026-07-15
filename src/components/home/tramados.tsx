import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

// Bento: cada peça tem um tamanho (span) próprio no grid de 6 colunas.
// Recortes de tramado — prevalece a imagem da trama (pedido da cliente).
const TILES = [
  { src: "/images/tramas/trama-01.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/tramas/trama-06.jpg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-03.jpg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-09.jpeg", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/tramas/trama-11.jpeg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-13.jpeg", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/tramas/trama-02.jpg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-07.jpg", span: "md:col-span-3 md:row-span-1" },
  { src: "/images/tramas/trama-15.jpeg", span: "md:col-span-3 md:row-span-1" },
  { src: "/images/tramas/trama-17.jpeg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-04.jpg", span: "md:col-span-2 md:row-span-1" },
  { src: "/images/tramas/trama-18.jpeg", span: "md:col-span-2 md:row-span-1" },
];

export async function TramadosSection() {
  const titulo = await getContent(
    "home.tramados.titulo",
    "Explore nossos tramados",
  );
  const corpo = await getContent(
    "home.tramados.corpo",
    "Nenhuma peça Patuá é igual à outra. Cores, desenhos e ritmos podem ser combinados para criar uma peça que converse com o seu espaço. Estas são algumas das possibilidades que já nasceram por aqui.",
  );
  const cta = await getContent("home.tramados.cta", "Vamos criar o seu");
  const tiles = await Promise.all(
    TILES.map(async (t, i) => {
      const key = `home.tramados.item${i + 1}`;
      const value = await getContent(key, { url: t.src, alt: "Tramado Patuá" });
      return { key, span: t.span, url: value.url, alt: value.alt ?? "Tramado Patuá" };
    }),
  );

  return (
    <section className="relative bg-[var(--color-cream)] py-16 text-[var(--color-bark)] md:py-24">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid grid-cols-2 gap-2 md:auto-rows-[190px] md:grid-flow-dense md:grid-cols-6">
          {/* Texto — canto superior esquerdo do bento */}
          <div className="col-span-2 flex flex-col justify-center pb-4 pr-2 md:row-span-2 md:pb-0 md:pr-8">
            <Reveal>
              <Editable
                id="home.tramados.titulo"
                as="h2"
                className="font-display max-w-[12ch] text-[clamp(1.875rem,3.4vw,3rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]"
              >
                {titulo}
              </Editable>
              <Editable
                id="home.tramados.corpo"
                as="p"
                className="mt-5 max-w-[40ch] text-sm leading-[var(--leading-body)] text-[var(--color-stone)] md:text-base"
              >
                {corpo}
              </Editable>
              <Link
                href="/contact-us"
                className="group mt-7 inline-flex items-center gap-3 text-sm font-medium text-[var(--color-terracotta)]"
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

          {/* Peças do bento */}
          {tiles.map((t) => (
            <div
              key={t.key}
              className={`relative aspect-square overflow-hidden md:aspect-auto ${t.span}`}
            >
              <EditableImage
                id={t.key}
                src={t.url}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
