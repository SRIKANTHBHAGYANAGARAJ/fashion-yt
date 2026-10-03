import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Privacy",
  description: "How Atelier Vale holds your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 px-4 py-12 text-sm leading-7">
      <h1 className="font-display text-4xl">Privacy</h1>
      <p>
        We keep an account, orders, addresses, and the bag in your browser. We do not sell
        lists. Cookies remember locale, currency, theme, and the bag.
      </p>
      <p>Payments go through Stripe. We never store a card number.</p>
    </article>
  );
}
