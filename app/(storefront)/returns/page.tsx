import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Returns",
  description: "Thirty days to send a garment back.",
  path: "/returns",
});

export default function ReturnsPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 px-4 py-12 text-sm leading-7">
      <h1 className="font-display text-4xl">Returns</h1>
      <p>
        Thirty days, unworn, with tags. There is no returns portal in this version. Write
        via Contact or bring the piece to Broadway, Valencia, Pennsylvania, Emeryville, or
        Alameda.
      </p>
      <p>Sale pieces follow the same window. We repair house garments when the seam is ours.</p>
    </article>
  );
}
