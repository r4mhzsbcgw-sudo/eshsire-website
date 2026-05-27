"""Prepare homepage hero banner from source artwork."""
import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = (
    r"C:\Users\11491\.cursor\projects\c-Users-11491-Projects-yishu-b2b\assets"
    r"\c__Users_11491_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_"
    r"ad9f697aefe266f5f6a25caa67c0a132-2b4765ed-e136-4268-a13b-88386aadf6c1.png"
)
OUT = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "images",
    "home",
    "hero-banner.jpg",
)


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    w, h = im.size
    print(f"source {w}x{h}")

    target_w = 1400
    if w != target_w:
        im = im.resize((target_w, int(h * target_w / w)), Image.Resampling.LANCZOS)

    im = ImageOps.autocontrast(im, cutoff=1)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.04)
    im = ImageEnhance.Sharpness(im).enhance(1.15)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=90, threshold=3))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    im.save(OUT, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"saved {OUT} -> {im.size}")


if __name__ == "__main__":
    main()
