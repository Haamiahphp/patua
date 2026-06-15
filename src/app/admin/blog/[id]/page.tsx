import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PostEditor } from "@/components/admin/post-editor";
import { getById } from "@/lib/blog";

export const metadata = { title: "Editar texto · Painel Patuá" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getById(id);
  if (!post) notFound();

  return (
    <AdminShell title="Editar texto">
      <PostEditor post={post} />
    </AdminShell>
  );
}
