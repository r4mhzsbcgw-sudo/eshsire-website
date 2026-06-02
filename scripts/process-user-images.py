"""Resize user-provided images for home SPC card and quality inspection grid."""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("pip install pillow") from None

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\11491\.cursor\projects\c-Users-11491-Projects-eshsire-b2b\assets"
)

OUT_HOME = ROOT / "public" / "images" / "home"
OUT_QUALITY = OUT_HOME / "quality"

COLOR_GRID = ASSETS / (
    "c__Users_11491_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_"
    "73eda79847025ccb99278130e30ec82e-aa029e9d-a69c-4114-8d0a-400cf3cb31a5.png"
)
QUALITY_GRID = ASSETS / (
    "c__Users_11491_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_"
    "32fea89fa0cbdfa755148057273ea003-794153ff-f543-4092-b959-d913abc60f3a.png"
)

CARD_SIZE = (1600, 1200)  # 4:3 HD
QUALITY_SIZE = (900, 900)  # square uniform


def save_jpeg(img: Image.Image, path: Path, quality: int = 92) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.save(path, "JPEG", quality=quality, optimize=True)
    print(f"Wrote {path} ({img.size[0]}x{img.size[1]})")


def main() -> None:
    OUT_QUALITY.mkdir(parents=True, exist_ok=True)

    if COLOR_GRID.exists():
        img = Image.open(COLOR_GRID)
        img = img.convert("RGB")
        img = ImageOps_fit(img, CARD_SIZE)
        save_jpeg(img, OUT_HOME / "spc-flooring.jpg")

    if QUALITY_GRID.exists():
        img = Image.open(QUALITY_GRID).convert("RGB")
        w, h = img.size
        half_w, half_h = w // 2, h // 2
        boxes = [
            (0, 0, half_w, half_h),
            (half_w, 0, w, half_h),
            (0, half_h, half_w, h),
            (half_w, half_h, w, h),
        ]
        for i, box in enumerate(boxes, start=1):
            crop = img.crop(box)
            crop = ImageOps_fit(crop, QUALITY_SIZE)
            save_jpeg(crop, OUT_QUALITY / f"{i:02d}.jpg")
        # single composite for factory card fallback
        composite = ImageOps_fit(img, CARD_SIZE)
        save_jpeg(composite, OUT_HOME / "factory" / "02-quality.jpg")


def ImageOps_fit(im: Image.Image, size: tuple[int, int]) -> Image.Image:
    from PIL import ImageOps

    return ImageOps.fit(im, size, method=Image.Resampling.LANCZOS)


if __name__ == "__main__":
    main()
