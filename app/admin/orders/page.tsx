import Link from "next/link";
import { ORDERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import type { Order } from "@/types";

export default async function AdminOrdersPage() {
  let orders: Order[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      orders = (await db.collection<Order>(ORDERS_COLLECTION).find({}).sort({ createdAt: -1 }).toArray()).map(
        ({ _id: _i, ...rest }) => rest as Order,
      );
    } catch {
      orders = [];
    }
  }
  return (
    <div>
      <h1 className="font-display text-3xl">Orders</h1>
      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Number</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b">
              <td className="py-2">
                <Link href={`/admin/orders/${o.id}`} className="underline">
                  {o.orderNumber}
                </Link>
              </td>
              <td>{o.status}</td>
              <td>${o.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
