import { test, expect } from "bun:test";
import { isValidKey } from "./content-key";

test("aceita chaves namespaced válidas", () => {
  expect(isValidKey("home.manifesto.texto")).toBe(true);
  expect(isValidKey("home.hero.slide1.titulo")).toBe(true);
  expect(isValidKey("blog.post-1.cover")).toBe(true);
});

test("rejeita chaves inválidas", () => {
  expect(isValidKey("home")).toBe(false);          // sem ponto
  expect(isValidKey("Home.Manifesto")).toBe(false); // maiúsculas
  expect(isValidKey("home..texto")).toBe(false);    // ponto duplo
  expect(isValidKey("home.tex to")).toBe(false);    // espaço
  expect(isValidKey("")).toBe(false);
});
