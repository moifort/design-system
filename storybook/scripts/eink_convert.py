#!/usr/bin/env python3
"""Convert the e-ink source screenshot to the Waveshare panel's exact look.

Reuses the threshold quantization from /Users/thibaut/Code/dashboard/converter.py
(`_convert_4color`): per-pixel mapping to BLACK / WHITE / RED / YELLOW with NO dithering.
We emit the *quantized RGB image* (a faithful preview of what the 4-color e-paper shows),
not the packed EPD buffer.

Usage: python3 scripts/eink_convert.py <source.png> <out.png>
"""
import sys
from PIL import Image

# Panel palette (converter.py). Yellow is in the panel set but never used by design.
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)


def quantize(img: Image.Image) -> Image.Image:
    rgb = img.convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    out = Image.new("RGB", (w, h), WHITE)
    o = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r > 180 and g < 100 and b < 100:
                o[x, y] = RED
            elif r > 180 and g > 180 and b < 100:
                o[x, y] = YELLOW
            elif r * 0.299 + g * 0.587 + b * 0.114 > 128:
                o[x, y] = WHITE
            else:
                o[x, y] = BLACK
    return out


def main() -> None:
    src, dst = sys.argv[1], sys.argv[2]
    img = Image.open(src)
    out = quantize(img)
    out.save(dst)
    print(f"✓ wrote {dst} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    main()
