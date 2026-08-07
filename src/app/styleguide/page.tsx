import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Style Guide — Patuá Artesania Brasileira",
  robots: { index: false, follow: false },
};

const COLORS: { name: string; token: string; hex: string; on?: "light" | "dark" }[] = [
  { name: "cream",            token: "--color-cream",            hex: "#ece4d9", on: "dark" },
  { name: "cream-light",      token: "--color-cream-light",      hex: "#fff3db", on: "dark" },
  { name: "bark",             token: "--color-bark",             hex: "#51301f", on: "light" },
  { name: "bark-soft",        token: "--color-bark-soft",        hex: "#8a6b4c", on: "light" },
  { name: "bark-light",       token: "--color-bark-light",       hex: "#aa8867", on: "light" },
  { name: "terracotta",       token: "--color-terracotta",       hex: "#b95744", on: "light" },
  { name: "terracotta-deep",  token: "--color-terracotta-deep",  hex: "#7a3110", on: "light" },
  { name: "mustard",          token: "--color-mustard",          hex: "#bfa035", on: "light" },
  { name: "olive",            token: "--color-olive",            hex: "#746d16", on: "light" },
  { name: "amber",            token: "--color-amber",            hex: "#e39e2a", on: "dark"  },
  { name: "stone",            token: "--color-stone",            hex: "#727566", on: "light" },
  { name: "mist",             token: "--color-mist",             hex: "#ababab", on: "light" },
  { name: "ink",              token: "--color-ink",              hex: "#000000", on: "light" },
  { name: "paper",            token: "--color-paper",            hex: "#ffffff", on: "dark" },
];

const TYPE_SCALE: { name: string; token: string; px: string; sample: string; cls: string; weight?: string }[] = [
  { name: "display-xl", token: "--text-display-xl", px: "140 px", sample: "Patuá", cls: "text-[var(--text-display-xl)] leading-[var(--leading-display)] tracking-[var(--tracking-tight)] font-display font-medium" },
  { name: "display-lg", token: "--text-display-lg", px: "78 px",  sample: "Cadeiras Autorais", cls: "text-[var(--text-display-lg)] leading-[var(--leading-display)] tracking-[var(--tracking-tight)] font-display font-medium" },
  { name: "display-md", token: "--text-display-md", px: "52 px",  sample: "Mesas Autorais", cls: "text-[var(--text-display-md)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)] font-display" },
  { name: "display-sm", token: "--text-display-sm", px: "42 px",  sample: "Objetos Autorais", cls: "text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)] font-display" },
  { name: "h1 / 3xl",   token: "--text-3xl",       px: "36 px",  sample: "Brasilidade contemporânea", cls: "text-[var(--text-3xl)] leading-[var(--leading-heading)] font-display" },
  { name: "h2 / 2xl",   token: "--text-2xl",       px: "30 px",  sample: "Peças feitas à mão", cls: "text-[var(--text-2xl)] leading-[var(--leading-heading)] font-display" },
  { name: "h3 / xl",    token: "--text-xl",        px: "26 px",  sample: "Origem · Desenho · Manual", cls: "text-[var(--text-xl)] leading-[var(--leading-heading)] font-display" },
  { name: "h4 / lg",    token: "--text-lg",        px: "23 px",  sample: "Itaúba e couro natural", cls: "text-[var(--text-lg)] leading-[var(--leading-heading)] font-medium" },
  { name: "lead / md",  token: "--text-md",        px: "20 px",  sample: "Criações em diálogo com o espaço.", cls: "text-[var(--text-md)] leading-[var(--leading-body)]" },
  { name: "body",       token: "--text-base",      px: "16 px",  sample: "Encante-se com peças que unem brasilidade, design autoral e contemporaneidade.", cls: "text-[var(--text-base)] leading-[var(--leading-body)]" },
  { name: "small",      token: "--text-sm",        px: "14 px",  sample: "Laranjeiras · Rio de Janeiro", cls: "text-[var(--text-sm)] leading-[var(--leading-body)]" },
  { name: "micro / xs", token: "--text-xs",        px: "12 px",  sample: "01 — Origem", cls: "text-[var(--text-xs)] uppercase tracking-[var(--tracking-eyebrow)] font-mono" },
];

