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
    <section className="relative w-full overflow-hidden bg-[#241811] text-[var(--color-cream-light)]">
      {/* Imagem cobrindo toda a seção */}
      <div className="absolute inset-0">
        <EditableImage
          id="home.manifesto.imagem"
          src={imagem.url}
          alt={imagem.alt ?? "Peça Patuá"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Degradê escuro sobre a imagem: 100% na esquerda → 0% na direita */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,#1c130c_0%,rgba(28,19,12,0.92)_52%,rgba(28,19,12,0.45)_100%)] md:bg-[linear-gradient(to_right,#1c130c_0%,#1c130c_42%,transparent_90%)]"
        />
      </div>

      {/* Texto sobreposto */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[var(--container-page)] items-center px-4 py-24 md:px-10 md:py-32">
        <div className="max-w-[38rem]">
          <Reveal>
            <Editable
              id="home.manifesto.eyebrow"
              as="p"
              className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-amber)]"
            >
              {eyebrow}
            </Editable>
          </Reveal>

          <div className="mt-9 space-y-5">
            {paragrafos.map((p, i) => (
              <Reveal key={p.key} delay={0.1 + i * 0.08}>
                <Editable
                  id={p.key}
                  as="p"
                  className="max-w-[44ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/95 md:text-xl"
                >
                  {p.text}
                </Editable>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-11">
            <span
              aria-hidden
              className="block h-px w-14 bg-[var(--color-amber)]/70"
            />
            <Editable
              id="home.manifesto.assinatura"
              as="p"
              className="mt-7 font-[family-name:var(--font-script)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-[var(--color-amber)]"
            >
              {assinatura}
            </Editable>
            <Editable
              id="home.manifesto.assinatura_sub"
              as="p"
              className="mt-4 max-w-[40ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-lg"
            >
              {assinaturaSub}
            </Editable>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
