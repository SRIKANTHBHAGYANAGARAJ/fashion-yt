import { WishlistView } from "@/components/engage/saved-view";
import { loadProducts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Wishlist",
  description: "Pieces you saved.",
  path: "/wishlist",
});

export default async function WishlistPage() {
  const products = await loadProducts();
  return <WishlistView products={products} />;
}
