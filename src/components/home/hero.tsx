import { getContent } from "@/lib/content";
import { LOJA_URL } from "@/lib/site";
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
  /** Enquadramento por slide (object-position / zoom). */
  focusClass?: string;
  /** Arte alternativa (vertical) usada só no mobile. */
  mobileImage?: string;
};

// 6 banners rotativos, na ordem definida pela cliente:
// Slogan · Carol Risi · E-commerce · Cabeceira Andança · Poltrona Diretor · Cadeira Abraço
const SLIDES: SlideSeed[] = [
  {
    key: "home.hero.slogan",
    piece: "Quando é Patuá, você sente.",
    description: "",
    href: "/about#manifesto",
    cta: "",
    // Arte larga oficial da cliente (3123×1440 ≈ 2.17:1). A faixa do herói usa
    // exatamente essa proporção, então o banner aparece inteiro, sem corte.
    image: "/images/hero/slogan-wide.webp",
    mobileImage: "/images/hero/slogan-mobile.jpg",
    plain: true,
    bg: "#ddd3ba",
    // Só entra em jogo em tela ultrawide/baixa, quando a altura da janela limita
    // a faixa: ancorar no topo protege a logo e o slogan, e o que sai é a barra
    // de trama embaixo, que não tem informação.
    focusClass: "object-top",
  },
  {
    key: "home.hero.carol",
    piece: "Carol Risi",
    description: "Design como gesto, escuta e construção de sentido.",
    href: "/about#quem-desenha",
    cta: "Conheça a história",
    image: "/images/hero/carol.jpg",
    // Enquadra a partir da linha do cabelo pra não cortar o rosto no banner wide.
    focusClass: "object-[50%_32%]",
  },
  {
    key: "home.hero.ecommerce",
    piece: "Escolha a sua peça Patuá",
    description: "",
    // "COMPRE ONLINE" → loja virtual, que fica num subdomínio próprio, fora
    // deste app (o /loja do site redireciona pra mesma URL).
    href: LOJA_URL,
    cta: "Compre online",
    // A arte da cliente é 16:9 e a faixa é mais larga, então alguma coisa tem
    // que preencher a sobra. Aqui ela é a arte original inteira, ancorada à
    // esquerda, com o degradê do fundo continuado à direita até 3:1 (gerado por
    // scripts/extend-banner.py). Assim a peça e o texto ficam sempre intactos e
    // o que aparece de extensão é só fundo liso, do lado que já era vazio.
    image: "/images/hero/ecommerce-wide.webp",
    mobileImage: "/images/hero/ecommerce-mobile.jpg",
    plain: true,
    bg: "#e5d9bf",
    focusClass: "object-left",
  },
  {
    key: "home.hero.cabeceira",
    piece: "Cabeceira Andança",
    description:
      "Cabeceira, quadro, duas faces. Uma peça que muda junto com você.",
    // Abre direto na coleção da peça (a cliente pediu que cada banner leve à sua coleção).
    href: "/collections/andanca",
    cta: "Saiba mais",
    image: "/images/hero/cabeceira.jpg",
    // Aproxima na cabeceira (zoom em cima da peça).
    focusClass: "scale-[1.28] origin-[50%_35%]",
  },
  {
    key: "home.hero.poltrona",
    piece: "Poltrona Diretor",
    description:
      "Releitura de uma peça clássica. Linhas retas, ergonomia precisa e tramado autoral.",
    // Abre direto na peça (a cliente pediu que o banner leve à Poltrona Diretor).
    href: "/collections/outras-pecas/poltrona-diretor",
    cta: "Saiba mais",
    image: "/images/hero/poltrona-diretor.jpg",
    // Ancora embaixo pra não cortar os pés da peça.
    focusClass: "object-bottom",
  },
  {
    key: "home.hero.cadeira",
    piece: "Cadeira Abraço",
    description: "Uma peça com estrutura leve, desenhada para acolher.",
    // Abre direto na peça (a cliente pediu que o banner leve à Cadeira Abraço).
    href: "/collections/outras-pecas/cadeira-abraco",
    cta: "Saiba mais",
    image: "/images/hero/cadeira-abraco-quarto.jpg",
    // Nova arte (quarto): no mobile enquadra à direita pra manter a cadeira; no desktop, centro.
    focusClass: "object-[68%_center] md:object-center",
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
      focusClass: s.focusClass,
      mobileImage: s.mobileImage,
    })),
  );

  return <HeroCarousel slides={slides} />;
}
