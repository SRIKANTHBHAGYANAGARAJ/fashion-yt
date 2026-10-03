import { AboutAccordion } from "@/components/home/about-accordion";
import { StoreLocations } from "@/components/home/store-locations";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "About",
  description: "Cut, cloth, repair, stores.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="py-6">
      <AboutAccordion />
      <StoreLocations />
    </div>
  );
}
