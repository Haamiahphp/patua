"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { name: string; image: string };

export function RestauroGallery({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? 0 : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, items.length]);

  return (
    <>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10">
        {items.map((it, i) => (
          <button
            key={it.name}
            type="button"
            onClick={() => setActive(i)}
            className={`group block text-left ${i % 3 === 1 ? "md:mt-16" : ""}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-light)]">
              <Image
                src={it.image}
                alt={it.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 font-display text-lg text-[var(--color-bark)] md:text-xl">
              {it.name}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black/92"
            onClick={() => setActive(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              aria-label="Fechar"
              className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-10 md:top-10"
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path
                  d="M3 3L19 19M19 3L3 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) =>
                  i === null ? 0 : (i - 1 + items.length) % items.length,
                );
              }}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 md:left-10"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) =>
                  i === null ? 0 : (i + 1) % items.length,
                );
              }}
              aria-label="Próxima"
              className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 md:right-10"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-center px-4 py-20 md:px-10"
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={items[active].image}
                  alt={items[active].name}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-6 font-display text-xl text-white md:text-2xl">
                {items[active].name}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">
                {active + 1} / {items.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
