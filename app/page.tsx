import Link from "next/link";
import { featuredIds, formatPrice, getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PhoneMockup } from "@/components/PhoneMockup";

const categories = [
  { label: "Flagship", icon: "diamond" },
  { label: "Android", icon: "android" },
  { label: "Foldable", icon: "foldable_phone" },
  { label: "Accessories", icon: "electrical_services" }
];

export default function HomePage() {
  const hero = getProduct("titanium-16-pro-max");
  const featured = featuredIds.map(getProduct);
  const newest = products.filter((product) => product.badge === "NEW" || product.badge === "LIMITED");

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-high via-surface-container-low to-surface-container p-5 md:p-8 lg:p-10">
        <div className="relative z-10 max-w-[60%] md:max-w-[52%] lg:max-w-md">
          <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-primary">
            New Season
          </p>
          <h1 className="mt-2 text-display-mobile font-semibold text-on-surface md:text-display lg:text-[56px] lg:leading-[60px]">
            Beyond the ordinary.
          </h1>
          <p className="mt-2 text-body-sm text-on-surface-variant md:text-body-md">
            {hero.tagline}
          </p>
          <p className="mt-3 text-label-md font-semibold text-on-surface md:text-label-lg">
            From {formatPrice(hero.price)}
          </p>
          <Link
            href="/product-details?id=titanium-16-pro-max"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-label-md font-medium text-on-primary md:mt-6 md:px-6 md:py-3"
          >
            Explore
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-64 w-44 opacity-95 md:bottom-0 md:right-6 md:h-80 md:w-60 lg:right-16 lg:h-96 lg:w-72">
          <PhoneMockup
            color={hero.colors[0]?.value}
            accent={hero.accent}
            view="back"
            large
            className="h-full w-full"
          />
        </div>
      </section>

      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="mb-3 text-headline-sm font-semibold text-on-surface md:text-headline-md">
          Shop by category
        </h2>
        <div className="no-scrollbar -mx-margin-mobile flex gap-3 overflow-x-auto px-margin-mobile md:mx-0 md:grid md:grid-cols-4 md:px-0 md:overflow-visible">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={`/shop?category=${encodeURIComponent(category.label)}`}
              className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3 text-center transition-colors hover:bg-surface-container-low md:w-auto md:p-5"
            >
              <span className="material-symbols-outlined text-on-surface">{category.icon}</span>
              <span className="text-label-md font-medium text-on-surface">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="featured-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="featured-heading" className="text-headline-sm font-semibold text-on-surface md:text-headline-md">
            Featured
          </h2>
          <Link href="/shop" className="text-label-md font-medium text-primary">
            See all
          </Link>
        </div>
        <div className="no-scrollbar -mx-margin-mobile flex gap-3 overflow-x-auto px-margin-mobile md:mx-0 md:grid md:grid-cols-3 md:px-0 md:overflow-visible lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} className="w-44 shrink-0 md:w-full" />
          ))}
        </div>
      </section>

      {newest.length > 0 && (
        <section aria-labelledby="new-heading">
          <h2 id="new-heading" className="mb-3 text-headline-sm font-semibold text-on-surface md:text-headline-md">
            Just dropped
          </h2>
          <div className="no-scrollbar -mx-margin-mobile flex gap-3 overflow-x-auto px-margin-mobile md:mx-0 md:grid md:grid-cols-3 md:px-0 md:overflow-visible lg:grid-cols-4">
            {newest.map((product) => (
              <ProductCard key={product.id} product={product} className="w-44 shrink-0 md:w-full" />
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl bg-primary p-5 text-on-primary md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div>
          <p className="text-label-sm font-semibold uppercase tracking-[0.18em] opacity-70">
            Kriztore Care
          </p>
          <h2 className="mt-2 text-headline-sm font-semibold md:text-headline-md">Support that lasts.</h2>
          <p className="mt-1 max-w-lg text-body-sm opacity-80">
            Every device includes 24/7 priority care and a two-year warranty.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-4 inline-flex shrink-0 items-center gap-1 rounded-full bg-surface px-4 py-2 text-label-md font-medium text-on-surface md:mt-0 md:px-6 md:py-3"
        >
          Get in touch
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </section>
    </div>
  );
}
