"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carrossel das fotos da peça — miniaturas na lateral e foto grande ao lado
 * (referência boobam.com.br enviada pela cliente). As fotos já são exportadas
 * em 4:5 (ver scripts de preparo das imagens), então a moldura fica sempre
 * cheia, sem faixa vazia e sem cortar a peça.
 *
 * No desktop a coluna de miniaturas é posicionada de forma absoluta pra ter
 * exatamente a altura da foto grande (e rolar sozinha quando há muitas fotos).
 */
const THUMB_COL = "md:w-[76px]";

export function PieceGallery({
  fotos,
  nome,
}: {
  fotos: string[];
  nome: string;
}) {
  const [index, setIndex] = useState(0);
  const total = fotos.length;
  const thumbsRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  // Mantém a miniatura ativa à vista, rolando só o contêiner (nunca a página).
  useEffect(() => {
    const box = thumbsRef.current;
    const thumb = box?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!box || !thumb) return;
    const vertical = box.scrollHeight > box.clientHeight;
    if (vertical) {
      const top = thumb.offsetTop - (box.clientHeight - thumb.offsetHeight) / 2;
      box.scrollTo({ top, behavior: "smooth" });
    } else if (box.scrollWidth > box.clientWidth) {
      const left = thumb.offsetLeft - (box.clientWidth - thumb.offsetWidth) / 2;
      box.scrollTo({ left, behavior: "smooth" });
    }
  }, [index]);

  if (total === 0) return null;

  return (
    <div className="relative flex w-full min-w-0 flex-col gap-3 md:block">
      {/* Foto grande */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream-light)] md:ml-[92px] md:w-[calc(100%-92px)]">
        {fotos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={total > 1 ? `${nome} — foto ${i + 1} de ${total}` : nome}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 42vw"
            className={`object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}

        {total > 1 && (
          <>
            <GalleryArrow dir="prev" onClick={() => go(-1)} />
            <GalleryArrow dir="next" onClick={() => go(1)} />
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-[var(--radius-pill)] bg-[var(--color-bark)]/70 px-3 py-1 text-xs font-medium text-[var(--color-cream-light)] md:hidden">
              {index + 1}/{total}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas — faixa horizontal no mobile, coluna à esquerda no desktop */}
      {total > 1 && (
        <div
          ref={thumbsRef}
          className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:absolute md:inset-y-0 md:left-0 md:mx-0 md:flex-col md:overflow-y-auto md:overflow-x-hidden md:px-0 md:pb-0 ${THUMB_COL}`}
        >
          {fotos.map((src, i) => (
            <button
              key={src}
              type="button"
              data-thumb={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1} de ${nome}`}
              aria-current={i === index}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden bg-[var(--color-cream-light)] transition-opacity md:w-full ${
                i === index
                  ? "opacity-100 ring-1 ring-[var(--color-terracotta)]"
                  : "opacity-55 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 64px, 76px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryArrow({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Foto anterior" : "Próxima foto"}
      className={`absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream-light)]/90 text-[var(--color-bark)] shadow-sm transition hover:bg-[var(--color-cream-light)] md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 ${
        dir === "prev" ? "left-3" : "right-3"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {dir === "prev" ? (
          <path
            d="M9 2L4 7L9 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M5 2L10 7L5 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
