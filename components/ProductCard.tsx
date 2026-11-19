"use client";

import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";
import { PhoneMockup } from "@/components/PhoneMockup";

export function ProductCard({
  product,
  className = "w-44 shrink-0"
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const liked = isWishlisted(product.id);

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest ${className}`}
    >
      <Link href={`/product-details?id=${product.id}`} className="relative block">
        {product.badge && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-1 text-[9px] font-bold tracking-wide text-on-primary">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(event) => {
            event.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-surface/90 text-on-surface backdrop-blur"
        >
          <span
            className={`material-symbols-outlined text-[17px] ${liked ? "text-error" : ""}`}
            style={liked ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
        <PhoneMockup
          color={product.colors[0]?.value}
          accent={product.accent}
          className="h-40 w-full"
          compact
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 text-body-sm font-semibold text-on-surface">{product.name}</p>
        <p className="line-clamp-2 text-[11px] leading-4 text-on-surface-variant">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-label-md font-bold text-on-surface">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="text-[10px] text-on-surface-variant line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addToCart(product)}
            className="grid h-8 w-8 place-items-center rounded-full bg-primary text-on-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
