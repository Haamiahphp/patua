import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WhatsappIcon } from "@/components/icons";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Para profissionais · Patuá Ateliê",
  description:
    "Patuá para arquitetos e designers de interiores. Mobiliário autoral brasileiro, feito à mão, com personalização a partir do projeto e acompanhamento em cada etapa.",
};

const WHATSAPP = "https://wa.me/5521975397680";
const CASOCA = "https://casoca.com.br/patua-artesania-brasileira.html";
// TODO: quando o catálogo em PDF estiver pronto, colocar o arquivo em
// public/catalogo-patua.pdf e trocar CATALOGO_PRONTO para true.
const CATALOGO_PRONTO = false;
const CATALOGO_PDF = "/catalogo-patua.pdf";

export default async function ProfessionalsPage() {
  // HERO
  const heroEyebrow = await getContent(
    "professionals.hero.eyebrow",
    "Para profissionais",
  );
  const heroTitulo = await getContent(
    "professionals.hero.titulo",
    "Patuá para arquitetos e designers",
  );
  const heroIntro = await getContent(
    "professionals.hero.intro",
    "Trabalhamos ao lado de arquitetos e designers de interiores que buscam mobiliário autoral brasileiro, produzido artesanalmente e desenvolvido com atenção aos detalhes.",
  );
  const heroImagem = await getContent("professionals.hero.imagem", {
    url: "/images/professionals/professionals-hero.jpg",
    alt: "Cadeiras Patuá de tramado colorido em uma cozinha integrada",
  });

  // PARCERIA
  const parceriaTitulo = await getContent(
    "professionals.parceria.titulo",
    "Uma parceria construída em diálogo",
  );
  const parceriaP1 = await getContent(
    "professionals.parceria.corpo1",
    "Criamos as peças acompanhando o desenvolvimento do projeto do espaço, para encontrar a combinação mais adequada entre cores, tramados, materiais, proporções e acabamentos, respeitando a linguagem concebida pelo profissional.",
  );
  const parceriaP2 = await getContent(
    "professionals.parceria.corpo2",
    "Também desenvolvemos personalizações para atender às necessidades específicas de cada ambiente.",
  );
  const parceriaImg1 = await getContent("professionals.parceria.imagem1", {
    url: "/images/professionals/parceria-1.jpg",
    alt: "Cabeceira Patuá em tramado natural, quarto de parede terracota",
  });
  const parceriaImg2 = await getContent("professionals.parceria.imagem2", {
    url: "/images/professionals/parceria-2.jpg",
    alt: "Detalhe de cabeceira e criado-mudo com peças Patuá",
  });
  const parceriaImg3 = await getContent("professionals.parceria.imagem3", {
    url: "/images/professionals/parceria-3.jpg",
    alt: "Painel de tramado autoral Patuá integrado à parede",
  });

  // PERSONALIZAÇÃO
  const persoTitulo = await getContent(
    "professionals.personalizacao.titulo",
    "Personalização que nasce do projeto",
  );
  const persoIntro = await getContent(
    "professionals.personalizacao.intro",
    "As peças da Patuá permitem diferentes combinações de:",
  );
  const persoItem1 = await getContent(
    "professionals.personalizacao.item1",
    "Cores da estrutura",
  );
  const persoItem2 = await getContent(
    "professionals.personalizacao.item2",
    "Desenhos (padrão gráfico) e cores dos tramados",
  );
  const persoItem3 = await getContent(
    "professionals.personalizacao.item3",
    "Dimensões das peças",
  );
  const persoItem4 = await getContent(
    "professionals.personalizacao.item4",
    "Acabamentos",
  );
  const persoCorpo = await getContent(
    "professionals.personalizacao.corpo",
    "Em projetos especiais, também desenvolvemos novos desenhos de tramados e adaptações de medidas, preservando a identidade da coleção e a coerência do ambiente.",
  );

  // DESIGN PENSADO PARA PERMANECER
  const designTitulo = await getContent(
    "professionals.design.titulo",
    "Design pensado para permanecer",
  );
  const designP1 = await getContent(
    "professionals.design.corpo1",
    "Cada peça é produzida manualmente, utilizando materiais selecionados e processos que valorizam a durabilidade, a qualidade construtiva e a precisão dos acabamentos.",
  );
  const designP2 = await getContent(
    "professionals.design.corpo2",
    "São móveis concebidos para acompanhar o tempo, mantendo beleza, conforto e desempenho em diferentes contextos de uso.",
  );
  const designImagem = await getContent("professionals.design.imagem", {
    url: "/images/professionals/design.jpg",
    alt: "Coleção de peças autorais Patuá em tramado colorido",
  });

  // RESTAURO
  const restauroTitulo = await getContent(
    "professionals.restauro.titulo",
    "Um único parceiro para diferentes necessidades",
  );
  const restauroP1 = await getContent(
    "professionals.restauro.corpo1",
    "Além da coleção autoral, a Patuá também realiza serviços de restauro de mobiliário, recuperando peças que fazem parte da história de um ambiente ou de um cliente.",
  );
  const restauroP2 = await getContent(
    "professionals.restauro.corpo2",
    "É uma forma de ampliar as possibilidades do projeto, conciliando novas criações com o cuidado por objetos que merecem continuar fazendo parte da vida das pessoas.",
  );

  // CATÁLOGO — só o título + PDF clicável (sem texto de apoio, a pedido da cliente).
  // Será um catálogo único reunindo todas as coleções.
  const catalogoTitulo = await getContent(
    "professionals.catalogo.titulo",
    "Catálogo de peças",
  );

  // CTA FINAL
  const ctaTitulo = await getContent(
    "professionals.cta.titulo",
    "Vamos construir juntos?",
  );
  const ctaP1 = await getContent(
    "professionals.cta.corpo1",
    "Se você é arquiteto ou designer de interiores, queremos conhecer seus projetos. Nossa equipe está disponível para apresentar a coleção, orientar especificações, desenvolver personalizações e acompanhar cada etapa da produção.",
  );
  const ctaP2 = await getContent(
    "professionals.cta.corpo2",
    "Entre em contato e descubra como a Patuá pode fazer parte dos seus próximos projetos.",
  );

  const persoItens = [persoItem1, persoItem2, persoItem3, persoItem4];

  return (
    <>
      {/* HERO — texto separado, foto grande abaixo (referência Knoll) */}
      <section className="bg-[var(--color-cream)] pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <Editable
              id="professionals.hero.eyebrow"
              as="span"
              className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]"
            >
              {heroEyebrow}
            </Editable>
            <Editable
              id="professionals.hero.titulo"
              as="h1"
              className="font-display mt-6 max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
            >
              {heroTitulo}
            </Editable>
            <Editable
              id="professionals.hero.intro"
              as="p"
              className="mt-8 max-w-[54ch] text-lg leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:text-xl"
            >
              {heroIntro}
            </Editable>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bark)] md:aspect-[16/9]">
              <EditableImage
                id="professionals.hero.imagem"
                src={heroImagem.url}
                alt={heroImagem.alt ?? "Ambiente com peça autoral da Patuá"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover object-[center_55%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARCERIA — texto + trio de fotos */}
      <section className="bg-[var(--color-cream-light)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Editable
                  id="professionals.parceria.titulo"
                  as="h2"
                  className="font-display max-w-[14ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {parceriaTitulo}
                </Editable>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <Reveal delay={0.12}>
                <div className="max-w-[58ch] space-y-6 text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg">
                  <Editable id="professionals.parceria.corpo1" as="p">
                    {parceriaP1}
                  </Editable>
                  <Editable id="professionals.parceria.corpo2" as="p">
                    {parceriaP2}
                  </Editable>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-20 md:gap-4">
              {[
                { id: "professionals.parceria.imagem1", img: parceriaImg1 },
                { id: "professionals.parceria.imagem2", img: parceriaImg2 },
                { id: "professionals.parceria.imagem3", img: parceriaImg3 },
              ].map(({ id, img }) => (
                <div
                  key={id}
                  className="relative aspect-[3/4] overflow-hidden bg-[var(--color-cream)]"
                >
                  <EditableImage
                    id={id}
                    src={img.url}
                    alt={img.alt ?? "Projeto com peça Patuá"}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PERSONALIZAÇÃO — texto + lista (sem foto) */}
      <section className="bg-[var(--color-cream)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
                  Personalização
                </span>
                <Editable
                  id="professionals.personalizacao.titulo"
                  as="h2"
                  className="font-display mt-5 max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {persoTitulo}
                </Editable>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <Reveal delay={0.12}>
                <Editable
                  id="professionals.personalizacao.intro"
                  as="p"
                  className="text-lg leading-[1.6] text-[var(--color-bark)] md:text-xl"
                >
                  {persoIntro}
                </Editable>
                <ul className="mt-8 divide-y divide-[color:var(--color-bark)]/12 border-y border-[color:var(--color-bark)]/12">
                  {persoItens.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-4 py-4 text-base text-[var(--color-bark)]/85 md:text-lg"
                    >
                      <span className="font-mono text-sm text-[var(--color-terracotta)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Editable
                        id={`professionals.personalizacao.item${i + 1}`}
                        as="span"
                      >
                        {item}
                      </Editable>
                    </li>
                  ))}
                </ul>
                <Editable
                  id="professionals.personalizacao.corpo"
                  as="p"
                  className="mt-8 max-w-[58ch] text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {persoCorpo}
                </Editable>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PENSADO PARA PERMANECER — split imagem + texto (fundo escuro) */}
      <section className="bg-[var(--color-stone)] py-24 text-[var(--color-cream-light)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bark)]">
                  <EditableImage
                    id="professionals.design.imagem"
                    src={designImagem.url}
                    alt={designImagem.alt ?? "Peça autoral da Patuá em detalhe"}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <Reveal delay={0.12}>
                <Editable
                  id="professionals.design.titulo"
                  as="h2"
                  className="font-display max-w-[14ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
                >
                  {designTitulo}
                </Editable>
                <div className="mt-8 max-w-[50ch] space-y-6 text-base leading-[1.7] text-[var(--color-cream-light)]/85 md:text-lg">
                  <Editable id="professionals.design.corpo1" as="p">
                    {designP1}
                  </Editable>
                  <Editable id="professionals.design.corpo2" as="p">
                    {designP2}
                  </Editable>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURO — texto (sem foto) */}
      <section className="bg-[var(--color-cream-light)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 text-center md:px-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
              Coleção + restauro
            </span>
            <Editable
              id="professionals.restauro.titulo"
              as="h2"
              className="font-display mt-6 text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
            >
              {restauroTitulo}
            </Editable>
            <div className="mx-auto mt-8 max-w-[62ch] space-y-6 text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg">
              <Editable id="professionals.restauro.corpo1" as="p">
                {restauroP1}
              </Editable>
              <Editable id="professionals.restauro.corpo2" as="p">
                {restauroP2}
              </Editable>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATÁLOGO — só título + PDF clicável pra baixar (a cliente pediu sem texto
          de apoio). Fica "Disponível em breve" até o PDF único (todas as coleções)
          ser enviado: colocar em public/catalogo-patua.pdf e ligar CATALOGO_PRONTO. */}
      <section className="bg-[var(--color-cream)] pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="flex flex-col items-start gap-8 border-t border-[color:var(--color-bark)]/15 pt-12 md:flex-row md:items-center md:justify-between md:pt-16">
              <div className="max-w-[46ch]">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
                  <FileText className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                  Catálogo
                </span>
                <Editable
                  id="professionals.catalogo.titulo"
                  as="h2"
                  className="font-display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {catalogoTitulo}
                </Editable>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3">
                {CATALOGO_PRONTO ? (
                  <>
                    <a
                      href={CATALOGO_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta-deep)]"
                    >
                      <FileText className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                      Ver catálogo
                    </a>
                    <a
                      href={CATALOGO_PDF}
                      download
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-bark)] transition-opacity hover:opacity-70"
                    >
                      <Download className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                      Baixar PDF
                    </a>
                  </>
                ) : (
                  <>
                    <span
                      aria-disabled
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--color-bark)]/25 px-7 py-3.5 text-sm font-medium text-[var(--color-bark)]/45"
                    >
                      <FileText className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                      Ver catálogo
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-bark)]/45">
                      Disponível em breve
                    </span>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL — Vamos construir juntos? */}
      <section className="bg-[var(--color-terracotta)] py-24 text-[var(--color-cream-light)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 text-center md:px-10">
          <Reveal>
            <Editable
              id="professionals.cta.titulo"
              as="h2"
              className="font-display text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[var(--tracking-tight)]"
            >
              {ctaTitulo}
            </Editable>
            <div className="mx-auto mt-8 max-w-[56ch] space-y-5 text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-lg">
              <Editable id="professionals.cta.corpo1" as="p">
                {ctaP1}
              </Editable>
              <Editable id="professionals.cta.corpo2" as="p">
                {ctaP2}
              </Editable>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-8 py-4 text-sm font-medium text-[var(--color-bark)] transition-opacity hover:opacity-90"
              >
                <WhatsappIcon className="h-4 w-4" />
                Fale com a Patuá
              </a>
              <a
                href={CASOCA}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-cream-light)]"
              >
                <span className="border-b border-[color:var(--color-cream-light)]/40 pb-1 transition-colors group-hover:border-[var(--color-cream-light)]">
                  Ver a Patuá no Casoca
                </span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
