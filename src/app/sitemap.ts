import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { COLECOES, urlDaPecaPorSlug } from "@/lib/colecoes";
import { CATEGORIES } from "@/lib/catalog";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/collections", priority: 0.9, changeFrequency: "monthly" },
  { path: "/loja", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/todas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/professionals", priority: 0.8, changeFrequency: "monthly" },
  { path: "/coautoria", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
];

/**
 * Data da última revisão real do conteúdo.
 *
 * Antes isto era `new Date()`: todo deploy carimbava "modificado agora" em
 * todas as URLs, inclusive nas que não mudaram há meses. Para o Google isso é
 * ruído — ele aprende que o `lastmod` do site não significa nada e passa a
 * ignorar o sinal. Atualize esta data quando o conteúdo mudar de verdade.
 */
const REVISADO_EM = new Date("2026-08-07T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = REVISADO_EM;

  const colecoes = COLECOES.flatMap((colecao) => [
    {
      url: `${SITE_URL}/collections/${colecao.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...colecao.pecas.map((peca) => ({
      url: `${SITE_URL}/collections/${colecao.slug}/${peca.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  // Produto que também existe em /collections tem o canonical apontado pra lá —
  // listar as duas URLs aqui pediria ao Google pra indexar uma página que a
  // própria página diz não ser a oficial.
  const catalogo = CATEGORIES.flatMap((categoria) => [
    {
      url: `${SITE_URL}/services/${categoria.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...categoria.products
      .filter((produto) => !urlDaPecaPorSlug(produto.slug))
      .map((produto) => ({
        url: `${SITE_URL}/services/${categoria.slug}/${produto.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...colecoes,
    ...catalogo,
  ];
}
