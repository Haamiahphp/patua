"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const COLS: string[][] = [
  [
    "/images/tramas/trama-01.jpg",
    "/images/tramas/trama-05.jpeg",
    "/images/tramas/trama-09.jpeg",
    "/images/tramas/trama-13.jpeg",
    "/images/tramas/trama-17.jpeg",
  ],
  [
    "/images/tramas/trama-02.jpg",
    "/images/tramas/trama-06.jpg",
    "/images/tramas/trama-10.jpeg",
    "/images/tramas/trama-14.jpeg",
    "/images/tramas/trama-18.jpeg",
  ],
  [
    "/images/tramas/trama-03.jpg",
    "/images/tramas/trama-07.jpg",
    "/images/tramas/trama-11.jpeg",
    "/images/tramas/trama-15.jpeg",
    "/images/QHgEdXTMAbNex3rOnTBHmoMm64.jpg",
  ],
  [
    "/images/tramas/trama-04.jpg",
    "/images/tramas/trama-08.jpg",
    "/images/tramas/trama-12.jpeg",
    "/images/tramas/trama-16.jpeg",
    "/images/4tbLJsG61TwNnjRLrrMZds9IWx0.webp",
  ],
];

// Offset Y por coluna (px no início → fim do scroll). Alterna direção.
const OFFSETS: [number, number][] = [
  [240, -240],
  [-320, 320],
  [180, -180],
  [-400, 400],
];

export function GallerySection() {
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
          {COLS.map((images, i) => (
            <GalleryColumn
              key={i}
              images={images}
              progress={scrollYProgress}
              range={OFFSETS[i]}
              shift={i % 2 === 1 ? "md:mt-20" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryColumn({
  images,
  progress,
  range,
  shift,
}: {
  images: string[];
  progress: MotionValue<number>;
  range: [number, number];
  shift: string;
}) {
  const y = useTransform(progress, [0, 1], range);
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-10 md:gap-16 ${shift}`}>
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-[5/4] w-full overflow-hidden"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 22vw"
            className="object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </motion.div>
  );
}
