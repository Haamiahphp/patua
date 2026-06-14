# Patuá — Admin / Inline Editor + Blog CMS — Design

**Data:** 2026-06-14
**Projeto:** `/Users/haamiah/patua-clone` (Next.js 16.2.4, React 19, Tailwind v4, framer-motion, lenis, bun)
**Status:** aprovado para implementação (faseado)

## Objetivo

Dar à cliente da Patuá um sistema de administração com login/senha, hospedado na própria Vercel, que permita:

1. **Editar textos e imagens** das páginas do site **inline** (edição no próprio site real, estilo website builder), em **todas as páginas principais** (Home, Sobre, Contato, Coleções, Peças/Serviços).
2. **Gerenciar um blog** com editor rich-text (WYSIWYG): criar, editar, publicar e remover posts, com imagens.

## Contexto atual

- Todo o conteúdo hoje é **hardcoded** dentro dos componentes (`.tsx`) e de alguns arquivos em `src/lib/` (`data.ts`, `collections.ts`, `service-details.ts`, `catalog.ts`).
- As imagens (104 arquivos) são estáticas em `public/images/`.
- **Restrição-chave:** na Vercel o filesystem é read-only em runtime (serverless). O admin não pode reescrever `.tsx` nem gravar em `public/` com o site no ar. Logo, conteúdo editável precisa viver num **banco de dados** e imagens novas num **object storage**.

## Decisão de arquitetura

**Content store próprio (key-value) em Postgres + componentes `<Editable>` + Vercel Blob.**

Alternativas descartadas:
- **Git-based CMS** (escrever de volta no repo + redeploy): cada edição levaria ~30-60s para aparecer — incompatível com a sensação de edição inline ao vivo.
- **CMS headless pronto** (Sanity/Payload/Strapi): edição acontece no studio externo, não no próprio site — contraria o requisito de edição inline; adiciona dependência/custo.

## Stack e infraestrutura

- **Banco:** Neon Postgres (free tier; integra nativo na Vercel; já usado em outros projetos do usuário).
- **Imagens novas:** Vercel Blob (free tier). Imagens atuais em `public/` permanecem; só viram editáveis as que a cliente quiser trocar (ao trocar, a nova vai pro Blob e a URL é salva no store).
- **Auth:** admin único. Credencial em env var (`ADMIN_USERNAME` + `ADMIN_PASSWORD_HASH` com bcrypt/argon). Sessão em cookie httpOnly assinado (JWT via `jose`). Middleware protege rotas/admin e APIs de escrita.
- **Editor de blog:** Tiptap (WYSIWYG headless React). Conteúdo salvo como HTML (ou JSON do Tiptap) no `blog_posts`. Upload de imagem dentro do editor → Blob.
- **Acesso ao banco:** driver `@neondatabase/serverless`. ORM leve (Drizzle) opcional para type-safety; decisão final no plano de implementação.

## Modelo de dados

```
content
  key        text  primary key   -- ex: "home.hero.slide1.titulo"
  value      jsonb               -- string p/ texto; { url, alt } p/ imagem
  updated_at timestamptz

blog_posts
  id          uuid primary key
  slug        text unique
  title       text
  cover_url   text
  excerpt     text
  body        text               -- HTML/JSON do Tiptap
  status      text               -- 'draft' | 'published'
  published_at timestamptz null
  created_at  timestamptz
  updated_at  timestamptz
```

(Possível tabela `media` para galeria de uploads — opcional, decidido no plano.)

## Componentes / abstrações centrais

- **`<Editable id="key">`** — texto. Modo normal: renderiza o valor do store. Modo edição: `contentEditable`, salva no blur via API → DB → revalidate.
- **`<EditableImage id="key">`** — imagem. Modo normal: `<Image>` com a URL do store (ou fallback estático). Modo edição: clique abre upload → Blob → salva `{url, alt}`.
- **`<EditToolbar>`** — barra flutuante renderizada só para usuários logados; toggle "Editar / Sair da edição", indicador de salvamento.
- **`EditorProvider`** — contexto que expõe `isEditor` (da sessão) e `editMode` (toggle); só ativa edição para sessão válida.
- **Content loader** — função server-side que lê `content` por chave(s), com cache por tag (`revalidateTag` no save). Helper `getContent(key, fallback)`.

### Comportamentos especiais
- **Hero (carrossel):** em modo edição o autoplay pausa, permitindo editar o slide visível.
- **Fallback:** se a chave não existe no banco, usa o valor hardcoded atual como default (migração incremental, sem tela quebrada).
- **Cache:** páginas públicas leem do store com cache por tag; ao salvar, `revalidateTag` atualiza o público sem redeploy.

## Faseamento

1. **Fundação** — Neon + Blob + login/auth + middleware + `EditorProvider` + `<Editable>`/`<EditableImage>` + `<EditToolbar>` + content loader + revalidação. Provado **apenas na Home** (1-2 seções).
2. **Home completa** — migrar todas as seções para editável: hero, manifesto, services, process, universe, gallery, portfolio, cta, header, footer.
3. **Demais páginas** — Sobre, Contato, Coleções, Peças/Serviços (texto e imagens editáveis).
4. **Blog CMS** — `blog_posts` + Tiptap + telas `/admin` (lista/criar/editar/publicar) + render público `/blog` e `/blog/[slug]`.

Specs separados: **este documento cobre fases 1-3** em nível de arquitetura, detalhando fundação+home. A **fase 4 (blog)** ganha seu próprio spec antes de implementar.

## Segurança

- Rotas de escrita (`/api/content`, `/api/upload`, `/api/blog/*`) exigem sessão válida; verificação no middleware + no handler.
- Senha nunca em texto plano (hash em env). Cookie httpOnly, `secure`, `sameSite=lax`.
- Sanitização do HTML do blog antes de renderizar (evitar XSS via Tiptap).
- Validação de tipo/tamanho no upload de imagem.

## Critérios de sucesso (v1, fases 1-3)

- Cliente loga em `/admin/login`, vê o site com barra de edição.
- Em modo edição, edita qualquer texto e troca qualquer imagem nas páginas principais; ao salvar, a mudança aparece no site público.
- Conteúdo não-editado continua exibindo o valor atual (fallback).
- Build passa; deploy na Vercel funcionando com Neon + Blob.

## Fora de escopo (v1)

- Editar o catálogo de peças como CRUD de produtos (dimensões/acabamentos/cores) — possível fase futura.
- Multiusuário / papéis / histórico de versões.
- Drag-and-drop de layout/reordenar seções (é edição de conteúdo, não de estrutura).
