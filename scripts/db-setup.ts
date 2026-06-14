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
