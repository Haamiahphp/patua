# Patuá Admin — Fundação (Inline Editor) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a fundação do admin com login/senha e edição inline de texto e imagem, provada na seção Manifesto da Home, com conteúdo em Neon Postgres e imagens em Vercel Blob.

**Architecture:** Conteúdo editável vive numa tabela `content` (chave → valor jsonb) no Neon. Componentes server leem com `getContent(key, fallback)` (cache por tag, revalidado no save). Componentes client `<Editable>`/`<EditableImage>` viram editáveis quando há sessão admin e o modo edição está ligado; salvam via `PUT /api/content` e `POST /api/upload`. Auth por cookie JWT (jose) + senha com hash (bcrypt), protegida por middleware.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, bun, `@neondatabase/serverless`, `jose`, `bcryptjs`, `@vercel/blob`, `bun:test`.

---

## File Structure

**Criar:**
- `src/lib/content-key.ts` — validação pura de chave de conteúdo (`isValidKey`). Isolada p/ ser testável sem puxar neon/next.
- `src/lib/content.ts` — `getContent`/`setContent` (Neon + cache por tag).
- `src/lib/auth.ts` — `verifyPassword`, `createSession`, `verifySession`, `SESSION_COOKIE`.
- `src/lib/session.ts` — `getSession()` server helper (lê cookie + verifica).
- `src/lib/content-key.test.ts` — testes de `isValidKey` (bun:test).
- `src/lib/auth.test.ts` — testes de roundtrip de sessão e senha (bun:test).
- `src/app/admin/login/page.tsx` — formulário de login.
- `src/app/api/auth/login/route.ts` — autentica e seta cookie.
- `src/app/api/auth/logout/route.ts` — limpa cookie e redireciona.
- `src/app/api/content/route.ts` — `PUT` conteúdo (autenticado).
- `src/app/api/upload/route.ts` — `POST` imagem → Blob (autenticado).
- `src/middleware.ts` — protege `/api/content`, `/api/upload`, `/admin/*`.
- `src/components/editor/editor-provider.tsx` — contexto `isEditor`/`editMode`.
- `src/components/editor/editable.tsx` — `<Editable>` (texto).
- `src/components/editor/editable-image.tsx` — `<EditableImage>` (imagem).
- `src/components/editor/edit-toolbar.tsx` — barra flutuante.
- `scripts/db-setup.ts` — cria a tabela `content`.
- `scripts/hash-password.ts` — gera hash bcrypt p/ a env.
- `.env.local` — variáveis (não commitar).

**Modificar:**
- `src/app/layout.tsx` — virar async, ler sessão, envolver com `EditorProvider`, render `<EditToolbar>`.
- `src/components/home/manifesto.tsx` — virar async, usar `getContent` + `<Editable>`/`<EditableImage>`.
- `next.config.ts` — `images.remotePatterns` p/ o domínio do Blob.
- `package.json` — scripts `test`, `db:setup`, `hash`.

---

## Task 1: Instalar dependências e configurar env

**Files:**
- Modify: `package.json`
- Create: `.env.local`, `scripts/hash-password.ts`

- [ ] **Step 1: Instalar deps**

```bash
cd /Users/haamiah/patua-clone
bun add @neondatabase/serverless jose bcryptjs @vercel/blob
bun add -d @types/bcryptjs
```

- [ ] **Step 2: Criar script de hash de senha**

Create `scripts/hash-password.ts`:

```ts
import bcrypt from "bcryptjs";

const plain = process.argv[2];
if (!plain) {
  console.error("uso: bun run scripts/hash-password.ts <senha>");
  process.exit(1);
}
console.log(await bcrypt.hash(plain, 10));
```

- [ ] **Step 3: Gerar o hash da senha de admin**

Run: `bun run scripts/hash-password.ts "TROCAR-ESTA-SENHA"`
Expected: imprime uma string começando com `$2b$10$...`. Copie-a.

- [ ] **Step 4: Criar `.env.local`**

