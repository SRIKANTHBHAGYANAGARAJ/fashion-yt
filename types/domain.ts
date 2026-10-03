import type { z } from "zod";
import type {
  addressSchema,
  cartLineSchema,
  couponSchema,
  productSchema,
  categorySchema,
  settingsSchema,
} from "@/lib/schemas";

export type SizeStock = {
  size: string;
  qty: number;
};

export type Variant = {
  color: string;
  colorHex: string;
  sizes: SizeStock[];
  image: string;
};

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type Address = z.infer<typeof addressSchema> & { id: string };
export type CartLine = z.infer<typeof cartLineSchema>;
export type Coupon = z.infer<typeof couponSchema>;
export type StoreSettings = z.infer<typeof settingsSchema>;

export type OrderItem = CartLine & {
  unitPrice: number;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  email: string;
  items: OrderItem[];
  address: Address;
  notes?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: "USD";
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: "stripe" | "cod";
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewDoc = {
  id: string;
  productId: string;
  author: string;
  authorEmail?: string;
  rating: number;
  body: string;
  date: string;
  status: "pending" | "approved" | "rejected";
};

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  image?: string;
  role: "customer" | "admin";
  addresses: Address[];
  createdAt: string;
  passwordReset?: {
    tokenHash: string;
    expiresAt: string;
  };
};

export type PostBlock = {
  type: "p" | "h2" | "h3" | "quote" | "ul";
  text?: string;
  items?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  blocks: PostBlock[];
};

export type Customer = {
  id: string;
  email: string;
  name: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
};

export type Locale = StoreSettings["defaultLocale"];
export type DisplayCurrency = StoreSettings["defaultCurrency"];
