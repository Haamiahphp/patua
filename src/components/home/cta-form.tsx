"use client";

import { useState, type FormEvent } from "react";

const WHATSAPP_NUMBER = "5521975397680";

export function CtaForm() {
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
