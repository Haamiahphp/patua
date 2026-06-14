import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "cream" | "cream-light" | "bark" | "transparent";
type Size = "sm" | "md" | "lg";
type Width = "page" | "prose" | "narrow" | "full";

const tones: Record<Tone, string> = {
  cream: "bg-[var(--color-cream)] text-[var(--color-bark)]",
  "cream-light": "bg-[var(--color-cream-light)] text-[var(--color-bark)]",
  bark: "bg-[var(--color-bark)] text-[var(--color-cream-light)]",
  transparent: "",
};

const sizes: Record<Size, string> = {
  sm: "py-[var(--space-section-sm)] md:py-[var(--space-section-md)]",
  md: "py-[var(--space-section-md)] md:py-[var(--space-section-lg)]",
  lg: "py-[var(--space-section-md)] md:py-[var(--space-section-lg)]",
};

const widths: Record<Width, string> = {
  page: "max-w-[var(--container-page)]",
  prose: "max-w-[var(--container-prose)]",
  narrow: "max-w-[var(--container-narrow)]",
  full: "max-w-none",
};

type SectionProps = {
  as?: ElementType;
  tone?: Tone;
  size?: Size;
  width?: Width;
  className?: string;
  innerClassName?: string;
  id?: string;
  children: ReactNode;
};

export function Section({
  as: Tag = "section",
  tone = "cream",
  size = "md",
  width = "page",
  className,
  innerClassName,
  id,
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(tones[tone], sizes[size], "relative", className)}>
      <div
        className={cn(
          "mx-auto w-full px-4 md:px-10",
          widths[width],
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
