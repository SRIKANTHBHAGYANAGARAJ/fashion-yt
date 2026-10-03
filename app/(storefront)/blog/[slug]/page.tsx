import Image from "next/image";
import { notFound } from "next/navigation";
import { jsonPosts } from "@/lib/catalog";
import { loadPostBySlug } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { generateSEOMetadata, siteUrl } from "@/lib/seo";
import type { RouteParams } from "@/types";

export function generateStaticParams() {
  return jsonPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams<{ slug: string }> }) {
  const { slug } = await params;
  const post = jsonPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    ogImage: post.image,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: RouteParams<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          image: siteUrl(post.image),
        }}
      />
      <p className="text-xs uppercase">{post.category}</p>
      <h1 className="mt-2 font-display text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {post.author} · {post.date} · {post.readTime}
      </p>
      <div className="relative mt-8 aspect-2/1 overflow-hidden bg-hero-wash">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="mt-8 space-y-4 text-sm leading-7">
        {post.blocks.map((block, i) => {
          if (block.type === "h2") return <h2 key={i} className="font-display text-2xl">{block.text}</h2>;
          if (block.type === "h3") return <h3 key={i} className="font-display text-xl">{block.text}</h3>;
          if (block.type === "quote")
            return (
              <blockquote key={i} className="border-s-2 ps-4 italic">
                {block.text}
              </blockquote>
            );
          if (block.type === "ul")
            return (
              <ul key={i} className="list-disc ps-5">
                {block.items?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          return <p key={i}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
