import { StorefrontShell } from "@/components/layout/storefront-shell";
import { loadCategories, loadProducts } from "@/lib/data";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    loadCategories(),
    loadProducts({ includeUnpublished: false }),
  ]);
  return (
    <StorefrontShell categories={categories} products={products}>
      {children}
    </StorefrontShell>
  );
}
