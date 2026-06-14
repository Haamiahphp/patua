import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const WORDMARK_FALLBACK = "/images/g48RVMC75t4soXPzIMLxkJiktPs.png"; // 587×288 cream empilhado
const TEXT_FALLBACK =
  "Encante-se com peças que unem brasilidade, design autoral e contemporaneidade, fio a fio.";

export async function Manifesto() {
  const wordmark = await getContent("home.manifesto.wordmark", {
    url: WORDMARK_FALLBACK,
    alt: "Patuá — Artesania Brasileira",
  });
  const text = await getContent("home.manifesto.texto", TEXT_FALLBACK);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-terracotta)] py-[var(--space-section-md)] text-[var(--color-cream-light)] md:py-[var(--space-section-lg)]">
      <div className="mx-auto flex w-full max-w-[var(--container-prose)] flex-col items-center px-4 text-center md:px-10">
        <Reveal>
          <EditableImage
            id="home.manifesto.wordmark"
            src={wordmark.url}
            alt={wordmark.alt ?? "Patuá — Artesania Brasileira"}
            width={587}
            height={288}
            priority
            className="h-auto w-[clamp(320px,52vw,720px)]"
          />
        </Reveal>

        <Reveal delay={0.3} className="mt-20 md:mt-28">
          <Editable
            id="home.manifesto.texto"
            as="p"
            className="mx-auto max-w-[44ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-xl"
          >
            {text}
          </Editable>
        </Reveal>
      </div>
    </section>
  );
}