Create `.env.local` (substitua os valores; `SESSION_SECRET` = qualquer string aleatória longa; `DATABASE_URL` vem do Neon; `BLOB_READ_WRITE_TOKEN` vem do Vercel Blob):

```
DATABASE_URL="postgresql://...neon..."
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
SESSION_SECRET="cole-aqui-uma-string-aleatoria-de-pelo-menos-32-chars"
ADMIN_USERNAME="patua"
ADMIN_PASSWORD_HASH="$2b$10$...cole-o-hash-do-step-3..."
```

- [ ] **Step 5: Garantir que `.env.local` está no .gitignore**

Run: `grep -q ".env.local" .gitignore && echo OK || echo "ADD IT"`
Expected: `OK` (Next.js já ignora `.env*.local` por padrão no gitignore do create-next-app). Se aparecer `ADD IT`, adicione a linha `.env.local`.

- [ ] **Step 6: Commit**

```bash
git add package.json bun.lock scripts/hash-password.ts
git commit -m "chore: deps do admin (neon, jose, bcrypt, blob) + script de hash"
```

---

## Task 2: Validação de chave de conteúdo (TDD)

**Files:**
- Create: `src/lib/content-key.ts`
- Test: `src/lib/content-key.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Create `src/lib/content-key.test.ts`:

```ts
import { test, expect } from "bun:test";
import { isValidKey } from "./content-key";

test("aceita chaves namespaced válidas", () => {
  expect(isValidKey("home.manifesto.texto")).toBe(true);
  expect(isValidKey("home.hero.slide1.titulo")).toBe(true);
  expect(isValidKey("blog.post-1.cover")).toBe(true);
});

