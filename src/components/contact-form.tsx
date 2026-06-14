"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const sobrenome = String(data.get("sobrenome") ?? "");
    const whatsapp = String(data.get("whatsapp") ?? "");
    const email = String(data.get("email") ?? "");
    const descricao = String(data.get("descricao") ?? "");

    const text = `Olá, vim pelo site do Patuá.\n\n· Nome: ${nome} ${sobrenome}\n· WhatsApp: ${whatsapp}\n· Email: ${email}\n\n${descricao}`;
    await new Promise((r) => setTimeout(r, 500));
    setDone(true);
    setSubmitting(false);
    window.open(
      `https://wa.me/5521975397680?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 md:space-y-7">
      <div className="grid gap-6 sm:grid-cols-2 md:gap-7">
        <Field label="Nome" name="nome" required placeholder="Jane" />
        <Field label="Sobrenome" name="sobrenome" placeholder="Smith" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:gap-7">
        <Field
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          placeholder="(11) 99999-9999"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="jane@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="descricao"
          className="block text-sm text-[var(--color-cream-light)]/90"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={5}
          required
          placeholder="Escreva sua mensagem aqui"
          className="mt-2 block w-full resize-none rounded-[10px] bg-[var(--color-cream-light)]/15 px-4 py-3 text-base text-[var(--color-cream-light)] outline-none ring-1 ring-[var(--color-cream-light)]/15 transition-colors placeholder:text-[var(--color-cream-light)]/55 focus:ring-[var(--color-cream-light)]/50"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group block w-full rounded-[var(--radius-pill)] bg-[var(--color-cream-light)] px-7 py-4 text-base font-medium text-[var(--color-bark)] transition-colors hover:bg-white disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Enviar"}
      </button>

      <AnimatePresence>
        {done ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-[var(--color-cream-light)]"
          >
            Pronto! Abrimos o WhatsApp pra concluir o envio.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm text-[var(--color-cream-light)]/90"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-[10px] bg-[var(--color-cream-light)]/15 px-4 py-3 text-base text-[var(--color-cream-light)] outline-none ring-1 ring-[var(--color-cream-light)]/15 transition-colors placeholder:text-[var(--color-cream-light)]/55 focus:ring-[var(--color-cream-light)]/50"
      />
    </div>
  );
}
