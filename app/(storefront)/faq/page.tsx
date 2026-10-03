import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "FAQ",
  description: "Fit, care, shipping, returns.",
  path: "/faq",
});

const faqs = [
  {
    q: "How does shipping work?",
    a: "Orders over $100 ship free. Under that, $8. Two-day express on orders over $200 is a house promise, not a carrier SLA we invent.",
  },
  {
    q: "What is VALE10?",
    a: "Ten percent off the first order, minimum $50. One coupon at a time.",
  },
  {
    q: "How do I wash wool?",
    a: "Cold, by hand, dry flat. The overcoat is dry clean. The journal has the longer version.",
  },
  {
    q: "Can I return a garment?",
    a: "Within 30 days, unworn, with tags. There is no returns portal in v1 — write to us or bring it to a store.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">FAQ</h1>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
