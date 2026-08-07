import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/coautoria" },
  title: "Como funciona a coautoria · Patuá Artesania Brasileira",
  description:
    "Na Patuá, a coautoria é um processo de criação compartilhado: escuta, criação, coautoria e artesania — um tramado personalizado, desenvolvido especialmente para você.",
};

type Step = {
  key: string;
  titulo: string;
  corpo: string;
  imagens: { key: string; url: string; alt: string }[];
};

export default async function CoautoriaPage() {
  const heroImagem = await getContent("coautoria.hero.imagem", {
    url: "/images/coautoria/hero.jpg",
    alt: "Processo de criação em coautoria na Patuá",
  });

  const introEyebrow = await getContent(
    "coautoria.intro.eyebrow",
    "Como funciona a coautoria",
  );
  const introTitulo = await getContent(
    "coautoria.intro.titulo",
    "Cada peça começa com uma conversa.",
  );
  const introCorpo = await getContent(
    "coautoria.intro.corpo",
    "Na Patuá, a coautoria é um processo de criação compartilhado. Você participa da construção de um desenho pensado para o seu espaço, sua forma de viver e a atmosfera que deseja criar. Ao longo desse caminho, referências, ideias e gostos se transformam em um tramado personalizado, desenvolvido especialmente para você.",
  );

  const [
    escutaCorpo,
    criacaoCorpo,
    coautoriaCorpo,
    artesaniaCorpo,
    escutaImg,
    criacaoImg,
    coautoriaImg,
    artesaniaImg1,
    artesaniaImg2,
    finalTitulo,
    finalCorpo,
    finalTagline,
  ] = await Promise.all([
    getContent(
      "coautoria.escuta.corpo",
      "O processo começa com uma conversa conduzida por Carol Risi, diretora criativa da Patuá. Buscamos compreender o ambiente, as preferências de cores, os materiais, as referências e tudo o que ajuda a revelar a identidade do espaço. Fotos, projetos e imagens de inspiração enriquecem essa etapa.",
    ),
    getContent(
      "coautoria.criacao.corpo",
      "A partir dessa escuta, iniciamos a pesquisa e o desenvolvimento do tramado. Você recebe propostas de desenho em formato digital, criadas especialmente para o seu projeto.",
    ),
    getContent(
      "coautoria.coautoria.corpo",
      "É nesse momento que a criação acontece de forma colaborativa. Conversamos, refinamos as propostas e ajustamos os detalhes até que o desenho represente exatamente o resultado desejado. Cada decisão faz parte da construção da peça.",
    ),
    getContent(
      "coautoria.artesania.corpo",
      "Com o desenho aprovado, iniciamos a produção artesanal. Cada tramado é confeccionado manualmente, unindo precisão técnica, cuidado nos acabamentos e o tempo necessário para transformar uma ideia em uma peça única.",
    ),
    getContent("coautoria.escuta.imagem", {
      url: "/images/coautoria/escuta.jpg",
      alt: "Escuta — conversa que inicia o projeto",
    }),
    getContent("coautoria.criacao.imagem", {
      url: "/images/coautoria/criacao.jpg",
      alt: "Criação — desenvolvimento do tramado",
    }),
    getContent("coautoria.coautoria.imagem", {
      url: "/images/coautoria/coautoria.jpg",
      alt: "Coautoria — refino colaborativo do desenho",
    }),
    getContent("coautoria.artesania.imagem1", {
      url: "/images/coautoria/artesania-1.jpg",
      alt: "Artesania — produção manual do tramado",
    }),
    getContent("coautoria.artesania.imagem2", {
      url: "/images/coautoria/artesania-2.jpg",
      alt: "Artesania — acabamento da peça",
    }),
    getContent(
      "coautoria.final.titulo",
      "Quando o projeto ganha vida",
    ),
    getContent(
      "coautoria.final.corpo",
      "O resultado é uma peça criada em diálogo, que nasce da união entre o olhar da Patuá e a identidade de quem vai viver aquele espaço.",
    ),
    getContent("coautoria.final.tagline", "Quando é Patuá, você sente."),
  ]);

  const steps: Step[] = [
    {
      key: "escuta",
      titulo: "Escuta",
      corpo: escutaCorpo,
      imagens: [{ key: "coautoria.escuta.imagem", ...escutaImg }],
    },
    {
      key: "criacao",
      titulo: "Criação",
      corpo: criacaoCorpo,
      imagens: [{ key: "coautoria.criacao.imagem", ...criacaoImg }],
    },
    {
      key: "coautoria",
      titulo: "Coautoria",
      corpo: coautoriaCorpo,
      imagens: [{ key: "coautoria.coautoria.imagem", ...coautoriaImg }],
    },
    {
      key: "artesania",
      titulo: "Artesania",
      corpo: artesaniaCorpo,
      imagens: [
        { key: "coautoria.artesania.imagem1", ...artesaniaImg1 },
        { key: "coautoria.artesania.imagem2", ...artesaniaImg2 },
      ],
    },
  ];

  return (
    <>
      {/* HERO — foto de abertura, sem texto sobreposto (ref. Expormim). Altura
          contida (a cliente pediu imagem menor e texto mais perto) pra a foto e
          a introdução aparecerem juntas já na entrada da página. */}
      <section className="relative h-[46vh] min-h-[280px] w-full overflow-hidden bg-[var(--color-bark)] md:h-[54vh] md:max-h-[560px]">
        <EditableImage
          id="coautoria.hero.imagem"
          src={heroImagem.url}
          alt={heroImagem.alt ?? "Processo de criação em coautoria na Patuá"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* INTRO */}
      <section className="bg-[var(--color-cream)] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Editable
                  id="coautoria.intro.eyebrow"
                  as="span"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
                >
                  {introEyebrow}
                </Editable>
                <Editable
                  id="coautoria.intro.titulo"
                  as="h1"
                  className="font-display mt-6 max-w-[14ch] text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.03] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {introTitulo}
                </Editable>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <Reveal delay={0.12}>
                <Editable
                  id="coautoria.intro.corpo"
                  as="p"
                  className="max-w-[58ch] text-lg leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-xl"
                >
                  {introCorpo}
                </Editable>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ETAPAS — foto ao lado do texto, alternando lados (ref. Expormim) */}
      <section className="bg-[var(--color-cream-light)] pb-8 md:pb-16">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          {steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={step.key}>
                <div className="grid items-center gap-8 border-t border-[color:var(--color-bark)]/12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
                  {/* Imagem(ns) */}
                  <div
                    className={`md:col-span-7 ${flip ? "md:order-2" : "md:order-1"}`}
                  >
                    <div
                      className={`grid gap-3 ${step.imagens.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                    >
                      {step.imagens.map((img) => (
                        <div
                          key={img.key}
                          className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]"
                        >
                          <EditableImage
                            id={img.key}
                            src={img.url}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Texto */}
                  <div
                    className={`md:col-span-5 ${flip ? "md:order-1" : "md:order-2"}`}
                  >
                    <Editable
                      id={`coautoria.${step.key}.titulo`}
                      as="h2"
                      className="font-display mt-3 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                    >
                      {step.titulo}
                    </Editable>
                    <Editable
                      id={`coautoria.${step.key}.corpo`}
                      as="p"
                      className="mt-6 max-w-[46ch] text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg"
                    >
                      {step.corpo}
                    </Editable>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* QUANDO O PROJETO GANHA VIDA */}
      <section className="bg-[var(--color-terracotta)] py-24 text-center text-[var(--color-cream-light)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
          <Reveal>
            <Editable
              id="coautoria.final.titulo"
              as="h2"
              className="font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
            >
              {finalTitulo}
            </Editable>
            <Editable
              id="coautoria.final.corpo"
              as="p"
              className="mx-auto mt-8 max-w-[52ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-lg"
            >
              {finalCorpo}
            </Editable>
            <Editable
              id="coautoria.final.tagline"
              as="p"
              className="font-display mt-10 text-[clamp(1.75rem,3.4vw,2.75rem)] italic leading-none"
            >
              {finalTagline}
            </Editable>
          </Reveal>
        </div>
      </section>
    </>
  );
}
