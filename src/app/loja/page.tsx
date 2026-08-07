import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { WhatsappIcon } from "@/components/icons";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Loja virtual · Patuá Artesania Brasileira",
  description:
    "A loja virtual da Patuá está chegando. Em breve será possível escolher suas peças, conhecer todos os detalhes e levar para casa o design autoral da Patuá.",
  alternates: { canonical: "/loja" },
  openGraph: {
    title: "Loja virtual · Patuá Artesania Brasileira",
    description:
      "Um novo jeito de sentir a Patuá está chegando. Nossa loja virtual está nos últimos ajustes para receber você.",
    url: "/loja",
    type: "website",
    locale: "pt_BR",
    siteName: "Patuá Artesania Brasileira",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Quando é Patuá, você sente." }],
  },
};

const WHATSAPP_NUMBER = "5521975397680";
const AVISO_TEXTO =
  "Olá! Vim pelo site da Patuá. Quero ser avisado(a) quando a loja virtual abrir.";
const WHATSAPP_AVISO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(AVISO_TEXTO)}`;
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
// Catálogo único (todas as coleções), o mesmo servido em /professionals.
const CATALOGO_PDF = "/catalogo-patua.pdf";

export default async function LojaPage() {
  const [
    heroEyebrow,
    heroTitulo,
    heroTituloItalico,
    heroLead,
    heroBotao,
    heroImagem,
    marqueeTexto,
    vemTitulo,
    vemCorpo,
    item1Titulo,
    item1Corpo,
    item2Titulo,
    item2Corpo,
    item3Titulo,
    item3Corpo,
    enquantoTitulo,
    enquantoCorpo,
    finalTitulo,
    finalCorpo,
  ] = await Promise.all([
    getContent("loja.hero.eyebrow", "Loja virtual · últimos ajustes"),
    getContent("loja.hero.titulo", "Um novo jeito de sentir a Patuá"),
    getContent("loja.hero.titulo-italico", "está chegando."),
    getContent(
      "loja.hero.lead",
      "Nossa loja virtual está nos últimos ajustes para receber você.",
    ),
    getContent("loja.hero.botao", "Avise-me quando abrir"),
    getContent("loja.hero.imagem", {
      url: "/images/collections/index/destaque.jpg",
      alt: "Banquetas Patuá em tramado autoral, à luz da tarde",
    }),
    getContent("loja.marquee.texto", "Em breve · Loja virtual Patuá"),
    getContent("loja.vem.titulo", "O que vem por aí"),
    getContent(
      "loja.vem.corpo",
      "Em breve, será possível escolher suas peças, conhecer todos os detalhes e levar para casa o design autoral da Patuá com a mesma qualidade, cuidado e artesania presentes em cada criação.",
    ),
    getContent("loja.vem.item1-titulo", "Escolher suas peças"),
    getContent(
      "loja.vem.item1-corpo",
      "Navegue pelas coleções e encontre a peça que conversa com o seu espaço.",
    ),
    getContent("loja.vem.item2-titulo", "Conhecer todos os detalhes"),
    getContent(
      "loja.vem.item2-corpo",
      "Tramados, cores, medidas e acabamentos descritos peça por peça.",
    ),
    getContent("loja.vem.item3-titulo", "Levar para casa"),
    getContent(
      "loja.vem.item3-corpo",
      "A mesma artesania de sempre, agora com a compra a poucos cliques de distância.",
    ),
    getContent("loja.enquanto.titulo", "Enquanto a loja não abre"),
    getContent(
      "loja.enquanto.corpo",
      "Você continua podendo conhecer, escolher e encomendar sua peça com a gente — do jeito que sempre foi feito na Patuá: conversando.",
    ),
    getContent("loja.final.titulo", "Até já!"),
    getContent(
      "loja.final.corpo",
      "Deixe seu recado e avisamos você assim que a loja entrar no ar.",
    ),
  ]);

  return (
    <>
      {/* HERO — tipografia grande sobre creme, no mesmo registro de /collections */}
      <section className="bg-[var(--color-cream)] pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal>
                {/* Ponto pulsante = sinal de "no forno", sem precisar de contagem regressiva */}
                <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]">
                  <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-terracotta)] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-terracotta)]" />
                  </span>
                  <Editable id="loja.hero.eyebrow" as="span">
                    {heroEyebrow}
                  </Editable>
                </span>

                <h1 className="font-display mt-6 max-w-[15ch] text-[clamp(2.5rem,5.6vw,5rem)] leading-[1.02] tracking-[var(--tracking-tight)] text-[var(--color-bark)] balanced">
                  <Editable id="loja.hero.titulo" as="span">
                    {heroTitulo}
                  </Editable>{" "}
                  <Editable
                    id="loja.hero.titulo-italico"
                    as="span"
                    className="italic text-[var(--color-terracotta)]"
                  >
                    {heroTituloItalico}
                  </Editable>
                </h1>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:self-end md:pb-2">
              <Reveal delay={0.15}>
                <Editable
                  id="loja.hero.lead"
                  as="p"
                  className="max-w-[38ch] text-lg leading-[1.6] text-[var(--color-bark)]/80 md:text-xl"
                >
                  {heroLead}
                </Editable>

                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <a
                    href={WHATSAPP_AVISO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-terracotta)] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-terracotta-deep)]"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    <Editable id="loja.hero.botao" as="span">
                      {heroBotao}
                    </Editable>
                  </a>
                  <Link
                    href="/collections"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-bark)] underline-offset-4 transition-colors hover:text-[var(--color-terracotta)] hover:underline"
                  >
                    Ver as coleções
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOTO FULL-BLEED — a peça fala antes do texto voltar */}
      <section className="bg-[var(--color-cream)]">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bark)] sm:aspect-[16/9] md:aspect-[21/9]">
            <EditableImage
              id="loja.hero.imagem"
              src={heroImagem.url}
              alt={heroImagem.alt ?? "Peça autoral Patuá"}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* FAIXA EM MOVIMENTO — o "em breve" que respira */}
      <section
        aria-hidden
        className="border-y border-[var(--color-cream-light)]/10 bg-[var(--color-bark)] py-5 md:py-6"
      >
        <Marquee speed={34}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-16 font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-cream-light)]/85 md:text-sm"
            >
              {marqueeTexto}
              <span className="text-[var(--color-terracotta)]">◆</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* O QUE VEM POR AÍ — texto da cliente + desdobramento em três passos */}
      <section className="bg-[var(--color-cream-light)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Editable
                  id="loja.vem.titulo"
                  as="h2"
                  className="font-display max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
                >
                  {vemTitulo}
                </Editable>
                <Editable
                  id="loja.vem.corpo"
                  as="p"
                  className="mt-6 max-w-[46ch] text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg"
                >
                  {vemCorpo}
                </Editable>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:pt-2">
              <Reveal delay={0.12}>
                <ul className="divide-y divide-[color:var(--color-bark)]/12 border-y border-[color:var(--color-bark)]/12">
                  {[
                    { titulo: item1Titulo, corpo: item1Corpo },
                    { titulo: item2Titulo, corpo: item2Corpo },
                    { titulo: item3Titulo, corpo: item3Corpo },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-5 py-7 md:gap-7 md:py-8"
                    >
                      <span className="font-mono text-sm text-[var(--color-terracotta)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <Editable
                          id={`loja.vem.item${i + 1}-titulo`}
                          as="h3"
                          className="font-display text-xl leading-[1.15] tracking-[var(--tracking-snug)] text-[var(--color-bark)] md:text-2xl"
                        >
                          {item.titulo}
                        </Editable>
                        <Editable
                          id={`loja.vem.item${i + 1}-corpo`}
                          as="p"
                          className="mt-2.5 max-w-[52ch] text-base leading-[1.65] text-[var(--color-bark)]/75"
                        >
                          {item.corpo}
                        </Editable>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUANTO ISSO — a página não é um beco sem saída */}
      <section className="bg-[var(--color-cream)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-terracotta)]">
              Enquanto isso
            </span>
            <Editable
              id="loja.enquanto.titulo"
              as="h2"
              className="font-display balanced mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--color-bark)]"
            >
              {enquantoTitulo}
            </Editable>
            <Editable
              id="loja.enquanto.corpo"
              as="p"
              className="mt-6 max-w-[54ch] text-base leading-[1.7] text-[var(--color-bark)]/80 md:text-lg"
            >
              {enquantoCorpo}
            </Editable>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-[color:var(--color-bark)]/12 bg-[color:var(--color-bark)]/12 md:mt-16 md:grid-cols-3">
            <AtalhoCard
              href={WHATSAPP}
              external
              delay={0}
              icon={<WhatsappIcon className="h-5 w-5" />}
              titulo="Fale com a gente"
              corpo="Tire dúvidas, peça orçamento e encomende sua peça direto no WhatsApp."
            />
            <AtalhoCard
              href="/collections"
              delay={0.08}
              icon={<ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />}
              titulo="Conheça as coleções"
              corpo="Cobogó, Xodó, Andança, Palafita e outras peças autorais da Patuá."
            />
            <AtalhoCard
              href={CATALOGO_PDF}
              external
              delay={0.16}
              icon={<Download className="h-5 w-5" strokeWidth={1.6} />}
              titulo="Baixe o catálogo"
              corpo="Todas as coleções em PDF, com fotos e informações de cada peça."
            />
          </div>
        </div>
      </section>

      {/* ATÉ JÁ — fechamento na voz da cliente */}
      <section className="bg-[var(--color-terracotta)] py-24 text-center text-[var(--color-cream-light)] md:py-32">
        <div className="mx-auto w-full max-w-[var(--container-prose)] px-4 md:px-10">
          <Reveal>
            <Editable
              id="loja.final.titulo"
              as="h2"
              className="font-display text-[clamp(3rem,8vw,7rem)] italic leading-[0.95] tracking-[var(--tracking-tight)]"
            >
              {finalTitulo}
            </Editable>
            <Editable
              id="loja.final.corpo"
              as="p"
              className="mx-auto mt-8 max-w-[46ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/90 md:text-lg"
            >
              {finalCorpo}
            </Editable>

            {/* Um só CTA aqui: o rodapé logo abaixo já leva pras redes, então
                repetir Instagram/Facebook seria redundante. */}
            <a
              href={WHATSAPP_AVISO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-11 inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-8 py-4 text-sm font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
            >
              <WhatsappIcon className="h-4 w-4" />
              {heroBotao}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function AtalhoCard({
  href,
  external,
  icon,
  titulo,
  corpo,
  delay,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  titulo: string;
  corpo: string;
  delay: number;
}) {
  const className =
    "group flex h-full flex-col gap-5 bg-[var(--color-cream)] p-8 transition-colors duration-500 ease-[var(--ease-out-expo)] hover:bg-[var(--color-cream-light)] md:gap-6 md:p-10";

  // A seta anda junto da última palavra: em flex ela ia parar na borda direita
  // do card, e solta no fluxo ela quebrava sozinha numa linha só dela.
  const palavras = titulo.split(" ");
  const ultima = palavras.pop();

  const inner = (
    <>
      <span className="text-[var(--color-terracotta)]">{icon}</span>
      <span className="font-display block text-xl leading-[1.15] tracking-[var(--tracking-snug)] text-[var(--color-bark)] md:text-2xl">
        {palavras.length ? `${palavras.join(" ")} ` : null}
        <span className="whitespace-nowrap">
          {ultima}
          <span
            aria-hidden
            className="ml-2.5 inline-block text-[var(--color-terracotta)] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </span>
      <span className="block max-w-[34ch] text-base leading-[1.6] text-[var(--color-bark)]/70">
        {corpo}
      </span>
    </>
  );

  return (
    <Reveal delay={delay} className="h-full">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={className}>
          {inner}
        </Link>
      )}
    </Reveal>
  );
}
