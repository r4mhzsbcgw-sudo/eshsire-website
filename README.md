# Eshsire Group — B2B Industrial Website

Production-ready B2B website for **Eshsire Group**, a Chinese SPC flooring and wall panel manufacturer.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- SEO (metadata, sitemap, robots, JSON-LD)

## Pages & Languages

Bilingual **EN / 中文** with URL-based locales:

| English | 中文 |
|---------|------|
| `/en` | `/zh` |
| `/en/spc-flooring` | `/zh/spc-flooring` |
| `/en/wall-panels` | `/zh/wall-panels` |
| `/en/factory` | `/zh/factory` |
| `/en/oem-service` | `/zh/oem-service` |
| `/en/about` | `/zh/about` |
| `/en/contact` | `/zh/contact` |

Visiting `/` redirects to `/en` (or `/zh` if browser prefers Chinese).

Use the **EN | 中文** switcher in the header to change language on any page.

## Run Locally

```bash
cd C:\Users\11491\Projects\eshsire-b2b
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

Edit `src/lib/config.ts` for contact details and domain.

## Deploy

Recommended: [Vercel](https://vercel.com)

```bash
npm run build
npm run start
```

## Customize

- Replace factory videos in `src/components/home/Hero.tsx` and `FactoryVideo.tsx`
- Swap Unsplash images with your product/factory photos
- Add certification logos to factory page
- Update `siteConfig.url` before production deploy

## Contact (configured)

- **Jason** — jason@eshsiregroup.com
- **WhatsApp** — +86 15313057097
