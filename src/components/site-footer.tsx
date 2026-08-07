import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";

const WHATSAPP = "https://wa.me/5521975397680";
const INSTAGRAM = "https://www.instagram.com/patuaartesania";
const FACEBOOK = "https://www.facebook.com/patuaartesania";

const CREAM = "#fff3db";
const GREEN = "#3e3f1f";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const titulo = await getContent("site.footer.titulo", "Acompanhe a Patuá");
  const descricao = await getContent(
    "site.footer.descricao",
    "Conecte-se com o nosso processo artesanal, novidades e inspirações do Brasil.",
  );
  const script = await getContent(
    "site.footer.script",
    "Quando é Patuá, você sente.",
  );
  const endereco = await getContent(
    "site.footer.endereco",
    "Laranjeiras, Rio de Janeiro · Brasil",
  );
  const email = await getContent(
    "site.footer.email",
    "contato@patuaartesania.com.br",
  );
  const telefone = await getContent("site.footer.telefone", "(21) 97539-7680");
  const casocaLabel = await getContent(
    "site.footer.casoca",
    "Para arquitetos e designers",
  );

  return (
    <footer className="relative">
      {/* ── Topo creme ── */}
      <div style={{ backgroundColor: CREAM }} className="text-[var(--color-bark)]">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:gap-0">
            {/* Acompanhe */}
            <div className="md:pr-16">
              <Editable
                id="site.footer.titulo"
                as="h2"
                className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] tracking-[var(--tracking-tight)]"
              >
                {titulo}
              </Editable>
              <Editable
                id="site.footer.descricao"
                as="p"
                className="mt-6 max-w-[34ch] text-base leading-[var(--leading-body)] text-[var(--color-stone)]"
              >
                {descricao}
              </Editable>
              <Editable
                id="site.footer.script"
                as="p"
                className="mt-7 font-display text-[clamp(1.75rem,3vw,2.5rem)] italic leading-none text-[var(--color-terracotta)]"
              >
                {script}
              </Editable>
            </div>

            {/* Contatos */}
            <div className="flex flex-col gap-7 md:border-l md:border-[color:var(--color-bark)]/15 md:pl-16">
              <div className="space-y-4 text-base text-[var(--color-bark)]">
                <p className="flex items-center gap-3">
                  <MapPin
                    className="h-5 w-5 shrink-0 text-[var(--color-terracotta)]"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <Editable id="site.footer.endereco" as="span">
                    {endereco}
                  </Editable>
                </p>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 transition-opacity hover:opacity-70"
                >
                  <Mail
                    className="h-5 w-5 shrink-0 text-[var(--color-terracotta)]"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <Editable id="site.footer.email" as="span">
                    {email}
                  </Editable>
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity hover:opacity-70"
                >
                  <WhatsappIcon className="h-5 w-5 shrink-0 text-[var(--color-terracotta)]" />
                  <Editable id="site.footer.telefone" as="span">
                    {telefone}
                  </Editable>
                </a>
              </div>

              <hr className="border-t border-[color:var(--color-bark)]/15" />

              {/* Redes */}
              <div className="flex items-center gap-5 text-[var(--color-bark)]">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Patuá"
                  className="transition-opacity hover:opacity-70"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Patuá"
                  className="transition-opacity hover:opacity-70"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
              </div>

              {/* Para arquitetos e designers → página Para profissionais */}
              <Link
                href="/professionals"
                className="inline-flex w-fit items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-terracotta-deep)]"
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
                <Editable id="site.footer.casoca" as="span">
                  {casocaLabel}
                </Editable>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Base verde com onda ── */}
      <div
        style={{ backgroundColor: GREEN }}
        className="relative overflow-hidden"
      >
        {/* Onda separando o creme do verde */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute inset-x-0 top-0 h-[70px] w-full md:h-[110px]"
        >
          <path
            d="M0,0 H1440 V52 C1160,104 980,18 700,52 C440,84 250,20 0,60 Z"
            fill={CREAM}
          />
          <path
            d="M0,60 C250,20 440,84 700,52 C980,18 1160,104 1440,52"
            fill="none"
            stroke="#c8a86a"
            strokeWidth="2.5"
          />
        </svg>

        {/* Wordmark + copyright, centralizados */}
        <div className="relative mx-auto flex max-w-[var(--container-page)] flex-col items-center px-4 pb-10 pt-[110px] md:px-10 md:pb-14 md:pt-[170px]">
          <Image
            src="/images/wordmark-cream.png"
            alt="Patuá — Artesania Brasileira"
            width={802}
            height={206}
            className="h-auto w-[clamp(240px,34vw,460px)]"
          />
          <hr className="mt-7 w-full max-w-[520px] border-t border-[var(--color-cream-light)]/25" />
          <p className="mt-8 text-center text-xs text-[var(--color-cream-light)]/70 md:text-sm">
            © {year} Patuá Artesania — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
