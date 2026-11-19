"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

const logoUrl =
  "https://lh3.googleusercontent.com/aida/ALJJyrB4s4XNlqG-8QH-vdpL2DQkNrS3us84A5arqRme58DNsEpTO41H69WlxehIsTy_k3sy-ikKHCS7TuR8Q6ehQ7cSPUWLsrcQloB7RyZrgobT5AP5H4ZNUNhHlb4Ekuc3OWjHlTN0p4ajfN2DEjUE7ovZsKFOMAOcrt0CS0i9byFdEd6SsLSqsLdXkwpQzadE1sxmXcr8HXSvvmupCsZnjavwV63VxIVtRhBAdpG62mj4";

const profileUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCngScaf8HddCBVlAbrDjr3cYCwvJ-qLfksQOOAtanSjCPdeh4osi0u-HnDCzOOYi0esO3r6mjta63boR8EZotPrLYFk56Ks5JzZbLGW5HteFrRtO-iq5LgWY5HB9xt-u8lE291C-6-P2YfFZOUbBNV2ap50tLojcKU2TBbowxZzN7OE5go_JTGfCjKPttqyqC5wx7LKOjq3NBpsvy7JT0xrFuNfX6ZHKK86mzSqDPu";

const desktopNav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/product-details", label: "Device" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/contact", label: "Contact" }
];

const titles: Record<string, string> = {
  "/": "KRIZTORE",
  "/shop": "SHOP",
  "/product-details": "PRODUCT DETAILS",
  "/cart": "YOUR CART",
  "/checkout": "CHECKOUT",
  "/contact": "CONTACT"
};

export function SiteHeader() {
  const pathname = usePathname();
  const { wishlist } = useStore();

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto flex h-16 max-w-md items-center gap-3 border-b border-outline-variant/30 bg-surface/90 px-margin-mobile backdrop-blur-xl md:max-w-2xl md:px-8 lg:h-20 lg:max-w-6xl lg:gap-6 lg:px-10">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        {/* Logo */}
        <Image
          src={logoUrl}
          alt="Kriztore logo"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full bg-black object-cover"
        />
        <span className="text-label-sm font-semibold tracking-[0.16em] text-on-surface md:text-label-md">
          {titles[pathname] ?? "KRIZTORE"}
        </span>
      </Link>

      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {desktopNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3 py-2 text-label-md font-medium transition-colors ${
              pathname === item.href
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <button
        type="button"
        aria-label="Search"
        className="grid h-9 w-9 place-items-center rounded-full text-on-surface transition-colors hover:bg-surface-container"
      >
        <span className="material-symbols-outlined text-[22px]">search</span>
      </button>

      <Link
        href="/shop"
        aria-label={`Wishlist (${wishlist.length})`}
        className="relative grid h-9 w-9 place-items-center rounded-full text-on-surface transition-colors hover:bg-surface-container"
      >
        <span className="material-symbols-outlined text-[22px]">favorite</span>
        {wishlist.length > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error" />
        )}
      </Link>

      <Link href="/contact" aria-label="Profile" className="shrink-0">
        <Image
          src={profileUrl}
          alt="Profile"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full border border-outline-variant/50 bg-surface-container object-cover"
        />
      </Link>
    </header>
  );
}
