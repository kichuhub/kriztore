import { Suspense } from "react";
import { ShopClient } from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-body-sm text-on-surface-variant">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
