"""Download wall panel scene images for product lines and gallery."""
import io
import os
import shutil
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(__file__))
BASE = os.path.join(ROOT, "public", "images", "products", "wall-panels")
GALLERY = os.path.join(BASE, "gallery")

LOCAL_SPC = os.path.join(ROOT, "public", "images", "home", "wall-panels.jpg")
LOCAL_ARCH = os.path.join(ROOT, "public", "images", "products", "spc", "featured.jpg")

HERO = "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=85&w=2400&auto=format&fit=crop"

PRODUCT_LINES = {
    # SPC 墙板 — 木纹/竖条墙板客厅场景（优先本地产品图）
    "line-spc.jpg": LOCAL_SPC,
    # UV 大理石板 — 高光大理石商业/卫浴空间
    "line-uv.jpg": "https://images.unsplash.com/photo-1736770525501-60f6a4b70e9d?q=85&w=1400&auto=format&fit=crop",
    # 装饰墙板 — 格栅/现代墙板造型
    "line-decor.jpg": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1400&auto=format&fit=crop",
}

GALLERY_SOURCES = [
    LOCAL_ARCH,
    LOCAL_SPC,
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1736770525501-60f6a4b70e9d?q=85&w=1400&auto=format&fit=crop",
    "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1400",
]


def load_source(src: str) -> Image.Image:
    if os.path.isfile(src):
        return Image.open(src).convert("RGB")
    req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return Image.open(io.BytesIO(resp.read())).convert("RGB")


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


def save_jpg(im: Image.Image, path: str, quality: int = 88) -> None:
    im.save(path, "JPEG", quality=quality, optimize=True)


def main() -> None:
    os.makedirs(GALLERY, exist_ok=True)

    save_jpg(to_4_3(load_source(HERO), (2400, 1200)), os.path.join(BASE, "hero.jpg"), 90)
    print("hero.jpg")

    for name, src in PRODUCT_LINES.items():
        path = os.path.join(BASE, name)
        save_jpg(to_4_3(load_source(src), (1200, 900)), path)
        print(f"{name} <- {'local' if os.path.isfile(src) else 'remote'}")

    for i, src in enumerate(GALLERY_SOURCES, 1):
        path = os.path.join(GALLERY, f"{i:02d}.jpg")
        save_jpg(to_4_3(load_source(src), (1200, 900)), path)
        print(f"gallery/{i:02d}.jpg <- {'local' if os.path.isfile(src) else 'remote'}")


if __name__ == "__main__":
    main()
