"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { EditableImage } from "@/components/editor/editable-image";

export type GalleryItem = { key: string; url: string; alt: string };

// Offset Y por coluna (px no início → fim do scroll). Alterna direção.
const OFFSETS: [number, number][] = [
  [240, -240],
  [-320, 320],
  [180, -180],
  [-400, 400],
];

export function GalleryGrid({ cols }: { cols: GalleryItem[][] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-stone)] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10 md:gap-y-16">
          {cols.map((items, i) => (
            <GalleryColumn
              key={i}
              items={items}
              progress={scrollYProgress}
              range={OFFSETS[i] ?? [0, 0]}
              shift={i % 2 === 1 ? "md:mt-20" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryColumn({
  items,
  progress,
  range,
  shift,
}: {
  items: GalleryItem[];
  progress: MotionValue<number>;
  range: [number, number];
  shift: string;
}) {
  const y = useTransform(progress, [0, 1], range);
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-10 md:gap-16 ${shift}`}>
      {items.map((item, i) => (
        <div
          key={item.key}
          className="relative aspect-[5/4] w-full overflow-hidden"
        >
          <EditableImage
            id={item.key}
            src={item.url}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, 22vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </motion.div>
  );
}
