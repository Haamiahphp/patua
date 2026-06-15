import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { revalidateTag, unstable_cache } from "next/cache";
import { slugify } from "./slug";

export type PostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  excerpt: string | null;
  body: string;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  title: string;
  slug?: string;
  coverUrl?: string | null;
  excerpt?: string | null;
  body: string; // já sanitizado pela rota
  status: PostStatus;
};

const TAG_ALL = "blog";
const tagSlug = (slug: string) => `blog:${slug}`;

// Conexão preguiçosa (mesmo padrão de content.ts): sem DATABASE_URL o blog
// público renderiza vazio e o build passa; a escrita exige banco.
let _sql: NeonQueryFunction<false, false> | null | undefined;
function db(): NeonQueryFunction<false, false> | null {
  if (_sql === undefined) {
    _sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
  }
  return _sql;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRow(r: any): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    coverUrl: r.cover_url ?? null,
    excerpt: r.excerpt ?? null,
    body: r.body,
    status: r.status as PostStatus,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ---------- leituras públicas (cacheadas) ---------- */

export function listPublished(): Promise<BlogPost[]> {
  const cached = unstable_cache(
    async () => {
      const sql = db();
      if (!sql) return [];
      try {
        const rows = await sql`
          select * from blog_posts
          where status = 'published'
          order by published_at desc nulls last, created_at desc
        `;
        return rows.map(mapRow);
      } catch (err) {
        console.error("[blog] listPublished falhou:", err);
        return [];
      }
    },
    ["blog", "published"],
    { tags: [TAG_ALL] },
  );
  return cached();
}

export function getPublishedBySlug(slug: string): Promise<BlogPost | null> {
  const cached = unstable_cache(
    async () => {
      const sql = db();
      if (!sql) return null;
      try {
        const rows = await sql`
          select * from blog_posts
          where slug = ${slug} and status = 'published'
          limit 1
        `;
        return rows.length ? mapRow(rows[0]) : null;
      } catch (err) {
        console.error("[blog] getPublishedBySlug falhou:", err);
        return null;
      }
    },
    ["blog", "slug", slug],
    { tags: [TAG_ALL, tagSlug(slug)] },
  );
  return cached();
}

/* ---------- leituras admin (sem cache) ---------- */

export async function listAll(): Promise<BlogPost[]> {
  const sql = db();
  if (!sql) return [];
  const rows = await sql`select * from blog_posts order by updated_at desc`;
  return rows.map(mapRow);
}

export async function getById(id: string): Promise<BlogPost | null> {
  const sql = db();
  if (!sql) return null;
  const rows = await sql`select * from blog_posts where id = ${id} limit 1`;
  return rows.length ? mapRow(rows[0]) : null;
}

/* ---------- escrita ---------- */

async function uniqueSlug(
  sql: NeonQueryFunction<false, false>,
  base: string,
  ignoreId?: string,
): Promise<string> {
  const root = slugify(base) || "texto";
  let candidate = root;
  let n = 2;
  // tenta até achar um slug livre
  for (;;) {
    const rows = ignoreId
      ? await sql`select 1 from blog_posts where slug = ${candidate} and id <> ${ignoreId} limit 1`
      : await sql`select 1 from blog_posts where slug = ${candidate} limit 1`;
    if (rows.length === 0) return candidate;
    candidate = `${root}-${n++}`;
  }
}

export async function createPost(input: PostInput): Promise<{ id: string; slug: string }> {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL não configurado — escrita indisponível");
  const id = crypto.randomUUID();
  const slug = await uniqueSlug(sql, input.slug || input.title);
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;
  await sql`
    insert into blog_posts (id, slug, title, cover_url, excerpt, body, status, published_at)
    values (
      ${id}, ${slug}, ${input.title}, ${input.coverUrl ?? null},
      ${input.excerpt ?? null}, ${input.body}, ${input.status}, ${publishedAt}
    )
  `;
  revalidateTag(TAG_ALL, { expire: 0 });
  revalidateTag(tagSlug(slug), { expire: 0 });
  return { id, slug };
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<{ id: string; slug: string }> {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL não configurado — escrita indisponível");
  const existing = await getById(id);
  if (!existing) throw new Error("post não encontrado");
  const slug = await uniqueSlug(sql, input.slug || input.title, id);
  // define published_at na primeira publicação; preserva se já publicado; zera ao virar rascunho
  let publishedAt = existing.publishedAt;
  if (input.status === "published" && !existing.publishedAt) {
    publishedAt = new Date().toISOString();
  } else if (input.status === "draft") {
    publishedAt = null;
  }
  await sql`
    update blog_posts set
      slug = ${slug},
      title = ${input.title},
      cover_url = ${input.coverUrl ?? null},
      excerpt = ${input.excerpt ?? null},
      body = ${input.body},
      status = ${input.status},
      published_at = ${publishedAt},
      updated_at = now()
    where id = ${id}
  `;
  revalidateTag(TAG_ALL, { expire: 0 });
  revalidateTag(tagSlug(slug), { expire: 0 });
  if (existing.slug !== slug) revalidateTag(tagSlug(existing.slug), { expire: 0 });
  return { id, slug };
}

export async function deletePost(id: string): Promise<void> {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL não configurado — escrita indisponível");
  const existing = await getById(id);
  await sql`delete from blog_posts where id = ${id}`;
  revalidateTag(TAG_ALL, { expire: 0 });
  if (existing) revalidateTag(tagSlug(existing.slug), { expire: 0 });
}
