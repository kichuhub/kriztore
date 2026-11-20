"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { useStore } from "@/components/StoreProvider";

const fields = [
  { name: "fullName", label: "Full name", type: "text", icon: "person", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", icon: "mail", autoComplete: "email" },
  { name: "address", label: "Street address", type: "text", icon: "home", autoComplete: "street-address" },
  { name: "city", label: "City", type: "text", icon: "location_city", autoComplete: "address-level2" },
  { name: "zip", label: "ZIP code", type: "text", icon: "markunread_mailbox", autoComplete: "postal-code" }
];

export default function CheckoutPage() {
  const { cart, subtotal, shipping, tax, total, cartCount } = useStore();
  const [sent, setSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  if (sent) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-on-primary">
          <span className="material-symbols-outlined text-3xl">check</span>
        </span>
        <h1 className="text-headline-md font-semibold text-on-surface">Opening WhatsApp</h1>
        <p className="text-body-sm text-on-surface-variant">
          Your shipping and cart details are ready to send. If WhatsApp did not open, tap below.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-label-md font-semibold text-on-primary"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          Open WhatsApp
        </a>
        <Link href="/" className="text-label-md font-medium text-primary">
          Back to home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant">
          shopping_bag
        </span>
        <h1 className="text-headline-sm font-semibold text-on-surface">Nothing to check out</h1>
        <p className="text-body-sm text-on-surface-variant">Add a product to your cart first.</p>
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
          WhatsApp checkout
        </p>
        <h1 className="mt-1 text-headline-lg-mobile font-semibold text-on-surface md:text-headline-lg">
          Shipping details
        </h1>
      </div>

      <form
        id="checkout-form"
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const url = buildWhatsAppOrderUrl(
            cart,
            {
              fullName: String(data.get("fullName") ?? ""),
              email: String(data.get("email") ?? ""),
              address: String(data.get("address") ?? ""),
              city: String(data.get("city") ?? ""),
              zip: String(data.get("zip") ?? "")
            },
            { subtotal, shipping, tax, total }
          );
          setWhatsappUrl(url);
          setSent(true);
          window.open(url, "_blank", "noopener,noreferrer");
        }}
      >
        <section className="flex flex-col gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 md:p-6">
          <h2 className="text-headline-sm font-semibold text-on-surface">Shipping information</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className={`flex flex-col gap-1 ${field.name === "address" ? "sm:col-span-2" : ""}`}
              >
                <span className="text-label-md font-medium text-on-surface-variant">{field.label}</span>
                <span className="flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface px-3 py-2.5">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    {field.icon}
                  </span>
                  <input
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    placeholder={field.label}
                    className="w-full bg-transparent text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
                  />
                </span>
              </label>
            ))}
          </div>
        </section>
      </form>

      <div className="flex flex-col gap-4 lg:sticky lg:top-28">
        <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
          <h2 className="mb-3 text-headline-sm font-semibold text-on-surface">Order summary</h2>
          <dl className="flex flex-col gap-2 text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <dt>
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <dt>Tax</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-outline-variant/30 pt-3 text-label-lg font-bold text-on-surface">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </section>

        <button
          form="checkout-form"
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-label-lg font-semibold text-on-primary"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          Place order — {formatPrice(total)}
        </button>
      </div>
    </div>
  );
}
