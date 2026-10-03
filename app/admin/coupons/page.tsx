import { COUPONS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { CouponForm } from "@/components/admin/coupon-form";
import type { Coupon } from "@/types";

export default async function CouponsPage() {
  let coupons: Coupon[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      coupons = (await db.collection<Coupon>(COUPONS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Coupon,
      );
    } catch {
      coupons = [];
    }
  }
  return (
    <div>
      <h1 className="font-display text-3xl">Coupons</h1>
      <ul className="mt-4 space-y-1">
        {coupons.map((c) => (
          <li key={c.code}>
            {c.code} — {c.type} {c.value} {c.active ? "active" : "off"}
          </li>
        ))}
      </ul>
      <CouponForm />
    </div>
  );
}
