import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "outline-dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-sans font-medium tracking-[0.02em] transition-colors duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] focus-visible:ring-[var(--color-terracotta)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-terracotta)] text-[var(--color-cream-light)] hover:bg-[var(--color-terracotta-deep)]",
  dark:
    "bg-[var(--color-bark)] text-[var(--color-cream-light)] hover:bg-[var(--color-terracotta)]",
  outline:
    "border border-white/60 text-white backdrop-blur-md hover:bg-white hover:text-[var(--color-bark)]",
  "outline-dark":
    "border border-[var(--color-bark)]/30 text-[var(--color-bark)] hover:bg-[var(--color-bark)] hover:text-[var(--color-cream-light)]",
  ghost:
    "text-[var(--color-bark)] hover:text-[var(--color-terracotta)] underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-6 py-2 text-sm",                   /* 8px 24px do framer */
  md: "px-8 py-3 text-sm",                   /* 24px 32px ajustado */
  lg: "px-8 py-4 text-base md:px-10 md:py-5",/* 24px 64px CTA      */
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = CommonProps & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {children}
      {arrow ? (
        <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a className={classes} href={href} {...anchorProps}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...(anchorProps as object)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}
