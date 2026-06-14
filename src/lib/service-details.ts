export type ServiceDetail = {
  slug: string;
  family: string;
  title: string;
  italic: string;
  description: string;
  pieces: { name: string; spec: string; image: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "cadeiras-autorais": {
    slug: "cadeiras-autorais",
    family: "Cadeiras",
    title: "Cadeiras",
    italic: "que abraçam.",
    description:
      "Assentos pensados para o corpo brasileiro: ergonomia, leveza visual e materiais nobres. Da cadeira de jantar à poltrona de leitura, cada modelo é encomendado e ajustado ao espaço final.",
    pieces: [
      {
        name: "Cadeira Abraço",
        spec: "Madeira maciça · palha trançada · 78 × 54 × 52 cm",
        image: "/images/FeCSgSUt2rgNIYK2pTNRnFO8Y.png",
      },
      {
        name: "Banqueta Alta",
        spec: "Itaúba · couro natural · 92 × 38 × 38 cm",
        image: "/images/niiBkHVWeIUxuYEpBG9jRS9hEY.png",
      },
      {
        name: "Cadeira Jangada",
        spec: "Peroba do campo · corda náutica · 80 × 56 × 50 cm",
        image: "/images/snrZmVXB4xaFFFic5aVktrKPDg.png",
      },
    ],
  },
  "mesas-autorais": {
    slug: "mesas-autorais",
    family: "Mesas",
    title: "Mesas",
    italic: "que reúnem.",
    description:
      "Tampos vivos, juntas honestas e bases que se equilibram com calma. Mesas de jantar, de centro e de apoio para casas que celebram convivência.",
    pieces: [
      {
        name: "Mesa Roda",
        spec: "Cumaru · 220 × 110 × 76 cm",
        image: "/images/RbNtidcj0CRD0UAhSK7LfmGcTvE.png",
      },
      {
        name: "Mesa Centro Rio",
        spec: "Imbuia · pedra-sabão · 120 × 70 × 38 cm",
        image: "/images/TSjIq76Q6NkeDfG0qug1hpj08.png",
      },
      {
        name: "Mesa de Apoio Curva",
        spec: "Freijó · 50 × 50 × 55 cm",
        image: "/images/XhcegOlvT2c7UCahUidzOZf3wHI.png",
      },
    ],
  },
  "objetos-autorais": {
    slug: "objetos-autorais",
    family: "Objetos",
    title: "Objetos",
    italic: "que contam histórias.",
    description:
      "Pequenas peças com grande presença. Banquinhos, bandejas, fruteiras, esculturas funcionais — pretextos para que a casa converse.",
    pieces: [
      {
        name: "Banquinho Cobogó",
        spec: "Pinus rajado · 42 × 30 × 30 cm",
        image: "/images/lfAv5FCa4Fvn9js3MR8ZnGpaQ.png",
      },
      {
        name: "Bandeja Origem",
        spec: "Pau-marfim · alça em couro · 6 × 38 × 22 cm",
        image: "/images/DE2epdZ9H5kk49D33T8QrK8TPI.png",
      },
      {
        name: "Fruteira Roda",
        spec: "Imbuia torneada · 14 × 32 × 32 cm",
        image: "/images/goMxesEq3FkMyCGAojFpwV7Z24.png",
      },
    ],
  },
  "projetos-sob-medida": {
    slug: "projetos-sob-medida",
    family: "Sob Medida",
    title: "Projetos",
    italic: "feitos para ficar.",
    description:
      "Quando a peça pronta não responde ao seu lugar, desenhamos do zero. Estantes, marcenaria embutida, painéis, cabeceiras — sempre integrados ao projeto de arquitetura.",
    pieces: [
      {
        name: "Cabeceira Andança",
        spec: "Painel modular · 220 × 30 × 110 cm",
        image: "/images/pOmgTpfpgLlKZkEGvk8BRxKW4E.png",
      },
      {
        name: "Estante Patamar",
        spec: "Marcenaria de chão a teto · sob projeto",
        image: "/images/54CjkrNz6WQQtc5C7oUbLpUhtQ.png",
      },
      {
        name: "Painel Sala",
        spec: "Réguas verticais · variável",
        image: "/images/DTANbPvFW4Oird0vIjv3TFI2So.png",
      },
    ],
  },
};
