# 首页图片替换说明 / Homepage Images

## 首页轮播（已配置）

路径：`public/images/home/carousel/`

| 文件 | 内容 |
|------|------|
| `slide-01.png` | 工厂外景 · 20年 |
| `slide-02.png` | 20+年 · 产品系列 |
| `slide-03.png` | 资质认证展示 |

替换同名文件后刷新浏览器即可。轮播每 6 秒自动切换，可点击圆点或左右箭头。

### 清晰度建议（重要）

当前图为 **1024×346**，大屏两侧会有黑边，但**不会放大变糊**。

若要全屏也清晰，请提供 **1920×650** 或 **2400×800** 的 PNG/JPG（比例约 2.96:1），覆盖原文件后告诉我，我会把代码里的最大宽度改为 1920/2400。

---

把其它图片放进此文件夹，然后在 `src/lib/images.ts` 里将 **`USE_LOCAL_IMAGES` 改为 `true`**。

## 其它文件名（必须一致）

| 文件名 | 用途 | 建议尺寸 |
|--------|------|----------|
| `hero.jpg` | 备用单图背景（轮播未用时） | 2400×1350 或更大，横图 |
| `hero.mp4` | 首页背景视频（可选） | 1920×1080，10–30 秒，静音循环 |
| `spc-flooring.jpg` | SPC 地板卡片 | 1200×900（4:3） |
| `wall-panels.jpg` | 墙板卡片 | 1200×900（4:3） |
| `accessories.jpg` | 配件卡片 | 1200×900（4:3） |

## 格式建议

- 照片：**JPG** 或 **WebP**，单张尽量 &lt; 500KB（可用 [squoosh.app](https://squoosh.app) 压缩）
- 视频：**MP4**（H.264）

## 仅换图片、不用视频

只放 `hero.jpg` 即可，不必放 `hero.mp4`。

## 示例路径

```
public/images/home/
  hero.jpg
  spc-flooring.jpg
  wall-panels.jpg
  accessories.jpg
```