export default function StyleGuidePage() {
  return (
    <div className="pt-32 pb-24">
      {/* HEADER */}
      <Section size="sm" width="page">
        <div className="flex flex-col gap-4">
          <Eyebrow>00 · Style Guide</Eyebrow>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-[-0.03em]">
            Sistema visual.
          </h1>
          <p className="max-w-xl text-[var(--text-md)] leading-[var(--leading-body)] text-[var(--color-stone)]">
            Tokens, tipografia e componentes extraídos do site oficial em
            <a
              className="ml-1 underline decoration-[var(--color-terracotta)] decoration-2 underline-offset-4 hover:text-[var(--color-terracotta)]"
              href="https://patua.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
            >
              patua.framer.website
            </a>
            . Use esta página como referência durante o desenvolvimento.
          </p>
        </div>
      </Section>

      {/* CORES */}
      <Section size="md" width="page">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <Eyebrow>01 · Paleta</Eyebrow>
            <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
              Cores
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--color-stone)]">14 tokens</span>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {COLORS.map((c) => (
            <div
              key={c.token}
              className="flex flex-col overflow-hidden rounded-[var(--radius-soft)] border border-[var(--color-border)]"
            >
              <div
                className="aspect-[5/4] w-full"
                style={{ background: `var(${c.token})` }}
              />
              <div className="flex flex-col gap-1 p-3">
                <span className="font-display text-sm font-medium">{c.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-stone)]">
                  {c.hex}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TIPOGRAFIA */}
      <Section size="md" width="page" tone="cream-light">
        <header className="mb-10">
          <Eyebrow>02 · Tipografia</Eyebrow>
          <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
            Escala — Rawline + Fragment Mono
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-base)] leading-[var(--leading-body)] text-[var(--color-stone)]">
            Display usa Rawline (Medium 500 ou Bold 700). Microcopy e numerais usam Fragment Mono.
          </p>
        </header>

        <div className="flex flex-col divide-y divide-[var(--color-border)]">
          {TYPE_SCALE.map((row) => (
            <div
              key={row.name}
              className="grid items-baseline gap-4 py-6 md:grid-cols-[160px_120px_1fr]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-stone)]">
                {row.name}
              </span>
              <span className="font-mono text-xs text-[var(--color-stone)]">{row.px}</span>
              <span className={row.cls}>{row.sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* BOTÕES */}
      <Section size="md" width="page">
        <header className="mb-10">
          <Eyebrow>03 · Botões</Eyebrow>
          <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
            Variantes & tamanhos
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-base)] leading-[var(--leading-body)] text-[var(--color-stone)]">
            Pílula completa (radius 500px). Hover transita para terracotta-deep ou terracotta.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          <Row label="primary">
            <Button variant="primary" size="sm" arrow>Saiba Mais</Button>
            <Button variant="primary" size="md" arrow>Ver as peças</Button>
            <Button variant="primary" size="lg" arrow>Falar com o ateliê</Button>
          </Row>

          <Row label="dark">
            <Button variant="dark" size="sm" arrow>Saiba Mais</Button>
            <Button variant="dark" size="md" arrow>Ver as peças</Button>
            <Button variant="dark" size="lg" arrow>Falar com o ateliê</Button>
          </Row>

          <Row label="outline-dark">
            <Button variant="outline-dark" size="sm">Voltar</Button>
            <Button variant="outline-dark" size="md" arrow>Ver projetos</Button>
            <Button variant="outline-dark" size="lg" arrow>Conhecer o ateliê</Button>
          </Row>

          <div className="rounded-[var(--radius-soft)] bg-[var(--color-bark)] p-8">
            <Row label="outline (sobre fundo escuro)" tone="light">
              <Button variant="outline" size="sm">Saiba Mais</Button>
              <Button variant="outline" size="md" arrow>Ver as peças</Button>
              <Button variant="outline" size="lg" arrow>Conhecer o ateliê</Button>
            </Row>
          </div>

          <Row label="ghost / link">
            <Button variant="ghost" size="sm">ou abrir o formulário</Button>
            <Button variant="ghost" size="md" arrow>Continue lendo</Button>
          </Row>
        </div>
      </Section>

      {/* EYEBROWS / NUMERALS */}
      <Section size="md" width="page" tone="cream-light">
        <header className="mb-10">
          <Eyebrow>04 · Microcopy</Eyebrow>
          <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
            Eyebrows & numerais
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "01 · Origem",
            "02 · Desenho",
            "03 · Fazer Manual",
            "04 · Presença",
          ].map((step) => (
            <div
              key={step}
              className="flex flex-col gap-3 rounded-[var(--radius-soft)] border border-[var(--color-border)] bg-[var(--color-cream)] p-6"
            >
              <Eyebrow>{step}</Eyebrow>
              <p className="text-[var(--text-base)] leading-[var(--leading-body)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SEÇÕES */}
      <Section size="md" width="page">
        <header className="mb-10">
          <Eyebrow>05 · Seções</Eyebrow>
          <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
            Tons & espaçamento
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-base)] leading-[var(--leading-body)] text-[var(--color-stone)]">
            Vertical: 124 / 68 / 41 px (lg / md / sm). Horizontal: 16px (mobile) → 40px (desktop).
          </p>
        </header>

        <div className="flex flex-col gap-2">
          <ToneCard tone="cream" label="cream" />
          <ToneCard tone="cream-light" label="cream-light" />
          <ToneCard tone="bark" label="bark" textOnDark />
        </div>
      </Section>

      {/* RAIOS / SOMBRAS */}
      <Section size="md" width="page" tone="cream-light">
        <header className="mb-10">
          <Eyebrow>06 · Tokens estruturais</Eyebrow>
          <h2 className="font-display mt-3 text-[var(--text-display-sm)] leading-[var(--leading-tight)] tracking-[var(--tracking-snug)]">
            Raios & containers
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TokenCard label="radius-soft" value="20 px" demo={
            <div className="h-20 w-20 rounded-[var(--radius-soft)] bg-[var(--color-bark)]" />
          } />
          <TokenCard label="radius-pill" value="500 px" demo={
            <div className="h-20 w-32 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)]" />
          } />
          <TokenCard label="container-page" value="1400 px" demo={
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-[var(--color-bark)] to-[var(--color-terracotta)]" />
          } />
          <TokenCard label="container-prose" value="1100 px" demo={
            <div className="h-3 w-[78%] rounded-full bg-gradient-to-r from-[var(--color-bark)] to-[var(--color-terracotta)]" />
          } />
          <TokenCard label="container-narrow" value="760 px" demo={
            <div className="h-3 w-[54%] rounded-full bg-gradient-to-r from-[var(--color-bark)] to-[var(--color-terracotta)]" />
          } />
          <TokenCard label="ease-out-expo" value="cubic-bezier(.22,1,.36,1)" demo={
            <div className="font-mono text-xs text-[var(--color-stone)]">
              0,22 · 1 · 0,36 · 1
            </div>
          } />
        </div>
      </Section>
    </div>
  );
}

