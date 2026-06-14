"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { WhatsappIcon } from "@/components/icons";

const WHATSAPP_NUMBER = "5521975397680";
const EMAIL = "contato@patuaartesania.com.br";

export function CtaSection() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    whatsapp: "",
    email: "",
    descricao: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      `Olá, sou ${form.nome} ${form.sobrenome}.`,
      form.email && `E-mail: ${form.email}`,
      form.whatsapp && `WhatsApp: ${form.whatsapp}`,
      "",
      form.descricao,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <section className="relative bg-[var(--color-terracotta)] py-24 text-[var(--color-cream-light)] md:py-32">
      <div className="mx-auto w-full max-w-[var(--container-page)] px-4 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          {/* Esquerda */}
          <Reveal className="md:pr-16 md:border-r md:border-[var(--color-cream-light)]/35">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[var(--tracking-tight)]">
              Dê origem a uma
              <br />
              peça em coautoria
            </h2>
            <p className="mt-8 max-w-[44ch] text-base leading-[var(--leading-body)] text-[var(--color-cream-light)]/85 md:text-lg">
              Se você tem uma ideia, um espaço ou deseja uma peça autoral, entre
              em contato. Cada criação nasce através do diálogo, da matéria e do
              processo.
            </p>

            <div className="mt-12 space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="block font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] tracking-[var(--tracking-tight)] transition-opacity hover:opacity-75"
              >
                {EMAIL}
              </a>
              <div className="space-y-1.5 text-base text-[var(--color-cream-light)]/90 md:text-lg">
                <p>Whatsapp · (21) 97539-7680</p>
                <p>Laranjeiras, Rio de Janeiro. Brasil</p>
                <p className="text-[var(--color-cream-light)]/75">
                  Seg a sex, 9h às 20h · Sáb, 9h às 13h
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-cream-light)] px-6 py-3.5 text-sm font-medium text-[var(--color-cream-light)] transition-colors hover:bg-[var(--color-cream-light)] hover:text-[var(--color-bark)]"
            >
              <WhatsappIcon className="h-4 w-4" />
              Fale com nosso atendimento personalizado
            </a>
          </Reveal>

          {/* Direita: formulário */}
          <Reveal delay={0.15} className="md:pl-16">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Nome"
                  name="nome"
                  value={form.nome}
                  onChange={onChange}
                  placeholder="Jane"
                  required
                />
                <Field
                  label="Sobrenome"
                  name="sobrenome"
                  value={form.sobrenome}
                  onChange={onChange}
                  placeholder="Smith"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={onChange}
                  placeholder="(21) 99999-0000"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="jane@email.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="descricao" className="text-sm text-[var(--color-cream-light)]/90">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={form.descricao}
                  onChange={onChange}
                  placeholder="Escreva sua mensagem aqui"
                  rows={5}
                  required
                  className="resize-y rounded-[6px] border border-[var(--color-cream-light)]/30 bg-[var(--color-cream-light)]/10 px-4 py-3 text-[var(--color-cream-light)] placeholder:text-[var(--color-cream-light)]/55 focus:border-[var(--color-cream-light)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-6 py-4 text-base font-medium text-[var(--color-bark)] transition-colors hover:bg-white"
              >
                Enviar
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-[var(--color-cream-light)]/90">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded-[6px] border border-[var(--color-cream-light)]/30 bg-[var(--color-cream-light)]/10 px-4 py-3 text-[var(--color-cream-light)] placeholder:text-[var(--color-cream-light)]/55 focus:border-[var(--color-cream-light)] focus:outline-none"
      />
    </div>
  );
}
