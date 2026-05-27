import re
import urllib.request

url = "https://flbook.com.cn/c/cexzdXAE0M"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
print("html len", len(html))

patterns = [
    r"bookid['\"]?\s*[:=]\s*['\"]?(\d+)",
    r"pagePath['\"]?\s*[:=]\s*['\"]([^'\"]+)",
    r"largePagePath['\"]?\s*[:=]\s*['\"]([^'\"]+)",
    r"bookPath['\"]?\s*[:=]\s*['\"]([^'\"]+)",
    r"https?://[^\"'\s]+1772022[^\"'\s]*",
    r"https?://bookimg[^\"'\s]+",
    r"https?://img[^\"'\s]+\.flbook[^\"'\s]+",
]
for pat in patterns:
    found = re.findall(pat, html)
    if found:
        print("\n", pat)
        for x in found[:8]:
            print(" ", x)

# try common page URL patterns
candidates = []
for base in [
    "https://bookimg.flbook.com.cn/1772022/files/mobile/{n}.jpg",
    "https://bookimg.flbook.com.cn/1772022/files/page/{n}.jpg",
    "https://bookimg.flbook.com.cn/1772022/files/thumb/{n}.jpg",
    "https://img4.flbook.com.cn/1772022/{n}.jpg",
    "https://img4.flbook.com.cn/1772022/files/mobile/{n}.jpg",
]:
    for n in [1, 2, 3, 5, 10]:
        candidates.append(base.format(n=n))

print("\nTesting candidates...")
for u in candidates:
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0", "Referer": url}),
            timeout=15,
        )
        print("OK", r.status, r.headers.get("Content-Type"), len(r.read()), u)
    except Exception as e:
        print("FAIL", u[:80], type(e).__name__)
