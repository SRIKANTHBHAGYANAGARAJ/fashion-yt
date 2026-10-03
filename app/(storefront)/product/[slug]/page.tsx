import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ProductDetail } from "@/components/product/product-detail";
import { jsonProducts } from "@/lib/catalog";
import {
  frequentlyBought,
  getCategoryBySlug,
  similarProducts,
} from "@/lib/catalog";
import { loadApprovedReviews, loadCategories, loadProductBySlug, loadProducts } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { generateSEOMetadata, siteUrl } from "@/lib/seo";
import type { RouteParams } from "@/types";

export function generateStaticParams() {
  return jsonProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams<{ slug: string }> }) {
  // Next 16: params is a Promise — await it.
  const { slug } = await params;
  const product = jsonProducts.find((item) => item.slug === slug);
  if (!product) return {};
  return generateSEOMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${slug}`,
    ogImage: product.image,
  });
}

export default async function ProductPage({
  params,
}: {
  params: RouteParams<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product || !product.published) notFound();
  const [products, categories, session, extraReviews] = await Promise.all([
    loadProducts(),
    loadCategories(),
    auth(),
    loadApprovedReviews(product.id),
  ]);
  const index = products.findIndex((item) => item.id === product.id);
  const prev = products[index - 1];
  const next = products[index + 1];
  const category = categories.find((item) => item.id === product.category);
  const mergedReviews = [
    ...product.reviews,
    ...extraReviews.map((item) => ({
      author: item.author,
      rating: item.rating,
      body: item.body,
      date: item.date,
    })),
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.images.map((src) => siteUrl(src)),
          description: product.description,
          sku: product.sku,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.price,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Shop", item: siteUrl("/shop") },
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: siteUrl(`/product/${product.slug}`),
            },
          ],
        }}
      />
      <ProductDetail
        product={{ ...product, reviews: mergedReviews, reviewCount: mergedReviews.length }}
        category={category ?? getCategoryBySlug(product.category)}
        similar={similarProducts(product)}
        together={frequentlyBought(product)}
        prev={prev}
        next={next}
        signedIn={Boolean(session?.user)}
      />
    </>
  );
}
