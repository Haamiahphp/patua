import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Canonical apontando pro lugar errado é invisível: a página abre normalmente,
 * só some da busca. Foi o que aconteceu — o layout raiz declarava
 * `alternates: { canonical: "/" }`, e como metadata de layout é herdada, TODAS
 * as páginas passaram a dizer ao Google que a URL oficial delas era a home.
 * Estes testes travam as duas pontas.
 */

const APP = join(import.meta.dir);

function paginasComMetadata(dir: string, achadas: string[] = []): string[] {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      // /admin é área logada, fora do índice (ver robots.ts)
      if (nome === "admin") continue;
      paginasComMetadata(caminho, achadas);
    } else if (nome === "page.tsx") {
      const src = readFileSync(caminho, "utf-8");
      if (/export const metadata|export async function generateMetadata/.test(src)) {
        achadas.push(caminho);
      }
    }
  }
  return achadas;
}

describe("canonical", () => {
  test("o layout raiz não declara canonical (senão toda página herda o dele)", () => {
    const layout = readFileSync(join(APP, "layout.tsx"), "utf-8");
    expect(layout).not.toMatch(/alternates\s*:\s*\{[^}]*canonical/);
  });

  test("toda página indexável declara o próprio canonical", () => {
    const semCanonical = paginasComMetadata(APP)
      .filter((p) => {
        const src = readFileSync(p, "utf-8");
        if (/index\s*:\s*false/.test(src)) return false; // fora do índice, dispensada
        return !src.includes("canonical");
      })
      .map((p) => p.replace(APP, "src/app"));

    expect(semCanonical).toEqual([]);
  });
});
