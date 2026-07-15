import { getContent } from "@/lib/content";
import { HeroCarousel, type Slide } from "./hero-carousel";

type SlideSeed = {
  key: string;
  piece: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  /** Banner "só imagem": a arte já tem o texto embutido, então o site não
   *  sobrepõe título/CTA/degradê — mostra a imagem inteira (object-contain). */
  plain?: boolean;
  /** Cor de fundo por trás da arte (quando plain), pra o letterbox combinar. */
  bg?: string;
};

// 6 banners rotativos, na ordem definida pela cliente:
// Slogan · Carol Risi · E-commerce · Cabeceira Andança · Poltrona Diretor · Cadeira Abraço
const SLIDES: SlideSeed[] = [
  {
    key: "home.hero.slogan",
    piece: "Quando é Patuá, você sente.",
    description: "O cuidado com cada detalhe faz diferença.",
    href: "/collections",
    cta: "Conheça a Patuá",
    image: "/images/hero/slogan.jpg",
  },
  {
    key: "home.hero.carol",
    piece: "Carol Risi",
    description: "Design como gesto, escuta e construção de sentido.",
    href: "/about",
    cta: "Conheça a história",
    image: "/images/hero/carol.jpg",
  },
  {
    key: "home.hero.ecommerce",
    piece: "Escolha a sua peça Patuá",
    description: "",
    href: "",
    cta: "",
    image: "/images/hero/ecommerce.jpg",
    plain: true,
    bg: "#e5d9bf",
  },
  {
    key: "home.hero.cabeceira",
    piece: "Cabeceira Andança",
    description:
      "Cabeceira, quadro, duas faces. Uma peça que muda junto com você.",
    href: "/services/cabeceira",
    cta: "Saiba mais",
    image: "/images/hero/cabeceira.jpg",
  },
  {
    key: "home.hero.poltrona",
    piece: "Poltrona Diretor",
    description:
      "Releitura de uma peça clássica. Linhas retas, ergonomia precisa e tramado autoral.",
    href: "/services/poltronas",
    cta: "Saiba mais",
    image: "/images/hero/hero-poltrona-diretor.png",
  },
  {
    key: "home.hero.cadeira",
    piece: "Cadeira Abraço",
    description: "Uma peça com estrutura leve, desenhada para acolher.",
    href: "/services/cadeiras",
    cta: "Saiba mais",
    image: "/images/hero/hero-cadeira-abraco.png",
  },
];

export async function Hero() {
  const slides: Slide[] = await Promise.all(
    SLIDES.map(async (s) => ({
      key: s.key,
      piece: await getContent(`${s.key}.titulo`, s.piece),
      description: await getContent(`${s.key}.descricao`, s.description),
      href: s.href,
      cta: await getContent(`${s.key}.cta`, s.cta),
      image: await getContent(`${s.key}.imagem`, { url: s.image, alt: s.piece }),
      plain: s.plain,
      bg: s.bg,
    })),
  );

  return <HeroCarousel slides={slides} />;
}
