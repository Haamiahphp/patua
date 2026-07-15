"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
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
};

const DURATION = 6500;

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const { editMode } = useEditor();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

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

  return (
    <section
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={current.plain && current.bg ? { backgroundColor: current.bg } : undefined}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[var(--color-bark)]"
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
          <EditableImage
            id={`${current.key}.imagem`}
            src={current.image.url}
            alt={current.image.alt ?? current.piece}
            fill
            priority
            className={current.plain ? "object-contain" : "object-cover"}
          />
        </motion.div>
      </AnimatePresence>

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

      {/* Texto — lateral esquerda, centralizado na vertical (só quando não é banner "plain") */}
      {!current.plain && (
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="max-w-[34rem]">
            <p className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-white/80">
              Patuá
            </p>

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
                  className="font-display mt-5 text-[clamp(2.25rem,4.6vw,4.25rem)] font-medium leading-[var(--leading-display)] tracking-[var(--tracking-tight)] text-white"
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
                className="mt-6 max-w-md"
              >
                <Editable
                  id={`${current.key}.descricao`}
                  as="p"
                  className="text-[var(--text-base)] leading-[var(--leading-body)] text-white/85"
                >
                  {current.description}
                </Editable>
                <Link
                  href={current.href}
                  className="mt-6 inline-block border-b border-white/40 pb-1 text-sm text-white transition-colors hover:border-white"
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
