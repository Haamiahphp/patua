import Link from "next/link";

export function AdminShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-[var(--color-cream)]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-medium text-[var(--color-bark)]">
              Painel Patuá
            </Link>
            <nav className="flex items-center gap-4 text-sm text-[var(--color-bark)]/70">
              <Link href="/admin/blog" className="hover:text-[var(--color-bark)]">
                Blog
              </Link>
              <Link href="/" className="hover:text-[var(--color-bark)]">
                Ver site
              </Link>
            </nav>
          </div>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="text-sm text-[var(--color-bark)]/60 hover:text-[var(--color-bark)]">
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl text-[var(--color-bark)] md:text-3xl">
            {title}
          </h1>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
