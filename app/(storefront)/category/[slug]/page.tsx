import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopView } from "@/components/shop/shop-view";
import { jsonCategories } from "@/lib/catalog";
import { loadCategories, loadProducts } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { generateSEOMetadata, siteUrl } from "@/lib/seo";
import type { RouteParams } from "@/types";

export function generateStaticParams() {
  return jsonCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams<{ slug: string }> }) {
  // Next 16: params is a Promise — await it.
  const { slug } = await params;
  const category = jsonCategories.find((item) => item.slug === slug);
  if (!category) return {};
  return generateSEOMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: RouteParams<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([loadCategories(), loadProducts()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const filtered = products.filter((product) => product.category === category.id);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: category.name,
          url: siteUrl(`/category/${slug}`),
          numberOfItems: filtered.length,
        }}
      />
      <Suspense fallback={<div className="px-4 py-16">Loading shop…</div>}>
        <ShopView products={filtered} categories={categories} heading={category.name} />
      </Suspense>
    </>
  );
}
