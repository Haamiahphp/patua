"""Estende um banner na horizontal continuando o degradê do fundo.

As artes chegam da cliente em 16:9, e a faixa do herói no desktop é mais larga
que isso. Em vez de cortar a composição pra preencher a faixa, este script
prolonga a arte pro lado que já é fundo liso: pega a cor média das últimas
colunas, suaviza na vertical e repete até a proporção alvo, com um cross-fade
curto na emenda pra não sobrar linha visível.

Uso:
    python3 scripts/extend-banner.py <entrada> <saida.webp> [proporção] [lado]

    lado = "right" (padrão) ou "left" — de que lado a extensão entra.

Exemplo (banner de e-commerce, estendido à direita até 3:1):
    python3 scripts/extend-banner.py \\
        public/images/hero/ecommerce.jpg \\
        public/images/hero/ecommerce-wide.webp 3.0 right

Depende do Pillow: pip install pillow
"""

import sys

from PIL import Image

SEAM = 140  # largura do cross-fade na emenda
SAMPLE = 16  # colunas da arte usadas pra montar a cor da extensão


def extend(src: str, out: str, ratio: float = 3.0, side: str = "right") -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    new_w = int(round(h * ratio))
    if new_w <= w:
        raise SystemExit(f"{src} já tem {w / h:.2f}:1, nada a estender")
    ext_w = new_w - w

    # Coluna-semente: média das últimas colunas (BOX = média), depois suavizada
    # na vertical, senão o ruído de JPEG daquela coluna vira listra na extensão.
    box = (w - SAMPLE, 0, w, h) if side == "right" else (0, 0, SAMPLE, h)
    col = im.crop(box).resize((1, h), Image.BOX)
    col = col.resize((1, max(2, h // 12)), Image.BOX).resize((1, h), Image.BICUBIC)

    canvas = Image.new("RGB", (new_w, h))
    canvas.paste(im, (0, 0) if side == "right" else (ext_w, 0))
    canvas.paste(col.resize((ext_w, h), Image.BICUBIC), (w, 0) if side == "right" else (0, 0))

    mask = Image.new("L", (SEAM, 1))
    for x in range(SEAM):
        t = x / (SEAM - 1)
        mask.putpixel((x, 0), int(255 * (t if side == "right" else 1 - t)))
    mask = mask.resize((SEAM, h), Image.BICUBIC)

    edge = (w - SEAM, 0, w, h) if side == "right" else (0, 0, SEAM, h)
    seam = Image.composite(col.resize((SEAM, h), Image.BICUBIC), im.crop(edge), mask)
    canvas.paste(seam, (w - SEAM, 0) if side == "right" else (ext_w, 0))

    canvas.save(out, "WEBP", quality=90, method=6)
    print(f"{src} {w}x{h} -> {out} {new_w}x{h}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    extend(
        sys.argv[1],
        sys.argv[2],
        float(sys.argv[3]) if len(sys.argv) > 3 else 3.0,
        sys.argv[4] if len(sys.argv) > 4 else "right",
    )
