import { getContent } from "@/lib/content";
import { HeroCarousel, type Slide } from "./hero-carousel";

type SlideSeed = {
  key: string;
  piece: string;
  description: string;
  href: string;
  image: string;
};

const SLIDES: SlideSeed[] = [
  {
    key: "home.hero.slide1",
    piece: "Cabeceira Andança",
    description:
      "Painel tramado que acolhe o quarto com presença quente, sem peso visual.",
    href: "/services/cabeceira",
    image: "/images/hero/hero-cabeceira-andanca.png",
  },
  {
    key: "home.hero.slide2",
    piece: "Cadeira Abraço",
    description:
      "Estrutura leve e tramado em diagonal. Uma cadeira que abraça quem nela se senta.",
    href: "/services/cadeiras",
    image: "/images/hero/hero-cadeira-abraco.png",
  },
  {
    key: "home.hero.slide3",
    piece: "Banco Xodó G",
    description:
      "Tramado expressivo em fios coloridos. Um banco generoso que atravessa salas, varandas e conversas longas.",
    href: "/services/bancos",
    image: "/images/hero/hero-banco-xodo.png",
  },
  {
    key: "home.hero.slide4",
    piece: "Poltrona Diretor",
    description:
      "Linhas retas, ergonomia precisa e tramado autoral. Uma poltrona para leituras longas.",
    href: "/services/poltronas",
    image: "/images/hero/hero-poltrona-diretor.png",
  },
];

export async function Hero() {
  const slides: Slide[] = await Promise.all(
    SLIDES.map(async (s) => ({
      key: s.key,
      piece: await getContent(`${s.key}.titulo`, s.piece),
      description: await getContent(`${s.key}.descricao`, s.description),
      href: s.href,
      image: await getContent(`${s.key}.imagem`, { url: s.image, alt: s.piece }),
    })),
  );

  return <HeroCarousel slides={slides} />;
}
