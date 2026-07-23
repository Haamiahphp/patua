// Modelo de dados da página COLEÇÕES (reconstrução conforme o documento
// "Ajustes página COLEÇÕES PATUÁ"): 5 coleções, cada uma com peças detalhadas
// (texto + ficha técnica + foto). Módulo separado do antigo `collections.ts`,
// que ainda é usado pelas páginas de /services e pelo portfolio.

export type Spec = { label: string; value: string };

export type Peca = {
  slug: string;
  nome: string;
  imagem: string;
  paragrafos: string[];
  ficha: Spec[];
};

export type Colecao = {
  slug: string;
  nome: string;
  capa: string; // capa do grid do index (foto com o nome em cima)
  introImagem: string; // foto da abertura da coleção
  intro: string;
  pecas: Peca[];
};

export const COLECOES: Colecao[] = [
  {
    slug: "cobogo",
    nome: "Coleção Cobogó",
    capa: "/images/collections/capas/cobogo.jpg",
    introImagem: "/images/collections/cobogo/intro.jpg",
    intro:
      "Inspirada em um dos elementos mais emblemáticos da arquitetura brasileira, a Coleção Cobogó transforma o jogo entre cheios e vazios em mobiliário autoral. As estruturas metálicas dialogam com tramados desenvolvidos artesanalmente, criando peças leves, funcionais e cheias de personalidade.",
    pecas: [
      {
        slug: "cadeira-cobogo",
        nome: "Cadeira Cobogó",
        imagem: "/images/collections/cobogo/cadeira-cobogo.jpg",
        paragrafos: [
          "Desenvolvida para mesas de jantar, copas e áreas gourmet cobertas, a Cadeira Cobogó alia ergonomia e funcionalidade a um desenho autoral cuidadosamente equilibrado.",
          "Seu encosto acolhedor e vazado, combinado à leveza da estrutura, favorece tanto o uso prolongado quanto a fluidez do espaço, facilitando a composição e a movimentação no cotidiano.",
          "O tramado artesanal estabelece um diálogo sensível com materiais como madeira, pedra e metal, contribuindo para a criação de ambientes contemporâneos, elegantes e cheios de identidade. Utilizada individualmente ou em composição com outras cadeiras, a Cobogó acrescenta textura, personalidade e presença ao ambiente.",
          "Uma peça que nasce do fazer manual, do tempo dedicado a cada decisão e da escuta atenta das formas de viver.",
        ],
        ficha: [
          { label: "Material", value: "aço tubular com pintura eletrostática e fio náutico" },
          { label: "Dimensões", value: "48 cm de largura × 63 cm de profundidade × 87 cm de altura" },
          { label: "Peso", value: "4 kg" },
          { label: "Capacidade", value: "suporta até 120 kg" },
          { label: "Cores da estrutura", value: "preto, areia, aço cortén, verde, terracota, beterraba e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Uso indicado", value: "salas de jantar, copas, áreas gourmet internas e varandas cobertas" },
        ],
      },
      {
        slug: "banqueta-alta-cobogo",
        nome: "Banqueta Alta Cobogó",
        imagem: "/images/collections/cobogo/banqueta-alta.jpg",
        paragrafos: [
          "A Banqueta Alta Cobogó articula leveza visual e solidez estrutural. Sua estrutura tubular em aço sustenta o tramado artesanal em fio náutico, criando uma peça equilibrada, na qual forma, função e gesto manual coexistem com naturalidade.",
          "O desenho privilegia a fluidez e o conforto, integrando-se de maneira orgânica a bancadas, cozinhas integradas e mesas bistrô. A banqueta participa da composição do espaço, estabelece diálogo com a arquitetura e valoriza o cotidiano com uma presença discreta e durável.",
        ],
        ficha: [
          { label: "Material", value: "aço tubular com pintura eletrostática, apoio para os pés em madeira maciça e fio náutico" },
          { label: "Dimensões", value: "44 cm de largura × 60 cm de profundidade × 96 cm de altura" },
          { label: "Peso", value: "4,7 kg" },
          { label: "Capacidade", value: "suporta até 120 kg" },
          { label: "Cores da estrutura", value: "preto, areia, aço cortén, terracota, fendi, beterraba, verde e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
      {
        slug: "banco-cobogo",
        nome: "Banco Cobogó",
        imagem: "/images/collections/cobogo/banco-cobogo.jpg",
        paragrafos: [
          "O Banco Cobogó combina estrutura tubular em aço e tramado artesanal em fio náutico. O encontro entre esses materiais resulta em uma peça de desenho leve, cuja presença é marcada pela textura e pelo trabalho manual.",
          "Pensado para o uso cotidiano, pode funcionar como assento, apoio ou mesa baixa, transitando com naturalidade entre espaços residenciais e comerciais. A simplicidade de suas formas permite que o banco dialogue com diferentes materiais e atmosferas, como madeira, concreto, tecidos e fibras.",
          "Com variedade de cores e estética essencial, a peça atua como elemento funcional e compositivo, reforçando a relação entre artesania, arquitetura e permanência que define o trabalho da Patuá.",
        ],
        ficha: [
          { label: "Material", value: "aço tubular com pintura eletrostática e fio náutico" },
          { label: "Dimensões", value: "35 cm de largura × 35 cm de profundidade × 45 cm de altura" },
          { label: "Peso", value: "1,9 kg" },
          { label: "Capacidade", value: "suporta até 110 kg" },
          { label: "Cores da estrutura", value: "areia, aço cortén, fendi, beterraba, preto, terracota e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Possibilidades de uso", value: "assento, apoio ou mesa baixa" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
      {
        slug: "banco-sapateira-cobogo",
        nome: "Banco Sapateira Cobogó",
        imagem: "/images/collections/cobogo/banco-sapateira.jpg",
        paragrafos: [
          "O Banco Sapateira Cobogó expressa a essência da coleção em uma peça multifuncional, na qual forma e uso se articulam de maneira integrada.",
          "Com estrutura vazada em aço tubular e acabamento em pintura eletrostática, preserva a leveza visual e a fluidez das linhas orgânicas inspiradas nos elementos vazados da arquitetura brasileira.",
          "Pensado para o ritual cotidiano de chegar e sair de casa, o banco atua simultaneamente como assento, apoio e sapateira, organizando o espaço com discrição e equilíbrio.",
          "Sua transparência estrutural permite que o ambiente mantenha respiro e continuidade visual, dialogando com materiais como madeira, concreto, vidro e fibras. Versátil e atemporal, o Banco Sapateira Cobogó se estabelece como uma peça de transição entre o funcional e o sensível, entre o uso prático e o desenho que acolhe.",
        ],
        ficha: [
          { label: "Material", value: "aço tubular com pintura eletrostática e fio náutico" },
          { label: "Dimensões", value: "64 cm de largura × 32 cm de profundidade × 50 cm de altura" },
          { label: "Peso", value: "5,6 kg" },
          { label: "Capacidade", value: "suporta até 120 kg" },
          { label: "Cores da estrutura", value: "preto, areia, aço cortén, verde, terracota, beterraba e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Possibilidades de uso", value: "assento, apoio e sapateira" },
          { label: "Uso indicado", value: "halls de entrada, quartos, closets e outros espaços internos" },
        ],
      },
      {
        slug: "cadeira-infantil-cobogo",
        nome: "Cadeira Infantil Cobogó",
        imagem: "/images/collections/cobogo/cadeira-infantil.jpg",
        paragrafos: [
          "A Cadeira Infantil Cobogó preserva a linguagem visual da cadeira original em uma escala pensada especialmente para a infância.",
          "Sua estrutura em aço tubular, com acabamento em pintura eletrostática, cria uma peça vazada e leve, tanto visualmente quanto no peso. O desenho entre cheios e vazios, elemento central da coleção, ganha a companhia do tramado artesanal em fio náutico, que acrescenta cor, textura e identidade.",
          "O encosto ergonômico, aliado a uma base estável, proporciona conforto e segurança no uso cotidiano, respeitando o corpo da criança e estimulando sua autonomia.",
          "Funcional e delicada, a cadeira integra-se com naturalidade a quartos infantis, brinquedotecas e espaços de convivência, dialogando com madeira, tecidos, tapetes e outros materiais. Uma peça criada para acompanhar o cotidiano da infância com leveza, afeto e desenho.",
        ],
        ficha: [
          { label: "Material", value: "aço tubular com pintura eletrostática e fio náutico" },
          { label: "Dimensões", value: "45 cm de largura × 45 cm de profundidade × 67 cm de altura" },
          { label: "Altura do assento", value: "36 cm" },
          { label: "Peso", value: "3,5 kg" },
          { label: "Capacidade", value: "suporta até 70 kg" },
          { label: "Cores da estrutura", value: "preto, areia, verde, terracota, azul-claro, rosa-claro e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Uso indicado", value: "quartos infantis, brinquedotecas e espaços internos de convivência" },
        ],
      },
    ],
  },
  {
    slug: "xodo",
    nome: "Coleção Xodó",
    capa: "/images/collections/capas/xodo.jpg",
    introImagem: "/images/collections/xodo/intro.jpg",
    intro:
      "A Coleção Xodó resgata memórias afetivas do mobiliário brasileiro e as traduz em uma linguagem contemporânea. A madeira maciça, as formas suaves e o tramado artesanal criam peças acolhedoras, que convidam ao uso e ao convívio.",
    pecas: [
      {
        slug: "banco-xodo-p",
        nome: "Banco Xodó P",
        imagem: "/images/collections/xodo/banco-xodo-p.jpg",
        paragrafos: [
          "Na versão P, o Banco Xodó funciona como assento individual ou apoio, integrando-se a composições mais sutis e flexíveis.",
          "Seu tamanho compacto permite que a peça transite com facilidade entre salas, quartos, halls e outros espaços. A estrutura torneada em madeira maciça e o assento tramado manualmente reúnem matéria, textura e memória em um objeto versátil, pensado para acompanhar diferentes momentos do cotidiano.",
        ],
        ficha: [
          { label: "Material", value: "madeira maciça torneada e assento tramado à mão em fio náutico" },
          { label: "Dimensões", value: "50 cm de largura × 30 cm de profundidade × 30 cm de altura" },
          { label: "Peso", value: "2,5 kg" },
          { label: "Capacidade", value: "suporta até 100 kg" },
          { label: "Cores da estrutura", value: "madeira clara ou madeira roxinha" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Personalização", value: "pode ser produzido em medidas personalizadas" },
          { label: "Possibilidades de uso", value: "assento individual, apoio ou mesa baixa" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
      {
        slug: "banco-xodo-g",
        nome: "Banco Xodó G",
        imagem: "/images/collections/xodo/banco-xodo-g.jpg",
        paragrafos: [
          "Na versão G, o Banco Xodó assume o papel de banco, peseira ou elemento de composição, estruturando quartos, salas e halls com equilíbrio e funcionalidade.",
          "Suas proporções alongadas valorizam o desenho arredondado da estrutura e ampliam a presença do tramado artesanal. Versátil, integra-se com naturalidade a diferentes contextos arquitetônicos, estabelecendo relações com madeira, fibras, tecidos e outros materiais.",
          "Uma peça que acompanha o espaço com sensorialidade, equilíbrio e permanência.",
        ],
        ficha: [
          { label: "Material", value: "madeira maciça torneada e assento tramado à mão em fio náutico" },
          { label: "Dimensões", value: "150 cm de largura × 45 cm de profundidade × 45 cm de altura" },
          { label: "Peso", value: "10,5 kg" },
          { label: "Capacidade", value: "suporta até 210 kg" },
          { label: "Cores da estrutura", value: "madeira clara ou madeira roxinha" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Personalização", value: "pode ser produzido em medidas personalizadas" },
          { label: "Possibilidades de uso", value: "banco, peseira ou elemento de composição" },
          { label: "Uso indicado", value: "quartos, salas, halls, varandas cobertas e galerias" },
        ],
      },
    ],
  },
  {
    slug: "andanca",
    nome: "Coleção Andança",
    capa: "/images/collections/capas/andanca.jpg",
    introImagem: "/images/collections/andanca/intro.jpg",
    intro:
      "Andança é uma coleção sobre movimento. Mais do que revestir um mobiliário, ela pode se transformar em elemento arquitetônico, obra têxtil ou objeto de contemplação. Suas peças exploram a liberdade de composição, permitindo diferentes formas de uso e instalação. Cabeceiras, painéis e quadros compartilham a mesma essência: transformar o gesto artesanal em uma linguagem que dialoga com a arquitetura e com a identidade de quem habita o espaço.",
    pecas: [
      {
        slug: "cabeceira-andanca",
        nome: "Cabeceira Andança",
        imagem: "/images/collections/andanca/cabeceira.jpg",
        paragrafos: [
          "Obra têxtil desenvolvida sob medida, a Cabeceira Andança é confeccionada manualmente em fio náutico a partir de uma leitura atenta do espaço e da forma de habitar de cada cliente.",
          "Cada tramado nasce da escuta e da intenção de transformar o gesto manual em linguagem estética. A peça constrói a atmosfera do quarto por meio do encontro entre matéria, proporção e sensibilidade, traduzindo o tempo dedicado ao fazer em presença, identidade e permanência.",
          "Pensada para ser apreciada por inteiro, a Andança é uma peça dupla face, que revela uma composição na frente e no verso, uma nova arte. Instalada na vertical, assume a função de quadro, integrando-se à arquitetura do ambiente como uma paisagem tátil.",
        ],
        ficha: [
          { label: "Material da estrutura", value: "alumínio com pintura de efeito amadeirado" },
          { label: "Revestimento", value: "tramado manual em fio náutico" },
          { label: "Dimensões (cama padrão ou queen)", value: "170 cm de largura × 60 cm de altura × 5 cm de profundidade" },
          { label: "Dimensões (cama king size)", value: "210 cm de largura × 65 cm de altura × 5 cm de profundidade" },
          { label: "Peso", value: "entre 8 e 10 kg, conforme as dimensões da peça" },
          { label: "Cores da estrutura", value: "efeito madeira clara, madeira escura, branco, cinza ou preto" },
          { label: "Tramado", value: "desenvolvido de forma personalizada, com diferentes possibilidades de desenhos e combinações de cores" },
          { label: "Personalização", value: "produzida sob medida, de acordo com as dimensões da cama, a arquitetura do espaço e as preferências do cliente" },
          { label: "Orientação de instalação", value: "pode ser instalada na horizontal, como cabeceira, ou na vertical, como painel ou obra têxtil" },
          { label: "Uso indicado", value: "áreas internas" },
        ],
      },
    ],
  },
  {
    slug: "palafita",
    nome: "Coleção Palafita",
    capa: "/images/collections/capas/palafita.jpg",
    introImagem: "/images/collections/palafita/intro.jpg",
    intro:
      "Inspirada nos princípios construtivos das arquiteturas palafíticas brasileiras, a Coleção Palafita traduz elevação, leveza e permanência em uma linguagem contemporânea. O tramado integra a própria arquitetura do objeto, enquanto o vidro permite que a luz atravesse a composição e revele o trabalho manual.",
    pecas: [
      {
        slug: "mesa-palafita",
        nome: "Mesa Palafita",
        imagem: "/images/collections/palafita/mesa-palafita.jpg",
        paragrafos: [
          "Versátil e atemporal, a Mesa Palafita pode ser utilizada como mesa lateral, mesa de cabeceira ou apoio em salas, quartos, consultórios e espaços de acolhimento. Uma peça de presença discreta, funcional e afetiva, pensada para atravessar diferentes ambientes e momentos de uso.",
          "Sua estrutura combina aço tubular, madeira maciça, superfície tramada artesanalmente e tampo de vidro, criando uma composição em que matéria, transparência e vazio se equilibram para produzir uma sutil sensação de flutuação.",
          "O tampo de vidro preserva a leitura da trama e permite que a luz atravesse a composição, valorizando a textura e a riqueza do trabalho manual.",
        ],
        ficha: [
          { label: "Material da estrutura", value: "aço tubular com pintura eletrostática" },
          { label: "Tampo", value: "vidro incolor de 10 mm" },
          { label: "Pés e detalhes laterais", value: "madeira maciça de jequitibá" },
          { label: "Superfície", value: "tramado artesanal" },
          { label: "Dimensões", value: "50 cm de largura × 50 cm de profundidade × 50 cm de altura" },
          { label: "Peso", value: "10,7 kg" },
          { label: "Cores da estrutura", value: "areia, fendi, preto, verde, beterraba, terracota, aço cortén e outras opções disponíveis" },
          { label: "Tramado", value: "confeccionado manualmente, com diferentes possibilidades de desenhos e combinações de cores" },
          { label: "Possibilidades de uso", value: "mesa lateral, mesa de cabeceira ou apoio" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
    ],
  },
  {
    slug: "outras-pecas",
    nome: "Outras Peças",
    capa: "/images/collections/capas/outras.jpg",
    introImagem: "/images/collections/outras/intro.jpg",
    intro:
      "Algumas criações possuem identidade própria e são peças que exploram diferentes materiais, técnicas e referências, preservando a essência da Patuá: design autoral, produção artesanal e atenção aos detalhes.",
    pecas: [
      {
        slug: "cadeira-abraco",
        nome: "Cadeira Abraço",
        imagem: "/images/collections/outras/cadeira-abraco.jpg",
        paragrafos: [
          "A Cadeira Abraço nasce da releitura de um clássico das décadas de 1960 e 1970, reinterpretado pela Patuá por meio do encontro entre estrutura metálica e tramado artesanal em fio náutico.",
          "O gesto do tramar confere textura, ritmo e conforto, enquanto o desenho preciso da estrutura proporciona leveza visual e estabilidade. O resultado é uma peça que acolhe o corpo com naturalidade e valoriza o tempo dedicado ao fazer manual.",
          "Pensada para diferentes formas de habitar, a Abraço transita entre salas de estar, cantos de leitura, quartos e varandas cobertas. Seu desenho atemporal dialoga com interiores contemporâneos, minimalistas ou afetivos, acrescentando personalidade sem excessos.",
        ],
        ficha: [
          { label: "Material", value: "aço com pintura eletrostática e fio náutico" },
          { label: "Dimensões", value: "69 cm de largura × 70 cm de profundidade × 69 cm de altura" },
          { label: "Peso", value: "4 kg" },
          { label: "Capacidade", value: "suporta até 120 kg" },
          { label: "Cores da estrutura", value: "fendi" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
      {
        slug: "poltrona-diretor",
        nome: "Poltrona Diretor",
        imagem: "/images/collections/outras/poltrona-diretor.jpg",
        paragrafos: [
          "A Poltrona Diretor revisita a clássica cadeira de diretor sob uma nova perspectiva, unindo estrutura metálica, apoio de braços em madeira maciça e tramado artesanal em fio náutico.",
          "O encontro entre precisão estrutural e gesto manual resulta em uma peça confortável, leve e visualmente marcante. As proporções generosas e a ergonomia cuidadosa fazem da Diretor uma poltrona pensada para permanecer no cotidiano, oferecendo conforto sem abrir mão da elegância.",
          "Seu desenho autoral dialoga com diferentes linguagens arquitetônicas e materiais, tornando-se um elemento de destaque em salas, varandas cobertas e ambientes de convivência.",
        ],
        ficha: [
          { label: "Material", value: "aço com pintura eletrostática, apoio de braços em madeira maciça e fio náutico" },
          { label: "Dimensões", value: "60 cm de largura × 58 cm de profundidade × 88 cm de altura" },
          { label: "Peso", value: "8 kg" },
          { label: "Capacidade", value: "suporta até 130 kg" },
          { label: "Cores da estrutura", value: "fendi" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico, com diferentes possibilidades de desenhos e cores" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
      {
        slug: "trio-encaixe",
        nome: "Trio Encaixe",
        imagem: "/images/collections/outras/trio-encaixe.jpg",
        paragrafos: [
          "O Trio Encaixe é uma composição em madeira maciça com assentos tramados manualmente em fio náutico, concebida para unir desenho, funcionalidade e versatilidade.",
          "Disponíveis em três tamanhos, os bancos se encaixam perfeitamente entre si, formando um conjunto compacto que pode ser reorganizado conforme a necessidade. O desenho permite diferentes usos no cotidiano, funcionando como assento, mesa lateral, apoio ou suporte.",
          "A estética essencial e a riqueza do trabalho artesanal permitem que o conjunto dialogue com diversos materiais e estilos de interiores, acrescentando textura, ritmo e personalidade aos ambientes.",
        ],
        ficha: [
          { label: "Material", value: "madeira maciça e fio náutico" },
          { label: "Composição", value: "conjunto com três peças (P, M e G)" },
          { label: "Dimensões", value: "P: 25 × 25 × 16 cm · M: 33 × 25 × 32 cm · G: 41 × 25 × 48 cm (L × P × A)" },
          { label: "Tramado", value: "confeccionado manualmente em fio náutico" },
          { label: "Personalização", value: "diferentes combinações de cores para o tramado" },
          { label: "Possibilidades de uso", value: "assento, mesa lateral, apoio ou suporte" },
          { label: "Uso indicado", value: "áreas internas" },
        ],
      },
      {
        slug: "banco-sapateira-madeira",
        nome: "Banco Sapateira de Madeira",
        imagem: "/images/collections/outras/banco-sapateira-madeira.jpg",
        paragrafos: [
          "O Banco Sapateira de Madeira transforma um objeto do cotidiano em uma peça de design. Confeccionado em madeira maciça, com assento tramado à mão em fio náutico, combina organização, conforto e presença em um único desenho.",
          "Sua estrutura foi pensada para acomodar calçados sem comprometer a leveza visual do ambiente. Ao mesmo tempo, funciona como banco para calçar, apoio lateral ou elemento de composição, adaptando-se naturalmente a halls de entrada, quartos e closets.",
          "Mais do que uma peça utilitária, integra matéria, textura e funcionalidade em um objeto concebido para acompanhar o tempo e o uso diário.",
        ],
        ficha: [
          { label: "Material", value: "madeira maciça" },
          { label: "Assento", value: "tramado manualmente em fio náutico" },
          { label: "Dimensões", value: "60 cm de largura × 30 cm de profundidade × 43 cm de altura" },
          { label: "Altura das alças", value: "48 cm" },
          { label: "Peso", value: "4,25 kg" },
          { label: "Capacidade", value: "suporta até 120 kg" },
          { label: "Capacidade de armazenamento", value: "até 6 pares de calçados" },
          { label: "Personalização", value: "pode ser produzido em medidas personalizadas" },
          { label: "Cor da estrutura", value: "madeira clara" },
          { label: "Uso indicado", value: "halls, closets, quartos e áreas internas" },
        ],
      },
      {
        slug: "puff",
        nome: "Puff",
        imagem: "/images/collections/outras/puff.jpg",
        paragrafos: [
          "Confeccionado manualmente em fio de poliéster, o Puff Patuá foi pensado para acompanhar diferentes momentos do cotidiano com conforto e leveza.",
          "Seu enchimento removível proporciona praticidade no uso e na manutenção, enquanto a textura do tramado valoriza o trabalho artesanal e acrescenta personalidade ao ambiente. Compacto e versátil, pode funcionar como assento auxiliar, apoio para os pés ou elemento decorativo, integrando-se com naturalidade a salas, quartos, varandas cobertas e espaços de convivência.",
        ],
        ficha: [
          { label: "Material", value: "fio de poliéster" },
          { label: "Enchimento", value: "pérolas de EPS, removível" },
          { label: "Formato", value: "cilíndrico" },
          { label: "Dimensões", value: "60 cm de diâmetro × 30 cm de altura" },
          { label: "Peso", value: "aprox. 3,5 kg" },
          { label: "Cores", value: "disponível em ampla cartela de cores" },
          { label: "Possibilidades de uso", value: "assento auxiliar, apoio para os pés e elemento decorativo" },
          { label: "Uso indicado", value: "áreas internas e varandas cobertas" },
        ],
      },
    ],
  },
];

export function getColecao(slug: string): Colecao | undefined {
  return COLECOES.find((c) => c.slug === slug);
}

export function getPeca(
  colecaoSlug: string,
  pecaSlug: string,
): { colecao: Colecao; peca: Peca } | undefined {
  const colecao = getColecao(colecaoSlug);
  const peca = colecao?.pecas.find((p) => p.slug === pecaSlug);
  if (!colecao || !peca) return undefined;
  return { colecao, peca };
}
