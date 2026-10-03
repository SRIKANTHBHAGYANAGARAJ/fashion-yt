import { REVIEWS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { ReviewActions } from "@/components/admin/review-actions";
import type { ReviewDoc } from "@/types";

export default async function AdminReviewsPage() {
  let reviews: ReviewDoc[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      reviews = (await db.collection<ReviewDoc>(REVIEWS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as ReviewDoc,
      );
    } catch {
      reviews = [];
    }
  }
  return (
    <div>
      <h1 className="font-display text-3xl">Reviews</h1>
      <ul className="mt-4 space-y-4">
        {reviews.map((r) => (
          <li key={r.id} className="border p-3">
            <p className="font-medium">
              {r.author} · {r.rating} · {r.status}
            </p>
            <p>{r.body}</p>
            <ReviewActions id={r.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
