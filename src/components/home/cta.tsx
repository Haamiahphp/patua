import { Reveal } from "@/components/reveal";
import { WhatsappIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { CtaForm } from "./cta-form";

const WHATSAPP_NUMBER = "5521975397680";

export async function CtaSection() {
  const heading = await getContent(
    "home.cta.titulo",
    "Dê origem a uma peça em coautoria",
  );
  const descricao = await getContent(
    "home.cta.descricao",
    "Se você tem uma ideia, um espaço ou deseja uma peça autoral, entre em contato. Cada criação nasce através do diálogo, da matéria e do processo.",
  );
  const email = await getContent(
    "home.cta.email",
    "contato@patuaartesania.com.br",
  );
  const whatsapp = await getContent(
    "home.cta.whatsapp",
    "Whatsapp · (21) 97539-7680",
  );
  const endereco = await getContent(
    "home.cta.endereco",
    "Laranjeiras, Rio de Janeiro. Brasil",
  );
  const horario = await getContent(
    "home.cta.horario",
    "Seg a sex, 9h às 20h · Sáb, 9h às 13h",
  );
  const botao = await getContent(
    "home.cta.botao",
    "Fale com nosso atendimento personalizado",
  );

  return (
    <section className="relative bg-[var(--color-terracotta)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          {/* Esquerda */}
          <Reveal className="md:pr-16 md:border-r md:border-[var(--color-cream-light)]/35">
            <Editable
              id="home.cta.titulo"
              as="h2"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
            >
              {heading}
            </Editable>
            <Editable
              id="home.cta.descricao"
              as="p"
              className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-lg"
            >
              {descricao}
            </Editable>

            <div className="mt-12 space-y-4">
              <a
                href={`mailto:${email}`}
                className="block font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] tracking-[var(--tracking-tight)] transition-opacity hover:opacity-75"
              >
                <Editable id="home.cta.email" as="span">
                  {email}
                </Editable>
              </a>
              <div className="space-y-1.5 text-base text-[var(--color-cream-light)]/90 md:text-lg">
                <Editable id="home.cta.whatsapp" as="p">
                  {whatsapp}
                </Editable>
                <Editable id="home.cta.endereco" as="p">
                  {endereco}
                </Editable>
                <Editable
                  id="home.cta.horario"
                  as="p"
                  className="text-[var(--color-cream-light)]/75"
                >
                  {horario}
                </Editable>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-cream-light)] px-6 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-cream-light)] hover:text-[var(--color-bark)]"
            >
              <WhatsappIcon className="h-4 w-4" />
              <Editable id="home.cta.botao" as="span">
                {botao}
              </Editable>
            </a>
          </Reveal>

          {/* Direita: formulário */}
          <Reveal delay={0.15} className="md:pl-16">
            <CtaForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
