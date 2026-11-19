export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  tagline: string;
  badge?: string;
  colors: { name: string; value: string }[];
  storage: { label: string; price: number; installment: string }[];
  accent: string;
};

export const products: Product[] = [
  {
    id: "titanium-16-pro",
    name: "Titanium Phone 16 Pro",
    category: "Flagship",
    price: 1099,
    tagline: "Aerospace titanium. Unmatched power.",
    colors: [
      { name: "Obsidian Black", value: "#1b1b1d" },
      { name: "Natural Titanium", value: "#a8a29b" },
      { name: "Desert Gold", value: "#b89b78" }
    ],
    storage: [
      { label: "256GB", price: 1099, installment: "$91.58/mo" },
      { label: "512GB", price: 1299, installment: "$108.25/mo" },
      { label: "1TB", price: 1499, installment: "$124.92/mo" }
    ],
    accent: "#3f3f46"
  },
  {
    id: "titanium-16-pro-max",
    name: "Titanium 16 Pro Max",
    category: "Flagship",
    price: 1399,
    tagline: "The ultimate pro experience.",
    badge: "BEST SELLER",
    colors: [
      { name: "Obsidian Black", value: "#1b1b1d" },
      { name: "Natural Titanium", value: "#a8a29b" },
      { name: "Desert Gold", value: "#b89b78" },
      { name: "White", value: "#f5f5f4" }
    ],
    storage: [
      { label: "256GB", price: 1199, installment: "$99.92/mo" },
      { label: "512GB", price: 1399, installment: "$116.58/mo" },
      { label: "1TB", price: 1599, installment: "$133.25/mo" }
    ],
    accent: "#27272a"
  },
  {
    id: "apex-s24-ultra",
    name: "Apex S24 Ultra",
    category: "Android",
    price: 1249,
    tagline: "Built for creators and visionaries.",
    colors: [
      { name: "Titanium Gray", value: "#71717a" },
      { name: "Titanium Black", value: "#18181b" },
      { name: "Titanium Violet", value: "#8179a1" }
    ],
    storage: [
      { label: "256GB", price: 1249, installment: "$104.08/mo" },
      { label: "512GB", price: 1449, installment: "$120.75/mo" }
    ],
    accent: "#52525b"
  },
  {
    id: "obsidian-fold-v5",
    name: "Obsidian Fold V5",
    category: "Foldable",
    price: 1799,
    tagline: "A new dimension of mobile.",
    badge: "NEW",
    colors: [
      { name: "Obsidian Black", value: "#18181b" },
      { name: "Phantom Silver", value: "#c4c4c8" }
    ],
    storage: [
      { label: "512GB", price: 1799, installment: "$149.92/mo" },
      { label: "1TB", price: 1999, installment: "$166.58/mo" }
    ],
    accent: "#3f3f46"
  },
  {
    id: "pixel-fold-pro",
    name: "Pixel Fold Pro",
    category: "Foldable",
    price: 1699,
    tagline: "Google's boldest phone yet.",
    colors: [
      { name: "Porcelain", value: "#e7e4df" },
      { name: "Obsidian", value: "#1f1f22" }
    ],
    storage: [
      { label: "256GB", price: 1699, installment: "$141.58/mo" },
      { label: "512GB", price: 1899, installment: "$158.25/mo" }
    ],
    accent: "#d6d3d1"
  },
  {
    id: "cyberone-concept",
    name: "CyberOne Concept",
    category: "Concept",
    price: 1899,
    tagline: "The future, in your hand.",
    badge: "LIMITED",
    colors: [
      { name: "Neon Black", value: "#09090b" },
      { name: "Chrome", value: "#d4d4d8" }
    ],
    storage: [
      { label: "512GB", price: 1899, installment: "$158.25/mo" }
    ],
    accent: "#18181b"
  },
  {
    id: "magcharge-dock",
    name: "MagCharge Dual Dock",
    category: "Accessories",
    price: 89,
    tagline: "Power two devices at once.",
    colors: [
      { name: "Midnight Black", value: "#1c1c1e" },
      { name: "Silver", value: "#d4d4d8" }
    ],
    storage: [
      { label: "15W Qi2", price: 89, installment: "$7.42/mo" }
    ],
    accent: "#52525b"
  },
  {
    id: "matte-slate-studio",
    name: "Matte Slate Studio",
    category: "Accessories",
    price: 899,
    oldPrice: 999,
    tagline: "Create anywhere with studio-grade power.",
    colors: [
      { name: "Matte Slate", value: "#52525b" },
      { name: "Silver", value: "#e4e4e7" }
    ],
    storage: [
      { label: "256GB", price: 899, installment: "$74.92/mo" }
    ],
    accent: "#71717a"
  }
];

export const featuredIds = [
  "titanium-16-pro-max",
  "apex-s24-ultra",
  "magcharge-dock",
  "obsidian-fold-v5"
];

export const getProduct = (id: string) =>
  products.find((product) => product.id === id) ?? products[0];

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
