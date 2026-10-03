import { auth } from "@/auth";
import { CartView } from "@/components/cart/cart-view";
import { loadProducts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Cart",
  description: "Your Atelier Vale bag.",
  path: "/cart",
});

export default async function CartPage() {
  const [products, session] = await Promise.all([loadProducts(), auth()]);
  return <CartView products={products} signedIn={Boolean(session?.user)} />;
}
