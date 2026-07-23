"use client";

import Link from "next/link";
import { useEditor } from "@/components/editor/editor-provider";

/**
 * Torna uma seção/cartão clicável sem quebrar a edição inline do CMS.
 *
 * - Fora do modo edição: renderiza um link (interno via next/link, externo via <a>).
 * - No modo edição: NÃO envolve o conteúdo num link, pra que os textos/imagens
 *   `Editable` por baixo continuem editáveis (mesma estratégia do hero-carousel).
 *
 * Sem `children` funciona como camada de clique sobreposta (absolute inset-0);
 * com `children` envolve o conteúdo (ex.: cada etapa do Processo Criativo).
 */
export function EditAwareLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  const { editMode } = useEditor();

  if (editMode) {
    return children ? <div className={className}>{children}</div> : null;
  }

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
