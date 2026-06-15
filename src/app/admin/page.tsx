import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Painel · Patuá" };

export default function AdminHome() {
  return (
    <AdminShell title="Painel">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/blog"
          className="rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-black/25"
        >
          <h2 className="font-display text-xl text-[var(--color-bark)]">Blog</h2>
          <p className="mt-2 text-sm text-[var(--color-bark)]/70">
            Criar, editar e publicar os textos do Universo.
          </p>
        </Link>
        <Link
          href="/"
          className="rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-black/25"
        >
          <h2 className="font-display text-xl text-[var(--color-bark)]">Editar o site</h2>
          <p className="mt-2 text-sm text-[var(--color-bark)]/70">
            Abra o site e use a barra de edição no rodapé para mudar textos e imagens.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
