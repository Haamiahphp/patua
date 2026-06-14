import { NextResponse } from "next/server";
import { setContent } from "@/lib/content";
import { isValidKey } from "@/lib/content-key";
import { getSession } from "@/lib/session";

export async function PUT(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let key: unknown;
  let value: unknown;
  try {
    ({ key, value } = await req.json());
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (typeof key !== "string" || !isValidKey(key)) {
    return NextResponse.json({ error: "chave inválida" }, { status: 400 });
  }
  await setContent(key, value as Parameters<typeof setContent>[1]);
  return NextResponse.json({ ok: true });
}
