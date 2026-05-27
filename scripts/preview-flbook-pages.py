import io
import os
import re
import urllib.request

from PIL import Image

BOOK_HTML = "https://flbook.com.cn/upload/pages/2023/06/1772022.html?v=20230602104812"
REF = "https://flbook.com.cn/c/cexzdXAE0M"
OUT = os.path.join(os.path.dirname(__file__), "flbook-preview")


def main() -> None:
    html = urllib.request.urlopen(
        urllib.request.Request(BOOK_HTML, headers={"User-Agent": "Mozilla/5.0", "Referer": REF}),
        timeout=60,
    ).read().decode("utf-8", "ignore")
    rel = re.findall(r'data-bg="//([^"]+)"', html)
    urls = [f"https://{x.split('?')[0]}" for x in rel]
    print("pages", len(urls))
    os.makedirs(OUT, exist_ok=True)
    for p in [5, 15, 25, 35, 45, 55, 65, 75, 85, 95]:
        u = urls[p - 1]
        data = urllib.request.urlopen(
            urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0", "Referer": REF}),
            timeout=60,
        ).read()
        path = os.path.join(OUT, f"p{p:03d}.jpg")
        open(path, "wb").write(data)
        im = Image.open(io.BytesIO(data))
        print(p, im.size, path)


if __name__ == "__main__":
    main()
