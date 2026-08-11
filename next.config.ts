import type { NextConfig } from "next";

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
};

export default nextConfig;
