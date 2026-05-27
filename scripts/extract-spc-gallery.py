"""Extract 8 diverse-tone SPC swatch images from a product catalog PDF."""
import io
import os
import sys

import fitz
from PIL import Image

PDF = r"d:\洪健\新建文件夹 (3)\新建文件夹 (11)\新建文件夹 (11)\SPC地板\（已压缩）花色一册.pdf"
OUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "images",
    "products",
    "spc",
    "gallery",
)


def avg_rgb(im: Image.Image) -> tuple[float, float, float]:
    px = im.resize((64, 64))
    colors = list(px.getdata())
    n = len(colors)
    return tuple(sum(c[i] for c in colors) / n for i in range(3))


def rgb_to_hue(r: float, g: float, b: float) -> tuple[float, float]:
    mx, mn = max(r, g, b), min(r, g, b)
    d = mx - mn
    if d == 0:
        hue = 0.0
    elif mx == r:
        hue = (60 * ((g - b) / d) + 360) % 360
    elif mx == g:
        hue = 60 * ((b - r) / d) + 120
    else:
        hue = 60 * ((r - g) / d) + 240
    sat = 0 if mx == 0 else d / mx
    return hue, sat


def crop_4_3(im: Image.Image) -> Image.Image:
    w, h = im.size
    target = 4 / 3
    cur = w / h
    if cur > target:
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target)
        top = (h - nh) // 2
        im = im.crop((0, top, w, top + nh))
    return im.resize((1200, 900), Image.Resampling.LANCZOS)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = fitz.open(PDF)
    seen: set[int] = set()
    candidates: list[dict] = []

    for page_index in range(doc.page_count):
        page = doc[page_index]
        for img in page.get_images(full=True):
            xref = img[0]
            if xref in seen:
                continue
            seen.add(xref)
            try:
                base = doc.extract_image(xref)
            except Exception:
                continue

            w, h = base["width"], base["height"]
            if w < 120 or h < 120 or w * h < 20000:
                continue

            try:
                im = Image.open(io.BytesIO(base["image"])).convert("RGB")
            except Exception:
                continue

            r, g, b = (x / 255 for x in avg_rgb(im))
            brightness = sum((r, g, b)) / 3 * 255
            if brightness > 245 or brightness < 8:
                continue

            hue, sat = rgb_to_hue(r, g, b)
            candidates.append(
                {
                    "page": page_index + 1,
                    "w": w,
                    "h": h,
                    "hue": hue,
                    "sat": sat,
                    "data": base["image"],
                }
            )

    candidates.sort(key=lambda c: c["w"] * c["h"], reverse=True)
    selected: list[dict] = []
    if candidates:
        selected.append(candidates[0])
        for _ in range(7):
            best = None
            best_score = -1.0
            for c in candidates:
                if c in selected:
                    continue
                min_dist = min(
                    min(abs(c["hue"] - s["hue"]), 360 - abs(c["hue"] - s["hue"]))
                    for s in selected
                )
                score = min_dist + c["sat"] * 20 + (c["w"] * c["h"]) / 1e6
                if score > best_score:
                    best_score = score
                    best = c
            if best:
                selected.append(best)

    print(f"candidates={len(candidates)} selected={len(selected)}")
    for i, c in enumerate(selected, 1):
        path = os.path.join(OUT_DIR, f"{i:02d}.jpg")
        im = crop_4_3(Image.open(io.BytesIO(c["data"])).convert("RGB"))
        im.save(path, "JPEG", quality=88)
        print(
            f"{i:02d}.jpg page={c['page']} hue={c['hue']:.0f} "
            f"size={c['w']}x{c['h']} -> {path}"
        )


if __name__ == "__main__":
    main()
