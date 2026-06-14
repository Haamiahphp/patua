import { getContent } from "@/lib/content";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

type Step = {
  n: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  alt: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Origem",
    subtitle: "A peça começa na escuta.",
    body: "Tudo começa antes da peça existir. A origem está no encontro entre o espaço, a intenção de quem vai viver com a peça e o repertório da Patuá. Observamos o ambiente, as cores ao redor, a luz, os usos do dia a dia. A partir dessa escuta, começa a nascer a ideia do que aquela peça pode se tornar.",
    image: "/images/processo/processo-1-origem.jpg",
    alt: "Detalhe de tramado manual em fios coloridos",
  },
  {
    n: "02",
    title: "Desenho em Coautoria",
    subtitle: "O desenho define o ritmo da trama.",
    body: "A partir da origem, surge o desenho. Cada trama é pensada como um gesto visual: ritmo, repetição, pausas e cores que dialogam com o ambiente. O desenho não é apenas estético, ele define como o fio se comporta, como a superfície respira e como a peça será percebida no espaço.",
    image: "/images/processo/processo-2-coautoria.png",
    alt: "Mesa com padronagem geométrica em palha trançada",
  },
  {
    n: "03",
    title: "Fazer Manual",
    subtitle: "Cada fio encontra seu lugar no tempo do gesto.",
    body: "O fazer manual é o coração da Patuá. Cada fio é entrelaçado à mão, respeitando o tempo necessário para que o tramado se forme com consistência e beleza. Esse tempo não é um detalhe do processo, ele é parte do valor da peça.",
    image: "/images/processo/processo-3-trama.png",
    alt: "Banco baixo com tramado em fios coloridos",
  },
  {
    n: "04",
    title: "Presença",
    subtitle: "A peça encontra seu lugar na vida da casa.",
    body: "Quando a peça chega ao espaço, ela passa a fazer parte da vida da casa. Mais do que um objeto, ela se torna presença: acompanha conversas, silêncios, encontros e o passar do tempo. É assim que a história da peça continua.",
    image: "/images/processo/processo-4-presenca.png",
    alt: "Banquetas Patuá em uma cozinha com vista para a natureza",
  },
];

export async function ProcessSection() {
  const heading = await getContent("home.process.titulo", "Processo Criativo");
  const steps = await Promise.all(
    STEPS.map(async (s) => {
      const base = `home.process.step${s.n}`;
      return {
        n: s.n,
        base,
        title: await getContent(`${base}.titulo`, s.title),
        subtitle: await getContent(`${base}.subtitulo`, s.subtitle),
        body: await getContent(`${base}.corpo`, s.body),
        image: await getContent(`${base}.imagem`, { url: s.image, alt: s.alt }),
      };
    }),
  );

  return (
    <section className="relative bg-[var(--color-terracotta)] text-[var(--color-cream-light)]">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Coluna sticky com o título */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="sticky top-[120px] py-24 md:py-40">
              <Editable
                id="home.process.titulo"
                as="h2"
                className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[var(--leading-display)] tracking-[var(--tracking-tight)]"
              >
                {heading}
              </Editable>
            </div>
          </div>

          {/* Coluna com os passos rolando */}
          <div className="md:col-span-7 lg:col-span-7">
            <ol className="flex flex-col">
              {steps.map((step) => (
                <li key={step.n} className="flex flex-col py-16 md:py-24">
                  <p className="font-display text-[24px] leading-[1.2] text-[var(--color-cream-light)] md:text-[30px]">
                    <span>
                      {step.n} —{" "}
                      <Editable id={`${step.base}.titulo`} as="span">
                        {step.title}
                      </Editable>
                    </span>
                    <span className="ml-3 text-[var(--color-cream-light)]/85">
                      <Editable id={`${step.base}.subtitulo`} as="span">
                        {step.subtitle}
                      </Editable>
                    </span>
                  </p>

                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[2px] md:mt-8">
                    <EditableImage
                      id={`${step.base}.imagem`}
                      src={step.image.url}
                      alt={step.image.alt ?? step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>

                  <Editable
                    id={`${step.base}.corpo`}
                    as="p"
                    className="mt-6 max-w-prose text-sm leading-[var(--leading-body)] text-[var(--color-cream-light)]/80 md:mt-8 md:text-base"
                  >
                    {step.body}
                  </Editable>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
