import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "formulário inválido" }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "arquivo ausente" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "não é imagem" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "imagem muito grande (máx 8MB)" }, { status: 400 });
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  try {
    const blob = await put(`patua/${Date.now()}-${safeName}`, file, {
      access: "public",
    });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: "falha ao salvar imagem" }, { status: 500 });
  }
}
