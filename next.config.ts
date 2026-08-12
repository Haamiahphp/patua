import type { NextConfig } from "next";
import { LOJA_URL } from "./src/lib/site";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // /pedidos é a página estática de public/pedidos/index.html. A pasta public
  // só responde no caminho exato do arquivo, então o rewrite faz o link curto
  // da marca chegar nela. A query (?p=...) segue junto.
  async rewrites() {
    return [{ source: "/pedidos", destination: "/pedidos/index.html" }];
  },
  // A loja virtual saiu do site e virou subdomínio próprio. /loja existia como
  // página "em breve" — agora manda pra loja de verdade, pra link antigo,
  // print e resultado de busca não caírem em 404. 308 (permanent) porque a
  // mudança é definitiva.
  async redirects() {
    return [
      { source: "/loja", destination: LOJA_URL, permanent: true },
      { source: "/loja/:path*", destination: LOJA_URL, permanent: true },
    ];
  },
};

export default nextConfig;
