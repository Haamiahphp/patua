"use client";

import { useRef, useState } from "react";
import { useEditor } from "./editor-provider";
import { cn } from "@/lib/cn";

type EditableProps = {
  id: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  children: React.ReactNode;
};

export function Editable({ id, as = "span", className, children }: EditableProps) {
  const { isEditor, editMode } = useEditor();
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const Tag = as as React.ElementType;

  if (!isEditor || !editMode) {
    return <Tag className={className}>{children}</Tag>;
  }

  async function save() {
    const value = ref.current?.innerText?.trim() ?? "";
    setStatus("saving");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key: id, value }),
    });
    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={save}
      data-status={status}
      title={status === "error" ? "Falha ao salvar — tente novamente" : undefined}
      className={cn(
        className,
        "cursor-text rounded-sm outline-dashed outline-1 outline-[var(--color-terracotta)] focus:outline-2",
        "data-[status=saving]:opacity-60 data-[status=error]:outline-2 data-[status=error]:outline-red-600",
      )}
    >
      {children}
    </Tag>
  );
}
