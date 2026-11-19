import { formatPrice } from "@/lib/products";

export const WHATSAPP_NUMBER = "917012986088";

type OrderItem = {
  name: string;
  price: number;
  color: string;
  storage: string;
  qty: number;
};

type ShippingInfo = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

type OrderTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export function buildWhatsAppOrderUrl(
  items: OrderItem[],
  shipping: ShippingInfo,
  totals: OrderTotals
) {
  const message = [
    "*New Kriztore Order*",
    "",
    "*Shipping Info*",
    `Name: ${shipping.fullName}`,
    `Email: ${shipping.email}`,
    `Address: ${shipping.address}`,
    `City: ${shipping.city}`,
    `ZIP: ${shipping.zip}`,
    "",
    "*Cart Items*",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.name} — ${item.color} / ${item.storage} x${item.qty} — ${formatPrice(
          item.price * item.qty
        )}`
    ),
    "",
    "*Order Summary*",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Shipping: ${totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}`,
    `Tax: ${formatPrice(totals.tax)}`,
    `*Total: ${formatPrice(totals.total)}*`
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
