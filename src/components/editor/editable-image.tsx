"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEditor } from "./editor-provider";

type EditableImageProps = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
};

export function EditableImage({
  id,
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
}: EditableImageProps) {
  const { isEditor, editMode } = useEditor();
  const [url, setUrl] = useState(src);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const img = (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      className={className}
    />
  );

  if (!isEditor || !editMode) return img;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd }).then(
        (r) => r.json(),
      );
      if (!up.url) throw new Error("upload sem url");
      const saved = await fetch("/api/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: id, value: { url: up.url, alt } }),
      });
      if (!saved.ok) throw new Error("falha ao salvar");
      setUrl(up.url);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
      // permite re-selecionar o mesmo arquivo
      input.value = "";
    }
  }

  return (
    <span className="relative inline-block">
      {img}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white opacity-0 transition hover:opacity-100"
      >
        {busy ? "Enviando…" : error ? "Erro — tente de novo" : "Trocar imagem"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onPick}
      />
    </span>
  );
}
