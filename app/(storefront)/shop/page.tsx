import { Suspense } from "react";
import { ShopView } from "@/components/shop/shop-view";
import { loadCategories, loadProducts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Shop",
  description: "Browse the Atelier Vale catalog — knits, denim, wool, and cut cloth.",
  path: "/shop",
});

export default async function ShopPage() {
  const [products, categories] = await Promise.all([loadProducts(), loadCategories()]);
  return (
    <Suspense fallback={<div className="px-4 py-16">Loading shop…</div>}>
      <ShopView products={products} categories={categories} heading="Shop" />
    </Suspense>
  );
}
