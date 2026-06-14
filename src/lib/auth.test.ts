import { test, expect, beforeAll } from "bun:test";
import bcrypt from "bcryptjs";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-secret-com-pelo-menos-32-caracteres-aqui";
});

test("createSession/verifySession faz roundtrip", async () => {
  const { createSession, verifySession } = await import("./auth");
  const token = await createSession("patua");
  const session = await verifySession(token);
  expect(session?.username).toBe("patua");
});

test("verifySession rejeita token inválido ou ausente", async () => {
  const { verifySession } = await import("./auth");
  expect(await verifySession(undefined)).toBeNull();
  expect(await verifySession("lixo.nao.e.jwt")).toBeNull();
});

test("verifyPassword bate hash correto e rejeita errado", async () => {
  const { verifyPassword } = await import("./auth");
  const hash = await bcrypt.hash("segredo123", 10);
  expect(await verifyPassword("segredo123", hash)).toBe(true);
  expect(await verifyPassword("errado", hash)).toBe(false);
});
