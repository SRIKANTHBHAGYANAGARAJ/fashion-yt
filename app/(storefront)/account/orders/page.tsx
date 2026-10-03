import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ORDERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import type { Order } from "@/types";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin");
  let orders: Order[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      const docs = await db
        .collection<Order>(ORDERS_COLLECTION)
        .find({ email: session.user.email })
        .sort({ createdAt: -1 })
        .toArray();
      orders = docs.map(({ _id: _ignored, ...rest }) => rest as Order);
    } catch {
      orders = [];
    }
  }
  return (
    <div>
      <h1 className="font-display text-4xl">Orders</h1>
      <ul className="mt-6 divide-y">
        {orders.map((order) => (
          <li key={order.id} className="flex justify-between py-3 text-sm">
            <Link href={`/account/orders/${order.id}`} className="underline">
              {order.orderNumber}
            </Link>
            <span>{order.status}</span>
            <span>${order.total.toFixed(2)}</span>
          </li>
        ))}
        {orders.length === 0 ? <li className="py-6 text-sm">No orders yet.</li> : null}
      </ul>
    </div>
  );
}
