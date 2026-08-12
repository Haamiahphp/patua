// URL pública do site, usada em metadados absolutos (Open Graph, canonical),
// no robots.txt e no sitemap.xml.
export const SITE_URL = "https://patuaartesania.com.br";

// Loja virtual da Patuá. Fica fora deste app, num subdomínio próprio — todo
// botão de "compre online" aponta pra cá, e /loja redireciona pra cá
// (ver `redirects` no next.config.ts). Fonte única da URL.
export const LOJA_URL = "https://loja.patuaartesania.com.br";
