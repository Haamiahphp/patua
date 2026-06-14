import { NextResponse } from "next/server";
import { verifyPassword, createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const { username, password } = await req.json();
  const okUser = username === process.env.ADMIN_USERNAME;
  const okPass = okUser && !!hash && (await verifyPassword(password ?? "", hash));
  if (!okUser || !okPass) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }
  const token = await createSession(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
