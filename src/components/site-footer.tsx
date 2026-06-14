import Image from "next/image";
import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/icons";

const WHATSAPP = "https://wa.me/5521975397680";
const INSTAGRAM = "https://www.instagram.com/patua.atelie";
const FACEBOOK = "https://www.facebook.com/patua.atelie";
const EMAIL = "contato@patuaartesania.com.br";
// TODO: substituir pelo link real da página da Patuá no Casoca (cliente vai enviar)
const CASOCA = "https://www.casoca.com.br";
const LOGO_HORIZONTAL = "/images/8ROIB5K6sLAAD3NNobziImOXXyQ.png";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[var(--color-mustard)] text-[var(--color-olive)]">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 py-20 md:px-10 md:py-28">
        {/* Logo monumental */}
        <div className="flex justify-center">
          <Image
            src={LOGO_HORIZONTAL}
            alt="Patuá — Artesania Brasileira"
            width={802}
            height={206}
            priority={false}
            className="h-auto w-[clamp(320px,55vw,720px)]"
          />
        </div>

        {/* Divisor */}
        <hr className="mt-16 border-t border-[var(--color-olive)]/30 md:mt-24" />

        {/* Acompanhe a Patuá */}
        <div className="grid gap-12 py-14 md:grid-cols-12 md:gap-10 md:py-20">
          {/* Título */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[var(--tracking-tight)] text-[var(--color-olive)]">
              Acompanhe
              <br />a Patuá
            </h2>
          </div>

          {/* Contato + redes */}
          <div className="flex flex-col gap-8 md:col-span-7 md:items-end md:text-right">
            <div className="space-y-2 text-base md:text-lg">
              <p>Laranjeiras, Rio de Janeiro · Brasil</p>
              <p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-[6px] transition-opacity hover:opacity-75"
                >
                  {EMAIL}
                </a>
              </p>
            </div>

            {/* Telefone com ícone do WhatsApp */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-base transition-opacity hover:opacity-75 md:text-lg"
            >
              <WhatsappIcon className="h-5 w-5" />
              (21) 97539-7680
            </a>

            {/* Redes sociais com ícones */}
            <div className="flex items-center gap-5">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Patuá"
                className="transition-opacity hover:opacity-75"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Patuá"
                className="transition-opacity hover:opacity-75"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>

            {/* Para arquitetos e designers → Casoca */}
            <a
              href={CASOCA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] border border-[var(--color-olive)]/40 px-5 py-3 text-sm font-medium text-[var(--color-olive)] transition-colors hover:bg-[var(--color-olive)] hover:text-[var(--color-mustard)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
              </svg>
              Para arquitetos e designers
            </a>
          </div>
        </div>

        {/* Divisor */}
        <hr className="border-t border-[var(--color-olive)]/30" />

        {/* Copyright */}
        <p className="pt-8 text-center text-sm text-[var(--color-olive)]/85">
          © {year}. Patuá Ateliê — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
