import { MessageCircle, PenLine, Layers, Hand, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

type Step = {
  n: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    Icon: MessageCircle,
    title: "Escuta",
    body: "Tudo começa com uma conversa com você para entender as suas preferências e necessidades.",
    image: "/images/processo/etapa-1.jpg",
    alt: "Conversa e escuta no início do processo",
  },
  {
    n: "02",
    Icon: PenLine,
    title: "Coautoria",
    body: "Desenhamos as possibilidades e apresentamos a você, de acordo com seus gostos e desejos.",
    image: "/images/processo/etapa-2.jpg",
    alt: "Desenho das possibilidades da peça",
  },
  {
    n: "03",
    Icon: Layers,
    title: "Escolha de materiais",
    body: "Escolhemos materiais, cores e tramados que traduzem identidade e dialogam com o ambiente.",
    image: "/images/processo/etapa-3.jpg",
    alt: "Fios e materiais para o tramado",
  },
  {
    n: "04",
    Icon: Hand,
    title: "Feito à mão",
    body: "Cada peça é tramada cuidadosamente, com técnica e atenção a cada detalhe.",
    image: "/images/processo/etapa-4.jpg",
    alt: "Tramado feito à mão, fio a fio",
  },
  {
    n: "05",
    Icon: Heart,
    title: "A peça chega até você",
    body: "E começa a fazer parte das histórias do seu lar.",
    image: "/images/processo/etapa-5.jpg",
    alt: "A peça no ambiente, fazendo parte da casa",
  },
];

export async function ProcessSection() {
  const titulo = await getContent("home.process.titulo", "Processo Criativo");
  const subtitulo = await getContent(
    "home.process.subtitulo",
    "Da conversa ao espaço.",
  );
  const descricao = await getContent(
    "home.process.descricao",
    "Como nasce uma peça Patuá em coautoria com você.",
  );
  const rodape = await getContent(
    "home.process.rodape",
    "Cada escolha, cada trama e cada detalhe são feitos para criar peças únicas, que traduzem histórias e transformam espaços.",
  );
  const steps = await Promise.all(
    STEPS.map(async (s) => {
      const base = `home.process.etapa${s.n}`;
      return {
        ...s,
        base,
        title: await getContent(`${base}.titulo`, s.title),
        body: await getContent(`${base}.corpo`, s.body),
        image: await getContent(`${base}.imagem`, { url: s.image, alt: s.alt }),
      };
    }),
  );

  return (
    <section className="relative bg-[var(--color-terracotta-deep)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        {/* Cabeçalho */}
        <div className="text-center">
          <Reveal>
            <Editable
              id="home.process.titulo"
              as="h2"
              className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[var(--leading-display)] tracking-[var(--tracking-tight)]"
            >
              {titulo}
            </Editable>
            <Editable
              id="home.process.subtitulo"
              as="p"
              className="mt-5 text-lg text-[var(--color-cream-light)]/90 md:text-xl"
            >
              {subtitulo}
            </Editable>
            <Editable
              id="home.process.descricao"
              as="p"
              className="mt-1 text-base text-[var(--color-cream-light)]/75 md:text-lg"
            >
              {descricao}
            </Editable>
          </Reveal>
        </div>

        {/* Passos */}
        <ol className="mt-16 grid gap-y-14 md:mt-20 md:grid-cols-5 md:gap-x-6 lg:gap-x-8">
          {steps.map((s, i) => (
            <Reveal key={s.base} delay={i * 0.08}>
              <li className="flex h-full flex-col">
                {/* Número */}
                <span className="font-display text-3xl leading-none text-[var(--color-amber)] md:text-4xl">
                  {s.n}
                </span>

                {/* Foto */}
                <div className="relative mt-6 aspect-square overflow-hidden rounded-[2px]">
                  <EditableImage
                    id={`${s.base}.imagem`}
                    src={s.image.url}
                    alt={s.image.alt ?? s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 18vw"
                    className="object-cover"
                  />
                </div>

                {/* Texto */}
                <Editable
                  id={`${s.base}.titulo`}
                  as="h3"
                  className="mt-6 text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--color-cream-light)]"
                >
                  {s.title}
                </Editable>
                <Editable
                  id={`${s.base}.corpo`}
                  as="p"
                  className="mt-3 text-sm leading-[var(--leading-body)] text-[var(--color-cream-light)]/75"
                >
                  {s.body}
                </Editable>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Rodapé */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 flex max-w-[60ch] flex-col items-center text-center md:mt-20">
            <span
              aria-hidden
              className="mb-6 block h-px w-16 bg-[var(--color-amber)]/60"
            />
            <Editable
              id="home.process.rodape"
              as="p"
              className="text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-lg"
            >
              {rodape}
            </Editable>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
