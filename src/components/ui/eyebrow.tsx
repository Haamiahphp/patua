import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

export function Eyebrow({ children, className, tone = "dark" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)]",
        tone === "dark"
          ? "text-[var(--color-bark)]/60"
          : "text-white/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
