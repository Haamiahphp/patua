"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "@/components/editor/editor-provider";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

export type Slide = {
  key: string; // ex: "home.hero.slogan"
  piece: string;
  description: string;
  href: string;
  cta: string;
  image: { url: string; alt?: string };
  /** Banner "só imagem": arte com texto embutido, sem overlay do site. */
  plain?: boolean;
  bg?: string;
  /** Ajuste de enquadramento da imagem (object-position / zoom por slide). */
  focusClass?: string;
  /** Arte alternativa (vertical) usada só no mobile. */
  mobileImage?: string;
};

const DURATION = 6500;

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const { editMode } = useEditor();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [heroCoversHeader, setHeroCoversHeader] = useState(true);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    // Em modo edição o autoplay pausa para permitir editar o slide visível.
    if (hovering || editMode) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, hovering, editMode, go]);

  const current = slides[index];

  // Enquanto o herói (banner "plain", que já traz a logo na arte) estiver sob o
  // cabeçalho, esconde a logo do menu pra não duplicar. Volta ao rolar/trocar slide.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (el) setHeroCoversHeader(el.getBoundingClientRect().bottom > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const hide = Boolean(current.plain) && heroCoversHeader;
    if (hide) root.setAttribute("data-hero-hide-logo", "");
    else root.removeAttribute("data-hero-hide-logo");
    return () => root.removeAttribute("data-hero-hide-logo");
  }, [current.plain, heroCoversHeader]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={current.plain && current.bg ? { backgroundColor: current.bg } : undefined}
      className="relative w-full overflow-hidden bg-[var(--color-bark)] h-[86svh] min-h-[500px] sm:h-auto sm:min-h-0 sm:aspect-[16/9]"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={current.image.url}
          initial={{ opacity: 0, scale: current.plain ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          {current.mobileImage ? (
            <>
              {/* Mobile: arte vertical dedicada. object-contain pra NÃO cortar a
                  marca no topo da arte (a cliente sinalizou o corte). O letterbox
                  usa o bg do slide. */}
              <Image
                src={current.mobileImage}
                alt={current.image.alt ?? current.piece}
                fill
                priority
                sizes="100vw"
                className="object-contain md:hidden"
              />
              {/* Desktop: arte horizontal */}
              <EditableImage
                id={`${current.key}.imagem`}
                src={current.image.url}
                alt={current.image.alt ?? current.piece}
                fill
                priority
                className={`hidden object-cover md:block ${current.focusClass ?? ""}`}
              />
            </>
          ) : (
            <EditableImage
              id={`${current.key}.imagem`}
              src={current.image.url}
              alt={current.image.alt ?? current.piece}
              fill
              priority
              className={`object-cover ${current.focusClass ?? ""}`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Banner "plain" clicável (slogan → /about#manifesto, e-commerce → loja).
          Href externo (http) abre em nova aba; interno usa o Link do Next. */}
      {current.plain && current.href && (
        <>
          {current.href.startsWith("http") ? (
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.cta || current.piece}
              className="absolute inset-0 z-10"
            />
          ) : (
            <Link
              href={current.href}
              aria-label={current.cta || current.piece}
              className="absolute inset-0 z-10"
            />
          )}

          {/* Affordance visível (ex.: "Compre online") quando o slide tem CTA. */}
          {current.cta && (
            <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center px-4 md:bottom-28">
              {current.href.startsWith("http") ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] shadow-lg shadow-black/10 transition-colors hover:bg-[var(--color-terracotta-deep)]"
                >
                  {current.cta}
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <Link
                  href={current.href}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-light)] shadow-lg shadow-black/10 transition-colors hover:bg-[var(--color-terracotta-deep)]"
                >
                  {current.cta}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {!current.plain && (
        <>
          {/* Degradê escuro bem suave atrás do texto (lateral esquerda) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent md:via-black/15 md:to-[65%]"
          />

          {/* Fusão com o Manifesto (fundo quente escuro) logo abaixo */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-[#241811] to-transparent"
          />
        </>
      )}

      {/* Banner não-"plain" inteiro clicável (a cliente pediu todos os banners
          clicáveis). Fora do modo edição, pra não bloquear a edição inline do texto. */}
      {!current.plain && current.href && !editMode && (
        <Link
          href={current.href}
          aria-label={current.cta || current.piece}
          className="absolute inset-0 z-[5]"
        />
      )}

      {/* Texto — lateral esquerda, centralizado na vertical (só quando não é banner "plain") */}
      {!current.plain && (
      <div
        className={`absolute inset-0 z-10 flex items-center ${editMode ? "" : "pointer-events-none"}`}
      >
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="max-w-[42rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.piece}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Editable
                  id={`${current.key}.titulo`}
                  as="h1"
                  className="font-display text-[clamp(2.75rem,5.6vw,5.5rem)] font-medium leading-[var(--leading-display)] tracking-[var(--tracking-tight)] text-white"
                >
                  {current.piece}
                </Editable>
              </motion.div>
            </AnimatePresence>

            <span aria-hidden className="mt-7 block h-px w-14 bg-white/45" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.description}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-6 max-w-xl"
              >
                <Editable
                  id={`${current.key}.descricao`}
                  as="p"
                  className="text-lg leading-[var(--leading-body)] text-white/85 md:text-2xl"
                >
                  {current.description}
                </Editable>
                <Link
                  href={current.href}
                  className="pointer-events-auto mt-7 inline-block border-b border-white/40 pb-1 text-base text-white transition-colors hover:border-white md:text-lg"
                >
                  {current.cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      )}

      {/* Navegação */}
      <div className="absolute bottom-8 right-4 z-20 flex items-center gap-2 md:bottom-10 md:right-10">
        <NavButton dir="prev" onClick={() => go(-1)} />
        <NavButton dir="next" onClick={() => go(1)} />
      </div>
    </section>
  );
}

function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Slide anterior" : "Próximo slide"}
      className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-cream-light)]/90 text-[var(--color-bark)] backdrop-blur-md transition-colors hover:bg-[var(--color-cream-light)]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {dir === "prev" ? (
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
