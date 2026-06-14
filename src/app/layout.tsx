import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fragment_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSession } from "@/lib/session";
import { EditorProvider } from "@/components/editor/editor-provider";
import { EditToolbar } from "@/components/editor/edit-toolbar";
import "./globals.css";

const rawline = localFont({
  src: [
    { path: "./fonts/rawline-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/rawline-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/rawline-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/rawline-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/rawline-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/rawline-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-rawline",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patuá Ateliê — Móveis e objetos autorais",
  description:
    "Encante-se com peças que unem brasilidade, design autoral e contemporaneidade. Cadeiras, mesas e objetos autorais feitos à mão no Rio de Janeiro.",
  metadataBase: new URL("https://patua.local"),
  openGraph: {
    title: "Patuá Ateliê — Móveis e objetos autorais",
    description:
      "Encante-se com peças que unem brasilidade, design autoral e contemporaneidade.",
    type: "website",
    locale: "pt_BR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <html lang="pt-BR" className={`${rawline.variable} ${fragmentMono.variable}`}>
      <body className="bg-[var(--color-cream)] text-[var(--color-bark)] antialiased">
        <EditorProvider isEditor={!!session}>
          <SmoothScroll>
            <ScrollToTop />
            <SiteHeader />
            <main className="relative">{children}</main>
            <SiteFooter />
          </SmoothScroll>
          <EditToolbar />
        </EditorProvider>
      </body>
    </html>
  );
}
