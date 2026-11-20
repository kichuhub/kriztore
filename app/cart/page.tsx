"use client";

import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";
import { PhoneMockup } from "@/components/PhoneMockup";

export default function CartPage() {
  const { cart, cartCount, subtotal, shipping, tax, total, updateQty, removeFromCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant">
          shopping_bag
        </span>
        <h1 className="text-headline-sm font-semibold text-on-surface">Your cart is empty</h1>
        <p className="text-body-sm text-on-surface-variant">
          Explore the latest devices and find something you love.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-primary px-6 py-3 text-label-md font-semibold text-on-primary"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
      <div className="lg:col-span-2">
        <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </p>
        <h1 className="mt-1 text-headline-lg-mobile font-semibold text-on-surface md:text-headline-lg">
          Your cart
        </h1>
      </div>

      <ul className="flex flex-col gap-3">
        {cart.map((item) => {
          const product = getProduct(item.id);
          return (
            <li
              key={`${item.id}-${item.color}-${item.storage}`}
              className="flex gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3 md:p-4"
            >
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg md:h-32 md:w-28 lg:h-36 lg:w-32">
                <PhoneMockup
                  color={item.accent}
                  accent={product.accent}
                  className="h-full w-full"
                  compact
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-body-sm font-semibold text-on-surface md:text-body-md">
                      {item.name}
                    </p>
                    <p className="text-label-md text-on-surface-variant">
                      {item.color} · {item.storage}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeFromCart(item.id)}
                    className="h-7 w-7 shrink-0 rounded-full text-on-surface-variant hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-full border border-outline-variant/40">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="grid h-8 w-8 place-items-center text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-5 text-center text-label-md font-semibold text-on-surface">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="grid h-8 w-8 place-items-center text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                  <p className="text-label-md font-bold text-on-surface">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-4 lg:sticky lg:top-28">
        <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
          <h2 className="mb-3 text-headline-sm font-semibold text-on-surface">Order summary</h2>
          <dl className="flex flex-col gap-2 text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <dt>Estimated tax</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-outline-variant/30 pt-3 text-label-lg font-bold text-on-surface">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </section>

        <Link
          href="/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-label-lg font-semibold text-on-primary"
        >
          Continue to checkout
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
