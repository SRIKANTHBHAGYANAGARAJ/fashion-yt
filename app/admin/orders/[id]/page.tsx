import { notFound } from "next/navigation";
import { ORDERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderStatusForm } from "@/components/admin/order-status";
import type { Order, RouteParams } from "@/types";

export default async function AdminOrderPage({
  params,
}: {
  params: RouteParams<{ id: string }>;
}) {
  const { id } = await params;
  const db = await connectToDatabase();
  const order = await db.collection<Order>(ORDERS_COLLECTION).findOne({ id });
  if (!order) notFound();
  const { _id: _i, ...rest } = order as Order & { _id?: unknown };
  const data = rest as Order;
  return (
    <div>
      <h1 className="font-display text-3xl">{data.orderNumber}</h1>
      <p className="mt-2">{data.email}</p>
      <ul className="mt-4 space-y-1">
        {data.items.map((item) => (
          <li key={`${item.productId}-${item.size}`}>
            {item.name} · {item.color}/{item.size} × {item.qty}
          </li>
        ))}
      </ul>
      <OrderStatusForm id={data.id} status={data.status} />
    </div>
  );
}
