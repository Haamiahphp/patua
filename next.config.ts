import type { NextConfig } from "next";

// A loja virtual entrou no ar em loja.patuaartesania.com.br, então /loja deixou
// de ser página do site (era a landing "em breve") e virou redirect permanente.
// O 308 preserva o método e diz ao Google que o endereço mudou de vez; os links
// antigos que a cliente já divulgou continuam chegando na loja certa.
const LOJA_URL = "https://loja.patuaartesania.com.br";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/loja", destination: LOJA_URL, permanent: true },
      // Qualquer coisa abaixo de /loja (links antigos, /loja/qualquer-coisa)
      // também cai na home da loja: o catálogo lá tem outra estrutura de URL.
      { source: "/loja/:path*", destination: LOJA_URL, permanent: true },
    ];
  },
};

export default nextConfig;
