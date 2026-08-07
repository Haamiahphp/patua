import { SITE_URL } from "@/lib/site";

/**
 * Dados estruturados (schema.org) para o Google.
 *
 * O `<script type="application/ld+json">` nativo é a recomendação do Next pra
 * JSON-LD — não é código executável, então não passa pelo next/script. O
 * `replace` de `<` é a proteção contra injeção citada na doc.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const TELEFONE = "+55-21-97539-7680";
const EMAIL = "contato@patuaartesania.com.br";

/**
 * Identidade da marca. É daqui que o Google tira o nome oficial — foi o que
 * faltava quando a busca insistia em "Patuá Ateliê", nome antigo que só existia
 * no <title>.
 */
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacao`,
  name: "Patuá Artesania Brasileira",
  alternateName: "Patuá",
  url: SITE_URL,
  logo: `${SITE_URL}/images/g48RVMC75t4soXPzIMLxkJiktPs.png`,
  image: `${SITE_URL}/og.jpg`,
  description:
    "Ateliê de móveis e objetos autorais feitos à mão no Rio de Janeiro, com tramados artesanais em fio náutico e criação em coautoria.",
  email: EMAIL,
  telephone: TELEFONE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Laranjeiras",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/patuaartesania",
    "https://www.facebook.com/patuaartesania",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: TELEFONE,
    email: EMAIL,
    areaServed: "BR",
    availableLanguage: ["pt-BR"],
  },
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: "Patuá Artesania Brasileira",
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organizacao` },
};

/** Bloco global, injetado no layout. */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [ORGANIZATION, WEBSITE],
};

/** Trilha de navegação — casa com o breadcrumb visual das páginas de peça. */
export function breadcrumbJsonLd(
  itens: Array<{ nome: string; url: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
