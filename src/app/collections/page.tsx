import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";
import { COLECOES } from "@/lib/colecoes";

export const metadata: Metadata = {
  alternates: { canonical: "/collections" },
  title: "Coleções · Patuá Artesania Brasileira",
  description:
    "Celebrar a brasilidade é transformar a diversidade do Brasil em design. Conheça as coleções Cobogó, Xodó, Andança, Palafita e outras peças autorais da Patuá.",
};

const PERSONALIZACAO = [
  "Desenho do tramado",
  "Cores dos fios",
  "Cor da estrutura",
  "Acabamento da madeira",
  "Dimensões (em peças selecionadas)",
];

export default async function CollectionsIndex() {
  const frase = await getContent(
    "collections.frase",
    "Celebrar a brasilidade é transformar a diversidade do Brasil em design.",
  );
  const intro1 = await getContent(
    "collections.intro1",
    "Um país de dimensões continentais reúne diferentes culturas, paisagens, arquiteturas, saberes, matérias-primas e formas de criar. É dessa pluralidade que nasce a riqueza da identidade brasileira.",
  );
  const intro2 = await getContent(
    "collections.intro2",
    "Na Patuá, cada coleção interpreta um fragmento desse Brasil. Das referências da arquitetura modernista aos saberes artesanais, das cores que atravessam o território às influências de Norte a Sul que fazem parte da nossa história, transformamos diversidade em mobiliário autoral, produzido manualmente e pensado para permanecer.",
  );
  const destaque = await getContent("collections.destaque.imagem", {
    url: "/images/collections/index/destaque.jpg",
    alt: "Peça autoral Patuá em tramado colorido",
  });
  const menor1 = await getContent("collections.menor1.imagem", {
    url: "/images/collections/index/menor-1.jpg",
    alt: "Detalhe de peça Patuá",
  });
  const menor2 = await getContent("collections.menor2.imagem", {
    url: "/images/collections/index/menor-2.jpg",
    alt: "Peça Patuá personalizada",
  });
  const unicaTitulo = await getContent(
    "collections.unica.titulo",
    "Cada peça pode ser única.",
  );
  const unicaCorpo = await getContent(
    "collections.unica.corpo",
    "Na Patuá, o processo criativo continua depois da escolha do móvel. Cada peça pode ser personalizada para dialogar com o projeto, o ambiente e a identidade de quem irá utilizá-la.",
  );
  const unicaEspeciais = await getContent(
    "collections.unica.especiais",
    "Em projetos especiais, também desenvolvemos novas peças, novos desenhos de tramados e adaptações sob medida.",
  );

  return (
    <>
      {/* HEADER */}
      <section className="bg-[var(--color-cream)] pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
              Coleções Patuá
            </span>
            <Editable
              id="collections.frase"
              as="h1"
              className="font-display mt-5 max-w-[20ch] text-[clamp(2.5rem,5.4vw,5rem)] leading-[1.04] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
            >
              {frase}
            </Editable>
          </Reveal>
        </div>
      </section>

      {/* FOTO DESTAQUE */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-bark)] md:aspect-[16/8]">
              <EditableImage
                id="collections.destaque.imagem"
                src={destaque.url}
                alt={destaque.alt ?? "Peça autoral Patuá"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO — pluralidade */}
      <section className="bg-[var(--color-cream)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
          <Reveal>
            <div className="space-y-6 text-lg leading-[1.7] text-[var(--color-bark)]/80 md:text-xl">
              <Editable id="collections.intro1" as="p">
                {intro1}
              </Editable>
              <Editable id="collections.intro2" as="p">
                {intro2}
              </Editable>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GRID DE COLEÇÕES — nome em cima da foto, clicável */}
      <section className="bg-[var(--color-cream)] pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-5 md:gap-x-6">
            {COLECOES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link href={`/collections/${c.slug}`} className="group block">
                  <h2 className="mb-4 font-display text-lg leading-tight tracking-[var(--tracking-snug)] text-[var(--color-bark)] md:text-xl">
                    {c.nome}
                  </h2>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
                    <EditableImage
                      id={`collections.capa.${c.slug}`}
                      src={c.capa}
                      alt={c.nome}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CADA PEÇA PODE SER ÚNICA — personalização */}
      <section className="bg-[var(--color-cream-light)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Editable
                  id="collections.unica.titulo"
                  as="h2"
                  className="font-display max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {unicaTitulo}
                </Editable>
                <Editable
                  id="collections.unica.corpo"
                  as="p"
                  className="mt-6 max-w-[46ch] text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {unicaCorpo}
                </Editable>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:pt-2">
              <Reveal delay={0.12}>
                <p className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--color-terracotta)]">
                  Você pode escolher
                </p>
                <ul className="mt-6 divide-y divide-[color:var(--color-bark)]/12 border-y border-[color:var(--color-bark)]/12">
                  {PERSONALIZACAO.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 py-4 text-base text-[var(--color-bark)]/85 md:text-lg"
                    >
                      <span className="font-mono text-sm text-[var(--color-terracotta)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Editable
                  id="collections.unica.especiais"
                  as="p"
                  className="mt-8 max-w-[58ch] text-base leading-[1.7] text-[var(--color-bark)]/75 md:text-lg"
                >
                  {unicaEspeciais}
                </Editable>
              </Reveal>
            </div>
          </div>

          {/* Duas fotos menores */}
          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20">
              {[
                { id: "collections.menor1.imagem", img: menor1 },
                { id: "collections.menor2.imagem", img: menor2 },
              ].map(({ id, img }) => (
                <div
                  key={id}
                  className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream)]"
                >
                  <EditableImage
                    id={id}
                    src={img.url}
                    alt={img.alt ?? "Peça Patuá"}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
