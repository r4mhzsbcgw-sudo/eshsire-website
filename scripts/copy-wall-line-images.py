"""Copy and crop wall panel product line images."""
import io
import os
import glob
import urllib.request
from PIL import Image

ASSETS = r"C:\Users\11491\.cursor\projects\c-Users-11491-Projects-yishu-b2b\assets"
OUT = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "images",
    "products",
    "wall-panels",
)

MAPPING = {
    "line-spc.jpg": "*6-01c7edfd*",
    "line-uv.jpg": "*O1CN01XtTifO*",
    "line-decor.jpg": "*6-b82082fc*",
}


def find_asset(pattern: str) -> str:
    matches = glob.glob(os.path.join(ASSETS, pattern))
    if not matches:
        raise FileNotFoundError(pattern)
    return matches[0]


def to_4_3(im: Image.Image, size: tuple[int, int] = (1200, 900)) -> Image.Image:
    w, h = im.size
    target = size[0] / size[1]
    cur = w / h
    if cur > target:
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target)
        top = (h - nh) // 2
        im = im.crop((0, top, w, top + nh))
    return im.resize(size, Image.Resampling.LANCZOS)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for out_name, pattern in MAPPING.items():
        src = find_asset(pattern)
        im = Image.open(src).convert("RGB")
        path = os.path.join(OUT, out_name)
        to_4_3(im).save(path, "JPEG", quality=90, optimize=True)
        print(f"{out_name} <- {os.path.basename(src)} ({im.size})")


if __name__ == "__main__":
    main()
