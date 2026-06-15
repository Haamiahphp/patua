import sanitizeHtml from "sanitize-html";

// Allowlist para o HTML vindo do editor Tiptap. Roda no SERVIDOR no momento
// do save, então o corpo já é armazenado limpo (defesa contra XSS).
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "hr",
    "h2",
    "h3",
    "strong",
    "em",
    "u",
    "s",
    "blockquote",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "code",
    "pre",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  // Garante links externos seguros.
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener nofollow",
      target: "_blank",
    }),
  },
};

export function sanitizePostBody(dirty: string): string {
  return sanitizeHtml(dirty ?? "", OPTIONS);
}
