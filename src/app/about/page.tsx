import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre · Patuá Ateliê",
  description:
    "O Patuá nasce do encontro entre fazer manual, design e desejo de criar algo com permanência.",
};

const PILLARS = [
  {
    title: "Autoria que se constrói no encontro",
    body: "Cada peça nasce de uma escuta.\nDo espaço, do uso, de quem vai habitar.",
    image: "/images/about/about-detalhes-1.jpg",
  },
  {
    title: "O fazer como linguagem",
    body: "O gesto manual não é processo.\nÉ parte do resultado.",
    image: "/images/about/about-detalhes-2.jpg",
  },
  {
    title: "Matéria que tem voz",
    body: "A escolha do material não é estética.\nÉ comportamento, textura, tempo.",
    image: "/images/about/about-detalhe-material.jpg",
  },
  {
    title: "Peças que permanecem",
    body: "Não seguem tendência.\nSe integram à vida e evoluem com ela.",
    image: "/images/about/about-detalhes-3.jpg",
  },
  {
    title: "Precisão no invisível",
    body: "O detalhe não está só no que se vê.\nEstá no que sustenta a experiência.",
    image: "/images/about/about-close-trama.jpg",
  },
];

type ResolvedPillar = {
  title: string;
  body: string;
  image: { url: string; alt?: string };
  titleKey: string;
  bodyKey: string;
  imageKey: string;
};

