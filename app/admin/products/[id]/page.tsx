import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { loadProductById } from "@/lib/data";
import type { RouteParams } from "@/types";

export default async function EditProductPage({
  params,
}: {
  params: RouteParams<{ id: string }>;
}) {
  const { id } = await params;
  const product = await loadProductById(id);
  if (!product) notFound();
  return <ProductForm product={product} />;
}
