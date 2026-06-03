import { Inter, Noto_Sans_SC } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { htmlLangMap, isLocale } from "@/i18n/locales";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    google: "epNaoeeL6g2fK5kvynreug20_6rc-dVjy9UGE4GxXe4",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const localeHeader = headers().get("x-locale") ?? "en";
  const lang = isLocale(localeHeader) ? htmlLangMap[localeHeader] : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
