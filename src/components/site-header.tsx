"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

export type HeaderContent = {
  logo: { url: string; alt?: string };
  retrato: { url: string; alt?: string };
  tagline: string;
};

// Loja virtual da Patuá (fica pronta em breve — a cliente confirmou o endereço).
const LOJA = "https://patuaartesania.com.br/loja";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
};

const NAV_PRIMARY: NavItem[] = [
  { label: "Sobre", href: "/about" },
  { label: "Coleções", href: "/collections" },
];

const NAV_SECONDARY: NavItem[] = [
  { label: "Para profissionais", href: "/professionals" },
  { label: "Como funciona a coautoria", href: "/coautoria" },
  { label: "Entre em contato", href: "/contact-us" },
  { label: "Compre online", href: LOJA, external: true, highlight: true },
];

const WHATSAPP = "https://wa.me/5521975397680";
const INSTAGRAM = "https://www.instagram.com/patua.atelie";
const TWITTER = "https://twitter.com/patua_atelie";
const EMAIL = "contato@patuaartesania.com.br";

export function SiteHeader({ content }: { content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();
  const { logo, retrato, tagline } = content;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-black/35 via-black/15 to-transparent"
        />
        <div className="relative mx-auto flex h-[88px] w-full max-w-[var(--container-page)] items-center justify-between px-4 md:px-10">
          <Link
            href="/"
            aria-label="Patuá Ateliê — início"
            className="site-logo block transition-opacity duration-500"
          >
            <EditableImage
              id="site.header.logo"
              src={logo.url}
              alt={logo.alt ?? "Patuá Artesania Brasileira"}
              width={587}
              height={288}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-cream-light)]/95 px-5 py-2.5 text-sm font-medium text-[var(--color-bark)] backdrop-blur-md transition-colors hover:bg-[var(--color-cream-light)]"
          >
            <span>Menu</span>
            <span className="flex flex-col gap-[3px]">
              <span className="block h-[1.5px] w-3 bg-current" />
              <span className="block h-[1.5px] w-3 bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] grid grid-cols-1 md:grid-cols-2"
          >
            {/* Metade esquerda — terracota */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden flex-col bg-[var(--color-terracotta)] text-[var(--color-cream-light)] md:flex"
            >
              {/* Logo top-left */}
              <div className="p-10">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  aria-label="Patuá Ateliê"
                >
                  <Image
                    src={logo.url}
                    alt={logo.alt ?? "Patuá Artesania Brasileira"}
                    width={587}
                    height={288}
                    className="h-16 w-auto"
                  />
                </Link>
              </div>

              {/* Foto centralizada */}
              <div className="flex flex-1 items-center justify-center px-10">
                <div className="relative aspect-square w-[min(60%,440px)] overflow-hidden bg-[var(--color-cream-light)]">
                  <EditableImage
                    id="site.header.retrato"
                    src={retrato.url}
                    alt={retrato.alt ?? "Patuá Ateliê"}
                    fill
                    sizes="(max-width: 768px) 0, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 items-end gap-6 px-10 pb-10 text-sm text-[var(--color-cream-light)]/90">
                <Editable
                  id="site.header.tagline"
                  as="p"
                  className="max-w-[24ch] leading-[var(--leading-body)]"
                >
                  {tagline}
                </Editable>
                <p className="text-center text-[var(--color-cream-light)]/70">
                  © {year}. Patuá Ateliê
                </p>
              </div>
            </motion.div>

            {/* Metade direita — cream */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col bg-[var(--color-cream)] text-[var(--color-bark)]"
            >
              {/* Botão fechar */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="absolute right-8 top-8 z-10 grid h-10 w-10 place-items-center text-[var(--color-bark)] transition-opacity hover:opacity-75 md:right-10 md:top-10"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M3 3L19 19M19 3L3 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Links nav */}
              <div className="flex flex-1 flex-col justify-center px-8 pt-24 md:px-16">
                <nav>
                  <ul className="flex flex-col gap-8 md:gap-10">
                    {NAV_PRIMARY.map((item, i) => (
                      <MenuItem
                        key={item.href}
                        item={item}
                        size="lg"
                        delay={0.1 + i * 0.06}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                    {NAV_SECONDARY.map((item, i) => (
                      <MenuItem
                        key={item.href}
                        item={item}
                        size="sm"
                        delay={0.1 + (NAV_PRIMARY.length + i) * 0.06}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Bottom info */}
              <div className="grid grid-cols-1 gap-6 px-8 pb-10 text-sm text-[var(--color-bark)] md:grid-cols-3 md:gap-6 md:px-16">
                <p>Laranjeiras, Rio de Janeiro. Brasil</p>
                <div className="flex flex-col gap-1">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75"
                  >
                    (21)97539-7680
                  </a>
                  <a href={`mailto:${EMAIL}`} className="hover:opacity-75">
                    {EMAIL}
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75"
                  >
                    Instagram
                  </a>
                  <a
                    href={TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MenuItem({
  item,
  size,
  delay,
  onClick,
}: {
  item: NavItem;
  size: "lg" | "sm";
  delay: number;
  onClick: () => void;
}) {
  const { href, label, external, highlight } = item;
  const sizeClass =
    size === "lg"
      ? "text-[clamp(2rem,3.6vw,3.25rem)]"
      : "text-[clamp(1.35rem,2vw,1.6rem)]";
  const colorClass = highlight
    ? "text-[var(--color-terracotta)]"
    : "text-[var(--color-bark)]";
  const cls = `inline-flex items-center gap-2 font-display leading-[1] tracking-[var(--tracking-tight)] transition-opacity hover:opacity-75 ${colorClass} ${sizeClass}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={cls}
        >
          <span>{label}</span>
          <span aria-hidden className="text-[0.7em]">
            →
          </span>
        </a>
      ) : (
        <Link href={href} onClick={onClick} className={cls}>
          <span>{label}</span>
        </Link>
      )}
    </motion.li>
  );
}
