import { CompareView } from "@/components/engage/compare-view";
import { loadProducts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Compare",
  description: "Side by side, four pieces at a time.",
  path: "/compare",
});

export default async function ComparePage() {
  const products = await loadProducts();
  return <CompareView products={products} />;
}
