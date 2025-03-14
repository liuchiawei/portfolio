import type { Metadata } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "LIUCHIAWEI | ポートフォリオサイト",
  description:
    "イラストレーター/フロントエンジニア Liu Chiawei のポートフォリオサイトです。",
  openGraph: {
    type: "website",
    locale: "ja",
    url: "https://liuchiawei.vercel.app",
    title: "LIUCHIAWEI | ポートフォリオサイト",
    description:
      "イラストレーター/フロントエンジニア Liu Chiawei のポートフォリオサイトです。",
    images: [
      {
        url: "/images/ico.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${notoSansJP.variable} bg-dot-28-s-2-foreground/30 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* TODO: isHome (intro animation) */}
          <Nav />
          {children}
          <Footer name="Liu Chiawei" />
          <BackToTop />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
