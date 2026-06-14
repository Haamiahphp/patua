"use client";

import Image from "next/image";
import { Reveal, SplitWords } from "@/components/reveal";
import { useEditor } from "@/components/editor/editor-provider";
import { Editable } from "@/components/editor/editable";
import { EditableImage } from "@/components/editor/editable-image";

type ServicesHeroProps = {
  image: string;
  imageAlt: string;
  title: string;
  label?: string;
  description?: string;
  size?: "full" | "compact";
  // Quando informados, os respectivos campos viram editáveis inline (admin).
  imageId?: string;
  titleId?: string;
  labelId?: string;
  descriptionId?: string;
};

export function ServicesHero({
  image,
  imageAlt,
  title,
  label,
  description,
  size = "full",
  imageId,
  titleId,
  labelId,
  descriptionId,
}: ServicesHeroProps) {
  const { isEditor, editMode } = useEditor();
  const editing = isEditor && editMode;
  const heightClass =
    size === "compact"
      ? "h-[62svh] min-h-[440px]"
      : "h-[100svh] min-h-[640px]";

  return (
    <section className={`relative ${heightClass} w-full overflow-hidden bg-[var(--color-bark)]`}>
      {imageId ? (
        <EditableImage
          id={imageId}
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "linear-gradient(to top, #212121 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[var(--container-page)] px-4 pb-10 md:px-10 md:pb-14">
        <h1
          className="font-display max-w-5xl text-[clamp(2rem,5.4vw,4.875rem)] font-medium leading-[var(--leading-display)] tracking-[var(--tracking-tight)] text-[var(--color-cream-light)]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          {titleId && editing ? (
            <Editable id={titleId} as="span">
              {title}
            </Editable>
          ) : (
            <SplitWords text={title} />
          )}
        </h1>

        <Reveal delay={0.4}>
          <div className="mt-8 h-px w-full bg-[var(--color-cream-light)]/45 md:mt-12" />
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-6 grid items-start gap-6 md:mt-8 md:grid-cols-12 md:gap-10">
            {label ? (
              <div className="flex items-center gap-3 text-sm text-[var(--color-cream-light)] md:col-span-4">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-cream-light)]"
                />
                {labelId ? (
                  <Editable id={labelId} as="span">
                    {label}
                  </Editable>
                ) : (
                  <span>{label}</span>
                )}
              </div>
            ) : null}
            {description ? (
              descriptionId ? (
                <Editable
                  id={descriptionId}
                  as="p"
                  className="max-w-md text-base leading-[var(--leading-body)] text-[var(--color-cream-light)] md:col-span-7 md:col-start-6 md:text-xl"
                >
                  {description}
                </Editable>
              ) : (
                <p
                  className="max-w-md text-base leading-[var(--leading-body)] text-[var(--color-cream-light)] md:col-span-7 md:col-start-6 md:text-xl"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                >
                  {description}
                </p>
              )
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
