"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const categories = ["All", "Flagship", "Android", "Foldable", "Concept", "Accessories"];

export function ShopClient() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") ?? "All";
  const [category, setCategory] = useState(categories.includes(initial) ? initial : "All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!term ||
          product.name.toLowerCase().includes(term) ||
          product.tagline.toLowerCase().includes(term))
    );
  }, [category, query]);

  return (
    <div className="flex flex-col gap-5 lg:gap-8">
      <div>
        <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Catalog
        </p>
        <h1 className="mt-1 text-headline-lg-mobile font-semibold text-on-surface md:text-headline-lg">
          Find your next device
        </h1>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
        <label className="flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-2.5 lg:w-80 lg:shrink-0">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </label>

        <div className="no-scrollbar -mx-margin-mobile flex flex-1 gap-2 overflow-x-auto px-margin-mobile lg:mx-0 lg:px-0">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-label-md font-medium transition-colors ${
                category === item
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="text-label-md text-on-surface-variant">{visible.length} products</p>

      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} className="w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-12 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
          <p className="mt-2 text-body-sm text-on-surface-variant">No products match your search.</p>
        </div>
      )}
    </div>
  );
}