export default async function AboutPage() {
  // HERO
  const heroEyebrow = await getContent("about.hero.eyebrow", "Sobre a Patuá");
  const heroTitulo = await getContent(
    "about.hero.titulo",
    "Criamos peças que unem forma, função e permanência.",
  );
  const heroImagem = await getContent("about.hero.imagem", {
    url: "/images/about/about-fazer-manual.jpg",
    alt: "Mãos tecendo trama colorida no ateliê Patuá",
  });

  // MANIFESTO
  const manifestoEyebrow = await getContent(
    "about.manifesto.eyebrow",
    "Nosso Manifesto",
  );
  const manifestoTitulo = await getContent(
    "about.manifesto.titulo",
    "Redefinir o valor do feito à mão.",
  );
  const manifestoP1 = await getContent(
    "about.manifesto.p1",
    "Uma coisa em nós é ancestral e profundamente presente: precisamos fazer. Fazer com as mãos, com o tempo, com atenção. O mais atento dos olhares reconhece quando algo foi construído de verdade.",
  );
  const manifestoP2 = await getContent(
    "about.manifesto.p2",
    "Tudo guarda um gesto. Tudo é trama, estrutura, decisão, matéria que fala. Do seu lugar, o fio, a fibra, o entrelaço seguirão dizendo de onde vieram e para onde vão.",
  );
  const manifestoP3 = await getContent(
    "about.manifesto.p3",
    "A peça, só de existir, já está falando. Não se faz design apenas com forma — faz-se com processo, com cultura, com autoria. E com brasilidade.",
  );

  // O QUE ATRAVESSA CADA PEÇA
  const atravessaTitulo = await getContent(
    "about.atravessa.titulo",
    "O que atravessa cada peça",
  );
  const atravessaIntro = await getContent(
    "about.atravessa.intro",
    "Na Patuá, não criamos apenas móveis. Criamos relações entre matéria, tempo e presença.",
  );

  // PILLARS
  const pillars: ResolvedPillar[] = await Promise.all(
    PILLARS.map(async (p, i) => {
      const n = i + 1;
      const titleKey = `about.pilar${n}.titulo`;
      const bodyKey = `about.pilar${n}.corpo`;
      const imageKey = `about.pilar${n}.imagem`;
      const [title, body, image] = await Promise.all([
        getContent(titleKey, p.title),
        getContent(bodyKey, p.body),
        getContent(imageKey, { url: p.image, alt: p.title }),
      ]);
      return { title, body, image, titleKey, bodyKey, imageKey };
    }),
  );

  // QUEM SOMOS
  const quemsomosEyebrow = await getContent(
    "about.quemsomos.eyebrow",
    "Quem somos",
  );
  const quemsomosTitulo = await getContent(
    "about.quemsomos.titulo",
    "Quem está por trás das peças.",
  );
  const quemsomosIntro = await getContent(
    "about.quemsomos.intro",
    "Antes de qualquer forma, existe gente. Histórias, mãos, escolhas e encontros que dão origem a cada peça.",
  );

  // BLOCO CAROL
  const carolImagem = await getContent("about.carol.imagem", {
    url: "/images/about/carol-1.png",
    alt: "Carol Risi — direção criativa",
  });
  const carolEyebrow = await getContent("about.carol.eyebrow", "Direção criativa");
  const carolNome = await getContent("about.carol.nome", "Carol Risi.");
  const carolP1 = await getContent(
    "about.carol.p1",
    "À frente da criação, está Carol Risi. Seu olhar traduz espaços, gestos e intenções em desenho. Cada peça nasce de um processo sensível de observação, escuta e construção conjunta.",
  );
  const carolP2 = await getContent(
    "about.carol.p2",
    "Mais do que desenhar móveis, Carol Risi desenha relações entre matéria e vida.",
  );

  // BLOCO COLETIVO
  const coletivoImagem = await getContent("about.coletivo.imagem", {
    url: "/images/about/nos-4.png",
    alt: "As mulheres da Patuá",
  });
  const coletivoEyebrow = await getContent("about.coletivo.eyebrow", "Coletivo");
  const coletivoTitulo = await getContent(
    "about.coletivo.titulo",
    "A Patuá é feita por mulheres.",
  );
  const coletivoP1 = await getContent(
    "about.coletivo.p1",
    "Cada uma traz um olhar, um ritmo, uma forma de fazer. Entre criação, produção e construção do negócio, a marca se sustenta na soma dessas presenças.",
  );
  const coletivoP2 = await getContent(
    "about.coletivo.p2",
    "Não é uma linha de produção. É um processo vivo.",
  );

  // HISTÓRIA
  const historiaEyebrow = await getContent("about.historia.eyebrow", "História");
  const historiaTitulo = await getContent(
    "about.historia.titulo",
    "Nada aqui é apressado.",
  );
  const historiaP1 = await getContent(
    "about.historia.p1",
    "A Patuá nasce do encontro entre fazer manual, design e desejo de criar algo com permanência.",
  );
  const historiaP2 = await getContent(
    "about.historia.p2",
    "Ao longo do tempo, o que começou como experimentação foi ganhando forma — e também responsabilidade.",
  );
  const historiaP3 = await getContent(
    "about.historia.p3",
    "Hoje, cada peça carrega esse percurso: de tentativa, aprendizado e construção contínua.",
  );
  const historiaP4 = await getContent(
    "about.historia.p4",
    "E talvez seja isso que faz cada coisa durar.",
  );

  return (
    <>
      {/* HERO — imagem full-bleed com headline centralizada */}
      <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-[var(--color-bark)] text-[var(--color-cream-light)]">
        <EditableImage
          id="about.hero.imagem"
          src={heroImagem.url}
          alt={heroImagem.alt ?? "Mãos tecendo trama colorida no ateliê Patuá"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/35"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[var(--container-page)] flex-col items-center justify-end px-4 pb-20 text-center md:px-10 md:pb-28">
          <Reveal>
            <Editable
              id="about.hero.eyebrow"
              as="span"
              className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/80"
            >
              {heroEyebrow}
            </Editable>
          </Reveal>
          <Reveal delay={0.1}>
            <Editable
              id="about.hero.titulo"
              as="h1"
              className="font-display mt-5 max-w-[24ch] text-[clamp(1.875rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
            >
              {heroTitulo}
            </Editable>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO — tarja olive/stone, texto editorial centralizado */}
      <section className="bg-[var(--color-stone)] text-[var(--color-cream-light)]">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <Editable
              id="about.manifesto.eyebrow"
              as="span"
              className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70"
            >
              {manifestoEyebrow}
            </Editable>
          </Reveal>
          <Reveal delay={0.1}>
            <Editable
              id="about.manifesto.titulo"
              as="h2"
              className="font-display mt-6 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
            >
              {manifestoTitulo}
            </Editable>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 max-w-[60ch] space-y-6 text-base leading-[1.6] text-[var(--color-cream-light)]/90 md:text-lg">
              <Editable id="about.manifesto.p1" as="p">
                {manifestoP1}
              </Editable>
              <Editable id="about.manifesto.p2" as="p">
                {manifestoP2}
              </Editable>
              <Editable id="about.manifesto.p3" as="p">
                {manifestoP3}
              </Editable>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div
              aria-hidden
              className="mt-16 flex items-center justify-center gap-4 text-[var(--color-cream-light)]/60"
            >
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* O QUE ATRAVESSA CADA PEÇA — 2 col header + cards offset à direita */}
      <section className="bg-[var(--color-cream)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          {/* Header */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <Reveal>
              <Editable
                id="about.atravessa.titulo"
                as="h2"
                className="font-display max-w-[14ch] text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
              >
                {atravessaTitulo}
              </Editable>
            </Reveal>
            <Reveal delay={0.1} className="md:pt-4 md:text-right">
              <Editable
                id="about.atravessa.intro"
                as="p"
                className="max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:ml-auto md:text-lg"
              >
                {atravessaIntro}
              </Editable>
            </Reveal>
          </div>

          <hr className="mt-10 border-t border-[var(--color-bark)]/15 md:mt-14" />

          {/* Linha 1: 3 cards à direita (col 2-4 em grid de 4) */}
          <div className="mt-12 grid grid-cols-2 gap-5 md:mt-20 md:grid-cols-4 md:gap-6">
            <div className="hidden md:col-span-1 md:block" aria-hidden />
            {pillars.slice(0, 3).map((p, i) => (
              <PillarCard key={p.titleKey} pillar={p} index={i} />
            ))}
          </div>

          {/* Linha 2: 2 cards à direita (col 3-4 em grid de 4) */}
          <div className="mt-5 grid grid-cols-2 gap-5 md:mt-6 md:grid-cols-4 md:gap-6">
            <div className="hidden md:col-span-2 md:block" aria-hidden />
            {pillars.slice(3).map((p, i) => (
              <PillarCard key={p.titleKey} pillar={p} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="bg-[var(--color-cream-light)] py-28 md:py-36">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="mx-auto max-w-[var(--container-prose)] text-center">
              <Editable
                id="about.quemsomos.eyebrow"
                as="span"
                className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60"
              >
                {quemsomosEyebrow}
              </Editable>
              <Editable
                id="about.quemsomos.titulo"
                as="h2"
                className="font-display mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
              >
                {quemsomosTitulo}
              </Editable>
              <Editable
                id="about.quemsomos.intro"
                as="p"
                className="mx-auto mt-8 max-w-[52ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:text-lg"
              >
                {quemsomosIntro}
              </Editable>
            </div>
          </Reveal>

          {/* Bloco Carol */}
          <Reveal delay={0.15}>
            <div className="mt-28 grid items-center gap-12 md:mt-36 md:grid-cols-12 md:gap-20">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                  <EditableImage
                    id="about.carol.imagem"
                    src={carolImagem.url}
                    alt={carolImagem.alt ?? "Carol Risi — direção criativa"}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <Editable
                  id="about.carol.eyebrow"
                  as="span"
                  className="text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
                >
                  {carolEyebrow}
                </Editable>
                <Editable
                  id="about.carol.nome"
                  as="h3"
                  className="font-display mt-4 text-[clamp(2.5rem,4vw,4rem)] leading-[1] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {carolNome}
                </Editable>
                <Editable
                  id="about.carol.p1"
                  as="p"
                  className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {carolP1}
                </Editable>
                <Editable
                  id="about.carol.p2"
                  as="p"
                  className="mt-5 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {carolP2}
                </Editable>
              </div>
            </div>
          </Reveal>

          {/* Bloco Coletivo */}
          <Reveal delay={0.15}>
            <div className="mt-28 grid items-center gap-12 md:mt-36 md:grid-cols-12 md:gap-20 md:[direction:rtl]">
              <div className="md:col-span-7 md:[direction:ltr]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream)]">
                  <EditableImage
                    id="about.coletivo.imagem"
                    src={coletivoImagem.url}
                    alt={coletivoImagem.alt ?? "As mulheres da Patuá"}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              </div>
              <div className="md:col-span-5 md:[direction:ltr]">
                <Editable
                  id="about.coletivo.eyebrow"
                  as="span"
                  className="text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
                >
                  {coletivoEyebrow}
                </Editable>
                <Editable
                  id="about.coletivo.titulo"
                  as="h3"
                  className="font-display mt-4 text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {coletivoTitulo}
                </Editable>
                <Editable
                  id="about.coletivo.p1"
                  as="p"
                  className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {coletivoP1}
                </Editable>
                <Editable
                  id="about.coletivo.p2"
                  as="p"
                  className="mt-5 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {coletivoP2}
                </Editable>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTÓRIA — bloco olive/stone, editorial */}
      <section className="bg-[var(--color-stone)] text-[var(--color-cream-light)]">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 py-28 text-center md:px-10 md:py-36">
          <Reveal>
            <Editable
              id="about.historia.eyebrow"
              as="span"
              className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70"
            >
              {historiaEyebrow}
            </Editable>
            <Editable
              id="about.historia.titulo"
              as="h2"
              className="font-display mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
            >
              {historiaTitulo}
            </Editable>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-[58ch] space-y-6 text-base leading-[1.6] text-[var(--color-cream-light)]/90 md:text-lg">
              <Editable id="about.historia.p1" as="p">
                {historiaP1}
              </Editable>
              <Editable id="about.historia.p2" as="p">
                {historiaP2}
              </Editable>
              <Editable id="about.historia.p3" as="p">
                {historiaP3}
              </Editable>
              <Editable id="about.historia.p4" as="p" className="italic">
                {historiaP4}
              </Editable>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: ResolvedPillar;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group relative aspect-[335/490] overflow-hidden bg-[var(--color-cream-light)]">
        {/* Imagem (estado default) */}
        <EditableImage
          id={pillar.imageKey}
          src={pillar.image.url}
          alt={pillar.image.alt ?? pillar.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/20 transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Hover overlay: olive sólido com title + body */}
        <div className="absolute inset-0 flex flex-col bg-[var(--color-stone)] p-6 text-[var(--color-cream-light)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-8">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Editable
              id={pillar.titleKey}
              as="h3"
              className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.1]"
            >
              {pillar.title}
            </Editable>
            <Editable
              id={pillar.bodyKey}
              as="p"
              className="mt-5 max-w-[28ch] whitespace-pre-line text-sm leading-[1.5] text-[var(--color-cream-light)]/85 md:text-base"
            >
              {pillar.body}
            </Editable>
          </div>
        </div>

        {/* Default state: título visível sobre imagem */}
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-6 text-center transition-opacity duration-500 group-hover:opacity-0">
          <Editable
            id={pillar.titleKey}
            as="h3"
            className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] text-[var(--color-cream-light)]"
          >
            {pillar.title}
          </Editable>
        </div>
      </div>
    </Reveal>
  );
}
