import Image from "next/image";
import { Reveal } from "@/components/reveal";

const WORDMARK = "/images/g48RVMC75t4soXPzIMLxkJiktPs.png"; // 587×288 cream empilhado

export function Manifesto() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--color-terracotta)] py-[var(--space-section-md)] text-[var(--color-cream-light)] md:py-[var(--space-section-lg)]">
      <div className="mx-auto flex w-full max-w-[var(--container-prose)] flex-col items-center px-4 text-center md:px-10">
        <Reveal>
          <Image
            src={WORDMARK}
            alt="Patuá — Artesania Brasileira"
            width={587}
            height={288}
            priority
            className="h-auto w-[clamp(320px,52vw,720px)]"
          />
        </Reveal>

        <Reveal delay={0.3} className="mt-20 md:mt-28">
          <p className="mx-auto max-w-[44ch] text-lg leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-xl">
            Encante-se com peças que unem brasilidade, design autoral e
            contemporaneidade, fio a fio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
