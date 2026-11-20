"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

const navItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/shop", label: "Shop", icon: "storefront" },
  { href: "/product-details", label: "Device", icon: "phone_iphone" },
  { href: "/cart", label: "Cart", icon: "shopping_bag" },
  { href: "/checkout", label: "Checkout", icon: "payment" },
  { href: "/contact", label: "Contact", icon: "chat" }
];

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount, cartBump } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-16 max-w-md items-stretch justify-between border-t border-outline-variant/30 bg-surface/95 px-2 pt-1 backdrop-blur-xl pb-safe lg:hidden">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            data-cart-target={item.href === "/cart" ? "true" : undefined}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl transition-colors ${
              active ? "bg-primary text-on-primary" : "text-on-surface-variant"
            }`}
          >
            <span
              key={item.href === "/cart" ? `cart-icon-${cartBump}` : item.icon}
              className={`material-symbols-outlined text-[21px] ${
                item.href === "/cart" && cartBump > 0 ? "cart-pop" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
            {item.href === "/cart" && cartCount > 0 && (
              <span
                key={`cart-badge-${cartBump}`}
                className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-error px-1 text-[9px] font-bold text-on-error cart-pop"
              >
                {cartCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
