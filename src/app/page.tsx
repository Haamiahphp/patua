import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { FeatureBand } from "@/components/home/feature-band";
import { B2BSection } from "@/components/home/b2b";
import { ProcessSection } from "@/components/home/process";
import { TramadosSection } from "@/components/home/tramados";
import { CtaSection } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      {/* 1 — Banners principais (6 rotativos) */}
      <Hero />

      {/* 2 — Manifesto */}
      <Manifesto />

      {/* 3 — Conheça a nossa coleção */}
      <FeatureBand
        base="home.colecao"
        title="Coleções que celebram a brasilidade em cada detalhe."
        boldWord="brasilidade"
        image="/images/colecao.jpg"
        imageAlt="Coleção Patuá em tramado colorido"
        imageClass="object-left md:object-center"
      />

      {/* Respiro entre a coleção e o B2B */}
      <div aria-hidden className="h-14 bg-[var(--color-cream-light)] md:h-24" />

      {/* 4 — Para arquitetos e designers (B2B) */}
      <B2BSection />

      {/* 5 — Processo Criativo */}
      <ProcessSection />

      {/* 6 — Peças de Restauro */}
      <FeatureBand
        base="home.restauro"
        title="Peças de Restauro"
        boldWord="Restauro"
        body="Para preservar a história e devolver permanência ao que merece durar."
        image="/images/restauro-band.jpg"
        imageAlt="Peça restaurada pela Patuá"
        variant="split"
        imageClass="scale-[1.15]"
      />

      {/* 7 — Explore nossos tramados */}
      <TramadosSection />

      {/* 8 — Fale Conosco */}
      <CtaSection />
    </>
  );
}
