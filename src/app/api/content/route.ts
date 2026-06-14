import { NextResponse } from "next/server";
import { setContent } from "@/lib/content";
import { isValidKey } from "@/lib/content-key";
import { getSession } from "@/lib/session";

export async function PUT(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { key, value } = await req.json();
  if (typeof key !== "string" || !isValidKey(key)) {
    return NextResponse.json({ error: "chave inválida" }, { status: 400 });
  }
  await setContent(key, value);
  return NextResponse.json({ ok: true });
}
