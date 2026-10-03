import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo";
import type { SearchParams } from "@/types";

export const metadata = generateSEOMetadata({
  title: "Order placed",
  description: "Your Atelier Vale order.",
  path: "/checkout/success",
  noIndex: true,
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = await searchParams;
  const order = Array.isArray(q.order) ? q.order[0] : q.order;
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-display text-4xl">Paid — or placed.</h1>
      <p className="mt-4 text-sm">
        This page is the receipt. {order ? `Order ${order}.` : "Thank you."}
      </p>
      <Link href="/account/orders" className="mt-6 inline-block underline">
        View orders
      </Link>
    </div>
  );
}
