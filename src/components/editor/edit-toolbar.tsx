"use client";

import Link from "next/link";
import { useEditor } from "./editor-provider";

export function EditToolbar() {
  const { isEditor, editMode, setEditMode } = useEditor();
  if (!isEditor) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[var(--color-bark)] px-5 py-3 text-sm text-[var(--color-cream)] shadow-lg">
      <span>{editMode ? "Editando" : "Visualizando"}</span>
      <Link href="/admin/blog" className="opacity-70 hover:opacity-100">
        Blog
      </Link>
      <button
        type="button"
        onClick={() => setEditMode(!editMode)}
        className="rounded-full bg-[var(--color-terracotta)] px-4 py-1.5 font-medium text-white"
      >
        {editMode ? "Sair da edição" : "Editar"}
      </button>
      <form action="/api/auth/logout" method="post">
        <button type="submit" className="opacity-70 hover:opacity-100">
          Sair
        </button>
      </form>
    </div>
  );
}
