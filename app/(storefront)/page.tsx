import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryRow } from "@/components/home/category-row";
import { Recommended } from "@/components/home/recommended";
import { SaleBanner } from "@/components/home/sale-banner";
import { CollectionMarquee } from "@/components/home/collection-marquee";
import { ShortsReel } from "@/components/home/shorts-reel";
import { Journal } from "@/components/home/journal";
import { TrustRow } from "@/components/home/trust-row";
import { AboutAccordion } from "@/components/home/about-accordion";
import { StoreLocations } from "@/components/home/store-locations";
import { BottomTicker } from "@/components/home/bottom-ticker";
import { loadCategories, loadPosts, loadProducts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Clothes that stay sharp",
  description:
    "Atelier Vale — editorial fashion. Knits, denim, wool, and cuts that last.",
  path: "/",
});

export default async function HomePage() {
  const [categories, products, posts] = await Promise.all([
    loadCategories(),
    loadProducts(),
    loadPosts(),
  ]);

  return (
    <>
      <HeroSlider />
      <CategoryRow categories={categories} />
      <Recommended products={products} categories={categories} />
      <SaleBanner />
      <CollectionMarquee />
      <ShortsReel />
      <Journal posts={posts} />
      <TrustRow />
      <AboutAccordion />
      <StoreLocations />
      <BottomTicker />
    </>
  );
}
