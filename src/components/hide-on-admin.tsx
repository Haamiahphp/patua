"use client";

import { usePathname } from "next/navigation";

// Esconde a "moldura" pública (header/footer/barra de edição) nas rotas /admin,
// que têm chrome próprio. Mantém um único root layout.
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
