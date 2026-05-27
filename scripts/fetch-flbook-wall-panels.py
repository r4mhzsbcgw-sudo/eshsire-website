"""Download wall panel color swatches from flbook catalog."""
import io
import os
import re
import urllib.request

from PIL import Image

BOOK_HTML = "https://flbook.com.cn/upload/pages/2023/06/1772022.html?v=20230602104812"
REFERER = "https://flbook.com.cn/c/cexzdXAE0M"
ROOT = os.path.dirname(os.path.dirname(__file__))
BASE = os.path.join(ROOT, "public", "images", "products", "wall-panels")
GALLERY = os.path.join(BASE, "gallery")

# 集成墙板2023版 色卡 — https://flbook.com.cn/c/cexzdXAE0M
PRODUCT_LINE_PAGES = {
    "line-spc.jpg": 15,    # 金影木 · 木纹系列
    "line-uv.jpg": 75,     # 金丝米黄 · 大理石系列
    "line-decor.jpg": 45,  # 时光之恋 · 布纹系列
}
GALLERY_PAGES = [5, 15, 25, 45, 55, 65, 75, 85]


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": REFERER})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", "ignore")


def page_urls(html: str) -> list[str]:
    rel = re.findall(r'data-bg="//([^"]+)"', html)
    urls: list[str] = []
    seen: set[str] = set()
    for item in rel:
        url = f"https://{item.split('?')[0]}"
        if url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def load_image(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": REFERER})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return Image.open(io.BytesIO(resp.read())).convert("RGB")


def trim_catalog_label(im: Image.Image) -> Image.Image:
    """Remove bottom-right page/code labels from swatch scans."""
    w, h = im.size
    return im.crop((0, 0, int(w * 0.82), int(h * 0.9)))


def to_4_3(im: Image.Image, size: tuple[int, int]) -> Image.Image:
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


def save_page(url: str, path: str, size: tuple[int, int]) -> None:
    im = trim_catalog_label(load_image(url))
    im = to_4_3(im, size)
    im.save(path, "JPEG", quality=90, optimize=True)


def main() -> None:
    os.makedirs(GALLERY, exist_ok=True)
    pages = page_urls(fetch_text(BOOK_HTML))
    print(f"catalog pages: {len(pages)}")

    for name, page_no in PRODUCT_LINE_PAGES.items():
        save_page(pages[page_no - 1], os.path.join(BASE, name), (1200, 900))
        print(f"{name} <- page {page_no}")

    for i, page_no in enumerate(GALLERY_PAGES, 1):
        save_page(pages[page_no - 1], os.path.join(GALLERY, f"{i:02d}.jpg"), (1200, 900))
        print(f"gallery/{i:02d}.jpg <- page {page_no}")


if __name__ == "__main__":
    main()
