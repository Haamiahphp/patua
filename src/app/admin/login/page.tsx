"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) router.push("/");
    else setError("Credenciais inválidas");
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[var(--color-cream)] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-xl font-medium text-[var(--color-bark)]">
          Painel Patuá
        </h1>
        <label htmlFor="username" className="mb-1 block text-sm text-[var(--color-bark)]/70">Usuário</label>
        <input
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-lg border border-black/10 px-3 py-2"
          autoComplete="username"
        />
        <label htmlFor="password" className="mb-1 block text-sm text-[var(--color-bark)]/70">Senha</label>
        <input
          id="password"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-black/10 px-3 py-2"
          autoComplete="current-password"
        />
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[var(--color-terracotta)] py-2.5 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
