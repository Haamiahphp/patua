import { Reveal } from "@/components/reveal";
import { WhatsappIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const WHATSAPP_NUMBER = "5521975397680";
const IMAGE_FALLBACK = "/images/faleconosco.jpg";

export async function CtaSection() {
  const heading = await getContent(
    "home.faleconosco.titulo",
    "Nossa história continua todos os dias.",
  );
  const descricao = await getContent(
    "home.faleconosco.descricao",
    "Entre desenhos, conversas, tramados e novas peças, estamos sempre em movimento. Acompanhe os bastidores, lançamentos e histórias que fazem parte da Patuá.",
  );
  const botao = await getContent(
    "home.faleconosco.botao",
    "Fale com nosso atendimento",
  );
  const imagem = await getContent("home.faleconosco.imagem", {
    url: IMAGE_FALLBACK,
    alt: "Carol Risi observando um painel tramado da Patuá",
  });

  return (
    <section
      id="fale-conosco"
      className="relative bg-[var(--color-cream-light)] py-20 text-[var(--color-bark)] md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[var(--container-page)] items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-10">
        {/* Texto */}
        <Reveal>
          <Editable
            id="home.faleconosco.titulo"
            as="h2"
            className="font-display max-w-[16ch] text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
          >
            {heading}
          </Editable>
          <Editable
            id="home.faleconosco.descricao"
            as="p"
            className="mt-6 max-w-[46ch] text-base leading-[var(--leading-body)] text-[var(--color-stone)] md:text-lg"
          >
            {descricao}
          </Editable>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-terracotta-deep)]"
          >
            <WhatsappIcon className="h-4 w-4" />
            <Editable id="home.faleconosco.botao" as="span">
              {botao}
            </Editable>
          </a>
        </Reveal>

        {/* Foto */}
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/5]">
            <EditableImage
              id="home.faleconosco.imagem"
              src={imagem.url}
              alt={imagem.alt ?? "Carol Risi e um painel tramado da Patuá"}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
