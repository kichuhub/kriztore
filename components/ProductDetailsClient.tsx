"use client";

import { useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";
import { PhoneMockup } from "@/components/PhoneMockup";

const ThreePhoneViewer = dynamic(() => import("@/components/ThreePhoneViewer"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-label-sm text-on-surface-variant">
      Loading 3D preview...
    </div>
  )
});

export function ProductDetailsClient() {
  const searchParams = useSearchParams();
  const product = getProduct(searchParams.get("id") ?? "titanium-16-pro-max");
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [colorIndex, setColorIndex] = useState(0);
  const [storageIndex, setStorageIndex] = useState(0);
  const [view, setView] = useState<"3d" | "back" | "front">("back");
  const [added, setAdded] = useState(false);

  const color = product.colors[colorIndex] ?? product.colors[0];
  const storage = product.storage[storageIndex] ?? product.storage[0];
  const price = storage?.price ?? product.price;
  const liked = isWishlisted(product.id);

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    addToCart(
      product,
      {
        color: color?.name,
        storage: storage?.label,
        price
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
      <section className="relative h-72 overflow-hidden rounded-2xl bg-surface-container-high md:h-96 lg:sticky lg:top-28 lg:h-[540px] xl:h-[600px]">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-label-sm font-bold tracking-wide text-on-primary">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-on-surface backdrop-blur"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${liked ? "text-error" : ""}`}
            style={liked ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>

        {view === "3d" ? (
          <ThreePhoneViewer color={color?.value} accent={product.accent} />
        ) : (
          <PhoneMockup
            color={color?.value}
            accent={product.accent}
            view={view}
            large
            className="h-full w-full"
          />
        )}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-surface/90 p-1 backdrop-blur">
          {(["3d", "back", "front"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`rounded-full px-3 py-1.5 text-label-md font-medium transition-colors ${
                view === option ? "bg-primary text-on-primary" : "text-on-surface-variant"
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-6">
        <section>
          <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {product.category}
          </p>
          <h1 className="mt-1 text-headline-lg font-semibold text-on-surface lg:text-display xl:text-[64px] xl:leading-[68px]">
            {product.name}
          </h1>
          <p className="mt-1 text-body-md text-on-surface-variant">{product.tagline}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-headline-md font-bold text-on-surface lg:text-headline-lg">
              {formatPrice(price)}
            </span>
            {product.oldPrice && (
              <span className="text-body-sm text-on-surface-variant line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-label-md text-on-surface-variant">
            or {storage?.installment} for 12 months
          </p>
        </section>

        <section aria-labelledby="color-heading">
          <h2 id="color-heading" className="mb-3 text-headline-sm font-semibold text-on-surface">
            Color — <span className="text-on-surface-variant">{color?.name}</span>
          </h2>
          <div className="flex gap-3">
            {product.colors.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                onClick={() => setColorIndex(index)}
                className={`h-10 w-10 rounded-full border-2 transition-transform md:h-11 md:w-11 lg:h-12 lg:w-12 ${
                  index === colorIndex ? "scale-110 border-primary" : "border-outline-variant/40"
                }`}
                style={{ backgroundColor: item.value }}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="storage-heading">
          <h2 id="storage-heading" className="mb-3 text-headline-sm font-semibold text-on-surface">
            Storage
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {product.storage.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setStorageIndex(index)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                  index === storageIndex
                    ? "border-primary bg-surface-container-high"
                    : "border-outline-variant/40 bg-surface-container-lowest"
                }`}
              >
                <div>
                  <p className="text-body-sm font-semibold text-on-surface">{item.label}</p>
                  <p className="text-label-md text-on-surface-variant">{item.installment}</p>
                </div>
                <p className="text-label-md font-semibold text-on-surface">{formatPrice(item.price)}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
          <h2 className="mb-3 text-headline-sm font-semibold text-on-surface">Highlights</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "6.7-inch Super Retina XDR display",
              "Pro-grade triple camera system",
              "All-day battery with fast charging",
              "Two-year Kriztore Care warranty"
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-label-lg font-semibold text-on-primary"
        >
          <span className="material-symbols-outlined text-[20px]">
            {added ? "check" : "shopping_bag"}
          </span>
          {added ? "Added to cart" : `Add to cart — ${formatPrice(price)}`}
        </button>
      </div>
    </div>
  );
}
