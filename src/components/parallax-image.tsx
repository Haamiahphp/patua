"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "ref"> & {
  containerClassName?: string;
  amount?: number;
};

export function ParallaxImage({
  containerClassName,
  amount = 80,
  className,
  alt,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <Image
          {...props}
          alt={alt}
          className={cn("h-full w-full object-cover", className)}
        />
      </motion.div>
    </div>
  );
}
