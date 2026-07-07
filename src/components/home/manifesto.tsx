import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const IMAGE_FALLBACK = "/images/manifesto.jpg";

const PARAGRAFOS = [
  {
    key: "home.manifesto.p1",
    text: "Vivemos cercados de coisas feitas para durar pouco, mas escolhemos outro caminho.",
  },
  {
    key: "home.manifesto.p2",
    text: "Acreditamos no tempo como matéria-prima, na conversa antes do desenho, no cuidado e na atenção a cada detalhe.",
  },
  {
    key: "home.manifesto.p3",
    text: "Cada peça nasce do encontro entre pessoas, matérias, espaços, histórias e personalidades.",
  },
  {
    key: "home.manifesto.p4",
    text: "Criamos em coautoria, valorizamos a brasilidade e desenvolvemos peças para permanecer, acompanhar histórias e atravessar gerações.",
  },
];

export async function Manifesto() {
  const eyebrow = await getContent("home.manifesto.eyebrow", "Manifesto Patuá");
  const assinatura = await getContent(
    "home.manifesto.assinatura",
    "Patuá e você.",
  );
  const assinaturaSub = await getContent(
    "home.manifesto.assinatura_sub",
    "Porque acreditamos que as histórias mais bonitas são construídas juntas.",
  );
  const imagem = await getContent("home.manifesto.imagem", {
    url: IMAGE_FALLBACK,
    alt: "Peça Patuá — poltrona de tramado autoral",
  });
  const paragrafos = await Promise.all(
    PARAGRAFOS.map(async (p) => ({
      key: p.key,
      text: await getContent(p.key, p.text),
    })),
  );

  return (
    <section className="relative overflow-hidden bg-[#241811] text-[var(--color-cream-light)]">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] items-center gap-12 px-4 py-24 md:grid-cols-12 md:gap-16 md:px-10 md:py-36">
        {/* Texto */}
        <div className="md:col-span-6 lg:col-span-6">
          <Reveal>
            <Editable
              id="home.manifesto.eyebrow"
              as="p"
              className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-amber)]"
            >
              {eyebrow}
            </Editable>
          </Reveal>

          <div className="mt-10 space-y-6">
            {paragrafos.map((p, i) => (
              <Reveal key={p.key} delay={0.1 + i * 0.08}>
                <Editable
                  id={p.key}
                  as="p"
                  className="max-w-[46ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-xl"
                >
                  {p.text}
                </Editable>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-12">
            <span
              aria-hidden
              className="block h-px w-14 bg-[var(--color-amber)]/70"
            />
            <Editable
              id="home.manifesto.assinatura"
              as="p"
              className="font-display mt-8 text-[clamp(2rem,4vw,3rem)] italic leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-amber)]"
            >
              {assinatura}
            </Editable>
            <Editable
              id="home.manifesto.assinatura_sub"
              as="p"
              className="mt-4 max-w-[40ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/80 md:text-lg"
            >
              {assinaturaSub}
            </Editable>
          </Reveal>
        </div>

        {/* Peça */}
        <div className="md:col-span-6 lg:col-span-6">
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] md:aspect-[5/6]">
              <EditableImage
                id="home.manifesto.imagem"
                src={imagem.url}
                alt={imagem.alt ?? "Peça Patuá"}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
