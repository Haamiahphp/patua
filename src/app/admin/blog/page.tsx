import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { listAll } from "@/lib/blog";

export const metadata = { title: "Blog · Painel Patuá" };

// sempre dinâmico: lista do banco, sem cache
export const dynamic = "force-dynamic";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminBlogList() {
  const posts = await listAll();

  return (
    <AdminShell
      title="Blog"
      action={
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-[var(--color-terracotta)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Novo texto
        </Link>
      }
    >
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white p-12 text-center">
          <p className="text-[var(--color-bark)]/70">
            Nenhum texto ainda. Crie o primeiro clicando em “Novo texto”.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 text-[var(--color-bark)]/60">
              <tr>
                <th className="px-5 py-3 font-medium">Título</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Atualizado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3 text-[var(--color-bark)]">{p.title}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs ${
                        p.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-black/5 text-[var(--color-bark)]/60"
                      }`}
                    >
                      {p.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[var(--color-bark)]/60">{fmt(p.updatedAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="text-[var(--color-terracotta)] hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
