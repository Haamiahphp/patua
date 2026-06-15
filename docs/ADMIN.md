# Patuá — Admin / Editor inline + Blog CMS

Sistema de administração estilo "website builder": login/senha, edição inline de
textos e imagens em todas as páginas principais, e um CRM de blog com editor
rich-text. Tudo roda na própria Vercel (Neon Postgres + Vercel Blob).

## Como funciona

- **Login:** `/admin/login`. A sessão é um cookie httpOnly assinado (JWT).
- **Editar o site:** depois de logar, abra qualquer página. Aparece uma barra no
  rodapé ("Visualizando / Editar"). Clique **Editar** → textos ganham contorno
  tracejado (clique e digite, salva ao sair do campo); passe o mouse sobre as
  imagens → **Trocar imagem** (upload). As mudanças aparecem no site público na
  hora (sem redeploy).
- **Blog:** barra de edição → **Blog**, ou vá em `/admin/blog`. Criar, editar,
  publicar/despublicar e excluir textos, com capa, resumo e editor WYSIWYG
  (negrito, itálico, H2/H3, listas, citação, link, imagem inline). Render público
  em `/blog` e `/blog/[slug]`.

## Modo de degradação (sem banco)

Sem `DATABASE_URL`, o site roda **somente leitura**: mostra os textos/imagens
originais (fallbacks no código) e o blog fica vazio. Build e dev funcionam mesmo
sem infra — útil para rodar localmente sem configurar nada.

## Variáveis de ambiente

| Var | Onde | Para quê |
|-----|------|----------|
| `DATABASE_URL` | Neon | Content store + blog. Sem ela = só leitura. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Upload de imagens novas. |
| `SESSION_SECRET` | gerar (`openssl rand -hex 32`) | Assina o cookie de sessão. |
| `ADMIN_USERNAME` | você define | Usuário do login. |
| `ADMIN_PASSWORD_HASH` | **produção (Vercel)** | Hash bcrypt da senha. |
| `ADMIN_PASSWORD` | **só dev local** | Senha em texto puro (ver nota abaixo). |

> ⚠️ **Gotcha do `$` em arquivos `.env`:** o Next re-interpola valores com `$`,
> o que **corrompe o hash bcrypt** (`$2b$10$...`) em `.env`/`.env.local`. Por isso,
> **localmente** use `ADMIN_PASSWORD` (texto puro, sem `$`). Na **Vercel** os valores
> são literais — lá use `ADMIN_PASSWORD_HASH` e **não** defina `ADMIN_PASSWORD`.

Gerar o hash bcrypt:
```bash
bun run scripts/hash-password.ts "suaSenhaForte"
```

## Setup local (dev)

1. `.env.local` já existe com `ADMIN_USERNAME=patua` / `ADMIN_PASSWORD=patua-admin-dev`
   e um `SESSION_SECRET`. (Sem `DATABASE_URL`/Blob = modo só leitura.)
2. Para testar edição de verdade localmente, cole um `DATABASE_URL` do Neon no
   `.env.local` e rode o setup das tabelas:
   ```bash
   bun --env-file=.env.local run scripts/db-setup.ts
   ```
3. `bun --env-file=.env.local run dev` → http://localhost:3000

## Deploy na Vercel

1. **Neon:** Vercel → Storage → criar Postgres (Neon). Preenche `DATABASE_URL`.
2. **Blob:** Vercel → Storage → criar Blob. Preenche `BLOB_READ_WRITE_TOKEN`.
3. **Env vars** no projeto Vercel:
   - `SESSION_SECRET` = `openssl rand -hex 32`
   - `ADMIN_USERNAME` = ex. `patua`
   - `ADMIN_PASSWORD_HASH` = saída de `hash-password.ts` (colar literal, sem escapar)
   - (não definir `ADMIN_PASSWORD` em produção)
4. **Criar as tabelas** uma vez (com o `DATABASE_URL` de produção):
   ```bash
   DATABASE_URL="postgres://...prod..." bun run scripts/db-setup.ts
   ```
   (ou rode o SQL do `scripts/db-setup.ts` no console do Neon)
5. Deploy. Logar em `/admin/login` e validar edição + blog.

## Arquitetura (resumo)

- `src/lib/content.ts` — content store key-value (Neon) + cache por tag + revalidação.
- `src/components/editor/*` — `Editable`, `EditableImage`, `EditorProvider`, `EditToolbar`.
- `src/lib/blog.ts` — CRUD de posts + leituras cacheadas.
- `src/lib/sanitize.ts` — sanitização do HTML do blog (no save).
- `src/app/api/content|upload|blog/*` — rotas de escrita (protegidas).
- `src/proxy.ts` — protege `/admin/*` e as APIs de escrita.
- Specs: `docs/superpowers/specs/2026-06-14-patua-admin-design.md` e
  `…-patua-blog-cms-design.md`.
