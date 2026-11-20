import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { BottomNav } from "@/components/BottomNav";
import { CartFeedback } from "@/components/CartFeedback";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const materialSymbols = localFont({
  src: "../public/fonts/MaterialSymbolsOutlined.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-material-symbols"
});

export const metadata: Metadata = {
  title: "Kriztore — Next-Gen Flagships",
  description: "Premium smartphones, accessories, and a hands-on 3D device preview."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcf8fb"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${materialSymbols.variable}`}>
      <body className="bg-surface text-on-surface antialiased">
        <StoreProvider>
          <div className="relative min-h-screen w-full bg-surface shadow-2xl">
            <SiteHeader />
            <main className="min-h-screen px-margin-mobile pb-[92px] pt-[76px] md:px-8 lg:pb-16 lg:px-10 lg:pt-[100px] xl:px-12 2xl:px-16">
              {children}
            </main>
            <BottomNav />
            <CartFeedback />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
