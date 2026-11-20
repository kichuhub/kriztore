"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { formatPrice, products } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";

const logoUrl = "/images/kriztore-logo.png";

const profileUrl = "/images/profile.png";

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
  const router = useRouter();
  const { wishlist, cartCount } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;

    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [searchOpen]);

  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return products.slice(0, 4);
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.tagline.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      )
      .slice(0, 6);
  }, [term]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center gap-3 border-b border-outline-variant/30 bg-surface/90 px-margin-mobile backdrop-blur-xl md:gap-4 md:px-8 lg:h-20 lg:gap-6 lg:px-10 xl:px-12 2xl:px-16"
    >
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image
          src={logoUrl}
          alt="Kriztore logo"
          width={36}
          height={36}
          priority
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
            data-cart-target={item.href === "/cart" ? "true" : undefined}
            className={`relative rounded-full px-3 py-2 text-label-md font-medium transition-colors ${
              pathname === item.href
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            {item.label}
            {item.href === "/cart" && cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-error px-1 text-[9px] font-bold text-on-error">
                {cartCount}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <button
        type="button"
        aria-label="Search"
        aria-expanded={searchOpen}
        onClick={() => setSearchOpen((open) => !open)}
        className={`grid h-9 w-9 place-items-center rounded-full text-on-surface transition-colors hover:bg-surface-container ${
          searchOpen ? "bg-surface-container" : ""
        }`}
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
          priority
          className="h-9 w-9 rounded-full border border-outline-variant/50 bg-surface-container object-cover"
        />
      </Link>

      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-outline-variant/30 bg-surface/95 px-margin-mobile py-4 shadow-xl backdrop-blur-xl md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
            <form
              onSubmit={submitSearch}
              className="flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2.5"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">search</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search phones and devices"
                aria-label="Search phones and devices"
                className="w-full bg-transparent text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </form>

            <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-2">
              <p className="px-2 py-1 text-label-sm font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                {term ? "Results" : "Popular devices"}
              </p>
              {results.length > 0 ? (
                <div className="grid gap-1 sm:grid-cols-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product-details?id=${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-container"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-container-high text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-body-sm font-semibold text-on-surface">
                          {product.name}
                        </span>
                        <span className="block truncate text-label-md text-on-surface-variant">
                          {product.category} · {formatPrice(product.price)}
                        </span>
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="px-2 py-4 text-center text-body-sm text-on-surface-variant">
                  No devices found. Try another search.
                </p>
              )}
            </div>

            {term && (
              <Link
                href={`/shop?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setSearchOpen(false)}
                className="self-start text-label-md font-medium text-primary"
              >
                See all results for “{query.trim()}”
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
