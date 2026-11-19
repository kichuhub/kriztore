import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { BottomNav } from "@/components/BottomNav";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased">
        <StoreProvider>
          <div className="relative mx-auto min-h-screen max-w-md bg-surface shadow-2xl md:max-w-2xl lg:max-w-6xl">
            <SiteHeader />
            <main className="min-h-screen px-margin-mobile pb-[92px] pt-[76px] md:px-8 lg:pb-16 lg:pr-10 lg:pt-[100px]">
              {children}
            </main>
            <BottomNav />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