test("rejeita chaves inválidas", () => {
  expect(isValidKey("home")).toBe(false);          // sem ponto
  expect(isValidKey("Home.Manifesto")).toBe(false); // maiúsculas
  expect(isValidKey("home..texto")).toBe(false);    // ponto duplo
  expect(isValidKey("home.tex to")).toBe(false);    // espaço
  expect(isValidKey("")).toBe(false);
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `bun test src/lib/content-key.test.ts`
Expected: FAIL — `Cannot find module './content-key'`.

- [ ] **Step 3: Implementar**

Create `src/lib/content-key.ts`:

```ts
const KEY_RE = /^[a-z0-9]+(\.[a-z0-9-]+)+$/;

export function isValidKey(key: string): boolean {
  return KEY_RE.test(key);
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `bun test src/lib/content-key.test.ts`
Expected: PASS (2 testes).

- [ ] **Step 5: Adicionar script `test` ao package.json**

In `package.json`, dentro de `"scripts"`, adicionar:

```json
"test": "bun test"
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/content-key.ts src/lib/content-key.test.ts package.json
git commit -m "feat: validação de chave de conteúdo"
```

---

## Task 3: Lib de auth (TDD)

**Files:**
- Create: `src/lib/auth.ts`
- Test: `src/lib/auth.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Create `src/lib/auth.test.ts`:

```ts
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `bun test src/lib/auth.test.ts`
Expected: FAIL — `Cannot find module './auth'`.

- [ ] **Step 3: Implementar**

Create `src/lib/auth.ts`:

```ts
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE = "patua_session";

function secret(): Uint8Array {
  return new TextEncoder().encode(process.env.SESSION_SECRET!);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createSession(username: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(
  token: string | undefined,
): Promise<{ username: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return { username: String(payload.sub) };
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `bun test src/lib/auth.test.ts`
Expected: PASS (3 testes).

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth.ts src/lib/auth.test.ts
git commit -m "feat: lib de auth (sessão JWT + verificação de senha)"
```

---

## Task 4: Tabela `content` no Neon + lib de conteúdo

**Files:**
- Create: `scripts/db-setup.ts`, `src/lib/content.ts`
- Modify: `package.json`

- [ ] **Step 1: Criar script de setup do banco**

Create `scripts/db-setup.ts`:

```ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

await sql`
  create table if not exists content (
    key        text primary key,
    value      jsonb not null,
    updated_at timestamptz not null default now()
  )
`;

console.log("tabela 'content' pronta");
```

- [ ] **Step 2: Adicionar scripts ao package.json**

In `package.json`, dentro de `"scripts"`, adicionar:

```json
"db:setup": "bun --env-file=.env.local run scripts/db-setup.ts",
"hash": "bun run scripts/hash-password.ts"
```

- [ ] **Step 3: Rodar o setup do banco**

Run: `bun run db:setup`
Expected: imprime `tabela 'content' pronta` sem erros. (Pré-requisito: `DATABASE_URL` válido no `.env.local`.)

- [ ] **Step 4: Implementar a lib de conteúdo**

Create `src/lib/content.ts`:

```ts
import { neon } from "@neondatabase/serverless";
import { unstable_cache, revalidateTag } from "next/cache";
import { isValidKey } from "./content-key";

const sql = neon(process.env.DATABASE_URL!);

export type ContentValue = string | { url: string; alt?: string };

async function fetchContent(key: string): Promise<ContentValue | null> {
  const rows = await sql`select value from content where key = ${key}`;
  return rows.length ? (rows[0].value as ContentValue) : null;
}

export function getContent<T extends ContentValue>(
  key: string,
  fallback: T,
): Promise<T> {
  const cached = unstable_cache(
    async () => ((await fetchContent(key)) as T | null) ?? fallback,
    ["content", key],
    { tags: [`content:${key}`, "content"] },
  );
  return cached();
}

export async function setContent(key: string, value: ContentValue): Promise<void> {
  if (!isValidKey(key)) throw new Error(`chave inválida: ${key}`);
  await sql`
    insert into content (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}::jsonb, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
  revalidateTag(`content:${key}`);
  revalidateTag("content");
}
```

- [ ] **Step 5: Verificar que compila (typecheck)**

Run: `bunx tsc --noEmit`
Expected: sem erros relacionados a `src/lib/content.ts`.

- [ ] **Step 6: Commit**

```bash
git add scripts/db-setup.ts src/lib/content.ts package.json
git commit -m "feat: tabela content + lib getContent/setContent"
```

---

## Task 5: Session helper + middleware

**Files:**
- Create: `src/lib/session.ts`, `src/middleware.ts`

- [ ] **Step 1: Criar o session helper**

Create `src/lib/session.ts`:

```ts
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "./auth";

export async function getSession(): Promise<{ username: string } | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
```

- [ ] **Step 2: Criar o middleware**

Create `src/middleware.ts`:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

const PROTECTED_API = ["/api/content", "/api/upload"];

export async function middleware(req: NextRequest) {
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
  matcher: ["/api/content/:path*", "/api/upload/:path*", "/admin/:path*"],
};
```

- [ ] **Step 3: Verificar que compila**

Run: `bunx tsc --noEmit`
Expected: sem erros em `session.ts` / `middleware.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/session.ts src/middleware.ts
git commit -m "feat: session helper + middleware de proteção"
```

---

## Task 6: Rotas de auth (login/logout) + página de login

**Files:**
- Create: `src/app/api/auth/login/route.ts`, `src/app/api/auth/logout/route.ts`, `src/app/admin/login/page.tsx`

- [ ] **Step 1: Criar a rota de login**

Create `src/app/api/auth/login/route.ts`:

```ts
import { NextResponse } from "next/server";
import { verifyPassword, createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const okUser = username === process.env.ADMIN_USERNAME;
  const okPass =
    okUser && (await verifyPassword(password ?? "", process.env.ADMIN_PASSWORD_HASH!));
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
```

- [ ] **Step 2: Criar a rota de logout**

Create `src/app/api/auth/logout/route.ts`:

```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
```

- [ ] **Step 3: Criar a página de login**

Create `src/app/admin/login/page.tsx`:

```tsx
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
        <label className="mb-1 block text-sm text-[var(--color-bark)]/70">Usuário</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-lg border border-black/10 px-3 py-2"
          autoComplete="username"
        />
        <label className="mb-1 block text-sm text-[var(--color-bark)]/70">Senha</label>
        <input
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
```

- [ ] **Step 4: Verificar login manualmente**

Run: `bun --env-file=.env.local run dev` e em outro terminal:
```bash
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "content-type: application/json" \
  -d '{"username":"patua","password":"TROCAR-ESTA-SENHA"}'
```
Expected: `HTTP/1.1 200 OK` e um header `set-cookie: patua_session=...`. Com senha errada: `401`.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/auth src/app/admin/login
git commit -m "feat: rotas de login/logout + página de login"
```

---

## Task 7: Rota PUT de conteúdo + POST de upload

**Files:**
- Create: `src/app/api/content/route.ts`, `src/app/api/upload/route.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Criar a rota de conteúdo**

Create `src/app/api/content/route.ts`:

```ts
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
```

- [ ] **Step 2: Criar a rota de upload**

Create `src/app/api/upload/route.ts`:

```ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
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
  const blob = await put(`patua/${Date.now()}-${safeName}`, file, { access: "public" });
  return NextResponse.json({ url: blob.url });
}
```

- [ ] **Step 3: Permitir imagens remotas do Blob no next/image**

Replace `next.config.ts` content:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verificar proteção das rotas (sem cookie → 401)**

Com o dev server rodando:
```bash
curl -i -X PUT http://localhost:3000/api/content \
  -H "content-type: application/json" -d '{"key":"home.manifesto.texto","value":"x"}'
```
Expected: `401` (middleware bloqueia sem sessão).

- [ ] **Step 5: Commit**

```bash
git add src/app/api/content src/app/api/upload next.config.ts
git commit -m "feat: rotas de conteúdo (PUT) e upload (POST) + blob no next/image"
```

---

## Task 8: EditorProvider + EditToolbar + wiring no layout

**Files:**
- Create: `src/components/editor/editor-provider.tsx`, `src/components/editor/edit-toolbar.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Criar o EditorProvider**

Create `src/components/editor/editor-provider.tsx`:

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type EditorCtx = {
  isEditor: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
};

const Ctx = createContext<EditorCtx>({
  isEditor: false,
  editMode: false,
  setEditMode: () => {},
});

export const useEditor = () => useContext(Ctx);

export function EditorProvider({
  isEditor,
  children,
}: {
  isEditor: boolean;
  children: React.ReactNode;
}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Ctx.Provider value={{ isEditor, editMode, setEditMode }}>
      {children}
    </Ctx.Provider>
  );
}
```

- [ ] **Step 2: Criar a EditToolbar**

Create `src/components/editor/edit-toolbar.tsx`:

```tsx
"use client";

import { useEditor } from "./editor-provider";

export function EditToolbar() {
  const { isEditor, editMode, setEditMode } = useEditor();
  if (!isEditor) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[var(--color-bark)] px-5 py-3 text-sm text-[var(--color-cream)] shadow-lg">
      <span>{editMode ? "Editando" : "Visualizando"}</span>
      <button
        onClick={() => setEditMode(!editMode)}
        className="rounded-full bg-[var(--color-terracotta)] px-4 py-1.5 font-medium text-white"
      >
        {editMode ? "Sair da edição" : "Editar"}
      </button>
      <a href="/api/auth/logout" className="opacity-70 hover:opacity-100">
        Sair
      </a>
    </div>
  );
}
```

- [ ] **Step 3: Conectar no layout**

In `src/app/layout.tsx`: adicionar imports no topo (junto aos demais):

```tsx
import { getSession } from "@/lib/session";
import { EditorProvider } from "@/components/editor/editor-provider";
import { EditToolbar } from "@/components/editor/edit-toolbar";
```

Trocar a assinatura para async e envolver o conteúdo do `<body>`. Substituir o bloco `export default function RootLayout(...) { return (...) }` por:

```tsx
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <html lang="pt-BR" className={`${rawline.variable} ${fragmentMono.variable}`}>
      <body className="bg-[var(--color-cream)] text-[var(--color-bark)] antialiased">
        <EditorProvider isEditor={!!session}>
          <SmoothScroll>
            <ScrollToTop />
            <SiteHeader />
            <main className="relative">{children}</main>
            <SiteFooter />
          </SmoothScroll>
          <EditToolbar />
        </EditorProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verificar que a toolbar aparece só logado**

Com o dev server rodando: abrir `http://localhost:3000/` sem login → **sem** barra flutuante. Fazer login em `/admin/login` → redireciona para `/` e a barra "Visualizando / Editar / Sair" aparece embaixo.
Expected: comportamento acima confirmado no navegador.

- [ ] **Step 5: Commit**

```bash
git add src/components/editor/editor-provider.tsx src/components/editor/edit-toolbar.tsx src/app/layout.tsx
git commit -m "feat: editor provider + barra de edição no layout"
```

---

## Task 9: Componente Editable (texto)

**Files:**
- Create: `src/components/editor/editable.tsx`

- [ ] **Step 1: Implementar o Editable**

Create `src/components/editor/editable.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { useEditor } from "./editor-provider";

type EditableProps = {
  id: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
  children: React.ReactNode;
};

export function Editable({ id, as = "span", className, children }: EditableProps) {
  const { isEditor, editMode } = useEditor();
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const Tag = as as React.ElementType;

  if (!isEditor || !editMode) {
    return <Tag className={className}>{children}</Tag>;
  }

  async function save() {
    const value = ref.current?.innerText?.trim() ?? "";
    setStatus("saving");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key: id, value }),
    });
    setStatus(res.ok ? "saved" : "idle");
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={save}
      data-status={status}
      className={`${className ?? ""} cursor-text rounded-sm outline-dashed outline-1 outline-[var(--color-terracotta)] focus:outline-2 data-[status=saving]:opacity-60`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verificar que compila**

Run: `bunx tsc --noEmit`
Expected: sem erros em `editable.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/editor/editable.tsx
git commit -m "feat: componente Editable (texto inline)"
```

---

## Task 10: Componente EditableImage

**Files:**
- Create: `src/components/editor/editable-image.tsx`

- [ ] **Step 1: Implementar o EditableImage**

Create `src/components/editor/editable-image.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useEditor } from "./editor-provider";

type EditableImageProps = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
};

export function EditableImage({
  id,
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
}: EditableImageProps) {
  const { isEditor, editMode } = useEditor();
  const [url, setUrl] = useState(src);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const img = (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      className={className}
    />
  );

  if (!isEditor || !editMode) return img;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const up = await fetch("/api/upload", { method: "POST", body: fd }).then((r) =>
      r.json(),
    );
    if (up.url) {
      setUrl(up.url);
      await fetch("/api/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: id, value: { url: up.url, alt } }),
      });
    }
    setBusy(false);
  }

  return (
    <span className="relative inline-block">
      {img}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white opacity-0 transition hover:opacity-100"
      >
        {busy ? "Enviando…" : "Trocar imagem"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onPick}
      />
    </span>
  );
}
```

- [ ] **Step 2: Verificar que compila**

Run: `bunx tsc --noEmit`
Expected: sem erros em `editable-image.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/editor/editable-image.tsx
git commit -m "feat: componente EditableImage (troca de imagem inline)"
```

---

## Task 11: Provar a fundação na seção Manifesto

**Files:**
- Modify: `src/components/home/manifesto.tsx`

- [ ] **Step 1: Migrar o Manifesto para conteúdo editável**

Replace `src/components/home/manifesto.tsx` content:

```tsx
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

