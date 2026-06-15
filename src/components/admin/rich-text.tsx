"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRef } from "react";

export function RichText({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false, // evita mismatch de hidratação (Next SSR)
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, HTMLAttributes: { rel: "noopener nofollow" } },
        heading: { levels: [2, 3] },
      }),
      Image,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose-patua min-h-[320px] w-full rounded-b-lg border border-t-0 border-black/10 bg-white px-4 py-3 outline-none focus:border-black/20",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="min-h-[372px] animate-pulse rounded-lg border border-black/10 bg-black/5" />
    );
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);

  function setLink() {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL do link:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd }).then((r) =>
        r.json(),
      );
      if (up.url) editor.chain().focus().setImage({ src: up.url }).run();
      else window.alert("Falha no upload da imagem.");
    } catch {
      window.alert("Falha no upload da imagem.");
    } finally {
      input.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-black/10 bg-[var(--color-cream)] px-2 py-2">
      <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <b>B</b>
      </Btn>
      <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i>I</i>
      </Btn>
      <Sep />
      <Btn
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Btn>
      <Btn
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Btn>
      <Sep />
      <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • Lista
      </Btn>
      <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. Lista
      </Btn>
      <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        ❝ Citação
      </Btn>
      <Sep />
      <Btn active={editor.isActive("link")} onClick={setLink}>
        Link
      </Btn>
      <Btn active={false} onClick={() => fileRef.current?.click()}>
        Imagem
      </Btn>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
    </div>
  );
}

function Btn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2.5 py-1 text-sm transition-colors ${
        active
          ? "bg-[var(--color-bark)] text-[var(--color-cream)]"
          : "text-[var(--color-bark)] hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-black/10" />;
}
