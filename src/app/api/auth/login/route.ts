import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { verifyPassword, createSession, SESSION_COOKIE } from "@/lib/auth";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export async function POST(req: Request) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  // Fallback de DEV: senha em texto puro. Usado SÓ quando não há hash bcrypt
  // (o Next corrompe `$` em arquivos .env, então localmente usa-se ADMIN_PASSWORD).
  // Em produção (Vercel) defina ADMIN_PASSWORD_HASH — os valores lá são literais.
  const plain = process.env.ADMIN_PASSWORD;
  const { username, password } = await req.json();
  const okUser = username === process.env.ADMIN_USERNAME;
  let okPass = false;
  if (okUser && hash) {
    okPass = await verifyPassword(password ?? "", hash);
  } else if (okUser && plain) {
    okPass = safeEqual(password ?? "", plain);
  }
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
