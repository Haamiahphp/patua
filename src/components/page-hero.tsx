import { Reveal, SplitWords } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  italic,
  rest,
  description,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  rest?: string;
  description?: string;
}) {
  return (
    <section className="pt-[112px] pb-20 md:pt-[160px] md:pb-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-bark)]/60">
            {eyebrow}
          </span>
        </Reveal>
        <h1 className="font-display mt-6 max-w-5xl text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.04em] balanced">
          <SplitWords text={title} />
          {italic ? (
            <>
              <br />
              <span className="italic text-[var(--color-terracotta)]">
                <SplitWords text={italic} delay={0.2} />
              </span>
            </>
          ) : null}
          {rest ? (
            <>
              <br />
              <SplitWords text={rest} delay={0.35} />
            </>
          ) : null}
        </h1>
        {description ? (
          <Reveal delay={0.45} className="mt-10 max-w-2xl">
            <p className="text-lg text-[var(--color-bark)]/75 pretty md:text-xl">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
