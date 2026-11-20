"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useStore } from "@/components/StoreProvider";

type Flyer = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export function CartFeedback() {
  const { lastAdded } = useStore();
  const [toast, setToast] = useState<{ id: number; name: string } | null>(null);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const seen = useRef<number | null>(null);

  useEffect(() => {
    if (!lastAdded || seen.current === lastAdded.id) return;
    seen.current = lastAdded.id;
    setToast({ id: lastAdded.id, name: lastAdded.name });

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]"));
    const target =
      targets.find((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      }) ?? targets[0];

    const timeouts: number[] = [];

    if (lastAdded.origin && target) {
      const rect = target.getBoundingClientRect();
      const flyer: Flyer = {
        id: lastAdded.id,
        x: lastAdded.origin.x,
        y: lastAdded.origin.y,
        dx: rect.left + rect.width / 2 - lastAdded.origin.x,
        dy: rect.top + rect.height / 2 - lastAdded.origin.y
      };
      setFlyers((current) => [...current, flyer]);
      timeouts.push(
        window.setTimeout(() => {
          setFlyers((current) => current.filter((item) => item.id !== flyer.id));
        }, 800)
      );
    }

    timeouts.push(window.setTimeout(() => setToast(null), 2200));
    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [lastAdded]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-live="polite">
      {flyers.map((flyer) => (
        <span
          key={flyer.id}
          className="fly-to-cart absolute -ml-2 -mt-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-on-primary shadow-lg"
          style={
            {
              left: flyer.x,
              top: flyer.y,
              "--fly-x": `${flyer.dx}px`,
              "--fly-y": `${flyer.dy}px`
            } as CSSProperties
          }
        >
          <span className="material-symbols-outlined text-[10px]">shopping_bag</span>
        </span>
      ))}

      {toast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:bottom-8">
          <div
            key={toast.id}
            className="toast-in flex items-center gap-2 rounded-full bg-on-surface px-4 py-2.5 shadow-xl"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary">
              <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>
            </span>
            <span className="text-label-md font-medium text-surface">Added to cart</span>
            <span className="max-w-[140px] truncate text-label-md text-surface/70">{toast.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
