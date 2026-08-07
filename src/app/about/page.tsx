import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre · Patuá Artesania Brasileira",
  description:
    "Patuá e você. Mobiliário autoral brasileiro, feito à mão e criado em coautoria — a história de uma marca que escolheu criar para permanecer.",
};

export default async function AboutPage() {
  // HERO
  const heroTitulo = await getContent(
    "about.hero.titulo",
    "Escolhemos criar para permanecer.",
  );
  const heroImagem = await getContent("about.hero.imagem", {
    url: "/images/about/about-fazer-manual.jpg",
    alt: "Mãos tecendo trama colorida no ateliê Patuá",
  });

  // MANIFESTO — Patuá e você.
  const manifestoEyebrow = await getContent(
    "about.manifesto.eyebrow",
    "Manifesto Patuá",
  );
  const manifestoTitulo = await getContent(
    "about.manifesto.titulo",
    "Patuá e você.",
  );
  const manifestoSub = await getContent(
    "about.manifesto.sub",
    "Porque acreditamos que as histórias mais bonitas são construídas juntas.",
  );
  const manifestoP1 = await getContent(
    "about.manifesto.p1",
    "Vivemos cercados de coisas feitas para durar pouco, mas escolhemos outro caminho.",
  );
  const manifestoP2 = await getContent(
    "about.manifesto.p2",
    "Acreditamos no tempo como matéria-prima, na conversa antes do desenho, no cuidado e na atenção a cada detalhe.",
  );
  const manifestoP3 = await getContent(
    "about.manifesto.p3",
    "Cada peça nasce do encontro entre pessoas, matérias, espaços, histórias e personalidades.",
  );
  const manifestoP4 = await getContent(
    "about.manifesto.p4",
    "Criamos em coautoria, valorizamos a brasilidade e desenvolvemos peças para permanecer, acompanhar histórias e atravessar gerações.",
  );

  // HISTÓRIA DA PATUÁ (substitui "O que atravessa cada peça")
  const historiaTitulo = await getContent(
    "about.historiamarca.titulo",
    "A história da Patuá",
  );
  const historiaP1 = await getContent(
    "about.historiamarca.p1",
    "Em 2000, Carol Risi iniciou uma trajetória movida pelo desejo de criar e de explorar as possibilidades do fazer manual. O trabalho começou com peças artesanais e foi se transformando à medida que ela experimentava novos materiais, formatos e combinações de cores.",
  );
  const historiaP2 = await getContent(
    "about.historiamarca.p2",
    "Inquieta e sempre interessada em descobrir até onde poderia chegar, Carol aprofundou sua prática, aprimorou técnicas e desenvolveu um tramado próprio. Esse processo marcou a passagem para o mobiliário autoral e deu forma a uma linguagem criativa construída ao longo de mais de duas décadas.",
  );
  const historiaP3 = await getContent(
    "about.historiamarca.p3",
    "Anos depois, essa trajetória ganhou um novo capítulo com a chegada de três sócias. A empresa passou por um reposicionamento e, desse encontro, nasceu a Patuá como conhecemos hoje: uma marca de mobiliário autoral brasileiro, feita à mão e criada em coautoria.",
  );
  const historiaP4 = await getContent(
    "about.historiamarca.p4",
    "Hoje, a Patuá é conduzida por quatro mulheres, com raízes no Nordeste e no Sudeste do Brasil. Essa diversidade de origens amplia os olhares, enriquece o processo criativo e reforça a brasilidade que está presente em cada peça da marca.",
  );
  const historiaP5 = await getContent(
    "about.historiamarca.p5",
    "A essência permanece a mesma desde o início: criar com liberdade, valorizar o saber manual e desenvolver peças que carregam identidade, cuidado e permanência.",
  );

  // QUEM DESENHA COM VOCÊ
  const quemTitulo = await getContent(
    "about.quemsomos.titulo",
    "Quem desenha com você.",
  );
  const quemIntro = await getContent(
    "about.quemsomos.intro",
    "Antes de qualquer forma, existe gente. Histórias, mãos, escolhas e encontros que dão origem a cada peça.",
  );

  // BLOCO CAROL
  const carolImagem = await getContent("about.carol.imagem", {
    url: "/images/about/carol-1.png",
    alt: "Carol Risi — direção criativa",
  });
  const carolEyebrow = await getContent("about.carol.eyebrow", "Direção criativa");
  const carolNome = await getContent("about.carol.nome", "Carol Risi");
  const carolP1 = await getContent(
    "about.carol.p1",
    "Acredito que o design começa muito antes do desenho. É na escuta, na observação e na compreensão de como cada pessoa vive e se relaciona com os seus espaços que tudo inicia.",
  );
  const carolP2 = await getContent(
    "about.carol.p2",
    "Minha trajetória une design de interiores, pesquisa sobre materiais, prática artística e uma busca constante por criar peças que façam sentido para quem vai conviver com elas.",
  );
  const carolP3 = await getContent(
    "about.carol.p3",
    "Na Patuá, acompanho pessoalmente todo o processo de criação, da escolha dos materiais ao desenho final. Gosto de pensar que cada detalhe é uma oportunidade de transformar ideias, histórias e referências em móveis que unem estética, funcionalidade e identidade brasileira.",
  );
  const carolP4 = await getContent(
    "about.carol.p4",
    "Para mim, criar é escutar, fazer escolhas com cuidado e desenvolver peças pensadas para permanecer ao lado das pessoas por toda a vida.",
  );

  // BLOCO COLETIVO (sócias) — mantido até chegarem as novas fotos
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
          <Reveal delay={0.1}>
            <Editable
              id="about.hero.titulo"
              as="h1"
              className="font-display max-w-[20ch] text-[clamp(2rem,4.6vw,4rem)] leading-[1.03] tracking-[var(--tracking-tight)]"
            >
              {heroTitulo}
            </Editable>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO — Patuá e você. (âncora do banner "slogan" da home) */}
      <section
        id="manifesto"
        className="scroll-mt-28 bg-[var(--color-stone)] text-[var(--color-cream-light)]"
      >
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <Editable
              id="about.manifesto.eyebrow"
              as="span"
              className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70"
            >
              {manifestoEyebrow}
            </Editable>
          </Reveal>
          <Reveal delay={0.1}>
            <Editable
              id="about.manifesto.titulo"
              as="h2"
              className="font-display mt-6 text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1.02] tracking-[var(--tracking-tight)]"
            >
              {manifestoTitulo}
            </Editable>
          </Reveal>
          <Reveal delay={0.16}>
            <Editable
              id="about.manifesto.sub"
              as="p"
              className="mx-auto mt-6 max-w-[46ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-xl"
            >
              {manifestoSub}
            </Editable>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mx-auto mt-12 max-w-[58ch] space-y-6 text-base leading-[1.7] text-[var(--color-cream-light)]/90 md:text-lg">
              <Editable id="about.manifesto.p1" as="p">
                {manifestoP1}
              </Editable>
              <Editable id="about.manifesto.p2" as="p">
                {manifestoP2}
              </Editable>
              <Editable id="about.manifesto.p3" as="p">
                {manifestoP3}
              </Editable>
              <Editable id="about.manifesto.p4" as="p">
                {manifestoP4}
              </Editable>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTÓRIA DA PATUÁ — editorial split */}
      <section className="bg-[var(--color-cream)] py-24 text-[var(--color-bark)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Editable
                  id="about.historiamarca.titulo"
                  as="h2"
                  className="font-display max-w-[12ch] text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.04] tracking-[var(--tracking-tight)]"
                >
                  {historiaTitulo}
                </Editable>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <Reveal delay={0.12}>
                <div className="max-w-[62ch] space-y-6 text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg">
                  <Editable
                    id="about.historiamarca.p1"
                    as="p"
                    className="text-lg leading-[1.6] text-[var(--color-bark)] md:text-xl"
                  >
                    {historiaP1}
                  </Editable>
                  <Editable id="about.historiamarca.p2" as="p">
                    {historiaP2}
                  </Editable>
                  <Editable id="about.historiamarca.p3" as="p">
                    {historiaP3}
                  </Editable>
                  <Editable id="about.historiamarca.p4" as="p">
                    {historiaP4}
                  </Editable>
                  <Editable id="about.historiamarca.p5" as="p">
                    {historiaP5}
                  </Editable>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* QUEM DESENHA COM VOCÊ (âncora do banner "Carol Risi" da home) */}
      <section
        id="quem-desenha"
        className="scroll-mt-28 bg-[var(--color-cream-light)] py-28 md:py-36"
      >
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="mx-auto max-w-[var(--container-prose)] text-center">
              <Editable
                id="about.quemsomos.titulo"
                as="h2"
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
              >
                {quemTitulo}
              </Editable>
              <Editable
                id="about.quemsomos.intro"
                as="p"
                className="mx-auto mt-8 max-w-[52ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:text-lg"
              >
                {quemIntro}
              </Editable>
            </div>
          </Reveal>

          {/* Bloco Carol */}
          <Reveal delay={0.15}>
            <div className="mt-24 grid items-center gap-12 md:mt-32 md:grid-cols-12 md:gap-20">
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
                  className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
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
                <div className="mt-8 max-w-[46ch] space-y-5 text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  <Editable id="about.carol.p1" as="p">
                    {carolP1}
                  </Editable>
                  <Editable id="about.carol.p2" as="p">
                    {carolP2}
                  </Editable>
                  <Editable id="about.carol.p3" as="p">
                    {carolP3}
                  </Editable>
                  <Editable id="about.carol.p4" as="p">
                    {carolP4}
                  </Editable>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bloco Coletivo (sócias) */}
          <Reveal delay={0.15}>
            <div className="mt-24 grid items-center gap-12 md:mt-32 md:grid-cols-12 md:gap-20 md:[direction:rtl]">
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
                  className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
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
                <div className="mt-8 max-w-[44ch] space-y-5 text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  <Editable id="about.coletivo.p1" as="p">
                    {coletivoP1}
                  </Editable>
                  <Editable id="about.coletivo.p2" as="p">
                    {coletivoP2}
                  </Editable>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
