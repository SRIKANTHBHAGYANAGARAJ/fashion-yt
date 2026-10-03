import Image from "next/image";
import Link from "next/link";
import { loadPosts } from "@/lib/data";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Journal",
  description: "Notes on cloth, fit, care, and season.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await loadPosts();
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Journal</h1>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="relative block aspect-4/3 overflow-hidden bg-hero-wash">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </Link>
            <p className="mt-3 text-xs uppercase">{post.category}</p>
            <h2 className="font-display text-2xl">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