function Row({
  label,
  tone = "dark",
  children,
}: {
  label: string;
  tone?: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className={
          tone === "dark"
            ? "font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]"
            : "font-mono text-xs uppercase tracking-[0.2em] text-white/70"
        }
      >
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function ToneCard({
  tone,
  label,
  textOnDark = false,
}: {
  tone: "cream" | "cream-light" | "bark";
  label: string;
  textOnDark?: boolean;
}) {
  const bg =
    tone === "cream"
      ? "bg-[var(--color-cream)]"
      : tone === "cream-light"
      ? "bg-[var(--color-cream-light)]"
      : "bg-[var(--color-bark)]";
  return (
    <div
      className={`rounded-[var(--radius-soft)] border border-[var(--color-border)] ${bg} px-8 py-12`}
    >
      <span
        className={
          textOnDark
            ? "font-mono text-xs uppercase tracking-[0.2em] text-white/60"
            : "font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]"
        }
      >
        {label}
      </span>
      <p
        className={`font-display mt-3 text-[var(--text-2xl)] leading-[var(--leading-heading)] ${
          textOnDark ? "text-white" : ""
        }`}
      >
        Encante-se com peças autorais.
      </p>
    </div>
  );
}

function TokenCard({
  label,
  value,
  demo,
}: {
  label: string;
  value: string;
  demo: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-soft)] border border-[var(--color-border)] bg-[var(--color-cream)] p-6">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-medium">{label}</span>
        <span className="font-mono text-xs text-[var(--color-stone)]">{value}</span>
      </div>
      <div className="flex h-24 items-center">{demo}</div>
    </div>
  );
}
