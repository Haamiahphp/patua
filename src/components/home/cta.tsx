import { MapPin, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { CtaForm } from "./cta-form";

const WHATSAPP_NUMBER = "5521975397680";

export async function CtaSection() {
  const heading = await getContent(
    "home.faleconosco.titulo",
    "Nossa história continua todos os dias.",
  );
  const descricao = await getContent(
    "home.faleconosco.descricao",
    "Entre desenhos, conversas, tramados e novas peças, estamos sempre em movimento. Acompanhe os bastidores, lançamentos e histórias que fazem parte da Patuá.",
  );
  const email = await getContent(
    "home.faleconosco.email",
    "contato@patuaartesania.com.br",
  );
  const telefone = await getContent("home.faleconosco.telefone", "(21) 97539-7680");
  const endereco = await getContent(
    "home.faleconosco.endereco",
    "Rio de Janeiro-RJ · Brasil",
  );
  const botao = await getContent(
    "home.faleconosco.botao",
    "Fale com nosso atendimento",
  );

  return (
    <section
      id="fale-conosco"
      className="relative bg-[var(--color-cream-light)] py-24 text-[var(--color-bark)] md:py-32"
    >
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          {/* Esquerda */}
          <Reveal className="md:border-r md:border-[var(--color-bark)]/15 md:pr-16">
            <span className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]">
              Fale Conosco
            </span>
            <Editable
              id="home.faleconosco.titulo"
              as="h2"
              className="font-display mt-6 max-w-[16ch] text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)]"
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

            <div className="mt-10 space-y-3 text-[var(--color-bark)]">
              <p className="flex items-center gap-3">
                <MapPin
                  className="h-4 w-4 text-[var(--color-terracotta)]"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <Editable id="home.faleconosco.endereco" as="span">
                  {endereco}
                </Editable>
              </p>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-70"
              >
                <Mail
                  className="h-4 w-4 text-[var(--color-terracotta)]"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <Editable id="home.faleconosco.email" as="span">
                  {email}
                </Editable>
              </a>
              <p className="flex items-center gap-3">
                <Phone
                  className="h-4 w-4 text-[var(--color-terracotta)]"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <Editable id="home.faleconosco.telefone" as="span">
                  {telefone}
                </Editable>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-6 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-terracotta-deep)]"
              >
                <WhatsappIcon className="h-4 w-4" />
                <Editable id="home.faleconosco.botao" as="span">
                  {botao}
                </Editable>
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/patua.atelie"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Patuá"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-bark)]/20 transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/patuaartesania"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Patuá"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-bark)]/20 transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
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
