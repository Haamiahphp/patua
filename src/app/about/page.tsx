import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

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

export default function AboutPage() {
  return (
    <>
      {/* HERO — imagem full-bleed com headline centralizada */}
      <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-[var(--color-bark)] text-[var(--color-cream-light)]">
        <Image
          src="/images/about/about-fazer-manual.jpg"
          alt="Mãos tecendo trama colorida no ateliê Patuá"
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
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/80">
              Sobre a Patuá
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-[24ch] text-[clamp(1.875rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)]">
              Criamos peças que unem forma, função e permanência.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO — tarja olive/stone, texto editorial centralizado */}
      <section className="bg-[var(--color-stone)] text-[var(--color-cream-light)]">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70">
              Nosso Manifesto
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)]">
              Redefinir o valor do feito à mão.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 max-w-[60ch] space-y-6 text-base leading-[1.6] text-[var(--color-cream-light)]/90 md:text-lg">
              <p>
                Uma coisa em nós é ancestral e profundamente presente:
                precisamos fazer. Fazer com as mãos, com o tempo, com atenção.
                O mais atento dos olhares reconhece quando algo foi construído
                de verdade.
              </p>
              <p>
                Tudo guarda um gesto. Tudo é trama, estrutura, decisão,
                matéria que fala. Do seu lugar, o fio, a fibra, o entrelaço
                seguirão dizendo de onde vieram e para onde vão.
              </p>
              <p>
                A peça, só de existir, já está falando. Não se faz design
                apenas com forma — faz-se com processo, com cultura, com
                autoria. E com brasilidade.
              </p>
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
              <h2 className="font-display max-w-[14ch] text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                O que atravessa cada peça
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:pt-4 md:text-right">
              <p className="max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:ml-auto md:text-lg">
                Na Patuá, não criamos apenas móveis. Criamos relações entre
                matéria, tempo e presença.
              </p>
            </Reveal>
          </div>

          <hr className="mt-10 border-t border-[var(--color-bark)]/15 md:mt-14" />

          {/* Linha 1: 3 cards à direita (col 2-4 em grid de 4) */}
          <div className="mt-12 grid grid-cols-2 gap-5 md:mt-20 md:grid-cols-4 md:gap-6">
            <div className="hidden md:col-span-1 md:block" aria-hidden />
            {PILLARS.slice(0, 3).map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} />
            ))}
          </div>

          {/* Linha 2: 2 cards à direita (col 3-4 em grid de 4) */}
          <div className="mt-5 grid grid-cols-2 gap-5 md:mt-6 md:grid-cols-4 md:gap-6">
            <div className="hidden md:col-span-2 md:block" aria-hidden />
            {PILLARS.slice(3).map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="bg-[var(--color-cream-light)] py-28 md:py-36">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <div className="mx-auto max-w-[var(--container-prose)] text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60">
                Quem somos
              </span>
              <h2 className="font-display mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                Quem está por trás das peças.
              </h2>
              <p className="mx-auto mt-8 max-w-[52ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/75 md:text-lg">
                Antes de qualquer forma, existe gente. Histórias, mãos,
                escolhas e encontros que dão origem a cada peça.
              </p>
            </div>
          </Reveal>

          {/* Bloco Carol */}
          <Reveal delay={0.15}>
            <div className="mt-28 grid items-center gap-12 md:mt-36 md:grid-cols-12 md:gap-20">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                  <Image
                    src="/images/about/carol-1.png"
                    alt="Carol Risi — direção criativa"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
                  Direção criativa
                </span>
                <h3 className="font-display mt-4 text-[clamp(2.5rem,4vw,4rem)] leading-[1] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  Carol Risi.
                </h3>
                <p className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  À frente da criação, está Carol Risi. Seu olhar traduz espaços,
                  gestos e intenções em desenho. Cada peça nasce de um processo
                  sensível de observação, escuta e construção conjunta.
                </p>
                <p className="mt-5 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  Mais do que desenhar móveis, Carol Risi desenha relações entre
                  matéria e vida.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bloco Coletivo */}
          <Reveal delay={0.15}>
            <div className="mt-28 grid items-center gap-12 md:mt-36 md:grid-cols-12 md:gap-20 md:[direction:rtl]">
              <div className="md:col-span-7 md:[direction:ltr]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream)]">
                  <Image
                    src="/images/about/nos-4.png"
                    alt="As mulheres da Patuá"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover object-[center_30%]"
                  />
                </div>
              </div>
              <div className="md:col-span-5 md:[direction:ltr]">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
                  Coletivo
                </span>
                <h3 className="font-display mt-4 text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
                  A Patuá é feita por mulheres.
                </h3>
                <p className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  Cada uma traz um olhar, um ritmo, uma forma de fazer. Entre
                  criação, produção e construção do negócio, a marca se sustenta
                  na soma dessas presenças.
                </p>
                <p className="mt-5 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-bark)]/80 md:text-lg">
                  Não é uma linha de produção. É um processo vivo.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTÓRIA — bloco olive/stone, editorial */}
      <section className="bg-[var(--color-stone)] text-[var(--color-cream-light)]">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 py-28 text-center md:px-10 md:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-cream-light)]/70">
              História
            </span>
            <h2 className="font-display mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.05] tracking-[var(--tracking-tight)]">
              Nada aqui é apressado.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-[58ch] space-y-6 text-base leading-[1.6] text-[var(--color-cream-light)]/90 md:text-lg">
              <p>
                A Patuá nasce do encontro entre fazer manual, design e desejo
                de criar algo com permanência.
              </p>
              <p>
                Ao longo do tempo, o que começou como experimentação foi
                ganhando forma — e também responsabilidade.
              </p>
              <p>
                Hoje, cada peça carrega esse percurso: de tentativa,
                aprendizado e construção contínua.
              </p>
              <p className="italic">E talvez seja isso que faz cada coisa durar.</p>
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
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group relative aspect-[335/490] overflow-hidden bg-[var(--color-cream-light)]">
        {/* Imagem (estado default) */}
        <Image
          src={pillar.image}
          alt={pillar.title}
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
            <h3 className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.1]">
              {pillar.title}
            </h3>
            <p className="mt-5 max-w-[28ch] whitespace-pre-line text-sm leading-[1.5] text-[var(--color-cream-light)]/85 md:text-base">
              {pillar.body}
            </p>
          </div>
        </div>

        {/* Default state: título visível sobre imagem */}
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-6 text-center transition-opacity duration-500 group-hover:opacity-0">
          <h3 className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] text-[var(--color-cream-light)]">
            {pillar.title}
          </h3>
        </div>
      </div>
    </Reveal>
  );
}
