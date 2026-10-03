import { loadCategories } from "@/lib/data";
import { CategoryForm } from "@/components/admin/category-form";

export default async function AdminCategoriesPage() {
  const categories = await loadCategories();
  return (
    <div>
      <h1 className="font-display text-3xl">Categories</h1>
      <ul className="mt-4 space-y-2">
        {categories.map((c) => (
          <li key={c.id}>
            {c.name} — {c.slug}
          </li>
        ))}
      </ul>
      <CategoryForm />
    </div>
  );
}
