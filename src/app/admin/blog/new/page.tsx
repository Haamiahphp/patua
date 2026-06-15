import { AdminShell } from "@/components/admin/admin-shell";
import { PostEditor } from "@/components/admin/post-editor";

export const metadata = { title: "Novo texto · Painel Patuá" };

export default function NewPostPage() {
  return (
    <AdminShell title="Novo texto">
      <PostEditor post={null} />
    </AdminShell>
  );
}
