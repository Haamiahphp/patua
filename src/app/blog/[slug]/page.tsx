import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { getPublishedBySlug } from "@/lib/blog";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Patuá Artesania Brasileira`,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: post.coverUrl ? { images: [post.coverUrl] } : undefined,
  };
}

function fmt(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPublishedBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-[var(--color-cream)] pt-32 pb-32 md:pt-40 md:pb-40">
      <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
        <Reveal>
          <Link
            href="/blog"
            className="text-sm text-[var(--color-bark)]/60 transition-colors hover:text-[var(--color-bark)]"
          >
            ← Universo
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--color-bark)]/50">
            {fmt(post.publishedAt)}
          </p>
          <h1 className="font-display mt-3 text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]">
            {post.title}
          </h1>
        </Reveal>

        {post.coverUrl ? (
          <Reveal delay={0.1}>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2px] bg-[var(--color-bark)]/10 md:mt-14">
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.15}>
          <div
            className="prose-patua mt-12 md:mt-16"
            // body já sanitizado no servidor (lib/sanitize) antes de salvar
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </Reveal>
      </div>
    </article>
  );
}
