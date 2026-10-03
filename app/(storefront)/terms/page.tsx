import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Terms",
  description: "Terms of sale for Atelier Vale.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 px-4 py-12 text-sm leading-7">
      <h1 className="font-display text-4xl">Terms</h1>
      <p>
        Atelier Vale sells garments as described. Prices are in USD at checkout. Display
        currencies are a courtesy conversion, not a second price list.
      </p>
      <p>You must be signed in to check out. Guest checkout is not offered.</p>
      <p>Stock is per colour and size. We refuse an order that the rack cannot fill.</p>
    </article>
  );
}
