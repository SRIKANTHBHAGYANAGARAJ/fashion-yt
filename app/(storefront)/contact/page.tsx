import { ContactForm } from "@/components/content/contact-form";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Contact",
  description: "Write to Atelier Vale.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-display text-4xl">Contact</h1>
      <p className="mt-2 text-sm">(415) 555-0194 · 10:00am – 8:00pm, 7 days</p>
      <ContactForm />
    </div>
  );
}
