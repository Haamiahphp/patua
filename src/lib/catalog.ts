export type Color = {
  name: string;
  hex: string;
  // Opcional: imagem da textura real (fio/acabamento). Quando presente,
  // a amostra mostra a textura em vez da cor chapada. Cliente vai enviar.
  texture?: string;
};

export type Product = {
  slug: string;
  name: string;
  image: string;
  gallery?: string[];
  // Foto da peça ambientada (na 2ª sessão da página). Quando ausente, o
  // site mostra um espaço reservado pra incluir depois. Cliente vai enviar.
  ambientImage?: string;
  ambientAlt?: string;
  description?: string;
  concept?: string;
  dimensions?: string;
  materials?: string;
  finishes?: string;
  care?: string;
  structureColors?: Color[];
  yarnColors?: Color[];
};

export type Category = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  products: Product[];
};

// TODO: paleta provisória — substituir pelas cores reais do catálogo Patuá
export const STRUCTURE_COLORS: Color[] = [
  { name: "Preto", hex: "#1a1a1a" },
  { name: "Branco", hex: "#f5f1ea" },
  { name: "Bronze", hex: "#7a5b3a" },
  { name: "Cobre", hex: "#b06c3b" },
  { name: "Verde Oliva", hex: "#5a5d2c" },
  { name: "Cromado", hex: "#c5c4c1" },
];

export const YARN_COLORS: Color[] = [
  { name: "Natural", hex: "#d8c39a" },
  { name: "Terracota", hex: "#b95744" },
  { name: "Mostarda", hex: "#bfa035" },
  { name: "Marsala", hex: "#7d2e2e" },
  { name: "Verde Musgo", hex: "#4a5a32" },
  { name: "Preto", hex: "#1a1a1a" },
  { name: "Off-white", hex: "#ece4d9" },
  { name: "Azul Petróleo", hex: "#2a4955" },
];

const DEFAULT_DESCRIPTION =
  "Peça artesanal Patuá. Cada unidade é tecida à mão no ateliê em Laranjeiras, Rio de Janeiro.";

const DEFAULT_CONCEPT =
  "Concebida no ateliê em Laranjeiras, a peça nasce de um diálogo entre estrutura e tramado. Cada fio é entrelaçado à mão, num processo que combina precisão técnica e ritmo artesanal. O resultado é um móvel autoral que carrega o gesto de quem o fez e se integra ao espaço como presença viva — não como objeto de catálogo.";

const DEFAULT_FINISHES =
  "Estrutura em aço carbono com pintura eletrostática.\nTramado em fio sintético tingido, de alta resistência à abrasão e à luz.\nSoldas reforçadas, ponteiras emborrachadas.";

const DEFAULT_CARE =
  "Limpeza com pano úmido e sabão neutro. Evitar alvejantes e exposição prolongada ao sol direto.";

export const CATEGORIES: Category[] = [
  {
    slug: "bancos",
    name: "Bancos",
    image: "/images/catalog/categoria/bancos.jpg",
    description:
      "Bancos autorais que combinam estrutura metálica e tramado manual em diálogo com o cotidiano.",
    products: [
      {
        slug: "banco-cobogo",
        name: "Banco Cobogó",
        image: "/images/catalog/produtos/bancos/banco-cobogo.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "banco-xodo-p",
        name: "Banco Xodó P",
        image: "/images/catalog/produtos/bancos/banco-xodo-p.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "trio-encaixe",
        name: "Trio Encaixe",
        image: "/images/catalog/produtos/bancos/trio-encaixe.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "banco-tradicional",
        name: "Banco Tradicional",
        image: "/images/catalog/produtos/bancos/bancos.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "banquetas",
    name: "Banquetas",
    image: "/images/catalog/categoria/banquetas.png",
    description:
      "Banquetas altas e médias para cozinhas, ilhas e bares — estrutura leve, tramado expressivo.",
    products: [
      {
        slug: "banqueta-cobogo",
        name: "Banqueta Cobogó",
        image: "/images/catalog/produtos/banquetas/banquetas.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "cadeiras",
    name: "Cadeiras",
    image: "/images/catalog/categoria/cadeiras.jpg",
    description:
      "Cadeiras autorais — onde a estrutura se torna desenho e o tramado vira presença.",
    products: [
      {
        slug: "cadeira-abraco",
        name: "Cadeira Abraço",
        image: "/images/catalog/produtos/cadeiras/cadeira-abraco.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "cadeira-cobogo",
        name: "Cadeira Cobogó",
        image: "/images/catalog/produtos/cadeiras/cadeira-cobogo.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "cadeira-sossego",
        name: "Cadeira Sossego",
        image: "/images/catalog/produtos/cadeiras/cadeira-sossego.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "poltronas",
    name: "Poltronas",
    image: "/images/catalog/categoria/poltronas.png",
    description:
      "Poltronas para acolher leituras longas e conversas demoradas.",
    products: [
      {
        slug: "poltrona-diretor",
        name: "Poltrona Diretor",
        image: "/images/catalog/produtos/poltronas/poltrona-diretor.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "banco-sapateira",
    name: "Banco Sapateira",
    image: "/images/catalog/categoria/banco-sapateira.png",
    description:
      "Bancos com função dupla — assento e organização — pensados para entradas e quartos.",
    products: [
      {
        slug: "banco-sapateira-classico",
        name: "Banco Sapateira",
        image: "/images/catalog/produtos/banco-sapateira/banco-sapateira.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "banco-sapateira-2",
        name: "Banco Sapateira II",
        image: "/images/catalog/produtos/banco-sapateira/banco-sapateira-2.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
      {
        slug: "sapateira-de-madeira",
        name: "Sapateira de Madeira",
        image: "/images/catalog/produtos/banco-sapateira/sapateira-de-madeira.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "puff",
    name: "Puff",
    image: "/images/catalog/categoria/puff.png",
    description: "Puffs leves para compor a sala ou descansar os pés.",
    products: [
      {
        slug: "puff-trama",
        name: "Puff Trama",
        image: "/images/catalog/produtos/puff/puff.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "infantil",
    name: "Infantil",
    image: "/images/catalog/categoria/infantil.png",
    description: "Peças em escala menor — cadeiras e bancos para crianças.",
    products: [
      {
        slug: "cadeira-infantil-cobogo",
        name: "Cadeira Infantil Cobogó",
        image: "/images/catalog/produtos/cadeiras/cadeira-infantil-cobogo.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "cabeceira",
    name: "Cabeceira",
    image: "/images/catalog/categoria/cabeceira.png",
    description:
      "Cabeceiras tramadas — presença quente no quarto, sem peso visual.",
    products: [
      {
        slug: "cabeceira-classica",
        name: "Cabeceira",
        image: "/images/catalog/produtos/cabeceira/cabeceira.png",
        description: DEFAULT_DESCRIPTION,
        concept: DEFAULT_CONCEPT,
        finishes: DEFAULT_FINISHES,
        care: DEFAULT_CARE,
        structureColors: STRUCTURE_COLORS,
        yarnColors: YARN_COLORS,
      },
    ],
  },
  {
    slug: "mesa-lateral-apoio",
    name: "Mesa lateral e de apoio",
    image: "/images/about/about-detalhe-material.jpg",
    description:
      "Mesas auxiliares para sala, quarto e varanda — formas leves, tampo expressivo.",
    products: [],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(
  categorySlug: string,
  productSlug: string,
): { category: Category; product: Product } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const product = category.products.find((p) => p.slug === productSlug);
  if (!product) return undefined;
  return { category, product };
}
