import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

const PROTECTED_API = ["/api/content", "/api/upload", "/api/blog"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  if (PROTECTED_API.some((p) => pathname.startsWith(p)) && !session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/content/:path*",
    "/api/upload/:path*",
    "/api/blog/:path*",
    "/admin/:path*",
  ],
};
