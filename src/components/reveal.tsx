"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /**
   * Tag renderizada. Dentro de `<ul>`/`<ol>` precisa ser `"li"`: a `div` padrão
   * entre a lista e o item quebra o HTML (lista com filho que não é `<li>`) e o
   * leitor de tela deixa de anunciar "lista de 5 itens".
   */
  as?: "div" | "li";
};

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      ref={ref as never}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function SplitWords({
  text,
  className,
  stagger = 0.04,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
