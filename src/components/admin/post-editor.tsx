"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RichText } from "./rich-text";
import { slugify } from "@/lib/slug";
import type { BlogPost, PostStatus } from "@/lib/blog";

export function PostEditor({ post }: { post: BlogPost | null }) {
  const router = useRouter();
  const editing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [coverUrl, setCoverUrl] = useState<string | null>(post?.coverUrl ?? null);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const coverRef = useRef<HTMLInputElement>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  function onTitle(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function uploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd }).then((r) =>
        r.json(),
      );
      if (up.url) setCoverUrl(up.url);
      else setError("Falha no upload da capa.");
    } catch {
      setError("Falha no upload da capa.");
    } finally {
      setBusy(false);
      input.value = "";
    }
  }

  async function save(status: PostStatus) {
    if (!title.trim()) {
      setError("Dê um título ao texto.");
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      title: title.trim(),
      slug: effectiveSlug,
      coverUrl,
      excerpt: excerpt.trim() || null,
      body,
      status,
    };
    try {
      const res = await fetch(editing ? `/api/blog/${post!.id}` : "/api/blog", {
        method: editing ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Falha ao salvar.");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao salvar.");
      setBusy(false);
    }
  }

  async function remove() {
    if (!editing) return;
    if (!window.confirm("Excluir este texto? Esta ação não pode ser desfeita.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/blog/${post!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Falha ao excluir.");
      setBusy(false);
    }
  }

  const published = post?.status === "published";

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm text-[var(--color-bark)]/70">
          Título
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="Título do texto"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-lg"
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1 block text-sm text-[var(--color-bark)]/70">
          Endereço (slug)
        </label>
        <div className="flex items-center gap-2 text-sm text-[var(--color-bark)]/60">
          <span>/blog/</span>
          <input
            id="slug"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-[var(--color-bark)]"
          />
        </div>
      </div>

      <div>
        <span className="mb-1 block text-sm text-[var(--color-bark)]/70">Capa</span>
        <div className="flex items-center gap-4">
          {coverUrl ? (
            <span className="relative h-20 w-32 overflow-hidden rounded-lg bg-black/5">
              <Image src={coverUrl} alt="Capa" fill sizes="128px" className="object-cover" />
            </span>
          ) : (
            <span className="grid h-20 w-32 place-items-center rounded-lg bg-black/5 text-xs text-[var(--color-bark)]/50">
              sem capa
            </span>
          )}
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="rounded-lg border border-black/15 px-3 py-2 text-sm hover:bg-black/5"
          >
            {coverUrl ? "Trocar capa" : "Enviar capa"}
          </button>
          {coverUrl && (
            <button
              type="button"
              onClick={() => setCoverUrl(null)}
              className="text-sm text-[var(--color-bark)]/60 hover:text-red-600"
            >
              Remover
            </button>
          )}
          <input ref={coverRef} type="file" accept="image/*" hidden onChange={uploadCover} />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm text-[var(--color-bark)]/70">
          Resumo
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Uma ou duas frases que aparecem na listagem."
          className="w-full resize-y rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <span className="mb-1 block text-sm text-[var(--color-bark)]/70">Conteúdo</span>
        <RichText value={body} onChange={setBody} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-5">
        <button
          type="button"
          disabled={busy}
          onClick={() => save("draft")}
          className="rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium hover:bg-black/5 disabled:opacity-60"
        >
          {published ? "Despublicar (rascunho)" : "Salvar rascunho"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => save("published")}
          className="rounded-lg bg-[var(--color-terracotta)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {published ? "Atualizar publicação" : "Publicar"}
        </button>
        <span className="flex-1" />
        {editing && (
          <button
            type="button"
            disabled={busy}
            onClick={remove}
            className="text-sm text-[var(--color-bark)]/60 hover:text-red-600 disabled:opacity-60"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
