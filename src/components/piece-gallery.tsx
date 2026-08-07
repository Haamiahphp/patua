"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carrossel das fotos da peça — miniaturas na lateral e foto grande ao lado
 * (referência boobam.com.br enviada pela cliente).
 *
 * As fotos são gravadas na proporção ORIGINAL. A moldura 4:5 é feita aqui: a
 * foto entra inteira (`object-contain`) sobre uma cópia desfocada dela mesma,
 * então nada é cortado, não sobra faixa vazia e o modal consegue mostrar o
 * arquivo cheio, sem borrão.
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
  const [ampliada, setAmpliada] = useState(false);
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

  const legenda = (i: number) =>
    total > 1 ? `${nome} — foto ${i + 1} de ${total}` : nome;

  return (
    <div className="relative flex w-full min-w-0 flex-col gap-3 md:block">
      {/* Foto grande — clicar abre a foto ampliada */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream-light)] md:ml-[92px] md:w-[calc(100%-92px)]">
        {fotos.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== index}
            // `scale` e não `transform`: no Tailwind v4 `scale-[1.04]` gera a
            // propriedade CSS `scale`, então listar `transform` na transição
            // faria o zoom saltar sem animação.
            className={`absolute inset-0 transition-[opacity,scale] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Cópia desfocada preenchendo a moldura por trás da foto. Fica
                borrada, então basta uma versão pequena. */}
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="120px"
              className="scale-125 object-cover blur-2xl"
            />
            <Image
              src={src}
              alt={legenda(i)}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-contain"
            />
          </div>
        ))}

        {/* Camada de clique pra ampliar. Fica abaixo das setas (z menor), então
            clicar numa seta navega em vez de abrir o modal. */}
        <button
          type="button"
          onClick={() => setAmpliada(true)}
          aria-label={`Ampliar ${legenda(index)}`}
          className="absolute inset-0 z-[5] cursor-zoom-in"
        />

        {/* Affordance de ampliar (só no desktop, onde existe hover) */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 z-[6] hidden h-9 w-9 place-items-center rounded-full bg-[var(--color-cream-light)]/90 text-[var(--color-bark)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:grid"
        >
          <ExpandIcon />
        </span>

        {total > 1 && (
          <>
            <GalleryArrow dir="prev" onClick={() => go(-1)} />
            <GalleryArrow dir="next" onClick={() => go(1)} />
            <span className="pointer-events-none absolute bottom-3 right-3 z-[6] rounded-[var(--radius-pill)] bg-[var(--color-bark)]/70 px-3 py-1 text-xs font-medium text-[var(--color-cream-light)] md:hidden">
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

      {ampliada && (
        <Lightbox
          fotos={fotos}
          index={index}
          nome={nome}
          onIndex={setIndex}
          onClose={() => setAmpliada(false)}
        />
      )}
    </div>
  );
}

/** Foto ampliada em tela cheia, na proporção original do arquivo. */
function Lightbox({
  fotos,
  index,
  nome,
  onIndex,
  onClose,
}: {
  fotos: string[];
  index: number;
  nome: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const total = fotos.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  // Teclado: Esc fecha, setas navegam.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (total < 2) return;
      if (e.key === "ArrowRight") onIndex((index + 1) % total);
      if (e.key === "ArrowLeft") onIndex((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onIndex, onClose]);

  // Trava a rolagem do fundo enquanto a foto está ampliada (mesmo padrão do menu).
  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      anterior?.focus?.();
    };
  }, []);

  if (!montado) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${nome} — foto ampliada`}
      onClick={onClose}
      // O respiro extra embaixo é pra o contador não encostar na foto.
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--color-bark)]/95 p-4 pb-14 backdrop-blur-sm md:p-10 md:pb-16"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-[var(--color-cream-light)] transition-colors hover:bg-white/10 md:right-8 md:top-8"
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

      {/* A foto na proporção original — o clique nela não fecha o modal. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full cursor-default"
      >
        <Image
          key={fotos[index]}
          src={fotos[index]}
          alt={total > 1 ? `${nome} — foto ${index + 1} de ${total}` : nome}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {total > 1 && (
        <>
          <LightboxArrow
            dir="prev"
            onClick={() => onIndex((index - 1 + total) % total)}
          />
          <LightboxArrow
            dir="next"
            onClick={() => onIndex((index + 1) % total)}
          />
          <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-black/35 px-4 py-1.5 text-xs font-medium text-[var(--color-cream-light)] md:bottom-8">
            {index + 1} / {total}
          </span>
        </>
      )}
    </div>,
    document.body,
  );
}

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 1.5H1.5V6M10 1.5h4.5V6M6 14.5H1.5V10M10 14.5h4.5V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d={dir === "prev" ? "M9 2L4 7L9 12" : "M5 2L10 7L5 12"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
      <Chevron dir={dir} />
    </button>
  );
}

function LightboxArrow({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={dir === "prev" ? "Foto anterior" : "Próxima foto"}
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream-light)]/90 text-[var(--color-bark)] transition-colors hover:bg-[var(--color-cream-light)] ${
        dir === "prev" ? "left-3 md:left-6" : "right-3 md:right-6"
      }`}
    >
      <Chevron dir={dir} />
    </button>
  );
}
