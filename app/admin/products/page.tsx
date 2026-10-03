import Link from "next/link";
import { loadProducts } from "@/lib/data";
import { FeaturedToggle } from "@/components/admin/featured-toggle";

export default async function AdminProductsPage() {
  const products = await loadProducts({ includeUnpublished: true });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Products</h1>
        <Link href="/admin/products/new" className="underline">
          New
        </Link>
      </div>
      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2">
                <Link href={`/admin/products/${p.id}`} className="underline">
                  {p.name}
                </Link>
              </td>
              <td>{p.stockQty}</td>
              <td>${p.price}</td>
              <td>
                <FeaturedToggle id={p.id} featured={Boolean(p.featured)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
