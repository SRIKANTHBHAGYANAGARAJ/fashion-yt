import Image from "next/image";
import Link from "next/link";
import { loadCategories } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Categories",
  description: "Shop Atelier Vale by department.",
  path: "/categories",
});

export default async function CategoriesPage() {
  const categories = await loadCategories();
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Categories</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="group">
            <div className="overflow-hidden bg-hero-wash">
              <Image
                src={category.image}
                alt={category.name}
                width={640}
                height={640}
                className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h2 className="mt-3 font-display text-2xl">{category.name}</h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
