import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { COLECOES } from "@/lib/colecoes";
import { CATEGORIES } from "@/lib/catalog";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/collections", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/todas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/professionals", priority: 0.8, changeFrequency: "monthly" },
  { path: "/coautoria", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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

  const catalogo = CATEGORIES.flatMap((categoria) => [
    {
      url: `${SITE_URL}/services/${categoria.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...categoria.products.map((produto) => ({
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
