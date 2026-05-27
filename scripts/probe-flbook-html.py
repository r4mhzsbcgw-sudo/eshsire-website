import re
import urllib.request

BOOK_HTML = "https://flbook.com.cn/upload/pages/2023/06/1772022.html?v=20230602104812"
REFERER = "https://flbook.com.cn/c/cexzdXAE0M"
req = urllib.request.Request(BOOK_HTML, headers={"User-Agent": "Mozilla/5.0", "Referer": REFERER})
html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
print("len", len(html))
print(html[:2000])
print("---")
for pat in [
    r"img3\.flbook[^\"'\s>]+",
    r"upcreate/[^\"'\s>]+",
    r"\.jpg[^\"'\s>]*",
    r"pageUrl[^\"']+",
    r"largePage[^\"']+",
]:
    found = re.findall(pat, html)
    print(pat, len(found))
    for x in found[:5]:
        print(" ", x[:120])
