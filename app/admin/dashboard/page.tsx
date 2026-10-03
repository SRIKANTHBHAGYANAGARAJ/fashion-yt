import { ORDERS_COLLECTION, PRODUCTS_COLLECTION, CUSTOMERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import type { Order, Product } from "@/types";

export default async function DashboardPage() {
  let orders: Order[] = [];
  let products: Product[] = [];
  let customers = 0;
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      orders = (await db.collection<Order>(ORDERS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Order,
      );
      products = (await db.collection<Product>(PRODUCTS_COLLECTION).find({}).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Product,
      );
      customers = await db.collection(CUSTOMERS_COLLECTION).countDocuments();
    } catch {
      /* empty */
    }
  }
  const paid = orders.filter((o) => o.status !== "cancelled");
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const aov = paid.length ? revenue / paid.length : 0;
  const low = products.filter((p) => p.stockQty > 0 && p.stockQty <= 5);
  const days = Array.from({ length: 14 }).map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (13 - i));
    const key = day.toISOString().slice(0, 10);
    const total = paid
      .filter((o) => o.createdAt.slice(0, 10) === key)
      .reduce((s, o) => s + o.total, 0);
    return { key, total };
  });
  const max = Math.max(1, ...days.map((d) => d.total));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Orders" value={String(orders.length)} />
        <Card label="Revenue" value={`$${revenue.toFixed(0)}`} />
        <Card label="Customers" value={String(customers)} />
        <Card label="AOV" value={`$${aov.toFixed(0)}`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border bg-card p-4">
          <h2 className="font-medium">Orders, 14 days</h2>
          <svg viewBox="0 0 280 80" className="mt-4 h-24 w-full">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              points={days
                .map((d, i) => `${i * 20},${80 - (d.total / max) * 70}`)
                .join(" ")}
            />
          </svg>
        </section>
        <section className="border bg-card p-4">
          <h2 className="font-medium">Low stock</h2>
          <ul className="mt-3 space-y-1">
            {low.slice(0, 8).map((p) => (
              <li key={p.id}>
                {p.name} — {p.stockQty}
              </li>
            ))}
            {low.length === 0 ? <li>None.</li> : null}
          </ul>
        </section>
      </div>
      <section className="border bg-card p-4">
        <h2 className="font-medium">Recent orders</h2>
        <ul className="mt-3 space-y-1">
          {orders.slice(0, 8).map((o) => (
            <li key={o.id}>
              {o.orderNumber} · {o.status} · ${o.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
