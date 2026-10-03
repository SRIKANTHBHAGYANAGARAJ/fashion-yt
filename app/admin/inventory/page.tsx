import { loadProducts } from "@/lib/data";
import { InventoryTable } from "@/components/admin/inventory-table";

export default async function InventoryPage() {
  const products = await loadProducts({ includeUnpublished: true });
  const rows = products.flatMap((product) =>
    product.variants.flatMap((variant) =>
      variant.sizes.map((row) => ({
        productId: product.id,
        name: product.name,
        color: variant.color,
        size: row.size,
        qty: row.qty,
      })),
    ),
  );
  return (
    <div>
      <h1 className="font-display text-3xl">Inventory</h1>
      <InventoryTable rows={rows} />
    </div>
  );
}