const WORDMARK_FALLBACK = "/images/g48RVMC75t4soXPzIMLxkJiktPs.png"; // 587×288 cream empilhado
const TEXT_FALLBACK =
  "Encante-se com peças que unem brasilidade, design autoral e contemporaneidade, fio a fio.";

export async function Manifesto() {
  const wordmark = await getContent("home.manifesto.wordmark", {
    url: WORDMARK_FALLBACK,
    alt: "Patuá — Artesania Brasileira",
  });
  const text = await getContent("home.manifesto.texto", TEXT_FALLBACK);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-terracotta)] py-[var(--space-section-md)] text-[var(--color-cream-light)] md:py-[var(--space-section-lg)]">
      <div className="mx-auto flex w-full max-w-[var(--container-prose)] flex-col items-center px-4 text-center md:px-10">
        <Reveal>
          <EditableImage
            id="home.manifesto.wordmark"
            src={wordmark.url}
            alt={wordmark.alt ?? "Patuá — Artesania Brasileira"}
            width={587}
            height={288}
            priority
            className="h-auto w-[clamp(320px,52vw,720px)]"
          />
        </Reveal>

        <Reveal delay={0.3} className="mt-20 md:mt-28">
          <Editable
            id="home.manifesto.texto"
            as="p"
            className="mx-auto max-w-[44ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-xl"
          >
            {text}
          </Editable>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar que compila e builda**

