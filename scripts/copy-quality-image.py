import glob
import os
from PIL import Image

ASSETS = r"C:\Users\11491\.cursor\projects\c-Users-11491-Projects-yishu-b2b\assets"
OUT = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "images",
    "home",
    "factory",
    "02-quality.jpg",
)


def to_4_3(im: Image.Image, size=(1200, 900)) -> Image.Image:
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
    matches = glob.glob(os.path.join(ASSETS, "*06e4970e*"))
    if not matches:
        raise SystemExit("source image not found")
    im = Image.open(matches[0]).convert("RGB")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    to_4_3(im).save(OUT, "JPEG", quality=90, optimize=True)
    print(f"saved {OUT} from {matches[0]} size={im.size}")


if __name__ == "__main__":
    main()
