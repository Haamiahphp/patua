import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ServicesSection } from "@/components/home/services";
import { PortfolioSection } from "@/components/home/portfolio";
import { ProcessSection } from "@/components/home/process";
import { GallerySection } from "@/components/home/gallery";
import { UniverseSection } from "@/components/home/universe";
import { CtaSection } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <UniverseSection />
      <GallerySection />
      <CtaSection />
    </>
  );
}