Run: `bunx tsc --noEmit && bun --env-file=.env.local run build`
Expected: typecheck limpo; build conclui sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/manifesto.tsx
git commit -m "feat: Manifesto editável (texto + wordmark) — prova da fundação"
```

---

## Task 12: Verificação end-to-end

**Files:** nenhum (verificação manual)

- [ ] **Step 1: Subir o dev server**

Run: `bun --env-file=.env.local run dev`

- [ ] **Step 2: Fluxo completo no navegador**

1. Abrir `http://localhost:3000/` deslogado → seção Manifesto mostra o texto/wordmark atuais; **sem** barra de edição.
2. Ir em `/admin/login`, logar com `ADMIN_USERNAME` + senha → volta para `/` com a barra embaixo.
3. Clicar **Editar**. O parágrafo do Manifesto fica com contorno tracejado e editável.
4. Mudar o texto e clicar fora (blur). Passar o mouse sobre o wordmark → botão "Trocar imagem"; subir um PNG/JPG → imagem troca.
5. Clicar **Sair da edição**, dar **reload** na página deslogado (aba anônima ou `/api/auth/logout`).

Expected: o texto novo e a imagem nova **persistem** após reload (vieram do Neon/Blob via `getContent`, com cache revalidado no save).

- [ ] **Step 3: Confirmar persistência no banco**

