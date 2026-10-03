import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { ORDERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { CancelOrderButton } from "@/components/account/cancel-order";
import type { Order, RouteParams } from "@/types";

const STEPS = ["pending", "paid", "processing", "shipped", "delivered"] as const;

export default async function OrderDetailPage({
  params,
}: {
  params: RouteParams<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin");
  const { id } = await params;
  if (!isMongoConfigured()) notFound();
  const db = await connectToDatabase();
  const order = await db.collection<Order>(ORDERS_COLLECTION).findOne({ id });
  if (!order) notFound();
  if (order.userId !== session.user.id && order.email !== session.user.email) notFound();
  const { _id: _ignored, ...rest } = order as Order & { _id?: unknown };
  const data = rest as Order;
  return (
    <div>
      <h1 className="font-display text-4xl">{data.orderNumber}</h1>
      <ol className="mt-6 flex flex-wrap gap-3 text-sm">
        {STEPS.map((step) => (
          <li key={step} className={data.status === step ? "font-medium" : "text-muted-foreground"}>
            {step}
          </li>
        ))}
      </ol>
      <ul className="mt-6 space-y-2 text-sm">
        {data.items.map((item) => (
          <li key={`${item.productId}-${item.size}`}>
            {item.name} · {item.color} / {item.size} × {item.qty} — ${item.unitPrice}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">Total ${data.total.toFixed(2)} · {data.paymentMethod}</p>
      {data.status === "pending" || data.status === "paid" ? (
        <CancelOrderButton id={data.id} />
      ) : null}
    </div>
  );
}
