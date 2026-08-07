import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { FeatureBand } from "@/components/home/feature-band";
import { B2BSection } from "@/components/home/b2b";
import { ProcessSection } from "@/components/home/process";
import { TramadosSection } from "@/components/home/tramados";
import type { Metadata } from "next";
import { CtaSection } from "@/components/home/cta";

// Só o canonical: title, description e Open Graph continuam vindo do layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/*
        A home não tinha nenhum H1: o título do topo vive dentro da arte do
        banner, como pixel. Sem heading, nem o Google nem um leitor de tela
        sabem do que a página trata. Este H1 diz em texto o que o banner diz em
        imagem — some visualmente, mas conta para ambos.
      */}
      <h1 className="sr-only">
        Patuá Artesania Brasileira — móveis e objetos autorais feitos à mão no
        Rio de Janeiro
      </h1>

      {/* 1 — Banners principais (6 rotativos) */}
      <Hero />

      {/* 2 — Manifesto */}
      <Manifesto />

      {/* 3 — Conheça a nossa coleção (faixa inteira clicável → Coleções) */}
      <FeatureBand
        base="home.colecao"
        title="Coleções que celebram a brasilidade em cada detalhe."
        boldWord="brasilidade"
        image="/images/colecao.jpg"
        imageAlt="Coleção Patuá em tramado colorido"
        imageClass="object-[60%_center] md:object-center"
        href="/collections"
      />

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
        // Mobile: enquadra na cadeira à esquerda (a cliente pediu foco na poltrona,
        // não no banco de terrazzo do centro, que não é restauro da Patuá). Desktop mantém.
        imageClass="object-[28%_center] scale-[1.45] md:object-center md:scale-[1.15]"
      />

      {/* 7 — Explore nossos tramados */}
      <TramadosSection />

      {/* 8 — Fale Conosco */}
      <CtaSection />
    </>
  );
}
