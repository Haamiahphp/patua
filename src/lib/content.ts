import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { revalidateTag, unstable_cache } from "next/cache";
import { isValidKey } from "./content-key";

export type ContentValue = string | { url: string; alt?: string };

// Conexão preguiçosa: sem DATABASE_URL o site ainda renderiza (usa os
// fallbacks hardcoded) e o build passa. Só a escrita exige banco.
let _sql: NeonQueryFunction<false, false> | null | undefined;
function db(): NeonQueryFunction<false, false> | null {
  if (_sql === undefined) {
    _sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
  }
  return _sql;
}

function tagFor(key: string): string {
  return `content:${key}`;
}

async function fetchContent(key: string): Promise<ContentValue | null> {
  const sql = db();
  if (!sql) return null; // sem banco → cai no fallback
  try {
    const rows = await sql`select value from content where key = ${key}`;
    return rows.length ? (rows[0].value as ContentValue) : null;
  } catch (err) {
    // erro transitório do banco não deve derrubar a página pública
    console.error(`[content] falha ao ler "${key}":`, err);
    return null;
  }
}

export function getContent<T extends ContentValue>(
  key: string,
  fallback: T,
): Promise<T> {
  const cached = unstable_cache(
    async () => ((await fetchContent(key)) as T | null) ?? fallback,
    ["content", key],
    { tags: [tagFor(key), "content"] },
  );
  return cached();
}

export async function setContent(
  key: string,
  value: ContentValue,
): Promise<void> {
  if (!isValidKey(key)) throw new Error(`chave inválida: ${key}`);
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL não configurado — escrita indisponível");
  await sql`
    insert into content (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}::jsonb, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
  // expire: 0 = invalidação imediata (read-your-own-writes), válida tanto em
  // Server Actions quanto em Route Handlers. revalidateTag(tag, "max") daria
  // apenas stale-while-revalidate, e updateTag só funciona em Server Actions.
  revalidateTag(tagFor(key), { expire: 0 });
  revalidateTag("content", { expire: 0 });
}
