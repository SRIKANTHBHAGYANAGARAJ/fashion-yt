import { ORDERS_COLLECTION, PRODUCTS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import type { Order, Product } from "@/types";

export default async function AnalyticsPage() {
  let orders: Order[] = [];
  let products: Product[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      orders = (await db.collection<Order>(ORDERS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Order,
      );
      products = (await db.collection<Product>(PRODUCTS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Product,
      );
    } catch {
      /* empty */
    }
  }
  const counts: Record<string, number> = {};
  for (const order of orders) {
    for (const item of order.items) {
      counts[item.productId] = (counts[item.productId] ?? 0) + item.qty;
    }
  }
  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const mix: Record<string, number> = {};
  for (const product of products) {
    mix[product.category] = (mix[product.category] ?? 0) + 1;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Analytics</h1>
      <section className="border bg-card p-4">
        <h2 className="font-medium">Top products</h2>
        <ul className="mt-3 space-y-1">
          {top.map(([id, qty]) => (
            <li key={id}>
              {products.find((p) => p.id === id)?.name ?? id} — {qty}
            </li>
          ))}
        </ul>
      </section>
      <section className="border bg-card p-4">
        <h2 className="font-medium">Category mix</h2>
        <ul className="mt-3 space-y-1">
          {Object.entries(mix).map(([cat, n]) => (
            <li key={cat}>
              {cat}: {n}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
