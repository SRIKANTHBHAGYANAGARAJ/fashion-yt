import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Checkout cancelled",
  description: "You left Stripe before paying.",
  path: "/checkout/cancel",
  noIndex: true,
});

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-display text-4xl">Checkout left unfinished</h1>
      <p className="mt-4 text-sm">The bag is still yours. Nothing was charged.</p>
      <Link href="/cart" className="mt-6 inline-block underline">
        Return to cart
      </Link>
    </div>
  );
}
