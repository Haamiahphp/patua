import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updatePost, deletePost, type PostStatus } from "@/lib/blog";
import { sanitizePostBody } from "@/lib/sanitize";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "título obrigatório" }, { status: 400 });
  }
  const status: PostStatus = data.status === "published" ? "published" : "draft";

  try {
    const result = await updatePost(id, {
      title,
      slug: typeof data.slug === "string" ? data.slug : undefined,
      coverUrl: typeof data.coverUrl === "string" ? data.coverUrl : null,
      excerpt: typeof data.excerpt === "string" ? data.excerpt : null,
      body: sanitizePostBody(typeof data.body === "string" ? data.body : ""),
      status,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "erro ao salvar";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
