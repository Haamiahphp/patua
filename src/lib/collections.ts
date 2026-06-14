export type ProductRef = {
  category: string;
  product: string;
};

export type RestauroPiece = {
  name: string;
  image: string;
};

export type Collection = {
  slug: string;
  name: string;
  image: string;
  intro: string;
  type: "collection" | "restauro";
  products?: ProductRef[];
  gallery?: RestauroPiece[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "andanca",
    name: "Coleção Andança",
    image: "/images/colecoes/colecao-andanca-2.png",
    type: "collection",
    intro:
      "Linhas que caminham com o tempo. A Andança nasce do gesto de ir e voltar — fios que se cruzam como passos repetidos em casa.",
    products: [{ category: "cabeceira", product: "cabeceira-classica" }],
  },
  {
    slug: "cobogo",
    name: "Coleção Cobogó",
    image: "/images/colecoes/colecao-cobogo-3.png",
    type: "collection",
    intro:
      "Inspirada nos cobogós cariocas — luz que passa, vento que entra. O desenho da trama dialoga com a arquitetura modernista brasileira.",
    products: [
      { category: "bancos", product: "banco-cobogo" },
      { category: "banco-sapateira", product: "banco-sapateira-2" },
      { category: "banquetas", product: "banqueta-cobogo" },
      { category: "cadeiras", product: "cadeira-cobogo" },
      { category: "infantil", product: "cadeira-infantil-cobogo" },
    ],
  },
  {
    slug: "xodo",
    name: "Coleção Xodó",
    image: "/images/colecoes/colecao-xodo.png",
    type: "collection",
    intro:
      "Cor, ritmo, presença afetiva. A Xodó é a coleção que abraça — tramas em fios coloridos que carregam memória de afeto.",
    products: [{ category: "bancos", product: "banco-xodo-p" }],
  },
  {
    slug: "restauro",
    name: "Restauros",
    image: "/images/colecoes/restauro.png",
    type: "restauro",
    intro:
      "Peças que ganharam nova vida. Estruturas resgatadas, ressignificadas, retramadas — uma segunda história que recomeça pelas mãos.",
    gallery: [
      { name: "Banco 2 Lugares", image: "/images/colecoes/restauro/banco-2-lugares.png" },
      { name: "Banco ou Apoio", image: "/images/colecoes/restauro/banco-ou-apoio.png" },
      { name: "Cadeira Acapulco I", image: "/images/colecoes/restauro/cadeira-acapulco-modelo-1.png" },
      { name: "Cadeira Acapulco II", image: "/images/colecoes/restauro/cadeira-acapulco-modelo-2.png" },
      { name: "Poltrona", image: "/images/colecoes/restauro/poltrona.png" },
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
