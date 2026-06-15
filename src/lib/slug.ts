export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos (marcas combinantes)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // não-alfanum → hífen
    .replace(/^-+|-+$/g, "") // tira hífens das pontas
    .slice(0, 80);
}
