import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Área de edição de conteúdo e rotas internas: fora do índice.
      disallow: ["/admin", "/api", "/styleguide"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
