import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

await sql`
  create table if not exists content (
    key        text primary key,
    value      jsonb not null,
    updated_at timestamptz not null default now()
  )
`;

await sql`
  create table if not exists blog_posts (
    id           uuid primary key,
    slug         text unique not null,
    title        text not null,
    cover_url    text,
    excerpt      text,
    body         text not null,
    status       text not null default 'draft',
    published_at timestamptz,
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now()
  )
`;

await sql`
  create index if not exists blog_posts_status_pub_idx
    on blog_posts (status, published_at desc)
`;

console.log("tabelas 'content' e 'blog_posts' prontas");
