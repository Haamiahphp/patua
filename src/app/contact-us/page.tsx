import type { Metadata } from "next";
import { ServicesHero } from "@/components/services-hero";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { WhatsappIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Entre em contato · Patuá Ateliê",
  description:
    "Se você tem uma ideia, um espaço ou deseja uma peça autoral, entre em contato. Cada criação nasce através do diálogo, da matéria e do processo.",
};

export default function ContactPage() {
  return (
    <>
      <ServicesHero
        image="/images/about/about-atelie.png"
        imageAlt="Ateliê Patuá — cadeira tramada em destaque no interior"
        title="Entre em contato"
        size="compact"
      />

      {/* Seção terracotta — copy + formulário */}
      <section className="bg-[var(--color-terracotta)] py-24 text-[var(--color-cream-light)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="flex flex-col gap-14 md:flex-row md:items-stretch md:gap-0">
            {/* Coluna esquerda — copy + contato */}
            <Reveal className="md:flex-1 md:pr-16 lg:pr-24">
              <h2 className="font-display max-w-[14ch] text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)]">
                Dê origem a uma peça em coautoria
              </h2>
              <p className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-lg">
                Se você tem uma ideia, um espaço ou deseja uma peça autoral,
                entre em contato. Cada criação nasce através do diálogo, da
                matéria e do processo.
              </p>

              <div className="mt-14 space-y-5">
                <a
                  href="mailto:contato@patuaartesania.com.br"
                  className="block font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.1] tracking-[var(--tracking-tight)] transition-opacity hover:opacity-75"
                >
                  contato@patuaartesania.com.br
                </a>
                <div className="space-y-1 text-base md:text-lg">
                  <p>Whatsapp · (21) 97539-7680</p>
                  <p>Laranjeiras, Rio de Janeiro · Brasil</p>
                </div>
                <p className="text-sm text-[var(--color-cream-light)]/75 md:text-base">
                  Atendimento de segunda a sexta-feira, das 9h às 20h,
                  <br className="hidden sm:block" /> e aos sábados, das 9h às 13h.
                </p>
                <a
                  href="https://wa.me/5521975397680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-cream-light)] px-6 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-cream-light)] hover:text-[var(--color-bark)]"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Fale com nosso atendimento personalizado
                </a>
              </div>
            </Reveal>

            {/* Divisor vertical (desktop) */}
            <div
              aria-hidden
              className="hidden w-px self-stretch bg-[var(--color-cream-light)]/30 md:block"
            />

            {/* Coluna direita — formulário */}
            <Reveal className="md:flex-1 md:pl-16 lg:pl-24" delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
