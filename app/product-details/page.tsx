import { Suspense } from "react";
import { ProductDetailsClient } from "@/components/ProductDetailsClient";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-body-sm text-on-surface-variant">
          Loading product...
        </div>
      }
    >
      <ProductDetailsClient />
    </Suspense>
  );
}
