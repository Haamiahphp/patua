# Patuá — Blog CMS (Fase 4) — Design

**Data:** 2026-06-14
**Projeto:** `/Users/haamiah/patua-clone`
**Status:** aprovado para implementação
**Depende de:** fundação do admin (auth, content store, Vercel Blob) — já pronta.

## Objetivo

Dar à cliente um CRM de blog ("Universo / Textos") com editor rich-text (WYSIWYG):
criar, editar, publicar/despublicar e remover posts, com imagem de capa e imagens no
corpo. Render público em `/blog` (lista) e `/blog/[slug]` (post).

## Stack

- **Banco:** Neon Postgres (mesma conexão da fundação, `lib/content.ts` → reaproveita driver). Tabela nova `blog_posts`.
- **Editor:** Tiptap (`@tiptap/react` + `@tiptap/starter-kit` + extensões `image` e `link`). `immediatelyRender: false` (Next SSR).
- **Imagens:** Vercel Blob via `/api/upload` (já existe). Capa e imagens inline.
- **Sanitização:** `sanitize-html` no servidor, no momento do SAVE (armazena HTML já limpo) — defesa contra XSS. Render usa `dangerouslySetInnerHTML` sobre HTML confiável.
- **Auth:** mesma sessão JWT. Proxy protege `/admin/*` e passa a proteger `/api/blog/*`.
- **IDs/slug:** `crypto.randomUUID()` no app (não depende de extensão PG). Slug derivado do título (slugify) com unicidade garantida (sufixo `-2`, `-3`…), editável manualmente.

## Modelo de dados

```sql
create table if not exists blog_posts (
  id           uuid primary key,
  slug         text unique not null,
  title        text not null,
  cover_url    text,
  excerpt      text,
  body         text not null,          -- HTML sanitizado
  status       text not null default 'draft',  -- 'draft' | 'published'
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists blog_posts_status_pub_idx on blog_posts (status, published_at desc);
```

Criada por `scripts/db-setup.ts` (idempotente, junto da tabela `content`).

## Camada de dados — `lib/blog.ts`

Degrada como `content.ts` (sem `DATABASE_URL`: leituras retornam `[]`/`null`, escritas lançam erro claro).

- `listPublished()` — posts `status='published'` ordenados por `published_at desc`. Cacheado, tag `blog`.
- `getPublishedBySlug(slug)` — post publicado. Cacheado, tags `blog`, `blog:<slug>`.
- `listAll()` — todos (admin, sem cache).
- `getById(id)` — um (admin).
- `createPost(input)` / `updatePost(id, input)` / `deletePost(id)` — escrita; revalidam tags `blog` (+ slug).
- `publishPost`/`unpublishPost` embutidos no update via `status`.

## APIs (route handlers, protegidas)

- `POST /api/blog` — cria (body: title, slug?, coverUrl?, excerpt?, body(HTML), status). Sanitiza `body`. Retorna `{ id, slug }`.
- `PUT /api/blog/[id]` — atualiza. Sanitiza `body`. Ajusta `published_at` ao publicar.
- `DELETE /api/blog/[id]` — remove.
- Reuso de `POST /api/upload` para capa e imagens inline.
- Todas exigem sessão (checagem no handler + proxy).

## Telas admin (sob `/admin`, já protegidas pelo proxy)

- `/admin` — dashboard: "Editar o site" (link p/ home com aviso de usar a barra) + "Blog".
- `/admin/blog` — lista (título, status, atualizado em, ações: editar / excluir) + botão "Novo texto".
- `/admin/blog/new` — editor de criação.
- `/admin/blog/[id]` — editor de edição (com Excluir + Publicar/Despublicar).

Editor (client, Tiptap): campos título, slug (auto do título, editável), capa (upload), resumo, corpo WYSIWYG (negrito, itálico, H2/H3, listas, citação, link, imagem inline via upload). Barra de ações: Salvar rascunho · Publicar/Despublicar · (Excluir).

## Render público

- `/blog` — lista de publicados (capa, título, resumo, data). Sem posts → estado vazio elegante (mantém a linguagem visual atual "Textos").
- `/blog/[slug]` — capa, título, data, corpo (HTML sanitizado). `notFound()` se não publicado/inexistente. `generateMetadata` com title/excerpt.

## Segurança

- Sanitização server-side no save (allowlist: h2,h3,p,strong,em,u,s,blockquote,ul,ol,li,a[href rel target],img[src alt],br,hr,code,pre). `a` recebe `rel="noopener nofollow"` e `target="_blank"`.
- Escrita só com sessão válida; validação de tipos no handler.
- Upload já valida tipo/tamanho.

## Fora de escopo (v1)

- Categorias/tags, busca, paginação, agendamento de publicação, rascunhos múltiplos por autor, comentários.
