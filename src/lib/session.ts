import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "./auth";

export async function getSession(): Promise<{ username: string } | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
