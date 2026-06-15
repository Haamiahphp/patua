import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createPost, type PostStatus } from "@/lib/blog";
import { sanitizePostBody } from "@/lib/sanitize";

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
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

  const result = await createPost({
    title,
    slug: typeof data.slug === "string" ? data.slug : undefined,
    coverUrl: typeof data.coverUrl === "string" ? data.coverUrl : null,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : null,
    body: sanitizePostBody(typeof data.body === "string" ? data.body : ""),
    status,
  });

  return NextResponse.json({ ok: true, ...result });
}
