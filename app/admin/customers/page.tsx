import { CUSTOMERS_COLLECTION } from "@/lib/collections";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";

export default async function CustomersPage() {
  let rows: { email: string; name?: string; orderCount?: number; totalSpent?: number }[] = [];
  if (isMongoConfigured()) {
    try {
      const db = await connectToDatabase();
      rows = (await db.collection(CUSTOMERS_COLLECTION).find({}).toArray()) as unknown as typeof rows;
    } catch {
      rows = [];
    }
  }
  return (
    <div>
      <h1 className="font-display text-3xl">Customers</h1>
      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Email</th>
            <th>Name</th>
            <th>Orders</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.email} className="border-b">
              <td className="py-2">{row.email}</td>
              <td>{row.name}</td>
              <td>{row.orderCount ?? 0}</td>
              <td>${(row.totalSpent ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
