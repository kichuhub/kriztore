"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { type Product } from "@/lib/products";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  storage: string;
  qty: number;
  accent: string;
};

type AddToCartOptions = {
  color?: string;
  storage?: string;
  price?: number;
};

export type CartOrigin = { x: number; y: number };

export type AddedItem = {
  id: number;
  name: string;
  origin?: CartOrigin;
};

type StoreContextValue = {
  cart: CartItem[];
  cartBump: number;
  lastAdded: AddedItem | null;
  cartCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  wishlist: string[];
  addToCart: (product: Product, options?: AddToCartOptions, origin?: CartOrigin) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const initialCart: CartItem[] = [
  {
    id: "titanium-16-pro-max",
    name: "Titanium Phone 16 Pro Max",
    price: 1399,
    color: "Obsidian Black",
    storage: "512GB",
    qty: 1,
    accent: "#27272a"
  },
  {
    id: "magcharge-dock",
    name: "MagCharge Obsidian Stand",
    price: 89,
    color: "Midnight Black",
    storage: "15W Qi2",
    qty: 1,
    accent: "#52525b"
  }
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [wishlist, setWishlist] = useState<string[]>(["obsidian-fold-v5"]);
  const [cartBump, setCartBump] = useState(0);
  const [lastAdded, setLastAdded] = useState<AddedItem | null>(null);

  const addToCart = useCallback((product: Product, options: AddToCartOptions = {}, origin?: CartOrigin) => {
    const color = options.color ?? product.colors[0]?.name ?? "Default";
    const storage = options.storage ?? product.storage[0]?.label ?? "Standard";
    const price = options.price ?? product.price;

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.color === color && item.storage === storage
      );
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, qty: item.qty + 1, price } : item
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price,
          color,
          storage,
          qty: 1,
          accent: product.accent
        }
      ];
    });

    setCartBump((count) => count + 1);
    setLastAdded({
      id: Date.now() + Math.random(),
      name: product.name,
      origin
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Math.min(9, qty)) } : item
      )
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const subtotal = useMemo(
    () => Math.round(cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100) / 100,
    [cart]
  );
  const shipping = 0;
  const tax = useMemo(() => Math.round(subtotal * 0.08 * 100) / 100, [subtotal]);
  const total = useMemo(
    () => Math.round((subtotal + shipping + tax) * 100) / 100,
    [subtotal, tax]
  );
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      cartCount,
      cartBump,
      lastAdded,
      subtotal,
      shipping,
      tax,
      total,
      wishlist,
      addToCart,
      removeFromCart,
      updateQty,
      toggleWishlist,
      isWishlisted
    }),
    [
      cart,
      cartCount,
      cartBump,
      lastAdded,
      subtotal,
      tax,
      total,
      wishlist,
      addToCart,
      removeFromCart,
      updateQty,
      toggleWishlist,
      isWishlisted
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
