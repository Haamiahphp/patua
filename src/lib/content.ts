import { neon } from "@neondatabase/serverless";
import { revalidateTag, unstable_cache } from "next/cache";
import { isValidKey } from "./content-key";

const sql = neon(process.env.DATABASE_URL!);

export type ContentValue = string | { url: string; alt?: string };

function tagFor(key: string): string {
  return `content:${key}`;
}

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
    { tags: [tagFor(key), "content"] },
  );
  return cached();
}

export async function setContent(
  key: string,
  value: ContentValue,
): Promise<void> {
  if (!isValidKey(key)) throw new Error(`chave inválida: ${key}`);
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
