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
        eyebrow="Patuá"
        title="Coleções que celebram a brasilidade em cada detalhe."
        body="Conheça as coleções autorais da Patuá — cada tramado carrega uma história, uma cor e um ritmo próprios."
        cta="Conheça a nossa coleção"
        href="/collections"
        image="/images/colecao.jpg"
        imageAlt="Coleção Patuá em tramado colorido"
      />

      {/* 4 — Para arquitetos e designers (B2B) */}
      <B2BSection />

      {/* 5 — Processo Criativo */}
      <ProcessSection />

      {/* 6 — Peças de Restauro */}
      <FeatureBand
        base="home.restauro"
        eyebrow="Restauro"
        title="Peças de Restauro"
        body="Para preservar a história e devolver permanência ao que merece durar."
        cta="Conheça as peças de restauro"
        href="/collections/restauro"
        image="/images/restauro-band.jpg"
        imageAlt="Peça restaurada pela Patuá"
        reverse
      />

      {/* 7 — Explore nossos tramados */}
      <TramadosSection />

      {/* 8 — Fale Conosco */}
      <CtaSection />
    </>
  );
}