Run: `bun --env-file=.env.local run scripts/db-setup.ts` (idempotente) e, opcional, uma query rápida no console do Neon:
```sql
select key, value from content;
```
Expected: linhas `home.manifesto.texto` e `home.manifesto.wordmark` com os valores novos.

- [ ] **Step 4: Rodar a suíte de testes inteira**

Run: `bun test`
Expected: todos os testes passam (content-key + auth).

- [ ] **Step 5: Commit final (se houver ajustes)**

```bash
git add -A
git commit -m "chore: fundação do admin verificada end-to-end" || echo "nada a commitar"
```

---

## Notas de deploy (Vercel)

Ao subir pra Vercel (fora do escopo de tasks, mas necessário pra produção):
- Adicionar no projeto Vercel as env vars: `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`.
- Provisionar Neon e Vercel Blob via Vercel Marketplace/Storage (preenche `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN` automaticamente).
- Rodar o setup da tabela uma vez (via console do Neon ou `bun run db:setup` com `DATABASE_URL` de produção).

## Próximos planos (fora deste plano)
- **Fase 2 — Home completa:** aplicar `<Editable>`/`<EditableImage>` em hero (com pausa do autoplay em edição), services, process, universe, gallery, portfolio, cta, header, footer.
- **Fase 3 — demais páginas:** Sobre, Contato, Coleções, Peças/Serviços.
- **Fase 4 — Blog CMS:** tabela `blog_posts`, editor Tiptap, telas `/admin`, render público (spec próprio).
