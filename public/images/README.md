# 网站图片目录 / Site Images

在 `src/lib/images.ts` 中将 **`USE_LOCAL_IMAGES` 设为 `true`** 后，使用本目录下的文件。

## 目录结构

```
public/images/
├── home/                    # 首页
│   ├── hero.jpg
│   ├── spc-flooring.jpg
│   ├── wall-panels.jpg
│   ├── accessories.jpg
│   └── factory/               # 首页「工厂实力」6 张
│       ├── 01-production.jpg
│       ├── 02-quality.jpg
│       ├── 03-warehouse.jpg
│       ├── 04-loading.jpg
│       ├── 05-oem.jpg
│       └── 06-export.jpg
├── about/                   # 关于我们
│   ├── hero.jpg             # 页头背景
│   ├── story.jpg            # 公司简介旁大图
│   └── gallery/
│       ├── 01.jpg … 08.jpg  # 公司介绍图库（8 张，可增减需改代码）
├── products/
│   ├── spc/                 # SPC 地板内页
│   │   ├── hero.jpg
│   │   ├── featured.jpg     # 产品介绍旁主图
│   │   └── gallery/
│   │       ├── 01.jpg … 08.jpg  # 从花色 PDF 提取
│   └── wall-panels/         # 墙板内页
│       ├── hero.jpg
│       ├── line-spc.jpg     # 三个产品线卡片图
│       ├── line-uv.jpg
│       ├── line-decor.jpg
│       └── gallery/
│           ├── 01.jpg … 08.jpg
```

## 建议尺寸

| 类型 | 建议尺寸 |
|------|----------|
| 页头 hero | 2400×1200+ |
| 图库单张 | 1200×900（4:3） |
| 首页卡片 | 1200×900 |

## 图库数量

默认每类图库 **8 张**。若要增减，编辑 `src/lib/images.ts` 中 `galleryLocal(..., 8)` 的数字。

## 功能

- **关于我们** `/about`：公司工厂、团队、设施图库，点击放大、键盘左右切换
- **SPC 地板** `/spc-flooring`：产品花色与项目图库
- **墙板** `/wall-panels`：墙板效果图库 + 三个产品线封面图

## 格式

JPG / WebP，单张建议 &lt; 500KB。
