"""
Genera los WebP que sirve la UI a partir de las copias de origen de public/img.

Los .jpg y .png son la copia de origen (los escriben fetch-images.ps1 y
knockout-bg.ps1) y se quedan en el repo; el navegador recibe el .webp, que es
a lo que apunta `imgWebp` en src/images.ts. Reejecutar despues de un fetch
nuevo o al anadir un retrato:

    python scripts/to-webp.py

Requiere Pillow (pip install pillow).
"""

import pathlib
import sys

from PIL import Image

IMG = pathlib.Path(__file__).resolve().parent.parent / "public" / "img"

# Fotografia sobre negro: WebP con perdida a q82, indistinguible a 48 px.
FOTOS = [
    "caso-rodrigo.jpg",
    "caso-julian.jpg",
    "caso-jhonatan.jpg",
    "caso-valentina.jpg",
    "retrato-traje-blanco.jpg",
]

# Grafico de linea con transparencia: se prueban las dos vias y gana la menor.
# Hoy gana lossless (92 KB frente a 94 KB), pero depende del contenido.
GRAFICOS = ["enfoque-collage.png"]

# Corredor de Blackline (scripts/fetch-stream-images.ps1). Mismo tratamiento que
# los retratos: son fotografia y ninguna necesita alfa. Van las nueve porque el
# corredor recorre images[i % length] con i < cards, y con cards=9 se usan
# exactamente las nueve; una decima nunca llegaria a pintarse.
STREAM = [f"stream-{i:02d}.jpg" for i in range(1, 10)]


def convertir(nombre: str, grafico: bool) -> tuple[int, int]:
    src = IMG / nombre
    if not src.exists():
        print(f"  falta {nombre}, se omite")
        return 0, 0

    dst = src.with_suffix(".webp")
    if grafico:
        im = Image.open(src).convert("RGBA")
        a, b = IMG / "_a.webp", IMG / "_b.webp"
        im.save(a, "WEBP", quality=88, method=6)
        im.save(b, "WEBP", lossless=True, method=6)
        gana, pierde = (a, b) if a.stat().st_size < b.stat().st_size else (b, a)
        gana.replace(dst)
        pierde.unlink()
    else:
        Image.open(src).convert("RGB").save(dst, "WEBP", quality=82, method=6)

    return src.stat().st_size, dst.stat().st_size


def main() -> int:
    antes = despues = 0
    print(f"{'archivo':<28}{'origen':>9}{'webp':>9}{'ahorro':>9}")
    for nombre in FOTOS + STREAM + GRAFICOS:
        a, b = convertir(nombre, grafico=nombre in GRAFICOS)
        if not a:
            continue
        antes, despues = antes + a, despues + b
        print(f"{nombre:<28}{a // 1024:>6} KB{b // 1024:>6} KB{100 - b * 100 // a:>8}%")

    if antes:
        print(f"\n{'TOTAL':<28}{antes // 1024:>6} KB{despues // 1024:>6} KB"
              f"{100 - despues * 100 // antes:>8}%")
    return 0


if __name__ == "__main__":
    sys.exit(main())
